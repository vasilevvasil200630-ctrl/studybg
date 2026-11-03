import type { LessonData } from '../../types';
import { MON_LESSONS_PP_MUZ_M1 } from './ppMuzM1';
import { MON_LESSONS_PP_MUZ_M2 } from './ppMuzM2';

// ПП Музика — по един урок за всяка подтема от четирите модула на учебната програма на МОН
export const MON_LESSONS_PP_MUZIKA: LessonData[] = [
  ...MON_LESSONS_PP_MUZ_M1,
  ...MON_LESSONS_PP_MUZ_M2,
];
