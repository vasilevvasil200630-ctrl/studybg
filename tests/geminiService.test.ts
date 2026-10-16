import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type Scripted = () => Response;

const API_KEY = 'TEST_KEY_1234567890';
const rubric = [
  { id: 'c1', name: 'Теза', maxPoints: 10, description: 'теза' },
  { id: 'c2', name: 'Факти', maxPoints: 8, description: 'факти' },
  { id: 'c3', name: 'Извори', maxPoints: 7, description: 'извори' },
  { id: 'c4', name: 'Стил', maxPoints: 5, description: 'стил' }
];
const essay = 'Смятам, че въстанието е морална победа. '.repeat(3);

let calls: { url: string; key: string | null }[] = [];
let script: Scripted[] = [];
let store: Record<string, string> = {};

const ok = (obj: unknown): Scripted => () =>
  new Response(
    JSON.stringify({
      candidates: [{ content: { parts: [{ text: '```json\n' + JSON.stringify(obj) + '\n```' }] }, finishReason: 'STOP' }]
    }),
    { status: 200 }
  );
const status = (code: number): Scripted => () => new Response('error', { status: code });

// Всеки тест получава свежа инстанция на модула (resolvedModel се помни на ниво модул)
const loadService = async (model?: string) => {
  vi.resetModules();
  if (model) vi.stubEnv('VITE_GEMINI_MODEL', model);
  return import('../src/services/geminiService');
};

beforeEach(() => {
  calls = [];
  script = [];
  store = { studybg_gemini_api_key: API_KEY };
  vi.stubGlobal('window', globalThis);
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    }
  });
  vi.stubGlobal('fetch', async (url: string, init: { headers: Record<string, string> }) => {
    calls.push({ url, key: init.headers['x-goog-api-key'] ?? null });
    const next = script.shift();
    if (!next) throw new Error('Няма подготвен отговор за fetch');
    return next();
  });
  // Без реални паузи между повторните опити
  vi.spyOn(globalThis, 'setTimeout').mockImplementation(((fn: () => void) => {
    fn();
    return 0;
  }) as unknown as typeof setTimeout);
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('parseModelJson', () => {
  it('маха ```json ограждения', async () => {
    const { parseModelJson } = await loadService();
    expect(parseModelJson('```json\n{"a":1}\n```')).toEqual({ a: 1 });
  });

  it('намира JSON обект в заобикалящ текст', async () => {
    const { parseModelJson } = await loadService();
    expect(parseModelJson('Ето: {"a":2} край')).toEqual({ a: 2 });
  });
});

describe('evaluateEssayWithGemini', () => {
  it('0 точки остават 0, а totalScore от модела се игнорира', async () => {
    const { evaluateEssayWithGemini } = await loadService();
    script = [
      ok({ scores: { c1: 0, c2: 0, c3: 0, c4: 0 }, totalScore: 25, criterionFeedback: {}, overallFeedback: 'Извън темата', strengths: [], weaknesses: [], concreteTipsForSix: [] })
    ];
    const result = await evaluateEssayWithGemini(essay, 'Тема', rubric);
    expect(result.mode).toBe('ai');
    expect(result.totalScore).toBe(0);
  });

  it('точките се ограничават до maxPoints на критерия', async () => {
    const { evaluateEssayWithGemini } = await loadService();
    script = [ok({ scores: { c1: 99, c2: 8, c3: 7, c4: '5' }, overallFeedback: 'ok', strengths: [], weaknesses: [], concreteTipsForSix: [] })];
    const result = await evaluateEssayWithGemini(essay, 'Тема', rubric);
    expect(result.scores.c1).toBe(10);
    expect(result.totalScore).toBe(30);
  });

  it('непълни точки → структурен анализ без оценка (нищо не се измисля)', async () => {
    const { evaluateEssayWithGemini } = await loadService();
    script = [ok({ scores: { c1: 5 }, overallFeedback: 'x' })];
    const result = await evaluateEssayWithGemini(essay, 'Тема', rubric);
    expect(result.mode).toBe('structural');
    expect(result.totalScore).toBeNull();
    expect(result.scores).toEqual({});
  });

  it('без ключ → структурен анализ без нито една мрежова заявка', async () => {
    const { evaluateEssayWithGemini } = await loadService();
    delete store.studybg_gemini_api_key;
    const result = await evaluateEssayWithGemini(essay, 'Тема', rubric);
    expect(result.mode).toBe('structural');
    expect(result.fallbackReason).toBeDefined();
    expect(calls).toHaveLength(0);
  });
});

describe('callGeminiContent (през evaluateBelModuleTwoWithGemini)', () => {
  const belParams = { mode: 'synthesis' as const, topic: 't', studentDraft: 'x', referenceText: 'еталон' };

  it('по подразбиране ползва gemini-2.5-flash', async () => {
    const { evaluateBelModuleTwoWithGemini, getActiveGeminiModel } = await loadService();
    script = [ok({ score: 2, feedback: 'ok', improvements: [], modelImprovedVersion: '' })];
    await evaluateBelModuleTwoWithGemini(belParams);
    expect(calls[0].url).toContain('/models/gemini-2.5-flash:');
    expect(getActiveGeminiModel()).toBe('gemini-2.5-flash');
  });

  it('404 за зададения модел → повторение с gemini-2.5-flash', async () => {
    const { evaluateBelModuleTwoWithGemini, getActiveGeminiModel } = await loadService('gemini-3.6-flash');
    script = [status(404), ok({ score: 0, feedback: 'празно', improvements: [], modelImprovedVersion: '' })];
    const result = await evaluateBelModuleTwoWithGemini(belParams);
    expect(calls[0].url).toContain('/models/gemini-3.6-flash:');
    expect(calls[1].url).toContain('/models/gemini-2.5-flash:');
    expect(getActiveGeminiModel()).toBe('gemini-2.5-flash');
    expect(result.score).toBe(0);
    expect(result.modelImprovedVersion).toBe('');
  });

  it('429 → повторен опит и успех', async () => {
    const { evaluateBelModuleTwoWithGemini } = await loadService();
    script = [status(429), ok({ score: 3, feedback: 'ok', improvements: [], modelImprovedVersion: '' })];
    const result = await evaluateBelModuleTwoWithGemini(belParams);
    expect(calls).toHaveLength(2);
    expect(result.score).toBe(3);
  });

  it('400 не се повтаря', async () => {
    const { evaluateBelModuleTwoWithGemini } = await loadService();
    script = [status(400)];
    await expect(evaluateBelModuleTwoWithGemini(belParams)).rejects.toThrow(/400/);
    expect(calls).toHaveLength(1);
  });

  it('ключът е в хедъра x-goog-api-key, никога в URL', async () => {
    const { evaluateBelModuleTwoWithGemini } = await loadService();
    script = [ok({ score: 1, feedback: 'ok', improvements: [], modelImprovedVersion: '' })];
    await evaluateBelModuleTwoWithGemini(belParams);
    expect(calls[0].key).toBe(API_KEY);
    expect(calls[0].url).not.toContain('key=');
  });
});
