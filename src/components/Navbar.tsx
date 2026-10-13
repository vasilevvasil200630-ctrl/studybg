import React, { useState } from 'react';
import {
  Camera,
  BookOpen,
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
  MapPin,
  Quote,
  Scale,
  Award,
  ArrowUpRight,
  Home,
  Calculator
} from 'lucide-react';
import { errorBankService } from '../services/errorBankService';
import type { CultureSubTab } from './CultureHero';

export type AppNavTab =
  | 'home'
  | 'scan'
  | 'audit'
  | 'summary'
  | 'cases'
  | 'flashcards'
  | 'quiz'
  | 'simulator'
  | 'errorbank'
  | 'timeline'
  | 'generator'
  | 'catalog'
  | 'knowledge'
  | 'calculator';

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

  const highSchoolNavItems: { tab: AppNavTab; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    { tab: 'home', label: 'Начална страница', icon: <Home className="w-3.5 h-3.5 text-blue-600" /> },
    {
      tab: 'simulator',
      label: '100т. Симулатор',
      icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
          МОН
        </span>
      )
    },
    {
      tab: 'calculator',
      label: 'МОН Калкулатор',
      icon: <Calculator className="w-3.5 h-3.5 text-indigo-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold border border-indigo-200">
          Оценка & бал
        </span>
      )
    },
    {
      tab: 'cases',
      label: 'Казуси за ДЗИ',
      icon: <Scale className="w-3.5 h-3.5 text-purple-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold border border-purple-200">
          11–12 кл
        </span>
      )
    },
    { tab: 'summary', label: 'Конспект', icon: <BookOpen className="w-3.5 h-3.5 text-blue-600" /> },
    { tab: 'audit', label: 'Одит 6.00', icon: <CheckSquare className="w-3.5 h-3.5 text-emerald-600" /> },
    { tab: 'flashcards', label: 'Флаш карти', icon: <Zap className="w-3.5 h-3.5 text-emerald-600" /> },
    { tab: 'quiz', label: 'Тест', icon: <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> },
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
    { tab: 'catalog', label: 'Каталог 8.–12. кл', icon: <BookMarked className="w-3.5 h-3.5 text-blue-600" /> }
  ];

  const contextCultureNavItems: { subTab: CultureSubTab; label: string; icon: React.ReactNode }[] = [
    { subTab: 'mysteries', label: 'Исторически казуси', icon: <Compass className="w-3.5 h-3.5 text-amber-600" /> },
    { subTab: 'heritage', label: 'Принос & ЮНЕСКО', icon: <Award className="w-3.5 h-3.5 text-orange-600" /> },
    { subTab: 'timeline', label: 'Хронология (681–1908)', icon: <Clock className="w-3.5 h-3.5 text-emerald-600" /> },
    { subTab: 'cases', label: 'Отворени казуси', icon: <Scale className="w-3.5 h-3.5 text-amber-700" /> },
    { subTab: 'wonders', label: 'Природни чудеса', icon: <MapPin className="w-3.5 h-3.5 text-teal-600" /> },
    { subTab: 'trivia', label: 'Куиз за ерудити', icon: <Sparkles className="w-3.5 h-3.5 text-sky-600" /> },
    { subTab: 'myths', label: 'Факт или Мит?', icon: <HelpCircle className="w-3.5 h-3.5 text-rose-600" /> },
    { subTab: 'wisdom', label: 'Златен фонд & Мъдрост', icon: <Quote className="w-3.5 h-3.5 text-indigo-600" /> }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Clean Navbar Row */}
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="#study"
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={(e) => {
                e.preventDefault();
                onSelectPortalMode('study');
                handleStudyNavClick('home');
              }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                    Study<span className="text-blue-600">BG</span>
                  </span>
                  <span className="text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                    8.–12. клас
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                  Академия за НВО 10 и ДЗИ
                </span>
              </div>
            </a>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            <button
              onClick={() => handleStudyNavClick('home')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                portalMode === 'study' && activeTab === 'home'
                  ? 'bg-blue-50 text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4 text-blue-600" />
              <span>Начало</span>
            </button>

            <button
              onClick={() => handleStudyNavClick('simulator')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                portalMode === 'study' && activeTab === 'simulator'
                  ? 'bg-amber-50 text-amber-900 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-600" />
              <span>100т. Симулатор</span>
              <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
                МОН
              </span>
            </button>

            <button
              onClick={() => handleStudyNavClick('calculator')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                portalMode === 'study' && activeTab === 'calculator'
                  ? 'bg-indigo-50 text-indigo-900 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>МОН Калкулатор</span>
            </button>

            <button
              onClick={() => handleStudyNavClick('cases')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                portalMode === 'study' && activeTab === 'cases'
                  ? 'bg-purple-50 text-purple-900 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-4 h-4 text-purple-600" />
              <span>Казуси за ДЗИ</span>
            </button>

            <button
              onClick={() => handleStudyNavClick('catalog')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                portalMode === 'study' && activeTab === 'catalog'
                  ? 'bg-slate-200/80 text-slate-900 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookMarked className="w-4 h-4 text-slate-500" />
              <span>Каталог</span>
            </button>

            <button
              onClick={() => handleCultureNavClick('mysteries')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                portalMode === 'culture'
                  ? 'bg-amber-50 text-amber-900 font-bold shadow-2xs border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Обща култура</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Direct Matura+ Synergy Pill */}
            <a
              href="https://matura-plus.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold text-xs transition-colors shadow-2xs"
              title="Специализирана академия за НВО след 7. клас"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold">7. клас?</span>
              <span className="text-emerald-700 hidden lg:inline">Към Matura+</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
            </a>

            {/* Official МОН Formula Sheets Modal Button */}
            <button
              onClick={onOpenFormulaModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
              title="Официални свитъци и формуляри на МОН"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden xl:inline">Справочник МОН</span>
              <span className="xl:hidden">Справочник</span>
            </button>

            {/* Camera / Scan Notebook */}
            <button
              onClick={onOpenScan}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all whitespace-nowrap"
            >
              <Camera className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Снимай записки</span>
              <span className="sm:hidden">Снимай</span>
            </button>

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
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-4 bg-white px-2 rounded-b-2xl shadow-lg">
            
            {/* Matura+ Referral Bar in Mobile Drawer */}
            <a
              href="https://matura-plus.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-xs text-slate-900 shadow-2xs font-medium"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Готвиш се за <strong>7. клас (НВО)</strong>? Отвори <strong>Matura+</strong></span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-700 shrink-0" />
            </a>

            {/* Section 1: High School Core Tools (8.–12. grade) */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
                Гимназиална академия (8.–12. клас)
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {highSchoolNavItems.map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleStudyNavClick(item.tab)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                      portalMode === 'study' && activeTab === item.tab
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 2: Contextual History Engine for DZI */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800/80 px-1 mb-2 flex items-center justify-between">
                <span>Исторически контекст & Първични извори</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                  30т. ДЗИ
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {contextCultureNavItems.slice(0, 6).map((item) => (
                  <button
                    key={item.subTab}
                    onClick={() => handleCultureNavClick(item.subTab)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                      portalMode === 'culture' && activeCultureTab === item.subTab
                        ? 'bg-amber-50 text-amber-800 border border-amber-200 font-bold'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Actions Bottom */}
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
