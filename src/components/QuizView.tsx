import React, { useState } from 'react';
import { RefreshCw, MessageSquare, ArrowRight, CheckSquare, HelpCircle, Mail } from 'lucide-react';
import type { QuizQuestion } from '../types';
import type { AppNavTab } from './Navbar';
import confetti from 'canvas-confetti';
import { EmailShareModal } from './EmailShareModal';

interface QuizViewProps {
  questions: QuizQuestion[];
  onReviewFlashcards: () => void;
  onOpenChat: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
  onRecordError?: (q: QuizQuestion, chosenIndex: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  onReviewFlashcards,
  onOpenChat,
  onNavigateTab,
  onRecordError
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

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
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        comment: 'Пълно покритие на изпитните стандарти. Всички ключови дефиниции и концепции са усвоени отлично.',
        readyForExam: true
      };
    }
    if (ratio >= 0.7) {
      return {
        grade: 'Мн. добър 5.00',
        badge: 'bg-blue-50 text-blue-800 border-blue-200',
        comment: 'Много добра подготовка. Препоръчва се бърз преговор на допуснатите грешки за достигане на 6.00.',
        readyForExam: true
      };
    }
    if (ratio >= 0.5) {
      return {
        grade: 'Добър 4.00',
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        comment: 'Базова ориентация по темата, но са допуснати грешки при ключови формулировки.',
        readyForExam: false
      };
    }
    return {
      grade: 'Среден 3.00 / Необходим преговор',
      badge: 'bg-rose-50 text-rose-800 border-rose-200',
      comment: 'Има съществени пропуски. Препоръчва се повторно преглеждане на конспекта и флашкартите.',
      readyForExam: false
    };
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= questions.length * 0.9) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }

    // Automatically record any mistakes to the Error Bank
    questions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      if (chosen !== undefined && chosen !== q.correctIndex) {
        onRecordError?.(q, chosen);
      }
    });
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const correctScore = calculateScore();
  const gradeInfo = getBulgarianGrade(correctScore, questions.length);
  const gradeBg = Math.max(2, Math.min(6, 2 + (correctScore / (questions.length || 1)) * 4));
  const missedQuestions = questions
    .filter((q) => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctIndex)
    .map((q) => q.question);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 mb-1">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Стандартизиран контролен тест (МОН)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Проверка на знанията ({questions.length} въпроса)
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-medium text-slate-600">
            Попълнени: <strong className="text-slate-900 font-mono">{answeredCount}</strong> / {questions.length}
          </div>

          {isSubmitted && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Повтори теста</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Navigation Numbers Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-2 rounded-xl bg-slate-100 border border-slate-200 no-scrollbar">
        {questions.map((q, idx) => {
          const isAns = selectedAnswers[q.id] !== undefined;
          const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctIndex;

          let btnBg = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50';
          if (isSubmitted) {
            btnBg = isCorrect
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
              : 'bg-rose-50 text-rose-800 border-rose-300 font-bold';
          } else if (isAns) {
            btnBg = 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs';
          }

          return (
            <button
              key={q.id}
              onClick={() => {
                const el = document.getElementById(`question-${q.id}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`w-8 h-8 rounded-lg text-xs font-bold font-mono flex items-center justify-center border transition-colors flex-shrink-0 ${btnBg}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Result Card when submitted */}
      {isSubmitted && (
        <div className="p-6 sm:p-7 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold border mb-2 ${gradeInfo.badge}`}>
                Резултат: {gradeInfo.grade}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
                {correctScore} от {questions.length} верни отговора ({Math.round((correctScore / questions.length) * 100)}%)
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {gradeInfo.comment}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2.5">
              <button
                onClick={onReviewFlashcards}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Преговор с карти</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenChat}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Обяснение на грешките</span>
              </button>
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                title="Изпрати този изпитен резултат по имейл"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Резултат на имейл</span>
              </button>

              {onNavigateTab && (
                <>
                  <button
                    onClick={() => onNavigateTab('errorbank')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Банка с грешки</span>
                  </button>
                  <button
                    onClick={() => onNavigateTab('simulator')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>100-т. симулатор</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Question List */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const selectedOption = selectedAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = isAnswered && selectedOption === q.correctIndex;

          return (
            <div
              id={`question-${q.id}`}
              key={q.id}
              className={`p-5 sm:p-6 rounded-xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-rose-50/40 border-rose-200'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold text-xs flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {q.question}
                  </h4>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-0 sm:pl-9">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  let optionStyles = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300';

                  if (isSubmitted) {
                    if (isThisCorrect) {
                      optionStyles = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyles = 'bg-rose-50 border-rose-400 text-rose-900 font-medium';
                    } else {
                      optionStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    optionStyles = 'bg-blue-50 border-blue-600 text-blue-900 font-medium ring-2 ring-blue-100';
                  }

                  const letters = ['А', 'Б', 'В', 'Г'];

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left text-xs sm:text-sm transition-all ${optionStyles}`}
                    >
                      <span className="w-5 h-5 rounded bg-slate-100 font-mono text-[11px] font-semibold text-slate-600 flex items-center justify-center flex-shrink-0 border border-slate-200">
                        {letters[optIdx]}
                      </span>
                      <span className="flex-1 leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (visible after submission) */}
              {isSubmitted && (
                <div className="mt-4 pt-3 border-t border-slate-200 pl-0 sm:pl-9 text-xs flex items-start gap-2 text-slate-600">
                  <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">Методическо обяснение:</span>{' '}
                    <span>{q.explanation}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!isSubmitted && (
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
            {!isAllAnswered ? (
              <span>Маркирайте отговори на всички {questions.length} въпроса преди предаване.</span>
            ) : (
              <span className="text-emerald-700 font-medium">Всички въпроси са попълнени. Можете да предадете теста.</span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Предай теста и изчисли оценка
          </button>
        </div>
      )}

      {/* Email Share Modal for Quiz Results */}
      <EmailShareModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        testResult={{
          lessonTitle: `Тест за самопроверка (${questions.length} въпроса)`,
          score: correctScore,
          total: questions.length,
          gradeBg,
          missedQuestions
        }}
      />
    </div>
  );
};
