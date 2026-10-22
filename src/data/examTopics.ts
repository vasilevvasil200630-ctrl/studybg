import type { ExamPaper, PaperQuestion, PaperResult } from '../lib/examPaperScoring';

/**
 * Теми за анализ на резултата и тренировка по тема — групирани по учебното съдържание
 * в модела на МОН за НВО в X клас (т. 2.1), плюс четирите интегрирани предмета.
 * Разпределението на задачите е на StudyBG; при задачи с подточки по няколко теми
 * задачата е към темата, по която е по-голямата част от точките.
 */

export type TopicKey =
  | 'numbers'
  | 'equations'
  | 'functions'
  | 'sequences'
  | 'combinatorics'
  | 'trig'
  | 'plane'
  | 'solid'
  | 'bio'
  | 'chem'
  | 'phys'
  | 'geo';

export interface TopicInfo {
  key: TopicKey;
  label: string;
  /** Какво включва — по учебното съдържание в модела на МОН */
  scope: string;
  area: 'math' | 'other';
}

export const TOPICS: TopicInfo[] = [
  { key: 'numbers', label: 'Числа и изрази', scope: 'Реални числа; рационални и ирационални изрази с квадратни корени', area: 'math' },
  { key: 'equations', label: 'Уравнения и неравенства', scope: 'Квадратни, дробни и ирационални уравнения; формули на Виет; системи; рационални неравенства', area: 'math' },
  { key: 'functions', label: 'Функции и графики', scope: 'Линейна и квадратна функция — свойства и графики', area: 'math' },
  { key: 'sequences', label: 'Прогресии', scope: 'Аритметична и геометрична прогресия; сложна лихва', area: 'math' },
  { key: 'combinatorics', label: 'Комбинаторика и статистика', scope: 'Комбинаторни съединения; класическа вероятност; мода, медиана, средно аритметично', area: 'math' },
  { key: 'trig', label: 'Тригонометрия', scope: 'Тригонометрични функции в [0°; 180°]; стойности за 30°, 45°, 60°', area: 'math' },
  { key: 'plane', label: 'Планиметрия', scope: 'Триъгълник, четириъгълници, окръжност; подобност; синусова и косинусова теорема', area: 'math' },
  { key: 'solid', label: 'Стереометрия', scope: 'Призма, пирамида, цилиндър, конус, сфера и кълбо', area: 'math' },
  { key: 'bio', label: 'Биология и здравно образование', scope: 'Интегрирана част на НВО 10', area: 'other' },
  { key: 'chem', label: 'Химия и опазване на околната среда', scope: 'Интегрирана част на НВО 10', area: 'other' },
  { key: 'phys', label: 'Физика и астрономия', scope: 'Интегрирана част на НВО 10', area: 'other' },
  { key: 'geo', label: 'География и икономика', scope: 'Интегрирана част на НВО 10', area: 'other' },
];

export const TOPIC_BY_KEY = Object.fromEntries(TOPICS.map((t) => [t.key, t])) as Record<TopicKey, TopicInfo>;

const SUBJECT_TOPIC: Record<string, TopicKey> = {
  'Биология и здравно образование': 'bio',
  'Химия и опазване на околната среда': 'chem',
  'Физика и астрономия': 'phys',
  'География и икономика': 'geo',
};

/** Темата на всяка задача по математика от официалните варианти на НВО 10 (2021–2026) */
export const MATH_TOPIC_BY_QUESTION: Readonly<Record<string, TopicKey>> = {
  // 2026
  'm26-q1': 'numbers', 'm26-q2': 'numbers', 'm26-q3': 'equations', 'm26-q4': 'combinatorics', 'm26-q5': 'combinatorics',
  'm26-q6': 'sequences', 'm26-q7': 'functions', 'm26-q8': 'trig', 'm26-q9': 'plane', 'm26-q10': 'solid',
  'm26-q17': 'equations', 'm26-q18': 'plane',
  // 2025
  'm25-q1': 'numbers', 'm25-q2': 'equations', 'm25-q3': 'equations', 'm25-q4': 'equations', 'm25-q5': 'functions',
  'm25-q6': 'sequences', 'm25-q7': 'functions', 'm25-q8': 'sequences', 'm25-q9': 'combinatorics', 'm25-q10': 'combinatorics',
  'm25-q11': 'trig', 'm25-q12': 'plane', 'm25-q13': 'plane', 'm25-q14': 'plane', 'm25-q15': 'solid',
  'm25-q16': 'equations', 'm25-q17': 'plane',
  // 2024
  'm24-q1': 'numbers', 'm24-q2': 'equations', 'm24-q3': 'combinatorics', 'm24-q4': 'equations', 'm24-q5': 'functions',
  'm24-q6': 'trig', 'm24-q7': 'equations', 'm24-q8': 'functions', 'm24-q9': 'combinatorics', 'm24-q10': 'sequences',
  'm24-q11': 'plane', 'm24-q12': 'plane', 'm24-q13': 'plane', 'm24-q14': 'plane', 'm24-q15': 'solid',
  'm24-q16': 'sequences', 'm24-q17': 'plane',
  // 2023
  'm23-q1': 'numbers', 'm23-q2': 'numbers', 'm23-q3': 'equations', 'm23-q4': 'equations', 'm23-q5': 'equations',
  'm23-q6': 'functions', 'm23-q7': 'trig', 'm23-q8': 'sequences', 'm23-q9': 'plane', 'm23-q10': 'plane',
  'm23-q11': 'plane', 'm23-q12': 'plane', 'm23-q13': 'combinatorics', 'm23-q14': 'combinatorics', 'm23-q15': 'solid',
  'm23-q16': 'equations', 'm23-q17': 'plane',
  // 2022
  'm22-q1': 'numbers', 'm22-q2': 'equations', 'm22-q3': 'equations', 'm22-q4': 'equations', 'm22-q5': 'functions',
  'm22-q6': 'equations', 'm22-q7': 'trig', 'm22-q8': 'combinatorics', 'm22-q9': 'plane', 'm22-q10': 'sequences',
  'm22-q11': 'plane', 'm22-q12': 'plane', 'm22-q13': 'plane', 'm22-q14': 'combinatorics', 'm22-q15': 'solid',
  'm22-q16': 'equations', 'm22-q17': 'plane',
  // 2021
  'm21-q1': 'numbers', 'm21-q2': 'numbers', 'm21-q3': 'equations', 'm21-q4': 'equations', 'm21-q5': 'equations',
  'm21-q6': 'functions', 'm21-q7': 'functions', 'm21-q8': 'sequences', 'm21-q9': 'trig', 'm21-q10': 'combinatorics',
  'm21-q11': 'combinatorics', 'm21-q12': 'plane', 'm21-q13': 'plane', 'm21-q14': 'trig', 'm21-q15': 'plane',
  'm21-q16': 'equations', 'm21-q17': 'plane',
};

export function topicOf(q: PaperQuestion): TopicKey | null {
  if (q.topic && SUBJECT_TOPIC[q.topic]) return SUBJECT_TOPIC[q.topic];
  return MATH_TOPIC_BY_QUESTION[q.id] ?? null;
}

export interface TopicScore {
  key: TopicKey;
  label: string;
  points: number;
  maxPoints: number;
  questions: number;
}

/** Точките по теми в един опит; задачите без тема не се броят */
export function topicBreakdown(paper: ExamPaper, result: PaperResult): TopicScore[] {
  const byId = new Map(result.questions.map((r) => [r.id, r]));
  const acc = new Map<TopicKey, TopicScore>();
  for (const q of paper.sections.flatMap((s) => s.questions)) {
    const key = topicOf(q);
    const r = byId.get(q.id);
    if (!key || !r) continue;
    const cur = acc.get(key) ?? { key, label: TOPIC_BY_KEY[key].label, points: 0, maxPoints: 0, questions: 0 };
    cur.points += r.points;
    cur.maxPoints += r.maxPoints;
    cur.questions += 1;
    acc.set(key, cur);
  }
  return TOPICS.map((t) => acc.get(t.key)).filter((x): x is TopicScore => !!x);
}

export const topicPercent = (t: { points: number; maxPoints: number }): number => (t.maxPoints > 0 ? Math.round((t.points / t.maxPoints) * 100) : 0);
