import type { ExamPaper, PaperQuestion, PaperResult } from '../lib/examPaperScoring';

/**
 * Теми за анализ на резултата и тренировка по тема — за НВО 10 групирани по учебното съдържание
 * в модела на МОН за НВО в X клас (т. 2.1), плюс четирите интегрирани предмета; за ДЗИ по
 * математика — по големите дялове от учебната програма за XI–XII клас.
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
  | 'geo'
  | 'dzi-algebra'
  | 'dzi-sequences'
  | 'dzi-limits'
  | 'dzi-functions'
  | 'dzi-trig'
  | 'dzi-analytic'
  | 'dzi-plane'
  | 'dzi-solid'
  | 'dzi-probability';

export interface TopicInfo {
  key: TopicKey;
  label: string;
  /** Какво включва — по учебното съдържание в модела на МОН */
  scope: string;
  /** 'math' — НВО 10, математика; 'other' — интегрираните предмети в НВО 10; 'dzi' — ДЗИ по математика */
  area: 'math' | 'other' | 'dzi';
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
  { key: 'dzi-algebra', label: 'Изрази, уравнения и неравенства', scope: 'Степени, корени и логаритми; полиноми и бином на Нютон; уравнения и неравенства', area: 'dzi' },
  { key: 'dzi-sequences', label: 'Редици и прогресии', scope: 'Числови редици; аритметична и геометрична прогресия; безкрайно намаляваща прогресия', area: 'dzi' },
  { key: 'dzi-limits', label: 'Граници и непрекъснатост', scope: 'Граници на функции; непрекъснатост в точка', area: 'dzi' },
  { key: 'dzi-functions', label: 'Функции и производни', scope: 'Свойства и асимптоти; производни; монотонност и екстремуми; допирателна; скорост и ускорение', area: 'dzi' },
  { key: 'dzi-trig', label: 'Тригонометрия', scope: 'Тригонометрични функции и тъждества; период', area: 'dzi' },
  { key: 'dzi-analytic', label: 'Вектори и аналитична геометрия', scope: 'Вектори и скаларно произведение; уравнения на права и окръжност; разстояния', area: 'dzi' },
  { key: 'dzi-plane', label: 'Планиметрия', scope: 'Триъгълник, четириъгълници, окръжност; метрични зависимости', area: 'dzi' },
  { key: 'dzi-solid', label: 'Стереометрия', scope: 'Многостени и ротационни тела; ъгли и разстояния в пространството', area: 'dzi' },
  { key: 'dzi-probability', label: 'Комбинаторика, вероятности и статистика', scope: 'Комбинаторни съединения; условна и пълна вероятност; случайни величини; статистика', area: 'dzi' },
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

/** Темата на всяка задача от официалните матури по математика (ДЗИ 2021–2026) */
export const DZI_TOPIC_BY_QUESTION: Readonly<Record<string, TopicKey>> = {
  // 2026
  'd26-q1': 'dzi-analytic', 'd26-q2': 'dzi-analytic', 'd26-q3': 'dzi-analytic', 'd26-q4': 'dzi-solid', 'd26-q5': 'dzi-algebra',
  'd26-q6': 'dzi-functions', 'd26-q7': 'dzi-limits', 'd26-q8': 'dzi-algebra', 'd26-q9': 'dzi-functions', 'd26-q10': 'dzi-functions',
  'd26-q11': 'dzi-probability', 'd26-q12': 'dzi-solid', 'd26-q13': 'dzi-functions', 'd26-q14': 'dzi-probability', 'd26-q15': 'dzi-probability',
  'd26-q16': 'dzi-analytic', 'd26-q17': 'dzi-functions', 'd26-q18': 'dzi-solid',
  // 2025
  'd25-q1': 'dzi-analytic', 'd25-q2': 'dzi-algebra', 'd25-q3': 'dzi-probability', 'd25-q4': 'dzi-probability', 'd25-q5': 'dzi-solid',
  'd25-q6': 'dzi-analytic', 'd25-q7': 'dzi-algebra', 'd25-q8': 'dzi-sequences', 'd25-q9': 'dzi-limits', 'd25-q10': 'dzi-functions',
  'd25-q11': 'dzi-functions', 'd25-q12': 'dzi-solid', 'd25-q13': 'dzi-solid', 'd25-q14': 'dzi-functions', 'd25-q15': 'dzi-probability',
  'd25-q16': 'dzi-analytic', 'd25-q17': 'dzi-algebra', 'd25-q18': 'dzi-functions',
  // 2024
  'd24-q1': 'dzi-analytic', 'd24-q2': 'dzi-functions', 'd24-q3': 'dzi-algebra', 'd24-q4': 'dzi-probability', 'd24-q5': 'dzi-functions',
  'd24-q6': 'dzi-analytic', 'd24-q7': 'dzi-sequences', 'd24-q8': 'dzi-functions', 'd24-q9': 'dzi-solid', 'd24-q10': 'dzi-analytic',
  'd24-q11': 'dzi-limits', 'd24-q12': 'dzi-limits', 'd24-q13': 'dzi-functions', 'd24-q14': 'dzi-solid', 'd24-q15': 'dzi-probability',
  'd24-q16': 'dzi-algebra', 'd24-q17': 'dzi-functions', 'd24-q18': 'dzi-solid',
  // 2023
  'd23-q1': 'dzi-analytic', 'd23-q2': 'dzi-algebra', 'd23-q3': 'dzi-solid', 'd23-q4': 'dzi-functions', 'd23-q5': 'dzi-probability',
  'd23-q6': 'dzi-analytic', 'd23-q7': 'dzi-analytic', 'd23-q8': 'dzi-solid', 'd23-q9': 'dzi-functions', 'd23-q10': 'dzi-limits',
  'd23-q11': 'dzi-sequences', 'd23-q12': 'dzi-functions', 'd23-q13': 'dzi-functions', 'd23-q14': 'dzi-functions', 'd23-q15': 'dzi-probability',
  'd23-q16': 'dzi-solid', 'd23-q17': 'dzi-algebra', 'd23-q18': 'dzi-analytic',
  // 2022
  'd22-q1': 'dzi-solid', 'd22-q2': 'dzi-analytic', 'd22-q3': 'dzi-analytic', 'd22-q4': 'dzi-probability', 'd22-q5': 'dzi-algebra',
  'd22-q6': 'dzi-trig', 'd22-q7': 'dzi-analytic', 'd22-q8': 'dzi-limits', 'd22-q9': 'dzi-sequences', 'd22-q10': 'dzi-functions',
  'd22-q11': 'dzi-functions', 'd22-q12': 'dzi-functions', 'd22-q13': 'dzi-functions', 'd22-q14': 'dzi-functions', 'd22-q15': 'dzi-probability',
  'd22-q16': 'dzi-solid', 'd22-q17': 'dzi-algebra', 'd22-q18': 'dzi-solid',
  // 2021
  'd21-q1': 'dzi-algebra', 'd21-q2': 'dzi-algebra', 'd21-q3': 'dzi-algebra', 'd21-q4': 'dzi-algebra', 'd21-q5': 'dzi-algebra',
  'd21-q6': 'dzi-algebra', 'd21-q7': 'dzi-algebra', 'd21-q8': 'dzi-trig', 'd21-q9': 'dzi-plane', 'd21-q10': 'dzi-plane',
  'd21-q11': 'dzi-functions', 'd21-q12': 'dzi-sequences', 'd21-q13': 'dzi-sequences', 'd21-q14': 'dzi-trig', 'd21-q15': 'dzi-probability',
  'd21-q16': 'dzi-probability', 'd21-q17': 'dzi-plane', 'd21-q18': 'dzi-plane', 'd21-q19': 'dzi-plane', 'd21-q20': 'dzi-plane',
  'd21-q21': 'dzi-algebra', 'd21-q22': 'dzi-algebra', 'd21-q23': 'dzi-sequences', 'd21-q24': 'dzi-probability', 'd21-q25': 'dzi-plane',
  'd21-q26': 'dzi-algebra', 'd21-q27': 'dzi-trig', 'd21-q28': 'dzi-plane',
};

export function topicOf(q: PaperQuestion): TopicKey | null {
  if (q.topic && SUBJECT_TOPIC[q.topic]) return SUBJECT_TOPIC[q.topic];
  return MATH_TOPIC_BY_QUESTION[q.id] ?? DZI_TOPIC_BY_QUESTION[q.id] ?? null;
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
