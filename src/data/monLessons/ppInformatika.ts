import type { LessonData } from '../../types';
import { MON_LESSONS_PP_INF_M1 } from './ppInfM1';
import { MON_LESSONS_PP_INF_M2 } from './ppInfM2';
import { MON_LESSONS_PP_INF_M3 } from './ppInfM3';
import { MON_LESSONS_PP_INF_M4 } from './ppInfM4';

// ПП Информатика — по един урок за всяка подтема от четирите модула на учебната програма на МОН
export const MON_LESSONS_PP_INFORMATIKA: LessonData[] = [
  ...MON_LESSONS_PP_INF_M1,
  ...MON_LESSONS_PP_INF_M2,
  ...MON_LESSONS_PP_INF_M3,
  ...MON_LESSONS_PP_INF_M4,
];
