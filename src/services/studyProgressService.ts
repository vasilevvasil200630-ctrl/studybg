export type TargetExamTrack = 'dzi_bel' | 'dzi_history' | 'nvo_10' | 'dzi_stem';

export const LOCAL_DATA_MUTATED_EVENT = 'studybg:local-data-mutated';

export interface UserStudyProgress {
  targetExam: TargetExamTrack;
  dailyGoalMinutes: 30 | 45 | 60 | 90;
  targetGrade: 5.0 | 5.5 | 6.0;
  masteredLessonIds: string[];
  masteredAuthorIds: string[];
  grammarQuestionsSolved: number;
  grammarBestStreak: number;
  completedWeeklyDays: string[];
  /** История на активните учебни дни във формат YYYY-MM-DD (за точен облачен Streak между устройства) */
  activeDaysHistory?: string[];
  currentDailyStreak?: number;
  longestDailyStreak?: number;
  bonusXp?: number;
}

export interface AcademicLevelInfo {
  level: number;
  maxLevel: number;
  title: string;
  badgeColor: string;
  totalXp: number;
  currentLevelMinXp: number;
  nextLevelXp: number;
  xpIntoLevel: number;
  xpNeededForNext: number;
  progressPercent: number;
}

export interface StudyAchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'curriculum' | 'canon' | 'grammar' | 'streak' | 'exam';
  iconName: 'book' | 'feather' | 'shield' | 'flame' | 'trophy' | 'sparkles' | 'target' | 'award';
  xpReward: number;
  currentValue: number;
  targetValue: number;
  unlocked: boolean;
  progressPercent: number;
}

/** Един изпитен ден по графика на МОН */
export interface MonExamSession {
  /** Какво се изпитва в този ден */
  label: string;
  /** YYYY-MM-DD; часът не е в графика, затова не се показва */
  date: string;
}

export interface MonOfficialExamDate {
  id: TargetExamTrack;
  title: string;
  shortTitle: string;
  grade: string;
  /** Датите от графика на МОН за учебната година (MON_EXAM_CALENDAR) */
  sessions: MonExamSession[];
  /** Ориентир за следващата година, докато МОН не обяви графика (месецът е от 0) */
  usualMonthDay: { month: number; day: number };
  durationText: string;
  maxPoints: number;
  /** Как се отчита резултатът — без измислени прагове */
  resultText: string;
  modulesText: string;
  officialNote: string;
}

/** Откъде са датите на изпитите */
export const MON_EXAM_CALENDAR = {
  schoolYear: '2026/2027',
  source: 'Заповед № РД09-3345/31.08.2026 г. на министъра на образованието и науката',
  url: 'https://www.mon.bg/dyasno-menyu/vakantsii/'
} as const;

const DZI_RESULT = 'Оценка по скалата на МОН за ДЗИ: 30 т. — Среден 3,00, 95 т. — Отличен 6,00';

export const MON_OFFICIAL_EXAMS: MonOfficialExamDate[] = [
  {
    id: 'dzi_bel',
    title: 'ДЗИ по български език и литература (задължителна матура)',
    shortTitle: 'ДЗИ БЕЛ (12. клас)',
    grade: '12. клас',
    sessions: [{ label: 'ДЗИ по български език и литература', date: '2027-05-19' }],
    usualMonthDay: { month: 4, day: 19 },
    durationText: '240 мин (60 + 60 + 120)',
    maxPoints: 100,
    resultText: DZI_RESULT,
    modulesText: 'Част 1 (60 мин) + Част 2 (60 мин) + Част 3: есе или интерпретативно съчинение (120 мин)',
    officialNote: 'Задължителен държавен зрелостен изпит за всички ученици в 12. клас.'
  },
  {
    id: 'dzi_history',
    title: 'Втори задължителен ДЗИ по избран предмет',
    shortTitle: 'Втора матура (12. клас)',
    grade: '12. клас',
    sessions: [{ label: 'Втори задължителен ДЗИ', date: '2027-05-21' }],
    usualMonthDay: { month: 4, day: 21 },
    durationText: 'според предмета',
    maxPoints: 100,
    resultText: DZI_RESULT,
    modulesText: 'Форматът зависи от избрания предмет — по изпитната програма на МОН.',
    officialNote: 'Вторият задължителен държавен зрелостен изпит е по предмет, избран от ученика.'
  },
  {
    id: 'nvo_10',
    title: 'Национално външно оценяване (НВО) в края на X клас',
    shortTitle: 'НВО 10. клас',
    grade: '10. клас',
    sessions: [
      { label: 'НВО по БЕЛ (с интегриране на други учебни предмети)', date: '2027-06-18' },
      { label: 'НВО по математика (с интегриране на други учебни предмети)', date: '2027-06-21' }
    ],
    usualMonthDay: { month: 5, day: 18 },
    durationText: '120 мин за всеки от двата изпита (Заповед № РД09-3342/31.08.2026)',
    maxPoints: 100,
    resultText: 'Резултат в точки — НВО няма праг за успех',
    modulesText: 'Два изпита в различни дни: по БЕЛ (с история и цивилизации и философия, 22 задачи) и по математика (с биология, химия, физика и география, 16 задачи).',
    officialNote: 'Националното външно оценяване в края на X клас е по български език и литература и по математика.'
  },
  {
    id: 'dzi_stem',
    title: 'ДЗИ по математика, биология, химия или физика (втори задължителен или допълнителен)',
    shortTitle: 'ДЗИ STEM & Природни науки',
    grade: '12. клас',
    sessions: [{ label: 'Втори задължителен ДЗИ', date: '2027-05-21' }],
    usualMonthDay: { month: 4, day: 21 },
    durationText: '240 мин (ДЗИ по математика)',
    maxPoints: 100,
    resultText: DZI_RESULT,
    modulesText: 'По изпитната програма на МОН за избрания предмет.',
    officialNote: 'Като втори задължителен ДЗИ — на датата на втория изпит; допълнителните ДЗИ са по отделен график на МОН.'
  }
];

/** Следващият изпитен ден: първата неминала дата от графика или (ако графикът е изтекъл) ориентир за следващата година */
export function nextExamSession(exam: MonOfficialExamDate, now: Date = new Date()): { date: Date; label: string; official: boolean } {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  for (const s of exam.sessions) {
    const [y, m, d] = s.date.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (date.getTime() >= today) return { date, label: s.label, official: true };
  }
  const { month, day } = exam.usualMonthDay;
  let year = now.getFullYear();
  if (new Date(year, month, day).getTime() < today) year += 1;
  return { date: new Date(year, month, day), label: exam.sessions[0]?.label ?? exam.shortTitle, official: false };
}

const PROGRESS_STORAGE_KEY = 'studybg_user_progress_v1';
const LEGACY_MASTERED_LESSONS_KEY = 'studybg_planner_mastered_lessons_v1';

const LEGACY_LESSON_ID_MAP: Record<string, string> = {
  'bel-11-botev-pat': 'bel-botev-poeziya',
  'hist-10-12-aprilsko-1876': 'history-april-uprising'
};

function normalizeMasteredIds(ids: unknown[]): string[] {
  const result = new Set<string>();
  for (const item of ids) {
    if (typeof item === 'string' && item.trim()) {
      const normalized = LEGACY_LESSON_ID_MAP[item] ?? item;
      result.add(normalized);
    }
  }
  return Array.from(result);
}

export function getTodayDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateKeyToUtcMs(dateKey: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return null;
  const [y, m, d] = dateKey.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

export function normalizeActiveDays(days: unknown): string[] {
  if (!Array.isArray(days)) return [];
  const valid = new Set<string>();
  for (const item of days) {
    if (typeof item === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.trim())) {
      valid.add(item.trim());
    }
  }
  return Array.from(valid).sort().slice(-90);
}

/**
 * Изчислява текущия и най-дългия Дневен Streak (поредни дни активност) от списък с YYYY-MM-DD дати.
 */
export function computeDailyStreakStats(
  activeDays: string[],
  todayKey: string = getTodayDateKey()
): {
  activeDaysHistory: string[];
  currentDailyStreak: number;
  longestDailyStreak: number;
} {
  const sorted = normalizeActiveDays(activeDays);
  if (sorted.length === 0) {
    return {
      activeDaysHistory: [todayKey],
      currentDailyStreak: 1,
      longestDailyStreak: 1
    };
  }

  const DAY_MS = 24 * 60 * 60 * 1000;
  let longest = 1;
  let run = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prevMs = parseDateKeyToUtcMs(sorted[i - 1]);
    const currMs = parseDateKeyToUtcMs(sorted[i]);
    if (prevMs !== null && currMs !== null && Math.round((currMs - prevMs) / DAY_MS) === 1) {
      run++;
      if (run > longest) longest = run;
    } else {
      run = 1;
    }
  }

  const todayMs = parseDateKeyToUtcMs(todayKey);
  const lastKey = sorted[sorted.length - 1];
  const lastMs = parseDateKeyToUtcMs(lastKey);

  let current = 0;
  if (todayMs !== null && lastMs !== null) {
    const diffFromToday = Math.round((todayMs - lastMs) / DAY_MS);
    if (diffFromToday <= 1) {
      current = 1;
      for (let i = sorted.length - 1; i > 0; i--) {
        const cMs = parseDateKeyToUtcMs(sorted[i]);
        const pMs = parseDateKeyToUtcMs(sorted[i - 1]);
        if (cMs !== null && pMs !== null && Math.round((cMs - pMs) / DAY_MS) === 1) {
          current++;
        } else {
          break;
        }
      }
    }
  }

  return {
    activeDaysHistory: sorted,
    currentDailyStreak: Math.max(1, current),
    longestDailyStreak: Math.max(longest, current, 1)
  };
}

const ACADEMIC_LEVEL_THRESHOLDS: { level: number; minXp: number; title: string; badgeColor: string }[] = [
  { level: 1, minXp: 0, title: 'Начинаещ Гимназист', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300' },
  { level: 2, minXp: 250, title: 'Буден Ученик', badgeColor: 'bg-blue-50 text-blue-800 border-blue-200' },
  { level: 3, minXp: 600, title: 'Търсач на Знанието', badgeColor: 'bg-sky-50 text-sky-800 border-sky-200' },
  { level: 4, minXp: 1100, title: 'Ерудит в Академията', badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
  { level: 5, minXp: 1800, title: 'Майстор на Конспекта', badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { level: 6, minXp: 2700, title: 'Стратег за Матурата', badgeColor: 'bg-teal-50 text-teal-800 border-teal-200' },
  { level: 7, minXp: 3800, title: 'Шампион на Канона', badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  { level: 8, minXp: 5200, title: 'Властелин на 100-те Точки', badgeColor: 'bg-purple-50 text-purple-800 border-purple-200' },
  { level: 9, minXp: 7000, title: 'Национален Отличник (5.90+)', badgeColor: 'bg-amber-50 text-amber-900 border-amber-300' },
  { level: 10, minXp: 9500, title: 'Абсолютен Лауреат 6.00', badgeColor: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-950 border-amber-400' }
];

export function evaluateUserAchievements(
  progress: UserStudyProgress,
  extraStats?: { examAttemptsCount?: number; highestExamScore?: number; resolvedErrorsCount?: number }
): StudyAchievementBadge[] {
  const lessonsCount = progress.masteredLessonIds.length;
  const authorsCount = progress.masteredAuthorIds.length;
  const grammarSolved = progress.grammarQuestionsSolved;
  const grammarStreak = progress.grammarBestStreak;
  const weeklyDays = progress.completedWeeklyDays.length;
  const bestDailyStreak = Math.max(progress.longestDailyStreak ?? 1, progress.currentDailyStreak ?? 1);
  const examCount = extraStats?.examAttemptsCount ?? 0;
  const highestScore = extraStats?.highestExamScore ?? 0;

  const rawBadges: Omit<StudyAchievementBadge, 'unlocked' | 'progressPercent'>[] = [
    {
      id: 'first-steps',
      title: 'Първа крачка към 6.00',
      description: 'Усвои поне 3 урока от учебната програма на МОН.',
      category: 'curriculum',
      iconName: 'book',
      xpReward: 100,
      currentValue: lessonsCount,
      targetValue: 3
    },
    {
      id: 'curriculum-explorer',
      title: 'Изследовател на МОН',
      description: 'Усвои поне 15 теми от националния каталог.',
      category: 'curriculum',
      iconName: 'target',
      xpReward: 250,
      currentValue: lessonsCount,
      targetValue: 15
    },
    {
      id: 'curriculum-master',
      title: 'Господар на Конспектите',
      description: 'Усвои поне 50 теми от учебната програма (5.–12. клас).',
      category: 'curriculum',
      iconName: 'trophy',
      xpReward: 600,
      currentValue: lessonsCount,
      targetValue: 50
    },
    {
      id: 'canon-initiate',
      title: 'Познавач на Класиците',
      description: 'Овладей поне 5 задължителни автори от Литературния канон за ДЗИ.',
      category: 'canon',
      iconName: 'feather',
      xpReward: 180,
      currentValue: authorsCount,
      targetValue: 5
    },
    {
      id: 'canon-laureate',
      title: 'Властелин на Канона (15/15)',
      description: 'Овладей всички 15 автори за Модул 3 (Есе / ЛИС) на матурата по БЕЛ.',
      category: 'canon',
      iconName: 'award',
      xpReward: 500,
      currentValue: authorsCount,
      targetValue: 15
    },
    {
      id: 'grammar-sniper',
      title: 'Граматичен Снайперист',
      description: 'Постигни серия от 10 поредни верни отговора в Тренажора по БЕЛ.',
      category: 'grammar',
      iconName: 'sparkles',
      xpReward: 200,
      currentValue: grammarStreak,
      targetValue: 10
    },
    {
      id: 'grammar-norm-guardian',
      title: 'Пазител на Книжовната Норма',
      description: 'Реши поне 50 езикови задачи по нормите на БАН (Модул 1).',
      category: 'grammar',
      iconName: 'shield',
      xpReward: 300,
      currentValue: grammarSolved,
      targetValue: 50
    },
    {
      id: 'streak-3',
      title: 'Огнен Старт (3 дни подред)',
      description: 'Учи активно в StudyBG 3 поредни дни без прекъсване.',
      category: 'streak',
      iconName: 'flame',
      xpReward: 150,
      currentValue: bestDailyStreak,
      targetValue: 3
    },
    {
      id: 'streak-7',
      title: 'Желязна Дисциплина (7 дни)',
      description: 'Поддържай 7-дневен непрекъснат Streak от подготовка.',
      category: 'streak',
      iconName: 'flame',
      xpReward: 400,
      currentValue: bestDailyStreak,
      targetValue: 7
    },
    {
      id: 'weekly-planner-pro',
      title: 'Архитект на Седмицата',
      description: 'Изпълни всички 7 дни от седмичния график в Плана за 6.00.',
      category: 'streak',
      iconName: 'target',
      xpReward: 250,
      currentValue: weeklyDays,
      targetValue: 7
    },
    {
      id: 'exam-gladiator',
      title: 'Гладиатор на Симулатора',
      description: 'Завърши поне 1 пълна 100-точкова симулация на изпит.',
      category: 'exam',
      iconName: 'shield',
      xpReward: 200,
      currentValue: examCount,
      targetValue: 1
    },
    {
      id: 'exam-excellence-6',
      title: 'Отличник на Матурата (85+ т.)',
      description: 'Постигни поне 85 от 100 точки в Изпитния симулатор.',
      category: 'exam',
      iconName: 'trophy',
      xpReward: 500,
      currentValue: highestScore,
      targetValue: 85
    }
  ];

  return rawBadges.map((b) => {
    const unlocked = b.currentValue >= b.targetValue;
    const progressPercent = Math.min(100, Math.round((b.currentValue / Math.max(1, b.targetValue)) * 100));
    return {
      ...b,
      unlocked,
      progressPercent
    };
  });
}

export function computeUserXpAndLevel(
  progress: UserStudyProgress,
  extraStats?: { examAttemptsCount?: number; highestExamScore?: number; resolvedErrorsCount?: number }
): AcademicLevelInfo {
  const badges = evaluateUserAchievements(progress, extraStats);
  const unlockedBadgesXp = badges.reduce((sum, b) => sum + (b.unlocked ? b.xpReward : 0), 0);

  const activeDaysCount = Array.isArray(progress.activeDaysHistory)
    ? progress.activeDaysHistory.length
    : 1;

  const totalXp =
    progress.masteredLessonIds.length * 50 +
    progress.masteredAuthorIds.length * 80 +
    progress.grammarQuestionsSolved * 15 +
    progress.grammarBestStreak * 10 +
    progress.completedWeeklyDays.length * 40 +
    activeDaysCount * 30 +
    (extraStats?.examAttemptsCount ?? 0) * 120 +
    (extraStats?.resolvedErrorsCount ?? 0) * 25 +
    (progress.bonusXp ?? 0) +
    unlockedBadgesXp;

  let currentTier = ACADEMIC_LEVEL_THRESHOLDS[0];
  let nextTier = ACADEMIC_LEVEL_THRESHOLDS[1];

  for (let i = 0; i < ACADEMIC_LEVEL_THRESHOLDS.length; i++) {
    if (totalXp >= ACADEMIC_LEVEL_THRESHOLDS[i].minXp) {
      currentTier = ACADEMIC_LEVEL_THRESHOLDS[i];
      nextTier = ACADEMIC_LEVEL_THRESHOLDS[i + 1] ?? ACADEMIC_LEVEL_THRESHOLDS[i];
    }
  }

  const isMaxLevel = currentTier.level === ACADEMIC_LEVEL_THRESHOLDS[ACADEMIC_LEVEL_THRESHOLDS.length - 1].level;
  const xpIntoLevel = Math.max(0, totalXp - currentTier.minXp);
  const xpNeededForNext = isMaxLevel ? 1000 : Math.max(1, nextTier.minXp - currentTier.minXp);
  const progressPercent = isMaxLevel
    ? 100
    : Math.min(100, Math.round((xpIntoLevel / xpNeededForNext) * 100));

  return {
    level: currentTier.level,
    maxLevel: ACADEMIC_LEVEL_THRESHOLDS.length,
    title: currentTier.title,
    badgeColor: currentTier.badgeColor,
    totalXp,
    currentLevelMinXp: currentTier.minXp,
    nextLevelXp: isMaxLevel ? currentTier.minXp + 1000 : nextTier.minXp,
    xpIntoLevel,
    xpNeededForNext,
    progressPercent
  };
}

const DEFAULT_PROGRESS: UserStudyProgress = {
  targetExam: 'dzi_bel',
  dailyGoalMinutes: 45,
  targetGrade: 6.0,
  masteredLessonIds: ['bel-botev-poeziya', 'history-april-uprising'],
  masteredAuthorIds: ['botev', 'vazov', 'aleko'],
  grammarQuestionsSolved: 5,
  grammarBestStreak: 4,
  completedWeeklyDays: ['mon', 'tue'],
  activeDaysHistory: [getTodayDateKey()],
  currentDailyStreak: 1,
  longestDailyStreak: 1,
  bonusXp: 0
};

let cachedRawProgress: string | null | undefined = undefined;
let cachedRawLegacy: string | null | undefined = undefined;
let cachedTodayKey: string | undefined = undefined;
let cachedProgress: UserStudyProgress | null = null;

export const studyProgressService = {
  getProgress(): UserStudyProgress {
    try {
      const todayKey = getTodayDateKey();
      const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
      const legacyRaw = localStorage.getItem(LEGACY_MASTERED_LESSONS_KEY);

      if (
        cachedProgress &&
        raw === cachedRawProgress &&
        legacyRaw === cachedRawLegacy &&
        todayKey === cachedTodayKey
      ) {
        return cachedProgress;
      }

      let legacyIds: string[] = [];
      if (legacyRaw) {
        try {
          const parsedLegacy = JSON.parse(legacyRaw);
          if (Array.isArray(parsedLegacy)) {
            legacyIds = normalizeMasteredIds(parsedLegacy);
          }
        } catch {
          // ignore invalid legacy JSON
        }
      }

      if (!raw) {
        const mergedDefault = legacyIds.length > 0
          ? normalizeMasteredIds([...DEFAULT_PROGRESS.masteredLessonIds, ...legacyIds])
          : DEFAULT_PROGRESS.masteredLessonIds;
        const result: UserStudyProgress = {
          ...DEFAULT_PROGRESS,
          masteredLessonIds: mergedDefault,
          activeDaysHistory: [todayKey],
          currentDailyStreak: 1,
          longestDailyStreak: 1
        };
        cachedRawProgress = raw;
        cachedRawLegacy = legacyRaw;
        cachedTodayKey = todayKey;
        cachedProgress = result;
        return result;
      }

      const parsed = JSON.parse(raw) as Partial<UserStudyProgress>;
      const baseMastered = Array.isArray(parsed.masteredLessonIds)
        ? parsed.masteredLessonIds
        : DEFAULT_PROGRESS.masteredLessonIds;
      const mergedMastered = normalizeMasteredIds([...baseMastered, ...legacyIds]);

      const rawActiveDays = Array.isArray(parsed.activeDaysHistory)
        ? parsed.activeDaysHistory
        : [todayKey];
      const streakStats = computeDailyStreakStats(rawActiveDays, todayKey);

      const result: UserStudyProgress = {
        ...DEFAULT_PROGRESS,
        ...parsed,
        masteredLessonIds: mergedMastered,
        masteredAuthorIds: Array.isArray(parsed.masteredAuthorIds)
          ? parsed.masteredAuthorIds
          : DEFAULT_PROGRESS.masteredAuthorIds,
        completedWeeklyDays: Array.isArray(parsed.completedWeeklyDays)
          ? parsed.completedWeeklyDays
          : DEFAULT_PROGRESS.completedWeeklyDays,
        activeDaysHistory: streakStats.activeDaysHistory,
        currentDailyStreak: Math.max(streakStats.currentDailyStreak, Number(parsed.currentDailyStreak) || 1),
        longestDailyStreak: Math.max(streakStats.longestDailyStreak, Number(parsed.longestDailyStreak) || 1),
        bonusXp: Number(parsed.bonusXp) || 0
      };
      cachedRawProgress = raw;
      cachedRawLegacy = legacyRaw;
      cachedTodayKey = todayKey;
      cachedProgress = result;
      return result;
    } catch {
      return DEFAULT_PROGRESS;
    }
  },

  saveProgress(progress: UserStudyProgress, options?: { silentCloudTrigger?: boolean }): void {
    try {
      const todayKey = getTodayDateKey();
      const combinedDays = [...(progress.activeDaysHistory ?? []), todayKey];
      const streakStats = computeDailyStreakStats(combinedDays, todayKey);

      const normalized: UserStudyProgress = {
        ...progress,
        masteredLessonIds: normalizeMasteredIds(progress.masteredLessonIds),
        activeDaysHistory: streakStats.activeDaysHistory,
        currentDailyStreak: Math.max(streakStats.currentDailyStreak, Number(progress.currentDailyStreak) || 1),
        longestDailyStreak: Math.max(streakStats.longestDailyStreak, Number(progress.longestDailyStreak) || 1),
        bonusXp: Number(progress.bonusXp) || 0
      };
      const serialized = JSON.stringify(normalized);
      const serializedLegacy = JSON.stringify(normalized.masteredLessonIds);
      localStorage.setItem(PROGRESS_STORAGE_KEY, serialized);
      localStorage.setItem(LEGACY_MASTERED_LESSONS_KEY, serializedLegacy);

      cachedRawProgress = serialized;
      cachedRawLegacy = serializedLegacy;
      cachedTodayKey = todayKey;
      cachedProgress = normalized;

      if (!options?.silentCloudTrigger && typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent(LOCAL_DATA_MUTATED_EVENT, { detail: { source: 'study_progress' } })
        );
      }
    } catch {
      // ignore storage errors
    }
  },

  updateSettings(
    partial: Partial<Pick<UserStudyProgress, 'targetExam' | 'dailyGoalMinutes' | 'targetGrade'>>
  ): UserStudyProgress {
    const current = this.getProgress();
    const updated = { ...current, ...partial };
    this.saveProgress(updated);
    return updated;
  },

  isLessonMastered(lessonId: string): boolean {
    const normalizedId = LEGACY_LESSON_ID_MAP[lessonId] ?? lessonId;
    return this.getProgress().masteredLessonIds.includes(normalizedId);
  },

  markLessonMastered(lessonId: string): UserStudyProgress {
    const normalizedId = LEGACY_LESSON_ID_MAP[lessonId] ?? lessonId;
    const current = this.getProgress();
    if (current.masteredLessonIds.includes(normalizedId)) {
      return current;
    }
    const updated = {
      ...current,
      masteredLessonIds: [...current.masteredLessonIds, normalizedId]
    };
    this.saveProgress(updated);
    return updated;
  },

  toggleMasteredLesson(lessonId: string): UserStudyProgress {
    const normalizedId = LEGACY_LESSON_ID_MAP[lessonId] ?? lessonId;
    const current = this.getProgress();
    const exists = current.masteredLessonIds.includes(normalizedId);
    const masteredLessonIds = exists
      ? current.masteredLessonIds.filter(id => id !== normalizedId)
      : [...current.masteredLessonIds, normalizedId];
    const updated = { ...current, masteredLessonIds };
    this.saveProgress(updated);
    return updated;
  },

  toggleMasteredAuthor(authorId: string): UserStudyProgress {
    const current = this.getProgress();
    const exists = current.masteredAuthorIds.includes(authorId);
    const masteredAuthorIds = exists
      ? current.masteredAuthorIds.filter(id => id !== authorId)
      : [...current.masteredAuthorIds, authorId];
    const updated = { ...current, masteredAuthorIds };
    this.saveProgress(updated);
    return updated;
  },

  toggleCompletedDay(dayId: string): UserStudyProgress {
    const current = this.getProgress();
    const exists = current.completedWeeklyDays.includes(dayId);
    const completedWeeklyDays = exists
      ? current.completedWeeklyDays.filter(id => id !== dayId)
      : [...current.completedWeeklyDays, dayId];
    const updated = { ...current, completedWeeklyDays };
    this.saveProgress(updated);
    return updated;
  },

  recordGrammarAttempt(isCorrect: boolean, currentStreak: number): UserStudyProgress {
    const current = this.getProgress();
    const grammarQuestionsSolved = current.grammarQuestionsSolved + (isCorrect ? 1 : 0);
    const grammarBestStreak = Math.max(current.grammarBestStreak, currentStreak);
    const updated = {
      ...current,
      grammarQuestionsSolved,
      grammarBestStreak
    };
    this.saveProgress(updated);
    return updated;
  },

  awardBonusXp(points: number): UserStudyProgress {
    const current = this.getProgress();
    const updated = {
      ...current,
      bonusXp: (current.bonusXp ?? 0) + Math.max(0, Math.round(points))
    };
    this.saveProgress(updated);
    return updated;
  },
};
