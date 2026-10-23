import type { ExamPaper } from '../../lib/examPaperScoring';

/**
 * ДЗИ по математика — 21.05.2021 г., вариант 1 (формат до 2021 г.: 28 задачи в два модула).
 * Условия, ключ, точки и критерии — преписани от официалния PDF на МОН (officialSourceUrl).
 * Примерните решения на 26.–28. са от същия документ. Обясненията към 1.–25. са на StudyBG
 * и са проверени спрямо ключа.
 *
 * Отговорите на 21., 22. и 25. са изрази (корен, интервал, дроб с корен) — тях ученикът
 * сравнява с еталона; 23. и 24. се проверяват автоматично.
 * Оценката не се изчислява: МОН определя скалата за превръщане на точките за всяка сесия.
 */

const t = String.raw;

export const DZI_MATH_2021: ExamPaper = {
  id: 'official-dzi-math-2021',
  title: 'ДЗИ по математика — 21 май 2021',
  exam: 'ДЗИ',
  subject: 'Математика',
  kind: 'official',
  officialSourceUrl: 'https://www.mon.bg/nfs/2021/05/2dzi_matematika_v1_210521.pdf',
  year: 2021,
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: null,
  formulaSheet: 'dzi-math-2021',
  note:
    'Формат до 2021 г.: 28 задачи — модул 1 (90 минути) и модул 2 (150 минути); тук таймерът е общ, 240 минути. От 2022 г. майската матура по математика е по профилирана подготовка с 18 задачи. Условията, ключът и критериите са официалните на МОН; обясненията към 1.–25. са на StudyBG. Резултатът е в точки: скалата за превръщане в оценка се определя от МОН за всяка сесия.',
  sections: [
    {
      id: 'module1',
      title: 'Модул 1 — задачи с избираем отговор (50 т.)',
      instructions: 'Изберете един верен отговор. Задачите от 1. до 10. носят по 2 точки, а от 11. до 20. — по 3 точки. На изпита за модул 1 има 90 минути.',
      questions: [
        {
          id: 'd21-q1', number: 1, kind: 'choice', points: 2,
          prompt: t`Стойността на израза $\dfrac{2^{\frac{1}{2}}\cdot 2^{\frac{1}{3}}}{2^{\frac{2}{3}}}$ е:`,
          options: [t`$\sqrt[6]{2}$`, t`$\sqrt[6]{4}$`, t`$\sqrt[6]{8}$`, t`$\sqrt[6]{32}$`],
          correctIndex: 0,
          explanation: t`$2^{\frac{1}{2}+\frac{1}{3}-\frac{2}{3}}=2^{\frac{1}{6}}=\sqrt[6]{2}$.`
        },
        {
          id: 'd21-q2', number: 2, kind: 'choice', points: 2,
          prompt: t`Стойността на израза $\sqrt{21^2-15^2}-\sqrt{150}+\sqrt{\left(\sqrt{6}-3\right)^2}$ е:`,
          options: [t`$3-4\sqrt{6}$`, t`$2\sqrt{6}-3$`, '2', '3'],
          correctIndex: 3,
          explanation: t`$\sqrt{441-225}=\sqrt{216}=6\sqrt{6}$, $\sqrt{150}=5\sqrt{6}$, а $\sqrt{(\sqrt{6}-3)^2}=|\sqrt{6}-3|=3-\sqrt{6}$. Сборът е $6\sqrt{6}-5\sqrt{6}+3-\sqrt{6}=3$.`
        },
        {
          id: 'd21-q3', number: 3, kind: 'choice', points: 2,
          prompt: t`Множеството от НЕДОПУСТИМИТЕ стойности на израза $\dfrac{x-3}{x^2+9}-\dfrac{x-2}{x^2-4}$ е:`,
          options: [t`$\{-2;\,2\}$`, t`$\{-2;\,3\}$`, t`$\{-3;\,2;\,3\}$`, t`$\{-3;\,-2;\,2;\,3\}$`],
          correctIndex: 0,
          explanation: t`$x^2+9>0$ за всяко $x$, а $x^2-4=0$ при $x=\pm 2$. Недопустими са само $-2$ и $2$.`
        },
        {
          id: 'd21-q4', number: 4, kind: 'choice', points: 2,
          prompt: t`Решенията на неравенството $(x-6)^2(x-1)(x+5)\le 0$ са:`,
          options: [t`$x\in[-5;\,1]\cup\{6\}$`, t`$x\in(-\infty;\,-5]\cup[1;\,6]$`, t`$x\in(-\infty;\,-6]\cup[-1;\,5]$`, t`$x\in[-1;\,5]\cup\{6\}$`],
          correctIndex: 0,
          explanation: t`$(x-6)^2\ge 0$ и е 0 само при $x=6$ — тогава неравенството е изпълнено. При $x\ne 6$ остава $(x-1)(x+5)\le 0$, т.е. $x\in[-5;\,1]$.`
        },
        {
          id: 'd21-q5', number: 5, kind: 'choice', points: 2,
          prompt: 'С колко процента трябва да се намали числото 72, за да се получи числото 63?',
          options: [t`$\dfrac{1}{8}\,\%$`, '8 %', t`$12\dfrac{1}{2}\,\%$`, t`$13\dfrac{1}{2}\,\%$`],
          correctIndex: 2,
          explanation: t`Намалението е $72-63=9$, а $\dfrac{9}{72}\cdot 100\%=12{,}5\%$.`
        },
        {
          id: 'd21-q6', number: 6, kind: 'choice', points: 2,
          prompt: t`Най-големият корен на уравнението $\left(x^2-4x\right)^2+7\left(x^2-4x\right)+12=0$ е:`,
          options: [t`$-4$`, '2', '3', '4'],
          correctIndex: 2,
          explanation: t`Полагаме $t=x^2-4x$: $t^2+7t+12=0$, $t=-3$ или $t=-4$. От $x^2-4x+3=0$: $x=1$ или $x=3$; от $x^2-4x+4=0$: $x=2$. Най-големият корен е 3.`
        },
        {
          id: 'd21-q7', number: 7, kind: 'choice', points: 2,
          prompt: t`Ако $x_1$ и $x_2$ са корените на уравнението $6x^2-3x-1=0$, то НЕ е вярно, че:`,
          options: [t`$x_1+x_2=\dfrac{1}{2}$`, t`$x_1\cdot x_2<0$`, t`$x_1+x_2>0$`, t`$\dfrac{1}{x_1}+\dfrac{1}{x_2}=\dfrac{1}{6}$`],
          correctIndex: 3,
          explanation: t`По Виет $x_1+x_2=\dfrac{1}{2}>0$ и $x_1x_2=-\dfrac{1}{6}<0$. Тогава $\dfrac{1}{x_1}+\dfrac{1}{x_2}=\dfrac{x_1+x_2}{x_1x_2}=-3$, а не $\dfrac{1}{6}$.`
        },
        {
          id: 'd21-q8', number: 8, kind: 'choice', points: 2,
          prompt: t`Стойността на израза $\dfrac{\operatorname{tg}405^\circ}{\sqrt{2}\operatorname{tg}^2 765^\circ}$ е:`,
          options: [t`$\dfrac{\sqrt{2}}{2}$`, t`$\dfrac{\sqrt{6}}{6}$`, t`$\dfrac{\sqrt{6}}{2}$`, '1'],
          correctIndex: 0,
          explanation: t`Периодът на тангенса е $180^\circ$: $\operatorname{tg}405^\circ=\operatorname{tg}45^\circ=1$ и $\operatorname{tg}765^\circ=\operatorname{tg}45^\circ=1$. Стойността е $\dfrac{1}{\sqrt{2}}=\dfrac{\sqrt{2}}{2}$.`
        },
        {
          id: 'd21-q9', number: 9, kind: 'choice', points: 2,
          prompt: t`В равнобедрения $\triangle ABC$ ($AC=BC$) е вписана окръжност с център $O$. Лъчът $AO^{\to}$ пресича страната $BC$ в точка $L$. Ако $LB=3$ cm и $LC=5$ cm, то периметърът на $\triangle ABC$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'dzi-2021-q9-isosceles', alt: 'Равнобедрен триъгълник ABC с вписана окръжност с център O; лъчът AO пресича BC в L, LC = 5, LB = 3.' }],
          options: ['20 cm', '20,8 cm', '21,4 cm', t`$\dfrac{88}{3}$ cm`],
          correctIndex: 1,
          explanation: t`$BC=AC=3+5=8$ cm. $AL$ е ъглополовяща (минава през центъра на вписаната окръжност), затова $\dfrac{CL}{LB}=\dfrac{AC}{AB}$: $\dfrac{5}{3}=\dfrac{8}{AB}$, $AB=4{,}8$ cm. Периметърът е $8+8+4{,}8=20{,}8$ cm.`
        },
        {
          id: 'd21-q10', number: 10, kind: 'choice', points: 2,
          prompt: t`В $\triangle ABC$ $AB=8$ cm, $BC=5$ cm и $AC=10$ cm. Ако точка $M$ е средата на страната $AB$, а точката $N$ от страната $AC$ е такава, че $\sphericalangle AMN=\sphericalangle ACB$, то намерете дължината на $MN$.`,
          options: ['2 cm', '2,5 cm', '3,2 cm', '4 cm'],
          correctIndex: 0,
          explanation: t`$\triangle AMN\sim\triangle ACB$ (общ ъгъл при $A$ и $\sphericalangle AMN=\sphericalangle ACB$). Тогава $\dfrac{MN}{CB}=\dfrac{AM}{AC}=\dfrac{4}{10}$ и $MN=\dfrac{4}{10}\cdot 5=2$ cm.`
        },
        {
          id: 'd21-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Графиката на коя от дадените функции има само една обща точка с абсцисната ос?',
          options: [t`$f(x)=x^2+25x+25$`, t`$f(x)=x^2+5x+25$`, t`$f(x)=x^2-10x-25$`, t`$f(x)=x^2-10x+25$`],
          correctIndex: 3,
          explanation: t`Една обща точка с $Ox$ означава дискриминанта 0. За $x^2-10x+25=(x-5)^2$: $D=100-100=0$. При останалите $D\ne 0$.`
        },
        {
          id: 'd21-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Коя от редиците НЕ е монотонна?',
          options: [t`$-2;\ -4;\ -6;\ -8$`, t`$-\dfrac{1}{3};\ -\dfrac{1}{9};\ -\dfrac{1}{27};\ -\dfrac{1}{81}$`, t`$-1;\ \dfrac{1}{2};\ -\dfrac{1}{3};\ \dfrac{1}{4}$`, t`$1;\ \dfrac{1}{2};\ \dfrac{1}{4};\ \dfrac{1}{8}$`],
          correctIndex: 2,
          explanation: t`В редицата $-1;\ \frac{1}{2};\ -\frac{1}{3};\ \frac{1}{4}$ знаците се редуват — тя ту расте, ту намалява. Останалите са намаляващи или растящи.`
        },
        {
          id: 'd21-q13', number: 13, kind: 'choice', points: 3,
          prompt: t`Сумата на първите шест члена на геометрична прогресия, за която $a_1=6$ и $q=\dfrac{1}{2}$, е равна на:`,
          options: [t`$\dfrac{198}{16}$`, t`$\dfrac{189}{16}$`, t`$\dfrac{179}{16}$`, t`$\dfrac{21}{2}$`],
          correctIndex: 1,
          explanation: t`$S_6=a_1\cdot\dfrac{1-q^6}{1-q}=6\cdot\dfrac{1-\frac{1}{64}}{\frac{1}{2}}=12\cdot\dfrac{63}{64}=\dfrac{189}{16}$.`
        },
        {
          id: 'd21-q14', number: 14, kind: 'choice', points: 3,
          prompt: t`Колко е $\cos\alpha$, ако $\operatorname{cotg}\left(\alpha-\dfrac{\pi}{2}\right)=2$ и $\alpha\in\left(\dfrac{\pi}{2};\,\pi\right)$?`,
          options: [t`$-\dfrac{2}{\sqrt{5}}$`, t`$-\dfrac{1}{\sqrt{5}}$`, t`$\dfrac{1}{\sqrt{5}}$`, t`$\dfrac{2}{\sqrt{5}}$`],
          correctIndex: 1,
          explanation: t`$\operatorname{cotg}\left(\alpha-\frac{\pi}{2}\right)=-\operatorname{tg}\alpha=2$, т.е. $\operatorname{tg}\alpha=-2$. Тогава $\cos^2\alpha=\dfrac{1}{1+\operatorname{tg}^2\alpha}=\dfrac{1}{5}$, а във II квадрант косинусът е отрицателен: $\cos\alpha=-\dfrac{1}{\sqrt{5}}$.`
        },
        {
          id: 'd21-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'С помощта на цифрите 2, 3, 4 и 5 са образувани всички възможни трицифрени числа с различни цифри. Броят на тези от тях, които НЕ се делят на 9, е:',
          options: ['6', '12', '18', '24'],
          correctIndex: 2,
          explanation: t`Числата са $V_4^3=24$. На 9 се делят тези със сбор на цифрите 9 — само от цифрите 2, 3, 4, т.е. $3!=6$ числа. Не се делят $24-6=18$.`
        },
        {
          id: 'd21-q16', number: 16, kind: 'choice', points: 3,
          prompt: t`За статистическия ред $0,\ 1,\ a,\ 2,\ b,\ 5,\ 9,\ 11$ модата е 1, а медианата е 2,5. Средноаритметичното на реда е равно на:`,
          options: ['3', '4', '6,5', '7'],
          correctIndex: 1,
          explanation: t`Редът е подреден; модата 1 означава $a=1$. Медианата на 8 числа е средното на 4-тото и 5-тото: $\dfrac{2+b}{2}=2{,}5$, $b=3$. Средноаритметичното е $\dfrac{0+1+1+2+3+5+9+11}{8}=4$.`
        },
        {
          id: 'd21-q17', number: 17, kind: 'choice', points: 3,
          prompt: t`В остроъгълния $\triangle ABC$ страната $AB=2\sqrt{3}$ cm, а радиусът на описаната около него окръжност е $R=2\sqrt{3}$ cm. Градусната мярка на $\sphericalangle ACB$ е равна на:`,
          options: [t`$30^\circ$`, t`$45^\circ$`, t`$60^\circ$`, t`$150^\circ$`],
          correctIndex: 0,
          explanation: t`От синусовата теорема $\sin\sphericalangle ACB=\dfrac{AB}{2R}=\dfrac{1}{2}$. Триъгълникът е остроъгълен, затова $\sphericalangle ACB=30^\circ$.`
        },
        {
          id: 'd21-q18', number: 18, kind: 'choice', points: 3,
          prompt: t`В правоъгълния $\triangle ABC$ ($\sphericalangle C=90^\circ$) височината $CH$ ($H\in AB$) разделя $AB$ на отсечки $AH$ и $BH$, като $BH=9\cdot AH$. Ако $CH=3\sqrt{5}$ cm, то лицето на $\triangle ABC$ е равно на:`,
          options: [t`$25\ \text{cm}^2$`, t`$75\ \text{cm}^2$`, t`$135\ \text{cm}^2$`, t`$150\ \text{cm}^2$`],
          correctIndex: 1,
          explanation: t`$CH^2=AH\cdot BH=9AH^2=45$, т.е. $AH=\sqrt{5}$, $BH=9\sqrt{5}$ и $AB=10\sqrt{5}$. Лицето е $\dfrac{10\sqrt{5}\cdot 3\sqrt{5}}{2}=75\ \text{cm}^2$.`
        },
        {
          id: 'd21-q19', number: 19, kind: 'choice', points: 3,
          prompt: t`Дължините на страните на успоредник се отнасят както $3:2$, а диагоналите му могат да са катети на правоъгълен триъгълник с хипотенуза $13\sqrt{2}$ cm. Периметърът на успоредника е:`,
          options: [t`$5\sqrt{13}$ cm`, t`$10\sqrt{13}$ cm`, '40 cm', t`$10\sqrt{26}$ cm`],
          correctIndex: 1,
          explanation: t`$d_1^2+d_2^2=(13\sqrt{2})^2=338=2a^2+2b^2$, т.е. $a^2+b^2=169$. При $a=3k$, $b=2k$: $13k^2=169$, $k=\sqrt{13}$. Периметърът е $2(3k+2k)=10\sqrt{13}$ cm.`
        },
        {
          id: 'd21-q20', number: 20, kind: 'choice', points: 3,
          prompt: t`Бедрото на равнобедрен трапец е 2 cm, малката основа е $\sqrt{2}$ cm, а ъгълът при нея е $135^\circ$. Лицето на трапеца е равно на:`,
          options: [t`$3\ \text{cm}^2$`, t`$4\ \text{cm}^2$`, t`$6\ \text{cm}^2$`, t`$8\ \text{cm}^2$`],
          correctIndex: 1,
          explanation: t`Ъгълът при голямата основа е $45^\circ$, затова височината и проекцията на бедрото са $2\sin 45^\circ=\sqrt{2}$ cm. Голямата основа е $\sqrt{2}+2\sqrt{2}=3\sqrt{2}$ cm, а лицето — $\dfrac{\sqrt{2}+3\sqrt{2}}{2}\cdot\sqrt{2}=4\ \text{cm}^2$.`
        }
      ]
    },
    {
      id: 'module2-short',
      title: 'Модул 2 — задачи с кратък отговор (20 т.)',
      instructions:
        'Всяка задача носи 4 точки. Отговорите на 23. и 24. се проверяват автоматично; отговорите на 21., 22. и 25. са изрази — сравнете ги с еталона и се оценете. На изпита за целия модул 2 има 150 минути.',
      questions: [
        {
          id: 'd21-q21', number: 21, kind: 'multi', points: 4,
          prompt: t`Пресметнете стойността на израза $A=\sqrt{3B+2C}$, където $B=\log_2\left(\log_3 81\right)$, а $C=\left(\dfrac{1}{81}\right)^{\log_{16}\frac{1}{2}}$.`,
          parts: [{ id: 'a', label: '', points: 4, prompt: t`$A=$`, answer: { type: 'self', modelAnswer: t`$A=2\sqrt{3}$` } }],
          explanation: t`$\log_3 81=4$, затова $B=\log_2 4=2$. $\log_{16}\frac{1}{2}=-\dfrac{1}{4}$, затова $C=81^{\frac{1}{4}}=3$. Тогава $A=\sqrt{6+6}=\sqrt{12}=2\sqrt{3}$.`
        },
        {
          id: 'd21-q22', number: 22, kind: 'multi', points: 4,
          prompt: t`Намерете множеството от решенията на неравенството $x^2+2x\le\dfrac{9}{x^2+2x}$.`,
          parts: [{ id: 'a', label: '', points: 4, prompt: 'Решенията:', answer: { type: 'self', modelAnswer: t`$x\in[-3;\,-2)\cup(0;\,1]$` } }],
          explanation: t`Полагаме $t=x^2+2x$ ($t\ne 0$): $t\le\dfrac{9}{t}\iff\dfrac{(t-3)(t+3)}{t}\le 0$, т.е. $t\le -3$ или $0<t\le 3$. Но $t=(x+1)^2-1\ge -1$, затова остава $0<x^2+2x\le 3$: $x^2+2x>0$ дава $x<-2$ или $x>0$, а $x^2+2x-3\le 0$ дава $-3\le x\le 1$. Следователно $x\in[-3;\,-2)\cup(0;\,1]$.`
        },
        {
          id: 'd21-q23', number: 23, kind: 'short', points: 4, answerType: 'number',
          prompt: t`Дадена е аритметична прогресия с $n$ члена, за която $a_1=1$, $a_3=13$ и $S_n=280$. Намерете броя $n$ на членовете.`,
          acceptedAnswers: ['10'],
          explanation: t`$d=\dfrac{13-1}{2}=6$ и $S_n=\dfrac{2+6(n-1)}{2}\cdot n=n(3n-2)=280$, т.е. $3n^2-2n-280=0$ и $n=10$ (другият корен е отрицателен).`
        },
        {
          id: 'd21-q24', number: 24, kind: 'short', points: 4, answerType: 'text',
          prompt: 'В купа има 4 червени и 7 черни топки. Намерете вероятността при едновременно изваждане на три топки поне една от тях да е червена. (Запишете отговора като дроб, напр. 1/2.)',
          acceptedAnswers: ['26/33'],
          explanation: t`Противоположното събитие е и трите топки да са черни: $\dfrac{C_7^3}{C_{11}^3}=\dfrac{35}{165}=\dfrac{7}{33}$. Търсената вероятност е $1-\dfrac{7}{33}=\dfrac{26}{33}$.`
        },
        {
          id: 'd21-q25', number: 25, kind: 'multi', points: 4,
          prompt: t`В $\triangle ABC$ страните $AB$, $BC$ и $AC$ са с дължини съответно $2\sqrt{2}$ cm, $\sqrt{5}$ cm и 1 cm. Ако $CC_1$ е височината през върха $C$, намерете радиуса на вписаната в $\triangle ACC_1$ окръжност.`,
          parts: [{ id: 'a', label: '', points: 4, prompt: t`$r=$`, answer: { type: 'self', modelAnswer: t`$r=\dfrac{1}{2\left(\sqrt{2}+1\right)}=\dfrac{\sqrt{2}-1}{2}$ cm` } }],
          explanation: t`От косинусовата теорема $\cos\sphericalangle A=\dfrac{8+1-5}{2\cdot 2\sqrt{2}\cdot 1}=\dfrac{\sqrt{2}}{2}$, т.е. $\sphericalangle A=45^\circ$. Тогава $\triangle ACC_1$ е правоъгълен равнобедрен с катети $\dfrac{\sqrt{2}}{2}$ и хипотенуза $AC=1$, а $r=\dfrac{a+b-c}{2}=\dfrac{\sqrt{2}-1}{2}$ cm.`
        }
      ]
    },
    {
      id: 'module2-open',
      title: 'Модул 2 — задачи със свободен отговор (30 т.)',
      instructions:
        'Запишете пълното решение с обосновка. След предаване го сравнете с примерното решение на МОН и се оценете по критериите. Всяко друго вярно и пълно решение носи максимален брой точки.',
      questions: [
        {
          id: 'd21-q26', number: 26, kind: 'open', points: 10,
          prompt: t`Дадена е функцията $f(x)=\dfrac{x-2}{2\left(\sqrt{x-1}-1\right)}+\sqrt{x-1}$. Намерете:
а) дефиниционното ѝ множество;
б) стойностите на $x$, за които $f(x)=1$.`,
          criteria: [
            { label: t`а) $x\ge 1$, $x\ne 2$, т.е. $x\in[1;\,2)\cup(2;\,\infty)$`, points: 2 },
            { label: t`б) Преобразуване до $4\sqrt{x-1}=3x-2$`, points: 2 },
            { label: t`б) Уравнението $9x^2-28x+20=0$`, points: 2 },
            { label: t`б) Корените $x_1=2$ и $x_2=\dfrac{10}{9}$`, points: 2 },
            { label: t`б) $x=2$ не е решение`, points: 1 },
            { label: t`б) $x=\dfrac{10}{9}$ е решение (с проверка или с еквивалентност)`, points: 1 }
          ],
          modelAnswer: t`а) Дефиниционното множество се определя от $x-1\ge 0$ и $\sqrt{x-1}\ne 1$: $x\in[1;\,2)\cup(2;\,\infty)$.
б) В дефиниционното множество $f(x)=1\iff x-2+2(x-1)-2\sqrt{x-1}=2\sqrt{x-1}-2\iff 4\sqrt{x-1}=3x-2$. Повдигаме на квадрат: $16(x-1)=(3x-2)^2\iff 9x^2-28x+20=0$, $x_1=2$ (не е от дефиниционното множество), $x_2=\dfrac{10}{9}$.
Проверка: $4\sqrt{\frac{10}{9}-1}=\dfrac{4}{3}=3\cdot\dfrac{10}{9}-2$ (или от $3x-2\ge 0$). Уравнението има единствен корен $x=\dfrac{10}{9}$.`
        },
        {
          id: 'd21-q27', number: 27, kind: 'open', points: 10,
          prompt: t`Дадени са изразите $A=\dfrac{1+\sin\alpha+\cos\alpha}{\sqrt{2}\cos\frac{\alpha}{2}}$ и $B=2\cos\left(45^\circ-\dfrac{\alpha}{2}\right)$. За допустимите стойности на $\alpha$ докажете, че:
а) $A=B$;
б) $B=\dfrac{1+\sqrt{7}}{2}$, ако $\operatorname{tg}\dfrac{\alpha}{2}=\sqrt{7}$ и $\alpha\in(0^\circ;\,180^\circ)$.`,
          criteria: [
            { label: t`а) $A=\dfrac{2\cos^2\frac{\alpha}{2}+2\sin\frac{\alpha}{2}\cos\frac{\alpha}{2}}{\sqrt{2}\cos\frac{\alpha}{2}}$`, points: 1 },
            { label: t`а) $=\sqrt{2}\left[\sin\left(90^\circ-\frac{\alpha}{2}\right)+\sin\frac{\alpha}{2}\right]$`, points: 1 },
            { label: t`а) $=2\sqrt{2}\sin 45^\circ\cos\left(\frac{90^\circ-\alpha}{2}\right)$`, points: 1 },
            { label: t`а) $=2\cos\left(45^\circ-\frac{\alpha}{2}\right)$, следователно $A=B$`, points: 1 },
            { label: t`б) $\cos\frac{\alpha}{2}=\frac{\sqrt{2}}{4}$ и $\sin\frac{\alpha}{2}=\frac{\sqrt{14}}{4}$`, points: 2 },
            { label: t`б) $\sin\alpha=\frac{\sqrt{7}}{4}$ и $\cos\alpha=-\frac{3}{4}$`, points: 2 },
            { label: t`б) $B=\dfrac{1+\sqrt{7}}{2}$`, points: 2 }
          ],
          modelAnswer: t`а) $A=\dfrac{2\cos^2\frac{\alpha}{2}+2\sin\frac{\alpha}{2}\cos\frac{\alpha}{2}}{\sqrt{2}\cos\frac{\alpha}{2}}=\sqrt{2}\left(\sin\dfrac{\alpha}{2}+\cos\dfrac{\alpha}{2}\right)=\sqrt{2}\left[\sin\left(90^\circ-\dfrac{\alpha}{2}\right)+\sin\dfrac{\alpha}{2}\right]=2\sqrt{2}\sin 45^\circ\cos\left(45^\circ-\dfrac{\alpha}{2}\right)=2\cos\left(45^\circ-\dfrac{\alpha}{2}\right)$, т.е. $A=B$.
б) От $\operatorname{tg}\dfrac{\alpha}{2}=\sqrt{7}$ и $\sin^2\dfrac{\alpha}{2}+\cos^2\dfrac{\alpha}{2}=1$, при $\dfrac{\alpha}{2}\in(0^\circ;\,90^\circ)$: $\cos\dfrac{\alpha}{2}=\dfrac{\sqrt{2}}{4}$ и $\sin\dfrac{\alpha}{2}=\dfrac{\sqrt{14}}{4}$. Тогава $\sin\alpha=2\sin\dfrac{\alpha}{2}\cos\dfrac{\alpha}{2}=\dfrac{\sqrt{7}}{4}$ и $\cos\alpha=\cos^2\dfrac{\alpha}{2}-\sin^2\dfrac{\alpha}{2}=\dfrac{2}{16}-\dfrac{14}{16}=-\dfrac{3}{4}$.
Следователно $B=A=\dfrac{1+\frac{\sqrt{7}}{4}-\frac{3}{4}}{\sqrt{2}\cdot\frac{\sqrt{2}}{4}}=\dfrac{1+\sqrt{7}}{2}$.`
        },
        {
          id: 'd21-q28', number: 28, kind: 'open', points: 10,
          prompt: t`В окръжност $k$ с център $O$ е вписан $\triangle ABD$. Допирателната към $k$ в точка $D$ пресича правата $AB$ в точка $M$ ($A$ е между $B$ и $M$), като $MA=2$ cm, $AB=6$ cm и $\sphericalangle AMD=60^\circ$.
а) Пресметнете дължината на $MD$ и докажете, че $AD\perp MB$ и $O\in BD$.
б) Ако $C$ е средата на дъгата $\overset{\frown}{BD}$, несъдържаща точката $A$, докажете, че $MC=2\sqrt{10+4\sqrt{3}}$ cm.`,
          criteria: [
            { label: t`а) $MD=4$ cm`, points: 1 },
            { label: t`а) Доказване, че $AD\perp MB$`, points: 3 },
            { label: t`а) Доказване, че $O\in BD$`, points: 1 },
            { label: t`б) $BC=2\sqrt{6}$ cm`, points: 2 },
            { label: t`б) $MC=2\sqrt{10+4\sqrt{3}}$ cm`, points: 3 }
          ],
          modelAnswer: t`а) От $MD^2=MA\cdot MB=2\cdot 8$ намираме $MD=4$ cm. От косинусовата теорема в $\triangle MAD$: $AD^2=4+16-2\cdot 2\cdot 4\cdot\dfrac{1}{2}=12$. Тъй като $MA^2+AD^2=4+12=16=MD^2$, $\triangle MAD$ е правоъгълен с $\sphericalangle MAD=90^\circ$, т.е. $AD\perp MB$. Тогава $\sphericalangle BAD=90^\circ$; той е вписан в $k$, затова $BD$ е диаметър и $O\in BD$.
б) $MD$ е допирателна, затова $MD\perp DO$, $\triangle MDB$ е правоъгълен с $\sphericalangle BMD=60^\circ$ и $BD=MB\sin 60^\circ=4\sqrt{3}$ cm. От $\overset{\frown}{BC}=\overset{\frown}{CD}$ следва $BC=CD$; $\triangle BCD$ е равнобедрен и правоъгълен ($BD$ е диаметър), $\sphericalangle CBD=45^\circ$ и $BC=BD\sin 45^\circ=2\sqrt{6}$ cm.
В $\triangle MDC$: $\sphericalangle MDC=\sphericalangle MDB+\sphericalangle CDB=90^\circ+45^\circ=135^\circ$. От косинусовата теорема $MC^2=16+24+2\cdot 4\cdot 2\sqrt{6}\cdot\dfrac{\sqrt{2}}{2}=40+16\sqrt{3}=4\left(10+4\sqrt{3}\right)$, т.е. $MC=2\sqrt{10+4\sqrt{3}}$ cm.`
        }
      ]
    }
  ]
};
