@echo off
echo 🎓 Creating VSCode windows for multiple students...
echo.

echo 📝 Student 1 (Alice) - Default VSCode window
start "" "C:\Users\%USERNAME%\AppData\Local\Programs\Microsoft VS Code\Code.exe"

echo 📝 Student 2 (Bob) - New window with separate data
start "" "C:\Users\%USERNAME%\AppData\Local\Programs\Microsoft VS Code\Code.exe" --user-data-dir "C:\Temp\VSCodeStudent2"

echo 📝 Student 3 (Charlie) - New window with separate data
start "" "C:\Users\%USERNAME%\AppData\Local\Programs\Microsoft VS Code\Code.exe" --user-data-dir "C:\Temp\VSCodeStudent3"

echo 📝 Student 4 (Diana) - New window with separate data
start "" "C:\Users\%USERNAME%\AppData\Local\Programs\Microsoft VS Code\Code.exe" --user-data-dir "C:\Temp\VSCodeStudent4"

echo.
echo ✅ 4 VSCode windows created!
echo.
echo 📋 Instructions:
echo 1. In each window, install the extension: Ctrl+Shift+P → "Extensions: Install from VSIX"
echo 2. Select: code-sharing-extension-1.0.0.vsix
echo 3. Enter different names for each student
echo 4. Start sharing code!
echo.
pause 