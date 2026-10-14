import React, { useState, useRef, useEffect } from 'react';
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
  Globe,
  FlaskConical,
  Mic,
  Search,
  ChevronDown,
  Layers
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
  | 'sciencelab'
  | 'oralexam'
  | 'atlas'
  | 'english'
  | 'civics'
  | 'blitz'
  | 'specialties';

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
  onOpenQuickSearch?: () => void;
  totalLessonsCount?: number;
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
  onOpenFormulaModal,
  onOpenQuickSearch,
  totalLessonsCount = 108
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLabsDropdownOpen, setIsLabsDropdownOpen] = useState(false);
  const labsDropdownRef = useRef<HTMLDivElement>(null);
  const unresolvedErrorCount = errorBankService.getUnresolvedCount();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (labsDropdownRef.current && !labsDropdownRef.current.contains(event.target as Node)) {
        setIsLabsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStudyNavClick = (tab: AppNavTab) => {
    if (tab === 'catalog') {
      onScrollToCatalog();
    } else {
      setActiveTab(tab);
    }
    if (portalMode !== 'study') {
      onSelectPortalMode('study');
    }
    setIsLabsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleCultureNavClick = (subTab: CultureSubTab) => {
    onSelectCultureTab(subTab);
    if (portalMode !== 'culture') {
      onSelectPortalMode('culture');
    }
    setIsLabsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const interactiveLabsList: {
    tab: AppNavTab;
    label: string;
    desc: string;
    badge: string;
    icon: React.ReactNode;
    accentBg: string;
  }[] = [
    {
      tab: 'specialties',
      label: 'Училища & Специалности 8.–12. клас',
      desc: 'ПМГ, ЕГ, ТУЕС/ИТ, НТБГ/Бизнес, СГСАГ, Мехатроника, Медицина и Туризъм',
      badge: '8.–12. КЛАС',
      icon: <GraduationCap className="w-4 h-4 text-indigo-600" />,
      accentBg: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    },
    {
      tab: 'oralexam',
      label: 'Устно изпитване пред дъската',
      desc: 'Гласов и писмен симулатор за 6.00 с AI рублика',
      badge: 'ТОП ЛАБ',
      icon: <Mic className="w-4 h-4 text-indigo-600" />,
      accentBg: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    },
    {
      tab: 'sciencelab',
      label: 'Лаборатория Природни науки',
      desc: 'Биология (ДНК), Химия (Йони/pH) & Физика (Ом)',
      badge: 'STEM ДЗИ',
      icon: <FlaskConical className="w-4 h-4 text-emerald-600" />,
      accentBg: 'bg-emerald-50 border-emerald-200 text-emerald-800'
    },
    {
      tab: 'grammar',
      label: 'Езиков тренажор БЕЛ (Модул 1)',
      desc: 'Пълен/кратък член, бройна форма, запетаи и пароними',
      badge: 'БАН Норми',
      icon: <PenTool className="w-4 h-4 text-blue-600" />,
      accentBg: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      tab: 'moduletwo',
      label: 'Тропи, Пароними & Резюме (Модул 2)',
      desc: 'Фигури на речта, четене с разбиране и резюмиране',
      badge: 'Модул 2',
      icon: <Feather className="w-4 h-4 text-purple-600" />,
      accentBg: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      tab: 'literature',
      label: 'Литературен Канон (41. въпрос)',
      desc: 'Съпоставителни таблици, мотиви и тези за есе и ИС',
      badge: '30т. ДЗИ',
      icon: <BookMarked className="w-4 h-4 text-violet-600" />,
      accentBg: 'bg-violet-50 border-violet-200 text-violet-800'
    },
    {
      tab: 'mathlab',
      label: 'Математика & STEM Лаборатория',
      desc: 'Интерактивен решавач на уравнения, прогресии и геометрия',
      badge: 'НВО 10 & ДЗИ',
      icon: <Compass className="w-4 h-4 text-cyan-600" />,
      accentBg: 'bg-cyan-50 border-cyan-200 text-cyan-800'
    },
    {
      tab: 'atlas',
      label: 'Атлас История & География',
      desc: 'Исторически договори (681–1947) и икономически райони NUTS 2',
      badge: 'Карти МОН',
      icon: <MapPin className="w-4 h-4 text-amber-600" />,
      accentBg: 'bg-amber-50 border-amber-200 text-amber-800'
    },
    {
      tab: 'english',
      label: 'Английски език (CEFR B1.1 & B2)',
      desc: 'Use of English трансформации, времена и академично есе',
      badge: 'B1.1 / B2',
      icon: <Globe className="w-4 h-4 text-sky-600" />,
      accentBg: 'bg-sky-50 border-sky-200 text-sky-800'
    },
    {
      tab: 'civics',
      label: 'Конституция на РБ & Европейски съюз',
      desc: 'Разделение на властите, права на гражданите и институции',
      badge: '11.–12. кл',
      icon: <Scale className="w-4 h-4 text-indigo-600" />,
      accentBg: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    },
    {
      tab: 'blitz',
      label: 'Скоростен Блиц Маратон (60 сек.)',
      desc: 'Бърза тренировка на термини, формули и дати с Combo x5',
      badge: 'Combo x5',
      icon: <Zap className="w-4 h-4 text-amber-600" />,
      accentBg: 'bg-amber-50 border-amber-200 text-amber-800'
    },
    {
      tab: 'calculator',
      label: 'МОН Калкулатор за оценки и бал',
      desc: 'Точно превръщане на точки (0–100) в оценка за НВО 10 и ДЗИ',
      badge: 'Скала МОН',
      icon: <Calculator className="w-4 h-4 text-teal-600" />,
      accentBg: 'bg-teal-50 border-teal-200 text-teal-800'
    },
    {
      tab: 'cases',
      label: 'Исторически и философски казуси',
      desc: 'Анализ на първични исторически извори и аргументативни есета',
      badge: 'Модул 3',
      icon: <Scale className="w-4 h-4 text-rose-600" />,
      accentBg: 'bg-rose-50 border-rose-200 text-rose-800'
    }
  ];

  const highSchoolNavItems: { tab: AppNavTab; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    { tab: 'home', label: 'Начална страница', icon: <Home className="w-3.5 h-3.5 text-blue-600" /> },
    {
      tab: 'specialties',
      label: 'Училища & Специалности 8–12 кл.',
      icon: <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">
          Всички предмети
        </span>
      )
    },
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
      tab: 'sciencelab',
      label: 'Лаб Природни науки',
      icon: <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
          ДНК, Йони & Ом
        </span>
      )
    },
    {
      tab: 'oralexam',
      label: 'Устно изпитване',
      icon: <Mic className="w-3.5 h-3.5 text-indigo-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">
          Пред дъската
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
    {
      tab: 'blitz',
      label: 'Блиц за 60 сек.',
      icon: <Zap className="w-3.5 h-3.5 text-amber-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
          Combo x5
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
    { tab: 'catalog', label: `Каталог (${totalLessonsCount} урока)`, icon: <BookMarked className="w-3.5 h-3.5 text-blue-600" /> }
  ];

  const contextCultureNavItems: { subTab: CultureSubTab; label: string; icon: React.ReactNode }[] = [
    { subTab: 'mysteries', label: 'Конспирации & Досиета (40)', icon: <Compass className="w-3.5 h-3.5 text-amber-600" /> },
    { subTab: 'mysticmap', label: 'Карта на мистичните зони (12)', icon: <MapPin className="w-3.5 h-3.5 text-purple-600" /> },
    { subTab: 'heritage', label: 'Принос & ЮНЕСКО (16)', icon: <Award className="w-3.5 h-3.5 text-orange-600" /> },
    { subTab: 'timeline', label: 'Хронология (681–1908)', icon: <Clock className="w-3.5 h-3.5 text-emerald-600" /> },
    { subTab: 'cases', label: 'Отворени казуси (12)', icon: <Scale className="w-3.5 h-3.5 text-amber-700" /> },
    { subTab: 'wonders', label: 'Природни чудеса (18)', icon: <MapPin className="w-3.5 h-3.5 text-teal-600" /> },
    { subTab: 'trivia', label: 'Куиз за ерудити (48)', icon: <Sparkles className="w-3.5 h-3.5 text-sky-600" /> },
    { subTab: 'myths', label: 'Факт или Конспирация (24)', icon: <HelpCircle className="w-3.5 h-3.5 text-rose-600" /> },
    { subTab: 'wisdom', label: 'Златен фонд & Мъдрост (16)', icon: <Quote className="w-3.5 h-3.5 text-indigo-600" /> }
  ];

  const isLabActive =
    portalMode === 'study' &&
    interactiveLabsList.some((lab) => lab.tab === activeTab);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/95 border-b border-slate-200/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Platform Command Row */}
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-3">
          
          {/* Left: Brand Identity + Segmented Portal Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <a
              href="/"
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={(e) => {
                e.preventDefault();
                handleStudyNavClick('home');
              }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs group-hover:from-blue-700 group-hover:to-indigo-700 transition-all">
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
                  Национална образователна платформа
                </span>
              </div>
            </a>

            {/* Segmented Portal Mode Switcher (Study Academy vs Culture & Mysteries) */}
            <div className="hidden xl:flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 ml-1">
              <button
                onClick={() => handleStudyNavClick(activeTab === 'home' ? 'summary' : activeTab)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  portalMode === 'study'
                    ? 'bg-white text-blue-700 shadow-2xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Гимназиална учебна академия по МОН (8.–12. клас)"
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Академия ({totalLessonsCount})</span>
              </button>
              <button
                onClick={() => handleCultureNavClick('mysteries')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  portalMode === 'culture'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-amber-800'
                }`}
                title="Обща култура, конспиративни досиета и мистични зони"
              >
                <Compass className={`w-3.5 h-3.5 ${portalMode === 'culture' ? 'text-white' : 'text-amber-600'}`} />
                <span>Мистерии (40)</span>
              </button>
            </div>
          </div>

          {/* Center: Always-Available Interactive Platform Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleStudyNavClick('home')}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                portalMode === 'study' && activeTab === 'home'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-blue-600" />
              <span>Начало</span>
            </button>

            <button
              onClick={() => handleStudyNavClick('catalog')}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                portalMode === 'study' && activeTab === 'catalog'
                  ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 text-blue-600" />
              <span>Уроци ({totalLessonsCount})</span>
            </button>

            <button
              onClick={() => handleStudyNavClick('simulator')}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                portalMode === 'study' && activeTab === 'simulator'
                  ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>100т. Симулатор</span>
            </button>

            <button
              onClick={() => handleStudyNavClick('oralexam')}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                portalMode === 'study' && activeTab === 'oralexam'
                  ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-indigo-600" />
              <span>Устен изпит</span>
            </button>

            {/* Interactive Mega-Dropdown for All 12 Specialized Labs */}
            <div className="relative" ref={labsDropdownRef}>
              <button
                onClick={() => setIsLabsDropdownOpen(!isLabsDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isLabActive || isLabsDropdownOpen
                    ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Лаборатории (12)</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLabsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLabsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[620px] p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                        🧪 Специализирани интерактивни лаборатории (МОН 8.–12. клас)
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Избери тренажор за директно упражнение, решаване на задачи или устно изпитване
                      </p>
                    </div>
                    <button
                      onClick={() => handleStudyNavClick('planner')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition-colors shrink-0"
                    >
                      📅 План за 6.00 →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-[65vh] overflow-y-auto pr-1">
                    {interactiveLabsList.map((lab) => {
                      const active = portalMode === 'study' && activeTab === lab.tab;
                      return (
                        <button
                          key={lab.tab}
                          onClick={() => handleStudyNavClick(lab.tab)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all border ${
                            active
                              ? 'bg-blue-50/90 border-blue-300 shadow-2xs'
                              : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/70'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            {lab.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-900 truncate">
                                {lab.label}
                              </span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${lab.accentBg}`}>
                                {lab.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {lab.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleCultureNavClick('mysteries')}
              className={` xl:hidden flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                portalMode === 'culture'
                  ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Мистерии (40)</span>
            </button>
          </nav>

          {/* Right Action Bar: Always functional across the entire platform */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Global Quick Search Button */}
            {onOpenQuickSearch && (
              <button
                onClick={onOpenQuickSearch}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/90 text-xs font-semibold transition-all cursor-pointer"
                title="Бързо търсене на урок или тема (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden md:inline">Търси урок</span>
                <kbd className="hidden xl:inline-block text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-500">
                  {totalLessonsCount}
                </kbd>
              </button>
            )}

            {/* Official MON Formula Sheets Button */}
            <button
              onClick={onOpenFormulaModal}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
              title="Официални свитъци и формули на МОН"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden 2xl:inline">Справочник МОН</span>
              <span className="2xl:hidden">Формули</span>
            </button>

            {/* SmartScan OCR Button */}
            <button
              onClick={onOpenScan}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shadow-2xs"
              title="Сканирай своя тетрадка с камера или качи PDF"
            >
              <Camera className="w-3.5 h-3.5 text-white" />
              <span className="hidden xl:inline">Сканирай OCR</span>
              <span className="xl:hidden">OCR</span>
            </button>

            {/* Direct Matura+ Synergy Pill -> https://maturaplus.eu */}
            <a
              href="https://maturaplus.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold text-xs transition-colors shadow-2xs"
              title="Специализирана платформа за НВО след 7. клас — maturaplus.eu"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold">7. клас?</span>
              <span className="text-emerald-800 hidden lg:inline">Към Matura+</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
            </a>

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

        {/* Mobile Dropdown Navigation Drawer (Full Platform Access on Every Screen) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-4 bg-white px-2 rounded-b-2xl shadow-xl max-h-[82vh] overflow-y-auto">
            
            {/* Matura+ Referral Bar in Mobile Drawer -> https://maturaplus.eu */}
            <a
              href="https://maturaplus.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-xs text-slate-900 shadow-2xs font-medium"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Готвиш се за <strong>7. клас (НВО)</strong>? Отвори <strong>maturaplus.eu</strong></span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-700 shrink-0" />
            </a>

            {/* Mobile Quick Portal Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => handleStudyNavClick(activeTab === 'home' ? 'summary' : activeTab)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  portalMode === 'study'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Академия ({totalLessonsCount})</span>
              </button>
              <button
                onClick={() => handleCultureNavClick('mysteries')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  portalMode === 'culture'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-slate-600'
                }`}
              >
                <Compass className={`w-4 h-4 ${portalMode === 'culture' ? 'text-white' : 'text-amber-600'}`} />
                <span>Мистерии (40)</span>
              </button>
            </div>

            {/* Section 1: High School Core Tools (8.–12. grade) */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
                Гимназиална академия & Лаборатории (8.–12. клас)
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

            {/* Section 2: Contextual History & Conspiracy Engine */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800/80 px-1 mb-2 flex items-center justify-between">
                <span>Обща култура, Мистерии & Конспирации</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                  40 Досиета
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {contextCultureNavItems.map((item) => (
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
              {onOpenQuickSearch && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenQuickSearch();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4 text-blue-600" />
                  <span>Бързо търсене из {totalLessonsCount}-те урока</span>
                </button>
              )}

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
                <span>Сканирай нова тетрадка / PDF (SmartScan OCR)</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </header>
  );
};
