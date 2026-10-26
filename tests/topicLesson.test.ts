import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadMonCatalog, loadTopicDetails, programTopics } from '../src/data/monCurriculum';
import { buildLessonPrompt, cacheLesson, cachedLesson, validateLesson } from '../src/lib/topicLesson';

const gemini = vi.hoisted(() => ({ available: true, lesson: {} as Record<string, unknown>, calls: 0 }));
vi.mock('../src/services/geminiService', () => ({
  isAiAvailable: () => gemini.available,
  generateTopicLessonWithGemini: vi.fn(async () => {
    gemini.calls++;
    return gemini.lesson;
  }),
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
  gemini.available = true;
  gemini.calls = 0;
});

const goodLesson = () => ({
  overview: 'Квадратно уравнение е уравнение от вида $ax^2 + bx + c = 0$, където $a \\ne 0$.',
  keyPoints: ['Дискриминанта $D = b^2 - 4ac$.', 'При $D > 0$ — два корена.', 'При $D = 0$ — един двоен корен.', ''],
  examples: [{ problem: 'Реши $x^2 - 5x + 6 = 0$.', solution: '$D = 1$, $x_1 = 2$, $x_2 = 3$.' }, { problem: 'без решение', solution: '' }],
  commonTraps: ['Знакът пред $b$ във формулата.'],
  formulas: [{ label: 'Корени', value: '$x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}$' }],
  flashcards: [
    { category: 'formula', front: 'Формула за дискриминантата', back: '$D = b^2 - 4ac$' },
    { category: 'definition', front: 'Какво е двоен корен?', back: 'Корен при $D = 0$' },
    { category: 'theorem', front: 'Теорема на Виет за сбора', back: '$x_1 + x_2 = -\\frac{b}{a}$' },
    { front: 'Без категория', back: 'става „term“' },
  ],
});

const quadratic = async () => {
  const program = (await loadMonCatalog()).find((p) => p.id === '8-math')!;
  return { program, topic: programTopics(program).find((t) => t.title === 'Квадратни уравнения')! };
};

describe('урок по тема от AI', () => {
  it('заданието съдържа темата, очакваните резултати и видовете флашкарти по предмета', async () => {
    const { program, topic } = await quadratic();
    const prompt = buildLessonPrompt(program, topic, await loadTopicDetails(topic.id));
    expect(prompt).toContain('Тема: „Квадратни уравнения“');
    expect(prompt).toMatch(/теоремите на Виет/);
    expect(prompt).toMatch(/"theorem" \(теорема\)/);
    expect(prompt).toMatch(/Не измисляй факти/);
  });

  it('проверката маха празните части и иска основното', () => {
    const lesson = validateLesson(goodLesson())!;
    expect(lesson.keyPoints).toHaveLength(3);
    expect(lesson.examples).toHaveLength(1);
    expect(lesson.flashcards[3].category).toBe('term');
    expect(validateLesson({ ...goodLesson(), keyPoints: ['само една'] })).toBeNull();
    expect(validateLesson({ ...goodLesson(), overview: 'кратко' })).toBeNull();
  });

  it('урокът се генерира веднъж и после идва от кеша; „Нов вариант“ го сменя', async () => {
    const { getTopicLesson } = await import('../src/services/topicLessonService');
    const { program, topic } = await quadratic();
    gemini.lesson = goodLesson();
    await getTopicLesson(program, topic);
    await getTopicLesson(program, topic);
    expect(gemini.calls).toBe(1);
    await getTopicLesson(program, topic, { fresh: true });
    expect(gemini.calls).toBe(2);
  });

  it('без AI или с непълен урок — ясна грешка; кешът остава ползваем без AI', async () => {
    const { getTopicLesson, TopicLessonUnavailableError } = await import('../src/services/topicLessonService');
    const { program, topic } = await quadratic();
    gemini.lesson = { overview: 'x' };
    await expect(getTopicLesson(program, topic)).rejects.toBeInstanceOf(TopicLessonUnavailableError);
    gemini.available = false;
    await expect(getTopicLesson(program, topic)).rejects.toThrow(/не е включено/);
    cacheLesson(topic.id, validateLesson(goodLesson())!);
    await expect(getTopicLesson(program, topic)).resolves.toMatchObject({ keyPoints: expect.any(Array) });
  });

  it('кешът пази най-много 60 урока — най-старите излизат', () => {
    const lesson = validateLesson(goodLesson())!;
    for (let i = 0; i < 65; i++) cacheLesson(`t${i}`, lesson, new Date(2026, 0, 1, 0, i));
    expect(cachedLesson('t0')).toBeNull();
    expect(cachedLesson('t64')).not.toBeNull();
    expect(Object.keys(JSON.parse(store['studybg.topicLesson.v1']))).toHaveLength(60);
  });
});
