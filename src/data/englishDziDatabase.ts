export interface SentenceTransformationItem {
  id: string;
  cefrLevel: 'B1.1' | 'B2' | 'C1 / ESP';
  category:
    | 'Conditionals & Wishes'
    | 'Passive & Causative'
    | 'Reported Speech'
    | 'Inversion (B2)'
    | 'Modals & Past Deduction'
    | 'Comparison & Clauses'
    | 'C1 / Technical ESP';
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
  cefrLevel: 'B1.1' | 'B2' | 'C1 / ESP';
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
  cefrLevel: 'B1.1' | 'B2' | 'C1 / ESP';
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
  },
  {
    id: 'eng-tr-11',
    cefrLevel: 'C1 / ESP',
    category: 'C1 / Technical ESP',
    originalSentence: 'If the firewall had not blocked the malicious packet, the entire database would be compromised now.',
    keyWord: 'BUT',
    promptPrefix: 'But for',
    promptSuffix: ', the entire database would be compromised now.',
    options: [
      'the firewall blocking the malicious packet',
      'the firewall had blocked the malicious packet',
      'blocking the firewall the malicious packet',
      'if the firewall blocked the malicious packet'
    ],
    correctIndex: 0,
    grammarRule: 'Mixed Conditional with "But for" / "Were it not for" / "Had it not been for" + Noun Phrase / Gerund',
    monExamTrap: 'След израза "But for" (Ако не беше...) ЗАДЪЛЖИТЕЛНО следва съществително име или герундий (Noun Phrase), а НЕ глаголно изречение с "had"!',
    explanationBg: 'В смесено условно изречение (минала причина -> настоящ резултат) "If it had not been for..." се трансформира на ниво C1 чрез "But for + the firewall blocking...".'
  },
  {
    id: 'eng-tr-12',
    cefrLevel: 'C1 / ESP',
    category: 'C1 / Technical ESP',
    originalSentence: 'The lead DevOps engineer insisted that we deploy the security patch immediately.',
    keyWord: 'DEPLOYED',
    promptPrefix: 'The lead DevOps engineer insisted that the security patch',
    promptSuffix: 'immediately.',
    options: [
      'be deployed',
      'is deployed',
      'was deployed',
      'would be deployed'
    ],
    correctIndex: 0,
    grammarRule: 'Mandative Subjunctive (C1): insist / demand / recommend / suggest + that + Subject + (should) + bare infinitive (be + V3)',
    monExamTrap: 'След глаголи като insist, demand, recommend, essential that в официален технически и юридически стил се използва Subjunctive Mood — основна форма "be deployed" без спрягане по време!',
    explanationBg: 'В официалния английски (C1 / ESP) след "insisted that" в страдателен залог се използва Subjunctive форма: "(should) be deployed".'
  },
  {
    id: 'eng-tr-13',
    cefrLevel: 'C1 / ESP',
    category: 'Inversion (B2)',
    originalSentence: 'You must not share your private cryptographic key under any circumstances.',
    keyWord: 'CIRCUMSTANCES',
    promptPrefix: 'Under no circumstances',
    promptSuffix: 'your private cryptographic key.',
    options: [
      'must you share',
      'you must share',
      'mustn\'t you share',
      'do you must share'
    ],
    correctIndex: 0,
    grammarRule: 'Negative Prepositional Phrase ("Under no circumstances") + Affirmative Auxiliary + Subject + Bare Infinitive',
    monExamTrap: 'Тъй като "Under no circumstances" вече съдържа отрицанието "no", спомагателният глагол след него е в ПОЛОЖИТЕЛНА форма с инверсия ("must you share" / "should you share"), без второ отрицание!',
    explanationBg: 'Отрицателният израз в началото изисква инверсия с положителен модален глагол: "Under no circumstances must you share...".'
  },
  {
    id: 'eng-tr-14',
    cefrLevel: 'C1 / ESP',
    category: 'C1 / Technical ESP',
    originalSentence: 'The unindexed SQL query caused the severe server latency.',
    keyWord: 'WHAT',
    promptPrefix: 'What caused the severe server latency',
    promptSuffix: 'the unindexed SQL query.',
    options: [
      'was',
      'it was',
      'has been',
      'were'
    ],
    correctIndex: 0,
    grammarRule: 'Wh-Cleft Sentence for Emphasis: What + Clause + is/was + Emphasised Noun Phrase',
    monExamTrap: 'При Wh-Cleft изречение ("What caused ... was ...") цялата подчинена част с "What" играе ролята на подлог, затова след нея следва директно "was", БЕЗ допълнително местоимение "it"!',
    explanationBg: 'Емфатичната Cleft конструкция акцентира върху причината: "What caused the severe server latency was the unindexed SQL query."'
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
    contextSentence: 'Nothing can ________ the time lost during the first months of preparation.',
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
  },
  {
    id: 'pv-9',
    cefrLevel: 'C1 / ESP',
    phrasalVerb: 'carry out',
    formalEquivalent: 'conduct / perform / execute',
    meaningBg: 'провеждам, извършвам (експеримент, одит, тест, разследване)',
    contextSentence: 'The cybersecurity team will ________ a comprehensive penetration test on the production cluster.',
    options: ['carry out', 'carry on', 'carry off', 'carry over'],
    correctIndex: 0,
    monTip: 'Ключова колокация за STEM и ДИППК: "carry out an experiment / an audit / a test / research".'
  },
  {
    id: 'pv-10',
    cefrLevel: 'C1 / ESP',
    phrasalVerb: 'phase out',
    formalEquivalent: 'gradually discontinue / decommission',
    meaningBg: 'поетапно извеждам от употреба (остаряла технология, система)',
    contextSentence: 'The company plans to ________ legacy IPv4 routers and migrate entirely to IPv6 by next quarter.',
    options: ['phase out', 'phase in', 'wipe out', 'rule out'],
    correctIndex: 0,
    monTip: 'Антонимът е "phase in" (въвеждам поетапно в експлоатация).'
  },
  {
    id: 'pv-11',
    cefrLevel: 'C1 / ESP',
    phrasalVerb: 'back up',
    formalEquivalent: 'substantiate (a claim) / create a redundant data copy',
    meaningBg: 'подкрепям с доказателства (теза); правя резервно копие на данни',
    contextSentence: 'In an academic essay, you must always ________ your arguments with verifiable empirical evidence.',
    options: ['back up', 'back down', 'back out', 'fall back'],
    correctIndex: 0,
    monTip: 'Двойно значение за матура и ИТ: 1) подкрепям твърдение с факти; 2) архивирам база данни.'
  },
  {
    id: 'pv-12',
    cefrLevel: 'C1 / ESP',
    phrasalVerb: 'draw up',
    formalEquivalent: 'draft / prepare an official document or contract',
    meaningBg: 'изготвям, съставям (договор, техническа спецификация, план)',
    contextSentence: 'Our legal and engineering departments have been asked to ________ a detailed technical specification.',
    options: ['draw up', 'draw in', 'draw out', 'draw back'],
    correctIndex: 0,
    monTip: 'Стандартна бизнес и юридическа колокация: "draw up a contract / a specification / a budget".'
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
    modelPrompt: 'You have seen an advertisement for a European Youth Leadership Exchange in Brussels. Write a formal email asking about the programme dates, accommodation, and eligibility criteria.',
    modelOpening: 'Dear Sir or Madam,\n\nI am writing with regard to the advertisement for the European Youth Leadership Exchange in Brussels, which I recently saw on your official website. As a twelfth-grade student with a keen interest in European affairs, I would be grateful if you could provide me with some additional details.'
  },
  {
    id: 'wb-tech-report',
    genre: 'Technical Proposal / Audit Report (C1 / ESP)',
    titleBg: 'Технически доклад / Proposal със секционни заглавия (ДЗИ Профил B2/C1 & ДИППК)',
    cefrLevel: 'C1 / ESP',
    wordCountRange: { min: 180, max: 250, label: '190–240 думи (B2/C1 Report & Proposal)' },
    register: 'formal',
    monCriteria: [
      'Задължително използване на подзаглавия (Subheadings: Introduction, Current Infrastructure / Findings, Recommendations, Conclusion);',
      'Безличен, обективен тон с честа употреба на Passive Voice ("It is recommended that...", "A vulnerability was identified in...");',
      'Употреба на Mandative Subjunctive и модални конструкции за препоръки ("It is imperative that the system be upgraded...");',
      'Ясно разграничаване между констатирани факти и конкретни инженерни/организационни мерки.'
    ],
    structureBlocks: [
      {
        paragraphTitle: '1. Title & Introduction (Заглавие и цел на доклада)',
        purposeBg: 'Формулирайте точна цел на доклада (напр. одит на информационната сигурност, модернизация на лаборатория или енергийна ефективност).',
        phrasesEn: [
          'Subject: Technical Assessment and Modernisation Proposal for the School STEM Infrastructure',
          'The purpose of this report is to evaluate the current state of ... and to outline actionable recommendations for...',
          'This assessment is based on recent performance metrics and feedback collected from...'
        ]
      },
      {
        paragraphTitle: '2. Key Findings & Bottlenecks (Констатирано състояние и проблеми)',
        purposeBg: 'Опишете обективно установените дефицити, рискове или технически ограничения.',
        phrasesEn: [
          'During the initial audit, several critical bottlenecks were identified regarding network latency and...',
          'Furthermore, a significant proportion of the existing hardware fails to comply with modern ISO standards.',
          'What caused the recent service interruption was the lack of automated backup redundancy.'
        ]
      },
      {
        paragraphTitle: '3. Actionable Recommendations (Конкретни препоръки и мерки)',
        purposeBg: 'Предложете 2–3 измерими решения с очаквания положителен ефект.',
        phrasesEn: [
          'In light of these findings, it is strongly recommended that legacy servers be phased out immediately.',
          'Moreover, implementing multi-factor authentication (MFA) would substantially reduce security risks.',
          'Were the institution to invest in cloud-based simulation tools, student engagement would increase markedly.'
        ]
      }
    ],
    modelPrompt: 'Your school principal has asked you to write a formal report evaluating the school\'s computer and STEM laboratories and proposing specific technical upgrades for the upcoming academic year.',
    modelOpening: 'Subject: Technical Assessment and Upgrade Proposal for the STEM Laboratories\n\nIntroduction\nThe purpose of this report is to evaluate the current hardware and software infrastructure of our school\'s STEM laboratories and to propose strategic upgrades for the upcoming academic year.'
  },
  {
    id: 'wb-cover-letter',
    genre: 'EUROPASS Internship & University Motivation Letter',
    titleBg: 'Мотивационно писмо за стаж в ИТ/Инженерна компания или Университет (B2 / C1)',
    cefrLevel: 'C1 / ESP',
    wordCountRange: { min: 150, max: 220, label: '160–210 думи (B2/C1 Cover Letter)' },
    register: 'formal',
    monCriteria: [
      'Ясно посочване на позицията/програмата, за която кандидатствате, и източника на информация;',
      'Конкретно обвързване на придобитите компетентности (Трета СПК / профилирана подготовка, проекти, сертификати) с изискванията;',
      'Използване на Present Perfect за постижения и опит ("I have developed...", "I have completed...") и висок академичен стил;',
      'Официален финал с готовност за интервю и събеседване.'
    ],
    structureBlocks: [
      {
        paragraphTitle: '1. Opening & Position Reference (Откриващ абзац и позиция)',
        purposeBg: 'Посочете точната стажантска програма или университетска специалност.',
        phrasesEn: [
          'Dear Hiring Manager, / Dear Admissions Committee,',
          'I am writing to express my strong interest in the Junior Software Engineering Internship programme advertised on...',
          'As a graduating twelfth-grade student specialising in Applied Programming (EQF Level 4), I am eager to contribute to...'
        ]
      },
      {
        paragraphTitle: '2. Academic & Technical Competencies (Професионални умения и проекти)',
        purposeBg: 'Представете дипломния си проект, техническите умения и резултатите от олимпиади/практика.',
        phrasesEn: [
          'Throughout my vocational training, I have acquired hands-on experience in designing relational databases and RESTful APIs.',
          'In addition, my diploma thesis involved carrying out a full security audit and implementing automated CI/CD pipelines.',
          'Not only have these projects strengthened my analytical skills, but they have also taught me how to collaborate effectively.'
        ]
      },
      {
        paragraphTitle: '3. Call to Action & Formal Sign-off (Готовност за интервю и финал)',
        purposeBg: 'Заявете готовност за техническо интервю и благодарете за отделеното време.',
        phrasesEn: [
          'I would welcome the opportunity to discuss how my technical background aligns with your team\'s objectives during an interview.',
          'Thank you for considering my application. I look forward to hearing from you.',
          'Yours faithfully, (при Dear Hiring Manager / Dear Admissions Committee) / Yours sincerely, (при конкретно име)'
        ]
      }
    ],
    modelPrompt: 'Write a formal motivation letter applying for a summer engineering or IT internship at an international company, highlighting your technical skills, diploma project, and career goals.',
    modelOpening: 'Dear Hiring Manager,\n\nI am writing to apply for the Summer Engineering Internship Programme recently advertised on your corporate portal. As a final-year vocational high school student completing my Third Degree of Professional Qualification (EQF Level 4), I am keen to apply my technical knowledge in a dynamic industrial environment.'
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
