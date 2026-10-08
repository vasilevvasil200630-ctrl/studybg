import React, { useState } from 'react';
import { Square, CheckCircle2, Copy, Check, CheckSquare, HelpCircle, PenTool, Award, ArrowRight, AlertCircle, Zap, GraduationCap } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import { errorBankService } from '../services/errorBankService';

interface NotebookAuditorProps {
  lesson: LessonData;
  onProceedToHolyTrinity: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

export const NotebookAuditor: React.FC<NotebookAuditorProps> = ({
  lesson,
  onProceedToHolyTrinity,
  onNavigateTab
}) => {
  const checklist = lesson.notebookChecklist || [];
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedToBankIds, setSavedToBankIds] = useState<string[]>([]);

  const toggleCheck = (id: string) => {
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCopyNote = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToErrorBank = (id: string, req: string, whyNeeded: string, notes: string) => {
    errorBankService.recordNotebookMissingItem(req, whyNeeded, notes, lesson, id);
    setSavedToBankIds(prev => [...prev, id]);
  };

  const totalItems = checklist.length;
  const checkedCount = checkedIds.length;
  const coveragePercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 100;

  // Grade prediction based on student's actual notebook content
  const getAuditVerdict = () => {
    if (coveragePercent >= 90) {
      return {
        verdict: 'Тетрадката покрива критериите за Отличен 6.00',
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        desc: 'Всички ключови акценти, дати и дефиниции по държавния стандарт на МОН са налични.'
      };
    }
    if (coveragePercent >= 60) {
      return {
        verdict: 'Частично покритие — очаквана оценка 4.50 – 5.00',
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        desc: 'Налице са пропуски в задължителните формулировки. Препоръчва се нанасяне на липсващите бележки.'
      };
    }
    return {
      verdict: 'Критични пропуски за изпит — оценка под 4.00',
      badge: 'bg-rose-50 text-rose-800 border-rose-200',
      desc: 'Липсват базови дефиниции и структурни елементи, които са обект на задължителна проверка.'
    };
  };

  const auditInfo = getAuditVerdict();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {lesson.subject}
              </span>
              <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-medium">
                {lesson.grade}
              </span>
              {lesson.examType && (
                <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                  {lesson.examType}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
                <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Одит по стандартите на МОН</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Задължителни изисквания за тема „{lesson.title}“
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Сравнете записките в тетрадката с официалните образователни изисквания на МОН. Отбележете наличните елементи и копирайте липсващите за оформяне на пълен конспект.
            </p>
          </div>

          {/* Coverage Gauge */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-200 shadow-2xs min-w-[190px] text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Степен на покритие
            </span>
            <div className="text-3xl font-extrabold text-slate-900 my-1 font-mono">
              {coveragePercent}%
            </div>
            <span className="text-[11px] text-slate-500">
              {checkedCount} от {totalItems} задължителни точки
            </span>
          </div>
        </div>

        {/* Verdict Box & Action Navigation */}
        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold border mb-1.5 ${auditInfo.badge}`}>
              {auditInfo.verdict}
            </span>
            <div className="text-xs text-slate-600">
              {auditInfo.desc}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onProceedToHolyTrinity}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs whitespace-nowrap"
            >
              <span>Към Конспекта</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
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
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Детайлен чек-лист по официалната програма:
          </h3>
          <span className="text-xs text-slate-500">
            {checkedCount} / {totalItems} отбелязани
          </span>
        </div>

        {checklist.map((item, idx) => {
          const isChecked = checkedIds.includes(item.id);
          const isCopied = copiedId === item.id;
          const isSavedToBank = savedToBankIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all ${
                isChecked
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Interactive Checkbox */}
                <button
                  onClick={() => toggleCheck(item.id)}
                  className="mt-0.5 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                  aria-label={isChecked ? 'Отмаркирай' : 'Маркирай като налично'}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-medium text-slate-500">
                      Точка {idx + 1}
                    </span>
                    {item.isEssentialForSix && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>Критерий за 6.00</span>
                      </span>
                    )}
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                      isChecked
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {isChecked ? 'Налично в тетрадката' : 'Липсва'}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {item.requirement}
                  </h4>

                  <div className="mt-1.5 text-xs text-slate-600 flex items-start gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-slate-800">Методическа цел:</strong> {item.whyNeeded}</span>
                  </div>

                  {/* Missing notes copy & Error Bank save box */}
                  <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                      <PenTool className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900">Формулировка за записките:</span>{' '}
                        <span className="font-mono text-slate-800 text-[11px]">{item.suggestedNotes}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleSaveToErrorBank(item.id, item.requirement, item.whyNeeded, item.suggestedNotes)}
                        disabled={isSavedToBank}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                          isSavedToBank
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 cursor-default'
                            : 'bg-white hover:bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                        title="Запази като пропуск за преговор в Банката с грешки"
                      >
                        {isSavedToBank ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>В Банката</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Запази в Банка с грешки</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleCopyNote(item.id, item.suggestedNotes)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{isCopied ? 'Копирано' : 'Копирай'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
