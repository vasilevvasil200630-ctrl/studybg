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
  totalLessonsCount = 108
}) => {
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
      icon: <GraduationCap className="w-4 h-4 text-blue-600" />,
      accentBg: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      tab: 'oralexam',
      label: 'Устно изпитване пред дъската',
      desc: 'Гласов и писмен симулатор за 6.00 с AI рублика',
      badge: 'ТОП ЛАБ',
      icon: <Mic className="w-4 h-4 text-violet-600" />,
      accentBg: 'bg-violet-50 border-violet-200 text-violet-800'
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
      icon: <Feather className="w-4 h-4 text-indigo-600" />,
      accentBg: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    },
    {
      tab: 'literature',
      label: 'Литературен Канон (41. въпрос)',
      desc: 'Съпоставителни таблици, мотиви и тези за есе и ИС',
      badge: '30т. ДЗИ',
      icon: <BookMarked className="w-4 h-4 text-fuchsia-600" />,
      accentBg: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800'
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
      icon: <Zap className="w-4 h-4 text-orange-600" />,
      accentBg: 'bg-orange-50 border-orange-200 text-orange-800'
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
    { tab: 'home', label: 'Начална страница', icon: <Home className="w-3.5 h-3.5 text-sky-600" /> },
    {
      tab: 'specialties',
      label: 'Училища & Специалности 8–12 кл.',
      icon: <GraduationCap className="w-3.5 h-3.5 text-blue-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
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
      icon: <Calculator className="w-3.5 h-3.5 text-teal-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-bold border border-teal-200">
          Оценка & бал
        </span>
      )
    },
    {
      tab: 'cases',
      label: 'Казуси за ДЗИ',
      icon: <Scale className="w-3.5 h-3.5 text-rose-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-200">
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
      icon: <Feather className="w-3.5 h-3.5 text-indigo-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">
          Модул 2
        </span>
      )
    },
    {
      tab: 'literature',
      label: 'Литературен Канон',
      icon: <BookMarked className="w-3.5 h-3.5 text-fuchsia-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-fuchsia-100 text-fuchsia-800 font-bold border border-fuchsia-200">
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
      icon: <Mic className="w-3.5 h-3.5 text-violet-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-800 font-bold border border-violet-200">
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
      icon: <Zap className="w-3.5 h-3.5 text-orange-600" />,
      badge: (
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 font-bold border border-orange-200">
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
    { tab: 'generator', label: 'Група А & Б', icon: <Printer className="w-3.5 h-3.5 text-violet-600" /> },
    { tab: 'catalog', label: `Каталог (${totalLessonsCount} урока)`, icon: <BookMarked className="w-3.5 h-3.5 text-emerald-600" /> }
  ];

  const contextCultureNavItems: { subTab: CultureSubTab; label: string; icon: React.ReactNode }[] = [
    { subTab: 'mysteries', label: 'Конспирации & Досиета (41)', icon: <Compass className="w-3.5 h-3.5 text-amber-600" /> },
    { subTab: 'mysticmap', label: 'Карта на мистичните зони (12)', icon: <MapPin className="w-3.5 h-3.5 text-violet-600" /> },
    { subTab: 'heritage', label: 'Принос & ЮНЕСКО (16)', icon: <Award className="w-3.5 h-3.5 text-orange-600" /> },
    { subTab: 'timeline', label: 'Хронология (681–1908)', icon: <Clock className="w-3.5 h-3.5 text-emerald-600" /> },
    { subTab: 'cases', label: 'Отворени казуси (12)', icon: <Scale className="w-3.5 h-3.5 text-amber-700" /> },
    { subTab: 'wonders', label: 'Природни чудеса (18)', icon: <MapPin className="w-3.5 h-3.5 text-teal-600" /> },
    { subTab: 'trivia', label: 'Куиз за ерудити (38)', icon: <Sparkles className="w-3.5 h-3.5 text-sky-600" /> },
    { subTab: 'myths', label: 'Факт или Конспирация (24)', icon: <HelpCircle className="w-3.5 h-3.5 text-rose-600" /> },
    { subTab: 'wisdom', label: 'Златен фонд & Мъдрост (16)', icon: <Quote className="w-3.5 h-3.5 text-blue-600" /> }
  ];

  const isLabActive =
    portalMode === 'study' &&
    interactiveLabsList.some((lab) => lab.tab === activeTab);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/95 border-b-2 border-blue-100/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        
        {/* Main Platform Command Row — every group uses shrink-0 so items never overlap or collide */}
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Left: Brand Identity + Segmented Portal Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/"
              className="flex items-center gap-2 cursor-pointer group shrink-0"
              onClick={(e) => {
                e.preventDefault();
                handleStudyNavClick('home');
              }}
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white border-b-2 border-indigo-800 shadow-xs group-hover:scale-105 transition-all shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  Study<span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">BG</span>
                </span>
                <span className="text-[10px] font-extrabold tracking-wide uppercase px-1.5 py-0.5 rounded-md bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-300 whitespace-nowrap">
                  5.–12. кл.
                </span>
              </div>
            </a>

            {/* Segmented Portal Mode Switcher (Study Academy vs Culture & Mysteries) */}
            <div className="hidden xl:flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200/90 shrink-0">
              <button
                onClick={() => handleStudyNavClick(activeTab === 'home' ? 'summary' : activeTab)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  portalMode === 'study'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-blue-700'
                }`}
                title="Учебна академия по МОН (5.–12. клас)"
              >
                <GraduationCap className={`w-3.5 h-3.5 shrink-0 ${portalMode === 'study' ? 'text-white' : 'text-blue-600'}`} />
                <span>Академия</span>
              </button>
              <button
                onClick={() => handleCultureNavClick('mysteries')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  portalMode === 'culture'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-amber-800'
                }`}
                title="Обща култура, конспиративни досиета и мистични зони"
              >
                <Compass className={`w-3.5 h-3.5 shrink-0 ${portalMode === 'culture' ? 'text-white' : 'text-amber-600'}`} />
                <span>Мистерии</span>
              </button>
            </div>
          </div>

          {/* Center: Core Interactive Platform Navigation (shrink-0 prevents flex compression overlap) */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            <button
              onClick={() => handleStudyNavClick('home')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                portalMode === 'study' && activeTab === 'home'
                  ? 'bg-sky-50 text-sky-900 border border-sky-200 shadow-2xs'
                  : 'text-slate-700 hover:text-sky-800 hover:bg-sky-50/60'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Начало</span>
            </button>

            <button
              onClick={() => handleStudyNavClick('catalog')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                portalMode === 'study' && activeTab === 'catalog'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-2xs'
                  : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/60'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Уроци ({totalLessonsCount})</span>
            </button>

            <button
              onClick={() => handleStudyNavClick('simulator')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                portalMode === 'study' && activeTab === 'simulator'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs'
                  : 'text-slate-700 hover:text-amber-900 hover:bg-amber-50/60'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>100т. Симулатор</span>
            </button>

            {/* Interactive Mega-Dropdown for All 12 Specialized Labs (including Oral Exam & Formulas) */}
            <div className="relative" ref={labsDropdownRef}>
              <button
                onClick={() => setIsLabsDropdownOpen(!isLabsDropdownOpen)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isLabActive || isLabsDropdownOpen
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 shadow-2xs'
                    : 'text-slate-700 hover:text-indigo-800 hover:bg-indigo-50/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Лаборатории (12)</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform shrink-0 ${isLabsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLabsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[min(640px,calc(100vw-2rem))] p-4 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xl z-50">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">
                        🧪 Специализирани интерактивни лаборатории (МОН 5.–12. клас)
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
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        📐 Формули МОН
                      </button>
                      <button
                        onClick={() => handleStudyNavClick('planner')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        📅 План за 6.00 →
                      </button>
                      <a
                        href="https://maturaplus.eu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-[11px] font-bold transition-colors inline-flex items-center gap-1 shadow-2xs"
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
                              ? 'bg-blue-50/90 border-blue-300 shadow-2xs'
                              : 'bg-slate-50/70 hover:bg-blue-50/40 border-slate-200/80 hover:border-blue-200'
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
              className={`xl:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                portalMode === 'culture'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200'
                  : 'text-slate-700 hover:text-amber-800 hover:bg-amber-50/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Мистерии</span>
            </button>
          </nav>

          {/* Right Action Bar: Compact Tools + Prominent Google Account Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Global Quick Search Button */}
            {onOpenQuickSearch && (
              <button
                onClick={onOpenQuickSearch}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-50/80 hover:bg-sky-100/90 text-sky-950 border border-sky-200 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                title="Бързо търсене на урок или тема (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span className="hidden xl:inline">Търси</span>
              </button>
            )}

            {/* SmartScan OCR Button */}
            <button
              onClick={onOpenScan}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-extrabold border-b-2 border-teal-800 transition-all whitespace-nowrap cursor-pointer shadow-xs"
              title="Сканирай своя тетрадка с камера или качи PDF"
            >
              <Camera className="w-3.5 h-3.5 text-white shrink-0" />
              <span>OCR</span>
            </button>

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
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                  isGoogleUser
                    ? 'bg-gradient-to-r from-blue-50 via-white to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-950 border-2 border-blue-400'
                    : 'bg-gradient-to-r from-white via-blue-50/40 to-indigo-50/40 hover:from-blue-50 hover:to-indigo-50 text-slate-900 border-2 border-blue-600 hover:border-indigo-600 ring-2 ring-blue-500/10'
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
                    className="w-5.5 h-5.5 rounded-full object-cover border border-blue-400 shrink-0"
                  />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <NavbarGoogleIcon className="w-3.5 h-3.5" />
                  </span>
                )}
                <span className="max-w-[110px] truncate">
                  {isGoogleUser ? userFirstName : 'Вход с Google'}
                </span>
                <span className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-100 to-orange-100 text-orange-950 font-mono text-[10px] font-extrabold border border-orange-300">
                  <Flame className="w-3 h-3 text-orange-600 shrink-0" aria-hidden="true" />
                  {navDailyStreak}д • Н.{navLevelInfo.level}
                </span>
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
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors shrink-0"
              aria-label="Отвори навигационното меню"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation Drawer (Full Platform Access on Every Screen) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-4 bg-white px-2 rounded-b-2xl shadow-xl max-h-[82vh] overflow-y-auto">
            
            {/* Google Account Banner in Mobile Drawer */}
            {onOpenAuthModal && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 border-2 border-blue-300 text-xs text-slate-900 shadow-2xs font-semibold text-left"
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
                        ? `${userProfile?.email || 'Облачен профил'} • Ниво ${navLevelInfo.level} (${navLevelInfo.totalXp} XP) • 🔥 ${navDailyStreak}д`
                        : `Ниво ${navLevelInfo.level} (${navLevelInfo.totalXp} XP) • 🔥 ${navDailyStreak}д Streak — запази в облака`}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold shrink-0">
                  {isGoogleUser ? 'Профил' : 'Влез'}
                </span>
              </button>
            )}

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
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${portalMode === 'study' ? 'text-white' : 'text-blue-600'}`} />
                <span>Академия ({totalLessonsCount})</span>
              </button>
              <button
                onClick={() => handleCultureNavClick('mysteries')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  portalMode === 'culture'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xs'
                    : 'text-slate-600'
                }`}
              >
                <Compass className={`w-4 h-4 ${portalMode === 'culture' ? 'text-white' : 'text-amber-600'}`} />
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
                  className="w-full py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 text-xs font-bold border border-sky-200 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4 text-sky-600" />
                  <span>Бързо търсене из {totalLessonsCount}-те урока</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenFormulaModal();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold border border-indigo-200 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Официални формули и свитъци МОН</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenScan();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2"
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
