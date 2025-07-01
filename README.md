# 🖥️ Real-Time Code Sharing in Class – VSCode Extension Prototype

A powerful and modern real-time code sharing system that allows first-year students to share their code instantly with lecturers during class. Built with cutting-edge technologies and designed for seamless classroom interaction.

## 🎯 Objective

To encourage active participation, provide immediate feedback, and foster collaborative learning by enabling real-time code sharing between students and lecturers with a professional, user-friendly interface.

## 🏗️ Project Structure

```
Real-time code_sharing/
├── vscode-extension/          # VSCode extension for students (with name memory)
├── backend-server/            # Node.js backend with WebSocket support
├── lecturer-interface/        # Modern React web interface for lecturers
├── shared/                    # Shared utilities and types
├── docs/                      # Documentation and guides
├── STUDENT_INSTALL_GUIDE.md   # Student installation instructions
├── DISTRIBUTION_GUIDE.md      # Extension distribution guide
├── create-student-windows.bat # Quick setup for multiple students
└── start-system.bat          # Start backend and lecturer interface
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- VSCode or Cursor
- Git

### Setup Instructions

1. **Backend Server**
   ```bash
   cd backend-server
   npm install
   npm start
   ```

2. **Lecturer Interface**
   ```bash
   cd lecturer-interface
   npm install
   npm start
   ```

3. **Install Extension for Students**
   - Download `vscode-extension/code-sharing-extension-1.0.0.vsix`
   - Install in VSCode: `Ctrl+Shift+P` → "Extensions: Install from VSIX"
   - For multiple students: Use `code --user-data-dir "C:\Temp\StudentName"`

## ✨ Features

### 🎓 **Student Experience**
- **One-Click Sharing**: Share code with a single button click
- **Smart Name Memory**: Your name is remembered between VSCode sessions
- **Language Detection**: Automatic detection of programming language
- **Selection Support**: Share selected code or entire file
- **Progress Feedback**: Visual feedback during code sharing

### 👨‍🏫 **Lecturer Experience**
- **Real-Time Updates**: Live code submissions appear instantly
- **📊 Statistics Dashboard**: View total submissions, active students, and languages
- **🔍 Search & Filter**: Find specific students or filter by programming language
- **📋 Copy Code**: One-click copy any student's code to clipboard
- **📥 Export Feature**: Download all submissions as JSON file
- **🗑️ Clear All**: Clear all submissions when starting new sessions
- **🔄 Auto-refresh Toggle**: Control real-time updates
- **💎 Syntax Highlighting**: Beautiful code highlighting for all major languages
- **🔔 Smart Notifications**: Toast notifications for new submissions
- **📱 Responsive Design**: Works perfectly on desktop and mobile

### 🔧 **Technical Features**
- **WebSocket Communication**: Real-time bidirectional communication
- **Multiple Student Support**: Unlimited concurrent student connections
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Modern UI/UX**: Beautiful gradients, animations, and hover effects
- **Error Handling**: Robust error handling and user feedback

## 🛠️ Technology Stack

- **VSCode Extension**: TypeScript, VSCode Extension API, Global State Management
- **Backend**: Node.js, Express, Socket.io, TypeScript
- **Frontend**: React, TypeScript, Prism.js (syntax highlighting), React Hot Toast
- **Communication**: WebSocket for real-time updates, REST API for data management
- **Styling**: Modern CSS with gradients, animations, and responsive design

## 📋 Development Status

- ✅ Project structure setup
- ✅ Backend server implementation
- ✅ VSCode extension development
- ✅ Lecturer interface creation
- ✅ Name memory feature
- ✅ Search and filter functionality
- ✅ Statistics dashboard
- ✅ Copy and export features
- ✅ Syntax highlighting
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Error handling
- ✅ Integration testing
- ✅ Documentation

## 🎯 Use Cases

### **Classroom Scenarios**
1. **Code Review Sessions**: Students share code for immediate feedback
2. **Debugging Help**: Quick code sharing for troubleshooting
3. **Best Practices**: Show different approaches to the same problem
4. **Collaborative Learning**: Students can see each other's solutions
5. **Assessment**: Quick code submissions for evaluation

### **Educational Benefits**
- **Increased Engagement**: Students actively participate in sharing
- **Immediate Feedback**: Lecturers can provide instant guidance
- **Learning from Peers**: Students see different coding approaches
- **Time Efficiency**: No need to email or upload files
- **Professional Environment**: Modern interface prepares students for industry tools

## 🚀 Deployment

### **For Development**
- Run all components locally for testing and development
- Use the packaged `.vsix` file for easy distribution

### **For Production**
- Deploy backend to cloud service (Heroku, AWS, etc.)
- Deploy lecturer interface to web hosting
- Distribute `.vsix` file to students
- Configure environment variables for production URLs

## 🤝 Contributing

This is a prototype project designed for educational purposes. Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### **Areas for Enhancement**
- User authentication and authorization
- Database integration for persistent storage
- Advanced code analysis features
- Integration with learning management systems
- Mobile app for lecturers
- Code execution and testing features

## 📞 Support

For issues and questions:

1. Check the console logs for error messages
2. Verify all services are running
3. Ensure all dependencies are installed
4. Check network connectivity between components
5. Review the detailed setup guide in `docs/SETUP.md`

## 🎉 Success Stories

This system has been designed to transform classroom interaction by:
- **Reducing Barriers**: One-click sharing eliminates friction
- **Enhancing Engagement**: Real-time feedback keeps students involved
- **Improving Learning**: Immediate code review accelerates understanding
- **Professional Experience**: Modern interface mirrors industry tools

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for better education and collaborative learning** 