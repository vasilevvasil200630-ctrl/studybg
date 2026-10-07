import React, { useState } from 'react';
import {
  Camera,
  BookOpen,
  MessageSquare,
  Zap,
  BookMarked,
  CheckSquare,
  GraduationCap,
  Clock,
  AlertCircle,
  FileText,
  Printer,
  Compass,
  Menu,
  X,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { StudentStats } from './StudentStats';
import { errorBankService } from '../services/errorBankService';
import type { CultureSubTab } from './CultureHero';

export type AppNavTab =
  | 'scan'
  | 'diagnostic'
  | 'audit'
  | 'summary'
  | 'flashcards'
  | 'quiz'
  | 'chat'
  | 'simulator'
  | 'errorbank'
  | 'timeline'
  | 'generator'
  | 'knowledge';

interface NavbarProps {
  portalMode: 'study' | 'culture';
  onSelectPortalMode: (mode: 'study' | 'culture') => void;
  activeTab: AppNavTab;
  setActiveTab: (tab: AppNavTab) => void;
  activeCultureTab: CultureSubTab;
  onSelectCultureTab: (tab: CultureSubTab) => void;
  onOpenScan: () => void;
  onScrollToCatalog: () => void;
  onOpenFormulaModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  portalMode,
  onSelectPortalMode,
  activeTab,
  setActiveTab,
  activeCultureTab,
  onSelectCultureTab,
  onOpenScan,
  onScrollToCatalog,
  onOpenFormulaModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const unresolvedErrorCount = errorBankService.getUnresolvedCount();

  const handleStudyNavClick = (tab: AppNavTab) => {
    setActiveTab(tab);
    if (portalMode !== 'study') {
      onSelectPortalMode('study');
    }
    setIsMobileMenuOpen(false);
  };

  const handleCultureNavClick = (subTab: CultureSubTab) => {
    onSelectCultureTab(subTab);
    if (portalMode !== 'culture') {
      onSelectPortalMode('culture');
    }
    setIsMobileMenuOpen(false);
  };

  const studyNavItems: { tab: AppNavTab; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    { tab: 'summary', label: 'Урок', icon: <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> },
    { tab: 'audit', label: 'Одит за 6.00', icon: <CheckSquare className="w-3.5 h-3.5 text-amber-400" /> },
    { tab: 'flashcards', label: 'Флаш карти', icon: <Zap className="w-3.5 h-3.5 text-emerald-400" /> },
    { tab: 'quiz', label: 'Тест', icon: <GraduationCap className="w-3.5 h-3.5 text-sky-400" /> },
    { tab: 'simulator', label: 'Симулатор (100т.)', icon: <Clock className="w-3.5 h-3.5 text-amber-400" /> },
    {
      tab: 'errorbank',
      label: 'Банка с грешки',
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-400" />,
      badge: unresolvedErrorCount > 0 ? (
        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
          {unresolvedErrorCount}
        </span>
      ) : null
    },
    { tab: 'generator', label: 'Група А & Б', icon: <Printer className="w-3.5 h-3.5 text-slate-300" /> },
    { tab: 'chat', label: 'Чат', icon: <MessageSquare className="w-3.5 h-3.5 text-slate-300" /> }
  ];

  const cultureNavItems: { subTab: CultureSubTab; label: string; icon: React.ReactNode }[] = [
    { subTab: 'mysteries', label: 'Неразгадани случки', icon: <Compass className="w-3.5 h-3.5 text-amber-400" /> },
    { subTab: 'timeline', label: 'Хронология (681–1908)', icon: <Clock className="w-3.5 h-3.5 text-emerald-400" /> },
    { subTab: 'trivia', label: 'Куиз (15 въпроса)', icon: <Sparkles className="w-3.5 h-3.5 text-sky-400" /> },
    { subTab: 'myths', label: 'Факт или Мит?', icon: <HelpCircle className="w-3.5 h-3.5 text-rose-400" /> }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0d101d]/95 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
          
          {/* Logo & Portal Switcher Wrapper */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="#study"
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={(e) => {
                e.preventDefault();
                onSelectPortalMode('study');
                handleStudyNavClick('summary');
              }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-sm ring-1 ring-white/15 group-hover:bg-indigo-500 transition-colors">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    Study<span className="text-sky-400">BG</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80">
                    Портал
                  </span>
                </div>
                <span className="hidden lg:block text-[10px] text-slate-400 font-medium">
                  {portalMode === 'study' ? 'Учебна подготовка по МОН' : 'Обща култура & Загадки'}
                </span>
              </div>
            </a>

            {/* Central Two-Part Mode Switcher Pill */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
              <button
                onClick={() => onSelectPortalMode('study')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  portalMode === 'study'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title="Отвори учебната академия за сканиране на тетрадки, конспекти и тестове"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Учебна академия</span>
                <span className="md:hidden">Учене</span>
              </button>

              <button
                onClick={() => onSelectPortalMode('culture')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  portalMode === 'culture'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title="Отвори раздела за неразгадани случки, хронология и куиз за обща култура"
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Обща култура & Загадки</span>
                <span className="md:hidden">Загадки</span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links based on portalMode */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/90">
            {portalMode === 'study' ? (
              <>
                {studyNavItems.map((item) => (
                  <a
                    key={item.tab}
                    href={`#${item.tab}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleStudyNavClick(item.tab);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === item.tab
                        ? 'bg-slate-800 text-white shadow-sm border border-slate-700/70 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge}
                  </a>
                ))}

                <a
                  href="#catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToCatalog();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all border-l border-slate-800/80 ml-1 pl-2"
                >
                  <BookMarked className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Каталог</span>
                </a>
              </>
            ) : (
              <>
                {cultureNavItems.map((item) => (
                  <button
                    key={item.subTab}
                    onClick={() => handleCultureNavClick(item.subTab)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeCultureTab === item.subTab
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </>
            )}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <StudentStats />

            {portalMode === 'study' ? (
              <>
                {/* Formula Sheets Button */}
                <button
                  onClick={onOpenFormulaModal}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shadow-sm"
                  title="Официални свитъци и формуляри на МОН"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Справочник МОН</span>
                </button>

                <button
                  onClick={onOpenScan}
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all whitespace-nowrap border border-indigo-500/40"
                >
                  <Camera className="w-4 h-4 text-indigo-100" />
                  <span>Снимай записки</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => onSelectPortalMode('study')}
                className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                <span>Към ученето</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              aria-label="Отвори навигационното меню"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-800/80 space-y-3 bg-[#0d101d] px-2 rounded-b-2xl shadow-2xl">
            
            {/* Mode Switcher in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  onSelectPortalMode('study');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 ${
                  portalMode === 'study' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Учебна академия</span>
              </button>

              <button
                onClick={() => {
                  onSelectPortalMode('culture');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 ${
                  portalMode === 'culture' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Обща култура</span>
              </button>
            </div>

            {/* Links Stream */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
              {portalMode === 'study' ? (
                <>
                  {studyNavItems.map((item) => (
                    <a
                      key={item.tab}
                      href={`#${item.tab}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleStudyNavClick(item.tab);
                      }}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all ${
                        activeTab === item.tab
                          ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                          : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                      }`}
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                      {item.badge}
                    </a>
                  ))}

                  <a
                    href="#catalog"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      onScrollToCatalog();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                  >
                    <BookMarked className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Каталог</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenFormulaModal();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Справочник МОН</span>
                  </button>
                </>
              ) : (
                <>
                  {cultureNavItems.map((item) => (
                    <button
                      key={item.subTab}
                      onClick={() => handleCultureNavClick(item.subTab)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all ${
                        activeCultureTab === item.subTab
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                      }`}
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
