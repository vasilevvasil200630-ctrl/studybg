import React, { useState, useMemo } from 'react';
import {
  Award,
  TrendingUp,
  Target,
  AlertCircle,
  ArrowRight,
  School,
  Percent
} from 'lucide-react';
import type { AppNavTab } from './Navbar';
import { ExcellenceCertificateModal } from './ExcellenceCertificateModal';
import { DZI_SCALE, DZI_SCALE_SOURCES, DIPPK_SCALE, formatGrade, gradeBands, gradeToPoints, pointsToGrade, verbalGrade, type VerbalGrade } from '../lib/monGradeScale';

interface MonGradeCalculatorViewProps {
  onNavigateTab?: (tab: AppNavTab) => void;
}

/** Точки с до две цифри след запетаята: 40,75 */
const fmtPts = (p: number): string => (Number.isInteger(p) ? String(p) : p.toFixed(2).replace(/0$/, '').replace('.', ','));

/** Редовете на таблицата със скалата за ДЗИ — от DZI_SCALE */
const DZI_TABLE = (() => {
  const b = gradeBands(DZI_SCALE);
  const span = (from: number, to: number) => `${fmtPts(from)} – ${fmtPts(to)} т.`;
  return [
    { grade: 'Слаб 2', label: 'Слаб' as VerbalGrade, range: `под ${DZI_SCALE.passPoints} т.`, note: '' },
    { grade: 'Среден 3,00 – 3,49', label: 'Среден' as VerbalGrade, range: span(b[1].from, b[1].to), note: 'Изпитът е издържан' },
    { grade: 'Добър 3,50 – 4,49', label: 'Добър' as VerbalGrade, range: span(b[2].from, b[2].to), note: '' },
    { grade: 'Много добър 4,50 – 5,49', label: 'Много добър' as VerbalGrade, range: span(b[3].from, b[3].to), note: '' },
    { grade: 'Отличен 5,50 – 5,99', label: 'Отличен' as VerbalGrade, range: span(b[4].from, gradeToPoints(6) - 0.25), note: '' },
    { grade: 'Отличен 6,00', label: 'Отличен' as VerbalGrade, range: span(gradeToPoints(6), DZI_SCALE.maxPoints), note: 'Най-високата оценка — от 95 точки' },
  ];
})();

export const MonGradeCalculatorView: React.FC<MonGradeCalculatorViewProps> = ({
  onNavigateTab
}) => {
  const [calculatorMode, setCalculatorMode] = useState<'pointsToGrade' | 'gradeToPoints' | 'universityBal' | 'dippkCalc'>('pointsToGrade');
  const [showSpkCertificateModal, setShowSpkCertificateModal] = useState<boolean>(false);
  
  // Mode 1: Points to Grade
  const [points, setPoints] = useState<number>(78);

  // Mode 2: Grade to Points
  const [targetGrade, setTargetGrade] = useState<number>(5.50);

  // Mode 3: University Bal
  const [diplomaGrade, setDiplomaGrade] = useState<number>(5.80);
  const [examGrade, setExamGrade] = useState<number>(5.50);
  const [examMultiplier, setExamMultiplier] = useState<number>(3); // x3, x4, x2.5, x2, x3.5

  // Mode 4: ДИППК (Трета СПК - Теория + Практика + ЗПП успех)
  const [dippkTheoryPoints, setDippkTheoryPoints] = useState<number>(84);
  const [dippkPracticePoints, setDippkPracticePoints] = useState<number>(92);
  const [dippkSubjectsAvg, setDippkSubjectsAvg] = useState<number>(5.65);

  const GRADE_STYLES: Record<VerbalGrade, { badge: string; color: string; status: string }> = {
    'Отличен': {
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      color: 'text-emerald-700',
      status: 'Пълно покритие на държавните образователни стандарти за ДЗИ / НВО. Отличен резултат за прием във всички университети.'
    },
    'Много добър': {
      badge: 'bg-blue-50 text-blue-800 border-blue-200',
      color: 'text-blue-700',
      status: 'Високо ниво на знания и аналитични умения. Конкурентен бал за повечето водещи университетски специалности.'
    },
    'Добър': {
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      color: 'text-amber-700',
      status: 'Стабилна подготовка. Препоръчва се преговор на изворите и писмения отговор (Модул 2 и 3) за по-висок резултат.'
    },
    'Среден': {
      badge: 'bg-orange-50 text-orange-800 border-orange-200',
      color: 'text-orange-700',
      status: `Изпитът е издържан: от ${DZI_SCALE.passPoints} точки оценката е поне Среден 3,00. За кандидатстване в университет се препоръчва повишаване.`
    },
    'Слаб': {
      badge: 'bg-rose-50 text-rose-800 border-rose-200',
      color: 'text-rose-600',
      status: `Под ${DZI_SCALE.passPoints} от ${DZI_SCALE.maxPoints} точки изпитът не е издържан (Слаб 2). Може да се положи отново в следващата сесия.`
    }
  };

  // Скалата на МОН за ДЗИ (src/lib/monGradeScale.ts)
  const calculateMonGrade = (pts: number) => {
    const result = pointsToGrade(pts, DZI_SCALE);
    return {
      numeric: result.numeric,
      verbal: result.label,
      fullName: formatGrade(result),
      passed: result.passed,
      ...GRADE_STYLES[result.label]
    };
  };

  const currentResult = useMemo(() => calculateMonGrade(points), [points]);
  const reqPoints = useMemo(() => gradeToPoints(targetGrade, DZI_SCALE), [targetGrade]);

  // Strategy breakdown for required points
  const strategyBreakdown = useMemo(() => {
    // Пропорционално на точките на трите части на ДЗИ по БЕЛ (2022–2026): 37 + 33 + 30
    const total = reqPoints;
    const m1 = Math.round(total * 0.37 * 2) / 2;
    const m2 = Math.round(total * 0.33 * 2) / 2;
    const m3 = Math.max(0, Number((total - m1 - m2).toFixed(2)));
    return { m1, m2, m3 };
  }, [reqPoints]);

  // University Bal Calculation
  const universityBal = useMemo(() => {
    // Standard formula: (Diploma subject * 1) + (Exam grade * Multiplier)
    const bal = (diplomaGrade * 1) + (examGrade * examMultiplier);
    const maxBal = (6.00 * 1) + (6.00 * examMultiplier);
    const percentage = Math.round((bal / maxBal) * 100);
    return { bal: Number(bal.toFixed(2)), maxBal, percentage };
  }, [diplomaGrade, examGrade, examMultiplier]);

  // ДИППК (Трета СПК) Calculation according to Наредба № 1 на МОН
  const dippkResult = useMemo(() => {
    const pointsToSpkGrade = (pts: number) => pointsToGrade(pts, DIPPK_SCALE).numeric;
    const theoryGrade = pointsToSpkGrade(dippkTheoryPoints);
    const practiceGrade = pointsToSpkGrade(dippkPracticePoints);
    const bothPassed = dippkTheoryPoints >= DIPPK_SCALE.passPoints && dippkPracticePoints >= DIPPK_SCALE.passPoints;
    const dippkExamAvg = bothPassed ? Number(((theoryGrade + practiceGrade) / 2).toFixed(2)) : 2.00;
    const certificateFinalGrade = bothPassed
      ? Number(((dippkSubjectsAvg + theoryGrade + practiceGrade) / 3).toFixed(2))
      : 2.00;

    const verbal = verbalGrade(certificateFinalGrade);

    return {
      theoryGrade,
      practiceGrade,
      bothPassed,
      dippkExamAvg,
      certificateFinalGrade,
      verbal,
    };
  }, [dippkTheoryPoints, dippkPracticePoints, dippkSubjectsAvg]);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Как се смята: праговете по двете наредби */}
      <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
        Изчислете оценката си по скалата на МОН за ДЗИ (от 2022/23 г.: <strong>30 т.</strong> — Среден 3,00, <strong>95 т.</strong> — Отличен 6,00, стъпка 0,25 т.) или по Наредба № 1 за <strong>ДИППК / Трета СПК</strong> (Теория + Практика на професията — праг <strong>50 т.</strong>).
      </p>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-200/80 border border-slate-300">
        <button
          onClick={() => setCalculatorMode('pointsToGrade')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            calculatorMode === 'pointsToGrade'
              ? 'bg-white text-blue-900 shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Percent className="w-4 h-4 text-blue-600" />
          <span>Точки ➔ Оценка (ДЗИ)</span>
        </button>

        <button
          onClick={() => setCalculatorMode('gradeToPoints')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            calculatorMode === 'gradeToPoints'
              ? 'bg-white text-blue-900 shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Target className="w-4 h-4 text-slate-600" />
          <span>Целева оценка ➔ Нужни точки</span>
        </button>

        <button
          onClick={() => setCalculatorMode('universityBal')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            calculatorMode === 'universityBal'
              ? 'bg-white text-blue-900 shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <School className="w-4 h-4 text-emerald-600" />
          <span>Кандидатстудентски бал (ВУЗ)</span>
        </button>

        <button
          onClick={() => setCalculatorMode('dippkCalc')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            calculatorMode === 'dippkCalc'
              ? 'bg-white text-blue-950 shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>ДИППК Калкулатор (Трета СПК)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: POINTS TO GRADE */}
      {/* ========================================================================= */}
      {calculatorMode === 'pointsToGrade' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Slider & Input */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Задайте точки от изпита
              </span>
              <span className="text-xs tabular-nums text-slate-500">
                Максимум: 100 точки
              </span>
            </div>

            {/* Big Interactive Points Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-slate-600">
                  Постигнат брой точки:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.25}
                    value={points}
                    onChange={(e) => setPoints(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                    className="w-20 p-2 rounded-xl border border-slate-300 text-center tabular-nums text-lg font-bold text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <span className="text-sm font-bold text-slate-400 tabular-nums">/ 100</span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.25}
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                
                {/* Scale markers */}
                <div className="flex justify-between text-[10px] tabular-nums text-slate-500">
                  <span>0т.</span>
                  <span className="text-rose-600 font-bold">30т. (Среден)</span>
                  <span className="text-amber-600 font-bold">{fmtPts(gradeToPoints(3.5))}т. (Добър)</span>
                  <span className="text-blue-600 font-bold">{fmtPts(gradeToPoints(4.5))}т. (Мн. добър)</span>
                  <span className="text-emerald-700 font-bold">{fmtPts(gradeToPoints(5.5))}т. (Отличен)</span>
                  <span>{fmtPts(gradeToPoints(6))}т. (6.00)</span>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Бърз избор на ключови прагове:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: `${DZI_SCALE.passPoints} т. (Минимум)`, val: DZI_SCALE.passPoints },
                  { label: `${fmtPts(gradeToPoints(3.5))} т. (Добър)`, val: gradeToPoints(3.5) },
                  { label: `${fmtPts(gradeToPoints(4.5))} т. (Мн. добър)`, val: gradeToPoints(4.5) },
                  { label: `${fmtPts(gradeToPoints(5.5))} т. (Отличен)`, val: gradeToPoints(5.5) },
                  { label: `${fmtPts(gradeToPoints(6))} т. (Отличен 6,00)`, val: gradeToPoints(6) }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    onClick={() => setPoints(preset.val)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      points === preset.val
                        ? 'bg-blue-600 text-white border-blue-600 font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Grade Result Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Оценка по скалата на МОН
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentResult.badge}`}>
                {currentResult.passed ? 'Издържан ДЗИ' : 'Неиздържан'}
              </span>
            </div>

            {/* Large Grade Display */}
            <div className="text-center py-4 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-medium">Крайна оценка за дипломата:</span>
              <div className="text-4xl sm:text-5xl font-bold tabular-nums tracking-tight text-blue-900">
                {currentResult.numeric.toFixed(2)}
              </div>
              <div className={`text-base font-bold ${currentResult.color}`}>
                {currentResult.verbal} ({currentResult.numeric.toFixed(2)})
              </div>
            </div>

            {/* Key Status & Guidance */}
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-slate-700 space-y-1.5">
              <span className="font-bold text-blue-950 block">Тълкувание на резултата:</span>
              <p className="leading-relaxed">
                {currentResult.status}
              </p>
            </div>

            {/* Progress to next milestone */}
            {points < gradeToPoints(6) && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <span className="flex items-center gap-1.5 font-medium">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>{points < gradeToPoints(5.5) ? 'До Отличен (5.50):' : 'До Отличен 6,00:'}</span>
                </span>
                <span className="font-bold tabular-nums">
                  още +{fmtPts(Math.max(0, (points < gradeToPoints(5.5) ? gradeToPoints(5.5) : gradeToPoints(6)) - points))} точки
                </span>
              </div>
            )}

            {/* Call to Action */}
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('simulator')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
              >
                <span>Тествай знанията си в 100т. симулатор</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: GRADE TO POINTS (TARGET STRATEGY) */}
      {/* ========================================================================= */}
      {calculatorMode === 'gradeToPoints' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Каква оценка целите на матурата?
              </span>
              <span className="text-xs tabular-nums text-slate-700 font-bold">
                Целева оценка
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-slate-600">
                  Желана крайна оценка:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={3.00}
                    max={6.00}
                    step={0.05}
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(Math.min(6.00, Math.max(3.00, Number(e.target.value) || 3)))}
                    className="w-24 p-2 rounded-xl border border-slate-300 text-center tabular-nums text-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500"
                  />
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min={3.00}
                  max={6.00}
                  step={0.05}
                  value={targetGrade}
                  onChange={(e) => setTargetGrade(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                />
                <div className="flex justify-between text-[10px] tabular-nums text-slate-500">
                  <span>3.00 (Среден)</span>
                  <span>4.00 (Добър)</span>
                  <span>5.00 (Много добър)</span>
                  <span className="text-slate-700 font-bold">6.00 (Отличен)</span>
                </div>
              </div>
            </div>

            {/* Quick Grade Target Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {[3.50, 4.00, 4.50, 5.00, 5.50, 5.80, 6.00].map((g) => (
                <button
                  key={g}
                  onClick={() => setTargetGrade(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    targetGrade === g
                      ? 'bg-brand-sapphire text-white border-brand-sapphire shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {g.toFixed(2)}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Required Points Strategy */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Стратегически план по модули
              </span>
              <span className="text-xs tabular-nums font-bold text-slate-700 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
                {reqPoints} точки
              </span>
            </div>

            <div className="text-center py-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-1">
              <span className="text-xs text-blue-900 font-medium">Необходими точки за оценка {targetGrade.toFixed(2)}:</span>
              <div className="text-4xl sm:text-5xl font-bold tabular-nums text-blue-900">
                {reqPoints}
              </div>
              <span className="text-xs text-slate-500 tabular-nums">от 100 точки</span>
            </div>

            {/* Module Breakdown Plan */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-800 block">
                Примерно разпределение по частите на ДЗИ по БЕЛ (37 + 33 + 30 т.):
              </span>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Част 1: езикови задачи и информационен текст</span>
                  <span className="text-[11px] text-slate-500">Задачи 1.–21. • 60 минути</span>
                </div>
                <span className="tabular-nums font-bold text-blue-700 text-sm">
                  {fmtPts(strategyBreakdown.m1)} / 37 т.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Част 2: литература</span>
                  <span className="text-[11px] text-slate-500">Задачи 22.–40. • 60 минути</span>
                </div>
                <span className="tabular-nums font-bold text-amber-700 text-sm">
                  {fmtPts(strategyBreakdown.m2)} / 33 т.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Част 3: есе или интерпретативно съчинение</span>
                  <span className="text-[11px] text-slate-500">Задача 41. • 120 минути • по критериите на МОН</span>
                </div>
                <span className="tabular-nums font-bold text-slate-700 text-sm">
                  {fmtPts(strategyBreakdown.m3)} / 30 т.
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: UNIVERSITY BAL CALCULATOR */}
      {/* ========================================================================= */}
      {calculatorMode === 'universityBal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Кандидатстудентски състезателен бал
              </span>
              <span className="text-xs tabular-nums text-emerald-700 font-bold">
                Висши училища
              </span>
            </div>

            <div className="space-y-4">
              {/* Exam Grade Input */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Оценка от ДЗИ (Матура):
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Български език или История (от 2.00 до 6.00)
                  </span>
                </div>
                <input
                  type="number"
                  min={2.00}
                  max={6.00}
                  step={0.05}
                  value={examGrade}
                  onChange={(e) => setExamGrade(Math.min(6.00, Math.max(2.00, Number(e.target.value) || 2)))}
                  className="w-20 p-2 rounded-xl border border-slate-300 text-center tabular-nums text-base font-bold text-blue-700"
                />
              </div>

              {/* Multiplier Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">
                  Тежест / Коефициент на матурата в специалността:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { mult: 3, label: 'x3 (СУ, УНСС, ТУ)', desc: 'Стандартен прием' },
                    { mult: 4, label: 'x4 (Право / МУ / Мед.)', desc: 'Максимална тежест' },
                    { mult: 3.5, label: 'x3.5 (УАСГ / Архит.)', desc: 'Математика + Физика' },
                    { mult: 2.5, label: 'x2.5 (Икономика / ИТ)', desc: 'Смесен бал' },
                    { mult: 2, label: 'x2 (ВВМУ / ВВВУ)', desc: 'Инженерен прием' },
                    { mult: 1.5, label: 'x1.5 (НСА / Академии)', desc: 'Практически прием' }
                  ].map((m) => (
                    <button
                      key={m.mult}
                      onClick={() => setExamMultiplier(m.mult)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        examMultiplier === m.mult
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs">{m.label}</div>
                      <div className="text-[10px] text-slate-500">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Diploma Subject Grade */}
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Оценка от дипломата за средно образование:
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Участва с коефициент х1
                  </span>
                </div>
                <input
                  type="number"
                  min={2.00}
                  max={6.00}
                  step={0.05}
                  value={diplomaGrade}
                  onChange={(e) => setDiplomaGrade(Math.min(6.00, Math.max(2.00, Number(e.target.value) || 2)))}
                  className="w-20 p-2 rounded-xl border border-slate-300 text-center tabular-nums text-base font-bold text-slate-800"
                />
              </div>

            </div>

          </div>

          {/* Right Column: Calculated Bal */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Вашият състезателен бал
              </span>
              <span className="text-xs tabular-nums font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {universityBal.percentage}% от макса
              </span>
            </div>

            <div className="text-center py-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-1">
              <span className="text-xs text-emerald-900 font-medium">Изчислен състезателен бал:</span>
              <div className="text-4xl sm:text-5xl font-bold tabular-nums text-emerald-900">
                {universityBal.bal.toFixed(2)}
              </div>
              <span className="text-xs text-slate-500 tabular-nums">от максимален {universityBal.maxBal.toFixed(2)}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 leading-relaxed">
              <span className="font-bold text-slate-800 block">Формула:</span>
              <span>
                (Диплома {diplomaGrade.toFixed(2)} × 1) + (ДЗИ {examGrade.toFixed(2)} × {examMultiplier}) = <strong>{universityBal.bal.toFixed(2)}</strong>
              </span>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: DIPPK THIRD SPK VOCATIONAL QUALIFICATION CALCULATOR               */}
      {/* ========================================================================= */}
      {calculatorMode === 'dippkCalc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Theory + Practice + Vocational GPA */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Държавен изпит за придобиване на Трета СПК (ДИППК)
              </span>
              <span className="text-xs tabular-nums font-bold text-blue-700">
                Наредба № 1 на МОН
              </span>
            </div>

            {/* Part 1: Theory / Diploma Project Points */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    1. Част по Теория на професията (Дипломен проект / Писмена тема):
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Минимум 50 от 100 т. за Среден 3.00 • Оценка: <strong>{dippkResult.theoryGrade.toFixed(2)}</strong>
                  </span>
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={dippkTheoryPoints}
                  onChange={(e) => setDippkTheoryPoints(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-20 p-2 rounded-xl border border-slate-300 bg-white text-center tabular-nums text-base font-bold text-blue-700"
                />
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={dippkTheoryPoints}
                onChange={(e) => setDippkTheoryPoints(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Part 2: Practice / Defense Points */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    2. Част по Практика на професията (Практическо задание & Защита):
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Минимум 50 от 100 т. за Среден 3.00 • Оценка: <strong>{dippkResult.practiceGrade.toFixed(2)}</strong>
                  </span>
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={dippkPracticePoints}
                  onChange={(e) => setDippkPracticePoints(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-20 p-2 rounded-xl border border-slate-300 bg-white text-center tabular-nums text-base font-bold text-emerald-700"
                />
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={dippkPracticePoints}
                onChange={(e) => setDippkPracticePoints(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Part 3: Average from Vocational Subjects (ЗПП) */}
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  3. Среден успех от специалните предмети в гимназията (ЗПП):
                </span>
                <span className="text-[11px] text-slate-500">
                  Участва при формиране на окончателната оценка в Свидетелството за СПК
                </span>
              </div>
              <input
                type="number"
                min={3.00}
                max={6.00}
                step={0.05}
                value={dippkSubjectsAvg}
                onChange={(e) => setDippkSubjectsAvg(Math.min(6.00, Math.max(3.00, Number(e.target.value) || 3)))}
                className="w-20 p-2 rounded-xl border border-slate-300 text-center tabular-nums text-base font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Right Column: Calculated SPK Certificate Grade */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Свидетелство за Трета СПК
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                dippkResult.bothPassed
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                {dippkResult.bothPassed ? 'Придобита III СПК' : 'Под прага от 50 т.'}
              </span>
            </div>

            <div className="text-center py-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-1">
              <span className="text-xs text-blue-900 font-medium">
                Окончателна оценка в Свидетелството за СПК (EUROPASS):
              </span>
              <div className="text-4xl sm:text-5xl font-bold tabular-nums text-blue-950">
                {dippkResult.certificateFinalGrade.toFixed(2)}
              </div>
              <div className="text-sm font-bold text-blue-800">
                {dippkResult.verbal} ({dippkResult.certificateFinalGrade.toFixed(2)})
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Оценка от ДИППК (Теория + Практика):</span>
                <strong className="tabular-nums text-slate-900">{dippkResult.dippkExamAvg.toFixed(2)}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Оценка по Теория ({dippkTheoryPoints} т.):</span>
                <strong className="tabular-nums text-blue-700">{dippkResult.theoryGrade.toFixed(2)}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Оценка по Практика ({dippkPracticePoints} т.):</span>
                <strong className="tabular-nums text-emerald-700">{dippkResult.practiceGrade.toFixed(2)}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSpkCertificateModal(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Издай Свидетелство за Трета СПК + EUROPASS (A4 PDF)</span>
            </button>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('specialties')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
              >
                <span>Отвори 16-те Дипломни Задания за Трета СПК</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Official МОН Comparison Reference Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Скала на МОН за оценяване на ДЗИ (от 2022/23 г.)
            </h4>
          </div>
          <span className="text-xs text-slate-500 tabular-nums">
            Държавен зрелостен изпит (100 точки)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-2.5 px-3 font-bold">Оценка</th>
                <th className="py-2.5 px-3 font-bold">Интервал от точки</th>
                <th className="py-2.5 px-3 font-bold">Словесен израз</th>
                <th className="py-2.5 px-3 font-bold">Статус за дипломиране</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {DZI_TABLE.map((row) => (
                <tr key={row.grade} className={row.label === 'Отличен' ? 'bg-emerald-50/40 hover:bg-emerald-50/60' : 'hover:bg-slate-50/60'}>
                  <td className={`py-2.5 px-3 font-bold tabular-nums ${GRADE_STYLES[row.label].color}`}>{row.grade}</td>
                  <td className="py-2.5 px-3 tabular-nums font-medium">{row.range}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.label}</td>
                  <td className="py-2.5 px-3 text-slate-700">
                    {row.label === 'Слаб' ? (
                      <span className="inline-flex items-center gap-1 text-rose-700 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                        Изпитът не е издържан — полага се отново в следваща сесия
                      </span>
                    ) : (
                      row.note
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-500">
          Оценката е с точност до 0,01: от 30 т. всеки 0,25 т. дават следващата стотна в границите на интервала. Източници:{' '}
          {DZI_SCALE_SOURCES.map((src, i) => (
            <React.Fragment key={src.url}>
              {i > 0 && '; '}
              <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2 hover:text-slate-700">
                {src.title}
              </a>
            </React.Fragment>
          ))}
          .
        </p>
      </div>

      <ExcellenceCertificateModal
        isOpen={showSpkCertificateModal}
        onClose={() => setShowSpkCertificateModal(false)}
        achievementTitle="Държавен изпит за придобиване на професионална квалификация (ДИППК)"
        examOrTrackLabel="Трета СПК • Наредба № 1 на МОН"
        scoreText={`Теория: ${dippkResult.theoryGrade.toFixed(2)} | Практика: ${dippkResult.practiceGrade.toFixed(2)}`}
        gradeLabel={`${dippkResult.verbal} (${dippkResult.certificateFinalGrade.toFixed(2)})`}
        highlights={[
          `ДИППК Средна: ${dippkResult.dippkExamAvg.toFixed(2)}`,
          `ЗПП Среден успех: ${dippkSubjectsAvg.toFixed(2)}`,
          'EUROPASS EQF Level 4'
        ]}
        initialDocMode="spk_europass"
      />
    </div>
  );
};
