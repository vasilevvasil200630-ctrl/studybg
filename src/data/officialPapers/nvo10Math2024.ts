import type { ExamPaper } from '../../lib/examPaperScoring';

/**
 * НВО по математика в края на X клас — 12.06.2024 г. (формат до 2025 г.: 17 задачи, 90 минути).
 * Условия, ключ и точки — преписани от официалния PDF на МОН (officialSourceUrl).
 * Примерните решения на 16. и 17. са от същия документ. Обясненията към 1.–15. са на StudyBG
 * и са проверени спрямо ключа.
 */

const t = String.raw;

export const NVO10_MATH_2024: ExamPaper = {
  id: 'official-nvo10-math-2024',
  title: 'НВО 10. клас — математика, 12 юни 2024',
  exam: 'НВО 10',
  subject: 'Математика',
  kind: 'official',
  officialSourceUrl: 'https://www.mon.bg/nfs/2024/06/nvo_10kl_math_12062024.pdf',
  year: 2024,
  durationMinutes: 90,
  maxPoints: 100,
  gradeScale: null,
  note:
    'Формат до 2025 г. (само математика, 90 минути). Условията и ключът са официалните на МОН. Решенията на 16. и 17. са примерните решения от МОН; обясненията към 1.–15. са на StudyBG.',
  sections: [
    {
      id: 'choice',
      title: 'Задачи с избираем отговор (60 т.)',
      instructions:
        'Изберете един верен отговор. Всяка задача носи 4 точки. Чертежите са само за илюстрация — не са в мащаб и не са предназначени за директно измерване.',
      questions: [
        {
          id: 'm24-q1', number: 1, kind: 'choice', points: 4,
          prompt: t`Стойността на израза $2\sqrt{20}-3\sqrt{45}+\sqrt{80}$ е:`,
          options: [t`$-5\sqrt{5}$`, t`$-\sqrt{5}$`, t`$\sqrt{5}$`, t`$17\sqrt{5}$`],
          correctIndex: 1,
          explanation: t`$2\sqrt{20}=4\sqrt{5}$, $3\sqrt{45}=9\sqrt{5}$, $\sqrt{80}=4\sqrt{5}$. Тогава $4\sqrt{5}-9\sqrt{5}+4\sqrt{5}=-\sqrt{5}$.`
        },
        {
          id: 'm24-q2', number: 2, kind: 'choice', points: 4,
          prompt: t`Произведението от корените на уравнението $x^2-3x+1=0$ е:`,
          options: [t`$-1$`, t`$1$`, t`$3$`, t`$4$`],
          correctIndex: 1,
          explanation: t`Уравнението има два реални корена ($D=9-4>0$). По формулите на Виет $x_1x_2=\dfrac{c}{a}=1$.`
        },
        {
          id: 'm24-q3', number: 3, kind: 'choice', points: 4,
          prompt: 'На диаграмата са представени оценките от контролна работа в един клас. По данните от диаграмата средният успех на класа е:',
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2024-q3-grades-chart', alt: 'Стълбова диаграма на оценките от контролна работа.' }],
          options: ['4,20', '4,40', '4,60', '4,80'],
          correctIndex: 2,
          explanation: t`От диаграмата учениците са $2+3+7+4+9=25$. Средният успех е $\dfrac{2\cdot 2+3\cdot 3+7\cdot 4+4\cdot 5+9\cdot 6}{25}=\dfrac{115}{25}=4{,}60$.`
        },
        {
          id: 'm24-q4', number: 4, kind: 'choice', points: 4,
          prompt: t`Множеството от решения на неравенството $\dfrac{x-6}{x-3}\le 0$ е:`,
          options: [t`$(-\infty;3)\cup[6;+\infty)$`, t`$(-\infty;-6)\cup[-3;+\infty)$`, t`$[3;6]$`, t`$(3;6]$`],
          correctIndex: 3,
          explanation: t`Дробта е неположителна, когато числителят и знаменателят са с различни знаци или числителят е 0: $3<x\le 6$. Числото 3 се изключва, защото там знаменателят е 0. Следователно $x\in(3;6]$.`
        },
        {
          id: 'm24-q5', number: 5, kind: 'choice', points: 4,
          prompt: t`Графиката показва движението на автомобил с постоянна скорост за определено време, където $S$ е изминатият път в километри, а $t$ е времето в часове. Графиката на коя от дадените функции е представена на чертежа?`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2024-q5-motion', alt: 'Графика на изминатия път спрямо времето — права през началото и точката (4; 300).' }],
          options: [t`$S(t)=-75t,\ t>0$`, t`$S(t)=70t,\ t>0$`, t`$S(t)=75t,\ t>0$`, t`$S(t)=75t+10,\ t>0$`],
          correctIndex: 2,
          explanation: t`Графиката минава през началото и през точката $(4;\,300)$, затова скоростта е $\dfrac{300}{4}=75$ km/h и $S(t)=75t$.`
        },
        {
          id: 'm24-q6', number: 6, kind: 'choice', points: 4,
          prompt: t`Стойността на израза $\cos 45^\circ\cdot\sin 45^\circ+\operatorname{tg}60^\circ\cdot\operatorname{cotg}60^\circ$ е:`,
          options: [t`$1$`, t`$\dfrac{3}{2}$`, t`$2$`, t`$\dfrac{5}{2}$`],
          correctIndex: 1,
          explanation: t`$\cos 45^\circ\cdot\sin 45^\circ=\dfrac{\sqrt{2}}{2}\cdot\dfrac{\sqrt{2}}{2}=\dfrac{1}{2}$, а $\operatorname{tg}60^\circ\cdot\operatorname{cotg}60^\circ=1$. Сборът е $\dfrac{3}{2}$.`
        },
        {
          id: 'm24-q7', number: 7, kind: 'choice', points: 4,
          prompt: t`Сборът от корените на уравнението $(16-x^2)\sqrt{x-2}=0$ е:`,
          options: [t`$0$`, t`$2$`, t`$4$`, t`$6$`],
          correctIndex: 3,
          explanation: t`Допустимите стойности са $x\ge 2$. От $16-x^2=0$: $x=\pm 4$, но $-4$ не е допустимо. От $\sqrt{x-2}=0$: $x=2$. Корените са 2 и 4, сборът им е 6.`
        },
        {
          id: 'm24-q8', number: 8, kind: 'choice', points: 4,
          prompt: t`Фирма произвежда $n$ броя от определено изделие и сумата от продажбите на това изделие се описва с функцията $P(n)=-n^2+8000n$, $n\in\mathbb{N}$. Колко броя от изделието трябва да произведе фирмата, така че сумата от продажбите да е най-голяма?`,
          options: ['1000', '2000', '4000', '8000'],
          correctIndex: 2,
          explanation: t`Графиката на $P(n)$ е парабола с клони надолу (коефициентът пред $n^2$ е отрицателен), затова най-голямата стойност е във върха: $n=-\dfrac{8000}{2\cdot(-1)}=4000$.`
        },
        {
          id: 'm24-q9', number: 9, kind: 'choice', points: 4,
          prompt: 'В едно футболно състезание участват 10 отбора, като всеки от тях трябва да изиграе по един мач с всеки от останалите отбори. Колко мача общо ще бъдат изиграни в това първенство?',
          options: ['100', '90', '50', '45'],
          correctIndex: 3,
          explanation: t`Всеки мач е двойка отбори, без значение на реда: $C_{10}^2=\dfrac{10\cdot 9}{2}=45$.`
        },
        {
          id: 'm24-q10', number: 10, kind: 'choice', points: 4,
          prompt: 'Цената на стока се увеличава с един и същ процент в две последователни години, така че от 1 лв. цената ѝ в края на втората година се повишава на 1,44 лв. Годишният процент на увеличение на цената е:',
          options: ['15%', '20%', '22%', '44%'],
          correctIndex: 1,
          explanation: t`Ако процентът е $p$, то $(1+p)^2=1{,}44$, откъдето $1+p=1{,}2$, т.е. $p=20\%$.`
        },
        {
          id: 'm24-q11', number: 11, kind: 'choice', points: 4,
          prompt: t`Страните на $\triangle ABC\ (\sphericalangle ACB>90^\circ)$ са $AC=3$ cm, $BC=4$ cm и лицето му е $3\sqrt{3}\ \text{cm}^2$. Мярката на $\sphericalangle ACB$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2024-q11-obtuse-triangle', alt: 'Тъпоъгълен триъгълник ABC с AC = 3 и BC = 4.' }],
          options: [t`$120^\circ$`, t`$135^\circ$`, t`$145^\circ$`, t`$150^\circ$`],
          correctIndex: 0,
          explanation: t`$S=\dfrac{1}{2}\cdot AC\cdot BC\cdot\sin\sphericalangle ACB=6\sin\sphericalangle ACB=3\sqrt{3}$, откъдето $\sin\sphericalangle ACB=\dfrac{\sqrt{3}}{2}$. Ъгълът е тъп, затова е $120^\circ$.`
        },
        {
          id: 'm24-q12', number: 12, kind: 'choice', points: 4,
          prompt: 'Височината на дърво може да се определи, като в едно и също време на деня се измери дължината на сянката на човек и тази на дървото. Сянката на човек с ръст 1,80 m е 60 cm, а сянката на дървото е 9 m. Колко метра е височината на дървото?',
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2024-q12-shadows', alt: 'Дърво със сянка 9 m и човек с ръст 1,80 m и сянка 60 cm.' }],
          options: ['16', '18', '27', '30'],
          correctIndex: 2,
          explanation: t`Лъчите са успоредни, затова триъгълниците „предмет — сянка“ са подобни: $\dfrac{h}{9}=\dfrac{1{,}80}{0{,}60}=3$, т.е. $h=27$ m.`
        },
        {
          id: 'm24-q13', number: 13, kind: 'choice', points: 4,
          prompt: t`Върху наклонен терен в планина трябва да се изгради площадка за панорамна гледка. При проектирането ѝ са направени измервания, така че единият край на площадката да е върху склона, а другият край да е укрепен с колона с височина 6 m. Ъгълът, който трябва да сключва площадката със склона, е $30^\circ$. Колко трябва да е приблизителната дължина на площадката, ако $\sqrt{3}\approx 1{,}73$?`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2024-q13-platform', alt: 'Хоризонтална площадка AB, колона AC с височина 6 и ъгъл 30° при B.' }],
          options: ['12 m', '10,38 m', '10,28 m', '3,46 m'],
          correctIndex: 1,
          explanation: t`В правоъгълния $\triangle ABC$ (правият ъгъл е при $A$): $\operatorname{tg}30^\circ=\dfrac{AC}{AB}$, откъдето $AB=\dfrac{6}{\operatorname{tg}30^\circ}=6\sqrt{3}\approx 6\cdot 1{,}73=10{,}38$ m.`
        },
        {
          id: 'm24-q14', number: 14, kind: 'choice', points: 4,
          prompt: t`Страните на $\triangle ABC$ са $AC=5$ cm, $BC=3$ cm и $\sphericalangle ACB=120^\circ$. Периметърът на $\triangle ABC$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2024-q14-triangle-120', alt: 'Триъгълник ABC с AC = 5, BC = 3 и ъгъл 120° при C.' }],
          options: [t`$2\sqrt{6}$ cm`, '7 cm', t`$8+2\sqrt{6}$ cm`, '15 cm'],
          correctIndex: 3,
          explanation: t`От косинусовата теорема: $AB^2=25+9-2\cdot 5\cdot 3\cdot\cos 120^\circ=34+15=49$, т.е. $AB=7$ cm. Периметърът е $5+3+7=15$ cm.`
        },
        {
          id: 'm24-q15', number: 15, kind: 'choice', points: 4,
          prompt: t`Правилна четириъгълна пирамида $ABCDM$ има основен ръб с дължина $3\sqrt{2}$ cm и околен ръб с дължина 5 cm. Обемът на пирамидата е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2024-q15-pyramid', alt: 'Правилна четириъгълна пирамида ABCDM с основен ръб 3√2 и околен ръб 5.' }],
          options: [t`$24\ \text{cm}^3$`, t`$30\ \text{cm}^3$`, t`$36\ \text{cm}^3$`, t`$72\ \text{cm}^3$`],
          correctIndex: 0,
          explanation: t`Диагоналът на основата е $3\sqrt{2}\cdot\sqrt{2}=6$ cm, а $AO=3$ cm. Височината е $MO=\sqrt{25-9}=4$ cm. Обемът е $V=\dfrac{1}{3}\cdot(3\sqrt{2})^2\cdot 4=\dfrac{1}{3}\cdot 18\cdot 4=24\ \text{cm}^3$.`
        }
      ]
    },
    {
      id: 'open',
      title: 'Задачи със свободен отговор (40 т.)',
      instructions:
        'Запишете пълното решение с обосновка. След предаване го сравнете с примерното решение на МОН и се оценете по критериите. Всяко друго вярно и пълно решение носи максимален брой точки.',
      questions: [
        {
          id: 'm24-q16', number: 16, kind: 'open', points: 20,
          prompt: t`Детски конструктор се състои от определен брой елементи. Мишо сглобявал елементите на конструктора, като всеки ден сглобявал с $d$ елемента повече от предходния ден. На 12-ия ден Мишо сглобил толкова елемента, колкото общо е сглобил за първите четири дни. На 16-ия ден Мишо сглобил 50 елемента, а на 25-ия ден довършил сглобяването на конструктора. От колко елемента се състои този конструктор?`,
          criteria: [{ label: 'Конструкторът се състои от 1025 елемента', points: 20 }],
          modelAnswer: t`Това е аритметична прогресия, за която $a_{12}=S_4$ и $a_{16}=50$.
$a_1+11d=\dfrac{2a_1+3d}{2}\cdot 4=2(2a_1+3d)\ \Leftrightarrow\ 3a_1=5d$, т.е. $a_1=\dfrac{5d}{3}$.
$a_1+15d=50\ \Rightarrow\ \dfrac{5d}{3}+15d=50\ \Rightarrow\ 50d=150\ \Rightarrow\ d=3,\ a_1=5$.
$S_{25}=\dfrac{2a_1+24d}{2}\cdot 25=(a_1+12d)\cdot 25=(5+36)\cdot 25=1025$.
Конструкторът се състои от 1025 елемента.`
        },
        {
          id: 'm24-q17', number: 17, kind: 'open', points: 20,
          prompt: t`В $\triangle ABC$ $\sphericalangle ACB=60^\circ$, $AC=3$ cm и $BC=8$ cm. Върху страната $BC$ е взета точка $E$, така че $CE=3$ cm.
А) Намерете периметъра и лицето на $\triangle ACE$.
Б) Намерете дължината на страната $AB$, лицето на $\triangle ABC$ и радиуса на описаната около $\triangle ABC$ окръжност.
В) Намерете $\operatorname{tg}\sphericalangle ABC$.`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2024-q17-triangle', alt: 'Триъгълник ABC с ъгъл 60° при C, AC = 3, BC = 8, точка E с CE = 3 и височина AP.' }],
          criteria: [
            { label: t`А) $P_{\triangle ACE}=9$ cm, $S_{\triangle ACE}=\dfrac{9\sqrt{3}}{4}\ \text{cm}^2$`, points: 7 },
            { label: t`Б) $AB=7$ cm, $S_{\triangle ABC}=6\sqrt{3}\ \text{cm}^2$, $R=\dfrac{7\sqrt{3}}{3}$ cm`, points: 8 },
            { label: t`В) $\operatorname{tg}\sphericalangle ABC=\dfrac{3\sqrt{3}}{13}$`, points: 5 }
          ],
          modelAnswer: t`А) $AC=CE$ и $\sphericalangle ACB=60^\circ$, затова $\triangle ACE$ е равностранен: $P=3\cdot 3=9$ cm. Височината му е $AP=\sqrt{3^2-\left(\dfrac{3}{2}\right)^2}=\dfrac{3\sqrt{3}}{2}$ cm, а лицето $S=\dfrac{3\cdot\frac{3\sqrt{3}}{2}}{2}=\dfrac{9\sqrt{3}}{4}\ \text{cm}^2$.
Б) От косинусовата теорема: $AB^2=64+9-2\cdot 8\cdot 3\cdot\cos 60^\circ=49$, т.е. $AB=7$ cm. $S_{\triangle ABC}=\dfrac{3\cdot 8\cdot\sin 60^\circ}{2}=6\sqrt{3}\ \text{cm}^2$. $R=\dfrac{AB}{2\sin 60^\circ}=\dfrac{7}{\sqrt{3}}=\dfrac{7\sqrt{3}}{3}$ cm.
В) $AP=\dfrac{3\sqrt{3}}{2}$ cm е височина към $BC$, а $BP=BE+EP=5+1{,}5=6{,}5$ cm. Тогава $\operatorname{tg}\sphericalangle ABC=\dfrac{AP}{BP}=\dfrac{3\sqrt{3}}{2\cdot 6{,}5}=\dfrac{3\sqrt{3}}{13}$.`
        }
      ]
    }
  ]
};
