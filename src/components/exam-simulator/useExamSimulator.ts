import { useState, useEffect, useMemo, useRef } from 'react';
import type { QuizQuestion, LessonData } from '../../types';
import type { FullExamData } from '../../data/examModulesData';
import { evaluateEssayWithGemini, type EssayEvaluationResult } from '../../services/geminiService';
import { examHistoryService } from '../../services/examHistoryService';
import { examScaleForLesson, formatGrade, pointsToGrade, type GradeScale, type VerbalGrade } from '../../lib/monGradeScale';

// Цялата логика на 100-точковия симулатор (състояние, таймер, чернова, оценяване) —
// изнесена от ExamSimulatorView, за да остане компонентът само подредба.
interface ExamDraft {
  v: 1;
  lessonId: string;
  durationMinutes: number;
  deadline: number | null; // null = без таймер
  selectedAnswers: Record<number, number>;
  module2Answers: Record<string, string>;
  essayText: string;
  activeModuleTab: 1 | 2 | 3;
  savedAt: number;
}

const examGradeStyles = (scale: GradeScale): Record<VerbalGrade, { badge: string; status: string; color: string }> => ({
  'Отличен': {
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    status: 'Пълно покритие на държавните образователни стандарти за ДЗИ / НВО',
    color: 'text-emerald-700'
  },
  'Много добър': {
    badge: 'bg-sky-50 text-sky-800 border-sky-200',
    status: 'Солидни познания, висока степен на критичен и изворов анализ',
    color: 'text-sky-700'
  },
  'Добър': {
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    status: 'Удовлетворително усвояване; препоръчва се преговор на изворите и есето',
    color: 'text-amber-700'
  },
  'Среден': {
    badge: 'bg-orange-50 text-orange-800 border-orange-200',
    status: `Покрит минимален праг за преминаване (${scale.passPoints} точки). Налице са съществени пропуски`,
    color: 'text-orange-700'
  },
  'Слаб': {
    badge: 'bg-rose-50 text-rose-800 border-rose-200',
    status: `Под прага за издържан изпит (под ${scale.passPoints} от ${scale.maxPoints} точки)`,
    color: 'text-rose-700'
  }
});

const POINTS_ONLY_STYLE = {
  badge: 'bg-slate-100 text-slate-800 border-slate-300',
  status: 'НВО се оценява само в точки — няма официално превръщане в шестобална оценка.',
  color: 'text-slate-700'
};

const examDraftKey = (lessonId: string) => `studybg_exam_draft_v1_${lessonId}`;

const readExamDraft = (lessonId: string): ExamDraft | null => {
  try {
    const raw = localStorage.getItem(examDraftKey(lessonId));
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      (parsed as ExamDraft).v !== 1 ||
      (parsed as ExamDraft).lessonId !== lessonId
    ) {
      return null;
    }
    const d = parsed as ExamDraft;
    return {
      ...d,
      selectedAnswers: d.selectedAnswers && typeof d.selectedAnswers === 'object' ? d.selectedAnswers : {},
      module2Answers: d.module2Answers && typeof d.module2Answers === 'object' ? d.module2Answers : {},
      essayText: typeof d.essayText === 'string' ? d.essayText : '',
      activeModuleTab: d.activeModuleTab === 2 || d.activeModuleTab === 3 ? d.activeModuleTab : 1
    };
  } catch {
    return null;
  }
};

const clearExamDraft = (lessonId: string) => {
  try {
    localStorage.removeItem(examDraftKey(lessonId));
  } catch {
    // localStorage недостъпен (private mode) — няма какво да се изчисти
  }
};

export interface ExamSimulatorViewProps {
  currentLesson: LessonData;
  allLessons?: LessonData[];
  onSelectLesson?: (lesson: LessonData) => void;
  onOpenErrorBank?: () => void;
  onRecordError?: (q: QuizQuestion, optIdx: number) => void;
}

export interface ExamSimulatorScreenProps extends ExamSimulatorViewProps {
  examData: FullExamData;
}


export function useExamSimulator({
  currentLesson,
  allLessons,
  onSelectLesson,
  onOpenErrorBank,
  onRecordError,
  examData
}: ExamSimulatorScreenProps) {
  const [examDurationMinutes, setExamDurationMinutes] = useState<number>(60);
  const [secondsLeft, setSecondsLeft] = useState<number>(60 * 60);
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeModuleTab, setActiveModuleTab] = useState<1 | 2 | 3>(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>('lesson');
  const [studentName, setStudentName] = useState<string>('Ученик StudyBG');

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

  // AI Evaluation State
  const [isEvaluatingEssay, setIsEvaluatingEssay] = useState<boolean>(false);
  const [aiEssayEvaluation, setAiEssayEvaluation] = useState<EssayEvaluationResult | null>(null);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  // Exam History & Progress Modal State
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [historyCount, setHistoryCount] = useState<number>(() => examHistoryService.getAllAttempts().length);

  // Таймер по краен момент (deadline - Date.now()) — не изостава във фонов таб
  const [deadline, setDeadline] = useState<number | null>(null);
  const [pendingDraft, setPendingDraft] = useState<ExamDraft | null>(() => readExamDraft(currentLesson.id));

  useEffect(() => {
    setPendingDraft(readExamDraft(currentLesson.id));
  }, [currentLesson.id]);

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
    const pool = allLessons;

    if (preset === 'dzi12-bel' || preset === 'dzi12-bel-tyutyun') {
      const l = pool.find(x => x.id === 'literature-tyutyun');
      if (l) onSelectLesson(l);
    } else if (preset === 'dzi12-bel-geratsite') {
      const l = pool.find(x => x.id === 'literature-geratsite');
      if (l) onSelectLesson(l);
    } else if (preset === 'dzi12-history' || preset === 'dzi12-history-april') {
      const l = pool.find(x => x.id === 'history-april-uprising');
      if (l) onSelectLesson(l);
    } else if (preset === 'dzi12-math-derivatives') {
      const l = pool.find(x => x.id === 'math-derivatives-extremums-dzi');
      if (l) onSelectLesson(l);
    } else if (preset === 'dzi12-bio-dna') {
      const l = pool.find(x => x.id === 'bio-dna-replication-protein');
      if (l) onSelectLesson(l);
    } else if (preset === 'dippk-it-ai') {
      const l = pool.find(x => x.id === 'cs-cybersecurity-cryptography-ai-machine-learning-11-12');
      if (l) onSelectLesson(l);
    } else if (preset === 'dippk-finance-ntbg') {
      const l = pool.find(x => x.id === 'econ-micro-macro-accounting-finance-8-12');
      if (l) onSelectLesson(l);
    } else if (preset === 'dippk-arch-sgsag') {
      const l = pool.find(x => x.id === 'math-10-12-solid-geometry-prisms-pyramids-spheres-cones');
      if (l) onSelectLesson(l);
    } else if (preset === 'dippk-aviation-maritime') {
      const l = pool.find(x => x.id === 'phys-newton-laws-mechanics');
      if (l) onSelectLesson(l);
    } else if (preset === 'dippk-nuclear-optics') {
      const l = pool.find(x => x.id === 'phys-quantum-nuclear-astrophysics');
      if (l) onSelectLesson(l);
    } else if (preset === 'nvo10-history' || preset === 'nvo10-history-simeon') {
      const l = pool.find(x => x.id === 'history-simeon-golden-age');
      if (l) onSelectLesson(l);
    } else if (preset === 'nvo10-bel-debelyanov') {
      const l = pool.find(x => x.id === 'bel-10-dimcho-debelianov');
      if (l) onSelectLesson(l);
    } else if (preset === 'nvo10-math-vieta') {
      const l = pool.find(x => x.id === 'math-10-quadratic-equations-vieta');
      if (l) onSelectLesson(l);
    } else if (preset === 'nvo7-bel') {
      const l = pool.find(x => x.id === 'bel-7-edna-balgarka');
      if (l) onSelectLesson(l);
    } else if (preset === 'nvo7-math') {
      const l = pool.find(x => x.id === 'math-7-linear-equations');
      if (l) onSelectLesson(l);
    }
  };

  // Start Exam (Supports official МОН times: 240m DZI, 90m NVO 10, 60m express, 0 untimed)
  const handleStartExam = (mins: number) => {
    clearExamDraft(currentLesson.id);
    setPendingDraft(null);
    setExamDurationMinutes(mins);
    setSecondsLeft(mins === 0 ? 999999 : mins * 60);
    setDeadline(mins === 0 ? null : Date.now() + mins * 60 * 1000);
    setIsExamRunning(true);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setModule2Answers({});
    setModule2Scores({});
    setEssayText('');
    setRubricScores({});
    setIsEvaluatingEssay(false);
    setAiEssayEvaluation(null);
    setEvaluationError(null);
    setActiveModuleTab(1);
  };

  // Възстановяване на незавършен изпит след презареждане
  const handleRestoreDraft = () => {
    if (!pendingDraft) return;
    const d = pendingDraft;
    setExamDurationMinutes(d.durationMinutes);
    setDeadline(d.deadline);
    setSecondsLeft(d.deadline === null ? 999999 : Math.max(0, Math.round((d.deadline - Date.now()) / 1000)));
    setSelectedAnswers(d.selectedAnswers);
    setModule2Answers(d.module2Answers);
    setModule2Scores({});
    setEssayText(d.essayText);
    setRubricScores({});
    setAiEssayEvaluation(null);
    setEvaluationError(null);
    setActiveModuleTab(d.activeModuleTab);
    setIsSubmitted(false);
    setIsExamRunning(true);
    setPendingDraft(null);
  };

  const handleDiscardDraft = () => {
    clearExamDraft(currentLesson.id);
    setPendingDraft(null);
  };

  // Module 1 Option Select
  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted || !isExamRunning) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // AI Essay Evaluation
  const handleEvaluateEssayWithAi = async () => {
    if (essayText.trim().length < 30) {
      setEvaluationError('Моля, напишете поне 2–3 изречения (теза или аргумент), за да може AI проверителят да анализира текста.');
      return;
    }
    setEvaluationError(null);
    setIsEvaluatingEssay(true);
    try {
      const result = await evaluateEssayWithGemini(
        essayText,
        examData.module3.essayPrompt,
        examData.module3.rubric
      );
      setAiEssayEvaluation(result);
      // Структурният офлайн анализ не дава точки — ръчната самооценка остава непроменена
      if (result.mode === 'ai') {
        setRubricScores(result.scores);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Грешка при AI оценяването. Опитайте отново.';
      setEvaluationError(msg);
    } finally {
      setIsEvaluatingEssay(false);
    }
  };

  // Submit Exam
  const handleSubmitExam = () => {
    clearExamDraft(currentLesson.id);
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

  // Винаги актуална референция към handleSubmitExam за таймера
  const submitExamRef = useRef(handleSubmitExam);
  submitExamRef.current = handleSubmitExam;

  // Timer Effect: изчислява оставащото време от крайния момент, а не с декремент
  useEffect(() => {
    if (!isExamRunning || isSubmitted || deadline === null) return;
    const tick = () => {
      const left = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) {
        submitExamRef.current();
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [isExamRunning, isSubmitted, deadline]);

  // Автозапис на черновата (debounce 500 ms)
  useEffect(() => {
    if (!isExamRunning || isSubmitted) return;
    const t = setTimeout(() => {
      const draft: ExamDraft = {
        v: 1,
        lessonId: currentLesson.id,
        durationMinutes: examDurationMinutes,
        deadline,
        selectedAnswers,
        module2Answers,
        essayText,
        activeModuleTab,
        savedAt: Date.now()
      };
      try {
        localStorage.setItem(examDraftKey(currentLesson.id), JSON.stringify(draft));
      } catch {
        // Квотата е пълна или localStorage е недостъпен — изпитът продължава без запис
      }
    }, 500);
    return () => clearTimeout(t);
  }, [isExamRunning, isSubmitted, currentLesson.id, examDurationMinutes, deadline, selectedAnswers, module2Answers, essayText, activeModuleTab]);

  // Предупреждение при затваряне/презареждане по време на изпит
  useEffect(() => {
    if (!isExamRunning || isSubmitted) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isExamRunning, isSubmitted]);

  // Score Calculations
  const module1Points = useMemo(() => {
    if (questions.length === 0) return 0;
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

  // Скалата зависи от изпита: ДЗИ, ДИППК или само точки за НВО (src/lib/monGradeScale.ts)
  const examScale = useMemo(() => examScaleForLesson(currentLesson), [currentLesson]);
  const gradeResult = examScale.scale ? pointsToGrade(totalPoints, examScale.scale) : null;
  const gradeInfo = gradeResult && examScale.scale
    ? {
        grade: formatGrade(gradeResult),
        numeric: gradeResult.numeric as number | null,
        passed: gradeResult.passed,
        ...examGradeStyles(examScale.scale)[gradeResult.label]
      }
    : {
        grade: `${totalPoints} / 100 точки`,
        numeric: null as number | null,
        passed: false,
        ...POINTS_ONLY_STYLE
      };

  // Auto-record completed attempt to examHistoryService (LocalStorage & Supabase)
  useEffect(() => {
    if (isSubmitted) {
      const timeSpent = Math.max(1, (examDurationMinutes === 0 ? 3600 : examDurationMinutes * 60) - secondsLeft);
      examHistoryService.recordAttempt({
        lessonId: currentLesson.id,
        lessonTitle: currentLesson.title,
        subject: currentLesson.subject,
        grade: currentLesson.grade,
        examPreset: activePreset,
        durationMinutes: examDurationMinutes,
        timeSpentSeconds: timeSpent,
        module1Points,
        module2Points,
        module3Points,
        totalPoints,
        gradeEquivalent: gradeInfo.grade,
        gradeNumeric: gradeInfo.numeric,
        passed: gradeInfo.passed,
        hasAiEvaluation: aiEssayEvaluation?.mode === 'ai'
      }).then(() => {
        setHistoryCount(examHistoryService.getAllAttempts().length);
      });
    }
  }, [isSubmitted]);

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

  return {
    currentLesson,
    allLessons,
    onSelectLesson,
    onOpenErrorBank,
    onRecordError,
    examData,
    examDurationMinutes,
    setExamDurationMinutes,
    secondsLeft,
    setSecondsLeft,
    isExamRunning,
    setIsExamRunning,
    isSubmitted,
    setIsSubmitted,
    activeModuleTab,
    setActiveModuleTab,
    isPrintModalOpen,
    setIsPrintModalOpen,
    isCertModalOpen,
    setIsCertModalOpen,
    activePreset,
    setActivePreset,
    studentName,
    setStudentName,
    questions,
    selectedAnswers,
    setSelectedAnswers,
    module2Answers,
    setModule2Answers,
    module2Scores,
    setModule2Scores,
    essayText,
    setEssayText,
    rubricScores,
    setRubricScores,
    isEvaluatingEssay,
    setIsEvaluatingEssay,
    aiEssayEvaluation,
    setAiEssayEvaluation,
    evaluationError,
    setEvaluationError,
    isHistoryModalOpen,
    setIsHistoryModalOpen,
    historyCount,
    setHistoryCount,
    deadline,
    setDeadline,
    pendingDraft,
    setPendingDraft,
    examCountdowns,
    handleSelectExamPreset,
    handleStartExam,
    handleRestoreDraft,
    handleDiscardDraft,
    handleSelectOption,
    handleEvaluateEssayWithAi,
    handleSubmitExam,
    submitExamRef,
    module1Points,
    module2Points,
    module3Points,
    totalPoints,
    gradeResult,
    gradeInfo,
    examScale,
    formatTimer,
    mod1CompletedCount,
    mod2CompletedCount,
    mod3HasText
  };
}

export type ExamSimulatorState = ReturnType<typeof useExamSimulator>;
