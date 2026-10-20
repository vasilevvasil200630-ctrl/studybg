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
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-blue-100/90 shadow-sm">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-600 mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Пълна учебна база по предмети (5.–12. клас)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Учебни конспекти, устно изпитване и тестове ({totalLessonsCount} урока)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Избери урок и стартирай директно конспект с личен бележник, гласово устно изпитване или изпитен тест.
                </p>
              </div>

              {/* Curriculum Track Switcher */}
              <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => {
                    setSelectedCurriculumTrack('dzi');
                    setShowAllInTrack(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCurriculumTrack === 'dzi'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs font-extrabold'
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
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs font-extrabold'
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
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xs font-extrabold'
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
                      ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-xs font-extrabold'
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
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xs font-extrabold'
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
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCurriculumTrack === 'all'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xs font-extrabold'
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
                const subj = lesson.subject;
                const isHistory = subj.includes('История');
                const isGeo = subj.includes('География');
                const isBel = subj.includes('Български') || subj.includes('Литература');
                const isMath = subj.includes('Математика');
                const isBioChem = subj.includes('Биология') || subj.includes('Химия');
                const isPhys = subj.includes('Физика');
                const isLang = subj.includes('Английски') || subj.includes('Чужди');
                const isVoc = subj.includes('Информатика') || subj.includes('Икономика') || subj.includes('Професионални');

                const accentColor = isHistory
                  ? 'text-amber-900 bg-amber-100 border-amber-300'
                  : isGeo
                  ? 'text-teal-900 bg-teal-100 border-teal-300'
                  : isBel
                  ? 'text-blue-900 bg-blue-100 border-blue-300'
                  : isMath
                  ? 'text-cyan-900 bg-cyan-100 border-cyan-300'
                  : isBioChem
                  ? 'text-emerald-900 bg-emerald-100 border-emerald-300'
                  : isPhys
                  ? 'text-violet-900 bg-violet-100 border-violet-300'
                  : isLang
                  ? 'text-sky-900 bg-sky-100 border-sky-300'
                  : isVoc
                  ? 'text-fuchsia-900 bg-fuchsia-100 border-fuchsia-300'
                  : 'text-indigo-900 bg-indigo-100 border-indigo-300';

                const cardBottomBorder = isHistory
                  ? 'border-b-amber-400 hover:border-amber-400'
                  : isGeo
                  ? 'border-b-teal-400 hover:border-teal-400'
                  : isBel
                  ? 'border-b-blue-400 hover:border-blue-400'
                  : isMath
                  ? 'border-b-cyan-400 hover:border-cyan-400'
                  : isBioChem
                  ? 'border-b-emerald-400 hover:border-emerald-400'
                  : isPhys
                  ? 'border-b-violet-400 hover:border-violet-400'
                  : isLang
                  ? 'border-b-sky-400 hover:border-sky-400'
                  : isVoc
                  ? 'border-b-fuchsia-400 hover:border-fuchsia-400'
                  : 'border-b-indigo-400 hover:border-indigo-400';

                return (
                  <div
                    key={lesson.id}
                    onClick={() => onSelectLesson?.(lesson, 'summary')}
                    className={`p-4 rounded-2xl bg-white border border-slate-200/90 border-b-4 ${cardBottomBorder} shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border uppercase tracking-wider ${accentColor}`}>
                          {lesson.subject.split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-slate-600 font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100">
                          {lesson.grade.split(' ')[0]} кл.
                        </span>
                      </div>

                      <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 line-clamp-2 transition-colors">
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
                        className="px-2 py-0.5 rounded-md bg-violet-50 hover:bg-violet-100 text-violet-800 border border-violet-200 transition-colors cursor-pointer"
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
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold transition-colors cursor-pointer"
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-extrabold transition-colors cursor-pointer"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-b-2 border-indigo-900 text-xs font-extrabold shadow-xs transition-all cursor-pointer"
              >
                <BookMarked className="w-4 h-4 text-white" />
                <span>Отвори пълния каталог с всички {totalLessonsCount} теми по програмите на МОН за 5.–12. клас</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>
    </>
  );
};
