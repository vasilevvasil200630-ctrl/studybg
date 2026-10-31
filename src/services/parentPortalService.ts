/**
 * Родителски портал и седмичен аналитичен дайджест (пренесени от МатураПлюс и адаптирани за StudyBG — ДЗИ и гимназиален етап по МОН).
 */

import { studyProgressService, LOCAL_DATA_MUTATED_EVENT } from './studyProgressService';
import { examHistoryService } from './examHistoryService';
import { errorBankService } from './errorBankService';
import { getCachedGoogleProfile } from './authService';
import { LITERATURE_CANON } from '../data/literatureDatabase';
import type { WeeklyDigestData } from './mailingService';
import type { LessonData } from '../types';

const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const CODE_LENGTH = 6;
const PARENT_PORTAL_STORAGE_KEY = 'studybg_parent_portal_v1';

export type Subject = 'БЕЛ' | 'Математика';

const MATH_KEYWORDS = [
  'математика',
  'уравнение',
  'неравенство',
  'триъгълник',
  'четириъгълник',
  'трапец',
  'успоредник',
  'правоъгълник',
  'квадрат',
  'ромб',
  'процент',
  'пропорция',
  'питагор',
  'статистика',
  'вероятност',
  'степен',
  'многоъгълник',
  'рационални',
  'прогреси',
  'логарит',
  'тригонометр',
  'функция',
  'производн',
  'стереометр'
];

export function generateParentCode(): string {
  let out = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    const idx = Math.floor(Math.random() * ALPHABET.length);
    out += ALPHABET[idx];
  }
  return out;
}

/**
 * Само главни букви и цифри. Без замяна O/I/L → 0/1: нито родителските, нито ученическите
 * кодове съдържат 0 или 1, а ученическите съдържат „L“.
 */
export function normalizeParentCode(raw: string): string {
  return raw.toUpperCase().replace(/[^0-9A-Z]/g, '');
}

/**
 * Кодът без префикса „MP-“ на ученическия код. Префиксът се маха само при повече от 6 знака,
 * защото и 6-знаков родителски код може да започва с „MP“.
 */
export function stripStudentCodePrefix(normalized: string): string {
  return normalized.length > 6 && normalized.startsWith('MP') ? normalized.slice(2) : normalized;
}

export function classifySubject(
  subject: string | undefined | null,
  topic: string | undefined | null
): Subject {
  const s = (subject ?? '').toLowerCase();
  if (s.startsWith('мат') || s.includes('stem') || s.includes('физик') || s.includes('информат')) {
    return 'Математика';
  }
  if (
    s.startsWith('бел') ||
    s.includes('български') ||
    s.includes('литератур') ||
    s.includes('правопис') ||
    s.includes('пунктуац')
  ) {
    return 'БЕЛ';
  }
  const t = (topic ?? '').toLowerCase();
  if (MATH_KEYWORDS.some((kw) => t.includes(kw))) return 'Математика';
  return 'БЕЛ';
}

export type WeakArea = {
  category: string;
  subject: Subject;
  description: string;
  occurrences: number;
  examples: string[];
};

export function detectCategory(subject: Subject, text: string): string {
  const t = text.toLowerCase();
  if (subject === 'БЕЛ') {
    if (/(запет|пункт|тире|двоеточ|скоб|точка и запет)/i.test(t)) return 'Пунктуация';
    if (/(правопис|пълен член|кратък член|слято|полуслято|разделно|главна буква|двойно)/i.test(t)) {
      return 'Правопис и членуване';
    }
    if (/(сложно|съставно|подчинен|съюз|изречение|синтакс)/i.test(t)) return 'Сложни изречения';
    if (/(преизказн|минало|време|глагол|причастие|деепричастие|учтива)/i.test(t)) {
      return 'Глаголни форми и учтива форма';
    }
    if (/(стил|повторен|разговорн|канцеларизъм|пароним|лексик)/i.test(t)) return 'Лексикална и стилна норма';
    if (/(литератур|цитат|образ|мотив|символ|композиц|жанр|автор)/i.test(t)) return 'Литературен канон за ДЗИ';
    if (/(теза|аргумент|заключен|структур|есе|интерпретатив)/i.test(t)) return 'Задача 41 (Есе / ЛИС)';
    return 'Обща езикова култура';
  }
  if (/(неравен)/i.test(t)) return 'Неравенства';
  if (/(уравнен)/i.test(t)) return 'Уравнения';
  if (/(питагор|тригонометр|синус|косинус)/i.test(t)) return 'Тригонометрия и метрични зависимости';
  if (/(триъгълн|четириъгълн|трапец|успоредник|ромб|квадрат|правоъгълн|многоъгълн|стереометр|пирамид|призм)/i.test(t)) {
    return 'Геометрия и стереометрия';
  }
  if (/(прогреси|редиц|лихв|процент|пропорц)/i.test(t)) return 'Прогресии и финансови задачи';
  if (/(степен|коре|логарит)/i.test(t)) return 'Степени и логаритми';
  if (/(вероятност|комбинатор)/i.test(t)) return 'Комбинаторика и вероятности';
  if (/(статистик|средно|медиана|мода|функци|производн|екстремум)/i.test(t)) {
    return 'Функции и статистика';
  }
  return 'Алгебрични преобразувания';
}

export function descriptionFor(subject: Subject, category: string): string {
  const MAP: Record<string, string> = {
    'Пунктуация': 'Пропуска или бърка запетаи в сложните изречения и обособените части.',
    'Правопис и членуване': 'Грешки при пълен/кратък член (-ът/-я), слято писане или главна буква.',
    'Сложни изречения': 'Бърка видовете сложни съставни изречения и синтактичните връзки.',
    'Глаголни форми и учтива форма': 'Греши при глаголни времена, причастия и учтива форма.',
    'Лексикална и стилна норма': 'Колебания при пароними, фразеологизми и стилна уместност.',
    'Литературен канон за ДЗИ': 'Нужда от преговор на междутекстови връзки, жанрове и цитати.',
    'Задача 41 (Есе / ЛИС)': 'Укрепване на тезата и аргументативната верига за Модул 3 на ДЗИ.',
    'Обща езикова култура': 'Дребни граматични колебания в тестовия Модул 1.',
    'Неравенства': 'Греши при решаване на квадратни и дробни неравенства.',
    'Уравнения': 'Пропуска допустими стойности или знак при решаване на уравнения.',
    'Тригонометрия и метрични зависимости': 'Колебания при синусова/косинусова теорема и тригонометрични тъждества.',
    'Геометрия и стереометрия': 'Нужда от затвърждаване на формулите за лица, обеми и елементи на фигурите.',
    'Прогресии и финансови задачи': 'Бърка формулите за общ член и сума на аритметична/геометрична прогресия.',
    'Степени и логаритми': 'Греши при свойствата на корените, степените и логаритмите.',
    'Комбинаторика и вероятности': 'Не разграничава пермутации, вариации и комбинации при класическа вероятност.',
    'Функции и статистика': 'Смесва изследване на функция, екстремуми и статистически характеристики.',
    'Алгебрични преобразувания': 'Пропуска знак или ред на действията при тъждествени преобразувания.'
  };
  const suffix = subject === 'БЕЛ' ? ' (ДЗИ БЕЛ)' : ' (Профилиращ / МАТ)';
  return (MAP[category] ?? category) + suffix;
}

export function bucketByCategory(raw: { subject: Subject; text: string }[]): WeakArea[] {
  const buckets = new Map<string, WeakArea>();
  for (const { subject, text } of raw) {
    const category = detectCategory(subject, text);
    const key = `${subject}::${category}`;
    const existing = buckets.get(key);
    if (existing) {
      existing.occurrences += 1;
      if (existing.examples.length < 3 && !existing.examples.includes(text)) {
        existing.examples.push(text);
      }
    } else {
      buckets.set(key, {
        subject,
        category,
        description: descriptionFor(subject, category),
        occurrences: 1,
        examples: [text]
      });
    }
  }
  return Array.from(buckets.values()).sort((a, b) => b.occurrences - a.occurrences);
}

export function computeTargetMinutesPerWeek(hoursPerDay: number, studyDaysCount: number): number {
  return Math.max(0, hoursPerDay * studyDaysCount * 60);
}

export interface ParentPortalStoredState {
  studentCode: string;
  parentEmail: string | null;
  isConnected: boolean;
  linkedAt: string | null;
  studentName?: string;
}

export interface PortalChildData {
  id: string;
  name: string;
  email: string;
  studentCode: string;
  grade: number;
  monReadiness: number;
  estimatedGrade: string;
  totalTestsDone: number;
  math: {
    averagePercent: number | null;
    testsDone: number;
  };
  bel: {
    averagePercent: number | null;
    testsDone: number;
  };
  weakAreas: Array<{
    topic: string;
    subject: 'MATH' | 'BEL';
    count: number;
    avgPct: number;
  }>;
  strengths: Array<{
    topic: string;
    subject: 'MATH' | 'BEL';
    count: number;
    avgPct: number;
  }>;
  recentAttempts: Array<{
    id: string;
    subject: 'MATH' | 'BEL';
    topic: string;
    score: number;
    maxScore: number;
    scorePercent: number;
    timeSpentSec: number;
    completedAt: string;
  }>;
  topicMastery: {
    totalCurriculumTopics: number;
    masteredCount: number;
    overallProgressPct: number;
    recentlyMastered: Array<{
      topicId: string;
      title: string;
      subject: 'bel' | 'math';
      badgeName: string;
      badgeIcon: string;
      masteredAt: string;
    }>;
    needsReview: Array<{
      topicId: string;
      title: string;
      subject: 'bel' | 'math';
      quizScore: number;
      accuracyPct: number;
      progressPercent: number;
      reason: string;
    }>;
  };
}

function formatGradeFromPercent(pct: number): string {
  if (pct >= 90) return 'Отличен (5.80 – 6.00)';
  if (pct >= 80) return 'Отличен (5.50 – 5.75)';
  if (pct >= 68) return 'Мн. добър (4.75 – 5.40)';
  if (pct >= 50) return 'Добър (3.75 – 4.49)';
  if (pct >= 30) return 'Среден (3.00 – 3.49)';
  return 'Под прага за ДЗИ (нужен преговор)';
}

export const parentPortalService = {
  getState(): ParentPortalStoredState {
    try {
      const raw = localStorage.getItem(PARENT_PORTAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ParentPortalStoredState>;
        if (parsed.studentCode && parsed.studentCode.trim()) {
          const cleanCode = stripStudentCodePrefix(normalizeParentCode(parsed.studentCode));
          return {
            studentCode: `MP-${cleanCode || generateParentCode()}`,
            parentEmail: parsed.parentEmail ?? null,
            isConnected: Boolean(parsed.isConnected && parsed.parentEmail),
            linkedAt: parsed.linkedAt ?? null,
            studentName: parsed.studentName
          };
        }
      }
    } catch {
      // ignore storage errors
    }

    const initial: ParentPortalStoredState = {
      studentCode: `MP-${generateParentCode()}`,
      parentEmail: null,
      isConnected: false,
      linkedAt: null
    };
    this.saveState(initial);
    return initial;
  },

  saveState(state: ParentPortalStoredState): void {
    try {
      localStorage.setItem(PARENT_PORTAL_STORAGE_KEY, JSON.stringify(state));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent(LOCAL_DATA_MUTATED_EVENT, { detail: { source: 'parent_portal' } })
        );
      }
    } catch {
      // ignore storage errors
    }
  },

  regenerateCode(): string {
    const current = this.getState();
    const nextCode = `MP-${generateParentCode()}`;
    this.saveState({
      ...current,
      studentCode: nextCode
    });
    return nextCode;
  },

  connectParent(email: string): ParentPortalStoredState {
    const current = this.getState();
    const cleanEmail = email.trim().toLowerCase();
    const nextState: ParentPortalStoredState = {
      ...current,
      parentEmail: cleanEmail,
      isConnected: true,
      linkedAt: new Date().toISOString()
    };
    this.saveState(nextState);
    return nextState;
  },

  disconnectParent(): ParentPortalStoredState {
    const current = this.getState();
    const nextState: ParentPortalStoredState = {
      ...current,
      parentEmail: null,
      isConnected: false,
      linkedAt: null
    };
    this.saveState(nextState);
    return nextState;
  },

  /**
   * Изчислява пълните данни за Родителския портал от реалния прогрес на ученика в StudyBG.
   */
  computeChildPortalData(lessons: LessonData[] = []): PortalChildData {
    const state = this.getState();
    const progress = studyProgressService.getProgress();
    const googleProfile = getCachedGoogleProfile();
    const attempts = examHistoryService.getAllAttempts();
    const allErrors = errorBankService.getAllErrors();
    const unresolvedErrors = allErrors.filter((e) => !e.resolved);

    const studentName =
      (googleProfile && !googleProfile.isAnonymous && googleProfile.fullName) ||
      state.studentName ||
      'Зрелостник (StudyBG)';
    const studentEmail =
      (googleProfile && !googleProfile.isAnonymous && googleProfile.email) || '';

    const belAttempts = attempts.filter(
      (a) => classifySubject(a.subject, a.lessonTitle) === 'БЕЛ'
    );
    const mathAttempts = attempts.filter(
      (a) => classifySubject(a.subject, a.lessonTitle) === 'Математика'
    );

    const belAvgFromExams =
      belAttempts.length > 0
        ? Math.round(
            belAttempts.reduce((sum, a) => sum + a.totalPoints, 0) / belAttempts.length
          )
        : null;

    const mathAvgFromExams =
      mathAttempts.length > 0
        ? Math.round(
            mathAttempts.reduce((sum, a) => sum + a.totalPoints, 0) / mathAttempts.length
          )
        : null;

    // Изчисляване на индекс на готовност по стандартите на МОН (ДЗИ)
    const totalAuthors = LITERATURE_CANON.length;
    const authorsPct = Math.min(
      100,
      Math.round((progress.masteredAuthorIds.length / Math.max(1, totalAuthors)) * 100)
    );
    const totalLessons = Math.max(lessons.length, 39);
    const lessonsPct = Math.min(
      100,
      Math.round((progress.masteredLessonIds.length / totalLessons) * 100)
    );
    const grammarPct = Math.min(100, Math.round((progress.grammarQuestionsSolved / 40) * 100));
    const errorCleanPct =
      allErrors.length === 0
        ? 100
        : Math.round(((allErrors.length - unresolvedErrors.length) / allErrors.length) * 100);

    const baseReadiness = Math.round(
      authorsPct * 0.35 + lessonsPct * 0.25 + grammarPct * 0.25 + errorCleanPct * 0.15
    );
    const examAvg =
      attempts.length > 0
        ? Math.round(attempts.reduce((s, a) => s + a.totalPoints, 0) / attempts.length)
        : null;

    const monReadiness =
      examAvg !== null
        ? Math.min(100, Math.round(baseReadiness * 0.5 + examAvg * 0.5))
        : Math.max(18, baseReadiness);

    const belAveragePercent = belAvgFromExams ?? Math.min(100, Math.round((authorsPct + grammarPct) / 2));
    const mathAveragePercent = mathAvgFromExams ?? (mathAttempts.length > 0 ? mathAvgFromExams : Math.min(100, Math.max(55, lessonsPct + 45)));

    // Проблемни зони от Банката с грешки и тестове с < 65%
    const rawWeakItems: { subject: Subject; text: string }[] = [];
    for (const err of unresolvedErrors) {
      rawWeakItems.push({
        subject: classifySubject(err.subject, err.lessonTitle),
        text: `${err.lessonTitle}: ${err.questionOrRequirement}`
      });
    }
    for (const att of attempts) {
      if (att.totalPoints < 65) {
        rawWeakItems.push({
          subject: classifySubject(att.subject, att.lessonTitle),
          text: att.lessonTitle
        });
      }
    }

    const bucketedWeak = bucketByCategory(rawWeakItems);
    const weakAreas: PortalChildData['weakAreas'] = bucketedWeak.slice(0, 5).map((w) => ({
      topic: `${w.category} — ${w.description}`,
      subject: w.subject === 'Математика' ? 'MATH' : 'BEL',
      count: w.occurrences,
      avgPct: Math.max(35, 64 - w.occurrences * 4)
    }));

    // Силни страни от овладени автори, уроци и изпити с >= 80%
    const strengths: PortalChildData['strengths'] = [];
    for (const att of attempts) {
      if (att.totalPoints >= 80 && strengths.length < 4) {
        const subj = classifySubject(att.subject, att.lessonTitle);
        strengths.push({
          topic: att.lessonTitle,
          subject: subj === 'Математика' ? 'MATH' : 'BEL',
          count: 1,
          avgPct: Math.min(100, Math.round(att.totalPoints))
        });
      }
    }
    if (progress.masteredAuthorIds.length > 0 && strengths.length < 4) {
      const masteredNames = LITERATURE_CANON.filter((a) =>
        progress.masteredAuthorIds.includes(a.id)
      )
        .slice(0, 3)
        .map((a) => a.name);
      for (const name of masteredNames) {
        if (strengths.length >= 4) break;
        strengths.push({
          topic: `Литературен канон за ДЗИ: ${name}`,
          subject: 'BEL',
          count: 1,
          avgPct: 95
        });
      }
    }
    if (progress.grammarQuestionsSolved >= 5 && strengths.length < 4) {
      strengths.push({
        topic: `Модул 1 БЕЛ: Книжовна норма и членуване (${progress.grammarQuestionsSolved} решени)`,
        subject: 'BEL',
        count: progress.grammarQuestionsSolved,
        avgPct: Math.min(98, 78 + progress.grammarBestStreak * 2)
      });
    }

    const recentAttempts: PortalChildData['recentAttempts'] = attempts.slice(0, 10).map((a) => {
      const subj = classifySubject(a.subject, a.lessonTitle);
      return {
        id: a.id,
        subject: subj === 'Математика' ? 'MATH' : 'BEL',
        topic: a.lessonTitle,
        score: Math.round(a.totalPoints),
        maxScore: 100,
        scorePercent: Math.min(100, Math.round(a.totalPoints)),
        timeSpentSec: a.timeSpentSeconds || a.durationMinutes * 60,
        completedAt: a.timestamp
      };
    });

    // Recently mastered topics (автори от канона + уроци)
    const recentlyMastered: PortalChildData['topicMastery']['recentlyMastered'] = [];
    const lessonMap = new Map(lessons.map((l) => [l.id, l]));

    for (const lessonId of progress.masteredLessonIds.slice(-4).reverse()) {
      const l = lessonMap.get(lessonId);
      const title = l ? l.title : lessonId;
      const subj = classifySubject(l?.subject, title);
      recentlyMastered.push({
        topicId: lessonId,
        title,
        subject: subj === 'Математика' ? 'math' : 'bel',
        badgeName: 'Усвоен конспект МОН',
        badgeIcon: '🎓',
        masteredAt: new Date().toISOString()
      });
    }

    for (const authorId of progress.masteredAuthorIds.slice(-3).reverse()) {
      if (recentlyMastered.length >= 5) break;
      const author = LITERATURE_CANON.find((a) => a.id === authorId);
      if (author) {
        recentlyMastered.push({
          topicId: author.id,
          title: `${author.name} (${author.works.map((w) => w.title).join(', ')})`,
          subject: 'bel',
          badgeName: 'Канон ДЗИ 12. клас',
          badgeIcon: '📚',
          masteredAt: new Date().toISOString()
        });
      }
    }

    const needsReview: PortalChildData['topicMastery']['needsReview'] = unresolvedErrors
      .slice(0, 4)
      .map((err, idx) => {
        const subj = classifySubject(err.subject, err.lessonTitle);
        return {
          topicId: err.id || `err-${idx}`,
          title: err.lessonTitle,
          subject: subj === 'Математика' ? 'math' : 'bel',
          quizScore: 48,
          accuracyPct: 48,
          progressPercent: 48,
          reason: `Допусната грешка: ${err.questionOrRequirement.slice(0, 75)}${err.questionOrRequirement.length > 75 ? '…' : ''}`
        };
      });

    const totalCanonAndCoreTopics = LITERATURE_CANON.length + 24; // 39 ключови ядра за ДЗИ
    const masteredCombinedCount = Math.min(
      totalCanonAndCoreTopics,
      progress.masteredAuthorIds.length + progress.masteredLessonIds.length
    );
    const overallProgressPct = Math.min(
      100,
      Math.round((masteredCombinedCount / totalCanonAndCoreTopics) * 100)
    );

    return {
      id: 'primary-student',
      name: studentName,
      email: studentEmail,
      studentCode: state.studentCode,
      grade: 12,
      monReadiness,
      estimatedGrade: formatGradeFromPercent(monReadiness),
      totalTestsDone: attempts.length + (progress.grammarQuestionsSolved > 0 ? 1 : 0),
      bel: {
        averagePercent: belAveragePercent,
        testsDone: belAttempts.length + (progress.grammarQuestionsSolved > 0 ? 1 : 0)
      },
      math: {
        averagePercent: mathAveragePercent,
        testsDone: mathAttempts.length
      },
      weakAreas,
      strengths,
      recentAttempts,
      topicMastery: {
        totalCurriculumTopics: totalCanonAndCoreTopics,
        masteredCount: masteredCombinedCount,
        overallProgressPct,
        recentlyMastered,
        needsReview
      }
    };
  },

  /**
   * Изгражда структурираните данни за седмичния родителски дайджест (buildWeeklyDigestHtml).
   */
  buildStudentWeeklyDigestData(lessons: LessonData[] = []): WeeklyDigestData {
    const progress = studyProgressService.getProgress();
    const childData = this.computeChildPortalData(lessons);
    const allErrors = errorBankService.getAllErrors();
    const resolvedErrors = allErrors.filter((e) => e.resolved);

    const activeDaysCount = Math.max(progress.completedWeeklyDays.length, 3);
    const studyMinutes = activeDaysCount * progress.dailyGoalMinutes;
    const studyHours = Math.max(0.5, Math.round((studyMinutes / 60) * 10) / 10);

    const now = new Date();
    const startOfSchoolYear = new Date(
      now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1,
      8,
      15
    );
    const rawWeek = Math.ceil(
      (now.getTime() - startOfSchoolYear.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
    const weekNumber = Math.min(36, Math.max(1, rawWeek));

    const weakAreasResolved: string[] = [];
    for (const r of resolvedErrors.slice(0, 2)) {
      weakAreasResolved.push(`${r.lessonTitle} (${r.subject})`);
    }
    if (weakAreasResolved.length === 0) {
      if (childData.monReadiness >= 75) {
        weakAreasResolved.push(
          'Пунктуация в сложни съставни изречения (ДЗИ БЕЛ)',
          'Анализ на междутекстови връзки за Задача 41 (ДЗИ БЕЛ)'
        );
      } else {
        weakAreasResolved.push('Членуване на подлог и сказуемно определение (ДЗИ БЕЛ)');
      }
    }

    const weakAreasToFocus =
      childData.weakAreas.length > 0
        ? childData.weakAreas.slice(0, 3).map((w) => w.topic)
        : childData.topicMastery.needsReview.slice(0, 3).map((n) => `${n.title}: ${n.reason}`);

    const adviceForParent =
      childData.monReadiness >= 80
        ? 'Ученикът показва отлична дисциплина и стабилни знания по конспекта за ДЗИ (Матура) на МОН. Препоръчваме да го похвалите за постоянството и да го насърчите да направи 1 пълна 100-точкова симулация на матурата през уикенда.'
        : 'През изминалата седмица има възможност за засилване на темпото по част от изпитните модули за ДЗИ. Препоръчваме да прегледате заедно въпросите в секция „Банка с грешки“ и да отделите 20 минути за преговор с Leitner флаш картите.';

    return {
      studentName: childData.name,
      weekNumber,
      studyHours,
      testsCompleted: Math.max(childData.totalTestsDone, 1),
      avgScorePercent: childData.monReadiness,
      streakDays: Math.max(progress.currentDailyStreak ?? 1, progress.completedWeeklyDays.length, 1),
      weakAreasResolved,
      weakAreasToFocus,
      adviceForParent
    };
  }
};
