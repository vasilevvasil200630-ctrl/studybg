import { describe, expect, it } from 'vitest';
import { DIPPK_SCALE, DZI_SCALE, examScaleForLesson, gradeBands, gradeToPoints, pointsToGrade } from '../src/lib/monGradeScale';

describe('monGradeScale', () => {
  it('ДЗИ скалата е монотонна от 0 до 100 точки', () => {
    let previous = 0;
    for (let points = 0; points <= 100; points++) {
      const { numeric } = pointsToGrade(points, DZI_SCALE);
      expect(numeric).toBeGreaterThanOrEqual(previous);
      previous = numeric;
    }
  });

  it('ДЗИ — таблицата на МОН (от 2022/23 г.): граници на оценките и стъпка 0,25 т.', () => {
    const g = (p: number) => pointsToGrade(p, DZI_SCALE).numeric;
    expect(g(29.75)).toBe(2);
    expect([g(30), g(30.25), g(30.5)]).toEqual([3, 3.01, 3.02]);
    expect(g(40.5)).toBeLessThanOrEqual(3.49);
    expect(g(40.75)).toBe(3.5);
    expect(g(62.25)).toBeLessThanOrEqual(4.49);
    expect(g(62.5)).toBe(4.5);
    expect(g(83.75)).toBeLessThanOrEqual(5.49);
    expect(g(84)).toBe(5.5);
    expect(g(94.75)).toBe(5.99);
    expect([g(95), g(99), g(100)]).toEqual([6, 6, 6]);
    expect(gradeToPoints(3.5)).toBe(40.75);
    expect(gradeToPoints(5.5)).toBe(84);
    expect(gradeToPoints(6)).toBe(95);
    // всеки 0,25 т. е най-много една стотна нагоре и оценката не прескача
    let prev = g(30);
    for (let p = 30.25; p <= 95; p += 0.25) {
      const cur = g(p);
      expect(cur - prev).toBeGreaterThanOrEqual(0);
      expect(cur - prev).toBeLessThanOrEqual(0.02 + 1e-9);
      prev = cur;
    }
  });

  it('ДЗИ: 29 т. → 2.00, 30 т. → 3.00, 100 т. → 6.00', () => {
    expect(pointsToGrade(29).numeric).toBe(2);
    expect(pointsToGrade(30).numeric).toBe(3);
    expect(pointsToGrade(100).numeric).toBe(6);
  });

  it('ДИППК — Наредба № 1, чл. 13, ал. 3: оценка = точки × 0,06 (от 50 т., чл. 17, ал. 2)', () => {
    for (const p of [50, 62.5, 75, 84, 91.5, 100]) expect(pointsToGrade(p, DIPPK_SCALE).numeric).toBeCloseTo(Math.round(p * 0.06 * 100) / 100, 2);
  });

  it('ДИППК: 49 т. → 2.00, 50 т. → 3.00, 100 т. → 6.00', () => {
    expect(pointsToGrade(49, DIPPK_SCALE).numeric).toBe(2);
    expect(pointsToGrade(50, DIPPK_SCALE).numeric).toBe(3);
    expect(pointsToGrade(100, DIPPK_SCALE).numeric).toBe(6);
  });

  it('gradeToPoints дава поне исканата оценка', () => {
    for (const grade of [3, 3.5, 4.5, 5.5, 6]) {
      expect(pointsToGrade(gradeToPoints(grade)).numeric).toBeGreaterThanOrEqual(grade);
    }
  });

  it('словесните етикети следват прага 3.00 / 3.50 / 4.50 / 5.50', () => {
    expect(pointsToGrade(10).label).toBe('Слаб');
    expect(pointsToGrade(30).label).toBe('Среден');
    expect(pointsToGrade(100).label).toBe('Отличен');
    expect(pointsToGrade(30).passed).toBe(true);
    expect(pointsToGrade(29).passed).toBe(false);
  });
});

describe('examScaleForLesson и gradeBands', () => {
  it('НВО → само точки, професионални уроци → ДИППК, останалите → ДЗИ', () => {
    expect(examScaleForLesson({ id: 'bel-7-edna-balgarka', grade: '7. клас (НВО)', subject: 'Български език и литература' }).scale).toBeNull();
    expect(examScaleForLesson({ id: 'math-x', grade: '10. клас (НВО)', subject: 'Математика' }).kind).toBe('points');
    expect(examScaleForLesson({ id: 'voc-cnc', grade: '12. клас (ДЗИ / Матура)', subject: 'Биология и ЗО' }).scale).toBe(DIPPK_SCALE);
    expect(examScaleForLesson({ id: 'x', grade: '11. клас', subject: 'Професионални специалности и Инженерство' }).kind).toBe('dippk');
    expect(examScaleForLesson({ id: 'literature-botev-dzi', grade: '12. клас (ДЗИ / Матура)', subject: 'Български език и литература' }).scale).toBe(DZI_SCALE);
  });

  it('праговете съвпадат с pointsToGrade (ДЗИ — през 0,25 т., ДИППК — в цели точки)', () => {
    for (const scale of [DZI_SCALE, DIPPK_SCALE]) {
      const bands = gradeBands(scale);
      expect(bands[0].from).toBe(0);
      expect(bands[4].to).toBe(scale.maxPoints);
      for (const band of bands) {
        expect(pointsToGrade(band.from, scale).label).toBe(band.label);
        expect(pointsToGrade(band.to, scale).label).toBe(band.label);
      }
      const step = scale.bands ? 0.25 : 1;
      bands.slice(1).forEach((band, i) => expect(band.from).toBe(bands[i].to + step));
    }
  });
});
