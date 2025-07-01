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
  FiZap
} from 'react-icons/fi';

import './App.css';

interface SharedCode {
  id: string;
  studentName: string;
  code: string;
  language: string;
  timestamp: Date;
}

function App() {
  const [sharedCodes, setSharedCodes] = useState<SharedCode[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStudentList, setShowStudentList] = useState(false);

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

      // Load existing codes
      const loadExistingCodes = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const response = await axios.get('http://localhost:3001/api/codes', {
            timeout: 5000
          });
          setSharedCodes(response.data);
        } catch (error) {
          console.error('Failed to load existing codes:', error);
          setError('Failed to load existing code submissions. Please check if the server is running.');
          toast.error('Failed to load existing code submissions');
        } finally {
          setIsLoading(false);
        }
      };

      loadExistingCodes();

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

      newSocket.on('code-shared', (newCode: SharedCode) => {
        if (autoRefresh) {
          setSharedCodes(prev => [newCode, ...prev]);
          toast.success(`${newCode.studentName} shared ${newCode.language} code!`, {
            icon: '👨‍💻',
          });
        }
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

  const exportAllCodes = () => {
    if (sharedCodes.length === 0) {
      toast.error('No code submissions to export');
      return;
    }

    const exportData = sharedCodes.map(code => ({
      student: code.studentName,
      language: code.language,
      code: code.code,
      timestamp: formatTimestamp(code.timestamp)
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
    return matchesSearch && matchesLanguage;
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

    return { totalSubmissions, uniqueStudents, uniqueLanguages, recentSubmissions };
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
                <FiCode className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-number">{stats.uniqueLanguages}</span>
                  <span className="stat-label">Languages</span>
                </div>
              </div>
              <div className="stat-item">
                <FiClock className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-number">{stats.recentSubmissions}</span>
                  <span className="stat-label">Recent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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
                  return (
                    <div key={student} className="student-item">
                      <div className="student-info">
                        <span className="student-name">{student}</span>
                        <span className="student-count">{studentSubmissions.length} submission{studentSubmissions.length !== 1 ? 's' : ''}</span>
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
        </div>
        
        <div className="action-buttons">
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
          <p>Loading code submissions...</p>
        </div>
      )}

      {/* Enhanced Code Submissions */}
      <div className="submissions-container">
        {filteredCodes.length === 0 ? (
          <div className="empty-state">
            <FiCode className="empty-icon" />
            <h3>No code submissions yet</h3>
            <p>
              {searchTerm || selectedLanguage !== 'all' 
                ? 'No submissions match your current filters'
                : 'Students can share their code using the VSCode extension'
              }
            </p>
          </div>
        ) : (
          <div className="submissions-grid">
            {filteredCodes.map((code) => (
              <div key={code.id} className="submission-card">
                <div className="submission-header">
                  <div className="student-info">
                    <h3>{code.studentName}</h3>
                    <div className="submission-meta">
                      <span className="timestamp">
                        <FiClock className="meta-icon" />
                        {formatTimestamp(code.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="language-badge" style={{ backgroundColor: getLanguageColor(code.language) }}>
                    {getLanguageDisplayName(code.language)}
                  </div>
                </div>
                <div className="code-container">
                  <pre className="code-block">
                    <code>{code.code}</code>
                  </pre>
                </div>
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
        )}
      </div>
    </div>
  );
}

export default App; 