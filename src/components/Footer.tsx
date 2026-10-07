import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  BookOpen,
  CheckSquare,
  Zap,
  FileText,
  Clock,
  Compass,
  Camera,
  AlertCircle,
  Sparkles,
  HelpCircle,
  Printer
} from 'lucide-react';
import type { AppNavTab } from './Navbar';
import type { CultureSubTab } from './CultureHero';

interface FooterProps {
  onNavigateTab: (tab: AppNavTab) => void;
  onSelectCultureTab?: (tab: CultureSubTab) => void;
  onSelectPortalMode?: (mode: 'study' | 'culture') => void;
  onOpenScan: () => void;
  onOpenFormulaModal: () => void;
  onScrollToCatalog: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onSelectCultureTab,
  onSelectPortalMode,
  onOpenScan,
  onOpenFormulaModal,
  onScrollToCatalog
}) => {
  const handleOpenCultureTab = (subTab: CultureSubTab) => {
    onSelectPortalMode?.('culture');
    onSelectCultureTab?.(subTab);
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenStudyTab = (tab: AppNavTab) => {
    onSelectPortalMode?.('study');
    onNavigateTab(tab);
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#090b14] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold shadow-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base tracking-tight">StudyBG</span>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60">
                    2 Портала в 1
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Платформа за качествено образование: Учебна академия за дигитализация на тетрадки и изпити по МОН, съчетана с богат раздел за Обща култура, неразгадани загадки и историческа хронология.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  onSelectPortalMode?.('study');
                  onOpenScan();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Снимай записки</span>
              </button>

              <button
                onClick={() => handleOpenCultureTab('mysteries')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold shadow-sm transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Разгледай загадките</span>
              </button>
            </div>
          </div>

          {/* Col 2: Инструменти за подготовка (Част 1) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Част 1: Учебна академия</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleOpenStudyTab('summary')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span>Учебен конспект (Синтез)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('audit')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Одит на тетрадката за 6.00</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('flashcards')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-slate-500" />
                  <span>Флаш карти с интервално повторение</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('quiz')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  <span>10-въпросен тест с оценка</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('chat')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Интерактивен ментор за въпроси</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: МОН Изпити & Ресурси */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>МОН Изпитни модули</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleOpenStudyTab('simulator')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>100-точков изпитен симулатор (НВО/ДЗИ)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('errorbank')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>Банка с грешки & Поправителен тест</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('generator')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Генератор на контролни (Група А & Б)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFormulaModal}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Официални формули и матрици на МОН</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToCatalog}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span>Пълен учебен каталог по предмети</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Обща култура & Загадки (Част 2) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Част 2: Обща култура</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleOpenCultureTab('mysteries')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Неразгадани случки от историята</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenCultureTab('timeline')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Хронология (681 – 1908 г.)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenCultureTab('trivia')}
                  className="hover:text-sky-400 transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Тест за обща култура (15 въпроса)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenCultureTab('myths')}
                  className="hover:text-rose-400 transition-colors flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Факт или Мит? (Развенчаване)</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Съобразено с държавните образователни изисквания на МОН и научни исторически извори</span>
          </div>
          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} StudyBG. Всички права запазени.
          </div>
        </div>

      </div>
    </footer>
  );
};
