// node extract-programs.cjs <dir with *.txt from pdftotext -layout> <list.tsv> <out.json> [grade/slug за диагностика]
// Целият път: 1) PDF-ите от programs.tsv в <dir>/<етап>/<slug>.pdf; 2) pdftotext -layout за всеки от тях;
// 3) node extract-programs.cjs <dir> programs.tsv programs.json;
// 4) node build-catalog.cjs programs.json overrides.json src/data/monCurriculum
// Извлича таблиците „Теми | Компетентности като очаквани резултати | Нови понятия“ от учебните програми на МОН.
// Колоните се намират по празните вертикални ивици на всяка страница (заглавният ред не е подравнен с тялото).
const fs = require('fs');
const path = require('path');
const [dir, listFile, outFile, debugDoc] = process.argv.slice(2);

const isHeader = (l) => /(Компетентности\s+като|Очаквани\s+резултати)/.test(l) && /(Теми|Тематични|Нови\s+(понятия|знания)|СЪДЪРЖАНИЕ|Раздели)/.test(l);
const HEADER_REST = /^(Теми|Тематични области|обучението|от обучението|резултати от обучението|\(компетентности.*|основни умения.*|говорене и писане\)|Нови понятия.*|и закони|Нови знания)$/;
const END_SECTION = /^\s*(СПЕЦИФИЧНИ|ДЕЙНОСТИ|ОЦЕНЯВАНЕ|ПРОЦЕНТНО|МЕЖДУПРЕДМЕТНИ|КОМПЕТЕНТНОСТИ, КОИТО|ДЕЙНОСТИ ЗА|ОЧАКВАНИ РЕЗУЛТАТИ ОТ ОБУЧЕНИЕТО В КРАЯ|ЦЕЛИ НА ОБУЧЕНИЕТО|ПРИМЕРНО|Специфични методи|Препоръчително процентно|Дейности за придобиване|Компетентности в областта на|Примерно разпределение|ПРЕПОРЪЧИТЕЛНО|ПРИМЕРНИ|Годишният брой часове|Годишен брой часове|ОСНОВНИ ФОРМУЛИ|Препоръчителни уроци|Основните познавателни|В часовете за развиване|Учебните часове за|.*ЦЕНТНО РАЗПРЕДЕЛЕНИЕ|ЛАБОРАТОРНИ|Лабораторни упражнения|Практически дейности|ПРАКТИЧЕСКИ ДЕЙНОСТИ|Примерни теми|ПРИМЕРНИ ТЕМИ)/;
const MODULE = /^\s*(Модул\s+\d+.*|МОДУЛ\s+\d+.*)$/;
const NUMBERED = /^(Тема\s+\d{1,2}\s*[.:]?\s*|Раздел\s+\d{1,2}\s*[.:]?\s*|(\d{1,2}\s?\.\s?)(\d{1,2}\s?\.?\s?){0,3}\s*(?=[^\d\s.])|[IVXІ]{1,4}(\.\d{1,2})*\.\s*)/;
const BULLET = /^[•●▪◦✓\-–−]\s*/;
const PAGE_NO = /^\s*\d{1,3}\s*$/;

function segments(line) {
  const out = [];
  const re = /\S(?:.*?\S)?(?=\s{2,}|$)/g;
  let m;
  while ((m = re.exec(line))) out.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
  return out;
}

// Празни вертикални ивици, след които започват много сегменти — това са границите на колоните
function findGutters(lines) {
  const n = lines.length;
  if (n < 3) return null;
  const W = Math.max(...lines.map((l) => l.length));
  const occ = new Array(W + 1).fill(0);
  const startsAt = new Array(W + 2).fill(0);
  let minStart = Infinity;
  for (const l of lines) {
    for (let x = 0; x < l.length; x++) if (l[x] !== ' ') occ[x]++;
    for (const s of segments(l)) { startsAt[s.start]++; minStart = Math.min(minStart, s.start); }
  }
  const thr = Math.max(1, Math.round(n * 0.05));
  const runs = [];
  for (let x = minStart + 2; x < W - 2; x++) {
    if (occ[x] > thr) continue;
    let y = x;
    while (y + 1 < W && occ[y + 1] <= thr) y++;
    let after = 0;
    for (let k = y + 1; k <= y + 3 && k <= W; k++) after += startsAt[k];
    runs.push({ a: x, b: y, after });
    x = y;
  }
  const good = runs.filter((r) => r.after >= Math.max(3, n * 0.12)).sort((p, q) => q.after - p.after).slice(0, 2);
  return good.sort((p, q) => p.a - q.a);
}

function splitLine(line, gutters) {
  // Режем реда в празно място вътре в ивицата; ако текстът я пресича, сегментът отива по началото си
  const cols = ['', '', ''];
  let cuts = [];
  for (const g of gutters) {
    let cut = -1;
    for (let x = Math.min(g.b, line.length - 1); x >= g.a; x--) if (line[x] === ' ' || x >= line.length) { cut = x; break; }
    if (g.a >= line.length) cut = line.length;
    cuts.push(cut);
  }
  const bounds = [0];
  for (const c of cuts) bounds.push(c < 0 ? null : c);
  bounds.push(line.length);
  // Колони без валидна граница: разпределяме по началото на сегментите
  if (bounds.includes(null)) {
    for (const s of segments(line)) {
      let ci = 0;
      for (const g of gutters) if (s.start > g.a) ci++;
      cols[ci] += ' ' + s.text;
    }
    return cols.map((c) => c.trim());
  }
  for (let i = 0; i < bounds.length - 1; i++) cols[i] = line.slice(bounds[i], bounds[i + 1]).trim();
  return cols;
}

const VERB = /\s(Описва|Разпознава|Тълкува|Сравнява|Дефинира|Представя|Различава|Изразява|Назовава|Обяснява|Познава|Разбира|Използва|Прилага|Анализира|Знае|Умее|Определя|Оценява|Характеризира|Идентифицира|Посочва|Съпоставя|Изброява|Проследява|Аргументира|Коментира)\s[^.]*?(\.(?=\s|$)|(?=\s\()|$)/g;
const stripOutcome = (t) => t.replace(VERB, '').replace(/\s+/g, ' ').trim();

function parseDoc(text) {
  const pages = text.split('\f');
  // 1) Редове от таблиците, групирани по страница; модулите пазим като маркери
  const rows = []; // {page, line} | {module}
  let inTable = false, pendingModule = null, skipHeaderRest = 0, ended = false;
  pages.forEach((pg, pi) => {
    for (const line of pg.split(/\r?\n/)) {
      if (!line.trim() || PAGE_NO.test(line)) continue;
      const mod = line.match(MODULE);
      if (mod && !inTable) { pendingModule = mod[1].trim(); continue; }
      if (isHeader(line)) {
        if (ended && !pendingModule) continue;
        if (!inTable && pendingModule) { rows.push({ module: pendingModule }); pendingModule = null; }
        inTable = true; skipHeaderRest = 4; continue;
      }
      if (!inTable) continue;
      if (END_SECTION.test(line.trim())) { if (inTable) ended = true; inTable = false; continue; }
      if (skipHeaderRest > 0) {
        const segs = segments(line);
        if (segs.every((s) => HEADER_REST.test(s.text))) { skipHeaderRest--; continue; }
        skipHeaderRest = 0;
      }
      rows.push({ page: pi, line });
    }
  });
  // 2) Граници на колоните за всяка страница
  const byPage = new Map();
  for (const r of rows) if (r.line != null) (byPage.get(r.page) || byPage.set(r.page, []).get(r.page)).push(r.line);
  const gutterByPage = new Map();
  let lastG = null;
  const shiftByPage = new Map();
  let docCols = 1;
  for (const [p, ls] of [...byPage.entries()].sort((a, b) => a[0] - b[0])) {
    let g = findGutters(ls);
    if (g && g.length) docCols = Math.max(docCols, g.length + 1);
    // Страница без колоната с темите (тя е празна): най-лявата колона всъщност е втората.
    // Познава се по дългите редове и липсата на номерирани заглавия.
    const left = ls.map((l) => (g && g.length ? l.slice(0, g[0].a) : l).trim()).filter(Boolean);
    const avg = left.reduce((a, t) => a + t.length, 0) / Math.max(1, left.length);
    const numberedLeft = left.filter((t) => NUMBERED.test(t)).length;
    const shift = avg > 32 && numberedLeft <= 1 && (!g || g.length < 2);
    if (!g || !g.length) g = shift ? [] : lastG;
    else lastG = g;
    gutterByPage.set(p, g);
    shiftByPage.set(p, shift);
  }
  // 3) Сглобяване на теми
  const cells = [];
  for (const r of rows) {
    if (r.module) { cells.push({ module: r.module }); continue; }
    const g = gutterByPage.get(r.page);
    if (!g) continue;
    let [c1, c2, c3] = g.length ? splitLine(r.line, g) : [r.line.trim(), '', ''];
    if (shiftByPage.get(r.page)) [c1, c2, c3] = ['', c1, c2];
    const bi = c1.search(/(^|\s)[•●▪✓](\s|$)/);
    if (bi >= 0) { c2 = (c1.slice(bi).trim() + ' ' + c2).trim(); c1 = c1.slice(0, bi).trim(); }
    cells.push({ c1: c1 === 'Теми' ? '' : c1, c2, c3, ncols: docCols });
  }
  const numberedCount = cells.filter((c) => c.c1 && NUMBERED.test(c.c1)).length;
  const numbered = numberedCount >= 3;
  const bulleted = cells.filter((c) => c.c2 && BULLET.test(c.c2)).length >= 3;

  const modules = [];
  let current = { module: null, topics: [] };
  let topic = null, sinceC1 = 0, lastC1 = '', maxTop = 0, stopped = false;
  const flush = () => { if (topic) current.topics.push(topic); topic = null; };
  for (const c of cells) {
    if (c.module) { flush(); if (current.topics.length) modules.push(current); current = { module: c.module, topics: [] }; maxTop = 0; stopped = false; continue; }
    if (stopped) continue;
    // Двуколонни таблици: третата клетка липсва
    let { c1, c2, c3 } = c;
    if (c.ncols === 2) c3 = '';
    if (c1 && /^Акценти:?$/.test(c1)) c1 = '';
    if (c1) {
      let starts;
      if (numbered) starts = NUMBERED.test(c1);
      else starts = !topic || (/^[А-ЯA-Z„"]/.test(c1) && (sinceC1 > 0 || /[.:]$/.test(lastC1)));
      if (starts) {
        const num = (c1.match(NUMBERED) || [''])[0].trim();
        // Номерацията започва отначало: след темите следва друга таблица (лабораторни упражнения, формули)
        const top = num.match(/^(?:Тема\s+)?(\d{1,2})\s?\.?\s*$/);
        if (top && +top[1] === 1 && maxTop >= 2) { flush(); stopped = true; continue; }
        const anyTop = num.match(/^(?:Тема\s+)?(\d{1,2})/);
        if (anyTop) maxTop = Math.max(maxTop, +anyTop[1]);
        flush();
        topic = { num, title: c1, outcomes: [], concepts: [] };
      } else if (topic) topic.title += (topic.title.endsWith('-') ? '' : ' ') + c1;
      lastC1 = c1; sinceC1 = 0;
    } else sinceC1++;
    if (!topic) continue;
    if (c2 && !/^Ученикът:?$/.test(c2)) {
      const last = topic.outcomes.length - 1;
      const prev = topic.outcomes[last];
      let isNew;
      if (bulleted) isNew = BULLET.test(c2) && !/^[-–−]\s/.test(c2) || prev === undefined;
      else isNew = prev === undefined || (/[.;]$/.test(prev) && /^[А-ЯA-Z]/.test(c2));
      if (isNew) topic.outcomes.push(c2.replace(BULLET, ''));
      else topic.outcomes[last] += (prev.endsWith('-') ? '' : ' ') + c2;
    }
    if (c3) topic.concepts.push(c3);
  }
  flush();
  if (current.topics.length) modules.push(current);

  const clean = (s) => s.replace(/\s+/g, ' ').replace(/(\p{L})- (\p{Ll})/gu, '$1$2').trim();
  return modules.map((m) => ({
    module: m.module,
    topics: m.topics.map((t) => {
      const joined = t.concepts.join('\n');
      const commaStyle = (joined.match(/,/g) || []).length >= t.concepts.length / 3;
      const concepts = commaStyle
        ? clean(t.concepts.join(' ')).split(/,\s*|;\s*/)
        : t.concepts.map(clean);
      return {
        num: t.num,
        title: stripOutcome(clean(t.title)).replace(/\s+(\d+\s+)?(естествени обекти|Учебните часове|В часовете за|Препоръчителни|Основните познавателни|ОСНОВНИ ФОРМУЛИ|ПРОЦЕНТНО|-?ЦЕНТНО РАЗПРЕДЕЛЕНИЕ|Годишният брой).*$/, '').trim(),
        outcomes: t.outcomes.map(clean).filter((o) => o.length > 3),
        concepts: concepts.map((x) => x.replace(/\.$/, '').trim()).filter((x) => x.length > 1),
      };
    }),
  }));
}

const list = fs.readFileSync(listFile, 'utf8').split(/\r?\n/).filter(Boolean).map((l) => {
  const [grade, slug, title, url] = l.split('\t');
  return { grade, slug, title, url };
});
const out = [];
for (const d of list) {
  if (debugDoc && `${d.grade}/${d.slug}` !== debugDoc) continue;
  const txt = path.join(dir, d.grade, d.slug + '.txt');
  out.push({ ...d, modules: parseDoc(fs.readFileSync(txt, 'utf8')) });
}
if (!debugDoc) fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
for (const d of out) {
  const n = d.modules.reduce((a, m) => a + m.topics.length, 0);
  const o = d.modules.reduce((a, m) => a + m.topics.reduce((b, t) => b + t.outcomes.length, 0), 0);
  console.log(`${d.grade}\t${d.slug}\tmodules=${d.modules.length}\ttopics=${n}\toutcomes=${o}`);
  if (debugDoc) for (const m of d.modules) {
    if (m.module) console.log('## ' + m.module);
    for (const t of m.topics) console.log(`  [${t.num}] ${t.title}\n      out(${t.outcomes.length}): ${t.outcomes.slice(0, 3).map((x) => x.slice(0, 70)).join(' | ')}\n      new: ${t.concepts.slice(0, 6).join('; ')}`);
  }
}
