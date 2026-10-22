import React from 'react';

/**
 * Чертежи и диаграми към примерните задачи на МОН по другите предмети в НВО 10
 * (биология, химия, физика, география — публикувани на 30.09.2025 г. и в модела за 2025/26).
 * Пресъздадени като SVG по данните от PDF-ите; стойностите, които задачите питат, са същите.
 */

const INK = '#334155';
const MUTED = '#64748b';
const GRID = '#e2e8f0';
const C1 = '#1a6fb8';
const C2 = '#f59e0b';
const C3 = '#94a3b8';
const font = { fontFamily: 'inherit', fill: INK } as const;
const fmt = (n: number) => String(n).replace('.', ',');

// ---------------------------------------------------------------------------
// Общи диаграми
// ---------------------------------------------------------------------------

interface BarSeries {
  name: string;
  color: string;
  /** null = няма стълб за тази категория */
  values: (number | null)[];
}

interface BarChartProps {
  title: string;
  categories: string[];
  series: BarSeries[];
  yMax: number;
  yStep: number;
  yLabel?: string;
  /** Подпис над стълба: всички, нито един или само избрани индекси на категориите */
  valueLabels?: boolean | number[];
  unitSuffix?: string;
  ariaLabel: string;
  width?: number;
}

const BarChart: React.FC<BarChartProps> = ({ title, categories, series, yMax, yStep, yLabel, valueLabels = true, unitSuffix = '', ariaLabel, width = 520 }) => {
  const left = yLabel ? 58 : 44;
  const top = 34;
  const h = 200;
  const plotW = width - left - 12;
  const Y = (v: number) => top + h - (v / yMax) * h;
  const step = plotW / categories.length;
  const groupW = step * 0.72;
  const barW = groupW / series.length;
  const legend = series.length > 1;
  const H = top + h + 34 + (legend ? 22 : 0);
  const ticks = Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => i * yStep);
  const showLabel = (ci: number) => (Array.isArray(valueLabels) ? valueLabels.includes(ci) : valueLabels);
  return (
    <svg viewBox={`0 0 ${width} ${H}`} className="h-auto w-full max-w-[520px]" role="img" aria-label={ariaLabel}>
      <text x={width / 2} y={16} fontSize="13" fontWeight="600" textAnchor="middle" style={font}>{title}</text>
      {ticks.map((v) => (
        <g key={v}>
          <line x1={left} y1={Y(v)} x2={left + plotW} y2={Y(v)} stroke={GRID} />
          <text x={left - 6} y={Y(v) + 4} fontSize="10" textAnchor="end" style={{ ...font, fill: MUTED }}>{fmt(v)}</text>
        </g>
      ))}
      {yLabel && (
        <text transform={`translate(14 ${top + h / 2}) rotate(-90)`} fontSize="10.5" textAnchor="middle" style={{ ...font, fill: MUTED }}>{yLabel}</text>
      )}
      <line x1={left} y1={top + h} x2={left + plotW} y2={top + h} stroke={INK} />
      {categories.map((c, ci) => {
        const gx = left + ci * step + (step - groupW) / 2;
        return (
          <g key={c}>
            {series.map((s, si) => {
              const v = s.values[ci];
              if (v === null) return null;
              const x = gx + si * barW;
              return (
                <g key={s.name}>
                  <rect x={x + 1} y={Y(v)} width={barW - 2} height={Y(0) - Y(v)} fill={s.color} rx="1.5" />
                  {showLabel(ci) && (
                    <text x={x + barW / 2} y={Y(v) - 4} fontSize="10" textAnchor="middle" style={font}>{fmt(v)}{unitSuffix}</text>
                  )}
                </g>
              );
            })}
            <text x={left + ci * step + step / 2} y={top + h + 15} fontSize="10.5" textAnchor="middle" style={font}>{c}</text>
          </g>
        );
      })}
      {legend && (
        <g transform={`translate(${left} ${top + h + 34})`}>
          {series.map((s, si) => (
            <g key={s.name} transform={`translate(${series.slice(0, si).reduce((x, p) => x + 34 + p.name.length * 6.4, 0)} 0)`}>
              <rect width="11" height="11" y="-9" rx="2" fill={s.color} />
              <text x="16" fontSize="11" style={font}>{s.name}</text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
};

interface LineSeries {
  name: string;
  color: string;
  points: [number, number][];
  /** Надпис в края на линията (напр. „1“, „2“) */
  endLabel?: string;
  markers?: boolean;
}

interface LineChartProps {
  title: string;
  series: LineSeries[];
  xMin: number;
  xMax: number;
  xStep: number;
  yMin?: number;
  yMax: number;
  yStep: number;
  xLabel?: string;
  yLabel?: string;
  /** Подписи по оста x вместо числата (напр. месеци) */
  xTickLabels?: string[];
  ariaLabel: string;
}

const LineChart: React.FC<LineChartProps> = ({ title, series, xMin, xMax, xStep, yMin = 0, yMax, yStep, xLabel, yLabel, xTickLabels, ariaLabel }) => {
  const width = 520;
  const left = yLabel ? 58 : 44;
  const top = 34;
  const h = 210;
  const plotW = width - left - (series.some((s) => s.endLabel && s.endLabel.length > 2) ? 84 : 26);
  const X = (x: number) => left + ((x - xMin) / (xMax - xMin)) * plotW;
  const Y = (y: number) => top + h - ((y - yMin) / (yMax - yMin)) * h;
  const xTicks = Array.from({ length: Math.round((xMax - xMin) / xStep) + 1 }, (_, i) => xMin + i * xStep);
  const yTicks = Array.from({ length: Math.round((yMax - yMin) / yStep) + 1 }, (_, i) => yMin + i * yStep);
  const rotated = !!xTickLabels;
  const H = top + h + (rotated ? 62 : xLabel ? 42 : 26);
  return (
    <svg viewBox={`0 0 ${width} ${H}`} className="h-auto w-full max-w-[520px]" role="img" aria-label={ariaLabel}>
      <text x={width / 2} y={16} fontSize="13" fontWeight="600" textAnchor="middle" style={font}>{title}</text>
      {xTicks.map((x) => <line key={`gx${x}`} x1={X(x)} y1={top} x2={X(x)} y2={top + h} stroke={GRID} />)}
      {yTicks.map((y) => (
        <g key={`gy${y}`}>
          <line x1={left} y1={Y(y)} x2={left + plotW} y2={Y(y)} stroke={GRID} />
          <text x={left - 6} y={Y(y) + 4} fontSize="10" textAnchor="end" style={{ ...font, fill: MUTED }}>{fmt(y)}</text>
        </g>
      ))}
      <line x1={left} y1={top + h} x2={left + plotW} y2={top + h} stroke={INK} />
      <line x1={left} y1={top} x2={left} y2={top + h} stroke={INK} />
      {xTicks.map((x, i) =>
        rotated ? (
          <text key={`tx${x}`} transform={`translate(${X(x) + 3} ${top + h + 12}) rotate(-40)`} fontSize="10" textAnchor="end" style={font}>{xTickLabels![i]}</text>
        ) : (
          <text key={`tx${x}`} x={X(x)} y={top + h + 15} fontSize="10" textAnchor="middle" style={{ ...font, fill: MUTED }}>{fmt(x)}</text>
        )
      )}
      {xLabel && !rotated && <text x={left + plotW / 2} y={top + h + 34} fontSize="10.5" textAnchor="middle" style={{ ...font, fill: MUTED }}>{xLabel}</text>}
      {yLabel && <text transform={`translate(14 ${top + h / 2}) rotate(-90)`} fontSize="10.5" textAnchor="middle" style={{ ...font, fill: MUTED }}>{yLabel}</text>}
      {series.map((s) => {
        const last = s.points[s.points.length - 1];
        return (
          <g key={s.name}>
            <polyline points={s.points.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} fill="none" stroke={s.color} strokeWidth="2.2" strokeLinejoin="round" />
            {s.markers && s.points.map(([x, y]) => <circle key={`${x}`} cx={X(x)} cy={Y(y)} r="3" fill={s.color} />)}
            {s.endLabel && <text x={X(last[0]) + 6} y={Y(last[1]) + 4} fontSize="13" fontWeight="700" style={font}>{s.endLabel}</text>}
          </g>
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Биология и здравно образование
// ---------------------------------------------------------------------------

/** 1. Нарастване на човешката популация 1950–2050 (на оригинала е надписана само стойността за 2050 г.) */
export const IntBioPopulation: React.FC = () => (
  <BarChart
    title="Нарастване на човешката популация 1950 – 2050"
    categories={['1950', '1975', '2000', '2030', '2050']}
    series={[{ name: 'численост', color: C1, values: [2.5, 4.1, 6.1, 8.3, 9.2] }]}
    yMax={10}
    yStep={1}
    yLabel="Численост (в млрд.)"
    valueLabels={[4]}
    unitSuffix=" млрд."
    ariaLabel="Стълбова диаграма: численост на човешката популация 1950–2050 г.; за 2050 г. е 9,2 млрд."
    width={420}
  />
);

/** 3. и 4. Определяне на пола — решетка на Пънет с гаметите X, Y (бащата) и X, X (майката) */
export const IntBioPunnett: React.FC = () => {
  const cell = 52;
  const x0 = 96;
  const y0 = 56;
  const g = (x: number, y: number, t: string) => (
    <g>
      <circle cx={x} cy={y} r="12" fill="#fff" stroke={INK} />
      <text x={x} y={y + 4.5} fontSize="12" fontWeight="600" textAnchor="middle" style={font}>{t}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 230 180" className="h-auto w-full max-w-[230px]" role="img" aria-label="Решетка на Пънет: гаметите на бащата са X и Y, на майката — X и X; клетките са празни за попълване.">
      <text x={x0 + cell} y={16} fontSize="11" textAnchor="middle" style={{ ...font, fill: MUTED }}>гамети на бащата</text>
      {g(x0 + cell / 2, 36, 'X')}
      {g(x0 + cell * 1.5, 36, 'Y')}
      <text transform={`translate(22 ${y0 + cell}) rotate(-90)`} fontSize="11" textAnchor="middle" style={{ ...font, fill: MUTED }}>гамети на майката</text>
      {g(x0 - 22, y0 + cell / 2, 'X')}
      {g(x0 - 22, y0 + cell * 1.5, 'X')}
      {[0, 1].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={x0 + c * cell} y={y0 + r * cell} width={cell} height={cell} fill="#fff" stroke={INK} />))}
    </svg>
  );
};

/** 5. Брой на наркозависимите през 2018 г. и прогноза за 2030 г. (в млн.) */
export const IntBioDrugs: React.FC = () => (
  <BarChart
    title="Брой на наркозависимите през 2018 г. и прогнозен брой за 2030 г."
    categories={['Сев. Америка', 'Лат. Америка', 'Европа', 'Африка', 'Азия', 'Океания']}
    series={[
      { name: '2018', color: C3, values: [66, 17, 42, 60, 80, 4] },
      { name: '2030', color: C1, values: [68, 19, 39, 86, 83, 4] },
    ]}
    yMax={100}
    yStep={20}
    yLabel="Приемащи наркотици (в млн.)"
    ariaLabel="Групирана стълбова диаграма: 2018 и 2030 г. — Северна Америка 66 и 68, Латинска Америка 17 и 19, Европа 42 и 39, Африка 60 и 86, Азия 80 и 83, Океания 4 и 4 млн."
  />
);

/** 6. Пренос на енергия по хранителната верига */
export const IntBioFoodChain: React.FC = () => {
  const boxes = ['Продуценти', 'Консументи\nI ред', 'Консументи\nII ред', 'Консументи\nIII ред'];
  const w = 104;
  const gap = 30;
  return (
    <svg viewBox="0 0 530 132" className="h-auto w-full max-w-[530px]" role="img" aria-label="Хранителна верига: продуценти → консументи I ред → консументи II ред → консументи III ред; на всяко равнище част от енергията се губи като топлина.">
      <defs>
        <marker id="ibf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={C2} />
        </marker>
        <marker id="ibf2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={MUTED} />
        </marker>
      </defs>
      {boxes.map((b, i) => {
        const x = 8 + i * (w + gap);
        return (
          <g key={b}>
            <rect x={x} y={14} width={w} height={50} rx="8" fill="#fff" stroke={INK} />
            {b.split('\n').map((line, li, all) => (
              <text key={li} x={x + w / 2} y={44 - (all.length - 1) * 7 + li * 14} fontSize="12" textAnchor="middle" style={font}>{line}</text>
            ))}
            {i < boxes.length - 1 && <line x1={x + w + 3} y1={39} x2={x + w + gap - 3} y2={39} stroke={C2} strokeWidth="2.5" markerEnd="url(#ibf)" />}
            <line x1={x + w / 2} y1={66} x2={x + w / 2} y2={92} stroke={MUTED} strokeWidth="1.5" markerEnd="url(#ibf2)" />
          </g>
        );
      })}
      <text x={265} y={114} fontSize="11.5" textAnchor="middle" style={{ ...font, fill: MUTED }}>Загуба на енергия — отделя се като топлина, фекалии или части от организмите</text>
    </svg>
  );
};

/** 9. Инвазивни видове в България 1980–2009 */
export const IntBioInvasive: React.FC = () => (
  <BarChart
    title="Инвазивни видове в България за периода 1980 – 2009"
    categories={['1980 – 1989', '1990 – 1999', '2000 – 2009']}
    series={[
      { name: 'растения', color: '#65a30d', values: [120, 140, 160] },
      { name: 'безгръбначни животни', color: INK, values: [10, 15, 20] },
      { name: 'гръбначни животни', color: C3, values: [20, 10, null] },
    ]}
    yMax={180}
    yStep={20}
    yLabel="брой инвазивни видове"
    ariaLabel="Групирана стълбова диаграма: растения 120, 140, 160; безгръбначни животни 10, 15, 20; гръбначни животни 20, 10 и без стойност за 2000–2009."
  />
);

/** 10. Хора с хипертония поради наднормено тегло и затлъстяване */
export const IntBioHypertension: React.FC = () => (
  <BarChart
    title="Хора с хипертония поради наднормено тегло и затлъстяване"
    categories={['']}
    series={[
      { name: 'наднормена маса', color: '#22d3ee', values: [38] },
      { name: 'затлъстяване', color: '#9f1239', values: [40] },
    ]}
    yMax={100}
    yStep={20}
    yLabel="дял от хората с хипертония в %"
    unitSuffix="%"
    ariaLabel="Две стълбчета: 38% от хората с хипертония са с наднормена маса, 40% — със затлъстяване."
    width={380}
  />
);

// ---------------------------------------------------------------------------
// Химия и опазване на околната среда
// ---------------------------------------------------------------------------

/** 8. Разтворимост на кислород във вода (mg/L) при различна температура */
export const IntChemOxygen: React.FC = () => (
  <LineChart
    title="Разтворимост на кислород във вода"
    series={[{ name: 'O₂', color: C1, markers: true, points: [[0, 14.6], [10, 11.2], [20, 9], [30, 7.6], [40, 6.5], [50, 6], [60, 5], [70, 4], [80, 3], [90, 1.8], [100, 0]] }]}
    xMin={0}
    xMax={100}
    xStep={10}
    yMax={16}
    yStep={1}
    xLabel="Температура (°C)"
    yLabel="Разтворимост на кислород (mg/L)"
    ariaLabel="Линейна графика: разтворимост на кислород — 14,6 mg/L при 0 °C, 11,2 при 10 °C, 9 при 20 °C, 7,6 при 30 °C, 6,5 при 40 °C, 6 при 50 °C, 5 при 60 °C, 4 при 70 °C, 3 при 80 °C, 1,8 при 90 °C и 0 при 100 °C."
  />
);

/** 9. Съдържание на флуоридни йони в 10 бутилирани минерални води */
export const IntChemFluoride: React.FC = () => (
  <BarChart
    title="Съдържание на флуоридни йони (F⁻) в 10 минерални води"
    categories={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
    series={[{ name: 'F⁻', color: '#34d399', values: [0.9, 4.9, 5.1, 1.2, 2.2, 4.3, 0.9, 4.9, 0.3, 5.9] }]}
    yMax={7}
    yStep={1}
    yLabel="F⁻, mg/L"
    ariaLabel="Стълбова диаграма на флуорида в минерални води № 1–10: 0,9; 4,9; 5,1; 1,2; 2,2; 4,3; 0,9; 4,9; 0,3; 5,9 mg/L."
  />
);

// ---------------------------------------------------------------------------
// Физика и астрономия
// ---------------------------------------------------------------------------

/** 1. Графики на скоростта на автомобил и трактор */
export const IntPhysVelocity: React.FC = () => (
  <LineChart
    title="Скорост на автомобила и на трактора"
    series={[
      { name: 'автомобил', color: C1, points: [[0, 0], [10, 40]], endLabel: 'автомобил' },
      { name: 'трактор', color: C2, points: [[0, 0], [10, 10]], endLabel: 'трактор' },
    ]}
    xMin={0}
    xMax={10}
    xStep={2}
    yMax={45}
    yStep={5}
    xLabel="t, s"
    yLabel="v, m/s"
    ariaLabel="Две прави през началото: скоростта на автомобила достига 40 m/s за 10 s, а на трактора — 10 m/s за 10 s."
  />
);

/** 3. Сили, действащи на сандъка */
export const IntPhysForces: React.FC = () => (
  <svg viewBox="0 0 420 150" className="h-auto w-full max-w-[420px]" role="img" aria-label="Сандък: две сили по 500 N действат наляво, сила от 800 N действа надясно.">
    <defs>
      <marker id="ipf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill={C1} />
      </marker>
    </defs>
    <rect x={160} y={40} width={100} height={70} rx="6" fill="#d6a46a" stroke="#7c4a1e" strokeWidth="2" />
    <line x1={160} y1={62} x2={260} y2={62} stroke="#7c4a1e" />
    <line x1={160} y1={60} x2={50} y2={60} stroke={C1} strokeWidth="5" markerEnd="url(#ipf)" />
    <line x1={160} y1={92} x2={50} y2={92} stroke={C1} strokeWidth="5" markerEnd="url(#ipf)" />
    <line x1={260} y1={76} x2={370} y2={76} stroke={C1} strokeWidth="5" markerEnd="url(#ipf)" />
    <text x={60} y={46} fontSize="14" fontWeight="600" style={font}>500 N</text>
    <text x={60} y={124} fontSize="14" fontWeight="600" style={font}>500 N</text>
    <text x={312} y={62} fontSize="14" fontWeight="600" style={font}>800 N</text>
  </svg>
);

/** 8. Отражение и пречупване на лазерния лъч на границата въздух — вода */
export const IntPhysRefraction: React.FC = () => {
  const O = [150, 80];
  const L = 70;
  const ray = (deg: number, len: number) => [O[0] + len * Math.sin((deg * Math.PI) / 180), O[1] + len * Math.cos((deg * Math.PI) / 180)];
  // падащ лъч отгоре вляво под 30° спрямо нормалата, отразен — отгоре вдясно, пречупен — под 22°
  const inc = [O[0] - L * Math.sin(Math.PI / 6), O[1] - L * Math.cos(Math.PI / 6)];
  const refl = [O[0] + L * Math.sin(Math.PI / 6), O[1] - L * Math.cos(Math.PI / 6)];
  const cont = ray(30, L);
  const refr = ray(22, L);
  return (
    <svg viewBox="0 0 300 170" className="h-auto w-full max-w-[300px]" role="img" aria-label="Лъч пада от въздух към вода; отразеният лъч сключва 30° с нормалата; пречупеният лъч сключва ъгъл β с нормалата и е отклонен с 8° от продължението на падащия лъч.">
      <defs>
        <marker id="ipr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={INK} />
        </marker>
      </defs>
      <rect x={20} y={O[1]} width={260} height={80} fill="#dbeafe" />
      <line x1={20} y1={O[1]} x2={280} y2={O[1]} stroke={INK} />
      <text x={26} y={O[1] - 6} fontSize="11" style={{ ...font, fill: MUTED }}>въздух</text>
      <text x={26} y={O[1] + 16} fontSize="11" style={{ ...font, fill: MUTED }}>вода</text>
      <line x1={O[0]} y1={10} x2={O[0]} y2={160} stroke={MUTED} strokeDasharray="4 3" />
      <line x1={inc[0]} y1={inc[1]} x2={O[0]} y2={O[1]} stroke={INK} strokeWidth="2" markerEnd="url(#ipr)" />
      <line x1={O[0]} y1={O[1]} x2={refl[0]} y2={refl[1]} stroke={INK} strokeWidth="1.6" markerEnd="url(#ipr)" />
      <line x1={O[0]} y1={O[1]} x2={cont[0]} y2={cont[1]} stroke={MUTED} strokeDasharray="3 3" />
      <line x1={O[0]} y1={O[1]} x2={refr[0]} y2={refr[1]} stroke={C1} strokeWidth="2" markerEnd="url(#ipr)" />
      <text x={O[0] + 8} y={O[1] - 44} fontSize="11" style={font}>30°</text>
      <text x={O[0] + 2} y={O[1] + 60} fontSize="12" fontStyle="italic" style={{ ...font, fill: C1 }}>β</text>
      <text x={O[0] + 34} y={O[1] + 68} fontSize="11" style={font}>8°</text>
    </svg>
  );
};

/** 10. Хармонична звукова вълна (амплитуда 1 m, период 2 ms) */
export const IntPhysWave: React.FC = () => {
  const pts: [number, number][] = [];
  for (let t = 0; t <= 10.0001; t += 0.05) pts.push([Number(t.toFixed(2)), Math.sin((2 * Math.PI * t) / 2)]);
  return (
    <LineChart
      title="Хармонична звукова вълна"
      series={[{ name: 'вълна', color: C1, points: pts }]}
      xMin={0}
      xMax={10}
      xStep={1}
      yMin={-1}
      yMax={1}
      yStep={0.5}
      xLabel="Време (ms)"
      yLabel="Амплитуда (m)"
      ariaLabel="Синусоида от 0 до 10 ms с амплитуда 1; максимумите са при 0,5; 2,5; 4,5; 6,5 и 8,5 ms."
    />
  );
};

/** Мълния между облак и земята (модел 2025/26) */
export const IntPhysLightning: React.FC = () => (
  <svg viewBox="0 0 220 130" className="h-auto w-full max-w-[220px]" role="img" aria-label="Мълния между облак и земната повърхност.">
    <ellipse cx={110} cy={30} rx={70} ry={20} fill="#f1f5f9" stroke={INK} />
    <polyline points="112,48 96,78 118,78 100,112" fill="none" stroke={C2} strokeWidth="3" strokeLinejoin="round" />
    <line x1={10} y1={114} x2={210} y2={114} stroke={INK} strokeWidth="1.5" />
  </svg>
);

// ---------------------------------------------------------------------------
// География и икономика
// ---------------------------------------------------------------------------

/** 1. Хидрограма — годишно водно количество по месеци (%) */
export const IntGeoHydrograph: React.FC = () => (
  <BarChart
    title="Годишно водно количество на реката по месеци"
    categories={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
    series={[{ name: '%', color: C1, values: [4, 4.5, 7.8, 16, 20.5, 15, 8.5, 5.3, 4, 3.7, 4.9, 6] }]}
    yMax={25}
    yStep={5}
    yLabel="Годишно водно количество в %"
    valueLabels={false}
    ariaLabel="Стълбова диаграма по месеци 1–12: около 4; 4,5; 7,8; 16; 20,5; 15; 8,5; 5,3; 4; 3,7; 4,9; 6 % от годишното водно количество."
  />
);

/** 5. Слънчево излъчване и CO₂ след големи вулканични изригвания (по PISA 2015) */
export const IntGeoVolcano: React.FC = () => {
  const rad: [number, number][] = [
    [1960, 93], [1963, 93.5], [1963.5, 91], [1965, 92.5], [1970, 92.8], [1975, 93], [1980, 93], [1982, 92.8], [1982.4, 77.5],
    [1983, 89], [1985, 92], [1990, 93], [1991, 93.2], [1991.6, 82], [1992.5, 88], [1994, 92.5], [2000, 93], [2002, 92.8],
  ];
  const co2: [number, number][] = [[1960, 316], [1970, 325], [1980, 338], [1990, 354], [2000, 369], [2005, 378]];
  return (
    <div className="grid w-full max-w-[520px] gap-3">
      <LineChart
        title="Слънчево излъчване, достигащо земната повърхност"
        series={[{ name: 'излъчване', color: '#dc2626', points: rad }]}
        xMin={1960}
        xMax={2005}
        xStep={10}
        yMin={70}
        yMax={100}
        yStep={10}
        yLabel="% от излъчването"
        ariaLabel="Слънчевото излъчване е около 93% и рязко спада след големите вулканични изригвания около 1963, 1982 и 1991 г., след което се възстановява."
      />
      <LineChart
        title="CO₂ в атмосферата"
        series={[{ name: 'CO₂', color: '#dc2626', points: co2 }]}
        xMin={1960}
        xMax={2005}
        xStep={10}
        yMin={280}
        yMax={400}
        yStep={20}
        yLabel="частици на милион"
        ariaLabel="Концентрацията на CO₂ расте плавно от около 316 до около 378 частици на милион, без промени около годините на вулканичните изригвания."
      />
      <p className="text-xs text-slate-500">Пресъздадено по графиките в задачата на МОН (източник: PISA 2015). Стрелките за изригванията в оригинала сочат около 1963, 1982 и 1991 г.</p>
    </div>
  );
};

/** 7. Продължителност на деня и нощта в София по месеци (2025 г.) */
export const IntGeoDayNight: React.FC = () => {
  const m = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
  const one = [9, 11, 12, 13, 15, 15, 15, 14, 12, 10, 10, 9];
  const two = [15, 13, 12, 11, 9, 9, 9, 10, 12, 13, 14, 15];
  return (
    <LineChart
      title="Продължителност на деня и нощта в София (часове)"
      series={[
        { name: '1', color: C1, points: one.map((v, i) => [i, v]), endLabel: '1' },
        { name: '2', color: C2, points: two.map((v, i) => [i, v]), endLabel: '2' },
      ]}
      xMin={0}
      xMax={11}
      xStep={1}
      yMax={16}
      yStep={2}
      xTickLabels={m}
      ariaLabel="Две линии по месеци. Линия 1: 9, 11, 12, 13, 15, 15, 15, 14, 12, 10, 10, 9 часа. Линия 2: 15, 13, 12, 11, 9, 9, 9, 10, 12, 13, 14, 15 часа. Пресичат се през март и септември."
    />
  );
};

/** 8. Природни зони по средна температура и валежи (схема на Уитакър) */
export const IntGeoWhittaker: React.FC = () => {
  const left = 60;
  const top = 14;
  const w = 420;
  const h = 280;
  const X = (t: number) => left + ((30 - t) / 42) * w; // 30 °C вляво, −12 °C вдясно
  const Y = (p: number) => top + h - (p / 4600) * h;
  const P = (pts: [number, number][]) => pts.map(([t, p]) => `${X(t)},${Y(p)}`).join(' ');
  const boundary = P([
    [29.5, 0], [29.5, 2600], [27.6, 4450], [24, 3700], [20, 3250], [13, 2960], [7, 2800], [3.5, 2380], [0.5, 1650], [-2.4, 900], [-4.4, 540], [-10, 330], [-11, 180], [-4.5, 140], [29.5, 0],
  ]);
  // Всяка граница започва и свършва върху друга граница или върху контура
  const lines: [number, number][][] = [
    [[29.5, 2550], [20, 2550], [3.5, 2380]], // тропични влажни | тропични сезонни; влажни умерени | широколистни
    [[20, 3250], [20, 1500]], // тропични сезонни | широколистни
    [[29.5, 1500], [20, 1500], [13, 1500], [9, 1100], [6, 700], [3, 600]], // савана | ...; широколистни | степи
    [[20, 1500], [19.5, 800], [19, 330]], // савана | степи
    [[29.5, 650], [28.8, 330], [-4.5, 300]], // пустини
    [[5.5, 2400], [5.3, 1700], [5, 1100], [3, 600], [1, 318]], // тайга
    [[-2.4, 900], [-4.5, 300]], // тайга | тундра
  ];
  const label = (t: number, p: number, text: string) =>
    text.split('\n').map((line, i, all) => (
      <text key={i} x={X(t)} y={Y(p) + 4 - (all.length - 1) * 6 + i * 12} fontSize="11" textAnchor="middle" style={font}>{line}</text>
    ));
  return (
    <svg viewBox="0 0 500 345" className="h-auto w-full max-w-[500px]" role="img" aria-label="Схема на природните зони по средна годишна температура (от 30 до −10 °C) и средногодишни валежи (0–4000 mm): тропични влажни гори (над ~2600 mm при 20–30 °C), тропични сезонни гори (~1500–2600 mm при 20–30 °C), савана (под ~1500 mm при 20–30 °C), пустини (най-малко валежи), влажни гори на умерените ширини, широколистни гори, степи, тайга (около −5 до 5 °C) и тундра.">
      {[0, 1000, 2000, 3000, 4000].map((p) => (
        <g key={p}>
          <line x1={left - 4} y1={Y(p)} x2={left} y2={Y(p)} stroke={INK} />
          <text x={left - 7} y={Y(p) + 4} fontSize="10" textAnchor="end" style={{ ...font, fill: MUTED }}>{p}</text>
        </g>
      ))}
      {[30, 20, 10, 0, -10].map((t) => (
        <g key={t}>
          <line x1={X(t)} y1={top + h} x2={X(t)} y2={top + h + 4} stroke={INK} />
          <text x={X(t)} y={top + h + 16} fontSize="10" textAnchor="middle" style={{ ...font, fill: MUTED }}>{t === -10 ? '−10' : t}</text>
        </g>
      ))}
      <line x1={left} y1={top} x2={left} y2={top + h} stroke={INK} />
      <line x1={left} y1={top + h} x2={left + w} y2={top + h} stroke={INK} />
      <polygon points={boundary} fill="#f5ede6" stroke={INK} strokeWidth="1.6" />
      {lines.map((l, i) => <polyline key={i} points={P(l)} fill="none" stroke={INK} strokeWidth="1.3" />)}
      {label(24.6, 3150, 'Тропични\nвлажни\nгори')}
      {label(24.6, 2050, 'Тропични\nсезонни гори')}
      {label(24.6, 1000, 'Савана')}
      {label(20, 120, 'Пустини')}
      {label(10, 3200, 'Влажни гори на\nумерените ширини')}
      {label(12, 2050, 'Широколистни\nгори')}
      {label(13, 900, 'Степи')}
      {label(2.2, 1250, 'Тайга')}
      {label(-7.5, 560, 'Тундра')}
      <text x={left + w / 2} y={top + h + 34} fontSize="10.5" textAnchor="middle" style={{ ...font, fill: MUTED }}>Средни температури (°C)</text>
      <text transform={`translate(16 ${top + h / 2}) rotate(-90)`} fontSize="10.5" textAnchor="middle" style={{ ...font, fill: MUTED }}>Средногодишни валежи (mm)</text>
    </svg>
  );
};
