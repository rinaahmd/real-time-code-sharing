# 🚀 Complete Installation Guide

Step-by-step guide to install and run the Real-Time Code Sharing system.

## 📋 Prerequisites

Before starting, ensure you have:

### **Required Software**
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **VSCode** - [Download here](https://code.visualstudio.com/)
- **Git** - [Download here](https://git-scm.com/)
- **PowerShell** (Windows) or Terminal (Mac/Linux)

### **System Requirements**
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 2GB free space
- **Network**: Internet connection for initial setup
- **OS**: Windows 10+, macOS 10.14+, or Linux

## 🔧 System Installation

### **Step 1: Clone Repository**
```bash
git clone https://github.com/your-repo/real-time-code-sharing.git
cd real-time-code-sharing
```

### **Step 2: Install Backend Dependencies**
```bash
cd backend-server
npm install
```

### **Step 3: Install Frontend Dependencies**
```bash
cd ../lecturer-interface
npm install
```

### **Step 4: Build Backend**
```bash
cd ../backend-server
npm run build
```

## 🚀 Starting the System

### **Method 1: Automated Startup (Recommended)**

#### **Windows (PowerShell)**
```powershell
.\start-complete-system.ps1
```

#### **Windows (Batch)**
```cmd
.\start-complete-system.bat
```

#### **Manual Startup**
```bash
# Terminal 1: Backend Server
cd backend-server
npm start

# Terminal 2: Lecturer Interface
cd lecturer-interface
npm start
```

### **Step 5: Verify Installation**

#### **Check Backend Server**
- **URL**: `http://localhost:3001/health`
- **Expected**: JSON response with system status
- **Status**: Should show "OK"

#### **Check Lecturer Interface**
- **URL**: `http://localhost:3000`
- **Expected**: Web interface loads successfully
- **Status**: Should show dashboard with statistics

## 👥 Student Setup

### **Creating Student Instances**

#### **Method 1: Interactive PowerShell (Recommended)**
```powershell
.\create-custom-students.ps1
```

**Process:**
1. Enter number of students (1-10)
2. Enter each student's name
3. VSCode instances open automatically
4. Each student gets unique data directory

#### **Method 2: Batch File**
```cmd
.\create-custom-students.bat
```

#### **Method 3: Configuration File**
1. **Edit** `students-config.txt`:
```
Alice
Bob
Charlie
Diana
Emma
```

2. **Run**:
```powershell
.\create-students-from-config.ps1
```

### **Installing VSCode Extension**

#### **For Each Student Instance:**
1. **Open VSCode** in the student instance
2. **Press** `Ctrl+Shift+P`
3. **Type**: "Extensions: Install from VSIX"
4. **Select**: `vscode-extension\code-sharing-extension-1.0.0.vsix`
5. **Enter Name**: When prompted, enter student name
6. **Verify**: Extension appears in Activity Bar

## 🎯 Testing the System

### **Test 1: Create a Question**
1. **Open**: `http://localhost:3000`
2. **Click**: "Questions" tab
3. **Click**: "Create Question"
4. **Fill Details**:
   - Title: "Test Question"
   - Text: "Write a simple hello world program"
   - Language: "python"
   - Difficulty: "easy"
5. **Click**: "Create Question"
6. **Activate**: Click "Activate" button

### **Test 2: Student Submission**
1. **Open Student VSCode**: One of the created instances
2. **Write Code**: Simple Python program
3. **Click**: "Share Code with Lecturer" button
4. **Choose**: "Yes, Submit Answer"
5. **Select**: The test question
6. **Submit**: Wait for AI feedback

### **Test 3: View Results**
1. **Refresh**: Lecturer interface
2. **Check**: Submissions appear in real-time
3. **Verify**: AI review and scoring
4. **Test**: Copy code and export features

## 🔧 Configuration

### **Environment Variables**
Create `.env` file in `backend-server/`:
```env
PORT=3001
NODE_ENV=development
DATABASE_PATH=./data/code_sharing.db
```

### **Database Configuration**
- **Type**: SQLite (automatic)
- **Location**: `backend-server/data/code_sharing.db`
- **Backup**: Regular exports recommended

### **Network Configuration**
- **Backend Port**: 3001 (configurable)
- **Frontend Port**: 3000 (configurable)
- **WebSocket**: Same port as backend
- **CORS**: Configured for localhost

## 🛠️ Troubleshooting

### **Common Installation Issues**

#### **Node.js Not Found**
**Problem**: `npm` command not recognized
**Solution**:
- Install Node.js from official website
- Restart terminal/command prompt
- Verify installation: `node --version`

#### **Port Already in Use**
**Problem**: Port 3000 or 3001 occupied
**Solution**:
- Kill existing processes: `netstat -ano | findstr :3000`
- Use different ports in configuration
- Restart computer if needed

#### **Permission Denied**
**Problem**: Cannot create directories or files
**Solution**:
- Run as Administrator (Windows)
- Check folder permissions
- Use different installation directory

#### **Extension Installation Failed**
**Problem**: VSCode extension won't install
**Solution**:
- Ensure VSCode is latest version
- Use Command Palette method
- Check file permissions
- Try manual installation

### **Runtime Issues**

#### **Backend Server Won't Start**
**Problem**: Backend fails to start
**Solutions**:
- Check if port 3001 is available
- Verify all dependencies installed
- Check database file permissions
- Review error logs

#### **Frontend Won't Load**
**Problem**: Lecturer interface blank
**Solutions**:
- Check if port 3000 is available
- Verify React dependencies installed
- Clear browser cache
- Check browser console for errors

#### **Database Issues**
**Problem**: Data not persisting
**Solutions**:
- Check `backend-server/data/` directory
- Verify SQLite installation
- Check file permissions
- Review database logs

#### **Student Connection Issues**
**Problem**: Students can't connect
**Solutions**:
- Verify backend server running
- Check WebSocket connection
- Ensure extension installed correctly
- Test network connectivity

## 📊 System Verification

### **Health Checks**
```bash
# Backend Health
curl http://localhost:3001/health

# Frontend Health
curl http://localhost:3000

# Database Status
curl http://localhost:3001/api/questions
```

### **Expected Responses**
- **Backend**: JSON with status "OK" and statistics
- **Frontend**: HTML page loads successfully
- **Database**: JSON array of questions (may be empty initially)

## 🔄 Updates and Maintenance

### **Updating the System**
1. **Backup Data**: Export current submissions
2. **Pull Updates**: `git pull origin main`
3. **Update Dependencies**: `npm install`
4. **Rebuild**: `npm run build`
5. **Restart Services**: Stop and start servers

### **Regular Maintenance**
- **Weekly**: Export submission data
- **Monthly**: Clear old submissions
- **Quarterly**: Update dependencies
- **Annually**: Review and update questions

## 📱 Mobile Setup

### **Lecturer Interface on Mobile**
- **URL**: `http://localhost:3000` (replace localhost with your IP)
- **Network**: Ensure mobile device on same network
- **Browser**: Use modern mobile browser
- **Features**: Limited functionality on mobile

### **Student Mobile Access**
- **VSCode Extension**: Desktop only
- **Alternative**: Use mobile browser for viewing questions
- **Limitations**: Cannot submit code from mobile

## 🌐 Network Configuration

### **Local Network Access**
To allow other devices on your network:

1. **Find Your IP**: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. **Update URLs**: Replace `localhost` with your IP address
3. **Configure Firewall**: Allow ports 3000 and 3001
4. **Test Access**: Try accessing from another device

### **Production Deployment**
For production use:
- **Backend**: Deploy to cloud service (Heroku, AWS, etc.)
- **Frontend**: Deploy to web hosting
- **Database**: Use production database (PostgreSQL, MySQL)
- **Domain**: Configure custom domain name

## 🎉 Success Indicators

### **System Working Correctly**
- ✅ Backend server responds to health checks
- ✅ Lecturer interface loads without errors
- ✅ Student VSCode instances open successfully
- ✅ Extensions install and connect properly
- ✅ Questions can be created and activated
- ✅ Students can submit code and receive feedback
- ✅ Real-time updates work in lecturer interface

### **Performance Benchmarks**
- **Startup Time**: < 30 seconds for all services
- **Response Time**: < 1 second for API calls
- **Memory Usage**: < 500MB for backend, < 200MB for frontend
- **Concurrent Users**: Supports 50+ students simultaneously

---

**Installation complete! Your Real-Time Code Sharing system is ready for classroom use.** 🚀


