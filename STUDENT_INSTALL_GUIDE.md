# 👨‍🎓 Student Installation Guide

## 🚀 Quick Installation (2 Steps)

### **Step 1: Download the Extension**
- Get the file: `code-sharing-extension-1.0.0.vsix`
- Save it to your computer (Desktop is fine)

### **Step 2: Install in VSCode**
1. **Open VSCode**
2. **Press `Ctrl+Shift+P`** (Windows) or `Cmd+Shift+P` (Mac)
3. **Type**: "Extensions: Install from VSIX"
4. **Select** the `code-sharing-extension-1.0.0.vsix` file
5. **Click "Install"**
6. **Reload VSCode** if prompted

### **Step 3: Start Using**
1. **Open any code file** (or create a new one)
2. **Enter your name** when prompted (only once!)
3. **Click "Share Code with Lecturer"** button
4. **Your code appears instantly** in the lecturer's interface!

---

## 🎯 **For Multiple Students (Same Computer)**

If you want to simulate multiple students on the same computer:

### **Method 1: Use Different VSCode Windows**
```bash
# First student (default)
code

# Second student
code --user-data-dir "C:\Temp\VSCodeStudent2"

# Third student
code --user-data-dir "C:\Temp\VSCodeStudent3"
```

### **Method 2: Use Different Folders**
```bash
# Each student gets their own folder
code --user-data-dir "C:\Students\Alice"
code --user-data-dir "C:\Students\Bob"
code --user-data-dir "C:\Students\Charlie"
```

**Benefits:**
- ✅ Each student has their own name and settings
- ✅ No conflicts between students
- ✅ Easy to manage multiple students
- ✅ Perfect for classroom demonstrations

---

## 🎯 What You'll See

### **First Time:**
- VSCode asks for your name (only once!)
- You enter your name (e.g., "John Doe")
- Welcome message appears
- Your name is saved for future sessions

### **Sharing Code:**
- "Share Code with Lecturer" button in the editor toolbar
- Click it to share your code instantly (uses your saved name)
- Success message confirms sharing

### **Changing Your Name:**
- Use command: "Code Sharing: Set Student Name" (Ctrl+Shift+P)
- Your name is remembered across VSCode sessions

### **In Lecturer Interface:**
- Your code appears with your name
- Lecturer can see it in real-time
- Code is highlighted with proper syntax

---

## 🚨 Troubleshooting

### **Extension Not Appearing:**
1. Check if it's installed: `Ctrl+Shift+X` → Search "Code Sharing"
2. If not installed, try the installation steps again
3. Restart VSCode if needed

### **Button Not Visible:**
1. Make sure you have a file open
2. Look in the editor toolbar (top-right of editor)
3. Try opening a different file type

### **Can't Share Code:**
1. Make sure the lecturer's system is running
2. Check your internet connection
3. Try sharing again

### **Multiple Students Not Working:**
1. Make sure each student uses a different `--user-data-dir`
2. Each student needs to install the extension separately
3. Each student will have their own name prompt

---

## 📝 Quick Test

1. **Create a test file**:
   ```javascript
   console.log("Hello, World!");
   ```

2. **Save it** as `test.js`

3. **Click "Share Code with Lecturer"**

4. **Check the lecturer's screen** - you should see your code!

---

## 🎓 Ready to Code!

Once installed, you can:
- ✅ Share any code file instantly
- ✅ Your name is remembered across sessions
- ✅ Share selected code or entire files
- ✅ Get immediate feedback from your lecturer
- ✅ Change your name anytime with a command
- ✅ Work alongside other students (with separate VSCode windows)

**Happy coding! 🚀** 