import type { ExamPaper } from '../lib/examPaperScoring';

/**
 * Форматът на НВО в X клас за учебната 2026/2027 г. — от модела на МОН (sourceUrl).
 * Само факти от модела; без прогнози какви задачи ще има.
 */
export const NVO10_FORMAT_2027 = {
  title: 'НВО 10 през 2027 г.: математика с интегриране на други предмети',
  sourceUrl: 'https://www.mon.bg/nfs/2026/09/nvo_x_math_model_26-27-0809-21092026-1.pdf',
  facts: [
    { label: 'Задачи', value: '16' },
    { label: 'Време', value: '120 мин' },
    { label: 'Точки', value: '100', hint: '58 математика + 42 другите предмети' },
    { label: 'Резултат', value: 'в точки', hint: 'не се превръща в оценка' },
  ],
  distribution: [
    { subject: 'Математика', choice: 8, short: 0, open: 2 },
    { subject: 'Биология и здравно образование', choice: 0, short: 2, open: 0 },
    { subject: 'Химия и опазване на околната среда', choice: 0, short: 2, open: 0 },
    { subject: 'Физика и астрономия', choice: 0, short: 1, open: 0 },
    { subject: 'География и икономика', choice: 0, short: 1, open: 0 },
  ],
  notes: [
    'За задачите по математика може да ползваш лист с формули.',
    'Физичните величини се изчисляват, без да е нужно да знаеш формулите наизуст.',
  ],
} as const;

export type FormatTone = 'current' | 'legacy';

/**
 * Етикет за формата на вариант по НВО 10 спрямо изпита през 2027 г.
 * Официалните варианти до 2025 г. са само по математика (90 мин); от 2026 г. изпитът
 * включва и други предмети (120 мин).
 */
export function nvo10FormatTag(paper: ExamPaper): { label: string; tone: FormatTone } | null {
  // Етикетите са за формата на изпита по математика (от 2026 г. — с интегрирани предмети)
  if (paper.exam !== 'НВО 10' || paper.subject !== 'Математика' || paper.kind === 'sample' || paper.kind === 'topic') return null;
  if (paper.kind === 'practice') return { label: `Тренировъчен: ${paper.durationMinutes} мин — не следва формата на МОН`, tone: 'legacy' };
  if ((paper.year ?? 0) >= 2026) return { label: 'С интегрирани предмети — най-близо до изпита през 2027', tone: 'current' };
  return { label: `Стар формат: само математика, ${paper.durationMinutes} мин`, tone: 'legacy' };
}
