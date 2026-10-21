import React, { useState, useEffect } from 'react';
import {
  HISTORICAL_CASES_DATA,
  type HistoricalSource
} from '../data/historicalCasesData';
import {
  Scale,
  BookOpen,
  Scroll,
  PenTool,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Volume2,
  VolumeX,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Save,
  Bookmark,
  BookMarked,
  Library,
  RefreshCw,
  XCircle,
  Sparkles,
  Loader2
} from 'lucide-react';
import {
  ESSAY_MIN_LENGTH,
  STRUCTURAL_ANALYSIS_LABEL,
  evaluateEssayWithGemini,
  type EssayEvaluationResult
} from '../services/geminiService';
import { generateHistoricalCaseQuiz } from '../services/infiniteLabGenerators';

interface HistoricalCasesViewProps {
  onSelectLessonByEra?: (era: string) => void;
}

export const HistoricalCasesView: React.FC<HistoricalCasesViewProps> = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(HISTORICAL_CASES_DATA[0].id);
  const [selectedEpoch, setSelectedEpoch] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Essay draft scratchpad state per case
  const [essayDraft, setEssayDraft] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [aiHistoryEval, setAiHistoryEval] = useState<EssayEvaluationResult | null>(null);
  const [isAiHistoryLoading, setIsAiHistoryLoading] = useState<boolean>(false);
  const [aiHistoryError, setAiHistoryError] = useState<string | null>(null);
  const [checklistState, setChecklistState] = useState<{ [key: string]: boolean }>({
    thesis: false,
    facts: false,
    sources: false,
    bothSides: false,
    conclusion: false
  });

  // Audio Speech Synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [caseQuizVariant, setCaseQuizVariant] = useState<number>(1);
  const [caseQuizAnswers, setCaseQuizAnswers] = useState<Record<string, number>>({});

  // Active Case Study
  const activeCase = HISTORICAL_CASES_DATA.find((c) => c.id === selectedCaseId) || HISTORICAL_CASES_DATA[0];
  const caseQuizQuestions = generateHistoricalCaseQuiz(activeCase, HISTORICAL_CASES_DATA, caseQuizVariant);

  // Load saved draft and checklist from localStorage when activeCase changes
  useEffect(() => {
    const savedDraft = localStorage.getItem(`studybg_essay_draft_${activeCase.id}`);
    setEssayDraft(savedDraft || '');
    setAiHistoryEval(null);
    setAiHistoryError(null);

    const savedChecklist = localStorage.getItem(`studybg_essay_checklist_${activeCase.id}`);
    if (savedChecklist) {
      try {
        setChecklistState(JSON.parse(savedChecklist));
      } catch {
        setChecklistState({
          thesis: false,
          facts: false,
          sources: false,
          bothSides: false,
          conclusion: false
        });
      }
    } else {
      setChecklistState({
        thesis: false,
        facts: false,
        sources: false,
        bothSides: false,
        conclusion: false
      });
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [activeCase.id]);

  // Спира гласовото четене, когато потребителят напусне изгледа
  useEffect(() => () => {
    window.speechSynthesis?.cancel();
  }, []);

  // Handle Save Draft to LocalStorage
  const handleSaveDraft = () => {
    localStorage.setItem(`studybg_essay_draft_${activeCase.id}`, essayDraft);
    localStorage.setItem(`studybg_essay_checklist_${activeCase.id}`, JSON.stringify(checklistState));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Handle Copy Draft to Clipboard
  const handleCopyDraft = () => {
    if (!essayDraft) return;
    navigator.clipboard.writeText(
      `【Историческо есе / Анализ】\nТема: ${activeCase.title}\n\n${essayDraft}\n\n(Подготвено чрез StudyBG • https://studybg.vercel.app)`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Toggle checklist item
  const toggleChecklist = (key: string) => {
    const next = { ...checklistState, [key]: !checklistState[key] };
    setChecklistState(next);
    localStorage.setItem(`studybg_essay_checklist_${activeCase.id}`, JSON.stringify(next));
  };

  // Speech narration
  const handleToggleAudio = () => {
    if (!window.speechSynthesis) {
      alert('Вашият браузър не поддържа синтезиран глас.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const narrationText = `${activeCase.title}. Епоха: ${activeCase.epochLabel}. Историческа дилема: ${activeCase.historicalDilemma}. Обобщаващ синтез: ${activeCase.synthesisConclusion}`;
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Filter cases by epoch and search query
  const filteredCases = HISTORICAL_CASES_DATA.filter((item) => {
    const matchesEpoch = selectedEpoch === 'all' || item.epoch === selectedEpoch;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.keyFigure.toLowerCase().includes(q) ||
      item.epochLabel.toLowerCase().includes(q) ||
      item.historicalDilemma.toLowerCase().includes(q);
    return matchesEpoch && matchesQuery;
  });

  const wordCount = essayDraft.trim() ? essayDraft.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-8">
      {/* Top Banner & Introduction */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-900">
              <Scale className="w-3.5 h-3.5 text-slate-700" />
              <span>Казуси за ДЗИ (11.–12. кл.) • Анализ на исторически извори & Есе</span>
              <span className="text-[10px] bg-slate-200/70 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                {HISTORICAL_CASES_DATA.length} академични казуса
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Научи се да мислиш като историк, а не просто да зубриш дати
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Официална подготовка за трети модул на ДЗИ по история (анализ на исторически извор и есе/отговор на исторически въпрос).
              Всеки казус съдържа автентични документи с точни научни сигнатури (ГИБИ, ЛИБИ, ЦДА), сблъсък на тези, композиционен план
              и интерактивен тренажор за чернова с критериите на МОН.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleToggleAudio}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isPlayingAudio
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>Спри аудиото</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-slate-600" />
                  <span>Чуй казуса с аудио</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'Всички епохи' },
              { id: 'first_kingdom', label: 'Първо царство (681–1018)' },
              { id: 'second_kingdom', label: 'Второ царство (1185–1396)' },
              { id: 'revival', label: 'Възраждане (XVIII–XIX в.)' },
              { id: 'modern', label: 'Нова история (1878–1945)' }
            ].map((epoch) => (
              <button
                key={epoch.id}
                onClick={() => setSelectedEpoch(epoch.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedEpoch === epoch.id
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {epoch.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Търси казус, владетел..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: List of Case Studies */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Списък на казусите ({filteredCases.length})
            </span>
          </div>

          <div className="space-y-2">
            {filteredCases.map((c) => {
              const isSelected = c.id === activeCase.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all border ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {c.periodYears}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.epoch === 'first_kingdom'
                          ? 'bg-amber-100 text-amber-800'
                          : c.epoch === 'second_kingdom'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.epoch === 'revival'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {c.epochLabel.split(' ')[0]}
                    </span>
                  </div>

                  <h3
                    className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${
                      isSelected ? 'text-blue-900' : 'text-slate-900'
                    }`}
                  >
                    {c.shortTitle}
                  </h3>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="truncate max-w-[190px]">
                      {c.keyFigure}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Case Study Deep Dive */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Case Study Header & Dilemma */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                {activeCase.epochLabel}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                Период: {activeCase.periodYears}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                Фигура: {activeCase.keyFigure}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-snug">
              {activeCase.title}
            </h1>

            {/* Historical Dilemma Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Scale className="w-4 h-4 text-amber-700" />
                <span>Историческата дилема</span>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {activeCase.historicalDilemma}
              </p>
            </div>

            {/* Context Background */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Исторически контекст
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeCase.contextBackground}
              </p>
            </div>
          </div>

          {/* 2. Primary Historical Sources (Автентични документи) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Scroll className="w-4 h-4 text-amber-700" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Автентични исторически извори & Свидетелства ({activeCase.primarySources.length})
              </h3>
            </div>

            <div className="space-y-4">
              {activeCase.primarySources.map((source: HistoricalSource, idx: number) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3 font-serif"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200/70 pb-2 font-sans">
                    <span className="text-xs font-bold text-slate-900">
                      📜 {source.title}
                    </span>
                    <span className="text-[11px] text-slate-500 italic">
                      Автор: {source.authorOrOrigin}
                    </span>
                  </div>

                  <blockquote className="text-xs sm:text-sm text-slate-800 italic leading-relaxed pl-3 border-l-2 border-amber-600">
                    {source.originalExcerpt}
                  </blockquote>

                  <div className="text-[11px] font-sans text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800">Критичен анализ на извора: </span>
                    {source.sourceContext}
                  </div>

                  {source.exactCitation && (
                    <div className="text-[11px] font-sans text-amber-950 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/80 flex items-start gap-2">
                      <Bookmark className="w-3.5 h-3.5 text-amber-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-amber-900">Научна сигнатура: </span>
                        <span className="font-mono text-[10.5px] text-amber-950">{source.exactCitation}</span>
                      </div>
                    </div>
                  )}

                  {source.bibliographyRef && (
                    <div className="text-[11px] font-sans text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
                      <BookMarked className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-800">Академично изследване: </span>
                        <span className="italic text-slate-600">{source.bibliographyRef}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. The Core Debate: Thesis A vs Thesis B */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Scale className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Сблъсък на гледните точки: Теза срещу Антитеза
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Thesis Side A */}
              <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-2xs space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{activeCase.thesisSideA.perspectiveTitle}</span>
                </div>

                <ul className="space-y-2.5 pt-1">
                  {activeCase.thesisSideA.coreArguments.map((arg, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <span>{arg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Thesis Side B */}
              <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                  <Scale className="w-3.5 h-3.5 text-amber-700" />
                  <span>{activeCase.thesisSideB.perspectiveTitle}</span>
                </div>

                <ul className="space-y-2.5 pt-1">
                  {activeCase.thesisSideB.coreArguments.map((arg, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <span>{arg}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Synthesis Conclusion Card */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Обобщаващ академичен синтез (Исторически консенсус)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeCase.synthesisConclusion}
              </p>
            </div>
          </div>

          {/* 4. Key Historical Concepts */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Ключови исторически понятия за ДЗИ и изпити
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeCase.keyConcepts.map((concept, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold text-slate-900">{concept.term}</div>
                  <div className="text-[11px] text-slate-600 leading-relaxed">{concept.definition}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Complete Sample Essay Outline */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Готов композиционен план за историческо есе
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Формат за ДЗИ & Олимпиада
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">1. Увод (Въвеждане в епохата):</span>
                {activeCase.sampleEssayOutline.introduction}
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950">
                <span className="font-bold text-blue-900 block mb-1">2. Формулиране на тезата (Ядро на съчинението):</span>
                <p className="font-medium">{activeCase.sampleEssayOutline.thesisStatement}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">3. Изложение с доказателствени подтези:</span>
                <div className="pl-3 border-l-2 border-blue-500 space-y-2">
                  <div>
                    <span className="font-semibold text-slate-800">Аргумент 1: </span>
                    {activeCase.sampleEssayOutline.argumentBlock1}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Аргумент 2: </span>
                    {activeCase.sampleEssayOutline.argumentBlock2}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Аргумент 3: </span>
                    {activeCase.sampleEssayOutline.argumentBlock3}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">4. Заключение (Синтез и историческа поука):</span>
                {activeCase.sampleEssayOutline.conclusion}
              </div>
            </div>

            {/* Suggested Essay Prompts */}
            <div className="pt-2">
              <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Препоръчани теми за самостоятелно писане:
              </h5>
              <div className="space-y-1.5">
                {activeCase.essayPrompts.map((prompt, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/70 text-amber-950 text-xs font-semibold flex items-center gap-2"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{prompt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Bibliography & Archival Records */}
          {activeCase.academicBibliography && activeCase.academicBibliography.length > 0 && (
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Library className="w-4 h-4 text-slate-700" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Академична библиография & Първични извори
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 w-fit">
                  Препоръчана литература за ДЗИ & Олимпиада
                </span>
              </div>

              <div className="space-y-2">
                {activeCase.academicBibliography.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 font-serif leading-relaxed"
                  >
                    <BookMarked className="w-3.5 h-3.5 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Interactive Essay Scratchpad & Self-Checker */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Твоята чернова за есе / разсъждение
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Пиши свободно своите тези по този казус. Текстът се запазва автоматично в браузъра ти.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {wordCount} думи
                </span>
                <button
                  onClick={handleSaveDraft}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
                >
                  <Save className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isSaved ? 'Запазено!' : 'Запази'}</span>
                </button>
                <button
                  onClick={handleCopyDraft}
                  disabled={!essayDraft.trim()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Копирано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Копирай</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              rows={8}
              value={essayDraft}
              onChange={(e) => setEssayDraft(e.target.value)}
              placeholder="Започни с формулиране на ясна теза: Според мен... Използвай доказателства от документите по-горе..."
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans leading-relaxed"
            />

            {/* AI Historical Essay Evaluator */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <button
                onClick={async () => {
                  setIsAiHistoryLoading(true);
                  setAiHistoryError(null);
                  try {
                    const res = await evaluateEssayWithGemini(
                      essayDraft,
                      `${activeCase.title} — ${activeCase.historicalDilemma}`,
                      [
                        { id: 'c1', name: 'Теза и историческа аргументация', maxPoints: 10, description: 'Ясно формулирана историческа теза и последователна защита' },
                        { id: 'c2', name: 'Точна фактология, хронология и понятия', maxPoints: 8, description: 'Коректно използване на дати, личности и исторически термини' },
                        { id: 'c3', name: 'Критичен анализ и цитиране на изворите', maxPoints: 7, description: 'Позоваване на приложените исторически документи и контекст' },
                        { id: 'c4', name: 'Композиция и академичен стил', maxPoints: 5, description: 'Логическа структура (увод, теза, аргументи, заключение) и езикова норма' },
                      ]
                    );
                    setAiHistoryEval(res);
                  } catch (err) {
                    setAiHistoryError(err instanceof Error ? err.message : 'Възникна грешка при оценяването.');
                  } finally {
                    setIsAiHistoryLoading(false);
                  }
                }}
                disabled={isAiHistoryLoading || essayDraft.trim().length < ESSAY_MIN_LENGTH}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                {isAiHistoryLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Проверяваме есето...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Оцени историческото есе (30 т.)</span>
                  </>
                )}
              </button>
              <span className="text-[11px] text-slate-500">
                По 4-те критерия за ДЗИ по История и цивилизации (макс. 30 т.)
              </span>
            </div>

            {aiHistoryError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800">
                {aiHistoryError}
              </div>
            )}

            {aiHistoryEval && (
              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  aiHistoryEval.mode === 'ai' ? 'bg-blue-50/90 border-blue-200' : 'bg-amber-50/80 border-amber-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blue-200 pb-2.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    {aiHistoryEval.mode === 'ai' ? 'AI рецензия (ориентировъчна) по 4-те критерия' : STRUCTURAL_ANALYSIS_LABEL}
                  </span>
                  {aiHistoryEval.mode === 'ai' && aiHistoryEval.totalScore !== null && (
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold">
                      Резултат: {aiHistoryEval.totalScore} / 30 т.
                    </span>
                  )}
                </div>
                {aiHistoryEval.fallbackReason && (
                  <p className="text-[11px] text-amber-900">
                    AI оценката не е налична: {aiHistoryEval.fallbackReason}
                  </p>
                )}
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {aiHistoryEval.overallFeedback}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-lg bg-white border border-emerald-200">
                    <div className="text-[10px] font-bold uppercase text-emerald-700 mb-1">Силни страни:</div>
                    <ul className="space-y-1 text-[11px] text-slate-700">
                      {aiHistoryEval.strengths.map((s, idx) => (
                        <li key={idx}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-amber-200">
                    <div className="text-[10px] font-bold uppercase text-amber-800 mb-1">Препоръки за 30/30 т.:</div>
                    <ul className="space-y-1 text-[11px] text-slate-700">
                      {aiHistoryEval.concreteTipsForSix.map((tip, idx) => (
                        <li key={idx}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Infinite Case Study Quiz Section */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    Тест върху казуса по МОН • Вариант #{caseQuizVariant}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    Проверка върху изворите, понятията и тезите ({caseQuizQuestions.length} въпроса)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCaseQuizVariant((prev) => prev + 1);
                    setCaseQuizAnswers({});
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Нов вариант върху казуса (∞)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {caseQuizQuestions.map((q, qIdx) => {
                  const chosen = caseQuizAnswers[q.id];
                  const isAnswered = chosen !== undefined;
                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="text-[11px] font-bold text-slate-500">
                          Въпрос #{qIdx + 1} • {activeCase.periodYears}
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                          {q.question}
                        </p>
                        <div className="space-y-1.5">
                          {q.options.map((opt, optIdx) => {
                            let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                            if (isAnswered) {
                              if (optIdx === q.correctIndex) {
                                btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                              } else if (optIdx === chosen) {
                                btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                              }
                            }
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={isAnswered}
                                onClick={() => setCaseQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                                className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                              >
                                <span><strong>{['А)', 'Б)', 'В)', 'Г)'][optIdx]}</strong> {opt}</span>
                                {isAnswered && optIdx === q.correctIndex && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                                {isAnswered && optIdx === chosen && optIdx !== q.correctIndex && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {isAnswered && (
                        <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-[11px] text-blue-950 leading-relaxed">
                          <strong>Обяснение по МОН:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Self-Checklist */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <span className="text-xs font-bold text-slate-700 block">
                Критерии за самооценка на твоето есе (по стандарта на МОН):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'thesis', label: 'Формулирана категорична теза в увода' },
                  { key: 'facts', label: 'Точни исторически факти, дати и термини' },
                  { key: 'sources', label: 'Цитиран и анализиран исторически извор' },
                  { key: 'bothSides', label: 'Разгледани двете гледни точки (дебат)' },
                  { key: 'conclusion', label: 'Обобщаващ синтез в заключението' }
                ].map((item) => (
                  <label
                    key={item.key}
                    onClick={() => toggleChecklist(item.key)}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 cursor-pointer select-none hover:bg-slate-100 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={!!checklistState[item.key]}
                      onChange={() => {}}
                      className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span
                      className={`text-[11px] font-medium ${
                        checklistState[item.key] ? 'line-through text-slate-400' : 'text-slate-700'
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
