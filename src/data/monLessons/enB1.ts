import type { LessonData } from '../../types';

// Английски език, ниво B1 (IX–X клас, продължение на интензивния VIII клас) — по един урок за всяка тема от
// учебната програма на МОН (https://www.mon.bg/nfs/2023/11/up_ae_b1.pdf). Обяснения на български, примери на
// английски; примерните текстове са написани за урока.

const base = { subject: 'Английски език', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ae-b1:${num}`];

export const MON_LESSONS_EN_B1: LessonData[] = [
  {
    ...base,
    id: 'en-b1-me-and-others',
    monTopicIds: ids('1'),
    title: 'Английски B1: Аз и другите — моят свят, междуличностни отношения, реално и виртуално общуване',
    originalNoteExcerpt: 'Тематична област „Аз и другите“: аз и моят свят (семейство, училищна среда); междуличностни отношения (чувства, емоции); социална среда и ценностна система (начини на общуване — реално и виртуално общуване, речеви етикет). Лексика: социални контакти, междуличностни отношения; личност, социална среда и ценности; средства за общуване, социални мрежи. Граматика: Present Perfect Progressive, singular they, used to/would за минали навици.',
    summary: {
      overview:
        'На ниво B1 темата „Аз и другите“ става разговор за ценности: как общуваме лице в лице и онлайн, какво прави едно приятелство силно и какви правила на учтивост важат в различните ситуации.',
      keyPoints: [
        'Междуличностни отношения: peer pressure — натиск от връстниците, generation gap — разлика между поколенията, look up to — възхищавам се на, let someone down — разочаровам някого, stand by someone — подкрепям някого, trust, respect, tolerance — толерантност, empathy — съпричастност.',
        'Реално и виртуално общуване: face-to-face communication, online friendship, post — публикувам, share, comment, follow, block, cyberbullying — кибертормоз, screen time, digital footprint — дигитална следа, fake profile, privacy settings.',
        'Речеви етикет и регистър: формално — Would you mind…? I was wondering if you could…; неформално — Can you…? Any chance you could…?; онлайн етикет (netiquette) — не пиши само с главни букви (това е „викане“), уважавай мнението на другите, мисли преди да публикуваш.',
        'Граматика в темата: Present Perfect Progressive за действие, продължило до сега — I’ve been chatting with her for two hours.; used to/would за минали навици — When I was little, we used to/would visit my grandparents every weekend.; singular they за човек, чийто пол не е посочен — If a student needs help, they should ask the teacher.',
        'Примерен текст: I’ve been using social media since I was twelve, and I must admit it has changed the way I communicate. I used to call my friends; now we mostly text. Online communication is fast, but it can never replace a real conversation. When my best friend was going through a difficult time, a message wasn’t enough — I went to see her. In my opinion, real friends stand by you face to face.',
      ],
      examGoldenRule: 'В текст за общуването давай баланс: предимства и недостатъци на виртуалното общуване, подкрепени с личен пример, и ясна позиция накрая.',
      commonTraps: ['Used to + глагол е за минал навик (I used to swim), а be used to + -ing — „свикнал съм“ (I’m used to getting up early).', 'Would за минал навик не се използва с глаголи-състояния: I used to have a dog (не I would have a dog).'],
      formulasOrDates: [
        { label: 'Отношения', value: 'look up to, let someone down, stand by someone' },
        { label: 'Минали навици', value: 'used to / would' },
        { label: 'Обем', value: '170–200 думи' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b1-me-chk-1', requirement: 'Есе „Реалното и виртуалното приятелство“ (170–200 думи)', whyNeeded: 'Създаването на логически свързан текст с мотиви и аргументи е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Въведение, предимства, недостатъци, пример, позиция.' },
      { id: 'en-b1-me-chk-2', requirement: 'Правила за онлайн етикет на английски', whyNeeded: 'Речевият етикет при виртуално общуване е част от темата.', isEssentialForSix: false, suggestedNotes: 'Поне 8 правила с повелително наклонение.' },
    ],
    flashcards: [
      { id: 'en-b1-me-fc-1', front: 'Как е „натиск от връстниците“?', back: 'peer pressure', tag: 'Отношения' },
      { id: 'en-b1-me-fc-2', front: 'Как е „възхищавам се на някого“ (фразов глагол)?', back: 'look up to someone', tag: 'Отношения' },
      { id: 'en-b1-me-fc-3', front: 'Как е „кибертормоз“?', back: 'cyberbullying', tag: 'Онлайн' },
      { id: 'en-b1-me-fc-4', front: 'Как е „Чатим от два часа“?', back: 'We’ve been chatting for two hours.', tag: 'Граматика' },
      { id: 'en-b1-me-fc-5', front: 'Разлика между used to do и be used to doing?', back: 'used to do — минал навик; be used to doing — свикнал съм.', tag: 'Граматика' },
      { id: 'en-b1-me-fc-6', front: 'Как е „дигитална следа“?', back: 'digital footprint', tag: 'Онлайн' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: I’ve ___ waiting for you for half an hour!', options: ['being', 'been', 'be', 'was'], correctIndex: 1, explanation: 'Present Perfect Progressive.' },
      { id: 2, question: 'Попълнете: When I was a child, I ___ have long hair.', options: ['would', 'am used to', 'used to', 'was used'], correctIndex: 2, explanation: 'Състояние — само used to.' },
      { id: 3, question: 'Какво означава let someone down?', options: ['подкрепям', 'разочаровам', 'запознавам', 'успокоявам'], correctIndex: 1, explanation: 'Разочаровам.' },
      { id: 4, question: 'Попълнете: Everyone should check ___ privacy settings.', options: ['his', 'its', 'our', 'their'], correctIndex: 3, explanation: 'Singular they.' },
      { id: 5, question: 'Кое е най-учтивата молба?', options: ['I was wondering if you could help me.', 'Help me.', 'You help me now.', 'Can help?'], correctIndex: 0, explanation: 'Формален регистър.' },
      { id: 6, question: 'Попълнете: I’m not used to ___ up so early.', options: ['get', 'got', 'getting', 'to get'], correctIndex: 2, explanation: 'Be used to + -ing.' },
    ],
    quickQuestions: ['Как да пиша за социалните мрежи на английски?', 'Каква е разликата между used to и be used to?', 'Какви са правилата на онлайн общуването?'],
  },
  {
    ...base,
    id: 'en-b1-world-around-me',
    monTopicIds: ids('2'),
    title: 'Английски B1: Светът около мен — родното място, мечтите за бъдещето, наука и научни постижения',
    originalNoteExcerpt: 'Тематична област „Светът около мен“: моето родно място — минало, настояще, бъдеще, забележителни личности; моите мечти и представи за бъдещето (образование, професия, дом, семейство); наука и научни постижения (известни учени и техният принос, иновационни технологии). Лексика: наука и научни постижения, иновационни технологии. Граматика: Future Progressive, Future Perfect, безличен страдателен залог (It is thought…), I wish.',
    summary: {
      overview:
        'Темата свързва миналото, настоящето и бъдещето: историята на родното място и неговите личности, нашите мечти за утрешния ден и учените, чиито открития промениха света.',
      keyPoints: [
        'Родното място във времето: It was founded in… — основан е през…; it has changed beyond recognition — променил се е до неузнаваемост; landmark, heritage, prominent figure — видна личност, be famous for. Бъдещето на града: In twenty years’ time the city will have grown. People will be travelling by electric buses.',
        'Мечти и планове: I hope to…, I’m planning to…, My dream is to…, I can see myself working as… — виждам се като…; I wish I could study abroad. — Иска ми се да мога да уча в чужбина.; By the time I’m thirty, I will have graduated and found a job. (Future Perfect)',
        'Наука и учени: research — изследване, experiment, discovery — откритие, invention — изобретение, breakthrough — пробив. Примери: Marie Curie (радиоактивност, две Нобелови награди), Isaac Newton (законите на движението), Tim Berners-Lee (World Wide Web, 1989); български учени — John Atanasoff (компютърът ABC), Stamen Grigorov (открива бактерията на киселото мляко, 1905), Georgi Nadjakov (фотоелектретното състояние).',
        'Иновационни технологии: artificial intelligence, robotics, renewable energy, 3D printing, virtual reality, gene therapy — генна терапия, space exploration. Безличен пасив за общо мнение: It is believed that AI will change most jobs. Robots are expected to replace some workers.',
        'Примерен текст: My hometown, Plovdiv, is one of the oldest cities in Europe. It is believed that people have lived there for over 6,000 years. Today it is a lively cultural centre. I wish more young people stayed here instead of leaving. In ten years’ time I hope I will be working as an engineer and designing eco-friendly buildings for my city.',
      ],
      examGoldenRule: 'За бъдещето показвай различни нюанси: will (предсказание), Future Progressive (действие в процес в бъдещ момент), Future Perfect (завършено до бъдещ момент).',
      commonTraps: ['След I wish за настоящето се използва Past Simple: I wish I had more time (не I wish I have).', 'Invention е изобретение (нещо създадено), discovery — откритие (нещо, което съществува и е намерено).'],
      formulasOrDates: [
        { label: 'Future Perfect', value: 'By 2035 I will have graduated.' },
        { label: 'Безличен пасив', value: 'It is believed/thought that…' },
        { label: 'Желание', value: 'I wish I could… / I wish I had…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b1-world-chk-1', requirement: 'Текст „Моят град след 20 години“ (170–200 думи)', whyNeeded: 'Представянето на планове и намерения с аргументи е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Future Progressive, Future Perfect, I wish.' },
      { id: 'en-b1-world-chk-2', requirement: 'Презентация за учен и неговото откритие', whyNeeded: 'Лексиката за наука и научни постижения е в програмата.', isEssentialForSix: false, suggestedNotes: 'Живот, откритие, значение днес.' },
    ],
    flashcards: [
      { id: 'en-b1-world-fc-1', front: 'Как е „пробив“ (в науката)?', back: 'breakthrough', tag: 'Наука' },
      { id: 'en-b1-world-fc-2', front: 'Кой открива бактерията на киселото мляко?', back: 'Stamen Grigorov (1905)', tag: 'Учени' },
      { id: 'en-b1-world-fc-3', front: 'Кой създава World Wide Web?', back: 'Tim Berners-Lee (1989)', tag: 'Учени' },
      { id: 'en-b1-world-fc-4', front: 'Как е „Смята се, че…“?', back: 'It is thought/believed that…', tag: 'Граматика' },
      { id: 'en-b1-world-fc-5', front: 'Как е „Иска ми се да имах повече време“?', back: 'I wish I had more time.', tag: 'Граматика' },
      { id: 'en-b1-world-fc-6', front: 'Разлика между invention и discovery?', back: 'invention — създадено ново нещо; discovery — намерено съществуващо.', tag: 'Лексика' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: By 2030 I ___ university.', options: ['will finish', 'will have finished', 'am finishing', 'finished'], correctIndex: 1, explanation: 'Future Perfect.' },
      { id: 2, question: 'Попълнете: I wish I ___ speak Japanese.', options: ['can', 'could', 'will', 'am able'], correctIndex: 1, explanation: 'Wish + could.' },
      { id: 3, question: 'Попълнете: It ___ that the castle was built in the 12th century.', options: ['believes', 'is believing', 'believed', 'is believed'], correctIndex: 3, explanation: 'Безличен пасив.' },
      { id: 4, question: 'Попълнете: This time tomorrow I ___ on the beach.', options: ['will be lying', 'will have lain', 'lie', 'am lain'], correctIndex: 0, explanation: 'Future Progressive.' },
      { id: 5, question: 'Penicillin was found by Alexander Fleming. Това е:', options: ['an invention', 'an experiment', 'a discovery', 'a breakthrough device'], correctIndex: 2, explanation: 'Открито, не изобретено.' },
      { id: 6, question: 'Кой учен свързваме с компютъра ABC?', options: ['Isaac Newton', 'Marie Curie', 'Tim Berners-Lee', 'John Atanasoff'], correctIndex: 3, explanation: 'Джон Атанасов.' },
    ],
    quickQuestions: ['Как да говоря за бъдещето си по различни начини?', 'Кои български учени са известни по света?', 'Как да използвам I wish?'],
  },
  {
    ...base,
    id: 'en-b1-everyday-life',
    monTopicIds: ids('3'),
    title: 'Английски B1: Всекидневие — облекло и мода, кулинарно многообразие, интереси и изкуство',
    originalNoteExcerpt: 'Тематична област „Всекидневие“: облекло и мода (модни предпочитания и тенденции); кулинарно многообразие; интереси, увлечения (музика, книги, кино, спорт); изкуство (емблематични представители на изкуството и културата и техни произведения). Лексика: облекло и мода, бижута и аксесоари; ястия, рецепти, менюта; спортни дисциплини и съоръжения; музикални стилове и инструменти; литературни жанрове; видове изкуства, традиционни и съвременни занаяти. Граматика: съставни прилагателни, ред на прилагателните, емфатични конструкции.',
    summary: {
      overview:
        'Всекидневието на ниво B1 включва вкуса и културата ни — модата, кухнята, книгите, музиката, филмите и изкуството, за които можем да изразим и аргументираме мнение.',
      keyPoints: [
        'Мода: trend — тенденция, outfit, accessories — аксесоари, jewellery — бижута, fabric — плат, pattern — десен (striped, checked — на райета, на карета, floral), designer label, fast fashion — бърза мода, second-hand, sustainable fashion. Съставни прилагателни: well-dressed, eco-friendly, hand-made, brand-new, old-fashioned.',
        'Кулинарно многообразие: cuisine — кухня (Italian/Asian cuisine), dish — ястие, ingredients, spices — подправки, recipe, a three-course meal, street food, vegetarian/vegan options; български — banitsa (pastry with cheese), shopska salad, tarator (cold yoghurt and cucumber soup).',
        'Интереси: музика — genre (pop, rock, jazz, classical, hip-hop), instruments (violin, drums, guitar); книги — novel, fantasy, science fiction, detective story, biography, poetry; кино — plot — сюжет, cast — актьорски състав, director, soundtrack, special effects, a must-see — задължителен за гледане; спорт — athletics, gymnastics, a stadium, a track, a court.',
        'Изкуство и култура: masterpiece — шедьовър, exhibition — изложба, gallery, sculpture, portrait, landscape — пейзаж, performance, craft — занаят (pottery — грънчарство, weaving — тъкачество, wood carving — дърворезба); emblematic figures — William Shakespeare (Hamlet), Leonardo da Vinci (Mona Lisa), the Beatles, Vladimir Dimitrov — the Master (Владимир Димитров — Майстора), Christo and Jeanne-Claude.',
        'Ред на прилагателните: мнение — размер — възраст — форма — цвят — произход — материал — предназначение: a lovely big old round brown Italian wooden table. Емфатични конструкции: What I love about jazz is the freedom. It was Shakespeare who wrote Romeo and Juliet.',
      ],
      examGoldenRule: 'В рецензия на филм или книга: кратък сюжет без развръзка → силни страни → слаби страни → препоръка (I’d highly recommend it to…).',
      commonTraps: ['Jewellery е неброимо: a piece of jewellery (не a jewellery).', 'Plot е сюжетът, а cast — актьорският състав (не „кастинг“).'],
      formulasOrDates: [
        { label: 'Ред на прилагателните', value: 'мнение, размер, възраст, форма, цвят, произход, материал' },
        { label: 'Емфаза', value: 'What I love is… / It was … who…' },
        { label: 'Рецензия', value: 'plot, cast, a must-see, I’d highly recommend…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b1-daily-chk-1', requirement: 'Рецензия на филм или книга (170–200 думи)', whyNeeded: 'Изразяването на отношение и коментар е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Сюжет, герои, силни и слаби страни, препоръка.' },
      { id: 'en-b1-daily-chk-2', requirement: 'Речник: мода, кухня, музика, изкуство', whyNeeded: 'Лексикалните полета са в програмата.', isEssentialForSix: false, suggestedNotes: 'По 10 думи за всяко поле.' },
    ],
    flashcards: [
      { id: 'en-b1-daily-fc-1', front: 'Как е „шедьовър“?', back: 'masterpiece', tag: 'Изкуство' },
      { id: 'en-b1-daily-fc-2', front: 'Как е „на карета“ (десен)?', back: 'checked', tag: 'Мода' },
      { id: 'en-b1-daily-fc-3', front: 'Как е „сюжет“?', back: 'plot', tag: 'Кино' },
      { id: 'en-b1-daily-fc-4', front: 'Как е „кухня“ (национална)?', back: 'cuisine', tag: 'Храна' },
      { id: 'en-b1-daily-fc-5', front: 'Как е „грънчарство“?', back: 'pottery', tag: 'Занаяти' },
      { id: 'en-b1-daily-fc-6', front: 'Кой е редът на прилагателните?', back: 'мнение — размер — възраст — форма — цвят — произход — материал.', tag: 'Граматика' },
    ],
    quiz: [
      { id: 1, question: 'Кой е правилният ред?', options: ['a wooden old beautiful table', 'a beautiful old wooden table', 'an old wooden beautiful table', 'a wooden beautiful old table'], correctIndex: 1, explanation: 'Мнение — възраст — материал.' },
      { id: 2, question: 'Попълнете: It was Leonardo da Vinci ___ painted the Mona Lisa.', options: ['which', 'what', 'who', 'whose'], correctIndex: 2, explanation: 'Емфатична конструкция.' },
      { id: 3, question: 'Кое е правилно?', options: ['a jewellery', 'jewelleries', 'two jewelleries', 'a piece of jewellery'], correctIndex: 3, explanation: 'Неброимо.' },
      { id: 4, question: 'Какво означава cast?', options: ['актьорски състав', 'сюжет', 'режисьор', 'музика'], correctIndex: 0, explanation: 'Актьорите във филма.' },
      { id: 5, question: 'Попълнете: ___ I like most about this band is their energy.', options: ['That', 'What', 'Which', 'It'], correctIndex: 1, explanation: 'What-cleft.' },
      { id: 6, question: 'Кое е съставно прилагателно?', options: ['beautiful', 'quickly', 'well-dressed', 'fashion'], correctIndex: 2, explanation: 'Well + dressed.' },
    ],
    quickQuestions: ['Как да напиша рецензия на английски?', 'В какъв ред се подреждат прилагателните?', 'Как да представя българската кухня?'],
  },
  {
    ...base,
    id: 'en-b1-health',
    monTopicIds: ids('4'),
    title: 'Английски B1: Здраве — здравословно хранене, физическа активност, здравословни навици и поведение',
    originalNoteExcerpt: 'Тематична област „Здраве и здравословен начин на живот“: здравословно хранене; физическа активност и здраве; здравословни навици и поведение. Лексика: здраве и физическа активност. Граматика: модалност (ought to, should, must — съвет; степен на вероятност), условни изречения с unless, as long as, provided.',
    summary: {
      overview:
        'На ниво B1 говорим за здравето аргументирано: какво казва науката за храненето и движението, кои навици помагат и вредят и как да убедим някого да промени поведението си.',
      keyPoints: [
        'Хранене: nutrients — хранителни вещества (protein, carbohydrates, fibre — фибри, vitamins, minerals), processed food — преработена храна, wholegrain — пълнозърнест, a portion, calorie intake — прием на калории, eat in moderation — ям умерено, be addicted to sugar.',
        'Физическа активност: regular exercise, aerobic exercise, strength training — силови тренировки, stamina — издръжливост, sedentary lifestyle — заседнал начин на живот, at least 60 minutes of physical activity a day — поне 60 минути движение на ден (препоръка на СЗО за подрастващите).',
        'Навици и поведение: get into the habit of — свиквам да, break a bad habit — отказвам лош навик, cut down on — намалявам (cut down on sugar), give up, sleep deprivation — недоспиване, stress management, addiction — зависимост, peer pressure.',
        'Съвет и вероятност: You ought to/should drink more water. You must try this — it’s great! (силен съвет); вероятност — He must be exhausted after the marathon (сигурно е); She can’t be ill — I saw her at the gym (не може да е); They might have forgotten (може би са забравили).',
        'Условия: You will stay healthy as long as/provided that you sleep enough. Unless you change your diet, you will feel tired. Примерен текст: I used to live on fast food and energy drinks. Then I realised that unless I changed my habits, I wouldn’t have the energy to train. I cut down on sugar, got into the habit of cooking at home and now I feel much better.',
      ],
      examGoldenRule: 'За убедителен съвет комбинирай модален глагол + причина + резултат: You should cut down on sugar, because it makes you tired, and you’ll feel more energetic.',
      commonTraps: ['Must be (сигурно е) и can’t be (не може да е) изразяват извод, не задължение.', 'Advice е неброимо: some advice, a piece of advice (не an advice).'],
      formulasOrDates: [
        { label: 'Съвет', value: 'ought to / should / must (силен)' },
        { label: 'Вероятност', value: 'must be / can’t be / might have done' },
        { label: 'Условие', value: 'as long as, provided that, unless' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b1-health-chk-1', requirement: 'Статия със съвети за здравословни навици (170–200 думи)', whyNeeded: 'Посочването на мотиви и аргументация е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Проблем, 3 съвета с причини, заключение.' },
      { id: 'en-b1-health-chk-2', requirement: 'Модални глаголи за вероятност — таблица', whyNeeded: 'Степента на вероятност е в програмата.', isEssentialForSix: false, suggestedNotes: 'must, might, could, can’t + do / have done.' },
    ],
    flashcards: [
      { id: 'en-b1-health-fc-1', front: 'Как е „заседнал начин на живот“?', back: 'sedentary lifestyle', tag: 'Здраве' },
      { id: 'en-b1-health-fc-2', front: 'Как е „намалявам захарта“?', back: 'cut down on sugar', tag: 'Навици' },
      { id: 'en-b1-health-fc-3', front: 'Как е „Сигурно е изтощен“?', back: 'He must be exhausted.', tag: 'Вероятност' },
      { id: 'en-b1-health-fc-4', front: 'Как е „пълнозърнест“?', back: 'wholegrain', tag: 'Хранене' },
      { id: 'en-b1-health-fc-5', front: 'Как е „свиквам да…“?', back: 'get into the habit of…', tag: 'Навици' },
      { id: 'en-b1-health-fc-6', front: 'Как е „един съвет“?', back: 'a piece of advice', tag: 'Граматика' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: She ___ be at home — her car isn’t here.', options: ['must', 'can’t', 'should', 'ought to'], correctIndex: 1, explanation: 'Извод — не може да е.' },
      { id: 2, question: 'Попълнете: You won’t lose weight ___ you exercise regularly.', options: ['as long as', 'provided', 'unless', 'if'], correctIndex: 2, explanation: 'Unless = if not.' },
      { id: 3, question: 'Кое е правилно?', options: ['an advice', 'some advices', 'advices', 'some advice'], correctIndex: 3, explanation: 'Неброимо.' },
      { id: 4, question: 'Попълнете: You ___ to drink more water.', options: ['ought', 'should', 'must', 'might'], correctIndex: 0, explanation: 'Ought to.' },
      { id: 5, question: 'Попълнете: He ran 20 km. He ___ be very tired.', options: ['can’t', 'must', 'mustn’t', 'shouldn’t'], correctIndex: 1, explanation: 'Логичен извод.' },
      { id: 6, question: 'Какво означава sleep deprivation?', options: ['дълбок сън', 'хапче за сън', 'недоспиване', 'следобеден сън'], correctIndex: 2, explanation: 'Липса на сън.' },
    ],
    quickQuestions: ['Как да дам убедителен съвет на английски?', 'Как се изразява вероятност с модални глаголи?', 'Колко движение препоръчва СЗО?'],
  },
  {
    ...base,
    id: 'en-b1-nature',
    monTopicIds: ids('5'),
    title: 'Английски B1: Природа и екология — природни чудеса, диви животни, екотуризъм и екологични инициативи',
    originalNoteExcerpt: 'Тематична област „Природа и екология“: природни чудеса и забележителности; диви животни; екотуризъм — защитени природни обекти, екологични организации и инициативи. Лексика: диви животни и растения; околна среда и екология; риби, насекоми, птици; защитени природни обекти; туристическо оборудване. Граматика: членуване на географски названия (проходи, протоци, области), страдателен залог, относителни изречения (non-defining).',
    summary: {
      overview:
        'Темата представя природните богатства на България и света, дивите животни и начините природата да се посещава отговорно — с екотуризъм и подкрепа за екологичните организации.',
      keyPoints: [
        'Природни чудеса: the Belogradchik Rocks, the Seven Rila Lakes, the Prohodna Cave (with the “Eyes of God”), the Stone Forest (Pobiti Kamani); по света — the Grand Canyon, Niagara Falls, the Great Barrier Reef, the Giant’s Causeway (Northern Ireland). Описание: stunning — зашеметяващ, unique rock formations, crystal-clear water.',
        'Диви животни: brown bear, grey wolf, lynx — рис, chamois — дива коза, wild boar — глиган, golden eagle, Dalmatian pelican — къдроглав пеликан, stork — щъркел; endangered species, habitat loss — загуба на местообитания, poaching — бракониерство, breed — размножавам се, migrate.',
        'Защитени обекти и екотуризъм: national park (Pirin, Rila, Central Balkan), nature reserve (Srebarna — UNESCO site for birds), protected area, eco-trail — екопътека, leave no trace — не оставяй следа, responsible tourism, wildlife watching. Екипировка: hiking boots, backpack, sleeping bag, tent, compass, first-aid kit.',
        'Екологични организации и инициативи: WWF, Greenpeace, local NGOs, volunteer — доброволец, campaign, petition, raise awareness — повишавам осведомеността, fund-raising — набиране на средства, tree-planting day, beach clean-up.',
        'Граматика в темата: относителни изречения без ограничаване (non-defining, със запетаи) — Srebarna, which is near Silistra, is home to rare pelicans.; страдателен залог — Pirin National Park was declared a UNESCO site in 1983. Примерен текст: Last summer I joined a volunteer camp in the Central Balkan National Park, which is one of the largest protected areas in Europe. We cleaned eco-trails and counted birds.',
      ],
      examGoldenRule: 'В non-defining relative clause информацията е допълнителна — оградена е със запетаи и не се използва that: The Rila Lakes, which are glacial, are stunning.',
      commonTraps: ['В относително изречение със запетаи не се използва that: Sofia, which is the capital… (не Sofia, that is…).', 'Chamois се произнася /ˈʃæmwɑː/ (за животното), не като „шамоа“ от плат.'],
      formulasOrDates: [
        { label: 'Non-defining', value: '…, which/who …, …' },
        { label: 'Екотуризъм', value: 'eco-trail, leave no trace, protected area' },
        { label: 'Инициативи', value: 'volunteer, raise awareness, petition' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b1-nature-chk-1', requirement: 'Брошура за защитен природен обект в България (170–200 думи)', whyNeeded: 'Представянето на информация по познати теми е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Местоположение, животни, правила, защо да се посети.' },
      { id: 'en-b1-nature-chk-2', requirement: 'Проект за екологична инициатива в училище', whyNeeded: 'Разработването на проекти е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Цел, дейности, партньори, резултат.' },
    ],
    flashcards: [
      { id: 'en-b1-nature-fc-1', front: 'Как е „рис“?', back: 'lynx', tag: 'Животни' },
      { id: 'en-b1-nature-fc-2', front: 'Как е „бракониерство“?', back: 'poaching', tag: 'Екология' },
      { id: 'en-b1-nature-fc-3', front: 'Как е „къдроглав пеликан“?', back: 'Dalmatian pelican', tag: 'Животни' },
      { id: 'en-b1-nature-fc-4', front: 'Как е „повишавам осведомеността“?', back: 'raise awareness', tag: 'Инициативи' },
      { id: 'en-b1-nature-fc-5', front: 'Какво означава leave no trace?', back: 'Не оставяй следи в природата.', tag: 'Екотуризъм' },
      { id: 'en-b1-nature-fc-6', front: 'Използва ли се that в non-defining clause?', back: 'Не — само which/who и запетаи.', tag: 'Граматика' },
    ],
    quiz: [
      { id: 1, question: 'Кое е правилно?', options: ['Srebarna, that is near Silistra, is famous.', 'Srebarna which is near Silistra is famous.', 'Srebarna, which is near Silistra, is famous.', 'Srebarna, who is near Silistra, is famous.'], correctIndex: 2, explanation: 'Which и запетаи.' },
      { id: 2, question: 'Какво означава habitat loss?', options: ['загуба на местообитания', 'миграция', 'размножаване', 'лов'], correctIndex: 0, explanation: 'Загуба на средата за живот.' },
      { id: 3, question: 'Попълнете: Pirin National Park ___ a UNESCO site in 1983.', options: ['declared', 'has declared', 'was declaring', 'was declared'], correctIndex: 3, explanation: 'Пасив.' },
      { id: 4, question: 'Кое е туристическо оборудване?', options: ['first-aid kit', 'petition', 'poaching', 'habitat'], correctIndex: 0, explanation: 'Аптечка.' },
      { id: 5, question: 'Кое е природно чудо в Северна Ирландия?', options: ['the Grand Canyon', 'the Giant’s Causeway', 'Niagara Falls', 'the Great Barrier Reef'], correctIndex: 1, explanation: 'Пътят на великана.' },
      { id: 6, question: 'Какво прави доброволецът?', options: ['плаща за работа', 'работи без заплащане за кауза', 'управлява парка', 'ловува'], correctIndex: 1, explanation: 'Volunteer.' },
    ],
    quickQuestions: ['Как да представя Седемте рилски езера на английски?', 'Какво е отговорен туризъм?', 'Как се пишат относителни изречения със запетаи?'],
  },
  {
    ...base,
    id: 'en-b1-homeland-world',
    monTopicIds: ids('6'),
    title: 'Английски B1: Моята родина и светът — гражданин на Европа, пътуване, регионални празници и наследство',
    originalNoteExcerpt: 'Тематична област „Моята родина и светът“: аз — гражданин на Европа и света; пътуване, ваканция, туризъм (планиране, впечатления и преживявания); регионални празници и традиции; приносът на моята родина в световното културно-историческо наследство. Граматика: непряка реч (молби, съвети, покани, предложения), Past Perfect Progressive, as if, паралелизъм (either…or, neither…nor, both…and).',
    summary: {
      overview:
        'Темата поставя България в Европа и света: какво значи да си европейски гражданин, как пътуваме и споделяме впечатленията си и с какво нашата страна е обогатила световната култура.',
      keyPoints: [
        'Европейски гражданин: freedom of movement — свобода на движение, study abroad (Erasmus+), cultural exchange, citizenship — гражданство, rights and responsibilities, tolerance, diversity — многообразие, global issues, volunteer abroad. Паралелизъм: As EU citizens, we can both study and work in other member states.',
        'Пътуване — планиране и впечатления: plan an itinerary, book accommodation, budget travel, backpacking, cultural shock — културен шок, broaden your horizons — разширявам кръгозора си, breathtaking views, an unforgettable experience. Past Perfect Progressive: We had been walking for hours when we finally reached the top.',
        'Регионални празници и традиции: Kukeri/Surva (Pernik, януари), the Rose Festival (Kazanlak, юни), nestinari — fire dancing (Strandzha, около 3 юни — празника на св. св. Константин и Елена), Trifon Zarezan (виното, 14 февруари), the Koprivshtitsa Folklore Festival; по света — Notting Hill Carnival, Mardi Gras (New Orleans), the Edinburgh Festival Fringe.',
        'Приносът на България: the Cyrillic alphabet, developed in the First Bulgarian Empire (the 9th–10th century); the oldest processed gold in the world (the Varna Necropolis); the frescoes of the Boyana Church (1259); Thracian treasures; the Mystery of Bulgarian Voices; UNESCO sites — the Rila Monastery, the Madara Rider, Nessebar, Pirin and others.',
        'Непряка реч за молби, съвети и покани: “Please, book the tickets.” → She asked me to book the tickets.; “You should visit Nessebar.” → He advised me to visit Nessebar.; “Let’s go to the festival.” → She suggested going to the festival.; “Would you like to join us?” → They invited me to join them. As if: It felt as if we were in a fairy tale.',
      ],
      examGoldenRule: 'За молби, съвети и покани в непряка реч използвай глагол + обект + to-инфинитив: asked me to, advised me to, invited me to, warned me not to.',
      commonTraps: ['Suggest не се свързва с обект + инфинитив: She suggested going (не She suggested me to go).', 'Neither … nor се използва с положителен глагол: Neither Tom nor Ann likes it (не doesn’t like).'],
      formulasOrDates: [
        { label: 'Непряка реч', value: 'asked/told/advised/invited + me + to…' },
        { label: 'Паралелизъм', value: 'either…or, neither…nor, both…and' },
        { label: 'Past Perfect Progressive', value: 'had been + -ing' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b1-home-chk-1', requirement: 'Есе „Какво дава България на света“ (170–200 думи)', whyNeeded: 'Създаването на логически свързан текст с аргументи е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Кирилица, злато, фрески, фолклор, заключение.' },
      { id: 'en-b1-home-chk-2', requirement: 'Таблица на глаголите за непряка реч', whyNeeded: 'Непряката реч за молби, съвети и покани е в програмата.', isEssentialForSix: false, suggestedNotes: 'ask, tell, advise, invite, offer, suggest, warn.' },
    ],
    flashcards: [
      { id: 'en-b1-home-fc-1', front: 'Как е „разширявам кръгозора си“?', back: 'broaden my horizons', tag: 'Пътуване' },
      { id: 'en-b1-home-fc-2', front: 'Кога е създадена кирилицата?', back: 'В Първото българско царство (IX–X в.).', tag: 'Наследство' },
      { id: 'en-b1-home-fc-3', front: 'Как е „Тя ме помоли да купя билетите“?', back: 'She asked me to buy the tickets.', tag: 'Граматика' },
      { id: 'en-b1-home-fc-4', front: 'Как е „свобода на движение“?', back: 'freedom of movement', tag: 'Европа' },
      { id: 'en-b1-home-fc-5', front: 'Какво са нестинарите?', back: 'Fire dancers from Strandzha.', tag: 'Традиции' },
      { id: 'en-b1-home-fc-6', front: 'Как е „Вървяхме от часове, когато стигнахме върха“?', back: 'We had been walking for hours when we reached the top.', tag: 'Граматика' },
    ],
    quiz: [
      { id: 1, question: '“You should rest,” the doctor said. → The doctor ___ me to rest.', options: ['said', 'suggested', 'advised', 'told that'], correctIndex: 2, explanation: 'Advise + обект + to.' },
      { id: 2, question: 'Попълнете: Neither my brother nor my sister ___ coffee.', options: ['drink', 'drinks', 'don’t drink', 'doesn’t drink'], correctIndex: 1, explanation: 'Положителен глагол след neither…nor.' },
      { id: 3, question: 'Попълнете: She suggested ___ the museum.', options: ['me to visit', 'to visit', 'visit', 'visiting'], correctIndex: 3, explanation: 'Suggest + -ing.' },
      { id: 4, question: 'Кое е най-старото обработено злато в света?', options: ['the Varna Necropolis gold', 'the Panagyurishte treasure', 'the Boyana Church', 'the Madara Rider'], correctIndex: 0, explanation: 'Варненският некропол.' },
      { id: 5, question: 'Попълнете: We ___ for two hours when the bus finally came.', options: ['have been waiting', 'had been waiting', 'were waiting since', 'waited since'], correctIndex: 1, explanation: 'Past Perfect Progressive.' },
      { id: 6, question: 'Попълнете: It looks ___ it’s going to rain.', options: ['like as', 'that', 'as if', 'so'], correctIndex: 2, explanation: 'As if.' },
    ],
    quickQuestions: ['Какво значи да си европейски гражданин?', 'Как да предам молба или съвет в непряка реч?', 'С какво България е известна по света?'],
  },
  {
    ...base,
    id: 'en-b1-skills',
    monTopicIds: ids('skills'),
    title: 'Английски B1: слушане, четене, говорене и писане — какво трябва да мога',
    originalNoteExcerpt: 'Слушане: общото съдържание на несложни текстове при нормално темпо; основна информация и подробности от текстове от обществения живот; разговор между носители на езика — намерения, лица, тема, мнения, чувства; общ смисъл от медиите; откъси от филми. Четене: автентични и адаптирани художествени и научнопопулярни текстове; комуникативно намерение на автора, сюжетна линия, персонажи; обяви, реклами, менюта, рецепти, разписания, инструкции, програми; писма, покани и имейли — намерения, желания, чувства; логическа и хронологична последователност. Говорене: започва, поддържа и завършва разговор; лично мнение, съгласие/несъгласие; чувства; уместна лексика; относително гладко; интервю; договаряне на съвместна дейност; монолог — информация, разказ, преразказ, планове и аргументи. Писане: описателни и повествователни текстове, информативни текстове, формуляри и анкети, проекти, лична кореспонденция, разказ/преразказ, план на текст, автобиография — 170–200 думи.',
    summary: {
      overview:
        'В края на X клас ученикът достига ниво B1 (прагово ниво): разбира основното в ясни текстове за познати и актуални теми, справя се в повечето ситуации при пътуване и пише свързан текст с аргументирано мнение.',
      keyPoints: [
        'Слушане: разбираш общото съдържание и важните подробности при нормално темпо; следиш разговор на носители на езика и разбираш целите им, мненията и чувствата; разбираш общия смисъл на новини, интервюта и откъси от филми на стандартен език. Стратегия — слушай за мнения и аргументи (I believe, on the other hand, that’s why).',
        'Четене: извличаш основното от художествени и научнопопулярни текстове; разбираш целта на автора, сюжета и персонажите; следиш логическата и хронологичната последователност; намираш информация в обяви, инструкции и програми; разбираш намеренията и чувствата в лични писма. Стратегия — отделяй факти от мнения.',
        'Говорене: започваш, поддържаш и завършваш разговор; изразяваш мнение, съгласие или несъгласие и реагираш на чувства; участваш в подготвено интервю; договаряш съвместна дейност (How about…? Shall we…? Let’s agree on…); в монолог представяш информация, разказваш, преразказваш и аргументираш плановете си. Говориш относително гладко, без прекалено дълги паузи.',
        'Писане: описателни и повествователни текстове; информативни текстове; формуляри и анкети; проекти от различни източници; лична кореспонденция с описание на събития и впечатления; разказ или преразказ на история; план на прочетен или чут текст; стандартна автобиография. Обемът на всеки писмен текст е 170–200 думи.',
        'Кохезия и кохерентност: свързвай изреченията с besides, in addition, furthermore, however, therefore; подреждай текста с first, next, then, finally; избягвай повторения чрез местоимения и синоними.',
      ],
      examGoldenRule: 'Добрият текст на ниво B1 има ясни абзаци, всеки с една основна идея, и свързващи думи между тях — оценява се не само езикът, а и организацията.',
      commonTraps: ['Furthermore и moreover са за добавяне, а however — за противопоставяне; не ги разменяй.', 'В преразказа не преписвай изречения от оригинала — предай с твои думи и в минало време.'],
      formulasOrDates: [
        { label: 'Свързване', value: 'besides, furthermore, however, therefore' },
        { label: 'Договаряне', value: 'How about…? Shall we…? Let’s agree on…' },
        { label: 'Обем', value: '170–200 думи' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b1-skills-chk-1', requirement: 'Шаблон на есе с абзаци и свързващи думи', whyNeeded: 'Създаването на логически свързан и правилно структуриран текст е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Въведение, 2–3 абзаца, заключение.' },
      { id: 'en-b1-skills-chk-2', requirement: 'Изрази за договаряне на съвместна дейност', whyNeeded: 'Договарянето е очакван резултат при говорене.', isEssentialForSix: false, suggestedNotes: 'Предложение, приемане, отказ, компромис.' },
    ],
    flashcards: [
      { id: 'en-b1-skills-fc-1', front: 'Колко думи е писменият текст на ниво B1?', back: '170–200 думи.', tag: 'Писане' },
      { id: 'en-b1-skills-fc-2', front: 'Как се предлага съвместна дейност?', back: 'How about…? / Shall we…? / Why don’t we…?', tag: 'Говорене' },
      { id: 'en-b1-skills-fc-3', front: 'Свързваща дума за следствие', back: 'therefore', tag: 'Писане' },
      { id: 'en-b1-skills-fc-4', front: 'Как се отделят факти от мнения при четене?', back: 'Мненията имат сигнални думи: I believe, in my view, should.', tag: 'Четене' },
      { id: 'en-b1-skills-fc-5', front: 'Как се договаряте за компромис?', back: 'Let’s meet halfway. / Why don’t we do both?', tag: 'Говорене' },
      { id: 'en-b1-skills-fc-6', front: 'Какво е кохезия на текста?', back: 'Свързаност на изреченията чрез свързващи думи и местоимения.', tag: 'Писане' },
    ],
    quiz: [
      { id: 1, question: 'Коя дума въвежда следствие?', options: ['however', 'therefore', 'although', 'besides'], correctIndex: 1, explanation: 'Следователно.' },
      { id: 2, question: 'Как предлагаш съвместна дейност?', options: ['How about going to the cinema?', 'Go to the cinema.', 'You must go to the cinema.', 'I went to the cinema.'], correctIndex: 0, explanation: 'Предложение.' },
      { id: 3, question: 'Кое изречение е мнение, а не факт?', options: ['The museum opens at 9.', 'Sofia is the capital.', 'The film lasts two hours.', 'I believe the film is too long.'], correctIndex: 3, explanation: 'I believe — мнение.' },
      { id: 4, question: 'Какъв е обемът на писмения текст?', options: ['50–70 думи', '100–120 думи', '170–200 думи', '400 думи'], correctIndex: 2, explanation: 'По програмата.' },
      { id: 5, question: 'Как правиш преразказ?', options: ['преписваш оригинала', 'предаваш с твои думи', 'превеждаш на български', 'пишеш само заглавието'], correctIndex: 1, explanation: 'Със свои думи.' },
      { id: 6, question: 'Коя дума е за добавяне?', options: ['furthermore', 'however', 'although', 'instead'], correctIndex: 0, explanation: 'Освен това.' },
    ],
    quickQuestions: ['Как да организирам есе на ниво B1?', 'Как да се договоря с партньор на устния изпит?', 'Как да отделя факти от мнения?'],
  },
  {
    ...base,
    id: 'en-b1-grammar',
    monTopicIds: ids('grammar'),
    title: 'Английски B1: езикови знания — перфектни продължителни времена, модалност и вероятност, нереални ситуации, инфинитив и герундий, емфаза',
    originalNoteExcerpt: 'Фонетика: редукция на гласни в свързана реч, интонационни модели, омофони. Граматика: членуване на географски названия, театри, музеи, хотели, вестници, организации, исторически събития; съставни съществителни; quantifier + determiner + noun; прилагателни като съществителни (the rich), съставни прилагателни; singular they, емфатични възвратни местоимения; времена — Present Perfect Progressive, Past Perfect Progressive, Future Progressive, Future Perfect, Future Progressive/Perfect in the Past; глаголи-състояния в продължителни времена; модалност — ought, used, Present Progressive за раздразнение, must, can, could, may, might, cannot за вероятност (с прост и перфектен инфинитив), must (съвет), would (минал навик), will (сегашен навик); страдателен залог върху предложно допълнение, безличен пасив; условност — unless, in case, as long as, provided, supposing, on condition; I wish, Suppose, Imagine, If only, as if; инфинитив и герундий — след глаголи за възприятие, форми (simple, perfect, passive), stop, remember, forget, try. Синтаксис: either…or, neither…nor, both…and; въпроси с „или“; емфатични конструкции; non-defining relative clauses, изпускане на относителното местоимение; обстоятелствени изречения за причина, цел, резултат; непряка реч (команди, молби, съвети, покани, предложения); кохезия и кохерентност; съгласуване на времената.',
    summary: {
      overview:
        'Граматиката на ниво B1 добавя финес: перфектните продължителни времена, модалните глаголи за степен на сигурност, нереалните ситуации с I wish и If only, сложните форми на инфинитива и емфатичните конструкции.',
      keyPoints: [
        'Перфектни продължителни и бъдещи времена: Present Perfect Progressive (I’ve been studying all day — подчертава продължителността); Past Perfect Progressive (She had been crying before I came); Future Progressive (This time next week I’ll be flying to Rome); Future Perfect (By June I will have finished the course). Глаголи-състояния в Progressive с промяна на значението: I’m thinking about it (обмислям) срещу I think so (мисля, смятам); She’s having lunch (обядва) срещу She has a car.',
        'Модалност и вероятност: must/can’t + do за извод сега (He must be at home); must/can’t/might + have done за извод за миналото (She must have missed the bus. He can’t have seen us. They might have got lost); would/used to за минали навици, will за дразнещ сегашен навик (He will leave his socks everywhere!); Present Progressive с always за раздразнение (You’re always interrupting me!); ought to (съвет).',
        'Нереални ситуации и условност: I wish/If only + Past Simple за настоящето (I wish I knew the answer), + Past Perfect за миналото (If only I hadn’t said that); as if (He talks as if he were the boss); условни съюзи — unless, in case (take an umbrella in case it rains), as long as, provided (that), supposing.',
        'Инфинитив и герундий: глаголи за възприятие — I saw him cross the street (цялото действие) срещу I saw him crossing the street (част от действието); форми на инфинитива — to do, to have done, to be done (She seems to have forgotten. It needs to be repaired); различно значение — remember doing (помня, че съм направил) / remember to do (не забравям да направя); try doing (опитвам като експеримент) / try to do (опитвам се, правя усилие); stop doing / stop to do.',
        'Синтаксис: емфаза — It was Maria who called. What I need is a holiday.; въпроси с „или“ — Will you feed the cat or shall I?; non-defining relative clauses със запетаи; изпускане на относителното местоимение, когато то е допълнение (The book (that) I bought is great); непряка реч за команди и покани (He told us to sit down. She invited me to stay).',
      ],
      examGoldenRule: 'За извод за миналото използвай модален глагол + have + III форма: must have (сигурно е), might have (може би), can’t have (не може да е).',
      commonTraps: ['Remember to lock the door (не забравяй) ≠ I remember locking the door (спомням си, че заключих).', 'След I wish за настоящето не се използва would за собствени състояния: I wish I were taller (не I wish I would be taller).'],
      formulasOrDates: [
        { label: 'Извод за миналото', value: 'must/might/can’t + have + III форма' },
        { label: 'Нереално', value: 'I wish + Past Simple / If only + Past Perfect' },
        { label: 'Емфаза', value: 'It was … who… / What I need is…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b1-gram-chk-1', requirement: 'Таблица на модалните глаголи за вероятност — сега и в миналото', whyNeeded: 'Степента на вероятност с прост и перфектен инфинитив е в програмата.', isEssentialForSix: true, suggestedNotes: 'must, might, could, can’t + do / have done.' },
      { id: 'en-b1-gram-chk-2', requirement: 'Глаголи с различно значение с инфинитив и герундий', whyNeeded: 'Те са изрично посочени в програмата.', isEssentialForSix: false, suggestedNotes: 'stop, remember, forget, try — по два примера.' },
    ],
    flashcards: [
      { id: 'en-b1-gram-fc-1', front: 'Как е „Сигурно е изпуснала автобуса“?', back: 'She must have missed the bus.', tag: 'Вероятност' },
      { id: 'en-b1-gram-fc-2', front: 'Как е „Иска ми се да не бях казал това“?', back: 'I wish I hadn’t said that.', tag: 'Нереално' },
      { id: 'en-b1-gram-fc-3', front: 'Разлика между remember doing и remember to do?', back: 'doing — спомням си, че съм направил; to do — не забравям да направя.', tag: 'Инфинитив' },
      { id: 'en-b1-gram-fc-4', front: 'Как е „Вземи чадър, в случай че завали“?', back: 'Take an umbrella in case it rains.', tag: 'Условност' },
      { id: 'en-b1-gram-fc-5', front: 'Как е „Това, от което имам нужда, е почивка“?', back: 'What I need is a holiday.', tag: 'Емфаза' },
      { id: 'en-b1-gram-fc-6', front: 'Кое време подчертава продължителност до сега?', back: 'Present Perfect Progressive: I’ve been working all day.', tag: 'Времена' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: He ___ have seen me — I was hiding.', options: ['must', 'can’t', 'should', 'would'], correctIndex: 1, explanation: 'Невъзможно — can’t have.' },
      { id: 2, question: 'Попълнете: I wish I ___ to the party last night.', options: ['went', 'go', 'had gone', 'would go'], correctIndex: 2, explanation: 'Минало — Past Perfect.' },
      { id: 3, question: 'Попълнете: Remember ___ the lights before you leave.', options: ['to switch off', 'switching off', 'switch off', 'switched off'], correctIndex: 0, explanation: 'Не забравяй да…' },
      { id: 4, question: 'Попълнете: Take a jacket ___ it gets cold.', options: ['unless', 'provided', 'as long as', 'in case'], correctIndex: 3, explanation: 'В случай че.' },
      { id: 5, question: 'Попълнете: You’re always ___ my things without asking!', options: ['take', 'taking', 'to take', 'taken'], correctIndex: 1, explanation: 'Progressive с always — раздразнение.' },
      { id: 6, question: 'Попълнете: ___ I really need is a good night’s sleep.', options: ['That', 'Which', 'What', 'It'], correctIndex: 2, explanation: 'What-cleft.' },
    ],
    quickQuestions: ['Как да правя изводи за миналото с модални глаголи?', 'Кога I wish + Past Perfect?', 'Как се различават remember to и remember -ing?'],
  },
];
