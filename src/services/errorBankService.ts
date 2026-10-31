import type { QuizQuestion, LessonData } from '../types';
import type { AnswerReview } from '../lib/examMistakes';
import { isObjectItem, readStoredArray } from '../lib/storage';

export interface SavedErrorItem {
  id: string;
  type: 'quiz_question' | 'notebook_missing_point' | 'exam_task';
  lessonId: string;
  lessonTitle: string;
  subject: string;
  grade: string;
  questionOrRequirement: string;
  userAnswer?: string;
  correctAnswerOrNote: string;
  explanationOrReason: string;
  addedAt: string;
  resolved: boolean;
  rawQuestionData?: QuizQuestion;
  /** За задачите от изпитните варианти: id на задачата (по него „Реши отново“ я намира с текста ѝ) */
  examQuestionId?: string;
}

/** Id на запис за задача от изпитен вариант — една и съща задача от варианта и от набора по тема е един запис */
export const examErrorId = (questionId: string): string => `exam-${questionId}`;

const STORAGE_KEY = 'studybg_error_bank';

let cachedRawJson: string | null | undefined = undefined;
let cachedErrorsList: SavedErrorItem[] = [];
let cachedUnresolvedCount = 0;

function syncCache(items: SavedErrorItem[], rawJson: string | null): void {
  cachedRawJson = rawJson;
  cachedErrorsList = items;
  let unresolved = 0;
  for (let i = 0; i < items.length; i++) {
    if (!items[i].resolved) unresolved++;
  }
  cachedUnresolvedCount = unresolved;
}

export const errorBankService = {
  getAllErrors(): SavedErrorItem[] {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw === cachedRawJson) {
        return cachedErrorsList;
      }
      const parsed = readStoredArray<SavedErrorItem>(STORAGE_KEY, isObjectItem);
      syncCache(parsed, raw);
      return parsed;
    } catch {
      return [];
    }
  },

  saveErrors(items: SavedErrorItem[], options?: { silentCloudTrigger?: boolean }): void {
    try {
      const raw = JSON.stringify(items);
      localStorage.setItem(STORAGE_KEY, raw);
      syncCache(items, raw);
      if (!options?.silentCloudTrigger && typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('studybg:local-data-mutated', { detail: { source: 'error_bank' } })
        );
      }
    } catch {
      // storage unavailable or full
    }
  },

  recordQuizError(
    question: QuizQuestion,
    lesson: LessonData,
    selectedOptionIndex: number
  ): SavedErrorItem {
    const errors = [...this.getAllErrors()];
    const existingIndex = errors.findIndex(e => e.id === `quiz-${question.id}-${lesson.id}`);

    const newError: SavedErrorItem = {
      id: `quiz-${question.id}-${lesson.id}`,
      type: 'quiz_question',
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      subject: lesson.subject,
      grade: lesson.grade,
      questionOrRequirement: question.question,
      userAnswer: question.options[selectedOptionIndex] || 'Непосочен отговор',
      correctAnswerOrNote: question.options[question.correctIndex],
      explanationOrReason: question.explanation,
      addedAt: new Date().toLocaleDateString('bg-BG'),
      resolved: false,
      rawQuestionData: question
    };

    if (existingIndex >= 0) {
      errors[existingIndex] = newError;
    } else {
      errors.unshift(newError);
    }

    this.saveErrors(errors);
    return newError;
  },

  recordNotebookMissingItem(
    requirement: string,
    whyNeeded: string,
    suggestedNotes: string,
    lesson: LessonData,
    checkId: string
  ): SavedErrorItem {
    const errors = [...this.getAllErrors()];
    const itemId = `audit-${checkId}-${lesson.id}`;
    const existingIndex = errors.findIndex(e => e.id === itemId);

    const newError: SavedErrorItem = {
      id: itemId,
      type: 'notebook_missing_point',
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      subject: lesson.subject,
      grade: lesson.grade,
      questionOrRequirement: requirement,
      correctAnswerOrNote: suggestedNotes,
      explanationOrReason: whyNeeded,
      addedAt: new Date().toLocaleDateString('bg-BG'),
      resolved: false
    };

    if (existingIndex >= 0) {
      errors[existingIndex] = newError;
    } else {
      errors.unshift(newError);
    }

    this.saveErrors(errors);
    return newError;
  },

  /**
   * След предаден изпитен вариант: сгрешените задачи се записват (отново като нерешени), а вярно
   * решените, които вече са в Банката, се отбелязват като усвоени. Връща колко са записани и усвоени.
   */
  recordExamReview(
    paper: { id: string; title: string; subject: string; exam: string },
    review: AnswerReview,
    sourceTitleOf: (questionId: string) => string = () => paper.title
  ): { recorded: number; resolved: number } {
    if (review.mistakes.length === 0 && review.correctIds.length === 0) return { recorded: 0, resolved: 0 };
    const errors = this.getAllErrors();
    const byId = new Map(errors.map((e) => [e.id, e]));
    const today = new Date().toLocaleDateString('bg-BG');
    const fresh: SavedErrorItem[] = [];
    for (const m of review.mistakes) {
      const q = m.question;
      const item: SavedErrorItem = {
        id: examErrorId(q.id),
        type: 'exam_task',
        lessonId: paper.id,
        lessonTitle: sourceTitleOf(q.id),
        subject: paper.subject,
        grade: paper.exam,
        questionOrRequirement: q.prompt,
        userAnswer: m.userAnswer,
        correctAnswerOrNote: m.correctAnswer,
        explanationOrReason: q.kind === 'open' ? q.modelAnswer : q.explanation,
        addedAt: today,
        resolved: false,
        examQuestionId: q.id,
      };
      if (byId.has(item.id)) byId.set(item.id, item);
      else fresh.push(item);
    }
    let resolved = 0;
    for (const id of review.correctIds) {
      const item = byId.get(examErrorId(id));
      if (item && !item.resolved) {
        byId.set(item.id, { ...item, resolved: true });
        resolved += 1;
      }
    }
    this.saveErrors([...fresh, ...errors.map((e) => byId.get(e.id) ?? e)]);
    return { recorded: review.mistakes.length, resolved };
  },

  toggleResolved(id: string): void {
    const errors = this.getAllErrors().map(e => (e.id === id ? { ...e, resolved: !e.resolved } : e));
    this.saveErrors(errors);
  },

  removeError(id: string): void {
    const errors = this.getAllErrors().filter(e => e.id !== id);
    this.saveErrors(errors);
  },

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
    syncCache([], null);
  },

  getUnresolvedCount(): number {
    this.getAllErrors();
    return cachedUnresolvedCount;
  }
};
