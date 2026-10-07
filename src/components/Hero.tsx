import React from 'react';
import { Camera, BookOpen, ArrowRight, CheckCircle2, ShieldCheck, GraduationCap, CheckSquare } from 'lucide-react';
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
  // Curate 4 high-yield featured lessons for quick testing instead of dumping all 17
  const featuredLessons = lessons.slice(0, 4);

  return (
    <section className="relative overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20 border-b border-slate-800/60 bg-gradient-to-b from-[#0d101d] via-[#0f1322] to-[#0c0e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Academic Standard Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Съобразено с учебните програми на МОН за 5.–12. клас</span>
          <span className="text-[11px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded font-semibold border border-emerald-500/20">
            НВО & ДЗИ
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          От записки в тетрадката — до{' '}
          <span className="text-sky-400 underline decoration-indigo-500/60 decoration-wavy decoration-2 underline-offset-8">
            отлична подготовка
          </span>{' '}
          за изпита.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Качи снимка на своите записки или избери тема от каталога. 
          StudyBG съпоставя написаното с официалните критерии на МОН, посочва какво липсва за 6.00 и генерира преговорни флаш карти и тестове.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onScanClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all border border-indigo-400/30"
          >
            <Camera className="w-5 h-5 text-indigo-100" />
            <span>Качи снимка на тетрадка / PDF</span>
          </button>

          <button
            onClick={() => onNavigateTab('summary')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-medium text-sm sm:text-base transition-all"
          >
            <span>Прегледай конспект: {currentLesson.title.split(':')[0]}</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Curated Demo Lesson Switcher */}
        <div className="mt-10 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 shadow-sm text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Бърз избор на примерен урок по МОН:</span>
            </span>
            <button
              onClick={onScrollToCatalog}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium inline-flex items-center gap-1 transition-colors"
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
                  className={`p-3 rounded-xl border transition-all text-left flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500/60 ring-1 ring-indigo-500/30'
                      : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70'
                  }`}
                >
                  <div className={`p-2 rounded-lg mt-0.5 flex-shrink-0 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-emerald-400 truncate">{lesson.subject}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/50 flex-shrink-0">
                        {lesson.grade}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-white truncate mt-0.5">{lesson.title}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* High-Trust Interactive Value Pillars */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
          <button
            onClick={() => onNavigateTab('audit')}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-850 border border-slate-800/80 hover:border-indigo-500/50 text-left transition-all group"
          >
            <CheckSquare className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform flex-shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                Одит на записките за 6.00
              </div>
              <div className="text-[11px] text-slate-400">Провери какво липсва в тетрадката ➔</div>
            </div>
          </button>

          <button
            onClick={onScrollToCatalog}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-850 border border-slate-800/80 hover:border-sky-500/50 text-left transition-all group"
          >
            <CheckCircle2 className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform flex-shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors">
                100% покритие на МОН
              </div>
              <div className="text-[11px] text-slate-400">Отвори целия учебен каталог ➔</div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('quiz')}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-850 border border-slate-800/80 hover:border-emerald-500/50 text-left transition-all group"
          >
            <GraduationCap className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform flex-shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors">
                Изпитен тест за контролно
              </div>
              <div className="text-[11px] text-slate-400">Реши тест с 10 въпроса веднага ➔</div>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
