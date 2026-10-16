import { describe, expect, it } from 'vitest';
import type { AppNavTab } from '../src/components/Navbar';
import { parseLocation, routeToPath, type AppRoute } from '../src/lib/routing';

const STUDY_TABS: AppNavTab[] = ['home', 'simulator', 'catalog', 'cases', 'summary', 'planner'];

describe('routeToPath', () => {
  it('дава чисти адреси без #', () => {
    expect(routeToPath({ portal: 'study', tab: 'home' })).toBe('/');
    expect(routeToPath({ portal: 'study', tab: 'simulator' })).toBe('/simulator');
    expect(routeToPath({ portal: 'study', tab: 'summary', lessonId: 'history-april-uprising' })).toBe('/lesson/history-april-uprising');
    expect(routeToPath({ portal: 'culture', subTab: 'mysteries' })).toBe('/culture');
    expect(routeToPath({ portal: 'culture', subTab: 'mysticmap' })).toBe('/culture/mysticmap');
  });

  it('parseLocation(routeToPath(x)) връща същия маршрут', () => {
    const routes: AppRoute[] = [
      { portal: 'study', tab: 'home' },
      { portal: 'study', tab: 'simulator' },
      { portal: 'study', tab: 'summary', lessonId: 'bel-7-edna-balgarka' },
      { portal: 'culture', subTab: 'mysteries' },
      { portal: 'culture', subTab: 'wisdom' }
    ];
    for (const route of routes) {
      expect(parseLocation(routeToPath(route), '', STUDY_TABS)).toEqual({ route, fromLegacyHash: false });
    }
  });
});

describe('parseLocation — обратна съвместимост със стари /#tab линкове', () => {
  it('/#simulator → /simulator (маркиран за изчистване)', () => {
    expect(parseLocation('/', '#simulator', STUDY_TABS)).toEqual({ route: { portal: 'study', tab: 'simulator' }, fromLegacyHash: true });
  });

  it('псевдоними: #unesco → heritage, #culture → mysteries, #casestudies → cases', () => {
    expect(parseLocation('/', '#unesco', STUDY_TABS).route).toEqual({ portal: 'culture', subTab: 'heritage' });
    expect(parseLocation('/', '#culture', STUDY_TABS).route).toEqual({ portal: 'culture', subTab: 'mysteries' });
    expect(parseLocation('/', '#casestudies', STUDY_TABS).route).toEqual({ portal: 'study', tab: 'cases' });
  });

  it('#lesson-<id> → /lesson/<id>', () => {
    expect(parseLocation('/', '#lesson-math-7-linear-equations', STUDY_TABS).route).toEqual({
      portal: 'study',
      tab: 'summary',
      lessonId: 'math-7-linear-equations'
    });
  });

  it('котва, която не е маршрут (#workspace), не пречи на пътя', () => {
    expect(parseLocation('/catalog', '#workspace', STUDY_TABS)).toEqual({ route: { portal: 'study', tab: 'catalog' }, fromLegacyHash: false });
  });
});

describe('parseLocation — непознати адреси', () => {
  it('връща null за непознат път, грешен културен раздел или /home', () => {
    expect(parseLocation('/nope', '', STUDY_TABS).route).toBeNull();
    expect(parseLocation('/culture/nope', '', STUDY_TABS).route).toBeNull();
    expect(parseLocation('/lesson', '', STUDY_TABS).route).toBeNull();
    expect(parseLocation('/home', '', STUDY_TABS).route).toBeNull();
  });

  it('търпи наклонена черта в края', () => {
    expect(parseLocation('/simulator/', '', STUDY_TABS).route).toEqual({ portal: 'study', tab: 'simulator' });
  });
});
