import React, { useState, useEffect, useCallback } from 'react';
import { RotateCw, CheckCircle2, RotateCcw, ArrowLeft, ArrowRight, Shuffle, HelpCircle, Layers, BookOpen, CheckSquare } from 'lucide-react';
import type { Flashcard } from '../types';
import type { AppNavTab } from './Navbar';
import confetti from 'canvas-confetti';

interface FlashcardsViewProps {
  flashcards: Flashcard[];
  onProceedToQuiz: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  flashcards,
  onProceedToQuiz,
  onNavigateTab
}) => {
  const [cards, setCards] = useState<Flashcard[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);

  // Update cards when lesson changes
  useEffect(() => {
    setCards(flashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds([]);
    setReviewIds([]);
  }, [flashcards]);

  const card = cards[currentIndex] || cards[0];
  const progressPercent = Math.round(((currentIndex + 1) / cards.length) * 100);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, cards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleToggleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        handleToggleFlip();
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
  }, [handleToggleFlip, handleNext, handlePrev]);

  const handleMarkMastered = (id: string) => {
    if (!masteredIds.includes(id)) {
      const updated = [...masteredIds, id];
      setMasteredIds(updated);
      setReviewIds(reviewIds.filter((item) => item !== id));

      if (updated.length === cards.length) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
    handleNext();
  };

  const handleMarkReview = (id: string) => {
    if (!reviewIds.includes(id)) {
      setReviewIds([...reviewIds, id]);
      setMasteredIds(masteredIds.filter((item) => item !== id));
    }
    handleNext();
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleResetCards = () => {
    setCards(flashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds([]);
    setReviewIds([]);
  };

  if (!card) return null;

  return (
    <div className="space-y-6">
      {/* Top Controls & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Активно припомняне (Active Recall)</span>
          </div>
          <div className="text-sm font-semibold text-slate-700">
            Карта <span className="text-slate-900 font-bold">{currentIndex + 1}</span> от{' '}
            <span className="text-slate-900 font-bold">{cards.length}</span>
          </div>
        </div>

        {/* Mastered Badges & Tools */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Усвоени: {masteredIds.length}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>За преговор: {reviewIds.length}</span>
          </div>

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
            title="Започни отначало"
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
          <div className="absolute inset-0 w-full h-full p-8 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex flex-col justify-between backface-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {card.tag || 'Учебна концепция'}
              </span>
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
          <div className="absolute inset-0 w-full h-full p-8 rounded-2xl bg-emerald-50/40 border-2 border-emerald-300 shadow-sm flex flex-col justify-between rotate-y-180 backface-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Официална дефиниция
              </span>
              <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Проверено по МОН</span>
              </span>
            </div>

            <div className="my-auto py-6 text-center">
              <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                {card.back}
              </p>
            </div>

            <div className="text-center text-xs text-slate-500">
              Оценете знанието си с бутоните отдолу
            </div>
          </div>
        </div>
      </div>

      {/* Answer Verification Buttons */}
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
        <button
          onClick={() => handleMarkReview(card.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold transition-all active:scale-98 shadow-2xs"
        >
          <RotateCcw className="w-4 h-4 text-rose-600" />
          <span>За преговор</span>
        </button>

        <button
          onClick={handleToggleFlip}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors active:scale-95"
          title="Обърни картата"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleMarkMastered(card.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all active:scale-98 shadow-xs"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Усвоено</span>
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
          Клавиши: <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">Space</kbd> обръщане, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">→</kbd> навигация
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
    </div>
  );
};
