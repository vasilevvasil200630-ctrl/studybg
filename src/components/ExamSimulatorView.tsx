import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  ShieldAlert,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  FileText,
  BookOpen,
  Scale,
  Calendar,
  Printer,
  X,
  GraduationCap
} from 'lucide-react';
import type { QuizQuestion, LessonData } from '../types';
import { getExamModulesForLesson } from '../data/examModulesData';

interface ExamSimulatorViewProps {
  currentLesson: LessonData;
  allLessons?: LessonData[];
  onSelectLesson?: (lesson: LessonData) => void;
  onOpenErrorBank?: () => void;
  onRecordError?: (q: QuizQuestion, optIdx: number) => void;
}

export const ExamSimulatorView: React.FC<ExamSimulatorViewProps> = ({
  currentLesson,
  allLessons,
  onSelectLesson,
  onOpenErrorBank,
  onRecordError
}) => {
  const [examDurationMinutes, setExamDurationMinutes] = useState<number>(60);
  const [secondsLeft, setSecondsLeft] = useState<number>(60 * 60);
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeModuleTab, setActiveModuleTab] = useState<1 | 2 | 3>(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>('lesson');
  const [studentName, setStudentName] = useState<string>('Ученик StudyBG');

  // Load lesson exam data (Module 1, 2, 3)
  const examData = useMemo(() => getExamModulesForLesson(currentLesson), [currentLesson]);
  const questions = currentLesson.quiz;

  // Module 1 Answers: questionId -> optionIndex
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  // Module 2 Answers: questionId -> text answer
  const [module2Answers, setModule2Answers] = useState<Record<string, string>>({});
  // Module 2 Scores: questionId -> awarded points (0, 5, or 10)
  const [module2Scores, setModule2Scores] = useState<Record<string, number>>({});

  // Module 3 Answer: essay text
  const [essayText, setEssayText] = useState<string>('');
  // Module 3 Scores: criterionId -> awarded points
  const [rubricScores, setRubricScores] = useState<Record<string, number>>({});

  // Dynamic Exam Countdown: Always calculates upcoming May (ДЗИ 12. кл.) and June (НВО 7. и 10. кл.)
  const examCountdowns = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();

    // DZI 12th grade is usually May 21
    let dziYear = currentYear;
    let dziDate = new Date(`${dziYear}-05-21T08:00:00`);
    if (now.getTime() > dziDate.getTime()) {
      dziYear += 1;
      dziDate = new Date(`${dziYear}-05-21T08:00:00`);
    }

    // NVO 10th grade is usually June 10
    let nvo10Year = currentYear;
    let nvo10Date = new Date(`${nvo10Year}-06-10T09:00:00`);
    if (now.getTime() > nvo10Date.getTime()) {
      nvo10Year += 1;
      nvo10Date = new Date(`${nvo10Year}-06-10T09:00:00`);
    }

    // NVO 7th grade is usually June 17
    let nvo7Year = currentYear;
    let nvo7Date = new Date(`${nvo7Year}-06-17T09:00:00`);
    if (now.getTime() > nvo7Date.getTime()) {
      nvo7Year += 1;
      nvo7Date = new Date(`${nvo7Year}-06-17T09:00:00`);
    }

    const diffDzi = Math.max(1, Math.ceil((dziDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const diffNvo10 = Math.max(1, Math.ceil((nvo10Date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const diffNvo7 = Math.max(1, Math.ceil((nvo7Date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    return { diffDzi, diffNvo10, diffNvo7, dziYear, nvo10Year, nvo7Year };
  }, []);

  const handleSelectExamPreset = (preset: string) => {
    setActivePreset(preset);
    setIsExamRunning(false);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setModule2Answers({});
    setModule2Scores({});
    setEssayText('');
    setRubricScores({});

    if (!allLessons || !onSelectLesson) return;

    if (preset === 'dzi12-bel' || preset === 'dzi12-bel-tyutyun') {
      const l = allLessons.find(x => x.id === 'literature-tyutyun');
      if (l) onSelectLesson(l);
    } else if (preset === 'dzi12-bel-geratsite') {
      const l = allLessons.find(x => x.id === 'literature-geratsite');
      if (l) onSelectLesson(l);
    } else if (preset === 'dzi12-history' || preset === 'dzi12-history-april') {
      const l = allLessons.find(x => x.id === 'history-april-uprising');
      if (l) onSelectLesson(l);
    } else if (preset === 'nvo10-history' || preset === 'nvo10-history-simeon') {
      const l = allLessons.find(x => x.id === 'history-simeon-golden-age');
      if (l) onSelectLesson(l);
    } else if (preset === 'nvo10-bel-debelyanov') {
      const l = allLessons.find(x => x.id === 'bel-10-dimcho-debelianov');
      if (l) onSelectLesson(l);
    } else if (preset === 'nvo10-math-vieta') {
      const l = allLessons.find(x => x.id === 'math-10-quadratic-equations-vieta');
      if (l) onSelectLesson(l);
    } else if (preset === 'nvo7-bel') {
      const l = allLessons.find(x => x.id === 'bel-7-edna-balgarka');
      if (l) onSelectLesson(l);
    } else if (preset === 'nvo7-math') {
      const l = allLessons.find(x => x.id === 'math-7-linear-equations');
      if (l) onSelectLesson(l);
    }
  };

  // Timer Effect
  useEffect(() => {
    let timer: any = null;
    if (isExamRunning && secondsLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isExamRunning && !isSubmitted) {
      handleSubmitExam();
    }
    return () => clearInterval(timer);
  }, [isExamRunning, secondsLeft, isSubmitted]);

  // Start Exam (Supports official МОН times: 240m DZI, 90m NVO 10, 60m express, 0 untimed)
  const handleStartExam = (mins: number) => {
    setExamDurationMinutes(mins);
    setSecondsLeft(mins === 0 ? 999999 : mins * 60);
    setIsExamRunning(true);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setModule2Answers({});
    setModule2Scores({});
    setEssayText('');
    setRubricScores({});
    setActiveModuleTab(1);
  };

  // Module 1 Option Select
  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted || !isExamRunning) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Submit Exam
  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setIsExamRunning(false);

    // Default Module 2 initial self-scores (e.g. 5 if answered, 0 if blank)
    const initialMod2Scores: Record<string, number> = {};
    examData.module2.questions.forEach(q => {
      const ans = module2Answers[q.id]?.trim();
      initialMod2Scores[q.id] = ans && ans.length > 20 ? 5 : 0;
    });
    setModule2Scores(initialMod2Scores);

    // Default Module 3 initial rubric scores (e.g. moderate default if written)
    const initialRubricScores: Record<string, number> = {};
    const hasEssay = essayText.trim().length > 60;
    examData.module3.rubric.forEach(crit => {
      initialRubricScores[crit.id] = hasEssay ? Math.floor(crit.maxPoints / 2) : 0;
    });
    setRubricScores(initialRubricScores);

    // Record mistakes to error bank
    questions.forEach(q => {
      const chosen = selectedAnswers[q.id];
      if (chosen !== q.correctIndex && onRecordError) {
        onRecordError(q, chosen ?? -1);
      }
    });

    // Stay or set to tab 1 for review
    setActiveModuleTab(1);
  };

  // Score Calculations
  const module1Points = useMemo(() => {
    if (questions.length === 0) return 40;
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / questions.length) * 40);
  }, [questions, selectedAnswers]);

  const module2Points = useMemo(() => {
    let sum = 0;
    Object.values(module2Scores).forEach(score => {
      sum += score;
    });
    return Math.min(30, sum);
  }, [module2Scores]);

  const module3Points = useMemo(() => {
    let sum = 0;
    Object.values(rubricScores).forEach(score => {
      sum += score;
    });
    return Math.min(30, sum);
  }, [rubricScores]);

  const totalPoints = module1Points + module2Points + module3Points;

  // Official МОН Grading Blueprint
  const getMonGradeInfo = (points: number) => {
    if (points >= 90) {
      return {
        grade: 'Отличен 6.00',
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        status: 'Пълно покритие на държавните образователни стандарти за ДЗИ / НВО',
        color: 'text-emerald-700'
      };
    }
    if (points >= 75) {
      return {
        grade: 'Много добър 5.00',
        badge: 'bg-sky-50 text-sky-800 border-sky-200',
        status: 'Солидни познания, висока степен на критичен и изворов анализ',
        color: 'text-sky-700'
      };
    }
    if (points >= 59) {
      return {
        grade: 'Добър 4.00',
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        status: 'Удовлетворително усвояване; препоръчва се преговор на изворите и есето',
        color: 'text-amber-700'
      };
    }
    if (points >= 30) {
      return {
        grade: 'Среден 3.00',
        badge: 'bg-orange-50 text-orange-800 border-orange-200',
        status: 'Покрит минимален праг за преминаване (30 точки). Налице са съществени пропуски',
        color: 'text-orange-700'
      };
    }
    return {
      grade: 'Слаб 2.00',
      badge: 'bg-rose-50 text-rose-800 border-rose-200',
      status: 'Под официалния държавен праг за преминаване (под 30 от 100 точки)',
      color: 'text-rose-700'
    };
  };

  const gradeInfo = getMonGradeInfo(totalPoints);

  const formatTimer = (sec: number) => {
    if (sec >= 900000) return 'Без ограничение';
    const hrs = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (hrs > 0) {
      return `${hrs}ч ${String(m).padStart(2, '0')}м ${String(s).padStart(2, '0')}с`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Module completion counters
  const mod1CompletedCount = Object.keys(selectedAnswers).length;
  const mod2CompletedCount = Object.values(module2Answers).filter(txt => txt.trim().length > 0).length;
  const mod3HasText = essayText.trim().length > 30;

  return (
    <div className="space-y-6">
      
      {/* Sleek Horizontal МОН Exam Countdown Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="font-bold text-slate-700">Официален изпитен календар на МОН:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold shadow-2xs">
            🎓 ДЗИ 12. кл: <strong className="font-mono text-xs">{examCountdowns.diffDzi}</strong> дни ({examCountdowns.dziYear} г.)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-teal-200 text-teal-900 font-semibold shadow-2xs">
            ⏱️ НВО 10. кл: <strong className="font-mono text-xs">{examCountdowns.diffNvo10}</strong> дни ({examCountdowns.nvo10Year} г.)
          </span>
          <a
            href="https://matura-plus.bg"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-medium inline-flex items-center gap-1 transition-all shadow-2xs"
            title="Специализирана академия за кандидатстване след 7. клас"
          >
            <span>7. кл. ({examCountdowns.diffNvo7} дни) ↗ Matura+</span>
          </a>
        </div>
      </div>

      {/* Quick Track & Topic Preset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">
            Изпитен формат:
          </span>

          {/* Track Buttons */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 gap-1">
            <button
              type="button"
              onClick={() => handleSelectExamPreset('lesson')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePreset === 'lesson'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Текущ урок
            </button>

            <button
              type="button"
              onClick={() => handleSelectExamPreset('dzi12-bel-tyutyun')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePreset.startsWith('dzi12')
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ДЗИ 12 (Матура)
            </button>

            <button
              type="button"
              onClick={() => handleSelectExamPreset('nvo10-history-simeon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePreset.startsWith('nvo10')
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              НВО 10. клас
            </button>
          </div>

          {/* Quick Sub-Topic Chips */}
          {activePreset.startsWith('dzi12') && (
            <div className="flex items-center gap-1.5 pl-1 flex-wrap">
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dzi12-bel-tyutyun')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dzi12-bel-tyutyun' || activePreset === 'dzi12-bel'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                БЕЛ: Тютюн
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dzi12-bel-geratsite')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dzi12-bel-geratsite'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                БЕЛ: Гераците
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('dzi12-history-april')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'dzi12-history-april' || activePreset === 'dzi12-history'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                История: Априлско въстание
              </button>
            </div>
          )}

          {activePreset.startsWith('nvo10') && (
            <div className="flex items-center gap-1.5 pl-1 flex-wrap">
              <button
                type="button"
                onClick={() => handleSelectExamPreset('nvo10-history-simeon')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'nvo10-history-simeon' || activePreset === 'nvo10-history'
                    ? 'bg-teal-100 text-teal-900 border-teal-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                История: Симеон Велики
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('nvo10-bel-debelyanov')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'nvo10-bel-debelyanov'
                    ? 'bg-teal-100 text-teal-900 border-teal-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                БЕЛ: Д. Дебелянов
              </button>
              <button
                type="button"
                onClick={() => handleSelectExamPreset('nvo10-math-vieta')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                  activePreset === 'nvo10-math-vieta'
                    ? 'bg-teal-100 text-teal-900 border-teal-300 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Мат: Квадратни уравнения
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 hidden sm:inline">Текущо:</span>
          <span className="text-xs font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 max-w-[220px] truncate">
            {currentLesson.title.split(':')[0]} ({currentLesson.grade})
          </span>
        </div>
      </div>

      {/* Main Exam Simulator Container */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>3-модулен изпитен формат по стандарта на МОН (100 точки)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Симулация на изпит: „{currentLesson.title}“
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Модул 1 (40т. тест) • Модул 2 (30т. извор) • Модул 3 (30т. аргументиран отговор)
            </p>
          </div>

          {/* Time & State Indicator */}
          <div className="flex items-center gap-3">
            {isExamRunning && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200">
                <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                <span className="font-mono text-base font-bold text-amber-900">
                  {formatTimer(secondsLeft)}
                </span>
              </div>
            )}

            {!isExamRunning && !isSubmitted && (
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => handleStartExam(240)}
                  className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  title="Официален изпитен регламент на МОН за ДЗИ 12. клас: 240 минути"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>240 мин (ДЗИ)</span>
                </button>
                <button
                  onClick={() => handleStartExam(90)}
                  className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  title="Официален изпитен регламент на МОН за НВО 10. клас: 90 минути"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>90 мин (НВО 10)</span>
                </button>
                <button
                  onClick={() => handleStartExam(60)}
                  className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold transition-all shadow-xs"
                >
                  60 мин (Експресен)
                </button>
                <button
                  onClick={() => handleStartExam(0)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
                  title="Учебно темпо без таймер за спокойна самоподготовка"
                >
                  Без таймер
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Banner when Submitted */}
        {isSubmitted && (
          <div className="p-6 my-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded text-xs font-semibold border mb-2 ${gradeInfo.badge}`}>
                  Официална оценка: {gradeInfo.grade}
                </span>
                <div className="flex items-baseline gap-3">
                  <h4 className="text-4xl font-extrabold text-slate-900 font-mono">
                    {totalPoints} <span className="text-xl text-slate-400 font-normal">/ 100 точки</span>
                  </h4>
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-xl">
                  {gradeInfo.status}
                </p>

                {/* Module Points Breakdown */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Модул 1 (Тест)</span>
                    <span className="text-sm font-bold font-mono text-slate-900">{module1Points} / 40 т.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Модул 2 (Извор)</span>
                    <span className="text-sm font-bold font-mono text-slate-900">{module2Points} / 30 т.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Модул 3 (Есе)</span>
                    <span className="text-sm font-bold font-mono text-slate-900">{module3Points} / 30 т.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Протокол от изпита (Печат / PDF)</span>
                </button>

                <button
                  onClick={() => handleStartExam(examDurationMinutes)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Повтори симулацията</span>
                </button>

                {onOpenErrorBank && (
                  <button
                    onClick={onOpenErrorBank}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                  >
                    <span>Банка с грешки</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3-Module Tabs Navigation */}
        {(isExamRunning || isSubmitted) && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveModuleTab(1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModuleTab === 1
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Модул 1: Тестови въпроси (40 т.)</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeModuleTab === 1 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {mod1CompletedCount}/{questions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveModuleTab(2)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModuleTab === 2
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Модул 2: Анализ на извор (30 т.)</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeModuleTab === 2 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {mod2CompletedCount}/{examData.module2.questions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveModuleTab(3)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModuleTab === 3
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Модул 3: Аргументиран отговор (30 т.)</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeModuleTab === 3 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {mod3HasText ? '✓ Написан' : 'Чернова'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Module 1 (Multiple Choice - 40 Points) */}
        {(isExamRunning || isSubmitted) && activeModuleTab === 1 && (
          <div className="space-y-4 mt-6">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
              <span>
                <strong>Модул 1:</strong> 10 затворени въпроса с избираем отговор (А, Б, В, Г). Всеки верен отговор носи <strong>4 точки</strong>.
              </span>
              <span className="font-mono font-medium text-slate-800">
                Попълнени: {mod1CompletedCount} / {questions.length}
              </span>
            </div>

            {questions.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <div>
                        <h5 className="text-sm font-semibold text-slate-900 leading-snug">
                          {q.question}
                        </h5>
                        <span className="text-[11px] text-slate-500 font-mono">4 точки</span>
                      </div>
                    </div>

                    {isSubmitted && (
                      <div>
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            +4 т.
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold">
                            <XCircle className="w-3.5 h-3.5" />
                            0 т.
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-0 sm:pl-9">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedOpt === oIdx;
                      const letters = ['А', 'Б', 'В', 'Г'];

                      let buttonStyles = 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';

                      if (isSubmitted) {
                        if (oIdx === q.correctIndex) {
                          buttonStyles = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium ring-1 ring-emerald-400/50';
                        } else if (isSelected) {
                          buttonStyles = 'bg-rose-50 border-rose-400 text-rose-950 font-medium ring-1 ring-rose-400/50';
                        }
                      } else if (isSelected) {
                        buttonStyles = 'bg-blue-50 border-blue-500 text-blue-950 font-medium ring-1 ring-blue-500/50';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`flex items-center gap-3 p-3 rounded-lg border text-left text-xs transition-colors ${buttonStyles}`}
                        >
                          <span className="w-5 h-5 rounded bg-white font-mono text-[11px] font-bold text-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-200">
                            {letters[oIdx]}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="pl-0 sm:pl-9 pt-2">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                        <div className="font-semibold text-slate-800">
                          Официално обяснение на МОН:
                        </div>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Module 2 (Primary Source Analysis - 30 Points) */}
        {(isExamRunning || isSubmitted) && activeModuleTab === 2 && (
          <div className="space-y-6 mt-6">
            
            {/* Primary Source Document Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    Исторически извор / Документ
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">
                    {examData.module2.sourceTitle}
                  </h4>
                  <p className="text-xs text-slate-600">
                    Произход: {examData.module2.sourceOrigin}
                  </p>
                </div>
                {examData.module2.citation && (
                  <span className="text-xs text-slate-500 font-mono bg-white px-2.5 py-1 rounded border border-slate-200">
                    {examData.module2.citation}
                  </span>
                )}
              </div>

              {/* Source Text Box */}
              <div className="p-4 rounded-xl bg-white border border-slate-300 shadow-2xs font-serif text-sm text-slate-900 italic leading-relaxed border-l-4 border-l-purple-500">
                {examData.module2.excerpt}
              </div>

              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Исторически контекст: </span>
                {examData.module2.context}
              </div>
            </div>

            {/* Source Analytical Questions */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Задачи за анализ на извора (3 задачи × 10 точки = 30 точки)
              </div>

              {examData.module2.questions.map((sq) => {
                const userAns = module2Answers[sq.id] || '';
                const currentScore = module2Scores[sq.id] ?? 0;

                return (
                  <div key={sq.id} className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 leading-snug">
                          {sq.prompt}
                        </h5>
                        {sq.hint && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            Насока: {sq.hint}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex-shrink-0">
                        10 т.
                      </span>
                    </div>

                    {/* Student input field */}
                    <div>
                      <textarea
                        value={userAns}
                        disabled={isSubmitted}
                        onChange={(e) => setModule2Answers(prev => ({ ...prev, [sq.id]: e.target.value }))}
                        placeholder="Въведете вашия аргументиран отговор на базата на извора..."
                        rows={3}
                        className="w-full p-3 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-700"
                      />
                    </div>

                    {/* Submission Review & Scoring Rubric */}
                    {isSubmitted && (
                      <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Официален еталон на МОН за верен отговор
                          </span>
                          <p className="text-xs text-slate-800 mt-2 leading-relaxed font-medium">
                            {sq.modelAnswer}
                          </p>
                        </div>

                        {/* Interactive Self-Scoring Buttons */}
                        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                          <span className="text-xs text-slate-600 font-semibold">
                            Оценете вашия отговор спрямо еталона:
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setModule2Scores(prev => ({ ...prev, [sq.id]: 0 }))}
                              className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${
                                currentScore === 0
                                  ? 'bg-rose-600 text-white border-rose-600'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              0 т. (Невярно)
                            </button>
                            <button
                              onClick={() => setModule2Scores(prev => ({ ...prev, [sq.id]: 5 }))}
                              className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${
                                currentScore === 5
                                  ? 'bg-amber-600 text-white border-amber-600'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              5 т. (Частично)
                            </button>
                            <button
                              onClick={() => setModule2Scores(prev => ({ ...prev, [sq.id]: 10 }))}
                              className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${
                                currentScore === 10
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              10 т. (Пълен отговор)
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* Tab 3: Module 3 (Extended Argumentative Essay - 30 Points) */}
        {(isExamRunning || isSubmitted) && activeModuleTab === 3 && (
          <div className="space-y-6 mt-6">
            
            {/* Essay Prompt Card */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                Модул 3 • Задача 41 (ДЗИ): Разширен писмен отговор
              </span>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {examData.module3.essayPrompt}
              </h4>
              
              <div className="space-y-1.5 pt-2 border-t border-blue-100">
                <span className="text-xs font-semibold text-slate-700">Опорни указания за разработката:</span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  {examData.module3.guidelines.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Essay Writing Space */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Вашата писмена разработка (теза, аргументи и синтезиран извод):</span>
                <span className="font-mono">
                  {essayText.trim().split(/\s+/).filter(Boolean).length} думи
                </span>
              </div>
              <textarea
                value={essayText}
                disabled={isSubmitted}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Започнете с ясна историческа теза, последвана от аргументативни абзаци с конкретна фактология и завършете с обобщаващ извод..."
                rows={10}
                className="w-full p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-serif disabled:bg-slate-50 disabled:text-slate-800"
              />
            </div>

            {/* Submission Rubric & Model Thesis */}
            {isSubmitted && (
              <div className="space-y-6 pt-4 border-t border-slate-200">
                
                {/* Sample Thesis from МОН */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    Еталонна теза на МОН
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 mt-2 font-serif italic leading-relaxed">
                    „{examData.module3.sampleThesis}“
                  </p>
                </div>

                {/* 4-Criteria МОН Scoring Matrix */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">
                        Официална скала за оценяване на МОН (Общо 30 точки)
                      </h5>
                      <p className="text-xs text-slate-500">
                        Оценете вашето есе по четирите задължителни критерия:
                      </p>
                    </div>
                    <span className="text-base font-bold font-mono text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      {module3Points} / 30 т.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {examData.module3.rubric.map(crit => {
                      const currentVal = rubricScores[crit.id] ?? 0;

                      return (
                        <div key={crit.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h6 className="text-xs font-bold text-slate-900">
                                {crit.name}
                              </h6>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {crit.description}
                              </p>
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex-shrink-0">
                              макс {crit.maxPoints} т.
                            </span>
                          </div>

                          {/* Levels selector */}
                          <div className="space-y-1.5 pt-1">
                            {crit.levels.map(lvl => (
                              <button
                                key={lvl.points}
                                onClick={() => setRubricScores(prev => ({ ...prev, [crit.id]: lvl.points }))}
                                className={`w-full flex items-center justify-between p-2 rounded-lg border text-left text-xs transition-colors ${
                                  currentVal === lvl.points
                                    ? 'bg-blue-50 border-blue-500 text-blue-950 font-semibold ring-1 ring-blue-500/50'
                                    : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <span className="text-[11px] flex-1">{lvl.label}</span>
                                <span className="font-mono font-bold text-slate-800 ml-2">
                                  {lvl.points} т.
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Global Submit Button while Exam is running */}
        {isExamRunning && (
          <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span>Оставащо време: <strong className="font-mono text-slate-900">{formatTimer(secondsLeft)}</strong></span>
              <span>•</span>
              <span>Попълнени: {mod1CompletedCount} въпроса, {mod2CompletedCount} задачи от извора</span>
            </div>

            <button
              onClick={handleSubmitExam}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>Предай целия изпит (100 точки)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Initial Empty State before starting: Comprehensive МОН 100-Point Blueprint */}
        {!isExamRunning && !isSubmitted && (
          <div className="py-8 space-y-8">
            {/* Header info */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 shadow-2xs">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Официален регламент и модел на изпита (100 точки)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Симулацията пресъздава точната структура на държавните зрелостни изпити (ДЗИ) и НВО на МОН за <strong className="text-slate-900">{currentLesson.subject}</strong> ({currentLesson.grade}).
              </p>
            </div>

            {/* 3 Modules Blueprint Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Модул 1
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    40 точки
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900">
                  Тестова част с избираем отговор
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  10 затворени въпроса по 4 т. Проверява фундаменталната фактология, понятия и правила. Минималният праг за оценка Среден 3.00 е 30 точки.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                    Модул 2
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    30 точки
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900">
                  Анализ на извор / приложни задачи
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  3 въпроса със свободен кратък отговор по 10 т. Работа с автентичен исторически документ, художествен откъс или математически модел.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Модул 3
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    30 точки
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900">
                  Разширен писмен отговор / Есе
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Създаване на цялостен аргументиран текст или пълно алгебрично решение. Оценява се по официалната 4-критерийна матрица на МОН.
                </p>
              </div>
            </div>

            {/* Official МОН Grading Scale Bar */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-blue-600" />
                  <span>Държавна скала на МОН за преобразуване на точките в оценка:</span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">ДЗИ / НВО 100-точкова система</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                  <span className="block font-bold text-rose-900 font-mono">0 – 29 т.</span>
                  <span className="text-[11px] text-rose-700 font-medium">Слаб 2.00</span>
                </div>
                <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200">
                  <span className="block font-bold text-orange-900 font-mono">30 – 58 т.</span>
                  <span className="text-[11px] text-orange-700 font-medium">Среден 3.00 (Праг)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                  <span className="block font-bold text-amber-900 font-mono">59 – 74 т.</span>
                  <span className="text-[11px] text-amber-700 font-medium">Добър 4.00</span>
                </div>
                <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200">
                  <span className="block font-bold text-sky-900 font-mono">75 – 89 т.</span>
                  <span className="text-[11px] text-sky-700 font-medium">Мн. добър 5.00</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 col-span-2 sm:col-span-1">
                  <span className="block font-bold text-emerald-900 font-mono">90 – 100 т.</span>
                  <span className="text-[11px] text-emerald-700 font-medium">Отличен 6.00</span>
                </div>
              </div>
            </div>

            {/* Duration Selector & Launch Call-to-action */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/50 border border-blue-200 text-center space-y-4 max-w-xl mx-auto">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Изберете времеви регламент за изпита:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { mins: 30, label: '30 мин (Експресен)' },
                  { mins: 60, label: '60 мин (Стандартен)' },
                  { mins: 90, label: '90 мин (Удължен)' },
                  { mins: 150, label: '150 мин (Регламент НВО МОН)' }
                ].map(item => (
                  <button
                    key={item.mins}
                    onClick={() => setExamDurationMinutes(item.mins)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      examDurationMinutes === item.mins
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleStartExam(examDurationMinutes)}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 mx-auto"
                >
                  <Clock className="w-4 h-4 text-white" />
                  <span>Стартирай пълна симулация ({examDurationMinutes} мин)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Official МОН Exam Protocol Print Modal */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:p-0 print:bg-white">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden print:border-none print:shadow-none">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Printer className="w-4 h-4 text-blue-600" />
                <span>Официален протокол за провеждане на изпит</span>
              </div>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Protocol Sheet Content (Printable) */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-900 font-serif">
              {/* Official Header */}
              <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-700 font-sans">
                  Република България • Министерство на образованието и науката
                </h3>
                <h2 className="text-lg sm:text-xl font-extrabold uppercase text-slate-900 tracking-wide font-sans">
                  Протокол от симулационно изпитно оценяване
                </h2>
                <div className="text-[11px] font-sans text-slate-500 flex items-center justify-center gap-4 pt-1">
                  <span>Рег. № BG-MON-{Math.floor(100000 + Math.random() * 900000)}</span>
                  <span>•</span>
                  <span>Дата: {new Date().toLocaleDateString('bg-BG')} г.</span>
                </div>
              </div>

              {/* Student & Exam Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-sans pb-4 border-b border-slate-200">
                <div>
                  <span className="text-slate-500 block">Изпитвано лице:</span>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-blue-600 w-full"
                  />
                </div>
                <div>
                  <span className="text-slate-500 block">Учебен предмет & Клас:</span>
                  <span className="font-bold text-slate-900">{currentLesson.subject} ({currentLesson.grade})</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block">Изпитна тема:</span>
                  <span className="font-bold text-slate-900">{currentLesson.title}</span>
                </div>
              </div>

              {/* Detailed Points Table */}
              <div className="space-y-2 font-sans">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Резултати по изпитни модули (Максимум 100 точки):
                </h5>
                <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
                  <div className="grid grid-cols-12 bg-slate-100 font-bold p-2.5 border-b border-slate-300 text-slate-800">
                    <span className="col-span-6">Модул / Компонент</span>
                    <span className="col-span-3 text-center">Макс. точки</span>
                    <span className="col-span-3 text-right">Постигнат резултат</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 border-b border-slate-200">
                    <span className="col-span-6 font-medium">Модул 1: Тестова част (Избираем отговор)</span>
                    <span className="col-span-3 text-center font-mono">40 т.</span>
                    <span className="col-span-3 text-right font-mono font-bold">{module1Points} т.</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 border-b border-slate-200">
                    <span className="col-span-6 font-medium">Модул 2: Анализ на извор / Приложни задачи</span>
                    <span className="col-span-3 text-center font-mono">30 т.</span>
                    <span className="col-span-3 text-right font-mono font-bold">{module2Points} т.</span>
                  </div>
                  <div className="grid grid-cols-12 p-2.5 border-b border-slate-200">
                    <span className="col-span-6 font-medium">Модул 3: Разширен аргументиран отговор / Есе</span>
                    <span className="col-span-3 text-center font-mono">30 т.</span>
                    <span className="col-span-3 text-right font-mono font-bold">{module3Points} т.</span>
                  </div>
                  <div className="grid grid-cols-12 p-3 bg-slate-50 font-bold text-sm">
                    <span className="col-span-6 uppercase">Общ резултат:</span>
                    <span className="col-span-3 text-center font-mono">100 т.</span>
                    <span className="col-span-3 text-right font-mono text-blue-700">{totalPoints} т.</span>
                  </div>
                </div>
              </div>

              {/* Official Grade Summary Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                    Окончателна държавна оценка по скалата на МОН:
                  </span>
                  <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {gradeInfo.grade}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {gradeInfo.status}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded text-xs font-bold font-mono bg-white border border-slate-300">
                    {totalPoints} / 100 точки
                  </span>
                </div>
              </div>

              {/* Signature Lines */}
              <div className="grid grid-cols-2 gap-8 pt-6 font-sans text-xs text-slate-600 border-t border-slate-200">
                <div>
                  <span className="block mb-6">Подпис на изпитвания:</span>
                  <div className="border-b border-slate-400 w-44" />
                </div>
                <div className="text-right">
                  <span className="block mb-6">Печат на StudyBG и Изпитна комисия:</span>
                  <div className="border-b border-slate-400 w-44 ml-auto" />
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 print:hidden">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
              >
                Затвори
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Разпечатай протокола</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
