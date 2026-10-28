import type { LessonData } from '../../types';

// Немски език, ниво A1 (втори чужд език, IX–X клас) — по един урок за всяка тема от учебната програма на МОН
// (https://www.mon.bg/nfs/2023/12/up_ix_ne_a1.pdf): шестте тематични области, уменията и езиковите знания.
// Обяснения на български, примери на немски; примерните текстове са написани за урока.

const base = { subject: 'Чужди езици (Немски, Френски, Испански)', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ne-a1:${num}`];

export const MON_LESSONS_DE_A1: LessonData[] = [
  {
    ...base,
    id: 'de-a1-me-and-others',
    monTopicIds: ids('1'),
    title: 'Немски A1: Аз и другите — лична информация, семейство и приятели',
    originalNoteExcerpt: 'Тематична област „Аз и другите“: лична информация (име, възраст, дата и място на раждане, националност, местоживеене); семейство и приятели (роднински връзки). Речеви етикет — поздрав, представяне, запознаване, сбогуване. Писане — попълване на формуляр, кратко представяне (60–80 думи в IX, 70–90 думи в X клас).',
    summary: {
      overview:
        'Първата тема на ниво A1 по немски език учи как да се представиш, да попиташ събеседника си кой е и откъде идва и да разкажеш накратко за семейството и приятелите си.',
      keyPoints: [
        'Лична информация (Angaben zur Person): der Vorname — собствено име, der Familienname / der Nachname — фамилия, das Alter — възраст, der Geburtsort — място на раждане, die Adresse — адрес, die Staatsangehörigkeit — гражданство/националност. Въпроси: Wie heißt du? (Как се казваш?), Wie alt bist du? (На колко години си?), Woher kommst du? (Откъде си?), Wo wohnst du? (Къде живееш?).',
        'Семейство и приятели (Familie und Freunde): die Mutter — майка, der Vater — баща, die Eltern — родители, der Bruder — брат, die Schwester — сестра, die Geschwister — братя и сестри, die Großmutter / die Oma, der Großvater / der Opa, die Tante — леля, der Onkel — чичо/вуйчо, der Cousin / die Cousine — братовчед/ка, der Freund / die Freundin — приятел/ка.',
        'Речеви етикет при среща и раздяла: Hallo! / Guten Morgen! / Guten Tag! / Guten Abend!; Ich heiße… / Mein Name ist… / Ich bin…; Freut mich! / Sehr erfreut! — Приятно ми е!; Das ist mein Freund Lukas. — Това е приятелят ми Лукас.; Tschüss! / Auf Wiedersehen! / Bis bald! — Чао! / Довиждане! / До скоро!',
        'Граматика в темата: спрежение на sein (ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind) и haben (ich habe, du hast, er/sie/es hat); слаби глаголи в Präsens (heißen, kommen, wohnen); притежателни местоимения mein/meine, dein/deine; отрицателен член kein/keine (Ich habe keine Schwester — Нямам сестра); числата от 1 до 100.',
        'Примерен текст: Hallo! Ich heiße Elena Petrova und bin fünfzehn Jahre alt. Ich komme aus Bulgarien und wohne in Plovdiv. Meine Familie ist nicht groß: meine Mutter, mein Vater und mein Bruder Martin. Er ist zehn Jahre alt. Meine beste Freundin heißt Ana. Wir lernen zusammen Deutsch. — На ниво A1 писменият текст е 60–80 думи в IX клас и 70–90 думи в X клас.',
      ],
      examGoldenRule: 'Всички съществителни имена в немския език се пишат с главна буква (der Bruder, die Schule, das Jahr), а възрастта се изразява със sein: Ich bin 15 Jahre alt.',
      commonTraps: [
        'Всички съществителни в немския се пишат с главна буква, но прилагателните за език и националност — с малка: Ich spreche bulgarisch und deutsch.',
        'За отрицание на съществително с неопределителен член или без член се използва kein/keine, а не nicht: Ich habe keinen Bruder.',
      ],
      formulasOrDates: [
        { label: 'Представяне', value: 'Ich heiße… / Ich bin … Jahre alt. / Ich komme aus Bulgarien.' },
        { label: 'Семейство', value: 'Ich habe einen Bruder / eine Schwester / keine Geschwister.' },
        { label: 'Обем на текста', value: '60–80 думи (IX) / 70–90 думи (X)' },
      ],
    },
    notebookChecklist: [
      { id: 'de-a1-me-chk-1', requirement: 'Кратко представяне на себе си и семейството (60–80 думи)', whyNeeded: 'Представянето с прости изречения е очакван резултат по програмата.', isEssentialForSix: true, suggestedNotes: 'Име, възраст, град, членове на семейството, най-добър приятел.' },
      { id: 'de-a1-me-chk-2', requirement: 'Таблица на роднинските връзки с определителен член и множествено число', whyNeeded: 'Всяко немско съществително се учи заедно с рода и множественото си число.', isEssentialForSix: false, suggestedNotes: 'der Bruder – die Brüder, die Schwester – die Schwestern…' },
    ],
    flashcards: [
      { id: 'de-a1-me-fc-1', front: 'Как се пита „Откъде си?“ на немски?', back: 'Woher kommst du?', tag: 'Въпроси' },
      { id: 'de-a1-me-fc-2', front: 'Как е „братя и сестри“ с една дума на немски?', back: 'die Geschwister', tag: 'Семейство' },
      { id: 'de-a1-me-fc-3', front: 'Как се казва „На 15 години съм“?', back: 'Ich bin fünfzehn Jahre alt.', tag: 'Лична информация' },
      { id: 'de-a1-me-fc-4', front: 'Как се казва „Нямам сестра“?', back: 'Ich habe keine Schwester.', tag: 'Граматика' },
      { id: 'de-a1-me-fc-5', front: 'Как е учтивото „Довиждане“ на немски?', back: 'Auf Wiedersehen!', tag: 'Етикет' },
      { id: 'de-a1-me-fc-6', front: 'Как се спряга haben във 2. и 3. л. ед. ч.?', back: 'du hast, er/sie/es hat', tag: 'Глаголи' },
    ],
    quiz: [
      { id: 1, question: 'Кой въпрос означава „Къде живееш?“', options: ['Woher kommst du?', 'Wie heißt du?', 'Wo wohnst du?', 'Wer bist du?'], correctIndex: 2, explanation: 'Wo — къде; wohnen — живея.' },
      { id: 2, question: 'Попълнете правилно: Ich ___ fünfzehn Jahre alt.', options: ['habe', 'bin', 'ist', 'heiße'], correctIndex: 1, explanation: 'Възрастта на немски се изразява с глагола sein (ich bin).' },
      { id: 3, question: 'Попълнете: Wie alt ___ dein Bruder?', options: ['bist', 'sind', 'hat', 'ist'], correctIndex: 3, explanation: '3. л. ед. ч. (er) — ist.' },
      { id: 4, question: 'Кое изречение е написано правилно по правилата на немския правопис?', options: ['Meine Schwester wohnt in Sofia.', 'Meine schwester wohnt in Sofia.', 'Meine Schwester Wohnt in Sofia.', 'meine Schwester wohnt in sofia.'], correctIndex: 0, explanation: 'Съществителните и собствените имена са с главна буква, глаголите — с малка.' },
      { id: 5, question: 'Попълнете: Du ___ eine nette Freundin.', options: ['habst', 'hast', 'hat', 'haben'], correctIndex: 1, explanation: 'Формата на haben за du е hast.' },
      { id: 6, question: 'Как се казва „Приятно ми е!“ при запознанство?', options: ['Freut mich!', 'Bis bald!', 'Gute Nacht!', 'Entschuldigung!'], correctIndex: 0, explanation: 'Freut mich! — Приятно ми е!' },
    ],
    quickQuestions: ['Как да се представя на немски с 5 изречения?', 'Защо пред всяко съществително трябва да знам der, die или das?', 'Кога използвам kein вместо nicht?'],
  },
  {
    ...base,
    id: 'de-a1-world-around-me',
    monTopicIds: ids('2'),
    title: 'Немски A1: Светът около мен — моят дом, родното място и училището',
    originalNoteExcerpt: 'Тематична област „Светът около мен“: моят дом, моето родно място; моето училище — учебни предмети и дейности. Граматика: определителен и неопределителен член в Nominativ, Akkusativ и Dativ; безлично es gibt (+ Akkusativ); предлози за място.',
    summary: {
      overview:
        'Втората тема учи как да опишем жилището си, родния град или село и училищния живот — стаите и мебелите у дома, местата в града и учебните предмети.',
      keyPoints: [
        'Моят дом (Mein Zuhause): das Haus — къща, die Wohnung — апартамент, das Zimmer — стая, das Wohnzimmer — хол, die Küche — кухня, das Schlafzimmer — спалня, das Bad — баня, der Balkon, der Garten — градина. Мебели (die Möbel): das Bett — легло, der Tisch — маса, der Stuhl — стол, der Schrank — гардероб/шкаф, der Schreibtisch — бюро, das Sofa.',
        'Родното място (Mein Heimatort): die Stadt — град, das Dorf — село, die Straße — улица, der Platz — площад, der Park, die Schule, das Geschäft — магазин, das Krankenhaus — болница; im Zentrum — в центъра, in der Nähe — наблизо.',
        'Моето училище (Meine Schule): das Klassenzimmer — класна стая, der Stundenplan — учебна програма, die Pause — междучасие, der Lehrer / die Lehrerin — учител/ка, der Mitschüler — съученик, die Hausaufgabe — домашна работа. Учебни предмети (Schulfächer): Bulgarisch, Deutsch, Englisch, Mathematik (Mathe), Geschichte — история, Geografie (Erdkunde), Biologie, Physik, Chemie, Musik, Kunst, Sport, Informatik.',
        'Граматика в темата: безличният израз es gibt + Akkusativ (има): In meinem Zimmer gibt es ein Bett und einen Schreibtisch. (м.р. в Akkusativ получава -en: einen Tisch, keinen Garten). Локация в Dativ на въпроса Wo? (Къде?): in der Küche (ж.р. die → der), im (in dem) Wohnzimmer (ср.р. das → dem), in meinem Zimmer.',
        'Примерен текст: Ich wohne in einer Wohnung in Varna. Unsere Wohnung ist hell und gemütlich. Es gibt drei Zimmer, eine Küche und ein Bad. Mein Zimmer ist nicht groß, aber schön. Dort stehen ein Bett, ein Schreibtisch und ein Schrank. Meine Schule ist in der Nähe. Mein Lieblingsfach ist Deutsch.',
      ],
      examGoldenRule: 'След израза es gibt винаги следва винителен падеж (Akkusativ): за мъжки род членът става einen / keinen (Es gibt einen Park), а за женски и среден род остава eine и ein.',
      commonTraps: [
        'Не бъркай падежа след es gibt (Akkusativ: Es gibt einen Garten) с падежа за местоположение Wo? (Dativ: im Garten).',
        'Учебните предмети се изписват с главна буква и без член: Ich habe heute Mathe und Deutsch.',
      ],
      formulasOrDates: [
        { label: 'Има (+ Akkusativ)', value: 'Es gibt einen Schreibtisch / eine Lampe / ein Bett.' },
        { label: 'Къде? (+ Dativ)', value: 'im (in dem) Zimmer / in der Schule / zu Hause' },
        { label: 'Любим предмет', value: 'Mein Lieblingsfach ist…' },
      ],
    },
    notebookChecklist: [
      { id: 'de-a1-world-chk-1', requirement: 'Описание на моята стая и дома с es gibt (60–80 думи)', whyNeeded: 'Описването на дома и близката среда е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Помещения, мебели в стаята ми, прилагателни (groß, klein, hell, gemütlich).' },
      { id: 'de-a1-world-chk-2', requirement: 'Моята седмична учебна програма (Stundenplan) на немски', whyNeeded: 'Лексиката за учебни предмети и дни от седмицата е в програмата.', isEssentialForSix: false, suggestedNotes: 'Montag bis Freitag + учебните предмети.' },
    ],
    flashcards: [
      { id: 'de-a1-world-fc-1', front: 'Как е „бюро“ на немски (с член)?', back: 'der Schreibtisch', tag: 'Дом' },
      { id: 'de-a1-world-fc-2', front: 'Какъв падеж изисква изразът es gibt?', back: 'Akkusativ (Es gibt einen Park).', tag: 'Граматика' },
      { id: 'de-a1-world-fc-3', front: 'Как е „Моят любим предмет е биология“?', back: 'Mein Lieblingsfach ist Biologie.', tag: 'Училище' },
      { id: 'de-a1-world-fc-4', front: 'Как е „спалня“ на немски (с член)?', back: 'das Schlafzimmer', tag: 'Дом' },
      { id: 'de-a1-world-fc-5', front: 'Как е „междучасие“ на немски?', back: 'die Pause', tag: 'Училище' },
      { id: 'de-a1-world-fc-6', front: 'Как става die Küche на въпроса Wo? (в кухнята)?', back: 'in der Küche (Dativ)', tag: 'Граматика' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: In meinem Zimmer gibt es ___ Schreibtisch. (der Schreibtisch)', options: ['ein', 'eine', 'einen', 'einem'], correctIndex: 2, explanation: 'След es gibt следва Akkusativ; мъжки род der → einen.' },
      { id: 2, question: 'Къде приготвяме храната у дома?', options: ['im Schlafzimmer', 'im Klassenzimmer', 'im Garten', 'in der Küche'], correctIndex: 3, explanation: 'Die Küche — кухнята; в Dativ: in der Küche.' },
      { id: 3, question: 'Коя дума означава „учебна програма / разписание на часовете“?', options: ['der Stundenplan', 'der Schrank', 'die Hausaufgabe', 'der Platz'], correctIndex: 0, explanation: 'Die Stunde (час) + der Plan (план) = der Stundenplan.' },
      { id: 4, question: 'Попълнете: Meine Mutter ist ___ Wohnzimmer. (das Wohnzimmer)', options: ['in der', 'im', 'in den', 'ins'], correctIndex: 1, explanation: 'Wo? + Dativ: in dem = im Wohnzimmer.' },
      { id: 5, question: 'Кое е учебен предмет?', options: ['Mitschüler', 'Wohnung', 'Geschichte', 'Dorf'], correctIndex: 2, explanation: 'Geschichte — история.' },
      { id: 6, question: 'Как се казва „у дома / вкъщи“ (местоположение)?', options: ['zu Hause', 'nach Hause', 'im Haus ein', 'von Hause'], correctIndex: 0, explanation: 'Zu Hause — у дома (Wo?); nach Hause е „към вкъщи“.' },
    ],
    quickQuestions: ['Как да опиша стаята си на немски?', 'Защо казваме einen Tisch, но ein Bett?', 'Как се наричат учебните предмети на немски?'],
  },
  {
    ...base,
    id: 'de-a1-everyday-life',
    monTopicIds: ids('3'),
    title: 'Немски A1: Всекидневие — моят ден, свободно време и любими занимания',
    originalNoteExcerpt: 'Тематична област „Всекидневие“: моят ден; свободно време; любими занимания. Граматика: делими глаголи (aufstehen, fernsehen), силни глаголи с промяна на кореновата гласна (fahren, lesen, sehen, essen), наречието gern (lieber, am liebsten), часовник (Uhrzeit), словоред в разказно изречение.',
    summary: {
      overview:
        'Третата тема учи как да разкажем как минава един наш ден по часове и какво обичаме да правим в свободното си време.',
      keyPoints: [
        'Моят ден и делимите глаголи (Trennbare Verben): aufstehen — ставам (Ich stehe um 7 Uhr auf), frühstücken — закусвам, in die Schule gehen — отивам на училище, zu Mittag essen — обядвам, zurückkommen — връщам се, Hausaufgaben machen — пиша домашни, fernsehen — гледам телевизия (Abends sehe ich fern), schlafen gehen — лягам си.',
        'Часовникът (Die Uhrzeit) и дните: Wie spät ist es? / Wie viel Uhr ist es? — Колко е часът?; Es ist sieben Uhr. (7:00); Es ist Viertel nach sieben. (7:15); Es ist halb acht. (7:30 — букв. „половин осем“!); Es ist Viertel vor acht. (7:45). За точен час използваме предлога um: um 8 Uhr; за дни и части от деня — am: am Montag, am Morgen, am Nachmittag, am Wochenende.',
        'Свободно време и хобита (Freizeit und Hobbys): Musik hören, Bücher lesen, Freunde treffen, Fußball / Basketball / Computerspiele spielen, Rad fahren — карам колело, schwimmen — плувам, tanzen — танцувам, ins Kino gehen — ходя на кино.',
        'Граматика в темата: силни глаголи с промяна на гласната във 2. и 3. л. ед. ч. (fahren → du fährst, er fährt; lesen → du liest, er liest; sehen → du siehst, er sieht; sprechen → er spricht; essen → er isst). Наречието gern (с удоволствие) със степенуване: gern → lieber → am liebsten (Ich spiele gern Tennis. Lieber spiele ich Fußball. Am liebsten schwimme ich.).',
        'Словоред (Wortstellung): в разказно изречение спрегнатият глагол стои ВИНАГИ на второ място, а делимата представка отива на самия край: Am Morgen stehe ich um sieben Uhr auf.',
      ],
      examGoldenRule: 'Внимавай с половинките часове на немски: halb acht е 7:30 (половината към осем), а НЕ 8:30! И винаги дръж спрегнатия глагол на втора позиция в изречението.',
      commonTraps: [
        'Halb acht означава 7:30, а halb neun — 8:30 (отброява се към следващия час).',
        'Когато изречението започва с обстоятелство за време (Am Montag… / Um 7 Uhr…), подлогът минава след глагола, за да остане глаголът на второ място: Um 7 Uhr stehe ich auf.',
      ],
      formulasOrDates: [
        { label: 'Часовник', value: 'Viertel nach 7 (7:15), halb 8 (7:30), Viertel vor 8 (7:45)' },
        { label: 'Предпочитания', value: 'gern → lieber → am liebsten' },
        { label: 'Делим глагол', value: 'Ich stehe um 7 Uhr auf. / Er sieht abends fern.' },
      ],
    },
    notebookChecklist: [
      { id: 'de-a1-day-chk-1', requirement: 'Разказ „Mein Tag“ (Моят ден) от сутринта до вечерта (60–80 думи)', whyNeeded: 'Разказването за всекидневните дейности и предпочитания е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Часове с um, делими глаголи, 2 изречения за свободното време с gern/am liebsten.' },
      { id: 'de-a1-day-chk-2', requirement: 'Таблица на силните глаголи с промяна на гласната (e → i/ie, a → ä)', whyNeeded: 'Спрежението на силните глаголи в Präsens е в програмата.', isEssentialForSix: false, suggestedNotes: 'fahren, schlafen, lesen, sehen, sprechen, essen, geben, nehmen.' },
    ],
    flashcards: [
      { id: 'de-a1-day-fc-1', front: 'Колко е часът: Es ist halb neun?', back: '8:30 ч. (осем и половина)', tag: 'Часовник' },
      { id: 'de-a1-day-fc-2', front: 'Как е „Ставам в 7 часа“ на немски?', back: 'Ich stehe um sieben Uhr auf.', tag: 'Делими глаголи' },
      { id: 'de-a1-day-fc-3', front: 'Как се спряга lesen в 3. л. ед. ч. (er/sie)?', back: 'er/sie liest', tag: 'Силни глаголи' },
      { id: 'de-a1-day-fc-4', front: 'Как се степенува наречието gern?', back: 'gern — lieber — am liebsten', tag: 'Граматика' },
      { id: 'de-a1-day-fc-5', front: 'Кой предлог се използва пред дни и части на деня (в понеделник, сутринта)?', back: 'am (am Montag, am Morgen), но през нощта — in der Nacht', tag: 'Време' },
      { id: 'de-a1-day-fc-6', front: 'Как е „Обичам да слушам музика“ с gern?', back: 'Ich höre gern Musik.', tag: 'Свободно време' },
    ],
    quiz: [
      { id: 1, question: 'Колко е часът, ако часовникът показва 7:30?', options: ['Es ist halb sieben.', 'Es ist halb acht.', 'Es ist Viertel nach sieben.', 'Es ist sieben Uhr dreißig vor.'], correctIndex: 1, explanation: 'На немски 7:30 е halb acht (половината от осмия час).' },
      { id: 2, question: 'Попълнете: Mein Bruder ___ am Wochenende gern Bücher. (lesen)', options: ['lest', 'lese', 'liest', 'lesen'], correctIndex: 2, explanation: 'Силен глагол lesen: e → ie във 2. и 3. л. ед. ч. (du liest, er liest).' },
      { id: 3, question: 'Кое изречение има правилен словоред?', options: ['Am Morgen ich stehe um 7 Uhr auf.', 'Am Morgen aufstehe ich um 7 Uhr.', 'Am Morgen ich um 7 Uhr stehe auf.', 'Am Morgen stehe ich um 7 Uhr auf.'], correctIndex: 3, explanation: 'Глаголът stehe е на 2-ро място, а делимата представка auf — в края.' },
      { id: 4, question: 'Попълнете степенуването: Ich spiele gern Basketball, aber ___ spiele ich Fußball.', options: ['lieber', 'mehr', 'besser', 'liebsten'], correctIndex: 0, explanation: 'Сравнителната степен на gern е lieber.' },
      { id: 5, question: 'Попълнете предлозите: ___ Montag beginnt der Unterricht ___ 8 Uhr.', options: ['Im / am', 'Um / am', 'Am / um', 'An / in'], correctIndex: 2, explanation: 'Am Montag (за ден) и um 8 Uhr (за точен час).' },
      { id: 6, question: 'Попълнете: ___ du gern Rad? (fahren)', options: ['Fahrst', 'Fährst', 'Fährt', 'Fahren'], correctIndex: 1, explanation: 'Силен глагол fahren: a → ä във 2. и 3. л. ед. ч. (du fährst).' },
    ],
    quickQuestions: ['Защо halb acht е 7:30, а не 8:30?', 'Къде отива представката на делимия глагол в изречението?', 'Как да кажа какво обичам да правя най-много?'],
  },
  {
    ...base,
    id: 'de-a1-health-body',
    monTopicIds: ids('4'),
    title: 'Немски A1: Здраве и здравословен начин на живот — части на човешкото тяло',
    originalNoteExcerpt: 'Тематична област „Здраве и здравословен начин на живот“: части на човешкото тяло. Граматика: модални глаголи (müssen, sollen, können, dürfen), повелително наклонение (Imperativ), притежателни местоимения и лични местоимения в Dativ (Mir tut der Kopf weh).',
    summary: {
      overview:
        'Четвъртата тема ни запознава с частите на човешкото тяло и с изразите, с които описваме как се чувстваме и какво ни боли при посещение при лекар.',
      keyPoints: [
        'Части на тялото (Körperteile): der Kopf — глава, das Gesicht — лице, das Auge (die Augen) — око, das Ohr (die Ohren) — ухо, die Nase — нос, der Mund — уста, der Zahn (die Zähne) — зъб, der Hals — врат/гърло, die Schulter — рамо, der Arm — ръка, die Hand (die Hände) — длан/ръка, der Finger — пръст, der Rücken — гръб, der Bauch — корем, das Bein (die Beine) — крак, das Knie — коляно, der Fuß (die Füße) — стъпало.',
        'Здраве и оплаквания (Gesundheit und Beschwerden): gesund — здрав, krank — болен, müde — уморен, eine Erkältung haben — имам настинка, Fieber haben — имам температура, Husten / Schnupfen haben — имам кашлица / хрема; der Arzt / die Ärztin — лекар/ка, das Medikament / die Tablette — лекарство / хапче.',
        'Как казваме какво ни боли: Wie geht es dir? — Как си? Es geht mir gut / nicht so gut. — Добре съм / Не съм много добре.; Was fehlt dir? — Какво ти има?; Mein Kopf tut weh. / Mir tut der Kopf weh. — Боли ме главата.; Meine Augen tun weh. (мн. ч.) или Ich habe Kopfschmerzen / Zahnschmerzen / Halsschmerzen / Bauchschmerzen.',
        'Граматика в темата: модални глаголи за задължение и съвет — müssen (трябва: Ich muss zum Arzt gehen), sollen (препоръка от лекар: Du sollst im Bett bleiben — Трябва да останеш в леглото), dürfen (позволение/забрана: Du darfst kein Eis essen — Не бива да ядеш сладолед). Повелително наклонение (Imperativ): Trink viel Tee! (за du), Trinkt! (за ihr), Trinken Sie! (за Sie).',
        'Примерен диалог при лекаря: — Guten Tag! Was fehlt dir denn? — Guten Tag, Frau Doktor! Mir tut der Hals weh und ich habe Fieber. — Du hast eine Erkältung. Du musst drei Tage zu Hause bleiben. Nimm diese Tabletten und trink viel warmen Tee! — Vielen Dank!',
      ],
      examGoldenRule: 'С модален глагол се образува рамкова конструкция (Satzklammer): модалният глагол стои на второ място (спрегнат), а основният глагол отива в инфинитив на самия край на изречението.',
      commonTraps: [
        'Глаголът wehtun (боли) е делим: в единствено число е tut weh (Der Zahn tut weh), а в множествено — tun weh (Die Zähne tun weh).',
        'При повелително наклонение за 2. л. ед. ч. (du) отпада окончанието -st и местоимението du: Geh! Trink! Nimm! (а при силни глаголи с a → ä умлаутът отпада: Fahr langsam!).',
      ],
      formulasOrDates: [
        { label: 'Болка', value: 'Mir tut der Kopf weh. / Ich habe Kopfschmerzen.' },
        { label: 'Рамка с модален глагол', value: 'Du musst im Bett bleiben. / Du sollst Tee trinken.' },
        { label: 'Imperativ (du / ihr / Sie)', value: 'Trink! / Trinkt! / Trinken Sie!' },
      ],
    },
    notebookChecklist: [
      { id: 'de-a1-health-chk-1', requirement: 'Схема на човешкото тяло с минимум 15 части (с род и множествено число)', whyNeeded: 'Частите на човешкото тяло са основното съдържание на четвъртата тематична област.', isEssentialForSix: true, suggestedNotes: 'der Kopf, das Auge – die Augen, der Zahn – die Zähne, die Hand – die Hände, der Fuß – die Füße…' },
      { id: 'de-a1-health-chk-2', requirement: 'Кратък диалог „Beim Arzt“ (При лекаря)', whyNeeded: 'Изразяването на здравословно състояние и разбирането на указания са очаквани резултати.', isEssentialForSix: false, suggestedNotes: 'Was fehlt dir? — Ich habe… — Du musst/sollst…' },
    ],
    flashcards: [
      { id: 'de-a1-health-fc-1', front: 'Как е „зъб“ и „зъби“ на немски?', back: 'der Zahn — die Zähne', tag: 'Тяло' },
      { id: 'de-a1-health-fc-2', front: 'Как се казва „Боли ме гърлото“ (два начина)?', back: 'Mir tut der Hals weh. / Ich habe Halsschmerzen.', tag: 'Здраве' },
      { id: 'de-a1-health-fc-3', front: 'Как е „ръка (длан)“ и нейното множествено число?', back: 'die Hand — die Hände', tag: 'Тяло' },
      { id: 'de-a1-health-fc-4', front: 'Кой модален глагол предава съвет или поръчение от друг човек (напр. от лекар)?', back: 'sollen (Der Arzt sagt, ich soll im Bett bleiben.)', tag: 'Модални' },
      { id: 'de-a1-health-fc-5', front: 'Как е повелителната форма за du на глагола nehmen (вземам)?', back: 'Nimm! (Nimm die Tablette!)', tag: 'Imperativ' },
      { id: 'de-a1-health-fc-6', front: 'Как се пита „Как си?“ на немски?', back: 'Wie geht es dir? (и учтиво: Wie geht es Ihnen?)', tag: 'Етикет' },
    ],
    quiz: [
      { id: 1, question: 'Коя е правилната форма за множествено число на der Fuß (стъпало)?', options: ['die Fuße', 'die Füßen', 'die Füße', 'die Fußer'], correctIndex: 2, explanation: 'Der Fuß получава умлаут и окончание -e: die Füße.' },
      { id: 2, question: 'Попълнете: Peter ist krank. Er ___ heute zum Arzt gehen.', options: ['muss', 'musst', 'müssen', 'müsst'], correctIndex: 0, explanation: 'За 1. и 3. л. ед. ч. (ich/er/sie/es) формата на müssen е muss (без окончание -t!).' },
      { id: 3, question: 'Попълнете: Meine Ohren ___ weh.', options: ['tut', 'tust', 'tun', 'tuen'], correctIndex: 2, explanation: 'Meine Ohren е в множествено число — tun weh.' },
      { id: 4, question: 'Коя е правилната повелителна форма към един приятел (du): „Пий много вода!“', options: ['Trinkst du viel Wasser!', 'Trinkt viel Wasser!', 'Trinken viel Wasser!', 'Trink viel Wasser!'], correctIndex: 3, explanation: 'При Imperativ за du отпада окончанието -st и местоимението du: Trink!' },
      { id: 5, question: 'Попълнете: Wie geht es ___? — Danke, mir geht es gut.', options: ['du', 'dir', 'dich', 'dein'], correctIndex: 1, explanation: 'Изразът изисква Dativ: Wie geht es dir? — Es geht mir gut.' },
      { id: 6, question: 'Коя дума означава „корем“?', options: ['der Rücken', 'der Bauch', 'das Knie', 'die Schulter'], correctIndex: 1, explanation: 'Der Bauch — корем (der Rücken е гръб).' },
    ],
    quickQuestions: ['Как да кажа на лекар какво ме боли на немски?', 'Защо модалните глаголи нямат окончание -t в 3. лице (er muss, er kann)?', 'Как се образува повелително наклонение за du, ihr и Sie?'],
  },
  {
    ...base,
    id: 'de-a1-nature',
    monTopicIds: ids('5'),
    title: 'Немски A1: Природа и екология — сезони, време, растения, животни и домашни любимци',
    originalNoteExcerpt: 'Тематична област „Природа и екология“: сезони, време, климат; растения и животни; домашни любимци. Граматика: безлично es при метеорологични глаголи (es regnet, es schneit), предикативна употреба и степенуване на прилагателни имена.',
    summary: {
      overview:
        'Петата тема ни учи да говорим за времето навън, четирите сезона, цветята и дърветата, дивите животни и грижите за домашните любимци.',
      keyPoints: [
        'Сезони и месеци (Jahreszeiten und Monate): der Frühling — пролет, der Sommer — лято, der Herbst — есен, der Winter — зима; месеците (der Januar, der Februar, der März … der Dezember) и сезоните са от мъжки род и се употребяват с предлога im (in dem): im Sommer, im Januar.',
        'Времето (Das Wetter): Wie ist das Wetter heute? — Какво е времето днес?; Die Sonne scheint. — Слънцето грее.; Es regnet. — Вали дъжд.; Es schneit. — Вали сняг.; Es ist sonnig / bewölkt / windig / neblig / warm / heiß / kalt. — Слънчево / облачно / ветровито / мъгливо / топло / горещо / студено е. Природни явления: das Gewitter — гръмотевична буря, der Sturm — буря.',
        'Растения и животни (Pflanzen und Tiere): der Baum (die Bäume) — дърво, die Blume (die Blumen) — цвете, das Gras — трева, der Wald — гора; диви животни: der Bär — мечка, der Wolf — вълк, der Fuchs — лисица, der Hase — заек, der Vogel (die Vögel) — птица; селскостопански: die Kuh — крава, das Pferd — кон, das Schaf — овца, das Schwein — прасе.',
        'Домашни любимци (Haustiere): der Hund — куче, die Katze — котка, der Hamster, das Kaninchen — питомно зайче, der Papagei — папагал, der Fisch — рибка, die Schildkröte — костенурка; грижи: füttern — храня, mit dem Hund spazieren gehen — разхождам кучето.',
        'Граматика в темата — степенуване на прилагателните (Komparation): положителна степен (warm, kalt, groß, gut), сравнителна с -er (+ умлаут при едносрични: wärmer, kälter, größer; неправилно: gut → besser, viel → mehr) + съюза als (Der Sommer ist wärmer als der Frühling), превъзходна с am …-sten (am wärmsten, am kältesten, am größten, am besten).',
      ],
      examGoldenRule: 'При еднаквост в немския се използва so … wie (Heute ist es so warm wie gestern), а при разлика — сравнителна степен + als (Der Winter ist kälter als der Herbst).',
      commonTraps: [
        'Всички сезони и месеци в немския са от мъжки род (der Sommer, der Mai) и на въпроса Кога? (Wann?) се използват с предлога im: im Winter, im August.',
        'При сравнение след по-висока степен се пише als (wärmer als), а не wie!',
      ],
      formulasOrDates: [
        { label: 'Времето', value: 'Es regnet. / Es schneit. / Die Sonne scheint. / Es ist kalt.' },
        { label: 'Степенуване', value: 'kalt → kälter als → am kältesten; gut → besser → am besten' },
        { label: 'Сезони (+ im)', value: 'im Frühling, im Sommer, im Herbst, im Winter' },
      ],
    },
    notebookChecklist: [
      { id: 'de-a1-nature-chk-1', requirement: 'Кратък текст „Meine Lieblingsjahreszeit“ или „Mein Haustier“ (60–80 думи)', whyNeeded: 'Описването на природата, сезоните и домашните любимци е очакван резултат.', isEssentialForSix: true, suggestedNotes: 'Кой е любимият ти сезон/любимец, какво е времето, как изглежда и защо го харесваш.' },
      { id: 'de-a1-nature-chk-2', requirement: 'Таблица на степенуването на 10 основни прилагателни', whyNeeded: 'Степенуването на прилагателните в предикативна употреба е в програмата.', isEssentialForSix: false, suggestedNotes: 'warm, kalt, jung, alt, groß, klein, schön, schnell, gut, viel.' },
    ],
    flashcards: [
      { id: 'de-a1-nature-fc-1', front: 'Как се казва „Вали дъжд“ и „Вали сняг“ на немски?', back: 'Es regnet. / Es schneit.', tag: 'Време' },
      { id: 'de-a1-nature-fc-2', front: 'Как се казват четирите сезона на немски?', back: 'der Frühling, der Sommer, der Herbst, der Winter', tag: 'Сезони' },
      { id: 'de-a1-nature-fc-3', front: 'Как се степенува прилагателното gut (добър)?', back: 'gut — besser — am besten', tag: 'Граматика' },
      { id: 'de-a1-nature-fc-4', front: 'Кой съюз се използва след сравнителна степен („по-топло от…“)?', back: 'als (wärmer als)', tag: 'Граматика' },
      { id: 'de-a1-nature-fc-5', front: 'Как е „домашен любимец“ на немски (с член)?', back: 'das Haustier (мн. ч. die Haustiere)', tag: 'Животни' },
      { id: 'de-a1-nature-fc-6', front: 'Как е „дърво“ и „дървета“ на немски?', back: 'der Baum — die Bäume', tag: 'Природа' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: ___ Winter ___ es oft in den Bergen.', options: ['Im / schneit', 'Am / schneit', 'In der / regnet', 'Um / scheint'], correctIndex: 0, explanation: 'Сезоните са с предлога im (im Winter), а „вали сняг“ е es schneit.' },
      { id: 2, question: 'Попълнете сравнението: Der Sommer ist ___ ___ der Herbst.', options: ['wärmer wie', 'warm als', 'wärmer als', 'am wärmsten als'], correctIndex: 2, explanation: 'Сравнителна степен с умлаут (wärmer) + съюза als.' },
      { id: 3, question: 'Коя е превъзходната степен на прилагателното groß (голям)?', options: ['am großten', 'am größten', 'am größesten', 'größer'], correctIndex: 1, explanation: 'groß → größer → am größten.' },
      { id: 4, question: 'Кое животно е типичен домашен любимец (das Haustier)?', options: ['der Wolf', 'der Bär', 'der Fuchs', 'der Hamster'], correctIndex: 3, explanation: 'Der Hamster — хамстер (останалите са диви горски животни).' },
      { id: 5, question: 'Как се казва „Слънцето грее“ на немски?', options: ['Die Sonne scheint.', 'Es ist Sonne.', 'Die Sonne regnet.', 'Der Sonnenschein ist.'], correctIndex: 0, explanation: 'Die Sonne scheint.' },
      { id: 6, question: 'Попълнете: Ich gehe jeden Tag ___ meinem Hund im Park spazieren.', options: ['für', 'ohne', 'mit', 'um'], correctIndex: 2, explanation: 'Предлогът mit (с) + Dativ: mit meinem Hund.' },
    ],
    quickQuestions: ['Как да опиша времето днес на немски?', 'Кои прилагателни получават умлаут при степенуване?', 'Как да разкажа за домашния си любимец?'],
  },
  {
    ...base,
    id: 'de-a1-homeland-world',
    monTopicIds: ids('6'),
    title: 'Немски A1: Моята родина и светът — България и немскоезичните страни, пътуване и празници',
    originalNoteExcerpt: 'Тематична област „Моята родина и светът“: България, Германия и другите немскоезични страни — обща информация; пътуване; празници и традиции. Граматика: Präteritum на haben и sein, предлози с Dativ (aus, nach, mit, bei, zu) и с Akkusativ (für, durch, ум), редни числителни за дати.',
    summary: {
      overview:
        'Шестата тема свързва България с немскоезичния свят (D-A-CH: Германия, Австрия и Швейцария): столици, география, пътуване и любимите празници и пожелания.',
      keyPoints: [
        'България и немскоезичните страни (D-A-CH): Bulgarien (Столица: Sofia, Език: Bulgarisch); Deutschland (Berlin, Deutsch); Österreich — Австрия (Wien — Виена, Deutsch); die Schweiz — Швейцария (Bern, четири официални езика: Deutsch, Französisch, Italienisch, Rätoromanisch). Внимание: die Schweiz е от женски род и се употребява с определителен член: Ich reise in die Schweiz / Ich bin in der Schweiz.',
        'Природни обекти и посоки: das Gebirge / der Berg — планина / връх (das Rila-Gebirge, die Alpen), der Fluss — река (die Donau — Дунав), das Meer — море (das Schwarze Meer — Черно море), der See — езеро; im Norden, im Süden, im Osten, im Westen.',
        'Пътуване и транспорт (Reisen und Verkehrsmittel): reisen / fahren — пътувам, der Urlaub / die Ferien — ваканция/отпуск, der Koffer — куфар, die Fahrkarte / das Ticket — билет, das Hotel; с транспортно средство използваме mit + Dativ: mit dem Auto / Bus / Zug (с влак) / Flugzeug (със самолет), но zu Fuß (пеша). Посока към град или държава без член — с nach: Ich fahre nach Berlin / nach Österreich.',
        'Минало време (Präteritum) на sein и haben: за разказ къде сме били през ваканцията използваме ich war, du warst, er/sie/es war, wir waren, ihr wart, sie waren (от sein) и ich hatte, du hattest, er/sie/es hatte, wir hatten (от haben). Пример: Im Sommer war ich am Schwarzen Meer. Das Wetter war super und wir hatten viel Spaß.',
        'Празници, дати и пожелания (Feste und Glückwünsche): Weihnachten — Коледа, Silvester / Neujahr — Нова година, Ostern — Великден, der Geburtstag — рожден ден, der Baba-Marta-Tag (am ersten März). Пожелания: Alles Gute zum Geburtstag! / Herzlichen Glückwunsch! — Честит рожден ден!; Frohe Weihnachten! — Весела Коледа!; Frohes neues Jahr! / Guten Rutsch! — Честита Нова година!; Frohe Ostern! — Честит Великден!',
      ],
      examGoldenRule: 'За пътуване към градове и държави от среден род (без член) използвай nach (nach Sofia, nach Deutschland), а за държави с женски род като die Schweiz — in die (Ich fahre in die Schweiz).',
      commonTraps: [
        'Държавата die Schweiz (както и die Türkei, die USA в мн. ч.) винаги се употребява с член: aus der Schweiz, in der Schweiz, in die Schweiz.',
        'За транспортно средство след предлога mit винаги следва Dativ: mit dem Zug (der → dem), mit der U-Bahn (die → der).',
      ],
      formulasOrDates: [
        { label: 'D-A-CH страни и столици', value: 'Deutschland (Berlin), Österreich (Wien), die Schweiz (Bern)' },
        { label: 'Präteritum (sein / haben)', value: 'ich war, wir waren / ich hatte, wir hatten' },
        { label: 'Пожелания', value: 'Alles Gute zum Geburtstag! / Frohe Weihnachten! / Frohes neues Jahr!' },
      ],
    },
    notebookChecklist: [
      { id: 'de-a1-home-chk-1', requirement: 'Кратък текст за България или минала ваканция с war/hatte (60–80 думи)', whyNeeded: 'Представянето на родината и разказът за пътуване са част от програмата.', isEssentialForSix: true, suggestedNotes: 'Столица, море и планини, къде бях през лятото (Ich war…, Wir hatten…).' },
      { id: 'de-a1-home-chk-2', requirement: 'Поздравителна картичка за празник или рожден ден на немски', whyNeeded: 'Писането на поздравителна картичка с кратък текст е очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Liebe/Lieber…, пожелание, Viele Grüße, име.' },
    ],
    flashcards: [
      { id: 'de-a1-home-fc-1', front: 'Кои са трите основни немскоезични страни (D-A-CH) и техните столици?', back: 'Deutschland (Berlin), Österreich (Wien), die Schweiz (Bern)', tag: 'Страни' },
      { id: 'de-a1-home-fc-2', front: 'Как е „Бях в Берлин през лятото“ на немски?', back: 'Im Sommer war ich in Berlin.', tag: 'Граматика' },
      { id: 'de-a1-home-fc-3', front: 'Как се казва „Пътувам с влак“ на немски?', back: 'Ich fahre mit dem Zug.', tag: 'Пътуване' },
      { id: 'de-a1-home-fc-4', front: 'Как се пожелава „Честит рожден ден!“ на немски?', back: 'Alles Gute zum Geburtstag! / Herzlichen Glückwunsch zum Geburtstag!', tag: 'Празници' },
      { id: 'de-a1-home-fc-5', front: 'Защо казваме nach Deutschland, но in die Schweiz?', back: 'Защото die Schweiz е от женски род и се употребява с определителен член.', tag: 'Граматика' },
      { id: 'de-a1-home-fc-6', front: 'Как се пише датата „на първи март“ на немски?', back: 'am ersten März (am 1. März)', tag: 'Дати' },
    ],
    quiz: [
      { id: 1, question: 'Коя е столицата на Австрия (Österreich)?', options: ['Bern', 'München', 'Zürich', 'Wien'], correctIndex: 3, explanation: 'Столицата на Австрия е Виена (Wien); Берн е на Швейцария.' },
      { id: 2, question: 'Попълнете: Letzten Sommer ___ wir zehn Tage am Schwarzen Meer.', options: ['waren', 'hatten', 'sind', 'war'], correctIndex: 0, explanation: 'Минало време (Präteritum) на sein за wir е waren.' },
      { id: 3, question: 'Попълнете: Wir fahren im Juli ___ dem Bus ___ Wien.', options: ['mit / in', 'mit / nach', 'von / zu', 'bei / nach'], correctIndex: 1, explanation: 'Mit dem Bus (транспорт) и nach Wien (посока към град).' },
      { id: 4, question: 'Попълнете: Meine Tante wohnt in ___ Schweiz.', options: ['die', 'den', 'der', 'dem'], correctIndex: 2, explanation: 'На въпроса Wo? (Dativ) женският род die Schweiz става in der Schweiz.' },
      { id: 5, question: 'Кое пожелание се казва за Коледа?', options: ['Frohe Ostern!', 'Guten Appetit!', 'Gute Besserung!', 'Frohe Weihnachten!'], correctIndex: 3, explanation: 'Weihnachten е Коледа.' },
      { id: 6, question: 'Попълнете: Gestern ___ ich leider keine Zeit.', options: ['war', 'hatte', 'habe', 'hattest'], correctIndex: 1, explanation: 'Имах време в миналото (за ich) — ich hatte.' },
    ],
    quickQuestions: ['Кои са страните от групата D-A-CH?', 'Кога използвам war и кога hatte?', 'Как да напиша празнична картичка на немски?'],
  },
  {
    ...base,
    id: 'de-a1-skills',
    monTopicIds: ids('skills'),
    title: 'Немски A1: слушане, четене, говорене и писане — какво трябва да мога',
    originalNoteExcerpt: 'Слушане: често употребявана лексика, кратки диалози и ограничени по обем текстове при бавна и ясна реч; идентифициране на лица и тема; компенсаторни стратегии. Четене: кратки писма, покани и имейли; онагледени текстове; обяви, проспекти, реклами, менюта, разписания и указания. Говорене: диалог с несложни въпроси, желания и форми на вежливост; монолог — представяне и разказ за всекидневието. Писане: формуляр, представяне, картичка и лично писмо (60–80 думи в IX, 70–90 думи в X клас).',
    summary: {
      overview:
        'Урокът обобщава комуникативните умения за ниво A1 по програмата на МОН и дава готови фрази и стратегии за успешно справяне със задачите по слушане, четене, говорене и писане.',
      keyPoints: [
        'Слушане (Hörverstehen): на ниво A1 се търси разбиране на основната тема, участниците в разговора и конкретни данни (час, ден, цена, номер на перон, телефон). Преди записа прочети въпросите и подчертай ключовите думи; внимавай за числата, в които единиците се четат преди десетиците (24 = vierundzwanzig)!',
        'Четене (Leseverstehen): работиш с кратки имейли, покани, менюта, табели, обяви и разписания на влакове (Abfahrt — заминаване, Ankunft — пристигане, Gleis — коловоз). Не е нужно да знаеш всяка дума — търси познатите ключови думи, числата и интернационалната лексика.',
        'Говорене (Sprechen) и компенсаторни стратегии: в диалог използвай форми за учтивост (Bitte! / Danke! / Entschuldigung!). Ако не си разбрал събеседника си, помоли спокойно: Wie bitte? (Моля?), Können Sie das bitte wiederholen? (Може ли да повторите?), Sprechen Sie bitte langsamer! (Говорете по-бавно, моля!), Wie heißt das auf Deutsch? (Как се казва това на немски?).',
        'Писане (Schreiben): 1) попълване на формуляр (Familienname, Vorname, Geburtsdatum, Wohnort); 2) кратка картичка или имейл до приятел с обръщение (Liebe Anna, / Lieber Lukas,), основна част по зададените 3–4 опорни точки и завършек (Viele Grüße / Liebe Grüße, твоят подпис).',
        'Обем и проверка на писмения текст: в IX клас текстът е 60–80 думи, а в X клас — 70–90 думи. Винаги проверявай накрая три неща: 1) отговорил ли си на всички опорни точки; 2) на второ място ли е глаголът във всяко изречение; 3) с главна буква ли са написани всички съществителни.',
      ],
      examGoldenRule: 'При слушане на числа над 20 на немски първо чуваш единиците, а после десетиците (einundzwanzig = 21, fünfunddreißig = 35) — изчакай края на думата, преди да запишеш числото!',
      commonTraps: [
        'След обръщението в писмо на немски (Liebe Maria,) се слага запетая, а следващият ред започва с МАЛКА буква (освен ако първата дума е съществително или Sie)!',
        'Не бъркай Abfahrt (час на тръгване) и Ankunft (час на пристигане) в разписанията при четене и слушане.',
      ],
      formulasOrDates: [
        { label: 'Молба за повторение', value: 'Wie bitte? / Können Sie das bitte wiederholen?' },
        { label: 'Начало и край на имейл', value: 'Liebe(r)…, → Viele Grüße + име' },
        { label: 'Обем на писмен текст', value: '60–80 думи (IX клас) / 70–90 думи (X клас)' },
      ],
    },
    notebookChecklist: [
      { id: 'de-a1-skills-chk-1', requirement: 'Шаблон на лично писмо / имейл до приятел с обръщение и завършек', whyNeeded: 'Писането на кратко лично писмо по опорни точки е основна задача на ниво A1.', isEssentialForSix: true, suggestedNotes: 'Liebe/Lieber…, Wie geht es dir?, 3 опорни точки, Bis bald / Viele Grüße.' },
      { id: 'de-a1-skills-chk-2', requirement: 'Картонче с 6 компенсаторни фрази при затруднение в разговор', whyNeeded: 'Използването на компенсаторни стратегии е задължителен очакван резултат.', isEssentialForSix: false, suggestedNotes: 'Wie bitte?, Langsamer bitte!, Wie schreibt man das?…' },
    ],
    flashcards: [
      { id: 'de-a1-skills-fc-1', front: 'Какво означават Abfahrt и Ankunft на гарата?', back: 'Abfahrt — заминаване/тръгване; Ankunft — пристигане', tag: 'Четене' },
      { id: 'de-a1-skills-fc-2', front: 'Как молиш учтиво някого да повтори казаното на немски?', back: 'Wie bitte? / Können Sie das bitte wiederholen?', tag: 'Говорене' },
      { id: 'de-a1-skills-fc-3', front: 'Кое число е седемдесет и три на немски?', back: 'dreiundsiebzig (букв. три и седемдесет)', tag: 'Слушане' },
      { id: 'de-a1-skills-fc-4', front: 'Как започваш имейл до приятел на име Маркус и до приятелка на име Лаура?', back: 'Lieber Markus, / Liebe Laura,', tag: 'Писане' },
      { id: 'de-a1-skills-fc-5', front: 'С каква буква продължава текстът на новия ред след „Liebe Anna,“ в немско писмо?', back: 'С малка буква (напр. danke für deine E-Mail…), освен ако първата дума е съществително.', tag: 'Писане' },
      { id: 'de-a1-skills-fc-6', front: 'Как питаш как се спелува/изписва дадена дума на немски?', back: 'Wie schreibt man das? / Können Sie das bitte buchstabieren?', tag: 'Говорене' },
    ],
    quiz: [
      { id: 1, question: 'В аудиозапис чувате: „Der Bus fährt um vierundzwanzig Uhr.“ Кое число е vierundzwanzig?', options: ['42', '24', '14', '44'], correctIndex: 1, explanation: 'Vier (4) + und + zwanzig (20) = 24.' },
      { id: 2, question: 'На таблото на гарата търсите от кой коловоз тръгва влакът. Коя дума гледате?', options: ['Abfahrt', 'Ankunft', 'Gleis', 'Ausgang'], correctIndex: 2, explanation: 'Das Gleis — коловоз/перон.' },
      { id: 3, question: 'Кое обръщение е правилно за неофициален имейл до приятел (момче на име Ян)?', options: ['Liebe Jan,', 'Sehr geehrte Jan,', 'Hallo liebe Jan,', 'Lieber Jan,'], correctIndex: 3, explanation: 'За мъжки род в неофициално писмо се пише Lieber + име.' },
      { id: 4, question: 'Какво ще кажете, ако събеседникът ви говори твърде бързо?', options: ['Sprechen Sie bitte langsamer!', 'Sprechen Sie bitte schneller!', 'Auf Wiedersehen!', 'Ich weiß alles.'], correctIndex: 0, explanation: 'Langsamer — по-бавно.' },
      { id: 5, question: 'Какъв е препоръчителният обем на писмения текст в X клас по програмата за A1?', options: ['20–30 думи', '180–220 думи', '70–90 думи', '250–300 думи'], correctIndex: 2, explanation: 'По програмата на МОН за A1: 60–80 думи в IX клас и 70–90 думи в X клас.' },
      { id: 6, question: 'Коя дума във формуляр означава „място на раждане“?', options: ['Wohnort', 'Geburtsort', 'Vorname', 'Postleitzahl'], correctIndex: 1, explanation: 'Die Geburt (раждане) + der Ort (място) = der Geburtsort.' },
    ],
    quickQuestions: ['Как да не се обърквам при слушане на двуцифрени числа на немски?', 'Как се оформят началото и краят на имейл на немски?', 'Какво да кажа на устен изпит, ако не разбера въпроса?'],
  },
  {
    ...base,
    id: 'de-a1-grammar',
    monTopicIds: ids('grammar'),
    title: 'Немски A1: езикови знания — фонетика, граматика, правопис и лексика',
    originalNoteExcerpt: 'Граматика: глаголи в Präsens, делими глаголи, модални глаголи (sollen, müssen, mögen, wollen, können, dürfen), глаголи с предлози, Imperativ, Präteritum на haben и sein; съществително — род, число, определителен, неопределителен и отрицателен член, склонение в Nominativ, Akkusativ и Dativ, Komposita; отрицание с nein, nicht, kein; лични и притежателни местоимения в Nom., Akk., Dat.; безлично es; степенуване на прилагателни и на gern; предлози с Dativ (seit, von, aus, nach, bei, mit) и с Akkusativ (um, für, ohne, durch, gegen); изречение — Aussagesatz, W-Frage, Ja-/Nein-Frage (отговор с doch), съюзи und, aber, oder, denn.',
    summary: {
      overview:
        'Пълен справочник на граматиката за ниво A1 по програмата на МОН: падежите на членовете и местоименията, спрежението на глаголите, предлозите с Dativ и Akkusativ и железните правила на немския словоред.',
      keyPoints: [
        'Съществително и членове в трите падежа: Мъжки род (der): Nom. der / ein / kein, Akk. den / einen / keinen, Dat. dem / einem / keinem. Женски род (die): Nom. die / eine / keine, Akk. die / eine / keine, Dat. der / einer / keiner. Среден род (das): Nom. das / ein / kein, Akk. das / ein / kein, Dat. dem / einem / keinem. Множествено число (die): Nom./Akk. die / — / keine, Dat. den (+ -n на съществителното) / — / keinen.',
        'Местоимения в трите падежа (Nominativ → Akkusativ → Dativ): ich → mich → mir; du → dich → dir; er → ihn → ihm; sie (тя) → sie → ihr; es → es → ihm; wir → uns → uns; ihr → euch → euch; sie/Sie → sie/Sie → ihnen/Ihnen. Притежателни местоимения: mein, dein, sein, ihr, наш — unser, ваш — euer, техен/Ваш — ihr/Ihr (получават същите окончания като kein).',
        'Глаголи и времена: Präsens на слаби и силни глаголи; спомагателни sein, haben, werden; Präteritum на sein (war) и haben (hatte); 6 модални глагола (können, müssen, wollen, sollen, dürfen, mögen/möchte); делими глаголи (anrufen, aufstehen, einkaufen, fernsehen, mitkommen); глаголи с предлози (warten auf + Akk., denken an + Akk., sprechen über + Akk., helfen bei + Dat., teilnehmen an + Dat., einladen zu + Dat.).',
        'Предлози с фиксиран падеж: Винаги с Dativ са изброените: aus, bei, mit, nach, seit, von, zu (напр. mit dem Freund, aus der Schule, zum = zu dem Arzt). Винаги с Akkusativ са: durch, für, gegen, ohne, um (напр. für meinen Bruder, ohne dich, um den Park).',
        'Синтаксис, отрицание и отговор с doch: 1) Разказно изречение — глагол на 2. място; 2) W-Frage (Wer? Was? Wann? Wo? Wohin? Woher? Wie? Warum?) — глагол на 2. място; 3) Ja-/Nein-Frage — глагол на 1. място (Kommst du heute?). Когато въпросът съдържа отрицание (Kommst du nicht?), положителният отговор („Напротив, идвам!“) се дава с DOCH, а не с ja! Съюзите und, aber, oder, denn стоят на позиция 0 и не променят словореда.',
      ],
      examGoldenRule: 'Запомни двете мнемоники: 1) В Akkusativ се променя САМО мъжки род (der → den, ein → einen); 2) На отрицателен въпрос (Hast du keine Zeit?) се възразява положително с Doch! („Напротив, имам!“).',
      commonTraps: [
        'В Dativ множествено число не само членът става den, но и самото съществително получава окончание -n (ако още няма такова): mit den Kindern, vor den Häusern.',
        'Nicht отрича глагол, прилагателно или цялото изречение, докато kein отрича съществително с неопределителен член или без член.',
      ],
      formulasOrDates: [
        { label: 'Предлози с Dativ', value: 'aus, bei, mit, nach, seit, von, zu' },
        { label: 'Предлози с Akkusativ', value: 'durch, für, gegen, ohne, um' },
        { label: 'Лични местоимения (Nom/Akk/Dat)', value: 'ich–mich–mir, du–dich–dir, er–ihn–ihm, sie–sie–ihr' },
      ],
    },
    notebookChecklist: [
      { id: 'de-a1-gram-chk-1', requirement: 'Таблица на членовете (der/die/das/die и ein/kein) в Nominativ, Akkusativ и Dativ', whyNeeded: 'Склонението на съществителните и местоименията в трите падежа е гръбнакът на ниво A1.', isEssentialForSix: true, suggestedNotes: 'Цветова схема за промените в м.р. Akkusativ (-en) и в Dativ (-m, -r, -m, -n).' },
      { id: 'de-a1-gram-chk-2', requirement: 'Списък на предлозите с Dativ и с Akkusativ с по един пример', whyNeeded: 'Предлозите диктуват падежа във всяко второ изречение.', isEssentialForSix: false, suggestedNotes: 'aus, bei, mit, nach, seit, von, zu (+ Dat.) | durch, für, gegen, ohne, um (+ Akk.).' },
    ],
    flashcards: [
      { id: 'de-a1-gram-fc-1', front: 'Кои предлози на ниво A1 изискват ВИНАГИ Dativ?', back: 'aus, bei, mit, nach, seit, von, zu', tag: 'Предлози' },
      { id: 'de-a1-gram-fc-2', front: 'Кои предлози на ниво A1 изискват ВИНАГИ Akkusativ?', back: 'durch, für, gegen, ohne, um', tag: 'Предлози' },
      { id: 'de-a1-gram-fc-3', front: 'Как отговаряш положително („Напротив!“) на отрицателния въпрос „Sprichst du kein Deutsch?“', back: 'Doch, ich spreche Deutsch.', tag: 'Синтаксис' },
      { id: 'de-a1-gram-fc-4', front: 'Какви са формите на личното местоимение er в Akkusativ и в Dativ?', back: 'Akkusativ: ihn; Dativ: ihm', tag: 'Местоимения' },
      { id: 'de-a1-gram-fc-5', front: 'Кой предлог и падеж изисква глаголът warten (чакам някого/нещо)?', back: 'warten auf + Akkusativ (Ich warte auf den Bus.)', tag: 'Глаголи' },
      { id: 'de-a1-gram-fc-6', front: 'Как се определя родът на сложна дума (Kompositum), напр. die Hausaufgabe?', back: 'Винаги по последната съставна дума (das Haus + die Aufgabe → die Hausaufgabe).', tag: 'Съществителни' },
    ],
    quiz: [
      { id: 1, question: 'Попълнете: Das Geschenk ist für ___ Vater. (mein Vater)', options: ['mein', 'meinem', 'meinen', 'meiner'], correctIndex: 2, explanation: 'Предлогът für винаги изисква Akkusativ; мъжки род получава -en (für meinen Vater).' },
      { id: 2, question: 'Попълнете: Ich helfe ___ Mutter in der Küche.', options: ['meine', 'meiner', 'meinen', 'meinem'], correctIndex: 1, explanation: 'Глаголът helfen изисква Dativ; за женски род die → der/meiner.' },
      { id: 3, question: 'Как се отговаря на въпроса „Hast du keinen Hunger?“ ако всъщност СИ гладен?', options: ['Ja, ich habe keinen Hunger.', 'Nein, ich habe Hunger.', 'Doch, ich habe großen Hunger!', 'Nicht, ich habe Hunger.'], correctIndex: 2, explanation: 'За положително възражение на отрицателен въпрос се използва Doch!' },
      { id: 4, question: 'Какъв е родът на сложното съществително der Orangensaft / das Kinderzimmer?', options: ['Определя се от първата дума', 'Определя се винаги от последната дума', 'Винаги е среден род (das)', 'Винаги е женски род (die)'], correctIndex: 1, explanation: 'В немските Komposita последната дума определя рода и множественото число (der Saft → der Orangensaft, das Zimmer → das Kinderzimmer).' },
      { id: 5, question: 'Попълнете: Rufst du ___ heute Abend an? (ich)', options: ['mir', 'ich', 'mein', 'mich'], correctIndex: 3, explanation: 'Глаголът anrufen (обаждам се на някого) в немския изисква пряко допълнение в Akkusativ: mich.' },
      { id: 6, question: 'Кой съюз означава „защото“ и НЕ променя словореда след себе си (позиция 0)?', options: ['denn', 'aber', 'oder', 'und'], correctIndex: 0, explanation: 'Съюзът denn означава „защото“ и стои в позиция 0 (след него глаголът остава на второ място).' },
    ],
    quickQuestions: ['Как лесно да запомня предлозите с Dativ и с Akkusativ?', 'Кога отговарям с Ja и кога с Doch?', 'Защо казваме Ich rufe dich an (Akkusativ), но Ich helfe dir (Dativ)?'],
  },
];
