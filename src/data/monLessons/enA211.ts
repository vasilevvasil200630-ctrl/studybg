import type { LessonData } from '../../types';

// Английски език, ниво A2 (XI–XII клас, общообразователна подготовка) — по един урок за всяка тема от учебната
// програма на МОН (https://www.mon.bg/nfs/2018/12/oop_ae_oa2_28112018.pdf). Програмата продължава ниво A1;
// уроците са насочени към практически ситуации за по-големи ученици. Примерните текстове са написани за урока.

const base = { subject: 'Английски език', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ae-a2-11-12:${num}`];

export const MON_LESSONS_EN_A2_11: LessonData[] = [
  {
    ...base,
    id: 'en-a2-11-me-and-others',
    monTopicIds: ids('1'),
    title: 'Английски A2 (XI–XII): Аз и другите — външен вид, облекло, характер, образование и интереси',
    originalNoteExcerpt: 'Тематична област „Аз и другите“: външен вид, облекло, характер; образование и интереси. Лексика: описание на външен вид и черти от характера; интереси (книги, изкуства, кино, театър, медии, интернет, социални мрежи); взаимоотношения, чувства, емоции. Писане: формуляр с подробни лични данни (CV — Europass), текст от 100–120 думи.',
    summary: {
      overview:
        'В горния курс темата „Аз и другите“ се свързва с бъдещето: как описваме себе си, своите качества и интереси — в разговор, в профил или в автобиография.',
      keyPoints: [
        'Описание на човек: He’s in his late teens. — Около 18–19 години е.; She’s medium height with shoulder-length hair. — Среден ръст, с коса до раменете.; He looks smart/casual. — Изглежда официално/небрежно облечен.; She always wears comfortable clothes.',
        'Качества за автобиография и интервю: reliable — надежден, responsible — отговорен, organised — организиран, patient — търпелив, confident — уверен, creative — креативен, a good team player — добър в екипна работа. Модел: I am a reliable and organised person. I work well in a team.',
        'Образование и интереси: secondary school — средно училище, graduate — завършвам, certificate — сертификат, course — курс, skills — умения (computer skills, language skills), hobbies — I’m into photography. (Запален съм по фотография.) I enjoy volunteering.',
        'Чувства и взаимоотношения: get on well with — разбирам се добре с, argue — карам се, trust — вярвам/доверявам се, support — подкрепям; прилагателни: excited/exciting, worried — притеснен, proud of — горд с.',
        'Автобиография Europass — раздели: personal information (лични данни), education and training (образование), work experience (опит), personal skills (езици, дигитални умения, комуникация), hobbies. Кратък профил: I am a 17-year-old student from Ruse. I am interested in IT and I have good computer skills. I speak Bulgarian and English.',
      ],
      examGoldenRule: 'В описание на себе си давай доказателство за качеството: I am responsible — I look after my younger brother every afternoon.',
      commonTraps: ['Hobby е броимо: my hobbies are… (не my hobby are…).', 'Into, keen on, fond of изискват -ing или съществително след себе си: I’m keen on cooking.'],
      formulasOrDates: [
        { label: 'Качества', value: 'reliable, responsible, organised, a good team player' },
        { label: 'Интереси', value: 'I’m into… / I enjoy… / I’m keen on…' },
        { label: 'Обем', value: '100–120 думи' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a2-11-me-chk-1', requirement: 'Моята автобиография по модела Europass', whyNeeded: 'Попълването на формуляр с подробни лични данни е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Лични данни, образование, умения, интереси.' },
      { id: 'en-a2-11-me-chk-2', requirement: 'Кратко представяне за интервю (100–120 думи)', whyNeeded: 'Описанието на себе си е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Качества с доказателства.' },
    ],
    flashcards: [
      { id: 'en-a2-11-me-fc-1', front: 'Как е „надежден“?', back: 'reliable', tag: 'Качества' },
      { id: 'en-a2-11-me-fc-2', front: 'Как е „Разбирам се добре с…“?', back: 'I get on well with…', tag: 'Отношения' },
      { id: 'en-a2-11-me-fc-3', front: 'Как е „завършвам училище“?', back: 'graduate from school', tag: 'Образование' },
      { id: 'en-a2-11-me-fc-4', front: 'Как е „Запален съм по фотография“?', back: 'I’m into photography.', tag: 'Интереси' },
      { id: 'en-a2-11-me-fc-5', front: 'Какво е Europass?', back: 'Европейски формат на автобиография.', tag: 'Писане' },
      { id: 'en-a2-11-me-fc-6', front: 'Как е „добър в екипна работа“?', back: 'a good team player', tag: 'Качества' },
    ],
    quiz: [
      { id: 1, question: 'Кое качество е подходящо за автобиография?', options: ['lazy', 'rude', 'responsible', 'bored'], correctIndex: 2, explanation: 'Отговорен.' },
      { id: 2, question: 'Попълнете: I get ___ well with my classmates.', options: ['up', 'on', 'in', 'at'], correctIndex: 1, explanation: 'Get on well with.' },
      { id: 3, question: 'Попълнете: I’m keen on ___ photos.', options: ['take', 'to take', 'took', 'taking'], correctIndex: 3, explanation: 'Keen on + -ing.' },
      { id: 4, question: 'Кой раздел на Europass описва езиците ти?', options: ['personal skills', 'work experience', 'personal information', 'education'], correctIndex: 0, explanation: 'Лични умения.' },
      { id: 5, question: 'Кое е правилно?', options: ['My hobby are reading.', 'My hobbies is reading.', 'My hobbies are reading and cooking.', 'My hobbys are reading.'], correctIndex: 2, explanation: 'Множествено число — hobbies are.' },
      { id: 6, question: 'Как е „горд съм с теб“?', options: ['I’m proud of you.', 'I’m proud on you.', 'I’m proud with you.', 'I’m proud for you.'], correctIndex: 0, explanation: 'Proud of.' },
    ],
    quickQuestions: ['Как да напиша автобиография на английски?', 'Как да опиша качествата си на интервю?', 'Как да говоря за интересите си?'],
  },
  {
    ...base,
    id: 'en-a2-11-jobs',
    monTopicIds: ids('2'),
    title: 'Английски A2 (XI–XII): Светът около мен — професии и работа',
    originalNoteExcerpt: 'Тематична област „Светът около мен“: професии. Лексика: моята бъдеща професия. Граматика: be able to, should, have to, don’t have to; бъдеще — will, be going to; относителни изречения (who, where).',
    summary: {
      overview:
        'В последните класове професията вече не е далечна мечта. Темата учи как да говорим за работа, задължения на работното място и за собствените си планове след училище.',
      keyPoints: [
        'Работа: job — работа (конкретна), work — работа (дейност), career — кариера, employer — работодател, employee — служител, salary — заплата, full-time/part-time — пълно/непълно работно време, apply for a job — кандидатствам за работа, interview — интервю.',
        'Професии и задължения: A nurse has to look after patients. A software developer has to write and test programs. A shop assistant doesn’t have to wear a uniform in every shop. Модел за определение: A … is someone who…; An office is a place where…',
        'Умения: be able to — мога (He is able to speak three languages.); be good at — добър съм в; need to — трябва ми; работа в екип, комуникация, компютърна грамотност.',
        'Планове след училище: After school I’m going to study Law. I’d like to work in tourism. I think I’ll find a part-time job in the summer. Съвет: You should get some experience first.',
        'Примерен текст: After I graduate, I’m going to study nursing. I want to help people and I am patient and calm. Nurses have to work long hours, and sometimes they have to work at night, but I think it is a very important job. This summer I will volunteer at the local hospital to get some experience.',
      ],
      examGoldenRule: 'Различавай job (броимо — a job, two jobs) от work (неброимо — I have a lot of work).',
      commonTraps: ['Не казваме a work, а a job или some work.', 'Be able to се използва там, където can няма форма: I will be able to drive (не I will can).'],
      formulasOrDates: [
        { label: 'Задължения', value: 'have to / don’t have to' },
        { label: 'Планове', value: 'I’m going to… / I’d like to… / I think I’ll…' },
        { label: 'Способност', value: 'be able to' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a2-11-jobs-chk-1', requirement: 'Текст „Моите планове след училище“ (100–120 думи)', whyNeeded: 'Разказът за бъдещето е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Професия, причини, задължения, стъпки.' },
      { id: 'en-a2-11-jobs-chk-2', requirement: 'Речник на 20 професии с кратко определение', whyNeeded: 'Лексиката за професии е в програмата.', isEssentialForSix: false, suggestedNotes: 'A … is someone who…' },
    ],
    flashcards: [
      { id: 'en-a2-11-jobs-fc-1', front: 'Как е „заплата“?', back: 'salary', tag: 'Работа' },
      { id: 'en-a2-11-jobs-fc-2', front: 'Как е „кандидатствам за работа“?', back: 'apply for a job', tag: 'Работа' },
      { id: 'en-a2-11-jobs-fc-3', front: 'Как е „непълно работно време“?', back: 'part-time', tag: 'Работа' },
      { id: 'en-a2-11-jobs-fc-4', front: 'Как е „Ще мога да шофирам“?', back: 'I will be able to drive.', tag: 'Граматика' },
      { id: 'en-a2-11-jobs-fc-5', front: 'Броимо ли е work?', back: 'Не — a job е броимо, work е неброимо.', tag: 'Граматика' },
      { id: 'en-a2-11-jobs-fc-6', front: 'Как е „работодател“?', back: 'employer', tag: 'Работа' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: She found a new ___ in a bank.', options: ['work', 'job', 'works', 'career'], correctIndex: 1, explanation: 'Броимо — a job.' },
      { id: 2, question: 'Попълнете: Pilots ___ wear a uniform.', options: ['don’t have to', 'mustn’t', 'shouldn’t', 'have to'], correctIndex: 3, explanation: 'Задължение.' },
      { id: 3, question: 'Попълнете: Next year I will ___ to vote.', options: ['can', 'could', 'be able', 'able'], correctIndex: 2, explanation: 'Will be able to.' },
      { id: 4, question: 'A receptionist is someone ___ welcomes visitors.', options: ['who', 'which', 'where', 'whose'], correctIndex: 0, explanation: 'Who за хора.' },
      { id: 5, question: 'Кое означава „служител“?', options: ['employer', 'salary', 'employee', 'interview'], correctIndex: 2, explanation: 'Employer е работодател.' },
      { id: 6, question: 'Попълнете: I’d like ___ in tourism.', options: ['work', 'working', 'to work', 'worked'], correctIndex: 2, explanation: 'Would like + to.' },
    ],
    quickQuestions: ['Как да говоря за бъдещата си работа?', 'Каква е разликата между job и work?', 'Какво да кажа на интервю?'],
  },
  {
    ...base,
    id: 'en-a2-11-everyday',
    monTopicIds: ids('3'),
    title: 'Английски A2 (XI–XII): Всекидневие — храни и напитки, пазаруване и мода, транспорт',
    originalNoteExcerpt: 'Тематична област „Всекидневие“: храни и напитки; пазаруване и мода; транспорт. Лексика: основни хранителни продукти, облекло и мода, пазаруване, мерни единици и цени, транспорт и ориентиране. Граматика: броими и неброими с a little, a few; степенуване и as … as.',
    summary: {
      overview:
        'Темата подготвя за самостоятелния живот: пазаруване онлайн и в магазина, планиране на хранене, пътуване с градски и междуградски транспорт.',
      keyPoints: [
        'Храни и готвене: recipe — рецепта, ingredients — съставки, boil — варя, fry — пържа, bake — пека, chop — нарязвам, add — добавям; количества — a teaspoon of salt, 200 grams of flour, half a litre of milk. Вкус: delicious, spicy — люто, sweet, salty.',
        'Пазаруване в магазина и онлайн: on sale — в разпродажба, discount — отстъпка, receipt — касова бележка, refund — връщане на пари, exchange — замяна, order online — поръчвам онлайн, delivery — доставка. Изрази: Could I have a refund, please? It doesn’t fit me. — Не ми става.',
        'Мода и стил: casual/formal clothes, trendy — модерен, second-hand — втора употреба, material — cotton (памук), wool (вълна), leather (кожа). Сравнение: These jeans are not as expensive as those. Online shopping is more convenient but it isn’t always cheaper.',
        'Транспорт: timetable — разписание, platform — перон, single/return ticket — еднопосочен/двупосочен билет, change trains — сменям влак, miss the bus — изпускам автобуса, rush hour — час пик, traffic jam — задръстване. Въпрос: What time does the next train to Burgas leave?',
        'Количества: a few minutes, a little time, too much traffic, not enough money — недостатъчно пари. Примерен текст: I usually do the shopping online because it saves time. Last week I ordered a jacket, but it didn’t fit me, so I sent it back and got a refund. In the city I travel by bus, but in the rush hour there are always traffic jams.',
      ],
      examGoldenRule: 'При пазаруване и пътуване учтивата молба започва с Could I…? / Could you…? — тя звучи естествено и любезно.',
      commonTraps: ['Fit се отнася до размера (It doesn’t fit), suit — до това дали отива (It suits you).', 'Receipt се чете без p: /rɪˈsiːt/.'],
      formulasOrDates: [
        { label: 'Връщане', value: 'Could I have a refund, please?' },
        { label: 'Билет', value: 'A return ticket to Burgas, please.' },
        { label: 'Сравнение', value: 'not as expensive as' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a2-11-daily-chk-1', requirement: 'Имейл до онлайн магазин с молба за замяна', whyNeeded: 'Писането по изучаваните теми е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Поръчка, проблем, молба, благодарност.' },
      { id: 'en-a2-11-daily-chk-2', requirement: 'Моята любима рецепта на английски', whyNeeded: 'Лексиката за храни и количества е в програмата.', isEssentialForSix: false, suggestedNotes: 'Съставки и стъпки с глаголи за готвене.' },
    ],
    flashcards: [
      { id: 'en-a2-11-daily-fc-1', front: 'Как е „касова бележка“?', back: 'receipt', tag: 'Пазаруване' },
      { id: 'en-a2-11-daily-fc-2', front: 'Как е „двупосочен билет“?', back: 'a return ticket', tag: 'Транспорт' },
      { id: 'en-a2-11-daily-fc-3', front: 'Как е „Не ми става“ (за размер)?', back: 'It doesn’t fit me.', tag: 'Пазаруване' },
      { id: 'en-a2-11-daily-fc-4', front: 'Как е „час пик“?', back: 'rush hour', tag: 'Транспорт' },
      { id: 'en-a2-11-daily-fc-5', front: 'Как е „пека“ (в готвенето)?', back: 'bake', tag: 'Готвене' },
      { id: 'en-a2-11-daily-fc-6', front: 'Как е „отстъпка“?', back: 'discount', tag: 'Пазаруване' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: The dress is the right size — it ___ me perfectly.', options: ['suits', 'matches', 'fits', 'wears'], correctIndex: 2, explanation: 'Размер — fit.' },
      { id: 2, question: 'Кое е билет за отиване и връщане?', options: ['single ticket', 'platform ticket', 'receipt', 'return ticket'], correctIndex: 3, explanation: 'Return ticket.' },
      { id: 3, question: 'Попълнете: There is too ___ traffic in the city centre.', options: ['many', 'much', 'few', 'a few'], correctIndex: 1, explanation: 'Traffic е неброимо.' },
      { id: 4, question: 'Попълнете: Online shopping is ___ convenient than going to the shops.', options: ['more', 'most', 'as', 'very'], correctIndex: 0, explanation: 'Сравнителна степен.' },
      { id: 5, question: 'Какво означава miss the bus?', options: ['чакам автобуса', 'изпускам автобуса', 'качвам се на автобуса', 'търся автобуса'], correctIndex: 1, explanation: 'Изпускам.' },
      { id: 6, question: 'Как учтиво искаш връщане на парите?', options: ['Give me my money.', 'Money back now.', 'I want refund.', 'Could I have a refund, please?'], correctIndex: 3, explanation: 'Учтива молба.' },
    ],
    quickQuestions: ['Как да върна стока в магазин?', 'Как да купя билет за влак?', 'Как да обясня рецепта на английски?'],
  },
  {
    ...base,
    id: 'en-a2-11-health',
    monTopicIds: ids('4'),
    title: 'Английски A2 (XI–XII): Здраве и здравословен начин на живот — спорт и здравословно хранене',
    originalNoteExcerpt: 'Тематична област „Здраве и здравословен начин на живот“: спорт и здраве; здравословно хранене. Лексика: видове спорт, основни хранителни продукти, здравословно състояние. Граматика: should, условни изречения 0 и I тип, Present Perfect (ever, never, since, for).',
    summary: {
      overview:
        'За младия човек здравето е въпрос на навици: колко се движим, как се храним, колко спим. Темата учи как да говорим за тези навици и как да даваме и приемаме съвети.',
      keyPoints: [
        'Активен живот: work out — тренирам, keep fit — поддържам форма, warm up — загрявам, stretch — разтягам се, take up a sport — започвам спорт, give up — отказвам се от (give up smoking). Спортни съоръжения: gym, swimming pool, court — корт, pitch — игрище, track — писта.',
        'Хранене: a balanced diet, portion — порция, snack — закуска между храненията, skip breakfast — пропускам закуската, high in sugar/fat — с много захар/мазнини, vegetarian, vegan.',
        'Начин на живот: get enough sleep — спя достатъчно, reduce stress — намалявам стреса, screen time — време пред екрана, avoid — избягвам. Present Perfect за период: I have played tennis for three years. I haven’t eaten fast food since January.',
        'Съвети и последици: You should take up a sport. If you skip breakfast, you feel tired. If you go to bed earlier, you will feel better in the morning. It’s a good idea to drink water instead of fizzy drinks — газирани напитки.',
        'Примерен текст: Two years ago I was always tired, so I decided to change my habits. I took up swimming and I have trained three times a week since then. I have also stopped drinking fizzy drinks. If you want to feel better, you should start with small changes.',
      ],
      examGoldenRule: 'За промяна на навик използвай Present Perfect с for/since — така показваш, че навикът продължава и сега.',
      commonTraps: ['Take up значи „започвам“, а give up — „отказвам се“; не ги бъркай.', 'Fit като прилагателно значи „във форма“: I want to keep fit.'],
      formulasOrDates: [
        { label: 'Навици', value: 'take up / give up / keep fit' },
        { label: 'Период', value: 'I have trained for two years / since 2024.' },
        { label: 'Съвет', value: 'You should… / It’s a good idea to…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a2-11-health-chk-1', requirement: 'Текст „Как промених навиците си“ (100–120 думи)', whyNeeded: 'Разказът за житейския опит е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Present Perfect, Past Simple, съвет накрая.' },
      { id: 'en-a2-11-health-chk-2', requirement: 'Фразови глаголи за спорт и здраве', whyNeeded: 'Те са типични за темата.', isEssentialForSix: false, suggestedNotes: 'work out, warm up, take up, give up.' },
    ],
    flashcards: [
      { id: 'en-a2-11-health-fc-1', front: 'Как е „тренирам“ (фразов глагол)?', back: 'work out', tag: 'Спорт' },
      { id: 'en-a2-11-health-fc-2', front: 'Как е „започвам спорт“?', back: 'take up a sport', tag: 'Спорт' },
      { id: 'en-a2-11-health-fc-3', front: 'Как е „газирани напитки“?', back: 'fizzy drinks', tag: 'Хранене' },
      { id: 'en-a2-11-health-fc-4', front: 'Как е „пропускам закуската“?', back: 'skip breakfast', tag: 'Хранене' },
      { id: 'en-a2-11-health-fc-5', front: 'Как е „поддържам форма“?', back: 'keep fit', tag: 'Здраве' },
      { id: 'en-a2-11-health-fc-6', front: 'Как е „Тренирам от три години“?', back: 'I have trained for three years.', tag: 'Граматика' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: My dad ___ smoking last year.', options: ['took up', 'gave up', 'worked out', 'warmed up'], correctIndex: 1, explanation: 'Отказа се.' },
      { id: 2, question: 'Попълнете: I have been a vegetarian ___ 2023.', options: ['for', 'ago', 'during', 'since'], correctIndex: 3, explanation: 'Начален момент — since.' },
      { id: 3, question: 'Попълнете: If you ___ enough, you feel tired.', options: ['don’t sleep', 'won’t sleep', 'didn’t sleep', 'not sleep'], correctIndex: 0, explanation: 'Нулев тип — факт.' },
      { id: 4, question: 'Кое е място за тенис?', options: ['pitch', 'pool', 'court', 'track'], correctIndex: 2, explanation: 'Корт.' },
      { id: 5, question: 'Попълнете: Before the match the players ___.', options: ['give up', 'warm up', 'take up', 'skip'], correctIndex: 1, explanation: 'Загряват.' },
      { id: 6, question: 'Кое е съвет?', options: ['You should get enough sleep.', 'You get enough sleep.', 'You got enough sleep.', 'You are getting enough sleep.'], correctIndex: 0, explanation: 'Should.' },
    ],
    quickQuestions: ['Как да говоря за спортните си навици?', 'Кои фразови глаголи са за спорт?', 'Как да дам съвет за здравето?'],
  },
  {
    ...base,
    id: 'en-a2-11-nature',
    monTopicIds: ids('5'),
    title: 'Английски A2 (XI–XII): Природа и екология — географски обекти и опазване на околната среда',
    originalNoteExcerpt: 'Тематична област „Природа и екология“: географски обекти; опазване на околната среда. Лексика: метеорологично време, растения и животни, опазване на околната среда; членуване на географски названия (морета, океани, реки, планини, групи острови, пустини). Граматика: will за предсказване, условни изречения I тип.',
    summary: {
      overview:
        'Темата свързва географията с отговорността: какви природни обекти има в България и по света и какво могат да направят младите хора за опазването им.',
      keyPoints: [
        'Природни обекти и описание: peak — връх, slope — склон, gorge — пролом, canyon, bay — залив, cliff — скала (над морето), wetland — влажна зона, national park, nature reserve — природен резерват. Описания: breathtaking — спиращ дъха, unspoilt — недокоснат, protected — защитен.',
        'Членуване: the Atlantic Ocean, the Mediterranean (Sea), the Thames, the Iskar, the Balkan Mountains, the Alps, the British Isles, the Sahara; без член — Mount Olympus, Lake Geneva, Vitosha (като връх/планина в разговорна употреба), континенти и повечето държави.',
        'Екологични проблеми: air/water pollution, deforestation — изсичане на горите, global warming — глобално затопляне, drought — суша, wildfire — горски пожар, endangered species — застрашени видове, waste — отпадъци.',
        'Решения: reduce, reuse, recycle — намалявам, използвам повторно, рециклирам; take part in a clean-up — участвам в почистване; plant trees; use public transport; switch off the lights. Последици: If we plant more trees, the air will be cleaner. If we don’t act now, many species will disappear.',
        'Примерен текст: Last spring our class took part in a clean-up in the Rhodopes. We collected more than fifty bags of rubbish. I was shocked how much plastic people leave in the forest. I think schools should organise more events like this. If more young people join in, our mountains will stay clean.',
      ],
      examGoldenRule: 'Запомни трите R на екологията — reduce, reuse, recycle — и ги използвай в писмен текст като готови решения.',
      commonTraps: ['Species е еднакво в единствено и множествено число: one species, many species.', 'Environment се пише с n преди m: environment.'],
      formulasOrDates: [
        { label: 'Трите R', value: 'reduce, reuse, recycle' },
        { label: 'Последица', value: 'If we…, … will…' },
        { label: 'С член the', value: 'the Iskar, the Alps, the British Isles' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a2-11-nature-chk-1', requirement: 'Статия за училищния вестник за екологична инициатива', whyNeeded: 'Създаването на текст по опорни точки е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Какво, къде, резултат, призив.' },
      { id: 'en-a2-11-nature-chk-2', requirement: 'Карта на България с английските имена на 10 природни обекта', whyNeeded: 'Членуването на географски названия е в програмата.', isEssentialForSix: false, suggestedNotes: 'Реки, планини, Черно море.' },
    ],
    flashcards: [
      { id: 'en-a2-11-nature-fc-1', front: 'Как е „изсичане на горите“?', back: 'deforestation', tag: 'Екология' },
      { id: 'en-a2-11-nature-fc-2', front: 'Как е „суша“?', back: 'drought', tag: 'Екология' },
      { id: 'en-a2-11-nature-fc-3', front: 'Как е „природен резерват“?', back: 'nature reserve', tag: 'Природа' },
      { id: 'en-a2-11-nature-fc-4', front: 'Кои са трите R?', back: 'reduce, reuse, recycle', tag: 'Екология' },
      { id: 'en-a2-11-nature-fc-5', front: 'С член ли е Thames?', back: 'Да — the Thames.', tag: 'Членуване' },
      { id: 'en-a2-11-nature-fc-6', front: 'Как е „горски пожар“?', back: 'wildfire', tag: 'Екология' },
    ],
    quiz: [
      { id: 1, question: 'Кое е правилно?', options: ['the Mount Olympus', 'Alps', 'the Mediterranean', 'the Lake Geneva'], correctIndex: 2, explanation: 'Морета — с the.' },
      { id: 2, question: 'Попълнете: If we don’t save water, there ___ more droughts.', options: ['are', 'were', 'be', 'will be'], correctIndex: 3, explanation: 'I тип условно.' },
      { id: 3, question: 'Кое означава „използвам повторно“?', options: ['reuse', 'reduce', 'refuse', 'remove'], correctIndex: 0, explanation: 'Reuse.' },
      { id: 4, question: 'Попълнете: The panda is an endangered ___.', options: ['specie', 'species', 'speciess', 'specieses'], correctIndex: 1, explanation: 'Species и в единствено число.' },
      { id: 5, question: 'Какво означава take part in a clean-up?', options: ['хвърлям отпадъци', 'купувам почистващи препарати', 'участвам в почистване', 'чистя дома си'], correctIndex: 2, explanation: 'Доброволна акция.' },
      { id: 6, question: 'Кое описание означава „недокоснат“ за природа?', options: ['unspoilt', 'polluted', 'crowded', 'damaged'], correctIndex: 0, explanation: 'Unspoilt.' },
    ],
    quickQuestions: ['Как да опиша природен обект на английски?', 'Какво мога да направя за природата?', 'Кои имена на реки и планини са с the?'],
  },
  {
    ...base,
    id: 'en-a2-11-homeland-world',
    monTopicIds: ids('6'),
    title: 'Английски A2 (XI–XII): Моята родина и светът — България, Обединеното кралство и САЩ, пътуване, празници',
    originalNoteExcerpt: 'Тематична област „Моята родина и светът“ (продължение от A1): България, Обединеното кралство и САЩ — обща информация; пътуване; празници и традиции. Лексика: националности, езици, пътуване, празници. Граматика: Past Progressive, Present Perfect (already, just, yet), бъдеще с Present Progressive и Present Simple.',
    summary: {
      overview:
        'Продължението от A1 задълбочава темата: пътуване в чужбина с всички практически стъпки, сравнение на начина на живот у нас и в англоезичните страни и разказ за празници.',
      keyPoints: [
        'Подготовка за пътуване: travel insurance — застраховка, check in online — регистрирам се онлайн, boarding pass — бордна карта, hand luggage — ръчен багаж, gate — изход, delay — закъснение, cancel — отменям, currency — валута, exchange money — обменям пари.',
        'В чужбина: accommodation — квартира, hostel, book in advance — резервирам предварително, local food, tourist attractions, get lost — изгубвам се, ask for directions. Разписания с Present Simple: Our flight leaves at 6:40. The museum opens at 9.',
        'Сравнение на страни: In the UK people drive on the left. In the USA the currency is the dollar, in the UK — the pound (£), in Bulgaria — the euro. Many British people drink tea with milk. In Bulgaria we celebrate name days, which is unusual in the UK and the USA.',
        'Празници и традиции: Christmas Eve — Бъдни вечер, carol singers — коледари, Easter eggs, pancake day (Великобритания), the Fourth of July — Денят на независимостта на САЩ, St Patrick’s Day (17 март — ирландски празник), name day — имен ден, the Liberation Day (3 март).',
        'Примерен текст: Last summer I visited my cousin in London. While we were waiting at the airport, our flight was delayed for two hours. London was amazing! We have already planned our next trip — we are going to Edinburgh in August. I have never seen a real Scottish castle, so I can’t wait!',
      ],
      examGoldenRule: 'В разказ за пътуване свързвай времената: Past Simple за събитията, Past Progressive за фона, Present Perfect за опита, Present Progressive за уговорените планове.',
      commonTraps: ['While се използва с продължително действие: While we were waiting… (не While we waited при фон).', 'Get lost значи „изгубвам се“, а не „изгубвам нещо“ (I lost my phone).'],
      formulasOrDates: [
        { label: 'Летище', value: 'check in, boarding pass, gate, delay' },
        { label: 'Разписание', value: 'The flight leaves at 6:40.' },
        { label: 'Опит', value: 'I have never seen…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a2-11-home-chk-1', requirement: 'Имейл до приятел за предстоящо пътуване (100–120 думи)', whyNeeded: 'Писането на лично и електронно писмо е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Планове, разписание, какво ще видиш.' },
      { id: 'en-a2-11-home-chk-2', requirement: 'Сравнение на начина на живот в България и Великобритания', whyNeeded: 'Елементите за култура на англоезичните страни са в програмата.', isEssentialForSix: false, suggestedNotes: 'Транспорт, храна, празници, валута.' },
    ],
    flashcards: [
      { id: 'en-a2-11-home-fc-1', front: 'Как е „бордна карта“?', back: 'boarding pass', tag: 'Пътуване' },
      { id: 'en-a2-11-home-fc-2', front: 'Как е „ръчен багаж“?', back: 'hand luggage', tag: 'Пътуване' },
      { id: 'en-a2-11-home-fc-3', front: 'Кой е американският празник на 4 юли?', back: 'Independence Day (the Fourth of July).', tag: 'Празници' },
      { id: 'en-a2-11-home-fc-4', front: 'Как е „имен ден“?', back: 'name day', tag: 'Традиции' },
      { id: 'en-a2-11-home-fc-5', front: 'Как е „Изгубих се“?', back: 'I got lost.', tag: 'Пътуване' },
      { id: 'en-a2-11-home-fc-6', front: 'От коя страна карат във Великобритания?', back: 'Отляво (on the left).', tag: 'Култура' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: While we ___ for the train, it started to snow.', options: ['waited', 'are waiting', 'were waiting', 'have waited'], correctIndex: 2, explanation: 'Фон — Past Progressive.' },
      { id: 2, question: 'Попълнете: Our flight ___ at 6:40 tomorrow (по разписание).', options: ['leaves', 'left', 'has left', 'was leaving'], correctIndex: 0, explanation: 'Разписание — Present Simple.' },
      { id: 3, question: 'Каква е валутата във Великобритания?', options: ['the euro', 'the dollar', 'the lev', 'the pound'], correctIndex: 3, explanation: 'Британска лира.' },
      { id: 4, question: 'Кое изречение е правилно?', options: ['I have never been to Scotland.', 'I have never went to Scotland.', 'I never have been to Scotland yesterday.', 'I was never be to Scotland.'], correctIndex: 0, explanation: 'Present Perfect за опит.' },
      { id: 5, question: 'Кой празник е ирландски?', options: ['Thanksgiving', 'St Patrick’s Day', 'Bonfire Night', 'Liberation Day'], correctIndex: 1, explanation: '17 март.' },
      { id: 6, question: 'Какво означава delay?', options: ['отмяна', 'регистрация', 'закъснение', 'изход'], correctIndex: 2, explanation: 'Закъснение на полет.' },
    ],
    quickQuestions: ['Какво да кажа на летището?', 'С какво се различава животът във Великобритания?', 'Как да разкажа за празниците в България?'],
  },
  {
    ...base,
    id: 'en-a2-11-skills',
    monTopicIds: ids('skills'),
    title: 'Английски A2 (XI–XII): слушане, четене, говорене и писане — какво трябва да мога',
    originalNoteExcerpt: 'Слушане: общо съдържание и най-същественото в кратки послания, обяви, съобщения; често употребявана лексика; диалози; основна информация от адаптирани текстове и от медиите; кратък разговор между носители на езика. Четене: кратки писма, покани, имейли; ограничени по обем текстове на стандартен език — тема, основни моменти, действащи лица; реклами, менюта, разписания, указания. Говорене: контакт и обмен на информация, мнения и идеи; всекидневни ситуации; кратък разговор; чувства, мнение, съгласие/несъгласие; описания; разказ. Писане: формуляр (CV — Europass), лично и електронно писмо, текст по опорни точки — 100–120 думи.',
    summary: {
      overview:
        'Програмата за XI–XII клас довежда до ниво A2 — общуване в обичайни ситуации с прости, но свързани изречения. Целта е ученикът да се справя самостоятелно в реални ситуации и с кратки писмени задачи.',
      keyPoints: [
        'Слушане: разбираш общото съдържание и най-важното в кратки съобщения и обяви (на гарата, по радиото), диалози по изучаваните теми и основната информация от кратки предавания; в разговор на носители на езика разпознаваш участниците, темата, мненията и чувствата им.',
        'Четене: разбираш основната информация и важните подробности в лични писма, покани и имейли; в кратки текстове на стандартен език откриваш темата, основните моменти и героите; ориентираш се в реклами, менюта, разписания и инструкции.',
        'Говорене: установяваш контакт и обменяш информация и мнения; общуваш във всекидневни ситуации (магазин, транспорт, лекар); участваш в кратък разговор за собствения си опит; изразяваш чувства, мнение, съгласие или несъгласие; описваш и разказваш за минало, настояще и бъдеще.',
        'Писане: попълваш формуляр с подробни лични данни (CV — Europass); пишеш лично и електронно писмо; създаваш текст по опорни точки или въпроси за случки от живота. Обемът на писмения текст е 100–120 думи.',
        'Стратегии: при слушане и четене — предвиждане по заглавието и снимките, търсене на ключови думи; при говорене — перифраза и молба за пояснение; при писане — план преди текста, свързващи думи (first, then, however, because, so) и проверка накрая.',
      ],
      examGoldenRule: 'Преди да пишеш, направи план по точките на задачата; след като напишеш, провери времената, членовете и обема (100–120 думи).',
      commonTraps: ['Текст под или над обема губи точки — броят на думите е част от задачата.', 'Не оставяй въпрос без отговор при четене — опитай се да изключиш грешните варианти.'],
      formulasOrDates: [
        { label: 'Обем', value: '100–120 думи' },
        { label: 'Свързващи думи', value: 'first, then, however, because, so' },
        { label: 'Ниво', value: 'A2 по Общата европейска езикова рамка' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a2-11-skills-chk-1', requirement: 'Чеклист за проверка на писмен текст', whyNeeded: 'Правописът и изпълнението на задачата се оценяват.', isEssentialForSix: true, suggestedNotes: 'Точки от задачата, времена, членове, обем, пунктуация.' },
      { id: 'en-a2-11-skills-chk-2', requirement: 'Фрази за ситуации: магазин, гара, лекар', whyNeeded: 'Общуването във всекидневни ситуации е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'По 5 изречения.' },
    ],
    flashcards: [
      { id: 'en-a2-11-skills-fc-1', front: 'Какъв е обемът на писмения текст на A2 в XI–XII клас?', back: '100–120 думи.', tag: 'Писане' },
      { id: 'en-a2-11-skills-fc-2', front: 'Свързваща дума за противопоставяне', back: 'however', tag: 'Писане' },
      { id: 'en-a2-11-skills-fc-3', front: 'Как се моли за пояснение?', back: 'Sorry, what do you mean?', tag: 'Говорене' },
      { id: 'en-a2-11-skills-fc-4', front: 'Какво правиш, преди да слушаш?', back: 'Чета въпросите и предвиждам отговорите.', tag: 'Слушане' },
      { id: 'en-a2-11-skills-fc-5', front: 'Как започва официален имейл?', back: 'Dear Sir or Madam,', tag: 'Писане' },
      { id: 'en-a2-11-skills-fc-6', front: 'Как се изразява съгласие?', back: 'I agree with you. / That’s true.', tag: 'Говорене' },
    ],
    quiz: [
      { id: 1, question: 'Каква е добрата първа стъпка при писане?', options: ['да започнеш без план', 'да напишеш колкото повече думи', 'да направиш план по точките на задачата', 'да преведеш от български'], correctIndex: 2, explanation: 'План по точките.' },
      { id: 2, question: 'Коя дума въвежда причина?', options: ['however', 'because', 'then', 'first'], correctIndex: 1, explanation: 'Защото.' },
      { id: 3, question: 'Как учтиво искаш пояснение?', options: ['What?', 'Repeat!', 'You are not clear.', 'Sorry, what do you mean?'], correctIndex: 3, explanation: 'Учтива молба.' },
      { id: 4, question: 'Какъв е обемът на писмения текст?', options: ['100–120 думи', '30–40 думи', '250–300 думи', 'без ограничение'], correctIndex: 0, explanation: 'По програмата.' },
      { id: 5, question: 'Какво помага при четене на непознат текст?', options: ['да спреш при първата непозната дума', 'заглавието, снимките и ключовите думи', 'да четеш само последния ред', 'да превеждаш всяка дума'], correctIndex: 1, explanation: 'Предвиждане и ключови думи.' },
      { id: 6, question: 'Как започва официален имейл до непознат?', options: ['Dear Sir or Madam,', 'Hi mate,', 'Hey!', 'Love,'], correctIndex: 0, explanation: 'Официално обръщение.' },
    ],
    quickQuestions: ['Как да проверя писмения си текст?', 'Как да се справя с непознати думи при четене?', 'Каква е разликата между официален и неофициален имейл?'],
  },
  {
    ...base,
    id: 'en-a2-11-grammar',
    monTopicIds: ids('grammar'),
    title: 'Английски A2 (XI–XII): езикови знания — модални глаголи, времена, условни и относителни изречения',
    originalNoteExcerpt: 'Граматика: спомагателни have, will; модални — be able to; should; would like (vs like); (not) be allowed to; have to; don’t have to. Времена: изразяване на бъдеще (Present Progressive, Present Simple), Future Simple (will — предсказване), Past Progressive, Present Perfect (ever, never, already, just, yet, since, for). Условни изречения 0 и I тип. Герундий. Членуване (zero article, географски названия); a little, a few. Местоимения: someone, nothing, anyone; относителни; възвратни. Прилагателни: as … as, little, -ed/-ing. Наречия: степен (quite, very, too, enough), честота (ever, once, twice), начин; well, hard, fast; място на наречието. Числа до 1000, милион. Предлози за движение; прилагателни и глаголи с предлози. Синтаксис: сложно съчинено (and, but, or, so) и сложно съставно изречение (because, when, определителни).',
    summary: {
      overview:
        'Граматиката на A2 в горния курс надгражда A1 с времената, които свързват миналото и настоящето, с начините за бъдеще и с модалните глаголи за правила, съвети и възможности.',
      keyPoints: [
        'Модални и спомагателни: be able to (способност, и в бъдеще: I’ll be able to come); should (съвет); would like (желание: I would like to travel ≠ I like travelling); be allowed to (позволение: Are we allowed to use dictionaries?); have to / don’t have to (задължение / липса на необходимост).',
        'Времена: Past Progressive — действие в процес в минал момент (At 9 p.m. I was watching a film); Present Perfect — опит (Have you ever…? I’ve never…), резултат (I’ve just finished, I’ve already done it, Have you done it yet?), период (for two years, since 2022); бъдеще — will за предсказване (It will be sunny), Present Progressive за уговорки, Present Simple за разписания.',
        'Условни изречения: нулев тип (If you mix red and white, you get pink) и I тип (If I pass my exams, I will go to university). Герундий след предлози и някои глаголи: I’m good at drawing. I enjoy reading. Thank you for helping.',
        'Членове и количество: zero article за общи понятия (Life is beautiful. I love music.); the пред реки, морета, планински вериги; a little/a few — малко, но достатъчно (a little money, a few friends); little/few — малко, недостатъчно.',
        'Наречия и изречения: степен — quite (доста), very, too (прекалено: too hot), enough (достатъчно: old enough); честота — once, twice, three times a week; място — наречието за честота преди основния глагол, за начин и време — накрая (She sings beautifully every day). Сложни изречения с and, but, or, so, because, when и определителни подчинени изречения с who, which, that, whose, where.',
      ],
      examGoldenRule: 'Enough стои след прилагателното (old enough), но преди съществителното (enough money); too стои преди прилагателното (too young).',
      commonTraps: ['A few/a little имат положителен смисъл („няколко, някакво количество“), few/little — отрицателен („почти няма“).', 'След enjoy, finish, avoid следва -ing: I enjoy swimming (не I enjoy to swim).'],
      formulasOrDates: [
        { label: 'Too / enough', value: 'too young / old enough / enough money' },
        { label: 'Условие I тип', value: 'If + Present Simple, will + глагол' },
        { label: 'Герундий', value: 'enjoy/finish/avoid + -ing; предлог + -ing' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a2-11-gram-chk-1', requirement: 'Таблица на времената от нивото с маркери за време', whyNeeded: 'Глаголните времена са ядрото на граматиката.', isEssentialForSix: true, suggestedNotes: 'Past Simple, Past Progressive, Present Perfect, бъдеще.' },
      { id: 'en-a2-11-gram-chk-2', requirement: 'Глаголи, след които следва -ing', whyNeeded: 'Герундият е в програмата.', isEssentialForSix: false, suggestedNotes: 'enjoy, finish, avoid, mind, suggest…' },
    ],
    flashcards: [
      { id: 'en-a2-11-gram-fc-1', front: 'Къде стои enough при прилагателно?', back: 'След него: old enough.', tag: 'Наречия' },
      { id: 'en-a2-11-gram-fc-2', front: 'Какво следва след enjoy?', back: '-ing: I enjoy reading.', tag: 'Герундий' },
      { id: 'en-a2-11-gram-fc-3', front: 'Каква е разликата между few и a few?', back: 'a few — няколко; few — почти никакви.', tag: 'Количество' },
      { id: 'en-a2-11-gram-fc-4', front: 'Как се пита за позволение?', back: 'Are we allowed to…?', tag: 'Модални' },
      { id: 'en-a2-11-gram-fc-5', front: 'Кое време е за действие в процес в минал момент?', back: 'Past Progressive: I was watching TV at 9.', tag: 'Времена' },
      { id: 'en-a2-11-gram-fc-6', front: 'Как е „три пъти седмично“?', back: 'three times a week', tag: 'Честота' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: He isn’t old ___ to drive.', options: ['too', 'very', 'enough', 'quite'], correctIndex: 2, explanation: 'Прилагателно + enough.' },
      { id: 2, question: 'Попълнете: I enjoy ___ to music.', options: ['listen', 'listening', 'to listen', 'listened'], correctIndex: 1, explanation: 'Enjoy + -ing.' },
      { id: 3, question: 'Попълнете: At 8 o’clock yesterday I ___ dinner.', options: ['have', 'had had', 'am having', 'was having'], correctIndex: 3, explanation: 'Действие в процес в минал момент.' },
      { id: 4, question: 'Попълнете: I have ___ friends here, so I’m not lonely.', options: ['a few', 'few', 'a little', 'little'], correctIndex: 0, explanation: 'Положителен смисъл, броимо.' },
      { id: 5, question: 'Попълнете: It’s ___ cold to swim today.', options: ['enough', 'too', 'very much', 'so much'], correctIndex: 1, explanation: 'Прекалено студено.' },
      { id: 6, question: 'Попълнете: ___ we allowed to use calculators?', options: ['Do', 'Have', 'Are', 'Can'], correctIndex: 2, explanation: 'Be allowed to.' },
    ],
    quickQuestions: ['Кога too и кога enough?', 'Кои глаголи искат -ing?', 'Как да говоря за опит с Present Perfect?'],
  },
];
