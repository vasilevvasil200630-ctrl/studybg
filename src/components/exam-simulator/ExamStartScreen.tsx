import React from 'react';
import { Clock, ShieldAlert, ArrowRight, Scale } from 'lucide-react';
import type { ExamSimulatorState } from './useExamSimulator';

export const ExamStartScreen: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const { currentLesson, examDurationMinutes, setExamDurationMinutes, isExamRunning, isSubmitted, handleStartExam } = sim;

  return (
    <>
        {/* Initial Empty State before starting: Comprehensive МОН 100-Point Blueprint */}
        {!isExamRunning && !isSubmitted && (
          <div className="py-8 space-y-8">
            {/* Header info */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 shadow-2xs">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Модел на изпита в симулатора (100 точки)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Симулацията следва структурата на ДЗИ и НВО на МОН (опростено: 40 + 30 + 30 точки) за <strong className="text-slate-900">{currentLesson.subject}</strong> ({currentLesson.grade}).
              </p>
            </div>

            {/* 3 Modules Blueprint Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Модул 1
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    40 точки
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900">
                  Тестова част с избираем отговор
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  10 затворени въпроса по 4 т. Проверява фундаменталната фактология, понятия и правила. Минималният праг за оценка Среден 3.00 е 30 точки.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    Модул 2
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    30 точки
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900">
                  Анализ на извор / приложни задачи
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  3 въпроса със свободен кратък отговор по 10 т. Работа с автентичен исторически документ, художествен откъс или математически модел.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Модул 3
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    30 точки
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900">
                  Разширен писмен отговор / Есе
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Създаване на цялостен аргументиран текст или пълно алгебрично решение. Оценява се по 4-критериална матрица по модела на МОН.
                </p>
              </div>
            </div>

            {/* Official МОН Grading Scale Bar */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-blue-600" />
                  <span>Държавна скала на МОН за преобразуване на точките в оценка:</span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">ДЗИ / НВО 100-точкова система</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                  <span className="block font-bold text-rose-900 font-mono">0 – 29,5 т.</span>
                  <span className="text-[11px] text-rose-700 font-medium">Слаб 2.00</span>
                </div>
                <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200">
                  <span className="block font-bold text-orange-900 font-mono">30 – 41,5 т.</span>
                  <span className="text-[11px] text-orange-700 font-medium">Среден 3 (Праг)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                  <span className="block font-bold text-amber-900 font-mono">42 – 64,5 т.</span>
                  <span className="text-[11px] text-amber-700 font-medium">Добър 4</span>
                </div>
                <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200">
                  <span className="block font-bold text-sky-900 font-mono">65 – 88 т.</span>
                  <span className="text-[11px] text-sky-700 font-medium">Мн. добър 5</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 col-span-2 sm:col-span-1">
                  <span className="block font-bold text-emerald-900 font-mono">88,5 – 100 т.</span>
                  <span className="text-[11px] text-emerald-700 font-medium">Отличен 6</span>
                </div>
              </div>
            </div>

            {/* Duration Selector & Launch Call-to-action */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 border border-blue-200 text-center space-y-4 max-w-xl mx-auto">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Изберете времеви регламент за изпита:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { mins: 30, label: '30 мин (Експресен)' },
                  { mins: 60, label: '60 мин (Стандартен)' },
                  { mins: 90, label: '90 мин (Удължен)' },
                  { mins: 150, label: '150 мин (Регламент НВО МОН)' }
                ].map(item => (
                  <button
                    key={item.mins}
                    onClick={() => setExamDurationMinutes(item.mins)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      examDurationMinutes === item.mins
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleStartExam(examDurationMinutes)}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 mx-auto"
                >
                  <Clock className="w-4 h-4 text-white" />
                  <span>Стартирай пълна симулация ({examDurationMinutes} мин)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

    </>
  );
};
