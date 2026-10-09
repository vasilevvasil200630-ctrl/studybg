import React from 'react';
import { Camera, BookOpen, ArrowRight, ShieldCheck, CheckSquare, GraduationCap } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';

interface HeroProps {
  onScanClick: () => void;
  onSelectSample: (lesson: LessonData) => void;
  lessons: LessonData[];
  currentLesson: LessonData;
  onNavigateTab: (tab: AppNavTab) => void;
  onScrollToCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScanClick,
  onSelectSample,
  lessons,
  currentLesson,
  onNavigateTab,
  onScrollToCatalog
}) => {
  // Curate 4 high-yield featured lessons for quick testing
  const featuredLessons = lessons.slice(0, 4);

  return (
    <section className="relative overflow-hidden pt-10 pb-12 md:pt-14 md:pb-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Academic Standard Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm font-medium mb-5 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Съобразено с държавните стандарти на МОН за 5.–12. клас</span>
          <span className="text-[11px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
            НВО & ДЗИ
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.2]">
          От записки в тетрадката — до{' '}
          <span className="text-blue-600">
            отлична подготовка
          </span>{' '}
          за изпита.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Качи снимка на своите записки или избери тема от каталога. 
          StudyBG съпоставя съдържанието с официалните критерии на МОН, посочва какво липсва за 6.00 и генерира преговорни флаш карти и тестове.
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onScanClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm sm:text-base shadow-xs transition-all"
          >
            <Camera className="w-5 h-5 text-white" />
            <span>Качи снимка на тетрадка / PDF</span>
          </button>

          <button
            onClick={() => onNavigateTab('summary')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-medium text-sm sm:text-base transition-all"
          >
            <span>Прегледай конспект: {currentLesson.title.split(':')[0]}</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Sleek Quick-Pills for Sample Lessons */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Популярни теми:</span>
            </span>
            {featuredLessons.map((lesson) => {
              const isSelected = lesson.id === currentLesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelectSample(lesson)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 font-medium'
                  }`}
                >
                  <span className="font-semibold text-emerald-700 opacity-90">{lesson.subject}:</span>
                  <span className="truncate max-w-[140px] sm:max-w-[190px]">{lesson.title.split(':')[0]}</span>
                  <span className="text-[10px] opacity-75 font-mono">({lesson.grade.split(' ')[0]})</span>
                </button>
              );
            })}
            <button
              onClick={onScrollToCatalog}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
            >
              <span>Всички {lessons.length} теми</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Core Value Pillars: Clean, Focused Trust Badges */}
        <div className="mt-7 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-600">
          <div className="inline-flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-amber-600" />
            <span className="font-medium text-slate-800">Одит по критериите на МОН за 6.00</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-800">Синтезирани конспекти & Тестове</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-slate-800">Разчитане на почерк & PDF (OCR)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
