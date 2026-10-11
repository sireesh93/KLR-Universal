#!/usr/bin/env bash
# macOS / Linux launcher. First time only:  chmod +x run.sh
set -e
cd "$(dirname "$0")"
mkdir -p input output

if ! command -v tesseract >/dev/null 2>&1; then
  echo "Tesseract not found. Install it with:  brew install tesseract tesseract-lang"
  exit 1
fi
if ! tesseract --list-langs 2>/dev/null | grep -qx tel; then
  echo "Telugu data missing. Install it with:  brew install tesseract-lang"
  exit 1
fi

if [ ! -x .venv/bin/python ]; then
  echo "First run: creating Python environment and installing packages..."
  python3 -m venv .venv
  .venv/bin/python -m pip install --upgrade pip
  .venv/bin/python -m pip install -r requirements.txt
fi

# Optional free Gemini fallback: export GEMINI_API_KEY=your_key  (see README)
EXTRA=""
[ -n "$GEMINI_API_KEY" ] && EXTRA="--gemini"

PAGES_ARG=""
if [ $# -eq 0 ]; then
  read -r -p "Pages to process, e.g. 1-5,8,10-12 (press Enter for ALL pages): " PAGES
  [ -n "$PAGES" ] && PAGES_ARG="--pages $PAGES"
fi

.venv/bin/python -W ignore extract.py input -o output/extracted.xlsx $EXTRA $PAGES_ARG "$@"
