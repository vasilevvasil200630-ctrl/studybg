import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, Loader2, RotateCcw, X } from 'lucide-react';
import type { MonProgram, TopicInProgram } from '../../data/monCurriculum';
import { MON_SUBJECTS } from '../../data/monCurriculum/subjects';
import type { TopicQuizQuestion } from '../../lib/topicQuiz';
import { MASTERY_LABELS, loadTopicMastery, masteryLevel, recordTopicResult } from '../../lib/topicMastery';
import { createTopicQuiz, recordTopicQuizMistake, type TopicQuizResult } from '../../services/topicQuizService';
import type { LessonData } from '../../types';
import { MathText } from '../exam-engine/MathText';

interface TopicQuizPanelProps {
  program: MonProgram;
  topic: TopicInProgram;
  lessons: LessonData[];
  onBack: () => void;
}

type Phase =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'running'; quiz: TopicQuizResult; index: number; answers: (number | null)[] }
  | { kind: 'done'; quiz: TopicQuizResult; answers: (number | null)[] };

const DIFFICULTY: Record<TopicQuizQuestion['difficulty'], string> = { easy: 'лесен', medium: 'среден', hard: 'труден' };
const LETTERS = ['А', 'Б', 'В', 'Г'];

export const TopicQuizPanel: React.FC<TopicQuizPanelProps> = ({ program, topic, lessons, onBack }) => {
  const [phase, setPhase] = useState<Phase>({ kind: 'loading' });
  const run = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const start = useCallback(() => {
    const id = ++run.current;
    setPhase({ kind: 'loading' });
    createTopicQuiz({ program, topic, lessons })
      .then((quiz) => {
        if (id === run.current) setPhase({ kind: 'running', quiz, index: 0, answers: quiz.questions.map(() => null) });
      })
      .catch((err: unknown) => {
        if (id === run.current) setPhase({ kind: 'error', message: err instanceof Error ? err.message : 'Тестът не можа да се състави.' });
      });
  }, [program, topic, lessons]);

  useEffect(() => {
    start();
    return () => {
      run.current++;
    };
  }, [start]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [phase.kind]);

  const answer = (choice: number) => {
    if (phase.kind !== 'running' || phase.answers[phase.index] !== null) return;
    const q = phase.quiz.questions[phase.index];
    if (choice !== q.correctIndex) recordTopicQuizMistake(program, topic, q, choice);
    const answers = phase.answers.map((a, i) => (i === phase.index ? choice : a));
    setPhase({ ...phase, answers });
  };

  const next = () => {
    if (phase.kind !== 'running') return;
    if (phase.index + 1 < phase.quiz.questions.length) {
      setPhase({ ...phase, index: phase.index + 1 });
      return;
    }
    const correct = phase.quiz.questions.filter((q, i) => phase.answers[i] === q.correctIndex).length;
    recordTopicResult(topic.id, correct, phase.quiz.questions.length, 'quiz');
    setPhase({ kind: 'done', quiz: phase.quiz, answers: phase.answers });
  };

  return (
    <section className="space-y-5" aria-labelledby="topic-quiz-title">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Към темите
      </button>

      <div>
        <p className="text-sm text-slate-500">
          {MON_SUBJECTS[program.subject].name}
          {topic.section ? ` · ${topic.section}` : ''}
        </p>
        <h2 id="topic-quiz-title" ref={headingRef} tabIndex={-1} className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900 outline-none">
          {topic.title}
        </h2>
      </div>

      {phase.kind === 'loading' && (
        <p className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-xs" role="status">
          <Loader2 className="h-4 w-4 animate-spin text-brand-sapphire" />
          Съставям 10 нови въпроса по темата и очакваните резултати от програмата на МОН…
        </p>
      )}

      {phase.kind === 'error' && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-900" role="alert">
          <p className="font-semibold">Тестът не можа да се състави.</p>
          <p className="mt-1">{phase.message}</p>
          <button
            type="button"
            onClick={start}
            className="mt-3 inline-flex h-11 items-center gap-2 rounded-lg bg-brand-sapphire px-4 font-semibold text-white hover:bg-brand-sapphire-dark cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" /> Опитай отново
          </button>
        </div>
      )}

      {(phase.kind === 'running' || phase.kind === 'done') && <SourceNote quiz={phase.quiz} />}

      {phase.kind === 'running' && (
        <QuestionCard
          key={phase.quiz.questions[phase.index].id}
          question={phase.quiz.questions[phase.index]}
          index={phase.index}
          total={phase.quiz.questions.length}
          chosen={phase.answers[phase.index]}
          onAnswer={answer}
          onNext={next}
        />
      )}

      {phase.kind === 'done' && <QuizSummary quiz={phase.quiz} answers={phase.answers} topicId={topic.id} onAgain={start} onBack={onBack} />}
    </section>
  );
};

const SourceNote: React.FC<{ quiz: TopicQuizResult }> = ({ quiz }) =>
  quiz.source === 'ai' ? (
    <p className="text-xs text-slate-500">Въпросите са съставени от Google Gemini по програмата на МОН и всеки тест е нов. Възможни са грешки — обяснението до всеки отговор помага да ги видиш.</p>
  ) : (
    <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
      {quiz.fallbackReason} Затова въпросите са от урока в сайта по тази тема.
    </p>
  );

const QuestionCard: React.FC<{
  question: TopicQuizQuestion;
  index: number;
  total: number;
  chosen: number | null;
  onAnswer: (i: number) => void;
  onNext: () => void;
}> = ({ question, index, total, chosen, onAnswer, onNext }) => {
  const answered = chosen !== null;
  const nextRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (answered) nextRef.current?.focus();
  }, [answered]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-500">
        <span>
          Въпрос {index + 1} от {total} · {DIFFICULTY[question.difficulty]}
        </span>
        <span className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
          <span className="block h-full bg-brand-sapphire" style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }} />
        </span>
      </div>
      <MathText text={question.question} className="mt-3 block text-base font-semibold leading-relaxed text-slate-900" />
      <ul className="mt-4 space-y-2">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isChosen = i === chosen;
          const state = !answered ? 'idle' : isCorrect ? 'correct' : isChosen ? 'wrong' : 'muted';
          const cls = {
            idle: 'border-slate-200 bg-white hover:border-brand-sapphire hover:bg-brand-sapphire-soft cursor-pointer',
            correct: 'border-emerald-300 bg-brand-emerald-soft',
            wrong: 'border-rose-300 bg-rose-50',
            muted: 'border-slate-200 bg-white opacity-70',
          }[state];
          return (
            <li key={i}>
              <button
                type="button"
                disabled={answered}
                onClick={() => onAnswer(i)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm text-slate-800 transition-colors ${cls}`}
              >
                <span className="mt-px w-4 shrink-0 font-bold text-slate-500">{LETTERS[i]}</span>
                <MathText text={opt} className="min-w-0 flex-1" />
                {state === 'correct' && <Check className="h-4 w-4 shrink-0 text-brand-emerald-dark" aria-label="верен отговор" />}
                {state === 'wrong' && <X className="h-4 w-4 shrink-0 text-rose-600" aria-label="твоят отговор" />}
              </button>
            </li>
          );
        })}
      </ul>
      {answered && (
        <div className="mt-4 space-y-3" aria-live="polite">
          <p className={`text-sm font-semibold ${chosen === question.correctIndex ? 'text-emerald-800' : 'text-rose-700'}`}>
            {chosen === question.correctIndex ? 'Вярно.' : 'Грешно — въпросът отиде в банката с грешки.'}
          </p>
          <MathText text={question.explanation} className="block text-sm leading-relaxed text-slate-700" />
          <button
            ref={nextRef}
            type="button"
            onClick={onNext}
            className="inline-flex h-11 items-center rounded-lg bg-brand-sapphire px-5 text-sm font-semibold text-white hover:bg-brand-sapphire-dark cursor-pointer"
          >
            {index + 1 < total ? 'Следващ въпрос' : 'Виж резултата'}
          </button>
        </div>
      )}
    </div>
  );
};

const QuizSummary: React.FC<{
  quiz: TopicQuizResult;
  answers: (number | null)[];
  topicId: string;
  onAgain: () => void;
  onBack: () => void;
}> = ({ quiz, answers, topicId, onAgain, onBack }) => {
  const correct = quiz.questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const level = masteryLevel(loadTopicMastery()[topicId]);
  const wrong = quiz.questions.filter((q, i) => answers[i] !== q.correctIndex);
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
      <p className="text-3xl font-bold tabular-nums tracking-tight text-slate-900">
        {correct} от {quiz.questions.length}
        <span className="ml-2 text-base font-semibold text-slate-500">верни</span>
      </p>
      <p className="text-sm text-slate-700">
        Темата е <strong>{MASTERY_LABELS[level]}</strong> според последните ти тестове.
        {wrong.length > 0 && ' Сгрешените въпроси са в банката с грешки.'}
      </p>
      {wrong.length > 0 && (
        <ul className="space-y-2 border-t border-slate-100 pt-3">
          {wrong.map((q) => (
            <li key={q.id} className="text-sm">
              <MathText text={q.question} className="block font-semibold text-slate-800" />
              <span className="text-slate-600">
                Верен отговор: <MathText text={q.options[q.correctIndex]} />
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onAgain}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-sapphire px-5 text-sm font-semibold text-white hover:bg-brand-sapphire-dark cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" /> Нов тест по темата
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          Към темите
        </button>
      </div>
    </div>
  );
};
