import React from 'react';

/**
 * Чертежи към НВО по математика (X клас), 16.06.2023 г.
 * Пресъздадени като SVG по официалния вариант на МОН — същите означения и дължини.
 */

const INK = '#334155';
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
  let d = a2 - a1;
  while (d < -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  return `M${V[0] + r * Math.cos(a1)},${V[1] + r * Math.sin(a1)} A${r},${r} 0 0 ${d > 0 ? 1 : 0} ${V[0] + r * Math.cos(a2)},${V[1] + r * Math.sin(a2)}`;
};

/** Задача 9 — допирателна AD и секуща ABC към окръжност k; AB = 2, BC = 6 */
export const Q9TangentSecant: React.FC = () => {
  const O = [110, 105];
  const R = 70;
  // Секущата: права през C и B върху окръжността, продължена до A
  const cAng = (155 * Math.PI) / 180;
  const C = [O[0] + R * Math.cos(cAng), O[1] + R * Math.sin(cAng)];
  const bAng = (-12 * Math.PI) / 180;
  const B = [O[0] + R * Math.cos(bAng), O[1] + R * Math.sin(bAng)];
  const u = [(B[0] - C[0]) / Math.hypot(B[0] - C[0], B[1] - C[1]), (B[1] - C[1]) / Math.hypot(B[0] - C[0], B[1] - C[1])];
  const chord = Math.hypot(B[0] - C[0], B[1] - C[1]); // съответства на 6
  const A = [B[0] + (chord / 3) * u[0], B[1] + (chord / 3) * u[1]]; // AB = 2 = 6/3
  // Допирна точка D: от A към окръжността
  const dA = Math.hypot(A[0] - O[0], A[1] - O[1]);
  const base = Math.atan2(A[1] - O[1], A[0] - O[0]);
  const t = Math.acos(R / dA);
  const D = [O[0] + R * Math.cos(base - t), O[1] + R * Math.sin(base - t)];
  return (
    <svg viewBox="0 0 300 200" className="h-auto w-full max-w-[300px]" role="img" aria-label="Окръжност k с допирателна AD и секуща AC, която пресича окръжността в B; AB = 2, BC = 6.">
      <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={C[0]} y1={C[1]} x2={A[0]} y2={A[1]} stroke={INK} strokeWidth="1.3" />
      <line x1={A[0]} y1={A[1]} x2={D[0]} y2={D[1]} stroke={INK} strokeWidth="1.3" />
      <line x1={O[0]} y1={O[1]} x2={D[0]} y2={D[1]} stroke={INK} strokeDasharray="4 3" />
      <circle cx={O[0]} cy={O[1]} r="2.2" fill={INK} />
      <path d={rightAngle(D[0], D[1], O[0], O[1], A[0], A[1], 8)} fill="none" stroke={INK} />
      <text x={O[0] - R - 16} y={O[1] - 10} fontSize="13" fontStyle="italic" style={font}>k</text>
      <text x={A[0] + 5} y={A[1] + 4} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] - 4} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 14} y={C[1] + 12} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={D[0] - 4} y={D[1] - 8} fontSize="13" fontStyle="italic" style={font}>D</text>
      <text x={(A[0] + B[0]) / 2 - 2} y={(A[1] + B[1]) / 2 + 16} fontSize="12" style={font}>2</text>
      <text x={(B[0] + C[0]) / 2} y={(B[1] + C[1]) / 2 + 16} fontSize="12" style={font}>6</text>
    </svg>
  );
};

/** Задача 10 — △ABC, AB = 4, AC = 2, ∠BAC = 120° */
export const Q10Triangle120: React.FC = () => {
  const s = 60;
  const A = [80, 130];
  const B = [A[0] + 4 * s, A[1]];
  const C = [A[0] + 2 * s * Math.cos((120 * Math.PI) / 180), A[1] - 2 * s * Math.sin((120 * Math.PI) / 180)];
  return (
    <svg viewBox="0 0 340 155" className="h-auto w-full max-w-[330px]" role="img" aria-label="Триъгълник ABC с AB = 4, AC = 2 и ъгъл 120° при A.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <path d={angleArc(A, B, C, 16)} fill="none" stroke={INK} />
      <text x={A[0] + 10} y={A[1] - 18} fontSize="11.5" style={font}>120°</text>
      <text x={A[0] - 4} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] - 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 6} y={C[1] - 7} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={(A[0] + C[0]) / 2 - 14} y={(A[1] + C[1]) / 2 + 4} fontSize="12" style={font}>2</text>
      <text x={(A[0] + B[0]) / 2 - 3} y={A[1] + 16} fontSize="12" style={font}>4</text>
    </svg>
  );
};

/** Задача 11 — правоъгълен △ABC; петата H на височината дели хипотенузата на 4 и 1 */
export const Q11RightTriangle: React.FC = () => {
  const s = 52;
  const A = [20, 130];
  const H = [A[0] + 4 * s, 130];
  const B = [A[0] + 5 * s, 130];
  const C = [H[0], 130 - 2 * s];
  return (
    <svg viewBox="0 0 305 155" className="h-auto w-full max-w-[300px]" role="img" aria-label="Правоъгълен триъгълник ABC с прав ъгъл при C и височина CH; AH = 4, HB = 1.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={C[0]} y1={C[1]} x2={H[0]} y2={H[1]} stroke={INK} />
      <path d={rightAngle(C[0], C[1], A[0], A[1], B[0], B[1], 8)} fill="none" stroke={INK} />
      <path d={rightAngle(H[0], H[1], C[0], C[1], A[0], A[1], 8)} fill="none" stroke={INK} />
      <text x={A[0] - 4} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={H[0] - 4} y={H[1] + 16} fontSize="13" fontStyle="italic" style={font}>H</text>
      <text x={B[0] - 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] - 7} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={(A[0] + H[0]) / 2 - 3} y={A[1] + 16} fontSize="12" style={font}>4</text>
      <text x={(H[0] + B[0]) / 2 - 3} y={A[1] + 16} fontSize="12" style={font}>1</text>
    </svg>
  );
};

/** Задача 12 — детска пързалка AB с височина BH = 3 и стълб CT; AT : TH = 3 : 2 */
export const Q12Slide: React.FC = () => {
  const A = [20, 130];
  const H = [290, 130];
  const B = [290, 30];
  const T = [A[0] + ((H[0] - A[0]) * 3) / 5, 130];
  const C = [T[0], A[1] - ((A[1] - B[1]) * 3) / 5];
  return (
    <svg viewBox="0 0 320 155" className="h-auto w-full max-w-[310px]" role="img" aria-label="Пързалка AB с височина BH = 3 и вертикален стълб CT; AT : TH = 3 : 2.">
      <polygon points={`${A} ${H} ${B}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={C[0]} y1={C[1]} x2={T[0]} y2={T[1]} stroke={INK} strokeWidth="1.4" />
      <path d={rightAngle(T[0], T[1], C[0], C[1], A[0], A[1], 8)} fill="none" stroke={INK} />
      <path d={rightAngle(H[0], H[1], B[0], B[1], A[0], A[1], 8)} fill="none" stroke={INK} />
      <text x={A[0] - 4} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={T[0] - 4} y={T[1] + 16} fontSize="13" fontStyle="italic" style={font}>T</text>
      <text x={H[0] - 4} y={H[1] + 16} fontSize="13" fontStyle="italic" style={font}>H</text>
      <text x={B[0] - 4} y={B[1] - 7} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] - 7} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={B[0] + 6} y={(B[1] + H[1]) / 2 + 4} fontSize="12" style={font}>3</text>
    </svg>
  );
};

/** Задача 15 — прав кръгов конус, височина 12, образуваща 13 */
export const Q15Cone: React.FC = () => {
  const O = [130, 180];
  const rx = 80;
  const ry = 18;
  const C = [130, 20];
  const A = [O[0] - rx, O[1]];
  const B = [O[0] + rx, O[1]];
  return (
    <svg viewBox="0 0 260 215" className="h-auto w-full max-w-[240px]" role="img" aria-label="Прав кръгов конус с връх C, височина CO = 12 и образуваща CB = 13.">
      <path d={`M${A[0]},${O[1]} A${rx},${ry} 0 0 1 ${B[0]},${O[1]}`} fill="none" stroke={INK} strokeDasharray="5 4" />
      <path d={`M${A[0]},${O[1]} A${rx},${ry} 0 0 0 ${B[0]},${O[1]}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={C[0]} y1={C[1]} x2={A[0]} y2={A[1]} stroke={INK} strokeWidth="1.4" />
      <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth="1.4" />
      <line x1={C[0]} y1={C[1]} x2={O[0]} y2={O[1]} stroke={INK} strokeDasharray="5 4" />
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeDasharray="5 4" />
      <path d={rightAngle(O[0], O[1], C[0], C[1], B[0], B[1], 8)} fill="none" stroke={INK} />
      <text x={C[0] - 4} y={C[1] - 7} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={A[0] - 14} y={A[1] + 4} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] + 4} y={B[1] + 4} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={O[0] - 4} y={O[1] + 30} fontSize="13" fontStyle="italic" style={font}>O</text>
      <text x={C[0] - 18} y={(C[1] + O[1]) / 2} fontSize="12" style={font}>12</text>
      <text x={(C[0] + B[0]) / 2 + 6} y={(C[1] + B[1]) / 2} fontSize="12" style={font}>13</text>
    </svg>
  );
};

/** Задача 17 — равнобедрен △ABC (AC = BC = 4√5), височина CD, AD = 4; O — център на описаната окръжност, OL — ъглополовяща в △BOD */
export const Q17Isosceles: React.FC = () => {
  const s = 24;
  const D = [140, 220];
  const A = [D[0] - 4 * s, 220];
  const B = [D[0] + 4 * s, 220];
  const C = [D[0], 220 - 8 * s];
  const O = [D[0], 220 - 3 * s];
  const L = [D[0] + 1.5 * s, 220];
  return (
    <svg viewBox="0 0 280 245" className="h-auto w-full max-w-[260px]" role="img" aria-label="Равнобедрен триъгълник ABC с бедра 4√5 и височина CD, AD = 4; O е центърът на описаната окръжност върху CD, а OL е ъглополовяща в триъгълника BOD.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={C[0]} y1={C[1]} x2={D[0]} y2={D[1]} stroke={INK} />
      <line x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} stroke={INK} />
      <line x1={O[0]} y1={O[1]} x2={L[0]} y2={L[1]} stroke={INK} />
      <path d={rightAngle(D[0], D[1], C[0], C[1], A[0], A[1], 8)} fill="none" stroke={INK} />
      <circle cx={O[0]} cy={O[1]} r="2.2" fill={INK} />
      <text x={A[0] - 6} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] - 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] - 7} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={D[0] - 4} y={D[1] + 16} fontSize="13" fontStyle="italic" style={font}>D</text>
      <text x={L[0] - 2} y={L[1] + 16} fontSize="13" fontStyle="italic" style={font}>L</text>
      <text x={O[0] + 6} y={O[1] - 4} fontSize="13" fontStyle="italic" style={font}>O</text>
      <text x={(A[0] + C[0]) / 2 - 34} y={(A[1] + C[1]) / 2} fontSize="12" style={font}>4√5</text>
      <text x={(A[0] + D[0]) / 2 - 3} y={A[1] + 16} fontSize="12" style={font}>4</text>
    </svg>
  );
};
