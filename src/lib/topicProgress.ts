import type { TopicKey } from '../data/examTopics';
import { examHistoryService, type ExamAttemptRecord } from '../services/examHistoryService';

/**
 * Резултатите по теми се четат от историята на изпитите: всеки опит по вариант пази точките си
 * по теми (topicScores), а историята вече се синхронизира с профила (user_profiles.exam_history).
 * Така анализът е един и същ на всички устройства на ученика.
 *
 * За всеки вариант или набор се взима само последният опит, затова повторното решаване
 * заменя предишния резултат, вместо да го брои два пъти.
 */

export interface TopicStat {
  points: number;
  maxPoints: number;
  /** Брой варианти/набори с поне една задача по темата */
  papers: number;
  lastAt: number;
}

export function topicStatsFromAttempts(attempts: ExamAttemptRecord[]): Partial<Record<TopicKey, TopicStat>> {
  const latest = new Map<string, ExamAttemptRecord>();
  for (const a of attempts) {
    if (!a?.examPreset?.startsWith('paper:') || !Array.isArray(a.topicScores) || a.topicScores.length === 0) continue;
    const prev = latest.get(a.examPreset);
    if (!prev || new Date(a.timestamp).getTime() > new Date(prev.timestamp).getTime()) latest.set(a.examPreset, a);
  }

  const out: Partial<Record<TopicKey, TopicStat>> = {};
  for (const a of latest.values()) {
    const at = new Date(a.timestamp).getTime() || 0;
    for (const t of a.topicScores ?? []) {
      if (typeof t?.key !== 'string' || typeof t.points !== 'number' || typeof t.maxPoints !== 'number' || t.maxPoints <= 0) continue;
      const key = t.key as TopicKey;
      const cur = out[key] ?? { points: 0, maxPoints: 0, papers: 0, lastAt: 0 };
      cur.points += t.points;
      cur.maxPoints += t.maxPoints;
      cur.papers += 1;
      cur.lastAt = Math.max(cur.lastAt, at);
      out[key] = cur;
    }
  }
  return out;
}

export const loadTopicStats = (): Partial<Record<TopicKey, TopicStat>> => topicStatsFromAttempts(examHistoryService.getAllAttempts());
