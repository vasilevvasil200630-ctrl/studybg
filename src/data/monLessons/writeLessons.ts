import type { LessonData } from '../../types';

type LessonBase = Pick<LessonData, 'subject' | 'grade' | 'sourceType'> & Partial<Pick<LessonData, 'examType'>>;

/** Урок в кратък, четим запис — `writeLessons` го превръща в пълен `LessonData`. */
export interface LessonDraft {
  id: string;
  /** Номерът на темата в програмата, напр. 'm1:1.3' → `<programId>:m1:1.3`; масив, ако урокът покрива няколко теми */
  topic: string | string[];
  title: string;
  /** Какво казва програмата за темата */
  excerpt: string;
  overview: string;
  points: string[];
  rule: string;
  traps: string[];
  formulas?: [label: string, value: string][];
  /** Записи в тетрадката; първият е задължителен за отличен */
  notes: [requirement: string, whyNeeded: string, suggestedNotes: string][];
  cards: [front: string, back: string, tag?: string][];
  quiz: [question: string, options: string[], correctIndex: number, explanation: string][];
  ask: string[];
}

export function writeLessons(base: LessonBase, programId: string, drafts: LessonDraft[]): LessonData[] {
  return drafts.map((d) => ({
    ...base,
    id: d.id,
    monTopicIds: (Array.isArray(d.topic) ? d.topic : [d.topic]).map((t) => `${programId}:${t}`),
    title: d.title,
    originalNoteExcerpt: d.excerpt,
    summary: {
      overview: d.overview,
      keyPoints: d.points,
      examGoldenRule: d.rule,
      commonTraps: d.traps,
      formulasOrDates: (d.formulas ?? []).map(([label, value]) => ({ label, value })),
    },
    notebookChecklist: d.notes.map(([requirement, whyNeeded, suggestedNotes], i) => ({
      id: `${d.id}-chk-${i + 1}`,
      requirement,
      whyNeeded,
      isEssentialForSix: i === 0,
      suggestedNotes,
    })),
    flashcards: d.cards.map(([front, back, tag], i) => ({ id: `${d.id}-fc-${i + 1}`, front, back, ...(tag ? { tag } : {}) })),
    quiz: d.quiz.map(([question, options, correctIndex, explanation], i) => ({ id: i + 1, question, options, correctIndex, explanation })),
    quickQuestions: d.ask,
  }));
}
