import React, { useMemo, useState } from 'react';
import {
  Sparkles,
  Quote,
  Copy,
  Check,
  Search,
  BookMarked,
  Lightbulb,
  FileText,
  Loader2,
  RefreshCw,
  BookOpen,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  LITERATURE_CANON,
  LITERATURE_THEMATIC_CYCLES,
  type LiteratureAuthor,
} from '../data/literatureDatabase';
import {
  generateCustomLiteratureThesisWithGemini,
  type LiteratureCustomAiThesis,
  AI_PROVIDER_LABEL,
} from '../services/geminiService';
import {
  AUTHOR_LINKED_LESSON_MAP,
  generateAuthorInfiniteQuiz,
} from '../services/infiniteLabGenerators';

export interface LiteratureCanonViewProps {
  onOpenLessonId?: (lessonId: string) => void;
}

export const LiteratureCanonView: React.FC<LiteratureCanonViewProps> = ({ onOpenLessonId }) => {
  const [selectedCycle, setSelectedCycle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>(LITERATURE_CANON[0].id);
  const [selectedEssayThemeIndex, setSelectedEssayThemeIndex] = useState<number>(0);
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);
  const [copiedThesis, setCopiedThesis] = useState<boolean>(false);
  const [customAiTopic, setCustomAiTopic] = useState<string>('');
  const [customAiResult, setCustomAiResult] = useState<LiteratureCustomAiThesis | null>(null);
  const [isAiLitLoading, setIsAiLitLoading] = useState<boolean>(false);
  const [aiLitError, setAiLitError] = useState<string | null>(null);

  const [authorQuizVariant, setAuthorQuizVariant] = useState<number>(1);
  const [authorQuizAnswers, setAuthorQuizAnswers] = useState<Record<string, number>>({});
  const [authorQuizRevealed, setAuthorQuizRevealed] = useState<Record<string, boolean>>({});

  // Filter authors by search or thematic cycle
  const filteredAuthors = LITERATURE_CANON.filter((author) => {
    const matchesSearch =
      author.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      author.works.some((w) => w.title.toLowerCase().includes(searchQuery.toLowerCase().trim()));

    if (!matchesSearch) return false;

    if (selectedCycle === 'all') return true;
    if (selectedCycle === 'rodnoto') {
      return ['botev', 'vazov', 'aleko', 'talev', 'debelyanov', 'bagryana'].includes(author.id);
    }
    if (selectedCycle === 'freedom') {
      return ['botev', 'vazov', 'yavorov', 'geo_milev', 'bagryana'].includes(author.id);
    }
    if (selectedCycle === 'faith') {
      return ['yovkov', 'vaptsarov', 'pencho_slaveykov', 'geo_milev'].includes(author.id);
    }
    if (selectedCycle === 'love_death') {
      return ['yavorov', 'vaptsarov', 'botev', 'debelyanov', 'pencho_slaveykov', 'dimov'].includes(author.id);
    }
    if (selectedCycle === 'choice') {
      return ['botev', 'elin_pelin', 'talev', 'smirnenski', 'dimov', 'pencho_slaveykov'].includes(author.id);
    }
    if (selectedCycle === 'city_village') {
      return ['elin_pelin', 'smirnenski', 'dalchev', 'yovkov', 'aleko'].includes(author.id);
    }
    return true;
  });

  const activeAuthor: LiteratureAuthor =
    LITERATURE_CANON.find((a) => a.id === selectedAuthorId) || filteredAuthors[0] || LITERATURE_CANON[0];

  const authorInfiniteQuestions = useMemo(
    () => generateAuthorInfiniteQuiz(activeAuthor, LITERATURE_CANON, authorQuizVariant),
    [activeAuthor, authorQuizVariant]
  );

  const handleCopyQuote = (quoteText: string) => {
    navigator.clipboard.writeText(quoteText);
    setCopiedQuote(quoteText);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  const activeEssayTheme = activeAuthor.essayThemes[selectedEssayThemeIndex] || activeAuthor.essayThemes[0];

  const handleCopyThesis = () => {
    const fullText = `Тема: ${activeEssayTheme.theme} (${activeAuthor.name})\nТеза: ${activeEssayTheme.thesisPreview}\nПрепоръчани творби: ${activeEssayTheme.recommendedWorks.join(', ')}`;
    navigator.clipboard.writeText(fullText);
    setCopiedThesis(true);
    setTimeout(() => setCopiedThesis(false), 2000);
  };

  const linkedLessonId = AUTHOR_LINKED_LESSON_MAP[activeAuthor.id];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#083861] via-[#0a4b82] to-[#145a96] text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Литературен Канон & Тези за ДЗИ (11.–12. клас)
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Всички задължителни автори и произведения по програмата на МОН. Готови структурирани тези за есе и литературноинтерпретативно съчинение, ключови цитати, анализ на родовите конфликти и безкраен генератор на тестови варианти върху всеки автор.
          </p>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-blue-100">
            <BookMarked className="w-3.5 h-3.5 text-emerald-300 shrink-0" aria-hidden="true" />
            <span>41. задача на ДЗИ • ЕСЕ & ЛИС • 30 точки</span>
          </p>
        </div>
      </div>

      {/* Thematic Filter & Search Bar */}
      <search className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        {/* Thematic Cycles Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {LITERATURE_THEMATIC_CYCLES.map((cycle) => (
            <button
              key={cycle.id}
              type="button"
              onClick={() => setSelectedCycle(cycle.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer font-medium ${
                selectedCycle === cycle.id
                  ? 'bg-slate-600 text-white font-bold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cycle.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Търси автор или творба..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600"
          />
        </div>
      </search>

      {/* Author Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {filteredAuthors.map((author) => {
          const isSelected = author.id === activeAuthor.id;
          return (
            <button
              key={author.id}
              type="button"
              onClick={() => {
                setSelectedAuthorId(author.id);
                setSelectedEssayThemeIndex(0);
                setAuthorQuizVariant(1);
                setAuthorQuizAnswers({});
                setAuthorQuizRevealed({});
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-50 border-slate-300 text-slate-950 font-bold shadow-xs ring-1 ring-slate-400'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center mb-2">
                {author.avatarText}
              </div>
              <div>
                <div className="text-xs font-bold truncate">{author.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{author.period.split(' ')[0]}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Author & Works Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Author Details & Required Works */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  {activeAuthor.period}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {activeAuthor.name}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {onOpenLessonId && linkedLessonId && (
                  <button
                    type="button"
                    onClick={() => onOpenLessonId(linkedLessonId)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Отвори пълен урок по МОН</span>
                  </button>
                )}
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center border border-slate-200">
                  {activeAuthor.avatarText}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {activeAuthor.aestheticRole}
            </p>

            {/* Key Themes Tags */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Ключови мотиви за есе:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeAuthor.keyThemes.map((theme, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Required Works List */}
            <div className="space-y-4 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Задължителни произведения по програмата на МОН ({activeAuthor.works.length}):
              </div>

              <div className="space-y-3">
                {activeAuthor.works.map((work, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{work.title}</h3>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                        <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-semibold">
                          {work.genre}
                        </span>
                        <span>{work.year} г.</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{work.coreIdea}</p>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="text-[10px] uppercase font-bold text-slate-700 flex items-center gap-1">
                          <Quote className="w-3 h-3" />
                          <span>Ключов цитат за аргументация:</span>
                        </div>
                        <div className="italic text-slate-700 font-medium">{work.famousQuote}</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyQuote(work.famousQuote)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors shrink-0"
                        title="Копирай цитата"
                      >
                        {copiedQuote === work.famousQuote ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-1">
                      <strong className="text-slate-700">Основен конфликт:</strong> {work.conflict}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Native Accordion for MON Study Reference */}
            <details className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700">
              <summary className="font-bold text-slate-900 cursor-pointer select-none">
                Пълен методически конспект по МОН за {activeAuthor.name} (Жанрове, Периодизация и Критерии за ДЗИ)
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 leading-relaxed">
                <p>
                  <strong>Литературноисторически период:</strong> {activeAuthor.period} •{' '}
                  <strong>Естетическа роля:</strong> {activeAuthor.aestheticRole}.
                </p>
                <p>
                  <strong>Задължителни жанрови форми за разпознаване в Модул 1 и Модул 2 на ДЗИ:</strong>{' '}
                  {activeAuthor.works.map((w) => `„${w.title}“ (${w.genre}, ${w.year} г.)`).join('; ')}.
                </p>
                <p>
                  <strong>Методически указания за Задача 41 (30 т.):</strong> При интерпретативно съчинение (ЛИС) анализирайте художествените образи, композицията и тропите в текста. При есе формулирайте лична философско-гражданска позиция по проблема, подкрепена с примери от българската класика и личен житейски опит.
                </p>
              </div>
            </details>
          </div>
        </div>

        {/* Right Column: DZI Essay & LIS Thesis Builder (Task 41) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1 pb-4 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Генератор на тези за 41. задача</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Примерни тези за есе и ЛИС
              </h3>
              <p className="text-xs text-slate-600">
                Избери тема, по която се пада {activeAuthor.name} на матурата:
              </p>
            </div>

            {/* Theme Selector Pills */}
            <div className="space-y-2">
              {activeAuthor.essayThemes.map((th, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedEssayThemeIndex(i)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                    selectedEssayThemeIndex === i
                      ? 'bg-slate-600 text-white font-bold border-slate-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {th.theme}
                </button>
              ))}
            </div>

            {/* Structured Thesis Preview */}
            <div className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span>Структура на тезата:</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Критерий Отличен (6.00)
                </span>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed font-medium space-y-2">
                <p>{activeEssayTheme.thesisPreview}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Препоръчани творби:</span>
                {activeEssayTheme.recommendedWorks.map((rw, k) => (
                  <span
                    key={k}
                    className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-800 font-medium border border-slate-200"
                  >
                    {rw}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCopyThesis}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedThesis ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Тезата е копирана в клипборда!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Копирай готовата теза за Модул 3</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Writing Advice Pill */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong>Съвет за матурата:</strong> В Модул 3 имаш право да избираш между ЛИС и Есе. В ЛИС задължително формулирай теза от 3 микротези и анализирай авторовите похвати (метафори, опозиции, заглавие).
              </div>
            </div>

            {/* AI Custom Thesis & Argument Generator */}
            <div className="p-5 rounded-2xl bg-blue-950 text-white border border-blue-700 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Генерирай AI теза по твоя тема ({AI_PROVIDER_LABEL})</span>
              </div>
              <p className="text-[11px] text-blue-200">
                Въведи произволно заглавие за есе или ЛИС върху <strong>{activeAuthor.name}</strong> и получи готова 30-точкова разработка:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={customAiTopic}
                  onChange={(e) => setCustomAiTopic(e.target.value)}
                  placeholder={`Напр.: Проблемът за избора и свободата у ${activeAuthor.name}...`}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-blue-300 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={async () => {
                    const topic = customAiTopic.trim() || activeEssayTheme.theme;
                    if (isAiLitLoading) return;
                    setIsAiLitLoading(true);
                    setAiLitError(null);
                    try {
                      const res = await generateCustomLiteratureThesisWithGemini({
                        authorName: activeAuthor.name,
                        worksList: activeAuthor.works.map((w) => w.title).join(', '),
                        customTopic: topic,
                      });
                      setCustomAiResult(res);
                    } catch (err) {
                      setAiLitError(err instanceof Error ? err.message : 'Грешка при връзка с AI Екзаминатора.');
                    } finally {
                      setIsAiLitLoading(false);
                    }
                  }}
                  disabled={isAiLitLoading}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {isAiLitLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{isAiLitLoading ? 'Генерира се...' : 'Състави теза (30 т.)'}</span>
                </button>
              </div>

              {aiLitError && (
                <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-xs text-rose-200">
                  {aiLitError}
                </div>
              )}

              {customAiResult && (
                <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2.5 text-xs">
                  <div>
                    <strong className="text-amber-300 block mb-0.5">Основна теза (7/7 т.):</strong>
                    <p className="text-white leading-relaxed">{customAiResult.thesis}</p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-emerald-300 block">3 Аргументативни микротези:</strong>
                    {customAiResult.arguments.map((arg, idx) => (
                      <div key={idx} className="text-blue-100 leading-relaxed">
                        • {arg}
                      </div>
                    ))}
                  </div>
                  {customAiResult.keyQuotesToUse.length > 0 && (
                    <div className="text-[11px] text-slate-200">
                      <strong className="text-white">Цитати за опора:</strong>{' '}
                      {customAiResult.keyQuotesToUse.join(' | ')}
                    </div>
                  )}
                  <div className="pt-1 border-t border-white/10 text-blue-100">
                    <strong className="text-amber-300">Заключение:</strong> {customAiResult.conclusion}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Author & Works Quiz Generator Section */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider mb-1">
              Безкраен генератор на тестове по МОН • Вариант #{authorQuizVariant}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Интерактивен тест върху {activeAuthor.name} ({authorInfiniteQuestions.length} въпроса)
            </h3>
            <p className="text-xs text-slate-600">
              Всеки вариант проверява жанровете, годините, ключовите цитати, конфликтите и тезите върху {activeAuthor.name} с динамично разбъркване.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setAuthorQuizVariant((prev) => prev + 1);
                setAuthorQuizAnswers({});
                setAuthorQuizRevealed({});
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-sapphire hover:bg-brand-sapphire-light text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Нов вариант върху автора (∞)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {authorInfiniteQuestions.map((q, qIdx) => {
            const selectedIdx = authorQuizAnswers[q.id];
            const isRevealed = Boolean(authorQuizRevealed[q.id]);
            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Въпрос #{qIdx + 1}</span>
                    <span>ДЗИ БЕЛ • {activeAuthor.name}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isPicked = selectedIdx === optIdx;
                      const isCorrect = optIdx === q.correctIndex;
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100';
                      if (isRevealed) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isPicked) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                        }
                      } else if (isPicked) {
                        btnStyle = 'bg-slate-900 border-slate-900 text-white font-bold';
                      }
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => {
                            setAuthorQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                            setAuthorQuizRevealed((prev) => ({ ...prev, [q.id]: true }));
                          }}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-start justify-between gap-2 ${btnStyle}`}
                        >
                          <span>
                            <strong>{['А', 'Б', 'В', 'Г'][optIdx]})</strong> {opt}
                          </span>
                          {isRevealed && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {isRevealed && isPicked && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isRevealed && (
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Обяснение по МОН:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
