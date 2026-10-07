import React from 'react';
import { Camera, BookOpen, MessageSquare, Zap, BookMarked, CheckSquare, GraduationCap, Clock, AlertCircle, FileText, Printer, Compass } from 'lucide-react';
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
  const unresolvedErrorCount = errorBankService.getUnresolvedCount();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0d101d]/95 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Platform Badge */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('summary')}>
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
          </div>

          {/* Clean Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/90">
            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'audit'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Одит за 6.00</span>
            </button>

            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'summary'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Урок</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Флаш карти</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span>Симулатор (100т.)</span>
            </button>

            <button
              onClick={() => setActiveTab('errorbank')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'errorbank'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Банка с грешки</span>
              {unresolvedErrorCount > 0 && (
                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  {unresolvedErrorCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'timeline'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Хронология</span>
            </button>

            <button
              onClick={() => setActiveTab('knowledge')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'knowledge'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Неразгадани случки</span>
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'generator'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>Група А & Б</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-300" />
              <span>Чат</span>
            </button>

            <button
              onClick={onScrollToCatalog}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all border-l border-slate-800/80 ml-1 pl-2"
            >
              <BookMarked className="w-3.5 h-3.5 text-emerald-400" />
              <span>Каталог</span>
            </button>
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
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all whitespace-nowrap border border-indigo-500/40"
            >
              <Camera className="w-4 h-4 text-indigo-100" />
              <span>Анализирай записки</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
