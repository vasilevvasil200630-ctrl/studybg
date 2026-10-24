/**
 * Превръщане на точки в шестобална оценка.
 *
 * ДЗИ — единната скала на МОН от учебната 2022/23 г. (съобщение на МОН от 06.06.2022 г. и
 * разяснителната презентация за ДЗИ 2023, DZI_SCALE_SOURCES): под 30 т. — Слаб 2; 30 т. — Среден 3,00;
 * всеки 0,25 т. — следваща стотна, с граници на оценките 40,75 т. (Добър 3,50), 62,5 т. (Много добър 4,50),
 * 84 т. (Отличен 5,50) и 95 т. (Отличен 6,00). Оценката в интервала е изчислена по тази стъпка и е
 * ограничена в границите на интервала, затова не излиза от словесната оценка.
 *
 * Скалите без таблица (ДИППК) са линейни: passPoints → 3,00, maxPoints → 6,00.
 */

export interface GradeBand {
  /** Точки от … до … включително (кратни на 0,25) */
  from: number;
  to: number;
  /** Оценките в интервала */
  min: number;
  max: number;
}

export interface GradeScale {
  passPoints: number;
  maxPoints: number;
  /** Таблицата на МОН за скалите с официални интервали (ДЗИ) */
  bands?: GradeBand[];
  /** От колко точки оценката е 6,00 */
  fullPoints?: number;
}

/** Откъде е таблицата за ДЗИ */
export const DZI_SCALE_SOURCES = [
  { title: 'МОН обяви новата скала за оценяване на държавните зрелостни изпити (БНТ, 06.06.2022)', url: 'https://bntnews.bg/news/mon-obyavi-novata-skala-za-ocenyavane-na-darzhavnite-zrelostni-izpiti-1197290news.html' },
  { title: 'Разяснителна презентация „Държавни зрелостни изпити 2023“ — скала за оценяване', url: 'https://128sou-sofia.info/wp-content/uploads/2022/12/prezentaciya-dzi-2023.pdf' },
] as const;

export const DZI_SCALE: GradeScale = {
  passPoints: 30,
  maxPoints: 100,
  fullPoints: 95,
  bands: [
    { from: 30, to: 40.5, min: 3, max: 3.49 },
    { from: 40.75, to: 62.25, min: 3.5, max: 4.49 },
    { from: 62.5, to: 83.75, min: 4.5, max: 5.49 },
    { from: 84, to: 94.75, min: 5.5, max: 5.99 },
    { from: 95, to: 100, min: 6, max: 6 },
  ],
};
export const DIPPK_SCALE: GradeScale = { passPoints: 50, maxPoints: 100 };

export type VerbalGrade = 'Слаб' | 'Среден' | 'Добър' | 'Много добър' | 'Отличен';

export interface GradeResult {
  numeric: number;
  label: VerbalGrade;
  passed: boolean;
}

export const verbalGrade = (grade: number): VerbalGrade =>
  grade >= 5.5 ? 'Отличен' : grade >= 4.5 ? 'Много добър' : grade >= 3.5 ? 'Добър' : grade >= 3 ? 'Среден' : 'Слаб';

const round2 = (x: number) => Math.round(x * 100) / 100;

export function pointsToGrade(points: number, scale: GradeScale = DZI_SCALE): GradeResult {
  const { passPoints, maxPoints, bands, fullPoints } = scale;
  const p = Math.min(maxPoints, Math.max(0, Number.isFinite(points) ? points : 0));
  if (p < passPoints) {
    return { numeric: 2, label: 'Слаб', passed: false };
  }
  if (bands && fullPoints) {
    // Точките се отчитат през 0,25 т., както в таблицата
    const q = Math.floor(p * 4) / 4;
    const band = bands.find((b) => q >= b.from && q <= b.to) ?? bands[bands.length - 1];
    const raw = 3 + (3 * (q - passPoints)) / (fullPoints - passPoints);
    const numeric = round2(Math.min(band.max, Math.max(band.min, raw)));
    return { numeric, label: verbalGrade(numeric), passed: true };
  }
  const raw = 3 + (3 * (p - passPoints)) / (maxPoints - passPoints);
  const numeric = round2(Math.min(6, raw));
  return { numeric, label: verbalGrade(numeric), passed: true };
}

/** Обратна функция: минималните точки, нужни за дадена оценка (3.00–6.00). */
export function gradeToPoints(grade: number, scale: GradeScale = DZI_SCALE): number {
  const g = Math.min(6, Math.max(3, grade));
  if (scale.bands) {
    // Най-малкият брой точки (през 0,25), който дава поне тази оценка
    for (let q = scale.passPoints; q <= scale.maxPoints; q += 0.25) {
      if (pointsToGrade(q, scale).numeric >= g - 1e-9) return q;
    }
    return scale.maxPoints;
  }
  const required = scale.passPoints + ((g - 3) * (scale.maxPoints - scale.passPoints)) / 3;
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

/** Диапазони в точки за всяка словесна оценка — за таблицата на праговете. */
export function gradeBands(scale: GradeScale): { label: VerbalGrade; from: number; to: number }[] {
  if (scale.bands) {
    const b = scale.bands;
    return [
      { label: 'Слаб', from: 0, to: scale.passPoints - 0.25 },
      { label: 'Среден', from: b[0].from, to: b[0].to },
      { label: 'Добър', from: b[1].from, to: b[1].to },
      { label: 'Много добър', from: b[2].from, to: b[2].to },
      { label: 'Отличен', from: b[3].from, to: scale.maxPoints },
    ];
  }
  const at = (g: number) => gradeToPoints(g, scale);
  return [
    { label: 'Слаб', from: 0, to: scale.passPoints - 1 },
    { label: 'Среден', from: scale.passPoints, to: Math.ceil(at(3.5)) - 1 },
    { label: 'Добър', from: Math.ceil(at(3.5)), to: Math.ceil(at(4.5)) - 1 },
    { label: 'Много добър', from: Math.ceil(at(4.5)), to: Math.ceil(at(5.5)) - 1 },
    { label: 'Отличен', from: Math.ceil(at(5.5)), to: scale.maxPoints }
  ];
}
