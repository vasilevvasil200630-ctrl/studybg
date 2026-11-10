import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const catalogPath = path.join(rootDir, 'src', 'data', 'monCurriculum', 'catalog.generated.ts');
const outPath = path.join(rootDir, 'src', 'data', 'monCurriculum', 'topicHierarchy.ts');

const OCR_TITLE_FIXES = [
  ['Храносмила-телна система', 'Храносмилателна система'],
  ['Сърдечно -съдова система', 'Сърдечно-съдова система'],
  ['Опорно-двигателна системаскелет скелетни мускули', 'Опорно-двигателна система: скелет и скелетни мускули'],
  ['Размножаване, растеж и развитие функции на органите на мъжката и женската полова система', 'Размножаване, растеж и развитие'],
  ['Ендокринна сиситема', 'Ендокринна система'],
  ['Модул 4. ЕВРОПА, АЗИЯ И БЪЛГАРИЯ', 'Модул 4. Европа, Азия и България'],
  ['XVIIIв.', 'XVIII в.'],
  ['XIXвек', 'XIX век'],
  ['най-голяма най-малка', 'най-голяма и най-малка'],
];

function cleanMonTitle(raw) {
  if (!raw) return '';
  let s = String(raw).trim();
  for (const [bad, good] of OCR_TITLE_FIXES) {
    s = s.replaceAll(bad, good);
  }
  // Ако цялото заглавие след "Модул X." е с ГЛАВНИ БУКВИ, нормализираме регистъра
  if (/^Модул\s+\d+\.\s+[А-ЯЁ\s,–—-]+$/.test(s)) {
    const [, prefix, rest] = s.match(/^(Модул\s+\d+\.\s+)(.+)$/);
    const lowered = rest.toLowerCase();
    s = prefix + lowered.charAt(0).toUpperCase() + lowered.slice(1);
  }
  return s.replace(/\s{2,}/g, ' ');
}

function stripHoursSuffix(title) {
  return cleanMonTitle(title).replace(/\s*\(\d+\s*ч\.\)\s*$/, '').trim();
}

const LANG_PROGRAM_META = {
  'lang-ae-a1': {
    stageId: 'stage-1',
    sectionId: 'section-a',
    grades: [8, 9],
    examTags: [],
    domainTitle: 'Английски език — Ниво A1 (8.–9. клас ООП)',
    order: 81,
  },
  'lang-ae-a2-8-neint': {
    stageId: 'stage-1',
    sectionId: 'section-a',
    grades: [8, 9, 10],
    examTags: ['НВО 10'],
    domainTitle: 'Английски език — Ниво A2 (8.–10. клас неинтензивно ООП)',
    order: 82,
  },
  'lang-ae-b1.1-8-int': {
    stageId: 'stage-1',
    sectionId: 'section-a',
    grades: [8],
    examTags: [],
    domainTitle: 'Английски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)',
    order: 83,
  },
  'lang-ae-b1.1': {
    stageId: 'stage-1',
    sectionId: 'section-a',
    grades: [9, 10],
    examTags: ['НВО 10'],
    domainTitle: 'Английски език — Ниво B1.1 (9.–10. клас разширено ООП)',
    order: 94,
  },
  'lang-ae-a2-11-12': {
    stageId: 'stage-2',
    sectionId: 'section-a',
    grades: [11, 12],
    examTags: [],
    domainTitle: 'Английски език — Ниво A2 (11.–12. клас ООП)',
    order: 111,
  },
  'lang-ae-b1': {
    stageId: 'stage-2',
    sectionId: 'section-a',
    grades: [11, 12],
    examTags: ['ДЗИ'],
    domainTitle: 'Английски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)',
    order: 115,
  },
  'lang-ae-b2.1': {
    stageId: 'stage-2',
    sectionId: 'section-b',
    grades: [11, 12],
    examTags: ['ДЗИ'],
    domainTitle: 'Английски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)',
    order: 215,
  },
  'lang-ne-a1': {
    stageId: 'stage-1',
    sectionId: 'section-a',
    grades: [8, 9],
    examTags: [],
    domainTitle: 'Немски език — Ниво A1 (8.–9. клас ООП)',
    order: 81,
  },
  'lang-ne-a2-8-neint': {
    stageId: 'stage-1',
    sectionId: 'section-a',
    grades: [8, 9, 10],
    examTags: ['НВО 10'],
    domainTitle: 'Немски език — Ниво A2 (8.–10. клас неинтензивно ООП)',
    order: 82,
  },
  'lang-ne-b1.1-8-int': {
    stageId: 'stage-1',
    sectionId: 'section-a',
    grades: [8],
    examTags: [],
    domainTitle: 'Немски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)',
    order: 83,
  },
  'lang-ne-b1.1': {
    stageId: 'stage-1',
    sectionId: 'section-a',
    grades: [9, 10],
    examTags: ['НВО 10'],
    domainTitle: 'Немски език — Ниво B1.1 (9.–10. клас разширено ООП)',
    order: 94,
  },
  'lang-ne-a2-11-12': {
    stageId: 'stage-2',
    sectionId: 'section-a',
    grades: [11, 12],
    examTags: [],
    domainTitle: 'Немски език — Ниво A2 (11.–12. клас ООП)',
    order: 111,
  },
  'lang-ne-b1': {
    stageId: 'stage-2',
    sectionId: 'section-a',
    grades: [11, 12],
    examTags: ['ДЗИ'],
    domainTitle: 'Немски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)',
    order: 115,
  },
  'lang-ne-b2.1': {
    stageId: 'stage-2',
    sectionId: 'section-b',
    grades: [11, 12],
    examTags: ['ДЗИ'],
    domainTitle: 'Немски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)',
    order: 215,
  },
};

function hasChildren(topics, topic) {
  const idx = topics.indexOf(topic);
  if (topic.num === '') {
    const next = topics[idx + 1];
    return Boolean(next && next.num === '' && next.depth > topic.depth);
  }
  return topics.some((t) => t !== topic && t.num.startsWith(topic.num + '.'));
}

function findRootTopic(topics, topic) {
  if (topic.depth <= 1) return null;
  const idx = topics.indexOf(topic);
  if (topic.num === '') {
    for (let i = idx - 1; i >= 0; i--) {
      if (topics[i].depth === 1) return topics[i];
    }
    return null;
  }
  const rootNum = topic.num.split('.')[0];
  return topics.find((t) => t.num === rootNum && t.depth === 1) || null;
}

function findImmediateParent(topics, topic) {
  if (topic.depth <= 1) return null;
  const idx = topics.indexOf(topic);
  if (topic.num === '') {
    for (let i = idx - 1; i >= 0; i--) {
      if (topics[i].depth < topic.depth) return topics[i];
    }
    return null;
  }
  if (!topic.num.includes('.')) return null;
  let best = null;
  for (const t of topics) {
    if (t !== topic && t.num && topic.num.startsWith(t.num + '.') && (!best || t.num.length > best.num.length)) {
      best = t;
    }
  }
  return best;
}

const rawCatalog = fs.readFileSync(catalogPath, 'utf8');
const programs = rawCatalog
  .split(/\r?\n/)
  .filter((line) => line.startsWith('{"id":'))
  .map((line) => JSON.parse(line.replace(/,\s*$/, '')));

const topicMap = {};
const programMetaMap = {};

for (const prog of programs) {
  programMetaMap[prog.id] = {
    id: prog.id,
    title: cleanMonTitle(prog.title),
    url: prog.url,
    stage: prog.stage,
  };

  if (prog.stage === 'lang') {
    const meta = LANG_PROGRAM_META[prog.id];
    if (!meta) {
      throw new Error(`Missing LANG_PROGRAM_META for ${prog.id}`);
    }
    for (const mod of prog.modules) {
      for (const topic of mod.topics) {
        const root = findRootTopic(mod.topics, topic);
        topicMap[topic.id] = {
          domainTitle: meta.domainTitle,
          subSection: root ? cleanMonTitle(root.title) : cleanMonTitle(topic.title),
          stageId: meta.stageId,
          sectionId: meta.sectionId,
          grades: meta.grades,
          examTags: meta.examTags,
          order: meta.order,
          pdfUrl: prog.url,
        };
      }
    }
    continue;
  }

  if (prog.stage === 'pp') {
    let modIdx = 0;
    for (const mod of prog.modules) {
      modIdx++;
      const modClean = mod.title ? cleanMonTitle(mod.title) : null;
      const modNumMatch = modClean ? modClean.match(/Модул\s+(\d+)/) : null;
      const modNum = modNumMatch ? Number(modNumMatch[1]) : modIdx;
      const isBothGrades = !modClean || prog.id === 'pp-arts' || modNum <= 2;
      const grades = isBothGrades ? [11, 12] : [12];
      const gradeSuffix = !modClean || prog.id === 'pp-arts'
        ? '11.–12. клас ПП и ДЗИ'
        : modNum <= 2
          ? '11. клас ПП и ДЗИ'
          : '12. клас ПП и ДЗИ';

      const domainTitle = modClean
        ? `${modClean} (${gradeSuffix})`
        : 'Социолингвистика и публично общуване (11.–12. клас ПП и ДЗИ)';

      for (const topic of mod.topics) {
        const root = findRootTopic(mod.topics, topic);
        const parent = findImmediateParent(mod.topics, topic);
        const subSection = parent
          ? cleanMonTitle(parent.title)
          : root
            ? cleanMonTitle(root.title)
            : !hasChildren(mod.topics, topic)
              ? null
              : cleanMonTitle(topic.title);

        topicMap[topic.id] = {
          domainTitle,
          subSection,
          stageId: 'stage-2',
          sectionId: 'section-b',
          grades,
          examTags: ['ДЗИ'],
          order: 200 + modNum,
          pdfUrl: prog.url,
        };
      }
    }
    continue;
  }

  if (typeof prog.stage === 'number') {
    const g = prog.stage;
    const stageId = g <= 10 ? 'stage-1' : 'stage-2';
    const sectionId = 'section-a';
    const grades = [g];
    const examTags = [];
    if (prog.id === '10-bge' || prog.id === '10-lit' || prog.id === '10-math' || prog.id === '10-it') {
      examTags.push('НВО 10');
    }
    if (prog.id === '11-be' || prog.id === '11-lit' || prog.id === '12-be' || prog.id === '12-lit') {
      examTags.push('ДЗИ');
    }

    const baseTitle = stripHoursSuffix(prog.title);
    const allTopics = prog.modules.flatMap((m) => m.topics);
    const leaves = allTopics.filter((t) => !hasChildren(allTopics, t));
    const roots = allTopics.filter((t) => t.depth === 1);
    const hasRichRootChapters = leaves.length >= 16 && roots.length >= 2;

    // При големи програми (>= 16 теми) групираме по основни раздели (depth=1),
    // но обединяваме едноурочни уводни теми ("Въведение...") със следващия основен раздел,
    // за да няма фрагментирани раздели с по 1 урок.
    const rootChildCount = new Map();
    for (const r of roots) {
      const count = allTopics.filter((t) => t === r || findRootTopic(allTopics, t) === r).filter((t) => !hasChildren(allTopics, t)).length;
      rootChildCount.set(r.id, count);
    }

    const mergedRootTitle = new Map();
    if (hasRichRootChapters) {
      for (let i = 0; i < roots.length; i++) {
        const r = roots[i];
        if ((rootChildCount.get(r.id) || 0) <= 1) {
          const neighbor = roots.slice(i + 1).find((nr) => (rootChildCount.get(nr.id) || 0) >= 2)
            || roots.slice(0, i).reverse().find((pr) => (rootChildCount.get(pr.id) || 0) >= 2)
            || r;
          mergedRootTitle.set(r.id, { title: cleanMonTitle(neighbor.title), idx: roots.indexOf(neighbor) });
        } else {
          mergedRootTitle.set(r.id, { title: cleanMonTitle(r.title), idx: i });
        }
      }
    }

    const progSubOrder = prog.slug === 'bge' || prog.slug === 'be' ? 1 : prog.slug === 'lit' ? 2 : prog.slug === 'informatika' ? 1 : prog.slug === 'it' ? 2 : 0;
    const badgeSuffix = examTags.includes('НВО 10')
      ? ' (ООП и НВО 10. клас)'
      : examTags.includes('ДЗИ')
        ? ' (ООП и ДЗИ)'
        : ' (ООП)';

    for (const mod of prog.modules) {
      for (const topic of mod.topics) {
        const root = findRootTopic(mod.topics, topic) || (topic.depth === 1 ? topic : null);
        const parent = findImmediateParent(mod.topics, topic);
        let domainTitle;
        let order = g * 10 + progSubOrder;

        if (hasRichRootChapters && root) {
          const merged = mergedRootTitle.get(root.id) || { title: cleanMonTitle(root.title), idx: 0 };
          domainTitle = `${g}. клас — ${baseTitle}: ${merged.title}`;
          order = g * 10 + progSubOrder + (merged.idx + 1) * 0.1;
        } else {
          domainTitle = `${g}. клас — ${baseTitle}${badgeSuffix}`;
        }

        const subSection = parent && parent !== root
          ? `${cleanMonTitle(root.title)} · ${cleanMonTitle(parent.title)}`
          : root && root !== topic
            ? cleanMonTitle(root.title)
            : null;

        topicMap[topic.id] = {
          domainTitle,
          subSection,
          stageId,
          sectionId,
          grades,
          examTags,
          order: Math.round(order * 10) / 10,
          pdfUrl: prog.url,
        };
      }
    }
  }
}

const fileContent = `// Автоматично генерирана йерархична карта на темите от учебните програми на МОН.
// Генерира се чрез: node scripts/generate-topic-hierarchy.mjs (без промяна на catalog.generated.ts).

export interface MonTopicHierarchyEntry {
  domainTitle: string;
  subSection: string | null;
  stageId: 'stage-prep' | 'stage-1' | 'stage-2';
  sectionId: 'section-prep' | 'section-a' | 'section-b' | 'section-c';
  grades: readonly number[];
  examTags: readonly ('НВО 7' | 'НВО 10' | 'ДЗИ' | 'ДИППК')[];
  order: number;
  pdfUrl: string;
}

export const MON_TOPIC_HIERARCHY: Record<string, MonTopicHierarchyEntry> = ${JSON.stringify(topicMap, null, 2)};
`;

fs.writeFileSync(outPath, fileContent, 'utf8');
console.log(`Generated ${Object.keys(topicMap).length} topic hierarchy entries -> ${outPath}`);
