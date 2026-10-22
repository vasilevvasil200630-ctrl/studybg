import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EXAM_PAPERS } from '../src/data/examPapers';
import { MATH_TOPIC_BY_QUESTION, TOPICS, topicBreakdown, topicOf } from '../src/data/examTopics';
import { TOPIC_PAPERS, topicPaperId } from '../src/data/topicPapers';
import { partKey, scorePaper, validateExamPaper, type ExamPaper, type PaperAnswers } from '../src/lib/examPaperScoring';
import { loadTopicStats, saveTopicAttempt } from '../src/lib/topicProgress';

const all = (p: ExamPaper) => p.sections.flatMap((s) => s.questions);
const officialNvo10 = EXAM_PAPERS.filter((p) => p.kind === 'official' && p.exam === 'НВО 10');

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
  it('всяка задача от официалните варианти на НВО 10 и от примерните набори има тема', () => {
    for (const p of EXAM_PAPERS.filter((x) => x.exam === 'НВО 10' && x.kind !== 'practice')) {
      for (const q of all(p)) expect(topicOf(q), `${p.id} / ${q.id}`).not.toBeNull();
    }
  });

  it('в разпределението няма id на несъществуващи задачи', () => {
    const ids = new Set(officialNvo10.flatMap((p) => all(p).map((q) => q.id)));
    for (const id of Object.keys(MATH_TOPIC_BY_QUESTION)) expect(ids.has(id), id).toBe(true);
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

describe('тренировка по тема', () => {
  const mathTopics = TOPICS.filter((t) => t.area === 'math');

  it('по един набор за всяка тема по математика; всеки минава валидацията и е без таймер', () => {
    expect(TOPIC_PAPERS.map((p) => p.id)).toEqual(mathTopics.map((t) => topicPaperId(t.key)));
    for (const p of TOPIC_PAPERS) {
      expect(validateExamPaper(p), p.id).toEqual([]);
      expect(p.untimed).toBe(true);
      expect(p.kind).toBe('topic');
    }
  });

  it('наборите покриват всяка задача по математика точно веднъж, непроменена', () => {
    const fromTopics = TOPIC_PAPERS.flatMap((p) => all(p));
    const official = officialNvo10.flatMap((p) => all(p)).filter((q) => !q.topic);
    expect(fromTopics.map((q) => q.id).sort()).toEqual(official.map((q) => q.id).sort());
    const byId = new Map(official.map((q) => [q.id, q]));
    for (const q of fromTopics) expect({ ...q, number: byId.get(q.id)!.number }).toEqual(byId.get(q.id));
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

describe('резултати по теми в браузъра', () => {
  let store: Record<string, string> = {};
  beforeEach(() => {
    store = {};
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (k: string) => (k in store ? store[k] : null),
        setItem: (k: string, v: string) => {
          store[k] = v;
        },
        removeItem: (k: string) => {
          delete store[k];
        },
      },
    });
  });

  it('сумира последните опити по варианти; повторният опит заменя предишния', () => {
    saveTopicAttempt('a', [{ key: 'plane', label: 'Планиметрия', points: 4, maxPoints: 8, questions: 2 }], 1);
    saveTopicAttempt('b', [{ key: 'plane', label: 'Планиметрия', points: 8, maxPoints: 8, questions: 2 }], 2);
    expect(loadTopicStats().plane).toEqual({ points: 12, maxPoints: 16, papers: 2, lastAt: 2 });
    saveTopicAttempt('a', [{ key: 'plane', label: 'Планиметрия', points: 8, maxPoints: 8, questions: 2 }], 3);
    expect(loadTopicStats().plane).toEqual({ points: 16, maxPoints: 16, papers: 2, lastAt: 3 });
  });

  it('повредени данни не чупят анализа', () => {
    store['sbg:topic-progress:v1'] = '{нечетимо';
    expect(loadTopicStats()).toEqual({});
    store['sbg:topic-progress:v1'] = JSON.stringify({ x: { at: 1, topics: [{ key: 'plane', points: 'a', maxPoints: 4 }] } });
    expect(loadTopicStats()).toEqual({});
  });
});
