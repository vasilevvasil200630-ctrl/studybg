import React, { useState } from 'react';
import { Compass, Search, Sparkles, ChevronRight, MapPin, Eye, Award } from 'lucide-react';
import { GENERAL_KNOWLEDGE_DATA } from '../data/generalKnowledgeData';

export const GeneralKnowledgeView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(GENERAL_KNOWLEDGE_DATA[0].id);

  const categories = [
    { id: 'all', label: 'Всички хроники' },
    { id: 'mysteries', label: 'Исторически мистерии & Загадки' },
    { id: 'ancient', label: 'Древна история & Траки' },
    { id: 'geography', label: 'Географски феномени' },
    { id: 'facts', label: 'Знаехте ли, че...' }
  ];

  const filteredItems = GENERAL_KNOWLEDGE_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.periodOrLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullStory.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleRandomPick = () => {
    const randomIdx = Math.floor(Math.random() * GENERAL_KNOWLEDGE_DATA.length);
    const chosen = GENERAL_KNOWLEDGE_DATA[randomIdx];
    setSelectedCategory('all');
    setSearchQuery('');
    setExpandedItemId(chosen.id);

    // Scroll to the card
    const el = document.getElementById(`knowledge-${chosen.id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Обща култура • Неразказани тайни & Географски феномени</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            Хроники, мистерии и древни загадки
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            От гроба на Левски и гибелта на Ботев до най-старото злато в света край Варна, мистериите на Перперикон, бездната на Дяволското гърло и военната тайна Царичина.
          </p>
        </div>

        {/* Action Button: Random Curiosity */}
        <button
          onClick={handleRandomPick}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors shadow-sm whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Случайна мистерия</span>
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
            placeholder="Търси мистерия, личност, място..."
            className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Items Grid & Reader */}
      <div className="space-y-4">
        {filteredItems.map(item => {
          const isExpanded = expandedItemId === item.id;

          return (
            <div
              id={`knowledge-${item.id}`}
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
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{item.periodOrLocation}</span>
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
                  <Eye className="w-4 h-4" />
                  <span>{isExpanded ? 'Свий статията' : 'Прочети историята'}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
              </div>

              {/* Expanded Narrative Story */}
              {isExpanded && (
                <div className="p-5 sm:p-7 border-t border-slate-800/80 bg-slate-950/70 space-y-6">
                  
                  {/* Detailed Story Paragraphs */}
                  <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-serif sm:font-sans">
                    {item.fullStory.map((paragraph, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Curious Facts Box */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Малко известни факти & Свидетелства:</span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-300">
                      {item.curiousBulletPoints.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Historical / Scientific Verdict */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-300 block mb-0.5">
                        Исторически / Научен факт:
                      </span>
                      <span>{item.historicalVerdict}</span>
                    </div>
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
