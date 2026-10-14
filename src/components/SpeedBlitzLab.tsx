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

export type BlitzCategory = 'all' | 'bel' | 'math' | 'history' | 'english' | 'civics';

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
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [deck, setDeck] = useState<BlitzQuestion[]>(BLITZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [score, setScore] = useState<number>(0);
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
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const filteredPool = useMemo(() => {
    if (selectedCategory === 'all') return BLITZ_QUESTIONS;
    return BLITZ_QUESTIONS.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQuestion = deck[currentIndex % deck.length] || BLITZ_QUESTIONS[0];

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
    [gameState, currentQuestion, streak, maxStreak]
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
    { id: 'all', label: 'Пълен Микс за 6.00', badge: '25 въпроса' },
    { id: 'bel', label: 'БЕЛ Правопис & Канон', badge: 'ДЗИ & НВО' },
    { id: 'math', label: 'Математика & STEM', badge: 'Формули' },
    { id: 'history', label: 'История & География', badge: '681–2007' },
    { id: 'english', label: 'Английски език', badge: 'B1.1 & B2' },
    { id: 'civics', label: 'Конституция & ЕС', badge: 'ГО & ДЗИ' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Speed Blitz 6.00 • 60-секунден състезателен тренажор</span>
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
              Готов ли си за 60-секундния Блиц?
            </h2>
            <p className="text-sm text-slate-600">
              Избрана категория: <strong className="text-slate-900">{categories.find(c => c.id === selectedCategory)?.label}</strong>.
              Можеш да отговаряш както с мишка/докосване, така и светкавично с клавишите <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs font-mono">1</kbd> – <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs font-mono">4</kbd>.
            </p>
          </div>

          <button
            onClick={startBlitz}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-sm transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>СТАРТИРАЙ 60 СЕКУНДИ БЛИЦ</span>
          </button>
        </div>
      )}

      {/* GAME STATE 2: ACTIVE 60-SECOND GAMEPLAY */}
      {gameState === 'playing' && (
        <div className="bg-white border-2 border-blue-600 rounded-2xl p-5 sm:p-8 shadow-sm space-y-6">
          {/* Top HUD: Timer, Score, Streak Multiplier */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
              <Timer
                className={`w-6 h-6 shrink-0 ${
                  secondsLeft <= 10 ? 'text-rose-600 animate-bounce' : 'text-blue-600'
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
                <div className="text-[10px] font-bold uppercase text-slate-400">Точки</div>
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
                  <span className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 font-bold text-sm flex items-center justify-center shrink-0 transition-colors">
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
