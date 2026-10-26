import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ListChecks, Loader2, RotateCcw } from 'lucide-react';
import type { MonProgram, TopicInProgram } from '../../data/monCurriculum';
import { MON_SUBJECTS } from '../../data/monCurriculum/subjects';
import type { TopicLesson } from '../../lib/topicLesson';
import { getTopicLesson } from '../../services/topicLessonService';
import { MathText } from '../exam-engine/MathText';

interface TopicLessonPanelProps {
  program: MonProgram;
  topic: TopicInProgram;
  onBack: () => void;
  onStartQuiz: () => void;
}

type Phase = { kind: 'loading' } | { kind: 'error'; message: string } | { kind: 'ready'; lesson: TopicLesson };

export const TopicLessonPanel: React.FC<TopicLessonPanelProps> = ({ program, topic, onBack, onStartQuiz }) => {
  const [phase, setPhase] = useState<Phase>({ kind: 'loading' });
  const run = useRef(0);

  const load = useCallback(
    (fresh: boolean) => {
      const id = ++run.current;
      setPhase({ kind: 'loading' });
      getTopicLesson(program, topic, { fresh })
        .then((lesson) => id === run.current && setPhase({ kind: 'ready', lesson }))
        .catch((err: unknown) => id === run.current && setPhase({ kind: 'error', message: err instanceof Error ? err.message : 'Урокът не можа да се състави.' }));
    },
    [program, topic],
  );

  useEffect(() => {
    load(false);
    return () => {
      run.current++;
    };
  }, [load]);

  return (
    <article className="space-y-6" aria-labelledby="topic-lesson-title">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer">
        <ArrowLeft className="h-4 w-4" /> Към темите
      </button>
      <header>
        <p className="text-sm text-slate-500">
          {MON_SUBJECTS[program.subject].name}
          {topic.section ? ` · ${topic.section}` : ''}
        </p>
        <h2 id="topic-lesson-title" className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">{topic.title}</h2>
      </header>

      {phase.kind === 'loading' && (
        <p className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-xs" role="status">
          <Loader2 className="h-4 w-4 animate-spin text-brand-sapphire" />
          Съставям урока по очакваните резултати от програмата на МОН…
        </p>
      )}

      {phase.kind === 'error' && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-900" role="alert">
          <p className="font-semibold">Урокът не можа да се състави.</p>
          <p className="mt-1">{phase.message}</p>
          <button type="button" onClick={() => load(false)} className="mt-3 inline-flex h-11 items-center gap-2 rounded-lg bg-brand-sapphire px-4 font-semibold text-white hover:bg-brand-sapphire-dark cursor-pointer">
            <RotateCcw className="h-4 w-4" /> Опитай отново
          </button>
        </div>
      )}

      {phase.kind === 'ready' && <LessonBody lesson={phase.lesson} onStartQuiz={onStartQuiz} onRegenerate={() => load(true)} />}
    </article>
  );
};

const LessonBody: React.FC<{ lesson: TopicLesson; onStartQuiz: () => void; onRegenerate: () => void }> = ({ lesson, onStartQuiz, onRegenerate }) => (
  <>
    <p className="text-xs text-slate-500">
      Урокът е съставен от Google Gemini по очакваните резултати в програмата на МОН. Възможни са грешки — сверявай с учебника.
    </p>

    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
      <MathText text={lesson.overview} className="block max-w-prose text-base leading-relaxed text-slate-800" />
      <h3 className="mt-5 text-base font-bold text-slate-900">Най-важното</h3>
      <ul className="mt-2 max-w-prose list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 marker:text-brand-sapphire">
        {lesson.keyPoints.map((p) => (
          <li key={p}>
            <MathText text={p} />
          </li>
        ))}
      </ul>
      {lesson.formulas.length > 0 && (
        <dl className="mt-5 grid gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-sm sm:grid-cols-[minmax(0,14rem)_1fr]">
          {lesson.formulas.map((f) => (
            <React.Fragment key={f.label}>
              <dt className="font-semibold text-slate-700">{f.label}</dt>
              <dd className="text-slate-900">
                <MathText text={f.value} />
              </dd>
            </React.Fragment>
          ))}
        </dl>
      )}
    </section>

    {lesson.examples.length > 0 && (
      <section aria-labelledby="lesson-examples">
        <h3 id="lesson-examples" className="mb-2 text-lg font-bold text-slate-900">Решени примери</h3>
        <ol className="space-y-3">
          {lesson.examples.map((e, i) => (
            <li key={e.problem} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold text-slate-500">Пример {i + 1}</p>
              <MathText text={e.problem} className="mt-1 block font-semibold leading-relaxed text-slate-900" />
              <MathText text={e.solution} className="mt-2 block border-t border-slate-100 pt-2 text-sm leading-relaxed text-slate-700" />
            </li>
          ))}
        </ol>
      </section>
    )}

    {lesson.commonTraps.length > 0 && (
      <section aria-labelledby="lesson-traps" className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 id="lesson-traps" className="text-base font-bold text-amber-900">Внимавай</h3>
        <ul className="mt-2 max-w-prose list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-amber-900">
          {lesson.commonTraps.map((t) => (
            <li key={t}>
              <MathText text={t} />
            </li>
          ))}
        </ul>
      </section>
    )}

    <section aria-labelledby="lesson-cards">
      <h3 id="lesson-cards" className="mb-1 text-lg font-bold text-slate-900">Флашкарти</h3>
      <p className="mb-3 text-sm text-slate-500">Натисни картата, за да видиш отговора.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {lesson.flashcards.map((c) => (
          <Flashcard key={c.front} front={c.front} back={c.back} />
        ))}
      </ul>
    </section>

    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onStartQuiz}
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-sapphire px-5 text-sm font-semibold text-white hover:bg-brand-sapphire-dark cursor-pointer"
      >
        <ListChecks className="h-4 w-4" /> Тест по темата
      </button>
      <button
        type="button"
        onClick={onRegenerate}
        className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
      >
        <RotateCcw className="h-4 w-4" /> Нов вариант на урока
      </button>
    </div>
  </>
);

const Flashcard: React.FC<{ front: string; back: string }> = ({ front, back }) => {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex min-h-28 w-full flex-col justify-center rounded-xl border p-4 text-left text-sm transition-colors cursor-pointer ${
          open ? 'border-blue-200 bg-brand-sapphire-soft' : 'border-slate-200 bg-white hover:border-brand-sapphire'
        }`}
      >
        <MathText text={front} className="block font-semibold text-slate-900" />
        {open && <MathText text={back} className="mt-2 block leading-relaxed text-slate-700" />}
      </button>
    </li>
  );
};
