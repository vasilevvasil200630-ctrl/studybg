import React, { useState, useMemo } from 'react';
import {
  Dna,
  FlaskConical,
  Zap,
  GraduationCap,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Printer,
  ArrowRight,
  Info,
  AlertTriangle
} from 'lucide-react';

interface ScienceDziLabProps {
  onOpenFormulaModal?: () => void;
}

type ScienceLabTab = 'biology' | 'chemistry' | 'physics' | 'quiz';

// Genetic Code Table (mRNA Codon -> Amino Acid in BG)
const CODON_TABLE: Record<string, { name: string; short: string; type: 'start' | 'stop' | 'polar' | 'nonpolar' | 'charged' }> = {
  AUG: { name: 'Метионин (СТАРТ)', short: 'Мет', type: 'start' },
  UUU: { name: 'Фенилаланин', short: 'Фен', type: 'nonpolar' },
  UUC: { name: 'Фенилаланин', short: 'Фен', type: 'nonpolar' },
  UUA: { name: 'Левцин', short: 'Лев', type: 'nonpolar' },
  UUG: { name: 'Левцин', short: 'Лев', type: 'nonpolar' },
  CUU: { name: 'Левцин', short: 'Лев', type: 'nonpolar' },
  CUC: { name: 'Левцин', short: 'Лев', type: 'nonpolar' },
  CUA: { name: 'Левцин', short: 'Лев', type: 'nonpolar' },
  CUG: { name: 'Левцин', short: 'Лев', type: 'nonpolar' },
  AUU: { name: 'Изолевцин', short: 'Иле', type: 'nonpolar' },
  AUC: { name: 'Изолевцин', short: 'Иле', type: 'nonpolar' },
  AUA: { name: 'Изолевцин', short: 'Иле', type: 'nonpolar' },
  GUU: { name: 'Валин', short: 'Вал', type: 'nonpolar' },
  GUC: { name: 'Валин', short: 'Вал', type: 'nonpolar' },
  GUA: { name: 'Валин', short: 'Вал', type: 'nonpolar' },
  GUG: { name: 'Валин', short: 'Вал', type: 'nonpolar' },
  UCU: { name: 'Серин', short: 'Сер', type: 'polar' },
  UCC: { name: 'Серин', short: 'Сер', type: 'polar' },
  UCA: { name: 'Серин', short: 'Сер', type: 'polar' },
  UCG: { name: 'Серин', short: 'Сер', type: 'polar' },
  CCU: { name: 'Пролин', short: 'Про', type: 'nonpolar' },
  CCC: { name: 'Пролин', short: 'Про', type: 'nonpolar' },
  CCA: { name: 'Пролин', short: 'Про', type: 'nonpolar' },
  CCG: { name: 'Пролин', short: 'Про', type: 'nonpolar' },
  ACU: { name: 'Треонин', short: 'Тре', type: 'polar' },
  ACC: { name: 'Треонин', short: 'Тре', type: 'polar' },
  ACA: { name: 'Треонин', short: 'Тре', type: 'polar' },
  ACG: { name: 'Треонин', short: 'Тре', type: 'polar' },
  GCU: { name: 'Аланин', short: 'Ала', type: 'nonpolar' },
  GCC: { name: 'Аланин', short: 'Ала', type: 'nonpolar' },
  GCA: { name: 'Аланин', short: 'Ала', type: 'nonpolar' },
  GCG: { name: 'Аланин', short: 'Ала', type: 'nonpolar' },
  UAU: { name: 'Тирозин', short: 'Тир', type: 'polar' },
  UAC: { name: 'Тирозин', short: 'Тир', type: 'polar' },
  UAA: { name: 'СТОП кодон (Охра)', short: 'СТОП', type: 'stop' },
  UAG: { name: 'СТОП кодон (Амбър)', short: 'СТОП', type: 'stop' },
  UGA: { name: 'СТОП кодон (Опал)', short: 'СТОП', type: 'stop' },
  CAU: { name: 'Хистидин', short: 'Хис', type: 'charged' },
  CAC: { name: 'Хистидин', short: 'Хис', type: 'charged' },
  CAA: { name: 'Глутамин', short: 'Глн', type: 'polar' },
  CAG: { name: 'Глутамин', short: 'Глн', type: 'polar' },
  AAU: { name: 'Аспарагин', short: 'Асн', type: 'polar' },
  AAC: { name: 'Аспарагин', short: 'Асн', type: 'polar' },
  AAA: { name: 'Лизин', short: 'Лиз', type: 'charged' },
  AAG: { name: 'Лизин', short: 'Лиз', type: 'charged' },
  GAU: { name: 'Аспарагинова к-на', short: 'Асп', type: 'charged' },
  GAC: { name: 'Аспарагинова к-на', short: 'Асп', type: 'charged' },
  GAA: { name: 'Глутаминова к-на', short: 'Глу', type: 'charged' },
  GAG: { name: 'Глутаминова к-на', short: 'Глу', type: 'charged' },
  UGU: { name: 'Цистеин', short: 'Цис', type: 'polar' },
  UGC: { name: 'Цистеин', short: 'Цис', type: 'polar' },
  UGG: { name: 'Триптофан', short: 'Три', type: 'nonpolar' },
  CGU: { name: 'Аргинин', short: 'Арг', type: 'charged' },
  CGC: { name: 'Аргинин', short: 'Арг', type: 'charged' },
  CGA: { name: 'Аргинин', short: 'Арг', type: 'charged' },
  CGG: { name: 'Аргинин', short: 'Арг', type: 'charged' },
  AGU: { name: 'Серин', short: 'Сер', type: 'polar' },
  AGC: { name: 'Серин', short: 'Сер', type: 'polar' },
  AGA: { name: 'Аргинин', short: 'Арг', type: 'charged' },
  AGG: { name: 'Аргинин', short: 'Арг', type: 'charged' },
  GGU: { name: 'Глицин', short: 'Гли', type: 'nonpolar' },
  GGC: { name: 'Глицин', short: 'Гли', type: 'nonpolar' },
  GGA: { name: 'Глицин', short: 'Гли', type: 'nonpolar' },
  GGG: { name: 'Глицин', short: 'Гли', type: 'nonpolar' }
};

const DNA_PRESETS = [
  {
    label: 'Нормален хемоглобин (HbA)',
    dnaTemplate: 'TACGTGGACTGAGGACTCCTCTTCATT',
    note: '6-ият кодон в иРНК е GAG (Глутаминова киселина) — нормални еритроцити.'
  },
  {
    label: 'Сърповидно-клетъчна мутация (HbS)',
    dnaTemplate: 'TACGTGGACTGAGGACACCTCTTCATT',
    note: 'Точкова генна мутация (трансверзия T -> A в матричната ДНК): 6-ият кодон в иРНК става GUG (Валин) вместо GAG (Глутаминова к-на)!'
  },
  {
    label: 'Инсулинов фрагмент (ДЗИ задача)',
    dnaTemplate: 'TACAAACGTTACCTTGGGACT',
    note: 'Класическа задача от ДЗИ по Биология за определяне на броя пептидни връзки и молекули вода.'
  }
];

interface IonReaction {
  id: string;
  cation: string;
  anion: string;
  reagentPair: string;
  visualResult: string;
  tubeColorClass: string;
  precipitateBadge: string;
  molecularEq: string;
  netIonicEq: string;
  examTip: string;
}

const ION_REACTIONS: IonReaction[] = [
  {
    id: 'ag-cl',
    cation: 'Ag⁺ (Сребърни йони)',
    anion: 'Cl⁻ (Хлоридни йони)',
    reagentPair: 'AgNO₃ + HCl (или NaCl)',
    visualResult: 'Образува се плътна бяла сирениста утайка от сребърен хлорид (AgCl↓), неразтворима в азотна киселина, която потъмнява на светлина.',
    tubeColorClass: 'from-slate-100 via-white to-slate-200 border-slate-400',
    precipitateBadge: '⬇ Бяла сирениста утайка (AgCl↓)',
    molecularEq: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    netIonicEq: 'Ag⁺ + Cl⁻ → AgCl↓',
    examTip: 'Качествена реакция за доказване на хлоридни йони (Cl⁻) и солна киселина!'
  },
  {
    id: 'ba-so4',
    cation: 'Ba²⁺ (Бариеви йони)',
    anion: 'SO₄²⁻ (Сулфатни йони)',
    reagentPair: 'BaCl₂ + H₂SO₄ (или Na₂SO₄)',
    visualResult: 'Образува се плътна бяла кристална утайка от бариев сулфат (BaSO₄↓), която е неразтворима в киселини и основи.',
    tubeColorClass: 'from-slate-50 via-slate-100 to-slate-300 border-slate-400',
    precipitateBadge: '⬇ Бяла кристална утайка (BaSO₄↓)',
    molecularEq: 'BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl',
    netIonicEq: 'Ba²⁺ + SO₄²⁻ → BaSO₄↓',
    examTip: 'Златен стандарт на матурата за доказване на сярна киселина и сулфатни йони (SO₄²⁻)!'
  },
  {
    id: 'cu-oh',
    cation: 'Cu²⁺ (Медни йони)',
    anion: 'OH⁻ (Хидроксидни йони)',
    reagentPair: 'CuSO₄ + 2NaOH',
    visualResult: 'Образува се характерна небесносиня пихтиеста утайка от меден дихидроксид — Cu(OH)₂↓. При нагряване почернява (CuO).',
    tubeColorClass: 'from-sky-300 via-blue-400 to-blue-600 border-blue-500',
    precipitateBadge: '⬇ Небесносиня утайка Cu(OH)₂↓',
    molecularEq: 'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',
    netIonicEq: 'Cu²⁺ + 2OH⁻ → Cu(OH)₂↓',
    examTip: 'Прясно утаеният Cu(OH)₂ се използва в органичната химия за доказване на многовалентни алкохоли (глицерол, глюкоза) и пептидна връзка (биуретова реакция)!'
  },
  {
    id: 'fe3-oh',
    cation: 'Fe³⁺ (Железни III йони)',
    anion: 'OH⁻ (Хидроксидни йони)',
    reagentPair: 'FeCl₃ + 3NaOH',
    visualResult: 'Образува се червено-кафява (ръждива) утайка от железен трихидроксид — Fe(OH)₃↓.',
    tubeColorClass: 'from-amber-600 via-orange-700 to-amber-900 border-amber-700',
    precipitateBadge: '⬇ Червено-кафява утайка Fe(OH)₃↓',
    molecularEq: 'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl',
    netIonicEq: 'Fe³⁺ + 3OH⁻ → Fe(OH)₃↓',
    examTip: 'Различавай Fe²⁺ + 2OH⁻ → Fe(OH)₂↓ (мръснозелена утайка) от Fe³⁺ + 3OH⁻ → Fe(OH)₃↓ (ръждиво-кафява утайка)!'
  },
  {
    id: 'co3-h',
    cation: 'H⁺ (Водородни катиони)',
    anion: 'CO₃²⁻ (Карбонатни йони)',
    reagentPair: 'Na₂CO₃ + 2HCl',
    visualResult: 'Бурно отделяне на мехурчета безцветен газ — въглероден диоксид (CO₂↑), който размътва бистра варна вода Ca(OH)₂.',
    tubeColorClass: 'from-cyan-50 via-sky-100 to-blue-100 border-cyan-400',
    precipitateBadge: '⬆ Бурно отделяне на газ CO₂↑',
    molecularEq: 'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑',
    netIonicEq: 'CO₃²⁻ + 2H⁺ → H₂O + CO₂↑',
    examTip: 'Качествена реакция за доказване на карбонати (варовик, мрамор, сода).'
  },
  {
    id: 'nh4-oh',
    cation: 'NH₄⁺ (Амониеви йони)',
    anion: 'OH⁻ (Хидроксидни йони при нагряване)',
    reagentPair: 'NH₄Cl + NaOH (t°)',
    visualResult: 'Отделя се газ амоняк (NH₃↑) с остра задушлива миризма, който оцветява влажна червена лакмусова хартия в синьо.',
    tubeColorClass: 'from-blue-100 via-blue-200 to-blue-300 border-blue-400',
    precipitateBadge: '⬆ Газ с остра миризма NH₃↑',
    molecularEq: 'NH₄Cl + NaOH → NaCl + H₂O + NH₃↑',
    netIonicEq: 'NH₄⁺ + OH⁻ → NH₃↑ + H₂O',
    examTip: 'Качествена реакция за доказване на амониеви соли (минерални торове като амониева селитра).'
  }
];

const HYDROLYSIS_SALTS = [
  {
    formula: 'Na₂CO₃ (Натриев карбонат — калцинирана сода)',
    parents: 'Силна основа (NaOH) + Слаба киселина (H₂CO₃)',
    phRange: 'pH > 7 (Алкална / Основна среда)',
    litmus: 'Син',
    phenolphthalein: 'Малиновочервен',
    hydrolysisIon: 'Хидролизира анионът на слабата киселина: CO₃²⁻ + HOH ⇄ HCO₃⁻ + OH⁻'
  },
  {
    formula: 'NH₄Cl (Амониев хлорид — нишадър)',
    parents: 'Слаба основа (NH₄OH) + Силна киселина (HCl)',
    phRange: 'pH < 7 (Кисела среда)',
    litmus: 'Червен',
    phenolphthalein: 'Безцветен',
    hydrolysisIon: 'Хидролизира катионът на слабата основа: NH₄⁺ + HOH ⇄ NH₄OH + H⁺'
  },
  {
    formula: 'NaCl (Натриев хлорид — готварска сол)',
    parents: 'Силна основа (NaOH) + Силна киселина (HCl)',
    phRange: 'pH = 7 (Неутрална среда — НЕ хидролизира)',
    litmus: 'Виолетов (не се променя)',
    phenolphthalein: 'Безцветен',
    hydrolysisIon: 'Соли на силна основа и силна киселина НЕ претърпяват хидролиза във воден разтвор.'
  },
  {
    formula: 'FeCl₃ (Железен трихлорид)',
    parents: 'Слаба основа Fe(OH)₃ + Силна киселина (HCl)',
    phRange: 'pH < 7 (Кисела среда)',
    litmus: 'Червен',
    phenolphthalein: 'Безцветен',
    hydrolysisIon: 'Хидролизира катионът: Fe³⁺ + HOH ⇄ FeOH²⁺ + H⁺'
  },
  {
    formula: 'CH₃COONa (Натриев ацетат)',
    parents: 'Силна основа (NaOH) + Слаба киселина (CH₃COOH)',
    phRange: 'pH > 7 (Алкална / Основна среда)',
    litmus: 'Син',
    phenolphthalein: 'Малиновочервен',
    hydrolysisIon: 'Хидролизира ацетатният анион: CH₃COO⁻ + HOH ⇄ CH₃COOH + OH⁻'
  }
];

const PHOTOELECTRIC_METALS = [
  { name: 'Цезий (Cs)', workFunctionEv: 1.9, redLimitNm: 653 },
  { name: 'Калий (K)', workFunctionEv: 2.25, redLimitNm: 551 },
  { name: 'Натрий (Na)', workFunctionEv: 2.3, redLimitNm: 539 },
  { name: 'Цинк (Zn)', workFunctionEv: 4.3, redLimitNm: 288 },
  { name: 'Мед (Cu)', workFunctionEv: 4.7, redLimitNm: 264 },
  { name: 'Платина (Pt)', workFunctionEv: 5.6, redLimitNm: 221 }
];

const SCIENCE_QUIZ = [
  {
    id: 1,
    subject: 'Биология',
    question: 'Даден е фрагмент от матричната верига на ДНК: 3\'-ТАЦ-ГГГ-ЦЦА-АТТ-5\'. Каква е последователността на кодоните в синтезираната иРНК и колко аминокиселини кодира тя?',
    options: [
      '5\'-АУГ-ЦЦЦ-ГГУ-УАА-3\' — кодира 3 аминокиселини (защото УАА е СТОП кодон)',
      '5\'-АТГ-ЦЦЦ-ГГТ-ТАА-3\' — кодира 4 аминокиселини',
      '5\'-УАЦ-ГГГ-ЦЦА-АУУ-3\' — кодира 4 аминокиселини',
      '5\'-АУГ-ЦЦЦ-ГГУ-УАА-3\' — кодира 4 аминокиселини'
    ],
    correctIndex: 0,
    explanation: 'По принципа на комплементарността при транскрипция: Т→А, А→У, Ц→Г, Г→Ц. Получаваме 5\'-АУГ-ЦЦЦ-ГГУ-УАА-3\'. Последният триплет УАА е СТОП кодон и НЕ кодира аминокиселина, затова полипептидът съдържа 3 аминокиселини (Мет-Про-Гли).'
  },
  {
    id: 2,
    subject: 'Биология',
    question: 'Жена с кръвна група А (хетерозиготна, I^A i) и мъж с кръвна група В (хетерозиготен, I^B i) очакват дете. Какви кръвни групи могат да имат техните деца?',
    options: [
      'Само кръвна група АВ',
      'Само кръвни групи А и В',
      'Всички четири кръвни групи: 0 (25%), А (25%), В (25%) и АВ (25%)',
      'Само кръвни групи 0 и АВ'
    ],
    correctIndex: 2,
    explanation: 'При кръстосване на I^A i × I^B i в решетката на Пънет се получават 4 генотипа с еднаква вероятност от 25%: I^A I^B (група AB), I^A i (група A), I^B i (група B) и ii (група 0).'
  },
  {
    id: 3,
    subject: 'Химия',
    question: 'С кой реактив може еднозначно да се докаже наличието на сулфатни йони (SO₄²⁻) във воден разтвор?',
    options: [
      'Разтвор на сребърен нитрат (AgNO₃)',
      'Разтвор на бариев дихлорид (BaCl₂), при което пада бяла кристална утайка BaSO₄↓, неразтворима в киселини',
      'Разтвор на натриева основа (NaOH)',
      'Фенолфталеин'
    ],
    correctIndex: 1,
    explanation: 'Реакцията Ba²⁺ + SO₄²⁻ → BaSO₄↓ (бяла кристална утайка, неразтворима в киселини) е качествената реакция за сулфатни йони.'
  },
  {
    id: 4,
    subject: 'Химия',
    question: 'Какъв е характерът на средата (pH) във воден разтвор на натриев карбонат (Na₂CO₃)?',
    options: [
      'Кисел (pH < 7)',
      'Неутрален (pH = 7)',
      'Основен / Алкален (pH > 7), защото е сол на силна основа (NaOH) и слаба киселина (H₂CO₃)',
      'Зависи от температурата'
    ],
    correctIndex: 2,
    explanation: 'При хидролиза на сол винаги надделява силният електролит: NaOH е силна основа, а H₂CO₃ е слаба киселина, затова разтворът на Na₂CO₃ има основен характер (pH > 7).'
  },
  {
    id: 5,
    subject: 'Физика',
    question: 'Два консуматора със съпротивления R₁ = 6 Ω и R₂ = 3 Ω са свързани УСПОРЕДНО към източник с напрежение U = 12 V. Колко е еквивалентното съпротивление R и общият ток I във веригата?',
    options: [
      'R = 9 Ω, I = 1,33 A',
      'R = 2 Ω, I = 6 A',
      'R = 4,5 Ω, I = 2,67 A',
      'R = 2 Ω, I = 24 A'
    ],
    correctIndex: 1,
    explanation: 'При успоредно свързване R = (R₁·R₂)/(R₁ + R₂) = (6·3)/(6 + 3) = 18/9 = 2 Ω. По закона на Ом общият ток е I = U / R = 12 V / 2 Ω = 6 A.'
  },
  {
    id: 6,
    subject: 'Физика',
    question: 'Според уравнението на Айнщайн за фотоефекта (hν = A + Ek,max), от какво зависи максималната кинетична енергия на отделените фотоелектрони?',
    options: [
      'От интензитета (яркостта) на падащата светлина',
      'Единствено от честотата ν на падащата светлина и отделителната работа A на метала',
      'От времето на осветяване на катода',
      'От площта на металната пластинка'
    ],
    correctIndex: 1,
    explanation: 'Интензитетът определя броя на отделените електрони (фототока на насищане), но максималната им кинетична енергия Ek,max = hν - A зависи линейно само от честотата ν.'
  },
  {
    id: 7,
    subject: 'Биология',
    question: 'Колко копия на таргетния ДНК фрагмент ще се получат от 1 начална молекула ДНК след n = 10 цикъла на Полимеразна верижна реакция (PCR)?',
    options: [
      '20 копия',
      '100 копия',
      '1024 копия (N = 2¹⁰)',
      '1 000 000 копия'
    ],
    correctIndex: 2,
    explanation: 'При всеки цикъл на PCR количеството ДНК се удвоява експоненциално по закона N = N₀ · 2ⁿ. За n = 10 цикъла: 2¹⁰ = 1024 копия.'
  },
  {
    id: 8,
    subject: 'Биология',
    question: 'В кои кръвоносни съдове на човешкото тяло тече ВЕНОЗНА (бедна на кислород) кръв в Малкия кръг на кръвообращението?',
    options: [
      'В белодробните вени',
      'В белодробната артерия (която излиза от дясната камера и носи венозна кръв към белите дробове)',
      'В аортата',
      'В лявото предсърдие'
    ],
    correctIndex: 1,
    explanation: 'В малкия кръг на кръвообращението в белодробните артерии тече венозна кръв (от дясната камера към белите дробове), а в 4-те белодробни вени се връща артериална кръв към лявото предсърдие.'
  },
  {
    id: 9,
    subject: 'Химия',
    question: 'Каква е граничната концентрация на въглерод (C) в диаграмата Желязо–Цементит (Fe–Fe₃C), която разделя стоманите от чугуните?',
    options: [
      '0,02% въглерод',
      '0,77% въглерод',
      '2,14% въглерод (до 2,14% C са стомани, а от 2,14% до 6,67% C са чугуни)',
      '10,0% въглерод'
    ],
    correctIndex: 2,
    explanation: 'Желязо-въглеродните сплави със съдържание на въглерод до 2,14% са стомани (пластични и ковки), а над 2,14% до 6,67% C са чугуни.'
  },
  {
    id: 10,
    subject: 'Химия',
    question: 'При флотационно обогатяване на 1000 t медна руда със съдържание α = 0,5% Cu са получени 18 t концентрат със съдържание β = 25% Cu. Колко е извличането на метала ε?',
    options: [
      '50%',
      '75%',
      '90% (в рудата има 5 t Cu, а в концентрата са извлечени 18 × 0,25 = 4,5 t Cu)',
      '100%'
    ],
    correctIndex: 2,
    explanation: 'Масата на метала в изходната руда е 1000 × 0,005 = 5,0 t Cu. В концентрата са извлечени 18 × 0,25 = 4,5 t Cu. Следователно ε = (4,5 / 5,0) × 100% = 90%.'
  },
  {
    id: 11,
    subject: 'Физика',
    question: 'Ядрен енергиен блок с реактор ВВЕР-1000 има топлинна мощност P_th = 3000 MW и електрическа мощност P_el = 1000 MW. Колко е неговият КПД и защо водата в Първи контур (320 °C) не кипи?',
    options: [
      'КПД = 33,3%; водата не кипи, защото е под високо налягане от ~15,7 MPa (157 atm)',
      'КПД = 90%; водата е смесена със спирт',
      'КПД = 50%; водата в реактора кипи непрекъснато',
      'КПД = 20%; температурата е само 80 °C'
    ],
    correctIndex: 0,
    explanation: 'Термичният КПД е η = 1000 / 3000 = 33,3%. В първи контур на ВВЕР-1000 се поддържа налягане 15,7 MPa, при което температурата на кипене на водата е над 345 °C.'
  },
  {
    id: 12,
    subject: 'Физика',
    question: 'Оптично влакно има сърцевина с показател на пречупване n₁ = 1,50 и обвивка с n₂ = 1,47. Колко е синусът на граничния ъгъл на пълно вътрешно отражение sin θ_crit?',
    options: [
      'sin θ_crit = n₂ / n₁ = 1,47 / 1,50 = 0,98',
      'sin θ_crit = n₁ / n₂ = 1,02',
      'sin θ_crit = 0,50',
      'sin θ_crit = 1,00'
    ],
    correctIndex: 0,
    explanation: 'Пълно вътрешно отражение настъпва при преминаване от оптически по-плътна (n₁) към по-рядка среда (n₂) при ъгъл над граничния: sin θ_crit = n₂ / n₁ = 1,47 / 1,50 = 0,98.'
  },
  {
    id: 13,
    subject: 'Биология',
    question: 'При пълно аеробно разграждане на 3 mol глюкоза (гликолиза + цикъл на Кребс + окислително фосфорилиране) колко мола АТФ се синтезират сумарно (при добив 38 mol АТФ/mol глюкоза) и колко от тях се падат само на гликолизата (субстратно фосфорилиране)?',
    options: [
      'Общо 114 mol АТФ (3 × 38), от които 6 mol АТФ са чистият енергиен добив от гликолизата (3 × 2 mol АТФ)',
      'Общо 38 mol АТФ, от които 2 mol от гликолизата',
      'Общо 72 mol АТФ, от които 36 mol от гликолизата',
      'Общо 6 mol АТФ, защото цикълът на Кребс не произвежда редуцирани коензими'
    ],
    correctIndex: 0,
    explanation: 'От 1 mol глюкоза при гликолизата чистият добив е 2 mol АТФ (плюс 2 mol NADH), а сумарният аеробен добив достига 36–38 mol АТФ. За 3 mol глюкоза това прави 3 × 38 = 114 mol АТФ общо и 3 × 2 = 6 mol АТФ пряко от гликолизата.'
  },
  {
    id: 14,
    subject: 'Химия',
    question: 'Какъв обем разтвор на натриева основа (NaOH) с моларна концентрация c₂ = 0,20 mol/L е необходим за пълна неутрализация (до еквивалентна точка) на V₁ = 25 mL разтвор на сярна киселина (H₂SO₄) с концентрация c₁ = 0,10 mol/L?',
    options: [
      'V₂ = 25 mL NaOH (защото H₂SO₄ е двуосновна киселина: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O)',
      'V₂ = 12,5 mL NaOH',
      'V₂ = 50 mL NaOH',
      'V₂ = 100 mL NaOH'
    ],
    correctIndex: 0,
    explanation: 'По закона за еквивалентите при титруване на двуосновната сярна киселина (z₁ = 2) с еднокиселата основа NaOH (z₂ = 1): c₁·V₁·z₁ = c₂·V₂·z₂ ➔ 0,10 × 25 × 2 = 0,20 × V₂ × 1 ➔ 5,0 = 0,20·V₂ ➔ V₂ = 25 mL.'
  },
  {
    id: 15,
    subject: 'Химия',
    question: 'Прясно утаен меден дихидроксид Cu(OH)₂ се добавя към разтвор на глюкоза при стайна температура и след това сместа се нагрява. Какви цветови промени се наблюдават и кои функционални групи на глюкозата се доказват?',
    options: [
      'При стайна температура се образува бистър тъмносин комплексен разтвор (доказва поливалентен алкохол с -OH групи), а при нагряване пада керемиденочервена утайка от Cu₂O↓ (доказва алдехидна група -CHO)',
      'При стайна температура пада бяла утайка, а при нагряване разтворът става виолетов',
      'Отделя се сребърно огледало по стените на епруветката',
      'Разтворът се обезцветява мигновено като при бромна вода'
    ],
    correctIndex: 0,
    explanation: 'Глюкозата е алдозахексоза (полихидроксиалдехид): на студено с Cu(OH)₂ дава тъмносин комплекс (качествена реакция за вицинални -OH групи), а при кипене редуцира Cu²⁺ до керемиденочервен Cu₂O↓ (доказва алдехидната група -CHO).'
  },
  {
    id: 16,
    subject: 'Физика',
    question: 'Идеална топлинна машина работи по цикъл на Карно между нагревател с температура t₁ = 227 °C (T₁ = 500 K) и охладител с температура t₂ = 27 °C (T₂ = 300 K). Колко е максималният термичен КПД η_max на машината?',
    options: [
      'η_max = (T₁ - T₂) / T₁ = (500 - 300) / 500 = 0,40 (40%)',
      'η_max = (227 - 27) / 227 = 88,1%',
      'η_max = 300 / 500 = 60%',
      'η_max = 100%'
    ],
    correctIndex: 0,
    explanation: 'Във формулата на Карно температурите ЗАДЪЛЖИТЕЛНО се заместват в абсолютни келвини (T[K] = t[°C] + 273): T₁ = 500 K, T₂ = 300 K ➔ η = (500 - 300) / 500 = 200 / 500 = 40%.'
  }
];

const ORGANIC_QUALITATIVE_REACTIONS = [
  {
    id: 'org-silver-mirror',
    compoundClass: 'Алдехиди (R-CHO) и Глюкоза',
    reagent: 'Амонячен разтвор на Ag₂O — Реактив на Толенс [Ag(NH₃)₂]OH при нагряване',
    equation: 'R-CHO + 2[Ag(NH₃)₂]OH → R-COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
    visualEffect: 'По стените на чистата епруветка се отлага блестящ слой метално сребро („Сребърно огледало“).',
    muExamTip: 'Кетоните (напр. ацетон и фруктоза в неалкална среда без енолизация) НЕ дават реакция сребърно огледало, но мравчената киселина (HCOOH) и нейните соли/естери я дават, защото съдържат алдехиден фрагмент!'
  },
  {
    id: 'org-cuoh2-dual',
    compoundClass: 'Поливалентни алкохоли (Глицерол/Глюкоза) vs Алдехиди',
    reagent: 'Прясно утаен меден дихидроксид Cu(OH)₂ (на студено и при кипене)',
    equation: 'На студено: тъмносин хелатен комплекс • При кипене с R-CHO: R-CHO + 2Cu(OH)₂ → R-COOH + Cu₂O↓ (керемиденочервен) + 2H₂O',
    visualEffect: 'На студено: разтваряне на светлосинята утайка до бистър василевосин разтвор. При нагряване с алдехид: жълта (CuOH) до керемиденочервена утайка (Cu₂O↓).',
    muExamTip: 'Глюкозата дава И ДВЕТЕ реакции последователно с един и същ реактив Cu(OH)₂ — ключово доказателство за двойствената ѝ функция в темите за МУ!'
  },
  {
    id: 'org-biuret',
    compoundClass: 'Белтъци и Пептиди (Пептидна група -CO-NH-)',
    reagent: 'Биуретова реакция (NaOH + разреден CuSO₄) & Ксантопротеинова реакция (конц. HNO₃)',
    equation: 'Пептидна връзка (-CO-NH-) + Cu²⁺ + OH⁻ → Виолетов медно-пептиден комплекс',
    visualEffect: 'Биуретова реакция: характерно виолетово оцветяване. Ксантопротеинова реакция: жълто оцветяване (оранжево с NH₃) при наличие на ароматни аминокиселини (Фенилаланин, Тирозин, Триптофан).',
    muExamTip: 'Свободните аминокиселини НЕ дават биуретова реакция (тя изисква поне две пептидни връзки, т.е. трипептид или полипептид).'
  },
  {
    id: 'org-bromine-water',
    compoundClass: 'Алкени/Алкини (C=C / C≡C), Фенол (C₆H₅OH) и Анилин (C₆H₅NH₂)',
    reagent: 'Бромна вода (Br₂/H₂O)',
    equation: 'C₆H₅OH + 3Br₂ → C₆H₂Br₃OH↓ (2,4,6-трибромофенол — бяла утайка) + 3HBr',
    visualEffect: 'При алкени/алкини: само обезцветяване на кафявата бромна вода (присъединяване). При фенол и анилин: обезцветяване + падане на БЯЛА утайка от 2,4,6-трибромофенол / трибромоанилин!',
    muExamTip: 'Бензенът (C₆H₆) НЕ обезцветява бромна вода без катализатор (FeBr₃), докато фенолът и анилинът реагират мигновено поради +M ефекта на -OH и -NH₂ групите.'
  }
];

export const ScienceDziLab: React.FC<ScienceDziLabProps> = ({ onOpenFormulaModal }) => {
  const [activeTab, setActiveTab] = useState<ScienceLabTab>('biology');

  // =========================================================================
  // TAB 1: BIOLOGY (DNA -> mRNA -> Protein, Blood Groups & Bioenergetics/PCR)
  // =========================================================================
  const [dnaInput, setDnaInput] = useState<string>(DNA_PRESETS[0].dnaTemplate);
  const [activePresetNote, setActivePresetNote] = useState<string>(DNA_PRESETS[0].note);
  const [parent1Blood, setParent1Blood] = useState<'IAIA' | 'IAi' | 'IBIB' | 'IBi' | 'IAIB' | 'ii'>('IAi');
  const [parent2Blood, setParent2Blood] = useState<'IAIA' | 'IAi' | 'IBIB' | 'IBi' | 'IAIB' | 'ii'>('IBi');
  const [glucoseMoles, setGlucoseMoles] = useState<number>(2);
  const [pcrInitialCopies, setPcrInitialCopies] = useState<number>(1);
  const [pcrCycles, setPcrCycles] = useState<number>(10);

  const cleanedDna = useMemo(() => {
    return dnaInput.toUpperCase().replace(/[^ATGC]/g, '');
  }, [dnaInput]);

  const codingDna = useMemo(() => {
    const map: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' };
    return cleanedDna.split('').map((ch) => map[ch] || '').join('');
  }, [cleanedDna]);

  const mrnaStrand = useMemo(() => {
    const map: Record<string, string> = { A: 'U', T: 'A', G: 'C', C: 'G' };
    return cleanedDna.split('').map((ch) => map[ch] || '').join('');
  }, [cleanedDna]);

  const codonsAnalysis = useMemo(() => {
    const codons: string[] = [];
    for (let i = 0; i < mrnaStrand.length; i += 3) {
      if (i + 3 <= mrnaStrand.length) {
        codons.push(mrnaStrand.slice(i, i + 3));
      }
    }

    const trnaMap: Record<string, string> = { A: 'U', U: 'A', G: 'C', C: 'G' };
    let stopReached = false;

    return codons.map((codon, index) => {
      const anticodon = codon.split('').map((c) => trnaMap[c] || '').join('');
      const aa = CODON_TABLE[codon] || { name: 'Неизвестен', short: '???', type: 'nonpolar' as const };
      const isAfterStop = stopReached;
      if (aa.type === 'stop') {
        stopReached = true;
      }
      return {
        index: index + 1,
        dnaTriplet: cleanedDna.slice(index * 3, index * 3 + 3),
        codingTriplet: codingDna.slice(index * 3, index * 3 + 3),
        codon,
        anticodon,
        aa,
        isAfterStop
      };
    });
  }, [mrnaStrand, cleanedDna, codingDna]);

  const activeAminoAcidsCount = codonsAnalysis.filter((c) => !c.isAfterStop && c.aa.type !== 'stop').length;
  const peptideBondsCount = Math.max(0, activeAminoAcidsCount - 1);

  const getAlleles = (g: 'IAIA' | 'IAi' | 'IBIB' | 'IBi' | 'IAIB' | 'ii'): [string, string] => {
    if (g === 'IAIA') return ['Iᴬ', 'Iᴬ'];
    if (g === 'IAi') return ['Iᴬ', 'i'];
    if (g === 'IBIB') return ['Iᴮ', 'Iᴮ'];
    if (g === 'IBi') return ['Iᴮ', 'i'];
    if (g === 'IAIB') return ['Iᴬ', 'Iᴮ'];
    return ['i', 'i'];
  };

  const getPhenotype = (a1: string, a2: string) => {
    const pair = [a1, a2].sort().join('');
    if (pair === 'IᴬIᴬ' || pair === 'Iᴬi') return { group: 'Група A', genotype: `${a1}${a2}`, color: 'bg-rose-50 text-rose-900 border-rose-200' };
    if (pair === 'IᴮIᴮ' || pair === 'Iᴮi') return { group: 'Група B', genotype: `${a1}${a2}`, color: 'bg-blue-50 text-blue-900 border-blue-200' };
    if (pair === 'IᴬIᴮ') return { group: 'Група AB (Кодоминиране)', genotype: 'IᴬIᴮ', color: 'bg-purple-50 text-purple-900 border-purple-200' };
    return { group: 'Група 0 (Рецесивна)', genotype: 'ii', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' };
  };

  const p1Alleles = getAlleles(parent1Blood);
  const p2Alleles = getAlleles(parent2Blood);

  // =========================================================================
  // TAB 2: CHEMISTRY STATE (Qualitative, Hydrolysis, Titration & Organic)
  // =========================================================================
  const [selectedReactionId, setSelectedReactionId] = useState<string>(ION_REACTIONS[0].id);
  const [selectedSaltIdx, setSelectedSaltIdx] = useState<number>(0);
  const [selectedOrganicId, setSelectedOrganicId] = useState<string>(ORGANIC_QUALITATIVE_REACTIONS[0].id);

  // Acid-Base Titration Calculator State
  const [acidType, setAcidType] = useState<'HCl' | 'H2SO4' | 'CH3COOH'>('H2SO4');
  const [baseType, setBaseType] = useState<'NaOH' | 'KOH' | 'Ba(OH)2'>('NaOH');
  const [acidConc, setAcidConc] = useState<number>(0.1);
  const [acidVolMl, setAcidVolMl] = useState<number>(25);
  const [baseConc, setBaseConc] = useState<number>(0.2);

  const currentReaction = ION_REACTIONS.find((r) => r.id === selectedReactionId) || ION_REACTIONS[0];
  const currentSalt = HYDROLYSIS_SALTS[selectedSaltIdx] || HYDROLYSIS_SALTS[0];
  const currentOrganic = ORGANIC_QUALITATIVE_REACTIONS.find((o) => o.id === selectedOrganicId) || ORGANIC_QUALITATIVE_REACTIONS[0];

  const acidProtonsZ1 = acidType === 'H2SO4' ? 2 : 1;
  const baseHydroxylsZ2 = baseType === 'Ba(OH)2' ? 2 : 1;
  const eqBaseVolMl = +((acidConc * acidVolMl * acidProtonsZ1) / (baseConc * baseHydroxylsZ2)).toFixed(2);
  const eqIndicatorInfo =
    acidType === 'CH3COOH'
      ? 'Фенолфталеин (екв. точка е в слабоалкална среда pH ≈ 8,7 поради хидролиза на ацетатния анион)'
      : 'Бромтимол синьо или Фенолфталеин / Метилоранж (силна киселина + силна основа ➔ неутрална екв. точка pH = 7,0)';

  // =========================================================================
  // TAB 3: PHYSICS STATE (Ohm, Photoeffect, Carnot & Three-Phase Power)
  // =========================================================================
  const [circuitMode, setCircuitMode] = useState<'series' | 'parallel'>('parallel');
  const [r1, setR1] = useState<number>(6);
  const [r2, setR2] = useState<number>(3);
  const [voltage, setVoltage] = useState<number>(12);

  const [selectedMetalIdx, setSelectedMetalIdx] = useState<number>(0);
  const [wavelengthNm, setWavelengthNm] = useState<number>(400);

  // Carnot & 3-Phase Industrial Power State
  const [carnotHotC, setCarnotHotC] = useState<number>(227); // 500 K
  const [carnotColdC, setCarnotColdC] = useState<number>(27); // 300 K
  const [threePhaseLineCurrentA, setThreePhaseLineCurrentA] = useState<number>(50);
  const [threePhaseCosPhi, setThreePhaseCosPhi] = useState<number>(0.8);

  const rEq = circuitMode === 'series' ? r1 + r2 : (r1 * r2) / (r1 + r2);
  const totalCurrent = voltage / rEq;
  const totalPower = voltage * totalCurrent;

  const currentMetal = PHOTOELECTRIC_METALS[selectedMetalIdx] || PHOTOELECTRIC_METALS[0];
  // E_photon (eV) = 1240 / lambda(nm)
  const photonEnergyEv = +(1240 / wavelengthNm).toFixed(2);
  const isPhotoeffectActive = photonEnergyEv >= currentMetal.workFunctionEv;
  const maxKineticEv = isPhotoeffectActive ? +(photonEnergyEv - currentMetal.workFunctionEv).toFixed(2) : 0;

  const t1Kelvin = carnotHotC + 273;
  const t2Kelvin = Math.min(t1Kelvin - 10, carnotColdC + 273);
  const carnotEfficiencyPct = +(((t1Kelvin - t2Kelvin) / t1Kelvin) * 100).toFixed(1);

  // 3-phase 400 V line voltage calculations: S = sqrt(3)*U_L*I_L, P = S*cos(phi), Q = S*sin(phi)
  const apparentPowerKva = +((Math.sqrt(3) * 400 * threePhaseLineCurrentA) / 1000).toFixed(2);
  const activePowerKw = +(apparentPowerKva * threePhaseCosPhi).toFixed(2);
  const sinPhi = Math.sqrt(Math.max(0, 1 - threePhaseCosPhi * threePhaseCosPhi));
  const reactivePowerKvar = +(apparentPowerKva * sinPhi).toFixed(2);

  // =========================================================================
  // TAB 4: QUIZ STATE
  // =========================================================================
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOpt, setSelectedQuizOpt] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const currentQ = SCIENCE_QUIZ[quizIndex] || SCIENCE_QUIZ[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-cyan-50 border border-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Биология, Химия и Физика • Живи симулатори за НВО 10 & ДЗИ 12</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Интерактивна Лаборатория по Природни Науки за Отличен 6.00
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">
            Синтезирай белтъци от ДНК матрица, прави качествен анализ на йони в епруветки и изчислявай електрични вериги и фотоефект на живо.
          </p>
        </div>

        {onOpenFormulaModal && (
          <button
            onClick={onOpenFormulaModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-2xs transition-colors shrink-0 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>Принтирай A4 Табла с Формули</span>
          </button>
        )}
      </div>

      {/* Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-100 border border-slate-200">
        <button
          onClick={() => setActiveTab('biology')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'biology'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <Dna className="w-4 h-4" />
          <span>🧬 Биология: ДНК Транслатор & Решетка на Пънет</span>
        </button>

        <button
          onClick={() => setActiveTab('chemistry')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'chemistry'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>🧪 Химия: Качествен анализ на йони & Хидролиза</span>
        </button>

        <button
          onClick={() => setActiveTab('physics')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'physics'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>⚡ Физика: Вериги на Ом & Фотоефект на Айнщайн</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>🎯 Изпитен Тренажор ({SCIENCE_QUIZ.length} задачи)</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: BIOLOGY (DNA -> mRNA -> Protein & Blood Groups) */}
      {/* ===================================================================== */}
      {activeTab === 'biology' && (
        <div className="space-y-8">
          {/* Module 1A: DNA -> mRNA -> Protein Live Synthesizer */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Централна догма на молекулярната биология (ДЗИ Задача)
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Жив Декодер: Матрична ДНК (3&apos;→5&apos;) ➔ иРНК (5&apos;→3&apos;) ➔ Белтък
                </h3>
              </div>

              {/* Preset Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {DNA_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDnaInput(preset.dnaTemplate);
                      setActivePresetNote(preset.note);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                      dnaInput === preset.dnaTemplate
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 hover:bg-slate-100 hover:text-emerald-700 text-slate-700 border-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DNA Input Bar */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Въведи нуклеотиди от матричната верига на ДНК (3&apos; → 5&apos;) — само A, T, G, C:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={dnaInput}
                  onChange={(e) => setDnaInput(e.target.value.toUpperCase().replace(/[^ATGC]/g, ''))}
                  className="flex-1 font-mono text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600 tracking-widest"
                  placeholder="Напр. TACGTGGACTGAGGACTCCTCTTCATT"
                />
                <div className="flex items-center gap-1">
                  {(['A', 'T', 'G', 'C'] as const).map((nuc) => (
                    <button
                      key={nuc}
                      onClick={() => setDnaInput((prev) => prev + nuc)}
                      className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-mono text-xs font-bold cursor-pointer"
                    >
                      +{nuc}
                    </button>
                  ))}
                  <button
                    onClick={() => setDnaInput('TAC')}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 cursor-pointer"
                    title="Нулирай до СТАРТ триплет TAC"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {activePresetNote && (
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{activePresetNote}</span>
                </div>
              )}
            </div>

            {/* Codon-by-Codon Table */}
            <div className="overflow-x-auto">
              <div className="inline-flex gap-2.5 pb-2 min-w-full">
                {codonsAnalysis.map((item) => (
                  <div
                    key={item.index}
                    className={`min-w-[115px] p-3 rounded-xl border text-center space-y-1.5 transition-all ${
                      item.aa.type === 'start'
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : item.aa.type === 'stop'
                        ? 'bg-rose-50/70 border-rose-300'
                        : item.isAfterStop
                        ? 'bg-slate-100 border-slate-200 opacity-50'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Триплет #{item.index}
                    </div>
                    <div className="text-xs font-mono bg-white py-1 px-2 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-400 block">ДНК матр. (3&apos;-5&apos;)</span>
                      <strong className="text-slate-800">{item.dnaTriplet}</strong>
                    </div>
                    <div className="text-xs font-mono bg-blue-50/70 py-1 px-2 rounded border border-blue-200">
                      <span className="text-[10px] text-blue-600 block">иРНК кодон (5&apos;-3&apos;)</span>
                      <strong className="text-blue-900">{item.codon}</strong>
                    </div>
                    <div className="text-xs font-mono bg-purple-50/70 py-1 px-2 rounded border border-purple-200">
                      <span className="text-[10px] text-purple-600 block">тРНК антикодон</span>
                      <strong className="text-purple-900">{item.anticodon}</strong>
                    </div>
                    <div
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold ${
                        item.aa.type === 'start'
                          ? 'bg-emerald-600 text-white'
                          : item.aa.type === 'stop'
                          ? 'bg-rose-600 text-white'
                          : 'bg-amber-100 text-amber-950 border border-amber-300'
                      }`}
                    >
                      {item.aa.short}
                      <span className="block text-[9px] font-normal opacity-90 truncate">
                        {item.aa.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantitative Summary for DZI Problem */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[11px] text-slate-500">Общо нуклеотиди (1 верига)</div>
                <div className="text-lg font-black text-slate-900 font-mono">{cleanedDna.length}</div>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <div className="text-[11px] text-blue-700">Пълни кодони в иРНК</div>
                <div className="text-lg font-black text-blue-900 font-mono">{codonsAnalysis.length}</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-[11px] text-emerald-700">Включени аминокиселини</div>
                <div className="text-lg font-black text-emerald-900 font-mono">{activeAminoAcidsCount}</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <div className="text-[11px] text-amber-800">Пептидни връзки (= H₂O)</div>
                <div className="text-lg font-black text-amber-950 font-mono">{peptideBondsCount}</div>
              </div>
            </div>
          </div>

          {/* Module 1B: Blood Group & Mendel Punnett Square Calculator */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                Генетика за 10. и 12. клас • Множествен алелизъм и Кодоминиране
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Интерактивна Решетка на Пънет за Кръвни Групи (AB0 система)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Генотип на Родител 1 (Майка):
                </label>
                <select
                  value={parent1Blood}
                  onChange={(e) => setParent1Blood(e.target.value as typeof parent1Blood)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900"
                >
                  <option value="IAIA">Група A — Хомозиготна (IᴬIᴬ)</option>
                  <option value="IAi">Група A — Хетерозиготна (Iᴬi)</option>
                  <option value="IBIB">Група B — Хомозиготна (IᴮIᴮ)</option>
                  <option value="IBi">Група B — Хетерозиготна (Iᴮi)</option>
                  <option value="IAIB">Група AB — Кодоминиране (IᴬIᴮ)</option>
                  <option value="ii">Група 0 — Рецесивна (ii)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Генотип на Родител 2 (Баща):
                </label>
                <select
                  value={parent2Blood}
                  onChange={(e) => setParent2Blood(e.target.value as typeof parent2Blood)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900"
                >
                  <option value="IAIA">Група A — Хомозиготна (IᴬIᴬ)</option>
                  <option value="IAi">Група A — Хетерозиготна (Iᴬi)</option>
                  <option value="IBIB">Група B — Хомозиготна (IᴮIᴮ)</option>
                  <option value="IBi">Група B — Хетерозиготна (Iᴮi)</option>
                  <option value="IAIB">Група AB — Кодоминиране (IᴬIᴮ)</option>
                  <option value="ii">Група 0 — Рецесивна (ii)</option>
                </select>
              </div>
            </div>

            {/* 2x2 Punnett Grid */}
            <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto pt-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                ♀ \ ♂ Гамети
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 font-mono text-sm font-black text-slate-900">
                ♂ {p2Alleles[0]}
              </div>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 font-mono text-sm font-black text-slate-900">
                ♂ {p2Alleles[1]}
              </div>

              {p1Alleles.map((a1, rIdx) => (
                <React.Fragment key={rIdx}>
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 font-mono text-sm font-black text-slate-900 flex items-center justify-center">
                    ♀ {a1}
                  </div>
                  {p2Alleles.map((a2, cIdx) => {
                    const res = getPhenotype(a1, a2);
                    return (
                      <div
                        key={cIdx}
                        className={`p-3 rounded-xl border ${res.color} space-y-0.5`}
                      >
                        <div className="font-mono text-sm font-black">{res.genotype}</div>
                        <div className="text-[11px] font-bold">{res.group}</div>
                        <div className="text-[10px] opacity-75">25% шанс</div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Module 1C: Bioenergetics (ATP Cellular Respiration) & PCR Exponential Amplifier */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Кандидат-студентски модул МУ (София / Пловдив / Варна) • Биохимия и Молекулярна биология
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                  Калкулатор за Клетъчно Дишане (Добив на АТФ) & PCR Амплификация на ДНК
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 АТФ
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Left: Cellular Respiration ATP Calculator */}
              <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-emerald-300 uppercase">1. Разграждане на глюкоза (n mol):</span>
                  <span className="font-mono text-base text-white bg-emerald-600/40 px-2.5 py-0.5 rounded-lg border border-emerald-400/40">
                    {glucoseMoles} mol глюкоза ({glucoseMoles * 180} g)
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={glucoseMoles}
                  onChange={(e) => setGlucoseMoles(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">Гликолиза (цитозол — субстратно)</span>
                    <strong className="font-mono text-emerald-300 text-sm">
                      {glucoseMoles * 2} mol АТФ (+ {glucoseMoles * 2} NADH)
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">Цикъл на Кребс (митохондриен матрикс)</span>
                    <strong className="font-mono text-cyan-300 text-sm">
                      {glucoseMoles * 2} mol АТФ (+ {glucoseMoles * 8} NADH)
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">Окислително фосфорилиране (кристи)</span>
                    <strong className="font-mono text-amber-300 text-sm">
                      {glucoseMoles * 34} mol АТФ (от 10 NADH + 2 FADH₂/mol)
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50">
                    <span className="text-emerald-200 block text-[10px] font-bold">СУМАРЕН АЕРОБЕН ДОБИВ:</span>
                    <strong className="font-mono text-white text-base">
                      {glucoseMoles * 36}–{glucoseMoles * 38} mol АТФ
                    </strong>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  <strong>Контраст за ДЗИ/МУ:</strong> При анаеробна гликолиза (млечнокисела или алкохолна ферментация) от{' '}
                  {glucoseMoles} mol глюкоза се получават само <strong>{glucoseMoles * 2} mol АТФ</strong> (19 пъти по-нисък добив).
                </div>
              </div>

              {/* Right: PCR DNA Exponential Amplification Calculator */}
              <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-cyan-300 uppercase">2. PCR Амплификация (N = N₀ · 2ⁿ):</span>
                  <span className="font-mono text-sm text-white bg-cyan-600/40 px-2.5 py-0.5 rounded-lg border border-cyan-400/40">
                    n = {pcrCycles} цикъла • N₀ = {pcrInitialCopies}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">
                      Начални ДНК матрици (N₀): <strong>{pcrInitialCopies}</strong>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={pcrInitialCopies}
                      onChange={(e) => setPcrInitialCopies(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">
                      Термални цикли (n): <strong>{pcrCycles}</strong>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={pcrCycles}
                      onChange={(e) => setPcrCycles(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-cyan-300 font-bold block">
                      Получени ДНК копия след {pcrCycles} цикъла:
                    </span>
                    <span className="text-xs text-slate-300">
                      N = {pcrInitialCopies} × 2^{pcrCycles}
                    </span>
                  </div>
                  <div className="font-mono text-lg font-black text-cyan-300">
                    {(pcrInitialCopies * Math.pow(2, pcrCycles)).toLocaleString('bg-BG')} копия
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 leading-relaxed">
                  <strong>3 стъпки на всеки PCR цикъл:</strong> 1) Денатурация (94–96 °C — разкъсване на Н-връзките); 2) Анилинг / Хибридизация на праймерите (50–65 °C); 3) Елонгация с термостабилна <em>Taq</em> ДНК-полимераза (72 °C).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: CHEMISTRY (QUALITATIVE ION ANALYSIS & HYDROLYSIS) */}
      {/* ===================================================================== */}
      {activeTab === 'chemistry' && (
        <div className="space-y-8">
          {/* Virtual Test Tubes: Ion Identification */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700">
                Неорганична и Аналитична Химия • Качествени реакции за ДЗИ
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Виртуална Епруветка: Разпознаване на катиони и аниони чрез утайки и газове
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {ION_REACTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedReactionId(item.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedReactionId === item.id
                      ? 'bg-cyan-50/80 border-cyan-500 ring-1 ring-cyan-400/50 shadow-xs'
                      : 'bg-slate-50/70 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{item.reagentPair}</div>
                  <div className="text-[11px] text-cyan-800 font-medium mt-0.5">
                    {item.cation} + {item.anion}
                  </div>
                </button>
              ))}
            </div>

            {/* Reaction Display Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center p-5 rounded-2xl bg-slate-50 border border-slate-200">
              {/* Visual Test Tube */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-20 h-44 rounded-b-full border-4 border-t-0 border-slate-400 bg-white p-1.5 flex flex-col justify-end shadow-inner relative overflow-hidden">
                  <div
                    className={`w-full h-28 rounded-b-full bg-gradient-to-b ${currentReaction.tubeColorClass} border-t transition-all duration-500 flex items-end justify-center pb-3`}
                  >
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/90 text-slate-900 shadow-2xs">
                      {currentReaction.netIonicEq.split('→')[1]?.trim()}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-900 bg-cyan-100 px-3 py-1 rounded-full border border-cyan-300">
                  {currentReaction.precipitateBadge}
                </span>
              </div>

              {/* Equations & Explanation */}
              <div className="md:col-span-2 space-y-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="text-[11px] font-bold uppercase text-slate-400">
                    Молекулно уравнение:
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-900">
                    {currentReaction.molecularEq}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 space-y-1">
                  <div className="text-[11px] font-bold uppercase text-cyan-800">
                    Съкратено йонно уравнение (изискване за 6.00 на матурата):
                  </div>
                  <div className="font-mono text-base font-black text-cyan-950">
                    {currentReaction.netIonicEq}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>Наблюдение:</strong> {currentReaction.visualResult}
                </p>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                  <strong>Златно правило за ДЗИ:</strong> {currentReaction.examTip}
                </div>
              </div>
            </div>
          </div>

          {/* Salt Hydrolysis & pH Explorer */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                Водни разтвори и pH • 9. и 10. клас
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Симулатор за Хидролиза на Соли и Цвят на Индикаторите
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {HYDROLYSIS_SALTS.map((salt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSaltIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedSaltIdx === idx
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 hover:text-blue-700 text-slate-700 border-slate-200'
                  }`}
                >
                  {salt.formula.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                {currentSalt.formula}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Произход на солта</span>
                  <strong className="text-slate-800">{currentSalt.parents}</strong>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Среда и pH</span>
                  <strong className="text-purple-900">{currentSalt.phRange}</strong>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Лакмус / Фенолфталеин</span>
                  <strong className="text-slate-800">
                    Лакмус: {currentSalt.litmus} • ФФ: {currentSalt.phenolphthalein}
                  </strong>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-xs font-mono text-purple-950">
                {currentSalt.hydrolysisIon}
              </div>
            </div>
          </div>

          {/* Module 2C: Acid-Base Titration Calculator & Module 2D: Organic Qualitative Reactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Acid-Base Titration Calculator */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                  Обемно-аналитична химия • Трета СПК Лаборант (524010) & ДЗИ
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Интерактивен Киселинно-Основен Титратор (c₁·V₁·z₁ = c₂·V₂·z₂)
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Титрувана киселина:</label>
                  <select
                    value={acidType}
                    onChange={(e) => setAcidType(e.target.value as typeof acidType)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-300 font-bold text-slate-900"
                  >
                    <option value="HCl">HCl (едноосновна, z₁ = 1)</option>
                    <option value="H2SO4">H₂SO₄ (двуосновна, z₁ = 2)</option>
                    <option value="CH3COOH">CH₃COOH (слаба киселина, z₁ = 1)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Титрант (Основа в бюретата):</label>
                  <select
                    value={baseType}
                    onChange={(e) => setBaseType(e.target.value as typeof baseType)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-300 font-bold text-slate-900"
                  >
                    <option value="NaOH">NaOH (еднокисела, z₂ = 1)</option>
                    <option value="KOH">KOH (еднокисела, z₂ = 1)</option>
                    <option value="Ba(OH)2">Ba(OH)₂ (двукисела, z₂ = 2)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] text-slate-500">c₁ киселина (mol/L)</span>
                  <input
                    type="number"
                    min={0.01}
                    max={2}
                    step={0.05}
                    value={acidConc}
                    onChange={(e) => setAcidConc(Math.max(0.01, Number(e.target.value)))}
                    className="w-full font-mono font-bold text-sm text-slate-900 bg-transparent mt-0.5 focus:outline-none"
                  />
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] text-slate-500">V₁ проба (mL)</span>
                  <input
                    type="number"
                    min={5}
                    max={250}
                    step={5}
                    value={acidVolMl}
                    onChange={(e) => setAcidVolMl(Math.max(1, Number(e.target.value)))}
                    className="w-full font-mono font-bold text-sm text-slate-900 bg-transparent mt-0.5 focus:outline-none"
                  />
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] text-slate-500">c₂ титрант (mol/L)</span>
                  <input
                    type="number"
                    min={0.01}
                    max={2}
                    step={0.05}
                    value={baseConc}
                    onChange={(e) => setBaseConc(Math.max(0.01, Number(e.target.value)))}
                    className="w-full font-mono font-bold text-sm text-slate-900 bg-transparent mt-0.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-800 block">
                    Еквивалентен обем на основата V₂ (от бюретата):
                  </span>
                  <span className="text-xs text-teal-900 font-mono">
                    V₂ = ({acidConc} × {acidVolMl} × {acidProtonsZ1}) / ({baseConc} × {baseHydroxylsZ2})
                  </span>
                </div>
                <div className="text-xl font-black font-mono text-teal-950">
                  {eqBaseVolMl} mL
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <strong>Препоръчителен индикатор:</strong> {eqIndicatorInfo}
              </div>
            </div>

            {/* Organic Qualitative Reactions for MU Entrance Exam */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                  Органична Химия за МУ (София / Пловдив / Варна) & ДЗИ
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Качествени реакции за разпознаване на органични съединения
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {ORGANIC_QUALITATIVE_REACTIONS.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => setSelectedOrganicId(org.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      selectedOrganicId === org.id
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-slate-50 hover:bg-slate-100 hover:text-rose-700 text-slate-700 border-slate-200'
                    }`}
                  >
                    {org.compoundClass.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2.5 text-xs">
                <div className="font-extrabold text-sm text-rose-950">
                  {currentOrganic.compoundClass}
                </div>
                <div>
                  <strong className="text-slate-900">Реактив и условия:</strong> {currentOrganic.reagent}
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-rose-200 font-mono text-rose-950 font-bold">
                  {currentOrganic.equation}
                </div>
                <div>
                  <strong className="text-slate-900">Визуален ефект:</strong> {currentOrganic.visualEffect}
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-950">
                  <strong>Изпитен капан за МУ/ДЗИ:</strong> {currentOrganic.muExamTip}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: PHYSICS (OHM CIRCUITS & PHOTOELECTRIC EFFECT) */}
      {/* ===================================================================== */}
      {activeTab === 'physics' && (
        <div className="space-y-8">
          {/* Ohm's Law & Circuit Calculator */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                  Електричество и Магнетизъм • 9. и 10. клас
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Жив Калкулатор за Последователно и Успоредно Свързване на Резистори
                </h3>
              </div>

              <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setCircuitMode('series')}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                    circuitMode === 'series' ? 'bg-blue-600 text-white' : 'text-slate-600'
                  }`}
                >
                  Последователно (R = R₁ + R₂)
                </button>
                <button
                  onClick={() => setCircuitMode('parallel')}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                    circuitMode === 'parallel' ? 'bg-blue-600 text-white' : 'text-slate-600'
                  }`}
                >
                  Успоредно (1/R = 1/R₁ + 1/R₂)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Съпротивление R₁:</span>
                  <span className="font-mono text-blue-700">{r1} Ω</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={r1}
                  onChange={(e) => setR1(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Съпротивление R₂:</span>
                  <span className="font-mono text-blue-700">{r2} Ω</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={r2}
                  onChange={(e) => setR2(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Напрежение U:</span>
                  <span className="font-mono text-amber-700">{voltage} V</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={48}
                  value={voltage}
                  onChange={(e) => setVoltage(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-center">
                <div className="text-[11px] text-blue-700">Еквивалентно R</div>
                <div className="text-lg font-black text-blue-950 font-mono">{rEq.toFixed(2)} Ω</div>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-[11px] text-emerald-700">Общ ток I = U / R</div>
                <div className="text-lg font-black text-emerald-950 font-mono">{totalCurrent.toFixed(2)} A</div>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <div className="text-[11px] text-amber-800">Мощност P = U · I</div>
                <div className="text-lg font-black text-amber-950 font-mono">{totalPower.toFixed(1)} W</div>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-center">
                <div className="text-[11px] text-purple-800">Топлина за 10 s (Q = P·t)</div>
                <div className="text-lg font-black text-purple-950 font-mono">{(totalPower * 10).toFixed(0)} J</div>
              </div>
            </div>
          </div>

          {/* Einstein Photoelectric Effect Simulator */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                Квантова Физика • НВО 10 & ДЗИ 12
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Симулатор на Фотоефекта на Айнщайн (hν = A + Ek,max)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Избери метал за фотокатода (Отделителна работа A):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PHOTOELECTRIC_METALS.map((m, idx) => (
                    <button
                      key={m.name}
                      onClick={() => setSelectedMetalIdx(idx)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                        selectedMetalIdx === idx
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {m.name} (A = {m.workFunctionEv} eV)
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Дължина на вълната λ на падащата светлина:</span>
                  <span className="font-mono text-indigo-700">{wavelengthNm} nm ({photonEnergyEv} eV)</span>
                </div>
                <input
                  type="range"
                  min={180}
                  max={750}
                  step={5}
                  value={wavelengthNm}
                  onChange={(e) => setWavelengthNm(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>180 nm (Ултравиолетова UV)</span>
                  <span>400–700 nm (Видима)</span>
                  <span>750 nm (Инфрачервена)</span>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isPhotoeffectActive
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="space-y-1">
                <div className="text-sm font-extrabold flex items-center gap-2">
                  {isPhotoeffectActive ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>НАБЛЮДАВА СЕ ФОТОЕФЕКТ! (Енергията на фотона {photonEnergyEv} eV ≥ A = {currentMetal.workFunctionEv} eV)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                      <span>НЯМА ФОТОЕФЕКТ! (λ = {wavelengthNm} nm е над червената граница λ_max = {currentMetal.redLimitNm} nm)</span>
                    </>
                  )}
                </div>
                <p className="text-xs opacity-90">
                  Червена граница за {currentMetal.name}: λ_max = {currentMetal.redLimitNm} nm.
                </p>
              </div>

              <div className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-center shrink-0">
                <div className="text-[10px] uppercase font-bold text-slate-500">Макс. кинетична енергия Ek,max</div>
                <div className="text-lg font-black font-mono text-slate-900">{maxKineticEv} eV</div>
              </div>
            </div>
          </div>

          {/* Module 3C: Carnot Heat Engine & Three-Phase Power Simulator (DIPPK 522010) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Carnot Heat Engine */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Термодинамика и Топлотехника • ДЗИ Физика & Енергетика
                </span>
                <h3 className="text-base font-extrabold text-white mt-0.5">
                  Топлинна Машина на Карно: η_max = (T₁ - T₂) / T₁
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Нагревател t₁:</span>
                    <strong className="font-mono text-amber-300">{carnotHotC} °C ({t1Kelvin} K)</strong>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={600}
                    step={5}
                    value={carnotHotC}
                    onChange={(e) => setCarnotHotC(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Охладител t₂:</span>
                    <strong className="font-mono text-sky-300">{carnotColdC} °C ({t2Kelvin} K)</strong>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={90}
                    step={5}
                    value={carnotColdC}
                    onChange={(e) => setCarnotColdC(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-bold text-amber-300 block">Максимален термичен КПД η_max:</span>
                  <span className="font-mono text-slate-300">
                    ({t1Kelvin} K - {t2Kelvin} K) / {t1Kelvin} K
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-amber-300">
                  {carnotEfficiencyPct}%
                </div>
              </div>
            </div>

            {/* Three-Phase Power Triangle Simulator */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                  Трифазна Електротехника (U_L = 400 V) • Трета СПК Електротехник (522010)
                </span>
                <h3 className="text-base font-extrabold text-white mt-0.5">
                  Триъгълник на Мощностите (P, Q, S) & Корекция на cos φ
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Линеен ток I_L:</span>
                    <strong className="font-mono text-sky-300">{threePhaseLineCurrentA} A</strong>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={250}
                    step={5}
                    value={threePhaseLineCurrentA}
                    onChange={(e) => setThreePhaseLineCurrentA(Number(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Фактор cos φ:</span>
                    <strong className="font-mono text-emerald-300">{threePhaseCosPhi.toFixed(2)}</strong>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={1.0}
                    step={0.02}
                    value={threePhaseCosPhi}
                    onChange={(e) => setThreePhaseCosPhi(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40">
                  <span className="text-[10px] text-emerald-300 block">Активна P (kW)</span>
                  <strong className="font-mono text-sm text-white">{activePowerKw} kW</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/40">
                  <span className="text-[10px] text-rose-300 block">Реактивна Q (kVAr)</span>
                  <strong className="font-mono text-sm text-white">{reactivePowerKvar} kVAr</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-sky-950/80 border border-sky-500/40">
                  <span className="text-[10px] text-sky-300 block">Пълна S (kVA)</span>
                  <strong className="font-mono text-sm text-white">{apparentPowerKva} kVA</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: SCIENCE EXAM QUIZ */}
      {/* ===================================================================== */}
      {activeTab === 'quiz' && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200">
              Задача {quizIndex + 1} от {SCIENCE_QUIZ.length} • {currentQ.subject}
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              Верни: {quizScore} / {SCIENCE_QUIZ.length}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h3>

          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedQuizOpt === idx;
              const isCorrect = idx === currentQ.correctIndex;
              let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
              if (selectedQuizOpt !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (selectedQuizOpt !== null) return;
                    setSelectedQuizOpt(idx);
                    if (idx === currentQ.correctIndex) {
                      setQuizScore((s) => s + 1);
                    }
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedQuizOpt !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {selectedQuizOpt !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {selectedQuizOpt !== null && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2">
              <div>
                <strong>Обяснение за 6.00:</strong> {currentQ.explanation}
              </div>
              <div className="pt-1">
                <button
                  onClick={() => {
                    setSelectedQuizOpt(null);
                    setQuizIndex((prev) => (prev + 1) % SCIENCE_QUIZ.length);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                >
                  <span>Следваща задача</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
