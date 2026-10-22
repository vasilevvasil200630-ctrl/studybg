import React, { useState } from 'react';
import { Clock, FileText, ListChecks } from 'lucide-react';
import { EXAM_PAPERS } from '../data/examPapers';
import { ExamRunner, PaperBadge } from './exam-engine/ExamRunner';

/**
 * Пълни изпитни варианти с ключ. Списъкът избира вариант, а ExamRunner го провежда
 * (двигателят от Матура Плюс: таймер, навигатор, чернова, запазване, самооценка, история).
 */
export const ExamPapersView: React.FC = () => {
  const [paperId, setPaperId] = useState<string | null>(null);
  const paper = EXAM_PAPERS.find((p) => p.id === paperId) ?? null;

  if (paper) return <ExamRunner key={paper.id} paper={paper} onExit={() => setPaperId(null)} />;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Пълни изпитни варианти с ключ</h3>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">
          Решаваш цял вариант с таймер, както на изпита. Затворените задачи и кратките отговори се проверяват по ключа, а задачите
          със свободен отговор оценяваш сам по критериите и еталона. Резултатът се записва в историята ти.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {EXAM_PAPERS.map((p) => {
          const questionCount = p.sections.reduce((n, s) => n + s.questions.length, 0);
          return (
            <li key={p.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5">
              <PaperBadge paper={p} />
              <h4 className="text-base font-bold text-slate-900">{p.title}</h4>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600 tabular-nums">
                <span className="inline-flex items-center gap-1">
                  <ListChecks className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {questionCount} задачи · {p.maxPoints} т.
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {p.durationMinutes} мин
                </span>
                <span>{p.gradeScale ? 'оценка по скалата на МОН' : 'резултат в точки'}</span>
              </p>
              <button
                type="button"
                onClick={() => setPaperId(p.id)}
                className="mt-auto inline-flex items-center justify-center gap-1.5 self-start rounded-lg bg-brand-sapphire px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-sapphire-dark"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Започни варианта
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
