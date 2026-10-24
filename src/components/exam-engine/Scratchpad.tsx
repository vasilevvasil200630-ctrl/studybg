import React, { memo, useRef, useState } from 'react';
import { ChevronDown, PenLine } from 'lucide-react';

/**
 * Чернова към задача (по модела на MathScratchpad в Матура Плюс): сгъваемо поле
 * с лента математически символи, които се вмъкват там, където е курсорът.
 * Символите са Unicode, не LaTeX — така не се зарежда библиотека за формули.
 * По БЕЛ (symbols={false}) лентата не се показва — там се пише текст.
 */

const SYMBOLS: { s: string; t: string }[] = [
  { s: '²', t: 'Втора степен' },
  { s: '³', t: 'Трета степен' },
  { s: '√', t: 'Корен' },
  { s: '·', t: 'Умножение' },
  { s: '÷', t: 'Деление' },
  { s: '±', t: 'Плюс-минус' },
  { s: '≠', t: 'Различно' },
  { s: '≈', t: 'Приблизително' },
  { s: '≤', t: 'По-малко или равно' },
  { s: '≥', t: 'По-голямо или равно' },
  { s: 'π', t: 'Пи' },
  { s: '°', t: 'Градус' },
  { s: '∠', t: 'Ъгъл' },
  { s: '△', t: 'Триъгълник' },
  { s: '⊥', t: 'Перпендикулярно' },
  { s: '∥', t: 'Успоредно' },
  { s: '∈', t: 'Принадлежи' },
  { s: '∪', t: 'Обединение' },
  { s: '∩', t: 'Сечение' },
  { s: '∅', t: 'Празно множество' },
  { s: '₁', t: 'Индекс 1' },
  { s: '₂', t: 'Индекс 2' },
];

interface ScratchpadProps {
  id: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  defaultOpen?: boolean;
  label?: string;
  placeholder?: string;
  /** Лента с математически символи — за всички предмети освен БЕЛ */
  symbols?: boolean;
}

export const Scratchpad: React.FC<ScratchpadProps> = memo(function Scratchpad({
  id,
  value,
  onChange,
  disabled = false,
  defaultOpen = false,
  label = 'Чернова',
  placeholder = 'Сметки и бележки — не се оценяват.',
  symbols = true,
}) {
  const [open, setOpen] = useState(defaultOpen || value.trim() !== '');
  const ref = useRef<HTMLTextAreaElement>(null);

  const insert = (sym: string) => {
    const el = ref.current;
    if (!el) {
      onChange(value + sym);
      return;
    }
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    const next = value.slice(0, start) + sym + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + sym.length, start + sym.length);
    });
  };

  return (
    <div className="my-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`${id}-pad`}
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      >
        <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
        {value.trim() !== '' && !open && <span className="text-slate-400">· има записано</span>}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div id={`${id}-pad`} className="mt-2 rounded-xl border border-slate-200 bg-slate-50/60 p-2">
          {!disabled && symbols && (
            <div className="mb-2 flex flex-wrap gap-1" role="toolbar" aria-label="Математически символи">
              {SYMBOLS.map(({ s, t }) => (
                <button
                  key={s}
                  type="button"
                  title={t}
                  aria-label={`Вмъкни ${t}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => insert(s)}
                  className="grid h-8 min-w-8 place-items-center rounded-md border border-slate-200 bg-white px-1.5 text-sm text-slate-800 hover:border-blue-200 hover:bg-blue-50"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            rows={4}
            placeholder={placeholder}
            aria-label={label}
            className="w-full resize-y rounded-lg border border-slate-200 bg-white p-3 text-sm leading-relaxed text-slate-900 focus:border-brand-sapphire focus:outline-none disabled:bg-slate-50 disabled:text-slate-600"
          />
        </div>
      )}
    </div>
  );
});
