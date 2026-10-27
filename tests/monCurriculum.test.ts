import { describe, expect, it } from 'vitest';
import {
  loadMonCatalog,
  loadProgramDetails,
  loadTopicDetails,
  practiceTopics,
  programTopics,
  type MonProgram,
} from '../src/data/monCurriculum';
import { lessonGradeNumbers, programCoverage, titlesMatch } from '../src/data/monCurriculum/lessonCoverage';
import type { LessonData } from '../src/types';

const byId = (programs: MonProgram[], id: string) => {
  const p = programs.find((x) => x.id === id);
  if (!p) throw new Error('няма програма ' + id);
  return p;
};

describe('каталог на учебните програми на МОН', () => {
  it('91 програми с уникални идентификатори и официален източник', async () => {
    const programs = await loadMonCatalog();
    expect(programs).toHaveLength(91);
    expect(new Set(programs.map((p) => p.id)).size).toBe(91);
    const topicIds = programs.flatMap((p) => p.modules.flatMap((m) => m.topics.map((t) => t.id)));
    expect(new Set(topicIds).size).toBe(topicIds.length);
    for (const p of programs) expect(p.url).toMatch(/^https:\/\/www\.mon\.bg\/nfs\/.+\.pdf$/);
  });

  it('всеки клас от 8. до 12. има български език, литература и математика', async () => {
    const programs = await loadMonCatalog();
    for (const grade of [8, 9, 10, 11, 12]) {
      for (const subject of ['bel', 'lit', 'math'] as const) {
        const p = programs.find((x) => x.stage === grade && x.subject === subject);
        expect(p, `${grade} ${subject}`).toBeDefined();
        expect(practiceTopics(p!).length).toBeGreaterThanOrEqual(4);
      }
    }
  });

  it('всяка програма с тестова част има теми, а заглавията са чисти', async () => {
    const programs = await loadMonCatalog();
    for (const p of programs.filter((x) => x.testable)) {
      const topics = programTopics(p);
      expect(topics.length, p.id).toBeGreaterThanOrEqual(3);
      for (const t of topics) {
        expect(t.title.length, t.id).toBeGreaterThan(2);
        // Няма текст от колоната с резултатите и недовършени заглавия
        expect(t.title, t.id).not.toMatch(/\s(Разпознава|Обяснява|Описва|Знае|Умее|Ученикът)\s|ХОРАРИУМ|Брой часове/);
        expect(t.title, t.id).not.toMatch(/(\s(на|във|в|и|или|с|от|за|при|по|до|към)|[-–])$/);
        // Номерът е в полето num, а заглавието започва с главна буква или кавички
        expect(t.title, t.id).not.toMatch(/^(\d{1,2}\.|\p{Ll})/u);
      }
    }
    expect(programs.filter((p) => p.subject === 'pe').every((p) => !p.testable)).toBe(true);
  });

  it('разделите групират подтемите и не са отделни теми за упражнение', async () => {
    const fa = byId(await loadMonCatalog(), '8-fa');
    const leaves = practiceTopics(fa);
    expect(leaves.map((t) => t.title)).toContain('Неравномерно движение');
    expect(leaves.map((t) => t.title)).not.toContain('Механика');
    expect(leaves.find((t) => t.title === 'Неравномерно движение')?.section).toBe('Механика');
  });

  it('9. клас след интензивно обучение по чужд език включва и съдържанието на 8. клас', async () => {
    const programs = await loadMonCatalog();
    const titles = (id: string) => programTopics(byId(programs, id)).map((t) => t.title);
    expect(titles('9-history-144')).toContain('Въведение в Новото време');
    expect(titles('9-history-72')).not.toContain('Въведение в Новото време');
  });

  it('профилираната подготовка е по модули, чуждите езици са по тематични области и граматика', async () => {
    const programs = await loadMonCatalog();
    const ppMath = byId(programs, 'pp-math');
    expect(ppMath.modules.map((m) => m.title)).toEqual([
      'Модул 1. Геометрия',
      'Модул 2. Елементи на математическия анализ',
      'Модул 3. Практическа математика',
      'Модул 4. Вероятности и анализ на данни',
    ]);
    const b1 = programTopics(byId(programs, 'lang-ae-b1')).map((t) => t.title);
    expect(b1.slice(0, 6)).toEqual([
      'Аз и другите',
      'Светът около мен',
      'Всекидневие',
      'Здраве и здравословен начин на живот',
      'Природа и екология',
      'Моята родина и светът',
    ]);
  });

  it('очакваните резултати и новите понятия се зареждат за всяка програма', async () => {
    const programs = await loadMonCatalog();
    for (const p of programs) expect(await loadProgramDetails(p.id), p.id).not.toBeNull();
    const quadratic = programTopics(byId(programs, '8-math')).find((t) => t.title === 'Квадратни уравнения')!;
    const details = await loadTopicDetails(quadratic.id);
    expect(details.outcomes.some((o) => /квадратн/.test(o))).toBe(true);
    expect(details.concepts.join(' ')).toMatch(/дискриминанта/);
    // Изобразителното изкуство пази резултатите общо за програмата
    const arts = programTopics(byId(programs, '8-arts'))[0];
    expect((await loadTopicDetails(arts.id)).outcomes.length).toBeGreaterThan(0);
  });
});

describe('уроци, написани по темите на МОН', () => {
  it('всеки урок сочи към съществуваща тема, а математиката и БЕЛ за 8.–10. клас са покрити изцяло', async () => {
    const { MON_LESSONS } = await import('../src/data/monLessons');
    const programs = await loadMonCatalog();
    const topicIds = new Set(programs.flatMap((p) => p.modules.flatMap((m) => m.topics.map((t) => t.id))));
    for (const lesson of MON_LESSONS) {
      expect(lesson.monTopicIds?.length, lesson.id).toBeGreaterThan(0);
      for (const id of lesson.monTopicIds ?? []) expect(topicIds.has(id), `${lesson.id} → ${id}`).toBe(true);
    }
    for (const programId of ['8-math', '8-bge', '8-lit', '9-math', '9-bge', '9-lit', '10-math', '10-bge', '10-lit', '11-math', '11-be', '12-math', '12-be']) {
      const report = programCoverage(byId(programs, programId), MON_LESSONS);
      expect(report.covered, programId).toBe(report.total);
    }
    // „Балкански синдром“ и „Ноев ковчег“ още нямат проверен написан урок
    const lit11 = programCoverage(byId(programs, '11-lit'), MON_LESSONS);
    expect(lit11.topics.filter((t) => t.lessonIds.length === 0).map((t) => t.topicId).sort()).toEqual(['11-lit:I.3', '11-lit:II.3']);
    // „Колко си хубава!“, „Посвещение“, „Молитва“ и „Честен кръст“ — също
    const lit12 = programCoverage(byId(programs, '12-lit'), MON_LESSONS);
    expect(lit12.topics.filter((t) => t.lessonIds.length === 0).map((t) => t.topicId).sort()).toEqual([
      '12-lit:I.2',
      '12-lit:I.3',
      '12-lit:II.2',
      '12-lit:IV.3',
    ]);
  });

  it('очакваните резултати на БЕЛ за 8. клас са при правилните теми', async () => {
    const voice = await loadTopicDetails('8-bge:7');
    expect(voice.outcomes.join(' ')).toMatch(/страдателен залог/);
    expect(voice.concepts).toContain('деятелен залог');
    const aspect = await loadTopicDetails('8-bge:8');
    expect(aspect.outcomes.join(' ')).toMatch(/вида на глагола/);
    expect(aspect.outcomes.join(' ')).not.toMatch(/страдателен/);
    const antigone = await loadTopicDetails('8-lit:I.4');
    expect(antigone.concepts).toEqual(['драма', 'трагедия', 'трагически конфликт', 'трагически герой', 'катарзис']);
    expect(antigone.outcomes.every((o) => !/Средновековието|Библията/.test(o))).toBe(true);
  });

  it('очакваните резултати за 9. клас са при правилните теми', async () => {
    const probability = await loadTopicDetails('9-math:1');
    expect(probability.outcomes.join(' ')).toMatch(/вероятност на допълнително събитие/);
    expect(probability.outcomes.join(' ')).not.toMatch(/функция/);
    expect(probability.concepts).toContain('несъвместими събития');
    const linear = await loadTopicDetails('9-math:3');
    expect(linear.outcomes.join(' ')).toMatch(/чрез заместване и събиране/);
    const inequalities = await loadTopicDetails('9-math:6');
    expect(inequalities.outcomes.join(' ')).toMatch(/квадратно неравенство/);
    expect(inequalities.outcomes.join(' ')).not.toMatch(/Талес/);
    const lexis = await loadTopicDetails('9-bge:5');
    expect(lexis.concepts).toEqual(['историзми', 'архаизми', 'неологизми', 'вулгаризми', 'евфемизми', 'пароними']);
    const bovary = await loadTopicDetails('9-lit:III.2');
    expect(bovary.outcomes.join(' ')).toMatch(/сценарий за филм/);
    expect(bovary.outcomes.join(' ')).not.toMatch(/модернизма/);
  });

  it('очакваните резултати за 10. клас са при правилните теми', async () => {
    const irrational = await loadTopicDetails('10-math:1');
    expect(irrational.outcomes.join(' ')).toMatch(/ирационални уравнения/);
    expect(irrational.outcomes.join(' ')).not.toMatch(/прогресия/);
    const triangle = await loadTopicDetails('10-math:4');
    expect(triangle.outcomes.join(' ')).toMatch(/синусова и косинусова теорема/);
    expect(triangle.outcomes.join(' ')).not.toMatch(/равнина/);
    const spelling = await loadTopicDetails('10-bge:2');
    expect(spelling.outcomes.join(' ')).toMatch(/правописна/);
    expect(spelling.concepts).toEqual(['правописна норма']);
    const geratsite = await loadTopicDetails('10-lit:I.7');
    expect(geratsite.outcomes.join(' ')).toMatch(/повестта, проявени в „Гераците“/);
    const september = await loadTopicDetails('10-lit:II.1');
    expect(september.outcomes.join(' ')).not.toMatch(/Гераците/);
    expect(september.concepts).toEqual(['следвоенен модернизъм', 'експресионизъм']);
  });

  it('очакваните резултати за 11. клас са разпределени по подтеми', async () => {
    const log = await loadTopicDetails('11-math:1.8');
    expect(log.outcomes.join(' ')).toMatch(/понятието логаритъм/);
    expect(log.concepts).toContain('логаритъм');
    const geometric = await loadTopicDetails('11-math:4.5');
    expect(geometric.outcomes.join(' ')).toMatch(/отношение на лица/);
    const grammar = await loadTopicDetails('11-be:4');
    expect(grammar.outcomes).toEqual(['Разпознава граматични грешки и ги редактира.']);
    const borba = await loadTopicDetails('11-lit:III.1');
    expect(borba.concepts).toEqual(['оксиморон']);
    expect(borba.outcomes.join(' ')).not.toMatch(/Андрешко/);
    const lake = await loadTopicDetails('11-lit:V.3');
    expect(lake.concepts).toEqual(['лирическа миниатюра']);
  });

  it('очакваните резултати за 12. клас са разпределени по подтеми', async () => {
    const means = await loadTopicDetails('12-math:4.2');
    expect(means.concepts).toEqual(['средно хармонично', 'средно квадратично']);
    const logEq = await loadTopicDetails('12-math:2.4');
    expect(logEq.outcomes).toEqual(['Умее да решава основни логаритмични уравнения.']);
    const style = await loadTopicDetails('12-be:3');
    expect(style.concepts).toEqual(['стилистична грешка', 'стилистичен ефект']);
    const spasova = await loadTopicDetails('12-lit:II.1');
    expect(spasova.outcomes.join(' ')).toMatch(/дебат за вярата/);
    expect(spasova.outcomes.join(' ')).not.toMatch(/Посвещение/);
  });
});

describe('покритие с уроци от сайта', () => {
  it('класовете на уроците', () => {
    expect(lessonGradeNumbers('8.–10. клас')).toEqual([8, 9, 10]);
    expect(lessonGradeNumbers('10. клас (НВО)')).toEqual([10]);
    expect(lessonGradeNumbers('12. клас (ДЗИ / Матура)')).toEqual([12]);
  });

  it('сравнява заглавията по основите на думите', () => {
    expect(titlesMatch('Квадратни уравнения', 'Квадратни уравнения и формули на Виет')).toBe(true);
    expect(titlesMatch('Вектори', 'Вектори в равнината')).toBe(true);
    expect(titlesMatch('Квадратни уравнения', 'Подобни триъгълници')).toBe(false);
    expect(titlesMatch('Квадратен корен', 'Квадратни уравнения')).toBe(false);
    expect(titlesMatch('„Андрешко“ (Елин Пелин)', 'Елин Пелин — Повестта „Гераците“')).toBe(false);
    expect(titlesMatch('„Вяра“ (Н. Вапцаров)', 'Никола Вапцаров — „Вяра“, „Писмо“ и „Песен за човека“')).toBe(true);
    expect(titlesMatch('Приложение на знанията за клетката', 'Приложение на производната')).toBe(false);
  });

  it('свързва урок с тема само при същия предмет и клас', async () => {
    const math8 = byId(await loadMonCatalog(), '8-math');
    const lesson = (id: string, title: string, subject: LessonData['subject'], grade: LessonData['grade']) =>
      ({ id, title, subject, grade }) as LessonData;
    const report = programCoverage(math8, [
      lesson('a', 'Квадратни уравнения', 'Математика', '8. клас'),
      lesson('b', 'Квадратни уравнения', 'Математика', '11. клас'),
      lesson('c', 'Квадратни уравнения', 'Физика и астрономия', '8. клас'),
    ]);
    const quadratic = report.topics.find((t) => t.topicId === '8-math:5')!;
    expect(quadratic.lessonIds).toEqual(['a']);
    expect(report.covered).toBe(1);
    expect(report.total).toBe(8);
  });
});
