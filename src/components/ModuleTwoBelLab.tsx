import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  XCircle,
  Flame,
  Award,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  Quote,
  Copy,
  Check,
  AlertTriangle,
  FileText,
  Feather,
  Loader2
} from 'lucide-react';
import {
  FIGURES_AND_TROPES,
  PARONYMS_AND_IDIOMS,
  MODULE_TWO_QUESTIONS,
  READING_SYNTHESIS_TASKS,
  TASK_41_BLUEPRINTS,
  type FigureOrTropeItem,
  type ModuleTwoQuestion,
  type SynthesisTaskTemplate,
  type Task41Blueprint
} from '../data/moduleTwoBelDatabase';
import { studyProgressService } from '../services/studyProgressService';
import { evaluateBelModuleTwoWithGemini, type BelModuleTwoAiEvaluation } from '../services/geminiService';

export const ModuleTwoBelLab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'figures' | 'lexicology' | 'synthesis' | 'task41' | 'quiz'>('figures');
  const [selectedFigureId, setSelectedFigureId] = useState<string>(FIGURES_AND_TROPES[0].id);
  const [lexFilter, setLexFilter] = useState<'all' | 'paronym' | 'idiom'>('all');
  const [selectedSynthesisId, setSelectedSynthesisId] = useState<string>(READING_SYNTHESIS_TASKS[0].id);
  const [selectedTask41Id, setSelectedTask41Id] = useState<string>(TASK_41_BLUEPRINTS[0].id);
  const [studentDraft, setStudentDraft] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Quiz state
  const [quizFilter, setQuizFilter] = useState<'all' | 'figures' | 'lexicology' | 'reading'>('all');
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [aiBelEval, setAiBelEval] = useState<BelModuleTwoAiEvaluation | null>(null);
  const [isAiBelLoading, setIsAiBelLoading] = useState<boolean>(false);
  const [aiBelError, setAiBelError] = useState<string | null>(null);

  const activeFigure: FigureOrTropeItem =
    FIGURES_AND_TROPES.find(f => f.id === selectedFigureId) || FIGURES_AND_TROPES[0];

  const filteredLexItems =
    lexFilter === 'all'
      ? PARONYMS_AND_IDIOMS
      : PARONYMS_AND_IDIOMS.filter(item => item.type === lexFilter);

  const activeSynthesis: SynthesisTaskTemplate =
    READING_SYNTHESIS_TASKS.find(t => t.id === selectedSynthesisId) || READING_SYNTHESIS_TASKS[0];

  const activeTask41: Task41Blueprint =
    TASK_41_BLUEPRINTS.find(b => b.id === selectedTask41Id) || TASK_41_BLUEPRINTS[0];

  const filteredQuestions =
    quizFilter === 'all'
      ? MODULE_TWO_QUESTIONS
      : MODULE_TWO_QUESTIONS.filter(q => q.subcategory === quizFilter);

  const currentQ: ModuleTwoQuestion | undefined = filteredQuestions[questionIdx];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleAnswerSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
    setIsSubmitted(true);
    if (currentQ && idx === currentQ.correctIndex) {
      const nextStreak = streak + 1;
      setScore(prev => prev + 1);
      setStreak(nextStreak);
      studyProgressService.recordGrammarAttempt(true, nextStreak);
    } else {
      setStreak(0);
      studyProgressService.recordGrammarAttempt(false, 0);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (questionIdx < filteredQuestions.length - 1) {
      setQuestionIdx(prev => prev + 1);
    } else {
      setQuestionIdx(0);
    }
  };

  const handleResetQuiz = () => {
    setQuestionIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setStreak(0);
  };

  // Live sentence & quote validator for student synthesis draft
  const trimmedDraft = studentDraft.trim();
  const sentenceCount = trimmedDraft
    ? trimmedDraft.split(/[.!?]+/).filter(s => s.trim().length > 2).length
    : 0;
  const wordCount = trimmedDraft ? trimmedDraft.split(/\s+/).length : 0;
  const hasForbiddenQuotes = /[„“"«»]/.test(trimmedDraft);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* ========================================================================= */}
      {/* 1. HEADER BANNER */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-900 to-slate-900 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-200 border border-purple-400/30">
              <Feather className="w-3.5 h-3.5" />
              <span>Модул 2 на ДЗИ & НВО 10 • 40 точки</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Лаборатория за Тропи, Фигури, Пароними & Резюме
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Овладей художествените изразни средства в българската поезия, лексикалните капани с пароними и фразеологизми и формулирането на теза в 3–4 изречения (Задача 39/40 на ДЗИ и Резюме на НВО 10).
            </p>
          </div>

          {/* Live Score & Streak Badges */}
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

      {/* ========================================================================= */}
      {/* 2. SUB-MODULE NAVIGATION TABS */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'figures', label: 'Тропи и фигури (8 групи)', icon: Feather },
            { id: 'lexicology', label: 'Пароними и фразеологизми', icon: BookOpen },
            { id: 'synthesis', label: 'Задача 40 (Теза) & Резюме', icon: FileText },
            { id: 'task41', label: 'Задача 41 (ИС / Есе — 30 т.)', icon: Award },
            { id: 'quiz', label: 'Изпитен тренажор Модул 2', icon: Sparkles }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: STYLISTIC FIGURES AND TROPES */}
      {/* ========================================================================= */}
      {activeSubTab === 'figures' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left 4 cols: Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
              Изразни средства по МОН
            </div>
            {FIGURES_AND_TROPES.map(item => {
              const isSelected = item.id === activeFigure.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedFigureId(item.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-purple-50 border-purple-300 text-purple-950 font-bold shadow-2xs ring-1 ring-purple-300'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                      {item.kindLabel}
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {item.name}
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-purple-600' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Right 8 cols: Detailed Breakdown & Canon Quotes */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div className="space-y-2 pb-4 border-b border-slate-100">
              <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold uppercase tracking-wider">
                {activeFigure.kindLabel}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pt-1">
                {activeFigure.name}
              </h2>
            </div>

            {/* Official Definition */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Официална дефиниция за матурата:
              </div>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {activeFigure.definition}
              </p>
            </div>

            {/* 3-Second Spotter Rule */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-950">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Как да го разпознаеш веднага на теста:</strong>{' '}
                {activeFigure.howToSpot}
              </div>
            </div>

            {/* Canonical Examples */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Примери от задължителните матуритетни творби:
              </div>
              {activeFigure.canonExamples.map((ex, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-purple-700 flex items-center gap-1.5">
                        <Quote className="w-3.5 h-3.5" />
                        <span>{ex.workAndAuthor}</span>
                      </div>
                      <div className="text-sm font-bold italic text-slate-900">
                        {ex.quote}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(ex.quote)}
                      className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
                      title="Копирай цитата"
                    >
                      {copiedText === ex.quote ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="text-xs text-slate-600 pl-2 border-l-2 border-purple-300">
                    <strong>Анализ за ЛИС:</strong> {ex.analysis}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setActiveSubTab('quiz');
                  setQuizFilter('figures');
                  setQuestionIdx(0);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                <span>Тествай разпознаването на тропи и фигури</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: PARONYMS AND IDIOMS */}
      {/* ========================================================================= */}
      {activeSubTab === 'lexicology' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Речник-тренажор на паронимите и фразеологизмите за ДЗИ
              </h2>
              <p className="text-xs text-slate-500">
                Най-често падащите двойки близкозвучащи думи и устойчиви словосъчетания в задачи 12–20 на матурата.
              </p>
            </div>

            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
              {[
                { id: 'all', label: 'Всички' },
                { id: 'paronym', label: 'Двойки пароними' },
                { id: 'idiom', label: 'Фразеологизми' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setLexFilter(f.id as typeof lexFilter)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    lexFilter === f.id
                      ? 'bg-white text-purple-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLexItems.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                        item.type === 'paronym'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {item.type === 'paronym' ? 'Паронимна двойка' : 'Фразеологизъм'}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900">{item.title}</h3>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      {item.meaningA}
                    </div>
                    {item.meaningB && (
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                        {item.meaningB}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-2 text-xs text-emerald-800 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Правилен контекст:</strong> {item.exampleCorrect}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{item.monTrapNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: TASK 39/40 (3-4 SENTENCE THESIS) & SUMMARY BUILDER */}
      {/* ========================================================================= */}
      {activeSubTab === 'synthesis' && (
        <div className="space-y-6">
          
          {/* Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {READING_SYNTHESIS_TASKS.map(task => {
              const isSelected = task.id === activeSynthesis.id;
              return (
                <button
                  key={task.id}
                  onClick={() => {
                    setSelectedSynthesisId(task.id);
                    setStudentDraft('');
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="opacity-80 mr-1.5">[{task.examType}]</span>
                  <span>{task.title.split(':')[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 7 cols: Task Prompt, Criteria & Live Student Draft Validator */}
            <div className="lg:col-span-7 space-y-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
              <div className="space-y-2 pb-4 border-b border-slate-100">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold">
                  {activeSynthesis.examType} • {activeSynthesis.pointsBreakdown}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 pt-1">
                  {activeSynthesis.title}
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700 leading-relaxed">
                <div className="font-bold uppercase tracking-wider text-slate-400">
                  Изходна текстова основа:
                </div>
                <p>{activeSynthesis.sourceExcerpt}</p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm font-bold text-blue-950">
                Условие на МОН: {activeSynthesis.taskPrompt}
              </div>

              {/* Interactive Student Draft Box with Sentence Counter */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-slate-800">
                    Напиши своя отговор тук (Автоматична проверка на обема):
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded font-bold border ${
                        sentenceCount >= 3 && sentenceCount <= 4
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      Изречения: {sentenceCount} (Цел: 3–4)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      Думи: {wordCount}
                    </span>
                  </div>
                </div>

                <textarea
                  rows={5}
                  value={studentDraft}
                  onChange={e => setStudentDraft(e.target.value)}
                  placeholder="Напиши своите 3–4 свързани изречения тук без дословно цитиране..."
                  className="w-full p-4 rounded-2xl bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 text-xs sm:text-sm text-slate-900 focus:outline-none transition-colors leading-relaxed"
                />

                {hasForbiddenQuotes && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2 font-medium">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>
                      Внимание: Открити са кавички! В резюме и кратка теза по МОН не се допуска дословно цитиране от текста.
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!trimmedDraft || isAiBelLoading) return;
                      setIsAiBelLoading(true);
                      setAiBelError(null);
                      try {
                        const res = await evaluateBelModuleTwoWithGemini({
                          mode: 'synthesis',
                          topic: `${activeSynthesis.title} (${activeSynthesis.examType}) — ${activeSynthesis.taskPrompt}`,
                          referenceText: activeSynthesis.modelAnswer,
                          studentDraft: trimmedDraft
                        });
                        setAiBelEval(res);
                      } catch (err) {
                        setAiBelError(err instanceof Error ? err.message : 'Грешка при свързване с Gemini 3.8 Flash.');
                      } finally {
                        setIsAiBelLoading(false);
                      }
                    }}
                    disabled={!trimmedDraft || isAiBelLoading}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    {isAiBelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>{isAiBelLoading ? 'Проверява се по МОН...' : '🤖 Провери с Gemini 3.8 Flash (Оценител МОН)'}</span>
                  </button>
                </div>

                {aiBelError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                    {aiBelError}
                  </div>
                )}

                {aiBelEval && (
                  <div className="p-4 rounded-2xl bg-indigo-950 text-white border border-indigo-700 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Оценка от Gemini 3.8 Flash (Критерии на МОН):</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                        {aiBelEval.verdict}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-100 leading-relaxed">{aiBelEval.feedback}</p>
                    <div className="space-y-1">
                      {aiBelEval.improvements.map((imp, idx) => (
                        <div key={idx} className="text-xs text-amber-200">• {imp}</div>
                      ))}
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-xs text-emerald-200">
                      <strong className="block text-white mb-0.5">✨ Редактиран еталонен вариант:</strong>
                      {aiBelEval.modelImprovedVersion}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 cols: Checklist, Forbidden Mistakes & Model 5/5 Answer */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Mandatory Criteria & Forbidden Mistakes */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Задължителни елементи за пълни точки:
                  </div>
                  {activeSynthesis.mandatoryCriteria.map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Груби грешки, които отнемат точки:
                  </div>
                  {activeSynthesis.forbiddenMistakes.map((mist, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{mist}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Model Answer Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/80 to-purple-50/50 border border-indigo-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-900">
                    Еталонен отговор за максимален резултат:
                  </span>
                  <button
                    onClick={() => handleCopy(activeSynthesis.modelAnswer)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-[11px] font-bold cursor-pointer"
                  >
                    {copiedText === activeSynthesis.modelAnswer ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Копирано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Копирай модела</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium bg-white p-4 rounded-2xl border border-indigo-100">
                  {activeSynthesis.modelAnswer}
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3B: TASK 41 (30-POINT DZI INTERPRETATIVE ESSAY & ESSAY BUILDER) */}
      {/* ========================================================================= */}
      {activeSubTab === 'task41' && (
        <div className="space-y-6">
          {/* Selector for Task 41 Blueprints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TASK_41_BLUEPRINTS.map(bp => {
              const isSelected = bp.id === activeTask41.id;
              return (
                <button
                  key={bp.id}
                  onClick={() => setSelectedTask41Id(bp.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded mb-1.5 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-800'
                    }`}
                  >
                    {bp.thematicCluster}
                  </span>
                  <div className="text-xs sm:text-sm font-bold leading-snug line-clamp-2">{bp.workAndAuthor}</div>
                  <div className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {bp.examTopic}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 cols: Full Architectural Blueprint (Introduction -> Thesis -> 3 Arguments -> Conclusion) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {activeTask41.genreAndPeriod}
                </div>
                <h2 className="text-xl font-black text-slate-900">
                  Тема за 41. задача: „{activeTask41.examTopic}“
                </h2>
                <p className="text-xs text-slate-600 font-semibold">{activeTask41.workAndAuthor}</p>
              </div>

              {/* 1. Увод и Основна Теза */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-900">
                    1. Увод и Основна Теза (Критерий за 7 т. по литературни компетентности):
                  </span>
                  <button
                    onClick={() => handleCopy(`${activeTask41.introductionHook} ${activeTask41.mainThesis}`)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-[11px] font-bold cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Копирай тезата</span>
                  </button>
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  <strong>Уводна рамка:</strong> {activeTask41.introductionHook}
                </p>
                <p className="text-xs sm:text-sm text-indigo-950 font-bold leading-relaxed bg-white p-3.5 rounded-xl border border-indigo-100">
                  <strong>Основна теза:</strong> {activeTask41.mainThesis}
                </p>
              </div>

              {/* 2. Верига от 3 Аргументативни абзаца */}
              <div className="space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                  2. Доказателствена част (3 микротези + художествени наблюдения и цитати):
                </div>
                {activeTask41.arguments.map((arg, aIdx) => (
                  <div key={aIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-extrabold text-purple-900">{arg.title}</div>
                    <p className="text-xs text-slate-800 leading-relaxed font-medium">{arg.microThesis}</p>
                    <div className="text-[11px] text-indigo-800 bg-white px-3 py-2 rounded-xl border border-slate-200">
                      <strong>Цитати и тропи за опора:</strong> {arg.evidenceAndQuotes}
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. Заключение и Мост за Есе */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-900">
                  3. Обобщаващо заключение и Насока за Есе:
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-semibold leading-relaxed">
                  {activeTask41.conclusion}
                </p>
                <div className="pt-2 border-t border-emerald-200/70 text-xs text-slate-700">
                  <strong className="text-amber-900">💡 Морална и съвременна перспектива (ако избираш Есе):</strong>{' '}
                  {activeTask41.essayParallel}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Official МОН 30-Point Rubric & Student Practice Pad */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-purple-800">
                  Официална скала на МОН за Задача 41 (Общо 30 точки):
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>1. Литературни / аргументативни компетентности (теза, анализ, опори):</span>
                    <strong className="font-mono text-indigo-700">15 т.</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>2. Композиционна цялост, логическа свързаност и стил:</span>
                    <strong className="font-mono text-purple-700">6 т.</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span>3. Езикови норми (правопис, пунктуация, граматика, лексика):</span>
                    <strong className="font-mono text-emerald-700">9 т.</strong>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">Чернова за твоята теза и аргументи:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setStudentDraft(
                        `${activeTask41.introductionHook}\n\n${activeTask41.mainThesis}\n\n${activeTask41.arguments
                          .map(a => `• ${a.microThesis}`)
                          .join('\n')}\n\n${activeTask41.conclusion}`
                      )
                    }
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    Зареди скелета в черновата ➔
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={studentDraft}
                  onChange={e => setStudentDraft(e.target.value)}
                  placeholder="Състави тук своя увод, теза и микротези за Задача 41 или използвай бутона „Зареди скелета в черновата“..."
                  className="w-full p-4 rounded-2xl bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 text-xs sm:text-sm text-slate-900 focus:outline-none leading-relaxed"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Думи в черновата: {wordCount}</span>
                  <span>Изречения: {sentenceCount}</span>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    if (!trimmedDraft || isAiBelLoading) return;
                    setIsAiBelLoading(true);
                    setAiBelError(null);
                    try {
                      const res = await evaluateBelModuleTwoWithGemini({
                        mode: 'task41',
                        topic: `${activeTask41.examTopic} (${activeTask41.workAndAuthor})`,
                        referenceText: `${activeTask41.mainThesis} | ${activeTask41.conclusion}`,
                        studentDraft: trimmedDraft
                      });
                      setAiBelEval(res);
                    } catch (err) {
                      setAiBelError(err instanceof Error ? err.message : 'Грешка при свързване с Gemini 3.8 Flash.');
                    } finally {
                      setIsAiBelLoading(false);
                    }
                  }}
                  disabled={!trimmedDraft || isAiBelLoading}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  {isAiBelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{isAiBelLoading ? 'Проверява се по МОН (30 т.)...' : '🤖 Провери черновата с Gemini 3.8 Flash (30 т.)'}</span>
                </button>

                {aiBelEval && (
                  <div className="p-4 rounded-2xl bg-indigo-950 text-white border border-indigo-700 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase text-purple-300">Gemini 3.8 Flash Рецензия:</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                        {aiBelEval.verdict}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-100 leading-relaxed">{aiBelEval.feedback}</p>
                    <div className="p-2.5 rounded-xl bg-white/10 text-xs text-emerald-200">
                      <strong className="block text-white mb-0.5">✨ Надградена теза (30/30 т.):</strong>
                      {aiBelEval.modelImprovedVersion}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: INTERACTIVE MODULE 2 QUIZ */}
      {/* ========================================================================= */}
      {activeSubTab === 'quiz' && currentQ && (
        <div className="max-w-4xl mx-auto space-y-5">
          
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs">
              {[
                { id: 'all', label: 'Всички задачи' },
                { id: 'figures', label: 'Тропи и фигури' },
                { id: 'lexicology', label: 'Пароними и фразеологизми' },
                { id: 'reading', label: 'Стил и текст' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setQuizFilter(cat.id as typeof quizFilter);
                    setQuestionIdx(0);
                    setSelectedOption(null);
                    setIsSubmitted(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                    quizFilter === cat.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-slate-500">
              Задача {questionIdx + 1} от {filteredQuestions.length}
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 font-bold uppercase tracking-wider">
                {currentQ.subcategoryLabel}
              </span>
              <span className="text-slate-500 font-medium">{currentQ.authorOrSource}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 italic text-slate-800 text-sm font-medium leading-relaxed">
              {currentQ.excerpt}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {currentQ.question}
            </h3>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-purple-400 hover:bg-purple-50/40';
                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-400';
                  } else {
                    btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={isSubmitted}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {isSubmitted && (
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-900">
                  <Lightbulb className="w-4 h-4 text-indigo-600" />
                  <span>Обяснение по критериите на МОН:</span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Нулирай резултата</span>
              </button>

              {isSubmitted && (
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
                >
                  <span>Следваща задача</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
