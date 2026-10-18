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

export type ExamScaleKind = 'dzi' | 'dippk' | 'points';

export interface LessonExamScale {
  kind: ExamScaleKind;
  /** null = резултатът е само в точки (НВО няма официално превръщане в шестобална оценка) */
  scale: GradeScale | null;
  label: string;
}

/**
 * Коя скала важи за симулация по даден урок:
 * НВО (7. и 10. клас) — само точки; професионални уроци — ДИППК; всички останали — ДЗИ.
 */
export function examScaleForLesson(lesson: { id: string; grade: string; subject: string }): LessonExamScale {
  if (lesson.grade.includes('НВО')) {
    return { kind: 'points', scale: null, label: 'НВО — резултат само в точки' };
  }
  if (lesson.id.startsWith('voc-') || lesson.subject === 'Професионални специалности и Инженерство') {
    return { kind: 'dippk', scale: DIPPK_SCALE, label: 'ДИППК (трета СПК)' };
  }
  return { kind: 'dzi', scale: DZI_SCALE, label: 'ДЗИ' };
}

/** Диапазони в цели точки за всяка словесна оценка — за таблицата на праговете. */
export function gradeBands(scale: GradeScale): { label: VerbalGrade; from: number; to: number }[] {
  const at = (g: number) => gradeToPoints(g, scale);
  return [
    { label: 'Слаб', from: 0, to: scale.passPoints - 1 },
    { label: 'Среден', from: scale.passPoints, to: Math.ceil(at(3.5)) - 1 },
    { label: 'Добър', from: Math.ceil(at(3.5)), to: Math.ceil(at(4.5)) - 1 },
    { label: 'Много добър', from: Math.ceil(at(4.5)), to: Math.ceil(at(5.5)) - 1 },
    { label: 'Отличен', from: Math.ceil(at(5.5)), to: scale.maxPoints }
  ];
}
