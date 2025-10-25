import sqlite3 from 'sqlite3';
import { promisify } from 'util';

export interface Question {
  id: string;
  title: string;
  text: string;
  language: string;
  difficulty: string;
  timeLimit: number;
  timestamp: string;
  active: boolean;
}

export interface Submission {
  id: string;
  studentName: string;
  code: string;
  language: string;
  timestamp: string;
  questionId?: string;
  questionContext?: Question | null;
  review: {
    isCorrect: boolean;
    score: number;
    feedback: string;
    suggestions: string[];
  };
}

export interface StudentHistory {
  studentName: string;
  questionId: string;
  submissions: Submission[];
}

class DatabaseService {
  private db: sqlite3.Database;
  private run: (sql: string, params?: any[]) => Promise<sqlite3.RunResult>;
  private get: (sql: string, params?: any[]) => Promise<any>;
  private all: (sql: string, params?: any[]) => Promise<any[]>;

  constructor() {
    this.db = new sqlite3.Database('./data/code_sharing.db');
    
    // Promisify database methods
    this.run = promisify(this.db.run.bind(this.db));
    this.get = promisify(this.db.get.bind(this.db));
    this.all = promisify(this.db.all.bind(this.db));
    
    this.initializeTables();
  }

  private async initializeTables() {
    try {
      // Create questions table
      await this.run(`
        CREATE TABLE IF NOT EXISTS questions (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          text TEXT NOT NULL,
          language TEXT NOT NULL,
          difficulty TEXT DEFAULT 'medium',
          timeLimit INTEGER DEFAULT 30,
          timestamp TEXT NOT NULL,
          active INTEGER DEFAULT 1
        )
      `);

      // Create submissions table
      await this.run(`
        CREATE TABLE IF NOT EXISTS submissions (
          id TEXT PRIMARY KEY,
          studentName TEXT NOT NULL,
          code TEXT NOT NULL,
          language TEXT NOT NULL,
          timestamp TEXT NOT NULL,
          questionId TEXT,
          review TEXT NOT NULL,
          FOREIGN KEY (questionId) REFERENCES questions (id)
        )
      `);

      // Create student history table for tracking submissions per student per question
      await this.run(`
        CREATE TABLE IF NOT EXISTS student_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          studentName TEXT NOT NULL,
          questionId TEXT NOT NULL,
          submissionId TEXT NOT NULL,
          timestamp TEXT NOT NULL,
          FOREIGN KEY (submissionId) REFERENCES submissions (id),
          FOREIGN KEY (questionId) REFERENCES questions (id)
        )
      `);

      console.log('✅ Database tables initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing database:', error);
    }
  }

  // Question operations
  async createQuestion(question: Omit<Question, 'id' | 'timestamp'>): Promise<Question> {
    const id = Date.now().toString();
    const timestamp = new Date().toISOString();
    
    await this.run(
      `INSERT INTO questions (id, title, text, language, difficulty, timeLimit, timestamp, active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, question.title, question.text, question.language, question.difficulty, question.timeLimit, timestamp, question.active ? 1 : 0]
    );

    return {
      id,
      timestamp,
      ...question
    };
  }

  async getQuestions(): Promise<Question[]> {
    const rows = await this.all('SELECT * FROM questions ORDER BY timestamp DESC');
    return rows.map(row => ({
      ...row,
      active: row.active === 1,
      timeLimit: row.timeLimit
    }));
  }

  async getQuestion(id: string): Promise<Question | null> {
    const row = await this.get('SELECT * FROM questions WHERE id = ?', [id]);
    if (!row) return null;
    
    return {
      ...row,
      active: row.active === 1,
      timeLimit: row.timeLimit
    };
  }

  async updateQuestionActive(id: string, active: boolean): Promise<boolean> {
    const result = await this.run('UPDATE questions SET active = ? WHERE id = ?', [active ? 1 : 0, id]);
    return result.changes > 0;
  }

  // Submission operations
  async createSubmission(submission: Omit<Submission, 'id' | 'timestamp'>): Promise<Submission> {
    const id = Date.now().toString();
    const timestamp = new Date().toISOString();
    
    await this.run(
      `INSERT INTO submissions (id, studentName, code, language, timestamp, questionId, review) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, submission.studentName, submission.code, submission.language, timestamp, submission.questionId, JSON.stringify(submission.review)]
    );

    // Add to student history if it's a question submission
    if (submission.questionId) {
      await this.run(
        `INSERT INTO student_history (studentName, questionId, submissionId, timestamp) 
         VALUES (?, ?, ?, ?)`,
        [submission.studentName, submission.questionId, id, timestamp]
      );
    }

    return {
      id,
      timestamp,
      ...submission
    };
  }

  async getSubmissions(): Promise<Submission[]> {
    const rows = await this.all(`
      SELECT s.*, q.title as questionTitle, q.text as questionText, q.language as questionLanguage,
             q.difficulty as questionDifficulty, q.timeLimit as questionTimeLimit, q.timestamp as questionTimestamp, q.active as questionActive
      FROM submissions s
      LEFT JOIN questions q ON s.questionId = q.id
      ORDER BY s.timestamp DESC
    `);

    return rows.map(row => ({
      id: row.id,
      studentName: row.studentName,
      code: row.code,
      language: row.language,
      timestamp: row.timestamp,
      questionId: row.questionId,
      questionContext: row.questionId ? {
        id: row.questionId,
        title: row.questionTitle,
        text: row.questionText,
        language: row.questionLanguage,
        difficulty: row.questionDifficulty,
        timeLimit: row.questionTimeLimit,
        timestamp: row.questionTimestamp,
        active: row.questionActive === 1
      } : undefined,
      review: JSON.parse(row.review)
    }));
  }

  async getSubmissionsByQuestion(questionId: string): Promise<Submission[]> {
    const rows = await this.all(`
      SELECT s.*, q.title as questionTitle, q.text as questionText, q.language as questionLanguage,
             q.difficulty as questionDifficulty, q.timeLimit as questionTimeLimit, q.timestamp as questionTimestamp, q.active as questionActive
      FROM submissions s
      LEFT JOIN questions q ON s.questionId = q.id
      WHERE s.questionId = ?
      ORDER BY s.timestamp DESC
    `, [questionId]);

    return rows.map(row => ({
      id: row.id,
      studentName: row.studentName,
      code: row.code,
      language: row.language,
      timestamp: row.timestamp,
      questionId: row.questionId,
      questionContext: {
        id: row.questionId,
        title: row.questionTitle,
        text: row.questionText,
        language: row.questionLanguage,
        difficulty: row.questionDifficulty,
        timeLimit: row.questionTimeLimit,
        timestamp: row.questionTimestamp,
        active: row.questionActive === 1
      },
      review: JSON.parse(row.review)
    }));
  }

  async getStudentHistory(studentName: string, questionId?: string): Promise<StudentHistory[]> {
    let sql = `
      SELECT sh.*, s.id as submissionId, s.code, s.language, s.timestamp as submissionTimestamp, s.review
      FROM student_history sh
      JOIN submissions s ON sh.submissionId = s.id
      WHERE sh.studentName = ?
    `;
    const params: any[] = [studentName];

    if (questionId) {
      sql += ' AND sh.questionId = ?';
      params.push(questionId);
    }

    sql += ' ORDER BY sh.timestamp DESC';

    const rows = await this.all(sql, params);

    // Group by questionId
    const historyMap = new Map<string, StudentHistory>();
    
    rows.forEach(row => {
      if (!historyMap.has(row.questionId)) {
        historyMap.set(row.questionId, {
          studentName: row.studentName,
          questionId: row.questionId,
          submissions: []
        });
      }
      
      historyMap.get(row.questionId)!.submissions.push({
        id: row.submissionId,
        studentName: row.studentName,
        code: row.code,
        language: row.language,
        timestamp: row.submissionTimestamp,
        questionId: row.questionId,
        review: JSON.parse(row.review)
      });
    });

    return Array.from(historyMap.values());
  }

  async clearAllSubmissions(): Promise<void> {
    await this.run('DELETE FROM submissions');
    await this.run('DELETE FROM student_history');
  }

  async getStats(): Promise<{ totalCodes: number; totalQuestions: number; totalSubmissions: number }> {
    const codesResult = await this.get('SELECT COUNT(*) as count FROM submissions');
    const questionsResult = await this.get('SELECT COUNT(*) as count FROM questions');
    const submissionsResult = await this.get('SELECT COUNT(*) as count FROM student_history');
    
    return {
      totalCodes: codesResult.count,
      totalQuestions: questionsResult.count,
      totalSubmissions: submissionsResult.count
    };
  }

  close(): void {
    this.db.close();
  }
}

export default DatabaseService;
