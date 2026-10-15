import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, Settings, X, Lock, CheckCircle2 } from 'lucide-react';
import type { LegalPolicyTab } from './LegalPoliciesModal';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  timestamp: string;
}

const COOKIE_STORAGE_KEY = 'studybg_cookie_consent';

interface CookieConsentBannerProps {
  onOpenPolicy: (tab: LegalPolicyTab) => void;
  forceOpen?: boolean;
  onCloseForceOpen?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPolicy,
  forceOpen = false,
  onCloseForceOpen
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [functionalConsent, setFunctionalConsent] = useState<boolean>(true);
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!stored || forceOpen) {
        setIsVisible(true);
      } else {
        try {
          const parsed: CookiePreferences = JSON.parse(stored);
          setFunctionalConsent(parsed.functional ?? true);
          setAnalyticsConsent(parsed.analytics ?? false);
        } catch {
          setIsVisible(true);
        }
      }
    }
  }, [forceOpen]);

  useEffect(() => {
    if (!analyticsConsent || typeof window === 'undefined') return;
    const gaId = (import.meta.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();
    const clarityId = (import.meta.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || import.meta.env.VITE_CLARITY_PROJECT_ID || '').trim();

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
  }, [analyticsConsent]);

  const saveConsent = (prefs: CookiePreferences) => {
    setFunctionalConsent(prefs.functional);
    setAnalyticsConsent(prefs.analytics);
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    }
    setIsVisible(false);
    setShowSettings(false);
    onCloseForceOpen?.();
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      timestamp: new Date().toISOString()
    });
  };

  const handleAcceptNecessary = () => {
    saveConsent({
      necessary: true,
      functional: false,
      analytics: false,
      timestamp: new Date().toISOString()
    });
  };

  const handleSavePreferences = () => {
    saveConsent({
      necessary: true,
      functional: functionalConsent,
      analytics: analyticsConsent,
      timestamp: new Date().toISOString()
    });
  };

  if (!isVisible && !forceOpen) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 animate-fade-in pointer-events-none">
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
                StudyBG уважава вашата неприкосновеност: използваме единствено функционални бисквитки и локално хранилище (LocalStorage) за съхранение на вашите конспекти, тестови грешки и офлайн PWA кеш, <strong>без рекламно профилиране или предаване на трети страни</strong>.
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
                  Анонимен учебен анализ
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Помага за анонимно оптимизиране на въпросите и времето на симулациите по МОН (без лични профили).
                </p>
              </div>
              <input
                type="checkbox"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 mt-1 cursor-pointer"
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
            className="text-indigo-600 hover:underline font-medium"
          >
            Прозрачност за ИИ (EU AI Act)
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenPolicy('accessibility')}
            className="text-emerald-600 hover:underline font-medium"
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
