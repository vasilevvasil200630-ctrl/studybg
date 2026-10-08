import React, { useState, useEffect } from 'react';
import { Flame, Award, Database } from 'lucide-react';
import { isSupabaseConfigured } from '../services/supabaseClient';

export const StudentStats: React.FC = () => {
  const [hasCloud, setHasCloud] = useState(false);

  useEffect(() => {
    setHasCloud(isSupabaseConfigured());
  }, []);

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

      {/* Supabase Cloud Sync Badge */}
      {hasCloud && (
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium whitespace-nowrap"
          title="Свързана Supabase база данни за запазване на прогреса"
        >
          <Database className="w-3 h-3 text-emerald-400" />
          <span className="font-semibold text-[11px]">Облак: Свързан</span>
        </div>
      )}
    </div>
  );
};
