import React, { useState } from 'react';
import {
  Compass,
  Search,
  Sparkles,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  FileQuestion,
  Lightbulb,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Trophy,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import {
  UNSOLVED_MYSTERIES_DATA,
  GENERAL_KNOWLEDGE_TRIVIA,
  FACT_OR_MYTH_DATA,
  type UnsolvedMysteryItem
} from '../data/generalKnowledgeData';
import { HistoryTimelineView } from './HistoryTimelineView';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import type { CultureSubTab } from './CultureHero';

interface CultureHubViewProps {
  activeSubTab: CultureSubTab;
  onSelectSubTab: (tab: CultureSubTab) => void;
  onSelectLesson?: (lesson: LessonData) => void;
  onNavigateTab?: (tab: AppNavTab) => void;
  onSwitchToStudy?: () => void;
  lessons?: LessonData[];
}

export const CultureHubView: React.FC<CultureHubViewProps> = ({
  activeSubTab,
  onSelectSubTab,
  onSelectLesson,
  onNavigateTab,
  onSwitchToStudy,
  lessons = []
}) => {
  // =========================================================================
  // SUB-TAB 1: UNRESOLVED MYSTERIES STATE
  // =========================================================================
  const [selectedMysteryCategory, setSelectedMysteryCategory] = useState<string>('all');
  const [mysterySearchQuery, setMysterySearchQuery] = useState<string>('');
  const [expandedMysteryId, setExpandedMysteryId] = useState<string | null>(UNSOLVED_MYSTERIES_DATA[0].id);

  const mysteryCategories = [
    { id: 'all', label: 'Всички неразгадани случки' },
    { id: 'history', label: 'Исторически случки & Личности' },
    { id: 'ancient', label: 'Древни цивилизации & Тайни' },
    { id: 'geography', label: 'Географски бездни & Природа' }
  ];

  const filteredMysteries = UNSOLVED_MYSTERIES_DATA.filter((item: UnsolvedMysteryItem) => {
    const matchesCategory = selectedMysteryCategory === 'all' || item.category === selectedMysteryCategory;
    const matchesQuery = item.title.toLowerCase().includes(mysterySearchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(mysterySearchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(mysterySearchQuery.toLowerCase()) ||
      item.unsolvedYearOrPeriod.toLowerCase().includes(mysterySearchQuery.toLowerCase()) ||
      item.unsolvedMystery.toLowerCase().includes(mysterySearchQuery.toLowerCase()) ||
      item.knownFacts.some(f => f.toLowerCase().includes(mysterySearchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleRandomMystery = () => {
    const randomIdx = Math.floor(Math.random() * UNSOLVED_MYSTERIES_DATA.length);
    const chosen = UNSOLVED_MYSTERIES_DATA[randomIdx];
    setSelectedMysteryCategory('all');
    setMysterySearchQuery('');
    setExpandedMysteryId(chosen.id);

    const el = document.getElementById(`mystery-${chosen.id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const getRelatedLesson = (item: UnsolvedMysteryItem) => {
    return lessons.find(l => {
      const lTitle = l.title.toLowerCase();
      const iTitle = item.title.toLowerCase();
      if (item.id === 'mystery-levski-grave' && (lTitle.includes('априлск') || lTitle.includes('възраждане') || lTitle.includes('левски'))) return true;
      if (item.id === 'mystery-botev-death' && (lTitle.includes('априлск') || lTitle.includes('ботев'))) return true;
      if (item.id === 'mystery-madara-rider' && (lTitle.includes('аспарух') || lTitle.includes('първо българско') || lTitle.includes('тервел'))) return true;
      if (item.id === 'ancient-varna-civilization' && (lTitle.includes('траки') || lTitle.includes('елада') || lTitle.includes('древн'))) return true;
      return lTitle.includes(iTitle.slice(0, 8)) || iTitle.includes(lTitle.slice(0, 8));
    });
  };

  // =========================================================================
  // SUB-TAB 3: TRIVIA QUIZ STATE
  // =========================================================================
  const [triviaCurrentIndex, setTriviaCurrentIndex] = useState(0);
  const [triviaSelectedOption, setTriviaSelectedOption] = useState<number | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaIsCompleted, setTriviaIsCompleted] = useState(false);

  const currentTrivia = GENERAL_KNOWLEDGE_TRIVIA[triviaCurrentIndex];

  const handleSelectTriviaOption = (optionIdx: number) => {
    if (triviaSelectedOption !== null) return; // already answered
    setTriviaSelectedOption(optionIdx);
    const isCorrect = optionIdx === currentTrivia.correctIndex;
    if (isCorrect) {
      setTriviaScore(prev => prev + 1);
    }
  };

  const handleNextTrivia = () => {
    if (triviaCurrentIndex < GENERAL_KNOWLEDGE_TRIVIA.length - 1) {
      setTriviaCurrentIndex(prev => prev + 1);
      setTriviaSelectedOption(null);
    } else {
      setTriviaIsCompleted(true);
    }
  };

  const handleRestartTrivia = () => {
    setTriviaCurrentIndex(0);
    setTriviaSelectedOption(null);
    setTriviaScore(0);
    setTriviaIsCompleted(false);
  };

  // =========================================================================
  // SUB-TAB 4: FACT OR MYTH BUSTER STATE
  // =========================================================================
  const [revealedMyths, setRevealedMyths] = useState<{ [mythId: string]: boolean }>({});
  const [userMythGuesses, setUserMythGuesses] = useState<{ [mythId: string]: boolean }>({});

  const handleGuessMyth = (mythId: string, guessIsFact: boolean) => {
    setUserMythGuesses(prev => ({ ...prev, [mythId]: guessIsFact }));
    setRevealedMyths(prev => ({ ...prev, [mythId]: true }));
  };

  const totalMythsGuessed = Object.keys(userMythGuesses).length;
  const correctMythsCount = FACT_OR_MYTH_DATA.filter(m => {
    if (userMythGuesses[m.id] === undefined) return false;
    return userMythGuesses[m.id] === m.isFact;
  }).length;

  return (
    <div className="space-y-8">
      
      {/* Sub-navigation bar inside Culture Hub */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 no-scrollbar">
          <button
            onClick={() => onSelectSubTab('mysteries')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'mysteries'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>📜 Неразгадани случки ({UNSOLVED_MYSTERIES_DATA.length})</span>
          </button>

          <button
            onClick={() => onSelectSubTab('timeline')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'timeline'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>⏳ Хронология (681–1908)</span>
          </button>

          <button
            onClick={() => onSelectSubTab('trivia')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'trivia'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>🧠 Куиз за обща култура (15 в.)</span>
          </button>

          <button
            onClick={() => onSelectSubTab('myths')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'myths'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>⚖️ Факт или Мит? ({FACT_OR_MYTH_DATA.length})</span>
          </button>
        </div>

        {/* Quick jump to study */}
        {onSwitchToStudy && (
          <button
            onClick={onSwitchToStudy}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Към учебните конспекти</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. НЕРАЗГАДАНИ СЛУЧКИ ОТ ИСТОРИЯТА И ГЕОГРАФИЯТА */}
      {/* ========================================================================= */}
      {activeSubTab === 'mysteries' && (
        <div className="space-y-6">
          {/* Top banner */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Досиета на неизвестното • Факти, загадки и теми за размисъл</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                Неразгадани години, събития и природни феномени
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Предоставяме доказаните факти, очертаваме неразгаданата мистерия и оставяме въпросите, по които учените продължават да спорят.
              </p>
            </div>

            <button
              onClick={handleRandomMystery}
              className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Случайно досие</span>
            </button>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
              {mysteryCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedMysteryCategory(cat.id)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedMysteryCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={mysterySearchQuery}
                onChange={(e) => setMysterySearchQuery(e.target.value)}
                placeholder="Търси загадка, година, личност..."
                className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Mysteries List */}
          <div className="space-y-4">
            {filteredMysteries.map(item => {
              const isExpanded = expandedMysteryId === item.id;
              const relatedLesson = getRelatedLesson(item);

              return (
                <div
                  key={item.id}
                  id={`mystery-${item.id}`}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? 'bg-slate-950 border-amber-500/40 shadow-xl'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div
                    onClick={() => setExpandedMysteryId(isExpanded ? null : item.id)}
                    className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-400" />
                          <span>{item.unsolvedYearOrPeriod}</span>
                        </span>
                        <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {item.tag}
                        </span>
                        <span className="text-[11px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {item.categoryLabel}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex-shrink-0 mt-1">
                      <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90 text-amber-400' : ''}`} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-6">
                      {/* 1. Доказаните факти */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>1. Доказаните исторически факти:</span>
                        </div>
                        <ul className="space-y-1.5 pl-1">
                          {item.knownFacts.map((fact, fIdx) => (
                            <li key={fIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                              <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 2. Неразгаданата мистерия */}
                      <div className="p-4 sm:p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                          <HelpCircle className="w-4 h-4 text-amber-400" />
                          <span>2. Неразгаданата мистерия:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
                          {item.unsolvedMystery}
                        </p>
                      </div>

                      {/* 3. Водещи хипотези */}
                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                          <FileQuestion className="w-4 h-4 text-indigo-400" />
                          <span>3. Водещите хипотези и научни аргументи:</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {item.hypotheses.map((hyp, hIdx) => (
                            <div key={hIdx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                              <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                <span>{hyp.title}</span>
                              </h4>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {hyp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4. Тема за размисъл */}
                      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border-2 border-amber-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                          <Lightbulb className="w-4 h-4 text-amber-400" />
                          <span>4. Тема за критичен размисъл:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-serif">
                          „{item.foodForThought}“
                        </p>
                      </div>

                      {/* Cause and effect actions */}
                      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => onSelectSubTab('timeline')}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors"
                          >
                            <Clock className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Към историческата хронология</span>
                          </button>

                          <button
                            onClick={() => onSelectSubTab('trivia')}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Реши куиза за обща култура</span>
                          </button>
                        </div>

                        {relatedLesson && onSelectLesson && (
                          <button
                            onClick={() => {
                              onSelectLesson(relatedLesson);
                              onSwitchToStudy?.();
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Учебен конспект: {relatedLesson.title}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ЛИНИЯ НА ВРЕМЕТО (681–1908 г.) */}
      {/* ========================================================================= */}
      {activeSubTab === 'timeline' && (
        <HistoryTimelineView
          lessons={lessons}
          onSelectLesson={(l) => {
            onSelectLesson?.(l);
            onSwitchToStudy?.();
          }}
          onNavigateTab={onNavigateTab}
        />
      )}

      {/* ========================================================================= */}
      {/* 3. КУИЗ ЗА ОБЩА КУЛТУРА (TRIVIA) */}
      {/* ========================================================================= */}
      {activeSubTab === 'trivia' && (
        <div className="space-y-6">
          {!triviaIsCompleted ? (
            <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
              {/* Quiz Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/25">
                    Въпрос {triviaCurrentIndex + 1} от {GENERAL_KNOWLEDGE_TRIVIA.length}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700">
                    {currentTrivia.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                  <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Резултат: {triviaScore} точки</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${((triviaCurrentIndex + 1) / GENERAL_KNOWLEDGE_TRIVIA.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  {currentTrivia.question}
                </h3>
              </div>

              {/* Answer Options */}
              <div className="space-y-2.5">
                {currentTrivia.options.map((opt, idx) => {
                  const isChosen = triviaSelectedOption === idx;
                  const isCorrect = idx === currentTrivia.correctIndex;
                  const showResult = triviaSelectedOption !== null;

                  let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-slate-600';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                    } else if (isChosen && !isCorrect) {
                      btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                    } else {
                      btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectTriviaOption(idx)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                          showResult && isCorrect
                            ? 'bg-emerald-500 text-slate-950'
                            : showResult && isChosen && !isCorrect
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {showResult && isCorrect && (
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      {showResult && isChosen && !isCorrect && (
                        <X className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reveal Explanation Box if answered */}
              {triviaSelectedOption !== null && (
                <div className="space-y-3 pt-3 border-t border-slate-800/80 animate-fadeIn">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>Научно обяснение на верния отговор:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentTrivia.explanation}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/25 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wide block">Знаехте ли, че?</span>
                      <p className="text-xs text-sky-100/90 leading-relaxed mt-0.5">
                        {currentTrivia.didYouKnow}
                      </p>
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNextTrivia}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
                    >
                      <span>{triviaCurrentIndex < GENERAL_KNOWLEDGE_TRIVIA.length - 1 ? 'Следващ въпрос' : 'Виж крайните резултати'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Final Score Card */
            <div className="max-w-xl mx-auto p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">Тестът за обща култура завърши!</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Твоят краен резултат: <span className="font-bold text-amber-400 text-lg">{triviaScore}</span> от <span className="font-bold text-white">{GENERAL_KNOWLEDGE_TRIVIA.length}</span> верни отговора
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Ранг на познавача:</div>
                <div className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  {triviaScore >= 13 ? '🏆 Енциклопедист & Експерт по миналото' : triviaScore >= 9 ? '🧭 Изследовател с отлична обща култура' : '📚 Любознателен откривател на тайни'}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {triviaScore >= 13
                    ? 'Поздравления! Познаваш детайли от Варненското злато до Черноморския басейн, които убягват дори на много учители.'
                    : triviaScore >= 9
                    ? 'Много солиден резултат! Имаш широк поглед върху историческите дати и географските феномени.'
                    : 'Чудесно начало! Разгледай неразгаданите случки и линията на времето, за да откриеш още любопитни тайни.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestartTrivia}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Реши куиза отново</span>
                </button>

                <button
                  onClick={() => onSelectSubTab('myths')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  <span>Продължи към „Факт или Мит?“</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ФАКТ ИЛИ МИТ? (FACT VS MYTH BUSTERS) */}
      {/* ========================================================================= */}
      {activeSubTab === 'myths' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-300 mb-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Развенчаване на исторически и географски заблуди</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                Факт или Мит? Провери своята интуиция
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Кликни „ФАКТ“ или „МИТ“ за всяко твърдение, за да провериш дали се доверяваш на популярните градски легенди или на неоспоримите научни доказателства.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 self-start md:self-auto">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Проверени митове:</div>
                <div className="text-sm font-bold text-white">
                  <span className="text-amber-400">{totalMythsGuessed}</span> / {FACT_OR_MYTH_DATA.length}
                </div>
              </div>
              {totalMythsGuessed > 0 && (
                <div className="pl-3 border-l border-slate-800 text-left">
                  <div className="text-xs text-slate-400 font-medium">Познати:</div>
                  <div className="text-sm font-bold text-emerald-400">{correctMythsCount}</div>
                </div>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FACT_OR_MYTH_DATA.map((item, idx) => {
              const isRevealed = !!revealedMyths[item.id];
              const userGuess = userMythGuesses[item.id];
              const isCorrectGuess = userGuess === item.isFact;

              return (
                <div
                  key={item.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                    isRevealed
                      ? item.isFact
                        ? 'bg-emerald-950/20 border-emerald-500/40 shadow-md'
                        : 'bg-rose-950/20 border-rose-500/40 shadow-md'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      Заблуда #{idx + 1}
                    </span>
                    <span className="text-[11px] text-slate-400 capitalize">
                      {item.category === 'history' ? 'История' : item.category === 'ancient' ? 'Древност' : 'География'}
                    </span>
                  </div>

                  {/* Statement */}
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug mb-4">
                    „{item.statement}“
                  </h4>

                  {/* Choice Buttons (before reveal) */}
                  {!isRevealed ? (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => handleGuessMyth(item.id, true)}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 border border-slate-700 hover:border-emerald-500/50 text-xs font-bold transition-all"
                      >
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>ФАКТ Е</span>
                      </button>

                      <button
                        onClick={() => handleGuessMyth(item.id, false)}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-600/30 text-rose-300 border border-slate-700 hover:border-rose-500/50 text-xs font-bold transition-all"
                      >
                        <X className="w-4 h-4 text-rose-400" />
                        <span>МИТ Е</span>
                      </button>
                    </div>
                  ) : (
                    /* Revealed Content */
                    <div className="space-y-3 pt-3 border-t border-slate-800/80 animate-fadeIn">
                      <div className="flex items-center justify-between gap-2">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                          item.isFact
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {item.isFact ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          <span>{item.verdictTitle}</span>
                        </div>

                        {userGuess !== undefined && (
                          <span className={`text-[11px] font-semibold ${isCorrectGuess ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isCorrectGuess ? '✓ Ти позна!' : '✗ Твоят отговор бе друг'}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.detailedExplanation}
                      </p>

                      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 flex items-center gap-1">
                        <span className="font-semibold text-slate-500">Научен източник:</span>
                        <span className="truncate">{item.evidenceSource}</span>
                      </div>
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
