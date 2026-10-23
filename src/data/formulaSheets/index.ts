import { DZI_MATH_2021_FORMULAS, DZI_MATH_FORMULAS } from './dziMath';
import { NVO10_MATH_FORMULAS, type FormulaSheet } from './nvo10Math';

/** Листовете с формули, които вариантите отварят по `formulaSheet` */
export const FORMULA_SHEETS: Record<'nvo10-math' | 'dzi-math' | 'dzi-math-2021', FormulaSheet> = {
  'nvo10-math': NVO10_MATH_FORMULAS,
  'dzi-math': DZI_MATH_FORMULAS,
  'dzi-math-2021': DZI_MATH_2021_FORMULAS,
};
