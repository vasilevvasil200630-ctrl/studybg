import React, { Suspense, lazy, memo } from 'react';

const LazyMathText = lazy(() =>
  import('./exam-engine/MathText').then((m) => ({ default: m.MathText }))
);

interface RichTextProps {
  text: string;
  className?: string;
}

/**
 * Рендира обикновен текст без никакъв допълнителен ресурс, а когато низът съдържа
 * математическа формула ($...$ или $$...$$), зарежда асинхронно KaTeX чрез MathText.
 */
export const RichText: React.FC<RichTextProps> = memo(function RichText({ text, className }) {
  if (!text || !text.includes('$')) {
    return className ? <span className={className}>{text}</span> : <>{text}</>;
  }

  return (
    <Suspense fallback={className ? <span className={className}>{text}</span> : <>{text}</>}>
      <LazyMathText text={text} className={className} />
    </Suspense>
  );
});
