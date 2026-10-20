import type { User } from '@supabase/supabase-js';
import { isSupabaseConfigured } from './supabaseConfig';
import { studyProgressService, type UserStudyProgress, type TargetExamTrack } from './studyProgressService';
import { errorBankService, type SavedErrorItem } from './errorBankService';
import { examHistoryService } from './examHistoryService';

export interface GoogleUserProfile {
  id: string;
  email: string | null;
  fullName: string;
  avatarUrl: string | null;
  isAnonymous: boolean;
  provider: 'google' | 'anonymous' | 'other';
}

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

function notifyListeners(profile: GoogleUserProfile | null): void {
  for (const listener of listeners) {
    try {
      listener(profile);
    } catch {
      // ignore listener errors
    }
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_SYNC_EVENT, { detail: { profile } }));
  }
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
      fullName: typeof parsed.fullName === 'string' && parsed.fullName.trim() ? parsed.fullName : 'Ученик в StudyBG',
      avatarUrl: typeof parsed.avatarUrl === 'string' ? parsed.avatarUrl : null,
      isAnonymous: Boolean(parsed.isAnonymous),
      provider: parsed.provider === 'google' || parsed.provider === 'anonymous' ? parsed.provider : 'other'
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

const VALID_TRACKS: ReadonlySet<TargetExamTrack> = new Set(['dzi_bel', 'dzi_history', 'nvo_10', 'dzi_stem']);
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
 * Слива локалния и облачния учебен прогрес без загуба на усвоени теми, автори или решени задачи.
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
    typeof cloud.dailyGoalMinutes === 'number' && VALID_GOALS.has(cloud.dailyGoalMinutes as 30 | 45 | 60 | 90)
      ? (cloud.dailyGoalMinutes as 30 | 45 | 60 | 90)
      : local.dailyGoalMinutes;

  const targetGrade =
    typeof cloud.targetGrade === 'number' && VALID_GRADES.has(cloud.targetGrade as 5.0 | 5.5 | 6.0)
      ? (cloud.targetGrade as 5.0 | 5.5 | 6.0)
      : local.targetGrade;

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
    )
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

export function formatGoogleAuthError(rawMessage: string): string {
  const lower = rawMessage.toLowerCase();
  if (lower.includes('provider is not enabled') || lower.includes('unsupported provider')) {
    return 'Входът с Google все още не е активиран в Supabase Dashboard (Authentication → Providers → Google → Enable).';
  }
  if (lower.includes('redirect_uri') || lower.includes('redirect url')) {
    return 'Адресът за пренасочване (Redirect URL) не е добавен в настройките на Supabase Auth / Google Cloud Console.';
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
   * Стартира OAuth вход с Google акаунт.
   * Ако ученикът вече има анонимна сесия, първо опитва да свърже Google профила към нея (linkIdentity),
   * за да запази същото user_id, а при нужда преминава към стандартен signInWithOAuth.
   */
  async signInWithGoogle(redirectPath?: string): Promise<{
    ok: boolean;
    mode?: 'linked' | 'oauth';
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
      const { supabase, getExistingSupabaseSession } = await import('./supabaseClient');
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}${redirectPath ?? window.location.pathname}`
          : undefined;

      const existingSession = await getExistingSupabaseSession();
      if (
        existingSession?.user?.is_anonymous === true &&
        typeof supabase.auth.linkIdentity === 'function'
      ) {
        const linkRes = await supabase.auth.linkIdentity({
          provider: 'google',
          options: {
            redirectTo,
            queryParams: {
              access_type: 'offline',
              prompt: 'select_account'
            }
          }
        });

        if (!linkRes.error) {
          return {
            ok: true,
            mode: 'linked',
            url: linkRes.data?.url ?? null
          };
        }
      }

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
   * 1) Учебен прогрес (План за 6.00 — усвоени теми, автори, седмичен график, граматика)
   * 2) Интерактивна банка с грешки
   * 3) История от 100-точковия Изпитен симулатор
   */
  async syncUserProfileAndProgressWithCloud(): Promise<CloudProfileSyncResult> {
    const nowIso = new Date().toISOString();
    const localProgress = studyProgressService.getProgress();
    const localErrors = errorBankService.getAllErrors();

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
      const { supabase, getExistingSupabaseSession } = await import('./supabaseClient');
      const session = await getExistingSupabaseSession();
      const profile = mapSupabaseUserToProfile(session?.user);

      if (!session || !profile) {
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
      let profileSynced = false;
      let profileSyncWarning: string | undefined;

      const { data: cloudRow, error: selectError } = await supabase
        .from('user_profiles')
        .select('study_progress, error_bank, updated_at')
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
        studyProgressService.saveProgress(mergedProgress);
        errorBankService.saveErrors(mergedErrors);
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
      notifyListeners(profile);

      return {
        success: true,
        profileSynced,
        masteredLessonsCount: mergedProgress.masteredLessonIds.length,
        masteredAuthorsCount: mergedProgress.masteredAuthorIds.length,
        errorBankCount: mergedErrors.length,
        examDownloadedCount: examSync.downloaded,
        examUploadedCount: examSync.uploaded,
        syncedAt: nowIso,
        error: profileSyncWarning ?? examSync.error
      };
    } catch (err: unknown) {
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
   * Абонира компонент за промени в Google профила.
   * Зарежда @supabase/supabase-js само ако има запазена сесия или OAuth редирект, или ако forceInit = true.
   */
  subscribeToAuthChanges(
    listener: AuthProfileListener,
    options?: { forceInit?: boolean }
  ): () => void {
    listeners.add(listener);

    if (options?.forceInit || hasPotentialAuthSession()) {
      void this.ensureAuthListenerInitialized();
    }

    return () => {
      listeners.delete(listener);
    };
  },

  async ensureAuthListenerInitialized(): Promise<GoogleUserProfile | null> {
    if (!isSupabaseConfigured()) return null;

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
            void this.syncUserProfileAndProgressWithCloud();
          }
        });
      }

      const session = await getExistingSupabaseSession();
      const profile = mapSupabaseUserToProfile(session?.user);
      setCachedGoogleProfile(profile);
      notifyListeners(profile);

      if (profile && !profile.isAnonymous && !getLastCloudSyncTimestamp()) {
        void this.syncUserProfileAndProgressWithCloud();
      }

      return profile;
    } catch {
      return getCachedGoogleProfile();
    }
  }
};
