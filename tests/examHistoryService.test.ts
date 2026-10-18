import { beforeEach, describe, expect, it, vi } from 'vitest';

const cloud = vi.hoisted(() => ({
  session: null as null | { user: { id: string } },
  rows: [] as Record<string, unknown>[],
  upserted: [] as Record<string, unknown>[],
  selectedUserId: null as string | null
}));

vi.mock('../src/services/supabaseConfig', () => ({ isSupabaseConfigured: () => true }));

vi.mock('../src/services/supabaseClient', () => {
  const query = {
    select: () => query,
    eq: (_col: string, value: string) => {
      cloud.selectedUserId = value;
      return query;
    },
    order: () => query,
    limit: async () => ({ data: cloud.rows, error: null }),
    upsert: async (records: Record<string, unknown>[]) => {
      cloud.upserted.push(...records);
      return { error: null };
    }
  };
  return {
    supabase: { from: () => query },
    getExistingSupabaseSession: async () => cloud.session,
    ensureSupabaseSession: async () => cloud.session
  };
});

const { examHistoryService } = await import('../src/services/examHistoryService');

const STORAGE_KEY = 'studybg_exam_history';
let store: Record<string, string> = {};

beforeEach(() => {
  store = {};
  cloud.session = null;
  cloud.rows = [];
  cloud.upserted = [];
  cloud.selectedUserId = null;
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    }
  });
});

const localAttempt = {
  id: 'exam-local-1',
  timestamp: '2026-10-15T10:00:00.000Z',
  formattedDate: '15.10.2026',
  lessonId: 'l1',
  lessonTitle: 'Урок 1',
  subject: 'Математика',
  grade: '10. клас (НВО)',
  examPreset: 'lesson',
  durationMinutes: 60,
  timeSpentSeconds: 1200,
  module1Points: 30,
  module2Points: 10,
  module3Points: 10,
  totalPoints: 50,
  gradeEquivalent: 'Добър 3.86',
  gradeNumeric: 3.86,
  passed: true
};

const cloudRow = {
  id: 'exam-cloud-1',
  lesson_id: 'l2',
  lesson_title: 'Урок 2',
  subject: 'История и цивилизации',
  grade: '12. клас (ДЗИ / Матура)',
  exam_preset: 'dzi12-history',
  duration_minutes: 240,
  time_spent_seconds: 5000,
  module1_points: 35,
  module2_points: 20,
  module3_points: 25,
  total_points: 80,
  grade_equivalent: 'Много добър 5.14',
  grade_numeric: '5.14',
  passed: true,
  created_at: '2026-10-16T09:00:00.000Z'
};

describe('examHistoryService.syncWithCloud', () => {
  it('без сесия не прави нищо (и не създава акаунт само за четене)', async () => {
    const result = await examHistoryService.syncWithCloud();
    expect(result).toEqual({ downloaded: 0, uploaded: 0 });
    expect(cloud.selectedUserId).toBeNull();
  });

  it('сваля липсващите облачни опити и качва липсващите локални — само за своя user_id', async () => {
    cloud.session = { user: { id: 'user-123' } };
    cloud.rows = [cloudRow];
    store.studybg_exam_history = JSON.stringify([localAttempt]);

    const result = await examHistoryService.syncWithCloud();

    expect(result).toEqual({ downloaded: 1, uploaded: 1 });
    expect(cloud.selectedUserId).toBe('user-123');

    const merged = examHistoryService.getAllAttempts();
    expect(merged.map((a) => a.id)).toEqual(['exam-cloud-1', 'exam-local-1']); // най-новият първи
    expect(merged[0].gradeNumeric).toBe(5.14);

    expect(cloud.upserted).toHaveLength(1);
    expect(cloud.upserted[0]).toMatchObject({ id: 'exam-local-1', user_id: 'user-123', total_points: 50 });
  });
});

describe('examHistoryService.getAnalytics', () => {
  it('опитите само в точки (НВО) не влизат в средната оценка и успеваемостта', () => {
    const nvo = { ...localAttempt, id: 'exam-nvo', gradeEquivalent: '50 / 100 точки', gradeNumeric: null, passed: false };
    const dzi = { ...localAttempt, id: 'exam-dzi', grade: '12. клас (ДЗИ / Матура)', totalPoints: 80, gradeNumeric: 5.14, passed: true };
    store[STORAGE_KEY] = JSON.stringify([nvo, dzi]);
    const analytics = examHistoryService.getAnalytics();
    expect(analytics.totalAttempts).toBe(2);
    expect(analytics.averageGrade).toBe(5.14);
    expect(analytics.passRate).toBe(100);
    expect(analytics.averageScore).toBe(65);
  });

  it('само НВО опити → средна оценка null', () => {
    store[STORAGE_KEY] = JSON.stringify([{ ...localAttempt, gradeNumeric: null, passed: false }]);
    expect(examHistoryService.getAnalytics().averageGrade).toBeNull();
  });
});
