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
        expect(t.title, t.id).not.toMatch(/(\s(на|във|в|и|с|от|за|при|по|до|към)|[-–])$/);
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
