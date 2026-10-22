import React, { useState, useEffect } from 'react';
import {
  Globe,
  Search,
  Sparkles,
  ChevronRight,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  Check,
  Award
} from 'lucide-react';
import { BULGARIAN_HERITAGE_DATA, type HeritageItem } from '../data/generalKnowledgeData';
import { ExamBridgeCard } from './ExamBridgeCard';
import { findLessonForHeritageItem } from '../services/curriculumBridge';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import { isString, readStoredArray } from '../lib/storage';

interface CultureHeritageViewProps {
  lessons?: LessonData[];
  onSelectLesson?: (lesson: LessonData, preferredTab?: AppNavTab) => void;
  onNavigateTab?: (tab: AppNavTab) => void;
  onSwitchToStudy?: () => void;
}

export const CultureHeritageView: React.FC<CultureHeritageViewProps> = ({
  lessons = [],
  onSelectLesson,
  onNavigateTab,
  onSwitchToStudy
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Спира гласовото четене, когато потребителят напусне изгледа
  useEffect(() => () => {
    window.speechSynthesis?.cancel();
  }, []);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() =>
    readStoredArray('studybg_bookmarked_heritage', isString)
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: `Всички постижения (${BULGARIAN_HERITAGE_DATA.length})` },
    { id: 'unesco', label: 'ЮНЕСКО наследство' },
    { id: 'invention', label: 'Изобретения & Наука' },
    { id: 'world_contribution', label: 'Световен принос' }
  ];

  const filteredItems = BULGARIAN_HERITAGE_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.shortDescription.toLowerCase().includes(q) ||
      item.worldImpact.toLowerCase().includes(q) ||
      item.fascinatingFact.toLowerCase().includes(q) ||
      item.locationOrAuthor.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('studybg_bookmarked_heritage', JSON.stringify(next));
      return next;
    });
  };

  const handleShare = (item: HeritageItem) => {
    const shareText = `Български принос към света: ${item.title} (${item.periodOrYear})\n${item.shortDescription}\nЛюбопитен факт: ${item.fascinatingFact}\nНаучи повече в StudyBG: https://studybg.vercel.app#heritage`;
    navigator.clipboard.writeText(shareText);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleAudio = (item: HeritageItem) => {
    if (!('speechSynthesis' in window)) return;

    if (playingAudioId === item.id) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `${item.title}. ${item.shortDescription}. Световно значение: ${item.worldImpact}. Знаете ли, че: ${item.fascinatingFact}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.95;

    utterance.onend = () => setPlayingAudioId(null);
    utterance.onerror = () => setPlayingAudioId(null);

    setPlayingAudioId(item.id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Златният фонд на българския гений</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Български принос към света & ЮНЕСКО съкровища
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              От първия електронен компютър и третата европейска азбука до космическия глас на „Вояджър“ и уникалните паметници под егидата на ЮНЕСКО.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs tabular-nums font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs">
              {BULGARIAN_HERITAGE_DATA.length} световни обекта и открития
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-amber-200/60">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-amber-700 text-white shadow-2xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търсене по автор, паметник, година..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Heritage Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const isBookmarked = bookmarkedIds.includes(item.id);
          const isPlaying = playingAudioId === item.id;
          const isCopied = copiedId === item.id;
          const matchingLesson = findLessonForHeritageItem(item, lessons);

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl bg-white border transition-all ${
                isExpanded
                  ? 'border-amber-400 shadow-md ring-1 ring-amber-400/30'
                  : 'border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {item.categoryLabel}
                    </span>
                    <span className="text-xs tabular-nums text-slate-500">
                      {item.periodOrYear}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {item.locationOrAuthor}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleAudio(item)}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${
                      isPlaying
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title={isPlaying ? 'Спри четенето' : 'Чуй на глас (Аудио)'}
                  >
                    {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${
                      isBookmarked
                        ? 'text-amber-600 bg-amber-50'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title={isBookmarked ? 'Премахни от запазени' : 'Запази'}
                  >
                    <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>

                  <button
                    onClick={() => handleShare(item)}
                    className="p-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Сподели"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {item.shortDescription}
              </p>

              {/* World Impact Highlight Box */}
              <div className="mt-3.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Globe className="w-3.5 h-3.5 text-amber-600" />
                  <span>Световно значение & отзвук:</span>
                </div>
                <p className="leading-relaxed">
                  {item.worldImpact}
                </p>
              </div>

              {/* Fascinating Fact (Expanded or Click to see) */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Знаете ли, че?</span>
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed animate-fadeIn">
                    {item.fascinatingFact}
                  </div>
                )}

                {/* 100-Point Exam Simulator Bridge */}
                {matchingLesson && isExpanded && (
                  <div className="mt-3">
                    <ExamBridgeCard
                      lesson={matchingLesson}
                      variant="compact"
                      contextTag="ИЗПИТЕН МОСТ ЮНЕСКО"
                      onLaunchSimulator={() => {
                        if (onSelectLesson) {
                          onSelectLesson(matchingLesson, 'simulator');
                        } else {
                          onSwitchToStudy?.();
                          onNavigateTab?.('simulator');
                        }
                      }}
                      onOpenSummary={() => {
                        if (onSelectLesson) {
                          onSelectLesson(matchingLesson, 'summary');
                        } else {
                          onSwitchToStudy?.();
                          onNavigateTab?.('summary');
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
