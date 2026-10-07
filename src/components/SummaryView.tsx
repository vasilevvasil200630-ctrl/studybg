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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {lesson.subject}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {lesson.grade}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3" />
              <span>МОН Синтезиран конспект</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
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
                ? 'bg-indigo-600/10 text-indigo-300 border-indigo-500/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-white border-slate-700/60'
            }`}
            title="Превключване на 5-минутния таймер"
          >
            <TimerIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>{showTimer ? 'Скрий таймера' : '5 мин таймер'}</span>
          </button>

          {/* Audio speech reader */}
          <AudioReader textToRead={fullSummaryAudioText} />

          {/* Printable CheatSheet */}
          <button
            onClick={() => setShowCheatSheet(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
            title="Отвори пищов за печат"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Пищов за печат</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Копирано' : 'Копирай'}</span>
          </button>

          {/* Next step in Holy Trinity */}
          <button
            onClick={onProceedToFlashcards}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors ml-auto sm:ml-0 shadow-sm"
          >
            <span>Към Флашкарти</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Half-Page Summary Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Subtle badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium mb-5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>Синтезиран материал • Обобщение на половин страница</span>
        </div>

        {/* Overview paragraph */}
        <div className="text-slate-200 leading-relaxed text-sm sm:text-base font-normal p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800 mb-6">
          {summary.overview}
        </div>

        {/* Key Points */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Главни акценти по учебната програма:</span>
          </h3>

          <ul className="space-y-2.5">
            {summary.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/40 border border-slate-800/70">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-slate-300 text-sm leading-snug">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dates or Formulas Grid */}
        {summary.formulasOrDates && summary.formulasOrDates.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>Формули, хронология и ключови стойности:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {summary.formulasOrDates.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between">
                  <span className="text-slate-400 text-xs font-medium">{item.label}</span>
                  <span className="text-slate-100 font-bold text-sm mt-1 font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exam Golden Rule */}
        <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3.5 mb-6">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Златно правило за отличен (6.00) на изпита
            </h4>
            <p className="mt-1 text-sm font-semibold text-emerald-200 leading-snug">
              {summary.examGoldenRule}
            </p>
          </div>
        </div>

        {/* Common Traps / Misconceptions */}
        <div className="p-4 sm:p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Типични грешки и капани на изпити
            </h4>
            <ul className="mt-1.5 space-y-1.5 text-xs text-rose-200">
              {summary.commonTraps.map((trap, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{trap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cross-Link Action Hub */}
        {onNavigateTab && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider block mb-3">
              Следващи стъпки за подготовка по „{lesson.title}“:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              <button
                onClick={() => onNavigateTab('audit')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Одит за 6.00</span>
              </button>

              <button
                onClick={() => onNavigateTab('flashcards')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Флаш карти</span>
              </button>

              <button
                onClick={() => onNavigateTab('quiz')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Реши тест</span>
              </button>

              <button
                onClick={() => onNavigateTab('simulator')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Симулатор (100т.)</span>
              </button>

              <button
                onClick={() => onNavigateTab('chat')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 hover:border-slate-700 transition-colors col-span-2 sm:col-span-1"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Питай ментора</span>
              </button>
            </div>
          </div>
        )}

        {/* Original Excerpt Toggle info */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Източник: Ръкописни бележки от ученическа тетрадка</span>
          <span className="font-mono text-slate-400">StudyBG OCR Engine • МОН Стандарт 2026</span>
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
