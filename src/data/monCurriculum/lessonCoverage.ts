import type { LessonData, LessonGrade } from '../../types';
import { practiceTopics, programGrades } from './index';
import { MON_SUBJECTS } from './subjects';
import type { MonProgram } from './types';

// Кои теми от програмата вече имат урок в сайта. Сравнението е по предмет, клас и основите на думите в заглавията.

export function lessonGradeNumbers(grade: LessonGrade): number[] {
  const range = grade.match(/^(\d{1,2})\.–(\d{1,2})\./);
  if (range) {
    const out: number[] = [];
    for (let g = +range[1]; g <= +range[2]; g++) out.push(g);
    return out;
  }
  const one = grade.match(/^(\d{1,2})\./);
  return one ? [+one[1]] : [];
}

// Служебни и твърде общи думи („основни“, „приложение“, „съвременен“), които не казват за каква тема става дума
const STOP = new Set(['като', 'между', 'чрез', 'върху', 'след', 'през', 'както', 'основ', 'видов', 'прило', 'харак', 'техни', 'негов', 'нейни', 'други', 'съвре', 'разви']);

/** Основи на думите: малки букви, без пунктуация, първите 5 букви на думите с поне 4 букви */
export function stems(text: string): Set<string> {
  const out = new Set<string>();
  for (const word of text.toLowerCase().match(/[\p{L}]+/gu) ?? []) {
    if (word.length < 4) continue;
    const stem = word.slice(0, 5);
    if (!STOP.has(stem)) out.add(stem);
  }
  return out;
}

const quoted = (text: string) => (text.match(/„[^“”]+[“”]/g) ?? []).join(' ');

function setsMatch(a: Set<string>, b: Set<string>): boolean {
  if (!a.size || !b.size) return false;
  let common = 0;
  for (const s of a) if (b.has(s)) common++;
  const shorter = Math.min(a.size, b.size);
  // Една обща дума стига само за еднословно заглавие („Вектори“); иначе „Квадратен корен“ би минал за „Квадратни уравнения“
  return common / shorter >= 0.5 && (common >= 2 || shorter === 1);
}

export function titlesMatch(topicTitle: string, lessonTitle: string): boolean {
  // Творбите се сравняват по заглавията в кавички — иначе общият автор свързва „Андрешко“ с урок за „Гераците“
  const topicWorks = quoted(topicTitle);
  const lessonWorks = quoted(lessonTitle);
  const a = stems(topicWorks && lessonWorks ? topicWorks : topicTitle);
  const b = stems(topicWorks && lessonWorks ? lessonWorks : lessonTitle);
  return setsMatch(a, b);
}

export interface TopicCoverage {
  topicId: string;
  lessonIds: string[];
}

export interface ProgramCoverage {
  programId: string;
  topics: TopicCoverage[];
  /** Теми с поне един урок */
  covered: number;
  total: number;
}

interface PrecomputedCandidate {
  id: string;
  grades: number[];
  worksStems: Set<string> | null;
  titleStems: Set<string>;
}

interface LessonCoverageIndex {
  byMonTopicId: Map<string, string[]>;
  unmappedBySubject: Map<string, PrecomputedCandidate[]>;
  programCache: Map<string, ProgramCoverage>;
}

const coverageIndexCache = new WeakMap<LessonData[], LessonCoverageIndex>();

function getCoverageIndex(lessons: LessonData[]): LessonCoverageIndex {
  let idx = coverageIndexCache.get(lessons);
  if (idx) return idx;

  const byMonTopicId = new Map<string, string[]>();
  const unmappedBySubject = new Map<string, PrecomputedCandidate[]>();

  for (const l of lessons) {
    if (l.monTopicIds && l.monTopicIds.length > 0) {
      for (const tid of l.monTopicIds) {
        let list = byMonTopicId.get(tid);
        if (!list) {
          list = [];
          byMonTopicId.set(tid, list);
        }
        list.push(l.id);
      }
    } else {
      const works = quoted(l.title);
      const cand: PrecomputedCandidate = {
        id: l.id,
        grades: lessonGradeNumbers(l.grade),
        worksStems: works ? stems(works) : null,
        titleStems: stems(l.title),
      };
      let list = unmappedBySubject.get(l.subject);
      if (!list) {
        list = [];
        unmappedBySubject.set(l.subject, list);
      }
      list.push(cand);
    }
  }

  idx = {
    byMonTopicId,
    unmappedBySubject,
    programCache: new Map<string, ProgramCoverage>(),
  };
  coverageIndexCache.set(lessons, idx);
  return idx;
}

export function programCoverage(program: MonProgram, lessons: LessonData[]): ProgramCoverage {
  const idx = getCoverageIndex(lessons);
  const cached = idx.programCache.get(program.id);
  if (cached) return cached;

  const lessonSubject = MON_SUBJECTS[program.subject].lessonSubject;
  const grades = programGrades(program);
  const subjectPool = lessonSubject ? idx.unmappedBySubject.get(lessonSubject) ?? [] : [];
  const candidates = subjectPool.filter((c) => c.grades.some((g) => grades.includes(g)));

  const topics = practiceTopics(program).map((t) => {
    const exact = idx.byMonTopicId.get(t.id) ?? [];
    let similar: string[] = [];
    if (candidates.length > 0) {
      const topicWorks = quoted(t.title);
      const topicWorksStems = topicWorks ? stems(topicWorks) : null;
      const topicTitleStems = stems(t.title);
      similar = candidates
        .filter((c) => {
          const useWorks = Boolean(topicWorksStems && c.worksStems);
          return setsMatch(useWorks ? topicWorksStems! : topicTitleStems, useWorks ? c.worksStems! : c.titleStems);
        })
        .map((c) => c.id);
    }
    return { topicId: t.id, lessonIds: exact.length && similar.length ? [...exact, ...similar] : exact.length ? exact : similar };
  });

  const result: ProgramCoverage = {
    programId: program.id,
    topics,
    covered: topics.filter((t) => t.lessonIds.length > 0).length,
    total: topics.length,
  };
  idx.programCache.set(program.id, result);
  return result;
}
