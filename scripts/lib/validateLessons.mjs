// Проверка на целостта на уроците. Използва се от `npm run check:data` и от тестовете.

// Дума, в която латински и кирилски букви са слепени (напр. „Маatura“),
// с изключение на стандартните означения за групи от периодичната система с римски цифри (IА–VIIIА, IБ–VIIIБ).
const MIXED_SCRIPT_WORD = /[A-Za-z][А-Яа-яЁё]|[А-Яа-яЁё][A-Za-z]/;
const ROMAN_GROUP_TOKEN = /(^|[\s(„"'])(?:I|II|III|IV|V|VI|VII|VIII)[АБ](?=$|[\s)“"',.;:—–-])/g;
const ARABIC_CHAR = /[\u0600-\u06FF]/;
const BOILERPLATE_DISTRACTOR = /Твърдението е невалидно и противоречи на основните принципи/;
const FORMULA_SWAP_STEM = /^(Кое съответства на|Кое е вярно за|За кое понятие от урока се отнася)/;

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;
const isNonEmptyArray = (v) => Array.isArray(v) && v.length > 0;

function hasTextCorruption(str) {
  if (typeof str !== 'string') return false;
  const cleaned = str.replace(ROMAN_GROUP_TOKEN, '$1');
  return MIXED_SCRIPT_WORD.test(cleaned) || ARABIC_CHAR.test(cleaned);
}

/**
 * @param {Array<Record<string, any>>} lessons
 * @param {{ subjects: readonly string[]; grades: readonly string[] }} options
 * @returns {string[]} списък с грешки (празен = всичко е наред)
 */
export function validateLessons(lessons, { subjects, grades }) {
  const errors = [];
  const seenIds = new Set();
  const allowedSubjects = new Set(subjects);
  const allowedGrades = new Set(grades);

  if (!Array.isArray(lessons) || lessons.length === 0) {
    return ['Няма заредени уроци.'];
  }

  lessons.forEach((lesson, index) => {
    const where = `урок #${index} (${lesson?.id ?? 'без id'})`;

    if (!isNonEmptyString(lesson?.id)) errors.push(`${where}: липсва id`);
    else if (seenIds.has(lesson.id)) errors.push(`${where}: дублирано id`);
    else seenIds.add(lesson.id);

    for (const field of ['title', 'subject', 'grade']) {
      if (!isNonEmptyString(lesson?.[field])) errors.push(`${where}: празно поле „${field}“`);
    }

    if (isNonEmptyString(lesson?.subject) && !allowedSubjects.has(lesson.subject)) {
      errors.push(`${where}: непознат предмет „${lesson.subject}“`);
    }
    for (const field of ['title', 'subject', 'grade']) {
      if (isNonEmptyString(lesson?.[field]) && hasTextCorruption(lesson[field])) {
        errors.push(`${where}: смесени латински и кирилски букви в „${field}“: „${lesson[field]}“`);
      }
    }
    if (isNonEmptyString(lesson?.grade) && !allowedGrades.has(lesson.grade)) {
      errors.push(`${where}: непознат клас „${lesson.grade}“ (позволени: LESSON_GRADES)`);
    }
    if (lesson?.audience !== undefined && (!isNonEmptyString(lesson.audience) || hasTextCorruption(lesson.audience))) {
      errors.push(`${where}: невалидно поле „audience“: „${lesson.audience}“`);
    }

    if (!isNonEmptyString(lesson?.summary?.overview)) {
      errors.push(`${where}: празен summary.overview`);
    } else if (hasTextCorruption(lesson.summary.overview)) {
      errors.push(`${where}: смесени латински/кирилски или невалидни знаци в summary.overview`);
    }

    if (!isNonEmptyArray(lesson?.summary?.keyPoints)) {
      errors.push(`${where}: празни summary.keyPoints`);
    } else {
      lesson.summary.keyPoints.forEach((kp, i) => {
        if (!isNonEmptyString(kp)) errors.push(`${where}: празен keyPoint #${i}`);
        else if (hasTextCorruption(kp)) errors.push(`${where}: смесени латински/кирилски знаци в keyPoint #${i}`);
      });
    }

    if (Array.isArray(lesson?.notebookChecklist)) {
      if (lesson.notebookChecklist.length === 0) {
        errors.push(`${where}: празен notebookChecklist`);
      } else {
        lesson.notebookChecklist.forEach((chk, i) => {
          if (!isNonEmptyString(chk?.requirement) || !isNonEmptyString(chk?.suggestedNotes)) {
            errors.push(`${where}: непълен елемент #${i} в notebookChecklist`);
          }
        });
      }
    }

    if (!isNonEmptyArray(lesson?.flashcards)) {
      errors.push(`${where}: няма флаш карти`);
    } else {
      lesson.flashcards.forEach((card, i) => {
        if (!isNonEmptyString(card?.front) || !isNonEmptyString(card?.back)) {
          errors.push(`${where}: флаш карта #${i} е с празна страна`);
        } else if (hasTextCorruption(card.front) || hasTextCorruption(card.back)) {
          errors.push(`${where}: смесени латински/кирилски знаци във флаш карта #${i}`);
        }
      });
    }

    if (!isNonEmptyArray(lesson?.quiz)) {
      errors.push(`${where}: няма тестови въпроси`);
    } else {
      const questionIds = new Set();
      lesson.quiz.forEach((q, i) => {
        const qWhere = `${where}, въпрос #${i} (id ${q?.id})`;
        if (questionIds.has(q?.id)) errors.push(`${qWhere}: дублирано id на въпрос`);
        questionIds.add(q?.id);
        if (!isNonEmptyString(q?.question)) {
          errors.push(`${qWhere}: празен въпрос`);
        } else if (hasTextCorruption(q.question)) {
          errors.push(`${qWhere}: смесени латински/кирилски знаци във въпроса`);
        } else if (FORMULA_SWAP_STEM.test(q.question.trim())) {
          errors.push(`${qWhere}: механичен шаблонен въпрос („${q.question}“)`);
        }
        if (!Array.isArray(q?.options) || q.options.length < 2) {
          errors.push(`${qWhere}: по-малко от 2 отговора`);
        } else {
          if (q.options.some((o) => !isNonEmptyString(o))) errors.push(`${qWhere}: празен отговор`);
          if (q.options.some((o) => hasTextCorruption(o))) {
            errors.push(`${qWhere}: смесени латински/кирилски знаци в отговорите`);
          }
          if (q.options.some((o) => BOILERPLATE_DISTRACTOR.test(o))) {
            errors.push(`${qWhere}: шаблонен дистрактор в отговорите`);
          }
          const trimmedOpts = q.options.filter(isNonEmptyString).map((o) => o.trim());
          if (new Set(trimmedOpts).size !== trimmedOpts.length) {
            errors.push(`${qWhere}: дублирани опции сред отговорите`);
          }
          if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
            errors.push(`${qWhere}: невалиден correctIndex ${q?.correctIndex}`);
          }
        }
      });
    }
  });

  return errors;
}

