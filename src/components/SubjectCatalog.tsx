import React, { useState } from 'react';
import { Search, BookOpen, Layers, GraduationCap, Clock, CheckSquare, Zap, CheckCircle2 } from 'lucide-react';
import type { LessonData, GradeLevel, SubjectName, QuizQuestion } from '../types';
import type { AppNavTab } from './Navbar';
import { GRADES_LIST, SUBJECTS_LIST } from '../data/curriculumDatabase';
import { MaturaPlusBridgeBanner } from './MaturaPlusBridgeBanner';
import { studyProgressService } from '../services/studyProgressService';

interface SubjectCatalogProps {
  lessons: LessonData[];
  currentLessonId: string;
  onSelectLesson: (lesson: LessonData, targetTab?: AppNavTab) => void;
  onStartFilteredQuiz?: (questions: QuizQuestion[]) => void;
  onAddNewScan: () => void;
}

export const SubjectCatalog: React.FC<SubjectCatalogProps> = ({
  lessons,
  currentLessonId,
  onSelectLesson,
  onStartFilteredQuiz,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('Всички класове');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>('Всички предмети');
  const [selectedExamType, setSelectedExamType] = useState<string>('Всички изпити');
  const [masteryFilter, setMasteryFilter] = useState<'all' | 'unmastered' | 'mastered'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [masteredIds, setMasteredIds] = useState<string[]>(
    () => studyProgressService.getProgress().masteredLessonIds
  );

  const handleToggleMastered = (lessonId: string) => {
    const updated = studyProgressService.toggleMasteredLesson(lessonId);
    setMasteredIds(updated.masteredLessonIds);
  };

  const examTypesList = [
    { id: 'Всички изпити', label: 'Всички изпитни формати' },
    { id: 'ДЗИ / Матура', label: '🎓 ДЗИ / Матура (12. кл.)' },
    { id: 'ДИППК / Професионален изпит', label: '🛠️ ДИППК / Професионален изпит (III СПК)' },
    { id: 'НВО (10. клас)', label: '📘 НВО (10. клас)' },
    { id: 'НВО (7. клас)', label: '🌱 НВО (7. клас)' }
  ];

  const isJuniorHigh =
    selectedGrade.includes('5.') ||
    selectedGrade.includes('6.') ||
    selectedGrade.includes('7.') ||
    selectedExamType === 'НВО (7. клас)';

  const matchesGradeFilter = (lessonGrade: string, targetGrade: GradeLevel): boolean => {
    if (targetGrade === 'Всички класове') return true;
    const numMatch = targetGrade.match(/(\d+)/);
    if (!numMatch) return true;
    const targetNum = Number(numMatch[1]);

    // Check range format like "8.–10. клас" or "10.–12. клас"
    const rangeMatch = lessonGrade.match(/(\d+)\.\s*[–-]\s*(\d+)\./);
    if (rangeMatch) {
      const startGrade = Number(rangeMatch[1]);
      const endGrade = Number(rangeMatch[2]);
      if (targetNum >= startGrade && targetNum <= endGrade) return true;
    }

    // Check direct grade number like "10. клас"
    const directRegex = new RegExp(`(^|\\D)${targetNum}\\.`);
    return directRegex.test(lessonGrade);
  };

  const filteredLessons = lessons.filter((lesson) => {
    const matchesGrade = matchesGradeFilter(lesson.grade, selectedGrade);
    const matchesSubject =
      selectedSubject === 'Всички предмети' || lesson.subject === selectedSubject;
    const matchesExam =
      selectedExamType === 'Всички изпити' || lesson.examType === selectedExamType;
    const isMastered = masteredIds.includes(lesson.id);
    const matchesMastery =
      masteryFilter === 'all' ||
      (masteryFilter === 'mastered' && isMastered) ||
      (masteryFilter === 'unmastered' && !isMastered);
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      lesson.title.toLowerCase().includes(q) ||
      lesson.subject.toLowerCase().includes(q) ||
      lesson.summary.overview.toLowerCase().includes(q) ||
      lesson.summary.keyPoints.some((kp) => kp.toLowerCase().includes(q));
    return matchesGrade && matchesSubject && matchesExam && matchesMastery && matchesQuery;
  });

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Държавни образователни стандарти на МОН ({lessons.length} пълни урока · 100% одит-критерии за 6.00)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Учебен и Професионален каталог (5.–12. клас): НВО 7, НВО 10, ДЗИ 12 и ДИППК
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Избери клас, предмет или изпитен формат за достъп до официалния конспект, изискванията за пълно отличие (6.00), флашкартите, тестовете и симулатора.
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
          {GRADES_LIST.map((grade) => {
            const isJunior = grade.includes('5.') || grade.includes('6.') || grade.includes('7.');
            const isSelected = selectedGrade === grade;
            return (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? isJunior
                      ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                      : 'bg-blue-600 text-white shadow-xs font-semibold'
                    : isJunior
                    ? 'bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/80 border border-emerald-200'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <span>{grade}</span>
                {isJunior && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase ${
                    isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-200 text-emerald-900'
                  }`}>
                    Matura+
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exam Type Filter Row */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
          <span>Изпитен формат на МОН (ДЗИ / ДИППК / НВО):</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {examTypesList.map((examItem) => {
            const count =
              examItem.id === 'Всички изпити'
                ? lessons.length
                : lessons.filter((l) => l.examType === examItem.id).length;
            const isSelected = selectedExamType === examItem.id;
            return (
              <button
                key={examItem.id}
                onClick={() => setSelectedExamType(examItem.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <span>{examItem.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-blue-700 text-blue-100'
                      : 'bg-white text-slate-600 border border-slate-200/80'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Filter Row */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-600 mb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Учебна дисциплина:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center rounded-full bg-slate-100 p-0.5 border border-slate-200 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setMasteryFilter('all')}
                className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  masteryFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Всички
              </button>
              <button
                type="button"
                onClick={() => setMasteryFilter('unmastered')}
                className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  masteryFilter === 'unmastered' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                За учене
              </button>
              <button
                type="button"
                onClick={() => setMasteryFilter('mastered')}
                className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  masteryFilter === 'mastered' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-emerald-800 hover:text-emerald-950'
                }`}
              >
                Усвоени ✓ ({lessons.filter((l) => masteredIds.includes(l.id)).length})
              </button>
            </div>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Показани: {filteredLessons.length} от {lessons.length} теми
            </span>
            {onStartFilteredQuiz && filteredLessons.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  const pool = filteredLessons.flatMap((l) => l.quiz);
                  const shuffled = [...pool];
                  for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                  }
                  const picked = shuffled.slice(0, Math.min(12, shuffled.length)).map((q, idx) => ({
                    ...q,
                    id: idx + 1,
                  }));
                  if (picked.length > 0) {
                    onStartFilteredQuiz(picked);
                  }
                }}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full shadow-2xs transition-colors cursor-pointer"
                title="Генерирай сборен тест от показаните в момента теми"
              >
                <Zap className="w-3 h-3" />
                <span>Генерирай сборен тест ({Math.min(12, filteredLessons.reduce((acc, l) => acc + l.quiz.length, 0))} въпроса)</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {SUBJECTS_LIST.map((subj) => {
            const subjCount =
              subj === 'Всички предмети'
                ? lessons.length
                : lessons.filter((l) => l.subject === subj).length;
            return (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  selectedSubject === subj
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <span>{subj}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    selectedSubject === subj
                      ? 'bg-blue-700 text-blue-100'
                      : 'bg-white text-slate-600 border border-slate-200/80'
                  }`}
                >
                  {subjCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Matura+ Direct Synergy Banner if Junior High (5.–7. grade) selected */}
      {isJuniorHigh && (
        <div className="mb-6">
          <MaturaPlusBridgeBanner compact={false} source="catalog-junior-filter" />
        </div>
      )}

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredLessons.map((lesson) => {
          const isCurrent = lesson.id === currentLessonId;
          const isMastered = masteredIds.includes(lesson.id);
          const isJuniorLesson =
            lesson.grade.includes('7.') ||
            lesson.grade.includes('6.') ||
            lesson.grade.includes('5.');

          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson, 'summary')}
              className={`cv-card p-4 sm:p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between group ${
                isCurrent
                  ? 'bg-blue-50/70 border-blue-400 shadow-xs ring-1 ring-blue-400/40'
                  : isJuniorLesson
                  ? 'bg-emerald-50/30 border-emerald-200/80 hover:border-emerald-300 hover:bg-emerald-50/50 shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-semibold ${isJuniorLesson ? 'text-emerald-800' : 'text-emerald-700'}`}>
                    {lesson.subject}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMastered(lesson.id);
                      }}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                        isMastered
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
                      }`}
                      title={isMastered ? 'Отбелязан като усвоен урок (клик за промяна)' : 'Отбележи урока като усвоен'}
                    >
                      <CheckCircle2 className={`w-3 h-3 ${isMastered ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span>{isMastered ? 'Усвоен' : 'Отбележи'}</span>
                    </button>
                    {lesson.examType && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        {lesson.examType}
                      </span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${
                      isJuniorLesson
                        ? 'text-emerald-800 bg-emerald-100/70 border-emerald-200 font-semibold'
                        : 'text-slate-600 bg-slate-100 border-slate-200'
                    }`} title={lesson.audience}>
                      {lesson.grade}
                      {lesson.audience && <span className="opacity-75"> • {lesson.audience}</span>}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug mb-1.5">
                  {lesson.title}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {lesson.summary.overview}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5 text-xs">
                <span className="text-slate-500 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{lesson.notebookChecklist ? `${lesson.notebookChecklist.length} крит.` : 'МОН'}</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesson(lesson, 'summary');
                    }}
                    className="px-2 py-1 rounded-md text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    Конспект
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesson(lesson, 'flashcards');
                    }}
                    className="px-2 py-1 rounded-md text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    Карти ({lesson.flashcards.length})
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesson(lesson, 'quiz');
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-2xs transition-colors cursor-pointer"
                  >
                    <CheckSquare className="w-3 h-3" />
                    <span>Тест ({lesson.quiz.length})</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
