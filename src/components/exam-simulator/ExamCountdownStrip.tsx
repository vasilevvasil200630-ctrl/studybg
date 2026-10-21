import React from 'react';
import { Calendar } from 'lucide-react';
import type { ExamSimulatorState } from './useExamSimulator';

export const ExamCountdownStrip: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const { examCountdowns } = sim;

  return (
    <>
      {/* Sleek Horizontal МОН Exam Countdown Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="font-bold text-slate-700">Официален изпитен календар на МОН:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold shadow-2xs">
            ДЗИ 12. кл: <strong className="font-mono text-xs">{examCountdowns.diffDzi}</strong> дни ({examCountdowns.dziYear} г.)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-teal-200 text-teal-900 font-semibold shadow-2xs">
            НВО 10. кл: <strong className="font-mono text-xs">{examCountdowns.diffNvo10}</strong> дни ({examCountdowns.nvo10Year} г.)
          </span>
          <a
            href="https://matura-plus.bg"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-medium inline-flex items-center gap-1 transition-all shadow-2xs"
            title="Специализирана академия за кандидатстване след 7. клас"
          >
            <span>7. кл. ({examCountdowns.diffNvo7} дни) ↗ Matura+</span>
          </a>
        </div>
      </div>

    </>
  );
};
