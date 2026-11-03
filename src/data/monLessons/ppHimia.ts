import type { LessonData } from '../../types';
import { MON_LESSONS_PP_HIM_M1 } from './ppHimM1';
import { MON_LESSONS_PP_HIM_M2 } from './ppHimM2';
import { MON_LESSONS_PP_HIM_M3 } from './ppHimM3';
import { MON_LESSONS_PP_HIM_M4 } from './ppHimM4';

// ПП Химия и опазване на околната среда — по един урок за всяка подтема от четирите модула на учебната програма на МОН
export const MON_LESSONS_PP_HIMIA: LessonData[] = [
  ...MON_LESSONS_PP_HIM_M1,
  ...MON_LESSONS_PP_HIM_M2,
  ...MON_LESSONS_PP_HIM_M3,
  ...MON_LESSONS_PP_HIM_M4,
];
