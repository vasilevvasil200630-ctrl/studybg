import { describe, expect, it } from 'vitest';
import { EXAM_PAPERS } from '../src/data/examPapers';
import {
  isShortAnswerCorrect,
  scorePaper,
  validateExamPaper,
  type ExamPaper,
  type PaperAnswers,
  type ShortAnswerQuestion
} from '../src/lib/examPaperScoring';

const allQuestions = (paper: ExamPaper) => paper.sections.flatMap((s) => s.questions);

/** Отговори „по ключа“ за всички автоматично проверявани задачи */
const keyAnswers = (paper: ExamPaper): PaperAnswers =>
  Object.fromEntries(
    allQuestions(paper)
      .filter((q) => q.kind !== 'open')
      .map((q) => [q.id, q.kind === 'choice' ? q.correctIndex : q.acceptedAnswers[0]])
  );

const fullOpenScores = (paper: ExamPaper) =>
  Object.fromEntries(allQuestions(paper).filter((q) => q.kind === 'open').map((q) => [q.id, q.points]));

describe('изпитни варианти: данни', () => {
  it('има поне 2 варианта: БЕЛ ДЗИ и Математика', () => {
    expect(EXAM_PAPERS.length).toBeGreaterThanOrEqual(2);
    expect(EXAM_PAPERS.some((p) => p.exam === 'ДЗИ' && p.subject === 'Български език и литература')).toBe(true);
    expect(EXAM_PAPERS.some((p) => p.subject === 'Математика')).toBe(true);
  });

  it('всеки вариант минава валидацията (точки = 100, ключ, критерии)', () => {
    for (const paper of EXAM_PAPERS) {
      expect(validateExamPaper(paper), paper.id).toEqual([]);
    }
  });

  it('тренировъчните варианти са ясно обозначени и без officialSourceUrl', () => {
    for (const paper of EXAM_PAPERS.filter((p) => p.kind === 'practice')) {
      expect(paper.title).toMatch(/тренировъчен/i);
      expect(paper.officialSourceUrl).toBeUndefined();
    }
  });
});

describe('validateExamPaper хваща грешки', () => {
  const base = EXAM_PAPERS[1];

  it('официален вариант без https източник', () => {
    const errors = validateExamPaper({ ...base, kind: 'official', officialSourceUrl: undefined });
    expect(errors.join('\n')).toMatch(/officialSourceUrl/);
  });

  it('официален вариант с https източник е валиден', () => {
    expect(validateExamPaper({ ...base, kind: 'official', officialSourceUrl: 'https://www.mon.bg/example.pdf' })).toEqual([]);
  });

  it('грешен сбор на точките и невалиден ключ', () => {
    const [first, ...rest] = base.sections;
    const broken: ExamPaper = {
      ...base,
      sections: [
        { ...first, questions: [{ ...first.questions[0], kind: 'choice', options: ['а', 'б'], correctIndex: 5 } as never, ...first.questions.slice(1)] },
        ...rest
      ],
      maxPoints: 90
    };
    const text = validateExamPaper(broken).join('\n');
    expect(text).toMatch(/невалиден correctIndex/);
    expect(text).toMatch(/сборът на точките/);
  });
});

describe('scorePaper', () => {
  it('всичко по ключа + пълна самооценка = 100 т.; БЕЛ ДЗИ → Отличен 6.00', () => {
    const bel = EXAM_PAPERS.find((p) => p.id === 'practice-dzi-bel-1')!;
    const result = scorePaper(bel, keyAnswers(bel), fullOpenScores(bel));
    expect(result.totalPoints).toBe(100);
    expect(result.autoPoints).toBe(60);
    expect(result.selfAssessedPoints).toBe(40);
    expect(result.grade?.numeric).toBe(6);
  });

  it('празен вариант = 0 т. и Слаб 2.00', () => {
    const bel = EXAM_PAPERS.find((p) => p.id === 'practice-dzi-bel-1')!;
    const result = scorePaper(bel, {}, {});
    expect(result.totalPoints).toBe(0);
    expect(result.grade?.label).toBe('Слаб');
  });

  it('НВО 10 по математика връща точки без оценка', () => {
    const math = EXAM_PAPERS.find((p) => p.id === 'practice-nvo10-math-1')!;
    const result = scorePaper(math, keyAnswers(math), {});
    expect(result.totalPoints).toBe(66);
    expect(result.grade).toBeNull();
  });

  it('самооценката се ограничава до точките на задачата', () => {
    const math = EXAM_PAPERS.find((p) => p.id === 'practice-nvo10-math-1')!;
    const result = scorePaper(math, {}, { 'math1-q19': 99, 'math1-q20': -5 });
    expect(result.selfAssessedPoints).toBe(17);
  });
});

describe('кратки отговори', () => {
  const numberQ: ShortAnswerQuestion = {
    id: 'n', number: 1, kind: 'short', answerType: 'number', prompt: 'p', acceptedAnswers: ['12000'], points: 5, explanation: 'e'
  };
  const textQ: ShortAnswerQuestion = {
    id: 't', number: 1, kind: 'short', answerType: 'text', prompt: 'p', acceptedAnswers: ['петнадесетте минути'], points: 5, explanation: 'e'
  };

  it('числата се сравняват независимо от интервали и мерни единици', () => {
    expect(isShortAnswerCorrect(numberQ, '12 000')).toBe(true);
    expect(isShortAnswerCorrect(numberQ, '12000 тома')).toBe(true);
    expect(isShortAnswerCorrect(numberQ, '1200')).toBe(false);
    expect(isShortAnswerCorrect(numberQ, '')).toBe(false);
  });

  it('текстът се сравнява без главни букви, кавички и крайна точка', () => {
    expect(isShortAnswerCorrect(textQ, '„Петнадесетте минути“.')).toBe(true);
    expect(isShortAnswerCorrect(textQ, 'петнадесетте  минути')).toBe(true);
    expect(isShortAnswerCorrect(textQ, 'пет минути')).toBe(false);
  });
});
