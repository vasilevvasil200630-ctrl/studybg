import type { ExamPaper } from '../../lib/examPaperScoring';
import { DIPPK_SOFTWARE_PRACTICE_1 } from './softwareEngineering';
import { DIPPK_ECON_PRACTICE_1 } from './economicsAccounting';
import { DIPPK_CONSTR_PRACTICE_1 } from './constructionArchitecture';
import { DIPPK_ELECTRO_PRACTICE_1 } from './electrotechMechatronics';
import { DIPPK_AUTO_PRACTICE_1 } from './automotiveMechanical';
import { DIPPK_TOURISM_PRACTICE_1 } from './hospitalityTourism';
import { DIPPK_BIOTECH_PRACTICE_1 } from './biotechAgroVet';
import { DIPPK_DESIGN_PRACTICE_1 } from './graphicDesignMedia';

/**
 * Пълни тренировъчни варианти за ДИППК (12. клас — Държавен изпит за придобиване на
 * професионална квалификация, трета степен СПК) по Наредба № 1 на МОН:
 * 240 минути, 100 точки, праг за успешно полагане 50 точки (Среден 3,00).
 */
export const DIPPK_PAPERS: ExamPaper[] = [
  DIPPK_SOFTWARE_PRACTICE_1,
  DIPPK_ECON_PRACTICE_1,
  DIPPK_CONSTR_PRACTICE_1,
  DIPPK_ELECTRO_PRACTICE_1,
  DIPPK_AUTO_PRACTICE_1,
  DIPPK_TOURISM_PRACTICE_1,
  DIPPK_BIOTECH_PRACTICE_1,
  DIPPK_DESIGN_PRACTICE_1,
];

export {
  DIPPK_SOFTWARE_PRACTICE_1,
  DIPPK_ECON_PRACTICE_1,
  DIPPK_CONSTR_PRACTICE_1,
  DIPPK_ELECTRO_PRACTICE_1,
  DIPPK_AUTO_PRACTICE_1,
  DIPPK_TOURISM_PRACTICE_1,
  DIPPK_BIOTECH_PRACTICE_1,
  DIPPK_DESIGN_PRACTICE_1,
};
