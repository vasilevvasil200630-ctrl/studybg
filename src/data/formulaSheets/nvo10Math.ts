/**
 * Листът с формули за НВО по математика в X клас — преписан от официалния PDF на МОН
 * (sourceUrl). Формулите и таблиците са дословни; имената на редовете („Дискриминанта“,
 * „Косинусова теорема“…) и ключовите думи за търсене са на StudyBG, за да се намира формулата бързо.
 */

const t = String.raw;

/** Раздел в листа (бутоните над формулите); всеки лист задава своите разделите в `categories` */
export type FormulaCategory = string;

export interface FormulaEntry {
  id: string;
  label: string;
  /** Една или няколко формули (LaTeX без $); на тесен екран се пренасят на нов ред */
  tex: string[];
  /** Допълнителни думи за търсене (малки букви) */
  keywords?: string[];
  /** Чертеж от регистъра FIGURES (components/exam-engine/figures) */
  figureId?: string;
}

export interface FormulaTable {
  head: string[];
  rows: string[][];
}

export interface FormulaGroup {
  id: string;
  title: string;
  category: FormulaCategory;
  /** Думи, по които се намира цялата група (напр. „sin“ за таблицата) */
  keywords?: string[];
  entries: FormulaEntry[];
  tables?: FormulaTable[];
}

export interface FormulaSheet {
  id: string;
  title: string;
  sourceLabel: string;
  sourceUrl: string;
  /** Бутоните за раздели — първият е „Всички“ (id 'all') */
  categories: { id: FormulaCategory | 'all'; label: string }[];
  groups: FormulaGroup[];
}

export const FORMULA_CATEGORIES: { id: FormulaCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Всички' },
  { id: 'algebra', label: 'Алгебра' },
  { id: 'probability', label: 'Вероятности и прогресии' },
  { id: 'planimetry', label: 'Планиметрия' },
  { id: 'trigonometry', label: 'Тригонометрия' },
  { id: 'stereometry', label: 'Стереометрия' },
];

export const NVO10_MATH_FORMULAS: FormulaSheet = {
  id: 'nvo10-math',
  title: 'Формули — математика, X клас',
  sourceLabel: 'Официалният лист с формули на МОН за НВО в X клас',
  sourceUrl: 'https://www.mon.bg/nfs/2026/09/formuli-matematika-10-klas-nvo.pdf',
  categories: FORMULA_CATEGORIES,
  groups: [
    {
      id: 'quadratic-equation',
      title: 'Квадратно уравнение',
      category: 'algebra',
      entries: [
        { id: 'qe-general', label: 'Общ вид', tex: [t`ax^2+bx+c=0,\quad a\ne 0`] },
        { id: 'qe-discriminant', label: 'Дискриминанта', tex: [t`D=b^2-4ac`] },
        { id: 'qe-roots', label: 'Корени', tex: [t`x_{1,2}=\dfrac{-b\pm\sqrt{D}}{2a}\quad\text{при } D\ge 0`], keywords: ['решаване', 'формула за корените'] },
        { id: 'qe-factor', label: 'Разлагане на множители', tex: [t`ax^2+bx+c=a(x-x_1)(x-x_2)`] },
        { id: 'qe-vieta', label: 'Формули на Виет', tex: [t`x_1+x_2=-\dfrac{b}{a}`, t`x_1x_2=\dfrac{c}{a}`], keywords: ['виет', 'сбор и произведение на корените'] },
      ],
    },
    {
      id: 'quadratic-function',
      title: 'Квадратна функция',
      category: 'algebra',
      entries: [
        {
          id: 'qf-vertex',
          label: t`Графиката на $y=ax^2+bx+c,\ a\ne 0$ е парабола с връх`,
          tex: [t`\left(-\dfrac{b}{2a};\,-\dfrac{D}{4a}\right)`],
          keywords: ['парабола', 'връх', 'най-голяма стойност', 'най-малка стойност'],
        },
      ],
    },
    {
      id: 'square-roots',
      title: 'Квадратни корени',
      category: 'algebra',
      entries: [
        { id: 'sr-even-power', label: t`При $k\in\mathbb{N}$`, tex: [t`\sqrt{a^{2k}}=\left|a^k\right|`], keywords: ['модул', 'корен'] },
        { id: 'sr-product', label: t`При $a\ge 0,\ b\ge 0$`, tex: [t`\sqrt{ab}=\sqrt{a}\,\sqrt{b}`], keywords: ['корен от произведение'] },
        { id: 'sr-quotient', label: t`При $a\ge 0,\ b>0$`, tex: [t`\sqrt{\dfrac{a}{b}}=\dfrac{\sqrt{a}}{\sqrt{b}}`], keywords: ['корен от частно'] },
        { id: 'sr-into', label: t`Внасяне под корен, $a\ge 0,\ b\ge 0$`, tex: [t`a\sqrt{b}=\sqrt{a^2b}`] },
        { id: 'sr-out', label: t`Изнасяне пред корен, $a\in\mathbb{R},\ b\ge 0$`, tex: [t`\sqrt{a^2b}=|a|\sqrt{b}`], keywords: ['модул'] },
      ],
    },
    {
      id: 'combinatorics',
      title: 'Комбинаторика и вероятност',
      category: 'probability',
      entries: [
        { id: 'cb-permutations', label: t`Брой на пермутациите на $n$ елемента`, tex: [t`P_n=n(n-1)\ldots 3\cdot 2\cdot 1=n!`], keywords: ['пермутации', 'факториел', 'наредби'] },
        { id: 'cb-variations', label: t`Брой на вариациите на $n$ елемента $k$-ти клас`, tex: [t`V_n^k=n(n-1)\ldots(n-k+1)`], keywords: ['вариации'] },
        {
          id: 'cb-combinations',
          label: t`Брой на комбинациите на $n$ елемента $k$-ти клас`,
          tex: [t`C_n^k=\dfrac{V_n^k}{P_k}=\dfrac{n(n-1)\ldots(n-k+1)}{k(k-1)\ldots 3\cdot 2\cdot 1}`],
          keywords: ['комбинации', 'избор'],
        },
        {
          id: 'cb-probability',
          label: t`Вероятност за настъпване на събитието $A$`,
          tex: [t`p(A)=\dfrac{\text{брой на благоприятните случаи}}{\text{брой на възможните случаи}}`, t`0\le p(A)\le 1`],
          keywords: ['вероятност', 'шанс'],
        },
      ],
    },
    {
      id: 'progressions',
      title: 'Прогресии',
      category: 'probability',
      entries: [
        { id: 'pr-arith-n', label: 'Аритметична прогресия — общ член', tex: [t`a_n=a_1+(n-1)d`], keywords: ['разлика'] },
        { id: 'pr-arith-sum', label: 'Аритметична прогресия — сбор', tex: [t`S_n=\dfrac{a_1+a_n}{2}\cdot n=\dfrac{2a_1+(n-1)d}{2}\cdot n`] },
        { id: 'pr-geom-n', label: 'Геометрична прогресия — общ член', tex: [t`a_n=a_1\cdot q^{n-1}`], keywords: ['частно'] },
        { id: 'pr-geom-sum', label: 'Геометрична прогресия — сбор', tex: [t`S_n=a_1\cdot\dfrac{q^n-1}{q-1},\quad q\ne 1`] },
        { id: 'pr-interest', label: 'Формула за сложна лихва', tex: [t`K_n=K\cdot q^n=K\cdot\left(1+\dfrac{p}{100}\right)^n`], keywords: ['лихва', 'процент', 'банка'] },
      ],
    },
    {
      id: 'circle-angles',
      title: 'Ъгли, свързани с окръжността',
      category: 'planimetry',
      entries: [
        {
          id: 'ca-central-inscribed',
          label: 'Централен, вписан и периферен ъгъл',
          tex: [t`\sphericalangle BOC=\overset{\frown}{BC}`, t`\sphericalangle BAC=\dfrac{1}{2}\sphericalangle BOC=\dfrac{1}{2}\overset{\frown}{BC}`, t`\sphericalangle BCM=\dfrac{1}{2}\sphericalangle BOC=\dfrac{1}{2}\overset{\frown}{BC}`],
          keywords: ['централен', 'вписан', 'периферен', 'допирателна', 'дъга'],
          figureId: 'formula-circle-angles',
        },
        {
          id: 'ca-chords',
          label: 'Две пресичащи се хорди',
          tex: [t`\sphericalangle AMB=\dfrac{1}{2}\left(\overset{\frown}{AB}+\overset{\frown}{CD}\right)`, t`MA\cdot MC=MB\cdot MD`],
          keywords: ['хорди', 'пресечна точка'],
          figureId: 'formula-circle-chords',
        },
        {
          id: 'ca-secants',
          label: 'Две секущи от външна точка',
          tex: [t`\sphericalangle AMB=\dfrac{1}{2}\left(\overset{\frown}{AB}-\overset{\frown}{CD}\right)`, t`MA\cdot MD=MB\cdot MC`],
          keywords: ['секущи', 'външна точка'],
          figureId: 'formula-circle-secants',
        },
        {
          id: 'ca-tangent-secant',
          label: 'Допирателна и секуща от външна точка',
          tex: [t`\sphericalangle AMB=\dfrac{1}{2}\left(\overset{\frown}{AB}-\overset{\frown}{AC}\right)`, t`MC\cdot MB=MA^2`],
          keywords: ['допирателна', 'секуща', 'външна точка'],
          figureId: 'formula-circle-tangent',
        },
      ],
    },
    {
      id: 'triangle',
      title: 'Зависимости в триъгълник и успоредник',
      category: 'planimetry',
      entries: [
        { id: 'tr-pythagoras', label: 'Правоъгълен триъгълник — питагорова теорема', tex: [t`c^2=a^2+b^2`], keywords: ['питагор', 'хипотенуза', 'катет'] },
        { id: 'tr-right-area', label: 'Правоъгълен триъгълник — лице', tex: [t`S=\dfrac{1}{2}ab=\dfrac{1}{2}ch_c`] },
        { id: 'tr-right-legs', label: 'Правоъгълен триъгълник — катети и проекции', tex: [t`a^2=a_1c`, t`b^2=b_1c`, t`h_c^{\,2}=a_1b_1`], keywords: ['проекции', 'височина към хипотенузата', 'евклид'] },
        { id: 'tr-right-incircle', label: 'Правоъгълен триъгълник — радиус на вписаната окръжност', tex: [t`r=\dfrac{a+b-c}{2}`], keywords: ['вписана окръжност'] },
        {
          id: 'tr-right-trig',
          label: 'Правоъгълен триъгълник — тригонометрични функции',
          tex: [t`\sin\alpha=\dfrac{a}{c}`, t`\cos\alpha=\dfrac{b}{c}`, t`\operatorname{tg}\alpha=\dfrac{a}{b}`, t`\operatorname{cotg}\alpha=\dfrac{b}{a}`],
          keywords: ['синус', 'косинус', 'тангенс', 'котангенс'],
        },
        {
          id: 'tr-cosine',
          label: 'Произволен триъгълник — косинусова теорема',
          tex: [t`a^2=b^2+c^2-2bc\cos\alpha`, t`b^2=a^2+c^2-2ac\cos\beta`, t`c^2=a^2+b^2-2ab\cos\gamma`],
          keywords: ['косинусова', 'косинус'],
        },
        { id: 'tr-sine', label: 'Произволен триъгълник — синусова теорема', tex: [t`\dfrac{a}{\sin\alpha}=\dfrac{b}{\sin\beta}=\dfrac{c}{\sin\gamma}=2R`], keywords: ['синусова', 'синус', 'описана окръжност'] },
        {
          id: 'tr-median',
          label: 'Формула за медиана',
          tex: [t`m_a^{\,2}=\dfrac{1}{4}\left(2b^2+2c^2-a^2\right)`, t`m_b^{\,2}=\dfrac{1}{4}\left(2a^2+2c^2-b^2\right)`, t`m_c^{\,2}=\dfrac{1}{4}\left(2a^2+2b^2-c^2\right)`],
          keywords: ['медиана'],
        },
        { id: 'tr-bisector', label: 'Формула за ъглополовяща', tex: [t`l_c^{\,2}=ab-mn`], keywords: ['ъглополовяща'] },
        { id: 'tr-bisector-property', label: 'Свойство на ъглополовящата', tex: [t`\dfrac{a}{b}=\dfrac{n}{m}`], keywords: ['ъглополовяща', 'отношение'] },
        { id: 'tr-parallelogram', label: 'Формула за диагоналите на успоредник', tex: [t`d_1^{\,2}+d_2^{\,2}=2a^2+2b^2`], keywords: ['успоредник', 'диагонали'] },
      ],
    },
    {
      id: 'areas',
      title: 'Формули за лице',
      category: 'planimetry',
      entries: [
        {
          id: 'ar-triangle',
          label: 'Триъгълник',
          tex: [t`S=\dfrac{1}{2}ch_c`, t`S=\dfrac{1}{2}ab\sin\gamma`, t`S=pr`, t`S=\dfrac{abc}{4R}`],
          keywords: ['лице на триъгълник', 'вписана', 'описана'],
        },
        { id: 'ar-heron', label: 'Триъгълник — Херонова формула', tex: [t`S=\sqrt{p(p-a)(p-b)(p-c)}`], keywords: ['херон', 'полупериметър'] },
        { id: 'ar-parallelogram', label: 'Успоредник', tex: [t`S=ah_a`, t`S=ab\sin\alpha`] },
        { id: 'ar-trapezoid', label: 'Трапец', tex: [t`S=\dfrac{a+b}{2}\,h`], keywords: ['основи'] },
        { id: 'ar-quadrilateral', label: 'Четириъгълник', tex: [t`S=\dfrac{1}{2}d_1d_2\sin\varphi`], keywords: ['диагонали'] },
        { id: 'ar-circumscribed', label: 'Описан многоъгълник', tex: [t`S=pr`], keywords: ['вписана окръжност'] },
      ],
    },
    {
      id: 'trigonometry',
      title: 'Тригонометрични функции',
      category: 'trigonometry',
      keywords: ['синус', 'косинус', 'тангенс', 'котангенс', 'sin', 'cos', 'tg', 'cotg', 'таблица', 'стойности', 'привеждане'],
      entries: [],
      tables: [
        {
          head: [t`$\alpha$`, t`$0^\circ$`, t`$30^\circ$`, t`$45^\circ$`, t`$60^\circ$`, t`$90^\circ$`, t`$120^\circ$`, t`$135^\circ$`, t`$150^\circ$`, t`$180^\circ$`],
          rows: [
            [t`$\sin\alpha$`, '$0$', t`$\dfrac{1}{2}$`, t`$\dfrac{\sqrt{2}}{2}$`, t`$\dfrac{\sqrt{3}}{2}$`, '$1$', t`$\dfrac{\sqrt{3}}{2}$`, t`$\dfrac{\sqrt{2}}{2}$`, t`$\dfrac{1}{2}$`, '$0$'],
            [t`$\cos\alpha$`, '$1$', t`$\dfrac{\sqrt{3}}{2}$`, t`$\dfrac{\sqrt{2}}{2}$`, t`$\dfrac{1}{2}$`, '$0$', t`$-\dfrac{1}{2}$`, t`$-\dfrac{\sqrt{2}}{2}$`, t`$-\dfrac{\sqrt{3}}{2}$`, '$-1$'],
            [t`$\operatorname{tg}\alpha$`, '$0$', t`$\dfrac{\sqrt{3}}{3}$`, '$1$', t`$\sqrt{3}$`, '–', t`$-\sqrt{3}$`, '$-1$', t`$-\dfrac{\sqrt{3}}{3}$`, '$0$'],
            [t`$\operatorname{cotg}\alpha$`, '–', t`$\sqrt{3}$`, '$1$', t`$\dfrac{\sqrt{3}}{3}$`, '$0$', t`$-\dfrac{\sqrt{3}}{3}$`, '$-1$', t`$-\sqrt{3}$`, '–'],
          ],
        },
        {
          head: ['', t`$-\alpha$`, t`$90^\circ-\alpha$`, t`$90^\circ+\alpha$`, t`$180^\circ-\alpha$`],
          rows: [
            ['sin', t`$-\sin\alpha$`, t`$\cos\alpha$`, t`$\cos\alpha$`, t`$\sin\alpha$`],
            ['cos', t`$\cos\alpha$`, t`$\sin\alpha$`, t`$-\sin\alpha$`, t`$-\cos\alpha$`],
            ['tg', t`$-\operatorname{tg}\alpha$`, t`$\operatorname{cotg}\alpha$`, t`$-\operatorname{cotg}\alpha$`, t`$-\operatorname{tg}\alpha$`],
            ['cotg', t`$-\operatorname{cotg}\alpha$`, t`$\operatorname{tg}\alpha$`, t`$-\operatorname{tg}\alpha$`, t`$-\operatorname{cotg}\alpha$`],
          ],
        },
      ],
    },
    {
      id: 'solids',
      title: 'Повърхнина и обем',
      category: 'stereometry',
      entries: [
        { id: 'so-prism', label: 'Призма', tex: [t`V=Bh`, t`S_1=S+2B`], keywords: ['обем', 'пълна повърхнина'] },
        { id: 'so-right-prism', label: 'Права призма', tex: [t`S=Ph`], keywords: ['околна повърхнина'] },
        { id: 'so-pyramid', label: 'Пирамида', tex: [t`V=\dfrac{1}{3}Bh`, t`S_1=S+B`], keywords: ['обем'] },
        { id: 'so-cylinder', label: 'Прав кръгов цилиндър', tex: [t`B=\pi r^2`, t`S=2\pi rh`, t`S_1=S+2B=2\pi r(h+r)`, t`V=Bh=\pi r^2h`], keywords: ['цилиндър', 'обем'] },
        { id: 'so-cone', label: 'Прав кръгов конус', tex: [t`B=\pi r^2`, t`S=\pi rl`, t`S_1=S+B=\pi r(l+r)`, t`V=\dfrac{1}{3}Bh=\dfrac{1}{3}\pi r^2h`], keywords: ['конус', 'образуваща', 'обем'] },
        { id: 'so-sphere', label: 'Сфера и кълбо', tex: [t`S_{\text{сфера}}=4\pi r^2`, t`V_{\text{кълбо}}=\dfrac{4}{3}\pi r^3`], keywords: ['сфера', 'кълбо', 'обем'] },
      ],
    },
  ],
};


const norm = (s: string) => s.toLocaleLowerCase('bg').replace(/\s+/g, ' ').trim();

/**
 * Филтрира листа по категория и търсене. Търси в заглавието на групата, името на реда
 * и ключовите думи; при съвпадение със заглавието на групата показва цялата група.
 */
export function filterFormulaSheet(sheet: FormulaSheet, query: string, category: FormulaCategory | 'all'): FormulaGroup[] {
  const q = norm(query);
  return sheet.groups
    .filter((g) => category === 'all' || g.category === category)
    .map((g) => {
      if (!q || [g.title, ...(g.keywords ?? [])].some((s) => norm(s).includes(q))) return g;
      const entries = g.entries.filter((e) => [e.label, ...(e.keywords ?? [])].some((s) => norm(s).includes(q)));
      return { ...g, entries, tables: undefined };
    })
    .filter((g) => g.entries.length > 0 || (g.tables?.length ?? 0) > 0);
}
