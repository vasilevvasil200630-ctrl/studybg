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
    <section className="relative overflow-hidden pt-10 pb-12 md:pt-14 md:pb-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Culture Portal Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium mb-5 shadow-2xs">
          <Compass className="w-4 h-4 text-amber-600" />
          <span>Раздел „Обща култура & Загадки“</span>
          <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
            Факти • Мистерии • Митове
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.2]">
          Неразгадани тайни от{' '}
          <span className="text-amber-600">
            древността, историята
          </span>{' '}
          и природата.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Пространство за любопитство, критично мислене и факти. Изследвай недоизказаните страници от миналото, природните аномалии на България, провери знанията си в куиза за обща култура и развенчай популярните митове.
        </p>

        {/* High-Level Feature Modules Switcher */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
          <button
            onClick={() => onSelectCultureTab('mysteries')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCultureTab === 'mysteries'
                ? 'bg-amber-600 text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Неразгадани случки</span>
          </button>

          <button
            onClick={() => onSelectCultureTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCultureTab === 'timeline'
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Хронология (681–1908)</span>
          </button>

          <button
            onClick={() => onSelectCultureTab('trivia')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCultureTab === 'trivia'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Тест за обща култура (15 въпроса)</span>
          </button>

          <button
            onClick={() => onSelectCultureTab('myths')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCultureTab === 'myths'
                ? 'bg-rose-600 text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Факт или Мит?</span>
          </button>
        </div>

        {/* Bridge to Academic Study Section */}
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={onSwitchToStudy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors shadow-2xs"
          >
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Премини към Учебна академия (МОН одит & конспекти)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

      </div>
    </section>
  );
};
