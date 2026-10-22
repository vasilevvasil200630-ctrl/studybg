import React, { useState, lazy, Suspense } from 'react';
import { Dna, FlaskConical, Zap, GraduationCap, Printer } from 'lucide-react';
import { SCIENCE_QUIZ } from '../data/scienceLabData';

// Всеки таб е отделен chunk — зарежда се при първо отваряне
const ScienceBiologyTab = lazy(() => import('./ScienceBiologyTab').then((m) => ({ default: m.ScienceBiologyTab })));
const ScienceChemistryTab = lazy(() => import('./ScienceChemistryTab').then((m) => ({ default: m.ScienceChemistryTab })));
const SciencePhysicsTab = lazy(() => import('./SciencePhysicsTab').then((m) => ({ default: m.SciencePhysicsTab })));
const ScienceQuizTab = lazy(() => import('./ScienceQuizTab').then((m) => ({ default: m.ScienceQuizTab })));

interface ScienceDziLabProps {
  onOpenFormulaModal?: () => void;
}

type ScienceLabTab = 'biology' | 'chemistry' | 'physics' | 'quiz';

export const ScienceDziLab: React.FC<ScienceDziLabProps> = ({ onOpenFormulaModal }) => {
  const [activeTab, setActiveTabState] = useState<ScienceLabTab>('biology');
  // Отворените табове остават монтирани (скрити), за да пазят състоянието си както преди разделянето
  const [visitedTabs, setVisitedTabs] = useState<ReadonlySet<ScienceLabTab>>(() => new Set<ScienceLabTab>(['biology']));
  const setActiveTab = (tab: ScienceLabTab) => {
    setActiveTabState(tab);
    setVisitedTabs((prev) => (prev.has(tab) ? prev : new Set(prev).add(tab)));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-4">

        {onOpenFormulaModal && (
          <button
            onClick={onOpenFormulaModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-2xs transition-colors shrink-0 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>Принтирай A4 Табла с Формули</span>
          </button>
        )}
      </div>

      {/* Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-100 border border-slate-200">
        <button
          onClick={() => setActiveTab('biology')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'biology'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <Dna className="w-4 h-4" />
          <span>Биология: ДНК Транслатор & Решетка на Пънет</span>
        </button>

        <button
          onClick={() => setActiveTab('chemistry')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'chemistry'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>Химия: Качествен анализ на йони & Хидролиза</span>
        </button>

        <button
          onClick={() => setActiveTab('physics')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'physics'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Физика: Вериги на Ом & Фотоефект на Айнщайн</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Изпитен Тренажор ({SCIENCE_QUIZ.length} задачи)</span>
        </button>
      </div>

      {/* Активният таб (отделен lazy chunk) */}
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Зареждане…</div>}>
        {visitedTabs.has('biology') && <div hidden={activeTab !== 'biology'}><ScienceBiologyTab /></div>}
        {visitedTabs.has('chemistry') && <div hidden={activeTab !== 'chemistry'}><ScienceChemistryTab /></div>}
        {visitedTabs.has('physics') && <div hidden={activeTab !== 'physics'}><SciencePhysicsTab /></div>}
        {visitedTabs.has('quiz') && <div hidden={activeTab !== 'quiz'}><ScienceQuizTab /></div>}
      </Suspense>
    </div>
  );
};
