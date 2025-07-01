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
  FiFilter
} from 'react-icons/fi';

import './App.css';

// Declare Prism as global for TypeScript
declare global {
  interface Window {
    Prism: any;
  }
}

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
  const [prismLoaded, setPrismLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load PrismJS dynamically with better error handling
  useEffect(() => {
    const loadPrismJS = async () => {
      try {
        // Check if PrismJS is already loaded
        if (window.Prism) {
          setPrismLoaded(true);
          return;
        }

        // Load PrismJS CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css';
        link.onerror = () => console.warn('Failed to load PrismJS CSS');
        document.head.appendChild(link);

        // Load PrismJS script
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js';
        script.onload = () => {
          try {
            // Load additional language components
            const languages = ['javascript', 'typescript', 'python', 'java', 'cpp', 'c', 'markup', 'css', 'json'];
            let loadedCount = 0;
            
            languages.forEach(lang => {
              const langScript = document.createElement('script');
              langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
              langScript.onload = () => {
                loadedCount++;
                if (loadedCount === languages.length) {
                  setPrismLoaded(true);
                }
              };
              langScript.onerror = () => {
                console.warn(`Failed to load PrismJS language: ${lang}`);
                loadedCount++;
                if (loadedCount === languages.length) {
                  setPrismLoaded(true);
                }
              };
              document.head.appendChild(langScript);
            });
          } catch (error) {
            console.warn('Error loading PrismJS languages:', error);
            setPrismLoaded(true);
          }
        };
        script.onerror = () => {
          console.warn('Failed to load PrismJS core');
          setPrismLoaded(true);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load PrismJS:', error);
        setPrismLoaded(true);
      }
    };

    loadPrismJS();
  }, []);

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

  // Apply syntax highlighting when codes change and PrismJS is loaded
  useEffect(() => {
    if (prismLoaded && window.Prism) {
      try {
        setTimeout(() => {
          if (window.Prism && window.Prism.highlightAll) {
            window.Prism.highlightAll();
          }
        }, 100);
      } catch (error) {
        console.warn('Error applying syntax highlighting:', error);
      }
    }
  }, [sharedCodes, prismLoaded]);

  const formatTimestamp = (timestamp: Date | string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString();
    } catch (error) {
      return 'Unknown time';
    }
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
      'text': 'Text'
    };
    return languageMap[language] || language;
  };

  const copyToClipboard = async (code: string, studentName: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(`Copied ${studentName}'s code to clipboard!`);
    } catch (error) {
      console.error('Failed to copy code:', error);
      toast.error('Failed to copy code');
    }
  };

  const clearAllCodes = async () => {
    try {
      await axios.delete('http://localhost:3001/api/codes', {
        timeout: 5000
      });
      setSharedCodes([]);
      toast.success('All code submissions cleared!');
    } catch (error) {
      console.error('Failed to clear submissions:', error);
      toast.error('Failed to clear submissions');
    }
  };

  const exportAllCodes = () => {
    try {
      const exportData = sharedCodes.map(code => ({
        student: code.studentName,
        language: code.language,
        timestamp: formatTimestamp(code.timestamp),
        code: code.code
      }));

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code-submissions-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Code submissions exported!');
    } catch (error) {
      console.error('Failed to export codes:', error);
      toast.error('Failed to export submissions');
    }
  };

  const getUniqueLanguages = () => {
    try {
      const languageSet = new Set(sharedCodes.map(code => code.language));
      const languages = Array.from(languageSet);
      return languages.sort();
    } catch (error) {
      console.error('Error getting unique languages:', error);
      return [];
    }
  };

  const filteredCodes = sharedCodes.filter(code => {
    try {
      const matchesSearch = code.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = selectedLanguage === 'all' || code.language === selectedLanguage;
      return matchesSearch && matchesLanguage;
    } catch (error) {
      console.error('Error filtering codes:', error);
      return false;
    }
  });

  const stats = {
    totalSubmissions: sharedCodes.length,
    uniqueStudents: Array.from(new Set(sharedCodes.map(code => code.studentName))).length,
    languages: getUniqueLanguages().length
  };

  // Show error state if there's a connection error
  if (error && !isConnected) {
    return (
      <div className="App">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        
        <header className="App-header">
          <h1>🖥️ Real-Time Code Sharing</h1>
          <div className="connection-status">
            <span className="status-indicator disconnected">
              🔴 Disconnected
            </span>
          </div>
        </header>

        <main className="App-main">
          <div className="error-state">
            <h2>⚠️ Connection Error</h2>
            <p>{error}</p>
            <p>Please make sure the backend server is running on port 3001.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="action-btn"
              style={{ marginTop: '1rem' }}
            >
              <FiRefreshCw />
              Retry Connection
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
       <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <header className="App-header">
        <h1>🖥️ Real-Time Code Sharing</h1>
        <div className="connection-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
        </div>
      </header>

      <main className="App-main">
        {/* Statistics Cards */}
        <div className="stats-container">
          <div className="stat-card">
            <FiUsers className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.totalSubmissions}</h3>
              <p>Total Submissions</p>
            </div>
          </div>
          <div className="stat-card">
            <FiUsers className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.uniqueStudents}</h3>
              <p>Active Students</p>
            </div>
          </div>
          <div className="stat-card">
            <FiCode className="stat-icon" />
            <div className="stat-content">
              <h3>{stats.languages}</h3>
              <p>Languages Used</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-container">
          <div className="search-filter-container">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-box">
              <FiFilter className="filter-icon" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="filter-select"
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
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`action-btn ${autoRefresh ? 'active' : ''}`}
              title={autoRefresh ? 'Disable auto-refresh' : 'Enable auto-refresh'}
            >
              <FiRefreshCw className={`refresh-icon ${autoRefresh ? 'spinning' : ''}`} />
              Auto-refresh
            </button>
            <button
              onClick={exportAllCodes}
              className="action-btn"
              disabled={sharedCodes.length === 0}
              title="Export all submissions"
            >
              <FiDownload />
              Export
            </button>
            <button
              onClick={clearAllCodes}
              className="action-btn danger"
              disabled={sharedCodes.length === 0}
              title="Clear all submissions"
            >
              <FiTrash2 />
              Clear All
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading code submissions...</p>
          </div>
        )}

        {/* Code Submissions */}
        {!isLoading && filteredCodes.length === 0 ? (
          <div className="empty-state">
            <h2>No code shared yet</h2>
            <p>
              {searchTerm || selectedLanguage !== 'all' 
                ? 'No submissions match your search criteria.' 
                : 'When students share their code, it will appear here in real-time.'}
            </p>
          </div>
        ) : (
          <div className="codes-container">
            {filteredCodes.map((sharedCode) => (
              <div key={sharedCode.id} className="code-card">
                <div className="code-header">
                  <div className="student-info">
                    <h3>👤 {sharedCode.studentName}</h3>
                    <span className="language-badge">
                      {getLanguageDisplayName(sharedCode.language)}
                    </span>
                  </div>
                  <div className="code-actions">
                    <span className="timestamp">
                      {formatTimestamp(sharedCode.timestamp)}
                    </span>
                    <button
                      onClick={() => copyToClipboard(sharedCode.code, sharedCode.studentName)}
                      className="copy-btn"
                      title="Copy code to clipboard"
                    >
                      <FiCopy />
                    </button>
                  </div>
                </div>
                <pre className="code-content">
                  <code className={`language-${sharedCode.language}`}>
                    {sharedCode.code}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 