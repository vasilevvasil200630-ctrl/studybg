import React from 'react';
import { Camera, Layers, MessageSquare, Check, ShieldCheck, ArrowRight, Zap, GraduationCap, CheckSquare, Compass } from 'lucide-react';
import type { AppNavTab } from './Navbar';

interface FeaturesShowcaseProps {
  onNavigateTab: (tab: AppNavTab) => void;
  onOpenScan: () => void;
}

export const FeaturesShowcase: React.FC<FeaturesShowcaseProps> = ({
  onNavigateTab,
  onOpenScan
}) => {
  return (
    <section className="py-16 md:py-24 border-t border-slate-800/80 bg-[#0b0e19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Методика на обучението</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Три стъпки от тетрадката до пълно овладяване на материала
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Съчетание между държавните образователни стандарти на МОН и научно доказаните методи за активно припомняне (Active Recall) и интервално повторение. Кликни върху всяка стъпка за незабавен преглед.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1: Smart OCR & МОН Alignment */}
          <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                <Camera className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Стъпка 1</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2.5">
                Дигитализация & Одит по МОН
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Снимаш ръкописните си записки или качваш учебен PDF файл. Системата разпознава темата, предмета и класа, и веднага отбелязва дали липсват задължителни термини или формули за отлична оценка.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Чете български ръкопис, съкращения и таблици</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Автоматично позициониране в учебната програма</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Предупреждение за типични капани на изпитите</span>
                </li>
              </ul>
            </div>

            {/* Interactive Action Buttons */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={onOpenScan}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <Camera className="w-4 h-4" />
                <span>Качи снимка на тетрадка</span>
              </button>
              <button
                onClick={() => onNavigateTab('audit')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 transition-colors"
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Отвори Одит за 6.00</span>
              </button>
            </div>
          </div>

          {/* Pillar 2: Active Recall & Holy Trinity */}
          <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/90 border-2 border-indigo-500/40 shadow-lg relative flex flex-col justify-between">
            <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
              Ядро на подготовката
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-6">
                <Layers className="w-6 h-6 text-sky-400" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">Стъпка 2</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2.5">
                Активно припомняне & Тестове
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Превръща суровите записки в три практични учебни формата: синтезирано резюме с таймер, двустранни флаш карти за самопроверка и изпитен тест с 10 въпроса и детайлни обяснения.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Аудио озвучаване на резюмето на български</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Флаш карти с управление от клавиатурата (Space/Стрелки)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Оценка по шестобалната система (2.00 – 6.00)</span>
                </li>
              </ul>
            </div>

            {/* Interactive Action Buttons */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onNavigateTab('flashcards')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Флаш карти</span>
                </button>
                <button
                  onClick={() => onNavigateTab('quiz')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Реши тест</span>
                </button>
              </div>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 transition-colors"
              >
                <span>Отвори 100-точков симулатор на изпит</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
              </button>
            </div>
          </div>

          {/* Pillar 3: Notebook Chat & Mysteries */}
          <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <MessageSquare className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Стъпка 3</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2.5">
                Интерактивен ментор по темата
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Ако дадено понятие, историческа причина или физична формула не ти е ясна, задаваш въпрос директно в модула „Питай тетрадката“ и получаваш изчерпателен отговор с примери.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Обяснява сложни термини с достъпни аналогии</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Подготвя примерни отговори за устно изпитване</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Позовава се директно на конкретния урок</span>
                </li>
              </ul>
            </div>

            {/* Interactive Action Buttons */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={() => onNavigateTab('chat')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Задай въпрос на учебния ментор</span>
              </button>
              <button
                onClick={() => onNavigateTab('knowledge')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Неразгадани случки от историята</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
