@echo off
echo ========================================================
echo   Xposure 3.0 MCP Automatic Configurator for Windows
echo ========================================================
echo.
cd /d "%~dp0"
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Node.js is not found in your PATH.
  echo Please install Node.js from https://nodejs.org and rerun this script.
  pause
  exit /b 1
)

node install.js
echo.
pause
