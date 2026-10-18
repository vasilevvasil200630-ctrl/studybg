import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, Compass } from 'lucide-react';
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Left Panel (7 cols): Interactive University & Career Admission Compass */}
            <div className="lg:col-span-7 p-5 sm:p-7 rounded-3xl bg-white border-2 border-emerald-200/90 shadow-xs flex flex-col justify-between space-y-5">
              {(() => {
                const uniConfigs = {
                  'su-fmi': {
                    shortTitle: '💻 СУ — ФМИ (Софтуерно инж. / КН)',
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
                    shortTitle: '🩺 МУ — Медицина, Дентална & Фармация',
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
                      'voc-pharmaceutical-tech-cosmetology-microbiology-food-safety-8-12'
                    ]
                  },
                  'tu-eng': {
                    shortTitle: '⚙️ ТУ — КСИ, AI, Мехатроника & Авиация',
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
                      'voc-cnc-machining-welding-hydraulics-pneumatics-robotics-8-12',
                      'cs-cybersecurity-cryptography-ai-machine-learning-11-12'
                    ]
                  },
                  'unwe-econ': {
                    shortTitle: '📈 УНСС — Финанси, МИО & Бизнес',
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
                      'math-combinatorics-probability-stats-10-12'
                    ]
                  },
                  'uacg-arch': {
                    shortTitle: '🏗️ УАСГ — Архитектура, ССС & Геодезия',
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
                      'voc-geodesy-photogrammetry-cartography-gis-water-construction-8-12',
                      'math-10-12-solid-geometry-prisms-pyramids-spheres-cones',
                      'voc-graphic-design-ui-ux-3d-modeling-architectural-visualization-8-12'
                    ]
                  },
                  'su-law-hum': {
                    shortTitle: '⚖️ СУ — Право, МО, Психология & Езици',
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
                        <div className="space-y-0.5">
                          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                            <Compass className="w-4 h-4 text-emerald-600" />
                            <span>Университетски & Кариерен Компас след 12. клас</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-black text-slate-900">
                            Калкулатор на Състезателен бал за ВУЗ (СУ, МУ, ТУ, УНСС, УАСГ)
                          </h3>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                            isAdmittedFirstRound
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          {isAdmittedFirstRound
                            ? '✅ Приет по Първо желание (Топ класиране)'
                            : '⚡ Нужен е още малко ръст за I класиране'}
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
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                isSel
                                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-emerald-800 border-slate-200 hover:border-emerald-300'
                              }`}
                            >
                              {uniConfigs[uKey].shortTitle}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active University Formula Banner */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="text-xs font-extrabold text-slate-900">{activeUni.fullTitle}</div>
                          <div className="text-[11px] text-slate-600">
                            <strong>Формула за бал:</strong> {activeUni.formulaText}
                          </div>
                        </div>
                        <div className="shrink-0 text-right bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs">
                          <div className="text-[10px] font-bold uppercase text-slate-500">Твоят състезателен бал</div>
                          <div className="text-xl sm:text-2xl font-mono font-black text-emerald-700">
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
                            <span className="font-mono text-emerald-700">{uniGradePrimary.toFixed(2)}</span>
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
                            <span className="font-mono text-emerald-700">{uniGradeSecondary.toFixed(2)}</span>
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
                            <span className="font-mono text-blue-700">{uniGradeDiploma1.toFixed(2)}</span>
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
                            <span className="font-mono text-blue-700">{uniGradeDiploma2.toFixed(2)}</span>
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
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                        🎯 Препоръчани уроци за максимален бал в тази специалност:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {recommendedLessons.map((recLesson) => (
                          <button
                            key={recLesson.id}
                            type="button"
                            onClick={() => onSelectLesson?.(recLesson, 'summary')}
                            className="p-2.5 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all cursor-pointer flex flex-col justify-between gap-1"
                          >
                            <span className="text-[10px] font-bold text-emerald-800">{recLesson.subject}</span>
                            <span className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                              {recLesson.title}
                            </span>
                            <span className="text-[10px] font-extrabold text-emerald-700 pt-0.5">
                              Отвори конспекта →
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
            <div className="lg:col-span-5 p-5 sm:p-7 rounded-3xl bg-slate-900 text-white shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                      Експресни Флашкарти ({interleavedFlashcards.length} карти)
                    </span>
                  </div>
                  {knownFlashcardsCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                      ✓ Научени днес: {knownFlashcardsCount}
                    </span>
                  )}
                </div>

                {currentFlashcardItem && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-blue-200">
                      <span className="font-bold text-amber-300">
                        {currentFlashcardItem.lesson.subject} • {currentFlashcardItem.lesson.grade}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        Карта #{(flashcardIndex % interleavedFlashcards.length) + 1} / {interleavedFlashcards.length}
                      </span>
                    </div>

                    {/* Interactive Flip Card Box */}
                    <div
                      onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                      className={`min-h-[210px] p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none ${
                        isFlashcardFlipped
                          ? 'bg-emerald-950/70 border-emerald-400/60 shadow-lg'
                          : 'bg-white/10 hover:bg-white/15 border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                        <span className={isFlashcardFlipped ? 'text-emerald-300' : 'text-blue-300'}>
                          {isFlashcardFlipped ? '💡 Академичен отговор / Формула' : '❓ Въпрос / Термин (Кликни за обръщане)'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">
                          {isFlashcardFlipped ? 'Гръб' : 'Лице'}
                        </span>
                      </div>

                      <div className="my-auto py-3">
                        <p
                          className={`leading-relaxed ${
                            isFlashcardFlipped
                              ? 'text-xs sm:text-sm text-emerald-100 font-medium'
                              : 'text-sm sm:text-base text-white font-extrabold'
                          }`}
                        >
                          {isFlashcardFlipped ? currentFlashcardItem.card.back : currentFlashcardItem.card.front}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-300 flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="truncate max-w-[230px]">
                          Урок: {currentFlashcardItem.lesson.title}
                        </span>
                        <span className="font-bold text-amber-300">Обърни ↻</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                        className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-colors cursor-pointer"
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
                        className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-extrabold transition-colors cursor-pointer"
                      >
                        ✓ Знам го (+1)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsFlashcardFlipped(false);
                          setFlashcardIndex((prev) => (prev + 1) % Math.max(1, interleavedFlashcards.length));
                        }}
                        className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Следваща →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-blue-200">
                <button
                  type="button"
                  onClick={() => {
                    if (currentFlashcardItem) {
                      onSelectLesson?.(currentFlashcardItem.lesson, 'flashcards');
                    } else {
                      onNavigateTab('flashcards');
                    }
                  }}
                  className="text-amber-300 hover:text-amber-200 font-bold cursor-pointer"
                >
                  Отвори всички флашкарти към урока →
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('blitz')}
                  className="text-white hover:text-amber-300 font-semibold cursor-pointer"
                >
                  ⚡ 60-сек. Блиц
                </button>
              </div>
            </div>

          </div>
        </section>
    </>
  );
};
