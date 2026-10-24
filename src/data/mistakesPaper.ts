import type { ExamPaper, PaperQuestion } from '../lib/examPaperScoring';
import { EXAM_PAPERS } from './examPapers';
import { collectSections } from './topicPapers';

/**
 * „Реши отново“ от Банката с грешки: сгрешените задачи от изпитните варианти, събрани в един набор
 * без таймер. Всяка задача е взета от варианта си (с текста към нея), затова е същата като на изпита.
 */

export const MISTAKES_PAPER_ID = 'review-mistakes';

/** Задачата и вариантът, от който е (наборите по тема ползват същите задачи, затова се търси само тук) */
const SOURCE = new Map<string, { paper: ExamPaper; question: PaperQuestion }>(
  EXAM_PAPERS.flatMap((paper) => paper.sections.flatMap((s) => s.questions.map((question) => [question.id, { paper, question }] as const)))
);

/** Заглавието на варианта, от който е задачата — за реда в Банката */
export const sourcePaperTitle = (questionId: string): string | null => SOURCE.get(questionId)?.paper.title ?? null;

/** Най-новите варианти първи; официалните преди тренировъчните */
const byRecency = (a: ExamPaper, b: ExamPaper) => (b.year ?? 0) - (a.year ?? 0) || (a.kind === 'official' ? -1 : b.kind === 'official' ? 1 : 0);

export function buildMistakesPaper(questionIds: readonly string[]): ExamPaper | null {
  const wanted = new Set(questionIds.filter((id) => SOURCE.has(id)));
  if (wanted.size === 0) return null;
  const papers = [...new Set([...wanted].map((id) => SOURCE.get(id)!.paper))].sort(byRecency);
  const sections = collectSections(papers, (q) => wanted.has(q.id), (paper) => ({ id: paper.id, title: paper.title }));
  const subjects = [...new Set(papers.map((p) => p.subject))];
  const sheets = [...new Set(papers.map((p) => p.formulaSheet))];
  return {
    id: MISTAKES_PAPER_ID,
    title: `Грешки от изпитните варианти: ${wanted.size} ${wanted.size === 1 ? 'задача' : 'задачи'}`,
    exam: papers[0].exam,
    subject: subjects.join(' и '),
    kind: 'review',
    durationMinutes: 0,
    untimed: true,
    maxPoints: sections.reduce((sum, s) => sum + s.questions.reduce((a, q) => a + q.points, 0), 0),
    gradeScale: null,
    ...(sheets.length === 1 && sheets[0] && { formulaSheet: sheets[0] }),
    note: 'Задачите, които си сгрешил във вариантите и в наборите по тема, с текстовете към тях. Всяка, която решиш вярно, се отбелязва в Банката като усвоена.',
    sections,
  };
}
