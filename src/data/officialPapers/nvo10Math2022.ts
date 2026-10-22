import type { ExamPaper } from '../../lib/examPaperScoring';

/**
 * НВО по математика в края на X клас — 16.06.2022 г. (формат до 2025 г.: 17 задачи, 90 минути).
 * Условия, ключ и точки — преписани от официалния PDF на МОН (officialSourceUrl).
 * Примерните решения на 16. и 17. са от същия документ. Обясненията към 1.–15. са на StudyBG
 * и са проверени спрямо ключа.
 */

const t = String.raw;

export const NVO10_MATH_2022: ExamPaper = {
  id: 'official-nvo10-math-2022',
  title: 'НВО 10. клас — математика, 16 юни 2022',
  exam: 'НВО 10',
  subject: 'Математика',
  kind: 'official',
  officialSourceUrl: 'https://www.mon.bg/nfs/2022/06/10kl_nvo_math_16062022.pdf',
  year: 2022,
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
          id: 'm22-q1', number: 1, kind: 'choice', points: 4,
          prompt: t`Най-голямото от числата $5\sqrt{5}$, $3\sqrt{14}$, $11$ и $2\sqrt{31}$ е:`,
          options: ['11', t`$3\sqrt{14}$`, t`$5\sqrt{5}$`, t`$2\sqrt{31}$`],
          correctIndex: 1,
          explanation: t`Внасяме множителите под корена: $5\sqrt{5}=\sqrt{125}$, $3\sqrt{14}=\sqrt{126}$, $11=\sqrt{121}$, $2\sqrt{31}=\sqrt{124}$. Най-голямо е $\sqrt{126}=3\sqrt{14}$.`
        },
        {
          id: 'm22-q2', number: 2, kind: 'choice', points: 4,
          prompt: t`Ако $x_1$ и $x_2$ са корените на уравнението $7x^2-21x-2=0$, то стойността на израза $x_1x_2(x_1+x_2)$ е:`,
          options: [t`$-42$`, t`$-\dfrac{21}{2}$`, t`$-\dfrac{6}{7}$`, t`$\dfrac{6}{7}$`],
          correctIndex: 2,
          explanation: t`По формулите на Виет $x_1+x_2=\dfrac{21}{7}=3$ и $x_1x_2=-\dfrac{2}{7}$. Тогава $-\dfrac{2}{7}\cdot 3=-\dfrac{6}{7}$.`
        },
        {
          id: 'm22-q3', number: 3, kind: 'choice', points: 4,
          prompt: t`Броят на корените на уравнението $\dfrac{(x-1)(x^2-3x+2)}{x^2-1}=0$ е:`,
          options: ['0', '1', '2', '3'],
          correctIndex: 1,
          explanation: t`Допустими са $x\ne\pm 1$. Числителят е $(x-1)(x-1)(x-2)$ и се анулира при $x=1$ и $x=2$, но $x=1$ не е допустимо. Остава един корен: $x=2$.`
        },
        {
          id: 'm22-q4', number: 4, kind: 'choice', points: 4,
          prompt: t`Броят на целите числа, които са решения на системата $\begin{cases}3-2x\ge 0\\ 4x+3\ge 0\end{cases}$, е:`,
          options: ['0', '1', '2', '3'],
          correctIndex: 2,
          explanation: t`От неравенствата $x\le\dfrac{3}{2}$ и $x\ge-\dfrac{3}{4}$, т.е. $x\in\left[-\dfrac{3}{4};\dfrac{3}{2}\right]$. Целите числа в този интервал са $0$ и $1$ — две.`
        },
        {
          id: 'm22-q5', number: 5, kind: 'choice', points: 4,
          prompt: 'Графиката на коя линейна функция е изобразена на чертежа?',
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2022-q5-line', alt: 'Права, която минава през точките (−2; 0) и (0; 2).' }],
          options: [t`$y=x+2$`, t`$y=2x-2$`, t`$y=-2x$`, t`$y=-2x+2$`],
          correctIndex: 0,
          explanation: t`Правата минава през $(0;2)$, затова $b=2$, и през $(-2;0)$: $0=-2k+2$, $k=1$. Функцията е $y=x+2$.`
        },
        {
          id: 'm22-q6', number: 6, kind: 'choice', points: 4,
          prompt: t`Ако двойката $(x;\,y)$ е решение на системата $\begin{cases}3x+2y=6\\ 5x+4y=8\end{cases}$, то стойността на $x+y$ е:`,
          options: [t`$-2$`, t`$-1$`, '1', '2'],
          correctIndex: 2,
          explanation: t`Умножаваме първото уравнение по 2: $6x+4y=12$. Изваждаме второто: $x=4$, тогава $2y=6-12$, $y=-3$. Следователно $x+y=1$.`
        },
        {
          id: 'm22-q7', number: 7, kind: 'choice', points: 4,
          prompt: t`Стойността на израза $\dfrac{\operatorname{cotg}45^\circ+2\sin 30^\circ}{\sqrt{3}\,\operatorname{tg}30^\circ}-1$ е равна на:`,
          options: [t`$-1$`, t`$-\dfrac{1}{3}$`, '1', '2'],
          correctIndex: 2,
          explanation: t`$\operatorname{cotg}45^\circ+2\sin 30^\circ=1+1=2$ и $\sqrt{3}\,\operatorname{tg}30^\circ=\sqrt{3}\cdot\dfrac{\sqrt{3}}{3}=1$. Стойността е $\dfrac{2}{1}-1=1$.`
        },
        {
          id: 'm22-q8', number: 8, kind: 'choice', points: 4,
          prompt: 'В цветарски магазин разполагат с 25 рози и с 18 карамфила. По колко начина може да се направи букет от 5 рози и 2 карамфила?',
          options: [t`$V_{25}^{5}\,V_{18}^{2}$`, t`$C_{25}^{5}\,C_{18}^{2}$`, t`$V_{25}^{5}+V_{18}^{2}$`, t`$C_{25}^{5}+C_{18}^{2}$`],
          correctIndex: 1,
          explanation: t`В букета редът няма значение, затова розите се избират по $C_{25}^{5}$ начина, а карамфилите — по $C_{18}^{2}$. Всеки избор на рози се съчетава с всеки избор на карамфили, затова броят е произведението $C_{25}^{5}\,C_{18}^{2}$.`
        },
        {
          id: 'm22-q9', number: 9, kind: 'choice', points: 4,
          prompt: t`На чертежа $\sphericalangle ACB$ е вписан в окръжност и е с $36^\circ$ по-малък от централния $\sphericalangle AOB$. Мярката на $\sphericalangle ACB$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2022-q9-inscribed-angle', alt: 'Окръжност с център O, вписан ъгъл ACB и централен ъгъл AOB.' }],
          options: [t`$9^\circ$`, t`$18^\circ$`, t`$30^\circ$`, t`$36^\circ$`],
          correctIndex: 3,
          explanation: t`Вписаният ъгъл е половината от централния над същата дъга: $\sphericalangle AOB=2\sphericalangle ACB$. Тогава $2\sphericalangle ACB-\sphericalangle ACB=36^\circ$, т.е. $\sphericalangle ACB=36^\circ$.`
        },
        {
          id: 'm22-q10', number: 10, kind: 'choice', points: 4,
          prompt: 'Страните на триъгълник с периметър 30 cm образуват аритметична прогресия. Дължината на средната по големина страна на триъгълника е:',
          options: ['9 cm', '10 cm', '11 cm', '12 cm'],
          correctIndex: 1,
          explanation: t`Нека страните са $a-d$, $a$, $a+d$. Сборът им е $3a=30$, откъдето средната страна е $a=10$ cm.`
        },
        {
          id: 'm22-q11', number: 11, kind: 'choice', points: 4,
          prompt: t`На чертежа в правоъгълния $\triangle ABC$ отсечката $CH=6$ cm е височина към хипотенузата $AB$ и я дели в отношение $AH:HB=1:9$. Дължината на $AB$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2022-q11-right-triangle', alt: 'Правоъгълен триъгълник ABC с височина CH = 6 към хипотенузата; AH : HB = 1 : 9.' }],
          options: ['9 cm', '10 cm', '18 cm', '20 cm'],
          correctIndex: 3,
          explanation: t`Нека $AH=k$ и $HB=9k$. От $CH^2=AH\cdot HB$: $36=9k^2$, $k=2$. Тогава $AB=10k=20$ cm.`
        },
        {
          id: 'm22-q12', number: 12, kind: 'choice', points: 4,
          prompt: t`Диагоналите на трапеца $ABCD$ ($AB\parallel CD$) се пресичат в точка $O$. Ако $AO=6$ cm, $OC=2$ cm и $CD=3$ cm, дължината на средната основа на трапеца е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2022-q12-trapezoid', alt: 'Трапец ABCD с пресечна точка на диагоналите O; AO = 6, OC = 2, CD = 3.' }],
          options: ['3 cm', '4 cm', '6 cm', '9 cm'],
          correctIndex: 2,
          explanation: t`$\triangle ABO\sim\triangle CDO$, затова $\dfrac{AB}{CD}=\dfrac{AO}{OC}=3$ и $AB=9$ cm. Средната основа е $\dfrac{9+3}{2}=6$ cm.`
        },
        {
          id: 'm22-q13', number: 13, kind: 'choice', points: 4,
          prompt: t`Страните на $\triangle ABC$ са $AB=2$ cm, $AC=2\sqrt{2}$ cm, $BC=2\sqrt{5}$ cm. Мярката на $\sphericalangle BAC$ е:`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2022-q13-triangle', alt: 'Триъгълник ABC с AB = 2, AC = 2√2 и BC = 2√5.' }],
          options: [t`$45^\circ$`, t`$90^\circ$`, t`$120^\circ$`, t`$135^\circ$`],
          correctIndex: 3,
          explanation: t`От косинусовата теорема: $\cos\sphericalangle BAC=\dfrac{AB^2+AC^2-BC^2}{2\cdot AB\cdot AC}=\dfrac{4+8-20}{8\sqrt{2}}=-\dfrac{\sqrt{2}}{2}$, т.е. $\sphericalangle BAC=135^\circ$.`
        },
        {
          id: 'm22-q14', number: 14, kind: 'choice', points: 4,
          prompt: 'Разпределението на учениците, които получават стипендии в един клас, е както следва. Модата на данните от таблицата е:',
          stimulus: [
            {
              kind: 'table',
              head: ['Брой ученици', '5', '3', '2', '2'],
              rows: [['Стипендия (в лева)', '25', '30', '35', '40']]
            }
          ],
          options: ['25', '30', '35', '40'],
          correctIndex: 0,
          explanation: 'Модата е стойността, която се среща най-често. Стипендия 25 лв. получават 5 ученици — повече, отколкото която и да е друга стойност.'
        },
        {
          id: 'm22-q15', number: 15, kind: 'choice', points: 4,
          prompt: 'Прав кръгов цилиндър с образуваща 5 cm има осно сечение, което е правоъгълник с диагонал 7 cm. Обемът на цилиндъра е:',
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2022-q15-cylinder', alt: 'Прав кръгов цилиндър с образуваща 5 и диагонал на осното сечение 7.' }],
          options: [t`$30\pi\ \text{cm}^3$`, t`$35\pi\ \text{cm}^3$`, t`$42\pi\ \text{cm}^3$`, t`$60\pi\ \text{cm}^3$`],
          correctIndex: 0,
          explanation: t`Осното сечение е правоъгълник със страни $2r$ и $5$: $(2r)^2=7^2-5^2=24$, т.е. $r^2=6$. Обемът е $V=\pi r^2h=\pi\cdot 6\cdot 5=30\pi\ \text{cm}^3$.`
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
          id: 'm22-q16', number: 16, kind: 'open', points: 20,
          prompt: t`А) Решете уравнението $\sqrt{3x+1}-\sqrt{x-1}=2$.
Б) Решете неравенството $\dfrac{x^2-36}{4x}\ge 0$ и представете решенията графично.
В) Намерете координатите на пресечните точки на графиката на функцията $f(x)=-6x+7$ с координатните оси.`,
          criteria: [
            { label: t`А) $x_1=1,\ x_2=5$`, points: 8 },
            { label: t`Б) $x\in[-6;0)\cup[6;+\infty)$`, points: 8 },
            { label: t`В) $(0;\,7)$ и $\left(\dfrac{7}{6};\,0\right)$ — по 2 т. за всяка точка`, points: 4 }
          ],
          modelAnswer: t`А) Допустими са $x\in[1;+\infty)$. $\sqrt{3x+1}=2+\sqrt{x-1}$; повдигаме на квадрат: $3x+1=4+4\sqrt{x-1}+x-1$, т.е. $2x-2=4\sqrt{x-1}$ и $x-1=2\sqrt{x-1}$. Повдигаме отново: $(x-1)^2=4(x-1)$, $(x-1)(x-5)=0$, $x_1=1$, $x_2=5$. С проверка установяваме, че и двата корена са решения на уравнението.
Б) $\dfrac{x^2-36}{4x}\ge 0\iff\dfrac{(x-6)(x+6)}{4x}\ge 0\iff\begin{cases}x\ne 0\\ x(x-6)(x+6)\ge 0\end{cases}$. По метода на интервалите (знаци $-,\ +,\ -,\ +$ около точките $-6$, $0$, $6$) получаваме $x\in[-6;0)\cup[6;+\infty)$; на числовата ос $-6$ и $6$ са запълнени точки, а $0$ — празна.
В) При $x=0$: $y=f(0)=-6\cdot 0+7=7$ — пресечната точка с ординатната ос е $(0;\,7)$. При $y=0$: $0=-6x+7$, $x=\dfrac{7}{6}$ — пресечната точка с абсцисната ос е $\left(\dfrac{7}{6};\,0\right)$.`
        },
        {
          id: 'm22-q17', number: 17, kind: 'open', points: 20,
          prompt: t`За остроъгълния $\triangle ABC$ е дадено, че $AC=13$ cm и $BC=15$ cm. Ако $CD\ (D\in AB)$ е височина и $AD=5$ cm, намерете:
А) периметъра на $\triangle ABC$;
Б) лицето на $\triangle ABC$;
В) радиуса на описаната около $\triangle ABC$ окръжност;
Г) радиуса на вписаната в $\triangle ABC$ окръжност.`,
          stimulus: [{ kind: 'figure', figureId: 'nvo10-2022-q17-triangle', alt: 'Остроъгълен триъгълник ABC с AC = 13, BC = 15 и височина CD; AD = 5.' }],
          criteria: [
            { label: t`А) $P_{\triangle ABC}=42$ cm`, points: 8 },
            { label: t`Б) $S_{\triangle ABC}=84\ \text{cm}^2$`, points: 4 },
            { label: t`В) $R=\dfrac{65}{8}=8\dfrac{1}{8}$ cm`, points: 4 },
            { label: 'Г) r = 4 cm', points: 4 }
          ],
          modelAnswer: t`А) От питагоровата теорема за $\triangle ADC$: $CD^2=13^2-5^2=144$, $CD=12$ cm. За $\triangle BDC$: $BD^2=15^2-12^2=81$, $BD=9$ cm. Тогава $AB=5+9=14$ cm и $P_{\triangle ABC}=14+13+15=42$ cm.
(II начин: $\cos\sphericalangle CAB=\dfrac{5}{13}$; от косинусовата теорема $15^2=AB^2+13^2-2\cdot AB\cdot 13\cdot\dfrac{5}{13}$, т.е. $AB^2-10AB-56=0$ и $AB=14$ cm.)
Б) $S_{\triangle ABC}=\dfrac{AB\cdot CD}{2}=\dfrac{14\cdot 12}{2}=84\ \text{cm}^2$ (или по Хероновата формула: $\sqrt{21\cdot 6\cdot 8\cdot 7}=84$).
В) $\sin\sphericalangle CAB=\dfrac{12}{13}$. От синусовата теорема $2R=\dfrac{BC}{\sin\sphericalangle CAB}=15:\dfrac{12}{13}$, откъдето $R=\dfrac{65}{8}=8\dfrac{1}{8}$ cm (или от $S=\dfrac{abc}{4R}$: $\dfrac{15\cdot 13\cdot 14}{4R}=84$).
Г) $S=pr$, $p=21$ cm: $84=21r$, $r=4$ cm.`
        }
      ]
    }
  ]
};
