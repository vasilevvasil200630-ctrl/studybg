import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  BookOpen,
  Layers,
  GraduationCap,
  Clock,
  CheckSquare,
  Zap,
  CheckCircle2,
  ChevronDown,
  Building2,
  LayoutGrid,
  ListTree,
  Award
} from 'lucide-react';
import type { LessonData, GradeLevel, SubjectName, QuizQuestion } from '../types';
import type { AppNavTab } from './Navbar';
import { GRADES_LIST, SUBJECTS_LIST } from '../data/curriculumDatabase';
import { MaturaPlusBridgeBanner } from './MaturaPlusBridgeBanner';
import { studyProgressService } from '../services/studyProgressService';
import { BULGARIAN_CURRICULUM_TREE } from '../data/bulgarianCurriculumTree';
import { SUBDOMAIN_LESSON_MAP } from '../services/curriculumClassifier';
import { buildTailoredSubDomainLesson } from '../services/infiniteQuizGenerator';
import {
  HIGH_SCHOOL_PROFILE_FILTERS,
  PREPARATION_SECTIONS,
  getLessonAcademicMetadata,
  inferLessonPreparationSection,
  matchesHighSchoolProfile,
  type HighSchoolProfileFilterId,
  type PreparationSectionId,
} from '../lib/curriculumStructure';

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
  { id: 'НВО (10. клас)', label: 'Първи гимназиален етап (8.–10. кл. ООП)' }
] as const;

const STAGE_ORDER: {
  id: 'stage-1' | 'stage-2' | 'stage-vocation' | 'junior';
  title: string;
  subtitle: string;
  badge: string;
}[] = [
  {
    id: 'stage-1',
    title: 'Първи гимназиален етап (8., 9. и 10. клас)',
    subtitle: 'Раздел А: Задължителна общообразователна подготовка (ООП) по всички учебни предмети на МОН',
    badge: 'I гимназиален етап (8.–10. кл.)',
  },
  {
    id: 'stage-2',
    title: 'Втори гимназиален етап (11. и 12. клас — ДЗИ / Матура)',
    subtitle: 'Раздел А (ООП) + Раздел Б: Профилирана подготовка по задължителни модули (Модул 1 – Модул 5)',
    badge: 'II гимназиален етап (11.–12. кл.)',
  },
  {
    id: 'stage-vocation',
    title: 'Професионално образование и Техникуми (8.–12. клас — Трета СПК)',
    subtitle: 'Раздел В: Отраслова и специфична професионална подготовка за Държавен изпит (ДИППК)',
    badge: 'Професионални гимназии (ДИППК)',
  },
  {
    id: 'junior',
    title: 'Прогимназиален етап (5.–7. клас • Мост с Matura+)',
    subtitle: 'Фундаментални теми за преговор и входно равнище в 8. клас',
    badge: 'Прогимназия (5.–7. кл.)',
  },
];

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
  const [selectedProfile, setSelectedProfile] = useState<HighSchoolProfileFilterId>('all');
  const [selectedPrepSection, setSelectedPrepSection] = useState<PreparationSectionId>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>('Всички предмети');
  const [selectedExamType, setSelectedExamType] = useState<string>('Всички изпити');
  const [masteryFilter, setMasteryFilter] = useState<'all' | 'unmastered' | 'mastered'>('all');
  const [viewMode, setViewMode] = useState<'structured' | 'cards'>('structured');
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
  const {
    lessonsById,
    firstLessonBySubject,
    examCounts,
    subjectCounts,
    prepSectionCounts,
    profileCounts,
    totalMasteredInCatalog,
  } = useMemo(() => {
    const byId = new Map<string, LessonData>();
    const firstBySubj = new Map<string, LessonData>();
    const exCounts = new Map<string, number>();
    const subjCounts = new Map<string, number>();
    const secCounts = new Map<PreparationSectionId, number>();
    const profCounts = new Map<HighSchoolProfileFilterId, number>();
    let masteredTotal = 0;

    for (const prof of HIGH_SCHOOL_PROFILE_FILTERS) {
      profCounts.set(prof.id, 0);
    }

    for (const l of lessons) {
      byId.set(l.id, l);
      if (!firstBySubj.has(l.subject)) {
        firstBySubj.set(l.subject, l);
      }
      if (l.examType) {
        exCounts.set(l.examType, (exCounts.get(l.examType) ?? 0) + 1);
      }
      subjCounts.set(l.subject, (subjCounts.get(l.subject) ?? 0) + 1);
      const sec = inferLessonPreparationSection(l);
      secCounts.set(sec, (secCounts.get(sec) ?? 0) + 1);

      for (const prof of HIGH_SCHOOL_PROFILE_FILTERS) {
        if (matchesHighSchoolProfile(l, prof.id)) {
          profCounts.set(prof.id, (profCounts.get(prof.id) ?? 0) + 1);
        }
      }

      if (masteredSet.has(l.id)) {
        masteredTotal++;
      }
    }

    return {
      lessonsById: byId,
      firstLessonBySubject: firstBySubj,
      examCounts: exCounts,
      subjectCounts: subjCounts,
      prepSectionCounts: secCounts,
      profileCounts: profCounts,
      totalMasteredInCatalog: masteredTotal,
    };
  }, [lessons, masteredSet]);

  const activeProfileDescriptor = useMemo(
    () => HIGH_SCHOOL_PROFILE_FILTERS.find((p) => p.id === selectedProfile) ?? HIGH_SCHOOL_PROFILE_FILTERS[0],
    [selectedProfile]
  );

  const isJuniorHigh =
    selectedGrade.includes('5.') ||
    selectedGrade.includes('6.') ||
    selectedGrade.includes('7.') ||
    selectedExamType === 'НВО (7. клас)';

  const filteredLessons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return lessons.filter((lesson) => {
      if (!matchesGradeFilter(lesson.grade, selectedGrade)) return false;
      if (!matchesHighSchoolProfile(lesson, selectedProfile)) return false;
      if (selectedPrepSection !== 'all' && inferLessonPreparationSection(lesson) !== selectedPrepSection) {
        return false;
      }
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
  }, [
    lessons,
    selectedGrade,
    selectedProfile,
    selectedPrepSection,
    selectedSubject,
    selectedExamType,
    masteryFilter,
    masteredSet,
    searchQuery,
  ]);

  // Hierarchical grouping for Structured View: Stage -> Subject -> Thematic Domain -> Lessons
  const structuredHierarchy = useMemo(() => {
    const stageMap = new Map<
      'stage-1' | 'stage-2' | 'stage-vocation' | 'junior',
      Map<string, Map<string, { lesson: LessonData; meta: ReturnType<typeof getLessonAcademicMetadata> }[]>>
    >();

    for (const st of STAGE_ORDER) {
      stageMap.set(st.id, new Map());
    }

    for (const lesson of filteredLessons) {
      const meta = getLessonAcademicMetadata(lesson);
      const subjMap = stageMap.get(meta.stageId) ?? stageMap.get('stage-1')!;
      if (!subjMap.has(lesson.subject)) {
        subjMap.set(lesson.subject, new Map());
      }
      const domainMap = subjMap.get(lesson.subject)!;
      if (!domainMap.has(meta.thematicDomain)) {
        domainMap.set(meta.thematicDomain, []);
      }
      domainMap.get(meta.thematicDomain)!.push({ lesson, meta });
    }

    return STAGE_ORDER.map((stageInfo) => {
      const subjMap = stageMap.get(stageInfo.id)!;
      const subjects = Array.from(subjMap.entries()).map(([subjectName, domainMap]) => {
        const domains = Array.from(domainMap.entries()).map(([domainName, items]) => ({
          domainName,
          items,
        }));
        const totalInSubject = domains.reduce((acc, d) => acc + d.items.length, 0);
        const masteredInSubject = domains.reduce(
          (acc, d) => acc + d.items.filter((x) => masteredSet.has(x.lesson.id)).length,
          0
        );
        return {
          subjectName,
          domains,
          totalInSubject,
          masteredInSubject,
        };
      });
      const totalInStage = subjects.reduce((acc, s) => acc + s.totalInSubject, 0);
      return {
        ...stageInfo,
        subjects,
        totalInStage,
      };
    }).filter((st) => st.totalInStage > 0);
  }, [filteredLessons, masteredSet]);

  // Reset pagination whenever filters change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_LESSONS);
  }, [selectedGrade, selectedProfile, selectedPrepSection, selectedSubject, selectedExamType, masteryFilter, searchQuery]);

  // Progressive infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || viewMode !== 'cards' || visibleCount >= filteredLessons.length) return;
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
  }, [viewMode, visibleCount, filteredLessons.length]);

  const visibleLessons = useMemo(
    () => filteredLessons.slice(0, visibleCount),
    [filteredLessons, visibleCount]
  );

  const filteredSubDomains = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return BULGARIAN_CURRICULUM_TREE.filter((tree) => {
      if (selectedSubject !== 'Всички предмети' && tree.subject !== selectedSubject) return false;
      if (
        selectedProfile !== 'all' &&
        activeProfileDescriptor.coreSubjects.length > 0 &&
        !activeProfileDescriptor.coreSubjects.includes(tree.subject)
      ) {
        return false;
      }
      return true;
    }).flatMap((tree) =>
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
  }, [selectedSubject, selectedProfile, activeProfileDescriptor, selectedGrade, searchQuery]);

  const quizSampleCount = useMemo(
    () => Math.min(12, filteredLessons.reduce((acc, l) => acc + l.quiz.length, 0)),
    [filteredLessons]
  );

  return (
    <div className="p-5 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Държавни образователни стандарти на МОН ({lessons.length} пълни разработки · Раздели А, Б и В)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Структуриран учебен план по Класове, Гимназии, Профили и Модули на МОН
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Избери своя тип гимназия/профил, гимназиален етап (8.–10. или 11.–12. клас), вид подготовка (ООП, Профилирани модули М1–М5 или ДИППК) и учебен предмет.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Търсене на тема, модул, автор, формула..."
            className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* 1. ГИМНАЗИЯ И ПРОФИЛ (High School & Profile Filter Row) */}
      <div className="mb-4 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>1. Избери тип гимназия и профилно направление:</span>
          </div>
          <span className="text-[11px] text-slate-500">
            Филтрира предметите и модулите според учебния план на профилираните и професионалните гимназии
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
          {HIGH_SCHOOL_PROFILE_FILTERS.map((prof) => {
            const isSelected = selectedProfile === prof.id;
            const count = profileCounts.get(prof.id) ?? 0;
            return (
              <button
                key={prof.id}
                type="button"
                onClick={() => {
                  setSelectedProfile(prof.id);
                  if (prof.id !== 'all' && selectedSubject !== 'Всички предмети' && !prof.coreSubjects.includes(selectedSubject)) {
                    setSelectedSubject('Всички предмети');
                  }
                }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-blue-50/60 border border-slate-200'
                }`}
              >
                <span>{prof.shortName}</span>
                <span
                  className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-blue-700 text-blue-100'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Profile Info Card when a specific High School profile is selected */}
        {selectedProfile !== 'all' && (
          <div className="p-3 rounded-xl bg-white border border-blue-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-blue-950 text-sm">{activeProfileDescriptor.name}</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold">
                  {activeProfileDescriptor.monProfileCode}
                </span>
              </div>
              <p className="text-slate-600">{activeProfileDescriptor.description}</p>
              <div className="text-[11px] text-slate-500">
                <strong className="text-slate-700">Водещи училища и паралелки:</strong> {activeProfileDescriptor.schoolsExample}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {activeProfileDescriptor.coreSubjects.map((subj) => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => setSelectedSubject(selectedSubject === subj ? 'Всички предмети' : subj)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                    selectedSubject === subj
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-blue-50/70 hover:bg-blue-100 text-blue-900 border-blue-200'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. ВИД ПОДГОТОВКА ПО МОН (Раздел А ООП / Раздел Б Профилирана М1-М5 / Раздел В ДИППК) */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-2">
          <Award className="w-3.5 h-3.5 text-slate-500" />
          <span>2. Раздел от учебния план на МОН (ООП / Профилирани модули М1–М5 / ДИППК):</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {PREPARATION_SECTIONS.map((sec) => {
            const isSelected = selectedPrepSection === sec.id;
            const count =
              sec.id === 'all' ? lessons.length : prepSectionCounts.get(sec.id) ?? 0;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setSelectedPrepSection(sec.id)}
                title={sec.description}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <span>{sec.label}</span>
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

      {/* 3. ОБРАЗОВАТЕЛЕН ЕТАП И КЛАС */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
          <span>3. Образователен етап и клас (I и II гимназиален етап):</span>
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

      {/* 4. ИЗПИТЕН ФОРМАТ НА МОН */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
          <span>4. Изпитен формат на МОН (ДЗИ / ДИППК / Гимназиален етап):</span>
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

      {/* 5. УЧЕБНА ДИСЦИПЛИНА + VIEW SWITCHER */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-600 mb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>5. Учебна дисциплина:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Switcher: Structured Syllabus vs Card Grid */}
            <div
              role="group"
              aria-label="Режим на показване на каталога"
              className="inline-flex items-center rounded-full bg-blue-50 p-0.5 border border-blue-200 text-[11px] font-bold"
            >
              <button
                type="button"
                onClick={() => setViewMode('structured')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'structured'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-blue-900 hover:text-blue-700'
                }`}
              >
                <ListTree className="w-3 h-3" />
                <span>По класове и раздели</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-blue-900 hover:text-blue-700'
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                <span>Карти ({filteredLessons.length})</span>
              </button>
            </div>

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
      {filteredSubDomains.length > 0 && (
        <details className="mb-8 group rounded-2xl bg-blue-50/40 border border-blue-200/80 p-4 sm:p-5">
          <summary className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer list-none select-none">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200 mb-1">
                <Layers className="w-3 h-3 text-blue-700" />
                <span>Еталонна матрица на МОН ({filteredSubDomains.length} тематични ядра за Отличен 6.00)</span>
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                Изисквания на проверяващите за оценка Отличен (6.00) и генератор на безкрайни тестове по подтеми
              </h4>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-xs font-bold text-blue-800 shrink-0">
              <span>Покажи / скрий матрицата</span>
              <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
            </span>
          </summary>

          <div className="mt-4 pt-4 border-t border-blue-200/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
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
        </details>
      )}

      {/* VIEW MODE 1: СТРУКТУРИРАН УЧЕБЕН ПЛАН (Етапи -> Предмети -> Модули/Раздели -> Номерирани Теми) */}
      {viewMode === 'structured' ? (
        <div className="space-y-8">
          {structuredHierarchy.map((stage) => (
            <section
              key={stage.id}
              aria-label={stage.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-600 text-white mb-1">
                    {stage.badge}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">{stage.title}</h4>
                  <p className="text-xs text-slate-600">{stage.subtitle}</p>
                </div>
                <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl shrink-0 self-start sm:self-center">
                  {stage.subjects.length} предмета · {stage.totalInStage} теми
                </span>
              </div>

              <div className="space-y-3">
                {stage.subjects.map((subjGroup, sIdx) => {
                  const pct =
                    subjGroup.totalInSubject > 0
                      ? Math.round((subjGroup.masteredInSubject / subjGroup.totalInSubject) * 100)
                      : 0;
                  return (
                    <details
                      key={subjGroup.subjectName}
                      open={sIdx === 0 || selectedSubject !== 'Всички предмети'}
                      className="group rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden"
                    >
                      <summary className="flex flex-wrap items-center justify-between gap-3 p-4 cursor-pointer list-none select-none hover:bg-slate-50/80 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                            {sIdx + 1}
                          </span>
                          <div className="min-w-0">
                            <h5 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                              {subjGroup.subjectName}
                            </h5>
                            <div className="text-xs text-slate-500">
                              {subjGroup.domains.length} тематични раздела · {subjGroup.totalInSubject} теми по МОН
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 ml-auto">
                          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
                            <span className="tabular-nums font-semibold">
                              Усвоени: {subjGroup.masteredInSubject}/{subjGroup.totalInSubject} ({pct}%)
                            </span>
                            <div className="w-20 h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                              <div
                                className="h-full bg-emerald-500 transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                          <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                        </div>
                      </summary>

                      <div className="border-t border-slate-100 bg-slate-50/40 p-4 space-y-5">
                        {subjGroup.domains.map((domain, dIdx) => (
                          <div key={domain.domainName} className="space-y-2.5">
                            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[11px]">
                                  Раздел {dIdx + 1}
                                </span>
                                <h6 className="text-xs sm:text-sm font-bold text-slate-800">
                                  {domain.domainName}
                                </h6>
                              </div>
                              <span className="text-[11px] font-semibold text-slate-500">
                                {domain.items.length} {domain.items.length === 1 ? 'тема' : 'теми'}
                              </span>
                            </div>

                            <ol className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
                              {domain.items.map(({ lesson, meta }, lIdx) => {
                                const isCurrent = lesson.id === currentLessonId;
                                const isMastered = masteredSet.has(lesson.id);
                                return (
                                  <li
                                    key={lesson.id}
                                    className={`p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 transition-colors ${
                                      isCurrent ? 'bg-blue-50/60' : 'hover:bg-slate-50/80'
                                    }`}
                                  >
                                    <div
                                      onClick={() => onSelectLesson(lesson, 'summary')}
                                      className="flex items-start gap-3 min-w-0 flex-1 cursor-pointer"
                                    >
                                      <span className="shrink-0 px-2 py-1 rounded-md bg-slate-100 text-slate-700 font-bold text-[11px] tabular-nums mt-0.5 border border-slate-200">
                                        Тема {dIdx + 1}.{lIdx + 1}
                                      </span>
                                      <div className="min-w-0 space-y-1 flex-1">
                                        <div className="flex flex-wrap items-center gap-1.5">
                                          <span className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors">
                                            {lesson.title}
                                          </span>
                                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                                            {meta.sectionShort}
                                          </span>
                                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                            {lesson.grade}
                                          </span>
                                          {lesson.examType && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                                              {lesson.examType}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                          {lesson.summary.overview}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-1.5 shrink-0 lg:pl-3">
                                      <button
                                        type="button"
                                        onClick={() => handleToggleMastered(lesson.id)}
                                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border transition-colors cursor-pointer ${
                                          isMastered
                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
                                        }`}
                                        title={isMastered ? 'Отбелязан като усвоен урок' : 'Отбележи като усвоен'}
                                      >
                                        <CheckCircle2 className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-600' : 'text-slate-400'}`} />
                                        <span>{isMastered ? 'Усвоен' : 'Отбележи'}</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => onSelectLesson(lesson, 'summary')}
                                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                                      >
                                        Разработка
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => onSelectLesson(lesson, 'flashcards')}
                                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                                      >
                                        Карти ({lesson.flashcards.length})
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => onSelectLesson(lesson, 'quiz')}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-2xs transition-colors cursor-pointer"
                                      >
                                        <CheckSquare className="w-3 h-3" />
                                        <span>Тест ({lesson.quiz.length})</span>
                                      </button>
                                    </div>
                                  </li>
                                );
                              })}
                            </ol>
                          </div>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* VIEW MODE 2: КАТАЛОГ С КАРТИ */
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {visibleLessons.map((lesson, idx) => {
              const isCurrent = lesson.id === currentLessonId;
              const isMastered = masteredSet.has(lesson.id);
              const meta = getLessonAcademicMetadata(lesson);
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
                    <div className="flex items-center justify-between gap-2 mb-1.5">
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
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${
                          isJuniorLesson
                            ? 'text-emerald-800 bg-emerald-100/70 border-emerald-200 font-semibold'
                            : 'text-slate-600 bg-slate-100 border-slate-200'
                        }`} title={lesson.audience}>
                          {lesson.grade}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1 mb-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                        {meta.sectionShort}
                      </span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 truncate max-w-[180px]">
                        {meta.thematicDomain}
                      </span>
                      {lesson.examType && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          {lesson.examType}
                        </span>
                      )}
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
                      <span>{lesson.notebookChecklist ? `${lesson.notebookChecklist.length} подтеми` : 'МОН'}</span>
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
        </>
      )}
    </div>
  );
};
