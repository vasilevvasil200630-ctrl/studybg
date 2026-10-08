import React, { useState } from 'react';
import { Compass, Search, Sparkles, ChevronRight, HelpCircle, CheckCircle2, FileQuestion, Lightbulb, Calendar, MessageSquare, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { UNSOLVED_MYSTERIES_DATA, type UnsolvedMysteryItem } from '../data/generalKnowledgeData';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';

interface GeneralKnowledgeViewProps {
  onNavigateTab?: (tab: AppNavTab) => void;
  onSelectLesson?: (lesson: LessonData) => void;
  lessons?: LessonData[];
}

export const GeneralKnowledgeView: React.FC<GeneralKnowledgeViewProps> = ({
  onNavigateTab,
  onSelectLesson,
  lessons = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(UNSOLVED_MYSTERIES_DATA[0].id);

  const categories = [
    { id: 'all', label: 'Всички неразгадани случки' },
    { id: 'history', label: 'Исторически случки & Личности' },
    { id: 'ancient', label: 'Древни цивилизации & Тайни' },
    { id: 'geography', label: 'Географски бездни & Природа' }
  ];

  const filteredItems = UNSOLVED_MYSTERIES_DATA.filter((item: UnsolvedMysteryItem) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unsolvedYearOrPeriod.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unsolvedMystery.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.knownFacts.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleRandomPick = () => {
    const randomIdx = Math.floor(Math.random() * UNSOLVED_MYSTERIES_DATA.length);
    const chosen = UNSOLVED_MYSTERIES_DATA[randomIdx];
    setSelectedCategory('all');
    setSearchQuery('');
    setExpandedItemId(chosen.id);

    const el = document.getElementById(`mystery-${chosen.id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const getRelatedLesson = (item: UnsolvedMysteryItem) => {
    return lessons.find(l => {
      const lTitle = l.title.toLowerCase();
      const iTitle = item.title.toLowerCase();
      if (item.id === 'mystery-levski-grave' && (lTitle.includes('априлск') || lTitle.includes('възраждане') || lTitle.includes('левски'))) return true;
      if (item.id === 'mystery-varne-gold' && (lTitle.includes('траки') || lTitle.includes('елада') || lTitle.includes('древн'))) return true;
      return lTitle.includes(iTitle.slice(0, 8)) || iTitle.includes(lTitle.slice(0, 8));
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Dossier / Investigation theme */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Досиета на неизвестното • Тема за размисъл</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Неразгадани случки от историята и географията
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Предоставяме доказаните факти, очертаваме мистерията и оставяме въпросите, върху които историците и географите продължават да спорят.
          </p>
        </div>

        {/* Action Button: Random Curiosity */}
        <button
          onClick={handleRandomPick}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold transition-colors shadow-2xs whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Случайна неразгадана случка</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Търси случка, година, загадка..."
            className="w-full bg-white text-slate-900 placeholder-slate-400 pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-amber-600 transition-colors"
          />
        </div>
      </div>

      {/* Items Stream */}
      <div className="space-y-4">
        {filteredItems.map(item => {
          const isExpanded = expandedItemId === item.id;
          const relatedLesson = getRelatedLesson(item);

          return (
            <div
              key={item.id}
              id={`mystery-${item.id}`}
              className={`rounded-2xl border transition-all ${
                isExpanded
                  ? 'bg-white border-amber-300 shadow-sm ring-1 ring-amber-300/50'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              {/* Item Card Header */}
              <div
                onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-600" />
                      <span>{item.unsolvedYearOrPeriod}</span>
                    </span>
                    <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {item.subtitle}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 flex-shrink-0 mt-1">
                  <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90 text-amber-600' : ''}`} />
                </div>
              </div>

              {/* Expanded Dossier Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6">
                  
                  {/* 1. ДОКАЗАНИТЕ ФАКТИ */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>1. Доказаните исторически факти:</span>
                    </div>
                    <ul className="space-y-1.5 pl-1">
                      {item.knownFacts.map((fact, fIdx) => (
                        <li key={fIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 leading-relaxed">
                          <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2. НЕРАЗГАДАНАТА МИСТЕРИЯ */}
                  <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4 text-amber-700" />
                      <span>2. Неразгаданата мистерия:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                      {item.unsolvedMystery}
                    </p>
                  </div>

                  {/* 3. ВОДЕЩИ ХИПОТЕЗИ */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-2">
                      <FileQuestion className="w-4 h-4 text-blue-600" />
                      <span>3. Водещите хипотези и аргументи:</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.hypotheses.map((hyp, hIdx) => (
                        <div key={hIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                          <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span>{hyp.title}</span>
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {hyp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. ТЕМА ЗА РАЗМИСЪЛ */}
                  <div className="p-4 sm:p-5 rounded-xl bg-amber-50/40 border border-amber-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4 text-amber-700" />
                      <span>4. Тема за размисъл:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic font-serif">
                      „{item.foodForThought}“
                    </p>
                  </div>

                  {/* 5. INTERACTIVE CAUSE-AND-EFFECT ACTIONS */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => onNavigateTab?.('timeline')}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
                      >
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Хронология на събитията</span>
                      </button>

                      <button
                        onClick={() => onNavigateTab?.('chat')}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                        <span>Дискутирай с учебния ментор</span>
                      </button>
                    </div>

                    {relatedLesson && onSelectLesson && (
                      <button
                        onClick={() => onSelectLesson(relatedLesson)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
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
  );
};
