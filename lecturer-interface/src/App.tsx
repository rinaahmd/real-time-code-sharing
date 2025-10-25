import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { 
  FiSearch, 
  FiCopy, 
  FiTrash2, 
  FiDownload, 
  FiRefreshCw, 
  FiUsers, 
  FiCode,
  FiFilter,
  FiClock,
  FiGlobe,
  FiZap,
  FiPlus,
  FiEdit,
  FiPlay,
  FiPause,
  FiCheck,
  FiX,
  FiStar,
  FiMessageSquare,
  FiAward
} from 'react-icons/fi';

import './App.css';

interface SharedCode {
  id: string;
  studentName: string;
  code: string;
  language: string;
  timestamp: Date;
  questionId?: string;
  questionContext?: Question;
  review?: CodeReview;
}

interface Question {
  id: string;
  title: string;
  text: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  timestamp: Date;
  active: boolean;
}

interface CodeReview {
  isCorrect: boolean;
  score: number;
  feedback: string;
  suggestions: string[];
}

function App() {
  const [sharedCodes, setSharedCodes] = useState<SharedCode[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStudentList, setShowStudentList] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'submissions' | 'questions'>('submissions');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<SharedCode | null>(null);

  // Question form state
  const [questionForm, setQuestionForm] = useState({
    title: '',
    text: '',
    language: 'javascript',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    timeLimit: 30
  });

  useEffect(() => {
    // Connect to WebSocket server with error handling
    let newSocket: Socket | null = null;
    
    try {
      newSocket = io('http://localhost:3001', {
        timeout: 5000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });
      setSocket(newSocket);

      // Load existing data
      const loadExistingData = async () => {
        try {
          setIsLoading(true);
          setError(null);
          
          // Load codes
          const codesResponse = await axios.get('http://localhost:3001/api/codes', {
            timeout: 5000
          });
          setSharedCodes(codesResponse.data);
          
          // Load questions
          const questionsResponse = await axios.get('http://localhost:3001/api/questions', {
            timeout: 5000
          });
          setQuestions(questionsResponse.data);
        } catch (error) {
          console.error('Failed to load existing data:', error);
          setError('Failed to load existing data. Please check if the server is running.');
          toast.error('Failed to load existing data');
        } finally {
          setIsLoading(false);
        }
      };

      loadExistingData();

      // Socket event listeners
      newSocket.on('connect', () => {
        setIsConnected(true);
        setError(null);
        console.log('Connected to server');
        toast.success('Connected to server');
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected from server');
        toast.error('Disconnected from server');
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setError('Failed to connect to server. Please check if the backend is running.');
        toast.error('Connection failed');
      });

      newSocket.on('existing-codes', (codes: SharedCode[]) => {
        setSharedCodes(codes);
      });

      newSocket.on('existing-questions', (questions: Question[]) => {
        setQuestions(questions);
      });

      newSocket.on('code-shared', (newCode: SharedCode) => {
        if (autoRefresh) {
          setSharedCodes(prev => {
            // Check if code already exists to prevent duplicates
            const exists = prev.some(c => c.id === newCode.id);
            if (exists) return prev;
            return [newCode, ...prev];
          });
          const message = newCode.questionContext 
            ? `${newCode.studentName} submitted answer for "${newCode.questionContext.title}"`
            : `${newCode.studentName} shared ${newCode.language} code!`;
          
          toast.success(message, {
            icon: newCode.review?.isCorrect ? '✅' : '❌',
          });
        }
      });

      newSocket.on('question-created', (newQuestion: Question) => {
        setQuestions(prev => {
          // Check if question already exists to prevent duplicates
          const exists = prev.some(q => q.id === newQuestion.id);
          if (exists) return prev;
          return [newQuestion, ...prev];
        });
        toast.success(`Question "${newQuestion.title}" created!`, {
          icon: '📝',
        });
      });

      newSocket.on('question-activated', (question: Question) => {
        setQuestions(prev => prev.map(q => q.id === question.id ? question : q));
        toast.success(`Question "${question.title}" activated!`, {
          icon: '▶️',
        });
      });

      newSocket.on('question-deactivated', (question: Question) => {
        setQuestions(prev => prev.map(q => q.id === question.id ? question : q));
        toast.success(`Question "${question.title}" deactivated!`, {
          icon: '⏸️',
        });
      });

      newSocket.on('codes-cleared', () => {
        setSharedCodes([]);
        toast.success('All code submissions have been cleared');
      });

    } catch (error) {
      console.error('Failed to initialize socket:', error);
      setError('Failed to initialize connection');
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [autoRefresh]);

  const formatTimestamp = (timestamp: Date | string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getLanguageDisplayName = (language: string) => {
    const languageMap: { [key: string]: string } = {
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'python': 'Python',
      'java': 'Java',
      'cpp': 'C++',
      'c': 'C',
      'html': 'HTML',
      'css': 'CSS',
      'json': 'JSON',
      'markup': 'Markup'
    };
    return languageMap[language] || language;
  };

  const getDifficultyDisplayName = (difficulty: string) => {
    const difficultyMap: { [key: string]: string } = {
      'easy': 'Easy',
      'medium': 'Medium',
      'hard': 'Hard'
    };
    return difficultyMap[difficulty] || difficulty;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      'easy': '#28a745',
      'medium': '#ffc107',
      'hard': '#dc3545'
    };
    return colors[difficulty] || '#6c757d';
  };

  const copyToClipboard = async (code: string, studentName: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(`Copied ${studentName}'s code to clipboard!`);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  const clearAllCodes = async () => {
    try {
      await axios.delete('http://localhost:3001/api/codes');
      setSharedCodes([]);
      toast.success('All code submissions cleared');
    } catch (error) {
      console.error('Failed to clear codes:', error);
      toast.error('Failed to clear code submissions');
    }
  };

  const createQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/questions', questionForm);
      // Don't add to state here - WebSocket event will handle it
      setShowQuestionForm(false);
      setQuestionForm({
        title: '',
        text: '',
        language: 'javascript',
        difficulty: 'medium',
        timeLimit: 30
      });
      toast.success('Question created successfully!');
    } catch (error) {
      console.error('Failed to create question:', error);
      toast.error('Failed to create question');
    }
  };

  const activateQuestion = async (questionId: string) => {
    try {
      await axios.put(`http://localhost:3001/api/questions/${questionId}/activate`);
      toast.success('Question activated!');
    } catch (error) {
      console.error('Failed to activate question:', error);
      toast.error('Failed to activate question');
    }
  };

  const deactivateQuestion = async (questionId: string) => {
    try {
      await axios.put(`http://localhost:3001/api/questions/${questionId}/deactivate`);
      toast.success('Question deactivated!');
    } catch (error) {
      console.error('Failed to deactivate question:', error);
      toast.error('Failed to deactivate question');
    }
  };

  const exportAllCodes = () => {
    if (sharedCodes.length === 0) {
      toast.error('No code submissions to export');
      return;
    }

    const exportData = sharedCodes.map(code => ({
      student: code.studentName,
      language: code.language,
      code: code.code,
      timestamp: formatTimestamp(code.timestamp),
      question: code.questionContext?.title || 'General submission',
      review: code.review
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-submissions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code submissions exported successfully!');
  };

  const getUniqueLanguages = () => {
    const languages = Array.from(new Set(sharedCodes.map(code => code.language)));
    return languages.sort();
  };

  const getUniqueStudents = () => {
    const students = Array.from(new Set(sharedCodes.map(code => code.studentName)));
    return students.sort();
  };

  const filteredCodes = sharedCodes.filter(code => {
    const matchesSearch = code.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || code.language === selectedLanguage;
    const matchesQuestion = !selectedQuestion || code.questionId === selectedQuestion;
    return matchesSearch && matchesLanguage && matchesQuestion;
  });

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'javascript': '#f7df1e',
      'typescript': '#3178c6',
      'python': '#3776ab',
      'java': '#ed8b00',
      'cpp': '#00599c',
      'c': '#a8b9cc',
      'html': '#e34f26',
      'css': '#1572b6',
      'json': '#000000',
      'markup': '#ff6b35'
    };
    return colors[language] || '#6c757d';
  };

  const getStats = () => {
    const totalSubmissions = sharedCodes.length;
    const uniqueStudents = getUniqueStudents().length;
    const uniqueLanguages = getUniqueLanguages().length;
    const recentSubmissions = sharedCodes.filter(code => {
      const timeDiff = Date.now() - new Date(code.timestamp).getTime();
      return timeDiff < 5 * 60 * 1000; // Last 5 minutes
    }).length;
    const correctAnswers = sharedCodes.filter(code => code.review?.isCorrect).length;
    const activeQuestions = questions.filter(q => q.active).length;

    return { 
      totalSubmissions, 
      uniqueStudents, 
      uniqueLanguages, 
      recentSubmissions,
      correctAnswers,
      activeQuestions
    };
  };

  const stats = getStats();

  return (
    <div className="App">
      <Toaster position="top-right" />
      
      {/* Enhanced Header */}
      <header className="header">
        <div className="header-background"></div>
        <div className="header-content">
          <div className="header-main">
            <div className="header-left">
              <div className="title-section">
                <FiCode className="header-icon" />
                <h1>Real-Time Code Sharing</h1>
                <div className="title-underline"></div>
              </div>
              <div className="connection-status">
                <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></div>
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                <FiZap className="connection-icon" />
              </div>
            </div>
            
            <div className="header-stats">
              <div className="stat-item">
                <FiUsers className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-number">{stats.totalSubmissions}</span>
                  <span className="stat-label">Submissions</span>
                </div>
              </div>
              <div 
                className="stat-item clickable" 
                onClick={() => setShowStudentList(!showStudentList)}
                title="Click to view student list"
              >
                <FiGlobe className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-number">{stats.uniqueStudents}</span>
                  <span className="stat-label">Students</span>
                </div>
              </div>
              <div className="stat-item">
                <FiAward className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-number">{stats.correctAnswers}</span>
                  <span className="stat-label">Correct</span>
                </div>
              </div>
              <div className="stat-item">
                <FiMessageSquare className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-number">{stats.activeQuestions}</span>
                  <span className="stat-label">Active Q</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          <FiCode />
          Submissions
        </button>
        <button 
          className={`nav-tab ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          <FiMessageSquare />
          Questions
        </button>
      </div>

      {/* Student List Modal */}
      {showStudentList && (
        <div className="student-list-modal">
          <div className="student-list-content">
            <div className="student-list-header">
              <h3>Student List</h3>
              <button 
                className="close-btn"
                onClick={() => setShowStudentList(false)}
              >
                ×
              </button>
            </div>
            <div className="student-list">
              {getUniqueStudents().length > 0 ? (
                getUniqueStudents().map((student, index) => {
                  const studentSubmissions = sharedCodes.filter(code => code.studentName === student);
                  const lastSubmission = studentSubmissions[0]; // Most recent
                  const correctAnswers = studentSubmissions.filter(code => code.review?.isCorrect).length;
                  return (
                    <div key={student} className="student-item">
                      <div className="student-info">
                        <span className="student-name">{student}</span>
                        <span className="student-count">
                          {studentSubmissions.length} submission{studentSubmissions.length !== 1 ? 's' : ''}
                          {correctAnswers > 0 && (
                            <span className="correct-answers"> ({correctAnswers} correct)</span>
                          )}
                        </span>
                      </div>
                      {lastSubmission && (
                        <div className="student-last-activity">
                          <span className="last-language">{getLanguageDisplayName(lastSubmission.language)}</span>
                          <span className="last-time">{formatTimestamp(lastSubmission.timestamp)}</span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="no-students">
                  <p>No students have submitted code yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Question Form Modal */}
      {showQuestionForm && (
        <div className="question-form-modal">
          <div className="question-form-content">
            <div className="question-form-header">
              <h3>Create New Question</h3>
              <button 
                className="close-btn"
                onClick={() => setShowQuestionForm(false)}
              >
                ×
              </button>
            </div>
            <div className="question-form">
              <div className="form-group">
                <label>Question Title</label>
                <input
                  type="text"
                  value={questionForm.title}
                  onChange={(e) => setQuestionForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter question title"
                />
              </div>
              <div className="form-group">
                <label>Question Text</label>
                <textarea
                  value={questionForm.text}
                  onChange={(e) => setQuestionForm(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Enter the coding question..."
                  rows={4}
                />
              </div>
              <div className="form-row">
                                 <div className="form-group">
                   <label>Language</label>
                   <select
                     value={questionForm.language}
                     onChange={(e) => setQuestionForm(prev => ({ ...prev, language: e.target.value }))}
                     aria-label="Select programming language"
                   >
                     <option value="javascript">JavaScript</option>
                     <option value="python">Python</option>
                     <option value="java">Java</option>
                     <option value="cpp">C++</option>
                     <option value="c">C</option>
                   </select>
                 </div>
                 <div className="form-group">
                   <label>Difficulty</label>
                   <select
                     value={questionForm.difficulty}
                     onChange={(e) => setQuestionForm(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' }))}
                     aria-label="Select difficulty level"
                   >
                     <option value="easy">Easy</option>
                     <option value="medium">Medium</option>
                     <option value="hard">Hard</option>
                   </select>
                 </div>
                 <div className="form-group">
                   <label>Time Limit (minutes)</label>
                   <input
                     type="number"
                     value={questionForm.timeLimit}
                     onChange={(e) => setQuestionForm(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                     min="5"
                     max="120"
                     placeholder="Enter time limit in minutes"
                     aria-label="Time limit in minutes"
                   />
                 </div>
              </div>
              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setShowQuestionForm(false)}>
                  Cancel
                </button>
                <button className="create-btn" onClick={createQuestion}>
                  Create Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Enhanced Controls */}
      <div className="controls">
        <div className="search-filter">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by student name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-box">
            <FiFilter className="filter-icon" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              aria-label="Filter by programming language"
            >
              <option value="all">All Languages</option>
              {getUniqueLanguages().map(lang => (
                <option key={lang} value={lang}>
                  {getLanguageDisplayName(lang)}
                </option>
              ))}
            </select>
          </div>
          {activeTab === 'submissions' && (
            <div className="filter-box">
              <FiFilter className="filter-icon" />
              <select
                value={selectedQuestion || 'all'}
                onChange={(e) => setSelectedQuestion(e.target.value === 'all' ? null : e.target.value)}
                aria-label="Filter by question"
              >
                <option value="all">All Questions</option>
                {questions.map(q => (
                  <option key={q.id} value={q.id}>
                    {q.title}
                  </option>
                ))}
              </select>
              {selectedQuestion && (
                <button 
                  className="clear-filter-btn"
                  onClick={() => setSelectedQuestion(null)}
                  title="Clear question filter"
                >
                  <FiX />
                </button>
              )}
            </div>
          )}
        </div>
        
        <div className="action-buttons">
          {activeTab === 'questions' && (
            <button className="create-question-btn" onClick={() => setShowQuestionForm(true)}>
              <FiPlus />
              Create Question
            </button>
          )}
          <button
            className={`refresh-toggle ${autoRefresh ? 'active' : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
            title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
          >
            <FiRefreshCw className={autoRefresh ? 'spinning' : ''} />
            Auto-refresh
          </button>
          <button className="export-btn" onClick={exportAllCodes}>
            <FiDownload />
            Export All
          </button>
          <button className="clear-btn" onClick={clearAllCodes}>
            <FiTrash2 />
            Clear All
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'submissions' ? (
        /* Enhanced Code Submissions */
        <div className="submissions-container">
          {filteredCodes.length === 0 ? (
            <div className="empty-state">
              <FiCode className="empty-icon" />
              <h3>No code submissions yet</h3>
              <p>
                {searchTerm || selectedLanguage !== 'all' || selectedQuestion
                  ? 'No submissions match your current filters'
                  : 'Students can share their code using the VSCode extension'
                }
              </p>
            </div>
          ) : (
            <>
              {(selectedQuestion || selectedLanguage !== 'all' || searchTerm) && (
                <div className="filter-indicator">
                  <FiFilter />
                  <span>
                    Showing {filteredCodes.length} of {sharedCodes.length} submissions
                    {selectedQuestion && ` for "${questions.find(q => q.id === selectedQuestion)?.title}"`}
                  </span>
                </div>
              )}
              <div className="submissions-grid">
              {filteredCodes.map((code) => (
                <div 
                  key={code.id} 
                  className="submission-card clickable-card" 
                  onClick={() => setExpandedCard(code)}
                >
                  <div className="submission-header">
                    <div className="student-info">
                      <h3>{code.studentName}</h3>
                      <div className="submission-meta">
                        <span className="timestamp">
                          <FiClock className="meta-icon" />
                          {formatTimestamp(code.timestamp)}
                        </span>
                        {code.questionContext && (
                          <span className="question-context">
                            <FiMessageSquare className="meta-icon" />
                            {code.questionContext.title}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="submission-badges">
                      <div className="language-badge" style={{ backgroundColor: getLanguageColor(code.language) }}>
                        {getLanguageDisplayName(code.language)}
                      </div>
                      {code.review && (
                        <div className={`review-badge ${code.review.isCorrect ? 'correct' : 'incorrect'}`}>
                          {code.review.isCorrect ? <FiCheck /> : <FiX />}
                          {code.review.score}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="code-container">
                    <pre className="code-block">
                      <code>{code.code}</code>
                    </pre>
                  </div>
                  {code.review && (
                    <div className="review-section">
                      <div className="review-header">
                        <h4>AI Review</h4>
                        <div className={`review-status ${code.review.isCorrect ? 'correct' : 'incorrect'}`}>
                          {code.review.isCorrect ? 'Correct' : 'Needs Improvement'}
                        </div>
                      </div>
                      <div className="review-content">
                        <p className="review-feedback">{code.review.feedback}</p>
                        {code.review.suggestions.length > 0 && (
                          <div className="review-suggestions">
                            <h5>Suggestions:</h5>
                            <ul>
                              {code.review.suggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="submission-actions">
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(code.code, code.studentName)}
                      title="Copy code to clipboard"
                    >
                      <FiCopy />
                      Copy Code
                    </button>
                  </div>
                </div>
              ))}
            </div>
            </>
          )}
        </div>
      ) : (
        /* Questions Management */
        <div className="questions-container">
          {questions.length === 0 ? (
            <div className="empty-state">
              <FiMessageSquare className="empty-icon" />
              <h3>No questions created yet</h3>
              <p>Create your first coding question to get started!</p>
              <button className="create-question-btn" onClick={() => setShowQuestionForm(true)}>
                <FiPlus />
                Create Question
              </button>
            </div>
          ) : (
            <div className="questions-grid">
              {questions.map((question) => (
                <div key={question.id} className="question-card">
                  <div className="question-header">
                    <div className="question-info">
                      <h3>{question.title}</h3>
                      <div className="question-meta">
                        <span className="timestamp">
                          <FiClock className="meta-icon" />
                          {formatTimestamp(question.timestamp)}
                        </span>
                        <span className="language">
                          <FiCode className="meta-icon" />
                          {getLanguageDisplayName(question.language)}
                        </span>
                        <span 
                          className="difficulty"
                          style={{ color: getDifficultyColor(question.difficulty) }}
                        >
                          <FiStar className="meta-icon" />
                          {getDifficultyDisplayName(question.difficulty)}
                        </span>
                      </div>
                    </div>
                    <div className="question-status">
                      <div className={`status-badge ${question.active ? 'active' : 'inactive'}`}>
                        {question.active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  </div>
                  <div className="question-content">
                    <p>{question.text}</p>
                  </div>
                  <div className="question-actions">
                    {question.active ? (
                      <button 
                        className="deactivate-btn"
                        onClick={() => deactivateQuestion(question.id)}
                      >
                        <FiPause />
                        Deactivate
                      </button>
                    ) : (
                      <button 
                        className="activate-btn"
                        onClick={() => activateQuestion(question.id)}
                      >
                        <FiPlay />
                        Activate
                      </button>
                    )}
                    <button 
                      className="view-submissions-btn"
                      onClick={() => {
                        setSelectedQuestion(question.id);
                        setActiveTab('submissions');
                      }}
                    >
                      <FiUsers />
                      View Submissions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Expanded Card Modal */}
      {expandedCard && (
        <div className="modal-overlay" onClick={() => setExpandedCard(null)}>
          <div className="modal-content expanded-card-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setExpandedCard(null)}>
              <FiX />
            </button>
            
            <div className="expanded-card-header">
              <div className="student-info-large">
                <h2>{expandedCard.studentName}</h2>
                <div className="submission-meta-large">
                  <span className="timestamp">
                    <FiClock className="meta-icon" />
                    {formatTimestamp(expandedCard.timestamp)}
                  </span>
                  {expandedCard.questionContext && (
                    <span className="question-context">
                      <FiMessageSquare className="meta-icon" />
                      {expandedCard.questionContext.title}
                    </span>
                  )}
                </div>
              </div>
              <div className="submission-badges-large">
                <div className="language-badge-large" style={{ backgroundColor: getLanguageColor(expandedCard.language) }}>
                  {getLanguageDisplayName(expandedCard.language)}
                </div>
                {expandedCard.review && (
                  <div className={`review-badge-large ${expandedCard.review.isCorrect ? 'correct' : 'incorrect'}`}>
                    {expandedCard.review.isCorrect ? <FiCheck /> : <FiX />}
                    Score: {expandedCard.review.score}%
                  </div>
                )}
              </div>
            </div>

            {expandedCard.questionContext && (
              <div className="question-details">
                <h3>Question Details</h3>
                <div className="question-info-grid">
                  <div className="info-item">
                    <span className="info-label">Title:</span>
                    <span className="info-value">{expandedCard.questionContext.title}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Description:</span>
                    <span className="info-value">{expandedCard.questionContext.text}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Difficulty:</span>
                    <span className="info-value" style={{ color: getDifficultyColor(expandedCard.questionContext.difficulty) }}>
                      {getDifficultyDisplayName(expandedCard.questionContext.difficulty)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Time Limit:</span>
                    <span className="info-value">{expandedCard.questionContext.timeLimit} minutes</span>
                  </div>
                </div>
              </div>
            )}

            <div className="code-section-large">
              <div className="code-header">
                <h3>Submitted Code</h3>
                <button
                  className="copy-btn-large"
                  onClick={() => copyToClipboard(expandedCard.code, expandedCard.studentName)}
                  title="Copy code to clipboard"
                >
                  <FiCopy />
                  Copy Code
                </button>
              </div>
              <pre className="code-block-large">
                <code>{expandedCard.code}</code>
              </pre>
            </div>

            {expandedCard.review && (
              <div className="review-section-large">
                <div className="review-header-large">
                  <h3>AI Review & Feedback</h3>
                  <div className={`review-status-large ${expandedCard.review.isCorrect ? 'correct' : 'incorrect'}`}>
                    {expandedCard.review.isCorrect ? (
                      <>
                        <FiCheck /> Correct Solution
                      </>
                    ) : (
                      <>
                        <FiX /> Needs Improvement
                      </>
                    )}
                  </div>
                </div>
                <div className="review-score-large">
                  <div className="score-circle">
                    <span className="score-number">{expandedCard.review.score}</span>
                    <span className="score-label">Score</span>
                  </div>
                </div>
                <div className="review-content-large">
                  <div className="feedback-section">
                    <h4>Feedback</h4>
                    <p className="review-feedback-large">{expandedCard.review.feedback}</p>
                  </div>
                  {expandedCard.review.suggestions.length > 0 && (
                    <div className="suggestions-section">
                      <h4>Suggestions for Improvement</h4>
                      <ul className="suggestions-list-large">
                        {expandedCard.review.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button className="close-modal-btn" onClick={() => setExpandedCard(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 