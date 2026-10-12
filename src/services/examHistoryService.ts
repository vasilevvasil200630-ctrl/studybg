import { supabase, isSupabaseConfigured } from './supabaseClient';

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
  gradeNumeric: number;
  passed: boolean;
  hasAiEvaluation?: boolean;
}

export interface ExamAnalyticsSummary {
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
  averageGrade: number;
  passRate: number;
  attempts: ExamAttemptRecord[];
  latestAttempt: ExamAttemptRecord | null;
}

const STORAGE_KEY = 'studybg_exam_history';

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
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }

    // 2. Asynchronously sync to Supabase if credentials exist
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('exam_attempts').insert({
          id: newRecord.id,
          lesson_id: newRecord.lessonId,
          lesson_title: newRecord.lessonTitle,
          subject: newRecord.subject,
          grade: newRecord.grade,
          exam_preset: newRecord.examPreset,
          duration_minutes: newRecord.durationMinutes,
          time_spent_seconds: newRecord.timeSpentSeconds,
          module1_points: newRecord.module1Points,
          module2_points: newRecord.module2Points,
          module3_points: newRecord.module3Points,
          total_points: newRecord.totalPoints,
          grade_equivalent: newRecord.gradeEquivalent,
          grade_numeric: newRecord.gradeNumeric,
          passed: newRecord.passed,
          created_at: newRecord.timestamp
        });

        if (error) {
          // Table might not be migrated yet or RLS policy, ignore non-fatal error
          console.info('Supabase sync note (handled gracefully):', error.message);
        }
      } catch (err) {
        console.info('Supabase network sync skipped:', err);
      }
    }

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
        averageGrade: 0,
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

    attempts.forEach(a => {
      sumScore += a.totalPoints;
      sumGrade += a.gradeNumeric;
      if (a.totalPoints > maxScore) maxScore = a.totalPoints;
      if (a.passed) passedCount++;
    });

    const averageScore = Math.round(sumScore / totalAttempts);
    const averageGrade = Number((sumGrade / totalAttempts).toFixed(2));
    const passRate = Math.round((passedCount / totalAttempts) * 100);

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
   * Clear all local history
   */
  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
};
