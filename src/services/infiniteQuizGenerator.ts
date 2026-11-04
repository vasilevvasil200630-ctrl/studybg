import { toLessonGrade, type Flashcard, type LessonData, type LessonSubject, type NotebookCheckItem, type QuizQuestion } from '../types';
import type { CurriculumSubDomain } from '../data/bulgarianCurriculumTree';
import type {
  GradeCurriculumMatrix,
  GradeSubjectMatrixEntry,
  SchoolCategorySection,
  SchoolSpecialtyItem
} from '../data/schoolsSpecialtiesDatabase';

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

function createSeededRng(seed: number): () => number {
  let state = (seed >>> 0) || 123456789;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function seededShuffle<T>(items: readonly T[], rng: () => number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const normalizeStem = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();

/**
 * Пулът на теста по урок: въпросите на урока и на другите уроци от същия предмет
 * по същата тема от програмата на МОН. Тематична изолация (както в Матура Плюс):
 * без въпроси от чужди теми, без шаблонни „синтезирани“ въпроси и без резервни дистрактори.
 */
export function topicQuestionPool(baseLesson: LessonData, allLessons: LessonData[]): QuizQuestion[] {
  const topics = new Set(baseLesson.monTopicIds ?? []);
  const sameTopic = topics.size
    ? allLessons.filter(
        (l) => l.id !== baseLesson.id && l.subject === baseLesson.subject && (l.monTopicIds ?? []).some((t) => topics.has(t))
      )
    : [];
  const pool: QuizQuestion[] = [];
  const seen = new Set<string>();
  for (const q of [baseLesson, ...sameTopic].flatMap((l) => l.quiz)) {
    const key = normalizeStem(q.question);
    if (seen.has(key) || q.options.length < 2 || q.correctIndex < 0 || q.correctIndex >= q.options.length) continue;
    seen.add(key);
    pool.push(q);
  }
  return pool;
}

/** Разбърква грешните отговори и поставя верния на зададената позиция */
function placeCorrectAt(q: QuizQuestion, targetIdx: number, rng: () => number, id: number): QuizQuestion {
  const wrong = seededShuffle(q.options.filter((_, i) => i !== q.correctIndex), rng);
  const at = targetIdx % q.options.length;
  const options = [...wrong.slice(0, at), q.options[q.correctIndex], ...wrong.slice(at)];
  return { ...q, id, options, correctIndex: at };
}

/**
 * Нов вариант на теста по урока: въпросите от пула на темата в нов ред, с разбъркани
 * отговори и верен отговор, разпределен по позициите А/Б/В/Г. Връща до targetCount въпроса —
 * толкова, колкото има по темата; не допълва с въпроси от други теми.
 */
export function generateInfiniteLessonQuiz(
  baseLesson: LessonData,
  allLessons: LessonData[],
  variantNumber: number,
  targetCount = 10
): QuizQuestion[] {
  const rng = createSeededRng(hashSeed(`${baseLesson.id}::variant::${variantNumber}`));
  const picked = seededShuffle(topicQuestionPool(baseLesson, allLessons), rng).slice(0, targetCount);
  const slots = seededShuffle(picked.map((_, i) => (i + variantNumber) % 4), rng);
  return picked.map((q, i) => placeCorrectAt(q, slots[i], rng, i + 1));
}


/**
 * Изгражда специализиран урок с пълен учебен материал по МОН и тест за конкретна подтема (SubDomain) от Дървото на учебната програма.
 */
export function buildTailoredSubDomainLesson(
  subject: LessonSubject,
  gradeLabel: string,
  domainName: string,
  subDomain: CurriculumSubDomain,
  baseLesson: LessonData,
  allLessons: LessonData[]
): LessonData {
  const tailoredId = `${baseLesson.id}--sub-${subDomain.id}`;
  const checklistFromSubDomain: NotebookCheckItem[] = [
    ...subDomain.gradeRequirement6.map((req, idx) => ({
      id: `${subDomain.id}-req-${idx + 1}`,
      requirement: req,
      whyNeeded: `Задължителен критерий на МОН за оценка Отличен (6.00) по темата „${subDomain.name}“ (${domainName}).`,
      isEssentialForSix: true,
      suggestedNotes: `${req} (Ключови понятия: ${subDomain.keywords.slice(0, 6).join(', ')})`
    })),
    ...(baseLesson.notebookChecklist || [])
  ];

  const extraFlashcards: Flashcard[] = [
    {
      id: `${subDomain.id}-fc-1`,
      front: `Кои са задължителните изисквания на МОН за оценка Отличен (6.00) по темата „${subDomain.name}“?`,
      back: subDomain.gradeRequirement6.join(' | '),
      hint: domainName,
      tag: 'Критерии МОН 6.00'
    },
    {
      id: `${subDomain.id}-fc-2`,
      front: `Кои са най-честите изпитни грешки по темата „${subDomain.name}“ и как да ги избегнем?`,
      back: `${subDomain.commonPitfalls.join(' | ')} — Насока: ${subDomain.advice}`,
      hint: 'Изпитни капани',
      tag: 'Методика МОН'
    }
  ];

  const enrichedLesson: LessonData = {
    ...baseLesson,
    id: tailoredId,
    title: `${subDomain.name} (${gradeLabel})`,
    subject,
    grade: toLessonGrade(gradeLabel),
    originalNoteExcerpt: `${domainName} → ${subDomain.name}. Ключови понятия по МОН: ${subDomain.keywords.join(', ')}. ${baseLesson.originalNoteExcerpt}`,
    summary: {
      overview: `Разработка по учебната програма на МОН за ${gradeLabel} (${domainName}): „${subDomain.name}“. ${baseLesson.summary.overview}`,
      keyPoints: [
        ...subDomain.gradeRequirement6.map((r) => `[Изискване на МОН за 6.00] ${r}`),
        ...baseLesson.summary.keyPoints
      ],
      examGoldenRule: `${subDomain.advice} | ${baseLesson.summary.examGoldenRule}`,
      commonTraps: [
        ...subDomain.commonPitfalls,
        ...baseLesson.summary.commonTraps
      ],
      formulasOrDates: [
        { label: 'Дял от програмата на МОН', value: domainName },
        { label: 'Ключови термини за разпознаване', value: subDomain.keywords.slice(0, 8).join(', ') },
        ...baseLesson.summary.formulasOrDates
      ]
    },
    notebookChecklist: checklistFromSubDomain,
    flashcards: [...extraFlashcards, ...baseLesson.flashcards],
    quickQuestions: [
      `Обясни ми стъпка по стъпка темата „${subDomain.name}“ за ${gradeLabel} по програмата на МОН.`,
      `Кои са 3-те най-важни изисквания за оценка 6.00 върху „${subDomain.name}“?`,
      ...baseLesson.quickQuestions
    ]
  };

  return {
    ...enrichedLesson,
    quiz: generateInfiniteLessonQuiz(enrichedLesson, allLessons, 1, 10)
  };
}

/**
 * Изгражда специализиран урок с пълен учебен материал по МОН и тест за конкретна специалност (СППОО / Профил) от Училища и Специалности.
 */
export function buildTailoredSpecialtyLesson(
  section: SchoolCategorySection,
  specialty: SchoolSpecialtyItem,
  baseLesson: LessonData,
  allLessons: LessonData[]
): LessonData {
  const tailoredId = `${baseLesson.id}--spec-${specialty.code.toLowerCase().replace(/[^a-z0-9а-я]+/gi, '-')}`;

  const specialtyQuizConverted: QuizQuestion[] = section.specialtyQuiz.map((sq, idx) => ({
    id: 600 + idx,
    question: sq.question,
    options: sq.options,
    correctIndex: sq.correctAnswer,
    explanation: `[${sq.specialtyTag}] ${sq.explanation}`
  }));

  const checklistFromSection: NotebookCheckItem[] = [
    ...section.keySynthesisRules.map((rule, idx) => ({
      id: `spec-rule-${idx + 1}`,
      requirement: `${rule.title} (${section.shortName})`,
      whyNeeded: rule.context,
      isEssentialForSix: true,
      suggestedNotes: rule.formulaOrRule
    })),
    ...(baseLesson.notebookChecklist || [])
  ];

  const enrichedLesson: LessonData = {
    ...baseLesson,
    id: tailoredId,
    title: `${specialty.name} (Код ${specialty.code})`,
    audience: `${section.shortName} — ${specialty.qualification}`,
    originalNoteExcerpt: `Специалност/Профил: ${specialty.name} (Код: ${specialty.code}) | ${specialty.qualification}. Основни модули по МОН: ${specialty.coreSubjects.join('; ')}. Изпитен формат: ${section.examFormat}.`,
    summary: {
      overview: `Пълен учебен и изпитен материал по програмата на МОН за специалност „${specialty.name}“ (Код ${specialty.code}, ${specialty.qualification}) в ${section.title}. Включва водещите дисциплини (${specialty.coreSubjects.join(', ')}), синтезираните правила за ДЗИ/ДИППК и профилираната подготовка от 8. до 12. клас. ${baseLesson.summary.overview}`,
      keyPoints: [
        `Професионална квалификация и профил: ${specialty.qualification} — изучавани модули: ${specialty.coreSubjects.join(', ')}.`,
        ...section.keySynthesisRules.map((r) => `${r.title}: ${r.formulaOrRule} (${r.context})`),
        ...section.gradeProgression.map((gp) => `${gp.grade} (${gp.focusTitle}): ${gp.specializedSubjects.join('; ')} — Изпитен етап: ${gp.examMilestone}`),
        ...baseLesson.summary.keyPoints
      ],
      examGoldenRule: `За отличен на ${section.examFormat}: овладей задълбочено модулите (${specialty.coreSubjects.join(', ')}) и прилагай точно формулите от справочника! ${baseLesson.summary.examGoldenRule}`,
      commonTraps: baseLesson.summary.commonTraps,
      formulasOrDates: [
        ...section.keySynthesisRules.map((r) => ({ label: r.title, value: r.formulaOrRule })),
        ...baseLesson.summary.formulasOrDates
      ]
    },
    notebookChecklist: checklistFromSection,
    flashcards: [
      ...section.keySynthesisRules.map((r, idx) => ({
        id: `spec-fc-${idx + 1}`,
        front: `Каква е ключовата формула или нормативно правило за „${r.title}“ в ${section.shortName}?`,
        back: `${r.formulaOrRule} — Приложение: ${r.context}`,
        hint: specialty.name,
        tag: section.shortName
      })),
      ...baseLesson.flashcards
    ],
    quiz: [...specialtyQuizConverted, ...baseLesson.quiz]
  };

  return {
    ...enrichedLesson,
    quiz: generateInfiniteLessonQuiz(enrichedLesson, allLessons, 1, 10)
  };
}

/**
 * Изгражда специализиран урок с пълен учебен материал по МОН и тест за конкретен предмет от Матрицата за 8.–12. клас.
 */
export function buildTailoredMatrixSubjectLesson(
  matrixGrade: GradeCurriculumMatrix,
  subjectEntry: GradeSubjectMatrixEntry,
  baseLesson: LessonData,
  allLessons: LessonData[]
): LessonData {
  const slug = subjectEntry.subjectName.toLowerCase().replace(/[^a-z0-9а-я]+/gi, '-').slice(0, 32);
  const tailoredId = `${baseLesson.id}--matrix-${matrixGrade.grade.replace(/\D+/g, '')}-${slug}`;
  const topicBullets = subjectEntry.keyTopics
    .split(/[;.]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 4);

  const enrichedLesson: LessonData = {
    ...baseLesson,
    id: tailoredId,
    title: `${subjectEntry.subjectName} — ${matrixGrade.grade}`,
    grade: toLessonGrade(matrixGrade.grade),
    audience: `${subjectEntry.category} (${subjectEntry.schoolTypes})`,
    originalNoteExcerpt: `${matrixGrade.grade} (${matrixGrade.stageName}) | ${subjectEntry.category} | Училища: ${subjectEntry.schoolTypes} | Хорариум: ${subjectEntry.weeklyHoursNote}. Теми по МОН: ${subjectEntry.keyTopics}`,
    summary: {
      overview: `Разработка по учебния план на МОН за ${matrixGrade.grade} (${matrixGrade.stageName}) по „${subjectEntry.subjectName}“ (${subjectEntry.category}). Хорариум и норматив: ${subjectEntry.weeklyHoursNote}. Национален изпитен фокус: ${matrixGrade.nationalExamInfo}. ${baseLesson.summary.overview}`,
      keyPoints: [
        `Задължителни теми по учебната програма на МОН за ${matrixGrade.grade}: ${subjectEntry.keyTopics}`,
        `Видове училища и профили: ${subjectEntry.schoolTypes} (${subjectEntry.weeklyHoursNote})`,
        `Национално оценяване и изпитен етап за класа: ${matrixGrade.nationalExamInfo}`,
        ...baseLesson.summary.keyPoints
      ],
      examGoldenRule: baseLesson.summary.examGoldenRule,
      commonTraps: baseLesson.summary.commonTraps,
      formulasOrDates: [
        { label: `Учебен етап (${matrixGrade.grade})`, value: matrixGrade.stageName },
        { label: 'Норматив и седмичен хорариум', value: subjectEntry.weeklyHoursNote },
        ...baseLesson.summary.formulasOrDates
      ]
    },
    notebookChecklist: [
      ...topicBullets.slice(0, 4).map((tb, idx) => ({
        id: `matrix-chk-${idx + 1}`,
        requirement: `Усвояване и конспектиране на тема: ${tb}`,
        whyNeeded: `Включена в учебната програма на МОН за ${matrixGrade.grade} (${subjectEntry.category}).`,
        isEssentialForSix: true,
        suggestedNotes: `${tb} — прилага се съгласно изискванията за ${matrixGrade.nationalExamInfo}.`
      })),
      ...(baseLesson.notebookChecklist || [])
    ]
  };

  return {
    ...enrichedLesson,
    quiz: generateInfiniteLessonQuiz(enrichedLesson, allLessons, 1, 10)
  };
}
