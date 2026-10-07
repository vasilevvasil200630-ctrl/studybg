import type { QuizQuestion, LessonData } from '../types';

export interface SavedErrorItem {
  id: string;
  type: 'quiz_question' | 'notebook_missing_point';
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
}

const STORAGE_KEY = 'studybg_error_bank';

export const errorBankService = {
  getAllErrors(): SavedErrorItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as SavedErrorItem[];
    } catch {
      return [];
    }
  },

  saveErrors(items: SavedErrorItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable or full
    }
  },

  recordQuizError(
    question: QuizQuestion,
    lesson: LessonData,
    selectedOptionIndex: number
  ): SavedErrorItem {
    const errors = this.getAllErrors();
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
    const errors = this.getAllErrors();
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

  toggleResolved(id: string): void {
    const errors = this.getAllErrors();
    const item = errors.find(e => e.id === id);
    if (item) {
      item.resolved = !item.resolved;
      this.saveErrors(errors);
    }
  },

  removeError(id: string): void {
    const errors = this.getAllErrors().filter(e => e.id !== id);
    this.saveErrors(errors);
  },

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  getUnresolvedCount(): number {
    return this.getAllErrors().filter(e => !e.resolved).length;
  }
};
