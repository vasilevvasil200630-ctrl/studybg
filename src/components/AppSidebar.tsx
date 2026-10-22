import React, { useEffect } from 'react';
import { X, FileText, Compass, ArrowUpRight, RefreshCw } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import { BrandLogo } from './BrandLogo';
import { STUDY_NAV_GROUPS } from '../lib/studyNav';

interface AppSidebarProps {
  activeTab: AppNavTab;
  onSelectTab: (tab: AppNavTab) => void;
  currentLesson: LessonData;
  unresolvedErrorCount: number;
  totalLessonsCount: number;
  onOpenLessonPicker: () => void;
  onOpenFormulaModal: () => void;
  onOpenCulture: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const ITEM = 'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors cursor-pointer';
const ITEM_ACTIVE = 'bg-brand-sapphire text-white shadow-xs';
const ITEM_IDLE = 'text-slate-700 hover:bg-slate-100 hover:text-slate-900';

/**
 * Страничното меню на Учебната академия — същата подредба като в Матура Плюс:
 * бяла колона, групи с малки заглавия, активният раздел е плътно син.
 * Първата група започва с картата на избрания урок, защото инструментите под нея работят точно върху него.
 */
export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  onSelectTab,
  currentLesson,
  unresolvedErrorCount,
  totalLessonsCount,
  onOpenLessonPicker,
  onOpenFormulaModal,
  onOpenCulture,
  mobileOpen,
  onCloseMobile,
}) => {
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseMobile();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, onCloseMobile]);

  const go = (tab: AppNavTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden" onClick={onCloseMobile} aria-hidden="true" />
      )}

      <aside
        id="app-sidebar"
        aria-label="Учебна академия"
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-72 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:sticky lg:w-64 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              go('home');
            }}
            aria-label="StudyBG — начална страница"
            className="rounded-lg"
          >
            <BrandLogo />
          </a>
          <button
            type="button"
            onClick={onCloseMobile}
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label="Затвори менюто"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {STUDY_NAV_GROUPS.map((group, gi) => (
            <div key={group.title} className={gi > 0 ? 'border-t border-slate-100 pt-4' : ''}>
              <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">{group.title}</p>

              {gi === 0 && (
                <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[11px] font-semibold text-slate-500">
                    {currentLesson.subject} · {currentLesson.grade}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[13px] font-bold leading-snug text-slate-900">{currentLesson.title}</p>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenLessonPicker();
                      onCloseMobile();
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-sapphire hover:text-brand-sapphire-dark cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                    Смени урока
                  </button>
                </div>
              )}

              <ul className="space-y-0.5">
                {group.items.map(({ tab, label, icon: Icon }) => {
                  const active = activeTab === tab;
                  const count =
                    tab === 'errorbank' ? unresolvedErrorCount : tab === 'catalog' ? totalLessonsCount : 0;
                  return (
                    <li key={tab}>
                      <button
                        type="button"
                        onClick={() => go(tab)}
                        aria-current={active ? 'page' : undefined}
                        className={`${ITEM} ${active ? ITEM_ACTIVE : ITEM_IDLE}`}
                      >
                        <Icon
                          className={`h-[18px] w-[18px] shrink-0 ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-800'}`}
                          aria-hidden="true"
                        />
                        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
                        {count > 0 && (
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${
                              active
                                ? 'bg-white/20 text-white'
                                : tab === 'errorbank'
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}

                {gi === STUDY_NAV_GROUPS.length - 1 && (
                  <>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          onOpenFormulaModal();
                          onCloseMobile();
                        }}
                        className={`${ITEM} ${ITEM_IDLE}`}
                      >
                        <FileText className="h-[18px] w-[18px] shrink-0 text-slate-500 group-hover:text-slate-800" aria-hidden="true" />
                        <span className="flex-1 truncate text-left">Формули на МОН</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          onOpenCulture();
                          onCloseMobile();
                        }}
                        className={`${ITEM} ${ITEM_IDLE}`}
                      >
                        <Compass className="h-[18px] w-[18px] shrink-0 text-amber-600" aria-hidden="true" />
                        <span className="flex-1 truncate text-left">Обща култура и мистерии</span>
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-slate-200 p-3">
          <a
            href="https://maturaplus.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <span>
              7. клас? <span className="text-brand-ink">Матура</span>
              <span className="text-emerald-700">Плюс</span>
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </aside>
    </>
  );
};
