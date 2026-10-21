import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, Compass, CheckCircle2, TrendingUp, Target, ArrowRight, Check, RotateCcw, Zap } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';

interface HomeTrainerSectionProps {
  lessons: LessonData[];
  onNavigateTab: (tab: AppNavTab) => void;
  onSelectLesson?: (lesson: LessonData, targetTab?: AppNavTab) => void;
  onRequestFullCurriculum?: () => void;
}

// Изнесено от HomeLandingView — зарежда се отложено, когато секцията приближи екрана
export const HomeTrainerSection: React.FC<HomeTrainerSectionProps> = ({ lessons, onNavigateTab, onSelectLesson, onRequestFullCurriculum }) => {
  useEffect(() => {
    onRequestFullCurriculum?.();
  }, [onRequestFullCurriculum]);

  // 5. University & Career Admission Compass State
  const [selectedUniId, setSelectedUniId] = useState<
    'su-fmi' | 'mu-med' | 'tu-eng' | 'unwe-econ' | 'uacg-arch' | 'su-law-hum'
  >('su-fmi');
  const [uniGradePrimary, setUniGradePrimary] = useState<number>(5.75);
  const [uniGradeSecondary, setUniGradeSecondary] = useState<number>(5.60);
  const [uniGradeDiploma1, setUniGradeDiploma1] = useState<number>(5.90);
  const [uniGradeDiploma2, setUniGradeDiploma2] = useState<number>(5.85);

  // 6. Live Interactive Flashcard Deck State
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState<boolean>(false);
  const [knownFlashcardsCount, setKnownFlashcardsCount] = useState<number>(0);

  const interleavedFlashcards = useMemo(() => {
    const cards: { card: LessonData['flashcards'][number]; lesson: LessonData }[] = [];
    let cIdx = 0;
    let added = true;
    while (added) {
      added = false;
      for (const lesson of lessons) {
        if (cIdx < lesson.flashcards.length) {
          cards.push({ card: lesson.flashcards[cIdx], lesson });
          added = true;
        }
      }
      cIdx++;
    }
    return cards;
  }, [lessons]);

  const currentFlashcardItem =
    interleavedFlashcards[flashcardIndex % Math.max(1, interleavedFlashcards.length)];

  return (
    <>
        {/* ========================================================================= */}
        {/* 2.8 UNIVERSITY ADMISSION COMPASS & LIVE FLASHCARD FLIP-DECK */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Left Panel (7 cols): Interactive University & Career Admission Compass */}
            <div className="lg:col-span-7 p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-5">
              {(() => {
                const uniConfigs = {
                  'su-fmi': {
                    shortTitle: 'СУ — ФМИ (Софтуерно инж. / КН)',
                    fullTitle: 'Софийски университет „Св. Климент Охридски“ — Факултет по математика и информатика (ФМИ)',
                    formulaText: '3 × Изпит/ДЗИ Математика или Информатика + 1 × ДЗИ БЕЛ',
                    maxBall: 24,
                    minThreshold: 21.8,
                    primaryLabel: 'Изпит / ДЗИ Математика или Информатика (×3)',
                    secondaryLabel: 'ДЗИ Български език и литература (×1)',
                    dip1Label: 'Диплома Математика (информативно)',
                    dip2Label: 'Диплома Информатика (информативно)',
                    calcScore: (p: number, s: number) => 3 * p + 1 * s,
                    lessonIds: [
                      'cs-data-structures-graphs-trees-sorting-complexity-11-12',
                      'math-11-12-exponential-logarithmic-irrational-equations',
                      'math-10-12-solid-geometry-prisms-pyramids-spheres-cones'
                    ]
                  },
                  'mu-med': {
                    shortTitle: 'МУ — Медицина, Дентална & Фармация',
                    fullTitle: 'Медицински университети (МУ София, Пловдив, Варна, Плевен) — Магистър „Медицина / Фармация“',
                    formulaText: '2 × Изпит Биология + 2 × Изпит Химия + 1 × Диплома Биология + 1 × Диплома Химия',
                    maxBall: 36,
                    minThreshold: 32.4,
                    primaryLabel: 'Кандидатстудентски изпит по Биология (×2)',
                    secondaryLabel: 'Кандидатстудентски изпит по Химия (×2)',
                    dip1Label: 'Оценка от диплома по Биология (×1)',
                    dip2Label: 'Оценка от диплома по Химия (×1)',
                    calcScore: (p: number, s: number, d1: number, d2: number) => 2 * p + 2 * s + d1 + d2,
                    lessonIds: [
                      'bio-11-12-immunology-virology-neurobiology-endocrinology',
                      'chem-11-12-electrochemistry-galvanic-electrolysis-corrosion',
                      'bio-medicine-anatomy-biotech-pharmacy-8-12'
                    ]
                  },
                  'tu-eng': {
                    shortTitle: 'ТУ — КСИ, AI, Мехатроника & Авиация',
                    fullTitle: 'Технически университет (ТУ София / Пловдив / Варна) — Компютърно и софтуерно инж., Мехатроника, Авиация',
                    formulaText: '3 × Изпит/ДЗИ Математика или Физика + 1 × Диплома Математика + 1 × Диплома Физика',
                    maxBall: 30,
                    minThreshold: 25.5,
                    primaryLabel: 'Изпит / ДЗИ Математика или Физика (×3)',
                    secondaryLabel: 'Втора матура / ДИППК по специалността (бонус/резерв)',
                    dip1Label: 'Оценка от диплома по Математика (×1)',
                    dip2Label: 'Оценка от диплома по Физика / ИТ (×1)',
                    calcScore: (p: number, _s: number, d1: number, d2: number) => 3 * p + d1 + d2,
                    lessonIds: [
                      'phys-11-12-relativity-photoelectric-bohr-standard-model',
                      'phys-electromagnetic-induction-faraday-maxwell-dzi',
                      'cs-cybersecurity-cryptography-ai-machine-learning-11-12'
                    ]
                  },
                  'unwe-econ': {
                    shortTitle: 'УНСС — Финанси, МИО & Бизнес',
                    fullTitle: 'Университет за национално и световно стопанство (УНСС) & Икономически университети',
                    formulaText: '2 × ЕПИ / ДЗИ (БЕЛ, Математика, География, История или Икономика) + 1 × Диплома БЕЛ + 1 × Диплома Математика',
                    maxBall: 24,
                    minThreshold: 20.6,
                    primaryLabel: 'Оценка от ЕПИ или по-високо ДЗИ / ДИППК (×2)',
                    secondaryLabel: 'Втора матура / Език (резервен коефициент)',
                    dip1Label: 'Оценка от диплома по БЕЛ (×1)',
                    dip2Label: 'Оценка от диплома по Математика (×1)',
                    calcScore: (p: number, _s: number, d1: number, d2: number) => 2 * p + d1 + d2,
                    lessonIds: [
                      'econ-international-trade-forex-stock-market-insurance-11-12',
                      'geo-11-12-globalization-international-organizations-climate-demography',
                      'econ-micro-macro-accounting-finance-8-12'
                    ]
                  },
                  'uacg-arch': {
                    shortTitle: 'УАСГ — Архитектура, ССС & Геодезия',
                    fullTitle: 'Университет по архитектура, строителство и геодезия (УАСГ) — Архитектура, ССС и Геодезия',
                    formulaText: '2 × Изпит/ДЗИ Математика + 2 × Изпит Рисуване / Физика + 1 × Диплома Математика + 1 × Диплома БЕЛ',
                    maxBall: 36,
                    minThreshold: 30.8,
                    primaryLabel: 'Изпит / ДЗИ по Математика (×2)',
                    secondaryLabel: 'Изпит по Рисуване или ДЗИ Физика / СПП (×2)',
                    dip1Label: 'Оценка от диплома по Математика (×1)',
                    dip2Label: 'Оценка от диплома по БЕЛ (×1)',
                    calcScore: (p: number, s: number, d1: number, d2: number) => 2 * p + 2 * s + d1 + d2,
                    lessonIds: [
                      'phys-newton-laws-mechanics',
                      'math-10-12-solid-geometry-prisms-pyramids-spheres-cones',
                      'math-derivatives-extremums-dzi'
                    ]
                  },
                  'su-law-hum': {
                    shortTitle: 'СУ — Право, МО, Психология & Езици',
                    fullTitle: 'СУ „Св. Климент Охридски“ — Юридически, Исторически, Философски и Филологически факултети',
                    formulaText: '2 × ДЗИ БЕЛ + 2 × ДЗИ История / Философия / Чужд език + 1 × Диплома БЕЛ + 1 × Диплома История/Език',
                    maxBall: 36,
                    minThreshold: 32.0,
                    primaryLabel: 'ДЗИ 1 по Български език и литература (×2)',
                    secondaryLabel: 'ДЗИ 2 по История / Философия / Чужд език (×2)',
                    dip1Label: 'Оценка от диплома по БЕЛ (×1)',
                    dip2Label: 'Оценка от диплома по История / Чужд език (×1)',
                    calcScore: (p: number, s: number, d1: number, d2: number) => 2 * p + 2 * s + d1 + d2,
                    lessonIds: [
                      'hist-11-12-bulgarian-state-institutions-constitutions-1879-1991',
                      'bel-bulgarian-literature-10-smirnenski-milev-dalchev-yovkov',
                      'bel-world-literature-9-enlightenment-romanticism-realism'
                    ]
                  }
                };

                const activeUni = uniConfigs[selectedUniId];
                const calculatedBall = activeUni.calcScore(
                  uniGradePrimary,
                  uniGradeSecondary,
                  uniGradeDiploma1,
                  uniGradeDiploma2
                );
                const isAdmittedFirstRound = calculatedBall >= activeUni.minThreshold;
                const recommendedLessons = activeUni.lessonIds
                  .map((id) => lessons.find((l) => l.id === id))
                  .filter((l): l is LessonData => Boolean(l));

                return (
                  <>
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-brand-sapphire">
                            <Compass className="w-4.5 h-4.5" aria-hidden="true" />
                          </div>
                          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                            Състезателен бал за университет след 12. клас
                          </h2>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                            isAdmittedFirstRound
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-blue-50 text-blue-800 border-blue-200'
                          }`}
                        >
                          {isAdmittedFirstRound ? (
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : (
                            <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                          {isAdmittedFirstRound ? 'Приет по първо желание' : 'Нужен е още малко ръст за I класиране'}
                        </span>
                      </div>

                      {/* University Selector Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {(Object.keys(uniConfigs) as Array<keyof typeof uniConfigs>).map((uKey) => {
                          const isSel = selectedUniId === uKey;
                          return (
                            <button
                              key={uKey}
                              type="button"
                              onClick={() => setSelectedUniId(uKey)}
                              aria-pressed={isSel}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                                isSel
                                  ? 'bg-brand-sapphire text-white border-brand-sapphire'
                                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              {uniConfigs[uKey].shortTitle}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active University Formula Banner */}
                      <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-slate-900">{activeUni.fullTitle}</div>
                          <div className="text-[11px] text-slate-600">
                            <strong>Формула за бал:</strong> {activeUni.formulaText}
                          </div>
                        </div>
                        <div className="shrink-0 text-right bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
                          <div className="text-[11px] font-medium text-slate-500">Твоят състезателен бал</div>
                          <div className="text-xl sm:text-2xl font-bold tabular-nums text-emerald-700">
                            {calculatedBall.toFixed(2)}{' '}
                            <span className="text-xs font-semibold text-slate-400">/ {activeUni.maxBall.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Grade Sliders */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                            <span className="truncate pr-2">{activeUni.primaryLabel}</span>
                            <span className="tabular-nums text-emerald-700">{uniGradePrimary.toFixed(2)}</span>
                          </div>
                          <input
                            type="range"
                            min={3.0}
                            max={6.0}
                            step={0.05}
                            value={uniGradePrimary}
                            onChange={(e) => setUniGradePrimary(Number(e.target.value))}
                            className="w-full accent-emerald-600 cursor-pointer"
                          />
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                            <span className="truncate pr-2">{activeUni.secondaryLabel}</span>
                            <span className="tabular-nums text-emerald-700">{uniGradeSecondary.toFixed(2)}</span>
                          </div>
                          <input
                            type="range"
                            min={3.0}
                            max={6.0}
                            step={0.05}
                            value={uniGradeSecondary}
                            onChange={(e) => setUniGradeSecondary(Number(e.target.value))}
                            className="w-full accent-emerald-600 cursor-pointer"
                          />
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                            <span className="truncate pr-2">{activeUni.dip1Label}</span>
                            <span className="tabular-nums text-blue-700">{uniGradeDiploma1.toFixed(2)}</span>
                          </div>
                          <input
                            type="range"
                            min={3.0}
                            max={6.0}
                            step={0.05}
                            value={uniGradeDiploma1}
                            onChange={(e) => setUniGradeDiploma1(Number(e.target.value))}
                            className="w-full accent-blue-600 cursor-pointer"
                          />
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                            <span className="truncate pr-2">{activeUni.dip2Label}</span>
                            <span className="tabular-nums text-blue-700">{uniGradeDiploma2.toFixed(2)}</span>
                          </div>
                          <input
                            type="range"
                            min={3.0}
                            max={6.0}
                            step={0.05}
                            value={uniGradeDiploma2}
                            onChange={(e) => setUniGradeDiploma2(Number(e.target.value))}
                            className="w-full accent-blue-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Direct Launch to Target University Preparation Lessons */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                        <Target className="w-3.5 h-3.5 text-brand-sapphire" aria-hidden="true" />
                        <span>Препоръчани уроци за тази специалност</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {recommendedLessons.map((recLesson) => (
                          <button
                            key={recLesson.id}
                            type="button"
                            onClick={() => onSelectLesson?.(recLesson, 'summary')}
                            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-left transition-colors cursor-pointer flex flex-col justify-between gap-1"
                          >
                            <span className="text-[11px] font-semibold text-brand-sapphire">{recLesson.subject}</span>
                            <span className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                              {recLesson.title}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 pt-0.5">
                              Отвори конспекта
                              <ArrowRight className="w-3 h-3" aria-hidden="true" />
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Right Panel (5 cols): Live Interactive Flashcard Flip-Deck from all 108 Lessons */}
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-[#083861] via-[#0a4b82] to-[#145a96] text-white shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/15">
                  <h2 className="flex items-center gap-2 text-base font-bold text-white">
                    <Sparkles className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                    <span>Експресни флашкарти</span>
                    <span className="text-xs font-medium text-blue-100 tabular-nums">({interleavedFlashcards.length})</span>
                  </h2>
                  {knownFlashcardsCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-emerald-200 text-xs font-semibold tabular-nums">
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      Научени днес: {knownFlashcardsCount}
                    </span>
                  )}
                </div>

                {currentFlashcardItem && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-blue-200">
                      <span className="font-semibold text-emerald-200">
                        {currentFlashcardItem.lesson.subject} • {currentFlashcardItem.lesson.grade}
                      </span>
                      <span className="tabular-nums text-[11px] text-blue-100">
                        Карта #{(flashcardIndex % interleavedFlashcards.length) + 1} / {interleavedFlashcards.length}
                      </span>
                    </div>

                    {/* Interactive Flip Card Box */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={isFlashcardFlipped ? 'Покажи въпроса' : 'Покажи отговора'}
                      onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setIsFlashcardFlipped(!isFlashcardFlipped);
                        }
                      }}
                      className={`min-h-[210px] p-5 rounded-2xl border transition-colors cursor-pointer flex flex-col justify-between select-none ${
                        isFlashcardFlipped
                          ? 'bg-emerald-950/75 border-emerald-400/60 shadow-lg'
                          : 'bg-white/10 hover:bg-white/15 border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className={isFlashcardFlipped ? 'text-emerald-200' : 'text-blue-100'}>
                          {isFlashcardFlipped ? 'Отговор / формула' : 'Въпрос / термин — кликни, за да обърнеш'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/15 text-white text-[10px]">
                          {isFlashcardFlipped ? 'Гръб' : 'Лице'}
                        </span>
                      </div>

                      <div className="my-auto py-3">
                        <p
                          className={`leading-relaxed ${
                            isFlashcardFlipped
                              ? 'text-xs sm:text-sm text-emerald-100 font-medium'
                              : 'text-sm sm:text-base text-white font-bold'
                          }`}
                        >
                          {isFlashcardFlipped ? currentFlashcardItem.card.back : currentFlashcardItem.card.front}
                        </p>
                      </div>

                      <div className="text-[11px] text-blue-200 flex items-center justify-between pt-2 border-t border-white/15">
                        <span className="truncate max-w-[230px]">
                          Урок: {currentFlashcardItem.lesson.title}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-200">
                          <RotateCcw className="w-3 h-3" aria-hidden="true" />
                          Обърни
                        </span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                        className="min-h-10 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                      >
                        {isFlashcardFlipped ? 'Виж въпроса' : 'Виж отговора'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setKnownFlashcardsCount((prev) => prev + 1);
                          setIsFlashcardFlipped(false);
                          setFlashcardIndex((prev) => (prev + 1) % Math.max(1, interleavedFlashcards.length));
                        }}
                        className="min-h-10 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-brand-sapphire text-xs font-bold transition-colors cursor-pointer shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        Знам го
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsFlashcardFlipped(false);
                          setFlashcardIndex((prev) => (prev + 1) % Math.max(1, interleavedFlashcards.length));
                        }}
                        className="min-h-10 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Следваща
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-200">
                <button
                  type="button"
                  onClick={() => {
                    if (currentFlashcardItem) {
                      onSelectLesson?.(currentFlashcardItem.lesson, 'flashcards');
                    } else {
                      onNavigateTab('flashcards');
                    }
                  }}
                  className="inline-flex items-center gap-1 text-white hover:text-emerald-200 font-semibold cursor-pointer"
                >
                  Всички флашкарти към урока
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('blitz')}
                  className="inline-flex items-center gap-1 text-white hover:text-emerald-200 font-semibold cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                  60-сек. блиц
                </button>
              </div>
            </div>

          </div>
        </section>
    </>
  );
};
