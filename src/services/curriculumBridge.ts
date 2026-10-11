import type { LessonData } from '../types';
import type { UnsolvedMysteryItem, HeritageItem } from '../data/generalKnowledgeData';
import type { HistoryTimelineEvent } from '../data/bulgarianHistoryTimeline';

/**
 * Intelligent Curriculum Bridge
 * Seamlessly connects curiosity/general knowledge (mysteries, heritage, timeline)
 * directly to the 100-point МОН Exam Simulator and academic lessons.
 */

// Explicit high-priority overrides for specific culture entities
const MYSTERY_LESSON_MAP: Record<string, string> = {
  // Simeon the Great and Golden Age
  'mystery-simeon-golden-age': 'history-simeon-golden-age',
  
  // April Uprising and Liberation
  'mystery-levski-grave': 'history-april-uprising',
  'mystery-botev-death': 'history-april-uprising',
  
  // First Bulgarian Empire
  'mystery-madara-rider': 'history-asparukh-681',
  'mystery-pliska-rosetta': 'history-asparukh-681',
  
  // Second Bulgarian Empire & Medieval Books
  'mystery-kaloyan-death': 'history-simeon-golden-age',
  'mystery-tarnovo-lost-library': 'history-simeon-golden-age',
  
  // Folk & Revival
  'mystery-valchan-gold': 'history-april-uprising',
};

const HERITAGE_LESSON_MAP: Record<string, string> = {
  'heritage-preslav-school': 'history-simeon-golden-age',
  'heritage-madara-rider': 'history-asparukh-681',
  'heritage-pliska-great-basilica': 'history-asparukh-681',
  'heritage-rila-monastery': 'history-simeon-golden-age',
  'heritage-cyrillic-alphabet': 'history-simeon-golden-age',
};

const TIMELINE_YEAR_MAP: Record<number, string> = {
  681: 'history-asparukh-681',
  893: 'history-simeon-golden-age',
  917: 'history-simeon-golden-age',
  927: 'history-simeon-golden-age',
  1876: 'history-april-uprising',
  1877: 'bel-7-opalchentsite-shipka',
};

/**
 * Finds the corresponding curriculum lesson for an unsolved mystery item.
 */
export function findLessonForMystery(
  mystery: UnsolvedMysteryItem,
  lessons: LessonData[]
): LessonData | undefined {
  if (!lessons || lessons.length === 0) return undefined;

  // 1. Direct key override
  const directLessonId = MYSTERY_LESSON_MAP[mystery.id];
  if (directLessonId) {
    const directMatch = lessons.find(l => l.id === directLessonId);
    if (directMatch) return directMatch;
  }

  // 2. Specific title/keyword matching for Simeon and the Golden Age
  const mTitle = mystery.title.toLowerCase();
  const mSub = mystery.subtitle.toLowerCase();
  if (mTitle.includes('симеон') || mTitle.includes('златен век') || mSub.includes('симеон') || mSub.includes('преслав')) {
    const simeonLesson = lessons.find(l => l.id === 'history-simeon-golden-age' || l.title.toLowerCase().includes('симеон'));
    if (simeonLesson) return simeonLesson;
  }

  // 3. April Uprising & Botev & Levski
  if (mTitle.includes('левски') || mTitle.includes('ботев') || mTitle.includes('априлск')) {
    const aprilLesson = lessons.find(l => l.id === 'history-april-uprising' || l.id === 'bel-7-edna-balgarka');
    if (aprilLesson) return aprilLesson;
  }

  // 4. Asparukh & 681
  if (mTitle.includes('аспарух') || mTitle.includes('мадар') || mTitle.includes('плиска') || mTitle.includes('681')) {
    const asparukhLesson = lessons.find(l => l.id === 'history-asparukh-681');
    if (asparukhLesson) return asparukhLesson;
  }

  // 5. Fallback keyword heuristic
  return lessons.find(l => {
    const lTitle = l.title.toLowerCase();
    return lTitle.includes(mTitle.slice(0, 10)) || mTitle.includes(lTitle.slice(0, 10));
  });
}

/**
 * Finds the corresponding curriculum lesson for a heritage site/achievement.
 */
export function findLessonForHeritageItem(
  item: HeritageItem,
  lessons: LessonData[]
): LessonData | undefined {
  if (!lessons || lessons.length === 0) return undefined;

  const directLessonId = HERITAGE_LESSON_MAP[item.id];
  if (directLessonId) {
    const directMatch = lessons.find(l => l.id === directLessonId);
    if (directMatch) return directMatch;
  }

  const titleLower = item.title.toLowerCase();
  if (titleLower.includes('кирилиц') || titleLower.includes('преслав') || titleLower.includes('симеон')) {
    const simeonLesson = lessons.find(l => l.id === 'history-simeon-golden-age');
    if (simeonLesson) return simeonLesson;
  }

  if (titleLower.includes('мадар') || titleLower.includes('плиска') || titleLower.includes('аспарух')) {
    const asparukhLesson = lessons.find(l => l.id === 'history-asparukh-681');
    if (asparukhLesson) return asparukhLesson;
  }

  return undefined;
}

/**
 * Finds the corresponding curriculum lesson for a timeline event.
 */
export function findLessonForTimelineEvent(
  event: HistoryTimelineEvent,
  lessons: LessonData[]
): LessonData | undefined {
  if (!lessons || lessons.length === 0) return undefined;

  const eventYear = Number(event.year);
  const directLessonId = TIMELINE_YEAR_MAP[eventYear];
  if (directLessonId) {
    const directMatch = lessons.find(l => l.id === directLessonId);
    if (directMatch) return directMatch;
  }

  const eTitle = event.title.toLowerCase();
  const ruler = event.rulerOrLeader.toLowerCase();

  if (eTitle.includes('симеон') || ruler.includes('симеон') || eTitle.includes('ахелой') || eTitle.includes('преслав')) {
    const simeonLesson = lessons.find(l => l.id === 'history-simeon-golden-age');
    if (simeonLesson) return simeonLesson;
  }

  if (eTitle.includes('аспарух') || ruler.includes('аспарух') || eTitle.includes('онгъл') || eventYear === 681) {
    const asparukhLesson = lessons.find(l => l.id === 'history-asparukh-681');
    if (asparukhLesson) return asparukhLesson;
  }

  if (eTitle.includes('априлск') || eTitle.includes('копривщица') || eventYear === 1876) {
    const aprilLesson = lessons.find(l => l.id === 'history-april-uprising');
    if (aprilLesson) return aprilLesson;
  }

  if (eTitle.includes('шипка') || eventYear === 1877) {
    const shipkaLesson = lessons.find(l => l.id === 'bel-7-opalchentsite-shipka');
    if (shipkaLesson) return shipkaLesson;
  }

  return undefined;
}
