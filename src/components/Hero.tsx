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

        {/* Curated Demo Lesson Switcher */}
        <div className="mt-9 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Примерен урок по учебната програма:</span>
            </span>
            <button
              onClick={onScrollToCatalog}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <span>Виж всички {lessons.length} урока в каталога</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {featuredLessons.map((lesson) => {
              const isSelected = lesson.id === currentLesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelectSample(lesson)}
                  className={`p-3 rounded-xl border transition-all text-left flex items-start gap-3 bg-white ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-100 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                  }`}
                >
                  <div className={`p-2 rounded-lg mt-0.5 flex-shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-emerald-700 truncate">{lesson.subject}</span>
                      <span className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 flex-shrink-0">
                        {lesson.grade}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 truncate mt-0.5">{lesson.title}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* High-Trust Value Pillars */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
          <button
            onClick={() => onNavigateTab('audit')}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-left transition-all shadow-2xs group"
          >
            <CheckSquare className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Одит на записките за 6.00
              </div>
              <div className="text-[11px] text-slate-500">Провери какво липсва в тетрадката ➔</div>
            </div>
          </button>

          <button
            onClick={onScrollToCatalog}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-left transition-all shadow-2xs group"
          >
            <GraduationCap className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                База с официални конспекти
              </div>
              <div className="text-[11px] text-slate-500">Синтезирана теория за бърз преговор ➔</div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('quiz')}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-left transition-all shadow-2xs group"
          >
            <Camera className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Тестове & Флаш карти
              </div>
              <div className="text-[11px] text-slate-500">Интервално повторение и самопроверка ➔</div>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
