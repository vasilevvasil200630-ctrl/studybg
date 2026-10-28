import type { LessonData } from '../../types';

// Немски език, ниво A2 (XI–XII клас, общообразователна подготовка) — по един урок за всяка тема от учебната
// програма на МОН (https://www.mon.bg/nfs/2018/12/oop_ne_oa2_28112018-1.pdf). Програмата надгражда ниво A1
// с практически ситуации за ученици в XI–XII клас (автобиография Europass, образование, професии, пътуване).

const base = { subject: 'Чужди езици (Немски, Френски, Испански)', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ne-a2-11-12:${num}`];

export const MON_LESSONS_DE_A2_11: LessonData[] = [
  {
    ...base,
    id: 'de-a2-11-me-and-others',
    monTopicIds: ids('1'),
    title: 'Немски A2 (XI–XII): Аз и другите — външен вид, характер, образование, интереси и автобиография (Lebenslauf)',
    originalNoteExcerpt:
      'Тематична област „Аз и другите“: външен вид, облекло, характер; образование и интереси (книги, изкуства, кино, театър, медии, интернет, социални мрежи); взаимоотношения, чувства, емоции. Писане: попълване на формуляр с подробни лични данни (Europass-Lebenslauf), свързан текст от 100–120 думи.',
    summary: {
      overview:
        'В XI–XII клас темата „Аз и другите“ се свързва с представянето на личността пред учебни заведения и работодатели: описваме външен вид, лични качества, образование, дигитални и езикови умения и попълваме автобиография (Lebenslauf).',
      keyPoints: [
        'Външен вид и стил на обличане: mittelgroß — среден на ръст, schlank, sportlich; schulterlange/glatte/lockige Haare; gepflegt aussehen — изглеждам поддържан; elegante / sportliche / bequeme Kleidung tragen (ein Hemd, eine Bluse, einen Anzug — костюм, ein Kostüm).',
        'Лични качества за автобиография и интервю: zuverlässig — надежден, verantwortungsbewusst — отговорен, pünktlich — точен, teamfähig — умеещ да работи в екип, geduldig — търпелив, kreativ, kommunikativ, selbstständig — самостоятелен.',
        'Образование и умения (Bildung und Kompetenzen): das Gymnasium besuchen, das Abitur machen — държа матура, der Schulabschluss — диплома за средно образование, ein Zertifikat erwerben, ein Praktikum machen — карам стаж, Sprachkenntnisse (Muttersprache Bulgarisch, Fremdsprachen Englisch und Deutsch), digitale Kompetenzen / Computerkenntnisse.',
        'Взаимоотношения и чувства: sich gut verstehen mit (+ Dat.) — разбирам се добре с, jemandem vertrauen (+ Dat.) — имам доверие на, jemanden unterstützen — подкрепям, stolz sein auf (+ Akk.) — горд съм с, begeistert sein von (+ Dat.) — въодушевен съм от.',
        'Структура на Europass-Lebenslauf и примерен профил: Persönliche Angaben (Name, Adresse, Telefon, E-Mail, Geburtsdatum), Schul- und Berufsbildung, Praktische Erfahrungen, Persönliche Fähigkeiten (Sprachen, Computerkenntnisse, Führerschein). Пример: Ich bin 18 Jahre alt und besuche die 12. Klasse eines Gymnasiums in Burgas. Ich bin zuverlässig, teamfähig und interessiere mich für Grafikdesign und digitale Medien.',
      ],
      examGoldenRule:
        'Когато описваш личните си качества в мотивационно писмо или интервю, винаги подкрепяй прилагателното с конкретен пример: Ich bin teamfähig, denn ich arbeite aktiv im Schulclub mit.',
      commonTraps: [
        'Глаголът vertrauen (доверявам се) и helfen (помагам) изискват Dativ без предлог: Ich vertraue meinem besten Freund (не meinen besten Freund).',
        'При stolz auf след предлога auf за абстрактна връзка се използва Akkusativ: Ich bin stolz auf meinen Erfolg.',
      ],
      formulasOrDates: [
        { label: 'Качества за CV', value: 'zuverlässig, pünktlich, teamfähig, verantwortungsbewusst' },
        { label: 'Образование', value: 'das Gymnasium besuchen | das Abitur machen | ein Praktikum machen' },
        { label: 'Обем на текста', value: '100–120 думи (писмо / описание / CV)' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-11-me-chk-1',
        requirement: 'Попълнена собствена автобиография по модела Europass (Lebenslauf) на немски език',
        whyNeeded: 'Попълването на формуляр с подробни лични данни е пряк очакван резултат в програмата за XI–XII клас.',
        isEssentialForSix: true,
        suggestedNotes: 'Persönliche Angaben, Schulbildung, Sprachkenntnisse, Digitale Kompetenzen, Hobbys.',
      },
      {
        id: 'de-a2-11-me-chk-2',
        requirement: 'Кратко самопредставяне за стаж или младежки обмен (100–120 думи)',
        whyNeeded: 'Обединява лексиката за характер, образование и интереси.',
        isEssentialForSix: false,
        suggestedNotes: 'Образование + 3 силни страни + интереси в медиите/изкуството.',
      },
    ],
    flashcards: [
      { id: 'de-a2-11-me-fc-1', front: 'Как е „надежден“, „точен“ и „умеещ да работи в екип“?', back: 'zuverlässig / pünktlich / teamfähig', tag: 'Качества' },
      { id: 'de-a2-11-me-fc-2', front: 'Как е „автобиография“ и „държа матура“ на немски?', back: 'der Lebenslauf / das Abitur machen', tag: 'Образование' },
      { id: 'de-a2-11-me-fc-3', front: 'Как е „карам стаж“?', back: 'ein Praktikum machen', tag: 'Кариера' },
      { id: 'de-a2-11-me-fc-4', front: 'Как е „Разбирам се добре с моите съученици“?', back: 'Ich verstehe mich gut mit meinen Mitschülern.', tag: 'Отношения' },
      { id: 'de-a2-11-me-fc-5', front: 'Как е „Гордея се с успеха си“?', back: 'Ich bin stolz auf meinen Erfolg.', tag: 'Чувства' },
      { id: 'de-a2-11-me-fc-6', front: 'Как се наричат „езикови умения“ и „шофьорска книжка“ в CV?', back: 'die Sprachkenntnisse / der Führerschein', tag: 'Lebenslauf' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Кое качество е най-подходящо за автобиография с описанието „Ich komme immer rechtzeitig zur Arbeit“?',
        options: ['schüchtern', 'pünktlich', 'neugierig', 'ungeduldig'],
        correctIndex: 1,
        explanation: 'Който идва винаги навреме (rechtzeitig), е точен — pünktlich.',
      },
      {
        id: 2,
        question: 'Попълнете: Meine Schwester ist sehr stolz ___ ihr neues Zertifikat in Deutsch.',
        options: ['über', 'für', 'auf', 'mit'],
        correctIndex: 2,
        explanation: 'Устойчивият израз е stolz sein auf + Akkusativ.',
      },
      {
        id: 3,
        question: 'Попълнете: Ich vertraue ___ besten Freundin in jeder Situation.',
        options: ['meine', 'meiner', 'meinen', 'mein'],
        correctIndex: 1,
        explanation: 'Глаголът vertrauen изисква Dativ; за женски род (die Freundin) формата е meiner besten Freundin.',
      },
      {
        id: 4,
        question: 'В кой раздел на Europass-Lebenslauf се записват владеенето на чужди езици и компютърните умения?',
        options: ['Persönliche Angaben', 'Persönliche Fähigkeiten und Kompetenzen', 'Geburtsdatum und Staatsangehörigkeit', 'Unterschrift'],
        correctIndex: 1,
        explanation: 'Езиковите и дигиталните умения се вписват в раздела Persönliche Fähigkeiten und Kompetenzen.',
      },
      {
        id: 5,
        question: 'Какво означава изразът „das Abitur machen“?',
        options: ['полагам зрелостен изпит (матура)', 'записвам се на езиков курс', 'започвам лятна работа', 'получавам шофьорска книжка'],
        correctIndex: 0,
        explanation: 'Das Abitur (в Австрия die Matura) е зрелостният изпит в края на гимназията.',
      },
      {
        id: 6,
        question: 'Попълнете: Im Sommer möchte ich ___ Praktikum bei einer deutschen Firma machen.',
        options: ['einen', 'eine', 'ein', 'einem'],
        correctIndex: 2,
        explanation: 'Das Praktikum е среден род; в Akkusativ неопределителният член е ein.',
      },
    ],
    quickQuestions: ['Как се пише Lebenslauf по модела Europass на немски?', 'Кои прилагателни за характер са най-важни за интервю?', 'Как да разкажа за образованието и интересите си в 100 думи?'],
  },
  {
    ...base,
    id: 'de-a2-11-world-around-me',
    monTopicIds: ids('2'),
    title: 'Немски A2 (XI–XII): Светът около мен — жилище, училище, градска среда и безопасно движение',
    originalNoteExcerpt:
      'Тематична област „Светът около мен“: моят дом; моето училище; моето населено място (сгради и институции, забележителности, транспорт и упътване в града, безопасност на движението). Граматика: Wechselpräpositionen, предлози с Dativ и Akkusativ, сравнителна и превъзходна степен.',
    summary: {
      overview:
        'Описваме жилище и условия за наемане (напр. за студенти), училищния живот в горния курс, градската инфраструктура, обществения транспорт и правилата за безопасност на пътя.',
      keyPoints: [
        'Жилище и обяви за наем (Wohnen): die Wohnung mieten — наемам апартамент, die Wohngemeinschaft (WG) — съквартирантско жилище, die Miete — наем, die Nebenkosten — консумативи, möbliert — обзаведен, ruhig/zentral gelegen — на тихо/централно място, im Erdgeschoss / im dritten Stock.',
        'Училище в горния курс: der Unterricht, die Wahlfächer — избираеми предмети, das Projekt, die Präsentation halten — правя презентация, die Schulbibliothek, das Computerkabinett, sich auf die Prüfungen vorbereiten.',
        'Градска среда и транспорт: öffentliche Verkehrsmittel (die U-Bahn, die S-Bahn, die Straßenbahn, der Bus), umsteigen — прекачвам се, der Fahrplan — разписание, der Fahrkartenautomat, die Fußgängerzone — пешеходна зона, das Stadtzentrum, der Vorort — предградие.',
        'Безопасност на движението (Verkehrssicherheit): die Verkehrsregeln beachten — спазвам правилата за движение, sich anschnallen — слагам предпазен колан, die Geschwindigkeitsbegrenzung — ограничение на скоростта, der Radweg, der Helm, bei Rot stehen bleiben, bei Grün über die Straße gehen.',
        'Примерен текст: Ich wohne mit meiner Familie in einer Dreizimmerwohnung im vierten Stock. Unser Viertel liegt nicht weit vom Stadtzentrum entfernt und hat sehr gute Verkehrsverbindungen. Mit der Straßenbahn brauche ich nur fünfzehn Minuten bis zur Schule. Nach dem Abitur möchte ich in einer Wohngemeinschaft (WG) in einer Universitätsstadt wohnen.',
      ],
      examGoldenRule:
        'Когато четеш обяви за жилище под наем, внимавай за съкращенията: Zi. = Zimmer (стаи), qm / m² = Quadratmeter (квадратни метри), NK = Nebenkosten (разходи за ток, вода и парно), WG = Wohngemeinschaft.',
      commonTraps: [
        'За етаж се използва предлогът in + Dativ: im ersten Stock (на първия етаж), im Erdgeschoss (на партера).',
        'Глаголът umsteigen (прекачвам се) е с делима представка и в Perfekt се спряга със sein: Ich bin am Hauptbahnhof umgestiegen.',
      ],
      formulasOrDates: [
        { label: 'Жилище под наем', value: 'eine Wohnung mieten | in einer WG wohnen | die Miete + Nebenkosten' },
        { label: 'Градски транспорт', value: 'mit der U-Bahn fahren | am Bahnhof in den Bus umsteigen' },
        { label: 'Пътна безопасност', value: 'sich anschnallen | den Radweg benutzen | Verkehrsregeln beachten' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-11-world-chk-1',
        requirement: 'Имейл за запитване по обява за стая в съквартирантско жилище (WG) — 100 думи',
        whyNeeded: 'Практическа задача, съчетаваща описание на жилище и официално/полуофициално запитване.',
        isEssentialForSix: true,
        suggestedNotes: 'Въпроси за локацията, размера на наема с консумативите (Warmmiete) и оглед (Besichtigung).',
      },
      {
        id: 'de-a2-11-world-chk-2',
        requirement: 'Речник по темата „Транспорт и безопасност на движението“',
        whyNeeded: 'Необходим при задачите за слушане (съобщения за трафик) и четене.',
        isEssentialForSix: false,
        suggestedNotes: 'umsteigen, die Verspätung, der Anschlusszug, sich anschnallen, der Zebrastreifen, der Radweg.',
      },
    ],
    flashcards: [
      { id: 'de-a2-11-world-fc-1', front: 'Какво означава съкращението die WG (Wohngemeinschaft)?', back: 'Съквартирантско жилище, в което няколко студенти или млади хора делят наема.', tag: 'Жилище' },
      { id: 'de-a2-11-world-fc-2', front: 'Как е „наем“ и „разходи за консумативи“?', back: 'die Miete / die Nebenkosten', tag: 'Жилище' },
      { id: 'de-a2-11-world-fc-3', front: 'Как е „прекачвам се“ и „закъснение“ в транспорта?', back: 'umsteigen / die Verspätung', tag: 'Транспорт' },
      { id: 'de-a2-11-world-fc-4', front: 'Как е „слагам си предпазния колан“ в кола?', back: 'sich anschnallen', tag: 'Безопасност' },
      { id: 'de-a2-11-world-fc-5', front: 'Как е „на третия етаж“ и „на партера“?', back: 'im dritten Stock / im Erdgeschoss', tag: 'Жилище' },
      { id: 'de-a2-11-world-fc-6', front: 'Как е „пешеходна зона“?', back: 'die Fußgängerzone', tag: 'Град' },
    ],
    quiz: [
      {
        id: 1,
        question: 'В обява за квартира четете: „Helles Zimmer in 3er-WG, 350 € inkl. NK.“ Какво означава съкращението NK?',
        options: ['Neue Küche', 'Nebenkosten', 'Nachbarkinder', 'Nordküste'],
        correctIndex: 1,
        explanation: 'NK означава Nebenkosten (допълнителни разходи за ток, вода, отопление).',
      },
      {
        id: 2,
        question: 'Попълнете: Am Alexanderplatz müssen Sie in die U-Bahn-Linie 2 ___.',
        options: ['einsteigen', 'umsteigen', 'aussteigen', 'aufsteigen'],
        correctIndex: 1,
        explanation: 'Когато сменяме едно превозно средство с друго (in die Linie 2), се прекачваме — umsteigen.',
      },
      {
        id: 3,
        question: 'Попълнете: Unsere Wohnung liegt ___ zweiten Stock eines modernen Hauses.',
        options: ['auf dem', 'im', 'an dem', 'in den'],
        correctIndex: 1,
        explanation: 'За етаж на въпроса Wo? се използва предлогът in + dem = im zweiten Stock.',
      },
      {
        id: 4,
        question: 'Кое правило се отнася за безопасността на пътя в автомобил?',
        options: [
          'Man muss sich vor der Fahrt immer anschnallen.',
          'Man soll bei Rot über die Straße laufen.',
          'Man darf auf der Autobahn Fahrrad fahren.',
          'Man muss im Auto einen Fahrradhelm tragen.',
        ],
        correctIndex: 0,
        explanation: 'Преди пътуване с автомобил всеки пътник трябва да си постави предпазния колан (sich anschnallen).',
      },
      {
        id: 5,
        question: 'Попълнете: Mit ___ öffentlichen Verkehrsmitteln kommt man schnell ins Zentrum.',
        options: ['die', 'der', 'den', 'dem'],
        correctIndex: 2,
        explanation: 'Предлогът mit изисква Dativ; в множествено число определителният член е den, а прилагателното взима -en.',
      },
      {
        id: 6,
        question: 'Какво означава прилагателното möbliert в обява за апартамент?',
        options: ['обзаведен с мебели', 'наскоро боядисан', 'с гараж', 'без отопление'],
        correctIndex: 0,
        explanation: 'Möbliert означава обзаведен с мебели.',
      },
    ],
    quickQuestions: ['Как да разчета обява за квартира в Германия?', 'Как да обясня маршрут с прекачване в градския транспорт?', 'Кои са основните изрази за пътна безопасност?'],
  },
  {
    ...base,
    id: 'de-a2-11-everyday-life',
    monTopicIds: ids('3'),
    title: 'Немски A2 (XI–XII): Всекидневие — дневен режим, свободно време, пазаруване, кореспонденция и професии',
    originalNoteExcerpt:
      'Тематична област „Всекидневие“: дневен режим; свободно време (хоби, спорт, музика); пазаруване и услуги; общуване (срещи, покани, поздравления, кореспонденция, разговори по телефона); професии и социални контакти. Писане: лично и официално писмо/имейл (100–120 думи).',
    summary: {
      overview:
        'Организираме времето си между училище, хобита и почасова работа, пазаруваме в магазини и онлайн, водим лична и официална кореспонденция и обсъждаме избора на професия.',
      keyPoints: [
        'Дневен режим и баланс със свободното време: der Alltag, sich die Zeit einteilen — разпределям си времето, einen Nebenjob / Ferienjob haben — имам почасова/лятна работа, Taschengeld verdienen — изкарвам си джобни пари, sich am Wochenende mit Freunden treffen.',
        'Пазаруване и услуги (в магазина и онлайн): im Supermarkt / im Einkaufszentrum / online bestellen; die Lieferung — доставка, die Rechnung bezahlen, reklamieren / umtauschen — правя рекламация / заменям стока, die Quittung / der Kassenbon — касова бележка, Garantie haben.',
        'Лична и официална кореспонденция: В лично писмо — Lieber Tim, / Liebe Lisa, … Viele Grüße; в официално писмо/имейл (до институция, хотел, работодател) — Sehr geehrte Damen und Herren, / Sehr geehrter Herr Müller, / Sehr geehrte Frau Weber, … Mit freundlichen Grüßen (с учтивата форма Sie/Ihnen/Ihr).',
        'Професии и кандидатстване (Berufe und Bewerbung): sich um eine Stelle / ein Praktikum bewerben — кандидатствам за позиция/стаж, das Bewerbungsschreiben — мотивационно писмо, das Vorstellungsgespräch — интервю за работа, gute Arbeitsbedingungen, Erfahrungen sammeln — трупам опит.',
        'Примерен официален имейл (100 думи): Sehr geehrte Damen und Herren, / im Internet habe ich Ihre Anzeige für einen Ferienjob in Ihrem Buchladen gelesen. Ich bin 17 Jahre alt, besuche die 11. Klasse und spreche sehr gut Deutsch und Englisch. Da ich sehr gern lese und freundlich mit Kunden umgehe, möchte ich mich um diese Stelle bewerben. Könnten Sie mir bitte mitteilen, wie die Arbeitszeiten sind? Über eine Einladung zu einem Gespräch freue ich mich sehr. / Mit freundlichen Grüßen / Viktor Petrow.',
      ],
      examGoldenRule:
        'В официално писмо винаги спазвай съответствието между обръщение и поздрав: Sehr geehrte Damen und Herren (или Sehr geehrte Frau / Sehr geehrter Herr …) се комбинира само с Mit freundlichen Grüßen и учтивите местоимения Sie, Ihnen, Ihr с главна буква.',
      commonTraps: [
        'При обръщение към мъж в официално писмо се пише Sehr geehrter Herr (+ фамилия), а към жена — Sehr geehrte Frau (+ фамилия).',
        'След съюза da („тъй като“ — по-официален синоним на weil) глаголът също стои на последно място в подчиненото изречение.',
      ],
      formulasOrDates: [
        { label: 'Официално начало', value: 'Sehr geehrte Damen und Herren, / Sehr geehrter Herr …, / Sehr geehrte Frau …,' },
        { label: 'Официален край', value: 'Mit freundlichen Grüßen + пълно име' },
        { label: 'Кандидатстване', value: 'sich um eine Stelle / ein Praktikum bewerben (bei + Dat.)' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-11-day-chk-1',
        requirement: 'Официален имейл за кандидатстване за лятна работа или стаж (100–120 думи)',
        whyNeeded: 'Официалното писмо в обем 100–120 думи е изрично заложено в програмата за XI–XII клас.',
        isEssentialForSix: true,
        suggestedNotes: 'Sehr geehrte Damen und Herren, повод за писане, кратко представяне, въпрос за условията, Mit freundlichen Grüßen.',
      },
      {
        id: 'de-a2-11-day-chk-2',
        requirement: 'Диалог за замяна или рекламация на дефектна стока в магазин',
        whyNeeded: 'Практическа ситуация от подтемата „Пазаруване и услуги“.',
        isEssentialForSix: false,
        suggestedNotes: 'Ich habe gestern… gekauft, aber es funktioniert nicht. Ich möchte es umtauschen. Hier ist der Kassenbon.',
      },
    ],
    flashcards: [
      { id: 'de-a2-11-day-fc-1', front: 'Как започва официално писмо, когато не знаем името на получателя?', back: 'Sehr geehrte Damen und Herren,', tag: 'Кореспонденция' },
      { id: 'de-a2-11-day-fc-2', front: 'Как завършва всяко официално писмо на немски?', back: 'Mit freundlichen Grüßen', tag: 'Кореспонденция' },
      { id: 'de-a2-11-day-fc-3', front: 'Как е „кандидатствам за място“ и „интервю за работа“?', back: 'sich um eine Stelle bewerben / das Vorstellungsgespräch', tag: 'Професии' },
      { id: 'de-a2-11-day-fc-4', front: 'Как е „заменям стока“ и „касова бележка“?', back: 'umtauschen / der Kassenbon (die Quittung)', tag: 'Пазаруване' },
      { id: 'de-a2-11-day-fc-5', front: 'Как е „почасова работа“ и „изкарвам джобни пари“?', back: 'der Nebenjob (Ferienjob) / Taschengeld verdienen', tag: 'Всекидневие' },
      { id: 'de-a2-11-day-fc-6', front: 'Как се обръщаме официално в писмо към г-н Шмит?', back: 'Sehr geehrter Herr Schmidt,', tag: 'Кореспонденция' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Кое обръщение е граматически правилно за начало на официален имейл до г-н Вагнер?',
        options: [
          'Sehr geehrte Herr Wagner,',
          'Sehr geehrter Herr Wagner,',
          'Sehr geehrten Herrn Wagner,',
          'Lieber geehrter Herr Wagner,',
        ],
        correctIndex: 1,
        explanation: 'В Nominativ за мъжки род след прилагателно без член окончанието е -er: Sehr geehrter Herr Wagner.',
      },
      {
        id: 2,
        question: 'Попълнете: Ich möchte mich ___ ein Sommerpraktikum in Ihrem Hotel bewerben.',
        options: ['auf', 'um', 'über', 'mit'],
        correctIndex: 1,
        explanation: 'Устойчивият глаголен израз е sich bewerben um + Akkusativ (кандидатствам за).',
      },
      {
        id: 3,
        question: 'Попълнете в официално писмо: Könnten Sie ___ bitte weitere Informationen schicken?',
        options: ['Ihnen', 'mir', 'mich', 'dir'],
        correctIndex: 1,
        explanation: 'Глаголът schicken изисква непряко допълнение в Dativ (на кого? — на мен = mir).',
      },
      {
        id: 4,
        question: 'Купили сте яке, но размерът не отговаря. Какво ще кажете на продавача?',
        options: [
          'Ich möchte die Jacke bitte gegen eine größere umtauschen.',
          'Ich möchte die Jacke bitte kochen und waschen.',
          'Ich möchte mich bei der Jacke entschuldigen.',
          'Ich möchte die Umkleidekabine kaufen.',
        ],
        correctIndex: 0,
        explanation: 'Umtauschen означава заменям стока (напр. за по-голям размер).',
      },
      {
        id: 5,
        question: 'Какво означава думата „das Vorstellungsgespräch“?',
        options: ['театрално представление', 'интервю за работа', 'телефонен указател', 'родителска среща'],
        correctIndex: 1,
        explanation: 'Das Vorstellungsgespräch е събеседване / интервю при кандидатстване за работа или стаж.',
      },
      {
        id: 6,
        question: 'Кой заключителен поздрав е задължителен в официално писмо до институция?',
        options: ['Viele Küsse', 'Bis bald', 'Mit freundlichen Grüßen', 'Dein bester Freund'],
        correctIndex: 2,
        explanation: 'Mit freundlichen Grüßen е стандартната формула за край на официално писмо.',
      },
    ],
    quickQuestions: ['Каква е разликата между лично и официално писмо на немски?', 'Как да напиша имейл за кандидатстване за лятна работа?', 'Как да поискам замяна на покупка в магазин?'],
  },
  {
    ...base,
    id: 'de-a2-11-health',
    monTopicIds: ids('4'),
    title: 'Немски A2 (XI–XII): Здраве и здравословен начин на живот — тяло, хранене, спорт и медицинска помощ',
    originalNoteExcerpt:
      'Тематична област „Здраве и здравословен начин на живот“: човешкото тяло; здравословно хранене (хранителни продукти, кулинарни рецепти); здравословен начин на живот и спорт; здравен статус и медицинско обслужване.',
    summary: {
      overview:
        'Обсъждаме балансираното хранене, активния начин на живот и справянето със стреса при младите хора, както и общуването при лекар, зъболекар и в аптека.',
      keyPoints: [
        'Тяло и здравен статус: sich wohl/fit/müde/erschöpft fühlen — чувствам се добре/във форма/уморен/изтощен; Schmerzen haben, erkältet sein, eine Allergie haben, sich verletzen — наранявам се (beim Sport).',
        'Медицинско обслужване (Medizinische Versorgung): einen Termin beim Arzt / Zahnarzt vereinbaren — записвам час при лекар/зъболекар, die Krankenversicherung / die Europäische Krankenversicherungskarte — здравна застраховка / Европейска здравноосигурителна карта (ЕЗОК), die Sprechstunde — приемно време, das Rezept einlösen — изпълнявам рецепта в аптеката.',
        'Здравословно хранене и кулинария: eine ausgewogene Ernährung — балансирано хранене, hausgemachtes Essen statt Fertiggerichte (домашна храна вместо полуфабрикати), viel Flüssigkeit trinken, Zutaten frisch zubereiten (waschen, schneiden, dünsten — задушавам, backen).',
        'Спорт и превенция на стреса: regelmäßig Sport treiben (joggen, schwimmen, ins Fitnessstudio gehen, Yoga machen), Stress abbauen — разтоварвам стреса, genügend Schlaf bekommen, auf ungesunde Gewohnheiten verzichten — отказвам се от вредни навици.',
        'Примерен текст: Vor den Prüfungen haben viele Schüler Stress und schlafen zu wenig. Um gesund und konzentriert zu bleiben, versuche ich, dreimal pro Woche Sport zu treiben und mich ausgewogen zu ernähren. Ich koche gern selbst schnelle Gerichte mit viel Gemüse. Wenn man sich regelmäßig bewegt, baut man Stress ab und fühlt sich viel besser.',
      ],
      examGoldenRule:
        'Когато записваш час по телефона при лекар в Германия или Австрия, използвай фразата: Ich möchte bitte einen Termin bei Herrn/Frau Dr. … vereinbaren. Wann haben Sie einen freien Termin?',
      commonTraps: [
        'Глаголът sich fühlen е възвратен и се съчетава с прилагателно без окончание: Ich fühle mich heute gut / müde.',
        'Глаголът verzichten (отказвам се от) изисква предлога auf + Akkusativ: Ich verzichte auf Zucker und Fast Food.',
      ],
      formulasOrDates: [
        { label: 'Записване на час', value: 'einen Termin beim Arzt vereinbaren / absagen (отменям)' },
        { label: 'Баланс и превенция', value: 'sich ausgewogen ernähren | Stress abbauen | sich fit halten' },
        { label: 'Отказ от вреден навик', value: 'auf Süßigkeiten / Fast Food verzichten (auf + Akk.)' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-11-health-chk-1',
        requirement: 'Свързан текст „Wie halte ich mich im Schulalltag fit?“ (100–120 думи)',
        whyNeeded: 'Покрива очаквания резултат за писмено описание по темата за здравословния начин на живот.',
        isEssentialForSix: true,
        suggestedNotes: 'Хранене (ausgewogene Ernährung), спорт, сън и справяне с изпитния стрес.',
      },
      {
        id: 'de-a2-11-health-chk-2',
        requirement: 'Диалог за записване или промяна на час при лекар по телефона',
        whyNeeded: 'Комбинира телефонно общуване и медицинско обслужване.',
        isEssentialForSix: false,
        suggestedNotes: 'Praxis Dr. Klein, guten Tag! — Ich möchte einen Termin vereinbaren…',
      },
    ],
    flashcards: [
      { id: 'de-a2-11-health-fc-1', front: 'Как е „записвам час при лекар“ и „приемно време“?', back: 'einen Termin beim Arzt vereinbaren / die Sprechstunde', tag: 'Медицина' },
      { id: 'de-a2-11-health-fc-2', front: 'Как е „балансирано хранене“ и „полуфабрикати“?', back: 'ausgewogene Ernährung / Fertiggerichte', tag: 'Хранене' },
      { id: 'de-a2-11-health-fc-3', front: 'Как е „разтоварвам стреса“?', back: 'Stress abbauen', tag: 'Здраве' },
      { id: 'de-a2-11-health-fc-4', front: 'Как е „отказвам се от захар“ на немски?', back: 'auf Zucker verzichten (auf + Akk.)', tag: 'Глаголи' },
      { id: 'de-a2-11-health-fc-5', front: 'Как е „здравна застраховка“?', back: 'die Krankenversicherung', tag: 'Медицина' },
      { id: 'de-a2-11-health-fc-6', front: 'Как е „нараних се по време на спорт“?', back: 'Ich habe mich beim Sport verletzt.', tag: 'Тяло' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Guten Tag, ich möchte bitte für morgen einen Termin beim Zahnarzt ___.',
        options: ['untersuchen', 'vereinbaren', 'verschreiben', 'verletzen'],
        correctIndex: 1,
        explanation: 'Einen Termin vereinbaren означава „уговорям / записвам час“.',
      },
      {
        id: 2,
        question: 'Попълнете: Für eine gesunde Ernährung sollte man ___ zuckerhaltige Getränke verzichten.',
        options: ['von', 'über', 'auf', 'mit'],
        correctIndex: 2,
        explanation: 'Глаголът verzichten изисква предлога auf + Akkusativ.',
      },
      {
        id: 3,
        question: 'Какво означава думата „die Sprechstunde“ на табелата на лекарски кабинет?',
        options: ['приемно време за пациенти', 'уроци по чужд език', 'аптека за спешна помощ', 'линейка'],
        correctIndex: 0,
        explanation: 'Die Sprechstunde е приемното време на лекаря.',
      },
      {
        id: 4,
        question: 'Попълнете: Regelmäßige Bewegung an der frischen Luft hilft mir, nach der Schule Stress ___.',
        options: ['abzubauen', 'zu abbauen', 'abgebaut', 'abbauen zu'],
        correctIndex: 0,
        explanation: 'При делимия глагол abbauen частицата zu застава между представката и корена: abzubauen.',
      },
      {
        id: 5,
        question: 'Попълнете: Mein Bruder hat ___ beim Fußballspielen am Knie verletzt.',
        options: ['mich', 'dich', 'sich', 'uns'],
        correctIndex: 2,
        explanation: 'За 3 л. ед.ч. (mein Bruder -> er) възвратното местоимение е sich.',
      },
      {
        id: 6,
        question: 'Коя дума назовава готови пакетирани храни за бързо притопляне (полуфабрикати)?',
        options: ['die Fertiggerichte', 'die Vollkornprodukte', 'die Heilkräuter', 'die Milchprodukte'],
        correctIndex: 0,
        explanation: 'Die Fertiggerichte са готови полуфабрикати.',
      },
    ],
    quickQuestions: ['Как да си запиша час при лекар на немски?', 'Как да опиша здравословните си навици и справянето със стреса?', 'Кой предлог се използва след глагола verzichten?'],
  },
  {
    ...base,
    id: 'de-a2-11-nature',
    monTopicIds: ids('5'),
    title: 'Немски A2 (XI–XII): Природа и екология — климат, биоразнообразие и опазване на околната среда',
    originalNoteExcerpt:
      'Тематична област „Природа и екология“: времето, сезони, климат; растения, животни; географски обекти; опазване на околната среда. Граматика: подчинени изречения за причина и цел (weil, da, um … zu, damit), модални глаголи.',
    summary: {
      overview:
        'Разглеждаме промените в климата, природните забележителности и растителния и животинския свят и обсъждаме екологичните навици във всекидневието.',
      keyPoints: [
        'Климат и метеорологични явления: das gemäßigte / kontinentale / mediterrane Klima, der Klimawandel — изменение на климата, die Hitze / die Hitzewelle — гореща вълна, die Dürre — суша, das Hochwasser — наводнение, der Sturm.',
        'Природа, растения и животни: der Nationalpark, das Naturschutzgebiet — резерват, bedrohte Tierarten schützen — защитавам застрашени животински видове, Bäume pflanzen, die Wälder vor Bränden schützen.',
        'Екология във всекидневието (Umweltschutz im Alltag): Müll vermeiden und recyceln, Pfandflaschen zurückgeben — връщам бутилки за амбалаж (депозитна система в Германия), Strom und Wasser sparen, regionale und saisonale Produkte kaufen, öffentliche Verkehrsmittel nutzen.',
        'Изречения за цел — um … zu срещу damit: Когато подлогът в главното и подчиненото изречение е един и същ, използваме um … zu + Infinitiv (Ich kaufe regionale Produkte, um die Umwelt zu schützen). Когато подлозите са различни, използваме съюза damit с глагол в края (Die Stadt baut neue Radwege, damit die Bürger öfter Fahrrad fahren).',
        'Примерен текст: Der Umweltschutz beginnt im Alltag. In Deutschland gibt es das Pfandsystem: Man bringt leere Flaschen in den Supermarkt zurück, damit sie wiederverwendet werden. Auch wir können viel tun, um Energie und Ressourcen zu sparen. Ich benutze zum Beispiel eine wiederverwendbare Wasserflasche und kaufe keine Plastiktüten mehr.',
      ],
      examGoldenRule:
        'Избирай между um … zu и damit според подлога: ако вършителят е един и същ -> um … zu + инфинитив; ако вършителите в двете части са различни -> damit + подлог + спрегнат глагол в края.',
      commonTraps: [
        'След um … zu никога не се слага модалният глагол wollen или möchten (целта вече е изразена от самата конструкция um … zu).',
        'Съществителното der Müll (боклук/отпадъци) се използва само в единствено число: den Müll trennen.',
      ],
      formulasOrDates: [
        { label: 'Един и същ подлог (цел)', value: 'Ich spare Strom, um die Natur zu schützen.' },
        { label: 'Различни подлози (цел)', value: 'Wir pflanzen Bäume, damit die Luft sauberer wird.' },
        { label: 'Еко навици', value: 'Müll recyceln | Pfandflaschen zurückgeben | Energie sparen' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-11-nature-chk-1',
        requirement: 'Кратък текст „Was kann jeder von uns für die Umwelt tun?“ (100–120 думи)',
        whyNeeded: 'Честа тема за писмено изпитване в XI–XII клас.',
        isEssentialForSix: true,
        suggestedNotes: 'Поне 2 изречения с um … zu и 1 изречение с damit.',
      },
      {
        id: 'de-a2-11-nature-chk-2',
        requirement: 'Сравнителни примери за um … zu и damit',
        whyNeeded: 'Предотвратява смесването на двете конструкции за цел.',
        isEssentialForSix: true,
        suggestedNotes: 'Еднакви подлози -> um … zu; различни подлози -> damit.',
      },
    ],
    flashcards: [
      { id: 'de-a2-11-nature-fc-1', front: 'Как е „изменение на климата“ и „природен резерват“?', back: 'der Klimawandel / das Naturschutzgebiet', tag: 'Екология' },
      { id: 'de-a2-11-nature-fc-2', front: 'Какво означава думата „die Pfandflasche“ в Германия?', back: 'Бутилка с депозит (амбалаж), която се връща в магазина срещу възстановяване на сумата.', tag: 'Странознание' },
      { id: 'de-a2-11-nature-fc-3', front: 'Кога за цел се използва damit вместо um … zu?', back: 'Когато главното и подчиненото изречение имат различни подлози.', tag: 'Граматика' },
      { id: 'de-a2-11-nature-fc-4', front: 'Как е „застрашени животински видове“?', back: 'bedrohte Tierarten', tag: 'Природа' },
      { id: 'de-a2-11-nature-fc-5', front: 'Как е „наводнение“ и „гореща вълна“?', back: 'das Hochwasser / die Hitzewelle', tag: 'Климат' },
      { id: 'de-a2-11-nature-fc-6', front: 'Как е „бутилка за многократна употреба“?', back: 'eine wiederverwendbare Flasche', tag: 'Екология' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Unsere Schule organisiert eine Öko-Woche, ___ die Schüler mehr über Recycling lernen.',
        options: ['um', 'damit', 'weil', 'denn'],
        correctIndex: 1,
        explanation: 'Подлозите са различни (unsere Schule и die Schüler), затова за цел използваме съюза damit.',
      },
      {
        id: 2,
        question: 'Попълнете: Ich gehe zu Fuß zum Supermarkt, ___ kein Benzin zu verbrauchen.',
        options: ['damit', 'dass', 'um', 'weil'],
        correctIndex: 2,
        explanation: 'Втората част съдържа инфинитив със zu (zu verbrauchen), което изисква конструкцията um … zu.',
      },
      {
        id: 3,
        question: 'Какво прави човек в Германия, когато връща Pfandflaschen в супермаркета?',
        options: [
          'Връща празни бутилки в автомат за рециклиране и получава обратно депозита си.',
          'Купува лекарства без рецепта.',
          'Резервира билети за влак.',
          'Плаща сметката си за електричество.',
        ],
        correctIndex: 0,
        explanation: 'Депозитната система (Pfandsystem) насърчава връщането и рециклирането на опаковки от напитки.',
      },
      {
        id: 4,
        question: 'Коя дума означава „природен резерват / защитена територия“?',
        options: ['das Naturschutzgebiet', 'das Einkaufszentrum', 'das Industriegebiet', 'das Wohnviertel'],
        correctIndex: 0,
        explanation: 'Der Naturschutz (опазване на природата) + das Gebiet (територия) = das Naturschutzgebiet.',
      },
      {
        id: 5,
        question: 'Попълнете: Im Pirin-Gebirge gibt es viele seltene Pflanzen und geschützte ___.',
        options: ['Tierarten', 'Haustiere', 'Stofftaschen', 'Abgase'],
        correctIndex: 0,
        explanation: 'Geschützte Tierarten означава защитени животински видове.',
      },
      {
        id: 6,
        question: 'Попълнете: Nach dem tagelangen starken Regen gab es in vielen Dörfern an der Donau ___.',
        options: ['Dürre', 'Hochwasser', 'Sonnenschein', 'Trockenheit'],
        correctIndex: 1,
        explanation: 'След многодневни проливни дъждове край река възниква наводнение — das Hochwasser.',
      },
    ],
    quickQuestions: ['Кога се пише um … zu и кога damit?', 'Как работи системата за депозит на бутилки (Pfand) в Германия?', 'Как да напиша текст за екологичните навици в ежедневието?'],
  },
  {
    ...base,
    id: 'de-a2-11-homeland-and-world',
    monTopicIds: ids('6'),
    title: 'Немски A2 (XI–XII): Моята родина и светът — туризъм, културно наследство и принос към света',
    originalNoteExcerpt:
      'Тематична област „Моята родина и светът“: празници и традиции; туризъм и пътуване; културно-исторически забележителности; принос на моята родина и страните на изучавания език към световното наследство. Граматика: Präteritum при биографични факти, относителни местоимения в Nominativ и Akkusativ (базово), предлози за място и време.',
    summary: {
      overview:
        'Представяме културно-историческите забележителности и традиции на България пред чужденци, планираме самостоятелни пътувания в немскоезичните страни и говорим за приноса на България и D-A-CH към световната наука и култура.',
      keyPoints: [
        'Самостоятелно пътуване и настаняване: eine Unterkunft buchen (Hotel, Hostel, Ferienwohnung), der Flug / die Bordkarte, das Gepäck aufgeben, die Rezeption (einchecken / auschecken), eine Führung mitmachen — включвам се в обиколка с екскурзовод, Eindrücke sammeln.',
        'Културно-историческо наследство на България: das Rila-Kloster, die Felskirchen von Iwanowo, das thrakische Grabmal von Kasanlak, die Altstadt von Nessebar, das Rosenfest im Rosental, die kyrillische Schrift (seit 2007 drittes offizielles Alphabet der Europäischen Union).',
        'Принос на немскоезичните страни към световното наследство: книгопечатането (Johannes Gutenberg — der Buchdruck), класическата музика (Bach, Beethoven, Mozart), литературата и философията (Goethe, Schiller, Kant), науката и техниката (Albert Einstein, Robert Koch, Carl Benz — das Automobil).',
        'Свързване на описания с относителни местоимения (Relativsätze в Nom. и Akk.): Относителното местоимение съвпада по форма с определителния член (der, die, das, प्ल. die; в м.р. Akk. den) и изпраща глагола в края: Das ist das Museum, das wir gestern besichtigt haben. Das ist der Wissenschaftler, der das Auto erfunden hat.',
        'Примерен текст: Bulgarien hat ein reiches Kulturerbe, das viele Touristen aus den deutschsprachigen Ländern anzieht. Besonders berühmt sind das Rila-Kloster und das Tal der Rosen, wo jedes Jahr im Juni das Rosenfest stattfindet.Ein wichtiger Beitrag Bulgariens zur europäischen Kultur ist das kyrillische Alphabet, das heute von Millionen Menschen genutzt wird.',
      ],
      examGoldenRule:
        'В относително изречение (Relativsatz) родът и числото на местоимението (der/die/das) зависят от съществителното пред запетаята, но падежът му зависи от ролята му ВЪТРЕ в подчиненото изречение.',
      commonTraps: [
        'В относително изречение спрегнатият глагол стои винаги на последно място: die Stadt, die ich letzten Sommer besucht habe.',
        'На немски „кирилица“ е das kyrillische Alphabet или die kyrillische Schrift.',
      ],
      formulasOrDates: [
        { label: 'Относително изречение (Nom.)', value: 'der Mann, der… | die Stadt, die… | das Kloster, das…' },
        { label: 'Относително изречение (Akk.)', value: 'der Film, den ich gesehen habe' },
        { label: 'Културен принос', value: 'einen wichtigen Beitrag zum Weltkulturerbe leisten' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-11-world2-chk-1',
        requirement: 'Текст за представяне на българска забележителност или празник пред германски връстници (100–120 думи)',
        whyNeeded: 'Пряко покрива очаквания резултат по темата „Моята родина и светът“.',
        isEssentialForSix: true,
        suggestedNotes: 'Местоположение, история, какво може да се види/преживее, поне 2 относителни изречения.',
      },
      {
        id: 'de-a2-11-world2-chk-2',
        requirement: 'Кратка справка за трима известни учени или творци от немскоезичните страни',
        whyNeeded: 'За социокултурна компетентност по програмата на МОН.',
        isEssentialForSix: false,
        suggestedNotes: 'Johannes Gutenberg (Buchdruck), Wolfgang Amadeus Mozart (Musik), Albert Einstein (Physik).',
      },
    ],
    flashcards: [
      { id: 'de-a2-11-world2-fc-1', front: 'Как е „резервирам настаняване“ и „обиколка с екскурзовод“?', back: 'eine Unterkunft buchen / eine Führung', tag: 'Туризъм' },
      { id: 'de-a2-11-world2-fc-2', front: 'Как е „Долината на розите“ и „кирилицата“ на немски?', back: 'das Rosental (das Tal der Rosen) / das kyrillische Alphabet', tag: 'България' },
      { id: 'de-a2-11-world2-fc-3', front: 'Кой германски изобретател създава книгопечатането през XV век?', back: 'Johannes Gutenberg (der Buchdruck)', tag: 'Странознание' },
      { id: 'de-a2-11-world2-fc-4', front: 'Попълни относителното местоимение: Das ist der Roman, ___ ich gerade lese.', back: 'den (м.р. Akkusativ — кого/какво чета?)', tag: 'Граматика' },
      { id: 'de-a2-11-world2-fc-5', front: 'Как е „давам принос към световното наследство“?', back: 'einen Beitrag zum Weltkulturerbe leisten', tag: 'Култура' },
      { id: 'de-a2-11-world2-fc-6', front: 'Къде стои глаголът в относителното подчинено изречение?', back: 'На последно място.', tag: 'Синтаксис' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Das Rila-Kloster ist ein berühmtes Denkmal, ___ jedes Jahr von Tausenden Touristen besucht wird.',
        options: ['der', 'die', 'das', 'den'],
        correctIndex: 2,
        explanation: 'Съществителното das Denkmal е от среден род и в подчиненото изречение е подлог (Nominativ) -> das.',
      },
      {
        id: 2,
        question: 'Попълнете: Das ist der Reiseführer, ___ ich mir für unsere Fahrt nach Wien gekauft habe.',
        options: ['der', 'dem', 'den', 'das'],
        correctIndex: 2,
        explanation: 'Der Reiseführer е мъжки род, а в подчиненото изречение е пряко допълнение (Akkusativ на kaufen) -> den.',
      },
      {
        id: 3,
        question: 'С кое изобретение Йоханес Гутенберг допринася за световната история?',
        options: [
          'С изобретяването на книгопечатането с подвижни букви (der Buchdruck)',
          'С конструирането на първия самолет',
          'С откриването на пеницилина',
          'С композирането на Деветата симфония',
        ],
        correctIndex: 0,
        explanation: 'Йоханес Гутенберг от Майнц изобретява европейското книгопечатане с подвижни метални букви.',
      },
      {
        id: 4,
        question: 'Какво означава глаголът „einchecken“ в хотел или на летище?',
        options: ['регистрирам се при пристигане', 'отменям резервацията си', 'разглеждам музей', 'обменям валута'],
        correctIndex: 0,
        explanation: 'Einchecken означава регистриране при настаняване в хотел или за полет на летище (обратното е auschecken).',
      },
      {
        id: 5,
        question: 'Кое твърдение за българската писменост е вярно и подходящо за представяне пред чужденци?',
        options: [
          'Seit 2007 ist das kyrillische Alphabet das dritte offizielle Alphabet der Europäischen Union.',
          'In Bulgarien schreibt man offiziell nur mit dem lateinischen Alphabet.',
          'Der Tag der slawischen Schrift wird in Bulgarien am 31. Dezember gefeiert.',
          'Das kyrillische Alphabet wurde im 20. Jahrhundert in Berlin erfunden.',
        ],
        correctIndex: 0,
        explanation: 'С влизането на България в ЕС през 2007 г. кирилицата става третата официална азбука на Европейския съюз.',
      },
      {
        id: 6,
        question: 'Попълнете: Wir haben im Museum an einer interessanten ___ auf Deutsch teilgenommen.',
        options: ['Führung', 'Fahrkarte', 'Rezeption', 'Kreuzung'],
        correctIndex: 0,
        explanation: 'Eine Führung в музей означава обиколка с екскурзовод.',
      },
    ],
    quickQuestions: ['Как да представя България на немски език?', 'Как се образуват относителни изречения с der, die, das, den?', 'Кои са най-известните германски и австрийски приноси към световната култура?'],
  },
  {
    ...base,
    id: 'de-a2-11-skills',
    monTopicIds: ids('skills'),
    title: 'Немски A2 (XI–XII клас): Слушане, четене, говорене и писане — комуникативни стратегии и формати',
    originalNoteExcerpt:
      'Очаквани резултати по четирите умения за ниво A2 (XI–XII клас): разбиране на основната информация и детайли в автентични текстове (до 2 минути при слушане) и адаптирани научнопопулярни текстове при четене; участие в разговор, изразяване на мнение и кратко изложение при говорене; попълване на формуляр (Europass) и писане на лично и официално писмо и описание (100–120 думи).',
    summary: {
      overview:
        'Обобщаваме изискванията на програмата за XI–XII клас (ниво A2) по четирите умения, с акцент върху текстовете до 100–120 думи, официалната кореспонденция и разбирането на автентични материали.',
      keyPoints: [
        'Слушане (Hörverstehen — текстове до 2 минути): Разбираш общия смисъл и конкретни детайли в съобщения на обществени места, реклами, прогнози за времето и кратки интервюта. Следи за коригиращи изрази в диалога (Eigentlich wollte ich…, aber dann… / Nein, besser am Donnerstag).',
        'Четене (Leseverstehen): Извличаш основна и специфична информация от лични и официални писма, обяви за работа и жилище, туристически брошури и кратки научнопопулярни текстове. Използвай контекста, интернационализмите и словообразуването (представки un-, मिस-, суфикси -ung, -keit, -schaft), за да разпознаваш непознати думи.',
        'Говорене (Sprechen): Участваш в разговор по житейски теми (планиране на събитие, избор на професия, пазаруване, пътуване), изразяваш и обосноваваш мнение (Ich bin der Ansicht, dass…, weil…) и правиш кратко монологично изложение по предварително зададени опорни точки.',
        'Писане (Schreiben — 100–120 думи): Създаваш три основни вида текст: (1) Личен имейл/писмо до приятел; (2) Официален имейл/писмо (запитване за курс, хотел или кандидатстване за стаж); (3) Попълване на Europass-Lebenslauf и кратко описание на човек, място или събитие.',
        'Сравнение на регистрите (du срещу Sie): В личен имейл — Liebe/r…, du/dein/dir, Schreib mir bald!, Viele Grüße; в официален имейл — Sehr geehrte Damen und Herren, Sie/Ihr/Ihnen, Ich bitte Sie um Information…, Über eine schnelle Antwort würde ich mich freuen, Mit freundlichen Grüßen.',
      ],
      examGoldenRule:
        'Преди да започнеш да пишеш текста от 100–120 думи, определи регистъра: към приятел пиши на du (неофициално), а към институция, фирма или непознат получател — винаги на Sie (официално). Никога не смесвай двата регистъра в един текст!',
      commonTraps: [
        'В официално писмо местоименията Sie (Вие), Ihnen (на Вас) и притежателното Ihr (Ваш) винаги се пишат с главна буква.',
        'Не превеждай буквално от български: за „Очаквам Вашия отговор“ на немски се пише Ich freue mich auf Ihre Antwort (не Ich warte Ihre Antwort).',
      ],
      formulasOrDates: [
        { label: 'Обем на писмен текст', value: '100–120 думи (лично или официално писмо / описание)' },
        { label: 'Учтиво запитване', value: 'Könnten Sie mir bitte mitteilen, ob / wann …?' },
        { label: 'Учтив финал', value: 'Über eine baldige Antwort freue ich mich. Mit freundlichen Grüßen' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-11-skills-chk-1',
        requirement: 'Двуколонна таблица „Личен имейл (du) срещу Официален имейл (Sie)“',
        whyNeeded: 'Разграничаването на двата регистъра е ключово изискване за XI–XII клас.',
        isEssentialForSix: true,
        suggestedNotes: 'Обръщение, въвеждащо изречение, молба/въпрос, заключително изречение и поздрав.',
      },
      {
        id: 'de-a2-11-skills-chk-2',
        requirement: 'Шаблон за съвместно планиране в устен диалог (предложение, реакция, компромис)',
        whyNeeded: 'За диалогичната част от устното изпитване.',
        isEssentialForSix: false,
        suggestedNotes: 'Ich schlage vor, dass wir… / Was hältst du davon? / Das ist eine gute Idee, aber… / Einverstanden!',
      },
    ],
    flashcards: [
      { id: 'de-a2-11-skills-fc-1', front: 'Какъв е препоръчителният обем на писмените текстове за ниво A2 в XI–XII клас?', back: '100–120 думи.', tag: 'Писане' },
      { id: 'de-a2-11-skills-fc-2', front: 'Как учтиво да попитаме в официален имейл „Бихте ли могли да ми съобщите…?“?', back: 'Könnten Sie mir bitte mitteilen, ob / wann …?', tag: 'Официално писмо' },
      { id: 'de-a2-11-skills-fc-3', front: 'Как се прави предложение в диалог („Предлагам да…“)?', back: 'Ich schlage vor, dass wir … / Wollen wir am Samstag …?', tag: 'Говорене' },
      { id: 'de-a2-11-skills-fc-4', front: 'Как се пита събеседникът „Какво мислиш за това?“?', back: 'Was meinst du dazu? / Was hältst du davon?', tag: 'Говорене' },
      { id: 'de-a2-11-skills-fc-5', front: 'Какъв род са всички съществителни със суфиксите -ung, -heit, -keit, -schaft?', back: 'Винаги женски род (die).', tag: 'Четене' },
      { id: 'de-a2-11-skills-fc-6', front: 'Как се казва „Съгласен съм!“ при постигане на уговорка в диалог?', back: 'Einverstanden! / Abgemacht!', tag: 'Говорене' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Кое изречение е подходящо за официален имейл до езикова школа в Берлин?',
        options: [
          'Hallo Leute, schickt mir mal schnell den Preis für den Kurs!',
          'Könnten Sie mir bitte mitteilen, wie viel der Sprachkurs im Juli kostet?',
          'Sag mir bitte, wann dein Kurs anfängt! Viele Küsse!',
          'Was hältst du davon, wenn ich morgen zu dir komme?',
        ],
        correctIndex: 1,
        explanation: 'Изречението използва учтивата форма (Könnten Sie mir bitte mitteilen…) и непряк въпрос със спрегнат глагол в края.',
      },
      {
        id: 2,
        question: 'От какъв граматичен род са съществителните die Ausbildung, die Gesundheit и die Freundschaft?',
        options: ['Мъжки род', 'Среден род', 'Женски род', 'Нямат определен род'],
        correctIndex: 2,
        explanation: 'Всички немски съществителни на -ung, -heit, -keit и -schaft са от женски род (die).',
      },
      {
        id: 3,
        question: 'Попълнете непрекия въпрос: Wissen Sie, wann der nächste Zug nach Salzburg ___?',
        options: ['fährt ab', 'abfährt', 'abfahren', 'gefahren ab'],
        correctIndex: 1,
        explanation: 'В непряк въпрос след wann делимата представка се слива с глагола на последно място: abfährt.',
      },
      {
        id: 4,
        question: 'Коя фраза е най-подходяща за правене на предложение при съвместно планиране с приятел?',
        options: [
          'Sehr geehrte Damen und Herren,',
          'Wie wäre es, wenn wir am Samstag zusammen ins Kino gehen?',
          'Mit freundlichen Grüßen',
          'Ich habe leider seit drei Tagen Fieber.',
        ],
        correctIndex: 1,
        explanation: '„Wie wäre es, wenn wir…“ (Какво ще кажеш да…) е естествена фраза за предложение в диалог.',
      },
      {
        id: 5,
        question: 'Попълнете в официално писмо: Ich interessiere mich sehr für ___ Angebot auf Ihrer Webseite.',
        options: ['dein', 'Ihr', 'euer', 'sein'],
        correctIndex: 1,
        explanation: 'В официална кореспонденция притежателното местоимение „Ваш“ за среден род (das Angebot) е Ihr с главна буква.',
      },
      {
        id: 6,
        question: 'Какво изразява представката un- в думи като ungesund, unhöflich и unpünktlich?',
        options: ['отрицание / противоположност', 'повторение на действието', 'умалителна форма', 'множествено число'],
        correctIndex: 0,
        explanation: 'Представката un- при прилагателни и съществителни изразява отрицание (като българското „не-“).',
      },
    ],
    quickQuestions: ['Как да напиша официално запитване на немски от 100–120 думи?', 'Как се образуват непреки въпроси с ob и W-въпросителна дума?', 'Кои суфикси ми помагат веднага да позная рода на думата?'],
  },
  {
    ...base,
    id: 'de-a2-11-grammar',
    monTopicIds: ids('grammar'),
    title: 'Немски A2 (XI–XII клас): Езикови знания — времена, модални форми, предлози и сложни подчинени изречения',
    originalNoteExcerpt:
      'Граматика за ниво A2 (XI–XII клас): склонение и степенуване на прилагателните; времена Präsens, Perfekt, Präteritum (на спомагателни, модални и чести глаголи), Futur I; учтиви форми с Konjunktiv II (möchte, könnte, würde); предлози с Dativ, Akkusativ и двойно управление; подчинени изречения с dass, weil, da, wenn, als, ob, um … zu, damit и относителни изречения.',
    summary: {
      overview:
        'Пълен преглед на граматичната система за ниво A2 в XI–XII клас: употреба на времената, учтиви молби с Konjunktiv II, управление на глаголи и предлози и видове подчинени изречения.',
      keyPoints: [
        'Времена и учтива наклонителност: Präsens (сегашно), Perfekt (основно минало за разговор и имейли), Präteritum (за war, hatte, модалните глаголи и в писмени разкази), Futur I (werden + Infinitiv). За учтиви молби и желания се използват формите ich möchte, ich hätte gern, könnten Sie…, würden Sie… (+ Infinitiv).',
        'Прилагателни след определителен, неопределителен и нулев член: der neue Laptop / ein neuer Laptop / kalter Kaffee; в Akkusativ м.р. винаги окончание -en (den neuen Laptop / einen neuen Laptop); в Dativ ед.ч. и мн.ч. след всеки член окончанието на прилагателното е винаги -en (mit einem guten Freund, in einer großen Stadt).',
        'Времеви съюзи wenn срещу als: За многократно действие в миналото, както и за настояще и бъдеще, се използва wenn (Immer wenn ich Zeit hatte, las ich ein Buch; Wenn ich 18 werde, mache ich den Führerschein). За ЕДНОКРАТНО събитие в миналото се използва само als (Als ich zehn Jahre alt war, sind wir nach Berlin gereist).',
        'Непреки въпроси (Indirekte Fragesätze): Вграждат се след фрази като Können Sie mir sagen, … / Ich möchte wissen, … При въпрос с въпросителна дума тя служи за връзка (…, wann der Kurs beginnt), а при въпрос без въпросителна дума („дали“) се използва съюзът ob (…, ob es noch freie Plätze gibt). Глаголът е в края!',
        'Обобщение на подчинените изречения с глагол в края: причина — weil, da; условие/време — wenn, als; цел — damit (и инфинитивното um … zu); допълнителни — dass, ob; определителни — относителни местоимения der, die, das, den, dem.',
      ],
      examGoldenRule:
        'В Dativ след определителен, неопределителен или притежателен член (dem, der, einem, einer, meinem, meiner…) прилагателното име ВИНАГИ завършва на -en — без нито едно изключение!',
      commonTraps: [
        'Не бъркай wenn и als за минало време: за еднократен момент или период в миналото („когато бях малък“, „когато пристигнахме“) е правилно единствено als.',
        'В непряк въпрос за „дали“ се пише ob, а НЕ wenn: Ich weiß nicht, ob er heute kommt.',
      ],
      formulasOrDates: [
        { label: 'Прилагателно в Dativ', value: 'mit dem neuen Bus | in einer schönen Stadt (винаги -en!)' },
        { label: 'als срещу wenn', value: 'als = еднократно в миналото | wenn = многократно / настояще / бъдеще' },
        { label: 'Непряк въпрос с ob', value: 'Könnten Sie mir sagen, ob das Zimmer frei ist?' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-a2-11-gram-chk-1',
        requirement: 'Таблица на всички подчинителни съюзи за ниво A2 със значение и пример',
        whyNeeded: 'Подчинените изречения носят висока тежест при оценяване на писмен текст.',
        isEssentialForSix: true,
        suggestedNotes: 'dass (че), ob (дали), weil/da (защото), wenn (ако/когато), als (когато — веднъж в мин.), damit (за да).',
      },
      {
        id: 'de-a2-11-gram-chk-2',
        requirement: 'Златното правило за окончание -en на прилагателните в Dativ с 5 примера',
        whyNeeded: 'Спестява най-честите падежни грешки след предлозите mit, in, aus, bei, zu, von, nach.',
        isEssentialForSix: true,
        suggestedNotes: 'mit meinem besten Freund, in einer kleinen Wohnung, zu einem guten Arzt…',
      },
    ],
    flashcards: [
      { id: 'de-a2-11-gram-fc-1', front: 'Кога за „когато“ в миналото се използва als и кога wenn?', back: 'als — за еднократно действие/период в миналото; wenn — за многократно повтарящо се действие.', tag: 'Съюзи' },
      { id: 'de-a2-11-gram-fc-2', front: 'Какво окончание получава прилагателното в Dativ след член или притежателно местоимение?', back: 'Винаги -en (напр. mit einem guten Freund, in der neuen Schule).', tag: 'Прилагателни' },
      { id: 'de-a2-11-gram-fc-3', front: 'Как се превежда „Не знам дали той има време“?', back: 'Ich weiß nicht, ob er Zeit hat.', tag: 'Непреки въпроси' },
      { id: 'de-a2-11-gram-fc-4', front: 'Кои три форми се използват най-често за учтива молба в официален разговор?', back: 'Ich möchte / Ich hätte gern / Könnten Sie bitte… (Würden Sie bitte…)', tag: 'Учтивост' },
      { id: 'de-a2-11-gram-fc-5', front: 'Каква е формата за Präteritum на глаголите wissen и denken за 1 л. ед.ч. (ich)?', back: 'ich wusste / ich dachte', tag: 'Глаголи' },
      { id: 'de-a2-11-gram-fc-6', front: 'Какъв е падежът след предлога trotz или wegen в стандартни изрази като trotz des Regens?', back: 'Genitiv (или разговорно Dativ): trotz des schlechten Wetters.', tag: 'Предлози' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: ___ ich letzten Sommer zum ersten Mal in Wien war, habe ich das Schloss Schönbrunn besucht.',
        options: ['Wenn', 'Als', 'Ob', 'Damit'],
        correctIndex: 1,
        explanation: 'Става дума за еднократно събитие в миналото (zum ersten Mal letzten Sommer), затова се използва съюзът als.',
      },
      {
        id: 2,
        question: 'Попълнете: Wir wohnen seit fünf Jahren in einer ___ Wohnung im Zentrum.',
        options: ['schöne', 'schönen', 'schöner', 'schönes'],
        correctIndex: 1,
        explanation: 'На въпроса Wo? предлогът in изисква Dativ; след неопределителния член einer прилагателното в Dativ винаги завършва на -en.',
      },
      {
        id: 3,
        question: 'Попълнете: Könnten Sie mir bitte sagen, ___ im Hotel noch ein Einzelzimmer frei ist?',
        options: ['wenn', 'dass', 'ob', 'als'],
        correctIndex: 2,
        explanation: 'Непряк въпрос със значение „дали“ се въвежда със съюза ob.',
      },
      {
        id: 4,
        question: 'Попълнете учтивата молба: ___ Sie mir bitte das Formular noch einmal schicken?',
        options: ['Könnten', 'Konnten', 'Kannst', 'Könnt'],
        correctIndex: 0,
        explanation: 'Формата за учтива молба с Sie е Konjunktiv II: Könnten Sie mir bitte… schicken?',
      },
      {
        id: 5,
        question: 'Попълнете: Ich habe leider nicht gewusst, ___ das Museum am Montag geschlossen ist.',
        options: ['ob', 'dass', 'weil', 'damit'],
        correctIndex: 1,
        explanation: 'След Ich habe nicht gewusst („Не знаех, че…“) се използва допълнителният съюз dass.',
      },
      {
        id: 6,
        question: 'Попълнете: Nach ___ langen Schultag gehe ich gern mit Freunden in den Park.',
        options: ['ein', 'einen', 'einem', 'einer'],
        correctIndex: 2,
        explanation: 'Предлогът nach винаги изисква Dativ; der Schultag е мъжки род -> nach einem langen Schultag.',
      },
    ],
    quickQuestions: ['Каква е разликата между als и wenn?', 'Защо в Dativ прилагателните винаги завършват на -en?', 'Кога в непряк въпрос пишем ob и кога dass?'],
  },
];
