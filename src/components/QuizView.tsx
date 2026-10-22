import React, { useState } from 'react';
import { RefreshCw, ArrowRight, CheckSquare, HelpCircle, Mail, Shuffle, Sparkles, Printer, Copy, Check, CheckCircle2 } from 'lucide-react';
import type { LessonData, QuizQuestion } from '../types';
import type { AppNavTab } from './Navbar';
import { EmailShareModal } from './EmailShareModal';
import { studyProgressService } from '../services/studyProgressService';
import { generateInfiniteLessonQuiz } from '../services/infiniteQuizGenerator';

const POSITIONAL_OPTION_RE = /^(всички изброени|и двете|никое от|горните|точки а и б)/i;
const OPTION_LETTERS = ['А', 'Б', 'В', 'Г'] as const;

/**
 * Разбърква опциите (А/Б/В/Г) на въпрос и актуализира correctIndex,
 * така че верният отговор винаги да сочи към същия текст.
 */
export function shuffleQuestionOptions(q: QuizQuestion): QuizQuestion {
  if (!Array.isArray(q.options) || q.options.length < 2) return q;
  if (q.options.some((opt) => POSITIONAL_OPTION_RE.test(opt.trim()))) {
    return q;
  }
  const indices = q.options.map((_, idx) => idx);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const newOptions = indices.map((idx) => q.options[idx]);
  const newCorrectIndex = indices.indexOf(q.correctIndex);
  return {
    ...q,
    options: newOptions,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : q.correctIndex,
  };
}

/**
 * Разбърква реда на въпросите и техните опции (А/Б/В/Г), запазвайки уникални id-та.
 */
export function shuffleQuizSet(questions: QuizQuestion[]): QuizQuestion[] {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.map((q, idx) => ({
    ...shuffleQuestionOptions(q),
    id: idx + 1,
  }));
}

/**
 * Генерира нов вариант по темата (до targetCount въпроса), като комбинира
 * въпроси от текущия урок и най-близките уроци по същия предмет и клас.
 */
export function buildTopicVariantQuiz(
  baseLesson: LessonData,
  allLessons: LessonData[],
  targetCount = 10,
  variantSeed = 1
): QuizQuestion[] {
  return generateInfiniteLessonQuiz(baseLesson, allLessons, variantSeed, targetCount);
}

export interface DualGroupWorksheet {
  title: string;
  subject: string;
  grade: string;
  groupA: QuizQuestion[];
  groupB: QuizQuestion[];
}

/**
 * Създава работен лист с две независими групи (Група А и Група Б),
 * всяка с различно разбъркани въпроси и опции А/Б/В/Г + ключ за всяка група.
 */
export function buildDualGroupWorksheet(
  questions: QuizQuestion[],
  title = 'Проверка на знанията',
  subject = 'Общообразователна подготовка',
  grade = 'МОН'
): DualGroupWorksheet {
  const groupA = shuffleQuizSet(questions);
  let groupB = shuffleQuizSet(questions);
  if (groupA.length >= 2 && groupB[0]?.question === groupA[0]?.question) {
    const [first, ...rest] = groupB;
    groupB = [...rest, first].map((q, idx) => ({ ...q, id: idx + 1 }));
  }
  return {
    title,
    subject,
    grade,
    groupA,
    groupB,
  };
}

/**
 * Форматира работния лист (Група А + Група Б + опционален ключ с верни отговори и обяснения)
 * като чист текст, готов за копиране във Word/Google Docs или печат.
 */
export function formatWorksheetAsText(ws: DualGroupWorksheet, includeKey = true): string {
  const lines: string[] = [];
  lines.push('====================================================================');
  lines.push(`РАБОТЕН ЛИСТ / ТЕСТ ПО МОН — ${ws.title.toUpperCase()}`);
  lines.push(`Предмет: ${ws.subject} | Клас: ${ws.grade} | Брой въпроси: ${ws.groupA.length}`);
  lines.push('Име, презиме и фамилия: _________________________________ Клас: _____ № ___');
  lines.push('====================================================================');
  lines.push('');

  const renderGroup = (label: string, list: QuizQuestion[]) => {
    lines.push(`--- ${label} ---`);
    list.forEach((q, idx) => {
      lines.push(`${idx + 1}. ${q.question}`);
      q.options.forEach((opt, optIdx) => {
        lines.push(`   ${OPTION_LETTERS[optIdx] || String.fromCharCode(1040 + optIdx)}) ${opt}`);
      });
      lines.push('');
    });
  };

  renderGroup('ГРУПА А', ws.groupA);
  renderGroup('ГРУПА Б', ws.groupB);

  if (includeKey) {
    lines.push('====================================================================');
    lines.push('КЛЮЧ С ВЕРНИ ОТГОВОРИ И МЕТОДИЧЕСКИ ОБЯСНЕНИЯ');
    lines.push('====================================================================');
    lines.push('');
    lines.push('Ключ за ГРУПА А:');
    ws.groupA.forEach((q, idx) => {
      const letter = OPTION_LETTERS[q.correctIndex] || 'А';
      lines.push(
        `  ${idx + 1}. ${letter}) ${q.options[q.correctIndex]} — ${q.explanation}`
      );
    });
    lines.push('');
    lines.push('Ключ за ГРУПА Б:');
    ws.groupB.forEach((q, idx) => {
      const letter = OPTION_LETTERS[q.correctIndex] || 'А';
      lines.push(
        `  ${idx + 1}. ${letter}) ${q.options[q.correctIndex]} — ${q.explanation}`
      );
    });
  }

  return lines.join('\n');
}

interface QuizViewProps {
  questions: QuizQuestion[];
  currentLesson?: LessonData;
  allLessons?: LessonData[];
  onReviewFlashcards: () => void;
  onNavigateTab?: (tab: AppNavTab) => void;
  onRecordError?: (q: QuizQuestion, chosenIndex: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  currentLesson,
  allLessons,
  onReviewFlashcards,
  onNavigateTab,
  onRecordError
}) => {
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() =>
    questions.map((q) => shuffleQuestionOptions(q))
  );
  const [variantNumber, setVariantNumber] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);
  const [worksheetTab, setWorksheetTab] = useState<'A' | 'B' | 'KEY'>('A');
  const [worksheetData, setWorksheetData] = useState<DualGroupWorksheet | null>(null);
  const [copiedMode, setCopiedMode] = useState<'withKey' | 'noKey' | null>(null);
  const [isLessonMastered, setIsLessonMastered] = useState<boolean>(() =>
    currentLesson ? studyProgressService.isLessonMastered(currentLesson.id) : false
  );

  if (activeQuestions.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-amber-50/60 border border-amber-200 text-sm text-amber-900 space-y-3">
        <p className="font-semibold">За този урок още няма проверен тест.</p>
        <p>Прегледай конспекта и флашкартите или избери урок от каталога — всеки урок там има тест с ключ.</p>
        <button
          onClick={onReviewFlashcards}
          className="px-4 py-2 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-xs font-semibold"
        >
          Към флашкартите
        </button>
      </div>
    );
  }

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === activeQuestions.length;

  const calculateScore = () => {
    let correct = 0;
    activeQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  // Оценка по стандартната формула за тест: 2 + 4 · (верни / всички),
  // с обичайните прагове: < 3.00 Слаб, 3.00–3.49 Среден, 3.50–4.49 Добър, 4.50–5.49 Мн. добър, ≥ 5.50 Отличен.
  const getBulgarianGrade = (correct: number, total: number) => {
    const numeric = total > 0 ? 2 + 4 * (correct / total) : 2;
    const shown = numeric.toFixed(2);
    if (numeric >= 5.5) {
      return {
        grade: `Отличен ${shown}`,
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        comment: 'Отлично усвояване на урока. Всички ключови понятия са разпознати правилно.',
        readyForExam: true
      };
    }
    if (numeric >= 4.5) {
      return {
        grade: `Мн. добър ${shown}`,
        badge: 'bg-blue-50 text-blue-800 border-blue-200',
        comment: 'Много добра подготовка. Прегледай допуснатите грешки, за да стигнеш до 6.00.',
        readyForExam: true
      };
    }
    if (numeric >= 3.5) {
      return {
        grade: `Добър ${shown}`,
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        comment: 'Базова ориентация по темата, но има грешки при ключови понятия.',
        readyForExam: false
      };
    }
    if (numeric >= 3) {
      return {
        grade: `Среден ${shown}`,
        badge: 'bg-orange-50 text-orange-800 border-orange-200',
        comment: 'Има съществени пропуски. Прегледай конспекта и флашкартите и опитай отново.',
        readyForExam: false
      };
    }
    return {
      grade: `Слаб ${shown}`,
      badge: 'bg-rose-50 text-rose-800 border-rose-200',
      comment: 'Темата не е усвоена. Започни от конспекта, после флашкартите и чак тогава повтори теста.',
      readyForExam: false
    };
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    // Automatically record any mistakes to the Error Bank
    let correctCount = 0;
    activeQuestions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      if (chosen === q.correctIndex) {
        correctCount++;
      } else if (chosen !== undefined) {
        onRecordError?.(q, chosen);
      }
    });

    // Автоматично отбелязване на урока като усвоен при Отличен (>= 5.50)
    if (currentLesson && activeQuestions.length > 0) {
      const numericGrade = 2 + 4 * (correctCount / activeQuestions.length);
      if (numericGrade >= 5.5) {
        studyProgressService.markLessonMastered(currentLesson.id);
        setIsLessonMastered(true);
      }
    }
  };

  const handleToggleLessonMastered = () => {
    if (!currentLesson) return;
    const updated = studyProgressService.toggleMasteredLesson(currentLesson.id);
    setIsLessonMastered(updated.masteredLessonIds.includes(currentLesson.id));
  };

  const handleRetryMistakes = () => {
    const missed = activeQuestions.filter(
      (q) => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctIndex
    );
    if (missed.length === 0) return;
    setActiveQuestions(shuffleQuizSet(missed));
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const handleResetAndShuffle = () => {
    setActiveQuestions((prev) => shuffleQuizSet(prev));
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const handleGenerateTopicVariant = () => {
    const nextNum = variantNumber + 1;
    if (currentLesson) {
      const nextVariant = buildTopicVariantQuiz(
        currentLesson,
        allLessons && allLessons.length > 0 ? allLessons : [currentLesson],
        10,
        nextNum
      );
      setActiveQuestions(nextVariant);
      setVariantNumber(nextNum);
    } else {
      setActiveQuestions((prev) => shuffleQuizSet(prev));
      setVariantNumber(nextNum);
    }
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const handleAppendMoreQuestions = () => {
    const nextNum = variantNumber + 1;
    if (currentLesson) {
      const generatedPool = generateInfiniteLessonQuiz(
        currentLesson,
        allLessons && allLessons.length > 0 ? allLessons : [currentLesson],
        nextNum + 10,
        12
      );
      setActiveQuestions((prev) => {
        const existingStems = new Set(prev.map((q) => q.question.trim().toLowerCase()));
        const additions = generatedPool
          .filter((q) => !existingStems.has(q.question.trim().toLowerCase()))
          .slice(0, 5);
        const fallbackAdditions = additions.length > 0 ? additions : generatedPool.slice(0, 5);
        return [...prev, ...fallbackAdditions].map((q, idx) => ({ ...q, id: idx + 1 }));
      });
      setVariantNumber(nextNum);
      setIsSubmitted(false);
    }
  };

  const handleRestoreBaseQuiz = () => {
    setActiveQuestions(questions.map((q) => shuffleQuestionOptions(q)));
    setVariantNumber(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const handleToggleWorksheet = () => {
    if (!isWorksheetOpen) {
      setWorksheetData(
        buildDualGroupWorksheet(
          activeQuestions,
          currentLesson?.title || 'Проверка на знанията',
          currentLesson?.subject || 'Общообразователна подготовка',
          currentLesson?.grade || 'МОН'
        )
      );
      setIsWorksheetOpen(true);
    } else {
      setIsWorksheetOpen(false);
    }
  };

  const handleRegenerateWorksheet = () => {
    setWorksheetData(
      buildDualGroupWorksheet(
        activeQuestions,
        currentLesson?.title || 'Проверка на знанията',
        currentLesson?.subject || 'Общообразователна подготовка',
        currentLesson?.grade || 'МОН'
      )
    );
  };

  const handleCopyWorksheet = async (includeKey: boolean) => {
    const ws =
      worksheetData ||
      buildDualGroupWorksheet(
        activeQuestions,
        currentLesson?.title || 'Проверка на знанията',
        currentLesson?.subject || 'Общообразователна подготовка',
        currentLesson?.grade || 'МОН'
      );
    const text = formatWorksheetAsText(ws, includeKey);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMode(includeKey ? 'withKey' : 'noKey');
      setTimeout(() => setCopiedMode(null), 2200);
    } catch {
      // Fallback silent ignore if clipboard API unavailable
    }
  };

  const correctScore = calculateScore();
  const gradeInfo = getBulgarianGrade(correctScore, activeQuestions.length);
  const gradeBg = Math.max(2, Math.min(6, 2 + (correctScore / (activeQuestions.length || 1)) * 4));
  const missedQuestions = activeQuestions
    .filter((q) => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctIndex)
    .map((q) => q.question);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>{variantNumber > 0 ? `Разширен вариант #${variantNumber} по темата` : 'Тест за самопроверка по урока'}</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 border border-emerald-200 text-emerald-800">
              <Shuffle className="w-3 h-3" />
              <span>Разбъркани А/Б/В/Г</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Проверка на знанията ({activeQuestions.length} въпроса)
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="text-xs font-medium text-slate-600 mr-1">
            Попълнени: <strong className="text-slate-900 tabular-nums">{answeredCount}</strong> / {activeQuestions.length}
          </div>

          <button
            type="button"
            onClick={handleResetAndShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs cursor-pointer"
            title="Разбъркай реда на въпросите и опциите А/Б/В/Г"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            <span>{isSubmitted ? 'Повтори с разбъркване' : 'Разбъркай теста'}</span>
          </button>

          <button
            type="button"
            onClick={handleGenerateTopicVariant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-2xs cursor-pointer"
            title="Генерирай нов 10-въпросен вариант с нови задачи и казуси по материала на темата (безкраен генератор)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Нов вариант по темата (∞)</span>
          </button>

          {currentLesson && (
            <button
              type="button"
              onClick={handleAppendMoreQuestions}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-colors shadow-2xs cursor-pointer"
              title="Добави още 5 нови въпроса върху материала към текущия тест"
            >
              <span>+5 въпроса по материала</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleWorksheet}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors shadow-2xs cursor-pointer ${
              isWorksheetOpen
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
            }`}
            title="Генерирай работен лист с Група А, Група Б и ключ за учителя (копиране и принтиране)"
          >
            <Printer className="w-3.5 h-3.5 text-amber-700" />
            <span>Работен лист (Група А/Б)</span>
          </button>

          {variantNumber > 0 && (
            <button
              type="button"
              onClick={handleRestoreBaseQuiz}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-200/80 hover:bg-slate-300/80 text-slate-800 transition-colors cursor-pointer"
            >
              <span>Основен ({questions.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Dual-Group Printable / Copyable Worksheet Panel */}
      {isWorksheetOpen && worksheetData && (
        <div className="p-5 rounded-xl bg-amber-50/40 border border-amber-200 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-amber-200/80">
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-1">
                Контролна работа / Работен лист за класната стая
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {worksheetData.title} — Група А и Група Б ({worksheetData.groupA.length} въпроса)
              </h3>
              <p className="text-xs text-slate-600">
                Два независими варианта с различен ред на въпросите и разбъркани отговори А/Б/В/Г + автоматичен ключ.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRegenerateWorksheet}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
                <span>Нови Група А/Б</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyWorksheet(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 transition-colors cursor-pointer"
              >
                {copiedMode === 'noKey' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copiedMode === 'noKey' ? 'Копирано (без ключ)!' : 'Копирай без ключ'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyWorksheet(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white transition-colors cursor-pointer"
              >
                {copiedMode === 'withKey' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMode === 'withKey' ? 'Копирано с ключ!' : 'Копирай с ключ за учителя'}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-sapphire hover:bg-brand-sapphire-light text-white transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Принтирай</span>
              </button>
            </div>
          </div>

          {/* Worksheet Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setWorksheetTab('A')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                worksheetTab === 'A'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Група А ({worksheetData.groupA.length} въпроса)
            </button>
            <button
              type="button"
              onClick={() => setWorksheetTab('B')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                worksheetTab === 'B'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Група Б ({worksheetData.groupB.length} въпроса)
            </button>
            <button
              type="button"
              onClick={() => setWorksheetTab('KEY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                worksheetTab === 'KEY'
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              Ключ с верни отговори (Група А + Б)
            </button>
          </div>

          {worksheetTab !== 'KEY' ? (
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 max-h-96 overflow-y-auto">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                {worksheetTab === 'A' ? 'ГРУПА А — Въпросник за ученика' : 'ГРУПА Б — Въпросник за ученика'}
              </div>
              {(worksheetTab === 'A' ? worksheetData.groupA : worksheetData.groupB).map((q, idx) => (
                <div key={q.id} className="text-xs sm:text-sm text-slate-800 space-y-1 pb-2.5 border-b border-slate-100 last:border-b-0">
                  <div className="font-semibold text-slate-900">
                    {idx + 1}. {q.question}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-4 text-slate-700">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx}>
                        <span className="tabular-nums font-bold text-slate-900">{OPTION_LETTERS[optIdx]})</span> {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-2 max-h-96 overflow-y-auto">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b border-emerald-100 pb-2">
                  Ключ за ГРУПА А
                </div>
                {worksheetData.groupA.map((q, idx) => (
                  <div key={q.id} className="text-xs text-slate-700 pb-2 border-b border-slate-100 last:border-b-0">
                    <div>
                      <strong className="tabular-nums text-slate-900">{idx + 1}. {OPTION_LETTERS[q.correctIndex]})</strong>{' '}
                      <span className="font-semibold text-emerald-900">{q.options[q.correctIndex]}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{q.explanation}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-2 max-h-96 overflow-y-auto">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b border-emerald-100 pb-2">
                  Ключ за ГРУПА Б
                </div>
                {worksheetData.groupB.map((q, idx) => (
                  <div key={q.id} className="text-xs text-slate-700 pb-2 border-b border-slate-100 last:border-b-0">
                    <div>
                      <strong className="tabular-nums text-slate-900">{idx + 1}. {OPTION_LETTERS[q.correctIndex]})</strong>{' '}
                      <span className="font-semibold text-emerald-900">{q.options[q.correctIndex]}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{q.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Question Navigation Numbers Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-2 rounded-xl bg-slate-100 border border-slate-200 no-scrollbar">
        {activeQuestions.map((q, idx) => {
          const isAns = selectedAnswers[q.id] !== undefined;
          const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctIndex;

          let btnBg = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50';
          if (isSubmitted) {
            btnBg = isCorrect
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
              : 'bg-rose-50 text-rose-800 border-rose-300 font-bold';
          } else if (isAns) {
            btnBg = 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs';
          }

          return (
            <button
              key={q.id}
              onClick={() => {
                const el = document.getElementById(`question-${q.id}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`w-8 h-8 rounded-lg text-xs font-bold tabular-nums flex items-center justify-center border transition-colors flex-shrink-0 ${btnBg}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Result Card when submitted */}
      {isSubmitted && (
        <div className="p-6 sm:p-7 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold border ${gradeInfo.badge}`}>
                  Резултат: {gradeInfo.grade}
                </span>
                {currentLesson && (
                  <button
                    type="button"
                    onClick={handleToggleLessonMastered}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
                      isLessonMastered
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                    title="Синхронизира се автоматично с „Моят План за 6.00“ и Конспекта"
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isLessonMastered ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{isLessonMastered ? 'Усвоен урок в Плана за 6.00 ✓' : 'Отбележи като усвоен урок'}</span>
                  </button>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                {correctScore} от {activeQuestions.length} верни отговора ({activeQuestions.length > 0 ? Math.round((correctScore / activeQuestions.length) * 100) : 0}%)
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {gradeInfo.comment}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2.5">
              {missedQuestions.length > 0 && (
                <button
                  onClick={handleRetryMistakes}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  title="Стартирай кратък тест само със сгрешените въпроси от този опит"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Пререши само грешните ({missedQuestions.length})</span>
                </button>
              )}
              <button
                onClick={handleGenerateTopicVariant}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Нов вариант по темата</span>
              </button>
              <button
                onClick={onReviewFlashcards}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Преговор с карти</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                title="Изпрати този изпитен резултат по имейл"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Резултат на имейл</span>
              </button>

              {onNavigateTab && (
                <>
                  <button
                    onClick={() => onNavigateTab('errorbank')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Банка с грешки</span>
                  </button>
                  <button
                    onClick={() => onNavigateTab('simulator')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>100-т. симулатор</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Question List */}
      <div className="space-y-4">
        {activeQuestions.map((q, idx) => {
          const selectedOption = selectedAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = isAnswered && selectedOption === q.correctIndex;

          return (
            <div
              id={`question-${q.id}`}
              key={q.id}
              className={`p-5 sm:p-6 rounded-xl border transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-rose-50/40 border-rose-200'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 tabular-nums font-bold text-xs flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                    {q.question}
                  </h4>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-0 sm:pl-9">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  let optionStyles = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300';

                  if (isSubmitted) {
                    if (isThisCorrect) {
                      optionStyles = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyles = 'bg-rose-50 border-rose-400 text-rose-900 font-medium';
                    } else {
                      optionStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    optionStyles = 'bg-blue-50 border-blue-600 text-blue-900 font-medium ring-2 ring-blue-100';
                  }

                  const letters = ['А', 'Б', 'В', 'Г'];

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left text-xs sm:text-sm transition-all ${optionStyles}`}
                    >
                      <span className="w-5 h-5 rounded bg-slate-100 tabular-nums text-[11px] font-semibold text-slate-600 flex items-center justify-center flex-shrink-0 border border-slate-200">
                        {letters[optIdx]}
                      </span>
                      <span className="flex-1 leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (visible after submission) */}
              {isSubmitted && (
                <div className="mt-4 pt-3 border-t border-slate-200 pl-0 sm:pl-9 text-xs flex items-start gap-2 text-slate-600">
                  <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">Методическо обяснение:</span>{' '}
                    <span>{q.explanation}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!isSubmitted && (
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
            {!isAllAnswered ? (
              <span>Маркирайте отговори на всички {activeQuestions.length} въпроса преди предаване.</span>
            ) : (
              <span className="text-emerald-700 font-medium">Всички въпроси са попълнени. Можете да предадете теста.</span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Предай теста и изчисли оценка
          </button>
        </div>
      )}

      {/* Email Share Modal for Quiz Results */}
      <EmailShareModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        testResult={{
          lessonTitle: currentLesson
            ? `${currentLesson.title} (${activeQuestions.length} въпроса)`
            : `Тест за самопроверка (${activeQuestions.length} въпроса)`,
          score: correctScore,
          total: activeQuestions.length,
          gradeBg,
          missedQuestions
        }}
      />
    </div>
  );
};
