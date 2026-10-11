"""Extract voter cards from scanned electoral-roll PDFs into one Excel file.

Pipeline: PDF page -> image -> detect the 3-column card grid -> per-card OCR
(Tesseract for printed Telugu/English, EasyOCR for the handwritten phone
number) -> validation -> Excel. Cards that fail validation can optionally be
re-read with the free Gemini API tier (set GEMINI_API_KEY and pass --gemini).
"""

from __future__ import annotations

import argparse
import base64
import io
import json
import os
import re
import sys
import time
import traceback
from dataclasses import dataclass, field
from pathlib import Path

import shutil

import cv2
import numpy as np
import pytesseract
from openpyxl import Workbook
from openpyxl.drawing.image import Image as XLImage
from openpyxl.styles import Alignment, Font, PatternFill
from PIL import Image

try:
    import pymupdf as fitz  # PyMuPDF (new name)
except ImportError:  # older PyMuPDF
    import fitz  # type: ignore[no-redef]

EPIC_RE = re.compile(r"^[A-Z]{3}\d{7}$")
PHONE_RE = re.compile(r"^[6-9]\d{9}$")

# Relative regions inside one card (x0, y0, x1, y1), tuned on the standard
# 3-column layout (card ~620x250 px at the reference scale).
REG_SERIAL = (0.28, 0.03, 0.44, 0.17)
REG_EPIC = (0.55, 0.01, 0.99, 0.17)
REG_PHONE = (0.02, 0.64, 0.90, 0.99)
# Centre (as a fraction of card height) of the 4 printed text lines.
TEXT_LINE_CENTRES = (0.255, 0.36, 0.465, 0.57)
TEXT_LINE_HALF = 0.058
TEXT_X = (0.01, 0.74)

COLUMNS = [
    "EPIC ID", "Name", "Address (House No)", "Phone", "Phone (crop)",
    "Needs Review", "Review Reason", "Source PDF", "Page",
]


@dataclass
class Card:
    source: str
    page: int
    part_no: str = ""
    header: str = ""
    serial: str = ""
    epic: str = ""
    name: str = ""
    relation: str = ""
    relative: str = ""
    house: str = ""
    age: str = ""
    gender: str = ""
    phone: str = ""
    method: str = "local"
    reasons: list[str] = field(default_factory=list)
    phone_img: bytes | None = None
    card_jpg: bytes | None = None


# --------------------------------------------------------------------------
# Image helpers
# --------------------------------------------------------------------------

def parse_pages(spec: str) -> set[int]:
    """'1-3,7,10-12' -> {1,2,3,7,10,11,12}. Page numbers start at 1."""
    pages: set[int] = set()
    for part in re.split(r"[,\s]+", spec.strip()):
        if not part:
            continue
        m = re.fullmatch(r"(\d+)(?:\s*-\s*(\d+))?", part)
        if not m:
            raise ValueError(f"bad page range '{part}' (use e.g. 1-5,8,10-12)")
        lo, hi = int(m.group(1)), int(m.group(2) or m.group(1))
        if lo < 1 or hi < lo:
            raise ValueError(f"bad page range '{part}'")
        pages.update(range(lo, hi + 1))
    return pages


def render_pages(pdf_path: Path, dpi: int, only: set[int] | None = None):
    doc = fitz.open(pdf_path)
    if only:
        beyond = sorted(p for p in only if p > len(doc))
        if beyond:
            print(f"  note: {pdf_path.name} has only {len(doc)} pages; skipping {beyond}")
    for i, page in enumerate(doc, start=1):
        if only is not None and i not in only:
            continue
        pix = page.get_pixmap(dpi=dpi, colorspace=fitz.csGRAY)
        img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width)
        yield i, img
    doc.close()


def crop_rel(img: np.ndarray, reg) -> np.ndarray:
    h, w = img.shape[:2]
    x0, y0, x1, y1 = reg
    return img[int(y0 * h):int(y1 * h), int(x0 * w):int(x1 * w)]


def to_jpg(img: np.ndarray, quality: int = 80) -> bytes:
    ok, buf = cv2.imencode(".jpg", img, [cv2.IMWRITE_JPEG_QUALITY, quality])
    return buf.tobytes() if ok else b""


def detect_cards(page: np.ndarray, cols: int = 3) -> list[np.ndarray]:
    """Return card crops in reading order (row by row, left to right)."""
    h, w = page.shape[:2]
    bw = cv2.adaptiveThreshold(page, 255, cv2.ADAPTIVE_THRESH_MEAN_C,
                               cv2.THRESH_BINARY_INV, 31, 15)
    # Keep only long horizontal / vertical lines (the card borders).
    hk = cv2.getStructuringElement(cv2.MORPH_RECT, (max(40, w // 12), 1))
    vk = cv2.getStructuringElement(cv2.MORPH_RECT, (1, max(40, h // 25)))
    lines = cv2.bitwise_or(cv2.morphologyEx(bw, cv2.MORPH_OPEN, hk),
                           cv2.morphologyEx(bw, cv2.MORPH_OPEN, vk))
    lines = cv2.dilate(lines, np.ones((3, 3), np.uint8), iterations=1)
    contours, _ = cv2.findContours(lines, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)

    min_w, max_w = w / (cols + 1.5), w / (cols - 0.5)
    boxes = []
    for c in contours:
        x, y, bw_, bh = cv2.boundingRect(c)
        if min_w < bw_ < max_w and h / 16 < bh < h / 3:
            boxes.append((x, y, bw_, bh))
    boxes = _dedupe(boxes)

    if len(boxes) < cols:  # border detection failed -> fall back to uniform grid
        return _uniform_grid(page, cols)

    boxes.sort(key=lambda b: (round(b[1] / (h / 40)), b[0]))
    rows: list[list[tuple]] = []
    for b in sorted(boxes, key=lambda b: b[1]):
        if rows and abs(rows[-1][0][1] - b[1]) < b[3] * 0.4:
            rows[-1].append(b)
        else:
            rows.append([b])
    out = []
    for row in rows:
        for x, y, bw_, bh in sorted(row, key=lambda b: b[0]):
            m = max(3, int(bw_ * 0.008))  # drop the border lines
            out.append(page[y + m:y + bh - m, x + m:x + bw_ - m])
    return out


def _dedupe(boxes):
    kept = []
    for b in sorted(boxes, key=lambda b: -(b[2] * b[3])):
        if not any(abs(b[0] - k[0]) < 25 and abs(b[1] - k[1]) < 25 for k in kept):
            kept.append(b)
    return kept


def _uniform_grid(page: np.ndarray, cols: int, rows: int = 10) -> list[np.ndarray]:
    h, w = page.shape[:2]
    top, left = int(h * 0.09), int(w * 0.035)
    cw, ch = (w - 2 * left) // cols, (h - top - int(h * 0.02)) // rows
    return [page[top + r * ch: top + (r + 1) * ch, left + c * cw: left + (c + 1) * cw]
            for r in range(rows) for c in range(cols)]


# --------------------------------------------------------------------------
# OCR
# --------------------------------------------------------------------------

def ocr(img: np.ndarray, lang: str, psm: int, whitelist: str | None = None) -> str:
    cfg = f"--psm {psm}"
    if whitelist:
        cfg += f" -c tessedit_char_whitelist={whitelist}"
    big = cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    _, th = cv2.threshold(big, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return pytesseract.image_to_string(th, lang=lang, config=cfg).strip()


_easy = None


def read_phone(img: np.ndarray) -> tuple[str, float]:
    """Handwritten digits. Uses EasyOCR when available, else Tesseract digits."""
    global _easy
    if _easy is None:
        try:
            import easyocr  # noqa: PLC0415
            _easy = easyocr.Reader(["en"], gpu=False, verbose=False)
        except Exception:  # noqa: BLE001
            _easy = False
    if _easy:
        res = _easy.readtext(img, allowlist="0123456789", detail=1, paragraph=False,
                             width_ths=1.0)
        if res:
            res.sort(key=lambda r: r[0][0][0])
            digits = "".join(re.sub(r"\D", "", r[1]) for r in res)
            conf = min(r[2] for r in res)
            return digits, conf
        return "", 0.0
    txt = ocr(img, "eng", 7, "0123456789")
    return re.sub(r"\D", "", txt), 0.5


def trim_phone_region(img: np.ndarray) -> np.ndarray:
    """Crop to the dark handwriting so OCR is not distracted by blank space."""
    _, th = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    th = cv2.morphologyEx(th, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
    ys, xs = np.where(th > 0)
    if len(xs) < 50:
        return img
    pad = 8
    y0, y1 = max(0, ys.min() - pad), min(img.shape[0], ys.max() + pad)
    x0, x1 = max(0, xs.min() - pad), min(img.shape[1], xs.max() + pad)
    return img[y0:y1, x0:x1]


RELATION_MAP = (("తండ్రి", "Father"), ("భర్త", "Husband"), ("తల్లి", "Mother"),
                ("ఇతరులు", "Other"))


def parse_value(line: str) -> str:
    """Text after the label separator (OCR often turns ':' into ';' or '.')."""
    m = re.search(r"[:：;]", line)
    value = line[m.end():] if m else line
    return re.sub(r"\s+", " ", value).strip(" |_.,")


def parse_lines(lines: list[str], card: Card) -> None:
    """lines = OCR text of the 4 printed rows: name, relative, house, age/gender."""
    if lines[0]:
        card.name = parse_value(lines[0])
    if lines[1]:
        card.relative = parse_value(lines[1])
        for tel, eng in RELATION_MAP:
            if tel in lines[1]:
                card.relation = eng
                break
    if lines[2]:
        m = re.search(r"\d+(?:\s*-\s*\d+)+(?:\s*[/\-]?\s*[0-9A-Za-z]+)*", lines[2])
        if m:
            card.house = m.group(0).replace(" ", "")
        else:
            m = re.search(r"[:：;]\s*([0-9A-Za-z][0-9A-Za-z\-/ ]*)", lines[2])
            card.house = (m.group(1) if m else parse_value(lines[2])).replace(" ", "")
    tail = lines[3]
    m = re.search(r"(\d{1,3})", tail)
    if m:
        card.age = m.group(1)
    if "పురుష" in tail:
        card.gender = "Male"
    elif "స్త్రీ" in tail or "స్ర్తీ" in tail or "స్త్రి" in tail or "లు" in tail:
        card.gender = "Female"
    elif "ఇతర" in tail:
        card.gender = "Other"
    elif card.relation == "Husband":  # "husband's name" is only printed for women
        card.gender = "Female"


def fix_epic(raw: str) -> str:
    """EPIC = 3 letters + 7 digits; repair the usual O/0, I/1, S/5 confusions."""
    s = re.sub(r"[^A-Z0-9]", "", raw.upper())
    if len(s) != 10:
        return s
    to_letter = {"0": "O", "1": "I", "5": "S", "8": "B", "2": "Z"}
    to_digit = {"O": "0", "I": "1", "S": "5", "B": "8", "Z": "2", "D": "0", "Q": "0"}
    head = "".join(to_letter.get(c, c) for c in s[:3])
    tail = "".join(to_digit.get(c, c) for c in s[3:])
    return head + tail


def extract_card_local(img: np.ndarray, card: Card) -> float:
    serial = ocr(crop_rel(img, REG_SERIAL), "eng", 7, "0123456789")
    card.serial = re.sub(r"\D", "", serial)
    epic = ocr(crop_rel(img, REG_EPIC), "eng", 7, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    card.epic = fix_epic(epic)
    lines = []
    for centre in TEXT_LINE_CENTRES:
        strip = crop_rel(img, (TEXT_X[0], centre - TEXT_LINE_HALF, TEXT_X[1], centre + TEXT_LINE_HALF))
        lines.append(ocr(strip, "tel+eng", 7).replace("\n", " "))
    parse_lines(lines, card)
    phone_img = trim_phone_region(crop_rel(img, REG_PHONE))
    card.phone, conf = read_phone(phone_img)
    card.phone_img = to_jpg(phone_img)
    return conf


def validate(card: Card, phone_conf: float = 1.0) -> None:
    """Only the four wanted fields matter: EPIC ID, name, address, phone."""
    if not EPIC_RE.match(card.epic):
        card.reasons.append("EPIC format")
    if not PHONE_RE.match(card.phone):
        card.reasons.append("phone not 10 digits")
    elif phone_conf < 0.5:
        card.reasons.append("phone low confidence")
    if not card.name:
        card.reasons.append("name")
    if not card.house:
        card.reasons.append("address")


def read_header(page: np.ndarray, card_template: Card) -> tuple[str, str]:
    h, w = page.shape[:2]
    left = page[int(h * 0.01):int(h * 0.09), 0:int(w * 0.8)]
    right = page[int(h * 0.01):int(h * 0.06), int(w * 0.8):w]
    header = " | ".join(ln for ln in ocr(left, "tel+eng", 6).splitlines() if ln.strip())
    nums = re.findall(r"\d+", ocr(right, "tel+eng", 7))
    return (nums[-1] if nums else ""), header


# --------------------------------------------------------------------------
# Optional Gemini (free tier): one request per PAGE, not per card
# --------------------------------------------------------------------------

GEMINI_PAGE_PROMPT = (
    "This is a scanned page of an Indian (Telugu) electoral roll: a grid of voter cards, "
    "3 per row. Each card has a serial number, an EPIC ID (3 capital letters + 7 digits, "
    "e.g. YUO6677421, printed top right), the voter's name (after the label ఓటరు పేరు), "
    "a house number (after ఇంటి సంఖ్య) and a HANDWRITTEN 10-digit mobile number written "
    "at the bottom of the card. Return a JSON array with one object per card, in reading "
    "order (row by row, left to right), with keys: serial, epic, name, house_no, phone. "
    "Write the name in Telugu script exactly as printed (without the label). phone = digits "
    "only; use an empty string if there is none or it is unreadable. Never invent or guess "
    "digits. Include every card on the page, even if some fields are blank."
)
_last_gemini = 0.0


class GeminiQuotaError(RuntimeError):
    pass


class GeminiConfigError(RuntimeError):
    """Bad key / model / endpoint: retrying will not help, so Gemini is switched off."""


def mask_key(text: str) -> str:
    key = os.environ.get("GEMINI_API_KEY", "")
    return text.replace(key, "***") if key else text


def gemini_url(model: str, key: str) -> str:
    if key.startswith("AQ."):  # Vertex AI express-mode key
        return f"https://aiplatform.googleapis.com/v1/publishers/google/models/{model}:generateContent"
    return f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"


def gemini_page(jpg: bytes) -> list[dict]:
    global _last_gemini
    import requests  # noqa: PLC0415
    key = os.environ["GEMINI_API_KEY"]
    model = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
    url = gemini_url(model, key)
    body = {
        "contents": [{"role": "user", "parts": [
            {"text": GEMINI_PAGE_PROMPT},
            {"inline_data": {"mime_type": "image/jpeg", "data": base64.b64encode(jpg).decode()}},
        ]}],
        "generationConfig": {"responseMimeType": "application/json", "temperature": 0},
    }
    for attempt in range(4):
        wait = 7.0 - (time.time() - _last_gemini)  # stay under the free per-minute limit
        if wait > 0:
            time.sleep(wait)
        _last_gemini = time.time()
        r = requests.post(url, params={"key": key}, json=body, timeout=180)
        if r.status_code in (429, 500, 503):
            if "PerDay" in r.text or attempt == 3:
                raise GeminiQuotaError("Gemini free-tier limit reached (try again tomorrow; "
                                       "finished pages are cached and will not be re-sent)")
            time.sleep(20 * (attempt + 1))
            continue
        if r.status_code in (400, 401, 403, 404):
            raise GeminiConfigError(
                f"Gemini rejected the request (HTTP {r.status_code}). Check the API key and "
                f"GEMINI_MODEL (now '{model}'). Details: {mask_key(r.text[:300])}")
        r.raise_for_status()
        text = r.json()["candidates"][0]["content"]["parts"][0]["text"]
        data = json.loads(text)
        if isinstance(data, dict):
            data = next((v for v in data.values() if isinstance(v, list)), [data])
        return [d for d in data if isinstance(d, dict)]
    return []


def gemini_page_cached(pdf: Path, page_no: int, jpg: bytes, cache_dir: Path) -> list[dict]:
    cache = cache_dir / f"{pdf.stem}_p{page_no}.json"
    if cache.is_file():
        return json.loads(cache.read_text(encoding="utf-8"))
    rows = gemini_page(jpg)
    cache_dir.mkdir(parents=True, exist_ok=True)
    cache.write_text(json.dumps(rows, ensure_ascii=False), encoding="utf-8")
    return rows


def merge_gemini(rows: list[dict], local: list[Card], pdf_name: str, page_no: int) -> list[Card]:
    """Build final cards from Gemini's page reading, using local crops/EPIC as a cross-check."""
    aligned = len(rows) == len(local)
    out = []
    for i, row in enumerate(rows):
        g = lambda k: re.sub(r"\s+", " ", str(row.get(k, "") or "")).strip()  # noqa: E731
        card = Card(pdf_name, page_no, method="gemini")
        card.epic = fix_epic(g("epic"))
        card.name = g("name")
        card.house = g("house_no").replace(" ", "")
        card.phone = re.sub(r"\D", "", g("phone"))
        card.serial = re.sub(r"\D", "", g("serial"))
        if aligned:
            lc = local[i]
            card.phone_img = lc.phone_img
            if EPIC_RE.match(lc.epic) and EPIC_RE.match(card.epic) and lc.epic != card.epic:
                card.reasons.append(f"EPIC differs from local OCR ({lc.epic})")
            elif not EPIC_RE.match(card.epic) and EPIC_RE.match(lc.epic):
                card.epic = lc.epic
        else:
            card.reasons.append(f"card count differs (Gemini {len(rows)}, grid {len(local)})")
        validate(card)
        out.append(card)
    return out


# --------------------------------------------------------------------------
# Excel
# --------------------------------------------------------------------------

def write_excel(cards: list[Card], errors: list[tuple[str, str]], out: Path,
                images: bool) -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "Voters"
    ws.append(COLUMNS)
    for c in ws[1]:
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = PatternFill("solid", fgColor="305496")
    red = PatternFill("solid", fgColor="FFC7CE")
    for i, card in enumerate(cards, start=2):
        ws.append([card.epic, card.name, card.house, card.phone, "",
                   "YES" if card.reasons else "", "; ".join(card.reasons),
                   card.source, card.page])
        if card.reasons:
            for c in ws[i]:
                c.fill = red
        ws.cell(row=i, column=4).number_format = "@"
        if images and card.phone_img:
            img = XLImage(io.BytesIO(card.phone_img))
            scale = 40 / img.height
            img.height, img.width = 40, int(img.width * scale)
            ws.add_image(img, f"E{i}")
            ws.row_dimensions[i].height = 32
    for col, width in zip("ABCDEFGHI", (14, 34, 18, 14, 26, 8, 34, 22, 6)):
        ws.column_dimensions[col].width = width
    for row in ws.iter_rows(min_row=2):
        for c in row:
            c.alignment = Alignment(vertical="center", wrap_text=False)
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = ws.dimensions

    es = wb.create_sheet("Errors")
    es.append(["Source PDF", "Problem"])
    for src, msg in errors:
        es.append([src, msg])
    wb.save(out)


# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------

def page_cards(pdf: Path, page_no: int, page: np.ndarray, args, gemini_ok: list[bool],
               cache_dir: Path) -> list[Card]:
    crops = detect_cards(page)
    local: list[Card] = []
    for crop in crops:
        card = Card(pdf.name, page_no)
        try:
            conf = extract_card_local(crop, card)
            validate(card, conf)
        except Exception as exc:  # noqa: BLE001
            card.reasons.append(f"error: {exc}")
        local.append(card)

    if args.gemini and gemini_ok[0]:
        try:
            rows = gemini_page_cached(pdf, page_no, to_jpg(page, 88), cache_dir)
            if rows:
                return merge_gemini(rows, local, pdf.name, page_no)
            print("  ! Gemini returned no cards for this page; using local OCR", flush=True)
        except (GeminiQuotaError, GeminiConfigError) as exc:
            print(f"  ! {mask_key(str(exc))}\n  ! Gemini switched off; continuing with local OCR only.",
                  flush=True)
            gemini_ok[0] = False
        except Exception as exc:  # noqa: BLE001
            print(f"  ! Gemini failed on this page ({mask_key(str(exc))}); using local OCR", flush=True)
            for c in local:
                c.reasons.append("gemini failed")
    return local


def process_pdf(pdf: Path, args, cards: list[Card], gemini_ok: list[bool], checkpoint) -> None:
    cache_dir = Path(args.output).parent / "cache"
    for page_no, page in render_pages(pdf, args.dpi, args.page_set):
        if args.max_pages and page_no > args.max_pages:
            break
        new = page_cards(pdf, page_no, page, args, gemini_ok, cache_dir)
        cards.extend(new)
        bad = sum(1 for c in new if c.reasons)
        print(f"  {pdf.name} page {page_no}: {len(new)} voters, {bad} need review "
              f"(total {len(cards)})", flush=True)
        for c in new[:args.show]:  # live preview (Telugu text omitted: consoles garble it)
            flag = "  <-- " + "; ".join(c.reasons) if c.reasons else ""
            print(f"      {c.epic or '?':<12} {c.phone or '-':<11} {c.house}{flag}", flush=True)
        checkpoint(page_no)


def dedupe_by_epic(cards: list[Card], quiet: bool = False) -> list[Card]:
    """EPIC ID is the key: keep the first valid row per EPIC, drop repeats."""
    seen: set[str] = set()
    out = []
    for c in cards:
        if EPIC_RE.match(c.epic):
            if c.epic in seen:
                continue
            seen.add(c.epic)
        out.append(c)
    if len(out) != len(cards) and not quiet:
        print(f"Removed {len(cards) - len(out)} duplicate EPIC rows.")
    return out


def find_tesseract() -> bool:
    """Locate tesseract (PATH or the usual install folders) and check Telugu data."""
    exe = shutil.which("tesseract")
    if not exe:
        candidates = [
            os.environ.get("TESSERACT_CMD", ""),
            r"C:\Program Files\Tesseract-OCR\tesseract.exe",
            r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
            os.path.expandvars(r"%LOCALAPPDATA%\Programs\Tesseract-OCR\tesseract.exe"),
            "/opt/homebrew/bin/tesseract",
            "/usr/local/bin/tesseract",
        ]
        exe = next((c for c in candidates if c and Path(c).is_file()), None)
    if not exe:
        print("ERROR: Tesseract OCR is not installed (or not found).\n"
              "  Windows: install from https://github.com/UB-Mannheim/tesseract/wiki\n"
              "           and tick 'Telugu' under Additional language data.\n"
              "  Mac:     brew install tesseract tesseract-lang\n"
              "  If it is installed somewhere else, set TESSERACT_CMD to the full path of tesseract.exe.")
        return False
    pytesseract.pytesseract.tesseract_cmd = exe
    try:
        langs = set(pytesseract.get_languages(config=""))
    except Exception as exc:  # noqa: BLE001
        print(f"ERROR: could not run Tesseract at {exe}: {exc}")
        return False
    missing = {"tel", "eng"} - langs
    if missing:
        print(f"ERROR: Tesseract language data missing: {', '.join(sorted(missing))}.\n"
              "  Re-run the Tesseract installer and tick 'Telugu' (and English) under\n"
              "  Additional language data, or copy tel.traineddata into its tessdata folder.")
        return False
    return True


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("input", nargs="?", default="input", help="PDF file or folder")
    ap.add_argument("-o", "--output", default="output/extracted.xlsx")
    ap.add_argument("--dpi", type=int, default=200)
    ap.add_argument("--gemini", action="store_true",
                    help="read each page with the free Gemini API (needs GEMINI_API_KEY); local OCR is the fallback")
    ap.add_argument("--no-images", action="store_true", help="do not embed phone crops")
    ap.add_argument("--save-every", type=int, default=3,
                    help="save the Excel file every N pages so you can open it while running")
    ap.add_argument("--show", type=int, default=6,
                    help="voters per page to print live in the console (0 = none)")
    ap.add_argument("--pages", default="",
                    help="only these pages of every PDF, e.g. 1-5,8,10-12 (default: all)")
    ap.add_argument("--max-pages", type=int, default=0, help="limit pages per PDF (testing)")
    args = ap.parse_args()

    try:
        args.page_set = parse_pages(args.pages) if args.pages.strip() else None
    except ValueError as exc:
        print(f"ERROR: {exc}")
        return 2
    if not find_tesseract():
        return 2

    src = Path(args.input)
    pdfs = sorted(src.glob("*.pdf")) if src.is_dir() else [src]
    if not pdfs:
        print(f"No PDF files found in {src}")
        return 1
    if args.gemini and not os.environ.get("GEMINI_API_KEY"):
        print("--gemini needs the GEMINI_API_KEY environment variable; running local only.")
        args.gemini = False

    out = Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    cards: list[Card] = []
    errors: list[tuple[str, str]] = []
    gemini_ok = [True]
    pages_done = [0]
    warned = [False]

    def checkpoint(_page_no: int) -> None:
        pages_done[0] += 1
        if args.save_every <= 0 or pages_done[0] % args.save_every:
            return
        try:
            write_excel(dedupe_by_epic(cards, quiet=True), errors, out, images=not args.no_images)
        except PermissionError:
            if not warned[0]:
                print(f"  (live save skipped: {out.name} is open in Excel; "
                      "close it to see updates. Processing continues.)", flush=True)
                warned[0] = True

    try:
        for pdf in pdfs:
            print(f"Processing {pdf.name}", flush=True)
            try:
                process_pdf(pdf, args, cards, gemini_ok, checkpoint)
            except Exception as exc:  # noqa: BLE001
                errors.append((pdf.name, f"{exc}"))
                traceback.print_exc()
    except KeyboardInterrupt:
        print("Interrupted - saving what was extracted so far.")
    finally:
        cards = dedupe_by_epic(cards)
        try:
            write_excel(cards, errors, out, images=not args.no_images)
        except PermissionError:
            alt = out.with_name(out.stem + "_final" + out.suffix)
            write_excel(cards, errors, alt, images=not args.no_images)
            print(f"{out.name} is open in Excel, so results were saved to {alt.name} instead.")
            out = alt
    flagged = sum(1 for c in cards if c.reasons)
    print(f"Done: {len(cards)} cards, {flagged} need review -> {out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
