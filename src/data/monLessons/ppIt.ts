import type { LessonData } from '../../types';
import { MON_LESSONS_PP_IT_M1 } from './ppItM1';
import { MON_LESSONS_PP_IT_M2 } from './ppItM2';
import { MON_LESSONS_PP_IT_M3 } from './ppItM3';
import { MON_LESSONS_PP_IT_M4 } from './ppItM4';

// ПП Информационни технологии — по един урок за всяка подтема от четирите модула на учебната програма на МОН
export const MON_LESSONS_PP_IT: LessonData[] = [...MON_LESSONS_PP_IT_M1, ...MON_LESSONS_PP_IT_M2, ...MON_LESSONS_PP_IT_M3, ...MON_LESSONS_PP_IT_M4];
