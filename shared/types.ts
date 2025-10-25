// Shared types for the code sharing system

export interface SharedCode {
  id: string;
  studentName: string;
  code: string;
  language: string;
  timestamp: Date;
  questionId?: string;
  questionContext?: Question;
  review?: CodeReview;
}

export interface CodeShareRequest {
  studentName: string;
  code: string;
  language: string;
  questionId?: string;
}

export interface CodeShareResponse {
  success: boolean;
  message: string;
  data?: SharedCode;
  error?: string;
}

export interface Question {
  id: string;
  title: string;
  text: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // minutes
  timestamp: Date;
  active: boolean;
}

export interface CodeReview {
  isCorrect: boolean;
  score: number;
  feedback: string;
  suggestions: string[];
}

// WebSocket event types
export interface WebSocketEvents {
  'code-shared': (code: SharedCode) => void;
  'existing-codes': (codes: SharedCode[]) => void;
  'question-created': (question: Question) => void;
  'question-activated': (question: Question) => void;
  'question-deactivated': (question: Question) => void;
  'existing-questions': (questions: Question[]) => void;
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

// Difficulty mapping for display
export const DIFFICULTY_DISPLAY_NAMES: { [key: string]: string } = {
  'easy': 'Easy',
  'medium': 'Medium',
  'hard': 'Hard'
};

// Difficulty colors
export const DIFFICULTY_COLORS: { [key: string]: string } = {
  'easy': '#28a745',
  'medium': '#ffc107',
  'hard': '#dc3545'
}; 