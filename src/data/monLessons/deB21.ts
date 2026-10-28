import type { LessonData } from '../../types';

// Немски език, ниво B2.1 (XI–XII клас, интензивно/разширено изучаване) — по един урок за всяка тема от
// учебната програма на МОН (https://www.mon.bg/nfs/2018/08/up_ne_b2.1.pdf): четирите тематични области, уменията и
// езиковите знания. Обяснения на български, примери на немски; примерните текстове са написани за урока.

const base = { subject: 'Чужди езици (Немски, Френски, Испански)', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ne-b2.1:${num}`];

export const MON_LESSONS_DE_B21: LessonData[] = [
  {
    ...base,
    id: 'de-b21-modern-world',
    monTopicIds: ids('1'),
    title: 'Немски B2.1: Човекът в съвременния свят — предизвикателства на начина на живот, образование и кариера',
    originalNoteExcerpt:
      'Тематична област „Човекът в съвременния свят“: предизвикателства на съвременния начин на живот; образователни системи и професионална реализация. Писане: аргументативен текст с мнение и аргументи, официално писмо (200–250 думи). Граматика: функционална интеграция на времената, разширени причастни определения, номинализация и вербализация.',
    summary: {
      overview:
        'На ниво B2.1 анализираме предизвикателствата пред съвременния човек — динамиката на живота, баланса между работа и свободно време, образователните модели и професионалната реализация в глобализирания свят.',
      keyPoints: [
        'Предизвикателства на съвременния живот (Herausforderungen des modernen Lebens): die Schnelllebigkeit — забързаният ритъм на живота, die Vereinbarkeit von Beruf und Privatleben (Work-Life-Balance), die Konsumgesellschaft — консуматорско общество, die Reizüberflutung — претоварване със стимули и информация, der Leistungsdruck, die Vereinsamung in Großstädten.',
        'Образователни системи (Bildungssysteme): die Schulpflicht — задължително образование, staatliche und private Bildungseinrichtungen, Studiengebühren — студентски такси, der Numerus clausus (NC — минимален бал за прием в германски университет), das lebenslange Lernen — учене през целия живот, kritisches Denken fördern, Chancengleichheit — равенство на шансовете.',
        'Професионална реализация (Berufliche Verwirklichung): der Arbeitsmarkt — пазар на труда, der Fachkräftemangel — недостиг на квалифицирани кадри, die Abwanderung hochqualifizierter Kräfte (Braindrain), flexible Arbeitszeitmodelle, Homeoffice / mobiles Arbeiten, sich beruflich weiterbilden — повишавам квалификацията си, berufliche Perspektiven.',
        'Академична аргументация и номинализация (Nominalstil): В публицистичния стил на B2 глаголните подчинени изречения често се трансформират в съществителни с предлози от високия регистър: angesichts (+ Gen. — предвид), infolge (+ Gen. — вследствие на), zwecks (+ Gen. — с цел): Angesichts des zunehmenden Fachkräftemangels investieren viele Unternehmen in die Weiterbildung ihrer Mitarbeiter.',
        'Примерен абзац (B2.1): Es steht außer Zweifel, dass eine fundierte Ausbildung die Chancen auf dem modernen Arbeitsmarkt erheblich verbessert. Dennoch reicht ein Universitätsabschluss allein heute kaum noch aus: Angesichts des rasanten technologischen Wandels wird das lebenslange Lernen zur entscheidenden Voraussetzung für den beruflichen Erfolg.',
      ],
      examGoldenRule:
        'В аргументативно есе на ниво B2.1 редувай вербален стил (подчинени изречения с weil, obwohl, damit) и номинален стил (предлози с Genitiv като angesichts, aufgrund, trotz, infolge + отглаголно съществително на -ung или субстантивиран инфинитив).',
      commonTraps: [
        'Предлогът angesichts („предвид / с оглед на“) изисква винаги Genitiv: angesichts der steigenden Lebenshaltungskosten.',
        'Съществителното der Abschluss (диплома / завършване на образование) е от мъжки род (мн.ч. die Abschlüsse).',
      ],
      formulasOrDates: [
        { label: 'Висок регистър с Genitiv', value: 'angesichts des Wandels | aufgrund der Globalisierung' },
        { label: 'Аргументиране на B2', value: 'Es steht außer Zweifel, dass … | Dem steht jedoch gegenüber, dass …' },
        { label: 'Обем на писмен текст (B2.1)', value: '200–250 думи' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b21-modern-chk-1',
        requirement: 'Аргументативно есе „Studium oder Berufsausbildung — welcher Weg führt heute zum Erfolg?“ (200–250 думи)',
        whyNeeded: 'Текстът с мнение и аргументи от 200–250 думи по темата за образованието и кариерата е основен очакван резултат.',
        isEssentialForSix: true,
        suggestedNotes: 'Въведение, аргументи за университет и за професионално обучение, контрааргумент, синтезиращо заключение.',
      },
      {
        id: 'de-b21-modern-chk-2',
        requirement: 'Трансформация на 5 подчинени изречения в предложни групи (Nominalisierung)',
        whyNeeded: 'Номинализацията е ключов маркер за ниво B2 при четене и писане.',
        isEssentialForSix: true,
        suggestedNotes: 'Weil die Preise steigen -> Wegen / Angesichts der steigenden Preise…',
      },
    ],
    flashcards: [
      { id: 'de-b21-modern-fc-1', front: 'Как е „съвместяване на професия и личен живот“ и „учене през целия живот“?', back: 'die Vereinbarkeit von Beruf und Privatleben / das lebenslange Lernen', tag: 'Съвременен свят' },
      { id: 'de-b21-modern-fc-2', front: 'Как е „недостиг на квалифицирани кадри“ и „равенство на шансовете“?', back: 'der Fachkräftemangel / die Chancengleichheit', tag: 'Кариера' },
      { id: 'de-b21-modern-fc-3', front: 'Какво означава предлогът „angesichts“ и кой падеж изисква?', back: '„Предвид / с оглед на“ — изисква Genitiv (angesichts der aktuellen Situation).', tag: 'Граматика' },
      { id: 'de-b21-modern-fc-4', front: 'Какво означава терминът „Numerus clausus (NC)“ в германските университети?', back: 'Ограничение за прием по специалности чрез минимален среден успех от дипломата (Abiturnote).', tag: 'Образование' },
      { id: 'de-b21-modern-fc-5', front: 'Как се казва на ниво B2 „Без съмнение е, че…“?', back: 'Es steht außer Zweifel, dass … / Es liegt auf der Hand, dass …', tag: 'Аргументация' },
      { id: 'de-b21-modern-fc-6', front: 'Как е „повишавам професионалната си квалификация“?', back: 'sich beruflich weiterbilden (die Weiterbildung)', tag: 'Кариера' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: ___ der rasanten Digitalisierung verändern sich viele traditionelle Berufsbilder.',
        options: ['Angesichts', 'Obwohl', 'Trotzdem', 'Damit'],
        correctIndex: 0,
        explanation: 'Следва именна група в Genitiv (der rasanten Digitalisierung), затова е необходим предлогът Angesichts („предвид“).',
      },
      {
        id: 2,
        question: 'Коя номинализация предава точно смисъла на „Weil es in vielen Branchen an Fachkräften mangelt, …“?',
        options: [
          'Trotz des Fachkräftemangels in vielen Branchen…',
          'Aufgrund des Fachkräftemangels in vielen Branchen…',
          'Ohne den Fachkräftemangel in vielen Branchen…',
          'Gegen den Fachkräftemangel in vielen Branchen…',
        ],
        correctIndex: 1,
        explanation: 'Причинният съюз weil се трансформира в предлога за причина aufgrund (+ Genitiv).',
      },
      {
        id: 3,
        question: 'Какво означава понятието „die Chancengleichheit“ в образованието?',
        options: [
          'задължително заплащане на високи такси в училищата',
          'отпадане на всички матури и изпити',
          'равен достъп и равни възможности за образование за всички ученици',
          'обучение само по един предмет през цялата година',
        ],
        correctIndex: 2,
        explanation: 'Die Chance (шанс/възможност) + die Gleichheit (равенство) = равенство на възможностите.',
      },
      {
        id: 4,
        question: 'Попълнете с подходящото причастно определение: Die ___ Bewerber wurden zu einem zweiten Gespräch eingeladen.',
        options: ['auswählen', 'auswählend', 'ausgewählt', 'ausgewählten'],
        correctIndex: 3,
        explanation: 'Кандидатите са били избрани (пасивно завършено действие -> Partizip II със склонитбено окончание -en): die ausgewählten Bewerber.',
      },
      {
        id: 5,
        question: 'Кой израз въвежда контрааргумент в академичен текст на ниво B2?',
        options: [
          'Genauso wie mein bester Freund meine ich…',
          'Dem steht jedoch das Argument gegenüber, dass…',
          'Vielen Dank für Ihre nette Postkarte aus Wien!',
          'Zum Beispiel kaufe ich gern Obst auf dem Markt.',
        ],
        correctIndex: 1,
        explanation: '„Dem steht jedoch das Argument gegenüber, dass…“ („Срещу това обаче стои аргументът, че…“) е класическа формула за B2.',
      },
      {
        id: 6,
        question: 'Какво описва думата „die Reizüberflutung“ в съвременното всекидневие?',
        options: [
          'наводнение след проливен пролетен дъжд',
          'изграждането на нови велоалеи в центъра на града',
          'претоварването на сетивата с прекалено много информация, шум и дигитални стимули',
          'кандидатстването за стипендия в чужбина',
        ],
        correctIndex: 2,
        explanation: 'Der Reiz (дразнител/стимул) + die Überflutung (заливане) = информационно и сетивно претоварване.',
      },
    ],
    quickQuestions: ['Как да превърна подчинено изречение в номинална група на ниво B2?', 'Как се аргументира тема за образование и пазар на труда в 200–250 думи?', 'Какво означават Fachkräftemangel и Chancengleichheit?'],
  },
  {
    ...base,
    id: 'de-b21-science',
    monTopicIds: ids('2'),
    title: 'Немски B2.1: Човек и наука — научно-технически постижения, етика и глобални екологични проблеми',
    originalNoteExcerpt:
      'Тематична област „Човек и наука“: научно-технически постижения; екология и глобални проблеми. Граматика: страдателен залог и неговите алтернативи (sich lassen + Infinitiv, sein + zu + Infinitiv, прилагателни на -bar/-lich), субективна употреба на модалните глаголи (soll/will + Infinitiv Perfekt), Futur II за предположение.',
    summary: {
      overview:
        'Изследваме ролята на науката и високите технологии (изкуствен интелект, биотехнологии, възобновяема енергия) и отговорността на човечеството за решаването на глобалните екологични и климатични кризи.',
      keyPoints: [
        'Научно-технически постижения (Wissenschaft und Technik): die künstliche Intelligenz (KI) — изкуствен интелект, die Robotik und Automatisierung, die Biotechnologie / Gentechnik, die Raumfahrt — космонавтика, medizinische Durchbrüche — пробиви в медицината; Forschung betreiben — провеждам научни изследвания, ein zweischneidiges Schwert — нож с две остриета, ethische Fragen aufwerfen — повдигам етични въпроси.',
        'Екология, енергиен преход и глобални проблеми: die Energiewende — енергиен преход към чиста енергия, die Klimaneutralität — климатична неутралност, der Ausstieg aus fossilen Brennstoffen, die Erhaltung der Biodiversität, nachhaltige Kreislaufwirtschaft — кръгова икономика, Maßnahmen ergreifen — предприемам мерки.',
        'Алтернативи на Passiv (Passiversatzformen) в научния стил: Вместо werden + Partizip II в научни статии се използват: (1) sich lassen + Infinitiv: Solarenergie lässt sich effizient speichern (= kann gespeichert werden); (2) sein + zu + Infinitiv: Die Folgen sind kaum abzusehen (= können kaum abgesehen werden); (3) Прилагателни със суфикс -bar или -lich: erneuerbare Energien, ein lösbares Problem, eine verständliche Erklärung.',
        'Субективна модалност и предположения за миналото: Когато предаваме чуждо твърдение („говори се, че…“), използваме soll + Infinitiv Perfekt: Das Forschungsteam soll einen neuen Impfstoff entwickelt haben. За собствено твърдение на лицето („твърди, че сам е…“) се ползва will: Er will das Phänomen als Erster beobachtet haben.',
        'Примерен абзац: Der rasante Fortschritt im Bereich der künstlichen Intelligenz eröffnet zwar völlig neue Möglichkeiten in der Medizin und Wissenschaft, wirft aber zugleich ernste ethische Fragen auf. Viele Routineaufgaben lassen sich heute durch Algorithmen erledigen. Dennoch darf die Technik niemals außer Kontrolle geraten — wissenschaftliche Innovationen müssen stets im Dienst des Menschen und des Umweltschutzes stehen.',
      ],
      examGoldenRule:
        'В научнопопулярни текстове използвай трите пасивни алтернативи за „може да бъде направено“: Das Problem kann gelöst werden = Das Problem lässt sich lösen = Das Problem ist zu lösen = Das Problem ist lösbar.',
      commonTraps: [
        'Различавай субективната употреба на soll (други казват за него: Er soll sehr reich sein — Говори се, че е много богат) и will (той сам твърди за себе си: Er will den Fehler nicht bemerkt haben — Твърди, че не бил забелязал грешката).',
        'На немски „провеждам изследване“ е Forschung betreiben или eine Untersuchung durchführen.',
      ],
      formulasOrDates: [
        { label: 'Алтернативи на Passiv', value: 'lässt sich speichern = ist zu speichern = ist speicherbar' },
        { label: 'Чуждо твърдение (слух)', value: 'Die Forscher sollen eine neue Energiequelle entdeckt haben.' },
        { label: 'Научни колокации', value: 'Forschung betreiben | Maßnahmen ergreifen | Fragen aufwerfen' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b21-sci-chk-1',
        requirement: 'Есе „Künstliche Intelligenz und moderne Technik — Fluch oder Segen?“ (200–250 думи)',
        whyNeeded: 'Ключова тема от раздел „Човек и наука“ за ниво B2.1.',
        isEssentialForSix: true,
        suggestedNotes: 'Ползи в медицината и екологията, рискове за работните места и етиката, поне 2 пасивни алтернативи (sich lassen / -bar).',
      },
      {
        id: 'de-b21-sci-chk-2',
        requirement: 'Таблица на пасивните алтернативи (Passiversatzformen) с по 3 примера',
        whyNeeded: 'Задължителна граматична структура за разбиране на научни текстове и писане на висок стил.',
        isEssentialForSix: true,
        suggestedNotes: 'kann gemessen werden -> lässt sich messen -> ist zu messen -> ist messbar.',
      },
    ],
    flashcards: [
      { id: 'de-b21-sci-fc-1', front: 'Как е „изкуствен интелект“, „енергиен преход“ и „кръгова икономика“?', back: 'die künstliche Intelligenz (KI) / die Energiewende / die Kreislaufwirtschaft', tag: 'Наука и екология' },
      { id: 'de-b21-sci-fc-2', front: 'Как се превежда „нож с две остриета“ и „повдигам етични въпроси“?', back: 'ein zweischneidiges Schwert / ethische Fragen aufwerfen', tag: 'Колокации' },
      { id: 'de-b21-sci-fc-3', front: 'Как се преобразува „Das kann leicht erklärt werden“ с глагола sich lassen и с прилагателно на -bar?', back: 'Das lässt sich leicht erklären. / Das ist leicht erklärbar.', tag: 'Граматика' },
      { id: 'de-b21-sci-fc-4', front: 'Какво означава изречението „Der Wissenschaftler soll das Gerät erfunden haben“?', back: 'Твърди се / Говори се, че ученият е изобретил уреда (предаване на чужда информация).', tag: 'Модалност' },
      { id: 'de-b21-sci-fc-5', front: 'Как е „провеждам изследване“ и „предприемам мерки“?', back: 'eine Untersuchung durchführen (Forschung betreiben) / Maßnahmen ergreifen (treffen)', tag: 'Колокации' },
      { id: 'de-b21-sci-fc-6', front: 'Какво изразява Futur II (напр. „Er wird das Experiment schon beendet haben“)?', back: 'Предположение за вече приключило действие („Вероятно вече е завършил експеримента“).', tag: 'Граматика' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Кое изречение е точен синоним на „Viele Umweltschäden können heute nicht mehr rückgängig gemacht werden“?',
        options: [
          'Viele Umweltschäden lassen sich heute nicht mehr rückgängig machen.',
          'Viele Umweltschäden haben heute nichts mehr rückgängig zu machen.',
          'Viele Umweltschäden wollen heute nicht mehr rückgängig machen.',
          'Viele Umweltschäden lassen heute die Natur rückgängig machen.',
        ],
        correctIndex: 0,
        explanation: 'Конструкцията sich lassen + Infinitiv замества können + Partizip II + werden (пасивна възможност).',
      },
      {
        id: 2,
        question: 'Какво означава субективната модална форма в „Das neue Medikament soll sehr wirksam sein“?',
        options: [
          'Новото лекарство е забранено със закон.',
          'Според слухове / чужди източници новото лекарство е много ефикасно.',
          'Лекарят отказва да изпише лекарството.',
          'Пациентът сам е произвел лекарството.',
        ],
        correctIndex: 1,
        explanation: 'Субективното sollen предава информация от трети източник („твърди се / казват, че…“).',
      },
      {
        id: 3,
        question: 'Попълнете устойчивото съчетание: Um den Klimawandel aufzuhalten, müssen alle Staaten dringend wirksame ___ ergreifen.',
        options: ['Experimente', 'Vorurteile', 'Maßnahmen', 'Gebühren'],
        correctIndex: 2,
        explanation: 'Колокацията за „предприемам мерки“ на немски е Maßnahmen ergreifen (или treffen).',
      },
      {
        id: 4,
        question: 'Попълнете: Die moderne Gentechnik ist ein zweischneidiges ___ — sie bietet große Chancen, birgt aber auch Risiken.',
        options: ['Messer', 'Schild', 'Werkzeug', 'Schwert'],
        correctIndex: 3,
        explanation: 'Идиомът „нож с две остриета“ на немски е ein zweischneidiges Schwert (букв. „двуостър меч“).',
      },
      {
        id: 5,
        question: 'Кое прилагателно със суфикс -bar означава „който може да бъде реализиран / осъществим“ (от глагола machen / realisieren)?',
        options: ['machlich / realisierend', 'machbar / realisierbar', 'gemacht / realisiert', 'machend / realisabel'],
        correctIndex: 1,
        explanation: 'Суфиксът -bar образува прилагателни с пасивно модално значение („който може да се…“): machbar, lösbar, trinkbar.',
      },
      {
        id: 6,
        question: 'Попълнете: Das Institut ___ derzeit eine große Studie über Solarenergie durch.',
        options: ['stellt', 'treibt', 'führt', 'nimmt'],
        correctIndex: 2,
        explanation: 'Устойчивото съчетание е eine Studie / eine Untersuchung durchführen.',
      },
    ],
    quickQuestions: ['Как работят пасивните алтернативи със sich lassen, sein + zu и -bar?', 'Каква е разликата между Er soll… haben и Er will… haben?', 'Кои колокации са задължителни за есе на тема наука и екология?'],
  },
  {
    ...base,
    id: 'de-b21-media',
    monTopicIds: ids('media'),
    title: 'Немски B2.1: Медии и информация — роля на медиите в обществото, дигитална среда и критично мислене',
    originalNoteExcerpt:
      'Тематична област „Медии и информация“: роля на медиите в обществото; информационни и комуникационни технологии и дигитална среда. Слушане и четене: разбиране на радиопредавания, интервюта, дискусии, статии и имплицитна информация. Граматика: косвена реч (Konjunktiv I и заместващи форми с Konjunktiv II), предлози за източник на информация (laut, zufolge, nach).',
    summary: {
      overview:
        'Анализираме влиянието на традиционните и дигиталните медии върху общественото мнение, критичната оценка на източниците и дезинформацията и научаваме как журналистите предават чужда реч обективно с Konjunktiv I.',
      keyPoints: [
        'Видове медии и журналистика (Medienlandschaft): Printmedien (Tageszeitungen, Zeitschriften), öffentlich-rechtlicher und privater Rundfunk — обществени и частни радио и телевизия, digitale Medien, soziale Netzwerke, Podcasts; die seriöse Presse (Qualitätszeitungen) <-> die Boulevardpresse (Regenbogenpresse — жълта преса), die vierte Gewalt im Staat — четвъртата власт.',
        'Достоверност и манипулация: die Berichterstattung — отразяване на събития, die Meinungsfreiheit / Pressefreiheit — свобода на мнението/словото, zuverlässige Quellen prüfen, Falschmeldungen (Fake News) / Desinformation erkennen, die Reißerische Schlagzeile (Clickbait), die Filterblase — информационен балон, die Manipulation der öffentlichen Meinung.',
        'Дигитална среда и технологии: die Vernetzung, der Algorithmus, der Datenschutz, der digitale Fußabdruck — дигитален отпечатък, die Informationsflut, Medienkompetenz entwickeln — развивам медийна грамотност.',
        'Косвена реч в медиите (Indirekte Rede mit Konjunktiv I): В новините и репортажите чуждите изказвания се предават дистанцирано и неутрално с Konjunktiv I (основа на инфинитива + окончания -e, -est, -e, -en, -et, -en; за 3 л. ед.ч. на sein -> er/sie/es sei, мн.ч. -> sie seien; haben -> er habe; werden -> er werde; модални -> er könne/müsse/wolle/solle). За минало време в косвена реч се ползва habe / sei + Partizip II: Der Minister erklärte, die Regierung habe neue Regeln beschlossen.',
        'Кога Konjunktiv I се заменя с Konjunktiv II в косвена реч: Когато формата за Konjunktiv I съвпада с обикновеното сегашно време (напр. в 3 л. мн.ч. sie haben, sie kommen), се използва Konjunktiv II (sie hätten, sie kämen / würden kommen): Die Experten betonten, viele Nutzer seien sich der Risiken nicht bewusst und hätten zu wenig Medienkompetenz.',
      ],
      examGoldenRule:
        'В косвена реч запомни най-важната форма — 3 лице ед.ч. на Konjunktiv I винаги завършва на -e (без -t!), а на глагола sein е sei (мн.ч. seien): Die Journalistin berichtet, die Lage sei ernst und der Präsident komme heute Abend an.',
      commonTraps: [
        'Предлогът zufolge („според“) стои СЛЕД съществителното и тогава изисква Dativ: Einer neuen Studie zufolge (Dat. ж.р.) verbringen Jugendliche vier Stunden täglich online; докато предлогът laut стои ПРЕД съществителното: Laut einer neuen Studie…',
        'В косвена реч има само ЕДНА форма за всички минали времена (Präteritum, Perfekt, Plusquamperfekt се предават единно с habe / sei + Partizip II).',
      ],
      formulasOrDates: [
        { label: 'Konjunktiv I (3 л. ед.ч.)', value: 'er sei (sein) | er habe (haben) | er werde | er könne / müsse / solle' },
        { label: 'Минало в косвена реч', value: 'Er sagte, er habe den Artikel gelesen / er sei dort gewesen.' },
        { label: 'Позоваване на източник', value: 'Laut einem Bericht (+ Dat./Gen.) | Einem Bericht zufolge (след думата, с Dat.!)' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b21-media-chk-1',
        requirement: 'Есе „Soziale Medien als Hauptinformationsquelle — Chancen und Gefahren“ (200–250 думи)',
        whyNeeded: 'Централна тема от раздел „Медии и информация“ за ниво B2.1.',
        isEssentialForSix: true,
        suggestedNotes: 'Бързина и достъпност срещу Filterblase и Fake News, значение на Medienkompetenz, поне 2 форми в Konjunktiv I.',
      },
      {
        id: 'de-b21-media-chk-2',
        requirement: 'Таблица на формите на Konjunktiv I (настояще и минало) и правилото за замяна с Konjunktiv II',
        whyNeeded: 'Konjunktiv I е задължителен за разбиране на новини и писане на резюме на статия на ниво B2.',
        isEssentialForSix: true,
        suggestedNotes: '3 л. ед.ч.: sei, habe, komme, könne; мн.ч.: seien, hätten (замяна!), kämen; минало: habe gemacht / sei gegangen.',
      },
    ],
    flashcards: [
      { id: 'de-b21-media-fc-1', front: 'Как е „сериозна преса“ и „жълта (булевардна) преса“ на немски?', back: 'die seriöse Presse (Qualitätszeitungen) / die Boulevardpresse (Regenbogenpresse)', tag: 'Медии' },
      { id: 'de-b21-media-fc-2', front: 'Как е „медийна грамотност“, „информационен балон“ и „фалшиви новини“?', back: 'die Medienkompetenz / die Filterblase / die Falschmeldungen (Fake News)', tag: 'Медии' },
      { id: 'de-b21-media-fc-3', front: 'Какви са формите на sein и haben за 3 л. ед.ч. и 3 л. мн.ч. в Konjunktiv I?', back: 'er/sie/es sei (мн.ч. sie seien); er/sie/es habe (мн.ч. се заменя с Konj. II -> sie hätten).', tag: 'Konjunktiv I' },
      { id: 'de-b21-media-fc-4', front: 'Как се предава минало време в косвена реч (напр. „Той каза, че е видял филма“)?', back: 'Er sagte, er habe den Film gesehen (habe/sei + Partizip II).', tag: 'Konjunktiv I' },
      { id: 'de-b21-media-fc-5', front: 'Как се използва следлогът „zufolge“ („Според проучването…“)?', back: 'Поставя се СЛЕД съществителното в Dativ: Der Studie zufolge… / Dem Bericht zufolge…', tag: 'Граматика' },
      { id: 'de-b21-media-fc-6', front: 'Как е „свобода на печата“ и „отразяване на събитията“?', back: 'die Pressefreiheit / die Berichterstattung', tag: 'Медии' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете косвената реч в новинарски стил: Der Sprecher teilte mit, die Verhandlungen ___ erfolgreich verlaufen und das Abkommen ___ bereit.',
        options: ['sind / ist', 'seien / sei', 'wären / war', 'haben / habe'],
        correctIndex: 1,
        explanation: 'В косвена реч (Konjunktiv I) 3 л. мн.ч. за минало със sein е seien verlaufen, а 3 л. ед.ч. за настояще е sei bereit.',
      },
      {
        id: 2,
        question: 'Попълнете: Die Zeugin behauptete vor Gericht, sie ___ den Unfall genau gesehen.',
        options: ['hat', 'habe', 'ist', 'sei'],
        correctIndex: 1,
        explanation: 'Минало действие в косвена реч за глагол с haben се образува с Konjunktiv I на haben (sie habe) + Partizip II (gesehen).',
      },
      {
        id: 3,
        question: 'Попълнете: Einer aktuellen Umfrage ___ informieren sich über 80 Prozent der Jugendlichen im Internet.',
        options: ['laut', 'zufolge', 'wegen', 'trotz'],
        correctIndex: 1,
        explanation: 'Предлогът, който стои СЛЕД съществителното в Dativ (Einer aktuellen Umfrage …) със значение „според“, е zufolge.',
      },
      {
        id: 4,
        question: 'Защо в изречението „Die Forscher erklärten, sie hätten noch keine endgültigen Beweise“ е използвана формата hätten вместо haben?',
        options: [
          'Защото в 3 л. мн.ч. формата на Konjunktiv I (haben) съвпада с Indikativ и затова се заменя с Konjunktiv II (hätten).',
          'Защото изследователите не говорят немски език.',
          'Защото след глагола erklären винаги се пише Plusquamperfekt.',
          'Защото изречението е пряк въпрос.',
        ],
        correctIndex: 0,
        explanation: 'Когато Konjunktiv I не се различава от изявително наклонение (Indikativ), в косвената реч се използва Konjunktiv II.',
      },
      {
        id: 5,
        question: 'Какво описва понятието „die Filterblase“ в социалните мрежи?',
        options: [
          'алгоритмично изолиране, при което потребителят вижда само информация, съвпадаща с неговите възгледи',
          'специален филтър за пречистване на питейната вода',
          'антивирусна програма за защита на банкови сметки',
          'телевизионно предаване за прогнозата за времето',
        ],
        correctIndex: 0,
        explanation: 'Die Filterblase (filter bubble / ехо камера) ограничава достъпа до противоположни гледни точки в мрежата.',
      },
      {
        id: 6,
        question: 'Кое понятие назовава способността критично да се подбират, анализират и проверяват медийни източници?',
        options: ['die Medienkompetenz', 'die Regenbogenpresse', 'die Reizüberflutung', 'die Einschaltquote'],
        correctIndex: 0,
        explanation: 'Die Medienkompetenz е медийната грамотност.',
      },
    ],
    quickQuestions: ['Как се образува Konjunktiv I и кога се заменя с Konjunktiv II?', 'Каква е разликата в употребата на laut и zufolge?', 'Как да напиша резюме на статия с косвена реч?'],
  },
  {
    ...base,
    id: 'de-b21-society',
    monTopicIds: ids('3'),
    title: 'Немски B2.1: Личност и общество — ценности, гражданска отговорност, културно многообразие и наследство',
    originalNoteExcerpt:
      'Тематична област „Личност и общество“: междуличностни отношения и ценностна система; културно многообразие и национална идентичност; принос на България и на страните на изучавания език към световното наследство. Говорене: равностойно участие в дискусия, аргументиране и обобщаващо изказване. Граматика: безсъюзни условни изречения (Hätte ich…, Sollte er…), предлози с Genitiv (zugunsten, anhand, seitens), двойни съюзи (je … desto, einerseits … andererseits).',
    summary: {
      overview:
        'Четвъртата тематична област разглежда ролята на личността в демократичното общество: личния избор и гражданската отговорност, междукултурния диалог, националната идентичност в обединена Европа и приноса към световното културно наследство.',
      keyPoints: [
        'Личен избор, ценности и гражданско общество: Verantwortung übernehmen — поемам отговорност, Zivilcourage zeigen — проявявам гражданска доблест, das bürgerschaftliche Engagement — гражданска активност, die Gleichberechtigung — равноправие, soziale Gerechtigkeit — социална справедливост, einen Kompromiss schließen / einen Konsens erzielen — постигам консенсус.',
        'Културно многообразие и национална идентичност (Kulturelle Vielfalt und Identität): das Zusammenleben in einer multikulturellen Gesellschaft, die Integration, Stereotype und Vorurteile überwinden, kulturelle Wurzeln und Traditionen bewahren, die europäische Identität („In Vielfalt geeint“ — „Обединени в многообразието“).',
        'Принос към европейското и световното наследство: Културни, научни и духовни мостове между България и немскоезичния свят — кирилицата и старобългарската книжовност, тракийското и средновековното наследство, европейското Просвещение, класическата литература, философия и музика, съвременният научен и културен обмен.',
        'Безсъюзни условни изречения (Konditionalsätze ohne „wenn“): На ниво B2 съюзът wenn често се изпуска, като спрегнатият глагол застава на ПЪРВО място в подчиненото изречение, а главното започва с dann или веднага с глагол: Hätte jeder Bürger mehr Zivilcourage gezeigt, wäre der Konflikt vermieden worden. Sollten Sie weitere Fragen haben, stehen wir Ihnen gern zur Verfügung.',
        'Предлози от високия регистър с Genitiv: zugunsten — в полза на (zugunsten einer wohltätigen Organisation), anhand — въз основа на / с помощта на (anhand konkreter Beispiele), seitens — от страна на (seitens der Behörden). Примерен абзац: Eine funktionierende Gesellschaft lebt vom Engagement ihrer Bürger. Würden junge Menschen häufiger in Jugendparlamenten oder gemeinnützigen Vereinen mitwirken, könnten sie ihre Zukunft aktiv mitgestalten.',
      ],
      examGoldenRule:
        'Когато образуваш безсъюзно условно изречение (без wenn), постави спрегнатия глагол на ПЪРВА позиция в условната част: Hätte ich das gewusst, wäre ich gekommen (= Wenn ich das gewusst hätte, wäre ich gekommen).',
      commonTraps: [
        'В безсъюзното условно изречение никога не слагай едновременно wenn и глагол на първо място — избираш ИЛИ Wenn Sie Fragen haben, … ИЛИ Haben Sie Fragen / Sollten Sie Fragen haben, …',
        'Изразът „Обединени в многообразието“ (мотото на ЕС) на немски е „In Vielfalt geeint“.',
      ],
      formulasOrDates: [
        { label: 'Безсъюзно условие (мин./наст.)', value: 'Hätte ich Zeit, käme ich. | Wäre das früher bekannt gewesen, …' },
        { label: 'Учтиво условие със sollte', value: 'Sollten Sie Hilfe benötigen, wenden Sie sich bitte an uns.' },
        { label: 'Гражданско общество', value: 'Zivilcourage zeigen | Verantwortung übernehmen | einen Konsens erzielen' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b21-soc-chk-1',
        requirement: 'Обобщаващо изказване / есе „Was bedeutet es heute, ein verantwortungsbewusster Bürger in Europa zu sein?“ (200–250 думи)',
        whyNeeded: 'Свързва ценностната система, гражданската активност и културната идентичност на ниво B2.1.',
        isEssentialForSix: true,
        suggestedNotes: 'Zivilcourage, Toleranz, опазване на културното наследство, поне 2 безсъюзни условни изречения.',
      },
      {
        id: 'de-b21-soc-chk-2',
        requirement: 'Трансформация на 5 условни изречения с wenn в безсъюзни условни изречения',
        whyNeeded: 'Безсъюзните условни изречения са типичен белег на високия писмен и официален стил на B2.',
        isEssentialForSix: true,
        suggestedNotes: 'Wenn du Hilfe brauchst -> Brauchst du Hilfe / Solltest du Hilfe brauchen, ruf mich an!',
      },
    ],
    flashcards: [
      { id: 'de-b21-soc-fc-1', front: 'Как е „проявявам гражданска доблест“ и „постигам консенсус“?', back: 'Zivilcourage zeigen / einen Konsens erzielen', tag: 'Общество' },
      { id: 'de-b21-soc-fc-2', front: 'Как е „равноправие“ и „културно многообразие“?', back: 'die Gleichberechtigung / die kulturelle Vielfalt', tag: 'Ценности' },
      { id: 'de-b21-soc-fc-3', front: 'Как се преобразува „Wenn ich mehr Zeit gehabt hätte, hätte ich geholfen“ без съюза wenn?', back: 'Hätte ich mehr Zeit gehabt, (so/dann) hätte ich geholfen.', tag: 'Граматика' },
      { id: 'de-b21-soc-fc-4', front: 'Какво означава официалната формула „Sollten Sie Fragen haben, …“?', back: '„Ако случайно имате въпроси, …“ (= Falls Sie Fragen haben…).', tag: 'Официално писмо' },
      { id: 'de-b21-soc-fc-5', front: 'Какво означават предлозите „anhand“ и „zugunsten“ (+ Genitiv)?', back: 'anhand = въз основа на / чрез (anhand eines Beispiels); zugunsten = в полза на.', tag: 'Предлози' },
      { id: 'de-b21-soc-fc-6', front: 'Как звучи мотото на Европейския съюз на немски език?', back: 'In Vielfalt geeint („Обединени в многообразието“).', tag: 'Европа' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете безсъюзното условно изречение: ___ wir uns früher über das Projekt informiert, hätten wir auch daran teilnehmen können.',
        options: ['Wenn', 'Hätten', 'Würden', 'Seien'],
        correctIndex: 1,
        explanation: 'При изпускане на съюза wenn спрегнатият глагол от Konjunktiv II der Vergangenheit (Hätten) застава на първо място.',
      },
      {
        id: 2,
        question: 'Попълнете в официално писмо: ___ Sie weitere Unterlagen benötigen, schicke ich Ihnen diese gern per E-Mail zu.',
        options: ['Sollten', 'Wollen', 'Müssten', 'Durften'],
        correctIndex: 0,
        explanation: 'Формата Sollten на първа позиция означава „В случай че / Ако случайно…“ (= Falls Sie … benötigen).',
      },
      {
        id: 3,
        question: 'Попълнете: Die Autorin begründet ihre These ___ zahlreicher historischer Beispiele.',
        options: ['trotz', 'während', 'anhand', 'außerhalb'],
        correctIndex: 2,
        explanation: 'Предлогът anhand (+ Genitiv) означава „въз основа на / с помощта на (примери, данни, факти)“.',
      },
      {
        id: 4,
        question: 'Какво означава понятието „die Zivilcourage“?',
        options: [
          'военна служба в армията',
          'участие в спортен маратон',
          'плащане на общински данъци',
          'гражданска смелост да се застъпиш за правдата и да защитиш слабия на обществено място',
        ],
        correctIndex: 3,
        explanation: 'Die Zivilcourage е гражданската доблест и смелост при защита на човешкото достойнство и ценности.',
      },
      {
        id: 5,
        question: 'Попълнете: Der Erlös des Schulkonzerts wurde ___ eines Kinderkrankenhauses gespendet.',
        options: ['infolge', 'zugunsten', 'außerhalb', 'während'],
        correctIndex: 1,
        explanation: 'Предлогът zugunsten (+ Genitiv) означава „в полза на“ (при благотворителност и дарения).',
      },
      {
        id: 6,
        question: 'Какво изразява девизът „In Vielfalt geeint“?',
        options: [
          'Задължението всички държави да говорят само един език',
          'Премахването на всички национални празници и традиции',
          'Единството на европейските народи при запазване на тяхното културно и езиково многообразие',
          'Разделянето на градовете на отделни зони',
        ],
        correctIndex: 2,
        explanation: 'Девизът на ЕС подчертава хармонията между националната идентичност и европейското единство.',
      },
    ],
    quickQuestions: ['Как се образуват безсъюзни условни изречения в немски?', 'Как се използват предлозите anhand, zugunsten и seitens?', 'Как да аргументирам темата за гражданската отговорност и културното многообразие?'],
  },
  {
    ...base,
    id: 'de-b21-skills',
    monTopicIds: ids('skills'),
    title: 'Немски B2.1: Слушане, четене, говорене и писане — академични и комуникативни умения',
    originalNoteExcerpt:
      'Очаквани резултати по четирите умения за ниво B2.1: разбиране на основните идеи, детайли, гледни точки и имплицитна информация в сложни автентични текстове по конкретни и абстрактни теми при слушане и четене; равностойно участие в дискусия и интервю, убедително аргументиране и обобщаващо монологично изказване при говорене; писане на аргументативно есе, официално писмо, разказ, преразказ, резюме и обобщаване на информация от различни източници (200–250 думи).',
    summary: {
      overview:
        'Обобщаваме комуникативните компетентности и изпитните формати за ниво B2.1 (подготовка за ДЗИ по немски език, DSD II / Goethe-Zertifikat B2): работа с имплицитна информация, водене на дебат и писане на резюме и аргументативно есе от 200–250 думи.',
      keyPoints: [
        'Слушане (Hörverstehen): Разбираш автентични дискусии, лекции, радиопредавания и интервюта с нормално темпо на носители на езика по конкретни и абстрактни теми. Разпознаваш имплицитната информация — иронията, скептицизма, колебанието и неказаното директно отношение на говорещия.',
        'Четене (Leseverstehen): Анализираш сложни публицистични, научнопопулярни и художествени текстове. Разбираш комуникативното намерение на автора, логическата структура (вкл. задачи за попълване на липсващи изречения/абзаци в текст — Textrekonstruktion) и скритите послания.',
        'Говорене (Sprechen): Водиш равностоен диалог и дебат, дипломатично оборваш контрааргументи (Ihr Argument ist zwar nachvollziehbar, lässt aber außer Acht, dass…) и правиш задълбочено обобщаващо изказване по проблемна тема (теза -> аргументи с примери -> контрааргументи -> синтез).',
        'Писане (Schreiben — 200–250 думи): Овладяваш четири ключови писмени задачи: (1) Аргументативен текст (Erörterung / Stellungnahme) с балансиран анализ и лична позиция; (2) Официално писмо (мотивационно писмо, официално предложение, отворено писмо до редакция — Leserbrief); (3) Резюме (Zusammenfassung) на статия и синтез на информация от няколко източника (напр. текст + графика); (4) Художествен/рефлексивен разказ.',
        'Правила за писане на резюме (Zusammenfassung) на ниво B2.1: 1. Въвеждащо изречение с автор, заглавие, източник и основна тема (In dem Artikel „…“ von …, erschienen in …, geht es um die Frage, wie…); 2. Предаване само на съществените идеи в сегашно време (Präsens) и косвена реч (Konjunktiv I); 3. Собствени думи и синоними (БЕЗ директно преписване на цели изречения и БЕЗ лично мнение!).',
      ],
      examGoldenRule:
        'В резюме (Zusammenfassung) никога не пиши Ich denke / Meiner Meinung nach — резюмето предава обективно само тезите на автора със свои думи и с Konjunktiv I. Личното мнение се пише едва в отделната част за коментар (Stellungnahme)!',
      commonTraps: [
        'При анализ на графика или статистика (Grafikbeschreibung) не преразказвай всяко число поотделно — посочи източника, темата, най-високите/най-ниските стойности и основната тенденция (Die Grafik veranschaulicht… / Auffällig ist, dass… / Der Anteil ist um 15 % gestiegen).',
        'При задачи за вмъкване на изречения в текст (Textrekonstruktion) следи за местоименията, показателните думи и конекторите (dieser, dabei, dennoch, folglich), които сочат към предходното изречение.',
      ],
      formulasOrDates: [
        { label: 'Начало на резюме', value: 'In dem vorliegenden Artikel „…“ setzt sich der Autor mit dem Thema … auseinander.' },
        { label: 'Описание на графика', value: 'Das Diagramm gibt Auskunft über … | Der Anteil liegt bei … Prozent.' },
        { label: 'Обем на писмен текст (B2.1)', value: '200–250 думи' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b21-skills-chk-1',
        requirement: 'Пълен шаблон за резюме на статия и описание на статистическа графика на немски (B2.1)',
        whyNeeded: 'Обобщаването на информация от различни източници и резюмирането са изрични очаквани резултати в програмата.',
        isEssentialForSix: true,
        suggestedNotes: 'Въведение на резюме -> преход към тезите на автора (Laut dem Autor… / Weiterhin betont er, dass…) -> данни от графика.',
      },
      {
        id: 'de-b21-skills-chk-2',
        requirement: 'Речник от академични синоними на честите думи важно, проблем, показвам, мисля, казвам',
        whyNeeded: 'Лексикалното разнообразие е основен критерий за отлична оценка на ниво B2.',
        isEssentialForSix: true,
        suggestedNotes: 'wichtig -> von großer Bedeutung, entscheidend; zeigen -> veranschaulichen, belegen; sagen -> betonen, hervorheben.',
      },
    ],
    flashcards: [
      { id: 'de-b21-skills-fc-1', front: 'Какъв е задължителният обем на писмените текстове за ниво B2.1 по програмата на МОН?', back: '200–250 думи.', tag: 'Писане' },
      { id: 'de-b21-skills-fc-2', front: 'Как започва професионално резюме на статия на немски?', back: 'In dem vorliegenden Artikel „…“ beschäftigt sich (setzt sich) der Autor mit der Frage (auseinander), …', tag: 'Резюме' },
      { id: 'de-b21-skills-fc-3', front: 'Кои глаголи на ниво B2 заместват простото „zeigen“ при анализ на текст или графика?', back: 'veranschaulichen, verdeutlichen, belegen, darauf hinweisen, zeigen auf.', tag: 'Лексика' },
      { id: 'de-b21-skills-fc-4', front: 'Каква е разликата между „um 10 Prozent steigen“ и „auf 10 Prozent steigen“?', back: 'um 10 % = увеличава се С 10 процента (разлика); auf 10 % = увеличава се ДО 10 процента (крайна стойност).', tag: 'Графики' },
      { id: 'de-b21-skills-fc-5', front: 'Как учтиво оборваме аргумент в дискусия на ниво B2?', back: 'Ihr Argument ist zwar nachvollziehbar, lässt jedoch außer Acht, dass …', tag: 'Говорене' },
      { id: 'de-b21-skills-fc-6', front: 'Какво е имплицитна информация в текст за слушане или четене?', back: 'Информация, която не е изказана буквално, а се извлича от контекста, тона и логиката на изказването.', tag: 'Четене и слушане' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Кое правило е ЗАДЪЛЖИТЕЛНО при писане на резюме (Zusammenfassung) на статия?',
        options: [
          'Предаване само на основните идеи на оригинала със свои думи, в Präsens и без лично мнение',
          'Буквално преписване на първия и последния абзац от статията',
          'Излагане на собствени спомени от детството в Präteritum',
          'Използване на разговорен жаргон и емотикони',
        ],
        correctIndex: 0,
        explanation: 'Резюмето е обективно, стегнато и предава само съдържанието на изходния текст със собствени формулировки.',
      },
      {
        id: 2,
        question: 'При описание на графика четете: „2020 lag der Anteil bei 20 %, 2024 bereits bei 35 %.“ Как ще формулирате промяната?',
        options: [
          'Der Anteil ist um 15 Prozentpunkte auf 35 Prozent gestiegen.',
          'Der Anteil ist um 35 Prozent auf 15 Prozent gesunken.',
          'Der Anteil hat sich seit 2020 überhaupt nicht verändert.',
          'Der Anteil ist unter null Prozent gefallen.',
        ],
        correctIndex: 0,
        explanation: 'Предлогът um показва разликата (+15), а предлогът auf — достигнатото ново ниво (35 %).',
      },
      {
        id: 3,
        question: 'Коя фраза е най-подходяща за дипломатично възражение в дебат на ниво B2?',
        options: [
          'Dieser Gedanke ist durchaus nachvollziehbar, allerdings sollte man auch bedenken, dass…',
          'Das ist völliger Quatsch, hör sofort auf zu reden!',
          'Ich habe leider keine Ahnung, worüber wir sprechen.',
          'Könnten Sie mir bitte die Speisekarte bringen?',
        ],
        correctIndex: 0,
        explanation: 'Изразът признава логиката на събеседника (nachvollziehbar) и въвежда контрааргумент с allerdings.',
      },
      {
        id: 4,
        question: 'Попълнете: In seinem Kommentar setzt sich der Journalist kritisch mit dem Thema Datenschutz ___.',
        options: ['auseinander', 'zusammen', 'nebeneinander', 'durcheinander'],
        correctIndex: 0,
        explanation: 'Устойчивият глагол за „разглеждам задълбочено / занимавам се критично с тема“ е sich auseinandersetzen mit (+ Dat.).',
      },
      {
        id: 5,
        question: 'Какъв е очакваният обем на писмените текстове за ниво B2.1 според програмата на МОН?',
        options: ['80–100 думи', '120–140 думи', '200–250 думи', '600–800 думи'],
        correctIndex: 2,
        explanation: 'Програмата за ниво B2.1 предвижда обем от 200–250 думи.',
      },
      {
        id: 6,
        question: 'Кой глагол е академичен синоним на „zeigen“ в изречението „Die Ergebnisse der Studie ___ deutlich, dass…“?',
        options: ['belegen / veranschaulichen', 'verschwinden / schweigen', 'kaufen / mieten', 'verletzen / heilen'],
        correctIndex: 0,
        explanation: 'Belegen (доказвам с данни) и veranschaulichen (илюстрирам/показвам нагледно) са типични глаголи за B2.',
      },
    ],
    quickQuestions: ['Как се пише резюме на статия на ниво B2?', 'Каква е разликата между um 20 % и auf 20 % при описание на графика?', 'Кои фрази правят есето от 200–250 думи академично?'],
  },
  {
    ...base,
    id: 'de-b21-grammar',
    monTopicIds: ids('grammar'),
    title: 'Немски B2.1: Езикови знания — Konjunktiv I, субективна модалност, разширени причастни групи, пасивни алтернативи и номинализация',
    originalNoteExcerpt:
      'Граматика за ниво B2.1: функционална интеграция на всички глаголни времена (вкл. Futur II); Konjunktiv I и II в косвена реч и в безсъюзни и смесени условни изречения; субективна и обективна употреба на модалните глаголи (muss/dürfte/mag/kann/soll/will + Infinitiv Perfekt); страдателен залог (Vorgangs- und Zustandspassiv, безличен пасив с es) и пасивни алтернативи (sich lassen, sein + zu, ist … -bar); разширени причастни определения (Partizip I, Partizip II и zu + Partizip I — Gerundivum); трансформации между номинален и вербален стил; предлози с Genitiv и сложни съюзни конструкции.',
    summary: {
      overview:
        'Пълен справочник на граматиката за ниво B2.1: фините степени на вероятност при модалните глаголи, Gerundivum (zu + Partizip I), безличният пасив, косвената реч и трансформациите между подчинени изречения и номинални групи.',
      keyPoints: [
        'Субективна модалност за степен на вероятност (Vermutung): Подредени по сила на убеденост (от 100 % до 10 %): muss (почти сигурно: Er muss den Zug verpasst haben), wird wohl / Futur II (много вероятно: Er wird den Zug verpasst haben), dürfte (вероятно ~75 %: Das dürfte stimmen), kann / mag (възможно е ~50 %: Er mag recht haben, aber…), könnte (слаба вероятност), kann nicht (невъзможно е: Er kann das nicht allein gemacht haben!). За чуждо твърдение: soll (други казват) и will (сам твърди за себе си).',
        'Разширени причастни определения и Gerundivum (zu + Partizip I): (1) Partizip I — активно и едновременно (die an dem Projekt teilnehmenden Schüler); (2) Partizip II — пасивно и завършено (die gestern veröffentlichten Ergebnisse); (3) zu + Partizip I (Gerundivum) — пасивно и предстоящо, със значение „който трябва/може да бъде…“: eine leicht zu lösende Aufgabe (= eine Aufgabe, die leicht gelöst werden kann); die einzuhaltenden Regeln (= die Regeln, die eingehalten werden müssen).',
        'Безличен пасив (Unpersönliches Passiv): Образува се от непреходни глаголи (които нямат пряко допълнение в Akkusativ) с формален подлог es на първа позиция (който отпада при инверсия!) и глагол в 3 л. ед.ч.: Es wurde lange über den Vorschlag diskutiert -> Gestern wurde lange über den Vorschlag diskutiert. Началното Es отпада, щом друга част застане на първо място!',
        'Трансформации Номинален <-> Вербален стил: Причина — weil/da <-> wegen, aufgrund, angesichts, dank (+ Gen./Dat.); Отстъпка — obwohl, wenngleich <-> trotz, ungeachtet (+ Gen.); Условие — wenn, falls <-> bei (+ Dat.: bei schlechtem Wetter); Цел — damit, um … zu <-> zu (+ Dat.: zur Verbesserung), zwecks (+ Gen.); Време — während, als, nachdem, bevor <-> während (+ Gen.), bei (+ Dat.), nach (+ Dat.), vor (+ Dat.).',
        'Сложни съюзи и предлози на ниво B2.1: Предлози с Genitiv — angesichts, anhand, anlässlich (по случай), infolge, zugunsten, zulasten (в тежест на), ungeachtet (независимо от), zwecks. Двойни и подчинителни съюзи — je …, desto/umso …; geschweige denn (камо ли); zumal (още повече че — глагол в края!); sofern / soweit (доколкото); indem / dadurch, dass.',
      ],
      examGoldenRule:
        'Запомни конструкцията Gerundivum (zu + Partizip I пред съществително): тя винаги има ПАСИВНО значение (необходимост или възможност) — das zu lösende Problem означава „проблемът, който трябва (или може) да бъде решен“.',
      commonTraps: [
        'В безличен пасив формалното es стои САМО на първа позиция: Es wird hier nicht geraucht, но Hier wird nicht geraucht (НИКОГА Hier wird es nicht geraucht!).',
        'След съюза zumal („още повече че / особено тъй като“) спрегнатият глагол стои на последно място в подчиненото изречение.',
      ],
      formulasOrDates: [
        { label: 'Gerundivum (zu + Partizip I)', value: 'die zu erledigende Arbeit = die Arbeit, die erledigt werden muss' },
        { label: 'Скала на вероятност', value: 'muss (95%) > dürfte (75%) > mag/kann (50%) > könnte (30%)' },
        { label: 'Безличен пасив', value: 'Es wurde viel gelacht -> Auf dem Fest wurde viel gelacht (без es!).' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b21-gram-chk-1',
        requirement: 'Таблица на трите вида причастни определения (Partizip I, Partizip II и zu + Partizip I) с трансформации в относителни изречения',
        whyNeeded: 'Gerundivum и разширените причастни групи са сред най-важните структури на ниво B2.1.',
        isEssentialForSix: true,
        suggestedNotes: 'das singende Kind (aktiv) | das gesungene Lied (passiv, fertig) | das zu singende Lied (passiv, muss/kann gesungen werden).',
      },
      {
        id: 'de-b21-gram-chk-2',
        requirement: 'Скала на субективната модалност с примери за настояще и минало (Infinitiv Perfekt)',
        whyNeeded: 'За прецизно изразяване на хипотези, изводи и дистанциране от чужди твърдения.',
        isEssentialForSix: true,
        suggestedNotes: 'Er muss / dürfte / könnte es vergessen haben; Er soll / will es nicht gewusst haben.',
      },
    ],
    flashcards: [
      { id: 'de-b21-gram-fc-1', front: 'Как се превежда и трансформира „die zu bezahlende Rechnung“ (Gerundivum)?', back: 'Сметката, която трябва да бъде платена (= die Rechnung, die bezahlt werden muss).', tag: 'Причастия' },
      { id: 'de-b21-gram-fc-2', front: 'Какво изразява формата „dürfte“ за предположение (напр. „Das Ergebnis dürfte bald bekannt sein“)?', back: 'Висока степен на вероятност (~75 %): „Резултатът вероятно скоро ще бъде известен“.', tag: 'Модалност' },
      { id: 'de-b21-gram-fc-3', front: 'Кога отпада местоимението „es“ в безличния пасив (напр. „Es wurde heftig diskutiert“)?', back: 'Веднага щом на първа позиция застане друга дума: Gestern wurde heftig diskutiert.', tag: 'Passiv' },
      { id: 'de-b21-gram-fc-4', front: 'Какво означава съюзът „zumal“ и какъв е словоредът след него?', back: '„Още повече че / особено тъй като“ — въвежда подчинено изречение с глагол на последно място.', tag: 'Съюзи' },
      { id: 'de-b21-gram-fc-5', front: 'Какво означава съюзът „geschweige denn“?', back: '„А камо ли / да не говорим за“ (след отрицателно или ограничително изречение).', tag: 'Съюзи' },
      { id: 'de-b21-gram-fc-6', front: 'Как се номинализира условното изречение „Wenn das Wetter schlecht ist, …“?', back: 'При лошо време: Bei schlechtem Wetter … (+ глагол).', tag: 'Номинализация' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Кое относително изречение предава точно значението на Gerundivum в „die bis Freitag einzureichenden Unterlagen“?',
        options: [
          'die Unterlagen, die bis Freitag eingereicht werden müssen',
          'die Unterlagen, die bis Freitag etwas eingereicht haben',
          'die Unterlagen, die schon letzte Woche eingereicht wurden',
          'die Unterlagen, die niemanden einreichen konnten',
        ],
        correctIndex: 0,
        explanation: 'Конструкцията zu + Partizip I (einzureichenden = при делими глаголи с вмъкнато -zu-) изразява пасивна необходимост („които трябва да бъдат подадени“).',
      },
      {
        id: 2,
        question: 'Кое изречение в безличен пасив е граматически ПРАВИЛНО?',
        options: [
          'Auf der gestrigen Konferenz wurde stundenlang über den Klimaschutz diskutiert.',
          'Auf der gestrigen Konferenz wurde es stundenlang über den Klimaschutz diskutiert.',
          'Auf der gestrigen Konferenz wurden stundenlang über den Klimaschutz diskutiert.',
          'Auf der gestrigen Konferenz hat stundenlang diskutiert worden.',
        ],
        correctIndex: 0,
        explanation: 'В безличен пасив сказуемото е в 3 л. ед.ч. (wurde … diskutiert), а формалното es задължително отпада, когато първата позиция е заета.',
      },
      {
        id: 3,
        question: 'Попълнете с подходящия модален глагол за висока вероятност („вероятно“): Die Reparatur des alten Daches ___ mehrere Tausend Euro kosten.',
        options: ['dürfte', 'will', 'möchte', 'braucht'],
        correctIndex: 0,
        explanation: 'Формата dürfte + Infinitiv изразява обосновано предположение с висока вероятност („вероятно ще струва“).',
      },
      {
        id: 4,
        question: 'Попълнете: Wir sollten das Angebot annehmen, ___ wir kaum eine günstigere Gelegenheit finden werden.',
        options: ['zumal', 'trotzdem', 'deshalb', 'denn'],
        correctIndex: 0,
        explanation: 'Глаголът werden стои в края на подчиненото изречение за подсилваща причина („още повече че“) -> zumal.',
      },
      {
        id: 5,
        question: 'Попълнете субективната модална форма за миналото: Das Licht in seiner Wohnung brennt nicht — er ___ schon schlafen ___ ___.',
        options: ['muss / gegangen / sein', 'will / gehen / werden', 'soll / ging / haben', 'darf / gegangen / worden'],
        correctIndex: 0,
        explanation: 'За сигурен логически извод за миналото се използва muss + Infinitiv Perfekt (gegangen sein).',
      },
      {
        id: 6,
        question: 'Попълнете: Er hatte nicht einmal Zeit für ein kurzes Telefonat, ___ denn für ein persönliches Treffen.',
        options: ['geschweige', 'trotzdem', 'infolge', 'obwohl'],
        correctIndex: 0,
        explanation: 'Устойчивият съюз след отрицание за „а камо ли“ е geschweige denn.',
      },
    ],
    quickQuestions: ['Как се образува и превежда Gerundivum (zu + Partizip I)?', 'Защо в безличен пасив местоимението es изчезва при инверсия?', 'Как се степенува вероятността с muss, dürfte, mag и könnte?'],
  },
];
