import { useState } from 'react';
import { Navbar, type AppNavTab } from './components/Navbar';
import { Hero } from './components/Hero';
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

// New Thematic МОН Modules
import { MonFormulaSheetsModal } from './components/MonFormulaSheetsModal';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { ErrorBankView } from './components/ErrorBankView';
import { HistoryTimelineView } from './components/HistoryTimelineView';
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
  FileText
} from 'lucide-react';
import './App.css';

export function App() {
  const [lessons, setLessons] = useState<LessonData[]>(CURRICULUM_LESSONS);
  const [currentLesson, setCurrentLesson] = useState<LessonData>(CURRICULUM_LESSONS[0]);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<NotebookDiagnosis>(() =>
    classifyAndDiagnoseNotebook(CURRICULUM_LESSONS[0].originalNoteExcerpt, CURRICULUM_LESSONS[0].title)
  );

  const [activeTab, setActiveTab] = useState<AppNavTab>('diagnostic');
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<QuizQuestion[] | null>(null);

  const handleLessonSelected = (lesson: LessonData) => {
    setCurrentLesson(lesson);
    const diag = classifyAndDiagnoseNotebook(lesson.originalNoteExcerpt || lesson.summary.overview, lesson.title);
    setCurrentDiagnosis(diag);
    setActiveTab('diagnostic');
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

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
    setActiveTab('diagnostic');
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartCustomQuizFromErrors = (customQuestions: QuizQuestion[]) => {
    setPracticeQuestions(customQuestions);
    setActiveTab('quiz');
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRecordError = (q: QuizQuestion, chosenIndex: number) => {
    errorBankService.recordQuizError(q, currentLesson, chosenIndex);
  };

  return (
    <div className="min-h-screen bg-[#0b0d17] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-300">
      
      {/* Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t)}
        onOpenScan={() => setIsScanModalOpen(true)}
        onScrollToCatalog={scrollToCatalog}
        onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onScanClick={() => setIsScanModalOpen(true)}
        onSelectSample={handleLessonSelected}
        lessons={lessons}
        currentLesson={currentLesson}
      />

      {/* Smart Scan Modal / Overlay if open */}
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

      {/* Main Interactive Learning Workspace */}
      <main id="workspace" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
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

        {/* Extended Segmented Navigation Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800/90 mb-8 shadow-sm text-center">
          
          <button
            onClick={() => setActiveTab('diagnostic')}
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
            onClick={() => setActiveTab('audit')}
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
            onClick={() => setActiveTab('summary')}
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
            onClick={() => setActiveTab('flashcards')}
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
              setActiveTab('quiz');
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
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'simulator'
                ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Симулатор</span>
          </button>

          <button
            onClick={() => setActiveTab('errorbank')}
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
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'timeline'
                ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/80'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Хронология</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
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
            onClick={() => setActiveTab('chat')}
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

        {/* Tab Content Rendering */}
        <div className="transition-all mb-16">
          {activeTab === 'scan' && (
            <SmartScan
              onScanComplete={handleScanCompleted}
              sampleLessons={lessons}
            />
          )}

          {activeTab === 'diagnostic' && (
            <NotebookDiagnosticView
              diagnosis={currentDiagnosis}
              onProceedToHolyTrinity={() => setActiveTab('summary')}
              onScanAnother={() => setActiveTab('scan')}
            />
          )}

          {activeTab === 'audit' && (
            <NotebookAuditor
              lesson={currentLesson}
              onProceedToHolyTrinity={() => setActiveTab('summary')}
            />
          )}

          {activeTab === 'summary' && (
            <SummaryView
              lesson={currentLesson}
              onProceedToFlashcards={() => setActiveTab('flashcards')}
            />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardsView
              flashcards={currentLesson.flashcards}
              onProceedToQuiz={() => setActiveTab('quiz')}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizView
              questions={practiceQuestions || currentLesson.quiz}
              onReviewFlashcards={() => setActiveTab('flashcards')}
              onOpenChat={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'simulator' && (
            <ExamSimulatorView
              currentLesson={currentLesson}
              onOpenErrorBank={() => setActiveTab('errorbank')}
              onRecordError={handleRecordError}
            />
          )}

          {activeTab === 'errorbank' && (
            <ErrorBankView
              onStartCustomQuiz={handleStartCustomQuizFromErrors}
            />
          )}

          {activeTab === 'timeline' && (
            <HistoryTimelineView />
          )}

          {activeTab === 'generator' && (
            <ExamTestPaperGenerator
              currentLesson={currentLesson}
              allLessons={lessons}
              onSelectLesson={handleLessonSelected}
            />
          )}

          {activeTab === 'chat' && (
            <NotebookChat lesson={currentLesson} />
          )}
        </div>

        {/* Interactive Curriculum Hierarchy Browser */}
        <CurriculumTreeBrowser
          onSelectTopic={handleLessonSelected}
        />

        {/* Subject Catalog & Library Section */}
        <div id="catalog">
          <SubjectCatalog
            lessons={lessons}
            currentLessonId={currentLesson.id}
            onSelectLesson={handleLessonSelected}
            onAddNewScan={() => setIsScanModalOpen(true)}
          />
        </div>

      </main>

      {/* Features Deep Dive Showcase */}
      <FeaturesShowcase />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
