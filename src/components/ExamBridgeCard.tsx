import React from 'react';
import { Clock, BookOpen, Trophy, CheckCircle2, Sparkles, GraduationCap } from 'lucide-react';
import type { LessonData } from '../types';

export interface ExamBridgeCardProps {
  lesson: LessonData;
  onLaunchSimulator: () => void;
  onOpenSummary?: () => void;
  contextTag?: string;
  sourceContextTitle?: string;
  className?: string;
  variant?: 'card' | 'compact';
}

export const ExamBridgeCard: React.FC<ExamBridgeCardProps> = ({
  lesson,
  onLaunchSimulator,
  onOpenSummary,
  contextTag = '🎓 МОН ИЗПИТЕН МОСТ',
  className = '',
  variant = 'card'
}) => {
  if (variant === 'compact') {
    return (
      <div className={`p-4 rounded-xl bg-gradient-to-r from-amber-50 via-white to-blue-50 border border-amber-300/80 shadow-2xs ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <GraduationCap className="w-3 h-3 text-amber-700" />
            <span>{contextTag}</span>
          </span>
          <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
            {lesson.grade} • {lesson.subject}
          </span>
        </div>

        <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
          Готвиш се за изпит по тази тема?
        </h4>
        <p className="text-xs text-slate-600 mb-3 line-clamp-2">
          Урок: „{lesson.title}“. Провери знанията си в реални изпитни условия с официалните критерии на МОН.
        </p>

        <button
          onClick={onLaunchSimulator}
          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-blue-700 hover:from-amber-700 hover:to-blue-800 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all active:scale-[0.99]"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>👉 Тествай знанията си в 100-точковия симулатор на МОН</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50/90 via-white to-blue-50/70 border-2 border-amber-300/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all ${className}`}>
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-amber-400/10 to-blue-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Tag & Grade strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100/90 text-amber-950 border border-amber-300 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{contextTag}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white text-slate-700 border border-slate-200">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>{lesson.grade}</span>
          </span>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
          {lesson.examType || 'ДЗИ / НВО'} • {lesson.subject}
        </span>
      </div>

      {/* Main Callout Title */}
      <div className="space-y-1.5 mb-4 relative z-10">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>Готвиш се за изпит по тази тема?</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Тази тема е фундаментална за държавните изпити. Официалният конспект <strong>„{lesson.title}“</strong> е напълно интегриран в 100-точковия симулатор на МОН с реална скала за оценка 6.00:
        </p>
      </div>

      {/* 3 Modules Micro-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-5 relative z-10">
        <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">Модул 1</span>
          <span className="text-xs font-semibold text-slate-800">Тест с въпроси</span>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">40 точки</div>
        </div>

        <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block">Модул 2</span>
          <span className="text-xs font-semibold text-slate-800">Анализ на извор</span>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">30 точки</div>
        </div>

        <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">Модул 3</span>
          <span className="text-xs font-semibold text-slate-800">Проблемно есе</span>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">30 точки (Рубрика)</div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 relative z-10">
        {/* Primary User-Requested CTA Button */}
        <button
          onClick={onLaunchSimulator}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-blue-700 hover:from-amber-700 hover:to-blue-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-[0.99] group cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
          <span>👉 Готвиш се за изпит по тази тема? Тествай знанията си в 100-точковия симулатор на МОН</span>
        </button>

        {/* Secondary Conspectus / Audit Button */}
        {onOpenSummary && (
          <button
            onClick={onOpenSummary}
            className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Конспект & Одит 6.00</span>
          </button>
        )}
      </div>

      {/* Trust pill */}
      <div className="mt-3 pt-2.5 border-t border-amber-200/50 flex items-center justify-between text-[11px] text-slate-600">
        <span className="inline-flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Стандартизирано по формата на МОН (Оценка 2.00 – 6.00)</span>
        </span>
        <span className="hidden sm:inline text-slate-500 font-medium">
          Реално изпитно време: 60 минути
        </span>
      </div>
    </div>
  );
};
