export interface SentenceTransformationItem {
  id: string;
  cefrLevel: 'B1.1' | 'B2';
  category:
    | 'Conditionals & Wishes'
    | 'Passive & Causative'
    | 'Reported Speech'
    | 'Inversion (B2)'
    | 'Modals & Past Deduction'
    | 'Comparison & Clauses';
  originalSentence: string;
  keyWord: string;
  promptPrefix: string;
  promptSuffix: string;
  options: string[];
  correctIndex: number;
  grammarRule: string;
  monExamTrap: string;
  explanationBg: string;
}

export interface PhrasalVerbItem {
  id: string;
  cefrLevel: 'B1.1' | 'B2';
  phrasalVerb: string;
  formalEquivalent: string;
  meaningBg: string;
  contextSentence: string;
  options: string[];
  correctIndex: number;
  monTip: string;
}

export interface WritingBlueprint {
  id: string;
  genre: string;
  titleBg: string;
  cefrLevel: 'B1.1' | 'B2';
  wordCountRange: { min: number; max: number; label: string };
  register: 'formal' | 'semi-formal';
  monCriteria: string[];
  structureBlocks: {
    paragraphTitle: string;
    purposeBg: string;
    phrasesEn: string[];
  }[];
  modelPrompt: string;
  modelOpening: string;
}

export const ENGLISH_TRANSFORMATIONS: SentenceTransformationItem[] = [
  {
    id: 'eng-tr-1',
    cefrLevel: 'B2',
    category: 'Inversion (B2)',
    originalSentence: 'I have never seen such a well-organised science exhibition before.',
    keyWord: 'NEVER',
    promptPrefix: 'Never before',
    promptSuffix: 'such a well-organised science exhibition.',
    options: [
      'have I seen',
      'I have seen',
      'did I saw',
      'had I see'
    ],
    correctIndex: 0,
    grammarRule: 'Negative Adverbial + Auxiliary Verb + Subject + Main Verb (Never before + have + I + seen)',
    monExamTrap: 'На ДЗИ B2 след отрицателно наречие в началото на изречението (Never, Rarely, Seldom, Little) ЗАДЪЛЖИТЕЛНО се прилага словореда на въпросително изречение (инверсия).',
    explanationBg: 'Когато изречението започва с "Never before", спомагателният глагол "have" минава пред подлога "I": "Never before have I seen...".'
  },
  {
    id: 'eng-tr-2',
    cefrLevel: 'B1.1',
    category: 'Conditionals & Wishes',
    originalSentence: 'I missed the morning train because I overslept.',
    keyWord: 'NOT',
    promptPrefix: 'If I',
    promptSuffix: ', I would not have missed the morning train.',
    options: [
      'had not overslept',
      'did not oversleep',
      'would not oversleep',
      'have not overslept'
    ],
    correctIndex: 0,
    grammarRule: 'Third Conditional: If + Past Perfect (had + V3), would have + V3',
    monExamTrap: 'Никога не поставяйте "would" в подчиненото изречение след "If" (грешка: "If I would not have overslept"). За нереално минало условие се използва Past Perfect (had not overslept).',
    explanationBg: 'Ситуацията се отнася за миналото (нереално условие в миналото — Type 3 Conditional), затова след "If" използваме Past Perfect: "If I had not overslept...".'
  },
  {
    id: 'eng-tr-3',
    cefrLevel: 'B1.1',
    category: 'Passive & Causative',
    originalSentence: 'A professional technician is repairing our school computers right now.',
    keyWord: 'REPAIRED',
    promptPrefix: 'We are',
    promptSuffix: 'by a professional technician right now.',
    options: [
      'having our school computers repaired',
      'repairing our school computers',
      'had our school computers repaired',
      'having repaired our school computers'
    ],
    correctIndex: 0,
    grammarRule: 'Causative Form: have / get + Object + Past Participle (V3)',
    monExamTrap: 'Внимавайте със словореда при Causative! Обектът ("our school computers") стои МЕЖДУ формата на "have" ("are having") и миналото причастие ("repaired").',
    explanationBg: 'Когато друг извършва услуга за нас, използваме Causative конструкция в същото глаголно време (Present Continuous): "are having + our school computers + repaired".'
  },
  {
    id: 'eng-tr-4',
    cefrLevel: 'B2',
    category: 'Reported Speech',
    originalSentence: '"I am really sorry that I broke your tablet," Stefan said to Maria.',
    keyWord: 'APOLOGISED',
    promptPrefix: 'Stefan',
    promptSuffix: 'Maria\'s tablet.',
    options: [
      'apologised for breaking',
      'apologised to break',
      'apologised that he broke',
      'apologised of breaking'
    ],
    correctIndex: 0,
    grammarRule: 'apologise (to somebody) FOR + Gerund (-ing) / having + V3',
    monExamTrap: 'Глаголът "apologise" изисква предлога "for", последван от герундий (-ing форма), а НЕ инфинитив с "to".',
    explanationBg: 'След reporting глагола "apologise" използваме предлога "for" + "-ing" форма на глагола: "apologised for breaking" (или "for having broken").'
  },
  {
    id: 'eng-tr-5',
    cefrLevel: 'B2',
    category: 'Modals & Past Deduction',
    originalSentence: 'I am absolutely sure that Elena didn\'t forget about our meeting.',
    keyWord: 'HAVE',
    promptPrefix: 'Elena',
    promptSuffix: 'about our meeting.',
    options: [
      'can\'t have forgotten',
      'mustn\'t have forgotten',
      'shouldn\'t have forgotten',
      'may not forget'
    ],
    correctIndex: 0,
    grammarRule: 'Negative Logical Deduction in the Past: can\'t / couldn\'t + have + V3',
    monExamTrap: 'За отрицателно умозаключение в миналото („няма начин да е...“) се използва "can\'t have + V3", а НЕ "mustn\'t have + V3"!',
    explanationBg: 'Когато сме сигурни, че нещо НЕ се е случило в миналото, използваме "can\'t have + Past Participle" ("can\'t have forgotten").'
  },
  {
    id: 'eng-tr-6',
    cefrLevel: 'B1.1',
    category: 'Conditionals & Wishes',
    originalSentence: 'It is a pity that I don\'t speak Spanish fluently.',
    keyWord: 'WISH',
    promptPrefix: 'I',
    promptSuffix: 'Spanish fluently.',
    options: [
      'wish I spoke',
      'wish I speak',
      'wish I would speak',
      'wish I had spoken'
    ],
    correctIndex: 0,
    grammarRule: 'Wish about the Present: I wish / If only + Past Simple',
    monExamTrap: 'Съжаление за настоящ факт ("don\'t speak") се изразява с Past Simple след "I wish" ("I wish I spoke"), а Past Perfect се пази само за минали събития.',
    explanationBg: 'Тъй като изречението описва настоящето ("don\'t speak"), след "I wish" връщаме едно време назад към Past Simple: "I wish I spoke".'
  },
  {
    id: 'eng-tr-7',
    cefrLevel: 'B2',
    category: 'Passive & Causative',
    originalSentence: 'People believe that the ancient treasure is hidden in the Rhodope Mountains.',
    keyWord: 'BELIEVED',
    promptPrefix: 'The ancient treasure',
    promptSuffix: 'in the Rhodope Mountains.',
    options: [
      'is believed to be hidden',
      'believed to hide',
      'is believed that is hidden',
      'has believed to be hidden'
    ],
    correctIndex: 0,
    grammarRule: 'Personal Passive Construction: Subject + is believed/thought/said + to-infinitive',
    monExamTrap: 'Когато подлогът излиза на първо място ("The ancient treasure"), след "is believed" задължително следва инфинитив с "to" ("to be hidden"), а не "that".',
    explanationBg: 'Личната пасивна конструкция на ДЗИ B2 се образува по модела: Подлог + is believed + to be + V3 ("is believed to be hidden").'
  },
  {
    id: 'eng-tr-8',
    cefrLevel: 'B2',
    category: 'Inversion (B2)',
    originalSentence: 'As soon as we had sat down for dinner, the power went out.',
    keyWord: 'HARDLY',
    promptPrefix: 'Hardly',
    promptSuffix: 'for dinner when the power went out.',
    options: [
      'had we sat down',
      'we had sat down',
      'did we sit down',
      'had we sit down'
    ],
    correctIndex: 0,
    grammarRule: 'Hardly / Scarcely + had + Subject + V3 ... when + Past Simple (No sooner ... than)',
    monExamTrap: 'Запомнете двойките съюзи за матурата: "Hardly/Scarcely ... WHEN", но "No sooner ... THAN" — и двете изискват инверсия с Past Perfect ("had we sat down").',
    explanationBg: 'При "Hardly" в началото на изречението прилагаме инверсия в Past Perfect: "Hardly had we sat down... when...".'
  },
  {
    id: 'eng-tr-9',
    cefrLevel: 'B1.1',
    category: 'Comparison & Clauses',
    originalSentence: 'The exam was easier than I had expected.',
    keyWord: 'AS',
    promptPrefix: 'The exam was',
    promptSuffix: 'I had expected.',
    options: [
      'not as difficult as',
      'not so easier as',
      'as easy than',
      'not as easy as'
    ],
    correctIndex: 0,
    grammarRule: 'not as / so + Positive Adjective + as',
    monExamTrap: 'Ако изпитът е бил ПО-ЛЕСЕН от очакваното, значи НЕ е бил толкова ТРУДЕН ("not as difficult as"), колкото сте очаквали! "Not as easy as" обръща смисъла на обратното.',
    explanationBg: 'За да запазим първоначалния смисъл („по-лесен от очакваното“), при отрицателно сравнение използваме антонима в основна степен: "not as difficult as".'
  },
  {
    id: 'eng-tr-10',
    cefrLevel: 'B2',
    category: 'Conditionals & Wishes',
    originalSentence: 'Please don\'t use my laptop without asking me first.',
    keyWord: 'RATHER',
    promptPrefix: 'I would',
    promptSuffix: 'my laptop without asking me first.',
    options: [
      'rather you didn\'t use',
      'rather you don\'t use',
      'rather not to use',
      'rather you wouldn\'t use'
    ],
    correctIndex: 0,
    grammarRule: 'would rather + Different Subject + Past Simple (for present/future preference)',
    monExamTrap: 'Когато след "would rather" има нов подлог ("you"), за настояще и бъдеще се използва Past Simple ("didn\'t use"), а не Present Simple!',
    explanationBg: 'Конструкцията "I\'d rather you + Past Simple" изразява учтива молба или предпочитание спрямо действията на друг човек в настоящето.'
  }
];

export const ENGLISH_PHRASAL_VERBS: PhrasalVerbItem[] = [
  {
    id: 'pv-1',
    cefrLevel: 'B2',
    phrasalVerb: 'put up with',
    formalEquivalent: 'tolerate / endure',
    meaningBg: 'търпя, понасям, примирявам се с',
    contextSentence: 'I cannot ________ that constant noise from the construction site any longer.',
    options: ['put up with', 'put off with', 'come up with', 'get away with'],
    correctIndex: 0,
    monTip: 'Много чест елемент в задачите за синоними: "tolerate" = "put up with".'
  },
  {
    id: 'pv-2',
    cefrLevel: 'B1.1',
    phrasalVerb: 'look forward to',
    formalEquivalent: 'anticipate with pleasure',
    meaningBg: 'очаквам с нетърпение',
    contextSentence: 'We are really looking forward to ________ from you soon.',
    options: ['hearing', 'hear', 'be heard', 'have heard'],
    correctIndex: 0,
    monTip: 'Златно правило за писмата на матурата: в "look forward to" частицата "to" е ПРЕДЛОГ, затова след нея глаголът винаги е с "-ing" ("hearing")!'
  },
  {
    id: 'pv-3',
    cefrLevel: 'B2',
    phrasalVerb: 'come up with',
    formalEquivalent: 'devise / suggest / invent',
    meaningBg: 'измислям, предлагам (идея, решение, план)',
    contextSentence: 'Our team needs to ________ an innovative solution before Friday\'s deadline.',
    options: ['come up with', 'come across with', 'bring up to', 'make up for'],
    correctIndex: 0,
    monTip: 'Винаги се комбинира със съществителни като "an idea", "a plan", "a solution".'
  },
  {
    id: 'pv-4',
    cefrLevel: 'B1.1',
    phrasalVerb: 'call off',
    formalEquivalent: 'cancel',
    meaningBg: 'отменям (събитие, среща, мач)',
    contextSentence: 'Due to the heavy thunderstorm, the organisers had to ________ the open-air concert.',
    options: ['call off', 'put off', 'turn off', 'take off'],
    correctIndex: 0,
    monTip: 'Разграничавайте "call off" (отменям напълно = cancel) от "put off" (отлагам за по-късно = postpone).'
  },
  {
    id: 'pv-5',
    cefrLevel: 'B1.1',
    phrasalVerb: 'put off',
    formalEquivalent: 'postpone / delay',
    meaningBg: 'отлагам за по-късна дата',
    contextSentence: 'Never ________ until tomorrow what you can accomplish today.',
    options: ['put off', 'call off', 'set off', 'give off'],
    correctIndex: 0,
    monTip: 'След "put off" при употреба на втори глагол задължително следва герундий (-ing): "put off making a decision".'
  },
  {
    id: 'pv-6',
    cefrLevel: 'B2',
    phrasalVerb: 'make up for',
    formalEquivalent: 'compensate for',
    meaningBg: 'компенсирам, наваксвам',
    contextSentence: 'Nothing can ________ the time lost during the primeros months of preparation.',
    options: ['make up for', 'make out with', 'do up for', 'get over with'],
    correctIndex: 0,
    monTip: 'Често се пада при Sentence Transformations с ключова дума MAKE в значение на "compensate for".'
  },
  {
    id: 'pv-7',
    cefrLevel: 'B1.1',
    phrasalVerb: 'turn down',
    formalEquivalent: 'reject / refuse / decline',
    meaningBg: 'отхвърлям, отказвам (предложение, покана); намалявам звук',
    contextSentence: 'She was offered a well-paid job abroad, but she decided to ________ the offer.',
    options: ['turn down', 'turn off', 'turn out', 'turn over'],
    correctIndex: 0,
    monTip: '"Turn down an offer/invitation" = отказвам любезно или категорично предложение.'
  },
  {
    id: 'pv-8',
    cefrLevel: 'B2',
    phrasalVerb: 'bring about',
    formalEquivalent: 'cause / lead to / generate',
    meaningBg: 'причинявам, довеждам до (промяна, реформа)',
    contextSentence: 'Artificial intelligence is expected to ________ major transformations in modern education.',
    options: ['bring about', 'bring up', 'bring round', 'bring back'],
    correctIndex: 0,
    monTip: 'Отличен академичен израз за есе на ДЗИ! Не го бъркайте с "bring up" (отглеждам дете / повдигам тема за разговор).'
  }
];

export const ENGLISH_WRITING_BLUEPRINTS: WritingBlueprint[] = [
  {
    id: 'wb-essay-b2',
    genre: 'Opinion / Argumentative Essay',
    titleBg: 'Аргументативно есе (ДЗИ Профилирана B2 & Общообразователна B1.1)',
    cefrLevel: 'B2',
    wordCountRange: { min: 160, max: 240, label: '160–170 думи (B1.1) / 200–220 думи (B2)' },
    register: 'formal',
    monCriteria: [
      'Съответствие със зададената тема и пълно разгръщане на 2 ясно формулирани аргумента с примери;',
      'Логическа структура в 4 абзаца (Introduction, Body Paragraph 1, Body Paragraph 2 / Counter-argument, Conclusion);',
      'Официален академичен регистър — БЕЗ разговорни съкращения (don\'t -> do not, can\'t -> cannot) и БЕЗ жаргон;',
      'Богата гама от свързващи думи (Linking words) и сложни граматични конструкции (Passive, Conditionals, Inversion).'
    ],
    structureBlocks: [
      {
        paragraphTitle: '1. Introduction (Въведение — 35–45 думи)',
        purposeBg: 'Префразирайте темата със свои думи (не преписвайте условието дословно!) и формулирайте своята теза.',
        phrasesEn: [
          'In recent years, the question of whether ... has sparked considerable debate.',
          'It is widely acknowledged that modern technology plays a pivotal role in...',
          'This essay will examine both sides of the issue before presenting a reasoned conclusion.'
        ]
      },
      {
        paragraphTitle: '2. First Body Paragraph (Първи основен аргумент — 55–70 думи)',
        purposeBg: 'Започнете с ясно тематично изречение (Topic Sentence), подкрепете го с обяснение и конкретен пример.',
        phrasesEn: [
          'First and foremost, one of the primary advantages of ... is that...',
          'Furthermore, empirical evidence suggests that students who...',
          'For instance, a recent shift towards digital learning has demonstrated that...'
        ]
      },
      {
        paragraphTitle: '3. Second Body Paragraph / Counter-argument (Втори аргумент / Контратеза — 55–70 думи)',
        purposeBg: 'Представете втората гледна точка или оборете противоположното мнение с академични връзки за контраст.',
        phrasesEn: [
          'On the other hand, critics often point out that...',
          'Nevertheless, despite these valid concerns, the benefits far outweigh the drawbacks.',
          'In addition to this, it should be borne in mind that...'
        ]
      },
      {
        paragraphTitle: '4. Conclusion (Заключение — 30–40 думи)',
        purposeBg: 'Обобщете основните аргументи с нови думи и заявете финалната си позиция, без да въвеждате нови факти.',
        phrasesEn: [
          'Taking everything into account, I firmly believe that...',
          'In conclusion, while there are certain challenges associated with..., its positive impact is undeniable.'
        ]
      }
    ],
    modelPrompt: 'Some people claim that online education will completely replace traditional classrooms in the near future. To what extent do you agree or disagree?',
    modelOpening: 'In recent years, the rapid advancement of digital platforms has transformed the way knowledge is acquired. While virtual learning offers unprecedented flexibility, I firmly believe that it cannot entirely replace the social and pedagogical value of traditional classroom instruction.'
  },
  {
    id: 'wb-formal-letter',
    genre: 'Formal Letter / Email',
    titleBg: 'Официално писмо / Имейл (Кандидатстване, Запитване или Оплакване)',
    cefrLevel: 'B1.1',
    wordCountRange: { min: 120, max: 180, label: '120–130 думи (НВО/B1.1) / 150–170 думи (B2)' },
    register: 'formal',
    monCriteria: [
      'Правилно съответствие между обръщението и финалния поздрав: "Dear Sir or Madam," -> "Yours faithfully," ИЛИ "Dear Mr/Ms [Фамилия]," -> "Yours sincerely,";',
      'Ясно посочване на повода за писане още в първото изречение;',
      'Използване на косвени въпроси (Indirect Questions: "Could you please let me know whether...") вместо преки въпроси;',
      'ВНИМАНИЕ по МОН: В края на писмото на матурата НЕ подписвайте реалното си име (използвайте измисленото име от условието, за да не бъде анулирана работата за нарушена анонимност!).'
    ],
    structureBlocks: [
      {
        paragraphTitle: '1. Salutation & Opening (Обръщение и повод за писмото)',
        purposeBg: 'Посочете веднага защо пишете писмото (обява за стипендия, курс, стаж или сигнал).',
        phrasesEn: [
          'Dear Sir or Madam, / Dear Ms Johnson,',
          'I am writing with regard to your advertisement for the international summer camp published on...',
          'I am writing to apply for the position of youth volunteer advertised in...'
        ]
      },
      {
        paragraphTitle: '2. Main Body — Details & Indirect Questions (Основна част и въпроси)',
        purposeBg: 'Отговорете на всички подточки от заданието на МОН в логическа последователност.',
        phrasesEn: [
          'First of all, I would be grateful if you could provide further information regarding...',
          'Could you please let me know whether accommodation is included in the fee?',
          'Regarding my qualifications, I have obtained a B2 certificate in English and...'
        ]
      },
      {
        paragraphTitle: '3. Polite Closing & Sign-off (Финално изречение и поздрав)',
        purposeBg: 'Завършете с учтива формула за обратна връзка и правилния официален поздрав.',
        phrasesEn: [
          'Thank you in advance for your time and consideration.',
          'I look forward to hearing from you at your earliest convenience.',
          'Yours faithfully, (при Dear Sir/Madam) / Yours sincerely, (при Dear Mr/Ms...)'
        ]
      }
    ],
    modelPrompt: 'You have seen an advertisement for an European Youth Leadership Exchange in Brussels. Write a formal email asking about the programme dates, accommodation, and eligibility criteria.',
    modelOpening: 'Dear Sir or Madam,\n\nI am writing with regard to the advertisement for the European Youth Leadership Exchange in Brussels, which I recently saw on your official website. As a twelfth-grade student with a keen interest in European affairs, I would be grateful if you could provide me with some additional details.'
  }
];

export const ACADEMIC_LINKING_WORDS: { category: string; words: string[] }[] = [
  {
    category: 'Добавяне на аргумент (Addition)',
    words: ['furthermore', 'moreover', 'in addition', 'what is more', 'not only', 'besides']
  },
  {
    category: 'Контраст и отстъпка (Contrast)',
    words: ['nevertheless', 'however', 'on the other hand', 'despite', 'in spite of', 'whereas', 'although', 'even though']
  },
  {
    category: 'Причина и следствие (Cause & Effect)',
    words: ['consequently', 'therefore', 'as a result', 'owing to', 'due to', 'thus', 'hence']
  },
  {
    category: 'Примери и заключение (Examples & Conclusion)',
    words: ['for instance', 'for example', 'in conclusion', 'to sum up', 'taking everything into account', 'all things considered']
  }
];
