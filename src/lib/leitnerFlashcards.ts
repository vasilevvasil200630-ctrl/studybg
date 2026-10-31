/**
 * Leitner система за интервално повторение (Spaced Repetition) при флаш картите,
 * прехвърлена от МатураПлюс (src/lib/flashcards.ts & src/app/api/flashcards/review/route.ts).
 */

export type Response = 'hard' | 'medium' | 'easy';
export type LeitnerBox = 1 | 2 | 3 | 4 | 5;

export const LEITNER_INTERVAL_DAYS: Record<LeitnerBox, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
};

export interface LeitnerCardState {
  id: string;
  box: LeitnerBox;
  nextDueAt: string;
  lastReviewedAt: string | null;
  timesReviewed: number;
  timesHard: number;
  timesMedium: number;
  timesEasy: number;
}

const STORAGE_KEY = 'studybg_leitner_cards_v1';
const MASTERED_KEY = 'studybg_flashcards_mastered_v1';
const REVIEW_KEY = 'studybg_flashcards_review_v1';

let cachedRawJson: string | null | undefined = undefined;
let cachedMap: Record<string, LeitnerCardState> = {};

export function nextDueFromBox(box: number, from: Date = new Date()): Date {
  const safeBox = Math.min(5, Math.max(1, box)) as LeitnerBox;
  const days = LEITNER_INTERVAL_DAYS[safeBox];
  return new Date(from.getTime() + days * 24 * 60 * 60 * 1000);
}

export function applyLeitnerReview(
  currentBox: number,
  response: Response,
  from: Date = new Date()
): {
  newBox: LeitnerBox;
  nextDueAt: Date;
} {
  let newBox = currentBox;
  if (response === 'hard') newBox = 1;
  else if (response === 'medium') newBox = Math.max(1, Math.min(5, currentBox));
  else newBox = Math.min(5, currentBox + 1);

  const safeNewBox = Math.min(5, Math.max(1, newBox)) as LeitnerBox;
  return { newBox: safeNewBox, nextDueAt: nextDueFromBox(safeNewBox, from) };
}

export function boxLabel(box: number): string {
  switch (box) {
    case 1:
      return 'нова';
    case 2:
      return 'учи се';
    case 3:
      return 'затвърждаване';
    case 4:
      return 'почти научена';
    case 5:
      return 'усвоена';
    default:
      return '';
  }
}

export function readLeitnerStore(): Record<string, LeitnerCardState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRawJson) {
      return cachedMap;
    }
    if (!raw) {
      cachedRawJson = null;
      cachedMap = {};
      return cachedMap;
    }
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      cachedRawJson = raw;
      cachedMap = parsed as Record<string, LeitnerCardState>;
      return cachedMap;
    }
  } catch {
    // ignore storage errors
  }
  return {};
}

function writeLeitnerStore(
  store: Record<string, LeitnerCardState>,
  options?: { silentCloudTrigger?: boolean }
): void {
  try {
    const raw = JSON.stringify(store);
    localStorage.setItem(STORAGE_KEY, raw);
    cachedRawJson = raw;
    cachedMap = store;
    if (!options?.silentCloudTrigger && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('studybg:local-data-mutated', { detail: { source: 'leitner_flashcards' } })
      );
    }
  } catch {
    // ignore storage errors
  }
}

export function saveLeitnerStore(
  store: Record<string, LeitnerCardState>,
  options?: { silentCloudTrigger?: boolean }
): void {
  writeLeitnerStore(store, options);
  try {
    const masteredSet = new Set<string>();
    const reviewSet = new Set<string>();
    for (const [cardId, state] of Object.entries(store)) {
      if (!state || typeof state !== 'object') continue;
      if (state.box >= 4 || (state.timesEasy > 0 && state.box >= 2)) {
        masteredSet.add(cardId);
      } else if (state.timesHard > 0 && state.box === 1) {
        reviewSet.add(cardId);
      }
    }
    localStorage.setItem(MASTERED_KEY, JSON.stringify(Array.from(masteredSet)));
    localStorage.setItem(REVIEW_KEY, JSON.stringify(Array.from(reviewSet)));
  } catch {
    // ignore storage errors
  }
}

/**
 * Слива локалното и облачното състояние на Leitner флаш картите без загуба на прогрес.
 * За всяка карта избира по-скорошното ревю (по lastReviewedAt или timesReviewed) и запазва максималните броячи.
 */
export function mergeLeitnerCardStores(
  local: Record<string, LeitnerCardState>,
  cloud: Record<string, LeitnerCardState> | null | undefined
): Record<string, LeitnerCardState> {
  if (!cloud || typeof cloud !== 'object' || Array.isArray(cloud)) {
    return { ...local };
  }

  const merged: Record<string, LeitnerCardState> = { ...local };

  for (const [cardId, cloudCard] of Object.entries(cloud)) {
    if (!cloudCard || typeof cloudCard !== 'object' || !cardId.trim()) continue;
    const localCard = merged[cardId];
    if (!localCard) {
      merged[cardId] = {
        id: cardId,
        box: Math.min(5, Math.max(1, Number(cloudCard.box) || 1)) as LeitnerBox,
        nextDueAt: typeof cloudCard.nextDueAt === 'string' ? cloudCard.nextDueAt : new Date(0).toISOString(),
        lastReviewedAt: typeof cloudCard.lastReviewedAt === 'string' ? cloudCard.lastReviewedAt : null,
        timesReviewed: Math.max(0, Number(cloudCard.timesReviewed) || 0),
        timesHard: Math.max(0, Number(cloudCard.timesHard) || 0),
        timesMedium: Math.max(0, Number(cloudCard.timesMedium) || 0),
        timesEasy: Math.max(0, Number(cloudCard.timesEasy) || 0),
      };
      continue;
    }

    const localTime = localCard.lastReviewedAt ? Date.parse(localCard.lastReviewedAt) : 0;
    const cloudTime = cloudCard.lastReviewedAt ? Date.parse(cloudCard.lastReviewedAt) : 0;
    const safeLocalTime = Number.isNaN(localTime) ? 0 : localTime;
    const safeCloudTime = Number.isNaN(cloudTime) ? 0 : cloudTime;

    const useCloudState =
      safeCloudTime > safeLocalTime ||
      (safeCloudTime === safeLocalTime &&
        (Number(cloudCard.timesReviewed) || 0) > (Number(localCard.timesReviewed) || 0));

    const winner = useCloudState ? cloudCard : localCard;

    merged[cardId] = {
      id: cardId,
      box: Math.min(5, Math.max(1, Number(winner.box) || 1)) as LeitnerBox,
      nextDueAt: typeof winner.nextDueAt === 'string' ? winner.nextDueAt : localCard.nextDueAt,
      lastReviewedAt:
        typeof winner.lastReviewedAt === 'string'
          ? winner.lastReviewedAt
          : localCard.lastReviewedAt ?? cloudCard.lastReviewedAt ?? null,
      timesReviewed: Math.max(
        Number(localCard.timesReviewed) || 0,
        Number(cloudCard.timesReviewed) || 0
      ),
      timesHard: Math.max(Number(localCard.timesHard) || 0, Number(cloudCard.timesHard) || 0),
      timesMedium: Math.max(Number(localCard.timesMedium) || 0, Number(cloudCard.timesMedium) || 0),
      timesEasy: Math.max(Number(localCard.timesEasy) || 0, Number(cloudCard.timesEasy) || 0),
    };
  }

  return merged;
}

export function getLeitnerCardState(cardId: string): LeitnerCardState {
  const store = readLeitnerStore();
  const existing = store[cardId];
  if (existing) {
    return existing;
  }
  return {
    id: cardId,
    box: 1,
    nextDueAt: new Date(0).toISOString(),
    lastReviewedAt: null,
    timesReviewed: 0,
    timesHard: 0,
    timesMedium: 0,
    timesEasy: 0,
  };
}

export function isLeitnerCardDue(state: LeitnerCardState, now: Date = new Date()): boolean {
  if (!state.lastReviewedAt) return true;
  const dueTime = Date.parse(state.nextDueAt);
  if (Number.isNaN(dueTime)) return true;
  return dueTime <= now.getTime();
}

export function recordLeitnerCardReview(
  cardId: string,
  response: Response,
  now: Date = new Date()
): LeitnerCardState {
  const store = { ...readLeitnerStore() };
  const prev = getLeitnerCardState(cardId);
  const { newBox, nextDueAt } = applyLeitnerReview(prev.box, response, now);

  const updated: LeitnerCardState = {
    id: cardId,
    box: newBox,
    nextDueAt: nextDueAt.toISOString(),
    lastReviewedAt: now.toISOString(),
    timesReviewed: prev.timesReviewed + 1,
    timesHard: prev.timesHard + (response === 'hard' ? 1 : 0),
    timesMedium: prev.timesMedium + (response === 'medium' ? 1 : 0),
    timesEasy: prev.timesEasy + (response === 'easy' ? 1 : 0),
  };

  store[cardId] = updated;
  writeLeitnerStore(store);

  // Синхронизираме и със съществуващите списъци за усвоени/за преговор карти
  try {
    const rawMastered = localStorage.getItem(MASTERED_KEY);
    const rawReview = localStorage.getItem(REVIEW_KEY);
    const masteredList: string[] = rawMastered ? JSON.parse(rawMastered) : [];
    const reviewList: string[] = rawReview ? JSON.parse(rawReview) : [];
    const masteredSet = new Set(Array.isArray(masteredList) ? masteredList : []);
    const reviewSet = new Set(Array.isArray(reviewList) ? reviewList : []);

    if (newBox >= 4 || response === 'easy') {
      masteredSet.add(cardId);
      reviewSet.delete(cardId);
    } else if (response === 'hard') {
      reviewSet.add(cardId);
      masteredSet.delete(cardId);
    }
    localStorage.setItem(MASTERED_KEY, JSON.stringify(Array.from(masteredSet)));
    localStorage.setItem(REVIEW_KEY, JSON.stringify(Array.from(reviewSet)));
  } catch {
    // ignore storage errors
  }

  return updated;
}

export function resetLeitnerCardsForLesson(cardIds: string[]): void {
  const store = { ...readLeitnerStore() };
  for (const id of cardIds) {
    delete store[id];
  }
  writeLeitnerStore(store);
}

export function getLeitnerSummaryForCards(
  cardIds: string[],
  now: Date = new Date()
): {
  boxCounts: Record<LeitnerBox, number>;
  dueIds: string[];
  masteredIds: string[];
  reviewIds: string[];
} {
  const boxCounts: Record<LeitnerBox, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const dueIds: string[] = [];
  const masteredIds: string[] = [];
  const reviewIds: string[] = [];

  for (const id of cardIds) {
    const st = getLeitnerCardState(id);
    boxCounts[st.box] = (boxCounts[st.box] ?? 0) + 1;
    if (isLeitnerCardDue(st, now)) {
      dueIds.push(id);
    }
    if (st.box >= 4 || (st.timesEasy > 0 && st.box >= 2)) {
      masteredIds.push(id);
    }
    if (st.timesHard > 0 && st.box === 1) {
      reviewIds.push(id);
    }
  }

  return { boxCounts, dueIds, masteredIds, reviewIds };
}
