# Voter-roll PDF → Excel extractor (free, Windows)

Reads scanned Telugu electoral-roll PDFs (3 × 10 voter cards per page, handwritten
phone number on each card) and writes one Excel file with a row per voter.
Everything runs locally and costs nothing. An optional free Gemini step can re-read
cards the local OCR is unsure about.

## One-time setup (Windows)

1. Install **Python 3.10+** from python.org (tick "Add Python to PATH").
2. Install **Tesseract OCR**: https://github.com/UB-Mannheim/tesseract/wiki
   - In the installer, under *Additional language data*, tick **Telugu**.
3. That's it. The first `run.bat` creates a virtual environment and installs the
   Python packages (EasyOCR downloads its small digit model once).

## One-time setup (macOS)

1. Install Homebrew (brew.sh), then run in Terminal:
   `brew install python tesseract tesseract-lang`
   (`tesseract-lang` includes Telugu.)
2. In Terminal: `cd` into this folder and run `chmod +x run.sh` once.

Then put PDFs in `input/` and run `./run.sh`. For the optional Gemini step, run
`export GEMINI_API_KEY=your_key` first. Works on Apple Silicon and Intel Macs.

## Use (Windows)

1. Copy your PDFs into the `input\` folder.
2. Double-click **`run.bat`**.
3. Open `output\extracted.xlsx`.

**Choosing pages:** `run.bat` asks "Pages to process" each time. Type e.g. `1-5,8,10-12`
and only those pages (of every PDF in `input\`) are read; press Enter for all pages. The
same works from a terminal: `run.bat --pages 3-6`. To limit by file, put only the PDFs you
want in `input\`.

Other options (add after `run.bat` from a terminal): `--dpi 300` for poor scans,
`--max-pages 2` to test quickly, `--no-images` for a smaller Excel file.

## Watching results live

* The console prints one line per page (voters found, how many need review) plus the
  first few EPIC / phone / house-no rows, and flags problems as they happen.
* `output\extracted.xlsx` is re-saved every 3 pages (`--save-every N`), so you can open
  it while the run continues. **Excel locks an open file**: a save that hits the lock is
  skipped with a note and tried again later, and the final save goes to
  `extracted_final.xlsx` if the file is still open. For best results, close and reopen
  the file to refresh.
* `--show 0` hides the console preview; `--save-every 1` saves after every page.

## Skipped pages (saves API quota)

Before any Gemini request, each page is checked locally: it must contain at least one
card whose EPIC ID reads as 3 letters + 7 digits. Map, photo, cover and blank pages fail
that check and are **skipped without using the API**. They are printed while running
("SKIPPED - no EPIC IDs found"), summarised at the end (including any PDF with no voter
data at all), and listed in the **Skipped pages** sheet. If a real voter page was skipped
by mistake (very poor scan), rerun with `--no-skip` and tell the developer.

## Output

Sheet **Voters** (one row per voter, EPIC ID is the key; repeated EPIC IDs are dropped):

| EPIC ID | Name | Address (House No) | Phone | Phone (crop) | Needs Review | Review Reason | Source PDF | Page | Read by |

* "Address" is the house number printed on the card (the roll has no fuller address).
* Rows that fail a check are red: EPIC not 3 letters + 7 digits, phone not a 10-digit
  Indian mobile number, name or house number missing.
* **Phone (crop)** embeds the image of the handwritten number so you can verify or fix it
  without opening the PDF.
* **Read by** is the Gemini model that read the page (Flash-Lite models are less accurate on
  handwriting, so check those rows more carefully).
* Sheet **Errors** lists PDFs that could not be processed.

## Accuracy: use the free Gemini step for handwriting

Local OCR reads the printed EPIC ID and house number well, but it **cannot reliably read
handwritten digits or Telugu names**. For usable phone numbers, turn on Gemini:

1. Create a free key at https://aistudio.google.com/apikey (no card needed).
2. In `run.bat`, remove `rem` from the `set GEMINI_API_KEY=...` line and paste the key.

With a key, each **page** (about 30 voters) is sent as one request. Free-tier daily limits
are small and **per model** (check yours at aistudio.google.com, "Rate limit"; at the time
of writing the Flash models allowed about 5 requests/minute and 20 requests/day each). The
script uses every suitable Flash model in turn: when one hits its daily limit it switches
to the next, so the free allowance is roughly 20 pages per model per day. Set
`GEMINI_MODEL=name1,name2` in `run.bat` to choose models and their order. Every page result is cached in `output\cache`, so if the
quota runs out the script says so, and running `run.bat` again the next day continues
without re-sending finished pages. The local EPIC read is used as a cross-check.

**Privacy:** on the free tier Google may use submitted images to improve its products,
so leave Gemini off if the handwritten phone numbers must not leave your PC. The
`input\*.pdf` and `output\` folders are git-ignored.

## Tuning

If cards are split wrongly or fields are cut off on your scans, adjust the relative
regions at the top of `extract.py` (`REG_*`, `TEXT_LINE_CENTRES`).
