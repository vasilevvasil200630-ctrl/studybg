import type { ExamPaper, PaperQuestion, PaperSection } from '../../lib/examPaperScoring';
import { NVO10_MATH_2026 } from '../officialPapers/nvo10Math2026';

/**
 * Общото за наборите „Другите предмети в НВО 10“: задачите по предмета от НВО 2026 (с ключа на МОН)
 * и примерните задачи, които МОН публикува на 30.09.2025 г. без отговори.
 */

export const SAMPLE_NOTE =
  'Задачите са официални — от изпита през 2026 г. и от примерните задачи на МОН. МОН не е публикувал отговори на примерните задачи: тях ги е изчислил и проверил StudyBG, а точките им са условни (по 2 т. за отговор). Задачите от НВО 2026 са с ключа и точките на МОН.';

export const SAMPLES_SECTION_TITLE = 'Примерни задачи на МОН (публикувани на 30.09.2025 г.)';
export const SAMPLES_SECTION_INSTRUCTIONS =
  'Пиши само отговора (число, дума или избор), както на изпита. Отговорите и обясненията са на StudyBG, защото МОН не е публикувал ключ към тези задачи.';

/** Задачите по предмета от НВО 2026, с номерата им в набора (а не в изпита) */
export function nvo2026Section(questionIds: string[]): PaperSection {
  const all = NVO10_MATH_2026.sections.flatMap((s) => s.questions);
  const questions = questionIds.map((id, i) => {
    const q = all.find((x) => x.id === id);
    if (!q) throw new Error(`Няма задача ${id} в НВО 2026`);
    return { ...q, number: i + 1 } as PaperQuestion;
  });
  return {
    id: 'nvo2026',
    title: 'Задачи от НВО 2026 — с ключа на МОН',
    instructions: 'Официалните задачи по този предмет от изпита на 19.06.2026 г. Точките и ключът са на МОН.',
    questions,
  };
}

/** Номерира задачите последователно през всички секции */
export function numbered(sections: PaperSection[]): PaperSection[] {
  let n = 0;
  return sections.map((s) => ({ ...s, questions: s.questions.map((q) => ({ ...q, number: ++n }) as PaperQuestion) }));
}

export const maxPointsOf = (sections: PaperSection[]): number => sections.reduce((sum, s) => sum + s.questions.reduce((a, q) => a + q.points, 0), 0);

export const SAMPLE_PAPER_BASE: Pick<ExamPaper, 'exam' | 'kind' | 'durationMinutes' | 'untimed' | 'gradeScale' | 'note' | 'year'> = {
  exam: 'НВО 10',
  kind: 'sample',
  durationMinutes: 0,
  untimed: true,
  gradeScale: null,
  note: SAMPLE_NOTE,
  year: 2026,
};
