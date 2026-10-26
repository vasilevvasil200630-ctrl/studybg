import type { TopicInProgram } from '../data/monCurriculum';
import type { PlannedSubject } from '../data/monCurriculum/studentPrograms';
import type { StudentProfile } from './studentProfile';
import { masteryLevel, masteryScore, type MasteryLevel, type TopicMasteryRecord } from './topicMastery';

// Личен план по модела на adaptiveScheduleEngine в Матура Плюс: къде е ученикът в учебната година,
// кои минали теми са слаби или непроверени, колко време има на ден. Преизчислява се след всеки тест.

export type PlanReason = 'weak' | 'unchecked' | 'reinforce' | 'current' | 'review' | 'ahead';

export const PLAN_REASON_LABELS: Record<PlanReason, string> = {
  weak: 'слаба тема — да се поправи',
  unchecked: 'взета в клас, още не е проверена',
  reinforce: 'учи се — още един тест',
  current: 'учи се в клас сега',
  review: 'преговор след няколко седмици',
  ahead: 'напред по програмата',
};

export interface PlanTask {
  topic: TopicInProgram;
  subject: PlannedSubject;
  reason: PlanReason;
  level: MasteryLevel;
  minutes: number;
}

export interface PlanDay {
  date: Date;
  tasks: PlanTask[];
  minutes: number;
}

export interface PersonalPlan {
  /** Докъде е стигнала програмата в клас (0–1) */
  yearProgress: number;
  days: PlanDay[];
  /** Минали теми, които още не са усвоени */
  backlog: number;
  /** Колко минути на ден трябват, за да се наваксат до края на срока; null — не се изостава */
  catchUpMinutesPerDay: number | null;
}

/** Ориентир за учебната година: от 15 септември до 30 юни (12. клас — до средата на май) */
export function schoolYearProgress(today: Date, grade: number): number {
  const startYear = today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1;
  const start = new Date(startYear, 8, 15);
  const end = grade === 12 ? new Date(startYear + 1, 4, 15) : new Date(startYear + 1, 5, 30);
  const p = (today.getTime() - start.getTime()) / (end.getTime() - start.getTime());
  return Math.min(1, Math.max(0, p));
}

const QUIZ_MINUTES = 15;
const WEAK_MINUTES = 25;
const REVIEW_AFTER_DAYS = 21;
const DAY_MS = 86_400_000;

function lastAttemptAt(rec: TopicMasteryRecord | undefined): number {
  const last = rec?.attempts[rec.attempts.length - 1];
  return last ? new Date(last.at).getTime() : 0;
}

export interface PlanInput {
  profile: Pick<StudentProfile, 'grade' | 'minutesPerDay' | 'targetGrade' | 'studyDays'>;
  subjects: { subject: PlannedSubject; topics: TopicInProgram[] }[];
  mastery: Record<string, TopicMasteryRecord>;
  today: Date;
  /** Колко дни напред да се разпише планът */
  horizonDays?: number;
}

/** Опашката от задачи по приоритет, без разпределяне по дни */
export function prioritizeTopics(input: PlanInput): PlanTask[] {
  const { profile, subjects, mastery, today } = input;
  const progress = schoolYearProgress(today, profile.grade);
  const buckets: Record<PlanReason, PlanTask[]> = { weak: [], unchecked: [], reinforce: [], current: [], review: [], ahead: [] };

  for (const { subject, topics } of subjects) {
    // Профилираната подготовка и чуждият език се учат през двете години или по нива — без „минали“ теми
    const yearly = subject.role === 'general';
    const passedUntil = yearly ? Math.floor(progress * topics.length) : 0;
    topics.forEach((topic, i) => {
      const rec = mastery[topic.id];
      const level = masteryLevel(rec);
      const passed = i < passedUntil;
      const isCurrent = yearly ? i === passedUntil : i === 0;
      let reason: PlanReason | null = null;
      if (level === 'weak') reason = 'weak';
      else if (level === 'learning') reason = profile.targetGrade >= 5 || passed ? 'reinforce' : null;
      else if (level === 'mastered') reason = today.getTime() - lastAttemptAt(rec) > REVIEW_AFTER_DAYS * DAY_MS ? 'review' : null;
      else if (passed) reason = 'unchecked';
      else if (isCurrent) reason = 'current';
      else if (profile.targetGrade === 6 && !yearly) reason = 'ahead';
      if (!reason) return;
      buckets[reason].push({ topic, subject, reason, level, minutes: reason === 'weak' ? WEAK_MINUTES : QUIZ_MINUTES });
    });
  }

  // Най-слабите първо; в една група предметите се редуват, за да не е цял ден по един предмет
  buckets.weak.sort((a, b) => (masteryScore(mastery[a.topic.id]) ?? 0) - (masteryScore(mastery[b.topic.id]) ?? 0));
  const interleave = (tasks: PlanTask[]): PlanTask[] => {
    const bySubject = new Map<string, PlanTask[]>();
    for (const t of tasks) {
      const key = t.subject.program.id;
      if (!bySubject.has(key)) bySubject.set(key, []);
      bySubject.get(key)!.push(t);
    }
    const queues = [...bySubject.values()];
    const out: PlanTask[] = [];
    while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift()!);
    return out;
  };
  return (['weak', 'current', 'unchecked', 'reinforce', 'review', 'ahead'] as const).flatMap((r) => interleave(buckets[r]));
}

export function buildPersonalPlan(input: PlanInput): PersonalPlan {
  const { profile, today } = input;
  const horizon = input.horizonDays ?? 7;
  const queue = prioritizeTopics(input);
  const progress = schoolYearProgress(today, profile.grade);
  const studyDays = profile.studyDays.length ? profile.studyDays : [0, 1, 2, 3, 4];

  const days: PlanDay[] = [];
  let next = 0;
  for (let d = 0; d < horizon; d++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + d);
    const weekday = (date.getDay() + 6) % 7; // 0 = понеделник
    if (!studyDays.includes(weekday)) continue;
    const tasks: PlanTask[] = [];
    let minutes = 0;
    while (next < queue.length && (minutes + queue[next].minutes <= profile.minutesPerDay || tasks.length === 0)) {
      tasks.push(queue[next]);
      minutes += queue[next].minutes;
      next++;
    }
    days.push({ date, tasks, minutes });
  }

  // Наваксване (както в Матура Плюс): минали теми без „усвоена“ до края на срока
  const backlogTasks = queue.filter((t) => t.reason === 'weak' || t.reason === 'unchecked');
  const backlog = backlogTasks.length;
  const backlogMinutes = backlogTasks.reduce((a, t) => a + t.minutes, 0);
  const termEnd = today.getMonth() >= 8 || today.getMonth() === 0
    ? new Date(today.getMonth() === 0 ? today.getFullYear() : today.getFullYear() + 1, 0, 31)
    : new Date(today.getFullYear(), profile.grade === 12 ? 4 : 5, profile.grade === 12 ? 15 : 30);
  const studyDaysLeft = Math.max(1, Math.round(((termEnd.getTime() - today.getTime()) / DAY_MS) * (studyDays.length / 7)));
  const needed = Math.ceil(backlogMinutes / studyDaysLeft);
  const catchUpMinutesPerDay = needed > profile.minutesPerDay ? needed : null;

  return { yearProgress: progress, days, backlog, catchUpMinutesPerDay };
}
