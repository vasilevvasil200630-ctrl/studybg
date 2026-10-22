import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, ExternalLink, FileText, RotateCcw, XCircle } from 'lucide-react';
import { EXAM_PAPERS } from '../data/examPapers';
import {
  PRACTICE_PAPER_LABEL,
  scorePaper,
  type ExamPaper,
  type PaperAnswers,
  type PaperQuestion
} from '../lib/examPaperScoring';
import { formatGrade } from '../lib/monGradeScale';

const PaperBadge: React.FC<{ paper: ExamPaper }> = ({ paper }) =>
  paper.kind === 'official' && paper.officialSourceUrl ? (
    <a
      href={paper.officialSourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200"
    >
      Официален вариант на МОН{paper.year ? ` (${paper.year})` : ''}
      <ExternalLink className="w-3 h-3" aria-hidden="true" />
    </a>
  ) : (
    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
      {PRACTICE_PAPER_LABEL}
    </span>
  );

/** Режим „Пълни изпитни варианти с ключ“ — решаване без AI, оценяване по ключ и скала. */
export const ExamPapersView: React.FC = () => {
  const [paperId, setPaperId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<PaperAnswers>({});
  const [openScores, setOpenScores] = useState<Record<string, number | undefined>>({});
  const [openDrafts, setOpenDrafts] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const paper = EXAM_PAPERS.find((p) => p.id === paperId) ?? null;
  const result = useMemo(
    () => (paper && submitted ? scorePaper(paper, answers, openScores) : null),
    [paper, submitted, answers, openScores]
  );
  const resultById = useMemo(() => new Map(result?.questions.map((q) => [q.id, q]) ?? []), [result]);

  const reset = () => {
    setAnswers({});
    setOpenScores({});
    setOpenDrafts({});
    setSubmitted(false);
  };

  if (!paper) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Пълни изпитни варианти с ключ</h3>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Решете цял вариант по точковата структура на МОН. Затворените задачи и задачите с кратък отговор се проверяват по ключа;
            задачите със свободен отговор оценявате сами по критериите и еталона. Не е нужен AI.
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EXAM_PAPERS.map((p) => {
            const questionCount = p.sections.reduce((n, s) => n + s.questions.length, 0);
            return (
              <li key={p.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
                <PaperBadge paper={p} />
                <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                <p className="text-xs text-slate-600">
                  {p.exam} • {p.subject} • {questionCount} задачи • {p.maxPoints} точки • {p.durationMinutes} мин
                  {p.gradeScale ? ' • оценка по скалата за ДЗИ' : ' • резултат в точки'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setPaperId(p.id);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  Започни варианта
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const renderQuestion = (q: PaperQuestion) => {
    const r = resultById.get(q.id);
    const status =
      submitted && r && r.correct !== null ? (
        r.correct ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Вярно (+{r.points} т.)
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700">
            <XCircle className="w-3.5 h-3.5" aria-hidden="true" /> Грешно (0 / {r.maxPoints} т.)
          </span>
        )
      ) : null;

    return (
      <li key={q.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <p id={`${q.id}-prompt`} className="text-sm font-semibold text-slate-900">
            {q.number}. {q.prompt}
          </p>
          <span className="text-[11px] tabular-nums text-slate-500 shrink-0">{q.points} т.</span>
        </div>

        {q.kind === 'choice' && (
          <fieldset aria-labelledby={`${q.id}-prompt`} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((option, idx) => {
              const chosen = answers[q.id] === idx;
              const isKey = submitted && idx === q.correctIndex;
              return (
                <label
                  key={option}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer ${
                    isKey
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                      : chosen
                        ? 'border-blue-400 bg-blue-50 text-blue-900'
                        : 'border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={chosen}
                    disabled={submitted}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </fieldset>
        )}

        {q.kind === 'short' && (
          <input
            type="text"
            inputMode={q.answerType === 'number' ? 'decimal' : 'text'}
            aria-labelledby={`${q.id}-prompt`}
            value={typeof answers[q.id] === 'string' ? (answers[q.id] as string) : ''}
            disabled={submitted}
            onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
            placeholder={q.answerType === 'number' ? 'Числов отговор' : 'Кратък отговор'}
            className="w-full sm:w-64 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-500"
          />
        )}

        {q.kind === 'open' && (
          <textarea
            aria-labelledby={`${q.id}-prompt`}
            value={openDrafts[q.id] ?? ''}
            onChange={(e) => setOpenDrafts((d) => ({ ...d, [q.id]: e.target.value }))}
            rows={6}
            placeholder="Решение / текст (не се изпраща никъде — служи за самопроверка)"
            className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-500"
          />
        )}

        {status}

        {submitted && q.kind !== 'open' && (
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900">Ключ: </strong>
            {q.kind === 'choice' ? q.options[q.correctIndex] : q.acceptedAnswers[0]} — {q.explanation}
          </p>
        )}

        {submitted && q.kind === 'open' && (
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-950">
            <p>
              <strong>Еталон: </strong>
              {q.modelAnswer}
            </p>
            <ul className="list-disc list-inside space-y-0.5">
              {q.criteria.map((c) => (
                <li key={c.label}>
                  {c.label} — {c.points} т.
                </li>
              ))}
            </ul>
            <label className="flex flex-wrap items-center gap-2 font-semibold">
              Моята самооценка:
              <input
                type="number"
                min={0}
                max={q.points}
                step={1}
                value={openScores[q.id] ?? ''}
                onChange={(e) =>
                  setOpenScores((s) => ({ ...s, [q.id]: e.target.value === '' ? undefined : Number(e.target.value) }))
                }
                className="w-20 px-2 py-1 rounded border border-amber-300 bg-white"
              />
              / {q.points} т.
            </label>
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => setPaperId(null)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> Всички варианти
          </button>
          <h3 className="text-lg font-bold text-slate-900">{paper.title}</h3>
          <PaperBadge paper={paper} />
          <p className="text-xs text-slate-600">
            {paper.durationMinutes} минути • {paper.maxPoints} точки
            {paper.kind === 'practice' && ' • Съставен от StudyBG; не е официален изпитен материал.'}
          </p>
        </div>
        {submitted && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-xs font-semibold text-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Реши отново
          </button>
        )}
      </div>

      {result && (
        <div role="status" className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-2xl font-bold tabular-nums">
              {result.totalPoints} / {result.maxPoints} т.
            </span>
            {result.grade ? (
              <span className="text-sm font-semibold text-amber-700">{formatGrade(result.grade)}</span>
            ) : (
              <span className="text-xs text-slate-600">НВО 10: резултатът се отчита в точки</span>
            )}
          </div>
          <p className="text-xs text-slate-600">
            По ключа: {result.autoPoints} т. • Самооценка (свободен отговор): {result.selfAssessedPoints} т.
            {result.selfAssessedPoints === 0 && ' — въведете самооценка за задачите със свободен отговор по-долу.'}
          </p>
          <ul className="flex flex-wrap gap-2 text-[11px]">
            {result.sections.map((s) => (
              <li key={s.id} className="px-2 py-1 rounded-lg bg-white">
                {s.title.replace(/\s*\(\d+ т\.\)$/, '')}: {s.points}/{s.maxPoints}
              </li>
            ))}
          </ul>
        </div>
      )}

      {paper.sections.map((section) => (
        <section key={section.id} className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900">{section.title}</h4>
          {section.instructions && <p className="text-xs text-slate-600">{section.instructions}</p>}
          {section.sourceText && (
            <article className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
              <h5 className="text-sm font-bold text-slate-900">{section.sourceText.title}</h5>
              <p className="text-sm text-slate-800 leading-relaxed font-serif">{section.sourceText.text}</p>
              <p className="text-[11px] text-slate-500">{section.sourceText.attribution}</p>
            </article>
          )}
          <ol className="space-y-3">{section.questions.map(renderQuestion)}</ol>
        </section>
      ))}

      {!submitted && (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors"
        >
          Предай и провери по ключа
        </button>
      )}
    </div>
  );
};
