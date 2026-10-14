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
  Printer,
  ArrowUpRight,
  Scale,
  Calendar,
  PenTool,
  Feather,
  Calculator,
  MapPin,
  Globe,
  FlaskConical,
  Mic
} from 'lucide-react';
import type { AppNavTab } from './Navbar';
import type { CultureSubTab } from './CultureHero';
import type { LegalPolicyTab } from './LegalPoliciesModal';

interface FooterProps {
  onNavigateTab: (tab: AppNavTab) => void;
  onSelectCultureTab?: (tab: CultureSubTab) => void;
  onSelectPortalMode?: (mode: 'study' | 'culture') => void;
  onOpenScan: () => void;
  onOpenFormulaModal: () => void;
  onScrollToCatalog: () => void;
  onOpenPolicyModal?: (tab: LegalPolicyTab) => void;
  onOpenCookieSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onSelectCultureTab,
  onSelectPortalMode,
  onOpenScan,
  onOpenFormulaModal,
  onScrollToCatalog,
  onOpenPolicyModal,
  onOpenCookieSettings
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
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 pt-14 pb-10 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand Info & High-School Focus */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white font-bold shadow-xs">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-base tracking-tight">StudyBG</span>
                  <span className="text-[10px] uppercase font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                    8.–12. клас
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Специализирана учебна академия за гимназиален етап. Подготовка за НВО 10 и ДЗИ 12 по стандартите на МОН: 100-точкови симулации, 4-критерийна рубрика за есе и исторически контекст за Отличен 6.00.
            </p>
            
            {/* Quick Actions */}
            <div className="pt-1 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  onSelectPortalMode?.('study');
                  onOpenScan();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Снимай записки</span>
              </button>

              <a
                href="https://matura-plus.bg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold shadow-2xs transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Matura+ (5.–7. клас)</span>
                <ArrowUpRight className="w-3 h-3 text-emerald-700" />
              </a>
            </div>
          </div>

          {/* Col 2: Гимназиална академия & Лаборатории */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Гимназиална подготовка</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => handleOpenStudyTab('planner')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2 font-semibold text-slate-800"
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Моят План за 6.00 & Таймер ДЗИ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('simulator')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>100т. Симулатор МОН (НВО 10 & ДЗИ)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('oralexam')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2 font-semibold text-indigo-800"
                >
                  <Mic className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Устно изпитване пред дъската (Глас)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('grammar')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <PenTool className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Тренажор Правопис (Модул 1 БЕЛ)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('moduletwo')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <Feather className="w-3.5 h-3.5 text-violet-600" />
                  <span>Тропи, Пароними & Резюме (Модул 2)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('literature')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                  <span>Литературен канон & Тези (Задача 41)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('mathlab')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Математика & STEM Лаборатория</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('sciencelab')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2 font-semibold text-emerald-800"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Природни науки Лаб (ДНК, Йони, Ом)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('atlas')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Атлас История & География (NUTS 2)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('english')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <span>Английски език ДЗИ (B1.1 & B2)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('civics')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <Scale className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Конституция на РБ & ЕС (ГО / ДЗИ)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('blitz')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Блиц за 60 сек. (Speed Blitz 6.00)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: МОН Изпити & Инструменти */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Ресурси по стандарта на МОН</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => handleOpenStudyTab('calculator')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2 font-semibold text-slate-800"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Калкулатор ДЗИ / НВО & Бал за ВУЗ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFormulaModal}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Официални формули и свитъци МОН</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('cases')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <Scale className="w-3.5 h-3.5 text-purple-600" />
                  <span>Казуси за ДЗИ (11.–12. клас)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('audit')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>Одит на тетрадката за 6.00</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('flashcards')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Флаш карти с интервално повторение</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('errorbank')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Банка с грешки & Поправителен тест</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenStudyTab('generator')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>Генератор за контролни (Група А & Б)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToCatalog}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Гимназиален каталог (8.–12. клас)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Исторически контекст & Първични извори */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>Обща култура, Конспирации & Извори</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => handleOpenCultureTab('mysteries')}
                  className="hover:text-amber-800 transition-colors flex items-center gap-2 font-semibold text-amber-900"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  <span>33 Конспиративни досиета & Загадки</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenCultureTab('mysticmap')}
                  className="hover:text-purple-800 transition-colors flex items-center gap-2 font-semibold text-purple-900"
                >
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  <span>Карта на мистичните зони (12 обекта)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenCultureTab('timeline')}
                  className="hover:text-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Хронология на събитията (681–1908)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenCultureTab('heritage')}
                  className="hover:text-orange-700 transition-colors flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                  <span>Български принос & ЮНЕСКО (16)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenCultureTab('trivia')}
                  className="hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Куиз за ерудити (42 въпроса)</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Policies & Cookie Settings Strip */}
        <div className="pt-6 pb-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
            <button
              onClick={() => onOpenPolicyModal?.('privacy')}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Политика за поверителност (GDPR)
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicyModal?.('ai_act')}
              className="hover:text-indigo-600 transition-colors font-medium"
            >
              Прозрачност за ИИ (EU AI Act)
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicyModal?.('accessibility')}
              className="hover:text-emerald-600 transition-colors font-medium"
            >
              Достъпност (EAA / WCAG)
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicyModal?.('cookies')}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Политика за бисквитките
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicyModal?.('terms')}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Условия & DSA
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenCookieSettings?.()}
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              🍪 Настройки на бисквитките
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Съобразено с регламентите на ЕС (GDPR • EU AI Act • EAA • DSA)</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Съобразено с държавните образователни изисквания на МОН за гимназиален етап (8.–12. клас)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              PWA Офлайн режим активен
            </span>
            <span>© {new Date().getFullYear()} StudyBG. Всички права запазени.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
