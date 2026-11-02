import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Cookie,
  Lock,
  CheckCircle2,
  Scale,
  GraduationCap,
  Cpu,
  Accessibility,
  Download,
  Trash2,
  AlertTriangle,
  ExternalLink,
  Volume2,
  Keyboard,
  Eye,
  Search,
  Printer,
  Copy,
  Check,
  Mail,
  Settings,
  RefreshCw
} from 'lucide-react';
import { authService, getCachedGoogleProfile } from '../services/authService';
import {
  COOKIE_CONSENT_UPDATED_EVENT,
  COOKIE_STORAGE_KEY,
  buildConsent,
  clearAnalyticsCookies,
  isAnalyticsAllowed,
  parseStoredConsent,
  reopenCookieSettings
} from '../lib/consent';
import { NativeDialog } from './NativeDialog';

export type LegalPolicyTab = 'privacy' | 'cookies' | 'terms' | 'ai_act' | 'accessibility';

interface LegalPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalPolicyTab;
}

interface StorageRegistryEntry {
  keyName: string;
  category: 'Строго необходим' | 'Функционален' | 'По избор (Съгласие)' | 'Аналитичен (само със съгласие)';
  purpose: string;
  retention: string;
}

const STORAGE_REGISTRY: StorageRegistryEntry[] = [
  {
    keyName: 'studybg_cookie_consent',
    category: 'Строго необходим',
    purpose: 'Съхранява избора ви за настройки на бисквитките и потвърждението по чл. 25в от ЗЗЛД',
    retention: '1 година'
  },
  {
    keyName: 'studybg_user_progress_v1 / studybg_study_progress_v1',
    category: 'Функционален',
    purpose: 'Запазва прогреса в „Моят План за 6.00“, дневната серия (Streak), XP точките, значките и целевата оценка за ДЗИ/ДИППК',
    retention: 'До изчистване'
  },
  {
    keyName: 'studybg_leitner_cards_v1 / studybg_flashcards_mastered_v1',
    category: 'Функционален',
    purpose: 'Съхранява разпределението на флаш картите в 5-те кутии на Лайтнер (Spaced Repetition) и датите за следващ преговор',
    retention: 'До изчистване'
  },
  {
    keyName: 'studybg_parent_portal_v1',
    category: 'Функционален',
    purpose: 'Съхранява 6-знаковия код за Родителския портал (MP-XXXXXX), свързания родителски имейл и историята на седмичния дайджест',
    retention: 'До прекъсване на връзката / изчистване'
  },
  {
    keyName: 'studybg_student_profile_v1 / studybg_topic_mastery_v1',
    category: 'Функционален',
    purpose: 'Запазва избрания клас (8.–12. клас), профилиращите предмети за матура и усвояемостта по теми от програмата на МОН',
    retention: 'До изчистване'
  },
  {
    keyName: 'studybg_exam_history / studybg_exam_mistakes_v1',
    category: 'Функционален',
    purpose: 'Съхранява хронологията, точките и сгрешените въпроси от проведените 100-точкови изпитни симулации по формата на МОН',
    retention: 'До изчистване'
  },
  {
    keyName: 'studybg_error_bank',
    category: 'Функционален',
    purpose: 'Запазва сгрешените тестови въпроси за генериране на персонализиран поправителен тест за 6.00',
    retention: 'До изчистване'
  },
  {
    keyName: 'studybg_engagement_stats_v1 / studybg_feedback_history_v1',
    category: 'Функционален',
    purpose: 'Локална статистика за активно учебно време по раздели („Къде отделяш най-много време“) и подадени сигнали/обратна връзка',
    retention: 'До изчистване'
  },
  {
    keyName: 'sb-*-auth-token / studybg_cached_google_profile_v1',
    category: 'Строго необходим',
    purpose: 'Криптирана OAuth 2.0 (PKCE) сесия и кеш на потребителския профил при доброволен вход с Google за облачна синхронизация',
    retention: 'До изход от профила'
  },
  {
    keyName: 'studybg_newsletter_subscribers',
    category: 'По избор (Съгласие)',
    purpose: 'Помни статуса на абонамент за седмичния изпитен бюлетин за ДЗИ и гимназиален етап',
    retention: 'До отписване'
  },
  {
    keyName: 'studybg_gemini_api_key',
    category: 'По избор (Съгласие)',
    purpose: 'Съхранява локално въведения от потребителя личен Google Gemini API ключ (ако е зададен)',
    retention: 'До изчистване'
  },
  {
    keyName: 'studybg-pwa-v4 / studybg-assets-v4',
    category: 'Строго необходим',
    purpose: 'Service Worker кеш за мигновено зареждане и работа на конспектите и свитъците с формули без интернет',
    retention: 'До обновяване на версията'
  },
  {
    keyName: '_ga, _ga_EE8QCTTSKD',
    category: 'Аналитичен (само със съгласие)',
    purpose: 'Google Analytics 4 — агрегирана статистика за посещенията със забранена рекламна персонализация (allow_google_signals: false)',
    retention: 'До 2 години (или до оттегляне)'
  },
  {
    keyName: '_clck, _clsk',
    category: 'Аналитичен (само със съгласие)',
    purpose: 'Microsoft Clarity — анонимизирани топлинни карти на интерфейса за подобряване на мобилната навигация',
    retention: 'До 1 година / 1 ден (или до оттегляне)'
  }
];

type GdprRequestType = 'access' | 'rectification' | 'erasure' | 'portability';

const GDPR_REQUEST_LABELS: Record<GdprRequestType, { title: string; article: string }> = {
  access: { title: 'Достъп до лични данни', article: 'Чл. 15 от GDPR' },
  rectification: { title: 'Коригиране на неточни данни', article: 'Чл. 16 от GDPR' },
  erasure: { title: 'Изтриване („Право да бъдеш забравен“)', article: 'Чл. 17 от GDPR' },
  portability: { title: 'Преносимост на данните в машинночетим формат', article: 'Чл. 20 от GDPR' }
};

export const LegalPoliciesModal: React.FC<LegalPoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState<LegalPolicyTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [gdprActionNotice, setGdprActionNotice] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  // Състояние на текущото съгласие за бисквитки
  const [cookieStatusVersion, setCookieStatusVersion] = useState(0);

  // Интерактивен генератор на официално GDPR заявление
  const [gdprRequestType, setGdprRequestType] = useState<GdprRequestType>('access');
  const [gdprRequesterEmail, setGdprRequesterEmail] = useState('');
  const [gdprRequesterNote, setGdprRequesterNote] = useState('');
  const [copiedGdprTemplate, setCopiedGdprTemplate] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
    setConfirmWipe(false);
    setGdprActionNotice(null);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onUpdated = () => setCookieStatusVersion((v) => v + 1);
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, onUpdated);
    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, onUpdated);
  }, []);

  const currentCookieConsent = useMemo(() => {
    void cookieStatusVersion;
    if (typeof window === 'undefined') return { status: 'missing' as const };
    try {
      return parseStoredConsent(localStorage.getItem(COOKIE_STORAGE_KEY));
    } catch {
      return { status: 'missing' as const };
    }
  }, [cookieStatusVersion]);

  const filteredRegistry = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return STORAGE_REGISTRY;
    return STORAGE_REGISTRY.filter(
      (item) =>
        item.keyName.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.purpose.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  const activeGoogleProfile = getCachedGoogleProfile();
  const effectiveEmail = gdprRequesterEmail.trim() || activeGoogleProfile?.email || '';

  const generatedGdprRequestText = [
    `ДО: Екипа по защита на личните данни на StudyBG`,
    `ОТНОСНО: Официално заявление по ${GDPR_REQUEST_LABELS[gdprRequestType].article} (${GDPR_REQUEST_LABELS[gdprRequestType].title})`,
    `ДАТА: ${new Date().toLocaleDateString('bg-BG')}`,
    `ИМЕЙЛ / ИДЕНТИФИКАТОР: ${effectiveEmail || '[Въведете вашия имейл или код от Родителския портал]'}`,
    ``,
    `Уважаеми дами и господа,`,
    `На основание ${GDPR_REQUEST_LABELS[gdprRequestType].article} от Регламент (ЕС) 2016/679 (GDPR) и Закона за защита на личните данни (ЗЗЛД), упражнявам правото си на: ${GDPR_REQUEST_LABELS[gdprRequestType].title.toLowerCase()}.`,
    gdprRequesterNote.trim() ? `Допълнителни детайли: ${gdprRequesterNote.trim()}` : null,
    ``,
    `Моля за потвърждение в законоустановения едномесечен срок по чл. 12, пар. 3 от GDPR.`
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  const handleCopyGdprTemplate = async () => {
    try {
      await navigator.clipboard.writeText(generatedGdprRequestText);
      setCopiedGdprTemplate(true);
      setTimeout(() => setCopiedGdprTemplate(false), 2500);
    } catch {
      setGdprActionNotice({
        type: 'info',
        text: 'Текстът на заявлението е готов — можете да го маркирате и копирате директно.'
      });
    }
  };

  /**
   * Art. 15 & Art. 20 GDPR — Right of Access & Data Portability (Export all account & local user data as JSON)
   */
  const handleExportUserData = () => {
    const res = authService.exportCompleteUserDataJson();
    if (res.ok) {
      setGdprActionNotice({
        type: 'success',
        text: 'Вашите учебни данни (вкл. План за 6.00, Leitner флаш карти, Родителски портал и история на матурите) бяха експортирани успешно във формат JSON съгласно чл. 15 и чл. 20 от GDPR.'
      });
    } else {
      setGdprActionNotice({
        type: 'info',
        text: res.error || 'Няма налични данни за експортиране.'
      });
    }
  };

  /**
   * Art. 17 GDPR — Right to Erasure ("Право да бъдеш забравен" — Cloud Account + Local Storage)
   */
  const handleEraseAllUserData = async () => {
    setIsDeleting(true);
    try {
      await authService.deleteCloudAccountDataAndSignOut();
      setConfirmWipe(false);
      setGdprActionNotice({
        type: 'success',
        text: 'Всички ваши облачни (Google профил в Supabase), абонаментни и локални данни (вкл. Leitner карти и Родителски портал) бяха окончателно изтрити съгласно чл. 17 от GDPR („Право да бъдеш забравен“).'
      });
    } catch {
      setGdprActionNotice({
        type: 'info',
        text: 'Локалните и сесийните данни бяха изчистени.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSwitchToNecessaryOnlyCookies = () => {
    const prefs = buildConsent({ functional: false, analytics: false, ageConfirmed: true });
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore storage errors
    }
    clearAnalyticsCookies();
    setCookieStatusVersion((v) => v + 1);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: prefs }));
    }
    setGdprActionNotice({
      type: 'success',
      text: 'Съгласието за аналитични бисквитки беше оттеглено и всички бисквитки на GA4/Clarity бяха изчистени.'
    });
  };

  const handleOpenCookieBannerFromModal = () => {
    onClose();
    reopenCookieSettings();
  };

  const analyticsCurrentlyActive =
    currentCookieConsent.status === 'valid' && isAnalyticsAllowed(currentCookieConsent.prefs);

  return (
    <NativeDialog onClose={onClose} labelledBy="legal-modal-title" widthClassName="max-w-4xl">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/90">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Scale className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2 id="legal-modal-title" className="text-sm sm:text-lg font-bold text-slate-900 leading-tight truncate">
                Център за поверителност, бисквитки, ИИ прозрачност & Достъпност
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                StudyBG • Съответствие с GDPR, ЗЗЛД (чл. 25в), EU AI Act (2024/1689), EAA (2019/882) и DSA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Разпечатай или запази като PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span>PDF / Печат</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              aria-label="Затвори прозореца с политики (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Strategic Trust Pillars + Search Strip */}
        <div className="px-5 sm:px-6 py-2.5 bg-slate-50/50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
              <Lock className="w-3 h-3 text-blue-600" aria-hidden="true" />
              Privacy by Design & RLS
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" aria-hidden="true" />
              0 Рекламни тракери
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              <GraduationCap className="w-3 h-3 text-blue-600" aria-hidden="true" />
              8.–12. клас • ДЗИ & ДИППК
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (val.trim() && activeTab !== 'cookies') {
                  const lower = val.toLowerCase();
                  if (lower.includes('studybg_') || lower.includes('_ga') || lower.includes('_cl') || lower.includes('бисквит')) {
                    setActiveTab('cookies');
                  }
                }
              }}
              placeholder="Търси ключ или политика..."
              aria-label="Търси в политиките и регистъра на бисквитките"
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Policy Tab Switcher */}
        <div className="px-5 sm:px-6 pt-2.5 pb-2 border-b border-slate-200 bg-white flex flex-wrap gap-1.5" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'privacy'}
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Поверителност (GDPR)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cookies'}
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cookies'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cookie className="w-4 h-4" aria-hidden="true" />
            <span>Бисквитки & Хранилище ({STORAGE_REGISTRY.length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'ai_act'}
            onClick={() => setActiveTab('ai_act')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ai_act'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" aria-hidden="true" />
            <span>Прозрачност за ИИ (EU AI Act)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'accessibility'}
            onClick={() => setActiveTab('accessibility')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'accessibility'
                ? 'bg-brand-sapphire text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Accessibility className="w-4 h-4" aria-hidden="true" />
            <span>Достъпност (EAA / WCAG)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'terms'}
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>Условия & DSA</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">
          {/* ================================================================= */}
          {/* TAB 1: PRIVACY POLICY (GDPR & ЗЗЛД) */}
          {/* ================================================================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Lock className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  <span>Европейска защита на акаунта и личните данни (Privacy by Design — чл. 25 и чл. 32 от GDPR)</span>
                </div>
                <p>
                  StudyBG е проектирана с минимализиране на данните за ученици (8.–12. клас), родители и учители. Всички 1540 учебни конспекта, флаш карти по системата на Лайтнер, лаборатории и 100-точкови симулатори за ДЗИ и ДИППК се използват <strong>без задължителна регистрация, без ЕГН, телефон или геолокация</strong>. Когато пожелаете да синхронизирате прогреса си между устройства чрез <strong>„Вход с Google“</strong>, вашият акаунт е защитен с криптиран протокол <strong>OAuth 2.0 (PKCE)</strong> и изолация <strong>Row-Level Security (RLS)</strong>.
                </p>
              </div>

              {/* Interactive GDPR Data Subject Rights Center (Art. 15, Art. 17 & Art. 20) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Интерактивен GDPR Център за управление на акаунта и данните (1-клик)
                    </h3>
                    <p className="text-xs text-slate-500">
                      {activeGoogleProfile && !activeGoogleProfile.isAnonymous
                        ? `Активен Google акаунт: ${activeGoogleProfile.fullName} (${activeGoogleProfile.email || 'Google OAuth'}) — упражнете незабавно правата си по чл. 15, чл. 20 и чл. 17 от GDPR:`
                        : 'Упражнете незабавно правата си по чл. 15/20 (преносимост в JSON) и чл. 17 („право да бъдеш забравен“) от Регламент (ЕС) 2016/679:'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleExportUserData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                    <span>Изтегли моите данни (JSON • Чл. 15 и Чл. 20 GDPR)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenCookieBannerFromModal}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    <Cookie className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                    <span>Настройки на бисквитките</span>
                  </button>

                  {!confirmWipe ? (
                    <button
                      type="button"
                      onClick={() => setConfirmWipe(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
                      <span>Изтрий облачния акаунт и всички данни (Чл. 17 GDPR)</span>
                    </button>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2 bg-rose-50 border border-rose-300 px-3 py-1.5 rounded-xl">
                      <span className="text-xs font-bold text-rose-900">
                        Потвърждавате ли пълно изтриване на облачния и локалния профил?
                      </span>
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={handleEraseAllUserData}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-xs font-bold cursor-pointer"
                      >
                        {isDeleting ? 'Изтриване...' : 'Да, изтрий всичко'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmWipe(false)}
                        className="px-2 py-1 rounded-lg bg-white text-slate-600 border border-slate-200 text-xs font-semibold cursor-pointer"
                      >
                        Отказ
                      </button>
                    </div>
                  )}
                </div>

                {gdprActionNotice && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{gdprActionNotice.text}</span>
                  </div>
                )}
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Нормативна уредба и правно основание</h3>
                <p>
                  Настоящата Политика за поверителност и защита на потребителския акаунт е изготвена в пълно съответствие с <strong>Регламент (ЕС) 2016/679 (Общ регламент относно защитата на данните — GDPR)</strong> и <strong>Закона за защита на личните данни (ЗЗЛД)</strong> на Република България.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  2. Защита на Google акаунта, Leitner системата и Родителския портал (Чл. 6, Чл. 13 и Чл. 32 от GDPR)
                </h3>
                <ul className="list-disc list-inside space-y-2 pl-1">
                  <li>
                    <strong>Опционален вход с Google акаунт (OAuth 2.0 с PKCE):</strong> Когато доброволно натиснете бутона <em>„Вход с Google“</em>, автентикацията се извършва директно през официалните сървъри на Google чрез криптиран протокол OAuth 2.0 (OpenID Connect). <strong>StudyBG никога не получава, не вижда и не съхранява вашата парола в Google.</strong>
                  </li>
                  <li>
                    <strong>Минимален обхват на данните в профила и облачна синхронизация:</strong> В таблицата <code className="text-xs tabular-nums">public.user_profiles</code> се записват единствено базовите идентификатори от Google профила ви (<code className="text-xs tabular-nums">user_id</code>, име, имейл и адрес на профилна снимка) заедно с учебния ви прогрес в JSONB полето <code className="text-xs tabular-nums">study_progress</code> (усвоени уроци, XP точки, дневна серия Streak, 5-те кутии на Лайтнер за флаш карти, Банка с грешки и история на изпитните симулации) с единствена цел синхронизация между вашите устройства (чл. 6, ал. 1, б. „б“ от GDPR).
                  </li>
                  <li>
                    <strong>Родителски портал (<code className="text-xs tabular-nums">MP-XXXXXX</code>) и Седмичен родителски дайджест:</strong> В секция „Моят План за 6.00“ ученикът може по желание да генерира 6-знаков код за сдвояване с родител и да въведе родителски имейл за автоматичен седмичен отчет за напредъка (решени задачи, точност в %, усвоени флаш карти в Кутия 5 на Лайтнер и слаби теми за фокус). Имейлът се използва <strong>единствено за изпращане на седмичния образователен отчет</strong> и може да бъде премахнат с 1 клик („Прекъсни връзката“) по всяко време.
                  </li>
                  <li>
                    <strong>Криптирана изолация на ниво ред (Row-Level Security — Чл. 32 от GDPR):</strong> Базата данни в Supabase PostgreSQL прилага строги правила за достъп (<code className="text-xs tabular-nums">user_id = auth.uid()</code>), при които всеки потребител може да чете, обновява или изтрива единствено собствения си профил чрез криптографски подписан JWT токен по TLS 1.3.
                  </li>
                  <li>
                    <strong>Сканирани записки и есета (SmartScan & Задача 41):</strong> Снимките на тетрадки или текстовете на есета се предават криптирано (TLS 1.3) в реално време към Google Gemini API единствено за генериране на образователна обратна връзка по критериите на МОН и не се съхраняват на наши сървъри.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  3. Обработващи лични данни и технологични партньори (Чл. 28 от GDPR)
                </h3>
                <p>
                  StudyBG не продава и не предоставя данни на рекламни мрежи. За техническото функциониране на облачните, имейл и ИИ функции използваме следните сертифицирани инфраструктурни партньори при спазване на Стандартните договорни клаузи на Европейската комисия (SCCs):
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-1">
                  <li>
                    <strong>Supabase Inc.</strong> — управлявана PostgreSQL база данни и OAuth 2.0 автентикация със строга Row-Level Security (RLS) защита за облачните потребителски профили (<code className="text-xs tabular-nums">user_profiles</code>), историята на изпитните симулации (<code className="text-xs tabular-nums">exam_attempts</code>) и абонатите на бюлетина;
                  </li>
                  <li>
                    <strong>Vercel Inc.</strong> — облачен хостинг, Serverless API функции (<code className="text-xs tabular-nums">/api/send-email</code>) и глобална доставка (CDN) с принудително HTTPS/TLS 1.3 криптиране;
                  </li>
                  <li>
                    <strong>Resend Inc.</strong> — защитен транзакционен имейл сървър за изпращане на Седмичния родителски дайджест (Parent Portal) и потвърждения за учебния бюлетин;
                  </li>
                  <li>
                    <strong>Google Ireland Limited (Google OAuth 2.0 & Google Gemini API)</strong> — сигурна идентификация при вход с Google акаунт и обработка на учебен текст/ръкопис по заявка на потребителя;
                  </li>
                  <li>
                    <strong>Google Ireland Limited (Google Analytics 4)</strong> — агрегирана статистика за посещенията със забранени рекламни сигнали (<code className="text-xs tabular-nums">allow_google_signals: false</code>), зареждана само след изрично съгласие;
                  </li>
                  <li>
                    <strong>Microsoft Ireland Operations Limited (Microsoft Clarity)</strong> — анонимизирани топлинни карти на интерфейса, зареждани само след изрично съгласие.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  4. Възрастова граница за дигитално съгласие и защита на ученици (Чл. 8 от GDPR и чл. 25в от ЗЗЛД)
                </h3>
                <p>
                  Съгласно <strong>чл. 25в от българския Закон за защита на личните данни (ЗЗЛД)</strong> минималната възраст за самостоятелно даване на съгласие за услуги на информационното общество в Република България е <strong>14 години</strong>. Тъй като StudyBG е специализирана за ученици в <strong>гимназиален етап (8.–12. клас, 14–19 г.), ДЗИ и ДИППК</strong>, гимназистите над 14 г. могат да управляват своя избор самостоятелно. Посетители под 14-годишна възраст могат да използват свободно всички учебни модули с настройка <strong>„Само необходими“</strong>, а съгласието за опционална аналитика или имейл абонамент за лица под 14 г. се дава от родител или законен настойник.
                </p>
              </section>

              {/* Interactive Formal GDPR Request Generator (ported from MaturaPlus PrivacyHubClient) */}
              <section className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    5. Генератор на официално писмено заявление по GDPR (Чл. 15, 16, 17 и 20)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Освен автоматичните бутони с 1 клик по-горе, можете да генерирате официално правно заявление за достъп, коригиране, изтриване или преносимост:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="gdpr-request-type" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Вид на искането по GDPR
                    </label>
                    <select
                      id="gdpr-request-type"
                      value={gdprRequestType}
                      onChange={(e) => setGdprRequestType(e.target.value as GdprRequestType)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 font-medium"
                    >
                      <option value="access">Чл. 15 — Достъп до лични данни</option>
                      <option value="rectification">Чл. 16 — Коригиране на неточни данни</option>
                      <option value="erasure">Чл. 17 — Изтриване („Право да бъдеш забравен“)</option>
                      <option value="portability">Чл. 20 — Преносимост на данните</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gdpr-requester-email" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Имейл или код от Родителския портал (MP-XXXXXX)
                    </label>
                    <input
                      id="gdpr-requester-email"
                      type="text"
                      value={gdprRequesterEmail}
                      onChange={(e) => setGdprRequesterEmail(e.target.value)}
                      placeholder={activeGoogleProfile?.email || 'student@example.com или MP-A7K9Q2'}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gdpr-requester-note" className="block text-[11px] font-bold text-slate-700 mb-1">
                    Допълнително уточнение (по желание)
                  </label>
                  <input
                    id="gdpr-requester-note"
                    type="text"
                    value={gdprRequesterNote}
                    onChange={(e) => setGdprRequesterNote(e.target.value)}
                    placeholder="Напр. отписване на родителски имейл от седмичния дайджест..."
                    className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-800"
                  />
                </div>

                <pre className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-700 whitespace-pre-wrap font-mono leading-relaxed">
                  {generatedGdprRequestText}
                </pre>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyGdprTemplate}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedGdprTemplate ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Заявлението е копирано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Копирай текста на заявлението</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:privacy@studybg.eu?subject=${encodeURIComponent(
                      `GDPR Заявление (${GDPR_REQUEST_LABELS[gdprRequestType].article})`
                    )}&body=${encodeURIComponent(generatedGdprRequestText)}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                    <span>Отвори в имейл клиент</span>
                  </a>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">6. Надзорен орган в Република България (Чл. 77 от GDPR)</h3>
                <p>
                  Всеки потребител има право да подаде жалба относно обработването на личните му данни пред компетентния български надзорен орган:
                </p>
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">Комисия за защита на личните данни (КЗЛД)</div>
                  <div>Адрес: гр. София 1592, бул. „Проф. Цветан Лазаров“ № 2</div>
                  <div>
                    Имейл: <span className="tabular-nums">kzld@cpdp.bg</span> • Уебсайт:{' '}
                    <a
                      href="https://www.cpdp.bg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-0.5"
                    >
                      www.cpdp.bg <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: EU AI ACT DISCLOSURE (Регламент (ЕС) 2024/1689) */}
          {/* ================================================================= */}
          {activeTab === 'ai_act' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Cpu className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  <span>
                    Декларация за прозрачност съгласно Европейския акт за изкуствения интелект (EU AI Act — Регламент (ЕС) 2024/1689)
                  </span>
                </div>
                <p>
                  В изпълнение на <strong>чл. 50 от Регламент (ЕС) 2024/1689</strong> (Акт за изкуствения интелект), StudyBG информира всички ученици, родители и учители по ясен и недвусмислен начин относно използването на системи с изкуствен интелект в платформата.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Кои модули използват Изкуствен Интелект</h3>
                <ul className="list-disc list-inside space-y-1.5 pl-1">
                  <li>
                    <strong>SmartScan („Снимай тетрадка“ и Одит на записки):</strong> Използва мултимодален модел <em>Google Gemini</em> за оптично разпознаване на ръкописен текст (OCR) и съпоставянето му с ключовите точки от учебната програма на МОН.
                  </li>
                  <li>
                    <strong>AI Оценител на Есе и Интерпретативно съчинение (Задача 41 в 100т. Симулатор за ДЗИ):</strong> Използва генеративен езиков модел (<em>Google Gemini</em>) за ориентировъчен анализ по 4-те критерия на МОН (К1: Литературни/философски компетентности, К2: Смислова свързаност, К3: Езикови норми, К4: Правопис и пунктуация).
                  </li>
                  <li>
                    <strong>AI Ментор към учебните конспекти (1540 урока по МОН):</strong> Интерактивен академичен асистент във всеки урок, който отговаря на въпроси на ученика, извежда тези за матура и генерира примерни изпитни въпроси по темата.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  2. Принцип „Човек в процеса“ (Human-in-the-Loop — Чл. 14 от EU AI Act)
                </h3>
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong>Важно правно уточнение:</strong> Генерираните от ИИ точки, коментари и приравнени оценки по шестобалната система (от 2.00 до 6.00) имат <strong>изцяло консултативен, симулационен и самообразователен характер</strong>. Те НЕ представляват автоматизирано вземане на решения с правни последици по смисъла на чл. 22 от GDPR и НЕ заместват официалната педагогическа оценка от учител или национална изпитна комисия към МОН.
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  3. Забранени практики и защита от биометрично профилиране (Чл. 5 от EU AI Act)
                </h3>
                <p>В пълно съответствие с етичните стандарти на ЕС за ИИ в образованието, StudyBG гарантира, че:</p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>
                    <strong>Не извършва</strong> разпознаване на емоции, психологическо профилиране или оценка на личностни характеристики на ученика;
                  </li>
                  <li>
                    <strong>Не извършва</strong> биометрична идентификация или графологична експертиза на почерка при сканиране на тетрадки;
                  </li>
                  <li>Снимките на ръкописни записки не се съхраняват след приключване на анализа в браузъра.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">4. Точност и критична проверка на ИИ отговори</h3>
                <p>
                  Въпреки високата прецизност на езиковите модели, генеративният ИИ може в редки случаи да допусне фактически неточности. Поради това всички 1540 основни конспекта, дати, мирни договори, формули и „Златни правила за 6.00“ в StudyBG са <strong>статично верифицирани по програмите на МОН</strong> и служат като еталонна референция.
                </p>
              </section>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: ACCESSIBILITY STATEMENT (EAA — Директива (ЕС) 2019/882) */}
          {/* ================================================================= */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Accessibility className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>
                    Декларация за достъпност съгласно Европейския акт за достъпност (Директива (ЕС) 2019/882 & EN 301 549)
                  </span>
                </div>
                <p>
                  StudyBG се ангажира да осигури равен и безпрепятствен дигитален достъп до образование за всички ученици, включително лица със зрителни, слухови, моторни или специфични обучителни потребности (дислексия, дефицит на вниманието), в съответствие със стандарта <strong>WCAG 2.1 ниво AA</strong>.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">1. Внедрени функции за достъпност в StudyBG</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <Volume2 className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      <span>Гласов четец (Аудио синтез)</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Всеки учебен конспект разполага с вграден български гласов синтез (Text-to-Speech) с регулиране на скоростта (0.85x, 1.0x, 1.25x) в подкрепа на незрящи ученици и ученици с дислексия.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <Keyboard className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                      <span>Клавиатурна навигация</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Пълна навигация без мишка чрез <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Tab</kbd>, бързо търсене с <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Ctrl+K</kbd>, обръщане на Leitner карти със <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Space</kbd> и затваряне на диалози с <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">Escape</kbd>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <Eye className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      <span>Висок контраст & Намалено движение</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Контрастно съотношение над 4.5:1 (WCAG AA) и автоматично зачитане на системната настройка <code className="text-[10px]">prefers-reduced-motion</code> за хора с вестибуларна чувствителност.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Технически стандарти и съвместимост</h3>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>
                    Семантичен HTML5 маркъп, нативни модални прозорци (<code className="text-xs">&lt;dialog&gt;</code>) и WAI-ARIA атрибути (<code className="text-xs">aria-label</code>, <code className="text-xs">aria-labelledby</code>, <code className="text-xs">role="tablist"</code>) за съвместимост с екранни четци (NVDA, JAWS, VoiceOver, TalkBack);
                  </li>
                  <li>Мащабиране на текста до 200% без хоризонтално превъртане и без загуба на функционалност на 375 px мобилен екран;</li>
                  <li>Пълна работоспособност при ниска скорост на интернет или в офлайн режим чрез Progressive Web App (PWA) технология.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">3. Обратна връзка и сигнали за достъпност</h3>
                <p>
                  Ако срещнете затруднение с достъпността на който и да е елемент в StudyBG или се нуждаете от учебен материал в алтернативен адаптивен формат, можете да подадете сигнал чрез официалното хранилище на проекта. Сигналите по Закона за достъпност се разглеждат приоритетно в срок до 14 дни.
                </p>
              </section>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: COOKIE & STORAGE POLICY (ePrivacy Directive) */}
          {/* ================================================================= */}
          {activeTab === 'cookies' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <Cookie className="w-4 h-4 text-amber-600" aria-hidden="true" />
                  <span>Прозрачност съгласно Директива 2002/58/ЕО (ePrivacy) и чл. 25в ЗЗЛД</span>
                </div>
                <p>
                  StudyBG <strong>не използва рекламни бисквитки и пиксели на социални мрежи</strong>. Учебният прогрес, 5-те кутии на Лайтнер и кодът за Родителския портал се пазят в локалното хранилище на браузъра (Web LocalStorage). <strong>Само с изрично съгласие</strong> („Приемам всички“) се зареждат Google Analytics 4 (със спряна рекламна персонализация) и Microsoft Clarity.
                </p>
              </div>

              {/* Live Cookie Consent Status & Quick Controls */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Текущ статус на бисквитките на това устройство:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                        analyticsCurrentlyActive
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {currentCookieConsent.status !== 'valid'
                        ? 'Очаква избор (Само необходими по подразбиране)'
                        : analyticsCurrentlyActive
                        ? 'Всички разрешени (вкл. GA4 & Clarity)'
                        : 'Само необходими (Аналитиката е изключена)'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Можете да промените или оттеглите съгласието си по всяко време с 1 клик без загуба на учебен прогрес.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleOpenCookieBannerFromModal}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Промени настройките</span>
                  </button>

                  {analyticsCurrentlyActive && (
                    <button
                      type="button"
                      onClick={handleSwitchToNecessaryOnlyCookies}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                      <span>Оттегли аналитиката</span>
                    </button>
                  )}
                </div>
              </div>

              {gdprActionNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>{gdprActionNotice.text}</span>
                </div>
              )}

              <section className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    1. Пълен регистър на използваните ключове в LocalStorage, Cache и Бисквитки ({filteredRegistry.length})
                  </h3>
                  {searchQuery.trim() && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      Покажи всички ({STORAGE_REGISTRY.length})
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">Ключ / Име</th>
                        <th className="p-3">Категория</th>
                        <th className="p-3">Предназначение</th>
                        <th className="p-3">Срок</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredRegistry.map((row) => (
                        <tr key={row.keyName} className="hover:bg-slate-50/80">
                          <td className="p-3 tabular-nums font-mono text-[11px] text-blue-700 font-semibold">
                            {row.keyName}
                          </td>
                          <td className="p-3 font-medium text-slate-800">{row.category}</td>
                          <td className="p-3 text-slate-600">{row.purpose}</td>
                          <td className="p-3 text-slate-500 whitespace-nowrap">{row.retention}</td>
                        </tr>
                      ))}
                      {filteredRegistry.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-6 text-center text-slate-500">
                            Няма намерени ключове за „{searchQuery}“.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">2. Управление и моментално изтриване</h3>
                <p>
                  Можете да изтриете всички изброени по-горе записи с 1 клик чрез бутона <strong>„Изтрий облачния акаунт и всички данни (Чл. 17 GDPR)“</strong> в таб <em>„Поверителност (GDPR)“</em> на този прозорец или да оттеглите аналитичните бисквитки чрез бутона <strong>„Промени настройките“</strong> по-горе.
                </p>
              </section>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5: TERMS OF SERVICE & DIGITAL SERVICES ACT (DSA) */}
          {/* ================================================================= */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <GraduationCap className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  <span>Образователна мисия, МОН стандарти и Акт за цифровите услуги (DSA)</span>
                </div>
                <p>
                  StudyBG е безвъзмездна образователна платформа за гимназиален етап (8.–12. клас), ДЗИ (Матура) и ДИППК (Трета СПК), функционираща в съответствие с българското законодателство и <strong>Регламент (ЕС) 2022/2065 (Акт за цифровите услуги — Digital Services Act)</strong>.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">1. Обхват на образователните услуги</h3>
                <p>
                  С използването на учебните инструменти (1540 конспекта, 9312 тестови въпроса, флаш карти по системата на Лайтнер, Родителски портал със седмичен дайджест, лаборатории по БЕЛ, STEM/Математика, История и География, 100-точков симулатор и SmartScan) потребителят приема настоящите Общи условия.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  2. Съответствие с програмите на МОН и правен статут на симулациите
                </h3>
                <p>
                  Учебното съдържание е структурирано съгласно действащите учебно-изпитни програми на Министерството на образованието и науката (МОН) за 8.–12. клас, ДЗИ и ДИППК. StudyBG е независима образователна платформа и не е административен орган на МОН. Резултатите от тестовете и калкулатора на оценки служат за самоподготовка и ориентир.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  3. Механизъм за подаване на сигнали по Акта за цифровите услуги (Чл. 16 от DSA)
                </h3>
                <p>
                  Съгласно Регламент (ЕС) 2022/2065 (Digital Services Act), всеки ученик, учител или родител има право да подаде сигнал за:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>Фактическа, граматическа или математическа неточност в учебен конспект или тестови въпрос;</li>
                  <li>Некоректен резултат, генериран от ИИ модула при проверка на записки или есе;</li>
                  <li>Техническа нередност или нарушение на авторски права.</li>
                </ul>
                <p className="text-xs text-slate-500 pt-1">
                  Единна точка за контакт по DSA и потребителски въпроси: официалното GitHub хранилище на проекта (<code className="text-xs">github.com/vasilevvasil200630-ctrl/studybg</code>).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  4. Интелектуална собственост и защита на потребителите (ЗЗП)
                </h3>
                <p>
                  Авторските учебни синтези, алгоритми и интерактивни лаборатории могат да се използват свободно и безплатно от ученици и учители в класната стая за некомерсиални образователни цели. Надзорен орган по правата на потребителите в България е{' '}
                  <strong>
                    Комисията за защита на потребителите (КЗП —{' '}
                    <a
                      href="https://kzp.bg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      kzp.bg
                    </a>
                    )
                  </strong>
                  .
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>
              Последна актуализация по стандартите на ЕС:{' '}
              {new Date().toLocaleDateString('bg-BG', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Разбрах и затвори
          </button>
        </div>
      </div>
    </NativeDialog>
  );
};
