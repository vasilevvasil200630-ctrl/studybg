import React, { useState, useEffect } from 'react';
import { Clock, ShieldAlert, RefreshCw, ArrowRight } from 'lucide-react';
import type { QuizQuestion, LessonData } from '../types';

interface ExamSimulatorViewProps {
  currentLesson: LessonData;
  onOpenErrorBank?: () => void;
  onRecordError?: (q: QuizQuestion, optIdx: number) => void;
}

export const ExamSimulatorView: React.FC<ExamSimulatorViewProps> = ({
  currentLesson,
  onOpenErrorBank,
  onRecordError
}) => {
  const [examDurationMinutes, setExamDurationMinutes] = useState<number>(60);
  const [secondsLeft, setSecondsLeft] = useState<number>(60 * 60);
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Questions adapted for 100-point scale: 10 points per question
  const questions = currentLesson.quiz;
  const POINTS_PER_QUESTION = 100 / Math.max(1, questions.length);

  // Exam Countdown to May/June 2026
  const getExamCountdowns = () => {
    const now = new Date();
    const dziDate = new Date('2026-05-20T08:00:00');
    const nvoDate = new Date('2026-06-17T09:00:00');

    const diffDzi = Math.max(0, Math.ceil((dziDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const diffNvo = Math.max(0, Math.ceil((nvoDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    return { diffDzi, diffNvo };
  };

  const { diffDzi, diffNvo } = getExamCountdowns();

  useEffect(() => {
    let timer: any = null;
    if (isExamRunning && secondsLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isExamRunning && !isSubmitted) {
      handleSubmitExam();
    }
    return () => clearInterval(timer);
  }, [isExamRunning, secondsLeft, isSubmitted]);

  const handleStartExam = (mins: number) => {
    setExamDurationMinutes(mins);
    setSecondsLeft(mins * 60);
    setIsExamRunning(true);
    setIsSubmitted(false);
    setSelectedAnswers({});
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted || !isExamRunning) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateTotalPoints = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round(correctCount * POINTS_PER_QUESTION);
  };

  const getMonGradeInfo = (points: number) => {
    if (points >= 90) {
      return {
        grade: 'Отличен 6.00',
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        status: 'Готовност за пълен Отличен на ДЗИ / НВО',
        color: 'text-emerald-700'
      };
    }
    if (points >= 75) {
      return {
        grade: 'Много добър 5.00',
        badge: 'bg-sky-50 text-sky-800 border-sky-200',
        status: 'Много добра основа, има детайли за изчистване',
        color: 'text-sky-700'
      };
    }
    if (points >= 59) {
      return {
        grade: 'Добър 4.00',
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        status: 'Средна степен на усвояване на стандартите на МОН',
        color: 'text-amber-700'
      };
    }
    if (points >= 30) {
      return {
        grade: 'Среден 3.00',
        badge: 'bg-orange-50 text-orange-800 border-orange-200',
        status: 'Критичен праг — необходим е сериозен преговор',
        color: 'text-orange-700'
      };
    }
    return {
      grade: 'Слаб 2.00',
      badge: 'bg-rose-50 text-rose-800 border-rose-200',
      status: 'Под официалния праг за преминаване (под 30 точки)',
      color: 'text-rose-700'
    };
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setIsExamRunning(false);

    // Record mistakes to error bank if handler provided
    questions.forEach(q => {
      const chosen = selectedAnswers[q.id];
      if (chosen !== q.correctIndex && onRecordError) {
        onRecordError(q, chosen ?? -1);
      }
    });
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const totalPoints = calculateTotalPoints();
  const gradeInfo = getMonGradeInfo(totalPoints);

  return (
    <div className="space-y-6">
      
      {/* Official MON Countdown Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* NVO 7th Grade Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                7. клас • НВО
              </span>
              <span className="text-xs text-slate-500">17 – 19 юни 2026 г.</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Национално външно оценяване
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Български език и литература & Математика
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {diffNvo}
            </div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider">
              дни до изпита
            </span>
          </div>
        </div>

        {/* DZI 12th Grade Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                12. клас • ДЗИ
              </span>
              <span className="text-xs text-slate-500">20 – 22 май 2026 г.</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Държавни зрелостни изпити (Матури)
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Задължителна матура по БЕЛ и профилиран предмет
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {diffDzi}
            </div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider">
              дни до изпита
            </span>
          </div>
        </div>

      </div>

      {/* Simulator Control Box */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Режим „Реален изпит без подсказки“ (100-точкова скала на МОН)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Симулация на изпит за „{currentLesson.title}“
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Официална система: {questions.length} въпроса = 100 точки общ сбор.
            </p>
          </div>

          {/* Time & State Indicator */}
          <div className="flex items-center gap-3">
            {isExamRunning && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200">
                <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                <span className="font-mono text-base font-bold text-amber-900">
                  {formatTimer(secondsLeft)}
                </span>
              </div>
            )}

            {!isExamRunning && !isSubmitted && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartExam(30)}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
                >
                  30 мин
                </button>
                <button
                  onClick={() => handleStartExam(60)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  Старт симулация (60 мин)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Exam active banner */}
        {isExamRunning && (
          <div className="p-3 my-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>Времето тече. Отговорите не се показват до финално предаване.</span>
            <span className="font-mono font-medium text-slate-800">
              Попълнени: {Object.keys(selectedAnswers).length} / {questions.length}
            </span>
          </div>
        )}

        {/* Results Card */}
        {isSubmitted && (
          <div className="p-6 my-6 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded text-xs font-semibold border mb-2 ${gradeInfo.badge}`}>
                  Официална оценка: {gradeInfo.grade}
                </span>
                <h4 className="text-3xl font-extrabold text-slate-900 font-mono">
                  {totalPoints} / 100 точки
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {gradeInfo.status}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => handleStartExam(examDurationMinutes)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Повтори симулацията</span>
                </button>

                {onOpenErrorBank && (
                  <button
                    onClick={onOpenErrorBank}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                  >
                    <span>Прегледай сгрешените в Банката с грешки</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Questions Display */}
        {isExamRunning && (
          <div className="space-y-4 mt-6">
            {questions.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[q.id];

              return (
                <div key={q.id} className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <h5 className="text-sm font-semibold text-slate-900 leading-snug">
                      {q.question}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-0 sm:pl-9">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedOpt === oIdx;
                      const letters = ['А', 'Б', 'В', 'Г'];

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`flex items-center gap-3 p-3 rounded-lg border text-left text-xs transition-colors ${
                            isSelected
                              ? 'bg-blue-50 border-blue-500 text-blue-950 font-medium ring-1 ring-blue-500/50'
                              : 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          <span className="w-5 h-5 rounded bg-white font-mono text-[11px] font-bold text-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-200">
                            {letters[oIdx]}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Остават: {formatTimer(secondsLeft)}
              </span>
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                Предай симулационния изпит
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
