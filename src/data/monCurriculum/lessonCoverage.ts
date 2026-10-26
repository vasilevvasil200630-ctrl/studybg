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

export function titlesMatch(topicTitle: string, lessonTitle: string): boolean {
  // Творбите се сравняват по заглавията в кавички — иначе общият автор свързва „Андрешко“ с урок за „Гераците“
  const topicWorks = quoted(topicTitle);
  const lessonWorks = quoted(lessonTitle);
  const a = stems(topicWorks && lessonWorks ? topicWorks : topicTitle);
  const b = stems(topicWorks && lessonWorks ? lessonWorks : lessonTitle);
  if (!a.size || !b.size) return false;
  let common = 0;
  for (const s of a) if (b.has(s)) common++;
  const shorter = Math.min(a.size, b.size);
  // Една обща дума стига само за еднословно заглавие („Вектори“); иначе „Квадратен корен“ би минал за „Квадратни уравнения“
  return common / shorter >= 0.5 && (common >= 2 || shorter === 1);
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

export function programCoverage(program: MonProgram, lessons: LessonData[]): ProgramCoverage {
  const lessonSubject = MON_SUBJECTS[program.subject].lessonSubject;
  const grades = programGrades(program);
  const candidates = lessonSubject
    ? lessons.filter((l) => l.subject === lessonSubject && lessonGradeNumbers(l.grade).some((g) => grades.includes(g)))
    : [];
  const topics = practiceTopics(program).map((t) => {
    // Урок, написан по темата от каталога, се връзва точно; останалите — по заглавие
    const exact = lessons.filter((l) => l.monTopicIds?.includes(t.id)).map((l) => l.id);
    const similar = candidates.filter((l) => !l.monTopicIds && titlesMatch(t.title, l.title)).map((l) => l.id);
    return { topicId: t.id, lessonIds: [...exact, ...similar] };
  });
  return { programId: program.id, topics, covered: topics.filter((t) => t.lessonIds.length).length, total: topics.length };
}
