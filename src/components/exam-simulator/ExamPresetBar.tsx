import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { ExamSimulatorState } from './useExamSimulator';

export const ExamPresetBar: React.FC<{ sim: ExamSimulatorState }> = ({ sim }) => {
  const { currentLesson, activePreset, setIsHistoryModalOpen, historyCount, handleSelectExamPreset } = sim;

  return (
    <>
      {/* Quick Track & Topic Preset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">
            Изпитен формат:
          </span>

          {/* Track Buttons */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 gap-1">
            <button
              type="button"
              onClick={() => handleSelectExamPreset('lesson')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePreset === 'lesson'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Текущ урок
            </button>

            <button
              type="button"
              onClick={() => handleSelectExamPreset('dzi12-bel-tyutyun')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePreset.startsWith('dzi12')
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ДЗИ 12 (Матура)
            </button>

            <button
              type="button"
              onClick={() => handleSelectExamPreset('dippk-it-ai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePreset.startsWith('dippk')
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ДИППК (Трета СПК)
            </button>

            <button
              type="button"
              onClick={() => handleSelectExamPreset('nvo10-history-simeon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePreset.startsWith('nvo10')
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              НВО 10. клас
            </button>
          </div>

          {/* Quick Sub-Topic Chips */}
          {activePreset.startsWith('dzi12') && (
            <div className="flex items-center gap-1.5 pl-1 flex-wrap">
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dzi12-bel-tyutyun')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dzi12-bel-tyutyun' || activePreset === 'dzi12-bel'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                БЕЛ: Тютюн
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dzi12-bel-geratsite')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dzi12-bel-geratsite'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                БЕЛ: Гераците
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dzi12-history-april')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dzi12-history-april' || activePreset === 'dzi12-history'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                История: Априлско въстание
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dzi12-math-derivatives')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dzi12-math-derivatives'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Математика: Производни & Екстремуми
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dzi12-bio-dna')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dzi12-bio-dna'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Биология: ДНК & Репликация
              </button>
            </div>
          )}

          {activePreset.startsWith('dippk') && (
            <div className="flex items-center gap-1.5 pl-1 flex-wrap">
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dippk-it-ai')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dippk-it-ai'
                    ? 'bg-blue-100 text-blue-900 border-blue-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                ИТ & Киберсигурност (ТУЕС)
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dippk-finance-ntbg')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dippk-finance-ntbg'
                    ? 'bg-blue-100 text-blue-900 border-blue-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Финанси & Банки (НТБГ)
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dippk-arch-sgsag')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dippk-arch-sgsag'
                    ? 'bg-blue-100 text-blue-900 border-blue-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Строителство & Геодезия (СГСАГ)
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dippk-aviation-maritime')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dippk-aviation-maritime'
                    ? 'bg-blue-100 text-blue-900 border-blue-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Авиация & Мореплаване
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dippk-nuclear-optics')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dippk-nuclear-optics'
                    ? 'bg-blue-100 text-blue-900 border-blue-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Ядрена & Лазерна техника
              </button>
            </div>
          )}

          {activePreset.startsWith('nvo10') && (
            <div className="flex items-center gap-1.5 pl-1 flex-wrap">
              <button
                type="button"
                onClick={() => handleSelectExamPreset('nvo10-history-simeon')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'nvo10-history-simeon' || activePreset === 'nvo10-history'
                    ? 'bg-teal-100 text-teal-900 border-teal-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                История: Симеон Велики
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('nvo10-bel-debelyanov')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'nvo10-bel-debelyanov'
                    ? 'bg-teal-100 text-teal-900 border-teal-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                БЕЛ: Д. Дебелянов
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('nvo10-math-vieta')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'nvo10-math-vieta'
                    ? 'bg-teal-100 text-teal-900 border-teal-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Мат: Квадратни уравнения
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 hidden sm:inline">Текущо:</span>
          <span className="text-xs font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 max-w-[200px] truncate">
            {currentLesson.title.split(':')[0]} ({currentLesson.grade})
          </span>
          <button
            type="button"
            onClick={() => setIsHistoryModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold shadow-2xs transition-colors shrink-0"
            title="Отвори графиката на напредъка и резултатите от миналите изпити"
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Моят прогрес & История</span>
            <span className="sm:hidden">История</span>
            {historyCount > 0 && (
              <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-blue-600 text-white font-bold">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
