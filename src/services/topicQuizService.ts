import { loadTopicDetails, type MonProgram, type TopicInProgram } from '../data/monCurriculum';
import {
  MIN_VALID_QUESTIONS,
  buildQuizPrompt,
  lessonQuizFallback,
  pickBalanced,
  rememberQuestions,
  seenQuestions,
  shuffleOptions,
  validateQuestions,
  type TopicQuiz,
  type TopicQuizQuestion,
} from '../lib/topicQuiz';
import type { LessonData, QuizQuestion } from '../types';
import { errorBankService, type SavedErrorItem } from './errorBankService';
import { generateQuizQuestionsWithGemini, isAiAvailable } from './geminiService';
import { MON_SUBJECTS } from '../data/monCurriculum/subjects';

export interface TopicQuizResult extends TopicQuiz {
  /** Защо тестът е от уроците, а не нов от AI */
  fallbackReason?: string;
}

export class TopicQuizUnavailableError extends Error {}

/** Нов тест по темата: от Gemini, а ако AI не е достъпен — от уроците в сайта по темата */
export async function createTopicQuiz(params: {
  program: MonProgram;
  topic: TopicInProgram;
  /** Уроците от сайта, свързани с темата */
  lessons: LessonData[];
}): Promise<TopicQuizResult> {
  const { program, topic, lessons } = params;
  let reason = 'AI генерирането не е включено в сайта.';
  if (isAiAvailable()) {
    try {
      const details = await loadTopicDetails(topic.id);
      const avoid = seenQuestions(topic.id);
      const raw = await generateQuizQuestionsWithGemini({
        system: buildQuizPrompt({ program, topic, details, avoid }),
        user: `Генерирай теста. Вариант № ${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}.`,
      });
      const valid = validateQuestions(raw, `ai-${topic.id}-${Date.now().toString(36)}`);
      if (valid.length >= MIN_VALID_QUESTIONS) {
        const questions = shuffleOptions(pickBalanced(valid, avoid));
        rememberQuestions(topic.id, questions.map((q) => q.question));
        return { topicId: topic.id, source: 'ai', questions };
      }
      reason = 'AI върна непълен тест.';
    } catch (err) {
      reason = err instanceof Error ? err.message : 'AI не отговори.';
    }
  }
  const fallback = lessonQuizFallback(topic.id, lessons);
  if (fallback) return { ...fallback, fallbackReason: reason };
  throw new TopicQuizUnavailableError(reason);
}

const numericId = (id: string): number => {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return h >>> 0;
};

/** Грешен отговор от тест по тема → банката с грешки (с целия въпрос, за да се реши отново) */
export function recordTopicQuizMistake(program: MonProgram, topic: TopicInProgram, q: TopicQuizQuestion, chosen: number): SavedErrorItem {
  const raw: QuizQuestion = { id: numericId(q.id), question: q.question, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation };
  const item: SavedErrorItem = {
    id: `topic-${q.id}`,
    type: 'quiz_question',
    lessonId: topic.id,
    lessonTitle: topic.title,
    subject: MON_SUBJECTS[program.subject].name,
    grade: typeof program.stage === 'number' ? `${program.stage}. клас` : program.stage === 'pp' ? '11.–12. клас' : program.title,
    questionOrRequirement: q.question,
    userAnswer: q.options[chosen] ?? 'Непосочен отговор',
    correctAnswerOrNote: q.options[q.correctIndex],
    explanationOrReason: q.explanation,
    addedAt: new Date().toLocaleDateString('bg-BG'),
    resolved: false,
    rawQuestionData: raw,
  };
  const all = errorBankService.getAllErrors().filter((e) => e.id !== item.id);
  errorBankService.saveErrors([item, ...all]);
  return item;
}
