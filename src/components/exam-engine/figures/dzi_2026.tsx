import React from 'react';

/**
 * Чертежи към ДЗИ по математика — 2021–2026 г.
 * Пресъздадени като SVG по официалния вариант на МОН — същите означения.
 */

const INK = '#334155';
const font = { fontFamily: 'inherit', fill: INK } as const;

/** Задача 4 — куб ABCDA₁B₁C₁D₁ с равнината (DBC₁) */
export const D26Q4Cube: React.FC = () => {
  const A = [36, 176];
  const B = [146, 176];
  const C = [188, 146];
  const D = [78, 146];
  const up = (p: number[]) => [p[0], p[1] - 110];
  const [A1, B1, C1, D1] = [A, B, C, D].map(up);
  const line = (p: number[], q: number[], dashed = false) => (
    <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={INK} strokeWidth={dashed ? 1.2 : 1.6} strokeDasharray={dashed ? '5 4' : undefined} />
  );
  const label = (p: number[], text: string, dx: number, dy: number) => (
    <text x={p[0] + dx} y={p[1] + dy} fontSize="13" fontStyle="italic" style={font}>
      {text[0]}
      {text.length > 1 && <tspan fontSize="9" dy="3">{text.slice(1)}</tspan>}
    </text>
  );
  return (
    <svg viewBox="0 0 220 200" className="h-auto w-full max-w-[230px]" role="img" aria-label="Куб ABCDA1B1C1D1; равнината през върховете D, B и C1 е защрихована.">
      <polygon points={`${D} ${B} ${C1}`} fill="#cbd5e1" fillOpacity="0.7" />
      {line(A, B)}
      {line(B, C)}
      {line(A, A1)}
      {line(B, B1)}
      {line(C, C1)}
      {line(A1, B1)}
      {line(B1, C1)}
      {line(C1, D1)}
      {line(D1, A1)}
      {line(A, D, true)}
      {line(D, C, true)}
      {line(D, D1, true)}
      {line(D, B, true)}
      {line(D, C1, true)}
      {line(B, C1)}
      {label(A, 'A', -12, 14)}
      {label(B, 'B', -4, 16)}
      {label(C, 'C', 6, 6)}
      {label(D, 'D', -16, 2)}
      {label(A1, 'A1', -16, -2)}
      {label(B1, 'B1', -24, -6)}
      {label(C1, 'C1', 6, -2)}
      {label(D1, 'D1', -8, -6)}
    </svg>
  );
};

/** ДЗИ 2025, задача 8 — вложени квадрати, всеки с половината от страната на предходния */
export const D25Q8Squares: React.FC = () => {
  const x0 = 20;
  const y0 = 170;
  const s0 = 150;
  const squares = Array.from({ length: 5 }, (_, i) => s0 / 2 ** i);
  return (
    <svg viewBox="0 0 220 190" className="h-auto w-full max-w-[200px]" role="img" aria-label="Квадрат със страна 4 cm; в долния му ляв ъгъл са вписани квадрати, всеки с половината от страната на предходния.">
      {squares.map((s, i) => (
        <rect key={i} x={x0} y={y0 - s} width={s} height={s} fill={i === 0 ? '#fff' : i % 2 ? '#f1f5f9' : '#e2e8f0'} stroke={INK} strokeWidth={i === 0 ? 1.6 : 1.1} />
      ))}
      <text x={x0 + s0 + 6} y={y0 - s0 / 2 + 4} fontSize="12" style={font}>4 cm</text>
    </svg>
  );
};

/** ДЗИ 2024, задача 9 — правилна триъгълна призма и равнината (ACB₁) */
export const D24Q9Prism: React.FC = () => {
  const C = [30, 140];
  const B = [200, 140];
  const A = [108, 172];
  const up = (p: number[]) => [p[0], p[1] - 120];
  const [C1, B1, A1] = [C, B, A].map(up);
  const seg = (p: number[], q: number[], dashed = false) => (
    <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={INK} strokeWidth={dashed ? 1.2 : 1.6} strokeDasharray={dashed ? '5 4' : undefined} />
  );
  const label = (p: number[], text: string, dx: number, dy: number) => (
    <text x={p[0] + dx} y={p[1] + dy} fontSize="13" fontStyle="italic" style={font}>
      {text[0]}
      {text.length > 1 && <tspan fontSize="9" dy="3">{text.slice(1)}</tspan>}
    </text>
  );
  return (
    <svg viewBox="0 0 230 195" className="h-auto w-full max-w-[230px]" role="img" aria-label="Правилна триъгълна призма ABCA1B1C1 с отсечките AB1 и CB1 от равнината ACB1.">
      <polygon points={`${A} ${C} ${B1}`} fill="#cbd5e1" fillOpacity="0.45" />
      {seg(C, A)}
      {seg(A, B)}
      {seg(C, B, true)}
      {seg(C, C1)}
      {seg(A, A1)}
      {seg(B, B1)}
      {seg(C1, A1)}
      {seg(A1, B1)}
      {seg(C1, B1)}
      {seg(A, B1)}
      {seg(C, B1, true)}
      {label(C, 'C', -14, 4)}
      {label(B, 'B', 6, 4)}
      {label(A, 'A', -4, 17)}
      {label(C1, 'C1', -18, 0)}
      {label(B1, 'B1', 6, 0)}
      {label(A1, 'A1', -6, -8)}
    </svg>
  );
};

/**
 * ДЗИ 2022, задача 1 — четири куба с отбелязани многоъгълници (отговорите А–Г).
 * Върховете са в координати на единичния куб (x — надясно, y — в дълбочина, z — нагоре),
 * както на чертежите на МОН; само Г е равнинно сечение (−x + y − z/2 = −1/2).
 */
const CUBE_SECTIONS: { label: string; pts: [number, number, number][]; midTicks?: boolean }[] = [
  { label: 'А)', pts: [[0, 0, 1], [1, 0.5, 1], [1, 1, 0], [0, 1, 0]] },
  { label: 'Б)', pts: [[0, 0, 1], [1, 1, 1], [1, 0, 0], [0, 1, 0]] },
  { label: 'В)', pts: [[0, 1, 1], [1, 1, 1], [1, 0, 0], [0, 1, 0]] },
  { label: 'Г)', pts: [[0, 0, 1], [1, 1, 1], [1, 0.5, 0], [0.5, 0, 0]], midTicks: true },
];

export const D22Q1CubeSections: React.FC = () => {
  const s = 74;
  const dx = 30;
  const dy = 27;
  const cell = (ox: number, oy: number) => (p: [number, number, number]) => [ox + p[0] * s + p[1] * dx, oy + s + dy - p[2] * s - p[1] * dy];
  const cubeEdges: [[number, number, number], [number, number, number], boolean][] = [
    [[0, 0, 0], [1, 0, 0], false], [[1, 0, 0], [1, 0, 1], false], [[1, 0, 1], [0, 0, 1], false], [[0, 0, 1], [0, 0, 0], false],
    [[0, 1, 1], [1, 1, 1], false], [[1, 1, 1], [1, 1, 0], false], [[1, 0, 1], [1, 1, 1], false], [[0, 0, 1], [0, 1, 1], false],
    [[1, 0, 0], [1, 1, 0], false],
    [[0, 0, 0], [0, 1, 0], true], [[0, 1, 0], [1, 1, 0], true], [[0, 1, 0], [0, 1, 1], true],
  ];
  return (
    <svg viewBox="0 0 330 300" className="h-auto w-full max-w-[400px]" role="img" aria-label="Четири куба с отбелязани многоъгълници, означени А), Б), В) и Г). На Г) многоъгълникът минава през два върха на горната стена и през средите на два ръба на долната стена.">
      {CUBE_SECTIONS.map((c, i) => {
        const P = cell(20 + (i % 2) * 160, 8 + Math.floor(i / 2) * 140);
        const poly = c.pts.map(P).map((q) => q.join(',')).join(' ');
        const labelAt = P([0, 0, 0]);
        return (
          <g key={c.label}>
            <polygon points={poly} fill="#94a3b8" fillOpacity="0.55" stroke={INK} strokeWidth="1" />
            {cubeEdges.map(([a, b, hidden], ei) => {
              const [x1, y1] = P(a);
              const [x2, y2] = P(b);
              return <line key={ei} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="1.2" strokeDasharray={hidden ? '4 3' : undefined} />;
            })}
            {c.midTicks &&
              ([[0.25, 0, 0], [0.75, 0, 0], [1, 0.25, 0], [1, 0.75, 0]] as [number, number, number][]).map((m, mi) => {
                const [x, y] = P(m);
                return <line key={mi} x1={x} y1={y - 4} x2={x} y2={y + 4} stroke={INK} strokeWidth="1.2" />;
              })}
            <text x={labelAt[0] + 48} y={labelAt[1] + 18} fontSize="13" fontWeight="600" textAnchor="middle" style={font}>{c.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** ДЗИ 2021, задача 9 — равнобедрен △ABC (AC = BC) с вписана окръжност; лъчът AO пресича BC в L */
export const D21Q9Isosceles: React.FC = () => {
  const s = 15; // 1 cm
  const A = [40, 175];
  const B = [A[0] + 4.8 * s, 175];
  const h = Math.sqrt(64 - 2.4 * 2.4) * s;
  const C = [(A[0] + B[0]) / 2, 175 - h];
  const L = [C[0] + (5 / 8) * (B[0] - C[0]), C[1] + (5 / 8) * (B[1] - C[1])];
  const r = ((4.8 * Math.sqrt(64 - 5.76)) / 2 / 10.4) * s;
  const O = [C[0], 175 - r];
  return (
    <svg viewBox="0 0 160 195" className="h-auto w-full max-w-[160px]" role="img" aria-label="Равнобедрен триъгълник ABC с AC = BC и вписана окръжност с център O; лъчът AO пресича BC в точка L, като LC = 5 и LB = 3.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.5" />
      <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={INK} strokeDasharray="4 3" />
      <line x1={A[0]} y1={A[1]} x2={L[0]} y2={L[1]} stroke={INK} strokeWidth="1.2" />
      <circle cx={O[0]} cy={O[1]} r="2" fill={INK} />
      <circle cx={L[0]} cy={L[1]} r="2" fill={INK} />
      <text x={A[0] - 12} y={A[1] + 6} fontSize="12" fontStyle="italic" style={font}>A</text>
      <text x={B[0] + 4} y={B[1] + 6} fontSize="12" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] - 6} fontSize="12" fontStyle="italic" style={font}>C</text>
      <text x={L[0] + 5} y={L[1] + 2} fontSize="12" fontStyle="italic" style={font}>L</text>
      <text x={O[0] - 4} y={O[1] - 5} fontSize="11" fontStyle="italic" style={font}>O</text>
      <text x={(C[0] + L[0]) / 2 + 6} y={(C[1] + L[1]) / 2} fontSize="11" style={font}>5</text>
      <text x={(L[0] + B[0]) / 2 + 6} y={(L[1] + B[1]) / 2 + 2} fontSize="11" style={font}>3</text>
    </svg>
  );
};
