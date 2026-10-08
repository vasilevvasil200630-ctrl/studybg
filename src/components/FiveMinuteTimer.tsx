import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FiveMinuteTimer: React.FC = () => {
  const TOTAL_SECONDS = 300; // 5 minutes
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (isCompleted) {
      setIsCompleted(false);
      setSecondsLeft(TOTAL_SECONDS);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsCompleted(false);
    setSecondsLeft(TOTAL_SECONDS);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = ((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100;

  // Study Phase based on remaining time
  const getPhase = () => {
    if (secondsLeft > 180) {
      return { step: '1/3', title: 'Преглед на конспекта (мин 1-2)', desc: 'Запознаване със същината и златното правило за оценка 6.00' };
    }
    if (secondsLeft > 60) {
      return { step: '2/3', title: 'Флашкарти за активно припомняне (мин 3-4)', desc: 'Фиксиране на терминологията и формулировките' };
    }
    return { step: '3/3', title: 'Контролен тест (мин 5)', desc: 'Проверка на готовността за реално изпитване' };
  };

  const currentPhase = getPhase();

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Timer Display */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
          <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 36 36">
            <path
              className="text-slate-200"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-blue-600 transition-all duration-1000 ease-linear"
              strokeDasharray={`${progressPercent}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute font-mono text-xs font-bold text-slate-900">
            {formattedTime}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>5-минутен учебен спринт</span>
            </span>
            <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-medium">
              Етап {currentPhase.step}
            </span>
          </div>
          <div className="text-sm font-semibold text-slate-900 mt-0.5">
            {isCompleted ? 'Времето изтече! Преминахте пълния цикъл на урока.' : currentPhase.title}
          </div>
          <div className="text-xs text-slate-600">
            {currentPhase.desc}
          </div>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTimer}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors shadow-xs ${
            isActive
              ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isActive ? 'Пауза' : secondsLeft === TOTAL_SECONDS ? 'Старт (5 мин)' : 'Продължи'}</span>
        </button>

        <button
          onClick={resetTimer}
          className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
          title="Рестартирай таймера"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
