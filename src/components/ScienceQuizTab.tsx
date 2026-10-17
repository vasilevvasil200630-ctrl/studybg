import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { SCIENCE_QUIZ } from '../data/scienceLabData';

// Изнесено от ScienceDziLab.tsx — един таб от STEM лабораторията
export const ScienceQuizTab: React.FC = () => {
  // =========================================================================
  // TAB 4: QUIZ STATE
  // =========================================================================
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOpt, setSelectedQuizOpt] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const currentQ = SCIENCE_QUIZ[quizIndex] || SCIENCE_QUIZ[0];


  return (
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
            Задача {quizIndex + 1} от {SCIENCE_QUIZ.length} • {currentQ.subject}
          </span>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
            Верни: {quizScore} / {SCIENCE_QUIZ.length}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </h3>

        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedQuizOpt === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
            if (selectedQuizOpt !== null) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => {
                  if (selectedQuizOpt !== null) return;
                  setSelectedQuizOpt(idx);
                  if (idx === currentQ.correctIndex) {
                    setQuizScore((s) => s + 1);
                  }
                }}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
              >
                <span>{opt}</span>
                {selectedQuizOpt !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {selectedQuizOpt !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {selectedQuizOpt !== null && (
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2">
            <div>
              <strong>Обяснение за 6.00:</strong> {currentQ.explanation}
            </div>
            <div className="pt-1">
              <button
                onClick={() => {
                  setSelectedQuizOpt(null);
                  setQuizIndex((prev) => (prev + 1) % SCIENCE_QUIZ.length);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                <span>Следваща задача</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
  );
};
