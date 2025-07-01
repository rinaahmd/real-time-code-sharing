import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Store shared code
interface SharedCode {
  id: string;
  studentName: string;
  code: string;
  language: string;
  timestamp: Date;
}

const sharedCodes: Map<string, SharedCode> = new Map();

// REST API Routes
app.get('/api/codes', (req, res) => {
  res.json(Array.from(sharedCodes.values()));
});

app.post('/api/codes', (req, res) => {
  const { studentName, code, language } = req.body;
  const id = Date.now().toString();
  
  const sharedCode: SharedCode = {
    id,
    studentName,
    code,
    language,
    timestamp: new Date()
  };
  
  sharedCodes.set(id, sharedCode);
  
  // Emit to all connected clients
  io.emit('code-shared', sharedCode);
  
  res.status(201).json(sharedCode);
});

app.delete('/api/codes', (req, res) => {
  sharedCodes.clear();
  
  // Emit to all connected clients that codes were cleared
  io.emit('codes-cleared');
  
  res.status(200).json({ message: 'All codes cleared successfully' });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send existing codes to new connections
  socket.emit('existing-codes', Array.from(sharedCodes.values()));
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for connections`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
}); 