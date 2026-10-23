import React from 'react';

/**
 * Чертежи към ДЗИ по математика (профилирана подготовка) — 2024, 2025 и 2026 г.
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
