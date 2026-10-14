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
    sectorBadge: 'ТУЕС / ИТ & Изкуствен интелект',
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
    id: 'defense-nuclear-optics',
    sectorBadge: 'ПГЯЕ / НПГПТО / Ядрена & Лазерна техника',
    title: 'Топлинно-хидравличен баланс и радиационен контрол на парогенератор ПГВ-1000М във ВВЕР-1000 и оптично-лазерна телеметрия',
    professionCode: 'Техник-енергетик / Лазерна и оптична техника (5220301 / 5210501 — III СПК)',
    inputParameters: 'Първи контур: налягане p₁ = 15.7 MPa, T_вх = 320 °C, T_изх = 290 °C; Втори контур: наситена пара p₂ = 6.27 MPa; влакнесто-оптичен сензор с n₁ = 1.48 и n₂ = 1.46.',
    calculationSteps: [
      'Проверка на условието за пълно вътрешно отражение в оптичното влакно: sin α_гр = n₂ / n₁ = 1.46 / 1.48 ≈ 0.986.',
      'Определяне на термичния КПД на паротурбинния цикъл на Ранкин и контрол на еквивалентната доза H = w_R · D [mSv].',
      'Металографски контрол на аустенитната неръждаема стомана на топлообменните тръби.'
    ],
    commissionQuestions: [
      {
        q: 'Защо водата в Първи контур на ВВЕР-1000 не кипи въпреки температурата от 320 °C?',
        a: 'Защото се поддържа под високо налягане от ~15.7 MPa (157 атмосфери) чрез компенсатора на обема, при което точката на кипене е над 345 °C.'
      },
      {
        q: 'Кое физично явление стои в основата на работата на всеки лазер?',
        a: 'Стимулираното (индуцирано) излъчване на кохерентни фотони при наличие на инверсна населеност на енергетичните нива в активната среда.'
      }
    ],
    linkedLessonId: 'voc-nuclear-energy-optics-lasers-metallurgy-8-12'
  },
  {
    id: 'defense-banking-economics',
    sectorBadge: 'НТБГ / НФСГ / Банково, Данъчно и Счетоводно дело',
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
    linkedLessonId: 'econ-accounting-finance-banking-8-12'
  },
  {
    id: 'defense-architecture-mechatronics',
    sectorBadge: 'СГСАГ / ПГМЕ / Строителство, Мехатроника & ВЕИ',
    title: 'Оразмеряване на стоманобетонна греда, геодезическо трасиране и фотоволтаична/PLC автоматизация на сградата',
    professionCode: 'Строителен техник / Геодезист / Мехатроник (5820101 / 5230901 — III СПК)',
    inputParameters: 'Проста греда с отвор L = 6 m и равномерно натоварване q = 12 kN/m; фотоволтаична централа P_p = 30 kWp с трифазен инвертор cos φ = 0.95.',
    calculationSteps: [
      'Определяне на опорните реакции A = B = q·L/2 = 36 kN и максималния огъващ момент M_max = q·L²/8 = 12·36/8 = 54 kN·m.',
      'Изчисляване на армировката в опънната зона на стоманобетонната греда и проверка на провисването.',
      'Настройка на PID регулатор в PLC контролер за управление на ОВК и трифазната мощност P = √3 · U_L · I_L · cos φ.'
    ],
    commissionQuestions: [
      {
        q: 'В коя зона на проста стоманобетонна греда на две опори се разполага основната носеща стоманена армировка?',
        a: 'В долната (опънна) зона, тъй като бетонът поема отлично натиска отгоре, но има ниска якост на опън отдолу.'
      },
      {
        q: 'Каква е ролята на диференциалната съставка (D) в един PID регулатор?',
        a: 'Тя реагира на скоростта на изменение на грешката (de/dt), предвижда отклоненията и гаси колебанията (пререгулирането).'
      }
    ],
    linkedLessonId: 'voc-architecture-construction-cad-8-12'
  },
  {
    id: 'defense-law-cinema-spa',
    sectorBadge: 'Право & ПАБ / Кино & Иконопис / Балнеология & СПА',
    title: 'Комплексен проект по Пожарна безопасност и Сигурност / Студийна Аудио-Визуална продукция / Балнео-СПА рехабилитация',
    professionCode: 'Сигурност и ПАБ / Кинотехника и Иконопис / Изпълнител на термални процедури (III СПК)',
    inputParameters: 'Евакуационен план и пожарогасене за класове A, B, C, F; Цифров аудио-видео мастер 48 kHz / 24-bit, 24 fps (1/50 s) или хипертермална минерална терапия (39 °C, pH на кожата 5.0).',
    calculationSteps: [
      'Сигурност/ПАБ: Изчисляване на евакуационните пътища, разполагане на CO₂ и прахови пожарогасители и СОТ/CCTV зони.',
      'Кино/Приложни изкуства: Настройка на 3-точково осветление (3200 K / 5600 K), дискретизация по Котелников-Шанън и грунд левкас.',
      'Балнеология/Козметика: Съставяне на 10-дневна балнеолечебна и дерматологична програма при спазване на медицинските противопоказания.'
    ],
    commissionQuestions: [
      {
        q: 'Защо пожари от Клас F (горещи кулинарни мазнини) и електроуреди под напрежение никога не се гасят с вода?',
        a: 'При мазнините водата се изпарява мигновено и предизвиква взривно разпръскване на пламъка, а при електроуредите провежда тока.'
      },
      {
        q: 'Защо козметичните продукти за почистване трябва да запазват pH 4.5–5.5?',
        a: 'За да не разрушават естествената киселинна (хидролипидна) мантия на епидермиса, която предпазва кожата от патогенни бактерии.'
      }
    ],
    linkedLessonId: 'voc-law-security-criminalistics-fire-safety-8-12'
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
