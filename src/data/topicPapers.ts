import type { ExamPaper, PaperQuestion, PaperSection } from '../lib/examPaperScoring';
import { EXAM_PAPERS } from './examPapers';
import { TOPICS, TOPIC_BY_KEY, topicOf, type TopicKey } from './examTopics';

/**
 * Тренировка по тема: всички задачи по една тема от официалните варианти на НВО 10 по математика
 * (2021–2026), групирани по година. Ключът и точките са на МОН — както във вариантите.
 */

export const NVO10_PAGE_URL = 'https://www.mon.bg/obshto-obrazovanie/natsionalno-vanshno-otsenyavane-nvo/nvo-za-x-klas/';

const officialMath = EXAM_PAPERS.filter((p) => p.kind === 'official' && p.exam === 'НВО 10').sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

export const topicPaperId = (key: TopicKey): string => `topic-nvo10-${key}`;

function buildTopicPaper(key: TopicKey): ExamPaper | null {
  const info = TOPIC_BY_KEY[key];
  let n = 0;
  const sections: PaperSection[] = [];
  for (const paper of officialMath) {
    const questions = paper.sections
      .flatMap((s) => s.questions)
      .filter((q) => topicOf(q) === key)
      .map((q) => ({ ...q, number: ++n }) as PaperQuestion);
    if (questions.length === 0) continue;
    sections.push({
      id: `y${paper.year}`,
      title: `НВО ${paper.year}`,
      instructions: `От официалния вариант „${paper.title}“. Ключът и точките са на МОН.`,
      questions,
    });
  }
  if (n === 0) return null;
  const years = sections.map((s) => Number(s.id.slice(1)));
  return {
    id: topicPaperId(key),
    title: `НВО 10 — ${info.label}: задачи от ${Math.min(...years)}–${Math.max(...years)}`,
    exam: 'НВО 10',
    subject: 'Математика',
    kind: 'topic',
    officialSourceUrl: NVO10_PAGE_URL,
    durationMinutes: 0,
    untimed: true,
    maxPoints: sections.reduce((sum, s) => sum + s.questions.reduce((a, q) => a + q.points, 0), 0),
    gradeScale: null,
    formulaSheet: 'nvo10-math',
    note: `${info.scope}. Задачите са от официалните варианти на МОН с техния ключ и точки (до 2025 г. изпитът е само по математика, затова точките по години се различават). Обясненията към задачите с избираем отговор са на StudyBG.`,
    sections,
  };
}

/** Наборите по теми по математика (за другите предмети има отделни набори с примерни задачи) */
export const TOPIC_PAPERS: ExamPaper[] = TOPICS.filter((t) => t.area === 'math')
  .map((t) => buildTopicPaper(t.key))
  .filter((p): p is ExamPaper => p !== null);
