import React, { useState } from 'react';
import { BookOpen, Copy, Check, Award, Calendar, Sparkles, AlertTriangle, FileDown, Timer as TimerIcon } from 'lucide-react';
import type { LessonData } from '../types';
import { AudioReader } from './AudioReader';
import { CheatSheetModal } from './CheatSheetModal';
import { FiveMinuteTimer } from './FiveMinuteTimer';

interface SummaryViewProps {
  lesson: LessonData;
  onProceedToFlashcards: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({ lesson, onProceedToFlashcards }) => {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#14182e] border border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {lesson.subject}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {lesson.grade}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {lesson.title}
          </h2>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Timer button */}
          <button
            onClick={() => setShowTimer(!showTimer)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              showTimer
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
            }`}
            title="Превключи 5-минутния таймер"
          >
            <TimerIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>{showTimer ? 'Скрий таймера' : '5 мин таймер'}</span>
          </button>

          {/* Audio speech reader */}
          <AudioReader textToRead={fullSummaryAudioText} />

          {/* Printable CheatSheet */}
          <button
            onClick={() => setShowCheatSheet(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all"
            title="Отвори чист пищов за принтиране"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Пищов 📑</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Копирано' : 'Копирай'}</span>
          </button>

          {/* Next step in Holy Trinity */}
          <button
            onClick={onProceedToFlashcards}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-md shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all ml-auto sm:ml-0"
          >
            <span>Към Флашкарти</span>
            <span>⚡</span>
          </button>
        </div>
      </div>

      {/* Main Half-Page Summary Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111425] border border-white/10 shadow-xl relative overflow-hidden">
        {/* Subtle glowing badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Светата троица: Част 1 — Най-важното на половин страница</span>
        </div>

        {/* Overview paragraph */}
        <div className="text-slate-200 leading-relaxed text-base sm:text-lg font-medium p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 mb-6">
          {summary.overview}
        </div>

        {/* Key Points */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Главни акценти за урока:</span>
          </h3>

          <ul className="space-y-3">
            {summary.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center mt-0.5">
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>Ключови хронологии и формули:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {summary.formulasOrDates.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#161a33] border border-sky-500/20 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-sky-400">{item.label}</span>
                  <span className="text-sm font-bold text-white mt-0.5">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Golden Rule for Grade 6 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#121c2c] border border-emerald-500/30 mb-6 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Златно правило за контролно (Оценка 6.00)
            </h4>
            <p className="text-sm font-semibold text-emerald-100 mt-1">
              {summary.examGoldenRule}
            </p>
          </div>
        </div>

        {/* Common Traps / Misconceptions */}
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/30 border border-rose-500/25 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-400">
              Чести клопки и грешки на изпити
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

        {/* Original Excerpt Toggle info */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>Оригинален източник: Ръкописни записки от тетрадка</span>
          <span className="font-mono text-indigo-400">Smart Scan OCR v2.4 • МОН Стандарт</span>
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
