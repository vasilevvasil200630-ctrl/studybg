import type { QuizQuestion } from '../types';
import type { LiteratureAuthor } from '../data/literatureDatabase';
import type { GrammarQuestion } from '../data/grammarDatabase';
import {
  FIGURES_AND_TROPES,
  PARONYMS_AND_IDIOMS,
  READING_SYNTHESIS_TASKS,
  type ModuleTwoQuestion,
} from '../data/moduleTwoBelDatabase';
import type { MathCategory, MathQuizQuestion } from '../data/mathStemDatabase';
import {
  CODON_TABLE,
  ION_REACTIONS,
  ORGANIC_QUALITATIVE_REACTIONS,
  PHOTOELECTRIC_METALS,
  HYDROLYSIS_SALTS,
  SCIENCE_QUIZ,
} from '../data/scienceLabData';
import {
  ENGLISH_TRANSFORMATIONS,
  type SentenceTransformationItem,
} from '../data/englishDziDatabase';
import {
  BG_CONSTITUTION_INSTITUTIONS,
  CIVICS_QUIZ_QUESTIONS,
  EU_INSTITUTIONS,
  type CivicsQuizQuestion,
} from '../data/civicsEuDatabase';
import {
  BULGARIA_GEO_REGIONS,
  HISTORICAL_FIGURES_BY_SOURCE,
  HISTORICAL_TREATIES_AND_MAPS,
  HISTORY_GEO_QUIZ_QUESTIONS,
  STRATEGIC_ENERGY_TECH_HUBS,
  type HistoryGeoQuizQuestion,
} from '../data/historyGeoDatabase';
import type { HistoricalCaseStudy } from '../data/historicalCasesData';

function placeCorrectAtTargetIndex(
  correctOption: string,
  distractors: string[],
  targetIdx: number,
  seed: number
): { options: string[]; correctIndex: number } {
  const uniqueDistractors: string[] = [];
  for (const d of distractors) {
    const clean = d.trim();
    if (clean && clean !== correctOption.trim() && !uniqueDistractors.includes(clean)) {
      uniqueDistractors.push(clean);
    }
  }
  while (uniqueDistractors.length < 3) {
    uniqueDistractors.push(`Алтернативно твърдение извън условието (#${uniqueDistractors.length + 1})`);
  }
  const picked = [
    uniqueDistractors[seed % uniqueDistractors.length],
    uniqueDistractors[(seed + 1) % uniqueDistractors.length],
    uniqueDistractors[(seed + 2) % uniqueDistractors.length],
  ];
  const safeIdx = ((targetIdx % 4) + 4) % 4;
  const options: string[] = [];
  let dCursor = 0;
  for (let i = 0; i < 4; i++) {
    if (i === safeIdx) {
      options.push(correctOption);
    } else {
      options.push(picked[dCursor++] ?? uniqueDistractors[0]);
    }
  }
  return { options, correctIndex: safeIdx };
}

export const AUTHOR_LINKED_LESSON_MAP: Record<string, string> = {
  botev: 'literature-botev-dzi',
  vazov: 'bel-6-vazov-pod-igoto',
  aleko: 'literature-aleko-dzi',
  yavorov: 'literature-yavorov-gradushka',
  elin_pelin: 'literature-geratsite',
  yovkov: 'bel-12-grade-modern-authors-dzi-complete',
  vaptsarov: 'bel-12-vaptsarov-vyara-pesen',
  talev: 'bel-talev-dimov-romani-dzi',
  pencho_slaveykov: 'bel-12-grade-modern-authors-dzi-complete',
  debelyanov: 'bel-12-grade-modern-authors-dzi-complete',
  smirnenski: 'bel-12-grade-modern-authors-dzi-complete',
  geo_milev: 'bel-12-grade-modern-authors-dzi-complete',
  dalchev: 'bel-12-grade-modern-authors-dzi-complete',
  bagryana: 'bel-12-grade-modern-authors-dzi-complete',
  dimov: 'literature-tyutyun',
};

/**
 * 1. Литературен канон (ДЗИ БЕЛ) — безкраен генератор върху избрания автор и творбите му
 */
export function generateAuthorInfiniteQuiz(
  author: LiteratureAuthor,
  allAuthors: LiteratureAuthor[],
  variantNumber: number
): QuizQuestion[] {
  const safeVariant = Math.max(1, Math.floor(variantNumber));
  const otherAuthors = allAuthors.filter((a) => a.id !== author.id);
  const allOtherWorks = otherAuthors.flatMap((a) =>
    a.works.map((w) => ({ ...w, authorName: a.name }))
  );
  const results: QuizQuestion[] = [];
  let qCounter = 0;

  author.works.forEach((work, wIdx) => {
    const seed = safeVariant * 13 + wIdx * 7;

    // Въпрос за жанр и година по канона на МОН
    const genreDistractors = allOtherWorks
      .filter((ow) => ow.genre !== work.genre)
      .slice((seed % 5), (seed % 5) + 6)
      .map((ow) => `${ow.genre} (${ow.year} г. — като при „${ow.title}“)`);
    const genrePlacement = placeCorrectAtTargetIndex(
      `${work.genre} (${work.year} г.)`,
      genreDistractors,
      (qCounter + safeVariant) % 4,
      seed
    );
    results.push({
      id: safeVariant * 100 + (++qCounter),
      question: `[Вариант #${safeVariant} • Жанр и хронология] Какъв е точният жанр и годината на публикуване на творбата „${work.title}“ от ${author.name} според изпитната програма на МОН?`,
      options: genrePlacement.options,
      correctIndex: genrePlacement.correctIndex,
      explanation: `Произведението „${work.title}“ на ${author.name} (${author.period}) е с жанр „${work.genre}“ (${work.year} г.). Основна идея: ${work.coreIdea}`,
    });

    // Въпрос за разпознаване на ключов цитат и основен конфликт
    const quoteDistractors = allOtherWorks
      .slice((seed + 2) % Math.max(1, allOtherWorks.length - 4))
      .map((ow) => `„${ow.title}“ (${ow.authorName}) — конфликт: ${ow.conflict}`);
    const quotePlacement = placeCorrectAtTargetIndex(
      `„${work.title}“ (${author.name}) — конфликт: ${work.conflict}`,
      quoteDistractors,
      (qCounter + safeVariant) % 4,
      seed + 3
    );
    results.push({
      id: safeVariant * 100 + (++qCounter),
      question: `[Вариант #${safeVariant} • Цитат и конфликт] От коя творба е цитатът: ${work.famousQuote} и какъв основен художествен конфликт разгръща тя?`,
      options: quotePlacement.options,
      correctIndex: quotePlacement.correctIndex,
      explanation: `Цитатът е от „${work.title}“ (${work.genre}, ${work.year} г.) на ${author.name}. Централният конфликт в творбата е: ${work.conflict}`,
    });
  });

  // Въпрос върху тезата за Задача 41 (Есе / Интерпретативно съчинение)
  const activeEssay = author.essayThemes[(safeVariant - 1) % author.essayThemes.length];
  if (activeEssay) {
    const essayDistractors = otherAuthors
      .flatMap((oa) => oa.essayThemes.map((et) => et.thesisPreview))
      .slice(safeVariant % 4, (safeVariant % 4) + 5);
    const essayPlacement = placeCorrectAtTargetIndex(
      activeEssay.thesisPreview,
      essayDistractors,
      (qCounter + safeVariant) % 4,
      safeVariant * 19
    );
    results.push({
      id: safeVariant * 100 + (++qCounter),
      question: `[Вариант #${safeVariant} • Задача 41 ДЗИ] Коя аргументативна теза отговаря на изпитната тема „${activeEssay.theme}“ върху творчеството на ${author.name}?`,
      options: essayPlacement.options,
      correctIndex: essayPlacement.correctIndex,
      explanation: `За темата „${activeEssay.theme}“ (${author.name}) препоръчителните творби са: ${activeEssay.recommendedWorks.join(', ')}. Образцова теза: ${activeEssay.thesisPreview}`,
    });
  }

  return results;
}

/**
 * 2. Граматика, Правопис и Пунктуация (БАН / МОН) — безкраен генератор с нови изречения
 */
export function generateGrammarInfiniteQuestions(
  categoryId: 'all' | GrammarQuestion['categoryId'],
  variantNumber: number
): GrammarQuestion[] {
  const v = Math.max(1, Math.floor(variantNumber));

  const subjectsFull = [
    { full: 'Директорът на гимназията', short: 'Директора на гимназията', objFull: 'новият правилник', objShort: 'новия правилник', verb: 'подписа' },
    { full: 'Председателят на комисията', short: 'Председателя на комисията', objFull: 'окончателният протокол', objShort: 'окончателния протокол', verb: 'одобри' },
    { full: 'Главният архитект', short: 'Главния архитект', objFull: 'градоустройственият план', objShort: 'градоустройствения план', verb: 'представи' },
    { full: 'Младият изследовател', short: 'Младия изследовател', objFull: 'лабораторният доклад', objShort: 'лабораторния доклад', verb: 'публикува' },
  ];
  const sPick = subjectsFull[(v - 1) % subjectsFull.length];
  const artPlacement = placeCorrectAtTargetIndex(
    `${sPick.full} ${sPick.verb} ${sPick.objShort} още преди обяд.`,
    [
      `${sPick.short} ${sPick.verb} ${sPick.objShort} още преди обяд.`,
      `${sPick.full} ${sPick.verb} ${sPick.objFull} още преди обяд.`,
      `${sPick.short} ${sPick.verb} ${sPick.objFull} още преди обяд.`,
    ],
    v % 4,
    v * 11
  );

  const gerundClauses = [
    { gerund: 'Преглеждайки внимателно черновата си', main: 'зрелостникът откри две пунктуационни грешки' },
    { gerund: 'Анализирайки историческите извори', main: 'учениците формулираха убедителна теза' },
    { gerund: 'Спазвайки книжовните норми на БАН', main: 'кандидатът постигна максимален брой точки' },
    { gerund: 'Преминавайки през планинския проход', main: 'отрядът забеляза старите укрепления' },
  ];
  const gPick = gerundClauses[(v - 1) % gerundClauses.length];
  const punctPlacement = placeCorrectAtTargetIndex(
    `${gPick.gerund}, ${gPick.main}, преди да предаде работата.`,
    [
      `${gPick.gerund} ${gPick.main}, преди да предаде работата.`,
      `${gPick.gerund}, ${gPick.main} преди, да предаде работата.`,
      `${gPick.gerund} ${gPick.main} преди да предаде работата.`,
    ],
    (v + 1) % 4,
    v * 17
  );

  const orthoPairs = [
    {
      correct: 'Заместник-министърът разгледа научноизследователския проект на триетажния институт.',
      wrong1: 'Заместник министърът разгледа научно-изследователския проект на триетажния институт.',
      wrong2: 'Заместникминистърът разгледа научноизследователския проект на три-етажния институт.',
      wrong3: 'Заместник-министърът неразгледа научноизследователския проект на триетажния институт.',
      note: '„Заместник-министър“ се пише полуслято (равноправни съществителни), а „научноизследователски“ и „триетажен“ — слято (подчинена връзка).',
    },
    {
      correct: 'Кандидат-студентът предаде историко-географския анализ в уречения срок.',
      wrong1: 'Кандидат студентът предаде историкогеографския анализ в уречения срок.',
      wrong2: 'Кандидатстудентът предаде историко-географския анализ в не уречения срок.',
      wrong3: 'Кандидат-студентът не-предаде историко-географския анализ в уречения срок.',
      note: '„Кандидат-студент“ и „историко-географски“ (равноправни основи) се пишат полуслято с дефис.',
    },
  ];
  const oPick = orthoPairs[(v - 1) % orthoPairs.length];
  const orthoPlacement = placeCorrectAtTargetIndex(
    oPick.correct,
    [oPick.wrong1, oPick.wrong2, oPick.wrong3],
    (v + 2) % 4,
    v * 23
  );

  const doubleNPairs = [
    {
      correct: 'Военновременната хроника описва свещената клетва и писмената защита на пратеника.',
      wrong1: 'Военновременната хроника описва свещенната клетва и писменната защита на пратеника.',
      wrong2: 'Военовременната хроника описва свещената клетва и писменната защита на пратенника.',
      wrong3: 'Военновременната хроника описва свещенната клетва и писмената защита на пратенника.',
      note: '„Военновременна“ е с двойно -нн- (военен → военно-), докато „свещена“ (свещен), „писмена“ (писмен) и „пратеник“ са с едно -н-.',
    },
    {
      correct: 'Многостранната дейност на възрожденеца е несъмнена и истинна заслуга за просветата.',
      wrong1: 'Многостранната дейност на възрожденеца е несъмненна и истинна заслуга за просветата.',
      wrong2: 'Многостраната дейност на възрожденеца е несъмнена и истина заслуга за просветата.',
      wrong3: 'Многостранната дейност на възрожденеца е несъмненна и искренна заслуга за просветата.',
      note: 'Прилагателните „многостранен“ → „многостранна“ и „истинен“ → „истинна“ запазват двойно -нн-, а „несъмнен“ → „несъмнена“ и „искрен“ → „искрена“ се пишат с едно -н-.',
    },
  ];
  const nPick = doubleNPairs[(v - 1) % doubleNPairs.length];
  const doubleNPlacement = placeCorrectAtTargetIndex(
    nPick.correct,
    [nPick.wrong1, nPick.wrong2, nPick.wrong3],
    (v + 3) % 4,
    v * 29
  );

  const countNums = [3 + (v % 6), 5 + (v % 4)];
  const n1 = countNums[0];
  const n2 = countNums[1];
  const pronPlacement = placeCorrectAtTargetIndex(
    `Господин професоре, Вие сте поканен от ${n1}-ма ученици да оцените ${n2} научни доклада, но на кого ще възложите рецензията?`,
    [
      `Господин професоре, Вие сте поканени от ${n1} ученика да оцените ${n2} научни доклади, но на кой ще възложите рецензията?`,
      `Господин професоре, Вие сте поканен от ${n1}-ма ученика да оцените ${n2} научни доклади, но на кого ще възложите рецензията?`,
      `Господин професоре, Вие сте поканени от ${n1}-ма ученици да оцените ${n2} научни доклада, но на кой ще възложите рецензията?`,
    ],
    v % 4,
    v * 31
  );

  const generated: GrammarQuestion[] = [
    {
      id: `gram-inf-v${v}-article`,
      categoryId: 'article',
      categoryLabel: 'Пълен и кратък член',
      difficulty: 'dzi_exam',
      sentence: `${sPick.full} / ${sPick.objShort} (Вариант #${v})`,
      question: `[Вариант #${v}] В кое изречение е допусната НУЛА грешка при членуването на имената от мъжки род единствено число?`,
      options: artPlacement.options,
      correctIndex: artPlacement.correctIndex,
      explanation: `Подлогът „${sPick.full}“ (кой? — той) се членува с пълен член, а прякото допълнение „${sPick.objShort}“ (кого/какво? — него) се членува с кратък член.`,
      monExamReference: 'ДЗИ БЕЛ • Граматична норма (членуване)',
    },
    {
      id: `gram-inf-v${v}-punct`,
      categoryId: 'punctuation',
      categoryLabel: 'Запетаи в сложни изречения',
      difficulty: 'dzi_exam',
      sentence: `${gPick.gerund}... преди да предаде работата (Вариант #${v})`,
      question: `[Вариант #${v}] В кое изречение пунктуацията при деепричастен оборот и сложен съюз „преди да“ е напълно коректна?`,
      options: punctPlacement.options,
      correctIndex: punctPlacement.correctIndex,
      explanation: `Деепричастният оборот („${gPick.gerund}“) винаги се отделя със запетая, а пред сложния съюз „преди да“ запетаята стои пред цялото съюзно съчетание, а не пред „да“.`,
      monExamReference: 'ДЗИ БЕЛ • Пунктуационна норма',
    },
    {
      id: `gram-inf-v${v}-ortho`,
      categoryId: 'orthography',
      categoryLabel: 'Слято, полуслято и разделно',
      difficulty: 'dzi_exam',
      sentence: `Сложни съществителни и прилагателни имена (Вариант #${v})`,
      question: `[Вариант #${v}] В кое изречение са спазени всички правила за слято, полуслято и разделно писане по Официалния правописен речник на БАН?`,
      options: orthoPlacement.options,
      correctIndex: orthoPlacement.correctIndex,
      explanation: oPick.note,
      monExamReference: 'ДЗИ БЕЛ • Правописна норма (сложни думи)',
    },
    {
      id: `gram-inf-v${v}-doublen`,
      categoryId: 'double_n',
      categoryLabel: 'Двойно -НН- и групи -СТН-/-ЗДН-',
      difficulty: 'olympiad',
      sentence: `Правопис на двойно -нн- при прилагателни и причастия (Вариант #${v})`,
      question: `[Вариант #${v}] В кое изречение НЕ е допусната правописна грешка при писането на -н- и -нн-?`,
      options: doubleNPlacement.options,
      correctIndex: doubleNPlacement.correctIndex,
      explanation: nPick.note,
      monExamReference: 'ДЗИ БЕЛ • Правописна норма (-н- / -нн-)',
    },
    {
      id: `gram-inf-v${v}-pronouns`,
      categoryId: 'pronouns_quant',
      categoryLabel: 'Кой/Кого, Бройна и Учтива форма',
      difficulty: 'olympiad',
      sentence: `Учтива форма, бройна форма и местоимения за лица (Вариант #${v})`,
      question: `[Вариант #${v}] В кое изречение са спазени едновременно нормите за учтива форма, бройна форма за нелица и личното местоимение „кого“?`,
      options: pronPlacement.options,
      correctIndex: pronPlacement.correctIndex,
      explanation: `При учтивост миналото страдателно причастие остава в ед.ч. („Вие сте поканен“), за лица мъже се използва лично-бройна форма („${n1}-ма ученици“), за нелица — бройна форма („${n2} научни доклада“), а за пряко/предложно допълнение лице — „на кого“.`,
      monExamReference: 'ДЗИ БЕЛ • Граматична норма (комплексна задача)',
    },
  ];

  if (categoryId === 'all') {
    return generated;
  }
  return generated.filter((q) => q.categoryId === categoryId);
}

/**
 * 3. Модул 2 БЕЛ (Тропи, Фигури, Пароними, Четене с разбиране и Резюме) — безкраен генератор
 */
export function generateModuleTwoInfiniteQuestions(
  subcategory: 'all' | 'figures' | 'lexicology' | 'reading',
  variantNumber: number
): ModuleTwoQuestion[] {
  const v = Math.max(1, Math.floor(variantNumber));
  const items: ModuleTwoQuestion[] = [];

  // 2 въпроса от FIGURES_AND_TROPES
  for (let i = 0; i < 2; i++) {
    const fig = FIGURES_AND_TROPES[(v + i) % FIGURES_AND_TROPES.length];
    const ex = fig.canonExamples[(v + i) % fig.canonExamples.length];
    const distractors = FIGURES_AND_TROPES.filter((f) => f.id !== fig.id).map(
      (f) => `${f.name} — ${f.kindLabel}`
    );
    const placement = placeCorrectAtTargetIndex(
      `${fig.name} — ${fig.kindLabel}`,
      distractors,
      (v + i) % 4,
      v * 13 + i
    );
    items.push({
      id: `m2-inf-v${v}-fig-${i}`,
      subcategory: 'figures',
      subcategoryLabel: 'Тропи и фигури',
      excerpt: ex.quote,
      authorOrSource: ex.workAndAuthor,
      question: `[Вариант #${v}] Кое художествено изразно средство е водещо в посочения откъс от ${ex.workAndAuthor}?`,
      options: placement.options,
      correctIndex: placement.correctIndex,
      explanation: `${fig.name} (${fig.definition}). Анализ: ${ex.analysis}`,
    });
  }

  // 2 въпроса от PARONYMS_AND_IDIOMS
  for (let i = 0; i < 2; i++) {
    const lex = PARONYMS_AND_IDIOMS[(v + i) % PARONYMS_AND_IDIOMS.length];
    const distractors = PARONYMS_AND_IDIOMS.filter((p) => p.id !== lex.id).map(
      (p) => `${p.title}: ${p.meaningA}`
    );
    const placement = placeCorrectAtTargetIndex(
      `${lex.title}: ${lex.meaningA}`,
      distractors,
      (v + i + 2) % 4,
      v * 17 + i
    );
    items.push({
      id: `m2-inf-v${v}-lex-${i}`,
      subcategory: 'lexicology',
      subcategoryLabel: 'Лексикология, пароними и фразеологизми',
      excerpt: lex.exampleCorrect,
      authorOrSource: 'Книжовна лексикална норма (ДЗИ БЕЛ)',
      question: `[Вариант #${v}] Коя лексикална двойка или фразеологизъм се илюстрира правилно чрез примера и какво е точното му значение?`,
      options: placement.options,
      correctIndex: placement.correctIndex,
      explanation: `${lex.meaningA}${lex.meaningB ? ` • Контраст: ${lex.meaningB}` : ''} • Изпитен капан: ${lex.monTrapNote}`,
    });
  }

  // 2 въпроса от READING_SYNTHESIS_TASKS
  for (let i = 0; i < 2; i++) {
    const task = READING_SYNTHESIS_TASKS[(v + i) % READING_SYNTHESIS_TASKS.length];
    const placement = placeCorrectAtTargetIndex(
      task.modelAnswer,
      [
        `Свободно есе с лични спомени, риторични въпроси и директни цитати от текста без синтез.`,
        `Буквално преписване на първите две изречения от текста с добавени оценъчни коментари от първо лице.`,
        `Разказвателен преразказ с пряка реч и художествени епитети извън фактологията на източника.`,
      ],
      (v + i + 1) % 4,
      v * 23 + i
    );
    items.push({
      id: `m2-inf-v${v}-read-${i}`,
      subcategory: 'reading',
      subcategoryLabel: 'Четене с разбиране и синтез',
      excerpt: task.sourceExcerpt,
      authorOrSource: `${task.examType} • ${task.title}`,
      question: `[Вариант #${v}] ${task.taskPrompt} Кой от следните варианти спазва всички критерии на МОН (${task.pointsBreakdown})?`,
      options: placement.options,
      correctIndex: placement.correctIndex,
      explanation: `Задължителни критерии на МОН: ${task.mandatoryCriteria.join(' • ')}. Забранени грешки: ${task.forbiddenMistakes.join(' • ')}`,
    });
  }

  if (subcategory === 'all') return items;
  return items.filter((item) => item.subcategory === subcategory);
}

/**
 * 4. Математика & STEM Лаборатория — безкраен параметризиран генератор с нови числа
 */
export function generateMathLabInfiniteQuiz(
  category: MathCategory | 'all',
  variantNumber: number
): MathQuizQuestion[] {
  const v = Math.max(1, Math.floor(variantNumber));

  // 1. Алгебра (Виет): x^2 - (r1+r2)x + r1*r2 = 0, търсим x1^2 + x2^2
  const r1 = (v % 5) + 2;
  const r2 = ((v + 2) % 6) + 3;
  const sum = r1 + r2;
  const prod = r1 * r2;
  const sumSquares = sum * sum - 2 * prod;
  const algPlace = placeCorrectAtTargetIndex(
    `x₁² + x₂² = ${sumSquares} (тъй като x₁ + x₂ = ${sum} и x₁·x₂ = ${prod})`,
    [
      `x₁² + x₂² = ${sum * sum + 2 * prod} (прибавяме 2·x₁·x₂)`,
      `x₁² + x₂² = ${sum * sum} (квадрат на сбора без корекция)`,
      `x₁² + x₂² = ${sum * sum - prod} (изваждаме само веднъж произведението)`,
    ],
    v % 4,
    v * 11
  );

  // 2. Прогресии: Аритметична прогресия с a1 и d
  const a1 = (v % 7) + 3;
  const d = (v % 4) + 2;
  const n = 10;
  const a10 = a1 + (n - 1) * d;
  const s10 = ((a1 + a10) * n) / 2;
  const progPlace = placeCorrectAtTargetIndex(
    `a₁₀ = ${a10} и S₁₀ = ${s10}`,
    [
      `a₁₀ = ${a1 + n * d} и S₁₀ = ${s10 + d * 5}`,
      `a₁₀ = ${a10} и S₁₀ = ${(a1 + a10) * n}`,
      `a₁₀ = ${a1 * d} и S₁₀ = ${s10 - a1}`,
    ],
    (v + 1) % 4,
    v * 13
  );

  // 3. Планиметрия (Косинусова и Синусова теорема)
  const scale = (v % 4) + 1;
  const sideA = 3 * scale;
  const sideB = 4 * scale;
  const hypC = 5 * scale;
  const area = (sideA * sideB) / 2;
  const inradius = (sideA + sideB - hypC) / 2;
  const circumradius = hypC / 2;
  const geomPlace = placeCorrectAtTargetIndex(
    `c = ${hypC} cm, S = ${area} cm², r = ${inradius} cm, R = ${circumradius} cm`,
    [
      `c = ${hypC} cm, S = ${sideA * sideB} cm², r = ${inradius + 1} cm, R = ${hypC} cm`,
      `c = ${sideA + sideB} cm, S = ${area} cm², r = ${inradius} cm, R = ${circumradius} cm`,
      `c = ${hypC} cm, S = ${area} cm², r = ${circumradius} cm, R = ${inradius} cm`,
    ],
    (v + 2) % 4,
    v * 17
  );

  // 4. Стереометрия (Цилиндър: r, h)
  const cylR = (v % 5) + 2;
  const cylH = (v % 6) + 4;
  const cylV = cylR * cylR * cylH;
  const cylS1 = 2 * cylR * cylH + 2 * cylR * cylR;
  const stereoPlace = placeCorrectAtTargetIndex(
    `V = ${cylV}π cm³ и S₁ = ${cylS1}π cm²`,
    [
      `V = ${2 * cylR * cylH}π cm³ и S₁ = ${cylR * cylR * cylH}π cm²`,
      `V = ${cylV}π cm³ и S₁ = ${2 * cylR * cylH}π cm² (без двете основи)`,
      `V = ${Math.round(cylV / 3)}π cm³ и S₁ = ${cylS1}π cm²`,
    ],
    (v + 3) % 4,
    v * 19
  );

  // 5. Вероятности (класическа вероятност и комбинаторика)
  const whiteBalls = (v % 5) + 4;
  const blackBalls = (v % 4) + 3;
  const totalBalls = whiteBalls + blackBalls;
  const totalPairs = (totalBalls * (totalBalls - 1)) / 2;
  const whitePairs = (whiteBalls * (whiteBalls - 1)) / 2;
  const probPlace = placeCorrectAtTargetIndex(
    `P = C(${whiteBalls}, 2) / C(${totalBalls}, 2) = ${whitePairs} / ${totalPairs}`,
    [
      `P = ${whiteBalls} / ${totalBalls} = ${(whiteBalls / totalBalls).toFixed(2)}`,
      `P = (${whiteBalls} · ${whiteBalls}) / (${totalBalls} · ${totalBalls}) = ${whiteBalls * whiteBalls} / ${totalBalls * totalBalls}`,
      `P = ${whitePairs} / ${totalBalls * (totalBalls - 1)}`,
    ],
    v % 4,
    v * 23
  );

  // 6. Математически анализ (Производна и локален екстремум): f(x) = x^2 - 2*k*x + c
  const kParam = (v % 7) + 2;
  const cConst = (v % 9) + 5;
  const minVal = cConst - kParam * kParam;
  const calcPlace = placeCorrectAtTargetIndex(
    `f'(x) = 2x - ${2 * kParam}, локален минимум в x = ${kParam} със стойност f_min = ${minVal}`,
    [
      `f'(x) = 2x - ${kParam}, локален минимум в x = ${2 * kParam} със стойност f_min = ${cConst}`,
      `f'(x) = x - ${2 * kParam}, локален максимум в x = ${kParam} със стойност f_max = ${minVal}`,
      `f'(x) = 2x - ${2 * kParam}, локален минимум в x = -${kParam} със стойност f_min = ${cConst + kParam * kParam}`,
    ],
    (v + 1) % 4,
    v * 29
  );

  const allGenerated: MathQuizQuestion[] = [
    {
      id: `math-inf-v${v}-alg`,
      category: 'algebra',
      examType: 'НВО 10 & ДЗИ',
      question: `[Вариант #${v}] Ако x₁ и x₂ са корените на квадратното уравнение x² - ${sum}x + ${prod} = 0, пресметнете стойността на симетричния израз x₁² + x₂² чрез формулите на Виет.`,
      options: algPlace.options,
      correctIndex: algPlace.correctIndex,
      formulaReference: 'Формули на Виет: x₁ + x₂ = -b/a, x₁·x₂ = c/a; x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂',
      explanation: `По формулите на Виет имаме x₁ + x₂ = ${sum} и x₁·x₂ = ${prod}. Тогава x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ = ${sum}² - 2·${prod} = ${sum * sum} - ${2 * prod} = ${sumSquares}.`,
    },
    {
      id: `math-inf-v${v}-prog`,
      category: 'progressions',
      examType: 'НВО 10 & ДЗИ',
      question: `[Вариант #${v}] Дадена е аритметична прогресия с първи член a₁ = ${a1} и разлика d = ${d}. Намерете десетия член a₁₀ и сумата на първите десет члена S₁₀.`,
      options: progPlace.options,
      correctIndex: progPlace.correctIndex,
      formulaReference: 'aₙ = a₁ + (n - 1)d • Sₙ = ((a₁ + aₙ)·n) / 2',
      explanation: `За n = 10: a₁₀ = ${a1} + 9·${d} = ${a10}. Сумата е S₁₀ = ((${a1} + ${a10})·10)/2 = ${a1 + a10}·5 = ${s10}.`,
    },
    {
      id: `math-inf-v${v}-geom`,
      category: 'geometry',
      examType: 'НВО 10. клас',
      question: `[Вариант #${v}] В правоъгълен триъгълник ABC (∠C = 90°) катетите са a = ${sideA} cm и b = ${sideB} cm. Намерете хипотенузата c, лицето S, радиуса на вписаната окръжност r и радиуса на описаната окръжност R.`,
      options: geomPlace.options,
      correctIndex: geomPlace.correctIndex,
      formulaReference: 'c² = a² + b² • S = a·b/2 • r = (a + b - c)/2 • R = c/2',
      explanation: `По Питагоровата теорема c = √(${sideA}² + ${sideB}²) = ${hypC} cm. Лицето е S = (${sideA}·${sideB})/2 = ${area} cm², r = (${sideA} + ${sideB} - ${hypC})/2 = ${inradius} cm, а R = c/2 = ${circumradius} cm.`,
    },
    {
      id: `math-inf-v${v}-stereo`,
      category: 'stereometry',
      examType: 'НВО 10 & ДЗИ',
      question: `[Вариант #${v}] Прав кръгов цилиндър има радиус на основата r = ${cylR} cm и височина h = ${cylH} cm. Намерете обема V и пълната повърхнина S₁ на цилиндъра.`,
      options: stereoPlace.options,
      correctIndex: stereoPlace.correctIndex,
      formulaReference: 'V = π·r²·h • S₁ = 2π·r·h + 2π·r²',
      explanation: `V = π·${cylR}²·${cylH} = ${cylV}π cm³. Пълната повърхнина е S₁ = 2π·${cylR}·${cylH} + 2π·${cylR}² = ${2 * cylR * cylH}π + ${2 * cylR * cylR}π = ${cylS1}π cm².`,
    },
    {
      id: `math-inf-v${v}-prob`,
      category: 'probabilities',
      examType: 'ДЗИ Матура',
      question: `[Вариант #${v}] В кутия има ${whiteBalls} бели и ${blackBalls} черни топки (общо ${totalBalls} топки). По случаен начин едновременно се изтеглят 2 топки. Каква е вероятността и двете изтеглени топки да са бели?`,
      options: probPlace.options,
      correctIndex: probPlace.correctIndex,
      formulaReference: 'P(A) = m / n = C(k, 2) / C(N, 2)',
      explanation: `Общият брой комбинации от 2 топки измежду ${totalBalls} е C(${totalBalls}, 2) = (${totalBalls}·${totalBalls - 1})/2 = ${totalPairs}. Благоприятните комбинации от 2 бели топки са C(${whiteBalls}, 2) = (${whiteBalls}·${whiteBalls - 1})/2 = ${whitePairs}. Вероятността е P = ${whitePairs}/${totalPairs}.`,
    },
    {
      id: `math-inf-v${v}-calc`,
      category: 'calculus',
      examType: 'ДЗИ Профил / ТУ',
      question: `[Вариант #${v}] Намерете първата производна f'(x), критичната точка и локалния минимум на функцията f(x) = x² - ${2 * kParam}x + ${cConst}.`,
      options: calcPlace.options,
      correctIndex: calcPlace.correctIndex,
      formulaReference: `(xⁿ)' = n·xⁿ⁻¹ • Условие за екстремум: f'(x₀) = 0`,
      explanation: `Диференцираме: f'(x) = 2x - ${2 * kParam}. От f'(x) = 0 намираме x = ${kParam}. Тъй като f''(x) = 2 > 0, в x = ${kParam} функцията има локален минимум f(${kParam}) = ${kParam}² - ${2 * kParam}·${kParam} + ${cConst} = ${minVal}.`,
    },
  ];

  if (category === 'all') return allGenerated;
  return allGenerated.filter((q) => q.category === category);
}

/**
 * 5. Природни науки (Биология, Химия и Физика) — безкраен генератор върху лабораторните данни
 */
export function generateScienceLabInfiniteQuiz(variantNumber: number): typeof SCIENCE_QUIZ {
  const v = Math.max(1, Math.floor(variantNumber));
  const baseId = 1000 + v * 10;

  // 1. Биология — PCR амплификация и генетичен код
  const pcrCycles = 6 + (v % 7); // между 6 и 12 цикъла
  const pcrCopies = Math.pow(2, pcrCycles);
  const codonKeys = Object.keys(CODON_TABLE).filter((k) => CODON_TABLE[k].type !== 'stop');
  const pickedCodon = codonKeys[(v * 3) % codonKeys.length];
  const codonInfo = CODON_TABLE[pickedCodon];
  const bioPlace1 = placeCorrectAtTargetIndex(
    `${pcrCopies} копия ДНК (2^${pcrCycles}); кодонът 5'-${pickedCodon}-3' кодира ${codonInfo.name} (${codonInfo.short})`,
    [
      `${pcrCycles * 2} копия ДНК; кодонът 5'-${pickedCodon}-3' е терминален СТОП кодон`,
      `${Math.pow(2, pcrCycles - 1)} копия ДНК; кодонът 5'-${pickedCodon}-3' кодира ДНК-полимераза`,
      `${pcrCycles * 100} копия ДНК; кодонът не се превежда при транслация`,
    ],
    v % 4,
    v * 11
  );

  // 2. Биология — АТФ енергиен добив
  const glucoseMoles = (v % 5) + 2;
  const totalAtp = glucoseMoles * 38;
  const glycolAtp = glucoseMoles * 2;
  const bioPlace2 = placeCorrectAtTargetIndex(
    `Сумарно ${totalAtp} mol АТФ, от които ${glycolAtp} mol пряко от гликолизата`,
    [
      `Сумарно ${glucoseMoles * 2} mol АТФ, тъй като цикълът на Кребс не образува коензими`,
      `Сумарно ${totalAtp} mol АТФ, всичките синтезирани в цитозола чрез гликолиза`,
      `Сумарно ${glucoseMoles * 10} mol АТФ, от които ${glucoseMoles * 8} mol от фотолиза на водата`,
    ],
    (v + 1) % 4,
    v * 13
  );

  // 3. Химия — Качествена йонна реакция и хидролиза на соли
  const ionRx = ION_REACTIONS[(v - 1) % ION_REACTIONS.length];
  const saltCase = HYDROLYSIS_SALTS[(v - 1) % HYDROLYSIS_SALTS.length];
  const chemPlace1 = placeCorrectAtTargetIndex(
    `${ionRx.precipitateBadge} (${ionRx.netIonicEq}); а разтворът на ${saltCase.formula} има ${saltCase.phRange}`,
    [
      `Не се наблюдава видима промяна; разтворът на ${saltCase.formula} винаги има pH = 7,0`,
      `Отделя се водороден газ; разтворът на ${saltCase.formula} не дисоциира във вода`,
      `Утайката се разтваря с отделяне на озон; ${saltCase.formula} е неразтворим оксид`,
    ],
    (v + 2) % 4,
    v * 17
  );

  // 4. Химия — Органичен качествен анализ и неутрализация
  const orgRx = ORGANIC_QUALITATIVE_REACTIONS[(v - 1) % ORGANIC_QUALITATIVE_REACTIONS.length];
  const chemPlace2 = placeCorrectAtTargetIndex(
    `${orgRx.visualEffect} (${orgRx.reagent})`,
    [
      `Пълно пасивиране на съда без химично взаимодействие при всякаква температура`,
      `Отделяне на амоняк при стайна температура без промяна на цвета на разтвора`,
      `Образуване на червена утайка от меден оксид на студено с чист бензен`,
    ],
    (v + 3) % 4,
    v * 19
  );

  // 5. Физика — Закон на Ом и Фотоефект
  const metal = PHOTOELECTRIC_METALS[(v - 1) % PHOTOELECTRIC_METALS.length];
  const r1 = ((v % 3) + 1) * 6; // 6, 12 или 18 Ω
  const r2 = r1 / 2; // 3, 6 или 9 Ω
  const rEq = (r1 * r2) / (r1 + r2);
  const voltage = rEq * ((v % 4) + 3);
  const current = voltage / rEq;
  const physPlace1 = placeCorrectAtTargetIndex(
    `R_екв = ${rEq} Ω, I = ${current} A; за ${metal.name} A = ${metal.workFunctionEv} eV (λ_max = ${metal.redLimitNm} nm)`,
    [
      `R_екв = ${r1 + r2} Ω, I = ${(voltage / (r1 + r2)).toFixed(1)} A; фотоефект настъпва при всякаква дължина на вълната`,
      `R_екв = ${rEq} Ω, I = ${voltage * rEq} A; отделителната работа зависи от интензитета на лампата`,
      `R_екв = ${r1 - r2} Ω, I = 1 A; за ${metal.name} червената граница е над 2000 nm`,
    ],
    v % 4,
    v * 23
  );

  // 6. Физика — Цикъл на Карно
  const tHotK = 500 + (v % 4) * 100; // 500, 600, 700, 800 K
  const tColdK = 300;
  const etaPercent = (((tHotK - tColdK) / tHotK) * 100).toFixed(1);
  const physPlace2 = placeCorrectAtTargetIndex(
    `η_max = (T₁ - T₂)/T₁ = (${tHotK} - ${tColdK})/${tHotK} = ${etaPercent}%`,
    [
      `η_max = T₂/T₁ = ${((tColdK / tHotK) * 100).toFixed(1)}%`,
      `η_max = ((${tHotK - 273} - ${tColdK - 273})/${tHotK - 273}) = ${(((tHotK - tColdK) / (tHotK - 273)) * 100).toFixed(1)}% (в градуси Целзий)`,
      `η_max = 100% при отсъствие на механично триене`,
    ],
    (v + 1) % 4,
    v * 29
  );

  return [
    {
      id: baseId + 1,
      subject: 'Биология',
      question: `[Вариант #${v}] Колко копия ДНК ще се получат от 1 матрична молекула след n = ${pcrCycles} цикъла на PCR и коя аминокиселина се кодира от иРНК триплета 5'-${pickedCodon}-3'?`,
      options: bioPlace1.options,
      correctIndex: bioPlace1.correctIndex,
      explanation: `По формулата N = 2ⁿ за ${pcrCycles} цикъла се получават 2^${pcrCycles} = ${pcrCopies} копия. Според генетичния код иРНК кодонът 5'-${pickedCodon}-3' кодира ${codonInfo.name} (${codonInfo.short}).`,
    },
    {
      id: baseId + 2,
      subject: 'Биология',
      question: `[Вариант #${v}] При пълно аеробно окисление на ${glucoseMoles} mol глюкоза (при добив 38 mol АТФ/mol глюкоза) колко мола АТФ се синтезират общо и колко от тях са от субстратното фосфорилиране в гликолизата?`,
      options: bioPlace2.options,
      correctIndex: bioPlace2.correctIndex,
      explanation: `За 1 mol глюкоза гликолизата дава чист добив 2 mol АТФ, а пълното аеробно разграждане — 38 mol АТФ. За ${glucoseMoles} mol глюкоза: ${glucoseMoles} × 38 = ${totalAtp} mol АТФ общо и ${glucoseMoles} × 2 = ${glycolAtp} mol АТФ от гликолизата.`,
    },
    {
      id: baseId + 3,
      subject: 'Химия',
      question: `[Вариант #${v}] Какъв е резултатът при смесване на ${ionRx.reagentPair} и какъв е характерът на средата във воден разтвор на ${saltCase.formula}?`,
      options: chemPlace1.options,
      correctIndex: chemPlace1.correctIndex,
      explanation: `Съкратено йонно уравнение: ${ionRx.netIonicEq} (${ionRx.precipitateBadge}). За ${saltCase.formula}: ${saltCase.hydrolysisIon}`,
    },
    {
      id: baseId + 4,
      subject: 'Химия',
      question: `[Вариант #${v}] С кой реактив и чрез какъв визуален ефект се доказват качествено: ${orgRx.compoundClass}?`,
      options: chemPlace2.options,
      correctIndex: chemPlace2.correctIndex,
      explanation: `Реактив: ${orgRx.reagent}. Уравнение: ${orgRx.equation}. Изпитен акцент: ${orgRx.muExamTip}`,
    },
    {
      id: baseId + 5,
      subject: 'Физика',
      question: `[Вариант #${v}] Два резистора R₁ = ${r1} Ω и R₂ = ${r2} Ω са свързани успоредно към източник с U = ${voltage} V. Намерете R_екв, общия ток I и посочете отделителната работа A и червената граница на фотоефекта за ${metal.name}.`,
      options: physPlace1.options,
      correctIndex: physPlace1.correctIndex,
      explanation: `При успоредно свързване R_екв = (${r1}·${r2})/(${r1}+${r2}) = ${rEq} Ω, а I = U/R_екв = ${voltage}/${rEq} = ${current} A. За ${metal.name} отделителната работа е A = ${metal.workFunctionEv} eV, а червената граница е λ_max = ${metal.redLimitNm} nm.`,
    },
    {
      id: baseId + 6,
      subject: 'Физика',
      question: `[Вариант #${v}] Идеална топлинна машина работи по цикъл на Карно между нагревател с температура T₁ = ${tHotK} K (${tHotK - 273} °C) и охладител с T₂ = ${tColdK} K (${tColdK - 273} °C). Колко е максималният термичен КПД η_max?`,
      options: physPlace2.options,
      correctIndex: physPlace2.correctIndex,
      explanation: `По формулата на Карно с абсолютни температури в келвини: η_max = (${tHotK} - ${tColdK}) / ${tHotK} = ${etaPercent}%.`,
    },
  ];
}

/**
 * 6. Английски език (CEFR B1.1 / B2 / C1) — безкраен генератор на Sentence Transformations
 */
export function generateEnglishTransformationsVariant(
  cefrFilter: 'ALL' | 'B1.1' | 'B2' | 'C1 / ESP',
  variantNumber: number
): SentenceTransformationItem[] {
  const v = Math.max(1, Math.floor(variantNumber));
  const dynamicTemplates: SentenceTransformationItem[] = [
    {
      id: `eng-inf-v${v}-1`,
      cefrLevel: 'B1.1',
      category: 'Passive & Causative',
      originalSentence: `The engineering team installed ${v + 2} new solar inverters at the school yesterday.`,
      keyWord: 'WERE',
      promptPrefix: `${v + 2} new solar inverters`,
      promptSuffix: 'by the engineering team at the school yesterday.',
      options: ['were installed', 'have been installed', 'had installed', 'are being installed'],
      correctIndex: 0,
      grammarRule: 'Past Simple Passive: was / were + Past Participle (V3)',
      monExamTrap: 'Наречието "yesterday" изисква Past Simple Passive (were installed), а не Present Perfect.',
      explanationBg: 'Подлогът е в множествено число и действието е в миналото ("yesterday"), затова използваме "were installed".',
    },
    {
      id: `eng-inf-v${v}-2`,
      cefrLevel: 'B2',
      category: 'Inversion (B2)',
      originalSentence: `The students had scarcely finished Lab Experiment #${v} when the bell rang.`,
      keyWord: 'SCARCELY',
      promptPrefix: 'Scarcely',
      promptSuffix: `Lab Experiment #${v} when the bell rang.`,
      options: [
        'the students had finished',
        'had the students finished',
        'did the students finish',
        'have the students finished',
      ],
      correctIndex: 1,
      grammarRule: 'Inversion with Scarcely / Hardly: Scarcely + had + Subject + V3 ... when',
      monExamTrap: 'След "Scarcely / Hardly" в началото на изречението задължително се прави инверсия с Past Perfect (had + subject + V3) и съюз "when".',
      explanationBg: 'Отрицателното/ограничително наречие "Scarcely" в начална позиция изисква словореда "had the students finished".',
    },
    {
      id: `eng-inf-v${v}-3`,
      cefrLevel: 'B2',
      category: 'Conditionals & Wishes',
      originalSentence: `I regret not applying for the Erasmus mobility grant in Semester #${v}.`,
      keyWord: 'WISH',
      promptPrefix: 'I',
      promptSuffix: `for the Erasmus mobility grant in Semester #${v}.`,
      options: [
        'wish I applied',
        'wish I would apply',
        'wish I had applied',
        'wish to have applied',
      ],
      correctIndex: 2,
      grammarRule: 'Wish about the past (regret): wish / if only + Past Perfect (had + V3)',
      monExamTrap: 'За съжаление относно минало действие след "I wish" се използва Past Perfect (had applied), а не Past Simple.',
      explanationBg: '"I regret not applying" изразява съжаление за минал факт, което се трансформира с "I wish I had applied".',
    },
    {
      id: `eng-inf-v${v}-4`,
      cefrLevel: 'C1 / ESP',
      category: 'C1 / Technical ESP',
      originalSentence: `If the safety valve had not opened at ${v + 10} bar, the turbine would have overheated.`,
      keyWord: 'BUT',
      promptPrefix: 'But for the opening of the safety valve at',
      promptSuffix: ', the turbine would have overheated.',
      options: [
        `${v + 10} bar, had it not`,
        `${v + 10} bar if it opened`,
        `${v + 10} bar unless opened`,
        `${v + 10} bar`,
      ],
      correctIndex: 3,
      grammarRule: 'C1 Formal Conditional: But for + Noun Phrase, would have + V3 (= If it had not been for...)',
      monExamTrap: 'Изразът "But for + съществително" замества цялото условно изречение в Третия условен тип (Third Conditional).',
      explanationBg: 'Конструкцията "But for + noun phrase" на ниво C1 означава „Ако не беше...“ в миналото.',
    },
  ];

  // Добавяме и пренаредени задачи от основната база за пълнота
  const basePool = ENGLISH_TRANSFORMATIONS.map((item, idx) => {
    const correctOpt = item.options[item.correctIndex];
    const distractors = item.options.filter((_, i) => i !== item.correctIndex);
    const placed = placeCorrectAtTargetIndex(correctOpt, distractors, (v + idx) % 4, v * 7 + idx);
    return {
      ...item,
      id: `${item.id}-v${v}`,
      options: placed.options,
      correctIndex: placed.correctIndex,
    };
  });

  const combined = [...dynamicTemplates, ...basePool];
  if (cefrFilter === 'ALL') return combined;
  return combined.filter((item) => item.cefrLevel === cefrFilter);
}

/**
 * 7. Гражданско образование, Конституция на РБ, ЕС и КТ — безкраен генератор на казуси
 */
export function generateCivicsInfiniteQuiz(
  category: 'all' | CivicsQuizQuestion['category'],
  variantNumber: number
): CivicsQuizQuestion[] {
  const v = Math.max(1, Math.floor(variantNumber));
  const bgInst = BG_CONSTITUTION_INSTITUTIONS[(v - 1) % BG_CONSTITUTION_INSTITUTIONS.length];
  const euInst = EU_INSTITUTIONS[(v - 1) % EU_INSTITUTIONS.length];

  const presentDeps = 150 + ((v * 7) % 75); // между 150 и 224 присъстващи депутати
  const simpleMajority = Math.floor(presentDeps / 2) + 1;
  const absoluteMajority = 121;

  const constPlace = placeCorrectAtTargetIndex(
    `За обикновен закон са нужни поне ${simpleMajority} гласа (> 1/2 от присъстващите ${presentDeps}), а за преодоляване на вето на Президента — поне ${absoluteMajority} гласа (> 1/2 от всички 240 депутати)`,
    [
      `И в двата случая са достатъчни ${simpleMajority} гласа от присъстващите в залата народни представители`,
      `За обикновен закон са нужни 160 гласа (2/3), а ветото на Президента е абсолютно и не може да се преодолее`,
      `За преодоляване на вето се изисква свикване на Велико Народно събрание от 400 депутати`,
    ],
    v % 4,
    v * 11
  );

  const instPlace = placeCorrectAtTargetIndex(
    `${bgInst.name} (${bgInst.branch} • ${bgInst.constitutionalArticles})`,
    BG_CONSTITUTION_INSTITUTIONS.filter((i) => i.id !== bgInst.id).map(
      (i) => `${i.name} (${i.branch} • ${i.constitutionalArticles})`
    ),
    (v + 1) % 4,
    v * 13
  );

  const euPlace = placeCorrectAtTargetIndex(
    `${euInst.name} (${euInst.seat}) — ${euInst.roleBadge}`,
    EU_INSTITUTIONS.filter((e) => e.id !== euInst.id).map(
      (e) => `${e.name} (${e.seat}) — ${e.roleBadge}`
    ),
    (v + 2) % 4,
    v * 17
  );

  const noticeDays = 30;
  const maxProbationMonths = 6;
  const laborPlace = placeCorrectAtTargetIndex(
    `Писмена форма по чл. 62 от КТ; срок за изпитване до ${maxProbationMonths} месеца (чл. 70 КТ) и стандартно предизвестие от ${noticeDays} дни при безсрочен договор (чл. 326 КТ)`,
    [
      `Устна уговорка пред свидетели; срок за изпитване до 24 месеца и 3-дневно предизвестие`,
      `Нотариално заверен граждански договор без трудови осигуровки и без платен годишен отпуск`,
      `Едностранна заповед без подпис на работника и без подаване на уведомление до НАП`,
    ],
    (v + 3) % 4,
    v * 19
  );

  const dynamicItems: CivicsQuizQuestion[] = [
    {
      id: `civ-inf-v${v}-majority`,
      category: 'constitution',
      gradeLevel: '11.–12. клас (ДЗИ)',
      scenario: `Казус #${v}: В пленарната зала на Народното събрание са се регистрирали ${presentDeps} народни представители (кворумът е налице). Гласува се приемане на нов закон на първо четене, както и повторно гласуване на закон, върнат с мотивирано вето от Президента по чл. 101 от КРБ.`,
      question: `Колко гласа „ЗА“ са необходими за приемането на обикновения закон и колко — за преодоляване на отлагателното вето на Президента?`,
      options: constPlace.options,
      correctIndex: constPlace.correctIndex,
      legalBasis: 'Чл. 81, ал. 2 и чл. 101, ал. 2 от Конституцията на Република България',
      explanation: `По чл. 81, ал. 2 КРБ Народното събрание приема закони с обикновено мнозинство повече от половината от присъстващите (${presentDeps} / 2 + 1 = ${simpleMajority} гласа), но по чл. 101, ал. 2 КРБ преодоляването на президентско вето изисква абсолютно мнозинство повече от половината от ВСИЧКИ 240 народни представители (минимум 121 гласа).`,
    },
    {
      id: `civ-inf-v${v}-bginst`,
      category: 'constitution',
      gradeLevel: '11.–12. клас (ДЗИ)',
      scenario: `Казус #${v}: Държавен орган с мандат „${bgInst.mandate}“ упражнява следното конституционно правомощие: „${bgInst.corePowers[v % bgInst.corePowers.length]}“`,
      question: `Коя конституционна институция на Република България е описана в казуса?`,
      options: instPlace.options,
      correctIndex: instPlace.correctIndex,
      legalBasis: bgInst.constitutionalArticles,
      explanation: `${bgInst.name} (${bgInst.branch}). Взаимодействие с другите власти: ${bgInst.checksAndBalances} • Внимание: ${bgInst.examTrap}`,
    },
    {
      id: `civ-inf-v${v}-eu`,
      category: 'eu',
      gradeLevel: '11.–12. клас (ДЗИ)',
      scenario: `Казус #${v}: Институция на Европейския съюз със седалище в ${euInst.seat} и квота за България „${euInst.bulgariaQuota}“ изпълнява функцията: „${euInst.corePowers[v % euInst.corePowers.length]}“`,
      question: `За коя институция на Европейския съюз става въпрос?`,
      options: euPlace.options,
      correctIndex: euPlace.correctIndex,
      legalBasis: 'Договор за Европейския съюз (ДЕС) и ДФЕС',
      explanation: `${euInst.name} (${euInst.roleBadge}). Представителство: ${euInst.representation}. Изпитен капан: ${euInst.examTrap}`,
    },
    {
      id: `civ-inf-v${v}-labor`,
      category: 'labor_dippk',
      gradeLevel: '12. клас (ДИППК / КТ / ЗБУТ)',
      scenario: `Казус #${v}: Завършил специалист с Трета СПК постъпва на работа в предприятие. Работодателят желае да включи клауза за изпитване и пита каква е задължителната форма на трудовия договор и максималният срок за изпитване според Кодекса на труда.`,
      question: `Кой отговор съответства точно на императивните норми на Кодекса на труда (КТ)?`,
      options: laborPlace.options,
      correctIndex: laborPlace.correctIndex,
      legalBasis: 'Чл. 62, ал. 1, чл. 70, ал. 1 и чл. 326 от Кодекса на труда',
      explanation: `Трудовият договор задължително се сключва в писмена форма преди постъпване на работа (чл. 62 КТ), срокът за изпитване е до 6 месеца (чл. 70 КТ), а минималният платен годишен отпуск е не по-малко от 20 работни дни (чл. 155 КТ).`,
    },
  ];

  // Добавяме и пренаредени въпроси от CIVICS_QUIZ_QUESTIONS
  const shuffledStatic = CIVICS_QUIZ_QUESTIONS.map((q, idx) => {
    const correctOpt = q.options[q.correctIndex];
    const distractors = q.options.filter((_, i) => i !== q.correctIndex);
    const placed = placeCorrectAtTargetIndex(correctOpt, distractors, (v + idx) % 4, v * 9 + idx);
    return {
      ...q,
      id: `${q.id}-v${v}`,
      options: placed.options,
      correctIndex: placed.correctIndex,
    };
  });

  const all = [...dynamicItems, ...shuffledStatic];
  if (category === 'all') return all;
  return all.filter((q) => q.category === category);
}

/**
 * 8. История и География (Договори, Исторически извори, NUTS 2 и Енергетика) — безкраен генератор
 */
export function generateHistoryGeoInfiniteQuiz(
  subjectFilter: 'all' | 'История и цивилизации' | 'География и икономика',
  variantNumber: number
): HistoryGeoQuizQuestion[] {
  const v = Math.max(1, Math.floor(variantNumber));
  const treaty = HISTORICAL_TREATIES_AND_MAPS[(v - 1) % HISTORICAL_TREATIES_AND_MAPS.length];
  const sourceFig = HISTORICAL_FIGURES_BY_SOURCE[(v - 1) % HISTORICAL_FIGURES_BY_SOURCE.length];
  const geoReg = BULGARIA_GEO_REGIONS[(v - 1) % BULGARIA_GEO_REGIONS.length];
  const energyHub = STRATEGIC_ENERGY_TECH_HUBS[(v - 1) % STRATEGIC_ENERGY_TECH_HUBS.length];

  const treatyPlace = placeCorrectAtTargetIndex(
    `${treaty.title} (${treaty.year}) — ${treaty.territorialGains[0]}`,
    HISTORICAL_TREATIES_AND_MAPS.filter((t) => t.id !== treaty.id).map(
      (t) => `${t.title} (${t.year}) — ${t.territorialGains[0]}`
    ),
    v % 4,
    v * 11
  );

  const figPlace = placeCorrectAtTargetIndex(
    `${sourceFig.personName} (${sourceFig.roleAndYears}) — ${sourceFig.sourceTitle}`,
    HISTORICAL_FIGURES_BY_SOURCE.filter((f) => f.id !== sourceFig.id).map(
      (f) => `${f.personName} (${f.roleAndYears}) — ${f.sourceTitle}`
    ),
    (v + 1) % 4,
    v * 13
  );

  const geoPlace = placeCorrectAtTargetIndex(
    `${geoReg.name} (${geoReg.code}) с център ${geoReg.centerCity} (области: ${geoReg.provinces.join(', ')})`,
    BULGARIA_GEO_REGIONS.filter((r) => r.id !== geoReg.id).map(
      (r) => `${r.name} (${r.code}) с център ${r.centerCity} (области: ${r.provinces.join(', ')})`
    ),
    (v + 2) % 4,
    v * 17
  );

  const hubPlace = placeCorrectAtTargetIndex(
    `${energyHub.name} (${energyHub.regionCode}) — ${energyHub.capacityOrOutput}`,
    STRATEGIC_ENERGY_TECH_HUBS.filter((h) => h.id !== energyHub.id).map(
      (h) => `${h.name} (${h.regionCode}) — ${h.capacityOrOutput}`
    ),
    (v + 3) % 4,
    v * 19
  );

  const dynamicQuestions: HistoryGeoQuizQuestion[] = [
    {
      id: `hg-inf-v${v}-treaty`,
      subject: 'История и цивилизации',
      examBadge: `Вариант #${v} • Договори и карти`,
      question: `[Вариант #${v}] Кой исторически акт е подписан между „${treaty.signatories}“ и включва дипломатическата клауза: „${treaty.diplomaticClauses[0]}“?`,
      options: treatyPlace.options,
      correctIndex: treatyPlace.correctIndex,
      explanation: `${treaty.title} (${treaty.year}). Изпитен фокус: ${treaty.examTrap}`,
    },
    {
      id: `hg-inf-v${v}-source`,
      subject: 'История и цивилизации',
      examBadge: `Вариант #${v} • Анализ на исторически извор`,
      question: `[Вариант #${v}] Прочетете откъса от историческия извор: ${sourceFig.sourceExcerpt} Коя историческа личност и кой документ са представени?`,
      options: figPlace.options,
      correctIndex: figPlace.correctIndex,
      explanation: `${sourceFig.personName} (${sourceFig.roleAndYears}). Ключови маркери: ${sourceFig.keyCluesInText.join(', ')}. Историческо значение: ${sourceFig.historicalSignificance.join(' ')}`,
    },
    {
      id: `hg-inf-v${v}-nuts2`,
      subject: 'География и икономика',
      examBadge: `Вариант #${v} • Регионална география (NUTS 2)`,
      question: `[Вариант #${v}] Кой статистически район за планиране (NUTS 2) в България се характеризира с релеф и води „${geoReg.reliefAndRivers}“ и водещи отрасли: ${geoReg.leadingIndustries.slice(0, 2).join('; ')}?`,
      options: geoPlace.options,
      correctIndex: geoPlace.correctIndex,
      explanation: `${geoReg.name} (${geoReg.code}), център ${geoReg.centerCity}. Акцент за матурата: ${geoReg.examHighlight}`,
    },
    {
      id: `hg-inf-v${v}-hub`,
      subject: 'География и икономика',
      examBadge: `Вариант #${v} • Стратегическа енергетика и индустрия`,
      question: `[Вариант #${v}] Кой стратегически енергиен или индустриален комплекс в България се намира в „${energyHub.location}“ и има технически профил: „${energyHub.technicalProfile}“?`,
      options: hubPlace.options,
      correctIndex: hubPlace.correctIndex,
      explanation: `${energyHub.name} (${energyHub.sector}, ${energyHub.regionCode}). Изпитна връзка: ${energyHub.dippkAndExamRelevance}`,
    },
  ];

  const staticShuffled = HISTORY_GEO_QUIZ_QUESTIONS.map((q, idx) => {
    const correctOpt = q.options[q.correctIndex];
    const distractors = q.options.filter((_, i) => i !== q.correctIndex);
    const placed = placeCorrectAtTargetIndex(correctOpt, distractors, (v + idx) % 4, v * 7 + idx);
    return {
      ...q,
      id: `${q.id}-v${v}`,
      options: placed.options,
      correctIndex: placed.correctIndex,
    };
  });

  const combined = [...dynamicQuestions, ...staticShuffled];
  if (subjectFilter === 'all') return combined;
  return combined.filter((q) => q.subject === subjectFilter);
}

/**
 * 9. Архивни казуси по История (HistoricalCasesView) — безкраен генератор върху изворите и тезите на казуса
 */
export function generateHistoricalCaseQuiz(
  activeCase: HistoricalCaseStudy,
  allCases: HistoricalCaseStudy[],
  variantNumber: number
): QuizQuestion[] {
  const v = Math.max(1, Math.floor(variantNumber));
  const otherCases = allCases.filter((c) => c.id !== activeCase.id);
  const questions: QuizQuestion[] = [];

  // Въпрос 1: Разпознаване на първичен исторически извор
  const src = activeCase.primarySources[(v - 1) % activeCase.primarySources.length];
  if (src) {
    const srcDistractors = otherCases
      .flatMap((oc) => oc.primarySources.map((ps) => `${ps.title} (${ps.authorOrOrigin})`))
      .slice(v % 4, (v % 4) + 5);
    const p1 = placeCorrectAtTargetIndex(
      `${src.title} (${src.authorOrOrigin})`,
      srcDistractors,
      v % 4,
      v * 11
    );
    questions.push({
      id: v * 100 + 1,
      question: `[Вариант #${v} • Исторически извор] От кой първичен исторически извор за епохата (${activeCase.periodYears}) е следният откъс: ${src.originalExcerpt}`,
      options: p1.options,
      correctIndex: p1.correctIndex,
      explanation: `Откъсът е от „${src.title}“ (${src.authorOrOrigin}). Контекст по МОН: ${src.sourceContext}`,
    });
  }

  // Въпрос 2: Историческа дилема и аргументи (Теза А срещу Теза Б)
  const argA = activeCase.thesisSideA.coreArguments[(v - 1) % activeCase.thesisSideA.coreArguments.length];
  const argDistractors = otherCases.map(
    (oc) => oc.thesisSideA.coreArguments[0] ?? oc.synthesisConclusion
  );
  const p2 = placeCorrectAtTargetIndex(argA, argDistractors, (v + 1) % 4, v * 13);
  questions.push({
    id: v * 100 + 2,
    question: `[Вариант #${v} • Историографска теза] Кой от следните аргументи подкрепя позицията „${activeCase.thesisSideA.perspectiveTitle}“ по казуса за ${activeCase.keyFigure}?`,
    options: p2.options,
    correctIndex: p2.correctIndex,
    explanation: `Аргументът е част от „${activeCase.thesisSideA.perspectiveTitle}“. Академичен синтез: ${activeCase.synthesisConclusion}`,
  });

  // Въпрос 3: Ключови исторически понятия от казуса
  const concept = activeCase.keyConcepts[(v - 1) % activeCase.keyConcepts.length];
  if (concept) {
    const conceptDistractors = otherCases
      .flatMap((oc) => oc.keyConcepts.map((kc) => `${kc.term} — ${kc.definition}`))
      .slice(v % 3, (v % 3) + 5);
    const p3 = placeCorrectAtTargetIndex(
      `${concept.term} — ${concept.definition}`,
      conceptDistractors,
      (v + 2) % 4,
      v * 17
    );
    questions.push({
      id: v * 100 + 3,
      question: `[Вариант #${v} • Терминология по МОН] Кое историческо понятие и неговата дефиниция са ключови за анализа на казуса „${activeCase.shortTitle}“ (${activeCase.periodYears})?`,
      options: p3.options,
      correctIndex: p3.correctIndex,
      explanation: `Понятието „${concept.term}“ означава: ${concept.definition}`,
    });
  }

  // Въпрос 4: Академичен синтез и заключение за ДЗИ
  const synthDistractors = otherCases.map((oc) => oc.synthesisConclusion);
  const p4 = placeCorrectAtTargetIndex(
    activeCase.synthesisConclusion,
    synthDistractors,
    (v + 3) % 4,
    v * 19
  );
  questions.push({
    id: v * 100 + 4,
    question: `[Вариант #${v} • Академичен синтез за ДЗИ] Кой обобщаващ извод разрешава историографската дилема по темата „${activeCase.shortTitle}“?`,
    options: p4.options,
    correctIndex: p4.correctIndex,
    explanation: `Образцова теза за писмена разработка: ${activeCase.sampleEssayOutline.thesisStatement}`,
  });

  return questions;
}
