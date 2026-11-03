import type { LessonData } from '../../types';
import { MON_LESSONS_PP_PHIL_M1 } from './ppPhilM1';
import { MON_LESSONS_PP_PHIL_M2 } from './ppPhilM2';
import { MON_LESSONS_PP_PHIL_M3 } from './ppPhilM3';
import { MON_LESSONS_PP_PHIL_M5 } from './ppPhilM5';

// ПП Философия — по един урок за всяка подтема от шестте модула на учебната програма на МОН
export const MON_LESSONS_PP_PHIL: LessonData[] = [
  ...MON_LESSONS_PP_PHIL_M1,
  ...MON_LESSONS_PP_PHIL_M2,
  ...MON_LESSONS_PP_PHIL_M3,
  ...MON_LESSONS_PP_PHIL_M5,
];
