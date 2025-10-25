import * as vscode from 'vscode';
import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';

const STUDENT_NAME_KEY = 'codeSharingStudentName';
const ACTIVE_QUESTION_KEY = 'codeSharingActiveQuestion';

interface SharedCode {
  studentName: string;
  code: string;
  language: string;
  questionId?: string;
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

// WebSocket connection for real-time notifications
let socket: any = null;

// Simple HTTP client to replace axios
async function makeHttpRequest(url: string, method: string, data?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data ? JSON.stringify(data).length : 0
      }
    };

    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve(response);
        } catch (error) {
          resolve(body);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Initialize WebSocket connection
function initializeWebSocket(showQuestionNotification: (question: Question) => void, checkActiveQuestions: () => Promise<void>, studentName: string | undefined) {
  try {
    // Use a simple WebSocket polyfill for Node.js
    const WebSocket = require('ws');
    socket = new WebSocket('ws://localhost:3001');
    
    socket.on('open', () => {
      console.log('WebSocket connected');
      vscode.window.showInformationMessage('Connected to lecturer interface');
      
      // Register student when connected
      if (studentName) {
        socket.send(JSON.stringify({
          type: 'student-register',
          studentName: studentName
        }));
      }
    });
    
    socket.on('message', (data: any) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'question-created') {
          vscode.window.showInformationMessage(
            `🎯 New Question Available: "${message.title}"`,
            'View Questions'
          ).then(selection => {
            if (selection === 'View Questions') {
              checkActiveQuestions();
            }
          });
        } else if (message.type === 'question-activated') {
          vscode.window.showInformationMessage(
            `🟢 Question Activated: "${message.title}"`,
            'View Questions'
          ).then(selection => {
            if (selection === 'View Questions') {
              checkActiveQuestions();
            }
          });
        } else if (message.type === 'question-deactivated') {
          vscode.window.showInformationMessage(`🔴 Question "${message.title}" is no longer active`);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
    
    socket.on('close', () => {
      console.log('WebSocket disconnected');
    });
    
    socket.on('error', (error: any) => {
      console.error('WebSocket error:', error);
    });
  } catch (error) {
    console.error('Failed to initialize WebSocket:', error);
    // Fallback to polling
    setInterval(checkActiveQuestions, 5000);
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Code Sharing Extension is now active!');
  vscode.window.showInformationMessage('Code Sharing Extension activated!');

  // Ask for student name once when extension activates
  let studentName: string | undefined;
  let activeQuestion: Question | undefined;
  
  const initializeStudentName = async () => {
    try {
      // Check if we already have a name for this session
      studentName = context.globalState.get<string>(STUDENT_NAME_KEY);
      
      if (!studentName) {
        // Ask for name once at startup
        const inputName = await vscode.window.showInputBox({
          prompt: 'Enter your name for code sharing',
          placeHolder: 'Your name',
          validateInput: (value) => {
            if (!value || value.trim().length === 0) {
              return 'Name is required';
            }
            if (value.trim().length > 50) {
              return 'Name must be less than 50 characters';
            }
            return null;
          }
        });
        
        if (inputName) {
          studentName = inputName.trim();
          // Save the name for this session
          await context.globalState.update(STUDENT_NAME_KEY, studentName);
          // Show welcome message after a short delay to avoid activation issues
          setTimeout(() => {
            vscode.window.showInformationMessage(`Hello ${studentName}! You can now share code with your lecturer.`);
          }, 1000);
        } else {
          // User cancelled, show message that they can set name later
          setTimeout(() => {
            vscode.window.showInformationMessage('You can set your name later using the "Code Sharing: Set Student Name" command.');
          }, 1000);
        }
      } else {
        // Show welcome back message after a short delay
        setTimeout(() => {
          vscode.window.showInformationMessage(`Welcome back ${studentName}! You can share code with your lecturer.`);
        }, 1000);
      }
    } catch (error) {
      console.error('Error during initialization:', error);
      // Don't show error during activation, just log it
    }
  };

  // Check for all questions and show selection
  const checkActiveQuestions = async () => {
    try {
      const questions = await makeHttpRequest('http://localhost:3001/api/questions', 'GET');
      
      if (questions.length > 0) {
        // Show question selection
        showQuestionSelection(questions);
      }
    } catch (error) {
      console.error('Failed to check questions:', error);
    }
  };

  const showQuestionSelection = async (questions: Question[]) => {
    const questionItems = questions.map(q => ({
      label: `${q.active ? '🟢' : '🔴'} ${q.title}`,
      description: `${q.language} - ${q.difficulty}`,
      detail: q.text.substring(0, 100) + '...',
      question: q
    }));

    const selectedQuestion = await vscode.window.showQuickPick(questionItems, {
      placeHolder: 'Select a question to answer',
      title: 'Available Questions'
    });

    if (selectedQuestion) {
      activeQuestion = selectedQuestion.question;
      await context.globalState.update(ACTIVE_QUESTION_KEY, selectedQuestion.question);
      showQuestionDetails(selectedQuestion.question);
    }
  };

  const showQuestionNotification = (question: Question) => {
    setTimeout(() => {
      vscode.window.showInformationMessage(
        `🎯 New Question: "${question.title}" - ${question.text.substring(0, 100)}...`,
        'View Question',
        'Dismiss'
      ).then(selection => {
        if (selection === 'View Question') {
          showQuestionDetails(question);
        }
      });
    }, 1000);
  };

  const showQuestionDetails = (question: Question) => {
    const panel = vscode.window.createWebviewPanel(
      'questionDetails',
      `Question: ${question.title}`,
      vscode.ViewColumn.One,
      {}
    );

    panel.webview.html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${question.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .question-header { background: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
            .question-title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .question-meta { color: #666; font-size: 14px; }
            .question-text { line-height: 1.6; font-size: 16px; }
            .difficulty { display: inline-block; padding: 4px 8px; border-radius: 3px; color: white; font-size: 12px; }
            .difficulty.easy { background: #28a745; }
            .difficulty.medium { background: #ffc107; color: #000; }
            .difficulty.hard { background: #dc3545; }
          </style>
        </head>
        <body>
          <div class="question-header">
            <div class="question-title">${question.title}</div>
            <div class="question-meta">
              Language: ${question.language} | 
              Difficulty: <span class="difficulty ${question.difficulty}">${question.difficulty}</span> | 
              Time Limit: ${question.timeLimit} minutes
            </div>
          </div>
          <div class="question-text">${question.text.replace(/\n/g, '<br>')}</div>
        </body>
      </html>
    `;
  };

  // Initialize student name when extension activates (but don't block activation)
  initializeStudentName().catch(error => {
    console.error('Failed to initialize student name:', error);
  });

  // Initialize WebSocket connection
  setTimeout(() => {
    initializeWebSocket(showQuestionNotification, checkActiveQuestions, studentName);
  }, 2000);

  // Check for active questions after a short delay
  setTimeout(() => {
    checkActiveQuestions();
  }, 3000);

  // Register the share code command
  let shareCodeDisposable = vscode.commands.registerCommand('code-sharing.shareCode', async () => {
    try {
      const editor = vscode.window.activeTextEditor;
      
      if (!editor) {
        vscode.window.showErrorMessage('No active editor found. Please open a file first.');
        return;
      }

      // Check if we have a student name
      if (!studentName) {
        // Try to get the name again
        studentName = context.globalState.get<string>(STUDENT_NAME_KEY);
        
        if (!studentName) {
          // Ask for name now
          const inputName = await vscode.window.showInputBox({
            prompt: 'Enter your name for code sharing',
            placeHolder: 'Your name',
            validateInput: (value) => {
              if (!value || value.trim().length === 0) {
                return 'Name is required';
              }
              if (value.trim().length > 50) {
                return 'Name must be less than 50 characters';
              }
              return null;
            }
          });
          
          if (!inputName) {
            vscode.window.showErrorMessage('Name is required to share code.');
            return;
          }
          
          studentName = inputName.trim();
          await context.globalState.update(STUDENT_NAME_KEY, studentName);
        }
      }

      // Get the document and selection
      const document = editor.document;
      const selection = editor.selection;
      
      // Get code content (selected text or entire file)
      let codeContent: string;
      if (!selection.isEmpty) {
        codeContent = document.getText(selection);
      } else {
        codeContent = document.getText();
      }

      if (!codeContent.trim()) {
        vscode.window.showErrorMessage('No code to share. Please select some code or open a file with content.');
        return;
      }

      // Determine language
      const language = document.languageId || 'text';

      let submissionMessage = 'Code shared successfully!';
      let questionId: string | undefined;

      // Always show two options: share general code or relate to a question
      try {
        const questions = await makeHttpRequest('http://localhost:3001/api/questions', 'GET');
        const openQuestions = questions.filter((q: Question) => q.active);
        
        // Show question selection dialog with two options
        const questionChoice = await vscode.window.showQuickPick(
          [
            { label: '$(question) Relate code to a question', description: 'Get detailed AI review and scoring' },
            { label: '$(share) Share just code', description: 'Basic sharing without question context' }
          ],
          {
            placeHolder: 'How would you like to share your code?',
            title: 'Code Sharing Options'
          }
        );

        if (questionChoice?.label.includes('Relate code to a question')) {
          if (openQuestions.length > 0) {
            // Show question selection
            const selectedQuestion = await vscode.window.showQuickPick(
              openQuestions.map((q: Question) => ({
                label: q.title,
                description: q.text.substring(0, 50) + '...',
                detail: `Language: ${q.language} | Difficulty: ${q.difficulty}`,
                question: q
              })),
              {
                placeHolder: 'Select an open question',
                title: 'Open Questions'
              }
            );

            if (selectedQuestion) {
              questionId = (selectedQuestion as any).question.id;
              submissionMessage = `Answer submitted for "${(selectedQuestion as any).question.title}"! AI review will be provided.`;
            } else {
              // User cancelled question selection, don't share
              vscode.window.showInformationMessage('Code sharing cancelled.');
              return;
            }
          } else {
            // No open questions available
            vscode.window.showWarningMessage('No open questions available. Please share as general code instead.');
            submissionMessage = 'Code shared as general code (no question context).';
          }
        } else if (questionChoice?.label.includes('Share just code')) {
          submissionMessage = 'Code shared as general code (no question context).';
        } else {
          // User cancelled, don't share
          return;
        }
      } catch (error) {
        console.error('Error checking questions:', error);
        vscode.window.showWarningMessage('Could not check for questions. Sharing as general code.');
        submissionMessage = 'Code shared successfully!';
      }

      // Show progress
      await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: questionId ? "Submitting answer..." : "Sharing code with lecturer...",
        cancellable: false
      }, async (progress) => {
        progress.report({ increment: 0 });

        // Send code to backend using built-in HTTP module
        const response = await makeHttpRequest('http://localhost:3001/api/codes', 'POST', {
          studentName: studentName!.trim(),
          code: codeContent,
          language: language,
          questionId: questionId
        });

        progress.report({ increment: 100 });

        // Show AI review if available
        if (response.review) {
          const reviewMessage = response.review.isCorrect 
            ? `✅ Correct! Score: ${response.review.score}%`
            : `❌ Needs improvement. Score: ${response.review.score}%`;
          
          vscode.window.showInformationMessage(
            `${submissionMessage}\n${reviewMessage}\nFeedback: ${response.review.feedback}`,
            'View Details'
          ).then(selection => {
            if (selection === 'View Details') {
              showReviewDetails(response.review);
            }
          });
        } else {
          vscode.window.showInformationMessage(submissionMessage);
        }
      });

    } catch (error) {
      console.error('Error sharing code:', error);
      vscode.window.showErrorMessage(
        'Failed to share code. Please make sure the backend server is running.'
      );
    }
  });

  const showReviewDetails = (review: any) => {
    const panel = vscode.window.createWebviewPanel(
      'reviewDetails',
      'AI Review Details',
      vscode.ViewColumn.One,
      {}
    );

    panel.webview.html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AI Review</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
            .review-header { background: ${review.isCorrect ? '#0e7a0e' : '#a1260d'}; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid ${review.isCorrect ? '#1ea31e' : '#c32f0f'}; }
            .score { font-size: 32px; font-weight: bold; color: #ffffff; }
            .status { font-size: 20px; margin-top: 10px; color: #ffffff; font-weight: 600; }
            .feedback { background: #252526; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #007acc; }
            .feedback h3 { color: #4ec9b0; margin-top: 0; }
            .feedback p { color: #d4d4d4; line-height: 1.6; }
            .suggestions { background: #252526; padding: 20px; border-radius: 8px; border-left: 4px solid #007acc; }
            .suggestions h3 { margin-top: 0; color: #4ec9b0; }
            .suggestions ul { margin: 10px 0; }
            .suggestions li { margin: 8px 0; color: #d4d4d4; }
          </style>
        </head>
        <body>
          <div class="review-header">
            <div class="score">Score: ${review.score}%</div>
            <div class="status">${review.isCorrect ? '✅ Correct' : '❌ Needs Improvement'}</div>
          </div>
          <div class="feedback">
            <h3>Feedback:</h3>
            <p>${review.feedback}</p>
          </div>
          ${review.suggestions && review.suggestions.length > 0 ? `
            <div class="suggestions">
              <h3>Suggestions:</h3>
              <ul>
                ${review.suggestions.map((s: string) => `<li>${s}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </body>
      </html>
    `;
  };

  // Register command to set/change student name
  let setNameDisposable = vscode.commands.registerCommand('code-sharing.setStudentName', async () => {
    try {
      const currentName = context.globalState.get<string>(STUDENT_NAME_KEY);
      
      const inputName = await vscode.window.showInputBox({
        prompt: 'Enter your name for code sharing',
        placeHolder: currentName || 'Your name',
        value: currentName || '',
        validateInput: (value) => {
          if (!value || value.trim().length === 0) {
            return 'Name is required';
          }
          if (value.trim().length > 50) {
            return 'Name must be less than 50 characters';
          }
          return null;
        }
      });
      
      if (inputName) {
        studentName = inputName.trim();
        await context.globalState.update(STUDENT_NAME_KEY, studentName);
        vscode.window.showInformationMessage(`Name updated to: ${studentName}`);
      }
    } catch (error) {
      console.error('Error setting student name:', error);
      vscode.window.showErrorMessage('Failed to set student name.');
    }
  });

  // Register command to check active questions
  let checkQuestionsDisposable = vscode.commands.registerCommand('code-sharing.checkQuestions', async () => {
    try {
      await checkActiveQuestions();
    } catch (error) {
      console.error('Error checking questions:', error);
      vscode.window.showErrorMessage('Failed to check active questions.');
    }
  });

  // Register command to view all questions
  let viewQuestionsDisposable = vscode.commands.registerCommand('code-sharing.viewQuestions', async () => {
    try {
      const questions = await makeHttpRequest('http://localhost:3001/api/questions', 'GET');
      if (questions.length > 0) {
        await showQuestionSelection(questions);
      } else {
        vscode.window.showInformationMessage('No questions available yet.');
      }
    } catch (error) {
      console.error('Error viewing questions:', error);
      vscode.window.showErrorMessage('Failed to view questions.');
    }
  });

  context.subscriptions.push(shareCodeDisposable, setNameDisposable, checkQuestionsDisposable, viewQuestionsDisposable);
}

export function deactivate() {
  console.log('Code Sharing Extension is now deactivated!');
  if (socket) {
    socket.close();
  }
} 