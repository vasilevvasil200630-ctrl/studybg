import { BULGARIAN_CURRICULUM_TREE, type CurriculumSubDomain, type CurriculumDomain } from '../data/bulgarianCurriculumTree';
import type { LessonData } from '../types';
import { generateLessonFromInput } from './aiGenerator';
import { CURRICULUM_LESSONS } from '../data/curriculumDatabase';

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
}

export function classifyAndDiagnoseNotebook(inputText: string, fileName = ''): NotebookDiagnosis {
  const combined = `${fileName} ${inputText}`.toLowerCase().trim();
  
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
      lessonData: CURRICULUM_LESSONS[0]
    };
  }

  let bestMatch: {
    subject: string;
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

  // 2. If no strong match in tree, search CURRICULUM_LESSONS database directly
  if (!bestMatch || bestMatch.score < 2) {
    for (const lesson of CURRICULUM_LESSONS) {
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
      lessonData: CURRICULUM_LESSONS[0]
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

  // Check if we have an existing rich lesson in curriculum database
  const existing = CURRICULUM_LESSONS.find(
    l => l.title.toLowerCase().includes(matched.subDomain.name.toLowerCase().slice(0, 15)) ||
         matched.subDomain.name.toLowerCase().includes(l.title.toLowerCase().slice(0, 15))
  );

  const lessonData = existing || generateLessonFromInput(
    matched.subDomain.name,
    inputText,
    matched.subject
  );

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
    lessonData
  };
}
