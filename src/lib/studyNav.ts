import {
  BookOpen,
  Layers,
  ListChecks,
  Mic,
  CheckSquare,
  Clock,
  AlertCircle,
  Printer,
  Calculator,
  Calendar,
  PenTool,
  Feather,
  BookMarked,
  Sigma,
  FlaskConical,
  MapPin,
  Globe,
  Landmark,
  Zap,
  Scale,
  Library,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import type { AppNavTab } from '../components/Navbar';

/**
 * Една дефиниция за навигацията на Учебната академия.
 * Страничното меню, горната лента и заглавието на страницата четат оттук,
 * затова имената на разделите винаги съвпадат.
 */

export type StudyNavItem = {
  tab: AppNavTab;
  label: string;
  icon: LucideIcon;
};

export type StudyNavGroup = {
  title: string;
  items: StudyNavItem[];
};

/** Инструментите, които работят върху избрания урок — менюто ги показва под картата на урока */
export const LESSON_TABS: ReadonlySet<AppNavTab> = new Set<AppNavTab>(['summary', 'flashcards', 'quiz', 'audit']);

export const STUDY_NAV_GROUPS: StudyNavGroup[] = [
  {
    title: 'Избраният урок',
    items: [
      { tab: 'summary', label: 'Конспект', icon: BookOpen },
      { tab: 'flashcards', label: 'Флашкарти', icon: Layers },
      { tab: 'quiz', label: 'Тест по урока', icon: ListChecks },
      { tab: 'oralexam', label: 'Устно изпитване', icon: Mic },
      { tab: 'audit', label: 'Проверка на тетрадка', icon: CheckSquare },
    ],
  },
  {
    title: 'Изпити',
    items: [
      { tab: 'simulator', label: 'Изпитен симулатор', icon: Clock },
      { tab: 'planner', label: 'Моят план', icon: Calendar },
      { tab: 'errorbank', label: 'Банка с грешки', icon: AlertCircle },
      { tab: 'calculator', label: 'Оценка и бал', icon: Calculator },
      { tab: 'generator', label: 'Контролни за печат', icon: Printer },
    ],
  },
  {
    title: 'Лаборатории',
    items: [
      { tab: 'grammar', label: 'Граматика и правопис', icon: PenTool },
      { tab: 'moduletwo', label: 'Тропи и резюме', icon: Feather },
      { tab: 'literature', label: 'Литература', icon: BookMarked },
      { tab: 'mathlab', label: 'Математика', icon: Sigma },
      { tab: 'sciencelab', label: 'Природни науки', icon: FlaskConical },
      { tab: 'atlas', label: 'История и география', icon: MapPin },
      { tab: 'english', label: 'Английски език', icon: Globe },
      { tab: 'civics', label: 'Гражданско образование', icon: Landmark },
      { tab: 'cases', label: 'Исторически казуси', icon: Scale },
      { tab: 'blitz', label: 'Блиц за 60 секунди', icon: Zap },
    ],
  },
  {
    title: 'Справочници',
    items: [
      { tab: 'catalog', label: 'Учебна програма', icon: Library },
      { tab: 'specialties', label: 'Училища и специалности', icon: GraduationCap },
    ],
  },
];

/** Четирите най-чести места — долната лента на телефона */
export const MOBILE_PRIMARY_TABS: StudyNavItem[] = [
  { tab: 'summary', label: 'Урок', icon: BookOpen },
  { tab: 'quiz', label: 'Тест', icon: ListChecks },
  { tab: 'simulator', label: 'Симулатор', icon: Clock },
  { tab: 'catalog', label: 'Програма', icon: Library },
];

type PageMeta = { title: string; description: string };

/** Заглавие и едно изречение за всеки раздел, който не е урок */
export function getStudyPageMeta(tab: AppNavTab, totalLessons: number): PageMeta | null {
  switch (tab) {
    case 'specialties':
      return { title: 'Училища и специалности', description: 'Предметите и профилите по видове гимназии и техникуми, от 8. до 12. клас.' };
    case 'planner':
      return { title: 'Моят план', description: 'Колко време остава до изпита, седмичен график и готовност по теми.' };
    case 'grammar':
      return { title: 'Граматика и правопис', description: 'Задачи от Модул 1 на ДЗИ и НВО 10 по нормите на БАН.' };
    case 'moduletwo':
      return { title: 'Тропи, пароними и резюме', description: 'Модул 2 на ДЗИ и НВО 10: изразни средства, лексика и сбит преразказ.' };
    case 'literature':
      return { title: 'Литература', description: 'Задължителните автори и творби и помощ за теза към 41. задача (есе и ЛИС).' };
    case 'mathlab':
      return { title: 'Математика', description: 'Задачи 16–17 от НВО 10 и 26–28 от ДЗИ, решени стъпка по стъпка, с чертежи.' };
    case 'sciencelab':
      return { title: 'Природни науки', description: 'Биология, химия и физика: ДНК и белтъци, йонни реакции, закон на Ом.' };
    case 'oralexam':
      return { title: 'Устно изпитване', description: 'Отговаряш на глас или писмено по избрания урок, а ключовите понятия се отбелязват.' };
    case 'atlas':
      return { title: 'История и география', description: 'Мирните договори от 681 до 1947 г. и шестте района за планиране (NUTS 2).' };
    case 'english':
      return { title: 'Английски език', description: 'ДЗИ и НВО: Use of English и Writing на ниво B1.1 и B2.' };
    case 'civics':
      return { title: 'Гражданско образование', description: 'Конституцията, разделението на властите и Европейският съюз.' };
    case 'blitz':
      return { title: 'Блиц за 60 секунди', description: 'Бързи въпроси срещу часовника — сам или отбор срещу отбор в час.' };
    case 'cases':
      return { title: 'Исторически казуси', description: 'Задачи с архивни извори за ДЗИ по история, 11.–12. клас.' };
    case 'calculator':
      return { title: 'Оценка и бал', description: 'От точки към оценка по скалата на МОН за ДЗИ и състезателен бал.' };
    case 'errorbank':
      return { title: 'Банка с грешки', description: 'Въпросите, на които си сгрешил, събрани за повторение.' };
    case 'catalog':
      return { title: 'Учебна програма', description: `Всички ${totalLessons} урока, подредени по клас, предмет и изпит.` };
    case 'simulator':
      return { title: 'Изпитен симулатор', description: 'Изпит по текущия урок или пълен вариант на МОН — с таймер, ключ и точки.' };
    case 'generator':
      return { title: 'Контролни за печат', description: 'Варианти А и Б по избран урок, готови за принтиране.' };
    default:
      return null;
  }
}

/** Етикетът от менюто за даден раздел (за горната лента) */
export function getStudyNavLabel(tab: AppNavTab): string | null {
  for (const group of STUDY_NAV_GROUPS) {
    const hit = group.items.find((i) => i.tab === tab);
    if (hit) return hit.label;
  }
  return null;
}
