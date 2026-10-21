import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { PHOTOELECTRIC_METALS } from '../data/scienceLabData';

// Изнесено от ScienceDziLab.tsx — един таб от STEM лабораторията
export const SciencePhysicsTab: React.FC = () => {
  // =========================================================================
  // TAB 3: PHYSICS STATE (Ohm, Photoeffect, Carnot & Three-Phase Power)
  // =========================================================================
  const [circuitMode, setCircuitMode] = useState<'series' | 'parallel'>('parallel');
  const [r1, setR1] = useState<number>(6);
  const [r2, setR2] = useState<number>(3);
  const [voltage, setVoltage] = useState<number>(12);

  const [selectedMetalIdx, setSelectedMetalIdx] = useState<number>(0);
  const [wavelengthNm, setWavelengthNm] = useState<number>(400);

  // Carnot & 3-Phase Industrial Power State
  const [carnotHotC, setCarnotHotC] = useState<number>(227); // 500 K
  const [carnotColdC, setCarnotColdC] = useState<number>(27); // 300 K
  const [threePhaseLineCurrentA, setThreePhaseLineCurrentA] = useState<number>(50);
  const [threePhaseCosPhi, setThreePhaseCosPhi] = useState<number>(0.8);

  const rEq = circuitMode === 'series' ? r1 + r2 : (r1 * r2) / (r1 + r2);
  const totalCurrent = voltage / rEq;
  const totalPower = voltage * totalCurrent;

  const currentMetal = PHOTOELECTRIC_METALS[selectedMetalIdx] || PHOTOELECTRIC_METALS[0];
  // E_photon (eV) = 1240 / lambda(nm)
  const photonEnergyEv = +(1240 / wavelengthNm).toFixed(2);
  const isPhotoeffectActive = photonEnergyEv >= currentMetal.workFunctionEv;
  const maxKineticEv = isPhotoeffectActive ? +(photonEnergyEv - currentMetal.workFunctionEv).toFixed(2) : 0;

  const t1Kelvin = carnotHotC + 273;
  const t2Kelvin = Math.min(t1Kelvin - 10, carnotColdC + 273);
  const carnotEfficiencyPct = +(((t1Kelvin - t2Kelvin) / t1Kelvin) * 100).toFixed(1);

  // 3-phase 400 V line voltage calculations: S = sqrt(3)*U_L*I_L, P = S*cos(phi), Q = S*sin(phi)
  const apparentPowerKva = +((Math.sqrt(3) * 400 * threePhaseLineCurrentA) / 1000).toFixed(2);
  const activePowerKw = +(apparentPowerKva * threePhaseCosPhi).toFixed(2);
  const sinPhi = Math.sqrt(Math.max(0, 1 - threePhaseCosPhi * threePhaseCosPhi));
  const reactivePowerKvar = +(apparentPowerKva * sinPhi).toFixed(2);


  return (
      <div className="space-y-8">
        {/* Ohm's Law & Circuit Calculator */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                Електричество и Магнетизъм • 9. и 10. клас
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Жив Калкулатор за Последователно и Успоредно Свързване на Резистори
              </h3>
            </div>

            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setCircuitMode('series')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                  circuitMode === 'series' ? 'bg-blue-600 text-white' : 'text-slate-600'
                }`}
              >
                Последователно (R = R₁ + R₂)
              </button>
              <button
                onClick={() => setCircuitMode('parallel')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                  circuitMode === 'parallel' ? 'bg-blue-600 text-white' : 'text-slate-600'
                }`}
              >
                Успоредно (1/R = 1/R₁ + 1/R₂)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Съпротивление R₁:</span>
                <span className="font-mono text-blue-700">{r1} Ω</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={r1}
                onChange={(e) => setR1(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Съпротивление R₂:</span>
                <span className="font-mono text-blue-700">{r2} Ω</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={r2}
                onChange={(e) => setR2(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Напрежение U:</span>
                <span className="font-mono text-amber-700">{voltage} V</span>
              </div>
              <input
                type="range"
                min={2}
                max={48}
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <div className="text-[11px] text-blue-700">Еквивалентно R</div>
              <div className="text-lg font-bold text-blue-950 font-mono">{rEq.toFixed(2)} Ω</div>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-[11px] text-emerald-700">Общ ток I = U / R</div>
              <div className="text-lg font-bold text-emerald-950 font-mono">{totalCurrent.toFixed(2)} A</div>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <div className="text-[11px] text-amber-800">Мощност P = U · I</div>
              <div className="text-lg font-bold text-amber-950 font-mono">{totalPower.toFixed(1)} W</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[11px] text-slate-800">Топлина за 10 s (Q = P·t)</div>
              <div className="text-lg font-bold text-slate-950 font-mono">{(totalPower * 10).toFixed(0)} J</div>
            </div>
          </div>
        </div>

        {/* Einstein Photoelectric Effect Simulator */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Квантова Физика • НВО 10 & ДЗИ 12
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Симулатор на Фотоефекта на Айнщайн (hν = A + Ek,max)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Избери метал за фотокатода (Отделителна работа A):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PHOTOELECTRIC_METALS.map((m, idx) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMetalIdx(idx)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                      selectedMetalIdx === idx
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {m.name} (A = {m.workFunctionEv} eV)
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Дължина на вълната λ на падащата светлина:</span>
                <span className="font-mono text-blue-700">{wavelengthNm} nm ({photonEnergyEv} eV)</span>
              </div>
              <input
                type="range"
                min={180}
                max={750}
                step={5}
                value={wavelengthNm}
                onChange={(e) => setWavelengthNm(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>180 nm (Ултравиолетова UV)</span>
                <span>400–700 nm (Видима)</span>
                <span>750 nm (Инфрачервена)</span>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isPhotoeffectActive
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="space-y-1">
              <div className="text-sm font-bold flex items-center gap-2">
                {isPhotoeffectActive ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>НАБЛЮДАВА СЕ ФОТОЕФЕКТ! (Енергията на фотона {photonEnergyEv} eV ≥ A = {currentMetal.workFunctionEv} eV)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>НЯМА ФОТОЕФЕКТ! (λ = {wavelengthNm} nm е над червената граница λ_max = {currentMetal.redLimitNm} nm)</span>
                  </>
                )}
              </div>
              <p className="text-xs opacity-90">
                Червена граница за {currentMetal.name}: λ_max = {currentMetal.redLimitNm} nm.
              </p>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-center shrink-0">
              <div className="text-[10px] uppercase font-bold text-slate-500">Макс. кинетична енергия Ek,max</div>
              <div className="text-lg font-bold font-mono text-slate-900">{maxKineticEv} eV</div>
            </div>
          </div>
        </div>

        {/* Module 3C: Carnot Heat Engine & Three-Phase Power Simulator (DIPPK 522010) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Carnot Heat Engine */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#083861] via-[#0a4b82] to-[#145a96] text-white space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Термодинамика и Топлотехника • ДЗИ Физика & Енергетика
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Топлинна Машина на Карно: η_max = (T₁ - T₂) / T₁
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-blue-100">Нагревател t₁:</span>
                  <strong className="font-mono text-amber-300">{carnotHotC} °C ({t1Kelvin} K)</strong>
                </div>
                <input
                  type="range"
                  min={100}
                  max={600}
                  step={5}
                  value={carnotHotC}
                  onChange={(e) => setCarnotHotC(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-blue-100">Охладител t₂:</span>
                  <strong className="font-mono text-sky-300">{carnotColdC} °C ({t2Kelvin} K)</strong>
                </div>
                <input
                  type="range"
                  min={-20}
                  max={90}
                  step={5}
                  value={carnotColdC}
                  onChange={(e) => setCarnotColdC(Number(e.target.value))}
                  className="w-full accent-sky-400"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold text-amber-300 block">Максимален термичен КПД η_max:</span>
                <span className="font-mono text-blue-100">
                  ({t1Kelvin} K - {t2Kelvin} K) / {t1Kelvin} K
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-amber-300">
                {carnotEfficiencyPct}%
              </div>
            </div>
          </div>

          {/* Three-Phase Power Triangle Simulator */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#083861] via-[#0a4b82] to-[#145a96] text-white space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                Трифазна Електротехника (U_L = 400 V) • Трета СПК Електротехник (522010)
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Триъгълник на Мощностите (P, Q, S) & Корекция на cos φ
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-blue-100">Линеен ток I_L:</span>
                  <strong className="font-mono text-sky-300">{threePhaseLineCurrentA} A</strong>
                </div>
                <input
                  type="range"
                  min={10}
                  max={250}
                  step={5}
                  value={threePhaseLineCurrentA}
                  onChange={(e) => setThreePhaseLineCurrentA(Number(e.target.value))}
                  className="w-full accent-sky-400"
                />
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-blue-100">Фактор cos φ:</span>
                  <strong className="font-mono text-emerald-300">{threePhaseCosPhi.toFixed(2)}</strong>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={1.0}
                  step={0.02}
                  value={threePhaseCosPhi}
                  onChange={(e) => setThreePhaseCosPhi(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40">
                <span className="text-[10px] text-emerald-300 block">Активна P (kW)</span>
                <strong className="font-mono text-sm text-white">{activePowerKw} kW</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/40">
                <span className="text-[10px] text-rose-300 block">Реактивна Q (kVAr)</span>
                <strong className="font-mono text-sm text-white">{reactivePowerKvar} kVAr</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-sky-950/80 border border-sky-500/40">
                <span className="text-[10px] text-sky-300 block">Пълна S (kVA)</span>
                <strong className="font-mono text-sm text-white">{apparentPowerKva} kVA</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
