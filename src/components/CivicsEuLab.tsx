import React, { useState, useMemo } from 'react';
import {
  Landmark,
  ShieldCheck,
  Globe,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  FileText,
  Sparkles,
  Award,
  ArrowRight,
  RotateCcw,
  Building2,
  RefreshCw,
  Gavel
} from 'lucide-react';
import {
  BG_CONSTITUTION_INSTITUTIONS,
  EU_INSTITUTIONS,
  CIVICS_QUIZ_QUESTIONS,
  CIVICS_CASE_TASKS
} from '../data/civicsEuDatabase';
import { generateCivicsInfiniteQuiz } from '../services/infiniteLabGenerators';

export const CivicsEuLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'constitution' | 'eu' | 'quiz' | 'cases'>('constitution');

  // Tab 1: Bulgarian Constitution state
  const [selectedBgInstId, setSelectedBgInstId] = useState<string>(BG_CONSTITUTION_INSTITUTIONS[0].id);
  const selectedBgInst = useMemo(
    () => BG_CONSTITUTION_INSTITUTIONS.find(i => i.id === selectedBgInstId) || BG_CONSTITUTION_INSTITUTIONS[0],
    [selectedBgInstId]
  );

  // Tab 2: EU Institutions state
  const [selectedEuInstId, setSelectedEuInstId] = useState<string>(EU_INSTITUTIONS[0].id);
  const selectedEuInst = useMemo(
    () => EU_INSTITUTIONS.find(i => i.id === selectedEuInstId) || EU_INSTITUTIONS[0],
    [selectedEuInstId]
  );

  // Tab 3: Quiz state
  const [quizFilter, setQuizFilter] = useState<'all' | 'constitution' | 'eu' | 'human_rights' | 'labor_dippk'>('all');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizVariant, setQuizVariant] = useState<number>(1);

  const filteredQuestions = useMemo(() => {
    void CIVICS_QUIZ_QUESTIONS;
    return generateCivicsInfiniteQuiz(quizFilter, quizVariant);
  }, [quizFilter, quizVariant]);
  const _legacyCivicsQuestions = useMemo(() => {
    if (quizFilter === 'all') return CIVICS_QUIZ_QUESTIONS;
    return CIVICS_QUIZ_QUESTIONS.filter(q => q.category === quizFilter);
  }, [quizFilter]); void _legacyCivicsQuestions;

  const quizStats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    filteredQuestions.forEach(q => {
      if (selectedAnswers[q.id] !== undefined) {
        answered += 1;
        if (selectedAnswers[q.id] === q.correctIndex) {
          correct += 1;
        }
      }
    });
    return { answered, correct, total: filteredQuestions.length };
  }, [filteredQuestions, selectedAnswers]);

  // Tab 4: Case Study Studio state
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CIVICS_CASE_TASKS[0].id);
  const [caseDrafts, setCaseDrafts] = useState<Record<string, string>>({});
  const [showModelSolution, setShowModelSolution] = useState<Record<string, boolean>>({});

  const activeCase = useMemo(
    () => CIVICS_CASE_TASKS.find(c => c.id === selectedCaseId) || CIVICS_CASE_TASKS[0],
    [selectedCaseId]
  );

  const currentDraft = caseDrafts[activeCase.id] || '';

  const draftAudit = useMemo(() => {
    const trimmed = currentDraft.trim();
    const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
    const lower = trimmed.toLowerCase();
    const matchedConcepts = activeCase.requiredConcepts.filter(concept =>
      lower.includes(concept.toLowerCase())
    );
    const missingConcepts = activeCase.requiredConcepts.filter(
      concept => !lower.includes(concept.toLowerCase())
    );
    return {
      wordCount,
      matchedConcepts,
      missingConcepts,
      coveragePercent: Math.round((matchedConcepts.length / activeCase.requiredConcepts.length) * 100)
    };
  }, [currentDraft, activeCase]);

  const getBranchBadgeColor = (branch: string) => {
    switch (branch) {
      case 'Законодателна власт':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Изпълнителна власт':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Съдебна власт':
        return 'bg-slate-50 text-slate-800 border-slate-200';
      case 'Държавен глава':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-rose-50 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-blue-700">5 органа</div>
              <div className="text-[11px] font-medium text-slate-500">Конституция на РБ</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-blue-700">6 институции</div>
              <div className="text-[11px] font-medium text-slate-500">Архитектура на ЕС</div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-amber-800">ДЗИ & Олимпиада</div>
              <div className="text-[11px] font-medium text-amber-700">Казуси и тест за 6.00</div>
            </div>
          </div>
        </div>

        {/* Navigation Sub-tabs */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('constitution')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'constitution'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>1. Конституция на РБ & Разделение на властите</span>
          </button>

          <button
            onClick={() => setActiveTab('eu')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'eu'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>2. Институции и Право на ЕС</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>3. Тренажор „Коя институция?“ ({CIVICS_QUIZ_QUESTIONS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'cases'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>4. Казусно Студио (ДЗИ Модул 3)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BULGARIAN CONSTITUTION & SEPARATION OF POWERS */}
      {activeTab === 'constitution' && (
        <div className="space-y-6">
          {/* Interactive Constitutional Schema */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Чл. 8 от Конституцията на Република България (12 юли 1991 г.)
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  Интерактивна схема на властите и конституционния баланс („Checks & Balances“)
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                Избери институция, за да разгледаш нейните правомощия и матуритетни капани
              </span>
            </div>

            {/* 5-Pillar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              {BG_CONSTITUTION_INSTITUTIONS.map(inst => {
                const isSelected = inst.id === selectedBgInst.id;
                return (
                  <button
                    key={inst.id}
                    onClick={() => setSelectedBgInstId(inst.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border mb-2 ${getBranchBadgeColor(
                          inst.branch
                        )}`}
                      >
                        {inst.branch}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{inst.name}</h3>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] font-semibold text-blue-700">
                      <span>{inst.constitutionalArticles.split('(')[1]?.replace(')', '') || 'КРБ'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Inspector Card for Selected Bulgarian Institution */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${getBranchBadgeColor(
                        selectedBgInst.branch
                      )}`}
                    >
                      {selectedBgInst.branch}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      • {selectedBgInst.constitutionalArticles}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">{selectedBgInst.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Състав</span>
                    <span className="font-bold text-slate-800">{selectedBgInst.composition}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Мандат</span>
                    <span className="font-bold text-slate-800">{selectedBgInst.mandate}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Core Powers */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <Gavel className="w-4 h-4 text-blue-600" />
                    <span>Основни конституционни правомощия</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedBgInst.corePowers.map((power, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{power}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Checks & Balances + Exam Trap */}
                <div className="space-y-4">
                  <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-700" />
                      <span>Взаимен контрол и баланс</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
                      {selectedBgInst.checksAndBalances}
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Внимание — Матуритетен капан!</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                      {selectedBgInst.examTrap}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EUROPEAN UNION INSTITUTIONS & LAW */}
      {activeTab === 'eu' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Чл. 13 от Договора за Европейския съюз (ДЕС) • България в ЕС от 1 януари 2007 г.
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  Институционална архитектура на Европейския съюз и квоти на България
                </h2>
              </div>
            </div>

            {/* 6 EU Institutions Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {EU_INSTITUTIONS.map(inst => {
                const isSelected = inst.id === selectedEuInst.id;
                return (
                  <button
                    key={inst.id}
                    onClick={() => setSelectedEuInstId(inst.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-md">
                        {inst.seat.split(',')[0]}
                      </span>
                      <Building2 className="w-4 h-4 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{inst.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{inst.roleBadge}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected EU Institution Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 mb-1.5">
                    {selectedEuInst.roleBadge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">{selectedEuInst.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Седалище: {selectedEuInst.seat}</p>
                </div>

                <div className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 max-w-md">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                    Представителство на Република България
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {selectedEuInst.bulgariaQuota}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Кого представлява
                    </span>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedEuInst.representation}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                      Ключови функции в ЕС
                    </h4>
                    <ul className="space-y-2">
                      {selectedEuInst.corePowers.map((power, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{power}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Честа грешка на ДЗИ / Олимпиада</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                      {selectedEuInst.examTrap}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Cards: Regulation vs Directive & Council of Europe vs EU */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Регламент на ЕС vs. Директива на ЕС (чл. 288 ДФЕС)</span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
                  <div className="font-bold text-blue-950 mb-1">1. Регламент (Regulation — напр. GDPR, EU AI Act)</div>
                  <p className="text-blue-900 leading-relaxed">
                    Има <strong>общо действие</strong>, задължителен е в своята цялост и се <strong>прилага пряко</strong> във всички 27 държави членки веднага след влизането си в сила, без нужда от национален закон за прехвърляне.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="font-bold text-emerald-950 mb-1">2. Директива (Directive — напр. EAA Директива 2019/882)</div>
                  <p className="text-emerald-900 leading-relaxed">
                    Обвързва държавите членки по отношение на <strong>резултата, който трябва да бъде постигнат</strong> в определен срок, но оставя на националните парламенти избора на формата и средствата (изисква <strong>транспониране</strong> в национален закон).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Златно разграничение: Трите „Съвета“ и Двата „Съда“</span>
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>Европейски съвет (Брюксел, институция на ЕС):</strong> Държавните и правителствените лидери на 27-те страни членки. Задава политическата стратегия, НЕ гласува закони.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <strong>Съвет на Европейския съюз (Брюксел, институция на ЕС):</strong> Ресорните министри на 27-те страни членки. Гласува законите на ЕС заедно с Европейския парламент.
                </div>
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950">
                  <strong>Съвет на Европа (Страсбург — НЕ Е институция на ЕС!):</strong> Отделна международна организация от 46 държави (България е член от 1992 г.), създала <strong>Европейската конвенция за правата на човека (ЕКПЧ)</strong> и <strong>Европейския съд по правата на човека (ЕСПЧ) в Страсбург</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE CIVICS & EU QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Тренажор по Конституция на РБ, ЕС и Права на човека
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Реши казусните въпроси и виж точния член от Конституцията на РБ или Договорите на ЕС.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setQuizVariant(prev => prev + 1);
                  setSelectedAnswers({});
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Нов вариант с казуси (∞) • Вариант #{quizVariant}</span>
              </button>
              <div className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900">
                Резултат: {quizStats.correct} / {quizStats.total} верни
              </div>
              {quizStats.answered > 0 && (
                <button
                  onClick={() => setSelectedAnswers({})}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Нулирай</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <details className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700">
            <summary className="font-bold text-slate-900 cursor-pointer select-none">
              Справка с материала по МОН (Конституция на РБ, Институции на ЕС и Кодекс на труда)
            </summary>
            <div className="mt-2 pt-2 border-t border-slate-200 space-y-1.5 leading-relaxed">
              <p><strong>Разделение на властите (чл. 8 КРБ):</strong> Законодателна (Народно събрание — 240 депутати, 4 г.), Изпълнителна (Министерски съвет) и Съдебна (ВКС, ВАС, Прокуратура и следствие; ВСС се състои от 25 членове с 5-годишен мандат). Президентът е държавен глава (5-годишен мандат), а Конституционният съд (12 съдии, 9-годишен мандат) стои извън трите власти.</p>
              <p><strong>Институции на ЕС и Трудово право (ДИППК):</strong> Регламентите на ЕС имат пряко действие, а директивите се транспонират със закон. По чл. 62 КТ трудовият договор е задължително писмен, със срок за изпитване до 6 месеца (чл. 70 КТ) и минимум 20 работни дни платен годишен отпуск (чл. 155 КТ).</p>
            </div>
          </details>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Всички въпроси (12)' },
              { id: 'constitution', label: 'Конституция на РБ' },
              { id: 'eu', label: 'Европейски съюз' },
              { id: 'human_rights', label: 'Философия & Права на човека' },
              { id: 'labor_dippk', label: 'Трудово право, ЗБУТ & ТЗ (Трета СПК)' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setQuizFilter(f.id as typeof quizFilter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  quizFilter === f.id
                    ? 'bg-brand-sapphire text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Questions List */}
          <div className="space-y-5">
            {filteredQuestions.map((q, index) => {
              const userChoice = selectedAnswers[q.id];
              const isAnswered = userChoice !== undefined;
              const isCorrect = userChoice === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                      Казус #{index + 1} • {q.gradeLevel}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{q.legalBasis}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    „{q.scenario}“
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{q.question}</h3>

                  <div className="grid grid-cols-1 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-blue-400';
                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                        } else if (optIdx === userChoice) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                        } else {
                          btnStyle = 'bg-white/60 border-slate-200 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() =>
                            setSelectedAnswers(prev => ({
                              ...prev,
                              [q.id]: optIdx
                            }))
                          }
                          className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${btnStyle}`}
                        >
                          <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {['А', 'Б', 'В', 'Г'][optIdx]}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div
                      className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50/90 border-amber-200 text-amber-950'
                      }`}
                    >
                      <div className="font-bold mb-1">
                        {isCorrect ? 'Отличен отговор!' : 'Правен коментар и обосновка:'} ({q.legalBasis})
                      </div>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: CASE STUDY STUDIO (DZI MODULE 3) */}
      {activeTab === 'cases' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  ДЗИ Философия и Гражданско образование • Модул 3
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  Студио за анализ на правно-граждански казус с терминологичен одитор
                </h2>
              </div>

              <details className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700">
            <summary className="font-bold text-slate-900 cursor-pointer select-none">
              Справка с материала по МОН (Конституция на РБ, Институции на ЕС и Кодекс на труда)
            </summary>
            <div className="mt-2 pt-2 border-t border-slate-200 space-y-1.5 leading-relaxed">
              <p><strong>Разделение на властите (чл. 8 КРБ):</strong> Законодателна (Народно събрание — 240 депутати, 4 г.), Изпълнителна (Министерски съвет) и Съдебна (ВКС, ВАС, Прокуратура и следствие; ВСС се състои от 25 членове с 5-годишен мандат). Президентът е държавен глава (5-годишен мандат), а Конституционният съд (12 съдии, 9-годишен мандат) стои извън трите власти.</p>
              <p><strong>Институции на ЕС и Трудово право (ДИППК):</strong> Регламентите на ЕС имат пряко действие, а директивите се транспонират със закон. По чл. 62 КТ трудовият договор е задължително писмен, със срок за изпитване до 6 месеца (чл. 70 КТ) и минимум 20 работни дни платен годишен отпуск (чл. 155 КТ).</p>
            </div>
          </details>
          <div className="flex flex-wrap gap-2">
                {CIVICS_CASE_TASKS.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeCase.id === c.id
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Казус #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Description & Questions */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{activeCase.title}</h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                  {activeCase.gradeLevel}
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                {activeCase.caseText}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Въпроси за аргументиран отговор:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm font-medium text-slate-800">
                  {activeCase.questions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Editor + Live Concept Auditor */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Твоята писмена аргументация по казуса:
                </label>
                <textarea
                  rows={8}
                  value={currentDraft}
                  onChange={e =>
                    setCaseDrafts(prev => ({
                      ...prev,
                      [activeCase.id]: e.target.value
                    }))
                  }
                  placeholder="Напиши своето решение тук, като използваш ключовите конституционни и европейски понятия вдясно..."
                  className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-500">
                    Брой думи: <strong className="text-slate-900">{draftAudit.wordCount}</strong> (препоръчителен обем: 80–150 думи)
                  </span>

                  <button
                    onClick={() =>
                      setShowModelSolution(prev => ({
                        ...prev,
                        [activeCase.id]: !prev[activeCase.id]
                      }))
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>
                      {showModelSolution[activeCase.id]
                        ? 'Скрий еталонното решение за 6.00'
                        : 'Покажи еталонно решение за Отличен 6.00'}
                    </span>
                  </button>
                </div>

                {showModelSolution[activeCase.id] && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2 leading-relaxed">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Еталонно решение по критериите на МОН за Отличен 6.00:</span>
                    </div>
                    <p>{activeCase.modelSolution}</p>
                  </div>
                )}
              </div>

              {/* Concept Auditor Panel */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Терминологичен одитор за 6.00
                  </h4>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-blue-700">
                      {draftAudit.matchedConcepts.length} / {activeCase.requiredConcepts.length}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      ({draftAudit.coveragePercent}% покритие на понятията)
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Ключови правни и граждански понятия:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCase.requiredConcepts.map(concept => {
                      const isUsed = draftAudit.matchedConcepts.includes(concept);
                      return (
                        <span
                          key={concept}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                            isUsed
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          {isUsed ? '✓ ' : '+ '}
                          {concept}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CivicsEuLab;
