import type { LessonData } from '../../types';
import { MON_LESSONS_BEL_8 } from './bel8';
import { MON_LESSONS_BEL_9 } from './bel9';
import { MON_LESSONS_BEL_10 } from './bel10';
import { MON_LESSONS_BEL_11 } from './bel11';
import { MON_LESSONS_BEL_12 } from './bel12';
import { MON_LESSONS_BIO_8 } from './bio8';
import { MON_LESSONS_BIO_9 } from './bio9';
import { MON_LESSONS_BIO_10 } from './bio10';
import { MON_LESSONS_CHEM_8 } from './chem8';
import { MON_LESSONS_CHEM_9 } from './chem9';
import { MON_LESSONS_CHEM_10 } from './chem10';
import { MON_LESSONS_GEO_8 } from './geo8';
import { MON_LESSONS_GEO_9 } from './geo9';
import { MON_LESSONS_GEO_10 } from './geo10';
import { MON_LESSONS_HIST_8 } from './hist8';
import { MON_LESSONS_HIST_9 } from './hist9';
import { MON_LESSONS_HIST_10A } from './hist10a';
import { MON_LESSONS_HIST_10B } from './hist10b';
import { MON_LESSONS_HIST_10C } from './hist10c';
import { MON_LESSONS_LIT_8 } from './lit8';
import { MON_LESSONS_LIT_9 } from './lit9';
import { MON_LESSONS_LIT_10 } from './lit10';
import { MON_LESSONS_LIT_11 } from './lit11';
import { MON_LESSONS_LIT_12 } from './lit12';
import { MON_LESSONS_MATH_8 } from './math8';
import { MON_LESSONS_MATH_9 } from './math9';
import { MON_LESSONS_MATH_10 } from './math10';
import { MON_LESSONS_MATH_11 } from './math11';
import { MON_LESSONS_MATH_12 } from './math12';
import { MON_LESSONS_PHYS_8 } from './phys8';
import { MON_LESSONS_PHYS_9 } from './phys9';
import { MON_LESSONS_PHIL_8 } from './phil8';
import { MON_LESSONS_PHIL_9 } from './phil9';
import { MON_LESSONS_PHIL_10 } from './phil10';
import { MON_LESSONS_PHYS_10 } from './phys10';

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
  ...MON_LESSONS_MATH_12,
  ...MON_LESSONS_BEL_12,
  ...MON_LESSONS_LIT_12,
  ...MON_LESSONS_BIO_8,
  ...MON_LESSONS_CHEM_8,
  ...MON_LESSONS_PHYS_8,
  ...MON_LESSONS_BIO_9,
  ...MON_LESSONS_CHEM_9,
  ...MON_LESSONS_PHYS_9,
  ...MON_LESSONS_BIO_10,
  ...MON_LESSONS_CHEM_10,
  ...MON_LESSONS_PHYS_10,
  ...MON_LESSONS_GEO_8,
  ...MON_LESSONS_GEO_9,
  ...MON_LESSONS_GEO_10,
  ...MON_LESSONS_PHIL_8,
  ...MON_LESSONS_PHIL_9,
  ...MON_LESSONS_PHIL_10,
  ...MON_LESSONS_HIST_8,
  ...MON_LESSONS_HIST_9,
  ...MON_LESSONS_HIST_10A,
  ...MON_LESSONS_HIST_10B,
  ...MON_LESSONS_HIST_10C,
];
