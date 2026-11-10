import React, { useState, useEffect, useMemo } from 'react';
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
  RefreshCw,
  Layers,
  Award,
  Compass,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import { AudioReader } from './AudioReader';
import { EmailShareModal } from './EmailShareModal';
import { RichText } from './RichText';
import { askGeminiMentor, isAiAvailable, isGeminiConfigured, AI_PROVIDER_LABEL } from '../services/geminiService';
import { studyProgressService } from '../services/studyProgressService';
import { getLessonAcademicMetadata } from '../lib/curriculumStructure';
import { loadTopicDetails, type MonTopicDetails } from '../data/monCurriculum';

interface SummaryViewProps {
  lesson: LessonData;
  onProceedToFlashcards: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

const OPTION_LETTERS = ['А', 'Б', 'В', 'Г', 'Д'];

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
  const academicMeta = useMemo(() => getLessonAcademicMetadata(lesson), [lesson]);
  const [monDetails, setMonDetails] = useState<MonTopicDetails | null>(null);

  // Sync mastered status, personal note, and official MON topic outcomes/concepts when lesson changes
  useEffect(() => {
    setMentorHistory([]);
    setMentorQuestion('');
    setMentorError(null);
    try {
      setIsMastered(studyProgressService.isLessonMastered(lesson.id));
      const savedNote = localStorage.getItem(noteStorageKey);
      setPersonalNote(savedNote || '');
    } catch {
      setIsMastered(false);
      setPersonalNote('');
    }

    const firstTopicId = lesson.monTopicIds?.[0];
    if (!firstTopicId) {
      setMonDetails(null);
      return;
    }
    let cancelled = false;
    loadTopicDetails(firstTopicId)
      .then((res) => {
        if (!cancelled) setMonDetails(res);
      })
      .catch(() => {
        if (!cancelled) setMonDetails(null);
      });
    return () => {
      cancelled = true;
    };
  }, [lesson.id, lesson.monTopicIds, noteStorageKey]);

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
        const fallbackReply = `Синтез по МОН за „${lesson.title}“:\n• Основен акцент: ${lesson.summary.overview}\n• Златно правило за Отличен 6.00: ${lesson.summary.examGoldenRule}\n• Ключов капан на изпит: ${lesson.summary.commonTraps?.[0] || 'Внимавайте за точното използване на терминологията.'}`;
        setMentorHistory([...nextHistory, { sender: 'assistant', text: fallbackReply }]);
      }
    } catch (err: unknown) {
      setMentorError(err instanceof Error && err.message ? err.message : 'Възникна временна грешка при връзка с AI ментора.');
    } finally {
      setIsMentorLoading(false);
    }
  };

  const handleToggleMastered = () => {
    const updated = studyProgressService.toggleMasteredLesson(lesson.id);
    setIsMastered(updated.masteredLessonIds.includes(lesson.id));
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
    const template = `План за преговор по „${lesson.title}“:\n1. Ключова теза / формула: \n2. Важни дати и имена: \n3. Въпрос за доуточняване в час: `;
    const nextValue = personalNote ? `${personalNote}\n\n${template}` : template;
    handleNoteChange(nextValue);
  };

  const handleCopy = () => {
    const textToCopy = `Урок: ${lesson.title}\nПредмет: ${lesson.subject} (${lesson.grade})\nЕтап: ${academicMeta.stageTitle}\nПодготовка: ${academicMeta.sectionLabel}\n\nI. ТЕОРЕТИЧЕН СИНТЕЗ:\n${summary.overview}\n\nII. ОСНОВНИ ТЕЗИ И АКЦЕНТИ:\n- ${summary.keyPoints.join('\n- ')}\n\nIII. ЗЛАТНО ПРАВИЛО ЗА 6.00:\n${summary.examGoldenRule}${personalNote ? `\n\nМОИ БЕЛЕЖКИ:\n${personalNote}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const fullSummaryAudioText = `${lesson.title}. ${summary.overview}. Главни акценти: ${summary.keyPoints.join('. ')}. Златно правило за отлична оценка: ${summary.examGoldenRule}`;

  const workedExamCases = useMemo(() => lesson.quiz.slice(0, 3), [lesson.quiz]);

  return (
    <div className="space-y-6">
      {/* Действия по урока: отбелязване, четене, печат, споделяне и следващата стъпка */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={handleToggleMastered}
          aria-pressed={isMastered}
          className={`inline-flex items-center gap-1.5 self-start rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
            isMastered
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
          }`}
          title="Отбележи урока като научен в плана си"
        >
          <CheckCircle2 className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-600' : 'text-slate-500'}`} aria-hidden="true" />
          <span>{isMastered ? 'Урокът е научен' : 'Отбележи като научен'}</span>
        </button>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Audio speech reader */}
          <AudioReader textToRead={fullSummaryAudioText} />

          {/* Direct Print */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="Принтирай конспекта директно"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Печат</span>
          </button>

          {/* Email Modal Button */}
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="Изпрати този конспект на имейл"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>На имейл</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Копирано' : 'Копирай'}</span>
          </button>

          {/* Next step in Holy Trinity */}
          <button
            onClick={onProceedToFlashcards}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-brand-sapphire hover:bg-brand-sapphire-dark text-white transition-colors ml-auto sm:ml-0 shadow-xs cursor-pointer"
          >
            <span>Към флашкартите</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Structured Academic Dossier Card */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden space-y-7">
        {/* ПАСПОРТ НА ТЕМАТА ПО ДОС НА МОН */}
        <section
          aria-label="Академичен паспорт на темата по МОН"
          className="rounded-xl bg-slate-50 border border-slate-200/90 p-4 sm:p-5 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 text-white shadow-2xs">
                <Layers className="w-3.5 h-3.5" />
                <span>Академичен паспорт на темата по ДОС на МОН</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white text-slate-800 border border-slate-200">
                {academicMeta.sectionShort}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-900 border border-blue-200">
                {academicMeta.stageShort} · {lesson.grade}
              </span>
            </div>
            {lesson.examType && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Изпитен формат: {lesson.examType}</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white border border-slate-200/80 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Етап, раздел и модул по МОН
              </div>
              <div className="font-bold text-slate-900">{academicMeta.thematicDomain}</div>
              {academicMeta.monSubSection && (
                <div className="text-[11px] font-semibold text-blue-800">
                  Раздел: {academicMeta.monSubSection}
                </div>
              )}
              <div className="text-slate-600 leading-snug">{academicMeta.monModuleLabel}</div>
              {academicMeta.monPdfUrl && (
                <a
                  href={academicMeta.monPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 pt-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 underline"
                >
                  <span>Официална учебна програма (PDF на МОН)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200/80 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Профили и видове гимназии
              </div>
              <div className="flex flex-wrap gap-1">
                {academicMeta.matchingProfiles.length > 0 ? (
                  academicMeta.matchingProfiles.map((prof) => (
                    <span
                      key={prof.id}
                      title={`${prof.name} (${prof.schoolsExample})`}
                      className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200/80 text-[11px] font-semibold"
                    >
                      {prof.shortName}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-700 font-semibold">
                    Всички профилирани, професионални гимназии и СУ
                  </span>
                )}
              </div>
              {lesson.audience && (
                <div className="text-[11px] text-slate-500">Аудитория: {lesson.audience}</div>
              )}
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200/80 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Изпитна тежест и обхват на разработката
              </div>
              <div className="font-semibold text-slate-800 leading-snug">
                {academicMeta.examWeightLabel}
              </div>
              <div className="text-[11px] text-blue-700 font-bold pt-0.5">
                {lesson.notebookChecklist?.length || summary.keyPoints.length} теоретични ядра ·{' '}
                {lesson.flashcards.length} понятия · {lesson.quiz.length} изпитни задачи
              </div>
            </div>
          </div>

          {/* Очаквани резултати от обучението (ДОС) */}
          <div className="p-3 rounded-lg bg-white border border-slate-200/80 space-y-2.5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-800 mb-1.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {monDetails && monDetails.outcomes.length > 0
                    ? `Очаквани резултати от учебната програма на МОН (${monDetails.outcomes.length}):`
                    : 'Очаквани компетентности и резултати от обучението по ДОС на МОН:'}
                </span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {(monDetails && monDetails.outcomes.length > 0
                  ? monDetails.outcomes.slice(0, 6)
                  : academicMeta.competencies
                ).map((comp, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5 leading-snug">
                    <span className="font-bold text-emerald-600 shrink-0">✓</span>
                    <span><RichText text={comp} /></span>
                  </li>
                ))}
              </ul>
            </div>

            {monDetails && monDetails.concepts.length > 0 && (
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500">
                  Нови понятия по програмата на МОН:
                </span>
                {monDetails.concepts.map((concept, cIdx) => (
                  <span
                    key={cIdx}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-semibold"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Навигация по 5-те академични раздела на разработката */}
          <nav
            aria-label="Структура на разработката"
            className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5"
          >
            <span className="text-[11px] font-bold text-slate-500 mr-1">Структура на темата:</span>
            {[
              { href: '#section-1-theory', label: 'I. Теоретичен синтез и тези' },
              {
                href: '#section-2-syllabus',
                label: `II. План-конспект по подтеми (${lesson.notebookChecklist?.length || summary.keyPoints.length})`,
              },
              {
                href: '#section-3-reference',
                label: `III. Формули, дати и речник (${(summary.formulasOrDates?.length ?? 0) + lesson.flashcards.length})`,
              },
              {
                href: '#section-4-worked-cases',
                label: `IV. Разбор на изпитни казуси (${workedExamCases.length})`,
              },
              { href: '#section-5-evaluation', label: 'V. Златно правило за 6.00 и AI Ментор' },
            ].map((navItem) => (
              <a
                key={navItem.href}
                href={navItem.href}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 hover:border-blue-300 text-[11px] font-semibold transition-colors"
              >
                {navItem.label}
              </a>
            ))}
          </nav>
        </section>

        {/* РАЗДЕЛ I: КОНЦЕПТУАЛНА РАМКА И ТЕОРЕТИЧЕН СИНТЕЗ */}
        <section id="section-1-theory" className="space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-xs">
              Раздел I
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Концептуална рамка, въведение и основни научни тези по темата
            </h3>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              1.1. Академично въведение и контекст на темата
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
              <RichText text={summary.overview} />
            </p>
            {lesson.originalNoteExcerpt && (
              <div className="pt-3 border-t border-slate-200/80">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Логическа схема и конспектна рамка по учебната програма:
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <RichText text={lesson.originalNoteExcerpt} />
                </p>
              </div>
            )}
          </div>

          {/* 1.2. Аналитична структура на основните тези */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>1.2. Фундаментални тези, закономерности и причинно-следствени връзки ({summary.keyPoints.length})</span>
            </h4>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {summary.keyPoints.map((point, index) => (
                <li
                  key={index}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed"
                >
                  <span className="shrink-0 px-2 py-0.5 rounded-md bg-blue-600 text-white font-bold text-[11px] tabular-nums mt-0.5">
                    Теза {index + 1}
                  </span>
                  <span className="font-medium"><RichText text={point} /></span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* РАЗДЕЛ II: СТРУКТУРЕН ПЛАН-КОНСПЕКТ ПО ПОДТЕМИ И МОДУЛИ */}
        <section id="section-2-syllabus" className="space-y-4 scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-xs">
                Раздел II
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Пълен структурен план-конспект по подтеми и критерии за Отличен (6.00)
              </h3>
            </div>
            {onNavigateTab && (
              <button
                type="button"
                onClick={() => onNavigateTab('quiz')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Решавай Тест върху материала ({lesson.quiz.length})</span>
              </button>
            )}
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/40 border border-blue-200/90 space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Всяка подтема по-долу представлява задължителен структурен модул от държавния образователен стандарт на МОН. При писмено или устно изпитване за оценка <strong>Отличен (6.00)</strong> проверителят търси следните конкретни елементи:
            </p>

            {lesson.notebookChecklist && lesson.notebookChecklist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {lesson.notebookChecklist.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-4 rounded-xl bg-white border border-blue-100 shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          Подтема 2.{idx + 1}: <RichText text={item.requirement} />
                        </span>
                        {item.isEssentialForSix && (
                          <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Критерий за 6.00
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <span className="font-semibold text-slate-700">Защо е важна на изпит: </span>
                        <RichText text={item.whyNeeded} />
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-900 font-medium leading-relaxed">
                      <span className="font-bold text-blue-800 block mb-0.5">
                        Задължително съдържание и аргументация:
                      </span>
                      <RichText text={item.suggestedNotes} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {summary.keyPoints.map((kp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-blue-100 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900">Подтема 2.{idx + 1}</div>
                    <p className="text-xs text-slate-700 leading-relaxed"><RichText text={kp} /></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* РАЗДЕЛ III: СИСТЕМАТИЗИРАН СПРАВОЧНИК — ФОРМУЛИ, ЗАКОНИ, ДАТИ И ТЕРМИНОЛОГИЧЕН РЕЧНИК */}
        <section id="section-3-reference" className="space-y-4 scroll-mt-24">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-xs">
              Раздел III
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Систематизиран справочник: Формули, закони, хронология и терминологичен речник
            </h3>
          </div>

          {summary.formulasOrDates && summary.formulasOrDates.length > 0 && (
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>3.1. Задължителни формули, дати, константи и класификации ({summary.formulasOrDates.length})</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {summary.formulasOrDates.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs gap-3"
                  >
                    <span className="text-slate-700 font-semibold"><RichText text={item.label} /></span>
                    <span className="tabular-nums text-slate-950 font-bold text-right bg-amber-50/80 border border-amber-200/80 px-2.5 py-1 rounded-lg">
                      <RichText text={item.value} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lesson.flashcards && lesson.flashcards.length > 0 && (
            <div className="p-4 sm:p-5 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>3.2. Терминологичен речник и еталонни отговори за изпит ({lesson.flashcards.length} понятия)</span>
                </h4>
                <button
                  type="button"
                  onClick={onProceedToFlashcards}
                  className="text-[11px] font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                >
                  Упражнявай в интерактивен режим с карти →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.flashcards.map((card, cIdx) => (
                  <div
                    key={card.id}
                    className="p-3.5 rounded-xl bg-white border border-blue-100 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-blue-950"><RichText text={card.front} /></span>
                      <span className="text-[10px] font-semibold text-slate-400 shrink-0 tabular-nums">
                        #{cIdx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed"><RichText text={card.back} /></p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* РАЗДЕЛ IV: ПРАКТИЧЕСКИ РАЗБОР НА ИЗПИТНИ ЗАДАЧИ И КАЗУСИ СТЪПКА ПО СТЪПКА */}
        {workedExamCases.length > 0 && (
          <section id="section-4-worked-cases" className="cv-auto space-y-4 scroll-mt-24">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-xs">
                  Раздел IV
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Практически разбор на реални изпитни задачи и казуси стъпка по стъпка
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                По модела на оценяване на МОН (ДЗИ / ДИППК / Класна работа)
              </span>
            </div>

            <div className="space-y-3">
              {workedExamCases.map((q, qIdx) => {
                const correctText = q.options[q.correctIndex] ?? '';
                const correctLetter = OPTION_LETTERS[q.correctIndex] ?? 'А';
                return (
                  <details
                    key={q.id || qIdx}
                    open={qIdx === 0}
                    className="group rounded-xl border border-slate-200 bg-slate-50/70 open:bg-white open:border-blue-300 transition-colors"
                  >
                    <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none select-none">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="shrink-0 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold">
                          Казус {qIdx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          <RichText text={q.question} />
                        </span>
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-blue-700 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>

                    <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-3 text-xs">
                      {/* Опции към въпроса */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === q.correctIndex;
                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                                isCorrect
                                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-semibold'
                                  : 'bg-slate-50 border-slate-200 text-slate-600'
                              }`}
                            >
                              <span className="font-bold shrink-0">
                                {OPTION_LETTERS[oIdx] ?? `${oIdx + 1}`})
                              </span>
                              <span><RichText text={opt} /></span>
                            </div>
                          );
                        })}
                      </div>

                      {/* 3-стъпков методически разбор */}
                      <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-2">
                        <div className="font-bold text-blue-950 flex items-center gap-1.5">
                          <FileCheck2 className="w-3.5 h-3.5 text-blue-700" />
                          <span>Методически разбор и решение за пълни точки:</span>
                        </div>
                        <ol className="space-y-1.5 text-slate-700 leading-relaxed">
                          <li>
                            <strong className="text-slate-900">Стъпка 1 (Теоретична опора):</strong>{' '}
                            Въпросът проверява владеенето на раздел „{academicMeta.thematicDomain}“ (
                            <RichText text={summary.keyPoints[qIdx % summary.keyPoints.length] || summary.overview} />).
                          </li>
                          <li>
                            <strong className="text-slate-900">Стъпка 2 (Верен отговор по ключа на МОН):</strong>{' '}
                            Правилният избор е{' '}
                            <span className="font-bold text-emerald-800">
                              вариант {correctLetter}) „<RichText text={correctText} />“
                            </span>
                            .
                          </li>
                          <li>
                            <strong className="text-slate-900">Стъпка 3 (Академична аргументация):</strong>{' '}
                            <RichText text={q.explanation} />
                          </li>
                        </ol>
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          </section>
        )}

        {/* РАЗДЕЛ V: ЗЛАТНО ПРАВИЛО ЗА 6.00, ТИПИЧНИ КАПАНИ, AI МЕНТОР И ЛИЧЕН БЕЛЕЖНИК */}
        <section id="section-5-evaluation" className="cv-auto space-y-5 scroll-mt-24">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-xs">
              Раздел V
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Експертна оценка за Отличен (6.00), изпитни капани и AI Ментор
            </h3>
          </div>

          {/* Golden Rule: What teachers look for for a 6.00 */}
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white text-emerald-700 border border-emerald-200 shadow-2xs flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-emerald-900">
                  Златното правило за оценка Отличен (6.00)
                </h4>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed mt-1">
                  <RichText text={summary.examGoldenRule} />
                </p>
              </div>
            </div>
          </div>

          {/* Common Traps in Exams */}
          {summary.commonTraps && summary.commonTraps.length > 0 && (
            <div className="p-4 sm:p-5 rounded-xl bg-rose-50 border border-rose-200">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white text-rose-700 border border-rose-200 shadow-2xs flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm font-semibold text-rose-900">
                    Типични капани и грешки на изпити
                  </h4>
                  <ul className="space-y-1">
                    {summary.commonTraps.map((trap, idx) => (
                      <li key={idx} className="text-xs text-rose-950 flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 text-rose-600 shrink-0" aria-hidden="true" />
                        <span><RichText text={trap} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Gemini AI Academic Mentor */}
          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/70 border border-blue-200/90 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-semibold text-blue-950">
                  Попитай AI Ментора за този урок ({AI_PROVIDER_LABEL})
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
                  label: 'Какво най-често се пада на изпит?',
                  prompt: `Кои са най-важните акценти, формули или въпроси от урока „${lesson.title}“, които най-често се падат на матура (ДЗИ) или контролно по МОН, и как да гарантирам Отличен 6.00?`
                },
                {
                  label: 'Обясни ми най-трудните понятия лесно',
                  prompt: `Обясни ми по най-ясен и запомнящ се начин (с конкретен пример) най-трудните понятия от урока „${lesson.title}“.`
                },
                {
                  label: 'Формулирай ми силна теза за 6.00',
                  prompt: `Формулирай ми кратка, академично издържана теза (или структурен план за писмен отговор за 6.00) по темата „${lesson.title}“.`
                },
                {
                  label: 'Изпитай ме с 1 отворен въпрос',
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
                            const nextVal = personalNote ? `${personalNote}\n\nAI Ментор:\n${msg.text}` : `AI Ментор:\n${msg.text}`;
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
          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/60 border border-amber-200/90 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-amber-700" />
                <h4 className="text-sm font-semibold text-amber-950">
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
        </section>

        {/* Quick Actions to other tabs */}
        {onNavigateTab && (
          <div className="pt-5 border-t border-slate-200">
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
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Учебен конспект по държавните образователни стандарти ({academicMeta.sectionShort})</span>
          <span className="font-medium text-slate-600">Официална учебна програма на МОН · {academicMeta.stageShort}</span>
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
