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

import cv2
import fitz  # PyMuPDF
import numpy as np
import pytesseract
from openpyxl import Workbook
from openpyxl.drawing.image import Image as XLImage
from openpyxl.styles import Alignment, Font, PatternFill
from PIL import Image

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
    "Source PDF", "Page", "Part No", "Constituency / Section", "Serial No", "EPIC ID",
    "Voter Name", "Relation Type", "Relative Name", "House No", "Age", "Gender",
    "Phone", "Phone (crop)", "Needs Review", "Review Reason", "Method",
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

def render_pages(pdf_path: Path, dpi: int):
    doc = fitz.open(pdf_path)
    for i, page in enumerate(doc, start=1):
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


def validate(card: Card, phone_conf: float) -> None:
    if not EPIC_RE.match(card.epic):
        card.reasons.append("EPIC format")
    if not PHONE_RE.match(card.phone):
        card.reasons.append("phone not 10 digits")
    elif phone_conf < 0.5:
        card.reasons.append("phone low confidence")
    if not card.age or not (18 <= int(card.age) <= 120):
        card.reasons.append("age")
    if not card.gender:
        card.reasons.append("gender")
    if not card.name:
        card.reasons.append("name")


def read_header(page: np.ndarray, card_template: Card) -> tuple[str, str]:
    h, w = page.shape[:2]
    left = page[int(h * 0.01):int(h * 0.09), 0:int(w * 0.8)]
    right = page[int(h * 0.01):int(h * 0.06), int(w * 0.8):w]
    header = " | ".join(ln for ln in ocr(left, "tel+eng", 6).splitlines() if ln.strip())
    nums = re.findall(r"\d+", ocr(right, "tel+eng", 7))
    return (nums[-1] if nums else ""), header


# --------------------------------------------------------------------------
# Optional Gemini (free tier) fallback
# --------------------------------------------------------------------------

GEMINI_PROMPT = (
    "This is one voter card from an Indian (Telugu) electoral roll with a handwritten "
    "10-digit mobile number at the bottom. Return JSON with keys: serial, epic, "
    "voter_name, relation_type (Father/Husband/Mother/Other), relative_name, house_no, "
    "age, gender (Male/Female/Other), phone. Keep Telugu names in Telugu script. "
    "Use an empty string if a field is unreadable. Do not guess digits."
)
_last_gemini = 0.0


def gemini_read(jpg: bytes) -> dict | None:
    global _last_gemini
    import requests  # noqa: PLC0415
    key = os.environ.get("GEMINI_API_KEY")
    model = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
    if not key:
        return None
    wait = 4.5 - (time.time() - _last_gemini)  # stay under free-tier per-minute limit
    if wait > 0:
        time.sleep(wait)
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    body = {
        "contents": [{"parts": [
            {"text": GEMINI_PROMPT},
            {"inline_data": {"mime_type": "image/jpeg", "data": base64.b64encode(jpg).decode()}},
        ]}],
        "generationConfig": {"responseMimeType": "application/json", "temperature": 0},
    }
    _last_gemini = time.time()
    r = requests.post(url, params={"key": key}, json=body, timeout=90)
    if r.status_code == 429:
        raise RuntimeError("Gemini free-tier limit reached")
    r.raise_for_status()
    text = r.json()["candidates"][0]["content"]["parts"][0]["text"]
    data = json.loads(text)
    return data[0] if isinstance(data, list) and data else data


def apply_gemini(card: Card) -> None:
    data = gemini_read(card.card_jpg or b"")
    if not data:
        return
    g = lambda k: re.sub(r"\s+", " ", str(data.get(k, "") or "")).strip()  # noqa: E731
    card.serial = g("serial") or card.serial
    card.epic = re.sub(r"[^A-Z0-9]", "", g("epic").upper()) or card.epic
    card.name = g("voter_name") or card.name
    card.relation = g("relation_type") or card.relation
    card.relative = g("relative_name") or card.relative
    card.house = g("house_no") or card.house
    card.age = re.sub(r"\D", "", g("age")) or card.age
    card.gender = g("gender") or card.gender
    card.phone = re.sub(r"\D", "", g("phone")) or card.phone
    card.method = "local+gemini"


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
        ws.append([
            card.source, card.page, card.part_no, card.header, card.serial, card.epic,
            card.name, card.relation, card.relative, card.house, card.age, card.gender,
            card.phone, "", "YES" if card.reasons else "", "; ".join(card.reasons),
            card.method,
        ])
        if card.reasons:
            for c in ws[i]:
                c.fill = red
        if images and card.phone_img:
            img = XLImage(io.BytesIO(card.phone_img))
            scale = 40 / img.height
            img.height, img.width = 40, int(img.width * scale)
            ws.add_image(img, f"N{i}")
            ws.row_dimensions[i].height = 32
    for col, width in zip("ABCDEFGHIJKLMNOPQ",
                          (22, 6, 8, 40, 8, 14, 28, 10, 28, 14, 6, 9, 14, 24, 8, 28, 12)):
        ws.column_dimensions[col].width = width
    for row in ws.iter_rows(min_row=2):
        for c in row:
            c.alignment = Alignment(vertical="center", wrap_text=False)
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = ws.dimensions
    ws.cell(row=1, column=13).number_format = "@"
    for r in range(2, len(cards) + 2):
        ws.cell(row=r, column=13).number_format = "@"

    es = wb.create_sheet("Errors")
    es.append(["Source PDF", "Problem"])
    for src, msg in errors:
        es.append([src, msg])
    wb.save(out)


# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------

def process_pdf(pdf: Path, args, cards: list[Card], gemini_ok: list[bool]) -> None:
    for page_no, page in render_pages(pdf, args.dpi):
        if args.max_pages and page_no > args.max_pages:
            break
        crops = detect_cards(page)
        part_no, header = read_header(page, Card(pdf.name, page_no))
        print(f"  {pdf.name} page {page_no}: {len(crops)} cards", flush=True)
        for crop in crops:
            card = Card(pdf.name, page_no, part_no=part_no, header=header)
            try:
                conf = extract_card_local(crop, card)
                validate(card, conf)
                card.card_jpg = to_jpg(crop, 85)
                if card.reasons and args.gemini and gemini_ok[0]:
                    try:
                        local_reasons = list(card.reasons)
                        apply_gemini(card)
                        card.reasons = []
                        validate(card, 1.0)
                        if card.reasons:
                            card.reasons.insert(0, "after Gemini")
                        elif local_reasons:
                            card.reasons = []
                    except RuntimeError as exc:
                        print(f"  ! {exc}; continuing locally only", flush=True)
                        gemini_ok[0] = False
                    except Exception as exc:  # noqa: BLE001
                        card.reasons.append(f"gemini error: {exc}")
            except Exception as exc:  # noqa: BLE001
                card.reasons.append(f"error: {exc}")
            card.card_jpg = None
            cards.append(card)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("input", nargs="?", default="input", help="PDF file or folder")
    ap.add_argument("-o", "--output", default="output/extracted.xlsx")
    ap.add_argument("--dpi", type=int, default=200)
    ap.add_argument("--gemini", action="store_true",
                    help="re-read flagged cards with the free Gemini API (needs GEMINI_API_KEY)")
    ap.add_argument("--no-images", action="store_true", help="do not embed phone crops")
    ap.add_argument("--max-pages", type=int, default=0, help="limit pages per PDF (testing)")
    args = ap.parse_args()

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
    try:
        for pdf in pdfs:
            print(f"Processing {pdf.name}", flush=True)
            try:
                process_pdf(pdf, args, cards, gemini_ok)
            except Exception as exc:  # noqa: BLE001
                errors.append((pdf.name, f"{exc}"))
                traceback.print_exc()
    except KeyboardInterrupt:
        print("Interrupted - saving what was extracted so far.")
    finally:
        write_excel(cards, errors, out, images=not args.no_images)
    flagged = sum(1 for c in cards if c.reasons)
    print(f"Done: {len(cards)} cards, {flagged} need review -> {out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
