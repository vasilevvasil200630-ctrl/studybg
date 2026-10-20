import type { User } from '@supabase/supabase-js';
import { isSupabaseConfigured } from './supabaseConfig';
import {
  studyProgressService,
  computeDailyStreakStats,
  computeUserXpAndLevel,
  evaluateUserAchievements,
  LOCAL_DATA_MUTATED_EVENT,
  type UserStudyProgress,
  type TargetExamTrack
} from './studyProgressService';
import { errorBankService, type SavedErrorItem } from './errorBankService';
import { examHistoryService, type ExamAttemptRecord } from './examHistoryService';
import { mailingService } from './mailingService';

export interface GoogleUserProfile {
  id: string;
  email: string | null;
  fullName: string;
  avatarUrl: string | null;
  isAnonymous: boolean;
  provider: 'google' | 'anonymous' | 'other';
}

export type CloudSyncLiveStatus = 'idle' | 'syncing' | 'synced' | 'error';

export interface CloudProfileSyncResult {
  success: boolean;
  profileSynced: boolean;
  masteredLessonsCount: number;
  masteredAuthorsCount: number;
  errorBankCount: number;
  examDownloadedCount: number;
  examUploadedCount: number;
  syncedAt: string;
  error?: string;
}

const CACHED_PROFILE_KEY = 'studybg_cached_google_profile_v1';
const LAST_SYNC_AT_KEY = 'studybg_last_cloud_sync_v1';
export const AUTH_SYNC_EVENT = 'studybg:auth-or-progress-updated';

type AuthProfileListener = (profile: GoogleUserProfile | null) => void;
const listeners = new Set<AuthProfileListener>();
let authSubscriptionInitialized = false;
let autoSyncListenerAttached = false;
let autoSyncTimer: ReturnType<typeof setTimeout> | null = null;
let currentSyncStatus: CloudSyncLiveStatus = 'idle';

function notifyListeners(profile: GoogleUserProfile | null): void {
  for (const listener of listeners) {
    try {
      listener(profile);
    } catch {
      // ignore listener errors
    }
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(AUTH_SYNC_EVENT, {
        detail: { profile, syncStatus: currentSyncStatus }
      })
    );
  }
}

export function getCloudSyncLiveStatus(): CloudSyncLiveStatus {
  return currentSyncStatus;
}

export function getCachedGoogleProfile(): GoogleUserProfile | null {
  try {
    const raw = localStorage.getItem(CACHED_PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GoogleUserProfile>;
    if (!parsed || typeof parsed.id !== 'string' || !parsed.id.trim()) return null;
    return {
      id: parsed.id,
      email: typeof parsed.email === 'string' ? parsed.email : null,
      fullName:
        typeof parsed.fullName === 'string' && parsed.fullName.trim()
          ? parsed.fullName
          : 'Ученик в StudyBG',
      avatarUrl: typeof parsed.avatarUrl === 'string' ? parsed.avatarUrl : null,
      isAnonymous: Boolean(parsed.isAnonymous),
      provider:
        parsed.provider === 'google' || parsed.provider === 'anonymous'
          ? parsed.provider
          : 'other'
    };
  } catch {
    return null;
  }
}

function setCachedGoogleProfile(profile: GoogleUserProfile | null): void {
  try {
    if (!profile || profile.isAnonymous) {
      localStorage.removeItem(CACHED_PROFILE_KEY);
      return;
    }
    localStorage.setItem(CACHED_PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // ignore storage errors
  }
}

export function getLastCloudSyncTimestamp(): string | null {
  try {
    return localStorage.getItem(LAST_SYNC_AT_KEY);
  } catch {
    return null;
  }
}

function setLastCloudSyncTimestamp(iso: string): void {
  try {
    localStorage.setItem(LAST_SYNC_AT_KEY, iso);
  } catch {
    // ignore storage errors
  }
}

/**
 * Проверява дали в URL адреса има върната грешка от OAuth редирект (?error_description=... или #error_description=...).
 */
export function hasOAuthCallbackErrorInUrl(): boolean {
  if (typeof window === 'undefined') return false;
  const search = window.location.search || '';
  const hash = window.location.hash || '';
  return (
    search.includes('error_description=') ||
    search.includes('error_code=') ||
    hash.includes('error_description=') ||
    hash.includes('error_code=')
  );
}

/**
 * Извлича и изчиства от адресната лента евентуална OAuth грешка при връщане от Google / Supabase.
 */
export function consumeOAuthUrlError(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const hashRaw = window.location.hash.startsWith('#')
      ? window.location.hash.slice(1)
      : window.location.hash;
    const hashParams = new URLSearchParams(hashRaw);

    const rawDesc =
      searchParams.get('error_description') ||
      hashParams.get('error_description') ||
      searchParams.get('error') ||
      hashParams.get('error');

    if (!rawDesc) return null;

    const cleanPath = window.location.pathname || '/';
    window.history.replaceState(null, '', cleanPath);
    return formatGoogleAuthError(rawDesc.replace(/\+/g, ' '));
  } catch {
    return null;
  }
}

function cleanOAuthSuccessParamsFromUrl(): void {
  if (typeof window === 'undefined') return;
  try {
    const search = window.location.search || '';
    const hash = window.location.hash || '';
    if (
      search.includes('code=') ||
      hash.includes('access_token=') ||
      hash.includes('refresh_token=')
    ) {
      window.history.replaceState(null, '', window.location.pathname || '/');
    }
  } catch {
    // ignore
  }
}

function ensureAutoSyncWindowListener(): void {
  if (autoSyncListenerAttached || typeof window === 'undefined') return;
  autoSyncListenerAttached = true;

  window.addEventListener(LOCAL_DATA_MUTATED_EVENT, () => {
    const cached = getCachedGoogleProfile();
    if (!cached || cached.isAnonymous) return;

    if (autoSyncTimer) {
      clearTimeout(autoSyncTimer);
    }
    autoSyncTimer = setTimeout(() => {
      autoSyncTimer = null;
      void authService.syncUserProfileAndProgressWithCloud();
    }, 1200);
  });
}

/**
 * Проверява дали има активен Supabase токен в localStorage или OAuth редирект параметри в URL-а,
 * за да не зареждаме 214 kB @supabase/supabase-js при първо отваряне от анонимен посетител.
 */
export function hasPotentialAuthSession(): boolean {
  if (!isSupabaseConfigured()) return false;
  try {
    if (getCachedGoogleProfile()) return true;
    if (typeof window !== 'undefined') {
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      if (
        search.includes('code=') ||
        search.includes('error_description=') ||
        hash.includes('access_token=') ||
        hash.includes('refresh_token=')
      ) {
        return true;
      }
    }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
        return true;
      }
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Извлича профил от обект User на Supabase (вкл. Google метаданни: full_name, name, avatar_url, picture).
 */
export function mapSupabaseUserToProfile(user: User | null | undefined): GoogleUserProfile | null {
  if (!user || !user.id) return null;

  const isAnonymous = Boolean(user.is_anonymous);
  const appMeta = (user.app_metadata ?? {}) as Record<string, unknown>;
  const userMeta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const providersList = Array.isArray(appMeta.providers) ? appMeta.providers : [];
  const identitiesList = Array.isArray(user.identities) ? user.identities : [];

  const hasGoogleIdentity =
    appMeta.provider === 'google' ||
    providersList.includes('google') ||
    identitiesList.some((identity) => identity?.provider === 'google');

  const email =
    typeof user.email === 'string' && user.email.trim()
      ? user.email.trim()
      : typeof userMeta.email === 'string' && userMeta.email.trim()
      ? userMeta.email.trim()
      : null;

  const fullName =
    typeof userMeta.full_name === 'string' && userMeta.full_name.trim()
      ? userMeta.full_name.trim()
      : typeof userMeta.name === 'string' && userMeta.name.trim()
      ? userMeta.name.trim()
      : email
      ? email.split('@')[0]
      : isAnonymous
      ? 'Анонимен ученик'
      : 'Ученик в StudyBG';

  const avatarUrl =
    typeof userMeta.avatar_url === 'string' && userMeta.avatar_url.trim()
      ? userMeta.avatar_url.trim()
      : typeof userMeta.picture === 'string' && userMeta.picture.trim()
      ? userMeta.picture.trim()
      : null;

  const provider: GoogleUserProfile['provider'] =
    hasGoogleIdentity && !isAnonymous ? 'google' : isAnonymous ? 'anonymous' : 'other';

  return {
    id: user.id,
    email,
    fullName,
    avatarUrl,
    isAnonymous,
    provider
  };
}

const VALID_TRACKS: ReadonlySet<TargetExamTrack> = new Set([
  'dzi_bel',
  'dzi_history',
  'nvo_10',
  'dzi_stem'
]);
const VALID_GOALS: ReadonlySet<30 | 45 | 60 | 90> = new Set([30, 45, 60, 90]);
const VALID_GRADES: ReadonlySet<5.0 | 5.5 | 6.0> = new Set([5.0, 5.5, 6.0]);

function uniqueStrings(a: unknown, b: unknown): string[] {
  const out = new Set<string>();
  if (Array.isArray(a)) {
    for (const item of a) {
      if (typeof item === 'string' && item.trim()) out.add(item.trim());
    }
  }
  if (Array.isArray(b)) {
    for (const item of b) {
      if (typeof item === 'string' && item.trim()) out.add(item.trim());
    }
  }
  return Array.from(out);
}

/**
 * Слива локалния и облачния учебен прогрес без загуба на усвоени теми, автори, решени задачи или дневен Streak.
 */
export function mergeStudyProgress(
  local: UserStudyProgress,
  cloud: Partial<UserStudyProgress> | null | undefined
): UserStudyProgress {
  if (!cloud || typeof cloud !== 'object') {
    return local;
  }

  const targetExam =
    typeof cloud.targetExam === 'string' && VALID_TRACKS.has(cloud.targetExam as TargetExamTrack)
      ? (cloud.targetExam as TargetExamTrack)
      : local.targetExam;

  const dailyGoalMinutes =
    typeof cloud.dailyGoalMinutes === 'number' &&
    VALID_GOALS.has(cloud.dailyGoalMinutes as 30 | 45 | 60 | 90)
      ? (cloud.dailyGoalMinutes as 30 | 45 | 60 | 90)
      : local.dailyGoalMinutes;

  const targetGrade =
    typeof cloud.targetGrade === 'number' && VALID_GRADES.has(cloud.targetGrade as 5.0 | 5.5 | 6.0)
      ? (cloud.targetGrade as 5.0 | 5.5 | 6.0)
      : local.targetGrade;

  const mergedActiveDays = uniqueStrings(local.activeDaysHistory, cloud.activeDaysHistory);
  const streakStats = computeDailyStreakStats(mergedActiveDays);

  return {
    targetExam: local.targetExam || targetExam,
    dailyGoalMinutes: local.dailyGoalMinutes || dailyGoalMinutes,
    targetGrade: local.targetGrade || targetGrade,
    masteredLessonIds: uniqueStrings(local.masteredLessonIds, cloud.masteredLessonIds),
    masteredAuthorIds: uniqueStrings(local.masteredAuthorIds, cloud.masteredAuthorIds),
    completedWeeklyDays: uniqueStrings(local.completedWeeklyDays, cloud.completedWeeklyDays),
    grammarQuestionsSolved: Math.max(
      Number(local.grammarQuestionsSolved) || 0,
      Number(cloud.grammarQuestionsSolved) || 0
    ),
    grammarBestStreak: Math.max(
      Number(local.grammarBestStreak) || 0,
      Number(cloud.grammarBestStreak) || 0
    ),
    activeDaysHistory: streakStats.activeDaysHistory,
    currentDailyStreak: Math.max(
      streakStats.currentDailyStreak,
      Number(local.currentDailyStreak) || 1,
      Number(cloud.currentDailyStreak) || 1
    ),
    longestDailyStreak: Math.max(
      streakStats.longestDailyStreak,
      Number(local.longestDailyStreak) || 1,
      Number(cloud.longestDailyStreak) || 1
    ),
    bonusXp: Math.max(Number(local.bonusXp) || 0, Number(cloud.bonusXp) || 0)
  };
}

/**
 * Слива локалната и облачната Банка с грешки по id (ако грешка е маркирана като решена на едно от устройствата, остава решена).
 */
export function mergeErrorBankItems(
  local: SavedErrorItem[],
  cloud: SavedErrorItem[] | null | undefined
): SavedErrorItem[] {
  if (!Array.isArray(cloud) || cloud.length === 0) {
    return local;
  }

  const byId = new Map<string, SavedErrorItem>();
  for (const item of cloud) {
    if (item && typeof item.id === 'string' && item.id.trim()) {
      byId.set(item.id, item);
    }
  }

  for (const localItem of local) {
    if (!localItem || typeof localItem.id !== 'string' || !localItem.id.trim()) continue;
    const existingCloud = byId.get(localItem.id);
    if (!existingCloud) {
      byId.set(localItem.id, localItem);
    } else {
      byId.set(localItem.id, {
        ...existingCloud,
        ...localItem,
        resolved: Boolean(localItem.resolved || existingCloud.resolved)
      });
    }
  }

  return Array.from(byId.values()).slice(0, 200);
}

/**
 * Слива локалните и облачните опити от 100-точковия Изпитен симулатор по id.
 */
export function mergeExamHistoryRecords(
  local: ExamAttemptRecord[],
  cloud: ExamAttemptRecord[] | null | undefined
): ExamAttemptRecord[] {
  if (!Array.isArray(cloud) || cloud.length === 0) {
    return local;
  }

  const byId = new Map<string, ExamAttemptRecord>();
  for (const item of cloud) {
    if (item && typeof item.id === 'string' && item.id.trim()) {
      byId.set(item.id, item);
    }
  }
  for (const localItem of local) {
    if (localItem && typeof localItem.id === 'string' && localItem.id.trim()) {
      byId.set(localItem.id, localItem);
    }
  }

  return Array.from(byId.values())
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 200);
}

export function formatGoogleAuthError(rawMessage: string): string {
  const lower = rawMessage.toLowerCase();
  if (lower.includes('provider is not enabled') || lower.includes('unsupported provider')) {
    return 'Входът с Google все още не е активиран в Supabase Dashboard (Authentication → Providers → Google → Enable).';
  }
  if (lower.includes('redirect_uri') || lower.includes('redirect url')) {
    return 'Адресът за пренасочване (Redirect URL) не е добавен в настройките на Supabase Auth / Google Cloud Console.';
  }
  if (lower.includes('invalid_client') || lower.includes('unauthorized_client')) {
    return 'Невалиден Google Client ID или Client Secret в Supabase Dashboard → Authentication → Providers → Google.';
  }
  return `Грешка при вход с Google: ${rawMessage}`;
}

export const authService = {
  /**
   * Връща текущия потребителски профил от активната сесия (или null).
   */
  async getCurrentUserProfile(): Promise<GoogleUserProfile | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const { getExistingSupabaseSession } = await import('./supabaseClient');
      const session = await getExistingSupabaseSession();
      const profile = mapSupabaseUserToProfile(session?.user);
      setCachedGoogleProfile(profile);
      return profile;
    } catch {
      return getCachedGoogleProfile();
    }
  },

  /**
   * Стартира OAuth 2.0 вход с Google акаунт.
   * При завръщане на потребителя syncUserProfileAndProgressWithCloud() автоматично слива
   * целия му досегашен локален прогрес, Банка с грешки и решени матури към Google профила.
   */
  async signInWithGoogle(redirectPath?: string): Promise<{
    ok: boolean;
    mode?: 'oauth';
    url?: string | null;
    error?: string;
  }> {
    if (!isSupabaseConfigured()) {
      return {
        ok: false,
        error: 'Supabase не е конфигуриран (липсват VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).'
      };
    }

    try {
      const { supabase } = await import('./supabaseClient');
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}${redirectPath ?? window.location.pathname}`
          : undefined;

      const oauthRes = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account'
          }
        }
      });

      if (oauthRes.error) {
        return {
          ok: false,
          error: formatGoogleAuthError(oauthRes.error.message)
        };
      }

      return {
        ok: true,
        mode: 'oauth',
        url: oauthRes.data?.url ?? null
      };
    } catch (err: unknown) {
      return {
        ok: false,
        error: formatGoogleAuthError(err instanceof Error ? err.message : String(err))
      };
    }
  },

  /**
   * Изход от Google профила (локалното копие на прогреса и грешките на устройството се запазва).
   */
  async signOut(): Promise<{ ok: boolean; error?: string }> {
    setCachedGoogleProfile(null);
    currentSyncStatus = 'idle';
    if (!isSupabaseConfigured()) {
      notifyListeners(null);
      return { ok: true };
    }

    try {
      const { supabase } = await import('./supabaseClient');
      const { error } = await supabase.auth.signOut();
      notifyListeners(null);
      if (error) {
        return { ok: false, error: error.message };
      }
      return { ok: true };
    } catch (err: unknown) {
      notifyListeners(null);
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  },

  /**
   * Двупосочна синхронизация на:
   * 1) Учебен прогрес (План за 6.00 — усвоени теми, автори, седмичен график, граматика, Дневен Streak и XP)
   * 2) Интерактивна банка с грешки
   * 3) История от 100-точковия Изпитен симулатор (както в user_profiles.exam_history, така и в exam_attempts)
   */
  async syncUserProfileAndProgressWithCloud(): Promise<CloudProfileSyncResult> {
    const nowIso = new Date().toISOString();
    const localProgress = studyProgressService.getProgress();
    const localErrors = errorBankService.getAllErrors();
    const localExams = examHistoryService.getAllAttempts();

    if (!isSupabaseConfigured()) {
      return {
        success: false,
        profileSynced: false,
        masteredLessonsCount: localProgress.masteredLessonIds.length,
        masteredAuthorsCount: localProgress.masteredAuthorIds.length,
        errorBankCount: localErrors.length,
        examDownloadedCount: 0,
        examUploadedCount: 0,
        syncedAt: nowIso,
        error: 'Облачната синхронизация не е конфигурирана.'
      };
    }

    try {
      currentSyncStatus = 'syncing';
      notifyListeners(getCachedGoogleProfile());

      const { supabase, getExistingSupabaseSession } = await import('./supabaseClient');
      const session = await getExistingSupabaseSession();
      const profile = mapSupabaseUserToProfile(session?.user);

      if (!session || !profile) {
        currentSyncStatus = 'idle';
        notifyListeners(null);
        return {
          success: false,
          profileSynced: false,
          masteredLessonsCount: localProgress.masteredLessonIds.length,
          masteredAuthorsCount: localProgress.masteredAuthorIds.length,
          errorBankCount: localErrors.length,
          examDownloadedCount: 0,
          examUploadedCount: 0,
          syncedAt: nowIso,
          error: 'Няма активна потребителска сесия. Влезте с Google акаунт.'
        };
      }

      setCachedGoogleProfile(profile);

      let mergedProgress = localProgress;
      let mergedErrors = localErrors;
      let mergedExams = localExams;
      let profileSynced = false;
      let profileSyncWarning: string | undefined;

      const { data: cloudRow, error: selectError } = await supabase
        .from('user_profiles')
        .select('study_progress, error_bank, exam_history, updated_at')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!selectError && cloudRow) {
        mergedProgress = mergeStudyProgress(
          localProgress,
          cloudRow.study_progress as Partial<UserStudyProgress> | null
        );
        mergedErrors = mergeErrorBankItems(
          localErrors,
          cloudRow.error_bank as SavedErrorItem[] | null
        );
        mergedExams = mergeExamHistoryRecords(
          localExams,
          cloudRow.exam_history as ExamAttemptRecord[] | null
        );
        studyProgressService.saveProgress(mergedProgress, { silentCloudTrigger: true });
        errorBankService.saveErrors(mergedErrors, { silentCloudTrigger: true });
        if (mergedExams.length !== localExams.length) {
          examHistoryService.saveAttempts(mergedExams, { silentCloudTrigger: true });
        }
      } else if (selectError && selectError.code !== '42P01') {
        profileSyncWarning = selectError.message;
      }

      const { error: upsertError } = await supabase.from('user_profiles').upsert(
        {
          user_id: session.user.id,
          email: profile.email,
          full_name: profile.fullName,
          avatar_url: profile.avatarUrl,
          auth_provider: profile.provider,
          study_progress: mergedProgress,
          error_bank: mergedErrors.slice(0, 200),
          exam_history: mergedExams.slice(0, 200),
          updated_at: nowIso
        },
        { onConflict: 'user_id' }
      );

      if (!upsertError) {
        profileSynced = true;
      } else if (upsertError.code !== '42P01') {
        profileSyncWarning = upsertError.message;
      }

      const examSync = await examHistoryService.syncWithCloud();
      setLastCloudSyncTimestamp(nowIso);
      currentSyncStatus = profileSyncWarning ? 'error' : 'synced';
      notifyListeners(profile);

      return {
        success: true,
        profileSynced,
        masteredLessonsCount: mergedProgress.masteredLessonIds.length,
        masteredAuthorsCount: mergedProgress.masteredAuthorIds.length,
        errorBankCount: mergedErrors.length,
        examDownloadedCount:
          examSync.downloaded + Math.max(0, mergedExams.length - localExams.length),
        examUploadedCount: examSync.uploaded,
        syncedAt: nowIso,
        error: profileSyncWarning ?? examSync.error
      };
    } catch (err: unknown) {
      currentSyncStatus = 'error';
      notifyListeners(getCachedGoogleProfile());
      return {
        success: false,
        profileSynced: false,
        masteredLessonsCount: localProgress.masteredLessonIds.length,
        masteredAuthorsCount: localProgress.masteredAuthorIds.length,
        errorBankCount: localErrors.length,
        examDownloadedCount: 0,
        examUploadedCount: 0,
        syncedAt: nowIso,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  },

  /**
   * Абонира компонент за промени в Google профила и активира автоматичния слушател за облачна синхронизация.
   */
  subscribeToAuthChanges(
    listener: AuthProfileListener,
    options?: { forceInit?: boolean }
  ): () => void {
    listeners.add(listener);
    ensureAutoSyncWindowListener();

    if (options?.forceInit || hasPotentialAuthSession()) {
      void this.ensureAuthListenerInitialized();
    }

    return () => {
      listeners.delete(listener);
    };
  },

  async ensureAuthListenerInitialized(): Promise<GoogleUserProfile | null> {
    if (!isSupabaseConfigured()) return null;
    ensureAutoSyncWindowListener();

    try {
      const { supabase, getExistingSupabaseSession } = await import('./supabaseClient');

      if (!authSubscriptionInitialized) {
        authSubscriptionInitialized = true;
        supabase.auth.onAuthStateChange((event, session) => {
          const profile = mapSupabaseUserToProfile(session?.user);
          setCachedGoogleProfile(profile);
          notifyListeners(profile);

          if (
            (event === 'SIGNED_IN' || event === 'USER_UPDATED') &&
            profile &&
            !profile.isAnonymous
          ) {
            cleanOAuthSuccessParamsFromUrl();
            void this.syncUserProfileAndProgressWithCloud();
          }
        });
      }

      const session = await getExistingSupabaseSession();
      const profile = mapSupabaseUserToProfile(session?.user);
      setCachedGoogleProfile(profile);
      notifyListeners(profile);

      if (profile && !profile.isAnonymous) {
        cleanOAuthSuccessParamsFromUrl();
        if (!getLastCloudSyncTimestamp()) {
          void this.syncUserProfileAndProgressWithCloud();
        }
      }

      return profile;
    } catch {
      return getCachedGoogleProfile();
    }
  },

  /**
   * Чл. 15 и Чл. 20 от GDPR (Регламент (ЕС) 2016/679) — Право на достъп и преносимост на данните.
   * Генерира и сваля пълен машинночетим JSON архив с профила, прогреса, XP нивата, значките,
   * банката с грешки и историята на изпитните симулации.
   */
  exportCompleteUserDataJson(): { ok: boolean; filename?: string; error?: string } {
    try {
      const profile = getCachedGoogleProfile();
      const progress = studyProgressService.getProgress();
      const allErrors = errorBankService.getAllErrors();
      const examAttempts = examHistoryService.getAllAttempts();
      const examAnalytics = examHistoryService.getAnalytics();
      const extraStats = {
        examAttemptsCount: examAnalytics.totalAttempts,
        highestExamScore: examAnalytics.highestScore,
        resolvedErrorsCount: allErrors.filter((e) => e.resolved).length
      };
      const xpAndLevel = computeUserXpAndLevel(progress, extraStats);
      const achievements = evaluateUserAchievements(progress, extraStats);

      let oralExamHistory: unknown = [];
      try {
        const rawOral = localStorage.getItem('studybg_oral_exam_history_v1');
        if (rawOral) oralExamHistory = JSON.parse(rawOral);
      } catch {
        // ignore
      }

      const payload = {
        platform: 'StudyBG — Национална дигитална академия (5.–12. клас)',
        exportedAt: new Date().toISOString(),
        euCompliance: {
          regulation: 'Регламент (ЕС) 2016/679 (GDPR) — Чл. 15 (Право на достъп) и Чл. 20 (Право на преносимост на данните)',
          bulgarianLaw: 'Закон за защита на личните данни (ЗЗЛД)',
          securityStandard: 'OAuth 2.0 (PKCE) + TLS 1.3 + PostgreSQL Row-Level Security (RLS: user_id = auth.uid())'
        },
        accountProfile: profile
          ? {
              userId: profile.id,
              email: profile.email,
              fullName: profile.fullName,
              provider: profile.provider,
              lastCloudSyncAt: getLastCloudSyncTimestamp()
            }
          : {
              mode: 'anonymous_local_only',
              lastCloudSyncAt: null
            },
        gamification: {
          level: xpAndLevel.level,
          title: xpAndLevel.title,
          totalXp: xpAndLevel.totalXp,
          currentDailyStreak: progress.currentDailyStreak ?? 1,
          longestDailyStreak: progress.longestDailyStreak ?? 1,
          unlockedAchievements: achievements.filter((a) => a.unlocked).map((a) => ({
            id: a.id,
            title: a.title,
            xpReward: a.xpReward
          }))
        },
        studyProgress: progress,
        errorBank: allErrors,
        examHistory: examAttempts,
        oralExamHistory
      };

      const filename = `studybg-gdpr-account-export-${new Date().toISOString().slice(0, 10)}.json`;
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const blob = new Blob([JSON.stringify(payload, null, 2)], {
          type: 'application/json;charset=utf-8'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      return { ok: true, filename };
    } catch (err: unknown) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Грешка при експортиране на данните.'
      };
    }
  },

  /**
   * Чл. 17 от GDPR (Регламент (ЕС) 2016/679) — Право на изтриване („Право да бъдеш забравен“).
   * Окончателно изтрива облачния профил в public.user_profiles, облачните опити в public.exam_attempts,
   * отписва имейла от бюлетина (ако има такъв), изчиства всички локални данни и прекратява Google OAuth сесията.
   */
  async deleteCloudAccountDataAndSignOut(): Promise<{
    ok: boolean;
    cloudDeleted: boolean;
    error?: string;
  }> {
    let cloudDeleted = false;
    let cloudError: string | undefined;

    try {
      const subInfo = mailingService.isSubscribed();
      if (subInfo.subscribed && subInfo.subscription?.email) {
        await mailingService.unsubscribe(subInfo.subscription.email);
      }
    } catch {
      // ignore newsletter cleanup errors
    }

    if (isSupabaseConfigured()) {
      try {
        const { supabase, getExistingSupabaseSession } = await import('./supabaseClient');
        const session = await getExistingSupabaseSession();
        if (session?.user?.id) {
          const userId = session.user.id;
          const { error: profileDelErr } = await supabase
            .from('user_profiles')
            .delete()
            .eq('user_id', userId);
          const { error: examDelErr } = await supabase
            .from('exam_attempts')
            .delete()
            .eq('user_id', userId);

          if (!profileDelErr && !examDelErr) {
            cloudDeleted = true;
          } else {
            cloudError = profileDelErr?.message || examDelErr?.message;
          }
        }
        await supabase.auth.signOut();
      } catch (err: unknown) {
        cloudError = err instanceof Error ? err.message : String(err);
      }
    }

    const keysToRemove = [
      'studybg_study_progress_v1',
      'studybg_exam_history',
      'studybg_error_bank',
      'studybg_oral_exam_history_v1',
      'studybg_newsletter_subscribers',
      'studybg_last_used_email',
      'studybg_gemini_api_key',
      'studybg_cookie_consent',
      CACHED_PROFILE_KEY,
      LAST_SYNC_AT_KEY
    ];

    try {
      for (const k of keysToRemove) {
        localStorage.removeItem(k);
      }
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith('sb-') && k.endsWith('-auth-token')) {
          localStorage.removeItem(k);
        }
      }
    } catch {
      // ignore storage errors
    }

    currentSyncStatus = 'idle';
    notifyListeners(null);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(LOCAL_DATA_MUTATED_EVENT));
    }

    return {
      ok: true,
      cloudDeleted,
      error: cloudError
    };
  }
};
