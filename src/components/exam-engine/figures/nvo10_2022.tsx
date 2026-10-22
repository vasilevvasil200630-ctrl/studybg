import React from 'react';

/**
 * Чертежи към НВО по математика (X клас), 16.06.2022 г.
 * Пресъздадени като SVG по официалния вариант на МОН — същите означения и дължини.
 */

const INK = '#334155';
const GRID = '#e2e8f0';
const ACCENT = '#1a6fb8';
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

/** Задача 5 — права през (−2; 0) и (0; 2) */
export const Q5Line2022: React.FC = () => {
  const u = 28;
  const X = (x: number) => 20 + (x + 4.5) * u;
  const Y = (y: number) => 14 + (4 - y) * u;
  const xs = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
  const ys = [-3, -2, -1, 0, 1, 2, 3, 4];
  return (
    <svg viewBox={`0 0 ${X(5.8)} ${Y(-3.4)}`} className="h-auto w-full max-w-[320px]" role="img" aria-label="Права на квадратна мрежа, която пресича оста x в точката −2 и оста y в точката 2.">
      <defs>
        <marker id="q5b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={INK} />
        </marker>
      </defs>
      {xs.map((x) => <line key={`x${x}`} x1={X(x)} y1={Y(4)} x2={X(x)} y2={Y(-3.3)} stroke={GRID} />)}
      {ys.map((y) => <line key={`y${y}`} x1={X(-4.5)} y1={Y(y)} x2={X(5.4)} y2={Y(y)} stroke={GRID} />)}
      <line x1={X(-4.5)} y1={Y(0)} x2={X(5.6)} y2={Y(0)} stroke={INK} strokeWidth="1.2" markerEnd="url(#q5b)" />
      <line x1={X(0)} y1={Y(-3.3)} x2={X(0)} y2={Y(4.3)} stroke={INK} strokeWidth="1.2" markerEnd="url(#q5b)" />
      <line x1={X(-4.5)} y1={Y(-2.5)} x2={X(1.8)} y2={Y(3.8)} stroke={ACCENT} strokeWidth="2" />
      <circle cx={X(-2)} cy={Y(0)} r="3" fill={ACCENT} />
      <circle cx={X(0)} cy={Y(2)} r="3" fill={ACCENT} />
      {xs.filter((x) => x !== 0).map((x) => <text key={`tx${x}`} x={X(x)} y={Y(0) + 14} fontSize="10" textAnchor="middle" style={font}>{x}</text>)}
      {ys.filter((y) => y !== 0 && y < 4).map((y) => <text key={`ty${y}`} x={X(0) - 5} y={Y(y) + 3.5} fontSize="10" textAnchor="end" style={font}>{y}</text>)}
      <text x={X(0) + 4} y={Y(0) + 14} fontSize="12" fontStyle="italic" style={font}>O</text>
      <text x={X(5.45)} y={Y(0) + 15} fontSize="12" fontStyle="italic" style={font}>x</text>
      <text x={X(0) - 14} y={Y(3.85)} fontSize="12" fontStyle="italic" style={font}>y</text>
    </svg>
  );
};

/** Задача 9 — вписан ъгъл ACB и централен ъгъл AOB */
export const Q9InscribedAngle: React.FC = () => {
  const O = [120, 110];
  const R = 88;
  const P = (deg: number) => [O[0] + R * Math.cos((deg * Math.PI) / 180), O[1] - R * Math.sin((deg * Math.PI) / 180)];
  const C = P(95);
  const A = P(-95);
  const B = P(-23);
  return (
    <svg viewBox="0 0 250 225" className="h-auto w-full max-w-[240px]" role="img" aria-label="Окръжност с център O, вписан ъгъл ACB и централен ъгъл AOB над същата дъга AB.">
      <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={INK} strokeWidth="1.4" />
      <polyline points={`${A} ${C} ${B}`} fill="none" stroke={INK} strokeWidth="1.3" />
      <polyline points={`${A} ${O} ${B}`} fill="none" stroke={INK} strokeWidth="1.3" />
      <circle cx={O[0]} cy={O[1]} r="2.4" fill={INK} />
      <text x={O[0] - 4} y={O[1] - 8} fontSize="13" fontStyle="italic" style={font}>O</text>
      <text x={C[0] - 4} y={C[1] - 7} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={A[0] - 4} y={A[1] + 17} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] + 6} y={B[1] + 8} fontSize="13" fontStyle="italic" style={font}>B</text>
    </svg>
  );
};

/** Задача 11 — правоъгълен △ABC, височина CH = 6, AH : HB = 1 : 9 */
export const Q11RightTriangle2022: React.FC = () => {
  const s = 13;
  const A = [20, 120];
  const H = [A[0] + 2 * s, 120];
  const B = [A[0] + 20 * s, 120];
  const C = [H[0], 120 - 6 * s];
  return (
    <svg viewBox="0 0 300 145" className="h-auto w-full max-w-[300px]" role="img" aria-label="Правоъгълен триъгълник ABC с височина CH = 6 към хипотенузата; AH : HB = 1 : 9.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={C[0]} y1={C[1]} x2={H[0]} y2={H[1]} stroke={INK} strokeWidth="1.2" />
      <path d={rightAngle(C[0], C[1], A[0], A[1], B[0], B[1], 8)} fill="none" stroke={INK} />
      <path d={rightAngle(H[0], H[1], C[0], C[1], B[0], B[1], 8)} fill="none" stroke={INK} />
      <text x={A[0] - 4} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={H[0] - 4} y={H[1] + 16} fontSize="13" fontStyle="italic" style={font}>H</text>
      <text x={B[0] - 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] - 7} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={H[0] + 6} y={(H[1] + C[1]) / 2 + 4} fontSize="12" style={font}>6</text>
    </svg>
  );
};

/** Задача 12 — трапец ABCD (AB ∥ CD), диагоналите се пресичат в O; AO = 6, OC = 2, CD = 3 */
export const Q12TrapezoidDiagonals: React.FC = () => {
  const s = 26;
  const A = [20, 150];
  const B = [A[0] + 9 * s, 150];
  const D = [A[0] + 1.6 * s, 150 - 4.2 * s];
  const C = [D[0] + 3 * s, D[1]];
  // O дели AC в отношение 6 : 2 = 3 : 1
  const O = [A[0] + (C[0] - A[0]) * 0.75, A[1] + (C[1] - A[1]) * 0.75];
  return (
    <svg viewBox="0 0 275 170" className="h-auto w-full max-w-[275px]" role="img" aria-label="Трапец ABCD с основи AB и CD = 3; диагоналите се пресичат в O, като AO = 6 и OC = 2.">
      <polygon points={`${A} ${B} ${C} ${D}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={INK} />
      <line x1={B[0]} y1={B[1]} x2={D[0]} y2={D[1]} stroke={INK} />
      <text x={A[0] - 4} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] - 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] + 2} y={C[1] - 6} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={D[0] - 12} y={D[1] - 6} fontSize="13" fontStyle="italic" style={font}>D</text>
      <text x={O[0] - 4} y={O[1] + 18} fontSize="13" fontStyle="italic" style={font}>O</text>
      <text x={(D[0] + C[0]) / 2 - 3} y={D[1] - 6} fontSize="12" style={font}>3</text>
      <text x={(O[0] + C[0]) / 2 + 6} y={(O[1] + C[1]) / 2 + 2} fontSize="12" style={font}>2</text>
      <text x={(A[0] + O[0]) / 2 + 6} y={(A[1] + O[1]) / 2 + 12} fontSize="12" style={font}>6</text>
    </svg>
  );
};

/** Задача 13 — △ABC с AB = 2, AC = 2√2, BC = 2√5 (∠BAC = 135°) */
export const Q13Triangle135: React.FC = () => {
  const s = 40;
  const A = [110, 120];
  const B = [A[0] + 2 * s * Math.cos((-8 * Math.PI) / 180), A[1] - 2 * s * Math.sin((-8 * Math.PI) / 180)];
  const C = [A[0] + 2 * Math.SQRT2 * s * Math.cos((127 * Math.PI) / 180), A[1] - 2 * Math.SQRT2 * s * Math.sin((127 * Math.PI) / 180)];
  return (
    <svg viewBox="0 0 230 160" className="h-auto w-full max-w-[230px]" role="img" aria-label="Тъпоъгълен триъгълник ABC с AB = 2, AC = 2√2 и BC = 2√5.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <text x={A[0] - 6} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] + 2} y={B[1] + 14} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 6} y={C[1] - 6} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={(A[0] + B[0]) / 2 - 3} y={(A[1] + B[1]) / 2 + 18} fontSize="12" style={font}>2</text>
      <text x={(A[0] + C[0]) / 2 - 34} y={(A[1] + C[1]) / 2 + 4} fontSize="12" style={font}>2√2</text>
      <text x={(B[0] + C[0]) / 2 + 6} y={(B[1] + C[1]) / 2 - 4} fontSize="12" style={font}>2√5</text>
    </svg>
  );
};

/** Задача 15 — прав кръгов цилиндър; образуваща 5, диагонал на осното сечение 7 */
export const Q15Cylinder: React.FC = () => {
  const cx = 110;
  const rx = 60;
  const ry = 15;
  const top = 32;
  const bottom = 172;
  return (
    <svg viewBox="0 0 230 200" className="h-auto w-full max-w-[220px]" role="img" aria-label="Прав кръгов цилиндър с образуваща 5; диагоналът на осното му сечение е 7.">
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill="none" stroke={INK} strokeWidth="1.4" />
      <path d={`M${cx - rx},${bottom} A${rx},${ry} 0 0 0 ${cx + rx},${bottom}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <path d={`M${cx - rx},${bottom} A${rx},${ry} 0 0 1 ${cx + rx},${bottom}`} fill="none" stroke={INK} strokeDasharray="5 4" />
      <line x1={cx - rx} y1={top} x2={cx - rx} y2={bottom} stroke={INK} strokeWidth="1.4" />
      <line x1={cx + rx} y1={top} x2={cx + rx} y2={bottom} stroke={INK} strokeWidth="1.4" />
      <line x1={cx - rx} y1={top} x2={cx + rx} y2={top} stroke={INK} strokeDasharray="5 4" />
      <line x1={cx - rx} y1={bottom} x2={cx + rx} y2={bottom} stroke={INK} strokeDasharray="5 4" />
      <line x1={cx - rx} y1={bottom} x2={cx + rx} y2={top} stroke={ACCENT} strokeDasharray="5 4" strokeWidth="1.3" />
      <text x={cx - 4} y={(top + bottom) / 2 - 6} fontSize="12" style={{ ...font, fill: ACCENT }}>7</text>
      <text x={cx + rx + 8} y={(top + bottom) / 2 + 4} fontSize="12" style={font}>5</text>
    </svg>
  );
};

/** Задача 17 — остроъгълен △ABC, AC = 13, BC = 15, височина CD, AD = 5 */
export const Q17Triangle2022: React.FC = () => {
  const s = 13;
  const A = [20, 180];
  const D = [A[0] + 5 * s, 180];
  const B = [A[0] + 14 * s, 180];
  const C = [D[0], 180 - 12 * s];
  return (
    <svg viewBox="0 0 225 205" className="h-auto w-full max-w-[220px]" role="img" aria-label="Остроъгълен триъгълник ABC с AC = 13, BC = 15 и височина CD; AD = 5.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={C[0]} y1={C[1]} x2={D[0]} y2={D[1]} stroke={INK} strokeWidth="1.2" />
      <path d={rightAngle(D[0], D[1], C[0], C[1], A[0], A[1], 8)} fill="none" stroke={INK} />
      <text x={A[0] - 4} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={D[0] - 4} y={D[1] + 16} fontSize="13" fontStyle="italic" style={font}>D</text>
      <text x={B[0] - 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] - 7} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={(A[0] + C[0]) / 2 - 20} y={(A[1] + C[1]) / 2} fontSize="12" style={font}>13</text>
      <text x={(B[0] + C[0]) / 2 + 6} y={(B[1] + C[1]) / 2} fontSize="12" style={font}>15</text>
      <text x={(A[0] + D[0]) / 2 - 3} y={A[1] + 16} fontSize="12" style={font}>5</text>
    </svg>
  );
};
