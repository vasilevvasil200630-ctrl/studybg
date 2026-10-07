import React from 'react';
import { Flame, Award, Zap } from 'lucide-react';

export const StudentStats: React.FC = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1">
      {/* Daily Streak */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold whitespace-nowrap">
        <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span>3 дни стрийк 🔥</span>
      </div>

      {/* Target Grade */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold whitespace-nowrap">
        <Award className="w-3.5 h-3.5 text-emerald-400" />
        <span>Цел: Отличен 6.00</span>
      </div>

      {/* Speed Badge */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold whitespace-nowrap">
        <Zap className="w-3.5 h-3.5 text-sky-400" />
        <span>5 мин спринт</span>
      </div>
    </div>
  );
};
