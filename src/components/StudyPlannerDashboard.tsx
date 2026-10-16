import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Target,
  CheckCircle2,
  Flame,
  Award,
  BookOpen,
  BookMarked,
  PenTool,
  AlertCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Printer
} from 'lucide-react';
import {
  studyProgressService,
  MON_OFFICIAL_EXAMS,
  type TargetExamTrack,
  type UserStudyProgress
} from '../services/studyProgressService';
import { errorBankService } from '../services/errorBankService';
import { LITERATURE_CANON } from '../data/literatureDatabase';
import { GRAMMAR_QUESTIONS } from '../data/grammarDatabase';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';
import { ExcellenceCertificateModal } from './ExcellenceCertificateModal';

interface StudyPlannerDashboardProps {
  lessons: LessonData[];
  onNavigateTab: (tab: AppNavTab) => void;
  onSelectLesson: (lesson: LessonData, preferredTab?: AppNavTab) => void;
}

interface WeeklyPlanDay {
  id: string;
  dayName: string;
  focusBadge: string;
  title: string;
  description: string;
  targetTab: AppNavTab;
  actionLabel: string;
  accentClass: string;
}

export const StudyPlannerDashboard: React.FC<StudyPlannerDashboardProps> = ({
  lessons,
  onNavigateTab,
  onSelectLesson
}) => {
  const [progress, setProgress] = useState<UserStudyProgress>(() =>
    studyProgressService.getProgress()
  );
  const [now, setNow] = useState<Date>(() => new Date());
  const [checklistTab, setChecklistTab] = useState<'authors' | 'lessons'>('authors');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Tick every second for the live official exam countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeExam =
    MON_OFFICIAL_EXAMS.find(e => e.id === progress.targetExam) || MON_OFFICIAL_EXAMS[0];
  const examDate = studyProgressService.getNextExamTimestamp(activeExam);
  const diffMs = Math.max(0, examDate.getTime() - now.getTime());

  const countdownDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const countdownHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const countdownMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const countdownSeconds = Math.floor((diffMs / 1000) % 60);

  // Readiness calculations across the 4 core pillars
  const totalAuthors = LITERATURE_CANON.length;
  const masteredAuthorsCount = progress.masteredAuthorIds.length;
  const authorsPercent = Math.min(100, Math.round((masteredAuthorsCount / totalAuthors) * 100));

  const totalLessons = lessons.length;
  const masteredLessonsCount = progress.masteredLessonIds.length;
  const lessonsPercent = Math.min(100, Math.round((masteredLessonsCount / Math.max(1, totalLessons)) * 100));

  const totalGrammarTarget = GRAMMAR_QUESTIONS.length;
  const grammarPercent = Math.min(
    100,
    Math.round((progress.grammarQuestionsSolved / Math.max(1, totalGrammarTarget)) * 100)
  );

  const allErrors = errorBankService.getAllErrors();
  const unresolvedErrorsCount = allErrors.filter(e => !e.resolved).length;
  const errorCleanPercent =
    allErrors.length === 0
      ? 100
      : Math.round(((allErrors.length - unresolvedErrorsCount) / allErrors.length) * 100);

  const overallReadinessPercent = Math.round(
    authorsPercent * 0.3 +
      lessonsPercent * 0.3 +
      grammarPercent * 0.25 +
      errorCleanPercent * 0.15
  );

  const handleSelectExamTrack = (track: TargetExamTrack) => {
    const updated = studyProgressService.updateSettings({ targetExam: track });
    setProgress(updated);
  };

  const handleSelectDailyGoal = (minutes: 30 | 45 | 60 | 90) => {
    const updated = studyProgressService.updateSettings({ dailyGoalMinutes: minutes });
    setProgress(updated);
  };

  const handleSelectTargetGrade = (grade: 5.0 | 5.5 | 6.0) => {
    const updated = studyProgressService.updateSettings({ targetGrade: grade });
    setProgress(updated);
  };

  const handleToggleAuthor = (authorId: string) => {
    const updated = studyProgressService.toggleMasteredAuthor(authorId);
    setProgress(updated);
  };

  const handleToggleLesson = (lessonId: string) => {
    const updated = studyProgressService.toggleMasteredLesson(lessonId);
    setProgress(updated);
  };

  const handleToggleDay = (dayId: string) => {
    const updated = studyProgressService.toggleCompletedDay(dayId);
    setProgress(updated);
  };

  // Dynamic 7-day study schedule tailored to targetExam and dailyGoalMinutes
  const theoryMin = Math.round(progress.dailyGoalMinutes * 0.4);
  const practiceMin = progress.dailyGoalMinutes - theoryMin;

  const getWeeklySchedule = (track: TargetExamTrack): WeeklyPlanDay[] => {
    if (track === 'dzi_history') {
      return [
        {
          id: 'mon',
          dayName: 'Понеделник',
          focusBadge: `${theoryMin} мин конспект + ${practiceMin} мин тест`,
          title: 'Българско възраждане и Априлско въстание (1876)',
          description: 'Преговор на хронологията, комитетската мрежа на Левски и решаване на 10 тестови въпроса.',
          targetTab: 'summary',
          actionLabel: 'Отвори конспекта',
          accentClass: 'border-amber-200 bg-amber-50/40'
        },
        {
          id: 'tue',
          dayName: 'Вторник',
          focusBadge: `${progress.dailyGoalMinutes} мин архивни извори`,
          title: 'Анализ на исторически документи (Сан Стефано, Берлин и Търновска конституция)',
          description: 'Работа с автентични дипломатически текстове от ЦДА за Модул 2 и Модул 3 на ДЗИ.',
          targetTab: 'cases',
          actionLabel: 'Към Казуси за ДЗИ',
          accentClass: 'border-purple-200 bg-purple-50/40'
        },
        {
          id: 'wed',
          dayName: 'Сряда',
          focusBadge: `${progress.dailyGoalMinutes} мин БЕЛ Модул 1`,
          title: 'Пълен член, запетаи и слято писане за задължителната матура по БЕЛ',
          description: 'Решаване на 10 капана по нормите на БАН със следене на серията от верни отговори.',
          targetTab: 'grammar',
          actionLabel: 'Към Тренажор БЕЛ',
          accentClass: 'border-blue-200 bg-blue-50/40'
        },
        {
          id: 'thu',
          dayName: 'Четвъртък',
          focusBadge: `${theoryMin} мин одит + ${practiceMin} мин карти`,
          title: 'Следосвобожденска България: Съединението (1885) и Независимостта (1908)',
          description: 'Одит на ключовите дати и личности чрез флаш карти за активно припомняне.',
          targetTab: 'flashcards',
          actionLabel: 'Отвори Флаш карти',
          accentClass: 'border-emerald-200 bg-emerald-50/40'
        },
        {
          id: 'fri',
          dayName: 'Петък',
          focusBadge: `${progress.dailyGoalMinutes} мин Литературен канон`,
          title: 'Подготовка за 41. задача: Вазов („Епопея на забравените“) и Ботев',
          description: 'Извличане на 3 микротези и ключови цитати за темата „Паметта, свободата и дългът“.',
          targetTab: 'literature',
          actionLabel: 'Отвори Канона',
          accentClass: 'border-purple-200 bg-purple-50/40'
        },
        {
          id: 'sat',
          dayName: 'Събота',
          focusBadge: 'Пълна изпитна симулация (100 т.)',
          title: 'Тримодулен изпитен симулатор с AI проверка на писмената теза',
          description: 'Решаване на пълен вариант с хронометър и автоматично оценяване по скалата на МОН.',
          targetTab: 'simulator',
          actionLabel: 'Стартирай Симулатора',
          accentClass: 'border-amber-300 bg-amber-50/60'
        },
        {
          id: 'sun',
          dayName: 'Неделя',
          focusBadge: 'Анализ и корекция на грешките',
          title: 'Преглед на Банката с грешки и изчисляване на целевия ВУЗ бал',
          description: 'Изчистване на сгрешените въпроси от седмицата и сверка на точките по Наредба №11.',
          targetTab: 'errorbank',
          actionLabel: 'Отвори Банка с грешки',
          accentClass: 'border-rose-200 bg-rose-50/40'
        }
      ];
    }

    if (track === 'nvo_10') {
      return [
        {
          id: 'mon',
          dayName: 'Понеделник',
          focusBadge: `${progress.dailyGoalMinutes} мин Правопис и Граматика`,
          title: 'Членуване (-ът/-я), двойно „нн“ и учтива форма за НВО 10. клас',
          description: 'Интензивна тренировка върху първите 10 езикови задачи от формата на МОН за 10. клас.',
          targetTab: 'grammar',
          actionLabel: 'Към Тренажор БЕЛ',
          accentClass: 'border-blue-200 bg-blue-50/40'
        },
        {
          id: 'tue',
          dayName: 'Вторник',
          focusBadge: `${theoryMin} мин конспект + ${practiceMin} мин тест`,
          title: 'Литература за 10. клас: Алеко Константинов („Бай Ганьо“) и Елин Пелин',
          description: 'Преговор на сюжетите, конфликтите и нравствените послания с бърз 10-въпросен тест.',
          targetTab: 'summary',
          actionLabel: 'Отвори Конспекта',
          accentClass: 'border-indigo-200 bg-indigo-50/40'
        },
        {
          id: 'wed',
          dayName: 'Сряда',
          focusBadge: `${progress.dailyGoalMinutes} мин Математика НВО`,
          title: 'Алгебра и геометрия за 10. клас: Прогресии, тригонометрия и функции',
          description: 'Преговор на формулите от справочника на МОН и решаване на задачи от каталога.',
          targetTab: 'catalog',
          actionLabel: 'Избери урок по Математика',
          accentClass: 'border-emerald-200 bg-emerald-50/40'
        },
        {
          id: 'thu',
          dayName: 'Четвъртък',
          focusBadge: `${progress.dailyGoalMinutes} мин Пунктуация`,
          title: 'Запетаи в сложно съставно изречение и деепричастни обороти',
          description: 'Овладяване на правилата за пунктуация и пароними чрез интерактивния тренажор.',
          targetTab: 'grammar',
          actionLabel: 'Към Пунктуация',
          accentClass: 'border-blue-200 bg-blue-50/40'
        },
        {
          id: 'fri',
          dayName: 'Петък',
          focusBadge: `${progress.dailyGoalMinutes} мин Тези и Резюме`,
          title: 'Формулиране на теза и аргументация (Дебелянов, Яворов, Йовков)',
          description: 'Работа с цитатника и структурираните тези за последната задача на НВО.',
          targetTab: 'literature',
          actionLabel: 'Към Литературен Канон',
          accentClass: 'border-purple-200 bg-purple-50/40'
        },
        {
          id: 'sat',
          dayName: 'Събота',
          focusBadge: 'Изпитен Симулатор (90 мин)',
          title: 'Пълен пробен изпит за 10. клас със засичане на време',
          description: 'Проверка на скоростта на работа и автоматична оценка с AI обратна връзка.',
          targetTab: 'simulator',
          actionLabel: 'Стартирай Симулатора',
          accentClass: 'border-amber-300 bg-amber-50/60'
        },
        {
          id: 'sun',
          dayName: 'Неделя',
          focusBadge: 'Корекция и Одит 6.00',
          title: 'Разбор на допуснатите грешки и одит на научените термини',
          description: 'Превръщане на всяко колебание от седмицата в сигурни точки.',
          targetTab: 'errorbank',
          actionLabel: 'Към Банка с грешки',
          accentClass: 'border-rose-200 bg-rose-50/40'
        }
      ];
    }

    // Default: DZI BEL 12th grade (or STEM with BEL mandatory)
    return [
      {
        id: 'mon',
        dayName: 'Понеделник',
        focusBadge: `${progress.dailyGoalMinutes} мин Модул 1 (Граматика)`,
        title: 'Пълен и кратък член (-ът/-я) + Слято, полуслято и разделно писане',
        description: 'Упражняване на капаните с обърнат словоред и сложни прилагателни по речника на БАН.',
        targetTab: 'grammar',
        actionLabel: 'Отвори Тренажор БЕЛ',
        accentClass: 'border-blue-200 bg-blue-50/40'
      },
      {
        id: 'tue',
        dayName: 'Вторник',
        focusBadge: `${progress.dailyGoalMinutes} мин Литературен канон`,
        title: 'Родното и чуждото / Свободата: Ботев, Вазов, Алеко и Талев',
        description: 'Преговор на жанровете, основните конфликти и запаметяване на 4 ключови цитата за 41. задача.',
        targetTab: 'literature',
        actionLabel: 'Отвори Канона',
        accentClass: 'border-purple-200 bg-purple-50/40'
      },
      {
        id: 'wed',
        dayName: 'Сряда',
        focusBadge: `${theoryMin} мин конспект + ${practiceMin} мин одит`,
        title: 'Модернизъм и Символизъм: Пенчо Славейков, Яворов и Дебелянов',
        description: 'Анализ на мотивите за страданието, дома и раздвоената душа + Одит 6.00 на тетрадката.',
        targetTab: 'audit',
        actionLabel: 'Отвори Одит 6.00',
        accentClass: 'border-emerald-200 bg-emerald-50/40'
      },
      {
        id: 'thu',
        dayName: 'Четвъртък',
        focusBadge: `${progress.dailyGoalMinutes} мин Пунктуация и Норма`,
        title: 'Запетаи в сложни съставни изречения, деепричастия, двойно „нн“ и бройна форма',
        description: 'Покриване на всички пунктуационни правила за безгрешен Модул 1 и езикова култура в есето.',
        targetTab: 'grammar',
        actionLabel: 'Към Пунктуация',
        accentClass: 'border-indigo-200 bg-indigo-50/40'
      },
      {
        id: 'fri',
        dayName: 'Петък',
        focusBadge: `${progress.dailyGoalMinutes} мин Модул 3 (Тези)`,
        title: 'Човекът в обществото, вярата и изборът: Елин Пелин, Йовков, Смирненски, Вапцаров, Димов',
        description: 'Съставяне на 3-компонентна теза за ЛИС и есе с помощта на генератора на тези.',
        targetTab: 'literature',
        actionLabel: 'Към Генератор на тези',
        accentClass: 'border-purple-200 bg-purple-50/40'
      },
      {
        id: 'sat',
        dayName: 'Събота',
        focusBadge: 'Пълна симулация на матурата (100 т.)',
        title: '100-точков Симулатор на МОН + AI Оценител на Есе/ЛИС',
        description: 'Решаване на Модул 1, Модул 2 и написване на текст в Модул 3 с проверка по критериите на МОН.',
        targetTab: 'simulator',
        actionLabel: 'Стартирай 100т. Симулатор',
        accentClass: 'border-amber-300 bg-amber-50/60'
      },
      {
        id: 'sun',
        dayName: 'Неделя',
        focusBadge: 'Ревизия на грешките & ВУЗ Бал',
        title: 'Нулиране на Банката с грешки и проверка на бала по Наредба №11',
        description: 'Пререшаване на сгрешените въпроси и изчисляване на нужните точки за желаната специалност.',
        targetTab: 'calculator',
        actionLabel: 'Отвори МОН Калкулатор',
        accentClass: 'border-indigo-200 bg-indigo-50/40'
      }
    ];
  };

  const weeklySchedule = getWeeklySchedule(progress.targetExam);
  const completedDaysCount = progress.completedWeeklyDays.length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* ========================================================================= */}
      {/* 1. HERO COUNTDOWN & OVERALL READINESS SCORE */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          
          {/* Top Bar: Badge & Target Exam Selector Pills */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Calendar className="w-3.5 h-3.5" />
                <span>Официален изпитен календар на МОН • План за Отличен 6.00</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white pt-1">
                {activeExam.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                {activeExam.officialNote}
              </p>
            </div>

            {/* Exam Track Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {MON_OFFICIAL_EXAMS.map(exam => {
                const isSelected = exam.id === progress.targetExam;
                return (
                  <button
                    key={exam.id}
                    onClick={() => handleSelectExamTrack(exam.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs ring-1 ring-blue-400'
                        : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                    }`}
                  >
                    {exam.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Countdown Grid + Overall Readiness Index */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 7 cols: Live Countdown Timer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Clock className="w-4 h-4" />
                <span>Оставащо време до изпитното утро ({examDate.toLocaleDateString('bg-BG')} г., 08:30 ч.):</span>
              </div>

              <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/15 text-center backdrop-blur-xs">
                  <div className="text-2xl sm:text-4xl font-black font-mono text-white tracking-tight">
                    {countdownDays}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-200 mt-1">
                    Дни
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/15 text-center backdrop-blur-xs">
                  <div className="text-2xl sm:text-4xl font-black font-mono text-white tracking-tight">
                    {String(countdownHours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-200 mt-1">
                    Часа
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/15 text-center backdrop-blur-xs">
                  <div className="text-2xl sm:text-4xl font-black font-mono text-white tracking-tight">
                    {String(countdownMinutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-200 mt-1">
                    Минути
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-center backdrop-blur-xs">
                  <div className="text-2xl sm:text-4xl font-black font-mono text-amber-300 tracking-tight">
                    {String(countdownSeconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-200 mt-1">
                    Секунди
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300 pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 font-mono">
                  Времетраене: {activeExam.durationMinutes} мин
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 font-mono">
                  Максимум: {activeExam.maxPoints} т.
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono font-bold">
                  Праг за успех: {activeExam.passPoints} т. (Среден 3.00)
                </span>
              </div>
            </div>

            {/* Right 5 cols: Personal Readiness Gauge */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>Индекс на готовност</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Цел: Отличен ({progress.targetGrade.toFixed(2)})
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                  {overallReadinessPercent}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.max(5, overallReadinessPercent)}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-200">
                <div className="flex items-center gap-1.5">
                  <BookMarked className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                  <span>Автори: <strong>{masteredAuthorsCount}/{totalAuthors}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                  <span>Уроци: <strong>{masteredLessonsCount}/{totalLessons}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                  <span>Модул 1 БЕЛ: <strong>{progress.grammarQuestionsSolved} решени</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Рекорд серия: <strong>{progress.grammarBestStreak} поредни</strong></span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Генерирай Грамота / Сертификат за 6.00 (PDF / A4)</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. FOUR PILLARS OF READINESS BREAKDOWN CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Literature Canon Mastery */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
                <BookMarked className="w-4 h-4" />
              </div>
              <span className="text-sm font-black font-mono text-purple-700">{authorsPercent}%</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Литературен канон (41. в-с)</h3>
            <p className="text-xs text-slate-500">
              Преговорени <strong>{masteredAuthorsCount}</strong> от общо <strong>{totalAuthors}</strong> задължителни автори за ДЗИ.
            </p>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full transition-all" style={{ width: `${authorsPercent}%` }} />
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('literature')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Преговори цитати и тези</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Curriculum Topics */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-sm font-black font-mono text-blue-700">{lessonsPercent}%</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Учебни теми по МОН</h3>
            <p className="text-xs text-slate-500">
              Овладени <strong>{masteredLessonsCount}</strong> от <strong>{totalLessons}</strong> конспекта в учебната програма.
            </p>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${lessonsPercent}%` }} />
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('catalog')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Отвори учебната програма</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Grammar Module 1 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
                <PenTool className="w-4 h-4" />
              </div>
              <span className="text-sm font-black font-mono text-indigo-700">{grammarPercent}%</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Тренажор БЕЛ (Модул 1)</h3>
            <p className="text-xs text-slate-500">
              Решени <strong>{progress.grammarQuestionsSolved}</strong> задачи по БАН • Най-добра серия: <strong>{progress.grammarBestStreak}</strong>.
            </p>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${grammarPercent}%` }} />
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('grammar')}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Тренирай правопис и член</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 4: Error Bank Status */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                {unresolvedErrorsCount === 0 ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                )}
              </div>
              <span className="text-sm font-black font-mono text-emerald-700">{errorCleanPercent}%</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Досие в Банка с грешки</h3>
            <p className="text-xs text-slate-500">
              {unresolvedErrorsCount === 0
                ? '0 неизчистени грешки! Досието ти е безупречно.'
                : `${unresolvedErrorsCount} активни грешки чакат повторно решаване.`}
            </p>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${errorCleanPercent}%` }} />
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('errorbank')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Прегледай банката с грешки</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE WEEKLY SCHEDULE GENERATOR ("МОЯТ СЕДМИЧЕН ГРАФИК ЗА 6.00") */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6 cv-auto">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Персонализиран учебен алгоритъм</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Седмичен график за подготовка ({completedDaysCount}/7 дни изпълнени)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Избери дневното си темпо и отмятай всеки ден след приключване на модула.
            </p>
          </div>

          {/* Daily Tempo & Target Grade Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              {([30, 45, 60, 90] as const).map(mins => (
                <button
                  key={mins}
                  onClick={() => handleSelectDailyGoal(mins)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    progress.dailyGoalMinutes === mins
                      ? 'bg-white text-blue-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mins} мин/ден
                </button>
              ))}
            </div>

            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              {([5.0, 5.5, 6.0] as const).map(grade => (
                <button
                  key={grade}
                  onClick={() => handleSelectTargetGrade(grade)}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    progress.targetGrade === grade
                      ? 'bg-amber-500 text-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Target className="w-3 h-3" />
                  <span>{grade.toFixed(2)}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-2xs cursor-pointer print:hidden"
              title="Разпечатай седмичния план-график и чеклиста във формат A4 за бюрото"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Принтирай A4 График</span>
            </button>
          </div>
        </div>

        {/* 7-Day Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {weeklySchedule.map(day => {
            const isCompleted = progress.completedWeeklyDays.includes(day.id);
            return (
              <div
                key={day.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-200'
                    : day.accentClass
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                      {day.dayName}
                    </span>
                    <button
                      onClick={() => handleToggleDay(day.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-400'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isCompleted ? 'Готово' : 'Отметни'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] font-mono font-semibold text-blue-700 bg-white/80 px-2 py-0.5 rounded border border-slate-200/80 inline-block">
                    {day.focusBadge}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {day.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {day.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <button
                    onClick={() => onNavigateTab(day.targetTab)}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-400 text-xs font-bold flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                  >
                    <span>{day.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* 8th Summary Card in Grid: Weekly Bonus Goal */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 text-[11px] font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>Седмична равносметка</span>
              </div>
              <h3 className="text-base font-black text-white">
                {completedDaysCount >= 6
                  ? 'Безупречно темпо за Отличен 6.00!'
                  : `Още ${Math.max(0, 7 - completedDaysCount)} дни до пълна учебна седмица`}
              </h3>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                При {progress.dailyGoalMinutes} мин/ден инвестираш общо{' '}
                <strong>{Math.round((progress.dailyGoalMinutes * 7) / 60 * 10) / 10} астрономически часа</strong>{' '}
                седмично по критериите на МОН.
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('simulator')}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Тествай нивото си в 100т. Симулатор</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE MASTERY CHECKLIST: AUTHORS (15) & CURRICULUM LESSONS */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6 cv-auto">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Личен чеклист на овладения материал
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Отбелязвай всеки научен автор и урок — твоят Индекс на готовност горе се преизчислява автоматично.
            </p>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setChecklistTab('authors')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                checklistTab === 'authors'
                  ? 'bg-white text-purple-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              15 Автори за ДЗИ ({masteredAuthorsCount}/{totalAuthors})
            </button>
            <button
              onClick={() => setChecklistTab('lessons')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                checklistTab === 'lessons'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Учебни конспекти ({masteredLessonsCount}/{totalLessons})
            </button>
          </div>
        </div>

        {checklistTab === 'authors' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {LITERATURE_CANON.map(author => {
              const isMastered = progress.masteredAuthorIds.includes(author.id);
              return (
                <div
                  key={author.id}
                  onClick={() => handleToggleAuthor(author.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isMastered
                      ? 'bg-purple-50/70 border-purple-300 text-purple-950'
                      : 'bg-slate-50/60 hover:bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                        isMastered
                          ? 'bg-purple-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      {author.avatarText}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold truncate">{author.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {author.works.map(w => w.title).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 ${
                      isMastered
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    {isMastered ? 'Научен ✓' : 'Очаква'}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lessons.map(lesson => {
              const isMastered = progress.masteredLessonIds.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  className={`cv-card p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                    isMastered
                      ? 'bg-blue-50/60 border-blue-300'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                        {lesson.subject.split(' ')[0]} • {lesson.grade.split(' ')[0]}
                      </span>
                      <button
                        onClick={() => handleToggleLesson(lesson.id)}
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer ${
                          isMastered
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
                        }`}
                      >
                        {isMastered ? 'Научен ✓' : 'Отметни'}
                      </button>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 pt-1">
                      {lesson.title}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectLesson(lesson, 'summary')}
                    className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer self-start"
                  >
                    <span>Отвори конспекта</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 5. TARGET SCORE & DIPLOMA STRATEGY MATRIX (НВО / ДЗИ / ТРЕТА СПК)         */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-lg space-y-5 cv-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>Стратегическа матрица за целева оценка ({progress.targetGrade.toFixed(2)})</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Точкова разбивка по модули за постигане на Цел: Отличен {progress.targetGrade.toFixed(2)}
            </h3>
          </div>

          <button
            onClick={() => setIsCertModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs transition-all cursor-pointer shrink-0"
          >
            <Award className="w-4 h-4" />
            <span>📜 Издай Грамота / Свидетелство Трета СПК + EUROPASS</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
            <div className="text-amber-300 font-bold uppercase text-[11px]">
              1. ДЗИ Матура (БЕЛ / Профил — 100 т.)
            </div>
            <div className="text-xl font-black font-mono text-white">
              Минимум {progress.targetGrade >= 5.95 ? '95' : progress.targetGrade >= 5.5 ? '82' : '68'} / 100 т.
            </div>
            <p className="text-slate-300 leading-relaxed">
              • Модул 1 (Тест): цел ≥ 28/30 т.<br />
              • Модул 2 (Практически задачи): цел ≥ 36/40 т.<br />
              • Модул 3 (Задача 41 ИС/Есе): цел ≥ 27/30 т.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
            <div className="text-emerald-300 font-bold uppercase text-[11px]">
              2. ДИППК Трета СПК (Наредба № 1 — 100 т.)
            </div>
            <div className="text-xl font-black font-mono text-white">
              Минимум {progress.targetGrade >= 5.95 ? '98' : progress.targetGrade >= 5.5 ? '92' : '84'} / 100 т.
            </div>
            <p className="text-slate-300 leading-relaxed">
              По чл. 38 от ЗПОО прагът за Среден 3.00 е 50 т., а за Отличен 5.50 са нужни <strong>91,67 т.</strong> (Теория + Защита на дипломен проект пред комисия).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
            <div className="text-sky-300 font-bold uppercase text-[11px]">
              3. НВО 7. и 10. клас (БЕЛ + МАТ — 100 т.)
            </div>
            <div className="text-xl font-black font-mono text-white">
              Минимум {progress.targetGrade >= 5.95 ? '96' : progress.targetGrade >= 5.5 ? '86' : '74'} / 100 т.
            </div>
            <p className="text-slate-300 leading-relaxed">
              Осигурява състезателен бал над <strong>465 / 500 т.</strong> за прием в първо желание (СМГ, ТУЕС, НПМГ, 91. НЕГ, НТБГ, СГСАГ).
            </p>
          </div>
        </div>
      </div>

      <ExcellenceCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        achievementTitle="Систематична подготовка по „Моят План за 6.00“"
        examOrTrackLabel={activeExam.title}
        scoreText={`Индекс на готовност: ${overallReadinessPercent}%`}
        gradeLabel={`Целева оценка: Отличен (${progress.targetGrade.toFixed(2)})`}
        highlights={[
          `Автори по канона: ${masteredAuthorsCount}/${totalAuthors}`,
          `Учебни теми: ${masteredLessonsCount}/${totalLessons}`,
          `Модул 1 задачи: ${progress.grammarQuestionsSolved} решени`,
          `Най-дълга серия: ${progress.grammarBestStreak} верни`
        ]}
      />

    </div>
  );
};
