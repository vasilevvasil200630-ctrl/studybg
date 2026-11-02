import React, { useState, useEffect } from 'react';
import {
  MessageSquarePlus,
  Star,
  Send,
  CheckCircle2,
  Clock,
  BarChart3,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Wrench,
  X,
  MousePointerClick
} from 'lucide-react';
import {
  analyticsService,
  readEngagementStats,
  type FeedbackCategory
} from '../services/analyticsService';
import { NativeDialog } from './NativeDialog';

interface FeedbackWidgetProps {
  currentSection: string;
  currentSectionLabel: string;
  currentLessonId?: string;
  currentLessonTitle?: string;
  currentSubject?: string;
  currentGrade?: string;
  activeDwellSeconds: number;
}

const CATEGORY_OPTIONS: Array<{
  id: FeedbackCategory;
  label: string;
  icon: React.FC<{ className?: string }>;
}> = [
  { id: 'helpful', label: 'Много полезно', icon: Sparkles },
  { id: 'feature_idea', label: 'Идея за функция', icon: Lightbulb },
  { id: 'content_issue', label: 'Сигнал за грешка в урок/тест', icon: AlertTriangle },
  { id: 'ux_issue', label: 'Технически въпрос', icon: Wrench }
];

function formatDuration(totalSeconds: number): string {
  const secs = Math.max(0, Math.round(totalSeconds));
  if (secs < 60) return `${secs} сек.`;
  const mins = Math.floor(secs / 60);
  const rem = secs % 60;
  if (mins < 60) return rem > 0 ? `${mins} мин. ${rem} сек.` : `${mins} мин.`;
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hours} ч. ${remMins} мин.`;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  currentSection,
  currentSectionLabel,
  currentLessonId,
  currentLessonTitle,
  activeDwellSeconds
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'stats'>('form');
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [category, setCategory] = useState<FeedbackCategory>('helpful');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    const onOpenEvent = () => {
      setIsOpen(true);
      setActiveTab('form');
      setSubmittedSuccess(false);
    };
    window.addEventListener('studybg:open-feedback', onOpenEvent);
    return () => window.removeEventListener('studybg:open-feedback', onOpenEvent);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitting(true);
    try {
      await analyticsService.submitFeedback({
        rating,
        category,
        message: message.trim(),
        email: email.trim() || undefined,
        section: currentSection,
        lessonId: currentLessonId,
        lessonTitle: currentLessonTitle,
        dwellSecondsOnPage: activeDwellSeconds
      });
      setSubmittedSuccess(true);
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = isOpen ? readEngagementStats() : null;
  const topSections = isOpen ? analyticsService.getTopSectionsByTime() : [];

  return (
    <>
      {/* Плаващ бутон за бърза обратна връзка */}
      <div data-print-hide className="fixed bottom-16 lg:bottom-5 right-3 sm:right-5 z-40">
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setSubmittedSuccess(false);
            analyticsService.trackAction('feedback_widget_open', { section: currentSection });
          }}
          aria-label="Отвори форма за обратна връзка и статистика за времето"
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/95 hover:bg-blue-50 text-slate-800 border border-slate-300 shadow-lg hover:border-blue-400 text-xs font-bold transition-all cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Обратна връзка</span>
        </button>
      </div>

      {isOpen && (
        <NativeDialog
          onClose={() => setIsOpen(false)}
          labelledBy="feedback-dialog-title"
          widthClassName="max-w-lg"
        >
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h2 id="feedback-dialog-title" className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    Обратна връзка & Активност в сайта
                  </h2>
                  <p className="text-[11px] text-slate-500 truncate">
                    Помогни ни да направим StudyBG още по-полезна за ДЗИ и матурите
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Затвори прозореца за обратна връзка"
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-5 pt-2.5 pb-2 border-b border-slate-200 bg-white flex gap-1.5" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'form'}
                onClick={() => setActiveTab('form')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'form'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquarePlus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Изпрати мнение / Сигнал</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'stats'}
                onClick={() => setActiveTab('stats')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'stats'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Къде отделяш най-много време</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-5 max-h-[75vh] overflow-y-auto">
              {activeTab === 'form' ? (
                submittedSuccess ? (
                  <div className="py-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Благодарим за обратната връзка!
                    </h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Твоето мнение за раздел <strong>„{currentSectionLabel}“</strong> беше записано успешно и ни помага да подобряваме уроците и тестовете по МОН.
                    </p>
                    <div className="pt-2 flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSubmittedSuccess(false)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                      >
                        Нова бележка
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                      >
                        Готово
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Context Pill */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="text-slate-700 font-medium truncate">
                        Раздел: <strong className="text-slate-900">{currentSectionLabel}</strong>
                        {currentLessonTitle ? ` • ${currentLessonTitle}` : ''}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {formatDuration(activeDwellSeconds)} тук
                      </span>
                    </div>

                    {/* Star Rating */}
                    <div>
                      <span className="block text-xs font-bold text-slate-800 mb-1.5">
                        Колко полезна ти е тази страница в момента?
                      </span>
                      <div className="flex items-center gap-1.5">
                        {([1, 2, 3, 4, 5] as const).map((starVal) => (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setRating(starVal)}
                            aria-label={`Оценка ${starVal} от 5 звезди`}
                            className={`p-2 rounded-xl border transition-all cursor-pointer ${
                              rating >= starVal
                                ? 'bg-amber-50 border-amber-300 text-amber-500'
                                : 'bg-white border-slate-200 text-slate-300 hover:text-slate-400'
                            }`}
                          >
                            <Star
                              className={`w-5 h-5 ${rating >= starVal ? 'fill-amber-400 text-amber-500' : ''}`}
                              aria-hidden="true"
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-xs font-bold text-slate-600">{rating} / 5</span>
                      </div>
                    </div>

                    {/* Category Selector */}
                    <div>
                      <span className="block text-xs font-bold text-slate-800 mb-1.5">
                        Категория на обратната връзка
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {CATEGORY_OPTIONS.map((opt) => {
                          const Icon = opt.icon;
                          const selected = category === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setCategory(opt.id)}
                              className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                                selected
                                  ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-2xs'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <Icon className={`w-4 h-4 shrink-0 ${selected ? 'text-blue-600' : 'text-slate-400'}`} />
                              <span className="truncate">{opt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label htmlFor="feedback-message" className="block text-xs font-bold text-slate-800 mb-1">
                        Твоето съобщение или препоръка *
                      </label>
                      <textarea
                        id="feedback-message"
                        required
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Напиши какво ти харесва, коя тема/задача да добавим или ако си забелязал неточност..."
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    {/* Optional Email */}
                    <div>
                      <label htmlFor="feedback-email" className="block text-xs font-bold text-slate-700 mb-1">
                        Имейл за отговор (по желание)
                      </label>
                      <input
                        id="feedback-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="pt-1 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                      >
                        Отказ
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !message.trim()}
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isSubmitting ? 'Изпращане...' : 'Изпрати мнението'}</span>
                      </button>
                    </div>
                  </form>
                )
              ) : (
                /* Tab 2: Къде отделяш най-много време */
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-600" aria-hidden="true" />
                      <span>Автоматично измерване на активно време по секции</span>
                    </div>
                    <p className="text-[11px] text-blue-800 leading-relaxed">
                      Таймерът отчита само реалното време, когато прозорецът е активен, и показва кои модули и уроци се използват най-интензивно.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[11px] text-slate-500">Текущ раздел</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                        {currentSectionLabel} ({formatDuration(activeDwellSeconds)})
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MousePointerClick className="w-3 h-3 text-blue-600" aria-hidden="true" />
                        <span>Интерактивни действия</span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">
                        {stats?.totalClicks ?? 0} клика
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900">
                      Най-посещавани раздели по прекарано време:
                    </h3>
                    {topSections.length === 0 ? (
                      <p className="text-slate-500 py-3">
                        Все още се събира статистика за текущата сесия.
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        {topSections.slice(0, 6).map((sec) => {
                          const maxSec = Math.max(topSections[0]?.totalSeconds || 1, 1);
                          const pct = Math.min(100, Math.max(8, Math.round((sec.totalSeconds / maxSec) * 100)));
                          return (
                            <div key={sec.section} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                              <div className="flex items-center justify-between font-semibold text-slate-800">
                                <span>{sec.label}</span>
                                <span className="tabular-nums text-blue-700">
                                  {formatDuration(sec.totalSeconds)} ({sec.visits} посещения)
                                </span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-blue-600"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </NativeDialog>
      )}
    </>
  );
};
