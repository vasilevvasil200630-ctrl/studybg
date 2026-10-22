import React from 'react';
import type { AppNavTab } from './Navbar';
import { MOBILE_PRIMARY_TABS } from '../lib/studyNav';

interface MobileBottomNavProps {
  activeTab: AppNavTab;
  onSelectTab: (tab: AppNavTab) => void;
}

/** Долна лента на телефона — четирите най-чести места, както в Матура Плюс */
export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onSelectTab }) => (
  <nav
    data-print-hide
    aria-label="Бърза навигация"
    className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-3 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
  >
    <div className="grid grid-cols-4 gap-1">
      {MOBILE_PRIMARY_TABS.map(({ tab, label, icon: Icon }) => {
        const active = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelectTab(tab)}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-12 flex-col items-center justify-center rounded-xl px-2 py-1 transition-colors ${
              active ? 'bg-brand-sapphire-soft font-semibold text-brand-sapphire' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`h-[18px] w-[18px] ${active ? 'stroke-[2.2]' : 'stroke-[1.75]'}`} aria-hidden="true" />
            <span className="mt-0.5 text-xs font-medium leading-tight">{label}</span>
          </button>
        );
      })}
    </div>
  </nav>
);
