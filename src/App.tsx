import { useState, useEffect, useCallback, useRef, useTransition, lazy, Suspense } from 'react';
import { Navbar, type AppNavTab } from './components/Navbar';
import { CultureHero, type CultureSubTab } from './components/CultureHero';
import { Footer } from './components/Footer';
import { StudySidebar } from './components/StudySidebar';
import { CultureSidebar } from './components/CultureSidebar';
import { NewsletterSection } from './components/NewsletterSection';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import type { LegalPolicyTab } from './components/LegalPoliciesModal';
import { MaturaPlusBridgeBanner } from './components/MaturaPlusBridgeBanner';
import { ChunkErrorBoundary } from './components/ChunkErrorBoundary';
import { parseLocation, pushRoute, routeToPath, syncCanonicalUrl } from './lib/routing';

import { HomeLandingView } from './components/HomeLandingView';

// Code-split heavy interactive modules for optimal bundle size and instant initial load
const SummaryView = lazy(() => import('./components/SummaryView').then(m => ({ default: m.SummaryView })));
const LegalPoliciesModal = lazy(() => import('./components/LegalPoliciesModal').then(m => ({ default: m.LegalPoliciesModal })));
const CultureHubView = lazy(() => import('./components/CultureHubView').then(m => ({ default: m.CultureHubView })));
const ExamSimulatorView = lazy(() => import('./components/ExamSimulatorView').then(m => ({ default: m.ExamSimulatorView })));
const ErrorBankView = lazy(() => import('./components/ErrorBankView').then(m => ({ default: m.ErrorBankView })));
const ExamTestPaperGenerator = lazy(() => import('./components/ExamTestPaperGenerator').then(m => ({ default: m.ExamTestPaperGenerator })));
const NotebookAuditor = lazy(() => import('./components/NotebookAuditor').then(m => ({ default: m.NotebookAuditor })));
const FlashcardsView = lazy(() => import('./components/FlashcardsView').then(m => ({ default: m.FlashcardsView })));
const QuizView = lazy(() => import('./components/QuizView').then(m => ({ default: m.QuizView })));
const SubjectCatalog = lazy(() => import('./components/SubjectCatalog').then(m => ({ default: m.SubjectCatalog })));
const SmartScan = lazy(() => import('./components/SmartScan').then(m => ({ default: m.SmartScan })));
const QuickLessonSwitcherModal = lazy(() => import('./components/QuickLessonSwitcherModal').then(m => ({ default: m.QuickLessonSwitcherModal })));
const MonFormulaSheetsModal = lazy(() => import('./components/MonFormulaSheetsModal').then(m => ({ default: m.MonFormulaSheetsModal })));
const HistoricalCasesView = lazy(() => import('./components/HistoricalCasesView').then(m => ({ default: m.HistoricalCasesView })));
const MonGradeCalculatorView = lazy(() => import('./components/MonGradeCalculatorView').then(m => ({ default: m.MonGradeCalculatorView })));
const GrammarTrainerLab = lazy(() => import('./components/GrammarTrainerLab').then(m => ({ default: m.GrammarTrainerLab })));
const LiteratureCanonView = lazy(() => import('./components/LiteratureCanonView').then(m => ({ default: m.LiteratureCanonView })));
const StudyPlannerDashboard = lazy(() => import('./components/StudyPlannerDashboard').then(m => ({ default: m.StudyPlannerDashboard })));
const ModuleTwoBelLab = lazy(() => import('./components/ModuleTwoBelLab').then(m => ({ default: m.ModuleTwoBelLab })));
const MathStemLab = lazy(() => import('./components/MathStemLab').then(m => ({ default: m.MathStemLab })));
const HistoryGeoAtlasLab = lazy(() => import('./components/HistoryGeoAtlasLab').then(m => ({ default: m.HistoryGeoAtlasLab })));
const EnglishDziLab = lazy(() => import('./components/EnglishDziLab').then(m => ({ default: m.EnglishDziLab })));
const CivicsEuLab = lazy(() => import('./components/CivicsEuLab').then(m => ({ default: m.CivicsEuLab })));
const SpeedBlitzLab = lazy(() => import('./components/SpeedBlitzLab').then(m => ({ default: m.SpeedBlitzLab })));
const ScienceDziLab = lazy(() => import('./components/ScienceDziLab').then(m => ({ default: m.ScienceDziLab })));
const OralExamSimulatorLab = lazy(() => import('./components/OralExamSimulatorLab').then(m => ({ default: m.OralExamSimulatorLab })));
const SchoolsSpecialtiesHub = lazy(() => import('./components/SchoolsSpecialtiesHub').then(m => ({ default: m.SchoolsSpecialtiesHub })));
import { errorBankService } from './services/errorBankService';

import {
  CURRICULUM_LESSONS,
  TOTAL_CURRICULUM_LESSONS_COUNT,
  loadFullCurriculumLessons
} from './data/curriculumDatabase';
import type { LessonData, QuizQuestion } from './types';
import {
  Camera,
  BookOpen,
  Zap,
  ChevronRight,
  CheckSquare,
  GraduationCap,
  AlertCircle,
  Clock,
  Printer,
  Search,
  Home,
  BookMarked,
  Scale,
  Calculator,
  PenTool,
  Calendar,
  Feather,
  Compass,
  MapPin,
  Globe,
  FlaskConical,
  Mic
} from 'lucide-react';
import './App.css';

const STUDY_TABS: AppNavTab[] = [
  'home', 'specialties', 'planner', 'scan', 'audit', 'summary', 'cases', 'flashcards', 'quiz',
  'simulator', 'errorbank', 'generator', 'catalog', 'calculator',
  'grammar', 'moduletwo', 'literature', 'mathlab', 'sciencelab', 'oralexam', 'atlas', 'english', 'civics', 'blitz'
];

// Изгледи, които показват или търсят във всички уроци
const FULL_CURRICULUM_TABS: ReadonlySet<AppNavTab> = new Set<AppNavTab>([
  'catalog', 'quiz', 'simulator', 'generator', 'blitz', 'specialties', 'errorbank', 'oralexam', 'planner', 'scan'
]);

function prefetchStudyTabChunk(tab: AppNavTab): void {
  switch (tab) {
    case 'specialties': void import('./components/SchoolsSpecialtiesHub'); break;
    case 'planner': void import('./components/StudyPlannerDashboard'); break;
    case 'summary': void import('./components/SummaryView'); break;
    case 'oralexam': void import('./components/OralExamSimulatorLab'); break;
    case 'simulator': void import('./components/ExamSimulatorView'); break;
    case 'sciencelab': void import('./components/ScienceDziLab'); break;
    case 'mathlab': void import('./components/MathStemLab'); break;
    case 'grammar': void import('./components/GrammarTrainerLab'); break;
    case 'moduletwo': void import('./components/ModuleTwoBelLab'); break;
    case 'literature': void import('./components/LiteratureCanonView'); break;
    case 'english': void import('./components/EnglishDziLab'); break;
    case 'civics': void import('./components/CivicsEuLab'); break;
    case 'atlas': void import('./components/HistoryGeoAtlasLab'); break;
    case 'blitz': void import('./components/SpeedBlitzLab'); break;
    case 'generator': void import('./components/ExamTestPaperGenerator'); break;
    case 'calculator': void import('./components/MonGradeCalculatorView'); break;
    case 'catalog': void import('./components/SubjectCatalog'); break;
    case 'quiz': void import('./components/QuizView'); break;
    case 'flashcards': void import('./components/FlashcardsView'); break;
    case 'audit': void import('./components/NotebookAuditor'); break;
    case 'cases': void import('./components/HistoricalCasesView'); break;
    case 'errorbank': void import('./components/ErrorBankView'); break;
    case 'scan': void import('./components/SmartScan'); break;
    default: break;
  }
}

const ViewLoadingSkeleton = () => (
  <div className="p-8 rounded-2xl bg-white border border-slate-200 animate-pulse flex items-center justify-center min-h-[300px] shadow-xs">
    <div className="flex items-center gap-3 text-slate-500 text-xs sm:text-sm font-medium">
      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <span>Зареждане на модула...</span>
    </div>
  </div>
);

export function App() {
  // Non-blocking transition state for smooth INP (Interaction to Next Paint)
  const [isPendingTab, startTabTransition] = useTransition();

  // Top-level portal partition: 'study' (Academic Academy & OCR) vs 'culture' (General Knowledge & Mysteries)
  // Първоначалният изглед идва от адреса още при първия рендер — без „скок“ от началната страница (CLS)
  const [initialRoute] = useState(() =>
    typeof window === 'undefined' ? null : parseLocation(window.location.pathname, window.location.hash, STUDY_TABS).route
  );
  const [portalMode, setPortalMode] = useState<'study' | 'culture'>(initialRoute?.portal ?? 'study');
  const [cultureSubTab, setCultureSubTab] = useState<CultureSubTab>(
    initialRoute?.portal === 'culture' ? initialRoute.subTab : 'mysteries'
  );

  const [lessons, setLessons] = useState<LessonData[]>(CURRICULUM_LESSONS);
  const [currentLesson, setCurrentLesson] = useState<LessonData>(
    () =>
      (initialRoute?.portal === 'study' && initialRoute.lessonId
        ? CURRICULUM_LESSONS.find((l) => l.id === initialRoute.lessonId)
        : undefined) ?? CURRICULUM_LESSONS[0]
  );
  const totalLessonsDisplayCount = Math.max(lessons.length, TOTAL_CURRICULUM_LESSONS_COUNT);

  const [activeTab, setActiveTab] = useState<AppNavTab>(() => {
    if (initialRoute?.portal !== 'study') return 'home';
    if (!initialRoute.lessonId) return initialRoute.tab;
    // /lesson/<id> от базовия пакет се отваря веднага; иначе каталогът го дозарежда
    return CURRICULUM_LESSONS.some((l) => l.id === initialRoute.lessonId) ? 'summary' : 'catalog';
  });
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [isQuickLessonModalOpen, setIsQuickLessonModalOpen] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<QuizQuestion[] | null>(null);

  const curriculumHydratedRef = useRef(false);
  // Търсачката на началната страница иска пълния каталог едва при фокус
  const [fullCurriculumRequested, setFullCurriculumRequested] = useState(false);
  const requestFullCurriculum = useCallback(() => setFullCurriculumRequested(true), []);

  // Пълният каталог (~2 MB) се сваля САМО когато е реално нужен — не при всяко отваряне на началната
  const needsFullCurriculum =
    (portalMode === 'study' && FULL_CURRICULUM_TABS.has(activeTab)) ||
    isQuickLessonModalOpen ||
    isScanModalOpen ||
    fullCurriculumRequested;

  useEffect(() => {
    if (curriculumHydratedRef.current || !needsFullCurriculum) return;
    let isMounted = true;

    // ~1.5 MB данни: сваляме ги, когато браузърът е свободен, за да не се борят с първия рендер (LCP)
    const load = () => loadFullCurriculumLessons()
      .then((fullLessons) => {
        if (!isMounted) return;
        curriculumHydratedRef.current = true;
        startTabTransition(() => {
          setLessons((prev) => {
            const fullIds = new Set(fullLessons.map((fl) => fl.id));
            const customScans = prev.filter((l) => !fullIds.has(l.id));
            return [...customScans, ...fullLessons];
          });
        });
      })
      .catch((err: unknown) => {
        // Мрежова грешка/остарял chunk — следващото поискване опитва отново
        console.warn('Full curriculum load failed:', err);
      });

    const idle = typeof window.requestIdleCallback === 'function'
      ? window.requestIdleCallback(() => void load(), { timeout: 2000 })
      : null;
    const timer = idle === null ? window.setTimeout(() => void load(), 300) : null;

    return () => {
      isMounted = false;
      if (idle !== null) window.cancelIdleCallback(idle);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, [needsFullCurriculum]);

  // Dynamic document.title synchronization for SEO, accessibility, and multi-tab clarity
  useEffect(() => {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    // Каноничният URL следва реалния път, иначе всички страници се броят за дубликати на „/“
    syncCanonicalUrl(window.location.pathname);
    if (portalMode === 'culture') {
      document.title = 'Обща култура, 40 Секретни досиета & Мистична карта | StudyBG';
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'page_view', {
          page_title: document.title,
          page_path: window.location.pathname,
        });
      }
      return;
    }
    const tabTitleMap: Partial<Record<AppNavTab, string>> = {
      home: 'StudyBG — Национална дигитална академия за НВО, ДЗИ и Трета СПК (8.–12. клас)',
      specialties: 'Училища, 64+ Специалности, ДИППК & Калкулатор за Бал (7. и 12. кл.) | StudyBG',
      planner: 'Моят План за Отличен 6.00, Стратегия & Седмичен График | StudyBG',
      oralexam: 'Гласов Симулатор: Устен изпит, Защита на Дипломен проект (ДИППК) & ВУЗ | StudyBG',
      sciencelab: 'STEM Лаборатория: Биология (ДНК/PCR), Химия (pH/ОХ) и Физика (Карно/3Ф) | StudyBG',
      mathlab: 'Математика & STEM Лаборатория за НВО 10 и ДЗИ 12 | StudyBG',
      moduletwo: 'Модул 2 БЕЛ & Архитект за Задача 41 (Есе и ИС — 30 т.) | StudyBG',
      grammar: 'Тренажор по Граматика, Правопис и Пунктуация (Модул 1 БЕЛ) | StudyBG',
      literature: 'Литературен Канон (15 автори за ДЗИ) & Генератор на Тези | StudyBG',
      english: 'Английски език (CEFR B1.1, B2 & C1 + Технически ESP за Трета СПК) | StudyBG',
      civics: 'Конституция на РБ, ЕС & Кодекс на труда / ЗБУТ (ДИППК) | StudyBG',
      atlas: 'Интерактивен Атлас: История (681–1947), NUTS 2 & Енергетика/ИКТ | StudyBG',
      blitz: 'Speed Blitz 6.00 (45 въпроса & Отборен Дуел за 2 играчи) | StudyBG',
      simulator: '100-точков Изпитен Симулатор за ДЗИ, НВО и Трета СПК | StudyBG',
      generator: 'Генератор на Тестове (Група А/Б) & Държавни изпитни билети за ДИППК | StudyBG',
      calculator: 'МОН Калкулатор за Оценка, ВУЗ Бал и Свидетелство Трета СПК (EUROPASS) | StudyBG',
      catalog: `Пълен Учебен Каталог (${lessons.length} теми за 8.–12. клас) | StudyBG`,
      cases: 'Академични Казуси с Архивни Извори (11.–12. клас) | StudyBG',
      errorbank: 'Интерактивна Банка с Грешки и Персонален Тест | StudyBG',
    };
    document.title =
      tabTitleMap[activeTab] ||
      `${currentLesson.title} (${currentLesson.grade} • ${currentLesson.subject}) | StudyBG`;

    if (typeof w.gtag === 'function') {
      w.gtag('event', 'page_view', {
        page_title: document.title,
        page_path: window.location.pathname,
      });
    }
  }, [portalMode, activeTab, cultureSubTab, currentLesson, lessons.length]);

  // Legal Policies and Cookie Consent State
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState<LegalPolicyTab>('privacy');
  const [forceOpenCookieSettings, setForceOpenCookieSettings] = useState(false);

  const handleOpenPolicy = (tab: LegalPolicyTab) => {
    setActivePolicyTab(tab);
    setIsPolicyModalOpen(true);
  };

  const unresolvedErrorCount = errorBankService.getUnresolvedCount();

  const handleSelectPortalMode = (mode: 'study' | 'culture') => {
    if (mode === 'culture') {
      void import('./components/CultureHubView');
    }
    startTabTransition(() => {
      setPortalMode(mode);
      if (mode === 'study') {
        setActiveTab('home');
      }
    });
    if (mode === 'study') {
      pushRoute({ portal: 'study', tab: 'home' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      pushRoute({ portal: 'culture', subTab: cultureSubTab });
      const el = document.getElementById('workspace');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateStudyTab = (tab: AppNavTab) => {
    prefetchStudyTabChunk(tab);
    startTabTransition(() => {
      setPortalMode('study');
      setActiveTab(tab);
    });
    pushRoute({ portal: 'study', tab });
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById('workspace');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateCultureTab = (subTab: CultureSubTab) => {
    void import('./components/CultureHubView');
    startTabTransition(() => {
      setPortalMode('culture');
      setCultureSubTab(subTab);
    });
    pushRoute({ portal: 'culture', subTab });
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLessonSelected = (lesson: LessonData, preferredTab: AppNavTab = 'summary') => {
    prefetchStudyTabChunk(preferredTab);
    startTabTransition(() => {
      setPortalMode('study');
      setPracticeQuestions(null);
      setCurrentLesson(lesson);
      setActiveTab(preferredTab);
    });
    // Конспектът има собствен адрес /lesson/<id>; останалите изгледи — /<таб>
    pushRoute(
      preferredTab === 'summary'
        ? { portal: 'study', tab: 'summary', lessonId: lesson.id }
        : { portal: 'study', tab: preferredTab }
    );
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Path routing: /simulator, /lesson/<id>, /culture/<sub> + бутоните Назад/Напред.
  // Старите /#tab линкове се превръщат в чист адрес с replaceState.
  const lessonsRef = useRef(lessons);
  lessonsRef.current = lessons;
  const pendingLessonIdRef = useRef<string | null>(null);

  useEffect(() => {
    const applyLocation = (initial: boolean) => {
      const { route, fromLegacyHash } = parseLocation(window.location.pathname, window.location.hash, STUDY_TABS);

      if (!route) {
        // Непознат адрес → началната страница (без дублиран „soft 404“ URL)
        window.history.replaceState(null, '', '/');
        setPortalMode('study');
        setActiveTab('home');
        return;
      }
      if (fromLegacyHash) {
        window.history.replaceState(null, '', routeToPath(route));
      }

      if (route.portal === 'culture') {
        setPortalMode('culture');
        setCultureSubTab(route.subTab);
      } else if (route.lessonId) {
        setPortalMode('study');
        const lesson = lessonsRef.current.find((l) => l.id === route.lessonId);
        if (lesson) {
          pendingLessonIdRef.current = null;
          setCurrentLesson(lesson);
          setActiveTab('summary');
        } else {
          // Урокът още не е зареден: каталогът пуска пълното зареждане, после го отваряме
          pendingLessonIdRef.current = route.lessonId;
          setActiveTab('catalog');
        }
      } else {
        setPortalMode('study');
        setActiveTab(route.tab);
        prefetchStudyTabChunk(route.tab);
      }

      // При първото зареждане не скролваме: страницата вече е отгоре, а програмен
      // плавен скрол при зареждане кара Chrome да не отчете LCP (Core Web Vitals)
      if (initial) return;
      if (route.portal === 'study' && route.tab === 'home' && !route.lessonId) {
        window.scrollTo({ top: 0 });
      } else {
        document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const onNavigate = () => applyLocation(false);
    applyLocation(true);
    window.addEventListener('popstate', onNavigate);
    window.addEventListener('hashchange', onNavigate);
    return () => {
      window.removeEventListener('popstate', onNavigate);
      window.removeEventListener('hashchange', onNavigate);
    };
  }, []);

  // Отложено отваряне на /lesson/<id>, когато пълният каталог се зареди
  useEffect(() => {
    const pendingId = pendingLessonIdRef.current;
    if (!pendingId) return;
    const lesson = lessons.find((l) => l.id === pendingId);
    if (lesson) {
      pendingLessonIdRef.current = null;
      setCurrentLesson(lesson);
      setActiveTab('summary');
    } else if (curriculumHydratedRef.current) {
      // Няма такъв урок — оставаме в каталога с чист адрес
      pendingLessonIdRef.current = null;
      window.history.replaceState(null, '', routeToPath({ portal: 'study', tab: 'catalog' }));
    }
  }, [lessons]);

  // Global Ctrl+K / Cmd+K shortcut to open Quick Lesson Switcher from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsQuickLessonModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScanCompleted = (newLesson: LessonData) => {
    if (!lessons.some(l => l.id === newLesson.id)) {
      setLessons(prev => [newLesson, ...prev]);
    }
    setCurrentLesson(newLesson);
    setIsScanModalOpen(false);
    handleNavigateStudyTab('audit');
  };

  const scrollToCatalog = () => {
    setPortalMode('study');
    setActiveTab('catalog');
    pushRoute({ portal: 'study', tab: 'catalog' });
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartCustomQuizFromErrors = (customQuestions: QuizQuestion[]) => {
    setPracticeQuestions(customQuestions);
    handleNavigateStudyTab('quiz');
  };

  const handleRecordError = (q: QuizQuestion, chosenIndex: number) => {
    errorBankService.recordQuizError(q, currentLesson, chosenIndex);
  };

  const mobileNavPills: { tab: AppNavTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'home', label: 'Начало', icon: <Home className="w-3.5 h-3.5 text-blue-600" /> },
    { tab: 'planner', label: 'План за 6.00', icon: <Calendar className="w-3.5 h-3.5 text-emerald-600" /> },
    { tab: 'summary', label: 'Конспект', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { tab: 'oralexam', label: 'Устен изпит', icon: <Mic className="w-3.5 h-3.5 text-blue-600" /> },
    { tab: 'cases', label: 'Казуси ДЗИ', icon: <Scale className="w-3.5 h-3.5 text-slate-600" /> },
    { tab: 'grammar', label: 'Тренажор БЕЛ', icon: <PenTool className="w-3.5 h-3.5 text-blue-600" /> },
    { tab: 'moduletwo', label: 'Модул 2 БЕЛ', icon: <Feather className="w-3.5 h-3.5 text-slate-600" /> },
    { tab: 'literature', label: 'Литературен Канон', icon: <BookMarked className="w-3.5 h-3.5 text-slate-600" /> },
    { tab: 'specialties', label: 'Училища & Специалности 8–12', icon: <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> },
    { tab: 'mathlab', label: 'Математика & STEM', icon: <Compass className="w-3.5 h-3.5 text-cyan-600" /> },
    { tab: 'sciencelab', label: 'Природни науки Лаб', icon: <FlaskConical className="w-3.5 h-3.5 text-emerald-600" /> },
    { tab: 'atlas', label: 'Атлас Ист. & Гео.', icon: <MapPin className="w-3.5 h-3.5 text-amber-600" /> },
    { tab: 'english', label: 'Английски ДЗИ', icon: <Globe className="w-3.5 h-3.5 text-sky-600" /> },
    { tab: 'civics', label: 'Конституция & ЕС', icon: <Scale className="w-3.5 h-3.5 text-blue-600" /> },
    { tab: 'blitz', label: 'Блиц 60с.', icon: <Zap className="w-3.5 h-3.5 text-amber-600" /> },
    { tab: 'audit', label: 'Одит 6.00', icon: <CheckSquare className="w-3.5 h-3.5" /> },
    { tab: 'flashcards', label: 'Флаш карти', icon: <Zap className="w-3.5 h-3.5" /> },
    { tab: 'quiz', label: 'Тест', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { tab: 'simulator', label: 'Симулатор', icon: <Clock className="w-3.5 h-3.5" /> },
    { tab: 'errorbank', label: 'Грешки', icon: <AlertCircle className="w-3.5 h-3.5" /> },
    { tab: 'generator', label: 'Група А & Б', icon: <Printer className="w-3.5 h-3.5" /> },
    { tab: 'calculator', label: 'Калкулатор', icon: <Calculator className="w-3.5 h-3.5" /> },
    { tab: 'catalog', label: 'Каталог', icon: <BookMarked className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Offline Status & PWA Install Banner */}
      <OfflineStatusBanner />

      {/* Sticky Clean Navigation Bar with Portal Switcher */}
      <Navbar
        portalMode={portalMode}
        onSelectPortalMode={handleSelectPortalMode}
        activeTab={activeTab}
        setActiveTab={handleNavigateStudyTab}
        activeCultureTab={cultureSubTab}
        onSelectCultureTab={handleNavigateCultureTab}
        onOpenScan={() => setIsScanModalOpen(true)}
        onScrollToCatalog={scrollToCatalog}
        onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
        onOpenQuickSearch={() => setIsQuickLessonModalOpen(true)}
        totalLessonsCount={totalLessonsDisplayCount}
      />

      {/* Culture Portal Hero (shown only when in Culture mode) */}
      {portalMode === 'culture' && (
        <CultureHero
          onSwitchToStudy={() => handleSelectPortalMode('study')}
          onSelectSubTab={handleNavigateCultureTab}
        />
      )}

      {/* Lazy Modals wrapped in Suspense */}
      <ChunkErrorBoundary compact>
      <Suspense fallback={null}>
        {/* Smart Scan Modal / Overlay */}
        {isScanModalOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsScanModalOpen(false);
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <SmartScan
                onScanComplete={handleScanCompleted}
                onClose={() => setIsScanModalOpen(false)}
                sampleLessons={lessons}
              />
            </div>
          </div>
        )}

        {/* Quick Lesson Switcher Modal */}
        {isQuickLessonModalOpen && (
          <QuickLessonSwitcherModal
            isOpen={isQuickLessonModalOpen}
            onClose={() => setIsQuickLessonModalOpen(false)}
            lessons={lessons}
            currentLessonId={currentLesson.id}
            onSelectLesson={(l, targetTab) =>
              handleLessonSelected(
                l,
                targetTab ??
                  (['quiz', 'flashcards', 'oralexam', 'audit'].includes(activeTab) ? activeTab : 'summary')
              )
            }
          />
        )}

        {/* Official МОН Formula Sheets Modal */}
        {isFormulaModalOpen && (
          <MonFormulaSheetsModal onClose={() => setIsFormulaModalOpen(false)} />
        )}
      </Suspense>
      </ChunkErrorBoundary>

      {/* Main Content Area: Spacious Full-Width Homepage vs Focused Workspace */}
      {portalMode === 'study' && activeTab === 'home' ? (
        <main className="flex-1 w-full bg-slate-50">
          <HomeLandingView
            lessons={lessons}
            onSelectLesson={handleLessonSelected}
            onNavigateTab={handleNavigateStudyTab}
            onOpenScan={() => setIsScanModalOpen(true)}
            onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
            onNavigateCultureTab={handleNavigateCultureTab}
            onRequestFullCurriculum={requestFullCurriculum}
          />
        </main>
      ) : (
        <main id="workspace" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 min-h-[100svh]">
          {portalMode === 'study' ? (
            <div>
            
            {/* Top Workspace Breadcrumbs & Topic Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
              <div className="space-y-1">
                {/* Breadcrumbs Trail */}
                <nav aria-label="Хлябни трохи" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectPortalMode('study');
                    }}
                    className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>StudyBG</span>
                  </a>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-blue-700 font-semibold">Гимназиална академия (8.–12. кл)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  {activeTab === 'specialties' ? (
                    <span className="text-blue-700 font-semibold">Специални секции по училища, специалности и класове (8.–12. клас)</span>
                  ) : activeTab === 'planner' ? (
                    <span className="text-emerald-700 font-semibold">Моят План за 6.00 (Хронометър & Седмичен график)</span>
                  ) : activeTab === 'grammar' ? (
                    <span className="text-blue-700 font-semibold">Тренажор БЕЛ (Модул 1 • Норми на БАН)</span>
                  ) : activeTab === 'moduletwo' ? (
                    <span className="text-slate-700 font-semibold">Модул 2 БЕЛ (Тропи, Пароними & Резюме)</span>
                  ) : activeTab === 'literature' ? (
                    <span className="text-slate-700 font-semibold">Литературен Канон & Тези (41. задача ДЗИ)</span>
                  ) : activeTab === 'mathlab' ? (
                    <span className="text-cyan-700 font-semibold">Математика & STEM Лаб (НВО 10 & ДЗИ)</span>
                  ) : activeTab === 'sciencelab' ? (
                    <span className="text-emerald-700 font-semibold">Лаборатория Природни науки (Биология, Химия и Физика)</span>
                  ) : activeTab === 'oralexam' ? (
                    <span className="text-blue-700 font-semibold">Устно изпитване пред дъската (Гласов и текстов тренажор за 6.00)</span>
                  ) : activeTab === 'atlas' ? (
                    <span className="text-amber-700 font-semibold">Атлас История & География (Договори & NUTS 2)</span>
                  ) : activeTab === 'english' ? (
                    <span className="text-sky-700 font-semibold">Английски език ДЗИ & НВО (CEFR B1.1 & B2)</span>
                  ) : activeTab === 'civics' ? (
                    <span className="text-blue-700 font-semibold">Конституция на РБ, Власти & Европейски съюз (ГО & ДЗИ)</span>
                  ) : activeTab === 'blitz' ? (
                    <span className="text-amber-700 font-semibold">Speed Blitz 6.00 (Аркаден 60-секунден Блиц)</span>
                  ) : activeTab === 'cases' ? (
                    <span className="text-slate-700 font-semibold">Казуси за ДЗИ (11.–12. клас)</span>
                  ) : activeTab === 'calculator' ? (
                    <span className="text-blue-700 font-semibold">МОН Калкулатор & Балообразуване</span>
                  ) : activeTab === 'errorbank' ? (
                    <span className="text-rose-700 font-semibold">Интерактивна банка с грешки</span>
                  ) : activeTab === 'catalog' ? (
                    <span className="text-blue-700 font-semibold">Пълна учебна програма ({totalLessonsDisplayCount} теми)</span>
                  ) : (
                    <>
                      <span className="text-emerald-700 font-medium">{currentLesson.subject}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-700 font-medium">{currentLesson.grade}</span>
                    </>
                  )}
                </nav>

                {/* Lesson or Specialized Module Title */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {activeTab === 'specialties' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Специални секции по училища, специалности и класове (8.–12. клас)</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                        Раздел А (ООП) • Раздел Б (ДЗИ) • Раздел В (ДИППК)
                      </span>
                    </h2>
                  ) : activeTab === 'planner' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Моят План за Отличен 6.00 & Изпитен Календар</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                        ДЗИ 12 & НВО 10 • На живо
                      </span>
                    </h2>
                  ) : activeTab === 'grammar' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Тренажор по Граматика, Правопис и Пунктуация</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                        ДЗИ Модул 1 • 20 задачи
                      </span>
                    </h2>
                  ) : activeTab === 'moduletwo' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Лаборатория за Тропи, Фигури, Пароними и Резюме</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200 font-semibold">
                        ДЗИ Модул 2 & НВО 10
                      </span>
                    </h2>
                  ) : activeTab === 'literature' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Литературен Канон (15 автори) & Генератор на Тези</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200 font-semibold">
                        41. задача • ЕСЕ & ЛИС
                      </span>
                    </h2>
                  ) : activeTab === 'mathlab' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Интерактивна STEM & Математическа Лаборатория</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold">
                        Задачи 16–17 НВО & 26–28 ДЗИ
                      </span>
                    </h2>
                  ) : activeTab === 'sciencelab' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Виртуална Лаборатория по Природни науки (Биология, Химия и Физика)</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                        ДНК Синтез • Йонни реакции • Закон на Ом & Фотоефект
                      </span>
                    </h2>
                  ) : activeTab === 'oralexam' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Гласов Симулатор „Устно изпитване пред дъската за 6.00“</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                        Глас & Микрофон • Радар на термини • Бележник
                      </span>
                    </h2>
                  ) : activeTab === 'atlas' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Интерактивен Атлас по История и География</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                        Договори (681–1940) & Райони NUTS 2
                      </span>
                    </h2>
                  ) : activeTab === 'english' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Лаборатория по Английски език за ДЗИ и НВО</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 font-semibold">
                        CEFR B1.1 & B2 • Use of English & Writing
                      </span>
                    </h2>
                  ) : activeTab === 'civics' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Конституция на РБ, Разделение на властите и Европейски съюз</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                        Гражданско образование & ДЗИ Философия
                      </span>
                    </h2>
                  ) : activeTab === 'blitz' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Аркаден 60-секунден Блиц за Отличен 6.00</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                        Speed Blitz • Combo x5
                      </span>
                    </h2>
                  ) : activeTab === 'cases' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Академични Казуси с Архивни Извори</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-800 border border-slate-200 font-semibold">
                        ЦДА & ЛИБИ • 11.–12. клас
                      </span>
                    </h2>
                  ) : activeTab === 'calculator' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Официален МОН Калкулатор за Оценка и Бал</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
                        Наредба №11 • 0–100 точки
                      </span>
                    </h2>
                  ) : (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>{currentLesson.title}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                        {currentLesson.grade}
                      </span>
                      {currentLesson.examType && (
                        <span className="text-xs px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                          {currentLesson.examType}
                        </span>
                      )}
                    </h2>
                  )}
                </div>

                {/* Direct Referral to Matura+ if user browses a 5-7th grade lesson */}
                {!['specialties', 'planner', 'grammar', 'moduletwo', 'literature', 'mathlab', 'sciencelab', 'oralexam', 'atlas', 'english', 'civics', 'blitz', 'cases', 'calculator'].includes(activeTab) &&
                  (currentLesson.grade.includes('7.') || currentLesson.grade.includes('6.') || currentLesson.grade.includes('5.')) && (
                  <div className="pt-2">
                    <MaturaPlusBridgeBanner compact={true} source="lesson-breadcrumb" />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsQuickLessonModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 text-xs font-medium shadow-xs transition-all"
                  title="Отвори списъка с уроци"
                >
                  <Search className="w-3.5 h-3.5 text-blue-600" />
                  <span>Смени тема</span>
                </button>

                <button
                  onClick={() => setIsScanModalOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all"
                >
                  <Camera className="w-4 h-4 text-white" />
                  <span>Сканирай записки</span>
                </button>
              </div>
            </div>

            {/* Mobile / Tablet Horizontal Quick Tab Strip (visible only on small viewports) */}
            <div className="lg:hidden mb-6 p-1.5 rounded-xl bg-white border border-slate-200 shadow-xs overflow-x-auto no-scrollbar flex items-center gap-1">
              {mobileNavPills.map((p) => {
                const isActive = activeTab === p.tab;
                return (
                  <button
                    key={p.tab}
                    onClick={() => handleNavigateStudyTab(p.tab)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {p.icon}
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Two-Column Responsive Workspace: LEFT SIDEBAR + RIGHT MAIN CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Vertical Study Sidebar */}
              <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
                <StudySidebar
                  currentLesson={currentLesson}
                  activeTab={activeTab}
                  onSelectTab={handleNavigateStudyTab}
                  unresolvedErrorCount={unresolvedErrorCount}
                  totalLessonsCount={totalLessonsDisplayCount}
                  onOpenQuickLessonPicker={() => setIsQuickLessonModalOpen(true)}
                  onOpenScan={() => setIsScanModalOpen(true)}
                  onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
                  onOpenCultureContext={() => handleNavigateCultureTab('mysteries')}
                />
              </div>

              {/* Right Column: Clean Main Content Area Strictly Scoped to Active Tab */}
              <div className="lg:col-span-8 xl:col-span-9 min-w-0">
                <div
                  className={`rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 lg:p-7 shadow-xs transition-opacity duration-150 ${
                    isPendingTab ? 'opacity-80' : 'opacity-100'
                  }`}
                >
                  
                  <ChunkErrorBoundary key={activeTab}>
                  <Suspense fallback={<ViewLoadingSkeleton />}>
                    {activeTab === 'specialties' && (
                      <SchoolsSpecialtiesHub
                        allLessons={lessons}
                        onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
                      />
                    )}

                    {activeTab === 'scan' && (
                      <SmartScan
                        onScanComplete={handleScanCompleted}
                        sampleLessons={lessons}
                      />
                    )}

                    {activeTab === 'audit' && (
                      <NotebookAuditor
                        lesson={currentLesson}
                        onProceedToHolyTrinity={() => handleNavigateStudyTab('summary')}
                        onNavigateTab={handleNavigateStudyTab}
                      />
                    )}

                    {activeTab === 'summary' && (
                      <SummaryView
                        lesson={currentLesson}
                        onProceedToFlashcards={() => handleNavigateStudyTab('flashcards')}
                        onNavigateTab={handleNavigateStudyTab}
                      />
                    )}

                    {activeTab === 'cases' && (
                      <HistoricalCasesView />
                    )}

                    {activeTab === 'flashcards' && (
                      <FlashcardsView
                        flashcards={currentLesson.flashcards}
                        onProceedToQuiz={() => handleNavigateStudyTab('quiz')}
                        onNavigateTab={handleNavigateStudyTab}
                      />
                    )}

                    {activeTab === 'quiz' && (
                      <QuizView
                        key={`${currentLesson.id}-${practiceQuestions ? `custom-${practiceQuestions.length}` : 'lesson'}`}
                        questions={practiceQuestions || currentLesson.quiz}
                        currentLesson={currentLesson}
                        allLessons={lessons}
                        onReviewFlashcards={() => handleNavigateStudyTab('flashcards')}
                        onNavigateTab={handleNavigateStudyTab}
                        onRecordError={handleRecordError}
                      />
                    )}

                    {activeTab === 'simulator' && (
                      <ExamSimulatorView
                        currentLesson={currentLesson}
                        allLessons={lessons}
                        onSelectLesson={(l) => handleLessonSelected(l, 'simulator')}
                        onOpenErrorBank={() => handleNavigateStudyTab('errorbank')}
                        onRecordError={handleRecordError}
                      />
                    )}

                    {activeTab === 'errorbank' && (
                      <ErrorBankView
                        onStartCustomQuiz={handleStartCustomQuizFromErrors}
                        allLessons={lessons}
                        onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
                      />
                    )}

                    {activeTab === 'generator' && (
                      <ExamTestPaperGenerator
                        currentLesson={currentLesson}
                        allLessons={lessons}
                        onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
                        onNavigateTab={handleNavigateStudyTab}
                      />
                    )}

                    {activeTab === 'catalog' && (
                      <div id="catalog">
                        <SubjectCatalog
                          lessons={lessons}
                          currentLessonId={currentLesson.id}
                          onSelectLesson={(l, targetTab = 'summary') => handleLessonSelected(l, targetTab)}
                          onStartFilteredQuiz={handleStartCustomQuizFromErrors}
                          onAddNewScan={() => setIsScanModalOpen(true)}
                        />
                      </div>
                    )}

                    {activeTab === 'calculator' && (
                      <MonGradeCalculatorView onNavigateTab={handleNavigateStudyTab} />
                    )}

                    {activeTab === 'grammar' && (
                      <GrammarTrainerLab />
                    )}

                    {activeTab === 'moduletwo' && (
                      <ModuleTwoBelLab />
                    )}

                    {activeTab === 'literature' && (
                      <LiteratureCanonView />
                    )}

                    {activeTab === 'mathlab' && (
                      <MathStemLab onOpenFormulaModal={() => setIsFormulaModalOpen(true)} />
                    )}

                    {activeTab === 'sciencelab' && (
                      <ScienceDziLab onOpenFormulaModal={() => setIsFormulaModalOpen(true)} />
                    )}

                    {activeTab === 'oralexam' && (
                      <OralExamSimulatorLab
                        lessons={lessons}
                        currentLesson={currentLesson}
                        onSelectLesson={(l) => setCurrentLesson(l)}
                      />
                    )}

                    {activeTab === 'atlas' && (
                      <HistoryGeoAtlasLab />
                    )}

                    {activeTab === 'english' && (
                      <EnglishDziLab />
                    )}

                    {activeTab === 'civics' && (
                      <CivicsEuLab />
                    )}

                    {activeTab === 'blitz' && (
                      <SpeedBlitzLab />
                    )}

                    {activeTab === 'planner' && (
                      <StudyPlannerDashboard
                        lessons={lessons}
                        onNavigateTab={handleNavigateStudyTab}
                        onSelectLesson={handleLessonSelected}
                      />
                    )}
                  </Suspense>
                  </ChunkErrorBoundary>

                </div>
              </div>

            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* PORTAL 2: ОБЩА КУЛТУРА & ЗАГАДКИ (СЪС СТРАНИЧНО МЕНЮ) */
          /* ========================================================================= */
          <div>
            {/* Culture Wayfinding Header: Breadcrumbs Trail */}
            <div className="mb-6 pb-4 border-b border-slate-200">
              <nav aria-label="Хлябни трохи" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
                <a
                  href="/culture"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectPortalMode('culture');
                  }}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>StudyBG</span>
                </a>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-amber-800 font-bold">Обща култура & Загадки</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-800 font-medium">
                  {cultureSubTab === 'heritage'
                    ? '🏆 Български принос & ЮНЕСКО (16)'
                    : cultureSubTab === 'mysteries'
                    ? '🕵️ Конспирации, секретни досиета & загадки (40)'
                    : cultureSubTab === 'mysticmap'
                    ? '🛸 Карта на мистичните и секретни зони (12 координати)'
                    : cultureSubTab === 'timeline'
                    ? '⏳ Интерактивна хронология (681–1908 г.)'
                    : cultureSubTab === 'cases'
                    ? '⚖️ Отворени исторически казуси & Есета (12)'
                    : cultureSubTab === 'wonders'
                    ? '🗺️ Природни чудеса & мистични зони (18)'
                    : cultureSubTab === 'trivia'
                    ? '🧠 Куиз за ерудити (48 въпроса)'
                    : cultureSubTab === 'myths'
                    ? '⚖️ Факт, Мит или Конспирация? (24)'
                    : '🏛️ Златен фонд & Мъдрост на епохите (16)'}
                </span>
              </nav>
            </div>

            {/* Mobile / Tablet Horizontal Quick Tab Strip for Culture (visible only on small viewports) */}
            <div className="lg:hidden mb-6 p-1.5 rounded-xl bg-white border border-slate-200 shadow-xs overflow-x-auto no-scrollbar flex items-center gap-1.5">
              {[
                { tab: 'mysteries', label: '🕵️ Конспирации & Загадки (40)' },
                { tab: 'mysticmap', label: '🛸 Карта на мистичните зони (12)' },
                { tab: 'heritage', label: 'Принос & ЮНЕСКО (16)' },
                { tab: 'wonders', label: 'Природни чудеса (18)' },
                { tab: 'trivia', label: 'Куиз за ерудити (48)' },
                { tab: 'myths', label: 'Факт или Конспирация (24)' },
                { tab: 'timeline', label: 'Хронология' },
                { tab: 'cases', label: 'Казуси & Есета (12)' },
                { tab: 'wisdom', label: 'Златен фонд (16)' },
              ].map((p) => {
                const isActive = cultureSubTab === p.tab;
                return (
                  <button
                    key={p.tab}
                    onClick={() => handleNavigateCultureTab(p.tab as CultureSubTab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-amber-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Culture Portal Layout: Left Sidebar + Right Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Vertical Culture Sidebar */}
              <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
                <CultureSidebar
                  activeCultureTab={cultureSubTab}
                  onSelectCultureTab={handleNavigateCultureTab}
                  onSwitchToStudy={() => handleSelectPortalMode('study')}
                />
              </div>

              {/* Right Column: Active Culture Sub-Module */}
              <div className="lg:col-span-8 xl:col-span-9 min-w-0">
                <ChunkErrorBoundary key={cultureSubTab}>
                <Suspense fallback={<ViewLoadingSkeleton />}>
                  <CultureHubView
                    activeSubTab={cultureSubTab}
                    onSelectSubTab={setCultureSubTab}
                    onSelectLesson={(l, preferredTab = 'summary') => handleLessonSelected(l, preferredTab)}
                    onNavigateTab={handleNavigateStudyTab}
                    onSwitchToStudy={() => handleSelectPortalMode('study')}
                    lessons={lessons}
                  />
                </Suspense>
                </ChunkErrorBoundary>
              </div>

            </div>

          </div>
        )}

      </main>
      )}

      {/* Weekly Exam Prep Newsletter (deferred offscreen rendering via content-visibility) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full cv-auto">
        <NewsletterSection onOpenPolicyModal={handleOpenPolicy} />
      </div>

      {/* Footer with Legal Policies */}
      <div className="cv-auto">
        <Footer
          onNavigateTab={handleNavigateStudyTab}
          onSelectCultureTab={handleNavigateCultureTab}
          onSelectPortalMode={handleSelectPortalMode}
          onOpenScan={() => setIsScanModalOpen(true)}
          onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
          onScrollToCatalog={scrollToCatalog}
          onOpenPolicyModal={handleOpenPolicy}
          onOpenCookieSettings={() => setForceOpenCookieSettings(true)}
        />
      </div>

      {/* GDPR Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPolicy={handleOpenPolicy}
        forceOpen={forceOpenCookieSettings}
        onCloseForceOpen={() => setForceOpenCookieSettings(false)}
      />

      {/* GDPR Legal Policies Modal (Privacy, Cookies, Terms) */}
      {isPolicyModalOpen && (
        <ChunkErrorBoundary compact>
        <Suspense fallback={null}>
          <LegalPoliciesModal
            isOpen={isPolicyModalOpen}
            onClose={() => setIsPolicyModalOpen(false)}
            initialTab={activePolicyTab}
          />
        </Suspense>
        </ChunkErrorBoundary>
      )}

    </div>
  );
}

export default App;
