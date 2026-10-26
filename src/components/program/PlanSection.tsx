import React, { useMemo } from 'react';
import { Clock } from 'lucide-react';
import { practiceTopics, type MonProgram, type TopicInProgram } from '../../data/monCurriculum';
import { programCoverage } from '../../data/monCurriculum/lessonCoverage';
import type { PlannedSubject } from '../../data/monCurriculum/studentPrograms';
import { PLAN_REASON_LABELS, buildPersonalPlan, type PlanTask } from '../../lib/personalPlan';
import { WEEKDAY_SHORT, type StudentProfile } from '../../lib/studentProfile';
import type { TopicMasteryRecord } from '../../lib/topicMastery';
import type { LessonData } from '../../types';

interface PlanSectionProps {
  profile: StudentProfile;
  subjects: PlannedSubject[];
  mastery: Record<string, TopicMasteryRecord>;
  lessons: LessonData[];
  onStartQuiz: (program: MonProgram, topic: TopicInProgram, lessons: LessonData[]) => void;
  onChangeProfile: (profile: StudentProfile) => void;
}

const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
const dayLabel = (d: Date, today: Date) => {
  if (sameDay(d, today)) return 'Днес';
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  if (sameDay(d, tomorrow)) return 'Утре';
  return `${WEEKDAY_SHORT[(d.getDay() + 6) % 7]}, ${d.getDate()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
};

/** Планът за днес и следващите учебни дни — смята се наново след всеки тест */
export const PlanSection: React.FC<PlanSectionProps> = ({ profile, subjects, mastery, lessons, onStartQuiz, onChangeProfile }) => {
  const testable = useMemo(() => subjects.filter((s) => s.program.testable && s.topicCount > 0), [subjects]);
  const topicsBySubject = useMemo(() => testable.map((subject) => ({ subject, topics: practiceTopics(subject.program) })), [testable]);
  const lessonsByTopic = useMemo(() => {
    const byId = new Map(lessons.map((l) => [l.id, l]));
    const out = new Map<string, LessonData[]>();
    for (const s of testable) {
      for (const t of programCoverage(s.program, lessons).topics) {
        if (t.lessonIds.length) out.set(t.topicId, t.lessonIds.map((id) => byId.get(id)).filter((l): l is LessonData => Boolean(l)));
      }
    }
    return out;
  }, [testable, lessons]);

  const today = useMemo(() => new Date(), []);
  const plan = useMemo(
    () => buildPersonalPlan({ profile, subjects: topicsBySubject, mastery, today }),
    [profile, topicsBySubject, mastery, today],
  );

  if (!testable.length) return null;
  const [first, ...rest] = plan.days;

  const start = (task: PlanTask) => onStartQuiz(task.subject.program, task.topic, lessonsByTopic.get(task.topic.id) ?? []);

  return (
    <section aria-labelledby="plan-title" className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="plan-title" className="text-lg font-bold text-slate-900">План</h2>
        <p className="text-xs text-slate-500">
          {profile.minutesPerDay} мин на ден · програмата в клас е около {Math.round(plan.yearProgress * 100)}% от годината
        </p>
      </div>

      {plan.catchUpMinutesPerDay !== null && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="min-w-0 max-w-prose">
            {plan.backlog} взети в клас теми още не са усвоени. За да ги наваксаш до края на срока, трябват около{' '}
            <strong>{plan.catchUpMinutesPerDay} минути</strong> на ден вместо {profile.minutesPerDay}.
          </p>
          <button
            type="button"
            onClick={() => onChangeProfile({ ...profile, minutesPerDay: Math.min(600, Math.ceil(plan.catchUpMinutesPerDay! / 5) * 5) })}
            className="inline-flex h-10 items-center rounded-lg border border-amber-300 bg-white px-3 font-semibold text-amber-900 hover:bg-amber-100 cursor-pointer"
          >
            Вдигни на {Math.ceil(plan.catchUpMinutesPerDay / 5) * 5} мин
          </button>
        </div>
      )}

      {first && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs">
          <p className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-sm font-bold text-slate-900">
            <span>{dayLabel(first.date, today)}</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Clock className="h-3.5 w-3.5" /> {first.minutes} мин
            </span>
          </p>
          {first.tasks.length === 0 ? (
            <p className="p-4 text-sm text-slate-600">Няма задачи — всички теми досега са усвоени.</p>
          ) : (
            <ol className="divide-y divide-slate-100">
              {first.tasks.map((task) => (
                <li key={task.topic.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">{task.topic.title}</p>
                    <p className="text-xs text-slate-500">
                      {task.subject.name} · {PLAN_REASON_LABELS[task.reason]} · {task.minutes} мин
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => start(task)}
                    className="inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-brand-sapphire hover:border-brand-sapphire hover:bg-brand-sapphire-soft cursor-pointer"
                  >
                    Тест по темата
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {rest.length > 0 && (
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((day) => (
            <li key={day.date.toISOString()} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
              <p className="font-semibold text-slate-900">
                {dayLabel(day.date, today)} <span className="font-normal text-slate-500">· {day.minutes} мин</span>
              </p>
              <p className="mt-0.5 text-xs text-slate-600">
                {day.tasks.length ? day.tasks.map((t) => t.topic.title).join(' · ') : 'свободно'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
