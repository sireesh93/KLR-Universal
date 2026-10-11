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

rem ---------------------------------------------------------------------------
rem Gemini settings live in a separate file, gemini_key.bat, so that updating this
rem file (git pull) never overwrites your key. Create it once: copy
rem gemini_key.bat.example to gemini_key.bat and put your key in it.
rem ---------------------------------------------------------------------------
if exist "gemini_key.bat" call "gemini_key.bat"

if defined GEMINI_API_KEY (
  echo Gemini key found.
) else (
  echo.
  echo NOTE: no Gemini key set - only poor local OCR will be used.
  echo       Copy gemini_key.bat.example to gemini_key.bat and add your key.
  echo.
)

set "PAGES_ARG="
if not "%~1"=="" goto run
echo.
set /p "PAGES=Pages to process, e.g. 1-5,8,10-12 (press Enter for ALL pages): "
if defined PAGES set "PAGES_ARG=--pages %PAGES%"

:run
".venv\Scripts\python.exe" -W ignore extract.py input -o output\extracted.xlsx %PAGES_ARG% %*
echo.
pause
