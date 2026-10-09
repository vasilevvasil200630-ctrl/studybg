import React, { useState } from 'react';
import { Copy, Check, Calendar, AlertTriangle, ArrowRight, ShieldCheck, CheckSquare, Zap, GraduationCap, Clock, Printer, Mail } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import { AudioReader } from './AudioReader';
import { EmailShareModal } from './EmailShareModal';

interface SummaryViewProps {
  lesson: LessonData;
  onProceedToFlashcards: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  lesson,
  onProceedToFlashcards,
  onNavigateTab
}) => {
  const [copied, setCopied] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { summary } = lesson;

  const handleCopy = () => {
    const textToCopy = `Урок: ${lesson.title}\nПредмет: ${lesson.subject}\n\nОБЩ ПРЕГЛЕД:\n${summary.overview}\n\nКЛЮЧОВИ ТОЧКИ:\n${summary.keyPoints.join('\n- ')}\n\nЗЛАТНО ПРАВИЛО ЗА КОНТРОЛНОТО:\n${summary.examGoldenRule}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const fullSummaryAudioText = `${lesson.title}. ${summary.overview}. Главни акценти: ${summary.keyPoints.join('. ')}. Златно правило за отлична оценка: ${summary.examGoldenRule}`;

  return (
    <div className="space-y-6">
      {/* Header bar with meta and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {lesson.subject}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {lesson.grade}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>МОН Синтезиран конспект</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {lesson.title}
          </h2>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Audio speech reader */}
          <AudioReader textToRead={fullSummaryAudioText} />

          {/* Direct Print */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs"
            title="Принтирай конспекта директно"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Печат</span>
          </button>

          {/* Email Modal Button */}
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs"
            title="Изпрати този конспект на имейл"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>На имейл</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Копирано' : 'Копирай'}</span>
          </button>

          {/* Next step in Holy Trinity */}
          <button
            onClick={onProceedToFlashcards}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors ml-auto sm:ml-0 shadow-xs"
          >
            <span>Към Флашкарти</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Half-Page Summary Card */}
      <div className="p-5 sm:p-7 rounded-xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        {/* Overview text */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Синтезиран преглед на темата:
          </h3>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
            {summary.overview}
          </p>
        </div>

        {/* 2-Column Grid: Key Points & Formulas/Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Key Bullet Points */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Основни тези и акценти:</span>
            </h4>
            <ul className="space-y-2.5">
              {summary.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="text-blue-600 font-bold text-xs mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Dates / Formulas Table */}
          {summary.formulasOrDates && summary.formulasOrDates.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Ключови дати, термини и формули:</span>
              </h4>
              <div className="space-y-2">
                {summary.formulasOrDates.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs shadow-2xs"
                  >
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="font-mono text-slate-900 font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Golden Rule: What teachers look for for a 6.00 */}
        <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200 my-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white text-emerald-700 border border-emerald-200 shadow-2xs flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Златното правило за оценка Отличен (6.00):
              </h4>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed mt-1">
                {summary.examGoldenRule}
              </p>
            </div>
          </div>
        </div>

        {/* Common Traps in Exams */}
        {summary.commonTraps && summary.commonTraps.length > 0 && (
          <div className="p-4 sm:p-5 rounded-xl bg-rose-50 border border-rose-200 my-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white text-rose-700 border border-rose-200 shadow-2xs flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                  Типични капани и грешки на изпити:
                </h4>
                <ul className="space-y-1">
                  {summary.commonTraps.map((trap, idx) => (
                    <li key={idx} className="text-xs text-rose-950 flex items-start gap-2">
                      <span className="text-rose-600 font-bold">⚠️</span>
                      <span>{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions to other tabs */}
        {onNavigateTab && (
          <div className="mt-8 pt-5 border-t border-slate-200">
            <div className="text-xs font-semibold text-slate-500 mb-3">
              Продължи подготовката по този урок:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => onNavigateTab('audit')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all shadow-2xs"
              >
                <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Одит 6.00</span>
              </button>
              <button
                onClick={() => onNavigateTab('flashcards')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Флаш карти</span>
              </button>
              <button
                onClick={() => onNavigateTab('quiz')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all shadow-2xs"
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Тест</span>
              </button>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all shadow-2xs"
              >
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Симулатор</span>
              </button>
            </div>
          </div>
        )}

        {/* Curriculum Standard Attribution */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Учебен конспект по държавните образователни стандарти</span>
          <span className="font-medium text-slate-600">Официална учебна програма на МОН</span>
        </div>
      </div>

      {/* Email Share Modal */}
      <EmailShareModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        lesson={lesson}
      />
    </div>
  );
};
