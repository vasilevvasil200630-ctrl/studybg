import { describe, expect, it } from 'vitest';
import { DIPPK_SCALE, DZI_SCALE, gradeToPoints, pointsToGrade } from '../src/lib/monGradeScale';

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
