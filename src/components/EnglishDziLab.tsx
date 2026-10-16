import React, { useState, useMemo } from 'react';
import {
  Globe,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  PenTool,
  AlertTriangle,
  RotateCcw,
  Award,
  Copy,
  Check,
  PlusCircle,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import {
  ENGLISH_TRANSFORMATIONS,
  ENGLISH_PHRASAL_VERBS,
  ENGLISH_WRITING_BLUEPRINTS,
  ACADEMIC_LINKING_WORDS
} from '../data/englishDziDatabase';
import { studyProgressService } from '../services/studyProgressService';
import { evaluateEnglishWritingWithGemini, type EnglishWritingAiEvaluation } from '../services/geminiService';

type EnglishLabTab = 'transformations' | 'phrasal' | 'writing';

const INFORMAL_CONTRACTIONS = [
  "don't",
  "can't",
  "won't",
  "isn't",
  "aren't",
  "wasn't",
  "weren't",
  "haven't",
  "hasn't",
  "hadn't",
  "wouldn't",
  "couldn't",
  "shouldn't",
  "didn't",
  "doesn't",
  "i'm",
  "you're",
  "we're",
  "they're",
  "it's",
  "that's",
  "wanna",
  "gonna",
  "kids",
  "stuff"
];

export const EnglishDziLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EnglishLabTab>('transformations');

  // Tab 1: Sentence Transformations state
  const [selectedCefr, setSelectedCefr] = useState<'ALL' | 'B1.1' | 'B2' | 'C1 / ESP'>('ALL');
  const [trAnswers, setTrAnswers] = useState<Record<string, number>>({});

  // Tab 2: Phrasal Verbs state
  const [pvAnswers, setPvAnswers] = useState<Record<string, number>>({});
  const [showPvReference, setShowPvReference] = useState(false);

  // Tab 3: Writing Studio state
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(ENGLISH_WRITING_BLUEPRINTS[0].id);
  const [draftText, setDraftText] = useState<string>(ENGLISH_WRITING_BLUEPRINTS[0].modelOpening);
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);
  const [aiEngEval, setAiEngEval] = useState<EnglishWritingAiEvaluation | null>(null);
  const [isAiEngLoading, setIsAiEngLoading] = useState<boolean>(false);
  const [aiEngError, setAiEngError] = useState<string | null>(null);

  const filteredTransformations = useMemo(() => {
    if (selectedCefr === 'ALL') return ENGLISH_TRANSFORMATIONS;
    return ENGLISH_TRANSFORMATIONS.filter((item) => item.cefrLevel === selectedCefr);
  }, [selectedCefr]);

  const handleSelectTransformation = (itemId: string, optionIdx: number) => {
    if (trAnswers[itemId] !== undefined) return;
    setTrAnswers((prev) => ({ ...prev, [itemId]: optionIdx }));

    const item = ENGLISH_TRANSFORMATIONS.find((t) => t.id === itemId);
    if (!item) return;

    const isCorrect = optionIdx === item.correctIndex;
    studyProgressService.recordGrammarAttempt(isCorrect, isCorrect ? 1 : 0);
  };

  const handleSelectPhrasal = (pvId: string, optionIdx: number) => {
    if (pvAnswers[pvId] !== undefined) return;
    setPvAnswers((prev) => ({ ...prev, [pvId]: optionIdx }));

    const item = ENGLISH_PHRASAL_VERBS.find((p) => p.id === pvId);
    if (!item) return;

    const isCorrect = optionIdx === item.correctIndex;
    studyProgressService.recordGrammarAttempt(isCorrect, isCorrect ? 1 : 0);
  };

  const activeBlueprint = useMemo(
    () => ENGLISH_WRITING_BLUEPRINTS.find((b) => b.id === selectedBlueprintId) || ENGLISH_WRITING_BLUEPRINTS[0],
    [selectedBlueprintId]
  );

  // Live Essay & Register Auditor calculations
  const writingMetrics = useMemo(() => {
    const trimmed = draftText.trim();
    const words = trimmed ? trimmed.split(/\s+/) : [];
    const wordCount = words.length;
    const lowerText = trimmed.toLowerCase();

    const detectedLinkingWords: string[] = [];
    for (const group of ACADEMIC_LINKING_WORDS) {
      for (const lw of group.words) {
        if (lowerText.includes(lw)) {
          detectedLinkingWords.push(lw);
        }
      }
    }

    const detectedContractions: string[] = [];
    for (const c of INFORMAL_CONTRACTIONS) {
      const regex = new RegExp(`\\b${c.replace("'", "['’]")}\\b`, 'i');
      if (regex.test(lowerText)) {
        detectedContractions.push(c);
      }
    }

    const minWords = activeBlueprint.wordCountRange.min;
    const maxWords = activeBlueprint.wordCountRange.max;
    const isWithinWordLimit = wordCount >= minWords && wordCount <= maxWords;

    return {
      wordCount,
      detectedLinkingWords,
      detectedContractions,
      isWithinWordLimit,
      minWords,
      maxWords
    };
  }, [draftText, activeBlueprint]);

  const handleInsertPhrase = (phrase: string) => {
    setDraftText((prev) => {
      const sep = prev.trim().length > 0 ? (prev.endsWith('\n') ? '' : ' ') : '';
      return `${prev}${sep}${phrase}`;
    });
    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 1500);
  };

  const trScore = useMemo(() => {
    let correct = 0;
    let totalAnswered = 0;
    for (const item of ENGLISH_TRANSFORMATIONS) {
      if (trAnswers[item.id] !== undefined) {
        totalAnswered++;
        if (trAnswers[item.id] === item.correctIndex) correct++;
      }
    }
    return { correct, totalAnswered };
  }, [trAnswers]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>ДЗИ & НВО Английски език • CEFR B1.1 & B2</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Лаборатория по Английски език за Матура (B1.1 / B2)
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Овладей компонентите с най-висока тежест на ДЗИ по английски език: <strong>Sentence Transformations (Use of English)</strong>, фразеологични глаголи за B2 и <strong>Writing Studio</strong> с жив одитор на официалния регистър и броя думи по стандарта на МОН.
            </p>
          </div>

          {/* Score Pill */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-4 self-start lg:self-auto">
            <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-blue-200 font-bold">
                Решени трансформации
              </div>
              <div className="text-xl font-black text-white">
                {trScore.correct} / {ENGLISH_TRANSFORMATIONS.length}{' '}
                <span className="text-xs font-semibold text-sky-300">верни</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setActiveTab('transformations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'transformations'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>1. Sentence Transformations (Use of English)</span>
        </button>

        <button
          onClick={() => setActiveTab('phrasal')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'phrasal'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>2. Phrasal Verbs & B2 Синоними</span>
        </button>

        <button
          onClick={() => setActiveTab('writing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'writing'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>3. Writing Studio & Одитор (Есе / Писмо)</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: SENTENCE TRANSFORMATIONS */}
      {/* ===================================================================== */}
      {activeTab === 'transformations' && (
        <div className="space-y-5">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                Ниво по CEFR:
              </span>
              {(['ALL', 'B1.1', 'B2', 'C1 / ESP'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedCefr(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    selectedCefr === lvl
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lvl === 'ALL'
                    ? 'Всички нива (B1.1 + B2 + C1/ESP)'
                    : lvl === 'B1.1'
                    ? 'Ниво B1.1 (Общообр. ДЗИ / НВО 10)'
                    : lvl === 'B2'
                    ? 'Ниво B2 (Профилирана ДЗИ)'
                    : 'Ниво C1 / ESP (Професионален ИТ & Инженерен)'}
                </button>
              ))}
            </div>

            {trScore.totalAnswered > 0 && (
              <button
                onClick={() => setTrAnswers({})}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Нулирай отговорите</span>
              </button>
            )}
          </div>

          {/* Transformation Cards */}
          <div className="grid grid-cols-1 gap-4">
            {filteredTransformations.map((item, idx) => {
              const userAns = trAnswers[item.id];
              const isAnswered = userAns !== undefined;
              const isCorrect = userAns === item.correctIndex;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center border border-blue-200">
                        #{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {item.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                          item.cefrLevel === 'B2'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        CEFR {item.cefrLevel}
                      </span>
                    </div>

                    <div className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs font-black tracking-wider">
                      KEY WORD: {item.keyWord}
                    </div>
                  </div>

                  {/* Original & Target Sentence Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="text-xs text-slate-500 font-semibold">Оригинално изречение:</div>
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      “{item.originalSentence}”
                    </div>
                    <div className="pt-2 border-t border-slate-200/80 text-xs sm:text-sm text-slate-800 font-medium">
                      <span className="text-slate-500 mr-1.5">Преобразувано:</span>
                      <span className="font-semibold">{item.promptPrefix}</span>{' '}
                      <span className="inline-block px-3 py-0.5 rounded bg-blue-100 text-blue-900 font-mono font-bold border border-blue-300">
                        {isAnswered ? item.options[userAns] : '________________'}
                      </span>{' '}
                      <span className="font-semibold">{item.promptSuffix}</span>
                    </div>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.options.map((opt, optIdx) => {
                      let btnStyle =
                        'bg-white hover:bg-blue-50/50 text-slate-800 border-slate-200 hover:border-blue-300';
                      if (isAnswered) {
                        if (optIdx === item.correctIndex) {
                          btnStyle = 'bg-emerald-50 text-emerald-950 border-emerald-400 font-bold';
                        } else if (optIdx === userAns) {
                          btnStyle = 'bg-rose-50 text-rose-900 border-rose-300 line-through';
                        } else {
                          btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-70';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          disabled={isAnswered}
                          onClick={() => handleSelectTransformation(item.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <span className="font-mono">
                            {item.promptPrefix} <strong>{opt}</strong> {item.promptSuffix}
                          </span>
                          {isAnswered && optIdx === item.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          )}
                          {isAnswered && optIdx === userAns && optIdx !== item.correctIndex && (
                            <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Detailed Explanation & MON Exam Trap */}
                  {isAnswered && (
                    <div
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isCorrect
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50/80 border-amber-200 text-slate-900'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                        )}
                        <span>Граматична формула: {item.grammarRule}</span>
                      </div>
                      <p className="leading-relaxed">{item.explanationBg}</p>
                      <div className="pt-1.5 border-t border-slate-200/60 text-amber-900 font-medium flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Капан на МОН:</strong> {item.monExamTrap}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: PHRASAL VERBS & B2 FORMAL EQUIVALENTS */}
      {/* ===================================================================== */}
      {activeTab === 'phrasal' && (
        <div className="space-y-5">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Фразеологични глаголи (Phrasal Verbs) & Академични синоними за B2
              </h3>
              <p className="text-xs text-slate-500">
                Често срещани в компонента „Четене и езикови задачи“ (Multiple Choice Cloze) на НВО 10 и ДЗИ 12
              </p>
            </div>
            <button
              onClick={() => setShowPvReference(!showPvReference)}
              className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-colors"
            >
              {showPvReference ? 'Скрий таблицата със синоними' : 'Покажи таблица: Phrasal Verb ➔ Formal B2 Verb'}
            </button>
          </div>

          {showPvReference && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Phrasal Verb</th>
                      <th className="p-3">Официален синоним (Formal B2)</th>
                      <th className="p-3">Значение на български</th>
                      <th className="p-3">Ниво</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {ENGLISH_PHRASAL_VERBS.map((pv) => (
                      <tr key={pv.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-indigo-700">{pv.phrasalVerb}</td>
                        <td className="p-3 font-semibold text-slate-800">{pv.formalEquivalent}</td>
                        <td className="p-3 text-slate-600">{pv.meaningBg}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-bold text-[10px]">
                            {pv.cefrLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ENGLISH_PHRASAL_VERBS.map((pv, idx) => {
              const userAns = pvAnswers[pv.id];
              const isAnswered = userAns !== undefined;

              return (
                <div
                  key={pv.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-600">
                        Задача #{idx + 1} • CEFR {pv.cefrLevel}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Синоним: <strong className="text-slate-800">{pv.formalEquivalent}</strong>
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 leading-relaxed">
                      “{pv.contextSentence}”
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {pv.options.map((opt, optIdx) => {
                        let style = 'bg-slate-50 hover:bg-indigo-50 text-slate-800 border-slate-200';
                        if (isAnswered) {
                          if (optIdx === pv.correctIndex) {
                            style = 'bg-emerald-50 text-emerald-900 border-emerald-400 font-bold';
                          } else if (optIdx === userAns) {
                            style = 'bg-rose-50 text-rose-900 border-rose-300 line-through';
                          } else {
                            style = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
                          }
                        }
                        return (
                          <button
                            key={opt}
                            disabled={isAnswered}
                            onClick={() => handleSelectPhrasal(pv.id, optIdx)}
                            className={`px-3 py-2 rounded-xl border text-xs font-mono transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isAnswered && (
                    <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-1">
                      <div className="font-bold">
                        {pv.phrasalVerb} = {pv.meaningBg}
                      </div>
                      <p className="text-[11px] text-indigo-900">{pv.monTip}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: WRITING STUDIO & LIVE MON AUDITOR */}
      {/* ===================================================================== */}
      {activeTab === 'writing' && (
        <div className="space-y-6">
          {/* Genre Selector */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {ENGLISH_WRITING_BLUEPRINTS.map((bp) => (
                <button
                  key={bp.id}
                  onClick={() => {
                    setSelectedBlueprintId(bp.id);
                    setDraftText(bp.modelOpening);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedBlueprintId === bp.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {bp.genre} ({bp.cefrLevel})
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Обем по МОН: {activeBlueprint.wordCountRange.label}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Structure Blueprint & Click-to-Insert Phrases */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
                <h3 className="text-base font-extrabold text-slate-900">
                  {activeBlueprint.titleBg}
                </h3>

                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1">
                  <div className="font-bold text-blue-900">Примерна изпитна тема (МОН):</div>
                  <p className="italic">“{activeBlueprint.modelPrompt}”</p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Критерии на проверяващите за максимален брой точки:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeBlueprint.monCriteria.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Paragraph-by-Paragraph Academic Phrases */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Академични фрази по абзаци (кликни, за да вмъкнеш в текста):
                  </div>
                  {activeBlueprint.structureBlocks.map((block) => (
                    <div
                      key={block.paragraphTitle}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <div className="font-bold text-xs text-slate-900">{block.paragraphTitle}</div>
                      <p className="text-[11px] text-slate-500">{block.purposeBg}</p>
                      <div className="space-y-1.5 pt-1">
                        {block.phrasesEn.map((phrase) => (
                          <button
                            key={phrase}
                            type="button"
                            onClick={() => handleInsertPhrase(phrase)}
                            className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-mono text-slate-800 flex items-center justify-between gap-2 transition-colors group"
                          >
                            <span>{phrase}</span>
                            {copiedPhrase === phrase ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            ) : (
                              <PlusCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Live Essay & Register Auditor */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Жив Одитор за Writing (Word Count & Register Check)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Напиши своето есе или официално писмо и провери автоматично критериите на МОН
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(draftText)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                    title="Копирай текста"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Копирай</span>
                  </button>
                </div>

                <textarea
                  rows={10}
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  placeholder="Write your essay or formal letter in English here..."
                  className="w-full p-4 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 leading-relaxed"
                />

                {/* Live Audit Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* 1. Word Count Indicator */}
                  <div
                    className={`p-3 rounded-xl border text-xs ${
                      writingMetrics.isWithinWordLimit
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="font-bold uppercase text-[10px] tracking-wider opacity-75">
                      Брой думи (Word Count)
                    </div>
                    <div className="text-lg font-black mt-0.5">
                      {writingMetrics.wordCount} думи
                    </div>
                    <div className="text-[11px] mt-0.5">
                      Цел: {writingMetrics.minWords}–{writingMetrics.maxWords} думи
                    </div>
                  </div>

                  {/* 2. Linking Words Detector */}
                  <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-950 text-xs">
                    <div className="font-bold uppercase text-[10px] tracking-wider opacity-75">
                      Linking Words (B2)
                    </div>
                    <div className="text-lg font-black mt-0.5">
                      {writingMetrics.detectedLinkingWords.length} открити
                    </div>
                    <div className="text-[11px] mt-0.5 truncate">
                      {writingMetrics.detectedLinkingWords.length > 0
                        ? writingMetrics.detectedLinkingWords.join(', ')
                        : 'Добавете however, furthermore...'}
                    </div>
                  </div>

                  {/* 3. Formal Register Check */}
                  <div
                    className={`p-3 rounded-xl border text-xs ${
                      writingMetrics.detectedContractions.length === 0
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="font-bold uppercase text-[10px] tracking-wider opacity-75">
                      Академичен регистър
                    </div>
                    <div className="text-sm font-black mt-1">
                      {writingMetrics.detectedContractions.length === 0
                        ? '✓ Официален стил (Без съкращения)'
                        : `⚠ ${writingMetrics.detectedContractions.length} разговорни форми`}
                    </div>
                    {writingMetrics.detectedContractions.length > 0 && (
                      <div className="text-[11px] mt-0.5">
                        Заменете: {writingMetrics.detectedContractions.join(', ')} с пълни форми!
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Linking Words Bank */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="text-xs font-bold text-slate-800">
                    Бърза банка със свързващи думи за 6.00 (кликни за добавяне):
                  </div>
                  <div className="space-y-2">
                    {ACADEMIC_LINKING_WORDS.map((group) => (
                      <div key={group.category} className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-slate-500 mr-1">
                          {group.category}:
                        </span>
                        {group.words.map((w) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() =>
                              handleInsertPhrase(w.charAt(0).toUpperCase() + w.slice(1) + ', ')
                            }
                            className="px-2 py-0.5 rounded-md bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-[11px] font-mono transition-colors"
                          >
                            + {w}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gemini 3.8 Flash AI Examiner for English Writing */}
                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!draftText.trim() || isAiEngLoading) return;
                      setIsAiEngLoading(true);
                      setAiEngError(null);
                      try {
                        const res = await evaluateEnglishWritingWithGemini({
                          genre: activeBlueprint.genre,
                          cefrLevel: activeBlueprint.cefrLevel,
                          prompt: activeBlueprint.modelPrompt,
                          studentDraft: draftText.trim(),
                          wordCountRange: activeBlueprint.wordCountRange.label
                        });
                        setAiEngEval(res);
                      } catch (err) {
                        setAiEngError(err instanceof Error ? err.message : 'Грешка при свързване с Gemini 3.8 Flash.');
                      } finally {
                        setIsAiEngLoading(false);
                      }
                    }}
                    disabled={!draftText.trim() || isAiEngLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
                  >
                    {isAiEngLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>
                      {isAiEngLoading
                        ? 'Проверява се по МОН / Cambridge (CEFR)...'
                        : `🤖 Оцени текста с Gemini 3.8 Flash (${activeBlueprint.cefrLevel} • 30 т.)`}
                    </span>
                  </button>

                  {aiEngError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                      {aiEngError}
                    </div>
                  )}

                  {aiEngEval && (
                    <div className="p-4 rounded-2xl bg-indigo-950 text-white border border-indigo-700 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>Рецензия от Проверителя (Gemini 3.8 Flash):</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                          {aiEngEval.scoreLabel}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-100 leading-relaxed">{aiEngEval.feedbackBg}</p>
                      {aiEngEval.grammarCorrections.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-[11px] font-bold text-amber-300 uppercase">📌 Езикови и стилови препоръки:</div>
                          {aiEngEval.grammarCorrections.map((c, idx) => (
                            <div key={idx} className="text-xs text-slate-200">• {c}</div>
                          ))}
                        </div>
                      )}
                      <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs text-emerald-200 font-mono leading-relaxed">
                        <strong className="block font-sans text-white mb-1">✨ Upgraded C1/B2 Model Version:</strong>
                        {aiEngEval.upgradedModelText}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
