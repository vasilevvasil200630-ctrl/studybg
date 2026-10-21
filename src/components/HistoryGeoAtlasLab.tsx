import React, { useState, useMemo } from 'react';
import {
  Map,
  ScrollText,
  Globe,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Landmark,
  Factory,
  Navigation,
  RotateCcw,
  Award,
  RefreshCw,
} from 'lucide-react';
import {
  HISTORICAL_TREATIES_AND_MAPS,
  HISTORICAL_FIGURES_BY_SOURCE,
  BULGARIA_GEO_REGIONS,
  HISTORY_GEO_QUIZ_QUESTIONS,
  STRATEGIC_ENERGY_TECH_HUBS,
  type HistoricalTreatyEntry,
  type GeoPlanningRegion,
} from '../data/historyGeoDatabase';
import { generateHistoryGeoInfiniteQuiz } from '../services/infiniteLabGenerators';

type AtlasTab = 'treaties' | 'sources' | 'geography' | 'quiz';

export const HistoryGeoAtlasLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AtlasTab>('treaties');

  // Tab 1: Historical Treaties State
  const [selectedTreatyId, setSelectedTreatyId] = useState<string>(HISTORICAL_TREATIES_AND_MAPS[2].id); // Default 1878 San Stefano vs Berlin

  // Tab 2: Historical Sources Blind/Reveal State
  const [blindSourceMode, setBlindSourceMode] = useState<boolean>(true);
  const [revealedFigureIds, setRevealedFigureIds] = useState<Record<string, boolean>>({});

  // Tab 3: Bulgaria NUTS 2 Regions State
  const [selectedRegionId, setSelectedRegionId] = useState<string>(BULGARIA_GEO_REGIONS[5].id); // Default YUZR (Sofia)

  // Tab 4: Quiz State
  const [quizSubjectFilter, setQuizSubjectFilter] = useState<'all' | 'История и цивилизации' | 'География и икономика'>('all');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizVariant, setQuizVariant] = useState<number>(1);

  const activeTreaty: HistoricalTreatyEntry = useMemo(() => {
    return (
      HISTORICAL_TREATIES_AND_MAPS.find((t) => t.id === selectedTreatyId) ||
      HISTORICAL_TREATIES_AND_MAPS[0]
    );
  }, [selectedTreatyId]);

  const activeRegion: GeoPlanningRegion = useMemo(() => {
    return (
      BULGARIA_GEO_REGIONS.find((r) => r.id === selectedRegionId) ||
      BULGARIA_GEO_REGIONS[0]
    );
  }, [selectedRegionId]);

  const filteredQuiz = useMemo(() => {
    void HISTORY_GEO_QUIZ_QUESTIONS;
    return generateHistoryGeoInfiniteQuiz(quizSubjectFilter, quizVariant);
  }, [quizSubjectFilter, quizVariant]);
  const _legacyHistoryGeoQuiz = useMemo(() => {
    if (quizSubjectFilter === 'all') return HISTORY_GEO_QUIZ_QUESTIONS;
    return HISTORY_GEO_QUIZ_QUESTIONS.filter((q) => q.subject === quizSubjectFilter);
  }, [quizSubjectFilter]); void _legacyHistoryGeoQuiz;

  const quizStats = useMemo(() => {
    const answeredIds = Object.keys(quizAnswers);
    const correctCount = answeredIds.filter((id) => {
      const q = filteredQuiz.find((item) => item.id === id);
      return q && quizAnswers[id] === q.correctIndex;
    }).length;
    return {
      totalAnswered: answeredIds.length,
      correctCount,
    };
  }, [quizAnswers, filteredQuiz]);

  const toggleRevealFigure = (id: string) => {
    setRevealedFigureIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Render Historical Border Map SVG
  const renderHistoricalBorderMap = (zone: HistoricalTreatyEntry['mapZone']) => {
    return (
      <svg viewBox="0 0 400 230" className="w-full h-56 bg-slate-900 rounded-xl border border-slate-700 p-2">
        {/* Sea & River Reference Background */}
        {/* Black Sea on the right */}
        <path
          d="M 335 15 Q 315 80 330 150 L 395 150 L 395 15 Z"
          fill="rgba(14, 165, 233, 0.18)"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <text x="342" y="75" fill="#7dd3fc" fontSize="10" fontWeight="bold">Черно</text>
        <text x="345" y="88" fill="#7dd3fc" fontSize="10" fontWeight="bold">море</text>

        {/* Aegean Sea (Бяло море) at the bottom */}
        <path
          d="M 130 185 Q 220 170 315 185 L 340 225 L 110 225 Z"
          fill="rgba(14, 165, 233, 0.18)"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <text x="195" y="212" fill="#7dd3fc" fontSize="10" fontWeight="bold">Бяло (Егейско) море</text>

        {/* Danube River */}
        <path
          d="M 65 48 Q 180 58 295 42 L 328 28"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2.5"
        />
        <text x="155" y="42" fill="#93c5fd" fontSize="10" fontWeight="bold">р. Дунав</text>

        {/* Zone-Specific Territorial Overlays */}
        {zone === 'danube-core' && (
          <>
            <polygon
              points="95,52 295,42 328,28 325,95 95,95"
              fill="rgba(16, 185, 129, 0.28)"
              stroke="#34d399"
              strokeWidth="2.5"
            />
            <circle cx="265" cy="72" r="4" fill="#fbbf24" />
            <text x="235" y="66" fill="#fde68a" fontSize="11" fontWeight="bold">Плиска (681 г.)</text>
            <text x="115" y="85" fill="#a7f3d0" fontSize="11" fontWeight="bold">Мизия и Малка Скития (Добруджа)</text>
          </>
        )}

        {zone === 'three-seas' && (
          <>
            <polygon
              points="40,65 295,42 325,95 310,175 140,180 45,165"
              fill="rgba(16, 185, 129, 0.25)"
              stroke="#34d399"
              strokeWidth="2.5"
            />
            <circle cx="255" cy="76" r="4.5" fill="#fbbf24" />
            <text x="210" y="70" fill="#fde68a" fontSize="11" fontWeight="bold">Велики Преслав (927 г.)</text>
            <text x="85" y="130" fill="#a7f3d0" fontSize="12" fontWeight="bold">„България на три морета“</text>
            <text x="18" y="150" fill="#7dd3fc" fontSize="9" fontWeight="bold">Адриатика</text>
          </>
        )}

        {zone === 'san-stefano-berlin' && (
          <>
            {/* San Stefano outer boundary (dashed) */}
            <polygon
              points="75,52 295,44 325,95 305,172 185,180 65,165 65,95"
              fill="rgba(245, 158, 11, 0.12)"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            {/* Principality of Bulgaria (solid green) */}
            <polygon
              points="85,52 290,46 322,92 140,95 105,120 80,105"
              fill="rgba(16, 185, 129, 0.32)"
              stroke="#34d399"
              strokeWidth="2"
            />
            {/* Eastern Rumelia (purple) */}
            <polygon
              points="140,95 320,95 308,135 145,135"
              fill="rgba(168, 85, 247, 0.28)"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <text x="135" y="78" fill="#ecfdf5" fontSize="11" fontWeight="bold">Княжество България</text>
            <text x="175" y="118" fill="#f3e8ff" fontSize="11" fontWeight="bold">Източна Румелия (Пловдив)</text>
            <text x="95" y="160" fill="#fde68a" fontSize="10" fontWeight="bold">Македония и Одринско (чл. 23)</text>
          </>
        )}

        {zone === 'unification-1885' && (
          <>
            <polygon
              points="85,52 290,46 322,92 308,135 145,135 105,120 80,105"
              fill="rgba(16, 185, 129, 0.32)"
              stroke="#34d399"
              strokeWidth="2.5"
            />
            <circle cx="115" cy="105" r="4" fill="#fbbf24" />
            <circle cx="195" cy="118" r="4" fill="#fbbf24" />
            <text x="100" y="96" fill="#fde68a" fontSize="10" fontWeight="bold">София / Сливница</text>
            <text x="145" y="82" fill="#ecfdf5" fontSize="12" fontWeight="bold">Съединена България (1885/1886 г.)</text>
          </>
        )}

        {zone === 'neuilly-1919' && (
          <>
            {/* Main territory */}
            <polygon
              points="92,54 275,54 322,92 305,140 125,145 92,115"
              fill="rgba(59, 130, 246, 0.22)"
              stroke="#60a5fa"
              strokeWidth="2"
            />
            {/* Lost Western Thrace */}
            <polygon
              points="165,145 295,142 295,180 165,180"
              fill="rgba(244, 63, 94, 0.35)"
              stroke="#fb7185"
              strokeWidth="2"
            />
            {/* Lost Western Outlands */}
            <polygon
              points="72,85 92,85 92,135 72,135"
              fill="rgba(244, 63, 94, 0.35)"
              stroke="#fb7185"
              strokeWidth="2"
            />
            <text x="172" y="166" fill="#ffe4e6" fontSize="10" fontWeight="bold">Отнета Западна Тракия (1919)</text>
            <text x="20" y="112" fill="#fda4af" fontSize="9" fontWeight="bold">Зап. покрайнини</text>
          </>
        )}

        {zone === 'craiova-1940' && (
          <>
            <polygon
              points="92,54 275,54 322,92 305,140 125,145 92,115"
              fill="rgba(59, 130, 246, 0.2)"
              stroke="#60a5fa"
              strokeWidth="2"
            />
            {/* Restored Southern Dobrudzha */}
            <polygon
              points="265,44 328,35 325,75 265,70"
              fill="rgba(16, 185, 129, 0.45)"
              stroke="#34d399"
              strokeWidth="2.5"
            />
            <text x="205" y="32" fill="#6ee7b7" fontSize="11" fontWeight="bold">Върната Южна Добруджа (7.IX.1940 г.)</text>
          </>
        )}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Header */}
      <div className="rounded-2xl bg-gradient-to-br from-[#083861] via-[#0a4b82] to-[#145a96] text-white p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Мирни Договори, Исторически Извори & Икономически Райони (NUTS 2)
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Интерактивна подготовка за ДЗИ и НВО по История и цивилизации и География и икономика — карти на териториалните промени (681–1940 г.), разпознаване на личности по анонимен извор и стопанска карта на 6-те района в България.
            </p>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-blue-100">
              <Globe className="w-3.5 h-3.5 text-emerald-300 shrink-0" aria-hidden="true" />
              <span>История и География • Атлас & хронологичен тренажор</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs">
              <div className="text-slate-300">Решени в тренажора</div>
              <div className="text-base font-bold text-emerald-300">
                {quizStats.correctCount} / {HISTORY_GEO_QUIZ_QUESTIONS.length} верни
              </div>
            </div>
          </div>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('treaties')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'treaties'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Map className="w-4 h-4 text-amber-600" />
            <span>1. Договори & Карти (681–1940 г.)</span>
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'sources'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <ScrollText className="w-4 h-4 text-blue-600" />
            <span>2. Познай Личността по Извор ({HISTORICAL_FIGURES_BY_SOURCE.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('geography')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'geography'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>3. 6-те Района на България (NUTS 2)</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <Sparkles className="w-4 h-4 text-slate-600" />
            <span>4. Изпитен Тренажор ({HISTORY_GEO_QUIZ_QUESTIONS.length})</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: HISTORICAL TREATIES & INTERACTIVE BORDER MAPS                  */}
      {/* ===================================================================== */}
      {activeTab === 'treaties' && (
        <div className="space-y-5">
          {/* Horizontal Chronological Timeline Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {HISTORICAL_TREATIES_AND_MAPS.map((t) => {
              const isSelected = t.id === activeTreaty.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTreatyId(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-amber-800 mb-0.5">{t.year}</div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                    {t.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Treaty Details & Map */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-bold">
                  {activeTreaty.periodBadge} • {activeTreaty.year}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1.5">
                  {activeTreaty.title}
                </h3>
              </div>
              <div className="text-xs font-medium text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200">
                <strong>Страни по договора:</strong> {activeTreaty.signatories}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-5 space-y-2">
                {renderHistoricalBorderMap(activeTreaty.mapZone)}
                <div className="text-[11px] text-slate-500 text-center">
                  Схематична карта на границите и териториалните промени ({activeTreaty.year})
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <div className="text-xs font-bold uppercase text-emerald-900 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Териториални придобивки и признати граници:</span>
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm text-emerald-950 list-disc list-inside">
                    {activeTreaty.territorialGains.map((g, i) => (
                      <li key={i} className="leading-relaxed">{g}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200">
                  <div className="text-xs font-bold uppercase text-rose-900 mb-1.5 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Откъснати земи и териториални загуби:</span>
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm text-rose-950 list-disc list-inside">
                    {activeTreaty.territorialLosses.map((l, i) => (
                      <li key={i} className="leading-relaxed">{l}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-xs font-bold uppercase text-blue-800 mb-1.5 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-blue-600" />
                    <span>Дипломатически, военни и финансови клаузи:</span>
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                    {activeTreaty.diplomaticClauses.map((c, i) => (
                      <li key={i} className="leading-relaxed">{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 leading-relaxed">
                <strong className="uppercase block text-amber-900 mb-0.5">
                  Внимание за матурата по История (Честа уловка):
                </strong>
                {activeTreaty.examTrap}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: RECOGNIZE HISTORICAL FIGURE BY PRIMARY SOURCE                  */}
      {/* ===================================================================== */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-slate-900">
                Тренажор за Модул 2/3 на ДЗИ: „Разпознай историческата личност по писмен извор“
              </div>
              <div className="text-xs text-slate-600">
                Прочети откъса от документа, открий ключовите маркери в текста и провери дали разпознаваш автора/държавника.
              </div>
            </div>
            <button
              onClick={() => {
                setBlindSourceMode((prev) => !prev);
                setRevealedFigureIds({});
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer"
            >
              {blindSourceMode ? (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Покажи всички имена</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Скрий имената (Изпитен режим)</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {HISTORICAL_FIGURES_BY_SOURCE.map((fig, idx) => {
              const isRevealed = !blindSourceMode || !!revealedFigureIds[fig.id];
              return (
                <div
                  key={fig.id}
                  className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold">
                      Писмен извор #{idx + 1}
                    </span>
                    <button
                      onClick={() => toggleRevealFigure(fig.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-sapphire hover:bg-brand-sapphire-light text-white text-xs font-bold cursor-pointer"
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Скрий отговора</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Разкрий личността и анализа</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Primary Source Quote */}
                  <blockquote className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-slate-800 italic text-sm sm:text-base leading-relaxed">
                    {fig.sourceExcerpt}
                  </blockquote>

                  {/* Clues always visible to help student deduce */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Ключови улики в текста:</span>
                    {fig.keyCluesInText.map((clue, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                      >
                        {clue}
                      </span>
                    ))}
                  </div>

                  {isRevealed && (
                    <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2.5">
                      <div>
                        <div className="text-xs font-bold uppercase text-blue-700">
                          Историческа личност и документ:
                        </div>
                        <div className="text-base sm:text-lg font-bold text-slate-900">
                          {fig.personName} — <span className="text-blue-900 font-semibold">{fig.sourceTitle}</span>
                        </div>
                        <div className="text-xs text-slate-600 font-medium">{fig.roleAndYears}</div>
                      </div>
                      <div className="pt-2 border-t border-blue-200/70">
                        <div className="text-xs font-bold text-blue-900 mb-1">
                          Какво задължително се пише в отговора на матурата:
                        </div>
                        <ul className="space-y-1 text-xs sm:text-sm text-slate-800 list-disc list-inside">
                          {fig.historicalSignificance.map((s, sIdx) => (
                            <li key={sIdx}>{s}</li>
                          ))}
                        </ul>
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
      {/* TAB 3: BULGARIA 6 PLANNING REGIONS (NUTS 2) INTERACTIVE ATLAS         */}
      {/* ===================================================================== */}
      {activeTab === 'geography' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive SVG Map of Bulgaria's 6 Regions */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-2xl bg-gradient-to-br from-[#083861] via-[#0a4b82] to-[#145a96] p-4 text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Интерактивна карта • NUTS 2 България
                </span>
                <span className="text-[11px] text-blue-200">Кликни върху район</span>
              </div>

              <svg viewBox="0 0 400 190" className="w-full h-56">
                {/* Stara Planina Dividing Line */}
                <line
                  x1="25"
                  y1="88"
                  x2="375"
                  y2="88"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />
                {BULGARIA_GEO_REGIONS.map((reg) => {
                  const isSelected = reg.id === activeRegion.id;
                  const { x, y, width, height, color } = reg.svgCoords;
                  return (
                    <g
                      key={reg.id}
                      onClick={() => setSelectedRegionId(reg.id)}
                      className="cursor-pointer transition-opacity"
                    >
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx={10}
                        fill={color}
                        fillOpacity={isSelected ? 0.85 : 0.35}
                        stroke={isSelected ? '#ffffff' : color}
                        strokeWidth={isSelected ? 3 : 1.5}
                      />
                      <text
                        x={x + width / 2}
                        y={y + height / 2 - 4}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        {reg.code}
                      </text>
                      <text
                        x={x + width / 2}
                        y={y + height / 2 + 11}
                        textAnchor="middle"
                        fill="#f8fafc"
                        fontSize="9"
                        fontWeight="bold"
                      >
                        {reg.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {BULGARIA_GEO_REGIONS.map((reg) => {
                  const isSelected = reg.id === activeRegion.id;
                  return (
                    <button
                      key={reg.id}
                      onClick={() => setSelectedRegionId(reg.id)}
                      className={`px-2.5 py-2 rounded-lg text-left text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-emerald-950'
                          : 'bg-white/10 text-blue-100 hover:bg-slate-700'
                      }`}
                    >
                      {reg.code}: {reg.name.replace(' район', '')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Economic & Geographic Profile of Selected Region */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold">
                    Статистически район {activeRegion.code}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {activeRegion.name}
                  </h3>
                </div>
                <div className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                  Водещ център: {activeRegion.centerCity}
                </div>
              </div>

              {/* Provinces */}
              <div>
                <div className="text-xs font-bold uppercase text-slate-500 mb-1.5">
                  Включени административни области ({activeRegion.provinces.length}):
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeRegion.provinces.map((prov) => (
                    <span
                      key={prov}
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs"
                    >
                      Област {prov}
                    </span>
                  ))}
                </div>
              </div>

              {/* Relief & Hydrography */}
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="text-xs font-bold uppercase text-blue-700 mb-1">
                  Релеф, полезни изкопаеми и хидрография:
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeRegion.reliefAndRivers}
                </p>
              </div>

              {/* Leading Industries */}
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="text-xs font-bold uppercase text-emerald-700 mb-1.5 flex items-center gap-1.5">
                  <Factory className="w-4 h-4 text-emerald-600" />
                  <span>Водещи стопански отрасли и специализация:</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 list-disc list-inside">
                  {activeRegion.leadingIndustries.map((ind, i) => (
                    <li key={i} className="leading-relaxed">{ind}</li>
                  ))}
                </ul>
              </div>

              {/* Strategic Infrastructure */}
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="text-xs font-bold uppercase text-blue-700 mb-1.5 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span>Транспортна мрежа, пристанища и ГКПП:</span>
                </div>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                  {activeRegion.strategicInfrastructure.map((inf, i) => (
                    <li key={i} className="leading-relaxed">{inf}</li>
                  ))}
                </ul>
              </div>

              {/* Exam Highlight */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 leading-relaxed">
                  <strong className="uppercase block text-amber-900 mb-0.5">
                    Акцент за НВО 10. клас и ДЗИ по География:
                  </strong>
                  {activeRegion.examHighlight}
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Energy, Metallurgy & High-Tech Hubs of Bulgaria */}
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#083861] via-[#0a4b82] to-[#145a96] text-white p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Factory className="w-4 h-4" />
                  <span>Индустриално-енергиен и технологичен атлас на България</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  Стратегически енергийни, металургични и високотехнологични комплекси (ДЗИ & Трета СПК)
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                {STRATEGIC_ENERGY_TECH_HUBS.length} стратегически центъра
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {STRATEGIC_ENERGY_TECH_HUBS.map((hub) => (
                <div
                  key={hub.id}
                  className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between space-y-3 hover:border-amber-400/60 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                        {hub.regionCode}
                      </span>
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">
                        {hub.sector}
                      </span>
                    </div>

                    <div className="font-bold text-sm text-white leading-snug">
                      {hub.name}
                    </div>

                    <div className="text-[11px] font-semibold text-sky-300 bg-sky-950/60 border border-sky-800/60 rounded-lg px-2.5 py-1.5">
                      Капацитет / Продукция: {hub.capacityOrOutput}
                    </div>

                    <div className="text-[11px] text-blue-100">
                      <strong className="text-slate-100">Локализация:</strong> {hub.location}
                    </div>

                    <p className="text-[11px] text-blue-100 leading-relaxed">
                      {hub.technicalProfile}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/15 text-[11px] text-amber-200/90 leading-relaxed">
                    <strong className="text-amber-400">Изпитен / ДИППК фокус:</strong>{' '}
                    {hub.dippkAndExamRelevance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: CHRONOLOGICAL & GEOGRAPHY EXAM TRAINER                         */}
      {/* ===================================================================== */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setQuizSubjectFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  quizSubjectFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                Всички ({HISTORY_GEO_QUIZ_QUESTIONS.length})
              </button>
              <button
                onClick={() => setQuizSubjectFilter('История и цивилизации')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  quizSubjectFilter === 'История и цивилизации'
                    ? 'bg-amber-700 text-white'
                    : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                История и цивилизации
              </button>
              <button
                onClick={() => setQuizSubjectFilter('География и икономика')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  quizSubjectFilter === 'География и икономика'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                География и икономика
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setQuizVariant((prev) => prev + 1);
                  setQuizAnswers({});
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Нов вариант по История и География (∞) • Вариант #{quizVariant}</span>
              </button>
            </div>
            {quizStats.totalAnswered > 0 && (
              <button
                onClick={() => setQuizAnswers({})}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Нулирай теста</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuiz.map((q, idx) => {
              const chosen = quizAnswers[q.id];
              const isAnswered = chosen !== undefined;

              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold">
                        Въпрос #{idx + 1} • {q.examBadge}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {q.subject}
                      </span>
                    </div>

                    <div className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {q.question}
                    </div>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        let style = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                          } else if (optIdx === chosen) {
                            style = 'bg-rose-50 border-rose-400 text-rose-900';
                          } else {
                            style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-75';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() =>
                              setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                            }
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${style}`}
                          >
                            <span>
                              <strong className="mr-1.5">
                                {['А)', 'Б)', 'В)', 'Г)'][optIdx]}
                              </strong>
                              {opt}
                            </span>
                            {isAnswered && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isAnswered &&
                              optIdx === chosen &&
                              optIdx !== q.correctIndex && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isAnswered && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 block mb-0.5">Обяснение:</strong>
                      {q.explanation}
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
