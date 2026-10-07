import React, { useState } from 'react';
import { Printer, FileText, ShieldCheck, Eye, EyeOff, GraduationCap, BookOpen } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';

interface ExamTestPaperGeneratorProps {
  currentLesson: LessonData;
  allLessons: LessonData[];
  onSelectLesson: (lesson: LessonData) => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

export const ExamTestPaperGenerator: React.FC<ExamTestPaperGeneratorProps> = ({
  currentLesson,
  allLessons,
  onSelectLesson,
  onNavigateTab
}) => {
  const [activeGroup, setActiveGroup] = useState<'A' | 'B'>('A');
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  // Group A uses original questions; Group B inverts order or uses alternating questions
  const questionsA = currentLesson.quiz;
  const questionsB = [...currentLesson.quiz].reverse();

  const currentQuestions = activeGroup === 'A' ? questionsA : questionsB;
  const checklist = currentLesson.notebookChecklist || [];

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Configuration */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Инструмент за учители, родители и самопроверка</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            Генератор на контролна работа (Група А и Група Б)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Генерирайте готова контролна работа в два паралелни варианта за двата чина в клас с точкова система и ключ с верните отговори.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Select Lesson dropdown */}
          <select
            value={currentLesson.id}
            onChange={(e) => {
              const target = allLessons.find(l => l.id === e.target.value);
              if (target) onSelectLesson(target);
            }}
            className="bg-slate-950 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500 max-w-[220px]"
          >
            {allLessons.map(l => (
              <option key={l.id} value={l.id}>
                {l.subject} - {l.title}
              </option>
            ))}
          </select>

          {/* Toggle Answer Key */}
          <button
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              showAnswerKey
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            {showAnswerKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showAnswerKey ? 'Скрий верните отговори' : 'Покажи ключ'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Принтирай тест</span>
          </button>

          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('quiz')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                title="Реши този тест интерактивно с таймер и оценка"
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                <span>Реши онлайн</span>
              </button>
              <button
                onClick={() => onNavigateTab('summary')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                title="Отвори пълния конспект за подготовка"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Към Конспекта</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Group Switcher Bar (Hidden when printing) */}
      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 print:hidden">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-400 pl-2">Избери вариант:</span>
          <button
            onClick={() => setActiveGroup('A')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeGroup === 'A'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Вариант А (Група 1)
          </button>
          <button
            onClick={() => setActiveGroup('B')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeGroup === 'B'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Вариант Б (Група 2)
          </button>
        </div>

        <div className="text-xs text-slate-500 pr-2">
          Общ брой точки: <strong className="text-slate-300">100 т.</strong>
        </div>
      </div>

      {/* Printable Test Paper Sheet */}
      <div className="p-8 sm:p-10 rounded-2xl bg-white text-black shadow-2xl border border-slate-200 space-y-6 print:shadow-none print:border-none print:p-0">
        
        {/* Paper Header */}
        <div className="border-b-2 border-black pb-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Министерство на образованието и науката • Формат за контролна работа
            </span>
            <span className="text-sm font-black uppercase px-2 py-0.5 border-2 border-black">
              Вариант {activeGroup}
            </span>
          </div>

          <div className="text-center py-2">
            <h1 className="text-xl sm:text-2xl font-black uppercase">
              Контролна работа по {currentLesson.subject}
            </h1>
            <p className="text-sm font-bold mt-1 text-slate-800">
              Тема: {currentLesson.title} ({currentLesson.grade})
            </p>
          </div>

          {/* Student Fill-in Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-medium">
            <div>Ученик: .......................................</div>
            <div>Клас: ............ Номер: ......</div>
            <div>Дата: ........................</div>
            <div className="text-right font-bold">Оценка: ............. (..../100 т.)</div>
          </div>
        </div>

        {/* Section 1: Multiple Choice Questions */}
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-black/40 pb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider">
              I. Въпроси със структуриран отговор (10 т. за всеки верен отговор)
            </h3>
            <span className="text-xs text-slate-600 font-medium">Общо: {currentQuestions.length * 10} т.</span>
          </div>

          <div className="space-y-4">
            {currentQuestions.map((q, idx) => (
              <div key={q.id} className="space-y-1.5 text-xs">
                <div className="font-bold flex items-start gap-2">
                  <span>{idx + 1}.</span>
                  <span>{q.question}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pl-4 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const letters = ['А', 'Б', 'В', 'Г'];
                    return (
                      <div key={oIdx} className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center font-bold text-[10px]">
                          {letters[oIdx]}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Open Conceptual Question (From checklist) */}
        {checklist.length > 0 && (
          <div className="space-y-3 pt-3">
            <div className="flex items-center justify-between border-b border-black/40 pb-1">
              <h3 className="text-xs font-bold uppercase tracking-wider">
                II. Въпроси със свободен отговор и дефиниране на понятия
              </h3>
              <span className="text-xs text-slate-600 font-medium">Общо: 30 т.</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <p className="font-bold">
                  {currentQuestions.length + 1}. Запишете основната дефиниция или зависимост за: „{checklist[0].requirement}“ (15 т.)
                </p>
                <div className="h-14 border border-dashed border-slate-400 rounded p-2 text-slate-400 italic">
                  Място за отговор на ученика...
                </div>
              </div>

              {checklist.length > 1 && (
                <div className="space-y-1">
                  <p className="font-bold">
                    {currentQuestions.length + 2}. Обяснете защо се изисква: „{checklist[1].whyNeeded}“ (15 т.)
                  </p>
                  <div className="h-14 border border-dashed border-slate-400 rounded p-2 text-slate-400 italic">
                    Място за отговор на ученика...
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 3: Teacher / Parent Answer Key (Optional display) */}
        {showAnswerKey && (
          <div className="mt-8 pt-4 border-t-2 border-dashed border-black/60 bg-amber-50 p-4 rounded text-xs print:bg-white print:border-black">
            <div className="flex items-center gap-2 mb-2 font-bold text-amber-900 print:text-black">
              <ShieldCheck className="w-4 h-4" />
              <span>Ключ с верните отговори и критерии за оценка (Вариант {activeGroup}):</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {currentQuestions.map((q, idx) => {
                const letters = ['А', 'Б', 'В', 'Г'];
                return (
                  <div key={q.id} className="p-1.5 rounded bg-white border border-amber-300 font-mono text-[11px] print:border-black">
                    Въпрос {idx + 1}: <strong className="text-indigo-900 print:text-black">{letters[q.correctIndex]}</strong>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-700 leading-relaxed space-y-1 border-t border-amber-200 pt-2 print:text-black">
              <div><strong>Скала за превръщане на точките в оценка:</strong></div>
              <div>• 0 – 29 т. = Слаб 2.00 | • 30 – 58 т. = Среден 3.00 | • 59 – 74 т. = Добър 4.00</div>
              <div>• 75 – 89 т. = Мн. добър 5.00 | • 90 – 100 т. = Отличен 6.00</div>
            </div>
          </div>
        )}

        {/* Paper Footer */}
        <div className="pt-4 border-t border-black text-center text-[10px] text-slate-600 font-medium">
          StudyBG Учебна платформа • Генерирано за контролна работа съгласно ДОС на МОН
        </div>

      </div>

    </div>
  );
};
