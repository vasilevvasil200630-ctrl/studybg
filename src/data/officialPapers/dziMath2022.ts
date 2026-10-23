import type { ExamPaper } from '../../lib/examPaperScoring';

/**
 * ДЗИ по математика — профилирана подготовка, 20.05.2022 г., вариант 1.
 * Условия, ключ, точки и критерии — преписани от официалния PDF на МОН (officialSourceUrl).
 * Примерните решения на 16.–18. са от същия документ. Обясненията към 1.–15. са на StudyBG
 * и са проверени спрямо ключа.
 *
 * Оценката не се изчислява: МОН определя скалата за превръщане на точките за всяка сесия.
 */

const t = String.raw;

export const DZI_MATH_2022: ExamPaper = {
  id: 'official-dzi-math-2022',
  title: 'ДЗИ по математика (профилирана подготовка) — 20 май 2022',
  exam: 'ДЗИ',
  subject: 'Математика',
  kind: 'official',
  officialSourceUrl: 'https://www.mon.bg/nfs/2022/05/2dzi_matematika_v1.pdf',
  year: 2022,
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: null,
  note:
    'Втори ДЗИ, профилирана подготовка: част 1 — 90 минути, част 2 — 150 минути (тук таймерът е общ, 240 минути). Условията, ключът и критериите са официалните на МОН; обясненията към 1.–15. са на StudyBG. Резултатът е в точки: скалата за превръщане в оценка се определя от МОН за всяка сесия.',
  sections: [
    {
      id: 'part1',
      title: 'Част 1 — задачи с избираем отговор (55 т.)',
      instructions: 'Изберете един верен отговор. Задачите носят по 3 или 4 точки — броят е отбелязан до всяка. На изпита за тази част има 90 минути.',
      questions: [
        {
          id: 'd22-q1', number: 1, kind: 'choice', points: 3,
          prompt: 'На кой от чертежите е изобразено сечение на куб с равнина?',
          stimulus: [{ kind: 'figure', figureId: 'dzi-2022-q1-cube-sections', alt: 'Четири куба с отбелязани многоъгълници, означени А, Б, В и Г.' }],
          options: ['чертеж А)', 'чертеж Б)', 'чертеж В)', 'чертеж Г)'],
          correctIndex: 3,
          explanation: t`Страните на сечението лежат в стените на куба, а отсечките в успоредни стени са успоредни. На Г) многоъгълникът минава през двата края на диагонал на горната стена и през средите на два ръба на долната стена — отсечката между средите е успоредна на този диагонал, т.е. четирите точки лежат в една равнина. На А), Б) и В) четирите върха не лежат в една равнина.`
        },
        {
          id: 'd22-q2', number: 2, kind: 'choice', points: 3,
          prompt: t`Центърът на коя от дадените окръжности лежи на правата с уравнение $y=\dfrac{1}{2}x$?`,
          options: [t`$(x-2)^2+(y+3)^2=5$`, t`$(x+1)^2+(y+1)^2=8$`, t`$(x-1)^2+\left(y-\dfrac{1}{2}\right)^2=25$`, t`$(x-3)^2+y^2=4$`],
          correctIndex: 2,
          explanation: t`Центровете са $(2;\,-3)$, $(-1;\,-1)$, $\left(1;\,\frac{1}{2}\right)$ и $(3;\,0)$. Само $\left(1;\,\frac{1}{2}\right)$ изпълнява $y=\dfrac{1}{2}x$.`
        },
        {
          id: 'd22-q3', number: 3, kind: 'choice', points: 3,
          prompt: t`Стойността на реалното число $k$, за която правите с уравнения $y=2x-3$ и $y=-2kx+1$ са успоредни, е равна на:`,
          options: [t`$k=-2$`, t`$k=-1$`, t`$k=0{,}25$`, t`$k=1$`],
          correctIndex: 1,
          explanation: t`Успоредните прави имат равни ъглови коефициенти: $-2k=2$, т.е. $k=-1$ (свободните членове $-3$ и $1$ са различни, затова правите не съвпадат).`
        },
        {
          id: 'd22-q4', number: 4, kind: 'choice', points: 3,
          prompt: t`Случайната величина $X$ има разпределение, дадено в таблицата. Дисперсията на величината е:`,
          stimulus: [
            {
              kind: 'table',
              head: [t`$X$`, t`$-1$`, '$0$', '$1$', '$2$'],
              rows: [[t`$P$`, '0,4', '0,3', t`$a$`, '0,1']]
            }
          ],
          options: [t`$-1$`, '0', '1', '0,25'],
          correctIndex: 2,
          explanation: t`$a=1-0{,}4-0{,}3-0{,}1=0{,}2$. $E(X)=-0{,}4+0+0{,}2+0{,}2=0$, $E(X^2)=0{,}4+0+0{,}2+0{,}4=1$, затова $D(X)=E(X^2)-E(X)^2=1$.`
        },
        {
          id: 'd22-q5', number: 5, kind: 'choice', points: 3,
          prompt: t`Остатъкът от делението на полинома $x^4-3x^3+x^2+2x-3$ с полинома $x-1$ е:`,
          options: [t`$x+1$`, '0', t`$-1$`, t`$-2$`],
          correctIndex: 3,
          explanation: t`По теоремата на Безу остатъкът е стойността при $x=1$: $1-3+1+2-3=-2$.`
        },
        {
          id: 'd22-q6', number: 6, kind: 'choice', points: 4,
          prompt: t`Периодът $T$ на функцията $f(x)=\operatorname{tg}2x$ е равен на:`,
          options: [t`$T=2\pi$`, t`$T=\pi$`, t`$T=\dfrac{\pi}{2}$`, t`$T=\dfrac{\pi}{4}$`],
          correctIndex: 2,
          explanation: t`Основният период на $\operatorname{tg}x$ е $\pi$, а на $\operatorname{tg}2x$ — $\dfrac{\pi}{2}$.`
        },
        {
          id: 'd22-q7', number: 7, kind: 'choice', points: 4,
          prompt: t`В правоъгълна координатна система са дадени векторите $\vec{a}(1;\,2)$ и $\vec{b}(-1;\,1)$. Координатите на вектора $\vec{c}=2\vec{a}-\vec{b}$ са:`,
          options: [t`$(0;\,3)$`, t`$(2;\,1)$`, t`$(3;\,-3)$`, t`$(3;\,3)$`],
          correctIndex: 3,
          explanation: t`$2\vec{a}-\vec{b}=(2+1;\,4-1)=(3;\,3)$.`
        },
        {
          id: 'd22-q8', number: 8, kind: 'choice', points: 4,
          prompt: t`Намерете границата $\displaystyle\lim_{x\to 3}\dfrac{2-\sqrt{1+x}}{x-3}$.`,
          options: [t`$-0{,}25$`, '0', '0,25', t`$+\infty$`],
          correctIndex: 0,
          explanation: t`Умножаваме по спрегнатия израз: $\dfrac{4-(1+x)}{(x-3)\left(2+\sqrt{1+x}\right)}=\dfrac{-1}{2+\sqrt{1+x}}\to-\dfrac{1}{4}$.`
        },
        {
          id: 'd22-q9', number: 9, kind: 'choice', points: 4,
          prompt: t`Сумата на безкрайната геометрична прогресия $\sin 45^\circ,\ -\sin^2 45^\circ,\ \sin^3 45^\circ,\ \dots,\ (-1)^{n+1}\sin^n 45^\circ,\ \dots$ е равна на:`,
          options: [t`$2-\sqrt{2}$`, t`$\sqrt{2}-1$`, t`$\sqrt{2}+1$`, t`$2+\sqrt{2}$`],
          correctIndex: 1,
          explanation: t`Първият член е $a_1=\dfrac{\sqrt{2}}{2}$, а частното е $q=-\dfrac{\sqrt{2}}{2}$, $|q|<1$. $S=\dfrac{a_1}{1-q}=\dfrac{\frac{\sqrt{2}}{2}}{1+\frac{\sqrt{2}}{2}}=\dfrac{\sqrt{2}}{2+\sqrt{2}}=\sqrt{2}-1$.`
        },
        {
          id: 'd22-q10', number: 10, kind: 'choice', points: 4,
          prompt: t`Тангенсът на ъгъла, който допирателната към графиката на функцията $f(x)=2x^3-3x-1$ в точката с абсциса $x=1$ образува с положителната посока на абсцисната ос, е равен на:`,
          options: [t`$-2$`, t`$-1$`, '1', '3'],
          correctIndex: 3,
          explanation: t`Тангенсът е ъгловият коефициент $f'(1)$: $f'(x)=6x^2-3$, $f'(1)=3$.`
        },
        {
          id: 'd22-q11', number: 11, kind: 'choice', points: 4,
          prompt: t`Локалният минимум на функцията $y(x)=\dfrac{1}{3}x^3+x^2-3x$ е равен на:`,
          options: [t`$y_{\min}=-3$`, t`$y_{\min}=-\dfrac{5}{3}$`, t`$y_{\min}=1$`, t`$y_{\min}=9$`],
          correctIndex: 1,
          explanation: t`$y'(x)=x^2+2x-3=(x+3)(x-1)$; производната сменя знака от $-$ на $+$ при $x=1$, затова там е минимумът: $y(1)=\dfrac{1}{3}+1-3=-\dfrac{5}{3}$.`
        },
        {
          id: 'd22-q12', number: 12, kind: 'choice', points: 4,
          prompt: t`Инфлексната точка на графиката на функцията $f(x)=\dfrac{1}{2}x^3-3x^2+9$ е разположена:`,
          options: ['в I квадрант', 'във II квадрант', 'в III квадрант', 'в IV квадрант'],
          correctIndex: 0,
          explanation: t`$f''(x)=3x-6=0$ при $x=2$, където $f''$ сменя знака. $f(2)=4-12+9=1$, т.е. точката $(2;\,1)$ е в I квадрант.`
        },
        {
          id: 'd22-q13', number: 13, kind: 'choice', points: 4,
          prompt: t`За функцията $f(x)=\dfrac{x^2-4}{x^2-1}$ е вярно, че:`,
          options: ['няма асимптоти', 'има само една вертикална асимптота', 'има една вертикална и една хоризонтална асимптота', 'има две вертикални и една хоризонтална асимптота'],
          correctIndex: 3,
          explanation: t`Знаменателят се анулира при $x=\pm 1$, а числителят там е $-3\ne 0$ — две вертикални асимптоти. $\displaystyle\lim_{x\to\pm\infty}f(x)=1$, затова $y=1$ е хоризонтална асимптота.`
        },
        {
          id: 'd22-q14', number: 14, kind: 'choice', points: 4,
          prompt: t`Втората производна на функцията $y(x)=(2x-3)^5$ е:`,
          options: [t`$y''(x)=(2x-3)^3$`, t`$y''(x)=20(2x-3)^3$`, t`$y''(x)=40(2x-3)^3$`, t`$y''(x)=80(2x-3)^3$`],
          correctIndex: 3,
          explanation: t`$y'(x)=5(2x-3)^4\cdot 2=10(2x-3)^4$, $y''(x)=40(2x-3)^3\cdot 2=80(2x-3)^3$.`
        },
        {
          id: 'd22-q15', number: 15, kind: 'choice', points: 4,
          prompt: 'В три книжарници докарали по равен брой сборници. В първата отношението на броя на сборниците по математика и по чужд език е 5 : 3, във втората — 2 : 1, а в третата те са равен брой. Вероятността случайно избран сборник от случайно избрана книжарница да е по математика е равна на:',
          options: [t`$\dfrac{49}{72}$`, t`$\dfrac{47}{72}$`, t`$\dfrac{43}{72}$`, t`$\dfrac{41}{72}$`],
          correctIndex: 2,
          explanation: t`Делът на сборниците по математика е $\dfrac{5}{8}$, $\dfrac{2}{3}$ и $\dfrac{1}{2}$. По формулата за пълната вероятност: $\dfrac{1}{3}\left(\dfrac{5}{8}+\dfrac{2}{3}+\dfrac{1}{2}\right)=\dfrac{1}{3}\cdot\dfrac{43}{24}=\dfrac{43}{72}$.`
        }
      ]
    },
    {
      id: 'part2',
      title: 'Част 2 — задачи със свободен отговор (45 т.)',
      instructions:
        'Запишете пълното решение с обосновка. След предаване го сравнете с примерното решение на МОН и се оценете по критериите. Всяко друго вярно и пълно решение носи максимален брой точки. На изпита за тази част има 150 минути.',
      questions: [
        {
          id: 'd22-q16', number: 16, kind: 'open', points: 15,
          prompt: t`В правилния тетраедър $ABCD$ точката $M$ е центърът на триъгълника $ACD$, а $N$ е средата на ръба $BC$. Намерете косинуса на ъгъла между векторите $\overrightarrow{BM}$ и $\overrightarrow{DN}$.`,
          criteria: [
            { label: t`Избор на векторна база, в която всички скаларни произведения са известни (напр. $\vec{x}=\overrightarrow{AB}$, $\vec{y}=\overrightarrow{AC}$, $\vec{z}=\overrightarrow{AD}$)`, points: 5 },
            { label: t`Изразяване на $\overrightarrow{BM}$ и $\overrightarrow{DN}$ чрез базата`, points: 5 },
            { label: t`Пресмятане на $\overrightarrow{BM}\cdot\overrightarrow{DN}$, $|\overrightarrow{BM}|^2$, $|\overrightarrow{DN}|^2$ и $\cos\theta=-\dfrac{\sqrt{2}}{3}$`, points: 5 }
          ],
          modelAnswer: t`Нека $p$ е дължината на ръбовете, $\vec{x}=\overrightarrow{AB}$, $\vec{y}=\overrightarrow{AC}$, $\vec{z}=\overrightarrow{AD}$. Тетраедърът е правилен, затова $\vec{x}^2=\vec{y}^2=\vec{z}^2=p^2$ и $\vec{x}\cdot\vec{y}=\vec{x}\cdot\vec{z}=\vec{y}\cdot\vec{z}=\dfrac{1}{2}p^2$.
$\overrightarrow{BM}=\overrightarrow{AM}-\overrightarrow{AB}=-\vec{x}+\dfrac{1}{3}\vec{y}+\dfrac{1}{3}\vec{z}$, $\overrightarrow{AN}=\dfrac{1}{2}\vec{x}+\dfrac{1}{2}\vec{y}$ и $\overrightarrow{DN}=\overrightarrow{AN}-\overrightarrow{AD}=\dfrac{1}{2}\vec{x}+\dfrac{1}{2}\vec{y}-\vec{z}$.
Пресмятаме $\overrightarrow{BM}\cdot\overrightarrow{DN}=-\dfrac{1}{3}p^2$, $|\overrightarrow{BM}|^2=\dfrac{2}{3}p^2$, $|\overrightarrow{DN}|^2=\dfrac{3}{4}p^2$. Тогава $\cos\theta=\dfrac{\overrightarrow{BM}\cdot\overrightarrow{DN}}{|\overrightarrow{BM}|\,|\overrightarrow{DN}|}=-\dfrac{\sqrt{2}}{3}$.`
        },
        {
          id: 'd22-q17', number: 17, kind: 'open', points: 15,
          prompt: t`Дадени са полиномите $P(x)=ax^3+bx^2-2x-5$ и $Q(x)=10x^3+39x^2+39x+10$, като е известно, че $x+1$ и $x-1$ са делители на $P(x)$.
а) Намерете коефициентите $a$ и $b$.
б) Разложете на множители $P(x)$ и $Q(x)$.
в) Намерете първата производна на функцията $f(x)=\dfrac{P(x)}{Q(x)}$.`,
          criteria: [
            { label: t`а) Получаване на равенствата $a+b=7$ и $b-a=3$`, points: 2 },
            { label: t`а) Коефициентите $a=2$ и $b=5$`, points: 2 },
            { label: t`б) Разлагането $P(x)=(2x+5)(x-1)(x+1)$`, points: 2 },
            { label: t`б) $-1$ е нула на $Q(x)$, $Q(x)=(x+1)(10x^2+29x+10)$ и разлагането $Q(x)=(x+1)(2x+5)(5x+2)$`, points: 5 },
            { label: t`в) Дефиниционното множество и $f(x)=\dfrac{x-1}{5x+2}$`, points: 1 },
            { label: t`в) $f'(x)=\dfrac{7}{(5x+2)^2}$`, points: 3 }
          ],
          modelAnswer: t`а) От условието $P(-1)=P(1)=0$, т.е. $a+b=7$ и $b-a=3$, откъдето $a=2$ и $b=5$.
б) По схемата на Хорнер $P(x)=(2x+5)(x-1)(x+1)$. Уравнението $10x^3+39x^2+39x+10=0$ е реципрочно от нечетна степен, затова има корен $x=-1$ и $Q(x)=(x+1)(10x^2+29x+10)=(x+1)(2x+5)(5x+2)$.
в) $f(x)=\dfrac{(2x+5)(x-1)(x+1)}{(x+1)(2x+5)(5x+2)}$ с дефиниционно множество $x\in\mathbb{R}\setminus\left\{-1;\,-\frac{2}{5};\,-\frac{5}{2}\right\}$, т.е. $f(x)=\dfrac{x-1}{5x+2}$. Тогава $f'(x)=\dfrac{(5x+2)-5(x-1)}{(5x+2)^2}=\dfrac{7}{(5x+2)^2}$.`
        },
        {
          id: 'd22-q18', number: 18, kind: 'open', points: 15,
          prompt: t`Даден е правоъгълен $\triangle ABC$ с катети $AC=4$ cm и $BC=3$ cm. Точките $M\in AB$, $P\in BC$ и $Q\in AC$ са такива, че $MP\perp BC$, $MQ\perp AC$ и $MQ=x$. Ротационното тяло $G$ е получено при завъртане на $MPCQ$ около страната му $QC$.
а) Да се изрази като функция на $x$ обемът на ротационното тяло $G$.
б) Да се определи за кои стойности на $x$ ротационното тяло $G$ има максимален обем и да се намери този обем.`,
          criteria: [
            { label: 'а) Ротационното тяло е прав кръгов цилиндър', points: 1 },
            { label: t`а) $\triangle AMQ\sim\triangle MBP$ и $\dfrac{AQ}{MP}=\dfrac{MQ}{BP}$`, points: 5 },
            { label: t`а) $V=\dfrac{4\pi}{3}x^2(3-x)$`, points: 3 },
            { label: t`б) Локален максимум при $x\in[0;\,3]$ и максимален обем $\dfrac{16\pi}{3}$, достигнат при $x=2$`, points: 6 }
          ],
          modelAnswer: t`а) $MPCQ$ е правоъгълник; означаваме $QC=MP=y$. Тялото е цилиндър с радиус $MQ=x$ и височина $y$: $V=\pi x^2y$. $PC=MQ=x\Rightarrow BP=3-x$; $QC=MP=y\Rightarrow AQ=4-y$.
$\triangle AMQ\sim\triangle MBP$, затова $\dfrac{AQ}{MP}=\dfrac{MQ}{BP}$: $\dfrac{4-y}{y}=\dfrac{x}{3-x}\iff xy=(4-y)(3-x)\iff y=\dfrac{12-4x}{3}$. Тогава $V(x)=\pi x^2\cdot\dfrac{12-4x}{3}=\dfrac{4\pi}{3}x^2(3-x)$, $x\in[0;\,3]$.
б) Нека $f(x)=\dfrac{4\pi}{3}x^2(3-x)$; $f'(x)=\dfrac{4\pi}{3}\left(6x-3x^2\right)=4\pi x(2-x)$. $f$ има локален максимум при $x=2$ и това е най-голямата стойност в $[0;\,3]$: $f(2)=\dfrac{16\pi}{3}$. Максималният обем е $\dfrac{16\pi}{3}$ cm³ при $x=2$ cm.`
        }
      ]
    }
  ]
};
