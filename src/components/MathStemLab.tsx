import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Compass,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  RotateCcw,
  BookOpen,
  Award,
  TrendingUp,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import {
  MATH_CATEGORIES,
  MATH_STEP_BY_STEP_PROBLEMS,
  MATH_QUIZ_QUESTIONS,
  type MathCategory,
  type MathStepByStepProblem,
} from '../data/mathStemDatabase';

interface MathStemLabProps {
  onOpenFormulaModal?: () => void;
}

type LabMode = 'step-by-step' | 'live-solvers' | 'quiz';

export const MathStemLab: React.FC<MathStemLabProps> = ({ onOpenFormulaModal }) => {
  const [activeMode, setActiveMode] = useState<LabMode>('step-by-step');
  const [selectedCategory, setSelectedCategory] = useState<MathCategory | 'all'>('all');

  // Step-by-step problem state
  const [activeProblemId, setActiveProblemId] = useState<string>(MATH_STEP_BY_STEP_PROBLEMS[0].id);
  const [revealedStepsCount, setRevealedStepsCount] = useState<Record<string, number>>({});
  const [userAnswerInput, setUserAnswerInput] = useState<Record<string, string>>({});
  const [answerCheckStatus, setAnswerCheckStatus] = useState<Record<string, 'correct' | 'wrong' | null>>({});

  // Live Solver 1: Quadratic & Vieta (ax² + bx + c = 0)
  const [quadA, setQuadA] = useState<number>(2);
  const [quadB, setQuadB] = useState<number>(-6);
  const [quadC, setQuadC] = useState<number>(3);

  // Live Solver 2: Progressions
  const [progType, setProgType] = useState<'arithmetic' | 'geometric'>('arithmetic');
  const [progFirst, setProgFirst] = useState<number>(4);
  const [progStep, setProgStep] = useState<number>(3);
  const [progN, setProgN] = useState<number>(10);

  // Live Solver 3: Triangle (Heron, Cosine Law, R, r, Medians)
  const [triA, setTriA] = useState<number>(15);
  const [triB, setTriB] = useState<number>(13);
  const [triC, setTriC] = useState<number>(14);

  // Live Solver 4: Cubic Function Calculus (f(x) = ax³ + bx² + cx + d)
  const [cubA, setCubA] = useState<number>(1);
  const [cubB, setCubB] = useState<number>(-3);
  const [cubC, setCubC] = useState<number>(-9);
  const [cubD, setCubD] = useState<number>(12);
  const [cubX0, setCubX0] = useState<number>(2);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const filteredProblems = useMemo(() => {
    if (selectedCategory === 'all') return MATH_STEP_BY_STEP_PROBLEMS;
    return MATH_STEP_BY_STEP_PROBLEMS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const currentProblem: MathStepByStepProblem = useMemo(() => {
    const found = filteredProblems.find((p) => p.id === activeProblemId);
    return found || filteredProblems[0] || MATH_STEP_BY_STEP_PROBLEMS[0];
  }, [filteredProblems, activeProblemId]);

  const currentRevealedCount = revealedStepsCount[currentProblem.id] ?? 0;

  const handleRevealNextStep = (prob: MathStepByStepProblem) => {
    const current = revealedStepsCount[prob.id] ?? 0;
    if (current < prob.steps.length) {
      setRevealedStepsCount((prev) => ({ ...prev, [prob.id]: current + 1 }));
    }
  };

  const handleRevealAllSteps = (prob: MathStepByStepProblem) => {
    setRevealedStepsCount((prev) => ({ ...prev, [prob.id]: prob.steps.length }));
  };

  const handleResetSteps = (prob: MathStepByStepProblem) => {
    setRevealedStepsCount((prev) => ({ ...prev, [prob.id]: 0 }));
    setAnswerCheckStatus((prev) => ({ ...prev, [prob.id]: null }));
  };

  const handleCheckNumericAnswer = (prob: MathStepByStepProblem) => {
    const raw = (userAnswerInput[prob.id] || '').trim().replace(',', '.');
    const target = prob.numericCheckValue.trim().replace(',', '.');
    if (!raw) return;

    const isMatch =
      raw === target ||
      raw.replace(/\s+/g, '') === target.replace(/\s+/g, '') ||
      (prob.numericCheckValue === '0.5' && (raw === '1/2' || raw === '50%'));

    setAnswerCheckStatus((prev) => ({
      ...prev,
      [prob.id]: isMatch ? 'correct' : 'wrong',
    }));
  };

  // Live Quadratic & Vieta Calculations
  const quadResults = useMemo(() => {
    if (quadA === 0) {
      return { valid: false, message: 'Коефициентът пред x² трябва да е различен от 0 (a ≠ 0).' };
    }
    const D = quadB * quadB - 4 * quadA * quadC;
    const sumRoots = -quadB / quadA;
    const prodRoots = quadC / quadA;
    const sumSquares = sumRoots * sumRoots - 2 * prodRoots;
    const sumReciprocals = prodRoots !== 0 ? sumRoots / prodRoots : null;
    const vertexX = -quadB / (2 * quadA);
    const vertexY = -D / (4 * quadA);

    let rootsText = 'Няма реални корени (D < 0)';
    let x1: number | null = null;
    let x2: number | null = null;
    if (D > 0) {
      x1 = (-quadB + Math.sqrt(D)) / (2 * quadA);
      x2 = (-quadB - Math.sqrt(D)) / (2 * quadA);
      rootsText = `x₁ = ${Number(x1.toFixed(3))} , x₂ = ${Number(x2.toFixed(3))}`;
    } else if (D === 0) {
      x1 = -quadB / (2 * quadA);
      rootsText = `Двоен корен x₁ = x₂ = ${Number(x1.toFixed(3))}`;
    }

    return {
      valid: true,
      D: Number(D.toFixed(3)),
      rootsText,
      sumRoots: Number(sumRoots.toFixed(3)),
      prodRoots: Number(prodRoots.toFixed(3)),
      sumSquares: Number(sumSquares.toFixed(3)),
      sumReciprocals: sumReciprocals !== null ? Number(sumReciprocals.toFixed(3)) : 'Не е дефиниран (c = 0)',
      vertexX: Number(vertexX.toFixed(3)),
      vertexY: Number(vertexY.toFixed(3)),
    };
  }, [quadA, quadB, quadC]);

  // Live Progression Calculations
  const progResults = useMemo(() => {
    const n = Math.max(1, Math.min(30, Math.round(progN)));
    if (progType === 'arithmetic') {
      const an = progFirst + (n - 1) * progStep;
      const sn = ((2 * progFirst + (n - 1) * progStep) / 2) * n;
      const firstTerms = Array.from({ length: Math.min(6, n) }, (_, i) =>
        Number((progFirst + i * progStep).toFixed(2))
      );
      return {
        an: Number(an.toFixed(3)),
        sn: Number(sn.toFixed(3)),
        firstTerms,
        formulaAn: `a_${n} = ${progFirst} + (${n} - 1)·(${progStep}) = ${Number(an.toFixed(3))}`,
        formulaSn: `S_${n} = ((2·${progFirst} + ${n - 1}·${progStep}) / 2) · ${n} = ${Number(sn.toFixed(3))}`,
      };
    } else {
      const bn = progFirst * Math.pow(progStep, n - 1);
      const sn =
        progStep === 1
          ? progFirst * n
          : (progFirst * (Math.pow(progStep, n) - 1)) / (progStep - 1);
      const firstTerms = Array.from({ length: Math.min(6, n) }, (_, i) =>
        Number((progFirst * Math.pow(progStep, i)).toFixed(2))
      );
      return {
        an: Number(bn.toFixed(3)),
        sn: Number(sn.toFixed(3)),
        firstTerms,
        formulaAn: `b_${n} = ${progFirst} · (${progStep})^${n - 1} = ${Number(bn.toFixed(3))}`,
        formulaSn:
          progStep === 1
            ? `S_${n} = ${progFirst} · ${n} = ${Number(sn.toFixed(3))}`
            : `S_${n} = ${progFirst} · (${progStep}^${n} - 1) / (${progStep} - 1) = ${Number(sn.toFixed(3))}`,
      };
    }
  }, [progType, progFirst, progStep, progN]);

  // Live Triangle Calculations
  const triResults = useMemo(() => {
    const a = triA;
    const b = triB;
    const c = triC;
    if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a) {
      return {
        valid: false,
        message:
          'Неравенството на триъгълника не е изпълнено! Сборът на всеки две страни трябва да е по-голям от третата страна (a + b > c).',
      };
    }
    const P = a + b + c;
    const p = P / 2;
    const S = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    const r = S / p;
    const R = (a * b * c) / (4 * S);
    const cosAlpha = (b * b + c * c - a * a) / (2 * b * c);
    const cosBeta = (a * a + c * c - b * b) / (2 * a * c);
    const cosGamma = (a * a + b * b - c * c) / (2 * a * b);
    const mc = 0.5 * Math.sqrt(2 * a * a + 2 * b * b - c * c);

    return {
      valid: true,
      P: Number(P.toFixed(2)),
      p: Number(p.toFixed(2)),
      S: Number(S.toFixed(3)),
      r: Number(r.toFixed(3)),
      R: Number(R.toFixed(3)),
      cosAlpha: Number(cosAlpha.toFixed(3)),
      cosBeta: Number(cosBeta.toFixed(3)),
      cosGamma: Number(cosGamma.toFixed(3)),
      mc: Number(mc.toFixed(3)),
    };
  }, [triA, triB, triC]);

  // Live Cubic Calculus Solver (f(x) = ax³ + bx² + cx + d)
  const cubicResults = useMemo(() => {
    if (cubA === 0) {
      return {
        valid: false,
        message: 'Коефициентът a пред x³ трябва да е различен от 0 за кубична функция (a ≠ 0).',
      };
    }
    const evalF = (x: number) => cubA * x * x * x + cubB * x * x + cubC * x + cubD;
    const evalFp = (x: number) => 3 * cubA * x * x + 2 * cubB * x + cubC;

    // f'(x) = 3a x² + 2b x + c = 0
    const A = 3 * cubA;
    const B = 2 * cubB;
    const C = cubC;
    const D = B * B - 4 * A * C;

    // Inflection point: f''(x) = 6ax + 2b = 0 => x_infl = -b / (3a)
    const xInfl = -cubB / (3 * cubA);
    const yInfl = evalF(xInfl);

    // Tangent at x0: y = f(x0) + f'(x0)(x - x0) = k*x + m
    const y0 = evalF(cubX0);
    const k = evalFp(cubX0);
    const m = y0 - k * cubX0;
    const tangentEq = `y = ${Number(k.toFixed(2))}·x ${m >= 0 ? '+ ' + Number(m.toFixed(2)) : '- ' + Math.abs(Number(m.toFixed(2)))}`;

    let extremaStatus = 'Функцията е строго монотонна (няма локални екстремуми, D ≤ 0)';
    let xMaxText = 'Няма';
    let xMinText = 'Няма';

    if (D > 0) {
      const r1 = (-B - Math.sqrt(D)) / (2 * A);
      const r2 = (-B + Math.sqrt(D)) / (2 * A);
      // Check second derivative f''(x) = 6ax + 2b
      const fpp1 = 6 * cubA * r1 + 2 * cubB;
      const xMax = fpp1 < 0 ? r1 : r2;
      const xMin = fpp1 < 0 ? r2 : r1;
      const yMax = evalF(xMax);
      const yMin = evalF(xMin);
      extremaStatus = 'Два локални екстремума (D > 0)';
      xMaxText = `x = ${Number(xMax.toFixed(2))} ⇒ y_max = ${Number(yMax.toFixed(2))}`;
      xMinText = `x = ${Number(xMin.toFixed(2))} ⇒ y_min = ${Number(yMin.toFixed(2))}`;
    }

    return {
      valid: true,
      derivativeFormula: `f'(x) = ${3 * cubA}x²${2 * cubB === 0 ? '' : 2 * cubB > 0 ? ' + ' + 2 * cubB + 'x' : ' - ' + Math.abs(2 * cubB) + 'x'}${cubC === 0 ? '' : cubC > 0 ? ' + ' + cubC : ' - ' + Math.abs(cubC)}`,
      extremaStatus,
      xMaxText,
      xMinText,
      inflectionText: `I(${Number(xInfl.toFixed(2))}; ${Number(yInfl.toFixed(2))})`,
      slopeAtX0: Number(k.toFixed(3)),
      tangentEq,
    };
  }, [cubA, cubB, cubC, cubD, cubX0]);

  // Filtered Quiz Questions
  const filteredQuiz = useMemo(() => {
    if (selectedCategory === 'all') return MATH_QUIZ_QUESTIONS;
    return MATH_QUIZ_QUESTIONS.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const quizStats = useMemo(() => {
    const answeredIds = Object.keys(quizAnswers);
    const correctCount = answeredIds.filter((id) => {
      const q = MATH_QUIZ_QUESTIONS.find((item) => item.id === id);
      return q && quizAnswers[id] === q.correctIndex;
    }).length;
    return {
      totalAnswered: answeredIds.length,
      correctCount,
    };
  }, [quizAnswers]);

  // Render clean SVG Schematic for current problem
  const renderGeometricSchematic = (type: MathStepByStepProblem['diagramType']) => {
    switch (type) {
      case 'triangle-cosine':
        return (
          <svg viewBox="0 0 280 175" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-700 p-2">
            {/* Circumscribed Circle */}
            <circle cx="140" cy="95" r="68" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Triangle ABC */}
            <polygon
              points="75,135 205,135 130,35"
              fill="rgba(59, 130, 246, 0.15)"
              stroke="#60a5fa"
              strokeWidth="2.5"
            />
            {/* Inscribed Circle */}
            <circle cx="137" cy="102" r="28" fill="rgba(16, 185, 129, 0.12)" stroke="#34d399" strokeWidth="1.8" />
            <circle cx="137" cy="102" r="2.5" fill="#34d399" />
            {/* Labels */}
            <text x="60" y="145" fill="#f8fafc" fontSize="12" fontWeight="bold">A</text>
            <text x="212" y="145" fill="#f8fafc" fontSize="12" fontWeight="bold">B (β)</text>
            <text x="125" y="26" fill="#f8fafc" fontSize="12" fontWeight="bold">C</text>
            <text x="132" y="152" fill="#93c5fd" fontSize="11" fontWeight="bold">c = 14 cm</text>
            <text x="72" y="82" fill="#93c5fd" fontSize="11" fontWeight="bold">b = 13</text>
            <text x="174" y="82" fill="#93c5fd" fontSize="11" fontWeight="bold">a = 15</text>
            <text x="131" y="100" fill="#6ee7b7" fontSize="10" fontWeight="bold">r=4</text>
          </svg>
        );
      case 'pyramid-3d':
        return (
          <svg viewBox="0 0 280 175" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-700 p-2">
            {/* Base ABCD */}
            <polygon
              points="55,140 165,140 220,105 110,105"
              fill="rgba(99, 102, 241, 0.12)"
              stroke="#60a5fa"
              strokeWidth="2"
            />
            {/* Hidden edges */}
            <line x1="138" y1="25" x2="110" y2="105" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Height MO */}
            <line x1="138" y1="25" x2="138" y2="122" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
            {/* Radius OK */}
            <line x1="138" y1="122" x2="192" y2="122" stroke="#34d399" strokeWidth="2" />
            {/* Apothem MK */}
            <line x1="138" y1="25" x2="192" y2="122" stroke="#fbbf24" strokeWidth="2.5" />
            {/* Visible lateral edges */}
            <line x1="138" y1="25" x2="55" y2="140" stroke="#60a5fa" strokeWidth="2" />
            <line x1="138" y1="25" x2="165" y2="140" stroke="#60a5fa" strokeWidth="2" />
            <line x1="138" y1="25" x2="220" y2="105" stroke="#60a5fa" strokeWidth="2" />
            {/* Labels */}
            <text x="133" y="18" fill="#f8fafc" fontSize="12" fontWeight="bold">M</text>
            <text x="125" y="132" fill="#fda4af" fontSize="10" fontWeight="bold">O</text>
            <text x="198" y="126" fill="#fde68a" fontSize="10" fontWeight="bold">K</text>
            <text x="115" y="82" fill="#fda4af" fontSize="11" fontWeight="bold">H=8</text>
            <text x="155" y="118" fill="#6ee7b7" fontSize="10" fontWeight="bold">r=6</text>
            <text x="172" y="72" fill="#fbbf24" fontSize="11" fontWeight="bold">k=10</text>
            <text x="95" y="155" fill="#c7d2fe" fontSize="11" fontWeight="bold">a = 12 cm</text>
          </svg>
        );
      case 'cubic-extrema':
        return (
          <svg viewBox="0 0 280 175" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-700 p-2">
            {/* Axes */}
            <line x1="20" y1="95" x2="260" y2="95" stroke="#64748b" strokeWidth="1.5" />
            <line x1="115" y1="15" x2="115" y2="165" stroke="#64748b" strokeWidth="1.5" />
            {/* Cubic curve */}
            <path
              d="M 40 155 C 75 10, 110 10, 145 90 C 180 170, 215 170, 245 20"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            {/* Local Max & Min tangent lines */}
            <line x1="65" y1="35" x2="115" y2="35" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="170" y1="145" x2="220" y2="145" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Points */}
            <circle cx="90" cy="35" r="4.5" fill="#34d399" />
            <circle cx="145" cy="90" r="4" fill="#fbbf24" />
            <circle cx="195" cy="145" r="4.5" fill="#f43f5e" />
            <text x="48" y="27" fill="#6ee7b7" fontSize="10" fontWeight="bold">y_max (f&apos;=0)</text>
            <text x="152" y="86" fill="#fde68a" fontSize="10" fontWeight="bold">I (f&apos;&apos;=0)</text>
            <text x="162" y="162" fill="#fda4af" fontSize="10" fontWeight="bold">y_min (f&apos;=0)</text>
          </svg>
        );
      case 'cylinder-cone':
        return (
          <svg viewBox="0 0 280 175" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-700 p-2">
            {/* Cylinder top & bottom ellipses */}
            <ellipse cx="140" cy="35" rx="65" ry="15" fill="rgba(59, 130, 246, 0.12)" stroke="#60a5fa" strokeWidth="1.8" />
            <ellipse cx="140" cy="140" rx="65" ry="15" fill="rgba(59, 130, 246, 0.2)" stroke="#60a5fa" strokeWidth="2" />
            <line x1="75" y1="35" x2="75" y2="140" stroke="#60a5fa" strokeWidth="2" />
            <line x1="205" y1="35" x2="205" y2="140" stroke="#60a5fa" strokeWidth="2" />
            {/* Inscribed Cone */}
            <polygon points="140,35 75,140 205,140" fill="rgba(245, 158, 11, 0.16)" stroke="#fbbf24" strokeWidth="2" />
            {/* Height & Radius */}
            <line x1="140" y1="35" x2="140" y2="140" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="140" y1="140" x2="205" y2="140" stroke="#34d399" strokeWidth="2.5" />
            <text x="112" y="95" fill="#fda4af" fontSize="11" fontWeight="bold">H=8</text>
            <text x="162" y="135" fill="#6ee7b7" fontSize="11" fontWeight="bold">r=6</text>
            <text x="176" y="88" fill="#fde68a" fontSize="11" fontWeight="bold">l=10</text>
          </svg>
        );
      case 'parabola-roots':
        return (
          <svg viewBox="0 0 280 175" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-700 p-2">
            {/* Axes */}
            <line x1="25" y1="125" x2="255" y2="125" stroke="#64748b" strokeWidth="1.5" />
            <line x1="70" y1="20" x2="70" y2="160" stroke="#64748b" strokeWidth="1.5" />
            {/* Parabola */}
            <path
              d="M 65 30 Q 145 195 225 30"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            {/* Roots */}
            <circle cx="106" cy="125" r="4.5" fill="#34d399" />
            <circle cx="184" cy="125" r="4.5" fill="#34d399" />
            {/* Vertex */}
            <circle cx="145" cy="152" r="3.5" fill="#fbbf24" />
            <text x="95" y="142" fill="#6ee7b7" fontSize="11" fontWeight="bold">x₁</text>
            <text x="178" y="142" fill="#6ee7b7" fontSize="11" fontWeight="bold">x₂</text>
            <text x="122" y="167" fill="#fde68a" fontSize="10" fontWeight="bold">V(-b/2a; -D/4a)</text>
            <text x="130" y="45" fill="#bae6fd" fontSize="11" fontWeight="bold">x₁ + x₂ = -b/a</text>
            <text x="130" y="62" fill="#bae6fd" fontSize="11" fontWeight="bold">x₁ · x₂ = c/a</text>
          </svg>
        );
      case 'progression-growth':
        return (
          <svg viewBox="0 0 280 175" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-700 p-2">
            <rect x="40" y="115" width="36" height="35" rx="4" fill="#3b82f6" />
            <rect x="115" y="80" width="36" height="70" rx="4" fill="#3b82f6" />
            <rect x="190" y="35" width="36" height="115" rx="4" fill="#64748b" />
            <line x1="25" y1="150" x2="255" y2="150" stroke="#64748b" strokeWidth="1.5" />
            <text x="42" y="108" fill="#93c5fd" fontSize="11" fontWeight="bold">a₁=5-d</text>
            <text x="118" y="72" fill="#c7d2fe" fontSize="11" fontWeight="bold">a₂ = 5</text>
            <text x="188" y="27" fill="#e2e8f0" fontSize="11" fontWeight="bold">a₃=5+d</text>
            <text x="65" y="166" fill="#6ee7b7" fontSize="10" fontWeight="bold">÷ АП (a₁+a₃ = 2a₂) → ÷÷ ГП (b₂² = b₁·b₃)</text>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 280 175" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-700 p-2">
            <circle cx="85" cy="65" r="28" fill="rgba(59, 130, 246, 0.2)" stroke="#60a5fa" strokeWidth="2" />
            <circle cx="195" cy="65" r="28" fill="rgba(236, 72, 153, 0.2)" stroke="#f472b6" strokeWidth="2" />
            <rect x="65" y="118" width="150" height="36" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="#34d399" strokeWidth="1.8" />
            <text x="63" y="69" fill="#bfdbfe" fontSize="11" fontWeight="bold">6 момчета</text>
            <text x="171" y="69" fill="#fbcfe8" fontSize="11" fontWeight="bold">4 момичета</text>
            <text x="82" y="140" fill="#a7f3d0" fontSize="11" fontWeight="bold">P(A) = (C₆² · C₄¹) / C₁₀³</text>
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-950 via-blue-950 to-slate-900 text-white p-6 sm:p-7 border border-blue-800/50 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-cyan-300" />
              <span>Интерактивна STEM & Математическа Лаборатория • НВО 10. клас & ДЗИ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Пошагов Решавач, Чертежи & Живи Калкулатори
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Овладей задачите с пълно описание за максимален брой точки на НВО 10. клас (Задачи 16 и 17) и ДЗИ (Задачи 26–28) — с интерактивни чертежи, формули на Виет, прогресии, планиметрия и стереометрия.
            </p>
          </div>

          {/* Quick Action & Mode Stats */}
          <div className="flex flex-wrap items-center gap-3">
            {onOpenFormulaModal && (
              <button
                onClick={onOpenFormulaModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Отвори МОН Формули</span>
              </button>
            )}
            <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs">
              <div className="text-slate-300">Решени в тренажора</div>
              <div className="text-base font-bold text-emerald-300">
                {quizStats.correctCount} / {MATH_QUIZ_QUESTIONS.length} верни
              </div>
            </div>
          </div>
        </div>

        {/* 3 Main Mode Tabs */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveMode('step-by-step')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'step-by-step'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>1. Пошагови задачи с чертежи (Зад. 16–17 / 26–28)</span>
          </button>

          <button
            onClick={() => setActiveMode('live-solvers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'live-solvers'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>2. Живи Решавачи (Виет, Прогресии & Триъгълник)</span>
          </button>

          <button
            onClick={() => setActiveMode('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'quiz'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Sparkles className="w-4 h-4 text-slate-600" />
            <span>3. Изпитен Тренажор ({MATH_QUIZ_QUESTIONS.length} задачи)</span>
          </button>
        </div>
      </div>

      {/* Category Filter Strip (Used in Mode 1 and Mode 3) */}
      {activeMode !== 'live-solvers' && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Всички раздели ({MATH_CATEGORIES.length})
          </button>
          {MATH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                const firstInCat = MATH_STEP_BY_STEP_PROBLEMS.find((p) => p.category === cat.id);
                if (firstInCat) setActiveProblemId(firstInCat.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{cat.shortLabel}</span>
              <span className="ml-1.5 opacity-75 text-[10px]">({cat.examShare})</span>
            </button>
          ))}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 1: STEP-BY-STEP PROBLEMS WITH GEOMETRIC SCHEMATICS               */}
      {/* ===================================================================== */}
      {activeMode === 'step-by-step' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Problem Selector List */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Избери матурна задача за пълно решение ({filteredProblems.length})
            </div>
            {filteredProblems.map((prob, idx) => {
              const isSelected = prob.id === currentProblem.id;
              const stepsDone = revealedStepsCount[prob.id] ?? 0;
              const isCompleted = stepsDone === prob.steps.length;
              return (
                <button
                  key={prob.id}
                  onClick={() => setActiveProblemId(prob.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-600 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                      Задача #{idx + 1} • {prob.points}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Разгледана
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-sm text-slate-900 leading-snug mb-1">
                    {prob.title}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center justify-between">
                    <span>{prob.examBadge}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Problem Interactive Workspace */}
          <div className="lg:col-span-8 space-y-5">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-5">
              {/* Header badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold">
                    {currentProblem.examBadge}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                    Оценяване: {currentProblem.points}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Сложност: {currentProblem.difficulty}
                </span>
              </div>

              {/* Title & Statement */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  {currentProblem.title}
                </h3>
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm sm:text-base font-medium leading-relaxed shadow-2xs">
                  {currentProblem.statement}
                </div>
              </div>

              {/* Visual Diagram + Given/Find Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-5">
                  {renderGeometricSchematic(currentProblem.diagramType)}
                </div>
                <div className="md:col-span-7 space-y-3">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <div className="text-xs font-bold uppercase text-blue-700 mb-1">
                      Дадено по условие:
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                      {currentProblem.given.map((g, i) => (
                        <li key={i} className="font-medium">{g}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
                    <div className="text-xs font-bold uppercase text-blue-800 mb-1">
                      Търси се:
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-blue-950">
                      {currentProblem.find}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Formulas Required */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Необходими формули от справочника на МОН:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProblem.keyFormulas.map((f, i) => (
                    <code
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      {f}
                    </code>
                  ))}
                </div>
              </div>

              {/* Interactive Self-Check Input Before Revealing Steps */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-800">
                    Реши ли задачата сам? Провери крайния си отговор:
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Подсказка за формат: {currentProblem.numericHint}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userAnswerInput[currentProblem.id] || ''}
                    onChange={(e) =>
                      setUserAnswerInput((prev) => ({
                        ...prev,
                        [currentProblem.id]: e.target.value,
                      }))
                    }
                    placeholder={currentProblem.numericHint}
                    className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 w-40 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    onClick={() => handleCheckNumericAnswer(currentProblem)}
                    className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Провери
                  </button>
                </div>
              </div>

              {answerCheckStatus[currentProblem.id] === 'correct' && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Браво! Отговорът ти съвпада с еталонното решение на МОН ({currentProblem.finalAnswer}).</span>
                </div>
              )}

              {answerCheckStatus[currentProblem.id] === 'wrong' && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Отговорът не е точен. Разкрий стъпките по-долу една по една, за да видиш къде е уловката!</span>
                </div>
              )}

              {/* Step-by-Step Progressive Controls */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-bold text-slate-900">
                    Пошагово решение по критериите на МОН ({currentRevealedCount} / {currentProblem.steps.length} стъпки)
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {currentRevealedCount < currentProblem.steps.length && (
                      <button
                        onClick={() => handleRevealNextStep(currentProblem)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Разкрий Стъпка {currentRevealedCount + 1}</span>
                      </button>
                    )}
                    {currentRevealedCount < currentProblem.steps.length && (
                      <button
                        onClick={() => handleRevealAllSteps(currentProblem)}
                        className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-all cursor-pointer"
                      >
                        Покажи цялото решение
                      </button>
                    )}
                    {currentRevealedCount > 0 && (
                      <button
                        onClick={() => handleResetSteps(currentProblem)}
                        className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-medium cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Скрий</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Steps List */}
                <div className="space-y-3">
                  {currentProblem.steps.map((step, idx) => {
                    const isRevealed = idx < currentRevealedCount;
                    return (
                      <div
                        key={step.stepNumber}
                        className={`rounded-xl border p-4 transition-all ${
                          isRevealed
                            ? 'bg-white border-blue-200 shadow-2xs'
                            : 'bg-slate-100/80 border-slate-200/80 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                              {step.stepNumber}
                            </span>
                            <span className="font-bold text-sm text-slate-900">
                              {step.title}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                            +{step.pointsAwarded}
                          </span>
                        </div>

                        {isRevealed ? (
                          <div className="space-y-2 pt-1">
                            <div className="text-xs font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-blue-800 font-semibold">
                              Приложена формула: {step.formulaUsed}
                            </div>
                            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-800 leading-relaxed bg-blue-50/40 p-3 rounded-lg border border-blue-100">
                              {step.calculation}
                            </pre>
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500 italic">
                            Натисни „Разкрий Стъпка {step.stepNumber}“, за да видиш преобразуванията и точкуването...
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Final Official Answer & Common Mistake Trap */}
                {currentRevealedCount === currentProblem.steps.length && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1">
                    <div className="text-xs font-bold uppercase text-emerald-800">
                      Окончателен отговор за пълни точки ({currentProblem.points}):
                    </div>
                    <div className="text-base font-bold text-emerald-950">
                      {currentProblem.finalAnswer}
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-rose-950 leading-relaxed">
                    <span className="font-bold uppercase tracking-wide block text-rose-800 mb-0.5">
                      Капан за точки на матурата / НВО:
                    </span>
                    {currentProblem.commonMistakeTrap}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 2: LIVE INTERACTIVE MATHEMATICAL SOLVERS                         */}
      {/* ===================================================================== */}
      {activeMode === 'live-solvers' && (
        <div className="space-y-6">
          {/* Solver 1: Quadratic Equation & Vieta's Formulas */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Интерактивен Решавач #1 • Алгебра
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Квадратно уравнение (ax² + bx + c = 0) & Симетрични изрази на Виет
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setQuadA(2); setQuadB(-6); setQuadC(3); }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-700 cursor-pointer"
                >
                  2x² - 6x + 3 = 0
                </button>
                <button
                  onClick={() => { setQuadA(1); setQuadB(-7); setQuadC(10); }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-700 cursor-pointer"
                >
                  x² - 7x + 10 = 0
                </button>
                <button
                  onClick={() => { setQuadA(1); setQuadB(-10); setQuadC(9); }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-700 cursor-pointer"
                >
                  x² - 10x + 9 = 0
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Коефициент a (пред x²):
                </label>
                <input
                  type="number"
                  value={quadA}
                  onChange={(e) => setQuadA(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Коефициент b (пред x):
                </label>
                <input
                  type="number"
                  value={quadB}
                  onChange={(e) => setQuadB(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Свободен член c:
                </label>
                <input
                  type="number"
                  value={quadC}
                  onChange={(e) => setQuadC(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
            </div>

            {!quadResults.valid ? (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                {quadResults.message}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Дискриминанта D</div>
                  <div className="text-base font-bold text-slate-900">D = {quadResults.D}</div>
                  <div className="text-[10px] text-slate-500">b² - 4ac</div>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="text-[11px] font-semibold text-blue-700">Сбор (Виет)</div>
                  <div className="text-base font-bold text-blue-950">x₁ + x₂ = {quadResults.sumRoots}</div>
                  <div className="text-[10px] text-blue-600">-b / a</div>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="text-[11px] font-semibold text-blue-700">Произведение (Виет)</div>
                  <div className="text-base font-bold text-blue-950">x₁ · x₂ = {quadResults.prodRoots}</div>
                  <div className="text-[10px] text-blue-600">c / a</div>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-[11px] font-semibold text-emerald-700">Сбор от квадрати</div>
                  <div className="text-base font-bold text-emerald-950">x₁² + x₂² = {quadResults.sumSquares}</div>
                  <div className="text-[10px] text-emerald-600">(x₁+x₂)² - 2x₁x₂</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-700">Реципрочен сбор</div>
                  <div className="text-base font-bold text-slate-950">1/x₁ + 1/x₂ = {quadResults.sumReciprocals}</div>
                  <div className="text-[10px] text-slate-600">(x₁+x₂) / (x₁x₂)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-[11px] font-semibold text-amber-800">Връх на парабола</div>
                  <div className="text-sm font-bold text-amber-950">
                    V({quadResults.vertexX}; {quadResults.vertexY})
                  </div>
                  <div className="text-[10px] text-amber-700">Корени: {quadResults.rootsText}</div>
                </div>
              </div>
            )}
          </div>

          {/* Solver 2: Arithmetic & Geometric Progression Calculator */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Интерактивен Решавач #2 • Прогресии
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Аритметична (÷) и Геометрична (÷÷) Прогресия — Общ член и Сума Sₙ
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setProgType('arithmetic')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                    progType === 'arithmetic'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white border border-slate-300 text-slate-700'
                  }`}
                >
                  ÷ Аритметична (a₁, d)
                </button>
                <button
                  onClick={() => setProgType('geometric')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                    progType === 'geometric'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white border border-slate-300 text-slate-700'
                  }`}
                >
                  ÷÷ Геометрична (b₁, q)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Първи член ({progType === 'arithmetic' ? 'a₁' : 'b₁'}):
                </label>
                <input
                  type="number"
                  value={progFirst}
                  onChange={(e) => setProgFirst(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  {progType === 'arithmetic' ? 'Разлика d:' : 'Частно q:'}
                </label>
                <input
                  type="number"
                  value={progStep}
                  onChange={(e) => setProgStep(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Брой членове n (1–30):
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={progN}
                  onChange={(e) => setProgN(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="text-xs font-bold text-slate-500 mb-1">Общ член (n = {progN}):</div>
                <div className="text-lg font-bold text-slate-900">{progResults.formulaAn}</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-800 mb-1">Сума на първите n члена:</div>
                <div className="text-lg font-bold text-emerald-950">{progResults.formulaSn}</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="text-xs font-bold text-slate-500 mb-1">Първите членове на реда:</div>
                <div className="text-sm font-mono font-bold text-blue-900">
                  {progResults.firstTerms.join(' ; ')} ...
                </div>
              </div>
            </div>
          </div>

          {/* Solver 3: Triangle Planimetry Solver (Heron, Cosine Law, R, r, Medians) */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Интерактивен Решавач #3 • Планиметрия (НВО Задача 17 & ДЗИ Задача 28)
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Триъгълник по 3 страни (a, b, c) — Лице S, Косинуси, Радиуси R и r, Медиана
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setTriA(15); setTriB(13); setTriC(14); }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-700 cursor-pointer"
                >
                  Еталон (15, 13, 14)
                </button>
                <button
                  onClick={() => { setTriA(3); setTriB(4); setTriC(5); }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-700 cursor-pointer"
                >
                  Питагоров (3, 4, 5)
                </button>
                <button
                  onClick={() => { setTriA(5); setTriB(8); setTriC(7); }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-700 cursor-pointer"
                >
                  Ъгъл 60° (5, 8, 7)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">Страна a (BC):</label>
                <input
                  type="number"
                  min={1}
                  value={triA}
                  onChange={(e) => setTriA(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">Страна b (AC):</label>
                <input
                  type="number"
                  min={1}
                  value={triB}
                  onChange={(e) => setTriB(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">Страна c (AB):</label>
                <input
                  type="number"
                  min={1}
                  value={triC}
                  onChange={(e) => setTriC(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
            </div>

            {!triResults.valid ? (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                {triResults.message}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Полупериметър p</div>
                  <div className="text-base font-bold text-slate-900">p = {triResults.p} cm</div>
                  <div className="text-[10px] text-slate-500">P = {triResults.P} cm</div>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-[11px] font-semibold text-emerald-800">Лице S (Херон)</div>
                  <div className="text-base font-bold text-emerald-950">S = {triResults.S} cm²</div>
                  <div className="text-[10px] text-emerald-700">√(p(p-a)(p-b)(p-c))</div>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="text-[11px] font-semibold text-blue-800">Вписан радиус r</div>
                  <div className="text-base font-bold text-blue-950">r = {triResults.r} cm</div>
                  <div className="text-[10px] text-blue-700">r = S / p</div>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="text-[11px] font-semibold text-blue-800">Описан радиус R</div>
                  <div className="text-base font-bold text-blue-950">R = {triResults.R} cm</div>
                  <div className="text-[10px] text-blue-700">R = abc / (4S)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-800">Косинусова т-ма</div>
                  <div className="text-xs font-bold text-slate-950">
                    cos α={triResults.cosAlpha} | cos β={triResults.cosBeta}
                  </div>
                  <div className="text-[10px] text-slate-700">cos γ = {triResults.cosGamma}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-[11px] font-semibold text-amber-800">Медиана m_c</div>
                  <div className="text-base font-bold text-amber-950">m_c = {triResults.mc} cm</div>
                  <div className="text-[10px] text-amber-700">½√(2a²+2b²-c²)</div>
                </div>
              </div>
            )}
          </div>

          {/* Solver 4: Cubic Function Calculus (Derivative, Extrema, Inflection & Tangent Line) */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  Интерактивен Решавач #4 • Математически Анализ (11.–12. кл. Профил & ТУ)
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Кубична функция f(x) = ax³ + bx² + cx + d — Производна f&apos;(x), Екстремуми & Допирателна
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setCubA(1); setCubB(-3); setCubC(-9); setCubD(12); setCubX0(2); }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-rose-700 cursor-pointer"
                >
                  x³ - 3x² - 9x + 12
                </button>
                <button
                  onClick={() => { setCubA(1); setCubB(-6); setCubC(0); setCubD(5); setCubX0(1); }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-rose-700 cursor-pointer"
                >
                  x³ - 6x² + 5
                </button>
                <button
                  onClick={() => { setCubA(4); setCubB(-72); setCubC(324); setCubD(0); setCubX0(3); }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-rose-700 cursor-pointer"
                >
                  Резервоар V(x) = 4x³ - 72x² + 324x
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">a (пред x³):</label>
                <input
                  type="number"
                  value={cubA}
                  onChange={(e) => setCubA(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">b (пред x²):</label>
                <input
                  type="number"
                  value={cubB}
                  onChange={(e) => setCubB(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">c (пред x):</label>
                <input
                  type="number"
                  value={cubC}
                  onChange={(e) => setCubC(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <label className="block text-xs font-bold text-slate-600 mb-1">d (своб. член):</label>
                <input
                  type="number"
                  value={cubD}
                  onChange={(e) => setCubD(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 col-span-2 sm:col-span-1">
                <label className="block text-xs font-bold text-blue-800 mb-1">Точка x₀ (допир.):</label>
                <input
                  type="number"
                  value={cubX0}
                  onChange={(e) => setCubX0(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-blue-300 bg-white font-bold text-blue-950 text-sm"
                />
              </div>
            </div>

            {!cubicResults.valid ? (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                {cubicResults.message}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Първа производна</div>
                  <div className="text-sm font-mono font-bold text-slate-900 mt-0.5">{cubicResults.derivativeFormula}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{cubicResults.extremaStatus}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-[11px] font-semibold text-emerald-800">Локален Максимум (f&apos;=0)</div>
                  <div className="text-sm font-bold text-emerald-950 mt-0.5">{cubicResults.xMaxText}</div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">Смяна от (+) към (-)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                  <div className="text-[11px] font-semibold text-rose-800">Локален Минимум (f&apos;=0)</div>
                  <div className="text-sm font-bold text-rose-950 mt-0.5">{cubicResults.xMinText}</div>
                  <div className="text-[10px] text-rose-700 mt-0.5">Смяна от (-) към (+)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-[11px] font-semibold text-amber-800">Инфлексна точка (f&apos;&apos;=0)</div>
                  <div className="text-sm font-bold text-amber-950 mt-0.5">{cubicResults.inflectionText}</div>
                  <div className="text-[10px] text-amber-700 mt-0.5">x_инфл = -b / (3a)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="text-[11px] font-semibold text-blue-800">Допирателна при x₀ = {cubX0}</div>
                  <div className="text-sm font-mono font-bold text-blue-950 mt-0.5">{cubicResults.tangentEq}</div>
                  <div className="text-[10px] text-blue-700 mt-0.5">Наклон k = f&apos;({cubX0}) = {cubicResults.slopeAtX0}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 3: INTERACTIVE EXAM TRAINER (18 QUESTIONS)                       */}
      {/* ===================================================================== */}
      {activeMode === 'quiz' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>
                Бърз изпитен тренажор по Математика ({filteredQuiz.length} въпроса в избрания раздел)
              </span>
            </div>
            {quizStats.totalAnswered > 0 && (
              <button
                onClick={() => setQuizAnswers({})}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Нулирай теста</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuiz.map((q, qIdx) => {
              const chosenIdx = quizAnswers[q.id];
              const isAnswered = chosenIdx !== undefined;
              const isCorrect = chosenIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold">
                        Въпрос #{qIdx + 1} • {q.examType}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">
                        {q.category}
                      </span>
                    </div>

                    <div className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {q.question}
                    </div>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle =
                          'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnStyle =
                              'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                          } else if (optIdx === chosenIdx) {
                            btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                          } else {
                            btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-75';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() =>
                              setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                            }
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                          >
                            <span>
                              <strong className="mr-1.5">
                                {['А)', 'Б)', 'В)', 'Г)'][optIdx]}
                              </strong>
                              {opt}
                            </span>
                            {isAnswered && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isAnswered &&
                              optIdx === chosenIdx &&
                              optIdx !== q.correctIndex && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isAnswered && (
                    <div
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        isCorrect
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50/80 border-amber-200 text-amber-950'
                      }`}
                    >
                      <div className="font-mono font-bold text-blue-900 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 shrink-0 text-blue-600" />
                        <span>Формула: {q.formulaReference}</span>
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
