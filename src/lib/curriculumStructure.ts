import type { LessonData, LessonSubject } from '../types';

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
    monProfileCode: 'Профил „Математически“ (Модули М1–М5 по Математика и Информатика)',
    description: 'Задълбочена подготовка по Алгебра, Геометрия, Математически анализ, Моделиране, Информатика и Физика.',
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
    schoolsExample: 'НПМГ „Акад. Л. Чакалов“, ПМГ профил Биология и Химия, Медицински колежи',
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
    monProfileCode: 'Профил „Чужди езици“ (Нива B1.1, B2 и C1 по Общата европейска езикова рамка)',
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
    monProfileCode: 'Профили „Хуманитарни науки“ и „Обществени науки“ (Модули М1–М5)',
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
    monProfileCode: 'Профил „Икономическо развитие“ / „Предприемачески“ & ДИППК Счетоводство, Банково дело и Търговия',
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
    schoolsExample: 'СГСАГ „Христо Ботев“, НПГПТО „М. В. Ломоносов“, ПГМЕ, ПГТ, Аграрни и Ветеринарни гимназии',
    monProfileCode: 'Раздел В: Професионална подготовка за ДИППК (Теория и практика за Трета СПК)',
    description: 'Архитектура и строителство, електротехника, мехатроника, автотранспорт, аграрни технологии и защита на дипломен проект.',
    coreSubjects: [
      'Професионални специалности и Инженерство',
      'Икономика, Бизнес и Предприемачество',
      'Информатика, ИТ и Програмиране',
      'Физика и астрономия',
    ],
    preferExamTypes: ['ДИППК / Професионален изпит'],
  },
  {
    id: 'arts-sports',
    name: 'Художествени, Музикални, Туристически и Спортни училища',
    shortName: 'Изкуства, Спорт и Туризъм',
    schoolsExample: 'НГПИ „Св. Лука“, НУИ, НМУ „Л. Пипков“, Спортни училища, Професионални гимназии по туризъм',
    monProfileCode: 'Профили „Изобразително изкуство“, „Музика“, „Физическо възпитание и спорт“ и Туризъм',
    description: 'История на изкуството, музикална теория, дизайн, спортна физиология, здравни грижи и туризъм.',
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
    description: 'Общообразователна (ООП), Профилирана (ПП Модули М1–М5) и Професионална подготовка (ДИППК).',
  },
  {
    id: 'section-a',
    label: 'Раздел А: Общообразователна (ООП 8.–12. кл.)',
    shortLabel: 'Раздел А (ООП)',
    description: 'Задължителният общообразователен минимум по ДОС на МОН за всички гимназисти (I и II гимназиален етап).',
  },
  {
    id: 'section-b',
    label: 'Раздел Б: Профилирана подготовка (11.–12. кл. М1–М5)',
    shortLabel: 'Раздел Б (Профил М1–М5)',
    description: 'Задължителните профилирани модули (Модул 1 до Модул 5) за втори гимназиален етап и втора матура (ДЗИ).',
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
  matchingProfiles: HighSchoolProfileDescriptor[];
  examWeightLabel: string;
  competencies: string[];
}

const VOCATIONAL_SUBJECTS = new Set<LessonSubject>([
  'Професионални специалности и Инженерство',
  'Икономика, Бизнес и Предприемачество',
]);

export function inferLessonPreparationSection(lesson: LessonData): Exclude<PreparationSectionId, 'all'> {
  if (
    lesson.examType === 'ДИППК / Професионален изпит' ||
    VOCATIONAL_SUBJECTS.has(lesson.subject) ||
    lesson.id.includes('dippk') ||
    lesson.title.toLowerCase().includes('диппк') ||
    lesson.title.toLowerCase().includes('спк')
  ) {
    return 'section-c';
  }

  const isUpperSecondary =
    lesson.grade.includes('11.') ||
    lesson.grade.includes('12.') ||
    lesson.examType === 'ДЗИ / Матура';

  const titleLower = lesson.title.toLowerCase();
  const isProfileModule =
    titleLower.includes('модул') ||
    titleLower.includes('профил') ||
    (isUpperSecondary &&
      lesson.subject !== 'Български език и литература' &&
      lesson.subject !== 'Гражданско образование и философия');

  if (isProfileModule || (isUpperSecondary && lesson.examType === 'ДЗИ / Матура')) {
    return 'section-b';
  }

  return 'section-a';
}

export function extractThematicDomain(lesson: LessonData): string {
  // Check if title has a clear section prefix like "Модул 1: ...", "Дял II: ...", or "Тема: ..."
  const colonIdx = lesson.title.indexOf(':');
  if (colonIdx > 3 && colonIdx < 48) {
    return lesson.title.slice(0, colonIdx).trim();
  }
  const dashMatch = lesson.title.match(/^([^—–-]{5,42})\s*[—–-]\s*/);
  if (dashMatch && dashMatch[1]) {
    const candidate = dashMatch[1].trim();
    if (lesson.subject === 'Български език и литература') {
      return `Авторски и тематичен блок: ${candidate}`;
    }
    return candidate;
  }

  if (lesson.examType === 'ДИППК / Професионален изпит') {
    return `Специфична професионална подготовка (${lesson.subject})`;
  }
  if (lesson.grade.includes('11.') || lesson.grade.includes('12.')) {
    return `Втори гимназиален етап и ДЗИ (${lesson.grade})`;
  }
  if (lesson.grade.includes('8.') || lesson.grade.includes('9.') || lesson.grade.includes('10.')) {
    return `Първи гимназиален етап — ООП (${lesson.grade})`;
  }
  return `Основен тематичен раздел (${lesson.grade})`;
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
  const sectionId = inferLessonPreparationSection(lesson);
  const isJunior =
    lesson.grade.includes('5.') || lesson.grade.includes('6.') || lesson.grade.includes('7.');
  const isStage2 =
    lesson.grade.includes('11.') ||
    lesson.grade.includes('12.') ||
    lesson.examType === 'ДЗИ / Матура';

  let stageId: LessonAcademicMetadata['stageId'] = 'stage-1';
  let stageTitle = 'Първи гимназиален етап (8.–10. клас • Общообразователна подготовка)';
  let stageShort = 'I гимн. етап (8.–10. кл.)';

  if (isJunior) {
    stageId = 'junior';
    stageTitle = 'Прогимназиален етап (5.–7. клас • Мост с Matura+)';
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
  if (sectionId === 'section-b') {
    monModuleLabel =
      lesson.subject === 'Български език и литература'
        ? 'Задължителна подготовка за I ДЗИ + Профилирани модули М1–М4'
        : 'Профилирана подготовка (Модули М1–М4 за Втора задължителна матура ДЗИ)';
  } else if (sectionId === 'section-c') {
    monModuleLabel = 'Отраслова и специфична професионална подготовка (Държавен изпит за III СПК / ДИППК)';
  }

  const matchingProfiles = HIGH_SCHOOL_PROFILE_FILTERS.filter(
    (p) => p.id !== 'all' && matchesHighSchoolProfile(lesson, p.id)
  );

  let examWeightLabel = 'Висока тежест при текущ контрол, класна работа и входно/изходно равнище по МОН';
  if (lesson.examType === 'ДЗИ / Матура') {
    examWeightLabel = 'Ключова тема в изпитния формат на ДЗИ (Матура 12. клас — тестови и отворени задачи)';
  } else if (lesson.examType === 'ДИППК / Професионален изпит') {
    examWeightLabel = 'Държавен изпит за придобиване на III СПК (Писмена разработка / Дипломен казус)';
  }

  const competencies = [
    `Владеене на понятийния апарат и терминологията по „${lesson.title}“ според ДОС на МОН`,
    `Прилагане на теоретичните модели при решаване на структурирани тестови и практически задачи`,
    `Аргументирано формулиране на писмена теза / решение за оценка Отличен (6.00) без терминологични грешки`,
  ];

  return {
    stageId,
    stageTitle,
    stageShort,
    sectionId,
    sectionLabel: sectionObj.label,
    sectionShort: sectionObj.shortLabel,
    monModuleLabel,
    thematicDomain: extractThematicDomain(lesson),
    matchingProfiles,
    examWeightLabel,
    competencies,
  };
}
