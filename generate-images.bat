@echo off
echo 🚀 Starting Image Gallery Generator...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found!
echo 🔄 Running image generator...
echo.

REM Run the generator script
node generate-image-list.js

echo.
echo 🎉 Done! Check the generated files:
echo    - script.js (updated with your images)
echo    - image-summary.md (summary of what was found)
echo.
pause
