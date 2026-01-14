@echo off
setlocal
cd /d "%~dp0"

echo ==========================================
echo   HoneyBadger Dashboard - Windows Setup
echo ==========================================

:: Check if Node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

echo.
echo Installing dependencies (this may take a moment)...
call npm install

echo.
echo Starting Dashboard...
echo Access at: http://localhost:5173
echo.
call npm run dev

pause
