import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, BookOpen, Layers, GraduationCap, Clock, CheckSquare, Zap, CheckCircle2, ChevronDown } from 'lucide-react';
import type { LessonData, GradeLevel, SubjectName, QuizQuestion } from '../types';
import type { AppNavTab } from './Navbar';
import { GRADES_LIST, SUBJECTS_LIST } from '../data/curriculumDatabase';
import { MaturaPlusBridgeBanner } from './MaturaPlusBridgeBanner';
import { studyProgressService } from '../services/studyProgressService';
import { BULGARIAN_CURRICULUM_TREE } from '../data/bulgarianCurriculumTree';
import { SUBDOMAIN_LESSON_MAP } from '../services/curriculumClassifier';
import { buildTailoredSubDomainLesson } from '../services/infiniteQuizGenerator';

interface SubjectCatalogProps {
  lessons: LessonData[];
  currentLessonId: string;
  onSelectLesson: (lesson: LessonData, targetTab?: AppNavTab) => void;
  onStartFilteredQuiz?: (questions: QuizQuestion[]) => void;
  onAddNewScan: () => void;
}

const INITIAL_VISIBLE_LESSONS = 48;
const LOAD_MORE_STEP = 60;

const EXAM_TYPES_LIST = [
  { id: 'Всички изпити', label: 'Всички изпитни формати' },
  { id: 'ДЗИ / Матура', label: 'ДЗИ / Матура (12. кл.)' },
  { id: 'ДИППК / Професионален изпит', label: 'ДИППК / Професионален изпит (III СПК)' },
  { id: 'НВО (10. клас)', label: '10. клас (Гимназиален етап)' }
] as const;

function matchesGradeFilter(lessonGrade: string, targetGrade: GradeLevel): boolean {
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
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_LESSONS);
  const [masteredIds, setMasteredIds] = useState<string[]>(
    () => studyProgressService.getProgress().masteredLessonIds
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMastered = (lessonId: string) => {
    const updated = studyProgressService.toggleMasteredLesson(lessonId);
    setMasteredIds(updated.masteredLessonIds);
  };

  // O(1) lookup set for mastered lessons
  const masteredSet = useMemo(() => new Set(masteredIds), [masteredIds]);

  // Precomputed maps & counts so keystrokes don't rescan 1,540 lessons 20 times
  const { lessonsById, firstLessonBySubject, examCounts, subjectCounts, totalMasteredInCatalog } = useMemo(() => {
    const byId = new Map<string, LessonData>();
    const firstBySubj = new Map<string, LessonData>();
    const exCounts = new Map<string, number>();
    const subjCounts = new Map<string, number>();
    let masteredTotal = 0;

    for (const l of lessons) {
      byId.set(l.id, l);
      if (!firstBySubj.has(l.subject)) {
        firstBySubj.set(l.subject, l);
      }
      if (l.examType) {
        exCounts.set(l.examType, (exCounts.get(l.examType) ?? 0) + 1);
      }
      subjCounts.set(l.subject, (subjCounts.get(l.subject) ?? 0) + 1);
      if (masteredSet.has(l.id)) {
        masteredTotal++;
      }
    }

    return {
      lessonsById: byId,
      firstLessonBySubject: firstBySubj,
      examCounts: exCounts,
      subjectCounts: subjCounts,
      totalMasteredInCatalog: masteredTotal,
    };
  }, [lessons, masteredSet]);

  const isJuniorHigh =
    selectedGrade.includes('5.') ||
    selectedGrade.includes('6.') ||
    selectedGrade.includes('7.') ||
    selectedExamType === 'НВО (7. клас)';

  const filteredLessons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return lessons.filter((lesson) => {
      if (!matchesGradeFilter(lesson.grade, selectedGrade)) return false;
      if (selectedSubject !== 'Всички предмети' && lesson.subject !== selectedSubject) return false;
      if (selectedExamType !== 'Всички изпити' && lesson.examType !== selectedExamType) return false;
      if (masteryFilter !== 'all') {
        const isMastered = masteredSet.has(lesson.id);
        if (masteryFilter === 'mastered' && !isMastered) return false;
        if (masteryFilter === 'unmastered' && isMastered) return false;
      }
      if (!q) return true;
      return (
        lesson.title.toLowerCase().includes(q) ||
        lesson.subject.toLowerCase().includes(q) ||
        lesson.summary.overview.toLowerCase().includes(q) ||
        lesson.summary.keyPoints.some((kp) => kp.toLowerCase().includes(q))
      );
    });
  }, [lessons, selectedGrade, selectedSubject, selectedExamType, masteryFilter, masteredSet, searchQuery]);

  // Reset pagination whenever filters change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_LESSONS);
  }, [selectedGrade, selectedSubject, selectedExamType, masteryFilter, searchQuery]);

  // Progressive infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || visibleCount >= filteredLessons.length) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(filteredLessons.length, prev + LOAD_MORE_STEP));
        }
      },
      { rootMargin: '320px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, filteredLessons.length]);

  const visibleLessons = useMemo(
    () => filteredLessons.slice(0, visibleCount),
    [filteredLessons, visibleCount]
  );

  const filteredSubDomains = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return BULGARIAN_CURRICULUM_TREE.filter(
      (tree) => selectedSubject === 'Всички предмети' || tree.subject === selectedSubject
    ).flatMap((tree) =>
      tree.grades
        .filter((g) => matchesGradeFilter(g.grade, selectedGrade))
        .flatMap((g) =>
          g.domains.flatMap((dom) =>
            dom.subDomains
              .filter((sub) => {
                if (!q) return true;
                return (
                  sub.name.toLowerCase().includes(q) ||
                  dom.name.toLowerCase().includes(q) ||
                  sub.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
                  sub.gradeRequirement6.some((req) => req.toLowerCase().includes(q))
                );
              })
              .map((sub) => ({ tree, g, dom, sub }))
          )
        )
    );
  }, [selectedSubject, selectedGrade, searchQuery]);

  const quizSampleCount = useMemo(
    () => Math.min(12, filteredLessons.reduce((acc, l) => acc + l.quiz.length, 0)),
    [filteredLessons]
  );

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
            Учебен и Професионален каталог (5.–12. клас): ДЗИ 12, ДИППК и Гимназиален етап
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
          {EXAM_TYPES_LIST.map((examItem) => {
            const count =
              examItem.id === 'Всички изпити'
                ? lessons.length
                : examCounts.get(examItem.id) ?? 0;
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
                  className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded ${
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
                Усвоени ✓ ({totalMasteredInCatalog})
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
                <span>Генерирай сборен тест ({quizSampleCount} въпроса)</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {SUBJECTS_LIST.map((subj) => {
            const subjCount =
              subj === 'Всички предмети'
                ? lessons.length
                : subjectCounts.get(subj) ?? 0;
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
                  className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded ${
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

      {/* Official MON Curriculum Tree (56 SubDomains with Study Material & Infinite Quiz) */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-blue-50/40 border border-blue-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-blue-200/60">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200 mb-1">
              <Layers className="w-3 h-3 text-blue-700" />
              <span>Официално дърво на учебната програма на МОН (56 тематични раздела • 5.–12. клас)</span>
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Раздели, задължителни изисквания за Отличен (6.00), учебен материал и тестове по всяка подтема
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
          {filteredSubDomains.map(({ tree, g, dom, sub }) => {
            const mappedId = SUBDOMAIN_LESSON_MAP[sub.id];
            const baseLesson =
              (mappedId ? lessonsById.get(mappedId) : undefined) ||
              firstLessonBySubject.get(tree.subject) ||
              lessons[0];

            return (
              <div
                key={sub.id}
                className="p-3.5 rounded-xl bg-white border border-blue-100 hover:border-blue-300 shadow-2xs flex flex-col justify-between gap-2.5 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1.5 text-[10px]">
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 truncate">
                      {tree.subject}
                    </span>
                    <span className="tabular-nums font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                      {g.grade}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 line-clamp-1">
                    {dom.name}
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {sub.name}
                  </h5>
                  <ul className="space-y-1 pt-1">
                    {sub.gradeRequirement6.slice(0, 2).map((req, rIdx) => (
                      <li key={rIdx} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-amber-900 bg-amber-50/70 border border-amber-200/70 rounded-lg px-2 py-1 leading-snug">
                    <span className="font-bold">Съвет по МОН: </span>
                    {sub.advice}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (!baseLesson) return;
                      const tailored = buildTailoredSubDomainLesson(
                        tree.subject,
                        g.grade,
                        dom.name,
                        sub,
                        baseLesson,
                        lessons
                      );
                      onSelectLesson(tailored, 'summary');
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3 text-blue-700" />
                    <span>Материал по МОН</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!baseLesson) return;
                      const tailored = buildTailoredSubDomainLesson(
                        tree.subject,
                        g.grade,
                        dom.name,
                        sub,
                        baseLesson,
                        lessons
                      );
                      onSelectLesson(tailored, 'quiz');
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors cursor-pointer shadow-2xs"
                  >
                    <CheckSquare className="w-3 h-3" />
                    <span>Тест по темата (∞)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {visibleLessons.map((lesson, idx) => {
          const isCurrent = lesson.id === currentLessonId;
          const isMastered = masteredSet.has(lesson.id);
          const isJuniorLesson =
            lesson.grade.includes('7.') ||
            lesson.grade.includes('6.') ||
            lesson.grade.includes('5.');
          // Apply content-visibility: auto only to off-screen cards below the initial fold
          const deferredClass = idx >= 6 ? 'cv-card' : '';

          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson, 'summary')}
              className={`${deferredClass} p-4 sm:p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between group ${
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

      {/* Progressive Pagination Controls */}
      {visibleCount < filteredLessons.length && (
        <div ref={loadMoreRef} className="mt-6 flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => Math.min(filteredLessons.length, prev + LOAD_MORE_STEP))}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <ChevronDown className="w-4 h-4" />
            <span>
              Покажи още {Math.min(LOAD_MORE_STEP, filteredLessons.length - visibleCount)} теми (показани {visibleCount} от {filteredLessons.length})
            </span>
          </button>
          <button
            type="button"
            onClick={() => setVisibleCount(filteredLessons.length)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Покажи всички ({filteredLessons.length})</span>
          </button>
        </div>
      )}
    </div>
  );
};
