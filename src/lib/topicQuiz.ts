import type { MonProgram, MonSubjectId, MonTopicDetails, TopicInProgram } from '../data/monCurriculum';
import { MON_SUBJECTS } from '../data/monCurriculum/subjects';
import type { LessonData } from '../types';

// Тест по тема от учебната програма (по модела на /api/generate-quiz в Матура Плюс):
// 10 въпроса — 3 лесни, 4 средни, 3 трудни, строга проверка на всеки въпрос, без повторения между опитите.

export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface TopicQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: QuizDifficulty;
}

export type TopicQuizSource = 'ai' | 'lesson';

export interface TopicQuiz {
  topicId: string;
  source: TopicQuizSource;
  questions: TopicQuizQuestion[];
}

export const QUIZ_SIZE = 10;
const TARGET: Record<QuizDifficulty, number> = { easy: 3, medium: 4, hard: 3 };
/** Под толкова валидни въпроса отговорът на AI се смята за неуспешен */
export const MIN_VALID_QUESTIONS = 6;

const SUBJECT_RULES: Partial<Record<MonSubjectId, string>> = {
  math: 'Задачи с конкретни числа. Изчисли всеки отговор сам и го провери. Грешните отговори са резултати от типични грешки (пропуснат знак, грешна формула). Формулите пиши в LaTeX между $...$. В обяснението — стъпките на решението.',
  physics: 'Задачи с числа и мерни единици или въпроси за явления и закони. Изчисли и провери всеки отговор. Формулите пиши в LaTeX между $...$.',
  chemistry: 'Химичните формули и уравнения пиши в LaTeX между $...$, например $\\mathrm{H_2SO_4}$. Провери изравняването на всяко уравнение.',
  lit: 'Питай за сюжет, герои, теми, мотиви, жанр, художествени средства и идеи на творбата. Не измисляй цитати — цитирай само ако си напълно сигурен в точния текст, иначе перифразирай.',
  bel: 'Всеки въпрос проверява конкретно правило от темата с нов пример (изречение или дума). Грешните отговори са типични грешки на ученици. Следвай официалния правопис и пунктуация на БАН.',
  history: 'Използвай само дати, имена и факти, в които си напълно сигурен. Питай и за причини, последици и връзки между събитията.',
  geography: 'Използвай само данни, в които си сигурен; без точни статистики, които се менят по години.',
  english: 'Въпросите и отговорите са на английски език, обясненията — на български. Проверявай лексика, граматика и четене с разбиране на нивото на програмата.',
  german: 'Въпросите и отговорите са на немски език, обясненията — на български. Проверявай лексика, граматика и четене с разбиране на нивото на програмата.',
  informatika: 'Кодът пиши на един ред или с ясни отстъпи; ако питаш какво отпечатва програма, изпълни я наум внимателно и провери резултата.',
};

export interface QuizPromptInput {
  program: MonProgram;
  topic: TopicInProgram;
  details: MonTopicDetails;
  /** Въпроси от предишните тестове по темата — да не се повтарят */
  avoid: string[];
}

function gradeLabel(program: MonProgram): string {
  if (typeof program.stage === 'number') return `${program.stage}. клас`;
  if (program.stage === 'pp') return '11.–12. клас, профилирана подготовка';
  return program.title.replace(/^(Английски|Немски) език /, 'ниво ');
}

export function buildQuizPrompt({ program, topic, details, avoid }: QuizPromptInput): string {
  const subject = MON_SUBJECTS[program.subject].name;
  const where = [topic.module, topic.section].filter(Boolean).join(' → ');
  const outcomes = details.outcomes.slice(0, 14);
  const lines = [
    `Съставяш тренировъчен тест за ученик (${gradeLabel(program)}) по „${subject}“ по учебната програма на МОН.`,
    `Тема: „${topic.title}“${where ? ` (${where})` : ''}.`,
  ];
  if (outcomes.length) lines.push('', 'Очаквани резултати по програмата — въпросите проверяват точно тях:', ...outcomes.map((o) => `- ${o}`));
  if (details.concepts.length) lines.push('', `Нови понятия: ${details.concepts.slice(0, 30).join(', ')}.`);
  const rule = SUBJECT_RULES[program.subject];
  if (rule) lines.push('', rule);
  lines.push(
    '',
    'Изисквания:',
    `- ТОЧНО ${QUIZ_SIZE} въпроса с избираем отговор: 3 лесни ("easy"), 4 средни ("medium"), 3 трудни ("hard").`,
    '- 4 отговора; точно един верен; грешните са правдоподобни, с еднаква форма и дължина. Без „Всички изброени“ и „Нито един“.',
    '- Всеки въпрос е различен и проверява различен аспект на темата. Не излизай извън темата и класа.',
    '- "solution": ПЪРВО реши задачата кратко, стъпка по стъпка (при теория — 1–3 изречения защо отговорът е такъв). Ученикът го вижда като обяснение.',
    '- После състави 4-те отговора; верният съвпада точно с резултата от "solution". Провери всеки отговор срещу решението.',
    '- "correctIndex" е номерът (0–3) на верния отговор в "options".',
    '- Ако не си сигурен във факт, не питай за него.',
  );
  if (avoid.length) lines.push('', 'Не повтаряй тези въпроси от предишните тестове:', ...avoid.slice(-20).map((q) => `- ${q}`));
  return lines.join('\n');
}

const text = (v: unknown) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim() : '');
// Знаците остават: „x = 4“ и „x = −4“ са различни отговори
const normalizeKey = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

/** Само въпросите, които минават проверката: 4 различни отговора, верен индекс, обяснение, трудност */
export function validateQuestions(raw: unknown[], idPrefix: string): TopicQuizQuestion[] {
  const out: TopicQuizQuestion[] = [];
  const seen = new Set<string>();
  raw.forEach((item, i) => {
    if (!item || typeof item !== 'object') return;
    const r = item as Record<string, unknown>;
    const question = text(r.question);
    const options = Array.isArray(r.options) ? r.options.map(text) : [];
    const correctIndex = typeof r.correctIndex === 'number' ? r.correctIndex : Number(r.correctIndex);
    // Решението от AI е обяснението за ученика
    const explanation = text(r.solution) || text(r.explanation);
    const difficulty = r.difficulty;
    if (question.length < 8 || options.length !== 4 || options.some((o) => !o)) return;
    if (new Set(options.map(normalizeKey)).size !== 4) return;
    if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex > 3) return;
    if (explanation.length < 5) return;
    if (difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard') return;
    if (options.some((o) => /^(всички|нито един)( от)? (изброени|посочени)/i.test(o))) return;
    const key = normalizeKey(question);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ id: `${idPrefix}-${i}`, question, options, correctIndex, explanation, difficulty });
  });
  return out;
}

/** 3/4/3 по трудност; ако някоя трудност не стига — допълва с останалите */
export function pickBalanced(questions: TopicQuizQuestion[], avoid: string[] = []): TopicQuizQuestion[] {
  const old = new Set(avoid.map(normalizeKey));
  const fresh = questions.filter((q) => !old.has(normalizeKey(q.question)));
  const pool = fresh.length >= MIN_VALID_QUESTIONS ? fresh : questions;
  const picked = (['easy', 'medium', 'hard'] as const).flatMap((d) => pool.filter((q) => q.difficulty === d).slice(0, TARGET[d]));
  for (const q of pool) {
    if (picked.length >= QUIZ_SIZE) break;
    if (!picked.includes(q)) picked.push(q);
  }
  const order: Record<QuizDifficulty, number> = { easy: 0, medium: 1, hard: 2 };
  return picked.slice(0, QUIZ_SIZE).sort((a, b) => order[a.difficulty] - order[b.difficulty]);
}

/** Разбърква отговорите така, че верният да е на различни места в теста, а не все на едно */
export function shuffleOptions<T extends TopicQuizQuestion>(questions: T[], random: () => number = Math.random): T[] {
  const slots = questions.map((_, i) => i % 4);
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }
  return questions.map((q, qi) => {
    const wrong = q.options.filter((_, i) => i !== q.correctIndex);
    for (let i = wrong.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [wrong[i], wrong[j]] = [wrong[j], wrong[i]];
    }
    const target = slots[qi];
    const options = [...wrong.slice(0, target), q.options[q.correctIndex], ...wrong.slice(target)];
    return { ...q, options, correctIndex: target };
  });
}

/** Резервен тест от уроците в сайта по същата тема, когато AI не е достъпен */
export function lessonQuizFallback(topicId: string, lessons: LessonData[], random: () => number = Math.random): TopicQuiz | null {
  const questions: TopicQuizQuestion[] = lessons.flatMap((l) =>
    l.quiz
      .filter((q) => q.options.length === 4 && q.correctIndex >= 0 && q.correctIndex < 4)
      .map((q) => ({
        id: `lesson-${l.id}-${q.id}`,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        difficulty: 'medium' as const,
      })),
  );
  if (!questions.length) return null;
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return { topicId, source: 'lesson', questions: questions.slice(0, QUIZ_SIZE) };
}

// Въпросите от последните опити по тема — изпращат се на AI като „не повтаряй“
const SEEN_KEY = 'studybg.topicQuiz.seen.v1';
const SEEN_PER_TOPIC = 40;

function readSeen(): Record<string, string[]> {
  try {
    const raw = JSON.parse(localStorage.getItem(SEEN_KEY) ?? '{}');
    return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  } catch {
    return {};
  }
}

export function seenQuestions(topicId: string): string[] {
  const list = readSeen()[topicId];
  return Array.isArray(list) ? list.filter((x): x is string => typeof x === 'string') : [];
}

export function rememberQuestions(topicId: string, questions: string[]): void {
  const all = readSeen();
  all[topicId] = [...seenQuestions(topicId), ...questions].slice(-SEEN_PER_TOPIC);
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(all));
  } catch {
    // пълно хранилище — следващият тест просто няма списък за избягване
  }
}
