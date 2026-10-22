import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowUp, Layers, ListChecks, Send, X } from 'lucide-react';

/**
 * Навигатор по задачите на изпита (пренесен от Матура Плюс, components/exam/QuestionNavigator).
 * Десктоп: карта до задачите. Телефон: лента най-долу + чекмедже с всички номера.
 * Синьо = отговорена, кехлибарена точка = отбелязана за връщане; зелено/червено само след предаване.
 */

export type QuestionItemStatus = {
  number: number;
  isAnswered: boolean;
  isFlagged?: boolean;
  /** true/false след предаване; null = без отговор или задача със самооценка без въведени точки */
  isCorrect?: boolean | null;
};

type Variant = 'desktop' | 'pill' | 'drawer';

const statusClass = (q: QuestionItemStatus, submitted: boolean, variant: Variant): string => {
  if (submitted) {
    if (q.isCorrect === true) return 'bg-emerald-600 text-white border border-emerald-600';
    if (q.isCorrect === false) return 'bg-rose-600 text-white border border-rose-600';
    return 'bg-slate-100 text-slate-500 border border-slate-200';
  }
  if (q.isAnswered) return 'bg-blue-100 text-brand-sapphire border border-blue-200 font-bold';
  if (q.isFlagged && variant !== 'drawer') return 'bg-amber-50 text-amber-800 border border-amber-300';
  return 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50';
};

const NavButton = memo(function NavButton({
  q,
  submitted,
  variant,
  onSelect,
}: {
  q: QuestionItemStatus;
  submitted: boolean;
  variant: Variant;
  onSelect: (n: number) => void;
}) {
  const size = variant === 'pill' ? 'h-8 w-8 shrink-0' : variant === 'drawer' ? 'h-11 w-full' : 'h-9 w-full';
  return (
    <button
      type="button"
      onClick={() => onSelect(q.number)}
      aria-label={`Към задача ${q.number}${q.isAnswered ? ', отговорена' : ''}${q.isFlagged ? ', отбелязана' : ''}`}
      className={`relative flex ${size} items-center justify-center rounded-lg text-xs font-semibold tabular-nums transition-colors ${statusClass(q, submitted, variant)}`}
    >
      {q.number}
      {q.isFlagged && (
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-white" aria-hidden="true" />
      )}
    </button>
  );
});

interface QuestionNavigatorProps {
  questions: QuestionItemStatus[];
  /** id на задачата в страницата = targetIdPrefix + номер */
  targetIdPrefix: string;
  submitted: boolean;
  onSubmit: () => void;
  submitLabel?: string;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  questions,
  targetIdPrefix,
  submitted,
  onSubmit,
  submitLabel = 'Предай изпита',
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const total = questions.length;
  const answered = useMemo(() => questions.filter((q) => q.isAnswered).length, [questions]);
  const flagged = useMemo(() => questions.filter((q) => q.isFlagged).length, [questions]);
  const percent = total > 0 ? Math.round((answered / total) * 100) : 0;

  const select = useCallback(
    (n: number) => {
      const el = document.getElementById(`${targetIdPrefix}${n}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-blue-300');
        window.setTimeout(() => el.classList.remove('ring-2', 'ring-blue-300'), 1200);
      }
      setDrawerOpen(false);
    },
    [targetIdPrefix]
  );

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  return (
    <>
      {/* Десктоп */}
      <aside aria-label="Навигация по задачите" className="hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs xl:block">
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <ListChecks className="h-4 w-4 text-brand-sapphire" aria-hidden="true" />
            Задачи
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-slate-700">
            {answered}/{total}
          </span>
        </div>

        <div className="mb-4">
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>Отговорени</span>
            <span className="tabular-nums">{percent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand-sapphire transition-all duration-300" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {questions.map((q) => (
            <NavButton key={q.number} q={q} submitted={submitted} variant="desktop" onSelect={select} />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500">
          {submitted ? (
            <>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-600" aria-hidden="true" />Вярно</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-600" aria-hidden="true" />Грешно</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-slate-300" aria-hidden="true" />Без отговор / без оценка</span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-200" aria-hidden="true" />Отговорена</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border border-slate-300 bg-white" aria-hidden="true" />Без отговор</span>
              {flagged > 0 && (
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" aria-hidden="true" />Отбелязани ({flagged})</span>
              )}
            </>
          )}
        </div>

        {!submitted && (
          <button
            type="button"
            onClick={onSubmit}
            disabled={answered === 0}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-sapphire px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-sapphire-dark disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {submitLabel}
          </button>
        )}
      </aside>

      {/* Телефон и таблет: лента най-долу */}
      <div data-print-hide className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md xl:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-brand-sapphire"
          >
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="tabular-nums">
              {answered}/{total}
            </span>
          </button>
          <div className="no-scrollbar flex flex-1 items-center gap-1.5 overflow-x-auto px-1 py-0.5">
            {questions.map((q) => (
              <NavButton key={q.number} q={q} submitted={submitted} variant="pill" onSelect={select} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Към началото на изпита"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/30 xl:hidden">
          <div className="fixed inset-0" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div role="dialog" aria-modal="true" aria-label="Всички задачи" className="relative z-10 max-h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Всички задачи <span className="tabular-nums">({answered}/{total})</span>
                </h3>
                <p className="text-xs text-slate-500">Докосни номер, за да отидеш на задачата.</p>
              </div>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Затвори" className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q) => (
                <NavButton key={q.number} q={q} submitted={submitted} variant="drawer" onSelect={select} />
              ))}
            </div>
            {!submitted && (
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onSubmit();
                }}
                disabled={answered === 0}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-sapphire py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {submitLabel}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
