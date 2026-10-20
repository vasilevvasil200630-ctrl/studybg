import React, { useEffect, useState } from 'react';
import {
  X,
  Cloud,
  CheckCircle2,
  RefreshCw,
  LogOut,
  ShieldCheck,
  BookOpen,
  Award,
  AlertCircle,
  Clock,
  Sparkles,
  Laptop,
  Calendar
} from 'lucide-react';
import { NativeDialog } from './NativeDialog';
import {
  authService,
  getCachedGoogleProfile,
  getLastCloudSyncTimestamp,
  type GoogleUserProfile,
  type CloudProfileSyncResult
} from '../services/authService';
import { studyProgressService } from '../services/studyProgressService';
import { errorBankService } from '../services/errorBankService';
import { examHistoryService } from '../services/examHistoryService';
import { SUPABASE_URL } from '../services/supabaseConfig';
import type { AppNavTab } from './Navbar';

interface AuthProfileModalProps {
  onClose: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

export const GoogleLogoSvg: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.49 12.275c0-.85-.075-1.665-.215-2.45H12v4.635h6.445c-.28 1.495-1.125 2.765-2.395 3.615v3.005h3.875c2.265-2.085 3.565-5.16 3.565-8.805z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.955-1.075 7.94-2.91l-3.875-3.005c-1.075.72-2.45 1.145-4.065 1.145-3.125 0-5.775-2.11-6.72-4.945H1.275v3.1C3.25 21.305 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.285c-.24-.72-.375-1.49-.375-2.285s.135-1.565.375-2.285v-3.1H1.275C.465 8.23 0 10.065 0 12s.465 3.77 1.275 5.385l4.005-3.1z"
    />
    <path
      fill="#EA4335"
      d="M12 4.77c1.76 0 3.34.605 4.585 1.795l3.44-3.44C17.95 1.19 15.235 0 12 0 7.31 0 3.25 2.695 1.275 6.615l4.005 3.1C6.225 6.88 8.875 4.77 12 4.77z"
    />
  </svg>
);

export const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  onClose,
  onNavigateTab
}) => {
  const [profile, setProfile] = useState<GoogleUserProfile | null>(() => getCachedGoogleProfile());
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [avatarFailed, setAvatarFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [syncResult, setSyncResult] = useState<CloudProfileSyncResult | null>(null);
  const [lastSyncIso, setLastSyncIso] = useState<string | null>(() => getLastCloudSyncTimestamp());

  const [progress, setProgress] = useState(() => studyProgressService.getProgress());
  const [errorCount, setErrorCount] = useState(() => errorBankService.getAllErrors().length);
  const [examCount, setExamCount] = useState(() => examHistoryService.getAllAttempts().length);

  const refreshLocalCounts = () => {
    setProgress(studyProgressService.getProgress());
    setErrorCount(errorBankService.getAllErrors().length);
    setExamCount(examHistoryService.getAllAttempts().length);
    setLastSyncIso(getLastCloudSyncTimestamp());
  };

  useEffect(() => {
    let mounted = true;
    const unsubscribe = authService.subscribeToAuthChanges(
      (updatedProfile) => {
        if (!mounted) return;
        setProfile(updatedProfile);
        setAvatarFailed(false);
        refreshLocalCounts();
      },
      { forceInit: true }
    );

    authService
      .ensureAuthListenerInitialized()
      .then((currentProfile) => {
        if (!mounted) return;
        setProfile(currentProfile);
        refreshLocalCounts();
      })
      .finally(() => {
        if (mounted) setIsLoadingSession(false);
      });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const isGoogleSignedIn = Boolean(profile && !profile.isAnonymous);

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsSigningIn(true);
    const res = await authService.signInWithGoogle();
    if (!res.ok) {
      setIsSigningIn(false);
      setErrorMessage(res.error || 'Неуспешно стартиране на вход с Google.');
    }
  };

  const handleManualSync = async () => {
    setErrorMessage(null);
    setIsSyncing(true);
    const res = await authService.syncUserProfileAndProgressWithCloud();
    setIsSyncing(false);
    setSyncResult(res);
    refreshLocalCounts();
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleSignOut = async () => {
    setErrorMessage(null);
    setIsSigningOut(true);
    const res = await authService.signOut();
    setIsSigningOut(false);
    setSyncResult(null);
    if (!res.ok && res.error) {
      setErrorMessage(res.error);
    } else {
      setProfile(null);
    }
  };

  const formattedLastSync = lastSyncIso
    ? new Date(lastSyncIso).toLocaleString('bg-BG', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null;

  const initials = (profile?.fullName || 'У')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

  return (
    <NativeDialog
      onClose={onClose}
      labelledBy="auth-profile-modal-title"
      widthClassName="max-w-xl"
    >
      <div className="rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900">
        {/* Top Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              <GoogleLogoSvg className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  StudyBG Cloud ID
                </span>
                {isGoogleSignedIn && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Свързан Google акаунт
                  </span>
                )}
              </div>
              <h2 id="auth-profile-modal-title" className="text-base sm:text-lg font-bold truncate mt-0.5">
                {isGoogleSignedIn
                  ? 'Моят Google Профил и Облачна Синхронизация'
                  : 'Вход с Google Акаунт в StudyBG'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Затвори прозореца за потребителски профил"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          {errorMessage && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <p className="font-semibold">{errorMessage}</p>
              </div>
            </div>
          )}

          {isGoogleSignedIn && profile ? (
            /* =============================================================== */
            /* SIGNED IN WITH GOOGLE VIEW                                      */
            /* =============================================================== */
            <div className="space-y-5">
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  {profile.avatarUrl && !avatarFailed ? (
                    <img
                      src={profile.avatarUrl}
                      alt={`Профилна снимка на ${profile.fullName}`}
                      width={56}
                      height={56}
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarFailed(true)}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500/30 shadow-xs shrink-0"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs"
                    >
                      {initials || 'У'}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {profile.fullName}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                        <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                        Google Профил
                      </span>
                    </div>
                    {profile.email && (
                      <p className="text-xs sm:text-sm text-slate-600 truncate mt-0.5">
                        {profile.email}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                      <Cloud className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                      {formattedLastSync
                        ? `Последна синхронизация: ${formattedLastSync}`
                        : 'Облачният профил е активен на това устройство'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={isSyncing}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold shadow-xs transition-all shrink-0"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{isSyncing ? 'Синхронизиране...' : 'Синхронизирай сега'}</span>
                </button>
              </div>

              {/* Sync Feedback Banner */}
              {syncResult && syncResult.success && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-bold">
                      Прогресът е синхронизиран успешно с вашия Google акаунт!
                    </p>
                    <p className="text-emerald-800 mt-0.5">
                      Усвоени теми: <strong>{syncResult.masteredLessonsCount}</strong> • Усвоени автори:{' '}
                      <strong>{syncResult.masteredAuthorsCount}</strong> • Банка с грешки:{' '}
                      <strong>{syncResult.errorBankCount}</strong> • Синхронизирани изпити:{' '}
                      <strong>+{syncResult.examDownloadedCount + syncResult.examUploadedCount}</strong>
                    </p>
                  </div>
                </div>
              )}

              {/* Synced Metrics Grid */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Данни в твоя облачен профил
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
                    <div className="flex items-center gap-1.5 text-blue-700 text-xs font-semibold">
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Усвоени теми</span>
                    </div>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">
                      {progress.masteredLessonIds.length}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                    <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                      <Award className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Автори ДЗИ</span>
                    </div>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">
                      {progress.masteredAuthorIds.length} / 15
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                    <div className="flex items-center gap-1.5 text-amber-800 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Симулации</span>
                    </div>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">{examCount}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80">
                    <div className="flex items-center gap-1.5 text-rose-700 text-xs font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Банка грешки</span>
                    </div>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">{errorCount}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  {onNavigateTab && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigateTab('planner');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                        <span>Моят План за 6.00</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigateTab('simulator');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                        <span>Изпитен симулатор</span>
                      </button>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isSigningOut ? 'Излизане...' : 'Изход от профила'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* =============================================================== */
            /* SIGNED OUT / ANONYMOUS VIEW                                     */
            /* =============================================================== */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-200/80 space-y-4">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    Един акаунт за всички твои устройства
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Запази подготовката си за НВО, ДЗИ и Трета СПК в облака
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Влез с 1 клик чрез своя Google акаунт, за да синхронизираш автоматично усвоените
                    уроци, седмичния план за 6.00, банката с грешки и решените матури между телефон и
                    компютър.
                  </p>
                </div>

                {/* Primary Google OAuth Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn || isLoadingSession}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold text-sm border-2 border-slate-300 hover:border-blue-500 shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
                >
                  <GoogleLogoSvg className="w-5 h-5 shrink-0" />
                  <span>
                    {isSigningIn
                      ? 'Пренасочване към Google...'
                      : 'Продължи с Google акаунт'}
                  </span>
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  Досегашният ти прогрес на това устройство ({progress.masteredLessonIds.length}{' '}
                  усвоени теми и {examCount} симулации) ще се слее автоматично с Google профила ти.
                </p>
              </div>

              {/* Benefits List */}
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Laptop className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                    <span>Телефон + Лаптоп</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Започни тест или конспект на телефона и продължи веднага на компютъра.
                  </p>
                </li>

                <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Cloud className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>План за 6.00 & Канон</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Отметнатите уроци, 15-те автори за ДЗИ и седмичният график се пазят в облака.
                  </p>
                </li>

                <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                    <span>Защитени данни (RLS)</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Вход чрез официален Google OAuth 2.0 без пароли и с криптиран достъп.
                  </p>
                </li>
              </ul>

              {/* Technical Setup Disclosure for Admin */}
              <details className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs text-slate-600">
                <summary className="font-semibold text-slate-700 cursor-pointer select-none">
                  Техническа информация за администратора (Supabase Google OAuth)
                </summary>
                <div className="mt-2.5 pt-2.5 border-t border-slate-200 space-y-1.5 text-[11px] leading-relaxed">
                  <p>
                    1. В <strong>Supabase Dashboard → Authentication → Providers → Google</strong>{' '}
                    включете <em>Enable Sign in with Google</em> и въведете <em>Client ID</em> и{' '}
                    <em>Client Secret</em> от Google Cloud Console.
                  </p>
                  <p>
                    2. В <strong>Google Cloud Console → Authorized redirect URIs</strong> добавете:{' '}
                    <code className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-900 font-mono break-all">
                      {SUPABASE_URL}/auth/v1/callback
                    </code>
                  </p>
                  <p>
                    3. Изпълнете миграцията{' '}
                    <code className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-900 font-mono">
                      supabase/migrations/20261020_google_auth_user_profiles.sql
                    </code>{' '}
                    в SQL Editor за таблицата <code className="font-mono">user_profiles</code>.
                  </p>
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </NativeDialog>
  );
};
