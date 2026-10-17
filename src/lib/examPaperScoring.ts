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

const BG_NUMBER_WORDS: Readonly<Record<string, number>> = {
  нула: 0, един: 1, една: 1, едно: 1, два: 2, две: 2, три: 3, четири: 4, пет: 5, шест: 6, седем: 7, осем: 8, девет: 9,
  десет: 10, единадесет: 11, единайсет: 11, дванадесет: 12, дванайсет: 12, тринадесет: 13, тринайсет: 13,
  четиринадесет: 14, четиринайсет: 14, петнадесет: 15, петнайсет: 15, шестнадесет: 16, шестнайсет: 16,
  седемнадесет: 17, седемнайсет: 17, осемнадесет: 18, осемнайсет: 18, деветнадесет: 19, деветнайсет: 19,
  двадесет: 20, двайсет: 20, тридесет: 30, трийсет: 30, четиридесет: 40, четирийсет: 40, петдесет: 50,
  шестдесет: 60, седемдесет: 70, осемдесет: 80, деветдесет: 90, сто: 100
};

// Само цели думи: „десет“ в „двадесет“ не бива да стане 10 (\b не работи с кирилица)
const NUMBER_WORD_RE = new RegExp(
  `(?<!\\p{L})(${Object.keys(BG_NUMBER_WORDS).sort((a, b) => b.length - a.length).join('|')})(?:те)?(?!\\p{L})`,
  'giu'
);

const replaceNumberWords = (text: string): string =>
  text
    .replace(NUMBER_WORD_RE, (_, word: string) => String(BG_NUMBER_WORDS[word.toLowerCase()]))
    // „двадесет и пет“ → 25
    .replace(/(?<!\d)([2-9]0)\s+и\s+([1-9])(?!\d)/g, (_, tens: string, units: string) => String(Number(tens) + Number(units)));

/**
 * Възможните числени прочити на отговора. Празен масив, ако няма число или ако числата
 * са няколко („12 или 15“, „3-4“) — колебанието между отговори не се зачита.
 * „1,500“ е двусмислено: в България запетаята е десетичен знак (1.5), но може да е
 * и разделител за хиляди (1500), затова се връщат и двата прочита.
 */
function numberReadings(raw: string): number[] {
  let text = raw.includes('=') ? raw.slice(raw.lastIndexOf('=') + 1) : raw;
  text = replaceNumberWords(text).replace(/[−–]/g, '-');
  const hasThousandsWord = /(?:хиляди|хиляда|хил\.?)/i.test(text);
  text = text.replace(/(\d)[\s ]+(?=\d{3}(?!\d))/g, '$1'); // „12 000“ → „12000“

  // Цифри веднага след буква са част от означение (cm2, x1, H2O), не са отговор
  const tokens = [...text.matchAll(/-?\d+(?:[.,]\d+)?/g)]
    .filter((m) => !/\p{L}/u.test(text.charAt((m.index ?? 0) - 1)))
    .map((m) => m[0]);
  if (tokens.length !== 1) return [];

  const token = tokens[0];
  const scale = (n: number) => (hasThousandsWord && Math.abs(n) < 1000 ? n * 1000 : n);
  const readings = [scale(Number(token.replace(',', '.')))];
  if (/^-?\d{1,3},\d{3}$/.test(token)) readings.push(scale(Number(token.replace(',', ''))));
  return readings;
}

export function parseNumberAnswer(raw: string): number | null {
  const readings = numberReadings(raw);
  return readings.length > 0 ? readings[0] : null;
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
    const readings = numberReadings(answer);
    if (readings.length > 0 && q.acceptedAnswers.some((a) => readings.includes(parseNumberAnswer(a) ?? NaN))) {
      return true;
    }
    const normalized = normalizeTextAnswer(answer);
    return q.acceptedAnswers.some((a) => normalizeTextAnswer(a) === normalized);
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
