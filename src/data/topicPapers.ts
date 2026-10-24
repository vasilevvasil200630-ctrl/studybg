import type { ExamPaper, PaperQuestion, PaperSection } from '../lib/examPaperScoring';
import { EXAM_PAPERS } from './examPapers';
import { TOPICS, TOPIC_BY_KEY, topicOf, type TopicArea, type TopicKey } from './examTopics';

/**
 * Тренировка по тема: всички задачи по една тема от официалните варианти — НВО 10 и ДЗИ по
 * математика и по БЕЛ (2021–2026), групирани по година. Ключът и точките са на МОН — както във вариантите.
 * Задачите към текст (откъс в обществено достояние или връзка към PDF-а на МОН) остават заедно с текста си.
 */

export const NVO10_PAGE_URL = 'https://www.mon.bg/obshto-obrazovanie/natsionalno-vanshno-otsenyavane-nvo/nvo-za-x-klas/';
export const DZI_MATH_PAGE_URL = 'https://www.mon.bg/obshto-obrazovanie/darzhavni-zrelostni-izpiti-dzi/izpitni-materiali-za-dzi-po-predmeti/matematika/';
export const DZI_BEL_PAGE_URL = 'https://www.mon.bg/obshto-obrazovanie/darzhavni-zrelostni-izpiti-dzi/izpitni-materiali-za-dzi-po-predmeti/balgarski-ezik/';

interface AreaSource {
  exam: 'НВО 10' | 'ДЗИ';
  subject: 'Математика' | 'Български език и литература';
  /** Началото на заглавието на набора */
  name: string;
  /** Заглавието на раздела за една година: „НВО 2025“ */
  yearLabel: string;
  pageUrl: string;
  formulaSheet?: ExamPaper['formulaSheet'];
  /** Защо точките по години се различават */
  formatNote: string;
}

const BEL_NOTE = 'Текстовете, защитени с авторско право, се отварят в PDF-а на МОН — бутонът е при задачите към тях.';

/** Откъде се взимат задачите за всяка област с тренировка по тема (интегрираните предмети имат примерни набори) */
export const AREA_SOURCES: Partial<Record<TopicArea, AreaSource>> = {
  math: {
    exam: 'НВО 10', subject: 'Математика', name: 'НВО 10', yearLabel: 'НВО', pageUrl: NVO10_PAGE_URL, formulaSheet: 'nvo10-math',
    formatNote: 'до 2025 г. изпитът е само по математика, затова точките по години се различават',
  },
  dzi: {
    exam: 'ДЗИ', subject: 'Математика', name: 'ДЗИ по математика', yearLabel: 'ДЗИ', pageUrl: DZI_MATH_PAGE_URL, formulaSheet: 'dzi-math',
    formatNote: 'до 2021 г. ДЗИ е по друг формат, затова точките по години се различават',
  },
  bel: {
    exam: 'НВО 10', subject: 'Български език и литература', name: 'НВО 10 по БЕЛ', yearLabel: 'НВО', pageUrl: NVO10_PAGE_URL,
    formatNote: `през 2021 г. максимумът е 50 точки, затова точките по години се различават. ${BEL_NOTE}`,
  },
  'dzi-bel': {
    exam: 'ДЗИ', subject: 'Български език и литература', name: 'ДЗИ по БЕЛ', yearLabel: 'ДЗИ', pageUrl: DZI_BEL_PAGE_URL,
    formatNote: `до 2021 г. ДЗИ е по друг формат, затова точките по години се различават. ${BEL_NOTE}`,
  },
};

const officialPapers = (src: AreaSource) =>
  EXAM_PAPERS.filter((p) => p.kind === 'official' && p.exam === src.exam && p.subject === src.subject).sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

/** Ключовете на ДЗИ вече започват с „dzi-“, затова id-то е „topic-dzi-…“ */
export const topicPaperId = (key: TopicKey): string => (key.startsWith('dzi-') ? `topic-${key}` : `topic-nvo10-${key}`);

/** Годината на раздел от набор по тема: „y2025“ или „y2025-text1“ → 2025 */
export const topicSectionYear = (section: PaperSection): number => Number.parseInt(section.id.slice(1), 10);

/**
 * Подбраните задачи от няколко варианта, номерирани наново от 1. Поредните задачи без текст от един
 * вариант са в общ раздел; задачите към текст — в раздел с текста си (откъс или връзка към PDF-а на МОН).
 */
export function collectSections(
  papers: ExamPaper[],
  keep: (q: PaperQuestion) => boolean,
  label: (paper: ExamPaper) => { id: string; title: string }
): PaperSection[] {
  let n = 0;
  const sections: PaperSection[] = [];
  for (const paper of papers) {
    const { id: baseId, title } = label(paper);
    const instructions = `От ${paper.kind === 'official' ? 'официалния вариант' : 'варианта'} „${paper.title}“.${paper.kind === 'official' ? ' Ключът и точките са на МОН.' : ''}`;
    let plain: PaperSection | null = null;
    for (const sec of paper.sections) {
      const questions = sec.questions.filter(keep).map((q) => ({ ...q, number: ++n }) as PaperQuestion);
      if (questions.length === 0) continue;
      const context = sec.sourceText ?? sec.externalText;
      if (context) {
        sections.push({
          id: `${baseId}-${sec.id}`,
          title: `${title} — ${context.title}`,
          instructions,
          ...(sec.sourceText && { sourceText: sec.sourceText }),
          ...(sec.externalText && { externalText: sec.externalText }),
          questions,
        });
        plain = null;
      } else if (plain) {
        plain.questions.push(...questions);
      } else {
        const id = sections.some((s) => s.id === baseId) ? `${baseId}-${sec.id}` : baseId;
        plain = { id, title, instructions, questions };
        sections.push(plain);
      }
    }
  }
  return sections;
}

function buildTopicPaper(key: TopicKey, src: AreaSource): ExamPaper | null {
  const info = TOPIC_BY_KEY[key];
  const sections = collectSections(
    officialPapers(src),
    (q) => topicOf(q) === key,
    (paper) => ({ id: `y${paper.year}`, title: `${src.yearLabel} ${paper.year}` })
  );
  if (sections.length === 0) return null;
  const years = sections.map(topicSectionYear);
  const span = Math.min(...years) === Math.max(...years) ? `${years[0]}` : `${Math.min(...years)}–${Math.max(...years)}`;
  return {
    id: topicPaperId(key),
    title: `${src.name} — ${info.label}: задачи от ${span}`,
    exam: src.exam,
    subject: src.subject,
    kind: 'topic',
    officialSourceUrl: src.pageUrl,
    durationMinutes: 0,
    untimed: true,
    maxPoints: sections.reduce((sum, s) => sum + s.questions.reduce((a, q) => a + q.points, 0), 0),
    gradeScale: null,
    ...(src.formulaSheet && { formulaSheet: src.formulaSheet }),
    note: `${info.scope}. Задачите са от официалните варианти на МОН с техния ключ, точки и критерии (${src.formatNote}). Обясненията към задачите с избираем отговор са на StudyBG.`,
    sections,
  };
}

/** Наборите по теми — по математика и по БЕЛ за НВО 10 и за ДЗИ (за другите предмети в НВО 10 има наборите с примерни задачи) */
export const TOPIC_PAPERS: ExamPaper[] = TOPICS.flatMap((t) => {
  const src = AREA_SOURCES[t.area];
  const paper = src ? buildTopicPaper(t.key, src) : null;
  return paper ? [paper] : [];
});
