import type { LessonData } from '../../types';

// Немски език, ниво A2 (VIII клас, неинтензивно изучаване) — по един урок за всяка тема от учебната програма
// на МОН (https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_a2_neintensiven-2024.pdf). Обяснения на български,
// примери на немски; примерните текстове са написани за урока.

const base = { subject: 'Чужди езици (Немски, Френски, Испански)', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ne-a2-8-neint:${num}`];

export const MON_LESSONS_DE_A2_8: LessonData[] = [
  {
    ...base,
    id: 'de-a2-8-me-and-others',
    monTopicIds: ids('1'),
    title: 'Немски A2: Аз и другите — външен вид, облекло, характер, образование и интереси',
    originalNoteExcerpt:
      'Тематична област „Аз и другите“: лична информация; семейство и приятели; външен вид, облекло, характер; образование и интереси (книги, изкуства, кино, театър, медии, интернет, социални мрежи); взаимоотношения, чувства и емоции. Граматика: склонение на прилагателното име, възвратни глаголи, управление на глаголите (sich interessieren für, sich freuen auf/über).',
    summary: {
      overview:
        'На ниво A2 вече описваме подробно хората около нас — как изглеждат, какво облекло носят, какви черти на характера притежават, какви са интересите им в областта на изкуството и медиите и как изразяват чувствата си.',
      keyPoints: [
        'Външен вид (das Aussehen): groß/klein — висок/нисък, schlank — строен, sportlich — атлетичен; коса — glatte/lockige/wellige Haare (права/къдрава/чуплива коса), blonde/dunkle/rote Haare; очи — blaue/braune/grüne Augen; einen Bart tragen — нося брада, eine Brille tragen — нося очила. Въпрос: Wie sieht er/sie aus? — Как изглежда той/тя?',
        'Облекло (die Kleidung) и склонение на прилагателното: die Jeans, das T-Shirt, der Pullover, die Jacke — яке, der Mantel — палто, das Kleid — рокля, der Rock — пола, die Hose — панталон, die Turnschuhe — маратонки, die Stiefel — ботуши. В Accusativ след неопределителен член: Sie trägt einen roten Mantel, eine schwarze Jacke und ein elegantes Kleid.',
        'Характер (der Charakter): freundlich — дружелюбен, nett — мил, lustig — забавен, ehrlich — честен, schüchtern — срамежлив, faul — мързелив, fleißig — трудолюбив, klug — умен, höflich — учтив, unhöflich — неучтив, zuverlässig — надежден. Въпрос: Wie ist er/sie (als Mensch)? — Какъв/каква е по характер?',
        'Интереси, чувства и управление на глаголите: Ich interessiere mich für Kunst, Kino und Theater (für + Akk.). Ich freue mich auf die Ferien (радвам се за нещо предстоящо, auf + Akk.) / Ich freue mich über das Geschenk (радвам се за нещо получено, über + Akk.). Ich ärgere mich über den Lärm (ядосвам се за, über + Akk.).',
        'Примерен текст: Mein bester Freund heißt Lukas. Er ist groß und schlank, hat kurze dunkle Haare und braune Augen. Normalerweise trägt er eine blaue Jeans und einen grauen Pullover. Lukas ist sehr ehrlich, hilfsbereit und lustig, aber manchmal ein bisschen ungeduldig. Er interessiert sich für Fotografie und soziale Medien. Wir verstehen uns super und helfen uns immer.',
      ],
      examGoldenRule:
        'Различавай двата въпроса: Wie sieht sie aus? пита за външния вид (Sie ist groß und hat lockige Haare), а Wie ist sie? пита за характера (Sie ist freundlich und ehrlich). При sich freuen внимавай за предлога: auf + Akk. е за бъдещето, а über + Akk. — за настоящето или миналото.',
      commonTraps: [
        'Прилагателното пред съществително в мъжки род Accusativ взима окончание -en: Ich kaufe einen warmen Pullover (не ein warmer Pullover).',
        'Възвратното местоимение при ich е mich (в Akk.), а при du — dich: Ich interessiere mich für Musik; Interessierst du dich für Theater?',
      ],
      formulasOrDates: [
        { label: 'Външен вид', value: 'Wie sieht er aus? — Er ist groß und hat braune Augen.' },
        { label: 'Характер', value: 'Wie ist er? — Er ist ehrlich, fleißig und hilfsbereit.' },
        { label: 'Предлози с Akk.', value: 'sich interessieren für / sich freuen auf (бъдеще) / über (настояще)' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-8-me-chk-1',
        requirement: 'Описание на приятел — външен вид, облекло, характер и интереси (80–100 думи)',
        whyNeeded: 'Краткото описание по изучавана тема е очакван резултат за ниво A2.',
        isEssentialForSix: true,
        suggestedNotes: 'Използвай: sieht … aus, trägt einen/eine/ein…, interessiert sich für…, versteht sich gut mit…',
      },
      {
        id: 'de-a2-8-me-chk-2',
        requirement: 'Таблица на окончанията на прилагателните имена след ein/eine/ein в Nominativ и Akkusativ',
        whyNeeded: 'Нужна при всяко описание на външен вид и дрехи.',
        isEssentialForSix: true,
        suggestedNotes: 'М.р. Nom. ein neuer Hut -> Akk. einen neuen Hut; Ж.р. eine neue Tasche; Ср.р. ein neues Kleid.',
      },
    ],
    flashcards: [
      { id: 'de-a2-8-me-fc-1', front: 'Как се пита за външен вид на немски?', back: 'Wie sieht er/sie aus?', tag: 'Въпроси' },
      { id: 'de-a2-8-me-fc-2', front: 'Как е „къдрава коса“?', back: 'lockige Haare', tag: 'Външен вид' },
      { id: 'de-a2-8-me-fc-3', front: 'Как е „трудолюбив“ и „мързелив“?', back: 'fleißig / faul', tag: 'Характер' },
      { id: 'de-a2-8-me-fc-4', front: 'Как е „Интересувам се от изкуство“?', back: 'Ich interessiere mich für Kunst.', tag: 'Глаголи' },
      { id: 'de-a2-8-me-fc-5', front: 'Каква е разликата между sich freuen auf и sich freuen über?', back: 'sich freuen auf + Akk. е за предстоящо събитие; sich freuen über + Akk. е за нещо вече случило се.', tag: 'Граматика' },
      { id: 'de-a2-8-me-fc-6', front: 'Как е „Той носи синьо яке“?', back: 'Er trägt eine blaue Jacke.', tag: 'Облекло' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Отговорът „Sie ist sehr ehrlich, höflich und hilfsbereit“ отговаря на въпроса:',
        options: ['Wie sieht sie aus?', 'Was trägt sie heute?', 'Wie ist sie als Mensch?', 'Woher kommt sie?'],
        correctIndex: 2,
        explanation: 'Прилагателните ehrlich, höflich и hilfsbereit описват черти на характера.',
      },
      {
        id: 2,
        question: 'Попълнете: Heute kauft sich Lukas ___ warmen Wintermantel.',
        options: ['ein', 'eine', 'einen', 'einem'],
        correctIndex: 2,
        explanation: 'Der Mantel е мъжки род; като пряко допълнение (Akkusativ) след kaufen взима член einen.',
      },
      {
        id: 3,
        question: 'Попълнете: Wir freuen uns schon sehr ___ die Sommerferien!',
        options: ['über', 'auf', 'mit', 'von'],
        correctIndex: 1,
        explanation: 'Ваканцията предстои (schon), затова използваме sich freuen auf + Akkusativ.',
      },
      {
        id: 4,
        question: 'Коя дума означава „срамежлив“?',
        options: ['schüchtern', 'fleißig', 'lustig', 'unhöflich'],
        correctIndex: 0,
        explanation: 'Schüchtern означава срамежлив.',
      },
      {
        id: 5,
        question: 'Попълнете: Interessierst du ___ auch für Theater und Kino?',
        options: ['mich', 'sich', 'dich', 'euch'],
        correctIndex: 2,
        explanation: 'При подлог du възвратното местоимение в Akkusativ е dich.',
      },
      {
        id: 6,
        question: 'Попълнете: Meine Schwester hat lange, ___ Haare.',
        options: ['lockige', 'lockigen', 'lockiger', 'lockiges'],
        correctIndex: 0,
        explanation: 'Множествено число без член в Nominativ/Akkusativ получава окончание -e: lange, lockige Haare.',
      },
    ],
    quickQuestions: ['Как да опиша външния вид и характера на приятел?', 'Кога пишем sich freuen auf и кога sich freuen über?', 'Как се скланят прилагателните след неопределителен член?'],
  },
  {
    ...base,
    id: 'de-a2-8-world-around-me',
    monTopicIds: ids('2'),
    title: 'Немски A2: Светът около мен — моят дом, моето училище, моето населено място и пътна безопасност',
    originalNoteExcerpt:
      'Тематична област „Светът около мен“: моят дом; моето училище; моето населено място (сгради, институции, забележителности, транспорт и упътване в града, безопасност на движението). Граматика: предлози за място и посока (Wechselpräpositionen), предлози с Dativ (zu, mit, nach, bei, von, aus), степени за сравнение на прилагателните.',
    summary: {
      overview:
        'Описваме дома, обзавеждането, училището и родния град, даваме точни указания как се стига до институции и забележителности и говорим за правилата за безопасно движение.',
      keyPoints: [
        'Моят дом и позициониране на предмети: das Wohnzimmer, das Schlafzimmer, das Arbeitszimmer, der Balkon, der Keller, der Dachboden. Разлика между състояние (Wo? + Dativ) и посока (Wohin? + Akkusativ): Das Bild hängt an der Wand (Dat.) / Ich hänge das Bild an die Wand (Akk.); Der Teppich liegt auf dem Boden (Dat.) / Ich lege den Teppich auf den Boden (Akk.).',
        'Моето училище: der Stundenplan — учебна програма, das Klassenzimmer, die Mensa, die Turnhalle, das Lehrerzimmer, der Schulhof, die Arbeitsgemeinschaft (AG) — клуб по интереси, gute/schlechte Noten bekommen.',
        'Населено място и институции: das Rathaus — кметство, die Post, die Bank, das Krankenhaus — болница, die Apotheke, die Bibliothek, der Bahnhof — гара, die Haltestelle — спирка, die Sehenswürdigkeit — забележителност.',
        'Упътване в града и пътна безопасност: Wie komme ich zum Bahnhof? — Gehen Sie immer geradeaus, dann die zweite Straße links, an der Ampel (светофар) rechts. Überqueren Sie die Straße am Zebrastreifen (пешеходна пътека)! Fahren Sie auf dem Radweg (велоалея) und tragen Sie einen Helm!',
        'Сравнение на места (Komparation): groß – größer – am größten; alt – älter – am ältesten; gut – besser – am besten; viel – mehr – am meisten; gern – lieber – am liebsten. Примерен текст: Meine Heimatstadt ist kleiner als Sofia, aber viel ruhiger. Im Zentrum gibt es ein altes Theater und einen schönen Park. Zur Schule fahre ich meistens mit dem Bus oder mit dem Fahrrad auf dem Radweg.',
      ],
      examGoldenRule:
        'Глаголите stehen, liegen, sitzen, hängen (непреходен) отговарят на въпроса Wo? и изискват Dativ. Глаголите stellen, legen, setzen, hängen (преходен) изразяват движение (Wohin?) и изискват Akkusativ.',
      commonTraps: [
        'Предлогът zu винаги изисква Dativ: zum (zu + dem) Bahnhof, zur (zu + der) Schule, zur Post.',
        'Сравнителна степен с „от“ се образува с als (größer als), а еднаквост „толкова …, колкото“ се образува с so … wie (so groß wie).',
      ],
      formulasOrDates: [
        { label: 'Wo? vs. Wohin?', value: 'stehen/liegen + Dativ | stellen/legen + Akkusativ' },
        { label: 'Упътване', value: 'Wie komme ich zum/zur …? — Geradeaus, an der Ampel links.' },
        { label: 'Сравнение', value: 'so groß wie (толкова голям, колкото) | größer als (по-голям от)' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-8-world-chk-1',
        requirement: 'Двойки глаголи за покой (Wo? + Dativ) и движение (Wohin? + Akkusativ)',
        whyNeeded: 'Ключова граматична тема в програмата за ниво A2.',
        isEssentialForSix: true,
        suggestedNotes: 'stehen/stellen, liegen/legen, sitzen/setzen, hängen/hängen с по един пример.',
      },
      {
        id: 'de-a2-8-world-chk-2',
        requirement: 'Диалог за упътване в града до забележителност или институция',
        whyNeeded: 'Комуникативна задача за ориентиране в града.',
        isEssentialForSix: false,
        suggestedNotes: 'Entschuldigung, wie komme ich zur Post? — Gehen Sie…',
      },
    ],
    flashcards: [
      { id: 'de-a2-8-world-fc-1', front: 'Как е „кметство“ и „болница“?', back: 'das Rathaus / das Krankenhaus', tag: 'Град' },
      { id: 'de-a2-8-world-fc-2', front: 'Как е „пешеходна пътека“ и „светофар“?', back: 'der Zebrastreifen / die Ampel', tag: 'Безопасност' },
      { id: 'de-a2-8-world-fc-3', front: 'Попълни: Ich stelle die Lampe ___ (на масата — der Tisch).', back: 'auf den Tisch (Wohin? -> Akkusativ)', tag: 'Граматика' },
      { id: 'de-a2-8-world-fc-4', front: 'Попълни: Die Lampe steht ___ (на масата — der Tisch).', back: 'auf dem Tisch (Wo? -> Dativ)', tag: 'Граматика' },
      { id: 'de-a2-8-world-fc-5', front: 'Степени за сравнение на gut и viel?', back: 'gut – besser – am besten; viel – mehr – am meisten', tag: 'Сравнение' },
      { id: 'de-a2-8-world-fc-6', front: 'Как се пита „Как да стигна до гарата?“?', back: 'Wie komme ich zum Bahnhof?', tag: 'Упътване' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Wohin legst du das Buch? — Ich lege es ___ Schreibtisch.',
        options: ['auf dem', 'auf den', 'auf der', 'auf das'],
        correctIndex: 1,
        explanation: 'Wohin legst du…? означава движение (Akkusativ); der Schreibtisch в Akkusativ е den Schreibtisch.',
      },
      {
        id: 2,
        question: 'Попълнете: Mein Zimmer ist nicht so groß ___ das Zimmer meiner Schwester, aber es ist heller ___ ihr Zimmer.',
        options: ['als / wie', 'wie / als', 'wie / wie', 'als / als'],
        correctIndex: 1,
        explanation: 'При положителна степен (so groß) се ползва wie, а при сравнителна (heller) — als.',
      },
      {
        id: 3,
        question: 'Попълнете: Entschuldigung, wie komme ich am schnellsten ___ Apotheke?',
        options: ['zum', 'zur', 'nach', 'in'],
        correctIndex: 1,
        explanation: 'Die Apotheke е женски род; zu + der (Dativ) = zur Apotheke.',
      },
      {
        id: 4,
        question: 'Коя дума означава „велоалея“?',
        options: ['der Radweg', 'der Zebrastreifen', 'die Kreuzung', 'der Bürgersteig'],
        correctIndex: 0,
        explanation: 'Der Radweg е велоалея (der Zebrastreifen е пешеходна пътека, die Kreuzung е кръстовище).',
      },
      {
        id: 5,
        question: 'Попълнете: Das Poster hängt schon seit zwei Jahren ___ Wand.',
        options: ['an die', 'an der', 'auf die', 'in den'],
        correctIndex: 1,
        explanation: 'Глаголът hängt тук показва място (Wo?), затова die Wand е в Dativ: an der Wand.',
      },
      {
        id: 6,
        question: 'Коя е правилната сравнителна форма на прилагателното alt?',
        options: ['alter', 'älter', 'am ältesten', 'mehr alt'],
        correctIndex: 1,
        explanation: 'Едносричните прилагателни с a, o, u получават умлаут в сравнителна степен: alt -> älter.',
      },
    ],
    quickQuestions: ['Кога след на/в (auf/in/an) слагаме Dativ и кога Akkusativ?', 'Как да упътя турист на немски?', 'Как се степенуват неправилните прилагателни gut, viel и gern?'],
  },
  {
    ...base,
    id: 'de-a2-8-everyday-life',
    monTopicIds: ids('3'),
    title: 'Немски A2: Всекидневие — дневен режим, свободно време, пазаруване, общуване и професии',
    originalNoteExcerpt:
      'Тематична област „Всекидневие“: дневен режим; свободно време (хоби, спорт, музика); пазаруване и услуги; общуване (срещи, покани, поздравления, кореспонденция, разговори по телефона); професии и социални контакти. Граматика: Perfekt на правилни и неправилни глаголи, Präteritum на модалните глаголи, подчинени изречения с weil и dass.',
    summary: {
      overview:
        'Разказваме за дневния си режим и за минали събития от ежедневието, пазаруваме и ползваме услуги, отправяме покани и поздравления, водим телефонни разговори и обсъждаме професии.',
      keyPoints: [
        'Дневен режим и минали събития (Perfekt): Глаголите за движение и промяна на състоянието образуват Perfekt със sein (Ich bin früh aufgestanden und zur Schule gegangen), а останалите — с haben (Ich habe meine Hausaufgaben gemacht und Musik gehört). Модалните глаголи в разговорната реч се използват в Präteritum: Ich musste lernen; Ich konnte nicht kommen.',
        'Пазаруване и услуги (Einkaufen und Dienstleistungen): das Kaufhaus — универсален магазин, die Bäckerei, die Metzgerei — месарница, der Flohmarkt, die Post, der Friseur, die Reinigung — химическо чистене. Фрази: Kann ich Ihnen helfen? — Ich suche ein Geschenk. Kann ich das anprobieren (да премеря)? Wo ist die Umkleidekabine (пробната)? Kann ich bar oder mit Karte zahlen?',
        'Общуване — покани, телефон и кореспонденция: Ich möchte dich herzlich zu meiner Geburtstagsparty einladen! Vielen Dank für die Einladung, ich komme gern! / Leider kann ich nicht kommen, weil ich krank bin. По телефона: Hier spricht Anna. Kann ich bitte mit Leon sprechen? — Moment bitte, ich verbinde.',
        'Професии (Berufe): der Programmierer / die Programmiererin, der Arzt / die Ärztin, der Architekt, der Journalist, der Mechaniker, der Koch / die Köchin, der Verkäufer. Въпрос: Was möchtest du später werden? — Ich möchte Architektin werden, weil ich gern zeichne.',
        'Примерен текст (имейл): Liebe Mia, vielen Dank für deine E-Mail! Letztes Wochenende war super. Am Samstag bin ich mit meiner Mutter ins Einkaufszentrum gefahren und habe eine neue Jacke gekauft. Am Sonntag habe ich meinen Geburtstag gefeiert. Schade, dass du nicht kommen konntest! Hast du nächsten Freitag Zeit? Liebe Grüße, Elena.',
      ],
      examGoldenRule:
        'В подчинени изречения със съюзите weil (защото) и dass (че) спрегнатият глагол отива на последно място в изречението: Ich kann nicht kommen, weil ich für den Test lernen muss.',
      commonTraps: [
        'В Perfekt при делимите глаголи представката ge- застава между делимата представка и корена: aufstehen -> aufgestanden, einkaufen -> eingekauft.',
        'Глаголите с неделими представки (be-, ge-, er-, ver-, zer-, ent-, emp-) и глаголите на -ieren НЕ получават ge- в Partizip II: besuchen -> besucht, telefonieren -> telefoniert.',
      ],
      formulasOrDates: [
        { label: 'Perfekt', value: 'haben/sein (2. поз.) + … + Partizip II (край на изречението)' },
        { label: 'Подчинено с weil/dass', value: '…, weil ich heute keine Zeit habe. (глаголът е в края)' },
        { label: 'Пазаруване', value: 'Kann ich das anprobieren? — Wo ist die Umkleidekabine?' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-8-day-chk-1',
        requirement: 'Личен имейл за отговор на покана (приемане или отказ с причина с weil, 60–80 думи)',
        whyNeeded: 'Кратката лична кореспонденция е основна задача за писане на ниво A2.',
        isEssentialForSix: true,
        suggestedNotes: 'Liebe/Lieber…, vielen Dank für die Einladung! Ich komme gern / Leider kann ich nicht kommen, weil…',
      },
      {
        id: 'de-a2-8-day-chk-2',
        requirement: 'Списък на 20 честотни неправилни глагола в Perfekt (с haben и със sein)',
        whyNeeded: 'Задължителни при разказване на минали преживявания.',
        isEssentialForSix: true,
        suggestedNotes: 'gehen – ist gegangen, fahren – ist gefahren, bleiben – ist geblieben, sehen – hat gesehen, essen – hat gegessen.',
      },
    ],
    flashcards: [
      { id: 'de-a2-8-day-fc-1', front: 'Как е „Мога ли да премеря това?“ и „пробна“?', back: 'Kann ich das anprobieren? / die Umkleidekabine', tag: 'Пазаруване' },
      { id: 'de-a2-8-day-fc-2', front: 'Как е Partizip II на глаголите einkaufen и besuchen?', back: 'eingekauft (делим) / besucht (неделим, без ge-)', tag: 'Граматика' },
      { id: 'de-a2-8-day-fc-3', front: 'Как е Präteritum на müssen и können за 1 л. ед.ч. (ich)?', back: 'ich musste / ich konnte', tag: 'Модални глаголи' },
      { id: 'de-a2-8-day-fc-4', front: 'Къде стои глаголът след weil и dass?', back: 'На последно място в подчиненото изречение.', tag: 'Синтаксис' },
      { id: 'de-a2-8-day-fc-5', front: 'С кой спомагателен глагол образува Perfekt глаголът bleiben (оставам)?', back: 'Със sein: Ich bin zu Hause geblieben.', tag: 'Граматика' },
      { id: 'de-a2-8-day-fc-6', front: 'Как се казва „Благодаря за поканата!“?', back: 'Vielen Dank für die Einladung!', tag: 'Общуване' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Gestern ___ ich mit meinen Freunden ins Kino gegangen.',
        options: ['habe', 'bin', 'war', 'werde'],
        correctIndex: 1,
        explanation: 'Глаголът gehen означава движение и образува Perfekt със спомагателния глагол sein.',
      },
      {
        id: 2,
        question: 'Кое подчинено изречение е с правилен словоред?',
        options: [
          'Ich kaufe die Schuhe nicht, weil sie sind zu teuer.',
          'Ich kaufe die Schuhe nicht, weil zu teuer sie sind.',
          'Ich kaufe die Schuhe nicht, weil sie zu teuer sind.',
          'Ich kaufe die Schuhe nicht, weil sind sie zu teuer.',
        ],
        correctIndex: 2,
        explanation: 'След съюза weil спрегнатият глагол (sind) стои на последно място.',
      },
      {
        id: 3,
        question: 'Попълнете: Letzte Woche haben wir unsere Großeltern auf dem Land ___.',
        options: ['gebesucht', 'besuchen', 'besucht', 'besuchte'],
        correctIndex: 2,
        explanation: 'Глаголите с неделима представка be- образуват Partizip II без представка ge-: besucht.',
      },
      {
        id: 4,
        question: 'Попълнете: Warum warst du gestern nicht beim Training? — Ich ___ für den Mathetest lernen.',
        options: ['muss', 'musste', 'gemusst', 'müssen'],
        correctIndex: 1,
        explanation: 'За минало време (gestern) модалният глагол müssen се използва в Präteritum: ich musste.',
      },
      {
        id: 5,
        question: 'Какво питате в магазина с репликата „Wo ist die Umkleidekabine?“?',
        options: ['Къде е касата?', 'Къде е пробната?', 'Къде е изходът?', 'Колко струва роклята?'],
        correctIndex: 1,
        explanation: 'Die Umkleidekabine означава пробна кабина в магазин за дрехи.',
      },
      {
        id: 6,
        question: 'Попълнете: Am Sonntag ___ wir den ganzen Tag zu Hause geblieben.',
        options: ['haben', 'sind', 'waren', 'hatten'],
        correctIndex: 1,
        explanation: 'Глаголът bleiben образува Perfekt със sein: wir sind geblieben.',
      },
    ],
    quickQuestions: ['Кои глаголи образуват Perfekt със sein?', 'Как се прави изречение с weil и dass?', 'Как да напиша имейл за покана на немски?'],
  },
  {
    ...base,
    id: 'de-a2-8-health',
    monTopicIds: ids('4'),
    title: 'Немски A2: Здраве и здравословен начин на живот — тяло, хранене, спорт и при лекаря',
    originalNoteExcerpt:
      'Тематична област „Здраве и здравословен начин на живот“: човешкото тяло; здравословно хранене (хранителни продукти, кулинарни рецепти); здравословен начин на живот и спорт; здравен статус и медицинско обслужване. Граматика: модален глагол sollen за лекарски съвет, Imperativ, подчинени изречения с wenn.',
    summary: {
      overview:
        'Назоваваме частите на човешкото тяло и симптомите при заболяване, водим разговор в лекарския кабинет и аптеката, четем и пишем кулинарни рецепти и обсъждаме ролята на спорта и здравословното хранене.',
      keyPoints: [
        'Човешкото тяло и оплаквания: der Kopf, der Hals — гърло/врат, der Bauch — корем, der Rücken — гръб, der Magen — стомах, das Knie, das Ohr, der Zahn. Оплаквания: Mein Kopf tut weh / Meine Ohren tun weh; Ich habe Kopfschmerzen, Halsschmerzen, Bauchschmerzen, Zahnschmerzen, Fieber (температура), Husten (кашлица), Schnupfen (хрема), eine Erkältung (настинка).',
        'При лекаря и в аптеката (Beim Arzt / In der Apotheke): Was fehlt Ihnen? — Какво Ви има? Seit wann haben Sie die Schmerzen? — Seit gestern. Der Arzt untersucht den Patienten und verschreibt ein Rezept (изписва рецепта). Предаване на лекарски съвет със sollen: Der Arzt sagt, ich soll im Bett bleiben, viel Kräutertee trinken und dreimal täglich die Tabletten nehmen.',
        'Здравословно хранене и рецепти: die gesunde Ernährung, Vitamine, Vollkornbrot — пълнозърнест хляб, frisches Obst und Gemüse, wenig Zucker und Fast Food. Глаголи в кулинарна рецепта: schneiden — режа, schälen — беля, waschen — мия, kochen — варя, braten — пържа/пека, backen — пека, mischen — смесвам (напр. Schneide die Tomaten und die Gurke in kleine Stücke!).',
        'Здравословен начин на живот и условни изречения с wenn: Sport treiben, sich regelmäßig bewegen, genug schlafen, Stress vermeiden. С wenn (ако/когато) глаголът отива в края: Wenn man genug schläft und Sport treibt, fühlt man sich fit.',
        'Примерен текст: Letzte Woche war ich erkältet. Ich hatte starkes Fieber, Husten und Halsschmerzen, deshalb bin ich zum Arzt gegangen. Er hat mich untersucht und gesagt, dass ich drei Tage zu Hause bleiben soll. Ich musste Hustensaft nehmen und viel Tee mit Honig trinken. Jetzt geht es mir wieder gut.',
      ],
      examGoldenRule:
        'Глаголът sollen се използва за предаване на чужда препоръка или лекарско предписание: Der Arzt sagt, ich soll viel Wasser trinken (Лекарят казва, че трябва да пия много вода).',
      commonTraps: [
        'След предлога seit за период, който продължава и в момента, в немски се използва сегашно време (Präsens) + Dativ: Ich habe seit drei Tagen Fieber.',
        'Weh tun се спряга според подлога: Mein Zahn tut weh (ед.ч.), но Meine Zähne tun weh (мн.ч.).',
      ],
      formulasOrDates: [
        { label: 'При лекаря', value: 'Was fehlt Ihnen? — Ich habe Fieber und Halsschmerzen.' },
        { label: 'Лекарски съвет', value: 'Der Arzt sagt, ich soll im Bett bleiben.' },
        { label: 'Условие с wenn', value: 'Wenn du krank bist, geh zum Arzt!' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-8-health-chk-1',
        requirement: 'Диалог в лекарския кабинет (оплаквания, преглед и предписание със sollen)',
        whyNeeded: 'Практическа комуникативна ситуация от програмата по темата „Здраве“.',
        isEssentialForSix: true,
        suggestedNotes: 'Guten Tag, was fehlt Ihnen? — Seit wann…? — Sie sollen… — Gute Besserung!',
      },
      {
        id: 'de-a2-8-health-chk-2',
        requirement: 'Кратка кулинарна рецепта за здравословно ястие (5–6 стъпки в Imperativ)',
        whyNeeded: 'Кулинарните рецепти са изрично посочена подтема за ниво A2.',
        isEssentialForSix: false,
        suggestedNotes: 'Zutaten (съставки) + Zubereitung (приготвяне: Wasche…, Schneide…, Mische…).',
      },
    ],
    flashcards: [
      { id: 'de-a2-8-health-fc-1', front: 'Как пита лекарят „Какво Ви има?“?', back: 'Was fehlt Ihnen?', tag: 'При лекаря' },
      { id: 'de-a2-8-health-fc-2', front: 'Как е „кашлица“, „хрема“ и „настинка“?', back: 'der Husten / der Schnupfen / die Erkältung', tag: 'Здраве' },
      { id: 'de-a2-8-health-fc-3', front: 'Как се предава лекарски съвет „Лекарят казва да остана в леглото“?', back: 'Der Arzt sagt, ich soll im Bett bleiben.', tag: 'Граматика' },
      { id: 'de-a2-8-health-fc-4', front: 'Как е „Бързо оздравяване!“ на немски?', back: 'Gute Besserung!', tag: 'Фрази' },
      { id: 'de-a2-8-health-fc-5', front: 'Как е „беля“, „режа“ и „смесвам“ в рецепта?', back: 'schälen / schneiden / mischen', tag: 'Кулинария' },
      { id: 'de-a2-8-health-fc-6', front: 'Как е „Болят ме ушите“?', back: 'Meine Ohren tun weh.', tag: 'Тяло' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Der Arzt hat gesagt, ich ___ dreimal täglich diese Tropfen nehmen.',
        options: ['will', 'mag', 'soll', 'darf'],
        correctIndex: 2,
        explanation: 'Sollen се използва за предаване на заръка или лекарско предписание.',
      },
      {
        id: 2,
        question: 'Попълнете: Seit wann ___ du schon diese Bauchschmerzen?',
        options: ['hast', 'hattest', 'habt', 'bist'],
        correctIndex: 0,
        explanation: 'При действие, започнало в миналото и продължаващо сега, след seit се използва Präsens (du hast).',
      },
      {
        id: 3,
        question: 'Коя реплика е подходяща като пожелание към болен приятел?',
        options: ['Guten Appetit!', 'Gute Besserung!', 'Herzlichen Glückwunsch!', 'Viel Erfolg!'],
        correctIndex: 1,
        explanation: 'Gute Besserung! означава „Бързо оздравяване!“. ',
      },
      {
        id: 4,
        question: 'Попълнете: Wenn man zu viel Fast Food ___, bekommt man oft gesundheitliche Probleme.',
        options: ['esst', 'isst', 'essen', 'gegessen'],
        correctIndex: 1,
        explanation: 'В подчиненото изречение с wenn глаголът essen се спряга за 3 л. ед.ч. (man isst) и стои в края.',
      },
      {
        id: 5,
        question: 'Какво означава глаголът schälen в кулинарна рецепта (напр. Schäle die Kartoffeln!)?',
        options: ['обелвам', 'пържа', 'замразявам', 'соля'],
        correctIndex: 0,
        explanation: 'Schälen означава „беля / обелвам“ (картофи, ябълки и др.).',
      },
      {
        id: 6,
        question: 'Попълнете: Ich kann heute nicht sprechen, mein Hals ___ schrecklich weh.',
        options: ['tun', 'tust', 'tut', 'getan'],
        correctIndex: 2,
        explanation: 'Подлогът mein Hals е в 3 л. ед.ч., затова правилната форма на глагола wehtun е tut … weh.',
      },
    ],
    quickQuestions: ['Как да опиша симптомите си при лекар на немски?', 'Как се използва глаголът sollen за съвет?', 'Какви глаголи ми трябват за кулинарна рецепта?'],
  },
  {
    ...base,
    id: 'de-a2-8-nature',
    monTopicIds: ids('5'),
    title: 'Немски A2: Природа и екология — времето, климат, растения и животни, опазване на околната среда',
    originalNoteExcerpt:
      'Тематична област „Природа и екология“: времето, сезони, климат; растения, животни; географски обекти; опазване на околната среда. Граматика: безлични конструкции с es, инфинитивни конструкции с um … zu, модални глаголи.',
    summary: {
      overview:
        'Говорим за прогнозата за времето и климатичните условия, описваме животни, растения и природни пейзажи и обсъждаме как всеки от нас може да опазва околната среда.',
      keyPoints: [
        'Времето и климатът (Wetter und Klima): der Wetterbericht — прогноза за времето, das Gewitter — гръмотевична буря, es blitzt und donnert — святка и гърми, der Nebel / es ist neblig — мъгливо е, es friert — мръзне, der Sturm — буря, trocken — сух, feucht — влажен, mild — мек климат. Температура: Es sind 25 Grad über null / 5 Grad unter null (minus fünf Grad).',
        'Географски обекти (Geografische Objekte): das Gebirge — планина, der Gipfel — връх, das Tal — долина, der Fluss — река, der See — езеро, die Küste — крайбрежие, der Strand — плаж, die Insel — остров, der Wald — гора, die Wiese — ливада.',
        'Растения и животни (Pflanzen und Tiere): Домашни и селскостопански животни (der Hund, die Katze, das Pferd, die Kuh, das Schaf), диви животни (der Bär, der Wolf, der Fuchs, das Reh — сърна, der Adler — орел, der Delfin); растения (der Baum, die Blume, das Gras, die Eiche — дъб, die Kiefer — бор).',
        'Опазване на околната среда (Umweltschutz): die Umwelt schützen, den Müll trennen (разделно събиране на отпадъци: Papier, Plastik, Glas, Biomüll), Energie und Wasser sparen, das Licht ausschalten, mit dem Fahrrad oder mit öffentlichen Verkehrsmitteln fahren, Stofftaschen statt Plastiktüten benutzen.',
        'Изразяване на цел с um … zu + Infinitiv: Когато подлогът в двете части е един и същ, целта („за да“) се изразява с um … zu + инфинитив в края: Ich nehme eine Stofftasche mit, um Plastikmüll zu vermeiden. Примерен текст: Um unsere Natur zu schützen, trennen wir zu Hause den Müll. Ich fahre jeden Tag mit dem Fahrrad zur Schule und schalte immer das Licht aus, wenn ich das Zimmer verlasse.',
      ],
      examGoldenRule:
        'В конструкцията за цел um … zu + Infinitiv („за да…“) частицата zu стои непосредствено пред инфинитива в края на изречението, а при делимите глаголи се вмъква между представката и корена: um das Licht auszuschalten.',
      commonTraps: [
        'Различавай родовете на der See (езерото) и die See (морето): Wir baden im See (в езерото), но an der Nordsee (на Северно море).',
        'Конструкцията um … zu не приема отделен подлог след um — тя се ползва само когато вършителят на действието е същият като в главното изречение.',
      ],
      formulasOrDates: [
        { label: 'Прогноза за времето', value: 'Es gibt ein Gewitter — es blitzt und donnert.' },
        { label: 'Езеро vs. море', value: 'der See (езеро) | die See / das Meer (море)' },
        { label: 'Изречение за цел', value: 'Wir trennen den Müll, um die Umwelt zu schützen.' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-8-nature-chk-1',
        requirement: 'Пет правила за опазване на околната среда, формулирани с um … zu + Infinitiv',
        whyNeeded: 'Съчетава екологичната лексика с ключовата синтактична конструкция на нивото.',
        isEssentialForSix: true,
        suggestedNotes: 'Wir sparen Wasser, um… / Ich fahre mit dem Rad, um… / Wir pflanzen Bäume, um…',
      },
      {
        id: 'de-a2-8-nature-chk-2',
        requirement: 'Речник на географските обекти с определителен член и множествено число',
        whyNeeded: 'Често се използват при описание на природата и ваканциите.',
        isEssentialForSix: false,
        suggestedNotes: 'der Berg (-e), das Gebirge (-), das Tal (Täler), der Fluss (Flüsse), die Insel (-n), die Küste (-n).',
      },
    ],
    flashcards: [
      { id: 'de-a2-8-nature-fc-1', front: 'Как е „гръмотевична буря“ и „мъгливо е“?', back: 'das Gewitter / es ist neblig', tag: 'Време' },
      { id: 'de-a2-8-nature-fc-2', front: 'Каква е разликата между der See и die See?', back: 'der See е езеро; die See е море.', tag: 'География' },
      { id: 'de-a2-8-nature-fc-3', front: 'Как е „разделям отпадъците“ и „пестя енергия“?', back: 'den Müll trennen / Energie sparen', tag: 'Екология' },
      { id: 'de-a2-8-nature-fc-4', front: 'Как се превежда „за да опазим природата“?', back: 'um die Natur zu schützen', tag: 'Граматика' },
      { id: 'de-a2-8-nature-fc-5', front: 'Как образува инфинитив със zu делимият глагол ausschalten?', back: 'auszuschalten', tag: 'Граматика' },
      { id: 'de-a2-8-nature-fc-6', front: 'Как е „долина“, „остров“ и „крайбрежие“?', back: 'das Tal / die Insel / die Küste', tag: 'География' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Viele Menschen fahren mit dem Fahrrad zur Arbeit, ___ die Luft sauber zu halten.',
        options: ['damit', 'weil', 'um', 'dass'],
        correctIndex: 2,
        explanation: 'Конструкцията за цел с инфинитив със zu е um … zu + Infinitiv (um die Luft sauber zu halten).',
      },
      {
        id: 2,
        question: 'Попълнете: Vergiss nicht, das Licht ___, wenn du aus dem Zimmer gehst!',
        options: ['zu ausschalten', 'auszuschalten', 'ausschalten zu', 'ausgeschaltet'],
        correctIndex: 1,
        explanation: 'При делимите глаголи частицата zu застава между представката и корена: auszuschalten.',
      },
      {
        id: 3,
        question: 'Кое изречение описва правилно разграничението между der See и das Meer?',
        options: [
          'Der Bodensee ist ein großer See in den Alpen.',
          'Der Bodensee ist eine große See in den Alpen.',
          'Wir schwimmen im Sommer gern in die See.',
          'Das Schwarze Meer ist ein kleiner See.',
        ],
        correctIndex: 0,
        explanation: 'Боденското езеро е езеро (der See -> ein großer See).',
      },
      {
        id: 4,
        question: 'Какво означава изразът „den Müll trennen“?',
        options: ['хвърлям боклук на улицата', 'разделям отпадъците за рециклиране', 'чистя стаята си', 'купувам пластмасови торбички'],
        correctIndex: 1,
        explanation: 'Den Müll trennen означава разделно събиране на отпадъци (хартия, пластмаса, стъкло, биоотпадъци).',
      },
      {
        id: 5,
        question: 'Попълнете: Am Himmel sind dunkle Wolken, es blitzt und donnert — gleich kommt ein ___.',
        options: ['Nebel', 'Regenbogen', 'Gewitter', 'Sonnenschein'],
        correctIndex: 2,
        explanation: 'Когато святка (blitzt) и гърми (donnert), идва гръмотевична буря — ein Gewitter.',
      },
      {
        id: 6,
        question: 'Коя от изброените думи назовава диво горско животно?',
        options: ['der Fuchs', 'das Schaf', 'die Kuh', 'das Huhn'],
        correctIndex: 0,
        explanation: 'Der Fuchs (лисицата) е диво горско животно, докато останалите са селскостопански животни.',
      },
    ],
    quickQuestions: ['Как се използва конструкцията um … zu?', 'Как да говоря за опазване на околната среда на немски?', 'Как се описва прогноза за времето?'],
  },
  {
    ...base,
    id: 'de-a2-8-homeland-and-world',
    monTopicIds: ids('6'),
    title: 'Немски A2: Моята родина и светът — празници, традиции, туризъм и страните на изучавания език',
    originalNoteExcerpt:
      'Тематична област „Моята родина и светът“: празници и традиции; туризъм и пътуване; културно-исторически забележителности; принос на моята родина и страните на изучавания език към световното наследство. Граматика: предлози за посока при географски имена (nach, in, an), редно числително при дати, Futur I за планове.',
    summary: {
      overview:
        'Планираме и разказваме за пътувания и екскурзии, описваме празници, обичаи и културно-исторически забележителности в България и в немскоезичните страни (D-A-CH) и представяме техни световни постижения.',
      keyPoints: [
        'Страните на изучавания език (D-A-CH): Deutschland (столица Berlin, 16 федерални провинции — Bundesländer), Österreich (столица Wien, 9 Bundesländer), die Schweiz (столица Bern, 4 официални езика: Deutsch, Französisch, Italienisch, Rätoromanisch). Предлози за посока: Ich reise nach Deutschland / nach Österreich, но in die Schweiz (защото е с член die).',
        'Туризъм и пътуване (Reisen und Tourismus): eine Reise planen/buchen, der Koffer — куфар (den Koffer packen), die Fahrkarte (einfach / hin und zurück), der Reisepass / der Personalausweis, im Hotel / in der Jugendherberge (младежки хостел) übernachten, ein Einzelzimmer/Doppelzimmer reservieren, eine Stadtrundfahrt machen.',
        'Празници и традиции (Feste und Traditionen): в немскоезичните страни — der Advent (4 недели преди Коледа с Adventskranz и Adventskalender), der Nikolaustag (am 6. Dezember), Weihnachten, Silvester (am 31. Dezember), Ostern (Ostereier suchen), der Karneval / Fasching; в България — Баба Марта (Marteniza schenken), 24 май (Tag der bulgarischen Bildung und Kultur und der slawischen Schrift).',
        'Културно-исторически забележителности и световно наследство: В Германия — das Brandenburger Tor, der Kölner Dom, Schloss Neuschwanstein; в Австрия — Schloss Schönbrunn, Моцарт; в България — Рилският манастир (das Rila-Kloster), Старият Пловдив (die Altstadt von Plowdiw), Несебър (UNESCO-Weltkulturerbe).',
        'Примерен текст: Letzten Sommer bin ich mit meiner Familie nach Österreich gereist. Wir haben drei Tage in Wien verbracht und in einem kleinen Hotel im Zentrum übernachtet. Wir haben das Schloss Schönbrunn und den Stephansdom besichtigt. Nächstes Jahr werden wir in die Schweiz fahren, weil ich die Alpen sehen möchte.',
      ],
      examGoldenRule:
        'За посока към държави и градове без определителен член използвай nach (nach Berlin, nach Deutschland, nach Bulgarien). За държави с определителен член използвай in + Akkusativ: in die Schweiz, in die Türkei, in die USA.',
      commonTraps: [
        'Различавай глаголите besuchen (посещавам хора, училище, курс) и besichtigen (разглеждам забележителност, музей, град): Ich besuche meine Tante in Wien und besichtige das Schloss Schönbrunn.',
        'При дати след предлога am редното числително получава окончание -ten (от 1 до 19) или -sten (от 20 нагоре): am sechsten Dezember (am 6.12.), am vierundzwanzigsten Mai (am 24.05.).',
      ],
      formulasOrDates: [
        { label: 'Посока към държави', value: 'nach Deutschland / nach Österreich | in die Schweiz / in die USA' },
        { label: 'Посещавам vs. разглеждам', value: 'Freunde besuchen (хора) | Sehenswürdigkeiten besichtigen (обекти)' },
        { label: 'Дати с am', value: 'am 24. (vierundzwanzigsten) Mai; am 3. (dritten) März' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-8-world2-chk-1',
        requirement: 'Разказ или имейл за пътуване/ваканция — къде, с кого, транспорт, нощувка и забележителности (80–100 думи)',
        whyNeeded: 'Основна писмена и устна тема за ниво A2.',
        isEssentialForSix: true,
        suggestedNotes: 'Покрий 5-те въпроса: Wohin? Mit wem? Womit? Wo übernachtet? Was besichtigt?',
      },
      {
        id: 'de-a2-8-world2-chk-2',
        requirement: 'Кратко представяне на един български празник или обект на ЮНЕСКО на немски език',
        whyNeeded: 'Междукултурната компетентност за представяне на родината е очакван резултат от програмата.',
        isEssentialForSix: false,
        suggestedNotes: 'Напр. Das Rila-Kloster или Baba Marta am 1. März.',
      },
    ],
    flashcards: [
      { id: 'de-a2-8-world2-fc-1', front: 'Как е „Пътувам за Германия“ и „Пътувам за Швейцария“?', back: 'Ich reise nach Deutschland. / Ich reise in die Schweiz.', tag: 'Предлози' },
      { id: 'de-a2-8-world2-fc-2', front: 'Каква е разликата между besuchen и besichtigen?', back: 'besuchen е за хора/събития; besichtigen е за разглеждане на забележителности и музеи.', tag: 'Лексика' },
      { id: 'de-a2-8-world2-fc-3', front: 'Как е „двупосочен билет“ и „младежки хостел“?', back: 'eine Fahrkarte hin und zurück / die Jugendherberge', tag: 'Пътуване' },
      { id: 'de-a2-8-world2-fc-4', front: 'Как се чете датата „am 3. März“ на немски?', back: 'am dritten März', tag: 'Дати' },
      { id: 'de-a2-8-world2-fc-5', front: 'Как е „световно културно наследство“?', back: 'das Weltkulturerbe', tag: 'Култура' },
      { id: 'de-a2-8-world2-fc-6', front: 'Кои са четирите официални езика в Швейцария?', back: 'Deutsch, Französisch, Italienisch, Rätoromanisch', tag: 'Странознание' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: In den Sommerferien fliegt unsere Familie ___ Schweiz.',
        options: ['nach', 'in die', 'in der', 'zu der'],
        correctIndex: 1,
        explanation: 'Die Schweiz се употребява с определителен член; за посока (Wohin?) се използва in + Akkusativ -> in die Schweiz.',
      },
      {
        id: 2,
        question: 'Попълнете: In Berlin haben wir zuerst unsere Freunde ___ und danach das Brandenburger Tor ___.',
        options: ['besichtigt / besucht', 'besucht / besichtigt', 'besuchen / besichtigen', 'gebesucht / gebesichtigt'],
        correctIndex: 1,
        explanation: 'Приятели се посещават (besucht), а забележителности се разглеждат (besichtigt).',
      },
      {
        id: 3,
        question: 'Как се изписва с думи датата в изречението „Der Nationalfeiertag ist am 3. März“?',
        options: ['am drei März', 'am dreiten März', 'am dritten März', 'am drittes März'],
        correctIndex: 2,
        explanation: 'Редното числително от drei е dritte; след предлога am (an + dem, Dativ) получава окончание -n: am dritten März.',
      },
      {
        id: 4,
        question: 'Какво означава думата „die Jugendherberge“?',
        options: ['младежки хостел / хижа', 'туристическа агенция', 'железопътна гара', 'увеселителен парк'],
        correctIndex: 0,
        explanation: 'Die Jugendherberge е младежки хостел за достъпно настаняване на ученици и туристи.',
      },
      {
        id: 5,
        question: 'Кой от следните празници в немскоезичните страни се отбелязва на 31 декември?',
        options: ['Ostern', 'Pfingsten', 'Silvester', 'Nikolaustag'],
        correctIndex: 2,
        explanation: 'Новогодишната нощ на 31 декември на немски се нарича Silvester.',
      },
      {
        id: 6,
        question: 'Попълнете: Am Schalter: „Guten Tag, eine Fahrkarte nach München, bitte.“ — „Einfach oder ___?“',
        options: ['hin und her', 'hin und zurück', 'auf und ab', 'links und rechts'],
        correctIndex: 1,
        explanation: 'Стандартният израз за двупосочен билет е „hin und zurück“ (отиване и връщане).',
      },
    ],
    quickQuestions: ['Кога при пътуване казваме nach и кога in die?', 'Каква е разликата между besuchen и besichtigen?', 'Как да разкажа за ваканцията си в Perfekt?'],
  },
  {
    ...base,
    id: 'de-a2-8-skills',
    monTopicIds: ids('skills'),
    title: 'Немски A2 (VIII клас): Слушане, четене, говорене и писане — комуникативни умения',
    originalNoteExcerpt:
      'Очаквани резултати по четирите умения за ниво A2 (VIII клас, неинтензивно): разбиране на основната информация и конкретни детайли в кратки автентични текстове при слушане и четене; участие в кратък диалог, искане и даване на информация и кратко описание при говорене; писане на лично писмо/имейл, поздравителна картичка и кратко описание по опора.',
    summary: {
      overview:
        'Обобщаваме стратегиите за успешно справяне със задачите по четирите езикови умения на ниво A2 според програмата на МОН за VIII клас.',
      keyPoints: [
        'Слушане (Hörverstehen): Разбираш общия смисъл (Globalverstehen) и конкретна информация (Selektiv-/Detailverstehen — час, място, цена, причина) в съобщения на гара/летище, прогноза за времето и кратки всекидневни разговори. Стратегия: Преди слушането подчертай ключовите думи във въпросите и внимавай за синоними и отрицания (nicht, kein, leider).',
        'Четене (Leseverstehen): Ориентираш се в обяви, табели, програми, менюта, лични писма/имейли и кратки информационни статии. Умееш да определяш темата на текста и да извличаш конкретни факти (Wer? Wann? Wo? Warum?).',
        'Говорене — диалог и монолог (Sprechen): Водиш кратък разговор в стандартни ситуации (в магазин, на гарата, при лекар, уговаряне на среща), изразяваш мнение със съгласие/несъгласие (Meiner Meinung nach…, Ich finde, dass…, Da hast du recht / Das sehe ich anders) и правиш кратко описание на човек, място или преживяване.',
        'Писане (Schreiben): Създаваш кратко лично писмо или имейл (60–80 думи), поздравителна картичка или кратко описание по зададени опорни точки. Спазваш структурата: обръщение (Liebe Anna, / Lieber Paul,), въведение, отговор на всички опорни точки със свързващи думи (und, aber, oder, denn, deshalb, weil, dass, wenn), заключение и поздрав (Liebe Grüße / Viele Grüße).',
        'Примерен шаблон за личен имейл (A2): Lieber Jonas, / vielen Dank für deine nette E-Mail! Ich habe mich sehr darüber gefreut. Du fragst nach meinen Ferien. Letzte Woche bin ich mit meinen Eltern ans Schwarze Meer gefahren, weil das Wetter dort sonnig und warm war. Wir haben im Meer gebadet und eine alte Stadt besichtigt. Hast du im August Lust, mich in Bulgarien zu besuchen? Schreib mir bald! / Viele Grüße / Dein Martin.',
      ],
      examGoldenRule:
        'При писмената задача винаги проверявай дали си отговорил на ВСИЧКИ опорни точки в заданието (обикновено 3 или 4 въпроса) и дали глаголът след weil, dass и wenn е на последно място.',
      commonTraps: [
        'След обръщението в имейл на немски се пише запетая (Lieber Max,), затова първата дума на новия ред започва с МАЛКА буква (освен ако не е съществително или местоимението Sie): vielen Dank für deine Nachricht!',
        'При задачи за слушане и четене първата спомената цифра или час често е примамка (напр. „Der Zug fährt normalerweise um 14 Uhr, aber heute erst um 14:30 Uhr“).',
      ],
      formulasOrDates: [
        { label: 'Мнение', value: 'Meiner Meinung nach… | Ich finde/glaube, dass…' },
        { label: 'Начало на имейл', value: 'Liebe(r) …, vielen Dank für deine E-Mail!' },
        { label: 'Край на имейл', value: 'Schreib mir bald! Liebe/Viele Grüße, Dein(e) …' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-8-skills-chk-1',
        requirement: 'Универсална рамка за личен имейл на ниво A2 (начало, свързващи думи, край)',
        whyNeeded: 'Осигурява бързо и граматически точно писане при контролни и тестове.',
        isEssentialForSix: true,
        suggestedNotes: 'Liebe/Lieber …, vielen Dank… / Zuerst…, dann…, außerdem…, deshalb… / Viele Grüße…',
      },
      {
        id: 'de-a2-8-skills-chk-2',
        requirement: 'Фрази за изразяване на мнение, съгласие и учтиво несъгласие в диалог',
        whyNeeded: 'Необходими за устното изпитване и дискусия по двойки.',
        isEssentialForSix: true,
        suggestedNotes: 'Ich bin der Meinung, dass… / Das stimmt! / Ich bin anderer Meinung, weil…',
      },
    ],
    flashcards: [
      { id: 'de-a2-8-skills-fc-1', front: 'С главна или с малка буква започва редът след „Liebe Sofia,“ в имейл?', back: 'С малка буква (освен ако първата дума е съществително): vielen Dank für…', tag: 'Писане' },
      { id: 'de-a2-8-skills-fc-2', front: 'Как се казва „Според мен…“ на немски?', back: 'Meiner Meinung nach… (веднага след него стои глаголът на 2-ра позиция!)', tag: 'Говорене' },
      { id: 'de-a2-8-skills-fc-3', front: 'Как се изразява съгласие с партньора в диалог?', back: 'Da hast du recht! / Das stimmt! / Ich bin ganz deiner Meinung.', tag: 'Говорене' },
      { id: 'de-a2-8-skills-fc-4', front: 'Какво означава свързващата дума deshalb и какъв е словоредът след нея?', back: '„Затова“ — след deshalb веднага следва спрегнатият глагол (инверсия).', tag: 'Свързващи думи' },
      { id: 'de-a2-8-skills-fc-5', front: 'Как да помоля събеседника да повтори по-бавно?', back: 'Können Sie das bitte langsamer wiederholen?', tag: 'Комуникация' },
      { id: 'de-a2-8-skills-fc-6', front: 'Как се завършва неофициален имейл до приятел?', back: 'Liebe Grüße / Viele Grüße, Dein(e) …', tag: 'Писане' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Кое продължение след обръщението „Lieber Lukas,“ е правописно правилно според немската норма?',
        options: [
          'Vielen Dank für deine Einladung!',
          'vielen Dank für deine Einladung!',
          'vielen dank für deine einladung!',
          'Vielen dank für Deine Einladung!',
        ],
        correctIndex: 1,
        explanation: 'След запетаята на обръщението изречението продължава с малка буква (vielen), а съществителните Dank и Einladung са с главна буква.',
      },
      {
        id: 2,
        question: 'Кое изречение има правилен словоред след фразата „Meiner Meinung nach“?',
        options: [
          'Meiner Meinung nach Sport ist sehr wichtig für die Gesundheit.',
          'Meiner Meinung nach ist Sport sehr wichtig für die Gesundheit.',
          'Meiner Meinung nach Sport sehr wichtig für die Gesundheit ist.',
          'Meiner Meinung nach dass Sport sehr wichtig ist.',
        ],
        correctIndex: 1,
        explanation: 'Фразата Meiner Meinung nach заема първа позиция в главното изречение, затова на втора позиция веднага идва глаголът ist.',
      },
      {
        id: 3,
        question: 'Попълнете със свързваща дума: Es hat stark geregnet, ___ sind wir zu Hause geblieben.',
        options: ['weil', 'dass', 'deshalb', 'denn'],
        correctIndex: 2,
        explanation: 'Глаголът sind стои веднага след съюза, което е характерно за наречието deshalb (затова).',
      },
      {
        id: 4,
        question: 'Коя реплика изразява учтиво несъгласие в устен диалог?',
        options: [
          'Da hast du völlig recht!',
          'Das sehe ich ein bisschen anders, weil…',
          'Das ist eine tolle Idee!',
          'Genau so ist es!',
        ],
        correctIndex: 1,
        explanation: '„Das sehe ich ein bisschen anders, weil…“ означава „Виждам това малко по-различно, защото…“.',
      },
      {
        id: 5,
        question: 'В задача за слушане чувате: „Der Bus fährt heute nicht um 8:15 Uhr, sondern zehn Minuten später.“ В колко часа тръгва автобусът?',
        options: ['8:05 Uhr', '8:15 Uhr', '8:25 Uhr', '8:30 Uhr'],
        correctIndex: 2,
        explanation: 'Десет минути по-късно (zehn Minuten später) от 8:15 ч. е 8:25 ч.',
      },
      {
        id: 6,
        question: 'Кой поздрав е подходящ за края на имейл до близка приятелка?',
        options: ['Mit freundlichen Grüßen', 'Sehr geehrte Damen und Herren', 'Liebe Grüße', 'Hochachtungsvoll'],
        correctIndex: 2,
        explanation: 'Liebe Grüße е топъл неофициален поздрав за приятели; останалите са за официална кореспонденция.',
      },
    ],
    quickQuestions: ['Как да структурирам имейл на немски за максимален брой точки?', 'Какъв е словоредът след Meiner Meinung nach и deshalb?', 'Как да избегна капаните при задачите за слушане?'],
  },
  {
    ...base,
    id: 'de-a2-8-grammar',
    monTopicIds: ids('grammar'),
    title: 'Немски A2 (VIII клас): Езикови знания — Perfekt, Präteritum, прилагателни, предлози и сложни изречения',
    originalNoteExcerpt:
      'Граматика за ниво A2 (VIII клас, неинтензивно): склонение на прилагателните имена, степенуване; Perfekt на слаби и силни глаголи, Präteritum на sein, haben и модалните глаголи, Futur I, възвратни глаголи; предлози за място, посока и време (Wechselpräpositionen, предлози с Dativ и Akkusativ); сложни съчинени (und, aber, oder, denn, deshalb) и сложни подчинени изречения (weil, dass, wenn, um … zu).',
    summary: {
      overview:
        'Систематизираме цялата граматика за ниво A2 от програмата за VIII клас: глаголните времена за минало и бъдеще, склонението и степенуването на прилагателните, предлозите с Dativ/Akkusativ и словореда в сложните изречения.',
      keyPoints: [
        'Времена на глагола: Präsens (настояще), Perfekt (haben/sein + Partizip II за разговорно минало време), Präteritum на sein (war), haben (hatte) и модалните глаголи (konnte, musste, wollte, durfte, sollte), Futur I (werden + Infinitiv за бъдещи планове и предположения: Wir werden morgen nach Varna fahren).',
        'Склонение и степенуване на прилагателните: След определителен член (der/die/das) в Nom. ед.ч. окончанието е -e, а във всички косвени падежи и мн.ч. е -en (освен ж.р. и ср.р. Akk. = -e). След неопределителен член (ein/eine/ein) прилагателното показва рода на съществителното: ein schöner Tag (м.р. Nom.) -> einen schönen Tag (м.р. Akk.), ein schönes Buch (ср.р.).',
        'Предлози (Präpositionen): Винаги с Dativ — aus, bei, mit, nach, seit, von, zu (напр. mit dem Zug, seit einem Jahr). Винаги с Akkusativ — für, durch, gegen, ohne, um (напр. für meinen Freund, ohne dich). Двойни предлози (in, an, auf, über, unter, vor, hinter, neben, zwischen) — с Dativ при въпрос Wo? и с Akkusativ при въпрос Wohin?.',
        'Възвратни глаголи (Reflexive Verben): sich freuen, sich interessieren, sich erholen, sich treffen, sich fühlen, sich beeilen (ich freue mich, du freust dich, er/sie/es freut sich, wir freuen uns, ihr freut euch, sie/Sie freuen sich).',
        'Словоред в сложното изречение: (1) Съюзни думи на нулева позиция (und, aber, oder, denn) — не променят словореда (подлог + глагол); (2) Наречия на първа позиция (deshalb, trotzdem, dann, danach) — изискват инверсия (веднага следва глаголът); (3) Подчинителни съюзи (weil, dass, wenn, ob) — изпращат спрегнатия глагол на последно място в подчиненото изречение.',
      ],
      examGoldenRule:
        'Запомни трите вида връзки за причина и следствие: denn (0 позиция: …, denn ich bin müde), weil (глагол в края: …, weil ich müde bin) и deshalb (инверсия: Ich bin müde, deshalb gehe ich schlafen).',
      commonTraps: [
        'Когато подчиненото изречение (с wenn или weil) стои ПЪРВО, главното изречение започва веднага със спрегнатия си глагол (глагол до глагол около запетаята): Wenn das Wetter schön ist, gehen wir in den Park.',
        'Прилагателното hoch губи буквата c пред окончание: ein hoher Berg (но der Berg ist hoch), а сравнителната му степен е höher (am höchsten).',
      ],
      formulasOrDates: [
        { label: 'Трите съюза за причина/следствие', value: 'denn (подлог + глагол) | weil (… + глагол в края) | deshalb (глагол + подлог)' },
        { label: 'Предлози само с Dativ', value: 'aus, bei, mit, nach, seit, von, zu' },
        { label: 'Предлози само с Akkusativ', value: 'für, durch, gegen, ohne, um' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-8-gram-chk-1',
        requirement: 'Схема на словореда след und/aber/denn, след deshalb/dann и след weil/dass/wenn',
        whyNeeded: 'Словоредът в сложното изречение е най-важният граматичен показател за ниво A2.',
        isEssentialForSix: true,
        suggestedNotes: 'По един пример с една и съща мисъл, трансформирана с denn, weil и deshalb.',
      },
      {
        id: 'de-a2-8-gram-chk-2',
        requirement: 'Обобщена таблица на предлозите с Dativ, с Akkusativ и с двойно управление (Wo?/Wohin?)',
        whyNeeded: 'Предлозите определят падежа на члена и прилагателното във всяко изречение.',
        isEssentialForSix: true,
        suggestedNotes: 'Dativ (7) + Akkusativ (5) + Wechselpräpositionen (9).',
      },
    ],
    flashcards: [
      { id: 'de-a2-8-gram-fc-1', front: 'Изброй 7-те предлога, които винаги изискват Dativ!', back: 'aus, bei, mit, nach, seit, von, zu', tag: 'Предлози' },
      { id: 'de-a2-8-gram-fc-2', front: 'Изброй 5-те предлога, които винаги изискват Akkusativ!', back: 'für, durch, gegen, ohne, um', tag: 'Предлози' },
      { id: 'de-a2-8-gram-fc-3', front: 'Каква е разликата в словореда след denn и след weil?', back: 'След denn словоредът е прав (глагол на 2-ро място); след weil глаголът отива в края.', tag: 'Синтаксис' },
      { id: 'de-a2-8-gram-fc-4', front: 'Какво се случва, когато изречението започва с „Wenn ich Zeit habe, …“?', back: 'Главното изречение след запетаята започва веднага с глагола: „…, komme ich zu dir.“', tag: 'Синтаксис' },
      { id: 'de-a2-8-gram-fc-5', front: 'Как се образува Futur I?', back: 'Спрегната форма на werden (werde, wirst, wird…) + Infinitiv в края на изречението.', tag: 'Времена' },
      { id: 'de-a2-8-gram-fc-6', front: 'Как се променя прилагателното hoch пред съществително и в сравнителна степен?', back: 'ein hoher Turm / höher – am höchsten', tag: 'Прилагателни' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Wenn ich am Wochenende freie Zeit habe, ___ ich meine Großeltern.',
        options: ['ich besuche', 'besuche ich', 'besuchen ich', 'ich besuchen'],
        correctIndex: 1,
        explanation: 'Подчиненото изречение с wenn заема първа позиция, затова главното изречение започва със спрегнатия глагол: besuche ich.',
      },
      {
        id: 2,
        question: 'Попълнете: Ich kaufe ein Geschenk für ___ besten Freund.',
        options: ['mein', 'meinem', 'meinen', 'meiner'],
        correctIndex: 2,
        explanation: 'Предлогът für винаги изисква Akkusativ; der Freund в Akkusativ е meinen besten Freund.',
      },
      {
        id: 3,
        question: 'В кое изречение съюзът изисква прав словоред (глагол на втора позиция)?',
        options: [
          'Ich bleibe heute zu Hause, ___ ich Kopfschmerzen habe.',
          'Ich bleibe heute zu Hause, ___ habe ich Kopfschmerzen.',
          'Ich bleibe heute zu Hause, ___ ich habe starke Kopfschmerzen.',
          'Ich bleibe heute zu Hause, ___ meine Kopfschmerzen stark sind.',
        ],
        correctIndex: 2,
        explanation: 'Съюзът denn стои на нулева позиция: „…, denn ich habe starke Kopfschmerzen“.',
      },
      {
        id: 4,
        question: 'Попълнете: Mit ___ neuen Fahrrad fahre ich jeden Morgen zur Schule.',
        options: ['das', 'dem', 'den', 'der'],
        correctIndex: 1,
        explanation: 'Предлогът mit винаги изисква Dativ; das Fahrrad в Dativ е dem neuen Fahrrad.',
      },
      {
        id: 5,
        question: 'Попълнете: Nächstes Jahr ___ mein Bruder sein Studium in München beginnen.',
        options: ['wird', 'werdet', 'wurde', 'ist'],
        correctIndex: 0,
        explanation: 'Futur I за 3 л. ед.ч. (mein Bruder) се образува с wird + Infinitiv (beginnen).',
      },
      {
        id: 6,
        question: 'Коя форма на прилагателното hoch е правилна в изречението „Der Мусала ist ein ___ Berg“?',
        options: ['hocher', 'hoher', 'höher', 'hohes'],
        correctIndex: 1,
        explanation: 'Пред окончание за род/падеж прилагателното hoch губи съгласната c: ein hoher Berg.',
      },
    ],
    quickQuestions: ['Кога използваме denn, кога weil и кога deshalb?', 'Кои предлози са винаги с Dativ и кои винаги с Akkusativ?', 'Как се променя словоредът, когато изречението започва с Wenn…?'],
  },
];
