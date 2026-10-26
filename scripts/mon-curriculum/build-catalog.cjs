// node build-catalog.cjs programs.json overrides.json <src/data/monCurriculum> [--flag за списък със съмнителни заглавия]
// Превръща извлечените програми в типизиран модул за StudyBG: чисти заглавия, дълбочина, идентификатори.
// overrides.json: "<етап>/<slug>#[<модул>:]<индекс>" → ново заглавие или null (премахва темата);
// "__insert": { "<етап>/<slug>[@<модул>]": [{ after, num, title }] } — теми, които извличането е изпуснало;
// "__replace": { "<етап>/<slug>": [заглавия] } — програми с ненадеждна първа колона (без номерация);
// "__outcomes": { "<етап>/<slug>#<индекс>": [резултати] } — когато редовете в таблицата на МОН са разместени.
const fs = require('fs');
const [inFile, overridesFile, outFile, flag] = process.argv.slice(2);
const programs = JSON.parse(fs.readFileSync(inFile, 'utf8'));
const overrides = JSON.parse(fs.readFileSync(overridesFile, 'utf8'));
const inserts = overrides.__insert || {};
const replaces = overrides.__replace || {};
const outcomeFixes = overrides.__outcomes || {};
const conceptFixes = overrides.__concepts || {};

const SUBJECT = {
  bge: 'bel', be: 'bel', bel: 'bel', lit: 'lit', math: 'math', informatika: 'informatika', it: 'it',
  fa: 'physics', bio: 'biology', himia: 'chemistry', history: 'history', geo: 'geography', phil: 'philosophy',
  go: 'civics', tp: 'tech', predpriemachestvo: 'entrepreneurship', arts: 'arts', muzika: 'music', music: 'music', fvs: 'pe',
};
const subjectOf = (slug) => {
  if (/^ae-/.test(slug)) return 'english';
  if (/^ne-/.test(slug)) return 'german';
  return SUBJECT[slug.replace(/-\d+$/, '')];
};

const sentenceCase = (s) => {
  const letters = s.replace(/[^\p{L}]/gu, '');
  if (letters.length < 4 || letters !== letters.toUpperCase()) return s;
  const lower = s.toLowerCase();
  const first = lower.search(/\p{L}/u);
  return lower.slice(0, first) + lower.charAt(first).toUpperCase() + lower.slice(first + 1);
};

const LOWER_VERB = /\s(знае|умее|разбира|обяснява|изследва|описва|прилага|използва|познава|различава|решава|определя|намира|представя)\s.*$/;
// Текст от колоната с резултатите, попаднал в заглавието: режем от първия глагол или служебна бележка нататък
const OUTCOME_START = /\s(Класифицира|Интерпретира|Наименува|Съставя|Планира|Предлага|Дава|Дискутира|Изработва|Проучва|Локализира|Разработва|Изказва|Защитава|Експериментира|Осъзнава|Може|Има|Диференцира|Притежава|Запознава|Систематизира|Избира|Изследва|Изчислява|Означава|Разграничава|Прогнозира|Описва|Разпознава|Тълкува|Сравнява|Дефинира|Представя|Различава|Изразява|Назовава|Обяснява|Познава|Разбира|Използва|Прилага|Анализира|Знае|Умее|Определя|Оценява|Характеризира|Идентифицира|Посочва|Съпоставя|Изброява|Проследява|Аргументира|Коментира|Създава|Моделира|Знания:|Умения:|Нагласи:|Брой часове|Общ брой часове|Препоръчително|Акцент в|Учебната програма|Модулът се)(\s|,|$).*$/;

function cleanTitle(raw, num) {
  let t = raw.replace(/[\uE000-\uF8FF]/g, ' ');
  t = t.slice(t.indexOf(num) === 0 ? num.length : 0).trim();
  t = t
    .replace(OUTCOME_START, '')
    .replace(/ХОРАРИУМ.*$/i, '')
    // Само служебното „Ученикът:“ от колоната с резултатите — темата „Ученикът и училището…“ остава
    .replace(/\s*Ученикът:\s*/g, ' ').replace(/\s+Ученикът$/, '')
    .replace(LOWER_VERB, '')
    .replace(/^(Тема|ТЕМА|тема)\s*:?\s*/, '')
    // „ТЕМА 1. ОБРАБОТКА…“: номерът остава в заглавието, когато думата „Тема“ е с главни букви
    .replace(/^\d{1,2}\.\s*/, '')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/\(\s+/g, '(').replace(/\s+\)/g, ')')
    .replace(/(\p{L})\s?-\s(\p{Ll})/gu, (m, a, b) => (a === a.toLowerCase() ? a + b : m))
    .replace(/\s+/g, ' ')
    .replace(/[\s.]+$/, '')
    .trim();
  return sentenceCase(t);
}

function depthOf(num) {
  if (!num) return 1;
  if (/^(Тема|Раздел)/.test(num)) return 1;
  const roman = num.match(/^[IVXІ]+((\.\d+)*)/);
  if (roman) return 1 + (roman[1].match(/\d+/g) || []).length;
  return (num.match(/\d+/g) || []).length || 1;
}

const normNum = (num) => num.replace(/^(Тема|Раздел)\s+/, '').replace(/\s/g, '').replace(/\.$/, '').replace(/І/g, 'I');

// Чуждите езици: шестте тематични области са едни и същи във всички програми; граматиката е отделна тема
const LANG_AREAS = [
  [/Аз\s+и\s+другите/i, 'Аз и другите'],
  [/Светът\s+около\s+мен/i, 'Светът около мен'],
  [/Всекидневие/i, 'Всекидневие'],
  [/Здраве/i, 'Здраве и здравословен начин на живот'],
  [/Природа/i, 'Природа и екология'],
  [/родина/i, 'Моята родина и светът'],
  // B2.1
  [/Човекът\s+в\s+съвременния/i, 'Човекът в съвременния свят'],
  [/Човек\s+и\s+наука/i, 'Човек и наука'],
  [/Медии\s+и\s+информация/i, 'Медии и информация'],
  [/Личност\s+и\s+общество/i, 'Личност и общество'],
];

function moduleTitle(raw) {
  const m = raw.replace(/\s+/g, ' ').trim().match(/^(МОДУЛ|Модул)\s+(\d+)\.?\s*(.*)$/);
  if (!m) return sentenceCase(raw.trim());
  const rest = m[3].replace(/[„“”"]/g, '').replace(/\s*\[.*$/, '').trim();
  return `Модул ${m[2]}${rest ? '. ' + sentenceCase(rest) : ''}`;
}

const out = [];
const flagged = [];
for (const p of programs) {
  const key = `${p.grade}/${p.slug}`;
  const subject = subjectOf(p.slug);
  if (!subject) throw new Error('no subject for ' + key);
  const programId = `${p.grade === 'pp' || p.grade === 'lang' ? p.grade : +p.grade}-${p.slug}`;
  const base = { id: programId, stage: p.grade === 'pp' || p.grade === 'lang' ? p.grade : +p.grade, slug: p.slug, subject, title: p.title, url: p.url };

  // Физическото възпитание няма тестова част; профилираните чужди езици са с друга структура (модули по умения)
  if (subject === 'pe' || (p.grade === 'pp' && (subject === 'english' || subject === 'german'))) {
    out.push({ ...base, testable: false, modules: [] });
    continue;
  }

  if (p.grade === 'lang') {
    const all = p.modules.flatMap((m) => m.topics);
    const topics = [];
    for (const t of all) {
      const area = LANG_AREAS.find(([re]) => re.test(t.title.slice(0, 60)));
      if (area && !topics.some((x) => x.title === area[1])) {
        topics.push({ id: `${programId}:${topics.length + 1}`, num: String(topics.length + 1), title: area[1], depth: 1, outcomes: [], concepts: [] });
      }
    }
    if (subject === 'german' && /b2/.test(p.slug) && !topics.some((x) => x.title === 'Медии и информация')) {
      // В немската B2.1 третата област е в абзац, който извличането не хваща; програмите на двата езика са успоредни
      topics.splice(2, 0, { id: `${programId}:media`, num: '', title: 'Медии и информация', depth: 1, outcomes: [], concepts: [] });
    }
    const outcomes = all.flatMap((t) => t.outcomes).filter((o) => !/^Ученикът/.test(o));
    const concepts = all.flatMap((t) => t.concepts).map((c) => c.replace(/^[•\-–]\s*/, '').trim()).filter((c) => c.length > 2 && !/^[А-Я\s.]+$/.test(c));
    topics.push({ id: `${programId}:skills`, num: '', title: 'Слушане, четене, говорене и писане', depth: 1, outcomes, concepts: [] });
    topics.push({ id: `${programId}:grammar`, num: '', title: 'Езикови знания: фонетика, лексика и граматика', depth: 1, outcomes: [], concepts });
    if (topics.length < 8) flagged.push(`${key}\tсамо ${topics.length - 2} тематични области`);
    out.push({ ...base, testable: true, modules: [{ title: null, topics }] });
    continue;
  }

  if (replaces[key]) {
    const outcomes = p.modules.flatMap((m) => m.topics.flatMap((t) => t.outcomes));
    const topics = replaces[key].map((title, i) => ({ id: `${programId}:${i + 1}`, num: String(i + 1), title, depth: 1, outcomes: [], concepts: [] }));
    // Резултатите не могат да се свържат надеждно с отделна тема — пазим ги общо за програмата
    out.push({ ...base, testable: true, outcomes, modules: [{ title: null, topics }] });
    continue;
  }

  const modules = p.modules.map((m, mi) => {
    const seen = new Set();
    const topics = [];
    const multi = p.modules.length > 1;
    const add = (num, title, depth, outcomes, concepts, okey) => {
      let local = normNum(num) || String(topics.length + 1);
      while (seen.has(local)) local += '+';
      seen.add(local);
      topics.push({ id: `${programId}${multi ? ':m' + (mi + 1) : ''}:${local}`, num: normNum(num), title, depth, outcomes, concepts });
      const suspicious = title.length > 95 || /\s(на|във|в|и|с|от|за|при|по|до|към|-)$/.test(title)
        || (/[a-z]{2}/.test(title) && !['it', 'informatika'].includes(subject));
      if (suspicious && okey) flagged.push(`${okey}\t${title}`);
    };
    const ins = inserts[multi ? `${key}@${mi}` : key] || [];
    const insertAfter = (i) => ins.filter((x) => x.after === i).forEach((x) => add(x.num, x.title, depthOf(x.num), [], []));
    insertAfter(-1);
    m.topics.forEach((raw, ti) => {
      // „ІІІ. 1. „Дядо Горио“…“: номерът на подтемата е с интервал след римската цифра
      const split = raw.title.match(/^([IVXІ]{1,4})\.\s+(\d{1,2})\.\s*/);
      const t = split ? { ...raw, num: `${split[1]}.${split[2]}.`, title: raw.title.slice(split[0].length) } : raw;
      const okey = `${key}#${multi ? mi + ':' : ''}${ti}`;
      const ov = overrides[okey];
      if (ov !== null) {
        const title = typeof ov === 'string' ? ov : cleanTitle(t.title, t.num);
        const outcomes = outcomeFixes[okey] ?? t.outcomes.filter((o) => !/^Ученикът:?$/.test(o));
        if (title) add(t.num, title, depthOf(t.num), outcomes, conceptFixes[okey] ?? t.concepts, typeof ov === 'string' ? null : okey);
      }
      insertAfter(ti);
    });
    return { title: m.module ? moduleTitle(m.module) : null, topics };
  });
  out.push({ ...base, testable: true, modules });
}

if (flag) { console.log(flagged.join('\n')); console.error(`${flagged.length} flagged`); process.exit(0); }

// Индексът (заглавия) е малък и се ползва навсякъде; резултатите и понятията се зареждат за всяка програма поотделно
const path = require('path');
const outDir = outFile;
const detailsDir = path.join(outDir, 'details');
fs.mkdirSync(detailsDir, { recursive: true });
for (const f of fs.readdirSync(detailsDir)) fs.unlinkSync(path.join(detailsDir, f));
const index = out.map((p) => {
  const details = { topics: {} };
  if (p.outcomes) details.outcomes = p.outcomes;
  const modules = p.modules.map((m) => ({
    title: m.title,
    topics: m.topics.map((t) => {
      if (t.outcomes.length || t.concepts.length) details.topics[t.id] = { outcomes: t.outcomes, concepts: t.concepts };
      return { id: t.id, num: t.num, title: t.title, depth: t.depth };
    }),
  }));
  fs.writeFileSync(path.join(detailsDir, `${p.id}.json`), JSON.stringify(details) + '\n');
  const { outcomes, ...rest } = p;
  return { ...rest, modules };
});
const header = `// Генерирано от официалните учебни програми на МОН (mon.bg) — не се редактира на ръка.\n// Източникът на всяка програма е в полето url. Скрипт: scripts/mon-curriculum/build-catalog.cjs\nimport type { MonProgram } from './types';\n\n`;
const indexFile = path.join(outDir, 'catalog.generated.ts');
fs.writeFileSync(indexFile, header + 'export const MON_PROGRAMS: MonProgram[] = [\n' + index.map((p) => JSON.stringify(p)).join(',\n') + ',\n];\n');
const nTopics = out.reduce((a, p) => a + p.modules.reduce((b, m) => b + m.topics.length, 0), 0);
const detailsKb = fs.readdirSync(detailsDir).reduce((a, f) => a + fs.statSync(path.join(detailsDir, f)).size, 0) / 1024;
console.log(`${out.length} programs, ${nTopics} topics; index ${(fs.statSync(indexFile).size / 1024).toFixed(0)} KB, details ${detailsKb.toFixed(0)} KB`);
