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
  Calculator,
  PenTool,
  Calendar,
  Feather,
  Globe
} from 'lucide-react';
import { errorBankService } from '../services/errorBankService';
import type { CultureSubTab } from './CultureHero';

export type AppNavTab =
  | 'home'
  | 'planner'
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
  | 'calculator'
  | 'grammar'
  | 'moduletwo'
  | 'literature'
  | 'mathlab'
  | 'atlas'
  | 'english'
  | 'civics';

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
      tab: 'planner',
      label: 'Моят План за 6.00',
      icon: <Calendar className="w-3.5 h-3.5 text-emerald-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
          Таймер & План
        </span>
      )
    },
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
    {
      tab: 'grammar',
      label: 'Тренажор БЕЛ',
      icon: <PenTool className="w-3.5 h-3.5 text-blue-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
          Модул 1
        </span>
      )
    },
    {
      tab: 'moduletwo',
      label: 'Тропи, Пароними & Резюме',
      icon: <Feather className="w-3.5 h-3.5 text-purple-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-bold border border-purple-200">
          Модул 2
        </span>
      )
    },
    {
      tab: 'literature',
      label: 'Литературен Канон',
      icon: <BookMarked className="w-3.5 h-3.5 text-purple-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-bold border border-purple-200">
          41. въпрос
        </span>
      )
    },
    {
      tab: 'mathlab',
      label: 'Математика & STEM',
      icon: <Compass className="w-3.5 h-3.5 text-cyan-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold border border-cyan-200">
          НВО 10 & ДЗИ
        </span>
      )
    },
    {
      tab: 'atlas',
      label: 'Атлас История & География',
      icon: <MapPin className="w-3.5 h-3.5 text-amber-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
          Карти & NUTS 2
        </span>
      )
    },
    {
      tab: 'english',
      label: 'Английски език (ДЗИ)',
      icon: <Globe className="w-3.5 h-3.5 text-sky-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-bold border border-sky-200">
          B1.1 & B2
        </span>
      )
    },
    {
      tab: 'civics',
      label: 'Конституция & ЕС',
      icon: <Scale className="w-3.5 h-3.5 text-indigo-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">
          ГО & ДЗИ
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
              href="/"
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={(e) => {
                e.preventDefault();
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
          {activeTab === 'home' ? (
            <nav className="hidden lg:flex items-center gap-6">
              <a
                href="#pillars"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Четирите стълба
              </a>
              <a
                href="#curriculum"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Учебни конспекти
              </a>
              <a
                href="#smartscan"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                SmartScan OCR
              </a>
              <a
                href="#culture-preview"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Обща култура
              </a>
            </nav>
          ) : (
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              <button
                onClick={() => handleStudyNavClick('home')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <Home className="w-4 h-4 text-slate-600" />
                <span>Начало</span>
              </button>

              <button
                onClick={() => handleStudyNavClick('planner')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  portalMode === 'study' && activeTab === 'planner'
                    ? 'bg-emerald-50 text-emerald-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>План за 6.00</span>
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
                onClick={() => handleStudyNavClick('grammar')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  portalMode === 'study' && activeTab === 'grammar'
                    ? 'bg-blue-50 text-blue-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <PenTool className="w-4 h-4 text-blue-600" />
                <span>Тренажор БЕЛ</span>
              </button>

              <button
                onClick={() => handleStudyNavClick('literature')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  portalMode === 'study' && activeTab === 'literature'
                    ? 'bg-purple-50 text-purple-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookMarked className="w-4 h-4 text-purple-600" />
                <span>Литературен Канон</span>
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
          )}

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

            {/* In-app action buttons: Only visible once inside the platform */}
            {activeTab !== 'home' && (
              <>
                <button
                  onClick={() => handleStudyNavClick('home')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap"
                  title="Върни се на началната страница"
                >
                  <Home className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline">Начална страница</span>
                  <span className="sm:hidden">Начало</span>
                </button>

                <button
                  onClick={onOpenFormulaModal}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
                  title="Официални свитъци и формуляри на МОН"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden xl:inline">Справочник МОН</span>
                  <span className="xl:hidden">Справочник</span>
                </button>

                <button
                  onClick={onOpenScan}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all whitespace-nowrap cursor-pointer"
                  title="Сканирай своя тетрадка с камера или качи PDF"
                >
                  <Camera className="w-4 h-4 text-slate-600" />
                  <span className="hidden xl:inline">Сканирай записки</span>
                  <span className="xl:hidden">Сканирай</span>
                </button>
              </>
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

            {activeTab === 'home' ? (
              /* On Homepage: Show only informative presentation navigation anchors */
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
                  За платформата
                </div>
                <a
                  href="#pillars"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Четирите стълба за отличен
                </a>
                <a
                  href="#curriculum"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Учебни конспекти & програми
                </a>
                <a
                  href="#smartscan"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  SmartScan OCR за записки
                </a>
                <a
                  href="#culture-preview"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Обща култура & Загадки
                </a>
              </div>
            ) : (
              /* Inside Academy: Show full tools & tabs */
              <>
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
              </>
            )}

          </div>
        )}

      </div>
    </header>
  );
};
