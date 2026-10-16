import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Shuffle,
  CheckCircle2,
  AlertCircle,
  Award,
  BookOpen,
  RotateCcw,
  Sparkles,
  Send,
  Loader2
} from 'lucide-react';
import type { LessonData } from '../types';
import { SUBJECTS_LIST } from '../data/curriculumDatabase';
import { evaluateOralAnswerWithGemini, type OralExamAiEvaluation, AI_EXAMINER_LABEL } from '../services/geminiService';
import { isObjectItem, readStoredArray } from '../lib/storage';

interface OralExamSimulatorLabProps {
  lessons: LessonData[];
  currentLesson: LessonData;
  onSelectLesson?: (lesson: LessonData) => void;
}

interface GradeBookEntry {
  id: string;
  lessonTitle: string;
  subject: string;
  question: string;
  gradeNumeric: number;
  gradeLabel: string;
  matchedCount: number;
  totalKeywords: number;
  dateStr: string;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  0: SpeechRecognitionAlternativeLike;
  length: number;
  isFinal?: boolean;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpecialOralTicket {
  id: string;
  code: string;
  specialty: string;
  title: string;
  commissionRole: string;
  mainQuestion: string;
  followUpQuestions: string[];
  keywords: { label: string; matchToken: string; hint: string }[];
  goldenDefense: string;
  normativeChecklist: string[];
}

const DIPPK_COMMISSION_TICKETS: SpecialOralTicket[] = [
  {
    id: 'dippk-it-sec',
    code: 'СПК-481010 • Програмист / Системен програмист',
    specialty: 'ТУЕС / МГ / ПГКТС — Софтуерно инженерство и Киберсигурност',
    title: 'Архитектура на REST/GraphQL микросървиси с JWT автентикация и защита срещу SQLi/XSS',
    commissionRole: 'Председател на ДИК (Гл. софтуерен архитект & МОН експерт)',
    mainQuestion:
      'Представете архитектурата на Вашия дипломен проект: как осигурявате безсъстоятелна (stateless) автентикация с JWT/OAuth 2.0, транзакционна цялост (ACID) в PostgreSQL и защита по OWASP Top 10?',
    followUpQuestions: [
      '1. Защо използвате параметризирани заявки (Prepared Statements) и какъв е механизмът на SQL Injection?',
      '2. Каква е разликата между Access Token и Refresh Token и къде ги съхранявате в браузъра (HttpOnly Cookie срещу LocalStorage)?',
      '3. Кои изисквания на ISO/IEC 27001, GDPR и ЗБУТ при работа с видеодисплеи (Наредба № 7) са спазени?'
    ],
    keywords: [
      { label: 'JWT / OAuth 2.0', matchToken: 'jwt', hint: 'JSON Web Token с цифров подпис HMAC-SHA256 или RSA за автентикация' },
      { label: 'ACID транзакции', matchToken: 'acid', hint: 'Atomicity, Consistency, Isolation, Durability при бази данни' },
      { label: 'Prepared Statements', matchToken: 'prepar', hint: 'Параметризирани SQL заявки срещу SQL инжекции' },
      { label: 'HttpOnly Cookie', matchToken: 'httponly', hint: 'Защита на токена от кражба чрез XSS скрипт' },
      { label: 'ISO/IEC 27001', matchToken: '27001', hint: 'Международен стандарт за информационна сигурност' },
      { label: 'Индекси (B-Tree)', matchToken: 'индекс', hint: 'Ускоряване на заявките от O(N) до O(log N)' }
    ],
    goldenDefense:
      'В дипломната разработка е реализирана трислойна микросървисна архитектура. Автентикацията се извършва чрез краткоживеещ JWT Access Token (15 min) и Refresh Token в HttpOnly, Secure, SameSite=Strict cookie. Достъпът до релационната база PostgreSQL използва Prepared Statements и B-Tree индекси при ниво на изолация Read Committed (ACID). Спазени са стандартът ISO/IEC 27001, криптиране на паролите с Argon2id/bcrypt и ергономичните норми по Наредба № 7 за ЗБУТ.',
    normativeChecklist: [
      'Архитектурна диаграма (UML / C4 модел) и ER диаграма в 3NF',
      'Защита по OWASP Top 10 (SQLi, XSS, CSRF) и TLS 1.3 криптиране',
      'Инструкция за безопасна експлоатация и ергономия по Наредба № 7'
    ]
  },
  {
    id: 'dippk-power-vver',
    code: 'СПК-522010 • Електротехник / Топлоенергетик',
    specialty: 'НПГЯЕ „Игор Курчатов“ / ПГМЕ — Електроенергетика и Ядрени централи',
    title: 'Релейна защита, селективност и аварийно електрозахранване на собствени нужди (ВВЕР-1000 / ВЕИ)',
    commissionRole: 'Председател на ДИК (Гл. инженер по експлоатация и безопасност)',
    mainQuestion:
      'Обосновете избора на прекъсвачи, токови трансформатори и уставки на максималнотоковата и диференциалната защита. Как се гарантира 5-степенната дълбоко ешелонирана защита (Defense-in-Depth)?',
    followUpQuestions: [
      '1. Как се изчислява трифазният ударен ток на късо съединение и как се проверява термичната и динамичната устойчивост на шините?',
      '2. Какво представлява коефициентът на реактивност ρ и ролята на борната киселина H₃BO₃ в първи контур на ВВЕР-1000?',
      '3. Кои са 5-те задължителни технически мероприятия по ПБЗР-ЕУЕЦ преди допускане до работа по уредба над 1000 V?'
    ],
    keywords: [
      { label: 'Селективност', matchToken: 'селект', hint: 'Изключване само на увредения участък от релейната защита' },
      { label: 'Късо съединение', matchToken: 'късо', hint: 'Проверка на прекъсвачите по изключвателна способност и ударен ток' },
      { label: 'Първи контур', matchToken: 'контур', hint: 'Радиоактивен топлоносител под налягане 15.7 MPa при ВВЕР-1000' },
      { label: 'Борна киселина', matchToken: 'борн', hint: 'Течен поглътител на топлинни неутрони за плавно регулиране' },
      { label: 'Заземяване', matchToken: 'зазем', hint: 'Защитно заземяване и поставяне на преносими заземители' },
      { label: 'ПБЗР-ЕУЕЦ', matchToken: 'пбзр', hint: 'Правилник за безопасност при работа в електрически уредби' }
    ],
    goldenDefense:
      'Изборът на силови прекъсвачи и шинопроводи е оразмерен по максимален работен ток и проверен на термична и електродинамична устойчивост при трифазно късо съединение. Селективността между секциите е осигурена чрез стъпало по време Δt = 0.35 s и диференциална защита. По ПБЗР-ЕУЕЦ работата се извършва с наряд при изпълнени 5 технически мероприятия: изключване, застопоряване/табели, проверка за отсъствие на напрежение, включване на заземители и ограждане на работното място.',
    normativeChecklist: [
      'Еднолинейна оперативна схема по БДС EN 60617',
      'Изчисление на токове на късо съединение по БДС EN 60909',
      'Протокол за проверка на защитно заземяване (R ≤ 4 Ω) и ПБЗР-ЕУЕЦ'
    ]
  },
  {
    id: 'dippk-civil-bim',
    code: 'СПК-582010 • Строителен техник / Геодезист',
    specialty: 'СГСАГ „Христо Ботев“ — Строителство, Архитектура и Геодезия',
    title: 'Конструктивно оразмеряване на стоманобетонна греда по Еврокод 2 и геодезическо трасиране на сграда',
    commissionRole: 'Председател на ДИК (Конструктор с пълна проектантска правоспособност КИИП)',
    mainQuestion:
      'Обяснете методиката за изчисляване на разчетния огъващ момент M_Ed по метода на граничните състояния (ULS/SLS) съгласно БДС EN 1992-1-1 (Еврокод 2) и начина на трасиране на конструктивните оси на терена.',
    followUpQuestions: [
      '1. С какви частни коефициенти на сигурност γ_G и γ_Q се умножават постоянните и променливите товари в основна комбинация?',
      '2. Как се решава обратната геодезическа задача за намиране на посочен ъгъл α и хоризонтално разстояние D от тотална станция?',
      '3. Какви са изискванията на Наредба № 2 за ЗБУТ в строителството при изкопни работи и работа на скеле на височина?'
    ],
    keywords: [
      { label: 'Еврокод 2', matchToken: 'еврокод', hint: 'БДС EN 1992-1-1 за проектиране на бетонни и стоманобетонни конструкции' },
      { label: 'Гранични състояния', matchToken: 'гранич', hint: 'Крайни (ULS — носимоспособност) и експлоатационни (SLS — пукнатини и провисване)' },
      { label: 'Армировка B500', matchToken: 'армир', hint: 'Носеща надлъжна армировка в опънната зона и стремена за напречни сили' },
      { label: 'Посочен ъгъл', matchToken: 'посоч', hint: 'Геодезическо трасиране чрез полярни координати от тотална станция' },
      { label: 'Бетонно покритие', matchToken: 'покрит', hint: 'Защита на армировката от корозия и пожар (c_nom)' },
      { label: 'Наредба № 2 ЗБУТ', matchToken: 'наредб', hint: 'Укрепване на откоси при изкопи над 1.5 m и обезопасени скелета' }
    ],
    goldenDefense:
      'Конструктивният елемент е изчислен по БДС EN 1992-1-1 (Еврокод 2) за крайно гранично състояние (ULS) при товарна комбинация 1.35·G_k + 1.50·Q_k. От максималния огъващ момент M_Ed = q_d·L²/8 при бетон C25/30 и стомана B500B е определена площта на надлъжната опънна армировка A_s и стъпката на стремената за напречна сила V_Ed. Геодезическото отлагане на осите е извършено чрез полярни координати от работна геодезическа основа при спазване на Наредба № 2 за ЗБУТ.',
    normativeChecklist: [
      'Кофражен и армировъчен план с спецификация на стоманата по БДС EN ISO 3766',
      'Статико-динамична записка по Еврокод 2 и Еврокод 8 (сеизмика)',
      'План за безопасност и здраве (ПБЗ) по Наредба № 2'
    ]
  },
  {
    id: 'dippk-fin-acc',
    code: 'СПК-343010 / 344010 • Финансист / Оперативен счетоводител',
    specialty: 'НТБГ / НФСГ — Банково дело, Счетоводство и Митнически контрол',
    title: 'Годишно счетоводно приключване, данъчно преобразуване по ЗКПО и оценка на инвестиционен проект (NPV/IRR)',
    commissionRole: 'Председател на ДИК (Дипломиран експерт-счетоводител ИДЕС & Финансов одитор)',
    mainQuestion:
      'Представете етапите на годишното счетоводно приключване, равенството в счетоводния баланс (Активи = Собствен капитал + Пасиви) и оценката на инвестиционния проект чрез дисконтирани парични потоци (NPV).',
    followUpQuestions: [
      '1. Как се преобразува счетоводният финансов резултат до данъчна печалба по ЗКПО и как се начислява 10% корпоративен данък?',
      '2. Как се формира митническата стойност по ЕАД и върху каква данъчна основа се начислява 20% ДДС при внос от трети страни?',
      '3. При каква стойност на Нетната настояща стойност (NPV) и Вътрешната норма на възвръщаемост (IRR) проектът е финансово приемлив?'
    ],
    keywords: [
      { label: 'Счетоводен баланс', matchToken: 'баланс', hint: 'Равенство на Активи = Собствен капитал + Пасиви по НСС 1 / МСС 1' },
      { label: 'Двойно записване', matchToken: 'двойн', hint: 'Кореспонденция между Дебит и Кредит по счетоводните сметки' },
      { label: 'NPV и IRR', matchToken: 'npv', hint: 'Нетна настояща стойност (NPV > 0) и вътрешна норма на възвръщаемост' },
      { label: 'Данъчна основа ДДС', matchToken: 'ддс', hint: 'При внос включва митническа стойност + мито + акциз' },
      { label: 'Амортизация', matchToken: 'аморт', hint: 'Данъчни и счетоводни амортизационни квоти на ДМА по ЗКПО' },
      { label: 'Ликвидност', matchToken: 'ликвид', hint: 'Коефициент на обща и бърза ликвидност на предприятието' }
    ],
    goldenDefense:
      'В дипломния проект е извършено пълно счетоводно приключване по Закона за счетоводството и НСС. След инвентаризация и начисляване на амортизациите са приключени сметките от група 60 и 70 към сметка 123 „Печалби и загуби от текущата година“. Извършено е данъчно преобразуване по ЗКПО (10% корпоративен данък). Инвестиционният анализ доказва положителна Нетна настояща стойност (NPV > 0) при норма на дисконтиране WACC и IRR, надвишаваща цената на капитала.',
    normativeChecklist: [
      'Оборотна ведомост, Счетоводен баланс и Отчет за приходите и разходите (ОПР)',
      'Годишна данъчна декларация по чл. 92 от ЗКПО и Справка-декларация по ЗДДС',
      'Финансов модел на паричните потоци (Cash Flow, NPV, IRR, Коефициент на ликвидност)'
    ]
  },
  {
    id: 'dippk-mech-cnc',
    code: 'СПК-521010 / 525020 • Машинен техник / Мехатроника и Авиационна техника',
    specialty: 'ПГМЕ / СПГЕ „Джон Атанасов“ / ПГВТ — Машиностроене, CNC и Мехатроника',
    title: 'Технологичен маршрут за ЦПУ (CNC) обработка, диаграма Желязо–Цементит и термообработка на вал-зъбно колело',
    commissionRole: 'Председател на ДИК (Гл. технолог по машиностроене и CAD/CAM системи)',
    mainQuestion:
      'Обосновете избора на конструкционна легирана стомана, режима на термична обработка (закаляване и отвръщане по диаграмата Fe–Fe₃C) и структурата на управляващата G-code програма по ISO 6983 за CNC стругово-фрезова център.',
    followUpQuestions: [
      '1. Как се изчисляват оборотите на шпиндела n = (1000·v_c)/(π·D) и подаването при обработка с твърдосплавни пластини?',
      '2. Какво представлява мартензитната трансформация при закаляване и защо задължително следва отвръщане на стоманата?',
      '3. Как се контролират допуските на форма и разположение по БДС EN ISO 1101 и кои са мерките по ЗБУТ при работа с металорежещи машини?'
    ],
    keywords: [
      { label: 'G-code (ISO 6983)', matchToken: 'g-code', hint: 'Управляваща програма с кодове G00, G01, G02/G03 и компенсация G41/G42' },
      { label: 'Мартензит', matchToken: 'мартенз', hint: 'Високотвърда неравновесна структура след закаляване и последващо отвръщане' },
      { label: 'Скорост на рязане', matchToken: 'рязан', hint: 'Изчисляване на обороти n = 1000·v_c / (π·D) и подаване f' },
      { label: 'Допуски и сглобки', matchToken: 'допуск', hint: 'Система вал/отвор по БДС EN ISO 286 и грапавост Ra' },
      { label: 'Твърдост HRC', matchToken: 'hrc', hint: 'Контрол на твърдостта по Роквел (HRC) след термична обработка' },
      { label: 'ЗБУТ щитове и LOTO', matchToken: 'збут', hint: 'Предпазни блокировки на кабината, охлаждаща течност и лични предпазни средства' }
    ],
    goldenDefense:
      'За детайла вал-зъбно колело е избрана легирана стомана 40Х (41Cr4). Технологичният маршрут включва чернова и чистова CNC обработка с G-code по ISO 6983 (интерполации G01/G02 и корекция на радиуса на инструмента G41/G42), обемно закаляване в масло и средно отвръщане до троосто-мартензитна структура с твърдост 48–52 HRC и последващо шлифоване до грапавост Ra 0.8 μm по БДС EN ISO 286.',
    normativeChecklist: [
      'Работен чертеж на детайла с допуски и грапавости по БДС EN ISO 286 / ISO 1101',
      'Маршрутно-операционна технологична карта и симулация на G-code траекторията',
      'Инструкция по ЗБУТ при експлоатация на CNC металорежещи машини'
    ]
  },
  {
    id: 'dippk-med-bio',
    code: 'СПК-511010 / 723010 • Лаборант / Биотехнолог и Здравни грижи',
    specialty: 'НПМГ / Професионални гимназии по химия, биотехнологии и екология',
    title: 'Количествен спектрофотометричен и титриметричен анализ, PCR диагностика и валидиране на аналитичен метод',
    commissionRole: 'Председател на ДИК (Ръководител на акредитирана изпитвателна лаборатория БДС EN ISO/IEC 17025)',
    mainQuestion:
      'Обяснете приложението на закона на Буге–Ламберт–Беер (A = ε·b·c) при спектрофотометрично определяне на концентрация, построяването на стандартна калибровъчна права и контрола на качеството по БДС EN ISO/IEC 17025.',
    followUpQuestions: [
      '1. Как се изчислява моларната концентрация при киселинно-основно титруване в еквивалентния пункт (n₁·c₁·V₁ = n₂·c₂·V₂)?',
      '2. Кои са трите температурни стъпки на един цикъл при полимеразната верижна реакция (PCR): денатурация, хибридизация (annealing) и елонгация?',
      '3. Какви са правилата за безопасна работа с киселини, биологични агенти и управление на опасни лабораторни отпадъци?'
    ],
    keywords: [
      { label: 'Закон на Беер', matchToken: 'беер', hint: 'Оптична плътност A = ε·b·c е правопропорционална на концентрацията' },
      { label: 'Калибровъчна права', matchToken: 'калибр', hint: 'Линейна регресия с коефициент на корелация R² ≥ 0.999' },
      { label: 'Титруване', matchToken: 'титр', hint: 'Еквивалентен пункт при обемен количествен анализ' },
      { label: 'PCR амплификация', matchToken: 'pcr', hint: 'Експоненциално намножаване на ДНК фрагменти с термостабилна Taq полимераза' },
      { label: 'ISO/IEC 17025', matchToken: '17025', hint: 'Стандарт за компетентност на изпитвателни и калибриращи лаборатории' },
      { label: 'Биобезопасност', matchToken: 'биобез', hint: 'Работа в ламинарен бокс, камина и неутрализация на отпадъци' }
    ],
    goldenDefense:
      'Количественият анализ е проведен чрез UV-Vis спектрофотометрия по закона на Буге–Ламберт–Беер (A = ε·b·c) при аналитична дължина на вълната λ_max. Построена е калибровъчна права по метода на най-малките квадрати (R² = 0.9996) и резултатите са потвърдени чрез еквивалентно титруване. Валидирането на метода (повторяемост RSD < 1.5%, граница на откриване LOD/LOQ) съответства на БДС EN ISO/IEC 17025 при стриктно спазване на правилата за химична и биологична безопасност.',
    normativeChecklist: [
      'Лабораторен протокол с калибровъчна графика и статистическа оценка на неопределеността',
      'Валидиране по БДС EN ISO/IEC 17025 (точност, прецизност, RSD %)',
      'Информационни листове за безопасност (MSDS / CLP) и протокол за обезвреждане'
    ]
  }
];

const UNIVERSITY_COLLOQUIUM_TICKETS: SpecialOralTicket[] = [
  {
    id: 'uni-su-fmi',
    code: 'СУ „Св. Климент Охридски“ • ФМИ / Юридически факултет',
    specialty: 'Кандидатстудентско и олимпиадно събеседване (Софтуерно инженерство & Право)',
    title: 'Алгоритмична сложност, математическа индукция и конституционни принципи на правовата държава',
    commissionRole: 'Академична комисия на СУ „Св. Климент Охридски“',
    mainQuestion:
      'Формулирайте принципа на пълната математическа индукция и сравнете асимптотичната времева сложност O(N log N) срещу O(N²) при алгоритмите за сортиране и търсене в балансирани дървета.',
    followUpQuestions: [
      '1. Защо двоичното търсене (Binary Search) изисква монотонно подреден масив и има логаритмична сложност O(log₂ N)?',
      '2. Какво гласи принципът за разделение на властите по чл. 8 от Конституцията на Република България?'
    ],
    keywords: [
      { label: 'Математическа индукция', matchToken: 'индукц', hint: 'База при n=1, индукционно предположение при n=k и стъпка при n=k+1' },
      { label: 'Сложност O(N log N)', matchToken: 'log', hint: 'Оптимална сложност на сортиране чрез сравнения (MergeSort / HeapSort)' },
      { label: 'Двоично търсене', matchToken: 'двоич', hint: 'Разполовяване на интервала за търсене на всяка стъпка' },
      { label: 'Рекурсия', matchToken: 'рекурс', hint: 'Разделяй и владей (Divide and Conquer) с базово дъно' },
      { label: 'Конституция чл. 8', matchToken: 'констит', hint: 'Разделение на законодателна, изпълнителна и съдебна власт' },
      { label: 'Инвариант', matchToken: 'инвар', hint: 'Условие, което остава вярно преди и след всяка итерация на цикъла' }
    ],
    goldenDefense:
      'Пълната математическа индукция доказва твърдение P(n) за всяко естествено n чрез проверка на базата P(1) и доказателство на импликацията P(k) ⇒ P(k+1). При алгоритмите от типа „Разделяй и владей“ (MergeSort) рекурентното уравнение T(N) = 2T(N/2) + O(N) по Основната теорема (Master Theorem) води до оптимална времева сложност Θ(N log₂ N), което е експоненциално по-ефективно от квадратичните алгоритми O(N²) при големи обеми от данни.',
    normativeChecklist: [
      'Строга математическа формулировка на база и индукционна стъпка',
      'Оценка на времева и пространствена сложност (Big-O нотация)',
      'Ясна логическа структура и терминологична прецизност'
    ]
  },
  {
    id: 'uni-mu-med',
    code: 'Медицински университет (МУ – София / Пловдив / Варна)',
    specialty: 'Кандидатстудентски профил „Медицина, Дентална медицина и Фармация“',
    title: 'Клетъчен енергиен метаболизъм (АТФ), буферни системи на кръвта и химично равновесие',
    commissionRole: 'Академична изпитна комисия по Биология и Химия (МУ)',
    mainQuestion:
      'Проследете етапите на аеробното клетъчно дишане (гликолиза, цикъл на Кребс и окислително фосфорилиране в митохондриите) и обяснете как бикарбонатната буферна система поддържа хомеостазата на кръвното pH (7.35–7.45).',
    followUpQuestions: [
      '1. Каква е ролята на протонния градиент през вътрешната митохондриална мембрана (хемиосмотична теория на Мичъл) за синтеза на АТФ?',
      '2. Как по принципа на Льо Шателие–Браун хипервентилацията или хиповентилацията измества равновесието CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻?'
    ],
    keywords: [
      { label: 'Цикъл на Кребс', matchToken: 'кребс', hint: 'Окисление на ацетил-КоА в матрикса на митохондриите с отделяне на НАДН и ФАДН₂' },
      { label: 'АТФ-синтаза', matchToken: 'атф', hint: 'Окислително фосфорилиране чрез протонен електрохимичен градиент' },
      { label: 'Гликолиза', matchToken: 'гликол', hint: 'Анаеробно разграждане на глюкозата до 2 молекули пируват в цитозола' },
      { label: 'Льо Шателие', matchToken: 'шател', hint: 'Изместване на химичното равновесие при промяна на концентрация или налягане' },
      { label: 'Бикарбонатен буфер', matchToken: 'буфер', hint: 'Поддържане на физиологично pH 7.35–7.45 на кръвната плазма' },
      { label: 'Хомеостаза', matchToken: 'хомеост', hint: 'Постоянство на вътрешната течна среда на организма' }
    ],
    goldenDefense:
      'Пълното аеробно разграждане на 1 mol глюкоза започва с гликолиза в цитозола (2 АТФ + 2 НАДН), продължава с окислително декарбоксилиране на пирувата и цикъл на Кребс в митохондриалния матрикс и завършва в дихателната верига на кристите, където протонният градиент задвижва АТФ-синтазата (общ добив до 36–38 mol АТФ). Отделеният CO₂ участва в бикарбонатната буферна система H₂CO₃ / HCO₃⁻, която съгласно принципа на Льо Шателие–Браун неутрализира излишъка от H⁺ или OH⁻ и предпазва организма от ацидоза и алкалоза.',
    normativeChecklist: [
      'Точни уравнения на гликолизата, цикъла на Кребс и дихателната верига',
      'Приложение на принципа на Льо Шателие–Браун за буферни разтвори',
      'Връзка между молекулярни механизми и клинична физиология'
    ]
  },
  {
    id: 'uni-tu-uasg',
    code: 'ТУ – София & УАСГ • Инженерни и архитектурни науки',
    specialty: 'Кандидатстудентски профил „Математика, Приложна физика и Техническо чертане“',
    title: 'Екстремални задачи с производни, закони за запазване в механиката и електромагнетизъм',
    commissionRole: 'Академична комисия на ТУ – София и УАСГ',
    mainQuestion:
      'Обяснете математическия алгоритъм за намиране на глобален максимум и минимум на функция в затворен интервал [a; b] и го свържете с условието за максимална полезна мощност в електрическа верига при R = r.',
    followUpQuestions: [
      '1. Защо при външно съпротивление R, равно на вътрешното съпротивление на източника r, полезната мощност P(R) = E²·R / (R + r)² достига максимум, а КПД е 50%?',
      '2. Как теоремата на Щайнер позволява изчисляване на инерционния момент (статичен и масов) спрямо успоредна ос?'
    ],
    keywords: [
      { label: 'Първа производна', matchToken: 'производ', hint: 'Необходимо условие на Ферма f\'(x) = 0 за локален екстремум' },
      { label: 'Съгласуван товар R = r', matchToken: 'съпрот', hint: 'Максимална полезна мощност P_max = E² / (4r) при R = r' },
      { label: 'Закон на Ом', matchToken: 'ом', hint: 'Ток за пълна верига I = E / (R + r)' },
      { label: 'Теорема на Щайнер', matchToken: 'щайнер', hint: 'I = I_c + m·d² (или I_z = I_zc + A·a² при сечения в съпромат)' },
      { label: 'Втора производна', matchToken: 'втора', hint: 'Достатъчно условие: при f\'\'(x₀) < 0 имаме локален максимум' },
      { label: 'КПД на веригата', matchToken: 'кпд', hint: 'η = U / E = R / (R + r)' }
    ],
    goldenDefense:
      'За функцията на полезната мощност P(R) = I²·R = E²·R / (R + r)² диференцираме спрямо R по правилото за частно: P\'(R) = E²·[(R + r)² - 2R(R + r)] / (R + r)⁴ = E²·(r - R) / (R + r)³. Приравняването P\'(R) = 0 дава единствена стационарна точка R = r. Тъй като P\'(R) сменя знака си от плюс към минус при преминаване през R = r, функцията достига глобален максимум P_max = E² / (4r), при което коефициентът на полезно действие е η = r / (2r) = 50%.',
    normativeChecklist: [
      'Строго диференциране и изследване на знака на първата производна',
      'Физична интерпретация на граничните режими (празен ход R → ∞ и късо съединение R → 0)',
      'Геометрична и инженерна обосновка'
    ]
  }
];

export const OralExamSimulatorLab: React.FC<OralExamSimulatorLabProps> = ({
  lessons,
  currentLesson,
  onSelectLesson
}) => {
  const [oralMode, setOralMode] = useState<'lesson' | 'dippk' | 'university'>('lesson');
  const [selectedSpecialTicketId, setSelectedSpecialTicketId] = useState<string>(DIPPK_COMMISSION_TICKETS[0].id);
  const [selectedSubject, setSelectedSubject] = useState<string>('Всички предмети');
  const [activeLessonId, setActiveLessonId] = useState<string>(currentLesson.id);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState<boolean>(false);
  const [micMessage, setMicMessage] = useState<string | null>(null);
  const [aiOralEval, setAiOralEval] = useState<OralExamAiEvaluation | null>(null);
  const [isAiEvaluating, setIsAiEvaluating] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    setActiveLessonId(currentLesson.id);
    setQuestionIndex(0);
    setStudentAnswer('');
    setIsSubmitted(false);
    setAiOralEval(null);
    setAiError(null);
  }, [currentLesson.id]);

  const activeSpecialTicket = useMemo(() => {
    const pool = oralMode === 'dippk' ? DIPPK_COMMISSION_TICKETS : UNIVERSITY_COLLOQUIUM_TICKETS;
    return pool.find((t) => t.id === selectedSpecialTicketId) || pool[0];
  }, [oralMode, selectedSpecialTicketId]);

  const [gradeBook, setGradeBook] = useState<GradeBookEntry[]>(() =>
    readStoredArray<GradeBookEntry>('studybg_oral_gradebook', isObjectItem)
  );

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // При напускане на изгледа: спира микрофона и гласовото четене
  useEffect(() => () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
      recognitionRef.current = null;
    }
    window.speechSynthesis?.cancel();
  }, []);

  const filteredLessons = useMemo(() => {
    if (selectedSubject === 'Всички предмети') return lessons;
    return lessons.filter((l) => l.subject === selectedSubject);
  }, [lessons, selectedSubject]);

  const activeLesson = useMemo(() => {
    return lessons.find((l) => l.id === activeLessonId) || filteredLessons[0] || currentLesson;
  }, [lessons, activeLessonId, filteredLessons, currentLesson]);

  // Build oral questions list for the active lesson or special ticket
  const oralQuestions = useMemo(() => {
    if (oralMode !== 'lesson') {
      return [activeSpecialTicket.mainQuestion, ...activeSpecialTicket.followUpQuestions];
    }
    const list: string[] = [];
    if (activeLesson.quickQuestions && activeLesson.quickQuestions.length > 0) {
      list.push(...activeLesson.quickQuestions);
    }
    if (activeLesson.flashcards && activeLesson.flashcards.length > 0) {
      activeLesson.flashcards.slice(0, 3).forEach((fc) => {
        if (!list.includes(fc.front)) {
          list.push(fc.front);
        }
      });
    }
    if (list.length === 0) {
      list.push(`Представете основните тези, понятия и причинно-следствени връзки по темата „${activeLesson.title}“.`);
    }
    return list;
  }, [oralMode, activeSpecialTicket, activeLesson]);

  const activeQuestion = oralQuestions[questionIndex % oralQuestions.length] || oralQuestions[0];

  // Extract 6–8 key terms / concepts from the lesson or special ticket for the live rubric radar
  const rubricKeywords = useMemo(() => {
    if (oralMode !== 'lesson') {
      return activeSpecialTicket.keywords;
    }
    const terms: { label: string; matchToken: string; hint: string }[] = [];

    if (activeLesson.summary.formulasOrDates) {
      activeLesson.summary.formulasOrDates.slice(0, 4).forEach((fd) => {
        const cleanLabel = fd.label.split('(')[0].trim();
        const token = cleanLabel.length >= 4 ? cleanLabel.slice(0, 6).toLowerCase() : cleanLabel.toLowerCase();
        if (token && !terms.some((t) => t.matchToken === token)) {
          terms.push({
            label: cleanLabel,
            matchToken: token,
            hint: fd.value
          });
        }
      });
    }

    if (activeLesson.flashcards) {
      activeLesson.flashcards.slice(0, 4).forEach((fc) => {
        const words = fc.back
          .replace(/[.,:;()"'„“!?-]/g, ' ')
          .split(/\s+/)
          .filter((w: string) => w.length >= 5);
        const keyWord = words[0] || fc.front.split(/\s+/).find((w: string) => w.length >= 5) || 'понятие';
        const token = keyWord.slice(0, 5).toLowerCase();
        if (token && !terms.some((t) => t.matchToken === token)) {
          terms.push({
            label: keyWord,
            matchToken: token,
            hint: fc.back.slice(0, 90)
          });
        }
      });
    }

    return terms.slice(0, 6);
  }, [oralMode, activeSpecialTicket, activeLesson]);

  const matchedKeywords = useMemo(() => {
    const ansLower = studentAnswer.toLowerCase();
    return rubricKeywords.filter((rk) => {
      const firstWord = rk.label.toLowerCase().split(/\s+/)[0];
      const stem = firstWord.length > 5 ? firstWord.slice(0, 5) : firstWord;
      return ansLower.includes(rk.matchToken) || (stem.length >= 3 && ansLower.includes(stem));
    });
  }, [studentAnswer, rubricKeywords]);

  // Calculate oral grade based on keyword coverage + length depth
  const evaluation = useMemo(() => {
    const wordCount = studentAnswer.trim() ? studentAnswer.trim().split(/\s+/).length : 0;
    const totalKw = Math.max(1, rubricKeywords.length);
    const kwRatio = matchedKeywords.length / totalKw;
    const lengthBonus = Math.min(0.35, wordCount / 45);
    const scoreRatio = Math.min(1, kwRatio * 0.75 + lengthBonus);

    if (scoreRatio >= 0.75 || (matchedKeywords.length >= 4 && wordCount >= 18)) {
      return { numeric: 6.0, label: 'Отличен (6.00)', color: 'bg-emerald-600 text-white', badge: 'bg-emerald-50 text-emerald-900 border-emerald-300' };
    }
    if (scoreRatio >= 0.55 || matchedKeywords.length >= 3) {
      return { numeric: 5.25, label: 'Много добър (5.25)', color: 'bg-blue-600 text-white', badge: 'bg-blue-50 text-blue-900 border-blue-300' };
    }
    if (scoreRatio >= 0.35 || matchedKeywords.length >= 2) {
      return { numeric: 4.25, label: 'Добър (4.25)', color: 'bg-amber-600 text-white', badge: 'bg-amber-50 text-amber-900 border-amber-300' };
    }
    if (wordCount >= 8 || matchedKeywords.length >= 1) {
      return { numeric: 3.25, label: 'Среден (3.25)', color: 'bg-orange-600 text-white', badge: 'bg-orange-50 text-orange-900 border-orange-300' };
    }
    return { numeric: 2.0, label: 'Слаб (2.00)', color: 'bg-rose-600 text-white', badge: 'bg-rose-50 text-rose-900 border-rose-300' };
  }, [studentAnswer, rubricKeywords.length, matchedKeywords.length]);

  const handleSpeakQuestion = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeakingQuestion) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuestion(false);
      return;
    }
    window.speechSynthesis.cancel();
    const introText =
      oralMode === 'lesson'
        ? `Устно изпитване по ${activeLesson.subject}. Тема: ${activeLesson.title}. Въпрос към ученика: ${activeQuestion}`
        : `${activeSpecialTicket.commissionRole}. Специалност: ${activeSpecialTicket.code}. Въпрос на комисията: ${activeQuestion}`;
    const utterance = new SpeechSynthesisUtterance(introText);
    utterance.lang = 'bg-BG';
    utterance.rate = 0.96;
    utterance.onend = () => setIsSpeakingQuestion(false);
    utterance.onerror = () => setIsSpeakingQuestion(false);
    setIsSpeakingQuestion(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleMicrophone = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const win = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const SpeechRecConstructor = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecConstructor) {
      setMicMessage('Този браузър не поддържа директно гласово разпознаване (използвай Chrome/Edge или въведи отговора от клавиатурата).');
      return;
    }

    try {
      const recognition = new SpeechRecConstructor();
      recognition.lang = 'bg-BG';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setStudentAnswer(transcript.trim());
      };

      recognition.onerror = () => {
        setIsListening(false);
        setMicMessage('Микрофонът е спрян или не е разрешен достъпът.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      setMicMessage(null);
      setIsListening(true);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleRandomBoardCall = () => {
    if (oralMode === 'dippk') {
      const randomTicket = DIPPK_COMMISSION_TICKETS[Math.floor(Math.random() * DIPPK_COMMISSION_TICKETS.length)];
      setSelectedSpecialTicketId(randomTicket.id);
      setQuestionIndex(0);
      setStudentAnswer('');
      setIsSubmitted(false);
      return;
    }
    if (oralMode === 'university') {
      const randomTicket = UNIVERSITY_COLLOQUIUM_TICKETS[Math.floor(Math.random() * UNIVERSITY_COLLOQUIUM_TICKETS.length)];
      setSelectedSpecialTicketId(randomTicket.id);
      setQuestionIndex(0);
      setStudentAnswer('');
      setIsSubmitted(false);
      return;
    }
    const randomLesson = lessons[Math.floor(Math.random() * lessons.length)] || activeLesson;
    setSelectedSubject('Всички предмети');
    setActiveLessonId(randomLesson.id);
    onSelectLesson?.(randomLesson);
    setQuestionIndex(Math.floor(Math.random() * 5));
    setStudentAnswer('');
    setIsSubmitted(false);
  };

  const handleSubmitOralAnswer = () => {
    if (!studentAnswer.trim()) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    setIsSubmitted(true);

    const newEntry: GradeBookEntry = {
      id: `${Date.now()}`,
      lessonTitle: oralMode === 'lesson' ? activeLesson.title : activeSpecialTicket.title,
      subject: oralMode === 'lesson' ? activeLesson.subject : activeSpecialTicket.code,
      question: activeQuestion,
      gradeNumeric: evaluation.numeric,
      gradeLabel: evaluation.label,
      matchedCount: matchedKeywords.length,
      totalKeywords: rubricKeywords.length,
      dateStr: new Date().toLocaleDateString('bg-BG')
    };

    const updated = [newEntry, ...gradeBook].slice(0, 12);
    setGradeBook(updated);
    try {
      localStorage.setItem('studybg_oral_gradebook', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold">
            <Mic className="w-3.5 h-3.5 text-blue-400" />
            <span>ГЛАСОВ И ПИСМЕН ТРЕНАЖОР • {lessons.length} УРОКА + ДИППК КОМИСИЯ (ТРЕТА СПК) + ВУЗ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Устно Изпитване & Защита пред Държавна Изпитна Комисия (6.00)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Тренирай устно изпитване пред дъската, защита на Дипломен проект по Наредба № 1 за Трета СПК с контравъпроси на комисията или академично събеседване за ВУЗ.
          </p>
        </div>

        <button
          onClick={handleRandomBoardCall}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 text-xs font-black shadow-sm transition-colors shrink-0 cursor-pointer"
        >
          <Shuffle className="w-4 h-4" />
          <span>🎲 Изтегли случаен билет</span>
        </button>
      </div>

      {/* Mode Switcher Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={() => {
            setOralMode('lesson');
            setQuestionIndex(0);
            setStudentAnswer('');
            setIsSubmitted(false);
          }}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            oralMode === 'lesson'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
          }`}
        >
          <div className="text-xs font-black">📚 1. Устно пред дъската (МОН Уроци)</div>
          <div className={`text-[11px] mt-0.5 ${oralMode === 'lesson' ? 'text-indigo-100' : 'text-slate-500'}`}>
            Всички {lessons.length} урока от 5. до 12. клас с гласов радар
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setOralMode('dippk');
            setSelectedSpecialTicketId(DIPPK_COMMISSION_TICKETS[0].id);
            setQuestionIndex(0);
            setStudentAnswer('');
            setIsSubmitted(false);
          }}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            oralMode === 'dippk'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
          }`}
        >
          <div className="text-xs font-black">🛠️ 2. ДИППК Защита пред Комисия (Трета СПК)</div>
          <div className={`text-[11px] mt-0.5 ${oralMode === 'dippk' ? 'text-emerald-100' : 'text-slate-500'}`}>
            6 дипломни защити (IT, Ядрена/Електро, СГСАГ, НТБГ, CNC, Биотех)
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setOralMode('university');
            setSelectedSpecialTicketId(UNIVERSITY_COLLOQUIUM_TICKETS[0].id);
            setQuestionIndex(0);
            setStudentAnswer('');
            setIsSubmitted(false);
          }}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            oralMode === 'university'
              ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
          }`}
        >
          <div className="text-xs font-black">🎓 3. Академично събеседване за ВУЗ</div>
          <div className={`text-[11px] mt-0.5 ${oralMode === 'university' ? 'text-amber-100' : 'text-slate-500'}`}>
            Колоквиум за СУ (ФМИ/Право), МУ (Медицина) и ТУ / УАСГ
          </div>
        </button>
      </div>

      {/* Subject & Lesson Selector OR Special Commission Ticket Selector */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        {oralMode === 'lesson' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                1. Избери учебен предмет:
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  const subj = e.target.value;
                  setSelectedSubject(subj);
                  const firstMatch =
                    subj === 'Всички предмети'
                      ? lessons[0]
                      : lessons.find((l) => l.subject === subj) || lessons[0];
                  if (firstMatch) {
                    setActiveLessonId(firstMatch.id);
                    setQuestionIndex(0);
                    setStudentAnswer('');
                    setIsSubmitted(false);
                  }
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900"
              >
                {SUBJECTS_LIST.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                2. Избери конкретен урок ({filteredLessons.length} теми):
              </label>
              <select
                value={activeLesson.id}
                onChange={(e) => {
                  const found = lessons.find((l) => l.id === e.target.value);
                  if (found) {
                    setActiveLessonId(found.id);
                    onSelectLesson?.(found);
                    setQuestionIndex(0);
                    setStudentAnswer('');
                    setIsSubmitted(false);
                  }
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900"
              >
                {filteredLessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    [{l.grade}] {l.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              {oralMode === 'dippk'
                ? 'Избери професионално направление за ДИППК защита пред Държавна изпитна комисия (Наредба № 1):'
                : 'Избери университетски профил за академично устно събеседване:'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {(oralMode === 'dippk' ? DIPPK_COMMISSION_TICKETS : UNIVERSITY_COLLOQUIUM_TICKETS).map((ticket) => {
                const isSelected = ticket.id === activeSpecialTicket.id;
                return (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => {
                      setSelectedSpecialTicketId(ticket.id);
                      setQuestionIndex(0);
                      setStudentAnswer('');
                      setIsSubmitted(false);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-amber-300' : 'text-indigo-700'}`}>
                      {ticket.code}
                    </div>
                    <div className="text-xs font-extrabold mt-0.5 line-clamp-2">{ticket.title}</div>
                    <div className={`text-[10px] mt-1 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {ticket.specialty}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Commission Follow-Up Question Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-600 mr-1">Етап на защитата:</span>
              {oralQuestions.map((_, qIdx) => (
                <button
                  key={qIdx}
                  type="button"
                  onClick={() => {
                    setQuestionIndex(qIdx);
                    setIsSubmitted(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                    questionIndex % oralQuestions.length === qIdx
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {qIdx === 0 ? '🎯 Основно експозе на проекта' : `⚡ Контравъпрос #${qIdx} от Комисията`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Examiner Question Box */}
        <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-indigo-800 uppercase tracking-wider">
              <span>
                {oralMode === 'lesson'
                  ? `Въпрос #${(questionIndex % oralQuestions.length) + 1} от ${oralQuestions.length} пред дъската:`
                  : questionIndex % oralQuestions.length === 0
                  ? `${activeSpecialTicket.commissionRole} • Основна защита:`
                  : `${activeSpecialTicket.commissionRole} • Контролен контравъпрос:`}
              </span>
              <span className="px-2 py-0.5 rounded bg-white border border-indigo-200 text-[10px]">
                {oralMode === 'lesson'
                  ? `${activeLesson.subject} • ${activeLesson.grade}`
                  : activeSpecialTicket.code}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              „{activeQuestion}“
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSpeakQuestion}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isSpeakingQuestion
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white hover:bg-indigo-100 text-indigo-900 border-indigo-300'
              }`}
            >
              {isSpeakingQuestion ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeakingQuestion ? 'Спри гласа' : 'Чуй въпроса'}</span>
            </button>

            <button
              onClick={() => {
                setQuestionIndex((prev) => prev + 1);
                setStudentAnswer('');
                setIsSubmitted(false);
              }}
              className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold cursor-pointer"
            >
              Следващ въпрос ➔
            </button>
          </div>
        </div>

        {/* Live Rubric Keyword Radar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>МОН Радар на задължителните понятия за Отличен 6.00 (светват при споменаване):</span>
            </span>
            <span className="font-mono font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Покрити: {matchedKeywords.length} / {rubricKeywords.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {rubricKeywords.map((rk, idx) => {
              const isMatched = matchedKeywords.some((m) => m.matchToken === rk.matchToken);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (!isSubmitted) {
                      setStudentAnswer((prev) => (prev ? `${prev} ${rk.label}` : rk.label));
                    }
                  }}
                  title={`Кликни, за да вмъкнеш или виж жокер: ${rk.hint}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {isMatched ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-2 h-2 rounded-full bg-slate-300" />}
                  <span>{rk.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Student Voice / Text Input Area */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-700">
              {oralMode === 'lesson'
                ? 'Твоят устен / писмен отговор пред дъската:'
                : 'Твоето експозе и защита пред Държавната изпитна комисия:'}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMicrophone}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-300'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isListening ? 'Слушам... (Спри микрофона)' : '🎙️ Диктувай с микрофон'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStudentAnswer('');
                  setIsSubmitted(false);
                }}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                title="Изчисти отговора"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {micMessage && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{micMessage}</span>
            </div>
          )}

          <textarea
            rows={4}
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="Започни да говориш с бутона „Диктувай с микрофон“ или напиши своя отговор тук, като включиш ключовите термини, стандарти и формули..."
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={async () => {
                if (!studentAnswer.trim() || isAiEvaluating) return;
                if (isListening) {
                  recognitionRef.current?.stop();
                  setIsListening(false);
                }
                setIsSubmitted(true);
                setIsAiEvaluating(true);
                setAiError(null);
                try {
                  const res = await evaluateOralAnswerWithGemini({
                    subject: oralMode === 'lesson' ? `${activeLesson.subject} (${activeLesson.grade}) — ${activeLesson.title}` : `${activeSpecialTicket.code} — ${activeSpecialTicket.title}`,
                    question: activeQuestion,
                    goldenAnswer: oralMode === 'lesson' ? activeLesson.summary.examGoldenRule : activeSpecialTicket.goldenDefense,
                    studentAnswer: studentAnswer.trim()
                  });
                  setAiOralEval(res);
                } catch (err) {
                  setAiError(err instanceof Error ? err.message : 'Грешка при връзка с AI Екзаминатора.');
                } finally {
                  setIsAiEvaluating(false);
                }
              }}
              disabled={!studentAnswer.trim() || isAiEvaluating}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              {isAiEvaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isAiEvaluating ? 'Комисията оценява...' : `🤖 AI оценка от комисията (${AI_EXAMINER_LABEL})`}</span>
            </button>

            <button
              type="button"
              onClick={handleSubmitOralAnswer}
              disabled={!studentAnswer.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Предай отговора и впиши оценка в Протокола</span>
            </button>
          </div>
        </div>

        {/* Evaluation Result & Ideal 6.00 Answer */}
        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className={`px-3.5 py-1.5 rounded-xl text-sm font-black ${evaluation.color}`}>
                  {aiOralEval ? aiOralEval.gradeLabel : evaluation.label}
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  Покрити {matchedKeywords.length} от {rubricKeywords.length} ключови критерия на Комисията
                </span>
              </div>
            </div>

            {aiError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                {aiError}
              </div>
            )}

            {aiOralEval && (
              <div className="p-4 rounded-xl bg-indigo-950 text-white border border-indigo-700 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Рецензия от председателя на комисията ({AI_EXAMINER_LABEL}):</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-xs font-black">
                    {aiOralEval.gradeLabel}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                  {aiOralEval.commissionComment}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                    <div className="text-[11px] font-bold text-emerald-300 uppercase">✅ Силни страни в защитата:</div>
                    {aiOralEval.strengths.map((s, idx) => (
                      <div key={idx} className="text-xs text-slate-200">• {s}</div>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                    <div className="text-[11px] font-bold text-amber-300 uppercase">⚠️ Какво да добавиш за 6.00:</div>
                    {aiOralEval.missingPoints.map((m, idx) => (
                      <div key={idx} className="text-xs text-slate-200">• {m}</div>
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-200 font-semibold">
                  ⚡ Допълнителен контравъпрос от комисията: „{aiOralEval.followUpQuestion}“
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>
                  {oralMode === 'lesson'
                    ? 'Еталон за Отличен 6.00 пред дъската:'
                    : 'Еталонна защита пред Държавната изпитна комисия за Отличен 6.00:'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 font-semibold leading-relaxed">
                {oralMode === 'lesson' ? activeLesson.summary.examGoldenRule : activeSpecialTicket.goldenDefense}
              </p>
              <ul className="space-y-1 pt-1">
                {(oralMode === 'lesson' ? activeLesson.summary.keyPoints.slice(0, 3) : activeSpecialTicket.normativeChecklist).map((kp, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Electronic Gradebook History */}
      {gradeBook.length > 0 && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Електронен Бележник от устни изпитвания ({gradeBook.length})</span>
            </h3>
            <button
              onClick={() => {
                setGradeBook([]);
                localStorage.removeItem('studybg_oral_gradebook');
              }}
              className="text-[11px] text-slate-400 hover:text-rose-600 cursor-pointer"
            >
              Изчисти бележника
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {gradeBook.map((entry) => (
              <div key={entry.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-indigo-700 truncate">{entry.subject}</span>
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {entry.gradeLabel}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{entry.lessonTitle}</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">„{entry.question}“</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
