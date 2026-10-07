import React from 'react';
import { Camera, Zap, MessageSquare, Check, Sparkles, Clock } from 'lucide-react';


export const FeaturesShowcase: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-emerald-500/10 blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Архитектура на StudyBG</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Трите стълба на бързото учене
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Създадено специално за ритъма на съвременния ученик и студент: максимален резултат с минимално губене на време.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Pillar 1: Smart Scan */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#141830] to-[#0f1224] border border-indigo-500/20 shadow-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Camera className="w-7 h-7 text-indigo-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Стълб №1</span>
              <h3 className="text-2xl font-black text-white mt-1 mb-3">
                📸 Smart Scan
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Снимаш тетрадка с бърз или грозен почерк, хвърчащ лист от конспект или цяла PDF лекция. 
                Нашият алгоритъм извлича структурата, терминологията и важните детайли.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-white/5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Разпознава български ръкопис и съкращения</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Поддържа формули, схеми и исторически хронологии</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Работи с PDF учебници и презентации</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: The Holy Trinity */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#141d33] to-[#0d1426] border-2 border-sky-500/30 shadow-2xl relative flex flex-col justify-between group scale-[1.02]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-black font-extrabold text-[11px] uppercase tracking-wider shadow-lg">
              Формулата за 6.00
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-sky-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Стълб №2</span>
              <h3 className="text-2xl font-black text-white mt-1 mb-3">
                ⚡ Светата троица
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Трите задължителни стъпки, гарантиращи отлична оценка:
              </p>

              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs font-bold text-white">1. Резюме (1/2 страница)</div>
                  <div className="text-[11px] text-slate-400">Само същественото без излишен пълнеж</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs font-bold text-white">2. Интерактивни флашкарти</div>
                  <div className="text-[11px] text-slate-400">Обръщат се с едно цъкване за бърз преговор</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs font-bold text-white">3. Тест с 10 въпроса</div>
                  <div className="text-[11px] text-slate-400">Директна симулация на контролно за 6-ца</div>
                </div>
              </div>
            </div>

            <div className="text-xs text-sky-300 font-semibold pt-4 border-t border-white/5 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Целият цикъл отнема само 5 минути!</span>
            </div>
          </div>

          {/* Pillar 3: Notebook Chat */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#111e29] to-[#0b141d] border border-emerald-500/20 shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7 text-emerald-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Стълб №3</span>
              <h3 className="text-2xl font-black text-white mt-1 mb-3">
                💬 „Питай тетрадката си“
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                AI чатбот, който разговаря с теб директно върху съдържанието на твоите бележки. 
                Обяснява сложни термини като за приятел и предсказва изпитните въпроси.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-white/5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>„Обясни ми го по-просто“ режим</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Генериране на мнемоники и трикове за запомняне</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Предупреждения за типичните капани на учителите</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
