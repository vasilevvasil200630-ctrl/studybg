import React, { useState, useEffect, useMemo } from 'react';
import {
  GraduationCap,
  Clock,
  Calculator,
  BookOpen,
  Camera,
  ArrowRight,
  Sparkles,
  FileText,
  ChevronRight,
  Award,
  BookMarked,
  Compass,
  PenTool,
  Search,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Mic,
  FlaskConical,
  Zap,
  Calendar,
  MapPin,
  RefreshCw,
  X
} from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import type { CultureSubTab } from './CultureHero';
import { MaturaPlusBridgeBanner } from './MaturaPlusBridgeBanner';
import { UNSOLVED_MYSTERIES_DATA } from '../data/generalKnowledgeData';
import { errorBankService } from '../services/errorBankService';

interface HomeLandingViewProps {
  lessons: LessonData[];
  onSelectLesson?: (lesson: LessonData, targetTab?: AppNavTab) => void;
  onNavigateTab: (tab: AppNavTab) => void;
  onOpenScan?: () => void;
  onOpenFormulaModal?: () => void;
  onNavigateCultureTab?: (tab: CultureSubTab) => void;
}

export const HomeLandingView: React.FC<HomeLandingViewProps> = ({
  lessons,
  onSelectLesson,
  onNavigateTab,
  onOpenScan,
  onOpenFormulaModal,
  onNavigateCultureTab
}) => {
  const [selectedCurriculumTrack, setSelectedCurriculumTrack] = useState<'dzi' | 'nvo' | 'stem' | 'all'>('dzi');
  const [showAllInTrack, setShowAllInTrack] = useState(false);

  // 1. Live Omni-Search State
  const [omniSearchQuery, setOmniSearchQuery] = useState('');

  // 2. Interactive Pomodoro Study Timer State (25 min default)
  const [timerModeMinutes, setTimerModeMinutes] = useState<25 | 45>(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isTimerRunning]);

  const handleSelectTimerMode = (mins: 25 | 45) => {
    setIsTimerRunning(false);
    setTimerModeMinutes(mins);
    setSecondsLeft(mins * 60);
  };

  const formattedTimer = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [secondsLeft]);

  // 3. Interactive "Question of the Day" (Daily Blitz Widget)
  const allQuizPool = useMemo(() => {
    return lessons.flatMap((lesson) =>
      lesson.quiz.map((q) => ({
        question: q,
        lesson
      }))
    );
  }, [lessons]);

  const [dailyQuestionIndex, setDailyQuestionIndex] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [dailyStreakCount, setDailyStreakCount] = useState(0);

  const currentDailyItem = allQuizPool[dailyQuestionIndex % Math.max(1, allQuizPool.length)];

  const handleAnswerDailyQuestion = (idx: number) => {
    if (selectedOptionIdx !== null || !currentDailyItem) return;
    setSelectedOptionIdx(idx);
    if (idx === currentDailyItem.question.correctIndex) {
      setDailyStreakCount((prev) => prev + 1);
    } else {
      errorBankService.recordQuizError(currentDailyItem.question, currentDailyItem.lesson, idx);
    }
  };

  const handleNextDailyQuestion = () => {
    setSelectedOptionIdx(null);
    setDailyQuestionIndex((prev) => (prev + 7) % Math.max(1, allQuizPool.length));
  };

  // 4. Real Student Telemetry from localStorage
  const telemetry = useMemo(() => {
    let masteredCount = 0;
    let oralExamCount = 0;
    let oralAvgGrade = '6.00';
    try {
      const rawMastered = localStorage.getItem('studybg_planner_mastered_lessons_v1');
      if (rawMastered) {
        const parsed = JSON.parse(rawMastered);
        if (Array.isArray(parsed)) masteredCount = parsed.length;
      }
      const rawOral = localStorage.getItem('studybg_oral_exam_history_v1');
      if (rawOral) {
        const parsedOral = JSON.parse(rawOral);
        if (Array.isArray(parsedOral) && parsedOral.length > 0) {
          oralExamCount = parsedOral.length;
          const sum = parsedOral.reduce((acc: number, item: { grade?: number }) => acc + (Number(item.grade) || 6), 0);
          oralAvgGrade = (sum / parsedOral.length).toFixed(2);
        }
      }
    } catch {
      // Ignore storage read errors
    }
    const unresolvedErrors = errorBankService.getUnresolvedCount();
    return {
      masteredCount,
      oralExamCount,
      oralAvgGrade,
      unresolvedErrors
    };
  }, [selectedOptionIdx]);

  // Omni-search filtered results
  const omniResults = useMemo(() => {
    const q = omniSearchQuery.trim().toLowerCase();
    if (!q) return null;

    const matchedLessons = lessons
      .filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.subject.toLowerCase().includes(q) ||
          l.summary.overview.toLowerCase().includes(q) ||
          l.flashcards.some((f) => f.front.toLowerCase().includes(q) || f.back.toLowerCase().includes(q))
      )
      .slice(0, 6);

    const matchedMysteries = UNSOLVED_MYSTERIES_DATA.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.subtitle.toLowerCase().includes(q) ||
        m.tag.toLowerCase().includes(q) ||
        m.unsolvedMystery.toLowerCase().includes(q)
    ).slice(0, 4);

    return {
      matchedLessons,
      matchedMysteries,
      total: matchedLessons.length + matchedMysteries.length
    };
  }, [omniSearchQuery, lessons]);

  // Curated DZI 12 High-Yield Lessons
  const dziLessons = lessons.filter(
    (l) => l.grade.includes('12') || l.grade.includes('11') || (l.examType && l.examType.includes('ДЗИ'))
  );

  // Curated NVO 10 Lessons
  const nvo10Lessons = lessons.filter((l) => l.grade.includes('10') || l.grade.includes('9') || l.grade.includes('8'));

  // STEM / Science Lessons
  const stemLessons = lessons.filter(
    (l) =>
      l.subject.includes('Математика') ||
      l.subject.includes('Биология') ||
      l.subject.includes('Химия') ||
      l.subject.includes('Физика')
  );

  const activeTrackList =
    selectedCurriculumTrack === 'dzi'
      ? dziLessons
      : selectedCurriculumTrack === 'nvo'
      ? nvo10Lessons
      : selectedCurriculumTrack === 'stem'
      ? stemLessons
      : lessons;

  const displayedCurriculum = showAllInTrack ? activeTrackList : activeTrackList.slice(0, 12);

  return (
    <div className="space-y-14 pb-16">
      
      {/* ========================================================================= */}
      {/* 1. HERO & OMNI-SEARCH COMMAND CENTER */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 pb-4 text-center">
        {/* Soft Ambient Radial Background Accent */}
        <div 
          className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <div className="w-[720px] h-[380px] rounded-full bg-gradient-to-tr from-blue-100/70 via-indigo-100/50 to-amber-100/30 blur-3xl opacity-85" />
        </div>

        <div className="max-w-5xl mx-auto px-4 space-y-6">
          
          {/* Top Status Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1.5 text-blue-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              МОН Програми 2026/2027
            </span>
            <span className="text-slate-300">•</span>
            <span>{lessons.length} академични урока</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-800 font-bold">40 секретни досиета</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-indigo-700 font-bold hidden sm:inline">12 интерактивни лаборатории</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Национална дигитална академия за <span className="text-blue-600">НВО 10</span> и <span className="text-indigo-600">ДЗИ 12</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Професионална образователна платформа с работещи симулатори за 100 точки, гласово устно изпитване пред дъската, STEM лаборатории по природни науки и математика, SmartScan OCR и портал за обща култура и мистерии.
          </p>

          {/* LIVE OMNI-SEARCH ENGINE BAR */}
          <div className="max-w-3xl mx-auto pt-1 relative text-left">
            <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-200/90 focus-within:border-blue-500 shadow-sm hover:shadow-md transition-all">
              <Search className="w-5 h-5 text-blue-600 ml-4 shrink-0" />
              <input
                type="text"
                value={omniSearchQuery}
                onChange={(e) => setOmniSearchQuery(e.target.value)}
                placeholder={`Търси мигновено сред ${lessons.length} урока, 40 мистерии, формули или автори (напр. Талев, производна, митоза, Царичина)...`}
                className="w-full py-3.5 px-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              {omniSearchQuery && (
                <button
                  onClick={() => setOmniSearchQuery('')}
                  className="p-2 mr-1 text-slate-400 hover:text-slate-600 rounded-xl"
                  aria-label="Изчисти търсенето"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onNavigateTab('catalog')}
                className="hidden sm:inline-flex items-center gap-1.5 mr-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shrink-0 cursor-pointer"
              >
                <span>Пълен каталог</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Search Suggestions Strip */}
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
              <span className="text-slate-400 font-semibold">Бързо търсене:</span>
              {[
                { label: '📚 Талев & Димов (ДЗИ)', query: 'Талев' },
                { label: '📐 Производни & Екстремуми', query: 'Производни' },
                { label: '🧬 Митоза и Мейоза', query: 'Митоза' },
                { label: '⚡ ОРП & Електрохимия', query: 'Окислително' },
                { label: '🕵️ Варненското злато (Φ=1.618)', query: 'Варненското злато' },
                { label: '🛸 Операция Царичина', query: 'Царичина' }
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => setOmniSearchQuery(chip.query)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 hover:border-blue-300 font-medium transition-colors cursor-pointer shadow-2xs"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Instant Omni-Search Results Dropdown Panel */}
            {omniResults && (
              <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-white border-2 border-blue-200 shadow-xl space-y-4 z-30">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700">
                    Намерени резултати за „<span className="text-blue-600">{omniSearchQuery}</span>“ ({omniResults.total})
                  </span>
                  <button
                    onClick={() => setOmniSearchQuery('')}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Затвори ✕
                  </button>
                </div>

                {omniResults.total === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    Няма директно съвпадение. Опитай с друга ключова дума или разгледай пълния каталог с {lessons.length} урока.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Matched Academic Lessons */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700">
                        🎓 Учебни уроци по МОН ({omniResults.matchedLessons.length})
                      </div>
                      {omniResults.matchedLessons.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">Няма намерени учебни уроци по тази дума.</p>
                      ) : (
                        omniResults.matchedLessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col justify-between gap-2"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-blue-700">
                                <span>{lesson.subject}</span>
                                <span className="font-mono text-slate-500">{lesson.grade}</span>
                              </div>
                              <div className="text-xs font-bold text-slate-900 mt-0.5">{lesson.title}</div>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <button
                                onClick={() => {
                                  setOmniSearchQuery('');
                                  onSelectLesson?.(lesson, 'summary');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                📖 Конспект
                              </button>
                              <button
                                onClick={() => {
                                  setOmniSearchQuery('');
                                  onSelectLesson?.(lesson, 'quiz');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold transition-colors cursor-pointer"
                              >
                                ✅ Тест ({lesson.quiz.length})
                              </button>
                              <button
                                onClick={() => {
                                  setOmniSearchQuery('');
                                  onSelectLesson?.(lesson, 'oralexam');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-[11px] font-semibold transition-colors cursor-pointer"
                              >
                                🎙️ Устен
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Matched Conspiracy Dossiers */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                        🕵️ Секретни досиета & Мистерии ({omniResults.matchedMysteries.length})
                      </div>
                      {omniResults.matchedMysteries.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">Няма намерени конспиративни досиета по тази дума.</p>
                      ) : (
                        omniResults.matchedMysteries.map((mystery) => (
                          <div
                            key={mystery.id}
                            onClick={() => {
                              setOmniSearchQuery('');
                              onNavigateCultureTab?.('mysteries');
                            }}
                            className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200 transition-all cursor-pointer space-y-1"
                          >
                            <div className="flex items-center justify-between text-[10px] font-bold text-amber-800">
                              <span>🕵️ {mystery.tag}</span>
                              <span>Досие →</span>
                            </div>
                            <div className="text-xs font-bold text-slate-900">{mystery.title}</div>
                            <p className="text-[11px] text-slate-600 line-clamp-2">{mystery.subtitle}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dedicated Dual Portal Gateway Card */}
          <div className="pt-2 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-5 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Двупортална архитектура • Избери режим на работа</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Влез в Учебната академия или изследвай Секретните досиета
                  </h2>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                  ✓ 100% работещи модули без регистрация
                </span>
              </div>

              {/* Main Entrance Call-to-Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Entrance 1: The Study Academy (8.-12. grade) */}
                <button
                  onClick={() => onNavigateTab('summary')}
                  className="group relative p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white flex flex-col justify-between transition-all shadow-sm hover:shadow-md cursor-pointer text-left"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white border border-white/20 shadow-2xs">
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                        {lessons.length} УРОКА • 9 ПРЕДМЕТА
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-bold text-blue-200">
                        Портал 1 • Официална подготовка по МОН (8.–12. клас)
                      </div>
                      <div className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 pt-0.5">
                        <span>Влез в Учебната академия</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <p className="text-xs text-blue-100/95 leading-relaxed">
                      Пълни учебни конспекти, гласово устно изпитване пред дъската, 100-точков симулатор за НВО 10 и ДЗИ, STEM лаборатории и бележник към всеки урок.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-blue-100 flex items-center justify-between border-t border-white/15 mt-3">
                    <span>Отвори учебното пространство</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Entrance 2: Cultural Context & Mysteries */}
                <button
                  onClick={() => onNavigateCultureTab?.('mysteries')}
                  className="group relative p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/70 to-amber-100/50 hover:from-amber-100/90 hover:to-orange-100/80 border-2 border-amber-300/80 text-slate-900 flex flex-col justify-between transition-all shadow-2xs hover:shadow-md cursor-pointer text-left"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                        <Compass className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-950 border border-amber-300">
                        40 ДОСИЕТА • 12 РАДАРНИ ЗОНИ
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                        Портал 2 • Конспирации, Мистерии & Ерудиция
                      </div>
                      <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5 pt-0.5">
                        <span>Влез в „Обща култура & Загадки“</span>
                        <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      40 секретни досиета (Царичина, Бастет в Странджа, Варненското злато Φ=1.618, Побитите камъни, Раковски, Космическата програма „СВЕТ“ & „Люлин“), гео-радарна карта и 48 куиз въпроса.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-amber-900 flex items-center justify-between border-t border-amber-200/80 mt-3">
                    <span>Отвори секретните досиета и картата</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </div>

              {/* Interactive Quick-Launch Laboratory Pills */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-bold text-slate-800 mr-1">Лаборатории с 1 клик:</span>
                <button
                  type="button"
                  onClick={() => onNavigateTab('oralexam')}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-bold transition-colors cursor-pointer"
                >
                  🎙️ Устно изпитване
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('sciencelab')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold transition-colors cursor-pointer"
                >
                  🧬 Природни науки Лаб
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('mathlab')}
                  className="px-2.5 py-1 rounded-lg bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-900 font-bold transition-colors cursor-pointer"
                >
                  📐 Математика & STEM
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('grammar')}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-semibold transition-colors cursor-pointer"
                >
                  ✍️ Правопис БЕЛ (Модул 1)
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('moduletwo')}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 font-semibold transition-colors cursor-pointer"
                >
                  🪶 Тропи & Резюме (Модул 2)
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('literature')}
                  className="px-2.5 py-1 rounded-lg bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-900 font-semibold transition-colors cursor-pointer"
                >
                  📚 Литературен Канон (41. в-с)
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateCultureTab?.('mysticmap')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold transition-colors cursor-pointer"
                >
                  🛸 Гео-радарна карта (12 зони)
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('blitz')}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 font-bold transition-colors cursor-pointer"
                >
                  ⚡ Блиц за 60 сек.
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LIVE INTERACTIVE PLATFORM WORKSPACE (DAILY QUESTION + POMODORO + STATS) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Widget A: Live Interactive "Question of the Day" (7 cols on lg) */}
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider">
                    🎯 Тренажор на живо
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    Изпитен въпрос от банката на МОН ({allQuizPool.length}+ въпроса)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {dailyStreakCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                      🔥 Серия: {dailyStreakCount} верни
                    </span>
                  )}
                  <button
                    onClick={handleNextDailyQuestion}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    title="Зареди друг изпитен въпрос"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Следващ въпрос</span>
                  </button>
                </div>
              </div>

              {currentDailyItem && (
                <>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-blue-700">
                      {currentDailyItem.lesson.subject} • {currentDailyItem.lesson.grade}
                    </span>
                    <button
                      onClick={() => onSelectLesson?.(currentDailyItem.lesson, 'summary')}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Към урока: {currentDailyItem.lesson.title.slice(0, 38)}... →
                    </button>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {currentDailyItem.question.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {currentDailyItem.question.options.map((opt, idx) => {
                      const isSelected = selectedOptionIdx === idx;
                      const isCorrect = idx === currentDailyItem.question.correctIndex;
                      const showResult = selectedOptionIdx !== null;

                      let btnStyle =
                        'bg-slate-50 hover:bg-blue-50/70 border-slate-200 hover:border-blue-300 text-slate-800';
                      if (showResult) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                        } else {
                          btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-75';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerDailyQuestion(idx)}
                          disabled={showResult}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start justify-between gap-2 cursor-pointer ${btnStyle}`}
                        >
                          <span>
                            <strong className="mr-1.5 font-mono">
                              {['А)', 'Б)', 'В)', 'Г)'][idx] || `${idx + 1}.`}
                            </strong>
                            {opt}
                          </span>
                          {showResult && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOptionIdx !== null && (
                    <div
                      className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                        selectedOptionIdx === currentDailyItem.question.correctIndex
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50/90 border-amber-200 text-amber-950'
                      }`}
                    >
                      <div className="font-bold mb-1">
                        {selectedOptionIdx === currentDailyItem.question.correctIndex
                          ? '✅ Отлично! Верен отговор:'
                          : '💡 Академично обяснение (записано в Банката с грешки):'}
                      </div>
                      <p>{currentDailyItem.question.explanation}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-500">
                Искаш пълен изпит с хронометър и AI проверка на есе?
              </span>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <span>Пусни 100-точков симулатор</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Widget B: Live Study Focus Timer (Pomodoro) & Student Telemetry (5 cols on lg) */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-slate-900 text-white shadow-sm flex flex-col justify-between space-y-5">
            
            {/* Pomodoro Focus Timer Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    Фокус Таймер & Телеметрия
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[11px]">
                  <button
                    onClick={() => handleSelectTimerMode(25)}
                    className={`px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer ${
                      timerModeMinutes === 25 ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    25 мин
                  </button>
                  <button
                    onClick={() => handleSelectTimerMode(45)}
                    className={`px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer ${
                      timerModeMinutes === 45 ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    45 мин (Урок)
                  </button>
                </div>
              </div>

              {/* Digital Clock & Controls */}
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Сесия за дълбока концентрация
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-black tracking-wider text-white mt-0.5">
                    {formattedTimer}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      isTimerRunning
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Пауза</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Старт</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setSecondsLeft(timerModeMinutes * 60);
                    }}
                    className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors cursor-pointer"
                    title="Нулирай таймера"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Live Personal Progress Metrics */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => onNavigateTab('planner')}
                  className="p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 text-left transition-colors cursor-pointer"
                >
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Усвоени теми</div>
                  <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">
                    {telemetry.masteredCount} / {lessons.length}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Отвори Планера →</div>
                </button>

                <button
                  onClick={() => onNavigateTab('oralexam')}
                  className="p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 text-left transition-colors cursor-pointer"
                >
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Устен изпит</div>
                  <div className="text-base sm:text-lg font-black text-indigo-400 mt-0.5">
                    {telemetry.oralExamCount > 0 ? `Ср. ${telemetry.oralAvgGrade}` : 'Готов за тест'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Пред дъската →</div>
                </button>

                <button
                  onClick={() => onNavigateTab('errorbank')}
                  className="p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 text-left transition-colors cursor-pointer"
                >
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Банка грешки</div>
                  <div className="text-base sm:text-lg font-black text-amber-400 mt-0.5">
                    {telemetry.unresolvedErrors} за преговор
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Поправи ги →</div>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Персонален седмичен план за Отличен 6.00</span>
              </span>
              <button
                onClick={() => onNavigateTab('planner')}
                className="text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
              >
                Отвори планера →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE LABORATORIES & SPECIALIZED MODULES GRID */}
      {/* ========================================================================= */}
      <section id="pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Интерактивни тренажори и лаборатории на StudyBG</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Специализирани лаборатории за Отличен 6.00
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Всички модули са директно свързани с учебните програми на МОН за 8.–12. клас и работят в реално време.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Lab 1: Oral Exam Simulator */}
          <div
            onClick={() => onNavigateTab('oralexam')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                  ГЛАС & ТЕКСТ
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                Устно изпитване пред дъската
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Симулатор с микрофон (Web Speech API) за всички {lessons.length} урока, автоматичен одит на ключовите термини и бележник.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>Започни устен изпит</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Lab 2: Science DZI Lab */}
          <div
            onClick={() => onNavigateTab('sciencelab')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                  БИО • ХИМ • ФИЗ
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Лаборатория Природни науки
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ДНК репликация и транслация (кодони), pH и йоннообменни реакции, закон на Ом и електрически вериги.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Отвори STEM лабораторията</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Lab 3: Grammar & Orthography Trainer */}
          <div
            onClick={() => onNavigateTab('grammar')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                  <PenTool className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                  МОДУЛ 1 & 2 БЕЛ
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Тренажор по Граматика & Правопис
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Пълен/кратък член, бройна форма, запетаи при обособени и вметнати части, пароними и редактиране на текст.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Отвори езиковия тренажор</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Lab 4: Literature Canon & Thesis Builder */}
          <div
            onClick={() => onNavigateTab('literature')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
                  <BookMarked className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900">
                  41. ЗАДАЧА (30т.)
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Литературен Канон & Тези
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Всички задължителни автори от Ботев и Вазов до Талев и Димов, тематични цикли, цитати и генератор на теза.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>Отвори литературния канон</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Lab 5: 100-Point Exam Simulator */}
          <div
            onClick={() => onNavigateTab('simulator')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  100 ТОЧКИ • AI ЕСЕ
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                100-точков Симулатор на МОН
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Тримодулна матура с хронометър и интелигентен AI оценител за аргументативно есе и интерпретативно съчинение.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Стартирай симулация</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Lab 6: Math & STEM Solver */}
          <div
            onClick={() => onNavigateTab('mathlab')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-200">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-900">
                  НВО 10 & ДЗИ
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                Математика & STEM Решавач
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Квадратни уравнения, прогресии, комбинаторика, синусова/косинусова теорема и производни стъпка по стъпка.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-800">
              <span>Отвори математическия лаб</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Lab 7: History & Geography Atlas + Cases */}
          <div
            onClick={() => onNavigateTab('atlas')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-900">
                  ДОГОВОРИ & NUTS 2
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                Атлас История & География
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Териториални промени (681–1947), мирни договори, 6-те района за планиране (NUTS 2) и климатограми.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-800">
              <span>Отвори интерактивния атлас</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Lab 8: MON Grade Calculator & Speed Blitz */}
          <div
            onClick={() => onNavigateTab('calculator')}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-rose-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200">
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-900">
                  НАРЕДБА №11 МОН
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                МОН Калкулатор за оценка и ВУЗ бал
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Пресметни точно оценката си по точки (праг 30т. = 3.00) и изчисли състезателния си бал за университет.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>Пресметни оценка и бал</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CURATED EXAM PATHWAYS: ALL 52 MON LESSONS WITHMULTI-ACTION LAUNCH */}
      {/* ========================================================================= */}
      <section id="curriculum" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Пълна учебна база по предмети (8.–12. клас)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Учебни конспекти, устно изпитване и тестове ({lessons.length} урока)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Избери урок и стартирай директно конспект с личен бележник, гласово устно изпитване или изпитен тест.
              </p>
            </div>

            {/* Curriculum Track Switcher */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => {
                  setSelectedCurriculumTrack('dzi');
                  setShowAllInTrack(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCurriculumTrack === 'dzi'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ДЗИ 11.–12. кл ({dziLessons.length})
              </button>
              <button
                onClick={() => {
                  setSelectedCurriculumTrack('nvo');
                  setShowAllInTrack(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCurriculumTrack === 'nvo'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                8.–10. кл & НВО ({nvo10Lessons.length})
              </button>
              <button
                onClick={() => {
                  setSelectedCurriculumTrack('stem');
                  setShowAllInTrack(false);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCurriculumTrack === 'stem'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Математика & Природни ({stemLessons.length})
              </button>
              <button
                onClick={() => {
                  setSelectedCurriculumTrack('all');
                  setShowAllInTrack(true);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCurriculumTrack === 'all'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Всички 9 предмета ({lessons.length})
              </button>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedCurriculum.map((lesson) => {
              const isHistory = lesson.subject.includes('История');
              const isBel = lesson.subject.includes('Български');
              const isMath = lesson.subject.includes('Математика');
              
              const accentColor = isHistory
                ? 'text-amber-800 bg-amber-50 border-amber-200'
                : isBel
                ? 'text-blue-800 bg-blue-50 border-blue-200'
                : isMath
                ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                : 'text-indigo-800 bg-indigo-50 border-indigo-200';

              return (
                <div
                  key={lesson.id}
                  onClick={() => onSelectLesson?.(lesson, 'summary')}
                  className="p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${accentColor}`}>
                        {lesson.subject.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {lesson.grade.split(' ')[0]}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 transition-colors">
                      {lesson.title}
                    </h3>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {lesson.summary.overview}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between gap-1 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLesson?.(lesson, 'summary');
                      }}
                      className="flex items-center gap-1 text-blue-700 hover:text-blue-900 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Конспект</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLesson?.(lesson, 'oralexam');
                      }}
                      className="px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-colors cursor-pointer"
                      title="Устно изпитване по тази тема"
                    >
                      🎙️ Устен
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLesson?.(lesson, 'quiz');
                      }}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-200/80 hover:bg-blue-100 text-slate-800 hover:text-blue-900 font-bold transition-colors cursor-pointer"
                    >
                      Тест ({lesson.quiz.length})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Catalog / Expand Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            {activeTrackList.length > 12 && (
              <button
                type="button"
                onClick={() => setShowAllInTrack(!showAllInTrack)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>
                  {showAllInTrack
                    ? 'Свий списъка (покажи първите 12)'
                    : `Покажи всички ${activeTrackList.length} урока в тази категория`}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onNavigateTab('catalog')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              <BookMarked className="w-4 h-4 text-blue-600" />
              <span>Отвори пълния каталог с всички {lessons.length} теми по програмите на МОН за 8.–12. клас</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SMARTSCAN AI BANNER: NOTEBOOK CAMERA DIAGNOSTIC */}
      {/* ========================================================================= */}
      <section id="smartscan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Camera className="w-3.5 h-3.5 text-blue-400" />
              <span>SmartScan OCR • Изкуствен интелект</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Имаш снимка на тетрадката или учебника?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Качи снимка на своите записки — StudyBG разпознава ръкописния текст, извлича ключовите понятия по конспекта на МОН и генерира персонализиран тест за проверка на знанията за 5 секунди.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onOpenScan?.()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/30 text-xs font-bold transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4 text-white" />
              <span>Сканирай тетрадка (OCR)</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenFormulaModal?.()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Справочници и свитъци на МОН</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CULTURAL CONTEXT & HISTORICAL MYSTERIES (PORTAL 2 BRIDGE) */}
      {/* ========================================================================= */}
      <section id="culture-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-200/70 text-amber-900 border border-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-800" />
              <span>🕵️ Портал „Обща култура, Конспирации & Загадки“</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              40 конспиративни досиета и мистерии, 12 гео-радарни зони, 18 природни феномена и 48 куиз въпроса
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Операция „Слава“ в Царичина, експедицията за богинята Бастет и светилището Индипасха в Странджа, кодът на Златното сечение (Φ=1.618) във Варненското злато, Побитите камъни, шифрите на Раковски, космическата оранжерия „СВЕТ“ и дозиметрите „Люлин“ около Марс!
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => onNavigateCultureTab?.('mysteries')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Compass className="w-4 h-4 text-white" />
              <span>Отвори 40-те секретни досиета</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateCultureTab?.('mysticmap')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-amber-100/80 text-amber-950 border border-amber-300 font-bold text-xs transition-colors cursor-pointer"
            >
              <Zap className="w-4 h-4 text-purple-600" />
              <span>Гео-радарна карта (12 зони)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PARTNERSHIP / SYNERGY BRIDGE TO MATURA+ (https://maturaplus.eu) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MaturaPlusBridgeBanner source="hero" />
      </section>

    </div>
  );
};
