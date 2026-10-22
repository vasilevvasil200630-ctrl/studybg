import { isSupabaseConfigured } from './supabaseConfig';

export interface ExamAttemptRecord {
  id: string;
  timestamp: string;
  formattedDate: string;
  lessonId: string;
  lessonTitle: string;
  subject: string;
  grade: string;
  examPreset: string;
  durationMinutes: number;
  timeSpentSeconds: number;
  module1Points: number;
  module2Points: number;
  module3Points: number;
  totalPoints: number;
  gradeEquivalent: string;
  /** null = само точки (НВО няма официално превръщане в шестобална оценка) */
  gradeNumeric: number | null;
  passed: boolean;
  hasAiEvaluation?: boolean;
}

export interface ExamAnalyticsSummary {
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
  /** null, ако няма нито един опит с шестобална оценка (напр. само НВО) */
  averageGrade: number | null;
  passRate: number;
  attempts: ExamAttemptRecord[];
  latestAttempt: ExamAttemptRecord | null;
}

const STORAGE_KEY = 'studybg_exam_history';

const toCloudInt = (n: number): number => Math.round(Number.isFinite(n) ? n : 0);

// Облачното копие е възможно само с истински Supabase проект (без да зареждаме supabase-js)
export const isCloudSyncEnabled = (): boolean => isSupabaseConfigured();

export const examHistoryService = {
  /**
   * Get all recorded attempts from localStorage
   */
  getAllAttempts(): ExamAttemptRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch {
      return [];
    }
  },

  saveAttempts(records: ExamAttemptRecord[], options?: { silentCloudTrigger?: boolean }): ExamAttemptRecord[] {
    try {
      saveAll(records);
      if (!options?.silentCloudTrigger && typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('studybg:local-data-mutated', { detail: { source: 'exam_history' } })
        );
      }
      return records;
    } catch {
      return [];
    }
  },

  /**
   * Save an exam attempt locally and sync to Supabase if configured
   */
  async recordAttempt(
    data: Omit<ExamAttemptRecord, 'id' | 'timestamp' | 'formattedDate'>
  ): Promise<ExamAttemptRecord> {
    const now = new Date();
    const id = `exam-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const timestamp = now.toISOString();
    const formattedDate = now.toLocaleString('bg-BG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newRecord: ExamAttemptRecord = {
      ...data,
      id,
      timestamp,
      formattedDate
    };

    // 1. Save to LocalStorage immediately
    try {
      const existing = this.getAllAttempts();
      const updated = [newRecord, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('studybg:local-data-mutated', { detail: { source: 'exam_history' } })
        );
      }
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }

    // 2. Облачно копие, свързано с (анонимния) акаунт — RLS пуска само собствените редове
    void pushAttemptsToCloud([newRecord]);

    return newRecord;
  },

  /**
   * Calculate academic analytics and progress statistics
   */
  getAnalytics(): ExamAnalyticsSummary {
    const attempts = this.getAllAttempts();
    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        highestScore: 0,
        averageGrade: null,
        passRate: 0,
        attempts: [],
        latestAttempt: null
      };
    }

    const totalAttempts = attempts.length;
    let sumScore = 0;
    let sumGrade = 0;
    let maxScore = 0;
    let passedCount = 0;
    let gradedCount = 0;

    attempts.forEach(a => {
      sumScore += a.totalPoints;
      if (a.totalPoints > maxScore) maxScore = a.totalPoints;
      // Оценка и праг има само при ДЗИ / ДИППК; опитите за НВО са само в точки
      if (a.gradeNumeric !== null) {
        gradedCount++;
        sumGrade += a.gradeNumeric;
        if (a.passed) passedCount++;
      }
    });

    const averageScore = Math.round(sumScore / totalAttempts);
    const averageGrade = gradedCount > 0 ? Number((sumGrade / gradedCount).toFixed(2)) : null;
    const passRate = gradedCount > 0 ? Math.round((passedCount / gradedCount) * 100) : 0;

    return {
      totalAttempts,
      averageScore,
      highestScore: maxScore,
      averageGrade,
      passRate,
      attempts,
      latestAttempt: attempts[0] || null
    };
  },

  /**
   * Двупосочна синхронизация с Supabase за текущия потребител:
   * дърпа облачните опити, слива ги локално по id и качва локалните, които липсват в облака.
   * Нищо не прави без активна сесия (не създава акаунт само заради четене).
   */
  async syncWithCloud(): Promise<{ downloaded: number; uploaded: number; error?: string }> {
    try {
      const { supabase, getExistingSupabaseSession } = await import('./supabaseClient');
      const session = await getExistingSupabaseSession();
      if (!session) return { downloaded: 0, uploaded: 0 };

      const { data, error } = await supabase
        .from('exam_attempts')
        .select(CLOUD_COLUMNS)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(200);
      if (error) return { downloaded: 0, uploaded: 0, error: error.message };

      const local = this.getAllAttempts();
      const localIds = new Set(local.map((a) => a.id));
      const cloud = (data ?? []).map(rowToRecord);
      const cloudIds = new Set(cloud.map((a) => a.id));

      const downloaded = cloud.filter((a) => !localIds.has(a.id));
      if (downloaded.length > 0) {
        saveAll([...local, ...downloaded]);
      }

      const missingInCloud = local.filter((a) => !cloudIds.has(a.id));
      const uploaded = missingInCloud.length > 0 ? await pushAttemptsToCloud(missingInCloud) : 0;

      return { downloaded: downloaded.length, uploaded };
    } catch (err) {
      return { downloaded: 0, uploaded: 0, error: err instanceof Error ? err.message : String(err) };
    }
  },

  /**
   * Clear all local history (и облачната, ако има сесия)
   */
  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    void (async () => {
      try {
        const { supabase, getExistingSupabaseSession } = await import('./supabaseClient');
        const session = await getExistingSupabaseSession();
        if (session) {
          await supabase.from('exam_attempts').delete().eq('user_id', session.user.id);
        }
      } catch (err) {
        console.info('Cloud history delete skipped:', err);
      }
    })();
  }
};

// ---------------------------------------------------------------------------
// Supabase помощни функции
// ---------------------------------------------------------------------------

const CLOUD_COLUMNS =
  'id, lesson_id, lesson_title, subject, grade, exam_preset, duration_minutes, time_spent_seconds, module1_points, module2_points, module3_points, total_points, grade_equivalent, grade_numeric, passed, created_at';

interface ExamAttemptRow {
  id: string;
  lesson_id: string;
  lesson_title: string;
  subject: string;
  grade: string;
  exam_preset: string | null;
  duration_minutes: number | null;
  time_spent_seconds: number | null;
  module1_points: number;
  module2_points: number;
  module3_points: number;
  total_points: number;
  grade_equivalent: string | null;
  grade_numeric: number | string | null;
  passed: boolean;
  created_at: string;
}

const formatBgDate = (iso: string): string =>
  new Date(iso).toLocaleString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

function rowToRecord(row: ExamAttemptRow): ExamAttemptRecord {
  return {
    id: row.id,
    timestamp: row.created_at,
    formattedDate: formatBgDate(row.created_at),
    lessonId: row.lesson_id,
    lessonTitle: row.lesson_title,
    subject: row.subject,
    grade: row.grade,
    examPreset: row.exam_preset ?? 'lesson',
    durationMinutes: row.duration_minutes ?? 0,
    timeSpentSeconds: row.time_spent_seconds ?? 0,
    module1Points: row.module1_points,
    module2Points: row.module2_points,
    module3Points: row.module3_points,
    totalPoints: row.total_points,
    gradeEquivalent: row.grade_equivalent ?? '',
    gradeNumeric: row.grade_numeric === null || row.grade_numeric === undefined ? null : Number(row.grade_numeric),
    passed: row.passed
  };
}

function saveAll(records: ExamAttemptRecord[]): void {
  try {
    const sorted = [...records].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }
}

/** Качва опити с user_id на текущата (при нужда — анонимна) сесия. Връща броя качени. */
async function pushAttemptsToCloud(records: ExamAttemptRecord[]): Promise<number> {
  try {
    const { supabase, ensureSupabaseSession } = await import('./supabaseClient');
    const session = await ensureSupabaseSession();
    if (!session) return 0;
    const { error } = await supabase.from('exam_attempts').upsert(
      records.map((r) => ({
        id: r.id,
        user_id: session.user.id,
        lesson_id: r.lessonId,
        lesson_title: r.lessonTitle,
        subject: r.subject,
        grade: r.grade,
        exam_preset: r.examPreset,
        duration_minutes: r.durationMinutes,
        // Колоните за точки в облака са integer; при половин точки (напр. 1,5 т. по ключа на МОН)
        // се закръглява тук, а точната стойност остава локално и в grade_equivalent
        time_spent_seconds: toCloudInt(r.timeSpentSeconds),
        module1_points: toCloudInt(r.module1Points),
        module2_points: toCloudInt(r.module2Points),
        module3_points: toCloudInt(r.module3Points),
        total_points: toCloudInt(r.totalPoints),
        grade_equivalent: r.gradeEquivalent,
        grade_numeric: r.gradeNumeric,
        passed: r.passed,
        created_at: r.timestamp
      })),
      { onConflict: 'id', ignoreDuplicates: true }
    );
    if (error) {
      // Миграцията още не е пусната или RLS отказва — локалното копие остава източник на истина
      console.info('Supabase sync note:', error.message);
      return 0;
    }
    return records.length;
  } catch (err) {
    console.info('Supabase network sync skipped:', err);
    return 0;
  }
}
