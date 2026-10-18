import React, { useState } from 'react';
import { RefreshCw, ArrowRight, CheckSquare, HelpCircle, Mail, Shuffle, Sparkles } from 'lucide-react';
import type { LessonData, QuizQuestion } from '../types';
import type { AppNavTab } from './Navbar';
import { EmailShareModal } from './EmailShareModal';

const POSITIONAL_OPTION_RE = /^(всички изброени|и двете|никое от|горните|точки а и б)/i;

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
  targetCount = 10
): QuizQuestion[] {
  const sameSubject = allLessons.filter((l) => l.subject === baseLesson.subject && l.id !== baseLesson.id);
  const titleWords = baseLesson.title
    .toLowerCase()
    .split(/[\s,.;:!?()[\]"'„“–—/-]+/)
    .filter((w) => w.length >= 4);
  const gradeNum = (g: string) => Number((g.match(/(\d+)/) || [])[1] || 0);
  const baseGradeNum = gradeNum(baseLesson.grade);

  const rankedNeighbors = sameSubject
    .map((l) => {
      const hay = `${l.title} ${l.summary.overview}`.toLowerCase();
      let score = 0;
      for (const w of titleWords) {
        if (hay.includes(w)) score += 4;
      }
      if (l.grade === baseLesson.grade) score += 6;
      else if (baseGradeNum && gradeNum(l.grade)) {
        score -= Math.abs(gradeNum(l.grade) - baseGradeNum);
      }
      if (l.examType && l.examType === baseLesson.examType) score += 3;
      return { lesson: l, score };
    })
    .sort((a, b) => b.score - a.score);

  const baseShuffled = shuffleQuizSet(baseLesson.quiz);
  const neighborPool: QuizQuestion[] = [];
  for (const { lesson } of rankedNeighbors.slice(0, 5)) {
    neighborPool.push(...lesson.quiz);
  }
  const neighborShuffled = shuffleQuizSet(neighborPool);

  const combined: QuizQuestion[] = [];
  const seenStems = new Set<string>();

  // Вземаме разбъркано 4–5 въпроса от основния урок + допълнителни от най-близките теми
  const baseQuota = Math.min(baseShuffled.length, Math.max(4, Math.ceil(targetCount * 0.5)));
  for (const q of baseShuffled) {
    if (combined.length >= baseQuota) break;
    const key = q.question.trim().toLowerCase();
    if (!seenStems.has(key)) {
      seenStems.add(key);
      combined.push(q);
    }
  }

  for (const q of neighborShuffled) {
    if (combined.length >= targetCount) break;
    const key = q.question.trim().toLowerCase();
    if (!seenStems.has(key)) {
      seenStems.add(key);
      combined.push(q);
    }
  }

  // Ако още има свободно място, допълваме с останалите от основния урок
  for (const q of baseShuffled) {
    if (combined.length >= targetCount) break;
    const key = q.question.trim().toLowerCase();
    if (!seenStems.has(key)) {
      seenStems.add(key);
      combined.push(q);
    }
  }

  return shuffleQuizSet(combined);
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
    activeQuestions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      if (chosen !== undefined && chosen !== q.correctIndex) {
        onRecordError?.(q, chosen);
      }
    });
  };

  const handleResetAndShuffle = () => {
    setActiveQuestions((prev) => shuffleQuizSet(prev));
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const handleGenerateTopicVariant = () => {
    if (currentLesson && allLessons && allLessons.length > 0) {
      const nextVariant = buildTopicVariantQuiz(currentLesson, allLessons, 10);
      setActiveQuestions(nextVariant);
      setVariantNumber((n) => n + 1);
    } else {
      setActiveQuestions((prev) => shuffleQuizSet(prev));
      setVariantNumber((n) => n + 1);
    }
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const handleRestoreBaseQuiz = () => {
    setActiveQuestions(questions.map((q) => shuffleQuestionOptions(q)));
    setVariantNumber(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
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
            Попълнени: <strong className="text-slate-900 font-mono">{answeredCount}</strong> / {activeQuestions.length}
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
            title="Генерирай нов 10-въпросен вариант с допълнителни задачи по същия предмет и клас"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Нов вариант по темата</span>
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
              className={`w-8 h-8 rounded-lg text-xs font-bold font-mono flex items-center justify-center border transition-colors flex-shrink-0 ${btnBg}`}
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
              <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold border mb-2 ${gradeInfo.badge}`}>
                Резултат: {gradeInfo.grade}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
                {correctScore} от {activeQuestions.length} верни отговора ({activeQuestions.length > 0 ? Math.round((correctScore / activeQuestions.length) * 100) : 0}%)
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {gradeInfo.comment}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2.5">
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
                <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold text-xs flex items-center justify-center mt-0.5">
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
                      <span className="w-5 h-5 rounded bg-slate-100 font-mono text-[11px] font-semibold text-slate-600 flex items-center justify-center flex-shrink-0 border border-slate-200">
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
