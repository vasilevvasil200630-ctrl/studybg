import React, { useState, lazy, Suspense } from 'react';
import {
  Compass,
  Search,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Clock,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Trophy,
  Check,
  X,
  MapPin,
  Quote,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  Flame,
  Mail
} from 'lucide-react';
import {
  UNSOLVED_MYSTERIES_DATA,
  GENERAL_KNOWLEDGE_TRIVIA,
  FACT_OR_MYTH_DATA,
  type UnsolvedMysteryItem,
  type TriviaQuestion
} from '../data/generalKnowledgeData';

const HistoryTimelineView = lazy(() => import('./HistoryTimelineView').then(m => ({ default: m.HistoryTimelineView })));
const CultureWondersView = lazy(() => import('./CultureWondersView').then(m => ({ default: m.CultureWondersView })));
const CultureWisdomView = lazy(() => import('./CultureWisdomView').then(m => ({ default: m.CultureWisdomView })));
const HistoricalCasesView = lazy(() => import('./HistoricalCasesView').then(m => ({ default: m.HistoricalCasesView })));

const SubViewLoadingSkeleton = () => (
  <div className="p-8 rounded-2xl bg-white border border-slate-200 animate-pulse flex items-center justify-center min-h-[300px] shadow-xs">
    <div className="flex items-center gap-3 text-slate-500 text-xs sm:text-sm font-medium">
      <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
      <span>Зареждане на съдържанието...</span>
    </div>
  </div>
);

import { EmailShareModal } from './EmailShareModal';
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
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [bookmarkedMysteryIds, setBookmarkedMysteryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('studybg_bookmarked_mysteries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [copiedMysteryId, setCopiedMysteryId] = useState<string | null>(null);

  const mysteryCategories = [
    { id: 'all', label: `Всички загадки (${UNSOLVED_MYSTERIES_DATA.length})` },
    { id: 'history', label: 'Исторически случки' },
    { id: 'ancient', label: 'Древни цивилизации' },
    { id: 'geography', label: 'Географски бездни' }
  ];

  const filteredMysteries = UNSOLVED_MYSTERIES_DATA.filter((item: UnsolvedMysteryItem) => {
    const matchesCategory = selectedMysteryCategory === 'all' || item.category === selectedMysteryCategory;
    const q = mysterySearchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q) ||
      item.unsolvedYearOrPeriod.toLowerCase().includes(q) ||
      item.unsolvedMystery.toLowerCase().includes(q) ||
      item.knownFacts.some((f) => f.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const toggleMysteryBookmark = (id: string) => {
    setBookmarkedMysteryIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('studybg_bookmarked_mysteries', JSON.stringify(next));
      return next;
    });
  };

  const handleShareMystery = (item: UnsolvedMysteryItem) => {
    const shareText = `Неразгадана загадка: ${item.title} (${item.unsolvedYearOrPeriod})\n${item.subtitle}\nПрочети повече в StudyBG: https://studybg.vercel.app#mysteries`;
    navigator.clipboard.writeText(shareText);
    setCopiedMysteryId(item.id);
    setTimeout(() => setCopiedMysteryId(null), 2000);
  };

  const handleToggleMysteryAudio = (item: UnsolvedMysteryItem) => {
    if (!('speechSynthesis' in window)) return;

    if (playingAudioId === item.id) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `${item.title}. ${item.subtitle}. Какво знаем: ${item.knownFacts.join('. ')}. Загадката: ${item.unsolvedMystery}. Въпрос за размисъл: ${item.foodForThought}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.95;

    utterance.onend = () => setPlayingAudioId(null);
    utterance.onerror = () => setPlayingAudioId(null);

    setPlayingAudioId(item.id);
    window.speechSynthesis.speak(utterance);
  };

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
    return lessons.find((l) => {
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
  // SUB-TAB 4: TRIVIA QUIZ STATE
  // =========================================================================
  const [triviaCategory, setTriviaCategory] = useState<string>('all');
  const [triviaCurrentIndex, setTriviaCurrentIndex] = useState(0);
  const [triviaSelectedOption, setTriviaSelectedOption] = useState<number | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaStreak, setTriviaStreak] = useState(0);
  const [triviaIsCompleted, setTriviaIsCompleted] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const activeTriviaQuestions = GENERAL_KNOWLEDGE_TRIVIA.filter(
    (q) => triviaCategory === 'all' || q.category === triviaCategory
  );

  const currentTrivia: TriviaQuestion = activeTriviaQuestions[triviaCurrentIndex] || GENERAL_KNOWLEDGE_TRIVIA[0];

  const handleSelectTriviaOption = (optionIdx: number) => {
    if (triviaSelectedOption !== null) return;
    setTriviaSelectedOption(optionIdx);
    const isCorrect = optionIdx === currentTrivia.correctIndex;
    if (isCorrect) {
      setTriviaScore((prev) => prev + 1);
      setTriviaStreak((prev) => prev + 1);
    } else {
      setTriviaStreak(0);
    }
  };

  const handleNextTrivia = () => {
    if (triviaCurrentIndex < activeTriviaQuestions.length - 1) {
      setTriviaCurrentIndex((prev) => prev + 1);
      setTriviaSelectedOption(null);
    } else {
      setTriviaIsCompleted(true);
    }
  };

  const handleRestartTrivia = () => {
    setTriviaCurrentIndex(0);
    setTriviaSelectedOption(null);
    setTriviaScore(0);
    setTriviaStreak(0);
    setTriviaIsCompleted(false);
  };

  // =========================================================================
  // SUB-TAB 5: FACT OR MYTH BUSTER STATE
  // =========================================================================
  const [selectedMythCategory, setSelectedMythCategory] = useState<string>('all');
  const [userMythGuesses, setUserMythGuesses] = useState<{ [mythId: string]: boolean }>({});

  const mythCategories = [
    { id: 'all', label: `Всички митове (${FACT_OR_MYTH_DATA.length})` },
    { id: 'history', label: 'История' },
    { id: 'ancient', label: 'Древност' },
    { id: 'geography', label: 'География' }
  ];

  const filteredMyths = FACT_OR_MYTH_DATA.filter(
    (m) => selectedMythCategory === 'all' || m.category === selectedMythCategory
  );

  const handleGuessMyth = (mythId: string, guessIsFact: boolean) => {
    setUserMythGuesses((prev) => ({ ...prev, [mythId]: guessIsFact }));
  };

  const totalMythsGuessed = Object.keys(userMythGuesses).length;
  const correctMythsCount = FACT_OR_MYTH_DATA.filter((m) => {
    if (userMythGuesses[m.id] === undefined) return false;
    return userMythGuesses[m.id] === m.isFact;
  }).length;

  return (
    <div className="space-y-8">
      
      {/* 6-Part Responsive Navigation Tabs inside Culture Hub */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 no-scrollbar">
          <button
            onClick={() => onSelectSubTab('mysteries')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'mysteries'
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>📜 Неразгадани случки ({UNSOLVED_MYSTERIES_DATA.length})</span>
          </button>

          <button
            onClick={() => onSelectSubTab('timeline')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'timeline'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>⏳ Хронология</span>
          </button>

          <button
            onClick={() => onSelectSubTab('wonders')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'wonders'
                ? 'bg-teal-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>🗺️ Природни чудеса (12)</span>
          </button>

          <button
            onClick={() => onSelectSubTab('trivia')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'trivia'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>🧠 Куиз за ерудити</span>
          </button>

          <button
            onClick={() => onSelectSubTab('myths')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'myths'
                ? 'bg-rose-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>⚖️ Факт или Мит? ({FACT_OR_MYTH_DATA.length})</span>
          </button>

          <button
            onClick={() => onSelectSubTab('wisdom')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeSubTab === 'wisdom'
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Quote className="w-4 h-4" />
            <span>🏛️ Златен фонд</span>
          </button>
        </div>

        {/* Quick jump to study */}
        {onSwitchToStudy && (
          <button
            onClick={onSwitchToStudy}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
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
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800 mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Досиета на неизвестното • 14 детайлни загадки</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Неразгадани години, събития и български съкровища
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Документирани исторически факти, съпоставени с най-авторитетните научни хипотези. Натиснете бутона за звук, за да слушате разказа с аудио глас.
              </p>
            </div>

            <button
              onClick={handleRandomMystery}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Случайна загадка</span>
            </button>
          </div>

          {/* Categories Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-xl bg-slate-100 border border-slate-200 no-scrollbar">
            {mysteryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedMysteryCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedMysteryCategory === cat.id
                    ? 'bg-white text-amber-900 border border-amber-300 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={mysterySearchQuery}
              onChange={(e) => setMysterySearchQuery(e.target.value)}
              placeholder="Търси загадка по име (напр. Левски, Ботев, Царичина, Вълчан, Перперикон)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600 placeholder:text-slate-400 shadow-2xs"
            />
            {mysterySearchQuery && (
              <button
                onClick={() => setMysterySearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-700"
              >
                Изчисти
              </button>
            )}
          </div>

          {/* Mysteries List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredMysteries.map((item) => {
              const isExpanded = expandedMysteryId === item.id;
              const isBookmarked = bookmarkedMysteryIds.includes(item.id);
              const isAudioPlaying = playingAudioId === item.id;
              const relatedLesson = getRelatedLesson(item);

              return (
                <article
                  key={item.id}
                  id={`mystery-${item.id}`}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-white border-amber-300 shadow-md ring-1 ring-amber-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Collapsed Header */}
                  <div
                    className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                    onClick={() => setExpandedMysteryId(isExpanded ? null : item.id)}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 border border-amber-200 text-amber-800">
                          {item.categoryLabel}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {item.unsolvedYearOrPeriod}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-2 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleToggleMysteryAudio(item)}
                        className={`p-2 rounded-xl text-xs font-medium border transition-colors shadow-2xs ${
                          isAudioPlaying
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                        title={isAudioPlaying ? 'Спри четенето' : 'Слушай загадката'}
                      >
                        {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => toggleMysteryBookmark(item.id)}
                        className={`p-2 rounded-xl text-xs font-medium border transition-colors shadow-2xs ${
                          isBookmarked
                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                        title={isBookmarked ? 'Премахни от любими' : 'Запази в любими'}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                      </button>

                      <button
                        onClick={() => handleShareMystery(item)}
                        className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-medium transition-colors shadow-2xs"
                        title="Копирай за споделяне"
                      >
                        {copiedMysteryId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content Details */}
                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-slate-100 space-y-6 animate-in fade-in duration-200">
                      
                      {/* Known Facts Box */}
                      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Фактите, които знаем със сигурност:</span>
                        </div>
                        <ul className="space-y-2">
                          {item.knownFacts.map((fact, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                              <span className="text-emerald-600 font-bold text-sm mt-0.5">•</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* The Core Unsolved Mystery Callout */}
                      <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                          <Compass className="w-4 h-4 text-amber-600" />
                          <span>Мистерията: Какво остава неразгадано?</span>
                        </div>
                        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                          {item.unsolvedMystery}
                        </p>
                      </div>

                      {/* Hypotheses Grid */}
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Основни исторически хипотези:
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.hypotheses.map((hyp, hIdx) => (
                            <div key={hIdx} className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-600" />
                                <span>{hyp.title}</span>
                              </h4>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {hyp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Food For Thought Quote */}
                      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
                        <strong>Тема за размисъл:</strong> „{item.foodForThought}“
                      </div>

                      {/* Academic Topic Bridge */}
                      {relatedLesson && onSelectLesson && onNavigateTab && (
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
                          <div className="flex items-center gap-2 text-blue-900 font-medium">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <span>Искате ли да научите официалната учебна програма за тази епоха?</span>
                          </div>
                          <button
                            onClick={() => {
                              onSelectLesson(relatedLesson);
                              onNavigateTab('summary');
                            }}
                            className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-800 font-bold"
                          >
                            <span>Към урока „{relatedLesson.title}“</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ИНТЕРАКТИВНА ХРОНОЛОГИЯ (681–1908 Г.) */}
      {/* ========================================================================= */}
      {activeSubTab === 'timeline' && (
        <Suspense fallback={<SubViewLoadingSkeleton />}>
          <HistoryTimelineView
            lessons={lessons}
            onSelectLesson={onSelectLesson}
            onNavigateTab={onNavigateTab}
          />
        </Suspense>
      )}

      {/* ========================================================================= */}
      {/* ИСТОРИЧЕСКИ АНАЛИТИЧНИ КАЗУСИ & ОТВОРЕНИ ТЕМИ */}
      {/* ========================================================================= */}
      {activeSubTab === 'cases' && (
        <Suspense fallback={<SubViewLoadingSkeleton />}>
          <HistoricalCasesView />
        </Suspense>
      )}

      {/* ========================================================================= */}
      {/* 3. ПРИРОДНИ ЧУДЕСА НА БЪЛГАРИЯ (12 ОБЕКТА) */}
      {/* ========================================================================= */}
      {activeSubTab === 'wonders' && (
        <Suspense fallback={<SubViewLoadingSkeleton />}>
          <CultureWondersView />
        </Suspense>
      )}

      {/* ========================================================================= */}
      {/* 4. КУИЗ ЗА ЕРУДИТИ */}
      {/* ========================================================================= */}
      {activeSubTab === 'trivia' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-800 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Интерактивен тест за обща култура и ерудиция</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Провери знанията си за България и света ({activeTriviaQuestions.length} въпроса)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Въпроси от историята, географията, научните открития и литературата с подробни разяснения за всеки верен отговор.
              </p>

              {/* Category selector pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { id: 'all', label: 'Всички категории' },
                  { id: 'history', label: 'История на България' },
                  { id: 'ancient', label: 'Древност & Археология' },
                  { id: 'geography', label: 'География & Природа' },
                  { id: 'culture', label: 'Култура & Наука' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setTriviaCategory(cat.id);
                      setTriviaCurrentIndex(0);
                      setTriviaSelectedOption(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      triviaCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {triviaStreak >= 2 && (
              <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs">
                <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>{triviaStreak} поредни верни!</span>
              </div>
            )}
          </div>

          {!triviaIsCompleted ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
              
              {/* Progress and score bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                    Въпрос {triviaCurrentIndex + 1} от {activeTriviaQuestions.length}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                    {currentTrivia.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Резултат: {triviaScore} точки</span>
                </div>
              </div>

              {/* Progress bar line */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${((triviaCurrentIndex + 1) / activeTriviaQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                {currentTrivia.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {currentTrivia.options.map((opt, idx) => {
                  const isChosen = triviaSelectedOption === idx;
                  const isCorrect = idx === currentTrivia.correctIndex;
                  const showResult = triviaSelectedOption !== null;

                  let btnStyle = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500';
                    } else if (isChosen && !isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500';
                    } else {
                      btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
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
                            ? 'bg-emerald-600 text-white'
                            : showResult && isChosen && !isCorrect
                            ? 'bg-rose-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-700'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {showResult && isCorrect && <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                      {showResult && isChosen && !isCorrect && <X className="w-5 h-5 text-rose-600 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Did you know banner after answering */}
              {triviaSelectedOption !== null && (
                <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Обяснение:
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {currentTrivia.explanation}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Знаете ли, че?</strong> {currentTrivia.didYouKnow}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNextTrivia}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <span>{triviaCurrentIndex < activeTriviaQuestions.length - 1 ? 'Следващ въпрос' : 'Виж крайния резултат'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Trivia Completion Card */
            <div className="p-8 sm:p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {triviaScore >= activeTriviaQuestions.length * 0.8
                    ? '🏆 Титла: Магистър по обща култура'
                    : triviaScore >= activeTriviaQuestions.length * 0.6
                    ? '🥈 Титла: Ерудит на България'
                    : '🥉 Титла: Млад изследовател'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                  {triviaScore} от {activeTriviaQuestions.length} верни отговора ({Math.round((triviaScore / activeTriviaQuestions.length) * 100)}%)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {triviaScore >= activeTriviaQuestions.length * 0.8
                    ? 'Впечатляващо познаване на българската и световната култура, история и география!'
                    : 'Много добро представяне! Разгледайте неразгаданите случки и природните чудеса, за да научите още тайни.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRestartTrivia}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Повтори куиза</span>
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Изпрати резултата на имейл</span>
                </button>
              </div>
            </div>
          )}

          {/* Email Modal for Trivia Result */}
          <EmailShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            testResult={{
              lessonTitle: `Куиз за обща култура (${activeTriviaQuestions.length} въпроса)`,
              score: triviaScore,
              total: activeTriviaQuestions.length,
              gradeBg: Math.max(2, Math.min(6, 2 + (triviaScore / activeTriviaQuestions.length) * 4))
            }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. ФАКТ ИЛИ МИТ? (16 РАЗВЕНЧАНИ МИТА) */}
      {/* ========================================================================= */}
      {activeSubTab === 'myths' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-800 mb-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Развенчаване на исторически и народни митове (16 теми)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Факт или Мит: Познавате ли истината зад популярните вярвания?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Гласувайте за всяко твърдение дали е истина или заблуда, за да видите научното обяснение и историческите извори.
              </p>
            </div>

            {totalMythsGuessed > 0 && (
              <div className="flex-shrink-0 p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs font-semibold text-slate-500">Познати митове</div>
                <div className="text-lg font-bold text-slate-900 font-mono">
                  {correctMythsCount} / {totalMythsGuessed}
                </div>
              </div>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-xl bg-slate-100 border border-slate-200 no-scrollbar">
            {mythCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedMythCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedMythCategory === cat.id
                    ? 'bg-white text-rose-900 border border-rose-300 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Myths List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredMyths.map((myth) => {
              const hasGuessed = userMythGuesses[myth.id] !== undefined;
              const userGuess = userMythGuesses[myth.id];
              const isGuessCorrect = userGuess === myth.isFact;

              return (
                <article
                  key={myth.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Твърдение:
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        „{myth.statement}“
                      </h3>
                    </div>

                    {!hasGuessed ? (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleGuessMyth(myth.id, true)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-colors shadow-2xs flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>ФАКТ</span>
                        </button>
                        <button
                          onClick={() => handleGuessMyth(myth.id, false)}
                          className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold transition-colors shadow-2xs flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5 text-rose-600" />
                          <span>МИТ</span>
                        </button>
                      </div>
                    ) : (
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold border flex-shrink-0 ${
                        myth.isFact
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                          : 'bg-rose-50 text-rose-900 border-rose-300'
                      }`}>
                        {myth.verdictTitle}
                      </span>
                    )}
                  </div>

                  {/* Revealed Result with Historical and Scientific Evidence */}
                  {hasGuessed && (
                    <div className="pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isGuessCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isGuessCorrect ? '🎉 Познахте!' : '❌ Не познахте този път'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {myth.detailedExplanation}
                      </p>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                        <strong>Исторически извор:</strong> {myth.evidenceSource}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ЗЛАТЕН ФОНД & МЪДРОСТ НА ЕПОХИТЕ */}
      {/* ========================================================================= */}
      {activeSubTab === 'wisdom' && (
        <Suspense fallback={<SubViewLoadingSkeleton />}>
          <CultureWisdomView
            lessons={lessons}
            onSelectLesson={onSelectLesson}
            onNavigateTab={onNavigateTab}
          />
        </Suspense>
      )}

    </div>
  );
};
