import type { ExamPaper } from '../../lib/examPaperScoring';

/**
 * НВО по математика в края на X клас — 18.06.2021 г. (17 задачи, 90 минути, 50 точки:
 * 15 задачи по 2 т. и две задачи със свободен отговор по 10 т.).
 * Условия, ключ и точки — преписани от официалния PDF на МОН (officialSourceUrl).
 * Примерните решения на 16. и 17. са от същия документ. Обясненията към 1.–15. са на StudyBG
 * и са проверени спрямо ключа.
 */

const t = String.raw;

export const NVO10_MATH_2021: ExamPaper = {
  id: 'official-nvo10-math-2021',
  title: 'НВО 10. клас — математика, 18 юни 2021',
  exam: 'НВО 10',
  subject: 'Математика',
  kind: 'official',
  officialSourceUrl: 'https://www.mon.bg/nfs/2021/06/nvo-math_10kl_18062021.pdf',
  year: 2021,
  durationMinutes: 90,
  maxPoints: 50,
  gradeScale: null,
  note:
    'Този вариант е от 50 точки: задачите 1.–15. носят по 2 т., а 16. и 17. — по 10 т.; 90 минути. Условията и ключът са официалните на МОН. Решенията на 16. и 17. са примерните решения от МОН; обясненията към 1.–15. са на StudyBG.',
  sections: [
    {
      id: 'choice',
      title: 'Задачи с избираем отговор (30 т.)',
      instructions: 'Изберете един верен отговор. Всяка задача носи 2 точки.',
      questions: [
        {
          id: 'm21-q1', number: 1, kind: 'choice', points: 2,
          prompt: t`Правилната подредба на числата $7,\ 4\sqrt{3},\ \sqrt{200}$ във възходящ ред е:`,
          options: [
            t`$\sqrt{200},\ 4\sqrt{3},\ 7$`,
            t`$7,\ 4\sqrt{3},\ \sqrt{200}$`,
            t`$\sqrt{200},\ 7,\ 4\sqrt{3}$`,
            t`$4\sqrt{3},\ 7,\ \sqrt{200}$`
          ],
          correctIndex: 3,
          explanation: t`Сравняваме квадратите: $7^2=49$, $(4\sqrt{3})^2=48$, $(\sqrt{200})^2=200$. Във възходящ ред: $4\sqrt{3},\ 7,\ \sqrt{200}$.`
        },
        {
          id: 'm21-q2', number: 2, kind: 'choice', points: 2,
          prompt: t`Стойността на израза $\sqrt{\left(2\sqrt{6}-5\right)^2}-\left(-\sqrt{6}\right)^3$ е:`,
          options: [t`$5+4\sqrt{6}$`, t`$-5+8\sqrt{6}$`, t`$5-8\sqrt{6}$`, t`$-5-4\sqrt{6}$`],
          correctIndex: 0,
          explanation: t`$2\sqrt{6}=\sqrt{24}<5$, затова $\sqrt{(2\sqrt{6}-5)^2}=|2\sqrt{6}-5|=5-2\sqrt{6}$. Освен това $(-\sqrt{6})^3=-6\sqrt{6}$. Стойността е $5-2\sqrt{6}+6\sqrt{6}=5+4\sqrt{6}$.`
        },
        {
          id: 'm21-q3', number: 3, kind: 'choice', points: 2,
          prompt: t`Ако $x_1$ и $x_2$ са корените на уравнението $x^2+5x-2=0$, то стойността на израза $3x_1+3x_2+2x_1x_2$ е:`,
          options: [t`$-19$`, t`$-11$`, '11', '19'],
          correctIndex: 0,
          explanation: t`По формулите на Виет $x_1+x_2=-5$ и $x_1x_2=-2$. Тогава $3\cdot(-5)+2\cdot(-2)=-19$.`
        },
        {
          id: 'm21-q4', number: 4, kind: 'choice', points: 2,
          prompt: t`Множеството от решенията на неравенството $\dfrac{2x}{x^2-9}\le 0$ е:`,
          options: [
            t`$x\in(-\infty;-3)\cup[0;3)$`,
            t`$x\in(-\infty;-3]\cup[0;3]$`,
            t`$x\in(-3;0]\cup(3;+\infty)$`,
            t`$x\in[-3;0]\cup[3;+\infty)$`
          ],
          correctIndex: 0,
          explanation: t`$\dfrac{2x}{(x-3)(x+3)}\le 0$. Критичните точки са $-3,\ 0,\ 3$; числата $\pm 3$ се изключват (знаменателят е 0), а $0$ се включва. По метода на интервалите изразът е неположителен при $x<-3$ и при $0\le x<3$.`
        },
        {
          id: 'm21-q5', number: 5, kind: 'choice', points: 2,
          prompt: t`Броят на корените на уравнението $(x^2-4)\sqrt{x-5}=0$ е:`,
          options: ['0', '1', '3', '4'],
          correctIndex: 1,
          explanation: t`Допустими са $x\ge 5$. Корените $x=\pm 2$ на първия множител не са допустими, а $\sqrt{x-5}=0$ дава $x=5$. Уравнението има един корен.`
        },
        {
          id: 'm21-q6', number: 6, kind: 'choice', points: 2,
          prompt: t`На кой чертеж е представена графиката на функцията $f(x)=6-3x$?`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2021-q6-four-graphs', alt: 'Четири графики на линейни функции, означени с А, Б, В и Г.' }],
          options: ['чертеж А)', 'чертеж Б)', 'чертеж В)', 'чертеж Г)'],
          correctIndex: 0,
          explanation: t`$f(0)=6$, затова графиката пресича оста $y$ в $6$, а от $6-3x=0$ — оста $x$ в $2$. Функцията е намаляваща ($k=-3<0$). Това е чертеж А).`
        },
        {
          id: 'm21-q7', number: 7, kind: 'choice', points: 2,
          prompt: t`На чертежа е дадена графиката на функцията $f(x)=ax^2+bx+c,\ x\in\mathbb{R}$. Най-голямата стойност на функцията $f(x)$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2021-q7-parabola', alt: 'Парабола с клони надолу и връх в точката (3; 1).' }],
          options: ['4', '3', '2', '1'],
          correctIndex: 3,
          explanation: t`Параболата е с клони надолу, затова най-голямата стойност е ординатата на върха $(3;\,1)$, т.е. $1$.`
        },
        {
          id: 'm21-q8', number: 8, kind: 'choice', points: 2,
          prompt: t`За аритметичната прогресия $a_1,\ a_2,\ a_3,\ \dots,\ a_n,\ n\in\mathbb{N}$, е известно, че $a_6-a_4=6$. Разликата на прогресията е равна на:`,
          options: ['12', '6', '3', '2'],
          correctIndex: 2,
          explanation: t`$a_6-a_4=(a_1+5d)-(a_1+3d)=2d=6$, откъдето $d=3$.`
        },
        {
          id: 'm21-q9', number: 9, kind: 'choice', points: 2,
          prompt: t`Стойността на израза $\dfrac{\sqrt{2}\sin 45^\circ+\operatorname{tg}^2 60^\circ}{\sin^2 45^\circ+\cos^2 45^\circ}$ е:`,
          options: [t`$\dfrac{1}{4}$`, t`$2\dfrac{\sqrt{2}}{3}$`, t`$3\dfrac{\sqrt{2}}{2}$`, '4'],
          correctIndex: 3,
          explanation: t`$\sqrt{2}\cdot\dfrac{\sqrt{2}}{2}=1$ и $\operatorname{tg}^2 60^\circ=3$, а знаменателят е $\sin^2 45^\circ+\cos^2 45^\circ=1$. Стойността е $1+3=4$.`
        },
        {
          id: 'm21-q10', number: 10, kind: 'choice', points: 2,
          prompt: 'На клавиатурата на телефона има 10 цифри от 0 до 9. Вероятността случайно избрана цифра да е четна и по-голяма от 3 е:',
          options: ['0,2', '0,3', '0,4', '0,5'],
          correctIndex: 1,
          explanation: t`Благоприятни са цифрите $4,\ 6,\ 8$ — три от общо 10. Вероятността е $\dfrac{3}{10}=0{,}3$.`
        },
        {
          id: 'm21-q11', number: 11, kind: 'choice', points: 2,
          prompt: 'Кое число трябва да се добави към данните 11; 1; 12; 7; 2; 10; 3 така, че медианата на получения статистически ред да е 8?',
          options: ['7', '8', '9', '11'],
          correctIndex: 2,
          explanation: t`Подредени, данните са $1,\ 2,\ 3,\ 7,\ 10,\ 11,\ 12$. С още едно число стават 8 и медианата е средното на 4-тото и 5-тото. За да е $8$, между $7$ и $10$ трябва да стои $9$: $\dfrac{7+9}{2}=8$.`
        },
        {
          id: 'm21-q12', number: 12, kind: 'choice', points: 2,
          prompt: t`Ширината на реките по продължение на течението варира. Определете ширината на реката между точките $B$ и $C$ (в метри), ако $AB=40$ m, $BD=32$ m и $CE=60$ m.`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2021-q12-river', alt: 'Река между точките B и C; AB = 40 m, BD = 32 m, CE = 60 m.' }],
          options: ['28 m', '35 m', '48 m', '75 m'],
          correctIndex: 1,
          explanation: t`$BD\parallel CE$ (и двете са перпендикулярни на $AC$), затова $\triangle ABD\sim\triangle ACE$ и $\dfrac{AB}{AC}=\dfrac{BD}{CE}=\dfrac{32}{60}$. Тогава $AC=\dfrac{40\cdot 60}{32}=75$ m и $BC=75-40=35$ m.`
        },
        {
          id: 'm21-q13', number: 13, kind: 'choice', points: 2,
          prompt: t`На чертежа хордите $AE$ и $DF$ се пресичат в точка $P$. Ако $\sphericalangle ADF=20^\circ$ и $\sphericalangle DFE=30^\circ$, то мярката на $\sphericalangle DPE$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2021-q13-chords', alt: 'Хорди AE и DF, пресичащи се в P; ъгъл ADF = 20°, ъгъл DFE = 30°.' }],
          options: [t`$25^\circ$`, t`$40^\circ$`, t`$50^\circ$`, t`$60^\circ$`],
          correctIndex: 2,
          explanation: t`Вписаните ъгли дават $\overset{\frown}{AF}=40^\circ$ и $\overset{\frown}{DE}=60^\circ$. Ъгълът между две пресичащи се хорди е полусборът на дъгите: $\sphericalangle DPE=\dfrac{60^\circ+40^\circ}{2}=50^\circ$.`
        },
        {
          id: 'm21-q14', number: 14, kind: 'choice', points: 2,
          prompt: t`В правоъгълния $\triangle ABC$ хипотенузата $AC=\sqrt{13}$ cm и $AB=3$ cm. Намерете $\operatorname{tg}\sphericalangle BAC$.`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2021-q14-right-triangle', alt: 'Правоъгълен триъгълник ABC с прав ъгъл при B; AB = 3 cm, AC = √13 cm.' }],
          options: [t`$\dfrac{3}{2}$`, t`$\dfrac{2}{\sqrt{13}}$`, t`$\dfrac{3}{\sqrt{13}}$`, t`$\dfrac{2}{3}$`],
          correctIndex: 3,
          explanation: t`$BC=\sqrt{13-9}=2$ cm. Тогава $\operatorname{tg}\sphericalangle BAC=\dfrac{BC}{AB}=\dfrac{2}{3}$.`
        },
        {
          id: 'm21-q15', number: 15, kind: 'choice', points: 2,
          prompt: t`В успоредник $ABCD$ височината от върха $D$ към страната $AB$ е равна на 3 cm. Ако $AD=BD=5$ cm, то лицето на успоредника $ABCD$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2021-q15-parallelogram', alt: 'Успоредник ABCD с височина DH = 3 cm и AD = BD = 5 cm.' }],
          options: [t`$8\ \text{cm}^2$`, t`$12\ \text{cm}^2$`, t`$24\ \text{cm}^2$`, t`$32\ \text{cm}^2$`],
          correctIndex: 2,
          explanation: t`$\triangle ABD$ е равнобедрен, затова височината $DH$ е и медиана. $AH=\sqrt{25-9}=4$ cm, $AB=8$ cm и $S=AB\cdot DH=8\cdot 3=24\ \text{cm}^2$.`
        }
      ]
    },
    {
      id: 'open',
      title: 'Задачи със свободен отговор (20 т.)',
      instructions:
        'Запишете пълното решение с обосновка. След предаване го сравнете с примерното решение на МОН и се оценете по критериите. Всяко друго вярно и пълно решение носи максимален брой точки.',
      questions: [
        {
          id: 'm21-q16', number: 16, kind: 'open', points: 10,
          prompt: 'Търговец купил два вида стоки от производител. След като увеличил цената им с по 20 лв., отношението на цените им станало 8 : 5. В края на сезона, при разпродажбата на стоката си, той намалил настоящата им цена с по 30 лв. и отношението на цените им станало 5 : 2. На каква цена е купил тези стоки търговецът и колко пъти единият вид стока е бил по-скъп от другия?',
          criteria: [
            { label: t`Означения $x$ и $y$, $x>0$ и $y>0$`, points: 1 },
            { label: t`Системата $\dfrac{x+20}{y+20}=\dfrac{8}{5}$, $\dfrac{x+20-30}{y+20-30}=\dfrac{5}{2}$`, points: 3 },
            { label: t`Линейната система $5x-8y=60$, $2x-5y=-30$`, points: 3 },
            { label: t`$x=60$ лв., $y=30$ лв.`, points: 2 },
            { label: 'Единият вид стока е 2 пъти по-скъп от другия', points: 1 }
          ],
          modelAnswer: t`Означаваме с $x$ и $y$ цените на двата вида стоки в началото, $x>0$ и $y>0$. Получаваме системата
$$\begin{cases}\dfrac{x+20}{y+20}=\dfrac{8}{5}\\[2mm] \dfrac{x+20-30}{y+20-30}=\dfrac{5}{2}\end{cases}\iff\begin{cases}5(x+20)=8(y+20)\\ 2(x-10)=5(y-10)\end{cases}\iff\begin{cases}5x-8y=60\\ 2x-5y=-30\end{cases}$$
Решението е $x=60$ лв., $y=30$ лв. Цените на стоките са 60 лв. и 30 лв., а единият вид стока е 2 пъти по-скъп от другия.`
        },
        {
          id: 'm21-q17', number: 17, kind: 'open', points: 10,
          prompt: t`В $\triangle ABC$ е вписана окръжност с център точка $O$. Ако $AO=3$ cm, $BO=5$ cm и $\sphericalangle ACB=60^\circ$, намерете:
А) дължината на страната $AB$;
Б) радиуса на описаната около $\triangle ABC$ окръжност;
В) радиуса на вписаната в $\triangle ABC$ окръжност.`,
          criteria: [
            { label: 'А) AB = 7 cm', points: 4 },
            { label: t`Б) $R=\dfrac{7\sqrt{3}}{3}$ cm`, points: 2 },
            { label: t`В) $r=\dfrac{15\sqrt{3}}{14}$ cm`, points: 4 }
          ],
          modelAnswer: t`А) Точка $O$ е центърът на вписаната окръжност, т.е. пресечната точка на ъглополовящите. Тогава $\sphericalangle OAB=\dfrac{1}{2}\sphericalangle CAB$, $\sphericalangle OBA=\dfrac{1}{2}\sphericalangle CBA$ и
$\sphericalangle AOB=180^\circ-\dfrac{1}{2}(\sphericalangle CAB+\sphericalangle CBA)=180^\circ-\dfrac{1}{2}(180^\circ-\sphericalangle ACB)=90^\circ+30^\circ=120^\circ$.
От косинусовата теорема за $\triangle AOB$: $AB^2=3^2+5^2-2\cdot 3\cdot 5\cdot\left(-\dfrac{1}{2}\right)=49$, $AB=7$ cm.
Б) От синусовата теорема за $\triangle ABC$: $\dfrac{AB}{\sin\sphericalangle ACB}=2R$, откъдето $R=\dfrac{7}{2\cdot\frac{\sqrt{3}}{2}}=\dfrac{7\sqrt{3}}{3}$ cm.
В) $S_{\triangle AOB}=\dfrac{1}{2}\cdot AO\cdot BO\cdot\sin 120^\circ=\dfrac{1}{2}\cdot 3\cdot 5\cdot\dfrac{\sqrt{3}}{2}=\dfrac{15\sqrt{3}}{4}\ \text{cm}^2$. Радиусът на вписаната окръжност е височината на $\triangle AOB$ към $AB$: $\dfrac{15\sqrt{3}}{4}=\dfrac{1}{2}\cdot 7\cdot r$, откъдето $r=\dfrac{15\sqrt{3}}{14}$ cm.`
        }
      ]
    }
  ]
};
