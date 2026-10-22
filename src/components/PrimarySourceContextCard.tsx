import React from 'react';
import { BookOpen, Scale, ArrowRight, Clock, ShieldCheck, Quote } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import { HISTORICAL_CASES_DATA, type HistoricalCaseStudy } from '../data/historicalCasesData';

interface PrimarySourceContextCardProps {
  lesson: LessonData;
  onNavigateTab: (tab: AppNavTab) => void;
  className?: string;
}

export const PrimarySourceContextCard: React.FC<PrimarySourceContextCardProps> = ({
  lesson,
  onNavigateTab,
  className = ''
}) => {
  // Find a matching case study based on lesson title or keywords
  const matchedCase: HistoricalCaseStudy | undefined = React.useMemo(() => {
    const lTitle = lesson.title.toLowerCase();

    if (lesson.id === 'history-april-uprising' || lTitle.includes('априлско') || lTitle.includes('1876')) {
      return undefined;
    }
    // 2. Direct match for Simeon / Golden Age
    if (lTitle.includes('симеон') || lTitle.includes('златен век') || lTitle.includes('преслав')) {
      return HISTORICAL_CASES_DATA.find(c => c.id === 'case-golden-age-cost');
    }
    // 3. Match for Asparukh / 681
    if (lTitle.includes('аспарух') || lTitle.includes('681') || lTitle.includes('създаване')) {
      return HISTORICAL_CASES_DATA.find(c => c.id === 'case-christianization');
    }
    // 4. Match for Debelyanov / Wars
    if (lTitle.includes('дебелянов') || lTitle.includes('войн') || lTitle.includes('да се завърнеш')) {
      return HISTORICAL_CASES_DATA.find(c => c.id === 'case-balkan-wars');
    }
    // 5. Match for Tyutyun / 20th Century morality
    if (lTitle.includes('тютюн') || lTitle.includes('димитър димов')) {
      return HISTORICAL_CASES_DATA.find(c => c.id === 'case-jewish-rescue');
    }
    // 6. Generic search by shortTitle
    return HISTORICAL_CASES_DATA.find(c =>
      lTitle.includes(c.shortTitle.toLowerCase().slice(0, 7)) ||
      c.title.toLowerCase().includes(lTitle.slice(0, 7))
    );
  }, [lesson]);

  if (lesson.id === 'history-april-uprising' || lesson.title.toLowerCase().includes('априлско')) {
    return null;
  }

  if (!matchedCase) {
    // If no specific case, return contextual bridge for literature/exact sciences
    const isHumanities = lesson.subject.includes('История') || lesson.subject.includes('Български') || lesson.subject.includes('Гражданско');
    if (!isHumanities) return null;

    return (
      <div className={`p-5 rounded-2xl bg-amber-50/60 border border-amber-200/90 shadow-2xs ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Модул 2 & 3 на ДЗИ (30 т.)
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Анализ на писмени извори и аргументативен текст
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              Искаш Отличен 6.00 на задачите със свободен отговор?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              На матурата 30 точки зависят от умението за работа с документи и формулиране на аналитична теза. Разгледай историческите казуси с първични извори.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('cases')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 active:bg-amber-800 text-white font-semibold text-xs transition-all shadow-xs"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Отвори казусите за ДЗИ</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const primarySource = matchedCase.primarySources[0];

  return (
    <div className={`p-5 sm:p-6 rounded-2xl bg-amber-50/40 border border-amber-200/80 shadow-xs relative overflow-hidden ${className}`}>
      {/* Background Accent */}

      {/* Top Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-700 text-white flex items-center justify-center shadow-2xs font-bold text-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
            Първични извори & Исторически казус за ДЗИ (30 т.)
          </span>
        </div>
        <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300/80">
          МОН Модул 2 & 3 • {matchedCase.epochLabel}
        </span>
      </div>

      {/* Case Dilemma & Title */}
      <div className="relative z-10 mb-4">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {matchedCase.title}
        </h4>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {matchedCase.historicalDilemma}
        </p>
      </div>

      {/* Primary Source Quote Box */}
      {primarySource && (
        <div className="p-3.5 rounded-xl bg-white/90 border border-amber-200/90 shadow-2xs my-3 text-xs text-slate-800 space-y-1.5 relative z-10">
          <div className="flex items-center justify-between gap-2 text-[11px] text-amber-900 font-semibold border-b border-amber-100 pb-1">
            <span className="flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-amber-600" />
              <span>Автентичен писмен извор: <strong>{primarySource.title}</strong></span>
            </span>
            <span className="text-slate-500 font-normal hidden sm:inline">
              {primarySource.authorOrOrigin}
            </span>
          </div>
          <p className="italic text-slate-700 font-serif leading-relaxed">
            {primarySource.originalExcerpt.length > 220
              ? `${primarySource.originalExcerpt.slice(0, 220)}...`
              : primarySource.originalExcerpt}
          </p>
          {primarySource.exactCitation && (
            <div className="text-[10px] text-slate-500 tabular-nums pt-0.5">
              Източник: {primarySource.exactCitation}
            </div>
          )}
        </div>
      )}

      {/* Why This Matters for 6.00 on the Exam */}
      <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-amber-100/50 p-2.5 rounded-xl border border-amber-200/70 mb-4">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-emerald-950 font-bold">Ключът за Отличен 6.00:</strong>{' '}
          На матурата по История и БЕЛ максималните точки на Модул 2 и 3 се дават не за голо наизустяване, а за аналитична съпоставка на документи и доказване на противоположни тези ({matchedCase.thesisSideA.perspectiveTitle.split(':')[0]} срещу {matchedCase.thesisSideB.perspectiveTitle.split(':')[0]}).
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 relative z-10">
        <button
          onClick={() => onNavigateTab('cases')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 active:bg-amber-800 text-white font-bold text-xs shadow-xs transition-all"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Разгледай пълния казус с двете тези</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onNavigateTab('simulator')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs shadow-2xs transition-colors"
        >
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Тренирай в 100т. симулатор на МОН</span>
        </button>
      </div>
    </div>
  );
};
