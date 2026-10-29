import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, Search, Sigma, X } from 'lucide-react';
import { filterFormulaSheet, type FormulaCategory, type FormulaSheet } from '../../data/formulaSheets/nvo10Math';
import { FIGURES } from './figures';
import { MathTex, MathText } from './MathText';

/**
 * Лист с формули (по модела на MathFormulasSheet в Матура Плюс: търсене, категории, източник).
 * FormulaSheetBrowser е самото съдържание — ползват го страничният панел в изпита
 * и справочникът „Формули на МОН“ от менюто.
 */

interface FormulaSheetBrowserProps {
  sheet: FormulaSheet;
  /** Фокус в търсачката при показване (само с мишка — на телефон не отваряме клавиатурата сама) */
  autoFocusSearch?: boolean;
  /** Отстъп отляво и отдясно, за да съвпадне с обвивката */
  padX?: string;
}

export const FormulaSheetBrowser: React.FC<FormulaSheetBrowserProps> = ({ sheet, autoFocusSearch = false, padX = 'px-4 sm:px-6' }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<FormulaCategory | 'all'>('all');
  const searchRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const groups = useMemo(() => filterFormulaSheet(sheet, query, category), [sheet, query, category]);
  const count = groups.reduce((n, g) => n + g.entries.length + (g.tables?.length ?? 0), 0);

  useEffect(() => {
    if (autoFocusSearch && window.matchMedia('(pointer: fine)').matches) searchRef.current?.focus();
  }, [autoFocusSearch]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [category]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className={`border-b border-slate-200 pb-3 ${padX}`}>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              sheet.id === 'dzi-physics'
                ? 'Търси: Планк, Кулон, Лоренц, трифазна мощност, Хук…'
                : sheet.id === 'dzi-chemistry'
                  ? 'Търси: Хес, Фарадей, pH, разтворимост, атомна маса…'
                  : sheet.id === 'dzi-biology'
                    ? 'Търси: кодон, AUG, Харди–Вайнберг, Чаргаф, АТФ…'
                    : sheet.id === 'dzi-informatics'
                      ? 'Търси: сложност, Quick Sort, CIDR, подмрежа, Де Морган…'
                      : sheet.id === 'dzi-geography-econ'
                        ? 'Търси: прираст, БВП, ROE, критична точка, RevPAR…'
                        : sheet.id.startsWith('dzi')
                          ? 'Търси: производна, Бейс, елипса, бином…'
                          : 'Търси: Виет, медиана, конус, Херон…'
            }
            aria-label="Търси формула"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-sapphire focus:outline-none focus:ring-2 focus:ring-brand-sapphire/15 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                searchRef.current?.focus();
              }}
              aria-label="Изчисти търсенето"
              className="absolute right-1.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="-mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6" role="group" aria-label="Раздели">
          {sheet.categories.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c.id)}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? 'border-brand-sapphire bg-brand-sapphire text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div ref={bodyRef} className={`min-h-0 flex-1 overflow-y-auto py-5 ${padX}`}>
        <p className="sr-only" aria-live="polite">
          {query ? `Намерени: ${count}` : ''}
        </p>

        {groups.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 px-5 py-10 text-center">
            <p className="text-sm font-semibold text-slate-800">Няма формула за „{query}“</p>
            <p className="mt-1 text-sm text-slate-500">
              Опитай с част от думата или{' '}
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                }}
                className="font-semibold text-brand-sapphire hover:underline"
              >
                покажи всички формули
              </button>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-7">
            {groups.map((g) => (
              <section key={g.id} aria-labelledby={`fs-${g.id}`}>
                <h3 id={`fs-${g.id}`} className="mb-2.5 text-sm font-bold text-slate-900">{g.title}</h3>

                {g.entries.length > 0 && (
                  <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    {g.entries.map((e) => {
                      const Figure = e.figureId ? FIGURES[e.figureId] : undefined;
                      return (
                        <li key={e.id} className={`px-4 py-3 ${Figure ? 'grid items-center gap-3 sm:grid-cols-[1fr_auto]' : ''}`}>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-500">
                              <MathText text={e.label} />
                            </p>
                            <div className="sbg-formula mt-1.5 flex flex-wrap items-center gap-x-8 gap-y-1 text-slate-900">
                              {e.tex.map((tex, ti) => (
                                <MathTex key={ti} tex={tex} />
                              ))}
                            </div>
                          </div>
                          {Figure && (
                            <div className="flex justify-center sm:w-[150px]">
                              <Figure />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}

                {g.tables?.map((table, ti) => (
                  <div key={ti} className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <table className="w-full border-collapse text-center text-sm">
                      <thead>
                        <tr className="bg-slate-50">
                          {table.head.map((h, hi) => (
                            <th key={hi} scope="col" className="border-b border-r border-slate-200 px-2 py-2 font-semibold text-slate-700 last:border-r-0">
                              <MathText text={h} />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, ri) => (
                          <tr key={ri} className="border-b border-slate-100 last:border-b-0">
                            {row.map((cell, ci) =>
                              ci === 0 ? (
                                <th key={ci} scope="row" className="whitespace-nowrap border-r border-slate-200 bg-slate-50 px-2 py-2 font-semibold text-slate-700">
                                  <MathText text={cell} />
                                </th>
                              ) : (
                                <td key={ci} className="whitespace-nowrap border-r border-slate-100 px-2 py-2 text-slate-900 last:border-r-0">
                                  <MathText text={cell} />
                                </td>
                              )
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const FormulaSheetSource: React.FC<{ sheet: FormulaSheet; className?: string }> = ({ sheet, className }) => (
  <div className={`flex items-center justify-between gap-3 text-xs text-slate-500 ${className ?? ''}`}>
    <span>Формулите са дословно от листа на МОН.</span>
    <a
      href={sheet.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand-sapphire hover:underline"
    >
      PDF на МОН
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  </div>
);

/**
 * Страничен панел в изпита: задачата остава видима, таймерът продължава да тече,
 * както на истинския изпит.
 */

interface FormulaSheetPanelProps {
  sheet: FormulaSheet;
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export const FormulaSheetPanel: React.FC<FormulaSheetPanelProps> = ({ sheet, open, onClose }) => {
  const panelRef = useRef<HTMLElement>(null);
  const titleId = useId();

  // Фокус в панела при отваряне и обратно към бутона при затваряне; страницата отдолу не се скролира.
  // useLayoutEffect — за да запомним бутона, преди търсачката (в дъщерния компонент) да вземе фокуса.
  useLayoutEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!window.matchMedia('(pointer: fine)').matches) panelRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div data-print-hide className="fixed inset-0 z-50 flex justify-end">
      <div className="sbg-fade-in absolute inset-0 bg-slate-900/25" onClick={onClose} aria-hidden="true" />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="sbg-sheet-in relative flex h-full w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl outline-none"
      >
        <header className="px-4 pb-4 pt-4 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-sapphire-soft text-brand-sapphire">
              <Sigma className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="text-base font-bold text-slate-900">{sheet.title}</h2>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{sheet.sourceLabel}. Таймерът продължава да тече.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Затвори формулите"
              title="Затвори (Esc)"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        <FormulaSheetBrowser sheet={sheet} autoFocusSearch />

        <FormulaSheetSource sheet={sheet} className="border-t border-slate-200 px-4 py-3 sm:px-6" />
      </aside>
    </div>
  );
};
