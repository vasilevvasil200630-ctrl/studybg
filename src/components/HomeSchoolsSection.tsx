import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, BookOpen, ArrowRight } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import type { SchoolCategorySection, GradeCurriculumMatrix } from '../data/schoolsSpecialtiesDatabase';

interface HomeSchoolsSectionProps {
  lessons: LessonData[];
  onNavigateTab: (tab: AppNavTab) => void;
  onSelectLesson?: (lesson: LessonData, targetTab?: AppNavTab) => void;
}

// Изнесено от HomeLandingView — зарежда се отложено, когато секцията приближи екрана
export const HomeSchoolsSection: React.FC<HomeSchoolsSectionProps> = ({ lessons, onNavigateTab, onSelectLesson }) => {
  const [schoolSections, setSchoolSections] = useState<SchoolCategorySection[]>([]);
  const [gradeMatrices, setGradeMatrices] = useState<GradeCurriculumMatrix[]>([]);
  const [activeHomeSchoolId, setActiveHomeSchoolId] = useState<string>('pmg-smg-npmg');
  const [activeHomeGrade, setActiveHomeGrade] = useState<'8. клас' | '9. клас' | '10. клас' | '11. клас' | '12. клас'>('8. клас');
  const schoolsSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let active = true;
    let loaded = false;

    const loadSchoolsData = () => {
      if (loaded) return;
      loaded = true;
      import('../data/schoolsSpecialtiesDatabase').then((mod) => {
        if (!active) return;
        setSchoolSections(mod.SCHOOL_SPECIALTIES_SECTIONS);
        setGradeMatrices(mod.GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX);
        if (mod.SCHOOL_SPECIALTIES_SECTIONS.length > 0) {
          setActiveHomeSchoolId((prev) => prev || mod.SCHOOL_SPECIALTIES_SECTIONS[0].id);
        }
      });
    };

    const el = schoolsSectionRef.current;
    if (el && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            loadSchoolsData();
            observer.disconnect();
          }
        },
        { rootMargin: '450px' }
      );
      observer.observe(el);
      return () => {
        active = false;
        observer.disconnect();
      };
    } else {
      loadSchoolsData();
      return () => {
        active = false;
      };
    }
  }, []);

  return (
    <>
        {/* ========================================================================= */}
        {/* 2.5 SPECIAL SECTIONS: ALL HIGH SCHOOLS, SPECIALTIES & GRADES 8-12 MATRIX */}
        {/* ========================================================================= */}
        <section ref={schoolsSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
          <div className="rounded-3xl bg-white border-2 border-blue-200/90 shadow-sm p-5 sm:p-8 space-y-7">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="space-y-1.5 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>{schoolSections.length || 16} Специални секции • 64+ професии и специалности (8.–12. клас)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Всеки предмет от всеки клас (8.–12.) за всяко училище и специалност
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Избери своето училище (ПМГ/СМГ, ЕГ, ТУЕС/ИТ и AI, НТБГ/НФСГ, СГСАГ/Геодезия, ПГМЕ/CNC и Роботика, Медицина/Фармация, Дизайн/UI-UX/3D, ВМГ/Авиация, ПГХВТ/Винарство, Спортни и Музикални училища, НГДЕК, НПГПТО/ПГЯЕ, НПГПФ/Кино и Иконопис, МВР/Криминалистика, Балнеология/СПА) или клас (8.–12. клас), за да отвориш <strong>Общообразователните (Раздел А)</strong>, <strong>Профилираните (Раздел Б за ДЗИ)</strong> и <strong>Специалните професионални предмети (Раздел В за ДИППК — Трета СПК)</strong>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('specialties')}
                className="self-start lg:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all cursor-pointer shrink-0"
              >
                <span>Отвори пълния справочник & калкулатор ДИППК</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Part A: 16 School & Vocational Specialty Tabs */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {schoolSections.map((school) => {
                  const isSelected = school.id === activeHomeSchoolId;
                  return (
                    <button
                      key={school.id}
                      type="button"
                      onClick={() => setActiveHomeSchoolId(school.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-2 ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-blue-50/70 text-slate-700 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <span>🏫 {school.shortName}</span>
                    </button>
                  );
                })}
              </div>

              {(() => {
                const activeSchool =
                  schoolSections.find((s) => s.id === activeHomeSchoolId) ||
                  schoolSections[0];
                if (!activeSchool) return null;
                return (
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-4 sm:p-6 space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700">
                          {activeSchool.badgeText}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                          {activeSchool.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5">{activeSchool.subtitle}</p>
                      </div>
                      <div className="text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 max-w-md">
                        🎓 <strong>Дипломиране:</strong> {activeSchool.examFormat}
                      </div>
                    </div>

                    {/* Specialties Cards for selected school */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {activeSchool.specialties.map((spec) => {
                        const matchedLesson = lessons.find((l) => l.id === spec.linkedLessonId);
                        return (
                          <div
                            key={spec.code}
                            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between gap-3 shadow-2xs"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                  {spec.code}
                                </span>
                                <span className="text-[10px] font-semibold text-emerald-700">
                                  8.–12. кл.
                                </span>
                              </div>
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                {spec.name}
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {spec.coreSubjects.map((cs, i) => (
                                  <span
                                    key={i}
                                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                                  >
                                    {cs}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                if (matchedLesson) {
                                  onSelectLesson?.(matchedLesson, 'summary');
                                } else {
                                  onNavigateTab('specialties');
                                }
                              }}
                              className="w-full py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Отвори специалния урок</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Part B: Complete Grade-by-Grade Subject Matrix (8., 9., 10., 11., 12. клас) */}
            <div className="pt-3 border-t border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    📅 Бърз преглед по класове: Всеки предмет от 8., 9., 10., 11. и 12. клас
                  </h3>
                  <p className="text-xs text-slate-500">
                    Общообразователни (Раздел А), Профилирани (Раздел Б) и Специални професионални предмети (Раздел В — ДИППК)
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(['8. клас', '9. клас', '10. клас', '11. клас', '12. клас'] as const).map((gr) => (
                    <button
                      key={gr}
                      type="button"
                      onClick={() => setActiveHomeGrade(gr)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                        activeHomeGrade === gr
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {gr}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const gradeMatrix =
                  gradeMatrices.find((g) => g.grade === activeHomeGrade) ||
                  gradeMatrices[0];
                if (!gradeMatrix) return null;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {gradeMatrix.subjects.map((subj, idx) => {
                      const targetLesson = lessons.find((l) => l.id === subj.linkedLessonId);
                      const isSectionC = subj.category.includes('Раздел В');
                      const isSectionB = subj.category.includes('Раздел Б');
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-50/90 hover:bg-white border border-slate-200/90 hover:border-blue-300 transition-all flex flex-col justify-between gap-3"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  isSectionC
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : isSectionB
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-blue-50 text-blue-800 border-blue-200'
                                }`}
                              >
                                {subj.category}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                {subj.weeklyHoursNote}
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                              {subj.subjectName}
                            </h4>
                            <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">
                              {subj.keyTopics}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs">
                            <span className="text-[10px] text-slate-500 truncate max-w-[160px]">
                              🏫 {subj.schoolTypes}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (targetLesson) {
                                  onSelectLesson?.(targetLesson, 'summary');
                                } else {
                                  onNavigateTab('specialties');
                                }
                              }}
                              className="font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Към модула</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </section>
    </>
  );
};
