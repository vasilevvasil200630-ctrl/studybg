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
      <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Разпозната позиция в учебната програма на МОН:</span>
        </div>

        {/* Dynamic breadcrumb path */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
          <span className="px-2.5 py-1 rounded-lg bg-white text-slate-800 border border-slate-200 shadow-2xs font-semibold">
            {diagnosis.subject}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2.5 py-1 rounded-lg bg-white text-blue-700 border border-slate-200 shadow-2xs font-semibold">
            {diagnosis.grade}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 shadow-2xs">
            {diagnosis.domainName}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
            {diagnosis.subDomainName}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3.5">
          Диагностичен доклад: {diagnosis.subDomainName}
        </h2>
      </div>

      {/* 2. Metrics & Quality Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Coverage Score Card */}
        <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="text-xs font-bold uppercase text-slate-500 tracking-wide">
            Покритие на учебния план
          </div>
          <div className="my-3">
            <div className="text-4xl font-extrabold text-slate-900 font-mono">
              {diagnosis.qualityScore}%
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden border border-slate-200">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-700"
                style={{ width: `${diagnosis.qualityScore}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-slate-500">
            Съпоставка със задължителните термини за 6.00
          </span>
        </div>

        {/* Predicted Grade Card */}
        <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="text-xs font-bold uppercase text-slate-500 tracking-wide">
            Прогнозна оценка
          </div>
          <div className="my-3">
            <div className="text-2xl font-bold text-slate-900">
              {diagnosis.gradeEstimate}
            </div>
            <p className="text-xs text-emerald-700 mt-1 font-semibold">
              При явяване с текущото ниво на записките
            </p>
          </div>
          <span className="text-xs text-slate-500">
            По шестобалната система на МОН
          </span>
        </div>

        {/* Action Next Step Card */}
        <div className="p-5 sm:p-6 rounded-xl bg-blue-50/50 border border-blue-200 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-blue-700 tracking-wide mb-1">
              Препоръчано действие
            </div>
            <div className="text-sm font-bold text-slate-900">
              Преговор и тест по темата
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Премини към резюмето, флаш картите и 10-те контролни въпроса.
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={onProceedToHolyTrinity}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Отвори урока и тестовете</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('audit')}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>Одит на критериите за 6.00</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Detailed Breakdown: What was found vs. What is missing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        
        {/* Left: What was successfully identified */}
        <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Успешно разпознати термини в тетрадката:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {diagnosis.matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium"
              >
                ✓ {kw}
              </span>
            ))}
          </div>

          {/* Teacher Advice Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-4">
            <div className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-1">
              Учителски съвет за подготовка:
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {diagnosis.teacherAdvice}
            </p>
          </div>
        </div>

        {/* Right: What is MISSING for 6.00 */}
        <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Липсващи елементи за Отличен 6.00:</span>
          </div>

          <div className="space-y-2.5">
            {diagnosis.missingCrucialPoints.map((missing, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 flex items-start justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-800 block mb-0.5">
                    Липсваща ключова точка #{i + 1}
                  </span>
                  <div className="text-xs font-medium text-slate-800">
                    {missing}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(missing)}
                  className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-all flex-shrink-0 shadow-2xs"
                  title="Копирай за преписване в тетрадката"
                >
                  {copiedText === missing ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                </button>
              </div>
            ))}
          </div>

          {/* Common Traps Warning */}
          {diagnosis.detectedTraps && diagnosis.detectedTraps.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 mt-4">
              <div className="text-xs font-bold text-rose-800 uppercase tracking-wide mb-1">
                Типични капани на изпитите по темата:
              </div>
              <ul className="space-y-1 text-xs text-rose-900">
                {diagnosis.detectedTraps.map((trap, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Navigation Actions */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
        <button
          onClick={onScanAnother}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← Сканирай друга страница
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('flashcards')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Флаш карти</span>
              </button>
              <button
                onClick={() => onNavigateTab('quiz')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Реши тест</span>
              </button>
            </>
          )}

          <button
            onClick={onProceedToHolyTrinity}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Отвори синтезирания урок</span>
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
