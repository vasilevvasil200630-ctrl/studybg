import React, { useState } from 'react';
import { ChevronDown, Clock, ExternalLink, FileText, ListChecks } from 'lucide-react';
import { EXAM_PAPERS } from '../data/examPapers';
import { NVO10_FORMAT_2027, nvo10FormatTag } from '../data/examFormats';
import type { ExamPaper } from '../lib/examPaperScoring';
import { ExamRunner, PaperBadge } from './exam-engine/ExamRunner';

/**
 * Пълни изпитни варианти с ключ. Списъкът избира вариант, а ExamRunner го провежда
 * (двигателят от Матура Плюс: таймер, навигатор, чернова, запазване, самооценка, история).
 * Вариантите са групирани по изпит; за НВО 10 отгоре стои форматът за 2027 г. по модела на МОН.
 */

type ExamFilter = 'all' | ExamPaper['exam'];

const EXAM_ORDER: ExamPaper['exam'][] = ['НВО 10', 'ДЗИ'];

/** Официалните първо (най-новите отгоре), после тренировъчните */
const byRelevance = (a: ExamPaper, b: ExamPaper) =>
  (a.kind === b.kind ? 0 : a.kind === 'official' ? -1 : 1) || (b.year ?? 0) - (a.year ?? 0);

export const ExamPapersView: React.FC = () => {
  const [paperId, setPaperId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ExamFilter>('all');
  const paper = EXAM_PAPERS.find((p) => p.id === paperId) ?? null;

  if (paper) return <ExamRunner key={paper.id} paper={paper} onExit={() => setPaperId(null)} />;

  const exams = EXAM_ORDER.filter((e) => EXAM_PAPERS.some((p) => p.exam === e));
  const shown = filter === 'all' ? exams : exams.filter((e) => e === filter);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Пълни изпитни варианти с ключ</h3>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">
          Решаваш цял вариант с таймер, както на изпита. Затворените задачи и кратките отговори се проверяват по ключа, а задачите
          със свободен отговор оценяваш сам по критериите и еталона. Резултатът се записва в историята ти.
        </p>
      </div>

      {exams.length > 1 && (
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Изпит">
          {(['all', ...exams] as ExamFilter[]).map((e) => {
            const n = e === 'all' ? EXAM_PAPERS.length : EXAM_PAPERS.filter((p) => p.exam === e).length;
            const active = filter === e;
            return (
              <button
                key={e}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(e)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  active ? 'border-brand-sapphire bg-brand-sapphire text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {e === 'all' ? 'Всички' : e} <span className={active ? 'text-white/80' : 'text-slate-400'}>{n}</span>
              </button>
            );
          })}
        </div>
      )}

      {shown.map((exam) => {
        const papers = EXAM_PAPERS.filter((p) => p.exam === exam && p.kind !== 'sample').sort(byRelevance);
        const samples = EXAM_PAPERS.filter((p) => p.exam === exam && p.kind === 'sample');
        return (
          <section key={exam} aria-labelledby={`papers-${exam}`} className="space-y-3">
            <h4 id={`papers-${exam}`} className="text-sm font-bold uppercase tracking-wide text-slate-500">
              {exam}
            </h4>
            {exam === 'НВО 10' && <Nvo10FormatCard />}
            {samples.length > 0 && <h5 className="pt-2 text-base font-bold text-slate-900">Пълни варианти</h5>}
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {papers.map((p) => (
                <PaperCard key={p.id} paper={p} onStart={() => setPaperId(p.id)} />
              ))}
            </ul>
            {samples.length > 0 && (
              <div className="space-y-3 pt-4">
                <div>
                  <h5 className="text-base font-bold text-slate-900">Другите предмети: задачи на МОН</h5>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">
                    Биологията, химията, физиката и географията носят 42 от 100-те точки. Във всеки набор са задачите по предмета от НВО 2026 —
                    с ключа на МОН — и примерните задачи, които МОН публикува без отговори; техните отговори са изчислени от StudyBG. Решаваш без
                    таймер.
                  </p>
                </div>
                <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {samples.map((p) => (
                    <PaperCard key={p.id} paper={p} onStart={() => setPaperId(p.id)} />
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

const PaperCard: React.FC<{ paper: ExamPaper; onStart: () => void }> = ({ paper: p, onStart }) => {
  const questionCount = p.sections.reduce((n, s) => n + s.questions.length, 0);
  const tag = nvo10FormatTag(p);
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center gap-1.5">
        <PaperBadge paper={p} />
        {tag && (
          <span
            className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${
              tag.tone === 'current' ? 'bg-brand-sapphire-soft text-brand-ink ring-1 ring-inset ring-brand-sapphire/20' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {tag.label}
          </span>
        )}
      </div>
      <h5 className="text-base font-bold text-slate-900">{p.title}</h5>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600 tabular-nums">
        <span className="inline-flex items-center gap-1">
          <ListChecks className="h-4 w-4 text-slate-400" aria-hidden="true" />
          {questionCount} задачи · {p.maxPoints} т.
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4 text-slate-400" aria-hidden="true" />
          {p.untimed ? 'без таймер' : `${p.durationMinutes} мин`}
        </span>
        <span>{p.gradeScale ? 'оценка по скалата на МОН' : 'резултат в точки'}</span>
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-auto inline-flex items-center justify-center gap-1.5 self-start rounded-lg bg-brand-sapphire px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-sapphire-dark"
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        Започни варианта
      </button>
    </li>
  );
};

const Nvo10FormatCard: React.FC = () => {
  const f = NVO10_FORMAT_2027;
  const total = (r: (typeof f.distribution)[number]) => r.choice + r.short + r.open;
  const sum = (pick: (r: (typeof f.distribution)[number]) => number) => f.distribution.reduce((n, r) => n + pick(r), 0);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-base font-bold text-slate-900">{f.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Най-близо до този формат е вариантът от 2026 г. Вариантите до 2025 г. са само по математика — с тях тренираш математическата част.
          </p>
        </div>
        <a
          href={f.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-sapphire hover:underline"
        >
          Модел на МОН
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-4">
        {f.facts.map((x) => (
          <div key={x.label} className="bg-white px-4 py-3">
            <dt className="text-xs font-medium text-slate-500">{x.label}</dt>
            <dd className="mt-0.5 text-lg font-bold text-slate-900 tabular-nums">{x.value}</dd>
            {'hint' in x && <dd className="text-xs text-slate-500">{x.hint}</dd>}
          </div>
        ))}
      </dl>

      <details className="group mt-3">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-md py-1 text-sm font-semibold text-slate-700 hover:text-slate-900 [&::-webkit-details-marker]:hidden">
          <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true" />
          Как са разпределени задачите
        </summary>
        {/* На телефон — списък, на по-широк екран — таблица */}
        <ul className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 sm:hidden">
          {f.distribution.map((r) => (
            <li key={r.subject} className="flex items-baseline justify-between gap-3 px-3 py-2 text-sm">
              <span className="font-medium text-slate-800">{r.subject}</span>
              <span className="shrink-0 text-right text-xs text-slate-500 tabular-nums">
                {[r.choice && `${r.choice} избираем`, r.short && `${r.short} кратък`, r.open && `${r.open} свободен`].filter(Boolean).join(" · ")}
                <span className="ml-2 text-sm font-semibold text-slate-900">{total(r)}</span>
              </span>
            </li>
          ))}
          <li className="flex justify-between bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
            <span>Общо</span>
            <span className="tabular-nums">{sum(total)}</span>
          </li>
        </ul>
        <div className="mt-2 hidden overflow-x-auto rounded-xl border border-slate-200 sm:block">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">Брой задачи по предмет и вид отговор</caption>
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-slate-600">
                <th scope="col" className="px-3 py-2 font-semibold">Предмет</th>
                <th scope="col" className="px-2 py-2 text-center sm:px-3 font-semibold">Избираем отговор</th>
                <th scope="col" className="px-2 py-2 text-center sm:px-3 font-semibold">Кратък отговор</th>
                <th scope="col" className="px-2 py-2 text-center sm:px-3 font-semibold">Свободен отговор</th>
                <th scope="col" className="px-2 py-2 text-center sm:px-3 font-semibold">Общо</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {f.distribution.map((r) => (
                <tr key={r.subject} className="border-t border-slate-100">
                  <th scope="row" className="px-3 py-2 text-left font-medium text-slate-800">{r.subject}</th>
                  <td className="px-2 py-2 text-center sm:px-3 text-slate-700">{r.choice || '—'}</td>
                  <td className="px-2 py-2 text-center sm:px-3 text-slate-700">{r.short || '—'}</td>
                  <td className="px-2 py-2 text-center sm:px-3 text-slate-700">{r.open || '—'}</td>
                  <td className="px-2 py-2 text-center sm:px-3 font-semibold text-slate-900">{total(r)}</td>
                </tr>
              ))}
              <tr className="border-t border-slate-200 bg-slate-50 font-semibold text-slate-900">
                <th scope="row" className="px-3 py-2 text-left">Общо</th>
                <td className="px-2 py-2 text-center sm:px-3">{sum((r) => r.choice)}</td>
                <td className="px-2 py-2 text-center sm:px-3">{sum((r) => r.short)}</td>
                <td className="px-2 py-2 text-center sm:px-3">{sum((r) => r.open)}</td>
                <td className="px-2 py-2 text-center sm:px-3">{sum(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="mt-3 space-y-1 text-sm text-slate-600">
          {f.notes.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
              {n}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};
