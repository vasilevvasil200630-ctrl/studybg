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
  subject: LessonSubject;
  grade: LessonGrade;
  /** По избор: за кои училища/профили е урокът (напр. „ПГЕЕ / ПГМЕ / Технически гимназии“) */
  audience?: string;
  sourceType: 'notebook' | 'pdf' | 'syllabus';
  examType?:
    | 'НВО (7. клас)'
    | 'НВО (10. клас)'
    | 'ДЗИ / Матура'
    | 'ДИППК / Професионален изпит'
    | 'Контролна работа / Класно';
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

/** Единственият източник на истина за класовете на уроците — ползва се от типовете и от check:data */
export const LESSON_GRADES = [
  '5. клас',
  '6. клас',
  '7. клас',
  '7. клас (НВО)',
  '8. клас',
  '9. клас',
  '10. клас (НВО)',
  '11. клас',
  '12. клас (ДЗИ / Матура)',
  '8.–10. клас',
  '8.–12. клас',
  '10.–12. клас'
] as const;

export type LessonGrade = (typeof LESSON_GRADES)[number];

export const isLessonGrade = (value: string): value is LessonGrade =>
  (LESSON_GRADES as readonly string[]).includes(value);

/** Свободен текст за клас (напр. „10. клас“ от учебната програма) → валиден LessonGrade. */
export function toLessonGrade(value: string): LessonGrade {
  if (isLessonGrade(value)) return value;
  const num = Number(value.match(/^\s*(\d{1,2})\./)?.[1]);
  const byNumber: Record<number, LessonGrade> = {
    5: '5. клас',
    6: '6. клас',
    7: '7. клас',
    8: '8. клас',
    9: '9. клас',
    10: '10. клас (НВО)',
    11: '11. клас',
    12: '12. клас (ДЗИ / Матура)'
  };
  return byNumber[num] ?? '8.–12. клас';
}

/** Единственият източник на истина за предметите — ползва се от типовете и от check:data */
export const LESSON_SUBJECTS = [
  'Български език и литература',
  'Математика',
  'Информатика, ИТ и Програмиране',
  'Икономика, Бизнес и Предприемачество',
  'История и цивилизации',
  'Биология и ЗО',
  'Химия и ООС',
  'Физика и астрономия',
  'География и икономика',
  'Английски език',
  'Чужди езици (Немски, Френски, Испански)',
  'Гражданско образование и философия',
  'Професионални специалности и Инженерство'
] as const;

export type LessonSubject = (typeof LESSON_SUBJECTS)[number];

export type SubjectName = 'Всички предмети' | LessonSubject;

export const isLessonSubject = (value: string): value is LessonSubject =>
  (LESSON_SUBJECTS as readonly string[]).includes(value);

