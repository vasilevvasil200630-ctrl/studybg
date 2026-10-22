import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { FIGURES } from '../src/components/exam-engine/figures';
import { EXAM_PAPERS } from '../src/data/examPapers';
import { NVO10_MATH_FORMULAS, filterFormulaSheet } from '../src/data/formulaSheets/nvo10Math';

const sheet = NVO10_MATH_FORMULAS;
const entries = sheet.groups.flatMap((g) => g.entries);
const inlineTex = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);

describe('лист с формули — НВО 10, математика', () => {
  it('всяка формула, надпис и клетка от таблица се рендерира от KaTeX', () => {
    const texts = [
      ...entries.flatMap((e) => e.tex),
      ...entries.flatMap((e) => inlineTex(e.label)),
      ...sheet.groups.flatMap((g) => (g.tables ?? []).flatMap((t) => [...t.head, ...t.rows.flat()].flatMap(inlineTex))),
    ];
    expect(texts.length).toBeGreaterThan(80);
    for (const tex of texts) {
      expect(() => katex.renderToString(tex, { throwOnError: true, strict: 'ignore' }), tex).not.toThrow();
    }
  });

  it('идентификаторите са уникални, а чертежите съществуват', () => {
    const ids = entries.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const e of entries.filter((x) => x.figureId)) expect(FIGURES[e.figureId!], e.figureId).toBeDefined();
  });

  it('таблицата с тригонометрични стойности е пълна: 10 колони, 4 функции', () => {
    const trig = sheet.groups.find((g) => g.id === 'trigonometry')!;
    expect(trig.tables![0].head).toHaveLength(10);
    expect(trig.tables![0].rows.every((r) => r.length === 10)).toBe(true);
    expect(trig.tables![1].rows.every((r) => r.length === 5)).toBe(true);
  });

  it('търсенето намира по име, ключова дума и заглавие на група', () => {
    expect(filterFormulaSheet(sheet, 'виет', 'all').flatMap((g) => g.entries.map((e) => e.id))).toEqual(['qe-vieta']);
    expect(filterFormulaSheet(sheet, 'ХЕРОН', 'all').flatMap((g) => g.entries.map((e) => e.id))).toEqual(['ar-heron']);
    expect(filterFormulaSheet(sheet, 'sin', 'all').some((g) => g.id === 'trigonometry' && g.tables?.length === 2)).toBe(true);
    expect(filterFormulaSheet(sheet, 'прогресии', 'all').map((g) => g.id)).toEqual(['progressions']);
    expect(filterFormulaSheet(sheet, 'няма-такава', 'all')).toEqual([]);
  });

  it('категорията ограничава групите', () => {
    expect(filterFormulaSheet(sheet, '', 'stereometry').map((g) => g.id)).toEqual(['solids']);
    expect(filterFormulaSheet(sheet, 'виет', 'stereometry')).toEqual([]);
    expect(filterFormulaSheet(sheet, '', 'all')).toHaveLength(sheet.groups.length);
  });

  it('всеки вариант по математика за НВО 10 отваря този лист', () => {
    const math10 = EXAM_PAPERS.filter((p) => p.exam === 'НВО 10' && p.subject === 'Математика');
    expect(math10.length).toBeGreaterThanOrEqual(7);
    for (const p of math10) expect(p.formulaSheet, p.id).toBe('nvo10-math');
  });
});
