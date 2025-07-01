# 🚀 Complete Setup Guide

This comprehensive guide will help you set up and use the enhanced Real-Time Code Sharing system on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **VSCode or Cursor** - [Download here](https://code.visualstudio.com/) or [Cursor](https://cursor.sh/)
- **Git** - [Download here](https://git-scm.com/)

## 📁 Project Structure

```
Real-time code_sharing/
├── backend-server/          # Node.js backend with WebSocket support
├── vscode-extension/        # VSCode extension for students (with name memory)
├── lecturer-interface/      # Modern React web interface for lecturers
├── shared/                  # Shared utilities and types
└── docs/                    # Documentation and guides
```

## 🔧 Installation Steps

### 1. Backend Server Setup

```bash
# Navigate to backend directory
cd backend-server

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Build the project
npm run build

# Start the server
npm start
```

The backend server will run on `http://localhost:3001`

**Features:**
- WebSocket server for real-time communication
- REST API for code management
- Automatic code storage and retrieval
- Support for multiple concurrent connections

### 2. Lecturer Interface Setup

```bash
# Navigate to lecturer interface directory
cd lecturer-interface

# Install dependencies
npm install

# Start the development server
npm start
```

The lecturer interface will open at `http://localhost:3000`

**New Features:**
- 📊 Real-time statistics dashboard
- 🔍 Search and filter functionality
- 📋 One-click code copying
- 📥 Export all submissions
- 🗑️ Clear all submissions
- 🔄 Auto-refresh toggle
- 💎 Syntax highlighting
- 🔔 Smart notifications

### 3. VSCode Extension Setup

```bash
# Navigate to VSCode extension directory
cd vscode-extension

# Install dependencies
npm install

# Build the extension
npm run compile
```

**Enhanced Features:**
- Smart name memory between sessions
- Automatic language detection
- Progress feedback during sharing
- Error handling and user guidance

## 🎯 How to Use

### For Students (VSCode Extension)

#### **Installation**
1. **Install the Extension**:
   - Open VSCode/Cursor
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Extensions: Install from VSIX"
   - Select the `code-sharing-extension-1.0.0.vsix` file

#### **First Time Setup**
1. **Open any code file** in VSCode
2. **Click the "Share Code with Lecturer" button** in the editor toolbar
3. **Enter your name** when prompted
4. **Your name is now saved** for future sessions!

#### **Daily Usage**
1. **Open your code file**
2. **Click "Share Code with Lecturer"**
3. **Choose to use your saved name** or change it
4. **Your code appears instantly** in the lecturer's interface

#### **Advanced Features**
- **Select specific code**: Highlight code before clicking share
- **Share entire files**: Click share without selection
- **Change your name**: Select "Change name..." option anytime

### For Lecturers (Web Interface)

#### **Getting Started**
1. **Open the interface**: Navigate to `http://localhost:3000`
2. **View real-time submissions**: Code appears instantly as students share
3. **Monitor statistics**: See total submissions, active students, and languages

#### **Search and Filter**
- **Search by name**: Type student names in the search box
- **Filter by language**: Select specific programming languages
- **Real-time filtering**: Results update as you type

#### **Code Management**
- **Copy code**: Click the copy button on any code card
- **Export all**: Download all submissions as JSON file
- **Clear all**: Remove all submissions for new sessions
- **Toggle auto-refresh**: Control when new submissions appear

#### **Statistics Dashboard**
- **Total Submissions**: Number of code shares
- **Active Students**: Unique students who have shared
- **Languages Used**: Different programming languages submitted

## 🔍 Testing the System

### Test the Complete Flow

1. **Start the Backend**:
   ```bash
   cd backend-server
   npm start
   ```

2. **Start the Lecturer Interface**:
   ```bash
   cd lecturer-interface
   npm start
   ```

3. **Test Code Sharing**:
   - Open the lecturer interface in your browser
   - Use the VSCode extension to share some code
   - Watch the code appear in real-time with notifications
   - Test search, filter, and copy features

### Manual API Testing

You can test the backend API directly:

```bash
# Get all shared codes
curl http://localhost:3001/api/codes

# Share a code snippet
curl -X POST http://localhost:3001/api/codes \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Test Student",
    "code": "console.log(\"Hello, World!\");",
    "language": "javascript"
  }'

# Clear all codes
curl -X DELETE http://localhost:3001/api/codes
```

## 🛠️ Development

### Backend Development

```bash
cd backend-server
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development

```bash
cd lecturer-interface
npm start    # Starts React development server
```

### Extension Development

```bash
cd vscode-extension
npm run watch  # Watches for changes and recompiles
```

### Packaging the Extension

```bash
cd vscode-extension
npx @vscode/vsce package  # Creates .vsix file for distribution
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend-server` directory:

```env
PORT=3001
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### VSCode Extension Configuration

The extension automatically connects to `http://localhost:3001`. To change this:

1. Open the extension source code
2. Modify the URL in `src/extension.ts`
3. Rebuild the extension

## 🎓 Classroom Setup

### For Multiple Students

1. **Distribute the Extension**:
   - Send the `code-sharing-extension-1.0.0.vsix` file to all students
   - Students install it in their VSCode/Cursor

2. **Start the System**:
   - Run backend server (one instance)
   - Run lecturer interface (one instance)
   - All students connect to the same backend

3. **Classroom Usage**:
   - Students share code by clicking the button
   - Lecturer sees all submissions in real-time
   - Use search/filter to find specific students
   - Export submissions for later review

### Best Practices

1. **Before Class**:
   - Test the system with a few students
   - Ensure all components are running
   - Have backup plans ready

2. **During Class**:
   - Monitor the statistics dashboard
   - Use search to find specific submissions
   - Provide immediate feedback using copy feature

3. **After Class**:
   - Export submissions for review
   - Clear submissions for next session
   - Save interesting code examples

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**:
   - Check if port 3001 is available
   - Ensure all dependencies are installed
   - Check the console for error messages

2. **Lecturer interface won't connect**:
   - Make sure the backend server is running
   - Check the browser console for connection errors
   - Verify CORS settings in the backend

3. **VSCode extension not working**:
   - Ensure the extension is properly installed
   - Check VSCode's developer console for errors
   - Verify the backend server is accessible

4. **Name not being remembered**:
   - Check if VSCode has permission to save settings
   - Try reinstalling the extension
   - Clear VSCode's extension data if needed

### Port Conflicts

If you encounter port conflicts:

- **Backend**: Change `PORT` in `.env` file
- **Frontend**: Change port in `package.json` scripts
- **Extension**: Update the backend URL in the extension code

### Performance Issues

- **Many students**: The system supports unlimited concurrent connections
- **Large code files**: Consider limiting code size in the extension
- **Network issues**: Check firewall settings and network connectivity

## 📞 Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all services are running
3. Ensure all dependencies are installed
4. Check the network connectivity between components
5. Review this setup guide for configuration issues

## 🎉 Next Steps

Once the basic system is working:

1. **Customize the UI**: Modify colors, fonts, and layout
2. **Add Authentication**: Implement user login and authorization
3. **Database Integration**: Add persistent storage for submissions
4. **Advanced Features**: Code execution, testing, and analysis
5. **Deploy to Production**: Set up on cloud services for wider use

## 📚 Additional Resources

- **VSCode Extension API**: [Documentation](https://code.visualstudio.com/api)
- **Socket.io**: [Documentation](https://socket.io/docs/)
- **React**: [Documentation](https://reactjs.org/docs/)
- **Prism.js**: [Documentation](https://prismjs.com/)

---

**Happy coding and teaching! 🎓✨** 