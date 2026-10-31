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
  Layers,
  Flame
} from 'lucide-react';
import { errorBankService } from '../services/errorBankService';
import { BrandLogo } from './BrandLogo';
import { authService, getCachedGoogleProfile, getCloudSyncLiveStatus, AUTH_SYNC_EVENT, type GoogleUserProfile } from '../services/authService';
import { studyProgressService, computeUserXpAndLevel, LOCAL_DATA_MUTATED_EVENT } from '../services/studyProgressService';

const NavbarGoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.49 12.275c0-.85-.075-1.665-.215-2.45H12v4.635h6.445c-.28 1.495-1.125 2.765-2.395 3.615v3.005h3.875c2.265-2.085 3.565-5.16 3.565-8.805z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.955-1.075 7.94-2.91l-3.875-3.005c-1.075.72-2.45 1.145-4.065 1.145-3.125 0-5.775-2.11-6.72-4.945H1.275v3.1C3.25 21.305 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.285c-.24-.72-.375-1.49-.375-2.285s.135-1.565.375-2.285v-3.1H1.275C.465 8.23 0 10.065 0 12s.465 3.77 1.275 5.385l4.005-3.1z"
    />
    <path
      fill="#EA4335"
      d="M12 4.77c1.76 0 3.34.605 4.585 1.795l3.44-3.44C17.95 1.19 15.235 0 12 0 7.31 0 3.25 2.695 1.275 6.615l4.005 3.1C6.225 6.88 8.875 4.77 12 4.77z"
    />
  </svg>
);
import type { CultureSubTab } from './CultureHero';

export type AppNavTab =
  | 'home'
  | 'planner'
  | 'program'
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
  onOpenAuthModal?: () => void;
  totalLessonsCount?: number;
  /** 'app' = вътрешен екран със странично меню: без централни линкове, с бутон за менюто */
  variant?: 'site' | 'app';
  onOpenSidebar?: () => void;
  /** Името на текущия раздел — показва се вляво в режим 'app' */
  pageLabel?: string;
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
  onOpenAuthModal,
  totalLessonsCount = 108,
  variant = 'site',
  onOpenSidebar,
  pageLabel
}) => {
  const isApp = variant === 'app';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLabsDropdownOpen, setIsLabsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<GoogleUserProfile | null>(() => getCachedGoogleProfile());
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [navProgress, setNavProgress] = useState(() => studyProgressService.getProgress());
  const [syncLiveStatus, setSyncLiveStatus] = useState(() => getCloudSyncLiveStatus());

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges((profile) => {
      setUserProfile(profile);
      setAvatarLoadError(false);
      setNavProgress(studyProgressService.getProgress());
      setSyncLiveStatus(getCloudSyncLiveStatus());
    });
    const onLocalOrAuthChange = () => {
      setNavProgress(studyProgressService.getProgress());
      setSyncLiveStatus(getCloudSyncLiveStatus());
    };
    window.addEventListener(LOCAL_DATA_MUTATED_EVENT, onLocalOrAuthChange);
    window.addEventListener(AUTH_SYNC_EVENT, onLocalOrAuthChange);
    return () => {
      unsubscribe();
      window.removeEventListener(LOCAL_DATA_MUTATED_EVENT, onLocalOrAuthChange);
      window.removeEventListener(AUTH_SYNC_EVENT, onLocalOrAuthChange);
    };
  }, []);

  const isGoogleUser = Boolean(userProfile && !userProfile.isAnonymous);
  const userFirstName = userProfile?.fullName?.split(/\s+/)[0] || 'Профил';
  const navLevelInfo = computeUserXpAndLevel(navProgress);
  const navDailyStreak = navProgress.currentDailyStreak ?? 1;
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
      icon: <GraduationCap className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'oralexam',
      label: 'Устно изпитване пред дъската',
      desc: 'Гласов и писмен симулатор за 6.00 с AI рублика',
      badge: 'ТОП ЛАБ',
      icon: <Mic className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'sciencelab',
      label: 'Лаборатория Природни науки',
      desc: 'Биология (ДНК), Химия (Йони/pH) & Физика (Ом)',
      badge: 'STEM ДЗИ',
      icon: <FlaskConical className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'grammar',
      label: 'Езиков тренажор БЕЛ (Модул 1)',
      desc: 'Пълен/кратък член, бройна форма, запетаи и пароними',
      badge: 'БАН Норми',
      icon: <PenTool className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'moduletwo',
      label: 'Тропи, Пароними & Резюме (Модул 2)',
      desc: 'Фигури на речта, четене с разбиране и резюмиране',
      badge: 'Модул 2',
      icon: <Feather className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'literature',
      label: 'Литературен Канон (41. въпрос)',
      desc: 'Съпоставителни таблици, мотиви и тези за есе и ИС',
      badge: '30т. ДЗИ',
      icon: <BookMarked className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'mathlab',
      label: 'Математика & STEM Лаборатория',
      desc: 'Интерактивен решавач на уравнения, прогресии и геометрия',
      badge: 'ДЗИ & СТЕМ',
      icon: <Compass className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'atlas',
      label: 'Атлас История & География',
      desc: 'Исторически договори (681–1947) и икономически райони NUTS 2',
      badge: 'Карти МОН',
      icon: <MapPin className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'english',
      label: 'Английски език (CEFR B1.1 & B2)',
      desc: 'Use of English трансформации, времена и академично есе',
      badge: 'B1.1 / B2',
      icon: <Globe className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'civics',
      label: 'Конституция на РБ & Европейски съюз',
      desc: 'Разделение на властите, права на гражданите и институции',
      badge: '11.–12. кл',
      icon: <Scale className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'blitz',
      label: 'Скоростен Блиц Маратон (60 сек.)',
      desc: 'Бърза тренировка на термини, формули и дати с Combo x5',
      badge: 'Combo x5',
      icon: <Zap className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'calculator',
      label: 'МОН Калкулатор за оценки и бал',
      desc: 'Точно превръщане на точки (0–100) в оценка за ДЗИ и ДИППК',
      badge: 'Скала МОН',
      icon: <Calculator className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    },
    {
      tab: 'cases',
      label: 'Исторически и философски казуси',
      desc: 'Анализ на първични исторически извори и аргументативни есета',
      badge: 'Модул 3',
      icon: <Scale className="w-4 h-4 text-brand-sapphire" />,
      accentBg: 'bg-slate-50 border-slate-200 text-slate-600'
    }
  ];

  const highSchoolNavItems: { tab: AppNavTab; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    { tab: 'home', label: 'Начална страница', icon: <Home className="w-3.5 h-3.5 text-slate-500" /> },
    {
      tab: 'specialties',
      label: 'Училища & Специалности 8–12 кл.',
      icon: <GraduationCap className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          Всички предмети
        </span>
      )
    },
    {
      tab: 'planner',
      label: 'Моят План за 6.00',
      icon: <Calendar className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          Таймер & План
        </span>
      )
    },
    {
      tab: 'simulator',
      label: '100т. Симулатор',
      icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          МОН
        </span>
      )
    },
    {
      tab: 'calculator',
      label: 'МОН Калкулатор',
      icon: <Calculator className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          Оценка & бал
        </span>
      )
    },
    {
      tab: 'cases',
      label: 'Казуси за ДЗИ',
      icon: <Scale className="w-3.5 h-3.5 text-rose-600" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          11–12 кл
        </span>
      )
    },
    {
      tab: 'grammar',
      label: 'Тренажор БЕЛ',
      icon: <PenTool className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          Модул 1
        </span>
      )
    },
    {
      tab: 'moduletwo',
      label: 'Тропи, Пароними & Резюме',
      icon: <Feather className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          Модул 2
        </span>
      )
    },
    {
      tab: 'literature',
      label: 'Литературен Канон',
      icon: <BookMarked className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          41. въпрос
        </span>
      )
    },
    {
      tab: 'mathlab',
      label: 'Математика & STEM',
      icon: <Compass className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          ДЗИ & СТЕМ
        </span>
      )
    },
    {
      tab: 'sciencelab',
      label: 'Лаб Природни науки',
      icon: <FlaskConical className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          ДНК, Йони & Ом
        </span>
      )
    },
    {
      tab: 'oralexam',
      label: 'Устно изпитване',
      icon: <Mic className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          Пред дъската
        </span>
      )
    },
    {
      tab: 'atlas',
      label: 'Атлас История & География',
      icon: <MapPin className="w-3.5 h-3.5 text-amber-600" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          Карти & NUTS 2
        </span>
      )
    },
    {
      tab: 'english',
      label: 'Английски език (ДЗИ)',
      icon: <Globe className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          B1.1 & B2
        </span>
      )
    },
    {
      tab: 'civics',
      label: 'Конституция & ЕС',
      icon: <Scale className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          ГО & ДЗИ
        </span>
      )
    },
    {
      tab: 'blitz',
      label: 'Блиц за 60 сек.',
      icon: <Zap className="w-3.5 h-3.5 text-slate-500" />,
      badge: (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
          Combo x5
        </span>
      )
    },
    { tab: 'summary', label: 'Конспект', icon: <BookOpen className="w-3.5 h-3.5 text-slate-500" /> },
    { tab: 'audit', label: 'Одит 6.00', icon: <CheckSquare className="w-3.5 h-3.5 text-slate-500" /> },
    { tab: 'flashcards', label: 'Флаш карти', icon: <Zap className="w-3.5 h-3.5 text-slate-500" /> },
    { tab: 'quiz', label: 'Тест', icon: <GraduationCap className="w-3.5 h-3.5 text-slate-500" /> },
    {
      tab: 'errorbank',
      label: 'Банка с грешки',
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />,
      badge: unresolvedErrorCount > 0 ? (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold tabular-nums">
          {unresolvedErrorCount}
        </span>
      ) : null
    },
    { tab: 'generator', label: 'Група А & Б', icon: <Printer className="w-3.5 h-3.5 text-slate-500" /> },
    { tab: 'catalog', label: `Каталог (${totalLessonsCount} урока)`, icon: <BookMarked className="w-3.5 h-3.5 text-slate-500" /> }
  ];

  const contextCultureNavItems: { subTab: CultureSubTab; label: string; icon: React.ReactNode }[] = [
    { subTab: 'mysteries', label: 'Конспирации & Досиета (41)', icon: <Compass className="w-3.5 h-3.5 text-amber-600" /> },
    { subTab: 'mysticmap', label: 'Карта на мистичните зони (12)', icon: <MapPin className="w-3.5 h-3.5 text-slate-500" /> },
    { subTab: 'heritage', label: 'Принос & ЮНЕСКО (16)', icon: <Award className="w-3.5 h-3.5 text-slate-500" /> },
    { subTab: 'timeline', label: 'Хронология (681–1908)', icon: <Clock className="w-3.5 h-3.5 text-slate-500" /> },
    { subTab: 'cases', label: 'Отворени казуси (12)', icon: <Scale className="w-3.5 h-3.5 text-amber-700" /> },
    { subTab: 'wonders', label: 'Природни чудеса (18)', icon: <MapPin className="w-3.5 h-3.5 text-slate-500" /> },
    { subTab: 'trivia', label: 'Куиз за ерудити (38)', icon: <Sparkles className="w-3.5 h-3.5 text-slate-500" /> },
    { subTab: 'myths', label: 'Факт или Конспирация (24)', icon: <HelpCircle className="w-3.5 h-3.5 text-rose-600" /> },
    { subTab: 'wisdom', label: 'Златен фонд & Мъдрост (16)', icon: <Quote className="w-3.5 h-3.5 text-slate-500" /> }
  ];

  const isLabActive =
    portalMode === 'study' &&
    interactiveLabsList.some((lab) => lab.tab === activeTab);

  return (
    <header data-print-hide className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className={isApp ? 'px-4 sm:px-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        
        {/* Main Platform Command Row — every group uses shrink-0 so items never overlap or collide */}
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Left: Brand Identity + Segmented Portal Switcher */}
          <div className="flex items-center gap-2 shrink-0 min-w-0">
            {isApp && (
              <button
                type="button"
                onClick={onOpenSidebar}
                className="lg:hidden -ml-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors"
                aria-label="Отвори менюто"
                aria-controls="app-sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <a
              href="/"
              aria-label="StudyBG — начална страница"
              className={`items-center shrink-0 rounded-lg ${isApp ? 'flex lg:hidden' : 'flex'}`}
              onClick={(e) => {
                e.preventDefault();
                handleStudyNavClick('home');
              }}
            >
              <BrandLogo />
            </a>
            {isApp && pageLabel && (
              <p className="hidden lg:block truncate text-sm text-slate-500">
                Учебна академия <span className="mx-1 text-slate-300">/</span>
                <span className="font-semibold text-slate-900">{pageLabel}</span>
              </p>
            )}

            {/* Segmented Portal Mode Switcher (Study Academy vs Culture & Mysteries) */}
            <div className={`${isApp ? 'hidden' : 'hidden xl:flex'} items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200/80 shrink-0`}>
              <button
                onClick={() => handleStudyNavClick(activeTab === 'home' ? 'summary' : activeTab)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  portalMode === 'study'
                    ? 'bg-white text-brand-sapphire shadow-xs'
                    : 'text-slate-600 hover:text-brand-sapphire'
                }`}
                title="Учебна академия по МОН (5.–12. клас)"
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>Академия</span>
              </button>
              <button
                onClick={() => handleCultureNavClick('mysteries')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  portalMode === 'culture'
                    ? 'bg-white text-amber-800 shadow-xs'
                    : 'text-slate-600 hover:text-amber-800'
                }`}
                title="Обща култура, конспиративни досиета и мистични зони"
              >
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span>Мистерии</span>
              </button>
            </div>
          </div>

          {/* Center: Core Interactive Platform Navigation (shrink-0 prevents flex compression overlap) */}
          <nav className={`${isApp ? 'hidden' : 'hidden lg:flex'} items-center gap-0.5 shrink-0`}>
            <button
              onClick={() => handleStudyNavClick('home')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                portalMode === 'study' && activeTab === 'home'
                  ? 'bg-brand-sapphire-soft text-brand-sapphire'
                  : 'text-slate-600 hover:text-brand-sapphire hover:bg-slate-50'
              }`}
            >
              <Home className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>Начало</span>
            </button>

            <button
              onClick={() => handleStudyNavClick('catalog')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                portalMode === 'study' && activeTab === 'catalog'
                  ? 'bg-brand-sapphire-soft text-brand-sapphire'
                  : 'text-slate-600 hover:text-brand-sapphire hover:bg-slate-50'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>Уроци ({totalLessonsCount})</span>
            </button>

            <button
              onClick={() => handleStudyNavClick('simulator')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                portalMode === 'study' && activeTab === 'simulator'
                  ? 'bg-brand-sapphire-soft text-brand-sapphire'
                  : 'text-slate-600 hover:text-brand-sapphire hover:bg-slate-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>100т. Симулатор</span>
            </button>

            {/* Interactive Mega-Dropdown for All 12 Specialized Labs (including Oral Exam & Formulas) */}
            <div className="relative" ref={labsDropdownRef}>
              <button
                onClick={() => setIsLabsDropdownOpen(!isLabsDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isLabActive || isLabsDropdownOpen
                    ? 'bg-brand-sapphire-soft text-brand-sapphire'
                    : 'text-slate-600 hover:text-brand-sapphire hover:bg-slate-50'
                }`}
              >
                <Layers className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>Лаборатории (12)</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform shrink-0 ${isLabsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLabsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[min(640px,calc(100vw-2rem))] p-4 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-900/10 z-50">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                    <div>
                      <span className="text-sm font-bold text-slate-900">
                        Специализирани лаборатории (МОН 5.–12. клас)
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Избери тренажор за директно упражнение, решаване на задачи или устно изпитване
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setIsLabsDropdownOpen(false);
                          onOpenFormulaModal();
                        }}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Формули МОН
                      </button>
                      <button
                        onClick={() => handleStudyNavClick('planner')}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        План за 6.00 →
                      </button>
                      <a
                        href="https://maturaplus.eu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-800 text-[11px] font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        <span>7. клас? Matura+</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
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
                              ? 'bg-brand-sapphire-soft border-blue-200'
                              : 'bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
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
              className={`xl:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                portalMode === 'culture'
                  ? 'bg-amber-50 text-amber-800'
                  : 'text-slate-600 hover:text-brand-sapphire hover:bg-slate-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>Мистерии</span>
            </button>
          </nav>

          {/* Right Action Bar: Compact Tools + Prominent Google Account Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Global Quick Search Button */}
            {onOpenQuickSearch && (
              <button
                onClick={onOpenQuickSearch}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                title="Бързо търсене на урок или тема (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className={isApp ? 'hidden md:inline' : 'hidden xl:inline'}>Търси урок</span>
                <kbd className="hidden xl:inline rounded border border-slate-200 bg-slate-50 px-1 text-[10px] font-medium text-slate-500">Ctrl K</kbd>
              </button>
            )}

            {/* SmartScan OCR Button */}
            <button
              onClick={onOpenScan}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
              title="Сканирай своя тетрадка с камера или качи PDF"
            >
              <Camera className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Сканирай</span>
            </button>

            {isApp && (
              <div className="hidden md:flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200/80 shrink-0">
                <span className="px-2.5 py-1 rounded-md bg-white text-brand-sapphire shadow-xs text-xs font-semibold">Академия</span>
                <button
                  type="button"
                  onClick={() => handleCultureNavClick('mysteries')}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold text-slate-600 hover:text-amber-800 transition-colors cursor-pointer"
                  title="Обща култура и мистерии"
                >
                  Мистерии
                </button>
              </div>
            )}

            {/* PROMINENT Google Account / Cloud Profile Button */}
            {onOpenAuthModal && (
              <button
                type="button"
                onClick={onOpenAuthModal}
                aria-label={isGoogleUser ? `Профил на ${userProfile?.fullName}` : 'Вход с Google акаунт'}
                title={
                  isGoogleUser
                    ? `${userProfile?.fullName} • Облачната синхронизация е активна (GDPR защитен профил)`
                    : 'Вход с Google акаунт за автоматична облачна синхронизация, XP нива и значки'
                }
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shadow-sm ${
                  isGoogleUser
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200'
                    : 'bg-brand-sapphire hover:bg-brand-sapphire-light text-white border border-brand-sapphire'
                }`}
              >
                {isGoogleUser && userProfile?.avatarUrl && !avatarLoadError ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt=""
                    width={22}
                    height={22}
                    referrerPolicy="no-referrer"
                    onError={() => setAvatarLoadError(true)}
                    className="w-5.5 h-5.5 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <NavbarGoogleIcon className="w-3.5 h-3.5" />
                  </span>
                )}
                <span className="max-w-[110px] truncate">
                  {isGoogleUser ? (
                    userFirstName
                  ) : (
                    <>
                      <span className="sm:hidden">Вход</span>
                      <span className="hidden sm:inline">Вход с Google</span>
                    </>
                  )}
                </span>
                {isGoogleUser && (
                  <span className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-semibold tabular-nums bg-amber-50 text-amber-800">
                    <Flame className="w-3 h-3 shrink-0 text-amber-600" aria-hidden="true" />
                    {navDailyStreak}д • Н.{navLevelInfo.level}
                  </span>
                )}
                {isGoogleUser && (
                  <span
                    aria-hidden="true"
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      syncLiveStatus === 'syncing'
                        ? 'bg-amber-500 animate-ping'
                        : 'bg-emerald-500'
                    }`}
                  />
                )}
              </button>
            )}

            {/* Mobile Navigation Drawer Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isApp ? 'hidden' : 'lg:hidden inline-flex'} min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors shrink-0`}
              aria-label="Отвори навигационното меню"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation Drawer (Full Platform Access on Every Screen) */}
        {!isApp && isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-4 bg-white px-1 max-h-[82vh] overflow-y-auto">
            
            {/* Google Account Banner in Mobile Drawer */}
            {onOpenAuthModal && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 font-semibold text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {isGoogleUser && userProfile?.avatarUrl && !avatarLoadError ? (
                    <img
                      src={userProfile.avatarUrl}
                      alt=""
                      width={28}
                      height={28}
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarLoadError(true)}
                      className="w-7 h-7 rounded-full object-cover border border-blue-300 shrink-0"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      <NavbarGoogleIcon className="w-4 h-4" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">
                      {isGoogleUser
                        ? `${userProfile?.fullName} (Google Профил)`
                        : 'Вход с Google Акаунт'}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {isGoogleUser
                        ? `${userProfile?.email || 'Облачен профил'} • Ниво ${navLevelInfo.level} (${navLevelInfo.totalXp} XP) • серия ${navDailyStreak} дни`
                        : `Ниво ${navLevelInfo.level} (${navLevelInfo.totalXp} XP) • серия ${navDailyStreak} дни — запази в облака`}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-brand-sapphire text-white text-[11px] font-bold shrink-0">
                  {isGoogleUser ? 'Профил' : 'Влез'}
                </span>
              </button>
            )}

            {/* Matura+ Referral Bar in Mobile Drawer -> https://maturaplus.eu */}
            <a
              href="https://maturaplus.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-brand-emerald-soft border border-emerald-200 text-xs text-slate-900 font-medium"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Готвиш се за <strong>7. клас (НВО)</strong>? Отвори <strong>maturaplus.eu</strong></span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-700 shrink-0" />
            </a>

            {/* Mobile Quick Portal Switcher */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200/80">
              <button
                onClick={() => handleStudyNavClick(activeTab === 'home' ? 'summary' : activeTab)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-semibold transition-colors ${
                  portalMode === 'study'
                    ? 'bg-white text-brand-sapphire shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Академия ({totalLessonsCount})</span>
              </button>
              <button
                onClick={() => handleCultureNavClick('mysteries')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-semibold transition-colors ${
                  portalMode === 'culture'
                    ? 'bg-white text-amber-800 shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Мистерии (41)</span>
              </button>
            </div>

            {/* Section 1: High School Core Tools (5.–12. grade) */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
                Учебна академия & Лаборатории (5.–12. клас)
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {highSchoolNavItems.map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleStudyNavClick(item.tab)}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                      portalMode === 'study' && activeTab === item.tab
                        ? 'bg-brand-sapphire-soft text-brand-sapphire font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
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
                  41 Досиета
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {contextCultureNavItems.map((item) => (
                  <button
                    key={item.subTab}
                    onClick={() => handleCultureNavClick(item.subTab)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                      portalMode === 'culture' && activeCultureTab === item.subTab
                        ? 'bg-amber-50 text-amber-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
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
                  className="w-full py-2.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Бързо търсене из {totalLessonsCount}-те урока</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenFormulaModal();
                }}
                className="w-full py-2.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Официални формули и свитъци МОН</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenScan();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-brand-sapphire hover:bg-brand-sapphire-light text-white text-xs font-bold flex items-center justify-center gap-2"
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
