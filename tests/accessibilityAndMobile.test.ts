import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Статичен скенер на JSX: хваща типичните пропуски в достъпността и мобилния layout
// без браузър. Отваряш таг → сканираме до затварящото '>' при дълбочина 0 по {} и кавички.

const COMPONENTS_DIR = join(__dirname, '..', 'src', 'components');
const files = readdirSync(COMPONENTS_DIR)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => ({ name: f, text: readFileSync(join(COMPONENTS_DIR, f), 'utf8') }));

const lineOf = (text: string, index: number) => text.slice(0, index).split('\n').length;

/** Връща края (индекса на '>') на отварящия таг, започващ на `start` ('<'). */
function openingTagEnd(text: string, start: number): number {
  let depth = 0;
  let quote: string | null = null;
  for (let i = start + 1; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      if (ch === quote && text[i - 1] !== '\\') quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') quote = ch;
    else if (ch === '{') depth++;
    else if (ch === '}') depth--;
    else if (ch === '>' && depth === 0) return i;
  }
  return -1;
}

interface Tag {
  file: string;
  line: number;
  attrs: string;
  children: string | null; // null за самозатварящ се таг
}

function findTags(name: string): Tag[] {
  const out: Tag[] = [];
  const re = new RegExp(`<${name}(?=[\\s>/])`, 'g');
  for (const { name: file, text } of files) {
    for (const m of text.matchAll(re)) {
      const start = m.index ?? 0;
      const end = openingTagEnd(text, start);
      if (end < 0) continue;
      const attrs = text.slice(start + name.length + 1, end);
      const selfClosing = attrs.trimEnd().endsWith('/');
      let children: string | null = null;
      if (!selfClosing) {
        const close = text.indexOf(`</${name}>`, end);
        children = close > 0 ? text.slice(end + 1, close) : '';
      }
      out.push({ file, line: lineOf(text, start), attrs, children });
    }
  }
  return out;
}

const hasAccessibleNameAttr = (attrs: string) => /\b(aria-label|aria-labelledby|title)\s*=/.test(attrs);

/** Бутон само с икона: няма текст, няма {израз}, само компонент(и) с главна буква (lucide). */
function isIconOnly(children: string): boolean {
  const withoutComments = children.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  const withoutIcons = withoutComments.replace(/<([A-Z][A-Za-z0-9]*)\b[^<]*?\/>/g, '');
  if (!/<[A-Z]/.test(withoutComments)) return false; // няма икона изобщо
  // Остава ли нещо видимо: текст, {израз} или HTML елемент с текст
  return withoutIcons.replace(/\s+/g, '') === '';
}

describe('Достъпност: бутони само с икона', () => {
  it('всеки бутон само с икона има aria-label или title', () => {
    const violations = findTags('button')
      .filter((t) => t.children !== null && isIconOnly(t.children) && !hasAccessibleNameAttr(t.attrs))
      .map((t) => `${t.file}:${t.line}`);
    expect(violations).toEqual([]);
  });
});

describe('Достъпност: изображения', () => {
  it('всеки <img> има alt', () => {
    const violations = findTags('img')
      .filter((t) => !/\balt\s*=/.test(t.attrs))
      .map((t) => `${t.file}:${t.line}`);
    expect(violations).toEqual([]);
  });
});

describe('Мобилен layout (375 px)', () => {
  // Фиксирани ширини над 360px без ограничение за малки екрани
  const FIXED_WIDTH = /(?<![\w:-])(?:min-)?w-\[(\d+)px\]/g;
  const SAFE_PREFIX = /(?:^|\s)(?:sm|md|lg|xl|2xl):/; // класът важи само на по-широки екрани

  it('няма w-[>360px] / min-w-[>360px] без max-w- или min(...)', () => {
    const violations: string[] = [];
    for (const { name: file, text } of files) {
      for (const m of text.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
        const classes = m[1] ?? m[2] ?? '';
        for (const w of classes.matchAll(FIXED_WIDTH)) {
          if (Number(w[1]) <= 360) continue;
          const token = classes.slice(Math.max(0, (w.index ?? 0) - 4), (w.index ?? 0) + w[0].length);
          if (SAFE_PREFIX.test(token)) continue;
          if (/\bmax-w-/.test(classes)) continue;
          violations.push(`${file}:${lineOf(text, m.index ?? 0)} ${w[0]}`);
        }
      }
    }
    expect(violations).toEqual([]);
  });
});

describe('Самият скенер', () => {
  it('разпознава бутон само с икона и пропуска бутон с текст', () => {
    expect(isIconOnly('\n  <X className="w-4 h-4" />\n')).toBe(true);
    expect(isIconOnly('<X className="w-4 h-4" /> Затвори')).toBe(false);
    expect(isIconOnly('<Check /><span>Копирано</span>')).toBe(false);
    expect(isIconOnly('{label}')).toBe(false);
  });

  it('openingTagEnd не се чупи от => в атрибут', () => {
    const src = '<button onClick={() => go(a > b)} aria-label="x">';
    expect(openingTagEnd(src, 0)).toBe(src.length - 1);
  });
});
