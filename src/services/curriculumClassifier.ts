import { BULGARIAN_CURRICULUM_TREE, type CurriculumSubDomain, type CurriculumDomain } from '../data/bulgarianCurriculumTree';
import type { LessonData, LessonSubject } from '../types';
import { generateLessonFromInput } from './aiGenerator';
import { getCachedOrCoreLessons } from '../data/curriculumDatabase';

export interface NotebookDiagnosis {
  isMatched: boolean;
  subject: string;
  grade: string;
  domainName: string;
  subDomainName: string;
  qualityScore: number; // 0 - 100
  gradeEstimate: string;
  matchedKeywords: string[];
  missingCrucialPoints: string[];
  detectedTraps: string[];
  teacherAdvice: string;
  lessonData: LessonData;
  /** true, когато няма отделен урок точно по темата и е избран най-близкият урок по същия предмет */
  lessonIsApproximate?: boolean;
}

// Изрична карта на всички 56 подтеми от дървото на МОН към техните проверени уроци и тестове
export const SUBDOMAIN_LESSON_MAP: Record<string, string> = {
  'bel-5-sub1': 'bel-5-myth-prometey',
  'bel-5-sub2': 'bel-5-tri-bratya-zlatnata-yabalka',
  'bel-6-sub1': 'bel-6-hubava-si-moya-goro',
  'bel-6-sub2': 'bel-6-vazov-pod-igoto',
  'bel-7-sub1': 'bel-7-edna-balgarka',
  'bel-7-sub2': 'literature-botev-dzi',
  'bel-7-sub3': 'bel-7-opalchentsite-shipka',
  'bel-7-sub4': 'bel-syntax-complex-sentences-comma',
  'bel-7-sub5': 'bel-8-10-bulgarian-grammar-syntax-punctuation-nvo10',
  'bel-10-sub1': 'bel-10-paisiy-istoriya-slavyanobalgarska',
  'bel-11-sub1': 'literature-geratsite',
  'bel-11-sub2': 'literature-aleko-dzi',
  'bel-11-sub3': 'literature-yavorov-gradushka',
  'bel-12-sub1': 'literature-tyutyun',
  'bel-12-sub2': 'bel-talev-dimov-romani-dzi',
  'bel-12-sub3': 'bel-8-10-bulgarian-grammar-syntax-punctuation-nvo10',
  'bel-12-sub4': 'bel-12-vaptsarov-vyara-pesen',
  'hist-5-sub1': 'hist-5-ancient-thrace-odrysian',
  'hist-6-sub1': 'history-asparukh-681',
  'hist-6-sub2': 'hist-6-khan-krum-laws-811',
  'hist-10-sub0': 'history-simeon-golden-age',
  'hist-10-sub1': 'history-tarnovo-constitution-1879',
  'hist-10-sub2': 'hist-10-unification-independence-1885-1908',
  'hist-10-sub3': 'history-balkan-wars-ww1-catastrophes',
  'hist-11-sub1': 'history-april-uprising',
  'math-5-sub1': 'math-5-fractions-decimals',
  'math-6-sub1': 'math-6-rational-numbers-powers',
  'math-7-sub1': 'math-7-linear-equations',
  'math-7-sub2': 'math-7-work-and-mixtures',
  'math-7-sub3': 'math-short-multiplication',
  'math-8-sub1': 'math-10-quadratic-equations-vieta',
  'math-8-sub2': 'math-pythagorean-theorem',
  'math-10-sub1': 'math-quadratic-vieta-progressions',
  'math-10-sub2': 'math-trigonometry-sine-cosine-nvo10',
  'phys-6-sub1': 'phys-5-6-forces-motion-heat',
  'phys-7-sub1': 'physics-ohms-law',
  'phys-8-sub1': 'phys-8-10-mechanics-thermodynamics-electricity-complete',
  'phys-8-sub2': 'phys-newton-laws-mechanics',
  'geo-5-sub1': 'geo-5-great-discoveries-continents',
  'geo-7-sub1': 'geography-danubian-plain',
  'geo-10-sub1': 'geo-bulgaria-population-settlements-tertiary-dzi',
  'bio-6-sub1': 'bio-5-6-cell-human-nature',
  'bio-7-sub1': 'bio-7-vertebrates-ecosystems',
  'bio-8-sub1': 'bio-medicine-anatomy-biotech-pharmacy-8-12',
  'bio-8-sub2': 'bio-11-12-immunology-virology-neurobiology-endocrinology',
  'bio-9-sub1': 'biology-cell-division',
  'bio-10-sub1': 'bio-genetics-mendel-laws',
  'chem-7-sub1': 'chem-7-substances-mixtures-equations',
  'chem-8-sub1': 'chemistry-periodic-system',
  'chem-8-sub2': 'chem-8-10-inorganic-organic-periodic-table-complete',
  'chem-9-sub1': 'chem-organic-hydrocarbons-alcohols',
  'eng-7-sub1': 'eng-5-7-tenses-modals-reading-nvo',
  'eng-8-sub1': 'eng-conditionals-passive-reported',
  'eng-10-sub1': 'english-present-perfect-vs-past',
  'eng-10-sub2': 'english-present-perfect-vs-past',
  'civ-10-sub1': 'civic-powers-separation'
};

export function classifyAndDiagnoseNotebook(inputText: string, fileName = ''): NotebookDiagnosis {
  const combined = `${fileName} ${inputText}`.toLowerCase().trim();
  const activeLessonsPool = getCachedOrCoreLessons();
  
  if (!combined || combined.length < 3) {
    return {
      isMatched: false,
      subject: 'Неразпознат предмет',
      grade: 'Всички класове',
      domainName: 'Няма въведено съдържание',
      subDomainName: 'Няма тема',
      qualityScore: 0,
      gradeEstimate: 'Липсва текст за анализ',
      matchedKeywords: [],
      missingCrucialPoints: ['Моля въведете текст от вашите записки или изберете тема от каталога.'],
      detectedTraps: [],
      teacherAdvice: 'За да извършим точен одит, са необходими ключови понятия или заглавие на урок.',
      lessonData: activeLessonsPool[0]
    };
  }

  let bestMatch: {
    subject: LessonSubject;
    grade: string;
    domain: CurriculumDomain;
    subDomain: CurriculumSubDomain;
    score: number;
    matchedKeywords: string[];
  } | null = null;

  // 1. Search across the Bulgarian Curriculum Tree
  for (const subjectTree of BULGARIAN_CURRICULUM_TREE) {
    for (const gradeItem of subjectTree.grades) {
      for (const domain of gradeItem.domains) {
        for (const sub of domain.subDomains) {
          let score = 0;
          const matched: string[] = [];

          for (const kw of sub.keywords) {
            if (combined.includes(kw.toLowerCase())) {
              score += 2;
              matched.push(kw);
            }
          }

          // Check topic name match
          if (combined.includes(sub.name.toLowerCase())) {
            score += 5;
          }

          if (!bestMatch || score > bestMatch.score) {
            bestMatch = {
              subject: subjectTree.subject,
              grade: gradeItem.grade,
              domain,
              subDomain: sub,
              score,
              matchedKeywords: matched
            };
          }
        }
      }
    }
  }

  // 2. If no strong match in tree, search full activeLessonsPool database directly
  if (!bestMatch || bestMatch.score < 2) {
    for (const lesson of activeLessonsPool) {
      let lessonScore = 0;
      const matched: string[] = [];
      const titleClean = lesson.title.toLowerCase();

      // Check title keywords
      const titleWords = titleClean.split(/[\s,–—()]+/).filter(w => w.length > 3);
      titleWords.forEach(w => {
        if (combined.includes(w)) {
          lessonScore += 3;
          matched.push(w);
        }
      });

      // Check subject match
      if (combined.includes(lesson.subject.toLowerCase())) {
        lessonScore += 2;
        matched.push(lesson.subject);
      }

      if (lessonScore >= 3 && (!bestMatch || lessonScore > bestMatch.score)) {
        bestMatch = {
          subject: lesson.subject,
          grade: lesson.grade,
          domain: { id: lesson.id, name: lesson.subject, subDomains: [] },
          subDomain: {
            id: lesson.id,
            name: lesson.title,
            keywords: matched,
            gradeRequirement6: lesson.notebookChecklist?.map(c => c.requirement) || lesson.summary.keyPoints,
            commonPitfalls: lesson.summary.commonTraps,
            advice: lesson.summary.examGoldenRule
          },
          score: lessonScore,
          matchedKeywords: matched
        };
      }
    }
  }

  // 3. Honest unmatched handling: DO NOT falsely default to April Uprising!
  if (!bestMatch || bestMatch.score === 0) {
    return {
      isMatched: false,
      subject: 'Неразпознат предмет',
      grade: 'Всички класове',
      domainName: 'Извън текущите стандарти',
      subDomainName: 'Неразпозната тема',
      qualityScore: 0,
      gradeEstimate: 'Няма разпозната тема',
      matchedKeywords: [],
      missingCrucialPoints: ['Не са открити съвпадения с държавните образователни стандарти на МОН в предоставения текст.'],
      detectedTraps: ['Въведете конкретни термини, формули или исторически личности от учебника.'],
      teacherAdvice: 'Препоръчва се да изберете конкретен предмет и тема от каталога на МОН за провеждане на структуриран одит.',
      lessonData: activeLessonsPool[0]
    };
  }

  const matched = bestMatch;
  const reqs = matched.subDomain.gradeRequirement6;
  const missingPoints: string[] = [];

  reqs.forEach((r) => {
    const rWords = r.toLowerCase().split(' ').filter(w => w.length > 4);
    const hasWord = rWords.some(w => combined.includes(w));
    if (!hasWord) {
      missingPoints.push(r);
    }
  });

  // Calculate Quality Score
  const matchedReqsCount = reqs.length - missingPoints.length;
  const ratio = reqs.length > 0 ? matchedReqsCount / reqs.length : 0.7;
  const basePercent = Math.min(100, Math.round(ratio * 70 + (matched.matchedKeywords.length * 5)));
  const qualityScore = Math.max(35, Math.min(98, basePercent));

  let gradeEstimate = 'Добро покритие на стандартите';
  if (qualityScore >= 85) gradeEstimate = 'Високо покритие на стандартите';
  else if (qualityScore >= 70) gradeEstimate = 'Много добро покритие на понятията';
  else if (qualityScore >= 50) gradeEstimate = 'Частично покритие на темата';
  else gradeEstimate = 'Начално ниво (Препоръчва се попълване на пропуските)';

  const mappedLessonId = SUBDOMAIN_LESSON_MAP[matched.subDomain.id] || matched.subDomain.id;
  const subNameLower = matched.subDomain.name.toLowerCase();
  const exact =
    activeLessonsPool.find((l) => l.id === mappedLessonId) ||
    activeLessonsPool.find((l) => l.id === matched.subDomain.id) ||
    activeLessonsPool.find((l) => {
      const t = l.title.toLowerCase();
      return t.includes(subNameLower) || (t.length >= 12 && subNameLower.includes(t));
    });

  const gradeNum = (g: string) => Number((g.match(/(\d+)/) || [])[1] || 0);
  const targetGrade = gradeNum(matched.grade);
  const closest = exact
    ? undefined
    : activeLessonsPool
        .filter((l) => l.subject === matched.subject)
        .map((l) => {
          const haystack = `${l.title} ${l.summary.overview} ${l.summary.keyPoints.join(' ')}`.toLowerCase();
          const kwHits = matched.subDomain.keywords.filter((kw) => kw.length >= 4 && haystack.includes(kw.toLowerCase())).length;
          const gradeGap = targetGrade && gradeNum(l.grade) ? Math.abs(gradeNum(l.grade) - targetGrade) : 3;
          return { l, score: kwHits * 3 - gradeGap };
        })
        .sort((a, b) => b.score - a.score)[0]?.l;

  const lessonData =
    exact ||
    closest ||
    generateLessonFromInput(matched.subDomain.name, inputText, matched.subject, matched.grade);

  return {
    isMatched: true,
    subject: matched.subject,
    grade: matched.grade,
    domainName: matched.domain.name,
    subDomainName: matched.subDomain.name,
    qualityScore,
    gradeEstimate,
    matchedKeywords: matched.matchedKeywords.length > 0 ? matched.matchedKeywords : ['Базови понятия'],
    missingCrucialPoints: missingPoints.length > 0 ? missingPoints : ['Всички основни точки са записани!'],
    detectedTraps: matched.subDomain.commonPitfalls,
    teacherAdvice: matched.subDomain.advice,
    lessonData,
    lessonIsApproximate: !exact
  };
}
