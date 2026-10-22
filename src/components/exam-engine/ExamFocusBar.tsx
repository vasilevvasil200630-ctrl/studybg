import React, { useState } from 'react';
import { AlertTriangle, ArrowLeft, Clock, Send, Sigma, Volume2, VolumeX } from 'lucide-react';

/**
 * Лента на изпита (пренесена от Матура Плюс, components/exam/ExamHeader): изход с потвърждение,
 * таймер, който става кехлибарен в последните 5 минути и червен в последната, и „Предай“.
 * Стои залепена под горната лента на сайта.
 */

export const formatTimer = (s: number): string => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = m.toString().padStart(2, '0');
  const ss = sec.toString().padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

interface ExamFocusBarProps {
  title: string;
  secondsLeft: number;
  submitted: boolean;
  answeredCount: number;
  totalCount: number;
  soundMuted: boolean;
  onToggleSound: () => void;
  onSubmit: () => void;
  /** Потвърденият изход: изтрива прогреса и връща към списъка с варианти */
  onExit: () => void;
  /** Ако вариантът има лист с формули — отваря го */
  onOpenFormulas?: () => void;
}

export const ExamFocusBar: React.FC<ExamFocusBarProps> = ({
  title,
  secondsLeft,
  submitted,
  answeredCount,
  totalCount,
  soundMuted,
  onToggleSound,
  onSubmit,
  onExit,
  onOpenFormulas,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const isWarning = secondsLeft <= 300 && secondsLeft > 60;
  const isCritical = secondsLeft <= 60;

  return (
    <>
      <div data-print-hide className="sticky top-16 z-30 -mx-4 mb-6 border-b border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => (submitted ? onExit() : setConfirmOpen(true))}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {submitted ? 'Всички варианти' : <><span className="hidden sm:inline">Прекрати изпита</span><span className="sm:hidden">Изход</span></>}
          </button>

          <p className="hidden min-w-0 flex-1 truncate text-center text-sm font-semibold text-slate-900 md:block">{title}</p>

          <div className="flex shrink-0 items-center gap-2">
            {onOpenFormulas && (
              <button
                type="button"
                onClick={onOpenFormulas}
                aria-haspopup="dialog"
                aria-label="Формули"
                title="Листът с формули на МОН"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-brand-sapphire/40 hover:bg-brand-sapphire-soft hover:text-brand-ink"
              >
                <Sigma className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Формули</span>
              </button>
            )}
            {!submitted && (
              <>
                <button
                  type="button"
                  onClick={onToggleSound}
                  aria-label={soundMuted ? 'Включи сигнала 5 минути преди края' : 'Изключи сигнала 5 минути преди края'}
                  title={soundMuted ? 'Сигналът е изключен' : 'Сигнал 5 минути преди края'}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                >
                  {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <div
                  role="timer"
                  aria-label="Оставащо време"
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm font-semibold tabular-nums ${
                    isCritical
                      ? 'border-rose-300 bg-rose-50 text-rose-800'
                      : isWarning
                        ? 'border-amber-300 bg-amber-50 text-amber-900'
                        : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatTimer(secondsLeft)}
                </div>
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={answeredCount === 0}
                  title={answeredCount === 0 ? 'Отговори поне на една задача' : `Отговорени ${answeredCount} от ${totalCount}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-sapphire px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-sapphire-dark disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  Предай
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
          <div className="fixed inset-0" onClick={() => setConfirmOpen(false)} aria-hidden="true" />
          <div role="dialog" aria-modal="true" aria-labelledby="exam-exit-title" className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-600">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 id="exam-exit-title" className="text-base font-bold text-slate-900">Да прекратиш изпита?</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  Отговорите ти няма да се оценят и ще бъдат изтрити. Ако искаш да видиш резултата, предай изпита.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmOpen(false)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Продължи изпита
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmOpen(false);
                  onExit();
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Прекрати
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
