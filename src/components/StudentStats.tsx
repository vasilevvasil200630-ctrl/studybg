import React from 'react';
import { Flame, Award, Clock } from 'lucide-react';

export const StudentStats: React.FC = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
      {/* Daily Streak */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium whitespace-nowrap">
        <Flame className="w-3.5 h-3.5 text-amber-400" />
        <span>Последователни дни: <strong className="text-white font-mono">3</strong></span>
      </div>

      {/* Target Grade */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium whitespace-nowrap">
        <Award className="w-3.5 h-3.5 text-emerald-400" />
        <span>Цел: <strong className="text-emerald-400 font-mono">Отличен 6.00</strong></span>
      </div>

      {/* Speed Badge */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium whitespace-nowrap">
        <Clock className="w-3.5 h-3.5 text-indigo-400" />
        <span>МОН Стандарт</span>
      </div>
    </div>
  );
};
