import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, CheckCircle2, ExternalLink, Lightbulb, RotateCcw, Send, Trophy, X, XCircle } from 'lucide-react';
import {
  PRACTICE_PAPER_LABEL,
  scorePaper,
  type ExamPaper,
  type PaperAnswers,
  type PaperQuestion,
  type PaperResult
} from '../../lib/examPaperScoring';
import { formatGrade } from '../../lib/monGradeScale';
import { clearTestProgress, loadTestProgress, useTestProgressAutosave } from '../../lib/testProgress';
import { examHistoryService, type ExamAttemptRecord } from '../../services/examHistoryService';
import { ExamFocusBar } from './ExamFocusBar';
import { QuestionNavigator, type QuestionItemStatus } from './QuestionNavigator';
import { Scratchpad } from './Scratchpad';

/**
 * Двигател за провеждане на пълен изпитен вариант — пренесен от Матура Плюс
 * (app/math-7/exams/[examId]/MathExamRunner) върху модела и оценяването на StudyBG (lib/examPaperScoring).
 *
 * Поток: решаване с таймер → предаване (ръчно или при изтичане на времето) → проверка по ключа,
 * обяснения, самооценка на задачите със свободен отговор по критериите → запис в историята на изпитите.
 * Незавършеният изпит се пази в sessionStorage до 30 минути отсъствие (lib/testProgress).
 */

const LETTERS = ['А', 'Б', 'В', 'Г', 'Д', 'Е'];
const Q_ID_PREFIX = 'exam-q-';

type Snapshot = {
  answers: PaperAnswers;
  openScores: Record<string, number | undefined>;
  drafts: Record<string, string>;
  flags: Record<string, boolean>;
  submitted: boolean;
  secondsLeft: number;
};

export const PaperBadge: React.FC<{ paper: ExamPaper }> = ({ paper }) =>
  paper.kind === 'official' && paper.officialSourceUrl ? (
    <a
      href={paper.officialSourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
    >
      Официален вариант на МОН{paper.year ? ` (${paper.year})` : ''}
      <ExternalLink className="h-3 w-3" aria-hidden="true" />
    </a>
  ) : (
    <span className="inline-block rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-900">
      {PRACTICE_PAPER_LABEL}
    </span>
  );

const isAnswered = (q: PaperQuestion, s: Pick<Snapshot, 'answers' | 'drafts' | 'openScores'>): boolean => {
  if (q.kind === 'choice') return typeof s.answers[q.id] === 'number';
  if (q.kind === 'short') return typeof s.answers[q.id] === 'string' && (s.answers[q.id] as string).trim() !== '';
  return (s.drafts[q.id] ?? '').trim() !== '' || typeof s.openScores[q.id] === 'number';
};

function playChime(): void {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch {
    // без звук — изпитът продължава
  }
}

function buildAttempt(paper: ExamPaper, result: PaperResult, timeSpentSeconds: number): Omit<ExamAttemptRecord, 'id' | 'timestamp' | 'formattedDate'> {
  const [s1, s2, ...rest] = result.sections;
  return {
    lessonId: paper.id,
    lessonTitle: paper.title,
    subject: paper.subject,
    grade: paper.exam,
    examPreset: `paper:${paper.id}`,
    durationMinutes: paper.durationMinutes,
    timeSpentSeconds,
    module1Points: s1?.points ?? 0,
    module2Points: s2?.points ?? 0,
    module3Points: rest.reduce((sum, s) => sum + s.points, 0),
    totalPoints: result.totalPoints,
    gradeEquivalent: result.grade ? formatGrade(result.grade) : `${result.totalPoints} / ${result.maxPoints} точки`,
    gradeNumeric: result.grade?.numeric ?? null,
    passed: result.grade?.passed ?? false
  };
}

interface ExamRunnerProps {
  paper: ExamPaper;
  /** Връщане към списъка с варианти */
  onExit: () => void;
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({ paper, onExit }) => {
  const progressKey = `paper:${paper.id}`;
  const fullSeconds = paper.durationMinutes * 60;

  const [answers, setAnswers] = useState<PaperAnswers>({});
  const [openScores, setOpenScores] = useState<Record<string, number | undefined>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(fullSeconds);
  const [soundMuted, setSoundMuted] = useState(false);
  const [restored, setRestored] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const warnedRef = useRef(false);
  const attemptIdRef = useRef<string | null>(null);

  // Възстановяване на незавършен изпит (само в браузъра, след монтиране)
  useEffect(() => {
    const snap = loadTestProgress<Snapshot>(progressKey);
    if (snap && !snap.submitted) {
      setAnswers(snap.answers ?? {});
      setOpenScores(snap.openScores ?? {});
      setDrafts(snap.drafts ?? {});
      setFlags(snap.flags ?? {});
      setSecondsLeft(Math.max(0, Math.min(fullSeconds, snap.secondsLeft ?? fullSeconds)));
      if (Object.keys(snap.answers ?? {}).length > 0 || Object.keys(snap.drafts ?? {}).length > 0) setRestored(true);
    }
    setHydrated(true);
  }, [progressKey, fullSeconds]);

  useTestProgressAutosave<Snapshot>(
    progressKey,
    { answers, openScores, drafts, flags, submitted, secondsLeft },
    hydrated && !submitted
  );

  const questions = useMemo(() => paper.sections.flatMap((s) => s.questions), [paper]);
  const result = useMemo(() => scorePaper(paper, answers, openScores), [paper, answers, openScores]);
  const resultById = useMemo(() => new Map(result.questions.map((q) => [q.id, q])), [result]);
  const answeredCount = questions.filter((q) => isAnswered(q, { answers, drafts, openScores })).length;
  const openUnscored = questions.filter((q) => q.kind === 'open' && typeof openScores[q.id] !== 'number').length;

  const submit = useCallback(() => {
    setSubmitted(true);
    clearTestProgress(progressKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [progressKey]);

  // Таймер: сигнал 5 минути преди края, автоматично предаване при 0
  useEffect(() => {
    if (!hydrated || submitted) return;
    if (secondsLeft <= 0) {
      submit();
      return;
    }
    if (secondsLeft <= 300 && !warnedRef.current) {
      warnedRef.current = true;
      if (!soundMuted) playChime();
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearTimeout(id);
  }, [hydrated, submitted, secondsLeft, soundMuted, submit]);

  // Докато изпитът тече, долната лента на сайта отстъпва място на навигатора
  useEffect(() => {
    if (submitted) return;
    document.body.dataset.examFocus = '1';
    return () => {
      delete document.body.dataset.examFocus;
    };
  }, [submitted]);

  // Запис в историята: веднъж при предаване, после обновяване при самооценката
  useEffect(() => {
    if (!submitted) return;
    const data = buildAttempt(paper, result, Math.max(1, fullSeconds - secondsLeft));
    if (attemptIdRef.current === null) {
      attemptIdRef.current = 'pending';
      void examHistoryService.recordAttempt(data).then((rec) => {
        attemptIdRef.current = rec.id;
      });
      return;
    }
    const id = attemptIdRef.current;
    if (id === 'pending') return;
    const handle = window.setTimeout(() => {
      const all = examHistoryService.getAllAttempts();
      examHistoryService.saveAttempts(all.map((r) => (r.id === id ? { ...r, ...data } : r)));
    }, 800);
    return () => window.clearTimeout(handle);
    // secondsLeft е замразен след предаване; result се променя само от самооценката
  }, [submitted, result]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    clearTestProgress(progressKey);
    setAnswers({});
    setOpenScores({});
    setDrafts({});
    setFlags({});
    setSubmitted(false);
    setSecondsLeft(fullSeconds);
    setRestored(false);
    warnedRef.current = false;
    attemptIdRef.current = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exit = () => {
    clearTestProgress(progressKey);
    onExit();
  };

  const navQuestions: QuestionItemStatus[] = questions.map((q) => ({
    number: q.number,
    isAnswered: isAnswered(q, { answers, drafts, openScores }),
    isFlagged: !!flags[q.id],
    isCorrect: submitted
      ? q.kind === 'open'
        ? typeof openScores[q.id] === 'number'
          ? (openScores[q.id] as number) > 0
          : null
        : isAnswered(q, { answers, drafts, openScores })
          ? resultById.get(q.id)?.correct ?? false
          : null
      : undefined
  }));

  return (
    <div className="pb-24 xl:pb-0">
      <ExamFocusBar
        title={paper.title}
        secondsLeft={secondsLeft}
        submitted={submitted}
        answeredCount={answeredCount}
        totalCount={questions.length}
        soundMuted={soundMuted}
        onToggleSound={() => setSoundMuted((m) => !m)}
        onSubmit={submit}
        onExit={exit}
      />

      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 text-balance">{paper.title}</h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-slate-600">
          <PaperBadge paper={paper} />
          <span className="tabular-nums">
            {questions.length} задачи · {paper.maxPoints} точки · {paper.durationMinutes} минути
          </span>
        </div>
      </div>

      {restored && !submitted && (
        <div role="status" className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-sm text-slate-700">
          <p className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-sapphire" aria-hidden="true" />
            Продължаваш оттам, докъдето беше стигнал — отговорите, черновите и оставащото време са запазени.
          </p>
          <button type="button" onClick={() => setRestored(false)} aria-label="Скрий съобщението" className="rounded-md p-1 text-slate-500 hover:bg-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {submitted && (
        <ResultPanel result={result} openUnscored={openUnscored} onRestart={reset} onExit={exit} />
      )}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          {paper.sections.map((section) => (
            <section key={section.id} className="mb-10">
              <h3 className="mb-1 text-lg font-bold text-slate-900">{section.title}</h3>
              {section.instructions && <p className="mb-4 text-sm text-slate-600">{section.instructions}</p>}
              {section.sourceText && (
                <article className="mb-5 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                  <h4 className="text-base font-bold text-slate-900">{section.sourceText.title}</h4>
                  <p className="mt-2 whitespace-pre-line font-serif text-[15px] leading-relaxed text-slate-800">{section.sourceText.text}</p>
                  <p className="mt-2 text-xs text-slate-500">{section.sourceText.attribution}</p>
                </article>
              )}
              <ol className="space-y-5">
                {section.questions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    q={q}
                    answer={answers[q.id]}
                    openScore={openScores[q.id]}
                    draft={drafts[q.id] ?? ''}
                    flagged={!!flags[q.id]}
                    submitted={submitted}
                    correct={resultById.get(q.id)?.correct ?? null}
                    onAnswer={(v) => !submitted && setAnswers((a) => ({ ...a, [q.id]: v }))}
                    onDraft={(v) => setDrafts((d) => ({ ...d, [q.id]: v }))}
                    onFlag={() => setFlags((f) => ({ ...f, [q.id]: !f[q.id] }))}
                    onScore={(v) => setOpenScores((s) => ({ ...s, [q.id]: v }))}
                  />
                ))}
              </ol>
            </section>
          ))}

          {!submitted && (
            <div className="flex flex-col items-start gap-2 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600 tabular-nums">
                Отговорени {answeredCount} от {questions.length} задачи
              </p>
              <button
                type="button"
                onClick={submit}
                disabled={answeredCount === 0}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-sapphire px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-sapphire-dark disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Предай и провери по ключа
              </button>
            </div>
          )}
        </div>

        <div className="xl:sticky xl:top-36 xl:self-start">
          <QuestionNavigator questions={navQuestions} targetIdPrefix={Q_ID_PREFIX} submitted={submitted} onSubmit={submit} />
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Резултат                                                           */
/* ------------------------------------------------------------------ */

const ResultPanel: React.FC<{ result: PaperResult; openUnscored: number; onRestart: () => void; onExit: () => void }> = ({
  result,
  openUnscored,
  onRestart,
  onExit
}) => {
  const percent = result.maxPoints > 0 ? Math.round((result.totalPoints / result.maxPoints) * 100) : 0;
  return (
    <section role="status" aria-live="polite" className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blue-50 text-brand-sapphire">
            <Trophy className="h-7 w-7" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Твоят резултат</p>
            <p className="text-3xl font-bold tabular-nums text-slate-900">
              {result.totalPoints} / {result.maxPoints} т. <span className="text-lg font-semibold text-slate-500">({percent}%)</span>
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-700">
              {result.grade ? formatGrade(result.grade) : 'НВО 10: резултатът се отчита в точки'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-sapphire px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-sapphire-dark"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Реши отново
          </button>
          <button
            type="button"
            onClick={onExit}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Всички варианти
          </button>
        </div>
      </div>

      <ul className="mt-6 grid gap-2 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
        {result.sections.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-3 text-slate-700">
            <span className="truncate">{s.title.replace(/\s*\(\d+ т\.\)$/, '')}</span>
            <span className="font-semibold tabular-nums text-slate-900">
              {s.points}/{s.maxPoints}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-slate-600">
        По ключа: <strong className="tabular-nums">{result.autoPoints} т.</strong> · Самооценка: <strong className="tabular-nums">{result.selfAssessedPoints} т.</strong>
        {openUnscored > 0 && ` — оцени още ${openUnscored} ${openUnscored === 1 ? 'задача' : 'задачи'} със свободен отговор по-долу; резултатът ще се обнови.`}
      </p>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Задача                                                             */
/* ------------------------------------------------------------------ */

interface QuestionCardProps {
  q: PaperQuestion;
  answer: number | string | undefined;
  openScore: number | undefined;
  draft: string;
  flagged: boolean;
  submitted: boolean;
  correct: boolean | null;
  onAnswer: (v: number | string) => void;
  onDraft: (v: string) => void;
  onFlag: () => void;
  onScore: (v: number) => void;
}

const QuestionCard = memo(function QuestionCard({ q, answer, openScore, draft, flagged, submitted, correct, onAnswer, onDraft, onFlag, onScore }: QuestionCardProps) {
  const promptId = `${q.id}-prompt`;
  return (
    <li id={`${Q_ID_PREFIX}${q.number}`} className="scroll-mt-40 rounded-2xl border border-slate-200 bg-white p-5 transition-shadow sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-sm font-bold tabular-nums text-brand-sapphire">{q.number}</span>
        <div className="flex items-center gap-2">
          {!submitted && (
            <button
              type="button"
              onClick={onFlag}
              aria-pressed={flagged}
              aria-label={flagged ? 'Махни отбелязването' : 'Отбележи за връщане'}
              title={flagged ? 'Отбелязана за връщане' : 'Отбележи за връщане'}
              className={`grid h-8 w-8 place-items-center rounded-lg border transition-colors ${
                flagged ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-slate-200 bg-white text-slate-400 hover:text-slate-700'
              }`}
            >
              <Bookmark className="h-4 w-4" fill={flagged ? 'currentColor' : 'none'} />
            </button>
          )}
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold tabular-nums text-slate-700">{q.points} т.</span>
        </div>
      </div>

      <p id={promptId} className="whitespace-pre-line text-base font-semibold leading-relaxed text-slate-900 sm:text-lg">
        {q.prompt}
      </p>

      {q.kind === 'choice' && (
        <fieldset aria-labelledby={promptId} className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {q.options.map((option, idx) => {
            const chosen = answer === idx;
            const isKey = submitted && idx === q.correctIndex;
            const wrongPick = submitted && chosen && !isKey;
            const box = isKey
              ? 'border-emerald-400 bg-emerald-50'
              : wrongPick
                ? 'border-rose-400 bg-rose-50'
                : chosen
                  ? 'border-brand-sapphire bg-blue-50 ring-1 ring-brand-sapphire'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50';
            const badge = isKey ? 'bg-emerald-600 text-white' : wrongPick ? 'bg-rose-600 text-white' : chosen ? 'bg-brand-sapphire text-white' : 'bg-slate-100 text-slate-700';
            return (
              <label key={idx} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${box} ${submitted ? 'cursor-default' : ''}`}>
                <input type="radio" name={q.id} className="sr-only" checked={chosen} disabled={submitted} onChange={() => onAnswer(idx)} />
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-bold ${badge}`} aria-hidden="true">
                  {LETTERS[idx] ?? idx + 1}
                </span>
                <span className="flex-1 pt-0.5 text-[15px] leading-relaxed text-slate-900">{option}</span>
                {isKey && <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-label="Верен отговор" />}
                {wrongPick && <XCircle className="mt-1 h-5 w-5 shrink-0 text-rose-600" aria-label="Твоят отговор е грешен" />}
              </label>
            );
          })}
        </fieldset>
      )}

      {q.kind === 'short' && (
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode={q.answerType === 'number' ? 'decimal' : 'text'}
              aria-labelledby={promptId}
              value={typeof answer === 'string' ? answer : ''}
              disabled={submitted}
              onChange={(e) => onAnswer(e.target.value)}
              placeholder={q.answerType === 'number' ? 'Числов отговор' : 'Кратък отговор'}
              className={`w-full max-w-xs rounded-lg border px-3.5 py-2.5 text-base text-slate-900 focus:border-brand-sapphire focus:outline-none ${
                submitted ? (correct ? 'border-emerald-400 bg-emerald-50' : 'border-rose-400 bg-rose-50') : 'border-slate-300 bg-white'
              }`}
            />
            {submitted && (correct ? <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-label="Вярно" /> : <XCircle className="h-5 w-5 text-rose-600" aria-label="Грешно" />)}
          </div>
          {submitted && !correct && (
            <p className="mt-2 text-sm text-slate-700">
              Верен отговор: <strong className="text-emerald-800">{q.acceptedAnswers[0]}</strong>
            </p>
          )}
        </div>
      )}

      {q.kind !== 'open' && <Scratchpad id={`${q.id}-scratch`} value={draft} onChange={onDraft} disabled={submitted} />}

      {q.kind === 'open' && (
        <Scratchpad
          id={`${q.id}-solution`}
          value={draft}
          onChange={onDraft}
          disabled={submitted}
          defaultOpen
          label="Твоето решение"
          placeholder="Запиши решението си стъпка по стъпка. След предаване ще го сравниш с еталона и критериите."
        />
      )}

      {submitted && q.kind !== 'open' && (
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-relaxed text-slate-800">
          <p className="flex items-center gap-1.5 font-semibold text-slate-900">
            <Lightbulb className="h-4 w-4 text-brand-sapphire" aria-hidden="true" />
            Обяснение
          </p>
          <p className="mt-1 whitespace-pre-line">{q.explanation}</p>
        </div>
      )}

      {submitted && q.kind === 'open' && (
        <div className="mt-4 space-y-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm text-slate-800">
          <div>
            <p className="font-semibold text-slate-900">Критерии</p>
            <ul className="mt-1.5 divide-y divide-blue-100">
              {q.criteria.map((c) => (
                <li key={c.label} className="flex items-start justify-between gap-3 py-1.5">
                  <span>{c.label}</span>
                  <span className="shrink-0 font-semibold tabular-nums text-brand-sapphire">{c.points} т.</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Еталон</p>
            <p className="mt-1 whitespace-pre-line leading-relaxed">{q.modelAnswer}</p>
          </div>
          <div className="border-t border-blue-100 pt-3">
            <p id={`${q.id}-score-label`} className="mb-2 font-semibold text-slate-900">
              Колко точки заслужава решението ти? (0–{q.points})
            </p>
            <div role="radiogroup" aria-labelledby={`${q.id}-score-label`} className="flex flex-wrap gap-1.5">
              {Array.from({ length: q.points + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={openScore === i}
                  onClick={() => onScore(i)}
                  className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-semibold tabular-nums transition-colors ${
                    openScore === i ? 'bg-brand-sapphire text-white' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
});

