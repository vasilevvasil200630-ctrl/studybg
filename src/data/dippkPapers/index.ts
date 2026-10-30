import type { ExamPaper } from '../../lib/examPaperScoring';
import { DIPPK_SOFTWARE_PRACTICE_1 } from './softwareEngineering';
import { DIPPK_ECON_PRACTICE_1 } from './economicsAccounting';
import { DIPPK_CONSTR_PRACTICE_1 } from './constructionArchitecture';
import { DIPPK_ELECTRO_PRACTICE_1 } from './electrotechMechatronics';
import { DIPPK_AUTO_PRACTICE_1 } from './automotiveMechanical';
import { DIPPK_TOURISM_PRACTICE_1 } from './hospitalityTourism';
import { DIPPK_BIOTECH_PRACTICE_1 } from './biotechAgroVet';
import { DIPPK_DESIGN_PRACTICE_1 } from './graphicDesignMedia';
import {
  DIPPK_NETWORKS_CYBER_1,
  DIPPK_LOGISTICS_SPEDITION_1,
  DIPPK_FOOD_TECH_1,
} from './networksAndLogistics';
import {
  DIPPK_FASHION_INTERIOR_1,
  DIPPK_SOFTWARE_PRACTICE_2,
  DIPPK_ECON_PRACTICE_2,
} from './fashionAndVariant2';
import {
  DIPPK_NETWORKS_CYBER_2,
  DIPPK_LOGISTICS_SPEDITION_2,
  DIPPK_CONSTR_PRACTICE_2,
} from './variant2/networks_logistics_constr_v2';
import {
  DIPPK_ELECTRO_PRACTICE_2,
  DIPPK_AUTO_PRACTICE_2,
} from './variant2/electro_auto_v2';
import {
  DIPPK_TOURISM_PRACTICE_2,
  DIPPK_FOOD_TECH_2,
} from './variant2/tourism_food_v2';
import {
  DIPPK_BIOTECH_PRACTICE_2,
  DIPPK_DESIGN_PRACTICE_2,
} from './variant2/biotech_design_v2';
import { DIPPK_FASHION_INTERIOR_2 } from './variant2/fashion_v2';

/**
 * Пълни тренировъчни варианти за ДИППК (12. клас — Държавен изпит за придобиване на
 * професионална квалификация, трета степен СПК) по Наредба № 1 на МОН:
 * 240 минути, 100 точки, праг за успешно полагане 50 точки (Среден 3,00).
 * 12 професионални направления × 2 пълни варианта = 24 изпитни комплекта.
 */
export const DIPPK_PAPERS: ExamPaper[] = [
  DIPPK_SOFTWARE_PRACTICE_1,
  DIPPK_SOFTWARE_PRACTICE_2,
  DIPPK_NETWORKS_CYBER_1,
  DIPPK_NETWORKS_CYBER_2,
  DIPPK_ECON_PRACTICE_1,
  DIPPK_ECON_PRACTICE_2,
  DIPPK_LOGISTICS_SPEDITION_1,
  DIPPK_LOGISTICS_SPEDITION_2,
  DIPPK_CONSTR_PRACTICE_1,
  DIPPK_CONSTR_PRACTICE_2,
  DIPPK_ELECTRO_PRACTICE_1,
  DIPPK_ELECTRO_PRACTICE_2,
  DIPPK_AUTO_PRACTICE_1,
  DIPPK_AUTO_PRACTICE_2,
  DIPPK_TOURISM_PRACTICE_1,
  DIPPK_TOURISM_PRACTICE_2,
  DIPPK_FOOD_TECH_1,
  DIPPK_FOOD_TECH_2,
  DIPPK_BIOTECH_PRACTICE_1,
  DIPPK_BIOTECH_PRACTICE_2,
  DIPPK_DESIGN_PRACTICE_1,
  DIPPK_DESIGN_PRACTICE_2,
  DIPPK_FASHION_INTERIOR_1,
  DIPPK_FASHION_INTERIOR_2,
];

export {
  DIPPK_SOFTWARE_PRACTICE_1,
  DIPPK_SOFTWARE_PRACTICE_2,
  DIPPK_NETWORKS_CYBER_1,
  DIPPK_NETWORKS_CYBER_2,
  DIPPK_ECON_PRACTICE_1,
  DIPPK_ECON_PRACTICE_2,
  DIPPK_LOGISTICS_SPEDITION_1,
  DIPPK_LOGISTICS_SPEDITION_2,
  DIPPK_CONSTR_PRACTICE_1,
  DIPPK_CONSTR_PRACTICE_2,
  DIPPK_ELECTRO_PRACTICE_1,
  DIPPK_ELECTRO_PRACTICE_2,
  DIPPK_AUTO_PRACTICE_1,
  DIPPK_AUTO_PRACTICE_2,
  DIPPK_TOURISM_PRACTICE_1,
  DIPPK_TOURISM_PRACTICE_2,
  DIPPK_FOOD_TECH_1,
  DIPPK_FOOD_TECH_2,
  DIPPK_BIOTECH_PRACTICE_1,
  DIPPK_BIOTECH_PRACTICE_2,
  DIPPK_DESIGN_PRACTICE_1,
  DIPPK_DESIGN_PRACTICE_2,
  DIPPK_FASHION_INTERIOR_1,
  DIPPK_FASHION_INTERIOR_2,
};
