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
      accentColor: 'text-amber-600'
    },
    {
      tab: 'timeline',
      label: 'Хронология (681–1908)',
      sublabel: 'Ключови събития',
      icon: Clock,
      accentColor: 'text-emerald-600'
    },
    {
      tab: 'trivia',
      label: 'Куиз обща култура',
      sublabel: '15 въпроса с точки',
      icon: Sparkles,
      accentColor: 'text-sky-600'
    },
    {
      tab: 'myths',
      label: 'Факт или Мит?',
      sublabel: 'Развенчаване на митове',
      icon: HelpCircle,
      accentColor: 'text-rose-600'
    }
  ];

  return (
    <aside
      aria-label="Странично меню на Обща култура"
      className="w-full lg:w-72 xl:w-80 flex-shrink-0"
    >
      <div className="lg:sticky lg:top-20 space-y-3.5">
        
        {/* Culture Hub Overview Card */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Обща култура & Загадки
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Страници от миналото
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Изследвай любопитни въпроси от историята, науката и природата.
          </p>
        </div>

        {/* Culture Subtabs Vertical Sidebar */}
        <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="px-2 py-1 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Тематични модули
          </div>

          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeCultureTab === item.tab;

            return (
              <button
                key={item.tab}
                onClick={() => onSelectCultureTab(item.tab)}
                className={`w-full flex items-center justify-between gap-3 px-2.5 py-2 rounded-lg text-left transition-all text-xs group ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 border border-amber-200 font-bold shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.accentColor}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`truncate leading-tight ${isActive ? 'font-bold text-amber-900' : 'font-medium text-slate-800'}`}>
                      {item.label}
                    </div>
                    <div className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-amber-700' : 'text-slate-600'}`}>
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-xs" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Portal Switch Card */}
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2 text-blue-900 text-xs font-bold">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Учебна академия</span>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Трябва ли ти одит на тетрадка, флаш карти или изпитен тест за училище?
          </p>
          <button
            onClick={onSwitchToStudy}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-xs"
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
