import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ExternalLink, ListChecks, Pencil, TriangleAlert } from 'lucide-react';
import type { LessonData } from '../../types';
import { loadMonCatalog, programTopics, type MonProgram, type TopicInProgram } from '../../data/monCurriculum';
import { programCoverage } from '../../data/monCurriculum/lessonCoverage';
import { buildStudentPlan, type PlannedSubject } from '../../data/monCurriculum/studentPrograms';
import {
  SCHOOL_PROFILES,
  SCHOOL_TYPES,
  emptyProfile,
  loadStudentProfile,
  saveStudentProfile,
  type StudentProfile,
} from '../../lib/studentProfile';
import { loadDiagnosticRuns } from '../../lib/diagnostic';
import { MASTERY_LABELS, loadTopicMastery, masteryLevel, type MasteryLevel, type TopicMasteryRecord } from '../../lib/topicMastery';
import { PlanSection } from './PlanSection';
import { ProfileForm } from './ProfileForm';

// Тестът зарежда KaTeX — само когато ученикът отвори тест
const TopicQuizPanel = lazy(() => import('./TopicQuizPanel').then((m) => ({ default: m.TopicQuizPanel })));
const TopicLessonPanel = lazy(() => import('./TopicLessonPanel').then((m) => ({ default: m.TopicLessonPanel })));
const DiagnosticPanel = lazy(() => import('./DiagnosticPanel').then((m) => ({ default: m.DiagnosticPanel })));

const MASTERY_STYLE: Record<MasteryLevel, string> = {
  unknown: '',
  weak: 'bg-rose-50 text-rose-700',
  learning: 'bg-amber-50 text-amber-800',
  mastered: 'bg-brand-emerald-soft text-emerald-800',
};

/** Резултатите по теми; обновява се след всеки тест */
function useTopicMastery(): Record<string, TopicMasteryRecord> {
  const [mastery, setMastery] = useState(loadTopicMastery);
  useEffect(() => {
    const refresh = () => setMastery(loadTopicMastery());
    window.addEventListener('studybg:topic-mastery-changed', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('studybg:topic-mastery-changed', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);
  return mastery;
}

interface MyProgramViewProps {
  lessons: LessonData[];
  onSelectLesson: (lesson: LessonData) => void;
}

const ROLE_TITLES: Record<PlannedSubject['role'], string> = {
  general: 'Общообразователна подготовка',
  profile: 'Профилирана подготовка',
  language: 'Чужд език',
};

export const MyProgramView: React.FC<MyProgramViewProps> = ({ lessons, onSelectLesson }) => {
  const [profile, setProfile] = useState<StudentProfile | null>(() => loadStudentProfile());
  const [editing, setEditing] = useState(() => !loadStudentProfile());
  const [catalog, setCatalog] = useState<MonProgram[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let alive = true;
    loadMonCatalog()
      .then((c) => alive && setCatalog(c))
      .catch(() => alive && setLoadError(true));
    return () => {
      alive = false;
    };
  }, []);

  if (loadError) {
    return (
      <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
        Програмите на МОН не се заредиха. Провери връзката и презареди страницата.
      </p>
    );
  }
  if (!catalog) {
    return <p className="text-sm text-slate-500">Зареждат се учебните програми на МОН…</p>;
  }

  if (editing || !profile) {
    return (
      <ProfileForm
        initial={profile ?? emptyProfile()}
        catalog={catalog}
        onSave={(p) => {
          setProfile(saveStudentProfile(p));
          setEditing(false);
        }}
        onCancel={profile ? () => setEditing(false) : undefined}
      />
    );
  }

  return (
    <ProgramOverview
      profile={profile}
      catalog={catalog}
      lessons={lessons}
      onEdit={() => setEditing(true)}
      onChangeProfile={(p) => setProfile(saveStudentProfile(p))}
      onSelectLesson={onSelectLesson}
    />
  );
};

function profileSummary(profile: StudentProfile): string {
  const parts = [`${profile.grade}. клас`, SCHOOL_TYPES.find((s) => s.id === profile.schoolType)?.name ?? ''];
  const prof = SCHOOL_PROFILES.find((p) => p.id === profile.profileId);
  if (profile.schoolType === 'profiled' && prof) parts.push(`профил „${prof.name}“`);
  if (profile.schoolType === 'professional' && profile.specialty) parts.push(`„${profile.specialty}“`);
  if (profile.intensiveLanguage) parts.push('интензивен чужд език в 8. клас');
  return parts.filter(Boolean).join(' · ');
}

interface ProgramOverviewProps {
  profile: StudentProfile;
  catalog: MonProgram[];
  lessons: LessonData[];
  onEdit: () => void;
  onChangeProfile: (profile: StudentProfile) => void;
  onSelectLesson: (lesson: LessonData) => void;
}

const ProgramOverview: React.FC<ProgramOverviewProps> = ({ profile, catalog, lessons, onEdit, onChangeProfile, onSelectLesson }) => {
  const plan = useMemo(() => buildStudentPlan(profile, catalog), [profile, catalog]);
  const mastery = useTopicMastery();
  const [quiz, setQuiz] = useState<{ program: MonProgram; topic: TopicInProgram; lessons: LessonData[] } | null>(null);
  const [aiLesson, setAiLesson] = useState<{ program: MonProgram; topic: TopicInProgram; lessons: LessonData[] } | null>(null);
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const included = plan.subjects.filter((s) => s.included);
  const left = plan.subjects.filter((s) => !s.included);
  const lessonById = useMemo(() => new Map(lessons.map((l) => [l.id, l])), [lessons]);
  const totalTopics = included.reduce((a, s) => a + s.topicCount, 0);

  const setIncluded = (programId: string, on: boolean) =>
    onChangeProfile({
      ...profile,
      addedProgramIds: on ? [...new Set([...profile.addedProgramIds, programId])] : profile.addedProgramIds.filter((x) => x !== programId),
      removedProgramIds: on ? profile.removedProgramIds.filter((x) => x !== programId) : [...new Set([...profile.removedProgramIds, programId])],
    });

  const groups = (['general', 'profile', 'language'] as const)
    .map((role) => ({ role, subjects: included.filter((s) => s.role === role) }))
    .filter((g) => g.subjects.length);

  if (quiz) {
    return (
      <Suspense fallback={<p className="text-sm text-slate-500">Зарежда се тестът…</p>}>
        <TopicQuizPanel
          program={quiz.program}
          topic={quiz.topic}
          lessons={quiz.lessons}
          onBack={() => setQuiz(null)}
        />
      </Suspense>
    );
  }

  if (aiLesson) {
    return (
      <Suspense fallback={<p className="text-sm text-slate-500">Зарежда се урокът…</p>}>
        <TopicLessonPanel
          program={aiLesson.program}
          topic={aiLesson.topic}
          onBack={() => setAiLesson(null)}
          onStartQuiz={() => {
            setQuiz(aiLesson);
            setAiLesson(null);
            window.scrollTo({ top: 0 });
          }}
        />
      </Suspense>
    );
  }

  if (diagnosticOpen) {
    return (
      <Suspense fallback={<p className="text-sm text-slate-500">Зарежда се входният тест…</p>}>
        <DiagnosticPanel subjects={included} onBack={() => setDiagnosticOpen(false)} />
      </Suspense>
    );
  }

  const openQuiz = (program: MonProgram, topic: TopicInProgram, topicLessons: LessonData[]) => {
    setQuiz({ program, topic, lessons: topicLessons });
    window.scrollTo({ top: 0 });
  };

  const diagnosticRuns = loadDiagnosticRuns();
  const testable = included.filter((s) => s.program.testable && s.topicCount > 0);
  const diagnosticDone = testable.filter((s) => diagnosticRuns[s.program.id]?.finishedAt).length;
  const diagnosticStarted = testable.some((s) => diagnosticRuns[s.program.id]);

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="min-w-0">
          <p className="text-base font-bold text-slate-900">{profileSummary(profile)}</p>
          <p className="mt-1 text-sm text-slate-600">
            {included.length} предмета · {totalTopics} теми по учебните програми на МОН
          </p>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          <Pencil className="h-4 w-4" /> Промени профила
        </button>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-brand-sapphire-soft p-5">
        <div className="min-w-0 max-w-prose">
          <h2 className="text-base font-bold text-slate-900">Входен тест</h2>
          <p className="mt-1 text-sm text-slate-600">
            {diagnosticDone === testable.length && testable.length > 0
              ? 'Готов е за всички предмети. Слабите теми са отбелязани по-долу.'
              : `По 10 въпроса за предмет по цялата програма — показва какво знаеш и можеш. Готови: ${diagnosticDone} от ${testable.length}.`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setDiagnosticOpen(true);
            window.scrollTo({ top: 0 });
          }}
          className="inline-flex h-11 items-center rounded-lg bg-brand-sapphire px-5 text-sm font-semibold text-white hover:bg-brand-sapphire-dark cursor-pointer"
        >
          {diagnosticDone === testable.length && testable.length > 0 ? 'Виж резултатите' : diagnosticStarted ? 'Продължи входния тест' : 'Направи входния тест'}
        </button>
      </section>

      <PlanSection
        profile={profile}
        subjects={included}
        mastery={mastery}
        lessons={lessons}
        onStartQuiz={openQuiz}
        onChangeProfile={onChangeProfile}
      />

      {plan.missing.length === 0 ? (
        <p className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-brand-emerald-soft p-4 text-sm text-emerald-900">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-emerald-dark" />
          <span>Всички предмети от програмата ти са в сайта: темите по МОН с очакваните резултати и упражнения по тях.</span>
        </p>
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="flex items-center gap-2 font-semibold">
            <TriangleAlert className="h-4 w-4 shrink-0" /> {plan.missing.length === 1 ? 'Един предмет не е в сайта' : `${plan.missing.length} предмета не са в сайта`}
          </p>
          <ul className="mt-2 space-y-1.5">
            {plan.missing.map((m) => (
              <li key={m.name}>
                <span className="font-semibold">{m.name}.</span> {m.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {plan.notes.map((n) => (
        <p key={n} className="text-sm text-slate-600">{n}</p>
      ))}

      {groups.map((g) => (
        <section key={g.role} aria-labelledby={`role-${g.role}`}>
          <h2 id={`role-${g.role}`} className="mb-2 text-lg font-bold text-slate-900">{ROLE_TITLES[g.role]}</h2>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            {g.subjects.map((s) => (
              <SubjectRow
                key={s.program.id}
                subject={s}
                lessons={lessons}
                lessonById={lessonById}
                mastery={mastery}
                onRemove={() => setIncluded(s.program.id, false)}
                onSelectLesson={onSelectLesson}
                onStartQuiz={openQuiz}
                onOpenAiLesson={(program, topic, topicLessons) => {
                  setAiLesson({ program, topic, lessons: topicLessons });
                  window.scrollTo({ top: 0 });
                }}
              />
            ))}
          </ul>
        </section>
      ))}

      {left.length > 0 && (
        <section aria-labelledby="left-out">
          <h2 id="left-out" className="mb-2 text-sm font-bold text-slate-700">Не са в програмата ти</h2>
          <div className="flex flex-wrap gap-2">
            {left.map((s) => (
              <button
                key={s.program.id}
                type="button"
                onClick={() => setIncluded(s.program.id, true)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-brand-sapphire hover:text-brand-sapphire cursor-pointer"
              >
                + {s.name}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

interface SubjectRowProps {
  subject: PlannedSubject;
  lessons: LessonData[];
  lessonById: Map<string, LessonData>;
  mastery: Record<string, TopicMasteryRecord>;
  onRemove: () => void;
  onSelectLesson: (lesson: LessonData) => void;
  onStartQuiz: (program: MonProgram, topic: TopicInProgram, lessons: LessonData[]) => void;
  onOpenAiLesson: (program: MonProgram, topic: TopicInProgram, lessons: LessonData[]) => void;
}

const SubjectRow: React.FC<SubjectRowProps> = ({ subject, lessons, lessonById, mastery, onRemove, onSelectLesson, onStartQuiz, onOpenAiLesson }) => {
  const [open, setOpen] = useState(false);
  const { program } = subject;
  const coverage = useMemo(() => programCoverage(program, lessons), [program, lessons]);
  const lessonsFor = useMemo(() => new Map(coverage.topics.map((t) => [t.topicId, t.lessonIds])), [coverage]);
  const panelId = `topics-${program.id}`;

  return (
    <li>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left cursor-pointer"
        >
          <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
          <span className="min-w-0">
            <span className="block text-sm font-bold text-slate-900">{subject.name}</span>
            <span className="block text-xs text-slate-500">
              {program.testable ? `${subject.topicCount} теми` : 'без тестова част'}
              {coverage.covered > 0 && ` · ${coverage.covered} с урок в сайта`}
            </span>
          </span>
        </button>
        <a
          href={program.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-sapphire hover:underline"
        >
          Програмата на МОН <ExternalLink className="h-3 w-3" />
        </a>
        {subject.role === 'general' && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            Не го уча
          </button>
        )}
      </div>
      {open && (
        <div id={panelId} className="border-t border-slate-100 bg-slate-50/60 px-4 py-3">
          {program.testable ? (
            <TopicList
              program={program}
              lessonsFor={lessonsFor}
              lessonById={lessonById}
              mastery={mastery}
              onSelectLesson={onSelectLesson}
              onStartQuiz={(topic, topicLessons) => onStartQuiz(program, topic, topicLessons)}
              onOpenAiLesson={(topic) => onOpenAiLesson(program, topic, [])}
            />
          ) : (
            <p className="text-sm text-slate-600">Темите на тази програма не се упражняват с тестове.</p>
          )}
        </div>
      )}
    </li>
  );
};

const TopicList: React.FC<{
  program: MonProgram;
  lessonsFor: Map<string, string[]>;
  lessonById: Map<string, LessonData>;
  mastery: Record<string, TopicMasteryRecord>;
  onSelectLesson: (lesson: LessonData) => void;
  onStartQuiz: (topic: TopicInProgram, lessons: LessonData[]) => void;
  onOpenAiLesson: (topic: TopicInProgram) => void;
}> = ({ program, lessonsFor, lessonById, mastery, onSelectLesson, onStartQuiz, onOpenAiLesson }) => {
  const topics = programTopics(program);
  let lastModule: string | null = null;
  return (
    <ol className="space-y-0.5">
      {topics.map((t) => {
        const moduleHeading = t.module && t.module !== lastModule ? t.module : null;
        lastModule = t.module;
        const isSection = !lessonsFor.has(t.id);
        const linked = (lessonsFor.get(t.id) ?? []).map((id) => lessonById.get(id)).filter((l): l is LessonData => Boolean(l));
        return (
          <li key={t.id}>
            {moduleHeading && <p className="mb-1 mt-3 text-sm font-bold text-slate-800 first:mt-0">{moduleHeading}</p>}
            <div
              className={`flex flex-wrap items-baseline gap-x-2 py-1 text-sm ${isSection ? 'font-semibold text-slate-800' : 'text-slate-700'}`}
              style={{ paddingLeft: `${(t.depth - 1) * 16}px` }}
            >
              {t.num && <span className="tabular-nums text-slate-400">{t.num}</span>}
              <span className="min-w-0">{t.title}</span>
              {!isSection && (() => {
                const level = masteryLevel(mastery[t.id]);
                return (
                  <>
                    {linked.length === 0 && (
                      <button
                        type="button"
                        onClick={() => onOpenAiLesson(t)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-sapphire hover:underline cursor-pointer"
                      >
                        <BookOpen className="h-3 w-3" /> урок от AI
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onStartQuiz(t, linked)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-sapphire hover:underline cursor-pointer"
                    >
                      <ListChecks className="h-3 w-3" /> тест
                    </button>
                    {level !== 'unknown' && (
                      <span className={`rounded-full px-2 py-px text-[11px] font-semibold ${MASTERY_STYLE[level]}`}>{MASTERY_LABELS[level]}</span>
                    )}
                  </>
                );
              })()}
              {linked.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => onSelectLesson(l)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-sapphire hover:underline cursor-pointer"
                >
                  <BookOpen className="h-3 w-3" /> урок
                </button>
              ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
