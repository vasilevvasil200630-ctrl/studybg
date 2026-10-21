import React, { useState, useMemo } from 'react';
import { RotateCcw, Info } from 'lucide-react';
import { CODON_TABLE, DNA_PRESETS } from '../data/scienceLabData';

// Изнесено от ScienceDziLab.tsx — един таб от STEM лабораторията
export const ScienceBiologyTab: React.FC = () => {
  // =========================================================================
  // TAB 1: BIOLOGY (DNA -> mRNA -> Protein, Blood Groups & Bioenergetics/PCR)
  // =========================================================================
  const [dnaInput, setDnaInput] = useState<string>(DNA_PRESETS[0].dnaTemplate);
  const [activePresetNote, setActivePresetNote] = useState<string>(DNA_PRESETS[0].note);
  const [parent1Blood, setParent1Blood] = useState<'IAIA' | 'IAi' | 'IBIB' | 'IBi' | 'IAIB' | 'ii'>('IAi');
  const [parent2Blood, setParent2Blood] = useState<'IAIA' | 'IAi' | 'IBIB' | 'IBi' | 'IAIB' | 'ii'>('IBi');
  const [glucoseMoles, setGlucoseMoles] = useState<number>(2);
  const [pcrInitialCopies, setPcrInitialCopies] = useState<number>(1);
  const [pcrCycles, setPcrCycles] = useState<number>(10);

  const cleanedDna = useMemo(() => {
    return dnaInput.toUpperCase().replace(/[^ATGC]/g, '');
  }, [dnaInput]);

  const codingDna = useMemo(() => {
    const map: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' };
    return cleanedDna.split('').map((ch) => map[ch] || '').join('');
  }, [cleanedDna]);

  const mrnaStrand = useMemo(() => {
    const map: Record<string, string> = { A: 'U', T: 'A', G: 'C', C: 'G' };
    return cleanedDna.split('').map((ch) => map[ch] || '').join('');
  }, [cleanedDna]);

  const codonsAnalysis = useMemo(() => {
    const codons: string[] = [];
    for (let i = 0; i < mrnaStrand.length; i += 3) {
      if (i + 3 <= mrnaStrand.length) {
        codons.push(mrnaStrand.slice(i, i + 3));
      }
    }

    const trnaMap: Record<string, string> = { A: 'U', U: 'A', G: 'C', C: 'G' };
    let stopReached = false;

    return codons.map((codon, index) => {
      const anticodon = codon.split('').map((c) => trnaMap[c] || '').join('');
      const aa = CODON_TABLE[codon] || { name: 'Неизвестен', short: '???', type: 'nonpolar' as const };
      const isAfterStop = stopReached;
      if (aa.type === 'stop') {
        stopReached = true;
      }
      return {
        index: index + 1,
        dnaTriplet: cleanedDna.slice(index * 3, index * 3 + 3),
        codingTriplet: codingDna.slice(index * 3, index * 3 + 3),
        codon,
        anticodon,
        aa,
        isAfterStop
      };
    });
  }, [mrnaStrand, cleanedDna, codingDna]);

  const activeAminoAcidsCount = codonsAnalysis.filter((c) => !c.isAfterStop && c.aa.type !== 'stop').length;
  const peptideBondsCount = Math.max(0, activeAminoAcidsCount - 1);

  const getAlleles = (g: 'IAIA' | 'IAi' | 'IBIB' | 'IBi' | 'IAIB' | 'ii'): [string, string] => {
    if (g === 'IAIA') return ['Iᴬ', 'Iᴬ'];
    if (g === 'IAi') return ['Iᴬ', 'i'];
    if (g === 'IBIB') return ['Iᴮ', 'Iᴮ'];
    if (g === 'IBi') return ['Iᴮ', 'i'];
    if (g === 'IAIB') return ['Iᴬ', 'Iᴮ'];
    return ['i', 'i'];
  };

  const getPhenotype = (a1: string, a2: string) => {
    const pair = [a1, a2].sort().join('');
    if (pair === 'IᴬIᴬ' || pair === 'Iᴬi') return { group: 'Група A', genotype: pair, color: 'bg-rose-50 text-rose-900 border-rose-200' };
    if (pair === 'IᴮIᴮ' || pair === 'Iᴮi') return { group: 'Група B', genotype: pair, color: 'bg-blue-50 text-blue-900 border-blue-200' };
    if (pair === 'IᴬIᴮ') return { group: 'Група AB (Кодоминиране)', genotype: 'IᴬIᴮ', color: 'bg-slate-50 text-slate-900 border-slate-200' };
    return { group: 'Група 0 (Рецесивна)', genotype: 'ii', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' };
  };

  const p1Alleles = getAlleles(parent1Blood);
  const p2Alleles = getAlleles(parent2Blood);


  return (
      <div className="space-y-8">
        {/* Module 1A: DNA -> mRNA -> Protein Live Synthesizer */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Централна догма на молекулярната биология (ДЗИ Задача)
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Жив Декодер: Матрична ДНК (3&apos;→5&apos;) ➔ иРНК (5&apos;→3&apos;) ➔ Белтък
              </h3>
            </div>

            {/* Preset Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {DNA_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDnaInput(preset.dnaTemplate);
                    setActivePresetNote(preset.note);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                    dnaInput === preset.dnaTemplate
                      ? 'bg-emerald-700 text-white border-emerald-600'
                      : 'bg-slate-50 hover:bg-slate-100 hover:text-emerald-700 text-slate-700 border-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* DNA Input Bar */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Въведи нуклеотиди от матричната верига на ДНК (3&apos; → 5&apos;) — само A, T, G, C:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={dnaInput}
                onChange={(e) => {
                  setDnaInput(e.target.value.toUpperCase().replace(/[^ATGC]/g, ''));
                  setActivePresetNote('');
                }}
                className="flex-1 font-mono text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 tracking-widest"
                placeholder="Напр. TACGTGGACTGAGGACTCCTCTTCATT"
              />
              <div className="flex items-center gap-1">
                {(['A', 'T', 'G', 'C'] as const).map((nuc) => (
                  <button
                    key={nuc}
                    onClick={() => {
                      setDnaInput((prev) => prev + nuc);
                      setActivePresetNote('');
                    }}
                    className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-mono text-xs font-bold cursor-pointer"
                  >
                    +{nuc}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setDnaInput('TAC');
                    setActivePresetNote('');
                  }}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 cursor-pointer"
                  title="Нулирай до СТАРТ триплет TAC"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            {activePresetNote && (
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{activePresetNote}</span>
              </div>
            )}
          </div>

          {/* Codon-by-Codon Table */}
          <div className="overflow-x-auto">
            <div className="inline-flex gap-2.5 pb-2 min-w-full">
              {codonsAnalysis.map((item) => (
                <div
                  key={item.index}
                  className={`min-w-[115px] p-3 rounded-xl border text-center space-y-1.5 transition-all ${
                    item.aa.type === 'start'
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : item.aa.type === 'stop'
                      ? 'bg-rose-50/70 border-rose-300'
                      : item.isAfterStop
                      ? 'bg-slate-100 border-slate-200 opacity-50'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Триплет #{item.index}
                  </div>
                  <div className="text-xs font-mono bg-white py-1 px-2 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">ДНК матр. (3&apos;-5&apos;)</span>
                    <strong className="text-slate-800">{item.dnaTriplet}</strong>
                  </div>
                  <div className="text-xs font-mono bg-blue-50/70 py-1 px-2 rounded border border-blue-200">
                    <span className="text-[10px] text-blue-600 block">иРНК кодон (5&apos;-3&apos;)</span>
                    <strong className="text-blue-900">{item.codon}</strong>
                  </div>
                  <div className="text-xs font-mono bg-slate-50/70 py-1 px-2 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-600 block">тРНК антикодон (3&apos;-5&apos;)</span>
                    <strong className="text-slate-900">{item.anticodon}</strong>
                  </div>
                  <div
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold ${
                      item.aa.type === 'start'
                        ? 'bg-emerald-700 text-white'
                        : item.aa.type === 'stop'
                        ? 'bg-rose-600 text-white'
                        : 'bg-amber-100 text-amber-950 border border-amber-300'
                    }`}
                  >
                    {item.aa.short}
                    <span className="block text-[9px] font-normal opacity-90 truncate">
                      {item.aa.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantitative Summary for DZI Problem */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[11px] text-slate-500">Общо нуклеотиди (1 верига)</div>
              <div className="text-lg font-black text-slate-900 font-mono">{cleanedDna.length}</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <div className="text-[11px] text-blue-700">Пълни кодони в иРНК</div>
              <div className="text-lg font-black text-blue-900 font-mono">{codonsAnalysis.length}</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-[11px] text-emerald-700">Включени аминокиселини</div>
              <div className="text-lg font-black text-emerald-900 font-mono">{activeAminoAcidsCount}</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <div className="text-[11px] text-amber-800">Пептидни връзки (= H₂O)</div>
              <div className="text-lg font-black text-amber-950 font-mono">{peptideBondsCount}</div>
            </div>
          </div>
        </div>

        {/* Module 1B: Blood Group & Mendel Punnett Square Calculator */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
              Генетика за 10. и 12. клас • Множествен алелизъм и Кодоминиране
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
              Интерактивна Решетка на Пънет за Кръвни Групи (AB0 система)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Генотип на Родител 1 (Майка):
              </label>
              <select
                value={parent1Blood}
                onChange={(e) => setParent1Blood(e.target.value as typeof parent1Blood)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900"
              >
                <option value="IAIA">Група A — Хомозиготна (IᴬIᴬ)</option>
                <option value="IAi">Група A — Хетерозиготна (Iᴬi)</option>
                <option value="IBIB">Група B — Хомозиготна (IᴮIᴮ)</option>
                <option value="IBi">Група B — Хетерозиготна (Iᴮi)</option>
                <option value="IAIB">Група AB — Кодоминиране (IᴬIᴮ)</option>
                <option value="ii">Група 0 — Рецесивна (ii)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Генотип на Родител 2 (Баща):
              </label>
              <select
                value={parent2Blood}
                onChange={(e) => setParent2Blood(e.target.value as typeof parent2Blood)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900"
              >
                <option value="IAIA">Група A — Хомозиготна (IᴬIᴬ)</option>
                <option value="IAi">Група A — Хетерозиготна (Iᴬi)</option>
                <option value="IBIB">Група B — Хомозиготна (IᴮIᴮ)</option>
                <option value="IBi">Група B — Хетерозиготна (Iᴮi)</option>
                <option value="IAIB">Група AB — Кодоминиране (IᴬIᴮ)</option>
                <option value="ii">Група 0 — Рецесивна (ii)</option>
              </select>
            </div>
          </div>

          {/* 2x2 Punnett Grid */}
          <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto pt-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
              ♀ \ ♂ Гамети
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 font-mono text-sm font-black text-slate-900">
              ♂ {p2Alleles[0]}
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 font-mono text-sm font-black text-slate-900">
              ♂ {p2Alleles[1]}
            </div>

            {p1Alleles.map((a1, rIdx) => (
              <React.Fragment key={rIdx}>
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 font-mono text-sm font-black text-slate-900 flex items-center justify-center">
                  ♀ {a1}
                </div>
                {p2Alleles.map((a2, cIdx) => {
                  const res = getPhenotype(a1, a2);
                  return (
                    <div
                      key={cIdx}
                      className={`p-3 rounded-xl border ${res.color} space-y-0.5`}
                    >
                      <div className="font-mono text-sm font-black">{res.genotype}</div>
                      <div className="text-[11px] font-bold">{res.group}</div>
                      <div className="text-[10px] opacity-75">25% шанс</div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Module 1C: Bioenergetics (ATP Cellular Respiration) & PCR Exponential Amplifier */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Кандидат-студентски модул МУ (София / Пловдив / Варна) • Биохимия и Молекулярна биология
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                Калкулатор за Клетъчно Дишане (Добив на АТФ) & PCR Амплификация на ДНК
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 АТФ
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left: Cellular Respiration ATP Calculator */}
            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-300 uppercase">1. Разграждане на глюкоза (n mol):</span>
                <span className="font-mono text-base text-white bg-emerald-600/40 px-2.5 py-0.5 rounded-lg border border-emerald-400/40">
                  {glucoseMoles} mol глюкоза ({glucoseMoles * 180} g)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={glucoseMoles}
                onChange={(e) => setGlucoseMoles(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Гликолиза (цитозол — субстратно)</span>
                  <strong className="font-mono text-emerald-300 text-sm">
                    {glucoseMoles * 2} mol АТФ (+ {glucoseMoles * 2} NADH)
                  </strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Цикъл на Кребс (митохондриен матрикс)</span>
                  <strong className="font-mono text-cyan-300 text-sm">
                    {glucoseMoles * 2} mol АТФ (+ {glucoseMoles * 8} NADH)
                  </strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Окислително фосфорилиране (кристи)</span>
                  <strong className="font-mono text-amber-300 text-sm">
                    {glucoseMoles * 34} mol АТФ (от 10 NADH + 2 FADH₂/mol)
                  </strong>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50">
                  <span className="text-emerald-200 block text-[10px] font-bold">СУМАРЕН АЕРОБЕН ДОБИВ:</span>
                  <strong className="font-mono text-white text-base">
                    {glucoseMoles * 36}–{glucoseMoles * 38} mol АТФ
                  </strong>
                </div>
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                <strong>Контраст за ДЗИ/МУ:</strong> При анаеробна гликолиза (млечнокисела или алкохолна ферментация) от{' '}
                {glucoseMoles} mol глюкоза се получават само <strong>{glucoseMoles * 2} mol АТФ</strong> (19 пъти по-нисък добив).
              </div>
            </div>

            {/* Right: PCR DNA Exponential Amplification Calculator */}
            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-cyan-300 uppercase">2. PCR Амплификация (N = N₀ · 2ⁿ):</span>
                <span className="font-mono text-sm text-white bg-cyan-600/40 px-2.5 py-0.5 rounded-lg border border-cyan-400/40">
                  n = {pcrCycles} цикъла • N₀ = {pcrInitialCopies}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">
                    Начални ДНК матрици (N₀): <strong>{pcrInitialCopies}</strong>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={pcrInitialCopies}
                    onChange={(e) => setPcrInitialCopies(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">
                    Термални цикли (n): <strong>{pcrCycles}</strong>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={pcrCycles}
                    onChange={(e) => setPcrCycles(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-cyan-300 font-bold block">
                    Получени ДНК копия след {pcrCycles} цикъла:
                  </span>
                  <span className="text-xs text-slate-300">
                    N = {pcrInitialCopies} × 2^{pcrCycles}
                  </span>
                </div>
                <div className="font-mono text-lg font-black text-cyan-300">
                  {(pcrInitialCopies * Math.pow(2, pcrCycles)).toLocaleString('bg-BG')} копия
                </div>
              </div>

              <div className="text-[11px] text-slate-300 leading-relaxed">
                <strong>3 стъпки на всеки PCR цикъл:</strong> 1) Денатурация (94–96 °C — разкъсване на Н-връзките); 2) Анилинг / Хибридизация на праймерите (50–65 °C); 3) Елонгация с термостабилна <em>Taq</em> ДНК-полимераза (72 °C).
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
