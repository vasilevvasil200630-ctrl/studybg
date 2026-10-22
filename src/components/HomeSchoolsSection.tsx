import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, BookOpen, ArrowRight, School } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import type { SchoolCategorySection, GradeCurriculumMatrix } from '../data/schoolsSpecialtiesDatabase';

interface HomeSchoolsSectionProps {
  lessons: LessonData[];
  onNavigateTab: (tab: AppNavTab) => void;
  onSelectLesson?: (lesson: LessonData, targetTab?: AppNavTab) => void;
  onRequestFullCurriculum?: () => void;
}

// Изнесено от HomeLandingView — зарежда се отложено, когато секцията приближи екрана
export const HomeSchoolsSection: React.FC<HomeSchoolsSectionProps> = ({ lessons, onNavigateTab, onSelectLesson, onRequestFullCurriculum }) => {
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
      onRequestFullCurriculum?.();
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
  }, [onRequestFullCurriculum]);

  return (
    <>
        {/* ========================================================================= */}
        {/* 2.5 SPECIAL SECTIONS: ALL HIGH SCHOOLS, SPECIALTIES & GRADES 8-12 MATRIX */}
        {/* ========================================================================= */}
        <section ref={schoolsSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-8 space-y-7">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="space-y-1.5 max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Всеки предмет от всеки клас (8.–12.) за всяко училище и специалност
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {schoolSections.length || 16} специални секции и 64+ професии и специалности. Избери своето училище (ПМГ/СМГ, ЕГ, ТУЕС/ИТ и AI, НТБГ/НФСГ, СГСАГ/Геодезия, ПГМЕ/CNC и Роботика, Медицина/Фармация, Дизайн/UI-UX/3D, ВМГ/Авиация, ПГХВТ/Винарство, Спортни и Музикални училища, НГДЕК, НПГПТО/ПГЯЕ, НПГПФ/Кино и Иконопис, МВР/Криминалистика, Балнеология/СПА) или клас (8.–12. клас), за да отвориш <strong>Общообразователните (Раздел А)</strong>, <strong>Профилираните (Раздел Б за ДЗИ)</strong> и <strong>Специалните професионални предмети (Раздел В за ДИППК — Трета СПК)</strong>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('specialties')}
                className="self-start lg:self-center min-h-11 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-sapphire hover:bg-brand-sapphire-light text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer shrink-0"
              >
                <span>Отвори пълния справочник & калкулатор ДИППК</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Part A: 16 School & Vocational Specialty Tabs */}
            <div className="space-y-4">
              <div className="-mx-1 flex gap-2 overflow-x-auto no-scrollbar px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
                {schoolSections.map((school) => {
                  const isSelected = school.id === activeHomeSchoolId;
                  return (
                    <button
                      key={school.id}
                      type="button"
                      onClick={() => setActiveHomeSchoolId(school.id)}
                      aria-pressed={isSelected}
                      className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-brand-sapphire text-white border-brand-sapphire'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <School className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white/80' : 'text-slate-400'}`} aria-hidden="true" />
                      <span>{school.shortName}</span>
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
                  <div className="rounded-2xl bg-gradient-to-b from-white to-slate-50/80 border border-blue-200/80 p-4 sm:p-6 space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-blue-100">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                          {activeSchool.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5">{activeSchool.subtitle}</p>
                      </div>
                      <div className="flex items-start gap-2 text-xs px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 max-w-md">
                        <GraduationCap className="w-4 h-4 text-brand-sapphire shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong className="font-semibold text-slate-900">Дипломиране:</strong> {activeSchool.examFormat}</span>
                      </div>
                    </div>

                    {/* Specialties Cards for selected school */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {activeSchool.specialties.map((spec) => {
                        const matchedLesson = lessons.find((l) => l.id === spec.linkedLessonId);
                        return (
                          <div
                            key={spec.code}
                            className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 transition-all flex flex-col justify-between gap-3 shadow-2xs hover:shadow-sm"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[10px] tabular-nums font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                  {spec.code}
                                </span>
                                <span className="text-[10px] font-bold text-emerald-700">
                                  8.–12. кл.
                                </span>
                              </div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                                {spec.name}
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {spec.coreSubjects.map((cs, i) => (
                                  <span
                                    key={i}
                                    className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-900 border border-blue-100 font-medium"
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
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Бърз преглед по класове: всеки предмет от 8. до 12. клас
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        activeHomeGrade === gr
                          ? 'bg-brand-sapphire text-white shadow-2xs'
                          : 'bg-slate-50 hover:bg-blue-50/70 text-slate-700 border-slate-200 hover:border-blue-300'
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
                          className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 transition-colors flex flex-col justify-between gap-3"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  isSectionC
                                    ? 'bg-slate-100 text-slate-700 border-slate-200'
                                    : isSectionB
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-blue-50 text-blue-800 border-blue-200'
                                }`}
                              >
                                {subj.category}
                              </span>
                              <span className="text-[10px] tabular-nums text-slate-500">
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
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 truncate max-w-[170px]">
                              <School className="w-3 h-3 shrink-0" aria-hidden="true" />
                              <span className="truncate">{subj.schoolTypes}</span>
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
