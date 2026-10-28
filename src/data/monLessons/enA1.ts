import type { LessonData } from '../../types';

// Английски език, ниво A1 (втори чужд език, IX–X клас) — по един урок за всяка тема от учебната програма на МОН
// (https://www.mon.bg/nfs/2023/11/up_ae_a1.pdf): шестте тематични области, уменията и езиковите знания.
// Обяснения на български, примери на английски; примерните текстове са написани за урока.

const base = { subject: 'Английски език', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ae-a1:${num}`];

export const MON_LESSONS_EN_A1: LessonData[] = [
  {
    ...base,
    id: 'en-a1-me-and-others',
    monTopicIds: ids('1'),
    title: 'Английски A1: Аз и другите — лична информация, семейство и приятели',
    originalNoteExcerpt: 'Тематична област „Аз и другите“: лична информация (име, възраст, дата и място на раждане, националност, местоживеене); семейство и приятели (роднински връзки). Речеви етикет — поздрав, представяне, запознаване, сбогуване. Писане — попълване на формуляр, кратко представяне (60–80 думи).',
    summary: {
      overview:
        'Първата тема на ниво A1 учи как да се представиш и да разкажеш за семейството и приятелите си с прости изречения — това е основата на всеки разговор на английски.',
      keyPoints: [
        'Лична информация: name — име, surname — фамилия, age — възраст, date of birth — дата на раждане, place of birth — място на раждане, nationality — националност (Bulgarian, British, American), address — адрес. Въпроси: What’s your name? How old are you? Where are you from? Where do you live? When is your birthday?',
        'Семейство: mother/mum, father/dad, parents, brother, sister, grandmother, grandfather, aunt, uncle, cousin, son, daughter. Притежание: my sister’s name (името на сестра ми), my parents’ house (къщата на родителите ми).',
        'Представяне и запознаване: Hello! / Hi! — Здравей!; My name is… / I’m… — Казвам се…; Nice to meet you. — Приятно ми е.; This is my friend Maria. — Това е приятелката ми Мария.; Goodbye! / See you! — Довиждане! / До скоро!',
        'Граматика в темата: глаголът be (I am, you are, he/she is); have got (I have got two brothers. Have you got a sister?); притежателни местоимения (my, your, his, her, our, their); числа до 100 за възраст и телефон.',
        'Примерен текст: Hi! I’m Elena and I’m fifteen. I’m from Plovdiv, Bulgaria. I have got one brother, Martin. He is ten. My best friend is Ana. She is very kind and funny. We go to the same school. — На A1 писменият текст е 60–70 думи в IX клас и 70–80 думи в X клас.',
      ],
      examGoldenRule: 'При представяне отговаряй на петте основни въпроса: кой си, на колко си години, откъде си, къде живееш, с кого живееш.',
      commonTraps: ['На английски възрастта се казва с be, а не с have: I am fifteen (не I have fifteen).', 'Националностите и езиците се пишат с главна буква: Bulgarian, English.'],
      formulasOrDates: [
        { label: 'Представяне', value: 'My name is… / I’m … years old. / I’m from…' },
        { label: 'Семейство', value: 'I have got a brother. / My mum’s name is…' },
        { label: 'Обем на текста', value: '60–80 думи' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a1-me-chk-1', requirement: 'Кратко представяне на себе си (60–70 думи)', whyNeeded: 'Описването на себе си с прости изречения е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Име, възраст, град, семейство, приятел.' },
      { id: 'en-a1-me-chk-2', requirement: 'Родословно дърво с английските думи', whyNeeded: 'Лексиката за роднински връзки е в програмата.', isEssentialForSix: false, suggestedNotes: 'mother, father, aunt, uncle, cousin…' },
    ],
    flashcards: [
      { id: 'en-a1-me-fc-1', front: 'Как се пита „На колко години си?“', back: 'How old are you?', tag: 'Въпроси' },
      { id: 'en-a1-me-fc-2', front: 'Как е „братовчед“ на английски?', back: 'cousin', tag: 'Семейство' },
      { id: 'en-a1-me-fc-3', front: 'Как се казва „Приятно ми е“?', back: 'Nice to meet you.', tag: 'Етикет' },
      { id: 'en-a1-me-fc-4', front: 'Как е „Имам една сестра“?', back: 'I have got one sister.', tag: 'Граматика' },
      { id: 'en-a1-me-fc-5', front: 'Как се казва „името на брат ми“?', back: 'my brother’s name', tag: 'Притежание' },
      { id: 'en-a1-me-fc-6', front: 'Как е „националност“ на английски?', back: 'nationality', tag: 'Лична информация' },
    ],
    quiz: [
      { id: 1, question: 'Кое изречение е правилно?', options: ['I have fifteen years.', 'I am fifteen years.', 'I am fifteen.', 'I has fifteen.'], correctIndex: 2, explanation: 'Възрастта се казва с be.' },
      { id: 2, question: 'Изберете правилната дума: My mother’s sister is my ___.', options: ['cousin', 'uncle', 'grandmother', 'aunt'], correctIndex: 3, explanation: 'Леля — aunt.' },
      { id: 3, question: 'Как се отговаря на Nice to meet you?', options: ['Nice to meet you, too.', 'Goodbye.', 'I’m fine.', 'Yes, I am.'], correctIndex: 0, explanation: 'Връщаме любезността.' },
      { id: 4, question: 'Попълнете: ___ you got a brother?', options: ['Do', 'Are', 'Has', 'Have'], correctIndex: 3, explanation: 'Have you got…?' },
      { id: 5, question: 'Как се пише правилно?', options: ['I am bulgarian.', 'I am Bulgarian.', 'i am Bulgarian.', 'I am BULGARIAN'], correctIndex: 1, explanation: 'Националностите — с главна буква.' },
      { id: 6, question: 'Попълнете: This is Ana. ___ is my best friend.', options: ['He', 'It', 'She', 'They'], correctIndex: 2, explanation: 'За момиче — she.' },
    ],
    quickQuestions: ['Как да се представя на английски на нов приятел?', 'Как се казват роднините на английски?', 'Какво да напиша в кратко представяне?'],
  },
  {
    ...base,
    id: 'en-a1-world-around-me',
    monTopicIds: ids('2'),
    title: 'Английски A1: Светът около мен — моят дом, родното място и училището',
    originalNoteExcerpt: 'Тематична област „Светът около мен“: моят дом, моето родно място; моето училище — учебни предмети и дейности. Лексика: описание на дома, градска и селска среда, учебни предмети. Граматика: there is/are, предлози за място, have got.',
    summary: {
      overview:
        'Тази тема учи как да опишеш къде живееш и как минава денят ти в училище — какво има в дома ти, какъв е градът или селото ти и кои предмети учиш.',
      keyPoints: [
        'Домът: house — къща, flat/apartment — апартамент, room — стая, living room — хол, kitchen — кухня, bedroom — спалня, bathroom — баня, garden — градина; мебели: bed, table, chair, sofa, wardrobe — гардероб, desk — бюро.',
        'Родното място: city — голям град, town — град, village — село, street — улица, square — площад, park, shop, school, hospital, river, mountain; in the city centre — в центъра, near the sea — близо до морето.',
        'Училището: subjects — учебни предмети: Maths, Bulgarian, English, History, Geography, Biology, Physics, Chemistry, Art, Music, PE (физическо възпитание), IT; classroom — класна стая, timetable — програма, break — междучасие, teacher, classmate — съученик.',
        'Граматика в темата: There is a sofa in the living room. There are two bedrooms. Is there a garden? — Yes, there is. Предлози за място: in, on, under, next to — до, between — между, in front of — пред, behind — зад.',
        'Примерен текст: I live in a flat in Varna. It is near the sea. There are three rooms: a living room, a kitchen and my bedroom. In my room there is a bed, a desk and a big window. My favourite subject is English. Our school has got a big gym and a library.',
      ],
      examGoldenRule: 'За описание на място използвай верига: There is / There are + предмет + предлог за място (There is a desk next to the window).',
      commonTraps: ['There is се използва с единствено число, There are — с множествено: There are two chairs.', 'Учебните предмети се пишат с главна буква, когато са имена на езици: English, Bulgarian.'],
      formulasOrDates: [
        { label: 'Има', value: 'There is a… / There are some…' },
        { label: 'Предлози', value: 'in, on, under, next to, between, in front of, behind' },
        { label: 'Любим предмет', value: 'My favourite subject is…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a1-world-chk-1', requirement: 'Описание на моята стая с There is/are и предлози', whyNeeded: 'Описването на заобикалящата среда е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Мебели, къде се намират, цветове.' },
      { id: 'en-a1-world-chk-2', requirement: 'Седмичната програма на английски', whyNeeded: 'Лексиката за учебни предмети е в програмата.', isEssentialForSix: false, suggestedNotes: 'Дни и предмети.' },
    ],
    flashcards: [
      { id: 'en-a1-world-fc-1', front: 'Как е „гардероб“?', back: 'wardrobe', tag: 'Дом' },
      { id: 'en-a1-world-fc-2', front: 'Как се казва „В стаята има две легла“?', back: 'There are two beds in the room.', tag: 'Граматика' },
      { id: 'en-a1-world-fc-3', front: 'Как е „физическо възпитание“?', back: 'PE (Physical Education)', tag: 'Училище' },
      { id: 'en-a1-world-fc-4', front: 'Как е „между“?', back: 'between', tag: 'Предлози' },
      { id: 'en-a1-world-fc-5', front: 'Как е „село“?', back: 'village', tag: 'Родно място' },
      { id: 'en-a1-world-fc-6', front: 'Как е „междучасие“?', back: 'break', tag: 'Училище' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: There ___ two windows in my room.', options: ['is', 'are', 'be', 'am'], correctIndex: 1, explanation: 'Множествено число — there are.' },
      { id: 2, question: 'Кое означава „пред“?', options: ['behind', 'between', 'next to', 'in front of'], correctIndex: 3, explanation: 'Behind е „зад“.' },
      { id: 3, question: 'Където спим, е ___.', options: ['the kitchen', 'the bathroom', 'the bedroom', 'the garden'], correctIndex: 2, explanation: 'Спалня — bedroom.' },
      { id: 4, question: 'Кой е правилният отговор на Is there a garden?', options: ['Yes, there is.', 'Yes, it is.', 'Yes, I am.', 'Yes, there are.'], correctIndex: 0, explanation: 'Кратък отговор с there is.' },
      { id: 5, question: 'Кое е учебен предмет?', options: ['timetable', 'classroom', 'break', 'Geography'], correctIndex: 3, explanation: 'География.' },
      { id: 6, question: 'Попълнете: The book is ___ the table. (върху)', options: ['under', 'in', 'on', 'behind'], correctIndex: 2, explanation: 'On — върху.' },
    ],
    quickQuestions: ['Как да опиша къщата си на английски?', 'Как се казват предметите в училище?', 'Как да кажа къде се намира нещо?'],
  },
  {
    ...base,
    id: 'en-a1-everyday-life',
    monTopicIds: ids('3'),
    title: 'Английски A1: Всекидневие — моят ден, свободно време и любими занимания',
    originalNoteExcerpt: 'Тематична област „Всекидневие“: моят ден; свободно време; любими занимания. Лексика: дейности от всекидневието, интереси (книги, кино, медии, социални мрежи), часове и дни. Граматика: Present Simple, наречия за честота (always, usually, often, never), предлози за време (in, on, at).',
    summary: {
      overview:
        'Тук учим как да разкажем какво правим всеки ден и в свободното си време — кога ставаме, кога учим, какво обичаме да правим.',
      keyPoints: [
        'Дейности през деня: get up — ставам, have breakfast — закусвам, go to school — отивам на училище, have lunch — обядвам, do my homework — пиша домашни, have dinner — вечерям, go to bed — лягам си.',
        'Часове: It’s seven o’clock. — Седем часа е.; at half past seven — в седем и половина; at quarter to eight — в осем без петнайсет. Дни: Monday … Sunday; at the weekend — през уикенда.',
        'Свободно време и интереси: play football/computer games, read books, watch films/TV, listen to music, go to the cinema, meet friends, ride a bike, draw — рисувам, dance. Обичам: I like/love/enjoy + -ing (I love reading.).',
        'Граматика: Present Simple за навици — I get up at 7. She gets up at 6. (в 3 л. ед. ч. се добавя -s/-es); въпрос и отрицание с do/does: Do you play tennis? She doesn’t like coffee. Наречия за честота преди основния глагол: I always/usually/often/sometimes/never…; предлози за време: at 7 o’clock, on Monday, in the morning/in July.',
        'Примерен текст: On weekdays I get up at seven. I have breakfast and go to school at half past seven. I usually do my homework in the afternoon. In my free time I play basketball or listen to music. At the weekend I often meet my friends. I never watch TV in the morning.',
      ],
      examGoldenRule: 'За навици и ежедневие използвай Present Simple и не забравяй -s в трето лице: he plays, she watches, it goes.',
      commonTraps: ['Наречието за честота стои преди основния глагол, но след be: I always walk, но I am always late.', 'Използвай at за часове, on за дни, in за части от деня и месеци.'],
      formulasOrDates: [
        { label: 'Навици', value: 'I usually get up at seven.' },
        { label: '3 л. ед. ч.', value: 'he plays, she watches, he goes' },
        { label: 'Предлози', value: 'at 7, on Monday, in the morning' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a1-day-chk-1', requirement: 'Моят обикновен ден (60–70 думи)', whyNeeded: 'Разказът за всекидневието е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Часове, дейности, наречия за честота.' },
      { id: 'en-a1-day-chk-2', requirement: 'Таблица на наречията за честота', whyNeeded: 'Те са част от граматиката на нивото.', isEssentialForSix: false, suggestedNotes: 'always 100% … never 0%.' },
    ],
    flashcards: [
      { id: 'en-a1-day-fc-1', front: 'Как е „лягам си“?', back: 'go to bed', tag: 'Ден' },
      { id: 'en-a1-day-fc-2', front: 'Как е „в седем и половина“?', back: 'at half past seven', tag: 'Часове' },
      { id: 'en-a1-day-fc-3', front: 'Как е „Тя става в 6“?', back: 'She gets up at six.', tag: 'Граматика' },
      { id: 'en-a1-day-fc-4', front: 'Как е „Обичам да чета“?', back: 'I love reading.', tag: 'Интереси' },
      { id: 'en-a1-day-fc-5', front: 'Как е „никога“?', back: 'never', tag: 'Честота' },
      { id: 'en-a1-day-fc-6', front: 'Как е „през уикенда“?', back: 'at the weekend', tag: 'Време' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: She ___ to school by bus.', options: ['go', 'going', 'goes', 'is go'], correctIndex: 2, explanation: '3 л. ед. ч. — goes.' },
      { id: 2, question: 'Кое изречение е правилно?', options: ['I go always to bed at ten.', 'Always I go to bed at ten.', 'I go to bed always at ten.', 'I always go to bed at ten.'], correctIndex: 3, explanation: 'Наречието е преди основния глагол.' },
      { id: 3, question: 'Попълнете: I play football ___ Saturday.', options: ['on', 'in', 'at', 'to'], correctIndex: 0, explanation: 'On за дни.' },
      { id: 4, question: 'Попълнете: ___ your brother like pizza?', options: ['Do', 'Is', 'Are', 'Does'], correctIndex: 3, explanation: 'Трето лице — does.' },
      { id: 5, question: 'Кое означава „пиша домашни“?', options: ['make my homework', 'do my homework', 'write my home', 'have my homework'], correctIndex: 1, explanation: 'Do homework.' },
      { id: 6, question: 'Как е „седем часа е“?', options: ['It’s seven o’clock.', 'It’s seven hours.', 'Is seven clock.', 'There is seven.'], correctIndex: 0, explanation: 'O’clock за точен час.' },
    ],
    quickQuestions: ['Как да разкажа деня си на английски?', 'Кога се слага -s на глагола?', 'Как да кажа колко е часът?'],
  },
  {
    ...base,
    id: 'en-a1-health-body',
    monTopicIds: ids('4'),
    title: 'Английски A1: Здраве и здравословен начин на живот — части на тялото',
    originalNoteExcerpt: 'Тематична област „Здраве и здравословен начин на живот“: части на човешкото тяло. Лексика: части на тялото; здравословно състояние, основни понятия (здрав, болен). Изрази: I’ve got a headache. My leg hurts. Модални глаголи: must, mustn’t, can.',
    summary: {
      overview:
        'В тази тема учим частите на тялото и как да кажем, че нещо ни боли — важни думи за посещение при лекар или разговор за здравето.',
      keyPoints: [
        'Части на тялото: head — глава, face — лице, eye/eyes — око/очи, ear — ухо, nose — нос, mouth — уста, tooth/teeth — зъб/зъби, neck — врат, shoulder — рамо, arm — ръка (от рамото), hand — длан/ръка, finger — пръст, back — гръб, stomach — стомах, leg — крак, knee — коляно, foot/feet — стъпало/стъпала.',
        'Здраве: healthy — здрав (за начин на живот), well — добре, ill/sick — болен, tired — уморен, a cold — настинка, a temperature — температура, medicine — лекарство, doctor, dentist — зъболекар.',
        'Как казваме, че ни боли: I’ve got a headache/toothache/stomachache/sore throat. — Боли ме глава/зъб/стомах/гърло.; My leg hurts. — Боли ме кракът.; What’s the matter? / What’s wrong? — Какво ти е?',
        'Граматика в темата: неправилни множествени числа — tooth → teeth, foot → feet; модални глаголи за съвет и задължение: You must stay in bed. You mustn’t eat sweets. You can go to school tomorrow.',
        'Примерен диалог: — What’s the matter, Tom? — I’ve got a headache and a temperature. — You must see a doctor. Drink a lot of water and go to bed early. — Thank you!',
      ],
      examGoldenRule: 'За болка използвай I’ve got a + -ache (headache, toothache) или My + част на тялото + hurts.',
      commonTraps: ['Множественото число на tooth е teeth, на foot — feet (не tooths, foots).', 'Arm е ръката от рамото до китката, hand — дланта с пръстите.'],
      formulasOrDates: [
        { label: 'Болка', value: 'I’ve got a headache. / My back hurts.' },
        { label: 'Въпрос', value: 'What’s the matter?' },
        { label: 'Съвет', value: 'You must… / You mustn’t…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a1-health-chk-1', requirement: 'Рисунка на човек с надписани части на тялото', whyNeeded: 'Лексиката за части на тялото е в програмата.', isEssentialForSix: true, suggestedNotes: 'Поне 15 думи.' },
      { id: 'en-a1-health-chk-2', requirement: 'Диалог при лекаря', whyNeeded: 'Изразяването на потребности е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'What’s the matter? I’ve got… You must…' },
    ],
    flashcards: [
      { id: 'en-a1-health-fc-1', front: 'Как е „зъби“?', back: 'teeth', tag: 'Тяло' },
      { id: 'en-a1-health-fc-2', front: 'Как е „Боли ме главата“?', back: 'I’ve got a headache.', tag: 'Здраве' },
      { id: 'en-a1-health-fc-3', front: 'Как е „коляно“?', back: 'knee', tag: 'Тяло' },
      { id: 'en-a1-health-fc-4', front: 'Как се пита „Какво ти е?“', back: 'What’s the matter?', tag: 'Въпроси' },
      { id: 'en-a1-health-fc-5', front: 'Как е „настинка“?', back: 'a cold', tag: 'Здраве' },
      { id: 'en-a1-health-fc-6', front: 'Как е „Не трябва да ядеш сладкиши“?', back: 'You mustn’t eat sweets.', tag: 'Модални' },
    ],
    quiz: [
      { id: 1, question: 'Множественото число на foot е:', options: ['foots', 'feets', 'feet', 'footes'], correctIndex: 2, explanation: 'Неправилна форма.' },
      { id: 2, question: 'Как се казва „Боли ме зъб“?', options: ['I’ve got a toothache.', 'I have tooth pain me.', 'My tooth is ache.', 'I am toothache.'], correctIndex: 0, explanation: 'I’ve got a toothache.' },
      { id: 3, question: 'Попълнете: You ___ stay in bed. (трябва)', options: ['mustn’t', 'can’t', 'don’t', 'must'], correctIndex: 3, explanation: 'Must — задължение.' },
      { id: 4, question: 'Кое е част от лицето?', options: ['knee', 'nose', 'shoulder', 'back'], correctIndex: 1, explanation: 'Нос.' },
      { id: 5, question: 'Попълнете: My legs ___.', options: ['hurts', 'hurting', 'hurt', 'is hurt'], correctIndex: 2, explanation: 'Множествено число — hurt.' },
      { id: 6, question: 'Кое означава „болен“?', options: ['healthy', 'tired', 'well', 'ill'], correctIndex: 3, explanation: 'Ill/sick — болен.' },
    ],
    quickQuestions: ['Как да обясня на лекар какво ме боли?', 'Кои части на тялото имат неправилно множествено число?', 'Как да дам съвет на болен приятел?'],
  },
  {
    ...base,
    id: 'en-a1-nature',
    monTopicIds: ids('5'),
    title: 'Английски A1: Природа и екология — сезони, време, растения, животни и домашни любимци',
    originalNoteExcerpt: 'Тематична област „Природа и екология“: сезони, време, климат; растения и животни; домашни любимци. Лексика: метеорологично време (дъжд, сняг, слънце, вятър, буря, наводнение), цветове, растения и животни. Граматика: It’s sunny/raining; степенуване на прилагателните.',
    summary: {
      overview:
        'Тази тема учи как да говорим за времето, сезоните и животните — от прогнозата за утре до любимия ни домашен любимец.',
      keyPoints: [
        'Сезони и месеци: spring — пролет, summer — лято, autumn (BrE)/fall (AmE) — есен, winter — зима; месеците се пишат с главна буква: January, February… December; in winter, in July.',
        'Времето: What’s the weather like? — Какво е времето?; It’s sunny/cloudy/windy/rainy/snowy/foggy. — Слънчево/облачно/ветровито/дъждовно/снежно/мъгливо е.; It’s raining/snowing. — Вали дъжд/сняг.; It’s hot/warm/cold. Природни явления: storm — буря, flood — наводнение.',
        'Растения и животни: tree, flower, grass, forest; диви животни — bear (мечка), wolf (вълк), fox (лисица), deer (елен), eagle (орел); селскостопански — cow, horse, sheep (мн. ч. sheep), pig, hen.',
        'Домашни любимци: dog, cat, rabbit, hamster, parrot — папагал, fish (мн. ч. fish); грижи — feed — храня, walk the dog — разхождам кучето, clean the cage — чистя клетката.',
        'Граматика: степенуване — cold → colder → the coldest; hot → hotter → the hottest; beautiful → more beautiful → the most beautiful; good → better → the best. Пример: Winter is colder than autumn. My dog is the best dog in the world!',
      ],
      examGoldenRule: 'За времето използвай It’s + прилагателно (It’s sunny) или It’s + -ing за валеж в момента (It’s raining).',
      commonTraps: ['Sheep и fish са еднакви в единствено и множествено число: two sheep, three fish.', 'Къси прилагателни получават -er/-est, дълги — more/the most: more beautiful, не beautifuller.'],
      formulasOrDates: [
        { label: 'Времето', value: 'What’s the weather like? — It’s sunny.' },
        { label: 'Сравнение', value: 'colder than, the coldest' },
        { label: 'Сезони', value: 'spring, summer, autumn, winter' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a1-nature-chk-1', requirement: 'Кратко описание на любимия ми сезон или домашен любимец', whyNeeded: 'Описването на заобикалящата среда е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Времето, дейности, сравнения.' },
      { id: 'en-a1-nature-chk-2', requirement: 'Таблица на степенуването на 10 прилагателни', whyNeeded: 'Степенуването е част от граматиката на нивото.', isEssentialForSix: false, suggestedNotes: 'Включи good и bad.' },
    ],
    flashcards: [
      { id: 'en-a1-nature-fc-1', front: 'Как е „ветровито е“?', back: 'It’s windy.', tag: 'Време' },
      { id: 'en-a1-nature-fc-2', front: 'Как е „есен“ на британски английски?', back: 'autumn', tag: 'Сезони' },
      { id: 'en-a1-nature-fc-3', front: 'Как е „вълк“?', back: 'wolf', tag: 'Животни' },
      { id: 'en-a1-nature-fc-4', front: 'Каква е превъзходната степен на good?', back: 'the best', tag: 'Граматика' },
      { id: 'en-a1-nature-fc-5', front: 'Как е „наводнение“?', back: 'flood', tag: 'Явления' },
      { id: 'en-a1-nature-fc-6', front: 'Как е „храня“ (животно)?', back: 'feed', tag: 'Любимци' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: Take an umbrella. It’s ___.', options: ['sunny', 'hot', 'raining', 'windy'], correctIndex: 2, explanation: 'Вали — нужен е чадър.' },
      { id: 2, question: 'Кое е правилно?', options: ['Summer is hotter than spring.', 'Summer is more hot than spring.', 'Summer is hoter than spring.', 'Summer is the hotter than spring.'], correctIndex: 0, explanation: 'hot → hotter.' },
      { id: 3, question: 'Множественото число на sheep е:', options: ['sheeps', 'shoop', 'sheepes', 'sheep'], correctIndex: 3, explanation: 'Не се променя.' },
      { id: 4, question: 'Кое е домашен любимец?', options: ['wolf', 'hamster', 'eagle', 'bear'], correctIndex: 1, explanation: 'Хамстер.' },
      { id: 5, question: 'Попълнете: This is ___ beautiful flower in the garden.', options: ['more', 'the more', 'most', 'the most'], correctIndex: 3, explanation: 'Превъзходна степен на дълго прилагателно.' },
      { id: 6, question: 'Как се пита за времето?', options: ['How is the weather like?', 'What is weather?', 'What’s the weather like?', 'Which weather?'], correctIndex: 2, explanation: 'Стандартният въпрос.' },
    ],
    quickQuestions: ['Как да опиша времето днес?', 'Как се казват дивите животни в България?', 'Как да сравня два сезона?'],
  },
  {
    ...base,
    id: 'en-a1-homeland-world',
    monTopicIds: ids('6'),
    title: 'Английски A1: Моята родина и светът — България, Обединеното кралство и САЩ, пътуване, празници',
    originalNoteExcerpt: 'Тематична област „Моята родина и светът“: България, Обединеното кралство и САЩ — обща информация; пътуване; празници и традиции. Лексика: националности, езици, държави, градове, природни обекти; празници. Граматика: be going to за планове; Past Simple. Речеви етикет — поздравления и пожелания за празници.',
    summary: {
      overview:
        'Последната тема свързва България с англоезичния свят: основна информация за трите страни, планове за пътуване и празниците, които празнуваме у нас и там.',
      keyPoints: [
        'Държави, столици, езици: Bulgaria — Sofia — Bulgarian; the United Kingdom (England, Scotland, Wales, Northern Ireland) — London — English; the USA — Washington, D.C. — English. Националности: Bulgarian, British, American. Природа: mountain, river, sea, lake, island — остров.',
        'Пътуване: travel — пътувам, trip — пътуване, holiday — ваканция, by car/bus/train/plane — с кола/автобус/влак/самолет, ticket — билет, hotel, suitcase — куфар, passport. Планове с be going to: I’m going to visit London this summer.',
        'Минали пътувания с Past Simple: Last summer we went to the Black Sea. We stayed in a hotel and swam every day. Правилни глаголи с -ed (visit → visited), неправилни — go → went, see → saw, have → had, swim → swam.',
        'Празници и традиции: Christmas — Коледа, New Year — Нова година, Easter — Великден, birthday, Halloween (31 октомври), Thanksgiving (САЩ, четвъртия четвъртък на ноември), Baba Marta Day (1 март — мартеници). Пожелания: Happy birthday! Merry Christmas! Happy New Year! Happy Easter!',
        'Примерен текст: I live in Bulgaria. Its capital is Sofia. Bulgaria has got beautiful mountains and the Black Sea. My favourite holiday is Baba Marta Day. On 1st March we give our friends red and white martenitsi. Next summer I’m going to travel to London by plane.',
      ],
      examGoldenRule: 'За бъдещи планове използвай be going to, за минали пътувания — Past Simple с неправилните форми (went, saw, had).',
      commonTraps: ['The United Kingdom и the USA се пишат с the; Bulgaria — без член.', 'Минало време на go е went, а не goed.'],
      formulasOrDates: [
        { label: 'Планове', value: 'I’m going to visit…' },
        { label: 'Минало', value: 'went, saw, had, swam' },
        { label: 'Пожелания', value: 'Happy New Year! Merry Christmas!' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a1-home-chk-1', requirement: 'Кратко представяне на България за чуждестранен приятел', whyNeeded: 'Представянето на родината е част от темата.', isEssentialForSix: true, suggestedNotes: 'Столица, природа, празник.' },
      { id: 'en-a1-home-chk-2', requirement: 'Картичка с пожелание за празник', whyNeeded: 'Писането на поздравителна картичка е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Обръщение, пожелание, подпис.' },
    ],
    flashcards: [
      { id: 'en-a1-home-fc-1', front: 'Как е „остров“?', back: 'island', tag: 'Природа' },
      { id: 'en-a1-home-fc-2', front: 'Как е „Ще посетя Лондон“ (план)?', back: 'I’m going to visit London.', tag: 'Граматика' },
      { id: 'en-a1-home-fc-3', front: 'Минало време на see?', back: 'saw', tag: 'Глаголи' },
      { id: 'en-a1-home-fc-4', front: 'Как се пожелава „Весела Коледа“?', back: 'Merry Christmas!', tag: 'Празници' },
      { id: 'en-a1-home-fc-5', front: 'Коя е столицата на САЩ?', back: 'Washington, D.C.', tag: 'Страни' },
      { id: 'en-a1-home-fc-6', front: 'Как е „куфар“?', back: 'suitcase', tag: 'Пътуване' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: Last year we ___ to Greece.', options: ['go', 'goed', 'went', 'going'], correctIndex: 2, explanation: 'Неправилен глагол.' },
      { id: 2, question: 'Кое е правилно?', options: ['I’m going to visit my grandma tomorrow.', 'I going to visit my grandma tomorrow.', 'I’m go to visit my grandma tomorrow.', 'I’m going visit my grandma tomorrow.'], correctIndex: 0, explanation: 'be going to + глагол.' },
      { id: 3, question: 'Коя е столицата на Обединеното кралство?', options: ['Edinburgh', 'Dublin', 'Washington', 'London'], correctIndex: 3, explanation: 'Лондон.' },
      { id: 4, question: 'Кое пожелание е за рожден ден?', options: ['Merry Christmas!', 'Happy birthday!', 'Happy Easter!', 'Good luck!'], correctIndex: 1, explanation: 'Честит рожден ден.' },
      { id: 5, question: 'Попълнете: We travelled ___ train.', options: ['with', 'on the', 'by', 'in'], correctIndex: 2, explanation: 'By train/bus/plane.' },
      { id: 6, question: 'Кой член е правилен: ___ USA', options: ['the', 'a', 'an', 'без член'], correctIndex: 0, explanation: 'The United States of America.' },
    ],
    quickQuestions: ['Как да представя България на английски?', 'Как да разкажа за минала ваканция?', 'Какви празници има в Англия и САЩ?'],
  },
  {
    ...base,
    id: 'en-a1-skills',
    monTopicIds: ids('skills'),
    title: 'Английски A1: слушане, четене, говорене и писане — какво трябва да мога',
    originalNoteExcerpt: 'Слушане: познати думи и изрази при бавна и ясна реч; общо съдържание на кратък текст; кратки указания и упътвания; ориентиране в пространството, времето и числата. Четене: имена, думи и изрази в обичайни ситуации; общо съдържание на кратки онагледени текстове; конкретна информация; кратки съобщения и писма; речници. Говорене: кратка лична информация, несложни въпроси и отговори, числа, количества, пари и часове, компенсаторни стратегии; представяне и описание. Писане: формуляр, описание на себе си и близки, кратък текст по опори, кратки съобщения и писма (60–70 / 70–80 думи).',
    summary: {
      overview:
        'На ниво A1 ученикът разбира и използва прости ежедневни изрази и съвсем прости изречения за конкретни нужди. Уроците по всяка тема развиват четирите умения — слушане, четене, говорене и писане.',
      keyPoints: [
        'Слушане: разбираш познати думи и изрази, когато се говори бавно и ясно; хващаш общото съдържание на кратък текст; следваш кратки указания (Open your books, Turn left); ориентираш се в часове, дати, числа и посоки. Стратегия — слушай за ключови думи и не се опитвай да разбереш всяка дума.',
        'Четене: разбираш имена, думи и изрази в обичайни ситуации; общото съдържание на кратки текстове със снимки; намираш конкретна информация (час, цена, място) в обяви, менюта и разписания; разбираш кратки имейли и картички; използваш речник.',
        'Говорене (диалог): търсиш и даваш кратка лична информация; задаваш и отговаряш на прости въпроси; използваш числа, цени и часове; при затруднение молиш: Can you repeat, please? How do you say … in English? Говорене (монолог): представяш себе си и хората около теб, описваш дома си и разказваш за деня си с прости изречения.',
        'Писане: попълваш формуляр с лични данни; описваш себе си и близките си; пишеш поздравителна картичка, кратко съобщение или личен имейл; съставяш кратък текст по опори. Обем: 60–70 думи в IX клас и 70–80 думи в X клас.',
        'Компенсаторни стратегии — начини да общуваш въпреки непознатите думи: жестове, описание (the thing for cutting = knife), молба за повторение, по-бавна реч, опора на контекста и картинките.',
      ],
      examGoldenRule: 'В писмения текст отговори на всички точки от задачата и спазвай обема — пропусната точка струва повече от една граматическа грешка.',
      commonTraps: ['Не превеждай дума по дума от български — използвай готови изрази (Nice to meet you, What’s the matter?).', 'При слушане първо прочети въпросите — така знаеш какво да търсиш.'],
      formulasOrDates: [
        { label: 'Молба за помощ', value: 'Can you repeat, please? / Sorry, I don’t understand.' },
        { label: 'Обем на писмен текст', value: '60–70 (IX) / 70–80 думи (X)' },
        { label: 'Ниво', value: 'A1 по Общата европейска езикова рамка' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a1-skills-chk-1', requirement: 'Моите фрази за затруднения в разговор', whyNeeded: 'Компенсаторните стратегии са очакван резултат и при четирите умения.', isEssentialForSix: true, suggestedNotes: 'Повтори, по-бавно, как се казва…' },
      { id: 'en-a1-skills-chk-2', requirement: 'Шаблон на кратък личен имейл', whyNeeded: 'Писането на кратки съобщения и писма е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Hi…, текст, Love/Best wishes, име.' },
    ],
    flashcards: [
      { id: 'en-a1-skills-fc-1', front: 'Как се моли за повторение?', back: 'Can you repeat, please?', tag: 'Говорене' },
      { id: 'en-a1-skills-fc-2', front: 'Как се пита как се казва дума на английски?', back: 'How do you say … in English?', tag: 'Говорене' },
      { id: 'en-a1-skills-fc-3', front: 'Колко думи е писменият текст в X клас на A1?', back: '70–80 думи.', tag: 'Писане' },
      { id: 'en-a1-skills-fc-4', front: 'Какво е компенсаторна стратегия?', back: 'Начин да общуваш въпреки непознатите думи — описание, жест, молба.', tag: 'Стратегии' },
      { id: 'en-a1-skills-fc-5', front: 'Как завършва неофициален имейл?', back: 'Love, / Best wishes, + име.', tag: 'Писане' },
      { id: 'en-a1-skills-fc-6', front: 'Какво да направиш преди слушане?', back: 'Да прочетеш въпросите и да откриеш ключовите думи.', tag: 'Слушане' },
    ],
    quiz: [
      { id: 1, question: 'Какво казваш, ако не си разбрал?', options: ['Goodbye.', 'Thank you.', 'Sorry, can you repeat, please?', 'Nice to meet you.'], correctIndex: 2, explanation: 'Компенсаторна стратегия.' },
      { id: 2, question: 'Каква е добра стратегия при слушане?', options: ['да разбереш всяка дума', 'да слушаш за ключови думи', 'да не четеш въпросите', 'да превеждаш наум'], correctIndex: 1, explanation: 'Търси основното.' },
      { id: 3, question: 'Кое е подходящо начало на личен имейл?', options: ['Dear Sir or Madam,', 'To whom it may concern,', 'Yours faithfully,', 'Hi Maria,'], correctIndex: 3, explanation: 'Неофициално обръщение.' },
      { id: 4, question: 'Как казваш „Как се казва … на английски?“', options: ['How do you say … in English?', 'What English … is?', 'How English … ?', 'Say English …'], correctIndex: 0, explanation: 'Стандартна фраза.' },
      { id: 5, question: 'Какъв е обемът на писмения текст в IX клас на ниво A1?', options: ['20–30 думи', '150–170 думи', '60–70 думи', '200–250 думи'], correctIndex: 2, explanation: 'В X клас — 70–80.' },
      { id: 6, question: 'Какво означава, ако не знаеш думата knife, да кажеш the thing for cutting?', options: ['грешка', 'използване на компенсаторна стратегия', 'отказ от говорене', 'превод дума по дума'], correctIndex: 1, explanation: 'Описание вместо непозната дума.' },
    ],
    quickQuestions: ['Как да се подготвя за слушане на английски?', 'Какво да правя, ако не знам дума?', 'Как да напиша кратък имейл?'],
  },
  {
    ...base,
    id: 'en-a1-grammar',
    monTopicIds: ids('grammar'),
    title: 'Английски A1: езикови знания — фонетика, граматика, правопис и лексика',
    originalNoteExcerpt: 'Фонетика: произношение, ударение, интонация, транскрипция. Граматика: съществителни (число, man – men, child – children; ’s и of; a/an, the; броими и неброими — a lot of, many, much); прилагателни (степенуване, good, bad); местоимения (лични, в падежни форми, показателни, въпросителни, притежателни, some, any, no, many, much); числителни до 100, редни; глагол — be, have (got), there is/are, do, модални can, could, may, shall, must, mustn’t; Present Simple, Present Progressive, Past Simple, be going to; герундий; наречия за честота, време и място; предлози за време, място и посока. Синтаксис: видове прости изречения, кратки отговори, tag questions, It’s, There is/are, словоред. Правопис: окончания -s/-es/-ies, -ing, -er, -est, -ed, -th; главни букви.',
    summary: {
      overview:
        'Граматиката на ниво A1 дава „скелета“ на английския: как се образуват множествено число и въпроси, кога се използват основните времена и как се подреждат думите в изречението.',
      keyPoints: [
        'Съществителни и членове: множествено число с -s/-es/-ies (book → books, box → boxes, city → cities), неправилни (man → men, woman → women, child → children); a/an за първо споменаване (a cat, an apple), the за известно (the cat on the sofa); a lot of/many за броими (many friends), a lot of/much за неброими (much water); притежание с ’s (Tom’s bag) или of (the door of the house).',
        'Местоимения: лични (I, you, he, she, it, we, they) и в падежна форма (me, you, him, her, it, us, them); притежателни (my, your, his, her, its, our, their); показателни this/that, these/those; въпросителни who, what, which, where, when; some в положителни, any във въпроси и отрицания.',
        'Глаголи и времена: be и have got; There is/There are; Present Simple за навици (I play, she plays; Do you…? He doesn’t…); Present Progressive за действия сега (I am reading now); Past Simple за минали действия (played, went; Did you…? I didn’t…); be going to за планове. Модални: can/could — мога, способност и молба; may — позволение; shall — предложение (Shall we go?); must — трябва; mustn’t — забрана.',
        'Прилагателни, наречия и предлози: степенуване (big → bigger → the biggest; interesting → more interesting → the most interesting; good → better → the best; bad → worse → the worst); наречия за честота (always, usually, often, sometimes, never), време (now, today, yesterday, tomorrow), място (here, there); предлози за време (at 5, on Monday, in May), място (in, on, under, next to) и посока (to, from).',
        'Изречение и правопис: словоред подлог — сказуемо — допълнение (I like music.); кратки отговори (Yes, I do. No, she isn’t.); tag questions (It’s cold, isn’t it?); безлични изречения (It’s late. There is a problem.); правопис: stop → stopping, make → making, study → studied; главни букви за дни, месеци, езици и националности.',
      ],
      examGoldenRule: 'Помни контраста: Present Simple — винаги/обикновено (I play), Present Progressive — сега (I am playing).',
      commonTraps: ['Във въпроси и отрицания в Present Simple глаголът е в основна форма: Does she like? (не Does she likes?).', 'An се използва пред гласен звук, не буква: an hour, но a university.'],
      formulasOrDates: [
        { label: 'Present Simple', value: 'I play / She plays / Do you play?' },
        { label: 'Present Progressive', value: 'I am playing now.' },
        { label: 'Past Simple', value: 'I played / I went / Did you go?' },
      ],
    },
    notebookChecklist: [
      { id: 'en-a1-gram-chk-1', requirement: 'Таблица на трите времена с утвърдителна, отрицателна и въпросителна форма', whyNeeded: 'Глаголните времена са ядрото на граматиката на нивото.', isEssentialForSix: true, suggestedNotes: 'Present Simple, Present Progressive, Past Simple.' },
      { id: 'en-a1-gram-chk-2', requirement: 'Списък на 20 неправилни глагола', whyNeeded: 'Past Simple на неправилните глаголи е в програмата.', isEssentialForSix: false, suggestedNotes: 'go–went, see–saw, have–had…' },
    ],
    flashcards: [
      { id: 'en-a1-gram-fc-1', front: 'Множествено число на child?', back: 'children', tag: 'Съществителни' },
      { id: 'en-a1-gram-fc-2', front: 'Сравнителна степен на bad?', back: 'worse', tag: 'Прилагателни' },
      { id: 'en-a1-gram-fc-3', front: 'Кога се използва Present Progressive?', back: 'За действие, което става в момента.', tag: 'Времена' },
      { id: 'en-a1-gram-fc-4', front: 'Как е въпросът в Past Simple?', back: 'Did + подлог + основна форма: Did you see it?', tag: 'Времена' },
      { id: 'en-a1-gram-fc-5', front: 'Какво изразява mustn’t?', back: 'Забрана.', tag: 'Модални' },
      { id: 'en-a1-gram-fc-6', front: 'Кой член пред hour?', back: 'an hour (h не се чете).', tag: 'Членове' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: Look! The children ___ in the garden.', options: ['play', 'plays', 'are playing', 'played'], correctIndex: 2, explanation: 'Look! — действие в момента.' },
      { id: 2, question: 'Попълнете: ___ she like chocolate?', options: ['Do', 'Is', 'Are', 'Does'], correctIndex: 3, explanation: 'Трето лице — does.' },
      { id: 3, question: 'Кое е правилно?', options: ['an university', 'a hour', 'an apple', 'a orange'], correctIndex: 2, explanation: 'An пред гласен звук.' },
      { id: 4, question: 'Попълнете: How ___ water do you drink?', options: ['much', 'many', 'a few', 'lots'], correctIndex: 0, explanation: 'Water е неброимо.' },
      { id: 5, question: 'Попълнете: I ___ my grandparents yesterday.', options: ['visit', 'visited', 'am visiting', 'visits'], correctIndex: 1, explanation: 'Yesterday — Past Simple.' },
      { id: 6, question: 'Кой tag question е правилен: It’s cold, ___?', options: ['is it', 'isn’t it', 'it is', 'doesn’t it'], correctIndex: 1, explanation: 'Положително изречение — отрицателен tag.' },
    ],
    quickQuestions: ['Как да разпозная кое време да използвам?', 'Кога се пише a и кога an?', 'Как да запомня неправилните глаголи?'],
  },
];
