import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { DZI_MATH_FORMULAS, DZI_MATH_2021_FORMULAS } from '../src/data/formulaSheets/dziMath';
import { DZI_PHYSICS_FORMULAS } from '../src/data/formulaSheets/dziPhysics';
import { DZI_CHEMISTRY_FORMULAS } from '../src/data/formulaSheets/dziChemistry';
import { DZI_BIOLOGY_FORMULAS } from '../src/data/formulaSheets/dziBiology';
import { DZI_INFORMATICS_FORMULAS } from '../src/data/formulaSheets/dziInformatics';
import { DZI_GEO_ECON_FORMULAS } from '../src/data/formulaSheets/dziGeographyEcon';
import { FORMULA_SHEETS } from '../src/data/formulaSheets';
import { EXAM_PAPERS } from '../src/data/examPapers';

const ALL_DZI_SHEETS = [
  DZI_MATH_FORMULAS,
  DZI_MATH_2021_FORMULAS,
  DZI_PHYSICS_FORMULAS,
  DZI_CHEMISTRY_FORMULAS,
  DZI_BIOLOGY_FORMULAS,
  DZI_INFORMATICS_FORMULAS,
  DZI_GEO_ECON_FORMULAS,
];

describe('листове с формули и справочни таблици за ДЗИ и ДИППК', () => {
  it('всяка формула, надпис и клетка от таблица във всички 7 справочника се рендерира от KaTeX', () => {
    for (const s of ALL_DZI_SHEETS) {
      const ids = s.groups.flatMap((g) => g.entries.map((e) => e.id));
      expect(new Set(ids).size, `Дублирано id в ${s.id}`).toBe(ids.length);

      for (const g of s.groups) {
        for (const t of g.tables ?? []) {
          expect(
            t.rows.every((r) => r.length === t.head.length),
            `Несъответствие в колоните на таблица в ${s.id} / ${g.id}`
          ).toBe(true);
        }
      }

      const texts = s.groups.flatMap((g) => [
        ...g.entries.flatMap((e) => [
          ...e.tex,
          ...[...e.label.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]),
        ]),
        ...(g.tables ?? []).flatMap((t) =>
          [...t.head, ...t.rows.flat()].flatMap((c) => [...c.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]))
        ),
      ]);
      expect(texts.length, s.id).toBeGreaterThan(15);
      for (const tex of texts) {
        expect(() => katex.renderToString(tex, { throwOnError: true, strict: 'ignore' }), `${s.id}: ${tex}`).not.toThrow();
      }
    }
  });

  it('изпитните варианти по профилирани предмети и ДИППК отварят съответния справочен лист', () => {
    const expectedMap: Record<string, keyof typeof FORMULA_SHEETS> = {
      'practice-dzi-phys-1': 'dzi-physics',
      'practice-dzi-chem-1': 'dzi-chemistry',
      'practice-dzi-bio-1': 'dzi-biology',
      'practice-dzi-inf-1': 'dzi-informatics',
      'practice-dzi-it-1': 'dzi-informatics',
      'practice-dzi-geo-1': 'dzi-geography-econ',
      'practice-dzi-entr-1': 'dzi-geography-econ',
      'practice-dippk-software-1': 'dzi-informatics',
      'practice-dippk-econ-1': 'dzi-geography-econ',
      'practice-dippk-constr-1': 'dzi-physics',
      'practice-dippk-electro-1': 'dzi-physics',
      'practice-dippk-auto-1': 'dzi-physics',
      'practice-dippk-tourism-1': 'dzi-geography-econ',
      'practice-dippk-biotech-1': 'dzi-chemistry',
    };
    for (const [paperId, sheetId] of Object.entries(expectedMap)) {
      const paper = EXAM_PAPERS.find((p) => p.id === paperId);
      expect(paper, paperId).toBeDefined();
      expect(paper!.formulaSheet, paperId).toBe(sheetId);
      expect(FORMULA_SHEETS[paper!.formulaSheet!], sheetId).toBeDefined();
    }
  });
});
