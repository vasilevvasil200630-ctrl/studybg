import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  LEITNER_INTERVAL_DAYS,
  nextDueFromBox,
  applyLeitnerReview,
  boxLabel,
  getLeitnerCardState,
  recordLeitnerCardReview,
  getLeitnerSummaryForCards,
  resetLeitnerCardsForLesson
} from '../src/lib/leitnerFlashcards';
import {
  buildWeeklyDigestHtml,
  maskEmail,
  type WeeklyDigestData
} from '../src/services/mailingService';
import {
  generateParentCode,
  normalizeParentCode,
  stripStudentCodePrefix,
  classifySubject,
  detectCategory,
  bucketByCategory,
  parentPortalService
} from '../src/services/parentPortalService';

beforeEach(() => {
  const store: Record<string, string> = {};
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    },
    clear: () => {
      for (const k of Object.keys(store)) delete store[k];
    }
  });
});

describe('Leitner Spaced Repetition System (ported from MaturaPlus)', () => {
  it('defines canonical 5-box Leitner intervals (1, 3, 7, 14, 30 days)', () => {
    expect(LEITNER_INTERVAL_DAYS).toEqual({
      1: 1,
      2: 3,
      3: 7,
      4: 14,
      5: 30
    });
    expect(boxLabel(1)).toBe('нова');
    expect(boxLabel(3)).toBe('затвърждаване');
    expect(boxLabel(5)).toBe('усвоена');
  });

  it('moves cards between boxes accurately on easy, medium, and hard ratings', () => {
    const fixedNow = new Date('2026-10-31T12:00:00.000Z');

    // Easy advances box by +1 up to 5
    const rEasy = applyLeitnerReview(1, 'easy', fixedNow);
    expect(rEasy.newBox).toBe(2);
    expect(rEasy.nextDueAt.getTime() - fixedNow.getTime()).toBe(3 * 24 * 60 * 60 * 1000);

    // Easy at box 5 stays at box 5 (30d interval)
    const rMax = applyLeitnerReview(5, 'easy', fixedNow);
    expect(rMax.newBox).toBe(5);
    expect(rMax.nextDueAt.getTime() - fixedNow.getTime()).toBe(30 * 24 * 60 * 60 * 1000);

    // Medium keeps current box
    const rMed = applyLeitnerReview(3, 'medium', fixedNow);
    expect(rMed.newBox).toBe(3);
    expect(rMed.nextDueAt.getTime() - fixedNow.getTime()).toBe(7 * 24 * 60 * 60 * 1000);

    // Hard resets to box 1 (1d interval)
    const rHard = applyLeitnerReview(4, 'hard', fixedNow);
    expect(rHard.newBox).toBe(1);
    expect(rHard.nextDueAt.getTime() - fixedNow.getTime()).toBe(1 * 24 * 60 * 60 * 1000);
  });

  it('persists card state and calculates lesson Leitner summary', () => {
    const cardIds = ['c1', 'c2', 'c3'];

    expect(getLeitnerCardState('c1').box).toBe(1);

    const updatedC1 = recordLeitnerCardReview('c1', 'easy');
    expect(updatedC1.box).toBe(2);
    expect(updatedC1.timesEasy).toBe(1);

    const summary = getLeitnerSummaryForCards(cardIds);
    expect(summary.boxCounts[2]).toBe(1);
    expect(summary.boxCounts[1]).toBe(2);
    expect(summary.dueIds).toHaveLength(2); // c2 and c3 have never been reviewed

    resetLeitnerCardsForLesson(cardIds);
    expect(getLeitnerCardState('c1').box).toBe(1);
  });

  it('computes nextDueFromBox properly for out-of-range boxes', () => {
    const now = new Date('2026-10-31T00:00:00.000Z');
    const dueLow = nextDueFromBox(0, now);
    expect(dueLow.getTime() - now.getTime()).toBe(1 * 24 * 60 * 60 * 1000);
    const dueHigh = nextDueFromBox(99, now);
    expect(dueHigh.getTime() - now.getTime()).toBe(30 * 24 * 60 * 60 * 1000);
  });
});

describe('Parent Weekly Digest & Parent Portal Service (ported from MaturaPlus for StudyBG)', () => {
  it('builds responsive Weekly Digest HTML without any NVO references', () => {
    const digest: WeeklyDigestData = {
      studentName: 'Иван Петров',
      weekNumber: 8,
      studyHours: 5.5,
      testsCompleted: 4,
      avgScorePercent: 86,
      streakDays: 6,
      weakAreasResolved: ['Пунктуация в сложни съставни изречения (ДЗИ БЕЛ)'],
      weakAreasToFocus: ['Тригонометрия и метрични зависимости (Профилиращ / МАТ)'],
      adviceForParent: 'Отлично темпо за ДЗИ!'
    };

    const html = buildWeeklyDigestHtml(digest);
    expect(html).toContain('Седмица 8: Отчет за Иван Петров');
    expect(html).toContain('5.5 ч.');
    expect(html).toContain('86%');
    expect(html).toContain('6 дни');
    expect(html).toContain('Пунктуация в сложни съставни изречения (ДЗИ БЕЛ)');
    expect(html).toContain('ДЗИ');
    expect(html).not.toContain('НВО в 7. клас');
    expect(html).not.toContain('НВО');
  });

  it('masks parent emails and normalizes 6-char MP student codes', () => {
    expect(maskEmail('radostina@gmail.com')).toBe('r****@gmail.com');
    expect(maskEmail('ab@abv.bg')).toBe('a****@abv.bg');

    const code = generateParentCode();
    expect(code).toHaveLength(6);
    expect(normalizeParentCode('mp-8492ab')).toBe('MP8492AB');
    expect(stripStudentCodePrefix('MP8492AB')).toBe('8492AB');
    expect(stripStudentCodePrefix('MP8492')).toBe('MP8492');
  });

  it('classifies subjects, detects weak area categories, and computes portal data', () => {
    expect(classifySubject('Български език и литература', 'Христо Ботев')).toBe('БЕЛ');
    expect(classifySubject('Математика', 'Логаритмични уравнения')).toBe('Математика');
    expect(detectCategory('БЕЛ', 'Употреба на пълен и кратък член')).toBe('Правопис и членуване');
    expect(detectCategory('Математика', 'Синусова и косинусова теорема за триъгълник')).toBe(
      'Тригонометрия и метрични зависимости'
    );

    const bucketed = bucketByCategory([
      { subject: 'БЕЛ', text: 'Грешка при пълен член' },
      { subject: 'БЕЛ', text: 'Кратък член в подлог' }
    ]);
    expect(bucketed).toHaveLength(1);
    expect(bucketed[0].occurrences).toBe(2);

    const portalData = parentPortalService.computeChildPortalData([]);
    expect(portalData.studentCode).toMatch(/^MP-[A-Z0-9]{6}$/);
    expect(portalData.monReadiness).toBeGreaterThanOrEqual(0);
    expect(portalData.monReadiness).toBeLessThanOrEqual(100);

    const digestData = parentPortalService.buildStudentWeeklyDigestData([]);
    expect(digestData.studentName).toBeTruthy();
    expect(digestData.adviceForParent).toContain('ДЗИ');
    expect(digestData.adviceForParent).not.toContain('НВО');
  });
});
