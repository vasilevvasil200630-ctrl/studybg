import type { LessonData } from '../../types';
import { MON_LESSONS_PP_GEO_M1 } from './ppGeoM1';
import { MON_LESSONS_PP_GEO_M2 } from './ppGeoM2';
import { MON_LESSONS_PP_GEO_M3 } from './ppGeoM3';
import { MON_LESSONS_PP_GEO_M4 } from './ppGeoM4';
import { MON_LESSONS_PP_GEO_M5 } from './ppGeoM5';
import { MON_LESSONS_PP_GEO_M6 } from './ppGeoM6';

// ПП География и икономика — по един урок за всяка подтема от шестте модула на учебната програма на МОН
export const MON_LESSONS_PP_GEO: LessonData[] = [
  ...MON_LESSONS_PP_GEO_M1,
  ...MON_LESSONS_PP_GEO_M2,
  ...MON_LESSONS_PP_GEO_M3,
  ...MON_LESSONS_PP_GEO_M4,
  ...MON_LESSONS_PP_GEO_M5,
  ...MON_LESSONS_PP_GEO_M6,
];
