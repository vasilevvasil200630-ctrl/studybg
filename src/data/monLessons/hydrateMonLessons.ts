import type { LessonData } from '../../types';

const TOKEN_RE = /@@([0-9a-z]+)@@/g;

const KEY_MAP: Record<string, string> = {
  s: 'subject',
  g: 'grade',
  et: 'examType',
  st: 'sourceType',
  m: 'monTopicIds',
  t: 'title',
  o: 'originalNoteExcerpt',
  su: 'summary',
  ov: 'overview',
  kp: 'keyPoints',
  eg: 'examGoldenRule',
  ct: 'commonTraps',
  fd: 'formulasOrDates',
  l: 'label',
  v: 'value',
  nc: 'notebookChecklist',
  r: 'requirement',
  wn: 'whyNeeded',
  e6: 'isEssentialForSix',
  sn: 'suggestedNotes',
  fc: 'flashcards',
  f: 'front',
  b: 'back',
  h: 'hint',
  tg: 'tag',
  q: 'quiz',
  qu: 'question',
  op: 'options',
  ci: 'correctIndex',
  ex: 'explanation',
  qq: 'quickQuestions',
};

/**
 * Възстановява дедуплицираните низове от речника `dict` и съкратените ключове в пълни `LessonData[]` обекти.
 * Използва се за компактно съхранение на големите учебни пакети в `monLessons`,
 * намалявайки размера на JS бъндълите с над 75% без никаква загуба на съдържание.
 */
export function hydrateMonLessons(dict: readonly string[], rawLessons: unknown): LessonData[] {
  const expandedDict: string[] = [...dict];
  for (let pass = 0; pass < 3; pass++) {
    let changed = false;
    for (let i = 0; i < expandedDict.length; i++) {
      if (expandedDict[i].includes('@@')) {
        expandedDict[i] = expandedDict[i].replace(TOKEN_RE, (_, code: string) => expandedDict[parseInt(code, 36)]);
        changed = true;
      }
    }
    if (!changed) break;
  }

  function decode(val: unknown): unknown {
    if (typeof val === 'string') {
      if (!val.includes('@@')) return val;
      return val.replace(TOKEN_RE, (_, code: string) => expandedDict[parseInt(code, 36)]);
    }
    if (Array.isArray(val)) {
      return val.map(decode);
    }
    if (val !== null && typeof val === 'object') {
      const src = val as Record<string, unknown>;
      const out: Record<string, unknown> = {};
      for (const k of Object.keys(src)) {
        out[KEY_MAP[k] ?? k] = decode(src[k]);
      }
      return out;
    }
    return val;
  }

  return decode(rawLessons) as LessonData[];
}
