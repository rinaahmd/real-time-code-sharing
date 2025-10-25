# 🎓 Interactive Student VSCode Instance Creator (PowerShell)
# ========================================================

Write-Host "🎓 Interactive Student VSCode Instance Creator" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Get number of students
do {
    $studentCount = Read-Host "Enter number of students (1-10)"
    $studentCount = [int]$studentCount
} while ($studentCount -lt 1 -or $studentCount -gt 10)

Write-Host ""
Write-Host "📝 Creating $studentCount VSCode instances..." -ForegroundColor Yellow
Write-Host ""

# Create temporary directory for student data
$studentsDir = "C:\Temp\Students"
if (!(Test-Path $studentsDir)) {
    New-Item -ItemType Directory -Path $studentsDir | Out-Null
}

# Arrays to store student information
$studentNames = @()
$studentPaths = @()

# Create VSCode instances
for ($i = 1; $i -le $studentCount; $i++) {
    Write-Host "📝 Student $i:" -ForegroundColor Green
    $name = Read-Host "Enter name for Student $i"
    $studentNames += $name
    
    # Create student-specific directory
    $studentPath = "C:\Temp\Students\Student$i"
    if (!(Test-Path $studentPath)) {
        New-Item -ItemType Directory -Path $studentPath | Out-Null
    }
    $studentPaths += $studentPath
    
    # Find VSCode executable
    $vscodePath = "C:\Users\$env:USERNAME\AppData\Local\Programs\Microsoft VS Code\Code.exe"
    if (!(Test-Path $vscodePath)) {
        # Try alternative paths
        $vscodePath = "C:\Program Files\Microsoft VS Code\Code.exe"
    }
    if (!(Test-Path $vscodePath)) {
        Write-Host "❌ VSCode not found! Please install VSCode first." -ForegroundColor Red
        pause
        exit 1
    }
    
    # Start VSCode with unique user data directory and custom window title
    Start-Process -FilePath $vscodePath -ArgumentList "--user-data-dir", "`"$studentPath`"", "--new-window", "--title", "`"VSCode - Student: $name`"" -WindowStyle Normal
    
    Write-Host "   ✅ Created VSCode instance for $name" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🎉 Successfully created $studentCount VSCode instances!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. In each VSCode window, install the extension:"
Write-Host "   Ctrl+Shift+P → 'Extensions: Install from VSIX'"
Write-Host "2. Select: vscode-extension\code-sharing-extension-1.0.0.vsix"
Write-Host "3. When prompted for name, use the names you entered above"
Write-Host "4. Start sharing code from each student!"
Write-Host ""
Write-Host "📍 Student Data Locations:" -ForegroundColor Yellow

for ($i = 0; $i -lt $studentCount; $i++) {
    Write-Host "   Student $($i+1) ($($studentNames[$i])): $($studentPaths[$i])" -ForegroundColor White
}

Write-Host ""
Write-Host "🚀 Ready to test the real-time code sharing system!" -ForegroundColor Cyan
pause
