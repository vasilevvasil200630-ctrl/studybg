import { useState, useEffect, lazy, Suspense } from 'react';
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

// Code-split heavy interactive modules for optimal bundle size and instant initial load
const HomeLandingView = lazy(() => import('./components/HomeLandingView').then(m => ({ default: m.HomeLandingView })));
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
import { errorBankService } from './services/errorBankService';

import { CURRICULUM_LESSONS } from './data/curriculumDatabase';
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
  'home', 'planner', 'scan', 'audit', 'summary', 'cases', 'flashcards', 'quiz',
  'simulator', 'errorbank', 'generator', 'catalog', 'calculator',
  'grammar', 'moduletwo', 'literature', 'mathlab', 'sciencelab', 'oralexam', 'atlas', 'english', 'civics', 'blitz'
];

const ViewLoadingSkeleton = () => (
  <div className="p-8 rounded-2xl bg-white border border-slate-200 animate-pulse flex items-center justify-center min-h-[300px] shadow-xs">
    <div className="flex items-center gap-3 text-slate-500 text-xs sm:text-sm font-medium">
      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <span>Зареждане на модула...</span>
    </div>
  </div>
);

export function App() {
  // Top-level portal partition: 'study' (Academic Academy & OCR) vs 'culture' (General Knowledge & Mysteries)
  const [portalMode, setPortalMode] = useState<'study' | 'culture'>('study');
  const [cultureSubTab, setCultureSubTab] = useState<CultureSubTab>('mysteries');

  const [lessons, setLessons] = useState<LessonData[]>(CURRICULUM_LESSONS);
  const [currentLesson, setCurrentLesson] = useState<LessonData>(CURRICULUM_LESSONS[0]);

  const [activeTab, setActiveTab] = useState<AppNavTab>('home');
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [isQuickLessonModalOpen, setIsQuickLessonModalOpen] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<QuizQuestion[] | null>(null);

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
    setPortalMode(mode);
    if (mode === 'study') {
      setActiveTab('home');
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.hash !== '#culture') {
        window.history.pushState(null, '', '#culture');
      }
      const el = document.getElementById('workspace');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateStudyTab = (tab: AppNavTab) => {
    setPortalMode('study');
    setActiveTab(tab);
    if (tab === 'home') {
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.hash !== `#${tab}`) {
        window.history.pushState(null, '', `#${tab}`);
      }
      const el = document.getElementById('workspace');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateCultureTab = (subTab: CultureSubTab) => {
    setPortalMode('culture');
    setCultureSubTab(subTab);
    if (window.location.hash !== `#${subTab}`) {
      window.history.pushState(null, '', `#${subTab}`);
    }
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLessonSelected = (lesson: LessonData, preferredTab: AppNavTab = 'summary') => {
    setPortalMode('study');
    setCurrentLesson(lesson);
    setActiveTab(preferredTab);
    if (window.location.hash !== `#${preferredTab}`) {
      window.history.pushState(null, '', `#${preferredTab}`);
    }
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // URL Hash Sync for deep linking and browser back/forward buttons
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash || hash === 'home' || hash === 'study') {
        setPortalMode('study');
        setActiveTab('home');
        return;
      }

      if (hash === 'culture') {
        setPortalMode('culture');
        setCultureSubTab('mysteries');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'heritage' || hash === 'unesco' || hash === 'inventions') {
        setPortalMode('culture');
        setCultureSubTab('heritage');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'mysteries' || hash === 'knowledge') {
        setPortalMode('culture');
        setCultureSubTab('mysteries');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'mysticmap') {
        setPortalMode('culture');
        setCultureSubTab('mysticmap');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'timeline') {
        setPortalMode('culture');
        setCultureSubTab('timeline');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'cases' || hash === 'casestudies') {
        setPortalMode('study');
        setActiveTab('cases');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'trivia') {
        setPortalMode('culture');
        setCultureSubTab('trivia');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'myths') {
        setPortalMode('culture');
        setCultureSubTab('myths');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'wonders') {
        setPortalMode('culture');
        setCultureSubTab('wonders');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'wisdom') {
        setPortalMode('culture');
        setCultureSubTab('wisdom');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (STUDY_TABS.includes(hash as AppNavTab)) {
        setPortalMode('study');
        setActiveTab(hash as AppNavTab);
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'catalog') {
        setPortalMode('study');
        setActiveTab('catalog');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash.startsWith('lesson-')) {
        const lessonId = hash.replace('lesson-', '');
        const targetLesson = lessons.find(l => l.id === lessonId);
        if (targetLesson) {
          handleLessonSelected(targetLesson, 'summary');
        }
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
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
    if (window.location.hash !== '#catalog') {
      window.history.pushState(null, '', '#catalog');
    }
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
    { tab: 'oralexam', label: 'Устен изпит', icon: <Mic className="w-3.5 h-3.5 text-indigo-600" /> },
    { tab: 'cases', label: 'Казуси ДЗИ', icon: <Scale className="w-3.5 h-3.5 text-purple-600" /> },
    { tab: 'grammar', label: 'Тренажор БЕЛ', icon: <PenTool className="w-3.5 h-3.5 text-blue-600" /> },
    { tab: 'moduletwo', label: 'Модул 2 БЕЛ', icon: <Feather className="w-3.5 h-3.5 text-purple-600" /> },
    { tab: 'literature', label: 'Литературен Канон', icon: <BookMarked className="w-3.5 h-3.5 text-purple-600" /> },
    { tab: 'mathlab', label: 'Математика & STEM', icon: <Compass className="w-3.5 h-3.5 text-cyan-600" /> },
    { tab: 'sciencelab', label: 'Природни науки Лаб', icon: <FlaskConical className="w-3.5 h-3.5 text-emerald-600" /> },
    { tab: 'atlas', label: 'Атлас Ист. & Гео.', icon: <MapPin className="w-3.5 h-3.5 text-amber-600" /> },
    { tab: 'english', label: 'Английски ДЗИ', icon: <Globe className="w-3.5 h-3.5 text-sky-600" /> },
    { tab: 'civics', label: 'Конституция & ЕС', icon: <Scale className="w-3.5 h-3.5 text-indigo-600" /> },
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
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
        totalLessonsCount={lessons.length}
      />

      {/* Culture Portal Hero (shown only when in Culture mode) */}
      {portalMode === 'culture' && (
        <CultureHero
          onSwitchToStudy={() => handleSelectPortalMode('study')}
          onSelectSubTab={handleNavigateCultureTab}
        />
      )}

      {/* Lazy Modals wrapped in Suspense */}
      <Suspense fallback={null}>
        {/* Smart Scan Modal / Overlay */}
        {isScanModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
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
            onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
          />
        )}

        {/* Official МОН Formula Sheets Modal */}
        {isFormulaModalOpen && (
          <MonFormulaSheetsModal onClose={() => setIsFormulaModalOpen(false)} />
        )}
      </Suspense>

      {/* Main Content Area: Spacious Full-Width Homepage vs Focused Workspace */}
      {portalMode === 'study' && activeTab === 'home' ? (
        <main className="flex-1 w-full bg-slate-50">
          <Suspense fallback={<ViewLoadingSkeleton />}>
            <HomeLandingView
              lessons={lessons}
              onSelectLesson={handleLessonSelected}
              onNavigateTab={handleNavigateStudyTab}
              onOpenScan={() => setIsScanModalOpen(true)}
              onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
              onNavigateCultureTab={handleNavigateCultureTab}
            />
          </Suspense>
        </main>
      ) : (
        <main id="workspace" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
          {portalMode === 'study' ? (
            <div>
            
            {/* Top Workspace Breadcrumbs & Topic Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
              <div className="space-y-1">
                {/* Breadcrumbs Trail */}
                <nav aria-label="Хлябни трохи" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
                  <a
                    href="#study"
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
                  {activeTab === 'planner' ? (
                    <span className="text-emerald-700 font-semibold">Моят План за 6.00 (Хронометър & Седмичен график)</span>
                  ) : activeTab === 'grammar' ? (
                    <span className="text-indigo-700 font-semibold">Тренажор БЕЛ (Модул 1 • Норми на БАН)</span>
                  ) : activeTab === 'moduletwo' ? (
                    <span className="text-purple-700 font-semibold">Модул 2 БЕЛ (Тропи, Пароними & Резюме)</span>
                  ) : activeTab === 'literature' ? (
                    <span className="text-purple-700 font-semibold">Литературен Канон & Тези (41. задача ДЗИ)</span>
                  ) : activeTab === 'mathlab' ? (
                    <span className="text-cyan-700 font-semibold">Математика & STEM Лаб (НВО 10 & ДЗИ)</span>
                  ) : activeTab === 'sciencelab' ? (
                    <span className="text-emerald-700 font-semibold">Лаборатория Природни науки (Биология, Химия и Физика)</span>
                  ) : activeTab === 'oralexam' ? (
                    <span className="text-indigo-700 font-semibold">Устно изпитване пред дъската (Гласов и текстов тренажор за 6.00)</span>
                  ) : activeTab === 'atlas' ? (
                    <span className="text-amber-700 font-semibold">Атлас История & География (Договори & NUTS 2)</span>
                  ) : activeTab === 'english' ? (
                    <span className="text-sky-700 font-semibold">Английски език ДЗИ & НВО (CEFR B1.1 & B2)</span>
                  ) : activeTab === 'civics' ? (
                    <span className="text-indigo-700 font-semibold">Конституция на РБ, Власти & Европейски съюз (ГО & ДЗИ)</span>
                  ) : activeTab === 'blitz' ? (
                    <span className="text-amber-700 font-semibold">Speed Blitz 6.00 (Аркаден 60-секунден Блиц)</span>
                  ) : activeTab === 'cases' ? (
                    <span className="text-purple-700 font-semibold">Казуси за ДЗИ (11.–12. клас)</span>
                  ) : activeTab === 'calculator' ? (
                    <span className="text-indigo-700 font-semibold">МОН Калкулатор & Балообразуване</span>
                  ) : activeTab === 'errorbank' ? (
                    <span className="text-rose-700 font-semibold">Интерактивна банка с грешки</span>
                  ) : activeTab === 'catalog' ? (
                    <span className="text-blue-700 font-semibold">Пълна учебна програма ({lessons.length} теми)</span>
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
                  {activeTab === 'planner' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Моят План за Отличен 6.00 & Изпитен Календар</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                        ДЗИ 12 & НВО 10 • На живо
                      </span>
                    </h2>
                  ) : activeTab === 'grammar' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Тренажор по Граматика, Правопис и Пунктуация</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                        ДЗИ Модул 1 • 20 задачи
                      </span>
                    </h2>
                  ) : activeTab === 'moduletwo' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Лаборатория за Тропи, Фигури, Пароними и Резюме</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 font-semibold">
                        ДЗИ Модул 2 & НВО 10
                      </span>
                    </h2>
                  ) : activeTab === 'literature' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Литературен Канон (15 автори) & Генератор на Тези</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 font-semibold">
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
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
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
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
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
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 font-semibold">
                        ЦДА & ЛИБИ • 11.–12. клас
                      </span>
                    </h2>
                  ) : activeTab === 'calculator' ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      <span>Официален МОН Калкулатор за Оценка и Бал</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
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
                {!['planner', 'grammar', 'moduletwo', 'literature', 'mathlab', 'sciencelab', 'oralexam', 'atlas', 'english', 'civics', 'blitz', 'cases', 'calculator'].includes(activeTab) &&
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
                  totalLessonsCount={lessons.length}
                  onOpenQuickLessonPicker={() => setIsQuickLessonModalOpen(true)}
                  onOpenScan={() => setIsScanModalOpen(true)}
                  onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
                  onOpenCultureContext={() => handleNavigateCultureTab('mysteries')}
                />
              </div>

              {/* Right Column: Clean Main Content Area Strictly Scoped to Active Tab */}
              <div className="lg:col-span-8 xl:col-span-9 min-w-0">
                <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 lg:p-7 shadow-xs transition-all">
                  
                  <Suspense fallback={<ViewLoadingSkeleton />}>
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
                        questions={practiceQuestions || currentLesson.quiz}
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
                          onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
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
                  href="#culture"
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
                        ? 'bg-amber-600 text-white shadow-xs'
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
        <Suspense fallback={null}>
          <LegalPoliciesModal
            isOpen={isPolicyModalOpen}
            onClose={() => setIsPolicyModalOpen(false)}
            initialTab={activePolicyTab}
          />
        </Suspense>
      )}

    </div>
  );
}

export default App;
