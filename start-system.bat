@echo off
echo 🚀 Starting Real-Time Code Sharing System...
echo.

echo 📡 Starting Backend Server...
start "Backend Server" cmd /k "cd backend-server && npm start"

echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo 🌐 Starting Lecturer Interface...
start "Lecturer Interface" cmd /k "cd lecturer-interface && npm start"

echo ⏳ Waiting for frontend to start...
timeout /t 5 /nobreak > nul

echo 🎉 System is starting up!
echo.
echo 📍 Backend: http://localhost:3001
echo 📍 Lecturer Interface: http://localhost:3000
echo.
echo 📦 Extension file: vscode-extension\code-sharing-extension-1.0.0.vsix
echo.
echo ✅ Ready for classroom use!
pause 