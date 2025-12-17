export type DifficultyLevel = 'einfach' | 'mittel' | 'anspruchsvoll';

export type QuestionType = 'multiple-choice' | 'text' | 'sorting' | 'matching';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: DifficultyLevel;
  points: number;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  content: string;
  questions: Question[];
  estimatedMinutes: number;
  requiredScore?: number;
}

export interface LearningPath {
  einfach: LearningModule[];
  mittel: LearningModule[];
  anspruchsvoll: LearningModule[];
}

export interface UserProgress {
  userId: string;
  currentLevel: DifficultyLevel;
  completedModules: string[];
  scores: { [moduleId: string]: number };
  totalTimeSpent: number;
  startedAt: Date;
  lastActivity: Date;
  answers: { [questionId: string]: any };
}

export interface Certificate {
  userId: string;
  userName: string;
  completionDate: Date;
  level: DifficultyLevel;
  totalScore: number;
  timeSpent: number;
}
