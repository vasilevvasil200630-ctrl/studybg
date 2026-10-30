import type { ExamPaper } from '../../lib/examPaperScoring';
import { DZI_EN_B2_PRACTICE_1 } from './englishB2';
import { DZI_DE_B2_PRACTICE_1 } from './germanB2';
import { DZI_BIO_PRACTICE_1 } from './biology';
import { DZI_CHEM_PRACTICE_1 } from './chemistry';
import { DZI_PHYS_PRACTICE_1 } from './physics';
import { DZI_HIST_PRACTICE_1 } from './history';
import { DZI_GEO_PRACTICE_1 } from './geography';
import { DZI_PHIL_PRACTICE_1 } from './philosophy';
import { DZI_INF_PRACTICE_1 } from './informatics';
import { DZI_IT_PRACTICE_1 } from './it';
import { DZI_ENTR_PRACTICE_1 } from './entrepreneurship';
import { DZI_ARTS_PRACTICE_1 } from './arts';
import { DZI_MUSIC_PRACTICE_1 } from './music';
import { DZI_EN_B2_PRACTICE_2 } from './variant2/englishB2_v2';
import { DZI_BIO_PRACTICE_2 } from './variant2/biology_v2';
import { DZI_CHEM_PRACTICE_2 } from './variant2/chemistry_v2';
import { DZI_PHYS_PRACTICE_2 } from './variant2/physics_v2';
import { DZI_HIST_PRACTICE_2 } from './variant2/history_v2';
import { DZI_GEO_PRACTICE_2 } from './variant2/geography_v2';
import { DZI_PHIL_PRACTICE_2 } from './variant2/philosophy_v2';
import { DZI_INF_PRACTICE_2, DZI_IT_PRACTICE_2 } from './variant2/informatics_it_v2';
import {
  DZI_DE_B2_PRACTICE_2,
  DZI_ENTR_PRACTICE_2,
  DZI_ARTS_PRACTICE_2,
  DZI_MUSIC_PRACTICE_2,
} from './variant2/german_entrepreneurship_arts_music_v2';
import {
  DZI_FR_B2_PRACTICE_1,
  DZI_ES_B2_PRACTICE_1,
  DZI_RU_B2_PRACTICE_1,
} from './foreignLanguagesB2';
import {
  DZI_FR_B2_PRACTICE_2,
  DZI_ES_B2_PRACTICE_2,
  DZI_RU_B2_PRACTICE_2,
} from './variant2/foreignLanguagesB2_v2';

export const DZI_PROFILE_PAPERS: ExamPaper[] = [
  DZI_EN_B2_PRACTICE_1,
  DZI_EN_B2_PRACTICE_2,
  DZI_DE_B2_PRACTICE_1,
  DZI_DE_B2_PRACTICE_2,
  DZI_FR_B2_PRACTICE_1,
  DZI_FR_B2_PRACTICE_2,
  DZI_ES_B2_PRACTICE_1,
  DZI_ES_B2_PRACTICE_2,
  DZI_RU_B2_PRACTICE_1,
  DZI_RU_B2_PRACTICE_2,
  DZI_BIO_PRACTICE_1,
  DZI_BIO_PRACTICE_2,
  DZI_CHEM_PRACTICE_1,
  DZI_CHEM_PRACTICE_2,
  DZI_PHYS_PRACTICE_1,
  DZI_PHYS_PRACTICE_2,
  DZI_HIST_PRACTICE_1,
  DZI_HIST_PRACTICE_2,
  DZI_GEO_PRACTICE_1,
  DZI_GEO_PRACTICE_2,
  DZI_PHIL_PRACTICE_1,
  DZI_PHIL_PRACTICE_2,
  DZI_INF_PRACTICE_1,
  DZI_INF_PRACTICE_2,
  DZI_IT_PRACTICE_1,
  DZI_IT_PRACTICE_2,
  DZI_ENTR_PRACTICE_1,
  DZI_ENTR_PRACTICE_2,
  DZI_ARTS_PRACTICE_1,
  DZI_ARTS_PRACTICE_2,
  DZI_MUSIC_PRACTICE_1,
  DZI_MUSIC_PRACTICE_2,
];
