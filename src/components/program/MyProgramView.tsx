import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileText,
  GraduationCap,
  ListChecks,
  Pencil,
  Sparkles,
  TriangleAlert
} from 'lucide-react';
import type { LessonData } from '../../types';
import {
  loadMonCatalog,
  loadTopicDetails,
  programTopics,
  type MonProgram,
  type MonTopicDetails,
  type TopicInProgram
} from '../../data/monCurriculum';
import { programCoverage } from '../../data/monCurriculum/lessonCoverage';
import { buildStudentPlan, type PlannedSubject } from '../../data/monCurriculum/studentPrograms';
import {
  SCHOOL_PROFILES,
  SCHOOL_TYPES,
  STUDENT_GRADES,
  emptyProfile,
  loadStudentProfile,
  saveStudentProfile,
  type ProfileId,
  type SchoolType,
  type StudentGrade,
  type StudentProfile,
} from '../../lib/studentProfile';
import type { MonSubjectId } from '../../data/monCurriculum/types';
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
  weak: 'bg-rose-50 text-rose-700 border border-rose-200',
  learning: 'bg-amber-50 text-amber-800 border border-amber-200',
  mastered: 'bg-brand-emerald-soft text-emerald-800 border border-emerald-200',
};

interface HighSchoolPreset {
  id: string;
  label: string;
  schools: string;
  grade: StudentGrade;
  schoolType: SchoolType;
  intensiveLanguage: boolean;
  profileId: ProfileId | null;
  profileSubjects: MonSubjectId[];
  specialty: string;
}

const HIGH_SCHOOL_PRESETS: HighSchoolPreset[] = [
  {
    id: 'pmg-12',
    label: 'СМГ / ПМГ (Математически · 12. кл.)',
    schools: 'СМГ, ПМГ, МГ — Профил „Математически“',
    grade: 12,
    schoolType: 'profiled',
    intensiveLanguage: true,
    profileId: 'math',
    profileSubjects: ['math', 'informatika', 'physics'],
    specialty: '',
  },
  {
    id: 'npmg-12',
    label: 'НПМГ / Медицина (Природни науки · 12. кл.)',
    schools: 'НПМГ, ПМГ Биология и Химия',
    grade: 12,
    schoolType: 'profiled',
    intensiveLanguage: true,
    profileId: 'natural',
    profileSubjects: ['biology', 'chemistry', 'physics'],
    specialty: '',
  },
  {
    id: 'eg-12',
    label: 'Езикова гимназия (Чужди езици · 12. кл.)',
    schools: '91. НЕГ, 1. АЕГ, 2. АЕГ, ЕГ',
    grade: 12,
    schoolType: 'profiled',
    intensiveLanguage: true,
    profileId: 'languages',
    profileSubjects: ['english', 'german', 'bel'],
    specialty: '',
  },
  {
    id: 'ngdek-12',
    label: 'Хуманитарен / НГДЕК (БЕЛ и История · 12. кл.)',
    schools: 'НГДЕК, Хуманитарни гимназии, СУ',
    grade: 12,
    schoolType: 'profiled',
    intensiveLanguage: true,
    profileId: 'humanities',
    profileSubjects: ['bel', 'history', 'philosophy'],
    specialty: '',
  },
  {
    id: 'tues-12',
    label: 'ТУЕС / Софтуерен (ИТ и Информатика · 12. кл.)',
    schools: 'ТУЕС, ПГКМКС, Софтуерни паралелки',
    grade: 12,
    schoolType: 'profiled',
    intensiveLanguage: true,
    profileId: 'software',
    profileSubjects: ['informatika', 'it', 'math'],
    specialty: '',
  },
  {
    id: 'ntbg-12',
    label: 'НТБГ / НФСГ (Икономика и бизнес · 12. кл.)',
    schools: 'НТБГ, НФСГ, Търговски гимназии',
    grade: 12,
    schoolType: 'profiled',
    intensiveLanguage: true,
    profileId: 'economic',
    profileSubjects: ['entrepreneurship', 'geography', 'math'],
    specialty: '',
  },
  {
    id: 'stage1-10',
    label: 'I гимназиален етап (10. клас · ООП)',
    schools: 'Всички гимназии и средни училища (10. кл.)',
    grade: 10,
    schoolType: 'profiled',
    intensiveLanguage: true,
    profileId: 'math',
    profileSubjects: ['math', 'informatika'],
    specialty: '',
  },
  {
    id: 'eg-8-int',
    label: 'Интензивен 8. клас (Подготвителен езиков)',
    schools: 'ЕГ, ПМГ, НТБГ с интензивен чужд език',
    grade: 8,
    schoolType: 'profiled',
    intensiveLanguage: true,
    profileId: 'languages',
    profileSubjects: ['english'],
    specialty: '',
  },
];

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

const ROLE_TITLES: Record<PlannedSubject['role'], { title: string; subtitle: string; badge: string }> = {
  general: {
    title: 'Раздел А: Задължителна общообразователна подготовка (ООП)',
    subtitle: 'Общообразователен минимум по ДОС на МОН за съответния клас',
    badge: 'Раздел А (ООП)',
  },
  profile: {
    title: 'Раздел Б: Профилирана подготовка (Задължителни модули М1–М4 за ДЗИ)',
    subtitle: 'Задълбочена академична подготовка по избраните профилиращи предмети в 11.–12. клас',
    badge: 'Раздел Б (Модули М1–М4)',
  },
  language: {
    title: 'Чуждоезикова подготовка по Общата европейска езикова рамка (CEFR A1–B2.1)',
    subtitle: 'Първи и втори чужд език според вида на паралелката (интензивна / разширена / ООП)',
    badge: 'Чужди езици (CEFR)',
  },
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

  const applyPreset = (preset: HighSchoolPreset) => {
    onChangeProfile({
      ...profile,
      grade: preset.grade,
      schoolType: preset.schoolType,
      intensiveLanguage: preset.intensiveLanguage,
      profileId: preset.profileId,
      profileSubjects: preset.profileSubjects,
      specialty: preset.specialty,
      addedProgramIds: [],
      removedProgramIds: [],
    });
  };

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
      {/* Паспорт на избрания профил + Бърз избор на клас и еталонна гимназия */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>
                {profile.grade <= 10
                  ? 'Първи гимназиален етап (8.–10. клас • Раздел А ООП)'
                  : 'Втори гимназиален етап (11.–12. клас • Раздел А ООП + Раздел Б Профил М1–М4)'}
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900">{profileSummary(profile)}</p>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-600">
              {included.length} предмета в учебния план · {totalTopics} официални теми и модули по програмите на МОН
            </p>
          </div>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <Pencil className="h-4 w-4" /> Пълни настройки на профила
          </button>
        </div>

        {/* Бързо превключване по класове (8.–12. клас) */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-500 mr-1">Преглед по клас:</span>
            {STUDENT_GRADES.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onChangeProfile({ ...profile, grade: g })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  profile.grade === g
                    ? 'bg-brand-sapphire text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {g}. клас {g <= 10 ? '(I етап)' : '(II етап)'}
              </button>
            ))}
          </div>
        </div>

        {/* Бърз избор на еталонен учебен план по вид гимназия и профил */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Бърз избор на еталонен учебен план по гимназия и профил:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {HIGH_SCHOOL_PRESETS.map((preset) => {
              const isCurrentPreset =
                profile.grade === preset.grade &&
                profile.schoolType === preset.schoolType &&
                profile.profileId === preset.profileId &&
                profile.intensiveLanguage === preset.intensiveLanguage;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  title={preset.schools}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    isCurrentPreset
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-brand-sapphire-soft p-5">
        <div className="min-w-0 max-w-prose">
          <h2 className="text-base font-bold text-slate-900">Входен диагностичен тест по програмата на МОН</h2>
          <p className="mt-1 text-sm text-slate-600">
            {diagnosticDone === testable.length && testable.length > 0
              ? 'Готов е за всички предмети. Слабите теми са отбелязани по-долу.'
              : `По 10 въпроса за предмет по цялата програма — показва кои раздели и модули владееш. Готови: ${diagnosticDone} от ${testable.length}.`}
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

      {groups.map((g) => {
        const roleMeta = ROLE_TITLES[g.role];
        return (
          <section key={g.role} aria-labelledby={`role-${g.role}`} className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-900 mb-0.5">
                  {roleMeta.badge}
                </span>
                <h2 id={`role-${g.role}`} className="text-base sm:text-lg font-bold text-slate-900">
                  {roleMeta.title}
                </h2>
                <p className="text-xs text-slate-500">{roleMeta.subtitle}</p>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                {g.subjects.length} {g.subjects.length === 1 ? 'предмет' : 'предмета'}
              </span>
            </div>
            <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
              {g.subjects.map((s, sIdx) => (
                <SubjectRow
                  key={s.program.id}
                  subject={s}
                  defaultOpen={sIdx === 0 && g.role !== 'language'}
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
        );
      })}

      {left.length > 0 && (
        <section aria-labelledby="left-out">
          <h2 id="left-out" className="mb-2 text-sm font-bold text-slate-700">Допълнителни предмети извън текущия ти учебен план</h2>
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
  defaultOpen?: boolean;
  lessons: LessonData[];
  lessonById: Map<string, LessonData>;
  mastery: Record<string, TopicMasteryRecord>;
  onRemove: () => void;
  onSelectLesson: (lesson: LessonData) => void;
  onStartQuiz: (program: MonProgram, topic: TopicInProgram, lessons: LessonData[]) => void;
  onOpenAiLesson: (program: MonProgram, topic: TopicInProgram, lessons: LessonData[]) => void;
}

const SubjectRow: React.FC<SubjectRowProps> = ({
  subject,
  defaultOpen = false,
  lessons,
  lessonById,
  mastery,
  onRemove,
  onSelectLesson,
  onStartQuiz,
  onOpenAiLesson,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const { program } = subject;
  const coverage = useMemo(() => programCoverage(program, lessons), [program, lessons]);
  const lessonsFor = useMemo(() => new Map(coverage.topics.map((t) => [t.topicId, t.lessonIds])), [coverage]);
  const panelId = `topics-${program.id}`;

  return (
    <li>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4 hover:bg-slate-50/70 transition-colors">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left cursor-pointer"
        >
          <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
          <span className="min-w-0">
            <span className="block text-sm sm:text-base font-bold text-slate-900">{subject.name}</span>
            <span className="block text-xs text-slate-500">
              {program.modules.length > 0 ? `${program.modules.length} задължителни модула по МОН · ` : ''}
              {program.testable ? `${subject.topicCount} теми и подтеми` : 'без тестова част'}
              {coverage.covered > 0 && ` · ${coverage.covered} теми със свързани уроци в каталога`}
            </span>
          </span>
        </button>
        <a
          href={program.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-sapphire hover:underline"
        >
          Официална програма на МОН <ExternalLink className="h-3 w-3" />
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
        <div id={panelId} className="border-t border-slate-100 bg-slate-50/60 px-4 py-4">
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
  const topics = useMemo(() => programTopics(program), [program]);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [detailsCache, setDetailsCache] = useState<Record<string, MonTopicDetails | null>>({});
  const [loadingTopicId, setLoadingTopicId] = useState<string | null>(null);

  const handleToggleDetails = async (topicId: string) => {
    if (expandedTopicId === topicId) {
      setExpandedTopicId(null);
      return;
    }
    setExpandedTopicId(topicId);
    if (topicId in detailsCache) return;
    setLoadingTopicId(topicId);
    try {
      const details = await loadTopicDetails(topicId);
      setDetailsCache((prev) => ({ ...prev, [topicId]: details }));
    } catch {
      setDetailsCache((prev) => ({ ...prev, [topicId]: null }));
    } finally {
      setLoadingTopicId(null);
    }
  };

  let lastModule: string | null = null;

  return (
    <ol className="space-y-1.5">
      {topics.map((t) => {
        const moduleHeading = t.module && t.module !== lastModule ? t.module : null;
        lastModule = t.module;
        const isSection = !lessonsFor.has(t.id);
        const linked = (lessonsFor.get(t.id) ?? []).map((id) => lessonById.get(id)).filter((l): l is LessonData => Boolean(l));
        const isExpanded = expandedTopicId === t.id;
        const details = detailsCache[t.id];

        return (
          <li key={t.id}>
            {moduleHeading && (
              <div className="mb-2 mt-4 first:mt-0 p-2.5 rounded-xl bg-blue-100/70 border border-blue-200 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase">
                  Профилиран модул на МОН
                </span>
                <span className="text-xs sm:text-sm font-bold text-blue-950">{moduleHeading}</span>
              </div>
            )}
            <div
              className={`rounded-xl transition-colors ${
                isSection
                  ? 'bg-slate-200/60 px-3 py-2 font-bold text-slate-900 text-xs sm:text-sm mt-2'
                  : 'bg-white border border-slate-200/80 px-3 py-2.5 text-slate-800 shadow-2xs'
              }`}
              style={{ marginLeft: `${Math.max(0, (t.depth - 1) * 14)}px` }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-baseline gap-2 min-w-0 flex-1">
                  {t.num && (
                    <span className="tabular-nums font-bold text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                      {t.num}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-semibold leading-snug">{t.title}</span>
                </div>

                {!isSection && (() => {
                  const level = masteryLevel(mastery[t.id]);
                  return (
                    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                      {level !== 'unknown' && (
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${MASTERY_STYLE[level]}`}>
                          {MASTERY_LABELS[level]}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => void handleToggleDetails(t.id)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                          isExpanded
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border-slate-200'
                        }`}
                        title="Виж очакваните компетентности и ключовите понятия по програмата на МОН"
                      >
                        <FileText className="h-3 w-3" />
                        <span>ДОС на МОН</span>
                      </button>

                      {linked.slice(0, 2).map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => onSelectLesson(l)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-[11px] font-bold cursor-pointer"
                          title={`Отвори пълната разработка: ${l.title}`}
                        >
                          <BookOpen className="h-3 w-3 text-emerald-700" />
                          <span>Разработка</span>
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() => onOpenAiLesson(t)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-[11px] font-semibold cursor-pointer"
                      >
                        <Sparkles className="h-3 w-3 text-blue-600" />
                        <span>AI Урок</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onStartQuiz(t, linked)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-sapphire hover:bg-brand-sapphire-dark text-white text-[11px] font-bold cursor-pointer"
                      >
                        <ListChecks className="h-3 w-3" />
                        <span>Тест</span>
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* Разгънати очаквани резултати и понятия по МОН */}
              {isExpanded && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs space-y-2.5 bg-slate-50/70 p-3 rounded-lg">
                  {loadingTopicId === t.id ? (
                    <p className="text-slate-500">Зареждат се очакваните резултати и понятия по програмата на МОН…</p>
                  ) : details ? (
                    <>
                      {details.outcomes.length > 0 && (
                        <div>
                          <p className="font-bold text-slate-800 mb-1">
                            Очаквани резултати и компетентности по учебната програма на МОН:
                          </p>
                          <ul className="space-y-1 pl-4 list-disc text-slate-700 marker:text-blue-600">
                            {details.outcomes.map((out, oIdx) => (
                              <li key={oIdx} className="leading-relaxed">{out}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {details.concepts.length > 0 && (
                        <div>
                          <p className="font-bold text-slate-800 mb-1">
                            Задължителни нови понятия и терминология:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {details.concepts.map((concept, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-900 font-semibold text-[11px]"
                              >
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {details.outcomes.length === 0 && details.concepts.length === 0 && (
                        <p className="text-slate-600">
                          Темата е част от официалната учебна програма на МОН ({program.title}). Използвай бутоните „Разработка“, „AI Урок“ или „Тест“ за пълна подготовка.
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-slate-600">
                      Темата е част от официалната учебна програма на МОН ({program.title}).
                    </p>
                  )}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
