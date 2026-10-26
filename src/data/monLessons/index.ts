import type { LessonData } from '../../types';
import { MON_LESSONS_BEL_8 } from './bel8';
import { MON_LESSONS_LIT_8 } from './lit8';
import { MON_LESSONS_MATH_8 } from './math8';

// Уроци, написани по темите от каталога на МОН (monTopicIds) — пълнят се по класове и предмети
export const MON_LESSONS: LessonData[] = [...MON_LESSONS_MATH_8, ...MON_LESSONS_BEL_8, ...MON_LESSONS_LIT_8];
