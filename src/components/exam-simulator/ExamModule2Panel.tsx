import React from 'react';
import type { ExamSimulatorState } from './useExamSimulator';

export const ExamModule2Panel: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const { examData, isExamRunning, isSubmitted, activeModuleTab, module2Answers, setModule2Answers, module2Scores, setModule2Scores } = sim;

  return (
    <>
        {/* Tab 2: Module 2 (Primary Source Analysis - 30 Points) */}
        {(isExamRunning || isSubmitted) && activeModuleTab === 2 && (
          <div className="space-y-6 mt-6">
            
            {/* Primary Source Document Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    Исторически извор / Документ
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">
                    {examData.module2.sourceTitle}
                  </h4>
                  <p className="text-xs text-slate-600">
                    Произход: {examData.module2.sourceOrigin}
                  </p>
                </div>
                {examData.module2.citation && (
                  <span className="text-xs text-slate-500 tabular-nums bg-white px-2.5 py-1 rounded border border-slate-200">
                    {examData.module2.citation}
                  </span>
                )}
              </div>

              {/* Source Text Box */}
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 shadow-2xs font-serif text-sm text-slate-900 italic leading-relaxed">
                {examData.module2.excerpt}
              </div>

              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Исторически контекст: </span>
                {examData.module2.context}
              </div>
            </div>

            {/* Source Analytical Questions */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Задачи за анализ на извора (3 задачи × 10 точки = 30 точки)
              </div>

              {examData.module2.questions.map((sq) => {
                const userAns = module2Answers[sq.id] || '';
                const currentScore = module2Scores[sq.id] ?? 0;

                return (
                  <div key={sq.id} className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 leading-snug">
                          {sq.prompt}
                        </h5>
                        {sq.hint && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            Насока: {sq.hint}
                          </p>
                        )}
                      </div>
                      <span className="text-xs tabular-nums font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex-shrink-0">
                        10 т.
                      </span>
                    </div>

                    {/* Student input field */}
                    <div>
                      <textarea
                        value={userAns}
                        disabled={isSubmitted}
                        onChange={(e) => setModule2Answers(prev => ({ ...prev, [sq.id]: e.target.value }))}
                        placeholder="Въведете вашия аргументиран отговор на базата на извора..."
                        rows={3}
                        className="w-full p-3 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-700"
                      />
                    </div>

                    {/* Submission Review & Scoring Rubric */}
                    {isSubmitted && (
                      <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Примерен еталонен отговор (StudyBG)
                          </span>
                          <p className="text-xs text-slate-800 mt-2 leading-relaxed font-medium">
                            {sq.modelAnswer}
                          </p>
                        </div>

                        {/* Interactive Self-Scoring Buttons */}
                        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                          <span className="text-xs text-slate-600 font-semibold">
                            Оценете вашия отговор спрямо еталона:
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setModule2Scores(prev => ({ ...prev, [sq.id]: 0 }))}
                              className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${
                                currentScore === 0
                                  ? 'bg-rose-600 text-white border-rose-600'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              0 т. (Невярно)
                            </button>
                            <button
                              onClick={() => setModule2Scores(prev => ({ ...prev, [sq.id]: 5 }))}
                              className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${
                                currentScore === 5
                                  ? 'bg-amber-700 text-white border-amber-600'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              5 т. (Частично)
                            </button>
                            <button
                              onClick={() => setModule2Scores(prev => ({ ...prev, [sq.id]: 10 }))}
                              className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${
                                currentScore === 10
                                  ? 'bg-emerald-700 text-white border-emerald-600'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              10 т. (Пълен отговор)
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}
    </>
  );
};
