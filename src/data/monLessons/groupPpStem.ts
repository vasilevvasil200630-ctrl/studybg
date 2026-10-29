import type { LessonData } from '../../types';
import { MON_LESSONS_PP_BIO } from './ppBio';
import { MON_LESSONS_PP_FA } from './ppFa';
import { MON_LESSONS_PP_HIMIA } from './ppHimia';
import { MON_LESSONS_PP_INFORMATIKA } from './ppInformatika';
import { MON_LESSONS_PP_IT } from './ppIt';
import { MON_LESSONS_PP_MATH } from './ppMath';

export const MON_LESSONS_GROUP_PP_STEM: LessonData[] = [
  ...MON_LESSONS_PP_BIO,
  ...MON_LESSONS_PP_FA,
  ...MON_LESSONS_PP_IT,
  ...MON_LESSONS_PP_HIMIA,
  ...MON_LESSONS_PP_MATH,
  ...MON_LESSONS_PP_INFORMATIKA,
];
