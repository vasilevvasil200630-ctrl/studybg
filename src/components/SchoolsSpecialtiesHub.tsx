import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Building2,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Search,
  Layers,
  Sparkles,
  Code2,
  TrendingUp,
  Compass,
  Cpu,
  Stethoscope,
  Palette,
  Languages,
  Atom,
  Filter,
  Plane,
  Utensils,
  Trophy,
  Globe2,
  Calculator,
  Flame,
  ShieldCheck,
  Film,
  HeartHandshake
} from 'lucide-react';
import type { LessonData } from '../types';
import {
  SCHOOL_SPECIALTIES_SECTIONS,
  GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX,
  type SchoolCategorySection
} from '../data/schoolsSpecialtiesDatabase';

interface SchoolsSpecialtiesHubProps {
  allLessons: LessonData[];
  onSelectLesson: (lesson: LessonData) => void;
  initialSchoolId?: string;
}

const SECTION_ICON_MAP: Record<string, React.ReactNode> = {
  'pmg-smg-npmg': <Atom className="w-5 h-5 text-indigo-400" />,
  'language-humanities-eg': <Languages className="w-5 h-5 text-violet-400" />,
  'tech-it-tues-pgknma': <Code2 className="w-5 h-5 text-emerald-400" />,
  'economics-banking-ntbg-nfsg': <TrendingUp className="w-5 h-5 text-amber-400" />,
  'architecture-construction-sgsag': <Compass className="w-5 h-5 text-cyan-400" />,
  'engineering-mechatronics-energy': <Cpu className="w-5 h-5 text-blue-400" />,
  'medicine-biotech-ecology-agro': <Stethoscope className="w-5 h-5 text-rose-400" />,
  'arts-design-tourism-culinary': <Palette className="w-5 h-5 text-fuchsia-400" />,
  'aviation-maritime-logistics-rail': <Plane className="w-5 h-5 text-sky-400" />,
  'food-polygraphy-forestry-textile': <Utensils className="w-5 h-5 text-orange-400" />,
  'sports-schools-performing-arts': <Trophy className="w-5 h-5 text-yellow-400" />,
  'classical-languages-russian-italian-oriental': <Globe2 className="w-5 h-5 text-teal-400" />,
  'mining-metallurgy-chemical-geology': <Flame className="w-5 h-5 text-cyan-400" />,
  'security-interior-criminalistics-law': <ShieldCheck className="w-5 h-5 text-amber-400" />,
  'applied-arts-stone-woodcarving-ceramics-cinema': <Film className="w-5 h-5 text-purple-400" />,
  'pedagogy-social-work-beauty-wellness-spa': <HeartHandshake className="w-5 h-5 text-pink-400" />
};

const DIPLOMA_DEFENSE_ASSIGNMENTS: {
  id: string;
  sectorBadge: string;
  title: string;
  professionCode: string;
  inputParameters: string;
  calculationSteps: string[];
  commissionQuestions: { q: string; a: string }[];
  linkedLessonId: string;
}[] = [
  {
    id: 'defense-it-ai',
    sectorBadge: '1. ТУЕС / ИТ & Изкуствен интелект',
    title: 'Проектиране на защитена Full-Stack микросервизна система с криптографска автентикация и ML модул за класификация',
    professionCode: 'Системен програмист / Приложен програмист (4810201 — III СПК)',
    inputParameters: 'REST API с JWT (RS256), PostgreSQL база данни в 3NF (150 000 записа), AES-256 криптиране и невронна мрежа с Precision = 0.90 и Recall = 0.85.',
    calculationSteps: [
      'Нормализиране на БД до Трета нормална форма (3NF) и създаване на B-Tree индекси за O(log n) търсене.',
      'Защита на всички SQL заявки чрез Prepared Statements и хеширане на пароли с Argon2id / bcrypt + Salt.',
      'Изчисляване на F1-Score на класификатора: F1 = 2·(0.90·0.85)/(0.90+0.85) = 1.53 / 1.75 ≈ 0.874 (87.4%).'
    ],
    commissionQuestions: [
      {
        q: 'Защо използвате Prepared Statements вместо конкатенация на низове в SQL заявките?',
        a: 'Защото параметризираните заявки отделят структурно SQL кода от потребителските данни и напълно предотвратяват SQL Injection атаки.'
      },
      {
        q: 'Каква е разликата между симетричното (AES) и асиметричното (RSA) криптиране в TLS/HTTPS?',
        a: 'Асиметричният алгоритъм (RSA/ECDHE) обменя сигурно сесийния ключ през публичния канал, след което AES криптира трафика с висока скорост.'
      }
    ],
    linkedLessonId: 'cs-cybersecurity-cryptography-ai-machine-learning-11-12'
  },
  {
    id: 'defense-pmg-stem',
    sectorBadge: '2. СМГ / ПМГ / НПМГ (Профил Математика & Природни науки)',
    title: 'Математическо моделиране на екстремални задачи с производни, комплексни числа и аналитична геометрия на конични сечения',
    professionCode: 'Профилирана матура (ДЗИ) Математика, Физика и Химия (11.–12. клас)',
    inputParameters: 'Функция на разходите C(x) = x³ - 12x² + 36x + 50 за x ∈ [1; 8]; комплексен импеданс Z = 2(cos π/6 + i·sin π/6) на 6-та степен.',
    calculationSteps: [
      'Намиране на първа производна C\'(x) = 3x² - 24x + 36 = 3(x - 2)(x - 6) = 0 => стационарни точки x₁ = 2 и x₂ = 6.',
      'Проверка с втора производна C\'\'(x) = 6x - 24: C\'\'(2) = -12 < 0 (локален максимум), C\'\'(6) = +12 > 0 (локален минимум C(6) = 50).',
      'Прилагане на формулата на Моавър: Z⁶ = 2⁶(cos π + i·sin π) = 64(-1 + 0i) = -64.'
    ],
    commissionQuestions: [
      {
        q: 'Достатъчно условие ли е f\'(x₀) = 0 за съществуване на локален екстремум в точката x₀?',
        a: 'Не — това е само необходимо условие (Теорема на Ферма). За екстремум е нужно производната да сменя знака си при преминаване през x₀ (напр. при f(x) = x³ имаме f\'(0) = 0, но точката е инфлексна).'
      },
      {
        q: 'Как се определя ексцентрицитетът e на елипса и хипербола?',
        a: 'Чрез отношението e = c / a: при елипса 0 < e < 1 (c² = a² - b²), а при хипербола e > 1 (c² = a² + b²).'
      }
    ],
    linkedLessonId: 'math-11-12-calculus-integrals-complex-conics-dzi'
  },
  {
    id: 'defense-eg-languages',
    sectorBadge: '3. ЕГ / Хуманитарни гимназии (DSD / DELF / DELE C1)',
    title: 'Сравнителен лингвистичен и прагматичен анализ на аргументативно есе и трансформация на синтактични конструкции (B2–C1)',
    professionCode: 'Профил „Чужди езици“ и „Хуманитарни науки“ (ДЗИ 12. клас / CEFR B2–C1)',
    inputParameters: 'Трансформация на условни наклонения (Mixed Conditionals), Konjunktiv II (Немски), Subjonctif (Френски) и Subjuntivo (Испански).',
    calculationSteps: [
      'Структуриране на академично есе (220–250 думи) по модела: Теза -> Аргумент Pro -> Контрааргумент Contra -> Синтез.',
      'Синтактична инверсия при смесени условни изречения: Had + Subject + V3 (Past Participle), Subject + would + V1 (сегашен резултат от минало условие).',
      'Съгласуване на времената в косвена реч (Sequence of Tenses / Discours indirect) и употреба на дискурсивни маркери.'
    ],
    commissionQuestions: [
      {
        q: 'Кога се използва структурата Mixed Conditional (If + Past Perfect -> would + Infinitive)?',
        a: 'Когато нереално минало условие (3-ти тип) има пряк резултат в настоящия момент (2-ри тип), напр. „If I had taken that flight, I would be in Paris now“.'
      },
      {
        q: 'Каква е разликата между Vorgangspassiv (werden + Partizip II) и Zustandspassiv (sein + Partizip II) в немския език?',
        a: 'Vorgangspassiv описва самия процес на извършване на действието, докато Zustandspassiv описва вече завършеното състояние след действието.'
      }
    ],
    linkedLessonId: 'lang-german-french-spanish-advanced-grammar-dzi-11-12'
  },
  {
    id: 'defense-banking-economics',
    sectorBadge: '4. НТБГ / НФСГ / Банково, Данъчно и Счетоводно дело',
    title: 'Годишно счетоводно приключване, данъчно преобразуване по ЗКПО и оценка на инвестиционен проект с NPV',
    professionCode: 'Икономист-информатик / Оперативен счетоводител / Финансист (3451203 — III СПК)',
    inputParameters: 'Приходи = 800 000 лв., Разходи = 600 000 лв., Активи = 1 000 000 лв., Собствен капитал = 500 000 лв., Корпоративен данък = 10%, ДДС = 20%.',
    calculationSteps: [
      'Съставяне на Счетоводен баланс (Активи = Собствен капитал + Пасиви) и Отчет за приходите и разходите.',
      'Изчисляване на счетоводна печалба (200 000 лв.), корпоративен данък 10% (20 000 лв.) и нетна печалба (180 000 лв.).',
      'Изчисляване на рентабилност на собствения капитал ROE = (180 000 / 500 000) × 100% = 36.0%.'
    ],
    commissionQuestions: [
      {
        q: 'Как се променя една активна счетоводна сметка (напр. сметка 503 „Разплащателна сметка“) при постъпване на парични средства?',
        a: 'Активните сметки се увеличават по Дебита (Дт) и се намаляват по Кредита (Кт).'
      },
      {
        q: 'Какво означава положителна Нетна настояща стойност (NPV > 0) на инвестиционен проект?',
        a: 'Означава, че дисконтираните бъдещи парични потоци надвишават първоначалната инвестиция и проектът е икономически изгоден.'
      }
    ],
    linkedLessonId: 'econ-accounting-banking-fintech-customs-11-12'
  },
  {
    id: 'defense-architecture-sgsag',
    sectorBadge: '5. СГСАГ / Строителство, Архитектура и Геодезия',
    title: 'Оразмеряване на стоманобетонна греда по Еврокод 2, сеизмичен разчет по Еврокод 8 и геометрична нивелация',
    professionCode: 'Строителен техник / Архитектурен техник / Геодезист (5820101 / 5810101 — III СПК)',
    inputParameters: 'Проста греда с отвор L = 6 m и равномерно натоварване q = 20 kN/m; репер H_A = 245.500 m, заден отчет b = 1.840 m, преден отчет f = 0.640 m.',
    calculationSteps: [
      'Определяне на опорните реакции R_A = R_B = q·L/2 = 60 kN и максималния огъващ момент M_max = q·L²/8 = 20·36/8 = 90 kN·m.',
      'Геодезическо превишение h_AB = b - f = 1.840 - 0.640 = +1.200 m => Кота H_B = 245.500 + 1.200 = 246.700 m.',
      'Проверка на топлопреминаването U = 1 / R_tot [W/(m²·K)] и критичната сила на Ойлер за колоните.'
    ],
    commissionQuestions: [
      {
        q: 'В коя зона на проста стоманобетонна греда на две опори се разполага основната носеща стоманена армировка?',
        a: 'В долната (опънна) зона, тъй като бетонът поема отлично натиска отгоре, но има ниска якост на опън отдолу.'
      },
      {
        q: 'Как се пресмята превишението h между две точки при геометрична нивелация?',
        a: 'От задния отчет по латата b се изважда предният отчет f: h = b - f (никога обратното!).'
      }
    ],
    linkedLessonId: 'voc-architecture-bim-geodesy-civil-eng-11-12'
  },
  {
    id: 'defense-engineering-mechatronics',
    sectorBadge: '6. ПГМЕ / ПГТЕ / Електротехника, Мехатроника & ВЕИ',
    title: 'Оразмеряване на трифазен асинхронен електродвигател, PLC/PID автоматизация и хибридна фотоволтаична система',
    professionCode: 'Електротехник / Мехатроник / Техник по ВЕИ (5220101 / 5230901 — III СПК)',
    inputParameters: 'Трифазна мрежа U_L = 400 V (50 Hz), ток I_L = 20 A, cos φ = 0.85, 4-полюсен двигател (p = 2) с хлъзгане s = 4%.',
    calculationSteps: [
      'Изчисляване на синхронната честота на въртене: n₁ = 60·f / p = 60·50 / 2 = 1500 об./min.',
      'Работна честота на ротора: n₂ = n₁(1 - s) = 1500 · (1 - 0.04) = 1440 об./min.',
      'Активна трифазна мощност: P = √3 · U_L · I_L · cos φ = 1.732 · 400 · 20 · 0.85 ≈ 11 778 W (11.78 kW).'
    ],
    commissionQuestions: [
      {
        q: 'Защо асинхронният двигател не може да се върти със синхронната скорост n₁ на магнитното поле?',
        a: 'Защото при n₂ = n₁ роторните проводници няма да пресичат магнитните силови линии, индуцираното ЕДН и токът в ротора стават нула и въртящият момент изчезва.'
      },
      {
        q: 'Каква е ролята на диференциалната съставка (D) в един PID регулатор?',
        a: 'Тя реагира на скоростта на изменение на грешката (de/dt), предвижда отклоненията и гаси колебанията (пререгулирането).'
      }
    ],
    linkedLessonId: 'voc-electrical-engineering-plc-mechatronics-renewable-11-12'
  },
  {
    id: 'defense-medicine-biotech-agro',
    sectorBadge: '7. Медицински профил / Биотехнологии, Ветеринарна & Екология',
    title: 'Молекулярна диагностика с RT-qPCR, биореакторна ферментация и еколого-агротехнически мониторинг (БПК₅ / ХПК)',
    professionCode: 'Биотехнолог / Ветеринарен техник / Еколог (5240101 / 6210101 — III СПК)',
    inputParameters: 'PCR амплификация за n = 30 цикъла; водна проба с разтворен кислород DO₀ = 8.8 mg/L и DO₅ = 3.2 mg/L при pH = 7.2.',
    calculationSteps: [
      'Изчисляване на коефициента на амплификация при PCR: N = N₀ · 2³⁰ ≈ 1.07 × 10⁹ копия на таргетния ДНК фрагмент.',
      'Определяне на 5-дневната биохимична потребност от кислород: БПК₅ = DO₀ - DO₅ = 8.8 - 3.2 = 5.6 mg O₂/L.',
      'Поддържане на стерилност, pH и разтворен кислород (pO₂) в експоненциалната (лог) фаза на микробния растеж в биореактора.'
    ],
    commissionQuestions: [
      {
        q: 'Каква е разликата между артериите и вените в малкия и големия кръг на кръвообращението?',
        a: 'Артериите са съдове, които изнасят кръв от сърцето (в белодробната артерия тече венозна кръв!), а вените връщат кръв към сърцето (в белодробните вени тече артериална кръв!).'
      },
      {
        q: 'Защо при PCR реакцията се използва термостабилна Taq ДНК-полимераза?',
        a: 'Защото ензимът не денатурира при високата температура от 94–95 °C по време на стъпката на разделяне на двойната спирала на ДНК.'
      }
    ],
    linkedLessonId: 'bio-medicine-anatomy-biotech-pharmacy-8-12'
  },
  {
    id: 'defense-tourism-hospitality-design',
    sectorBadge: '8. Туризъм, Хотелиерство, Кулинария & Дизайн',
    title: 'Икономически разчет на хотелски комплекс (RevPAR / ADR), HACCP контрол в ресторантьорството и цветоотделяне за печат',
    professionCode: 'Организатор на туристическа агентска дейност / Хотелиер / Графичен дизайнер (8110101 / 2130701 — III СПК)',
    inputParameters: 'Хотел със 100 стаи, заетост Occupancy = 75%, средна цена ADR = 160 лв.; кулинарна калкулация при Food Cost = 30%.',
    calculationSteps: [
      'Изчисляване на прихода от налична стая: RevPAR = Occupancy × ADR = 0.75 × 160 лв. = 120.00 лв.',
      'Определяне на продажна цена на ястие със себестойност 9.00 лв. при 30% Food Cost: Цена без ДДС = 9.00 / 0.30 = 30.00 лв.',
      'Контрол на температурната „опасна зона“ по HACCP (5 °C – 60 °C) и експорт на менюто в CMYK (300 DPI + 3 mm Bleed).'
    ],
    commissionQuestions: [
      {
        q: 'Защо файлове за офсетов печат се подготвят в цветови модел CMYK, а не в RGB?',
        a: 'Защото RGB е адитивен модел за светещи екрани, докато печатните мастила (Cyan, Magenta, Yellow, Key/Black) работят по субтрактивен модел чрез отразена светлина.'
      },
      {
        q: 'Коя е критичната температура във вътрешността на месото при термична обработка според стандарта HACCP?',
        a: 'Минимум 72–75 °C в центъра на продукта за гарантирано унищожаване на патогенни бактерии като Salmonella и Listeria.'
      }
    ],
    linkedLessonId: 'voc-tourism-hospitality-design-arts-8-12'
  },
  {
    id: 'defense-aviation-maritime-logistics',
    sectorBadge: '9. ВВМУ / Авиационни, Морски & Логистични гимназии',
    title: 'Аеродинамичен разчет на подемна сила и навигационна прокладка на истински курс и метацентрична устойчивост на кораб',
    professionCode: 'Корабоводител / Авиационен техник / Спедитор-логистик (5250301 / 5250401 — III СПК)',
    inputParameters: 'Крейсерска скорост V = 200 m/s, ρ = 0.6 kg/m³, S = 120 m², C_L = 0.50; Кораб с КК = 075°, d = +4° E, δ = -2° W; KM = 8.5 m, KG = 7.3 m.',
    calculationSteps: [
      'Аеродинамична подемна сила: L = ½·ρ·V²·S·C_L = 0.5 · 0.6 · 40000 · 120 · 0.50 = 720 000 N (720 kN).',
      'Навигационна поправка ΔК = (+4°) + (-2°) = +2° E => Истински курс ИК = 075° + 2° = 077°.',
      'Проверка на началната напречна устойчивост на кораба: GM = KM - KG = 8.5 - 7.3 = +1.20 m > 0 (корабът е устойчив).'
    ],
    commissionQuestions: [
      {
        q: 'Какво се случва със самолетното крило при превишаване на критичния ъгъл на атака (α > 16°–18°)?',
        a: 'Настъпва откъсване на граничния въздушен поток от горната повърхност на крилото, рязък спад на подемната сила и срив (Stall).'
      },
      {
        q: 'Кой кораб е длъжен да отстъпи път при пресичащи се курсове в открито море според МППСМ (COLREGs)?',
        a: 'Корабът, който вижда другия откъм своя десен борд (вижда зелената му бордова светлина нощем), е длъжен да отстъпи път.'
      }
    ],
    linkedLessonId: 'voc-aviation-aerodynamics-maritime-navigation-11-12'
  },
  {
    id: 'defense-food-polygraphy-forestry-textile',
    sectorBadge: '10. ПГХВТ / Полиграфия, Горско стопанство, Дървообработване & Текстил',
    title: 'Технологичен контрол на ферментация и пастьоризация, определяне на влажност на дървесина и таксация на гората',
    professionCode: 'Техник-технолог в ХВП / Полиграфист / Лесовъд / Моделиер-технолог (5410101 / 6230101 — III СПК)',
    inputParameters: 'Дървесна проба с начална маса m_вл = 260 g и абсолютно суха маса m₀ = 200 g; средновисоко стъбло d₁.₃ = 40 cm, h = 25 m, f = 0.48.',
    calculationSteps: [
      'Абсолютна влажност на дървесината: W = ((260 - 200) / 200) × 100% = (60 / 200) × 100% = 30% (точка на насищане на влакната).',
      'Обем на стоящо дърво: V = g₁.₃ · h · f = (π · 0.40² / 4) · 25 · 0.48 = 0.12566 · 12 ≈ 1.51 m³.',
      'Провеждане на HTST пастьоризация на мляко (72–76 °C за 15–20 s) и млечнокисела закваска (Lactobacillus bulgaricus + Streptococcus thermophilus).'
    ],
    commissionQuestions: [
      {
        q: 'Под каква влажност W започва съсъхването (промяната на линейните размери) на дървесината?',
        a: 'Само когато влажността падне под точката на насищане на клетъчните стени (W < 30%), когато започва да се отделя свързаната (хигроскопична) влага.'
      },
      {
        q: 'Какво изразява линейната плътност на преждата в единицата Tex [текс]?',
        a: 'Масата в грамове на 1000 метра (1 километър) текстилна нишка: T [tex] = m [g] / L [km].'
      }
    ],
    linkedLessonId: 'voc-food-tech-polygraphy-forestry-textile-8-12'
  },
  {
    id: 'defense-sports-performing-arts',
    sectorBadge: '11. Спортни училища / Музикални, Танцови & Сценични училища',
    title: 'Спортно-периодизационен план с биомеханичен и пулсов контрол (Карвонен) и акустично-хармоничен разчет на сцена',
    professionCode: 'Треньор / Помощник-инструктор по спорт / Музикант-инструменталист и Актьор (8130101 / 2150101 — III СПК)',
    inputParameters: 'Спортист на 20 г. (HR_max = 200 уд./мин), пулс в покой HR_rest = 60 уд./мин, интензивност I = 80%; зала с V = 4000 m³ и A = 400 m² Sabine.',
    calculationSteps: [
      'Целева пулсова зона по Карвонен: HR_target = ((200 - 60) × 0.80) + 60 = 112 + 60 = 172 уд./мин (аеробно-анаеробен праг).',
      'Време на реверберация на залата по Сабин: RT₆₀ = 0.161 · V / A = 0.161 · 4000 / 400 = 1.61 s (оптимално за симфоничен оркестър).',
      'Темперирано настройване по стандарта A4 = 440 Hz: f(n) = 440 · 2^(n/12) и неравноделни български тактове (7/8, 9/8, 11/8).'
    ],
    commissionQuestions: [
      {
        q: 'Коя енергийна система доминира в мускулните влакна през първите 6 до 8 секунди на максимален спринт на 60 метра?',
        a: 'Анаеробната алактатна (креатинфосфатна) система (АТФ + КрФ), която осигурява максимална мощност без натрупване на лактат.'
      },
      {
        q: 'Каква е разликата между 7/8 ръченица и 7/8 македонско хоро в българската метроритмика?',
        a: 'При ръченицата удълженият тривременен дял е на третото време (2+2+3), докато при македонското хоро е на първото време (3+2+2).'
      }
    ],
    linkedLessonId: 'voc-performing-arts-music-theater-sports-biomechanics-11-12'
  },
  {
    id: 'defense-classical-oriental-languages',
    sectorBadge: '12. НГДЕК / Класически, Руски, Италиански & Източни езици',
    title: 'Филологически коментар на старогръцки/латински епиграфски текст (Ablativus absolutus / AcI) и морфология на източните езици',
    professionCode: 'Профил „Класически и чужди езици“ (Латински, Старогръцки, Руски, Италиански, Арабски, Китайски, Японски)',
    inputParameters: 'Латински синтаксис (Accusativus cum infinitivo, Ablativus absolutus, Consecutio temporum); Арабски трибуквен корен k-t-b (ك-ت-ب).',
    calculationSteps: [
      'Синтактично разчленяване на латински период и превод на обособената конструкция Ablativus absolutus с подчинено обстоятелствено изречение.',
      'Образуване на производни форми от арабския корен k-t-b по моделите (ʾawzān): kataba, kitāb, maktaba, kātib.',
      'Фонетично транскрибиране на мандарин (Pinyin с 4-те тона) и разграничаване на Hiragana, Katakana и Kanji в японския език.'
    ],
    commissionQuestions: [
      {
        q: 'Как се превежда на български латинската конструкция Accusativus cum infinitivo (AcI)?',
        a: 'Превежда се с подчинено допълнително изречение със съюза „че“, като акузативът става подлог в именителен падеж, а инфинитивът — лично сказуемо.'
      },
      {
        q: 'Каква функция изпълняват азбуките Хирагана и Катакана спрямо йероглифите Канджи в японската писменост?',
        a: 'Канджи изразяват корените на думите, Хирагана изписва граматическите окончания и частици, а Катакана — чуждите заемки и научно-техническите термини.'
      }
    ],
    linkedLessonId: 'lang-classical-latin-greek-russian-italian-oriental-11-12'
  },
  {
    id: 'defense-mining-metallurgy-nuclear',
    sectorBadge: '13. Минно дело, Металургия, Инженерна геология & Ядрена техника',
    title: 'Металургичен баланс на доменна/конверторна плавка (Fe-Fe₃C), флотационно обогатяване на медна руда и геомеханичен разчет',
    professionCode: 'Минен техник / Металург / Геолог-проучвател (5240401 / 5440101 — III СПК)',
    inputParameters: 'Медна руда M_feed = 1000 t със съдържание α = 0.5% Cu; концентрат M_conc = 18 t със съдържание β = 25% Cu; закаляване на стомана C = 0.8%.',
    calculationSteps: [
      'Изчисляване на технологичното извличане на метала при флотация: ε = (M_conc · β) / (M_feed · α) × 100% = (18 · 25) / (1000 · 0.5) × 100% = (450 / 500) × 100% = 90.0%.',
      'Определяне на евтектоидния перлитен преход при 727 °C (0.77% C) по диаграмата Желязо–Цементит (Fe–Fe₃C).',
      'Проверка на устойчивостта на борда на открития рудник по критерия на Кулон–Мор: τ_f = c + (σ - u)·tg φ.'
    ],
    commissionQuestions: [
      {
        q: 'Защо след закаляване на конструкционна стомана във вода/масло (получаване на мартензит) винаги се провежда отвръщане (Темпериране)?',
        a: 'Защото закаленият мартензит има много висока твърдост, но е крехък и съдържа вътрешни напрежения; отвръщането възстановява ударната жилавост.'
      },
      {
        q: 'По какво се различават структурно чугунът и стоманата в диаграмата Fe-Fe₃C?',
        a: 'Стоманите съдържат до 2.14% въглерод и са ковки и пластични, докато чугуните съдържат от 2.14% до 6.67% въглерод и притежават отлични леярски качества.'
      }
    ],
    linkedLessonId: 'voc-mining-metallurgy-chemical-geology-engineering-11-12'
  },
  {
    id: 'defense-security-criminalistics-law',
    sectorBadge: '14. Сигурност, Криминалистика, Вътрешен ред, Право & ПАБ',
    title: 'Криминалистична експертиза на веществени доказателства (STR ДНК / AFIS), квалификация по НК и план за пожарна безопасност',
    professionCode: 'Техник по сигурността / Пожарна и аварийна безопасност / Съдебен секретар (8610101 / 8610201 — III СПК)',
    inputParameters: 'Оглед на местопроизшествие по НПК (Верига за съхранение на доказателствата); пожарогасене на класове A, B, C, F и електроуредби под напрежение.',
    calculationSteps: [
      'Проверка на кумулативните елементи на престъплението по чл. 9, ал. 1 от НК: Деяние + Обществена опасност + Противоправност + Вина.',
      'Дактилоскопна идентификация по 12 папиларни признака (минути) в AFIS и STR ДНК профилиране по 16–24 локуса.',
      'Изчисляване на безопасното време за евакуация (t_евак < 0.8 · t_крит) и избор на CO₂ и прахови пожарогасители.'
    ],
    commissionQuestions: [
      {
        q: 'Защо нарушаването на „веригата за съхранение на доказателствата“ (Chain of Custody) прави вещественото доказателство негодно в съда?',
        a: 'Защото според НПК всяко съмнение относно автентичността, подмяната или замърсяването на пробата дисквалифицира нейната доказателствена стойност.'
      },
      {
        q: 'Защо пожари от Клас F (горещи кулинарни мазнини) и електроуреди под напрежение никога не се гасят с вода?',
        a: 'При мазнините водата се изпарява мигновено и предизвиква взривно разпръскване на пламъка, а при електроуредите провежда електрическия ток.'
      }
    ],
    linkedLessonId: 'voc-security-criminalistics-fire-safety-law-11-12'
  },
  {
    id: 'defense-applied-arts-cinema-ceramics',
    sectorBadge: '15. Приложни изкуства, Дърворезба, Каменоделство, Керамика & Кино',
    title: 'Художествено-реставрационен проект за иконопис/дърворезба и студийна цифрова кино- и аудиопродукция (48 kHz / 24 fps)',
    professionCode: 'Художник-приложник / Реставратор / Кино- и видеотехник (2110101 / 2130201 — III СПК)',
    inputParameters: 'Яйчно-темперна икона върху липова дъска с левкас; Кинозаснемане при 24 fps (180° обтуратор -> 1/48 s), 5600 K и 24-bit PCM аудио.',
    calculationSteps: [
      'Технологична последователност на иконописната основа: Клиновка -> Паволока -> Грунд левкас -> Полиментно позлатяване с 23.75 карата злато.',
      'Синхронизация на експозицията в киното: Скорост на затвора t = 1 / (2 · 24) = 1/48 s (≈ 1/50 s) и 3-точково осветление (Key, Fill, Backlight).',
      'Аудио мастеринг: Динамичен обхват DR = 6.02 · 24 ≈ 144.5 dB при честота на дискретизация f_s = 48 kHz (Nyquist f_max = 24 kHz).'
    ],
    commissionQuestions: [
      {
        q: 'Какъв е фундаменталният етичен принцип на съвременната консервация и реставрация според Венецианската харта (1964)?',
        a: 'Принципът на обратимост на материалите и минимална намеса — всяка добавка трябва да може да бъде отстранена в бъдеще без увреждане на оригинала.'
      },
      {
        q: 'Каква е разликата между бисквитно и глазурно изпичане в художествената керамика и порцелана?',
        a: 'Бисквитното изпичане (900–1000 °C) уякчава черепа, но го оставя порьозен за поемане на глазурата, докато глазурното изпичане (1200–1400 °C) го остъклява и водоуплътнява.'
      }
    ],
    linkedLessonId: 'voc-cinema-audio-video-woodcarving-iconography-8-12'
  },
  {
    id: 'defense-pedagogy-social-work-spa',
    sectorBadge: '16. Педагогика, Социални дейности, Балнеология, СПА & Козметика',
    title: 'Индивидуален план за приобщаващо образование и социална подкрепа / Балнео-СПА и дермато-козметичен протокол',
    professionCode: 'Сътрудник социални дейности / Изпълнител на термални процедури / Козметик (7620101 / 8150201 — III СПК)',
    inputParameters: 'Ученик със СОП (Индивидуален учебен план по ЗПУО); Минерална вода с T = 39 °C, M = 4.2 g/L, радон 180 Bq/L; Кожа с pH = 5.0.',
    calculationSteps: [
      'Разработване на обучителен модул по таксономията на Блум и скафолдинг в „Зоната на близкото развитие“ (Л. Виготски).',
      'Класифициране на минералната вода като хипертермална (> 37 °C) и слабоминерализирана (2–5 g/L) и дозиране на 12-дневна балнеопрограма.',
      'Дерматологичен протокол за запазване на хидролипидната мантия (pH 4.5–5.5) и широкоспектърна фотозащита (UVA + UVB SPF 50+).'
    ],
    commissionQuestions: [
      {
        q: 'Какво означава понятието „Зона на близкото развитие“ (ЗБР) на Лев Виготски в педагогическата практика?',
        a: 'Разстоянието между това, което детето може да реши напълно само, и това, което успява да постигне с насочваща подкрепа (scaffolding) от учителя.'
      },
      {
        q: 'При какви състояния са абсолютно противопоказани хипертермалните минерални бани и пелоидотерапията (калолечението)?',
        a: 'При остри възпалителни и инфекциозни процеси, декомпенсирана сърдечно-съдова недостатъчност, злокачествени новообразувания и активни кръвоизливи.'
      }
    ],
    linkedLessonId: 'voc-pedagogy-social-work-balneology-spa-cosmetology-11-12'
  }
];

export const SchoolsSpecialtiesHub: React.FC<SchoolsSpecialtiesHubProps> = ({
  allLessons,
  onSelectLesson,
  initialSchoolId
}) => {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(
    initialSchoolId || SCHOOL_SPECIALTIES_SECTIONS[0].id
  );
  const [activeGradeFilter, setActiveGradeFilter] = useState<string>('Всички (8.–12. клас)');
  const [activeSectionFilter, setActiveSectionFilter] = useState<string>('Всички раздели');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  // Интерактивен калкулатор за Диплома & ДИППК (Трета СПК)
  const [calcSchoolMode, setCalcSchoolMode] = useState<'vocational' | 'profiled'>('vocational');
  const [oopAverage, setOopAverage] = useState<number>(5.65);
  const [specAverage, setSpecAverage] = useState<number>(5.80);
  const [dziBelGrade, setDziBelGrade] = useState<number>(5.50);
  const [secondExamTheoryGrade, setSecondExamTheoryGrade] = useState<number>(5.75);
  const [dippkPracticeGrade, setDippkPracticeGrade] = useState<number>(6.00);
  const [selectedDefenseId, setSelectedDefenseId] = useState<string>(DIPLOMA_DEFENSE_ASSIGNMENTS[0].id);

  const selectedSchool: SchoolCategorySection = useMemo(() => {
    return (
      SCHOOL_SPECIALTIES_SECTIONS.find((s) => s.id === selectedSchoolId) ||
      SCHOOL_SPECIALTIES_SECTIONS[0]
    );
  }, [selectedSchoolId]);

  const lessonByIdMap = useMemo(() => {
    const map = new Map<string, LessonData>();
    for (const lesson of allLessons) {
      map.set(lesson.id, lesson);
    }
    return map;
  }, [allLessons]);

  const handleOpenLessonById = (lessonId: string) => {
    const found = lessonByIdMap.get(lessonId);
    if (found) {
      onSelectLesson(found);
    } else if (allLessons.length > 0) {
      onSelectLesson(allLessons[0]);
    }
  };

  const filteredGradeMatrix = useMemo(() => {
    return GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX.filter((g) => {
      if (activeGradeFilter === 'Всички (8.–12. клас)') return true;
      return g.grade === activeGradeFilter;
    }).map((gradeBlock) => {
      const filteredSubjects = gradeBlock.subjects.filter((subj) => {
        const matchesSection =
          activeSectionFilter === 'Всички раздели' ||
          subj.category.includes(activeSectionFilter);
        const q = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !q ||
          subj.subjectName.toLowerCase().includes(q) ||
          subj.keyTopics.toLowerCase().includes(q) ||
          subj.schoolTypes.toLowerCase().includes(q);
        return matchesSection && matchesQuery;
      });
      return {
        ...gradeBlock,
        subjects: filteredSubjects
      };
    }).filter((g) => g.subjects.length > 0);
  }, [activeGradeFilter, activeSectionFilter, searchQuery]);

  const linkedLessonsForSelectedSchool = useMemo(() => {
    return selectedSchool.linkedLessonIds
      .map((id) => lessonByIdMap.get(id))
      .filter((l): l is LessonData => Boolean(l));
  }, [selectedSchool, lessonByIdMap]);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Главна заглавна секция */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/90 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
              <Building2 className="w-4 h-4" />
              Национален академичен и професионален справочник • 8. – 12. клас
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Специални секции по училища, специалности и класове (8.–12. клас)
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Пълно покритие на учебните програми за <strong>всеки един предмет от 8., 9., 10., 11. и 12. клас</strong> във всички видове гимназии и техникуми в България — <strong>Общообразователна подготовка (Раздел А)</strong>, <strong>Профилирана подготовка за ДЗИ (Раздел Б)</strong> и <strong>Специална професионална подготовка за ДИППК / Трета СПК (Раздел В)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-3.5 text-center">
              <div className="text-2xl font-black text-indigo-400">16</div>
              <div className="text-[11px] text-slate-300 font-medium">Вида гимназии & техникуми</div>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-3.5 text-center">
              <div className="text-2xl font-black text-emerald-400">64+</div>
              <div className="text-[11px] text-slate-300 font-medium">Профила и специалности (СПК)</div>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-3.5 text-center">
              <div className="text-2xl font-black text-amber-400">8.–12.</div>
              <div className="text-[11px] text-slate-300 font-medium">Всички класове по години</div>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-700/70 p-3.5 text-center">
              <div className="text-2xl font-black text-rose-400">{allLessons.length}</div>
              <div className="text-[11px] text-slate-300 font-medium">Пълни уроци и тестове</div>
            </div>
          </div>
        </div>
      </div>

      {/* СЕКЦИЯ 1: Избор на вид училище и специалност (16 специални секции) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <GraduationCap className="w-6 h-6 text-indigo-400" />
              1. Изберете специална секция по вид гимназия и професионално направление (16 направления)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Разгледайте официалните специалности, предметите от 8. до 12. клас, формулите и решавайте изпитни въпроси за ДЗИ и ДИППК.
            </p>
          </div>
        </div>

        {/* 16 Карти за избор на училище */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SCHOOL_SPECIALTIES_SECTIONS.map((school) => {
            const isSelected = school.id === selectedSchool.id;
            return (
              <button
                key={school.id}
                onClick={() => setSelectedSchoolId(school.id)}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-400 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-400/50'
                    : 'bg-slate-900/75 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-700/70">
                      {SECTION_ICON_MAP[school.id]}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {school.badgeText}
                    </span>
                  </div>
                  <div className="font-bold text-white text-sm sm:text-base leading-snug">
                    {school.shortName}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {school.subtitle}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-indigo-300 font-medium">
                    {school.specialties.length} специалности
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-300 font-semibold">
                    Отвори <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Детайлен панел за избраната специална секция */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-8 shadow-xl">
          {/* Заглавие и примерни училища */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                {SECTION_ICON_MAP[selectedSchool.id]}
                <span>Специална секция • {selectedSchool.badgeText}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedSchool.title}
              </h3>
              <p className="text-sm text-slate-300">
                {selectedSchool.subtitle}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                <Award className="w-4 h-4 shrink-0" />
                <span><strong>Изпитен формат за дипломиране:</strong> {selectedSchool.examFormat}</span>
              </div>
            </div>

            <div className="lg:w-80 shrink-0 rounded-2xl bg-slate-950/70 border border-slate-800/90 p-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Водещи гимназии в България:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedSchool.exampleSchools.map((ex, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Подсекция А: Специалности и Профили с кодове по МОН */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              Специалности, профили и специални предмети ({selectedSchool.shortName})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSchool.specialties.map((spec) => {
                const targetLesson = lessonByIdMap.get(spec.linkedLessonId);
                return (
                  <div
                    key={spec.code}
                    className="rounded-2xl bg-slate-950/70 border border-slate-800 p-5 flex flex-col justify-between gap-4 hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
                          Код МОН: {spec.code}
                        </span>
                        <span className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                          {spec.qualification}
                        </span>
                      </div>
                      <h5 className="text-base font-bold text-white">
                        {spec.name}
                      </h5>
                      <div className="space-y-1.5">
                        <div className="text-xs font-semibold text-slate-400">
                          Ключови специални и профилиращи предмети:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {spec.coreSubjects.map((subj, i) => (
                            <span
                              key={i}
                              className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200"
                            >
                              {subj}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-400 truncate">
                        Урок: <strong className="text-slate-200">{targetLesson?.title || 'Специализиран модул'}</strong>
                      </span>
                      <button
                        onClick={() => handleOpenLessonById(spec.linkedLessonId)}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Към урока
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Подсекция Б: Пълна учебна прогресия по класове (8. -> 9. -> 10. -> 11. -> 12. клас) */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              Учебен план по класове от 8. до 12. клас за {selectedSchool.shortName}
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              {selectedSchool.gradeProgression.map((gp) => (
                <div
                  key={gp.grade}
                  className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-extrabold text-sm">
                        {gp.grade}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white leading-snug">
                      {gp.focusTitle}
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Общообразователни (ООП):
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {gp.generalSubjects.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-slate-500">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                        Специални / Профилирани:
                      </div>
                      <ul className="space-y-1 text-xs text-emerald-200/90">
                        {gp.specializedSubjects.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">+</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800 text-[11px] text-amber-300/90">
                    <strong>Етап / Изпит:</strong> {gp.examMilestone}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Подсекция В: Ключови формули, закони и синтез за специалността + Директни уроци */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Златни формули, закони и правила за специалността
              </h4>
              <div className="space-y-2.5">
                {selectedSchool.keySynthesisRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 space-y-1.5"
                  >
                    <div className="text-xs font-bold text-indigo-300">
                      {rule.title}
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-slate-900 border border-indigo-500/30 font-mono text-xs sm:text-sm text-white font-semibold">
                      {rule.formulaOrRule}
                    </div>
                    <p className="text-xs text-slate-400">
                      {rule.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Интерактивен мини-тренажор за избраната специалност */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Интерактивен изпитен тренажор ({selectedSchool.shortName})
              </h4>
              <div className="space-y-4">
                {selectedSchool.specialtyQuiz.map((q) => {
                  const chosen = quizAnswers[q.id];
                  const isAnswered = chosen !== undefined;
                  const isCorrect = chosen === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {q.specialtyTag}
                        </span>
                        {isAnswered && (
                          <span
                            className={`text-xs font-bold inline-flex items-center gap-1 ${
                              isCorrect ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" /> Вярно!
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" /> Грешен отговор
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, optIdx) => {
                          let btnStyle =
                            'bg-slate-900 border-slate-800 text-slate-200 hover:border-indigo-500/50';
                          if (isAnswered) {
                            if (optIdx === q.correctAnswer) {
                              btnStyle =
                                'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-semibold';
                            } else if (optIdx === chosen) {
                              btnStyle =
                                'bg-rose-500/20 border-rose-500/60 text-rose-200';
                            } else {
                              btnStyle = 'bg-slate-900/50 border-slate-800/60 text-slate-500';
                            }
                          }
                          return (
                            <button
                              key={optIdx}
                              onClick={() =>
                                setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                              }
                              className={`text-left px-3.5 py-2 rounded-xl border text-xs transition-all ${btnStyle}`}
                            >
                              <span className="font-bold mr-2">
                                {['А)', 'Б)', 'В)', 'Г)'][optIdx]}
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 leading-relaxed">
                          <strong className="text-indigo-300">Обяснение: </strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Свързани пълни уроци за тази гимназия/специалност */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-sm font-bold text-white">
              Пълни интерактивни уроци, конспекти и тестове за {selectedSchool.shortName}:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {linkedLessonsForSelectedSchool.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className="text-left p-3.5 rounded-2xl bg-slate-950 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-indigo-400 truncate">
                      {lesson.subject} • {lesson.grade}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-indigo-200">
                      {lesson.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-300 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* СЕКЦИЯ 2: Пълна матрица на ВСИЧКИ предмети по класове (8., 9., 10., 11. и 12. клас) */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              2. Пълна матрица по класове: Всеки предмет от 8., 9., 10., 11. и 12. клас
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Раздел А (Задължителни общообразователни предмети ООП) + Раздел Б (Профилирани модули за матура ДЗИ) + Раздел В (Специални професионални предмети за ДИППК).
            </p>
          </div>

          {/* Търсачка */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търси предмет, специалност, тема..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Филтри по Клас и по Раздел (А / Б / В) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {[
              'Всички (8.–12. клас)',
              '8. клас',
              '9. клас',
              '10. клас',
              '11. клас',
              '12. клас'
            ].map((gradeTab) => (
              <button
                key={gradeTab}
                onClick={() => setActiveGradeFilter(gradeTab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeGradeFilter === gradeTab
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/60'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {gradeTab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            {[
              'Всички раздели',
              'Раздел А',
              'Раздел Б',
              'Раздел В'
            ].map((secTab) => (
              <button
                key={secTab}
                onClick={() => setActiveSectionFilter(secTab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSectionFilter === secTab
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {secTab === 'Раздел А'
                  ? 'Раздел А (ООП)'
                  : secTab === 'Раздел Б'
                  ? 'Раздел Б (Профили)'
                  : secTab === 'Раздел В'
                  ? 'Раздел В (Специалности ДИППК)'
                  : secTab}
              </button>
            ))}
          </div>
        </div>

        {/* Списък на класовете и предметите */}
        <div className="space-y-6">
          {filteredGradeMatrix.map((gradeBlock) => (
            <div
              key={gradeBlock.grade}
              className="rounded-2xl bg-slate-950/80 border border-slate-800/90 overflow-hidden"
            >
              <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-lg bg-indigo-500 text-white font-black text-xs sm:text-sm">
                      {gradeBlock.grade}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      {gradeBlock.headline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {gradeBlock.stageName} • <strong className="text-amber-300">{gradeBlock.nationalExamInfo}</strong>
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-800/70">
                {gradeBlock.subjects.map((subj, idx) => {
                  const isSectionC = subj.category.includes('Раздел В');
                  const isSectionB = subj.category.includes('Раздел Б');
                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 hover:bg-slate-900/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-2 max-w-4xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isSectionC
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : isSectionB
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                            }`}
                          >
                            {subj.category}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            🏫 {subj.schoolTypes}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                            ⏱ {subj.weeklyHoursNote}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {subj.subjectName}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong className="text-slate-400">Изучавани теми и модули: </strong>
                          {subj.keyTopics}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          onClick={() => handleOpenLessonById(subj.linkedLessonId)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm"
                        >
                          <BookOpen className="w-4 h-4" />
                          Отвори учебния модул
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* СЕКЦИЯ 3: Интерактивен калкулатор за Диплома за средно образование (8.–12. клас) и ДИППК (Трета СПК) */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
              <Calculator className="w-6 h-6 text-amber-400" />
              3. Калкулатор за Диплома (8.–12. клас) & ДИППК (Трета степен на професионална квалификация)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Изчислете своя общ дипломен успех от гимназията (Раздел А + Раздел Б/В + ДЗИ) и оценката в Свидетелството за професионална квалификация (СПК).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start">
            <button
              onClick={() => setCalcSchoolMode('vocational')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                calcSchoolMode === 'vocational'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Професионална гимназия (ДИППК / Трета СПК)
            </button>
            <button
              onClick={() => setCalcSchoolMode('profiled')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                calcSchoolMode === 'profiled'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Профилирана гимназия (2 матури ДЗИ)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Плъзгачи за оценките */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-slate-200">
                  1. Среден успех от Раздел А — Задължителни предмети ООП (8.–12. клас)
                </span>
                <span className="font-mono font-black text-indigo-400 text-base">
                  {oopAverage.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={3.0}
                max={6.0}
                step={0.05}
                value={oopAverage}
                onChange={(e) => setOopAverage(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="text-[11px] text-slate-400">
                Включва годишните оценки от 8. до 12. клас по БЕЛ, Математика, Чужди езици, История, География, Биология, Хизика, Физика, Философия и Гражданско образование.
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-slate-200">
                  2. Среден успех от {calcSchoolMode === 'vocational' ? 'Раздел Б/В — Специални професионални предмети' : 'Раздел Б — Профилиращи модули (11.–12. клас)'}
                </span>
                <span className="font-mono font-black text-emerald-400 text-base">
                  {specAverage.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={3.0}
                max={6.0}
                step={0.05}
                value={specAverage}
                onChange={(e) => setSpecAverage(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="text-[11px] text-slate-400">
                {calcSchoolMode === 'vocational'
                  ? 'Среден успех от общата, отрасловата и специфичната професионална подготовка (учебна и производствена практика) от 8. до 12. клас.'
                  : 'Среден успех от задължителните профилиращи модули в 11. и 12. клас.'}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-slate-200">
                  3. Първа задължителна матура — ДЗИ по Български език и литература (12. клас)
                </span>
                <span className="font-mono font-black text-amber-400 text-base">
                  {dziBelGrade.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={3.0}
                max={6.0}
                step={0.05}
                value={dziBelGrade}
                onChange={(e) => setDziBelGrade(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-slate-200">
                  {calcSchoolMode === 'vocational'
                    ? '4А. ДИППК — Част по ТЕОРИЯ на професията (Писмен тест / Дипломна тема)'
                    : '4. Втора задължителна матура — 2-ро ДЗИ по профилиращ предмет'}
                </span>
                <span className="font-mono font-black text-cyan-400 text-base">
                  {secondExamTheoryGrade.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={3.0}
                max={6.0}
                step={0.05}
                value={secondExamTheoryGrade}
                onChange={(e) => setSecondExamTheoryGrade(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {calcSchoolMode === 'vocational' && (
              <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-200">
                    4Б. ДИППК — Част по ПРАКТИКА на професията (Дипломен проект / Практическо задание)
                  </span>
                  <span className="font-mono font-black text-rose-400 text-base">
                    {dippkPracticeGrade.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={3.0}
                  max={6.0}
                  step={0.05}
                  value={dippkPracticeGrade}
                  onChange={(e) => setDippkPracticeGrade(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Табло с изчислени резултати */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 border border-indigo-500/40 p-6 space-y-5">
            {(() => {
              const dippkCombined =
                calcSchoolMode === 'vocational'
                  ? (secondExamTheoryGrade + dippkPracticeGrade) / 2
                  : secondExamTheoryGrade;
              const examsAverage = (dziBelGrade + dippkCombined) / 2;
              const finalDiplomaGrade = (oopAverage * 0.5) + (specAverage * 0.25) + (examsAverage * 0.25);
              // За Свидетелство за Трета СПК: средноаритметично от успеха по специалните предмети и оценките от ДИППК (Теория и Практика)
              const spkCertificateGrade = (specAverage + secondExamTheoryGrade + dippkPracticeGrade) / 3;

              return (
                <>
                  <div className="space-y-1 border-b border-slate-800 pb-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                      Официална симулация на дипломиране (12. клас)
                    </div>
                    <div className="text-sm text-slate-300">
                      {calcSchoolMode === 'vocational'
                        ? 'Диплома за средно образование + Свидетелство за Трета СПК (Европас)'
                        : 'Диплома за средно образование (Профилирана подготовка)'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/40">
                      <div className="text-[11px] font-bold uppercase text-indigo-300">
                        Общ успех — Диплома
                      </div>
                      <div className="text-3xl font-black text-white mt-1">
                        {finalDiplomaGrade.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                        {finalDiplomaGrade >= 5.5
                          ? 'Отличен (Почетна диплома)'
                          : finalDiplomaGrade >= 4.5
                          ? 'Много добър'
                          : 'Добър'}
                      </div>
                    </div>

                    {calcSchoolMode === 'vocational' ? (
                      <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40">
                        <div className="text-[11px] font-bold uppercase text-amber-300">
                          Трета СПК (ДИППК)
                        </div>
                        <div className="text-3xl font-black text-amber-400 mt-1">
                          {spkCertificateGrade.toFixed(2)}
                        </div>
                        <div className="text-[11px] text-slate-300 mt-1">
                          Европейско ниво EQF 4
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40">
                        <div className="text-[11px] font-bold uppercase text-emerald-300">
                          Средно от 2-те матури ДЗИ
                        </div>
                        <div className="text-3xl font-black text-emerald-400 mt-1">
                          {examsAverage.toFixed(2)}
                        </div>
                        <div className="text-[11px] text-slate-300 mt-1">
                          Конкурсен бал за ВУЗ
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4 space-y-2 text-xs text-slate-300">
                    <div className="font-bold text-white">Разбивка по компоненти:</div>
                    <div className="flex justify-between">
                      <span>• Раздел А (ООП 8.–12. клас):</span>
                      <strong className="text-indigo-300">{oopAverage.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>• Раздел Б/В (Профил / Специалност):</span>
                      <strong className="text-emerald-300">{specAverage.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>• 1-ви ДЗИ (БЕЛ):</span>
                      <strong className="text-amber-300">{dziBelGrade.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        • {calcSchoolMode === 'vocational' ? '2-ри ДЗИ (ДИППК Теория + Практика):' : '2-ри ДЗИ (Профилиращ предмет):'}
                      </span>
                      <strong className="text-cyan-300">{dippkCombined.toFixed(2)}</strong>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* СЕКЦИЯ 4: Интерактивен Тренажор за Защита на Дипломен проект пред Държавна изпитна комисия (ДИППК — Трета СПК) */}
      <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Симулатор на Държавна изпитна комисия • 12. клас (Трета СПК)
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              4. Тренажор за Защита на Дипломен проект (ДИППК — Практика & Теория)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
              Изберете направление и разгледайте реално структурирано <strong>Дипломно задание за 12. клас</strong> с изходни параметри, изчислителни стъпки и реални въпроси на Държавната квалификационна комисия с образцови отговори за <strong>Отличен (6.00)</strong>.
            </p>
          </div>
        </div>

        {/* Табове за избор на Дипломно задание */}
        <div className="flex flex-wrap gap-2">
          {DIPLOMA_DEFENSE_ASSIGNMENTS.map((item) => {
            const active = item.id === selectedDefenseId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedDefenseId(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  active
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {item.sectorBadge}
              </button>
            );
          })}
        </div>

        {(() => {
          const activeDefense =
            DIPLOMA_DEFENSE_ASSIGNMENTS.find((d) => d.id === selectedDefenseId) ||
            DIPLOMA_DEFENSE_ASSIGNMENTS[0];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Ляв панел: Задание, Изходни данни и Етапи */}
              <div className="lg:col-span-7 rounded-2xl bg-slate-950/90 border border-slate-800 p-5 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    {activeDefense.professionCode}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    Тема: {activeDefense.title}
                  </h3>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Изходни данни по задание:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-mono">
                    {activeDefense.inputParameters}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Задължителни изчислителни и технологични етапи в обяснителната записка:
                  </div>
                  <div className="space-y-2">
                    {activeDefense.calculationSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
                      >
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs shrink-0">
                          Етап {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleOpenLessonById(activeDefense.linkedLessonId)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    Отвори пълния теоретичен урок за тази защита
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Десен панел: Въпроси на Държавната изпитна комисия */}
              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 border border-emerald-500/30 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Блиц въпроси на Държавната комисия при защита
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                    Критерий: Отличен 6.00
                  </span>
                </div>

                <div className="space-y-3">
                  {activeDefense.commissionQuestions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2"
                    >
                      <div className="text-xs sm:text-sm font-bold text-amber-300">
                        Въпрос {idx + 1}: {item.q}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed pl-3 border-l-2 border-emerald-500/60">
                        <strong className="text-emerald-400">Еталонен отговор: </strong>
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
