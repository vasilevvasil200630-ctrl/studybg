import React from 'react';
import { Sparkles, Camera, BookOpen, MessageSquare, Zap, BookMarked, CheckSquare } from 'lucide-react';
import { StudentStats } from './StudentStats';

interface NavbarProps {
  activeTab: 'scan' | 'audit' | 'summary' | 'flashcards' | 'quiz' | 'chat';
  setActiveTab: (tab: 'scan' | 'audit' | 'summary' | 'flashcards' | 'quiz' | 'chat') => void;
  onOpenScan: () => void;
  onScrollToCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenScan,
  onScrollToCatalog
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0d17]/90 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('scan')}>
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-[1.5px] shadow-lg shadow-indigo-500/25">
              <div className="w-full h-full bg-[#0d0f1d] rounded-2xl flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <span className="absolute -bottom-1 -right-1 text-xs px-1 py-0.2 bg-emerald-500 text-black font-extrabold rounded-md shadow-sm">
                BG
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Study<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">BG</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  AI Учене
                </span>
              </div>
              <span className="hidden md:block text-[11px] text-slate-400 font-medium">
                Снимай тетрадката. Научи урока за 5 минути.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#131627]/80 p-1.5 rounded-2xl border border-white/5 shadow-inner">
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'scan'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-sky-400" />
              Smart Scan
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'audit'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
              Одит за 6-ца
            </button>

            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'summary'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Резюме
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Флашкарти
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xs">🏆</span>
              Тест за 6-ца
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
              Питай тетрадката
            </button>

            <button
              onClick={onScrollToCatalog}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <BookMarked className="w-3.5 h-3.5 text-emerald-400" />
              Каталог МОН
            </button>
          </nav>

          {/* Student Stats & Quick Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <StudentStats />

            <button
              onClick={onOpenScan}
              className="relative group overflow-hidden flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
              <span>Снимай тетрадка</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
