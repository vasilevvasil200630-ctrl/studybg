import React from 'react';
import { X, Printer, FileText, Award, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { LessonData } from '../types';

interface CheatSheetModalProps {
  lesson: LessonData;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ lesson, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 my-8">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Конспект за печат • МОН Стандарт
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Принтирай</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="space-y-4 print:text-black">
          {/* Header */}
          <div className="text-center pb-3 border-b border-slate-800">
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lesson.subject} • {lesson.grade}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
              {lesson.title}
            </h2>
          </div>

          {/* Quick Summary */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            {lesson.summary.overview}
          </div>

          {/* Key Bullet Points */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Ключови акценти по темата:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {lesson.summary.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulas / Dates */}
          {lesson.summary.formulasOrDates && lesson.summary.formulasOrDates.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {lesson.summary.formulasOrDates.map((item, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <div className="text-[10px] text-indigo-400 font-medium">{item.label}</div>
                  <div className="font-semibold text-slate-100 font-mono mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Golden Rule */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
            <Award className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-300 block mb-0.5">Критерий за оценка Отличен (6.00):</span>
              {lesson.summary.examGoldenRule}
            </div>
          </div>

          {/* Traps */}
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-rose-300 block mb-0.5">Типични грешки и изпитни капани:</span>
              {lesson.summary.commonTraps.join(' • ')}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>StudyBG Образователна платформа</span>
          <span>Държавни образователни стандарти на МОН</span>
        </div>

      </div>
    </div>
  );
};
