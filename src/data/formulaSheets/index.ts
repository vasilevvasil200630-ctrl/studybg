import { DZI_MATH_2021_FORMULAS, DZI_MATH_FORMULAS } from './dziMath';
import { NVO10_MATH_FORMULAS, type FormulaSheet } from './nvo10Math';
import { DZI_PHYSICS_FORMULAS } from './dziPhysics';
import { DZI_CHEMISTRY_FORMULAS } from './dziChemistry';
import { DZI_BIOLOGY_FORMULAS } from './dziBiology';
import { DZI_INFORMATICS_FORMULAS } from './dziInformatics';
import { DZI_GEO_ECON_FORMULAS } from './dziGeographyEcon';
import type { ExamPaper } from '../../lib/examPaperScoring';

export type FormulaSheetId = NonNullable<ExamPaper['formulaSheet']>;

/** Листовете с формули, които вариантите отварят по `formulaSheet` */
export const FORMULA_SHEETS: Record<FormulaSheetId, FormulaSheet> = {
  'nvo10-math': NVO10_MATH_FORMULAS,
  'dzi-math': DZI_MATH_FORMULAS,
  'dzi-math-2021': DZI_MATH_2021_FORMULAS,
  'dzi-physics': DZI_PHYSICS_FORMULAS,
  'dzi-chemistry': DZI_CHEMISTRY_FORMULAS,
  'dzi-biology': DZI_BIOLOGY_FORMULAS,
  'dzi-informatics': DZI_INFORMATICS_FORMULAS,
  'dzi-geography-econ': DZI_GEO_ECON_FORMULAS,
};
