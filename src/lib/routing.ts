import type { AppNavTab } from '../components/Navbar';
import type { CultureSubTab } from '../components/CultureHero';

export const SITE_ORIGIN = 'https://studybg.vercel.app';

export type AppRoute =
  | { portal: 'study'; tab: AppNavTab; lessonId?: string }
  | { portal: 'culture'; subTab: CultureSubTab };

export const CULTURE_SUBTABS: readonly CultureSubTab[] = [
  'mysteries',
  'mysticmap',
  'heritage',
  'wonders',
  'trivia',
  'myths',
  'timeline',
  'cases',
  'wisdom'
];

// Стари hash адреси (/#unesco, /#knowledge…), които трябва да продължат да работят
const LEGACY_CULTURE_ALIASES: Record<string, CultureSubTab> = {
  culture: 'mysteries',
  mysteries: 'mysteries',
  knowledge: 'mysteries',
  heritage: 'heritage',
  unesco: 'heritage',
  inventions: 'heritage',
  mysticmap: 'mysticmap',
  timeline: 'timeline',
  trivia: 'trivia',
  myths: 'myths',
  wonders: 'wonders',
  wisdom: 'wisdom'
};

const LEGACY_STUDY_ALIASES: Record<string, AppNavTab> = {
  study: 'home',
  home: 'home',
  cases: 'cases',
  casestudies: 'cases'
};

const HOME_ROUTE: AppRoute = { portal: 'study', tab: 'home' };

/** Чист URL за маршрут: '/', '/simulator', '/lesson/<id>', '/culture', '/culture/mysticmap' */
export function routeToPath(route: AppRoute): string {
  if (route.portal === 'culture') {
    return route.subTab === 'mysteries' ? '/culture' : `/culture/${route.subTab}`;
  }
  if (route.lessonId) {
    return `/lesson/${encodeURIComponent(route.lessonId)}`;
  }
  return route.tab === 'home' ? '/' : `/${route.tab}`;
}

function parseLegacyHash(hash: string, studyTabs: readonly AppNavTab[]): AppRoute | null {
  const key = hash.replace(/^#/, '').trim();
  if (!key) return null;
  if (key.startsWith('lesson-') && key.length > 'lesson-'.length) {
    return { portal: 'study', tab: 'summary', lessonId: key.slice('lesson-'.length) };
  }
  if (key in LEGACY_STUDY_ALIASES) return { portal: 'study', tab: LEGACY_STUDY_ALIASES[key] };
  if (key in LEGACY_CULTURE_ALIASES) return { portal: 'culture', subTab: LEGACY_CULTURE_ALIASES[key] };
  if ((studyTabs as readonly string[]).includes(key)) return { portal: 'study', tab: key as AppNavTab };
  return null; // напр. котви като #workspace — не са маршрут
}

const safeDecode = (segment: string): string => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};

export interface ParsedLocation {
  /** null = непознат адрес */
  route: AppRoute | null;
  /** Маршрутът е дошъл от стар /#hash адрес и URL-ът трябва да се изчисти */
  fromLegacyHash: boolean;
}

export function parseLocation(pathname: string, hash: string, studyTabs: readonly AppNavTab[]): ParsedLocation {
  const legacy = parseLegacyHash(hash, studyTabs);
  if (legacy) {
    return { route: legacy, fromLegacyHash: true };
  }

  const parts = pathname.split('/').filter(Boolean).map(safeDecode);
  if (parts.length === 0) {
    return { route: HOME_ROUTE, fromLegacyHash: false };
  }

  if (parts[0] === 'culture') {
    if (parts.length === 1) return { route: { portal: 'culture', subTab: 'mysteries' }, fromLegacyHash: false };
    const sub = parts[1] as CultureSubTab;
    return {
      route: parts.length === 2 && CULTURE_SUBTABS.includes(sub) ? { portal: 'culture', subTab: sub } : null,
      fromLegacyHash: false
    };
  }

  if (parts[0] === 'lesson') {
    return {
      route: parts.length === 2 && parts[1] ? { portal: 'study', tab: 'summary', lessonId: parts[1] } : null,
      fromLegacyHash: false
    };
  }

  if (parts.length === 1 && parts[0] !== 'home' && (studyTabs as readonly string[]).includes(parts[0])) {
    return { route: { portal: 'study', tab: parts[0] as AppNavTab }, fromLegacyHash: false };
  }

  return { route: null, fromLegacyHash: false };
}

/** pushState само при реална промяна на адреса (стар hash също се счита за промяна) */
export function pushRoute(route: AppRoute): void {
  const path = routeToPath(route);
  if (window.location.pathname !== path || window.location.hash) {
    window.history.pushState(null, '', path);
  }
}

/** Канонен URL и og:url за текущата страница — иначе всички пътища сочат към началната */
export function syncCanonicalUrl(pathname: string): void {
  const href = `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname}`;
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', href);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', href);
}
