import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  Scale,
  Calculator,
  BookOpen,
  Camera,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FileText,
  ChevronRight,
  Award,
  BookMarked,
  Compass
} from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import type { CultureSubTab } from './CultureHero';
import { MaturaPlusBridgeBanner } from './MaturaPlusBridgeBanner';

interface HomeLandingViewProps {
  lessons: LessonData[];
  onSelectLesson?: (lesson: LessonData, targetTab?: AppNavTab) => void;
  onNavigateTab: (tab: AppNavTab) => void;
  onOpenScan?: () => void;
  onOpenFormulaModal?: () => void;
  onNavigateCultureTab?: (tab: CultureSubTab) => void;
}

export const HomeLandingView: React.FC<HomeLandingViewProps> = ({
  lessons,
  onNavigateTab,
  onNavigateCultureTab
}) => {
  const [selectedCurriculumTrack, setSelectedCurriculumTrack] = useState<'dzi' | 'nvo' | 'stem'>('dzi');

  // Curated DZI 12 High-Yield Lessons
  const dziLessons = lessons.filter(
    (l) => l.grade.includes('12') || l.grade.includes('11')
  );

  // Curated NVO 10 Lessons
  const nvo10Lessons = lessons.filter((l) => l.grade.includes('10'));

  // STEM / Science Lessons
  const stemLessons = lessons.filter(
    (l) =>
      l.subject.includes('Математика') ||
      l.subject.includes('Биология') ||
      l.subject.includes('Химия') ||
      l.subject.includes('Физика')
  );

  const displayedCurriculum =
    selectedCurriculumTrack === 'dzi'
      ? dziLessons.slice(0, 8)
      : selectedCurriculumTrack === 'nvo'
      ? nvo10Lessons.slice(0, 8)
      : stemLessons.slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: CONFIDENT, SPACIOUS, SOPHISTICATED */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 pb-8 text-center">
        {/* Soft Ambient Radial Background Accent */}
        <div 
          className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <div className="w-[640px] h-[340px] rounded-full bg-gradient-to-tr from-blue-100/60 via-indigo-100/40 to-slate-100/20 blur-3xl opacity-80" />
        </div>

        <div className="max-w-4xl mx-auto px-4 space-y-6">
          
          {/* Main Display Headline (Clean, No Cheesy Text Gradient, per craft-floor) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Национална дигитална академия за НВО 10 и ДЗИ 12
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Официални симулатори по стандартите на МОН, интелигентен AI оценител на есета, автентични исторически извори и интерактивен калкулатор за диплома и университетски бал.
          </p>

          {/* Dedicated Entrance Portal Gateway Card */}
          <div className="pt-2 max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-5 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Портал за достъп до платформата</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Влез в платформата и започни подготовка
                  </h2>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 self-start sm:self-auto">
                  Безплатна регистрация • 100% свободен достъп
                </span>
              </div>

              {/* Main Entrance Call-to-Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Entrance 1: The Study Academy (8.-12. grade) */}
                <button
                  onClick={() => onNavigateTab('summary')}
                  className="group relative p-4 sm:p-5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white flex flex-col justify-between transition-all shadow-sm hover:shadow-md cursor-pointer text-left"
                >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white border border-white/20 shadow-2xs">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-bold text-blue-200">
                        Гимназиален модул
                      </div>
                      <div className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5 pt-0.5">
                        <span>Влез в Учебната академия</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <p className="text-xs text-blue-100/90 leading-relaxed">
                      Пълен достъп до уроците за 8.–12. клас, официални конспекти, одит 6.00, интерактивни флаш карти и тестове.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-blue-200 flex items-center gap-1">
                    <span>Отвори учебното пространство</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Entrance 2: Cultural Context & Mysteries */}
                <button
                  onClick={() => onNavigateCultureTab?.('mysteries')}
                  className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 hover:from-amber-100/80 hover:to-orange-100/80 border border-amber-200/90 text-slate-900 flex flex-col justify-between transition-all shadow-2xs hover:shadow-sm cursor-pointer text-left"
                >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                        Ерудиция & Извори
                      </div>
                      <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5 pt-0.5">
                        <span>Влез в „Обща култура & Загадки“</span>
                        <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Хронология (681–1908), неразгадани български мистерии, ЮНЕСКО паметници и куизове за ерудити.
                    </p>
                  </div>
                  <div className="pt-3.5 text-xs font-bold text-amber-800 flex items-center gap-1">
                    <span>Отвори културния портал</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>

              {/* Informative Platform Assurance Note */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Всички симулатори, калкулатори, казуси и конспекти са достъпни след вход.</span>
                </div>
                <span className="font-semibold text-slate-700 shrink-0">Стандарти на МОН 2026/2027</span>
              </div>
            </div>
          </div>

          {/* Informative Topics Overview Strip (No direct links) */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex flex-wrap items-center justify-center gap-2">
              <span className="font-bold text-slate-800">Обхванати модули:</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">БЕЛ за ДЗИ (11.–12. кл.)</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">История и цивилизации</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">НВО 10. клас</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">Математика & STEM</span>
            </div>
          </div>

          {/* Verified Standards Micro-Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>МОН формат 2026/2027</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
              <span>{lessons.length} пълни учебни конспекта</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-purple-600" />
              <span>12 академични казуса с архивни извори</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI проверка на есе с Gemini 1.5</span>
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 4 PILLARS OF EXCELLENCE: INTERACTIVE & PURPOSEFUL CARDS */}
      {/* ========================================================================= */}
      <section id="pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Четирите стълба за отличен резултат
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Всичко необходимо за покриване на критериите на МОН — от първия модул до есето и кандидатстването във ВУЗ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Pillar 1: Exam Simulator */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/80">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                100-точков Симулатор на МОН
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Реална тримодулна изпитна обстановка с официален хронометър. Автоматично класиране и подробни обяснения към верните отговори.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Модул 1: 30т.</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Модул 2: 40т.</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Модул 3: 30т.</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Включено в Учебната академия</span>
            </div>
          </div>

          {/* Pillar 2: AI Essay Evaluator */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200/80">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                AI Оценител на ЕСЕ & ЛИС
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Напиши текста си в Модул 3 и натисни „Оцени с AI“. Gemini анализира тезата, фактологията, композицията и езика по рубриката на МОН.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Теза: 10т.</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Факти: 8т.</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Език: 6т.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-800">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Критерии за теза, композиция и език</span>
            </div>
          </div>

          {/* Pillar 3: MON Grade & Points Calculator */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200/80">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                МОН Калкулатор оценка & бал
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Официалната линейна формула по Наредба №11. Обратен режим (целева оценка ➔ нужни точки) и балообразуване за прием в университет.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Праг: 30т. = 3.00</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">ВУЗ бал: x3, x4</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-indigo-800">
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>Официална скала по Наредба №11</span>
            </div>
          </div>

          {/* Pillar 4: Primary Historical Sources & Cases */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200/80">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                Казуси & Архивните извори
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Търновската конституция (1879), Сан Стефано и Берлинският диктат (1878), писмата на Левски и Априлското въстание с научни сигнатури.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">12 казуса</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">ЦДА & ЛИБИ</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-purple-800">
              <Scale className="w-4 h-4 text-purple-600" />
              <span>Научни извори от ЦДА и БАН</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CURATED EXAM PATHWAYS: DIRECT TOPIC JUMPS FOR STUDENTS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Какво те очаква в Учебната академия
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Всеки урок включва структуриран конспект, одит на ключови термини, интерактивни флаш карти и автоматичен тест.
              </p>
            </div>

            {/* Curriculum Track Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setSelectedCurriculumTrack('dzi')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCurriculumTrack === 'dzi'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ДЗИ 12. клас (БЕЛ & История)
              </button>
              <button
                onClick={() => setSelectedCurriculumTrack('nvo')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCurriculumTrack === 'nvo'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                НВО 10. клас
              </button>
              <button
                onClick={() => setSelectedCurriculumTrack('stem')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCurriculumTrack === 'stem'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Математика & Природни науки
              </button>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedCurriculum.map((lesson) => {
              const isHistory = lesson.subject.includes('История');
              const isBel = lesson.subject.includes('Български');
              const isMath = lesson.subject.includes('Математика');
              
              const accentColor = isHistory
                ? 'text-amber-800 bg-amber-50 border-amber-200'
                : isBel
                ? 'text-blue-800 bg-blue-50 border-blue-200'
                : isMath
                ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                : 'text-indigo-800 bg-indigo-50 border-indigo-200';

              return (
                <div
                  key={lesson.id}
                  className="p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${accentColor}`}>
                        {lesson.subject.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {lesson.grade.split(' ')[0]}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 transition-colors">
                      {lesson.title}
                    </h3>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {lesson.summary.overview}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1 text-slate-600">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Конспект и одит</span>
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700 font-semibold">
                      Тест ({lesson.quiz.length} в.)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Catalog Informative Note */}
          <div className="pt-6 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              <BookMarked className="w-4 h-4 text-blue-600" />
              <span>Пълният конспект включва всички {lessons.length} теми по програмите на МОН за 8.–12. клас</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SMARTSCAN AI BANNER: NOTEBOOK CAMERA DIAGNOSTIC */}
      {/* ========================================================================= */}
      <section id="smartscan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Camera className="w-3.5 h-3.5 text-blue-400" />
              <span>SmartScan OCR • Изкуствен интелект</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Имаш снимка на тетрадката или учебника?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Качи снимка на своите записки — StudyBG разпознава ръкописния текст, извлича ключовите понятия по конспекта на МОН и генерира персонализиран тест за проверка на знанията за 5 секунди.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold">
              <Camera className="w-4 h-4 text-blue-400" />
              <span>OCR сканиране в Академията</span>
            </div>
            <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Справочници и свитъци на МОН</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CULTURAL CONTEXT & HISTORICAL MYSTERIES (PORTAL 2 BRIDGE) */}
      {/* ========================================================================= */}
      <section id="culture-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-200/70 text-amber-900 border border-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-800" />
              <span>Портал „Обща култура & Загадки“</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Хронология (681–1908), исторически загадки и национално наследство
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Задълбочи литературния и историческия си кръгозор за есето на ДЗИ. Автентични документи, куизове за ерудити и неразгадани български мистерии.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <div className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-100/90 text-amber-950 border border-amber-300 font-bold text-xs">
              <Compass className="w-4 h-4 text-amber-800" />
              <span>Включено в портал „Обща култура & Загадки“</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PARTNERSHIP / SYNERGY BRIDGE TO MATURA+ (FOR 7TH GRADERS) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MaturaPlusBridgeBanner source="hero" />
      </section>

    </div>
  );
};
