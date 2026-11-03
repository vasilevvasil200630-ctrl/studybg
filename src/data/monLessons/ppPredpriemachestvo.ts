import type { LessonData } from '../../types';
import { MON_LESSONS_PP_PRED_M1 } from './ppPredM1';
import { MON_LESSONS_PP_PRED_M2 } from './ppPredM2';
import { MON_LESSONS_PP_PRED_M3 } from './ppPredM3';
import { MON_LESSONS_PP_PRED_M4 } from './ppPredM4';

// ПП Предприемачество — по един урок за всяка подтема от четирите модула на учебната програма на МОН
export const MON_LESSONS_PP_PREDPRIEMACHESTVO: LessonData[] = [
  ...MON_LESSONS_PP_PRED_M1,
  ...MON_LESSONS_PP_PRED_M2,
  ...MON_LESSONS_PP_PRED_M3,
  ...MON_LESSONS_PP_PRED_M4,
];
