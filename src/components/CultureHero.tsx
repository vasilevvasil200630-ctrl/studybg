import React from 'react';
import { Compass, ArrowRight, GraduationCap, MapPin, Award, Sparkles, HelpCircle } from 'lucide-react';

export type CultureSubTab = 'mysteries' | 'heritage' | 'wonders' | 'trivia' | 'myths' | 'timeline' | 'cases' | 'wisdom';

interface CultureHeroProps {
  onSwitchToStudy: () => void;
  onSelectSubTab?: (tab: CultureSubTab) => void;
}

export const CultureHero: React.FC<CultureHeroProps> = ({
  onSwitchToStudy,
  onSelectSubTab
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-9 md:pt-10 md:pb-12 border-b border-slate-200 bg-gradient-to-b from-amber-500/5 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Culture Portal Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium mb-4 shadow-2xs">
          <Compass className="w-4 h-4 text-amber-600" />
          <span>Национална съкровищница: Обща култура & Загадки</span>
          <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
            Български гений • Тайни • Природа • Ерудиция
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Широкият кръгозор е истинската сила на ума.{' '}
          <span className="text-amber-600">
            Опознай съкровищата
          </span>{' '}
          на България и света.
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Пространство за любознателни умове: 14 исторически разследвания с академични източници, ЮНЕСКО паметници, български световни изобретения, природни чудеса и интерактивен куиз за ерудити.
        </p>

        {/* Quick Highlights Row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
          <button
            onClick={() => onSelectSubTab?.('mysteries')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold shadow-2xs transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>14 исторически загадки</span>
          </button>

          <button
            onClick={() => onSelectSubTab?.('heritage')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100/80 border border-orange-200 text-orange-900 text-xs font-semibold shadow-2xs transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-orange-600" />
            <span>10 ЮНЕСКО съкровища & изобретения</span>
          </button>

          <button
            onClick={() => onSelectSubTab?.('wonders')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-teal-900 text-xs font-semibold shadow-2xs transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>12 природни феномена</span>
          </button>

          <button
            onClick={() => onSelectSubTab?.('trivia')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200 text-sky-900 text-xs font-semibold shadow-2xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Куиз за ерудити (30 въпроса)</span>
          </button>

          <button
            onClick={() => onSelectSubTab?.('myths')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-semibold shadow-2xs transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>16 мита: Факт или лъжа?</span>
          </button>

          <button
            onClick={onSwitchToStudy}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold border border-blue-200 transition-colors shadow-2xs ml-1"
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Към Учебна академия</span>
            <ArrowRight className="w-3 h-3 text-blue-500" />
          </button>
        </div>

      </div>
    </section>
  );
};
