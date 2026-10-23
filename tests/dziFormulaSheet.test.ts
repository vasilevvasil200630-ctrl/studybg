import { it, expect } from 'vitest';
import katex from 'katex';
import { DZI_MATH_FORMULAS, DZI_MATH_2021_FORMULAS } from '../src/data/formulaSheets/dziMath';
it('листовете за ДЗИ: всяка формула и клетка се рендерира от KaTeX', () => {
  for (const s of [DZI_MATH_FORMULAS, DZI_MATH_2021_FORMULAS]) {
    const texts = s.groups.flatMap((g) => [...g.entries.flatMap((e) => [...e.tex, ...[...e.label.matchAll(/\$([^$]+)\$/g)].map((m) => m[1])]), ...(g.tables ?? []).flatMap((t) => [...t.head, ...t.rows.flat()].flatMap((c) => [...c.matchAll(/\$([^$]+)\$/g)].map((m) => m[1])))]);
    for (const tex of texts) expect(() => katex.renderToString(tex, { throwOnError: true, strict: 'ignore' }), tex).not.toThrow();
  }
});
