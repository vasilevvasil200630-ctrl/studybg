import { describe, expect, it } from 'vitest';
import { EXAM_PAPERS } from '../src/data/examPapers';
import { NVO10_FORMAT_2027, nvo10FormatTag } from '../src/data/examFormats';

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
});
