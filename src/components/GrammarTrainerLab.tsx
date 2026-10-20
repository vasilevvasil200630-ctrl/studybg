import React, { useMemo, useState } from 'react';
import {
  PenTool,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Flame,
  Award,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
} from 'lucide-react';
import {
  GRAMMAR_RULES,
  GRAMMAR_QUESTIONS,
  type GrammarQuestion,
  type GrammarRule,
} from '../data/grammarDatabase';
import { studyProgressService } from '../services/studyProgressService';
import { generateGrammarInfiniteQuestions } from '../services/infiniteLabGenerators';

export const GrammarTrainerLab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | GrammarQuestion['categoryId']>('all');
  const [activeMode, setActiveMode] = useState<'practice' | 'theory'>('practice');
  const [variantNumber, setVariantNumber] = useState<number>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedRuleId, setSelectedRuleId] = useState<string>(GRAMMAR_RULES[0].id);

  // Filter questions based on category + infinite generated questions
  const filteredQuestions = useMemo(() => {
    const staticFiltered =
      activeCategory === 'all'
        ? GRAMMAR_QUESTIONS
        : GRAMMAR_QUESTIONS.filter((q) => q.categoryId === activeCategory);
    const dynamicGenerated = generateGrammarInfiniteQuestions(activeCategory, variantNumber);
    return variantNumber === 1
      ? [...staticFiltered, ...dynamicGenerated]
      : [...dynamicGenerated, ...staticFiltered];
  }, [activeCategory, variantNumber]);

  const currentQ: GrammarQuestion | undefined = filteredQuestions[currentQuestionIndex];
  const matchingRuleForCurrentQ: GrammarRule =
    GRAMMAR_RULES.find((r) => r.category === currentQ?.categoryId) || GRAMMAR_RULES[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(index);
    setIsAnswerSubmitted(true);

    if (currentQ && index === currentQ.correctIndex) {
      const nextStreak = streak + 1;
      setScore((prev) => prev + 1);
      setStreak(nextStreak);
      studyProgressService.recordGrammarAttempt(true, nextStreak);
    } else {
      setStreak(0);
      studyProgressService.recordGrammarAttempt(false, 0);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setVariantNumber((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handleNewInfiniteVariant = () => {
    setVariantNumber((prev) => prev + 1);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
  };

  const handleResetSession = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
  };

  const selectedRule: GrammarRule = GRAMMAR_RULES.find((r) => r.id === selectedRuleId) || GRAMMAR_RULES[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-blue-900 to-slate-900 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <PenTool className="w-3.5 h-3.5" />
              <span>Модул 1 на ДЗИ & НВО 10 • 30 точки • Вариант #{variantNumber}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Тренажор по Граматика, Правопис & Пунктуация
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Официални тестови въпроси и безкраен генератор на нови изречения по нормите на Института за български език (БАН) и МОН. Овладей пълния и краткия член, трудните запетаи и слятото писане без грешка.
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>Серия</span>
              </div>
              <div className="text-xl font-black text-white mt-0.5">{streak}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>Точки</span>
              </div>
              <div className="text-xl font-black text-white mt-0.5">{score}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher: Practice vs Theory */}
      <search className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveMode('practice')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeMode === 'practice'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Интерактивен тест (∞)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('theory')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeMode === 'theory'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Правила и капани на БАН</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {(
            [
              { id: 'all', label: 'Всички' },
              { id: 'article', label: 'Пълен/кратък член' },
              { id: 'punctuation', label: 'Запетаи' },
              { id: 'orthography', label: 'Слято/разделно' },
              { id: 'double_n', label: 'Двойно нн' },
              { id: 'pronouns_quant', label: 'Бройна форма' },
            ] as const
          ).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActiveCategory(c.id);
                setCurrentQuestionIndex(0);
                setSelectedAnswerIndex(null);
                setIsAnswerSubmitted(false);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer font-medium ${
                activeCategory === c.id
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </search>

      {/* Mode 1: PRACTICE DRILL */}
      {activeMode === 'practice' && currentQ && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            {/* Top Question Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-bold uppercase tracking-wider">
                  {currentQ.categoryLabel}
                </span>
                {currentQ.monExamReference && (
                  <span className="text-slate-500 font-mono hidden sm:inline">
                    {currentQ.monExamReference}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-bold">
                  Въпрос {currentQuestionIndex + 1} от {filteredQuestions.length} (Вариант #{variantNumber})
                </span>
                <button
                  type="button"
                  onClick={handleNewInfiniteVariant}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Нов вариант с нови изречения (∞)</span>
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQ.sentence}
              </h2>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium leading-relaxed">
                {currentQ.question}
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswerIndex === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let buttonClass =
                  'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/40';
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    buttonClass =
                      'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400';
                  } else if (isSelected) {
                    buttonClass =
                      'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400';
                  } else {
                    buttonClass = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  buttonClass = 'bg-blue-50 border-blue-600 text-blue-900 font-bold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${buttonClass}`}
                  >
                    <span className="leading-relaxed">{option}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Official Rule & Explanation Card upon submission */}
            {isAnswerSubmitted && (
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span>Официално езиково правило на БАН & МОН:</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Native Accordion: Study Material for Current Rule */}
            <details className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700">
              <summary className="font-bold text-slate-900 cursor-pointer select-none">
                Справка с материала по МОН & БАН за това правило: {matchingRuleForCurrentQ.title}
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 leading-relaxed">
                <p>
                  <strong>Кратко правило:</strong> {matchingRuleForCurrentQ.ruleSummary}
                </p>
                <p>
                  <strong>Алгоритъм за проверка на ДЗИ:</strong> {matchingRuleForCurrentQ.explanation}
                </p>
                <p className="text-amber-900 bg-amber-50/80 border border-amber-200 rounded-xl p-2.5">
                  <strong>Чест капан на матурата:</strong> {matchingRuleForCurrentQ.monTip}
                </p>
              </div>
            </details>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetSession}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Започни отначало</span>
              </button>

              {isAnswerSubmitted && (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
                >
                  <span>Следващ въпрос</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: THEORY & TRAPS */}
      {activeMode === 'theory' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Rules List Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
              Конспект на правилата
            </div>
            {GRAMMAR_RULES.map((rule) => (
              <button
                key={rule.id}
                type="button"
                onClick={() => setSelectedRuleId(rule.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedRuleId === rule.id
                    ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 mb-1">
                  {rule.categoryLabel}
                </div>
                <div className="text-sm font-bold line-clamp-1">{rule.title}</div>
              </button>
            ))}
          </div>

          {/* Rule Detail Panel */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                {selectedRule.categoryLabel}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {selectedRule.title}
              </h2>
            </div>

            {/* Rule Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 leading-relaxed">
              {selectedRule.ruleSummary}
            </div>

            {/* Full Explanation */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Подробно обяснение за ДЗИ:
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{selectedRule.explanation}</p>
            </div>

            {/* Examples Grid */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Примери и контрапримери:
              </div>
              <div className="space-y-2">
                {selectedRule.examples.map((ex, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{ex.correct}</span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-700 line-through">
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span>{ex.incorrect}</span>
                    </div>
                    <div className="text-slate-500 pl-6 italic">Забележка: {ex.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* MON Exam Trap Tip */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Капан на матурата:</strong> {selectedRule.monTip}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setActiveMode('practice');
                  setActiveCategory(selectedRule.category);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                <span>Упражни това правило в теста</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
