import React, { useState, useEffect, useCallback } from 'react';
import { RotateCw, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Sparkles, Shuffle, RotateCcw } from 'lucide-react';
import type { Flashcard } from '../types';
import confetti from 'canvas-confetti';

interface FlashcardsViewProps {
  flashcards: Flashcard[];
  onProceedToQuiz: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ flashcards, onProceedToQuiz }) => {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#14182e] border border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Светата троица: Част 2 — Интерактивни флашкарти</span>
          </div>
          <div className="text-sm font-semibold text-slate-300">
            Карта <span className="text-white font-bold">{currentIndex + 1}</span> от{' '}
            <span className="text-white font-bold">{cards.length}</span>
          </div>
        </div>

        {/* Mastered Badges & Tools */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Научени: {masteredIds.length}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold">
            <XCircle className="w-3.5 h-3.5" />
            <span>За преговор: {reviewIds.length}</span>
          </div>

          <button
            onClick={handleShuffle}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
            title="Разбъркай картите"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetCards}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
            title="Започни отначало"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onProceedToQuiz}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md hover:scale-[1.02] transition-all"
          >
            <span>Към Теста</span>
            <span>🏆</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#181d33] h-2 rounded-full overflow-hidden border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Flashcard 3D Container */}
      <div
        className="perspective-1000 max-w-2xl mx-auto min-h-[340px] cursor-pointer select-none"
        onClick={handleToggleFlip}
      >
        <div
          className={`relative w-full min-h-[340px] rounded-3xl transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full p-8 rounded-3xl bg-gradient-to-br from-[#151a35] to-[#101426] border border-indigo-500/30 shadow-2xl flex flex-col justify-between backface-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {card.tag || 'Концепция'}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 text-sky-400" />
                Кликни или натисни Space за обръщане
              </span>
            </div>

            <div className="my-auto py-6 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {card.front}
              </h3>
              {card.hint && (
                <p className="mt-4 text-xs text-slate-400 italic">
                  💡 Подсказка: {card.hint}
                </p>
              )}
            </div>

            <div className="text-center text-xs text-indigo-400/80 font-medium">
              Докосни картата, за да видиш отговора ↻
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 w-full h-full p-8 rounded-3xl bg-gradient-to-br from-[#0e2a27] via-[#101e2b] to-[#12162b] border border-emerald-500/40 shadow-2xl flex flex-col justify-between rotate-y-180 backface-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Отговор & Обяснение
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                ✓ Проверено от StudyBG
              </span>
            </div>

            <div className="my-auto py-6 text-center">
              <p className="text-lg sm:text-xl font-semibold text-emerald-100 leading-relaxed">
                {card.back}
              </p>
            </div>

            <div className="text-center text-xs text-slate-400">
              Оцени знанията си с бутоните отдолу ↓
            </div>
          </div>
        </div>
      </div>

      {/* Answer Verification Buttons */}
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
        <button
          onClick={() => handleMarkReview(card.id)}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-rose-300 text-sm font-bold transition-all shadow-md active:scale-95"
        >
          <XCircle className="w-4 h-4" />
          <span>Трябва да преговоря 🔁</span>
        </button>

        <button
          onClick={handleToggleFlip}
          className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
          title="Обърни картата"
        >
          <RotateCw className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleMarkMastered(card.id)}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-sm font-bold transition-all shadow-md active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Научих го! ✅</span>
        </button>
      </div>

      {/* Navigation Arrows & Keyboard Hints */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-2xl mx-auto pt-2 text-xs text-slate-400">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Предишна (←)</span>
        </button>

        <div className="text-[11px] text-slate-500 hidden sm:block">
          Клавишни комбинации: <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">Space</kbd> обръщане, <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">→</kbd> навигация
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-all"
        >
          <span>Следваща (→)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
