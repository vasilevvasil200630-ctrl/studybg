import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar, type AppNavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { CultureHero, type CultureSubTab } from './components/CultureHero';
import { SmartScan } from './components/SmartScan';
import { NotebookDiagnosticView } from './components/NotebookDiagnosticView';
import { NotebookAuditor } from './components/NotebookAuditor';
import { SummaryView } from './components/SummaryView';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { NotebookChat } from './components/NotebookChat';
import { SubjectCatalog } from './components/SubjectCatalog';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { Footer } from './components/Footer';
import { QuickLessonSwitcherModal } from './components/QuickLessonSwitcherModal';
import { WayfindingDock } from './components/WayfindingDock';

// Code-split heavy interactive modules for optimal bundle size and instant initial load
const CultureHubView = lazy(() => import('./components/CultureHubView').then(m => ({ default: m.CultureHubView })));
const ExamSimulatorView = lazy(() => import('./components/ExamSimulatorView').then(m => ({ default: m.ExamSimulatorView })));
const ErrorBankView = lazy(() => import('./components/ErrorBankView').then(m => ({ default: m.ErrorBankView })));
const ExamTestPaperGenerator = lazy(() => import('./components/ExamTestPaperGenerator').then(m => ({ default: m.ExamTestPaperGenerator })));
const CurriculumTreeBrowser = lazy(() => import('./components/CurriculumTreeBrowser').then(m => ({ default: m.CurriculumTreeBrowser })));

// МОН Thematic Modules
import { MonFormulaSheetsModal } from './components/MonFormulaSheetsModal';
import { errorBankService } from './services/errorBankService';

import { CURRICULUM_LESSONS } from './data/curriculumDatabase';
import { classifyAndDiagnoseNotebook, type NotebookDiagnosis } from './services/curriculumClassifier';
import type { LessonData, QuizQuestion } from './types';
import {
  Camera,
  BookOpen,
  Zap,
  MessageSquare,
  ChevronRight,
  CheckSquare,
  FileSearch,
  GraduationCap,
  AlertCircle,
  Clock,
  Printer,
  FileText,
  Compass,
  Sparkles,
  ArrowRight,
  Search,
  Home
} from 'lucide-react';
import './App.css';

const STUDY_TABS: AppNavTab[] = [
  'scan', 'diagnostic', 'audit', 'summary', 'flashcards', 'quiz',
  'chat', 'simulator', 'errorbank', 'generator'
];

const ViewLoadingSkeleton = () => (
  <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse flex items-center justify-center min-h-[260px]">
    <div className="flex items-center gap-3 text-slate-400 text-xs sm:text-sm font-medium">
      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
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
  const [currentDiagnosis, setCurrentDiagnosis] = useState<NotebookDiagnosis>(() =>
    classifyAndDiagnoseNotebook(CURRICULUM_LESSONS[0].originalNoteExcerpt, CURRICULUM_LESSONS[0].title)
  );

  const [activeTab, setActiveTab] = useState<AppNavTab>('summary');
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [isQuickLessonModalOpen, setIsQuickLessonModalOpen] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<QuizQuestion[] | null>(null);

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
    const diag = classifyAndDiagnoseNotebook(lesson.originalNoteExcerpt || lesson.summary.overview, lesson.title);
    setCurrentDiagnosis(diag);
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
        const el = document.getElementById('catalog');
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

  const handleScanCompleted = (newLesson: LessonData, diag?: NotebookDiagnosis) => {
    if (!lessons.some(l => l.id === newLesson.id)) {
      setLessons(prev => [newLesson, ...prev]);
    }
    setCurrentLesson(newLesson);
    if (diag) {
      setCurrentDiagnosis(diag);
    } else {
      const calculatedDiag = classifyAndDiagnoseNotebook(newLesson.originalNoteExcerpt || newLesson.summary.overview, newLesson.title);
      setCurrentDiagnosis(calculatedDiag);
    }
    setIsScanModalOpen(false);
    handleNavigateStudyTab('diagnostic');
  };

  const scrollToCatalog = () => {
    setPortalMode('study');
    if (window.location.hash !== '#catalog') {
      window.history.pushState(null, '', '#catalog');
    }
    const el = document.getElementById('catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartCustomQuizFromErrors = (customQuestions: QuizQuestion[]) => {
    setPracticeQuestions(customQuestions);
    handleNavigateStudyTab('quiz');
  };

  const handleRecordError = (q: QuizQuestion, chosenIndex: number) => {
    errorBankService.recordQuizError(q, currentLesson, chosenIndex);
  };

  return (
    <div className="min-h-screen bg-[#0b0d17] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-300">
      
      {/* Sticky Navigation Bar with Portal Mode Switcher */}
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

      {/* Hero Section: Render Study Hero or Culture Hero based on portalMode */}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
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

      {/* Floating Wayfinding & Quick Actions Dock */}
      <WayfindingDock
        portalMode={portalMode}
        onTogglePortalMode={() => handleSelectPortalMode(portalMode === 'study' ? 'culture' : 'study')}
        onOpenQuickLessonPicker={() => setIsQuickLessonModalOpen(true)}
      />

      {/* Main Workspace */}
      <main id="workspace" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
        {/* ========================================================================= */}
        {/* PORTAL 1: УЧЕБНА АКАДЕМИЯ (СНИМАНЕ И ПОДГОТОВКА) */}
        {/* ========================================================================= */}
        {portalMode === 'study' ? (
          <div>
            {/* Workspace Wayfinding Header: Interactive Breadcrumbs & Current Subject */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800/80">
              <div className="space-y-1.5">
                
                {/* Breadcrumbs Trail */}
                <nav aria-label="Хлябни трохи" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-400">
                  <a
                    href="#study"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectPortalMode('study');
                    }}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>StudyBG</span>
                  </a>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-indigo-400 font-semibold">Учебна академия</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-emerald-400 font-medium">{currentLesson.subject}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-slate-300 font-medium">{currentLesson.grade}</span>
                </nav>

                {/* Lesson Title & Quick Switcher Button */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex flex-wrap items-center gap-2.5">
                    <span>{currentLesson.title}</span>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/80 font-medium">
                      {currentLesson.grade}
                    </span>
                    {currentLesson.examType && (
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/25 font-semibold">
                        {currentLesson.examType}
                      </span>
                    )}
                  </h2>

                  <button
                    onClick={() => setIsQuickLessonModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-semibold shadow-sm transition-all cursor-pointer"
                    title="Отвори бързо търсене и смяна на урок"
                  >
                    <Search className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Смени тема ({lessons.length})</span>
                  </button>
                </div>
              </div>

              {/* Quick Action Tools Bar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFormulaModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-semibold shadow-sm transition-all"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Формули МОН</span>
                </button>

                <button
                  onClick={() => setIsScanModalOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Camera className="w-4 h-4 text-indigo-200" />
                  <span>Сканирай записки</span>
                </button>
              </div>
            </div>

            {/* 3-Phase Pedagogical Navigation Controls */}
            <div className="mb-8 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Учебна пътека • 3 стъпки към отличен 6.00:</span>
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Избери модул според текущия етап на твоята подготовка
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
                
                {/* Фаза 1: Научи & Анализирай */}
                <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-2 py-0.5 flex items-center justify-between">
                    <span>1. Научи & Анализирай</span>
                    <span className="text-slate-500">Теория</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => handleNavigateStudyTab('summary')}
                      className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'summary'
                          ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="Синтезиран конспект по темата"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Конспект</span>
                    </button>

                    <button
                      onClick={() => handleNavigateStudyTab('audit')}
                      className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'audit'
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="Провери какво ти липсва в тетрадката за 6.00"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Одит 6.00</span>
                    </button>

                    <button
                      onClick={() => handleNavigateStudyTab('diagnostic')}
                      className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'diagnostic'
                          ? 'bg-sky-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="Диагностика на ръкописа от тетрадка"
                    >
                      <FileSearch className="w-3.5 h-3.5" />
                      <span>Диагноза</span>
                    </button>
                  </div>
                </div>

                {/* Фаза 2: Тествай се */}
                <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 flex items-center justify-between">
                    <span>2. Тествай се</span>
                    <span className="text-slate-500">Практика</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => handleNavigateStudyTab('flashcards')}
                      className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'flashcards'
                          ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="Флаш карти за бързо запомняне"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Карти</span>
                    </button>

                    <button
                      onClick={() => {
                        setPracticeQuestions(null);
                        handleNavigateStudyTab('quiz');
                      }}
                      className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'quiz'
                          ? 'bg-sky-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="10-въпросен тест за контролна работа"
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Тест</span>
                    </button>

                    <button
                      onClick={() => handleNavigateStudyTab('simulator')}
                      className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'simulator'
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="100-точков изпитен симулатор за НВО/ДЗИ"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Симулатор</span>
                    </button>
                  </div>
                </div>

                {/* Фаза 3: Инструменти & AI */}
                <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 px-2 py-0.5 flex items-center justify-between">
                    <span>3. Инструменти & AI</span>
                    <span className="text-slate-500">Напредък</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => handleNavigateStudyTab('errorbank')}
                      className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'errorbank'
                          ? 'bg-rose-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="Банка с грешки за поправителен тест"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Грешки</span>
                    </button>

                    <button
                      onClick={() => handleNavigateStudyTab('generator')}
                      className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'generator'
                          ? 'bg-slate-700 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="Генерирай изпитни листове Група А & Група Б"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Група А & Б</span>
                    </button>

                    <button
                      onClick={() => handleNavigateStudyTab('chat')}
                      className={`flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'chat'
                          ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                      title="Интелигентен ментор за въпроси към урока"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ментор</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Academic Tab Content Rendering with Suspense */}
            <div className="transition-all mb-12">
              {activeTab === 'scan' && (
                <SmartScan
                  onScanComplete={handleScanCompleted}
                  sampleLessons={lessons}
                />
              )}

              {activeTab === 'diagnostic' && (
                <NotebookDiagnosticView
                  diagnosis={currentDiagnosis}
                  onProceedToHolyTrinity={() => handleNavigateStudyTab('summary')}
                  onScanAnother={() => setIsScanModalOpen(true)}
                  onNavigateTab={handleNavigateStudyTab}
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
            </div>

            {/* Cross-Portal Bridge Banner: Study -> General Knowledge */}
            <div className="mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/30 border border-amber-500/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                  <Compass className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Любопитен си за историческите загадки и неизвестното?</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Разгледай неразгаданите случки от историята (гроба на Левски, смъртта на Ботев, Варненското злато), интерактивния куиз и развенчаните митове.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSelectPortalMode('culture')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors whitespace-nowrap self-stretch md:self-auto justify-center"
              >
                <span>Към раздел „Обща култура“</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Curriculum Hierarchy Browser */}
            <Suspense fallback={<ViewLoadingSkeleton />}>
              <CurriculumTreeBrowser
                onSelectTopic={(l) => handleLessonSelected(l, 'summary')}
              />
            </Suspense>

            {/* Subject Catalog & Library Section */}
            <div id="catalog">
              <SubjectCatalog
                lessons={lessons}
                currentLessonId={currentLesson.id}
                onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
                onAddNewScan={() => setIsScanModalOpen(true)}
              />
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* PORTAL 2: ОБЩА КУЛТУРА & ЗАГАДКИ */
          /* ========================================================================= */
          <div>
            {/* Culture Wayfinding Header: Breadcrumbs Trail */}
            <div className="mb-6 pb-4 border-b border-slate-800/80">
              <nav aria-label="Хлябни трохи" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-400">
                <a
                  href="#culture"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectPortalMode('culture');
                  }}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>StudyBG</span>
                </a>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-amber-400 font-semibold">Обща култура & Загадки</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-slate-300 font-medium">
                  {cultureSubTab === 'mysteries'
                    ? '📜 Неразгадани случки от историята и географията'
                    : cultureSubTab === 'timeline'
                    ? '⏳ Интерактивна хронология (681–1908 г.)'
                    : cultureSubTab === 'trivia'
                    ? '🧠 Куиз за обща култура (15 въпроса)'
                    : '⚖️ Факт или Мит? (Развенчаване)'}
                </span>
              </nav>
            </div>

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

            {/* Cross-Portal Bridge Banner: General Knowledge -> Study */}
            <div className="mt-14 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-sky-950/30 border border-indigo-500/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Готвиш се за училище, контролно или матура (НВО/ДЗИ)?</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Качи снимка на тетрадката си за OCR одит за 6.00, синтезирани конспекти, флаш карти и 100-точков изпитен симулатор.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSelectPortalMode('study')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors whitespace-nowrap self-stretch md:self-auto justify-center"
              >
                <span>Към „Учебна академия & Снимане“</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Features Deep Dive Showcase */}
      <FeaturesShowcase
        onNavigateTab={handleNavigateStudyTab}
        onOpenScan={() => setIsScanModalOpen(true)}
      />

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
