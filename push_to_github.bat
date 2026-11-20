@echo off
cd /d "%~dp0"
echo ======================================================
echo  Pushing Maharashtra Heritage Explorer to GitHub...
echo ======================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ======================================================
    echo  SUCCESS: Code pushed to GitHub successfully!
    echo ======================================================
) else (
    echo ======================================================
    echo  Push encountered an issue. See error details above.
    echo ======================================================
)
echo.
pause
