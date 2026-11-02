import type { LessonData } from '../../types';
import { MON_LESSONS_PP_MATH_M1 } from './ppMathM1';
import { MON_LESSONS_PP_MATH_M2 } from './ppMathM2';
import { MON_LESSONS_PP_MATH_M3 } from './ppMathM3';
import { MON_LESSONS_PP_MATH_M4 } from './ppMathM4';

// ПП Математика — по един урок за всяка подтема от четирите модула на учебната програма на МОН
export const MON_LESSONS_PP_MATH: LessonData[] = [
  ...MON_LESSONS_PP_MATH_M1,
  ...MON_LESSONS_PP_MATH_M2,
  ...MON_LESSONS_PP_MATH_M3,
  ...MON_LESSONS_PP_MATH_M4,
];
