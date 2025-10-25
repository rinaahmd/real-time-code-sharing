import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import DatabaseService from './database';

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

// Initialize database
const db = new DatabaseService();

// In-memory storage for online students (temporary data)
const onlineStudents = new Map(); // Track online students

// AI Review Function (Simple and generous scoring)
function reviewCode(code: string, language: string, question: string | null, questionId?: string): {
  isCorrect: boolean;
  score: number;
  feedback: string;
  suggestions: string[];
} {
  // Simple and generous review system
  let score = 80; // Start with high base score
  let feedback = 'Great code submission! ';
  let suggestions: string[] = [];
  let isCorrect = true; // Default to correct

  // Basic checks
  if (code.trim().length === 0) {
    return {
      isCorrect: false,
      score: 0,
      feedback: 'No code provided',
      suggestions: ['Please write some code to solve the problem']
    };
  }

  // If no question context, provide general feedback
  if (!question || !questionId) {
    return {
      isCorrect: true,
      score: 90,
      feedback: 'Excellent code sharing! This appears to be general code sharing.',
      suggestions: [
        'Consider submitting this as an answer to a specific question for detailed feedback',
        'Use "View Questions" command to see available questions',
        'Select a question to get targeted AI review and scoring'
      ]
    };
  }

  // Question-specific analysis - very generous
  const questionLower = question.toLowerCase();
  
  // Check for any programming concept
  if (questionLower.includes('sum') || questionLower.includes('array') || questionLower.includes('calculate')) {
    score += 15;
    feedback += 'Excellent array handling! ';
  }
  
  if (questionLower.includes('loop') || questionLower.includes('1 to 10') || questionLower.includes('print')) {
    score += 15;
    feedback += 'Great loop implementation! ';
  }
  
  if (questionLower.includes('prime') || questionLower.includes('check')) {
    score += 15;
    feedback += 'Excellent prime checking logic! ';
  }
  
  if (questionLower.includes('sort') || questionLower.includes('order')) {
    score += 15;
    feedback += 'Outstanding sorting approach! ';
  }

  // Language-specific bonuses - generous
  switch (language.toLowerCase()) {
    case 'javascript':
    case 'typescript':
      score += 5;
      feedback += 'Great JavaScript/TypeScript code! ';
      break;
    
    case 'python':
      score += 5;
      feedback += 'Excellent Python code! ';
      break;
    
    case 'java':
      score += 5;
      feedback += 'Great Java implementation! ';
      break;
    
    case 'cpp':
    case 'c++':
      score += 5;
      feedback += 'Outstanding C++ code! ';
      break;
  }

  // General code quality bonuses - generous
  if (code.length > 20) {
    score += 5;
    feedback += 'Good code structure! ';
  }

  if (code.includes('//') || code.includes('#') || code.includes('/*')) {
    score += 5;
    feedback += 'Excellent comments! ';
  }

  // Cap score at 100
  score = Math.min(score, 100);

  // Generate positive suggestions
  suggestions = [
    '🎉 Excellent work! Your solution looks great',
    '💡 Consider adding error handling for edge cases',
    '🚀 Try exploring alternative approaches for fun',
    '📚 Keep up the great coding!'
  ];

  // Only mark as incorrect for very basic issues
  if (score < 70) {
    isCorrect = false;
    suggestions = [
      '💡 Try to implement the basic requirements',
      '🔍 Check if your code handles the main case',
      '📖 Review the question requirements',
      '🎯 Focus on the core functionality first'
    ];
  }

  return {
    isCorrect,
    score,
    feedback: feedback || 'Great code submission!',
    suggestions
  };
}

// REST API Routes
app.get('/api/codes', async (req, res) => {
  try {
    const submissions = await db.getSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

app.post('/api/codes', async (req, res) => {
  try {
    const { studentName, code, language, questionId } = req.body;
    
    // Get question context if provided
    let questionContext = null;
    if (questionId) {
      questionContext = await db.getQuestion(questionId);
    }

    // Perform AI review
    const review = reviewCode(code, language, questionContext?.text || null, questionId);

    const submission = {
      studentName,
      code,
      language,
      questionId,
      questionContext,
      review
    };

    // Check for duplicate submissions from same student for same question
    let isDuplicate = false;
    let submissionCount = 1;
    
    if (questionId) {
      const history = await db.getStudentHistory(studentName, questionId);
      if (history.length > 0) {
        const existingSubmissions = history[0].submissions;
        isDuplicate = existingSubmissions.some((sub: any) => 
          sub.code.trim() === code.trim() && 
          (Date.now() - new Date(sub.timestamp).getTime()) < 30000 // 30 seconds
        );
        submissionCount = existingSubmissions.length + 1;
      }
    }
    
    // Only save if not duplicate
    if (!isDuplicate) {
      const savedSubmission = await db.createSubmission(submission);
      
      // Emit to all connected clients
      io.emit('code-shared', savedSubmission);
      
      res.status(201).json({
        ...savedSubmission,
        isDuplicate,
        submissionCount
      });
    } else {
      res.status(200).json({
        message: 'Duplicate submission detected',
        isDuplicate: true,
        submissionCount
      });
    }
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ error: 'Failed to create submission' });
  }
});

// Question Management API
app.post('/api/questions', async (req, res) => {
  try {
    const { title, text, language, difficulty, timeLimit } = req.body;
    
    const question = await db.createQuestion({
      title,
      text,
      language,
      difficulty: difficulty || 'medium',
      timeLimit: timeLimit || 30,
      active: true
    });
    
    // Emit to all connected clients
    io.emit('question-created', question);
    res.status(201).json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Failed to create question' });
  }
});

app.get('/api/questions', async (req, res) => {
  try {
    const questions = await db.getQuestions();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

app.get('/api/questions/:id', async (req, res) => {
  try {
    const question = await db.getQuestion(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

app.get('/api/questions/:id/submissions', async (req, res) => {
  try {
    const submissions = await db.getSubmissionsByQuestion(req.params.id);
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching question submissions:', error);
    res.status(500).json({ error: 'Failed to fetch question submissions' });
  }
});

// Get submission history for a specific student and question
app.get('/api/students/:studentName/questions/:questionId/history', async (req, res) => {
  try {
    const { studentName, questionId } = req.params;
    const history = await db.getStudentHistory(studentName, questionId);
    res.json(history);
  } catch (error) {
    console.error('Error fetching student history:', error);
    res.status(500).json({ error: 'Failed to fetch student history' });
  }
});

// Get all submission history for a student
app.get('/api/students/:studentName/history', async (req, res) => {
  try {
    const { studentName } = req.params;
    const history = await db.getStudentHistory(studentName);
    res.json(history);
  } catch (error) {
    console.error('Error fetching student history:', error);
    res.status(500).json({ error: 'Failed to fetch student history' });
  }
});

app.put('/api/questions/:id/activate', async (req, res) => {
  try {
    const success = await db.updateQuestionActive(req.params.id, true);
    if (success) {
      const question = await db.getQuestion(req.params.id);
      io.emit('question-activated', question);
      res.json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    console.error('Error activating question:', error);
    res.status(500).json({ error: 'Failed to activate question' });
  }
});

app.put('/api/questions/:id/deactivate', async (req, res) => {
  try {
    const success = await db.updateQuestionActive(req.params.id, false);
    if (success) {
      const question = await db.getQuestion(req.params.id);
      io.emit('question-deactivated', question);
      res.json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    console.error('Error deactivating question:', error);
    res.status(500).json({ error: 'Failed to deactivate question' });
  }
});

app.delete('/api/codes', async (req, res) => {
  try {
    await db.clearAllSubmissions();
    // Emit to all connected clients that codes were cleared
    io.emit('codes-cleared');
    res.status(200).json({ message: 'All codes cleared successfully' });
  } catch (error) {
    console.error('Error clearing submissions:', error);
    res.status(500).json({ error: 'Failed to clear submissions' });
  }
});

// Get online students
app.get('/api/online-students', (req, res) => {
  res.json(Array.from(onlineStudents.values()));
});

// Socket.io connection handling
io.on('connection', async (socket) => {
  console.log('Client connected:', socket.id);
  
  try {
    // Send existing data to new connections
    const existingSubmissions = await db.getSubmissions();
    const existingQuestions = await db.getQuestions();
    
    socket.emit('existing-codes', existingSubmissions);
    socket.emit('existing-questions', existingQuestions);
  } catch (error) {
    console.error('Error loading existing data:', error);
  }
  
  // Handle student registration
  socket.on('student-register', (data) => {
    const { studentName } = data;
    onlineStudents.set(socket.id, {
      id: socket.id,
      name: studentName,
      connectedAt: new Date(),
      lastActivity: new Date()
    });
    
    console.log(`Student registered: ${studentName} (${socket.id})`);
    
    // Notify all clients about online students
    io.emit('online-students-updated', Array.from(onlineStudents.values()));
  });
  
  // Handle student activity
  socket.on('student-activity', (data) => {
    if (onlineStudents.has(socket.id)) {
      const student = onlineStudents.get(socket.id);
      student.lastActivity = new Date();
      onlineStudents.set(socket.id, student);
      
      // Notify all clients about updated activity
      io.emit('online-students-updated', Array.from(onlineStudents.values()));
    }
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    // Remove student from online list
    if (onlineStudents.has(socket.id)) {
      const student = onlineStudents.get(socket.id);
      console.log(`Student disconnected: ${student.name}`);
      onlineStudents.delete(socket.id);
      
      // Notify all clients about online students update
      io.emit('online-students-updated', Array.from(onlineStudents.values()));
    }
  });
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const stats = await db.getStats();
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      stats
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      error: 'Failed to get stats'
    });
  }
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for connections`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 AI review system active`);
}); 