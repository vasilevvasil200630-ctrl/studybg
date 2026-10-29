import type { LessonData } from '../../types';
import { MON_LESSONS_BIO_8 } from './bio8';
import { MON_LESSONS_BIO_9 } from './bio9';
import { MON_LESSONS_BIO_10 } from './bio10';
import { MON_LESSONS_CHEM_8 } from './chem8';
import { MON_LESSONS_CHEM_9 } from './chem9';
import { MON_LESSONS_CHEM_10 } from './chem10';
import { MON_LESSONS_INF_8 } from './inf8';
import { MON_LESSONS_IT_8 } from './it8';
import { MON_LESSONS_IT_9 } from './it9';
import { MON_LESSONS_IT_10 } from './it10';
import { MON_LESSONS_MATH_8 } from './math8';
import { MON_LESSONS_MATH_9 } from './math9';
import { MON_LESSONS_MATH_10 } from './math10';
import { MON_LESSONS_MATH_11 } from './math11';
import { MON_LESSONS_MATH_12 } from './math12';
import { MON_LESSONS_PHYS_8 } from './phys8';
import { MON_LESSONS_PHYS_9 } from './phys9';
import { MON_LESSONS_PHYS_10 } from './phys10';
import { MON_LESSONS_TP_8 } from './tp8';
import { MON_LESSONS_TP_9 } from './tp9';

export const MON_LESSONS_GROUP_OOP_STEM: LessonData[] = [
  ...MON_LESSONS_MATH_8,
  ...MON_LESSONS_MATH_9,
  ...MON_LESSONS_MATH_10,
  ...MON_LESSONS_MATH_11,
  ...MON_LESSONS_MATH_12,
  ...MON_LESSONS_BIO_8,
  ...MON_LESSONS_CHEM_8,
  ...MON_LESSONS_PHYS_8,
  ...MON_LESSONS_BIO_9,
  ...MON_LESSONS_CHEM_9,
  ...MON_LESSONS_PHYS_9,
  ...MON_LESSONS_BIO_10,
  ...MON_LESSONS_CHEM_10,
  ...MON_LESSONS_PHYS_10,
  ...MON_LESSONS_INF_8,
  ...MON_LESSONS_IT_8,
  ...MON_LESSONS_IT_9,
  ...MON_LESSONS_IT_10,
  ...MON_LESSONS_TP_8,
  ...MON_LESSONS_TP_9,
];
