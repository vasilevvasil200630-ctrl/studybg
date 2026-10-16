import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Zap,
  Flame,
  Trophy,
  Timer,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Award,
  Keyboard
} from 'lucide-react';
import { isPlainObject } from '../lib/storage';

export type BlitzCategory = 'all' | 'bel' | 'math' | 'history' | 'english' | 'civics' | 'dippk' | 'science' | 'stem_code';

interface BlitzQuestion {
  id: string;
  category: Exclude<BlitzCategory, 'all'>;
  categoryLabel: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  quickRule: string;
}

interface BlitzHighScores {
  [key: string]: {
    bestScore: number;
    bestStreak: number;
    bestCorrectCount: number;
    updatedAt: string;
  };
}

const STORAGE_KEY = 'studybg_blitz_highscores_v1';

const BLITZ_QUESTIONS: BlitzQuestion[] = [
  // 1. БЕЛ Правопис & Литература
  {
    id: 'bl-bel-1',
    category: 'bel',
    categoryLabel: 'БЕЛ • Правопис',
    prompt: 'Коя дума е изписана ПРАВИЛНО според Официалния правописен речник на БАН?',
    options: ['възтановявам', 'въстановявам', 'възстановявам', 'вазстановявам'],
    correctIndex: 2,
    quickRule: 'Представката е „въз-“ + корен „становявам“ ➔ пишем двойно „зс“ (възстановявам).'
  },
  {
    id: 'bl-bel-2',
    category: 'bel',
    categoryLabel: 'БЕЛ • Членуване',
    prompt: 'В кое изречение е употребен ПРАВИЛНО пълният/краткият член?',
    options: [
      'Ученика предаде отличния проект.',
      'Ученикът предаде отличният проект.',
      'Ученикът предаде отличния проект.',
      'Ученика предаде отличният проект.'
    ],
    correctIndex: 2,
    quickRule: '„Ученикът“ е подлог (кой? ➔ той ➔ пълен член), а „отличния проект“ е пряко допълнение (кого? ➔ него ➔ кратък член).'
  },
  {
    id: 'bl-bel-3',
    category: 'bel',
    categoryLabel: 'БЕЛ • Литературен канон',
    prompt: 'Какъв е жанрът на произведението „Железният светилник“ от Димитър Талев?',
    options: ['Повест', 'Роман (първа част от тетралогия)', 'Разказ', 'Лирическа поема'],
    correctIndex: 1,
    quickRule: '„Железният светилник“ (1952) е класически исторически роман — първа книга от тетралогията на Димитър Талев.'
  },
  {
    id: 'bl-bel-4',
    category: 'bel',
    categoryLabel: 'БЕЛ • Литературен канон',
    prompt: 'Кой е авторът на елегията „Аз искам да те помня все така...“?',
    options: ['Пейо Яворов', 'Димчо Дебелянов', 'Христо Смирненски', 'Никола Вапцаров'],
    correctIndex: 1,
    quickRule: 'Елегията „Аз искам да те помня все така...“ е написана от Димчо Дебелянов и е посветена на Мария Василева (Звънчето).'
  },
  {
    id: 'bl-bel-5',
    category: 'bel',
    categoryLabel: 'БЕЛ • Литературен канон',
    prompt: 'В кой тематичен блок от програмата за ДЗИ попада разказът „Андрешко“ от Елин Пелин?',
    options: ['Любовта', 'Вярата и надеждата', 'Човекът и обществото', 'Природата'],
    correctIndex: 2,
    quickRule: '„Андрешко“ (Елин Пелин) е част от тематичния блок „Човекът и обществото“ (заедно с „Бай Ганьо журналист“, „Приказка за стълбата“ и „Ноев ковчег“).'
  },
  {
    id: 'bl-bel-6',
    category: 'bel',
    categoryLabel: 'БЕЛ • Тропи и фигури',
    prompt: 'Каква художествена фигура е изразът „жива рана“ или „сладка мъка“?',
    options: ['Хипербола', 'Оксиморон', 'Литота', 'Метонимия'],
    correctIndex: 1,
    quickRule: 'Оксиморонът съчетава две логически взаимоизключващи се понятия („сладка мъка“, „жив труп“).'
  },

  // 2. Математика & STEM
  {
    id: 'bl-math-1',
    category: 'math',
    categoryLabel: 'Математика • Виет',
    prompt: 'На колко са равни сборът (x₁ + x₂) и произведението (x₁ · x₂) на корените на ax² + bx + c = 0?',
    options: [
      'x₁ + x₂ = b/a, x₁·x₂ = -c/a',
      'x₁ + x₂ = -b/a, x₁·x₂ = c/a',
      'x₁ + x₂ = -b/2a, x₁·x₂ = c/2a',
      'x₁ + x₂ = c/a, x₁·x₂ = -b/a'
    ],
    correctIndex: 1,
    quickRule: 'Формули на Виет: x₁ + x₂ = -b / a (с минус!) и x₁ · x₂ = c / a.'
  },
  {
    id: 'bl-math-2',
    category: 'math',
    categoryLabel: 'Математика • Тригонометрия',
    prompt: 'На колко е равен sin 30° и на колко е равен cos 60°?',
    options: ['И двете са равни на 1/2', 'И двете са равни на √3 / 2', 'И двете са равни на √2 / 2', 'sin 30° = 1, cos 60° = 0'],
    correctIndex: 0,
    quickRule: 'sin 30° = cos 60° = 1/2 (0,5), тъй като 30° + 60° = 90°.'
  },
  {
    id: 'bl-math-3',
    category: 'math',
    categoryLabel: 'Математика • Геометрия',
    prompt: 'Коя от следните тройки числа е Питагорова тройка (a² + b² = c²)?',
    options: ['(2, 3, 4)', '(5, 12, 13)', '(4, 5, 6)', '(6, 7, 10)'],
    correctIndex: 1,
    quickRule: '5² + 12² = 25 + 144 = 169 = 13². Класически питагорови тройки са (3, 4, 5), (5, 12, 13) и (8, 15, 17).'
  },
  {
    id: 'bl-math-4',
    category: 'math',
    categoryLabel: 'Физика • Закон на Ом',
    prompt: 'Как гласи Законът на Ом за част от електрическата верига?',
    options: ['I = U · R', 'I = U / R', 'I = R / U', 'U = I / R'],
    correctIndex: 1,
    quickRule: 'Закон на Ом: Токът I е равен на напрежението U, разделено на съпротивлението R (I = U / R).'
  },
  {
    id: 'bl-math-5',
    category: 'math',
    categoryLabel: 'Математика • Степени и ФСУ',
    prompt: 'На колко е равен изразът (-3)² - 3²?',
    options: ['0', '18', '-18', '6'],
    correctIndex: 0,
    quickRule: '(-3)² = 9 (минусът е в скобите), но -3² = -9 (само тройката се повдига на квадрат). Така 9 - 9 = 0!'
  },
  {
    id: 'bl-math-6',
    category: 'math',
    categoryLabel: 'Биология • Кръвообращение',
    prompt: 'От коя кухина на сърцето започва Големият (телесен) кръг на кръвообращение?',
    options: ['От дясното предсърдие', 'От лявата камера (чрез аортата)', 'От дясната камера', 'От лявото предсърдие'],
    correctIndex: 1,
    quickRule: 'Големият кръг на кръвообращение започва от Лявата камера с аортата и завършва в Дясното предсърдие.'
  },

  // 3. История и География
  {
    id: 'bl-hist-1',
    category: 'history',
    categoryLabel: 'История • Средновековие',
    prompt: 'През коя година при управлението на княз Борис I е прието християнството в България?',
    options: ['681 г.', '864 г.', '893 г.', '917 г.'],
    correctIndex: 1,
    quickRule: 'Покръстването на българите при княз Борис I Покръстител се извършва през 864 г.'
  },
  {
    id: 'bl-hist-2',
    category: 'history',
    categoryLabel: 'История • Трета българска държава',
    prompt: 'На коя дата и през коя година е обявено Съединението на Княжество България и Източна Румелия?',
    options: ['3 март 1878 г.', '16 април 1879 г.', '6 септември 1885 г.', '22 септември 1908 г.'],
    correctIndex: 2,
    quickRule: 'Съединението на Княжество България и Източна Румелия е провъзгласено в Пловдив на 6 септември 1885 г.'
  },
  {
    id: 'bl-hist-3',
    category: 'history',
    categoryLabel: 'История • Договори',
    prompt: 'По силата на кой договор от 7 септември 1940 г. Южна Добруджа е върната мирно на България?',
    options: ['Ньойски договор', 'Крайовска спогодба', 'Берлински договор', 'Лондонски мирен договор'],
    correctIndex: 1,
    quickRule: 'С Крайовската спогодба (7 септември 1940 г.) Румъния връща Южна Добруджа на Царство България по дипломатически път.'
  },
  {
    id: 'bl-hist-4',
    category: 'history',
    categoryLabel: 'География • Планини',
    prompt: 'Кой е най-високият връх на Стара планина?',
    options: ['вр. Мусала (2925 m)', 'вр. Вихрен (2914 m)', 'вр. Ботев (2376 m)', 'вр. Черни връх (2290 m)'],
    correctIndex: 2,
    quickRule: 'Най-високият връх на Стара планина е връх Ботев (2376 m). Мусала е в Рила, Вихрен е в Пирин, Черни връх е във Витоша.'
  },
  {
    id: 'bl-hist-5',
    category: 'history',
    categoryLabel: 'География • Региони NUTS 2',
    prompt: 'Кой от 6-те статистически района за планиране (NUTS 2) в България формира най-висок дял от националния БВП?',
    options: ['Северозападен район', 'Югозападен район (с център София)', 'Северен централен район', 'Югоизточен район'],
    correctIndex: 1,
    quickRule: 'Югозападният район (области София-град, София, Благоевград, Перник, Кюстендил) генерира близо половината от БВП на България.'
  },

  // 4. Английски език (ДЗИ B1.1 & B2)
  {
    id: 'bl-eng-1',
    category: 'english',
    categoryLabel: 'English • Conditionals',
    prompt: 'Избери правилната форма за Third Conditional: "If she ___ earlier, she wouldn\'t have missed the train."',
    options: ['left', 'had left', 'would leave', 'has left'],
    correctIndex: 1,
    quickRule: 'Third Conditional (нереално минало): If + Past Perfect (had + V3), would have + V3.'
  },
  {
    id: 'bl-eng-2',
    category: 'english',
    categoryLabel: 'English • Phrasal Verbs',
    prompt: 'Кой фразов глагол означава „отменям насрочено събитие“ (to cancel)?',
    options: ['put off', 'call off', 'look up to', 'run out of'],
    correctIndex: 1,
    quickRule: 'Call off = cancel (отменям); Put off = postpone (отлагам за по-късно).'
  },
  {
    id: 'bl-eng-3',
    category: 'english',
    categoryLabel: 'English • B2 Inversion',
    prompt: 'Довърши инверсията: "Not only ___ the exam, but he also got the highest score."',
    options: ['he passed', 'did he pass', 'passed he', 'he did pass'],
    correctIndex: 1,
    quickRule: 'След отрицателен израз в началото (Not only / Never / Rarely) се използва въпросителен словоред: did he pass!'
  },
  {
    id: 'bl-eng-4',
    category: 'english',
    categoryLabel: 'English • Prepositions',
    prompt: 'Избери правилната конструкция след "look forward to": "I am looking forward to ___ from you soon."',
    options: ['hear', 'hearing', 'heard', 'be heard'],
    correctIndex: 1,
    quickRule: 'В "look forward to" частицата "to" е предлог, затова след нея глаголът винаги приема окончание -ing (hearing).'
  },

  // 5. Конституция на РБ и Европейски съюз
  {
    id: 'bl-civ-1',
    category: 'civics',
    categoryLabel: 'Конституция на РБ',
    prompt: 'От колко народни представители се състои обикновеното Народно събрание в България и какъв е мандатът му?',
    options: ['120 депутати за 5 години', '240 депутати за 4 години', '400 депутати за 4 години', '240 депутати за 5 години'],
    correctIndex: 1,
    quickRule: 'Обикновеното Народно събрание се състои от 240 народни представители, избирани за срок от 4 години (чл. 63 и чл. 64 КРБ).'
  },
  {
    id: 'bl-civ-2',
    category: 'civics',
    categoryLabel: 'Конституция на РБ',
    prompt: 'Кой орган единствен може да обяви закон, приет от Народното събрание, за противоконституционен?',
    options: ['Президентът на РБ', 'Конституционният съд на РБ (12 съдии)', 'Върховният касационен съд', 'Омбудсманът'],
    correctIndex: 1,
    quickRule: 'Единствено Конституционният съд на Р България (чл. 149 КРБ) може да обявява закони за противоконституционни.'
  },
  {
    id: 'bl-civ-3',
    category: 'civics',
    categoryLabel: 'Европейски съюз',
    prompt: 'Коя институция на ЕС притежава изключителното право на законодателна инициатива (предлага европейските закони)?',
    options: ['Европейският парламент', 'Европейската комисия', 'Съдът на ЕС в Люксембург', 'Европейската централна банка'],
    correctIndex: 1,
    quickRule: 'Европейската комисия (27 комисари) е единственият орган с монопол върху законодателната инициатива в ЕС.'
  },
  {
    id: 'bl-civ-4',
    category: 'civics',
    categoryLabel: 'Европейски съюз',
    prompt: 'Колко евродепутати представляват Република България в Европейския парламент?',
    options: ['12 евродепутати', '17 евродепутати', '27 евродепутати', '1 евродепутат'],
    correctIndex: 1,
    quickRule: 'Република България се представлява от 17 членове на Европейския парламент (от общо 720).'
  },

  // 6. Профилирани гимназии & ДИППК (Трета СПК)
  {
    id: 'bl-dippk-1',
    category: 'dippk',
    categoryLabel: 'ИТ & ТУЕС • Сигурност',
    prompt: 'Кой механизъм предотвратява категорично SQL Injection атаките при работа с релационни бази данни?',
    options: [
      'Скриване на URL адреса',
      'Параметризирани заявки (Prepared Statements)',
      'Увеличаване на RAM паметта',
      'Използване само на GET заявки'
    ],
    correctIndex: 1,
    quickRule: 'Prepared Statements отделят структурно SQL синтаксиса от входните потребителски данни.'
  },
  {
    id: 'bl-dippk-2',
    category: 'dippk',
    categoryLabel: 'НТБГ • Счетоводство',
    prompt: 'Как гласи фундаменталното балансово уравнение в счетоводството?',
    options: [
      'Активи = Приходи - Разходи',
      'Активи = Собствен капитал + Пасиви (Задължения)',
      'Пасиви = Активи + Собствен капитал',
      'ДДС = 10% от оборота'
    ],
    correctIndex: 1,
    quickRule: 'Активи = Собствен капитал + Пасиви (всяко имущество има източник на финансиране).'
  },
  {
    id: 'bl-dippk-3',
    category: 'dippk',
    categoryLabel: 'СГСАГ • Строителна механика',
    prompt: 'Колко е максималният огъващ момент M_max в средата на проста греда с отвор L и товар q?',
    options: ['M_max = q·L / 2', 'M_max = q·L² / 8', 'M_max = q·L² / 2', 'M_max = q / L'],
    correctIndex: 1,
    quickRule: 'За проста греда на две опори: опорни реакции R = qL/2 и максимален момент в средата M_max = q·L² / 8.'
  },
  {
    id: 'bl-dippk-4',
    category: 'dippk',
    categoryLabel: 'Авиация & Мореплаване',
    prompt: 'Как се променя аеродинамичната подемна сила L, ако скоростта на полета V се увеличи 2 пъти?',
    options: ['Увеличава се 2 пъти', 'Увеличава се 4 пъти (пропорционално на V²)', 'Намалява 2 пъти', 'Остава същата'],
    correctIndex: 1,
    quickRule: 'От L = ½·ρ·V²·S·C_L следва, че подемната сила расте с квадрата на скоростта (2² = 4 пъти).'
  },
  {
    id: 'bl-dippk-5',
    category: 'dippk',
    categoryLabel: 'Ядрена енергетика • ВВЕР-1000',
    prompt: 'Каква е стойността на ефективния коефициент на размножение на неутроните k_ef при стационарна работа на ядрен реактор?',
    options: ['k_ef = 0', 'k_ef = 1.000 (критично стационарно състояние)', 'k_ef = 2.50', 'k_ef = 10'],
    correctIndex: 1,
    quickRule: 'При k_ef = 1 броят на деленията във всяко следващо поколение остава постоянен и мощността е стабилна.'
  },
  {
    id: 'bl-dippk-6',
    category: 'dippk',
    categoryLabel: 'Криминалистика & ПАБ',
    prompt: 'Защо пожари от Клас F (горещи кулинарни мазнини) НИКОГА не се гасят с вода?',
    options: [
      'Водата замърсява олиото',
      'Водата се изпарява взривно (1 L → 1700 L пара) и разпръсква горящата мазнина',
      'Водата охлажда твърде бавно',
      'Мазнината замръзва'
    ],
    correctIndex: 1,
    quickRule: 'При контакт с нагорещена мазнина (>300 °C) водата кипва мигновено и предизвиква огнено кълбо (Boilover).'
  },
  {
    id: 'bl-dippk-7',
    category: 'dippk',
    categoryLabel: 'Музика & Сценични изкуства',
    prompt: 'Как се разпределят дяловете в неравноделния размер 7/8 при българската ръченица?',
    options: [
      '3 + 2 + 2 (удължен първи дял)',
      '2 + 2 + 3 (два кратки и трети удължен тривременен дял)',
      '2 + 3 + 2 (удължен втори дял)',
      '4 + 3'
    ],
    correctIndex: 1,
    quickRule: 'Ръченицата (7/8 броено на три) има структура 2 + 2 + 3 (раз-два, раз-два, раз-два-три).'
  },
  {
    id: 'bl-dippk-8',
    category: 'dippk',
    categoryLabel: 'Дерматология & СПА',
    prompt: 'Какво е нормалното физиологично pH на здравата хидролипидна мантия на човешката кожа?',
    options: ['pH 1.5 – 2.0', 'Слабо кисело: pH 4.5 – 5.5', 'Неутрално: pH 7.0', 'Алкално: pH 9.5 – 10.5'],
    correctIndex: 1,
    quickRule: 'Киселинната мантия на кожата (pH 4.5–5.5) потиска развитието на патогенни бактерии.'
  },

  // 7. Природни науки (Биология, Химия и Физика — ДЗИ & МУ)
  {
    id: 'bl-sci-1',
    category: 'science',
    categoryLabel: 'Биология • МУ & ДЗИ',
    prompt: 'Кой триплет в иРНК изпълнява ролята на универсален СТАРТ кодон за начало на транслацията и кодира аминокиселината Метионин?',
    options: ['5\'-УАА-3\'', '5\'-АУГ-3\' (AUG)', '5\'-УГА-3\'', '5\'-ТАЦ-3\''],
    correctIndex: 1,
    quickRule: 'АУГ (AUG) е универсалният СТАРТ кодон в иРНК (кодира Метионин), а УАА, УАГ и УГА са СТОП кодони.'
  },
  {
    id: 'bl-sci-2',
    category: 'science',
    categoryLabel: 'Биология • Биоенергетика',
    prompt: 'Колко мола АТФ е чистият енергиен добив от гликолизата (субстратно фосфорилиране в цитозола) при разграждане на 1 mol глюкоза?',
    options: ['2 mol АТФ (изразходват се 2 и се синтезират 4 mol АТФ)', '38 mol АТФ', '34 mol АТФ', '0 mol АТФ'],
    correctIndex: 0,
    quickRule: 'В подготвителната фаза на гликолизата се влагат 2 АТФ, а в крайната се синтезират 4 АТФ ➔ чист добив 2 mol АТФ.'
  },
  {
    id: 'bl-sci-3',
    category: 'science',
    categoryLabel: 'Химия • Качествени реакции',
    prompt: 'С кой реактив се доказват хлоридни йони (Cl⁻) във воден разтвор чрез образуване на бяла сиреновидна утайка?',
    options: ['Бариев дихлорид (BaCl₂)', 'Сребърен нитрат (AgNO₃) ➔ пада AgCl↓', 'Натриева основа (NaOH)', 'Фенолфталеин'],
    correctIndex: 1,
    quickRule: 'Ag⁺ + Cl⁻ → AgCl↓ (бяла сиреновидна утайка, неразтворима в HNO₃, но разтворима в NH₃).'
  },
  {
    id: 'bl-sci-4',
    category: 'science',
    categoryLabel: 'Органична Химия • МУ',
    prompt: 'Кое от следните съединения дава реакция „Сребърно огледало“ с амонячен разтвор на сребърен оксид [Ag(NH₃)₂]OH?',
    options: ['Етанол (C₂H₅OH)', 'Ацетон (CH₃COCH₃)', 'Етанал / Ацеталдехид (CH₃CHO) и Глюкоза', 'Бензен (C₆H₆)'],
    correctIndex: 2,
    quickRule: 'Реакцията на Толенс („Сребърно огледало“) е качествена реакция за алдехидна група (-CHO), каквато имат етаналът, глюкозата и HCOOH.'
  },
  {
    id: 'bl-sci-5',
    category: 'science',
    categoryLabel: 'Физика • Термодинамика',
    prompt: 'Топлинна машина на Карно работи при T₁ = 600 K (нагревател) и T₂ = 300 K (охладител). Колко е нейният КПД η?',
    options: ['25%', '50% — η = (600 - 300) / 600 = 0,50', '75%', '100%'],
    correctIndex: 1,
    quickRule: 'КПД на цикъл на Карно е η = (T₁ - T₂) / T₁ = (600 - 300) / 600 = 300 / 600 = 50%.'
  },
  {
    id: 'bl-sci-6',
    category: 'science',
    categoryLabel: 'Физика • Електротехника',
    prompt: 'По коя формула се изчислява АКТИВНАТА мощност P в симетрична трифазна електрическа мрежа?',
    options: ['P = U · I', 'P = √3 · U_L · I_L · cos φ', 'P = √3 · U_L · I_L · sin φ', 'P = I² / R'],
    correctIndex: 1,
    quickRule: 'В трифазна система активната мощност е P = √3 · U_L · I_L · cos φ [W], а реактивната е Q = √3 · U_L · I_L · sin φ [VAr].'
  },

  // 8. Информатика, Алгоритми, SQL & Мрежи (ДЗИ Информатика & Трета СПК Програмист)
  {
    id: 'bl-code-1',
    category: 'stem_code',
    categoryLabel: 'Алгоритми • ДЗИ Информатика',
    prompt: 'Каква е времевата сложност (Big-O) на алгоритъма Двоично търсене (Binary Search) в сортиран масив с N елемента?',
    options: ['O(N)', 'O(N²)', 'O(log₂ N)', 'O(N · log N)'],
    correctIndex: 2,
    quickRule: 'Двоичното търсене разполовява интервала на всяка стъпка ➔ логаритмична сложност O(log₂ N).'
  },
  {
    id: 'bl-code-2',
    category: 'stem_code',
    categoryLabel: 'Бази данни • SQL (ДИППК)',
    prompt: 'Коя клауза в SQL се използва за филтриране на ГРУПИРАНИ записи след агрегатна функция (COUNT, SUM, AVG) и GROUP BY?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'INNER JOIN'],
    correctIndex: 1,
    quickRule: 'WHERE филтрира отделни редове ПРЕДИ групирането, а HAVING филтрира вече агрегираните групи СЛЕД GROUP BY.'
  },
  {
    id: 'bl-code-3',
    category: 'stem_code',
    categoryLabel: 'Структури от данни • Стек & Опашка',
    prompt: 'По кой принцип работи линейната структура от данни СТЕК (Stack), използвана при рекурсивни извиквания на функции?',
    options: [
      'FIFO (First In, First Out — Първи влязъл, първи излязъл)',
      'LIFO (Last In, First Out — Последен влязъл, първи излязъл)',
      'Произволен достъп по индекс O(1)',
      'Дървовидна йерархия'
    ],
    correctIndex: 1,
    quickRule: 'Стекът (Stack) работи по принципа LIFO (push / pop от върха), докато Опашката (Queue) работи по FIFO.'
  },
  {
    id: 'bl-code-4',
    category: 'stem_code',
    categoryLabel: 'Компютърни мрежи • TCP/IP',
    prompt: 'Колко използваеми IP адреса за хостове има в локална подмрежа с префикс /24 (маска 255.255.255.0)?',
    options: ['256 хоста', '254 хоста (2⁸ - 2, без адреса на мрежата и broadcast адреса)', '126 хоста', '512 хоста'],
    correctIndex: 1,
    quickRule: 'Формулата за хостове е 2^(32 - префикс) - 2. За /24: 2⁸ - 2 = 256 - 2 = 254 използваеми хоста.'
  },
  {
    id: 'bl-code-5',
    category: 'stem_code',
    categoryLabel: 'ООП • Програмиране',
    prompt: 'Кой от 4-те стълба на ООП позволява един и същ метод да има различно поведение в базовия и производните класове (override)?',
    options: ['Капсулация (Encapsulation)', 'Полиморфизъм (Polymorphism)', 'Компилация', 'Нормализация'],
    correctIndex: 1,
    quickRule: 'Полиморфизмът позволява обекти от различни производни класове да се обработват през общ интерфейс със специфична имплементация (virtual/override).'
  },
  {
    id: 'bl-code-6',
    category: 'stem_code',
    categoryLabel: 'Киберсигурност • Уеб защита',
    prompt: 'Кой механизъм защитава най-надеждно релационната база данни от SQL Injection (SQLi) атаки?',
    options: [
      'Скриване на формата с CSS',
      'Параметризирани заявки (Prepared Statements) със строго типизирани плейсхолдъри',
      'Проверка само с JavaScript във фронтенда',
      'Използване на HTTP вместо HTTPS'
    ],
    correctIndex: 1,
    quickRule: 'Prepared Statements компилират структурата на SQL заявката предварително и третират входа единствено като литерална стойност.'
  }
];

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor((i * 17 + Date.now()) % (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

export const SpeedBlitzLab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlitzCategory>('all');
  const [matchMode, setMatchMode] = useState<'solo' | 'duel'>('solo');
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [deck, setDeck] = useState<BlitzQuestion[]>(BLITZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [score, setScore] = useState<number>(0);
  const [teamAScore, setTeamAScore] = useState<number>(0);
  const [teamBScore, setTeamBScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [lastFeedback, setLastFeedback] = useState<{
    isCorrect: boolean;
    rule: string;
    pointsEarned: number;
  } | null>(null);
  const [mistakeLog, setMistakeLog] = useState<
    { question: BlitzQuestion; chosenIndex: number }[]
  >([]);

  const [highScores, setHighScores] = useState<BlitzHighScores>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : {};
      return isPlainObject(parsed) ? (parsed as BlitzHighScores) : {};
    } catch {
      return {};
    }
  });

  const filteredPool = useMemo(() => {
    if (selectedCategory === 'all') return BLITZ_QUESTIONS;
    return BLITZ_QUESTIONS.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQuestion = deck[currentIndex % deck.length] || BLITZ_QUESTIONS[0];
  const activeDuelTeam: 'A' | 'B' = currentIndex % 2 === 0 ? 'A' : 'B';

  const multiplier = useMemo(() => {
    if (streak >= 8) return 5;
    if (streak >= 5) return 3;
    if (streak >= 2) return 2;
    return 1;
  }, [streak]);

  const startBlitz = () => {
    const shuffled = shuffleArray(filteredPool);
    setDeck(shuffled);
    setCurrentIndex(0);
    setSecondsLeft(60);
    setScore(0);
    setTeamAScore(0);
    setTeamBScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setLastFeedback(null);
    setMistakeLog([]);
    setGameState('playing');
  };

  const finishGame = useCallback(
    (finalScore: number, finalMaxStreak: number, finalCorrect: number) => {
      setGameState('finished');
      setHighScores(prev => {
        const currentBest = prev[selectedCategory];
        if (!currentBest || finalScore > currentBest.bestScore) {
          const updated: BlitzHighScores = {
            ...prev,
            [selectedCategory]: {
              bestScore: finalScore,
              bestStreak: Math.max(finalMaxStreak, currentBest?.bestStreak || 0),
              bestCorrectCount: Math.max(finalCorrect, currentBest?.bestCorrectCount || 0),
              updatedAt: new Date().toLocaleDateString('bg-BG')
            }
          };
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          } catch {
            // ignore storage errors
          }
          return updated;
        }
        return prev;
      });
    },
    [selectedCategory]
  );

  // 1-second countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (secondsLeft <= 0) {
      finishGame(score, maxStreak, correctCount);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, secondsLeft, score, maxStreak, correctCount, finishGame]);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (gameState !== 'playing') return;
      const isCorrect = optionIndex === currentQuestion.correctIndex;

      if (isCorrect) {
        const nextStreak = streak + 1;
        const nextMaxStreak = Math.max(maxStreak, nextStreak);
        const nextMult = nextStreak >= 8 ? 5 : nextStreak >= 5 ? 3 : nextStreak >= 2 ? 2 : 1;
        const earned = 100 * nextMult;

        setScore(prev => prev + earned);
        if (currentIndex % 2 === 0) {
          setTeamAScore(prev => prev + earned);
        } else {
          setTeamBScore(prev => prev + earned);
        }
        setStreak(nextStreak);
        setMaxStreak(nextMaxStreak);
        setCorrectCount(prev => prev + 1);
        // Every 4th consecutive correct answer grants +2 bonus seconds (up to 60s)
        if (nextStreak % 4 === 0) {
          setSecondsLeft(prev => Math.min(60, prev + 2));
        }
        setLastFeedback({
          isCorrect: true,
          rule: currentQuestion.quickRule,
          pointsEarned: earned
        });
      } else {
        setStreak(0);
        setWrongCount(prev => prev + 1);
        setMistakeLog(prev => [...prev, { question: currentQuestion, chosenIndex: optionIndex }]);
        setLastFeedback({
          isCorrect: false,
          rule: currentQuestion.quickRule,
          pointsEarned: 0
        });
      }

      setCurrentIndex(prev => prev + 1);
    },
    [gameState, currentQuestion, streak, maxStreak, currentIndex]
  );

  // Keyboard shortcuts 1, 2, 3, 4 during active play
  useEffect(() => {
    if (gameState !== 'playing') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') handleAnswer(0);
      else if (e.key === '2') handleAnswer(1);
      else if (e.key === '3') handleAnswer(2);
      else if (e.key === '4') handleAnswer(3);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameState, handleAnswer]);

  const currentBest = highScores[selectedCategory];

  const categories: { id: BlitzCategory; label: string; badge: string }[] = [
    { id: 'all', label: 'Пълен Микс за 6.00', badge: `${BLITZ_QUESTIONS.length} въпроса` },
    { id: 'bel', label: 'БЕЛ Правопис & Канон', badge: 'ДЗИ & НВО' },
    { id: 'math', label: 'Математика & STEM', badge: 'Формули' },
    { id: 'science', label: 'Природни науки (Био/Хим/Физ)', badge: 'МУ & ДЗИ' },
    { id: 'stem_code', label: 'Информатика, Алгоритми & SQL', badge: 'ТУЕС & ДЗИ' },
    { id: 'history', label: 'История & География', badge: '681–2007' },
    { id: 'english', label: 'Английски език', badge: 'B1.1–C1' },
    { id: 'civics', label: 'Конституция, КТ & ЕС', badge: 'ГО & ЗБУТ' },
    { id: 'dippk', label: 'Профили & ДИППК (III СПК)', badge: 'ИТ • Финанси • Инженерство' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Speed Blitz 6.00 • 60-секунден състезателен тренажор</span>
              </div>

              {/* Solo vs Classroom Team Duel Switcher */}
              <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
                <button
                  disabled={gameState === 'playing'}
                  onClick={() => setMatchMode('solo')}
                  className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${
                    matchMode === 'solo'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  👤 Индивидуален Спринт
                </button>
                <button
                  disabled={gameState === 'playing'}
                  onClick={() => setMatchMode('duel')}
                  className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${
                    matchMode === 'duel'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚔️ Отборен Дуел (Отбор А vs Отбор Б)
                </button>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
              Аркаден Блиц за 60 секунди (Speed Blitz 6.00)
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Тествай рефлексите си преди матура или контролно! Всяка поредица от верни отговори увеличава твоя множител (<strong>Combo x2, x3, x5</strong>), а на всеки 4 поредни верни отговора печелиш <strong>+2 бонус секунди</strong>.
            </p>
          </div>

          {/* Personal Best Card */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Личен рекорд ({categories.find(c => c.id === selectedCategory)?.label})
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {currentBest ? `${currentBest.bestScore} т.` : '0 т.'}
              </div>
              <div className="text-xs text-slate-600">
                {currentBest
                  ? `Макс серия: ${currentBest.bestStreak} поредни • ${currentBest.bestCorrectCount} верни`
                  : 'Изиграй първия си рунд за рекорд!'}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              disabled={gameState === 'playing'}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  selectedCategory === cat.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-slate-600'
                }`}
              >
                {cat.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* GAME STATE 1: IDLE / READY SCREEN */}
      {gameState === 'idle' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto">
            <Flame className="w-8 h-8" />
          </div>
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {matchMode === 'duel'
                ? '⚔️ Отборен Дуел за Класна Стая: Отбор А (Сини) срещу Отбор Б (Златни)'
                : 'Готов ли си за 60-секундния Блиц?'}
            </h2>
            <p className="text-sm text-slate-600">
              Избрана категория: <strong className="text-slate-900">{categories.find(c => c.id === selectedCategory)?.label}</strong>.
              {matchMode === 'duel'
                ? ' Въпросите се редуват автоматично между Отбор А и Отбор Б на всеки ход!'
                : ' Можеш да отговаряш както с мишка/докосване, така и светкавично с клавишите 1 – 4.'}
            </p>
          </div>

          <button
            onClick={startBlitz}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-sm transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>
              {matchMode === 'duel' ? 'СТАРТИРАЙ ОТБОРНИЯ ДУЕЛ (60 СЕК.)' : 'СТАРТИРАЙ 60 СЕКУНДИ БЛИЦ'}
            </span>
          </button>
        </div>
      )}

      {/* GAME STATE 2: ACTIVE 60-SECOND GAMEPLAY */}
      {gameState === 'playing' && (
        <div className="bg-white border-2 border-blue-600 rounded-2xl p-5 sm:p-8 shadow-sm space-y-6">
          {/* Team Duel Live Banner */}
          {matchMode === 'duel' && (
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`p-3.5 rounded-xl border-2 flex items-center justify-between transition-all ${
                  activeDuelTeam === 'A'
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-400/40'
                    : 'bg-slate-50 border-slate-200 opacity-75'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-700 block">
                    {activeDuelTeam === 'A' ? '👉 НА ХОД СЕГА: ОТБОР А (СИНИ)' : 'Отбор А (Сини)'}
                  </span>
                  <strong className="text-lg font-black text-blue-950 font-mono">{teamAScore} т.</strong>
                </div>
                {activeDuelTeam === 'A' && (
                  <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold">
                    Твой ред!
                  </span>
                )}
              </div>

              <div
                className={`p-3.5 rounded-xl border-2 flex items-center justify-between transition-all ${
                  activeDuelTeam === 'B'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/40'
                    : 'bg-slate-50 border-slate-200 opacity-75'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-800 block">
                    {activeDuelTeam === 'B' ? '👉 НА ХОД СЕГА: ОТБОР Б (ЗЛАТНИ)' : 'Отбор Б (Златни)'}
                  </span>
                  <strong className="text-lg font-black text-amber-950 font-mono">{teamBScore} т.</strong>
                </div>
                {activeDuelTeam === 'B' && (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-amber-950 text-xs font-bold">
                    Твой ред!
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Top HUD: Timer, Score, Streak Multiplier */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
              <Timer
                className={`w-6 h-6 shrink-0 ${
                  secondsLeft <= 10 ? 'text-rose-600 animate-pulse' : 'text-blue-600'
                }`}
              />
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Оставащо време</div>
                <div
                  className={`text-xl sm:text-2xl font-black font-mono ${
                    secondsLeft <= 10 ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {secondsLeft} сек.
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
              <Award className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Общо Точки</div>
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700">
                  {score}
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl p-3 border flex items-center gap-3 transition-all ${
                multiplier >= 3
                  ? 'bg-amber-50 border-amber-400 text-amber-900'
                  : multiplier === 2
                  ? 'bg-blue-50 border-blue-300 text-blue-900'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <Flame
                className={`w-6 h-6 shrink-0 ${
                  multiplier >= 2 ? 'text-amber-500' : 'text-slate-400'
                }`}
              />
              <div>
                <div className="text-[10px] font-bold uppercase opacity-75">Серия (Combo)</div>
                <div className="text-lg sm:text-xl font-black font-mono">
                  {streak} поред • x{multiplier}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Time Bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                secondsLeft <= 10
                  ? 'bg-rose-500'
                  : secondsLeft <= 25
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, (secondsLeft / 60) * 100)}%` }}
            />
          </div>

          {/* Active Question Card */}
          <div className="space-y-5 pt-2">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                {currentQuestion.categoryLabel}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Keyboard className="w-3.5 h-3.5" />
                <span>Клавиши 1, 2, 3, 4</span>
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {currentQuestion.prompt}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="text-left p-4 rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50/60 active:scale-[0.99] transition-all cursor-pointer flex items-center gap-3.5 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-slate-200 group-hover:text-blue-700 text-slate-700 font-bold text-sm flex items-center justify-center shrink-0 transition-colors">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-slate-950">
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Instant Rule Feedback Bar from Previous Question */}
          {lastFeedback && (
            <div
              className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${
                lastFeedback.isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {lastFeedback.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{lastFeedback.rule}</span>
              </div>
              {lastFeedback.isCorrect && (
                <span className="font-mono font-extrabold text-emerald-700 shrink-0">
                  +{lastFeedback.pointsEarned} т.
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* GAME STATE 3: FINISHED SUMMARY & MISTAKE REVIEW */}
      {gameState === 'finished' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Блиц рундът приключи!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              Краен резултат: {score} точки
            </h2>

            {matchMode === 'duel' && (
              <div className="max-w-lg mx-auto p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
                <div className="text-sm font-extrabold text-indigo-950">
                  {teamAScore > teamBScore
                    ? `🏆 ПОБЕДИТЕЛ: ОТБОР А (СИНИ) — ${teamAScore} срещу ${teamBScore} т.!`
                    : teamBScore > teamAScore
                    ? `🏆 ПОБЕДИТЕЛ: ОТБОР Б (ЗЛАТНИ) — ${teamBScore} срещу ${teamAScore} т.!`
                    : `🤝 РАВЕНСТВО В ДУЕЛА: ${teamAScore} на ${teamBScore} т.!`}
                </div>
              </div>
            )}

            <p className="text-sm text-slate-600">
              Верни отговори: <strong className="text-emerald-700">{correctCount}</strong> • Грешни:{' '}
              <strong className="text-rose-600">{wrongCount}</strong> • Най-дълга серия:{' '}
              <strong className="text-amber-700">{maxStreak} поредни</strong>
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={startBlitz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Изиграй нов 60-секунден Блиц</span>
              </button>
            </div>
          </div>

          {/* Mistake Review Section */}
          {mistakeLog.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Преговор на сгрешените въпроси в този рунд ({mistakeLog.length}):
              </h3>
              <div className="space-y-3">
                {mistakeLog.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs sm:text-sm"
                  >
                    <div className="text-xs font-bold text-blue-700">{item.question.categoryLabel}</div>
                    <div className="font-bold text-slate-900">{item.question.prompt}</div>
                    <div className="text-rose-700">
                      Твой отговор: <strong>{item.question.options[item.chosenIndex]}</strong>
                    </div>
                    <div className="text-emerald-800">
                      Верен отговор: <strong>{item.question.options[item.question.correctIndex]}</strong>
                    </div>
                    <div className="text-slate-600 pt-1 border-t border-slate-200/70">
                      <strong>Правило за 6.00:</strong> {item.question.quickRule}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpeedBlitzLab;
