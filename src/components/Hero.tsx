import React from 'react';
import { Camera, BookOpen, ArrowRight, ShieldCheck, CheckSquare, GraduationCap, Compass, Clock, Scale } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import type { CultureSubTab } from './CultureHero';
import { MaturaPlusBridgeBanner } from './MaturaPlusBridgeBanner';

interface HeroProps {
  onScanClick: () => void;
  onSelectSample: (lesson: LessonData) => void;
  lessons: LessonData[];
  currentLesson: LessonData;
  onNavigateTab: (tab: AppNavTab) => void;
  onScrollToCatalog: () => void;
  onNavigateCultureTab?: (tab: CultureSubTab) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScanClick,
  onSelectSample,
  lessons,
  currentLesson,
  onNavigateTab,
  onScrollToCatalog,
  onNavigateCultureTab
}) => {
  // Focus on high-school curriculum (8.–12. grade: NVO 10 & DZI 12)
  const highSchoolLessons = lessons.filter(
    (l) => !l.grade.includes('7.') && !l.grade.includes('6.') && !l.grade.includes('5.')
  );
  const featuredLessons = highSchoolLessons.slice(0, 4);

  const handleStartDzi = () => {
    const dziLesson = highSchoolLessons.find(
      (l) => l.grade.includes('12') || l.grade.includes('11')
    ) || currentLesson;
    onSelectSample(dziLesson);
    onNavigateTab('simulator');
  };

  const handleStartNvo10 = () => {
    const nvo10Lesson = highSchoolLessons.find(
      (l) => l.grade.includes('10')
    ) || currentLesson;
    onSelectSample(nvo10Lesson);
    onNavigateTab('simulator');
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-12 md:pt-14 md:pb-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Academic Standard Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm font-medium mb-5 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Академичен стандарт на МОН за гимназиален етап (8.–12. клас)</span>
          <span className="text-[11px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            НВО 10 & ДЗИ 12
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.2]">
          Гимназията — без хаос.{' '}
          <span className="text-blue-600">
            Подготовка за НВО 10 и ДЗИ 12
          </span>{' '}
          по стандарта на МОН.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Специализирана учебна академия за ученици от 8. до 12. клас. 100-точкови симулатори на изпитите на МОН, 4-критерийна рубрика за есе, анализ на исторически извори и диагностика на липсващите знания за <strong>Отличен 6.00</strong>.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handleStartDzi}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-sm transition-all"
          >
            <GraduationCap className="w-5 h-5 text-white" />
            <span>Подготвям се за ДЗИ (12. клас)</span>
          </button>

          <button
            onClick={handleStartNvo10}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-sapphire hover:bg-brand-sapphire-light text-white font-semibold text-sm sm:text-base shadow-sm transition-all"
          >
            <Clock className="w-5 h-5 text-amber-400" />
            <span>Подготвям се за НВО (10. клас)</span>
          </button>

          <button
            onClick={onScanClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-medium text-sm sm:text-base transition-all"
          >
            <Camera className="w-4 h-4 text-slate-600" />
            <span>Сканирай записки / PDF</span>
          </button>
        </div>

        {/* Quick-Pills for High School Lessons */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Гимназиални теми:</span>
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
              <span>Всички теми за 8.–12. клас</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Core Value Pillars: Clean, Focused Trust Badges */}
        <div className="mt-7 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-600">
          <div className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="font-medium text-slate-800">100-точков симулатор на МОН (Модул 1, 2 и 3)</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-slate-800">Официална рубрика за оценка на есе & ЛИС</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-slate-800">Казуси & исторически извори за 6.00</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-slate-800">OCR за тетрадки и конспекти</span>
          </div>
        </div>

        {/* Matura+ Cross-Sell / Referral Banner for 5.–7. Grade */}
        <div className="mt-8 max-w-4xl mx-auto">
          <MaturaPlusBridgeBanner source="hero" />
        </div>

        {/* Context Engine Bridge: Primary Sources & Timeline for DZI Module 2/3 */}
        <div className="mt-6 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                  Исторически контекст & Първични извори (30т. на ДЗИ)
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  В помощ на Модул 2 и Модул 3
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                Хронология (681–1908), неразгадани исторически казуси & национално наследство
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Задълбочи историческия и литературния си анализ за матурата: писмени извори, исторически загадки и куиз за ерудиция.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
            <button
              onClick={() => onNavigateCultureTab?.('mysteries')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 active:bg-amber-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all whitespace-nowrap"
            >
              <span>Отвори историческите казуси</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
