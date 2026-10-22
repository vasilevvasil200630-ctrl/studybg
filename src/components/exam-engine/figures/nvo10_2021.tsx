import React from 'react';

/**
 * Чертежи към НВО по математика (X клас), 18.06.2021 г.
 * Пресъздадени като SVG по официалния вариант на МОН — същите означения и дължини.
 */

const INK = '#334155';
const GRID = '#e2e8f0';
const ACCENT = '#1a6fb8';
const WATER = '#e0f0fb';
const font = { fontFamily: 'inherit', fill: INK } as const;

const rightAngle = (cx: number, cy: number, ax: number, ay: number, bx: number, by: number, s = 9) => {
  const l1 = Math.hypot(ax - cx, ay - cy);
  const l2 = Math.hypot(bx - cx, by - cy);
  const ux = ((ax - cx) / l1) * s;
  const uy = ((ay - cy) / l1) * s;
  const vx = ((bx - cx) / l2) * s;
  const vy = ((by - cy) / l2) * s;
  return `M${cx + ux},${cy + uy} L${cx + ux + vx},${cy + uy + vy} L${cx + vx},${cy + vy}`;
};

const angleArc = (V: number[], P: number[], Q: number[], r: number) => {
  const a1 = Math.atan2(P[1] - V[1], P[0] - V[0]);
  const a2 = Math.atan2(Q[1] - V[1], Q[0] - V[0]);
  const p1 = [V[0] + r * Math.cos(a1), V[1] + r * Math.sin(a1)];
  const p2 = [V[0] + r * Math.cos(a2), V[1] + r * Math.sin(a2)];
  let d = a2 - a1;
  while (d < -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  return `M${p1[0]},${p1[1]} A${r},${r} 0 0 ${d > 0 ? 1 : 0} ${p2[0]},${p2[1]}`;
};

/** Малка координатна мрежа с права през (0; y0) и (x0; 0) — за отговорите на задача 6 */
const MiniGraph: React.FC<{ ox: number; oy: number; y0: number; x0: number; label: string; id: string }> = ({ ox, oy, y0, x0, label, id }) => {
  const u = 17;
  const X = (x: number) => ox + (x + 4.6) * u;
  const Y = (y: number) => oy + (6.8 - y) * u;
  const xs = [-4, -3, -2, -1, 1, 2, 3, 4, 5];
  const ys = [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6];
  // продължаваме правата до краищата на мрежата
  const k = -y0 / x0;
  const yAt = (x: number) => k * x + y0;
  const xa = Math.max(-4.6, (6.6 - y0) / k < (-6.6 - y0) / k ? (6.6 - y0) / k : (-6.6 - y0) / k);
  const xb = Math.min(5.6, (6.6 - y0) / k > (-6.6 - y0) / k ? (6.6 - y0) / k : (-6.6 - y0) / k);
  return (
    <g>
      {[...xs, 0].map((x) => <line key={`gx${x}`} x1={X(x)} y1={Y(6.6)} x2={X(x)} y2={Y(-6.6)} stroke={GRID} />)}
      {[...ys, 0].map((y) => <line key={`gy${y}`} x1={X(-4.6)} y1={Y(y)} x2={X(5.6)} y2={Y(y)} stroke={GRID} />)}
      <line x1={X(-4.6)} y1={Y(0)} x2={X(5.8)} y2={Y(0)} stroke={INK} markerEnd={`url(#${id})`} />
      <line x1={X(0)} y1={Y(-6.6)} x2={X(0)} y2={Y(6.9)} stroke={INK} markerEnd={`url(#${id})`} />
      <line x1={X(xa)} y1={Y(yAt(xa))} x2={X(xb)} y2={Y(yAt(xb))} stroke={ACCENT} strokeWidth="1.8" />
      <circle cx={X(0)} cy={Y(y0)} r="2.6" fill={ACCENT} />
      <circle cx={X(x0)} cy={Y(0)} r="2.6" fill={ACCENT} />
      {xs.map((x) => <text key={`tx${x}`} x={X(x)} y={Y(0) + 11} fontSize="8" textAnchor="middle" style={font}>{x}</text>)}
      {ys.filter((y) => y % 2 === 0).map((y) => <text key={`ty${y}`} x={X(0) - 4} y={Y(y) + 3} fontSize="8" textAnchor="end" style={font}>{y}</text>)}
      <text x={X(0) + 3} y={Y(0) + 11} fontSize="9" fontStyle="italic" style={font}>O</text>
      <text x={X(5.5)} y={Y(0) - 4} fontSize="10" fontStyle="italic" style={font}>x</text>
      <text x={X(0) + 5} y={Y(6.6)} fontSize="10" fontStyle="italic" style={font}>y</text>
      <text x={X(0.5)} y={Y(-6.8) + 18} fontSize="13" fontWeight="600" textAnchor="middle" style={font}>{label}</text>
    </g>
  );
};

/** Задача 6 — четири графики на линейни функции (отговори А–Г) */
export const Q6FourGraphs: React.FC = () => {
  const W = 10.6 * 17;
  const H = 13.8 * 17 + 26;
  return (
    <svg viewBox={`0 0 ${2 * W + 30} ${2 * H + 10}`} className="h-auto w-full max-w-[460px]" role="img" aria-label="Четири графики: А) права през (0; 6) и (2; 0); Б) права през (0; 6) и (3; 0); В) права през (0; −6) и (2; 0); Г) права през (0; −6) и (3; 0).">
      <defs>
        <marker id="q6a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={INK} />
        </marker>
      </defs>
      <MiniGraph id="q6a" ox={5} oy={5} y0={6} x0={2} label="А)" />
      <MiniGraph id="q6a" ox={W + 25} oy={5} y0={6} x0={3} label="Б)" />
      <MiniGraph id="q6a" ox={5} oy={H + 5} y0={-6} x0={2} label="В)" />
      <MiniGraph id="q6a" ox={W + 25} oy={H + 5} y0={-6} x0={3} label="Г)" />
    </svg>
  );
};

/** Задача 7 — парабола с връх (3; 1), която пресича оста x в 2 и 4 */
export const Q7Parabola2021: React.FC = () => {
  const u = 26;
  const X = (x: number) => 16 + (x + 4.5) * u;
  const Y = (y: number) => 12 + (4.6 - y) * u;
  const f = (x: number) => -((x - 3) ** 2) + 1;
  const pts: string[] = [];
  for (let x = 1.35; x <= 4.65; x += 0.05) pts.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
  const xs = [-4, -3, -2, -1, 1, 2, 3, 4, 5];
  const ys = [-2, -1, 1, 2, 3, 4];
  return (
    <svg viewBox={`0 0 ${X(5.9)} ${Y(-2.75)}`} className="h-auto w-full max-w-[300px]" role="img" aria-label="Парабола с клони надолу, връх в точката (3; 1), пресича оста x в точките 2 и 4.">
      <defs>
        <marker id="q7a21" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={INK} />
        </marker>
      </defs>
      {[...xs, 0].map((x) => <line key={`gx${x}`} x1={X(x)} y1={Y(4.4)} x2={X(x)} y2={Y(-2.6)} stroke={GRID} />)}
      {[...ys, 0].map((y) => <line key={`gy${y}`} x1={X(-4.5)} y1={Y(y)} x2={X(5.5)} y2={Y(y)} stroke={GRID} />)}
      <line x1={X(-4.5)} y1={Y(0)} x2={X(5.7)} y2={Y(0)} stroke={INK} strokeWidth="1.2" markerEnd="url(#q7a21)" />
      <line x1={X(0)} y1={Y(-2.6)} x2={X(0)} y2={Y(4.5)} stroke={INK} strokeWidth="1.2" markerEnd="url(#q7a21)" />
      <polyline points={pts.join(' ')} fill="none" stroke={ACCENT} strokeWidth="2" />
      <line x1={X(0)} y1={Y(1)} x2={X(3)} y2={Y(1)} stroke={INK} strokeDasharray="4 3" />
      <line x1={X(3)} y1={Y(1)} x2={X(3)} y2={Y(0)} stroke={INK} strokeDasharray="4 3" />
      <circle cx={X(3)} cy={Y(1)} r="3" fill={ACCENT} />
      <circle cx={X(2)} cy={Y(0)} r="2.6" fill={ACCENT} />
      <circle cx={X(4)} cy={Y(0)} r="2.6" fill={ACCENT} />
      {xs.map((x) => <text key={`tx${x}`} x={X(x) + (x === 2 || x === 4 ? -6 : 0)} y={Y(0) + 13} fontSize="10" textAnchor="middle" style={font}>{x}</text>)}
      {ys.map((y) => <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 3.5} fontSize="10" textAnchor="end" style={font}>{y}</text>)}
      <text x={X(0) + 4} y={Y(0) + 13} fontSize="11" fontStyle="italic" style={font}>O</text>
      <text x={X(5.5)} y={Y(0) + 14} fontSize="12" fontStyle="italic" style={font}>x</text>
      <text x={X(0) - 14} y={Y(4.3)} fontSize="12" fontStyle="italic" style={font}>y</text>
    </svg>
  );
};

/** Задача 12 — ширина на река чрез подобни триъгълници */
export const Q12River: React.FC = () => {
  const s = 3.1;
  const A = [18, 34];
  const B = [A[0] + 40 * s, 34];
  const C = [B[0] + 35 * s, 34];
  const D = [B[0], 34 + 32 * s];
  const E = [C[0], 34 + 60 * s];
  return (
    <svg viewBox={`0 0 ${C[0] + 46} ${E[1] + 34}`} className="h-auto w-full max-w-[360px]" role="img" aria-label="Река между два бряга. От брега AB = 40 m до точка B; BD = 32 m по левия бряг, CE = 60 m по десния бряг; правата AE минава през D.">
      <rect x={B[0]} y={14} width={C[0] - B[0]} height={E[1] + 10} fill={WATER} />
      <line x1={B[0]} y1={14} x2={B[0]} y2={E[1] + 24} stroke={ACCENT} strokeWidth="1.6" />
      <line x1={C[0]} y1={14} x2={C[0]} y2={E[1] + 24} stroke={ACCENT} strokeWidth="1.6" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={INK} strokeWidth="1.3" />
      <line x1={A[0]} y1={A[1]} x2={E[0]} y2={E[1]} stroke={INK} strokeWidth="1.3" />
      <path d={rightAngle(B[0], B[1], A[0], A[1], D[0], D[1], 8)} fill="none" stroke={INK} />
      <path d={rightAngle(C[0], C[1], B[0], B[1], E[0], E[1], 8)} fill="none" stroke={INK} />
      {[A, B, C, D, E].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.2" fill={INK} />)}
      <text x={A[0] - 4} y={A[1] - 8} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] - 14} y={B[1] - 8} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] + 5} y={C[1] - 8} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={D[0] - 15} y={D[1] + 4} fontSize="13" fontStyle="italic" style={font}>D</text>
      <text x={E[0] + 6} y={E[1] + 4} fontSize="13" fontStyle="italic" style={font}>E</text>
      <text x={(A[0] + B[0]) / 2 - 12} y={A[1] - 6} fontSize="12" style={font}>40 m</text>
      <text x={B[0] - 40} y={(B[1] + D[1]) / 2 - 6} fontSize="12" style={font}>32 m</text>
      <text x={C[0] + 6} y={(C[1] + E[1]) / 2 - 10} fontSize="12" style={font}>60 m</text>
      <text x={(B[0] + C[0]) / 2} y={E[1] + 18} fontSize="12" fontStyle="italic" textAnchor="middle" style={{ ...font, fill: ACCENT }}>река</text>
    </svg>
  );
};

/** Задача 13 — хордите AE и DF се пресичат в P; ∠ADF = 20°, ∠DFE = 30° */
export const Q13Chords: React.FC = () => {
  const O = [120, 116];
  const R = 92;
  const P = (deg: number) => [O[0] + R * Math.cos((deg * Math.PI) / 180), O[1] - R * Math.sin((deg * Math.PI) / 180)];
  // дъга AF = 40°, дъга DE = 60° — както следва от дадените вписани ъгли
  const D = P(75);
  const E = P(15);
  const A = P(178);
  const F = P(218);
  const den = (A[0] - E[0]) * (D[1] - F[1]) - (A[1] - E[1]) * (D[0] - F[0]);
  const tt = ((A[0] - D[0]) * (D[1] - F[1]) - (A[1] - D[1]) * (D[0] - F[0])) / den;
  const X = [A[0] + tt * (E[0] - A[0]), A[1] + tt * (E[1] - A[1])];
  // надписът на ъгъла стои по ъглополовящата, извън дъгата
  const inside = (V: number[], P1: number[], P2: number[], d: number) => {
    const u1 = [(P1[0] - V[0]) / Math.hypot(P1[0] - V[0], P1[1] - V[1]), (P1[1] - V[1]) / Math.hypot(P1[0] - V[0], P1[1] - V[1])];
    const u2 = [(P2[0] - V[0]) / Math.hypot(P2[0] - V[0], P2[1] - V[1]), (P2[1] - V[1]) / Math.hypot(P2[0] - V[0], P2[1] - V[1])];
    const b = [u1[0] + u2[0], u1[1] + u2[1]];
    const l = Math.hypot(b[0], b[1]);
    return [V[0] + (b[0] / l) * d, V[1] + (b[1] / l) * d];
  };
  const L20 = inside(D, A, F, 40);
  const L30 = inside(F, D, E, 40);
  return (
    <svg viewBox="0 0 245 230" className="h-auto w-full max-w-[240px]" role="img" aria-label="Окръжност с хорди AE и DF, които се пресичат в точка P; ъгъл ADF = 20°, ъгъл DFE = 30°.">
      <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={A[0]} y1={A[1]} x2={E[0]} y2={E[1]} stroke={INK} strokeWidth="1.3" />
      <line x1={D[0]} y1={D[1]} x2={F[0]} y2={F[1]} stroke={INK} strokeWidth="1.3" />
      <line x1={A[0]} y1={A[1]} x2={D[0]} y2={D[1]} stroke={INK} strokeWidth="1.3" />
      <line x1={F[0]} y1={F[1]} x2={E[0]} y2={E[1]} stroke={INK} strokeWidth="1.3" />
      <path d={angleArc(D, A, F, 24)} fill="none" stroke={ACCENT} strokeWidth="1.3" />
      <path d={angleArc(F, D, E, 24)} fill="none" stroke={ACCENT} strokeWidth="1.3" />
      <circle cx={X[0]} cy={X[1]} r="2.2" fill={INK} />
      <text x={D[0] - 2} y={D[1] - 7} fontSize="13" fontStyle="italic" style={font}>D</text>
      <text x={E[0] + 6} y={E[1] + 2} fontSize="13" fontStyle="italic" style={font}>E</text>
      <text x={A[0] - 15} y={A[1] + 4} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={F[0] - 14} y={F[1] + 12} fontSize="13" fontStyle="italic" style={font}>F</text>
      <text x={X[0] - 2} y={X[1] + 16} fontSize="13" fontStyle="italic" style={font}>P</text>
      <text x={L20[0]} y={L20[1] + 4} fontSize="11" textAnchor="middle" style={{ ...font, fill: ACCENT }}>20°</text>
      <text x={L30[0]} y={L30[1] + 4} fontSize="11" textAnchor="middle" style={{ ...font, fill: ACCENT }}>30°</text>
    </svg>
  );
};

/** Задача 14 — правоъгълен △ABC (∠B = 90°), AB = 3, AC = √13 */
export const Q14RightTriangle2021: React.FC = () => {
  const s = 52;
  const A = [20, 135];
  const B = [A[0] + 3 * s, 135];
  const C = [B[0], 135 - 2 * s];
  return (
    <svg viewBox="0 0 215 160" className="h-auto w-full max-w-[230px]" role="img" aria-label="Правоъгълен триъгълник ABC с прав ъгъл при B; AB = 3 cm, хипотенуза AC = √13 cm.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <path d={rightAngle(B[0], B[1], A[0], A[1], C[0], C[1], 9)} fill="none" stroke={INK} />
      <path d={angleArc(A, B, C, 22)} fill="none" stroke={ACCENT} strokeWidth="1.3" />
      <text x={A[0] - 4} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] - 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] + 4} y={C[1] - 4} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={(A[0] + B[0]) / 2 - 12} y={A[1] + 16} fontSize="12" style={font}>3 cm</text>
      <text x={(A[0] + C[0]) / 2 - 40} y={(A[1] + C[1]) / 2 - 6} fontSize="12" style={font}>√13 cm</text>
    </svg>
  );
};

/** Задача 15 — успоредник ABCD с височина DH = 3 и AD = BD = 5 */
export const Q15Parallelogram: React.FC = () => {
  const s = 22;
  const A = [20, 100];
  const H = [A[0] + 4 * s, 100];
  const B = [A[0] + 8 * s, 100];
  const D = [H[0], 100 - 3 * s];
  const C = [B[0] + 4 * s, D[1]];
  const tick = (P: number[], Q: number[]) => {
    const m = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
    const l = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
    const n = [-(Q[1] - P[1]) / l, (Q[0] - P[0]) / l];
    return `M${m[0] - n[0] * 5},${m[1] - n[1] * 5} L${m[0] + n[0] * 5},${m[1] + n[1] * 5}`;
  };
  return (
    <svg viewBox="0 0 315 120" className="h-auto w-full max-w-[320px]" role="img" aria-label="Успоредник ABCD; височината DH към AB е 3 cm, а AD = BD = 5 cm.">
      <polygon points={`${A} ${B} ${C} ${D}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={D[0]} y1={D[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth="1.2" />
      <line x1={D[0]} y1={D[1]} x2={H[0]} y2={H[1]} stroke={INK} strokeWidth="1.2" />
      <path d={rightAngle(H[0], H[1], D[0], D[1], B[0], B[1], 8)} fill="none" stroke={INK} />
      <path d={tick(A, D)} stroke={INK} strokeWidth="1.2" />
      <path d={tick(D, B)} stroke={INK} strokeWidth="1.2" />
      <text x={A[0] - 4} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={H[0] - 4} y={H[1] + 16} fontSize="13" fontStyle="italic" style={font}>H</text>
      <text x={B[0] - 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 2} y={C[1] - 6} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={D[0] - 4} y={D[1] - 6} fontSize="13" fontStyle="italic" style={font}>D</text>
      <text x={(A[0] + D[0]) / 2 - 36} y={(A[1] + D[1]) / 2 - 2} fontSize="12" style={font}>5 cm</text>
      <text x={H[0] + 5} y={(H[1] + D[1]) / 2 + 4} fontSize="12" style={font}>3 cm</text>
    </svg>
  );
};
