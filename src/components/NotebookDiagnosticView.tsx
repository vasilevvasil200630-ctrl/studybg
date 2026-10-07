import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronRight, Copy, Check, BookOpen, ShieldCheck, ArrowRight, CheckSquare, Zap, GraduationCap } from 'lucide-react';
import type { NotebookDiagnosis } from '../services/curriculumClassifier';
import type { AppNavTab } from './Navbar';

interface NotebookDiagnosticViewProps {
  diagnosis: NotebookDiagnosis;
  onProceedToHolyTrinity: () => void;
  onScanAnother: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

export const NotebookDiagnosticView: React.FC<NotebookDiagnosticViewProps> = ({
  diagnosis,
  onProceedToHolyTrinity,
  onScanAnother,
  onNavigateTab
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Academic Taxonomy Breadcrumb Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Разпозната позиция в учебната програма на МОН:</span>
        </div>

        {/* Dynamic breadcrumb path */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
            {diagnosis.subject}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-sky-300 border border-slate-700">
            {diagnosis.grade}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60">
            {diagnosis.domainName}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold">
            {diagnosis.subDomainName}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mt-3.5">
          Диагностичен доклад: {diagnosis.subDomainName}
        </h2>
      </div>

      {/* 2. Metrics & Quality Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Coverage Score Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-semibold uppercase text-slate-400 tracking-wide">
            Покритие на учебния план
          </div>
          <div className="my-3">
            <div className="text-4xl font-extrabold text-white">
              {diagnosis.qualityScore}%
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${diagnosis.qualityScore}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-slate-400">
            Съпоставка със задължителните термини за 6.00
          </span>
        </div>

        {/* Predicted Grade Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-semibold uppercase text-slate-400 tracking-wide">
            Прогнозна оценка
          </div>
          <div className="my-3">
            <div className="text-2xl font-bold text-white">
              {diagnosis.gradeEstimate}
            </div>
            <p className="text-xs text-emerald-400 mt-1 font-medium">
              При явяване с текущото ниво на записките
            </p>
          </div>
          <span className="text-xs text-slate-400">
            По шестобалната система на МОН
          </span>
        </div>

        {/* Action Next Step Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold uppercase text-indigo-400 tracking-wide mb-1">
              Препоръчано действие
            </div>
            <div className="text-sm font-bold text-white">
              Преговор и тест по темата
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Премини към резюмето, флаш картите и 10-те контролни въпроса.
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={onProceedToHolyTrinity}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-indigo-500/40"
            >
              <span>Отвори урока и тестовете</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('audit')}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 transition-colors flex items-center justify-center gap-1.5"
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Одит на критериите за 6.00</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Detailed Breakdown: What was found vs. What is missing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        
        {/* Left: What was successfully identified */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Успешно разпознати термини в тетрадката:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {diagnosis.matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium"
              >
                ✓ {kw}
              </span>
            ))}
          </div>

          {/* Teacher Advice Box */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 mt-4">
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wide mb-1">
              Учителски съвет за подготовка:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {diagnosis.teacherAdvice}
            </p>
          </div>
        </div>

        {/* Right: What is MISSING for 6.00 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Липсващи елементи за Отличен 6.00:</span>
          </div>

          <div className="space-y-2.5">
            {diagnosis.missingCrucialPoints.map((missing, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-400 block mb-0.5">
                    Липсваща ключова точка #{i + 1}
                  </span>
                  <div className="text-xs font-medium text-slate-200">
                    {missing}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(missing)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex-shrink-0"
                  title="Копирай за преписване в тетрадката"
                >
                  {copiedText === missing ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>

          {/* Common Traps Warning */}
          {diagnosis.detectedTraps && diagnosis.detectedTraps.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 mt-4">
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wide mb-1">
                Типични капани на изпитите по темата:
              </div>
              <ul className="space-y-1 text-xs text-rose-200">
                {diagnosis.detectedTraps.map((trap, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400">•</span>
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Navigation Actions */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
        <button
          onClick={onScanAnother}
          className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          ← Сканирай друга страница
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('flashcards')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Флаш карти</span>
              </button>
              <button
                onClick={() => onNavigateTab('quiz')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                <span>Реши тест</span>
              </button>
            </>
          )}

          <button
            onClick={onProceedToHolyTrinity}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-indigo-500/40"
          >
            <span>Отвори синтезирания урок</span>
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
