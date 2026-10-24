import React from 'react';
import { AlertCircle, ArrowRight, ListChecks } from 'lucide-react';
import { TOPICS, topicPercent, type TopicArea } from '../data/examTopics';
import { loadTopicStats } from '../lib/topicProgress';
import { requestSimulatorMode } from '../lib/simulatorMode';
import { errorBankService } from '../services/errorBankService';
import { examHistoryService } from '../services/examHistoryService';
import type { TargetExamTrack } from '../services/studyProgressService';

/**
 * „Моят план“: реалните резултати от изпитните варианти за избрания изпит — по теми (последният опит
 * на всеки вариант или набор), колко варианта са решени и последният резултат. Данните са от историята
 * на изпитите, затова са едни и същи на всички устройства на ученика.
 */

interface AreaView {
  area: TopicArea;
  exam: 'НВО 10' | 'ДЗИ';
  subject: string;
  label: string;
}

const AREAS: Record<TargetExamTrack, AreaView[]> = {
  nvo_10: [
    { area: 'math', exam: 'НВО 10', subject: 'Математика', label: 'Математика' },
    { area: 'bel', exam: 'НВО 10', subject: 'Български език и литература', label: 'Български език и литература' },
  ],
  dzi_bel: [{ area: 'dzi-bel', exam: 'ДЗИ', subject: 'Български език и литература', label: 'Български език и литература' }],
  dzi_stem: [{ area: 'dzi', exam: 'ДЗИ', subject: 'Математика', label: 'Математика' }],
  dzi_history: [],
};

const fmt = (n: number): string => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace('.', ','));

export const PlannerExamResults: React.FC<{ track: TargetExamTrack; onOpenSimulator: () => void; onOpenErrorBank: () => void }> = ({
  track,
  onOpenSimulator,
  onOpenErrorBank,
}) => {
  const areas = AREAS[track];
  const stats = loadTopicStats();
  const attempts = examHistoryService.getAllAttempts().filter((a) => a?.examPreset?.startsWith('paper:'));
  const examErrors = errorBankService.getAllErrors().filter((e) => e.type === 'exam_task' && !e.resolved);

  const openPapers = () => {
    requestSimulatorMode('papers');
    onOpenSimulator();
  };

  return (
    <section aria-labelledby="planner-exam-results" className="space-y-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h3 id="planner-exam-results" className="flex items-center gap-2 text-base font-bold text-slate-900">
            <ListChecks className="h-4 w-4 text-brand-sapphire" aria-hidden="true" />
            Резултати от изпитните варианти
          </h3>
          <p className="max-w-2xl text-xs leading-relaxed text-slate-500">
            От официалните варианти на МОН, които си решил в симулатора: точките по теми са от последния ти опит на всеки вариант или набор.
          </p>
        </div>
        {areas.length > 0 && (
          <button
            type="button"
            onClick={openPapers}
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-brand-sapphire px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-sapphire-dark"
          >
            Към изпитните варианти
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      {areas.length === 0 ? (
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          За втория ДЗИ по избран предмет в симулатора засега има официалните матури по математика — избери „ДЗИ STEM & Природни науки“ горе.
        </p>
      ) : (
        <div className={`grid gap-4 ${areas.length > 1 ? 'lg:grid-cols-2' : ''}`}>
          {areas.map((a) => {
            const mine = attempts.filter((x) => x.grade === a.exam && x.subject === a.subject);
            const papers = new Set(mine.map((x) => x.examPreset)).size;
            const last = [...mine].sort((x, y) => new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime())[0];
            const topics = TOPICS.filter((t) => t.area === a.area).map((t) => ({ t, stat: stats[t.key] }));
            const scored = topics.filter((x) => (x.stat?.maxPoints ?? 0) > 0);
            const weakest = scored
              .filter((x) => topicPercent(x.stat!) < 100)
              .sort((x, y) => topicPercent(x.stat!) - topicPercent(y.stat!) || y.stat!.maxPoints - x.stat!.maxPoints)[0]?.t.key;
            return (
              <div key={a.area} className="space-y-3 rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-bold text-slate-900">
                    {a.exam} — {a.label}
                  </p>
                  <p className="text-xs text-slate-500 tabular-nums">
                    {papers === 0 ? 'още няма решени варианти' : `решени ${papers} ${papers === 1 ? 'вариант или набор' : 'варианта или набора'}`}
                  </p>
                </div>
                {last && (
                  <p className="text-xs text-slate-600">
                    Последно: <span className="font-semibold text-slate-900">{last.lessonTitle}</span> — {last.gradeEquivalent} ({last.formattedDate})
                  </p>
                )}
                {scored.length === 0 ? (
                  <p className="text-xs text-slate-500">След първия решен вариант тук ще видиш резултата си по всяка тема.</p>
                ) : (
                  <ul className="space-y-2">
                    {topics.map(({ t, stat }) => {
                      const has = !!stat && stat.maxPoints > 0;
                      const pct = has ? topicPercent(stat!) : 0;
                      return (
                        <li key={t.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-xs sm:grid-cols-[15rem_minmax(0,1fr)_auto]">
                          <span className="flex min-w-0 items-center gap-1.5 text-slate-700">
                            <span className="truncate">{t.label}</span>
                            {weakest === t.key && (
                              <span className="shrink-0 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800 ring-1 ring-inset ring-amber-200">най-слаба</span>
                            )}
                          </span>
                          <span className="order-3 col-span-2 h-1.5 overflow-hidden rounded-full bg-slate-100 sm:order-none sm:col-span-1" aria-hidden="true">
                            {has && <span className={`block h-full rounded-full ${pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-brand-sapphire' : 'bg-amber-400'}`} style={{ width: `${pct}%` }} />}
                          </span>
                          <span className="text-right tabular-nums text-slate-600">
                            {has ? (
                              <>
                                <span className="font-semibold text-slate-900">{pct}%</span> ({fmt(stat!.points)}/{stat!.maxPoints})
                              </>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {examErrors.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-rose-100 bg-rose-50/60 px-3.5 py-2.5 text-xs text-slate-700">
          <p className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
            <span>
              <strong>{examErrors.length}</strong> {examErrors.length === 1 ? 'задача от изпитите чака' : 'задачи от изпитите чакат'} да ги решиш отново в Банката с грешки.
            </span>
          </p>
          <button type="button" onClick={onOpenErrorBank} className="rounded-md border border-rose-200 bg-white px-2.5 py-1 font-semibold text-rose-800 hover:bg-rose-50">
            Към Банката с грешки
          </button>
        </div>
      )}
    </section>
  );
};
