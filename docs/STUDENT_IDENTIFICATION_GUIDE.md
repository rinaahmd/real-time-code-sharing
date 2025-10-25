# 🎓 VSCode Student Window Identification Guide

## Current Student List
Based on your recent student creation, you have these students:

1. **abed** - Original student
2. **rina** - Original student  
3. **sara** - Created in recent batch
4. **roi** - Created in recent batch
5. **kasem** - Created in recent batch
6. **lora** - Created in recent batch

## 🔍 How to Identify VSCode Windows

### Method 1: Check Window Titles
Look at your taskbar - each VSCode window should show:
- "VSCode - Student: [Name]" (if the renaming worked)
- Or just "Visual Studio Code" (if renaming didn't work)

### Method 2: Check Window Order
VSCode windows typically open in this order:
1. **First window**: abed
2. **Second window**: rina  
3. **Third window**: sara
4. **Fourth window**: roi
5. **Fifth window**: kasem
6. **Sixth window**: lora

### Method 3: Check User Data Directories
Each VSCode instance uses a different data directory:
- Student 1: `C:\Temp\Students\Student1` → **abed**
- Student 2: `C:\Temp\Students\Student2` → **rina**
- Student 3: `C:\Temp\Students\Student3` → **sara**
- Student 4: `C:\Temp\Students\Student4` → **roi**
- Student 5: `C:\Temp\Students\Student5` → **kasem**
- Student 6: `C:\Temp\Students\Student6` → **lora**

### Method 4: Manual Testing
1. Open each VSCode window
2. Install the extension: `Ctrl+Shift+P` → "Extensions: Install from VSIX"
3. Select: `code-sharing-extension-1.0.0.vsix`
4. When prompted for student name, enter the correct name
5. The extension will remember the name for that window

## 🎯 Quick Identification Steps

1. **Count your VSCode windows** - You should have 6 total
2. **Look at taskbar** - Each window should be labeled
3. **Test with extension** - Install extension in each window and set the student name
4. **Verify in lecturer interface** - Check `http://localhost:3000` to see which students are active

## 📋 Student Status Check

To see which students are currently active in the system:

```bash
# Check current statistics
curl http://localhost:3001/health

# Check current submissions
curl http://localhost:3001/api/codes
```

## 🚀 Next Steps

1. **Install Extension**: In each VSCode window, install the code sharing extension
2. **Set Student Names**: When prompted, enter the correct student name
3. **Test Code Sharing**: Try sharing code from each student window
4. **Verify in Lecturer Interface**: Check `http://localhost:3000` to see submissions

## 💡 Pro Tips

- **Window Order**: VSCode windows typically open in the order they were created
- **Extension Memory**: The extension remembers the student name for each window
- **Unique Directories**: Each student has a separate VSCode data directory
- **Taskbar Identification**: Look for multiple VSCode icons in your taskbar

## 🔧 Troubleshooting

If you're still having trouble identifying windows:

1. **Close all VSCode windows**
2. **Run the student creation script again** with clear names
3. **Use the improved scripts** that include student names in window titles
4. **Manually rename windows** by right-clicking on taskbar icons

---

**Your 6 students are ready to start coding! Each VSCode window represents a different student in your classroom simulation.** 🎓✨


