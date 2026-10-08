import React, { useState, useEffect } from 'react';
import { Flame, Award, Database } from 'lucide-react';
import { isSupabaseConfigured } from '../services/supabaseClient';

export const StudentStats: React.FC = () => {
  const [hasCloud, setHasCloud] = useState(false);

  useEffect(() => {
    setHasCloud(isSupabaseConfigured());
  }, []);

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1">
      {/* Daily Streak */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium whitespace-nowrap">
        <Flame className="w-3.5 h-3.5 text-amber-500" />
        <span>Дни: <strong className="text-slate-900 font-bold">3</strong></span>
      </div>

      {/* Target Grade */}
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium whitespace-nowrap">
        <Award className="w-3.5 h-3.5 text-emerald-600" />
        <span>Цел: <strong className="text-emerald-700 font-bold">Отличен 6.00</strong></span>
      </div>

      {/* Supabase Cloud Sync Badge */}
      {hasCloud && (
        <div
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium whitespace-nowrap"
          title="Свързана Supabase база данни за запазване на прогреса"
        >
          <Database className="w-3 h-3 text-blue-600" />
          <span className="font-semibold text-[11px]">Облак: Активен</span>
        </div>
      )}
    </div>
  );
};
