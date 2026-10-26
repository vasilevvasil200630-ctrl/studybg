// Какво знае ученикът по всяка тема от програмата: резултатите от входния тест и от тестовете по темата.
// Пази се в браузъра; от него се смятат слабите теми и личният план.

export type MasterySource = 'quiz' | 'diagnostic';

export interface MasteryAttempt {
  at: string;
  correct: number;
  total: number;
  source: MasterySource;
}

export interface TopicMasteryRecord {
  attempts: MasteryAttempt[];
}

export type MasteryLevel = 'unknown' | 'weak' | 'learning' | 'mastered';

export const MASTERY_KEY = 'studybg.topicMastery.v1';
const MAX_ATTEMPTS = 12;

export function loadTopicMastery(): Record<string, TopicMasteryRecord> {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(MASTERY_KEY) ?? '{}');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    const out: Record<string, TopicMasteryRecord> = {};
    for (const [id, rec] of Object.entries(raw as Record<string, unknown>)) {
      const attempts = (rec as { attempts?: unknown })?.attempts;
      if (!Array.isArray(attempts)) continue;
      const valid = attempts.filter(
        (a): a is MasteryAttempt =>
          !!a && typeof a === 'object' && typeof a.at === 'string' && Number.isFinite(a.correct) && Number.isFinite(a.total) && a.total > 0 && a.correct >= 0 && a.correct <= a.total,
      );
      if (valid.length) out[id] = { attempts: valid };
    }
    return out;
  } catch {
    return {};
  }
}

export function recordTopicResult(topicId: string, correct: number, total: number, source: MasterySource, at = new Date()): void {
  if (total <= 0) return;
  const all = loadTopicMastery();
  const prev = all[topicId]?.attempts ?? [];
  all[topicId] = { attempts: [...prev, { at: at.toISOString(), correct, total, source }].slice(-MAX_ATTEMPTS) };
  try {
    localStorage.setItem(MASTERY_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('studybg:topic-mastery-changed', { detail: { topicId } }));
  } catch {
    // без хранилище резултатът остава само в екрана
  }
}

/**
 * Оценка на усвояването: последните опити тежат повече (0,6 / 0,25 / 0,15).
 * Един входен въпрос казва малко, затова при само диагностика с 1–2 въпроса най-много „учи се“.
 */
export function masteryScore(rec: TopicMasteryRecord | undefined): number | null {
  if (!rec?.attempts.length) return null;
  const recent = rec.attempts.slice(-3).reverse();
  const weights = [0.6, 0.25, 0.15].slice(0, recent.length);
  const sum = weights.reduce((a, b) => a + b, 0);
  return recent.reduce((a, t, i) => a + (t.correct / t.total) * weights[i], 0) / sum;
}

export function masteryLevel(rec: TopicMasteryRecord | undefined): MasteryLevel {
  const score = masteryScore(rec);
  if (score === null || !rec) return 'unknown';
  const onlySmallDiagnostic = rec.attempts.every((a) => a.source === 'diagnostic' && a.total <= 2);
  if (score >= 0.8) return onlySmallDiagnostic ? 'learning' : 'mastered';
  if (score >= 0.5) return 'learning';
  return 'weak';
}

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  unknown: 'не е проверена',
  weak: 'слаба',
  learning: 'учи се',
  mastered: 'усвоена',
};
