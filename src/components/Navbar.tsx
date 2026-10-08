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
  HelpCircle,
  Layers,
  FileSearch
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
  | 'catalog'
  | 'curriculum'
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
    if (tab === 'catalog') {
      onScrollToCatalog();
    } else {
      setActiveTab(tab);
    }
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
    { tab: 'summary', label: 'Конспект', icon: <BookOpen className="w-3.5 h-3.5 text-blue-600" /> },
    { tab: 'audit', label: 'Одит 6.00', icon: <CheckSquare className="w-3.5 h-3.5 text-amber-600" /> },
    { tab: 'diagnostic', label: 'Диагноза', icon: <FileSearch className="w-3.5 h-3.5 text-sky-600" /> },
    { tab: 'flashcards', label: 'Флаш карти', icon: <Zap className="w-3.5 h-3.5 text-emerald-600" /> },
    { tab: 'quiz', label: 'Тест', icon: <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> },
    { tab: 'simulator', label: 'Симулатор (100т.)', icon: <Clock className="w-3.5 h-3.5 text-amber-600" /> },
    {
      tab: 'errorbank',
      label: 'Банка с грешки',
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />,
      badge: unresolvedErrorCount > 0 ? (
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold border border-rose-200">
          {unresolvedErrorCount}
        </span>
      ) : null
    },
    { tab: 'generator', label: 'Група А & Б', icon: <Printer className="w-3.5 h-3.5 text-slate-600" /> },
    { tab: 'chat', label: 'AI Ментор', icon: <MessageSquare className="w-3.5 h-3.5 text-blue-600" /> },
    { tab: 'catalog', label: 'Каталог с теми', icon: <BookMarked className="w-3.5 h-3.5 text-emerald-600" /> },
    { tab: 'curriculum', label: 'Учебна програма', icon: <Layers className="w-3.5 h-3.5 text-sky-600" /> }
  ];

  const cultureNavItems: { subTab: CultureSubTab; label: string; icon: React.ReactNode }[] = [
    { subTab: 'mysteries', label: 'Неразгадани случки', icon: <Compass className="w-3.5 h-3.5 text-amber-600" /> },
    { subTab: 'timeline', label: 'Хронология (681–1908)', icon: <Clock className="w-3.5 h-3.5 text-emerald-600" /> },
    { subTab: 'trivia', label: 'Куиз (15 въпроса)', icon: <Sparkles className="w-3.5 h-3.5 text-sky-600" /> },
    { subTab: 'myths', label: 'Факт или Мит?', icon: <HelpCircle className="w-3.5 h-3.5 text-rose-600" /> }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Clean Navbar Row */}
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* Left: Logo & Portal Switcher */}
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
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                    Study<span className="text-blue-600">BG</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    МОН
                  </span>
                </div>
                <span className="hidden lg:block text-[10px] text-slate-500 font-medium">
                  {portalMode === 'study' ? 'Учебна академия' : 'Обща култура & Загадки'}
                </span>
              </div>
            </a>

            {/* Central Two-Part Mode Switcher Pill */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => onSelectPortalMode('study')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  portalMode === 'study'
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
                title="Отвори учебната академия за сканиране на тетрадки, конспекти и тестове"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Учебна академия</span>
                <span className="sm:hidden">Учене</span>
              </button>

              <button
                onClick={() => onSelectPortalMode('culture')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  portalMode === 'culture'
                    ? 'bg-white text-amber-700 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
                title="Отвори раздела за неразгадани случки, хронология и куиз за обща култура"
              >
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Обща култура & Загадки</span>
                <span className="sm:hidden">Загадки</span>
              </button>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <StudentStats />

            {portalMode === 'study' ? (
              <>
                {/* Official МОН Formula Sheets Modal Button */}
                <button
                  onClick={onOpenFormulaModal}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-xs"
                  title="Официални свитъци и формуляри на МОН"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Справочник МОН</span>
                </button>

                <button
                  onClick={onOpenScan}
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all whitespace-nowrap"
                >
                  <Camera className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">Снимай записки</span>
                  <span className="sm:hidden">Снимай</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => onSelectPortalMode('study')}
                className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Към ученето</span>
                <span className="sm:hidden">Учене</span>
              </button>
            )}

            {/* Mobile Navigation Drawer Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
              aria-label="Отвори навигационното меню"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-3 bg-white px-2 rounded-b-2xl shadow-lg">
            
            {/* Mode Switcher in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => {
                  onSelectPortalMode('study');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 ${
                  portalMode === 'study' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
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
                  portalMode === 'culture' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600'
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
                    <button
                      key={item.tab}
                      onClick={() => handleStudyNavClick(item.tab)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                        activeTab === item.tab
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                      {item.badge}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {cultureNavItems.map((item) => (
                    <button
                      key={item.subTab}
                      onClick={() => handleCultureNavClick(item.subTab)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                        activeCultureTab === item.subTab
                          ? 'bg-amber-50 text-amber-800 border border-amber-200 font-bold'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenFormulaModal();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium border border-slate-200 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Официални формули и свитъци МОН</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenScan();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4 text-white" />
                <span>Сканирай нова тетрадка / PDF</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </header>
  );
};
