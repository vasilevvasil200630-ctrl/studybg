import React from 'react';
import {
  Compass,
  Clock,
  Sparkles,
  HelpCircle,
  GraduationCap,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import type { CultureSubTab } from './CultureHero';

interface CultureSidebarProps {
  activeCultureTab: CultureSubTab;
  onSelectCultureTab: (tab: CultureSubTab) => void;
  onSwitchToStudy: () => void;
}

export const CultureSidebar: React.FC<CultureSidebarProps> = ({
  activeCultureTab,
  onSelectCultureTab,
  onSwitchToStudy
}) => {
  const items: {
    tab: CultureSubTab;
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }[] = [
    {
      tab: 'mysteries',
      label: 'Неразгадани случки',
      sublabel: 'Исторически загадки',
      icon: Compass,
      accentColor: 'text-amber-400'
    },
    {
      tab: 'timeline',
      label: 'Хронология (681–1908)',
      sublabel: 'Ключови събития',
      icon: Clock,
      accentColor: 'text-emerald-400'
    },
    {
      tab: 'trivia',
      label: 'Куиз обща култура',
      sublabel: '15 въпроса с точки',
      icon: Sparkles,
      accentColor: 'text-sky-400'
    },
    {
      tab: 'myths',
      label: 'Факт или Мит?',
      sublabel: 'Развенчаване на митове',
      icon: HelpCircle,
      accentColor: 'text-rose-400'
    }
  ];

  return (
    <aside
      aria-label="Странично меню на Обща култура"
      className="w-full lg:w-72 xl:w-80 flex-shrink-0"
    >
      <div className="lg:sticky lg:top-24 space-y-4">
        
        {/* Culture Hub Overview Card */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Обща култура & Загадки
            </span>
          </div>

          <h3 className="text-sm font-bold text-white mb-1">
            Страници от миналото
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Изследвай любопитни въпроси от историята, науката и природата.
          </p>
        </div>

        {/* Culture Subtabs Vertical Sidebar */}
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/70 shadow-sm backdrop-blur-md space-y-1">
          <div className="px-2.5 py-1 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Тематични модули
          </div>

          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeCultureTab === item.tab;

            return (
              <button
                key={item.tab}
                onClick={() => onSelectCultureTab(item.tab)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-xs group ${
                  isActive
                    ? 'bg-amber-500/15 text-white border border-amber-500/40 shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-amber-500/25 text-amber-300'
                        : 'bg-slate-800/70 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${item.accentColor}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`truncate leading-tight ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Portal Switch Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900/70 border border-indigo-500/25 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Учебна академия</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">
            Трябва ли ти одит на тетрадка, флаш карти или изпитен тест за училище?
          </p>
          <button
            onClick={onSwitchToStudy}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Към учебните уроци</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
