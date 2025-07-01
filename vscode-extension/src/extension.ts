import * as vscode from 'vscode';
import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';

const STUDENT_NAME_KEY = 'codeSharingStudentName';

interface SharedCode {
  studentName: string;
  code: string;
  language: string;
}

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

export function activate(context: vscode.ExtensionContext) {
  console.log('Code Sharing Extension is now active!');
  vscode.window.showInformationMessage('Code Sharing Extension activated!');

  // Ask for student name once when extension activates
  let studentName: string | undefined;
  
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

  // Initialize student name when extension activates (but don't block activation)
  initializeStudentName().catch(error => {
    console.error('Failed to initialize student name:', error);
  });

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

      // Show progress
      await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Sharing code with lecturer...",
        cancellable: false
      }, async (progress) => {
        progress.report({ increment: 0 });

        // Send code to backend using built-in HTTP module
        await makeHttpRequest('http://localhost:3001/api/codes', 'POST', {
          studentName: studentName!.trim(),
          code: codeContent,
          language: language
        });

        progress.report({ increment: 100 });
      });

      vscode.window.showInformationMessage(
        `Code shared successfully! Your lecturer can now see your ${language} code.`
      );

    } catch (error) {
      console.error('Error sharing code:', error);
      vscode.window.showErrorMessage(
        'Failed to share code. Please make sure the backend server is running.'
      );
    }
  });

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

  context.subscriptions.push(shareCodeDisposable, setNameDisposable);
}

export function deactivate() {
  console.log('Code Sharing Extension is now deactivated!');
} 