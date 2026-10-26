import { loadTopicDetails, practiceTopics, type MonProgram } from '../data/monCurriculum';
import {
  buildDiagnosticPrompt,
  saveDiagnosticRun,
  selectDiagnosticTopics,
  shuffleDiagnostic,
  validateDiagnostic,
  type DiagnosticRun,
} from '../lib/diagnostic';
import { recordTopicResult } from '../lib/topicMastery';
import { generateDiagnosticQuestionsWithGemini, isAiAvailable } from './geminiService';

export class DiagnosticUnavailableError extends Error {}

/** Под толкова въпроса входният тест не казва достатъчно за предмета */
const MIN_DIAGNOSTIC = 6;

/** Нов входен тест по предмета; запазва се веднага, за да може да продължи след презареждане */
export async function startDiagnostic(program: MonProgram): Promise<DiagnosticRun> {
  if (!isAiAvailable()) throw new DiagnosticUnavailableError('Входният тест се съставя от AI, а AI генерирането не е включено в сайта.');
  const topics = selectDiagnosticTopics(practiceTopics(program));
  const withDetails = await Promise.all(topics.map(async (topic) => ({ topic, details: await loadTopicDetails(topic.id) })));
  let raw: unknown[];
  try {
    raw = await generateDiagnosticQuestionsWithGemini({
      system: buildDiagnosticPrompt(program, withDetails),
      user: `Състави входния тест. Вариант № ${Date.now().toString(36)}.`,
    });
  } catch (err) {
    throw new DiagnosticUnavailableError(err instanceof Error ? err.message : 'AI не отговори.');
  }
  const questions = validateDiagnostic(raw, topics, `diag-${program.id}-${Date.now().toString(36)}`);
  if (questions.length < MIN_DIAGNOSTIC) throw new DiagnosticUnavailableError('AI върна непълен тест. Опитай отново.');
  const run: DiagnosticRun = {
    programId: program.id,
    questions: shuffleDiagnostic(questions),
    answers: questions.map(() => null),
    startedAt: new Date().toISOString(),
  };
  saveDiagnosticRun(run);
  return run;
}

/** Край на теста: всеки въпрос е резултат по своята тема */
export function finishDiagnostic(run: DiagnosticRun, now = new Date()): DiagnosticRun {
  const done = { ...run, finishedAt: now.toISOString() };
  run.questions.forEach((q, i) => recordTopicResult(q.topicId, run.answers[i] === q.correctIndex ? 1 : 0, 1, 'diagnostic', now));
  saveDiagnosticRun(done);
  return done;
}
