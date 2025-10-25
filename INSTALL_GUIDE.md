# Code Sharing Extension - Quick Install Scripts

This folder contains scripts to help you quickly install and use the Code Sharing extension.

## Available Scripts

### 1. `install-extension.bat` (Recommended - One Click!)
- **Double-click** to run
- Automatically installs the VSIX extension
- Opens VS Code when installation is complete
- **Best for**: Quick installation

### 2. `install-extension.ps1` (PowerShell Version)
- Run with: `powershell .\install-extension.ps1`
- Same functionality as the batch file
- Provides more detailed output
- **Best for**: Advanced users

### 3. `open-vscode-with-extension.bat`
- Opens VS Code and shows instructions
- Doesn't install automatically
- **Best for**: Manual installation

## How to Use

### For Students (First Time Setup):

1. **Double-click** `install-extension.bat`
2. Choose option **1** to install automatically
3. Wait for the installation to complete
4. VS Code will open automatically
5. Reload the window (Ctrl+Shift+P → "Reload Window")
6. Start coding!

### For Lecturers:

1. Make sure the backend server is running:
   ```bash
   cd backend-server
   npm start
   ```

2. Open the lecturer interface:
   ```bash
   cd lecturer-interface
   npm start
   ```

3. Distribute the `install-extension.bat` file to students

## Troubleshooting

### "VS Code not found"
- Install Visual Studio Code from: https://code.visualstudio.com/
- Make sure VS Code is in your PATH

### "VSIX file not found"
- Build the extension first:
  ```bash
  cd vscode-extension
  npm run compile
  npx @vscode/vsce package
  ```

### "PowerShell execution policy error"
- Run the batch file instead of the PowerShell script
- Or run: `powershell -ExecutionPolicy Bypass -File install-extension.ps1`

## Features

✅ Automatic installation  
✅ One-click setup  
✅ Clear instructions  
✅ Error handling  
✅ Visual feedback  

## System Requirements

- Windows 10/11
- Visual Studio Code installed
- PowerShell 5.0 or later

## Quick Start

1. Double-click `install-extension.bat`
2. Choose option 1
3. Done! 🎉


