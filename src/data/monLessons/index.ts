import type { LessonData } from '../../types';
import { MON_LESSONS_GROUP_OOP_STEM } from './groupOopStem';
import { MON_LESSONS_GROUP_OOP_HUM } from './groupOopHum';
import { MON_LESSONS_GROUP_LANG } from './groupLang';
import { MON_LESSONS_GROUP_PP_STEM } from './groupPpStem';
import { MON_LESSONS_GROUP_PP_HUM } from './groupPpHum';

// Уроци, написани по темите от каталога на МОН (monTopicIds) — разделени в 5 динамични пакета по етапи и предмети
export const MON_LESSONS: LessonData[] = [
  ...MON_LESSONS_GROUP_OOP_STEM,
  ...MON_LESSONS_GROUP_OOP_HUM,
  ...MON_LESSONS_GROUP_LANG,
  ...MON_LESSONS_GROUP_PP_STEM,
  ...MON_LESSONS_GROUP_PP_HUM,
];
