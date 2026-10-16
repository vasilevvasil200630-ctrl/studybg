import React from 'react';
import {
  X,
  Trophy,
  TrendingUp,
  Clock,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
  Database,
  Trash2
} from 'lucide-react';
import { examHistoryService, isCloudSyncEnabled, type ExamAnalyticsSummary } from '../services/examHistoryService';
import { NativeDialog } from './NativeDialog';

interface ExamHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export const ExamHistoryModal: React.FC<ExamHistoryModalProps> = ({
  isOpen,
  onClose,
  onRefresh
}) => {
  const [analytics, setAnalytics] = React.useState<ExamAnalyticsSummary>(() =>
    examHistoryService.getAnalytics()
  );

  // Последният onRefresh без да рестартира синхронизацията при всеки рендер на родителя
  const onRefreshRef = React.useRef(onRefresh);
  onRefreshRef.current = onRefresh;

  React.useEffect(() => {
    if (!isOpen) return;
    setAnalytics(examHistoryService.getAnalytics());
    // Двупосочна синхронизация с облака, ако има сесия; после опресняваме статистиката
    let active = true;
    void examHistoryService.syncWithCloud().then((result) => {
      if (!active || result.downloaded === 0) return;
      setAnalytics(examHistoryService.getAnalytics());
      onRefreshRef.current?.();
    });
    return () => {
      active = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearHistory = () => {
    if (window.confirm('Сигурни ли сте, че искате да изчистите историята на изпитните симулации?')) {
      examHistoryService.clearHistory();
      setAnalytics(examHistoryService.getAnalytics());
      if (onRefresh) onRefresh();
    }
  };

  const isCloudActive = isCloudSyncEnabled();

  return (
    <NativeDialog onClose={onClose} labelledBy="exam-history-title" widthClassName="max-w-3xl">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 id="exam-history-title" className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Академичен прогрес & История на изпитите</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                  МОН 100т.
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                <span>Проследяване на резултатите за ДЗИ 12 и НВО 10</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                  <Database className="w-3 h-3" />
                  {isCloudActive ? 'Синхронизирано със Supabase Cloud' : 'Локална памет'}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Затвори"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {analytics.totalAttempts === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Trophy className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Все още нямате записани изпити
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Завършете симулация на изпит в 100-точковия симулатор на МОН. Резултатите от Модул 1, Модул 2 и Модул 3 автоматично ще се запазват тук с оценка и статистика на напредъка.
              </p>
            </div>
          ) : (
            <>
              {/* Analytics Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* 1. Average Score */}
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                    Среден резултат
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-900 font-mono">
                    {analytics.averageScore} <span className="text-xs font-sans text-blue-600 font-medium">/ 100т.</span>
                  </div>
                  <span className="text-[10px] text-blue-700">
                    от {analytics.totalAttempts} {analytics.totalAttempts === 1 ? 'изпит' : 'изпита'}
                  </span>
                </div>

                {/* 2. Average Grade */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                    Средна оценка МОН
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-900 font-mono">
                    {analytics.averageGrade.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-amber-700">
                    по шестобалната скала
                  </span>
                </div>

                {/* 3. Highest Score */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Най-висок резултат
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-900 font-mono">
                    {analytics.highestScore} <span className="text-xs font-sans text-emerald-600 font-medium">т.</span>
                  </div>
                  <span className="text-[10px] text-emerald-700">
                    личен рекорд
                  </span>
                </div>

                {/* 4. Pass Rate */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    Успеваемост (над 30т.)
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-900 font-mono">
                    {analytics.passRate}%
                  </div>
                  <span className="text-[10px] text-amber-800">
                    покрит праг за ДЗИ
                  </span>
                </div>

              </div>

              {/* Progress Bar towards Отличен 6.00 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Път към Отличен 6.00 (90+ точки по скалата на МОН)</span>
                  </span>
                  <span className="font-mono font-bold text-blue-700">
                    {analytics.averageScore} / 100 т.
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(5, analytics.averageScore))}%` }}
                  />
                  {/* МОН Threshold Marks */}
                  <div className="absolute top-0 bottom-0 left-[30%] w-0.5 bg-rose-400" title="Праг за Тройка: 30 т." />
                  <div className="absolute top-0 bottom-0 left-[75%] w-0.5 bg-blue-400" title="Много добър: 75 т." />
                  <div className="absolute top-0 bottom-0 left-[90%] w-0.5 bg-emerald-500" title="Отличен 6.00: 90 т." />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                  <span>0т.</span>
                  <span className="text-rose-600 font-bold">30т. (Тройка)</span>
                  <span className="text-blue-600 font-bold">75т. (Мн. добър)</span>
                  <span className="text-emerald-700 font-bold">90т. (Отличен 6.00)</span>
                  <span>100т.</span>
                </div>
              </div>

              {/* Past Attempts List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Хронология на завършените изпити ({analytics.attempts.length})
                  </h4>
                  <button
                    onClick={handleClearHistory}
                    className="text-[11px] text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium transition-colors hover:underline"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Изчисти историята</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {analytics.attempts.map((attempt) => {
                    const isPassed = attempt.totalPoints >= 30;
                    return (
                      <div
                        key={attempt.id}
                        className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-2xs space-y-2.5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">
                                {attempt.lessonTitle}
                              </span>
                              <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                {attempt.subject} • {attempt.grade}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                {attempt.formattedDate}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {Math.round(attempt.timeSpentSeconds / 60)} мин. прекарани
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <span
                              className={`text-xs px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 ${
                                isPassed
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-rose-50 text-rose-800 border-rose-200'
                              }`}
                            >
                              {isPassed ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                              )}
                              <span>{attempt.gradeEquivalent}</span>
                            </span>

                            <div className="text-right">
                              <span className="text-base font-extrabold font-mono text-blue-700">
                                {attempt.totalPoints}
                              </span>
                              <span className="text-xs text-slate-400 font-mono"> / 100</span>
                            </div>
                          </div>
                        </div>

                        {/* Module breakdown pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-[11px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                            М1 (Тест): <strong>{attempt.module1Points}</strong>/40т.
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            М2 (Извор): <strong>{attempt.module2Points}</strong>/30т.
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-800 border border-slate-200">
                            М3 (Есе): <strong>{attempt.module3Points}</strong>/30т.
                          </span>
                          {attempt.hasAiEvaluation && (
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-sans font-semibold">
                              🤖 AI Оценено с Gemini
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Данните се съхраняват сигурно в Supabase базата данни и браузъра.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Затвори
          </button>
        </div>

      </div>
    </NativeDialog>
  );
};
