import React, { useState } from 'react';
import { Printer, FileText, ShieldCheck, Eye, EyeOff, GraduationCap, BookOpen, CheckSquare, Award } from 'lucide-react';
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
  const [includeAnswerSheet, setIncludeAnswerSheet] = useState<boolean>(true);
  const [includeModule3, setIncludeModule3] = useState<boolean>(true);

  const handlePrint = () => {
    window.print();
  };

  // Group A uses original questions; Group B reverses question order AND rotates option order
  const questionsA = currentLesson.quiz;
  const questionsB = [...currentLesson.quiz].reverse().map((q, idx) => {
    const len = q.options.length;
    if (len < 2) return q;
    const shift = (idx % (len - 1)) + 1;
    const rotatedOptions = q.options.map((_, oIdx) => q.options[(oIdx + shift) % len]);
    const newCorrectIndex = (q.correctIndex - shift + len) % len;
    return {
      ...q,
      options: rotatedOptions,
      correctIndex: newCorrectIndex,
    };
  });

  const currentQuestions = activeGroup === 'A' ? questionsA : questionsB;
  const fullChecklist = currentLesson.notebookChecklist || [];
  const checklist =
    activeGroup === 'B' && fullChecklist.length >= 4
      ? [fullChecklist[2], fullChecklist[3]]
      : fullChecklist.slice(0, 2);
  const isVocationalDippk =
    currentLesson.grade.includes('ДИППК') ||
    currentLesson.grade.includes('СПК') ||
    currentLesson.id.startsWith('voc-');

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Configuration */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Инструмент за учители, родители и самопроверка</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Генератор на контролна работа (Група А и Група Б)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
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
            className="bg-white text-slate-800 text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 max-w-[220px]"
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
                ? 'bg-amber-50 text-amber-800 border-amber-200 font-semibold'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs'
            }`}
          >
            {showAnswerKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showAnswerKey ? 'Скрий верните отговори' : 'Покажи ключ'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Принтирай тест</span>
          </button>

          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('quiz')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
                title="Реши този тест интерактивно с таймер и оценка"
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Реши онлайн</span>
              </button>
              <button
                onClick={() => onNavigateTab('summary')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
                title="Отвори пълния конспект за подготовка"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Към Конспекта</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Group & Options Switcher Bar (Hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 pl-1">Вариант:</span>
          <button
            onClick={() => setActiveGroup('A')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeGroup === 'A'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Вариант А (Група 1)
          </button>
          <button
            onClick={() => setActiveGroup('B')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeGroup === 'B'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Вариант Б (Група 2)
          </button>
        </div>

        {/* Paper Component Toggles */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="inline-flex items-center gap-1.5 text-slate-700 cursor-pointer font-medium select-none">
            <input
              type="checkbox"
              checked={includeAnswerSheet}
              onChange={(e) => setIncludeAnswerSheet(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1">
              <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
              МОН Бланка за отговори
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 text-slate-700 cursor-pointer font-medium select-none">
            <input
              type="checkbox"
              checked={includeModule3}
              onChange={(e) => setIncludeModule3(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              Модул 3 (Есе / Аналитични задачи)
            </span>
          </label>

          <div className="text-xs text-slate-500 pl-2 border-l border-slate-200">
            Общ сбор: <strong className="text-slate-800">100 т.</strong>
          </div>
        </div>
      </div>

      {/* Printable Test Paper Sheet */}
      <div className="p-8 sm:p-10 rounded-2xl bg-white text-black shadow-lg border border-slate-200 space-y-6 print:shadow-none print:border-none print:p-0">
        
        {/* Official МОН Barcode & Anonymity Strip */}
        <div className="border-2 border-black p-3.5 space-y-2.5 bg-slate-50/50 print:bg-white text-xs">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="font-mono text-[10px] tracking-widest block text-slate-600 font-bold uppercase">
                РЕПУБЛИКА БЪЛГАРИЯ • МИНИСТЕРСТВО НА ОБРАЗОВАНИЕТО И НАУКАТА
              </span>
              <h2 className="font-black uppercase text-sm tracking-tight text-slate-900">
                ДЪРЖАВЕН ЗРЕЛОСТЕН ИЗПИТ (ДЗИ) / НАЦИОНАЛНО ВЪНШНО ОЦЕНЯВАНЕ (НВО)
              </h2>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm tracking-widest font-black leading-none">
                ||| | |||| | ||| || ||||| |||
              </div>
              <span className="font-mono text-[9px] text-slate-600 block mt-1">
                ФИШ № МОН-{currentLesson.id.slice(0, 4).toUpperCase()}-{activeGroup}-2026
              </span>
            </div>
          </div>

          <div className="border-t border-dashed border-black/60 pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div><strong>Училище:</strong> .....................................</div>
            <div><strong>Населено място:</strong> ..........................</div>
            <div><strong>Квестор 1:</strong> ...................................</div>
            <div><strong>Квестор 2:</strong> ...................................</div>
          </div>

          <div className="text-[9px] text-slate-500 text-center uppercase tracking-wider border-t border-dotted border-black/40 pt-1">
            - - - - - - - - - - - - Отрязък за запечатване в малък плик за анонимност - - - - - - - - - - - -
          </div>
        </div>

        {/* Paper Title Header */}
        <div className="border-b-2 border-black pb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Официален изпитен формат съгласно ДОС на МОН
            </span>
            <span className="text-sm font-black uppercase px-2.5 py-0.5 border-2 border-black bg-slate-100 print:bg-transparent">
              Вариант {activeGroup}
            </span>
          </div>

          <div className="text-center py-1">
            <h1 className="text-xl sm:text-2xl font-black uppercase">
              Изпитна работа по {currentLesson.subject}
            </h1>
            <p className="text-sm font-bold mt-1 text-slate-800">
              Тема: {currentLesson.title} ({currentLesson.grade})
            </p>
          </div>

          {/* Student Fill-in Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-medium border-t border-black/30">
            <div>Ученик: .......................................</div>
            <div>Клас: ............ Номер: ......</div>
            <div>Дата: ........................</div>
            <div className="text-right font-bold">Оценка: ............. (..../100 т.)</div>
          </div>
        </div>

        {/* Official МОН Answer Matrix Sheet (Бланка за отговори) */}
        {includeAnswerSheet && (
          <div className="border-2 border-black p-4 space-y-3 bg-white print:break-before-page">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider">
                  ЛИСТ ЗА ОТГОВОРИ • МИНИСТЕРСТВО НА ОБРАЗОВАНИЕТО И НАУКАТА
                </h3>
                <p className="text-[10px] text-slate-600 mt-0.5">
                  Попълва се само със <strong>син химикал</strong>. Верен отговор се отбелязва със знак <strong>Х</strong>.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black uppercase px-2 py-0.5 border border-black">
                  ВАРИАНТ {activeGroup}
                </span>
              </div>
            </div>

            {/* Bubble Matrix Table */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-800">
                Модул 1: Задачи със структуриран отговор
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {currentQuestions.map((q, qIdx) => (
                  <div key={q.id} className="flex items-center justify-between border border-black/40 px-2 py-1.5 text-xs">
                    <span className="font-bold w-6">{qIdx + 1}.</span>
                    <div className="flex items-center gap-2">
                      {['А', 'Б', 'В', 'Г'].map((letter) => (
                        <div key={letter} className="flex items-center gap-0.5">
                          <span className="w-5 h-5 border border-black flex items-center justify-center font-bold text-[10px]">
                            {letter}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Correction Protocol */}
            <div className="border-t border-black/30 pt-2 flex flex-wrap items-center justify-between text-[9px] text-slate-600 gap-2">
              <span>Ако сгрешите, зачертайте грешния отговор плътно и отбележете новия със знак Х.</span>
              <span className="font-bold text-slate-900">Точки от Модул 1: ....... / {currentQuestions.length * 10} т.</span>
            </div>
          </div>
        )}

        {/* Section 1: Multiple Choice Questions */}
        <div className="space-y-5 pt-2">
          <div className="flex items-center justify-between border-b border-black/40 pb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider">
              I. МОДУЛ 1: Въпроси със структуриран отговор (10 т. за всеки верен отговор)
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
                II. МОДУЛ 2: Въпроси със свободен отговор и дефиниране на понятия
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

        {/* Section 3: Module 3 Extended Analytic Task (ДЗИ 41. задача / ДИППК Задание / НВО разширен отговор) */}
        {includeModule3 && (
          <div className="space-y-3 pt-4 border-t-2 border-black">
            <div className="flex items-center justify-between border-b border-black/40 pb-1">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider">
                  {isVocationalDippk
                    ? 'III. МОДУЛ 3: ДИППК Практическо и инженерно задание (Трета СПК по Наредба № 1) — 30 т.'
                    : currentLesson.subject.includes('литература') || currentLesson.subject.includes('БЕЛ')
                    ? 'III. МОДУЛ 3: Аргументативен текст (Интерпретативно съчинение или есе) — 30 т.'
                    : currentLesson.subject.includes('Математика')
                    ? 'III. МОДУЛ 3: Задачи с пълно аналитично и геометрично решение — 30 т.'
                    : currentLesson.subject.includes('Физика') || currentLesson.subject.includes('Химия') || currentLesson.subject.includes('Биология')
                    ? 'III. МОДУЛ 3: Експериментална и изчислителна STEM задача — 30 т.'
                    : 'III. МОДУЛ 3: Разширен анализ на исторически казус и извори — 30 т.'}
                </h3>
                <p className="text-[10px] text-slate-600">
                  {isVocationalDippk
                    ? 'Разработете технологичен маршрут, принципна схема / програмен модул и посочете приложимите стандарти (БДС / ISO) и правила по ЗБУТ.'
                    : currentLesson.subject.includes('литература') || currentLesson.subject.includes('БЕЛ')
                    ? 'Създайте текст в обем до 4 страници. Формулирайте ясна теза, подкрепена с аргументи и коментар върху текста.'
                    : currentLesson.subject.includes('Математика')
                    ? 'Опишете подробно всички етапи на решението, дефиниционните области и чертежи.'
                    : currentLesson.subject.includes('Физика') || currentLesson.subject.includes('Химия') || currentLesson.subject.includes('Биология')
                    ? 'Запишете всички физични закони / химични уравнения, изведете работната формула и проверете размерностите в SI.'
                    : 'Анализирайте историческия контекст, причинно-следствените връзки и цитираните извори.'}
                </p>
              </div>
              <span className="text-xs font-bold text-slate-800">30 точки</span>
            </div>

            {/* Formatted ruled writing lines or calculation area */}
            <div className="border border-black p-3.5 space-y-3 bg-white min-h-[170px]">
              <div className="text-[11px] font-bold text-slate-900">
                {isVocationalDippk
                  ? `Дипломно / Практическо задание (Вариант ${activeGroup}): „Проектиране, диагностика и технологично изпълнение по тема «${currentLesson.title}» (${currentLesson.subject})“`
                  : currentLesson.subject.includes('литература') || currentLesson.subject.includes('БЕЛ')
                  ? `Тема за съчинение / есе: „Моралните дилеми и цената на компромиса в «${currentLesson.title}»“`
                  : currentLesson.subject.includes('Математика')
                  ? `Задача с пълно доказателство по темата: „${currentLesson.title}“ (Чертожна и изчислителна площ)`
                  : currentLesson.subject.includes('Физика') || currentLesson.subject.includes('Химия') || currentLesson.subject.includes('Биология')
                  ? `Изследователски STEM казус: „Количествен и лабораторен анализ на процесите в «${currentLesson.title}»“`
                  : `Исторически казус: „Последици и историческо значение на събитията около «${currentLesson.title}»“`}
              </div>

              {/* Lined writing guide */}
              <div className="space-y-4 pt-1">
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-dashed border-slate-300">
                <span>
                  {isVocationalDippk
                    ? 'Оценка от Държавна изпитна комисия (Технологична точност 15 т. + БДС/ISO норми 10 т. + ЗБУТ 5 т.):'
                    : 'Оценка на Модул 3 (критерии на МОН за теза, аргументация и езикова норма):'}
                </span>
                <span className="font-bold text-slate-900">Точки: ...... / 30 т.</span>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Teacher / Parent Answer Key (Optional display) */}
        {showAnswerKey && (
          <div className="mt-8 pt-4 border-t-2 border-dashed border-black/60 bg-amber-50 p-4 rounded text-xs print:bg-white print:border-black space-y-3">
            <div className="flex items-center gap-2 font-bold text-amber-900 print:text-black">
              <ShieldCheck className="w-4 h-4" />
              <span>Ключ с верните отговори, обосновки и критерии за оценка (Вариант {activeGroup}):</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {currentQuestions.map((q, idx) => {
                const letters = ['А', 'Б', 'В', 'Г'];
                return (
                  <div key={q.id} className="p-1.5 rounded bg-white border border-amber-300 font-mono text-[11px] print:border-black">
                    Въпрос {idx + 1}: <strong className="text-blue-900 print:text-black">{letters[q.correctIndex]}</strong>
                  </div>
                );
              })}
            </div>

            {/* Detailed methodological explanations for each question */}
            <div className="space-y-1.5 border-t border-amber-200 pt-2">
              <div className="font-bold text-[11px] text-amber-950 print:text-black">
                Методическа обосновка към въпросите от Модул 1 (Вариант {activeGroup}):
              </div>
              {currentQuestions.map((q, idx) => {
                const letters = ['А', 'Б', 'В', 'Г'];
                return (
                  <div key={`exp-${q.id}`} className="text-[11px] text-slate-700 print:text-black leading-snug">
                    <strong>{idx + 1}. ({letters[q.correctIndex]})</strong> {q.explanation}
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
