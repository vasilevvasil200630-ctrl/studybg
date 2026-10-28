import type { LessonSubject } from '../../types';
import type { MonSubjectId } from './types';

export interface MonSubjectInfo {
  name: string;
  /** Предметът в уроците на сайта, с който се сверява покритието */
  lessonSubject?: LessonSubject;
}

export const MON_SUBJECTS: Record<MonSubjectId, MonSubjectInfo> = {
  bel: { name: 'Български език', lessonSubject: 'Български език и литература' },
  lit: { name: 'Литература', lessonSubject: 'Български език и литература' },
  math: { name: 'Математика', lessonSubject: 'Математика' },
  informatika: { name: 'Информатика', lessonSubject: 'Информатика, ИТ и Програмиране' },
  it: { name: 'Информационни технологии', lessonSubject: 'Информатика, ИТ и Програмиране' },
  physics: { name: 'Физика и астрономия', lessonSubject: 'Физика и астрономия' },
  biology: { name: 'Биология и здравно образование', lessonSubject: 'Биология и ЗО' },
  chemistry: { name: 'Химия и опазване на околната среда', lessonSubject: 'Химия и ООС' },
  history: { name: 'История и цивилизации', lessonSubject: 'История и цивилизации' },
  geography: { name: 'География и икономика', lessonSubject: 'География и икономика' },
  philosophy: { name: 'Философия', lessonSubject: 'Гражданско образование и философия' },
  civics: { name: 'Гражданско образование', lessonSubject: 'Гражданско образование и философия' },
  tech: { name: 'Технологии и предприемачество', lessonSubject: 'Икономика, Бизнес и Предприемачество' },
  entrepreneurship: { name: 'Предприемачество', lessonSubject: 'Икономика, Бизнес и Предприемачество' },
  arts: { name: 'Изобразително изкуство', lessonSubject: 'Изкуства и музика' },
  music: { name: 'Музика', lessonSubject: 'Изкуства и музика' },
  pe: { name: 'Физическо възпитание и спорт' },
  english: { name: 'Английски език', lessonSubject: 'Английски език' },
  german: { name: 'Немски език', lessonSubject: 'Чужди езици (Немски, Френски, Испански)' },
};
