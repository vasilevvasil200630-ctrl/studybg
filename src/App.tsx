import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SmartScan } from './components/SmartScan';
import { NotebookAuditor } from './components/NotebookAuditor';
import { SummaryView } from './components/SummaryView';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { NotebookChat } from './components/NotebookChat';
import { SubjectCatalog } from './components/SubjectCatalog';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { Footer } from './components/Footer';
import { CURRICULUM_LESSONS } from './data/curriculumDatabase';
import type { LessonData } from './types';
import { Camera, BookOpen, Zap, MessageSquare, ChevronRight, CheckSquare } from 'lucide-react';
import './App.css';

export function App() {
  const [lessons, setLessons] = useState<LessonData[]>(CURRICULUM_LESSONS);
  const [currentLesson, setCurrentLesson] = useState<LessonData>(CURRICULUM_LESSONS[0]);
  const [activeTab, setActiveTab] = useState<'scan' | 'audit' | 'summary' | 'flashcards' | 'quiz' | 'chat'>('audit');
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const handleLessonSelected = (lesson: LessonData) => {
    setCurrentLesson(lesson);
    setActiveTab('audit');
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScanCompleted = (newLesson: LessonData) => {
    if (!lessons.some(l => l.id === newLesson.id)) {
      setLessons(prev => [newLesson, ...prev]);
    }
    setCurrentLesson(newLesson);
    setIsScanModalOpen(false);
    setActiveTab('audit');
    const el = document.getElementById('workspace');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0d17] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-300">
      
      {/* Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScan={() => setIsScanModalOpen(true)}
        onScrollToCatalog={scrollToCatalog}
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

      {/* Main Interactive Learning Workspace */}
      <main id="workspace" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
        {/* Workspace Title & Current Active Subject */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
              <span>Работно пространство</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-400 font-bold">{currentLesson.subject}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300 truncate max-w-xs">{currentLesson.title}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <span>{currentLesson.title}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                {currentLesson.grade}
              </span>
              {currentLesson.examType && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                  {currentLesson.examType}
                </span>
              )}
            </h2>
          </div>

          {/* Quick scan button on workspace */}
          <button
            onClick={() => setIsScanModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-all hover:scale-[1.02]"
          >
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Смени или качи нови записки</span>
          </button>
        </div>

        {/* Tab Selection Bar (6 Features) */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 p-1.5 rounded-2xl bg-[#12162a] border border-white/10 mb-8">
          
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'scan'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Camera className="w-4 h-4 text-sky-400" />
            <span>📸 Скенер</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'audit'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-amber-400" />
            <span>📋 Одит за 6-ца</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'summary'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>1. Резюме</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'flashcards'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>2. Флашкарти</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🏆</span>
            <span>3. Тест</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>💬 Чат</span>
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
              questions={currentLesson.quiz}
              onReviewFlashcards={() => setActiveTab('flashcards')}
              onOpenChat={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'chat' && (
            <NotebookChat lesson={currentLesson} />
          )}
        </div>

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
