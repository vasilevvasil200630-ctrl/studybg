import React from 'react';
import { Clock, Calculator, ArrowRight, Sparkles, BookMarked, Compass, PenTool, Mic, FlaskConical, MapPin } from 'lucide-react';
import type { AppNavTab } from './Navbar';

interface HomePillarsSectionProps {
  totalLessonsCount: number;
  onNavigateTab: (tab: AppNavTab) => void;
}

// Изнесено от HomeLandingView — зарежда се отложено, когато секцията приближи екрана
export const HomePillarsSection: React.FC<HomePillarsSectionProps> = ({ totalLessonsCount, onNavigateTab }) => {


  return (
    <>
        {/* ========================================================================= */}
        {/* 3. INTERACTIVE LABORATORIES & SPECIALIZED MODULES GRID */}
        {/* ========================================================================= */}
        <section id="pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Интерактивни тренажори и лаборатории на StudyBG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Специализирани лаборатории за Отличен 6.00
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Всички модули са директно свързани с учебните програми на МОН за 5.–12. клас и работят в реално време.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Lab 1: Oral Exam Simulator */}
            <div
              onClick={() => onNavigateTab('oralexam')}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
                    <Mic className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                    ГЛАС & ТЕКСТ
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Устно изпитване пред дъската
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Симулатор с микрофон (Web Speech API) за всички {totalLessonsCount} урока, автоматичен одит на ключовите термини и бележник.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
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
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-stone-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200">
                    <BookMarked className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-800">
                    41. ЗАДАЧА (30т.)
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Литературен Канон & Тези
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Всички задължителни автори от Ботев и Вазов до Талев и Димов, тематични цикли, цитати и генератор на теза.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
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
    </>
  );
};
