import { describe, expect, it } from 'vitest';
import { EXAM_PAPERS } from '../src/data/examPapers';
import { DZI_TOPIC_BY_QUESTION, MATH_TOPIC_BY_QUESTION, TOPICS, topicBreakdown, topicOf } from '../src/data/examTopics';
import { TOPIC_PAPERS, topicPaperId } from '../src/data/topicPapers';
import { partKey, scorePaper, validateExamPaper, type ExamPaper, type PaperAnswers } from '../src/lib/examPaperScoring';
import { topicStatsFromAttempts } from '../src/lib/topicProgress';
import type { ExamAttemptRecord } from '../src/services/examHistoryService';
import { mergeExamHistoryRecords } from '../src/services/authService';

const all = (p: ExamPaper) => p.sections.flatMap((s) => s.questions);
const officialNvo10 = EXAM_PAPERS.filter((p) => p.kind === 'official' && p.exam === 'НВО 10' && p.subject === 'Математика');

const keyAnswers = (paper: ExamPaper): PaperAnswers => {
  const out: PaperAnswers = {};
  for (const q of all(paper)) {
    if (q.kind === 'choice') out[q.id] = q.correctIndex;
    else if (q.kind === 'short') out[q.id] = q.acceptedAnswers[0];
    else if (q.kind === 'multi') {
      for (const part of q.parts) {
        const a = part.answer;
        if (a.type === 'number' || a.type === 'text') out[partKey(q, part)] = a.acceptedAnswers[0];
        else if (a.type === 'truefalse') out[partKey(q, part)] = a.correct;
        else if (a.type === 'pick') out[partKey(q, part)] = [...a.correctIndices];
      }
    }
  }
  return out;
};
const fullOpen = (paper: ExamPaper): Record<string, number> => {
  const out: Record<string, number> = {};
  for (const q of all(paper)) {
    if (q.kind === 'open') out[q.id] = q.points;
    if (q.kind === 'multi') q.parts.filter((p) => p.answer.type === 'self').forEach((p) => (out[partKey(q, p)] = p.points));
  }
  return out;
};

describe('теми на задачите', () => {
  it('всяка задача от официалните варианти на НВО 10 по математика и от примерните набори има тема', () => {
    for (const p of EXAM_PAPERS.filter((x) => x.exam === 'НВО 10' && x.kind !== 'practice' && (x.subject === 'Математика' || x.kind === 'sample'))) {
      for (const q of all(p)) expect(topicOf(q), `${p.id} / ${q.id}`).not.toBeNull();
    }
  });

  it('в разпределението няма id на несъществуващи задачи', () => {
    const ids = new Set(officialNvo10.flatMap((p) => all(p).map((q) => q.id)));
    for (const id of Object.keys(MATH_TOPIC_BY_QUESTION)) expect(ids.has(id), id).toBe(true);
    const dziIds = new Set(EXAM_PAPERS.filter((p) => p.exam === 'ДЗИ' && p.kind === 'official').flatMap((p) => all(p).map((q) => q.id)));
    for (const id of Object.keys(DZI_TOPIC_BY_QUESTION)) expect(dziIds.has(id), id).toBe(true);
  });

  it('по темите се разпределят всички точки на варианта', () => {
    for (const p of officialNvo10) {
      const result = scorePaper(p, keyAnswers(p), fullOpen(p));
      const topics = topicBreakdown(p, result);
      expect(topics.reduce((n, t) => n + t.maxPoints, 0), p.id).toBe(p.maxPoints);
      expect(topics.reduce((n, t) => n + t.points, 0), p.id).toBe(p.maxPoints);
    }
  });
});

describe.each([
  { exam: 'НВО 10', area: 'math' },
  { exam: 'ДЗИ', area: 'dzi' },
] as const)('тренировка по тема — $exam', ({ exam, area }) => {
  const topics = TOPICS.filter((t) => t.area === area);
  const sets = TOPIC_PAPERS.filter((p) => p.exam === exam);
  const officialPapers = EXAM_PAPERS.filter((p) => p.kind === 'official' && p.exam === exam && p.subject === 'Математика');

  it('по един набор за всяка тема; всеки минава валидацията и е без таймер', () => {
    expect(sets.map((p) => p.id)).toEqual(topics.map((t) => topicPaperId(t.key)));
    for (const p of sets) {
      expect(validateExamPaper(p), p.id).toEqual([]);
      expect(p.untimed).toBe(true);
      expect(p.kind).toBe('topic');
    }
  });

  it('наборите покриват всяка задача по математика точно веднъж, непроменена', () => {
    const fromTopics = sets.flatMap((p) => all(p));
    const official = officialPapers.flatMap((p) => all(p)).filter((q) => !q.topic);
    expect(fromTopics.map((q) => q.id).sort()).toEqual(official.map((q) => q.id).sort());
    const byId = new Map(official.map((q) => [q.id, q]));
    for (const q of fromTopics) expect({ ...q, number: byId.get(q.id)!.number }).toEqual(byId.get(q.id));
  });

  it('всяка задача има тема от своя изпит и точките по теми дават сбора на варианта', () => {
    for (const p of officialPapers) {
      for (const q of all(p)) {
        const key = topicOf(q);
        expect(key, q.id).not.toBeNull();
        if (!q.topic) expect(TOPICS.find((t) => t.key === key)?.area, q.id).toBe(area);
      }
      const result = scorePaper(p, keyAnswers(p), fullOpen(p));
      expect(topicBreakdown(p, result).reduce((n, t) => n + t.maxPoints, 0), p.id).toBe(p.maxPoints);
    }
  });

  it('целият ключ дава максимума и в наборите по тема', () => {
    for (const p of TOPIC_PAPERS) expect(scorePaper(p, keyAnswers(p), fullOpen(p)).totalPoints, p.id).toBe(p.maxPoints);
  });

  it('задачите са по години — най-новите първи', () => {
    for (const p of TOPIC_PAPERS) {
      const years = p.sections.map((s) => Number(s.id.slice(1)));
      expect([...years].sort((a, b) => b - a), p.id).toEqual(years);
    }
  });
});

describe('резултати по теми от историята на изпитите', () => {
  const attempt = (id: string, preset: string, ts: string, topicScores?: ExamAttemptRecord['topicScores']): ExamAttemptRecord => ({
    id, timestamp: ts, formattedDate: '', lessonId: preset, lessonTitle: '', subject: 'Математика', grade: 'НВО 10',
    examPreset: preset, durationMinutes: 90, timeSpentSeconds: 60, module1Points: 0, module2Points: 0, module3Points: 0,
    totalPoints: 0, gradeEquivalent: '', gradeNumeric: null, passed: false, topicScores,
  });

  it('сумира последния опит на всеки вариант; повторният опит заменя предишния', () => {
    const stats = topicStatsFromAttempts([
      attempt('1', 'paper:a', '2026-10-20T10:00:00Z', [{ key: 'plane', points: 4, maxPoints: 8 }]),
      attempt('2', 'paper:b', '2026-10-21T10:00:00Z', [{ key: 'plane', points: 8, maxPoints: 8 }]),
      attempt('3', 'paper:a', '2026-10-22T10:00:00Z', [{ key: 'plane', points: 8, maxPoints: 8 }]),
    ]);
    expect(stats.plane).toEqual({ points: 16, maxPoints: 16, papers: 2, lastAt: Date.parse('2026-10-22T10:00:00Z') });
  });

  it('пропуска опити без точки по теми (стари записи, изпити по урок, редове от exam_attempts) и повредени данни', () => {
    const stats = topicStatsFromAttempts([
      attempt('1', 'lesson', '2026-10-20T10:00:00Z', [{ key: 'plane', points: 4, maxPoints: 8 }]),
      attempt('2', 'paper:a', '2026-10-21T10:00:00Z'),
      attempt('3', 'paper:b', '2026-10-21T10:00:00Z', [{ key: 'plane', points: 'x' as unknown as number, maxPoints: 4 }]),
    ]);
    expect(stats).toEqual({});
  });

  it('сливането с облачната история (ново устройство) пази точките по теми', () => {
    const cloud = [attempt('c1', 'paper:a', '2026-10-20T10:00:00Z', [{ key: 'solid', points: 4, maxPoints: 4 }])];
    const merged = mergeExamHistoryRecords([], cloud);
    expect(topicStatsFromAttempts(merged).solid).toEqual({ points: 4, maxPoints: 4, papers: 1, lastAt: Date.parse('2026-10-20T10:00:00Z') });
  });

  it('по-нов запис без теми не скрива по-стар с теми за друг вариант', () => {
    const stats = topicStatsFromAttempts([
      attempt('1', 'paper:a', '2026-10-20T10:00:00Z', [{ key: 'trig', points: 2, maxPoints: 4 }]),
      attempt('2', 'paper:b', '2026-10-22T10:00:00Z'),
    ]);
    expect(stats.trig?.points).toBe(2);
  });
});
