import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EXAM_PAPERS } from '../src/data/examPapers';
import { TOPIC_PAPERS, topicPaperId } from '../src/data/topicPapers';
import { MISTAKES_PAPER_ID, buildMistakesPaper, sourcePaperTitle } from '../src/data/mistakesPaper';
import { reviewAnswers } from '../src/lib/examMistakes';
import { partKey, scorePaper, validateExamPaper, type ExamPaper, type PaperAnswers } from '../src/lib/examPaperScoring';
import { errorBankService, examErrorId } from '../src/services/errorBankService';

const paper = (id: string): ExamPaper => EXAM_PAPERS.find((p) => p.id === id)!;
const all = (p: ExamPaper) => p.sections.flatMap((s) => s.questions);

let store: Record<string, string> = {};
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
});

describe('reviewAnswers — кои задачи отиват в Банката с грешки', () => {
  const dzi = paper('official-dzi-bel-2025');

  it('сгрешените задачи с ключ влизат, верните се броят като усвоени, пропуснатите и самооценката — не', () => {
    const answers: PaperAnswers = {
      'db25-q1': 0, // вярното е 1
      'db25-q2': 2, // вярно
      'db25-q9': 'възраждането', // главната буква се проверява
      'db25-q10': 'билетът', // вярно
      [partKey({ id: 'db25-q23' }, { id: 'a' })]: [0],
      [partKey({ id: 'db25-q23' }, { id: 'b' })]: [0], // грешно
      [partKey({ id: 'db25-q23' }, { id: 'c' })]: [2],
    };
    const { mistakes, correctIds } = reviewAnswers(dzi, answers);
    expect(mistakes.map((m) => m.question.id)).toEqual(['db25-q1', 'db25-q9', 'db25-q23']);
    expect(correctIds).toEqual(['db25-q2', 'db25-q10']);
    const q1 = mistakes[0];
    expect(q1.userAnswer).toBe('вариянт');
    expect(q1.correctAnswer).toBe('уредник');
    expect(mistakes[1]).toMatchObject({ userAnswer: 'възраждането', correctAnswer: 'Възраждането' });
    // при подточките — само сгрешената
    expect(mistakes[2]).toMatchObject({ userAnswer: 'Б) покрива', correctAnswer: 'Б) разкрива' });
  });

  it('задача с подточки е вярна само когато всички подточки са верни', () => {
    const answers: PaperAnswers = {
      [partKey({ id: 'db25-q23' }, { id: 'a' })]: [0],
      [partKey({ id: 'db25-q23' }, { id: 'b' })]: [1],
      [partKey({ id: 'db25-q23' }, { id: 'c' })]: [2],
    };
    expect(reviewAnswers(dzi, answers).correctIds).toEqual(['db25-q23']);
  });
});

describe('Банката с грешки — задачи от изпитите', () => {
  const dzi = paper('official-dzi-bel-2025');
  const wrongQ1: PaperAnswers = { 'db25-q1': 0 };

  it('записва сгрешената задача с варианта ѝ; набор по тема и вариантът ползват един запис', () => {
    expect(errorBankService.recordExamReview(dzi, reviewAnswers(dzi, wrongQ1), (id) => sourcePaperTitle(id) ?? dzi.title)).toEqual({ recorded: 1, resolved: 0 });
    const topic = TOPIC_PAPERS.find((p) => p.id === topicPaperId('dzi-bel-spelling'))!;
    errorBankService.recordExamReview(topic, reviewAnswers(topic, wrongQ1), (id) => sourcePaperTitle(id) ?? topic.title);
    const items = errorBankService.getAllErrors();
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: examErrorId('db25-q1'),
      type: 'exam_task',
      examQuestionId: 'db25-q1',
      lessonTitle: dzi.title,
      subject: 'Български език и литература',
      grade: 'ДЗИ',
      userAnswer: 'вариянт',
      correctAnswerOrNote: 'уредник',
      resolved: false,
    });
  });

  it('вярно решена задача от Банката се отбелязва като усвоена; нова грешка я връща като нерешена', () => {
    errorBankService.recordExamReview(dzi, reviewAnswers(dzi, wrongQ1));
    expect(errorBankService.recordExamReview(dzi, reviewAnswers(dzi, { 'db25-q1': 1 }))).toEqual({ recorded: 0, resolved: 1 });
    expect(errorBankService.getAllErrors()[0].resolved).toBe(true);
    errorBankService.recordExamReview(dzi, reviewAnswers(dzi, wrongQ1));
    expect(errorBankService.getAllErrors()[0].resolved).toBe(false);
    expect(errorBankService.getUnresolvedCount()).toBe(1);
  });

  it('не пипа другите записи в Банката', () => {
    const other = { id: 'quiz-1-l1', type: 'quiz_question', lessonId: 'l1', lessonTitle: 'Урок', subject: 'БЕЛ', grade: '7', questionOrRequirement: 'q', correctAnswerOrNote: 'a', explanationOrReason: 'e', addedAt: '', resolved: false };
    store.studybg_error_bank = JSON.stringify([other]);
    errorBankService.recordExamReview(dzi, reviewAnswers(dzi, wrongQ1));
    expect(errorBankService.getAllErrors().map((e) => e.id)).toEqual([examErrorId('db25-q1'), 'quiz-1-l1']);
  });
});

describe('„Реши отново“ — набор от сгрешените задачи', () => {
  it('задачите са непроменени, с текста си, номерирани от 1 и минават валидацията', () => {
    const ids = ['db25-q30', 'b23-q12', 'db25-q1', 'm25-q1', 'липсва'];
    const p = buildMistakesPaper(ids)!;
    expect(p.id).toBe(MISTAKES_PAPER_ID);
    expect(p.kind).toBe('review');
    expect(p.untimed).toBe(true);
    expect(validateExamPaper(p)).toEqual([]);
    const qs = all(p);
    expect(qs.map((q) => q.number)).toEqual([1, 2, 3, 4]);
    expect(qs.map((q) => q.id).sort()).toEqual(['b23-q12', 'db25-q1', 'db25-q30', 'm25-q1']);
    const byId = new Map(EXAM_PAPERS.flatMap((x) => all(x)).map((q) => [q.id, q]));
    for (const q of qs) expect({ ...q, number: byId.get(q.id)!.number }).toEqual(byId.get(q.id));
    const sectionOf = (id: string) => p.sections.find((s) => s.questions.some((q) => q.id === id))!;
    expect(sectionOf('db25-q30').externalText?.pages).toBe('7');
    expect(sectionOf('b23-q12').sourceText?.title).toContain('Гераците');
    expect(new Set(p.sections.map((s) => s.id)).size).toBe(p.sections.length);
    // различни предмети — без лист с формули
    expect(p.formulaSheet).toBeUndefined();
    const key: PaperAnswers = { 'db25-q30': 2, 'b23-q12': 0, 'db25-q1': 1, 'm25-q1': (byId.get('m25-q1') as { correctIndex: number }).correctIndex };
    expect(scorePaper(p, key, {}).totalPoints).toBe(p.maxPoints);
  });

  it('само задачи по математика от НВО 10 — с листа с формули; без познати задачи няма набор', () => {
    expect(buildMistakesPaper(['m25-q1', 'm24-q2'])!.formulaSheet).toBe('nvo10-math');
    expect(buildMistakesPaper(['липсва'])).toBeNull();
    expect(buildMistakesPaper([])).toBeNull();
  });
});
