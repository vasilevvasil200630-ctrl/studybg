import React, { useState } from 'react';
import { Printer, FileText, ShieldCheck, Eye, EyeOff, GraduationCap, BookOpen, CheckSquare, Award } from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';

interface ExamTestPaperGeneratorProps {
  currentLesson: LessonData;
  allLessons: LessonData[];
  onSelectLesson: (lesson: LessonData) => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

interface DippkWrittenTicketTemplate {
  id: string;
  professionCode: string;
  professionTitle: string;
  specialtyTitle: string;
  ticketTopicA: string;
  ticketTopicB: string;
  section1Questions: {
    q: string;
    points: number;
    keyCriteria: string;
  }[];
  section2CalculationTaskA: {
    prompt: string;
    points: number;
    solutionSteps: string;
  };
  section2CalculationTaskB: {
    prompt: string;
    points: number;
    solutionSteps: string;
  };
  section3ZbutAndStandards: {
    prompt: string;
    points: number;
    normativeKey: string;
  };
}

const DIPPK_OFFICIAL_WRITTEN_TICKETS: DippkWrittenTicketTemplate[] = [
  {
    id: 'dippk-prog-481010',
    professionCode: '481010',
    professionTitle: 'Програмист / Системен програмист',
    specialtyTitle: 'Програмно осигуряване & Приложно програмиране (Трета СПК)',
    ticketTopicA: 'Проектиране на релационни бази данни (3NF), ООП полиморфизъм и защита на REST API (JWT & SQLi)',
    ticketTopicB: 'Алгоритми за търсене и сортиране (сложност Big-O), транзакции (ACID) и криптографско хеширане на пароли',
    section1Questions: [
      {
        q: 'Формулирайте изискванията за Първа (1NF), Втора (2NF) и Трета нормална форма (3NF) при проектиране на релационна база данни и дайте пример за връзка M:N с междинна таблица.',
        points: 25,
        keyCriteria: '1NF (атомарност + PK): 8 т. | 2NF (пълна функционална зависимост от съставния PK): 8 т. | 3NF (липса на транзитивни зависимости) + пример за M:N: 9 т.'
      },
      {
        q: 'Обяснете механизма на Полиморфизма и Капсулацията в ООП и посочете как параметризираните заявки (Prepared Statements) предотвратяват SQL Injection атаки.',
        points: 25,
        keyCriteria: 'Капсулация и модификатори за достъп: 8 т. | Виртуални методи и override: 9 т. | Разделяне на SQL синтаксиса от входните параметри: 8 т.'
      }
    ],
    section2CalculationTaskA: {
      prompt: 'Дадена е релационна схема: Students(id, name, class_grade) и Exams(id, student_id, subject, score). Напишете SQL заявка с INNER JOIN, GROUP BY и HAVING, която извежда имената на учениците със среден резултат (AVG) над 85.00 точки, подредени в низходящ ред.',
      points: 30,
      solutionSteps: 'SELECT s.name, AVG(e.score) AS avg_score FROM Students s INNER JOIN Exams e ON s.id = e.student_id GROUP BY s.id, s.name HAVING AVG(e.score) > 85.00 ORDER BY avg_score DESC; (JOIN: 10 т., GROUP BY + AVG: 10 т., HAVING + ORDER BY: 10 т.)'
    },
    section2CalculationTaskB: {
      prompt: 'Напишете алгоритъм (псевдокод или C#/Java/Python/JS) за Двоично търсене (Binary Search) на елемент X в сортиран масив A[0..N-1] и изчислете максималния брой сравнения при N = 1024 елемента.',
      points: 30,
      solutionSteps: 'Инициализация left=0, right=N-1, цикъл while(left<=right) с mid = left + (right-left)/2: 20 т. | Изчисление log₂(1024) = 10 сравнения (сложност O(log N)): 10 т.'
    },
    section3ZbutAndStandards: {
      prompt: 'Опишете техническите и организационни мерки за информационна сигурност по GDPR / ISO 27001 и ергономичните норми за работа с видеодисплеи по Наредба № 7.',
      points: 20,
      normativeKey: 'Криптиране (TLS 1.3, bcrypt/Argon2), RBAC контрол на достъпа и бекъпи (3-2-1 правило): 12 т. | Наредба № 7 (разстояние до монитора 50–70 cm, почивки на всеки час): 8 т.'
    }
  },
  {
    id: 'dippk-elec-522010',
    professionCode: '522010',
    professionTitle: 'Електротехник / Електроенергетик',
    specialtyTitle: 'Електрически централи, мрежи и системи & Електрообзавеждане (Трета СПК)',
    ticketTopicA: 'Изчисляване на трифазни електрически товари, корекция на cos φ и избор на силов трансформатор 20/0,4 kV',
    ticketTopicB: 'Релейна защита (МТЗ, ТО и газова защита на Буххолц), заземителни уредби и петте златни правила по ПБЗР-ЕУЕЦЕМ',
    section1Questions: [
      {
        q: 'Обяснете устройството и принципа на действие на трифазен асинхронен двигател с накъсо съединен ротор (хлъзгане s, пусков ток и схеми на свързване Звезда / Триъгълник).',
        points: 25,
        keyCriteria: 'Въртящо магнитно поле n₁ = 60·f/p: 8 т. | Формула за хлъзгане s = (n₁ - n₂)/n₁: 9 т. | Пускане Y/Δ за намаляване на пусковия ток 3 пъти: 8 т.'
      },
      {
        q: 'Опишете основните видове релейни защити на силов трансформатор (максималнотокова, диференциална и газова защита на Буххолц) и тяхното действие.',
        points: 25,
        keyCriteria: 'Газова защита (сигнал при газообразуване / изключване при маслена вълна): 10 т. | Диференциална защита: 8 т. | МТЗ и токова отсечка: 7 т.'
      }
    ],
    section2CalculationTaskA: {
      prompt: 'Трифазен промишлен цех се захранва при линейно напрежение U_L = 400 V (50 Hz) и консумира активна мощност P = 64 kW при фактор на мощността cos φ = 0,80 (sin φ = 0,60). Изчислете пълната мощност S [kVA], реактивната мощност Q [kVAr] и линейния ток I_L [A].',
      points: 30,
      solutionSteps: 'S = P / cos φ = 64 / 0,80 = 80 kVA (10 т.) | Q = S · sin φ = 80 × 0,60 = 48 kVAr (10 т.) | I_L = S / (√3 · U_L) = 80 000 / (1,732 × 400) ≈ 115,5 A (10 т.).'
    },
    section2CalculationTaskB: {
      prompt: 'Четириполюсен трифазен асинхронен двигател (2p = 4, p = 2) е включен към мрежа с честота f = 50 Hz и има номинално хлъзгане s = 4% (0,04). Изчислете синхронната честота на въртене n₁ [min⁻¹] и номиналната честота на ротора n₂ [min⁻¹].',
      points: 30,
      solutionSteps: 'n₁ = (60 · f) / p = (60 × 50) / 2 = 1500 min⁻¹ (15 т.) | n₂ = n₁ · (1 - s) = 1500 × (1 - 0,04) = 1500 × 0,96 = 1440 min⁻¹ (15 т.).'
    },
    section3ZbutAndStandards: {
      prompt: 'Избройте в точна последователност Петте технически мероприятия (златни правила по ПБЗР-ЕУЕЦЕМ) за осигуряване на безопасност при работа с изключено напрежение и разликата между схеми TN-C и TN-S по Наредба № 3.',
      points: 20,
      normativeKey: '1) Изключване; 2) Табели и заключване; 3) Проверка за отсъствие на напрежение; 4) Преносими заземители; 5) Ограждане на работното място (12 т.) | Разделяне на N и PE в TN-S + ДТЗ 30 mA (8 т.).'
    }
  },
  {
    id: 'dippk-civil-582010',
    professionCode: '582010',
    professionTitle: 'Строителен техник',
    specialtyTitle: 'Строителство и архитектура & Геодезия (Трета СПК)',
    ticketTopicA: 'Оразмеряване на стоманобетонни елементи по Еврокод 2, технология на кофражните/армировъчните работи и КСС',
    ticketTopicB: 'Сеизмично осигуряване по Еврокод 8, хидро- и топлоизолационни системи и ПБЗ по Наредба № 2',
    section1Questions: [
      {
        q: 'Обяснете съвместната работа на бетона и стоманената армировка в стоманобетонна греда, подложена на огъване, и ролята на бетонното покритие c_nom по БДС EN 1992-1-1 (Еврокод 2).',
        points: 25,
        keyCriteria: 'Бетонът поема натисковите напрежения в горната зона, а армировката (B500) поема опънните в долната + стремена за напречни сили V_Ed: 15 т. | Бетонно покритие за корозионна защита и сцепление: 10 т.'
      },
      {
        q: 'Опишете технологичната последователност при приемане на кофраж и армировка преди бетониране, уплътняването с иглен вибратор и грижите за бетона в първите 7 дни.',
        points: 25,
        keyCriteria: 'Акт образец № 7 за приемане на кофраж/армировка по Наредба № 3: 10 т. | Вибриране без разслояване и поддържане на влажност против съсъхвателни пукнатини: 15 т.'
      }
    ],
    section2CalculationTaskA: {
      prompt: 'Проста стоманобетонна греда с отвор L = 6,0 m е натоварена с равномерно разпределен изчислителен товар q_Ed = 20 kN/m. Изчислете опорните реакции R_A = R_B [kN] и максималния огъващ момент в средата на отвора M_max [kN·m].',
      points: 30,
      solutionSteps: 'Опорни реакции: R_A = R_B = (q_Ed · L) / 2 = (20 × 6,0) / 2 = 60 kN (15 т.) | Максимален огъващ момент: M_max = (q_Ed · L²) / 8 = (20 × 36) / 8 = 90 kN·m (15 т.).'
    },
    section2CalculationTaskB: {
      prompt: 'Изчислете необходимия обем бетон V [m³] за отливане на 12 броя стоманобетонни колони с напречно сечение 40 × 40 cm (0,40 × 0,40 m) и височина h = 3,50 m при технологична норма на разход с 2% добавка за уплътняване.',
      points: 30,
      solutionSteps: 'Обем на 1 колона: V₁ = 0,40 × 0,40 × 3,50 = 0,56 m³ (10 т.) | За 12 колони: V_чист = 12 × 0,56 = 6,72 m³ (10 т.) | С 2% норма: V_общ = 6,72 × 1,02 = 6,854 m³ (10 т.).'
    },
    section3ZbutAndStandards: {
      prompt: 'Посочете задължителните изисквания за безопасност при работа на височина и укрепване на земни изкопи по Наредба № 2 за минималните изисквания за ЗБУТ при СМР.',
      points: 20,
      normativeKey: 'Предпазни парапети (височина ≥ 1,00 m + бордова дъска 15 cm), предпазни колани/сбруи при работа над 1,5 m и укрепване/откоси на изкопи с дълбочина над 1,5 m (20 т.).'
    }
  },
  {
    id: 'dippk-econ-343010',
    professionCode: '343010',
    professionTitle: 'Икономист-информатик / Финансист',
    specialtyTitle: 'Икономическа информатика, Счетоводство и Митническо дело (Трета СПК)',
    ticketTopicA: 'Счетоводно отчитане на ДМА, амортизации, ДДС по ЗДДС и формиране на данъчен финансов резултат по ЗКПО',
    ticketTopicB: 'Анализ на ликвидност и рентабилност, отчитане на работна заплата и осигуровки по КСО и митнически режим ЕАД',
    section1Questions: [
      {
        q: 'Обяснете разликата между счетоводен и данъчен финансов резултат по ЗКПО, същността на данъка върху добавената стойност (ДДС) и правото на данъчен кредит по ЗДДС.',
        points: 25,
        keyCriteria: 'Преобразуване на счетоводния резултат (увеличения/намаления по ЗКПО) и корпоративен данък 10%: 13 т. | Начислен ДДС при продажби минус ДДС при покупки = ДДС за внасяне/възстановяване: 12 т.'
      },
      {
        q: 'Опишете елементите на годишния финансов отчет (Счетоводен баланс, ОПР, ОПП, ОСК) и формулите за коефициент на обща ликвидност и рентабилност на продажбите.',
        points: 25,
        keyCriteria: 'Структура на Актива (ДМА, КМА) и Пасива (Собствен и Привлечен капитал): 13 т. | Обща ликвидност = КМА / Текущи пасиви; Рентабилност = Нетна печалба / Приходи: 12 т.'
      }
    ],
    section2CalculationTaskA: {
      prompt: 'Предприятие закупува производствена машина с фактурна стойност 50 000 € без ДДС (20% ДДС = 10 000 €) и разходи за монтаж 4 000 € без ДДС. Определете историческата цена на придобиване на ДМА и годишната амортизационна квота по линейния метод при полезен живот 5 години (норма 20%).',
      points: 30,
      solutionSteps: 'Цена на придобиване (историческа стойност) = 50 000 + 4 000 = 54 000 € (15 т.) | Годишна линейна амортизация = 54 000 × 20% = 10 800 €/год. (900 €/месец) (15 т.).'
    },
    section2CalculationTaskB: {
      prompt: 'Дружество реализира през годината общо приходи 420 000 € и счетоводни разходи 340 000 € (вкл. 5 000 € непризнати за данъчни цели разходи за глоби по ЗКПО). Изчислете счетоводната печалба, данъчната печалба, корпоративния данък (10%) и нетната печалба.',
      points: 30,
      solutionSteps: 'Счетоводна печалба = 420 000 - 340 000 = 80 000 € (8 т.) | Данъчна печалба = 80 000 + 5 000 = 85 000 € (8 т.) | Корпоративен данък (10%) = 8 500 € (7 т.) | Нетна печалба = 80 000 - 8 500 = 71 500 € (7 т.).'
    },
    section3ZbutAndStandards: {
      prompt: 'Посочете законовите изисквания за документална обоснованост на първичните счетоводни документи по Закона за счетоводството и сроковете за съхранение на счетоводни архиви и ведомости за заплати.',
      points: 20,
      normativeKey: 'Задължителни реквизити по чл. 6 от ЗСч + срокове за съхранение: 50 години за ведомости за заплати, 10 години за ГФО и счетоводни регистри, 3 години за останалите носители (20 т.).'
    }
  }
];

export const ExamTestPaperGenerator: React.FC<ExamTestPaperGeneratorProps> = ({
  currentLesson,
  allLessons,
  onSelectLesson,
  onNavigateTab
}) => {
  const [paperMode, setPaperMode] = useState<'lesson' | 'dippk_ticket'>('lesson');
  const [selectedDippkTicketId, setSelectedDippkTicketId] = useState<string>(DIPPK_OFFICIAL_WRITTEN_TICKETS[0].id);
  const [activeGroup, setActiveGroup] = useState<'A' | 'B'>('A');
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const [includeAnswerSheet, setIncludeAnswerSheet] = useState<boolean>(true);
  const [includeModule3, setIncludeModule3] = useState<boolean>(true);

  const activeDippkTicket =
    DIPPK_OFFICIAL_WRITTEN_TICKETS.find((t) => t.id === selectedDippkTicketId) ||
    DIPPK_OFFICIAL_WRITTEN_TICKETS[0];

  const handlePrint = () => {
    window.print();
  };

  // Group A uses original questions; Group B reverses question order AND rotates option order
  const questionsA = currentLesson.quiz;
  const questionsB = [...currentLesson.quiz].reverse().map((q, idx) => {
    const len = q.options.length;
    if (len < 2) return q;
    const shift = (idx % (len - 1)) + 1;
    const rotatedOptions = q.options.map((_, oIdx) => q.options[(oIdx + shift) % len]);
    const newCorrectIndex = (q.correctIndex - shift + len) % len;
    return {
      ...q,
      options: rotatedOptions,
      correctIndex: newCorrectIndex,
    };
  });

  const currentQuestions = activeGroup === 'A' ? questionsA : questionsB;
  const fullChecklist =
    currentLesson.notebookChecklist && currentLesson.notebookChecklist.length > 0
      ? currentLesson.notebookChecklist
      : (currentLesson.flashcards || []).slice(0, 4).map((fc, idx) => ({
          id: fc.id || `fc-fallback-${idx}`,
          requirement: fc.front,
          whyNeeded: fc.back,
          suggestedNotes: fc.back,
        }));
  const checklist =
    activeGroup === 'B' && fullChecklist.length >= 4
      ? [fullChecklist[2], fullChecklist[3]]
      : fullChecklist.slice(0, 2);
  const isVocationalDippk =
    currentLesson.grade.includes('ДИППК') ||
    currentLesson.grade.includes('СПК') ||
    currentLesson.id.startsWith('voc-');

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Configuration */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Инструмент за учители, изпитни комисии и самопроверка</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {paperMode === 'dippk_ticket'
                ? 'Генератор на Официални ДИППК Писмени Билети (Трета СПК • Чл. 38 ЗПОО)'
                : 'Генератор на контролна работа (Група А и Група Б)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {paperMode === 'dippk_ticket'
                ? 'Разпечатайте тренировъчен писмен изпитен билет по образеца за Теория на професията (100 т.) с тристепенна структура, скала по Наредба № 1 на МОН (≥ 50 т. за Среден 3.00) и еталонен ключ за комисията.'
                : 'Генерирайте готова контролна работа в два паралелни варианта за двата чина в клас с точкова система и ключ с верните отговори.'}
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {paperMode === 'lesson' ? (
              <select
                value={currentLesson.id}
                onChange={(e) => {
                  const target = allLessons.find(l => l.id === e.target.value);
                  if (target) onSelectLesson(target);
                }}
                className="bg-white text-slate-800 text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 max-w-[220px]"
              >
                {allLessons.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.subject} - {l.title}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={selectedDippkTicketId}
                onChange={(e) => setSelectedDippkTicketId(e.target.value)}
                className="bg-amber-50 text-amber-950 font-bold text-xs px-3 py-2 rounded-lg border border-amber-300 focus:outline-none focus:border-amber-600 max-w-[260px]"
              >
                {DIPPK_OFFICIAL_WRITTEN_TICKETS.map((t) => (
                  <option key={t.id} value={t.id}>
                    Код {t.professionCode} • {t.professionTitle}
                  </option>
                ))}
              </select>
            )}

          {/* Toggle Answer Key */}
          <button
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              showAnswerKey
                ? 'bg-amber-50 text-amber-800 border-amber-200 font-semibold'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs'
            }`}
          >
            {showAnswerKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showAnswerKey ? 'Скрий верните отговори' : 'Покажи ключ'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Принтирай тест</span>
          </button>

          {onNavigateTab && (
            <>
              <button
                onClick={() => onNavigateTab('quiz')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
                title="Реши този тест интерактивно с таймер и оценка"
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Реши онлайн</span>
              </button>
              <button
                onClick={() => onNavigateTab('summary')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-300 transition-colors shadow-2xs"
                title="Отвори пълния конспект за подготовка"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Към Конспекта</span>
              </button>
            </>
          )}
          </div>
        </div>

        {/* Mode Switcher Bar: Lesson Control Test vs Official DIPPK Written Ticket */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPaperMode('lesson')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              paperMode === 'lesson'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📄 Класна Контролна Работа / ДЗИ & НВО Тест (по урок)
          </button>
          <button
            onClick={() => setPaperMode('dippk_ticket')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              paperMode === 'dippk_ticket'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            🏛️ Официален Писмен ДИППК Изпитен Билет по Теория на Професията (Чл. 38 ЗПОО • Трета СПК)
          </button>
        </div>
      </div>

      {/* Group & Options Switcher Bar (Hidden when printing) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 pl-1">Вариант:</span>
          <button
            onClick={() => setActiveGroup('A')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeGroup === 'A'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Вариант А (Група 1)
          </button>
          <button
            onClick={() => setActiveGroup('B')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeGroup === 'B'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Вариант Б (Група 2)
          </button>
        </div>

        {/* Paper Component Toggles */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="inline-flex items-center gap-1.5 text-slate-700 cursor-pointer font-medium select-none">
            <input
              type="checkbox"
              checked={includeAnswerSheet}
              onChange={(e) => setIncludeAnswerSheet(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1">
              <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
              МОН Бланка за отговори
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 text-slate-700 cursor-pointer font-medium select-none">
            <input
              type="checkbox"
              checked={includeModule3}
              onChange={(e) => setIncludeModule3(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              Модул 3 (Есе / Аналитични задачи)
            </span>
          </label>

          <div className="text-xs text-slate-500 pl-2 border-l border-slate-200">
            Общ сбор: <strong className="text-slate-800">100 т.</strong>
          </div>
        </div>
      </div>

      {/* Printable Test Paper Sheet */}
      {paperMode === 'lesson' ? (
      <div className="p-8 sm:p-10 rounded-2xl bg-white text-black shadow-lg border border-slate-200 space-y-6 print:shadow-none print:border-none print:p-0">
        
        {/* Official МОН Barcode & Anonymity Strip */}
        <div className="border-2 border-black p-3.5 space-y-2.5 bg-slate-50/50 print:bg-white text-xs">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="font-mono text-[10px] tracking-widest block text-slate-600 font-bold uppercase">
                РЕПУБЛИКА БЪЛГАРИЯ • МИНИСТЕРСТВО НА ОБРАЗОВАНИЕТО И НАУКАТА
              </span>
              <h2 className="font-black uppercase text-sm tracking-tight text-slate-900">
                ДЪРЖАВЕН ЗРЕЛОСТЕН ИЗПИТ (ДЗИ) / НАЦИОНАЛНО ВЪНШНО ОЦЕНЯВАНЕ (НВО)
              </h2>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm tracking-widest font-black leading-none">
                ||| | |||| | ||| || ||||| |||
              </div>
              <span className="font-mono text-[9px] text-slate-600 block mt-1">
                ФИШ № МОН-{currentLesson.id.slice(0, 4).toUpperCase()}-{activeGroup}-2026
              </span>
            </div>
          </div>

          <div className="border-t border-dashed border-black/60 pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div><strong>Училище:</strong> .....................................</div>
            <div><strong>Населено място:</strong> ..........................</div>
            <div><strong>Квестор 1:</strong> ...................................</div>
            <div><strong>Квестор 2:</strong> ...................................</div>
          </div>

          <div className="text-[9px] text-slate-500 text-center uppercase tracking-wider border-t border-dotted border-black/40 pt-1">
            - - - - - - - - - - - - Отрязък за запечатване в малък плик за анонимност - - - - - - - - - - - -
          </div>
        </div>

        {/* Paper Title Header */}
        <div className="border-b-2 border-black pb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Официален изпитен формат съгласно ДОС на МОН
            </span>
            <span className="text-sm font-black uppercase px-2.5 py-0.5 border-2 border-black bg-slate-100 print:bg-transparent">
              Вариант {activeGroup}
            </span>
          </div>

          <div className="text-center py-1">
            <h1 className="text-xl sm:text-2xl font-black uppercase">
              Изпитна работа по {currentLesson.subject}
            </h1>
            <p className="text-sm font-bold mt-1 text-slate-800">
              Тема: {currentLesson.title} ({currentLesson.grade})
            </p>
          </div>

          {/* Student Fill-in Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-medium border-t border-black/30">
            <div>Ученик: .......................................</div>
            <div>Клас: ............ Номер: ......</div>
            <div>Дата: ........................</div>
            <div className="text-right font-bold">Оценка: ............. (..../100 т.)</div>
          </div>
        </div>

        {/* Official МОН Answer Matrix Sheet (Бланка за отговори) */}
        {includeAnswerSheet && (
          <div className="border-2 border-black p-4 space-y-3 bg-white print:break-before-page">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider">
                  ЛИСТ ЗА ОТГОВОРИ • МИНИСТЕРСТВО НА ОБРАЗОВАНИЕТО И НАУКАТА
                </h3>
                <p className="text-[10px] text-slate-600 mt-0.5">
                  Попълва се само със <strong>син химикал</strong>. Верен отговор се отбелязва със знак <strong>Х</strong>.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black uppercase px-2 py-0.5 border border-black">
                  ВАРИАНТ {activeGroup}
                </span>
              </div>
            </div>

            {/* Bubble Matrix Table */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-800">
                Модул 1: Задачи със структуриран отговор
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {currentQuestions.map((q, qIdx) => (
                  <div key={q.id} className="flex items-center justify-between border border-black/40 px-2 py-1.5 text-xs">
                    <span className="font-bold w-6">{qIdx + 1}.</span>
                    <div className="flex items-center gap-2">
                      {['А', 'Б', 'В', 'Г'].map((letter) => (
                        <div key={letter} className="flex items-center gap-0.5">
                          <span className="w-5 h-5 border border-black flex items-center justify-center font-bold text-[10px]">
                            {letter}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Correction Protocol */}
            <div className="border-t border-black/30 pt-2 flex flex-wrap items-center justify-between text-[9px] text-slate-600 gap-2">
              <span>Ако сгрешите, зачертайте грешния отговор плътно и отбележете новия със знак Х.</span>
              <span className="font-bold text-slate-900">Точки от Модул 1: ....... / 40 т.</span>
            </div>
          </div>
        )}

        {/* Section 1: Multiple Choice Questions */}
        <div className="space-y-5 pt-2">
          <div className="flex items-center justify-between border-b border-black/40 pb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider">
              I. МОДУЛ 1: Въпроси със структуриран отговор (по {Number((40 / Math.max(1, currentQuestions.length)).toFixed(1))} т. за верен отговор)
            </h3>
            <span className="text-xs text-slate-600 font-medium">Общо: 40 т.</span>
          </div>

          <div className="space-y-4">
            {currentQuestions.map((q, idx) => (
              <div key={q.id} className="space-y-1.5 text-xs">
                <div className="font-bold flex items-start gap-2">
                  <span>{idx + 1}.</span>
                  <span>{q.question}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pl-4 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const letters = ['А', 'Б', 'В', 'Г'];
                    return (
                      <div key={oIdx} className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center font-bold text-[10px]">
                          {letters[oIdx]}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Open Conceptual Question (From checklist) */}
        {checklist.length > 0 && (
          <div className="space-y-3 pt-3">
            <div className="flex items-center justify-between border-b border-black/40 pb-1">
              <h3 className="text-xs font-bold uppercase tracking-wider">
                II. МОДУЛ 2: Въпроси със свободен отговор и дефиниране на понятия
              </h3>
              <span className="text-xs text-slate-600 font-medium">Общо: 30 т.</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <p className="font-bold">
                  {currentQuestions.length + 1}. Запишете основната дефиниция или зависимост за: „{checklist[0].requirement}“ (15 т.)
                </p>
                <div className="h-14 border border-dashed border-slate-400 rounded p-2 text-slate-400 italic">
                  Място за отговор на ученика...
                </div>
              </div>

              {checklist.length > 1 && (
                <div className="space-y-1">
                  <p className="font-bold">
                    {currentQuestions.length + 2}. Обяснете защо се изисква: „{checklist[1].whyNeeded}“ (15 т.)
                  </p>
                  <div className="h-14 border border-dashed border-slate-400 rounded p-2 text-slate-400 italic">
                    Място за отговор на ученика...
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 3: Module 3 Extended Analytic Task (ДЗИ 41. задача / ДИППК Задание / НВО разширен отговор) */}
        {includeModule3 && (
          <div className="space-y-3 pt-4 border-t-2 border-black">
            <div className="flex items-center justify-between border-b border-black/40 pb-1">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider">
                  {isVocationalDippk
                    ? 'III. МОДУЛ 3: ДИППК Практическо и инженерно задание (Трета СПК по Наредба № 1) — 30 т.'
                    : currentLesson.subject.includes('литература') || currentLesson.subject.includes('БЕЛ')
                    ? 'III. МОДУЛ 3: Аргументативен текст (Интерпретативно съчинение или есе) — 30 т.'
                    : currentLesson.subject.includes('Математика')
                    ? 'III. МОДУЛ 3: Задачи с пълно аналитично и геометрично решение — 30 т.'
                    : currentLesson.subject.includes('Физика') || currentLesson.subject.includes('Химия') || currentLesson.subject.includes('Биология')
                    ? 'III. МОДУЛ 3: Експериментална и изчислителна STEM задача — 30 т.'
                    : 'III. МОДУЛ 3: Разширен анализ на исторически казус и извори — 30 т.'}
                </h3>
                <p className="text-[10px] text-slate-600">
                  {isVocationalDippk
                    ? 'Разработете технологичен маршрут, принципна схема / програмен модул и посочете приложимите стандарти (БДС / ISO) и правила по ЗБУТ.'
                    : currentLesson.subject.includes('литература') || currentLesson.subject.includes('БЕЛ')
                    ? 'Създайте текст в обем до 4 страници. Формулирайте ясна теза, подкрепена с аргументи и коментар върху текста.'
                    : currentLesson.subject.includes('Математика')
                    ? 'Опишете подробно всички етапи на решението, дефиниционните области и чертежи.'
                    : currentLesson.subject.includes('Физика') || currentLesson.subject.includes('Химия') || currentLesson.subject.includes('Биология')
                    ? 'Запишете всички физични закони / химични уравнения, изведете работната формула и проверете размерностите в SI.'
                    : 'Анализирайте историческия контекст, причинно-следствените връзки и цитираните извори.'}
                </p>
              </div>
              <span className="text-xs font-bold text-slate-800">30 точки</span>
            </div>

            {/* Formatted ruled writing lines or calculation area */}
            <div className="border border-black p-3.5 space-y-3 bg-white min-h-[170px]">
              <div className="text-[11px] font-bold text-slate-900">
                {isVocationalDippk
                  ? `Дипломно / Практическо задание (Вариант ${activeGroup}): „Проектиране, диагностика и технологично изпълнение по тема «${currentLesson.title}» (${currentLesson.subject})“`
                  : currentLesson.subject.includes('литература') || currentLesson.subject.includes('БЕЛ')
                  ? `Тема за съчинение / есе: „Моралните дилеми и цената на компромиса в «${currentLesson.title}»“`
                  : currentLesson.subject.includes('Математика')
                  ? `Задача с пълно доказателство по темата: „${currentLesson.title}“ (Чертожна и изчислителна площ)`
                  : currentLesson.subject.includes('Физика') || currentLesson.subject.includes('Химия') || currentLesson.subject.includes('Биология')
                  ? `Изследователски STEM казус: „Количествен и лабораторен анализ на процесите в «${currentLesson.title}»“`
                  : `Исторически казус: „Последици и историческо значение на събитията около «${currentLesson.title}»“`}
              </div>

              {/* Lined writing guide */}
              <div className="space-y-4 pt-1">
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-dashed border-slate-300">
                <span>
                  {isVocationalDippk
                    ? 'Оценка от Държавна изпитна комисия (Технологична точност 15 т. + БДС/ISO норми 10 т. + ЗБУТ 5 т.):'
                    : 'Оценка на Модул 3 (критерии на МОН за теза, аргументация и езикова норма):'}
                </span>
                <span className="font-bold text-slate-900">Точки: ...... / 30 т.</span>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Teacher / Parent Answer Key (Optional display) */}
        {showAnswerKey && (
          <div className="mt-8 pt-4 border-t-2 border-dashed border-black/60 bg-amber-50 p-4 text-xs print:bg-white print:border-black space-y-3">
            <div className="flex items-center gap-2 font-bold text-amber-900 print:text-black">
              <ShieldCheck className="w-4 h-4" />
              <span>Ключ с верните отговори, обосновки и критерии за оценка (Вариант {activeGroup}):</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {currentQuestions.map((q, idx) => {
                const letters = ['А', 'Б', 'В', 'Г'];
                return (
                  <div key={q.id} className="p-1.5 rounded bg-white border border-amber-300 font-mono text-[11px] print:border-black">
                    Въпрос {idx + 1}: <strong className="text-blue-900 print:text-black">{letters[q.correctIndex]}</strong>
                  </div>
                );
              })}
            </div>

            {/* Detailed methodological explanations for each question */}
            <div className="space-y-1.5 border-t border-amber-200 pt-2">
              <div className="font-bold text-[11px] text-amber-950 print:text-black">
                Методическа обосновка към въпросите от Модул 1 (Вариант {activeGroup}):
              </div>
              {currentQuestions.map((q, idx) => {
                const letters = ['А', 'Б', 'В', 'Г'];
                return (
                  <div key={`exp-${q.id}`} className="text-[11px] text-slate-700 print:text-black leading-snug">
                    <strong>{idx + 1}. ({letters[q.correctIndex]})</strong> {q.explanation}
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-700 leading-relaxed space-y-1 border-t border-amber-200 pt-2 print:text-black">
              <div><strong>Скала за превръщане на точките в оценка (100 т.):</strong></div>
              <div>• 0 – 29,5 т. = Слаб 2.00 | • 30 – 41,5 т. = Среден 3 (3.00–3.49) | • 42 – 64,5 т. = Добър 4 (3.50–4.49)</div>
              <div>• 65 – 88 т. = Мн. добър 5 (4.50–5.49) | • 88,5 – 100 т. = Отличен 6 (5.50–6.00; 100 т. = 6.00)</div>
            </div>
          </div>
        )}

        {/* Paper Footer */}
        <div className="pt-4 border-t border-black text-center text-[10px] text-slate-600 font-medium">
          StudyBG Учебна платформа • Генерирано за контролна работа съгласно ДОС на МОН
        </div>

      </div>
      ) : (
        /* Official DIPPK Written State Exam Ticket (Част по Теория на професията — 100 т.) */
        <div className="p-8 sm:p-10 rounded-2xl bg-white text-black shadow-lg border border-slate-200 space-y-6 print:shadow-none print:border-none print:p-0">
          <div className="border-2 border-black p-4 space-y-2.5 bg-slate-50/50 print:bg-white text-xs">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] tracking-widest block text-slate-600 font-bold uppercase">
                  РЕПУБЛИКА БЪЛГАРИЯ • МИНИСТЕРСТВО НА ОБРАЗОВАНИЕТО И НАУКАТА
                </span>
                <h2 className="font-black uppercase text-sm tracking-tight text-slate-900">
                  ДЪРЖАВЕН ИЗПИТ ЗА ПРИДОБИВАНЕ НА ТРЕТА СТЕПЕН НА ПРОФЕСИОНАЛНА КВАЛИФИКАЦИЯ (ДИППК • ЧЛ. 38 ОТ ЗПОО)
                </h2>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-black px-2.5 py-1 border-2 border-black uppercase">
                  БИЛЕТ № {activeGroup === 'A' ? '1 (ВАРИАНТ А)' : '2 (ВАРИАНТ Б)'}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed border-black/60 pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div>
                <strong>Професия (Код {activeDippkTicket.professionCode}):</strong> {activeDippkTicket.professionTitle}
              </div>
              <div>
                <strong>Специалност:</strong> {activeDippkTicket.specialtyTitle}
              </div>
              <div>
                <strong>Продължителност:</strong> 4 астрономически часа (Наредба № 1)
              </div>
            </div>
          </div>

          <div className="border-b-2 border-black pb-3 space-y-1 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
              ЧАСТ ПО ТЕОРИЯ НА ПРОФЕСИЯТА — ПИСМЕН ИЗПИТЕН БИЛЕТ (100 ТОЧКИ)
            </div>
            <h1 className="text-lg sm:text-xl font-black uppercase text-slate-900">
              Тема: {activeGroup === 'A' ? activeDippkTicket.ticketTopicA : activeDippkTicket.ticketTopicB}
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-medium border-t border-black/30 text-left">
              <div>Зрелостник: ....................................</div>
              <div>Клас: 12. ...... Вх. №: ............</div>
              <div>Дата: ........................</div>
              <div className="text-right font-bold">Точки: ....../100 т. (Оценка: ..........)</div>
            </div>
          </div>

          {/* Section I: Theoretical Questions (50 pts) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-black pb-1">
              <h3 className="text-xs font-black uppercase">
                РАЗДЕЛ I. ТЕОРЕТИЧНО ИЗЛОЖЕНИЕ ПО СПЕЦИАЛНОСТТА (2 × 25 т. = 50 точки)
              </h3>
              <span className="text-xs font-bold">50 точки</span>
            </div>

            {activeDippkTicket.section1Questions.map((item, idx) => (
              <div key={idx} className="space-y-2 text-xs">
                <div className="font-bold">
                  Въпрос I.{idx + 1}. ({item.points} т.) {item.q}
                </div>
                <div className="border border-dashed border-slate-400 rounded p-3 space-y-3 bg-white">
                  <div className="border-b border-dotted border-slate-400 h-4" />
                  <div className="border-b border-dotted border-slate-400 h-4" />
                  <div className="border-b border-dotted border-slate-400 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Section II: Engineering / Economic / Algorithmic Calculation Task (30 pts) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-black pb-1">
              <h3 className="text-xs font-black uppercase">
                РАЗДЕЛ II. ПРАКТИКО-ПРИЛОЖНА И ИЗЧИСЛИТЕЛНА ЗАДАЧА (30 точки)
              </h3>
              <span className="text-xs font-bold">30 точки</span>
            </div>

            <div className="text-xs space-y-2">
              <div className="font-bold">
                Задача II.1. (30 т. • Вариант {activeGroup}):{' '}
                {activeGroup === 'A'
                  ? activeDippkTicket.section2CalculationTaskA.prompt
                  : activeDippkTicket.section2CalculationTaskB.prompt}
              </div>
              <div className="border border-black rounded p-3 space-y-3 bg-white">
                <div className="text-[10px] text-slate-500 italic">
                  Място за математическо/инженерно решение, код, счетоводни статии и диаграми:
                </div>
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
                <div className="border-b border-dotted border-slate-400 h-5" />
              </div>
            </div>
          </div>

          {/* Section III: ZBUT, BDS/ISO Standards & Normative Regulation (20 pts) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-black pb-1">
              <h3 className="text-xs font-black uppercase">
                РАЗДЕЛ III. ЗБУТ, СТАНДАРТИЗАЦИЯ (БДС / ISO) И НОРМАТИВНА УРЕДБА (20 точки)
              </h3>
              <span className="text-xs font-bold">20 точки</span>
            </div>

            <div className="text-xs space-y-2">
              <div className="font-bold">
                Въпрос III.1. ({activeDippkTicket.section3ZbutAndStandards.points} т.):{' '}
                {activeDippkTicket.section3ZbutAndStandards.prompt}
              </div>
              <div className="border border-dashed border-slate-400 rounded p-3 space-y-3 bg-white">
                <div className="border-b border-dotted border-slate-400 h-4" />
                <div className="border-b border-dotted border-slate-400 h-4" />
              </div>
            </div>
          </div>

          {/* Official MON Ordinance No. 1 Grading Scale Box */}
          <div className="p-3 border-2 border-black bg-slate-50 print:bg-white text-[11px] space-y-1">
            <div className="font-black uppercase">
              Официална скала за превръщане на точките в оценка за ДИППК по Наредба № 1 на МОН:
            </div>
            <div>
              • Минимум за успешно полагане: <strong>50,00 точки = Среден (3.00)</strong> • Формула за P ≥ 50 т.:{' '}
              <strong>Оценка = 3 + 3 × (P - 50) / 50</strong> (50–58 т. = Среден 3 | 59–74 т. = Добър 4 | 75–91 т. = Мн. добър 5 | 92–100 т. = Отличен 6).
            </div>
          </div>

          {/* Commission Evaluation Answer Key */}
          {showAnswerKey && (
            <div className="mt-6 pt-4 border-t-2 border-dashed border-black bg-amber-50 p-4 text-xs print:bg-white space-y-2.5">
              <div className="font-black text-amber-950 print:text-black uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Методически ключ и точкови критерии за Държавната изпитна комисия (Вариант {activeGroup}):</span>
              </div>
              {activeDippkTicket.section1Questions.map((item, idx) => (
                <div key={idx} className="text-[11px]">
                  <strong>Критерии за Въпрос I.{idx + 1} (25 т.):</strong> {item.keyCriteria}
                </div>
              ))}
              <div className="text-[11px]">
                <strong>Еталонно решение на Задача II.1 (30 т.):</strong>{' '}
                {activeGroup === 'A'
                  ? activeDippkTicket.section2CalculationTaskA.solutionSteps
                  : activeDippkTicket.section2CalculationTaskB.solutionSteps}
              </div>
              <div className="text-[11px]">
                <strong>Критерии за Раздел III — ЗБУТ и БДС/ISO (20 т.):</strong>{' '}
                {activeDippkTicket.section3ZbutAndStandards.normativeKey}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-black flex items-center justify-between text-[10px] text-slate-700 font-medium">
            <span>Председател на Държавната изпитна комисия: ...............................</span>
            <span>Членове (Оценители): 1. ..................... 2. .....................</span>
          </div>
        </div>
      )}

    </div>
  );
};
