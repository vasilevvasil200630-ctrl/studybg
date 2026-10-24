import type { ExamPaper } from '../../lib/examPaperScoring';
import { DZI_SCALE } from '../../lib/monGradeScale';

/**
 * ДЗИ по математика — профилирана подготовка, 22.05.2026 г., вариант 2.
 * Условия, ключ, точки и критерии — преписани от официалния PDF на МОН (officialSourceUrl).
 * Примерните решения на 16.–18. са от същия документ. Обясненията към 1.–15. са на StudyBG
 * и са проверени спрямо ключа.
 *
 * Оценката е по единната скала на МОН за ДЗИ (от 2022/23 г., lib/monGradeScale).
 */

const t = String.raw;

export const DZI_MATH_2026: ExamPaper = {
  id: 'official-dzi-math-2026',
  title: 'ДЗИ по математика (профилирана подготовка) — 22 май 2026',
  exam: 'ДЗИ',
  subject: 'Математика',
  kind: 'official',
  officialSourceUrl: 'https://www.mon.bg/nfs/2026/05/2dzi_matematika_v2-otgovori.pdf',
  year: 2026,
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  formulaSheet: 'dzi-math',
  note:
    'Втори ДЗИ, профилирана подготовка: част 1 — 90 минути, част 2 — 150 минути (тук таймерът е общ, 240 минути). Условията, ключът и критериите са официалните на МОН; обясненията към 1.–15. са на StudyBG. Оценката е по скалата на МОН за ДЗИ: 30 т. — Среден 3,00, 95 т. — Отличен 6,00.',
  sections: [
    {
      id: 'part1',
      title: 'Част 1 — задачи с избираем отговор (55 т.)',
      instructions: 'Изберете един верен отговор. Задачите носят по 3 или 4 точки — броят е отбелязан до всяка. На изпита за тази част има 90 минути.',
      questions: [
        {
          id: 'd26-q1', number: 1, kind: 'choice', points: 3,
          prompt: t`За коя стойност на $p$ векторите $\vec{a}(p;\,4)$ и $\vec{b}(2;\,-3)$ са перпендикулярни?`,
          options: ['6', '5', t`$-\sqrt{13}$`, t`$-6$`],
          correctIndex: 0,
          explanation: t`Векторите са перпендикулярни, когато скаларното им произведение е 0: $2p+4\cdot(-3)=0$, откъдето $p=6$.`
        },
        {
          id: 'd26-q2', number: 2, kind: 'choice', points: 3,
          prompt: t`Декартовото уравнение на правата, минаваща през точките $A(-3;\,2)$ и $B(-2;\,-1)$, е:`,
          options: [t`$y=-3x-11$`, t`$y=-3x-7$`, t`$y=\dfrac{3}{4}x+\dfrac{17}{4}$`, t`$y=\dfrac{3}{4}x+\dfrac{21}{4}$`],
          correctIndex: 1,
          explanation: t`Ъгловият коефициент е $k=\dfrac{-1-2}{-2-(-3)}=-3$. От $y-2=-3(x+3)$ получаваме $y=-3x-7$.`
        },
        {
          id: 'd26-q3', number: 3, kind: 'choice', points: 3,
          prompt: t`Окръжността с уравнение $x^2-4x+y^2+6y-3=0$ има център точка $O$ и радиус $R$. Координатите на точка $O$ и дължината на $R$ са:`,
          options: [t`$O(2;\,3),\ R=2\sqrt{2}$`, t`$O(2;\,-3),\ R=4$`, t`$O(-2;\,3),\ R=4$`, t`$O(2;\,-3),\ R=16$`],
          correctIndex: 1,
          explanation: t`Отделяме точни квадрати: $(x-2)^2-4+(y+3)^2-9-3=0$, т.е. $(x-2)^2+(y+3)^2=16$. Центърът е $O(2;\,-3)$, а $R=4$.`
        },
        {
          id: 'd26-q4', number: 4, kind: 'choice', points: 4,
          prompt: t`В куба $ABCDA_1B_1C_1D_1$ с ръб 1 разстоянието от върха $C$ до равнината $(DBC_1)$ е равно на:`,
          stimulus: [{ kind: 'figure', figureId: 'dzi-2026-q4-cube', alt: 'Куб ABCDA1B1C1D1 със защрихован триъгълник DBC1.' }],
          options: [t`$\dfrac{\sqrt{3}}{3}$`, t`$\dfrac{\sqrt{3}}{2}$`, t`$\dfrac{\sqrt{2}}{3}$`, t`$\dfrac{\sqrt{3}}{6}$`],
          correctIndex: 0,
          explanation: t`Пирамидата $CDBC_1$ има три взаимно перпендикулярни ръба с дължина 1 при $C$, затова обемът ѝ е $\dfrac{1}{6}$. Триъгълникът $DBC_1$ е равностранен със страна $\sqrt{2}$ и лице $\dfrac{\sqrt{3}}{4}\cdot 2=\dfrac{\sqrt{3}}{2}$. От $\dfrac{1}{3}\cdot\dfrac{\sqrt{3}}{2}\cdot h=\dfrac{1}{6}$ следва $h=\dfrac{1}{\sqrt{3}}=\dfrac{\sqrt{3}}{3}$.`
        },
        {
          id: 'd26-q5', number: 5, kind: 'choice', points: 4,
          prompt: t`Сборът от коефициентите в нормалния вид на полинома $M(x)=\left(x^3-3x+1\right)^3$ е:`,
          options: [t`$-1$`, '1', '10', '27'],
          correctIndex: 0,
          explanation: t`Сборът от коефициентите на полином е стойността му при $x=1$: $M(1)=(1-3+1)^3=(-1)^3=-1$.`
        },
        {
          id: 'd26-q6', number: 6, kind: 'choice', points: 3,
          prompt: t`Вярното твърдение за функцията $f(x)=x+\sin x$, дефинирана за $x\in(-\infty;+\infty)$, е:`,
          options: [t`$f(x)$ е нечетна.`, t`$f(x)$ е ограничена.`, t`$f(x)$ е четна.`, t`$f(x)$ е периодична.`],
          correctIndex: 0,
          explanation: t`$f(-x)=-x+\sin(-x)=-(x+\sin x)=-f(x)$, затова функцията е нечетна. Тя не е ограничена ($f(x)\ge x-1$ расте неограничено) и не е периодична.`
        },
        {
          id: 'd26-q7', number: 7, kind: 'choice', points: 4,
          prompt: t`Границата $\displaystyle\lim_{x\to 3}\dfrac{1-\sqrt{4-x}}{x^2-9}$ е равна на:`,
          options: ['0', t`$\dfrac{1}{6}$`, t`$\dfrac{1}{12}$`, t`$+\infty$`],
          correctIndex: 2,
          explanation: t`Умножаваме по спрегнатия израз: $\dfrac{1-(4-x)}{(x^2-9)(1+\sqrt{4-x})}=\dfrac{x-3}{(x-3)(x+3)(1+\sqrt{4-x})}=\dfrac{1}{(x+3)(1+\sqrt{4-x})}$. При $x\to 3$ границата е $\dfrac{1}{6\cdot 2}=\dfrac{1}{12}$.`
        },
        {
          id: 'd26-q8', number: 8, kind: 'choice', points: 4,
          prompt: t`Решенията на неравенството $-x^4+5x^3-x^2-21x+18<0$ са:`,
          options: [
            t`$x\in(-2;\,1)$`,
            t`$x\in(-\infty;\,-2)\cup(1;\,+\infty)$`,
            t`$x\in(-2;\,1)\cup(3;\,+\infty)$`,
            t`$x\in(-\infty;\,-2)\cup(1;\,3)\cup(3;\,+\infty)$`
          ],
          correctIndex: 3,
          explanation: t`Неравенството е $x^4-5x^3+x^2+21x-18>0$. Числата $1$, $-2$ и $3$ са корени и $x^4-5x^3+x^2+21x-18=(x-1)(x+2)(x-3)^2$. Множителят $(x-3)^2$ е положителен при $x\ne 3$, затова остава $(x-1)(x+2)>0$: $x<-2$ или $x>1$, без $x=3$.`
        },
        {
          id: 'd26-q9', number: 9, kind: 'choice', points: 4,
          prompt: t`Материална точка се движи по закона $S(t)=2\sin(\pi t)$. Ако пътят $S$ се измерва в метри, а времето $t$ — в секунди, то скоростта на точката при $t=0$ s е равна на:`,
          options: ['0 m/s', '1 m/s', t`$\pi$ m/s`, t`$2\pi$ m/s`],
          correctIndex: 3,
          explanation: t`Скоростта е производната на пътя: $v(t)=S'(t)=2\pi\cos(\pi t)$, а $v(0)=2\pi$ m/s.`
        },
        {
          id: 'd26-q10', number: 10, kind: 'choice', points: 3,
          prompt: t`Броят на асимптотите на функцията $f(x)=\dfrac{x}{x^2-1}$ е:`,
          options: ['0', '1', '2', '3'],
          correctIndex: 3,
          explanation: t`Вертикални асимптоти са правите $x=1$ и $x=-1$ (знаменателят се анулира, а числителят — не). Тъй като $\displaystyle\lim_{x\to\pm\infty}f(x)=0$, правата $y=0$ е хоризонтална асимптота. Общо 3.`
        },
        {
          id: 'd26-q11', number: 11, kind: 'choice', points: 4,
          prompt: 'Сладкарница предлага четири вида понички с различен пълнеж: с шоколад, с ванилия, с карамел и с ябълка. Клиент купува кутия с 6 понички. По колко различни начина може да напълни кутията, ако няма значение как са подредени поничките и може да взема по няколко от един вид?',
          options: ['24', '30', '84', '256'],
          correctIndex: 2,
          explanation: t`Това са комбинации с повторение на 4 елемента от 6-и клас: $\bar{C}_4^{6}=C_{4+6-1}^{6}=C_9^6=C_9^3=84$.`
        },
        {
          id: 'd26-q12', number: 12, kind: 'choice', points: 4,
          prompt: t`Успоредник е с остър ъгъл $\alpha$ и със страни с дължини $a$ cm и $b$ cm. Обемът $V$ на ротационното тяло, получено при въртенето на успоредника на $360^\circ$ около страната с дължина $a$ cm, е равен на:`,
          options: [t`$\pi a^2 b\cos^2\alpha\ \text{cm}^3$`, t`$\pi a^2 b\sin\alpha\ \text{cm}^3$`, t`$\pi a b^2\sin^2\alpha\ \text{cm}^3$`, t`$\pi a b^2\cos\alpha\ \text{cm}^3$`],
          correctIndex: 2,
          explanation: t`Тялото е цилиндър с радиус височината към $a$, т.е. $r=b\sin\alpha$, и образуваща $a$ (конусът, който се „отрязва“ от единия край, се добавя от другия). Затова $V=\pi r^2a=\pi ab^2\sin^2\alpha$.`
        },
        {
          id: 'd26-q13', number: 13, kind: 'choice', points: 4,
          prompt: t`За кои стойности на реалното число $k$ функцията $f(x)=kx^3+3x^2+kx+1$ е растяща в интервала $(-\infty;\,\infty)$?`,
          options: [t`$k\in\left(-\infty;\,-\sqrt{3}\,\right]$`, t`$k\in\left[\sqrt{3};\,\infty\right)$`, t`$k\in\left[-\sqrt{3};\,\sqrt{3}\,\right]$`, t`$k\in\left(0;\,\sqrt{3}\,\right]$`],
          correctIndex: 1,
          explanation: t`Трябва $f'(x)=3kx^2+6x+k\ge 0$ за всяко $x$. Това изисква $k>0$ и дискриминанта $36-12k^2\le 0$, т.е. $k^2\ge 3$. Следователно $k\ge\sqrt{3}$.`
        },
        {
          id: 'd26-q14', number: 14, kind: 'choice', points: 4,
          prompt: t`В таблицата е дадено разпределението на случайната величина $X$. Математическото очакване на $X$ е равно на:`,
          stimulus: [
            {
              kind: 'table',
              head: [t`$x$`, t`$-2$`, '$0$', '$1$', '$3$'],
              rows: [[t`$P(X=x)$`, t`$\dfrac{1}{4}$`, t`$\mu$`, t`$\dfrac{3}{5}$`, t`$2\mu$`]]
            }
          ],
          options: [t`$-\dfrac{1}{5}$`, t`$\dfrac{1}{5}$`, t`$\dfrac{2}{5}$`, t`$\dfrac{4}{5}$`],
          correctIndex: 2,
          explanation: t`Сборът от вероятностите е 1: $\dfrac{1}{4}+3\mu+\dfrac{3}{5}=1$, откъдето $\mu=\dfrac{1}{20}$. Тогава $E(X)=-2\cdot\dfrac{1}{4}+0+1\cdot\dfrac{3}{5}+3\cdot\dfrac{2}{20}=-\dfrac{1}{2}+\dfrac{3}{5}+\dfrac{3}{10}=\dfrac{2}{5}$.`
        },
        {
          id: 'd26-q15', number: 15, kind: 'choice', points: 4,
          prompt: 'Фирма А произвежда 1% некачествени детайли за коли, а фирма Б — 2%. Клиент поръчва детайл в магазин, в който 80% от детайлите са на фирма А, а останалите — на фирма Б. Ако закупен детайл е некачествен, вероятността да е произведен от фирма А е:',
          options: [t`$\dfrac{1}{125}$`, t`$\dfrac{3}{250}$`, t`$\dfrac{1}{3}$`, t`$\dfrac{2}{3}$`],
          correctIndex: 3,
          explanation: t`По формулата на Бейс: $P(A\mid H)=\dfrac{0{,}8\cdot 0{,}01}{0{,}8\cdot 0{,}01+0{,}2\cdot 0{,}02}=\dfrac{0{,}008}{0{,}012}=\dfrac{2}{3}$.`
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
          id: 'd26-q16', number: 16, kind: 'open', points: 15,
          prompt: t`В правоъгълна координатна система са дадени точките $A(-4;\,4)$ и $B(10;\,2)$ и правата $l:\ x-y+8=0$.
а) Точка $C$, различна от точка $A$, лежи на правата $l$ и на окръжността $k$ с диаметър отсечката $AB$. Намерете каноничното уравнение на $k$ и координатите на точката $C$.
б) През средата на отсечката $AB$ е построена права $p$, успоредна на $l$. Намерете общото уравнение на $p$ и разстоянието между правите $p$ и $l$.`,
          criteria: [
            { label: t`а) Средата на $AB$: $O(3;\,3)$`, points: 1 },
            { label: t`а) $AB=10\sqrt{2}$`, points: 1 },
            { label: t`а) $k:\ (x-3)^2+(y-3)^2=50$`, points: 1 },
            { label: t`а) Системата $y=x+8$, $(x-3)^2+(y-3)^2=50$`, points: 1 },
            { label: t`а) Свеждане до $x^2+2x-8=0$ и решенията $x_1=-4,\ x_2=2$, $y_1=4,\ y_2=10$`, points: 4 },
            { label: t`а) Точка $C(2;\,10)$`, points: 1 },
            { label: t`б) Общото уравнение $p:\ x-y=0$`, points: 3 },
            { label: t`б) Разстоянието между $p$ и $l$ е $4\sqrt{2}$`, points: 3 }
          ],
          modelAnswer: t`а) Средата на $AB$ е $O(3;\,3)$: $x_O=\dfrac{-4+10}{2}=3$, $y_O=\dfrac{4+2}{2}=3$. $AB=\sqrt{14^2+2^2}=10\sqrt{2}$, затова радиусът е $5\sqrt{2}$ и $k:\ (x-3)^2+(y-3)^2=50$.
Точката $C$ е решение на системата $y=x+8$, $(x-3)^2+(y-3)^2=50$: $(x-3)^2+(x+5)^2=50\iff x^2+2x-8=0$, $x_1=-4$, $x_2=2$, $y_1=4$, $y_2=10$. Първото решение е точка $A$, второто — $C(2;\,10)$.
б) $p\parallel l\Rightarrow p:\ x-y+c=0$. От $O(3;\,3)\in p$ следва $c=0$, т.е. $p:\ x-y=0$. Разстоянието между $p$ и $l$ е разстоянието от $O$ до $l$. Правата $t\perp l$ през $O$ е $t:\ x+y-6=0$; $l\cap t=P(-1;\,7)$ и $OP=\sqrt{4^2+4^2}=4\sqrt{2}$.`
        },
        {
          id: 'd26-q17', number: 17, kind: 'open', points: 15,
          prompt: t`Дадена е функцията $f(x)=x^3+3x^2-3mx+5$, където $m$ е реално число.
а) Ако точката $A(2;\,7)$ лежи на графиката на $f(x)$, решете уравнението $f(x)=0$.
б) Ако $m=3$, определете интервалите на монотонност, локалните екстремуми на функцията $f(x)$ и нейната най-малка стойност в интервала $x\in[-4;\,0]$.
в) Ако $m=3$, намерете $f''(x)$ и пресметнете границата $\displaystyle\lim_{x\to\infty}\left(f''\!\left(\dfrac{1}{x}\right)-5\right)^{x}$.`,
          criteria: [
            { label: t`а) $f(2)=7\Rightarrow m=3$`, points: 1 },
            { label: t`а) $x^3+3x^2-9x+5=0\iff(x-1)^2(x+5)=0$`, points: 2 },
            { label: t`а) Решенията $x_{1,2}=1$, $x_3=-5$`, points: 1 },
            { label: t`б) $f'(x)=3x^2+6x-9$`, points: 1 },
            { label: t`б) $f'(x)=3(x-1)(x+3)$ или намерени критичните точки`, points: 1 },
            { label: t`б) $f$ расте при $x\in(-\infty;\,-3)$ и при $x\in(1;\,+\infty)$`, points: 1 },
            { label: t`б) $f$ намалява при $x\in(-3;\,1)$`, points: 1 },
            { label: t`б) $f_{\max}(-3)=32$, $f_{\min}(1)=0$`, points: 1 },
            { label: t`б) Монотонност в $[-4;\,0]$, $f(-4)=25$, $f(0)=5$ и $\displaystyle\min_{[-4;0]}f(x)=f(0)=5$`, points: 2 },
            { label: t`в) $f''(x)=6x+6$`, points: 1 },
            { label: t`в) $f''\!\left(\frac{1}{x}\right)-5=\frac{6}{x}+1$`, points: 1 },
            { label: t`в) Границата е $e^6$`, points: 2 }
          ],
          modelAnswer: t`а) $f(2)=8+12-6m+5=7\Rightarrow m=3$. Тогава $x^3+3x^2-9x+5=0\iff(x-1)(x^2+4x-5)=0\iff(x-1)^2(x+5)=0$. Решенията са $x_{1,2}=1$, $x_3=-5$.
б) $f(x)=x^3+3x^2-9x+5$, $f'(x)=3x^2+6x-9=3(x-1)(x+3)$. При $x\in(-\infty;\,-3)$ $f$ расте, при $x\in(-3;\,1)$ намалява, при $x\in(1;\,+\infty)$ расте. $f_{\max}(-3)=32$, $f_{\min}(1)=0$.
В $[-4;\,0]$: при $x\in[-4;\,-3]$ $f$ расте, при $x\in[-3;\,0]$ намалява; $f(-4)=25$, $f(0)=5$, затова $\displaystyle\min_{[-4;0]}f(x)=f(0)=5$.
в) $f''(x)=6x+6$, $f''\!\left(\dfrac{1}{x}\right)-5=\dfrac{6}{x}+1$ и $\displaystyle\lim_{x\to\infty}\left(1+\dfrac{6}{x}\right)^{x}=\lim_{x\to\infty}\left[\left(1+\dfrac{1}{x/6}\right)^{x/6}\right]^{6}=e^6$.`
        },
        {
          id: 'd26-q18', number: 18, kind: 'open', points: 15,
          prompt: t`В триъгълната пирамида $ABCD$ ръбът $CD$ е перпендикулярен на равнината $(ABC)$, $AC=BC=2$ cm и $AB=CD$.
а) Ако $AB=2x$, докажете, че обемът на пирамидата се изразява с функцията $V(x)=\dfrac{2}{3}x^2\sqrt{4-x^2}$, $x\in(0;\,2)$, и намерете максималния възможен обем на пирамидата.
б) Ако $\triangle ABC$ е равностранен и ъгълът между правата $AD$ и равнината $(BCD)$ е $\alpha$, намерете $\operatorname{tg}\alpha$.`,
          criteria: [
            { label: t`а) $x\in(0;\,2)$`, points: 1 },
            { label: t`а) $CM=\sqrt{4-x^2}$ cm ($M$ — средата на $AB$)`, points: 1 },
            { label: t`а) $V(x)=\dfrac{2}{3}x^2\sqrt{4-x^2}$ cm³`, points: 2 },
            { label: t`а) $V'(x)=\dfrac{-6x\left(x-\frac{2\sqrt{6}}{3}\right)\left(x+\frac{2\sqrt{6}}{3}\right)}{3\sqrt{4-x^2}}$`, points: 2 },
            { label: t`а) Монотонност: $V$ расте в $\left(0;\,\frac{2\sqrt{6}}{3}\right)$ и намалява в $\left(\frac{2\sqrt{6}}{3};\,2\right)$`, points: 2 },
            { label: t`а) $\max V(x)=V\!\left(\frac{2\sqrt{6}}{3}\right)=\dfrac{32\sqrt{3}}{27}$ cm³`, points: 2 },
            { label: t`б) Построяване на проекцията на $AD$ в $(BCD)$ и обосновка`, points: 2 },
            { label: t`б) $\sphericalangle ADE=\alpha$`, points: 1 },
            { label: t`б) Катетите на $\triangle ADE$`, points: 1 },
            { label: t`б) $\operatorname{tg}\alpha=\dfrac{\sqrt{15}}{5}$`, points: 1 }
          ],
          modelAnswer: t`а) Нека $M$ е средата на $AB$; $\triangle AMC$ и $\triangle CMD$ са правоъгълни. Тъй като $AM<AC$, $x\in(0;\,2)$, а $CM=\sqrt{4-x^2}$ cm. Тогава $V(x)=\dfrac{1}{3}S_{\triangle ABC}\cdot CD=\dfrac{1}{3}\cdot x\sqrt{4-x^2}\cdot 2x=\dfrac{2}{3}x^2\sqrt{4-x^2}$ cm³.
$V(x)=\dfrac{2}{3}\sqrt{x^4(4-x^2)}$, $V'(x)=\dfrac{16x-6x^3}{3\sqrt{4-x^2}}=\dfrac{-6x\left(x-\frac{2\sqrt{6}}{3}\right)\left(x+\frac{2\sqrt{6}}{3}\right)}{3\sqrt{4-x^2}}$. В $(0;\,2)$ $V$ расте при $x\in\left(0;\,\frac{2\sqrt{6}}{3}\right)$ и намалява при $x\in\left(\frac{2\sqrt{6}}{3};\,2\right)$, затова $\max V(x)=V\!\left(\frac{2\sqrt{6}}{3}\right)=\dfrac{32\sqrt{3}}{27}$ cm³.
б) Построяваме $AE$ — височина и медиана в $\triangle ABC$. Тогава $AE\perp(BCD)$, проекцията на $AD$ в $(BCD)$ е $ED$, $\sphericalangle AED=90^\circ$ и $\sphericalangle ADE=\alpha$. При страна 2: $AE=\sqrt{3}$, $ED=\sqrt{1^2+2^2}=\sqrt{5}$ и $\operatorname{tg}\alpha=\dfrac{AE}{ED}=\dfrac{\sqrt{3}}{\sqrt{5}}=\dfrac{\sqrt{15}}{5}$.`
        }
      ]
    }
  ]
};
