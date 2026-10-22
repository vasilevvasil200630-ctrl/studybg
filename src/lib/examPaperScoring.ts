import { pointsToGrade, type GradeResult, type GradeScale } from './monGradeScale';

// ---------------------------------------------------------------------------
// Модел на пълен изпитен вариант (тренировъчен или официален)
// ---------------------------------------------------------------------------

/**
 * Текстовете (условия, отговори, обяснения) могат да съдържат математика между $…$ (KaTeX).
 * Онагледяването към задачата — чертеж, таблица — е в `stimulus` и се показва над отговорите.
 */
export type Stimulus =
  /** Чертеж или диаграма, нарисувани като SVG компонент (components/exam-engine/figures) */
  | { kind: 'figure'; figureId: string; alt: string }
  /** Таблица с данни; `groups` е горен ред с обединени клетки */
  | {
      kind: 'table';
      caption?: string;
      groups?: { label: string; span: number }[];
      head: string[];
      rows: string[][];
      source?: string;
    };

interface QuestionBase {
  id: string;
  number: number;
  prompt: string;
  points: number;
  /** Предмет при интегрираните изпити (напр. „Биология и здравно образование“) */
  topic?: string;
  stimulus?: Stimulus[];
}

export interface ChoiceQuestion extends QuestionBase {
  kind: 'choice';
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ShortAnswerQuestion extends QuestionBase {
  kind: 'short';
  /** 'number' сравнява числено („12 000“ = „12000“); 'text' — без значение на главни букви и кавички */
  answerType: 'number' | 'text';
  acceptedAnswers: string[];
  explanation: string;
}

export interface OpenTaskCriterion {
  label: string;
  points: number;
}

/** Задача със свободен отговор: оценява се от ученика по критериите и еталона. */
export interface OpenQuestion extends QuestionBase {
  kind: 'open';
  criteria: OpenTaskCriterion[];
  modelAnswer: string;
}

/** Отговорът на една подточка от задача с няколко части */
export type PartAnswer =
  /** Число; мерната единица (unit) се показва до полето и в ключа, но не се проверява */
  | { type: 'number'; acceptedAnswers: string[]; unit?: string }
  | { type: 'text'; acceptedAnswers: string[] }
  | { type: 'truefalse'; correct: boolean }
  /**
   * Избор от списък — точките се дават само за точно съвпадение.
   * single: точно един верен отговор (показва се с радио бутони).
   */
  | { type: 'pick'; options: string[]; correctIndices: number[]; single?: boolean }
  /** Израз, система или запис, който не се проверява автоматично — ученикът сравнява с еталона */
  | { type: 'self'; modelAnswer: string };

export interface QuestionPart {
  id: string;
  /** „А)“, „Б)“, „1.“ … */
  label: string;
  prompt: string;
  points: number;
  answer: PartAnswer;
}

/** Задача с подточки (А, Б, В …) — всяка се оценява поотделно, точките се събират */
export interface MultiPartQuestion extends QuestionBase {
  kind: 'multi';
  parts: QuestionPart[];
  explanation: string;
}

export type PaperQuestion = ChoiceQuestion | ShortAnswerQuestion | OpenQuestion | MultiPartQuestion;

/** Ключът, под който се пази отговорът на подточка */
export const partKey = (q: { id: string }, part: { id: string }): string => `${q.id}.${part.id}`;

/** Точките могат да са и половинки (напр. 1,5 т. в ключа на МОН) */
export const isHalfStep = (p: number): boolean => p > 0 && Number.isInteger(p * 2);

const clampHalf = (raw: unknown, max: number): number =>
  typeof raw === 'number' && Number.isFinite(raw) ? Math.min(max, Math.max(0, Math.round(raw * 2) / 2)) : 0;

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
  /**
   * 'practice' = тренировъчен вариант на StudyBG; 'official' = преписан официален вариант на МОН;
   * 'sample' = примерни задачи, публикувани от МОН (без ключ — отговорите са изчислени от StudyBG)
   */
  kind: 'practice' | 'official' | 'sample';
  /** Задължителен за kind === 'official' и 'sample' (https връзка към PDF на МОН) */
  officialSourceUrl?: string;
  year?: number;
  durationMinutes: number;
  /** Тренировка без таймер (напр. примерните задачи, за които МОН не дава време) */
  untimed?: boolean;
  maxPoints: number;
  /** null = резултатът е само в точки (напр. НВО 10, където няма официално превръщане в оценка) */
  gradeScale: GradeScale | null;
  /** Кратка бележка под заглавието — напр. кое е официално (условия, ключ) и кое е добавено от StudyBG */
  note?: string;
  /** Лист с формули, който се отваря от лентата на изпита (както на истинския изпит) */
  formulaSheet?: 'nvo10-math';
  sections: PaperSection[];
}

export const PRACTICE_PAPER_LABEL = 'Тренировъчен вариант на StudyBG с ключ за самопроверка';

// ---------------------------------------------------------------------------
// Валидиране на вариантите (ползва се от тестовете и при добавяне на официални варианти)
// ---------------------------------------------------------------------------

export function validateExamPaper(paper: ExamPaper): string[] {
  const errors: string[] = [];
  const where = (q: PaperQuestion) => `${paper.id} / зад. ${q.number} (${q.id})`;

  if (paper.kind === 'official' || paper.kind === 'sample') {
    if (!paper.officialSourceUrl?.startsWith('https://')) {
      errors.push(`${paper.id}: официален вариант или примерни задачи без https officialSourceUrl`);
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
    if (!isHalfStep(q.points)) errors.push(`${where(q)}: точките трябва да са положително число, кратно на 0,5`);
    if (!q.prompt.trim()) errors.push(`${where(q)}: празно условие`);
    q.stimulus?.forEach((s, si) => {
      if (s.kind === 'figure' && (!s.figureId.trim() || !s.alt.trim())) errors.push(`${where(q)}: чертеж ${si + 1} без id или описание (alt)`);
      if (s.kind === 'table' && s.rows.some((r) => r.length !== s.head.length)) errors.push(`${where(q)}: таблица ${si + 1} с редове с различен брой клетки`);
    });

    if (q.kind === 'multi') {
      if (q.parts.length === 0) errors.push(`${where(q)}: задача с подточки без подточки`);
      const partIds = new Set<string>();
      let partsTotal = 0;
      q.parts.forEach((p) => {
        const at = `${where(q)} ${p.label}`;
        if (partIds.has(p.id)) errors.push(`${at}: дублирано id на подточка`);
        partIds.add(p.id);
        partsTotal += p.points;
        if (!isHalfStep(p.points)) errors.push(`${at}: точките трябва да са кратни на 0,5`);
        const a = p.answer;
        if ((a.type === 'number' || a.type === 'text') && a.acceptedAnswers.length === 0) errors.push(`${at}: няма верни отговори`);
        if (a.type === 'number' && a.acceptedAnswers.some((x) => parseNumberAnswer(x) === null)) errors.push(`${at}: числов ключ, който не е число`);
        if (a.type === 'pick') {
          if (a.correctIndices.length === 0) errors.push(`${at}: няма верни избори`);
          if (a.single && a.correctIndices.length !== 1) errors.push(`${at}: избор с един отговор трябва да има точно един верен`);
          if (a.correctIndices.some((i) => !Number.isInteger(i) || i < 0 || i >= a.options.length)) errors.push(`${at}: невалиден индекс във верните избори`);
        }
        if (a.type === 'self' && !a.modelAnswer.trim()) errors.push(`${at}: липсва еталон`);
      });
      if (Math.abs(partsTotal - q.points) > 1e-9) errors.push(`${where(q)}: подточките дават ${partsTotal} т., а задачата е за ${q.points}`);
      if (!q.explanation.trim()) errors.push(`${where(q)}: липсва обяснение към ключа`);
    } else if (q.kind === 'choice') {
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

function matchesAccepted(answerType: 'number' | 'text', acceptedAnswers: string[], answer: string): boolean {
  if (!answer.trim()) return false;
  if (answerType === 'number') {
    const readings = numberReadings(answer);
    if (readings.length > 0 && acceptedAnswers.some((a) => readings.includes(parseNumberAnswer(a) ?? NaN))) {
      return true;
    }
  }
  const normalized = normalizeTextAnswer(answer);
  return acceptedAnswers.some((a) => normalizeTextAnswer(a) === normalized);
}

export function isShortAnswerCorrect(q: ShortAnswerQuestion, answer: string): boolean {
  return matchesAccepted(q.answerType, q.acceptedAnswers, answer);
}

export type PartValue = number | string | boolean | number[] | undefined;
export type PaperAnswers = Record<string, PartValue>;

/** Дали отговорът на подточка е верен (за 'self' — винаги false; там решава самооценката) */
export function isPartCorrect(part: QuestionPart, value: PartValue): boolean {
  const a = part.answer;
  switch (a.type) {
    case 'number':
    case 'text':
      return typeof value === 'string' && matchesAccepted(a.type, a.acceptedAnswers, value);
    case 'truefalse':
      return value === a.correct;
    case 'pick': {
      if (!Array.isArray(value)) return false;
      const picked = new Set(value);
      return picked.size === a.correctIndices.length && a.correctIndices.every((i) => picked.has(i));
    }
    case 'self':
      return false;
  }
}

export interface QuestionResult {
  id: string;
  points: number;
  maxPoints: number;
  /** true = пълни точки, false = 0 т.; null = самооценка без въведени точки или частично решена задача */
  correct: boolean | null;
  /** Частично вярна задача с подточки */
  partial?: boolean;
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
      } else if (q.kind === 'multi') {
        let selfPending = false;
        for (const part of q.parts) {
          const key = partKey(q, part);
          if (part.answer.type === 'self') {
            if (typeof openScores[key] !== 'number') selfPending = true;
            const got = clampHalf(openScores[key], part.points);
            points += got;
            selfAssessedPoints += got;
          } else if (isPartCorrect(part, answers[key])) {
            points += part.points;
            autoPoints += part.points;
          }
        }
        correct = points === q.points ? true : points === 0 && !selfPending ? false : null;
      } else {
        points = clampHalf(openScores[q.id], q.points);
        selfAssessedPoints += points;
      }
      sectionPoints += points;
      const partial = q.kind === 'multi' && points > 0 && points < q.points;
      questions.push({ id: q.id, points, maxPoints: q.points, correct, ...(partial ? { partial } : {}) });
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
