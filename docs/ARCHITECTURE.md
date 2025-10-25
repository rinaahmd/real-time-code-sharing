# 🏗️ System Architecture

Technical overview of the Real-Time Code Sharing system architecture and components.

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Real-Time Code Sharing System                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   Student       │    │   Backend       │    │   Lecturer      │ │
│  │   Environment   │    │   Server        │    │   Interface     │ │
│  │                 │    │                 │    │                 │ │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │ │
│  │ │ VSCode      │ │    │ │ Node.js     │ │    │ │ React App   │ │ │
│  │ │ Extension   │ │◄──►│ │ Express     │ │◄──►│ │ Web UI      │ │ │
│  │ │ TypeScript  │ │    │ │ Socket.io   │ │    │ │ TypeScript  │ │ │
│  │ └─────────────┘ │    │ │ SQLite      │ │    │ └─────────────┘ │ │
│  │                 │    │ │ Database    │ │    │                 │ │
│  │ ┌─────────────┐ │    │ └─────────────┘ │    │ ┌─────────────┐ │ │
│  │ │ Student     │ │    │                 │    │ │ Statistics  │ │ │
│  │ │ Instances   │ │    │ ┌─────────────┐ │    │ │ Dashboard   │ │ │
│  │ │ (Multiple)  │ │    │ │ AI Review   │ │    │ └─────────────┘ │ │
│  │ └─────────────┘ │    │ │ Engine      │ │    │                 │ │
│  └─────────────────┘    │ └─────────────┘ │    └─────────────────┘ │
│                         └─────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 Component Architecture

### **Student Environment**
```
┌─────────────────────────────────────────┐
│           Student Environment           │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │         VSCode Extension            │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ Code        │ │ Question        │ │ │
│  │ │ Sharing     │ │ Management      │ │ │
│  │ │ Module      │ │ Module          │ │ │
│  │ └─────────────┘ └─────────────────┘ │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ AI Review   │ │ Notification    │ │ │
│  │ │ Display     │ │ System          │ │ │
│  │ └─────────────┘ └─────────────────┘ │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │        Student Instances            │ │
│  │                                     │ │
│  │ Student1: Alice  Student2: Bob       │ │
│  │ Student3: Charlie Student4: Diana   │ │
│  │                                     │ │
│  │ Each with unique data directory      │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### **Backend Server**
```
┌─────────────────────────────────────────┐
│            Backend Server               │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │         Express.js Server           │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ REST API    │ │ WebSocket       │ │ │
│  │ │ Endpoints   │ │ Server          │ │ │
│  │ │             │ │ (Socket.io)     │ │ │
│  │ └─────────────┘ └─────────────────┘ │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │         Business Logic              │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ Question    │ │ Submission      │ │ │
│  │ │ Management  │ │ Processing      │ │ │
│  │ └─────────────┘ └─────────────────┘ │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ Student     │ │ AI Review       │ │ │
│  │ │ Tracking    │ │ Engine          │ │ │
│  │ └─────────────┘ └─────────────────┘ │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │         Data Layer                  │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ SQLite      │ │ Database        │ │ │
│  │ │ Database    │ │ Service         │ │ │
│  │ └─────────────┘ └─────────────────┘ │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### **Lecturer Interface**
```
┌─────────────────────────────────────────┐
│          Lecturer Interface             │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │         React Application           │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ Dashboard   │ │ Statistics      │ │ │
│  │ │ Component   │ │ Component      │ │ │
│  │ └─────────────┘ └─────────────────┘ │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ Submissions │ │ Question       │ │ │
│  │ │ Component   │ │ Management     │ │ │
│  │ └─────────────┘ └─────────────────┘ │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ Student     │ │ Real-time       │ │ │
│  │ │ List        │ │ Updates         │ │ │
│  │ └─────────────┘ └─────────────────┘ │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │         UI Components               │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ Syntax      │ │ Toast           │ │ │
│  │ │ Highlighting│ │ Notifications   │ │ │
│  │ │ (Prism.js)  │ │ (React Hot      │ │ │
│  │ └─────────────┘ │ Toast)          │ │ │
│  │                 └─────────────────┘ │ │
│  │                                     │ │
│  │ ┌─────────────┐ ┌─────────────────┐ │ │
│  │ │ Responsive  │ │ Modern CSS      │ │ │
│  │ │ Design      │ │ Animations      │ │ │
│  │ └─────────────┘ └─────────────────┘ │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## 🔄 Data Flow Architecture

### **Code Submission Flow**
```
Student VSCode Extension
         │
         ▼
    WebSocket Connection
         │
         ▼
    Backend Server
         │
         ▼
    AI Review Engine
         │
         ▼
    Database Storage
         │
         ▼
    Real-time Broadcast
         │
         ▼
Lecturer Interface
```

### **Question Management Flow**
```
Lecturer Interface
         │
         ▼
    REST API Call
         │
         ▼
    Backend Server
         │
         ▼
    Database Storage
         │
         ▼
    WebSocket Broadcast
         │
         ▼
Student Extensions
```

## 🗄️ Database Schema

### **Tables Structure**
```sql
-- Questions Table
CREATE TABLE questions (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    language TEXT NOT NULL,
    difficulty TEXT DEFAULT 'medium',
    timeLimit INTEGER DEFAULT 30,
    timestamp TEXT NOT NULL,
    active INTEGER DEFAULT 1
);

-- Submissions Table
CREATE TABLE submissions (
    id TEXT PRIMARY KEY,
    studentName TEXT NOT NULL,
    code TEXT NOT NULL,
    language TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    questionId TEXT,
    review TEXT NOT NULL,
    FOREIGN KEY (questionId) REFERENCES questions (id)
);

-- Student History Table
CREATE TABLE student_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentName TEXT NOT NULL,
    questionId TEXT NOT NULL,
    submissionId TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (submissionId) REFERENCES submissions (id),
    FOREIGN KEY (questionId) REFERENCES questions (id)
);
```

## 🌐 Network Architecture

### **Port Configuration**
```
┌─────────────────────────────────────────┐
│            Network Layout               │
├─────────────────────────────────────────┤
│                                         │
│  Port 3000: Lecturer Interface (HTTP)  │
│  Port 3001: Backend Server (HTTP)      │
│  Port 3001: WebSocket Server           │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │         Client Connections          │ │
│  │                                     │ │
│  │ Students: VSCode Extensions         │ │
│  │ Lecturers: Web Browsers             │ │
│  │                                     │ │
│  │ Protocol: WebSocket + HTTP REST     │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### **Communication Protocols**
- **HTTP REST API**: Question management, data retrieval
- **WebSocket**: Real-time code sharing, notifications
- **CORS**: Cross-origin resource sharing enabled
- **JSON**: Data exchange format

## 🔒 Security Architecture

### **Security Measures**
```
┌─────────────────────────────────────────┐
│            Security Layer              │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │         Input Validation           │ │
│  │                                     │ │
│  │ • Code sanitization                │ │
│  │ • SQL injection prevention          │ │
│  │ • XSS protection                    │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │         Access Control             │ │
│  │                                     │ │
│  │ • CORS configuration               │ │
│  │ • Rate limiting                     │ │
│  │ • Request validation                │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │         Data Protection             │ │
│  │                                     │ │
│  │ • Database encryption               │ │
│  │ • Secure data transmission          │ │
│  │ • Backup encryption                 │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## 📊 Performance Architecture

### **Scalability Considerations**
- **Horizontal Scaling**: Multiple backend instances
- **Load Balancing**: Distribute WebSocket connections
- **Database Optimization**: Indexed queries, connection pooling
- **Caching**: Redis for session management
- **CDN**: Static asset delivery

### **Performance Metrics**
- **Response Time**: < 100ms for API calls
- **Throughput**: 1000+ concurrent connections
- **Memory Usage**: < 1GB per backend instance
- **CPU Usage**: < 50% under normal load

## 🔄 Deployment Architecture

### **Development Environment**
```
┌─────────────────────────────────────────┐
│         Development Setup              │
├─────────────────────────────────────────┤
│                                         │
│  Local Machine:                         │
│  • Backend: localhost:3001              │
│  • Frontend: localhost:3000             │
│  • Database: SQLite file                │
│  • Students: Local VSCode instances     │
└─────────────────────────────────────────┘
```

### **Production Environment**
```
┌─────────────────────────────────────────┐
│         Production Setup               │
├─────────────────────────────────────────┤
│                                         │
│  Cloud Infrastructure:                  │
│  • Backend: Heroku/AWS EC2              │
│  • Frontend: Netlify/Vercel             │
│  • Database: PostgreSQL/MySQL           │
│  • CDN: CloudFlare/AWS CloudFront      │
│  • Monitoring: New Relic/DataDog        │
└─────────────────────────────────────────┘
```

## 🛠️ Technology Stack Details

### **Backend Technologies**
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **WebSocket**: Socket.io
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Language**: TypeScript
- **Testing**: Jest
- **Linting**: ESLint

### **Frontend Technologies**
- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: CSS3 with modern features
- **Syntax Highlighting**: Prism.js
- **Notifications**: React Hot Toast
- **Build Tool**: Create React App
- **Testing**: React Testing Library

### **Extension Technologies**
- **Platform**: VSCode Extension API
- **Language**: TypeScript
- **UI**: VSCode Webview API
- **State Management**: VSCode Global State
- **Communication**: WebSocket client

## 📈 Monitoring and Logging

### **Application Monitoring**
- **Health Checks**: `/health` endpoint
- **Performance Metrics**: Response times, memory usage
- **Error Tracking**: Centralized error logging
- **User Analytics**: Submission patterns, usage statistics

### **Infrastructure Monitoring**
- **Server Health**: CPU, memory, disk usage
- **Network Monitoring**: Connection counts, bandwidth
- **Database Monitoring**: Query performance, connection pools
- **Alert System**: Automated notifications for issues

---

**This architecture provides a robust, scalable foundation for real-time code sharing in educational environments.** 🏗️


