import React from 'react';
import { Printer, X } from 'lucide-react';
import type { ExamSimulatorState } from './useExamSimulator';

export const ExamProtocolModal: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const { currentLesson, isPrintModalOpen, setIsPrintModalOpen, studentName, setStudentName, module1Points, module2Points, module3Points, totalPoints, gradeInfo, examScale } = sim;

  return (
    <>
      {/* Official МОН Exam Protocol Print Modal */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:p-0 print:bg-white">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden print:border-none print:shadow-none">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Printer className="w-4 h-4 text-blue-600" />
                <span>Протокол от симулационен изпит (StudyBG)</span>
              </div>
              <button
                type="button"
                aria-label="Затвори протокола"
                onClick={() => setIsPrintModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Protocol Sheet Content (Printable) */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-900 font-serif">
              {/* Official Header */}
              <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-700 font-sans">
                  Република България • Министерство на образованието и науката
                </h3>
                <h2 className="text-lg sm:text-xl font-bold uppercase text-slate-900 tracking-wide font-sans">
                  Протокол от симулационно изпитно оценяване
                </h2>
                <div className="text-[11px] font-sans text-slate-500 flex items-center justify-center gap-4 pt-1">
                  <span>Рег. № BG-MON-{100000 + ((currentLesson.id.length * 7919 + totalPoints * 313) % 899999)}</span>
                  <span>•</span>
                  <span>Дата: {new Date().toLocaleDateString('bg-BG')} г.</span>
                </div>
              </div>

              {/* Student & Exam Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-sans pb-4 border-b border-slate-200">
                <div>
                  <span className="text-slate-500 block">Изпитвано лице:</span>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-blue-600 w-full"
                  />
                </div>
                <div>
                  <span className="text-slate-500 block">Учебен предмет & Клас:</span>
                  <span className="font-bold text-slate-900">{currentLesson.subject} ({currentLesson.grade})</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block">Изпитна тема:</span>
                  <span className="font-bold text-slate-900">{currentLesson.title}</span>
                </div>
              </div>

              {/* Detailed Points Table */}
              <div className="space-y-2 font-sans">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Резултати по изпитни модули (Максимум 100 точки):
                </h5>
                <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
                  <div className="grid grid-cols-12 bg-slate-100 font-bold p-2.5 border-b border-slate-300 text-slate-800">
                    <span className="col-span-6">Модул / Компонент</span>
                    <span className="col-span-3 text-center">Макс. точки</span>
                    <span className="col-span-3 text-right">Постигнат резултат</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 border-b border-slate-200">
                    <span className="col-span-6 font-medium">Модул 1: Тестова част (Избираем отговор)</span>
                    <span className="col-span-3 text-center tabular-nums">40 т.</span>
                    <span className="col-span-3 text-right tabular-nums font-bold">{module1Points} т.</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 border-b border-slate-200">
                    <span className="col-span-6 font-medium">Модул 2: Анализ на извор / Приложни задачи</span>
                    <span className="col-span-3 text-center tabular-nums">30 т.</span>
                    <span className="col-span-3 text-right tabular-nums font-bold">{module2Points} т.</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 border-b border-slate-200">
                    <span className="col-span-6 font-medium">Модул 3: Разширен аргументиран отговор / Есе</span>
                    <span className="col-span-3 text-center tabular-nums">30 т.</span>
                    <span className="col-span-3 text-right tabular-nums font-bold">{module3Points} т.</span>
                  </div>
                  <div className="grid grid-cols-12 p-3 bg-slate-50 font-bold text-sm">
                    <span className="col-span-6 uppercase">Общ резултат:</span>
                    <span className="col-span-3 text-center tabular-nums">100 т.</span>
                    <span className="col-span-3 text-right tabular-nums text-blue-700">{totalPoints} т.</span>
                  </div>
                </div>
              </div>

              {/* Official Grade Summary Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                    {examScale.scale ? `Ориентировъчна оценка по скалата за ${examScale.label}:` : 'Резултат (НВО се оценява само в точки):'}
                  </span>
                  <div className="text-xl font-bold text-slate-900 mt-0.5">
                    {gradeInfo.grade}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {gradeInfo.status}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded text-xs font-bold tabular-nums bg-white border border-slate-300">
                    {totalPoints} / 100 точки
                  </span>
                </div>
              </div>

              {/* Signature Lines */}
              <div className="grid grid-cols-2 gap-8 pt-6 font-sans text-xs text-slate-600 border-t border-slate-200">
                <div>
                  <span className="block mb-6">Подпис на изпитвания:</span>
                  <div className="border-b border-slate-400 w-44" />
                </div>
                <div className="text-right">
                  <span className="block mb-6">Печат на StudyBG и Изпитна комисия:</span>
                  <div className="border-b border-slate-400 w-44 ml-auto" />
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 print:hidden">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
              >
                Затвори
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Разпечатай протокола</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
