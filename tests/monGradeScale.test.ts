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

  it('ДЗИ: 29 т. → 2.00, 30 т. → 3.00, 100 т. → 6.00', () => {
    expect(pointsToGrade(29).numeric).toBe(2);
    expect(pointsToGrade(30).numeric).toBe(3);
    expect(pointsToGrade(100).numeric).toBe(6);
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

  it('праговете в цели точки съвпадат с pointsToGrade', () => {
    for (const scale of [DZI_SCALE, DIPPK_SCALE]) {
      const bands = gradeBands(scale);
      expect(bands[0].from).toBe(0);
      expect(bands[4].to).toBe(scale.maxPoints);
      for (const band of bands) {
        expect(pointsToGrade(band.from, scale).label).toBe(band.label);
        expect(pointsToGrade(band.to, scale).label).toBe(band.label);
      }
      bands.slice(1).forEach((band, i) => expect(band.from).toBe(bands[i].to + 1));
    }
  });
});
