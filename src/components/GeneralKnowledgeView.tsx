import React, { useState } from 'react';
import { Compass, Search, Sparkles, ChevronRight, HelpCircle, CheckCircle2, FileQuestion, Lightbulb, Calendar } from 'lucide-react';
import { UNSOLVED_MYSTERIES_DATA, type UnsolvedMysteryItem } from '../data/generalKnowledgeData';

export const GeneralKnowledgeView: React.FC = () => {
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

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Dossier / Investigation theme */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Досиета на неизвестното • Тема за размисъл</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            Неразгадани случки от историята и географията
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Предоставяме доказаните факти, очертаваме мистерията и оставяме въпросите, върху които историците и географите продължават да спорят.
          </p>
        </div>

        {/* Action Button: Random Curiosity */}
        <button
          onClick={handleRandomPick}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors shadow-sm whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Търси случка, година, загадка..."
            className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Items Stream */}
      <div className="space-y-4">
        {filteredItems.map((item: UnsolvedMysteryItem) => {
          const isExpanded = expandedItemId === item.id;

          return (
            <div
              id={`mystery-${item.id}`}
              key={item.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900 border-indigo-500/70 shadow-xl'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header Accordion */}
              <div
                onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-800/20 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{item.unsolvedYearOrPeriod}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-100">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 flex-shrink-0">
                  <FileQuestion className="w-4 h-4" />
                  <span>{isExpanded ? 'Затвори досието' : 'Разгледай фактите и мистерията'}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
              </div>

              {/* Expanded Investigation Content */}
              {isExpanded && (
                <div className="p-5 sm:p-7 border-t border-slate-800/80 bg-slate-950/70 space-y-6">
                  
                  {/* 1. ФАКТИТЕ, КОИТО ЗНАЕМ СЪС СИГУРНОСТ */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>1. Фактите, които знаем със сигурност:</span>
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-1">
                      {item.knownFacts.map((fact, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                          <span className="font-mono text-emerald-400 font-bold mt-0.5">•</span>
                          <span className="leading-relaxed">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2. МИСТЕРИЯТА / КАКВО ОСТАВА НЕРАЗГАДАНО? */}
                  <div className="p-4 sm:p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span>2. Мистерията: Какво остава неразгадано?</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-serif sm:font-sans">
                      {item.unsolvedMystery}
                    </p>
                  </div>

                  {/* 3. ХИПОТЕЗИТЕ И ТЕОРИИТЕ */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                      <FileQuestion className="w-4 h-4 text-indigo-400" />
                      <span>3. Водещите хипотези и аргументи:</span>
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

                  {/* 4. ТЕМА ЗА РАЗМИСЪЛ */}
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border-2 border-indigo-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>4. Тема за размисъл:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-serif">
                      „{item.foodForThought}“
                    </p>
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
