import type { MonProgram, MonProgramDetails, MonTopic, MonTopicDetails } from './types';

export type * from './types';
export { MON_SUBJECTS } from './subjects';

let catalogPromise: Promise<MonProgram[]> | null = null;

/** Индексът на програмите (около 250 KB) — зарежда се само когато потрябва */
export function loadMonCatalog(): Promise<MonProgram[]> {
  catalogPromise ??= import('./catalog.generated').then((m) => m.MON_PROGRAMS);
  return catalogPromise;
}

const detailLoaders = import.meta.glob<MonProgramDetails>('./details/*.json', { import: 'default' });

export async function loadProgramDetails(programId: string): Promise<MonProgramDetails | null> {
  const load = detailLoaders[`./details/${programId}.json`];
  return load ? load() : null;
}

/** Очакваните резултати и новите понятия за тема; при програми без връзка тема–резултат — общите резултати */
export async function loadTopicDetails(topicId: string): Promise<MonTopicDetails> {
  const details = await loadProgramDetails(programIdOf(topicId));
  const own = details?.topics[topicId];
  if (own) return own;
  return { outcomes: details?.outcomes ?? [], concepts: [] };
}

export const programIdOf = (topicId: string) => topicId.split(':')[0];

export interface TopicInProgram extends MonTopic {
  module: string | null;
  /** Раздел, в който е подтемата (например „Механика“ за „Неравномерно движение“) */
  section: string | null;
}

/** Всички теми на програмата в реда от документа, с модула и раздела им */
export function programTopics(program: MonProgram): TopicInProgram[] {
  const out: TopicInProgram[] = [];
  for (const mod of program.modules) {
    for (const topic of mod.topics) {
      const parent = parentTopic(mod.topics, topic);
      out.push({ ...topic, module: mod.title, section: parent ? parent.title : null });
    }
  }
  return out;
}

const hasChildren = (topics: MonTopic[], topic: MonTopic) =>
  topic.num !== '' && topics.some((t) => t !== topic && t.num.startsWith(topic.num + '.'));

function parentTopic(topics: MonTopic[], topic: MonTopic): MonTopic | null {
  if (!topic.num.includes('.')) return null;
  let best: MonTopic | null = null;
  for (const t of topics) {
    if (t !== topic && t.num && topic.num.startsWith(t.num + '.') && (!best || t.num.length > best.num.length)) best = t;
  }
  return best;
}

/** Темите за упражнение: без разделите, които само групират подтеми */
export function practiceTopics(program: MonProgram): TopicInProgram[] {
  const leaves = new Set<string>();
  for (const mod of program.modules) {
    for (const topic of mod.topics) if (!hasChildren(mod.topics, topic)) leaves.add(topic.id);
  }
  return programTopics(program).filter((t) => leaves.has(t.id));
}

/** Класовете, в които се изучава програмата */
export function programGrades(program: MonProgram): number[] {
  if (typeof program.stage === 'number') return [program.stage];
  if (program.stage === 'pp') return [11, 12];
  return [8, 9, 10, 11, 12];
}
