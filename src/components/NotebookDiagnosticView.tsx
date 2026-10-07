import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronRight, Copy, Check, BookOpen, Zap, Sparkles } from 'lucide-react';
import type { NotebookDiagnosis } from '../services/curriculumClassifier';

interface NotebookDiagnosticViewProps {
  diagnosis: NotebookDiagnosis;
  onProceedToHolyTrinity: () => void;
  onScanAnother: () => void;
}

export const NotebookDiagnosticView: React.FC<NotebookDiagnosticViewProps> = ({
  diagnosis,
  onProceedToHolyTrinity,
  onScanAnother
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. GPS Breadcrumb Banner: Subject -> Grade -> Domain -> SubDomain */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#13172e] via-[#101428] to-[#0c1822] border-2 border-indigo-500/30 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Разпознати координати по учебната програма на МОН:</span>
        </div>

        {/* Dynamic breadcrumb path */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-slate-200">
          <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {diagnosis.subject}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-500" />
          <span className="px-3 py-1 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30">
            {diagnosis.grade}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-500" />
          <span className="px-3 py-1 rounded-xl bg-white/5 text-slate-300 border border-white/10">
            {diagnosis.domainName}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-500" />
          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-extrabold">
            {diagnosis.subDomainName}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white mt-4">
          Анализ на записките: {diagnosis.subDomainName}
        </h2>
      </div>

      {/* 2. Quality & Grade Diagnosis Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Score Card */}
        <div className="p-6 rounded-3xl bg-[#12162b] border border-white/10 flex flex-col justify-between">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            Качество на записките
          </div>
          <div className="my-4">
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
              {diagnosis.qualityScore}%
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full"
                style={{ width: `${diagnosis.qualityScore}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-slate-400">
            Оценка на пълнотата спрямо изискванията на МОН
          </span>
        </div>

        {/* Predicted Grade Card */}
        <div className="p-6 rounded-3xl bg-[#12162b] border border-white/10 flex flex-col justify-between">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            Очаквана оценка на контролно
          </div>
          <div className="my-4">
            <div className="text-2xl sm:text-3xl font-black text-white">
              {diagnosis.gradeEstimate}
            </div>
            <p className="text-xs text-emerald-400 mt-1 font-semibold">
              Ако се явиш с тези записки на изпита
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Базирано на изискванията на учителите
          </span>
        </div>

        {/* Action Button Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-[#12162b] border border-indigo-500/30 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-indigo-300 tracking-wider mb-1">
              Следваща стъпка
            </div>
            <div className="text-sm font-bold text-white">
              Научи урока за 5 минути
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Генерирахме Светата троица за този под-дял.
            </p>
          </div>

          <button
            onClick={onProceedToHolyTrinity}
            className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-bold text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Отвори Светата троица</span>
            <Zap className="w-3.5 h-3.5 text-emerald-300" />
          </button>
        </div>
      </div>

      {/* 3. Detailed Breakdown: What was found vs. What is missing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: What is good */}
        <div className="p-6 rounded-3xl bg-[#12162b] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <span>Успешно разчетени акценти в тетрадката:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {diagnosis.matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold"
              >
                ✓ {kw}
              </span>
            ))}
          </div>

          {/* Teacher Advice Box */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 mt-4">
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
              👨‍🏫 Персонален съвет от учител за контролното:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {diagnosis.teacherAdvice}
            </p>
          </div>
        </div>

        {/* Right: What is MISSING for 6.00 */}
        <div className="p-6 rounded-3xl bg-[#12162b] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <span>Какво ЛИПСВА в тетрадката ти за Отличен 6.00:</span>
          </div>

          <div className="space-y-3">
            {diagnosis.missingCrucialPoints.map((missing, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-400 block mb-0.5">
                    Липсващ елемент #{i + 1}
                  </span>
                  <div className="text-xs font-semibold text-slate-200">
                    {missing}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(missing)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex-shrink-0"
                  title="Копирай за преписване"
                >
                  {copiedText === missing ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>

          {/* Common Traps Warning */}
          {diagnosis.detectedTraps && diagnosis.detectedTraps.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/25 mt-4">
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-1">
                ⚠️ Чести капани на изпити по тази тема:
              </div>
              <ul className="space-y-1 text-xs text-rose-200">
                {diagnosis.detectedTraps.map((trap, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span>•</span>
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Action Bar */}
      <div className="p-5 rounded-2xl bg-[#14182e] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onScanAnother}
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          ← Сканирай друга страница от тетрадката
        </button>

        <button
          onClick={onProceedToHolyTrinity}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white font-bold text-xs shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Започни 5-минутния преговор (Резюме, Флашкарти, Тест)</span>
          <BookOpen className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
