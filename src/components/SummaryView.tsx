import React, { useState } from 'react';
import { BookOpen, Copy, Check, Calendar, AlertTriangle, FileText, Timer as TimerIcon, ArrowRight, ShieldCheck, CheckSquare, Zap, GraduationCap, MessageSquare, Clock } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import { AudioReader } from './AudioReader';
import { CheatSheetModal } from './CheatSheetModal';
import { FiveMinuteTimer } from './FiveMinuteTimer';

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
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const { summary } = lesson;

  const handleCopy = () => {
    const textToCopy = `Урок: ${lesson.title}\nПредмет: ${lesson.subject}\n\nОБЩ ПРЕГЛЕД:\n${summary.overview}\n\nКЛЮЧОВИ ТОЧКИ:\n${summary.keyPoints.join('\n- ')}\n\nЗЛАТНО ПРАВИЛО ЗА КОНТРОЛНОТО:\n${summary.examGoldenRule}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fullSummaryAudioText = `${lesson.title}. ${summary.overview}. Главни акценти: ${summary.keyPoints.join('. ')}. Златно правило за отлична оценка: ${summary.examGoldenRule}`;

  return (
    <div className="space-y-6">
      {/* 5-minute Study Sprint Bar */}
      {showTimer && <FiveMinuteTimer />}

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
          {/* Toggle Timer button */}
          <button
            onClick={() => setShowTimer(!showTimer)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showTimer
                ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
            }`}
            title="Превключване на 5-минутния таймер"
          >
            <TimerIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>{showTimer ? 'Скрий таймера' : '5 мин таймер'}</span>
          </button>

          {/* Audio speech reader */}
          <AudioReader textToRead={fullSummaryAudioText} />

          {/* Printable CheatSheet */}
          <button
            onClick={() => setShowCheatSheet(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs"
            title="Отвори пищов за печат"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Пищов за печат</span>
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
        {/* Subtle badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-5">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Синтезиран материал • Обобщение на половин страница</span>
        </div>

        {/* Overview paragraph */}
        <div className="text-slate-800 leading-relaxed text-sm sm:text-base font-normal p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 mb-6">
          {summary.overview}
        </div>

        {/* Key Points */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Главни акценти по учебната програма:</span>
          </h3>

          <ul className="space-y-2.5">
            {summary.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-blue-100 border border-blue-200 text-blue-700 font-mono font-bold text-xs flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-slate-800 text-sm leading-snug">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dates or Formulas Grid */}
        {summary.formulasOrDates && summary.formulasOrDates.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Формули, хронология и ключови стойности:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {summary.formulasOrDates.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <span className="text-slate-600 text-xs font-medium">{item.label}</span>
                  <span className="text-slate-900 font-bold text-sm mt-1 font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exam Golden Rule */}
        <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3.5 mb-6">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Златно правило за отличен (6.00) на изпита
            </h4>
            <p className="mt-1 text-sm font-semibold text-emerald-950 leading-snug">
              {summary.examGoldenRule}
            </p>
          </div>
        </div>

        {/* Common Traps / Misconceptions */}
        <div className="p-4 sm:p-5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-rose-100 text-rose-700 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Типични грешки и капани на изпити
            </h4>
            <ul className="mt-1.5 space-y-1.5 text-xs text-rose-900">
              {summary.commonTraps.map((trap, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{trap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cross-Link Action Hub */}
        {onNavigateTab && (
          <div className="mt-6 pt-5 border-t border-slate-200">
            <span className="text-xs font-bold uppercase text-slate-700 tracking-wider block mb-3">
              Следващи стъпки за подготовка по „{lesson.title}“:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              <button
                onClick={() => onNavigateTab('audit')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200 transition-colors"
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>Одит за 6.00</span>
              </button>

              <button
                onClick={() => onNavigateTab('flashcards')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Флаш карти</span>
              </button>

              <button
                onClick={() => onNavigateTab('quiz')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Реши тест</span>
              </button>

              <button
                onClick={() => onNavigateTab('simulator')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200 transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Симулатор (100т.)</span>
              </button>

              <button
                onClick={() => onNavigateTab('chat')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200 transition-colors col-span-2 sm:col-span-1"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Питай ментора</span>
              </button>
            </div>
          </div>
        )}

        {/* Original Excerpt Toggle info */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Източник: Ръкописни бележки от ученическа тетрадка</span>
          <span className="font-mono text-slate-600">StudyBG OCR Engine • МОН Стандарт 2026</span>
        </div>
      </div>

      {/* Printable CheatSheet Modal */}
      {showCheatSheet && (
        <CheatSheetModal
          lesson={lesson}
          onClose={() => setShowCheatSheet(false)}
        />
      )}
    </div>
  );
};
