import type { LessonData } from '../../types';
import { MON_LESSONS_BEL_8 } from './bel8';
import { MON_LESSONS_BEL_9 } from './bel9';
import { MON_LESSONS_BEL_10 } from './bel10';
import { MON_LESSONS_BEL_11 } from './bel11';
import { MON_LESSONS_LIT_8 } from './lit8';
import { MON_LESSONS_LIT_9 } from './lit9';
import { MON_LESSONS_LIT_10 } from './lit10';
import { MON_LESSONS_LIT_11 } from './lit11';
import { MON_LESSONS_MATH_8 } from './math8';
import { MON_LESSONS_MATH_9 } from './math9';
import { MON_LESSONS_MATH_10 } from './math10';
import { MON_LESSONS_MATH_11 } from './math11';

// Уроци, написани по темите от каталога на МОН (monTopicIds) — пълнят се по класове и предмети
export const MON_LESSONS: LessonData[] = [
  ...MON_LESSONS_MATH_8,
  ...MON_LESSONS_BEL_8,
  ...MON_LESSONS_LIT_8,
  ...MON_LESSONS_MATH_9,
  ...MON_LESSONS_BEL_9,
  ...MON_LESSONS_LIT_9,
  ...MON_LESSONS_MATH_10,
  ...MON_LESSONS_BEL_10,
  ...MON_LESSONS_LIT_10,
  ...MON_LESSONS_MATH_11,
  ...MON_LESSONS_BEL_11,
  ...MON_LESSONS_LIT_11,
];
