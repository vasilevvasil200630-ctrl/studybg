import type { MonSubjectId } from '../data/monCurriculum/types';
import { isPlainObject } from './storage';

// Профилът на ученика: клас, училище и предмети. Пази се в браузъра; от него се смята личната програма.

export type StudentGrade = 8 | 9 | 10 | 11 | 12;
export const STUDENT_GRADES: StudentGrade[] = [8, 9, 10, 11, 12];

export type SchoolType = 'profiled' | 'professional' | 'general';

export const SCHOOL_TYPES: { id: SchoolType; name: string; hint: string }[] = [
  { id: 'profiled', name: 'Профилирана гимназия или паралелка', hint: 'Математическа, природоматематическа, езикова, хуманитарна и др.' },
  { id: 'professional', name: 'Професионална гимназия или паралелка', hint: 'Техникум: специалност и професия' },
  { id: 'general', name: 'Средно училище без профил', hint: 'Непрофилирана паралелка' },
];

export type ProfileId =
  | 'math'
  | 'natural'
  | 'languages'
  | 'humanities'
  | 'social'
  | 'economic'
  | 'software'
  | 'entrepreneurship'
  | 'arts'
  | 'music'
  | 'sports';

/** Профилите и обичайните им профилиращи предмети — само предложение, ученикът отбелязва своите */
export const SCHOOL_PROFILES: { id: ProfileId; name: string; suggested: MonSubjectId[] }[] = [
  { id: 'math', name: 'Математически', suggested: ['math', 'informatika'] },
  { id: 'natural', name: 'Природни науки', suggested: ['biology', 'chemistry'] },
  { id: 'languages', name: 'Чужди езици', suggested: ['english'] },
  { id: 'humanities', name: 'Хуманитарни науки', suggested: ['bel', 'history'] },
  { id: 'social', name: 'Обществени науки', suggested: ['history', 'geography'] },
  { id: 'economic', name: 'Икономическо развитие', suggested: ['geography', 'entrepreneurship'] },
  { id: 'software', name: 'Софтуерни и хардуерни науки', suggested: ['informatika', 'it'] },
  { id: 'entrepreneurship', name: 'Предприемачески', suggested: ['entrepreneurship', 'geography'] },
  { id: 'arts', name: 'Изобразително изкуство', suggested: ['arts'] },
  { id: 'music', name: 'Музика', suggested: ['music'] },
  { id: 'sports', name: 'Физическо възпитание и спорт', suggested: ['pe'] },
];

export type StudentLanguage = 'english' | 'german' | 'french' | 'spanish' | 'russian' | 'italian' | 'other';

export const STUDENT_LANGUAGES: { id: StudentLanguage; name: string }[] = [
  { id: 'english', name: 'Английски' },
  { id: 'german', name: 'Немски' },
  { id: 'french', name: 'Френски' },
  { id: 'spanish', name: 'Испански' },
  { id: 'russian', name: 'Руски' },
  { id: 'italian', name: 'Италиански' },
  { id: 'other', name: 'Друг' },
];

export interface LanguageChoice {
  language: StudentLanguage;
  /** Програмата по ниво (lang-…); празно — избира се според класа */
  programId?: string;
}

export interface StudentProfile {
  version: 1;
  grade: StudentGrade;
  schoolType: SchoolType;
  /** Интензивно изучаване на чужд език в 8. клас (тогава 9. клас учи и съдържанието на 8.) */
  intensiveLanguage: boolean;
  profileId: ProfileId | null;
  /** Профилиращите предмети в XI–XII клас */
  profileSubjects: MonSubjectId[];
  /** Специалността в професионалната гимназия — свободен текст */
  specialty: string;
  /** Първи и (по желание) втори чужд език */
  languages: LanguageChoice[];
  /** Предмети, които ученикът махна от списъка или добави към него */
  removedProgramIds: string[];
  addedProgramIds: string[];
  /** Оценката, към която се стреми */
  targetGrade: 4 | 5 | 6;
  /** Колко минути на ден може да учи */
  minutesPerDay: number;
  updatedAt: string;
}

export const STUDENT_PROFILE_KEY = 'studybg.studentProfile.v1';

export function emptyProfile(grade: StudentGrade = 8): StudentProfile {
  return {
    version: 1,
    grade,
    schoolType: 'profiled',
    intensiveLanguage: false,
    profileId: null,
    profileSubjects: [],
    specialty: '',
    languages: [{ language: 'english' }],
    removedProgramIds: [],
    addedProgramIds: [],
    targetGrade: 6,
    minutesPerDay: 45,
    updatedAt: new Date(0).toISOString(),
  };
}

const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === 'string');

/** Проверява запазения профил; повреден или от стара версия → null */
export function parseStudentProfile(raw: unknown): StudentProfile | null {
  if (!isPlainObject(raw) || raw.version !== 1) return null;
  if (!STUDENT_GRADES.includes(raw.grade as StudentGrade)) return null;
  if (!SCHOOL_TYPES.some((s) => s.id === raw.schoolType)) return null;
  if (!isStringArray(raw.profileSubjects) || !isStringArray(raw.removedProgramIds) || !isStringArray(raw.addedProgramIds)) return null;
  if (!Array.isArray(raw.languages)) return null;
  const languages = raw.languages.filter(
    (l): l is LanguageChoice => isPlainObject(l) && STUDENT_LANGUAGES.some((x) => x.id === l.language) && (l.programId === undefined || typeof l.programId === 'string'),
  );
  return {
    version: 1,
    grade: raw.grade as StudentGrade,
    schoolType: raw.schoolType as SchoolType,
    intensiveLanguage: raw.intensiveLanguage === true,
    profileId: SCHOOL_PROFILES.some((p) => p.id === raw.profileId) ? (raw.profileId as ProfileId) : null,
    profileSubjects: raw.profileSubjects as MonSubjectId[],
    specialty: typeof raw.specialty === 'string' ? raw.specialty : '',
    languages,
    removedProgramIds: raw.removedProgramIds,
    addedProgramIds: raw.addedProgramIds,
    targetGrade: raw.targetGrade === 4 || raw.targetGrade === 5 ? raw.targetGrade : 6,
    minutesPerDay: typeof raw.minutesPerDay === 'number' && raw.minutesPerDay > 0 ? Math.min(raw.minutesPerDay, 600) : 45,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : new Date(0).toISOString(),
  };
}

export function loadStudentProfile(): StudentProfile | null {
  try {
    const raw = localStorage.getItem(STUDENT_PROFILE_KEY);
    return raw ? parseStudentProfile(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveStudentProfile(profile: StudentProfile): StudentProfile {
  const saved = { ...profile, updatedAt: new Date().toISOString() };
  try {
    localStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(saved));
  } catch {
    // Частен режим или пълно хранилище — профилът остава само за тази сесия
  }
  return saved;
}
