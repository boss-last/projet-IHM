
export enum AppView {
  DASHBOARD = 'dashboard',
  STUDY_CHAT = 'study-chat',
  QUIZ = 'quiz',
  RESOURCES = 'resources',
  PROGRESS = 'progress'
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  icon: string;
}

export interface Exam {
  id: string;
  courseId: string;
  date: string;
  time: string;
  room: string;
  priority: 'high' | 'medium' | 'low';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StudySession {
  id: string;
  courseId: string;
  date: string;
  duration: number; // in minutes
  topicsCovered: string[];
}
