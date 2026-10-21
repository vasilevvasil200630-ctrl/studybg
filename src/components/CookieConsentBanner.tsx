import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, Settings, X, Lock, CheckCircle2 } from 'lucide-react';
import type { LegalPolicyTab } from './LegalPoliciesModal';
import {
  AGE_CONFIRMATION_TEXT,
  COOKIE_STORAGE_KEY,
  buildConsent,
  isAnalyticsAllowed,
  parseStoredConsent,
  type CookiePreferences
} from '../lib/consent';

// Изтрива бисквитките на GA4 (_ga, _ga_*) и Clarity (_clck, _clsk) при оттегляне на съгласието
const clearAnalyticsCookies = () => {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (!/^(_ga|_gid|_gat|_clck|_clsk|CLID|MUID)/.test(name)) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    });
  });
};

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
  // Съгласието се чете синхронно при първия рендер: банерът се рисува заедно със съдържанието,
  // а не в отделен по-късен рендер (иначе става LCP елементът и забавя LCP за нови посетители)
  const [initialConsent] = useState(readStoredConsent);
  const initialPrefs = initialConsent.status === 'valid' ? initialConsent.prefs : null;
  // Липсващо, невалидно или старо съгласие без потвърдена възраст → банерът се показва отново
  const [isVisible, setIsVisible] = useState<boolean>(initialConsent.status !== 'valid');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Записаното съгласие решава дали се зарежда аналитиката; полетата по-долу са само чернова в банера
  const [savedConsent, setSavedConsent] = useState<CookiePreferences | null>(initialPrefs);
  const [functionalConsent, setFunctionalConsent] = useState<boolean>(initialPrefs?.functional ?? true);
  // Аналитиката е строго opt-in: GA4 и Clarity се зареждат САМО след изрично съгласие (GDPR / ePrivacy)
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(initialPrefs?.analytics ?? false);
  // чл. 25в ЗЗЛД: под 14 г. съгласието за аналитика се дава от родител/настойник
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(initialPrefs?.ageConfirmed ?? false);
  const [ageError, setAgeError] = useState<string | null>(null);

  useEffect(() => {
    if (forceOpen) setIsVisible(true);
  }, [forceOpen]);

  const analyticsAllowed = isAnalyticsAllowed(savedConsent);

  useEffect(() => {
    if (!analyticsAllowed || typeof window === 'undefined') return;
    const gaId = (import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-EE8QCTTSKD').trim();
    const clarityId = (import.meta.env.VITE_CLARITY_PROJECT_ID || 'yqlqdpk1li').trim();

    if (gaId && !document.getElementById('studybg-ga-script')) {
      const s = document.createElement('script');
      s.id = 'studybg-ga-script';
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
      document.head.appendChild(s);
      const inline = document.createElement('script');
      inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`;
      document.head.appendChild(inline);
    }

    if (clarityId && !document.getElementById('studybg-clarity-script')) {
      const c = document.createElement('script');
      c.id = 'studybg-clarity-script';
      c.async = true;
      c.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`;
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
    setAgeError(null);
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // localStorage недостъпен — изборът важи само за текущата сесия
    }
    setIsVisible(false);
    setShowSettings(false);
    onCloseForceOpen?.();

    // Оттегляне след като скриптовете вече са заредени: чистим бисквитките и презареждаме,
    // за да не остане активен нито един тракер в текущата сесия
    if (analyticsWasLoaded && !prefs.analytics) {
      clearAnalyticsCookies();
      window.location.reload();
    }
  };

  const AGE_REQUIRED_MESSAGE =
    'За да включим аналитиката, потвърди възрастта (или съгласието на родител/настойник) — или избери „Само необходими“.';

  const handleAcceptAll = () => {
    if (!ageConfirmed) {
      setAgeError(AGE_REQUIRED_MESSAGE);
      return;
    }
    saveConsent(buildConsent({ functional: true, analytics: true, ageConfirmed }));
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

  if (!isVisible && !forceOpen) return null;

  return (
    <div data-print-hide className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 animate-fade-in pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-slate-300 shadow-2xl rounded-2xl p-4 sm:p-6 pointer-events-auto transition-all">
        
        {/* Banner Header & Close if forced open */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Cookie className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>Управление на бисквитките & Поверителност</span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  GDPR съвместимо
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Вашите конспекти, грешки и офлайн кеш се пазят само в браузъра ви (LocalStorage). <strong>По избор</strong> и само ако натиснете „Приемам всички“, включваме <strong>Google Analytics 4</strong> и <strong>Microsoft Clarity</strong> — услуги на трети страни (Google и Microsoft), които събират статистика за посещенията и записи на сесиите, за да подобряваме сайта. Без реклами и без продажба на данни. Ако си под 14 години, съгласието за аналитика се дава от родител или настойник (чл. 25в ЗЗЛД).
              </p>
            </div>
          </div>

          {forceOpen && onCloseForceOpen && (
            <button
              onClick={() => { setIsVisible(false); onCloseForceOpen(); }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Затвори"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Detailed Settings Accordion */}
        {showSettings && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-600" />
                  <span>Строго необходими бисквитки (Задължителни)</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Осигуряват базовото функциониране на платформата, запазването на прегледаните теми, флашкартите, банката с грешки и PWA кеша за работа без интернет.
                </p>
              </div>
              <span className="px-2 py-1 rounded bg-slate-200 text-slate-700 font-bold text-[10px] flex-shrink-0">
                Винаги активни
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Функционални предпочитания</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Позволяват запомняне на настройките на изпитния таймер, последния активен раздел и локално съхранения ключ за Google Gemini API.
                </p>
              </div>
              <input
                type="checkbox"
                checked={functionalConsent}
                onChange={(e) => setFunctionalConsent(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 mt-1 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900">
                  Аналитика (по избор): Google Analytics 4 и Microsoft Clarity
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Статистика за посещенията (GA4) и записи на сесии и топлинни карти (Clarity). Данните се обработват от Google и Microsoft като трети страни и се използват бисквитки (_ga, _clck, _clsk). Можете да оттеглите съгласието си по всяко време.
                </p>
              </div>
              <input
                type="checkbox"
                aria-label="Аналитика (Google Analytics 4 и Microsoft Clarity)"
                aria-describedby="cookie-age-confirmation"
                checked={analyticsConsent && ageConfirmed}
                disabled={!ageConfirmed}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 mt-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        )}

        {/* Links to Full Legal Policies */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
          <span>Научете повече:</span>
          <button
            onClick={() => onOpenPolicy('privacy')}
            className="text-blue-600 hover:underline font-medium"
          >
            Поверителност (GDPR)
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenPolicy('ai_act')}
            className="text-blue-600 hover:underline font-medium"
          >
            Прозрачност за ИИ (EU AI Act)
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenPolicy('accessibility')}
            className="text-emerald-700 hover:underline font-medium"
          >
            Достъпност (EAA)
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenPolicy('cookies')}
            className="text-blue-600 hover:underline font-medium"
          >
            Бисквитки
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenPolicy('terms')}
            className="text-blue-600 hover:underline font-medium"
          >
            Условия & DSA
          </button>
        </div>

        {/* чл. 25в ЗЗЛД: потвърждение за възраст, нужно само за аналитиката */}
        <label
          id="cookie-age-confirmation"
          className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-relaxed cursor-pointer"
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
            {AGE_CONFIRMATION_TEXT} <span className="text-slate-500">Нужно е само за аналитиката — „Само необходими“ работи и без него.</span>
          </span>
        </label>
        {ageError && (
          <p role="alert" className="mt-2 text-[11px] font-semibold text-rose-700">
            {ageError}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{showSettings ? 'Скрий настройките' : 'Персонализирай избора'}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 ml-auto">
            {showSettings ? (
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all shadow-xs"
              >
                Запази моя избор
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAcceptNecessary}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
              >
                Само необходими
              </button>
            )}

            <button
              type="button"
              onClick={handleAcceptAll}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Приемам всички</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
