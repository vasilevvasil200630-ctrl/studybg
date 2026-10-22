import React from 'react';
import { ArrowUpRight, GraduationCap, ShieldCheck } from 'lucide-react';

interface MaturaPlusBridgeBannerProps {
  compact?: boolean;
  className?: string;
  source?: string;
}

export const MaturaPlusBridgeBanner: React.FC<MaturaPlusBridgeBannerProps> = ({
  compact = false,
  className = '',
  source = 'general'
}) => {
  const handleGoToMaturaPlus = () => {
    // In production, opens the Matura+ platform URL. For local/demo, triggers an alert or opens link.
    const url = 'https://maturaplus.eu';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (compact) {
    return (
      <aside data-print-hide
        aria-label="Препратка към сестринската платформа Матура Плюс"
        className={`flex items-center justify-between gap-3 p-3 rounded-xl bg-brand-emerald-soft border border-slate-200 text-xs text-slate-800 shadow-2xs ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-sapphire text-white flex items-center justify-center shrink-0 font-bold text-xs">
            M+
          </div>
          <div>
            <span className="font-bold text-emerald-950">Готвиш се за 7. клас?</span>
            <span className="text-slate-600 hidden sm:inline ml-1.5">
              Подготовката за НВО 7 е в сестринската платформа <strong>Матура Плюс</strong>.
            </span>
          </div>
        </div>
        <button
          onClick={handleGoToMaturaPlus}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-800 font-semibold text-xs transition-colors shrink-0 shadow-2xs"
        >
          <span>Към Матура Плюс</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </aside>
    );
  }

  return (
    <aside data-print-hide
      aria-label="Сестринската платформа Матура Плюс за НВО след 7. клас"
      className={`p-6 sm:p-8 rounded-2xl bg-blue-50/60 border border-blue-100 shadow-sm ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 text-balance">
            Готвиш се за НВО след 7. клас? Сестринската ни платформа е{' '}
            <span className="whitespace-nowrap">Матура<span className="text-emerald-700">Плюс</span></span>
          </h3>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            StudyBG покрива всички предмети от 5. до 12. клас. Матура Плюс е съсредоточена само в НВО 7 по
            български език, литература и математика — с 36-седмичен план, пълни текстове на творбите и симулации
            по актуалния формат на МОН.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              Формат на НВО 7 по МОН
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              След 7. клас продължаваш тук, в StudyBG
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <button
            onClick={handleGoToMaturaPlus}
            data-source={source}
            className="w-full md:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-slate-100 active:scale-[0.98] text-brand-sapphire font-bold text-sm shadow-sm transition"
          >
            <span>Отвори Матура Плюс</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};
