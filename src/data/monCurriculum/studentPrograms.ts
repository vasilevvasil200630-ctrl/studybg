import type { LanguageChoice, StudentGrade, StudentProfile } from '../../lib/studentProfile';
import { STUDENT_LANGUAGES } from '../../lib/studentProfile';
import { practiceTopics } from './index';
import { MON_SUBJECTS } from './subjects';
import type { MonProgram } from './types';

// От профила на ученика към списъка с учебни програми, които трябва да учи, и проверка кои от тях са в сайта

export type PlannedRole = 'general' | 'profile' | 'language';

export interface PlannedSubject {
  program: MonProgram;
  name: string;
  role: PlannedRole;
  /** Предмет, който не всички в този клас учат — ученикът го добавя сам */
  optional: boolean;
  included: boolean;
  /** Теми за упражнение (без разделите) */
  topicCount: number;
}

export interface MissingSubject {
  name: string;
  reason: string;
}

export interface StudentPlan {
  subjects: PlannedSubject[];
  missing: MissingSubject[];
  /** Пояснения към изчислението (интензивен 8. клас, избор на ниво по език…) */
  notes: string[];
}

const GENERAL: Record<StudentGrade, string[]> = {
  8: ['bge', 'lit', 'math', 'informatika', 'it', 'fa', 'bio', 'himia', 'history', 'geo', 'phil', 'arts', 'muzika', 'tp', 'fvs'],
  9: ['bge', 'lit', 'math', 'it', 'history', 'geo', 'fa', 'bio', 'himia', 'phil', 'muzika', 'arts', 'tp', 'fvs'],
  10: ['bge', 'lit', 'math', 'it', 'history', 'geo', 'fa', 'bio', 'himia', 'phil', 'music', 'arts', 'fvs'],
  11: ['be', 'lit', 'math', 'go', 'fvs'],
  12: ['be', 'lit', 'math', 'go', 'fvs'],
};

/** В интензивния 8. клас задължителни са тези; другите предмети се учат главно от 9. клас */
const INTENSIVE_8_CORE = new Set(['bge', 'lit', 'math', 'fvs']);

/** Програмите за 9. клас с повече часове включват и съдържанието на 8. клас (след интензивен 8. клас) */
const NINTH_VARIANTS: Record<string, [intensive: string, regular: string]> = {
  history: ['history-144', 'history-72'],
  geo: ['geo-72', 'geo-36'],
  fa: ['fa-90', 'fa-36'],
  bio: ['bio-90', 'bio-36'],
  himia: ['himia-90', 'himia-54'],
};

const LANGUAGE_PREFIX: Partial<Record<LanguageChoice['language'], string>> = { english: 'ae', german: 'ne' };

/** Нивото по подразбиране според класа; ученикът може да избере друго */
export function defaultLanguageProgramId(language: LanguageChoice['language'], grade: StudentGrade, intensive: boolean, second: boolean): string | null {
  const prefix = LANGUAGE_PREFIX[language];
  if (!prefix) return null;
  if (second) return `lang-${prefix}-a1`;
  if (grade === 8) return intensive ? `lang-${prefix}-b1.1-8-int` : `lang-${prefix}-a2-8-neint`;
  if (grade <= 10) return intensive ? `lang-${prefix}-b1` : `lang-${prefix}-b1.1`;
  return intensive ? `lang-${prefix}-b2.1` : `lang-${prefix}-b1.1`;
}

/** Програмите по ниво за даден език — за избора на ниво */
export function languagePrograms(catalog: MonProgram[], language: LanguageChoice['language']): MonProgram[] {
  const prefix = LANGUAGE_PREFIX[language];
  return prefix ? catalog.filter((p) => p.stage === 'lang' && p.slug.startsWith(prefix + '-')) : [];
}

export function buildStudentPlan(profile: StudentProfile, catalog: MonProgram[]): StudentPlan {
  const byId = new Map(catalog.map((p) => [p.id, p]));
  const subjects: PlannedSubject[] = [];
  const missing: MissingSubject[] = [];
  const notes: string[] = [];
  const { grade, intensiveLanguage } = profile;

  const add = (programId: string, role: PlannedRole, optional: boolean, fallbackName: string) => {
    const program = byId.get(programId);
    if (!program) {
      missing.push({ name: fallbackName, reason: 'Програмата не е в каталога на сайта.' });
      return;
    }
    if (subjects.some((s) => s.program.id === programId)) return;
    const included = (!optional || profile.addedProgramIds.includes(programId)) && !profile.removedProgramIds.includes(programId);
    subjects.push({ program, name: subjectName(program), role, optional, included, topicCount: practiceTopics(program).length });
  };

  for (const slug of GENERAL[grade]) {
    let resolved = slug;
    if (grade === 9 && NINTH_VARIANTS[slug]) resolved = NINTH_VARIANTS[slug][intensiveLanguage ? 0 : 1];
    const optional = grade === 8 && intensiveLanguage && !INTENSIVE_8_CORE.has(slug);
    add(`${grade}-${resolved}`, 'general', optional, slug);
  }
  if (grade === 8 && intensiveLanguage) {
    notes.push('В интензивния 8. клас повечето общообразователни предмети се учат от 9. клас. Отбележи тези, които имаш в разписанието.');
  }
  if (grade === 9) {
    notes.push(
      intensiveLanguage
        ? 'След интензивен 8. клас програмите по история, география, физика, биология и химия за 9. клас включват и съдържанието на 8. клас.'
        : 'Програмите по история, география, физика, биология и химия са вариантите за 9. клас без интензивен 8. клас.',
    );
  }

  if (grade >= 11 && profile.schoolType === 'profiled') {
    for (const subject of profile.profileSubjects) {
      const program = catalog.find((p) => p.stage === 'pp' && p.subject === subject);
      if (program) add(program.id, 'profile', false, MON_SUBJECTS[subject].name);
      else missing.push({ name: `${MON_SUBJECTS[subject].name} (профилирана подготовка)`, reason: 'Няма отделна програма за профилирана подготовка в каталога.' });
    }
    if (!profile.profileSubjects.length) notes.push('Не си отбелязал профилиращи предмети — добави ги от профила.');
  }

  profile.languages.forEach((choice, i) => {
    const name = `${STUDENT_LANGUAGES.find((l) => l.id === choice.language)?.name ?? 'Чужд'} език`;
    const programId = choice.programId || defaultLanguageProgramId(choice.language, grade, intensiveLanguage, i > 0);
    if (!programId) {
      missing.push({ name, reason: 'Засега сайтът има програми само по английски и немски език.' });
      return;
    }
    add(programId, 'language', false, name);
  });

  if (profile.schoolType === 'professional') {
    missing.push({
      name: profile.specialty ? `Специалните предмети: ${profile.specialty}` : 'Специалните предмети по специалността',
      reason: 'Учебните програми по специалностите не са в сайта. Има общите предмети и справочника „Училища и специалности“.',
    });
  }

  for (const s of subjects) {
    if (!s.program.testable && s.included) {
      if (s.program.subject === 'pe') continue;
      missing.push({ name: s.name, reason: 'Програмата е в каталога, но темите ѝ още не са разпределени за тестове.' });
    }
  }
  return { subjects, missing, notes };
}

function subjectName(program: MonProgram): string {
  const base = MON_SUBJECTS[program.subject].name;
  if (program.stage === 'pp') return `${base} — профилирана подготовка`;
  if (program.stage === 'lang') return program.title;
  return base;
}

export const includedSubjects = (plan: StudentPlan) => plan.subjects.filter((s) => s.included);
