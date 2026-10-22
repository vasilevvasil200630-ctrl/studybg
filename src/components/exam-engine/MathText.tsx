import React, { memo, useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Текст с математика (по модела на MathMessage в Матура Плюс): $…$ е формула в реда,
 * $$…$$ — формула на отделен ред. Всичко останало е обикновен текст и пази новите редове.
 * Формулите са от нашите данни (не от потребител), а KaTeX работи без `trust`.
 * Модулът се зарежда само заедно с изпитите, затова не тежи на останалия сайт.
 */

type Part = { kind: 'text' | 'inline' | 'block'; value: string };

const PATTERN = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;

function split(text: string): Part[] {
  const parts: Part[] = [];
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    const at = m.index ?? 0;
    if (at > last) parts.push({ kind: 'text', value: text.slice(last, at) });
    parts.push(m[1] !== undefined ? { kind: 'block', value: m[1].trim() } : { kind: 'inline', value: m[2].trim() });
    last = at + m[0].length;
  }
  if (last < text.length) parts.push({ kind: 'text', value: text.slice(last) });
  return parts;
}

const render = (tex: string, displayMode: boolean): string =>
  katex.renderToString(tex, { displayMode, throwOnError: false, output: 'htmlAndMathml', strict: 'ignore' });

/** Една формула (LaTeX без $) на отделен ред — за листа с формули */
export const MathTex: React.FC<{ tex: string; className?: string }> = memo(function MathTex({ tex, className }) {
  const html = useMemo(() => render(tex, true), [tex]);
  return <span className={`block max-w-full overflow-x-auto ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: html }} />;
});

export const MathText: React.FC<{ text: string; className?: string }> = memo(function MathText({ text, className }) {
  const parts = useMemo(() => split(text), [text]);
  return (
    <span className={`whitespace-pre-line ${className ?? ''}`}>
      {parts.map((p, i) =>
        p.kind === 'text' ? (
          <React.Fragment key={i}>{p.value}</React.Fragment>
        ) : (
          <span
            key={i}
            className={p.kind === 'block' ? 'my-2 block overflow-x-auto' : 'inline-block max-w-full overflow-x-auto py-0.5 align-middle'}
            dangerouslySetInnerHTML={{ __html: render(p.value, p.kind === 'block') }}
          />
        )
      )}
    </span>
  );
});
