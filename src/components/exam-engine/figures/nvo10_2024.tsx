import React from 'react';

/**
 * Чертежи и диаграми към НВО по математика (X клас), 12.06.2024 г.
 * Пресъздадени като SVG по официалния вариант на МОН. Както в оригинала:
 * чертежите са за илюстрация и не са в мащаб.
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

/** Дъга за ъгъл с връх V между лъчите към P и Q */
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

/** Задача 3 — оценки от контролна работа */
export const Q3GradesChart: React.FC = () => {
  const data: [string, number][] = [['слаб 2', 2], ['среден 3', 3], ['добър 4', 7], ['много добър 5', 4], ['отличен 6', 9]];
  const left = 52;
  const top = 14;
  const h = 200;
  const w = 430;
  const Y = (v: number) => top + h - (v / 10) * h;
  const step = w / data.length;
  return (
    <svg viewBox={`0 0 ${left + w + 10} ${top + h + 58}`} className="h-auto w-full max-w-[490px]" role="img" aria-label="Стълбова диаграма на оценките: слаб 2 — 2 ученици, среден 3 — 3, добър 4 — 7, много добър 5 — 4, отличен 6 — 9.">
      {Array.from({ length: 11 }, (_, v) => (
        <g key={v}>
          <line x1={left} x2={left + w} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? INK : GRID} />
          <text x={left - 8} y={Y(v) + 4} fontSize="10.5" textAnchor="end" style={font}>{v}</text>
        </g>
      ))}
      <text x={16} y={Y(5)} fontSize="11.5" fontWeight="600" textAnchor="middle" transform={`rotate(-90 16 ${Y(5)})`} style={font}>Брой ученици</text>
      {data.map(([label, v], i) => {
        const cx = left + step * i + step / 2;
        return (
          <g key={label}>
            <rect x={cx - 15} y={Y(v)} width="30" height={Y(0) - Y(v)} fill="#5ea5dd" stroke="#0a4b82" />
            <text x={cx} y={Y(0) + 16} fontSize="11" fontWeight="600" textAnchor="middle" style={font}>{label}</text>
          </g>
        );
      })}
      <text x={left + w / 2} y={top + h + 46} fontSize="11.5" fontWeight="600" textAnchor="middle" style={font}>оценки</text>
    </svg>
  );
};

/** Задача 5 — изминат път S (km) във времето t (h) */
export const Q5Motion: React.FC = () => {
  const left = 52;
  const top = 12;
  const h = 210;
  const w = 330;
  const X = (t: number) => left + (t / 5) * w;
  const Y = (s: number) => top + h - (s / 350) * h;
  const pts = [0, 1, 2, 3, 4].map((t) => [X(t), Y(75 * t)]);
  return (
    <svg viewBox={`0 0 ${left + w + 20} ${top + h + 50}`} className="h-auto w-full max-w-[400px]" role="img" aria-label="Графика на изминатия път S в километри спрямо времето t в часове: права през точките (0; 0), (1; 75), (2; 150), (3; 225) и (4; 300).">
      {[0, 50, 100, 150, 200, 250, 300, 350].map((s) => (
        <g key={s}>
          <line x1={left} x2={left + w} y1={Y(s)} y2={Y(s)} stroke={s === 0 ? INK : GRID} />
          <text x={left - 8} y={Y(s) + 4} fontSize="10.5" textAnchor="end" style={font}>{s}</text>
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((t) => (
        <g key={t}>
          <line x1={X(t)} x2={X(t)} y1={top} y2={Y(0)} stroke={t === 0 ? INK : GRID} />
          <text x={X(t)} y={Y(0) + 15} fontSize="10.5" textAnchor="middle" style={font}>{t}</text>
        </g>
      ))}
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={ACCENT} strokeWidth="2" />
      {pts.map((p) => <circle key={p[0]} cx={p[0]} cy={p[1]} r="3.5" fill={ACCENT} />)}
      <text x={14} y={Y(175)} fontSize="11.5" fontStyle="italic" textAnchor="middle" transform={`rotate(-90 14 ${Y(175)})`} style={font}>S (km)</text>
      <text x={left + w} y={Y(0) + 34} fontSize="11.5" fontStyle="italic" textAnchor="end" style={font}>t (h)</text>
    </svg>
  );
};

/** Задача 11 — тъпоъгълен △ABC, AC = 3, BC = 4 */
export const Q11ObtuseTriangle: React.FC = () => {
  const s = 40;
  const C = [140, 30];
  const ang = (deg: number) => (deg * Math.PI) / 180;
  // CA и CB сключват 120°, разположени като в оригинала
  const A = [C[0] - 3 * s * Math.cos(ang(30)), C[1] + 3 * s * Math.sin(ang(30))];
  const B = [C[0] + 4 * s * Math.cos(ang(30)), C[1] + 4 * s * Math.sin(ang(30))];
  return (
    <svg viewBox="0 0 330 150" className="h-auto w-full max-w-[320px]" role="img" aria-label="Тъпоъгълен триъгълник ABC с тъп ъгъл при C; AC = 3, BC = 4.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <text x={A[0] - 14} y={A[1] + 4} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] + 4} y={B[1] + 12} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] - 8} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={(A[0] + C[0]) / 2 - 14} y={(A[1] + C[1]) / 2 - 2} fontSize="12" style={font}>3</text>
      <text x={(B[0] + C[0]) / 2 + 2} y={(B[1] + C[1]) / 2 - 6} fontSize="12" style={font}>4</text>
    </svg>
  );
};

/** Задача 12 — сенките на дърво и на човек */
export const Q12Shadows: React.FC = () => {
  const g = 170;
  return (
    <svg viewBox="0 0 330 200" className="h-auto w-full max-w-[320px]" role="img" aria-label="Дърво със сянка 9 m и човек с ръст 1,80 m със сянка 60 cm; слънчевите лъчи са успоредни.">
      <line x1={10} y1={g} x2={320} y2={g} stroke={INK} strokeWidth="1.5" />
      {/* дърво */}
      <rect x={46} y={95} width="8" height={g - 95} fill="#64748b" />
      <path d="M50,20 C32,40 30,62 36,80 C28,92 34,106 50,104 C66,106 72,92 64,80 C70,62 68,40 50,20 Z" fill="#82deaa" stroke="#157a40" strokeWidth="1.2" />
      <line x1={50} y1={20} x2={170} y2={g} stroke={INK} strokeDasharray="4 4" />
      <line x1={50} y1={g + 1} x2={170} y2={g + 1} stroke="#94a3b8" strokeWidth="5" />
      <text x={104} y={g + 20} fontSize="12" style={font}>9 m</text>
      {/* човек */}
      <circle cx={250} cy={132} r="5" fill={INK} />
      <path d="M250,138 L250,156 M250,156 L245,170 M250,156 L255,170 M243,145 L257,145" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <line x1={250} y1={127} x2={274} y2={g} stroke={INK} strokeDasharray="4 4" />
      <line x1={250} y1={g + 1} x2={274} y2={g + 1} stroke="#94a3b8" strokeWidth="5" />
      <text x={208} y={140} fontSize="11.5" style={font}>1,80 m</text>
      <text x={248} y={g + 20} fontSize="12" style={font}>60 cm</text>
    </svg>
  );
};

/** Задача 13 — площадка AB върху склон; колона AC = 6, ъгъл при B = 30° */
export const Q13Platform: React.FC = () => {
  const A = [70, 50];
  const B = [250, 50];
  const C = [70, 154];
  return (
    <svg viewBox="0 0 300 200" className="h-auto w-full max-w-[290px]" role="img" aria-label="Площадка AB, хоризонтална, с колона AC с височина 6 при A; ъгълът между площадката и склона при B е 30°, а при A е прав.">
      <defs>
        <pattern id="q13hex" width="10" height="9" patternUnits="userSpaceOnUse">
          <path d="M2.5,0.5 L7.5,0.5 L10,4.5 L7.5,8.5 L2.5,8.5 L0,4.5 Z" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
        </pattern>
      </defs>
      <polygon points={`20,183 290,27 290,190 20,190`} fill="url(#q13hex)" stroke="none" />
      <line x1={20} y1={183} x2={290} y2={27} stroke={INK} strokeWidth="1.6" />
      <rect x={A[0]} y={A[1] - 12} width={B[0] - A[0]} height="12" fill="#f1f5f9" stroke={INK} />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={INK} strokeWidth="3" />
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth="1.4" />
      <path d={rightAngle(A[0], A[1], B[0], B[1], C[0], C[1])} fill="none" stroke={INK} />
      <path d={angleArc(B, A, C, 26)} fill="none" stroke={INK} />
      <text x={A[0] - 14} y={A[1] - 2} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] + 4} y={B[1] - 2} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 14} y={C[1] + 2} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={A[0] - 14} y={(A[1] + C[1]) / 2 + 4} fontSize="12" style={font}>6</text>
      <text x={B[0] - 58} y={B[1] + 16} fontSize="11.5" style={font}>30°</text>
    </svg>
  );
};

/** Задача 14 — △ABC, AC = 5, BC = 3, ∠ACB = 120° */
export const Q14Triangle120: React.FC = () => {
  const s = 40;
  const C = [230, 28];
  const ang = (deg: number) => (deg * Math.PI) / 180;
  const A = [C[0] - 5 * s * Math.cos(ang(20)), C[1] + 5 * s * Math.sin(ang(20))];
  const B = [C[0] + 3 * s * Math.cos(ang(40)), C[1] + 3 * s * Math.sin(ang(40))];
  return (
    <svg viewBox="0 0 340 125" className="h-auto w-full max-w-[330px]" role="img" aria-label="Триъгълник ABC с AC = 5, BC = 3 и ъгъл при C, равен на 120°.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <path d={angleArc(C, A, B, 18)} fill="none" stroke={INK} />
      <text x={C[0] - 13} y={C[1] + 34} fontSize="11.5" style={font}>120°</text>
      <text x={A[0] - 14} y={A[1] + 4} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] + 4} y={B[1] + 4} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] - 8} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={(A[0] + C[0]) / 2 - 2} y={(A[1] + C[1]) / 2 - 8} fontSize="12" style={font}>5</text>
      <text x={(B[0] + C[0]) / 2 + 6} y={(B[1] + C[1]) / 2 - 4} fontSize="12" style={font}>3</text>
    </svg>
  );
};

/** Задача 15 — правилна четириъгълна пирамида ABCDM, основен ръб 3√2, околен ръб 5 */
export const Q15Pyramid: React.FC = () => {
  const A = [30, 230];
  const B = [175, 220];
  const C = [250, 160];
  const D = [105, 170];
  const O = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
  const M = [O[0] - 2, 22];
  const solid = { stroke: INK, strokeWidth: 1.5 };
  const hidden = { stroke: INK, strokeWidth: 1.1, strokeDasharray: '5 4' };
  return (
    <svg viewBox="0 0 280 255" className="h-auto w-full max-w-[260px]" role="img" aria-label="Правилна четириъгълна пирамида ABCDM с основен ръб 3√2 и околен ръб 5; O е центърът на основата.">
      <line x1={A[0]} y1={A[1]} x2={D[0]} y2={D[1]} {...hidden} />
      <line x1={D[0]} y1={D[1]} x2={C[0]} y2={C[1]} {...hidden} />
      <line x1={M[0]} y1={M[1]} x2={D[0]} y2={D[1]} {...hidden} />
      <line x1={M[0]} y1={M[1]} x2={O[0]} y2={O[1]} {...hidden} />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} {...hidden} />
      <line x1={B[0]} y1={B[1]} x2={D[0]} y2={D[1]} {...hidden} />
      <polyline points={`${A} ${B} ${C}`} fill="none" {...solid} />
      <line x1={M[0]} y1={M[1]} x2={A[0]} y2={A[1]} {...solid} />
      <line x1={M[0]} y1={M[1]} x2={B[0]} y2={B[1]} {...solid} />
      <line x1={M[0]} y1={M[1]} x2={C[0]} y2={C[1]} {...solid} />
      <text x={M[0] - 5} y={M[1] - 7} fontSize="13" fontStyle="italic" style={font}>M</text>
      <text x={A[0] - 14} y={A[1] + 6} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] + 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] + 5} y={C[1] + 4} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={D[0] - 15} y={D[1] - 3} fontSize="13" fontStyle="italic" style={font}>D</text>
      <text x={O[0] + 4} y={O[1] + 15} fontSize="13" fontStyle="italic" style={font}>O</text>
      <text x={(A[0] + B[0]) / 2 - 10} y={(A[1] + B[1]) / 2 + 18} fontSize="12" style={font}>3√2</text>
      <text x={(M[0] + C[0]) / 2 + 8} y={(M[1] + C[1]) / 2 - 2} fontSize="12" style={font}>5</text>
    </svg>
  );
};

/** Задача 17 — △ABC, ∠ACB = 60°, AC = 3, BC = 8, CE = 3, AP ⊥ BC */
export const Q17Triangle: React.FC = () => {
  const s = 40;
  const C = [60, 26];
  const dir = [Math.cos((20 * Math.PI) / 180), Math.sin((20 * Math.PI) / 180)]; // посока на CB
  const B = [C[0] + 8 * s * dir[0], C[1] + 8 * s * dir[1]];
  const rot = (v: number[], deg: number) => {
    const r = (deg * Math.PI) / 180;
    return [v[0] * Math.cos(r) - v[1] * Math.sin(r), v[0] * Math.sin(r) + v[1] * Math.cos(r)];
  };
  const toA = rot(dir, 60);
  const A = [C[0] + 3 * s * toA[0], C[1] + 3 * s * toA[1]];
  const E = [C[0] + 3 * s * dir[0], C[1] + 3 * s * dir[1]];
  const P = [C[0] + 1.5 * s * dir[0], C[1] + 1.5 * s * dir[1]];
  return (
    <svg viewBox="0 0 400 175" className="h-auto w-full max-w-[380px]" role="img" aria-label="Триъгълник ABC с ъгъл 60° при C, AC = 3, BC = 8; точка E върху BC с CE = 3; AP е височина към BC.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={A[0]} y1={A[1]} x2={E[0]} y2={E[1]} stroke={INK} />
      <line x1={A[0]} y1={A[1]} x2={P[0]} y2={P[1]} stroke={INK} />
      <path d={rightAngle(P[0], P[1], A[0], A[1], B[0], B[1], 8)} fill="none" stroke={INK} />
      <path d={angleArc(C, A, B, 18)} fill="none" stroke={INK} />
      <path d={angleArc(B, A, C, 24)} fill="none" stroke={INK} />
      <text x={C[0] + 12} y={C[1] + 26} fontSize="11" style={font}>60°</text>
      <text x={C[0] - 14} y={C[1] - 2} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={A[0] - 6} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] + 4} y={B[1] + 4} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={E[0] + 2} y={E[1] - 7} fontSize="13" fontStyle="italic" style={font}>E</text>
      <text x={P[0] - 2} y={P[1] - 7} fontSize="13" fontStyle="italic" style={font}>P</text>
      <text x={(A[0] + C[0]) / 2 - 14} y={(A[1] + C[1]) / 2 + 4} fontSize="12" style={font}>3</text>
      <text x={(E[0] + B[0]) / 2 + 4} y={(E[1] + B[1]) / 2 - 6} fontSize="12" style={font}>8</text>
    </svg>
  );
};
