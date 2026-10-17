import React from 'react';
import { FileText, BookOpen, Scale } from 'lucide-react';
import type { ExamSimulatorState } from './useExamSimulator';

export const ExamModuleTabs: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const { examData, isExamRunning, isSubmitted, activeModuleTab, setActiveModuleTab, questions, mod1CompletedCount, mod2CompletedCount, mod3HasText } = sim;

  return (
    <>
        {/* 3-Module Tabs Navigation */}
        {(isExamRunning || isSubmitted) && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveModuleTab(1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModuleTab === 1
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Модул 1: Тестови въпроси (40 т.)</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeModuleTab === 1 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {mod1CompletedCount}/{questions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveModuleTab(2)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModuleTab === 2
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Модул 2: Анализ на извор (30 т.)</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeModuleTab === 2 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {mod2CompletedCount}/{examData.module2.questions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveModuleTab(3)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModuleTab === 3
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Модул 3: Аргументиран отговор (30 т.)</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeModuleTab === 3 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {mod3HasText ? '✓ Написан' : 'Чернова'}
                </span>
              </button>
            </div>
          </div>
        )}
    </>
  );
};
