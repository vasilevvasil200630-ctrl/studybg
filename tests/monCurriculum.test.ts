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
  }, 20_000);
});

describe('уроци, написани по темите на МОН', () => {
  it('всеки урок сочи към съществуваща тема, а програмите с написани уроци са покрити изцяло', async () => {
    const { MON_LESSONS } = await import('../src/data/monLessons');
    const programs = await loadMonCatalog();
    const topicIds = new Set(programs.flatMap((p) => p.modules.flatMap((m) => m.topics.map((t) => t.id))));
    for (const lesson of MON_LESSONS) {
      expect(lesson.monTopicIds?.length, lesson.id).toBeGreaterThan(0);
      for (const id of lesson.monTopicIds ?? []) expect(topicIds.has(id), `${lesson.id} → ${id}`).toBe(true);
    }
    for (const programId of ['8-math', '8-bge', '8-lit', '9-math', '9-bge', '9-lit', '10-math', '10-bge', '10-lit', '11-math', '11-be', '12-math', '12-be', '8-bio', '8-himia', '8-fa', '9-bio-36', '9-bio-90', '9-himia-54', '9-himia-90', '9-fa-36', '9-fa-90', '10-bio', '10-himia', '10-fa', '8-geo', '9-geo-36', '9-geo-72', '10-geo', '8-phil', '9-phil', '10-phil', '8-history', '9-history-72', '9-history-144', '10-history', '11-lit', '12-lit', '11-go', '12-go', '8-informatika', '8-it', '9-it', '10-it', 'lang-ae-a1', 'lang-ae-a2-8-neint', 'lang-ae-a2-11-12', 'lang-ae-b1.1-8-int', 'lang-ae-b1.1', 'lang-ae-b1', 'lang-ae-b2.1', 'lang-ne-a1', 'lang-ne-a2-8-neint', 'lang-ne-a2-11-12', 'lang-ne-b1.1-8-int', 'lang-ne-b1.1', 'lang-ne-b1', 'lang-ne-b2.1', '8-tp', '9-tp', 'pp-bel', 'pp-history']) {
      const report = programCoverage(byId(programs, programId), MON_LESSONS);
      expect(report.covered, programId).toBe(report.total);
    }
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

  it('географията за 8. клас: „География на природата“ е раздел, резултатите са при правилните теми', async () => {
    const geo = byId(await loadMonCatalog(), '8-geo');
    const practice = practiceTopics(geo).map((t) => t.id);
    expect(practice).not.toContain('8-geo:3');
    expect(practice).toHaveLength(11);
    expect(programTopics(geo).find((t) => t.id === '8-geo:5')?.section).toBe('География на природата');
    expect((await loadTopicDetails('8-geo:2')).outcomes.join(' ')).toMatch(/наклона на земната ос/);
    expect((await loadTopicDetails('8-geo:6')).outcomes.join(' ')).not.toMatch(/земната кора/);
    expect((await loadTopicDetails('8-geo:7')).outcomes[0]).toMatch(/вътрешния строеж на Земята/);
    expect((await loadTopicDetails('8-geo:11')).outcomes.join(' ')).toMatch(/Създава карта/);
  });

  it('географията за 9. клас: изпуснатите теми са добавени, без да се местят номерата на останалите', async () => {
    const catalog = await loadMonCatalog();
    const title = (program: string, id: string) => programTopics(byId(catalog, program)).find((t) => t.id === id)?.title;
    expect(title('9-geo-36', '9-geo-36:0a')).toBe('Политическа организация на обществото');
    expect(title('9-geo-36', '9-geo-36:1')).toBe('Брой, разпределение и движение на населението в света');
    expect(title('9-geo-36', '9-geo-36:16')).toBe('География на континентите и страните');
    expect(title('9-geo-72', '9-geo-72:0a')).toBe('Форма и размери на Земята');
    expect(title('9-geo-72', '9-geo-72:1')).toBe('Движения на Земята');
    expect(title('9-geo-72', '9-geo-72:19a')).toBe('Вторичен сектор');
    expect(title('9-geo-72', '9-geo-72:26')).toBe('География на континентите и страните');
    expect(practiceTopics(byId(catalog, '9-geo-72')).map((t) => t.id)).not.toContain('9-geo-72:11');
    expect((await loadTopicDetails('9-geo-36:9')).outcomes.join(' ')).toMatch(/енергетиката/);
    expect((await loadTopicDetails('9-geo-36:9')).outcomes.join(' ')).not.toMatch(/металургия/);
  });

  it('географията за 10. клас: повторното заглавие е пропуснато, без да се местят номерата', async () => {
    const geo = byId(await loadMonCatalog(), '10-geo');
    const topics = programTopics(geo);
    expect(topics.map((t) => t.id)).not.toContain('10-geo:4');
    expect(topics.find((t) => t.id === '10-geo:5')?.title).toBe('Природни области');
    expect(topics.find((t) => t.id === '10-geo:5')?.section).toBe('Природна среда на България');
    expect(topics.find((t) => t.id === '10-geo:23')?.title).toBe('Райони в България');
    expect(practiceTopics(geo)).toHaveLength(21);
    expect((await loadTopicDetails('10-geo:6')).outcomes.join(' ')).toMatch(/демографската ситуация/);
    expect((await loadTopicDetails('10-geo:8')).outcomes.join(' ')).toMatch(/държавното устройство/);
    expect((await loadTopicDetails('10-geo:8')).outcomes.join(' ')).not.toMatch(/селища/);
  });

  it('очакваните резултати по философия са при правилните подтеми', async () => {
    expect((await loadTopicDetails('8-phil:1.1')).outcomes.join(' ')).toMatch(/мит и логос/);
    expect((await loadTopicDetails('8-phil:2.3')).outcomes.join(' ')).toMatch(/Маслоу/);
    expect((await loadTopicDetails('8-phil:2.2')).outcomes.join(' ')).not.toMatch(/Маслоу/);
    expect((await loadTopicDetails('9-phil:2.1')).outcomes.join(' ')).toMatch(/Августин, Кант/);
    expect((await loadTopicDetails('9-phil:2.3')).outcomes.join(' ')).toMatch(/Аристотел за добродетелта/);
    expect((await loadTopicDetails('9-phil:3.2')).concepts).toContain('катарзис');
    expect((await loadTopicDetails('10-phil:1')).outcomes.join(' ')).toMatch(/удивлението и съмнението/);
    expect((await loadTopicDetails('10-phil:3.1')).outcomes.join(' ')).not.toMatch(/Тома от Аквино/);
    expect((await loadTopicDetails('10-phil:3.2')).outcomes.join(' ')).toMatch(/Тома от Аквино/);
    expect((await loadTopicDetails('10-phil:4.1')).outcomes.join(' ')).toMatch(/Джон Ролс/);
  });

  it('историята за 8. клас: резултатите са разпределени по подтеми и важат и за 9. клас (144 ч.)', async () => {
    expect((await loadTopicDetails('8-history:2.1.1')).outcomes.join(' ')).toMatch(/Великите географски открития/);
    expect((await loadTopicDetails('8-history:2.2.1')).outcomes.join(' ')).toMatch(/Мартин Лутер/);
    expect((await loadTopicDetails('8-history:3.2.2')).outcomes.join(' ')).toMatch(/Паисий Хилендарски/);
    expect((await loadTopicDetails('8-history:4.1.6')).outcomes.join(' ')).toMatch(/Търновската конституция/);
    expect((await loadTopicDetails('8-history:4.2.3')).outcomes.join(' ')).toMatch(/Васил Левски/);
    expect((await loadTopicDetails('8-history:2')).outcomes).toEqual([]);
    expect((await loadTopicDetails('9-history-144:4.2.3')).outcomes).toEqual((await loadTopicDetails('8-history:4.2.3')).outcomes);
    const h144 = programTopics(byId(await loadMonCatalog(), '9-history-144'));
    expect(h144.find((t) => t.id === '9-history-144:3.2.2')?.title).toBe('Балканското възраждане през XVIII век');
  });

  it('историята за 9. клас: 72 ч. и втората част на 144 ч. имат едни и същи подтеми и резултати', async () => {
    const catalog = await loadMonCatalog();
    const p72 = practiceTopics(byId(catalog, '9-history-72'));
    const p144 = practiceTopics(byId(catalog, '9-history-144')).filter((t) => /^[567]/.test(t.num));
    expect(p72).toHaveLength(35);
    expect(p144.map((t) => t.title)).toEqual(p72.map((t) => t.title));
    expect(p144.find((t) => t.num === '6.3.2')?.title).toBe('Масовата култура');
    expect((await loadTopicDetails('9-history-72:2.1.15')).outcomes.join(' ')).toMatch(/спасяването на българските евреи/);
    expect((await loadTopicDetails('9-history-144:6.1.15')).outcomes).toEqual((await loadTopicDetails('9-history-72:2.1.15')).outcomes);
    expect((await loadTopicDetails('9-history-72:3.1.7')).outcomes.join(' ')).toMatch(/Европейския съюз/);
    expect((await loadTopicDetails('9-history-72:2')).outcomes).toEqual([]);
  });

  it('историята за 10. клас: всяка от 84-те подтеми има резултати, разпределени по смисъл', async () => {
    const history = byId(await loadMonCatalog(), '10-history');
    const practice = practiceTopics(history);
    expect(practice).toHaveLength(84);
    for (const t of practice) expect((await loadTopicDetails(t.id)).outcomes.length, t.id).toBeGreaterThan(0);
    expect(practice.map((t) => t.id)).toContain('10-history:4.3');
    expect((await loadTopicDetails('10-history:3.1.2')).outcomes.join(' ')).toMatch(/Кубрат, Аспарух и Тервел/);
    expect((await loadTopicDetails('10-history:3.1.5')).outcomes.join(' ')).toMatch(/Симеон Велики/);
    expect((await loadTopicDetails('10-history:6.1.6')).outcomes.join(' ')).toMatch(/Васил Левски/);
    expect((await loadTopicDetails('10-history:7.1.11.1')).outcomes.join(' ')).toMatch(/БЗНС/);
    expect((await loadTopicDetails('10-history:8.1.5')).concepts).toContain('„Възродителен процес“');
    expect(programTopics(history).find((t) => t.id === '10-history:8.2.1')?.title).toBe('Икономически промени в селото и града');
  });

  it('информатика и ИТ: резултатите са разпределени по темите, а изпуснатата тема 6 в 8. клас ИТ е добавена', async () => {
    const programs = await loadMonCatalog();
    for (const [programId, count] of [['8-informatika', 18], ['8-it', 6], ['9-it', 6], ['10-it', 3]] as const) {
      const practice = practiceTopics(byId(programs, programId));
      expect(practice, programId).toHaveLength(count);
      for (const t of practice) expect((await loadTopicDetails(t.id)).outcomes.length, t.id).toBeGreaterThan(0);
    }
    expect((await loadTopicDetails('8-informatika:1.1')).outcomes.join(' ')).toMatch(/двоична бройна система/);
    expect((await loadTopicDetails('8-informatika:3.1.2')).outcomes.join(' ')).toMatch(/целочислен тип/);
    expect((await loadTopicDetails('8-informatika:3.1.2')).outcomes.join(' ')).not.toMatch(/тип низ/);
    expect((await loadTopicDetails('8-informatika:3.4.1')).concepts).toContain('оператор за цикъл с предусловие');
    expect((await loadTopicDetails('8-it:2')).outcomes.join(' ')).toMatch(/операционна система/);
    expect((await loadTopicDetails('8-it:6')).outcomes.join(' ')).toMatch(/уеб сайт в екип/);
    expect((await loadTopicDetails('9-it:2')).concepts).toContain('маршрутизатор (router)');
    expect((await loadTopicDetails('10-it:1')).outcomes.join(' ')).toMatch(/дезинформация/);
    expect((await loadTopicDetails('10-it:1')).concepts).toEqual([]);
  });

  it('английски и немски език: подтемите, уменията и граматиката са подредени във всяка програма', async () => {
    const programs = await loadMonCatalog();
    for (const p of programs.filter((x) => x.stage === 'lang' && (x.slug.startsWith('ae-') || x.slug.startsWith('ne-')))) {
      const skills = await loadTopicDetails(`${p.id}:skills`);
      expect(skills.outcomes.length, p.id).toBeGreaterThan(5);
      for (const o of skills.outcomes) expect(o, p.id).toMatch(/^(Слушане|Четене|Говорене|Писане): /);
      expect((await loadTopicDetails(`${p.id}:grammar`)).concepts.length, p.id).toBeGreaterThan(8);
      expect((await loadTopicDetails(`${p.id}:1`)).concepts.length, p.id).toBeGreaterThan(0);
    }
    expect((await loadTopicDetails('lang-ae-a1:4')).concepts).toEqual(['Части на човешкото тяло']);
    expect((await loadTopicDetails('lang-ae-b2.1:grammar')).concepts.join(' ')).toMatch(/No sooner…than/);
    expect((await loadTopicDetails('lang-ne-a1:4')).concepts).toEqual(['Части на човешкото тяло']);
    expect((await loadTopicDetails('lang-ne-b2.1:grammar')).concepts.join(' ')).toMatch(/Konjunktiv I/);
  });

  it('гражданското образование: резултатите и понятията са разпределени по подтемите', async () => {
    const programs = await loadMonCatalog();
    for (const [programId, count] of [['11-go', 9], ['12-go', 7]] as const) {
      const practice = practiceTopics(byId(programs, programId));
      expect(practice, programId).toHaveLength(count);
      for (const t of practice) expect((await loadTopicDetails(t.id)).outcomes.length, t.id).toBeGreaterThan(0);
    }
    expect((await loadTopicDetails('11-go:1')).outcomes).toEqual([]);
    expect((await loadTopicDetails('11-go:1.2')).outcomes.join(' ')).toMatch(/избирателни системи/);
    expect((await loadTopicDetails('11-go:2.1')).outcomes.join(' ')).toMatch(/Всеобща декларация за правата на човека/);
    expect((await loadTopicDetails('11-go:3.3')).outcomes.join(' ')).toMatch(/патриотизъм от национализъм/);
    expect((await loadTopicDetails('12-go:1.2')).concepts).toContain('разделение на властите');
    expect((await loadTopicDetails('12-go:2.2')).outcomes.join(' ')).toMatch(/публичния бюджет/);
    expect((await loadTopicDetails('12-go:2.1')).outcomes.join(' ')).not.toMatch(/хуманитарно право/);
    expect(programTopics(byId(programs, '11-go')).find((t) => t.id === '11-go:3.1')?.title).toBe('Възникване и разгръщане на идентичностите');
  });

  it('очакваните резултати по природни науки за 10. клас са при правилните теми', async () => {
    const ecosystem = await loadTopicDetails('10-bio:2.1');
    expect(ecosystem.outcomes[0]).toMatch(/^Дефинира и илюстрира с примери популация/);
    expect((await loadTopicDetails('10-bio:2.2')).outcomes.join(' ')).not.toMatch(/екологична пирамида/);
    expect((await loadTopicDetails('10-himia:1')).outcomes.join(' ')).toMatch(/синтез на амоняк/);
    expect((await loadTopicDetails('10-himia:3')).outcomes.join(' ')).toMatch(/окислител и редуктор/);
    expect((await loadTopicDetails('10-himia:4')).outcomes.join(' ')).toMatch(/вулканизация/);
    const emWaves = await loadTopicDetails('10-fa:1.5');
    expect(emWaves.outcomes.join(' ')).toMatch(/диапазони от електромагнитния спектър/);
    expect((await loadTopicDetails('10-fa:2.1')).outcomes.join(' ')).not.toMatch(/радиовълни|микровълните/);
    expect((await loadTopicDetails('10-fa:2.3')).outcomes.join(' ')).toMatch(/фотоефекта/);
    expect((await loadTopicDetails('10-fa:3.3')).outcomes.join(' ')).toMatch(/ядрения реактор/);
    expect((await loadTopicDetails('10-fa:3.4')).concepts).toContain('кварки');
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

  it('технологии и предприемачество за 8. и 9. клас: всяка подтема има очаквани резултати и понятия', async () => {
    const programs = await loadMonCatalog();
    const tp8 = practiceTopics(byId(programs, '8-tp'));
    const tp9 = practiceTopics(byId(programs, '9-tp'));
    expect(tp8).toHaveLength(21);
    expect(tp9).toHaveLength(30);
    for (const topic of [...tp8, ...tp9]) {
      const details = await loadTopicDetails(topic.id);
      expect(details.outcomes.length, topic.id).toBeGreaterThan(0);
      expect(details.concepts.length, topic.id).toBeGreaterThan(0);
    }
    expect((await loadTopicDetails('8-tp:2.7')).concepts).toContain('работна сила');
    expect((await loadTopicDetails('9-tp:5.4')).concepts).toEqual(['мисия на фирма', 'визия на фирма', 'стратегически цели', 'оперативни цели']);
  });

  it('профилирана подготовка по БЕЛ (Модул 1): всяка тема има очаквани резултати и понятия', async () => {
    const programs = await loadMonCatalog();
    const ppBel = practiceTopics(byId(programs, 'pp-bel'));
    expect(ppBel).toHaveLength(9);
    for (const topic of ppBel) {
      const details = await loadTopicDetails(topic.id);
      expect(details.outcomes.length, topic.id).toBeGreaterThan(0);
      expect(details.concepts.length, topic.id).toBeGreaterThan(0);
    }
    expect((await loadTopicDetails('pp-bel:1')).concepts).toContain('социолингвистика');
    expect((await loadTopicDetails('pp-bel:9')).concepts).toEqual(['протокол в публичното общуване', 'речев етикет']);
  });

  it('профилирана подготовка по история и цивилизации (Модули 1–3): всяка подтема има очаквани резултати и понятия', async () => {
    const programs = await loadMonCatalog();
    const ppHist = practiceTopics(byId(programs, 'pp-history'));
    expect(ppHist).toHaveLength(34);
    for (const topic of ppHist) {
      const details = await loadTopicDetails(topic.id);
      expect(details.outcomes.length, topic.id).toBeGreaterThan(0);
      expect(details.concepts.length, topic.id).toBeGreaterThan(0);
    }
    expect(byId(programs, 'pp-history').modules.map((m) => m.title)).toEqual([
      'Модул 1. Власт и институции',
      'Модул 2. Култура и духовност',
      'Модул 3. Човек и общество',
    ]);
    expect((await loadTopicDetails('pp-history:m1:1.6')).concepts).toContain('президентска република');
    expect((await loadTopicDetails('pp-history:m1:3.3')).concepts).toContain('Pax Simeonica');
    expect((await loadTopicDetails('pp-history:m3:3.2')).concepts).toContain('либерализъм');
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
