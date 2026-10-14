import React from 'react';
import { Compass, ArrowRight, GraduationCap, Award, Sparkles, HelpCircle, Clock } from 'lucide-react';

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
        
        {/* Academic Context Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium mb-4 shadow-2xs">
          <Compass className="w-4 h-4 text-amber-600" />
          <span>Исторически контекст & Първични извори (30т. на ДЗИ)</span>
          <span className="text-[11px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
            Модул 2 & 3 на МОН
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Дълбочината на познанието носи{' '}
          <span className="text-amber-600">
            Отличен 6.00
          </span>{' '}
          на матурата.
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Зона за обща култура, конспиративни теории, секретни експедиции и древни мистерии: 29 разследвания (Царичина, Странджа-Бастет, подземни тунели, богомилски шифри, Тесла), 18 природни феномена, 16 световни открития и 24 развенчани мита.
        </p>

        {/* Quick Highlights Row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
          <button
            onClick={() => onSelectSubTab?.('mysteries')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold shadow-2xs transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>🕵️ 29 конспирации & загадки</span>
          </button>

          <button
            onClick={() => onSelectSubTab?.('timeline')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-semibold shadow-2xs transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Хронология (681–1908)</span>
          </button>

          <button
            onClick={() => onSelectSubTab?.('heritage')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100/80 border border-orange-200 text-orange-900 text-xs font-semibold shadow-2xs transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-orange-600" />
            <span>16 ЮНЕСКО обекта & световни патенти</span>
          </button>

          <button
            onClick={() => onSelectSubTab?.('trivia')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200 text-sky-900 text-xs font-semibold shadow-2xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Куиз за ерудити (42 въпроса)</span>
          </button>

          <button
            onClick={() => onSelectSubTab?.('myths')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-semibold shadow-2xs transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Факт или Конспирация (24 теми)</span>
          </button>

          <button
            onClick={onSwitchToStudy}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs ml-1"
          >
            <GraduationCap className="w-3.5 h-3.5 text-white" />
            <span>Към 100т. симулатор на МОН</span>
            <ArrowRight className="w-3 h-3 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
};
