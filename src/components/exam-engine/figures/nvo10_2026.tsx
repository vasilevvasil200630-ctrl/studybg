import React from 'react';

/**
 * Чертежи и диаграми към НВО по математика (X клас), 19.06.2026 г.
 * Пресъздадени като SVG по официалния вариант на МОН: същите размери, стойности и означения.
 * Цветовете са тези на сайта; данните в диаграмите са точно тези от изпита.
 */

const INK = '#334155';
const MUTED = '#94a3b8';
const GRID = '#e2e8f0';
const ACCENT = '#1a6fb8';
const font = { fontFamily: 'inherit', fill: INK } as const;

/** Задача 7 — част от графиката на f(x) = −x² + 4x + 5 */
export const Q7Parabola: React.FC = () => {
  const u = 26;
  const X = (x: number) => 30 + (x + 3) * u;
  const Y = (y: number) => 14 + (10.6 - y) * u;
  const pts: string[] = [];
  for (let x = -1.45; x <= 5.45; x += 0.05) pts.push(`${X(x).toFixed(1)},${Y(-x * x + 4 * x + 5).toFixed(1)}`);
  const xs = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
  const ys = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <svg viewBox={`0 0 ${X(7)} ${Y(-2.6)}`} className="h-auto w-full max-w-[300px]" role="img" aria-label="Координатна система с парабола с връх в точка (2; 9), която пресича оста x в точките −1 и 5 и оста y в точка 5.">
      <defs>
        <clipPath id="q7clip">
          <rect x={X(-3.4)} y={Y(10.6)} width={X(6.6) - X(-3.4)} height={Y(-2.4) - Y(10.6)} />
        </clipPath>
        <marker id="q7arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={INK} />
        </marker>
      </defs>
      {xs.map((x) => <line key={`gx${x}`} x1={X(x)} y1={Y(10.4)} x2={X(x)} y2={Y(-2.4)} stroke={GRID} />)}
      {ys.map((y) => <line key={`gy${y}`} x1={X(-3.2)} y1={Y(y)} x2={X(6.4)} y2={Y(y)} stroke={GRID} />)}
      <line x1={X(-3.3)} y1={Y(0)} x2={X(6.6)} y2={Y(0)} stroke={INK} strokeWidth="1.2" markerEnd="url(#q7arrow)" />
      <line x1={X(0)} y1={Y(-2.5)} x2={X(0)} y2={Y(10.6)} stroke={INK} strokeWidth="1.2" markerEnd="url(#q7arrow)" />
      {xs.filter((x) => x !== 0).map((x) => (
        <text key={`tx${x}`} x={X(x)} y={Y(0) + 13} fontSize="10" textAnchor="middle" style={font}>{x}</text>
      ))}
      {ys.filter((y) => y !== 0).map((y) => (
        <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 3.5} fontSize="10" textAnchor="end" style={font}>{y}</text>
      ))}
      <text x={X(0) - 5} y={Y(0) + 13} fontSize="10" textAnchor="end" style={font}>0</text>
      <text x={X(6.55)} y={Y(0) - 6} fontSize="12" fontStyle="italic" style={font}>x</text>
      <text x={X(0) + 6} y={Y(10.45)} fontSize="12" fontStyle="italic" style={font}>y</text>
      <polyline points={`${X(0)},${Y(9)} ${X(2)},${Y(9)} ${X(2)},${Y(0)}`} fill="none" stroke={INK} strokeDasharray="4 3" />
      <polyline points={pts.join(' ')} fill="none" stroke={ACCENT} strokeWidth="2.2" clipPath="url(#q7clip)" />
      {[[-1, 0], [5, 0], [0, 5]].map(([x, y]) => <circle key={`p${x}`} cx={X(x)} cy={Y(y)} r="2.6" fill={ACCENT} />)}
      <text x={X(4.1)} y={Y(6.2)} fontSize="13" fontStyle="italic" style={font}>f(x)</text>
    </svg>
  );
};

const rightAngle = (cx: number, cy: number, ax: number, ay: number, bx: number, by: number, s = 9) => {
  const l1 = Math.hypot(ax - cx, ay - cy);
  const l2 = Math.hypot(bx - cx, by - cy);
  const ux = ((ax - cx) / l1) * s;
  const uy = ((ay - cy) / l1) * s;
  const vx = ((bx - cx) / l2) * s;
  const vy = ((by - cy) / l2) * s;
  return `M${cx + ux},${cy + uy} L${cx + ux + vx},${cy + uy + vy} L${cx + vx},${cy + vy}`;
};

/** Задача 8 — правоъгълен △ABC с височина CH; AH = 2 cm, HB = 8 cm */
export const Q8RightTriangle: React.FC = () => {
  const s = 30;
  const A = [20, 150];
  const H = [20 + 2 * s, 150];
  const B = [20 + 10 * s, 150];
  const C = [H[0], 150 - 4 * s];
  return (
    <svg viewBox="0 0 345 175" className="h-auto w-full max-w-[345px]" role="img" aria-label="Правоъгълен триъгълник ABC с прав ъгъл при C. Височината CH пада върху хипотенузата AB и я дели на AH = 2 и HB = 8.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={C[0]} y1={C[1]} x2={H[0]} y2={H[1]} stroke={INK} strokeWidth="1.2" />
      <path d={rightAngle(C[0], C[1], A[0], A[1], B[0], B[1])} fill="none" stroke={INK} />
      <path d={rightAngle(H[0], H[1], C[0], C[1], B[0], B[1])} fill="none" stroke={INK} />
      <path d={`M${B[0] - 26},${B[1]} A26,26 0 0 1 ${B[0] - 26 * Math.cos(Math.atan(0.5))},${B[1] - 26 * Math.sin(Math.atan(0.5))}`} fill="none" stroke={INK} />
      <path d={`M${B[0] - 30},${B[1]} A30,30 0 0 1 ${B[0] - 30 * Math.cos(Math.atan(0.5))},${B[1] - 30 * Math.sin(Math.atan(0.5))}`} fill="none" stroke={INK} />
      <text x={A[0] - 4} y={A[1] + 15} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={H[0] - 4} y={H[1] + 15} fontSize="13" fontStyle="italic" style={font}>H</text>
      <text x={B[0] - 4} y={B[1] + 15} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] - 7} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={(A[0] + H[0]) / 2 - 3} y={A[1] + 15} fontSize="12" style={font}>2</text>
      <text x={(H[0] + B[0]) / 2 - 3} y={A[1] + 15} fontSize="12" style={font}>8</text>
    </svg>
  );
};

/** Задача 9 — равнобедрен трапец ABCD, AB = 12, CD = 6, AC ⊥ BC */
export const Q9Trapezoid: React.FC = () => {
  const s = 22;
  const h = Math.sqrt(27);
  const P = (x: number, y: number) => [20 + x * s, 20 + (h - y) * s];
  const A = P(0, 0);
  const B = P(12, 0);
  const C = P(9, h);
  const D = P(3, h);
  return (
    <svg viewBox="0 0 305 160" className="h-auto w-full max-w-[305px]" role="img" aria-label="Равнобедрен трапец ABCD с основи AB = 12 и CD = 6. Диагоналът AC е перпендикулярен на бедрото BC.">
      <polygon points={`${A} ${B} ${C} ${D}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={INK} strokeWidth="1.2" />
      <path d={rightAngle(C[0], C[1], A[0], A[1], B[0], B[1])} fill="none" stroke={INK} />
      <text x={A[0] - 6} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] - 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] + 3} y={C[1] - 5} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={D[0] - 12} y={D[1] - 5} fontSize="13" fontStyle="italic" style={font}>D</text>
      <text x={(D[0] + C[0]) / 2 - 3} y={D[1] - 6} fontSize="12" style={font}>6</text>
      <text x={(A[0] + B[0]) / 2 - 6} y={A[1] + 16} fontSize="12" style={font}>12</text>
    </svg>
  );
};

/** Задача 10 — правилна четириъгълна пирамида; височина 15, основен ръб 23 (макет) */
export const Q10Pyramid: React.FC = () => {
  const A = [15, 150];
  const B = [175, 170];
  const C = [245, 120];
  const D = [85, 100];
  const O = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
  const M = [128, 14];
  const solid = { stroke: INK, strokeWidth: 1.6 };
  const hidden = { stroke: INK, strokeWidth: 1.1, strokeDasharray: '5 4' };
  return (
    <svg viewBox="0 0 260 195" className="h-auto w-full max-w-[260px]" role="img" aria-label="Правилна четириъгълна пирамида; височината е 15, а основният ръб е 23.">
      <line x1={A[0]} y1={A[1]} x2={D[0]} y2={D[1]} {...hidden} />
      <line x1={D[0]} y1={D[1]} x2={C[0]} y2={C[1]} {...hidden} />
      <line x1={M[0]} y1={M[1]} x2={D[0]} y2={D[1]} {...hidden} />
      <line x1={M[0]} y1={M[1]} x2={O[0]} y2={O[1]} {...hidden} />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={MUTED} strokeWidth="1" strokeDasharray="2 3" />
      <line x1={B[0]} y1={B[1]} x2={D[0]} y2={D[1]} stroke={MUTED} strokeWidth="1" strokeDasharray="2 3" />
      <polyline points={`${A} ${B} ${C}`} fill="none" {...solid} />
      <line x1={M[0]} y1={M[1]} x2={A[0]} y2={A[1]} {...solid} />
      <line x1={M[0]} y1={M[1]} x2={B[0]} y2={B[1]} {...solid} />
      <line x1={M[0]} y1={M[1]} x2={C[0]} y2={C[1]} {...solid} />
      <text x={O[0] + 6} y={(M[1] + O[1]) / 2} fontSize="12" style={font}>15</text>
      <text x={(A[0] + B[0]) / 2 - 8} y={(A[1] + B[1]) / 2 + 18} fontSize="12" style={font}>23</text>
    </svg>
  );
};

/** Задача 11 — „Какво количество алкохол консумирате дневно?“ (2021, 2023, 2025) */
export const Q11AlcoholChart: React.FC = () => {
  const groups: { label: string; values: [number, number, number] }[] = [
    { label: 'Не консумирам всеки ден', values: [33, 34, 39] },
    { label: 'консумирам 0 – 50 ml', values: [26, 28, 20] },
    { label: 'консумирам 51 – 100 ml', values: [30, 27, 25] },
    { label: 'консумирам над 101 ml', values: [12, 12, 16] },
  ];
  const years = ['2021', '2023', '2025'];
  const fills = ['#0a4b82', '#5ea5dd', '#ffffff'];
  const x0 = 46;
  const px = 9; // пиксела за 1 %
  const bar = 13;
  let y = 52;
  const rows: React.ReactNode[] = [];
  groups.forEach((g, gi) => {
    rows.push(<text key={`g${gi}`} x={x0} y={y} fontSize="11.5" fontWeight="600" fontStyle="italic" style={font}>{g.label}</text>);
    y += 6;
    g.values.forEach((v, vi) => {
      rows.push(
        <g key={`b${gi}-${vi}`}>
          <text x={x0 - 6} y={y + bar - 3} fontSize="10.5" textAnchor="end" style={font}>{years[vi]}</text>
          <rect x={x0} y={y} width={v * px} height={bar} fill={fills[vi]} stroke="#0a4b82" strokeWidth="1" />
          <text x={x0 + v * px + 5} y={y + bar - 3} fontSize="10.5" style={font}>{v}%</text>
        </g>
      );
      y += bar + 2;
    });
    y += 18;
  });
  return (
    <svg viewBox={`0 0 460 ${y + 10}`} className="h-auto w-full max-w-[460px]" role="img" aria-label="Хоризонтална диаграма: не консумирам всеки ден — 33% (2021), 34% (2023), 39% (2025); 0–50 ml — 26%, 28%, 20%; 51–100 ml — 30%, 27%, 25%; над 101 ml — 12%, 12%, 16%.">
      <text x="230" y="18" fontSize="14" fontWeight="700" textAnchor="middle" style={font}>Какво количество алкохол консумирате дневно?</text>
      <text x="230" y="34" fontSize="11" textAnchor="middle" style={font}>Забележка: Цифровите данни са закръглени до цяло число</text>
      {rows}
      <text x={x0 - 30} y={y} fontSize="9.5" style={{ ...font, fill: '#64748b' }}>Източник: Спиритс България и ВН Маркет Рисърч</text>
    </svg>
  );
};

/** Задача 14 — pH на дъждовна вода в някои български градове */
export const Q14PhChart: React.FC = () => {
  const data: [string, number][] = [
    ['София', 5.2], ['Пловдив', 5.4], ['Видин', 5.3], ['Русе', 4.4], ['Монтана', 5.7],
    ['Бургас', 5.8], ['Добрич', 4.7], ['Враца', 5.2], ['Благоевград', 5.5], ['Шумен', 4.9],
  ];
  const left = 58;
  const top = 34;
  const h = 280;
  const w = 470;
  const Y = (v: number) => top + h - (v / 7) * h;
  const step = w / data.length;
  const minor: React.ReactNode[] = [];
  for (let i = 0; i <= 70; i++) {
    minor.push(
      <line key={i} x1={left} x2={left + w} y1={Y(i / 10)} y2={Y(i / 10)} stroke={i % 10 === 0 ? MUTED : GRID} strokeWidth={i % 10 === 0 ? 0.9 : 0.6} />
    );
  }
  return (
    <svg viewBox={`0 0 ${left + w + 16} ${top + h + 92}`} className="h-auto w-full max-w-[540px]" role="img" aria-label="Стълбова диаграма на pH на дъждовната вода по градове: София 5,2; Пловдив 5,4; Видин 5,3; Русе 4,4; Монтана 5,7; Бургас 5,8; Добрич 4,7; Враца 5,2; Благоевград 5,5; Шумен 4,9.">
      <text x={left + w / 2} y="20" fontSize="14" fontWeight="700" textAnchor="middle" style={font}>pH на дъждовна вода в някои български градове</text>
      {minor}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((v) => (
        <text key={v} x={left - 8} y={Y(v) + 4} fontSize="11" textAnchor="end" style={font}>{v}</text>
      ))}
      <text x={16} y={Y(3.5)} fontSize="12" fontWeight="600" textAnchor="middle" transform={`rotate(-90 16 ${Y(3.5)})`} style={font}>pH</text>
      {data.map(([city, v], i) => {
        const cx = left + step * i + step / 2;
        return (
          <g key={city}>
            <rect x={cx - 9} y={Y(v)} width="18" height={Y(0) - Y(v)} fill="#0a4b82" />
            <text x={cx} y={Y(0) + 14} fontSize="11" fontWeight="600" textAnchor="end" transform={`rotate(-40 ${cx} ${Y(0) + 14})`} style={font}>
              {city}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
