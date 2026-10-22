import type { TopicKey, TopicScore } from '../data/examTopics';

/**
 * Резултатите по теми — пазят се в браузъра (localStorage), последният опит за всеки вариант.
 * Обобщението по тема сумира тези последни опити, затова повторното решаване на един вариант
 * заменя предишния му резултат, вместо да го брои два пъти.
 */

const KEY = 'sbg:topic-progress:v1';

interface StoredAttempt {
  at: number;
  topics: { key: TopicKey; points: number; maxPoints: number }[];
}

type Store = Record<string, StoredAttempt>;

function read(): Store {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    return parsed && typeof parsed === 'object' ? (parsed as Store) : {};
  } catch {
    return {};
  }
}

function write(store: Store): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // частен режим или пълно хранилище — анализът просто не се пази
  }
}

export function saveTopicAttempt(paperId: string, topics: TopicScore[], now = Date.now()): void {
  if (topics.length === 0) return;
  const store = read();
  store[paperId] = { at: now, topics: topics.map(({ key, points, maxPoints }) => ({ key, points, maxPoints })) };
  write(store);
}

export interface TopicStat {
  points: number;
  maxPoints: number;
  /** Брой варианти/набори с поне една задача по темата */
  papers: number;
  lastAt: number;
}

export function loadTopicStats(): Partial<Record<TopicKey, TopicStat>> {
  const out: Partial<Record<TopicKey, TopicStat>> = {};
  for (const attempt of Object.values(read())) {
    if (!attempt || !Array.isArray(attempt.topics)) continue;
    for (const t of attempt.topics) {
      if (typeof t?.points !== 'number' || typeof t?.maxPoints !== 'number' || t.maxPoints <= 0) continue;
      const cur = out[t.key] ?? { points: 0, maxPoints: 0, papers: 0, lastAt: 0 };
      cur.points += t.points;
      cur.maxPoints += t.maxPoints;
      cur.papers += 1;
      cur.lastAt = Math.max(cur.lastAt, attempt.at ?? 0);
      out[t.key] = cur;
    }
  }
  return out;
}

export function clearTopicProgress(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // нищо за изчистване
  }
}
