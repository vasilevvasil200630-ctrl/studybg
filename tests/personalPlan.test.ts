import { describe, expect, it } from 'vitest';
import { loadMonCatalog, practiceTopics } from '../src/data/monCurriculum';
import { buildStudentPlan, includedSubjects } from '../src/data/monCurriculum/studentPrograms';
import { buildPersonalPlan, prioritizeTopics, schoolYearProgress } from '../src/lib/personalPlan';
import { emptyProfile, parseStudentProfile, type StudentProfile } from '../src/lib/studentProfile';
import type { TopicMasteryRecord } from '../src/lib/topicMastery';

const attempt = (correct: number, total: number, at: string, source: 'quiz' | 'diagnostic' = 'quiz') => ({ at, correct, total, source });

async function setup(patch: Partial<StudentProfile> = {}) {
  const catalog = await loadMonCatalog();
  const profile = { ...emptyProfile(8), ...patch };
  const subjects = includedSubjects(buildStudentPlan(profile, catalog))
    .filter((s) => s.program.testable)
    .map((subject) => ({ subject, topics: practiceTopics(subject.program) }));
  return { profile, subjects };
}

describe('мястото в учебната година', () => {
  it('от 15 септември до 30 юни; 12. клас до средата на май', () => {
    expect(schoolYearProgress(new Date(2026, 8, 10), 8)).toBe(0);
    expect(schoolYearProgress(new Date(2027, 6, 1), 8)).toBe(1);
    expect(schoolYearProgress(new Date(2027, 1, 7), 10)).toBeCloseTo(0.5, 1);
    expect(schoolYearProgress(new Date(2027, 4, 20), 12)).toBe(1);
  });
});

describe('личен план', () => {
  it('слабите теми са първи, после текущата в клас, после взетите и непроверени', async () => {
    const { profile, subjects } = await setup();
    const math = subjects.find((s) => s.subject.program.id === '8-math')!;
    const weakTopic = math.topics[5];
    const mastery: Record<string, TopicMasteryRecord> = { [weakTopic.id]: { attempts: [attempt(1, 10, '2026-10-20T10:00:00Z')] } };
    const queue = prioritizeTopics({ profile, subjects, mastery, today: new Date(2026, 11, 1) });
    expect(queue[0]).toMatchObject({ reason: 'weak', minutes: 25 });
    expect(queue[0].topic.id).toBe(weakTopic.id);
    const reasons = queue.map((t) => t.reason);
    expect(reasons.indexOf('current')).toBeLessThan(reasons.indexOf('unchecked'));
    // Темите от бъдещето не влизат в плана на общообразователните предмети
    expect(queue.some((t) => t.topic.id === math.topics[7].id)).toBe(false);
  });

  it('предметите се редуват, а денят се пълни до минутите на ученика', async () => {
    const { profile, subjects } = await setup({ minutesPerDay: 45 });
    const plan = buildPersonalPlan({ profile, subjects, mastery: {}, today: new Date(2027, 2, 1) });
    const day = plan.days[0];
    expect(day.minutes).toBeLessThanOrEqual(45);
    expect(new Set(day.tasks.map((t) => t.subject.program.id)).size).toBe(day.tasks.length);
  });

  it('само в учебните дни на ученика', async () => {
    const { profile, subjects } = await setup({ studyDays: [5, 6] });
    // 1 март 2027 е понеделник: в следващите 7 дни остават само събота и неделя
    const plan = buildPersonalPlan({ profile, subjects, mastery: {}, today: new Date(2027, 2, 1) });
    expect(plan.days.map((d) => d.date.getDay())).toEqual([6, 0]);
  });

  it('при много непроверени теми предлага повече минути на ден', async () => {
    const { profile, subjects } = await setup({ minutesPerDay: 20 });
    const plan = buildPersonalPlan({ profile, subjects, mastery: {}, today: new Date(2027, 4, 20) });
    expect(plan.backlog).toBeGreaterThan(50);
    expect(plan.catchUpMinutesPerDay).toBeGreaterThan(20);
  });

  it('усвоените теми се преговарят след три седмици', async () => {
    const { profile, subjects } = await setup();
    const t = subjects[0].topics[0];
    const mastery = { [t.id]: { attempts: [attempt(10, 10, '2026-10-01T10:00:00Z'), attempt(9, 10, '2026-10-02T10:00:00Z')] } };
    const soon = prioritizeTopics({ profile, subjects, mastery, today: new Date(2026, 9, 10) });
    expect(soon.some((x) => x.topic.id === t.id)).toBe(false);
    const later = prioritizeTopics({ profile, subjects, mastery, today: new Date(2026, 10, 10) });
    expect(later.find((x) => x.topic.id === t.id)?.reason).toBe('review');
  });

  it('старите профили получават учебни дни понеделник–петък', () => {
    const { studyDays: _omit, ...old } = emptyProfile(9);
    expect(parseStudentProfile(old)?.studyDays).toEqual([0, 1, 2, 3, 4]);
    expect(parseStudentProfile({ ...old, studyDays: [6, 6, 9, 2] })?.studyDays).toEqual([2, 6]);
  });
});
