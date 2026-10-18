import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, BookMarked } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';

interface HomeCurriculumSectionProps {
  lessons: LessonData[];
  totalLessonsCount: number;
  onNavigateTab: (tab: AppNavTab) => void;
  onSelectLesson?: (lesson: LessonData, targetTab?: AppNavTab) => void;
  onRequestFullCurriculum?: () => void;
}

// Изнесено от HomeLandingView — зарежда се отложено, когато секцията приближи екрана
export const HomeCurriculumSection: React.FC<HomeCurriculumSectionProps> = ({ lessons, totalLessonsCount, onNavigateTab, onSelectLesson, onRequestFullCurriculum }) => {
  const [selectedCurriculumTrack, setSelectedCurriculumTrack] = useState<'dzi' | 'nvo' | 'nvo7' | 'stem' | 'dippk' | 'all'>('dzi');
  const [showAllInTrack, setShowAllInTrack] = useState(false);

  // Смяна на пътеката или „Покажи всички“ → тогава вече трябват всички уроци
  useEffect(() => {
    if (selectedCurriculumTrack !== 'dzi' || showAllInTrack) onRequestFullCurriculum?.();
  }, [selectedCurriculumTrack, showAllInTrack, onRequestFullCurriculum]);

  // Curated DZI 12 High-Yield Lessons
  const dziLessons = lessons.filter(
    (l) => l.grade.includes('12') || l.grade.includes('11') || (l.examType && l.examType.includes('ДЗИ'))
  );

  // Curated NVO 10 Lessons
  const nvo10Lessons = lessons.filter((l) => l.grade.includes('10') || l.grade.includes('9') || l.grade.includes('8'));

  // Curated 5.–7. Grade & NVO 7 Lessons
  const juniorLessons = lessons.filter((l) => l.grade.includes('5.') || l.grade.includes('6.') || l.grade.includes('7.'));

  // STEM / Science Lessons
  const stemLessons = lessons.filter(
    (l) =>
      l.subject.includes('Математика') ||
      l.subject.includes('Биология') ||
      l.subject.includes('Химия') ||
      l.subject.includes('Физика')
  );

  // Vocational / DIPPK Lessons
  const dippkLessons = lessons.filter(
    (l) =>
      l.examType === 'ДИППК / Професионален изпит' ||
      l.subject.includes('Професионални') ||
      l.subject.includes('Икономика') ||
      l.subject.includes('Информатика')
  );

  const activeTrackList =
    selectedCurriculumTrack === 'dzi'
      ? dziLessons
      : selectedCurriculumTrack === 'nvo'
      ? nvo10Lessons
      : selectedCurriculumTrack === 'nvo7'
      ? juniorLessons
      : selectedCurriculumTrack === 'stem'
      ? stemLessons
      : selectedCurriculumTrack === 'dippk'
      ? dippkLessons
      : lessons;

  const displayedCurriculum = showAllInTrack ? activeTrackList : activeTrackList.slice(0, 12);

  return (
    <>
        {/* ========================================================================= */}
        {/* 4. CURATED EXAM PATHWAYS: ALL 120 MON LESSONS WITH MULTI-ACTION LAUNCH */}
        {/* ========================================================================= */}
        <section id="curriculum" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Пълна учебна база по предмети (5.–12. клас)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Учебни конспекти, устно изпитване и тестове ({totalLessonsCount} урока)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Избери урок и стартирай директно конспект с личен бележник, гласово устно изпитване или изпитен тест.
                </p>
              </div>

              {/* Curriculum Track Switcher */}
              <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => {
                    setSelectedCurriculumTrack('dzi');
                    setShowAllInTrack(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCurriculumTrack === 'dzi'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ДЗИ 11.–12. кл ({dziLessons.length})
                </button>
                <button
                  onClick={() => {
                    setSelectedCurriculumTrack('nvo');
                    setShowAllInTrack(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCurriculumTrack === 'nvo'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  8.–10. кл & НВО ({nvo10Lessons.length})
                </button>
                <button
                  onClick={() => {
                    setSelectedCurriculumTrack('nvo7');
                    setShowAllInTrack(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCurriculumTrack === 'nvo7'
                      ? 'bg-white text-emerald-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  5.–7. кл & НВО 7 ({juniorLessons.length})
                </button>
                <button
                  onClick={() => {
                    setSelectedCurriculumTrack('stem');
                    setShowAllInTrack(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCurriculumTrack === 'stem'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Математика & Природни ({stemLessons.length})
                </button>
                <button
                  onClick={() => {
                    setSelectedCurriculumTrack('dippk');
                    setShowAllInTrack(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCurriculumTrack === 'dippk'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ДИППК & Професии ({dippkLessons.length})
                </button>
                <button
                  onClick={() => {
                    setSelectedCurriculumTrack('all');
                    setShowAllInTrack(true);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCurriculumTrack === 'all'
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Всички предмети ({totalLessonsCount})
                </button>
              </div>
            </div>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayedCurriculum.map((lesson) => {
                const isHistory = lesson.subject.includes('История');
                const isBel = lesson.subject.includes('Български');
                const isMath = lesson.subject.includes('Математика');
                
                const accentColor = isHistory
                  ? 'text-amber-800 bg-amber-50 border-amber-200'
                  : isBel
                  ? 'text-blue-800 bg-blue-50 border-blue-200'
                  : isMath
                  ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                  : 'text-blue-800 bg-blue-50 border-blue-200';

                return (
                  <div
                    key={lesson.id}
                    onClick={() => onSelectLesson?.(lesson, 'summary')}
                    className="p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${accentColor}`}>
                          {lesson.subject.split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {lesson.grade.split(' ')[0]}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 transition-colors">
                        {lesson.title}
                      </h3>

                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {lesson.summary.overview}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between gap-1 text-[11px] font-semibold">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLesson?.(lesson, 'summary');
                        }}
                        className="flex items-center gap-1 text-blue-700 hover:text-blue-900 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Конспект</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLesson?.(lesson, 'oralexam');
                        }}
                        className="px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-colors cursor-pointer"
                        title="Устно изпитване по тази тема"
                      >
                        🎙️ Устен
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLesson?.(lesson, 'quiz');
                        }}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-200/80 hover:bg-slate-300/80 text-slate-800 hover:text-blue-900 font-bold transition-colors cursor-pointer"
                      >
                        Тест ({lesson.quiz.length})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full Catalog / Expand Buttons */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
              {activeTrackList.length > 12 && (
                <button
                  type="button"
                  onClick={() => setShowAllInTrack(!showAllInTrack)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>
                    {showAllInTrack
                      ? 'Свий списъка (покажи първите 12)'
                      : `Покажи всички ${activeTrackList.length} урока в тази категория`}
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onNavigateTab('catalog')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                <BookMarked className="w-4 h-4 text-blue-600" />
                <span>Отвори пълния каталог с всички {totalLessonsCount} теми по програмите на МОН за 8.–12. клас</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>
    </>
  );
};
