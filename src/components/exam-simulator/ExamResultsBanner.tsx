import React, { useState } from 'react';
import { RefreshCw, ArrowRight, Printer, TrendingUp, Award, Mail } from 'lucide-react';
import type { ExamSimulatorState } from './useExamSimulator';
import { EmailShareModal } from '../EmailShareModal';

export const ExamResultsBanner: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const {
    currentLesson,
    questions,
    selectedAnswers,
    onOpenErrorBank,
    examDurationMinutes,
    isSubmitted,
    setIsPrintModalOpen,
    setIsCertModalOpen,
    setIsHistoryModalOpen,
    handleStartExam,
    module1Points,
    module2Points,
    module3Points,
    totalPoints,
    gradeResult,
    gradeInfo,
    examScale
  } = sim;
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const missedQuestions = isSubmitted
    ? questions
        .filter((q) => selectedAnswers[q.id] !== q.correctIndex)
        .map((q) => q.question)
    : [];
  const computedNumericGrade =
    gradeResult?.numeric ?? Math.min(6, Math.max(2, Number((2 + (totalPoints / 100) * 4).toFixed(2))));

  return (
    <>
      {/* Results Banner when Submitted */}
      {isSubmitted && (
        <div className="p-6 my-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <span className={`inline-block px-3 py-1 rounded text-xs font-semibold border mb-2 ${gradeInfo.badge}`}>
                {examScale.scale ? `Ориентировъчна оценка (${examScale.label}): ${gradeInfo.grade}` : examScale.label}
              </span>
              <div className="flex items-baseline gap-3">
                <h4 className="text-4xl font-bold text-slate-900 tabular-nums">
                  {totalPoints} <span className="text-xl text-slate-400 font-normal">/ 100 точки</span>
                </h4>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                {gradeInfo.status}
              </p>

              {/* Module Points Breakdown */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Модул 1 (Тест)</span>
                  <span className="text-sm font-bold tabular-nums text-slate-900">{module1Points} / 40 т.</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Модул 2 (Извор)</span>
                  <span className="text-sm font-bold tabular-nums text-slate-900">{module2Points} / 30 т.</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Модул 3 (Есе)</span>
                  <span className="text-sm font-bold tabular-nums text-slate-900">{module3Points} / 30 т.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsCertModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Дигитална Грамота / Сертификат (A4)</span>
              </button>

              <button
                onClick={() => setIsPrintModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-sapphire hover:bg-brand-sapphire-light text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Протокол от изпита (Печат / PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEmailModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Изпрати по имейл</span>
              </button>

              <button
                onClick={() => handleStartExam(examDurationMinutes)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Повтори симулацията</span>
              </button>

              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold border border-blue-200 transition-colors shadow-2xs"
              >
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Виж прогрес & история</span>
              </button>

              {onOpenErrorBank && (
                <button
                  onClick={onOpenErrorBank}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>Банка с грешки</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <EmailShareModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        lesson={currentLesson}
        testResult={{
          lessonTitle: `${currentLesson.title} (Модул 1: ${module1Points}/40, Модул 2: ${module2Points}/30, Модул 3: ${module3Points}/30)`,
          score: totalPoints,
          total: 100,
          gradeBg: computedNumericGrade,
          missedQuestions
        }}
      />
    </>
  );
};
