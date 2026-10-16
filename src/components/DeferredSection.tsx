import React, { Suspense, useEffect, useRef, useState } from 'react';
import { ChunkErrorBoundary } from './ChunkErrorBoundary';

interface DeferredSectionProps {
  /** Запазена височина, докато секцията не е заредена (без разместване на страницата) */
  minHeight: number;
  children: React.ReactNode;
}

/**
 * Монтира тежка секция (и сваля нейния chunk) едва когато наближи екрана.
 * Без IntersectionObserver секцията се показва веднага.
 */
export const DeferredSection: React.FC<DeferredSectionProps> = ({ minHeight, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (isNear) return;
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setIsNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isNear]);

  const placeholder = <div aria-hidden="true" style={{ minHeight }} />;

  return (
    <div ref={ref}>
      {isNear ? (
        <ChunkErrorBoundary compact>
          <Suspense fallback={placeholder}>{children}</Suspense>
        </ChunkErrorBoundary>
      ) : (
        placeholder
      )}
    </div>
  );
};
