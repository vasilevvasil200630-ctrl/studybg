import { useState, useEffect, useCallback, useRef, useTransition, lazy, Suspense } from 'react';
import { Navbar, type AppNavTab } from './components/Navbar';
import { CultureHero, type CultureSubTab } from './components/CultureHero';
import { Footer } from './components/Footer';
import { AppSidebar } from './components/AppSidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LESSON_TABS, getStudyPageMeta, getStudyNavLabel } from './lib/studyNav';
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
const MyProgramView = lazy(() => import('./components/program/MyProgramView').then(m => ({ default: m.MyProgramView })));
const AuthProfileModal = lazy(() => import('./components/AuthProfileModal').then(m => ({ default: m.AuthProfileModal })));
import { errorBankService } from './services/errorBankService';
import { hasOAuthCallbackErrorInUrl } from './services/authService';

import {
  CURRICULUM_LESSONS,
  TOTAL_CURRICULUM_LESSONS_COUNT,
  loadFullCurriculumLessons
} from './data/curriculumDatabase';
import type { LessonData, QuizQuestion } from './types';
import {
  Camera,
  ChevronRight,
  Search,
  Home,
} from 'lucide-react';
import './App.css';

const STUDY_TABS: AppNavTab[] = [
  'home', 'specialties', 'planner', 'program', 'scan', 'audit', 'summary', 'cases', 'flashcards', 'quiz',
  'simulator', 'errorbank', 'generator', 'catalog', 'calculator',
  'grammar', 'moduletwo', 'literature', 'mathlab', 'sciencelab', 'oralexam', 'atlas', 'english', 'civics', 'blitz'
];

// Изгледи, които показват или търсят във всички уроци
const FULL_CURRICULUM_TABS: ReadonlySet<AppNavTab> = new Set<AppNavTab>([
  'catalog', 'quiz', 'simulator', 'generator', 'blitz', 'specialties', 'errorbank', 'oralexam', 'planner', 'program', 'scan'
]);

function prefetchStudyTabChunk(tab: AppNavTab): void {
  switch (tab) {
    case 'specialties': void import('./components/SchoolsSpecialtiesHub'); break;
    case 'planner': void import('./components/StudyPlannerDashboard'); break;
    case 'program': void import('./components/program/MyProgramView'); break;
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
      <div className="w-5 h-5 border border-blue-600 border-t-transparent rounded-full animate-spin" />
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [isQuickLessonModalOpen, setIsQuickLessonModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => hasOAuthCallbackErrorInUrl());
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
      document.title = 'Обща култура, 41 Секретни досиета & Мистична карта | StudyBG';
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'page_view', {
          page_title: document.title,
          page_path: window.location.pathname,
        });
      }
      return;
    }
    const tabTitleMap: Partial<Record<AppNavTab, string>> = {
      home: 'StudyBG — Национална дигитална академия за ДЗИ (Матура) и Трета СПК (5.–12. клас)',
      specialties: 'Училища, 64+ Специалности, ДИППК & Калкулатор за Бал за ВУЗ (8.–12. кл.) | StudyBG',
      planner: 'Моят План за Отличен 6.00, Стратегия & Седмичен График | StudyBG',
      program: 'Моята програма: предметите и темите по МОН за твоя клас и училище | StudyBG',
      oralexam: 'Гласов Симулатор: Устен изпит, Защита на Дипломен проект (ДИППК) & ВУЗ | StudyBG',
      sciencelab: 'STEM Лаборатория: Биология (ДНК/PCR), Химия (pH/ОХ) и Физика (Карно/3Ф) | StudyBG',
      mathlab: 'Математика & STEM Лаборатория за ДЗИ 12 и Профилирана подготовка | StudyBG',
      moduletwo: 'Модул 2 БЕЛ & Архитект за Задача 41 (Есе и ИС — 30 т.) | StudyBG',
      grammar: 'Тренажор по Граматика, Правопис и Пунктуация (Модул 1 БЕЛ) | StudyBG',
      literature: 'Литературен Канон (15 автори за ДЗИ) & Генератор на Тези | StudyBG',
      english: 'Английски език (CEFR B1.1, B2 & C1 + Технически ESP за Трета СПК) | StudyBG',
      civics: 'Конституция на РБ, ЕС & Кодекс на труда / ЗБУТ (ДИППК) | StudyBG',
      atlas: 'Интерактивен Атлас: История (681–1947), NUTS 2 & Енергетика/ИКТ | StudyBG',
      blitz: 'Speed Blitz 6.00 (45 въпроса & Отборен Дуел за 2 играчи) | StudyBG',
      simulator: '100-точков Изпитен Симулатор за ДЗИ и Трета СПК (ДИППК) | StudyBG',
      generator: 'Генератор на Тестове (Група А/Б) & Държавни изпитни билети за ДИППК | StudyBG',
      calculator: 'Калкулатор: оценка от ДЗИ, бал и изпит за трета СПК | StudyBG',
      catalog: `Пълен Учебен Каталог (${totalLessonsDisplayCount} теми за 5.–12. клас) | StudyBG`,
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
  }, [portalMode, activeTab, cultureSubTab, currentLesson, totalLessonsDisplayCount]);

  // Legal Policies and Cookie Consent State
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState<LegalPolicyTab>('privacy');
  const [forceOpenCookieSettings, setForceOpenCookieSettings] = useState(false);

  const handleOpenPolicy = (tab: LegalPolicyTab) => {
    setActivePolicyTab(tab);
    setIsPolicyModalOpen(true);
  };

  // Броят в менюто се обновява и когато грешка се запише извън App (тест по тема, входен тест)
  const [, setErrorBankVersion] = useState(0);
  useEffect(() => {
    const onMutated = (e: Event) => {
      if ((e as CustomEvent<{ source?: string }>).detail?.source === 'error_bank') setErrorBankVersion((v) => v + 1);
    };
    window.addEventListener('studybg:local-data-mutated', onMutated);
    return () => window.removeEventListener('studybg:local-data-mutated', onMutated);
  }, []);
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
        ? { portal: 'study', tab: 'summary', lessonId: lesson.id.split('--')[0] }
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


  // Вътрешните екрани на академията ползват обвивката на Матура Плюс: странично меню + горна лента
  const isAppShell = portalMode === 'study' && activeTab !== 'home';
  const studyPageMeta = getStudyPageMeta(activeTab, totalLessonsDisplayCount);
  const isLessonTab = LESSON_TABS.has(activeTab);
  const pageLabel = studyPageMeta?.title ?? getStudyNavLabel(activeTab) ?? currentLesson.title;

  return (
    <div className="min-h-screen text-slate-900 font-sans">
      {/* Offline Status & PWA Install Banner */}
      <OfflineStatusBanner />

      <div className={isAppShell ? 'flex min-h-screen' : 'flex min-h-screen flex-col'}>
      {isAppShell && (
        <AppSidebar
          activeTab={activeTab}
          onSelectTab={handleNavigateStudyTab}
          currentLesson={currentLesson}
          unresolvedErrorCount={unresolvedErrorCount}
          totalLessonsCount={totalLessonsDisplayCount}
          onOpenLessonPicker={() => setIsQuickLessonModalOpen(true)}
          onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
          onOpenCulture={() => handleNavigateCultureTab('mysteries')}
          mobileOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />
      )}
      <div className={isAppShell ? 'flex min-w-0 flex-1 flex-col' : 'contents'}>

      {/* Sticky Clean Navigation Bar with Portal Switcher */}
      <Navbar
        variant={isAppShell ? 'app' : 'site'}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        pageLabel={pageLabel}
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
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
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

        {/* Google Account & Cloud Sync Modal */}
        {isAuthModalOpen && (
          <AuthProfileModal
            onClose={() => setIsAuthModalOpen(false)}
            onNavigateTab={handleNavigateStudyTab}
            onOpenPolicyModal={handleOpenPolicy}
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
        <main className="flex-1 w-full">
          <HomeLandingView
            lessons={lessons}
            onSelectLesson={handleLessonSelected}
            onNavigateTab={handleNavigateStudyTab}
            onOpenScan={() => setIsScanModalOpen(true)}
            onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onNavigateCultureTab={handleNavigateCultureTab}
            onRequestFullCurriculum={requestFullCurriculum}
          />
        </main>
      ) : (
        <main
          id="workspace"
          className={
            isAppShell
              ? 'w-full flex-1 px-4 sm:px-6 lg:px-10 pt-6 lg:pt-8 pb-28 lg:pb-12'
              : 'py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 min-h-[100svh]'
          }
        >
          {portalMode === 'study' ? (
            <div className="mx-auto w-full max-w-6xl">
              <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                    {studyPageMeta ? studyPageMeta.title : currentLesson.title}
                  </h1>
                  <p className="mt-1.5 max-w-2xl text-sm text-slate-600 leading-relaxed">
                    {studyPageMeta
                      ? studyPageMeta.description
                      : [currentLesson.subject, currentLesson.grade, currentLesson.examType].filter(Boolean).join(' · ')}
                  </p>
                </div>

                {isLessonTab && (
                  <div className="flex shrink-0 flex-wrap items-center gap-2 lg:hidden">
                    <button
                      type="button"
                      onClick={() => setIsQuickLessonModalOpen(true)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      Смени урока
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsScanModalOpen(true)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Camera className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      Сканирай записки
                    </button>
                  </div>
                )}
              </header>

              {/* Урок от 5.–7. клас → сестринската платформа за НВО 7 */}
              {isLessonTab &&
                (currentLesson.grade.includes('7.') || currentLesson.grade.includes('6.') || currentLesson.grade.includes('5.')) && (
                  <div className="mb-6">
                    <MaturaPlusBridgeBanner compact={true} source="lesson-breadcrumb" />
                  </div>
                )}

              <div className={`transition-opacity duration-150 ${isPendingTab ? 'opacity-80' : 'opacity-100'}`}>
                  <ChunkErrorBoundary key={activeTab}>
                  <Suspense fallback={<ViewLoadingSkeleton />}>
                    {activeTab === 'specialties' && (
                      <SchoolsSpecialtiesHub
                        allLessons={lessons}
                        onSelectLesson={(l, targetTab: AppNavTab = 'summary') => handleLessonSelected(l, targetTab)}
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
                        allLessons={lessons}
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
                        onSelectLesson={(l, targetTab: AppNavTab = 'summary') => handleLessonSelected(l, targetTab)}
                      />
                    )}

                    {activeTab === 'generator' && (
                      <ExamTestPaperGenerator
                        currentLesson={currentLesson}
                        allLessons={lessons}
                        onSelectLesson={(l, targetTab: AppNavTab = 'summary') => handleLessonSelected(l, targetTab)}
                        onNavigateTab={handleNavigateStudyTab}
                      />
                    )}

                    {activeTab === 'catalog' && (
                      <div id="catalog">
                        <SubjectCatalog
                          lessons={lessons}
                          currentLessonId={currentLesson.id}
                          onSelectLesson={(l, targetTab: AppNavTab = 'summary') => handleLessonSelected(l, targetTab)}
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
                      <LiteratureCanonView
                        onOpenLessonId={(lid) => {
                          const found = lessons.find((l) => l.id === lid);
                          if (found) handleLessonSelected(found, 'summary');
                        }}
                      />
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

                    {activeTab === 'program' && (
                      <MyProgramView lessons={lessons} onSelectLesson={(l) => handleLessonSelected(l)} />
                    )}

                    {activeTab === 'planner' && (
                      <StudyPlannerDashboard
                        lessons={lessons}
                        onNavigateTab={handleNavigateStudyTab}
                        onSelectLesson={handleLessonSelected}
                        onOpenAuthModal={() => setIsAuthModalOpen(true)}
                      />
                    )}
                  </Suspense>
                  </ChunkErrorBoundary>
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
                    ? 'Български принос & ЮНЕСКО (16)'
                    : cultureSubTab === 'mysteries'
                    ? 'Конспирации, секретни досиета & загадки (41)'
                    : cultureSubTab === 'mysticmap'
                    ? 'Карта на мистичните и секретни зони (12 координати)'
                    : cultureSubTab === 'timeline'
                    ? 'Интерактивна хронология (681–1908 г.)'
                    : cultureSubTab === 'cases'
                    ? 'Отворени исторически казуси & Есета (12)'
                    : cultureSubTab === 'wonders'
                    ? 'Природни чудеса & мистични зони (18)'
                    : cultureSubTab === 'trivia'
                    ? 'Куиз за ерудити (38 въпроса)'
                    : cultureSubTab === 'myths'
                    ? 'Факт, Мит или Конспирация? (24)'
                    : 'Златен фонд & Мъдрост на епохите (16)'}
                </span>
              </nav>
            </div>

            {/* Mobile / Tablet Horizontal Quick Tab Strip for Culture (visible only on small viewports) */}
            <div className="lg:hidden mb-6 p-1.5 rounded-xl bg-white border border-slate-200 shadow-xs overflow-x-auto no-scrollbar flex items-center gap-1.5">
              {[
                { tab: 'mysteries', label: 'Конспирации & Загадки (41)' },
                { tab: 'mysticmap', label: 'Карта на мистичните зони (12)' },
                { tab: 'heritage', label: 'Принос & ЮНЕСКО (16)' },
                { tab: 'wonders', label: 'Природни чудеса (18)' },
                { tab: 'trivia', label: 'Куиз за ерудити (38)' },
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
      {!isAppShell && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full cv-auto">
          <NewsletterSection onOpenPolicyModal={handleOpenPolicy} />
        </div>
      )}

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
      </div>
      </div>

      {isAppShell && <MobileBottomNav activeTab={activeTab} onSelectTab={handleNavigateStudyTab} />}

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
