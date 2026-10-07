import React from 'react';
import { X, Printer, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f1222] border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 my-8">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              StudyBG Пищов за 5 минути
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Принтирай</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="space-y-4 print:text-black">
          {/* Header */}
          <div className="text-center pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              {lesson.subject} • {lesson.grade}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {lesson.title}
            </h2>
          </div>

          {/* Quick Summary */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {lesson.summary.overview}
          </div>

          {/* Key Bullet Points */}
          <div>
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
              Ключови акценти за контролното:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {lesson.summary.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulas / Dates */}
          {lesson.summary.formulasOrDates && lesson.summary.formulasOrDates.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {lesson.summary.formulasOrDates.map((item, i) => (
                <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/5 text-xs">
                  <div className="text-[10px] text-sky-400 font-semibold">{item.label}</div>
                  <div className="font-bold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Golden Rule */}
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200">
            <span className="font-bold text-emerald-300 block mb-0.5">🏆 Златно правило за 6-ца:</span>
            {lesson.summary.examGoldenRule}
          </div>

          {/* Traps */}
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-200">
            <span className="font-bold text-rose-300 block mb-0.5">⚠️ Внимавай за капани:</span>
            {lesson.summary.commonTraps.join(' | ')}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span>Генерирано от StudyBG 🎯🇧🇬</span>
          <span>„Снимай тетрадката. Научи урока за 5 минути.“</span>
        </div>

      </div>
    </div>
  );
};
