import React, { useMemo, useRef, useState } from 'react';
import { ArrowLeft, Loader2, Pause, Play, RotateCcw } from 'lucide-react';
import { programTopics, type MonProgram } from '../../data/monCurriculum';
import type { PlannedSubject } from '../../data/monCurriculum/studentPrograms';
import { clearDiagnosticRun, loadDiagnosticRuns, saveDiagnosticRun, scoreDiagnostic, type DiagnosticRun } from '../../lib/diagnostic';
import { MASTERY_LABELS, loadTopicMastery, masteryLevel } from '../../lib/topicMastery';
import { finishDiagnostic, startDiagnostic } from '../../services/diagnosticService';
import { recordTopicQuizMistake } from '../../services/topicQuizService';
import { QuestionCard } from './TopicQuizPanel';

interface DiagnosticPanelProps {
  subjects: PlannedSubject[];
  onBack: () => void;
}

/** Входният тест: списък с предметите, тест по всеки от тях, резултат „знае / може“ */
export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({ subjects, onBack }) => {
  const testable = subjects.filter((s) => s.program.testable && s.topicCount > 0);
  const [runs, setRuns] = useState(loadDiagnosticRuns);
  const [active, setActive] = useState<MonProgram | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<{ programId: string; message: string } | null>(null);
  const done = testable.filter((s) => runs[s.program.id]?.finishedAt).length;

  const refresh = () => setRuns(loadDiagnosticRuns());

  const begin = async (program: MonProgram, restart = false) => {
    setError(null);
    const existing = runs[program.id];
    if (existing && !existing.finishedAt && !restart) {
      setActive(program);
      return;
    }
    if (restart) clearDiagnosticRun(program.id);
    setLoading(program.id);
    try {
      await startDiagnostic(program);
      refresh();
      setActive(program);
    } catch (err) {
      setError({ programId: program.id, message: err instanceof Error ? err.message : 'Тестът не можа да се състави.' });
    } finally {
      setLoading(null);
    }
  };

  if (active && runs[active.id]) {
    return (
      <DiagnosticRunner
        program={active}
        initial={runs[active.id]}
        onExit={() => {
          refresh();
          setActive(null);
        }}
      />
    );
  }

  return (
    <section className="space-y-5" aria-labelledby="diagnostic-title">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer">
        <ArrowLeft className="h-4 w-4" /> Към програмата
      </button>
      <div>
        <h2 id="diagnostic-title" className="text-2xl font-bold tracking-tight text-slate-900">Входен тест</h2>
        <p className="mt-1 max-w-prose text-sm text-slate-600">
          По 10 въпроса за всеки предмет, по един на тема — от началото до края на програмата. Половината проверяват какво знаеш, другата половина — какво можеш да приложиш.
          Можеш да спреш по всяко време и да продължиш по-късно. Готови: {done} от {testable.length}.
        </p>
      </div>
      <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        {testable.map((s) => {
          const run = runs[s.program.id];
          const score = run ? scoreDiagnostic(run) : null;
          const answered = run ? run.answers.filter((a) => a !== null).length : 0;
          const busy = loading === s.program.id;
          return (
            <li key={s.program.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900">{s.name}</p>
                <p className="text-xs text-slate-500">
                  {!run && 'не е започнат'}
                  {run && !run.finishedAt && `спрян на въпрос ${answered + 1} от ${run.questions.length}`}
                  {run?.finishedAt && score &&
                    `${score.correct} от ${score.total} верни · знае ${score.knows.correct}/${score.knows.total} · може ${score.can.correct}/${score.can.total}`}
                </p>
                {error?.programId === s.program.id && <p className="mt-1 text-xs text-rose-700" role="alert">{error.message}</p>}
              </div>
              {run?.finishedAt ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => begin(s.program, true)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer disabled:cursor-wait"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />} Нов тест
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busy || loading !== null}
                  onClick={() => begin(s.program)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-brand-sapphire px-3 text-sm font-semibold text-white hover:bg-brand-sapphire-dark cursor-pointer disabled:cursor-wait disabled:opacity-70"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                  {busy ? 'Съставям…' : run ? 'Продължи' : 'Започни'}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const DiagnosticRunner: React.FC<{ program: MonProgram; initial: DiagnosticRun; onExit: () => void }> = ({ program, initial, onExit }) => {
  const [run, setRun] = useState(initial);
  const firstOpen = run.answers.findIndex((a) => a === null);
  const [index, setIndex] = useState(firstOpen === -1 ? run.questions.length - 1 : firstOpen);
  const topics = useMemo(() => new Map(programTopics(program).map((t) => [t.id, t])), [program]);
  const finishedRef = useRef(Boolean(initial.finishedAt));

  const answer = (choice: number) => {
    if (run.answers[index] !== null) return;
    const q = run.questions[index];
    const topic = topics.get(q.topicId);
    if (choice !== q.correctIndex && topic) recordTopicQuizMistake(program, topic, q, choice);
    const next = { ...run, answers: run.answers.map((a, i) => (i === index ? choice : a)) };
    saveDiagnosticRun(next);
    setRun(next);
  };

  const next = () => {
    if (index + 1 < run.questions.length) {
      setIndex(index + 1);
      return;
    }
    if (!finishedRef.current) {
      finishedRef.current = true;
      setRun(finishDiagnostic(run));
    }
  };

  if (run.finishedAt) return <DiagnosticSummary program={program} run={run} topics={topics} onExit={onExit} />;

  return (
    <section className="space-y-5" aria-label={`Входен тест: ${program.title}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Входен тест · {program.title}</h2>
        <button
          type="button"
          onClick={onExit}
          className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          <Pause className="h-4 w-4" /> Спри и продължи по-късно
        </button>
      </div>
      <p className="text-sm text-slate-500">
        Тема: {topics.get(run.questions[index].topicId)?.title ?? '—'} · {run.questions[index].kind === 'can' ? 'приложение' : 'знание'}
      </p>
      <QuestionCard
        key={run.questions[index].id}
        question={run.questions[index]}
        index={index}
        total={run.questions.length}
        chosen={run.answers[index]}
        onAnswer={answer}
        onNext={next}
      />
    </section>
  );
};

const DiagnosticSummary: React.FC<{
  program: MonProgram;
  run: DiagnosticRun;
  topics: Map<string, { title: string }>;
  onExit: () => void;
}> = ({ program, run, topics, onExit }) => {
  const score = scoreDiagnostic(run);
  const mastery = loadTopicMastery();
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6" aria-label={`Резултат: ${program.title}`}>
      <h2 className="text-xl font-bold text-slate-900">{program.title}: входният тест е готов</h2>
      <p className="text-3xl font-bold tabular-nums tracking-tight text-slate-900">
        {score.correct} от {score.total}
        <span className="ml-2 text-base font-semibold text-slate-500">верни</span>
      </p>
      <p className="text-sm text-slate-700">
        Знае: {score.knows.correct} от {score.knows.total} · Може: {score.can.correct} от {score.can.total}
      </p>
      <ul className="space-y-1 border-t border-slate-100 pt-3 text-sm">
        {run.questions.map((q, i) => {
          const ok = run.answers[i] === q.correctIndex;
          return (
            <li key={q.id} className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 text-slate-800">{topics.get(q.topicId)?.title ?? q.topicId}</span>
              <span className={`shrink-0 text-xs font-semibold ${ok ? 'text-emerald-800' : 'text-rose-700'}`}>
                {ok ? 'вярно' : 'грешно'} · {MASTERY_LABELS[masteryLevel(mastery[q.topicId])]}
              </span>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={onExit}
        className="inline-flex h-11 items-center rounded-lg bg-brand-sapphire px-5 text-sm font-semibold text-white hover:bg-brand-sapphire-dark cursor-pointer"
      >
        Към входния тест
      </button>
    </section>
  );
};
