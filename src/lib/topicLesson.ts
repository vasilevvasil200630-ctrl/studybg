import type { MonProgram, MonSubjectId, MonTopicDetails, TopicInProgram } from '../data/monCurriculum';
import { MON_SUBJECTS } from '../data/monCurriculum/subjects';

// Урок по тема, съставен от AI, когато в сайта няма написан урок по нея.
// Флашкартите следват видовете от генератора в Матура Плюс; урокът се пази в браузъра.

export interface TopicLesson {
  overview: string;
  keyPoints: string[];
  examples: { problem: string; solution: string }[];
  commonTraps: string[];
  formulas: { label: string; value: string }[];
  flashcards: { category: string; front: string; back: string }[];
}

const CARD_TYPES: Partial<Record<MonSubjectId, string>> = {
  math: '"definition" (дефиниция), "theorem" (теорема), "formula" (формула), "property" (свойство), "procedure" (стъпки на решение)',
  physics: '"definition", "law" (закон), "formula", "unit" (мерна единица), "phenomenon" (явление)',
  chemistry: '"definition", "formula", "reaction" (реакция), "property"',
  lit: '"author-work" (автор ↔ творба), "work-genre" (творба ↔ жанр), "work-theme" (творба ↔ тема/мотив), "character" (герой), "device" (художествено средство)',
  bel: '"rule" (правило), "example" (пример за правилото), "definition", "mistake" (типична грешка)',
  history: '"date" (дата ↔ събитие), "person" (личност ↔ дело), "term" (понятие), "cause" (причина ↔ следствие)',
  geography: '"term", "place" (обект ↔ местоположение), "process" (процес), "fact"',
  biology: '"term", "structure" (устройство ↔ функция), "process", "fact"',
};

function gradeLabel(program: MonProgram): string {
  if (typeof program.stage === 'number') return `${program.stage}. клас`;
  if (program.stage === 'pp') return '11.–12. клас, профилирана подготовка';
  return program.title;
}

export function buildLessonPrompt(program: MonProgram, topic: TopicInProgram, details: MonTopicDetails): string {
  const subject = MON_SUBJECTS[program.subject].name;
  const where = [topic.module, topic.section].filter(Boolean).join(' → ');
  const lines = [
    `Пишеш кратък урок за ученик (${gradeLabel(program)}) по „${subject}“ по учебната програма на МОН.`,
    `Тема: „${topic.title}“${where ? ` (${where})` : ''}.`,
  ];
  if (details.outcomes.length) lines.push('', 'Очаквани резултати по програмата — урокът трябва да ги покрие:', ...details.outcomes.slice(0, 14).map((o) => `- ${o}`));
  if (details.concepts.length) lines.push('', `Нови понятия: ${details.concepts.slice(0, 30).join(', ')}.`);
  lines.push(
    '',
    'Съдържание:',
    '- "overview": 2–4 изречения — за какво е темата и защо е важна.',
    '- "keyPoints": 4–7 ключови точки — дефиниции, правила, свойства, с кратък пример в скоби, където помага.',
    '- "examples": 2 решени примера (задача и решение стъпка по стъпка). При теория — въпрос и пълен отговор.',
    '- "commonTraps": 2–3 типични грешки на ученици и как да се избегнат.',
    '- "formulas": формулите или датите по темата (етикет и стойност); празен масив, ако няма.',
    `- "flashcards": 6–8 карти. "category" е един от видовете: ${CARD_TYPES[program.subject] ?? '"term" (понятие), "fact" (факт), "rule" (правило)'}. "front" е въпрос (до 100 знака), "back" — точен и кратък отговор (до 220 знака), без встъпления.`,
    '',
    'Правила:',
    '- Само съдържание от темата и класа. Не измисляй факти, дати и цитати — ако не си сигурен, пропусни.',
    '- Формулите пиши в LaTeX между $...$. Кавички „…“ и тирета — българска типография.',
    '- Пиши ясно, на ниво ученик; без обръщения и излишни встъпления.',
  );
  return lines.join('\n');
}

const text = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const texts = (v: unknown, max: number) => (Array.isArray(v) ? v.map(text).filter(Boolean).slice(0, max) : []);

/** Проверява отговора на AI; при липсващи основни части връща null */
export function validateLesson(raw: Record<string, unknown>): TopicLesson | null {
  const overview = text(raw.overview);
  const keyPoints = texts(raw.keyPoints, 8);
  const examples = (Array.isArray(raw.examples) ? raw.examples : [])
    .map((e) => ({ problem: text((e as Record<string, unknown>)?.problem), solution: text((e as Record<string, unknown>)?.solution) }))
    .filter((e) => e.problem && e.solution)
    .slice(0, 3);
  const formulas = (Array.isArray(raw.formulas) ? raw.formulas : [])
    .map((f) => ({ label: text((f as Record<string, unknown>)?.label), value: text((f as Record<string, unknown>)?.value) }))
    .filter((f) => f.label && f.value)
    .slice(0, 8);
  const flashcards = (Array.isArray(raw.flashcards) ? raw.flashcards : [])
    .map((c) => {
      const r = (c ?? {}) as Record<string, unknown>;
      return { category: text(r.category) || 'term', front: text(r.front), back: text(r.back) };
    })
    .filter((c) => c.front.length >= 3 && c.back.length >= 1)
    .slice(0, 10);
  if (overview.length < 20 || keyPoints.length < 3 || flashcards.length < 3) return null;
  return { overview, keyPoints, examples, commonTraps: texts(raw.commonTraps, 4), formulas, flashcards };
}

// Кеш в браузъра: урокът по тема се генерира веднъж; „Нов вариант“ го сменя
const LESSON_KEY = 'studybg.topicLesson.v1';
const MAX_CACHED = 60;

interface CachedLesson {
  lesson: TopicLesson;
  createdAt: string;
}

function readCache(): Record<string, CachedLesson> {
  try {
    const raw = JSON.parse(localStorage.getItem(LESSON_KEY) ?? '{}');
    return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  } catch {
    return {};
  }
}

export function cachedLesson(topicId: string): TopicLesson | null {
  const hit = readCache()[topicId];
  return hit?.lesson ? validateLesson(hit.lesson as unknown as Record<string, unknown>) : null;
}

export function cacheLesson(topicId: string, lesson: TopicLesson, now = new Date()): void {
  const all = readCache();
  all[topicId] = { lesson, createdAt: now.toISOString() };
  // Най-старите излизат първи, за да не се препълни хранилището
  const ids = Object.keys(all).sort((a, b) => (all[a].createdAt < all[b].createdAt ? -1 : 1));
  for (const id of ids.slice(0, Math.max(0, ids.length - MAX_CACHED))) delete all[id];
  try {
    localStorage.setItem(LESSON_KEY, JSON.stringify(all));
  } catch {
    // пълно хранилище — урокът остава само в екрана
  }
}
