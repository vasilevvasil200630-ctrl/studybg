export type TargetExamTrack = 'dzi_bel' | 'dzi_history' | 'nvo_10' | 'dzi_stem';

export interface UserStudyProgress {
  targetExam: TargetExamTrack;
  dailyGoalMinutes: 30 | 45 | 60 | 90;
  targetGrade: 5.0 | 5.5 | 6.0;
  masteredLessonIds: string[];
  masteredAuthorIds: string[];
  grammarQuestionsSolved: number;
  grammarBestStreak: number;
  completedWeeklyDays: string[];
}

export interface MonOfficialExamDate {
  id: TargetExamTrack;
  title: string;
  shortTitle: string;
  grade: string;
  monthDay: { month: number; day: number; hour: number; minute: number }; // 0-indexed month
  durationMinutes: number;
  maxPoints: number;
  passPoints: number;
  modulesText: string;
  officialNote: string;
}

export const MON_OFFICIAL_EXAMS: MonOfficialExamDate[] = [
  {
    id: 'dzi_bel',
    title: 'ДЗИ по Български език и литература (Задължителна матура)',
    shortTitle: 'ДЗИ БЕЛ (12. клас)',
    grade: '12. клас',
    monthDay: { month: 4, day: 20, hour: 8, minute: 30 }, // 20 май, 08:30
    durationMinutes: 240,
    maxPoints: 100,
    passPoints: 30,
    modulesText: 'Модул 1 (60 мин) + Модул 2 (60 мин) + Модул 3: Есе/ЛИС (120 мин)',
    officialNote: 'Задължителен държавен зрелостен изпит за всички ученици в 12. клас по програмата за 11.–12. клас.'
  },
  {
    id: 'dzi_history',
    title: 'Втори задължителен ДЗИ по профилиращ предмет (История / Профил)',
    shortTitle: 'Втора матура (12. клас)',
    grade: '12. клас',
    monthDay: { month: 4, day: 22, hour: 8, minute: 30 }, // 22 май, 08:30
    durationMinutes: 240,
    maxPoints: 100,
    passPoints: 30,
    modulesText: 'Три модула: Тест (затворени въпроси) + Извори и карта + Историческо есе/теза',
    officialNote: 'Втори задължителен държавен зрелостен изпит по избран профилиращ предмет от 11.–12. клас.'
  },
  {
    id: 'nvo_10',
    title: 'Национално външно оценяване (НВО) по БЕЛ и Математика',
    shortTitle: 'НВО 10. клас',
    grade: '10. клас',
    monthDay: { month: 5, day: 12, hour: 8, minute: 0 }, // 12 юни, 08:00
    durationMinutes: 90,
    maxPoints: 100,
    passPoints: 30,
    modulesText: 'Единен изпитен модул (90 мин): Езикови задачи, четене с разбиране и създаване на резюме/текст',
    officialNote: 'Задължителен изпит в края на първия гимназиален етап (8.–10. клас) за удостоверение по МОН.'
  },
  {
    id: 'dzi_stem',
    title: 'Профилиран ДЗИ по Математика, Биология, Химия или Физика',
    shortTitle: 'ДЗИ STEM & Природни науки',
    grade: '12. клас',
    monthDay: { month: 4, day: 22, hour: 8, minute: 30 }, // 22 май, 08:30
    durationMinutes: 240,
    maxPoints: 100,
    passPoints: 30,
    modulesText: 'Тестови модул + Задачи със свободен отговор + Пълно разписване на доказателства/процеси',
    officialNote: 'Изпит с висок коефициент (x3 / x4) за кандидатстване в МУ, СУ, ТУ и водещите университети.'
  }
];

const PROGRESS_STORAGE_KEY = 'studybg_user_progress_v1';

const DEFAULT_PROGRESS: UserStudyProgress = {
  targetExam: 'dzi_bel',
  dailyGoalMinutes: 45,
  targetGrade: 6.0,
  masteredLessonIds: ['bel-11-botev-pat', 'hist-10-12-aprilsko-1876'],
  masteredAuthorIds: ['botev', 'vazov', 'aleko'],
  grammarQuestionsSolved: 5,
  grammarBestStreak: 4,
  completedWeeklyDays: ['mon', 'tue']
};

export const studyProgressService = {
  getProgress(): UserStudyProgress {
    try {
      const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!raw) return DEFAULT_PROGRESS;
      const parsed = JSON.parse(raw) as Partial<UserStudyProgress>;
      return {
        ...DEFAULT_PROGRESS,
        ...parsed,
        masteredLessonIds: Array.isArray(parsed.masteredLessonIds)
          ? parsed.masteredLessonIds
          : DEFAULT_PROGRESS.masteredLessonIds,
        masteredAuthorIds: Array.isArray(parsed.masteredAuthorIds)
          ? parsed.masteredAuthorIds
          : DEFAULT_PROGRESS.masteredAuthorIds,
        completedWeeklyDays: Array.isArray(parsed.completedWeeklyDays)
          ? parsed.completedWeeklyDays
          : DEFAULT_PROGRESS.completedWeeklyDays
      };
    } catch {
      return DEFAULT_PROGRESS;
    }
  },

  saveProgress(progress: UserStudyProgress): void {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
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

  toggleMasteredLesson(lessonId: string): UserStudyProgress {
    const current = this.getProgress();
    const exists = current.masteredLessonIds.includes(lessonId);
    const masteredLessonIds = exists
      ? current.masteredLessonIds.filter(id => id !== lessonId)
      : [...current.masteredLessonIds, lessonId];
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

  getNextExamTimestamp(exam: MonOfficialExamDate): Date {
    const now = new Date();
    const currentYear = now.getFullYear();
    const candidate = new Date(
      currentYear,
      exam.monthDay.month,
      exam.monthDay.day,
      exam.monthDay.hour,
      exam.monthDay.minute,
      0
    );
    if (candidate.getTime() <= now.getTime()) {
      return new Date(
        currentYear + 1,
        exam.monthDay.month,
        exam.monthDay.day,
        exam.monthDay.hour,
        exam.monthDay.minute,
        0
      );
    }
    return candidate;
  }
};
