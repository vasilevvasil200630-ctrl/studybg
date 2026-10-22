import React from 'react';

/**
 * Чертежите към „Ъгли, свързани с окръжността“ от листа с формули на МОН (X клас):
 * същите означения като в официалния лист, за да се четат формулите до тях.
 */

const INK = '#334155';
const ACCENT = '#1a6fb8';
const font = { fontFamily: 'inherit', fill: INK } as const;

type Pt = [number, number];

const onCircle = (O: Pt, r: number, deg: number): Pt => [O[0] + r * Math.cos((deg * Math.PI) / 180), O[1] - r * Math.sin((deg * Math.PI) / 180)];

/** Двете пресечни точки на лъча от M в посока deg с окръжността — първо по-близката */
const secant = (M: Pt, deg: number, O: Pt, r: number): [Pt, Pt] => {
  const d: Pt = [Math.cos((deg * Math.PI) / 180), -Math.sin((deg * Math.PI) / 180)];
  const f: Pt = [M[0] - O[0], M[1] - O[1]];
  const b = f[0] * d[0] + f[1] * d[1];
  const c = f[0] * f[0] + f[1] * f[1] - r * r;
  const s = Math.sqrt(b * b - c);
  const t1 = -b - s;
  const t2 = -b + s;
  return [
    [M[0] + t1 * d[0], M[1] + t1 * d[1]],
    [M[0] + t2 * d[0], M[1] + t2 * d[1]],
  ];
};

const arc = (V: Pt, P: Pt, Q: Pt, r: number) => {
  const a1 = Math.atan2(P[1] - V[1], P[0] - V[0]);
  const a2 = Math.atan2(Q[1] - V[1], Q[0] - V[0]);
  let d = a2 - a1;
  while (d < -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  const p1 = [V[0] + r * Math.cos(a1), V[1] + r * Math.sin(a1)];
  const p2 = [V[0] + r * Math.cos(a2), V[1] + r * Math.sin(a2)];
  return `M${p1[0]},${p1[1]} A${r},${r} 0 0 ${d > 0 ? 1 : 0} ${p2[0]},${p2[1]}`;
};

const Dot: React.FC<{ p: Pt }> = ({ p }) => <circle cx={p[0]} cy={p[1]} r="2.2" fill={INK} />;
const Label: React.FC<{ p: Pt; dx?: number; dy?: number; children: React.ReactNode }> = ({ p, dx = 0, dy = 0, children }) => (
  <text x={p[0] + dx} y={p[1] + dy} fontSize="12" fontStyle="italic" style={font}>{children}</text>
);

const box = 'h-auto w-full max-w-[180px]';

/** Централен ∠BOC, вписан ∠BAC и периферен ∠BCM (CM — допирателна) */
export const FormulaCircleAngles: React.FC = () => {
  const O: Pt = [78, 88];
  const r = 56;
  const C = onCircle(O, r, 95);
  const A = onCircle(O, r, 218);
  const B = onCircle(O, r, -38);
  // допирателната в C е перпендикулярна на OC (OC сочи под 95°, значи допирателната — под 5°)
  const M: Pt = [C[0] + 70 * Math.cos((5 * Math.PI) / 180), C[1] + 70 * Math.sin((5 * Math.PI) / 180)];
  return (
    <svg viewBox="0 0 170 160" className={box} role="img" aria-label="Окръжност k с център O; вписан ъгъл BAC, централен ъгъл BOC и ъгъл BCM между хордата CB и допирателната CM.">
      <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={INK} strokeWidth="1.3" />
      <line x1={C[0]} y1={C[1]} x2={M[0]} y2={M[1]} stroke={INK} strokeWidth="1.2" />
      <polygon points={`${A} ${B} ${C}`} fill="none" stroke={INK} strokeWidth="1.2" />
      <polyline points={`${C} ${O} ${B}`} fill="none" stroke={INK} strokeWidth="1.2" />
      <path d={arc(A, B, C, 14)} fill="none" stroke={ACCENT} strokeWidth="1.3" />
      <path d={arc(O, C, B, 12)} fill="none" stroke={ACCENT} strokeWidth="1.3" />
      <path d={arc(C, B, M, 12)} fill="none" stroke={ACCENT} strokeWidth="1.3" />
      {[A, B, C, O, M].map((p, i) => <Dot key={i} p={p} />)}
      <Label p={C} dx={-4} dy={-7}>C</Label>
      <Label p={M} dx={-4} dy={-7}>M</Label>
      <Label p={A} dx={-12} dy={10}>A</Label>
      <Label p={B} dx={4} dy={12}>B</Label>
      <Label p={O} dx={-14} dy={4}>O</Label>
      <Label p={onCircle(O, r, 160)} dx={-12} dy={0}>k</Label>
    </svg>
  );
};

/** Две хорди AC и BD, които се пресичат в M */
export const FormulaCircleChords: React.FC = () => {
  const O: Pt = [80, 80];
  const r = 58;
  const D = onCircle(O, r, 112);
  const C = onCircle(O, r, 62);
  const B = onCircle(O, r, -38);
  const A = onCircle(O, r, 238);
  const den = (A[0] - C[0]) * (B[1] - D[1]) - (A[1] - C[1]) * (B[0] - D[0]);
  const tt = ((A[0] - B[0]) * (B[1] - D[1]) - (A[1] - B[1]) * (B[0] - D[0])) / den;
  const M: Pt = [A[0] + tt * (C[0] - A[0]), A[1] + tt * (C[1] - A[1])];
  return (
    <svg viewBox="0 0 165 160" className={box} role="img" aria-label="Окръжност k с хорди AC и BD, които се пресичат в точка M; отбелязан е ъгъл AMB.">
      <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={INK} strokeWidth="1.3" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={INK} strokeWidth="1.2" />
      <line x1={B[0]} y1={B[1]} x2={D[0]} y2={D[1]} stroke={INK} strokeWidth="1.2" />
      <path d={arc(M, A, B, 12)} fill="none" stroke={ACCENT} strokeWidth="1.3" />
      {[A, B, C, D, M].map((p, i) => <Dot key={i} p={p} />)}
      <Label p={D} dx={-10} dy={-5}>D</Label>
      <Label p={C} dx={4} dy={-5}>C</Label>
      <Label p={B} dx={5} dy={10}>B</Label>
      <Label p={A} dx={-12} dy={10}>A</Label>
      <Label p={M} dx={-16} dy={-4}>M</Label>
      <Label p={onCircle(O, r, 10)} dx={6} dy={0}>k</Label>
    </svg>
  );
};

/** Две секущи MA и MB от външна точка M; D и C са по-близките пресечни точки */
export const FormulaCircleSecants: React.FC = () => {
  const O: Pt = [66, 80];
  const r = 52;
  const M: Pt = [160, 64];
  const [D, A] = secant(M, 162, O, r);
  const [C, B] = secant(M, 200, O, r);
  return (
    <svg viewBox="0 0 175 150" className={box} role="img" aria-label="Окръжност k и външна точка M; секущата MA пресича окръжността в D и A, а секущата MB — в C и B.">
      <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={INK} strokeWidth="1.3" />
      <line x1={M[0]} y1={M[1]} x2={A[0]} y2={A[1]} stroke={INK} strokeWidth="1.2" />
      <line x1={M[0]} y1={M[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth="1.2" />
      <path d={arc(M, A, B, 14)} fill="none" stroke={ACCENT} strokeWidth="1.3" />
      {[A, B, C, D, M].map((p, i) => <Dot key={i} p={p} />)}
      <Label p={A} dx={-6} dy={-6}>A</Label>
      <Label p={D} dx={-2} dy={-7}>D</Label>
      <Label p={C} dx={-1} dy={14}>C</Label>
      <Label p={B} dx={-10} dy={12}>B</Label>
      <Label p={M} dx={2} dy={-6}>M</Label>
      <Label p={onCircle(O, r, 175)} dx={-12} dy={0}>k</Label>
    </svg>
  );
};

/** Допирателна MA и секуща MB от външна точка M; C е по-близката пресечна точка */
export const FormulaCircleTangent: React.FC = () => {
  const O: Pt = [66, 84];
  const r = 52;
  const M: Pt = [160, 62];
  const dist = Math.hypot(M[0] - O[0], M[1] - O[1]);
  const base = Math.atan2(M[1] - O[1], M[0] - O[0]);
  const off = Math.acos(r / dist);
  const A: Pt = [O[0] + r * Math.cos(base - off), O[1] + r * Math.sin(base - off)];
  const [C, B] = secant(M, 196, O, r);
  const ra = 7;
  const u: Pt = [(O[0] - A[0]) / r, (O[1] - A[1]) / r];
  const v: Pt = [(M[0] - A[0]) / Math.hypot(M[0] - A[0], M[1] - A[1]), (M[1] - A[1]) / Math.hypot(M[0] - A[0], M[1] - A[1])];
  const tail: Pt = [A[0] - v[0] * 30, A[1] - v[1] * 30];
  return (
    <svg viewBox="0 0 175 150" className={box} role="img" aria-label="Окръжност k и външна точка M; MA е допирателна, а секущата MB пресича окръжността в C и B. Радиусът към A е перпендикулярен на допирателната.">
      <circle cx={O[0]} cy={O[1]} r={r} fill="none" stroke={INK} strokeWidth="1.3" />
      <line x1={tail[0]} y1={tail[1]} x2={M[0]} y2={M[1]} stroke={INK} strokeWidth="1.2" />
      <line x1={M[0]} y1={M[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth="1.2" />
      <line x1={A[0]} y1={A[1]} x2={O[0]} y2={O[1]} stroke={INK} strokeDasharray="4 3" />
      <path d={`M${A[0] + u[0] * ra},${A[1] + u[1] * ra} L${A[0] + (u[0] + v[0]) * ra},${A[1] + (u[1] + v[1]) * ra} L${A[0] + v[0] * ra},${A[1] + v[1] * ra}`} fill="none" stroke={INK} />
      <path d={arc(M, A, B, 14)} fill="none" stroke={ACCENT} strokeWidth="1.3" />
      {[A, B, C, M, O].map((p, i) => <Dot key={i} p={p} />)}
      <Label p={A} dx={-2} dy={-7}>A</Label>
      <Label p={C} dx={-2} dy={14}>C</Label>
      <Label p={B} dx={-10} dy={12}>B</Label>
      <Label p={M} dx={2} dy={-6}>M</Label>
      <Label p={onCircle(O, r, 175)} dx={-12} dy={0}>k</Label>
    </svg>
  );
};
