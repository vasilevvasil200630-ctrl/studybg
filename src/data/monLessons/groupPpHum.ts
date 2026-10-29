import type { LessonData } from '../../types';
import { MON_LESSONS_PP_ARTS } from './ppArts';
import { MON_LESSONS_PP_BEL } from './ppBel';
import { MON_LESSONS_PP_GEO } from './ppGeo';
import { MON_LESSONS_PP_HISTORY } from './ppHistory';
import { MON_LESSONS_PP_MUZIKA } from './ppMuzika';
import { MON_LESSONS_PP_PHIL } from './ppPhil';
import { MON_LESSONS_PP_PREDPRIEMACHESTVO } from './ppPredpriemachestvo';

export const MON_LESSONS_GROUP_PP_HUM: LessonData[] = [
  ...MON_LESSONS_PP_BEL,
  ...MON_LESSONS_PP_HISTORY,
  ...MON_LESSONS_PP_PHIL,
  ...MON_LESSONS_PP_PREDPRIEMACHESTVO,
  ...MON_LESSONS_PP_GEO,
  ...MON_LESSONS_PP_ARTS,
  ...MON_LESSONS_PP_MUZIKA,
];
