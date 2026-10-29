import type { LessonData } from '../../types';
import { MON_LESSONS_DE_A1 } from './deA1';
import { MON_LESSONS_DE_A2_8 } from './deA28';
import { MON_LESSONS_DE_A2_11 } from './deA211';
import { MON_LESSONS_DE_B11_8 } from './deB118';
import { MON_LESSONS_DE_B11 } from './deB11';
import { MON_LESSONS_DE_B1 } from './deB1';
import { MON_LESSONS_DE_B21 } from './deB21';
import { MON_LESSONS_EN_A1 } from './enA1';
import { MON_LESSONS_EN_A2_8 } from './enA28';
import { MON_LESSONS_EN_A2_11 } from './enA211';
import { MON_LESSONS_EN_B11_8 } from './enB118';
import { MON_LESSONS_EN_B11 } from './enB11';
import { MON_LESSONS_EN_B1 } from './enB1';
import { MON_LESSONS_EN_B21 } from './enB21';

export const MON_LESSONS_GROUP_LANG: LessonData[] = [
  ...MON_LESSONS_EN_A1,
  ...MON_LESSONS_EN_A2_8,
  ...MON_LESSONS_EN_A2_11,
  ...MON_LESSONS_EN_B11_8,
  ...MON_LESSONS_EN_B11,
  ...MON_LESSONS_EN_B1,
  ...MON_LESSONS_EN_B21,
  ...MON_LESSONS_DE_A1,
  ...MON_LESSONS_DE_A2_8,
  ...MON_LESSONS_DE_A2_11,
  ...MON_LESSONS_DE_B11_8,
  ...MON_LESSONS_DE_B11,
  ...MON_LESSONS_DE_B1,
  ...MON_LESSONS_DE_B21,
];
