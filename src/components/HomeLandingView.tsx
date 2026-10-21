import React, { useState, useEffect, useMemo, lazy } from 'react';
import { GraduationCap, Clock, Camera, ArrowRight, FileText, ChevronRight, Award, Compass, Search, Play, Pause, RotateCcw, CheckCircle2, XCircle, Zap, Calendar, RefreshCw, X, ShieldCheck, BookOpen, Sigma, Dna, FlaskConical, Gem, School, Mic, PenTool, Feather, BookMarked, MapPin, Target, Flame, Calculator } from 'lucide-react';
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

  const quickSearchChips = [
    { label: 'Талев & Димов (ДЗИ)', query: 'Талев', Icon: BookOpen },
    { label: 'Производни & екстремуми', query: 'Производни', Icon: Sigma },
    { label: 'Митоза и мейоза', query: 'Митоза', Icon: Dna },
    { label: 'ОРП & електрохимия', query: 'Окислително', Icon: FlaskConical },
    { label: 'Варненското злато', query: 'Варненското злато', Icon: Gem },
    { label: 'Операция Царичина', query: 'Царичина', Icon: Compass }
  ];

  const quickLabs: { label: string; Icon: typeof Mic; onClick: () => void }[] = [
    { label: 'Училища & специалности', Icon: School, onClick: () => onNavigateTab('specialties') },
    { label: 'Устно изпитване', Icon: Mic, onClick: () => onNavigateTab('oralexam') },
    { label: 'Природни науки', Icon: FlaskConical, onClick: () => onNavigateTab('sciencelab') },
    { label: 'Математика & STEM', Icon: Calculator, onClick: () => onNavigateTab('mathlab') },
    { label: 'Правопис (Модул 1)', Icon: PenTool, onClick: () => onNavigateTab('grammar') },
    { label: 'Тропи & резюме (Модул 2)', Icon: Feather, onClick: () => onNavigateTab('moduletwo') },
    { label: 'Литературен канон', Icon: BookMarked, onClick: () => onNavigateTab('literature') },
    { label: 'Гео-радарна карта', Icon: MapPin, onClick: () => onNavigateCultureTab?.('mysticmap') },
    { label: 'Блиц за 60 сек.', Icon: Zap, onClick: () => onNavigateTab('blitz') }
  ];

  return (
    <div className="space-y-16 pb-5">

      {/* ========================================================================= */}
      {/* 1. HERO — композицията на Матура Плюс: статус, заглавие, търсачка, демо панел */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-2 sm:pt-16 text-center">
        <div className="max-w-5xl mx-auto px-4">

          {/* Статус на учебната база — реалните числа от данните */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-blue-200/90 bg-blue-50/90 px-4 py-1.5 text-xs font-semibold text-blue-800 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
            <span>Програми на МОН 2026/2027</span>
            <span className="text-blue-300" aria-hidden="true">•</span>
            <span>{totalLessonsCount} урока</span>
            <span className="text-blue-300" aria-hidden="true">•</span>
            <span>41 секретни досиета</span>
            <span className="text-blue-300 hidden sm:inline" aria-hidden="true">•</span>
            <span className="hidden sm:inline">12 лаборатории</span>
          </div>

          <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-slate-900 max-w-4xl mx-auto text-balance">
            Национална дигитална академия за{' '}
            <span className="text-brand-sapphire">НВО&nbsp;7, НВО&nbsp;10 и ДЗИ&nbsp;12</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Уроци, флашкарти и тестове по всички предмети от 5. до 12. клас по програмите на МОН — със симулатори за 100 точки, устно изпитване пред дъската, STEM лаборатории и SmartScan за тетрадки.
          </p>

          {/* Търсачката е главното действие — на мястото на CTA бутона в Матура Плюс */}
          <div className="mt-8 max-w-3xl mx-auto relative text-left">
            <label htmlFor="home-omni-search" className="sr-only">
              Търси урок, тема, автор или формула
            </label>
            <div className="relative flex items-center rounded-xl border border-slate-200 bg-white shadow-sm shadow-blue-500/10 transition-shadow focus-within:border-brand-sapphire focus-within:ring-2 focus-within:ring-brand-sapphire/15">
              <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" aria-hidden="true" />
              <input
                id="home-omni-search"
                type="text"
                value={omniSearchQuery}
                onChange={(e) => setOmniSearchQuery(e.target.value)}
                onFocus={onRequestFullCurriculum}
                placeholder={`Търси сред ${totalLessonsCount} урока, мистерии, формули или автори…`}
                className="w-full min-h-12 py-3.5 px-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 focus:outline-none bg-transparent"
              />
              {omniSearchQuery && (
                <button
                  onClick={() => setOmniSearchQuery('')}
                  className="p-2 mr-1 text-slate-500 hover:text-slate-700 rounded-lg"
                  aria-label="Изчисти търсенето"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onNavigateTab('catalog')}
                className="hidden sm:inline-flex items-center gap-1.5 mr-1.5 px-4 py-2.5 rounded-lg bg-brand-sapphire hover:bg-brand-sapphire-light active:scale-[0.98] text-white text-sm font-bold transition shrink-0 cursor-pointer shadow-sm"
              >
                <span>Пълен каталог</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Бързо търсене */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium mr-0.5">Бързо търсене:</span>
              {quickSearchChips.map(({ label, query, Icon }) => (
                <button
                  key={label}
                  onClick={() => {
                    onRequestFullCurriculum?.();
                    setOmniSearchQuery(query);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/60 text-slate-700 hover:text-brand-sapphire font-medium transition-colors cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Резултати от търсенето */}
            {omniResults && (
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-900/5 space-y-4 z-30">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-700">
                    Резултати за „<span className="text-brand-sapphire">{omniSearchQuery}</span>“ ({omniResults.total})
                  </span>
                  <button
                    onClick={() => setOmniSearchQuery('')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    <span>Затвори</span>
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                {omniResults.total === 0 ? (
                  <div className="py-6 text-center text-sm text-slate-500">
                    Няма директно съвпадение. Опитай с друга ключова дума или разгледай пълния каталог със {totalLessonsCount} урока.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-brand-sapphire">
                        <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Учебни уроци по МОН ({omniResults.matchedLessons.length})</span>
                      </div>
                      {omniResults.matchedLessons.length === 0 ? (
                        <p className="text-xs text-slate-500">Няма намерени уроци по тази дума.</p>
                      ) : (
                        omniResults.matchedLessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-3 rounded-xl border border-slate-200/80 bg-white hover:border-blue-200 hover:bg-blue-50/40 transition-colors flex flex-col justify-between gap-2"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-500">
                                <span className="text-brand-sapphire">{lesson.subject}</span>
                                <span className="tabular-nums">{lesson.grade}</span>
                              </div>
                              <div className="text-sm font-semibold text-slate-900 mt-0.5">{lesson.title}</div>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <button
                                onClick={() => {
                                  setOmniSearchQuery('');
                                  onSelectLesson?.(lesson, 'summary');
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-sapphire hover:bg-brand-sapphire-light text-white text-xs font-semibold transition-colors cursor-pointer"
                              >
                                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Конспект</span>
                              </button>
                              <button
                                onClick={() => {
                                  setOmniSearchQuery('');
                                  onSelectLesson?.(lesson, 'quiz');
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                                <span>Тест ({lesson.quiz.length})</span>
                              </button>
                              <button
                                onClick={() => {
                                  setOmniSearchQuery('');
                                  onSelectLesson?.(lesson, 'oralexam');
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                <Mic className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                                <span>Устен</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                        <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Секретни досиета & мистерии ({omniResults.matchedMysteries.length})</span>
                      </div>
                      {omniResults.matchedMysteries.length === 0 ? (
                        <p className="text-xs text-slate-500">Няма намерени досиета по тази дума.</p>
                      ) : (
                        omniResults.matchedMysteries.map((mystery) => (
                          <button
                            key={mystery.id}
                            type="button"
                            onClick={() => {
                              try {
                                sessionStorage.setItem('studybg_focus_mystery_id', mystery.id);
                              } catch {
                                // ignore storage errors
                              }
                              setOmniSearchQuery('');
                              onNavigateCultureTab?.('mysteries');
                            }}
                            className="w-full text-left p-3 rounded-xl border border-amber-200/80 bg-amber-50/50 hover:bg-amber-50 transition-colors cursor-pointer space-y-1"
                          >
                            <div className="flex items-center justify-between text-[11px] font-semibold text-amber-800">
                              <span>{mystery.tag}</span>
                              <span className="inline-flex items-center gap-1">Досие <ArrowRight className="w-3 h-3" aria-hidden="true" /></span>
                            </div>
                            <div className="text-sm font-semibold text-slate-900">{mystery.title}</div>
                            <p className="text-xs text-slate-600 line-clamp-2">{mystery.subtitle}</p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <p className="mt-4 text-center text-xs font-medium text-slate-500">
              Безплатно и без регистрация • Вход с Google само за синхронизация на напредъка
            </p>
          </div>
        </div>

        {/* Демо панел с двата портала — като превюто в hero на Матура Плюс */}
        <div className="mt-12 md:mt-14 max-w-5xl mx-auto px-4 text-left">
          <div className="relative rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-4 sm:p-7 shadow-sm shadow-blue-500/10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
                <h2 className="text-sm font-bold text-slate-800">
                  Учебната академия StudyBG — избери откъде да започнеш
                </h2>
              </div>
              {onOpenAuthModal && (
                <button
                  type="button"
                  onClick={onOpenAuthModal}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
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
                      : 'Вход с Google'}
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-semibold tabular-nums">
                    <Flame className="w-3 h-3 text-amber-600" aria-hidden="true" />
                    {heroDailyStreak}д
                  </span>
                </button>
              )}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {/* Портал 1: Учебната академия */}
              <button
                onClick={() => onNavigateTab('summary')}
                className="group flex flex-col justify-between rounded-2xl border border-blue-100 bg-blue-50/40 p-5 text-left transition hover:border-blue-200 hover:bg-blue-50/70 hover:shadow-md hover:shadow-blue-500/10 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand-sapphire border border-blue-100 shadow-xs">
                      <GraduationCap className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-blue-100/80 px-2.5 py-0.5 text-xs font-semibold text-blue-800 tabular-nums">
                      {totalLessonsCount} урока • 13 предмета
                    </span>
                  </div>
                  <h3 className="mt-4 flex items-center gap-1.5 text-lg font-bold text-slate-900">
                    <span>Влез в учебната академия</span>
                    <ArrowRight className="w-4 h-4 text-brand-sapphire transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                    Пълни конспекти, устно изпитване пред дъската, 100-точков симулатор за НВО 7, НВО 10 и ДЗИ, STEM лаборатории и бележник към всеки урок.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs font-semibold text-brand-sapphire">
                  <span>Официална подготовка по МОН (5.–12. клас)</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </button>

              {/* Портал 2: Обща култура и мистерии */}
              <button
                onClick={() => onNavigateCultureTab?.('mysteries')}
                className="group flex flex-col justify-between rounded-2xl border border-amber-100 bg-amber-50/40 p-5 text-left transition hover:border-amber-200 hover:bg-amber-50/70 hover:shadow-md hover:shadow-amber-500/10 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-amber-700 border border-amber-100 shadow-xs">
                      <Compass className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-amber-100/80 px-2.5 py-0.5 text-xs font-semibold text-amber-900 tabular-nums">
                      41 досиета • 12 зони
                    </span>
                  </div>
                  <h3 className="mt-4 flex items-center gap-1.5 text-lg font-bold text-slate-900">
                    <span>Обща култура & загадки</span>
                    <ArrowRight className="w-4 h-4 text-amber-700 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                    41 секретни досиета — Царичина, Бастет в Странджа, Варненското злато, Побитите камъни, Раковски, „СВЕТ“ и „Люлин“ — гео-радарна карта и куиз въпроси.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-semibold text-amber-800">
                  <span>Конспирации, мистерии и ерудиция</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </button>
            </div>

            {/* Бърз достъп до лабораториите */}
            <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-700 mr-1">Лаборатории с 1 клик:</span>
              {quickLabs.map(({ label, Icon, onClick }) => (
                <button
                  key={label}
                  type="button"
                  onClick={onClick}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:border-blue-200 hover:text-brand-sapphire text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ТРЕНАЖОР + ФОКУС ТАЙМЕР */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* Тренажор на живо */}
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between gap-4 cv-widget">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-brand-sapphire">
                    <Target className="w-4.5 h-4.5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Тренажор на живо</h2>
                    <p className="text-xs text-slate-500 tabular-nums">
                      Изпитни въпроси от всички предмети ({trainerSubjectFilter === 'all' ? Math.max(allQuizPool.length, 720) : allQuizPool.length})
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {dailyStreakCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tabular-nums">
                      <Flame className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                      Серия: {dailyStreakCount}
                    </span>
                  )}
                  <button
                    onClick={handleNextDailyQuestion}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    title="Зареди въпрос от следващ предмет и урок"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                    <span>Следващ въпрос</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pb-1">
                {[
                  { id: 'all' as const, label: 'Всички предмети' },
                  { id: 'bel' as const, label: 'БЕЛ & литература' },
                  { id: 'math' as const, label: 'Математика' },
                  { id: 'bio_chem' as const, label: 'Биология & химия' },
                  { id: 'phys_geo' as const, label: 'Физика & география' },
                  { id: 'phil_eng' as const, label: 'Философия & езици' },
                  { id: 'specialties' as const, label: 'ИТ, бизнес & специалности' },
                  { id: 'history' as const, label: 'История' }
                ].map((pill) => {
                  const isActive = trainerSubjectFilter === pill.id;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => handleSelectTrainerFilter(pill.id)}
                      aria-pressed={isActive}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                        isActive
                          ? 'bg-brand-sapphire text-white border-brand-sapphire'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>

              {currentDailyItem && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-brand-sapphire">
                      {currentDailyItem.lesson.subject} • {currentDailyItem.lesson.grade}
                    </span>
                    <button
                      onClick={() => onSelectLesson?.(currentDailyItem.lesson, 'summary')}
                      className="text-brand-sapphire hover:underline underline-offset-2 font-semibold"
                    >
                      <span className="inline-flex items-center gap-1">Към урока: {currentDailyItem.lesson.title.slice(0, 38)}… <ArrowRight className="w-3 h-3" aria-hidden="true" /></span>
                    </button>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 leading-snug">
                    {currentDailyItem.question.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {currentDailyItem.question.options.map((opt, idx) => {
                      const isSelected = selectedOptionIdx === idx;
                      const isCorrect = idx === currentDailyItem.question.correctIndex;
                      const showResult = selectedOptionIdx !== null;

                      let btnStyle = 'bg-white hover:bg-blue-50/50 border-slate-200 hover:border-blue-200 text-slate-800';
                      if (showResult) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-50 border-rose-300 text-rose-950 font-medium';
                        } else {
                          btnStyle = 'bg-white border-slate-200 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerDailyQuestion(idx)}
                          disabled={showResult}
                          className={`p-3 rounded-xl border text-left text-sm transition-colors flex items-start justify-between gap-2 cursor-pointer disabled:cursor-default ${btnStyle}`}
                        >
                          <span>
                            <strong className="mr-1.5 font-semibold text-slate-500">
                              {['А)', 'Б)', 'В)', 'Г)'][idx] || `${idx + 1}.`}
                            </strong>
                            {opt}
                          </span>
                          {showResult && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOptionIdx !== null && (
                    <div
                      className={`p-3.5 rounded-xl border text-sm leading-relaxed ${
                        selectedOptionIdx === currentDailyItem.question.correctIndex
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50/80 border-amber-200 text-amber-950'
                      }`}
                    >
                      <div className="font-semibold mb-1">
                        {selectedOptionIdx === currentDailyItem.question.correctIndex
                          ? 'Верен отговор!'
                          : 'Обяснение (записано в Банката с грешки):'}
                      </div>
                      <p>{currentDailyItem.question.explanation}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-500">Искаш пълен изпит с хронометър и проверка на есе?</span>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="inline-flex items-center gap-1.5 font-semibold text-brand-sapphire hover:text-brand-sapphire-dark cursor-pointer"
              >
                <span>Пусни 100-точков симулатор</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Фокус таймер и личен напредък — сапфирената лента от Матура Плюс */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#083861] via-[#0a4b82] to-[#145a96] text-white shadow-sm flex flex-col justify-between gap-5 cv-widget">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/15">
                <h2 className="flex items-center gap-2 text-base font-bold text-white">
                  <Clock className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                  <span>Фокус таймер</span>
                </h2>
                <div className="flex items-center gap-0.5 bg-white/10 p-0.5 rounded-lg border border-white/15 text-xs">
                  <button
                    onClick={() => handleSelectTimerMode(25)}
                    aria-pressed={timerModeMinutes === 25}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                      timerModeMinutes === 25 ? 'bg-white text-brand-sapphire' : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    25 мин
                  </button>
                  <button
                    onClick={() => handleSelectTimerMode(45)}
                    aria-pressed={timerModeMinutes === 45}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                      timerModeMinutes === 45 ? 'bg-white text-brand-sapphire' : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    45 мин (урок)
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-blue-100">Сесия за дълбока концентрация</div>
                  <div className="text-4xl font-bold tracking-tight tabular-nums text-white mt-0.5">
                    {formattedTimer}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`min-h-10 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm ${
                      isTimerRunning ? 'bg-amber-300 hover:bg-amber-200 text-amber-950' : 'bg-white hover:bg-slate-100 text-brand-sapphire'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4" aria-hidden="true" />
                        <span>Пауза</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" aria-hidden="true" />
                        <span>Старт</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setSecondsLeft(timerModeMinutes * 60);
                    }}
                    className="min-h-10 min-w-10 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
                    title="Нулирай таймера"
                    aria-label="Нулирай таймера"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => onNavigateTab('planner')}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-colors cursor-pointer"
                >
                  <div className="text-[11px] text-blue-100 font-medium">Усвоени теми</div>
                  <div className="text-lg font-bold text-white mt-0.5 tabular-nums">
                    {telemetry.masteredCount} / {totalLessonsCount}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-emerald-300 mt-0.5">Планер <ArrowRight className="w-3 h-3" aria-hidden="true" /></div>
                </button>

                <button
                  onClick={() => onNavigateTab('oralexam')}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-colors cursor-pointer"
                >
                  <div className="text-[11px] text-blue-100 font-medium">Устен изпит</div>
                  <div className="text-lg font-bold text-white mt-0.5 tabular-nums">
                    {telemetry.oralExamCount > 0 ? `Ср. ${telemetry.oralAvgGrade}` : 'Готов'}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-emerald-300 mt-0.5">Пред дъската <ArrowRight className="w-3 h-3" aria-hidden="true" /></div>
                </button>

                <button
                  onClick={() => onNavigateTab('errorbank')}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-colors cursor-pointer"
                >
                  <div className="text-[11px] text-blue-100 font-medium">Банка грешки</div>
                  <div className="text-lg font-bold text-white mt-0.5 tabular-nums">
                    {telemetry.unresolvedErrors}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-emerald-300 mt-0.5">За преговор <ArrowRight className="w-3 h-3" aria-hidden="true" /></div>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                <span>Персонален седмичен план за Отличен 6.00</span>
              </span>
              <button
                onClick={() => onNavigateTab('planner')}
                className="text-white hover:text-emerald-200 font-semibold cursor-pointer"
              >
                <span className="inline-flex items-center gap-1">Отвори планера <ArrowRight className="w-3 h-3" aria-hidden="true" /></span>
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
      {/* 5. SMARTSCAN */}
      {/* ========================================================================= */}
      <section id="smartscan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-brand-sapphire">
              <Camera className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Имаш снимка на тетрадката или учебника?
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Качи снимка на записките си — SmartScan разпознава ръкописния текст, извлича ключовите понятия по конспекта на МОН и генерира тест за проверка на знанията.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onOpenScan?.()}
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-sapphire hover:bg-brand-sapphire-light active:scale-[0.98] text-white text-sm font-bold transition shadow-sm cursor-pointer"
            >
              <Camera className="w-4 h-4" aria-hidden="true" />
              <span>Сканирай тетрадка</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenFormulaModal?.()}
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-500" aria-hidden="true" />
              <span>Справочници на МОН</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ОБЩА КУЛТУРА И МИСТЕРИИ */}
      {/* ========================================================================= */}
      <section id="culture-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
        <div className="p-6 sm:p-8 rounded-2xl border border-amber-100 bg-amber-50/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-amber-700 border border-amber-100">
              <Award className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                41 досиета и мистерии, 12 гео-радарни зони и куиз за ерудити
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Операция „Слава“ в Царичина, експедицията за богинята Бастет и светилището в Странджа, Златното сечение във Варненското злато, Побитите камъни, шифрите на Раковски, космическата оранжерия „СВЕТ“ и дозиметрите „Люлин“.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => onNavigateCultureTab?.('mysteries')}
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-800 active:scale-[0.98] text-white text-sm font-bold transition shadow-sm cursor-pointer"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Отвори досиетата</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateCultureTab?.('mysticmap')}
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-amber-200 bg-white hover:bg-amber-50 text-amber-900 text-sm font-bold transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-amber-700" aria-hidden="true" />
              <span>Гео-радарна карта</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ВРЪЗКА КЪМ МАТУРА ПЛЮС */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
        <MaturaPlusBridgeBanner source="hero" />
      </section>

    </div>
  );
};
