import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckSquare,
  Zap,
  GraduationCap,
  Clock,
  Printer,
  Mail,
  Mic,
  FlaskConical,
  BookOpen,
  PenTool,
  CheckCircle2,
  Trash2,
  Sparkles,
  Send,
  RefreshCw
} from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import { AudioReader } from './AudioReader';
import { EmailShareModal } from './EmailShareModal';
import { askGeminiMentor, isAiAvailable, isGeminiConfigured, AI_PROVIDER_LABEL } from '../services/geminiService';

interface SummaryViewProps {
  lesson: LessonData;
  onProceedToFlashcards: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

const MASTERED_STORAGE_KEY = 'studybg_planner_mastered_lessons_v1';

export const SummaryView: React.FC<SummaryViewProps> = ({
  lesson,
  onProceedToFlashcards,
  onNavigateTab
}) => {
  const [copied, setCopied] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isMastered, setIsMastered] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  // Interactive Gemini AI Mentor State
  const [mentorQuestion, setMentorQuestion] = useState('');
  const [mentorHistory, setMentorHistory] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([]);
  const [isMentorLoading, setIsMentorLoading] = useState(false);
  const [mentorError, setMentorError] = useState<string | null>(null);

  const { summary } = lesson;
  const noteStorageKey = `studybg_lesson_notes_v1_${lesson.id}`;

  // Sync mastered status and personal note when lesson changes
  useEffect(() => {
    setMentorHistory([]);
    setMentorQuestion('');
    setMentorError(null);
    try {
      const rawMastered = localStorage.getItem(MASTERED_STORAGE_KEY);
      if (rawMastered) {
        const parsed: string[] = JSON.parse(rawMastered);
        setIsMastered(Array.isArray(parsed) && parsed.includes(lesson.id));
      } else {
        setIsMastered(false);
      }

      const savedNote = localStorage.getItem(noteStorageKey);
      setPersonalNote(savedNote || '');
    } catch {
      setIsMastered(false);
      setPersonalNote('');
    }
  }, [lesson.id, noteStorageKey]);

  const handleAskMentor = async (customPrompt?: string) => {
    const q = (customPrompt ?? mentorQuestion).trim();
    if (!q || isMentorLoading) return;
    setMentorError(null);
    if (!customPrompt) setMentorQuestion('');

    const nextHistory: { sender: 'user' | 'assistant'; text: string }[] = [
      ...mentorHistory,
      { sender: 'user', text: q }
    ];
    setMentorHistory(nextHistory);
    setIsMentorLoading(true);

    try {
      if (isAiAvailable()) {
        const aiReply = await askGeminiMentor(lesson, mentorHistory, q);
        setMentorHistory([...nextHistory, { sender: 'assistant', text: aiReply }]);
      } else {
        const fallbackReply = `📌 Синтез по МОН за „${lesson.title}“:\n• Основен акцент: ${lesson.summary.overview}\n• Златно правило за Отличен 6.00: ${lesson.summary.examGoldenRule}\n• Ключов капан на изпит: ${lesson.summary.commonTraps?.[0] || 'Внимавайте за точното използване на терминологията.'}`;
        setMentorHistory([...nextHistory, { sender: 'assistant', text: fallbackReply }]);
      }
    } catch (err: any) {
      setMentorError(err?.message || 'Възникна временна грешка при връзка с AI ментора.');
    } finally {
      setIsMentorLoading(false);
    }
  };

  const handleToggleMastered = () => {
    try {
      const rawMastered = localStorage.getItem(MASTERED_STORAGE_KEY);
      const parsed: string[] = rawMastered ? JSON.parse(rawMastered) : [];
      const currentList = Array.isArray(parsed) ? parsed : [];
      let updated: string[];
      if (currentList.includes(lesson.id)) {
        updated = currentList.filter((id) => id !== lesson.id);
        setIsMastered(false);
      } else {
        updated = [...currentList, lesson.id];
        setIsMastered(true);
      }
      localStorage.setItem(MASTERED_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const handleNoteChange = (value: string) => {
    setPersonalNote(value);
    try {
      localStorage.setItem(noteStorageKey, value);
      setNoteSavedToast(true);
      setTimeout(() => setNoteSavedToast(false), 1500);
    } catch {
      // Ignore storage errors
    }
  };

  const handleInsertTemplate = () => {
    const template = `📌 План за преговор по „${lesson.title}“:\n1. Ключова теза / формула: \n2. Важни дати и имена: \n3. Въпрос за доуточняване в час: `;
    const nextValue = personalNote ? `${personalNote}\n\n${template}` : template;
    handleNoteChange(nextValue);
  };

  const handleCopy = () => {
    const textToCopy = `Урок: ${lesson.title}\nПредмет: ${lesson.subject}\n\nОБЩ ПРЕГЛЕД:\n${summary.overview}\n\nКЛЮЧОВИ ТОЧКИ:\n${summary.keyPoints.join('\n- ')}\n\nЗЛАТНО ПРАВИЛО ЗА КОНТРОЛНОТО:\n${summary.examGoldenRule}${personalNote ? `\n\nМОИ БЕЛЕЖКИ:\n${personalNote}` : ''}`;
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
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
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
            <button
              onClick={handleToggleMastered}
              className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-bold border transition-all cursor-pointer ${
                isMastered
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-emerald-800 border-slate-300'
              }`}
              title="Отбележи този урок като научен в твоя План за 6.00"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>{isMastered ? 'Усвоен урок ✓' : 'Отбележи за научен'}</span>
            </button>
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs cursor-pointer"
            title="Принтирай конспекта директно"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Печат</span>
          </button>

          {/* Email Modal Button */}
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs cursor-pointer"
            title="Изпрати този конспект на имейл"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>На имейл</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Копирано' : 'Копирай'}</span>
          </button>

          {/* Next step in Holy Trinity */}
          <button
            onClick={onProceedToFlashcards}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors ml-auto sm:ml-0 shadow-xs cursor-pointer"
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
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs shadow-2xs gap-2"
                  >
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="font-mono text-slate-900 font-bold text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Key Definitions Dictionary Section */}
        {lesson.flashcards && lesson.flashcards.length > 0 && (
          <div className="my-6 p-4 sm:p-5 rounded-xl bg-blue-50/50 border border-blue-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Терминологичен речник и ключови въпроси за изпит ({lesson.flashcards.length}):</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.flashcards.map((card) => (
                <div
                  key={card.id}
                  className="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs space-y-1"
                >
                  <div className="text-xs font-extrabold text-blue-900">{card.front}</div>
                  <p className="text-xs text-slate-700 leading-relaxed">{card.back}</p>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* Interactive Gemini AI Academic Mentor */}
        <div className="my-6 p-4 sm:p-5 rounded-xl bg-blue-50/70 border border-blue-200/90 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-950">
                🤖 Попитай AI Ментора за този урок ({AI_PROVIDER_LABEL})
              </h4>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              {isGeminiConfigured() ? `● ${AI_PROVIDER_LABEL} е активен` : '● МОН Академичен Асистент'}
            </span>
          </div>

          {/* 1-Click Quick Academic Prompts */}
          <div className="flex flex-wrap gap-1.5">
            {[
              {
                label: '🎯 Какво най-често се пада на изпит?',
                prompt: `Кои са най-важните акценти, формули или въпроси от урока „${lesson.title}“, които най-често се падат на матура (ДЗИ) или контролно по МОН, и как да гарантирам Отличен 6.00?`
              },
              {
                label: '🧠 Обясни ми най-трудните понятия лесно',
                prompt: `Обясни ми по най-ясен и запомнящ се начин (с конкретен пример) най-трудните понятия от урока „${lesson.title}“.`
              },
              {
                label: '✍️ Формулирай ми силна теза за 6.00',
                prompt: `Формулирай ми кратка, академично издържана теза (или структурен план за писмен отговор за 6.00) по темата „${lesson.title}“.`
              },
              {
                label: '❓ Изпитай ме с 1 отворен въпрос',
                prompt: `Задай ми 1 отворен изпитен въпрос за Отличен 6.00 върху урока „${lesson.title}“ и посочи 3-те ключови критерия, които трябва да съдържа моят отговор.`
              }
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                disabled={isMentorLoading}
                onClick={() => handleAskMentor(chip.prompt)}
                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-blue-600 text-blue-900 hover:text-white border border-blue-200 hover:border-blue-600 text-[11px] font-bold transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Conversation Thread */}
          {mentorHistory.length > 0 && (
            <div className="space-y-2.5 max-h-96 overflow-y-auto p-3 rounded-xl bg-white border border-blue-100">
              {mentorHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white ml-6 font-medium'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 mr-2 space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  {msg.sender === 'assistant' && (
                    <div className="pt-1.5 border-t border-slate-200/70 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const nextVal = personalNote ? `${personalNote}\n\n🤖 AI Ментор:\n${msg.text}` : `🤖 AI Ментор:\n${msg.text}`;
                          handleNoteChange(nextVal);
                        }}
                        className="text-[11px] font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                      >
                        + Запиши в личния бележник ↓
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {isMentorLoading && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-blue-700 font-semibold flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                  <span>AI Менторът подготвя отговор по учебната програма...</span>
                </div>
              )}
            </div>
          )}

          {mentorError && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {mentorError}
            </div>
          )}

          {/* Custom Question Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleAskMentor();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={mentorQuestion}
              onChange={(e) => setMentorQuestion(e.target.value)}
              placeholder={`Попитай AI ментора всичко за „${lesson.title.slice(0, 42)}...“`}
              className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-blue-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isMentorLoading || !mentorQuestion.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Попитай</span>
            </button>
          </form>
        </div>

        {/* Interactive Personal Study Notes / Scratchpad */}
        <div className="my-6 p-4 sm:p-5 rounded-xl bg-amber-50/60 border border-amber-200/90 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-amber-700" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
                Моят личен бележник към урока (Автоматичен запис)
              </h4>
              {noteSavedToast && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Записано ✓
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleInsertTemplate}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                + Шаблон за преговор
              </button>
              {personalNote && (
                <button
                  type="button"
                  onClick={() => handleNoteChange('')}
                  className="p-1 rounded-lg bg-white hover:bg-slate-100 text-slate-500 hover:text-rose-700 border border-slate-200 transition-colors cursor-pointer"
                  title="Изчисти бележките"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <textarea
            value={personalNote}
            onChange={(e) => handleNoteChange(e.target.value)}
            rows={4}
            placeholder="Запиши свои бележки, важни цитати, формули или насоки от учителя по тази тема... Те се запазват автоматично за този урок."
            className="w-full p-3 rounded-xl bg-white border border-amber-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 leading-relaxed"
          />
        </div>

        {/* Quick Actions to other tabs */}
        {onNavigateTab && (
          <div className="mt-8 pt-5 border-t border-slate-200">
            <div className="text-xs font-semibold text-slate-500 mb-3">
              Продължи подготовката по този урок:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              <button
                onClick={() => onNavigateTab('oralexam')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5 text-blue-600" />
                <span>Устен изпит</span>
              </button>
              <button
                onClick={() => onNavigateTab('audit')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all shadow-2xs cursor-pointer"
              >
                <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Одит 6.00</span>
              </button>
              <button
                onClick={() => onNavigateTab('flashcards')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all shadow-2xs cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Флаш карти</span>
              </button>
              <button
                onClick={() => onNavigateTab('quiz')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all shadow-2xs cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Тест ({lesson.quiz.length})</span>
              </button>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all shadow-2xs cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Симулатор</span>
              </button>
              <button
                onClick={() => onNavigateTab('sciencelab')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                <span>Научна Лаб</span>
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
