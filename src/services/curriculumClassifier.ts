import { BULGARIAN_CURRICULUM_TREE, type CurriculumSubDomain, type CurriculumDomain } from '../data/bulgarianCurriculumTree';
import type { LessonData } from '../types';
import { generateLessonFromInput } from './aiGenerator';
import { CURRICULUM_LESSONS } from '../data/curriculumDatabase';

export interface NotebookDiagnosis {
  subject: string;
  grade: string;
  domainName: string;
  subDomainName: string;
  qualityScore: number; // 0 - 100
  gradeEstimate: string; // напр. 'Отличен 5.75', 'Мн. добър 4.80'
  matchedKeywords: string[];
  missingCrucialPoints: string[];
  detectedTraps: string[];
  teacherAdvice: string;
  lessonData: LessonData;
}

export function classifyAndDiagnoseNotebook(inputText: string, fileName = ''): NotebookDiagnosis {
  const combined = `${fileName} ${inputText}`.toLowerCase();
  
  let bestMatch: {
    subject: string;
    grade: string;
    domain: CurriculumDomain;
    subDomain: CurriculumSubDomain;
    score: number;
    matchedKeywords: string[];
  } | null = null;

  // Search across the entire Bulgarian Curriculum Tree
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

          // Check domain name match
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

  // Fallback to first lesson if very short/unclear text
  const matched = bestMatch && bestMatch.score > 0 ? bestMatch : {
    subject: 'История и цивилизации',
    grade: '11. клас',
    domain: BULGARIAN_CURRICULUM_TREE[1].grades[1].domains[0],
    subDomain: BULGARIAN_CURRICULUM_TREE[1].grades[1].domains[0].subDomains[0],
    score: 1,
    matchedKeywords: ['априлско въстание', 'история']
  };

  const reqs = matched.subDomain.gradeRequirement6;
  const missingPoints: string[] = [];

  reqs.forEach((r) => {
    const rWords = r.toLowerCase().split(' ').filter(w => w.length > 4);
    const hasWord = rWords.some(w => combined.includes(w));
    if (!hasWord) {
      missingPoints.push(r);
    }
  });

  // Calculate Quality & Grade
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
