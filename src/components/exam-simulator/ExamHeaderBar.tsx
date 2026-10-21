import React from 'react';
import { Clock, ShieldAlert, GraduationCap } from 'lucide-react';
import type { ExamSimulatorState } from './useExamSimulator';

export const ExamHeaderBar: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const { currentLesson, secondsLeft, isExamRunning, isSubmitted, pendingDraft, handleStartExam, handleRestoreDraft, handleDiscardDraft, formatTimer } = sim;

  return (
    <>
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>3-модулен изпитен формат по стандарта на МОН (100 точки)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Симулация на изпит: „{currentLesson.title}“
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Модул 1 (40т. тест) • Модул 2 (30т. извор) • Модул 3 (30т. аргументиран отговор)
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
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => handleStartExam(240)}
                  className="px-3 py-2 rounded-lg bg-brand-sapphire hover:bg-brand-sapphire-light text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                  title="Официален изпитен регламент на МОН за ДЗИ 12. клас: 240 минути"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>240 мин (ДЗИ)</span>
                </button>
                <button
                  onClick={() => handleStartExam(90)}
                  className="px-3 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-brand-sapphire text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                  title="Официален изпитен регламент на МОН за НВО 10. клас: 90 минути"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>90 мин (НВО 10)</span>
                </button>
                <button
                  onClick={() => handleStartExam(60)}
                  className="px-3 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-brand-sapphire text-xs font-semibold transition-colors shadow-xs"
                >
                  60 мин (Експресен)
                </button>
                <button
                  onClick={() => handleStartExam(0)}
                  className="px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium border border-slate-200 transition-colors"
                  title="Учебно темпо без таймер за спокойна самоподготовка"
                >
                  Без таймер
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Незавършен изпит, запазен преди презареждане */}
        {pendingDraft && !isExamRunning && !isSubmitted && (
          <div
            role="status"
            className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong className="block text-sm">Имате незавършен изпит по тази тема.</strong>
              {pendingDraft.deadline === null
                ? 'Изпит без таймер — отговорите ви са запазени.'
                : pendingDraft.deadline > Date.now()
                  ? `Оставащо време: ${formatTimer(Math.round((pendingDraft.deadline - Date.now()) / 1000))}.`
                  : 'Времето е изтекло — при продължаване изпитът ще бъде предаден автоматично.'}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRestoreDraft}
                className="px-3 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-colors"
              >
                Продължи изпита
              </button>
              <button
                onClick={handleDiscardDraft}
                className="px-3 py-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 text-xs font-medium border border-amber-200 transition-colors"
              >
                Изтрий черновата
              </button>
            </div>
          </div>
        )}
    </>
  );
};
