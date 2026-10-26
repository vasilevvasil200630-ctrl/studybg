import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadMonCatalog, loadTopicDetails, programTopics } from '../src/data/monCurriculum';
import {
  buildQuizPrompt,
  lessonQuizFallback,
  pickBalanced,
  rememberQuestions,
  seenQuestions,
  shuffleOptions,
  validateQuestions,
  type TopicQuizQuestion,
} from '../src/lib/topicQuiz';
import { loadTopicMastery, masteryLevel, recordTopicResult } from '../src/lib/topicMastery';
import type { LessonData } from '../src/types';

const gemini = vi.hoisted(() => ({ available: true, questions: [] as unknown[], fail: null as Error | null }));
vi.mock('../src/services/geminiService', () => ({
  isAiAvailable: () => gemini.available,
  generateQuizQuestionsWithGemini: vi.fn(async () => {
    if (gemini.fail) throw gemini.fail;
    return gemini.questions;
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
    removeItem: (k: string) => {
      delete store[k];
    },
  });
  vi.stubGlobal('window', { dispatchEvent: () => true });
  gemini.available = true;
  gemini.fail = null;
});

const raw = (i: number, difficulty: string, extra: Record<string, unknown> = {}) => ({
  question: `Въпрос номер ${i} по темата?`,
  options: [`верен ${i}`, `грешен А ${i}`, `грешен Б ${i}`, `грешен В ${i}`],
  correctIndex: 0,
  explanation: 'Защото така казва правилото.',
  difficulty,
  ...extra,
});

const tenRaw = () => [
  ...[0, 1, 2].map((i) => raw(i, 'easy')),
  ...[3, 4, 5, 6].map((i) => raw(i, 'medium')),
  ...[7, 8, 9].map((i) => raw(i, 'hard')),
];

describe('проверка на въпросите от AI', () => {
  it('пропуска само валидните', () => {
    const out = validateQuestions(
      [
        raw(1, 'easy'),
        raw(2, 'easy', { options: ['а', 'б', 'в'] }),
        raw(3, 'easy', { correctIndex: 4 }),
        raw(4, 'easy', { options: ['едно', 'Едно', 'две', 'три'] }),
        raw(5, 'extreme'),
        raw(6, 'easy', { options: ['Всички изброени', 'б', 'в', 'г'] }),
        raw(1, 'medium'),
        raw(7, 'hard', { explanation: '' }),
        'низ',
        raw(8, 'medium', { correctIndex: '2' }),
      ],
      'x',
    );
    expect(out.map((q) => q.question)).toEqual(['Въпрос номер 1 по темата?', 'Въпрос номер 8 по темата?']);
    expect(out[1].correctIndex).toBe(2);
  });

  it('отговорите, които се различават само по знак, са различни; решението е обяснението', () => {
    const out = validateQuestions(
      [raw(1, 'easy', { options: ['$x = 4$', '$x = -4$', '$x = 2$', '$x = -2$'], explanation: undefined, solution: '$3x^2 = 48$, значи $x = \\pm 4$.' })],
      'x',
    );
    expect(out).toHaveLength(1);
    expect(out[0].explanation).toMatch(/^\$3x\^2 = 48\$/);
  });

  it('взима 3 лесни, 4 средни и 3 трудни и подрежда по трудност', () => {
    const many = validateQuestions([...tenRaw(), raw(10, 'easy'), raw(11, 'hard')], 'x');
    const picked = pickBalanced(many);
    expect(picked.map((q) => q.difficulty)).toEqual(['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard']);
  });

  it('предпочита въпроси, които ученикът не е виждал', () => {
    const many = validateQuestions([...tenRaw(), raw(10, 'easy')], 'x');
    const picked = pickBalanced(many, ['Въпрос номер 0 по темата?']);
    expect(picked.map((q) => q.question)).not.toContain('Въпрос номер 0 по темата?');
  });

  it('разбърква отговорите, без да губи верния, и разпределя мястото му', () => {
    const qs = validateQuestions(tenRaw(), 'x');
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const shuffled = shuffleOptions(qs, rnd);
    shuffled.forEach((q, i) => {
      expect(q.options[q.correctIndex]).toBe(qs[i].options[qs[i].correctIndex]);
      expect([...q.options].sort()).toEqual([...qs[i].options].sort());
    });
    const counts = [0, 1, 2, 3].map((k) => shuffled.filter((q) => q.correctIndex === k).length);
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
  });
});

describe('заданието към AI', () => {
  it('съдържа темата, очакваните резултати, правилата по предмета и въпросите за избягване', async () => {
    const catalog = await loadMonCatalog();
    const program = catalog.find((p) => p.id === '8-math')!;
    const topic = programTopics(program).find((t) => t.title === 'Квадратни уравнения')!;
    const details = await loadTopicDetails(topic.id);
    const prompt = buildQuizPrompt({ program, topic, details, avoid: ['Стар въпрос?'] });
    expect(prompt).toContain('8. клас');
    expect(prompt).toContain('Тема: „Квадратни уравнения“');
    expect(prompt).toContain(details.outcomes[0]);
    expect(prompt).toMatch(/LaTeX/);
    expect(prompt).toContain('- Стар въпрос?');
  });
});

describe('нов тест по тема', () => {
  const setup = async () => {
    const catalog = await loadMonCatalog();
    const program = catalog.find((p) => p.id === '8-math')!;
    const topic = programTopics(program).find((t) => t.title === 'Квадратни уравнения')!;
    return { program, topic };
  };
  const lesson = { id: 'l1', title: 'Квадратни уравнения', quiz: [{ id: 1, question: 'Колко корена има x² = 4?', options: ['0', '1', '2', '3'], correctIndex: 2, explanation: '±2' }] } as unknown as LessonData;

  it('от AI: 10 въпроса, запомнени за следващия път', async () => {
    const { createTopicQuiz } = await import('../src/services/topicQuizService');
    gemini.questions = tenRaw();
    const { program, topic } = await setup();
    const quiz = await createTopicQuiz({ program, topic, lessons: [] });
    expect(quiz.source).toBe('ai');
    expect(quiz.questions).toHaveLength(10);
    expect(seenQuestions(topic.id)).toHaveLength(10);
  });

  it('без AI — въпросите от урока в сайта и причината', async () => {
    const { createTopicQuiz } = await import('../src/services/topicQuizService');
    gemini.fail = new Error('Достигнахте дневния лимит за AI оценки.');
    const { program, topic } = await setup();
    const quiz = await createTopicQuiz({ program, topic, lessons: [lesson] });
    expect(quiz.source).toBe('lesson');
    expect(quiz.fallbackReason).toMatch(/дневния лимит/);
    expect(quiz.questions[0].question).toBe('Колко корена има x² = 4?');
  });

  it('непълен отговор от AI и без урок → ясна грешка', async () => {
    const { createTopicQuiz, TopicQuizUnavailableError } = await import('../src/services/topicQuizService');
    gemini.questions = [raw(1, 'easy')];
    const { program, topic } = await setup();
    await expect(createTopicQuiz({ program, topic, lessons: [] })).rejects.toBeInstanceOf(TopicQuizUnavailableError);
  });

  it('грешен отговор отива в банката с грешки с целия въпрос', async () => {
    const { recordTopicQuizMistake } = await import('../src/services/topicQuizService');
    const { program, topic } = await setup();
    const q: TopicQuizQuestion = { id: 'ai-1', question: 'Въпрос?', options: ['а', 'б', 'в', 'г'], correctIndex: 1, explanation: 'Защото.', difficulty: 'easy' };
    const item = recordTopicQuizMistake(program, topic, q, 3);
    expect(item).toMatchObject({ lessonId: topic.id, lessonTitle: 'Квадратни уравнения', subject: 'Математика', grade: '8. клас', userAnswer: 'г', correctAnswerOrNote: 'б' });
    expect(JSON.parse(store.studybg_error_bank)[0].rawQuestionData.options).toEqual(['а', 'б', 'в', 'г']);
  });

  it('резервният тест от уроци пропуска въпросите без 4 отговора', () => {
    expect(lessonQuizFallback('t', [{ ...lesson, quiz: [{ ...lesson.quiz[0], options: ['да', 'не'] }] } as LessonData])).toBeNull();
  });

  it('запомня най-много 40 въпроса по тема', () => {
    rememberQuestions('t', Array.from({ length: 50 }, (_, i) => `q${i}`));
    expect(seenQuestions('t')).toHaveLength(40);
    expect(seenQuestions('t')[0]).toBe('q10');
  });
});

describe('усвояване на темите', () => {
  it('последните опити тежат повече', () => {
    recordTopicResult('t', 2, 10, 'quiz', new Date('2026-10-01'));
    recordTopicResult('t', 9, 10, 'quiz', new Date('2026-10-02'));
    expect(masteryLevel(loadTopicMastery().t)).toBe('learning');
    recordTopicResult('t', 10, 10, 'quiz', new Date('2026-10-03'));
    expect(masteryLevel(loadTopicMastery().t)).toBe('mastered');
  });

  it('един верен входен въпрос не прави темата усвоена', () => {
    recordTopicResult('d', 1, 1, 'diagnostic');
    expect(masteryLevel(loadTopicMastery().d)).toBe('learning');
    recordTopicResult('w', 0, 2, 'diagnostic');
    expect(masteryLevel(loadTopicMastery().w)).toBe('weak');
    expect(masteryLevel(undefined)).toBe('unknown');
  });

  it('повреден запис се пренебрегва', () => {
    store['studybg.topicMastery.v1'] = JSON.stringify({ a: { attempts: [{ at: 'x', correct: 5, total: 2 }] }, b: 'низ' });
    expect(loadTopicMastery()).toEqual({});
  });
});
