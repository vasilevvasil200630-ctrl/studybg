/**
 * Единна скала за превръщане на точки в шестобална оценка.
 * Линейна и монотонна: passPoints → Среден 3.00, maxPoints → Отличен 6.00,
 * под прага → Слаб 2.00.
 *
 * ⚠ Параметрите трябва да се сверят с актуалната заповед на МОН за съответната сесия.
 */
export interface GradeScale {
  passPoints: number;
  maxPoints: number;
}

export const DZI_SCALE: GradeScale = { passPoints: 30, maxPoints: 100 };
export const DIPPK_SCALE: GradeScale = { passPoints: 50, maxPoints: 100 };

export type VerbalGrade = 'Слаб' | 'Среден' | 'Добър' | 'Много добър' | 'Отличен';

export interface GradeResult {
  numeric: number;
  label: VerbalGrade;
  passed: boolean;
}

export const verbalGrade = (grade: number): VerbalGrade =>
  grade >= 5.5 ? 'Отличен' : grade >= 4.5 ? 'Много добър' : grade >= 3.5 ? 'Добър' : grade >= 3 ? 'Среден' : 'Слаб';

export function pointsToGrade(points: number, { passPoints, maxPoints }: GradeScale = DZI_SCALE): GradeResult {
  const p = Math.min(maxPoints, Math.max(0, Number.isFinite(points) ? points : 0));
  if (p < passPoints) {
    return { numeric: 2, label: 'Слаб', passed: false };
  }
  const raw = 3 + (3 * (p - passPoints)) / (maxPoints - passPoints);
  const numeric = Math.round(Math.min(6, raw) * 100) / 100;
  return { numeric, label: verbalGrade(numeric), passed: true };
}

/** Обратна функция: минималните точки, нужни за дадена оценка (3.00–6.00). */
export function gradeToPoints(grade: number, { passPoints, maxPoints }: GradeScale = DZI_SCALE): number {
  const g = Math.min(6, Math.max(3, grade));
  const required = passPoints + ((g - 3) * (maxPoints - passPoints)) / 3;
  return Math.ceil(required * 10) / 10;
}

export const formatGrade = (result: GradeResult): string => `${result.label} ${result.numeric.toFixed(2)}`;
