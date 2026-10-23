import type { ExamPaper, PaperQuestion, PaperSection } from '../lib/examPaperScoring';
import { EXAM_PAPERS } from './examPapers';
import { TOPICS, TOPIC_BY_KEY, topicOf, type TopicKey } from './examTopics';

/**
 * Тренировка по тема: всички задачи по една тема от официалните варианти — НВО 10 по математика
 * и ДЗИ по математика (2021–2026), групирани по година. Ключът и точките са на МОН — както във вариантите.
 */

export const NVO10_PAGE_URL = 'https://www.mon.bg/obshto-obrazovanie/natsionalno-vanshno-otsenyavane-nvo/nvo-za-x-klas/';
export const DZI_MATH_PAGE_URL = 'https://www.mon.bg/obshto-obrazovanie/darzhavni-zrelostni-izpiti-dzi/izpitni-materiali-za-dzi-po-predmeti/matematika/';

type TopicExam = 'НВО 10' | 'ДЗИ';

const EXAM_OF_AREA: Partial<Record<'math' | 'dzi', TopicExam>> = { math: 'НВО 10', dzi: 'ДЗИ' };

const officialMath = (exam: TopicExam) =>
  EXAM_PAPERS.filter((p) => p.kind === 'official' && p.exam === exam && p.subject === 'Математика').sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

/** Ключовете на ДЗИ вече започват с „dzi-“, затова id-то е „topic-dzi-…“ */
export const topicPaperId = (key: TopicKey): string => (TOPIC_BY_KEY[key].area === 'dzi' ? `topic-${key}` : `topic-nvo10-${key}`);

function buildTopicPaper(key: TopicKey, exam: TopicExam): ExamPaper | null {
  const info = TOPIC_BY_KEY[key];
  const isDzi = exam === 'ДЗИ';
  let n = 0;
  const sections: PaperSection[] = [];
  for (const paper of officialMath(exam)) {
    const questions = paper.sections
      .flatMap((s) => s.questions)
      .filter((q) => topicOf(q) === key)
      .map((q) => ({ ...q, number: ++n }) as PaperQuestion);
    if (questions.length === 0) continue;
    sections.push({
      id: `y${paper.year}`,
      title: `${isDzi ? 'ДЗИ' : 'НВО'} ${paper.year}`,
      instructions: `От официалния вариант „${paper.title}“. Ключът и точките са на МОН.`,
      questions,
    });
  }
  if (n === 0) return null;
  const years = sections.map((s) => Number(s.id.slice(1)));
  const span = Math.min(...years) === Math.max(...years) ? `${years[0]}` : `${Math.min(...years)}–${Math.max(...years)}`;
  return {
    id: topicPaperId(key),
    title: `${isDzi ? 'ДЗИ по математика' : 'НВО 10'} — ${info.label}: задачи от ${span}`,
    exam,
    subject: 'Математика',
    kind: 'topic',
    officialSourceUrl: isDzi ? DZI_MATH_PAGE_URL : NVO10_PAGE_URL,
    durationMinutes: 0,
    untimed: true,
    maxPoints: sections.reduce((sum, s) => sum + s.questions.reduce((a, q) => a + q.points, 0), 0),
    gradeScale: null,
    formulaSheet: isDzi ? 'dzi-math' : 'nvo10-math',
    note: isDzi
      ? `${info.scope}. Задачите са от официалните матури на МОН с техния ключ, точки и критерии (до 2021 г. ДЗИ е по друг формат, затова точките по години се различават). Обясненията към задачите с избираем отговор са на StudyBG.`
      : `${info.scope}. Задачите са от официалните варианти на МОН с техния ключ и точки (до 2025 г. изпитът е само по математика, затова точките по години се различават). Обясненията към задачите с избираем отговор са на StudyBG.`,
    sections,
  };
}

/** Наборите по теми — по математика за НВО 10 и за ДЗИ (за другите предмети в НВО 10 има наборите с примерни задачи) */
export const TOPIC_PAPERS: ExamPaper[] = TOPICS.flatMap((t) => {
  const exam = t.area === 'math' || t.area === 'dzi' ? EXAM_OF_AREA[t.area] : undefined;
  const paper = exam ? buildTopicPaper(t.key, exam) : null;
  return paper ? [paper] : [];
});
