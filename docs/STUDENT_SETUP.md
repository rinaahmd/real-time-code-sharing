# 🎓 Student Setup Guide

Complete guide for students to set up and use the Real-Time Code Sharing system.

## 📋 Prerequisites

Before starting, ensure you have:
- **VSCode** installed on your computer
- **Node.js** (v16 or higher) - for running the system
- **Git** - for cloning the repository

## 🚀 Step-by-Step Setup

### **Step 1: System Preparation**

The lecturer will prepare the system by running:
```bash
# Start the backend server
cd backend-server
npm install
npm run build
npm start

# Start the lecturer interface
cd lecturer-interface
npm install
npm start
```

### **Step 2: Student Instance Creation**

The lecturer will create student instances using one of these methods:

#### **Method A: Interactive PowerShell Script (Recommended)**
```powershell
.\create-custom-students.ps1
```

**What happens:**
1. Script asks for number of students (1-10)
2. You enter your name when prompted
3. VSCode instance opens automatically with your name
4. Your data is stored in `C:\Temp\Students\StudentX`

#### **Method B: Batch File Setup**
```cmd
.\create-custom-students.bat
```

#### **Method C: Configuration File**
```powershell
# Lecturer edits students-config.txt with names
.\create-students-from-config.ps1
```

### **Step 3: VSCode Extension Installation**

Once your VSCode instance is open:

1. **Open Command Palette**: Press `Ctrl+Shift+P`
2. **Search for Extension**: Type "Extensions: Install from VSIX"
3. **Select Extension**: Choose `vscode-extension\code-sharing-extension-1.0.0.vsix`
4. **Enter Your Name**: When prompted, enter the name you used during setup
5. **Extension Installed**: You'll see the Code Sharing extension in your sidebar

### **Step 4: Verify Installation**

Check that everything is working:
1. **Extension Panel**: Look for "Code Sharing" in the Activity Bar (left sidebar)
2. **Your Name**: Should be displayed in the extension panel
3. **Connection Status**: Should show "Connected" to the server

## 🎯 Using the System

### **Sharing Code**

#### **Method 1: Share Entire File**
1. Open any code file in VSCode
2. Click the "Share Code with Lecturer" button in the extension panel
3. Choose "Share Entire File"
4. Your code is sent to the lecturer interface

#### **Method 2: Share Selected Code**
1. Select the code you want to share
2. Click "Share Code with Lecturer"
3. Choose "Share Selected Code"
4. Only the selected portion is sent

### **Answering Questions**

When the lecturer creates a question:

1. **Notification**: You'll see a notification about a new question
2. **View Question**: Click "View Question" to see the full details
3. **Write Solution**: Write your code in VSCode
4. **Submit Answer**: Click "Share Code with Lecturer"
5. **Choose Submission**: Select "Yes, Submit Answer"
6. **Get Feedback**: Receive instant AI review with score and feedback

### **AI Review System**

After submitting code, you'll receive:
- **Score**: Percentage-based evaluation (0-100)
- **Correct/Incorrect**: Overall assessment
- **Feedback**: Detailed comments on your code
- **Suggestions**: Improvement recommendations

## 📊 Understanding Your Progress

### **Submission History**
- All your submissions are tracked
- You can see your progress over time
- Lecturer can view your submission history

### **Question Performance**
- Track your performance on different questions
- See which topics need more practice
- Monitor improvement over time

## 🔧 Troubleshooting

### **Common Issues**

#### **Extension Not Installing**
- **Solution**: Make sure you're using "Extensions: Install from VSIX"
- **Alternative**: Try installing from the Extensions marketplace

#### **Name Not Remembered**
- **Solution**: Re-enter your name in extension settings
- **Check**: Verify the extension is properly installed

#### **Connection Issues**
- **Check**: Ensure the backend server is running
- **Verify**: Lecturer interface is accessible at `http://localhost:3000`
- **Restart**: Try restarting VSCode

#### **Code Not Sharing**
- **Check**: Make sure you have code selected or a file open
- **Verify**: Extension is connected to the server
- **Try**: Refresh the extension panel

### **Getting Help**

If you encounter issues:
1. **Check Console**: Look for error messages in VSCode Developer Tools
2. **Ask Lecturer**: They can check the system status
3. **Restart**: Try restarting VSCode and the extension
4. **Reinstall**: Reinstall the extension if needed

## 💡 Tips for Success

### **Best Practices**
1. **Write Clean Code**: Use proper indentation and comments
2. **Test Your Code**: Make sure it works before submitting
3. **Read Questions Carefully**: Understand requirements before coding
4. **Use Meaningful Names**: Choose descriptive variable names
5. **Follow Language Conventions**: Use proper syntax for your language

### **Maximizing Learning**
1. **Submit Early**: Don't wait until the last minute
2. **Learn from Feedback**: Read AI suggestions carefully
3. **Compare Solutions**: Look at other students' approaches
4. **Ask Questions**: Use the system to get help when stuck
5. **Practice Regularly**: Use the system for practice problems

## 🎉 Success Stories

Students using this system have reported:
- **Faster Learning**: Immediate feedback accelerates understanding
- **Better Engagement**: Active participation in class discussions
- **Improved Confidence**: Regular practice builds coding skills
- **Peer Learning**: Seeing different approaches to problems
- **Professional Skills**: Using industry-standard tools

## 📱 Mobile Access

While the VSCode extension is desktop-only, you can:
- **View Questions**: Access the lecturer interface on mobile
- **Read Feedback**: Check your submission history
- **Monitor Progress**: Track your performance over time

## 🔄 System Updates

The system is regularly updated with:
- **New Features**: Enhanced functionality
- **Bug Fixes**: Improved stability
- **Performance Improvements**: Faster response times
- **UI Enhancements**: Better user experience

---

**Ready to start coding? Follow the setup steps above and begin your journey with real-time code sharing!** 🚀
