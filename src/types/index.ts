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

export interface NotebookCheckItem {
  id: string;
  requirement: string;
  whyNeeded: string;
  isEssentialForSix: boolean; // Задължително за оценка 6.00
  suggestedNotes: string; // Точният запис, който трябва да се добави в тетрадката
}

export interface LessonData {
  id: string;
  title: string;
  subject: string;
  grade: string;
  sourceType: 'notebook' | 'pdf' | 'syllabus';
  examType?: 'НВО (7. клас)' | 'НВО (10. клас)' | 'ДЗИ / Матура' | 'Контролна работа / Класно';
  originalNoteExcerpt: string;
  summary: {
    overview: string;
    keyPoints: string[];
    examGoldenRule: string;
    commonTraps: string[];
    formulasOrDates: { label: string; value: string }[];
  };
  notebookChecklist?: NotebookCheckItem[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  quickQuestions: string[];
}

export type GradeLevel =
  | 'Всички класове'
  | '5. клас'
  | '6. клас'
  | '7. клас (НВО)'
  | '8. клас'
  | '9. клас'
  | '10. клас (НВО)'
  | '11. клас'
  | '12. клас (ДЗИ / Матура)';

export type SubjectName =
  | 'Всички предмети'
  | 'История и цивилизации'
  | 'Български език и литература'
  | 'Математика'
  | 'Биология и ЗО'
  | 'Химия и ООС'
  | 'География и икономика'
  | 'Физика и астрономия'
  | 'Английски език'
  | 'Гражданско образование и философия';
