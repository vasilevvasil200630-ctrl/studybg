import type { LessonData } from '../../types';

// Немски език, ниво B1.1 (IX–XII клас, след ниво A2) — по един урок за всяка тема от учебната програма на МОН
// (https://www.mon.bg/nfs/2018/08/up_ne_b1.1.pdf). Програмата надгражда A2 с фокус върху емоциите, училищната
// общност, кариерата, здравето, екологията и културното наследство. Обяснения на български, примери на немски.

const base = { subject: 'Чужди езици (Немски, Френски, Испански)', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ne-b1.1:${num}`];

export const MON_LESSONS_DE_B11: LessonData[] = [
  {
    ...base,
    id: 'de-b11-emotions',
    monTopicIds: ids('1'),
    title: 'Немски B1.1: Аз и другите — чувства, емоции, емпатия и междуличностни отношения',
    originalNoteExcerpt:
      'Тематична област „Аз и другите“: емоции и чувства; междуличностни отношения. Речеви етикет: изразяване на желания, предпочитания, мнения, преценка и съчувствие. Граматика: прилагателни и причастия като определения (Partizip I и II), глаголи и прилагателни с предложно управление.',
    summary: {
      overview:
        'В програмата за ниво B1.1 (след A2) темата „Аз и другите“ поставя специален акцент върху емоционалния свят на човека: как назоваваме нюансите на чувствата, как изразяваме радост, разочарование или съчувствие и как се справяме с напрежението.',
      keyPoints: [
        'Нюанси и сила на емоциите (Gefühle und Emotionen): froh -> überglücklich / begeistert — на седмото небе / въодушевен; traurig -> niedergeschlagen / verzweifelt — потиснат / отчаян; wütend -> empört — възмутен; müde -> völlig erschöpft — напълно изтощен; dankbar — благодарен, erleichtert — облекчен, stolz, neidisch / eifersüchtig — завистлив / ревнив.',
        'Идиоматични изрази за чувства: im siebten Himmel sein — на седмото небе съм; die Nase voll haben von (+ Dat.) — дошло ми е до гуша от…; auf die Nerven gehen (+ Dat.) — лазя по нервите на някого; die Geduld verlieren — губя търпение; sich Sorgen machen um (+ Akk.) — тревожа се за.',
        'Справяне с емоции и емпатия: mit Stress umgehen — справям се със стреса, sich beruhigen — успокоявам се, jemanden aufmuntern / trösten — ободрявам / утешавам някого, Verständnis zeigen — проявявам разбиране, sich in jemanden hineinversetzen — поставям се на мястото на някого.',
        'Причастия като прилагателни (Partizip I и Partizip II): Partizip I (инфинитив + -d) означава активно, продължаващо действие: ein lächelndes Kind (усмихващо се дете), eine spannende Geschichte (вълнуваща история). Partizip II означава завършено действие или състояние: ein enttäuschter Freund (разочарован приятел), eine gelöste Aufgabe (решена задача).',
        'Примерен текст: Vor meinem ersten großen Auftritt im Schultheater war ich furchtbar nervös und hatte große Angst, meinen Text zu vergessen. Meine beste Freundin hat mich getröstet und mir Mut gemacht. Als ich dann auf der Bühne stand und das lächelnde Publikum sah, beruhigte ich mich sofort. Nach dem donnernden Applaus am Ende war ich überglücklich und unendlich erleichtert.',
      ],
      examGoldenRule:
        'Различавай Partizip I (на -d: aufregend, spannend, ermüdend — кое предизвиква емоцията) от Partizip II (aufgeregt, gespannt, ermüdet — какво изпитва човекът): Der Film war spannend; wir waren sehr gespannt.',
      commonTraps: [
        'Изразът jemanden auf die Nerven gehen изисква Dativ за лицето: Dieses Geräusch geht mir (Dat.) auf die Nerven.',
        'Прилагателното dankbar се свързва с Dativ за човека и с предлога für (+ Akk.) за причината: Ich bin dir für deine Hilfe sehr dankbar.',
      ],
      formulasOrDates: [
        { label: 'Силни емоции', value: 'überglücklich, begeistert, völlig erschöpft, erleichtert' },
        { label: 'Partizip I срещу II', value: 'ein spannender Film (I) | ein gespannter Zuschauer (II)' },
        { label: 'Идиоми', value: 'im siebten Himmel sein | jemandem auf die Nerven gehen' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-emo-chk-1',
        requirement: 'Разказ за преживяване, предизвикало силна емоция (150–170 думи)',
        whyNeeded: 'Споделянето на лични преживявания с оценка и емоционална лексика е основен очакван резултат.',
        isEssentialForSix: true,
        suggestedNotes: 'Какво се случи (Präteritum/Perfekt), как се чувстваше преди и след това, кой ти помогна.',
      },
      {
        id: 'de-b11-emo-chk-2',
        requirement: 'Двойки Partizip I (-end) и Partizip II за описание на ситуации и чувства',
        whyNeeded: 'Част от граматичния минимум за ниво B1.1.',
        isEssentialForSix: true,
        suggestedNotes: 'beruhigend / beruhigt, enttäuschend / enttäuscht, überraschend / überrascht, anstrengend / angestrengt.',
      },
    ],
    flashcards: [
      { id: 'de-b11-emo-fc-1', front: 'Как е „на седмото небе съм“ и „лазя на някого по нервите“?', back: 'im siebten Himmel sein / jemandem auf die Nerven gehen', tag: 'Идиоми' },
      { id: 'de-b11-emo-fc-2', front: 'Как е „утешавам някого“ и „давам кураж на някого“?', back: 'jemanden trösten / jemandem Mut machen', tag: 'Емпатия' },
      { id: 'de-b11-emo-fc-3', front: 'Как се образува Partizip I и какво означава (напр. от lächeln)?', back: 'Infinitiv + -d (lächelnd -> ein lächelndes Kind — усмихващо се дете).', tag: 'Граматика' },
      { id: 'de-b11-emo-fc-4', front: 'Каква е разликата между überraschend и überrascht?', back: 'überraschend = изненадващ (факт, новина); überrascht = изненадан (човек).', tag: 'Граматика' },
      { id: 'de-b11-emo-fc-5', front: 'Как е „потиснат“ и „напълно изтощен“?', back: 'niedergeschlagen / völlig erschöpft', tag: 'Емоции' },
      { id: 'de-b11-emo-fc-6', front: 'Как е „справям се със стреса“?', back: 'mit dem Stress umgehen (или Stress abbauen)', tag: 'Поведение' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете с подходящото причастие: Nach der dreistündigen Prüfung kamen die ___ Schüler aus dem Saal.',
        options: ['ermüdenden', 'erschöpften', 'anstrengenden', 'überraschenden'],
        correctIndex: 1,
        explanation: 'Учениците изпитват умора (състояние след приключило действие -> Partizip II): die erschöpften Schüler.',
      },
      {
        id: 2,
        question: 'Попълнете: Die Nachricht war für uns alle völlig ___.',
        options: ['überrascht', 'überraschend', 'überraschte', 'überraschen'],
        correctIndex: 1,
        explanation: 'Новината предизвиква изненада (активно качество -> Partizip I): überraschend.',
      },
      {
        id: 3,
        question: 'Какво означава идиомът „Ich habe die Nase voll davon!“?',
        options: [
          'Писна ми / Дошло ми е до гуша от това!',
          'Имам силна хрема и настинка.',
          'Много ми харесва ароматът на цветята.',
          'На седмото небе съм от щастие.',
        ],
        correctIndex: 0,
        explanation: 'Die Nase voll haben von etwas е разговорен идиом със значение „омръзна ми / дойде ми до гуша“.',
      },
      {
        id: 4,
        question: 'Попълнете: Ich bin ___ für deine ehrlichen Worte sehr dankbar.',
        options: ['dich', 'dir', 'du', 'dein'],
        correctIndex: 1,
        explanation: 'Прилагателното dankbar изисква Dativ за лицето, на което сме благодарни: Ich bin dir dankbar.',
      },
      {
        id: 5,
        question: 'Попълнете: Als meine Freundin wegen der Note weinte, habe ich versucht, sie zu ___.',
        options: ['trösten', 'streiten', 'ärgern', 'enttäuschen'],
        correctIndex: 0,
        explanation: 'Trösten означава „утешавам“.',
      },
      {
        id: 6,
        question: 'Попълнете: Seine ständigen Ausreden gehen ___ langsam auf die Nerven.',
        options: ['mich', 'mir', 'mein', 'ich'],
        correctIndex: 1,
        explanation: 'Идиомът е jemandem (Dativ) auf die Nerven gehen -> gehen mir auf die Nerven.',
      },
    ],
    quickQuestions: ['Как да различавам Partizip I и Partizip II като прилагателни?', 'Кои немски идиоми описват силна радост или досада?', 'Как да изразя съчувствие и подкрепа към приятел?'],
  },
  {
    ...base,
    id: 'de-b11-world-around-me',
    monTopicIds: ids('2'),
    title: 'Немски B1.1: Светът около мен — училищен живот, образователна система и безопасност на движението',
    originalNoteExcerpt:
      'Тематична област „Светът около мен“: моето училище (образование, училищна общност, правила); моето населено място (ориентиране и безопасност на движението). Граматика: модални конструкции, относителни изречения с предлози и с wo/was, Passiv с модални глаголи.',
    summary: {
      overview:
        'Разглеждаме образователната система, правата и задълженията в училище и правилата за безопасност на участниците в движението в съвременния град.',
      keyPoints: [
        'Образование и училищен живот (Bildung und Schulalltag): die Allgemeinbildung — общо образование, die Berufsschule / das berufliche Gymnasium — професионална гимназия, der Leistungsdruck — натиск за високи резултати, die Benotung / das Zeugnis — оценяване / свидетелство, außerschulische Aktivitäten — извънкласни дейности, ein Stipendium bekommen — получавам стипендия.',
        'Училищната система в Германия (в сравнение с България): die Grundschule (1.–4. Klasse), след това Hauptschule, Realschule, Gymnasium (до Abitur) или Gesamtschule. Система за оценяване в Германия: от 1 (sehr gut — най-високата оценка!) до 6 (ungenügend).',
        'Безопасност на движението (Verkehrssicherheit): der Verkehrsteilnehmer — участник в движението (Autofahrer, Radfahrer, Fußgänger, E-Scooter-Fahrer), die Straßenverkehrsordnung (StVO) — правилник за движение по пътищата, das Tempolimit / die Geschwindigkeitsbegrenzung, der Sicherheitsabstand — безопасна дистанция, ein Bußgeld zahlen — плащам глоба.',
        'Правила и задължения в Passiv с модални глаголи: На пътя и в училище правилата често се формулират безлично в страдателен залог: Der Sicherheitsgurt muss immer angelegt werden. Handys dürfen während der Fahrt nicht benutzt werden. Die Schulordnung muss von allen Schülern eingehalten werden.',
        'Примерен текст: In unserer Stadt benutzen immer mehr Jugendliche E-Scooter und Fahrräder, um zur Schule zu fahren. Deshalb ist die Verkehrssicherheit ein sehr wichtiges Thema. Meiner Meinung nach sollten nicht nur mehr sichere Radwege gebaut werden, sondern es müssen auch die Verkehrsregeln strenger kontrolliert werden. Wer während der Fahrt auf sein Smartphone schaut, gefährdet sich selbst und andere.',
      ],
      examGoldenRule:
        'Запомни обратната скала на оценките в Германия и Австрия: 1 (Eins) е отлична оценка (sehr gut), а 6 (в Австрия 5) е слаба оценка! В Швейцария скалата е като в България — от 1 до 6, където 6 е най-високата оценка.',
      commonTraps: [
        'Съществителното das Zeugnis (училищно свидетелство/диплома) образува множествено число die Zeugnisse.',
        'Глаголът опасвам/застрашавам е gefährden (+ Akkusativ без предлог): Er gefährdet die Fußgänger.',
      ],
      formulasOrDates: [
        { label: 'Оценки в Германия', value: '1 = sehr gut, 2 = gut, 3 = befriedigend, 4 = ausreichend, 5 = mangelhaft, 6 = ungenügend' },
        { label: 'Правило в Passiv', value: 'Handys dürfen beim Fahren nicht benutzt werden.' },
        { label: 'Пътна безопасност', value: 'die Straßenverkehrsordnung (StVO) | ein Bußgeld zahlen' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-world-chk-1',
        requirement: 'Аргументативен текст „Wie kann der Schulweg für Jugendliche sicherer werden?“ (150–170 думи)',
        whyNeeded: 'Комбинира двете подтеми от програмата — училище и безопасност на движението.',
        isEssentialForSix: true,
        suggestedNotes: 'Проблеми (интензивен трафик, липса на велоалеи, телефони) + решения с Passiv и модални глаголи.',
      },
      {
        id: 'de-b11-world-chk-2',
        requirement: 'Сравнителна таблица на училищната система и оценките в Германия и България',
        whyNeeded: 'За социокултурна компетентност при четене и слушане.',
        isEssentialForSix: false,
        suggestedNotes: 'Grundschule, Gymnasium, Abitur, Notenskala 1–6.',
      },
    ],
    flashcards: [
      { id: 'de-b11-world-fc-1', front: 'Коя е най-високата училищна оценка в Германия и коя в Швейцария?', back: 'В Германия е 1 (sehr gut); в Швейцария е 6 (като в България).', tag: 'Странознание' },
      { id: 'de-b11-world-fc-2', front: 'Как е „извънкласни дейности“ и „училищно свидетелство“?', back: 'außerschulische Aktivitäten / das Zeugnis', tag: 'Училище' },
      { id: 'de-b11-world-fc-3', front: 'Как е „участник в движението“ и „плащам глоба“?', back: 'der Verkehrsteilnehmer / ein Bußgeld (eine Strafe) zahlen', tag: 'Движение' },
      { id: 'de-b11-world-fc-4', front: 'Как се превежда „Правилата трябва да се спазват“ в Passiv?', back: 'Die Regeln müssen eingehalten (beachtet) werden.', tag: 'Граматика' },
      { id: 'de-b11-world-fc-5', front: 'Как е „ограничение на скоростта“ и „безопасна дистанция“?', back: 'die Geschwindigkeitsbegrenzung (das Tempolimit) / der Sicherheitsabstand', tag: 'Движение' },
      { id: 'de-b11-world-fc-6', front: 'Как е „застрашавам другите“ на немски?', back: 'andere gefährden', tag: 'Лексика' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Вашият германски приятел от Мюнхен Ви пише: „Ich habe im Mathetest eine Eins geschrieben!“ Какво означава това?',
        options: [
          'Получил е най-високата възможна оценка („отличен“).',
          'Получил е най-слабата оценка и трябва да повтаря изпита.',
          'Решил е само една задача от теста.',
          'Заел е последно място в класа.',
        ],
        correctIndex: 0,
        explanation: 'В германската образователна система оценката 1 (eine Eins) означава „sehr gut“ (отличен).',
      },
      {
        id: 2,
        question: 'Попълнете: In der Nähe von Schulen und Kindergärten ___ die Geschwindigkeit auf 30 km/h reduziert werden.',
        options: ['muss', 'hat', 'ist', 'wird zu'],
        correctIndex: 0,
        explanation: 'Конструкцията reduiziert werden е инфинитив на Passiv и се комбинира с модалния глагол muss.',
      },
      {
        id: 3,
        question: 'Какво означава думата „das Bußgeld“ в контекста на движението по пътищата?',
        options: ['парична глоба за нарушение', 'билет за градски автобус', 'джобни пари за ученици', 'отстъпка за велосипедисти'],
        correctIndex: 0,
        explanation: 'Das Bußgeld е административна парична глоба за нарушение на правилата за движение.',
      },
      {
        id: 4,
        question: 'Попълнете: Wer beim Autofahren Nachrichten auf dem Handy tippt, ___ alle anderen Verkehrsteilnehmer.',
        options: ['gefährdet', 'schützt', 'unterstützt', 'beachtet'],
        correctIndex: 0,
        explanation: 'Gefährden означава „излагам на опасност / застрашавам“.',
      },
      {
        id: 5,
        question: 'Попълнете относителното изречение: Die Berufsschule, für ___ er sich entschieden hat, bietet moderne Computerräume.',
        options: ['der', 'die', 'denen', 'dem'],
        correctIndex: 1,
        explanation: 'Предлогът für изисква Akkusativ; die Berufsschule е женски род -> für die er sich entschieden hat.',
      },
      {
        id: 6,
        question: 'Как се нарича документът с годишните оценки, който учениците получават в края на учебната година?',
        options: ['das Zeugnis', 'das Rezept', 'der Fahrplan', 'der Kassenbon'],
        correctIndex: 0,
        explanation: 'Das Zeugnis е удостоверението / свидетелството с училищните оценки.',
      },
    ],
    quickQuestions: ['Какви са разликите между училищната система в Германия и България?', 'Как да формулирам правила за пътна безопасност в Passiv?', 'Какво означава оценка Eins в Германия?'],
  },
  {
    ...base,
    id: 'de-b11-everyday-life',
    monTopicIds: ids('3'),
    title: 'Немски B1.1: Всекидневие — свободно време, разумно потребление, услуги и професионално ориентиране',
    originalNoteExcerpt:
      'Тематична област „Всекидневие“: свободно време; пазаруване и услуги; професии и социални контакти. Граматика: условни и финални изречения, инфинитивни конструкции с zu, Konjunktiv II за учтиви запитвания и рекламации.',
    summary: {
      overview:
        'Обсъждаме организацията на свободното време, правата на потребителя при пазаруване и ползване на услуги, както и избора на професия, стажовете и социалните контакти на работното място.',
      keyPoints: [
        'Свободно време и баланс: einem Hobby nachgehen — занимавам се с хоби, ehrenamtlich arbeiten / Freiwilligenarbeit leisten — занимавам се с доброволчество, kulturelle Veranstaltungen besuchen, sich aktiv erholen.',
        'Пазаруване, права на потребителя и услуги: der Verbraucher / der Konsument — потребител, Online-Shopping (Vorteile: bequem, große Auswahl; Nachteile: Rücksendung, Betrugsgefahr), das Rückgaberecht — право на връщане, eine Reklamation einreichen — подавам рекламация, den Kaufpreis erstatten — възстановявам сумата.',
        'Професии, стаж и социални контакти: die Berufswahl — избор на професия, die duale Ausbildung (съчетание от теоретично обучение в професионално училище и практика във фирма в Германия), die Teilzeitarbeit / Vollzeitarbeit, das Arbeitsklima — работна атмосфера, das Gehalt — заплата, Kontakte knüpfen (Networking).',
        'Учтиви рекламации и запитвания с Konjunktiv II: При проблем с покупка или услуга използваме учтив, но ясен тон: Ich habe vor einer Woche bei Ihnen … bestellt. Leider ist das Gerät beschädigt angekommen. Könnten Sie das Produkt bitte umtauschen oder mir den Kaufpreis erstatten?',
        'Примерен текст: Für viele Jugendliche in Deutschland ist die duale Ausbildung nach der Schule sehr attraktiv, weil man dabei nicht nur Theorie lernt, sondern auch praktische Erfahrungen im Betrieb sammelt und eigenes Geld verdient. Ich persönlich möchte nach dem Abitur Informatik studieren. In den Sommerferien arbeite ich Teilzeit in einem Buchladen, um Kontakte zu knüpfen und für einen neuen Laptop zu sparen.',
      ],
      examGoldenRule:
        'Когато пишеш официален имейл за рекламация на стока или услуга, посочи три неща: 1. Какво и кога си купил/поръчал; 2. Какъв точно е дефектът (funktioniert nicht / ist beschädigt); 3. Какво очакваш (Umtausch, Reparatur или Rückerstattung des Kaufpreises).',
      commonTraps: [
        'Различавай das Gehalt (месечна заплата на служител), der Lohn (почасово възнаграждение/надница) и das Einkommen (общ доход).',
        'Изразът einem Hobby nachgehen изисква Dativ: Ich gehe in meiner Freizeit einem interessanten Hobby nach.',
      ],
      formulasOrDates: [
        { label: 'Рекламация', value: 'eine Reklamation einreichen | Ware umtauschen | den Preis erstatten' },
        { label: 'Професия и стаж', value: 'die Berufswahl | die duale Ausbildung | praktische Erfahrungen sammeln' },
        { label: 'Доброволчество', value: 'ehrenamtlich arbeiten | Freiwilligenarbeit leisten' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-day-chk-1',
        requirement: 'Официален имейл за рекламация на дефектна онлайн поръчка (150–160 думи)',
        whyNeeded: 'Официалното писмо по подтемата „Пазаруване и услуги“ е ключов очакван резултат.',
        isEssentialForSix: true,
        suggestedNotes: 'Sehr geehrte Damen und Herren, Bestellnummer, описание на проблема, молба за замяна/възстановяване на сумата, срок.',
      },
      {
        id: 'de-b11-day-chk-2',
        requirement: 'Текст „Моята мечтана професия и защо я избирам“ (150–160 думи)',
        whyNeeded: 'Покрива подтемата „Професии и социални контакти“.',
        isEssentialForSix: true,
        suggestedNotes: 'Необходими качества, образование/квалификация, работна среда, предимства и предизвикателства.',
      },
    ],
    flashcards: [
      { id: 'de-b11-day-fc-1', front: 'Какво представлява „die duale Ausbildung“ в Германия?', back: 'Двойно професионално обучение: учене в професионално училище + платена практика в предприятие.', tag: 'Странознание' },
      { id: 'de-b11-day-fc-2', front: 'Как е „право на връщане“ и „възстановявам покупната цена“?', back: 'das Rückgaberecht / den Kaufpreis erstatten', tag: 'Потребители' },
      { id: 'de-b11-day-fc-3', front: 'Как е „работя доброволно (без заплащане за кауза)“?', back: 'ehrenamtlich arbeiten / Freiwilligenarbeit leisten', tag: 'Свободно време' },
      { id: 'de-b11-day-fc-4', front: 'Как е „работа на пълно / непълно работно време“?', back: 'die Vollzeitarbeit / die Teilzeitarbeit', tag: 'Професии' },
      { id: 'de-b11-day-fc-5', front: 'Как е „създавам контакти“ и „работна атмосфера“?', back: 'Kontakte knüpfen / das Arbeitsklima', tag: 'Професии' },
      { id: 'de-b11-day-fc-6', front: 'Как е „занимавам се с хоби“ с глагола nachgehen?', back: 'einem Hobby nachgehen (+ Dativ)', tag: 'Свободно време' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Поръчали сте слушалки онлайн, но едната не работи. Какво ще поискате в официалния имейл до магазина?',
        options: [
          'Ich bitte Sie, die Kopfhörer umzutauschen oder mir den Kaufpreis zu erstatten.',
          'Ich möchte mich bei Ihnen um eine Stelle als Verkäufer bewerben.',
          'Könnten Sie mir bitte den Weg zum nächsten Bahnhof erklären?',
          'Ich lade Sie herzlich zu meiner Geburtstagsparty am Samstag ein.',
        ],
        correctIndex: 0,
        explanation: 'Umtauschen (заменям) и den Kaufpreis erstatten (възстановявам сумата) са точните изрази при рекламация.',
      },
      {
        id: 2,
        question: 'Какво означава изразът „ehrenamtlich arbeiten“?',
        options: [
          'работя доброволно в полза на обществото без заплащане',
          'работя извънредно срещу двойно заплащане',
          'работя само от вкъщи пред компютър',
          'управлявам собствена банка',
        ],
        correctIndex: 0,
        explanation: 'Ehrenamtlich означава на доброволни начала / общественополезен труд.',
      },
      {
        id: 3,
        question: 'Какво съчетава германската система „duale Ausbildung“?',
        options: [
          'Теория в професионално училище и практическа работа в предприятие',
          'Две висши образования в две различни държави',
          'Едновременно изучаване на немски и френски в началното училище',
          'Работа само през уикендите',
        ],
        correctIndex: 0,
        explanation: 'Дуалното обучение комбинира учебни дни в Berufsschule и практически дни във фирма.',
      },
      {
        id: 4,
        question: 'Попълнете: Bei der Berufswahl ist mir ein gutes ___ im Team wichtiger als ein sehr hohes Gehalt.',
        options: ['Arbeitsklima', 'Rückgaberecht', 'Bußgeld', 'Gewitter'],
        correctIndex: 0,
        explanation: 'Das Arbeitsklima означава работна атмосфера / климат в екипа.',
      },
      {
        id: 5,
        question: 'Попълнете: In meiner Freizeit gehe ich gern ___ kreativen Hobby nach.',
        options: ['ein', 'einen', 'einem', 'einer'],
        correctIndex: 2,
        explanation: 'Изразът einem Hobby nachgehen изисква Dativ; das Hobby е среден род -> einem kreativen Hobby.',
      },
      {
        id: 6,
        question: 'Коя дума означава „потребител / клиент“?',
        options: ['der Verbraucher', 'der Verkäufer', 'der Hersteller', 'der Arbeitgeber'],
        correctIndex: 0,
        explanation: 'Der Verbraucher (или der Konsument) означава потребител.',
      },
    ],
    quickQuestions: ['Как да напиша официална рекламация за онлайн покупка?', 'Какви са предимствата на дуалното обучение (duale Ausbildung)?', 'Как да говоря за доброволчество и избор на кариера?'],
  },
  {
    ...base,
    id: 'de-b11-health',
    monTopicIds: ids('4'),
    title: 'Немски B1.1: Здраве и здравословен начин на живот — балансирано хранене, превенция и медицински грижи',
    originalNoteExcerpt:
      'Тематична област „Здраве и здравословен начин на живот“: здравословно хранене; здравословен начин на живот; здравен статус и медицинско обслужване. Граматика: страдателен залог (Vorgangspassiv и Zustandspassiv базово), инфинитивни конструкции с um … zu и (an)statt … zu, условни и отстъпителни изречения.',
    summary: {
      overview:
        'Анализираме принципите на здравословното хранене, вредата от заседналия начин на живот и зависимостите и проследяваме процеса на медицински преглед, диагностика и лечение.',
      keyPoints: [
        'Здравословно хранене и диети (Gesunde Ernährung): ausgewogene Kost, frische und unverarbeitete Lebensmittel — пресни и непреработени храни, der Bewegungsmangel — обездвижване, das Übergewicht — наднормено тегло, Nahrungsmittelallergien / Unverträglichkeiten — хранителни алергии / непоносимости, vegetarische/vegane Ernährung.',
        'Здравословен начин на живот и превенция (Vorsorge): Vorbeugen ist besser als heilen — Профилактиката е по-добра от лечението; auf Alkohol und Rauchen verzichten, ausreichend schlafen, digitale Auszeit (Digital Detox) nehmen, das seelische Gleichgewicht — душевно равновесие.',
        'Медицинско обслужване и лечение: die Notaufnahme — спешно отделение, der Notarzt / der Krankenwagen (телефон 112 в целия ЕС), die Diagnose stellen, Blut abnehmen — взимам кръв, röntgen — правя рентген, ein Medikament verschreiben, sich von einer Operation erholen — възстановявам се от операция.',
        'Процес срещу състояние в Passiv (werden-Passiv vs. sein-Passiv): Vorgangspassiv с werden описва самото действие (Die Wunde wird vom Arzt verbunden — Раната бива превързвана), а Zustandspassiv със sein описва готовия резултат (Die Wunde ist jetzt verbunden — Раната вече е превързана).',
        'Примерен текст: Durch langes Sitzen vor dem Computer leiden heute schon viele junge Menschen unter Bewegungsmangel und Rückenschmerzen. Anstatt den ganzen Nachmittag in sozialen Netzwerken zu verbringen, sollte man mindestens eine Stunde täglich an der frischen Luft Sport treiben. Außerdem ist eine ausgewogene Ernährung entscheidend, um das Immunsystem zu stärken und Krankheiten vorzubeugen.',
      ],
      examGoldenRule:
        'Различавай действие и резултат в страдателен залог: Die Praxis wird um 8 Uhr geöffnet (отварят я — процес с werden) срещу Die Praxis ist von 8 bis 18 Uhr geöffnet (отворена е — състояние със sein).',
      commonTraps: [
        'Глаголът leiden (страдам от заболяване/проблем) се свързва с предлога unter + Dativ: Er leidet unter starken Kopfschmerzen (а за „боледувам от“ се ползва и an + Dat.: an einer Grippe leiden).',
        'Глаголът vorbeugen (предотвратявам / правя профилактика срещу) изисква Dativ: Krankheiten (Dat. мн.ч.) vorbeugen.',
      ],
      formulasOrDates: [
        { label: 'Пословица за превенция', value: 'Vorbeugen ist besser als heilen.' },
        { label: 'Процес vs. състояние', value: 'wird untersucht (процес) | ist untersucht (резултат)' },
        { label: 'Страдам от…', value: 'leiden unter (+ Dat.) Bewegungsmangel / Stress / Allergien' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-health-chk-1',
        requirement: 'Статия/есе „Gesund leben in der modernen Welt — aber wie?“ (150–170 думи)',
        whyNeeded: 'Обобщава храненето, спорта и превенцията в свързан аргументативен текст.',
        isEssentialForSix: true,
        suggestedNotes: 'Причини за нездравословен живот (Stress, Bewegungsmangel, Fast Food) и 3 конкретни препоръки.',
      },
      {
        id: 'de-b11-health-chk-2',
        requirement: 'Сравнение между Vorgangspassiv (werden + Partizip II) и Zustandspassiv (sein + Partizip II)',
        whyNeeded: 'Помага за точно описание на медицински и кулинарни процеси и резултати.',
        isEssentialForSix: false,
        suggestedNotes: 'Das Essen wird gekocht -> Das Essen ist gekocht; Das Bein wird gebrochen -> Das Bein ist gebrochen.',
      },
    ],
    flashcards: [
      { id: 'de-b11-health-fc-1', front: 'Как е „обездвижване (липса на движение)“ и „наднормено тегло“?', back: 'der Bewegungsmangel / das Übergewicht', tag: 'Здраве' },
      { id: 'de-b11-health-fc-2', front: 'Как се превежда пословицата „Профилактиката е по-добра от лечението“?', back: 'Vorbeugen ist besser als heilen.', tag: 'Превенция' },
      { id: 'de-b11-health-fc-3', front: 'Как е „спешно отделение“ и „линейка“?', back: 'die Notaufnahme / der Krankenwagen (der Rettungswagen)', tag: 'Медицина' },
      { id: 'de-b11-health-fc-4', front: 'С кой предлог и падеж се свързва глаголът leiden („страдам от стрес“)?', back: 'leiden unter + Dativ (unter großem Stress leiden).', tag: 'Глаголи' },
      { id: 'de-b11-health-fc-5', front: 'Каква е разликата между „Die Tür wird geschlossen“ и „Die Tür ist geschlossen“?', back: 'wird geschlossen = затваря се в момента (процес); ist geschlossen = затворена е (състояние).', tag: 'Граматика' },
      { id: 'de-b11-health-fc-6', front: 'Как е „възстановявам се от болест/операция“?', back: 'sich von einer Krankheit / Operation erholen', tag: 'Медицина' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Immer mehr Büroangestellte leiden ___ chronischen Rückenschmerzen und Bewegungsmangel.',
        options: ['über', 'unter', 'auf', 'für'],
        correctIndex: 1,
        explanation: 'Глаголът leiden се свързва с предлога unter + Dativ.',
      },
      {
        id: 2,
        question: 'Кое изречение описва вече настъпило състояние (Zustandspassiv) след медицинска намеса?',
        options: [
          'Die Wunde ist bereits desinfiziert und verbunden.',
          'Der Arzt wird die Wunde gleich verbinden.',
          'Die Wunde wurde gestern vom Arzt untersucht.',
          'Die Krankenschwester verbindet gerade die Wunde.',
        ],
        correctIndex: 0,
        explanation: 'Конструкцията ist desinfiziert und verbunden (sein + Partizip II) изразява постигнато състояние.',
      },
      {
        id: 3,
        question: 'Попълнете: ___ abends stundenlang fernzusehen, gehe ich lieber eine Runde im Park spazieren.',
        options: ['Um', 'Ohne', 'Anstatt', 'Damit'],
        correctIndex: 2,
        explanation: 'Изразява се алтернатива („Вместо да гледам с часове телевизия…“) -> Anstatt … fernzusehen.',
      },
      {
        id: 4,
        question: 'Къде в болницата се приемат пациенти при внезапен тежък инцидент?',
        options: ['In der Notaufnahme', 'In der Umkleidekabine', 'In der Buchhandlung', 'Im Reisebüro'],
        correctIndex: 0,
        explanation: 'Die Notaufnahme е спешното приемно отделение в болница.',
      },
      {
        id: 5,
        question: 'Попълнете: Nach der Grippe hat es zwei Wochen gedauert, bis ich mich vollständig ___ hatte.',
        options: ['erholt', 'verletzt', 'verschrieben', 'untersucht'],
        correctIndex: 0,
        explanation: 'Sich erholen означава „възстановявам се / оздравявам“.',
      },
      {
        id: 6,
        question: 'Кой телефонен номер е единен за спешна медицинска помощ и пожарна в Германия, Австрия и целия ЕС?',
        options: ['112', '11880', '999', '0800'],
        correctIndex: 0,
        explanation: 'Номер 112 е единният европейски номер за спешни повиквания (Notruf).',
      },
    ],
    quickQuestions: ['Каква е разликата между werden-Passiv и sein-Passiv?', 'Как да говоря за превенция на заболявания и здравословен баланс?', 'Кой предлог се използва след leiden и sich erholen?'],
  },
  {
    ...base,
    id: 'de-b11-nature',
    monTopicIds: ids('5'),
    title: 'Немски B1.1: Природа и екология — опазване на околната среда, ресурси и екологична отговорност',
    originalNoteExcerpt:
      'Тематична област „Природа и екология“: опазване на околната среда. Граматика: причинно-следствени и условни връзки (weil, da, deshalb, daher, darum, wegen), модални конструкции, страдателен залог, пропорционални изречения с je … desto.',
    summary: {
      overview:
        'Фокусираме се върху опазването на околната среда — глобалните екологични проблеми, пестенето на природни ресурси, зелената енергия и личната отговорност на всеки гражданин.',
      keyPoints: [
        'Екологични заплахи (Umweltprobleme): der Klimawandel, der CO2-Ausstoß — емисии на въглероден диоксид, die Luft- und Meeresverschmutzung, der Plastikmüll in den Ozeanen, das Abschmelzen der Gletscher — топене на ледниците, die Verschwendung von Ressourcen — разхищение на ресурси und Lebensmitteln.',
        'Мерки за опазване на природата (Maßnahmen zum Umweltschutz): umweltfreundlich / umweltbewusst handeln — действам екологосъобразно, Müll vermeiden und trennen, Einwegplastik verbieten — забранявам пластмасата за еднократна употреба, Mehrwegflaschen benutzen, Elektromobilität und öffentlichen Nahverkehr ausbauen, Bäume aufforsten — залесявам.',
        'Причинно-следствени връзки на ниво B1.1: Съюзи с глагол в края — weil, da; наречия с инверсия (глагол веднага след тях) — deshalb, daher, darum, deswegen, aus diesem Grund; предлози с Genitiv — wegen, aufgrund (Aufgrund der hohen Temperaturen trocknen viele Flüsse aus).',
        'Пропорционални изречения с je … desto / umso („колкото по-…, толкова по-…“): След je стои сравнителна степен и глаголът отива в КРАЯ на първата част; след desto/umso стои сравнителна степен и ВЕДНАГА след нея стои спрегнатият глагол: Je mehr Energie wir sparen, desto geringer ist der CO2-Ausstoß.',
        'Примерен текст: Der Schutz unserer Umwelt ist eine der größten Aufgaben unserer Generation. Je mehr Einwegplastik wir im Alltag verbrauchen, desto stärker werden die Meere verschmutzt. Aus diesem Grund versuche ich, möglichst umweltbewusst zu leben: Ich kaufe unverpacktes Obst, benutze eine Mehrwegflasche und fahre fast überallhin mit dem Fahrrad.',
      ],
      examGoldenRule:
        'Запомни словореда при je … desto: в първата част след je + Komparativ глаголът е на ПОСЛЕДНО място, а във втората част след desto + Komparativ глаголът идва ВЕДНАГА: Je öfter man mit dem Rad fährt, desto sauberer bleibt die Luft.',
      commonTraps: [
        'В конструкцията je … desto и двете прилагателни/наречия трябва да са в сравнителна степен (Komparativ: mehr, besser, sauberer, schneller).',
        'Различавай Einweg- (за еднократна употреба: Einwegbecher) от Mehrweg- (за многократна употреба: Mehrwegflasche).',
      ],
      formulasOrDates: [
        { label: 'Пропорция je … desto', value: 'Je + Komparativ … (глагол в края), desto + Komparativ + глагол + подлог' },
        { label: 'Причина и следствие', value: 'aufgrund (+ Gen.) | daher / darum / aus diesem Grund (+ глагол)' },
        { label: 'Опаковки', value: 'Einwegplastik vermeiden | Mehrwegflaschen benutzen' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-nature-chk-1',
        requirement: 'Аргументативен текст „Plastik im Alltag — wie können wir den Müll reduzieren?“ (150–170 думи)',
        whyNeeded: 'Опазването на околната среда е централната подтема в програмата за B1.1.',
        isEssentialForSix: true,
        suggestedNotes: 'Проблемът с Einwegplastik, поне 1 изречение с je … desto, 1 с aufgrund (+ Gen.) и лични примери.',
      },
      {
        id: 'de-b11-nature-chk-2',
        requirement: 'Четири изречения по модела je … desto за екология и климат',
        whyNeeded: 'Конструкцията je … desto е маркер за високо владеене на синтаксиса на ниво B1.',
        isEssentialForSix: true,
        suggestedNotes: 'Je wärmer das Klima wird, desto schneller schmelzen die Gletscher.',
      },
    ],
    flashcards: [
      { id: 'de-b11-nature-fc-1', front: 'Каква е разликата между Einwegflasche и Mehrwegflasche?', back: 'Einwegflasche е бутилка за еднократна употреба; Mehrwegflasche е за многократна употреба.', tag: 'Екология' },
      { id: 'de-b11-nature-fc-2', front: 'Как е „екологосъобразен / щадящ природата“?', back: 'umweltfreundlich / umweltbewusst / nachhaltig', tag: 'Екология' },
      { id: 'de-b11-nature-fc-3', front: 'Какъв е словоредът в конструкцията „Je …, desto …“?', back: 'Je + Komparativ + … + глагол в края, desto + Komparativ + глагол + подлог.', tag: 'Граматика' },
      { id: 'de-b11-nature-fc-4', front: 'Как е „разхищение на храна и ресурси“?', back: 'die Verschwendung von Lebensmitteln und Ressourcen', tag: 'Екология' },
      { id: 'de-b11-nature-fc-5', front: 'Какво означава предлогът aufgrund и кой падеж изисква?', back: '„Поради / въз основа на“ — изисква Genitiv (aufgrund des Klimawandels).', tag: 'Предлози' },
      { id: 'de-b11-nature-fc-6', front: 'Как е „емисии на въглероден диоксид“?', back: 'der CO2-Ausstoß (die CO2-Emissionen)', tag: 'Климат' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Je mehr Bäume wir pflanzen, ___ sauberer wird die Luft in unseren Städten.',
        options: ['als', 'desto', 'wie', 'damit'],
        correctIndex: 1,
        explanation: 'Двойният съюз за пропорционално сравнение е je … desto (или je … umso).',
      },
      {
        id: 2,
        question: 'Кое продължение има правилен словоред: „Je weniger Plastik wir kaufen, …“?',
        options: [
          'desto weniger Müll entsteht in der Natur.',
          'desto weniger Müll in der Natur entsteht.',
          'desto entsteht weniger Müll in der Natur.',
          'je weniger Müll entsteht in der Natur.',
        ],
        correctIndex: 0,
        explanation: 'След desto + сравнителна степен с пояснението ѝ (desto weniger Müll) веднага следва спрегнатият глагол (entsteht).',
      },
      {
        id: 3,
        question: 'Попълнете: ___ der langen Trockenheit stieg die Gefahr von Waldbränden stark an.',
        options: ['Weil', 'Aufgrund', 'Obwohl', 'Trotzdem'],
        correctIndex: 1,
        explanation: 'Следва съществително в Genitiv (der langen Trockenheit), затова е нужен предлогът Aufgrund („поради“).',
      },
      {
        id: 4,
        question: 'Какво означава изразът „Lebensmittel verschwenden“?',
        options: [
          'разхищавам / изхвърлям годна храна',
          'готвя здравословна вечеря',
          'купувам пресни зеленчуци от пазара',
          'дарявам храна на нуждаещи се',
        ],
        correctIndex: 0,
        explanation: 'Verschwenden означава „прахосвам / разхищавам“.',
      },
      {
        id: 5,
        question: 'Кое действие е пример за „umweltbewusstes Verhalten“?',
        options: [
          'Mehrwegflaschen und Stofftaschen im Alltag benutzen',
          'Jeden Tag kurze Strecken allein mit dem Auto fahren',
          'Batterien und Plastik in den Wald werfen',
          'Im Winter bei offenen Fenstern voll heizen',
        ],
        correctIndex: 0,
        explanation: 'Използването на бутилки и чанти за многократна употреба намалява отпадъците.',
      },
      {
        id: 6,
        question: 'Попълнете: Die Meere sind stark verschmutzt, ___ müssen wir den Plastikverbrauch dringend senken.',
        options: ['weil', 'da', 'daher', 'obwohl'],
        correctIndex: 2,
        explanation: 'Глаголът müssen стои веднага след свързващата дума, което изисква наречието за следствие daher („поради това“).',
      },
    ],
    quickQuestions: ['Как се образуват изречения с je … desto?', 'Кои думи използваме вместо weil и deshalb на ниво B1?', 'Как да аргументирам мерки за опазване на околната среда?'],
  },
  {
    ...base,
    id: 'de-b11-homeland-and-world',
    monTopicIds: ids('6'),
    title: 'Немски B1.1: Моята родина и светът — празници, туризъм, културно-историческо наследство и принос към света',
    originalNoteExcerpt:
      'Тематична област „Моята родина и светът“: празници и традиции; туризъм; културно-исторически забележителности; принос на моята родина и страните на изучавания език към световното наследство. Граматика: Präteritum, Plusquamperfekt, Passiv Präteritum и Perfekt, относителни изречения в Genitiv (dessen/deren базово).',
    summary: {
      overview:
        'Представяме богатото културно-историческо наследство на България и на немскоезичните страни, сравняваме празничните традиции и обсъждаме устойчивия и културния туризъм.',
      keyPoints: [
        'Туризъм и видове пътувания: der Kulturtourismus, der Ökotourismus / sanfter Tourismus — устойчив (щадящ) туризъм, der Massentourismus, die Pauschalreise — пакетна екскурзия, individuell reisen, Sehenswürdigkeiten besichtigen, landestypische Spezialitäten probieren.',
        'Празници и живи традиции: Обичаи като символ на културна идентичност — в България: Лазаруване, Кукери, Нестинарство, 24 май; в Германия, Австрия и Швейцария: Weihnachtsmarkt / Christkindlmarkt, Oktoberfest in München, Wiener Opernball, Basler Fasnacht, Tag der Deutschen Einheit (3. Oktober — Ден на германското единство).',
        'Принос към световното културно и научно наследство: Световни обекти на ЮНЕСКО в България (Боянската църква — die Kirche von Bojana, Мадарският конник — der Reiter von Madara, Казанлъшката и Свещарската гробница, Национален парк „Пирин“, резерват „Сребърна“) и в D-A-CH (Kölner Dom, Museumsinsel Berlin, Altstadt von Salzburg und Wien, Schweizer Alpen Jungfrau-Aletsch).',
        'Относителни местоимения в Genitiv (dessen / deren — „чиито/чийто/чиято“): За притежател от м.р. и ср.р. ед.ч. се използва dessen, а за притежател от ж.р. ед.ч. и за множествено число — deren (след тях съществителното е БЕЗ член!): Das ist die Kirche von Bojana, deren mittelalterliche Fresken weltberühmt sind. Das ist der Dichter, dessen Werke in viele Sprachen übersetzt wurden.',
        'Примерен текст: Bulgarien und die deutschsprachigen Länder leisten einen bedeutenden Beitrag zum europäischen Kulturerbe. Ein beeindruckendes Beispiel in Sofia ist die mittelalterliche Kirche von Bojana, deren Fresken aus dem Jahr 1259 stammen und auf der Liste des UNESCO-Weltkulturerbes stehen. Wer sich für Geschichte und Kunst interessiert, sollte unbedingt solche Denkmäler besuchen.',
      ],
      examGoldenRule:
        'При относителните местоимения за принадлежност dessen (за м./ср.р. — „чийто“) и deren (за ж.р./мн.ч. — „чиято/чиито“) след тях НЕ се поставя определителен член, а глаголът отива в края на подчиненото изречение.',
      commonTraps: [
        'Изборът между dessen и deren зависи от рода на притежателя ПРЕД запетаята, а не от рода на притежавания предмет след нея: der Autor (м.р.), dessen Buch / dessen Bücher…; die Stadt (ж.р.), deren Theater / deren Geschichte…',
        'Националният празник на Германия (Tag der Deutschen Einheit) е на 3 октомври (am 3. Oktober).',
      ],
      formulasOrDates: [
        { label: 'Чийто / чиято (Relativsatz)', value: 'der Künstler, dessen Bilder … | die Stadt, deren Geschichte …' },
        { label: 'Национален празник на Германия', value: '3. Oktober — Tag der Deutschen Einheit' },
        { label: 'Щадящ туризъм', value: 'sanfter / nachhaltiger Tourismus <-> Massentourismus' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-world2-chk-1',
        requirement: 'Есе/представяне „Ein UNESCO-Weltkulturerbe in Bulgarien oder Deutschland“ (150–170 думи)',
        whyNeeded: 'Пряко покрива темата за културно-историческите забележителности и световното наследство.',
        isEssentialForSix: true,
        suggestedNotes: 'Използвай поне едно изречение с dessen/deren и две форми в Passiv (wurde erbaut, wird besucht).',
      },
      {
        id: 'de-b11-world2-chk-2',
        requirement: 'Схема за употреба на относителните местоимения dessen и deren с 4 примера',
        whyNeeded: 'Относителните изречения в Genitiv са отличителен белег за ниво B1.',
        isEssentialForSix: true,
        suggestedNotes: 'м.р./ср.р. -> dessen; ж.р./мн.ч. -> deren.',
      },
    ],
    flashcards: [
      { id: 'de-b11-world2-fc-1', front: 'Кога се празнува Денят на германското единство (Tag der Deutschen Einheit)?', back: 'На 3 октомври (am 3. Oktober).', tag: 'Странознание' },
      { id: 'de-b11-world2-fc-2', front: 'Какво означава „sanfter Tourismus“?', back: 'Устойчив, екологосъобразен туризъм, който щади природата и местната култура.', tag: 'Туризъм' },
      { id: 'de-b11-world2-fc-3', front: 'Кога в относително изречение се използва dessen и кога deren?', back: 'dessen — когато думата пред запетаята е м.р. или ср.р.; deren — когато е ж.р. или мн.ч.', tag: 'Граматика' },
      { id: 'de-b11-world2-fc-4', front: 'Как е „пакетна туристическа екскурзия“?', back: 'die Pauschalreise', tag: 'Туризъм' },
      { id: 'de-b11-world2-fc-5', front: 'Как се наричат на немски Боянската църква и Мадарският конник?', back: 'die Kirche von Bojana / der Reiter von Madara', tag: 'България' },
      { id: 'de-b11-world2-fc-6', front: 'Как е „опитвам типични за страната специалитети“?', back: 'landestypische Spezialitäten probieren', tag: 'Култура' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Wir besichtigten die Altstadt von Nessebar, ___ malerische Holzhäuser direkt am Meer liegen.',
        options: ['dessen', 'deren', 'denen', 'derer'],
        correctIndex: 1,
        explanation: 'Съществителното пред запетаята е die Altstadt (женски род), затова относителното местоимение в Genitiv е deren.',
      },
      {
        id: 2,
        question: 'Попълнете: Johann Wolfgang von Goethe ist ein deutscher Dichter, ___ Werke auf der ganzen Welt gelesen werden.',
        options: ['deren', 'dessen', 'dem', 'den'],
        correctIndex: 1,
        explanation: 'Der Dichter е от мъжки род, затова за принадлежност („чиито творби“) се използва dessen.',
      },
      {
        id: 3,
        question: 'Кой празник се отбелязва в Германия на 3 октомври?',
        options: [
          'Tag der Deutschen Einheit (Денят на германското единство)',
          'Nikolaustag (Никулден)',
          'Silvester (Нова година)',
          'Karfreitag (Разпети петък)',
        ],
        correctIndex: 0,
        explanation: 'На 3 октомври 1990 г. се осъществява обединението на Германия, чествано като Tag der Deutschen Einheit.',
      },
      {
        id: 4,
        question: 'Какво е основното предимство на „sanfter Tourismus“ пред „Massentourismus“?',
        options: [
          'Щади природата, ресурсите и автентичната култура на региона',
          'Използва само огромни круизни кораби и бетонни комплекси',
          'Забранява разглеждането на музеи и исторически паметници',
          'Не позволява общуване с местното население',
        ],
        correctIndex: 0,
        explanation: 'Sanfter Tourismus (устойчив/мек туризъм) се стреми да не уврежда природата и местните общности.',
      },
      {
        id: 5,
        question: 'Попълнете: Das Rila-Kloster und die Kirche von Bojana gehören ___ UNESCO-Weltkulturerbe.',
        options: ['zum', 'im', 'vom', 'beim'],
        correctIndex: 0,
        explanation: 'Глаголът gehören се свързва с предлога zu + Dativ (zu + dem = zum UNESCO-Weltkulturerbe).',
      },
      {
        id: 6,
        question: 'Какво означава думата „die Pauschalreise“?',
        options: [
          'туристически пакет (включващ транспорт, хотел и често храна на обща цена)',
          'пътуване на автостоп без резервация',
          'еднодневна училищна разходка в парка',
          'служебно пътуване за един час',
        ],
        correctIndex: 0,
        explanation: 'Die Pauschalreise е предварително организирана пакетна почивка от туроператор.',
      },
    ],
    quickQuestions: ['Кога използваме dessen и кога deren в относителни изречения?', 'Кои български обекти от ЮНЕСКО мога да представя на немски?', 'Каква е разликата между масов и устойчив туризъм?'],
  },
  {
    ...base,
    id: 'de-b11-skills',
    monTopicIds: ids('skills'),
    title: 'Немски B1.1: Слушане, четене, говорене и писане — комуникативни умения и стратегии',
    originalNoteExcerpt:
      'Очаквани резултати по четирите умения за ниво B1.1 (програма за IX–XII клас след A2): разбиране на основната информация, детайли и гледни точки в автентични текстове (до 3 минути при слушане); разбиране на адаптирани художествени и научнопопулярни текстове при четене; участие в дискусия, аргументиране и презентация при говорене; писане на лично и официално писмо, разказ и съчинение с аргументи (150–170 думи).',
    summary: {
      overview:
        'Обобщаваме комуникативните умения и изпитните стратегии за ниво B1.1 в гимназиалния етап: критично слушане и четене, водене на аргументирана дискусия и създаване на писмени текстове от 150–170 думи.',
      keyPoints: [
        'Слушане (Hörverstehen): Разпознаваш не само фактите, но и нагласата и емоцията на говорещия (съгласие, скептицизъм, разочарование, ентусиазъм) в интервюта, анкети и радиорубрики до 3 минути. Обръщай внимание на ограничителни думи като kaum (едва ли / почти не), fast nie, nur selten, keineswegs.',
        'Четене (Leseverstehen): Анализираш статии, коментари във форуми, брошури и литературни откъси. При задачи за съпоставяне (напр. кой човек коя обява или кое мнение избира) търси синонимни перифрази, а не еднакви думи.',
        'Говорене (Sprechen): Участваш в дискусия по проблемна тема (здраве, екология, кариера, медии), като излагаш теза, подкрепяш я с аргументи и примери и реагираш конструктивно на събеседника (Ich verstehe deinen Standpunkt, aber man darf nicht vergessen, dass…).',
        'Писане (Schreiben — 150–170 думи): Овладяваш три ключови формата: (1) Официално писмо/имейл (кандидатстване, запитване, рекламация); (2) Личен имейл с разказ за преживяване и съвет/мнение; (3) Кратко аргументативно съчинение / коментар за училищен блог или форум със структура Pro и Contra.',
        'Примерен модел за коментар във форум (160 думи): Immer mehr Jugendliche kaufen ihre Kleidung online. Das hat natürlich viele Vorteile: Man spart Zeit, hat eine riesige Auswahl und kann die Preise leicht vergleichen. Andererseits gibt es auch ernste Nachteile. Oft passt die bestellte Kleidung nicht, weshalb viele Pakete zurückgeschickt werden müssen. Je mehr Pakete transportiert werden, desto höher ist die Umweltbelastung durch Abgase und Verpackungsmüll. Meiner Meinung nach sollten wir bewusster einkaufen und häufiger lokale Geschäfte besuchen.',
      ],
      examGoldenRule:
        'В задачите за слушане и четене думата kaum означава „почти не / едва“ (отрицателен смисъл!): Er hat kaum Zeit за правене на спорт означава, че той ПОЧТИ НЯМА време за спорт.',
      commonTraps: [
        'Не бъркай kaum (почти не) с gern (с удоволствие) или oft (често).',
        'В аргументативен коментар не изброявай само отделни прости изречения — свързвай аргументите с причина, следствие и противопоставяне (da, weshalb, obwohl, je … desto).',
      ],
      formulasOrDates: [
        { label: 'Отрицателни нюанси', value: 'kaum (почти не), selten (рядко), keineswegs (в никакъв случай)' },
        { label: 'Конструктивно възражение', value: 'Ich verstehe deinen Standpunkt, aber man muss bedenken, dass …' },
        { label: 'Връзка със следствие', value: '…, weshalb / weswegen + глагол в края' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-skills-chk-1',
        requirement: 'Шаблон за аргументативен коментар (Pro-und-Contra-Text) в 4 абзаца (150–170 думи)',
        whyNeeded: 'Този жанр е водещ при писмените задачи в горния курс на ниво B1.',
        isEssentialForSix: true,
        suggestedNotes: '1. Въведение в темата; 2. Аргументи „за“ (Vorteile); 3. Аргументи „против“ (Nachteile); 4. Лично заключение.',
      },
      {
        id: 'de-b11-skills-chk-2',
        requirement: 'Списък на „подвеждащите“ думи за честота и степен при слушане и четене',
        whyNeeded: 'Тези думи най-често решават верния отговор в тестовете с избираем отговор и Richtig/Falsch.',
        isEssentialForSix: true,
        suggestedNotes: 'kaum, fast nie, höchstens (най-много), mindestens (поне), ausschließlich (само/изключително).',
      },
    ],
    flashcards: [
      { id: 'de-b11-skills-fc-1', front: 'Какво означава думата „kaum“ в изречението „Er treibt kaum Sport“?', back: 'Почти не / едва (Той почти не спортува — отрицателен смисъл!).', tag: 'Слушане и четене' },
      { id: 'de-b11-skills-fc-2', front: 'Какво означават думите „mindestens“ и „höchstens“?', back: 'mindestens = поне / минимум; höchstens = най-много / максимум.', tag: 'Слушане и четене' },
      { id: 'de-b11-skills-fc-3', front: 'Какво означава думата „ausschließlich“?', back: 'Само / единствено / изключително (= nur).', tag: 'Четене' },
      { id: 'de-b11-skills-fc-4', front: 'Какъв е словоредът след относителното наречие за следствие „weshalb“ („поради което“)?', back: 'Въвежда подчинено изречение със спрегнат глагол на последно място.', tag: 'Писане' },
      { id: 'de-b11-skills-fc-5', front: 'Как да реагирам учтиво в дискусия, когато отчасти се съгласявам, но имам възражение?', back: 'Da stimme ich dir teilweise zu, aber man sollte nicht vergessen, dass…', tag: 'Говорене' },
      { id: 'de-b11-skills-fc-6', front: 'Как се въвежда пример в подкрепа на аргумент?', back: 'Ein gutes Beispiel dafür ist … / Das zeigt sich zum Beispiel daran, dass …', tag: 'Аргументация' },
    ],
    quiz: [
      {
        id: 1,
        question: 'В текст за четене пише: „In diesem Jugendcamp sind Handys ausschließlich am Abend für eine Stunde erlaubt.“ Кое твърдение е вярно?',
        options: [
          'Телефоните са разрешени само вечер за по един час.',
          'Телефоните са разрешени през целия ден освен вечер.',
          'Телефоните са напълно забранени през цялата седмица.',
          'Всеки ученик получава нов телефон всяка вечер.',
        ],
        correctIndex: 0,
        explanation: 'Ausschließlich означава „само / единствено“.',
      },
      {
        id: 2,
        question: 'В аудиозапис чувате: „Seit seinem Umzug hat Markus kaum noch Kontakt zu seinen alten Mitschülern.“ Какво означава това?',
        options: [
          'Маркус почти няма контакт със старите си съученици.',
          'Маркус се вижда със старите си съученици всеки ден.',
          'Маркус се е върнал в старото си училище.',
          'Маркус организира голяма среща на класа.',
        ],
        correctIndex: 0,
        explanation: 'Kaum noch означава „почти вече не / съвсем малко“.',
      },
      {
        id: 3,
        question: 'Попълнете с подходящата връзка: Der Zug hatte über eine Stunde Verspätung, ___ wir den Anschluss verpasst haben.',
        options: ['trotzdem', 'deshalb', 'weshalb', 'denn'],
        correctIndex: 2,
        explanation: 'Глаголът haben стои на последно място в подчиненото изречение за следствие, което изисква съюза weshalb („поради което“).',
      },
      {
        id: 4,
        question: 'Какво означава изискването „Der Text soll mindestens 150 Wörter umfassen“?',
        options: [
          'Текстът трябва да съдържа най-малко (поне) 150 думи.',
          'Текстът трябва да съдържа най-много 150 думи.',
          'Текстът трябва да съдържа точно 50 думи.',
          'Текстът трябва да бъде написан без глаголи.',
        ],
        correctIndex: 0,
        explanation: 'Mindestens означава „поне / най-малко“ (обратното е höchstens — най-много).',
      },
      {
        id: 5,
        question: 'Коя фраза въвежда аргумент ПРОТИВ дадена теза?',
        options: [
          'Gegen diesen Vorschlag spricht die Tatsache, dass…',
          'Ein großer Vorteil dabei ist, dass…',
          'Ich bin völlig dafür, weil…',
          'Herzlichen Glückwunsch zum Geburtstag!',
        ],
        correctIndex: 0,
        explanation: '„Gegen diesen Vorschlag spricht die Tatsache, dass…“ означава „Против това предложение говори фактът, че…“.',
      },
      {
        id: 6,
        question: 'Попълнете: Das zeigt sich unter anderem ___, dass immer mehr junge Leute ehrenamtlich arbeiten.',
        options: ['daran', 'darauf', 'dafür', 'damit'],
        correctIndex: 0,
        explanation: 'Sich zeigen an (+ Dat.) образува местоименно наречие daran пред подчиненото изречение с dass.',
      },
    ],
    quickQuestions: ['Как да не се подведа по думите kaum, ausschließlich, mindestens и höchstens?', 'Как се използва съюзът weshalb?', 'Как да структурирам коментар Pro и Contra на немски?'],
  },
  {
    ...base,
    id: 'de-b11-grammar',
    monTopicIds: ids('grammar'),
    title: 'Немски B1.1: Езикови знания — причастия, пасив, условно наклонение и сложни съюзни връзки',
    originalNoteExcerpt:
      'Граматика за ниво B1.1 (IX–XII клас): Partizip I и Partizip II като определения; слабо склонение на съществителните (n-Deklination) и Genitiv; всички времена в Aktiv, Vorgangspassiv и Zustandspassiv; Konjunktiv II за настоящето; глаголи и прилагателни с предложно управление и местоименни наречия; подчинени изречения (inkl. dessen/deren, je … desto, indem, ohne/statt/um … zu).',
    summary: {
      overview:
        'Обобщаваме ключовите граматични структури за ниво B1.1 в гимназиалния курс, с фокус върху трансформациите между актив и пасив, причастните определения, инструменталните изречения с indem и управлението на глаголи и прилагателни.',
      keyPoints: [
        'Причастия като определения (Partizip I и II): Partizip I (Infinitiv + -d + окончание за прилагателно) за едновременно активно действие: die steigenden Temperaturen (повишаващите се температури); Partizip II (+ окончание за прилагателно) за завършено пасивно действие: die recycelten Flaschen (рециклираните бутилки).',
        'Инструментални подчинени изречения с indem („като / чрез това че“): Отговарят на въпроса Wie? / Wodurch? (Как? Чрез какво?) и имат спрегнат глагол в края: Man kann viel Energie sparen, indem man moderne LED-Lampen benutzt (или в началото: Indem man regelmäßig Sport treibt, stärkt man sein Immunsystem).',
        'Прилагателни с предложно управление: stolz auf (+ Akk.), zufrieden mit (+ Dat.) — доволен от, begeistert von (+ Dat.) — въодушевен от, überzeugt von (+ Dat.) — убеден в, verantwortlich für (+ Akk.) — отговорен за, abhängig von (+ Dat.) — зависим от, beliebt bei (+ Dat.) — популярен сред, interessiert an (+ Dat.) — заинтересован от.',
        'Трансформация Aktiv -> Passiv: Прякото допълнение в Akkusativ от активното изречение става подлог в Nominativ в пасивното изречение, а подлогът става непряко допълнение с von (+ Dativ за лица/институции) или с durch (+ Akkusativ за средства/причини): Die Schüler organisieren das Konzert -> Das Konzert wird von den Schülern organisiert.',
        'Обобщение на двойните и сложните съюзи: nicht nur …, sondern auch …; sowohl … als auch …; entweder … oder …; weder … noch …; zwar …, aber … (вярно че …, но …); je + Komparativ …, desto/umso + Komparativ …',
      ],
      examGoldenRule:
        'Обърни внимание на разликата между глагола и прилагателното за интерес: глаголът е sich interessieren für (+ Akkusativ), но прилагателното е interessiert sein an (+ Dativ: Ich bin an diesem Kurs interessiert)!',
      commonTraps: [
        'Двойният съюз zwar …, aber … („макар и / вярно е, че …, но …“) е отличен за балансирана аргументация: Das Smartphone ist zwar sehr praktisch, aber es kann auch ablenken.',
        'В страдателен залог извършител човек се въвежда с von (+ Dativ), а неодушевено средство или природна стихия — с durch (+ Akkusativ): Der Baum wurde durch den Blitz zerstört.',
      ],
      formulasOrDates: [
        { label: 'Начин с indem', value: 'Man schützt die Natur, indem man den Müll trennt.' },
        { label: 'Отстъпка със zwar … aber', value: 'Er hat zwar wenig Zeit, aber er hilft uns immer.' },
        { label: 'Прилагателни с предлог', value: 'zufrieden mit (Dat.) | verantwortlich für (Akk.) | interessiert an (Dat.)' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b11-gram-chk-1',
        requirement: 'Таблица на 12 ключови прилагателни с техните предлози и падежи',
        whyNeeded: 'Прилагателните с предлози са сред най-често проверяваните структури в тестовете за B1.',
        isEssentialForSix: true,
        suggestedNotes: 'zufrieden mit, stolz auf, verantwortlich für, interessiert an, begeistert von, beliebt bei, dankbar für.',
      },
      {
        id: 'de-b11-gram-chk-2',
        requirement: 'Пет примера за изразяване на начин с подчинено изречение с indem',
        whyNeeded: 'Конструкцията с indem е незаменима при писане на съвети и екологични/здравни текстове.',
        isEssentialForSix: true,
        suggestedNotes: 'Man verbessert sein Deutsch, indem man jeden Tag liest und Filme auf Deutsch sieht.',
      },
    ],
    flashcards: [
      { id: 'de-b11-gram-fc-1', front: 'Какво означава съюзът „indem“ и на кой въпрос отговаря?', back: '„Като / чрез това че“ — отговаря на въпроса Wie? / Wodurch? (глаголът е в края).', tag: 'Синтаксис' },
      { id: 'de-b11-gram-fc-2', front: 'Каква е разликата в предлога при „sich interessieren“ и „interessiert sein“?', back: 'sich interessieren für (+ Akk.), но interessiert sein an (+ Dativ)!', tag: 'Капани' },
      { id: 'de-b11-gram-fc-3', front: 'С кои предлози и падежи се свързват zufrieden, verantwortlich и beliebt?', back: 'zufrieden mit (+ Dat.), verantwortlich für (+ Akk.), beliebt bei (+ Dat.).', tag: 'Прилагателни' },
      { id: 'de-b11-gram-fc-4', front: 'Какво означава двойният съюз „zwar …, aber …“?', back: '„Макар и / Вярно е, че …, но …“ (отстъпка + противопоставяне).', tag: 'Съюзи' },
      { id: 'de-b11-gram-fc-5', front: 'Кога в Passiv използваме von (+ Dat.) и кога durch (+ Akk.)?', back: 'von — за одушевен извършител/институция; durch — за средство, инструмент или природна сила.', tag: 'Passiv' },
      { id: 'de-b11-gram-fc-6', front: 'Как се превежда „повишаващите се цени“ с Partizip I?', back: 'die steigenden Preise', tag: 'Причастия' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Man kann seinen Wortschatz schnell erweitern, ___ man regelmäßig deutsche Bücher und Artikel liest.',
        options: ['indem', 'damit', 'obwohl', 'trotzdem'],
        correctIndex: 0,
        explanation: 'На въпроса „Как / По какъв начин?“ отговаря инструменталното подчинено изречение със съюза indem.',
      },
      {
        id: 2,
        question: 'Попълнете: Viele junge Menschen sind ___ einem Austauschprogramm im Ausland sehr interessiert.',
        options: ['für', 'über', 'an', 'auf'],
        correctIndex: 2,
        explanation: 'Прилагателното interessiert sein се свързва с предлога an + Dativ: an einem Austauschprogramm interessiert.',
      },
      {
        id: 3,
        question: 'Попълнете: Die Reise nach Wien ist ___ ziemlich teuer, ___ sie lohnt sich auf jeden Fall!',
        options: ['weder / noch', 'zwar / aber', 'entweder / oder', 'nicht nur / sondern'],
        correctIndex: 1,
        explanation: 'Двойният съюз zwar …, aber … признава един факт (скъпо е), но му противопоставя по-важен извод (заслужава си).',
      },
      {
        id: 4,
        question: 'Попълнете: Wer ist in eurer Gruppe ___ die Vorbereitung der Präsentation verantwortlich?',
        options: ['mit', 'von', 'für', 'an'],
        correctIndex: 2,
        explanation: 'Прилагателното verantwortlich изисква предлога für + Akkusativ.',
      },
      {
        id: 5,
        question: 'Попълнете в Passiv: Die alte Brücke wurde ___ das starke Hochwasser schwer beschädigt.',
        options: ['durch', 'von', 'mit', 'bei'],
        correctIndex: 0,
        explanation: 'Природна стихия или причина в страдателен залог се въвежда с предлога durch + Akkusativ.',
      },
      {
        id: 6,
        question: 'Попълнете с Partizip I: Wegen der ___ Energiepreise versuchen alle Haushalte, Strom zu sparen.',
        options: ['steigenden', 'gestiegen', 'steigen', 'steigende'],
        correctIndex: 0,
        explanation: 'След предлога wegen (Genitiv мн.ч. с определителен член der) Partizip I от steigen получава окончание -en: der steigenden Energiepreise.',
      },
    ],
    quickQuestions: ['Как се използва съюзът indem?', 'Защо казваме sich interessieren für, но interessiert sein an?', 'Как работи двойният съюз zwar …, aber …?'],
  },
];
