import { NVO10_MATH_FORMULAS, type FormulaGroup, type FormulaSheet } from './nvo10Math';
import { NORMAL_TABLE_HEAD, NORMAL_TABLE_ROWS } from './normalTable';

/**
 * Справочните материали на МОН за ДЗИ по математика — преписани от официалните PDF-и (sourceUrl).
 * Формулите и таблиците са дословни; имената на редовете и думите за търсене са на StudyBG.
 *
 * - DZI_MATH_FORMULAS — профилирана подготовка (матурите от 2022 г. насам);
 * - DZI_MATH_2021_FORMULAS — листът към матурата от 21.05.2021 г. (стария формат); той е част
 *   от PDF-а на самия изпит и повтаря голяма част от листа за НВО 10, затова групите оттам се преизползват.
 */

const t = String.raw;

const nvoGroup = (id: string, patch: Partial<FormulaGroup> = {}): FormulaGroup => {
  const g = NVO10_MATH_FORMULAS.groups.find((x) => x.id === id);
  if (!g) throw new Error(`Няма група ${id} в листа за НВО 10`);
  return { ...g, ...patch };
};

const TRIG_IDENTITIES = [
  { id: 'tr-sum', label: 'Синус и косинус на сбор и разлика', tex: [t`\sin(\alpha\pm\beta)=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta`, t`\cos(\alpha\pm\beta)=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta`], keywords: ['събиране', 'сбор', 'разлика'] },
  { id: 'tr-double', label: 'Двоен ъгъл', tex: [t`\sin 2\alpha=2\sin\alpha\cos\alpha`, t`\cos 2\alpha=\cos^2\alpha-\sin^2\alpha=2\cos^2\alpha-1=1-2\sin^2\alpha`], keywords: ['двоен'] },
  {
    id: 'tr-sum-product',
    label: 'Сбор и разлика на синуси и косинуси',
    tex: [
      t`\sin\alpha+\sin\beta=2\sin\dfrac{\alpha+\beta}{2}\cos\dfrac{\alpha-\beta}{2}`,
      t`\sin\alpha-\sin\beta=2\sin\dfrac{\alpha-\beta}{2}\cos\dfrac{\alpha+\beta}{2}`,
      t`\cos\alpha+\cos\beta=2\cos\dfrac{\alpha+\beta}{2}\cos\dfrac{\alpha-\beta}{2}`,
      t`\cos\alpha-\cos\beta=-2\sin\dfrac{\alpha+\beta}{2}\sin\dfrac{\alpha-\beta}{2}`,
    ],
    keywords: ['произведение'],
  },
];

export const DZI_MATH_FORMULAS: FormulaSheet = {
  id: 'dzi-math',
  title: 'Справочни материали — ДЗИ по математика',
  sourceLabel: 'Официалните справочни материали на МОН за ДЗИ по математика (профилирана подготовка)',
  sourceUrl: 'https://www.mon.bg/nfs/2023/02/spravochni-materiali-dzi_matematika-profilp_21022023.pdf',
  categories: [
    { id: 'all', label: 'Всички' },
    { id: 'analytic', label: 'Вектори и аналитична геометрия' },
    { id: 'planimetry', label: 'Планиметрия' },
    { id: 'stereometry', label: 'Тела' },
    { id: 'trigonometry', label: 'Тригонометрия' },
    { id: 'algebra', label: 'Полиноми и редици' },
    { id: 'analysis', label: 'Граници и производни' },
    { id: 'probability', label: 'Вероятности' },
  ],
  groups: [
    {
      id: 'vectors',
      title: 'Вектори и координати',
      category: 'analytic',
      entries: [
        { id: 'v-length', label: t`Дължина на вектор $\vec{a}(x_a;\,y_a)$`, tex: [t`|\vec{a}|=\sqrt{\vec{a}\cdot\vec{a}}`, t`|\vec{a}|=\sqrt{x_a^{\,2}+y_a^{\,2}}`], keywords: ['дължина', 'вектор'] },
        { id: 'v-dot', label: t`Скаларно произведение на $\vec{a}(x_a;\,y_a)$ и $\vec{b}(x_b;\,y_b)$`, tex: [t`\vec{a}\vec{b}=x_ax_b+y_ay_b`, t`\vec{a}\vec{b}=|\vec{a}|\,|\vec{b}|\cos\sphericalangle\left(\vec{a},\vec{b}\right)`], keywords: ['скаларно', 'перпендикулярни', 'ъгъл между вектори'] },
      ],
    },
    {
      id: 'analytic',
      title: 'Аналитична геометрия в равнината',
      category: 'analytic',
      keywords: ['елипса', 'хипербола', 'парабола', 'фокус'],
      entries: [
        { id: 'an-general', label: 'Общо уравнение на права', tex: [t`ax+by+c=0`], keywords: ['права'] },
        { id: 'an-slope', label: 'Декартово уравнение на права', tex: [t`y=kx+b`], keywords: ['права', 'ъглов коефициент'] },
        { id: 'an-two-points', label: t`Уравнение на права през две точки $M_1(x_1;\,y_1)$ и $M_2(x_2;\,y_2)$`, tex: [t`g:\ \dfrac{x-x_1}{x_2-x_1}=\dfrac{y-y_1}{y_2-y_1}`], keywords: ['права', 'две точки'] },
        { id: 'an-circle', label: t`Нормално уравнение на окръжност с център $O(a;\,b)$ и радиус $r$`, tex: [t`(x-a)^2+(y-b)^2=r^2`], keywords: ['окръжност'] },
        { id: 'an-angle', label: t`Ъгъл $\varphi$ между правите $g_1:\ a_1x+b_1y+c_1=0$ и $g_2:\ a_2x+b_2y+c_2=0$`, tex: [t`\cos\varphi=\left|\dfrac{a_1a_2+b_1b_2}{\sqrt{a_1^2+b_1^2}\cdot\sqrt{a_2^2+b_2^2}}\right|`], keywords: ['ъгъл между прави'] },
      ],
      tables: [
        {
          head: ['Криви от втора степен', 'Канонично уравнение', 'Фокуси'],
          rows: [
            ['Елипса', t`$\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$`, t`$F_1(c;\,0)$ и $F_2(-c;\,0)$, където $c=\sqrt{\left|a^2-b^2\right|}$`],
            ['Хипербола', t`$\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$`, t`$F_1(c;\,0)$ и $F_2(-c;\,0)$, където $c=\sqrt{a^2+b^2}$`],
            ['Парабола', t`$y^2=2px$`, t`$F\left(\dfrac{p}{2};\,0\right)$`],
          ],
        },
      ],
    },
    nvoGroup('triangle', { title: 'Зависимости в триъгълник и успоредник' }),
    nvoGroup('areas'),
    {
      id: 'solids',
      title: 'Ръбести и валчести тела',
      category: 'stereometry',
      entries: [
        { id: 'so-prism', label: 'Права призма', tex: [t`S=Ph`, t`S_1=S+2B`, t`V=Bh`], keywords: ['призма'] },
        { id: 'so-pyramid', label: 'Правилна пирамида', tex: [t`S=\dfrac{Pa}{2}`, t`S_1=S+B`, t`V=\dfrac{1}{3}Bh`], keywords: ['пирамида', 'апотема'] },
        { id: 'so-frustum', label: 'Пресечена пирамида', tex: [t`S_1=S+B+B_1`, t`V=\dfrac{h}{3}\left(B+B_1+\sqrt{BB_1}\right)`], keywords: ['пресечена'] },
        { id: 'so-cylinder', label: 'Прав кръгов цилиндър', tex: [t`S=2\pi rh`, t`S_1=2\pi r(h+r)`, t`V=\pi r^2h`], keywords: ['цилиндър'] },
        { id: 'so-cone', label: 'Прав кръгов конус', tex: [t`S=\pi rl`, t`S_1=S+B=\pi r(l+r)`, t`V=\dfrac{\pi r^2h}{3}`], keywords: ['конус', 'образуваща'] },
        { id: 'so-frustum-cone', label: 'Прав кръгов пресечен конус', tex: [t`S=\pi l(R+r)`, t`S_1=\pi l(R+r)+\pi R^2+\pi r^2`, t`V=\dfrac{1}{3}\pi h\left(R^2+Rr+r^2\right)`], keywords: ['пресечен конус'] },
        { id: 'so-sphere', label: 'Сфера и кълбо', tex: [t`S=4\pi r^2`, t`V=\dfrac{4}{3}\pi r^3`], keywords: ['сфера', 'кълбо'] },
        { id: 'so-projection', label: t`Лице на проекция на многоъгълник от равнина $\alpha$ върху равнина $\beta$ ($\varphi$ — острият ъгъл между равнините)`, tex: [t`S_1=S\cos\varphi`], keywords: ['проекция', 'ъгъл между равнини'] },
      ],
    },
    {
      id: 'trigonometry',
      title: 'Тригонометрични функции',
      category: 'trigonometry',
      keywords: ['синус', 'косинус', 'тангенс', 'котангенс', 'sin', 'cos', 'tg', 'cotg', 'таблица', 'привеждане'],
      entries: [
        ...TRIG_IDENTITIES,
        { id: 'tr-half', label: 'Понижаване на степента', tex: [t`1-\cos 2\alpha=2\sin^2\alpha`, t`1+\cos 2\alpha=2\cos^2\alpha`], keywords: ['половин', 'квадрат'] },
        { id: 'tr-tan', label: 'Чрез тангенса', tex: [t`\sin 2\alpha=\dfrac{2\operatorname{tg}\alpha}{1+\operatorname{tg}^2\alpha}`, t`\cos 2\alpha=\dfrac{1-\operatorname{tg}^2\alpha}{1+\operatorname{tg}^2\alpha}`], keywords: ['тангенс'] },
      ],
      tables: [
        {
          head: [t`$\alpha^\circ$`, t`$0^\circ$`, t`$30^\circ$`, t`$45^\circ$`, t`$60^\circ$`, t`$90^\circ$`, t`$120^\circ$`, t`$135^\circ$`, t`$150^\circ$`, t`$180^\circ$`, t`$270^\circ$`, t`$360^\circ$`],
          rows: [
            [t`$\alpha$ rad`, '$0$', t`$\dfrac{\pi}{6}$`, t`$\dfrac{\pi}{4}$`, t`$\dfrac{\pi}{3}$`, t`$\dfrac{\pi}{2}$`, t`$\dfrac{2\pi}{3}$`, t`$\dfrac{3\pi}{4}$`, t`$\dfrac{5\pi}{6}$`, t`$\pi$`, t`$\dfrac{3\pi}{2}$`, t`$2\pi$`],
            [t`$\sin\alpha$`, '$0$', t`$\dfrac{1}{2}$`, t`$\dfrac{\sqrt{2}}{2}$`, t`$\dfrac{\sqrt{3}}{2}$`, '$1$', t`$\dfrac{\sqrt{3}}{2}$`, t`$\dfrac{\sqrt{2}}{2}$`, t`$\dfrac{1}{2}$`, '$0$', '$-1$', '$0$'],
            [t`$\cos\alpha$`, '$1$', t`$\dfrac{\sqrt{3}}{2}$`, t`$\dfrac{\sqrt{2}}{2}$`, t`$\dfrac{1}{2}$`, '$0$', t`$-\dfrac{1}{2}$`, t`$-\dfrac{\sqrt{2}}{2}$`, t`$-\dfrac{\sqrt{3}}{2}$`, '$-1$', '$0$', '$1$'],
            [t`$\operatorname{tg}\alpha$`, '$0$', t`$\dfrac{\sqrt{3}}{3}$`, '$1$', t`$\sqrt{3}$`, '–', t`$-\sqrt{3}$`, '$-1$', t`$-\dfrac{\sqrt{3}}{3}$`, '$0$', '–', '$0$'],
            [t`$\operatorname{cotg}\alpha$`, '–', t`$\sqrt{3}$`, '$1$', t`$\dfrac{\sqrt{3}}{3}$`, '$0$', t`$-\dfrac{\sqrt{3}}{3}$`, '$-1$', t`$-\sqrt{3}$`, '–', '$0$', '–'],
          ],
        },
        {
          head: ['', t`$-\alpha$`, t`$90^\circ\pm\alpha$`, t`$180^\circ\pm\alpha$`, t`$270^\circ\pm\alpha$`, t`$360^\circ\pm\alpha$`],
          rows: [
            ['sin', t`$-\sin\alpha$`, t`$\cos\alpha$`, t`$\mp\sin\alpha$`, t`$-\cos\alpha$`, t`$\pm\sin\alpha$`],
            ['cos', t`$\cos\alpha$`, t`$\mp\sin\alpha$`, t`$-\cos\alpha$`, t`$\pm\sin\alpha$`, t`$\cos\alpha$`],
            ['tg', t`$-\operatorname{tg}\alpha$`, t`$\mp\operatorname{cotg}\alpha$`, t`$\pm\operatorname{tg}\alpha$`, t`$\mp\operatorname{cotg}\alpha$`, t`$\pm\operatorname{tg}\alpha$`],
            ['cotg', t`$-\operatorname{cotg}\alpha$`, t`$\mp\operatorname{tg}\alpha$`, t`$\pm\operatorname{cotg}\alpha$`, t`$\mp\operatorname{tg}\alpha$`, t`$\pm\operatorname{cotg}\alpha$`],
          ],
        },
      ],
    },
    {
      id: 'polynomials',
      title: 'Полиноми на една променлива',
      category: 'algebra',
      keywords: ['хорнер', 'безу'],
      entries: [{ id: 'po-bezout', label: 'Теорема на Безу', tex: [t`P_n(x)=(x-x_0)\,Q_{n-1}(x)+P_n(x_0)`], keywords: ['остатък', 'делене'] }],
      tables: [
        {
          head: ['', t`$a_0$`, t`$a_1$`, t`$a_2$`, '…', t`$a_{n-1}$`, t`$a_n$`],
          rows: [[t`$x_0$`, t`$b_0=a_0$`, t`$b_1=x_0b_0+a_1$`, t`$b_2=x_0b_1+a_2$`, '…', t`$b_{n-1}=x_0b_{n-2}+a_{n-1}$`, t`$x_0b_{n-1}+a_n=P_n(x_0)$`]],
        },
      ],
    },
    {
      id: 'sequences',
      title: 'Числови редици. Граници на редици',
      category: 'algebra',
      entries: [
        {
          id: 'se-binomial',
          label: 'Нютонов бином',
          tex: [t`(a+b)^n=\binom{n}{0}a^n+\binom{n}{1}a^{n-1}b+\ldots+\binom{n}{k}a^{n-k}b^k+\ldots+\binom{n}{n-1}ab^{n-1}+\binom{n}{n}b^n`],
          keywords: ['бином', 'нютон', 'биномни коефициенти'],
        },
        { id: 'se-binom-props', label: 'Биномни коефициенти', tex: [t`\binom{n}{k}=C_n^k`, t`\binom{n}{k}=\binom{n}{n-k}`, t`\binom{n}{k}+\binom{n}{k+1}=\binom{n+1}{k+1}`], keywords: ['бином', 'комбинации'] },
        { id: 'se-geom-sum', label: 'Сума на безкрайно намаляваща геометрична прогресия', tex: [t`S=\dfrac{a_1}{1-q},\quad |q|<1`], keywords: ['геометрична', 'прогресия', 'безкрайна'] },
        { id: 'se-limits', label: 'Граници на редици', tex: [t`\lim_{n\to\infty}\dfrac{1}{n}=0`, t`\lim_{n\to\infty}q^n=0\iff|q|<1`, t`\lim_{n\to\infty}\left(1+\dfrac{1}{n}\right)^n=e`], keywords: ['граница', 'редица'] },
      ],
    },
    {
      id: 'limits',
      title: 'Функции. Непрекъснатост',
      category: 'analysis',
      entries: [
        {
          id: 'li-basic',
          label: 'Граници на функции',
          tex: [t`\lim_{x\to\infty}\dfrac{1}{x}=0`, t`\lim_{x\to 0}\dfrac{\sin x}{x}=1`, t`\lim_{x\to\pm\infty}\left(1+\dfrac{1}{x}\right)^x=e`, t`\lim_{x\to 0}(1+x)^{\frac{1}{x}}=e`],
          keywords: ['граница', 'забележителни'],
        },
        { id: 'li-sin', label: t`Ако $\displaystyle\lim_{x\to c}f(x)=0$, то`, tex: [t`\lim_{x\to c}\dfrac{\sin f(x)}{f(x)}=1`], keywords: ['граница', 'синус'] },
        {
          id: 'li-rational',
          label: 'Граница на дробна функция',
          tex: [t`\lim_{x\to\infty}\dfrac{a_0x^n+a_1x^{n-1}+\ldots+a_n}{b_0x^m+b_1x^{m-1}+\ldots+b_{m-1}}=\begin{cases}\infty & \text{при } n>m\\[1mm] \dfrac{a_0}{b_0} & \text{при } n=m\\[1mm] 0 & \text{при } n<m\end{cases}`],
          keywords: ['граница', 'асимптота', 'дробна'],
        },
        { id: 'li-continuity', label: t`$f(x)$ е непрекъсната в точката $x_0$ от дефиниционното ѝ множество, ако`, tex: [t`\lim_{x\to x_0}f(x)=f(x_0)`], keywords: ['непрекъсната', 'непрекъснатост'] },
      ],
    },
    {
      id: 'derivatives',
      title: 'Производни',
      category: 'analysis',
      keywords: ['диференциране'],
      entries: [
        {
          id: 'de-table',
          label: 'Производни на някои функции',
          tex: [
            t`(c)'=0`,
            t`(x)'=1`,
            t`\left(x^\alpha\right)'=\alpha x^{\alpha-1}`,
            t`(\sin x)'=\cos x`,
            t`(\cos x)'=-\sin x`,
            t`(\operatorname{tg}x)'=\dfrac{1}{\cos^2x}`,
            t`(\operatorname{cotg}x)'=-\dfrac{1}{\sin^2x}`,
            t`\left(e^x\right)'=e^x`,
            t`\left(a^x\right)'=a^x\ln a,\ a>0`,
            t`(\ln x)'=\dfrac{1}{x}`,
            t`\left(\log_a x\right)'=\dfrac{1}{x\ln a},\ a>0,\ a\ne 1,\ x>0`,
          ],
          keywords: ['производна', 'таблични'],
        },
        {
          id: 'de-rules',
          label: 'Правила за диференциране',
          tex: [
            t`\left(cf(x)\right)'=cf'(x)`,
            t`\left(f(x)\pm g(x)\right)'=f'(x)\pm g'(x)`,
            t`\left(f(x)g(x)\right)'=f'(x)g(x)+f(x)g'(x)`,
            t`\left(\dfrac{f(x)}{g(x)}\right)'=\dfrac{f'(x)g(x)-f(x)g'(x)}{g^2(x)}`,
            t`\left(g(f(x))\right)'=g'(f(x))\,f'(x)`,
          ],
          keywords: ['производна', 'произведение', 'частно', 'сложна функция'],
        },
      ],
    },
    {
      id: 'applications',
      title: 'Приложения на математическия анализ',
      category: 'analysis',
      entries: [
        { id: 'ap-tangent', label: t`Допирателна към графиката на $y=f(x)$ в точката $\left(x_0;\,f(x_0)\right)$`, tex: [t`y=f'(x_0)(x-x_0)+f(x_0)`], keywords: ['допирателна', 'ъглов коефициент'] },
        { id: 'ap-circle', label: t`Допирателна към окръжност в точка $M_0(x_0;\,y_0)$ от нея`, tex: [t`t:\ (x_0-\alpha)(x-\alpha)+(y_0-\beta)(y-\beta)=R^2`], keywords: ['допирателна', 'окръжност'] },
        { id: 'ap-conics', label: t`Допирателна към крива от втора степен в точка $M_0(x_0;\,y_0)$ от нея`, tex: [t`\text{Елипса: } t:\ \dfrac{x_0x}{a^2}+\dfrac{y_0y}{b^2}=1`, t`\text{Хипербола: } t:\ \dfrac{x_0x}{a^2}-\dfrac{y_0y}{b^2}=1`], keywords: ['допирателна', 'елипса', 'хипербола'] },
      ],
    },
    {
      id: 'combinatorics',
      title: 'Комбинаторика',
      category: 'probability',
      keywords: ['пермутации', 'вариации', 'комбинации', 'повторение'],
      entries: [],
      tables: [
        {
          head: ['', t`Без повторение от $n$ елемента от $k$-ти клас`, t`С повторение от $n$ елемента от $k$-ти клас`],
          rows: [
            ['Пермутации', t`$P_n=n!$`, t`$\widetilde{P}_n(n_1,n_2,\ldots,n_k)=\dfrac{n!}{n_1!\,n_2!\ldots n_k!}$, $n_1+n_2+\ldots+n_k=n$`],
            ['Вариации', t`$V_n^k=\dfrac{n!}{(n-k)!}$`, t`$\widetilde{V}_n^k=n^k$`],
            ['Комбинации', t`$C_n^k=\dfrac{n!}{k!\,(n-k)!}=\dbinom{n}{k}$`, t`$\widetilde{C}_n^k=\widetilde{P}_n(k,\,n-1)=\dfrac{(n+k-1)!}{k!\,(n-1)!}=C_{n+k-1}^k$`],
          ],
        },
      ],
    },
    {
      id: 'probability',
      title: 'Вероятности',
      category: 'probability',
      entries: [
        { id: 'pr-classic', label: 'Класическа вероятност', tex: [t`P(A)=\dfrac{\text{брой на благоприятните изходи}}{\text{общ брой на изходите}}`, t`0\le P(A)\le 1,\quad P(\varnothing)=0,\quad P(\Omega)=1`], keywords: ['вероятност'] },
        { id: 'pr-sum', label: t`Вероятност на сума $P(A\cup B)$`, tex: [t`P(A\cup B)=P(A)+P(B)\ \text{ — несъвместими}`, t`P(A\cup B)=P(A)+P(B)-P(AB)\ \text{ — съвместими}`], keywords: ['сума', 'несъвместими', 'съвместими'] },
        { id: 'pr-conditional', label: 'Условна вероятност', tex: [t`P(A\mid B)=\dfrac{P(AB)}{P(B)},\quad P(B)>0`], keywords: ['условна'] },
        { id: 'pr-total', label: t`Формула за пълната вероятност ($B_1,\ldots,B_n$ — пълна група събития)`, tex: [t`P(A)=P(A\mid B_1)P(B_1)+P(A\mid B_2)P(B_2)+\ldots+P(A\mid B_n)P(B_n)`], keywords: ['пълна вероятност'] },
        { id: 'pr-bayes', label: t`Формула на Бейс, $k=1,2,\ldots,n$`, tex: [t`P(B_k\mid A)=\dfrac{P(A\mid B_k)P(B_k)}{P(A)}`], keywords: ['бейс'] },
      ],
    },
    {
      id: 'random-variables',
      title: 'Случайни величини',
      category: 'probability',
      keywords: ['нормално разпределение', 'таблица', 'z'],
      entries: [
        { id: 'rv-expectation', label: t`Математическо очакване на дискретна случайна величина ($X=x_i$ с вероятност $p_i$)`, tex: [t`E(X)=x_1p_1+x_2p_2+\ldots+x_kp_k`], keywords: ['очакване', 'средна стойност'] },
        {
          id: 'rv-variance',
          label: 'Дисперсия и стандартно отклонение',
          tex: [t`D(X)=\left(x_1-E(X)\right)^2p_1+\ldots+\left(x_k-E(X)\right)^2p_k`, t`D(X)=EX^2-(EX)^2`, t`D(X)=E(X-EX)^2`, t`\sigma=\sqrt{D(X)}`],
          keywords: ['дисперсия', 'стандартно отклонение'],
        },
        { id: 'rv-binomial', label: t`Биномно разпределение с параметри $n$, $p$ и $q$: $P(X=k)=C_n^kp^kq^{n-k}$`, tex: [t`E(X)=np`, t`D(X)=npq`, t`\sigma=\sqrt{npq}`], keywords: ['биномно'] },
        {
          id: 'rv-normal',
          label: t`Нормално разпределение $N(\mu,\sigma^2)$: функция на плътност и стандартизиране`,
          tex: [t`f(x)=\dfrac{1}{\sigma\sqrt{2\pi}}e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}`, t`E(X)=\mu`, t`Z=\dfrac{X-\mu}{\sigma}\sim N(0,1)`],
          keywords: ['нормално', 'плътност', 'стандартизиране'],
        },
        {
          id: 'rv-normal-table',
          label: t`Таблица на $N(0,1)$: площта вляво от $Z_\alpha$ е $P(-\infty<Z\le Z_\alpha)=\alpha$, когато $Z_\alpha\ge 0$; за отрицателни стойности — $1-P(Z\le Z_\alpha)$`,
          tex: [t`P(Z\le -z)=1-P(Z\le z)`],
          keywords: ['таблица', 'нормално'],
        },
      ],
      tables: [{ head: NORMAL_TABLE_HEAD, rows: NORMAL_TABLE_ROWS }],
    },
  ],
};

export const DZI_MATH_2021_FORMULAS: FormulaSheet = {
  id: 'dzi-math-2021',
  title: 'Формули — ДЗИ по математика (2021 г.)',
  sourceLabel: 'Листът с формули към матурата на МОН от 21.05.2021 г.',
  sourceUrl: 'https://www.mon.bg/nfs/2021/05/2dzi_matematika_v1_210521.pdf',
  categories: [
    { id: 'all', label: 'Всички' },
    { id: 'algebra', label: 'Алгебра' },
    { id: 'probability', label: 'Вероятности и прогресии' },
    { id: 'planimetry', label: 'Планиметрия' },
    { id: 'trigonometry', label: 'Тригонометрия' },
  ],
  groups: [
    nvoGroup('quadratic-equation'),
    nvoGroup('quadratic-function'),
    {
      id: 'roots-logs',
      title: 'Корен. Степен и логаритъм',
      category: 'algebra',
      entries: [
        { id: 'rl-even', label: t`При $k\in\mathbb{N}$`, tex: [t`\sqrt[2k]{a^{2k}}=|a|`, t`\sqrt[2k+1]{a^{2k+1}}=a`], keywords: ['корен', 'модул'] },
        {
          id: 'rl-powers',
          label: t`При $a\ge 0$, $k\ge 2$, $n\ge 2$ и $m,n,k\in\mathbb{N}$`,
          tex: [t`\dfrac{1}{a^m}=a^{-m},\ a\ne 0`, t`\sqrt[n]{a^m}=a^{\frac{m}{n}}`, t`\sqrt[n]{\sqrt[k]{a}}=\sqrt[nk]{a}`, t`\sqrt[nk]{a^{mk}}=\sqrt[n]{a^m}`],
          keywords: ['степен', 'корен'],
        },
        { id: 'rl-log', label: t`Логаритъм при $a>0$, $b>0$ и $a\ne 1$`, tex: [t`a^x=b\iff\log_a b=x`, t`a^{\log_a b}=b`, t`\log_a a^x=x`], keywords: ['логаритъм'] },
      ],
    },
    nvoGroup('combinatorics'),
    nvoGroup('progressions'),
    nvoGroup('triangle'),
    nvoGroup('areas'),
    {
      id: 'trigonometry',
      title: 'Тригонометрични функции',
      category: 'trigonometry',
      keywords: ['синус', 'косинус', 'тангенс', 'котангенс', 'sin', 'cos', 'tg', 'cotg', 'таблица', 'привеждане'],
      entries: [
        ...TRIG_IDENTITIES,
        { id: 'tr-tan-sum', label: 'Тангенс и котангенс на сбор и разлика', tex: [t`\operatorname{tg}(\alpha\pm\beta)=\dfrac{\operatorname{tg}\alpha\pm\operatorname{tg}\beta}{1\mp\operatorname{tg}\alpha\operatorname{tg}\beta}`, t`\operatorname{cotg}(\alpha\pm\beta)=\dfrac{\operatorname{cotg}\alpha\operatorname{cotg}\beta\mp 1}{\operatorname{cotg}\beta\pm\operatorname{cotg}\alpha}`], keywords: ['тангенс', 'котангенс'] },
        { id: 'tr-tan-double', label: 'Двоен ъгъл — тангенс и котангенс', tex: [t`\operatorname{tg}2\alpha=\dfrac{2\operatorname{tg}\alpha}{1-\operatorname{tg}^2\alpha}`, t`\operatorname{cotg}2\alpha=\dfrac{\operatorname{cotg}^2\alpha-1}{2\operatorname{cotg}\alpha}`], keywords: ['двоен', 'тангенс'] },
        { id: 'tr-square', label: 'Понижаване на степента', tex: [t`\sin^2\alpha=\dfrac{1}{2}(1-\cos 2\alpha)`, t`\cos^2\alpha=\dfrac{1}{2}(1+\cos 2\alpha)`, t`1-\cos\alpha=2\sin^2\dfrac{\alpha}{2}`, t`1+\cos\alpha=2\cos^2\dfrac{\alpha}{2}`], keywords: ['половин', 'квадрат'] },
        {
          id: 'tr-product',
          label: 'Произведение в сбор',
          tex: [t`\sin\alpha\sin\beta=\dfrac{1}{2}\left(\cos(\alpha-\beta)-\cos(\alpha+\beta)\right)`, t`\cos\alpha\cos\beta=\dfrac{1}{2}\left(\cos(\alpha-\beta)+\cos(\alpha+\beta)\right)`, t`\sin\alpha\cos\beta=\dfrac{1}{2}\left(\sin(\alpha+\beta)+\sin(\alpha-\beta)\right)`],
          keywords: ['произведение'],
        },
      ],
      tables: [
        {
          head: [t`$\alpha^\circ$`, t`$0^\circ$`, t`$30^\circ$`, t`$45^\circ$`, t`$60^\circ$`, t`$90^\circ$`],
          rows: [
            [t`$\alpha$ rad`, '$0$', t`$\dfrac{\pi}{6}$`, t`$\dfrac{\pi}{4}$`, t`$\dfrac{\pi}{3}$`, t`$\dfrac{\pi}{2}$`],
            [t`$\sin\alpha$`, '$0$', t`$\dfrac{1}{2}$`, t`$\dfrac{\sqrt{2}}{2}$`, t`$\dfrac{\sqrt{3}}{2}$`, '$1$'],
            [t`$\cos\alpha$`, '$1$', t`$\dfrac{\sqrt{3}}{2}$`, t`$\dfrac{\sqrt{2}}{2}$`, t`$\dfrac{1}{2}$`, '$0$'],
            [t`$\operatorname{tg}\alpha$`, '$0$', t`$\dfrac{\sqrt{3}}{3}$`, '$1$', t`$\sqrt{3}$`, '–'],
            [t`$\operatorname{cotg}\alpha$`, '–', t`$\sqrt{3}$`, '$1$', t`$\dfrac{\sqrt{3}}{3}$`, '$0$'],
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
  ],
};
