import type { ExamPaper } from '../../lib/examPaperScoring';

/**
 * НВО по математика в края на X клас — 16.06.2023 г. (формат до 2025 г.: 17 задачи, 90 минути).
 * Условия, ключ и точки — преписани от официалния PDF на МОН (officialSourceUrl).
 * Примерните решения на 16. и 17. са от същия документ. Обясненията към 1.–15. са на StudyBG
 * и са проверени спрямо ключа.
 */

const t = String.raw;

export const NVO10_MATH_2023: ExamPaper = {
  id: 'official-nvo10-math-2023',
  title: 'НВО 10. клас — математика, 16 юни 2023',
  exam: 'НВО 10',
  subject: 'Математика',
  kind: 'official',
  officialSourceUrl: 'https://www.mon.bg/nfs/2023/06/nvo-10klas_math_16.06.2023.pdf',
  year: 2023,
  durationMinutes: 90,
  maxPoints: 100,
  gradeScale: null,
  note:
    'Формат до 2025 г. (само математика, 90 минути). Условията и ключът са официалните на МОН. Решенията на 16. и 17. са примерните решения от МОН; обясненията към 1.–15. са на StudyBG.',
  sections: [
    {
      id: 'choice',
      title: 'Задачи с избираем отговор (60 т.)',
      instructions: 'Изберете един верен отговор. Всяка задача носи 4 точки.',
      questions: [
        {
          id: 'm23-q1', number: 1, kind: 'choice', points: 4,
          prompt: t`Броят на целите числа $x$, които изпълняват условията $-\sqrt{2}\le x\le\pi$, е:`,
          options: ['2', '3', '4', '5'],
          correctIndex: 3,
          explanation: t`$-\sqrt{2}\approx -1{,}41$ и $\pi\approx 3{,}14$, затова целите числа са $-1,\ 0,\ 1,\ 2,\ 3$ — пет на брой.`
        },
        {
          id: 'm23-q2', number: 2, kind: 'choice', points: 4,
          prompt: t`Стойността на израза $\sqrt{2}+\sqrt{162}-\sqrt{2^5}$ е:`,
          options: [t`$5\sqrt{2}$`, t`$6\sqrt{2}$`, t`$8\sqrt{2}$`, t`$14\sqrt{2}$`],
          correctIndex: 1,
          explanation: t`$\sqrt{162}=9\sqrt{2}$ и $\sqrt{2^5}=4\sqrt{2}$, затова $\sqrt{2}+9\sqrt{2}-4\sqrt{2}=6\sqrt{2}$.`
        },
        {
          id: 'm23-q3', number: 3, kind: 'choice', points: 4,
          prompt: t`Ако единият корен на уравнението $x^2+bx-100=0$ е равен на 1, то коефициентът $b$ е равен на:`,
          options: [t`$-100$`, t`$-99$`, t`$99$`, t`$100$`],
          correctIndex: 2,
          explanation: t`Заместваме $x=1$: $1+b-100=0$, откъдето $b=99$.`
        },
        {
          id: 'm23-q4', number: 4, kind: 'choice', points: 4,
          prompt: t`Ако $x_1$ и $x_2$ са корени на уравнението $2x^2-3x-4=0$, то стойността на израза $(x_1x_2)^2-(x_1+x_2)$ е:`,
          options: [t`$-\dfrac{11}{2}$`, t`$\dfrac{3}{2}$`, t`$\dfrac{5}{2}$`, t`$\dfrac{11}{2}$`],
          correctIndex: 2,
          explanation: t`По формулите на Виет $x_1x_2=-2$ и $x_1+x_2=\dfrac{3}{2}$. Тогава $(-2)^2-\dfrac{3}{2}=\dfrac{5}{2}$.`
        },
        {
          id: 'm23-q5', number: 5, kind: 'choice', points: 4,
          prompt: t`Решенията на неравенството $\dfrac{(x-4)(x+1)}{x+4}\le 0$ са:`,
          options: [
            t`$x\in(-\infty;-4)\cup[-1;4]$`,
            t`$x\in(-4;-1]\cup[4;+\infty)$`,
            t`$x\in[-1;4]$`,
            t`$x\in(-\infty;-4]\cup[-1;4]$`
          ],
          correctIndex: 0,
          explanation: t`Критичните точки са $-4,\ -1,\ 4$. По метода на интервалите изразът е неположителен при $x<-4$ и при $-1\le x\le 4$; числото $-4$ се изключва (знаменателят е 0). Следователно $x\in(-\infty;-4)\cup[-1;4]$.`
        },
        {
          id: 'm23-q6', number: 6, kind: 'choice', points: 4,
          prompt: t`Най-голямата стойност на функцията $f(x)=-\dfrac{1}{2}x^2+2x-1$ е:`,
          options: [t`$-1$`, t`$1$`, t`$2$`, t`$5$`],
          correctIndex: 1,
          explanation: t`Параболата е с клони надолу и най-голямата стойност е във върха $x=-\dfrac{2}{2\cdot(-\frac{1}{2})}=2$: $f(2)=-2+4-1=1$.`
        },
        {
          id: 'm23-q7', number: 7, kind: 'choice', points: 4,
          prompt: t`Стойността на израза $\dfrac{\sin 30^\circ+\cos 60^\circ}{\cos^2 90^\circ-1}$ е:`,
          options: [t`$-\sqrt{3}$`, t`$-1$`, t`$-\dfrac{\sqrt{3}}{4}$`, t`$-\dfrac{1}{4}$`],
          correctIndex: 1,
          explanation: t`$\sin 30^\circ+\cos 60^\circ=\dfrac{1}{2}+\dfrac{1}{2}=1$, а $\cos^2 90^\circ-1=0-1=-1$. Стойността е $-1$.`
        },
        {
          id: 'm23-q8', number: 8, kind: 'choice', points: 4,
          prompt: t`Числата $x-2$, $x$ и $x+6$, взети в този ред, са последователни членове на геометрична прогресия при стойност на $x$ равна на:`,
          options: [t`$-3$`, t`$2$`, t`$3$`, t`$9$`],
          correctIndex: 2,
          explanation: t`За три последователни члена на геометрична прогресия $x^2=(x-2)(x+6)=x^2+4x-12$, откъдето $4x=12$ и $x=3$ (членовете са 1, 3, 9).`
        },
        {
          id: 'm23-q9', number: 9, kind: 'choice', points: 4,
          prompt: t`На чертежа през точка $A$, външна за окръжност $k$, са построени допирателната $AD$ и секущата $AC$, която пресича окръжността в точка $B$. Ако $AB=2$ cm и $BC=6$ cm, дължината на $AD$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2023-q9-tangent-secant', alt: 'Окръжност с допирателна AD и секуща AC; AB = 2, BC = 6.' }],
          options: ['3 cm', t`$2\sqrt{3}$ cm`, '4 cm', t`$3\sqrt{2}$ cm`],
          correctIndex: 2,
          explanation: t`За допирателна и секуща от една точка: $AD^2=AB\cdot AC=2\cdot(2+6)=16$, т.е. $AD=4$ cm.`
        },
        {
          id: 'm23-q10', number: 10, kind: 'choice', points: 4,
          prompt: t`Даден е $\triangle ABC$ със страни $AB=4$ cm, $AC=2$ cm и $\sphericalangle BAC=120^\circ$. Дължината на страната $BC$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2023-q10-triangle-120', alt: 'Триъгълник ABC с AB = 4, AC = 2 и ъгъл 120° при A.' }],
          options: [t`$2\sqrt{7}$ cm`, t`$2\sqrt{5}$ cm`, t`$3\sqrt{2}$ cm`, t`$2\sqrt{3}$ cm`],
          correctIndex: 0,
          explanation: t`От косинусовата теорема: $BC^2=16+4-2\cdot 4\cdot 2\cdot\cos 120^\circ=20+8=28$, т.е. $BC=2\sqrt{7}$ cm.`
        },
        {
          id: 'm23-q11', number: 11, kind: 'choice', points: 4,
          prompt: t`В правоъгълния $\triangle ABC$ петата на височината към хипотенузата я дели на отсечки с дължини 4 cm и 1 cm. Лицето на триъгълника е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2023-q11-right-triangle', alt: 'Правоъгълен триъгълник ABC с височина CH; AH = 4, HB = 1.' }],
          options: [t`$4\ \text{cm}^2$`, t`$5\ \text{cm}^2$`, t`$6\ \text{cm}^2$`, t`$8\ \text{cm}^2$`],
          correctIndex: 1,
          explanation: t`$CH^2=AH\cdot HB=4\cdot 1=4$, т.е. $CH=2$ cm. Хипотенузата е $4+1=5$ cm, затова $S=\dfrac{5\cdot 2}{2}=5\ \text{cm}^2$.`
        },
        {
          id: 'm23-q12', number: 12, kind: 'choice', points: 4,
          prompt: t`Детска пързалка с височина 3 m е укрепена с вертикален стълб $CT$, както е показано на чертежа. Ако $AT:TH=3:2$, височината на стълба $CT$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2023-q12-slide', alt: 'Пързалка с височина BH = 3 и стълб CT; AT : TH = 3 : 2.' }],
          options: ['1,2 m', '1,5 m', '1,6 m', '1,8 m'],
          correctIndex: 3,
          explanation: t`$\triangle ATC\sim\triangle AHB$, затова $\dfrac{CT}{BH}=\dfrac{AT}{AH}=\dfrac{3}{3+2}=\dfrac{3}{5}$. Тогава $CT=\dfrac{3}{5}\cdot 3=1{,}8$ m.`
        },
        {
          id: 'm23-q13', number: 13, kind: 'choice', points: 4,
          prompt: 'В балкански шампионат по гимнастика участват 20 спортисти от три държави: 8 от Румъния, 7 от Гърция и останалите са от България. Редът на представянето им се определя с жребий. Вероятността български гимнастик да стартира първи е:',
          options: [t`$\dfrac{3}{4}$`, t`$\dfrac{2}{5}$`, t`$\dfrac{1}{4}$`, t`$\dfrac{1}{5}$`],
          correctIndex: 2,
          explanation: t`Българите са $20-8-7=5$. Всеки от 20-те е равновъзможен да стартира първи, затова вероятността е $\dfrac{5}{20}=\dfrac{1}{4}$.`
        },
        {
          id: 'm23-q14', number: 14, kind: 'choice', points: 4,
          prompt: 'В една фирма работят 7 работници със заплати по 1250 лв., 2 специалисти — със заплати по 1820 лв. и един ръководител — със заплата 2360 лв. Средната заплата във фирмата е:',
          options: ['1250 лв.', '1475 лв.', '1810 лв.', '1820 лв.'],
          correctIndex: 1,
          explanation: t`$\dfrac{7\cdot 1250+2\cdot 1820+2360}{10}=\dfrac{8750+3640+2360}{10}=\dfrac{14\,750}{10}=1475$ лв.`
        },
        {
          id: 'm23-q15', number: 15, kind: 'choice', points: 4,
          prompt: 'Прав кръгов конус има височина 12 cm и образуваща 13 cm. Обемът на конуса е:',
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2023-q15-cone', alt: 'Прав кръгов конус с височина 12 и образуваща 13.' }],
          options: [t`$300\pi\ \text{cm}^3$`, t`$120\pi\ \text{cm}^3$`, t`$100\pi\ \text{cm}^3$`, t`$40\pi\ \text{cm}^3$`],
          correctIndex: 2,
          explanation: t`Радиусът на основата е $r=\sqrt{13^2-12^2}=5$ cm. Обемът е $V=\dfrac{1}{3}\pi r^2h=\dfrac{1}{3}\pi\cdot 25\cdot 12=100\pi\ \text{cm}^3$.`
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
          id: 'm23-q16', number: 16, kind: 'open', points: 20,
          prompt: t`А) Решете уравнението $\sqrt{3x+4}-\sqrt{x}=2$.
Б) Решете системата $\begin{cases}2x-y=3\\ 2x^2-y^2=7\end{cases}$
В) Едната страна на правоъгълен парцел е с 20 m по-дълга от другата. Колко метра мрежа са необходими за неговото заграждане, ако площта му е 525 m²?`,
          criteria: [
            { label: t`А) $x_1=0,\ x_2=4$`, points: 6 },
            { label: t`Б) $(2;\,1)$ и $(4;\,5)$`, points: 6 },
            { label: 'В) необходими са 100 m мрежа', points: 8 }
          ],
          modelAnswer: t`А) Допустими са $x\ge 0$. $\sqrt{3x+4}=2+\sqrt{x}$; повдигаме на квадрат: $3x+4=4+4\sqrt{x}+x$, т.е. $2x=4\sqrt{x}$, $x=2\sqrt{x}$. Повдигаме отново: $x^2=4x$, $x(x-4)=0$, $x_1=0$, $x_2=4$. С проверка установяваме, че и двата корена са решения.
Б) От първото уравнение $y=2x-3$. Заместваме: $2x^2-(2x-3)^2=7\ \Rightarrow\ -2x^2+12x-16=0\ \Rightarrow\ x^2-6x+8=0$, $x_1=2$, $x_2=4$. Тогава $y_1=1$, $y_2=5$. Решенията са $(2;\,1)$ и $(4;\,5)$.
В) Нека ширината е $x>0$; тогава дължината е $x+20$. От $x(x+20)=525$: $x^2+20x-525=0$, $x_1=15$, $x_2=-35$ (не е допустимо). Страните са 15 m и 35 m, а обиколката е $2(35+15)=100$ m.`
        },
        {
          id: 'm23-q17', number: 17, kind: 'open', points: 20,
          prompt: t`В $\triangle ABC$ със страни $AC=BC=4\sqrt{5}$ cm, $CD\ (D\in AB)$ е височина и $AD=4$ cm. Намерете:
А) лицето на $\triangle ABC$;
Б) радиуса на вписаната в $\triangle ABC$ окръжност;
В) радиуса на описаната около $\triangle ABC$ окръжност;
Г) дължината на ъглополовящата $OL$ в $\triangle BOD$, където точка $O$ е центърът на описаната около $\triangle ABC$ окръжност.`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2023-q17-isosceles', alt: 'Равнобедрен триъгълник ABC с височина CD, центърът O на описаната окръжност и ъглополовящата OL.' }],
          criteria: [
            { label: t`А) $S_{\triangle ABC}=32\ \text{cm}^2$`, points: 5 },
            { label: t`Б) $r=2(\sqrt{5}-1)$ cm`, points: 5 },
            { label: 'В) R = 5 cm', points: 4 },
            { label: t`Г) $OL=\dfrac{3\sqrt{5}}{2}$ cm`, points: 6 }
          ],
          modelAnswer: t`А) Триъгълникът е равнобедрен, затова $D$ е среда на $AB$ и $AB=8$ cm. От $\triangle ADC$: $DC^2=(4\sqrt{5})^2-4^2=64$, $DC=8$ cm. $S=\dfrac{1}{2}\cdot 8\cdot 8=32\ \text{cm}^2$.
Б) $p=\dfrac{8+2\cdot 4\sqrt{5}}{2}=4+4\sqrt{5}$ cm и $r=\dfrac{S}{p}=\dfrac{32}{4+4\sqrt{5}}=2(\sqrt{5}-1)$ cm.
В) $R=\dfrac{abc}{4S}=\dfrac{4\sqrt{5}\cdot 4\sqrt{5}\cdot 8}{4\cdot 32}=5$ cm.
Г) От $\triangle BDO$: $OD^2=OB^2-DB^2=25-16=9$, $OD=3$ cm. По свойството на ъглополовящата $\dfrac{DL}{LB}=\dfrac{OD}{OB}=\dfrac{3}{5}$, а $DL+LB=4$, затова $DL=\dfrac{3}{2}$ cm. От $\triangle ODL$: $OL^2=3^2+\left(\dfrac{3}{2}\right)^2=\dfrac{45}{4}$, т.е. $OL=\dfrac{3\sqrt{5}}{2}$ cm.`
        }
      ]
    }
  ]
};
