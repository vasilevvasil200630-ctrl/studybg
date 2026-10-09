import React, { useState } from 'react';
import {
  Quote,
  Search,
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WISDOM_QUOTES_DATA, type WisdomQuoteItem } from '../data/generalKnowledgeData';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';

interface CultureWisdomViewProps {
  lessons?: LessonData[];
  onSelectLesson?: (lesson: LessonData) => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

export const CultureWisdomView: React.FC<CultureWisdomViewProps> = ({
  lessons = [],
  onSelectLesson,
  onNavigateTab
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Всички');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const categories = [
    { id: 'Всички', label: `Всички завети (${WISDOM_QUOTES_DATA.length})` },
    { id: 'Свобода & Дълг', label: 'Свобода & Дълг' },
    { id: 'Просвета & Книжовност', label: 'Просвета & Книжовност' },
    { id: 'Родолюбие & Дух', label: 'Родолюбие & Дух' }
  ];

  const filteredQuotes = WISDOM_QUOTES_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'Всички' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.quote.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.roleAndEra.toLowerCase().includes(q) ||
      item.historicalContext.toLowerCase().includes(q) ||
      item.moralLesson.toLowerCase().includes(q) ||
      item.sourceWork.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const handleCopyQuote = (item: WisdomQuoteItem) => {
    const textToCopy = `„${item.quote}“\n— ${item.author} (${item.sourceWork})\nУрок за днес: ${item.moralLesson}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleAudio = (item: WisdomQuoteItem) => {
    if (!('speechSynthesis' in window)) return;

    if (playingAudioId === item.id) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `${item.quote}. Казано от ${item.author}. ${item.historicalContext}. Поука за днес: ${item.moralLesson}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.95;

    utterance.onend = () => setPlayingAudioId(null);
    utterance.onerror = () => setPlayingAudioId(null);

    setPlayingAudioId(item.id);
    window.speechSynthesis.speak(utterance);
  };

  const findRelatedLesson = (item: WisdomQuoteItem) => {
    return lessons.find((l) => {
      const lTitle = l.title.toLowerCase();
      const aName = item.author.toLowerCase();
      if (aName.includes('ботев') && (lTitle.includes('ботев') || lTitle.includes('априлск'))) return true;
      if (aName.includes('левски') && (lTitle.includes('левски') || lTitle.includes('възраждане'))) return true;
      if (aName.includes('паисий') && (lTitle.includes('паисий') || lTitle.includes('възраждане'))) return true;
      if (aName.includes('вазов') && (lTitle.includes('вазов') || lTitle.includes('литература'))) return true;
      if (aName.includes('симеон') && (lTitle.includes('симеон') || lTitle.includes('златен век') || lTitle.includes('първо българско'))) return true;
      if (aName.includes('омуртаг') && (lTitle.includes('омуртаг') || lTitle.includes('първо българско'))) return true;
      return false;
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-800 mb-1">
            <Quote className="w-3.5 h-3.5" />
            <span>Златен фонд • 10 вечни национални завета и нравствени уроци</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Мъдростта на епохите и словото на българските будители
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Великите фрази, които съградиха българския дух. Открийте историческия контекст зад думите на Паисий, Левски, Ботев, Вазов и Омуртаг.
          </p>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
          <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Памет & Идентичност</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-xl bg-slate-100 border border-slate-200 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-white text-indigo-800 border border-indigo-300 shadow-2xs font-bold'
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Търси завет по автор, цитат, историческо събитие или идея..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 placeholder:text-slate-400 shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-700"
          >
            Изчисти
          </button>
        )}
      </div>

      {/* Quotes Cards Grid */}
      <div className="grid grid-cols-1 gap-5">
        {filteredQuotes.map((item) => {
          const isAudioPlaying = playingAudioId === item.id;
          const relatedLesson = findRelatedLesson(item);

          return (
            <article
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-all space-y-5"
            >
              {/* Header meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-50 border border-indigo-200 text-indigo-800">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {item.sourceWork}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Audio voice toggle */}
                  <button
                    onClick={() => handleToggleAudio(item)}
                    className={`p-2 rounded-xl text-xs font-medium border transition-colors shadow-2xs ${
                      isAudioPlaying
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                    title={isAudioPlaying ? 'Спри четенето' : 'Слушай цитата'}
                  >
                    {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {/* Copy quote */}
                  <button
                    onClick={() => handleCopyQuote(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium transition-colors shadow-2xs"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Копирано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Копирай</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Main Quote Callout */}
              <div className="relative pl-6 sm:pl-8 border-l-4 border-indigo-500 py-1">
                <p className="text-lg sm:text-2xl font-serif font-bold text-slate-900 leading-snug tracking-tight">
                  „{item.quote}“
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-indigo-900">
                    {item.author}
                  </span>
                  <span className="text-xs text-slate-500">
                    • {item.roleAndEra}
                  </span>
                </div>
              </div>

              {/* 2-Part Deep-Dive Box: Historical Context & Modern Lesson */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Historical context */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Исторически контекст</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.historicalContext}
                  </p>
                </div>

                {/* Moral lesson */}
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Поука за днес</span>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
                    {item.moralLesson}
                  </p>
                </div>
              </div>

              {/* Related academic topic bridge */}
              {relatedLesson && onSelectLesson && onNavigateTab && (
                <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>Свързан урок в Академията: <strong>{relatedLesson.title}</strong></span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectLesson(relatedLesson);
                      onNavigateTab('summary');
                    }}
                    className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-800 font-semibold"
                  >
                    <span>Отвори урока</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </article>
          );
        })}

        {filteredQuotes.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
            <Quote className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">Няма намерени завета</h4>
            <p className="text-xs text-slate-500">
              Опитайте с друго търсене или изберете „Всички завети“.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
