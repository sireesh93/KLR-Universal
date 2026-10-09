@echo off
setlocal
cd /d "%~dp0"

if not exist "input" mkdir input
if not exist "output" mkdir output

if not exist ".venv\Scripts\python.exe" (
  echo First run: creating Python environment and installing packages...
  python -m venv .venv || (echo Python 3.10+ is required. Install from python.org & pause & exit /b 1)
  ".venv\Scripts\python.exe" -m pip install --upgrade pip
  ".venv\Scripts\python.exe" -m pip install -r requirements.txt || (pause & exit /b 1)
)

rem Tesseract (see README). Add its folder to PATH for this run if installed in the default place.
if exist "C:\Program Files\Tesseract-OCR\tesseract.exe" set "PATH=%PATH%;C:\Program Files\Tesseract-OCR"

rem Optional: free Gemini fallback for cards the local OCR is unsure about.
rem   1) get a free key at https://aistudio.google.com/apikey
rem   2) remove "rem" from the next line and paste your key
rem set GEMINI_API_KEY=PASTE_KEY_HERE
if defined GEMINI_API_KEY (set "EXTRA=--gemini") else (set "EXTRA=")

".venv\Scripts\python.exe" -W ignore extract.py input -o output\extracted.xlsx %EXTRA% %*
echo.
pause
