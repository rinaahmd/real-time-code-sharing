# ⚡ Quick Start Guide

Get the Real-Time Code Sharing system running in 5 minutes!

## 🚀 Super Quick Setup

### **1. Start the System**
```bash
# Clone and setup (if not already done)
cd backend-server
npm install && npm run build && npm start

# In new terminal
cd lecturer-interface  
npm install && npm start
```

### **2. Create Students**
```powershell
# Run this in project root
.\create-custom-students.ps1
# Enter: 2 students, names: "alice" and "bob"
```

### **3. Install Extensions**
In each VSCode window:
- `Ctrl+Shift+P` → "Extensions: Install from VSIX"
- Select: `vscode-extension\code-sharing-extension-1.0.0.vsix`
- Enter student name when prompted

### **4. Test Everything**
1. **Open**: `http://localhost:3000`
2. **Create Question**: Click "Questions" → "Create Question"
3. **Activate**: Click "Activate" on the question
4. **Student Test**: In VSCode, write code and click "Share Code with Lecturer"

## ✅ Verify Everything Works

### **Check These URLs**
- **Lecturer Interface**: `http://localhost:3000` ✅
- **Backend Health**: `http://localhost:3001/health` ✅
- **Questions API**: `http://localhost:3001/api/questions` ✅

### **Expected Results**
- Lecturer interface shows dashboard with statistics
- Students can see questions in VSCode extension
- Code submissions appear in real-time
- AI feedback is generated automatically

## 🎯 Ready to Use!

Your system is now ready for classroom use with:
- ✅ 2 student instances (alice, bob)
- ✅ VSCode extensions installed
- ✅ Backend server running with database
- ✅ Lecturer interface accessible
- ✅ Real-time code sharing working

## 📚 Next Steps

- **Create More Questions**: Use the lecturer interface
- **Add More Students**: Run the student creation script again
- **Customize Settings**: Modify questions and difficulty levels
- **Export Data**: Download submissions for analysis

---

**Need help? Check the detailed guides in the `docs/` folder!** 📖


