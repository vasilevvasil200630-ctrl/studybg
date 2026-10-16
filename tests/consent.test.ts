import { describe, expect, it } from 'vitest';
import { buildConsent, isAnalyticsAllowed, parseStoredConsent } from '../src/lib/consent';

describe('съгласие за аналитика + чл. 25в ЗЗЛД', () => {
  it('аналитиката е разрешена само при analytics И потвърдена възраст', () => {
    expect(isAnalyticsAllowed(buildConsent({ functional: true, analytics: true, ageConfirmed: true }))).toBe(true);
    expect(isAnalyticsAllowed(buildConsent({ functional: true, analytics: true, ageConfirmed: false }))).toBe(false);
    expect(isAnalyticsAllowed(buildConsent({ functional: true, analytics: false, ageConfirmed: true }))).toBe(false);
    expect(isAnalyticsAllowed(null)).toBe(false);
  });

  it('buildConsent никога не записва analytics: true без потвърдена възраст', () => {
    const prefs = buildConsent({ functional: true, analytics: true, ageConfirmed: false });
    expect(prefs.analytics).toBe(false);
    expect(prefs.version).toBe(2);
  });

  it('старо съгласие (v1) за аналитика без възраст → питаме отново', () => {
    const v1 = JSON.stringify({ necessary: true, functional: true, analytics: true, timestamp: '2026-10-01T00:00:00.000Z' });
    expect(parseStoredConsent(v1)).toEqual({ status: 'renew' });
  });

  it('старо „Само необходими“ остава валидно без нов въпрос', () => {
    const v1 = JSON.stringify({ necessary: true, functional: false, analytics: false, timestamp: '2026-10-01T00:00:00.000Z' });
    const state = parseStoredConsent(v1);
    expect(state.status).toBe('valid');
    expect(state.status === 'valid' && isAnalyticsAllowed(state.prefs)).toBe(false);
  });

  it('повреден или липсващ запис', () => {
    expect(parseStoredConsent(null)).toEqual({ status: 'missing' });
    expect(parseStoredConsent('{oops')).toEqual({ status: 'renew' });
    expect(parseStoredConsent('null')).toEqual({ status: 'renew' });
  });

  it('валидно ново съгласие се чете обратно без загуби', () => {
    const prefs = buildConsent({ functional: true, analytics: true, ageConfirmed: true }, new Date('2026-10-17T10:00:00Z'));
    const state = parseStoredConsent(JSON.stringify(prefs));
    expect(state).toEqual({ status: 'valid', prefs });
  });
});
