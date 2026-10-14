import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Building2,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Search,
  Layers,
  Sparkles,
  Code2,
  TrendingUp,
  Compass,
  Cpu,
  Stethoscope,
  Palette,
  Languages,
  Atom,
  Filter
} from 'lucide-react';
import type { LessonData } from '../types';
import {
  SCHOOL_SPECIALTIES_SECTIONS,
  GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX,
  type SchoolCategorySection
} from '../data/schoolsSpecialtiesDatabase';

interface SchoolsSpecialtiesHubProps {
  allLessons: LessonData[];
  onSelectLesson: (lesson: LessonData) => void;
  initialSchoolId?: string;
}

const SECTION_ICON_MAP: Record<string, React.ReactNode> = {
  'pmg-smg-npmg': <Atom className="w-5 h-5 text-indigo-400" />,
  'language-humanities-eg': <Languages className="w-5 h-5 text-violet-400" />,
  'tech-it-tues-pgknma': <Code2 className="w-5 h-5 text-emerald-400" />,
  'economics-banking-ntbg-nfsg': <TrendingUp className="w-5 h-5 text-amber-400" />,
  'architecture-construction-sgsag': <Compass className="w-5 h-5 text-cyan-400" />,
  'engineering-mechatronics-energy': <Cpu className="w-5 h-5 text-blue-400" />,
  'medicine-biotech-ecology-agro': <Stethoscope className="w-5 h-5 text-rose-400" />,
  'arts-design-tourism-culinary': <Palette className="w-5 h-5 text-fuchsia-400" />
};

export const SchoolsSpecialtiesHub: React.FC<SchoolsSpecialtiesHubProps> = ({
  allLessons,
  onSelectLesson,
  initialSchoolId
}) => {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(
    initialSchoolId || SCHOOL_SPECIALTIES_SECTIONS[0].id
  );
  const [activeGradeFilter, setActiveGradeFilter] = useState<string>('Всички (8.–12. клас)');
  const [activeSectionFilter, setActiveSectionFilter] = useState<string>('Всички раздели');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const selectedSchool: SchoolCategorySection = useMemo(() => {
    return (
      SCHOOL_SPECIALTIES_SECTIONS.find((s) => s.id === selectedSchoolId) ||
      SCHOOL_SPECIALTIES_SECTIONS[0]
    );
  }, [selectedSchoolId]);

  const lessonByIdMap = useMemo(() => {
    const map = new Map<string, LessonData>();
    for (const lesson of allLessons) {
      map.set(lesson.id, lesson);
    }
    return map;
  }, [allLessons]);

  const handleOpenLessonById = (lessonId: string) => {
    const found = lessonByIdMap.get(lessonId);
    if (found) {
      onSelectLesson(found);
    } else if (allLessons.length > 0) {
      onSelectLesson(allLessons[0]);
    }
  };

  const filteredGradeMatrix = useMemo(() => {
    return GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX.filter((g) => {
      if (activeGradeFilter === 'Всички (8.–12. клас)') return true;
      return g.grade === activeGradeFilter;
    }).map((gradeBlock) => {
      const filteredSubjects = gradeBlock.subjects.filter((subj) => {
        const matchesSection =
          activeSectionFilter === 'Всички раздели' ||
          subj.category.includes(activeSectionFilter);
        const q = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !q ||
          subj.subjectName.toLowerCase().includes(q) ||
          subj.keyTopics.toLowerCase().includes(q) ||
          subj.schoolTypes.toLowerCase().includes(q);
        return matchesSection && matchesQuery;
      });
      return {
        ...gradeBlock,
        subjects: filteredSubjects
      };
    }).filter((g) => g.subjects.length > 0);
  }, [activeGradeFilter, activeSectionFilter, searchQuery]);

  const linkedLessonsForSelectedSchool = useMemo(() => {
    return selectedSchool.linkedLessonIds
      .map((id) => lessonByIdMap.get(id))
      .filter((l): l is LessonData => Boolean(l));
  }, [selectedSchool, lessonByIdMap]);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Главна заглавна секция */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/90 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
              <Building2 className="w-4 h-4" />
              Национален академичен и професионален справочник • 8. – 12. клас
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Специални секции по училища, специалности и класове (8.–12. клас)
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Пълно покритие на учебните програми за <strong>всеки един предмет от 8., 9., 10., 11. и 12. клас</strong> във всички видове гимназии и техникуми в България — <strong>Общообразователна подготовка (Раздел А)</strong>, <strong>Профилирана подготовка за ДЗИ (Раздел Б)</strong> и <strong>Специална професионална подготовка за ДИППК / Трета СПК (Раздел В)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-3.5 text-center">
              <div className="text-2xl font-black text-indigo-400">8</div>
              <div className="text-[11px] text-slate-300 font-medium">Вида гимназии & техникуми</div>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-3.5 text-center">
              <div className="text-2xl font-black text-emerald-400">32+</div>
              <div className="text-[11px] text-slate-300 font-medium">Профила и специалности (СПК)</div>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-3.5 text-center">
              <div className="text-2xl font-black text-amber-400">8.–12.</div>
              <div className="text-[11px] text-slate-300 font-medium">Всички класове по години</div>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-3.5 text-center">
              <div className="text-2xl font-black text-rose-400">{allLessons.length}</div>
              <div className="text-[11px] text-slate-300 font-medium">Пълни уроци и тестове</div>
            </div>
          </div>
        </div>
      </div>

      {/* СЕКЦИЯ 1: Избор на вид училище и специалност (8 специални секции) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <GraduationCap className="w-6 h-6 text-indigo-400" />
              1. Изберете специална секция по вид гимназия и професионално направление
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Разгледайте официалните специалности, предметите от 8. до 12. клас, формулите и решавайте изпитни въпроси за ДЗИ и ДИППК.
            </p>
          </div>
        </div>

        {/* 8 Карти за избор на училище */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SCHOOL_SPECIALTIES_SECTIONS.map((school) => {
            const isSelected = school.id === selectedSchool.id;
            return (
              <button
                key={school.id}
                onClick={() => setSelectedSchoolId(school.id)}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-400 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-400/50'
                    : 'bg-slate-900/75 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-700/70">
                      {SECTION_ICON_MAP[school.id]}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {school.badgeText}
                    </span>
                  </div>
                  <div className="font-bold text-white text-sm sm:text-base leading-snug">
                    {school.shortName}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {school.subtitle}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-indigo-300 font-medium">
                    {school.specialties.length} специалности
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-300 font-semibold">
                    Отвори <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Детайлен панел за избраната специална секция */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-8 shadow-xl">
          {/* Заглавие и примерни училища */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                {SECTION_ICON_MAP[selectedSchool.id]}
                <span>Специална секция • {selectedSchool.badgeText}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedSchool.title}
              </h3>
              <p className="text-sm text-slate-300">
                {selectedSchool.subtitle}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                <Award className="w-4 h-4 shrink-0" />
                <span><strong>Изпитен формат за дипломиране:</strong> {selectedSchool.examFormat}</span>
              </div>
            </div>

            <div className="lg:w-80 shrink-0 rounded-2xl bg-slate-950/70 border border-slate-800/90 p-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Водещи гимназии в България:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedSchool.exampleSchools.map((ex, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Подсекция А: Специалности и Профили с кодове по МОН */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              Специалности, профили и специални предмети ({selectedSchool.shortName})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSchool.specialties.map((spec) => {
                const targetLesson = lessonByIdMap.get(spec.linkedLessonId);
                return (
                  <div
                    key={spec.code}
                    className="rounded-2xl bg-slate-950/70 border border-slate-800 p-5 flex flex-col justify-between gap-4 hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
                          Код МОН: {spec.code}
                        </span>
                        <span className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                          {spec.qualification}
                        </span>
                      </div>
                      <h5 className="text-base font-bold text-white">
                        {spec.name}
                      </h5>
                      <div className="space-y-1.5">
                        <div className="text-xs font-semibold text-slate-400">
                          Ключови специални и профилиращи предмети:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {spec.coreSubjects.map((subj, i) => (
                            <span
                              key={i}
                              className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200"
                            >
                              {subj}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-400 truncate">
                        Урок: <strong className="text-slate-200">{targetLesson?.title || 'Специализиран модул'}</strong>
                      </span>
                      <button
                        onClick={() => handleOpenLessonById(spec.linkedLessonId)}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Към урока
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Подсекция Б: Пълна учебна прогресия по класове (8. -> 9. -> 10. -> 11. -> 12. клас) */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              Учебен план по класове от 8. до 12. клас за {selectedSchool.shortName}
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              {selectedSchool.gradeProgression.map((gp) => (
                <div
                  key={gp.grade}
                  className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-extrabold text-sm">
                        {gp.grade}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white leading-snug">
                      {gp.focusTitle}
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Общообразователни (ООП):
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {gp.generalSubjects.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-slate-500">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                        Специални / Профилирани:
                      </div>
                      <ul className="space-y-1 text-xs text-emerald-200/90">
                        {gp.specializedSubjects.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">+</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800 text-[11px] text-amber-300/90">
                    <strong>Етап / Изпит:</strong> {gp.examMilestone}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Подсекция В: Ключови формули, закони и синтез за специалността + Директни уроци */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Златни формули, закони и правила за специалността
              </h4>
              <div className="space-y-2.5">
                {selectedSchool.keySynthesisRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 space-y-1.5"
                  >
                    <div className="text-xs font-bold text-indigo-300">
                      {rule.title}
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-slate-900 border border-indigo-500/30 font-mono text-xs sm:text-sm text-white font-semibold">
                      {rule.formulaOrRule}
                    </div>
                    <p className="text-xs text-slate-400">
                      {rule.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Интерактивен мини-тренажор за избраната специалност */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Интерактивен изпитен тренажор ({selectedSchool.shortName})
              </h4>
              <div className="space-y-4">
                {selectedSchool.specialtyQuiz.map((q) => {
                  const chosen = quizAnswers[q.id];
                  const isAnswered = chosen !== undefined;
                  const isCorrect = chosen === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {q.specialtyTag}
                        </span>
                        {isAnswered && (
                          <span
                            className={`text-xs font-bold inline-flex items-center gap-1 ${
                              isCorrect ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" /> Вярно!
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" /> Грешен отговор
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, optIdx) => {
                          let btnStyle =
                            'bg-slate-900 border-slate-800 text-slate-200 hover:border-indigo-500/50';
                          if (isAnswered) {
                            if (optIdx === q.correctAnswer) {
                              btnStyle =
                                'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-semibold';
                            } else if (optIdx === chosen) {
                              btnStyle =
                                'bg-rose-500/20 border-rose-500/60 text-rose-200';
                            } else {
                              btnStyle = 'bg-slate-900/50 border-slate-800/60 text-slate-500';
                            }
                          }
                          return (
                            <button
                              key={optIdx}
                              onClick={() =>
                                setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                              }
                              className={`text-left px-3.5 py-2 rounded-xl border text-xs transition-all ${btnStyle}`}
                            >
                              <span className="font-bold mr-2">
                                {['А)', 'Б)', 'В)', 'Г)'][optIdx]}
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 leading-relaxed">
                          <strong className="text-indigo-300">Обяснение: </strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Свързани пълни уроци за тази гимназия/специалност */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-sm font-bold text-white">
              Пълни интерактивни уроци, конспекти и тестове за {selectedSchool.shortName}:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {linkedLessonsForSelectedSchool.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className="text-left p-3.5 rounded-2xl bg-slate-950 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-indigo-400 truncate">
                      {lesson.subject} • {lesson.grade}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-indigo-200">
                      {lesson.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-300 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* СЕКЦИЯ 2: Пълна матрица на ВСИЧКИ предмети по класове (8., 9., 10., 11. и 12. клас) */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              2. Пълна матрица по класове: Всеки предмет от 8., 9., 10., 11. и 12. клас
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Раздел А (Задължителни общообразователни предмети ООП) + Раздел Б (Профилирани модули за матура ДЗИ) + Раздел В (Специални професионални предмети за ДИППК).
            </p>
          </div>

          {/* Търсачка */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търси предмет, специалност, тема..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Филтри по Клас и по Раздел (А / Б / В) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {[
              'Всички (8.–12. клас)',
              '8. клас',
              '9. клас',
              '10. клас',
              '11. клас',
              '12. клас'
            ].map((gradeTab) => (
              <button
                key={gradeTab}
                onClick={() => setActiveGradeFilter(gradeTab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeGradeFilter === gradeTab
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/60'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {gradeTab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            {[
              'Всички раздели',
              'Раздел А',
              'Раздел Б',
              'Раздел В'
            ].map((secTab) => (
              <button
                key={secTab}
                onClick={() => setActiveSectionFilter(secTab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSectionFilter === secTab
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {secTab === 'Раздел А'
                  ? 'Раздел А (ООП)'
                  : secTab === 'Раздел Б'
                  ? 'Раздел Б (Профили)'
                  : secTab === 'Раздел В'
                  ? 'Раздел В (Специалности ДИППК)'
                  : secTab}
              </button>
            ))}
          </div>
        </div>

        {/* Списък на класовете и предметите */}
        <div className="space-y-6">
          {filteredGradeMatrix.map((gradeBlock) => (
            <div
              key={gradeBlock.grade}
              className="rounded-2xl bg-slate-950/80 border border-slate-800/90 overflow-hidden"
            >
              <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-lg bg-indigo-500 text-white font-black text-xs sm:text-sm">
                      {gradeBlock.grade}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      {gradeBlock.headline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {gradeBlock.stageName} • <strong className="text-amber-300">{gradeBlock.nationalExamInfo}</strong>
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-800/70">
                {gradeBlock.subjects.map((subj, idx) => {
                  const isSectionC = subj.category.includes('Раздел В');
                  const isSectionB = subj.category.includes('Раздел Б');
                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 hover:bg-slate-900/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-2 max-w-4xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isSectionC
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : isSectionB
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                            }`}
                          >
                            {subj.category}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            🏫 {subj.schoolTypes}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                            ⏱ {subj.weeklyHoursNote}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {subj.subjectName}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong className="text-slate-400">Изучавани теми и модули: </strong>
                          {subj.keyTopics}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          onClick={() => handleOpenLessonById(subj.linkedLessonId)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm"
                        >
                          <BookOpen className="w-4 h-4" />
                          Отвори учебния модул
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
