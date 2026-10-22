import type { ExamPaper, PaperSection } from '../../lib/examPaperScoring';
import { SAMPLE_PAPER_BASE, SAMPLES_SECTION_INSTRUCTIONS, SAMPLES_SECTION_TITLE, maxPointsOf, numbered, nvo2026Section } from './shared';

/**
 * Физика и астрономия — примерни задачи на МОН (primerni-10kl-fa_30092025.pdf) и задачата
 * за мълнията от модела за 2025/26 г. (model-nvo_10kl_matematika-2026_12092025.pdf).
 */

const t = String.raw;
const PHYS = 'Физика и астрономия';

const samples: PaperSection = {
  id: 'samples',
  title: SAMPLES_SECTION_TITLE,
  instructions: SAMPLES_SECTION_INSTRUCTIONS,
  questions: [
    {
      id: 'phys-s1', number: 0, kind: 'short', points: 2, topic: PHYS, answerType: 'number',
      prompt: t`Трактор и автомобил започват да се движат праволинейно от състояние на покой. На фигурата са графиките, по които двете превозни средства изменят скоростта си в рамките на 10 s. Колко е отношението на ускоренията на автомобила и трактора (запишете го като число)? Помощна формула: $a=\dfrac{\Delta v}{\Delta t}$.`,
      stimulus: [{ kind: 'figure', figureId: 'int-phys-velocity', alt: 'Скоростта на автомобила нараства до 40 m/s, а на трактора — до 10 m/s за 10 s.' }],
      acceptedAnswers: ['4'],
      explanation: t`$a_{\text{авт}}=\dfrac{40}{10}=4\ \text{m/s}^2$, $a_{\text{тр}}=\dfrac{10}{10}=1\ \text{m/s}^2$. Отношението е $4:1$, т.е. 4.`
    },
    {
      id: 'phys-s2', number: 0, kind: 'multi', points: 6, topic: PHYS,
      prompt: t`Спирачният път $s$ на автомобил (разстоянието след задействане на спирачките до пълното спиране) може да се определи по формулата $s=\dfrac{v_0^2}{2a}$. Приемете, че автомобилът спира при суха настилка със средно ускорение $a=8\ \text{m/s}^2$.`,
      parts: [
        { id: 'a', label: 'А)', points: 2, prompt: 'Колко е спирачният път при начална скорост 50 km/h? (до десети)', answer: { type: 'number', acceptedAnswers: ['12,1', '12', '12,06'], unit: 'm' } },
        { id: 'b', label: 'Б)', points: 2, prompt: 'Колко е спирачният път при начална скорост 120 km/h? (до десети)', answer: { type: 'number', acceptedAnswers: ['69,4', '69', '69,44'], unit: 'm' } },
        { id: 'c', label: 'В)', points: 2, prompt: 'Колко пъти се увеличава спирачният път във втория случай спрямо първия?', answer: { type: 'number', acceptedAnswers: ['5,76', '5,8'] } }
      ],
      explanation: t`Превръщаме в m/s: $50\ \text{km/h}=\dfrac{50}{3{,}6}\approx 13{,}89$ m/s и $120\ \text{km/h}=\dfrac{120}{3{,}6}\approx 33{,}33$ m/s. А) $s_1=\dfrac{13{,}89^2}{16}\approx 12{,}1$ m. Б) $s_2=\dfrac{33{,}33^2}{16}\approx 69{,}4$ m. В) Пътят е пропорционален на квадрата на скоростта: $\left(\dfrac{120}{50}\right)^2=5{,}76$ пъти.`
    },
    {
      id: 'phys-s3', number: 0, kind: 'short', points: 2, topic: PHYS, answerType: 'number',
      prompt: t`Явор и Иван трябва да преместят тежък сандък. При преместването на сандъка върху него действа и голяма сила на триене в противоположна посока (силите са на фигурата). Движението започва от покой с ускорение $1\ \text{m/s}^2$. Колко е масата на сандъка (в kg)? Помощна формула: $F=ma$.`,
      stimulus: [{ kind: 'figure', figureId: 'int-phys-forces', alt: 'Сандък: две сили по 500 N в едната посока и 800 N в обратната.' }],
      acceptedAnswers: ['200'],
      explanation: t`Двете момчета действат с по 500 N в една посока, а триенето — с 800 N в обратната. Равнодействащата е $500+500-800=200$ N. От $F=ma$: $m=\dfrac{200}{1}=200$ kg.`
    },
    {
      id: 'phys-s4', number: 0, kind: 'multi', points: 6, topic: PHYS,
      prompt: t`Моника направила три опита с различни консуматори, като измерила тока и напрежението и определила съпротивлението на всеки. По невнимание заляла таблицата със сок. Възстановете стойностите под петната. Помощна формула: $R=\dfrac{U}{I}$.`,
      stimulus: [
        {
          kind: 'table',
          head: ['Опит', 'Напрежение U, V', 'Ток I, A', 'Съпротивление R, Ω'],
          rows: [['1', '10', '2', '?'], ['2', '20', '?', '10'], ['3', '?', '5', '6']]
        }
      ],
      parts: [
        { id: 'a', label: 'А)', points: 2, prompt: 'Опит 1: R =', answer: { type: 'number', acceptedAnswers: ['5'], unit: 'Ω' } },
        { id: 'b', label: 'Б)', points: 2, prompt: 'Опит 2: I =', answer: { type: 'number', acceptedAnswers: ['2'], unit: 'A' } },
        { id: 'c', label: 'В)', points: 2, prompt: 'Опит 3: U =', answer: { type: 'number', acceptedAnswers: ['30'], unit: 'V' } }
      ],
      explanation: t`А) $R=\dfrac{10}{2}=5\ \Omega$. Б) $I=\dfrac{U}{R}=\dfrac{20}{10}=2$ A. В) $U=IR=5\cdot 6=30$ V.`
    },
    {
      id: 'phys-s5', number: 0, kind: 'multi', points: 6, topic: PHYS,
      prompt: t`Семейство поставя фотоволтаични панели на покрива си. Покривът има площ 40 m², като половината от нея може да се използва за панели. При ясно време слънчевото излъчване носи 1000 W на 1 m². Само 20% от енергията се превръща в електрическа. Помощна формула: $E=P\cdot t$.`,
      parts: [
        { id: 'a', label: 'А)', points: 2, prompt: 'Колко е максималната електрическа мощност от панелите?', answer: { type: 'number', acceptedAnswers: ['4'], unit: 'kW' } },
        { id: 'b', label: 'Б)', points: 2, prompt: 'Колко енергия ще произведат за 5 часа работа при тези условия?', answer: { type: 'number', acceptedAnswers: ['20'], unit: 'kWh' } },
        { id: 'c', label: 'В)', points: 2, prompt: 'Колко лева ще спести семейството за този ден, ако цената на електроенергията е 0,25 лв./kWh?', answer: { type: 'number', acceptedAnswers: ['5'], unit: 'лв.' } }
      ],
      explanation: t`А) Площта с панели е 20 m²; падащата мощност е $20\cdot 1000=20\,000$ W, а електрическата — $20\%\cdot 20\,000=4000$ W = 4 kW. Б) $E=4\ \text{kW}\cdot 5\ \text{h}=20$ kWh. В) $20\cdot 0{,}25=5$ лв.`
    },
    {
      id: 'phys-s6', number: 0, kind: 'multi', points: 4, topic: PHYS,
      prompt: t`На строеж кран издига вертикално товар с маса 2 тона на височина 15 m за 2,5 min. Помощни формули: $F=m\cdot g$, $A=F\cdot d$.`,
      parts: [
        { id: 'a', label: 'А)', points: 2, prompt: 'Колко е теглото на товара в kN?', answer: { type: 'number', acceptedAnswers: ['20', '19,6'], unit: 'kN' } },
        { id: 'b', label: 'Б)', points: 2, prompt: 'Колко е механичната работа, извършена от крана? (в kJ)', answer: { type: 'number', acceptedAnswers: ['300', '294'], unit: 'kJ' } }
      ],
      explanation: t`А) $F=2000\cdot 10=20\,000$ N = 20 kN (с $g=9{,}8\ \text{m/s}^2$ — 19,6 kN; МОН не посочва $g$, затова се приемат и двата отговора). Б) $A=20\ \text{kN}\cdot 15\ \text{m}=300$ kJ (или 294 kJ при $g=9{,}8$). В условието на МОН работата е поискана „в kN“, но мерната ѝ единица е kJ.`
    },
    {
      id: 'phys-s7', number: 0, kind: 'short', points: 2, topic: PHYS, answerType: 'number',
      prompt: t`При изследване на електрическа верига с променлив ток е измерена максимална стойност на напрежението $U_m=300$ V и максимална стойност на тока $I_m=6$ A. Колко е електрическата мощност във веригата (в W)? Помощни формули: $I_{ef}=\dfrac{I_m}{\sqrt{2}}$, $U_{ef}=\dfrac{U_m}{\sqrt{2}}$, $P=I_{ef}\cdot U_{ef}$.`,
      acceptedAnswers: ['900'],
      explanation: t`$P=\dfrac{I_m}{\sqrt{2}}\cdot\dfrac{U_m}{\sqrt{2}}=\dfrac{6\cdot 300}{2}=900$ W.`
    },
    {
      id: 'phys-s8', number: 0, kind: 'short', points: 2, topic: PHYS, answerType: 'number',
      prompt: 'Иво измерва ъгъла на пречупване на лазерен лъч при преминаването му от въздух във вода, без да използва закона за пречупване на светлината. Като използвате данните от чертежа — част от падащия лъч се отразява под ъгъл 30°, а пречупеният лъч е отклонен с 8° от продължението на падащия, — определете на колко градуса е равен ъгълът на пречупване β.',
      stimulus: [{ kind: 'figure', figureId: 'int-phys-refraction', alt: 'Лъч от въздух към вода; отразеният лъч е под 30° спрямо нормалата, пречупеният е отклонен с 8° от продължението на падащия.' }],
      acceptedAnswers: ['22'],
      explanation: 'Ъгълът на отражение е равен на ъгъла на падане, т.е. 30°. Продължението на падащия лъч сключва 30° с нормалата, а пречупеният лъч е с 8° по-близо до нея: β = 30° − 8° = 22°.'
    },
    {
      id: 'phys-s9', number: 0, kind: 'short', points: 2, topic: PHYS, answerType: 'number',
      prompt: 'В слънчев ден човек стои до дърво. В един и същи момент са измерени дължините на сенките им: сянката на човека е 1,5 m, а на дървото — 10 m. Височината на човека е 1,80 m. Намерете височината на дървото в метри.',
      acceptedAnswers: ['12'],
      explanation: t`Лъчите са успоредни, затова отношението височина : сянка е едно и също: $\dfrac{h}{10}=\dfrac{1{,}8}{1{,}5}=1{,}2$, откъдето $h=12$ m.`
    },
    {
      id: 'phys-s10', number: 0, kind: 'multi', points: 4, topic: PHYS,
      prompt: t`На фигурата е показана графиката на хармонична звукова вълна. Помощна формула: $T=\dfrac{1}{\nu}$.`,
      stimulus: [{ kind: 'figure', figureId: 'int-phys-wave', alt: 'Синусоида от 0 до 10 ms; пет пълни трептения.' }],
      parts: [
        { id: 'a', label: 'А)', points: 2, prompt: 'Определете периода на вълната.', answer: { type: 'number', acceptedAnswers: ['2'], unit: 'ms' } },
        { id: 'b', label: 'Б)', points: 2, prompt: 'Колко е честотата на звука?', answer: { type: 'number', acceptedAnswers: ['500'], unit: 'Hz' } }
      ],
      explanation: t`А) За 10 ms има 5 пълни трептения (максимуми при 0,5; 2,5; 4,5 … ms), затова $T=2$ ms. Б) $\nu=\dfrac{1}{T}=\dfrac{1}{0{,}002\ \text{s}}=500$ Hz.`
    },
    {
      id: 'phys-s11', number: 0, kind: 'short', points: 2, topic: PHYS, answerType: 'number',
      prompt: t`Мълнията е електрически ток във въздуха между облак и земната повърхност. За време 1 ms при напрежение от порядъка на милиард волта ($10^9$ V) токът е около 20 kA. Каква сума (в лева) би спестило домакинството на Ани, ако можеше да използва електроенергията само от една мълния? Приемете, че 1 kWh струва 24 стотинки. Използвайте $E=U\cdot I\cdot t$. (Задача от модела на МОН за 2025/26 г.)`,
      stimulus: [{ kind: 'figure', figureId: 'int-phys-lightning', alt: 'Мълния между облак и земята.' }],
      acceptedAnswers: ['1333', '1333,33', '1333,3'],
      explanation: t`$E=10^9\cdot 20\,000\cdot 0{,}001=2\cdot 10^{10}$ J. Тъй като 1 kWh $=3{,}6\cdot 10^6$ J, $E\approx 5555{,}6$ kWh. Спестяването е $5555{,}6\cdot 0{,}24\approx 1333{,}33$ лв.`
    },
  ],
};

const sections = numbered([nvo2026Section(['m26-q15']), samples]);

export const NVO10_PHYS_SAMPLES: ExamPaper = {
  ...SAMPLE_PAPER_BASE,
  id: 'sample-nvo10-phys',
  title: 'НВО 10 — физика и астрономия: задачи на МОН',
  subject: 'Физика и астрономия',
  officialSourceUrl: 'https://www.mon.bg/nfs/2025/09/primerni-10kl-fa_30092025.pdf',
  maxPoints: maxPointsOf(sections),
  sections,
};
