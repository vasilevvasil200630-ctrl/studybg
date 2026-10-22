import React, { useState } from 'react';
import { ION_REACTIONS, HYDROLYSIS_SALTS, ORGANIC_QUALITATIVE_REACTIONS } from '../data/scienceLabData';

// Изнесено от ScienceDziLab.tsx — един таб от STEM лабораторията
export const ScienceChemistryTab: React.FC = () => {
  // =========================================================================
  // TAB 2: CHEMISTRY STATE (Qualitative, Hydrolysis, Titration & Organic)
  // =========================================================================
  const [selectedReactionId, setSelectedReactionId] = useState<string>(ION_REACTIONS[0].id);
  const [selectedSaltIdx, setSelectedSaltIdx] = useState<number>(0);
  const [selectedOrganicId, setSelectedOrganicId] = useState<string>(ORGANIC_QUALITATIVE_REACTIONS[0].id);

  // Acid-Base Titration Calculator State
  const [acidType, setAcidType] = useState<'HCl' | 'H2SO4' | 'CH3COOH'>('H2SO4');
  const [baseType, setBaseType] = useState<'NaOH' | 'KOH' | 'Ba(OH)2'>('NaOH');
  const [acidConc, setAcidConc] = useState<number>(0.1);
  const [acidVolMl, setAcidVolMl] = useState<number>(25);
  const [baseConc, setBaseConc] = useState<number>(0.2);

  const currentReaction = ION_REACTIONS.find((r) => r.id === selectedReactionId) || ION_REACTIONS[0];
  const currentSalt = HYDROLYSIS_SALTS[selectedSaltIdx] || HYDROLYSIS_SALTS[0];
  const currentOrganic = ORGANIC_QUALITATIVE_REACTIONS.find((o) => o.id === selectedOrganicId) || ORGANIC_QUALITATIVE_REACTIONS[0];

  const acidProtonsZ1 = acidType === 'H2SO4' ? 2 : 1;
  const baseHydroxylsZ2 = baseType === 'Ba(OH)2' ? 2 : 1;
  const eqBaseVolMl = +((acidConc * acidVolMl * acidProtonsZ1) / (baseConc * baseHydroxylsZ2)).toFixed(2);
  const eqIndicatorInfo =
    acidType === 'CH3COOH'
      ? 'Фенолфталеин (екв. точка е в слабоалкална среда pH ≈ 8,7 поради хидролиза на ацетатния анион)'
      : 'Бромтимол синьо или Фенолфталеин / Метилоранж (силна киселина + силна основа ➔ неутрална екв. точка pH = 7,0)';


  return (
      <div className="space-y-8">
        {/* Virtual Test Tubes: Ion Identification */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Неорганична и Аналитична Химия • Качествени реакции за ДЗИ
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Виртуална Епруветка: Разпознаване на катиони и аниони чрез утайки и газове
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {ION_REACTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedReactionId(item.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedReactionId === item.id
                    ? 'bg-blue-50/80 border-blue-500 ring-1 ring-blue-400/50 shadow-xs'
                    : 'bg-slate-50/70 hover:bg-white border-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">{item.reagentPair}</div>
                <div className="text-[11px] text-blue-800 font-medium mt-0.5">
                  {item.cation} + {item.anion}
                </div>
              </button>
            ))}
          </div>

          {/* Reaction Display Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center p-5 rounded-2xl bg-slate-50 border border-slate-200">
            {/* Visual Test Tube */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-20 h-44 rounded-b-full border-4 border-t-0 border-slate-400 bg-white p-1.5 flex flex-col justify-end shadow-inner relative overflow-hidden">
                <div
                  className={`w-full h-28 rounded-b-full bg-gradient-to-b ${currentReaction.tubeColorClass} border-t transition-all duration-500 flex items-end justify-center pb-3`}
                >
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/90 text-slate-900 shadow-2xs">
                    {currentReaction.netIonicEq.split('→')[1]?.trim()}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-300">
                {currentReaction.precipitateBadge}
              </span>
            </div>

            {/* Equations & Explanation */}
            <div className="md:col-span-2 space-y-3">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold uppercase text-slate-400">
                  Молекулно уравнение:
                </div>
                <div className="font-mono text-sm font-bold text-slate-900">
                  {currentReaction.molecularEq}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                <div className="text-[11px] font-bold uppercase text-blue-800">
                  Съкратено йонно уравнение (изискване за 6.00 на матурата):
                </div>
                <div className="font-mono text-base font-bold text-blue-950">
                  {currentReaction.netIonicEq}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>Наблюдение:</strong> {currentReaction.visualResult}
              </p>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                <strong>Златно правило за ДЗИ:</strong> {currentReaction.examTip}
              </div>
            </div>
          </div>
        </div>

        {/* Salt Hydrolysis & pH Explorer */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Водни разтвори и pH • 9. и 10. клас
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Симулатор за Хидролиза на Соли и Цвят на Индикаторите
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {HYDROLYSIS_SALTS.map((salt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSaltIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedSaltIdx === idx
                    ? 'bg-brand-sapphire text-white border-brand-sapphire shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 hover:text-blue-700 text-slate-700 border-slate-200'
                }`}
              >
                {salt.formula.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-sm sm:text-base font-bold text-slate-900">
              {currentSalt.formula}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Произход на солта</span>
                <strong className="text-slate-800">{currentSalt.parents}</strong>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Среда и pH</span>
                <strong className="text-slate-900">{currentSalt.phRange}</strong>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Лакмус / Фенолфталеин</span>
                <strong className="text-slate-800">
                  Лакмус: {currentSalt.litmus} • ФФ: {currentSalt.phenolphthalein}
                </strong>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-950">
              {currentSalt.hydrolysisIon}
            </div>
          </div>
        </div>

        {/* Module 2C: Acid-Base Titration Calculator & Module 2D: Organic Qualitative Reactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Acid-Base Titration Calculator */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                Обемно-аналитична химия • Трета СПК Лаборант (524010) & ДЗИ
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Интерактивен Киселинно-Основен Титратор (c₁·V₁·z₁ = c₂·V₂·z₂)
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Титрувана киселина:</label>
                <select
                  value={acidType}
                  onChange={(e) => setAcidType(e.target.value as typeof acidType)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-300 font-bold text-slate-900"
                >
                  <option value="HCl">HCl (едноосновна, z₁ = 1)</option>
                  <option value="H2SO4">H₂SO₄ (двуосновна, z₁ = 2)</option>
                  <option value="CH3COOH">CH₃COOH (слаба киселина, z₁ = 1)</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Титрант (Основа в бюретата):</label>
                <select
                  value={baseType}
                  onChange={(e) => setBaseType(e.target.value as typeof baseType)}
                  className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-300 font-bold text-slate-900"
                >
                  <option value="NaOH">NaOH (еднокисела, z₂ = 1)</option>
                  <option value="KOH">KOH (еднокисела, z₂ = 1)</option>
                  <option value="Ba(OH)2">Ba(OH)₂ (двукисела, z₂ = 2)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-[10px] text-slate-500">c₁ киселина (mol/L)</span>
                <input
                  type="number"
                  min={0.01}
                  max={2}
                  step={0.05}
                  value={acidConc}
                  onChange={(e) => setAcidConc(Math.max(0.01, Number(e.target.value)))}
                  className="w-full font-mono font-bold text-sm text-slate-900 bg-transparent mt-0.5 focus:outline-none"
                />
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-[10px] text-slate-500">V₁ проба (mL)</span>
                <input
                  type="number"
                  min={5}
                  max={250}
                  step={5}
                  value={acidVolMl}
                  onChange={(e) => setAcidVolMl(Math.max(1, Number(e.target.value)))}
                  className="w-full font-mono font-bold text-sm text-slate-900 bg-transparent mt-0.5 focus:outline-none"
                />
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-[10px] text-slate-500">c₂ титрант (mol/L)</span>
                <input
                  type="number"
                  min={0.01}
                  max={2}
                  step={0.05}
                  value={baseConc}
                  onChange={(e) => setBaseConc(Math.max(0.01, Number(e.target.value)))}
                  className="w-full font-mono font-bold text-sm text-slate-900 bg-transparent mt-0.5 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-300 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-800 block">
                  Еквивалентен обем на основата V₂ (от бюретата):
                </span>
                <span className="text-xs text-teal-900 font-mono">
                  V₂ = ({acidConc} × {acidVolMl} × {acidProtonsZ1}) / ({baseConc} × {baseHydroxylsZ2})
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-teal-950">
                {eqBaseVolMl} mL
              </div>
            </div>

            <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong>Препоръчителен индикатор:</strong> {eqIndicatorInfo}
            </div>
          </div>

          {/* Organic Qualitative Reactions for MU Entrance Exam */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                Органична Химия за МУ (София / Пловдив / Варна) & ДЗИ
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Качествени реакции за разпознаване на органични съединения
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {ORGANIC_QUALITATIVE_REACTIONS.map((org) => (
                <button
                  key={org.id}
                  onClick={() => setSelectedOrganicId(org.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    selectedOrganicId === org.id
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-slate-100 hover:text-rose-700 text-slate-700 border-slate-200'
                  }`}
                >
                  {org.compoundClass.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2.5 text-xs">
              <div className="font-bold text-sm text-rose-950">
                {currentOrganic.compoundClass}
              </div>
              <div>
                <strong className="text-slate-900">Реактив и условия:</strong> {currentOrganic.reagent}
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-rose-200 font-mono text-rose-950 font-bold">
                {currentOrganic.equation}
              </div>
              <div>
                <strong className="text-slate-900">Визуален ефект:</strong> {currentOrganic.visualEffect}
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-950">
                <strong>Изпитен капан за МУ/ДЗИ:</strong> {currentOrganic.muExamTip}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
