import { toLessonGrade, type Flashcard, type LessonData, type LessonSubject, type NotebookCheckItem, type QuizQuestion } from '../types';
import type { CurriculumSubDomain } from '../data/bulgarianCurriculumTree';
import type {
  GradeCurriculumMatrix,
  GradeSubjectMatrixEntry,
  SchoolCategorySection,
  SchoolSpecialtyItem
} from '../data/schoolsSpecialtiesDatabase';

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

function createSeededRng(seed: number): () => number {
  let state = (seed >>> 0) || 123456789;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function seededShuffle<T>(items: readonly T[], rng: () => number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function clampTextLength(text: string, maxLen: number): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLen) return cleaned;
  const sliced = cleaned.slice(0, maxLen - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${(lastSpace > maxLen * 0.6 ? sliced.slice(0, lastSpace) : sliced).replace(/[,;:\-–—]+$/, '')}…`;
}

/**
 * Построява въпрос с 4 опции, балансиран индекс на верния отговор (desiredCorrectIndex)
 * и защита срещу longest-answer bias (дължината на верния отговор не надвишава 1.65x най-дългия дистрактор).
 */
function buildBalancedQuestion(params: {
  id: number;
  question: string;
  correctAnswer: string;
  distractors: string[];
  explanation: string;
  desiredCorrectIndex: number;
  rng: () => number;
}): QuizQuestion {
  const uniqueDistractors: string[] = [];
  const normCorrect = params.correctAnswer.trim().toLowerCase();

  for (const rawD of params.distractors) {
    const cleaned = rawD.replace(/\s+/g, ' ').trim();
    if (!cleaned) continue;
    if (cleaned.toLowerCase() === normCorrect) continue;
    if (uniqueDistractors.some((u) => u.toLowerCase() === cleaned.toLowerCase())) continue;
    uniqueDistractors.push(cleaned);
    if (uniqueDistractors.length === 3) break;
  }

  const fallbackDistractors = [
    'Твърдението не отговаря на установените норми и закономерности в учебната програма на МОН по темата',
    'Този процес се проявява само при специфични външни условия, изключени от разглеждания модел в урока',
    'Посочената зависимост е обратна на реалната причинно-следствена връзка, изучавана в този раздел'
  ];

  let fbIdx = 0;
  while (uniqueDistractors.length < 3) {
    const candidate = fallbackDistractors[fbIdx % fallbackDistractors.length];
    fbIdx += 1;
    if (!uniqueDistractors.includes(candidate) && candidate.toLowerCase() !== normCorrect) {
      uniqueDistractors.push(candidate);
    }
  }

  const maxDistractorLen = Math.max(...uniqueDistractors.map((d) => d.length), 24);
  const safeMaxCorrectLen = Math.max(Math.floor(maxDistractorLen * 1.6), 45);
  const finalCorrect =
    params.correctAnswer.length > safeMaxCorrectLen
      ? clampTextLength(params.correctAnswer, safeMaxCorrectLen)
      : params.correctAnswer.trim();

  const shuffledDistractors = seededShuffle(uniqueDistractors, params.rng).slice(0, 3);
  const targetIdx = ((params.desiredCorrectIndex % 4) + 4) % 4;
  const options: string[] = [];
  let dCursor = 0;
  for (let i = 0; i < 4; i += 1) {
    if (i === targetIdx) {
      options.push(finalCorrect);
    } else {
      options.push(shuffledDistractors[dCursor]);
      dCursor += 1;
    }
  }

  return {
    id: params.id,
    question: params.question.trim(),
    options,
    correctIndex: targetIdx,
    explanation: params.explanation.trim()
  };
}

/**
 * Генерира параметризирани изчислителни и приложни задачи според предмета и ключовите думи на урока.
 * При всеки нов variantNumber числата и казусите се променят детерминирано и безкрайно.
 */
function generateParameterizedSubjectQuestions(
  lesson: LessonData,
  variantNumber: number,
  rng: () => number
): QuizQuestion[] {
  const results: QuizQuestion[] = [];
  const textBlob = `${lesson.id} ${lesson.title} ${lesson.subject} ${lesson.summary.overview}`.toLowerCase();
  const v = Math.max(1, variantNumber);

  // 1. МАТЕМАТИКА
  if (lesson.subject === 'Математика' || textBlob.includes('математ') || textBlob.includes('алгебр') || textBlob.includes('геометр')) {
    // Задача А: Квадратно уравнение и формули на Виет
    const r1 = (v % 6) + 2; // 2..7
    const r2 = ((v * 3) % 7) + 3; // 3..9
    const sumRoots = r1 + r2;
    const prodRoots = r1 * r2;
    const sumSquares = r1 * r1 + r2 * r2;
    results.push(
      buildBalancedQuestion({
        id: 700000 + v * 10 + 1,
        question: `По формулите на Виет за квадратното уравнение x² − ${sumRoots}x + ${prodRoots} = 0 намерете точната стойност на израза x₁² + x₂², където x₁ и x₂ са корените на уравнението:`,
        correctAnswer: `${sumSquares} (тъй като x₁ + x₂ = ${sumRoots}, x₁x₂ = ${prodRoots} и x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂)`,
        distractors: [
          `${sumRoots * sumRoots + 2 * prodRoots} (при неправилно събиране вместо изваждане на удвоеното произведение 2x₁x₂)`,
          `${sumRoots * sumRoots - prodRoots} (при пропускане на коефициента 2 пред произведението x₁x₂ във формулата)`,
          `${Math.abs(sumSquares - 2 * r1)} (при директно повдигане на коефициентите в квадрат без формулите на Виет)`
        ],
        explanation: `Съгласно формулите на Виет x₁ + x₂ = ${sumRoots} и x₁·x₂ = ${prodRoots}. Тогава x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = ${sumRoots}² − 2·${prodRoots} = ${sumRoots * sumRoots} − ${2 * prodRoots} = ${sumSquares}. (Корените са x₁ = ${r1} и x₂ = ${r2}).`,
        desiredCorrectIndex: (v + 1) % 4,
        rng
      })
    );

    // Задача Б: Аритметична прогресия или Производна/екстремум или Тригонометрия/Планиметрия
    if (textBlob.includes('производн') || textBlob.includes('екстрем') || textBlob.includes('анализ')) {
      const p = (v % 5) + 2; // 2..6
      const c = ((v * 2) % 9) + 1;
      const minX = 2 * p;
      const fMax = c;
      const fMin = minX * minX * minX - 3 * p * minX * minX + c;
      results.push(
        buildBalancedQuestion({
          id: 700000 + v * 10 + 2,
          question: `Дадена е функцията f(x) = x³ − ${3 * p}x² + ${c}. В коя точка функцията достига своя локален минимум и каква е стойността на производната f'(x)?`,
          correctAnswer: `f'(x) = 3x² − ${6 * p}x; локален минимум в x = ${minX} със стойност f(${minX}) = ${fMin}`,
          distractors: [
            `f'(x) = 3x² − ${6 * p}x; локален минимум в x = 0 със стойност f(0) = ${fMax}`,
            `f'(x) = x² − ${3 * p}x; локален минимум в x = ${p} със стойност f(${p}) = ${p * p * p - 3 * p * p * p + c}`,
            `f'(x) = 3x² − ${3 * p}x; локален минимум в x = ${p} със стойност f(${p}) = ${c - p}`
          ],
          explanation: `Пресмятаме f'(x) = 3x² − ${6 * p}x = 3x(x − ${minX}). От f'(x) = 0 намираме критичните точки x₁ = 0 (локален максимум) и x₂ = ${minX} (локален минимум, тъй като f''(${minX}) = 6·${minX} − ${6 * p} = ${6 * p} > 0). Тогава f(${minX}) = ${fMin}.`,
          desiredCorrectIndex: (v + 2) % 4,
          rng
        })
      );
    } else if (textBlob.includes('стереометр') || textBlob.includes('пирамид') || textBlob.includes('цилинд') || textBlob.includes('конус')) {
      const r = (v % 5) + 3; // 3..7
      const h = ((v * 2) % 6) + 4; // 4..9
      const volCylinder = r * r * h;
      const lateralArea = 2 * r * h;
      results.push(
        buildBalancedQuestion({
          id: 700000 + v * 10 + 2,
          question: `Прав кръгов цилиндър има радиус на основата r = ${r} cm и височина h = ${h} cm. Колко са неговият обем V и околна повърхнина S_ок?`,
          correctAnswer: `V = ${volCylinder}π cm³ и S_ок = ${lateralArea}π cm²`,
          distractors: [
            `V = ${Math.round(volCylinder / 3)}π cm³ и S_ок = ${r * h}π cm²`,
            `V = ${2 * r * h}π cm³ и S_ок = ${r * r * h}π cm²`,
            `V = ${volCylinder}π cm³ и S_ок = ${2 * r * (r + h)}π cm²`
          ],
          explanation: `Обемът на прав кръгов цилиндър е V = πr²h = π·${r}²·${h} = ${volCylinder}π cm³, а околната му повърхнина е S_ок = 2πrh = 2π·${r}·${h} = ${lateralArea}π cm².`,
          desiredCorrectIndex: (v + 2) % 4,
          rng
        })
      );
    } else {
      const a1 = (v % 7) + 3;
      const d = ((v * 2) % 5) + 2;
      const n = ((v % 4) + 5) * 2; // 10, 12, 14, 16
      const an = a1 + (n - 1) * d;
      const sn = ((a1 + an) * n) / 2;
      results.push(
        buildBalancedQuestion({
          id: 700000 + v * 10 + 2,
          question: `В аритметична прогресия първият член е a₁ = ${a1}, а разликата е d = ${d}. Намерете ${n}-тия член a_${n} и сумата S_${n} на първите ${n} члена:`,
          correctAnswer: `a_${n} = ${an} и S_${n} = ${sn}`,
          distractors: [
            `a_${n} = ${a1 + n * d} и S_${n} = ${sn + n * d}`,
            `a_${n} = ${an} и S_${n} = ${an * n}`,
            `a_${n} = ${a1 + (n - 2) * d} и S_${n} = ${sn - a1}`
          ],
          explanation: `По формулите за аритметична прогресия: a_${n} = a₁ + (${n} − 1)d = ${a1} + ${n - 1}·${d} = ${an}. Сумата е S_${n} = ((a₁ + a_${n})·${n}) / 2 = ((${a1} + ${an})·${n}) / 2 = ${sn}.`,
          desiredCorrectIndex: (v + 2) % 4,
          rng
        })
      );
    }
  }

  // 2. ФИЗИКА И АСТРОНОМИЯ
  if (lesson.subject === 'Физика и астрономия' || textBlob.includes('физик') || textBlob.includes('електр') || textBlob.includes('механик')) {
    const resistance = ((v % 6) + 2) * 5; // 10..35 Ohm
    const current = (v % 4) + 2; // 2..5 A
    const voltage = current * resistance;
    const power = current * current * resistance;
    results.push(
      buildBalancedQuestion({
        id: 700000 + v * 10 + 3,
        question: `През консуматор със съпротивление R = ${resistance} Ω протича постоянен ток I = ${current} A под напрежение U = ${voltage} V. Каква е електрическата мощност P и отделеното количество топлина Q за време t = 10 s?`,
        correctAnswer: `Мощност P = ${power} W и количество топлина Q = ${power * 10} J (по закона на Джаул-Ленц)`,
        distractors: [
          `Мощност P = ${voltage * current * 2} W и количество топлина Q = ${voltage * 10} J`,
          `Мощност P = ${current * resistance} W и количество топлина Q = ${current * resistance * 10} J`,
          `Мощност P = ${Math.round(voltage / current)} W и количество топлина Q = ${power} J`
        ],
        explanation: `По закона на Ом U = I·R = ${current}·${resistance} = ${voltage} V. Мощността е P = U·I = I²·R = ${current}²·${resistance} = ${power} W, а по закона на Джаул-Ленц за t = 10 s се отделя топлина Q = P·t = ${power}·10 = ${power * 10} J.`,
        desiredCorrectIndex: (v + 3) % 4,
        rng
      })
    );

    const mass = (v % 5) + 2; // 2..6 kg
    const vel = ((v * 2) % 6) + 4; // 4..9 m/s
    const ek = 0.5 * mass * vel * vel;
    const momentum = mass * vel;
    results.push(
      buildBalancedQuestion({
        id: 700000 + v * 10 + 4,
        question: `Тяло с маса m = ${mass} kg се движи със скорост v = ${vel} m/s. Колко са неговата кинетична енергия E_k и импулс p?`,
        correctAnswer: `Кинетична енергия E_k = ${ek} J и импулс p = ${momentum} kg·m/s`,
        distractors: [
          `Кинетична енергия E_k = ${mass * vel * vel} J и импулс p = ${momentum} kg·m/s`,
          `Кинетична енергия E_k = ${momentum} J и импулс p = ${ek} kg·m/s`,
          `Кинетична енергия E_k = ${mass * vel} J и импулс p = ${0.5 * mass * vel} kg·m/s`
        ],
        explanation: `Кинетичната енергия се пресмята по формулата E_k = (m·v²)/2 = (${mass}·${vel}²)/2 = ${ek} J, а импулсът на тялото е p = m·v = ${mass}·${vel} = ${momentum} kg·m/s.`,
        desiredCorrectIndex: v % 4,
        rng
      })
    );
  }

  // 3. ХИМИЯ И ООС
  if (lesson.subject === 'Химия и ООС' || textBlob.includes('хими') || textBlob.includes('киселин') || textBlob.includes('разтвор')) {
    const exp = (v % 5) + 1; // 1..5
    const poh = 14 - exp;
    const moles = ((v % 4) + 1) * 0.5; // 0.5, 1.0, 1.5, 2.0 mol
    const volL = (v % 2) + 1; // 1 or 2 L
    const molarity = moles / volL;
    results.push(
      buildBalancedQuestion({
        id: 700000 + v * 10 + 5,
        question: `Воден разтвор на едноосновна силна киселина (HCl) при 25°C има водороден показател pH = ${exp}. Каква е моларната концентрация на водородните катиони [H⁺] и каква е стойността на pOH?`,
        correctAnswer: `[H⁺] = 10⁻${exp} mol/L и pOH = ${poh} (тъй като pH + pOH = 14 при 25°C)`,
        distractors: [
          `[H⁺] = ${exp} mol/L и pOH = ${10 - exp} (при линейно вместо логаритмично отчитане на скалата)`,
          `[H⁺] = 10⁻${poh} mol/L и pOH = ${exp} (при размяна на киселинния и основния показател)`,
          `[H⁺] = 10⁻⁷ mol/L и pOH = 7 (независимо от концентрацията на силната киселина)`
        ],
        explanation: `По дефиниция pH = −lg[H⁺], откъдето [H⁺] = 10⁻pH = 10⁻${exp} mol/L. От йонното произведение на водата Kw = 10⁻¹⁴ следва pH + pOH = 14, значи pOH = 14 − ${exp} = ${poh}. (При ${moles} mol в ${volL} L моларността е c = ${molarity} mol/L).`,
        desiredCorrectIndex: (v + 1) % 4,
        rng
      })
    );
  }

  // 4. БИОЛОГИЯ И ЗО
  if (lesson.subject === 'Биология и ЗО' || textBlob.includes('биолог') || textBlob.includes('днк') || textBlob.includes('клетк') || textBlob.includes('генет')) {
    const adeninePct = 15 + (v % 16); // 15%..30%
    const thyminePct = adeninePct;
    const guaninePct = 50 - adeninePct;
    const cytosinePct = guaninePct;
    const codons = ((v % 6) + 4) * 10; // 40..90
    const nucleotides = codons * 3;
    results.push(
      buildBalancedQuestion({
        id: 700000 + v * 10 + 6,
        question: `В двуверижна молекула ДНК процентното съдържание на аденин (А) е ${adeninePct}%. Колко процента са гуанинът (Г) и цитозинът (Ц) по правилата на Чаргаф и колко кодона кодират полипептидна верига от ${codons} аминокиселини?`,
        correctAnswer: `Г = ${guaninePct}%, Ц = ${cytosinePct}% (при Т = ${thyminePct}%); полипептидът се кодира от ${codons} смислови кодона (${nucleotides} нуклеотида)`,
        distractors: [
          `Г = ${adeninePct}%, Ц = ${adeninePct}% (при Т = ${guaninePct}%); полипептидът се кодира от ${nucleotides} кодона`,
          `Г = ${100 - 2 * adeninePct}%, Ц = ${adeninePct}%; полипептидът се кодира от ${Math.round(codons / 3)} кодона`,
          `Г = ${guaninePct}%, Ц = ${thyminePct}%; полипептидът се кодира от ${codons * 2} смислови кодона`
        ],
        explanation: `По правилата на Чаргаф за комплементарност в двуверижна ДНК: А = Т = ${adeninePct}% (общо А + Т = ${2 * adeninePct}%). Останалите ${100 - 2 * adeninePct}% се разпределят поравно между Г и Ц: Г = Ц = ${guaninePct}%. Всяка аминокиселина се кодира от 1 триплет (кодон) от 3 нуклеотида, т.е. ${codons} кодона (${nucleotides} нуклеотида).`,
        desiredCorrectIndex: (v + 2) % 4,
        rng
      })
    );
  }

  // 5. ИНФОРМАТИКА, ИТ И ПРОГРАМИРАНЕ
  if (lesson.subject === 'Информатика, ИТ и Програмиране' || textBlob.includes('алгорит') || textBlob.includes('програм') || textBlob.includes('мреж') || textBlob.includes('кибер')) {
    const power = (v % 7) + 10; // 10..16 -> 1024..65536
    const arraySize = 2 ** power;
    const prefix = 24 + (v % 5); // /24 .. /28
    const usableHosts = 2 ** (32 - prefix) - 2;
    results.push(
      buildBalancedQuestion({
        id: 700000 + v * 10 + 7,
        question: `Какъв е максималният брой сравнения при двоично търсене (Binary Search) в сортиран масив с N = ${arraySize} (2^${power}) елемента и колко използваеми хост IPv4 адреса има в подмрежа с префикс /${prefix}?`,
        correctAnswer: `До ${power} сравнения (сложност O(log₂ N)) и ${usableHosts} използваеми хост адреса (2^${32 - prefix} − 2)`,
        distractors: [
          `До ${arraySize / 2} сравнения (сложност O(N/2)) и ${usableHosts + 2} използваеми хост адреса`,
          `До ${power * 2} сравнения (сложност O(N log N)) и ${2 ** (32 - prefix - 1)} използваеми хост адреса`,
          `До ${power} сравнения (сложност O(log₂ N)) и ${usableHosts * 2} използваеми хост адреса`
        ],
        explanation: `При двоично търсене в сортиран масив с N = 2^${power} = ${arraySize} елемента интервалът се разполовява на всяка стъпка и са нужни най-много log₂(${arraySize}) = ${power} сравнения. В IPv4 мрежа /${prefix} за хостове остават 32 − ${prefix} = ${32 - prefix} бита, което дава 2^${32 - prefix} − 2 = ${usableHosts} използваеми адреса (без мрежовия и broadcast адреса).`,
        desiredCorrectIndex: (v + 3) % 4,
        rng
      })
    );
  }

  // 6. ИКОНОМИКА, БИЗНЕС И ПРОФЕСИОНАЛНА ПОДГОТОВКА
  if (
    lesson.subject === 'Икономика, Бизнес и Предприемачество' ||
    lesson.subject === 'Професионални специалности и Инженерство' ||
    textBlob.includes('иконом') ||
    textBlob.includes('предприемач') ||
    textBlob.includes('финанс')
  ) {
    const unitMargin = ((v % 5) + 2) * 10; // 20..60 EUR
    const avc = ((v % 4) + 1) * 15; // 15..60 EUR
    const price = avc + unitMargin;
    const bepUnits = ((v % 6) + 3) * 100; // 300..800 units
    const fixedCosts = bepUnits * unitMargin;
    results.push(
      buildBalancedQuestion({
        id: 700000 + v * 10 + 8,
        question: `Предприятие има постоянни разходи FC = ${fixedCosts} EUR, продажна цена на единица продукция P = ${price} EUR и средни променливи разходи AVC = ${avc} EUR. Какъв е критичният обем на продажбите (Break-Even Point, Q_BEP)?`,
        correctAnswer: `Q_BEP = ${bepUnits} броя (при марж на покритие P − AVC = ${unitMargin} EUR на единица)`,
        distractors: [
          `Q_BEP = ${Math.round(fixedCosts / price)} броя (при делене на постоянните разходи директно на продажната цена P)`,
          `Q_BEP = ${Math.round(fixedCosts / avc)} броя (при делене на постоянните разходи само на променливите разходи AVC)`,
          `Q_BEP = ${bepUnits * 2} броя (при удвояване на постоянните разходи във формулата за критична точка)`
        ],
        explanation: `Формулата за критичния обем на производството (Break-Even Point) е Q_BEP = FC / (P − AVC) = ${fixedCosts} / (${price} − ${avc}) = ${fixedCosts} / ${unitMargin} = ${bepUnits} единици. В тази точка приходите покриват точно общите разходи (печалбата е 0 EUR).`,
        desiredCorrectIndex: v % 4,
        rng
      })
    );
  }

  // 7. ГЕОГРАФИЯ И ИКОНОМИКА
  if (lesson.subject === 'География и икономика' || textBlob.includes('географ') || textBlob.includes('населен') || textBlob.includes('релеф')) {
    const birthRate = 8 + (v % 5); // 8..12 ‰
    const deathRate = 11 + ((v * 2) % 6); // 11..16 ‰
    const naturalGrowth = birthRate - deathRate;
    const mapCm = (v % 6) + 4; // 4..9 cm
    const scaleKmPerCm = ((v % 4) + 1) * 5; // 5, 10, 15, 20 km per cm
    const scaleNumber = scaleKmPerCm * 100000;
    const realKm = mapCm * scaleKmPerCm;
    results.push(
      buildBalancedQuestion({
        id: 700000 + v * 10 + 9,
        question: `В даден географски район раждаемостта е ${birthRate}‰, а смъртността е ${deathRate}‰. Колко е коефициентът на естествен прираст и какво реално разстояние съответства на отсечка от ${mapCm} cm върху карта с мащаб 1 : ${scaleNumber.toLocaleString('bg-BG')}?`,
        correctAnswer: `Естествен прираст ${naturalGrowth > 0 ? `+${naturalGrowth}` : naturalGrowth}‰ и реално разстояние ${realKm} km (при именуван мащаб 1 cm = ${scaleKmPerCm} km)`,
        distractors: [
          `Естествен прираст +${birthRate + deathRate}‰ и реално разстояние ${realKm * 10} km`,
          `Естествен прираст ${deathRate - birthRate > 0 ? `+${deathRate - birthRate}` : deathRate - birthRate}‰ и реално разстояние ${mapCm * (scaleKmPerCm / 2)} km`,
          `Естествен прираст ${naturalGrowth > 0 ? `+${naturalGrowth}` : naturalGrowth}% (в проценти вместо промили) и разстояние ${realKm / 10} km`
        ],
        explanation: `Естественият прираст е разликата между раждаемостта и смъртността: ${birthRate}‰ − ${deathRate}‰ = ${naturalGrowth}‰. При числен мащаб 1 : ${scaleNumber.toLocaleString('bg-BG')} на 1 cm от картата отговарят ${scaleKmPerCm} km на местността, следователно ${mapCm} cm са ${mapCm} × ${scaleKmPerCm} = ${realKm} km.`,
        desiredCorrectIndex: (v + 1) % 4,
        rng
      })
    );
  }

  // 8. БЪЛГАРСКИ ЕЗИК И ЛИТЕРАТУРА
  if (lesson.subject === 'Български език и литература' || textBlob.includes('литератур') || textBlob.includes('граматик') || textBlob.includes('пунктуац')) {
    const nounPairs = [
      { subj: 'Новият министър', obj: 'държавния бюджет', countForm: 'три нови проекта', polite: 'Вие сте поканени' },
      { subj: 'Главният редактор', obj: 'последния ръкопис', countForm: 'два литературни сборника', polite: 'Вие сте одобрени' },
      { subj: 'Младият изследовател', obj: 'научния доклад', countForm: 'четири архивни документа', polite: 'Вие сте уведомени' },
      { subj: 'Директорът на музея', obj: 'ценния експонат', countForm: 'пет старинни пръстена', polite: 'Вие сте записани' }
    ];
    const pair = nounPairs[v % nounPairs.length];
    results.push(
      buildBalancedQuestion({
        id: 700000 + v * 10 + 10,
        question: `В кое от следните изречения са спазени едновременно граматичната норма за пълен и кратък член, бройната форма за м.р. и учтивата форма според правилата на МОН?`,
        correctAnswer: `„${pair.subj} представи ${pair.obj} и подкрепи ${pair.countForm}, за които ${pair.polite}.“`,
        distractors: [
          `„${pair.subj.replace(/ят\b|ът\b/, 'я')} представи ${pair.obj} и подкрепи ${pair.countForm}та, за които ${pair.polite}.“`,
          `„${pair.subj} представи ${pair.obj.replace(/я\b/, 'ят')} и подкрепи ${pair.countForm}, за които Вие сте поканен.“`,
          `„${pair.subj.replace(/ят\b|ът\b/, 'я')} представи ${pair.obj.replace(/я\b/, 'ят')} и подкрепи ${pair.countForm}, за които Вие сте били разбрали.“`
        ],
        explanation: `Подлогът („${pair.subj}“) се членува с пълен член, прякото допълнение („${pair.obj}“) — с кратък член, неличните съществителни от м.р. след числително бройно приемат бройна форма на -а/-я („${pair.countForm}“), а при учтива форма страдателното причастие е в мн.ч. („${pair.polite}“).`,
        desiredCorrectIndex: (v + 2) % 4,
        rng
      })
    );
  }

  // 9. ИСТОРИЯ И ЦИВИЛИЗАЦИИ / ГРАЖДАНСКО ОБРАЗОВАНИЕ И ФИЛОСОФИЯ
  if (
    lesson.subject === 'История и цивилизации' ||
    lesson.subject === 'Гражданско образование и философия' ||
    textBlob.includes('истори') ||
    textBlob.includes('конституц')
  ) {
    const presentMPs = 140 + ((v * 12) % 90); // 140..228 present MPs (>= 121 quorum)
    const simpleMajority = Math.floor(presentMPs / 2) + 1;
    results.push(
      buildBalancedQuestion({
        id: 700000 + v * 10 + 11,
        question: `На заседание на Народното събрание на Република България (от общо 240 народни представители) присъстват ${presentMPs} депутати. Налице ли е конституционен кворум и колко гласа минимум са необходими за приемане на обикновен закон и за избор на министър-председател?`,
        correctAnswer: `Кворум е налице (${presentMPs} > 120); за обикновен закон са нужни поне ${simpleMajority} гласа (над 1/2 от присъстващите), а за премиер — поне 121 гласа`,
        distractors: [
          `Кворум е налице; и за обикновен закон, и за министър-председател са необходими квалифицирано мнозинство от 160 гласа (2/3 от всички)`,
          `Кворум липсва, тъй като за откриване на заседание се изискват минимум 160 присъстващи народни представители`,
          `Кворум е налице; за обикновен закон са нужни 121 гласа, а за министър-председател — ${simpleMajority} гласа от присъстващите`
        ],
        explanation: `По Конституцията на РБ Народното събрание заседава при кворум повече от половината от всички 240 депутати (поне 121; тук ${presentMPs} ≥ 121). Законите се приемат с обикновено мнозинство (повече от половината от присъстващите: ⌊${presentMPs}/2⌋ + 1 = ${simpleMajority} гласа), докато правителство се избира с абсолютно мнозинство (> 1/2 от всички, т.е. минимум 121 гласа).`,
        desiredCorrectIndex: (v + 3) % 4,
        rng
      })
    );
  }

  return results;
}

/**
 * Синтезира аналитични въпроси директно от материала на урока:
 * - flashcards (front -> back)
 * - notebookChecklist (requirement / whyNeeded -> suggestedNotes)
 * - summary.formulasOrDates (label <-> value)
 * - summary.keyPoints и summary.commonTraps
 */
function synthesizeQuestionsFromLessonMaterial(
  lesson: LessonData,
  allLessons: LessonData[],
  variantNumber: number,
  rng: () => number
): QuizQuestion[] {
  const synthesized: QuizQuestion[] = [];
  const sameSubjectLessons = allLessons.filter((l) => l.subject === lesson.subject && l.id !== lesson.id);

  // Събираме пул от дистрактори от същия предмет (флашкарти, бележки, формули, ключови точки)
  const subjectFlashcardBacks = [
    ...lesson.flashcards.map((f) => f.back),
    ...sameSubjectLessons.flatMap((l) => l.flashcards.map((f) => f.back))
  ].filter(Boolean);

  const subjectChecklistNotes = [
    ...(lesson.notebookChecklist || []).map((c) => c.suggestedNotes),
    ...sameSubjectLessons.flatMap((l) => (l.notebookChecklist || []).map((c) => c.suggestedNotes))
  ].filter(Boolean);

  const subjectFormulaValues = [
    ...lesson.summary.formulasOrDates.map((f) => `${f.label}: ${f.value}`),
    ...sameSubjectLessons.flatMap((l) => l.summary.formulasOrDates.map((f) => `${f.label}: ${f.value}`))
  ].filter(Boolean);

  const subjectKeyPoints = [
    ...lesson.summary.keyPoints,
    ...sameSubjectLessons.flatMap((l) => l.summary.keyPoints)
  ].filter(Boolean);

  // 1. Въпроси от флашкартите на урока (без механични шаблони — използваме директно въпроса от front)
  const rotatedFlashcards = seededShuffle(lesson.flashcards, rng);
  for (let i = 0; i < rotatedFlashcards.length; i += 1) {
    const fc: Flashcard = rotatedFlashcards[i];
    const cleanFront = fc.front.trim();
    const questionText = cleanFront.endsWith('?')
      ? cleanFront
      : `Според учебния материал по темата „${lesson.title}“, как се дефинира и обяснява: ${cleanFront}?`;

    const distractors = subjectFlashcardBacks.filter((b) => b.trim() !== fc.back.trim());
    synthesized.push(
      buildBalancedQuestion({
        id: 800000 + variantNumber * 100 + i,
        question: questionText,
        correctAnswer: fc.back,
        distractors,
        explanation: `${fc.back}${fc.hint ? ` (Насока: ${fc.hint})` : ''}`,
        desiredCorrectIndex: (variantNumber + i) % 4,
        rng
      })
    );
  }

  // 2. Въпроси от критериите за тетрадка / ДЗИ (notebookChecklist)
  const checklist: NotebookCheckItem[] = lesson.notebookChecklist || [];
  for (let i = 0; i < checklist.length; i += 1) {
    const item = checklist[i];
    if (!item.suggestedNotes || item.suggestedNotes.trim().length < 10) continue;
    const distractors = subjectChecklistNotes.filter((n) => n.trim() !== item.suggestedNotes.trim());
    synthesized.push(
      buildBalancedQuestion({
        id: 810000 + variantNumber * 100 + i,
        question: `При писмена разработка по темата „${lesson.title}“ по критериите на МОН се проверява елементът: „${item.requirement}“. Коя от следните формулировки представя коректно този елемент?`,
        correctAnswer: item.suggestedNotes,
        distractors,
        explanation: `Критерий на МОН: ${item.requirement}. Защо е важен: ${item.whyNeeded} Точен запис: ${item.suggestedNotes}`,
        desiredCorrectIndex: (variantNumber + i + 1) % 4,
        rng
      })
    );
  }

  // 3. Въпроси от формули, дати и закономерности (formulasOrDates) — с аналитична формулировка
  const formulas = lesson.summary.formulasOrDates || [];
  for (let i = 0; i < formulas.length; i += 1) {
    const f = formulas[i];
    const correctPair = `${f.label} — ${f.value}`;
    const distractors = [
      ...formulas
        .filter((_, idx) => idx !== i)
        .map((other) => `${f.label} — ${other.value}`),
      ...subjectFormulaValues.filter((val) => !val.includes(f.value))
    ];
    synthesized.push(
      buildBalancedQuestion({
        id: 820000 + variantNumber * 100 + i,
        question: `Коя от посочените зависимости и фактологични двойки от урока „${lesson.title}“ е формулирана вярно според програмата на МОН?`,
        correctAnswer: correctPair,
        distractors,
        explanation: `Според справочния конспект към урока „${lesson.title}“: ${f.label} → ${f.value}.`,
        desiredCorrectIndex: (variantNumber + i + 2) % 4,
        rng
      })
    );
  }

  // 4. Въпрос за изпитни капани и златно правило (commonTraps & examGoldenRule)
  if (lesson.summary.commonTraps.length > 0) {
    const trap = lesson.summary.commonTraps[variantNumber % lesson.summary.commonTraps.length];
    synthesized.push(
      buildBalancedQuestion({
        id: 830000 + variantNumber * 100 + 1,
        question: `Кое от следните методически предупреждения описва реален изпитен капан и правило за оценка Отличен (6.00) по темата „${lesson.title}“?`,
        correctAnswer: trap,
        distractors: subjectKeyPoints.filter((kp) => kp !== trap).map((kp) => `Невярно допускане: че ${kp.charAt(0).toLowerCase()}${kp.slice(1)}`),
        explanation: `Изпитен капан по МОН: ${trap} Златно правило: ${lesson.summary.examGoldenRule}`,
        desiredCorrectIndex: (variantNumber + 3) % 4,
        rng
      })
    );
  }

  return synthesized;
}

/**
 * Основен генератор на безкрайни, неповтарящи се, обвързани с материала тестови варианти по даден урок/тема.
 */
export function generateInfiniteLessonQuiz(
  baseLesson: LessonData,
  allLessons: LessonData[],
  variantNumber: number,
  targetCount = 10
): QuizQuestion[] {
  const seed = hashSeed(`${baseLesson.id}::variant::${variantNumber}`);
  const rng = createSeededRng(seed);

  // 1. Разбъркани базови въпроси от самия урок с пренаредени опции според варианта
  const rotatedBaseQuiz: QuizQuestion[] = seededShuffle(baseLesson.quiz, rng).map((q, idx) => {
    const correctText = q.options[q.correctIndex] ?? q.options[0];
    const distractors = q.options.filter((_, optIdx) => optIdx !== q.correctIndex);
    return buildBalancedQuestion({
      id: 900000 + variantNumber * 1000 + idx,
      question: q.question,
      correctAnswer: correctText,
      distractors,
      explanation: q.explanation,
      desiredCorrectIndex: (variantNumber + idx) % 4,
      rng
    });
  });

  // 2. Синтезирани аналитични въпроси от материала на урока (флашкарти, тетрадка, формули/дати, капани)
  const materialSynthesized = seededShuffle(
    synthesizeQuestionsFromLessonMaterial(baseLesson, allLessons, variantNumber, rng),
    rng
  );

  // 3. Параметризирани изчислителни/приложни задачи с нови числа за текущия вариант
  const parameterizedQuestions = generateParameterizedSubjectQuestions(baseLesson, variantNumber, rng);

  // 4. Въпроси от сродни уроци от същия предмет за надграждане
  const relatedPool = seededShuffle(
    allLessons
      .filter((l) => l.subject === baseLesson.subject && l.id !== baseLesson.id)
      .flatMap((l) => l.quiz),
    rng
  ).map((q, idx) => {
    const correctText = q.options[q.correctIndex] ?? q.options[0];
    const distractors = q.options.filter((_, optIdx) => optIdx !== q.correctIndex);
    return buildBalancedQuestion({
      id: 950000 + variantNumber * 1000 + idx,
      question: q.question,
      correctAnswer: correctText,
      distractors,
      explanation: q.explanation,
      desiredCorrectIndex: (variantNumber + idx + 2) % 4,
      rng
    });
  });

  // Комбинираме така, че при всеки нов вариант да има свежа комбинация от:
  // - параметризирани задачи с нови числа,
  // - синтезирани въпроси от конспекта/флашкартите/тетрадката на урока,
  // - основните въпроси на урока в нов ред и с разбъркани опции.
  const combined: QuizQuestion[] = [];
  const seenQuestions = new Set<string>();

  const pushUnique = (items: QuizQuestion[], maxToTake: number) => {
    let taken = 0;
    for (const item of items) {
      if (taken >= maxToTake || combined.length >= targetCount) break;
      const key = item.question.trim().toLowerCase();
      if (seenQuestions.has(key)) continue;
      seenQuestions.add(key);
      combined.push(item);
      taken += 1;
    }
  };

  if (variantNumber === 1) {
    pushUnique(rotatedBaseQuiz, Math.min(6, targetCount));
    pushUnique(parameterizedQuestions, 2);
    pushUnique(materialSynthesized, targetCount - combined.length);
    pushUnique(relatedPool, targetCount - combined.length);
  } else {
    // При Вариант #2, #3, ... ∞ даваме приоритет на параметризираните задачи с нови числа и синтезираните въпроси от материала,
    // ротирани спрямо номера на варианта, плюс част от основните въпроси.
    pushUnique(parameterizedQuestions, 3);
    const offset = ((variantNumber - 1) * 3) % Math.max(1, materialSynthesized.length);
    const rotatedMaterial = [
      ...materialSynthesized.slice(offset),
      ...materialSynthesized.slice(0, offset)
    ];
    pushUnique(rotatedMaterial, 4);
    pushUnique(rotatedBaseQuiz, targetCount - combined.length);
    pushUnique(relatedPool, targetCount - combined.length);
  }

  // Финално балансиране на correctIndex (0, 1, 2, 3), за да няма повече от ceil(N/3) на един и същ индекс
  return combined.map((q, finalIdx) => {
    const desiredIdx = (variantNumber + finalIdx) % 4;
    if (q.correctIndex === desiredIdx) {
      return { ...q, id: finalIdx + 1 };
    }
    const opts = [...q.options];
    const currentCorrect = opts[q.correctIndex];
    opts[q.correctIndex] = opts[desiredIdx];
    opts[desiredIdx] = currentCorrect;
    return {
      ...q,
      id: finalIdx + 1,
      options: opts,
      correctIndex: desiredIdx
    };
  });
}

/**
 * Изгражда специализиран урок с пълен учебен материал по МОН и тест за конкретна подтема (SubDomain) от Дървото на учебната програма.
 */
export function buildTailoredSubDomainLesson(
  subject: LessonSubject,
  gradeLabel: string,
  domainName: string,
  subDomain: CurriculumSubDomain,
  baseLesson: LessonData,
  allLessons: LessonData[]
): LessonData {
  const tailoredId = `${baseLesson.id}--sub-${subDomain.id}`;
  const checklistFromSubDomain: NotebookCheckItem[] = [
    ...subDomain.gradeRequirement6.map((req, idx) => ({
      id: `${subDomain.id}-req-${idx + 1}`,
      requirement: req,
      whyNeeded: `Задължителен критерий на МОН за оценка Отличен (6.00) по темата „${subDomain.name}“ (${domainName}).`,
      isEssentialForSix: true,
      suggestedNotes: `${req} (Ключови понятия: ${subDomain.keywords.slice(0, 6).join(', ')})`
    })),
    ...(baseLesson.notebookChecklist || [])
  ];

  const extraFlashcards: Flashcard[] = [
    {
      id: `${subDomain.id}-fc-1`,
      front: `Кои са задължителните изисквания на МОН за оценка Отличен (6.00) по темата „${subDomain.name}“?`,
      back: subDomain.gradeRequirement6.join(' | '),
      hint: domainName,
      tag: 'Критерии МОН 6.00'
    },
    {
      id: `${subDomain.id}-fc-2`,
      front: `Кои са най-честите изпитни грешки по темата „${subDomain.name}“ и как да ги избегнем?`,
      back: `${subDomain.commonPitfalls.join(' | ')} — Насока: ${subDomain.advice}`,
      hint: 'Изпитни капани',
      tag: 'Методика МОН'
    }
  ];

  const enrichedLesson: LessonData = {
    ...baseLesson,
    id: tailoredId,
    title: `${subDomain.name} (${gradeLabel})`,
    subject,
    grade: toLessonGrade(gradeLabel),
    originalNoteExcerpt: `${domainName} → ${subDomain.name}. Ключови понятия по МОН: ${subDomain.keywords.join(', ')}. ${baseLesson.originalNoteExcerpt}`,
    summary: {
      overview: `Разработка по учебната програма на МОН за ${gradeLabel} (${domainName}): „${subDomain.name}“. ${baseLesson.summary.overview}`,
      keyPoints: [
        ...subDomain.gradeRequirement6.map((r) => `[Изискване на МОН за 6.00] ${r}`),
        ...baseLesson.summary.keyPoints
      ],
      examGoldenRule: `${subDomain.advice} | ${baseLesson.summary.examGoldenRule}`,
      commonTraps: [
        ...subDomain.commonPitfalls,
        ...baseLesson.summary.commonTraps
      ],
      formulasOrDates: [
        { label: 'Дял от програмата на МОН', value: domainName },
        { label: 'Ключови термини за разпознаване', value: subDomain.keywords.slice(0, 8).join(', ') },
        ...baseLesson.summary.formulasOrDates
      ]
    },
    notebookChecklist: checklistFromSubDomain,
    flashcards: [...extraFlashcards, ...baseLesson.flashcards],
    quickQuestions: [
      `Обясни ми стъпка по стъпка темата „${subDomain.name}“ за ${gradeLabel} по програмата на МОН.`,
      `Кои са 3-те най-важни изисквания за оценка 6.00 върху „${subDomain.name}“?`,
      ...baseLesson.quickQuestions
    ]
  };

  return {
    ...enrichedLesson,
    quiz: generateInfiniteLessonQuiz(enrichedLesson, allLessons, 1, 10)
  };
}

/**
 * Изгражда специализиран урок с пълен учебен материал по МОН и тест за конкретна специалност (СППОО / Профил) от Училища и Специалности.
 */
export function buildTailoredSpecialtyLesson(
  section: SchoolCategorySection,
  specialty: SchoolSpecialtyItem,
  baseLesson: LessonData,
  allLessons: LessonData[]
): LessonData {
  const tailoredId = `${baseLesson.id}--spec-${specialty.code.toLowerCase().replace(/[^a-z0-9а-я]+/gi, '-')}`;

  const specialtyQuizConverted: QuizQuestion[] = section.specialtyQuiz.map((sq, idx) => ({
    id: 600 + idx,
    question: sq.question,
    options: sq.options,
    correctIndex: sq.correctAnswer,
    explanation: `[${sq.specialtyTag}] ${sq.explanation}`
  }));

  const checklistFromSection: NotebookCheckItem[] = [
    ...section.keySynthesisRules.map((rule, idx) => ({
      id: `spec-rule-${idx + 1}`,
      requirement: `${rule.title} (${section.shortName})`,
      whyNeeded: rule.context,
      isEssentialForSix: true,
      suggestedNotes: rule.formulaOrRule
    })),
    ...(baseLesson.notebookChecklist || [])
  ];

  const enrichedLesson: LessonData = {
    ...baseLesson,
    id: tailoredId,
    title: `${specialty.name} (Код ${specialty.code})`,
    audience: `${section.shortName} — ${specialty.qualification}`,
    originalNoteExcerpt: `Специалност/Профил: ${specialty.name} (Код: ${specialty.code}) | ${specialty.qualification}. Основни модули по МОН: ${specialty.coreSubjects.join('; ')}. Изпитен формат: ${section.examFormat}.`,
    summary: {
      overview: `Пълен учебен и изпитен материал по програмата на МОН за специалност „${specialty.name}“ (Код ${specialty.code}, ${specialty.qualification}) в ${section.title}. Включва водещите дисциплини (${specialty.coreSubjects.join(', ')}), синтезираните правила за ДЗИ/ДИППК и профилираната подготовка от 8. до 12. клас. ${baseLesson.summary.overview}`,
      keyPoints: [
        `Професионална квалификация и профил: ${specialty.qualification} — изучавани модули: ${specialty.coreSubjects.join(', ')}.`,
        ...section.keySynthesisRules.map((r) => `${r.title}: ${r.formulaOrRule} (${r.context})`),
        ...section.gradeProgression.map((gp) => `${gp.grade} (${gp.focusTitle}): ${gp.specializedSubjects.join('; ')} — Изпитен етап: ${gp.examMilestone}`),
        ...baseLesson.summary.keyPoints
      ],
      examGoldenRule: `За отличен на ${section.examFormat}: овладей задълбочено модулите (${specialty.coreSubjects.join(', ')}) и прилагай точно формулите от справочника! ${baseLesson.summary.examGoldenRule}`,
      commonTraps: baseLesson.summary.commonTraps,
      formulasOrDates: [
        ...section.keySynthesisRules.map((r) => ({ label: r.title, value: r.formulaOrRule })),
        ...baseLesson.summary.formulasOrDates
      ]
    },
    notebookChecklist: checklistFromSection,
    flashcards: [
      ...section.keySynthesisRules.map((r, idx) => ({
        id: `spec-fc-${idx + 1}`,
        front: `Каква е ключовата формула или нормативно правило за „${r.title}“ в ${section.shortName}?`,
        back: `${r.formulaOrRule} — Приложение: ${r.context}`,
        hint: specialty.name,
        tag: section.shortName
      })),
      ...baseLesson.flashcards
    ],
    quiz: [...specialtyQuizConverted, ...baseLesson.quiz]
  };

  return {
    ...enrichedLesson,
    quiz: generateInfiniteLessonQuiz(enrichedLesson, allLessons, 1, 10)
  };
}

/**
 * Изгражда специализиран урок с пълен учебен материал по МОН и тест за конкретен предмет от Матрицата за 8.–12. клас.
 */
export function buildTailoredMatrixSubjectLesson(
  matrixGrade: GradeCurriculumMatrix,
  subjectEntry: GradeSubjectMatrixEntry,
  baseLesson: LessonData,
  allLessons: LessonData[]
): LessonData {
  const slug = subjectEntry.subjectName.toLowerCase().replace(/[^a-z0-9а-я]+/gi, '-').slice(0, 32);
  const tailoredId = `${baseLesson.id}--matrix-${matrixGrade.grade.replace(/\D+/g, '')}-${slug}`;
  const topicBullets = subjectEntry.keyTopics
    .split(/[;.]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 4);

  const enrichedLesson: LessonData = {
    ...baseLesson,
    id: tailoredId,
    title: `${subjectEntry.subjectName} — ${matrixGrade.grade}`,
    grade: toLessonGrade(matrixGrade.grade),
    audience: `${subjectEntry.category} (${subjectEntry.schoolTypes})`,
    originalNoteExcerpt: `${matrixGrade.grade} (${matrixGrade.stageName}) | ${subjectEntry.category} | Училища: ${subjectEntry.schoolTypes} | Хорариум: ${subjectEntry.weeklyHoursNote}. Теми по МОН: ${subjectEntry.keyTopics}`,
    summary: {
      overview: `Разработка по учебния план на МОН за ${matrixGrade.grade} (${matrixGrade.stageName}) по „${subjectEntry.subjectName}“ (${subjectEntry.category}). Хорариум и норматив: ${subjectEntry.weeklyHoursNote}. Национален изпитен фокус: ${matrixGrade.nationalExamInfo}. ${baseLesson.summary.overview}`,
      keyPoints: [
        `Задължителни теми по учебната програма на МОН за ${matrixGrade.grade}: ${subjectEntry.keyTopics}`,
        `Видове училища и профили: ${subjectEntry.schoolTypes} (${subjectEntry.weeklyHoursNote})`,
        `Национално оценяване и изпитен етап за класа: ${matrixGrade.nationalExamInfo}`,
        ...baseLesson.summary.keyPoints
      ],
      examGoldenRule: baseLesson.summary.examGoldenRule,
      commonTraps: baseLesson.summary.commonTraps,
      formulasOrDates: [
        { label: `Учебен етап (${matrixGrade.grade})`, value: matrixGrade.stageName },
        { label: 'Норматив и седмичен хорариум', value: subjectEntry.weeklyHoursNote },
        ...baseLesson.summary.formulasOrDates
      ]
    },
    notebookChecklist: [
      ...topicBullets.slice(0, 4).map((tb, idx) => ({
        id: `matrix-chk-${idx + 1}`,
        requirement: `Усвояване и конспектиране на тема: ${tb}`,
        whyNeeded: `Включена в учебната програма на МОН за ${matrixGrade.grade} (${subjectEntry.category}).`,
        isEssentialForSix: true,
        suggestedNotes: `${tb} — прилага се съгласно изискванията за ${matrixGrade.nationalExamInfo}.`
      })),
      ...(baseLesson.notebookChecklist || [])
    ]
  };

  return {
    ...enrichedLesson,
    quiz: generateInfiniteLessonQuiz(enrichedLesson, allLessons, 1, 10)
  };
}
