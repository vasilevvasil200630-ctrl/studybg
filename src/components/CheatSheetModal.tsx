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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-800 my-8">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Конспект за печат • МОН Стандарт
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Принтирай</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="space-y-4 print:text-black">
          {/* Header */}
          <div className="text-center pb-3 border-b border-slate-200">
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lesson.subject} • {lesson.grade}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {lesson.title}
            </h2>
          </div>

          {/* Quick Summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {lesson.summary.overview}
          </div>

          {/* Key Bullet Points */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Ключови акценти по темата:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {lesson.summary.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulas / Dates */}
          {lesson.summary.formulasOrDates && lesson.summary.formulasOrDates.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {lesson.summary.formulasOrDates.map((item, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="text-[10px] text-blue-700 font-semibold">{item.label}</div>
                  <div className="font-semibold text-slate-900 font-mono mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Golden Rule */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
            <Award className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-800 block mb-0.5">Критерий за оценка Отличен (6.00):</span>
              {lesson.summary.examGoldenRule}
            </div>
          </div>

          {/* Traps */}
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-rose-800 block mb-0.5">Типични грешки и изпитни капани:</span>
              {lesson.summary.commonTraps.join(' • ')}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>StudyBG Образователна платформа</span>
          <span>Държавни образователни стандарти на МОН</span>
        </div>

      </div>
    </div>
  );
};
