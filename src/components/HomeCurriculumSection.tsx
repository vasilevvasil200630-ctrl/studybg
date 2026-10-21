import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, BookMarked, Mic } from 'lucide-react';
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

  // Когато отложената секция с учебната база се рендерира на екрана, дозареждаме пълните 125 урока
  useEffect(() => {
    onRequestFullCurriculum?.();
  }, [onRequestFullCurriculum]);

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
        {/* 4. CURATED EXAM PATHWAYS: ALL 125 MON LESSONS WITH MULTI-ACTION LAUNCH */}
        {/* ========================================================================= */}
        <section id="curriculum" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Учебни конспекти, устно изпитване и тестове ({totalLessonsCount} урока)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Избери урок и стартирай директно конспект с личен бележник, гласово устно изпитване или изпитен тест.
                </p>
              </div>

              {/* Curriculum Track Switcher */}
              <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200/80 text-xs font-semibold">
                <button
                  onClick={() => {
                    setSelectedCurriculumTrack('dzi');
                    setShowAllInTrack(false);
                  }}
                  aria-pressed={selectedCurriculumTrack === 'dzi'}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    selectedCurriculumTrack === 'dzi'
                      ? 'bg-white text-brand-sapphire shadow-xs'
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
                  aria-pressed={selectedCurriculumTrack === 'nvo'}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    selectedCurriculumTrack === 'nvo'
                      ? 'bg-white text-brand-sapphire shadow-xs'
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
                  aria-pressed={selectedCurriculumTrack === 'nvo7'}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    selectedCurriculumTrack === 'nvo7'
                      ? 'bg-white text-brand-sapphire shadow-xs'
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
                  aria-pressed={selectedCurriculumTrack === 'stem'}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    selectedCurriculumTrack === 'stem'
                      ? 'bg-white text-brand-sapphire shadow-xs'
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
                  aria-pressed={selectedCurriculumTrack === 'dippk'}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    selectedCurriculumTrack === 'dippk'
                      ? 'bg-white text-brand-sapphire shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ИТ, Икономика & ДИППК ({dippkLessons.length})
                </button>
                <button
                  onClick={() => {
                    setSelectedCurriculumTrack('all');
                    setShowAllInTrack(true);
                  }}
                  aria-pressed={selectedCurriculumTrack === 'all'}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    selectedCurriculumTrack === 'all'
                      ? 'bg-white text-brand-sapphire shadow-xs'
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
                return (
                  <div
                    key={lesson.id}
                    onClick={() => onSelectLesson?.(lesson, 'summary')}
                    className={`p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-brand-sapphire">
                          {lesson.subject.split(' ')[0]}
                        </span>
                        <span className="text-[11px] text-slate-600 font-semibold tabular-nums px-1.5 py-0.5 rounded bg-slate-100">
                          {lesson.grade.split(' ')[0]} кл.
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-sapphire line-clamp-2 transition-colors">
                        {lesson.title}
                      </h3>

                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {lesson.summary.overview}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-1 text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLesson?.(lesson, 'summary');
                        }}
                        className="flex items-center gap-1 text-brand-sapphire hover:text-brand-sapphire-dark cursor-pointer"
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
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                        title="Устно изпитване по тази тема"
                      >
                        <Mic className="w-3 h-3 text-slate-500" aria-hidden="true" />
                        Устен
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLesson?.(lesson, 'quiz');
                        }}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold tabular-nums transition-colors cursor-pointer"
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
                  className="min-h-11 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
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
                className="min-h-11 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-sapphire hover:bg-brand-sapphire-light text-white text-sm font-bold shadow-sm transition cursor-pointer"
              >
                <BookMarked className="w-4 h-4 text-white" />
                <span>Пълен каталог — всички {totalLessonsCount} теми</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>
    </>
  );
};
