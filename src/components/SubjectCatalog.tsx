import React, { useState } from 'react';
import { Search, BookOpen, ChevronRight, Layers, GraduationCap, Clock } from 'lucide-react';
import type { LessonData, GradeLevel, SubjectName } from '../types';
import { GRADES_LIST, SUBJECTS_LIST } from '../data/curriculumDatabase';

interface SubjectCatalogProps {
  lessons: LessonData[];
  currentLessonId: string;
  onSelectLesson: (lesson: LessonData) => void;
  onAddNewScan: () => void;
}

export const SubjectCatalog: React.FC<SubjectCatalogProps> = ({
  lessons,
  currentLessonId,
  onSelectLesson,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('Всички класове');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>('Всички предмети');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLessons = lessons.filter((lesson) => {
    const matchesGrade = selectedGrade === 'Всички класове' || lesson.grade.includes(selectedGrade.replace(' (НВО)', '').replace(' (ДЗИ / Матура)', ''));
    const matchesSubject = selectedSubject === 'Всички предмети' || lesson.subject === selectedSubject;
    const matchesQuery = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.summary.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSubject && matchesQuery;
  });

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Държавни образователни стандарти (МОН)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Учебен каталог по класове и дисциплини
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Изберете клас и предмет за достъп до структурирания конспект, изискванията за пълно отличие и тестовете.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Търсене на тема, автор, формула, събитие..."
            className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Grade Selector Row */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
          <span>Образователен етап и клас:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {GRADES_LIST.map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedGrade === grade
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Filter Row */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-2">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Учебна дисциплина:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {SUBJECTS_LIST.map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedSubject === subj
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredLessons.map((lesson) => {
          const isCurrent = lesson.id === currentLessonId;
          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
              className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between group ${
                isCurrent
                  ? 'bg-blue-50/70 border-blue-400 shadow-xs ring-1 ring-blue-400/40'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-emerald-700">
                    {lesson.subject}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {lesson.examType && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        {lesson.examType}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {lesson.grade}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 mb-1.5">
                  {lesson.title}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {lesson.summary.overview}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{lesson.notebookChecklist ? `${lesson.notebookChecklist.length} критерия` : 'Стандарт МОН'}</span>
                </span>
                <span className={`font-medium flex items-center gap-1 text-xs ${
                  isCurrent ? 'text-blue-700 font-semibold' : 'text-slate-500 group-hover:text-slate-800'
                }`}>
                  <span>{isCurrent ? 'Активен урок' : 'Преглед'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
