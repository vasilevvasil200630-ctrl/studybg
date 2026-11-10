import type { LessonData, LessonSubject } from '../types';
import { MON_TOPIC_HIERARCHY, type MonTopicHierarchyEntry } from '../data/monCurriculum/topicHierarchy';

export type HighSchoolProfileFilterId =
  | 'all'
  | 'math-pmg'
  | 'natural-npmg'
  | 'languages-eg'
  | 'humanities-ngdek'
  | 'software-tues'
  | 'economic-ntbg'
  | 'technical-sgsag'
  | 'arts-sports';

export type PreparationSectionId = 'all' | 'section-a' | 'section-b' | 'section-c';

export interface HighSchoolProfileDescriptor {
  id: HighSchoolProfileFilterId;
  name: string;
  shortName: string;
  schoolsExample: string;
  monProfileCode: string;
  description: string;
  coreSubjects: LessonSubject[];
  preferExamTypes?: string[];
}

export const HIGH_SCHOOL_PROFILE_FILTERS: HighSchoolProfileDescriptor[] = [
  {
    id: 'all',
    name: 'Всички гимназии и профили',
    shortName: 'Всички профили',
    schoolsExample: 'ПМГ, ЕГ, ТУЕС, НТБГ, НПМГ, НГДЕК, Професионални гимназии и СУ',
    monProfileCode: 'Раздел А (ООП) + Раздел Б (ПП) + Раздел В (ДИППК)',
    description: 'Пълният каталог за всички видове средни училища, профилирани и професионални гимназии в България.',
    coreSubjects: [],
  },
  {
    id: 'math-pmg',
    name: 'Математически и Природо-математически гимназии',
    shortName: 'Математически (СМГ / ПМГ)',
    schoolsExample: 'СМГ, ПМГ, МГ „Баба Тонка“, МГ „Д-р Петър Берон“, МГ „Гео Милев“',
    monProfileCode: 'Профил „Математически“ (Модули М1–М4 по Математика и Информатика)',
    description: 'Задълбочена подготовка по Алгебра, Геометрия, Математически анализ, Вероятности, Информатика и Физика.',
    coreSubjects: [
      'Математика',
      'Информатика, ИТ и Програмиране',
      'Физика и астрономия',
      'Български език и литература',
    ],
  },
  {
    id: 'natural-npmg',
    name: 'Природни науки, Биотехнологии и Медицина',
    shortName: 'Природни науки (НПМГ / Медицина)',
    schoolsExample: 'НПМГ „Акад. Л. Чакалов“, ПМГ профил Биология и Химия, ПГХХТ, НПГВМ',
    monProfileCode: 'Профил „Природни науки“ (Модули М1–М5 по Биология, Химия и Физика)',
    description: 'Пълна подготовка за ДЗИ и кандидатстудентски изпити в МУ (Медицина, Фармация, Дентална медицина) и СУ.',
    coreSubjects: [
      'Биология и ЗО',
      'Химия и ООС',
      'Физика и астрономия',
      'Български език и литература',
    ],
  },
  {
    id: 'languages-eg',
    name: 'Езикови гимназии и интензивно чуждоезиково обучение',
    shortName: 'Езикови гимназии (ЕГ / АЕГ / НЕГ)',
    schoolsExample: '91. НЕГ, 1. АЕГ, 2. АЕГ, 9. ФЕГ, 164. ИЕГ, ЕГ Пловдив, ЕГ Варна, ЕГ Бургас',
    monProfileCode: 'Профил „Чужди езици“ (Нива A2, B1.1, B1 и B2 по Общата европейска езикова рамка)',
    description: 'Интензивен 8. клас (18 ч./седм.) и профилирана подготовка в 11.–12. клас за ДЗИ по чужд език и БЕЛ.',
    coreSubjects: [
      'Английски език',
      'Чужди езици (Немски, Френски, Испански)',
      'Български език и литература',
      'История и цивилизации',
      'Гражданско образование и философия',
    ],
  },
  {
    id: 'humanities-ngdek',
    name: 'Хуманитарни, Класически и Обществени гимназии',
    shortName: 'Хуманитарни (НГДЕК / ХГ)',
    schoolsExample: 'НГДЕК, Хуманитарни гимназии „Св. св. Кирил и Методий“, Профили БЕЛ и История',
    monProfileCode: 'Профили „Хуманитарни науки“ и „Обществени науки“ (Модули М1–М6)',
    description: 'Литературен анализ, есе и интерпретативно съчинение за ДЗИ по БЕЛ, История, Философия и Гражданско образование.',
    coreSubjects: [
      'Български език и литература',
      'История и цивилизации',
      'Гражданско образование и философия',
      'География и икономика',
    ],
  },
  {
    id: 'software-tues',
    name: 'Софтуерни, Компютърни и ИТ гимназии',
    shortName: 'Софтуерни и ИТ (ТУЕС / ПГЕА)',
    schoolsExample: 'ТУЕС към ТУ-София, ПГКМКС Варна, ПГЕА, НПГ по компютърни технологии Правец',
    monProfileCode: 'Профил „Софтуерни и хардуерни науки“ & Специалност „Системно и приложно програмиране“',
    description: 'Алгоритми, структури от данни, ООП, бази данни (SQL), компютърни мрежи, уеб разработка и ДИППК.',
    coreSubjects: [
      'Информатика, ИТ и Програмиране',
      'Математика',
      'Английски език',
      'Професионални специалности и Инженерство',
    ],
  },
  {
    id: 'economic-ntbg',
    name: 'Търговско-банкови, Финансови и Икономически гимназии',
    shortName: 'Икономика и Финанси (НТБГ / НФСГ)',
    schoolsExample: 'НТБГ, НФСГ, Търговски гимназии в Пловдив, Варна, Бургас, Стара Загора, Русе',
    monProfileCode: 'Профил „Предприемачески“ (М1–М4) & ДИППК Счетоводство, Банково дело и Електронна търговия',
    description: 'Макро- и микроикономика, финанси, счетоводство, маркетинг, предприемачество и икономическа география.',
    coreSubjects: [
      'Икономика, Бизнес и Предприемачество',
      'География и икономика',
      'Математика',
      'Английски език',
      'Български език и литература',
    ],
  },
  {
    id: 'technical-sgsag',
    name: 'Строителни, Технически и Професионални гимназии (Трета СПК)',
    shortName: 'Технически и Строителни (СГСАГ / ПГМЕ)',
    schoolsExample: 'СГСАГ „Христо Ботев“, НПГПТО „М. В. Ломоносов“, ПГМЕ, ПГТЕ „Хенри Форд“, ВМГ Варна',
    monProfileCode: 'Раздел В: Професионална подготовка за ДИППК (Теория и практика за Трета СПК)',
    description: 'Архитектура и строителство, електротехника и ВЕИ, мехатроника и PLC, автотранспорт и EV, логистика и биотехнологии.',
    coreSubjects: [
      'Професионални специалности и Инженерство',
      'Икономика, Бизнес и Предприемачество',
      'Информатика, ИТ и Програмиране',
      'Физика и астрономия',
    ],
    preferExamTypes: ['ДИППК / Професионален изпит', 'ДИППК (Професионална квалификация)'],
  },
  {
    id: 'arts-sports',
    name: 'Художествени, Музикални, Туристически и Спортни училища',
    shortName: 'Изкуства, Спорт и Туризъм',
    schoolsExample: 'НГПИ „Св. Лука“, НУИ, НМУ „Л. Пипков“, Спортни училища, СПГТ и ПГ по туризъм',
    monProfileCode: 'Профили „Изобразително изкуство“, „Музика“, „Физическо възпитание и спорт“ и Туризъм',
    description: 'История на изкуството, музикална теория, графичен и интериорен дизайн, хотелиерство, туризъм и спортна физиология.',
    coreSubjects: [
      'Изкуства и музика',
      'Български език и литература',
      'География и икономика',
      'Професионални специалности и Инженерство',
    ],
  },
];

export const PREPARATION_SECTIONS: {
  id: PreparationSectionId;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: 'all',
    label: 'Всички раздели (А + Б + В)',
    shortLabel: 'Всички видове подготовка',
    description: 'Общообразователна (ООП), Профилирана (ПП Модули М1–М6) и Професионална подготовка (ДИППК).',
  },
  {
    id: 'section-a',
    label: 'Раздел А: Общообразователна (ООП 8.–12. кл.)',
    shortLabel: 'Раздел А (ООП)',
    description: 'Задължителният общообразователен минимум по ДОС на МОН за всички гимназисти (I и II гимназиален етап).',
  },
  {
    id: 'section-b',
    label: 'Раздел Б: Профилирана подготовка (11.–12. кл. М1–М6)',
    shortLabel: 'Раздел Б (Профил М1–М6)',
    description: 'Задължителните профилирани модули за втори гимназиален етап и втора задължителна матура (ДЗИ).',
  },
  {
    id: 'section-c',
    label: 'Раздел В: Професионална подготовка (ДИППК / III СПК)',
    shortLabel: 'Раздел В (ДИППК / СПК)',
    description: 'Отраслова и специфична професионална подготовка за Държавен изпит за придобиване на трета СПК.',
  },
];

export interface LessonAcademicMetadata {
  stageId: 'stage-1' | 'stage-2' | 'stage-vocation' | 'junior';
  stageTitle: string;
  stageShort: string;
  sectionId: Exclude<PreparationSectionId, 'all'>;
  sectionLabel: string;
  sectionShort: string;
  monModuleLabel: string;
  thematicDomain: string;
  domainOrder: number;
  monSubSection: string | null;
  monPdfUrl: string | null;
  matchingProfiles: HighSchoolProfileDescriptor[];
  examWeightLabel: string;
  competencies: string[];
}

export function resolveMonHierarchy(lesson: LessonData): MonTopicHierarchyEntry | null {
  if (!lesson.monTopicIds || lesson.monTopicIds.length === 0) return null;
  // Избираме най-конкретната (листова) подтема от списъка на урока
  for (let i = lesson.monTopicIds.length - 1; i >= 0; i--) {
    const entry = MON_TOPIC_HIERARCHY[lesson.monTopicIds[i]];
    if (entry) return entry;
  }
  return null;
}

export function inferLessonPreparationSection(lesson: LessonData): Exclude<PreparationSectionId, 'all'> {
  const monEntry = resolveMonHierarchy(lesson);
  if (monEntry && (monEntry.sectionId === 'section-a' || monEntry.sectionId === 'section-b' || monEntry.sectionId === 'section-c')) {
    return monEntry.sectionId;
  }

  if (
    lesson.subject === 'Професионални специалности и Инженерство' ||
    lesson.examType === 'ДИППК / Професионален изпит' ||
    lesson.id.includes('dippk') ||
    lesson.id.startsWith('econ-') ||
    Boolean(lesson.audience && (lesson.audience.includes('ДИППК') || lesson.audience.includes('НТБГ') || lesson.audience.includes('ТУЕС')))
  ) {
    return 'section-c';
  }

  const isUpperSecondary =
    lesson.grade.includes('11.') ||
    lesson.grade.includes('12.') ||
    lesson.examType === 'ДЗИ / Матура';

  if (isUpperSecondary) {
    if (lesson.subject === 'Гражданско образование и философия' && !lesson.title.toLowerCase().includes('модул') && !lesson.title.toLowerCase().includes('философия')) {
      return 'section-a';
    }
    return 'section-b';
  }

  return 'section-a';
}

export function extractThematicDomain(lesson: LessonData): string {
  const monEntry = resolveMonHierarchy(lesson);
  if (monEntry) {
    return monEntry.domainTitle;
  }

  const sectionId = inferLessonPreparationSection(lesson);
  if (sectionId === 'section-c') {
    if (lesson.subject === 'Професионални специалности и Инженерство') {
      return 'Инженерни, технически и отраслови специалности за Трета СПК (ДИППК)';
    }
    if (lesson.subject === 'Икономика, Бизнес и Предприемачество') {
      return 'Финанси, счетоводство, маркетинг и бизнес администрация (НТБГ / НФСГ — ДИППК)';
    }
    if (lesson.subject === 'Информатика, ИТ и Програмиране') {
      return 'Системно и приложно програмиране, ООП, мрежи и бази данни (ТУЕС / ПГЕА — ДИППК)';
    }
    return `Специализирана професионална подготовка — ${lesson.subject} (ДИППК)`;
  }

  if (lesson.grade.startsWith('5.')) {
    return '5. клас — Фундаментални знания и мост към гимназията';
  }
  if (lesson.grade.startsWith('6.')) {
    return '6. клас — Основни закономерности и систематизация';
  }
  if (lesson.grade.includes('5.–6.')) {
    return '5.–6. клас — Прогимназиален синтез и базови понятия';
  }
  if (lesson.grade.includes('7.')) {
    return '7. клас — Интензивна подготовка за НВО след 7. клас';
  }

  if (lesson.grade.includes('11.') || lesson.grade.includes('12.') || lesson.examType === 'ДЗИ / Матура') {
    if (lesson.subject === 'Български език и литература') {
      return 'Канонични творби, езикови норми и интерпретативен анализ за ДЗИ (11.–12. клас)';
    }
    return 'Обобщителни профилирани теми и изпитни модели за ДЗИ (11.–12. клас)';
  }

  if (lesson.grade.includes('10.') || lesson.examType === 'НВО (10. клас)') {
    return '10. клас — Систематизиращи теми и подготовка за НВО след 10. клас';
  }

  return '8.–9. клас — Надграждащи синтези за Първи гимназиален етап (ООП)';
}

function computeDomainOrder(lesson: LessonData, monEntry: MonTopicHierarchyEntry | null, sectionId: Exclude<PreparationSectionId, 'all'>): number {
  if (monEntry) return monEntry.order;
  if (sectionId === 'section-c') return 310;
  if (lesson.grade.startsWith('5.')) return 50;
  if (lesson.grade.includes('5.–6.') || lesson.grade.startsWith('6.')) return 60;
  if (lesson.grade.includes('7.')) return 70;
  if (lesson.grade.includes('8.') && !lesson.grade.includes('12.')) return 85;
  if (lesson.grade.includes('9.')) return 95;
  if (lesson.grade.includes('10.')) return 105;
  if (lesson.grade.includes('11.') && !lesson.grade.includes('12.')) return 118;
  return 260;
}

export function parseGradeNumbersFromLabel(gradeLabel: string): number[] {
  const rangeMatch = gradeLabel.match(/(\d+)\s*[.–-]+\s*(\d+)/);
  if (rangeMatch) {
    const start = Number(rangeMatch[1]);
    const end = Number(rangeMatch[2]);
    if (start >= 5 && end <= 12 && start <= end) {
      const out: number[] = [];
      for (let g = start; g <= end; g++) out.push(g);
      return out;
    }
  }
  const singleMatch = gradeLabel.match(/(\d+)\.\s*клас/);
  if (singleMatch) {
    return [Number(singleMatch[1])];
  }
  return [];
}

export function matchesLessonGradeFilter(lesson: LessonData, selectedGrade: string): boolean {
  if (!selectedGrade || selectedGrade === 'Всички класове') return true;
  if (lesson.grade === selectedGrade) return true;

  const targetNums = parseGradeNumbersFromLabel(selectedGrade);
  if (targetNums.length === 0) return true;
  const targetGrade = targetNums[0];

  const monEntry = resolveMonHierarchy(lesson);
  if (monEntry) {
    return monEntry.grades.includes(targetGrade);
  }

  const lessonGrades = parseGradeNumbersFromLabel(lesson.grade);
  return lessonGrades.includes(targetGrade);
}

export function matchesLessonExamFilter(lesson: LessonData, selectedExamType: string): boolean {
  if (!selectedExamType || selectedExamType === 'Всички изпити' || selectedExamType === 'Всички формати') {
    return true;
  }

  const monEntry = resolveMonHierarchy(lesson);
  const sectionId = inferLessonPreparationSection(lesson);

  if (selectedExamType === 'ДЗИ / Матура' || selectedExamType === 'ДЗИ / Матура (12. кл.)') {
    return Boolean(monEntry?.examTags.includes('ДЗИ')) || lesson.examType === 'ДЗИ / Матура';
  }
  if (
    selectedExamType === 'ДИППК / Професионален изпит' ||
    selectedExamType === 'ДИППК / Професионален изпит (СПК)'
  ) {
    return sectionId === 'section-c' || lesson.examType === 'ДИППК / Професионален изпит';
  }
  if (
    selectedExamType === 'НВО (10. клас)' ||
    selectedExamType === 'Първи гимназиален етап (8.–10. кл. ООП)'
  ) {
    if (monEntry) return monEntry.stageId === 'stage-1';
    const grades = parseGradeNumbersFromLabel(lesson.grade);
    return (
      lesson.examType === 'НВО (10. клас)' ||
      (sectionId === 'section-a' && grades.some((g) => g >= 8 && g <= 10))
    );
  }
  if (selectedExamType === 'НВО (7. клас)') {
    const grades = parseGradeNumbersFromLabel(lesson.grade);
    return lesson.examType === 'НВО (7. клас)' || grades.some((g) => g <= 7);
  }
  if (
    selectedExamType === 'Контролна работа / Класно' ||
    selectedExamType === 'Текущ контрол и класна работа'
  ) {
    return lesson.examType === 'Контролна работа / Класно' || sectionId === 'section-a';
  }

  return lesson.examType === selectedExamType;
}

export function matchesHighSchoolProfile(lesson: LessonData, profileId: HighSchoolProfileFilterId): boolean {
  if (profileId === 'all') return true;
  const descriptor = HIGH_SCHOOL_PROFILE_FILTERS.find((p) => p.id === profileId);
  if (!descriptor) return true;

  if (profileId === 'technical-sgsag') {
    return (
      lesson.examType === 'ДИППК / Професионален изпит' ||
      descriptor.coreSubjects.includes(lesson.subject)
    );
  }

  return descriptor.coreSubjects.includes(lesson.subject);
}

export function getLessonAcademicMetadata(lesson: LessonData): LessonAcademicMetadata {
  const monEntry = resolveMonHierarchy(lesson);
  const sectionId = inferLessonPreparationSection(lesson);
  const grades = monEntry ? [...monEntry.grades] : parseGradeNumbersFromLabel(lesson.grade);
  const isJunior = grades.length > 0 && grades.every((g) => g <= 7);
  const isStage2 = monEntry
    ? monEntry.stageId === 'stage-2'
    : grades.some((g) => g >= 11) || lesson.examType === 'ДЗИ / Матура';

  let stageId: LessonAcademicMetadata['stageId'] = 'stage-1';
  let stageTitle = 'Първи гимназиален етап (8.–10. клас • Общообразователна подготовка и НВО)';
  let stageShort = 'I гимн. етап (8.–10. кл.)';

  if (isJunior) {
    stageId = 'junior';
    stageTitle = 'Прогимназиален етап (5.–7. клас • Мост към НВО и гимназиите)';
    stageShort = 'Прогимназия (5.–7. кл.)';
  } else if (sectionId === 'section-c') {
    stageId = 'stage-vocation';
    stageTitle = 'Професионално образование (8.–12. клас • Трета СПК / ДИППК)';
    stageShort = 'Професионална гимназия (ДИППК)';
  } else if (isStage2) {
    stageId = 'stage-2';
    stageTitle = 'Втори гимназиален етап (11.–12. клас • ООП и Профилирани модули за ДЗИ)';
    stageShort = 'II гимн. етап (11.–12. кл.)';
  }

  const sectionObj =
    PREPARATION_SECTIONS.find((s) => s.id === sectionId) ?? PREPARATION_SECTIONS[1];

  let monModuleLabel = 'Задължителен учебен план по ДОС на МОН (Раздел А — ООП)';
  if (monEntry) {
    monModuleLabel = monEntry.subSection
      ? `${monEntry.domainTitle} · Раздел: ${monEntry.subSection}`
      : monEntry.domainTitle;
  } else if (sectionId === 'section-b') {
    monModuleLabel =
      lesson.subject === 'Български език и литература'
        ? 'Задължителна подготовка за I ДЗИ + Профилирани модули'
        : 'Профилирана подготовка (Модули М1–М6 за Втора задължителна матура ДЗИ)';
  } else if (sectionId === 'section-c') {
    monModuleLabel = 'Отраслова и специфична професионална подготовка (Държавен изпит за III СПК / ДИППК)';
  }

  const matchingProfiles = HIGH_SCHOOL_PROFILE_FILTERS.filter(
    (p) => p.id !== 'all' && matchesHighSchoolProfile(lesson, p.id)
  );

  let examWeightLabel = 'Висока тежест при текущ контрол, класна работа и входно/изходно равнище по МОН';
  if (monEntry?.examTags.includes('ДЗИ') || lesson.examType === 'ДЗИ / Матура') {
    examWeightLabel = 'Ключова тема в изпитния формат на ДЗИ (Матура 12. клас — тестови и отворени задачи)';
  } else if (monEntry?.examTags.includes('НВО 10') || lesson.examType === 'НВО (10. клас)') {
    examWeightLabel = 'Задължителна тема в обхвата на Националното външно оценяване (НВО след 10. клас)';
  } else if (lesson.examType === 'НВО (7. клас)') {
    examWeightLabel = 'Ключова тема за Национално външно оценяване (НВО след 7. клас) и прием в гимназии';
  } else if (sectionId === 'section-c') {
    examWeightLabel = 'Държавен изпит за придобиване на III СПК (Теория и практически дипломен казус — ДИППК)';
  }

  const competencies = [
    `Владеене на понятийния апарат и терминологията по „${lesson.title}“ според ДОС на МОН`,
    `Прилагане на теоретичните модели при решаване на структурирани тестови и практически задачи`,
    `Аргументирано формулиране на писмена теза / решение за оценка Отличен (6.00) без терминологични грешки`,
  ];

  const thematicDomain = extractThematicDomain(lesson);
  const domainOrder = computeDomainOrder(lesson, monEntry, sectionId);

  return {
    stageId,
    stageTitle,
    stageShort,
    sectionId,
    sectionLabel: sectionObj.label,
    sectionShort: sectionObj.shortLabel,
    monModuleLabel,
    thematicDomain,
    domainOrder,
    monSubSection: monEntry?.subSection ?? null,
    monPdfUrl: monEntry?.pdfUrl ?? null,
    matchingProfiles,
    examWeightLabel,
    competencies,
  };
}
