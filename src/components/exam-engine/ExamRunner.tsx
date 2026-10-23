import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, CheckCircle2, ExternalLink, Lightbulb, RotateCcw, Send, Trophy, X, XCircle } from 'lucide-react';
import {
  PRACTICE_PAPER_LABEL,
  isPartCorrect,
  partKey,
  scorePaper,
  type ExamPaper,
  type PaperAnswers,
  type PaperQuestion,
  type PaperResult,
  type PartValue,
  type QuestionPart,
  type Stimulus
} from '../../lib/examPaperScoring';
import { formatGrade } from '../../lib/monGradeScale';
import { clearTestProgress, loadTestProgress, useTestProgressAutosave } from '../../lib/testProgress';
import { examHistoryService, type ExamAttemptRecord } from '../../services/examHistoryService';
import { ExamFocusBar } from './ExamFocusBar';
import { FormulaSheetPanel } from './FormulaSheetPanel';
import { topicBreakdown, topicPercent, type TopicKey, type TopicScore } from '../../data/examTopics';
import { FORMULA_SHEETS } from '../../data/formulaSheets/nvo10Math';
import { FIGURES } from './figures';
import { MathText } from './MathText';
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

type Scores = Record<string, number | undefined>;

type Snapshot = {
  answers: PaperAnswers;
  openScores: Scores;
  drafts: Record<string, string>;
  flags: Record<string, boolean>;
  submitted: boolean;
  secondsLeft: number;
};

const fmt = (n: number): string => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace('.', ','));

export const PaperBadge: React.FC<{ paper: ExamPaper }> = ({ paper }) =>
  paper.kind === 'topic' ? (
    <span className="inline-block rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
      Официални задачи по тема · ключ на МОН
    </span>
  ) : paper.kind === 'sample' && paper.officialSourceUrl ? (
    <a
      href={paper.officialSourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-md border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-800 hover:bg-sky-100"
    >
      Примерни задачи на МОН
      <ExternalLink className="h-3 w-3" aria-hidden="true" />
    </a>
  ) : paper.kind === 'official' && paper.officialSourceUrl ? (
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

const hasValue = (v: PartValue): boolean =>
  typeof v === 'boolean' || (typeof v === 'number' && Number.isFinite(v)) || (typeof v === 'string' && v.trim() !== '') || (Array.isArray(v) && v.length > 0);

const isAnswered = (q: PaperQuestion, s: Pick<Snapshot, 'answers' | 'drafts' | 'openScores'>): boolean => {
  if (q.kind === 'choice') return typeof s.answers[q.id] === 'number';
  if (q.kind === 'short') return hasValue(s.answers[q.id]);
  if (q.kind === 'multi') return q.parts.some((p) => hasValue(s.answers[partKey(q, p)]) || typeof s.openScores[partKey(q, p)] === 'number');
  return (s.drafts[q.id] ?? '').trim() !== '' || typeof s.openScores[q.id] === 'number';
};

/** Броят на неоценените части със самооценка (цели задачи или подточки) */
const countUnscored = (questions: PaperQuestion[], scores: Scores): number =>
  questions.reduce((n, q) => {
    if (q.kind === 'open') return n + (typeof scores[q.id] === 'number' ? 0 : 1);
    if (q.kind === 'multi') return n + q.parts.filter((p) => p.answer.type === 'self' && typeof scores[partKey(q, p)] !== 'number').length;
    return n;
  }, 0);

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

function buildAttempt(
  paper: ExamPaper,
  result: PaperResult,
  timeSpentSeconds: number,
  topics: TopicScore[]
): Omit<ExamAttemptRecord, 'id' | 'timestamp' | 'formattedDate'> {
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
    gradeEquivalent: result.grade ? formatGrade(result.grade) : `${fmt(result.totalPoints)} / ${result.maxPoints} точки`,
    gradeNumeric: result.grade?.numeric ?? null,
    passed: result.grade?.passed ?? false,
    topicScores: topics.map(({ key, points, maxPoints }) => ({ key, points, maxPoints }))
  };
}

interface ExamRunnerProps {
  paper: ExamPaper;
  /** Връщане към списъка с варианти */
  onExit: () => void;
  /** Отваря тренировката по дадена тема (бутонът „Упражни“ в анализа по теми) */
  onPracticeTopic?: (key: TopicKey) => void;
  /** Темите, за които има тренировка, различна от текущия набор */
  practiceTopics?: TopicKey[];
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({ paper, onExit, onPracticeTopic, practiceTopics = [] }) => {
  const progressKey = `paper:${paper.id}`;
  const timed = !paper.untimed;
  const fullSeconds = paper.durationMinutes * 60;
  // Без таймер отчитаме само изминалото време (за историята)
  const startedAtRef = useRef(Date.now());
  const spentRef = useRef(0);

  const [answers, setAnswers] = useState<PaperAnswers>({});
  const [openScores, setOpenScores] = useState<Scores>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(fullSeconds);
  const [soundMuted, setSoundMuted] = useState(false);
  const [formulasOpen, setFormulasOpen] = useState(false);
  const formulaSheet = paper.formulaSheet ? FORMULA_SHEETS[paper.formulaSheet] : null;
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
  const unscored = countUnscored(questions, openScores);
  const topics = useMemo(() => topicBreakdown(paper, result), [paper, result]);

  const submit = useCallback(() => {
    spentRef.current = Math.round((Date.now() - startedAtRef.current) / 1000);
    setSubmitted(true);
    clearTestProgress(progressKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [progressKey]);

  // Таймер: сигнал 5 минути преди края, автоматично предаване при 0
  useEffect(() => {
    if (!hydrated || submitted || !timed) return;
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
  }, [hydrated, submitted, timed, secondsLeft, soundMuted, submit]);

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
    const data = buildAttempt(paper, result, Math.max(1, timed ? fullSeconds - secondsLeft : spentRef.current), topics);
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
    // secondsLeft е замразен след предаване; result (и topics) се променят само от самооценката
  }, [submitted, result]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    clearTestProgress(progressKey);
    setAnswers({});
    setOpenScores({});
    setDrafts({});
    setFlags({});
    setSubmitted(false);
    setSecondsLeft(fullSeconds);
    startedAtRef.current = Date.now();
    setRestored(false);
    warnedRef.current = false;
    attemptIdRef.current = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exit = () => {
    clearTestProgress(progressKey);
    onExit();
  };

  const setAnswer = useCallback(
    (key: string, v: PartValue) => {
      if (!submitted) setAnswers((a) => ({ ...a, [key]: v }));
    },
    [submitted]
  );
  const setScore = useCallback((key: string, v: number) => setOpenScores((s) => ({ ...s, [key]: v })), []);
  const setDraft = useCallback((key: string, v: string) => setDrafts((d) => ({ ...d, [key]: v })), []);
  const toggleFlag = useCallback((key: string) => setFlags((f) => ({ ...f, [key]: !f[key] })), []);

  const navQuestions: QuestionItemStatus[] = questions.map((q) => {
    const r = resultById.get(q.id);
    const answered = isAnswered(q, { answers, drafts, openScores });
    return {
      number: q.number,
      isAnswered: answered,
      isFlagged: !!flags[q.id],
      isPartial: submitted && !!r?.partial,
      isCorrect: !submitted ? undefined : q.kind === 'open' ? (typeof openScores[q.id] === 'number' ? (openScores[q.id] as number) > 0 : null) : answered ? r?.correct ?? false : null
    };
  });

  return (
    <div className="pb-24 xl:pb-0">
      <ExamFocusBar
        title={paper.title}
        secondsLeft={secondsLeft}
        timed={timed}
        submitted={submitted}
        answeredCount={answeredCount}
        totalCount={questions.length}
        soundMuted={soundMuted}
        onToggleSound={() => setSoundMuted((m) => !m)}
        onSubmit={submit}
        onExit={exit}
        onOpenFormulas={formulaSheet ? () => setFormulasOpen(true) : undefined}
      />
      {formulaSheet && <FormulaSheetPanel sheet={formulaSheet} open={formulasOpen} onClose={() => setFormulasOpen(false)} />}

      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 text-balance">{paper.title}</h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-slate-600">
          <PaperBadge paper={paper} />
          <span className="tabular-nums">
            {questions.length} задачи · {paper.maxPoints} точки · {timed ? `${paper.durationMinutes} минути` : 'без таймер'}
          </span>
        </div>
        {paper.note && <p className="max-w-3xl text-sm leading-relaxed text-slate-600">{paper.note}</p>}
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
        <ResultPanel
          result={result}
          unscored={unscored}
          onRestart={reset}
          onExit={exit}
          topics={topics}
          practiceTopics={practiceTopics}
          onPracticeTopic={onPracticeTopic}
        />
      )}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          {paper.sections.map((section) => (
            <section key={section.id} className="mb-10">
              <h3 className="mb-1 text-lg font-bold text-slate-900">{section.title}</h3>
              {section.instructions && <p className="mb-4 max-w-3xl text-sm text-slate-600">{section.instructions}</p>}
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
                    answers={answers}
                    scores={openScores}
                    draft={drafts[q.id] ?? ''}
                    flagged={!!flags[q.id]}
                    submitted={submitted}
                    correct={resultById.get(q.id)?.correct ?? null}
                    onAnswer={setAnswer}
                    onScore={setScore}
                    onDraft={setDraft}
                    onFlag={toggleFlag}
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

const ResultPanel: React.FC<{
  result: PaperResult;
  unscored: number;
  onRestart: () => void;
  onExit: () => void;
  topics: TopicScore[];
  practiceTopics: TopicKey[];
  onPracticeTopic?: (key: TopicKey) => void;
}> = ({ result, unscored, onRestart, onExit, topics, practiceTopics, onPracticeTopic }) => {
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
              {fmt(result.totalPoints)} / {result.maxPoints} т. <span className="text-lg font-semibold text-slate-500">({percent}%)</span>
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-700">
              {result.grade ? formatGrade(result.grade) : 'НВО 10: резултатът се отчита в точки'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onRestart} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-sapphire px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-sapphire-dark">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Реши отново
          </button>
          <button type="button" onClick={onExit} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Всички варианти
          </button>
        </div>
      </div>

      <ul className="mt-6 grid gap-2 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
        {result.sections.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-3 text-slate-700">
            <span className="truncate">{s.title.replace(/\s*\(\d+ т\.\)$/, '')}</span>
            <span className="font-semibold tabular-nums text-slate-900">
              {fmt(s.points)}/{s.maxPoints}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-slate-600">
        По ключа: <strong className="tabular-nums">{fmt(result.autoPoints)} т.</strong> · Самооценка:{' '}
        <strong className="tabular-nums">{fmt(result.selfAssessedPoints)} т.</strong>
        {unscored > 0 && ` — оцени още ${unscored} ${unscored === 1 ? 'отговор' : 'отговора'} по еталона по-долу; резултатът ще се обнови.`}
      </p>

      {topics.length > 1 && <TopicAnalysis topics={topics} practiceTopics={practiceTopics} onPracticeTopic={onPracticeTopic} />}
    </section>
  );
};

/** Резултатът по теми: най-слабата тема е отбелязана и води към тренировка по нея */
const TopicAnalysis: React.FC<{ topics: TopicScore[]; practiceTopics: TopicKey[]; onPracticeTopic?: (key: TopicKey) => void }> = ({
  topics,
  practiceTopics,
  onPracticeTopic,
}) => {
  const weakest = topics.filter((t) => t.points < t.maxPoints).sort((a, b) => topicPercent(a) - topicPercent(b) || b.maxPoints - a.maxPoints)[0];
  return (
    <div className="mt-6 border-t border-slate-100 pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-900">По теми</h3>
        <p className="text-xs text-slate-500">Задачите със свободен отговор се броят след самооценката.</p>
      </div>
      <ul className="mt-3 space-y-2.5">
        {topics.map((t) => {
          const pct = topicPercent(t);
          const isWeakest = weakest?.key === t.key;
          const canPractice = !!onPracticeTopic && practiceTopics.includes(t.key);
          return (
            <li key={t.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 sm:grid-cols-[13rem_minmax(0,1fr)_auto]">
              <span className="flex min-w-0 items-center gap-2 text-sm text-slate-700">
                <span className="truncate">{t.label}</span>
                {isWeakest && <span className="shrink-0 rounded bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold text-amber-800 ring-1 ring-inset ring-amber-200">най-слаба</span>}
              </span>
              <span className="order-3 col-span-2 h-2 overflow-hidden rounded-full bg-slate-100 sm:order-none sm:col-span-1" aria-hidden="true">
                <span className={`block h-full rounded-full ${pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-brand-sapphire' : 'bg-amber-400'}`} style={{ width: `${pct}%` }} />
              </span>
              <span className="flex items-center justify-end gap-2 text-sm tabular-nums">
                <span className="font-semibold text-slate-900">{fmt(t.points)}/{fmt(t.maxPoints)}</span>
                {isWeakest && canPractice && (
                  <button
                    type="button"
                    onClick={() => onPracticeTopic?.(t.key)}
                    className="rounded-md border border-brand-sapphire/30 bg-brand-sapphire-soft px-2 py-0.5 text-xs font-semibold text-brand-ink hover:bg-blue-100"
                  >
                    Упражни
                  </button>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Онагледяване: чертеж или таблица                                   */
/* ------------------------------------------------------------------ */

const StimulusView: React.FC<{ s: Stimulus }> = ({ s }) => {
  if (s.kind === 'figure') {
    const Figure = FIGURES[s.figureId];
    if (!Figure) return null;
    return (
      <figure className="my-4 flex justify-center rounded-xl border border-slate-100 bg-white p-3">
        <Figure />
      </figure>
    );
  }
  return (
    <figure className="my-4">
      {s.caption && <figcaption className="mb-2 text-sm font-semibold text-slate-800">{s.caption}</figcaption>}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-max border-collapse text-sm">
          <thead className="bg-slate-50 text-slate-700">
            {s.groups && (
              <tr>
                {s.groups.map((g) => (
                  <th key={g.label} colSpan={g.span} scope="colgroup" className="border-b border-r border-slate-200 px-3 py-2 text-center font-semibold last:border-r-0">
                    {g.label}
                  </th>
                ))}
              </tr>
            )}
            <tr>
              {s.head.map((h, i) => (
                <th key={i} scope="col" className="border-b border-r border-slate-200 px-3 py-2 text-left font-semibold last:border-r-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-slate-100 last:border-b-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="border-r border-slate-100 px-3 py-2 tabular-nums text-slate-800 last:border-r-0">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {s.source && <p className="mt-1.5 text-right text-xs italic text-slate-500">{s.source}</p>}
    </figure>
  );
};

/* ------------------------------------------------------------------ */
/* Самооценка: бутони 0 … max (с половинки, ако максимумът е дробен)  */
/* ------------------------------------------------------------------ */

const ScoreButtons: React.FC<{ id: string; max: number; value: number | undefined; onChange: (v: number) => void; label: string }> = ({ id, max, value, onChange, label }) => {
  const step = Number.isInteger(max) ? 1 : 0.5;
  const steps = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step);
  return (
    <div>
      <p id={`${id}-score-label`} className="mb-2 text-sm font-semibold text-slate-900">
        {label}
      </p>
      <div role="radiogroup" aria-labelledby={`${id}-score-label`} className="flex flex-wrap gap-1.5">
        {steps.map((v) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            onClick={() => onChange(v)}
            className={`grid h-9 min-w-9 place-items-center rounded-lg px-2 text-sm font-semibold tabular-nums transition-colors ${
              value === v ? 'bg-brand-sapphire text-white' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {fmt(v)}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Подточка на задача с няколко части                                 */
/* ------------------------------------------------------------------ */

const keyText = (part: QuestionPart): string => {
  const a = part.answer;
  if (a.type === 'number') return `${a.acceptedAnswers[0]}${a.unit ? ` ${a.unit}` : ''}`;
  if (a.type === 'text') return a.acceptedAnswers[0];
  if (a.type === 'truefalse') return a.correct ? 'вярно' : 'грешно';
  if (a.type === 'pick') return a.correctIndices.map((i) => a.options[i]).join('; ');
  return a.modelAnswer;
};

const PartRow: React.FC<{
  part: QuestionPart;
  value: PartValue;
  score: number | undefined;
  submitted: boolean;
  onAnswer: (key: string, v: PartValue) => void;
  onScore: (key: string, v: number) => void;
  k: string;
}> = ({ part, value, score, submitted, onAnswer, onScore, k }) => {
  const a = part.answer;
  const ok = submitted && a.type !== 'self' ? isPartCorrect(part, value) : null;
  const inputId = `${k}-input`;
  return (
    <li className="rounded-xl border border-slate-200 bg-slate-50/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[15px] leading-relaxed text-slate-900">
          <span className="mr-1.5 font-semibold text-brand-sapphire">{part.label}</span>
          <MathText text={part.prompt} />
        </p>
        <span className="shrink-0 rounded-md bg-white px-2 py-0.5 text-xs font-semibold tabular-nums text-slate-600 ring-1 ring-slate-200">{fmt(part.points)} т.</span>
      </div>

      <div className="mt-3">
        {(a.type === 'number' || a.type === 'text') && (
          <div className="flex items-center gap-2">
            <label htmlFor={inputId} className="sr-only">
              Отговор на {part.label}
            </label>
            <input
              id={inputId}
              type="text"
              inputMode={a.type === 'number' ? 'decimal' : 'text'}
              value={typeof value === 'string' ? value : ''}
              disabled={submitted}
              onChange={(e) => onAnswer(k, e.target.value)}
              placeholder={a.type === 'number' ? 'Число' : 'Отговор'}
              className={`w-40 rounded-lg border px-3 py-2 text-base text-slate-900 focus:border-brand-sapphire focus:outline-none ${
                ok === null ? 'border-slate-300 bg-white' : ok ? 'border-emerald-400 bg-emerald-50' : 'border-rose-400 bg-rose-50'
              }`}
            />
            {a.type === 'number' && a.unit && <span className="text-sm text-slate-600">{a.unit}</span>}
          </div>
        )}

        {a.type === 'truefalse' && (
          <div role="radiogroup" aria-label={`Отговор на ${part.label}`} className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
            {[true, false].map((b) => {
              const chosen = value === b;
              const isKey = submitted && a.correct === b;
              return (
                <button
                  key={String(b)}
                  type="button"
                  role="radio"
                  aria-checked={chosen}
                  disabled={submitted}
                  onClick={() => onAnswer(k, b)}
                  className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                    isKey ? 'bg-emerald-600 text-white' : submitted && chosen ? 'bg-rose-600 text-white' : chosen ? 'bg-brand-sapphire text-white' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {b ? 'вярно' : 'грешно'}
                </button>
              );
            })}
          </div>
        )}

        {a.type === 'pick' && (
          <fieldset className="flex flex-wrap gap-2">
            <legend className="sr-only">Избор за {part.label}</legend>
            {a.options.map((opt, i) => {
              const picked = Array.isArray(value) && value.includes(i);
              const isKey = submitted && a.correctIndices.includes(i);
              const cls = isKey
                ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                : submitted && picked
                  ? 'border-rose-400 bg-rose-50 text-rose-900'
                  : picked
                    ? 'border-brand-sapphire bg-blue-50 text-brand-sapphire'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
              return (
                <label key={i} className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors ${cls}`}>
                  <input
                    type={a.single ? 'radio' : 'checkbox'}
                    name={a.single ? inputId : undefined}
                    className="h-4 w-4 accent-[#1a6fb8]"
                    checked={picked}
                    disabled={submitted}
                    onChange={() => {
                      if (a.single) return onAnswer(k, [i]);
                      const cur = Array.isArray(value) ? value : [];
                      onAnswer(k, picked ? cur.filter((x) => x !== i) : [...cur, i].sort((x, y) => x - y));
                    }}
                  />
                  <MathText text={opt} />
                </label>
              );
            })}
          </fieldset>
        )}

        {a.type === 'self' && (
          <textarea
            value={typeof value === 'string' ? value : ''}
            disabled={submitted}
            onChange={(e) => onAnswer(k, e.target.value)}
            rows={2}
            aria-label={`Отговор на ${part.label}`}
            placeholder="Запиши отговора си — след предаване ще го сравниш с еталона."
            className="w-full resize-y rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 focus:border-brand-sapphire focus:outline-none disabled:bg-slate-50"
          />
        )}
      </div>

      {submitted && a.type !== 'self' && (
        <p className={`mt-2 flex items-start gap-1.5 text-sm ${ok ? 'text-emerald-800' : 'text-slate-700'}`}>
          {ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />}
          <span>
            {ok ? 'Вярно' : 'Верен отговор:'} {!ok && <strong className="text-emerald-800"><MathText text={keyText(part)} /></strong>}
          </span>
        </p>
      )}

      {submitted && a.type === 'self' && (
        <div className="mt-3 space-y-3 rounded-lg border border-blue-100 bg-white p-3">
          <p className="text-sm text-slate-800">
            <span className="font-semibold text-slate-900">Еталон: </span>
            <MathText text={a.modelAnswer} />
          </p>
          <ScoreButtons id={k} max={part.points} value={score} onChange={(v) => onScore(k, v)} label="Колко точки заслужава отговорът ти?" />
        </div>
      )}
    </li>
  );
};

/* ------------------------------------------------------------------ */
/* Задача                                                             */
/* ------------------------------------------------------------------ */

interface QuestionCardProps {
  q: PaperQuestion;
  answers: PaperAnswers;
  scores: Scores;
  draft: string;
  flagged: boolean;
  submitted: boolean;
  correct: boolean | null;
  onAnswer: (key: string, v: PartValue) => void;
  onScore: (key: string, v: number) => void;
  onDraft: (key: string, v: string) => void;
  onFlag: (key: string) => void;
}

const QuestionCard = memo(function QuestionCard({ q, answers, scores, draft, flagged, submitted, correct, onAnswer, onScore, onDraft, onFlag }: QuestionCardProps) {
  const promptId = `${q.id}-prompt`;
  const answer = answers[q.id];
  return (
    <li id={`${Q_ID_PREFIX}${q.number}`} className="scroll-mt-40 rounded-2xl border border-slate-200 bg-white p-5 transition-shadow sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-sm font-bold tabular-nums text-brand-sapphire">{q.number}</span>
          {q.topic && <span className="text-xs font-semibold text-slate-500">{q.topic}</span>}
        </div>
        <div className="flex items-center gap-2">
          {!submitted && (
            <button
              type="button"
              onClick={() => onFlag(q.id)}
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
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold tabular-nums text-slate-700">{fmt(q.points)} т.</span>
        </div>
      </div>

      <p id={promptId} className="text-base font-medium leading-relaxed text-slate-900 sm:text-[17px]">
        <MathText text={q.prompt} />
      </p>

      {q.stimulus?.map((s, i) => <StimulusView key={i} s={s} />)}

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
              <label key={idx} className={`flex items-center gap-3 rounded-xl border p-3.5 transition-colors ${box} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}>
                <input type="radio" name={q.id} className="sr-only" checked={chosen} disabled={submitted} onChange={() => onAnswer(q.id, idx)} />
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-bold ${badge}`} aria-hidden="true">
                  {LETTERS[idx] ?? idx + 1}
                </span>
                <span className="min-w-0 flex-1 text-[15px] leading-relaxed text-slate-900">
                  <MathText text={option} />
                </span>
                {isKey && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-label="Верен отговор" />}
                {wrongPick && <XCircle className="h-5 w-5 shrink-0 text-rose-600" aria-label="Твоят отговор е грешен" />}
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
              onChange={(e) => onAnswer(q.id, e.target.value)}
              placeholder={q.answerType === 'number' ? 'Числов отговор' : 'Кратък отговор'}
              className={`w-full max-w-xs rounded-lg border px-3.5 py-2.5 text-base text-slate-900 focus:border-brand-sapphire focus:outline-none ${
                submitted ? (correct ? 'border-emerald-400 bg-emerald-50' : 'border-rose-400 bg-rose-50') : 'border-slate-300 bg-white'
              }`}
            />
            {submitted && (correct ? <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-label="Вярно" /> : <XCircle className="h-5 w-5 text-rose-600" aria-label="Грешно" />)}
          </div>
          {submitted && !correct && (
            <p className="mt-2 text-sm text-slate-700">
              Верен отговор: <strong className="text-emerald-800"><MathText text={q.acceptedAnswers[0]} /></strong>
            </p>
          )}
        </div>
      )}

      {q.kind === 'multi' && (
        <ol className="mt-4 space-y-3">
          {q.parts.map((part) => {
            const k = partKey(q, part);
            return (
              <PartRow key={k} k={k} part={part} value={answers[k]} score={scores[k]} submitted={submitted} onAnswer={onAnswer} onScore={onScore} />
            );
          })}
        </ol>
      )}

      {(q.kind === 'choice' || q.kind === 'short' || q.kind === 'multi') && (
        <Scratchpad id={`${q.id}-scratch`} value={draft} onChange={(v) => onDraft(q.id, v)} disabled={submitted} />
      )}

      {q.kind === 'open' && (
        <Scratchpad
          id={`${q.id}-solution`}
          value={draft}
          onChange={(v) => onDraft(q.id, v)}
          disabled={submitted}
          defaultOpen
          label="Твоето решение"
          placeholder="Запиши решението си стъпка по стъпка. След предаване ще го сравниш с примерното решение и критериите."
        />
      )}

      {submitted && q.kind !== 'open' && (
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-relaxed text-slate-800">
          <p className="flex items-center gap-1.5 font-semibold text-slate-900">
            <Lightbulb className="h-4 w-4 text-brand-sapphire" aria-hidden="true" />
            Обяснение
          </p>
          <div className="mt-1">
            <MathText text={q.explanation} />
          </div>
        </div>
      )}

      {submitted && q.kind === 'open' && (
        <div className="mt-4 space-y-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm text-slate-800">
          <div>
            <p className="font-semibold text-slate-900">Критерии</p>
            <ul className="mt-1.5 divide-y divide-blue-100">
              {q.criteria.map((c) => (
                <li key={c.label} className="flex items-start justify-between gap-3 py-1.5">
                  <span>
                    <MathText text={c.label} />
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-brand-sapphire">{fmt(c.points)} т.</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Примерно решение</p>
            <div className="mt-1 leading-relaxed">
              <MathText text={q.modelAnswer} />
            </div>
          </div>
          <div className="border-t border-blue-100 pt-3">
            <ScoreButtons id={q.id} max={q.points} value={scores[q.id]} onChange={(v) => onScore(q.id, v)} label={`Колко точки заслужава решението ти? (0–${fmt(q.points)})`} />
          </div>
        </div>
      )}
    </li>
  );
});
