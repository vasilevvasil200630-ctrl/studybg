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
  Calendar,
  Flame,
  Trophy,
  Target,
  Feather,
  Lock,
  Download,
  Trash2,
  Scale
} from 'lucide-react';
import { NativeDialog } from './NativeDialog';
import {
  authService,
  getCachedGoogleProfile,
  getLastCloudSyncTimestamp,
  getCloudSyncLiveStatus,
  consumeOAuthUrlError,
  AUTH_SYNC_EVENT,
  type GoogleUserProfile,
  type CloudProfileSyncResult,
  type CloudSyncLiveStatus
} from '../services/authService';
import {
  studyProgressService,
  computeUserXpAndLevel,
  evaluateUserAchievements,
  LOCAL_DATA_MUTATED_EVENT,
  type StudyAchievementBadge
} from '../services/studyProgressService';
import { errorBankService } from '../services/errorBankService';
import { examHistoryService } from '../services/examHistoryService';
import type { AppNavTab } from './Navbar';
import type { LegalPolicyTab } from './LegalPoliciesModal';

interface AuthProfileModalProps {
  onClose: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
  onOpenPolicyModal?: (tab: LegalPolicyTab) => void;
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

function renderBadgeIcon(iconName: StudyAchievementBadge['iconName'], unlocked: boolean) {
  const cls = `w-4 h-4 shrink-0 ${unlocked ? 'text-amber-600' : 'text-slate-400'}`;
  switch (iconName) {
    case 'flame':
      return <Flame className={cls} aria-hidden="true" />;
    case 'trophy':
      return <Trophy className={cls} aria-hidden="true" />;
    case 'feather':
      return <Feather className={cls} aria-hidden="true" />;
    case 'shield':
      return <ShieldCheck className={cls} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={cls} aria-hidden="true" />;
    case 'target':
      return <Target className={cls} aria-hidden="true" />;
    case 'award':
      return <Award className={cls} aria-hidden="true" />;
    case 'book':
    default:
      return <BookOpen className={cls} aria-hidden="true" />;
  }
}

export const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  onClose,
  onNavigateTab,
  onOpenPolicyModal
}) => {
  const [profile, setProfile] = useState<GoogleUserProfile | null>(() => getCachedGoogleProfile());
  const [isLoadingSession, setIsLoadingSession] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [liveSyncStatus, setLiveSyncStatus] = useState<CloudSyncLiveStatus>(() =>
    getCloudSyncLiveStatus()
  );
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [avatarFailed, setAvatarFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(() => consumeOAuthUrlError());
  const [syncResult, setSyncResult] = useState<CloudProfileSyncResult | null>(null);
  const [lastSyncIso, setLastSyncIso] = useState<string | null>(() => getLastCloudSyncTimestamp());
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState<boolean>(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);
  const [gdprFeedbackMessage, setGdprFeedbackMessage] = useState<string | null>(null);

  const [progress, setProgress] = useState(() => studyProgressService.getProgress());
  const [allErrors, setAllErrors] = useState(() => errorBankService.getAllErrors());
  const [examAnalytics, setExamAnalytics] = useState(() => examHistoryService.getAnalytics());

  const refreshLocalStats = () => {
    setProgress(studyProgressService.getProgress());
    setAllErrors(errorBankService.getAllErrors());
    setExamAnalytics(examHistoryService.getAnalytics());
    setLastSyncIso(getLastCloudSyncTimestamp());
    setLiveSyncStatus(getCloudSyncLiveStatus());
  };

  useEffect(() => {
    let mounted = true;
    const unsubscribe = authService.subscribeToAuthChanges(
      (updatedProfile) => {
        if (!mounted) return;
        setProfile(updatedProfile);
        setAvatarFailed(false);
        refreshLocalStats();
      },
      { forceInit: true }
    );

    const onDataMutated = () => {
      if (mounted) refreshLocalStats();
    };
    window.addEventListener(LOCAL_DATA_MUTATED_EVENT, onDataMutated);
    window.addEventListener(AUTH_SYNC_EVENT, onDataMutated);

    authService
      .ensureAuthListenerInitialized()
      .then((currentProfile) => {
        if (!mounted) return;
        setProfile(currentProfile);
        refreshLocalStats();
      })
      .finally(() => {
        if (mounted) setIsLoadingSession(false);
      });

    return () => {
      mounted = false;
      unsubscribe();
      window.removeEventListener(LOCAL_DATA_MUTATED_EVENT, onDataMutated);
      window.removeEventListener(AUTH_SYNC_EVENT, onDataMutated);
    };
  }, []);

  const isGoogleSignedIn = Boolean(profile && !profile.isAnonymous);
  const resolvedErrorsCount = allErrors.filter((e) => e.resolved).length;
  const extraStats = {
    examAttemptsCount: examAnalytics.totalAttempts,
    highestExamScore: examAnalytics.highestScore,
    resolvedErrorsCount
  };

  const levelInfo = computeUserXpAndLevel(progress, extraStats);
  const achievements = evaluateUserAchievements(progress, extraStats);
  const unlockedBadgesCount = achievements.filter((b) => b.unlocked).length;
  const filteredBadges = achievements.filter((b) => {
    if (badgeFilter === 'unlocked') return b.unlocked;
    if (badgeFilter === 'locked') return !b.unlocked;
    return true;
  });

  const currentStreak = progress.currentDailyStreak ?? 1;
  const longestStreak = progress.longestDailyStreak ?? 1;

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
    refreshLocalStats();
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleSignOut = async () => {
    setErrorMessage(null);
    setGdprFeedbackMessage(null);
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

  const handleExportAccountData = () => {
    setErrorMessage(null);
    const res = authService.exportCompleteUserDataJson();
    if (res.ok) {
      setGdprFeedbackMessage(
        'Вашите данни от акаунта, прогресът и историята на симулациите бяха експортирани в JSON файл (чл. 15 и чл. 20 от GDPR).'
      );
    } else if (res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleDeleteAccountAndData = async () => {
    setErrorMessage(null);
    setIsDeletingAccount(true);
    const res = await authService.deleteCloudAccountDataAndSignOut();
    setIsDeletingAccount(false);
    setConfirmDeleteAccount(false);
    setSyncResult(null);
    setProfile(null);
    refreshLocalStats();
    if (res.ok) {
      setGdprFeedbackMessage(
        'Облачният акаунт и всички локални данни бяха окончателно изтрити съгласно чл. 17 от GDPR („Право да бъдеш забравен“).'
      );
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
      widthClassName="max-w-2xl"
    >
      <div className="rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-900">
        {/* Top Header */}
        <div className="px-5 py-4 bg-gradient-to-br from-[#083861] via-[#0a4b82] to-[#145a96] text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              <GoogleLogoSvg className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  StudyBG Cloud ID
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  <Flame className="w-3 h-3 text-amber-400" aria-hidden="true" />
                  Streak: {currentStreak} {currentStreak === 1 ? 'ден' : 'дни'}
                </span>
                {isGoogleSignedIn && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Авто-синхронизация в реално време
                  </span>
                )}
              </div>
              <h2
                id="auth-profile-modal-title"
                className="text-base sm:text-lg font-bold truncate mt-0.5"
              >
                {isGoogleSignedIn
                  ? 'Google Профил, Дневен Streak, XP Нива и Значки'
                  : 'Вход с Google Акаунт • Запази XP Нивата и Прогреса'}
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

          {/* ================================================================= */}
          {/* XP LEVEL & DAILY STREAK BANNER (VISIBLE FOR BOTH STATES)          */}
          {/* ================================================================= */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#083861] via-[#0a4b82] to-[#145a96] text-white space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold uppercase text-amber-300 leading-none">
                    Ниво
                  </span>
                  <span className="text-xl font-bold text-amber-300 leading-tight font-mono">
                    {levelInfo.level}
                  </span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-white">
                      {levelInfo.title}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/25 text-blue-200 border border-blue-400/30">
                      {levelInfo.totalXp} XP
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Отключени значки: <strong>{unlockedBadgesCount} / {achievements.length}</strong> •
                    Следващо ниво на <strong>{levelInfo.nextLevelXp} XP</strong>
                  </p>
                </div>
              </div>

              {/* Daily Streak Pill */}
              <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 shrink-0">
                <Flame className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs font-bold text-amber-300">
                    {currentStreak} {currentStreak === 1 ? 'пореден ден' : 'поредни дни'}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Рекорд: {longestStreak} {longestStreak === 1 ? 'ден' : 'дни'}
                  </div>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
                <span>Напредък към Ниво {Math.min(levelInfo.maxLevel, levelInfo.level + 1)}</span>
                <span className="font-mono font-bold text-amber-300">{levelInfo.progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${Math.max(4, levelInfo.progressPercent)}%` }}
                />
              </div>
            </div>
          </div>

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
                      className="w-14 h-14 rounded-2xl object-cover border border-blue-500/30 shadow-xs shrink-0"
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
                      {liveSyncStatus === 'syncing'
                        ? 'Автоматично синхронизиране с облака в момента...'
                        : formattedLastSync
                        ? `Последна облачна синхронизация: ${formattedLastSync}`
                        : 'Автоматичната синхронизация в реално време е активна'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={isSyncing || liveSyncStatus === 'syncing'}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${
                      isSyncing || liveSyncStatus === 'syncing' ? 'animate-spin' : ''
                    }`}
                    aria-hidden="true"
                  />
                  <span>
                    {isSyncing || liveSyncStatus === 'syncing'
                      ? 'Синхронизиране...'
                      : 'Синхронизирай сега'}
                  </span>
                </button>
              </div>

              {/* Sync Feedback Banner */}
              {syncResult && syncResult.success && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-bold">
                      Прогресът, XP точките и Дневният Streak са синхронизирани в облака!
                    </p>
                    <p className="text-emerald-800 mt-0.5">
                      Усвоени теми: <strong>{syncResult.masteredLessonsCount}</strong> • Автори:{' '}
                      <strong>{syncResult.masteredAuthorsCount}</strong> • Банка с грешки:{' '}
                      <strong>{syncResult.errorBankCount}</strong> • Синхронизирани изпити:{' '}
                      <strong>+{syncResult.examDownloadedCount + syncResult.examUploadedCount}</strong>
                    </p>
                  </div>
                </div>
              )}

              {/* Synced Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
                  <div className="flex items-center gap-1.5 text-blue-700 text-xs font-semibold">
                    <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Усвоени теми</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 mt-1">
                    {progress.masteredLessonIds.length}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                  <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                    <Award className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Автори ДЗИ</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 mt-1">
                    {progress.masteredAuthorIds.length} / 15
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="flex items-center gap-1.5 text-amber-800 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Симулации</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 mt-1">
                    {examAnalytics.totalAttempts}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80">
                  <div className="flex items-center gap-1.5 text-rose-700 text-xs font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Банка грешки</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 mt-1">{allErrors.length}</p>
                </div>
              </div>
            </div>
          ) : (
            /* =============================================================== */
            /* SIGNED OUT / ANONYMOUS VIEW                                     */
            /* =============================================================== */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-4">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    Един Google акаунт за всички твои устройства
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Свържи Google профила си за автоматичен облачен синхрон в реално време
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Влез с 1 клик чрез Google, за да запазиш своите <strong>{levelInfo.totalXp} XP</strong>,{' '}
                    <strong>{currentStreak}-дневен Streak</strong>, отключени значки, усвоени уроци и
                    решени матури между телефон и лаптоп.
                  </p>
                </div>

                {/* Primary Google OAuth Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn || isLoadingSession}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold text-sm border border-slate-300 hover:border-blue-500 shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
                >
                  <GoogleLogoSvg className="w-5 h-5 shrink-0" />
                  <span>
                    {isSigningIn
                      ? 'Пренасочване към Google...'
                      : 'Продължи с Google акаунт'}
                  </span>
                </button>
              </div>

              {/* Benefits List */}
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <li className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Laptop className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                    <span>Синхрон в реално време</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Всяка отметната тема или решен въпрос се качва автоматично в облака.
                  </p>
                </li>

                <li className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Flame className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                    <span>Дневен Streak & XP</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Трупай поредни дни подготовка и качвай нива от Гимназист до Лауреат 6.00.
                  </p>
                </li>

                <li className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Trophy className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>12 Значки за Успех</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Отключвай академични постижения за канона, граматиката и симулатора.
                  </p>
                </li>
              </ul>
            </div>
          )}

          {/* ================================================================= */}
          {/* ACHIEVEMENT BADGES SHOWCASE (12 BADGES)                           */}
          {/* ================================================================= */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-600" aria-hidden="true" />
                  <span>Академични Значки за Постижения ({unlockedBadgesCount}/{achievements.length})</span>
                </h3>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {(
                  [
                    { id: 'all', label: `Всички (${achievements.length})` },
                    { id: 'unlocked', label: `Отключени (${unlockedBadgesCount})` },
                    {
                      id: 'locked',
                      label: `В прогрес (${achievements.length - unlockedBadgesCount})`
                    }
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setBadgeFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                      badgeFilter === tab.id
                        ? 'bg-white text-blue-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[250px] overflow-y-auto pr-1">
              {filteredBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                    badge.unlocked
                      ? 'bg-amber-50/70 border-amber-300 shadow-2xs'
                      : 'bg-slate-50/70 border-slate-200 opacity-85'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                          badge.unlocked
                            ? 'bg-amber-100 border-amber-300'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        {renderBadgeIcon(badge.iconName, badge.unlocked)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {badge.title}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                          {badge.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 border ${
                        badge.unlocked
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-200/70 text-slate-700 border-slate-300'
                      }`}
                    >
                      +{badge.xpReward} XP
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                      <span>
                        {badge.unlocked ? '✓ Отключена значка' : 'Напредък'}
                      </span>
                      <span className="font-mono">
                        {Math.min(badge.currentValue, badge.targetValue)} / {badge.targetValue}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          badge.unlocked ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${badge.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================================================================= */}
          {/* EUROPEAN ACCOUNT PROTECTION & GDPR RIGHTS CENTER                  */}
          {/* ================================================================= */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-4 h-4 text-blue-700" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Европейска защита на акаунта (GDPR • Регламент (ЕС) 2016/679 • ЗЗЛД)
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                    Входът с Google използва криптиран протокол <strong>OAuth 2.0 (PKCE)</strong> и{' '}
                    <strong>TLS 1.3</strong> — StudyBG никога няма достъп до твоята парола. Облачният
                    профил е защитен с <strong>Row-Level Security (RLS)</strong> изолация в базата
                    данни и не се използва за рекламно профилиране.
                  </p>
                </div>
              </div>
            </div>

            {gdprFeedbackMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>{gdprFeedbackMessage}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleExportAccountData}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-[11px] font-bold transition-colors cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                <span>Изтегли данните от акаунта (JSON • Чл. 20 GDPR)</span>
              </button>

              {!confirmDeleteAccount ? (
                <button
                  type="button"
                  onClick={() => setConfirmDeleteAccount(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
                  <span>
                    {isGoogleSignedIn
                      ? 'Изтрий облачния акаунт и данните (Чл. 17 GDPR)'
                      : 'Изчисти локалните данни (Чл. 17 GDPR)'}
                  </span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2 bg-rose-50 border border-rose-300 px-3 py-1.5 rounded-xl">
                  <span className="text-[11px] font-bold text-rose-900">
                    Потвърждаваш ли окончателно изтриване по чл. 17 от GDPR?
                  </span>
                  <button
                    type="button"
                    disabled={isDeletingAccount}
                    onClick={handleDeleteAccountAndData}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-[11px] font-bold cursor-pointer"
                  >
                    {isDeletingAccount ? 'Изтриване...' : 'Да, изтрий всичко'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteAccount(false)}
                    className="px-2 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 text-[11px] font-semibold cursor-pointer"
                  >
                    Отказ
                  </button>
                </div>
              )}

              {onOpenPolicyModal && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenPolicyModal('privacy');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                  <span>Европейски политики & GDPR център</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
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
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
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
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                    <span>Изпитен симулатор</span>
                  </button>
                </>
              )}
            </div>

            {isGoogleSignedIn && (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isSigningOut ? 'Излизане...' : 'Изход от профила'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </NativeDialog>
  );
};
