import type { LessonData } from '../../types';

// Английски език, ниво B1.1 (XI–XII клас) — по един урок за всяка тема от учебната програма на МОН
// (https://www.mon.bg/nfs/2018/08/up_ae_b1.1.pdf). Уроците са насочени към ситуации от живота на по-големите
// ученици. Обяснения на български, примери на английски; примерните текстове са написани за урока.

const base = { subject: 'Английски език', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ae-b1.1:${num}`];

export const MON_LESSONS_EN_B11: LessonData[] = [
  {
    ...base,
    id: 'en-b11-emotions',
    monTopicIds: ids('1'),
    title: 'Английски B1.1 (XI–XII): Аз и другите — емоции',
    originalNoteExcerpt: 'Тематична област „Аз и другите“: емоции. Лексика: чувства, емоции. Речеви етикет: изразяване на желания и предпочитания, мнения, преценка. Граматика: глаголи-действия и глаголи-състояния, прилагателни на -ed/-ing, герундий след can’t help, avoid, mind.',
    summary: {
      overview:
        'В горния курс темата „Аз и другите“ се съсредоточава върху емоциите — как ги назоваваме, как ги изразяваме и как се справяме със стреса и трудните ситуации.',
      keyPoints: [
        'Силни и слаби емоции: happy → delighted — възхитен; sad → miserable — нещастен; angry → furious — бесен; scared → terrified — ужасен; tired → exhausted — изтощен; surprised → amazed. Други: anxious — тревожен, frustrated — фрустриран, disappointed — разочарован, grateful — благодарен, lonely — самотен, confident — уверен.',
        'Изрази за чувства: I’m over the moon — на седмото небе съм; I’m fed up with… — писна ми от…; It drives me mad — подлудява ме; I was scared stiff — вкаменен от страх; get on someone’s nerves — дразня някого; lose your temper — избухвам.',
        'Емоции и поведение: cope with stress — справям се със стреса, calm down — успокоявам се, cheer someone up — ободрявам някого, open up to someone — споделям с някого, burst into tears — избухвам в плач. Герундий: I can’t help worrying before exams. Try to avoid comparing yourself to others.',
        'Изразяване на мнение и съвет за чувства: In my opinion, talking to a friend is the best way to feel better. If I were you, I would talk to the teacher. It’s natural to feel nervous.',
        'Примерен текст: Before my first big exam I was so anxious that I couldn’t sleep. I kept thinking that I would fail. My older sister helped me to calm down — she told me that feeling nervous is natural. On the day of the exam I was still worried, but I did well. When I saw the results, I was over the moon!',
      ],
      examGoldenRule: 'За по-силно и богато изразяване замени very + основно прилагателно с по-силно: very tired → exhausted, very happy → delighted.',
      commonTraps: ['Не се казва very furious или very exhausted — силните прилагателни се усилват с absolutely: absolutely exhausted.', 'Nervous значи „притеснен“, а „нервен, раздразнителен“ е irritable.'],
      formulasOrDates: [
        { label: 'Силни прилагателни', value: 'delighted, furious, exhausted, terrified' },
        { label: 'Идиоми', value: 'over the moon, fed up with, lose your temper' },
        { label: 'Обем', value: '150–160 (XI) / 160–170 думи (XII)' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b11-emo-chk-1', requirement: 'Разказ за случка, която предизвика силна емоция (150–160 думи)', whyNeeded: 'Споделянето на преживявания с лична преценка е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Какво стана, какво почувства, как се справи.' },
      { id: 'en-b11-emo-chk-2', requirement: 'Двойки основно — силно прилагателно', whyNeeded: 'Лексиката за чувства и емоции е в програмата.', isEssentialForSix: false, suggestedNotes: 'very good → excellent, very bad → awful…' },
    ],
    flashcards: [
      { id: 'en-b11-emo-fc-1', front: 'Как е „на седмото небе съм“?', back: 'I’m over the moon.', tag: 'Идиоми' },
      { id: 'en-b11-emo-fc-2', front: 'Как е „писна ми от…“?', back: 'I’m fed up with…', tag: 'Идиоми' },
      { id: 'en-b11-emo-fc-3', front: 'Как е „справям се със стреса“?', back: 'cope with stress', tag: 'Поведение' },
      { id: 'en-b11-emo-fc-4', front: 'Силното прилагателно на tired?', back: 'exhausted', tag: 'Лексика' },
      { id: 'en-b11-emo-fc-5', front: 'Как е „избухвам“ (губя самообладание)?', back: 'lose my temper', tag: 'Идиоми' },
      { id: 'en-b11-emo-fc-6', front: 'Как е „Не мога да не се притеснявам“?', back: 'I can’t help worrying.', tag: 'Граматика' },
    ],
    quiz: [
      { id: 1, question: 'Кое е правилно?', options: ['very exhausted', 'absolutely exhausted', 'a bit exhausted very', 'much exhausted'], correctIndex: 1, explanation: 'Силните прилагателни — с absolutely.' },
      { id: 2, question: 'Попълнете: I’m fed ___ with this rainy weather.', options: ['up', 'on', 'in', 'off'], correctIndex: 0, explanation: 'Fed up with.' },
      { id: 3, question: 'Попълнете: Try to avoid ___ yourself to others.', options: ['compare', 'to compare', 'compared', 'comparing'], correctIndex: 3, explanation: 'Avoid + -ing.' },
      { id: 4, question: 'Кое означава „разочарован“?', options: ['grateful', 'disappointed', 'delighted', 'confident'], correctIndex: 1, explanation: 'Disappointed.' },
      { id: 5, question: 'Попълнете: When she heard the news, she burst ___ tears.', options: ['in', 'out', 'into', 'on'], correctIndex: 2, explanation: 'Burst into tears.' },
      { id: 6, question: 'Какво означава cheer someone up?', options: ['ободрявам някого', 'аплодирам някого', 'ядосвам някого', 'събуждам някого'], correctIndex: 0, explanation: 'Ободрявам.' },
    ],
    quickQuestions: ['Как да изразя силни чувства на английски?', 'Какви идиоми има за емоции?', 'Как да дам съвет на притеснен приятел?'],
  },
  {
    ...base,
    id: 'en-b11-world-around-me',
    monTopicIds: ids('2'),
    title: 'Английски B1.1 (XI–XII): Светът около мен — транспорт, ориентация, образование, професии и социални контакти',
    originalNoteExcerpt: 'Тематична област „Светът около мен“: транспорт и ориентация в града; образование, професии и социални контакти. Лексика: обществени сгради, транспортни средства, задължения и отговорности. Граматика: страдателен залог, непряка реч (съобщения и въпроси), допълнителни подчинени изречения (that-clause).',
    summary: {
      overview:
        'Темата подготвя за живота след училище — придвижване в непознат град, избор на образование и професия, общуване с нови хора в учебна и работна среда.',
      keyPoints: [
        'Транспорт и ориентация: route — маршрут, stop — спирка, terminal, fare — цена на билета, pass/travel card — карта за пътуване, connection — връзка (между линии), get lost, ask the way. Упътване: Take the number 5 bus and get off at the third stop. It’s a five-minute walk from there. You can’t miss it.',
        'Образование: higher education — висше образование, apply to university — кандидатствам в университет, entrance exam — приемен изпит, degree — степен (a bachelor’s degree — бакалавър), scholarship — стипендия, gap year — година почивка между училище и университет, distance learning — дистанционно обучение.',
        'Професии и работа: internship — стаж, apprenticeship — чиракуване, qualifications, experience, job interview, employer, CV, cover letter — мотивационно писмо, deadline — краен срок, colleague — колега.',
        'Социални контакти: network — създавам контакти, introduce yourself, make a good impression — правя добро впечатление, small talk — кратък неангажиращ разговор, socialise — общувам, keep in touch.',
        'Граматика в темата: страдателен залог (Applications are accepted until 30 May. You will be contacted by e-mail.); непряка реч (The receptionist said that the manager was in a meeting. She asked me what my qualifications were.); that-clause (I think that a gap year is a good idea. It is important that you arrive on time.)',
      ],
      examGoldenRule: 'В официални съобщения и правила често се използва страдателен залог — разпознавай го и го използвай в официалните писма.',
      commonTraps: ['Fare е цената на билета за транспорт, а fee — такса (например university fees).', 'В непряка реч Here става there, today — that day, tomorrow — the next day.'],
      formulasOrDates: [
        { label: 'Упътване', value: 'Take the number 5 bus and get off at…' },
        { label: 'Образование', value: 'degree, scholarship, entrance exam, gap year' },
        { label: 'Пасив', value: 'Applications are accepted… / You will be contacted…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b11-world-chk-1', requirement: 'Мотивационно писмо за стаж (160–170 думи)', whyNeeded: 'Писането на писмо по изучаваните теми е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Цел, умения, опит, защо точно там, учтиво завършване.' },
      { id: 'en-b11-world-chk-2', requirement: 'Таблица на промените в непряката реч', whyNeeded: 'Непряката реч е в програмата.', isEssentialForSix: false, suggestedNotes: 'Времена, here/there, today/that day…' },
    ],
    flashcards: [
      { id: 'en-b11-world-fc-1', front: 'Как е „стипендия“?', back: 'scholarship', tag: 'Образование' },
      { id: 'en-b11-world-fc-2', front: 'Как е „мотивационно писмо“?', back: 'cover letter', tag: 'Работа' },
      { id: 'en-b11-world-fc-3', front: 'Как е „стаж“ (за студенти)?', back: 'internship', tag: 'Работа' },
      { id: 'en-b11-world-fc-4', front: 'Как е „цена на билета“ за транспорт?', back: 'fare', tag: 'Транспорт' },
      { id: 'en-b11-world-fc-5', front: 'Какво е gap year?', back: 'Година почивка между училището и университета.', tag: 'Образование' },
      { id: 'en-b11-world-fc-6', front: 'Как става tomorrow в непряка реч?', back: 'the next day / the following day', tag: 'Граматика' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: You ___ by e-mail within a week.', options: ['will contact', 'will be contacted', 'are contacting', 'contacted'], correctIndex: 1, explanation: 'Пасив в бъдеще.' },
      { id: 2, question: 'Кое означава „приемен изпит“?', options: ['final exam', 'driving test', 'entrance exam', 'school report'], correctIndex: 2, explanation: 'Entrance exam.' },
      { id: 3, question: '“I’m busy today,” she said. → She said she was busy ___.', options: ['today', 'tomorrow', 'yesterday', 'that day'], correctIndex: 3, explanation: 'Today → that day.' },
      { id: 4, question: 'Попълнете: The bus ___ to the airport is 3 euros.', options: ['fare', 'fee', 'price ticket', 'cost of'], correctIndex: 0, explanation: 'Fare.' },
      { id: 5, question: 'Как да кажеш учтиво къде да слезе някой?', options: ['Get off at the third stop.', 'Off third.', 'You go out bus.', 'Stop three you.'], correctIndex: 0, explanation: 'Get off at…' },
      { id: 6, question: 'Попълнете: It is important ___ you arrive on time.', options: ['what', 'which', 'that', 'who'], correctIndex: 2, explanation: 'That-clause.' },
    ],
    quickQuestions: ['Как да кандидатствам за стаж на английски?', 'Как да питам за пътя в непознат град?', 'Как да предам чужди думи в непряка реч?'],
  },
  {
    ...base,
    id: 'en-b11-everyday',
    monTopicIds: ids('3'),
    title: 'Английски B1.1 (XI–XII): Всекидневие — отговорности и задължения, заведения за хранене, магазини и услуги',
    originalNoteExcerpt: 'Тематична област „Всекидневие“: моите отговорности и задължения; хранене и заведения за хранене; магазини, услуги. Лексика: задължения и отговорности, магазини и услуги, обществени сгради, заведения за хранене. Граматика: модалност (need, have to, should), глаголни фрази с have, take, make, do, get, повелително наклонение.',
    summary: {
      overview:
        'Самостоятелният живот носи отговорности — бюджет, домакинство, ремонти, услуги. Темата учи как да ги организираме и как да общуваме в ресторанти, магазини и сервизи, включително когато нещо не е наред.',
      keyPoints: [
        'Отговорности: manage my time — разпределям си времето, keep a budget — спазвам бюджет, save money — спестявам, pay the bills, take responsibility for — поемам отговорност за, run errands — върша дребни задачи навън. Need: I need to renew my ID card. You don’t need to pay in advance.',
        'Заведения за хранене: fast-food restaurant, canteen — стол, food court, pizzeria, vegetarian restaurant; рецензия — the service was slow/friendly, reasonable prices — приемливи цени, generous portions — щедри порции, I’d highly recommend it — горещо го препоръчвам.',
        'Магазини и услуги: department store — универсален магазин, chemist’s, newsagent’s — будка за вестници, hairdresser’s, dry cleaner’s, repair shop — сервиз, post office; get something repaired/cleaned/cut — давам нещо за поправка/чистене/подстригване (I’m having my laptop repaired).',
        'Оплакване и решение на проблем: I’d like to make a complaint. — Искам да подам оплакване.; The item is faulty/damaged — дефектен/повреден; I’d like a replacement or a refund. — Искам замяна или връщане на парите.; I’m afraid there’s a mistake on the bill. — Опасявам се, че има грешка в сметката.',
        'Повелително наклонение в инструкции: Keep your receipt. Don’t forget to check the warranty — гаранцията. Примерен текст: Last month my phone stopped working, so I took it to the repair shop. They promised to fix it in two days, but it took two weeks! I complained politely and they gave me a discount. Now I always ask how long a repair will take.',
      ],
      examGoldenRule: 'Оплакването е учтиво и конкретно: какъв е проблемът — кога е станал — какво искаш (замяна, връщане на парите, отстъпка).',
      commonTraps: ['Chemist’s е аптека (Великобритания), а не химическо чистене — то е dry cleaner’s.', 'Have something done значи някой друг го прави за теб: I had my hair cut (подстригаха ме).'],
      formulasOrDates: [
        { label: 'Оплакване', value: 'I’d like to make a complaint. / The item is faulty.' },
        { label: 'Услуга', value: 'have/get something repaired' },
        { label: 'Необходимост', value: 'need to / don’t need to' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b11-daily-chk-1', requirement: 'Официален имейл с оплакване (160–170 думи)', whyNeeded: 'Писането по изучаваните теми с подходящ регистър е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Dear Sir or Madam, проблем, искане, Yours faithfully.' },
      { id: 'en-b11-daily-chk-2', requirement: 'Рецензия на заведение за хранене', whyNeeded: 'Текстът с лична преценка е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Храна, обслужване, цени, препоръка.' },
    ],
    flashcards: [
      { id: 'en-b11-daily-fc-1', front: 'Как е „Искам да подам оплакване“?', back: 'I’d like to make a complaint.', tag: 'Оплакване' },
      { id: 'en-b11-daily-fc-2', front: 'Как е „дефектен“?', back: 'faulty', tag: 'Оплакване' },
      { id: 'en-b11-daily-fc-3', front: 'Как е „гаранция“ (за стока)?', back: 'warranty', tag: 'Пазаруване' },
      { id: 'en-b11-daily-fc-4', front: 'Как е „Дадох лаптопа за поправка“?', back: 'I had my laptop repaired.', tag: 'Граматика' },
      { id: 'en-b11-daily-fc-5', front: 'Как е „спазвам бюджет“?', back: 'keep a budget', tag: 'Отговорности' },
      { id: 'en-b11-daily-fc-6', front: 'Как е „приемливи цени“?', back: 'reasonable prices', tag: 'Ресторант' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: I’m going to ___ my bike repaired tomorrow.', options: ['make', 'do', 'have', 'take'], correctIndex: 2, explanation: 'Have something done.' },
      { id: 2, question: 'Къде даваш палто за чистене?', options: ['chemist’s', 'newsagent’s', 'repair shop', 'dry cleaner’s'], correctIndex: 3, explanation: 'Химическо чистене.' },
      { id: 3, question: 'Кое е учтиво начало на оплакване?', options: ['I’d like to make a complaint.', 'Your shop is terrible!', 'Give me my money!', 'This is stupid.'], correctIndex: 0, explanation: 'Учтиво и ясно.' },
      { id: 4, question: 'Попълнете: You don’t ___ to pay now — you can pay later.', options: ['must', 'need', 'should', 'have'], correctIndex: 1, explanation: 'Don’t need to.' },
      { id: 5, question: 'Какво означава faulty?', options: ['евтин', 'нов', 'дефектен', 'чужд'], correctIndex: 2, explanation: 'Дефектен.' },
      { id: 6, question: 'Кое е повелително наклонение?', options: ['Keep your receipt.', 'You kept your receipt.', 'You are keeping your receipt.', 'You would keep your receipt.'], correctIndex: 0, explanation: 'Инструкция.' },
    ],
    quickQuestions: ['Как да се оплача в магазин на английски?', 'Как да напиша рецензия на ресторант?', 'Какво означава have something done?'],
  },
  {
    ...base,
    id: 'en-b11-health',
    monTopicIds: ids('4'),
    title: 'Английски B1.1 (XI–XII): Здраве — грижи за здравето и медицински услуги',
    originalNoteExcerpt: 'Тематична област „Здраве и здравословен начин на живот“: грижи за здравето (медицински услуги). Лексика: здравословно състояние и медицински услуги. Граматика: модалност, условни изречения II и III тип, Past Perfect.',
    summary: {
      overview:
        'Темата учи как да използваме медицинските услуги самостоятелно — да си запишем час, да опишем проблема, да разберем указанията и да говорим за превенцията.',
      keyPoints: [
        'Медицински услуги: health insurance — здравна осигуровка, GP, specialist — специалист, waiting room — чакалня, clinic, A&E (Accident and Emergency, BrE)/ER (AmE) — спешно отделение, ward — болнично отделение, operation/surgery, recover — възстановявам се, side effects — странични ефекти.',
        'Изследвания и лечение: blood test — кръвно изследване, X-ray — рентген, scan, diagnosis — диагноза, treatment — лечение, dose — доза, take the tablets twice a day after meals — пийте таблетките два пъти дневно след храна, be on antibiotics — пия антибиотици.',
        'Превенция: regular check-ups, vaccination — ваксинация, a healthy lifestyle, mental health — психично здраве, burnout — прегаряне, screen time, stay hydrated — пия достатъчно течности.',
        'Условни изречения: II тип за съвет — If I were you, I would see a specialist.; III тип за минало съжаление — If I had worn a helmet, I wouldn’t have hurt my head. Past Perfect: By the time the ambulance arrived, the neighbours had already helped him.',
        'Примерен диалог: — I’d like to make an appointment with Dr Petrova, please. — Is it urgent? — Not really, but I’ve had a pain in my knee since I fell last week. — The earliest appointment is on Thursday at 10:30. — That’s fine, thank you.',
      ],
      examGoldenRule: 'За съвет използвай If I were you, I would…; за съжаление за миналото — III тип: If I had…, I would have…',
      commonTraps: ['A&E е британското име на спешното отделение, ER — американското.', 'Recover from (възстановявам се от) — не recover of.'],
      formulasOrDates: [
        { label: 'Час', value: 'I’d like to make an appointment with…' },
        { label: 'Указание', value: 'Take the tablets twice a day after meals.' },
        { label: 'Съжаление', value: 'If I had…, I wouldn’t have…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b11-health-chk-1', requirement: 'Диалог по телефона за записване на час', whyNeeded: 'Общуването в обичайни ситуации е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Поздрав, проблем, спешност, час, потвърждение.' },
      { id: 'en-b11-health-chk-2', requirement: 'Текст „Как да се грижим за психичното си здраве“', whyNeeded: 'Текстът с лична преценка е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Сън, движение, приятели, помощ от специалист.' },
    ],
    flashcards: [
      { id: 'en-b11-health-fc-1', front: 'Как е „спешно отделение“ (BrE)?', back: 'A&E (Accident and Emergency)', tag: 'Медицина' },
      { id: 'en-b11-health-fc-2', front: 'Как е „странични ефекти“?', back: 'side effects', tag: 'Медицина' },
      { id: 'en-b11-health-fc-3', front: 'Как е „кръвно изследване“?', back: 'blood test', tag: 'Медицина' },
      { id: 'en-b11-health-fc-4', front: 'Как е „психично здраве“?', back: 'mental health', tag: 'Превенция' },
      { id: 'en-b11-health-fc-5', front: 'Как е „Ако бях на твое място, щях да отида на лекар“?', back: 'If I were you, I would see a doctor.', tag: 'Граматика' },
      { id: 'en-b11-health-fc-6', front: 'Как е „възстановявам се от грип“?', back: 'recover from the flu', tag: 'Медицина' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: If I had worn a helmet, I ___ my head.', options: ['wouldn’t hurt', 'didn’t hurt', 'wouldn’t have hurt', 'won’t hurt'], correctIndex: 2, explanation: 'III тип условно.' },
      { id: 2, question: 'Попълнете: By the time we arrived, the doctor ___.', options: ['left', 'has left', 'had left', 'leaves'], correctIndex: 2, explanation: 'Past Perfect.' },
      { id: 3, question: 'Какво означава diagnosis?', options: ['диагноза', 'доза', 'лечение', 'рецепта'], correctIndex: 0, explanation: 'Диагноза.' },
      { id: 4, question: 'Попълнете: It took him a month to recover ___ the operation.', options: ['of', 'with', 'off', 'from'], correctIndex: 3, explanation: 'Recover from.' },
      { id: 5, question: 'Как се казва „пия антибиотици“?', options: ['I drink antibiotics.', 'I’m on antibiotics.', 'I take on antibiotics.', 'I have antibiotics on.'], correctIndex: 1, explanation: 'Be on antibiotics.' },
      { id: 6, question: 'Кое е съвет с условно изречение?', options: ['If I were you, I would rest.', 'If I am you, I rest.', 'If I was you, I will rest.', 'If I would be you, I rest.'], correctIndex: 0, explanation: 'II тип.' },
    ],
    quickQuestions: ['Как да си запиша час при лекар на английски?', 'Как да разбера указанията за лекарство?', 'Как да говоря за психично здраве?'],
  },
  {
    ...base,
    id: 'en-b11-nature',
    monTopicIds: ids('5'),
    title: 'Английски B1.1 (XI–XII): Природа и екология — природни явления и опазване на околната среда',
    originalNoteExcerpt: 'Тематична област „Природа и екология“: природни явления и опазване на околната среда. Лексика: природни явления, метеорологично време. Граматика: условни изречения, страдателен залог, наречия за вероятност (probably, definitely, perhaps).',
    summary: {
      overview:
        'Темата свързва природните явления с действията на хората: какво причинява климатичните промени, как се отразяват на нас и какво може да направи всеки.',
      keyPoints: [
        'Природни явления и бедствия: extreme weather — екстремно време, heatwave, flash flood — внезапно наводнение, storm, hail — градушка, drought, wildfire, landslide, earthquake. Последици: crops are destroyed — реколтата е унищожена, people are evacuated — хората са евакуирани, damage — щети.',
        'Причини: greenhouse gases — парникови газове, carbon dioxide (CO₂) emissions — емисии, fossil fuels — изкопаеми горива (coal, oil, gas), deforestation, intensive farming, plastic waste.',
        'Решения: renewable energy — възобновяема енергия (solar, wind, hydro), energy-efficient — енергоспестяващ, carbon footprint — въглероден отпечатък, sustainable — устойчив, eco-friendly — екологичен, ban single-use plastic — забраняване на пластмасата за еднократна употреба.',
        'Вероятност: Temperatures will probably rise. There will definitely be more droughts. Perhaps people will change their habits. Пасив за процеси: Millions of trees are cut down every year. A lot of energy is wasted.',
        'Примерен текст: Last summer a flash flood hit a village near my town. Many houses were damaged and some families were evacuated. Scientists say that extreme weather will probably become more common because of climate change. If every household used less energy, our carbon footprint would be much smaller.',
      ],
      examGoldenRule: 'В есе за околната среда структурирай: проблем → причини → последици → решения → лична позиция.',
      commonTraps: ['Наречието probably стои след will, но преди won’t: It will probably rain / It probably won’t rain.', 'Damage е неброимо: a lot of damage (не damages в този смисъл).'],
      formulasOrDates: [
        { label: 'Причини', value: 'greenhouse gases, fossil fuels, deforestation' },
        { label: 'Решения', value: 'renewable energy, carbon footprint, sustainable' },
        { label: 'Вероятност', value: 'probably, definitely, perhaps' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b11-nature-chk-1', requirement: 'Есе за климатичните промени (160–170 думи)', whyNeeded: 'Текстът с лична преценка е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Проблем, причини, последици, решения, позиция.' },
      { id: 'en-b11-nature-chk-2', requirement: 'Лексика: причини и решения', whyNeeded: 'Темите от устойчивото развитие са в програмата.', isEssentialForSix: false, suggestedNotes: 'Две колони по 10 израза.' },
    ],
    flashcards: [
      { id: 'en-b11-nature-fc-1', front: 'Как е „изкопаеми горива“?', back: 'fossil fuels', tag: 'Причини' },
      { id: 'en-b11-nature-fc-2', front: 'Как е „възобновяема енергия“?', back: 'renewable energy', tag: 'Решения' },
      { id: 'en-b11-nature-fc-3', front: 'Как е „въглероден отпечатък“?', back: 'carbon footprint', tag: 'Решения' },
      { id: 'en-b11-nature-fc-4', front: 'Как е „градушка“?', back: 'hail', tag: 'Явления' },
      { id: 'en-b11-nature-fc-5', front: 'Къде стои probably в отрицание с won’t?', back: 'Преди won’t: It probably won’t rain.', tag: 'Граматика' },
      { id: 'en-b11-nature-fc-6', front: 'Как е „парникови газове“?', back: 'greenhouse gases', tag: 'Причини' },
    ],
    quiz: [
      { id: 1, question: 'Кое е възобновяем източник на енергия?', options: ['coal', 'oil', 'wind', 'gas'], correctIndex: 2, explanation: 'Вятърна енергия.' },
      { id: 2, question: 'Попълнете: Millions of trees ___ every year.', options: ['cut down', 'are cut down', 'are cutting down', 'have cut'], correctIndex: 1, explanation: 'Пасив.' },
      { id: 3, question: 'Кое е правилно?', options: ['It probably won’t snow.', 'It won’t probably snow.', 'It won’t snow probably not.', 'Probably it won’t not snow.'], correctIndex: 0, explanation: 'Probably преди won’t.' },
      { id: 4, question: 'Попълнете: The storm caused a lot of ___.', options: ['damages', 'a damage', 'damaging', 'damage'], correctIndex: 3, explanation: 'Неброимо.' },
      { id: 5, question: 'Попълнете: If people ___ less plastic, the oceans would be cleaner.', options: ['use', 'used', 'will use', 'would use'], correctIndex: 1, explanation: 'II тип.' },
      { id: 6, question: 'Какво означава sustainable?', options: ['устойчив', 'замърсен', 'изкопаем', 'евтин'], correctIndex: 0, explanation: 'Устойчив.' },
    ],
    quickQuestions: ['Как да напиша есе за околната среда?', 'Кои са причините за климатичните промени?', 'Какво мога да направя аз?'],
  },
  {
    ...base,
    id: 'en-b11-homeland-world',
    monTopicIds: ids('6'),
    title: 'Английски B1.1 (XI–XII): Моята родина и светът — езици, народи, забележителности, празници и туризъм',
    originalNoteExcerpt: 'Тематична област „Моята родина и светът“: езици, страни, народи; културни и исторически забележителности в родината и англоезичните страни; популярни празници и традиции; пътуване, ваканция, туризъм. Лексика: държави, националности, езици; ваканция, туризъм и пътуване; транспортни средства; културни и исторически забележителности; празници и традиции. Граматика: страдателен залог, бъдеще в миналото, съгласуване на времената.',
    summary: {
      overview:
        'Темата представя България като част от света: езиците и народите, които я свързват с другите, наследството ѝ, празниците и туризма — и как да говорим за тях на английски.',
      keyPoints: [
        'Езици и народи: multilingual — многоезичен, the European Union has 24 official languages, Cyrillic — кирилица (the third official alphabet of the EU), ethnic group, minority, cultural diversity — културно многообразие, emigrate/immigrate — изселвам се/заселвам се.',
        'Наследство: cultural heritage — културно наследство, UNESCO World Heritage List, the Thracian Tomb of Kazanlak, the Madara Rider — Мадарският конник, the Rock-hewn Churches of Ivanovo; in the UK — Hadrian’s Wall, Stonehenge, the Tower of London; in the USA — the Statue of Liberty, Independence Hall, Yellowstone National Park. Пасив: It was declared a World Heritage Site in 1979.',
        'Празници и традиции: national holiday — национален празник, folk costume — народна носия, horo — хоро, Rose Festival in Kazanlak, Surva festival in Pernik; St Patrick’s Day, Burns Night (25 януари, Шотландия), Thanksgiving, Independence Day.',
        'Туризъм: cultural/eco/rural tourism — културен/еко/селски туризъм, all-inclusive, off the beaten track — далеч от туристическите маршрути, overtourism — прекомерен туризъм, local guide, itinerary — маршрут на пътуването.',
        'Бъдеще в миналото и съгласуване: We knew that the trip would be amazing. The guide told us that the festival would start at noon. Примерен текст: When I first visited Kazanlak for the Rose Festival, I didn’t know what to expect. I had read that it was one of the oldest festivals in Bulgaria, but I didn’t think it would be so colourful. I would definitely recommend it to foreign visitors.',
      ],
      examGoldenRule: 'В представяне на забележителност отговори на: какво е, къде е, кога и от кого е създадено (пасив), защо е ценно, защо си струва да се посети.',
      commonTraps: ['Would в бъдещето в миналото: I thought it would rain (не it will rain).', 'Heritage е неброимо: our cultural heritage (не heritages).'],
      formulasOrDates: [
        { label: 'Бъдеще в миналото', value: 'I knew it would be…' },
        { label: 'Пасив', value: 'It was declared a World Heritage Site in…' },
        { label: 'Туризъм', value: 'off the beaten track, overtourism, itinerary' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b11-home-chk-1', requirement: 'Статия „Скрито бижу на България“ за чуждестранен сайт (160–170 думи)', whyNeeded: 'Представянето на информация е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Място, история, защо да се посети, препоръки.' },
      { id: 'en-b11-home-chk-2', requirement: 'Маршрут за тридневно пътуване на английски', whyNeeded: 'Планирането на съвместна дейност е част от речевите актове.', isEssentialForSix: false, suggestedNotes: 'Ден 1, 2, 3 — места, транспорт, храна.' },
    ],
    flashcards: [
      { id: 'en-b11-home-fc-1', front: 'Как е „културно наследство“?', back: 'cultural heritage', tag: 'Наследство' },
      { id: 'en-b11-home-fc-2', front: 'Как е „далеч от туристическите маршрути“?', back: 'off the beaten track', tag: 'Туризъм' },
      { id: 'en-b11-home-fc-3', front: 'Как е „народна носия“?', back: 'folk costume', tag: 'Традиции' },
      { id: 'en-b11-home-fc-4', front: 'Как е „Мислех, че ще вали“?', back: 'I thought it would rain.', tag: 'Граматика' },
      { id: 'en-b11-home-fc-5', front: 'Кога е Burns Night?', back: 'На 25 януари (Шотландия).', tag: 'Празници' },
      { id: 'en-b11-home-fc-6', front: 'Как е „маршрут на пътуването“?', back: 'itinerary', tag: 'Туризъм' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: We didn’t know the journey ___ so long.', options: ['will be', 'is', 'would be', 'has been'], correctIndex: 2, explanation: 'Бъдеще в миналото.' },
      { id: 2, question: 'Попълнете: The Madara Rider ___ in the early 8th century.', options: ['carved', 'was carved', 'is carving', 'has carved'], correctIndex: 1, explanation: 'Пасив в минало.' },
      { id: 3, question: 'Какво е overtourism?', options: ['прекомерен туризъм', 'евтин туризъм', 'селски туризъм', 'пътуване в чужбина'], correctIndex: 0, explanation: 'Прекомерен брой туристи.' },
      { id: 4, question: 'Кой празник е от Казанлък?', options: ['Surva', 'Burns Night', 'Thanksgiving', 'the Rose Festival'], correctIndex: 3, explanation: 'Празник на розата.' },
      { id: 5, question: 'Кое е правилно?', options: ['our cultural heritages', 'our cultural heritage', 'a cultural heritages', 'cultural heritage are'], correctIndex: 1, explanation: 'Неброимо.' },
      { id: 6, question: 'Какво е itinerary?', options: ['маршрут на пътуването', 'паспорт', 'хотел', 'сувенир'], correctIndex: 0, explanation: 'План на пътуването.' },
    ],
    quickQuestions: ['Как да представя българска забележителност?', 'Кои празници са типични за Шотландия?', 'Как да планирам пътуване на английски?'],
  },
  {
    ...base,
    id: 'en-b11-skills',
    monTopicIds: ids('skills'),
    title: 'Английски B1.1 (XI–XII): слушане, четене, говорене и писане — какво трябва да мога',
    originalNoteExcerpt: 'Слушане: съществената информация от изказвания и кратки текстове при нормално темпо; кратък разговор между носители на езика; основната информация в интервюта, новини, предавания; конкретна информация от съобщения, реклами, обяви, разписания, прогнози; компенсаторни стратегии. Четене: основната информация от кратки автентични/адаптирани текстове; комуникативна насоченост, персонажи, тема, мнения, намерения, чувства; указания, обяви, реклами, менюта, рецепти, разписания, програми; лични писма, имейли, покани, рубрики; ключови думи. Говорене: общуване в обичайни ситуации; разговор с обмен на информация и мнение; представяне, разказ, изказване по план или илюстрация, планове и намерения, преценка. Писане: съобщение, бележки, писмо; текст по опори; текст с лична преценка; формуляри; покана, молба, извинение, поздравление; 150–160 (XI) и 160–170 думи (XII).',
    summary: {
      overview:
        'Програмата за XI–XII клас довежда до ниво B1.1 — самостоятелно общуване по познати теми, разбиране на основното в ясни текстове и създаване на свързан текст с лична позиция.',
      keyPoints: [
        'Слушане: разбираш съществената информация при нормално темпо; следиш разговор на носители на езика и разпознаваш участниците, темата, мненията и чувствата им; разбираш основното в интервюта, новини и предавания; хващаш конкретни данни от съобщения, обяви и прогнози.',
        'Четене: извличаш основното от кратки автентични текстове (разкази, статии, рубрики); определяш целта на автора, персонажите и мненията; ориентираш се в обяви, менюта, рецепти, разписания и програми; разбираш лични писма и имейли. Стратегия — skimming (бързо прочитане за общия смисъл) и scanning (търсене на конкретна информация).',
        'Говорене: общуваш в обичайни ситуации; участваш в разговор и изразяваш мнение; разказваш случки и впечатления; правиш изказване по план или по снимка; говориш за планове и намерения; изразяваш преценка. Полезни изрази за дискусия: That’s a good point. I’m not sure I agree. What do you think about…? Let’s consider…',
        'Писане: съобщение, бележка, лично, електронно и официално писмо; текст по опорни точки или илюстрация; текст с лична преценка; формуляри; покана, молба, извинение, поздравление. Обем: 150–160 думи в XI клас и 160–170 думи в XII клас.',
        'Регистър: неофициален (Hi Tom, Thanks for…, See you soon, contractions — I’m, don’t) и официален (Dear Sir or Madam, I am writing to…, I would be grateful if…, Yours faithfully/Yours sincerely — без съкращения).',
      ],
      examGoldenRule: 'Избери регистъра според адресата: на приятел — неофициално със съкращения; на институция — официално, без съкращения и с учтиви формули.',
      commonTraps: ['Yours faithfully — когато не знаеш името (Dear Sir or Madam); Yours sincerely — когато знаеш името (Dear Mr Brown).', 'В официално писмо не се пишат съкращения (I am, не I’m).'],
      formulasOrDates: [
        { label: 'Официално', value: 'I am writing to… / I would be grateful if…' },
        { label: 'Стратегии за четене', value: 'skimming и scanning' },
        { label: 'Обем', value: '150–160 (XI) / 160–170 думи (XII)' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b11-skills-chk-1', requirement: 'Сравнителна таблица официално — неофициално писмо', whyNeeded: 'Писането на текст, съответстващ на комуникативната задача, е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Обръщение, начало, изрази, завършване.' },
      { id: 'en-b11-skills-chk-2', requirement: 'Изрази за дискусия и мнение', whyNeeded: 'Изразяването на мнение в разговор е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Съгласие, несъгласие, въпрос, предложение.' },
    ],
    flashcards: [
      { id: 'en-b11-skills-fc-1', front: 'Как започва официално писмо?', back: 'Dear Sir or Madam, I am writing to…', tag: 'Писане' },
      { id: 'en-b11-skills-fc-2', front: 'Кога се пише Yours faithfully?', back: 'Когато не знаеш името на адресата.', tag: 'Писане' },
      { id: 'en-b11-skills-fc-3', front: 'Какво е skimming?', back: 'Бързо прочитане за общия смисъл.', tag: 'Четене' },
      { id: 'en-b11-skills-fc-4', front: 'Какво е scanning?', back: 'Търсене на конкретна информация в текста.', tag: 'Четене' },
      { id: 'en-b11-skills-fc-5', front: 'Как учтиво възразяваш в дискусия?', back: 'I’m not sure I agree, because…', tag: 'Говорене' },
      { id: 'en-b11-skills-fc-6', front: 'Колко думи е текстът в XII клас на B1.1?', back: '160–170 думи.', tag: 'Писане' },
    ],
    quiz: [
      { id: 1, question: 'Как завършваш официално писмо, започнато с Dear Sir or Madam?', options: ['Love,', 'Yours sincerely,', 'Yours faithfully,', 'See you,'], correctIndex: 2, explanation: 'Името не е известно.' },
      { id: 2, question: 'Кое е подходящо в официално писмо?', options: ['I’d be grateful if you could…', 'Can you just…?', 'Hey, send me…', 'Gimme…'], correctIndex: 0, explanation: 'Учтива формула.' },
      { id: 3, question: 'Какво е scanning?', options: ['прочитане за общия смисъл', 'превод на текста', 'писане на резюме', 'търсене на конкретна информация'], correctIndex: 3, explanation: 'Търсене на конкретното.' },
      { id: 4, question: 'Как учтиво възразяваш?', options: ['You’re wrong.', 'I’m not sure I agree, because…', 'No way!', 'That’s stupid.'], correctIndex: 1, explanation: 'Учтиво несъгласие.' },
      { id: 5, question: 'Какъв е обемът на текста в XI клас?', options: ['150–160 думи', '60–80 думи', '250–300 думи', '100 думи'], correctIndex: 0, explanation: 'По програмата.' },
      { id: 6, question: 'Кое е характерно за неофициалното писмо?', options: ['Yours faithfully', 'съкращения като I’m, don’t', 'I am writing to complain', 'Dear Sir'], correctIndex: 1, explanation: 'Неофициален регистър.' },
    ],
    quickQuestions: ['Как да разбера кой регистър да използвам?', 'Как да чета бързо и ефективно?', 'Как да участвам в дискусия на английски?'],
  },
  {
    ...base,
    id: 'en-b11-grammar',
    monTopicIds: ids('grammar'),
    title: 'Английски B1.1 (XI–XII): езикови знания — Past Perfect, бъдеще в миналото, условни изречения II и III тип, инфинитив и герундий',
    originalNoteExcerpt: 'Граматика: модалност (need — задължение, необходимост; cannot — забрана; will — молба); глаголни фрази с have, take, make, do, get; глаголи-действия и глаголи-състояния; страдателен залог (пряко и непряко допълнение); повелително наклонение; Past Perfect; бъдеще в миналото (Simple); съгласуване на времената; условни изречения II и III тип; инфинитив (пълен, непълен след модални глаголи, let, make, would like/love/hate/prefer); герундий (след предлог, be worth, can’t help, be any use/good, like, love, hate, prefer, dislike, mind, avoid, suggest, bear, stand, stop). Съществителни — определители и синтактични модели (determiner + adjective + noun, noun + noun). Прилагателни — словообразуване, позиция. Наречия — за вероятност, степенуване. Синтаксис: that-clause, обстоятелствени изречения за място, начин, условие; непряка реч (съобщения и въпроси).',
    summary: {
      overview:
        'Граматиката на B1.1 в горния курс завършва основната глаголна система: последователността на минали събития, бъдещето, видяно от миналото, въображаемите и нереалните условия и предаването на чужда реч.',
      keyPoints: [
        'Past Perfect и бъдеще в миналото: Past Perfect (had + III форма) за по-ранно минало — When I got home, my parents had already eaten.; бъдеще в миналото (would + глагол) — She promised that she would help me. При съгласуване на времената подчиненото изречение следва миналото време на главното: He said that he was tired and that he had worked all day.',
        'Условни изречения II и III тип: II — If I had more time, I would learn Spanish. (въображаемо сега); III — If we had left earlier, we wouldn’t have missed the plane. (нереално минало). Unless = if not: You won’t pass unless you study.',
        'Страдателен залог с два обекта: They offered me a job. → I was offered a job. / A job was offered to me. Have/get something done — I had my eyes tested.',
        'Инфинитив и герундий: would like/love/hate/prefer + to (I’d prefer to wait); let/make + непълен инфинитив (Let me explain); герундий след be worth, can’t help, it’s no use/good (It’s no use complaining), can’t bear/stand (I can’t stand waiting), suggest (She suggested going by train), mind (Do you mind opening the window?).',
        'Наречия и словоред: наречия за вероятност — certainly, definitely, probably, possibly, perhaps/maybe; степенуване на наречията — fast → faster, carefully → more carefully, well → better; позиция на прилагателното — пред съществителното (a beautiful house) или след глаголи като be, look, feel, seem (The house looks beautiful).',
      ],
      examGoldenRule: 'Suggest се използва с -ing или с that-clause, но никога с инфинитив: She suggested going / She suggested that we go (не suggested to go).',
      commonTraps: ['След if в III тип няма would: If I had known (не If I would have known).', 'Look, feel, seem се свързват с прилагателно, не с наречие: You look tired (не tiredly).'],
      formulasOrDates: [
        { label: 'Past Perfect', value: 'had + III форма' },
        { label: 'III тип', value: 'If + Past Perfect, would have + III форма' },
        { label: 'Suggest', value: 'suggest + -ing / suggest that…' },
      ],
    },
    notebookChecklist: [
      { id: 'en-b11-gram-chk-1', requirement: 'Хронологична лента: Past Simple, Past Perfect, бъдеще в миналото', whyNeeded: 'Времената и съгласуването им са в програмата.', isEssentialForSix: true, suggestedNotes: 'Примери от една история.' },
      { id: 'en-b11-gram-chk-2', requirement: 'Глаголи и изрази с герундий', whyNeeded: 'Герундият е в програмата.', isEssentialForSix: false, suggestedNotes: 'be worth, can’t help, it’s no use, can’t stand, suggest, mind.' },
    ],
    flashcards: [
      { id: 'en-b11-gram-fc-1', front: 'Какво значи unless?', back: 'If not: unless you study = if you don’t study.', tag: 'Условни' },
      { id: 'en-b11-gram-fc-2', front: 'Как е „Предложиха ми работа“ в пасив?', back: 'I was offered a job.', tag: 'Пасив' },
      { id: 'en-b11-gram-fc-3', front: 'Как е „Няма смисъл да се оплакваш“?', back: 'It’s no use complaining.', tag: 'Герундий' },
      { id: 'en-b11-gram-fc-4', front: 'Как се използва suggest?', back: 'suggest + -ing или suggest that…', tag: 'Герундий' },
      { id: 'en-b11-gram-fc-5', front: 'Как е бъдещето в миналото?', back: 'would + глагол: She said she would call.', tag: 'Времена' },
      { id: 'en-b11-gram-fc-6', front: 'Как е „Изглеждаш уморен“?', back: 'You look tired.', tag: 'Прилагателни' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: She suggested ___ to the cinema.', options: ['to go', 'go', 'going', 'went'], correctIndex: 2, explanation: 'Suggest + -ing.' },
      { id: 2, question: 'Попълнете: You won’t get a ticket ___ you book early.', options: ['if', 'unless', 'when', 'because'], correctIndex: 1, explanation: 'Unless = if not.' },
      { id: 3, question: 'Попълнете: When I arrived, the lesson ___.', options: ['already started', 'has already started', 'is already starting', 'had already started'], correctIndex: 3, explanation: 'Past Perfect.' },
      { id: 4, question: 'Попълнете: If I ___ about the party, I would have come.', options: ['had known', 'knew', 'would know', 'have known'], correctIndex: 0, explanation: 'III тип.' },
      { id: 5, question: 'Кое е правилно?', options: ['The soup tastes deliciously.', 'The soup tastes delicious.', 'The soup delicious tastes.', 'The soup is tasting deliciously.'], correctIndex: 1, explanation: 'Taste + прилагателно.' },
      { id: 6, question: 'Попълнете: He promised that he ___ me the next day.', options: ['will call', 'calls', 'would call', 'is calling'], correctIndex: 2, explanation: 'Бъдеще в миналото.' },
    ],
    quickQuestions: ['Как да разбера кое минало действие е по-ранно?', 'Каква е разликата между II и III тип условни изречения?', 'Кои глаголи искат герундий?'],
  },
];
