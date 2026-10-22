import React from 'react';
import { RefreshCw, Sparkles, Lightbulb, Check, AlertTriangle } from 'lucide-react';
import { STRUCTURAL_ANALYSIS_LABEL } from '../../services/geminiService';
import type { ExamSimulatorState } from './useExamSimulator';

export const ExamModule3Panel: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const { examData, isExamRunning, isSubmitted, activeModuleTab, essayText, setEssayText, rubricScores, setRubricScores, isEvaluatingEssay, aiEssayEvaluation, evaluationError, handleEvaluateEssayWithAi, module3Points } = sim;

  return (
    <>
        {/* Tab 3: Module 3 (Extended Argumentative Essay - 30 Points) */}
        {(isExamRunning || isSubmitted) && activeModuleTab === 3 && (
          <div className="space-y-6 mt-6">
            
            {/* Essay Prompt Card */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                Модул 3 • Задача 41 (ДЗИ): Разширен писмен отговор
              </span>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {examData.module3.essayPrompt}
              </h4>
              
              <div className="space-y-1.5 pt-2 border-t border-blue-100">
                <span className="text-xs font-semibold text-slate-700">Опорни указания за разработката:</span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  {examData.module3.guidelines.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Essay Writing Space */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Вашата писмена разработка (теза, аргументи и синтезиран извод):</span>
                <span className="tabular-nums">
                  {essayText.trim().split(/\s+/).filter(Boolean).length} думи
                </span>
              </div>
              <textarea
                value={essayText}
                disabled={isSubmitted}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Започнете с ясна историческа теза, последвана от аргументативни абзаци с конкретна фактология и завършете с обобщаващ извод..."
                rows={10}
                className="w-full p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-serif disabled:bg-slate-50 disabled:text-slate-800"
              />
            </div>

            {/* AI Essay Evaluation Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-blue-50/90 border border-blue-200 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <span>AI Оценител по 4-те критерия на МОН</span>
                    <span className="text-[10px] tabular-nums px-1.5 py-0.2 rounded bg-blue-200 text-blue-900 font-bold">
                      30 т. ДЗИ
                    </span>
                  </div>
                  <div className="text-[11px] text-blue-700">
                    Обективна проверка на тезата, изворите, композицията и езиковата норма
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleEvaluateEssayWithAi}
                disabled={isEvaluatingEssay || essayText.trim().length < 30}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 text-white font-semibold text-xs transition-all shadow-xs shrink-0 cursor-pointer disabled:cursor-not-allowed"
              >
                {isEvaluatingEssay ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Проверяване с Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{aiEssayEvaluation ? 'Преоцени текста отново' : 'Оцени есето с AI'}</span>
                  </>
                )}
              </button>
            </div>

            {evaluationError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{evaluationError}</span>
              </div>
            )}

            {/* AI Detailed Audit Report Card */}
            {aiEssayEvaluation && (
              <div
                className={`p-5 rounded-2xl bg-white border shadow-md space-y-4 ${
                  aiEssayEvaluation.mode === 'ai' ? 'border-blue-500/30' : 'border-amber-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>{aiEssayEvaluation.mode === 'ai' ? 'AI оценка на есето (ориентировъчна)' : STRUCTURAL_ANALYSIS_LABEL}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          aiEssayEvaluation.mode === 'ai'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-900 border-amber-200'
                        }`}
                      >
                        {aiEssayEvaluation.mode === 'ai' ? 'Google Gemini' : 'Без AI'}
                      </span>
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {aiEssayEvaluation.mode === 'ai'
                        ? 'Точките са ориентировъчни по 4-критериалната рубрика и не заместват официалната проверка.'
                        : 'Няма връзка с AI модела. Показваме само структурни наблюдения — поставете точките сами в самооценката по-долу.'}
                    </p>
                    {aiEssayEvaluation.fallbackReason && (
                      <p className="text-[11px] text-amber-800 mt-1">Причина: {aiEssayEvaluation.fallbackReason}</p>
                    )}
                  </div>

                  {aiEssayEvaluation.mode === 'ai' && aiEssayEvaluation.totalScore !== null && (
                    <div className="flex items-baseline gap-1 bg-blue-50 text-blue-900 border border-blue-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
                      <span className="text-xs font-semibold text-blue-700">Оценка:</span>
                      <span className="text-xl font-bold tabular-nums text-blue-700">
                        {aiEssayEvaluation.totalScore}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        / {examData.module3.rubric.reduce((sum, c) => sum + c.maxPoints, 0)} т.
                      </span>
                    </div>
                  )}
                </div>

                {/* Overall Feedback */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  <span className="font-bold text-slate-900 block mb-1">Обобщение:</span>
                  {aiEssayEvaluation.overallFeedback}
                </div>

                {/* 4 Criteria Scores with Specific Feedback */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {examData.module3.rubric.map(crit => {
                    const pts = aiEssayEvaluation.scores[crit.id];
                    const feedback = aiEssayEvaluation.criterionFeedback[crit.id];
                    return (
                      <div key={crit.id} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {crit.name}
                          </span>
                          {aiEssayEvaluation.mode === 'ai' && pts !== undefined && (
                            <span className="text-xs tabular-nums font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              {pts} / {crit.maxPoints} т.
                            </span>
                          )}
                        </div>
                        {feedback && (
                          <p className="text-[11px] text-slate-600 leading-snug">
                            {feedback}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Strengths & Weaknesses 2-Column Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Силни страни на разработката</span>
                    </div>
                    <ul className="text-xs text-emerald-800/90 space-y-1 list-disc list-inside">
                      {aiEssayEvaluation.strengths.map((str, idx) => (
                        <li key={idx}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Области за подобрение</span>
                    </div>
                    <ul className="text-xs text-amber-800/90 space-y-1 list-disc list-inside">
                      {aiEssayEvaluation.weaknesses.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Concrete Tips for 6.00 */}
                {aiEssayEvaluation.concreteTipsForSix && aiEssayEvaluation.concreteTipsForSix.length > 0 && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>3 Златни стъпки за вдигане до Отличен 6.00 на матурата:</span>
                    </div>
                    <ul className="text-xs text-amber-950 space-y-1 list-decimal list-inside pl-1">
                      {aiEssayEvaluation.concreteTipsForSix.map((tip, idx) => (
                        <li key={idx} className="leading-snug">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Submission Rubric & Model Thesis */}
            {isSubmitted && (
              <div className="space-y-6 pt-4 border-t border-slate-200">
                
                {/* Sample Thesis from МОН */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    Примерна теза (StudyBG)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 mt-2 font-serif italic leading-relaxed">
                    „{examData.module3.sampleThesis}“
                  </p>
                </div>

                {/* 4-Criteria МОН Scoring Matrix */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">
                        Скала за самооценка по модела на МОН (30 т. в симулатора)
                      </h5>
                      <p className="text-xs text-slate-500">
                        Оценете текста си по четирите критерия:
                      </p>
                    </div>
                    <span className="text-base font-bold tabular-nums text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      {module3Points} / 30 т.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {examData.module3.rubric.map(crit => {
                      const currentVal = rubricScores[crit.id] ?? 0;

                      return (
                        <div key={crit.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h6 className="text-xs font-bold text-slate-900">
                                {crit.name}
                              </h6>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {crit.description}
                              </p>
                            </div>
                            <span className="text-xs tabular-nums font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex-shrink-0">
                              макс {crit.maxPoints} т.
                            </span>
                          </div>

                          {/* Levels selector */}
                          <div className="space-y-1.5 pt-1">
                            {crit.levels.map(lvl => (
                              <button
                                key={lvl.points}
                                onClick={() => setRubricScores(prev => ({ ...prev, [crit.id]: lvl.points }))}
                                className={`w-full flex items-center justify-between p-2 rounded-lg border text-left text-xs transition-colors ${
                                  currentVal === lvl.points
                                    ? 'bg-blue-50 border-blue-500 text-blue-950 font-semibold ring-1 ring-blue-500/50'
                                    : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <span className="text-[11px] flex-1">{lvl.label}</span>
                                <span className="tabular-nums font-bold text-slate-800 ml-2">
                                  {lvl.points} т.
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}
    </>
  );
};
