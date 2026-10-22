import React from 'react';

/**
 * Чертежи и диаграми към НВО по математика (X клас), 16.06.2025 г.
 * Пресъздадени като SVG по официалния вариант на МОН — същите означения и стойности,
 * без допълнителни числа, които биха подсказали отговора.
 */

const INK = '#334155';
const GRID = '#e2e8f0';
const ACCENT = '#1a6fb8';
const font = { fontFamily: 'inherit', fill: INK } as const;

const Arrow: React.FC<{ id: string }> = ({ id }) => (
  <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" fill={INK} />
  </marker>
);

/** Задача 5 — графика на линейна функция (минава през O и (1; 2)) */
export const Q5Line: React.FC = () => {
  const u = 30;
  const X = (x: number) => 20 + (x + 3) * u;
  const Y = (y: number) => 14 + (5 - y) * u;
  const xs = [-3, -2, -1, 0, 1, 2, 3, 4];
  const ys = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox={`0 0 ${X(4.5)} ${Y(-3.3)}`} className="h-auto w-full max-w-[260px]" role="img" aria-label="Права през началото на координатната система O и точката с координати (1; 2), на квадратна мрежа.">
      <defs><Arrow id="q5a" /></defs>
      {xs.map((x) => <line key={`x${x}`} x1={X(x)} y1={Y(5)} x2={X(x)} y2={Y(-3)} stroke={GRID} />)}
      {ys.map((y) => <line key={`y${y}`} x1={X(-3)} y1={Y(y)} x2={X(4)} y2={Y(y)} stroke={GRID} />)}
      <line x1={X(-3)} y1={Y(0)} x2={X(4.4)} y2={Y(0)} stroke={INK} strokeWidth="1.2" markerEnd="url(#q5a)" />
      <line x1={X(0)} y1={Y(-3)} x2={X(0)} y2={Y(5.2)} stroke={INK} strokeWidth="1.2" markerEnd="url(#q5a)" />
      <line x1={X(-1.5)} y1={Y(-3)} x2={X(2.5)} y2={Y(5)} stroke={ACCENT} strokeWidth="2" />
      <line x1={X(1)} y1={Y(0) - 4} x2={X(1)} y2={Y(0) + 4} stroke={INK} />
      <line x1={X(0) - 4} y1={Y(1)} x2={X(0) + 4} y2={Y(1)} stroke={INK} />
      <text x={X(1) - 3} y={Y(0) + 15} fontSize="11" style={font}>1</text>
      <text x={X(0) - 12} y={Y(1) + 4} fontSize="11" style={font}>1</text>
      <text x={X(0) + 4} y={Y(0) + 15} fontSize="12" fontStyle="italic" style={font}>O</text>
      <text x={X(4.25)} y={Y(0) + 15} fontSize="12" fontStyle="italic" style={font}>x</text>
      <text x={X(0) - 14} y={Y(4.95)} fontSize="12" fontStyle="italic" style={font}>y</text>
    </svg>
  );
};

/** Задача 7 — струя вода по парабола от O до A */
export const Q7Sprinkler: React.FC = () => {
  const O = [40, 120];
  const A = [330, 120];
  const peak = [185, 30];
  const P1 = [peak[0], 2 * peak[1] - (O[1] + A[1]) / 2];
  const pathD = `M${O[0]},${O[1]} Q${P1[0]},${P1[1]} ${A[0]},${A[1]}`;
  // Стрелки по посоката на струята: точка и допирателна на квадратичната крива
  const arrows = [0.3, 0.52, 0.74].map((t) => {
    const x = (1 - t) ** 2 * O[0] + 2 * t * (1 - t) * P1[0] + t * t * A[0];
    const y = (1 - t) ** 2 * O[1] + 2 * t * (1 - t) * P1[1] + t * t * A[1];
    const dx = 2 * (1 - t) * (P1[0] - O[0]) + 2 * t * (A[0] - P1[0]);
    const dy = 2 * (1 - t) * (P1[1] - O[1]) + 2 * t * (A[1] - P1[1]);
    return { x, y, deg: (Math.atan2(dy, dx) * 180) / Math.PI };
  });
  return (
    <svg viewBox="0 0 380 145" className="h-auto w-full max-w-[380px]" role="img" aria-label="Струя вода, която излиза от точка O и пада в точка A на оста x, описвайки дъга от парабола.">
      <defs>
        <Arrow id="q7a" />
      </defs>
      <line x1={O[0]} y1={O[1]} x2={365} y2={O[1]} stroke={INK} strokeWidth="1.2" markerEnd="url(#q7a)" />
      <line x1={O[0]} y1={O[1]} x2={O[0]} y2={12} stroke={INK} strokeWidth="1.2" markerEnd="url(#q7a)" />
      <path d={pathD} fill="none" stroke={ACCENT} strokeWidth="2.2" />
      {arrows.map((a) => (
        <path key={a.x} d="M-6,-4 L5,0 L-6,4 z" fill={ACCENT} transform={`translate(${a.x} ${a.y}) rotate(${a.deg})`} />
      ))}
      <rect x={O[0] - 3} y={O[1] - 7} width="6" height="7" rx="1.5" fill={INK} />
      <text x={O[0] - 6} y={O[1] + 17} fontSize="13" fontStyle="italic" style={font}>O</text>
      <text x={A[0] - 4} y={A[1] + 17} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={360} y={O[1] + 17} fontSize="13" fontStyle="italic" style={font}>x</text>
      <text x={O[0] - 16} y={20} fontSize="13" fontStyle="italic" style={font}>y</text>
    </svg>
  );
};

/** Задача 10 — брой служители по длъжност */
export const Q10StaffChart: React.FC = () => {
  const data: [string, string, number][] = [
    ['младши', 'експерт', 2],
    ['експерт', '', 4],
    ['старши', 'експерт', 1],
    ['главен', 'експерт', 2],
    ['управител', '', 1],
  ];
  const left = 52;
  const top = 16;
  const h = 170;
  const w = 380;
  const Y = (v: number) => top + h - (v / 5) * h;
  const step = w / data.length;
  return (
    <svg viewBox={`0 0 ${left + w + 10} ${top + h + 66}`} className="h-auto w-full max-w-[460px]" role="img" aria-label="Стълбова диаграма на броя служители по длъжност: младши експерт — 2, експерт — 4, старши експерт — 1, главен експерт — 2, управител — 1.">
      {[0, 1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line x1={left} x2={left + w} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? INK : GRID} />
          <text x={left - 8} y={Y(v) + 4} fontSize="11" textAnchor="end" style={font}>{v}</text>
        </g>
      ))}
      <text x={16} y={Y(2.5)} fontSize="11.5" fontWeight="600" textAnchor="middle" transform={`rotate(-90 16 ${Y(2.5)})`} style={font}>Брой служители</text>
      {data.map(([l1, l2, v], i) => {
        const cx = left + step * i + step / 2;
        return (
          <g key={l1}>
            <rect x={cx - 15} y={Y(v)} width="30" height={Y(0) - Y(v)} fill="#5ea5dd" stroke="#0a4b82" />
            <text x={cx} y={Y(0) + 16} fontSize="11" textAnchor="middle" style={font}>{l1}</text>
            {l2 && <text x={cx} y={Y(0) + 29} fontSize="11" textAnchor="middle" style={font}>{l2}</text>}
          </g>
        );
      })}
      <text x={left + w / 2} y={top + h + 56} fontSize="11.5" fontWeight="600" textAnchor="middle" style={font}>Длъжност</text>
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

/** Задача 11 — остроъгълен △ABC с височина AH = 20√3, AB = 40 */
export const Q11Triangle: React.FC = () => {
  const A = [20, 220];
  const B = [300, 220];
  const C = [190, 29.5];
  const H = [230, 98.8];
  return (
    <svg viewBox="0 0 325 245" className="h-auto w-full max-w-[320px]" role="img" aria-label="Остроъгълен триъгълник ABC с височина AH към страната BC; AH = 20√3, AB = 40.">
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1={A[0]} y1={A[1]} x2={H[0]} y2={H[1]} stroke={INK} strokeWidth="1.2" />
      <path d={rightAngle(H[0], H[1], A[0], A[1], C[0], C[1])} fill="none" stroke={INK} />
      <path d={`M${B[0] - 22},${B[1]} A22,22 0 0 1 ${B[0] - 22 * Math.cos(Math.PI / 3)},${B[1] - 22 * Math.sin(Math.PI / 3)}`} fill="none" stroke={INK} />
      <text x={A[0] - 6} y={A[1] + 16} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] - 2} y={B[1] + 16} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] - 6} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={H[0] + 8} y={H[1] + 4} fontSize="13" fontStyle="italic" style={font}>H</text>
      <text x={(A[0] + H[0]) / 2 - 10} y={(A[1] + H[1]) / 2 - 8} fontSize="12" style={font}>20√3</text>
      <text x={(A[0] + B[0]) / 2 - 8} y={A[1] + 16} fontSize="12" style={font}>40</text>
    </svg>
  );
};

/** Задача 13 — бариера на жп прелез: късо рамо 1 m, дълго рамо 3 m */
export const Q13Barrier: React.FC = () => {
  const P = [200, 150];
  const L = [80, 60];
  const S = [240, 180];
  return (
    <svg viewBox="0 0 300 250" className="h-auto w-full max-w-[290px]" role="img" aria-label="Бариера на жп прелез, завъртяна около ос на стълб: краят на дългото рамо се издига на 1,8 над хоризонталното положение, а краят на късото рамо се спуска на разстояние h.">
      <line x1={30} y1={232} x2={290} y2={232} stroke={INK} strokeWidth="3" />
      <text x={34} y={226} fontSize="10" style={{ ...font, fill: '#64748b' }}>улица</text>
      <line x1={P[0]} y1={40} x2={P[0]} y2={232} stroke="#64748b" strokeWidth="6" />
      <line x1={40} y1={P[1]} x2={262} y2={P[1]} stroke={INK} strokeDasharray="5 4" />
      <line x1={L[0]} y1={L[1]} x2={S[0]} y2={S[1]} stroke={INK} strokeWidth="7" strokeLinecap="round" />
      <line x1={L[0]} y1={L[1]} x2={S[0]} y2={S[1]} stroke="#ffffff" strokeWidth="5" strokeDasharray="14 14" />
      <circle cx={P[0]} cy={P[1]} r="6" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
      <line x1={L[0]} y1={L[1]} x2={L[0]} y2={P[1]} stroke={INK} />
      <text x={L[0] - 26} y={(L[1] + P[1]) / 2 + 4} fontSize="12" style={font}>1,8</text>
      <line x1={S[0] + 14} y1={P[1]} x2={S[0] + 14} y2={S[1]} stroke={INK} />
      <text x={S[0] + 19} y={(P[1] + S[1]) / 2 + 5} fontSize="13" fontStyle="italic" style={font}>h</text>
    </svg>
  );
};

/** Задача 14 — хотелите A, B и C около езеро; AB = 7 km, AC = 5 km, ∠ACB = 120° */
export const Q14Lake: React.FC = () => {
  const C = [150, 190];
  const A = [313.8, 75.3];
  const B = [41.2, 139.3];
  return (
    <svg viewBox="0 0 345 215" className="h-auto w-full max-w-[340px]" role="img" aria-label="Триъгълник от трите хотела A, B и C около езеро: AB = 7 km, AC = 5 km, ъгълът при C е 120°.">
      <path d="M95,150 C120,128 150,140 172,128 C192,116 196,98 222,96 C246,94 258,84 284,82 C302,81 306,92 290,99 C270,108 250,104 236,118 C220,134 204,148 178,154 C150,160 128,168 106,164 C90,161 84,158 95,150 Z" fill="#c6def4" stroke="#98c4ea" />
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.4" />
      <path d={`M${C[0] + 18 * Math.cos((35 * Math.PI) / 180)},${C[1] - 18 * Math.sin((35 * Math.PI) / 180)} A18,18 0 0 0 ${C[0] + 18 * Math.cos((155 * Math.PI) / 180)},${C[1] - 18 * Math.sin((155 * Math.PI) / 180)}`} fill="none" stroke={INK} />
      <text x={C[0] - 14} y={C[1] - 22} fontSize="11.5" style={font}>120°</text>
      <text x={A[0] + 4} y={A[1] - 4} fontSize="13" fontStyle="italic" style={font}>A</text>
      <text x={B[0] - 14} y={B[1] + 4} fontSize="13" fontStyle="italic" style={font}>B</text>
      <text x={C[0] - 4} y={C[1] + 17} fontSize="13" fontStyle="italic" style={font}>C</text>
      <text x={(A[0] + B[0]) / 2 - 22} y={(A[1] + B[1]) / 2 - 8} fontSize="12" style={font}>7 km</text>
      <text x={(A[0] + C[0]) / 2 + 8} y={(A[1] + C[1]) / 2 + 12} fontSize="12" style={font}>5 km</text>
    </svg>
  );
};

/** Задача 15 — правилна четириъгълна призма; AB = 4, AC₁ = 8 */
export const Q15Prism: React.FC = () => {
  const A = [40, 250];
  const B = [150, 250];
  const B1 = [150, 90];
  const A1 = [40, 90];
  const off = [55, -40];
  const sh = (p: number[]) => [p[0] + off[0], p[1] + off[1]];
  const D = sh(A);
  const C = sh(B);
  const C1 = sh(B1);
  const D1 = sh(A1);
  const solid = { stroke: INK, strokeWidth: 1.5 };
  const hidden = { stroke: INK, strokeWidth: 1.1, strokeDasharray: '5 4' };
  const lbl = (p: number[], t: string, dx: number, dy: number) => (
    <text x={p[0] + dx} y={p[1] + dy} fontSize="13" fontStyle="italic" style={font}>
      {t.charAt(0)}
      {t.length > 1 && <tspan fontSize="9" dy="3">1</tspan>}
    </text>
  );
  return (
    <svg viewBox="0 0 230 275" className="h-auto w-full max-w-[220px]" role="img" aria-label="Правилна четириъгълна призма ABCDA₁B₁C₁D₁ с основен ръб AB = 4 и диагонал AC₁ = 8.">
      <line x1={A[0]} y1={A[1]} x2={D[0]} y2={D[1]} {...hidden} />
      <line x1={D[0]} y1={D[1]} x2={C[0]} y2={C[1]} {...hidden} />
      <line x1={D[0]} y1={D[1]} x2={D1[0]} y2={D1[1]} {...hidden} />
      <line x1={A[0]} y1={A[1]} x2={C1[0]} y2={C1[1]} {...hidden} stroke={ACCENT} />
      <polygon points={`${A} ${B} ${B1} ${A1}`} fill="none" {...solid} />
      <polyline points={`${B} ${C} ${C1} ${D1} ${A1}`} fill="none" {...solid} />
      <line x1={B1[0]} y1={B1[1]} x2={C1[0]} y2={C1[1]} {...solid} />
      {lbl(A, 'A', -12, 14)}
      {lbl(B, 'B', 4, 14)}
      {lbl(C, 'C', 5, 4)}
      {lbl(D, 'D', -14, -4)}
      {lbl(A1, 'A1', -20, 4)}
      {lbl(B1, 'B1', -18, 16)}
      {lbl(C1, 'C1', 4, -4)}
      {lbl(D1, 'D1', -10, -8)}
      <text x={(A[0] + B[0]) / 2 - 3} y={A[1] + 16} fontSize="12" style={font}>4</text>
      <text x={(A[0] + C1[0]) / 2 + 6} y={(A[1] + C1[1]) / 2} fontSize="12" style={{ ...font, fill: ACCENT }}>8</text>
    </svg>
  );
};

const House: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <path d={`M${x - 8},${y} L${x - 8},${y - 10} L${x},${y - 18} L${x + 8},${y - 10} L${x + 8},${y} Z M${x - 8},${y - 10} L${x + 8},${y - 10}`} fill="#ffffff" stroke={INK} strokeWidth="1.4" />
);

/** Задача 17 — три къщи във върховете на равностранен триъгълник със страна 180 m */
export const Q17Houses: React.FC = () => {
  const top = [150, 28];
  const left = [62, 180];
  const right = [238, 180];
  return (
    <svg viewBox="0 0 300 200" className="h-auto w-full max-w-[280px]" role="img" aria-label="Три къщи във върховете на равностранен триъгълник със страна 180.">
      <polygon points={`${top} ${left} ${right}`} fill="none" stroke={INK} strokeDasharray="6 5" />
      <House x={top[0]} y={top[1] + 6} />
      <House x={left[0]} y={left[1] + 6} />
      <House x={right[0]} y={right[1] + 6} />
      <text x={(top[0] + left[0]) / 2 - 34} y={(top[1] + left[1]) / 2} fontSize="12" style={font}>180</text>
    </svg>
  );
};

/** Задача 17 В — стена на навес с вертикални греди 4,25 и 2; C и D делят AB на три равни части */
export const Q17Shed: React.FC = () => {
  const x0 = 60;
  const step = 70;
  const base = 170;
  const s = 30; // пиксела за 1 m
  const top = (h: number) => base - h * s;
  const yAt = (i: number) => top(4.25 + ((2 - 4.25) * i) / 3);
  return (
    <svg viewBox="0 0 330 200" className="h-auto w-full max-w-[300px]" role="img" aria-label="Стена на навес: вертикални греди с дължини 4,25 при A и 2 при B; гредите при C и D делят AB на три равни части.">
      <defs>
        <pattern id="q17hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#64748b" strokeWidth="1.5" />
        </pattern>
      </defs>
      <line x1={x0} y1={base} x2={x0 + 3 * step} y2={base} stroke={INK} strokeWidth="2.5" />
      <line x1={x0} y1={base} x2={x0} y2={top(4.25)} stroke={INK} strokeWidth="3" />
      <line x1={x0 + 3 * step} y1={base} x2={x0 + 3 * step} y2={top(2)} stroke={INK} strokeWidth="3" />
      <line x1={x0} y1={top(4.25)} x2={x0 + 3 * step} y2={top(2)} stroke={INK} strokeWidth="5" />
      {[1, 2].map((i) => (
        <rect key={i} x={x0 + i * step - 3} y={yAt(i)} width="6" height={base - yAt(i)} fill="url(#q17hatch)" stroke="#64748b" strokeWidth="0.8" />
      ))}
      <text x={x0 - 34} y={(base + top(4.25)) / 2 + 4} fontSize="12" style={font}>4,25</text>
      <text x={x0 + 3 * step + 8} y={(base + top(2)) / 2 + 4} fontSize="12" style={font}>2</text>
      {['A', 'C', 'D', 'B'].map((l, i) => (
        <text key={l} x={x0 + i * step - 4} y={base + 17} fontSize="13" fontStyle="italic" style={font}>{l}</text>
      ))}
    </svg>
  );
};
