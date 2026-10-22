import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, GraduationCap, ChevronRight, Check, ExternalLink, CheckSquare, CheckCircle2 } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import { NativeDialog } from './NativeDialog';
import { studyProgressService } from '../services/studyProgressService';
import { TOTAL_CURRICULUM_LESSONS_COUNT } from '../data/curriculumDatabase';

type StageFilter = 'all' | 'dzi12' | 'nvo10' | 'gymnasium89' | 'junior57';

const STAGE_OPTIONS: { id: StageFilter; label: string; badge?: string }[] = [
  { id: 'all', label: 'Всички (5.–12. кл.)' },
  { id: 'dzi12', label: 'ДЗИ 12 (Матура)', badge: '11.–12. кл.' },
  { id: 'nvo10', label: 'НВО 10. клас', badge: '10. кл.' },
  { id: 'gymnasium89', label: '8.–9. клас', badge: 'Преговор' },
  { id: 'junior57', label: '5.–7. клас (НВО)', badge: '5.–7. кл.' },
];

interface QuickLessonSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessons: LessonData[];
  currentLessonId: string;
  onSelectLesson: (lesson: LessonData, targetTab?: AppNavTab) => void;
}

export const QuickLessonSwitcherModal: React.FC<QuickLessonSwitcherModalProps> = ({
  isOpen,
  onClose,
  lessons,
  currentLessonId,
  onSelectLesson
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<StageFilter>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('Всички');

  const subjects = useMemo(() => {
    const list = Array.from(new Set(lessons.map((l) => l.subject)));
    return ['Всички', ...list];
  }, [lessons]);

  const filteredLessons = useMemo(() => {
    return lessons.filter((l) => {
      const matchesSubject = selectedSubject === 'Всички' || l.subject === selectedSubject;
      
      let matchesStage = true;
      if (selectedStage === 'dzi12') {
        matchesStage = l.grade.includes('12') || l.grade.includes('11') || (Boolean(l.examType) && l.examType!.includes('ДЗИ'));
      } else if (selectedStage === 'nvo10') {
        matchesStage = l.grade.includes('10') || (Boolean(l.examType) && l.examType!.includes('10'));
      } else if (selectedStage === 'gymnasium89') {
        matchesStage = l.grade.includes('8') || l.grade.includes('9');
      } else if (selectedStage === 'junior57') {
        matchesStage = l.grade.includes('5.') || l.grade.includes('6.') || l.grade.includes('7.');
      }

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        l.title.toLowerCase().includes(query) ||
        l.subject.toLowerCase().includes(query) ||
        l.grade.toLowerCase().includes(query) ||
        l.summary.overview.toLowerCase().includes(query);
      return matchesSubject && matchesStage && matchesQuery;
    });
  }, [lessons, selectedSubject, selectedStage, searchQuery]);

  if (!isOpen) return null;

  const masteredSet = new Set(studyProgressService.getProgress().masteredLessonIds);
  const totalCount = Math.max(lessons.length, TOTAL_CURRICULUM_LESSONS_COUNT);

  return (
    <NativeDialog onClose={onClose} labelledBy="quick-lesson-switcher-title" widthClassName="max-w-2xl">
      <div className="w-full max-w-2xl max-h-[85vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 id="quick-lesson-switcher-title" className="text-base font-bold text-slate-900">Бърза смяна на урок</h3>
              <p className="text-xs text-slate-500">Пълен учебен каталог (5.–12. клас): НВО 7, НВО 10, ДЗИ 12 и ДИППК ({totalCount} теми)</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Затвори бързата смяна на урок"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Filters */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търси по заглавие, предмет (напр. 'квадратни', 'ботев', 'тютюн')..."
              className="w-full bg-white text-slate-900 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-blue-600 transition-all"
            />
          </div>

          {/* Exam Stage Filter Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-0.5">Етап:</span>
            {STAGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedStage(opt.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedStage === opt.id
                    ? 'bg-brand-sapphire text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{opt.label}</span>
                {opt.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-semibold ${
                    selectedStage === opt.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {opt.badge}
                  </span>
                )}
              </button>
            ))}

            {/* Matura+ Referral Pill */}
            <a
              href="https://maturaplus.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all shrink-0 shadow-2xs"
              title="Специализирана подготовка за 5.–7. клас в нашата академия Matura+"
            >
              <span>7. кл. (НВО) ↗ Matura+</span>
              <ExternalLink className="w-3 h-3 text-emerald-600" />
            </a>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-0.5">Предмет:</span>
            {subjects.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedSubject === subj
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 divide-y divide-slate-100">
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson) => {
              const isSelected = lesson.id === currentLessonId;
              const isMastered = masteredSet.has(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    onSelectLesson(lesson);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between gap-3 pt-3 ${
                    isSelected
                      ? 'bg-blue-50/70 border border-blue-400 ring-1 ring-blue-400/40'
                      : 'hover:bg-slate-50 border border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-semibold text-emerald-700">{lesson.subject}</span>
                      <span className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {lesson.grade}
                      </span>
                      {isMastered && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Усвоен</span>
                        </span>
                      )}
                      {lesson.examType && (
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-semibold">
                          {lesson.examType}
                        </span>
                      )}
                      {lesson.grade.includes('7') && (
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                          Matura+ фокус
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-slate-900 truncate">{lesson.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{lesson.summary.overview}</div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLesson(lesson, 'quiz');
                        onClose();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          onSelectLesson(lesson, 'quiz');
                          onClose();
                        }
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-lg shadow-2xs transition-colors"
                      title="Стартирай директно теста по този урок"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Тест ({lesson.quiz.length})</span>
                    </span>
                    {isSelected ? (
                      <div className="flex items-center gap-1 text-xs text-blue-700 font-bold bg-blue-100 px-2 py-1 rounded-lg border border-blue-200">
                        <Check className="w-3.5 h-3.5" />
                        <span>Активен</span>
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <GraduationCap className="w-8 h-8 mx-auto text-slate-400" />
              <div className="text-sm font-semibold text-slate-800">Няма открити уроци за това търсене</div>
              <div className="text-xs text-slate-500">Опитай с друга ключова дума или избери друг предмет.</div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
          Показват се {filteredLessons.length} от {lessons.length} урока по държавните стандарти на МОН
        </div>

      </div>
    </NativeDialog>
  );
};
