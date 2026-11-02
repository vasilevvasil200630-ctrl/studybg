/**
 * Съгласие за бисквитки (GDPR / ePrivacy) + потвърждение за възраст по чл. 25в ЗЗЛД:
 * за лица под 14 г. съгласието за аналитика се дава от родител/настойник.
 * Аналитиката се включва САМО при analytics === true И ageConfirmed === true.
 */
export const COOKIE_STORAGE_KEY = 'studybg_cookie_consent';
export const CONSENT_VERSION = 2;
export const COOKIE_BANNER_REOPEN_EVENT = 'studybg:reopen-cookie-banner';
export const COOKIE_CONSENT_UPDATED_EVENT = 'studybg:cookie-consent-updated';

export interface CookiePreferences {
  version: typeof CONSENT_VERSION;
  necessary: true;
  functional: boolean;
  analytics: boolean;
  /** „Имам навършени 14 години или действам със съгласието на родител/настойник“ */
  ageConfirmed: boolean;
  timestamp: string;
}

export const AGE_CONFIRMATION_TEXT =
  'Потвърждавам, че имам навършени 14 години или действам със съгласието на родител/настойник (чл. 25в ЗЗЛД).';

/** Единственото място, което решава дали аналитиката може да се зареди. */
export const isAnalyticsAllowed = (prefs: Partial<CookiePreferences> | null | undefined): boolean =>
  prefs?.analytics === true && prefs?.ageConfirmed === true;

/** Записът винаги е консистентен: без потвърдена възраст аналитиката е изключена. */
export function buildConsent(choice: { functional: boolean; analytics: boolean; ageConfirmed: boolean }, now = new Date()): CookiePreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    functional: choice.functional,
    analytics: choice.analytics && choice.ageConfirmed,
    ageConfirmed: choice.ageConfirmed,
    timestamp: now.toISOString()
  };
}

export type StoredConsentState =
  | { status: 'missing' }
  /** Невалиден запис или старо съгласие за аналитика без потвърдена възраст → питаме отново */
  | { status: 'renew' }
  | { status: 'valid'; prefs: CookiePreferences };

export function parseStoredConsent(raw: string | null): StoredConsentState {
  if (!raw) return { status: 'missing' };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { status: 'renew' };
  }
  if (!parsed || typeof parsed !== 'object') return { status: 'renew' };
  const p = parsed as Partial<CookiePreferences>;

  const analytics = p.analytics === true;
  const ageConfirmed = p.ageConfirmed === true;
  // Съгласие от v1 (без възраст), дадено за аналитика → не важи, питаме отново
  if (analytics && !ageConfirmed) return { status: 'renew' };

  return {
    status: 'valid',
    prefs: {
      version: CONSENT_VERSION,
      necessary: true,
      functional: p.functional !== false,
      analytics,
      ageConfirmed,
      timestamp: typeof p.timestamp === 'string' ? p.timestamp : new Date(0).toISOString()
    }
  };
}

/**
 * Изтрива аналитичните бисквитки на Google Analytics 4 (_ga, _ga_*, _gid, _gat)
 * и Microsoft Clarity (_clck, _clsk, CLID, MUID, ANONCHK, SM) при оттегляне на съгласието.
 */
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  const host = window.location.hostname;
  const parts = host.split('.');
  const rootDomain = parts.length >= 2 ? `.${parts.slice(-2).join('.')}` : host;
  const domains = ['', host, `.${host}`, rootDomain];

  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (!/^(_ga|_gid|_gat|_clck|_clsk|CLID|MUID|ANONCHK|SM)(_|$)/.test(name)) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        domain ? `; domain=${domain}` : ''
      }; SameSite=Lax`;
    });
  });
}

/** Отваря отново банера за настройки на бисквитките (напр. от Политиката за поверителност или футъра). */
export function reopenCookieSettings(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(COOKIE_BANNER_REOPEN_EVENT));
}
