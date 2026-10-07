import { useState, useEffect } from 'react';
import { Navbar, type AppNavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { CultureHero, type CultureSubTab } from './components/CultureHero';
import { CultureHubView } from './components/CultureHubView';
import { SmartScan } from './components/SmartScan';
import { NotebookDiagnosticView } from './components/NotebookDiagnosticView';
import { NotebookAuditor } from './components/NotebookAuditor';
import { SummaryView } from './components/SummaryView';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { NotebookChat } from './components/NotebookChat';
import { SubjectCatalog } from './components/SubjectCatalog';
import { CurriculumTreeBrowser } from './components/CurriculumTreeBrowser';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { Footer } from './components/Footer';

// МОН Thematic Modules
import { MonFormulaSheetsModal } from './components/MonFormulaSheetsModal';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { ErrorBankView } from './components/ErrorBankView';
import { ExamTestPaperGenerator } from './components/ExamTestPaperGenerator';
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
  ArrowRight
} from 'lucide-react';
import './App.css';

const STUDY_TABS: AppNavTab[] = [
  'scan', 'diagnostic', 'audit', 'summary', 'flashcards', 'quiz',
  'chat', 'simulator', 'errorbank', 'generator'
];

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

      {/* Official МОН Formula Sheets Modal */}
      {isFormulaModalOpen && (
        <MonFormulaSheetsModal onClose={() => setIsFormulaModalOpen(false)} />
      )}

      {/* Main Workspace */}
      <main id="workspace" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
        {/* ========================================================================= */}
        {/* PORTAL 1: УЧЕБНА АКАДЕМИЯ (СНИМАНЕ И ПОДГОТОВКА) */}
        {/* ========================================================================= */}
        {portalMode === 'study' ? (
          <div>
            {/* Workspace Title & Current Active Subject */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
                  <span className="text-slate-500">Учебен предмет</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-emerald-400 font-semibold">{currentLesson.subject}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-slate-300 font-medium truncate max-w-xs">{currentLesson.grade}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex flex-wrap items-center gap-3">
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

            {/* Extended Segmented Academic Navigation Controls */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800/90 mb-8 shadow-sm text-center">
              
              <button
                onClick={() => handleNavigateStudyTab('diagnostic')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'diagnostic'
                    ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <FileSearch className="w-3.5 h-3.5 text-sky-400" />
                <span>Диагноза</span>
              </button>

              <button
                onClick={() => handleNavigateStudyTab('audit')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'audit'
                    ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Одит за 6.00</span>
              </button>

              <button
                onClick={() => handleNavigateStudyTab('summary')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'summary'
                    ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Конспект</span>
              </button>

              <button
                onClick={() => handleNavigateStudyTab('flashcards')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'flashcards'
                    ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Флаш карти</span>
              </button>

              <button
                onClick={() => {
                  setPracticeQuestions(null);
                  handleNavigateStudyTab('quiz');
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                <span>Тест</span>
              </button>

              <button
                onClick={() => handleNavigateStudyTab('simulator')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'simulator'
                    ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Симулатор (100т.)</span>
              </button>

              <button
                onClick={() => handleNavigateStudyTab('errorbank')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'errorbank'
                    ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Грешки</span>
              </button>

              <button
                onClick={() => handleNavigateStudyTab('generator')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'generator'
                    ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Printer className="w-3.5 h-3.5 text-slate-300" />
                <span>Група А & Б</span>
              </button>

              <button
                onClick={() => handleNavigateStudyTab('chat')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-300" />
                <span>Въпроси</span>
              </button>

            </div>

            {/* Academic Tab Content Rendering */}
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
                <ExamSimulatorView
                  currentLesson={currentLesson}
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
            <CurriculumTreeBrowser
              onSelectTopic={(l) => handleLessonSelected(l, 'summary')}
            />

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
            <CultureHubView
              activeSubTab={cultureSubTab}
              onSelectSubTab={setCultureSubTab}
              onSelectLesson={(l) => handleLessonSelected(l, 'summary')}
              onNavigateTab={handleNavigateStudyTab}
              onSwitchToStudy={() => handleSelectPortalMode('study')}
              lessons={lessons}
            />

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
