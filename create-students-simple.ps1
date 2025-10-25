# Create 4 Student VSCode Instances - Simple Version
Write-Host "Creating 4 Student VSCode Instances" -ForegroundColor Cyan

# Student names
$students = @("Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince")

# VSCode path
$vscodePath = "C:\Users\$env:USERNAME\AppData\Local\Programs\Microsoft VS Code\Code.exe"

# Check if VSCode exists
if (!(Test-Path $vscodePath)) {
    Write-Host "VSCode not found at: $vscodePath" -ForegroundColor Red
    exit 1
}

Write-Host "VSCode found. Creating instances..." -ForegroundColor Green

# Create student instances
foreach ($student in $students) {
    Write-Host "Creating VSCode for: $student" -ForegroundColor Yellow
    Start-Process -FilePath $vscodePath -ArgumentList "--new-window" -WindowStyle Normal
    Start-Sleep -Seconds 2
}

Write-Host "Successfully created 4 VSCode instances!" -ForegroundColor Green
Write-Host "Students: Alice Johnson, Bob Smith, Charlie Brown, Diana Prince" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Install extension in each VSCode: Ctrl+Shift+P -> Extensions: Install from VSIX" -ForegroundColor White
Write-Host "2. Select: vscode-extension\code-sharing-extension-1.0.0.vsix" -ForegroundColor White
Write-Host "3. Set student names in each extension" -ForegroundColor White