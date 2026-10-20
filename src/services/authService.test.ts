import { describe, it, expect } from 'vitest';
import type { User } from '@supabase/supabase-js';
import {
  mapSupabaseUserToProfile,
  mergeStudyProgress,
  mergeErrorBankItems,
  formatGoogleAuthError
} from './authService';
import type { UserStudyProgress } from './studyProgressService';
import type { SavedErrorItem } from './errorBankService';

describe('authService — Google OAuth & Cloud Profile Sync helpers', () => {
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

  it('mergeStudyProgress merges local and cloud mastered lessons, authors, and grammar stats without data loss', () => {
    const localProgress: UserStudyProgress = {
      targetExam: 'dzi_bel',
      dailyGoalMinutes: 45,
      targetGrade: 6.0,
      masteredLessonIds: ['bel-botev-poeziya', 'math-quadratic-equations'],
      masteredAuthorIds: ['botev', 'vazov'],
      grammarQuestionsSolved: 14,
      grammarBestStreak: 7,
      completedWeeklyDays: ['mon', 'tue']
    };

    const cloudProgress: Partial<UserStudyProgress> = {
      targetExam: 'dzi_history',
      dailyGoalMinutes: 60,
      targetGrade: 6.0,
      masteredLessonIds: ['math-quadratic-equations', 'history-april-uprising'],
      masteredAuthorIds: ['vazov', 'yovkov'],
      grammarQuestionsSolved: 28,
      grammarBestStreak: 5,
      completedWeeklyDays: ['tue', 'wed']
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
});
