import React, { useId } from 'react';

interface BrandLogoProps {
  /** Само знакът, без надписа — за тесни места */
  markOnly?: boolean;
  className?: string;
}

/**
 * Знакът на StudyBG: отворена книга, златна звезда-компас и академична шапка.
 * Шапката е в мастиленосиньо, не в черно — един цвят с надписа.
 * useId дава уникални id на градиентите, защото логото стои едновременно в менюто и във футъра.
 */
export const BrandMark: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => {
  const uid = useId().replace(/:/g, '');
  const book = `sbg-book-${uid}`;
  const star = `sbg-star-${uid}`;
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={book} x1="6" y1="22" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0a4b82" />
          <stop offset="100%" stopColor="#2f88cf" />
        </linearGradient>
        <linearGradient id={star} x1="18" y1="24" x2="46" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path
        d="M7 29V53C16.5 53 25 55.2 32 60C39 55.2 47.5 53 57 53V29"
        stroke={`url(#${book})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 27C21.5 24.2 16.5 23 12 23V48C19.5 48 26.2 50.2 32 55C37.8 50.2 44.5 48 52 48V23C47.5 23 42.5 24.2 38 27"
        stroke={`url(#${book})`}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 31.5L22 28.5M39 31.5L42 28.5M25 44.5L22 47.5M39 44.5L42 47.5"
        stroke="#f59e0b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M32 23L35 35L46.5 38L35 41L32 52.5L29 41L17.5 38L29 35L32 23Z" fill={`url(#${star})`} />
      <circle cx="32" cy="38" r="2.3" fill="#ffffff" />
      <path d="M32 4.5L54.5 12.8L32 20.2L9.5 12.8L32 4.5Z" fill="#0a4b82" />
      <path d="M19 18V24.5C24 21.2 40 21.2 45 24.5V18L32 22.2L19 18Z" fill="#0a4b82" />
      <circle cx="32" cy="12.4" r="1.7" fill="#5ea5dd" />
      <path d="M32 12.4L48 15.5V22.5" stroke="#1a6fb8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 28L47 22.5H49L50 28H46Z" fill="#1a6fb8" />
    </svg>
  );
};

/** Знак + двуцветен надпис + трикольорна линия (бяло, зелено, червено) */
export const BrandLogo: React.FC<BrandLogoProps> = ({ markOnly = false, className = '' }) => (
  <span className={`inline-flex items-center gap-2 ${className}`}>
    <BrandMark />
    {!markOnly && (
      <span className="flex flex-col">
        <span className="text-[19px] font-bold tracking-tight leading-none">
          <span className="text-brand-ink">Study</span>
          <span className="text-emerald-700">BG</span>
        </span>
        <span className="mt-1 flex h-[2.5px] w-full overflow-hidden rounded-full" aria-hidden="true">
          <span className="h-full w-1/3 border border-slate-300/90 bg-white" />
          <span className="h-full w-1/3 bg-[#00966E]" />
          <span className="h-full w-1/3 bg-[#D62612]" />
        </span>
      </span>
    )}
  </span>
);
