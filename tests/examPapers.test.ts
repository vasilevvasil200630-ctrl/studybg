import { describe, expect, it } from 'vitest';
import { EXAM_PAPERS } from '../src/data/examPapers';
import katex from 'katex';
import { FIGURES } from '../src/components/exam-engine/figures';
import {
  isPartCorrect,
  isShortAnswerCorrect,
  partKey,
  scorePaper,
  validateExamPaper,
  type ExamPaper,
  type MultiPartQuestion,
  type PaperAnswers,
  type ShortAnswerQuestion
} from '../src/lib/examPaperScoring';

const allQuestions = (paper: ExamPaper) => paper.sections.flatMap((s) => s.questions);

/** Отговори „по ключа“ за всички автоматично проверявани задачи и подточки */
const keyAnswers = (paper: ExamPaper): PaperAnswers => {
  const out: PaperAnswers = {};
  for (const q of allQuestions(paper)) {
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

/** Пълни точки за всичко със самооценка (задачи със свободен отговор и подточки „self“) */
const fullOpenScores = (paper: ExamPaper): Record<string, number> => {
  const out: Record<string, number> = {};
  for (const q of allQuestions(paper)) {
    if (q.kind === 'open') out[q.id] = q.points;
    if (q.kind === 'multi') q.parts.filter((p) => p.answer.type === 'self').forEach((p) => (out[partKey(q, p)] = p.points));
  }
  return out;
};

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
  const base = EXAM_PAPERS.find((p) => p.id === 'practice-nvo10-math-1')!;

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

  it('числата се сравняват независимо от интервали, мерни единици, индекси и множители', () => {
    expect(isShortAnswerCorrect(numberQ, '12 000')).toBe(true);
    expect(isShortAnswerCorrect(numberQ, '12,000')).toBe(true);
    expect(isShortAnswerCorrect(numberQ, '12 хиляди')).toBe(true);
    expect(isShortAnswerCorrect(numberQ, '12 хил. тома')).toBe(true);
    expect(isShortAnswerCorrect(numberQ, '12000 тома')).toBe(true);
    expect(isShortAnswerCorrect(numberQ, '1200')).toBe(false);
    expect(isShortAnswerCorrect(numberQ, '')).toBe(false);

    const seqQ: ShortAnswerQuestion = {
      id: 'seq', number: 2, kind: 'short', answerType: 'number', prompt: 'p', acceptedAnswers: ['39'], points: 3, explanation: 'e'
    };
    expect(isShortAnswerCorrect(seqQ, 'a10 = 39')).toBe(true);
    expect(isShortAnswerCorrect(seqQ, 'x_1 = 39')).toBe(true);
    expect(isShortAnswerCorrect(seqQ, 'S = 39 cm²')).toBe(true);
  });

  it('числата с думи се разпознават само като цели думи', () => {
    const q = (key: string): ShortAnswerQuestion => ({
      id: 'w', number: 1, kind: 'short', answerType: 'number', prompt: 'p', acceptedAnswers: [key], points: 1, explanation: 'e'
    });
    expect(isShortAnswerCorrect(q('10'), 'двадесет')).toBe(false);
    expect(isShortAnswerCorrect(q('10'), 'петдесет')).toBe(false);
    expect(isShortAnswerCorrect(q('10'), 'шестнадесет')).toBe(false);
    expect(isShortAnswerCorrect(q('20'), 'двадесет')).toBe(true);
    expect(isShortAnswerCorrect(q('16'), 'шестнадесет')).toBe(true);
    expect(isShortAnswerCorrect(q('25'), 'двадесет и пет')).toBe(true);
    expect(isShortAnswerCorrect(q('10'), 'десетте')).toBe(true);
  });

  it('десетична запетая по българската норма; „1,500“ се приема и като 1.5, и като 1500', () => {
    const q = (key: string): ShortAnswerQuestion => ({
      id: 'd', number: 1, kind: 'short', answerType: 'number', prompt: 'p', acceptedAnswers: [key], points: 1, explanation: 'e'
    });
    expect(isShortAnswerCorrect(q('1.5'), '1,500')).toBe(true);
    expect(isShortAnswerCorrect(q('1500'), '1,500')).toBe(true);
    expect(isShortAnswerCorrect(q('2.125'), '2,125 m')).toBe(true);
    expect(isShortAnswerCorrect(q('2.5'), '2,5')).toBe(true);
    expect(isShortAnswerCorrect(q('-3'), 'x = −3')).toBe(true);
  });

  it('отговор с няколко числа (колебание) не носи точки', () => {
    const q: ShortAnswerQuestion = {
      id: 'h', number: 1, kind: 'short', answerType: 'number', prompt: 'p', acceptedAnswers: ['12'], points: 1, explanation: 'e'
    };
    expect(isShortAnswerCorrect(q, '12 или 15')).toBe(false);
    expect(isShortAnswerCorrect(q, '12-15')).toBe(false);
    expect(isShortAnswerCorrect(q, '12, 15')).toBe(false);
    expect(isShortAnswerCorrect(q, '12 cm2')).toBe(true);
  });

  it('текстът се сравнява без главни букви, кавички и крайна точка', () => {
    expect(isShortAnswerCorrect(textQ, '„Петнадесетте минути“.')).toBe(true);
    expect(isShortAnswerCorrect(textQ, 'петнадесетте  минути')).toBe(true);
    expect(isShortAnswerCorrect(textQ, 'пет минути')).toBe(false);
  });
});

/** Всички текстове на варианта, в които може да има формули */
const paperTexts = (paper: ExamPaper): string[] =>
  allQuestions(paper).flatMap((q) => {
    const texts = [q.prompt];
    if (q.kind === 'choice') texts.push(...q.options, q.explanation);
    if (q.kind === 'short') texts.push(...q.acceptedAnswers, q.explanation);
    if (q.kind === 'open') texts.push(q.modelAnswer, ...q.criteria.map((c) => c.label));
    if (q.kind === 'multi') {
      texts.push(q.explanation);
      for (const p of q.parts) {
        texts.push(p.prompt);
        if (p.answer.type === 'self') texts.push(p.answer.modelAnswer);
        if (p.answer.type === 'pick') texts.push(...p.answer.options);
      }
    }
    return texts;
  });

describe('официални варианти и примерни задачи на МОН', () => {
  // Примерните задачи също са на МОН и минават същите проверки (ключ, формули, връзка към PDF)
  const official = EXAM_PAPERS.filter((p) => p.kind === 'official' || p.kind === 'sample');

  it('всеки официален вариант сочи PDF на МОН', () => {
    expect(official.length).toBeGreaterThan(0);
    for (const paper of official) expect(paper.officialSourceUrl, paper.id).toMatch(/^https:\/\/www\.mon\.bg\/.+\.pdf$/);
  });

  it('целият официален ключ дава максимума точки', () => {
    for (const paper of official) {
      const result = scorePaper(paper, keyAnswers(paper), fullOpenScores(paper));
      expect(result.totalPoints, paper.id).toBe(paper.maxPoints);
    }
  });

  it('всяка формула се изобразява от KaTeX без грешка', () => {
    const pattern = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
    for (const paper of official) {
      for (const text of paperTexts(paper)) {
        for (const m of text.matchAll(pattern)) {
          const tex = (m[1] ?? m[2]).trim();
          expect(() => katex.renderToString(tex, { throwOnError: true, strict: 'ignore' }), `${paper.id}: ${tex}`).not.toThrow();
        }
        // Нечетен брой $ = незатворена формула
        expect((text.match(/\$/g) ?? []).length % 2, `${paper.id}: ${text.slice(0, 60)}`).toBe(0);
      }
    }
  });

  it('всеки чертеж, към който сочат данните, съществува', () => {
    for (const paper of EXAM_PAPERS) {
      for (const q of allQuestions(paper)) {
        for (const st of q.stimulus ?? []) {
          if (st.kind === 'figure') expect(FIGURES[st.figureId], `${q.id} → ${st.figureId}`).toBeTypeOf('function');
        }
      }
    }
  });

  it('НВО 10, 2026: 18 задачи, 120 мин, 40 + 35 + 25 т.', () => {
    const paper = EXAM_PAPERS.find((x) => x.id === 'official-nvo10-math-2026')!;
    expect(allQuestions(paper)).toHaveLength(18);
    expect(paper.durationMinutes).toBe(120);
    expect(paper.sections.map((sec) => sec.questions.reduce((n, q) => n + q.points, 0))).toEqual([40, 35, 25]);
  });
});

describe('НВО 10, формат до 2025 (2021–2025)', () => {
  it.each(['official-nvo10-math-2025', 'official-nvo10-math-2024', 'official-nvo10-math-2023', 'official-nvo10-math-2022'])('%s: 17 задачи, 90 мин, 15 × 4 т. + 2 × 20 т.', (id) => {
    const paper = EXAM_PAPERS.find((x) => x.id === id)!;
    expect(allQuestions(paper)).toHaveLength(17);
    expect(paper.durationMinutes).toBe(90);
    expect(paper.sections.map((sec) => sec.questions.reduce((n, q) => n + q.points, 0))).toEqual([60, 40]);
  });

  it('official-nvo10-math-2021: 17 задачи, 90 мин, 50 т. — 15 × 2 т. + 2 × 10 т.', () => {
    const paper = EXAM_PAPERS.find((x) => x.id === 'official-nvo10-math-2021')!;
    expect(allQuestions(paper)).toHaveLength(17);
    expect(paper.durationMinutes).toBe(90);
    expect(paper.maxPoints).toBe(50);
    expect(paper.sections.map((sec) => sec.questions.reduce((n, q) => n + q.points, 0))).toEqual([30, 20]);
  });
});

describe('задачи с подточки', () => {
  const paper = EXAM_PAPERS.find((x) => x.id === 'official-nvo10-math-2026')!;
  const find = (id: string) => allQuestions(paper).find((q) => q.id === id) as MultiPartQuestion;
  const q14 = find('m26-q14');
  const q15 = find('m26-q15');
  const q16 = find('m26-q16');

  it('половин точки: само А) на 15. носи 1,5 т. и задачата е частично решена', () => {
    const r = scorePaper(paper, { [partKey(q15, q15.parts[0])]: 'I = 10 A' }, {});
    const res = r.questions.find((x) => x.id === 'm26-q15')!;
    expect(res.points).toBe(1.5);
    expect(res.correct).toBeNull();
    expect(res.partial).toBe(true);
  });

  it('числото се приема с мерна единица и десетична запетая', () => {
    expect(isPartCorrect(q15.parts[2], '4,4 kWh')).toBe(true);
    expect(isPartCorrect(q15.parts[2], 'E = 4.4')).toBe(true);
    expect(isPartCorrect(q15.parts[1], '22 Ω')).toBe(true);
    expect(isPartCorrect(q15.parts[1], '2,2')).toBe(false);
  });

  it('изборът на градове се признава само при точно съвпадение', () => {
    const part = q14.parts[0];
    expect(isPartCorrect(part, [9, 3, 6])).toBe(true);
    expect(isPartCorrect(part, [3, 6])).toBe(false);
    expect(isPartCorrect(part, [3, 6, 9, 0])).toBe(false);
  });

  it('вярно/грешно и самооценка на израз', () => {
    expect(isPartCorrect(q16.parts[1], true)).toBe(true);
    expect(isPartCorrect(q16.parts[1], false)).toBe(false);
    const r = scorePaper(paper, {}, { [partKey(q16, q16.parts[2])]: 2 });
    expect(r.questions.find((x) => x.id === 'm26-q16')!.points).toBe(2);
    expect(r.selfAssessedPoints).toBe(2);
  });

  it('самооценката се закръгля до половин точка и не надхвърля максимума', () => {
    const r = scorePaper(paper, {}, { 'm26-q17': 7.3, 'm26-q18': 99 });
    expect(r.questions.find((x) => x.id === 'm26-q17')!.points).toBe(7.5);
    expect(r.questions.find((x) => x.id === 'm26-q18')!.points).toBe(13);
  });

  it('валидацията хваща подточки, чийто сбор не е равен на точките на задачата', () => {
    const broken = { ...q15, points: 6 };
    const p2: ExamPaper = {
      ...paper,
      maxPoints: 101,
      sections: paper.sections.map((sec) => ({ ...sec, questions: sec.questions.map((q) => (q.id === q15.id ? broken : q)) }))
    };
    expect(validateExamPaper(p2).join('\n')).toMatch(/подточките дават 5 т\., а задачата е за 6/);
  });
});

describe('другите предмети в НВО 10 — примерни задачи на МОН', () => {
  const samples = EXAM_PAPERS.filter((p) => p.kind === 'sample');

  it('по един набор за всеки от четирите предмета, без таймер', () => {
    expect(samples.map((p) => p.subject).sort()).toEqual(
      ['Биология и здравно образование', 'География и икономика', 'Физика и астрономия', 'Химия и опазване на околната среда'].sort()
    );
    for (const p of samples) {
      expect(p.untimed, p.id).toBe(true);
      expect(p.exam).toBe('НВО 10');
    }
  });

  it('първо са задачите от НВО 2026 (с ключа на МОН), после примерните; всяка задача е по предмета на набора', () => {
    const nvo2026 = EXAM_PAPERS.find((p) => p.id === 'official-nvo10-math-2026')!;
    const official2026 = new Map(allQuestions(nvo2026).map((q) => [q.id, q]));
    for (const p of samples) {
      expect(p.sections.map((s) => s.id), p.id).toEqual(['nvo2026', 'samples']);
      for (const q of p.sections[0].questions) {
        const src = official2026.get(q.id)!;
        expect(src, q.id).toBeDefined();
        expect({ ...q, number: src.number }).toEqual(src);
      }
      for (const q of allQuestions(p)) expect(q.topic, q.id).toBe(p.subject);
      expect(p.sections[1].questions.length, p.id).toBeGreaterThanOrEqual(9);
    }
  });
});

describe('ДЗИ по математика — профилирана подготовка', () => {
  it.each(['official-dzi-math-2026', 'official-dzi-math-2025', 'official-dzi-math-2024', 'official-dzi-math-2023', 'official-dzi-math-2022'])('%s: 18 задачи, 240 мин, част 1 — 55 т., част 2 — 3 × 15 т., без оценка', (id) => {
    const paper = EXAM_PAPERS.find((x) => x.id === id)!;
    expect(paper.exam).toBe('ДЗИ');
    expect(allQuestions(paper)).toHaveLength(18);
    expect(paper.durationMinutes).toBe(240);
    expect(paper.gradeScale).toBeNull();
    expect(paper.sections.map((sec) => sec.questions.reduce((n, q) => n + q.points, 0))).toEqual([55, 45]);
    expect(paper.sections[1].questions.every((q) => q.kind === 'open' && q.points === 15)).toBe(true);
  });
});

describe('ДЗИ по математика — формат до 2021 г.', () => {
  it('official-dzi-math-2021: 28 задачи в два модула — 50 + 20 + 30 т., без оценка', () => {
    const paper = EXAM_PAPERS.find((x) => x.id === 'official-dzi-math-2021')!;
    expect(allQuestions(paper)).toHaveLength(28);
    expect(paper.durationMinutes).toBe(240);
    expect(paper.gradeScale).toBeNull();
    expect(paper.sections.map((sec) => sec.questions.reduce((n, q) => n + q.points, 0))).toEqual([50, 20, 30]);
  });
});
