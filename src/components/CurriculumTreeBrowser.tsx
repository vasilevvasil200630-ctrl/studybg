import React, { useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown, Award, ArrowRight, Layers, GraduationCap, CheckCircle2 } from 'lucide-react';
import { BULGARIAN_CURRICULUM_TREE, type CurriculumDomain, type CurriculumSubDomain } from '../data/bulgarianCurriculumTree';
import type { LessonData } from '../types';
import { CURRICULUM_LESSONS } from '../data/curriculumDatabase';
import { generateLessonFromInput } from '../services/aiGenerator';

interface CurriculumTreeBrowserProps {
  onSelectTopic: (lesson: LessonData) => void;
}

export const CurriculumTreeBrowser: React.FC<CurriculumTreeBrowserProps> = ({ onSelectTopic }) => {
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);
  const [selectedGradeIndex, setSelectedGradeIndex] = useState(0);
  const [expandedDomainId, setExpandedDomainId] = useState<string | null>(null);

  const activeSubject = BULGARIAN_CURRICULUM_TREE[selectedSubjectIndex] || BULGARIAN_CURRICULUM_TREE[0];
  const activeGrade = activeSubject.grades[selectedGradeIndex] || activeSubject.grades[0];

  const handleLaunchTopic = (sub: CurriculumSubDomain, domain: CurriculumDomain) => {
    // Find in curriculum lessons or generate
    const existing = CURRICULUM_LESSONS.find(
      l => l.title.toLowerCase().includes(sub.name.toLowerCase().slice(0, 15)) ||
           sub.name.toLowerCase().includes(l.title.toLowerCase().slice(0, 15))
    );

    const lessonToLaunch = existing || generateLessonFromInput(
      sub.name,
      `${sub.name}. ${domain.name}. Учебен предмет: ${activeSubject.subject}, ${activeGrade.grade}. Изисквания за 6.00: ${sub.gradeRequirement6.join('. ')}.`,
      activeSubject.subject
    );

    onSelectTopic(lessonToLaunch);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Учебна йерархия по МОН</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Дърво на учебните дялове и задължителни изисквания
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Преглед на нормативната структура: Предмет ➔ Клас ➔ Учебен дял ➔ Тема с критерии за пълен Отличен (6.00).
          </p>
        </div>
      </div>

      {/* 1. Subjects Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 no-scrollbar">
        {BULGARIAN_CURRICULUM_TREE.map((item, idx) => (
          <button
            key={item.subject}
            onClick={() => {
              setSelectedSubjectIndex(idx);
              setSelectedGradeIndex(0);
              setExpandedDomainId(null);
            }}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedSubjectIndex === idx
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {item.subject}
          </button>
        ))}
      </div>

      {/* 2. Grades Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
        <div className="flex items-center gap-1 text-xs text-slate-600 mr-2 flex-shrink-0">
          <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
          <span>Клас:</span>
        </div>
        {activeSubject.grades.map((gr, idx) => (
          <button
            key={gr.grade}
            onClick={() => {
              setSelectedGradeIndex(idx);
              setExpandedDomainId(null);
            }}
            className={`whitespace-nowrap px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedGradeIndex === idx
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {gr.grade}
          </button>
        ))}
      </div>

      {/* 3. Domains & Sub-domains List */}
      <div className="space-y-3">
        {activeGrade.domains.map((domain) => {
          const isExpanded = expandedDomainId === domain.id || activeGrade.domains.length === 1;

          return (
            <div
              key={domain.id}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all"
            >
              {/* Domain Header Accordion */}
              <button
                onClick={() => setExpandedDomainId(isExpanded ? null : domain.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {domain.name}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {domain.subDomains.length} учебни под-дяла и теми
                    </span>
                  </div>
                </div>

                <div className="text-slate-400">
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>

              {/* Sub-domains List */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
                  {domain.subDomains.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-semibold text-emerald-700">
                            Тема / Под-дял:
                          </span>
                          <h5 className="text-sm font-bold text-slate-900">
                            {sub.name}
                          </h5>
                        </div>

                        {/* Requirements preview */}
                        <div className="mt-2 text-xs space-y-1">
                          <div className="font-semibold text-amber-800 text-[11px] flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-amber-600" />
                            <span>Изисквания по МОН за оценка Отличен (6.00):</span>
                          </div>
                          <ul className="space-y-1 text-slate-600 text-xs pl-1">
                            {sub.gradeRequirement6.slice(0, 2).map((req, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLaunchTopic(sub, domain)}
                        className="self-start md:self-center flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors whitespace-nowrap shadow-xs"
                      >
                        <span>Зареди тема</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
