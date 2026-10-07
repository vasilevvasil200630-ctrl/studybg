import React, { useState } from 'react';
import { Search, BookOpen, Camera, ChevronRight } from 'lucide-react';
import type { LessonData } from '../types';

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
  onAddNewScan
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('Всички');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const subjects = ['Всички', 'История и цивилизации', 'Български език и литература', 'Биология и ЗО', 'Химия и ООС', 'Математика'];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSubject = selectedSubject === 'Всички' || lesson.subject === selectedSubject;
    const matchesQuery = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.summary.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesQuery;
  });

  return (
    <div className="p-6 rounded-3xl bg-[#12162c] border border-white/10 shadow-xl mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Учебна библиотека StudyBG</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Избери урок или сканирай свой
          </h3>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Търси тема, автор, предмет..."
            className="w-full bg-[#181d38] text-white placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-white/10 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => setSelectedSubject(subj)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedSubject === subj
                ? 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => {
          const isCurrent = lesson.id === currentLessonId;
          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between group ${
                isCurrent
                  ? 'bg-indigo-950/70 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                  : 'bg-[#161a33]/60 border-white/5 hover:border-indigo-500/30 hover:bg-[#1a2040]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-emerald-400">
                    {lesson.subject}
                  </span>
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    {lesson.grade}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 mb-2">
                  {lesson.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {lesson.summary.overview}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  ⚡ 5 мин • 10 въпроса
                </span>
                <span className={`font-semibold flex items-center gap-1 ${
                  isCurrent ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white'
                }`}>
                  <span>{isCurrent ? 'Активен' : 'Отвори'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}

        {/* Add New Scan Card */}
        <div
          onClick={onAddNewScan}
          className="p-4 rounded-2xl border-2 border-dashed border-white/15 hover:border-indigo-400/60 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer transition-all flex flex-col items-center justify-center text-center group min-h-[140px]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600/30 to-sky-500/30 border border-indigo-500/30 flex items-center justify-center text-sky-400 mb-2 group-hover:scale-110 transition-transform">
            <Camera className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-white group-hover:text-sky-300">
            + Снимай нова тетрадка
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Качи снимка или конспект
          </div>
        </div>
      </div>
    </div>
  );
};
