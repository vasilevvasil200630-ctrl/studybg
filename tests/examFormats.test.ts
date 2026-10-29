import { describe, expect, it } from 'vitest';
import { EXAM_PAPERS } from '../src/data/examPapers';
import { NVO10_BEL_FORMAT_2027, NVO10_FORMAT_2027, nvo10FormatTag } from '../src/data/examFormats';

describe('формат на НВО 10 за 2027 г. (модел на МОН)', () => {
  it('разпределението съвпада с модела: 8 + 6 + 2 = 16 задачи, 10 по математика', () => {
    const d = NVO10_FORMAT_2027.distribution;
    expect(d.reduce((n, r) => n + r.choice, 0)).toBe(8);
    expect(d.reduce((n, r) => n + r.short, 0)).toBe(6);
    expect(d.reduce((n, r) => n + r.open, 0)).toBe(2);
    const math = d.find((r) => r.subject === 'Математика')!;
    expect(math.choice + math.short + math.open).toBe(10);
    expect(NVO10_FORMAT_2027.facts.find((f) => f.label === 'Задачи')?.value).toBe('16');
  });

  it('етикетите: 2026 е най-близо до изпита, 2021–2025 са стар формат, тренировъчният не следва МОН', () => {
    const tag = (id: string) => nvo10FormatTag(EXAM_PAPERS.find((p) => p.id === id)!);
    expect(tag('official-nvo10-math-2026')?.tone).toBe('current');
    for (const y of [2021, 2022, 2023, 2024, 2025]) expect(tag(`official-nvo10-math-${y}`)?.tone).toBe('legacy');
    expect(tag('practice-nvo10-math-1')?.label).toContain('не следва формата на МОН');
    expect(tag('practice-dzi-bel-1')).toBeNull();
  });

  it('БЕЛ през 2027 г.: 22 задачи (18 + 4), 120 мин — по модела и по заповедта на МОН', () => {
    const f = NVO10_BEL_FORMAT_2027;
    expect(f.facts.find((x) => x.label === 'Задачи')?.value).toBe('22');
    expect(f.facts.find((x) => x.label === 'Време')?.value).toBe('120 мин');
    expect(f.bySubject.reduce((n, r) => n + r.tasks, 0)).toBe(22);
    expect(f.bySubject.map((r) => r.tasks)).toEqual([18, 4]);
    expect(f.byType.reduce((n, r) => n + r.tasks, 0)).toBe(22);
    expect(f.byType[0]).toEqual({ type: 'С избираем отговор', tasks: 13 });
  });

  it('вариантите по БЕЛ досега са без история и философия; наборът с примерни задачи — без етикет', () => {
    const tag = (id: string) => nvo10FormatTag(EXAM_PAPERS.find((p) => p.id === id)!);
    for (const y of [2021, 2022, 2023, 2024, 2025, 2026]) {
      expect(tag(`official-nvo10-bel-${y}`)?.tone).toBe('legacy');
      expect(tag(`official-nvo10-bel-${y}`)?.label).toContain('Без история и философия');
    }
    expect(tag('sample-nvo10-bel-2027')).toBeNull();
    expect(tag('practice-nvo10-math-2027-1')?.tone).toBe('current');
    expect(tag('practice-nvo10-bel-2027-1')?.tone).toBe('current');

    const math27 = EXAM_PAPERS.find((p) => p.id === 'practice-nvo10-math-2027-1')!;
    expect(math27.sections.flatMap((s) => s.questions)).toHaveLength(16);
    expect(math27.durationMinutes).toBe(120);
    expect(math27.maxPoints).toBe(100);

    const bel27 = EXAM_PAPERS.find((p) => p.id === 'practice-nvo10-bel-2027-1')!;
    expect(bel27.sections.flatMap((s) => s.questions)).toHaveLength(22);
    expect(bel27.durationMinutes).toBe(120);
    expect(bel27.maxPoints).toBe(100);
  });
});
