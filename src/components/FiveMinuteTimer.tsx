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
        particleCount: 100,
        spread: 80,
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
      return { step: '1/3', title: '📖 Четене на Резюмето (мин 1-2)', desc: 'Запознай се със същината и златното правило' };
    }
    if (secondsLeft > 60) {
      return { step: '2/3', title: '⚡ Завъртане на Флашкартите (мин 3-4)', desc: 'Активно припомняне и фиксиране на детайлите' };
    }
    return { step: '3/3', title: '🏆 Тест за 6-ца (мин 5)', desc: 'Провери дали си напълно готов за изпита' };
  };

  const currentPhase = getPhase();

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#13172e] border border-indigo-500/25 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Timer Display */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-400 transition-all duration-1000 ease-linear"
              strokeDasharray={`${progressPercent}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute font-mono text-xs font-bold text-white">
            {formattedTime}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>5-минутен фокус спринт</span>
            </span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-300">
              Етап {currentPhase.step}
            </span>
          </div>
          <div className="text-sm font-bold text-white mt-0.5">
            {isCompleted ? '🎉 5 минути изтекоха! Готов си за 6-ца!' : currentPhase.title}
          </div>
          <div className="text-[11px] text-slate-400">
            {currentPhase.desc}
          </div>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTimer}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
            isActive
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:opacity-95'
          }`}
        >
          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isActive ? 'Пауза' : secondsLeft === TOTAL_SECONDS ? 'Старт (5 мин)' : 'Продължи'}</span>
        </button>

        <button
          onClick={resetTimer}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
          title="Рестартирай таймера"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
