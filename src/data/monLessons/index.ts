import type { LessonData } from '../../types';
import { MON_LESSONS_BEL_8 } from './bel8';
import { MON_LESSONS_BEL_9 } from './bel9';
import { MON_LESSONS_BEL_10 } from './bel10';
import { MON_LESSONS_BEL_11 } from './bel11';
import { MON_LESSONS_BEL_12 } from './bel12';
import { MON_LESSONS_BIO_8 } from './bio8';
import { MON_LESSONS_BIO_9 } from './bio9';
import { MON_LESSONS_BIO_10 } from './bio10';
import { MON_LESSONS_CHEM_8 } from './chem8';
import { MON_LESSONS_CHEM_9 } from './chem9';
import { MON_LESSONS_CHEM_10 } from './chem10';
import { MON_LESSONS_CIV_11 } from './civ11';
import { MON_LESSONS_CIV_12 } from './civ12';
import { MON_LESSONS_DE_A1 } from './deA1';
import { MON_LESSONS_DE_A2_8 } from './deA28';
import { MON_LESSONS_DE_A2_11 } from './deA211';
import { MON_LESSONS_DE_B11_8 } from './deB118';
import { MON_LESSONS_DE_B11 } from './deB11';
import { MON_LESSONS_DE_B1 } from './deB1';
import { MON_LESSONS_DE_B21 } from './deB21';
import { MON_LESSONS_EN_A1 } from './enA1';
import { MON_LESSONS_EN_A2_8 } from './enA28';
import { MON_LESSONS_EN_A2_11 } from './enA211';
import { MON_LESSONS_EN_B11_8 } from './enB118';
import { MON_LESSONS_EN_B11 } from './enB11';
import { MON_LESSONS_EN_B1 } from './enB1';
import { MON_LESSONS_EN_B21 } from './enB21';
import { MON_LESSONS_GEO_8 } from './geo8';
import { MON_LESSONS_GEO_9 } from './geo9';
import { MON_LESSONS_GEO_10 } from './geo10';
import { MON_LESSONS_HIST_8 } from './hist8';
import { MON_LESSONS_HIST_9 } from './hist9';
import { MON_LESSONS_HIST_10A } from './hist10a';
import { MON_LESSONS_HIST_10B } from './hist10b';
import { MON_LESSONS_HIST_10C } from './hist10c';
import { MON_LESSONS_INF_8 } from './inf8';
import { MON_LESSONS_IT_8 } from './it8';
import { MON_LESSONS_IT_9 } from './it9';
import { MON_LESSONS_IT_10 } from './it10';
import { MON_LESSONS_LIT_8 } from './lit8';
import { MON_LESSONS_LIT_9 } from './lit9';
import { MON_LESSONS_LIT_10 } from './lit10';
import { MON_LESSONS_LIT_11 } from './lit11';
import { MON_LESSONS_LIT_12 } from './lit12';
import { MON_LESSONS_MATH_8 } from './math8';
import { MON_LESSONS_MATH_9 } from './math9';
import { MON_LESSONS_MATH_10 } from './math10';
import { MON_LESSONS_MATH_11 } from './math11';
import { MON_LESSONS_MATH_12 } from './math12';
import { MON_LESSONS_PHYS_8 } from './phys8';
import { MON_LESSONS_PHYS_9 } from './phys9';
import { MON_LESSONS_PHIL_8 } from './phil8';
import { MON_LESSONS_PHIL_9 } from './phil9';
import { MON_LESSONS_PHIL_10 } from './phil10';
import { MON_LESSONS_PHYS_10 } from './phys10';
import { MON_LESSONS_PP_BEL } from './ppBel';
import { MON_LESSONS_PP_BIO } from './ppBio';
import { MON_LESSONS_PP_FA } from './ppFa';
import { MON_LESSONS_PP_GEO } from './ppGeo';
import { MON_LESSONS_PP_HIMIA } from './ppHimia';
import { MON_LESSONS_PP_HISTORY } from './ppHistory';
import { MON_LESSONS_PP_IT } from './ppIt';
import { MON_LESSONS_PP_MATH } from './ppMath';
import { MON_LESSONS_PP_PHIL } from './ppPhil';
import { MON_LESSONS_PP_PREDPRIEMACHESTVO } from './ppPredpriemachestvo';
import { MON_LESSONS_TP_8 } from './tp8';
import { MON_LESSONS_TP_9 } from './tp9';

// Уроци, написани по темите от каталога на МОН (monTopicIds) — пълнят се по класове и предмети
export const MON_LESSONS: LessonData[] = [
  ...MON_LESSONS_MATH_8,
  ...MON_LESSONS_BEL_8,
  ...MON_LESSONS_LIT_8,
  ...MON_LESSONS_MATH_9,
  ...MON_LESSONS_BEL_9,
  ...MON_LESSONS_LIT_9,
  ...MON_LESSONS_MATH_10,
  ...MON_LESSONS_BEL_10,
  ...MON_LESSONS_LIT_10,
  ...MON_LESSONS_MATH_11,
  ...MON_LESSONS_BEL_11,
  ...MON_LESSONS_LIT_11,
  ...MON_LESSONS_MATH_12,
  ...MON_LESSONS_BEL_12,
  ...MON_LESSONS_LIT_12,
  ...MON_LESSONS_BIO_8,
  ...MON_LESSONS_CHEM_8,
  ...MON_LESSONS_PHYS_8,
  ...MON_LESSONS_BIO_9,
  ...MON_LESSONS_CHEM_9,
  ...MON_LESSONS_PHYS_9,
  ...MON_LESSONS_BIO_10,
  ...MON_LESSONS_CHEM_10,
  ...MON_LESSONS_PHYS_10,
  ...MON_LESSONS_GEO_8,
  ...MON_LESSONS_GEO_9,
  ...MON_LESSONS_GEO_10,
  ...MON_LESSONS_PHIL_8,
  ...MON_LESSONS_PHIL_9,
  ...MON_LESSONS_PHIL_10,
  ...MON_LESSONS_HIST_8,
  ...MON_LESSONS_HIST_9,
  ...MON_LESSONS_HIST_10A,
  ...MON_LESSONS_HIST_10B,
  ...MON_LESSONS_HIST_10C,
  ...MON_LESSONS_CIV_11,
  ...MON_LESSONS_CIV_12,
  ...MON_LESSONS_INF_8,
  ...MON_LESSONS_IT_8,
  ...MON_LESSONS_IT_9,
  ...MON_LESSONS_IT_10,
  ...MON_LESSONS_EN_A1,
  ...MON_LESSONS_EN_A2_8,
  ...MON_LESSONS_EN_A2_11,
  ...MON_LESSONS_EN_B11_8,
  ...MON_LESSONS_EN_B11,
  ...MON_LESSONS_EN_B1,
  ...MON_LESSONS_EN_B21,
  ...MON_LESSONS_DE_A1,
  ...MON_LESSONS_DE_A2_8,
  ...MON_LESSONS_DE_A2_11,
  ...MON_LESSONS_DE_B11_8,
  ...MON_LESSONS_DE_B11,
  ...MON_LESSONS_DE_B1,
  ...MON_LESSONS_DE_B21,
  ...MON_LESSONS_TP_8,
  ...MON_LESSONS_TP_9,
  ...MON_LESSONS_PP_BEL,
  ...MON_LESSONS_PP_HISTORY,
  ...MON_LESSONS_PP_BIO,
  ...MON_LESSONS_PP_FA,
  ...MON_LESSONS_PP_IT,
  ...MON_LESSONS_PP_HIMIA,
  ...MON_LESSONS_PP_PHIL,
  ...MON_LESSONS_PP_PREDPRIEMACHESTVO,
  ...MON_LESSONS_PP_MATH,
  ...MON_LESSONS_PP_GEO,
];
