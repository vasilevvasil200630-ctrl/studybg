import React, { useState, useEffect, useRef } from 'react';
import { Cookie, ShieldCheck, Check, Settings, X, Lock, CheckCircle2 } from 'lucide-react';
import type { LegalPolicyTab } from './LegalPoliciesModal';
import {
  AGE_CONFIRMATION_TEXT,
  COOKIE_BANNER_REOPEN_EVENT,
  COOKIE_CONSENT_UPDATED_EVENT,
  COOKIE_STORAGE_KEY,
  buildConsent,
  clearAnalyticsCookies,
  isAnalyticsAllowed,
  parseStoredConsent,
  type CookiePreferences
} from '../lib/consent';

interface CookieConsentBannerProps {
  onOpenPolicy: (tab: LegalPolicyTab) => void;
  forceOpen?: boolean;
  onCloseForceOpen?: () => void;
}

const readStoredConsent = (): ReturnType<typeof parseStoredConsent> => {
  if (typeof window === 'undefined') return { status: 'missing' };
  try {
    return parseStoredConsent(localStorage.getItem(COOKIE_STORAGE_KEY));
  } catch {
    return { status: 'missing' };
  }
};

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPolicy,
  forceOpen = false,
  onCloseForceOpen
}) => {
  // Съгласието се чете синхронно при първия рендер
  const [initialConsent] = useState(readStoredConsent);
  const initialPrefs = initialConsent.status === 'valid' ? initialConsent.prefs : null;

  const [isVisible, setIsVisible] = useState<boolean>(initialConsent.status !== 'valid');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [savedConsent, setSavedConsent] = useState<CookiePreferences | null>(initialPrefs);
  const [functionalConsent, setFunctionalConsent] = useState<boolean>(initialPrefs?.functional ?? true);
  // Аналитиката е строго opt-in: GA4 и Clarity се зареждат САМО след изрично съгласие
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(initialPrefs?.analytics ?? false);
  // StudyBG е насочена към гимназиален етап (8.–12. клас, 14–19 г.); по подразбиране отметката е активна,
  // но в настройките може да бъде изключена (напр. за посетител под 14 г. без родител).
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(initialPrefs?.ageConfirmed ?? true);
  const [ageError, setAgeError] = useState<string | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (forceOpen) {
      setIsVisible(true);
    }
  }, [forceOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleReopen = () => {
      const latest = readStoredConsent();
      if (latest.status === 'valid') {
        setSavedConsent(latest.prefs);
        setFunctionalConsent(latest.prefs.functional);
        setAnalyticsConsent(latest.prefs.analytics);
        setAgeConfirmed(latest.prefs.ageConfirmed || true);
      }
      setAgeError(null);
      setIsVisible(true);
      setShowSettings(true);
    };
    window.addEventListener(COOKIE_BANNER_REOPEN_EVENT, handleReopen);
    return () => window.removeEventListener(COOKIE_BANNER_REOPEN_EVENT, handleReopen);
  }, []);

  // Докато банерът е показан, добавяме долен отстъп на страницата, за да не закрива бутони и линкове във футъра
  const bannerShown = isVisible || forceOpen;
  useEffect(() => {
    const el = bannerRef.current;
    if (!bannerShown || !el || typeof window === 'undefined') return;
    const updatePadding = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    updatePadding();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updatePadding) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      document.body.style.paddingBottom = '';
    };
  }, [bannerShown, showSettings]);

  const analyticsAllowed = isAnalyticsAllowed(savedConsent);

  useEffect(() => {
    if (!analyticsAllowed || typeof window === 'undefined') return;
    const rawGaId = (import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-EE8QCTTSKD').trim();
    const rawClarityId = (import.meta.env.VITE_CLARITY_PROJECT_ID || 'yqlqdpk1li').trim();
    const gaId = /^G-[A-Z0-9]+$/.test(rawGaId) ? rawGaId : '';
    const clarityId = /^[a-z0-9]+$/i.test(rawClarityId) ? rawClarityId : '';

    if (gaId && !document.getElementById('studybg-ga-script')) {
      const s = document.createElement('script');
      s.id = 'studybg-ga-script';
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
      document.head.appendChild(s);

      const inline = document.createElement('script');
      inline.id = 'studybg-ga-config';
      inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{allow_google_signals:false,allow_ad_personalization_signals:false});`;
      document.head.appendChild(inline);
    }

    if (clarityId && !document.getElementById('studybg-clarity-script')) {
      const c = document.createElement('script');
      c.id = 'studybg-clarity-script';
      c.async = true;
      c.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");window.clarity&&window.clarity("consent");`;
      document.head.appendChild(c);
    }
  }, [analyticsAllowed]);

  const saveConsent = (prefs: CookiePreferences) => {
    const analyticsWasLoaded = Boolean(
      document.getElementById('studybg-ga-script') || document.getElementById('studybg-clarity-script')
    );
    setSavedConsent(prefs);
    setFunctionalConsent(prefs.functional);
    setAnalyticsConsent(prefs.analytics);
    setAgeConfirmed(prefs.ageConfirmed);
    setAgeError(null);
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // localStorage недостъпен — изборът важи за текущата сесия
    }
    if (!prefs.analytics) {
      clearAnalyticsCookies();
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: prefs }));
    }
    setIsVisible(false);
    setShowSettings(false);
    onCloseForceOpen?.();

    // Оттегляне след като скриптовете вече са заредени: чистим бисквитките и презареждаме,
    // за да не остане активен нито един тракер в текущата сесия
    if (analyticsWasLoaded && !prefs.analytics) {
      window.location.reload();
    }
  };

  const AGE_REQUIRED_MESSAGE =
    'За да включим аналитиката, потвърди възрастта (или съгласието на родител/настойник) — или избери „Само необходими“.';

  const handleAcceptAll = () => {
    if (showSettings && !ageConfirmed) {
      setAgeError(AGE_REQUIRED_MESSAGE);
      return;
    }
    saveConsent(buildConsent({ functional: true, analytics: true, ageConfirmed: true }));
  };

  const handleAcceptNecessary = () => {
    saveConsent(buildConsent({ functional: false, analytics: false, ageConfirmed }));
  };

  const handleSavePreferences = () => {
    if (analyticsConsent && !ageConfirmed) {
      setAgeError(AGE_REQUIRED_MESSAGE);
      return;
    }
    saveConsent(buildConsent({ functional: functionalConsent, analytics: analyticsConsent, ageConfirmed }));
  };

  if (!bannerShown) return null;

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Настройки за бисквитки и поверителност"
      data-print-hide
      className="fixed inset-x-0 bottom-14 lg:bottom-0 z-50 px-3 pb-2.5 sm:px-5 sm:pb-4 animate-fade-in pointer-events-none"
    >
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-slate-300 shadow-2xl rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 pointer-events-auto transition-all">
        {/* Компактен ред: текст + 1-клик бутони */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <Cookie className="w-4 h-4 text-amber-700" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  Бисквитки & Поверителност в StudyBG
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                  GDPR & ЗЗЛД
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Учебният прогрес, флаш картите по Лайтнер и планът за 6.00 се пазят локално в браузъра ви.{' '}
                <strong>По избор</strong> („Приемам всички“) включваме анонимизирана статистика (GA4 & Clarity) за подобряване на уроците — <strong>0 рекламни тракери</strong>.{' '}
                <span className="text-slate-500">
                  Под 14 г.? Избери с родител или „Само необходими“ (чл. 25в ЗЗЛД).
                </span>{' '}
                <button
                  type="button"
                  onClick={() => onOpenPolicy('cookies')}
                  className="font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2"
                >
                  Политика за бисквитки
                </button>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowSettings((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{showSettings ? 'Скрий настройките' : 'Настройки'}</span>
            </button>

            <button
              type="button"
              onClick={handleAcceptNecessary}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 cursor-pointer"
            >
              Само необходими
            </button>

            <button
              type="button"
              onClick={handleAcceptAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Приемам всички</span>
            </button>

            {forceOpen && onCloseForceOpen && (
              <button
                type="button"
                onClick={() => {
                  setIsVisible(false);
                  onCloseForceOpen();
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                aria-label="Затвори панела за бисквитки"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Разширени настройки за персонализиране */}
        {showSettings && (
          <div className="mt-3.5 pt-3.5 border-t border-slate-200 space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                  <span>Строго необходими бисквитки и локално хранилище (Задължителни)</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Осигуряват работата на конспектите, 5-те кутии на Лайтнер за интервално повторение, „Моята програма“ по МОН, Банката с грешки, Родителския портал и офлайн PWA кеша.
                </p>
              </div>
              <span className="px-2 py-1 rounded bg-slate-200 text-slate-700 font-bold text-[10px] shrink-0">
                Винаги активни
              </span>
            </div>

            <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 cursor-pointer">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                  <span>Функционални предпочитания</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Запомнят настройките на изпитния таймер, скоростта на гласовия четец, последния избран предмет и локалния Google Gemini API ключ.
                </p>
              </div>
              <input
                type="checkbox"
                checked={functionalConsent}
                onChange={(e) => setFunctionalConsent(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 mt-1 cursor-pointer shrink-0"
              />
            </label>

            <label className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 cursor-pointer">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900">
                  Аналитични бисквитки (по избор): Google Analytics 4 и Microsoft Clarity
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Помагат ни да разберем кои уроци и матури са най-полезни чрез агрегирана статистика (GA4 със спряна рекламна персонализация) и топлинни карти (Clarity). Можете да оттеглите съгласието си по всяко време с 1 клик.
                </p>
              </div>
              <input
                type="checkbox"
                aria-label="Аналитика (Google Analytics 4 и Microsoft Clarity)"
                aria-describedby="cookie-age-confirmation"
                checked={analyticsConsent && ageConfirmed}
                disabled={!ageConfirmed}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 mt-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 shrink-0"
              />
            </label>

            {/* чл. 25в ЗЗЛД: потвърждение за възраст */}
            <label
              id="cookie-age-confirmation"
              className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-[11px] text-slate-700 leading-relaxed cursor-pointer"
            >
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => {
                  setAgeConfirmed(e.target.checked);
                  if (e.target.checked) setAgeError(null);
                  else setAnalyticsConsent(false);
                }}
                className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 shrink-0 cursor-pointer"
              />
              <span>
                {AGE_CONFIRMATION_TEXT}{' '}
                <span className="text-slate-500">
                  Нужно е само за аналитичните бисквитки — „Само необходими“ работи и без него.
                </span>
              </span>
            </label>

            {ageError && (
              <p role="alert" className="text-[11px] font-semibold text-rose-700">
                {ageError}
              </p>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-slate-500">
                <span>Правни раздели:</span>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('privacy')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Поверителност (GDPR)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('ai_act')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Прозрачност за ИИ (EU AI Act)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('accessibility')}
                  className="text-emerald-700 hover:underline font-medium"
                >
                  Достъпност (EAA)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('cookies')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Пълен регистър на бисквитките
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('terms')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Условия & DSA
                </button>
              </div>

              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-xl bg-brand-sapphire hover:bg-brand-sapphire-dark text-white text-xs font-bold transition-colors shadow-xs cursor-pointer ml-auto"
              >
                Запази моя избор
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
