import { loadTopicDetails, type MonProgram, type TopicInProgram } from '../data/monCurriculum';
import { buildLessonPrompt, cacheLesson, cachedLesson, validateLesson, type TopicLesson } from '../lib/topicLesson';
import { generateTopicLessonWithGemini, isAiAvailable } from './geminiService';

export class TopicLessonUnavailableError extends Error {}

/** Урокът по темата: от кеша, а ако го няма (или се иска нов вариант) — нов от AI */
export async function getTopicLesson(program: MonProgram, topic: TopicInProgram, options: { fresh?: boolean } = {}): Promise<TopicLesson> {
  if (!options.fresh) {
    const hit = cachedLesson(topic.id);
    if (hit) return hit;
  }
  if (!isAiAvailable()) throw new TopicLessonUnavailableError('Урокът се съставя от AI, а AI генерирането не е включено в сайта.');
  let raw: Record<string, unknown>;
  try {
    const details = await loadTopicDetails(topic.id);
    raw = await generateTopicLessonWithGemini({ system: buildLessonPrompt(program, topic, details), user: 'Напиши урока.' });
  } catch (err) {
    throw new TopicLessonUnavailableError(err instanceof Error ? err.message : 'AI не отговори.');
  }
  const lesson = validateLesson(raw);
  if (!lesson) throw new TopicLessonUnavailableError('AI върна непълен урок. Опитай отново.');
  cacheLesson(topic.id, lesson);
  return lesson;
}
