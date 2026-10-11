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

Useful options (add after `run.bat` from a terminal): `--dpi 300` for poor scans,
`--max-pages 2` to test quickly, `--no-images` for a smaller Excel file.

## Output

Sheet **Voters**: Source PDF, Page, Part No, Constituency / Section (raw header text),
Serial No, EPIC ID, Voter Name, Relation Type, Relative Name, House No, Age, Gender,
Phone, **Phone (crop)**, Needs Review, Review Reason, Method.

* Rows that fail a check are highlighted red with the reason listed. Checks: EPIC is
  3 letters + 7 digits, phone is a 10-digit Indian mobile number, age 18–120, gender,
  name present.
* **Phone (crop)** embeds the image of the handwritten number so you can verify or
  correct it without opening the PDF. Handwriting is the least reliable field; always
  skim the red rows.
* Sheet **Errors** lists PDFs that could not be processed.

## Optional: free Gemini fallback

1. Create a free key at https://aistudio.google.com/apikey (no card needed).
2. In `run.bat`, uncomment the `set GEMINI_API_KEY=...` line and paste the key.

Only flagged cards are sent (one image per card), at about 13 requests a minute to stay
inside free-tier limits. When the daily free quota runs out the script says so and
carries on locally. **Privacy:** on the free tier Google may use submitted images to
improve its products, so leave this off if the handwritten phone numbers must not
leave your PC. The `input\*.pdf` and `output\` folders are git-ignored.

## Tuning

If cards are split wrongly or fields are cut off on your scans, adjust the relative
regions at the top of `extract.py` (`REG_*`, `TEXT_LINE_CENTRES`). Telugu names are read
with Tesseract and will contain some errors; the Gemini option reads them much better.
