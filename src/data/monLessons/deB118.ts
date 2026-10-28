import type { LessonData } from '../../types';

// Немски език, ниво B1.1 (VIII клас, интензивно изучаване) — по един урок за всяка тема от учебната програма
// на МОН (https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_b1.1_intensiven-2024.pdf). Обяснения на български,
// примери на немски; примерните текстове са написани за урока.

const base = { subject: 'Чужди езици (Немски, Френски, Испански)', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ne-b1.1-8-int:${num}`];

export const MON_LESSONS_DE_B11_8: LessonData[] = [
  {
    ...base,
    id: 'de-b11-8-me-and-others',
    monTopicIds: ids('1'),
    title: 'Немски B1.1 (VIII, интензивно): Аз и другите — личност, приятелство, характер и емоции',
    originalNoteExcerpt:
      'Тематична област „Аз и другите“: лична информация; семейство и роднински връзки; приятели и приятелство; външен вид, облекло и характер; образование и интереси; взаимоотношения, чувства и емоции. Граматика: n-склонение на съществителните (der Junge, der Nachbar, der Kollege), управление на глаголите и местоименни наречия (worauf/darauf, mit wem/damit), пълно склонение на прилагателните.',
    summary: {
      overview:
        'В интензивния осми клас достигаме ниво B1.1: описваме задълбочено личността, динамиката на семейните и приятелските отношения, конфликтите и помирението, като използваме богата емоционална лексика и глаголи с предложно управление.',
      keyPoints: [
        'Семейство и приятелство (Familie und Freundschaft): das Einzelkind — единствено дете, die Zwillinge — близнаци, die Verwandten — роднините; Freundschaften schließen — завързвам приятелства, ein enger Freund — близък приятел, in Kontakt bleiben — поддържам връзка, sich streiten (um/über + Akk.) — карам се, sich versöhnen — сдобрявам се, sich verlassen auf (+ Akk.) — разчитам на някого, viel gemeinsam haben — имаме много общо.',
        'Характер с антоними и словообразуване: großzügig / geizig — щедър / стиснат, aufgeschlossen / verschlossen — отворен / затворен, geduldig / ungeduldig — търпелив / нетърпелив, zuverlässig / unzuverlässig — надежден / ненадежден, selbstbewusst / unsicher — самоуверен / несигурен, ehrgeizig — амбициозен, einfühlsam — съпричастен.',
        'Емоции и състояния: begeistert — въодушевен, enttäuscht (von + Dat.) — разочарован от, erleichtert — облекчен, besorgt (um + Akk.) — загрижен за, eifersüchtig (auf + Akk.) — ревнив/завистлив към, wütend (auf + Akk.) — ядосан на.',
        'Слабо склонение (n-Deklination) и местоименни наречия: Съществителни от м.р. за одушевени лица като der Junge, der Nachbar, der Kollege, der Mensch, der Student, der Tourist получават окончание -n/-en във всички падежи освен Nominativ ед.ч. (Ich helfe meinem neuen Nachbarn; Ich kenne diesen Jungen). При глаголи с предлог за предмети питаме с wo(r)- (Worauf freust du dich? — Darauf, dass…), а за лица — с предлог + въпросително местоимение (Auf wen verlässt du dich? — Auf meinen besten Freund).',
        'Примерен текст: Mein engster Freund heißt Daniel. Wir kennen uns seit der Grundschule und haben sehr viel gemeinsam. Daniel ist aufgeschlossen, großzügig und äußerst zuverlässig — ein Mensch, auf den ich mich in jeder Situation verlassen kann. Manchmal ist er etwas ungeduldig, weshalb wir uns ab und zu über Kleinigkeiten streiten, aber wir versöhnen uns immer schnell wieder.',
      ],
      examGoldenRule:
        'Разграничавай лица от предмети при глаголите с предлози: за неодушевени неща се използват местоименните наречия worüber/darüber, worauf/darauf, а за хора — предлог + местоимение (Über wen sprichst du? — Über meinen neuen Mitschüler).',
      commonTraps: [
        'Съществителните от n-Deklination взимат -n/-en не само в Akkusativ, но и в Dativ и Genitiv ед.ч.: das Haus unseres Nachbarn, mit dem jungen Studenten.',
        'Не бъркай прилагателните sensibel (чувствителен, раним) и vernünftig (разумен — англ. sensible е „фалшив приятел“!).',
      ],
      formulasOrDates: [
        { label: 'Приятелство', value: 'sich auf jdn. verlassen | sich streiten | sich versöhnen' },
        { label: 'n-склонение', value: 'der Junge / Nachbar / Mensch -> den/dem/des Jungen, Nachbarn, Menschen' },
        { label: 'Обем на текста (B1.1)', value: '150–170 думи (лично писмо, разказ или описание)' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-8-me-chk-1',
        requirement: 'Характеристика на близък човек с примери за поведението му (150–170 думи)',
        whyNeeded: 'Описанието с изразяване на лично отношение и обем 150–170 думи е очакван резултат за B1.1.',
        isEssentialForSix: true,
        suggestedNotes: 'Външност, поне 4 черти на характера с доказателства, общо преживяване, защо цениш приятелството.',
      },
      {
        id: 'de-b11-8-me-chk-2',
        requirement: 'Таблица на глаголите за взаимоотношения с техните предлози и падежи',
        whyNeeded: 'Управлението на глаголите (Rektion der Verben) е ключова граматична тема за B1.1.',
        isEssentialForSix: true,
        suggestedNotes: 'sich verlassen auf (+ Akk.), sich streiten mit (+ Dat.) über (+ Akk.), sich entschuldigen bei (+ Dat.) für (+ Akk.).',
      },
    ],
    flashcards: [
      { id: 'de-b11-8-me-fc-1', front: 'Как е „разчитам на някого“ и „сдобрявам се“?', back: 'sich auf jemanden verlassen (Akk.) / sich versöhnen', tag: 'Приятелство' },
      { id: 'de-b11-8-me-fc-2', front: 'Как е „щедър / стиснат“ и „самоуверен“?', back: 'großzügig / geizig; selbstbewusst', tag: 'Характер' },
      { id: 'de-b11-8-me-fc-3', front: 'Какво означава немското прилагателно sensibel?', back: 'Чувствителен, емоционално раним (а „разумен“ е vernünftig!).', tag: 'Капани' },
      { id: 'de-b11-8-me-fc-4', front: 'Как се променя der Junge и der Nachbar в Akkusativ и Dativ ед.ч.?', back: 'den/dem Jungen; den/dem Nachbarn (n-склонение).', tag: 'Граматика' },
      { id: 'de-b11-8-me-fc-5', front: 'Как питаме „За какво се радваш?“ и „На кого се радваш / кого очакваш?“?', back: 'Worauf freust du dich? (предмет/събитие) / Auf wen freust du dich? (човек)', tag: 'Граматика' },
      { id: 'de-b11-8-me-fc-6', front: 'Как е „разочарован от“ и „облекчен“?', back: 'enttäuscht von (+ Dat.) / erleichtert', tag: 'Емоции' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Kennst du schon ___ neuen Jungen aus unserer Parallelklasse?',
        options: ['der', 'dem', 'den', 'des'],
        correctIndex: 2,
        explanation: 'След глагола kennen (Akkusativ) съществителното от n-склонение der Junge става den neuen Jungen.',
      },
      {
        id: 2,
        question: 'Попълнете въпроса за човек: ___ hast du dich gestern so lange unterhalten? — Mit meiner Cousine.',
        options: ['Womit', 'Mit wem', 'Worüber', 'Wen'],
        correctIndex: 1,
        explanation: 'За лица след предлога mit (Dativ) въпросът е Mit wem? (а не Womit?, което е за предмети).',
      },
      {
        id: 3,
        question: 'Попълнете: Auf meinen besten Freund kann ich mich immer ___.',
        options: ['verlassen', 'versöhnen', 'verlieben', 'verstehen'],
        correctIndex: 0,
        explanation: 'Sich auf jemanden verlassen означава „разчитам на някого“.',
      },
      {
        id: 4,
        question: 'Коя дума е антоним на прилагателното „großzügig“ (щедър)?',
        options: ['geizig', 'geduldig', 'ehrlich', 'aufgeschlossen'],
        correctIndex: 0,
        explanation: 'Geizig означава стиснат / скъперник — противоположното на großzügig.',
      },
      {
        id: 5,
        question: 'Попълнете: Ich muss mich ___ meiner Mutter ___ die Verspätung entschuldigen.',
        options: ['für / bei', 'bei / für', 'mit / über', 'an / auf'],
        correctIndex: 1,
        explanation: 'Изразът е sich entschuldigen bei (+ Dat. — пред кого) für (+ Akk. — за какво).',
      },
      {
        id: 6,
        question: 'Попълнете: Unser ___ Nachbar hat uns gestern beim Umzug geholfen.',
        options: ['neue', 'neuer', 'neuen', 'neuem'],
        correctIndex: 1,
        explanation: 'След притежателното местоимение unser в Nominativ м.р. прилагателното взима окончание -er: unser neuer Nachbar.',
      },
    ],
    quickQuestions: ['Кои съществителни се скланят по n-Deklination?', 'Кога питаме с Worauf? и кога с Auf wen?', 'Как да напиша богата характеристика на приятел на ниво B1.1?'],
  },
  {
    ...base,
    id: 'de-b11-8-world-around-me',
    monTopicIds: ids('2'),
    title: 'Немски B1.1 (VIII, интензивно): Светът около мен — дом, училищна общност, град и мобилност',
    originalNoteExcerpt:
      'Тематична област „Светът около мен“: моят дом; моето училище; моето населено място (сгради, институции, забележителности, транспорт, ориентиране, безопасност на движението). Граматика: относителни изречения във всички падежи и с предлози, локални предлози, Konjunktiv II за желания и препоръки (ich würde, ich hätte, es wäre).',
    summary: {
      overview:
        'Сравняваме живота в големия град и в провинцията, описваме мечтания дом и училищната общност и обсъждаме градската мобилност и пътната безопасност с помощта на относителни изречения и Konjunktiv II.',
      keyPoints: [
        'Дом и жилищна среда (Wohnen und Umgebung): das Einfamilienhaus, das Mehrfamilienhaus, der Wohnblock, das Dachgeschoss, die Terrasse; gemütlich eingerichtet — уютно обзаведен, geräumig — просторен, hell; die Hausordnung einhalten — спазвам правилника на етажната собственост, die Hausarbeit teilen (staubsaugen, aufräumen, den Müll herunterbringen, bügeln).',
        'Училищен живот и правила: die Schulordnung — училищен правилник, das Pflichtfach / das Wahlfach — задължителен / избираем предмет, an einem Schüleraustausch teilnehmen — участвам в ученически обмен, der Klassensprecher — отговорник на класа, eine Arbeitsgemeinschaft (AG) leiten.',
        'Град срещу село и мобилност: die Großstadt / das Dorf / der Vorort; Vorteile und Nachteile (gute Infrastruktur, kulturelles Angebot, öffentliche Verkehrsmittel <-> Stau — задръстване, Lärm, Abgase, hohe Mieten). Безопасност: der Fußgängerüberweg, die Verkehrszeichen beachten, Vorfahrt haben — имам предимство, der Sicherheitsgurt.',
        'Относителни изречения в Dativ и с предлози: В Dativ формите на относителните местоимения са dem (м./ср.р.), der (ж.р.) и denen (мн.ч.): Das ist das Viertel, in dem ich aufgewachsen bin. Das sind die Nachbarn, mit denen wir uns gut verstehen. За място може да се ползва и wo / wohin: die Stadt, wo ich wohne.',
        'Мечти и препоръки с Konjunktiv II: Ich hätte gern ein größeres Zimmer mit Balkon. Es wäre toll, wenn es in unserer Stadt mehr Radwege gäbe! An deiner Stelle würde ich mit der U-Bahn fahren. Примерен текст: Ich wohne in einer lebhaften Großstadt, in der es viele Parks, Kinos und Sportzentren gibt. Trotzdem gibt es morgens oft Staus. Es wäre viel besser, wenn mehr Menschen die öffentlichen Verkehrsmittel oder das Fahrrad benutzen würden.',
      ],
      examGoldenRule:
        'В относително изречение за множествено число в Dativ местоимението е ВИНАГИ denen (а не den!): die Freunde, mit denen ich zur Schule gehe.',
      commonTraps: [
        'Предлогът пред относителното местоимение никога не отпада и определя неговия падеж: das Haus, in dem (Wo? -> Dativ) ich wohne; но das Haus, in das (Wohin? -> Akkusativ) wir einziehen.',
        'Konjunktiv II на es gibt (има) е es gäbe: Wenn es hier mehr Grünflächen gäbe, wäre die Luft sauberer.',
      ],
      formulasOrDates: [
        { label: 'Относителни местоимения (Dat.)', value: 'dem (м./ср.р.), der (ж.р.), denen (мн.ч.)' },
        { label: 'Съвет с Konjunktiv II', value: 'An deiner Stelle würde ich … (+ Infinitiv)' },
        { label: 'Желание с Konjunktiv II', value: 'Ich hätte gern … / Es wäre schön, wenn …' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-8-world-chk-1',
        requirement: 'Текст за предимствата и недостатъците на живота в града и на село (150–170 думи)',
        whyNeeded: 'Развива умението за съпоставка и аргументирано мнение на ниво B1.1.',
        isEssentialForSix: true,
        suggestedNotes: 'Einerseits… andererseits…, im Vergleich zu (+ Dat.), относителни изречения с in dem / in der.',
      },
      {
        id: 'de-b11-8-world-chk-2',
        requirement: 'Таблица на относителните местоимения в Nominativ, Akkusativ и Dativ',
        whyNeeded: 'Задължителна за правилно свързване на сложни изречения.',
        isEssentialForSix: true,
        suggestedNotes: 'М.р. der/den/dem; Ж.р. die/die/der; Ср.р. das/das/dem; Мн.ч. die/die/denen.',
      },
    ],
    flashcards: [
      { id: 'de-b11-8-world-fc-1', front: 'Как е „ученически обмен“ и „задължителен / избираем предмет“?', back: 'der Schüleraustausch / das Pflichtfach / das Wahlfach', tag: 'Училище' },
      { id: 'de-b11-8-world-fc-2', front: 'Как е „задръстване“, „изгорелите газове“ и „предградие“?', back: 'der Stau / die Abgase / der Vorort', tag: 'Град' },
      { id: 'de-b11-8-world-fc-3', front: 'Кое е относителното местоимение за множествено число в Dativ?', back: 'denen (напр. die Mitschüler, mit denen ich lerne).', tag: 'Граматика' },
      { id: 'de-b11-8-world-fc-4', front: 'Как се казва „На твое място бих…“ на немски?', back: 'An deiner Stelle würde ich … (+ Infinitiv в края)', tag: 'Konjunktiv II' },
      { id: 'de-b11-8-world-fc-5', front: 'Как е „уютно обзаведен“ и „просторен“?', back: 'gemütlich eingerichtet / geräumig', tag: 'Дом' },
      { id: 'de-b11-8-world-fc-6', front: 'Как е Konjunktiv II на глаголите sein, haben и на израза es gibt?', back: 'wäre / hätte / es gäbe', tag: 'Граматика' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Das sind die Mitschüler, mit ___ ich zusammen an dem neuen Schulprojekt arbeite.',
        options: ['die', 'den', 'denen', 'deren'],
        correctIndex: 2,
        explanation: 'Предлогът mit изисква Dativ; относителното местоимение за мн.ч. в Dativ е denen.',
      },
      {
        id: 2,
        question: 'Попълнете: Das Gymnasium, ___ mein Bruder geht, liegt direkt neben dem Stadtpark.',
        options: ['in dem', 'auf das', 'an der', 'zu denen'],
        correctIndex: 1,
        explanation: 'Глаголът gehen изразява посока (Wohin? -> Akkusativ): auf das Gymnasium gehen.',
      },
      {
        id: 3,
        question: 'Попълнете с Konjunktiv II: Es ___ wunderbar, wenn es in unserem Viertel weniger Verkehr ___!',
        options: ['ist / gibt', 'war / gab', 'wäre / gäbe', 'würde / hätte'],
        correctIndex: 2,
        explanation: 'За нереално желание в настоящето се използва Konjunktiv II: es wäre wunderbar, wenn es … gäbe.',
      },
      {
        id: 4,
        question: 'Какво означава фразата „die Hausordnung einhalten“?',
        options: [
          'спазвам правилника за вътрешния ред в жилищната сграда',
          'строя нова къща на село',
          'купувам мебели за дневната',
          'премествам се в друг град',
        ],
        correctIndex: 0,
        explanation: 'Die Hausordnung е правилникът на сградата (напр. часове за тишина), а einhalten означава „спазвам“.',
      },
      {
        id: 5,
        question: 'Попълнете съвета: An deiner Stelle ___ ich jeden Morgen mit dem Fahrrad zur Schule fahren.',
        options: ['werde', 'würde', 'wurde', 'war'],
        correctIndex: 1,
        explanation: 'За съвет след An deiner Stelle се използва Konjunktiv II: würde + Infinitiv (fahren).',
      },
      {
        id: 6,
        question: 'Коя дума означава „задръстване по пътищата“?',
        options: ['der Stau', 'der Bürgersteig', 'der Fahrplan', 'der Vorort'],
        correctIndex: 0,
        explanation: 'Der Stau (мн.ч. die Staus) означава автомобилно задръстване.',
      },
    ],
    quickQuestions: ['Как се образуват относителни изречения с предлози?', 'Как да дам съвет с An deiner Stelle würde ich…?', 'Как да сравня живота в града и на село?'],
  },
  {
    ...base,
    id: 'de-b11-8-everyday-life',
    monTopicIds: ids('3'),
    title: 'Немски B1.1 (VIII, интензивно): Всекидневие — свободно време, дигитално общуване, услуги и професии',
    originalNoteExcerpt:
      'Тематична област „Всекидневие“: дневен режим; свободно време (хоби, спорт, музика); пазаруване и услуги; общуване (срещи, покани, поздравления, кореспонденция, разговори по телефона); професии и социални контакти. Граматика: времеви подчинени изречения (während, bevor, nachdem, seitdem, bis), Plusquamperfekt, инфинитив със и без zu.',
    summary: {
      overview:
        'Разказваме за последователност от събития във всекидневието с времеви съюзи и Plusquamperfekt, обсъждаме разумното пазаруване, ползването на услуги, дигиталното общуване и бъдещите професии.',
      keyPoints: [
        'Последователност в ежедневието (Temporalsätze): während — докато (едновременност), bevor — преди да, nachdem — след като (предходност!), seitdem / seit — откакто, bis — докато (краен момент), sobald — веднага щом. Пример: Bevor ich zur Schule gehe, frühstücke ich. Nachdem ich meine Hausaufgaben gemacht hatte, traf ich meine Freunde.',
        'Предходност с Plusquamperfekt: Образува се с Präteritum на haben/sein (hatte / war) + Partizip II. Използва се след съюза nachdem, когато главното изречение е в минало време (Präteritum или Perfekt): Nachdem der Film begonnen hatte, kamen wir im Kino an.',
        'Пазаруване, потребление и услуги: das Preis-Leistungs-Verhältnis — съотношение цена-качество, ein Schnäppchen machen — купувам нещо много изгодно, das Taschengeld sparen oder ausgeben, etwas zur Reparatur bringen, beim Kundenservice anrufen, sich über eine verspätete Lieferung beschweren.',
        'Свободно време и инфинитивни конструкции: Глаголи, след които употребяваме zu + Infinitiv: versuchen, beginnen, aufhören, vergessen, versprechen, vorhaben (планирам), Lust/Zeit haben: Ich habe vor, am Wochenende ein Konzert zu besuchen. Глаголи БЕЗ zu: модалните глаголи, gehen, bleiben, sehen, hören, lernen, helfen (Ich gehe schwimmen; Ich höre sie singen).',
        'Примерен текст: Seitdem ich in der achten Klasse intensiv Deutsch lerne, teile ich mir meine Freizeit viel besser ein. Jeden Nachmittag versuche ich, zuerst alle Hausaufgaben zu erledigen, bevor ich mein Handy benutze. Gestern bin ich mit meiner Schwester ins Sportzentrum gegangen, nachdem wir für den Vokabeltest gelernt hatten.',
      ],
      examGoldenRule:
        'След съюза nachdem винаги спазвай смяната на времената (Zeitenfolge): ако главното изречение е в минало време (Präteritum/Perfekt), в подчиненото с nachdem се използва Plusquamperfekt (hatte/war + Partizip II).',
      commonTraps: [
        'Не бъркай предлога vor (+ Dat.: vor dem Unterricht — преди часа) със съюза bevor (+ подчинено изречение с глагол в края: bevor der Unterricht beginnt).',
        'По същия начин различавай предлога nach (+ Dat.: nach dem Essen) от съюза nachdem (+ подчинено изречение: nachdem wir gegessen hatten).',
      ],
      formulasOrDates: [
        { label: 'Plusquamperfekt', value: 'hatte / war + … + Partizip II (за действие преди друго минало действие)' },
        { label: 'Предлог срещу съюз', value: 'vor dem Essen <-> bevor wir essen | nach dem Unterricht <-> nachdem der Unterricht geendet hatte' },
        { label: 'Планирам да…', value: 'Ich habe vor, … zu + Infinitiv' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-8-day-chk-1',
        requirement: 'Таблица „Предлог (mit Dativ) срещу Подчинителен съюз (с глагол в края)“ за време',
        whyNeeded: 'Една от най-честите тестови задачи на ниво B1.1.',
        isEssentialForSix: true,
        suggestedNotes: 'vor <-> bevor; nach <-> nachdem; während (+ Gen./Dat.) <-> während (съюз); seit <-> seitdem; bis <-> bis.',
      },
      {
        id: 'de-b11-8-day-chk-2',
        requirement: 'Списък на глаголите и изразите с инфинитив със zu и без zu',
        whyNeeded: 'За правилно построяване на изречения за намерения и навици.',
        isEssentialForSix: true,
        suggestedNotes: 'Със zu: vorhaben, versuchen, vergessen, versprechen, Lust/Zeit haben; без zu: модални, gehen, lernen, hören, sehen.',
      },
    ],
    flashcards: [
      { id: 'de-b11-8-day-fc-1', front: 'Каква е разликата между nach и nachdem?', back: 'nach е предлог с Dativ (nach der Schule); nachdem е съюз за подчинено изречение с глагол в края.', tag: 'Граматика' },
      { id: 'de-b11-8-day-fc-2', front: 'Как се образува Plusquamperfekt?', back: 'hatte / war + Partizip II в края на изречението.', tag: 'Времена' },
      { id: 'de-b11-8-day-fc-3', front: 'Как се превежда „Възнамерявам да направя езиков курс“ с глагола vorhaben?', back: 'Ich habe vor, einen Sprachkurs zu machen.', tag: 'Инфинитив със zu' },
      { id: 'de-b11-8-day-fc-4', front: 'След кои глаголи инфинитивът се употребява БЕЗ частицата zu?', back: 'След модалните глаголи, werden, gehen, fahren, bleiben, sehen, hören, lernen.', tag: 'Граматика' },
      { id: 'de-b11-8-day-fc-5', front: 'Какво означава изразът „ein Schnäppchen machen“?', back: 'Купувам нещо на много изгодна цена (на промоция/разпродажба).', tag: 'Пазаруване' },
      { id: 'de-b11-8-day-fc-6', front: 'Какво означава съюзът während?', back: '1) Докато (едновременност); 2) Докато / за разлика от (противопоставяне).', tag: 'Съюзи' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Nachdem ich meine E-Mails ___ ___, schaltete ich den Laptop aus.',
        options: ['lese / habe', 'gelesen / hatte', 'gelesen / bin', 'las / werde'],
        correctIndex: 1,
        explanation: 'Главното изречение е в Präteritum (schaltete aus), затова след nachdem за предходност използваме Plusquamperfekt: gelesen hatte.',
      },
      {
        id: 2,
        question: 'Попълнете: ___ du das Haus verlässt, musst du alle Fenster schließen!',
        options: ['Vor', 'Bevor', 'Nach', 'Seit'],
        correctIndex: 1,
        explanation: 'Следва цяло подчинено изречение с подлог и глагол в края (du … verlässt), затова е нужен съюзът Bevor (а не предлогът Vor).',
      },
      {
        id: 3,
        question: 'В кое изречение НЕ се поставя частицата zu пред инфинитива?',
        options: [
          'Ich habe heute leider keine Zeit, mit dir ins Café ___ gehen.',
          'Mein Bruder hat vergessen, das Brot ___ kaufen.',
          'Am Nachmittag gehe ich mit meinen Freunden im Park ___ joggen.',
          'Wir versuchen, jeden Tag zwanzig neue Wörter ___ lernen.',
        ],
        correctIndex: 2,
        explanation: 'След глагола gehen инфинитивът се употребява без частицата zu: Ich gehe joggen.',
      },
      {
        id: 4,
        question: 'Попълнете: ___ wir vor zwei Jahren in diese Stadt gezogen sind, habe ich viele neue Freunde gefunden.',
        options: ['Seitdem', 'Bevor', 'Bis', 'Damit'],
        correctIndex: 0,
        explanation: 'За действие, започнало в миналото и имащо резултат до днес („откакто се преместихме“), се използва съюзът seitdem.',
      },
      {
        id: 5,
        question: 'Попълнете: Ich habe fest ___, in den Sommerferien einen Ferienjob zu finden.',
        options: ['vor', 'an', 'auf', 'mit'],
        correctIndex: 0,
        explanation: 'Делимият глагол е vorhaben (etwas vorhaben — възнамерявам, планирам).',
      },
      {
        id: 6,
        question: 'Какво означава съчетанието „das Preis-Leistungs-Verhältnis“?',
        options: [
          'съотношението между цена и качество',
          'работното време на магазина',
          'размерът на месечната заплата',
          'срокът за връщане на покупка',
        ],
        correctIndex: 0,
        explanation: 'Der Preis (цена) + die Leistung (качество/услуга) + das Verhältnis (съотношение).',
      },
    ],
    quickQuestions: ['Кога използваме Plusquamperfekt в немски?', 'Как да различа предлозите vor/nach от съюзите bevor/nachdem?', 'Кои глаголи изискват инфинитив със zu и кои без zu?'],
  },
  {
    ...base,
    id: 'de-b11-8-health',
    monTopicIds: ids('4'),
    title: 'Немски B1.1 (VIII, интензивно): Здраве и здравословен начин на живот — хранене, спорт и медицина',
    originalNoteExcerpt:
      'Тематична област „Здраве и здравословен начин на живот“: човешкото тяло; здравословно хранене (хранителни продукти, кулинарни рецепти); здравословен начин на живот и спорт; здравен статус и медицинско обслужване. Граматика: отстъпителни изречения с obwohl и trotzdem, предлог trotz (+ Gen./Dat.), страдателен залог (Passiv Präsens).',
    summary: {
      overview:
        'Обсъждаме здравословните навици, хранителните вещества, спортните травми и медицинските процедури, като изразяваме отстъпка (въпреки че) с obwohl, trotzdem и trotz и описваме процеси в страдателен залог (Passiv).',
      keyPoints: [
        'Тяло, органи и симптоми: die Muskeln, die Knochen — кости, die Gelenke — стави, das Herz, die Lunge, der Kreislauf — кръвообращение, das Immunsystem stärken — укрепвам имунната система; der Schwindel (mir ist schwindelig — вие ми се свят), die Entzündung — възпаление, der Verband — превръзка, die Salbe — мехлем.',
        'Хранителни вещества и кулинарни процеси: die Nährstoffe (Eiweiß/Proteine, Kohlenhydrate, gesunde Fette, Ballaststoffe — фибри, Vitamine, Mineralstoffe); kalorienarm / zuckerfrei. В кулинарни рецепти често се използва Passiv Präsens (werden + Partizip II): Zuerst werden die Zwiebeln klein geschnitten und in Olivenöl angebraten.',
        'Медицинско обслужване в Passiv: Der Patient wird vom Arzt gründlich untersucht. Das Rezept wird ausgestellt. Die Wunde wird desinfiziert und verbunden.',
        'Отстъпителни конструкции (Konzessivsätze — „въпреки че / въпреки това“): (1) Подчинителен съюз obwohl (глагол в края): Obwohl er stark erkältet ist, geht er zum Training; (2) Наречие trotzdem (инверсия след него): Er ist stark erkältet, trotzdem geht er zum Training; (3) Предлог trotz + Genitiv/Dativ (съществително): Trotz seiner starken Erkältung geht er zum Training.',
        'Примерен текст: Obwohl die meisten Jugendlichen wissen, wie wichtig gesunde Ernährung ist, essen viele in der großen Pause Fast Food. Wenn man fit bleiben möchte, sollte man auf frische Zutaten achten. Zu Hause wird bei uns jeden Abend frisch gekocht. Trotz meines vollen Stundenplans treibe ich dreimal pro Woche Sport, weil mir Bewegung hilft, gesund zu bleiben.',
      ],
      examGoldenRule:
        'Запомни трите начина да кажеш „въпреки“: obwohl + подчинено изречение (глагол в края), trotzdem + главно изречение (глагол веднага след trotzdem) и trotz + съществително в Genitiv.',
      commonTraps: [
        'Не смесвай Futur I (werden + Infinitiv: Er wird den Arzt besuchen) и Passiv Präsens (werden + Partizip II: Er wird vom Arzt untersucht).',
        'При състояние като „Студено ми е / Лошо ми е / Вие ми се свят“ на немски се използва Dativ без възвратно местоимение: Mir ist kalt / Mir ist schlecht / Mir ist schwindelig.',
      ],
      formulasOrDates: [
        { label: 'Passiv Präsens', value: 'werden (спрегнат) + … + Partizip II (напр. wird gekocht / wird untersucht)' },
        { label: 'Трите форми за „въпреки“', value: 'obwohl (… глагол в края) | trotzdem (глагол + подлог) | trotz + съществително' },
        { label: 'Състояния с Dativ', value: 'Mir ist kalt / warm / schlecht / schwindelig.' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-8-health-chk-1',
        requirement: 'Трансформация на 4 изречения по темата „Здраве“ с obwohl, trotzdem и trotz',
        whyNeeded: 'Трансформацията между съюз, наречие и предлог за отстъпка е класическа задача за B1.1.',
        isEssentialForSix: true,
        suggestedNotes: 'Obwohl es regnet, jogge ich. -> Es regnet, trotzdem jogge ich. -> Trotz des Regens jogge ich.',
      },
      {
        id: 'de-b11-8-health-chk-2',
        requirement: 'Описание на здравословна рецепта или медицински преглед с 5 форми в Passiv Präsens',
        whyNeeded: 'За упражняване на страдателния залог в естествен контекст.',
        isEssentialForSix: true,
        suggestedNotes: 'wird gewaschen, werden geschnitten, wird gekocht / wird untersucht, wird verschrieben.',
      },
    ],
    flashcards: [
      { id: 'de-b11-8-health-fc-1', front: 'Каква е разликата в словореда след obwohl и след trotzdem?', back: 'След obwohl спрегнатият глагол е в края; след trotzdem веднага следва спрегнатият глагол.', tag: 'Синтаксис' },
      { id: 'de-b11-8-health-fc-2', front: 'Как се образува Passiv Präsens (страдателен залог в сегашно време)?', back: 'werden (спрегнат: wird / werden) + Partizip II в края на изречението.', tag: 'Граматика' },
      { id: 'de-b11-8-health-fc-3', front: 'Как е „укрепвам имунната система“ и „хранителни вещества“?', back: 'das Immunsystem stärken / die Nährstoffe', tag: 'Здраве' },
      { id: 'de-b11-8-health-fc-4', front: 'Как се казва „Вие ми се свят“ и „Лошо ми е“?', back: 'Mir ist schwindelig. / Mir ist schlecht (übel).', tag: 'При лекаря' },
      { id: 'de-b11-8-health-fc-5', front: 'Как е „въпреки лошото време“ с предлога trotz?', back: 'trotz des schlechten Wetters', tag: 'Предлози' },
      { id: 'de-b11-8-health-fc-6', front: 'Как е „превръзка“ и „мехлем“?', back: 'der Verband / die Salbe', tag: 'Медицина' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: ___ Lukas starke Knieschmerzen hatte, wollte er beim Fußballturnier mitspielen.',
        options: ['Trotz', 'Trotzdem', 'Obwohl', 'Deshalb'],
        correctIndex: 2,
        explanation: 'Глаголът hatte стои в края на подчиненото изречение, затова е необходим подчинителният съюз Obwohl.',
      },
      {
        id: 2,
        question: 'Попълнете в Passiv Präsens: In unserer Schulkantine ___ jeden Tag frischer Salat zubereitet.',
        options: ['hat', 'ist', 'wird', 'wurde'],
        correctIndex: 2,
        explanation: 'За действие в настоящето (jeden Tag) страдателният залог (Passiv Präsens) се образува с wird + Partizip II (zubereitet).',
      },
      {
        id: 3,
        question: 'Кое изречение със съществително след предлога trotz е граматически правилно?',
        options: [
          'Trotz des kalten Wetters gehen wir jeden Tag spazieren.',
          'Trotz es kalt ist, gehen wir jeden Tag spazieren.',
          'Trotz kaltes Wetter wir gehen jeden Tag spazieren.',
          'Trotz dem kaltes Wetter gehen wir spazieren.',
        ],
        correctIndex: 0,
        explanation: 'Предлогът trotz се свързва със съществително в Genitiv: trotz des kalten Wetters.',
      },
      {
        id: 4,
        question: 'Попълнете: Ich muss mich kurz hinsetzen, ___ ist plötzlich ganz schwindelig.',
        options: ['ich', 'mich', 'mir', 'mein'],
        correctIndex: 2,
        explanation: 'Безличният израз за световъртеж изисква Dativ: Mir ist schwindelig.',
      },
      {
        id: 5,
        question: 'Попълнете: Meine Schwester mag keinen Fisch, ___ isst sie ihn manchmal, weil er gesund ist.',
        options: ['obwohl', 'trotzdem', 'weil', 'damit'],
        correctIndex: 1,
        explanation: 'Глаголът isst следва веднага след свързващата дума, което изисква наречието trotzdem („въпреки това“).',
      },
      {
        id: 6,
        question: 'Как се превежда „Пациентът бива прегледан от лекаря“?',
        options: [
          'Der Patient untersucht den Arzt.',
          'Der Patient wird vom Arzt untersucht.',
          'Der Patient hat den Arzt untersucht.',
          'Der Patient wird den Arzt untersuchen.',
        ],
        correctIndex: 1,
        explanation: 'Passiv Präsens се образува с wird + Partizip II (untersucht), а извършителят се въвежда с von (+ Dat. = vom Arzt).',
      },
    ],
    quickQuestions: ['Как да трансформирам изречение с obwohl в изречение с trotzdem и trotz?', 'Как се образува Passiv Präsens на немски?', 'Защо казваме Mir ist kalt, а не Ich bin kalt?'],
  },
  {
    ...base,
    id: 'de-b11-8-nature',
    monTopicIds: ids('5'),
    title: 'Немски B1.1 (VIII, интензивно): Природа и екология — климат, екосистеми и устойчиво развитие',
    originalNoteExcerpt:
      'Тематична област „Природа и екология“: времето, сезони, климат; растения и животни; географски обекти; опазване на околната среда. Граматика: предлози с Genitiv (wegen, während, statt/anstatt), двойни съюзи (nicht nur … sondern auch, sowohl … als auch, entweder … oder), инфинитивни конструкции с (an)statt … zu и ohne … zu.',
    summary: {
      overview:
        'Анализираме причините и последиците от климатичните промени и замърсяването, описваме природните екосистеми и формулираме решения за опазване на природата с предлози с Genitiv, двойни съюзи и инфинитивни конструкции.',
      keyPoints: [
        'Климат и екологични предизвикателства: die Erderwärmung — глобално затопляне, der Treibhauseffekt — парников ефект, die Umweltverschmutzung — замърсяване на околната среда (Luft-, Wasser-, Bodenverschmutzung), die Abholzung der Wälder — изсичане на горите, das Artensterben — изчезване на видове, Naturkatastrophen (Überschwemmungen, Waldbrände, Stürme).',
        'Устойчиви решения (Nachhaltigkeit): erneuerbare Energien nutzen (Solarenergie, Windkraft, Wasserkraft), den ökologischen Fußabdruck verringern — намалявам екологичния си отпечатък, Rohstoffe wiederverwerten (recyceln), Bio-Produkte kaufen, Wasser und Energie sparen.',
        'Предлози с Genitiv за причина, време и алтернатива: wegen — поради/заради (Wegen des starken Sturms fielen viele Bäume um), während — по време на (Während des Sommers herrschte große Trockenheit), (an)statt — вместо (Statt einer Plastiktüte benutze ich einen Rucksack).',
        'Инфинитивни конструкции с um … zu, ohne … zu и (an)statt … zu: um … zu = за да (цел); ohne … zu = без да (начин); (an)statt … zu = вместо да (алтернатива): Viele Menschen lassen das Wasser laufen, statt den Wasserhahn zuzudrehen. Er verließ das Zimmer, ohne das Licht auszuschalten.',
        'Двойни съюзи (Doppelkonjunktionen): sowohl … als auch (както …, така и), nicht nur … sondern auch (не само …, но и), entweder … oder (или …, или), weder … noch (нито …, нито). Пример: Um das Klima zu schützen, müssen wir nicht nur weniger Plastik verbrauchen, sondern auch erneuerbare Energien fördern.',
      ],
      examGoldenRule:
        'Трите инфинитивни конструкции um … zu (за да), ohne … zu (без да) и (an)statt … zu (вместо да) следват една и съща схема: първата дума стои след запетаята, а zu + Infinitiv стои в самия край на изречението.',
      commonTraps: [
        'Двойният съюз weder … noch („нито …, нито“) вече съдържа отрицание — не добавяй nicht или kein в изречението!',
        'В Genitiv ед.ч. съществителните от мъжки и среден род получават окончание -s или -es след определителния член des / неопределителния eines: wegen des starken Regens, während eines langen Winters.',
      ],
      formulasOrDates: [
        { label: 'Предлози с Genitiv', value: 'wegen des Wetters | während des Sommers | statt eines Autos' },
        { label: 'Трите конструкции със zu', value: 'um … zu (за да) | ohne … zu (без да) | (an)statt … zu (вместо да)' },
        { label: 'Двойни съюзи', value: 'nicht nur …, sondern auch … | sowohl … als auch … | weder … noch …' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-8-nature-chk-1',
        requirement: 'Есе/статия за училищния вестник „Wie können Schüler im Alltag die Umwelt schützen?“ (150–170 думи)',
        whyNeeded: 'Развива аргументативното писане по екологична тема за ниво B1.1.',
        isEssentialForSix: true,
        suggestedNotes: 'Включи: wegen (+ Gen.), um … zu, statt … zu и не само … но и (nicht nur …, sondern auch …).',
      },
      {
        id: 'de-b11-8-nature-chk-2',
        requirement: 'Таблица на четирите двойни съюза със значение и пример',
        whyNeeded: 'Двойните съюзи обогатяват синтаксиса при говорене и писане.',
        isEssentialForSix: true,
        suggestedNotes: 'sowohl … als auch (+), nicht nur … sondern auch (++), entweder … oder (или/или), weder … noch (- -).',
      },
    ],
    flashcards: [
      { id: 'de-b11-8-nature-fc-1', front: 'Как е „глобално затопляне“ и „възобновяеми енергийни източници“?', back: 'die Erderwärmung / erneuerbare Energien', tag: 'Екология' },
      { id: 'de-b11-8-nature-fc-2', front: 'Кои четири предлога от програмата изискват Genitiv?', back: 'wegen (поради), trotz (въпреки), während (по време на), (an)statt (вместо).', tag: 'Предлози' },
      { id: 'de-b11-8-nature-fc-3', front: 'Как се превежда „Вместо да пътувам с кола, взимам влака“?', back: 'Statt mit dem Auto zu fahren, nehme ich den Zug.', tag: 'Граматика' },
      { id: 'de-b11-8-nature-fc-4', front: 'Как се превежда „без да се замисли“?', back: 'ohne nachzudenken', tag: 'Граматика' },
      { id: 'de-b11-8-nature-fc-5', front: 'Как е „не само …, но и …“ и „нито …, нито …“?', back: 'nicht nur …, sondern auch … / weder … noch …', tag: 'Двойни съюзи' },
      { id: 'de-b11-8-nature-fc-6', front: 'Как е „замърсяване на въздуха и водата“?', back: 'die Luft- und Wasserverschmutzung', tag: 'Екология' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: ___ des dichten Nebels musste unser Flug nach Frankfurt verschoben werden.',
        options: ['Weil', 'Wegen', 'Obwohl', 'Damit'],
        correctIndex: 1,
        explanation: 'Следва съществително в Genitiv (des dichten Nebels), затова за причина се използва предлогът Wegen („поради“).',
      },
      {
        id: 2,
        question: 'Попълнете: Viele Leute werfen alte Flaschen einfach weg, ___ sie zum Recyclingcontainer zu bringen.',
        options: ['um', 'damit', 'anstatt', 'weil'],
        correctIndex: 2,
        explanation: 'Смисълът е „вместо да ги занесат за рециклиране“ -> anstatt … zu bringen.',
      },
      {
        id: 3,
        question: 'Попълнете двойния съюз: Für den Umweltschutz brauchen wir ___ gute Gesetze, ___ verantwortungsbewusste Bürger.',
        options: ['entweder / noch', 'weder / oder', 'nicht nur / sondern auch', 'zwar / sondern'],
        correctIndex: 2,
        explanation: 'Правилната двойка за „не само …, но и …“ е nicht nur …, sondern auch …',
      },
      {
        id: 4,
        question: 'Попълнете: Er ging aus dem Haus, ___ den Fernseher auszuschalten.',
        options: ['ohne', 'um', 'damit', 'obwohl'],
        correctIndex: 0,
        explanation: 'Конструкцията за „без да изключи телевизора“ е ohne … auszuschalten.',
      },
      {
        id: 5,
        question: 'Кое от изброените понятия спада към „erneuerbare Energien“ (възобновяема енергия)?',
        options: ['Solarenergie und Windkraft', 'Kohle und Erdöl', 'Plastikmüll und Abgase', 'Benzin und Diesel'],
        correctIndex: 0,
        explanation: 'Слънчевата и вятърната енергия са възобновяеми енергийни източници.',
      },
      {
        id: 6,
        question: 'Попълнете в Genitiv: Während ___ letzten Sommers haben wir in den Alpen gezeltet.',
        options: ['dem', 'den', 'des', 'der'],
        correctIndex: 2,
        explanation: 'Предлогът während изисква Genitiv; der Sommer в Genitiv е des letzten Sommers.',
      },
    ],
    quickQuestions: ['Как се използват предлозите wegen, trotz, während и statt с Genitiv?', 'Каква е разликата между um … zu, ohne … zu и statt … zu?', 'Как се свързват изречения с двойни съюзи?'],
  },
  {
    ...base,
    id: 'de-b11-8-homeland-and-world',
    monTopicIds: ids('6'),
    title: 'Немски B1.1 (VIII, интензивно): Моята родина и светът — културен диалог, туризъм и световно наследство',
    originalNoteExcerpt:
      'Тематична област „Моята родина и светът“: празници и традиции; туризъм и пътуване; културно-исторически забележителности; принос на моята родина и страните на изучавания език към световното наследство. Граматика: Präteritum на слаби и силни глаголи за разказ, Passiv Präteritum (wurde + Partizip II) за исторически факти, Genitiv за принадлежност.',
    summary: {
      overview:
        'Разказваме за исторически събития, паметници на културата и бележити личности от България и немскоезичните страни с помощта на Präteritum и Passiv Präteritum и обсъждаме ролята на културния туризъм.',
      keyPoints: [
        'Пътувания и междукултурен опит: eine Studienreise / einen Schüleraustausch machen, fremde Kulturen und Bräuche kennenlernen, Vorurteile abbauen — преодолявам предразсъдъци, Gastfreundschaft erleben — изпитвам гостоприемство, den Horizont erweitern — разширявам кръгозора си.',
        'Описване на исторически паметници с Passiv Präteritum (wurde + Partizip II): За историята на сгради и изобретения се използва минало време на страдателния залог (wurde / wurden + Partizip II): Das Rila-Kloster wurde im 10. Jahrhundert vom heiligen Iwan Rilski gegründet. Das Brandenburger Tor wurde Ende des 18. Jahrhunderts erbaut. Der Buchdruck wurde um 1450 von Johannes Gutenberg erfunden.',
        'Разказ за минали събития в Präteritum: В писмени разкази, биографии и исторически текстове основното време е Präteritum: Goethe lebte und arbeitete in Weimar. Im Jahr 1989 fiel die Berliner Mauer.',
        'Празници, обичаи и световно наследство: В България — кукери (die Kukeri-Maskenspiele), нестинарство (der Feuertanz — immaterielles UNESCO-Kulturerbe), Празникът на розата, тракийските съкровища и гробници (Kasanlak, Sweschtari); в D-A-CH — Виенската класическа школа, Баухаус, замъците по река Рейн, швейцарските Алпи.',
        'Примерен текст: Während unseres Schüleraustauschs in München besichtigten wir das Deutsche Museum, das 1903 gegründet wurde. Dort erfuhren wir viel über berühmte Erfindungen aus Deutschland, wie das erste Automobil von Carl Benz oder die Röntgenstrahlen. Im Frühling besuchten uns dann die deutschen Schüler in Bulgarien. Wir zeigten ihnen die Altstadt von Plowdiw, deren antikes Theater im 2. Jahrhundert erbaut wurde.',
      ],
      examGoldenRule:
        'Когато пишеш кога е основан град, построена сграда или направено откритие, използвай Passiv Präteritum: wurde gegründet (беше основан), wurde erbaut (беше построен), wurde entdeckt/erfunden (беше открит/изобретен).',
      commonTraps: [
        'В Passiv Präteritum спомагателният глагол е wurde / wurden (без умлаут!), докато würde / würden (с умлаут) е Konjunktiv II („бих“).',
        'Различавай глаголите erfinden (изобретявам нещо ново — das Telefon erfinden) и entdecken (откривам нещо вече съществуващо в природата — Amerika entdecken).',
      ],
      formulasOrDates: [
        { label: 'Passiv Präteritum', value: 'wurde / wurden + … + Partizip II (wurde gegründet / wurde erbaut)' },
        { label: 'Изобретявам vs. откривам', value: 'etwas Neues erfinden | etwas Existierendes entdecken' },
        { label: 'Принадлежност в Genitiv', value: 'die Geschichte der Stadt | die Werke des Dichters' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-8-world2-chk-1',
        requirement: 'Писмено представяне на историческа забележителност или велика личност (150–170 думи)',
        whyNeeded: 'Съчетава странознанието с употребата на Präteritum и Passiv Präteritum.',
        isEssentialForSix: true,
        suggestedNotes: 'Кога и от кого е създадена/построена (wurde gegründet/erbaut), защо е част от световното наследство.',
      },
      {
        id: 'de-b11-8-world2-chk-2',
        requirement: 'Разграничение между wird gemacht (Passiv Präsens), wurde gemacht (Passiv Präteritum) и würde machen (Konjunktiv II)',
        whyNeeded: 'Предотвратява смесването на трите форми на глагола werden.',
        isEssentialForSix: true,
        suggestedNotes: 'По един ясен пример за всяка от трите форми.',
      },
    ],
    flashcards: [
      { id: 'de-b11-8-world2-fc-1', front: 'Как се образува Passiv Präteritum (страдателен залог в минало време)?', back: 'wurde / wurden + Partizip II в края на изречението.', tag: 'Граматика' },
      { id: 'de-b11-8-world2-fc-2', front: 'Каква е разликата между erfinden и entdecken?', back: 'erfinden = изобретявам (машина, технология); entdecken = откривам (континент, планета, закон).', tag: 'Лексика' },
      { id: 'de-b11-8-world2-fc-3', front: 'Как е „беше основан“ и „беше построен“ на немски?', back: 'wurde gegründet / wurde erbaut (gebaut)', tag: 'История' },
      { id: 'de-b11-8-world2-fc-4', front: 'Как е „преодолявам предразсъдъци“ и „разширявам кръгозора си“?', back: 'Vorurteile abbauen / den Horizont erweitern', tag: 'Култура' },
      { id: 'de-b11-8-world2-fc-5', front: 'Каква е разликата между wurde и würde?', back: 'wurde (без умлаут) е минало време (Präteritum); würde (с умлаут) е условно наклонение („бих“).', tag: 'Капани' },
      { id: 'de-b11-8-world2-fc-6', front: 'Как е „гостоприемство“ и „обичаи“?', back: 'die Gastfreundschaft / die Bräuche (ед.ч. der Brauch)', tag: 'Традиции' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Die erste Universität im deutschsprachigen Raum ___ im Jahr 1348 gegründet.',
        options: ['wird', 'wurde', 'würde', 'hat'],
        correctIndex: 1,
        explanation: 'За исторически факт в миналото (im Jahr 1348) се използва Passiv Präteritum: wurde gegründet.',
      },
      {
        id: 2,
        question: 'Попълнете: Wilhelm Conrad Röntgen hat im Jahr 1895 die Röntgenstrahlen ___.',
        options: ['entdeckt', 'erfunden', 'erbaut', 'gegründet'],
        correctIndex: 0,
        explanation: 'Рентгеновите лъчи съществуват в природата, затова те са открити — entdeckt.',
      },
      {
        id: 3,
        question: 'Попълнете в Genitiv: Die Architektur ___ alten Klosters beeindruckt alle Besucher.',
        options: ['dem', 'den', 'des', 'der'],
        correctIndex: 2,
        explanation: 'Въпросът „на кое?“ (принадлежност) изисква Genitiv; das Kloster в Genitiv е des alten Klosters.',
      },
      {
        id: 4,
        question: 'Какво означава изразът „Vorurteile abbauen“ при международен младежки обмен?',
        options: [
          'преодолявам предразсъдъци спрямо други култури',
          'строя сгради в предградията',
          'купувам билети предварително',
          'отменям планирано пътуване',
        ],
        correctIndex: 0,
        explanation: 'Das Vorurteil означава предразсъдък, а Vorurteile abbauen — разграждам/преодолявам предразсъдъци.',
      },
      {
        id: 5,
        question: 'Попълнете с правилната форма за Präteritum: Als wir in Salzburg ankamen, ___ wir sofort das Geburtshaus von Mozart.',
        options: ['besuchen', 'besuchten', 'besucht', 'gebesucht'],
        correctIndex: 1,
        explanation: 'За 1 л. мн.ч. (wir) слабият глагол besuchen в Präteritum има форма wir besuchten.',
      },
      {
        id: 6,
        question: 'Попълнете: Die berühmten thrakischen Goldschätze ___ heute in vielen Museen der Welt ausgestellt.',
        options: ['wurden', 'werden', 'würden', 'waren'],
        correctIndex: 1,
        explanation: 'Наречието heute показва сегашно време в страдателен залог (Passiv Präsens): werden … ausgestellt.',
      },
    ],
    quickQuestions: ['Кога използваме wurde gemacht и кога wird gemacht?', 'Каква е разликата между erfinden и entdecken?', 'Как да разкажа историята на българска забележителност на немски?'],
  },
  {
    ...base,
    id: 'de-b11-8-skills',
    monTopicIds: ids('skills'),
    title: 'Немски B1.1 (VIII, интензивно): Слушане, четене, говорене и писане — умения и текстови формати',
    originalNoteExcerpt:
      'Очаквани резултати по четирите умения за ниво B1.1 (VIII клас, интензивно): разбиране на основната информация, детайли и намерения на говорещия в автентични текстове (до 3 минути при слушане); разбиране на адаптирани художествени и научнопопулярни текстове при четене; поддържане на разговор, аргументиране на мнение и кратка презентация при говорене; писане на лично и официално писмо/имейл, разказ и описание (150–170 думи).',
    summary: {
      overview:
        'Систематизираме изискванията за ниво B1.1 при интензивно изучаване в VIII клас: работа с автентични аудиозаписи до 3 минути, четене на публицистични и художествени текстове, устна аргументация и създаване на писмени текстове от 150–170 думи.',
      keyPoints: [
        'Слушане (Hörverstehen — до 3 минути): Проследяваш основната линия, конкретни факти и отношението/намерението на говорещите в интервюта, радиопредавания, подкасти и дискусии. Внимавай за модални частици и интонация, които показват съмнение, ирония или ентусиазъм (eigentlich, wohl, doch, ja).',
        'Четене (Leseverstehen): Разбираш статии от младежки списания, блогове, правилници, пътеписи и адаптирани литературни откъси. Прилагаш три вида четене според задачата: глобално (за общата тема), селективно (за намиране на конкретен факт) и детайлно (за пълно разбиране на аргументите).',
        'Говорене (Sprechen — диалог, дискусия и презентация): Изказваш и защитаваш мнение с аргументи и примери (Ich bin davon überzeugt, dass… / Ein wichtiges Argument dafür/dagegen ist…), реагираш на чужда позиция и правиш кратка структурирана презентация (Einleitung -> Hauptteil -> Schluss).',
        'Писане (Schreiben — 150–170 думи): Създаваш добре структурирани текстове в четири жанра: (1) Личен имейл с разказ и мнение; (2) Официално писмо/имейл (запитване, молба, кандидатстване); (3) Свързан разказ по зададено начало или серия от картини (в Präteritum/Perfekt); (4) Описание с лична оценка.',
        'Структура на кратка устна презентация (B1.1): 1. Тема и план (Heute möchte ich über das Thema „…“ sprechen. Zuerst…, danach…, zum Schluss…); 2. Личен опит (Meine persönlichen Erfahrungen zeigen, dass…); 3. Situação в родината (In Bulgarien ist es üblich, dass…); 4. Предимства и недостатъци (Ein Vorteil ist…, ein Nachteil besteht darin, dass…); 5. Заключение (Zusammenfassend kann ich sagen, dass… Vielen Dank für Ihre Aufmerksamkeit!).',
      ],
      examGoldenRule:
        'В писмен текст от 150–170 думи за ниво B1.1 раздели изложението на минимум 4 ясни абзаца (въведение, 2 основни абзаца по опорните точки и заключение) и използвай разнообразни свързващи думи (außerdem, dennoch, deshalb, obwohl, nachdem, um … zu).',
      commonTraps: [
        'Когато разказваш история по картини или преживяване в писмен вид, не прескачай хаотично между Präsens и минало време — избери основно време за разказа (Präteritum или Perfekt) и го следвай последователно.',
        'При аргументиране след Einerseits („От една страна“) в следващото изречение логично следва Andererseits („От друга страна“) с глагол на втора позиция.',
      ],
      formulasOrDates: [
        { label: 'Обем на писмен текст (B1.1)', value: '150–170 думи' },
        { label: 'Двустранна аргументация', value: 'Einerseits ist es gut, dass … Andererseits muss man bedenken, dass …' },
        { label: 'Финал на презентация', value: 'Zusammenfassend lässt sich sagen, dass … Vielen Dank für Ihre Aufmerksamkeit!' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-8-skills-chk-1',
        requirement: 'Пълен шаблон (Redemittel) за устна презентация в 5 стъпки за ниво B1.1',
        whyNeeded: 'Този формат се използва както в VIII клас (интензивно), така и на международни изпити като DSD I и Goethe-Zertifikat B1.',
        isEssentialForSix: true,
        suggestedNotes: 'Thema nennen -> Eigene Erfahrung -> Situation im Heimatland -> Vor- und Nachteile -> Meinung & Dank.',
      },
      {
        id: 'de-b11-8-skills-chk-2',
        requirement: 'Списък на 15 свързващи израза за текст от 150–170 думи',
        whyNeeded: 'Осигурява логическа свързаност (Kohärenz) и висок брой точки за езиково богатство.',
        isEssentialForSix: true,
        suggestedNotes: 'zuerst, anschließend, darüber hinaus, einerseits/andererseits, obwohl, trotzdem, schließlich.',
      },
    ],
    flashcards: [
      { id: 'de-b11-8-skills-fc-1', front: 'Какъв е препоръчителният обем на писмените текстове за ниво B1.1 (VIII клас, интензивно)?', back: '150–170 думи.', tag: 'Писане' },
      { id: 'de-b11-8-skills-fc-2', front: 'Как се казва „От една страна … От друга страна …“ на немски?', back: 'Einerseits … Andererseits … (и двете изискват глагол веднага след себе си!).', tag: 'Аргументация' },
      { id: 'de-b11-8-skills-fc-3', front: 'Как се въвежда заключение в края на презентация или есе?', back: 'Zusammenfassend kann man sagen, dass … / Zum Schluss möchte ich betonen, dass …', tag: 'Говорене' },
      { id: 'de-b11-8-skills-fc-4', front: 'Какво означава изразът „darüber hinaus“?', back: 'Освен това / В допълнение към това (по-висок регистър от außerdem).', tag: 'Писане' },
      { id: 'de-b11-8-skills-fc-5', front: 'Кои са трите вида четене според целта на задачата?', back: 'Globalverstehen (общ смисъл), Selektivverstehen (конкретни данни), Detailverstehen (детайлно разбиране).', tag: 'Четене' },
      { id: 'de-b11-8-skills-fc-6', front: 'Как благодарим на публиката в края на презентация?', back: 'Vielen Dank für Ihre / eure Aufmerksamkeit!', tag: 'Презентация' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Кое изречение продължава правилно мисълта „Einerseits bietet das Internet schnellen Zugang zu Informationen. …“?',
        options: [
          'Andererseits verbringen viele Jugendliche zu viel Zeit vor dem Bildschirm.',
          'Andererseits viele Jugendliche verbringen zu viel Zeit vor dem Bildschirm.',
          'Andererseits dass viele Jugendliche zu viel Zeit vor dem Bildschirm verbringen.',
          'Weil andererseits viele Jugendliche vor dem Bildschirm sitzen.',
        ],
        correctIndex: 0,
        explanation: 'Наречието Andererseits стои на първа позиция и изисква инверсия (веднага след него стои спрегнатият глагол verbringen).',
      },
      {
        id: 2,
        question: 'Търсите в разписание на влакове само часа на заминаване и номера на коловоза. Кой вид четене прилагате?',
        options: [
          'Селективно четене (Selektivverstehen)',
          'Художествено четене на глас',
          'Превод дума по дума с речник',
          'Литературен анализ на стила',
        ],
        correctIndex: 0,
        explanation: 'Извличането на конкретна точка от информация (час, коловоз, цена) е селективно четене.',
      },
      {
        id: 3,
        question: 'Коя фраза е най-подходяща за въвеждане на личния опит в устна презентация?',
        options: [
          'Sehr geehrter Herr Direktor,',
          'Meine persönlichen Erfahrungen zeigen, dass…',
          'Gute Besserung und schöne Ferien!',
          'Hier ist der Kassenbon zum Umtauschen.',
        ],
        correctIndex: 1,
        explanation: '„Meine persönlichen Erfahrungen zeigen, dass…“ означава „Моят личен опит показва, че…“.',
      },
      {
        id: 4,
        question: 'Попълнете: Ich bin fest ___ überzeugt, dass Fremdsprachen für unsere Zukunft sehr wichtig sind.',
        options: ['darauf', 'davon', 'damit', 'daran'],
        correctIndex: 1,
        explanation: 'Изразът е überzeugt sein von (+ Dat.); пред подчинено изречение с dass се поставя местоименното наречие davon.',
      },
      {
        id: 5,
        question: 'Какъв е очакваният обем на писмените задачи по програмата на МОН за ниво B1.1 (VIII клас, интензивно)?',
        options: ['30–40 думи', '60–80 думи', '150–170 думи', '400–500 думи'],
        correctIndex: 2,
        explanation: 'Програмата за интензивно изучаване в VIII клас (B1.1) определя обем от 150–170 думи за писмените текстове.',
      },
      {
        id: 6,
        question: 'Коя дума е синоним на „außerdem“ („освен това“) и е отлична за свързване на аргументи в текст на ниво B1?',
        options: ['zudem / darüber hinaus', 'trotzdem', 'stattdessen', 'deswegen'],
        correctIndex: 0,
        explanation: 'Zudem и darüber hinaus означават „освен това / в допълнение“.',
      },
    ],
    quickQuestions: ['Как се прави 3-минутна устна презентация на ниво B1?', 'Кои фрази свързват аргументи „за“ и „против“?', 'Как да разпределя 150–170 думи по абзаци?'],
  },
  {
    ...base,
    id: 'de-b11-8-grammar',
    monTopicIds: ids('grammar'),
    title: 'Немски B1.1 (VIII, интензивно): Езикови знания — всички минали времена, Konjunktiv II, Passiv и сложен синтаксис',
    originalNoteExcerpt:
      'Граматика за ниво B1.1 (VIII клас, интензивно): съществителни от n-Deklination, Genitiv; пълно склонение и степенуване на прилагателните; всички времена в деятелен залог (Präsens, Perfekt, Präteritum, Plusquamperfekt, Futur I); Konjunktiv II (настояще); страдателен залог (Passiv Präsens и Präteritum); глаголи с предложно управление и местоименни наречия; предлози с Genitiv; всички основни видове подчинени и инфинитивни изречения.',
    summary: {
      overview:
        'Пълно обобщение на граматичния материал за интензивния VIII клас (ниво B1.1) — системата на шестте основни глаголни форми и залози, падежната система с Genitiv и n-Deklination и цялата палитра от подчинени изречения.',
      keyPoints: [
        'Система на времената и залозите: Деятелен залог (Aktiv) — Präsens (er baut), Präteritum (er baute), Perfekt (er hat gebaut), Plusquamperfekt (er hatte gebaut), Futur I (er wird bauen). Страдателен залог за процес (Vorgangspassiv) — Passiv Präsens (das Haus wird gebaut), Passiv Präteritum (das Haus wurde gebaut), с модални глаголи (das Haus muss gebaut werden).',
        'Konjunktiv II за настоящето: Образува се с würde + Infinitiv за повечето глаголи и със собствени форми за war -> wäre, hatte -> hätte, es gibt -> es gäbe и модалните глаголи (könnte, müsste, sollte, dürfte, wollte). Използва се за нереални условия (Wenn ich mehr Zeit hätte, würde ich noch eine Sprache lernen), учтиви молби, съвети и нереални сравнения с als ob (Er tut so, als ob er alles wüsste).',
        'Падежи, Genitiv и n-Deklination: Определителен член в Genitiv: des (+ -s/-es за м.р. и ср.р.), der (за ж.р. и мн.ч.). Прилагателното след член в Genitiv винаги завършва на -en (das Dach des alten Hauses, die Meinung meiner besten Freundin). Слабите съществителни от м.р. (der Mensch, der Junge, der Nachbar, der Kollege, der Kunde, der Patient, der Präsident) имат окончание -n/-en във всички падежи освен Nominativ ед.ч.',
        'Управление на глаголите и местоименни наречия: Глаголи с Akkusativ-предлог (denken an, warten auf, sich freuen auf/über, sich interessieren für, sich kümmern um, sich bewerben um) и с Dativ-предлог (teilnehmen an, träumen von, sprechen mit, abhängen von, sich beschäftigen mit). За предмети и цели изречения: Woran denkst du? — Ich denke daran, dass…',
        'Пълна класификация на подчинените изречения (глагол в края): допълнителни (dass, ob, W-въпроси), причинни (weil, da), условни (wenn, falls), времеви (als, wenn, während, bevor, nachdem, seitdem, bis, sobald), за цел (damit / um … zu), отстъпителни (obwohl), за начин/алтернатива (indem, als ob / ohne … zu, statt … zu), относителни (der/die/das, wo, was).',
      ],
      examGoldenRule:
        'Когато след глагол с предлог (напр. warten auf, sich freuen auf, denken an) следва подчинено изречение с dass или инфинитив със zu, в главното изречение постави съответното местоименно наречие с da(r)-: Ich freue mich darauf, dich bald wiederzusehen.',
      commonTraps: [
        'В страдателен залог с модален глагол в края на изречението стоят Partizip II + werden (инфинитив): Die Aufgabe muss bis morgen erledigt werden.',
        'Относителното местоимение след alles, nichts, etwas, viel, das Beste/Schönste е винаги was (а не das!): Alles, was er gesagt hat, ist wahr.',
      ],
      formulasOrDates: [
        { label: 'Passiv с модален глагол', value: 'muss / kann / soll + … + Partizip II + werden' },
        { label: 'Нереално условие (Konj. II)', value: 'Wenn ich … hätte / wäre, würde ich … (+ Infinitiv)' },
        { label: 'Относително след alles/etwas', value: 'Alles, was du brauchst | Das Beste, was mir passiert ist' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-8-gram-chk-1',
        requirement: 'Обобщена таблица на Aktiv и Passiv в Präsens, Präteritum и с модални глаголи',
        whyNeeded: 'За бързо разпознаване и образуване на всички глаголни форми от програмата за VIII клас.',
        isEssentialForSix: true,
        suggestedNotes: 'Aktiv: er repariert / reparierte; Passiv: es wird repariert / wurde repariert / muss repariert werden.',
      },
      {
        id: 'de-b11-8-gram-chk-2',
        requirement: 'Списък на 25-те най-честотни глагола с предлози (с посочен падеж Akk. или Dat.)',
        whyNeeded: 'Управлението на глаголите се проверява във всеки граматичен тест за ниво B1.',
        isEssentialForSix: true,
        suggestedNotes: 'warten auf (Akk.), denken an (Akk.), teilnehmen an (Dat.), sich kümmern um (Akk.), abhängen von (Dat.)…',
      },
    ],
    flashcards: [
      { id: 'de-b11-8-gram-fc-1', front: 'Как се образува Passiv с модален глагол (напр. „Работата трябва да бъде свършена“)?', back: 'Die Arbeit muss gemacht werden (модален глагол + Partizip II + werden).', tag: 'Passiv' },
      { id: 'de-b11-8-gram-fc-2', front: 'Кое относително местоимение се използва след думите alles, nichts, etwas и след превъзходна степен (das Beste)?', back: 'Винаги was: Alles, was ich weiß; das Schönste, was ich gesehen habe.', tag: 'Относителни изречения' },
      { id: 'de-b11-8-gram-fc-3', front: 'С кой предлог и падеж се свързва глаголът teilnehmen (участвам в)?', back: 'teilnehmen an + Dativ (напр. an einem Kurs teilnehmen).', tag: 'Глаголи с предлози' },
      { id: 'de-b11-8-gram-fc-4', front: 'С кой предлог и падеж се свързва глаголът warten (чакам)?', back: 'warten auf + Akkusativ (напр. auf den Bus warten).', tag: 'Глаголи с предлози' },
      { id: 'de-b11-8-gram-fc-5', front: 'Как се превежда „Ако имах повече свободно време, щях да чета повече книги“?', back: 'Wenn ich mehr Freizeit hätte, würde ich mehr Bücher lesen.', tag: 'Konjunktiv II' },
      { id: 'de-b11-8-gram-fc-6', front: 'Какво окончание има прилагателното в Genitiv след определителен или неопределителен член?', back: 'Винаги -en (напр. des neuen Lehrers, einer großen Stadt).', tag: 'Genitiv' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Wenn ich an deiner Stelle ___, ___ ich sofort mit dem Klassenlehrer sprechen.',
        options: ['bin / werde', 'war / wurde', 'wäre / würde', 'sei / wollte'],
        correctIndex: 2,
        explanation: 'Нереално условно изречение в настоящето се образува с Konjunktiv II: Wenn ich … wäre, würde ich … sprechen.',
      },
      {
        id: 2,
        question: 'Попълнете: Dieses Formular muss bis Freitag im Sekretariat ___ ___.',
        options: ['abgeben / werden', 'abgegeben / werden', 'abgegeben / worden', 'abzugeben / wird'],
        correctIndex: 1,
        explanation: 'Passiv с модален глагол (muss) изисква в края Partizip II + инфинитив werden: abgegeben werden.',
      },
      {
        id: 3,
        question: 'Попълнете: Hast du Lust, nächsten Monat ___ unserem Schulwettbewerb teilzunehmen?',
        options: ['in', 'auf', 'an', 'für'],
        correctIndex: 2,
        explanation: 'Глаголът teilnehmen се управлява от предлога an + Dativ: an unserem Schulwettbewerb teilnehmen.',
      },
      {
        id: 4,
        question: 'Попълнете: Alles, ___ du für die Prüfung brauchst, steht in diesem Lehrbuch.',
        options: ['das', 'was', 'welches', 'wer'],
        correctIndex: 1,
        explanation: 'След неопределителното местоимение alles относителното местоимение е винаги was.',
      },
      {
        id: 5,
        question: 'Попълнете: Wir warten schon sehr gespannt ___, dass die Ergebnisse bekannt gegeben werden.',
        options: ['daran', 'darauf', 'damit', 'davon'],
        correctIndex: 1,
        explanation: 'Warten auf (+ Akk.) образува местоименно наречие darauf пред подчиненото изречение с dass.',
      },
      {
        id: 6,
        question: 'Попълнете с правилната форма от n-склонението: Der Arzt sprach lange mit dem jungen ___.',
        options: ['Patient', 'Patienten', 'Patients', 'Patiente'],
        correctIndex: 1,
        explanation: 'Съществителното der Patient се скланя по n-Deklination и в Dativ ед.ч. получава окончание -en: mit dem jungen Patienten.',
      },
    ],
    quickQuestions: ['Как се образува Passiv с модални глаголи?', 'Кога в относително изречение се пише was вместо das?', 'Как работят местоименните наречия с da(r)- и wo(r)-?'],
  },
];
