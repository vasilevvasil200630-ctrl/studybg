// Проверка на целостта на уроците. Използва се от `npm run check:data` и от тестовете.

// Дума, в която латински и кирилски букви са слепени (напр. „Маatura“)
const MIXED_SCRIPT_WORD = /[A-Za-z][А-Яа-яЁё]|[А-Яа-яЁё][A-Za-z]/;

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;
const isNonEmptyArray = (v) => Array.isArray(v) && v.length > 0;

/**
 * @param {Array<Record<string, any>>} lessons
 * @param {{ subjects: readonly string[] }} options
 * @returns {string[]} списък с грешки (празен = всичко е наред)
 */
export function validateLessons(lessons, { subjects }) {
  const errors = [];
  const seenIds = new Set();
  const allowedSubjects = new Set(subjects);

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
      if (isNonEmptyString(lesson?.[field]) && MIXED_SCRIPT_WORD.test(lesson[field])) {
        errors.push(`${where}: смесени латински и кирилски букви в „${field}“: „${lesson[field]}“`);
      }
    }
    if (isNonEmptyString(lesson?.grade) && !/клас/.test(lesson.grade)) {
      errors.push(`${where}: класът не съдържа „клас“: „${lesson.grade}“`);
    }

    if (!isNonEmptyString(lesson?.summary?.overview)) errors.push(`${where}: празен summary.overview`);
    if (!isNonEmptyArray(lesson?.summary?.keyPoints)) errors.push(`${where}: празни summary.keyPoints`);

    if (!isNonEmptyArray(lesson?.flashcards)) {
      errors.push(`${where}: няма флаш карти`);
    } else {
      lesson.flashcards.forEach((card, i) => {
        if (!isNonEmptyString(card?.front) || !isNonEmptyString(card?.back)) {
          errors.push(`${where}: флаш карта #${i} е с празна страна`);
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
        if (!isNonEmptyString(q?.question)) errors.push(`${qWhere}: празен въпрос`);
        if (!Array.isArray(q?.options) || q.options.length < 2) {
          errors.push(`${qWhere}: по-малко от 2 отговора`);
        } else {
          if (q.options.some((o) => !isNonEmptyString(o))) errors.push(`${qWhere}: празен отговор`);
          if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
            errors.push(`${qWhere}: невалиден correctIndex ${q?.correctIndex}`);
          }
        }
      });
    }
  });

  return errors;
}
