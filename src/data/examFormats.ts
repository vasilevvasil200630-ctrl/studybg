import type { ExamPaper } from '../lib/examPaperScoring';

/**
 * Форматът на НВО в X клас за учебната 2026/2027 г. — от моделите на МОН (sourceUrl) и от
 * Заповед № РД09-3342/31.08.2026 г. за предметите, които се интегрират. Само факти от тях;
 * без прогнози какви задачи ще има.
 */

/** Заповедта за предметите, които се интегрират в двата изпита през 2027 г. */
export const NVO10_ORDER_2027_URL = 'https://www.mon.bg/nfs/2026/08/zapoved-format-nvo10-2027-31082026.pdf';

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

/**
 * БЕЛ през 2027 г.: моделът дава броя задачи по вид, а заповедта — колко са по БЕЛ и колко по
 * другите предмети. Как се разпределят точките между предметите, МОН не е обявил.
 */
export const NVO10_BEL_FORMAT_2027 = {
  title: 'НВО 10 през 2027 г.: БЕЛ с интегриране на история и философия',
  sourceUrl: 'https://www.mon.bg/nfs/2026/09/10.-klas-bel-model-nvo-2027.pdf',
  facts: [
    { label: 'Задачи', value: '22' },
    { label: 'Време', value: '120 мин' },
    { label: 'Точки', value: '100', hint: 'по предмети — не е обявено' },
    { label: 'Резултат', value: 'в точки', hint: 'не се превръща в оценка' },
  ],
  bySubject: [
    { subject: 'Български език и литература', tasks: 18, hint: 'с избираем и със свободен отговор' },
    { subject: 'История и цивилизации и философия', tasks: 4, hint: 'с избираем и с кратък свободен отговор' },
  ],
  byType: [
    { type: 'С избираем отговор', tasks: 13 },
    { type: 'С кратък свободен отговор', tasks: 6 },
    { type: 'Редактиране', tasks: 1 },
    { type: 'Теза (разширен свободен отговор)', tasks: 1 },
    { type: 'Създаване на текст — резюме, заявление или CV', tasks: 1 },
  ],
  notes: [
    'Новото спрямо 2026 г.: задачи по история и цивилизации и по философия, 120 минути вместо 90 и текст за създаване, който може да е и заявление или CV.',
    'Литературните творби, които се изпитват, са изброени в модела на МОН.',
  ],
} as const;

export type FormatTone = 'current' | 'legacy';

/**
 * Етикет за формата на вариант по НВО 10 спрямо изпита през 2027 г.
 * Математика: вариантите до 2025 г. са само по математика (90 мин); от 2026 г. изпитът включва
 * и други предмети (120 мин). БЕЛ: всички варианти досега са без история и философия.
 */
export function nvo10FormatTag(paper: ExamPaper): { label: string; tone: FormatTone } | null {
  if (paper.exam !== 'НВО 10' || paper.kind === 'sample' || paper.kind === 'topic' || paper.kind === 'review') return null;
  if (paper.subject === 'Български език и литература') {
    if (paper.kind === 'practice') return { label: `Тренировъчен: ${paper.durationMinutes} мин — не следва формата на МОН`, tone: 'legacy' };
    return { label: `Без история и философия, ${paper.durationMinutes} мин — частта по БЕЛ`, tone: 'legacy' };
  }
  if (paper.subject !== 'Математика') return null;
  if (paper.kind === 'practice') return { label: `Тренировъчен: ${paper.durationMinutes} мин — не следва формата на МОН`, tone: 'legacy' };
  if ((paper.year ?? 0) >= 2026) return { label: 'С интегрирани предмети — най-близо до изпита през 2027', tone: 'current' };
  return { label: `Стар формат: само математика, ${paper.durationMinutes} мин`, tone: 'legacy' };
}
