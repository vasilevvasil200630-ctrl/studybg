export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  tag?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  referencedLine?: string;
}

export interface LessonData {
  id: string;
  title: string;
  subject: string;
  grade: string;
  sourceType: 'notebook' | 'pdf' | 'syllabus';
  originalNoteExcerpt: string;
  summary: {
    overview: string;
    keyPoints: string[];
    examGoldenRule: string;
    commonTraps: string[];
    formulasOrDates: { label: string; value: string }[];
  };
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  quickQuestions: string[];
}
