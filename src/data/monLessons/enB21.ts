import type { LessonData } from '../../types';

// Английски език, ниво B2.1 (XI–XII клас, интензивно/разширено изучаване) — по един урок за всяка тема от
// учебната програма на МОН (https://www.mon.bg/nfs/2018/08/up_ae_b2.1.pdf): четирите тематични области, уменията и
// езиковите знания. Обяснения на български, примери на английски; примерните текстове са написани за урока.

const base = { subject: 'Английски език', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ae-b2.1:${num}`];

export const MON_LESSONS_EN_B21: LessonData[] = [
  {
    ...base,
    id: 'en-b21-modern-world',
    monTopicIds: ids('1'),
    title: 'Английски B2.1: Човекът в съвременния свят — предизвикателства на начина на живот, образование и професионална реализация',
    originalNoteExcerpt: 'Тематична област „Човекът в съвременния свят“: предизвикателства на съвременния начин на живот; образователни системи и професионална реализация. Писане: текст по тема с мнение и аргументи, официално писмо — 200–250 думи. Граматика: функционална интеграция на времената, смесени условни изречения, инверсия след отрицателни думи.',
    summary: {
      overview:
        'На ниво B2.1 обсъждаме сложни въпроси на съвременния живот — темпото, стреса, неравенствата, образованието и кариерата — с аргументирано мнение и богат език.',
      keyPoints: [
        'Предизвикателства на съвременния живот: fast-paced lifestyle — забързан начин на живот, work-life balance — баланс между работа и личен живот, consumerism — консуматорство, urbanisation, the cost of living — издръжка на живота, loneliness in the digital age, information overload — информационно претоварване, burnout, to keep up with — да смогваш с.',
        'Образователни системи: compulsory education, state/private school, tuition fees — такси за обучение, vocational training — професионално обучение, lifelong learning — учене през целия живот, rote learning — зубрене, critical thinking, standardised tests, the pressure to perform — натискът за резултати.',
        'Професионална реализация: career prospects — възможности за кариера, job security, the gig economy — икономика на временните поръчки, remote work, freelance, entrepreneurship — предприемачество, brain drain — изтичане на мозъци, upskilling — повишаване на квалификацията, to climb the career ladder.',
        'Аргументиране: It could be argued that… — Може да се твърди, че…; While it is true that…, … — Макар да е вярно, че…; There is no denying that… — Безспорно…; On balance, I believe… — Като цяло смятам… Инверсия за подчертаване: Not only does a degree open doors, but it also builds confidence. Never before have young people had so many options.',
        'Смесени условни изречения: If I had chosen a vocational school, I would be working now. (минало условие → сегашен резултат); If she weren’t so talented, she wouldn’t have won the scholarship. (сегашно условие → минал резултат). Примерен абзац: There is no denying that higher education improves career prospects. However, rising tuition fees mean that many talented students cannot afford it. If governments invested more in scholarships, fewer young people would leave the country.',
      ],
      examGoldenRule: 'Аргументативният текст на B2 признава противоположната страна (While it is true that…) и после я опровергава — така позицията звучи по-убедително.',
      commonTraps: ['След отрицателно наречие в началото е задължителна инверсия: Never have I seen… (не Never I have seen…).', 'Economic (икономически) ≠ economical (пестелив).'],
      formulasOrDates: [
        { label: 'Аргументиране', value: 'It could be argued that… / While it is true that… / On balance…' },
        { label: 'Смесено условно', value: 'If I had…, I would be… now.' },
        { label: 'Обем', value: '200–250 думи' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b21-modern-chk-1', requirement: 'Аргументативно есе „Висшето образование — необходимост или избор?“ (200–250 думи)', whyNeeded: 'Текстът с мнение и аргументи е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Теза, 2 аргумента, контрааргумент, заключение.' },
      { id: 'en-b21-modern-chk-2', requirement: 'Банка от изрази за аргументиране', whyNeeded: 'Аргументирането на мнение е очакван резултат при говорене и писане.', isEssentialForSix: false, suggestedNotes: 'Въвеждане, добавяне, противопоставяне, заключение.' },
    ],
    flashcards: [
      { id: 'en-b21-modern-fc-1', front: 'Как е „баланс между работа и личен живот“?', back: 'work-life balance', tag: 'Начин на живот' },
      { id: 'en-b21-modern-fc-2', front: 'Как е „изтичане на мозъци“?', back: 'brain drain', tag: 'Кариера' },
      { id: 'en-b21-modern-fc-3', front: 'Как е „учене през целия живот“?', back: 'lifelong learning', tag: 'Образование' },
      { id: 'en-b21-modern-fc-4', front: 'Как се признава противоположна гледна точка?', back: 'While it is true that…, …', tag: 'Аргументиране' },
      { id: 'en-b21-modern-fc-5', front: 'Как е инверсията след Never?', back: 'Never have I seen such a thing.', tag: 'Граматика' },
      { id: 'en-b21-modern-fc-6', front: 'Как е „такси за обучение“?', back: 'tuition fees', tag: 'Образование' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: Not only ___ hard, but she also helps her classmates.', options: ['she works', 'does she work', 'works she', 'she does work'], correctIndex: 1, explanation: 'Инверсия след Not only.' },
      { id: 2, question: 'Попълнете: If I had studied medicine, I ___ a doctor now.', options: ['would have been', 'will be', 'would be', 'had been'], correctIndex: 2, explanation: 'Смесено условно — сегашен резултат.' },
      { id: 3, question: 'Какво означава the gig economy?', options: ['икономика на временните поръчки', 'музикалната индустрия', 'държавната икономика', 'банковата система'], correctIndex: 0, explanation: 'Временни, проектни ангажименти.' },
      { id: 4, question: 'Коя фраза въвежда обобщение на позицията?', options: ['For example,', 'Firstly,', 'In contrast,', 'On balance,'], correctIndex: 3, explanation: 'Като цяло.' },
      { id: 5, question: 'Попълнете: This car is very ___ — it uses little fuel.', options: ['economic', 'economical', 'economy', 'economist'], correctIndex: 1, explanation: 'Пестелив.' },
      { id: 6, question: 'Попълнете: Never before ___ so much information available.', options: ['there has been', 'has there been', 'there was', 'was being'], correctIndex: 1, explanation: 'Инверсия.' },
    ],
    quickQuestions: ['Как да напиша аргументативно есе на B2?', 'Как се прави инверсия за подчертаване?', 'Как да говоря за кариерните си планове?'],
  },
  {
    ...base,
    id: 'en-b21-science',
    monTopicIds: ids('2'),
    title: 'Английски B2.1: Човек и наука — опазване на планетата, енергия за утрешния ден, научни и технически постижения',
    originalNoteExcerpt: 'Тематична област „Човек и наука“: опазване на планетата Земя; енергия за утрешния ден; научни и технически постижения — с мисъл за бъдещите поколения. Лексика: фразови глаголи, колокации, идиоми. Граматика: страдателни конструкции (to have/get something done), безличен пасив, инфинитив — форми и функции.',
    summary: {
      overview:
        'Темата обсъжда отговорността на науката към бъдещите поколения: как да произвеждаме енергия, без да унищожаваме планетата, и как технологиите могат да помогнат или да навредят.',
      keyPoints: [
        'Опазване на планетата: biodiversity — биоразнообразие, carbon emissions, carbon neutral — въглеродно неутрален, global warming, rising sea levels, deforestation, ocean acidification, to tackle a problem — справям се с проблем, to take action, to raise awareness, the Paris Agreement (2015).',
        'Енергия за бъдещето: renewable sources (solar, wind, hydroelectric, geothermal, tidal — приливна), nuclear power, fossil fuels, energy efficiency, to phase out coal — постепенно спирам въглищата, energy storage — съхранение на енергия, a power plant, the grid — електрическата мрежа.',
        'Научни и технически постижения: artificial intelligence, gene editing, space exploration, quantum computing, medical breakthroughs (vaccines, organ transplants), to pave the way for — проправям пътя за, a double-edged sword — нож с две остриета, ethical concerns — етични въпроси, unintended consequences — непредвидени последици.',
        'Колокации и фразови глаголи: carry out research — провеждам изследване, make a discovery, conduct an experiment, run out of — изчерпвам (We are running out of resources), cut down on, phase out, come up with — измислям (come up with a solution), bring about — предизвиквам (bring about change).',
        'Граматика: безличен пасив — It is estimated that… / Renewable energy is expected to grow.; инфинитив за цел — Scientists are working hard to find a cure.; инфинитив след прилагателно — It is difficult to predict the future.; перфектен инфинитив — The new reactor is said to have been tested successfully. Примерен абзац: It is widely believed that renewable energy is the only sustainable option. Not only is it cleaner, but it is also becoming cheaper. However, energy storage remains a challenge that is yet to be solved.',
      ],
      examGoldenRule: 'В научнопопулярен или аргументативен текст безличният пасив (It is believed/estimated/reported that…) дава обективен тон и звучи академично.',
      commonTraps: ['Carry out research (не make a research) — research е неброимо.', 'Effect (резултат, съществително) ≠ affect (влияя, глагол).'],
      formulasOrDates: [
        { label: 'Колокации', value: 'carry out research, make a discovery, tackle a problem' },
        { label: 'Безличен пасив', value: 'It is estimated that… / X is said to have…' },
        { label: 'Фразови глаголи', value: 'run out of, come up with, bring about, phase out' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b21-sci-chk-1', requirement: 'Есе „Енергия за утрешния ден“ (200–250 думи)', whyNeeded: 'Текстът по тема с мнение и аргументи е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Проблем, възможности, рискове, позиция.' },
      { id: 'en-b21-sci-chk-2', requirement: 'Резюме на научнопопулярна статия', whyNeeded: 'Резюмирането на текст е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Основна идея, 3 ключови факта, заключение.' },
    ],
    flashcards: [
      { id: 'en-b21-sci-fc-1', front: 'Как е „биоразнообразие“?', back: 'biodiversity', tag: 'Екология' },
      { id: 'en-b21-sci-fc-2', front: 'Как е „провеждам изследване“?', back: 'carry out research', tag: 'Колокации' },
      { id: 'en-b21-sci-fc-3', front: 'Как е „измислям решение“?', back: 'come up with a solution', tag: 'Фразови глаголи' },
      { id: 'en-b21-sci-fc-4', front: 'Как е „нож с две остриета“?', back: 'a double-edged sword', tag: 'Идиоми' },
      { id: 'en-b21-sci-fc-5', front: 'Как е „Смята се, че е бил тестван“?', back: 'It is said to have been tested.', tag: 'Граматика' },
      { id: 'en-b21-sci-fc-6', front: 'Разлика между effect и affect?', back: 'effect — резултат (съществително); affect — влияя (глагол).', tag: 'Лексика' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: Scientists ___ an experiment to test the theory.', options: ['made', 'did', 'conducted', 'took'], correctIndex: 2, explanation: 'Conduct an experiment.' },
      { id: 2, question: 'Попълнете: We are running ___ of fossil fuels.', options: ['out', 'off', 'over', 'away'], correctIndex: 0, explanation: 'Run out of.' },
      { id: 3, question: 'Попълнете: It ___ that the population will reach 10 billion.', options: ['estimates', 'is estimating', 'estimated', 'is estimated'], correctIndex: 3, explanation: 'Безличен пасив.' },
      { id: 4, question: 'Кой е възобновяем източник на енергия?', options: ['coal', 'tidal power', 'oil', 'natural gas'], correctIndex: 1, explanation: 'Приливна енергия.' },
      { id: 5, question: 'Попълнете: Pollution can ___ our health.', options: ['effect', 'affection', 'affect', 'effective'], correctIndex: 2, explanation: 'Глагол — affect.' },
      { id: 6, question: 'Попълнете: The vaccine is believed ___ millions of lives.', options: ['to have saved', 'saving', 'to save have', 'saved'], correctIndex: 0, explanation: 'Перфектен инфинитив.' },
    ],
    quickQuestions: ['Как да пиша за енергията на бъдещето?', 'Кои колокации се използват в науката?', 'Как се използва безличен пасив?'],
  },
  {
    ...base,
    id: 'en-b21-media',
    monTopicIds: ids('3'),
    title: 'Английски B2.1: Медии и информация — видове медии, общуване в съвременния свят, социални мрежи',
    originalNoteExcerpt: 'Тематична област „Медии и информация“: видове медии; общуване в съвременния свят, социални мрежи. Слушане и четене: обща информация от медиите (радиопредавания, интервюта, дискусии, филми); статии от различни области; имплицитна информация. Граматика: непряка реч (предаване на модални глаголи, случаи без съгласуване на времената), подложни и допълнителни подчинени изречения (that, wh-, if/whether).',
    summary: {
      overview:
        'Медиите оформят представата ни за света. На ниво B2.1 анализираме видовете медии, начина, по който социалните мрежи променят общуването, и как да разпознаваме манипулацията.',
      keyPoints: [
        'Видове медии: print media — печатни медии (newspapers, magazines), broadcast media — радио и телевизия, online media, social media, podcasts, the tabloid press — жълтата преса, quality/broadsheet newspapers — сериозни вестници, mainstream media, independent journalism, a news outlet — медия.',
        'Новини и достоверност: headline, coverage — отразяване, bias — пристрастност, objective/subjective, a reliable source, fact-checking — проверка на фактите, misinformation/disinformation, clickbait, propaganda, sensationalism, to go viral — разпространявам се масово, an echo chamber — ехо камера.',
        'Общуване в съвременния свят: instant messaging, video calls, emojis, online communities, influencers, followers, screen addiction, the fear of missing out (FOMO), to unplug — изключвам се от технологиите, a digital detox, privacy concerns, data protection.',
        'Непряка реч на B2: модалните глаголи се предават — can → could, will → would, may → might, must → must/had to (“You must be careful” → He said I had to be careful); без съгласуване на времената, когато твърдението е още вярно — She said that the Earth goes round the Sun.; глаголи за пресъздаване — claim — твърдя, deny — отричам, admit, insist, warn, point out.',
        'Подложни и допълнителни подчинени изречения: What the article suggests is surprising. Whether social media is harmful depends on how we use it. That the news was fake became clear later. I wonder if the story is true. Примерен абзац: What worries me most about social media is that algorithms show us only what we already agree with. As a result, many users live in an echo chamber and rarely question the information they share.',
      ],
      examGoldenRule: 'В непряка реч на B2 използвай точния пресъздаващ глагол вместо винаги said: claimed, admitted, denied, warned — той показва отношение.',
      commonTraps: ['Deny се следва от -ing: He denied stealing the money (не denied to steal).', 'Whether-клаузата като подлог не може да се замени с if: Whether it is true doesn’t matter (не If it is true doesn’t matter).'],
      formulasOrDates: [
        { label: 'Медии', value: 'print, broadcast, online, social media' },
        { label: 'Пресъздаване', value: 'claim, deny + -ing, admit, warn, point out' },
        { label: 'Подложно изречение', value: 'What… / Whether… / That…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b21-media-chk-1', requirement: 'Есе „Социалните мрежи — свързват ли ни, или ни изолират?“ (200–250 думи)', whyNeeded: 'Текстът с аргументирано мнение е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Аргументи за двете страни, позиция, примери.' },
      { id: 'en-b21-media-chk-2', requirement: 'Анализ на една новина — факти, мнения, пристрастност', whyNeeded: 'Разбирането на имплицитна информация е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Източник, заглавие, тон, доказателства.' },
    ],
    flashcards: [
      { id: 'en-b21-media-fc-1', front: 'Как е „жълтата преса“?', back: 'the tabloid press', tag: 'Медии' },
      { id: 'en-b21-media-fc-2', front: 'Как е „пристрастност“?', back: 'bias', tag: 'Медии' },
      { id: 'en-b21-media-fc-3', front: 'Какво е echo chamber?', back: 'Среда, в която виждаш само мнения, съвпадащи с твоите.', tag: 'Онлайн' },
      { id: 'en-b21-media-fc-4', front: 'Какво следва след deny?', back: '-ing: He denied lying.', tag: 'Граматика' },
      { id: 'en-b21-media-fc-5', front: 'Как се предава must в непряка реч?', back: 'must или had to.', tag: 'Граматика' },
      { id: 'en-b21-media-fc-6', front: 'Как е „разпространявам се масово“ (онлайн)?', back: 'go viral', tag: 'Онлайн' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: He denied ___ the photo online.', options: ['to post', 'post', 'posting', 'posted'], correctIndex: 2, explanation: 'Deny + -ing.' },
      { id: 2, question: '“I will call you,” she said. → She said she ___ call me.', options: ['will', 'would', 'shall', 'can'], correctIndex: 1, explanation: 'Will → would.' },
      { id: 3, question: 'Попълнете: ___ the story is true is still unclear.', options: ['If', 'That if', 'Whether', 'What if'], correctIndex: 2, explanation: 'Whether като подлог.' },
      { id: 4, question: 'Кое е сериозен вестник?', options: ['a broadsheet', 'a tabloid', 'a clickbait', 'a meme'], correctIndex: 0, explanation: 'Quality/broadsheet.' },
      { id: 5, question: 'Попълнете: The teacher said that water ___ at 100°C.', options: ['boiled', 'had boiled', 'would boil', 'boils'], correctIndex: 3, explanation: 'Всеобща истина — без съгласуване.' },
      { id: 6, question: 'Какво е fact-checking?', options: ['проверка на фактите', 'писане на новини', 'реклама', 'цензура'], correctIndex: 0, explanation: 'Проверка на твърденията.' },
    ],
    quickQuestions: ['Как да разпозная пристрастна новина?', 'Как се предават модални глаголи в непряка реч?', 'Какво е digital detox?'],
  },
  {
    ...base,
    id: 'en-b21-society',
    monTopicIds: ids('4'),
    title: 'Английски B2.1: Личност и общество — личен избор и отговорности, формални и неформални общности',
    originalNoteExcerpt: 'Тематична област „Личност и общество“: личен избор и отговорности; формални и неформални общности — общуване. Говорене: участие равностойно в разговор, аргументиране на мнение, обобщаващо изказване. Граматика: съгласуване на подлог и сказуемо (двоен подлог, събирателни съществителни), безсъюзни условни изречения (Had she known…, Were I…, Should he…), participle clauses.',
    summary: {
      overview:
        'Последната тема пита какъв гражданин искаме да бъдем: какви избори правим, за какво носим отговорност и как общуваме в семейството, в училище, в организации и в неформални групи.',
      keyPoints: [
        'Личен избор и отговорност: make a choice/decision, take responsibility for, be accountable — отговарям за, face the consequences — понасям последствията, peer pressure, moral dilemma — морална дилема, integrity — почтеност, to stand up for — застъпвам се за, to take a stand — заемам позиция, civic duty — граждански дълг.',
        'Формални общности: institutions, organisations, a student council, a club, membership — членство, rules and regulations, hierarchy — йерархия, to elect, to represent, an NGO, volunteering. Неформални общности: a circle of friends, an online community, a subculture, a fan club, a sense of belonging — чувство за принадлежност.',
        'Общуване в общностите: to reach a consensus — постигаме съгласие, to compromise, to resolve a conflict, to voice an opinion — изказвам мнение, to be on the same wavelength — разбираме се от половин дума, to break the ice — разчупвам леда, to get one’s point across — успявам да обясня мнението си.',
        'Съгласуване на подлог и сказуемо: двоен подлог — My mum and dad are teachers; Either my brother or my sister is coming; Neither the teacher nor the students were ready (сказуемото се съгласува с най-близкия подлог); събирателни — The team is winning (като цяло) / The team are arguing among themselves (като отделни членове, BrE); the police are investigating.',
        'Безсъюзни условни изречения и participle clauses: Had I known about the meeting, I would have come. Were I in your position, I would apologise. Should you need help, call me. Having finished the project, we celebrated. Examples for speaking: Had more young people voted, the result might have been different.',
      ],
      examGoldenRule: 'В обобщаващо изказване формулирай тезата, дай 2–3 аргумента с примери, отбележи контрааргумент и завърши с обобщение — точно това се оценява на B2.',
      commonTraps: ['Police е винаги множествено число: The police are here (не is).', 'В безсъюзното условно изречение не се пише if: Had I known (не If had I known).'],
      formulasOrDates: [
        { label: 'Безсъюзно условно', value: 'Had I known… / Were I… / Should you…' },
        { label: 'Съгласуване', value: 'Neither … nor + най-близкия подлог' },
        { label: 'Общуване', value: 'reach a consensus, voice an opinion, break the ice' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b21-soc-chk-1', requirement: 'Обобщаващо изказване (2–3 минути) „Отговорни ли са младите хора за бъдещето на обществото?“', whyNeeded: 'Обобщаващото изказване с аргументи е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Теза, аргументи, примери, контрааргумент, обобщение.' },
      { id: 'en-b21-soc-chk-2', requirement: 'Официално писмо до ученическия съвет с предложение', whyNeeded: 'Писането на официално писмо е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Проблем, предложение, аргументи, учтиво завършване.' },
    ],
    flashcards: [
      { id: 'en-b21-soc-fc-1', front: 'Как е „чувство за принадлежност“?', back: 'a sense of belonging', tag: 'Общности' },
      { id: 'en-b21-soc-fc-2', front: 'Как е „постигаме съгласие“?', back: 'reach a consensus', tag: 'Общуване' },
      { id: 'en-b21-soc-fc-3', front: 'Как е „Ако бях знаел…“ без if?', back: 'Had I known…', tag: 'Граматика' },
      { id: 'en-b21-soc-fc-4', front: 'Как е „почтеност“?', back: 'integrity', tag: 'Ценности' },
      { id: 'en-b21-soc-fc-5', front: 'Единствено или множествено число е police?', back: 'Множествено: The police are…', tag: 'Граматика' },
      { id: 'en-b21-soc-fc-6', front: 'Как е „разчупвам леда“?', back: 'break the ice', tag: 'Идиоми' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: ___ I known about the problem, I would have helped.', options: ['If', 'Have', 'Had', 'Were'], correctIndex: 2, explanation: 'Безсъюзно условно III тип.' },
      { id: 2, question: 'Попълнете: Neither the teacher nor the students ___ ready.', options: ['was', 'were', 'is', 'has been'], correctIndex: 1, explanation: 'Съгласува се с students.' },
      { id: 3, question: 'Попълнете: The police ___ investigating the case.', options: ['is', 'has', 'was', 'are'], correctIndex: 3, explanation: 'Police — множествено.' },
      { id: 4, question: 'Попълнете: ___ you need any help, don’t hesitate to call.', options: ['Should', 'Would', 'Had', 'Were'], correctIndex: 0, explanation: 'Should you need…' },
      { id: 5, question: 'Какво означава take a stand?', options: ['изправям се', 'заемам позиция', 'отказвам се', 'приемам поканата'], correctIndex: 1, explanation: 'Заемам позиция.' },
      { id: 6, question: 'Попълнете: ___ finished the project, we went out to celebrate.', options: ['Having', 'Have', 'Had', 'To have'], correctIndex: 0, explanation: 'Participle clause.' },
    ],
    quickQuestions: ['Как да изградя обобщаващо изказване?', 'Как работят безсъюзните условни изречения?', 'Как да говоря за граждански избор и отговорност?'],
  },
  {
    ...base,
    id: 'en-b21-skills',
    monTopicIds: ids('skills'),
    title: 'Английски B2.1: слушане, четене, говорене и писане — какво трябва да мога',
    originalNoteExcerpt: 'Слушане: съществена информация от изказвания по конкретни и абстрактни теми; разговор между носители на езика от различни професионални области — намерения, лица, тема, основни идеи, мнения, чувства; обща информация от медиите; основни моменти в относително сложни текстове; подробности; имплицитна информация. Четене: художествени и научнопопулярни текстове по конкретни и абстрактни теми; комуникативно намерение на автора; статии с речник; лични и официални писма; логическа и хронологична последователност; имплицитна информация. Говорене: участва равностойно в разговор и интервю; търси и дава информация; мнение, чувства, отношение; аргументира се; говори сравнително гладко; монолог — информация, разказ, обобщаващо изказване с аргументи. Писане: логически свързан текст по различни теми; мнение и аргументи; официално писмо; разказ; преразказ и резюме; обобщаване на информация от различни източници — 200–250 думи.',
    summary: {
      overview:
        'Ниво B2.1 е крачка към самостоятелно владеене на езика: разбираш основните идеи в сложни текстове и подразбиращото се, участваш равностойно в разговор и пишеш ясни, подробни текстове с аргументи.',
      keyPoints: [
        'Слушане: разбираш съществената информация по конкретни и абстрактни теми; следиш разговор на носители на езика от различни области и разбираш намеренията, идеите и чувствата им; разбираш предавания, интервюта, дискусии и филми; хващаш имплицитната информация — какво се подразбира, без да е казано (тон, ирония, отношение).',
        'Четене: извличаш основното от художествени и научнопопулярни текстове; разбираш целта на автора и неговото отношение; работиш със статии от различни области с речник; разбираш лични и официални писма; проследяваш логиката и хронологията; разбираш подразбиращото се. Типове задачи — множествен избор, вмъкване на изречения в текст (gapped text), съпоставяне (matching).',
        'Говорене: участваш равностойно в разговор и интервю; изразяваш и аргументираш мнение, чувства и отношение; правиш обобщаващо изказване по тема; говориш сравнително гладко, с кратки паузи и произношение, близко до стандартното. Изрази за дискусия: I take your point, but… That’s a valid argument; however… Let me put it another way…',
        'Писане: логически свързан текст по различни теми; есе с мнение и аргументи; официално писмо (включително електронно); разказ за събития с чувства и отношение; преразказ и резюме; обобщаване на информация от няколко източника. Обем на всеки текст — 200–250 думи. Регистърът (формален/неформален) трябва да отговаря на задачата.',
        'Компенсаторни стратегии на B2: перифраза с по-общи думи, използване на синоними, преформулиране (What I mean is…), в писането — разнообразие на структурите (пасив, инверсия, participle clauses) вместо повторение на едни и същи конструкции.',
      ],
      examGoldenRule: 'На B2 се оценява разнообразието — използвай синоними и различни граматически структури, вместо да повтаряш една и съща дума или конструкция.',
      commonTraps: ['Имплицитната информация не е директно написана — търси тона и намека, не само ключовите думи.', 'Резюмето не съдържа лично мнение — то предава основните идеи на оригинала, по-кратко и със свои думи.'],
      formulasOrDates: [
        { label: 'Дискусия', value: 'I take your point, but… / That’s a valid argument; however…' },
        { label: 'Обем', value: '200–250 думи' },
        { label: 'Типове задачи', value: 'multiple choice, gapped text, matching' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b21-skills-chk-1', requirement: 'Резюме на статия (до една трета от оригинала)', whyNeeded: 'Преразказът и резюмето са очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Основна идея, ключови моменти, без лично мнение.' },
      { id: 'en-b21-skills-chk-2', requirement: 'Списък на синоними за често използвани думи', whyNeeded: 'Лексикалното богатство се оценява.', isEssentialForSix: false, suggestedNotes: 'important, good, bad, problem, think…' },
    ],
    flashcards: [
      { id: 'en-b21-skills-fc-1', front: 'Какво е имплицитна информация?', back: 'Информация, която се подразбира, без да е казана директно.', tag: 'Слушане/Четене' },
      { id: 'en-b21-skills-fc-2', front: 'Колко думи е писменият текст на B2.1?', back: '200–250 думи.', tag: 'Писане' },
      { id: 'en-b21-skills-fc-3', front: 'Как учтиво възразяваш в дискусия?', back: 'I take your point, but…', tag: 'Говорене' },
      { id: 'en-b21-skills-fc-4', front: 'Има ли лично мнение в резюмето?', back: 'Не — само основните идеи на оригинала.', tag: 'Писане' },
      { id: 'en-b21-skills-fc-5', front: 'Какво е gapped text?', back: 'Задача за вмъкване на изречения или абзаци на правилното място в текст.', tag: 'Четене' },
      { id: 'en-b21-skills-fc-6', front: 'Как преформулираш мисълта си?', back: 'Let me put it another way… / What I mean is…', tag: 'Говорене' },
    ],
    quiz: [
      { id: 1, question: 'Какво се оценява особено на ниво B2?', options: ['само правописът', 'разнообразието на лексиката и структурите', 'дължината над 400 думи', 'употребата на жаргон'], correctIndex: 1, explanation: 'Богатство и разнообразие.' },
      { id: 2, question: 'Какво НЕ трябва да има в резюме?', options: ['основната идея', 'ключовите моменти', 'лично мнение', 'собствени думи'], correctIndex: 2, explanation: 'Резюмето е обективно.' },
      { id: 3, question: 'Как учтиво възразяваш?', options: ['You’re totally wrong.', 'Nonsense!', 'Whatever.', 'That’s a valid argument; however…'], correctIndex: 3, explanation: 'Признаваш и възразяваш.' },
      { id: 4, question: 'Какъв е обемът на писмения текст на B2.1?', options: ['200–250 думи', '60–80 думи', '120–150 думи', '500 думи'], correctIndex: 0, explanation: 'По програмата.' },
      { id: 5, question: 'Какво е имплицитна информация?', options: ['цифри в текста', 'заглавието', 'подразбиращото се — тон, намек, отношение', 'имената на героите'], correctIndex: 2, explanation: 'Не е казано директно.' },
      { id: 6, question: 'Какво правиш, ако не намираш точната дума при говорене?', options: ['перифразираш или използваш синоним', 'спираш', 'говориш на български', 'сменяш темата'], correctIndex: 0, explanation: 'Компенсаторна стратегия.' },
    ],
    quickQuestions: ['Как да напиша резюме на английски?', 'Как да разпознавам подразбиращото се в текст?', 'Как да говоря по-гладко на изпит?'],
  },
  {
    ...base,
    id: 'en-b21-grammar',
    monTopicIds: ids('grammar'),
    title: 'Английски B2.1: езикови знания — инверсия, безсъюзни и смесени условни изречения, participle clauses, модалност, непряка реч',
    originalNoteExcerpt: 'Граматика: двойно притежание (a friend of mine); словообразувателни модели; местоимения one/ones, each other/one another, безлични you, they, we, one; функционална интеграция на всички времена; to have/get something done; инфинитив — като подлог, допълнение, сказуемно определение, за цел и резултат, след прилагателно и съществително, продължителни и перфектни форми; герундий — функции, страдателна перфектна форма; модалност — shouldn’t (предупреждение), should have done/ought to have done (неизпълнено задължение), don’t have to/don’t need to/needn’t do/needn’t have done, must/can’t + do/have done, shall/will (обещание, настояване, готовност, нежелание — won’t); I wish/If only + would, I’d rather + past simple, It’s time + past simple; отрицателни представки за глаголи; смесени условни изречения. Синтаксис: ред на прилагателните; съгласуване на подлог и сказуемо (двоен подлог, събирателни); емфатична инверсия (No sooner…than, Not only…but also, Only after/when, Under no circumstances, Seldom, Never, Barely/hardly/scarcely…when); подложни и допълнителни подчинени изречения; participle clauses; инверсия след so, such; безсъюзни условни изречения; непряка реч — модални глаголи, случаи без съгласуване.',
    summary: {
      overview:
        'Граматиката на B2.1 е за изразителност и прецизност: инверсия за подчертаване, безсъюзни и смесени условни изречения, участнически конструкции и фините разлики в модалността.',
      keyPoints: [
        'Модалност на B2: shouldn’t (предупреждение: You shouldn’t touch that); should have / ought to have done — неизпълнено задължение или критика (You should have told me); needn’t have done — направил си нещо ненужно (You needn’t have bought flowers) срещу didn’t need to (не е било нужно, затова не съм); must/can’t have done — извод; will — готовност, won’t — нежелание (The car won’t start); I wish/If only + would — дразнене (I wish you would stop talking); I’d rather you + Past Simple (I’d rather you didn’t smoke); It’s time we left.',
        'Инверсия: емфатична след отрицателни и ограничителни изрази — No sooner had I arrived than it started to rain. Hardly had we sat down when the phone rang. Under no circumstances should you open this door. Only when I read the letter did I understand. Seldom do we see such talent. След so/such — So loud was the music that we couldn’t talk. Such is the demand that tickets sold out in minutes.',
        'Условни изречения: смесени (If I had taken the job, I would be living in London now); безсъюзни — Had she known… (= If she had known), Were I in your position… (= If I were), Were he to come… , Should he call… (= If he calls).',
        'Participle clauses и инфинитив: Finishing the job, she went home. (= When she finished); Having finished the job, she… (подчертава предходност); Heart-broken by the news, she… (пасивно значение); инфинитив за цел и резултат (He called to apologise. She woke up to find the house empty); продължителен и перфектен инфинитив (He seems to be working / to have left); герундий в страдателна перфектна форма (He denied having been told).',
        'Други структури: двойно притежание (a friend of mine, a cousin of my sister’s); местоимения one/ones (I like the red one), each other/one another; безлично you/one (One should always be polite); to have/get something done; ред на прилагателните в именната фраза; подложни и допълнителни подчинени изречения (What he said surprised everyone. I don’t know whether he’ll come.); отрицателни представки за глаголи (dis-, un-, mis-: disagree, undo, misunderstand).',
      ],
      examGoldenRule: 'Needn’t have done = направих го, но не е било нужно; didn’t need to do = не беше нужно (и обикновено не съм го направил).',
      commonTraps: ['No sooner се свързва с than, а hardly/scarcely/barely — с when: No sooner… than, Hardly… when.', 'Participle clause трябва да има същия подлог като главното изречение: Walking home, I saw a fox (не Walking home, a fox appeared — тогава лисицата върви).'],
      formulasOrDates: [
        { label: 'Инверсия', value: 'No sooner had… than / Hardly had… when / Under no circumstances should…' },
        { label: 'Безсъюзно условно', value: 'Had I…, Were I…, Should you…' },
        { label: 'Модалност', value: 'should have done / needn’t have done / won’t' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b21-gram-chk-1', requirement: 'Десет изречения с емфатична инверсия', whyNeeded: 'Емфатичната инверсия е изрично в програмата.', isEssentialForSix: true, suggestedNotes: 'No sooner, Hardly, Not only, Only when, Never, Seldom, So, Such…' },
      { id: 'en-b21-gram-chk-2', requirement: 'Таблица на модалните глаголи за минало (критика, излишно действие, извод)', whyNeeded: 'Модалността на B2 е в програмата.', isEssentialForSix: false, suggestedNotes: 'should have, needn’t have, must have, can’t have.' },
    ],
    flashcards: [
      { id: 'en-b21-gram-fc-1', front: 'Как е „Не трябваше да купуваш цветя“ (купил си ги)?', back: 'You needn’t have bought flowers.', tag: 'Модалност' },
      { id: 'en-b21-gram-fc-2', front: 'С какво се свързва No sooner?', back: 'С than: No sooner had I…than…', tag: 'Инверсия' },
      { id: 'en-b21-gram-fc-3', front: 'Как е „Трябваше да ми кажеш“ (критика)?', back: 'You should have told me.', tag: 'Модалност' },
      { id: 'en-b21-gram-fc-4', front: 'Как е „Предпочитам да не пушиш“?', back: 'I’d rather you didn’t smoke.', tag: 'Модалност' },
      { id: 'en-b21-gram-fc-5', front: 'Как е „Ако бях на твое място“ без if?', back: 'Were I in your position…', tag: 'Условни' },
      { id: 'en-b21-gram-fc-6', front: 'Какво изразява The car won’t start?', back: 'Нежелание/отказ — колата не иска да запали.', tag: 'Модалност' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: No sooner had we left ___ it started to rain.', options: ['when', 'than', 'that', 'then'], correctIndex: 1, explanation: 'No sooner…than.' },
      { id: 2, question: 'Попълнете: You ___ have bought milk — we already had some.', options: ['mustn’t', 'shouldn’t to', 'needn’t', 'can’t'], correctIndex: 2, explanation: 'Ненужно действие.' },
      { id: 3, question: 'Попълнете: Under no circumstances ___ leave the building.', options: ['you should', 'should you', 'you must', 'must not you'], correctIndex: 1, explanation: 'Инверсия.' },
      { id: 4, question: 'Попълнете: It’s time we ___ home.', options: ['go', 'will go', 'are going', 'went'], correctIndex: 3, explanation: 'It’s time + Past Simple.' },
      { id: 5, question: 'Попълнете: ___ he call, tell him I’m out.', options: ['Should', 'Had', 'Were', 'Would'], correctIndex: 0, explanation: 'Should he call = If he calls.' },
      { id: 6, question: 'Попълнете: So difficult ___ the test that nobody finished it.', options: ['the test was', 'it was', 'was', 'were'], correctIndex: 2, explanation: 'Инверсия след so.' },
    ],
    quickQuestions: ['Как се използва инверсията за подчертаване?', 'Каква е разликата между needn’t have и didn’t need to?', 'Как да построя participle clause?'],
  },
];
