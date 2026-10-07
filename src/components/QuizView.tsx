import React, { useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import type { QuizQuestion } from '../types';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  questions: QuizQuestion[];
  onReviewFlashcards: () => void;
  onOpenChat: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ questions, onReviewFlashcards, onOpenChat }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === questions.length;

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const getBulgarianGrade = (correct: number, total: number) => {
    const ratio = correct / total;
    if (ratio >= 0.9) {
      return {
        grade: 'Отличен 6.00',
        color: 'text-emerald-400',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        comment: '🏆 Браво! Готов си за 6-ца на всяко контролно или матура!',
        readyForExam: true
      };
    }
    if (ratio >= 0.7) {
      return {
        grade: 'Мн. добър 5.00',
        color: 'text-sky-400',
        badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
        comment: '🌟 Много стабилен резултат! С още един бърз преглед на флашкартите си за пълен Отличен.',
        readyForExam: true
      };
    }
    if (ratio >= 0.5) {
      return {
        grade: 'Добър 4.00',
        color: 'text-amber-400',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        comment: '📚 Имаш базова представа, но има детайли и капани за доизчистване преди контролното.',
        readyForExam: false
      };
    }
    return {
      grade: 'Среден 3.00 / За преговор',
      color: 'text-rose-400',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      comment: '💡 Препоръчваме да преговориш с резюмето и да попиташ тетрадката за неясните неща.',
      readyForExam: false
    };
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= questions.length * 0.9) {
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const correctScore = calculateScore();
  const gradeInfo = getBulgarianGrade(correctScore, questions.length);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#14182e] border border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Светата троица: Част 3 — Тест за 6-ца преди контролното</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Провери готовността си ({questions.length} въпроса)
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-400">
            Отговорени: <strong className="text-white">{answeredCount}</strong> / {questions.length}
          </div>

          {isSubmitted && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Повтори теста</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Navigation Numbers Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-2 rounded-xl bg-[#12162b] border border-white/5 no-scrollbar">
        {questions.map((q, idx) => {
          const isAns = selectedAnswers[q.id] !== undefined;
          const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctIndex;

          let btnBg = 'bg-white/5 text-slate-400 border-white/5';
          if (isSubmitted) {
            btnBg = isCorrect
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/50';
          } else if (isAns) {
            btnBg = 'bg-indigo-600 text-white border-indigo-500';
          }

          return (
            <button
              key={q.id}
              onClick={() => {
                const el = document.getElementById(`question-${q.id}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center border transition-all flex-shrink-0 ${btnBg}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Result Card when submitted */}
      {isSubmitted && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121633] via-[#101428] to-[#0c1a24] border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase border mb-2 ${gradeInfo.badge}`}>
                Оценка: {gradeInfo.grade}
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white">
                {correctScore} от {questions.length} верни отговора
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                {gradeInfo.comment}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onReviewFlashcards}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all"
              >
                Преговори с флашкарти ⚡
              </button>
              <button
                onClick={onOpenChat}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white text-xs font-bold shadow-lg hover:scale-[1.02] transition-all"
              >
                Питай тетрадката за грешките 💬
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question List */}
      <div className="space-y-5">
        {questions.map((q, idx) => {
          const selectedOption = selectedAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = isAnswered && selectedOption === q.correctIndex;

          return (
            <div
              id={`question-${q.id}`}
              key={q.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-rose-950/20 border-rose-500/40'
                  : 'bg-[#12162a] border-white/5 hover:border-white/15'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-extrabold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {q.question}
                  </h4>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-0 sm:pl-10">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  let optionStyles = 'bg-[#181d36]/70 border-white/5 text-slate-300 hover:bg-[#1f2647] hover:border-indigo-500/30';

                  if (isSubmitted) {
                    if (isThisCorrect) {
                      optionStyles = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-bold';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyles = 'bg-rose-500/20 border-rose-500/60 text-rose-200 font-bold';
                    } else {
                      optionStyles = 'bg-white/[0.02] border-white/5 text-slate-500 opacity-60';
                    }
                  } else if (isThisSelected) {
                    optionStyles = 'bg-indigo-600/30 border-indigo-500 text-white font-bold ring-1 ring-indigo-500';
                  }

                  const letters = ['А', 'Б', 'В', 'Г'];

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm transition-all ${optionStyles}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-black/30 font-mono text-xs flex items-center justify-center flex-shrink-0">
                        {letters[optIdx]}
                      </span>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (visible after submission) */}
              {isSubmitted && (
                <div className="mt-4 pt-3 border-t border-white/10 pl-0 sm:pl-10 text-xs flex items-start gap-2 text-slate-300">
                  <span className="font-bold text-sky-400">💡 Обяснение:</span>
                  <span>{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!isSubmitted && (
        <div className="p-6 rounded-2xl bg-[#14182e] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-300 text-center sm:text-left">
            {!isAllAnswered ? (
              <span>⚠️ Отговори на всички {questions.length} въпроса, за да получиш точна оценка за 6-ца.</span>
            ) : (
              <span className="text-emerald-400 font-bold">✓ Всички въпроси са попълнени! Натисни за резултат.</span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Предай теста и провери за 6-ца 🏆
          </button>
        </div>
      )}
    </div>
  );
};
