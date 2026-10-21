import React from 'react';
import { Clock, ShieldAlert, ArrowRight, Scale } from 'lucide-react';
import type { ExamSimulatorState } from './useExamSimulator';
import { gradeBands } from '../../lib/monGradeScale';

const BAND_STYLES = [
  { box: 'bg-rose-50 border-rose-200', points: 'text-rose-900', label: 'text-rose-700' },
  { box: 'bg-orange-50 border-orange-200', points: 'text-orange-900', label: 'text-orange-700' },
  { box: 'bg-amber-50 border-amber-200', points: 'text-amber-900', label: 'text-amber-700' },
  { box: 'bg-sky-50 border-sky-200', points: 'text-sky-900', label: 'text-sky-700' },
  { box: 'bg-emerald-50 border-emerald-200', points: 'text-emerald-900', label: 'text-emerald-700' }
];
const BAND_LABELS = ['Слаб 2.00', 'Среден 3 (праг)', 'Добър 4', 'Мн. добър 5', 'Отличен 6'];

export const ExamStartScreen: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const { currentLesson, examDurationMinutes, setExamDurationMinutes, isExamRunning, isSubmitted, handleStartExam, examScale } = sim;

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

            {/* Скала за преобразуване: зависи от изпита (ДЗИ, ДИППК или само точки за НВО) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-blue-600" />
                  <span>{examScale.scale ? 'Скала за преобразуване на точките в оценка:' : 'Резултатът е само в точки:'}</span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">{examScale.label}</span>
              </div>

              {examScale.scale ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  {gradeBands(examScale.scale).map((band, i) => (
                    <div key={band.label} className={`p-2.5 rounded-lg border ${BAND_STYLES[i].box} ${i === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
                      <span className={`block font-bold font-mono ${BAND_STYLES[i].points}`}>{band.from} – {band.to} т.</span>
                      <span className={`text-[11px] font-medium ${BAND_STYLES[i].label}`}>{BAND_LABELS[i]}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-600 leading-relaxed">
                  НВО в 7. и 10. клас няма официално превръщане в шестобална оценка — резултатът се отчита в точки (0–100). Тук виждате и разпределението по модули.
                </p>
              )}
              {examScale.scale && (
                <p className="text-[11px] text-slate-500">Праговете са ориентировъчни — сверете ги с актуалната заповед на МОН за сесията.</p>
              )}
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
