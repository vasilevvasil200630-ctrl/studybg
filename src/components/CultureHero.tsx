import { Compass, ArrowRight, GraduationCap, MapPin, Scale } from 'lucide-react';

export type CultureSubTab = 'mysteries' | 'timeline' | 'cases' | 'wonders' | 'trivia' | 'myths' | 'wisdom';

interface CultureHeroProps {
  onSwitchToStudy: () => void;
}

export const CultureHero: React.FC<CultureHeroProps> = ({
  onSwitchToStudy
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-9 md:pt-10 md:pb-11 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Culture Portal Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium mb-4 shadow-2xs">
          <Compass className="w-4 h-4 text-amber-600" />
          <span>Раздел „Обща култура & Любознателно четиво“</span>
          <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
            Свободно четиво • Загадки • Природни чудеса • Мъдрост
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Неразгадани тайни от{' '}
          <span className="text-amber-600">
            древността, природата
          </span>{' '}
          и българския дух.
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Пространство за любопитство, свободно четене и природно наследство извън строгия изпитен конспект.
          За официална подготовка по учебната програма за НВО и ДЗИ, премини към Учебната академия.
        </p>

        {/* Quick Highlights Row - Replaces the clipped duplicate button row */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>14 исторически загадки</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-900 text-xs font-semibold shadow-2xs">
            <Scale className="w-3.5 h-3.5 text-purple-600" />
            <span>10 казуса за ДЗИ (в Академията)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-semibold shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>12 природни феномена</span>
          </div>

          <button
            onClick={onSwitchToStudy}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors shadow-2xs"
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Към Учебна академия</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
