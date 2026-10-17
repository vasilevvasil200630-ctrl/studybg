import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { ExamSimulatorState } from './useExamSimulator';

export const ExamModule1Panel: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const { isExamRunning, isSubmitted, activeModuleTab, questions, selectedAnswers, handleSelectOption, mod1CompletedCount } = sim;

  return (
    <>
        {/* Tab 1: Module 1 (Multiple Choice - 40 Points) */}
        {(isExamRunning || isSubmitted) && activeModuleTab === 1 && (
          <div className="space-y-4 mt-6">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
              <span>
                <strong>Модул 1:</strong> {questions.length} затворени въпроса с избираем отговор (А, Б, В, Г). Общ брой точки за Модул 1: <strong>40 точки</strong> (по {Number((40 / Math.max(1, questions.length)).toFixed(1))} т. на въпрос).
              </span>
              <span className="font-mono font-medium text-slate-800">
                Попълнени: {mod1CompletedCount} / {questions.length}
              </span>
            </div>

            {questions.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;
              const ptsPerQ = Number((40 / Math.max(1, questions.length)).toFixed(1));

              return (
                <div key={q.id} className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <div>
                        <h5 className="text-sm font-semibold text-slate-900 leading-snug">
                          {q.question}
                        </h5>
                        <span className="text-[11px] text-slate-500 font-mono">{ptsPerQ} точки</span>
                      </div>
                    </div>

                    {isSubmitted && (
                      <div>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            +{ptsPerQ} т.
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold">
                            <XCircle className="w-3.5 h-3.5" />
                            0 т.
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-0 sm:pl-9">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedOpt === oIdx;
                      const letters = ['А', 'Б', 'В', 'Г'];

                      let buttonStyles = 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';

                      if (isSubmitted) {
                        if (oIdx === q.correctIndex) {
                          buttonStyles = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium ring-1 ring-emerald-400/50';
                        } else if (isSelected) {
                          buttonStyles = 'bg-rose-50 border-rose-400 text-rose-950 font-medium ring-1 ring-rose-400/50';
                        }
                      } else if (isSelected) {
                        buttonStyles = 'bg-blue-50 border-blue-500 text-blue-950 font-medium ring-1 ring-blue-500/50';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`flex items-center gap-3 p-3 rounded-lg border text-left text-xs transition-colors ${buttonStyles}`}
                        >
                          <span className="w-5 h-5 rounded bg-white font-mono text-[11px] font-bold text-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-200">
                            {letters[oIdx]}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="pl-0 sm:pl-9 pt-2">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                        <div className="font-semibold text-slate-800">
                          Официално обяснение на МОН:
                        </div>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
    </>
  );
};
