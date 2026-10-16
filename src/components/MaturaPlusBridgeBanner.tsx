import React from 'react';
import { ArrowUpRight, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';

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
        aria-label="Препратка към платформата Matura+ за прогимназиален етап"
        className={`flex items-center justify-between gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/90 text-xs text-slate-800 shadow-2xs ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
            M+
          </div>
          <div>
            <span className="font-bold text-emerald-950">Готвиш се за 7. клас?</span>
            <span className="text-slate-600 hidden sm:inline ml-1.5">
              Всички НВО симулации за 5.–7. клас са в специализираната академия <strong>Matura+</strong>.
            </span>
          </div>
        </div>
        <button
          onClick={handleGoToMaturaPlus}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs transition-colors shrink-0 shadow-2xs"
        >
          <span>Към Matura+</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </aside>
    );
  }

  return (
    <aside data-print-hide
      aria-label="Специализирана платформа Matura+ за 5-7 клас"
      className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-md relative overflow-hidden ${className}`}
    >
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Сестринска платформа за 5., 6. и 7. клас</span>
            <span className="text-[10px] bg-emerald-400/20 text-emerald-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
              НВО 7
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
            Търсиш подготовка за НВО след 7. клас? Твоето място е <span className="text-emerald-400">Matura+</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Докато <strong>StudyBG</strong> е специализиран изцяло за гимназиалния етап (<strong>8.–12. клас, НВО 10 и ДЗИ</strong>), цялата методика за прием в елитните гимназии (НВО по БЕЛ и Математика за 7. клас) живее в нашата първа платформа <strong>Matura+</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% покритие на формата на МОН за 7. клас
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-teal-400" />
              Преход към StudyBG за 8.–12. клас с преференциален достъп
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 justify-center">
          <button
            onClick={handleGoToMaturaPlus}
            data-source={source}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-emerald-950 font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
          >
            <span>Отвори Matura+ за 7. клас</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <span className="text-[11px] text-slate-400 text-center">
            Платформа №1 за прием след 7. клас
          </span>
        </div>
      </div>
    </aside>
  );
};
