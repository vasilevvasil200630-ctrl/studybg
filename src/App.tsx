import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar, type AppNavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { CultureHero, type CultureSubTab } from './components/CultureHero';
import { SmartScan } from './components/SmartScan';
import { NotebookAuditor } from './components/NotebookAuditor';
import { SummaryView } from './components/SummaryView';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { NotebookChat } from './components/NotebookChat';
import { SubjectCatalog } from './components/SubjectCatalog';
import { Footer } from './components/Footer';
import { QuickLessonSwitcherModal } from './components/QuickLessonSwitcherModal';
import { StudySidebar } from './components/StudySidebar';
import { CultureSidebar } from './components/CultureSidebar';
import { NewsletterSection } from './components/NewsletterSection';

// Code-split heavy interactive modules for optimal bundle size and instant initial load
const CultureHubView = lazy(() => import('./components/CultureHubView').then(m => ({ default: m.CultureHubView })));
const ExamSimulatorView = lazy(() => import('./components/ExamSimulatorView').then(m => ({ default: m.ExamSimulatorView })));
const ErrorBankView = lazy(() => import('./components/ErrorBankView').then(m => ({ default: m.ErrorBankView })));
const ExamTestPaperGenerator = lazy(() => import('./components/ExamTestPaperGenerator').then(m => ({ default: m.ExamTestPaperGenerator })));

// МОН Thematic Modules
import { MonFormulaSheetsModal } from './components/MonFormulaSheetsModal';
import { errorBankService } from './services/errorBankService';

import { CURRICULUM_LESSONS } from './data/curriculumDatabase';
import type { LessonData, QuizQuestion } from './types';
import {
  Camera,
  BookOpen,
  Zap,
  MessageSquare,
  ChevronRight,
  CheckSquare,
  GraduationCap,
  AlertCircle,
  Clock,
  Printer,
  Search,
  Home,
  BookMarked
} from 'lucide-react';
import './App.css';

const STUDY_TABS: AppNavTab[] = [
  'scan', 'audit', 'summary', 'flashcards', 'quiz',
  'chat', 'simulator', 'errorbank', 'generator', 'catalog'
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

  const [activeTab, setActiveTab] = useState<AppNavTab>('summary');
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [isQuickLessonModalOpen, setIsQuickLessonModalOpen] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<QuizQuestion[] | null>(null);

  const unresolvedErrorCount = errorBankService.getUnresolvedCount();

  const handleSelectPortalMode = (mode: 'study' | 'culture') => {
    setPortalMode(mode);
    const targetHash = mode === 'study' ? '#study' : '#culture';
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigateStudyTab = (tab: AppNavTab) => {
    setPortalMode('study');
    setActiveTab(tab);
    if (window.location.hash !== `#${tab}`) {
      window.history.pushState(null, '', `#${tab}`);
    }
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
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
      if (!hash) return;

      if (hash === 'culture') {
        setPortalMode('culture');
        setCultureSubTab('mysteries');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'mysteries' || hash === 'knowledge') {
        setPortalMode('culture');
        setCultureSubTab('mysteries');
        const el = document.getElementById('workspace');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'timeline') {
        setPortalMode('culture');
        setCultureSubTab('timeline');
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
      } else if (hash === 'study') {
        setPortalMode('study');
        setActiveTab('summary');
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
    { tab: 'summary', label: 'Конспект', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { tab: 'audit', label: 'Одит 6.00', icon: <CheckSquare className="w-3.5 h-3.5" /> },
    { tab: 'flashcards', label: 'Флаш карти', icon: <Zap className="w-3.5 h-3.5" /> },
    { tab: 'quiz', label: 'Тест', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { tab: 'simulator', label: 'Симулатор', icon: <Clock className="w-3.5 h-3.5" /> },
    { tab: 'errorbank', label: 'Грешки', icon: <AlertCircle className="w-3.5 h-3.5" /> },
    { tab: 'generator', label: 'Група А & Б', icon: <Printer className="w-3.5 h-3.5" /> },
    { tab: 'chat', label: 'AI Ментор', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { tab: 'catalog', label: 'Каталог', icon: <BookMarked className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
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
      />

      {/* Hero Section: Study Hero or Culture Hero based on portalMode */}
      {portalMode === 'study' ? (
        <Hero
          onScanClick={() => setIsScanModalOpen(true)}
          onSelectSample={(l) => handleLessonSelected(l, 'summary')}
          lessons={lessons}
          currentLesson={currentLesson}
          onNavigateTab={handleNavigateStudyTab}
          onScrollToCatalog={scrollToCatalog}
        />
      ) : (
        <CultureHero
          activeCultureTab={cultureSubTab}
          onSelectCultureTab={handleNavigateCultureTab}
          onSwitchToStudy={() => handleSelectPortalMode('study')}
        />
      )}

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
      <QuickLessonSwitcherModal
        isOpen={isQuickLessonModalOpen}
        onClose={() => setIsQuickLessonModalOpen(false)}
        lessons={lessons}
        currentLessonId={currentLesson.id}
        onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
      />

      {/* Official МОН Formula Sheets Modal */}
      {isFormulaModalOpen && (
        <MonFormulaSheetsModal onClose={() => setIsFormulaModalOpen(false)} />
      )}

      {/* Main Workspace with Modern Left Sidebar Layout */}
      <main id="workspace" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
        {/* ========================================================================= */}
        {/* PORTAL 1: УЧЕБНА АКАДЕМИЯ (СНИМАНЕ И ПОДГОТОВКА) */}
        {/* ========================================================================= */}
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
                  <span className="text-blue-700 font-semibold">Учебна академия</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-emerald-700 font-medium">{currentLesson.subject}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-700 font-medium">{currentLesson.grade}</span>
                </nav>

                {/* Lesson Title & Quick Switcher Pill */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
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
                </div>
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
                />
              </div>

              {/* Right Column: Clean Main Content Area Strictly Scoped to Active Tab */}
              <div className="lg:col-span-8 xl:col-span-9 min-w-0">
                <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 lg:p-7 shadow-xs transition-all">
                  
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
                      onOpenChat={() => handleNavigateStudyTab('chat')}
                      onNavigateTab={handleNavigateStudyTab}
                      onRecordError={handleRecordError}
                    />
                  )}

                  {activeTab === 'simulator' && (
                    <Suspense fallback={<ViewLoadingSkeleton />}>
                      <ExamSimulatorView
                        currentLesson={currentLesson}
                        onOpenErrorBank={() => handleNavigateStudyTab('errorbank')}
                        onRecordError={handleRecordError}
                      />
                    </Suspense>
                  )}

                  {activeTab === 'errorbank' && (
                    <Suspense fallback={<ViewLoadingSkeleton />}>
                      <ErrorBankView
                        onStartCustomQuiz={handleStartCustomQuizFromErrors}
                        allLessons={lessons}
                        onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
                      />
                    </Suspense>
                  )}

                  {activeTab === 'generator' && (
                    <Suspense fallback={<ViewLoadingSkeleton />}>
                      <ExamTestPaperGenerator
                        currentLesson={currentLesson}
                        allLessons={lessons}
                        onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
                        onNavigateTab={handleNavigateStudyTab}
                      />
                    </Suspense>
                  )}

                  {activeTab === 'chat' && (
                    <NotebookChat lesson={currentLesson} />
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
                  {cultureSubTab === 'mysteries'
                    ? '📜 Неразгадани случки от историята (14)'
                    : cultureSubTab === 'timeline'
                    ? '⏳ Интерактивна хронология (681–1908 г.)'
                    : cultureSubTab === 'wonders'
                    ? '🗺️ Природни чудеса на България (12)'
                    : cultureSubTab === 'trivia'
                    ? '🧠 Куиз за ерудити (20 въпроса)'
                    : cultureSubTab === 'myths'
                    ? '⚖️ Факт или Мит? (16)'
                    : '🏛️ Златен фонд & Мъдрост на епохите'}
                </span>
              </nav>
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
                    onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
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

      {/* Weekly Exam Prep Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <NewsletterSection />
      </div>

      {/* Footer */}
      <Footer
        onNavigateTab={handleNavigateStudyTab}
        onSelectCultureTab={handleNavigateCultureTab}
        onSelectPortalMode={handleSelectPortalMode}
        onOpenScan={() => setIsScanModalOpen(true)}
        onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
        onScrollToCatalog={scrollToCatalog}
      />

    </div>
  );
}

export default App;
