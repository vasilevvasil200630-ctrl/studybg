import React from 'react';
import { Compass, Sparkles, Clock, HelpCircle, ArrowRight, GraduationCap } from 'lucide-react';

export type CultureSubTab = 'mysteries' | 'timeline' | 'trivia' | 'myths';

interface CultureHeroProps {
  activeCultureTab: CultureSubTab;
  onSelectCultureTab: (tab: CultureSubTab) => void;
  onSwitchToStudy: () => void;
}

export const CultureHero: React.FC<CultureHeroProps> = ({
  activeCultureTab,
  onSelectCultureTab,
  onSwitchToStudy
}) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-12 md:pt-14 md:pb-16 border-b border-slate-800/80 bg-gradient-to-b from-[#0f1424] via-[#0d111d] to-[#0a0c16]">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Culture Portal Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs sm:text-sm font-medium mb-5 shadow-sm">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Раздел „Обща култура & Загадки“</span>
          <span className="text-[11px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded font-semibold border border-amber-500/30">
            Факти • Мистерии • Митове
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.18]">
          Неразгадани тайни от{' '}
          <span className="text-amber-400 underline decoration-amber-500/40 decoration-wavy decoration-2 underline-offset-8">
            древността, историята
          </span>{' '}
          и природата.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Пространство за любопитство, критично мислене и факти. Изследвай недоизказаните страници от миналото, природните аномалии на България, провери знанията си в куиза за обща култура и развенчай популярните митове.
        </p>

        {/* High-Level Feature Modules Switcher */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
          <button
            onClick={() => onSelectCultureTab('mysteries')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCultureTab === 'mysteries'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-800/90 text-slate-200 hover:bg-slate-800 border border-slate-700/80 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Неразгадани случки</span>
          </button>

          <button
            onClick={() => onSelectCultureTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCultureTab === 'timeline'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-800/90 text-slate-200 hover:bg-slate-800 border border-slate-700/80 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Хронология (681–1908)</span>
          </button>

          <button
            onClick={() => onSelectCultureTab('trivia')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCultureTab === 'trivia'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-800/90 text-slate-200 hover:bg-slate-800 border border-slate-700/80 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Тест за обща култура (15 въпроса)</span>
          </button>

          <button
            onClick={() => onSelectCultureTab('myths')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCultureTab === 'myths'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-800/90 text-slate-200 hover:bg-slate-800 border border-slate-700/80 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-rose-400" />
            <span>Факт или Мит?</span>
          </button>
        </div>

        {/* Bridge to Academic Study Section */}
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={onSwitchToStudy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700/70 text-xs font-medium transition-all group"
          >
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Готвиш се за изпит по МОН или искаш да сканираш тетрадка?</span>
            <span className="text-indigo-400 font-semibold group-hover:text-indigo-300 flex items-center gap-1">
              Към Учебна академия <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Quick Cultural Stats Bar */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-lg font-bold text-amber-400">10+ Досиета</div>
            <div className="text-[11px] text-slate-400">Неразгадани години и загадки</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-lg font-bold text-emerald-400">1227 Години</div>
            <div className="text-[11px] text-slate-400">Хронология (681–1908 г.)</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-lg font-bold text-sky-400">15 Въпроса</div>
            <div className="text-[11px] text-slate-400">Интерактивен куиз с любопитни факти</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-lg font-bold text-rose-400">8 Мита</div>
            <div className="text-[11px] text-slate-400">Развенчаване с научни доказателства</div>
          </div>
        </div>

      </div>
    </section>
  );
};
