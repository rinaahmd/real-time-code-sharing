# Start Both Servers - Simple Version
Write-Host "Starting Backend and Frontend Servers..." -ForegroundColor Cyan

# Start backend server
Write-Host "Starting backend server..." -ForegroundColor Yellow
Start-Process -FilePath "cmd" -ArgumentList "/c", "cd backend-server && npm start" -WindowStyle Normal

# Wait a moment
Start-Sleep -Seconds 3

# Start frontend server  
Write-Host "Starting frontend server..." -ForegroundColor Yellow
Start-Process -FilePath "cmd" -ArgumentList "/c", "cd lecturer-interface && npm start" -WindowStyle Normal

Write-Host "Both servers should be starting..." -ForegroundColor Green
Write-Host "Backend: http://localhost:3001" -ForegroundColor White
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Wait 10-15 seconds for servers to fully start, then test the new AI review system!" -ForegroundColor Cyan
