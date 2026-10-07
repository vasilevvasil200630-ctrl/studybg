import React from 'react';
import { GraduationCap, ShieldCheck, BookOpen, CheckSquare, Zap, FileText, Clock, Compass, Camera, AlertCircle } from 'lucide-react';
import type { AppNavTab } from './Navbar';

interface FooterProps {
  onNavigateTab: (tab: AppNavTab) => void;
  onOpenScan: () => void;
  onOpenFormulaModal: () => void;
  onScrollToCatalog: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenScan,
  onOpenFormulaModal,
  onScrollToCatalog
}) => {
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
                    Образователна платформа
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Дигитализация на ученически тетрадки и цялостна подготовка за училище, НВО и ДЗИ по официалните държавни образователни стандарти на МОН.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenScan}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Сканирай записки сега</span>
              </button>
            </div>
          </div>

          {/* Col 2: Инструменти за подготовка */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Инструменти за подготовка
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('summary')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span>Учебен конспект (Резюме)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('audit')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Одит на тетрадката за 6.00</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('flashcards')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-slate-500" />
                  <span>Флаш карти за самопроверка</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('quiz')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  <span>Тест с шестобална оценка</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('chat')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Интерактивен ментор „Питай тетрадката“</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: МОН Изпити & Практика */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              МОН Изпити & Ресурси
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('simulator')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>100-точков изпитен симулатор</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('errorbank')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>Банка с грешки & Персонален тест</span>
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
                  onClick={() => onNavigateTab('generator')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Генератор на контролни (Група А & Б)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Обща култура & Каталог */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Обща култура & Дърво по МОН
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('timeline')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Линия на времето (681 – 1908 г.)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('knowledge')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Неразгадани случки от историята</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToCatalog}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Пълен учебен каталог по предмети</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Съобразено с държавните образователни изисквания на Република България</span>
          </div>
          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} StudyBG. Всички права запазени.
          </div>
        </div>

      </div>
    </footer>
  );
};
