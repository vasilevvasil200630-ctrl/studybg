import { describe, expect, it } from 'vitest';
import { MON_OFFICIAL_EXAMS, nextExamSession } from '../src/services/studyProgressService';

const exam = (id: string) => MON_OFFICIAL_EXAMS.find((e) => e.id === id)!;
const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

describe('графикът на МОН за 2026/2027 (Заповед № РД09-3345/31.08.2026)', () => {
  it('датите са от заповедта', () => {
    expect(exam('dzi_bel').sessions.map((s) => s.date)).toEqual(['2027-05-19']);
    expect(exam('dzi_history').sessions.map((s) => s.date)).toEqual(['2027-05-21']);
    expect(exam('nvo_10').sessions.map((s) => s.date)).toEqual(['2027-06-18', '2027-06-21']);
  });

  it('следващият изпитен ден е първата неминала дата; в деня на изпита — същият ден', () => {
    const oct = new Date(2026, 9, 24, 15, 0);
    expect(ymd(nextExamSession(exam('dzi_bel'), oct).date)).toBe('2027-05-19');
    expect(nextExamSession(exam('dzi_bel'), oct).official).toBe(true);
    expect(ymd(nextExamSession(exam('nvo_10'), new Date(2027, 5, 18, 20, 0)).date)).toBe('2027-06-18');
    const afterBel = nextExamSession(exam('nvo_10'), new Date(2027, 5, 19, 9, 0));
    expect(ymd(afterBel.date)).toBe('2027-06-21');
    expect(afterBel.label).toMatch(/математика/);
  });

  it('след последната дата — ориентир за следващата година, отбелязан като неофициален', () => {
    const next = nextExamSession(exam('nvo_10'), new Date(2027, 5, 22));
    expect(ymd(next.date)).toBe('2028-06-18');
    expect(next.official).toBe(false);
  });

  it('НВО 10 няма праг за успех; за ДЗИ скалата е на МОН за сесията', () => {
    expect(exam('nvo_10').resultText).toMatch(/няма праг/);
    for (const id of ['dzi_bel', 'dzi_history', 'dzi_stem']) expect(exam(id).resultText).toMatch(/скалата на МОН/);
  });
});
