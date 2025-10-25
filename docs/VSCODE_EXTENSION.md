# 🔌 VSCode Extension Guide

Complete guide for installing and using the Code Sharing VSCode extension.

## 📦 Extension Overview

The Code Sharing extension allows students to:
- **Share code** with lecturers in real-time
- **Answer questions** created by lecturers
- **Receive AI feedback** on their submissions
- **Track progress** and submission history
- **Get notifications** about new questions

## 🚀 Installation Guide

### **Step 1: Locate Extension File**

The extension file is located at:
```
vscode-extension/code-sharing-extension-1.0.0.vsix
```

### **Step 2: Install Extension**

#### **Method A: Command Palette (Recommended)**
1. **Open VSCode** in your student instance
2. **Press** `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. **Type**: "Extensions: Install from VSIX"
4. **Select**: The command from the dropdown
5. **Navigate**: Browse to `vscode-extension/code-sharing-extension-1.0.0.vsix`
6. **Click**: "Install"
7. **Restart**: VSCode when prompted

#### **Method B: Drag and Drop**
1. **Open VSCode** in your student instance
2. **Drag** the `.vsix` file into the VSCode window
3. **Click**: "Install" when prompted
4. **Restart**: VSCode when prompted

#### **Method C: Terminal Command**
```bash
code --install-extension vscode-extension/code-sharing-extension-1.0.0.vsix
```

### **Step 3: Initial Setup**

After installation:
1. **Open Extension Panel**: Click the Code Sharing icon in the Activity Bar
2. **Enter Your Name**: When prompted, enter your student name
3. **Verify Connection**: Check that status shows "Connected"

## 🎯 Using the Extension

### **Extension Panel Overview**

The extension panel shows:
- **Your Name**: Student name (editable)
- **Connection Status**: Connected/Disconnected
- **Share Code Button**: Main action button
- **View Questions Button**: Access to active questions
- **Settings**: Extension configuration

### **Sharing Code**

#### **Share Entire File**
1. **Open** any code file in VSCode
2. **Click** "Share Code with Lecturer" button
3. **Select** "Share Entire File"
4. **Confirm** the action
5. **Wait** for confirmation message

#### **Share Selected Code**
1. **Select** the code you want to share
2. **Click** "Share Code with Lecturer" button
3. **Select** "Share Selected Code"
4. **Confirm** the action
5. **Wait** for confirmation message

### **Answering Questions**

#### **View Active Questions**
1. **Click** "View Questions" button
2. **See** list of active questions
3. **Click** on a question to view details
4. **Write** your solution in VSCode
5. **Submit** using the share button

#### **Question Submission Process**
1. **Write** your solution code
2. **Click** "Share Code with Lecturer"
3. **Choose** "Yes, Submit Answer"
4. **Select** the question you're answering
5. **Submit** and wait for AI feedback

### **Receiving Feedback**

After submitting code, you'll receive:
- **Score**: Percentage (0-100)
- **Status**: Correct/Incorrect
- **Feedback**: Detailed comments
- **Suggestions**: Improvement tips

## ⚙️ Extension Settings

### **Accessing Settings**
1. **Open** extension panel
2. **Click** settings icon (gear)
3. **Configure** your preferences

### **Available Settings**
- **Student Name**: Your display name
- **Auto-connect**: Connect automatically on startup
- **Notifications**: Enable/disable notifications
- **Theme**: Light/Dark mode preference

## 🔧 Troubleshooting

### **Common Issues**

#### **Extension Not Installing**
**Problem**: Extension fails to install
**Solutions**:
- Ensure VSCode is up to date
- Try installing from Command Palette
- Check file permissions
- Restart VSCode and try again

#### **Name Not Saving**
**Problem**: Student name not remembered
**Solutions**:
- Re-enter name in settings
- Check extension permissions
- Restart VSCode
- Reinstall extension if needed

#### **Connection Issues**
**Problem**: Can't connect to server
**Solutions**:
- Verify backend server is running
- Check network connection
- Ensure ports 3000/3001 are available
- Restart extension

#### **Code Not Sharing**
**Problem**: Share button not working
**Solutions**:
- Ensure code is selected or file is open
- Check connection status
- Verify extension is active
- Try refreshing the panel

### **Debug Information**

To get debug information:
1. **Open** VSCode Developer Tools (`Ctrl+Shift+I`)
2. **Go to** Console tab
3. **Look for** error messages
4. **Report** issues to lecturer

## 📊 Features Overview

### **Core Features**
- ✅ **Real-time Code Sharing**
- ✅ **Question Management**
- ✅ **AI Review System**
- ✅ **Progress Tracking**
- ✅ **Notification System**
- ✅ **Multi-language Support**

### **Supported Languages**
- **Python** (.py)
- **JavaScript** (.js)
- **TypeScript** (.ts)
- **Java** (.java)
- **C/C++** (.c, .cpp)
- **HTML** (.html)
- **CSS** (.css)
- **JSON** (.json)

### **Keyboard Shortcuts**
- `Ctrl+Shift+P`: Open Command Palette
- `Ctrl+Shift+X`: Open Extensions Panel
- `F1`: Alternative Command Palette shortcut

## 🎨 Extension Interface

### **Activity Bar Icon**
The extension adds an icon to the Activity Bar (left sidebar) that shows:
- **Badge**: Number of active questions
- **Color**: Green (connected) / Red (disconnected)

### **Panel Layout**
```
┌─────────────────────────┐
│  Code Sharing           │
├─────────────────────────┤
│  Student: [Your Name]   │
│  Status: Connected ✅   │
│                         │
│  [Share Code Button]    │
│  [View Questions]       │
│                         │
│  Settings ⚙️            │
└─────────────────────────┘
```

## 🔄 Updates and Maintenance

### **Extension Updates**
- **Automatic**: Extension updates automatically
- **Manual**: Check for updates in Extensions panel
- **Version**: Current version 1.0.0

### **Data Storage**
- **Local**: Extension settings stored locally
- **Server**: Submission data stored on server
- **Backup**: Regular backups recommended

## 💡 Tips and Best Practices

### **Efficient Usage**
1. **Keep Extension Open**: Leave panel open during coding
2. **Use Shortcuts**: Learn keyboard shortcuts for faster workflow
3. **Check Notifications**: Pay attention to question notifications
4. **Review Feedback**: Read AI suggestions carefully
5. **Practice Regularly**: Use the system for practice problems

### **Code Quality**
1. **Write Clean Code**: Use proper formatting and comments
2. **Test Before Submit**: Verify code works before sharing
3. **Follow Conventions**: Use language-specific best practices
4. **Meaningful Names**: Choose descriptive variable names
5. **Error Handling**: Include proper error handling

## 🎉 Success Tips

Students who excel with this extension:
- **Submit Early**: Don't wait until the last minute
- **Learn from Feedback**: Use AI suggestions to improve
- **Ask Questions**: Use the system to get help
- **Compare Solutions**: Look at other approaches
- **Practice Daily**: Regular use improves skills

---

**Ready to start sharing code? Install the extension and begin your coding journey!** 🚀
