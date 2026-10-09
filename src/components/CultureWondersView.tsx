import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Sparkles,
  ChevronRight,
  Volume2,
  VolumeX,
  Compass,
  Bookmark,
  Share2,
  Check,
  Navigation
} from 'lucide-react';
import { NATURAL_WONDERS_DATA, type NaturalWonderItem } from '../data/generalKnowledgeData';

export const CultureWondersView: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Всички');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('studybg_bookmarked_wonders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const regions: { id: string; label: string }[] = [
    { id: 'Всички', label: `Всички чудеса (${NATURAL_WONDERS_DATA.length})` },
    { id: 'Рила & Пирин', label: 'Рила & Пирин' },
    { id: 'Родопи', label: 'Родопи' },
    { id: 'Стара планина', label: 'Стара планина' },
    { id: 'Дунавска равнина & Северозапад', label: 'Северозапад & Дунав' },
    { id: 'Черноморие & Странджа', label: 'Черноморие & Странджа' }
  ];

  const filteredWonders = NATURAL_WONDERS_DATA.filter((w) => {
    const matchesRegion = selectedRegion === 'Всички' || w.region === selectedRegion;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      w.name.toLowerCase().includes(q) ||
      w.locationInfo.toLowerCase().includes(q) ||
      w.shortDescription.toLowerCase().includes(q) ||
      w.geologicalOrigin.toLowerCase().includes(q) ||
      w.legendAndFolklore.toLowerCase().includes(q) ||
      w.curiousFact.toLowerCase().includes(q);
    return matchesRegion && matchesQuery;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('studybg_bookmarked_wonders', JSON.stringify(next));
      return next;
    });
  };

  const handleShare = (item: NaturalWonderItem) => {
    const shareText = `Природно чудо на България: ${item.name} (${item.locationInfo})\n${item.shortDescription}\nЛюбопитен факт: ${item.curiousFact}\nВиж повече в StudyBG: https://studybg.vercel.app#wonders`;
    navigator.clipboard.writeText(shareText);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleAudio = (item: NaturalWonderItem) => {
    if (!('speechSynthesis' in window)) return;

    if (playingAudioId === item.id) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `${item.name}. ${item.shortDescription}. Геоложки произход: ${item.geologicalOrigin}. Народна легенда: ${item.legendAndFolklore}. Любопитен факт: ${item.curiousFact}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.95;

    utterance.onend = () => setPlayingAudioId(null);
    utterance.onerror = () => setPlayingAudioId(null);

    setPlayingAudioId(item.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleRandomWonder = () => {
    const randomIdx = Math.floor(Math.random() * NATURAL_WONDERS_DATA.length);
    const chosen = NATURAL_WONDERS_DATA[randomIdx];
    setSelectedRegion('Всички');
    setSearchQuery('');
    setExpandedId(chosen.id);

    const el = document.getElementById(`wonder-${chosen.id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Географска съкровищница • 12 природни феномена на България</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Природни чудеса, ледникови езера и скални лабиринти
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Открийте научното обяснение и вековните народни предания зад най-впечатляващите природни феномени по нашите земи.
          </p>
        </div>

        <button
          onClick={handleRandomWonder}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Изненадай ме с природно чудо</span>
        </button>
      </div>

      {/* Region Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-xl bg-slate-100 border border-slate-200 no-scrollbar">
        {regions.map((reg) => (
          <button
            key={reg.id}
            onClick={() => setSelectedRegion(reg.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedRegion === reg.id
                ? 'bg-white text-teal-800 border border-teal-300 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            {reg.label}
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
          placeholder="Търси природно чудо по име, планина, легенда или геоложки факт..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 placeholder:text-slate-400 shadow-2xs"
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

      {/* Wonders Catalog Grid (2-Column Responsive Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {filteredWonders.map((wonder) => {
          const isExpanded = expandedId === wonder.id;
          const isBookmarked = bookmarkedIds.includes(wonder.id);
          const isAudioPlaying = playingAudioId === wonder.id;

          return (
            <article
              key={wonder.id}
              id={`wonder-${wonder.id}`}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'col-span-1 md:col-span-2 bg-white border-teal-300 shadow-lg ring-2 ring-teal-200/60'
                  : 'col-span-1 bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Card Header & Preview */}
              <div
                className="p-5 sm:p-6 cursor-pointer select-none flex flex-col justify-between"
                onClick={() => {
                  const willExpand = !isExpanded;
                  setExpandedId(willExpand ? wonder.id : null);
                  if (willExpand) {
                    setTimeout(() => {
                      const el = document.getElementById(`wonder-${wonder.id}`);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 50);
                  }
                }}
              >
                <div>
                  {/* Top Badges Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-teal-50 border border-teal-200 text-teal-800">
                        {wonder.region}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium px-2 py-0.5 rounded bg-slate-100">
                        <Navigation className="w-3 h-3 text-slate-400" />
                        <span>{wonder.locationInfo}</span>
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {wonder.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                    {wonder.name}
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
                    {wonder.shortDescription}
                  </p>

                  {/* Curious Fact Snippet (shown when collapsed) */}
                  {!isExpanded && (
                    <div className="mt-3 p-3 rounded-xl bg-teal-50/50 border border-teal-100 text-xs text-teal-950 leading-relaxed">
                      <span className="font-semibold text-teal-800 block text-[11px] uppercase tracking-wider mb-0.5">
                        Любопитен факт:
                      </span>
                      <span className="line-clamp-2">{wonder.curiousFact}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Strip */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleAudio(wonder)}
                      className={`p-2 rounded-xl text-xs font-medium border transition-colors shadow-2xs ${
                        isAudioPlaying
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                      title={isAudioPlaying ? 'Спри четенето' : 'Слушай разказа с аудио'}
                    >
                      {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => toggleBookmark(wonder.id)}
                      className={`p-2 rounded-xl text-xs font-medium border transition-colors shadow-2xs ${
                        isBookmarked
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                      title={isBookmarked ? 'Премахни от любими' : 'Запази в любими'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleShare(wonder)}
                      className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-medium transition-colors shadow-2xs"
                      title="Копирай за споделяне"
                    >
                      {copiedId === wonder.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-600" />}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const willExpand = !isExpanded;
                      setExpandedId(willExpand ? wonder.id : null);
                      if (willExpand) {
                        setTimeout(() => {
                          const el = document.getElementById(`wonder-${wonder.id}`);
                          el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 50);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                      isExpanded
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        : 'bg-teal-600 hover:bg-teal-700 text-white'
                    }`}
                  >
                    <span>{isExpanded ? 'Свий досието' : 'Разгледай феномена'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Expanded Deep-Dive Details */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-200">
                  
                  {/* 2-Column Grid: Geological Origin & Folklore Legend */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Geological origin */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-teal-600" />
                        <span>Научен геоложки произход</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {wonder.geologicalOrigin}
                      </p>
                    </div>

                    {/* Folklore Legend */}
                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                        <span>Народно предание & легенда</span>
                      </div>
                      <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-normal italic">
                        „{wonder.legendAndFolklore}“
                      </p>
                    </div>
                  </div>

                  {/* Curious Fact Box */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white text-emerald-700 border border-emerald-200 shadow-2xs flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                        Знаете ли, че?
                      </h4>
                      <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                        {wonder.curiousFact}
                      </p>
                    </div>
                  </div>

                  {/* Visitor Tip */}
                  <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span><strong>Съвет за туристи:</strong> {wonder.visitorTip}</span>
                    </div>
                  </div>

                </div>
              )}
            </article>
          );
        })}

        {filteredWonders.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
            <MapPin className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">Няма намерени природни чудеса</h4>
            <p className="text-xs text-slate-500">
              Опитайте с друго търсене или изберете „Всички чудеса“.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
