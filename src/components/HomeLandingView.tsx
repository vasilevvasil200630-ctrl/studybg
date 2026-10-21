import React, { useState, useEffect, useMemo, lazy } from 'react';
import { GraduationCap, Clock, Camera, ArrowRight, Sparkles, FileText, ChevronRight, Award, Compass, Search, Play, Pause, RotateCcw, CheckCircle2, XCircle, Zap, Calendar, RefreshCw, X } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import type { CultureSubTab } from './CultureHero';
import { MaturaPlusBridgeBanner } from './MaturaPlusBridgeBanner';
import { DeferredSection } from './DeferredSection';
import type { UnsolvedMysteryItem } from '../data/generalKnowledgeData';

import { errorBankService } from '../services/errorBankService';
import { studyProgressService, computeUserXpAndLevel, LOCAL_DATA_MUTATED_EVENT } from '../services/studyProgressService';
import { getCachedGoogleProfile, AUTH_SYNC_EVENT, type GoogleUserProfile } from '../services/authService';
import { TOTAL_CURRICULUM_LESSONS_COUNT } from '../data/curriculumDatabase';

const HomeSchoolsSection = lazy(() => import('./HomeSchoolsSection').then((m) => ({ default: m.HomeSchoolsSection })));
const HomeTrainerSection = lazy(() => import('./HomeTrainerSection').then((m) => ({ default: m.HomeTrainerSection })));
const HomePillarsSection = lazy(() => import('./HomePillarsSection').then((m) => ({ default: m.HomePillarsSection })));
const HomeCurriculumSection = lazy(() => import('./HomeCurriculumSection').then((m) => ({ default: m.HomeCurriculumSection })));

interface HomeLandingViewProps {
  lessons: LessonData[];
  onSelectLesson?: (lesson: LessonData, targetTab?: AppNavTab) => void;
  onNavigateTab: (tab: AppNavTab) => void;
  onOpenScan?: () => void;
  onOpenFormulaModal?: () => void;
  onOpenAuthModal?: () => void;
  onNavigateCultureTab?: (tab: CultureSubTab) => void;
  /** Иска пълния каталог (~2 MB) само при реално взаимодействие с търсачката или пътеките */
  onRequestFullCurriculum?: () => void;
}

export const HomeLandingView: React.FC<HomeLandingViewProps> = ({
  lessons,
  onSelectLesson,
  onNavigateTab,
  onOpenScan,
  onOpenFormulaModal,
  onOpenAuthModal,
  onNavigateCultureTab,
  onRequestFullCurriculum
}) => {
  const totalLessonsCount = Math.max(lessons.length, TOTAL_CURRICULUM_LESSONS_COUNT);
  const [heroUserProfile, setHeroUserProfile] = useState<GoogleUserProfile | null>(() => getCachedGoogleProfile());
  const [heroProgress, setHeroProgress] = useState(() => studyProgressService.getProgress());

  useEffect(() => {
    const syncHeroState = () => {
      setHeroUserProfile(getCachedGoogleProfile());
      setHeroProgress(studyProgressService.getProgress());
    };
    window.addEventListener(LOCAL_DATA_MUTATED_EVENT, syncHeroState);
    window.addEventListener(AUTH_SYNC_EVENT, syncHeroState);
    return () => {
      window.removeEventListener(LOCAL_DATA_MUTATED_EVENT, syncHeroState);
      window.removeEventListener(AUTH_SYNC_EVENT, syncHeroState);
    };
  }, []);

  const heroLevelInfo = computeUserXpAndLevel(heroProgress);
  const heroDailyStreak = heroProgress.currentDailyStreak ?? 1;
  const isHeroGoogleUser = Boolean(heroUserProfile && !heroUserProfile.isAnonymous);

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

  // 3. Interactive "Question of the Day" (Multi-Subject Live Trainer Widget)
  const [trainerSubjectFilter, setTrainerSubjectFilter] = useState<
    'all' | 'bel' | 'math' | 'bio_chem' | 'phys_geo' | 'phil_eng' | 'specialties' | 'history'
  >('all');

  useEffect(() => {
    if (trainerSubjectFilter !== 'all') onRequestFullCurriculum?.();
  }, [trainerSubjectFilter, onRequestFullCurriculum]);

  const allQuizPool = useMemo(() => {
    // Поставяме уроците в разнообразен ред, като „Априлското въстание“ остава в края на опашката,
    // за да може началният тренажор да стартира и върти въпроси от всички учебни предмети.
    const orderedLessons = [
      ...lessons.filter((l) => l.id !== 'history-april-uprising'),
      ...lessons.filter((l) => l.id === 'history-april-uprising')
    ];

    const filteredLessons = orderedLessons.filter((l) => {
      if (trainerSubjectFilter === 'bel') return l.subject.includes('Български');
      if (trainerSubjectFilter === 'math') return l.subject.includes('Математика');
      if (trainerSubjectFilter === 'bio_chem')
        return l.subject.includes('Биология') || l.subject.includes('Химия');
      if (trainerSubjectFilter === 'phys_geo')
        return l.subject.includes('Физика') || l.subject.includes('География');
      if (trainerSubjectFilter === 'phil_eng')
        return (
          l.subject.includes('Гражданско') ||
          l.subject.includes('Английски') ||
          l.subject.includes('Чужди езици')
        );
      if (trainerSubjectFilter === 'specialties')
        return (
          l.subject.includes('Информатика') ||
          l.subject.includes('Икономика') ||
          l.subject.includes('Професионални') ||
          l.subject.includes('Чужди езици')
        );
      if (trainerSubjectFilter === 'history') return l.subject.includes('История');
      return true;
    });

    const sourceLessons = filteredLessons.length > 0 ? filteredLessons : orderedLessons;

    // Интерлийвинг (Round-Robin): взимаме въпрос №1 от всеки урок, после въпрос №2 от всеки урок и т.н.
    // Така всяко натискане на „Следващ въпрос“ гарантирано сменя както предмета, така и темата!
    const interleaved: { question: LessonData['quiz'][number]; lesson: LessonData }[] = [];
    let qIdx = 0;
    let added = true;
    while (added) {
      added = false;
      for (const lesson of sourceLessons) {
        if (qIdx < lesson.quiz.length) {
          interleaved.push({
            question: lesson.quiz[qIdx],
            lesson
          });
          added = true;
        }
      }
      qIdx++;
    }
    return interleaved;
  }, [lessons, trainerSubjectFilter]);

  const [dailyQuestionIndex, setDailyQuestionIndex] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [dailyStreakCount, setDailyStreakCount] = useState(0);

  const currentDailyItem = allQuizPool[dailyQuestionIndex % Math.max(1, allQuizPool.length)];

  const handleSelectTrainerFilter = (
    filter: 'all' | 'bel' | 'math' | 'bio_chem' | 'phys_geo' | 'phil_eng' | 'specialties' | 'history'
  ) => {
    setTrainerSubjectFilter(filter);
    setSelectedOptionIdx(null);
    setDailyQuestionIndex(0);
  };

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
    onRequestFullCurriculum?.();
    setSelectedOptionIdx(null);
    setDailyQuestionIndex((prev) => (prev + 1) % Math.max(1, allQuizPool.length));
  };

  // 4. Real Student Telemetry from localStorage
  const telemetry = useMemo(() => {
    let masteredCount = 0;
    let oralExamCount = 0;
    // Без записани опити не показваме измислена средна оценка
    let oralAvgGrade = '—';
    try {
      masteredCount = studyProgressService.getProgress().masteredLessonIds.length;
      const rawOral = localStorage.getItem('studybg_oral_exam_history_v1');
      if (rawOral) {
        const parsedOral: unknown = JSON.parse(rawOral);
        if (Array.isArray(parsedOral) && parsedOral.length > 0) {
          oralExamCount = parsedOral.length;
          const grades = parsedOral
            .map((item: { grade?: unknown } | null) => Number(item?.grade))
            .filter((g) => Number.isFinite(g) && g >= 2 && g <= 6);
          if (grades.length > 0) {
            oralAvgGrade = (grades.reduce((acc, g) => acc + g, 0) / grades.length).toFixed(2);
          }
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

  const [mysteriesPool, setMysteriesPool] = useState<UnsolvedMysteryItem[]>([]);

  useEffect(() => {
    if (!omniSearchQuery.trim()) return;
    onRequestFullCurriculum?.();
    if (mysteriesPool.length > 0) return;
    let active = true;
    import('../data/generalKnowledgeData').then((m) => {
      if (active) {
        setMysteriesPool(m.UNSOLVED_MYSTERIES_DATA);
      }
    });
    return () => {
      active = false;
    };
  }, [omniSearchQuery, mysteriesPool.length, onRequestFullCurriculum]);

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

    const matchedMysteries = mysteriesPool.filter(
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
  }, [omniSearchQuery, lessons, mysteriesPool]);

  return (
    <div className="space-y-14 pb-16">
      
      {/* ========================================================================= */}
      {/* 1. HERO & OMNI-SEARCH COMMAND CENTER */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 pb-4 text-center">

        <div className="max-w-5xl mx-auto px-4 space-y-6">
          
          {/* Top Status Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-blue-200/80 shadow-xs text-xs font-bold text-slate-700">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-extrabold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              МОН Програми 2026/2027
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-700 font-extrabold">{totalLessonsCount} академични урока</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-700 font-extrabold">41 секретни досиета</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-violet-700 font-extrabold hidden sm:inline">12 интерактивни лаборатории</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Национална дигитална академия за{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">НВО 7</span>,{' '}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">НВО 10</span> и{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">ДЗИ 12</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Професионална образователна платформа (5.–12. клас) с работещи симулатори за 100 точки, гласово устно изпитване пред дъската, STEM лаборатории по природни науки и математика, SmartScan OCR и портал за обща култура и мистерии.
          </p>

          {/* LIVE OMNI-SEARCH ENGINE BAR */}
          <div className="max-w-3xl mx-auto pt-1 relative text-left">
            <div className="relative flex items-center bg-white rounded-2xl border-2 border-blue-300/90 focus-within:border-blue-600 shadow-md shadow-blue-500/10 hover:shadow-lg transition-all">
              <Search className="w-5 h-5 text-blue-600 ml-4 shrink-0" />
              <input
                type="text"
                value={omniSearchQuery}
                onChange={(e) => setOmniSearchQuery(e.target.value)}
                onFocus={onRequestFullCurriculum}
                placeholder={`Търси мигновено сред ${totalLessonsCount} урока, 41 мистерии, формули или автори (напр. Талев, производна, митоза, Царичина)...`}
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
                className="hidden sm:inline-flex items-center gap-1.5 mr-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-b-2 border-indigo-900 text-xs font-extrabold transition-all shrink-0 cursor-pointer shadow-xs"
              >
                <span>Пълен каталог</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Search Suggestions Strip */}
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
              <span className="text-slate-500 font-bold">Бързо търсене:</span>
              {[
                { label: '📚 Талев & Димов (ДЗИ)', query: 'Талев', style: 'bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200' },
                { label: '📐 Производни & Екстремуми', query: 'Производни', style: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border-cyan-200' },
                { label: '🧬 Митоза и Мейоза', query: 'Митоза', style: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200' },
                { label: '⚡ ОРП & Електрохимия', query: 'Окислително', style: 'bg-violet-50 hover:bg-violet-100 text-violet-900 border-violet-200' },
                { label: '🕵️ Варненското злато (Φ=1.618)', query: 'Варненското злато', style: 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200' },
                { label: '🛸 Операция Царичина', query: 'Царичина', style: 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-200' }
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => {
                    onRequestFullCurriculum?.();
                    setOmniSearchQuery(chip.query);
                  }}
                  className={`px-2.5 py-1 rounded-full border font-bold transition-colors cursor-pointer shadow-2xs ${chip.style}`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Instant Omni-Search Results Dropdown Panel */}
            {omniResults && (
              <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-white border-2 border-blue-300 shadow-xl space-y-4 z-30">
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
                    Няма директно съвпадение. Опитай с друга ключова дума или разгледай пълния каталог със {totalLessonsCount} урока.
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
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                ✅ Тест ({lesson.quiz.length})
                              </button>
                              <button
                                onClick={() => {
                                  setOmniSearchQuery('');
                                  onSelectLesson?.(lesson, 'oralexam');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-800 border border-violet-200 text-[11px] font-bold transition-colors cursor-pointer"
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
                              try {
                                sessionStorage.setItem('studybg_focus_mystery_id', mystery.id);
                              } catch {
                                // ignore storage errors
                              }
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
            <div className="bg-white rounded-3xl border-2 border-blue-200/85 shadow-md shadow-blue-950/5 p-5 sm:p-7 space-y-5 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-600">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Двупортална архитектура • Избери режим на работа</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    Влез в Учебната академия или изследвай Секретните досиета
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  {onOpenAuthModal && (
                    <button
                      type="button"
                      onClick={onOpenAuthModal}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-white via-blue-50/40 to-indigo-50/40 hover:from-blue-50 hover:to-indigo-100 text-slate-900 border-2 border-blue-600 hover:border-indigo-600 text-xs font-extrabold shadow-xs transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="#4285F4"
                          d="M23.49 12.275c0-.85-.075-1.665-.215-2.45H12v4.635h6.445c-.28 1.495-1.125 2.765-2.395 3.615v3.005h3.875c2.265-2.085 3.565-5.16 3.565-8.805z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.955-1.075 7.94-2.91l-3.875-3.005c-1.075.72-2.45 1.145-4.065 1.145-3.125 0-5.775-2.11-6.72-4.945H1.275v3.1C3.25 21.305 7.31 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.285c-.24-.72-.375-1.49-.375-2.285s.135-1.565.375-2.285v-3.1H1.275C.465 8.23 0 10.065 0 12s.465 3.77 1.275 5.385l4.005-3.1z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.77c1.76 0 3.34.605 4.585 1.795l3.44-3.44C17.95 1.19 15.235 0 12 0 7.31 0 3.25 2.695 1.275 6.615l4.005 3.1C6.225 6.88 8.875 4.77 12 4.77z"
                        />
                      </svg>
                      <span>
                        {isHeroGoogleUser
                          ? `${heroUserProfile?.fullName?.split(/\s+/)[0] || 'Профил'} • Ниво ${heroLevelInfo.level}`
                          : 'Вход с Google • Облачен профил'}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-100 to-orange-100 text-orange-950 font-mono text-[10px] font-extrabold border border-orange-300">
                        🔥 {heroDailyStreak}д
                      </span>
                    </button>
                  )}
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                    ✓ Работи и без регистрация
                  </span>
                </div>
              </div>

              {/* Main Entrance Call-to-Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Entrance 1: The Study Academy (5.-12. grade) */}
                <button
                  onClick={() => onNavigateTab('summary')}
                  className="group relative p-5 rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 hover:from-sky-600 hover:via-blue-700 hover:to-indigo-800 border-b-4 border-indigo-900 text-white flex flex-col justify-between transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-left"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white border border-white/30 shadow-2xs">
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-400/25 text-white border border-emerald-300/40">
                        {totalLessonsCount} УРОКА • 13 ПРЕДМЕТА
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-bold text-sky-100">
                        Портал 1 • Официална подготовка по МОН (5.–12. клас)
                      </div>
                      <div className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 pt-0.5">
                        <span>Влез в Учебната академия</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <p className="text-xs text-blue-50/95 leading-relaxed">
                      Пълни учебни конспекти, гласово устно изпитване пред дъската, 100-точков симулатор за НВО 7, НВО 10 и ДЗИ, STEM лаборатории и бележник към всеки урок.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-extrabold text-white flex items-center justify-between border-t border-white/20 mt-3">
                    <span>Отвори учебното пространство</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Entrance 2: Cultural Context & Mysteries */}
                <button
                  onClick={() => onNavigateCultureTab?.('mysteries')}
                  className="group relative p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100/80 hover:from-amber-100/90 hover:to-orange-100/90 border-2 border-amber-300 border-b-4 border-b-amber-500 text-slate-900 flex flex-col justify-between transition-all shadow-2xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-left"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-xs">
                        <Compass className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-950 border border-amber-400">
                        41 ДОСИЕТА • 12 РАДАРНИ ЗОНИ
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-extrabold text-amber-800">
                        Портал 2 • Конспирации, Мистерии & Ерудиция
                      </div>
                      <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5 pt-0.5">
                        <span>Влез в „Обща култура & Загадки“</span>
                        <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      41 секретни досиета (Царичина, Бастет в Странджа, Варненското злато Φ=1.618, Побитите камъни, Раковски, Космическата програма „СВЕТ“ & „Люлин“), гео-радарна карта и 38 куиз въпроса.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-extrabold text-amber-950 flex items-center justify-between border-t border-amber-300/80 mt-3">
                    <span>Отвори секретните досиета и картата</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </div>

              {/* Interactive Quick-Launch Laboratory Pills */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-extrabold text-slate-800 mr-1">Лаборатории с 1 клик:</span>
                <button
                  type="button"
                  onClick={() => onNavigateTab('specialties')}
                  className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold transition-colors cursor-pointer shadow-2xs"
                >
                  🏫 Училища & Специалности (8.–12. кл.)
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('oralexam')}
                  className="px-2.5 py-1 rounded-lg bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-900 font-bold transition-colors cursor-pointer"
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
                  className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-bold transition-colors cursor-pointer"
                >
                  ✍️ Правопис БЕЛ (Модул 1)
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('moduletwo')}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 font-bold transition-colors cursor-pointer"
                >
                  🪶 Тропи & Резюме (Модул 2)
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('literature')}
                  className="px-2.5 py-1 rounded-lg bg-fuchsia-50 hover:bg-fuchsia-100 border border-fuchsia-200 text-fuchsia-900 font-bold transition-colors cursor-pointer"
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
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white border-2 border-blue-100/90 border-b-4 border-b-blue-500 shadow-xs flex flex-col justify-between space-y-4 cv-widget">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-2xs">
                    🎯 Тренажор на живо
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    Изпитни въпроси от всички предмети ({trainerSubjectFilter === 'all' ? Math.max(allQuizPool.length, 720) : allQuizPool.length} въпроса)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {dailyStreakCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-extrabold">
                      🔥 Серия: {dailyStreakCount} верни
                    </span>
                  )}
                  <button
                    onClick={handleNextDailyQuestion}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-extrabold transition-colors cursor-pointer"
                    title="Зареди въпрос от следващ предмет и урок"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Следващ въпрос</span>
                  </button>
                </div>
              </div>

              {/* Multi-Subject Filter Strip inside Live Trainer */}
              <div className="flex flex-wrap items-center gap-1.5 pb-1">
                {[
                  { id: 'all' as const, label: '🎲 Всички предмети (Микс)' },
                  { id: 'bel' as const, label: '📚 БЕЛ & Литература' },
                  { id: 'math' as const, label: '📐 Математика' },
                  { id: 'bio_chem' as const, label: '🧬 Биология & Химия' },
                  { id: 'phys_geo' as const, label: '⚡ Физика & География' },
                  { id: 'phil_eng' as const, label: '🧠 Философия & Езици' },
                  { id: 'specialties' as const, label: '💻 ИТ, Бизнес & Специалности' },
                  { id: 'history' as const, label: '🏛️ История' }
                ].map((pill) => {
                  const isActive = trainerSubjectFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => handleSelectTrainerFilter(pill.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-indigo-700 shadow-2xs'
                          : 'bg-slate-50 hover:bg-blue-50/70 text-slate-700 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>

              {currentDailyItem && (
                <>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-bold text-blue-700">
                      {currentDailyItem.lesson.subject} • {currentDailyItem.lesson.grade}
                    </span>
                    <button
                      onClick={() => onSelectLesson?.(currentDailyItem.lesson, 'summary')}
                      className="text-blue-600 hover:underline font-bold"
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
                className="inline-flex items-center gap-1.5 font-extrabold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <span>Пусни 100-точков симулатор</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Widget B: Live Study Focus Timer (Pomodoro) & Student Telemetry (5 cols on lg) */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-900 border-2 border-indigo-400/30 text-white shadow-md flex flex-col justify-between space-y-5 cv-widget">
            
            {/* Pomodoro Focus Timer Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                    Фокус Таймер & Телеметрия
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-lg border border-white/15 text-[11px]">
                  <button
                    onClick={() => handleSelectTimerMode(25)}
                    className={`px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer ${
                      timerModeMinutes === 25 ? 'bg-emerald-400 text-emerald-950' : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    25 мин
                  </button>
                  <button
                    onClick={() => handleSelectTimerMode(45)}
                    className={`px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer ${
                      timerModeMinutes === 45 ? 'bg-emerald-400 text-emerald-950' : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    45 мин (Урок)
                  </button>
                </div>
              </div>

              {/* Digital Clock & Controls */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-blue-200 font-medium">
                    Сесия за дълбока концентрация
                  </div>
                  <div className="text-3xl sm:text-4xl font-mono font-black tracking-wider text-white mt-0.5">
                    {formattedTimer}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-3.5 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                      isTimerRunning
                        ? 'bg-amber-400 hover:bg-amber-300 text-amber-950'
                        : 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950'
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
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
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
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-emerald-400/30 text-left transition-colors cursor-pointer"
                >
                  <div className="text-[10px] text-emerald-200 uppercase font-bold">Усвоени теми</div>
                  <div className="text-base sm:text-lg font-black text-emerald-300 mt-0.5">
                    {telemetry.masteredCount} / {totalLessonsCount}
                  </div>
                  <div className="text-[10px] text-blue-200 mt-0.5">Отвори Планера →</div>
                </button>

                <button
                  onClick={() => onNavigateTab('oralexam')}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-sky-400/30 text-left transition-colors cursor-pointer"
                >
                  <div className="text-[10px] text-sky-200 uppercase font-bold">Устен изпит</div>
                  <div className="text-base sm:text-lg font-black text-sky-300 mt-0.5">
                    {telemetry.oralExamCount > 0 ? `Ср. ${telemetry.oralAvgGrade}` : 'Готов за тест'}
                  </div>
                  <div className="text-[10px] text-blue-200 mt-0.5">Пред дъската →</div>
                </button>

                <button
                  onClick={() => onNavigateTab('errorbank')}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/30 text-left transition-colors cursor-pointer"
                >
                  <div className="text-[10px] text-amber-200 uppercase font-bold">Банка грешки</div>
                  <div className="text-base sm:text-lg font-black text-amber-300 mt-0.5">
                    {telemetry.unresolvedErrors} за преговор
                  </div>
                  <div className="text-[10px] text-blue-200 mt-0.5">Поправи ги →</div>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                <span>Персонален седмичен план за Отличен 6.00</span>
              </span>
              <button
                onClick={() => onNavigateTab('planner')}
                className="text-emerald-300 hover:text-emerald-200 font-extrabold cursor-pointer"
              >
                Отвори планера →
              </button>
            </div>
          </div>

        </div>
      </section>

      <DeferredSection minHeight={1100}>
        <HomeSchoolsSection lessons={lessons} onNavigateTab={onNavigateTab} onSelectLesson={onSelectLesson} onRequestFullCurriculum={onRequestFullCurriculum} />
      </DeferredSection>

      <DeferredSection minHeight={900}>
        <HomeTrainerSection lessons={lessons} onNavigateTab={onNavigateTab} onSelectLesson={onSelectLesson} onRequestFullCurriculum={onRequestFullCurriculum} />
      </DeferredSection>

      <DeferredSection minHeight={1000}>
        <HomePillarsSection totalLessonsCount={totalLessonsCount} onNavigateTab={onNavigateTab} />
      </DeferredSection>

      <DeferredSection minHeight={1200}>
        <HomeCurriculumSection lessons={lessons} totalLessonsCount={totalLessonsCount} onNavigateTab={onNavigateTab} onSelectLesson={onSelectLesson} onRequestFullCurriculum={onRequestFullCurriculum} />
      </DeferredSection>

      {/* ========================================================================= */}
      {/* 5. SMARTSCAN AI BANNER: NOTEBOOK CAMERA DIAGNOSTIC */}
      {/* ========================================================================= */}
      <section id="smartscan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 border-b-4 border-indigo-950 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-white/15 text-sky-200 border border-white/25">
              <Camera className="w-3.5 h-3.5 text-emerald-300" />
              <span>SmartScan OCR • Изкуствен интелект</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Имаш снимка на тетрадката или учебника?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Качи снимка на своите записки — StudyBG разпознава ръкописния текст, извлича ключовите понятия по конспекта на МОН и генерира персонализиран тест за проверка на знанията за 5 секунди.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onOpenScan?.()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-emerald-950 border-b-2 border-teal-800 text-xs font-black transition-all cursor-pointer shadow-xs"
            >
              <Camera className="w-4 h-4 text-emerald-950" />
              <span>Сканирай тетрадка (OCR)</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenFormulaModal?.()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 text-xs font-bold transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Справочници и свитъци на МОН</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CULTURAL CONTEXT & HISTORICAL MYSTERIES (PORTAL 2 BRIDGE) */}
      {/* ========================================================================= */}
      <section id="culture-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/80 to-yellow-100/70 border-2 border-amber-300 border-b-4 border-b-amber-500 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-200/80 text-amber-950 border border-amber-400">
              <Award className="w-3.5 h-3.5 text-amber-800" />
              <span>🕵️ Портал „Обща култура, Конспирации & Загадки“</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              41 конспиративни досиета и мистерии, 12 гео-радарни зони, 18 природни феномена и 38 куиз въпроса
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Операция „Слава“ в Царичина, експедицията за богинята Бастет и светилището Индипасха в Странджа, кодът на Златното сечение (Φ=1.618) във Варненското злато, Побитите камъни, шифрите на Раковски, космическата оранжерия „СВЕТ“ и дозиметрите „Люлин“ около Марс!
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => onNavigateCultureTab?.('mysteries')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-b-2 border-orange-900 font-extrabold text-xs transition-all cursor-pointer shadow-xs"
            >
              <Compass className="w-4 h-4 text-white" />
              <span>Отвори 41-те секретни досиета</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateCultureTab?.('mysticmap')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-amber-100/80 text-amber-950 border-2 border-amber-300 font-extrabold text-xs transition-colors cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Гео-радарна карта (12 зони)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PARTNERSHIP / SYNERGY BRIDGE TO MATURA+ (https://maturaplus.eu) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
        <MaturaPlusBridgeBanner source="hero" />
      </section>

    </div>
  );
};
