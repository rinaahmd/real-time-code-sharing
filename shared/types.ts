// Shared types for the code sharing system

export interface SharedCode {
  id: string;
  studentName: string;
  code: string;
  language: string;
  timestamp: Date;
}

export interface CodeShareRequest {
  studentName: string;
  code: string;
  language: string;
}

export interface CodeShareResponse {
  success: boolean;
  message: string;
  data?: SharedCode;
  error?: string;
}

// WebSocket event types
export interface WebSocketEvents {
  'code-shared': (code: SharedCode) => void;
  'existing-codes': (codes: SharedCode[]) => void;
  'connect': () => void;
  'disconnect': () => void;
}

// Language mapping for display
export const LANGUAGE_DISPLAY_NAMES: { [key: string]: string } = {
  'javascript': 'JavaScript',
  'typescript': 'TypeScript',
  'python': 'Python',
  'java': 'Java',
  'cpp': 'C++',
  'c': 'C',
  'html': 'HTML',
  'css': 'CSS',
  'json': 'JSON',
  'text': 'Text',
  'php': 'PHP',
  'ruby': 'Ruby',
  'go': 'Go',
  'rust': 'Rust',
  'swift': 'Swift',
  'kotlin': 'Kotlin',
  'scala': 'Scala'
}; 