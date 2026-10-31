import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  RotateCw,
  CheckCircle2,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Shuffle,
  HelpCircle,
  Layers,
  BookOpen,
  CheckSquare,
  Zap,
  Trophy,
  Lightbulb,
  Clock,
  Globe
} from 'lucide-react';
import type { Flashcard, LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import {
  LEITNER_INTERVAL_DAYS,
  boxLabel,
  getLeitnerCardState,
  getLeitnerSummaryForCards,
  getGlobalLeitnerDueStats,
  collectGlobalDueFlashcards,
  recordLeitnerCardReview,
  resetLeitnerCardsForLesson,
  type GlobalFlashcardItem,
  type LeitnerBox,
  type Response as LeitnerResponse
} from '../lib/leitnerFlashcards';

interface FlashcardsViewProps {
  flashcards: Flashcard[];
  allLessons?: LessonData[];
  onProceedToQuiz: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

const LEITNER_BOXES: LeitnerBox[] = [1, 2, 3, 4, 5];

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  flashcards,
  allLessons = [],
  onProceedToQuiz,
  onNavigateTab
}) => {
  const [cards, setCards] = useState<GlobalFlashcardItem[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [onlyReviewMode, setOnlyReviewMode] = useState(false);
  const [selectedBoxFilter, setSelectedBoxFilter] = useState<LeitnerBox | 'all' | 'due' | 'global_due'>('all');
  const [leitnerTick, setLeitnerTick] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [justMasteredXp, setJustMasteredXp] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);

  const allCardIds = useMemo(() => flashcards.map((c) => c.id), [flashcards]);

  const leitnerSummary = useMemo(() => {
    void leitnerTick;
    return getLeitnerSummaryForCards(allCardIds);
  }, [allCardIds, leitnerTick]);

  const globalLeitnerStats = useMemo(() => {
    void leitnerTick;
    return getGlobalLeitnerDueStats();
  }, [leitnerTick]);

  const globalDueDeck = useMemo(() => {
    void leitnerTick;
    return collectGlobalDueFlashcards(allLessons, flashcards);
  }, [allLessons, flashcards, leitnerTick]);

  // Update cards when lesson changes
  useEffect(() => {
    setCards(flashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setOnlyReviewMode(false);
    setSelectedBoxFilter('all');
    setSessionXp(0);
    setRepeatCount(0);
    setFeedbackNotice(null);
    setIsSessionCompleted(false);
  }, [flashcards]);

  const card = cards[currentIndex] || cards[0];
  const cardLeitnerState = useMemo(() => {
    void leitnerTick;
    return card ? getLeitnerCardState(card.id) : null;
  }, [card, leitnerTick]);

  const progressPercent = Math.round(((currentIndex + 1) / Math.max(1, cards.length)) * 100);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsSessionCompleted(true);
    }
  }, [currentIndex, cards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleToggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleLeitnerReview = useCallback(
    (id: string, response: LeitnerResponse) => {
      const updated = recordLeitnerCardReview(id, response);
      setLeitnerTick((t) => t + 1);
      setIsFlipped(false);

      if (response === 'easy') {
        setSessionXp((xp) => xp + 5);
        setJustMasteredXp(true);
        setTimeout(() => setJustMasteredXp(false), 1200);
        setFeedbackNotice(
          `✓ Картата премина в Кутия ${updated.box} (${boxLabel(updated.box)}) • Следващ преговор след ${LEITNER_INTERVAL_DAYS[updated.box]} дни`
        );
        setTimeout(() => setFeedbackNotice(null), 2400);
        handleNext();
      } else if (response === 'medium') {
        setSessionXp((xp) => xp + 2);
        setFeedbackNotice(
          `• Картата остава в Кутия ${updated.box} (${boxLabel(updated.box)}) • Преговор след ${LEITNER_INTERVAL_DAYS[updated.box]} дни`
        );
        setTimeout(() => setFeedbackNotice(null), 2400);
        handleNext();
      } else {
        setRepeatCount((c) => c + 1);
        setFeedbackNotice('🔄 Картата е върната в Кутия 1 (1 ден) и добавена в края на сесията за преговор');
        setTimeout(() => setFeedbackNotice(null), 2400);

        setCards((prevQueue) => {
          if (prevQueue.length <= 1) return [...prevQueue];
          const current = prevQueue[currentIndex];
          if (!current) return prevQueue;
          const rest = prevQueue.filter((_, idx) => idx !== currentIndex);
          return [...rest, current];
        });
        setCurrentIndex((prev) => (prev >= cards.length - 1 ? 0 : prev));
      }
    },
    [cards.length, currentIndex, handleNext]
  );

  // Keyboard navigation (Space = Flip, 1/← = Hard, 2 = Medium, 3/→ = Easy)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (!card || isSessionCompleted) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleToggleFlip();
      } else if (e.key === '1') {
        e.preventDefault();
        handleLeitnerReview(card.id, 'hard');
      } else if (e.key === '2') {
        e.preventDefault();
        handleLeitnerReview(card.id, 'medium');
      } else if (e.key === '3') {
        e.preventDefault();
        handleLeitnerReview(card.id, 'easy');
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [card, isSessionCompleted, handleToggleFlip, handleLeitnerReview, handleNext, handlePrev]);

  const applyFilter = (mode: LeitnerBox | 'all' | 'due' | 'global_due', reviewOnly: boolean) => {
    setIsSessionCompleted(false);
    setCurrentIndex(0);
    setIsFlipped(false);

    if (reviewOnly) {
      const reviewSet = new Set(leitnerSummary.reviewIds);
      const filtered = flashcards.filter((c) => reviewSet.has(c.id));
      if (filtered.length > 0) {
        setCards(filtered);
        setOnlyReviewMode(true);
        setSelectedBoxFilter('all');
        return;
      }
    }

    setOnlyReviewMode(false);
    setSelectedBoxFilter(mode);

    if (mode === 'all') {
      setCards(flashcards);
    } else if (mode === 'due') {
      const dueSet = new Set(leitnerSummary.dueIds);
      const filtered = flashcards.filter((c) => dueSet.has(c.id));
      setCards(filtered.length > 0 ? filtered : flashcards);
    } else if (mode === 'global_due') {
      setCards(globalDueDeck.length > 0 ? globalDueDeck : flashcards);
    } else {
      const filtered = flashcards.filter((c) => getLeitnerCardState(c.id).box === mode);
      setCards(filtered.length > 0 ? filtered : flashcards);
    }
  };

  const handleToggleOnlyReviewMode = () => {
    if (!onlyReviewMode) {
      if (leitnerSummary.reviewIds.length === 0) return;
      applyFilter('all', true);
    } else {
      applyFilter('all', false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionCompleted(false);
    setFeedbackNotice('🔀 Тестето беше разбъркано');
    setTimeout(() => setFeedbackNotice(null), 1800);
  };

  const handleResetCards = () => {
    resetLeitnerCardsForLesson(allCardIds);
    setLeitnerTick((t) => t + 1);
    setCards(flashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setOnlyReviewMode(false);
    setSelectedBoxFilter('all');
    setSessionXp(0);
    setRepeatCount(0);
    setIsSessionCompleted(false);
  };

  if (!card) return null;

  return (
    <div className="space-y-6">
      {/* Top Controls & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>
              {onlyReviewMode
                ? 'Режим: Само карти за преговор'
                : 'Leitner система за интервално повторение (Spaced Repetition)'}
            </span>
          </div>
          <div className="text-sm font-semibold text-slate-700">
            Карта <span className="text-slate-900 font-bold">{currentIndex + 1}</span> от{' '}
            <span className="text-slate-900 font-bold">{cards.length}</span>
          </div>
        </div>

        {/* Mastered Badges, XP Counter & Tools */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold relative">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>+{sessionXp} XP</span>
            {justMasteredXp && (
              <span className="absolute -top-2.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold animate-bounce">
                +5
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Усвоени: {leitnerSummary.masteredIds.length}</span>
          </div>

          <button
            type="button"
            onClick={handleToggleOnlyReviewMode}
            disabled={!onlyReviewMode && leitnerSummary.reviewIds.length === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              onlyReviewMode
                ? 'bg-rose-600 text-white border-rose-600 font-bold cursor-pointer'
                : leitnerSummary.reviewIds.length > 0
                ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-800 cursor-pointer'
                : 'bg-rose-50 border-rose-200 text-rose-800 opacity-75'
            }`}
            title={
              onlyReviewMode
                ? 'Покажи отново всички флашкарти от урока'
                : leitnerSummary.reviewIds.length > 0
                ? 'Филтрирай и упражни само картите, отбелязани за преговор'
                : 'Отбележи карти със „За преговор“, за да ги упражниш отделно'
            }
          >
            <RotateCcw className={`w-3.5 h-3.5 ${onlyReviewMode ? 'text-white' : 'text-rose-600'}`} />
            <span>
              {onlyReviewMode ? `Всички карти (${flashcards.length})` : `За преговор: ${leitnerSummary.reviewIds.length}`}
            </span>
          </button>

          <button
            onClick={handleShuffle}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
            title="Разбъркай картите"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetCards}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
            title="Започни отначало (нулирай Leitner кутиите за урока)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('summary')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs"
                title="Отвори резюмето на урока"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Конспект</span>
              </button>
              <button
                onClick={() => onNavigateTab('audit')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs"
                title="Отвори одит на записките за 6.00"
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>Одит</span>
              </button>
            </>
          )}

          <button
            onClick={onProceedToQuiz}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs ml-auto sm:ml-0"
          >
            <span>Към Теста</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5-Box Leitner Spaced Repetition Strip */}
      <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>5 кутии на Лайтнер (Spaced Repetition):</span>
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => applyFilter('all', false)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedBoxFilter === 'all' && !onlyReviewMode
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Всички ({flashcards.length})
            </button>
            <button
              type="button"
              onClick={() => applyFilter('due', false)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedBoxFilter === 'due'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              За преговор днес ({leitnerSummary.dueIds.length})
            </button>
            <button
              type="button"
              onClick={() => applyFilter('global_due', false)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedBoxFilter === 'global_due'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
              }`}
              title="Събира на едно място всички флаш карти от целия каталог, чийто интервал за преговор е настъпил днес"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>
                От всички уроци днес ({globalLeitnerStats.dueIds.length > 0 ? globalLeitnerStats.dueIds.length : globalDueDeck.length})
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {LEITNER_BOXES.map((box) => {
            const count = leitnerSummary.boxCounts[box] ?? 0;
            const isSelected = selectedBoxFilter === box;
            return (
              <button
                key={box}
                type="button"
                disabled={count === 0 && !isSelected}
                onClick={() => applyFilter(isSelected ? 'all' : box, false)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer disabled:opacity-50 disabled:cursor-default ${
                  isSelected
                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-400'
                    : box >= 4
                    ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Кутия {box}</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[11px]">
                    {count}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5 capitalize">
                  {boxLabel(box)} • на {LEITNER_INTERVAL_DAYS[box]} д.
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackNotice && (
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-900 animate-fadeIn">
            {feedbackNotice}
          </span>
        </div>
      )}

      {isSessionCompleted ? (
        /* Session Completion Summary (ported from MaturaPlus FlashcardsSummary) */
        <div className="w-full max-w-xl mx-auto py-8 sm:py-10 px-4 text-center bg-white rounded-2xl border border-slate-200 shadow-xs animate-fadeIn">
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="w-20 h-20 rounded-2xl bg-emerald-600 p-0.5 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
            <Lightbulb className="w-3.5 h-3.5" /> Leitner сесията завърши успешно!
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Отлична работа!</h2>
          <p className="text-slate-600 text-sm mt-1.5 max-w-md mx-auto leading-relaxed">
            Преминахте всички карти в текущата селекция. Интервалите за следващ преговор са обновени по системата на Лайтнер.
          </p>

          <div className="grid grid-cols-3 gap-3 my-6 max-w-md mx-auto">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-extrabold text-emerald-700">{leitnerSummary.masteredIds.length}</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">Усвоени карти</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-extrabold text-amber-700">+{sessionXp}</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> XP Бонус
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-extrabold text-blue-700">
                {Math.round((leitnerSummary.masteredIds.length / Math.max(1, flashcards.length)) * 100)}%
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">Усвояемост</div>
            </div>
          </div>

          {repeatCount > 0 && (
            <p className="text-xs text-slate-500 mb-5">
              🔄 Повторихте {repeatCount} {repeatCount === 1 ? 'карта' : 'карти'} по метода на интервалното затвърждаване.
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsSessionCompleted(false);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Преговори отново тестето</span>
            </button>
            <button
              type="button"
              onClick={onProceedToQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <span>Към Теста</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Flashcard 3D Container */}
          <div
            className="perspective-1000 max-w-2xl mx-auto min-h-[320px] cursor-pointer select-none"
            onClick={handleToggleFlip}
          >
            <div
              className={`relative w-full min-h-[320px] rounded-2xl transition-transform duration-500 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between backface-hidden">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {card.tag || 'Учебна концепция'}
                    </span>
                    {card.lessonTitle && selectedBoxFilter === 'global_due' && (
                      <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 truncate max-w-[260px]">
                        {card.lessonSubject ? `${card.lessonSubject} • ` : ''}{card.lessonTitle}
                      </span>
                    )}
                    {cardLeitnerState && (
                      <span className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        Кутия {cardLeitnerState.box} • {boxLabel(cardLeitnerState.box)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <RotateCw className="w-3 h-3 text-slate-400" />
                    <span>Space / клик за отговор</span>
                  </span>
                </div>

                <div className="my-auto py-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {card.front}
                  </h3>
                  {card.hint && (
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>Насока: {card.hint}</span>
                    </div>
                  )}
                </div>

                <div className="text-center text-xs text-slate-500">
                  Натиснете за показване на официалния отговор
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full p-8 rounded-2xl bg-emerald-50/40 border border-emerald-300 shadow-sm flex flex-col justify-between rotate-y-180 backface-hidden">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Официална дефиниция
                  </span>
                  <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      Проверено по МОН
                      {cardLeitnerState && cardLeitnerState.timesReviewed > 0
                        ? ` • Преговаряна ${cardLeitnerState.timesReviewed}×`
                        : ''}
                    </span>
                  </span>
                </div>

                <div className="my-auto py-6 text-center">
                  <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                    {card.back}
                  </p>
                </div>

                <div className="text-center text-xs text-slate-500">
                  Оценете знанието си по скалата на Лайтнер отдолу (клавиши 1, 2 или 3)
                </div>
              </div>
            </div>
          </div>

          {/* 3-Button Leitner Self-Assessment Controls */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleLeitnerReview(card.id, 'hard')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold transition-all active:scale-98 shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-rose-600 shrink-0" />
              <span>За преговор (Кутия 1 • 1д)</span>
            </button>

            <button
              type="button"
              onClick={() => handleLeitnerReview(card.id, 'medium')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold transition-all active:scale-98 shadow-2xs cursor-pointer"
            >
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Средно (Запази кутията)</span>
            </button>

            <button
              type="button"
              onClick={() => handleLeitnerReview(card.id, 'easy')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-all active:scale-98 shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Усвоено (+1 кутия • +5 XP)</span>
            </button>
          </div>

          {/* Navigation Arrows & Keyboard Hints */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-2xl mx-auto pt-2 text-xs text-slate-500">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 border border-slate-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Предишна</span>
            </button>

            <div className="text-[11px] text-slate-500 hidden sm:block">
              Клавиши: <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">Space</kbd> обръщане,{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">1</kbd> трудна,{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">2</kbd> средна,{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">3</kbd> усвоена
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 border border-slate-200 transition-colors"
            >
              <span>Следваща</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
