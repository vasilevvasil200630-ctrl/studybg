#!/usr/bin/env node
// Проверка на тестовете по модела на validate:content в Матура Плюс:
//   1. Всички банки с въпроси в src/data (открити по форма, независимо от файла) — верен отговор
//      в границите, без празни/повторени отговори, с обяснение, без шаблонни и издаващи се отговори.
//   2. Всеки генератор, пуснат многократно, както го получава ученикът:
//      - тестът по урок съдържа САМО въпроси по темата на урока (тематична изолация);
//      - уроците за специалности, подтеми и матрицата на класовете — само собствените си въпроси;
//      - лабораториите — валидни въпроси, верният отговор не е най-дългият и е на различни позиции.
// Изход с код 1 при грешки (не при предупреждения).
import { readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { createServer } from 'vite';

const ROOT = process.cwd();
const VARIANTS = 30;
const LESSON_VARIANTS = 5;
const LONGEST_CORRECT_MAX = 0.6;
const POSITION_SHARE_MIN = 0.1;
const POSITION_SHARE_MAX = 0.42;

const errors = [];
const warnings = [];
const err = (where, rule, detail) => errors.push(`[${rule}] ${where}: ${detail}`);
const warn = (where, rule, detail) => warnings.push(`[${rule}] ${where}: ${detail}`);

// Отговори, които сами издават, че са грешни или верни, и шаблони-запълнители
const FILLER = /Алтернативно твърдение|Невярно допускане|Твърдението не отговаря на установените норми|Този процес се проявява само при специфични|Посочената зависимост е обратна на реалната/i;
// Само обяснения в скоби, които казват защо отговорът е верен или грешен; „(при положителна дискриминанта)“ е съдържание
const GIVEAWAY = /\((тъй като|защото|прибавяме|изваждаме|квадрат на сбора|без корекция|без двете основи|в градуси Целзий|грешка|при неправилно|при пропускане|при размяна|при директно|при линейно|при объркване)|— като при /i;
const BAD_VALUE = /\b(NaN|Infinity|undefined|null)\b|\[object Object\]/;
const VARIANT_TAG = /\[Вариант #/;

const text = (v) => (typeof v === 'string' ? v : typeof v === 'number' ? String(v) : '');
const short = (s) => text(s).replace(/\s+/g, ' ').trim().slice(0, 90);

function questionOf(q) {
  return text(q.question ?? q.text ?? q.prompt ?? q.stem ?? q.originalSentence);
}

/** Връща грешките на един въпрос с избираем отговор (нормализиран) */
function checkQuestion(q, where, { strictLabs = false, generated = false } = {}) {
  const stem = questionOf(q);
  const options = Array.isArray(q.options) ? q.options : null;
  if (!options) return;
  const label = `${where} | ${short(stem)}`;
  if (stem.trim().length < 8) err(label, 'empty-question', 'няма текст на въпроса');
  if (options.length < 2) err(label, 'too-few-options', `${options.length} отговора`);
  if (strictLabs && options.length !== 4) err(label, 'options-count', `${options.length} отговора вместо 4`);
  options.forEach((o, i) => {
    if (typeof o !== 'string' && typeof o !== 'number') err(label, 'option-not-text', `отговор ${i} е ${typeof o}`);
    else if (!text(o).trim()) err(label, 'empty-option', `отговор ${i} е празен`);
  });
  const strict = options.map((o) => text(o).replace(/\s+/g, ' ').trim());
  const dup = strict.find((o, i) => o && strict.indexOf(o) !== i);
  if (dup) err(label, 'duplicate-options', `„${short(dup)}“`);
  const ci = q.correctIndex ?? q.correctAnswer;
  if (!Number.isInteger(ci) || ci < 0 || ci >= options.length) err(label, 'answer-out-of-range', `верен индекс ${ci} при ${options.length} отговора`);
  for (const o of strict) {
    if (FILLER.test(o)) err(label, 'filler-option', `шаблонен отговор „${short(o)}“`);
    if (GIVEAWAY.test(o)) err(label, 'giveaway-option', `отговорът сам се обяснява „${short(o)}“`);
    // В банките „…“ е част от фраза („dass…“); в генерираните въпроси е отрязан текст
    if (generated && /…$/.test(o)) err(label, 'truncated-option', `отрязан отговор „${short(o)}“`);
  }
  // „null“ в задачите по програмиране е съдържание — проверява се само в генерираните въпроси
  if (generated && [stem, ...strict].some((t) => BAD_VALUE.test(t))) err(label, 'bad-value', 'NaN / undefined / null в текста');
  if (VARIANT_TAG.test(stem)) err(label, 'variant-tag', 'служебен етикет „[Вариант #…]“ във въпроса');
  const explanation = text(q.explanation ?? q.explanationBg ?? q.solution);
  if (!explanation.trim()) warn(label, 'missing-explanation', 'няма обяснение');
}

/** Баланс на генератор: позиции на верния отговор и „верният е най-дългият“ */
function checkBalance(name, questions) {
  const total = questions.length;
  if (total < 40) return;
  const positions = [0, 0, 0, 0];
  let longest = 0;
  for (const q of questions) {
    const ci = q.correctIndex ?? q.correctAnswer;
    if (!Array.isArray(q.options) || q.options.length !== 4 || !Number.isInteger(ci)) continue;
    positions[ci]++;
    const lens = q.options.map((o) => text(o).trim().length);
    if (lens.every((l, i) => i === ci || l < lens[ci])) longest++;
  }
  const pct = (x) => `${Math.round(x * 100)}%`;
  positions.forEach((c, i) => {
    const share = c / total;
    if (share < POSITION_SHARE_MIN || share > POSITION_SHARE_MAX)
      err(name, 'position-balance', `верният отговор е на позиция ${'АБВГ'[i]} в ${pct(share)} (${positions.join('/')})`);
  });
  if (longest / total > LONGEST_CORRECT_MAX) err(name, 'longest-correct', `верният отговор е най-дългият в ${pct(longest / total)} от ${total} въпроса`);
}

// ---------------------------------------------------------------------------
// 1. Банки с въпроси в src/data
// ---------------------------------------------------------------------------

function walkFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walkFiles(p));
    else if (['.ts', '.tsx'].includes(extname(p)) && !p.endsWith('.d.ts') && !/__tests__|\.test\./.test(p)) out.push(p);
  }
  return out;
}

function walkValue(value, file, path, seen, onQuestion) {
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    value.forEach((v, i) => walkValue(v, file, `${path}[${i}]`, seen, onQuestion));
    return;
  }
  if (Array.isArray(value.options) && ('correctIndex' in value || 'correctAnswer' in value) && questionOf(value)) onQuestion(value, `${file} → ${path}`);
  for (const [k, v] of Object.entries(value)) if (v && typeof v === 'object') walkValue(v, file, path ? `${path}.${k}` : k, seen, onQuestion);
}

const server = await createServer({ configFile: false, logLevel: 'error', appType: 'custom', server: { middlewareMode: true, hmr: false } });
let exitCode = 0;
try {
  const load = (p) => server.ssrLoadModule(p);
  let bankQuestions = 0;
  const seen = new Set();
  const loadErrors = [];
  for (const f of walkFiles(join(ROOT, 'src', 'data'))) {
    const rel = relative(ROOT, f).replace(/\\/g, '/');
    try {
      const mod = await load(`/${rel}`);
      for (const [name, val] of Object.entries(mod)) {
        walkValue(val, rel, name, seen, (q, where) => {
          bankQuestions++;
          checkQuestion(q, where);
        });
      }
    } catch (e) {
      loadErrors.push(`${rel}: ${String(e?.message ?? e).split('\n')[0]}`);
    }
  }
  loadErrors.forEach((m) => err(m, 'load', 'файлът не се зарежда'));

  // -------------------------------------------------------------------------
  // 2. Генераторите, както ги вижда ученикът
  // -------------------------------------------------------------------------
  const { loadFullCurriculumLessons } = await load('/src/data/curriculumDatabase.ts');
  const lessons = await loadFullCurriculumLessons();
  const gen = await load('/src/services/infiniteQuizGenerator.ts');

  // 2a. Тест по урок: само въпроси по темата, верният текст непроменен
  let lessonTests = 0;
  for (const lesson of lessons) {
    const pool = gen.topicQuestionPool(lesson, lessons);
    const byStem = new Map(pool.map((q) => [q.question, q]));
    for (let v = 1; v <= LESSON_VARIANTS; v++) {
      const test = gen.generateInfiniteLessonQuiz(lesson, lessons, v, 10);
      lessonTests++;
      if (test.length !== Math.min(10, pool.length)) err(lesson.id, 'lesson-test-size', `вариант ${v}: ${test.length} въпроса при ${pool.length} по темата`);
      if (new Set(test.map((q) => q.question)).size !== test.length) err(lesson.id, 'lesson-test-repeat', `вариант ${v}: повторен въпрос`);
      for (const q of test) {
        const original = byStem.get(q.question);
        if (!original) err(lesson.id, 'off-topic', `вариант ${v}: въпрос извън темата „${short(q.question)}“`);
        else if (q.options[q.correctIndex] !== original.options[original.correctIndex])
          err(lesson.id, 'changed-answer', `вариант ${v}: верният отговор е променен „${short(q.question)}“`);
      }
    }
  }

  // 2b. Уроци за подтеми, специалности и матрицата на класовете
  const { BULGARIAN_CURRICULUM_TREE } = await load('/src/data/bulgarianCurriculumTree.ts');
  const { SUBDOMAIN_LESSON_MAP } = await load('/src/services/curriculumClassifier.ts');
  const { SCHOOL_SPECIALTIES_SECTIONS, GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX } = await load('/src/data/schoolsSpecialtiesDatabase.ts');
  const byId = new Map(lessons.map((l) => [l.id, l]));
  const checkTailored = (tailored, where) => {
    const stems = new Set(gen.topicQuestionPool(tailored, lessons).map((q) => q.question));
    for (const q of tailored.quiz) {
      checkQuestion(q, where, { generated: true });
      if (!stems.has(q.question)) err(where, 'off-topic', `въпрос извън темата „${short(q.question)}“`);
    }
  };
  let tailoredCount = 0;
  for (const tree of BULGARIAN_CURRICULUM_TREE)
    for (const g of tree.grades)
      for (const d of g.domains)
        for (const sub of d.subDomains) {
          const base = byId.get(SUBDOMAIN_LESSON_MAP[sub.id]);
          if (!base) continue;
          tailoredCount++;
          checkTailored(gen.buildTailoredSubDomainLesson(tree.subject, g.grade, d.name, sub, base, lessons), `подтема ${sub.id}`);
        }
  for (const sec of SCHOOL_SPECIALTIES_SECTIONS)
    for (const spec of sec.specialties) {
      const base = byId.get(spec.linkedLessonId);
      if (!base) continue;
      tailoredCount++;
      checkTailored(gen.buildTailoredSpecialtyLesson(sec, spec, base, lessons), `специалност ${spec.code}`);
    }
  for (const gm of GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX)
    for (const subj of gm.subjects) {
      const base = byId.get(subj.linkedLessonId);
      if (!base) continue;
      tailoredCount++;
      checkTailored(gen.buildTailoredMatrixSubjectLesson(gm, subj, base, lessons), `матрица ${gm.grade} ${subj.subjectName}`);
    }

  // 2c. Лабораториите
  const labs = await load('/src/services/infiniteLabGenerators.ts');
  const { LITERATURE_CANON } = await load('/src/data/literatureDatabase.ts');
  const { HISTORICAL_CASES_DATA } = await load('/src/data/historicalCasesData.ts');
  const labRuns = {
    'Литературен канон': (v) => LITERATURE_CANON.flatMap((a) => labs.generateAuthorInfiniteQuiz(a, LITERATURE_CANON, v)),
    'Граматика': (v) => labs.generateGrammarInfiniteQuestions('all', v),
    'Модул 2 БЕЛ': (v) => labs.generateModuleTwoInfiniteQuestions('all', v),
    'Математика': (v) => labs.generateMathLabInfiniteQuiz('all', v),
    'Природни науки': (v) => labs.generateScienceLabInfiniteQuiz(v),
    'Английски (трансформации)': (v) => labs.generateEnglishTransformationsVariant('ALL', v),
    'Гражданско образование': (v) => labs.generateCivicsInfiniteQuiz('all', v),
    'История и география': (v) => labs.generateHistoryGeoInfiniteQuiz('all', v),
    'Исторически казуси': (v) => HISTORICAL_CASES_DATA.flatMap((c) => labs.generateHistoricalCaseQuiz(c, HISTORICAL_CASES_DATA, v)),
  };
  let labQuestions = 0;
  for (const [name, run] of Object.entries(labRuns)) {
    const all = [];
    const reported = new Set();
    for (let v = 1; v <= VARIANTS; v++) {
      let qs;
      try {
        qs = run(v);
      } catch (e) {
        err(name, 'throws', `вариант ${v}: ${String(e?.message ?? e).split('\n')[0]}`);
        break;
      }
      if (!qs.length) err(name, 'empty', `вариант ${v}: няма въпроси`);
      for (const q of qs) {
        const before = errors.length;
        checkQuestion(q, `${name}`, { strictLabs: true, generated: true });
        // Една и съща грешка от много варианти — веднъж
        for (const e of errors.splice(before)) if (!reported.has(e)) (reported.add(e), errors.push(e));
      }
      all.push(...qs);
    }
    labQuestions += all.length;
    checkBalance(name, all);
  }

  if (warnings.length) {
    const byRule = warnings.reduce((a, w) => ((a[w.slice(1, w.indexOf(']'))] = (a[w.slice(1, w.indexOf(']'))] ?? 0) + 1), a), {});
    console.log(`⚠ check:quizzes — предупреждения: ${JSON.stringify(byRule)}`);
  }
  if (errors.length) {
    console.error(`✗ check:quizzes — ${errors.length} проблема:`);
    errors.slice(0, process.env.ALL ? Infinity : 200).forEach((e) => console.error(`  - ${e}`));
    if (!process.env.ALL && errors.length > 200) console.error(`  … и още ${errors.length - 200}`);
    exitCode = 1;
  } else {
    console.log(
      `✓ check:quizzes — ${bankQuestions} въпроса в банките, ${lessonTests} теста по урок, ${tailoredCount} специализирани урока, ${labQuestions} въпроса от 9 лаборатории; 0 проблема`
    );
  }
} catch (e) {
  console.error('✗ check:quizzes — неуспешно зареждане:', e);
  exitCode = 1;
} finally {
  await server.close();
}
process.exit(exitCode);
