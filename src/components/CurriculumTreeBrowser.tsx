import React, { useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown, Award, ArrowRight, Sparkles } from 'lucide-react';
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
    <div className="p-6 sm:p-8 rounded-3xl bg-[#101428] border border-white/10 shadow-2xl mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Пълна учебна структура на МОН</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Интерактивно дърво на предметите и дяловете
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Разгледай точната йерархия: Предмет ➔ Клас ➔ Дял ➔ Под-дял с изискванията за 6-ца.
          </p>
        </div>
      </div>

      {/* 1. Subjects Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
        {BULGARIAN_CURRICULUM_TREE.map((item, idx) => (
          <button
            key={item.subject}
            onClick={() => {
              setSelectedSubjectIndex(idx);
              setSelectedGradeIndex(0);
              setExpandedDomainId(null);
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSubjectIndex === idx
                ? 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-md shadow-indigo-600/25'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {item.subject}
          </button>
        ))}
      </div>

      {/* 2. Grades Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {activeSubject.grades.map((gr, idx) => (
          <button
            key={gr.grade}
            onClick={() => {
              setSelectedGradeIndex(idx);
              setExpandedDomainId(null);
            }}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedGradeIndex === idx
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {gr.grade}
          </button>
        ))}
      </div>

      {/* 3. Domains & Sub-domains List */}
      <div className="space-y-4">
        {activeGrade.domains.map((domain) => {
          const isExpanded = expandedDomainId === domain.id || activeGrade.domains.length === 1;

          return (
            <div
              key={domain.id}
              className="rounded-2xl border border-white/10 bg-[#141933]/60 overflow-hidden transition-all"
            >
              {/* Domain Header Accordion */}
              <button
                onClick={() => setExpandedDomainId(isExpanded ? null : domain.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-300 font-bold text-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {domain.name}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {domain.subDomains.length} учебни теми / под-дяла
                    </span>
                  </div>
                </div>

                <div className="text-slate-400">
                  {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
              </button>

              {/* Sub-domains List */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-white/5 bg-[#11152a] space-y-4">
                  {domain.subDomains.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl bg-[#171d3a] border border-white/5 hover:border-indigo-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-emerald-400">
                            Под-дял:
                          </span>
                          <h5 className="text-sm font-bold text-white">
                            {sub.name}
                          </h5>
                        </div>

                        {/* Requirements preview */}
                        <div className="mt-2 text-xs text-slate-300 space-y-1">
                          <div className="font-semibold text-amber-300 text-[11px] flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-400" />
                            <span>Изисква се за 6.00:</span>
                          </div>
                          <ul className="list-disc list-inside text-slate-400 text-[11px] pl-1">
                            {sub.gradeRequirement6.slice(0, 2).map((req, rIdx) => (
                              <li key={rIdx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLaunchTopic(sub, domain)}
                        className="self-start md:self-center flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-all whitespace-nowrap"
                      >
                        <span>Учи по тази тема</span>
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
