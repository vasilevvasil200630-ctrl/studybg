import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadMonCatalog, practiceTopics } from '../src/data/monCurriculum';
import {
  buildDiagnosticPrompt,
  loadDiagnosticRuns,
  scoreDiagnostic,
  selectDiagnosticTopics,
  validateDiagnostic,
  type DiagnosticRun,
} from '../src/lib/diagnostic';
import { loadTopicMastery, masteryLevel } from '../src/lib/topicMastery';

const gemini = vi.hoisted(() => ({ available: true, questions: [] as unknown[] }));
vi.mock('../src/services/geminiService', () => ({
  isAiAvailable: () => gemini.available,
  generateDiagnosticQuestionsWithGemini: vi.fn(async () => gemini.questions),
}));

let store: Record<string, string>;
beforeEach(() => {
  store = {};
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
  });
  vi.stubGlobal('window', { dispatchEvent: () => true });
  gemini.available = true;
});

const q = (topic: string, kind: string, i: number) => ({
  topic,
  kind,
  question: `Входен въпрос ${i}?`,
  solution: 'Решение.',
  options: [`верен ${i}`, `а ${i}`, `б ${i}`, `в ${i}`],
  correctIndex: 0,
});

const math8 = async () => (await loadMonCatalog()).find((p) => p.id === '8-math')!;
const history10 = async () => (await loadMonCatalog()).find((p) => p.id === '10-history')!;

describe('входен тест', () => {
  it('темите са разпределени по цялата програма', async () => {
    const topics = practiceTopics(await history10());
    const picked = selectDiagnosticTopics(topics);
    expect(picked).toHaveLength(10);
    expect(new Set(picked.map((t) => t.id)).size).toBe(10);
    const positions = picked.map((t) => topics.indexOf(t));
    expect(positions[0]).toBeLessThan(topics.length / 10);
    expect(positions[9]).toBeGreaterThan((topics.length * 8) / 10);
    // Програма с по-малко теми: всичките
    expect(selectDiagnosticTopics(practiceTopics(await math8()))).toHaveLength(8);
  });

  it('заданието изброява темите с кодове и иска „знае“ и „може“', async () => {
    const program = await math8();
    const topics = practiceTopics(program).slice(0, 2);
    const prompt = buildDiagnosticPrompt(program, topics.map((topic) => ({ topic, details: { outcomes: ['Умее да пресмята пермутации.'], concepts: [] } })));
    expect(prompt).toContain('T1. Основни комбинаторни понятия');
    expect(prompt).toContain('• Умее да пресмята пермутации.');
    expect(prompt).toMatch(/"kind": "knows"/);
    expect(prompt).toMatch(/"kind": "can"/);
  });

  it('свързва въпросите с темите; непознат или повторен код отпада', async () => {
    const topics = practiceTopics(await math8()).slice(0, 3);
    const out = validateDiagnostic([q('T1', 'knows', 1), q('t2', 'can', 2), q('T2', 'can', 3), q('T9', 'knows', 4), q('X', 'can', 5)], topics, 'd');
    expect(out.map((x) => [x.topicId, x.kind])).toEqual([
      [topics[0].id, 'knows'],
      [topics[1].id, 'can'],
    ]);
  });

  it('точки по знание и по приложение', () => {
    const run = {
      programId: 'p',
      startedAt: '',
      questions: [
        { kind: 'knows', correctIndex: 0 },
        { kind: 'knows', correctIndex: 1 },
        { kind: 'can', correctIndex: 2 },
      ],
      answers: [0, 0, 2],
    } as unknown as DiagnosticRun;
    expect(scoreDiagnostic(run)).toEqual({ correct: 2, total: 3, knows: { correct: 1, total: 2 }, can: { correct: 1, total: 1 } });
  });

  it('тестът се запазва веднага, а краят му записва резултат по всяка тема', async () => {
    const { startDiagnostic, finishDiagnostic } = await import('../src/services/diagnosticService');
    const program = await math8();
    gemini.questions = practiceTopics(program).map((_, i) => q(`T${i + 1}`, i % 2 ? 'can' : 'knows', i));
    const run = await startDiagnostic(program);
    expect(run.questions).toHaveLength(8);
    expect(loadDiagnosticRuns()['8-math'].answers.every((a) => a === null)).toBe(true);

    const answers = run.questions.map((x, i) => (i === 0 ? (x.correctIndex + 1) % 4 : x.correctIndex));
    const done = finishDiagnostic({ ...run, answers });
    expect(done.finishedAt).toBeDefined();
    const mastery = loadTopicMastery();
    expect(masteryLevel(mastery[run.questions[0].topicId])).toBe('weak');
    expect(masteryLevel(mastery[run.questions[1].topicId])).toBe('learning');
  });

  it('без AI или с непълен отговор — ясна грешка', async () => {
    const { startDiagnostic, DiagnosticUnavailableError } = await import('../src/services/diagnosticService');
    gemini.available = false;
    await expect(startDiagnostic(await math8())).rejects.toBeInstanceOf(DiagnosticUnavailableError);
    gemini.available = true;
    gemini.questions = [q('T1', 'knows', 1)];
    await expect(startDiagnostic(await math8())).rejects.toThrow(/непълен/);
  });
});
