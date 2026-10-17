import { pointsToGrade, type GradeResult, type GradeScale } from './monGradeScale';

// ---------------------------------------------------------------------------
// Модел на пълен изпитен вариант (тренировъчен или официален)
// ---------------------------------------------------------------------------

export interface ChoiceQuestion {
  id: string;
  number: number;
  kind: 'choice';
  prompt: string;
  options: string[];
  correctIndex: number;
  points: number;
  explanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  number: number;
  kind: 'short';
  prompt: string;
  /** 'number' сравнява числено („12 000“ = „12000“); 'text' — без значение на главни букви и кавички */
  answerType: 'number' | 'text';
  acceptedAnswers: string[];
  points: number;
  explanation: string;
}

export interface OpenTaskCriterion {
  label: string;
  points: number;
}

/** Задача със свободен отговор: оценява се от ученика по критериите и еталона. */
export interface OpenQuestion {
  id: string;
  number: number;
  kind: 'open';
  prompt: string;
  points: number;
  criteria: OpenTaskCriterion[];
  modelAnswer: string;
}

export type PaperQuestion = ChoiceQuestion | ShortAnswerQuestion | OpenQuestion;

export interface PaperSection {
  id: string;
  title: string;
  instructions?: string;
  sourceText?: { title: string; text: string; attribution: string };
  questions: PaperQuestion[];
}

export interface ExamPaper {
  id: string;
  title: string;
  exam: 'ДЗИ' | 'НВО 10';
  subject: string;
  /** 'practice' = тренировъчен вариант на StudyBG; 'official' = преписан официален вариант на МОН */
  kind: 'practice' | 'official';
  /** Задължителен за kind === 'official' (https връзка към официалния PDF/ключ) */
  officialSourceUrl?: string;
  year?: number;
  durationMinutes: number;
  maxPoints: number;
  /** null = резултатът е само в точки (напр. НВО 10, където няма официално превръщане в оценка) */
  gradeScale: GradeScale | null;
  sections: PaperSection[];
}

export const PRACTICE_PAPER_LABEL = 'Тренировъчен вариант по формата на МОН с ключ за самопроверка';

// ---------------------------------------------------------------------------
// Валидиране на вариантите (ползва се от тестовете и при добавяне на официални варианти)
// ---------------------------------------------------------------------------

export function validateExamPaper(paper: ExamPaper): string[] {
  const errors: string[] = [];
  const where = (q: PaperQuestion) => `${paper.id} / зад. ${q.number} (${q.id})`;

  if (paper.kind === 'official') {
    if (!paper.officialSourceUrl?.startsWith('https://')) {
      errors.push(`${paper.id}: официален вариант без https officialSourceUrl`);
    }
  } else if (paper.officialSourceUrl) {
    errors.push(`${paper.id}: тренировъчен вариант не бива да има officialSourceUrl`);
  }

  const all = paper.sections.flatMap((s) => s.questions);
  const total = all.reduce((sum, q) => sum + q.points, 0);
  if (total !== paper.maxPoints) errors.push(`${paper.id}: сборът на точките е ${total}, а maxPoints е ${paper.maxPoints}`);

  const ids = new Set<string>();
  all.forEach((q, i) => {
    if (ids.has(q.id)) errors.push(`${where(q)}: дублирано id`);
    ids.add(q.id);
    if (q.number !== i + 1) errors.push(`${where(q)}: номерацията трябва да е последователна (очаквана ${i + 1})`);
    if (!(q.points > 0) || !Number.isInteger(q.points)) errors.push(`${where(q)}: точките трябва да са цяло положително число`);
    if (!q.prompt.trim()) errors.push(`${where(q)}: празно условие`);

    if (q.kind === 'choice') {
      if (q.options.length < 2) errors.push(`${where(q)}: по-малко от 2 отговора`);
      if (new Set(q.options).size !== q.options.length) errors.push(`${where(q)}: повтарящи се отговори`);
      if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
        errors.push(`${where(q)}: невалиден correctIndex`);
      }
      if (!q.explanation.trim()) errors.push(`${where(q)}: липсва обяснение към ключа`);
    } else if (q.kind === 'short') {
      if (q.acceptedAnswers.length === 0) errors.push(`${where(q)}: няма верни отговори в ключа`);
      if (q.answerType === 'number' && q.acceptedAnswers.some((a) => parseNumberAnswer(a) === null)) {
        errors.push(`${where(q)}: числов ключ, който не е число`);
      }
      if (!q.explanation.trim()) errors.push(`${where(q)}: липсва обяснение към ключа`);
    } else {
      const criteriaTotal = q.criteria.reduce((sum, c) => sum + c.points, 0);
      if (criteriaTotal !== q.points) errors.push(`${where(q)}: критериите дават ${criteriaTotal} т., а задачата е за ${q.points}`);
      if (!q.modelAnswer.trim()) errors.push(`${where(q)}: липсва еталонен отговор`);
    }
  });

  return errors;
}

// ---------------------------------------------------------------------------
// Оценяване
// ---------------------------------------------------------------------------

export function parseNumberAnswer(raw: string): number | null {
  const m = raw.replace(/\s+/g, '').replace(',', '.').match(/-?\d+(?:\.\d+)?/);
  return m ? Number(m[0]) : null;
}

export function normalizeTextAnswer(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[„“"'«»]/g, '')
    .replace(/[.!?]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isShortAnswerCorrect(q: ShortAnswerQuestion, answer: string): boolean {
  if (!answer.trim()) return false;
  if (q.answerType === 'number') {
    const value = parseNumberAnswer(answer);
    return value !== null && q.acceptedAnswers.some((a) => parseNumberAnswer(a) === value);
  }
  const normalized = normalizeTextAnswer(answer);
  return q.acceptedAnswers.some((a) => normalizeTextAnswer(a) === normalized);
}

export type PaperAnswers = Record<string, number | string | undefined>;

export interface QuestionResult {
  id: string;
  points: number;
  maxPoints: number;
  /** null за задачи със свободен отговор (самооценка) */
  correct: boolean | null;
}

export interface PaperResult {
  totalPoints: number;
  maxPoints: number;
  autoPoints: number;
  selfAssessedPoints: number;
  sections: { id: string; title: string; points: number; maxPoints: number }[];
  questions: QuestionResult[];
  grade: GradeResult | null;
}

export function scorePaper(paper: ExamPaper, answers: PaperAnswers, openScores: Record<string, number | undefined>): PaperResult {
  const questions: QuestionResult[] = [];
  let autoPoints = 0;
  let selfAssessedPoints = 0;

  const sections = paper.sections.map((section) => {
    let sectionPoints = 0;
    let sectionMax = 0;
    for (const q of section.questions) {
      sectionMax += q.points;
      let points = 0;
      let correct: boolean | null = null;
      if (q.kind === 'choice') {
        correct = answers[q.id] === q.correctIndex;
        points = correct ? q.points : 0;
        autoPoints += points;
      } else if (q.kind === 'short') {
        const value = answers[q.id];
        correct = typeof value === 'string' && isShortAnswerCorrect(q, value);
        points = correct ? q.points : 0;
        autoPoints += points;
      } else {
        const raw = openScores[q.id];
        points = typeof raw === 'number' && Number.isFinite(raw) ? Math.min(q.points, Math.max(0, Math.round(raw))) : 0;
        selfAssessedPoints += points;
      }
      sectionPoints += points;
      questions.push({ id: q.id, points, maxPoints: q.points, correct });
    }
    return { id: section.id, title: section.title, points: sectionPoints, maxPoints: sectionMax };
  });

  const totalPoints = autoPoints + selfAssessedPoints;
  return {
    totalPoints,
    maxPoints: paper.maxPoints,
    autoPoints,
    selfAssessedPoints,
    sections,
    questions,
    grade: paper.gradeScale ? pointsToGrade(totalPoints, paper.gradeScale) : null
  };
}
