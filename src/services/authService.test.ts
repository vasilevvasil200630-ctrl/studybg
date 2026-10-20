import { describe, it, expect } from 'vitest';
import type { User } from '@supabase/supabase-js';
import {
  mapSupabaseUserToProfile,
  mergeStudyProgress,
  mergeErrorBankItems,
  mergeExamHistoryRecords,
  formatGoogleAuthError
} from './authService';
import {
  computeDailyStreakStats,
  computeUserXpAndLevel,
  evaluateUserAchievements,
  type UserStudyProgress
} from './studyProgressService';
import type { SavedErrorItem } from './errorBankService';

describe('authService — Google OAuth, Real-Time Sync, Streaks, XP & Achievements', () => {
  it('mapSupabaseUserToProfile extracts Google OAuth metadata (full_name, avatar_url, email)', () => {
    const mockGoogleUser = {
      id: 'user-google-123',
      email: 'ivan.petrov@gmail.com',
      is_anonymous: false,
      app_metadata: {
        provider: 'google',
        providers: ['google']
      },
      user_metadata: {
        full_name: 'Иван Петров',
        avatar_url: 'https://lh3.googleusercontent.com/a/mock-avatar'
      },
      identities: [{ provider: 'google' }]
    } as unknown as User;

    const profile = mapSupabaseUserToProfile(mockGoogleUser);
    expect(profile).not.toBeNull();
    expect(profile?.id).toBe('user-google-123');
    expect(profile?.email).toBe('ivan.petrov@gmail.com');
    expect(profile?.fullName).toBe('Иван Петров');
    expect(profile?.avatarUrl).toBe('https://lh3.googleusercontent.com/a/mock-avatar');
    expect(profile?.isAnonymous).toBe(false);
    expect(profile?.provider).toBe('google');
  });

  it('mapSupabaseUserToProfile falls back to OIDC picture/name and detects anonymous sessions', () => {
    const mockAnonUser = {
      id: 'user-anon-456',
      is_anonymous: true,
      app_metadata: {},
      user_metadata: {}
    } as unknown as User;

    const anonProfile = mapSupabaseUserToProfile(mockAnonUser);
    expect(anonProfile?.isAnonymous).toBe(true);
    expect(anonProfile?.provider).toBe('anonymous');
    expect(anonProfile?.fullName).toBe('Анонимен ученик');
    expect(mapSupabaseUserToProfile(null)).toBeNull();
  });

  it('mergeStudyProgress merges mastered lessons, authors, grammar stats, and activeDaysHistory across devices', () => {
    const localProgress: UserStudyProgress = {
      targetExam: 'dzi_bel',
      dailyGoalMinutes: 45,
      targetGrade: 6.0,
      masteredLessonIds: ['bel-botev-poeziya', 'math-quadratic-equations'],
      masteredAuthorIds: ['botev', 'vazov'],
      grammarQuestionsSolved: 14,
      grammarBestStreak: 7,
      completedWeeklyDays: ['mon', 'tue'],
      activeDaysHistory: ['2026-10-18', '2026-10-19']
    };

    const cloudProgress: Partial<UserStudyProgress> = {
      targetExam: 'dzi_history',
      dailyGoalMinutes: 60,
      targetGrade: 6.0,
      masteredLessonIds: ['math-quadratic-equations', 'history-april-uprising'],
      masteredAuthorIds: ['vazov', 'yovkov'],
      grammarQuestionsSolved: 28,
      grammarBestStreak: 5,
      completedWeeklyDays: ['tue', 'wed'],
      activeDaysHistory: ['2026-10-19', '2026-10-20']
    };

    const merged = mergeStudyProgress(localProgress, cloudProgress);
    expect(merged.masteredLessonIds).toEqual([
      'bel-botev-poeziya',
      'math-quadratic-equations',
      'history-april-uprising'
    ]);
    expect(merged.masteredAuthorIds).toEqual(['botev', 'vazov', 'yovkov']);
    expect(merged.completedWeeklyDays).toEqual(['mon', 'tue', 'wed']);
    expect(merged.grammarQuestionsSolved).toBe(28);
    expect(merged.grammarBestStreak).toBe(7);
    expect(merged.activeDaysHistory).toEqual(['2026-10-18', '2026-10-19', '2026-10-20']);
    expect(merged.longestDailyStreak).toBeGreaterThanOrEqual(3);
  });

  it('computeDailyStreakStats calculates current and longest consecutive study streaks accurately', () => {
    const stats = computeDailyStreakStats(
      ['2026-10-10', '2026-10-11', '2026-10-12', '2026-10-13', '2026-10-19', '2026-10-20'],
      '2026-10-20'
    );
    expect(stats.currentDailyStreak).toBe(2);
    expect(stats.longestDailyStreak).toBe(4);
  });

  it('computeUserXpAndLevel and evaluateUserAchievements calculate XP, academic levels, and 12 badges', () => {
    const progress: UserStudyProgress = {
      targetExam: 'dzi_bel',
      dailyGoalMinutes: 60,
      targetGrade: 6.0,
      masteredLessonIds: Array.from({ length: 20 }, (_, i) => `lesson-${i}`),
      masteredAuthorIds: ['botev', 'vazov', 'aleko', 'elin-pelin', 'yovkov'],
      grammarQuestionsSolved: 60,
      grammarBestStreak: 12,
      completedWeeklyDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      activeDaysHistory: ['2026-10-18', '2026-10-19', '2026-10-20'],
      currentDailyStreak: 3,
      longestDailyStreak: 3
    };

    const badges = evaluateUserAchievements(progress, {
      examAttemptsCount: 2,
      highestExamScore: 92,
      resolvedErrorsCount: 5
    });
    expect(badges.length).toBe(12);
    const unlockedIds = badges.filter((b) => b.unlocked).map((b) => b.id);
    expect(unlockedIds).toContain('first-steps');
    expect(unlockedIds).toContain('curriculum-explorer');
    expect(unlockedIds).toContain('canon-initiate');
    expect(unlockedIds).toContain('grammar-sniper');
    expect(unlockedIds).toContain('grammar-norm-guardian');
    expect(unlockedIds).toContain('streak-3');
    expect(unlockedIds).toContain('weekly-planner-pro');
    expect(unlockedIds).toContain('exam-gladiator');
    expect(unlockedIds).toContain('exam-excellence-6');

    const levelInfo = computeUserXpAndLevel(progress, {
      examAttemptsCount: 2,
      highestExamScore: 92,
      resolvedErrorsCount: 5
    });
    expect(levelInfo.totalXp).toBeGreaterThan(3800);
    expect(levelInfo.level).toBeGreaterThanOrEqual(7);
  });

  it('mergeErrorBankItems combines items by id and preserves resolved=true across devices', () => {
    const baseItem: SavedErrorItem = {
      id: 'quiz-q1-bel',
      type: 'quiz_question',
      lessonId: 'bel-botev-poeziya',
      lessonTitle: 'Христо Ботев — Поезия',
      subject: 'БЕЛ',
      grade: '11. клас',
      questionOrRequirement: 'Кой жанр е „Моята молитва“?',
      correctAnswerOrNote: 'Елегия / сатира',
      explanationOrReason: 'Според канона на МОН.',
      addedAt: '20.10.2026 г.',
      resolved: false
    };

    const localErrors: SavedErrorItem[] = [
      baseItem,
      { ...baseItem, id: 'quiz-q2-local-only', resolved: false }
    ];

    const cloudErrors: SavedErrorItem[] = [
      { ...baseItem, id: 'quiz-q1-bel', resolved: true },
      { ...baseItem, id: 'quiz-q3-cloud-only', resolved: false }
    ];

    const merged = mergeErrorBankItems(localErrors, cloudErrors);
    expect(merged.length).toBe(3);
    const q1 = merged.find((item) => item.id === 'quiz-q1-bel');
    expect(q1?.resolved).toBe(true);
  });

  it('formatGoogleAuthError returns clear Bulgarian guidance when Google provider is disabled in Supabase', () => {
    const msg = formatGoogleAuthError('Unsupported provider: provider is not enabled');
    expect(msg).toContain('Supabase Dashboard');
    expect(msg).toContain('Google');
  });

  it('mergeExamHistoryRecords deduplicates exam attempts by id and sorts newest first', () => {
    const merged = mergeExamHistoryRecords(
      [
        {
          id: 'exam-1',
          timestamp: '2026-10-18T10:00:00.000Z',
          formattedDate: '18.10.2026',
          lessonId: 'l1',
          lessonTitle: 'Урок 1',
          subject: 'БЕЛ',
          grade: '12. клас',
          examPreset: 'dzi12-bel',
          durationMinutes: 240,
          timeSpentSeconds: 3600,
          module1Points: 28,
          module2Points: 25,
          module3Points: 27,
          totalPoints: 80,
          gradeEquivalent: 'Отличен 5.50',
          gradeNumeric: 5.5,
          passed: true
        }
      ],
      [
        {
          id: 'exam-2',
          timestamp: '2026-10-20T12:00:00.000Z',
          formattedDate: '20.10.2026',
          lessonId: 'l2',
          lessonTitle: 'Урок 2',
          subject: 'Математика',
          grade: '12. клас',
          examPreset: 'dzi12-math',
          durationMinutes: 240,
          timeSpentSeconds: 4200,
          module1Points: 30,
          module2Points: 30,
          module3Points: 32,
          totalPoints: 92,
          gradeEquivalent: 'Отличен 5.90',
          gradeNumeric: 5.9,
          passed: true
        }
      ]
    );
    expect(merged.map((a) => a.id)).toEqual(['exam-2', 'exam-1']);
  });
});
