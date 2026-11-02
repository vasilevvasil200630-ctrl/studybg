import { COOKIE_STORAGE_KEY, isAnalyticsAllowed, parseStoredConsent } from '../lib/consent';

export const ENGAGEMENT_STORAGE_KEY = 'studybg_engagement_stats_v1';
export const FEEDBACK_HISTORY_STORAGE_KEY = 'studybg_feedback_history_v1';

export interface SectionDwellRecord {
  section: string;
  label: string;
  totalSeconds: number;
  visits: number;
  lastVisitedAt: string;
}

export interface EngagementStats {
  sections: Record<string, SectionDwellRecord>;
  recentLessons: Array<{
    lessonId: string;
    title: string;
    subject: string;
    grade: string;
    totalSeconds: number;
    views: number;
    lastViewedAt: string;
  }>;
  totalClicks: number;
}

export type FeedbackCategory = 'helpful' | 'content_issue' | 'feature_idea' | 'ux_issue';

export interface FeedbackSubmission {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  category: FeedbackCategory;
  message: string;
  email?: string;
  section: string;
  lessonId?: string;
  lessonTitle?: string;
  dwellSecondsOnPage: number;
  createdAt: string;
}

type GtagFn = (command: string, eventOrTarget: string, params?: Record<string, unknown>) => void;
type ClarityFn = (command: string, ...args: string[]) => void;

function getConsentAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const state = parseStoredConsent(localStorage.getItem(COOKIE_STORAGE_KEY));
    return state.status === 'valid' && isAnalyticsAllowed(state.prefs);
  } catch {
    return false;
  }
}

function getGtag(): GtagFn | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === 'function' ? w.gtag : null;
}

function getClarity(): ClarityFn | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { clarity?: ClarityFn };
  return typeof w.clarity === 'function' ? w.clarity : null;
}

const DEFAULT_STATS: EngagementStats = {
  sections: {},
  recentLessons: [],
  totalClicks: 0
};

export function readEngagementStats(): EngagementStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(ENGAGEMENT_STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw) as Partial<EngagementStats>;
    return {
      sections: parsed.sections && typeof parsed.sections === 'object' ? parsed.sections : {},
      recentLessons: Array.isArray(parsed.recentLessons) ? parsed.recentLessons : [],
      totalClicks: typeof parsed.totalClicks === 'number' ? parsed.totalClicks : 0
    };
  } catch {
    return DEFAULT_STATS;
  }
}

function writeEngagementStats(stats: EngagementStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ENGAGEMENT_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore storage quota errors
  }
}

export const analyticsService = {
  /**
   * Изпраща събитие за преглед на виртуална страница (SPA route) към GA4 и Microsoft Clarity
   */
  trackPageView(params: {
    path: string;
    title: string;
    section: string;
    sectionLabel: string;
    lessonId?: string;
    lessonTitle?: string;
    subject?: string;
    grade?: string;
  }): void {
    // 1. Локален запис на посещението по секция
    const stats = readEngagementStats();
    const existing = stats.sections[params.section] ?? {
      section: params.section,
      label: params.sectionLabel,
      totalSeconds: 0,
      visits: 0,
      lastVisitedAt: new Date().toISOString()
    };
    existing.label = params.sectionLabel;
    existing.visits += 1;
    existing.lastVisitedAt = new Date().toISOString();
    stats.sections[params.section] = existing;

    if (params.lessonId && params.lessonTitle) {
      const idx = stats.recentLessons.findIndex((l) => l.lessonId === params.lessonId);
      if (idx >= 0) {
        stats.recentLessons[idx].views += 1;
        stats.recentLessons[idx].lastViewedAt = new Date().toISOString();
      } else {
        stats.recentLessons.unshift({
          lessonId: params.lessonId,
          title: params.lessonTitle,
          subject: params.subject ?? '',
          grade: params.grade ?? '',
          totalSeconds: 0,
          views: 1,
          lastViewedAt: new Date().toISOString()
        });
        if (stats.recentLessons.length > 25) {
          stats.recentLessons.length = 25;
        }
      }
    }
    writeEngagementStats(stats);

    // 2. Изпращане към GA4 и Microsoft Clarity (само при дадено съгласие)
    if (!getConsentAllowed()) return;

    const gtag = getGtag();
    if (gtag) {
      gtag('event', 'page_view', {
        page_title: params.title,
        page_path: params.path,
        page_location: typeof window !== 'undefined' ? window.location.href : params.path,
        study_section: params.section,
        lesson_id: params.lessonId ?? undefined,
        lesson_subject: params.subject ?? undefined,
        lesson_grade: params.grade ?? undefined
      });
    }

    const clarity = getClarity();
    if (clarity) {
      clarity('set', 'active_section', params.section);
      clarity('set', 'active_section_label', params.sectionLabel);
      if (params.lessonId) {
        clarity('set', 'active_lesson_id', params.lessonId);
      }
      if (params.subject) {
        clarity('set', 'active_subject', params.subject);
      }
    }
  },

  /**
   * Записва реално прекарано активно време (в секунди) в дадена секция и урок
   */
  recordDwellTime(params: {
    section: string;
    sectionLabel: string;
    seconds: number;
    lessonId?: string;
    lessonTitle?: string;
    subject?: string;
    grade?: string;
  }): void {
    const cleanSeconds = Math.round(params.seconds);
    if (cleanSeconds < 2) return;

    const stats = readEngagementStats();
    const existing = stats.sections[params.section] ?? {
      section: params.section,
      label: params.sectionLabel,
      totalSeconds: 0,
      visits: 1,
      lastVisitedAt: new Date().toISOString()
    };
    existing.totalSeconds += cleanSeconds;
    existing.lastVisitedAt = new Date().toISOString();
    stats.sections[params.section] = existing;

    if (params.lessonId && params.lessonTitle) {
      const idx = stats.recentLessons.findIndex((l) => l.lessonId === params.lessonId);
      if (idx >= 0) {
        stats.recentLessons[idx].totalSeconds += cleanSeconds;
      } else {
        stats.recentLessons.unshift({
          lessonId: params.lessonId,
          title: params.lessonTitle,
          subject: params.subject ?? '',
          grade: params.grade ?? '',
          totalSeconds: cleanSeconds,
          views: 1,
          lastViewedAt: new Date().toISOString()
        });
      }
    }
    writeEngagementStats(stats);

    if (!getConsentAllowed()) return;

    const gtag = getGtag();
    if (gtag) {
      gtag('event', 'section_dwell_time', {
        study_section: params.section,
        section_label: params.sectionLabel,
        dwell_seconds: cleanSeconds,
        engagement_time_msec: cleanSeconds * 1000,
        lesson_id: params.lessonId ?? undefined,
        lesson_subject: params.subject ?? undefined,
        lesson_grade: params.grade ?? undefined
      });
    }
  },

  /**
   * Проследява ключово действие/клик на потребителя (напр. старт на тест, обърната Leitner карта, филтър)
   */
  trackAction(actionName: string, metadata: Record<string, string | number | boolean | undefined> = {}): void {
    const stats = readEngagementStats();
    stats.totalClicks += 1;
    writeEngagementStats(stats);

    if (!getConsentAllowed()) return;

    const gtag = getGtag();
    if (gtag) {
      gtag('event', actionName, metadata);
    }

    const clarity = getClarity();
    if (clarity) {
      clarity('event', actionName);
    }
  },

  /**
   * Връща класация на секциите по най-много прекарано време
   */
  getTopSectionsByTime(): SectionDwellRecord[] {
    const stats = readEngagementStats();
    return Object.values(stats.sections).sort((a, b) => b.totalSeconds - a.totalSeconds);
  },

  /**
   * Записва подадена обратна връзка (Feedback) в локалната история, Supabase (ако е наличен) и GA4/Clarity
   */
  async submitFeedback(input: Omit<FeedbackSubmission, 'id' | 'createdAt'>): Promise<{ ok: boolean; savedToCloud: boolean }> {
    const entry: FeedbackSubmission = {
      ...input,
      id: `fb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString()
    };

    // 1. Локален запис
    try {
      const raw = localStorage.getItem(FEEDBACK_HISTORY_STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const list: FeedbackSubmission[] = Array.isArray(parsed) ? parsed : [];
      list.unshift(entry);
      if (list.length > 30) list.length = 30;
      localStorage.setItem(FEEDBACK_HISTORY_STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore storage errors
    }

    // 2. Тагване на сесията в GA4 и Microsoft Clarity (позволява филтриране на записи по оценка!)
    if (getConsentAllowed()) {
      const gtag = getGtag();
      if (gtag) {
        gtag('event', 'feedback_submitted', {
          feedback_rating: entry.rating,
          feedback_category: entry.category,
          study_section: entry.section,
          lesson_id: entry.lessonId ?? undefined,
          dwell_seconds: entry.dwellSecondsOnPage
        });
      }
      const clarity = getClarity();
      if (clarity) {
        clarity('set', 'feedback_rating', String(entry.rating));
        clarity('set', 'feedback_category', entry.category);
        clarity('event', 'feedback_submitted');
      }
    }

    // 3. Запис в Supabase (ако таблицата user_feedback съществува)
    let savedToCloud = false;
    try {
      const { supabase, isSupabaseConfigured } = await import('./supabaseClient');
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('user_feedback').insert({
          rating: entry.rating,
          category: entry.category,
          message: entry.message,
          email: entry.email || null,
          section: entry.section,
          lesson_id: entry.lessonId || null,
          lesson_title: entry.lessonTitle || null,
          dwell_seconds: entry.dwellSecondsOnPage,
          created_at: entry.createdAt
        });
        if (!error) {
          savedToCloud = true;
        }
      }
    } catch {
      // ignore if table is not migrated yet
    }

    return { ok: true, savedToCloud };
  }
};
