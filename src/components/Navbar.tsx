import React, { useState } from 'react';
import { Camera, BookOpen, MessageSquare, Zap, BookMarked, CheckSquare, GraduationCap, Clock, AlertCircle, FileText, Printer, Compass, Menu, X } from 'lucide-react';
import { StudentStats } from './StudentStats';
import { errorBankService } from '../services/errorBankService';

export type AppNavTab = 'scan' | 'diagnostic' | 'audit' | 'summary' | 'flashcards' | 'quiz' | 'chat' | 'simulator' | 'errorbank' | 'timeline' | 'generator' | 'knowledge';

interface NavbarProps {
  activeTab: AppNavTab;
  setActiveTab: (tab: AppNavTab) => void;
  onOpenScan: () => void;
  onScrollToCatalog: () => void;
  onOpenFormulaModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenScan,
  onScrollToCatalog,
  onOpenFormulaModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const unresolvedErrorCount = errorBankService.getUnresolvedCount();

  const handleNavClick = (tab: AppNavTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const navItems: { tab: AppNavTab; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
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
    { tab: 'timeline', label: 'Хронология', icon: <Clock className="w-3.5 h-3.5 text-emerald-400" /> },
    { tab: 'knowledge', label: 'Неразгадани случки', icon: <Compass className="w-3.5 h-3.5 text-amber-400" /> },
    { tab: 'generator', label: 'Група А & Б', icon: <Printer className="w-3.5 h-3.5 text-slate-300" /> },
    { tab: 'chat', label: 'Чат', icon: <MessageSquare className="w-3.5 h-3.5 text-slate-300" /> },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0d101d]/95 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Platform Badge */}
          <a
            href="#workspace"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('summary');
            }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-sm ring-1 ring-white/15 group-hover:bg-indigo-500 transition-colors">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Study<span className="text-sky-400">BG</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80">
                  МОН Стандарт
                </span>
              </div>
              <span className="hidden md:block text-[11px] text-slate-400 font-medium">
                Подготовка по учебната програма за 5.–12. клас
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/90">
            {navItems.map((item) => (
              <a
                key={item.tab}
                href={`#${item.tab}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.tab);
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
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <StudentStats />

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
              <span>Анализирай записки</span>
            </button>

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
          <div className="xl:hidden py-4 border-t border-slate-800/80 space-y-2 bg-[#0d101d] px-2 rounded-b-2xl shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {navItems.map((item) => (
                <a
                  key={item.tab}
                  href={`#${item.tab}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.tab);
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
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
