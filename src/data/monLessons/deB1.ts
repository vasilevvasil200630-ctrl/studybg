import type { LessonData } from '../../types';

// Немски език, ниво B1 (IX–X клас, продължение на интензивния VIII клас) — по един урок за всяка тема от
// учебната програма на МОН (https://www.mon.bg/nfs/2023/11/up_ix_ne_b1.pdf). Обяснения на български, примери на
// немски; примерните текстове са написани за урока.

const base = { subject: 'Чужди езици (Немски, Френски, Испански)', grade: '8.–12. клас', sourceType: 'syllabus' } as const;
const ids = (num: string) => [`lang-ne-b1:${num}`];

export const MON_LESSONS_DE_B1: LessonData[] = [
  {
    ...base,
    id: 'de-b1-me-and-others',
    monTopicIds: ids('1'),
    title: 'Немски B1: Аз и другите — моят свят, ценности, реално и виртуално общуване',
    originalNoteExcerpt:
      'Тематична област „Аз и другите“: аз и моят свят (семейство, училищна среда); междуличностни отношения (чувства, емоции); социална среда и ценностна система (начини на общуване — реално и виртуално общуване, речеви етикет). Писане: свързан аргументативен текст (170–200 думи). Граматика: глаголи и прилагателни с предложно управление, Konjunktiv II на миналото (hätte/wäre + Partizip II), косвена реч (базово).',
    summary: {
      overview:
        'На пълно ниво B1 темата „Аз и другите“ разглежда ценностната система на младия човек, отношенията между поколенията, натиска от групата и баланса между реалното общуване лице в лице и виртуалния свят на социалните мрежи.',
      keyPoints: [
        'Междуличностни отношения и ценности (Werte und Beziehungen): der Generationenkonflikt — конфликт между поколенията, der Gruppenzwang — натиск от връстниците, das Vorbild — пример за подражание, zu jemandem halten / jemandem beistehen — подкрепям някого, jemanden im Stich lassen — изоставям някого в труден момент, gegenseitiger Respekt, Toleranz, Ehrlichkeit, Mitgefühl (Empathie).',
        'Реално срещу виртуално общуване: das persönliche Gespräch (von Angesicht zu Angesicht) <-> die virtuelle Kommunikation in sozialen Netzwerken; Beiträge teilen/kommentieren, sich vernetzen, die Bildschirmzeit — екранно време, das Cybermobbing — кибертормоз, der Datenschutz / die Privatsphäre schützen — защита на личните данни и неприкосновеността.',
        'Речеви и дигитален етикет (Umgangsformen und Netikette): Würden Sie mir bitte behilflich sein? / Dürfte ich Sie etwas fragen? В онлайн пространството: höflich und respektvoll kommentieren, keine persönlichen Daten veröffentlichen, Nachrichten kritisch prüfen.',
        'Нереални условия за миналото (Konjunktiv II der Vergangenheit): Образува се с hätte / wäre + Partizip II за изразяване на съжаление или критика за отминало събитие: Wenn er mich nicht im Stich gelassen hätte, wären wir beste Freunde geblieben. Hättest du mir doch früher Bescheid gesagt!',
        'Примерен текст: Soziale Medien erleichtern es uns zwar, jederzeit mit Freunden in Kontakt zu bleiben, aber sie können ein persönliches Gespräch niemals ersetzen. In der virtuellen Welt präsentieren sich viele Menschen nur von ihrer besten Seite. Wenn man jedoch ein ernstes Problem hat, braucht man echte Freunde, die einem im Alltag beistehen. Meiner Meinung nach sollten wir unsere Bildschirmzeit bewusst begrenzen, um mehr Zeit für reale Begegnungen zu haben.',
      ],
      examGoldenRule:
        'За минало нереално условие (какво би станало преди, ако…) използвай само Konjunktiv II der Vergangenheit: hätte + Partizip II (за глаголи с haben) или wäre + Partizip II (за глаголи със sein), но НИКОГА würde + Partizip II!',
      commonTraps: [
        'Идиомът jemanden im Stich lassen („оставям някого на произвола / предавам го в труден момент“) изисква пряко допълнение в Akkusativ: Ein wahrer Freund lässt dich nie im Stich.',
        'Съществителното das Vorbild (пример за подражание) е от среден род (мн.ч. die Vorbilder).',
      ],
      formulasOrDates: [
        { label: 'Ценности и приятелство', value: 'zu jdm. halten | jdn. nicht im Stich lassen | gegenseitiger Respekt' },
        { label: 'Konjunktiv II за минало', value: 'Wenn du mich angerufen hättest, wäre ich sofort gekommen.' },
        { label: 'Обем на текста (B1)', value: '170–200 думи' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b1-me-chk-1',
        requirement: 'Аргументативно есе „Reale Freundschaft oder virtuelle Kontakte?“ (170–200 думи)',
        whyNeeded: 'Създаването на логически свързан текст с аргументи и мотиви от 170–200 думи е очакван резултат.',
        isEssentialForSix: true,
        suggestedNotes: 'Въведение, предимства и рискове на социалните мрежи (Cybermobbing, Datenschutz), личен пример, заключение.',
      },
      {
        id: 'de-b1-me-chk-2',
        requirement: 'Пет изречения в Konjunktiv II der Vergangenheit (hätte/wäre + Partizip II)',
        whyNeeded: 'Ключова граматична структура за ниво B1 при коментар на минали постъпки.',
        isEssentialForSix: true,
        suggestedNotes: 'Wenn ich das gewusst hätte, hätte ich anders reagiert.',
      },
    ],
    flashcards: [
      { id: 'de-b1-me-fc-1', front: 'Как е „натиск от връстниците“ и „пример за подражание“?', back: 'der Gruppenzwang / das Vorbild', tag: 'Общество' },
      { id: 'de-b1-me-fc-2', front: 'Какво означава идиомът „jemanden im Stich lassen“?', back: 'Изоставям някого в беда / разочаровам го, когато разчита на мен.', tag: 'Идиоми' },
      { id: 'de-b1-me-fc-3', front: 'Как е „кибертормоз“ и „защита на личните данни“?', back: 'das Cybermobbing / der Datenschutz (die Privatsphäre)', tag: 'Онлайн' },
      { id: 'de-b1-me-fc-4', front: 'Как се образува Konjunktiv II за миналото?', back: 'hätte / wäre + Partizip II (напр. ich hätte gesagt, ich wäre gekommen).', tag: 'Граматика' },
      { id: 'de-b1-me-fc-5', front: 'Как е „екранно време“ и „общуване лице в лице“?', back: 'die Bildschirmzeit / das Gespräch von Angesicht zu Angesicht', tag: 'Общуване' },
      { id: 'de-b1-me-fc-6', front: 'Как е „подкрепям някого“ с глагола halten или beistehen?', back: 'zu jemandem halten / jemandem beistehen (+ Dativ)', tag: 'Приятелство' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете в Konjunktiv II за миналото: Wenn du mir die Wahrheit gesagt ___, ___ ich dir sofort geholfen!',
        options: ['hast / habe', 'hättest / hätte', 'würdest / würde', 'wärst / wäre'],
        correctIndex: 1,
        explanation: 'И двата глагола (sagen и helfen) образуват Perfekt с haben, затова в Konjunktiv II der Vergangenheit формите са hättest gesagt и hätte geholfen.',
      },
      {
        id: 2,
        question: 'Попълнете: Wenn wir früher losgefahren ___, hätten wir den Zug nicht verpasst.',
        options: ['hätten', 'würden', 'wären', 'sind'],
        correctIndex: 2,
        explanation: 'Losfahren е глагол за движение и се спряга със sein -> в Konjunktiv II за миналото: wären losgefahren.',
      },
      {
        id: 3,
        question: 'Какво означава изразът „Ein guter Freund lässt dich niemals im Stich“?',
        options: [
          'Добрият приятел никога не те изоставя в труден момент.',
          'Добрият приятел никога не ти пише съобщения.',
          'Добрият приятел винаги закъснява за среща.',
          'Добрият приятел споделя паролите ти в интернет.',
        ],
        correctIndex: 0,
        explanation: 'Jemanden nicht im Stich lassen означава да не предадеш/изоставиш някого, когато има нужда от помощ.',
      },
      {
        id: 4,
        question: 'Коя дума означава „натиск от групата на връстниците“?',
        options: ['der Gruppenzwang', 'der Stundenplan', 'der Datenschutz', 'der Lebenslauf'],
        correctIndex: 0,
        explanation: 'Die Gruppe + der Zwang (принуда/натиск) = der Gruppenzwang.',
      },
      {
        id: 5,
        question: 'Попълнете: In sozialen Netzwerken sollte man besonders auf den Schutz seiner ___ achten.',
        options: ['Privatsphäre', 'Kreuzung', 'Reinigung', 'Umkleidekabine'],
        correctIndex: 0,
        explanation: 'Die Privatsphäre означава личното пространство и личната неприкосновеност.',
      },
      {
        id: 6,
        question: 'Попълнете: Meine ältere Schwester ist für mich ein großes ___, weil sie sehr zielstrebig und hilfsbereit ist.',
        options: ['Vorbild', 'Vorurteil', 'Verbot', 'Verkehrsmittel'],
        correctIndex: 0,
        explanation: 'Das Vorbild е положителен пример за подражание.',
      },
    ],
    quickQuestions: ['Как се образува Konjunktiv II за минало време (hätte/wäre + Partizip II)?', 'Кои са ключовите думи за есе за реалното и виртуалното общуване?', 'Какво означават Gruppenzwang и jemanden im Stich lassen?'],
  },
  {
    ...base,
    id: 'de-b1-world-around-me',
    monTopicIds: ids('2'),
    title: 'Немски B1: Светът около мен — град и провинция, обществени институции и кризисни ситуации',
    originalNoteExcerpt:
      'Тематична област „Светът около мен“: родното място и големият свят (животът в големия град и в провинцията — предимства и недостатъци, обществени институции); обществени прояви; кризисни ситуации и природни бедствия. Граматика: предлози за време и място с Genitiv (innerhalb, außerhalb, während, wegen), Passiv във всички основни времена, локални и темпорални подчинени изречения.',
    summary: {
      overview:
        'Съпоставяме живота в мегаполиса и в провинцията, запознаваме се с функциите на обществените институции и гражданските прояви и научаваме как се описват и овладяват кризисни ситуации и природни бедствия.',
      keyPoints: [
        'Големият град срещу провинцията (Großstadt vs. Provinz/Land): die Lebensqualität — качество на живот, das vielfältige Kultur- und Bildungsangebot, gute Arbeitsmöglichkeiten, Anonymität, Hektik, hohe Lebenshaltungskosten <-> Ruhe, frische Luft, enge Nachbarschaft, lange Arbeitswege (pendeln — пътувам ежедневно до работа в друг град).',
        'Обществени институции и прояви: die Behörde / das Amt (das Bürgeramt, das Einwohnermeldeamt — служба за адресна регистрация, das Jugendamt, die Botschaft — посолство), einen Antrag stellen — подавам заявление; обществени прояви — das Wohltätigkeitskonzert (благотворителен концерт), die Bürgerinitiative, das Straßenfest.',
        'Кризисни ситуации и природни бедствия (Krisensituationen und Naturkatastrophen): das Erdbeben — земетресение, die Überschwemmung / das Hochwasser — наводнение, der Waldbrand — горски пожар, der Lawinenabgang — лавина, der Stromausfall — прекъсване на тока; die Feuerwehr, der Rettungsdienst, der Katastrophenschutz, Erste Hilfe leisten — оказвам първа помощ, evakuieren — евакуирам.',
        'Предлози с Genitiv за пространство и време: innerhalb — в рамките на (innerhalb der Stadt / innerhalb einer Woche), außerhalb — извън (außerhalb des Stadtzentrums / außerhalb der Sprechstunden), infolge — в резултат на (infolge des starken Erdbebens).',
        'Примерен текст: Infolge der starken Regenfälle im letzten Monat kam es in mehreren Regionen zu schweren Überschwemmungen. Viele Häuser außerhalb der großen Städte standen unter Wasser, und Hunderte Bewohner mussten von der Feuerwehr evakuiert werden. Innerhalb weniger Stunden organisierten Jugendliche aus unserer Schule eine Spendenaktion, um den betroffenen Familien mit Kleidung und Lebensmitteln zu helfen.',
      ],
      examGoldenRule:
        'Предлозите innerhalb (вътре в / в рамките на), außerhalb (извън) и infolge (вследствие на) изискват Genitiv: außerhalb der Großstadt, innerhalb eines Monats, infolge des Unwetters.',
      commonTraps: [
        'Глаголът helfen и изразът Erste Hilfe leisten: leisten се съчетава с Erste Hilfe (Ich leiste Erste Hilfe), а при засегнатите лица се използва причастието die Betroffenen (пострадалите/засегнатите).',
        'Съществителното die Behörde (държавна/общинска служба, институция) е от женски род (мн.ч. die Behörden).',
      ],
      formulasOrDates: [
        { label: 'Предлози с Genitiv', value: 'innerhalb / außerhalb der Stadt | infolge des Hochwassers' },
        { label: 'Институции', value: 'einen Antrag beim Bürgeramt stellen | den Ausweis verlängern' },
        { label: 'Кризисни ситуации', value: 'den Notruf 112 wählen | Erste Hilfe leisten | Bewohner evakuieren' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b1-world-chk-1',
        requirement: 'Новинарски репортаж или разказ за реакция при природно бедствие или благотворителна акция (170–200 думи)',
        whyNeeded: 'Комбинира подтемите „Кризисни ситуации“ и „Обществени прояви“ с формите на Passiv Präteritum.',
        isEssentialForSix: true,
        suggestedNotes: 'Какво се случи (infolge + Gen.), как реагираха спасителните екипи (wurden evakuiert) и гражданите (Spendenaktion).',
      },
      {
        id: 'de-b1-world-chk-2',
        requirement: 'Таблица „Предимства и недостатъци на живота в мегаполиса и на село“',
        whyNeeded: 'Подготовка за устна дискусия и аргументативно есе по темата.',
        isEssentialForSix: false,
        suggestedNotes: 'Infrastruktur, Kulturangebot, Arbeitsplätze <-> Natur, Ruhe, Gemeinschaft, Lebenshaltungskosten.',
      },
    ],
    flashcards: [
      { id: 'de-b1-world-fc-1', front: 'Как е „земетресение“, „наводнение“ и „прекъсване на тока“?', back: 'das Erdbeben / die Überschwemmung (das Hochwasser) / der Stromausfall', tag: 'Бедствия' },
      { id: 'de-b1-world-fc-2', front: 'Как е „оказвам първа помощ“ и „спасителна служба“?', back: 'Erste Hilfe leisten / der Rettungsdienst', tag: 'Кризи' },
      { id: 'de-b1-world-fc-3', front: 'Какво означават предлозите innerhalb и außerhalb и кой падеж изискват?', back: 'innerhalb = в рамките на; außerhalb = извън — и двата изискват Genitiv.', tag: 'Предлози' },
      { id: 'de-b1-world-fc-4', front: 'Как е „подавам заявление в общинска служба“?', back: 'einen Antrag bei einer Behörde (beim Bürgeramt) stellen', tag: 'Институции' },
      { id: 'de-b1-world-fc-5', front: 'Какво означава глаголът „pendeln“ (der Pendler)?', back: 'Пътувам всеки ден между населеното място, в което живея, и града, в който работя/уча.', tag: 'Град и село' },
      { id: 'de-b1-world-fc-6', front: 'Как е „разходи за издръжка на живота“?', back: 'die Lebenshaltungskosten', tag: 'Град и село' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Viele Familien wohnen lieber ___ des lauten Stadtzentrums im Grünen.',
        options: ['außerhalb', 'während', 'trotzdem', 'bevor'],
        correctIndex: 0,
        explanation: 'За място „извън шумния център“ с Genitiv (des Stadtzentrums) се използва предлогът außerhalb.',
      },
      {
        id: 2,
        question: 'Попълнете: Nach dem schweren Sturm mussten über hundert Menschen aus dem Dorf ___ werden.',
        options: ['evakuiert', 'gependelt', 'beantragt', 'gemietet'],
        correctIndex: 0,
        explanation: 'При природно бедствие застрашените жители биват евакуирани — evakuiert werden.',
      },
      {
        id: 3,
        question: 'Какво трябва да направи всеки гражданин в Германия в служба „Einwohnermeldeamt“ след преместване в ново жилище?',
        options: [
          'Да регистрира новия си адрес на местоживеене (sich anmelden)',
          'Да си купи билет за градския транспорт',
          'Да предаде старите си дрехи за химическо чистене',
          'Да се запише на футболен турнир',
        ],
        correctIndex: 0,
        explanation: 'Das Einwohnermeldeamt е общинската служба за адресна регистрация на жителите.',
      },
      {
        id: 4,
        question: 'Попълнете: Jeder Autofahrer muss wissen, wie man bei einem Verkehrsunfall ___ leistet.',
        options: ['Erste Hilfe', 'Hohe Miete', 'Freie Zeit', 'Schöne Reise'],
        correctIndex: 0,
        explanation: 'Устойчивото съчетание е Erste Hilfe leisten (оказвам първа помощ).',
      },
      {
        id: 5,
        question: 'Попълнете: Der neue Reisepass wird ___ von zwei Wochen ausgestellt.',
        options: ['innerhalb', 'außerhalb', 'infolge', 'trotz'],
        correctIndex: 0,
        explanation: 'За срок „в рамките на две седмици“ се използва предлогът innerhalb (при мн.ч. без член често с von + Dativ).',
      },
      {
        id: 6,
        question: 'Как се нарича благотворителна кампания за събиране на дарения за пострадали хора?',
        options: ['die Spendenaktion', 'die Hausordnung', 'die Sprechstunde', 'die Fahrprüfung'],
        correctIndex: 0,
        explanation: 'Die Spende (дарение) + die Aktion (кампания) = die Spendenaktion.',
      },
    ],
    quickQuestions: ['Как се използват предлозите innerhalb, außerhalb и infolge?', 'Кои са основните думи за природни бедствия и спасителни акции?', 'Какви са функциите на Bürgeramt и Einwohnermeldeamt в Германия?'],
  },
  {
    ...base,
    id: 'de-b1-everyday-life',
    monTopicIds: ids('3'),
    title: 'Немски B1: Всекидневие — разумно потребление, съвременни услуги и професионална реализация',
    originalNoteExcerpt:
      'Тематична област „Всекидневие“: материална среда и разумно потребление; услуги от съвременния бит (комуникационни, банкови, битови услуги, транспорт); професии и социална среда (професионална реализация, контакти); планиране на свободното време. Граматика: инфинитивни конструкции с brauchen … nur/nicht zu и scheinen … zu, страдателен залог в Perfekt (ist … worden).',
    summary: {
      overview:
        'Обсъждаме финансовата грамотност и разумното потребление, банковите, комуникационните и битовите услуги, както и изискванията на съвременния пазар на труда.',
      keyPoints: [
        'Материална среда и разумно потребление: bewusst konsumieren — потребявам осъзнато, die Werbung hinterfragen — подлагам рекламата на критична преценка, der Impulskauf — импулсивна покупка, mit dem Geld vernünftig umgehen, Schulden vermeiden — избягвам дългове, Secondhand-Kleidung kaufen.',
        'Услуги от съвременния бит (Moderne Dienstleistungen): банкови услуги — ein Girokonto eröffnen (разплащателна сметка), Geld überweisen (превеждам пари), Geld am Automaten abheben (тегля пари), kontaktlos mit Karte oder Smartphone bezahlen, Online-Banking; комуникационни и битови услуги — einen Mobilfunkvertrag abschließen, der Paketdienst, der Handwerker / der Reparaturdienst.',
        'Професионална реализация (Berufliche Verwirklichung): die Qualifikation, Schlüsselkompetenzen (Soft Skills: Teamfähigkeit, Flexibilität, Problemlösungsfähigkeit), Aufstiegschancen — възможности за израстване в кариерата, selbstständig / freiberuflich arbeiten, die Bewerbungsmappe (Lebenslauf, Motivationsschreiben, Zeugnisse).',
        'Граматика в темата — brauchen … nicht/nur zu и Passiv Perfekt: Когато brauchen се използва с отрицание (nicht/kein) или с nur, то замества müssen и се свързва със zu + Infinitiv: Du brauchst das Geld nicht bar mitzunehmen — du kannst mit Karte zahlen. В Passiv Perfekt за минало действие с резултат днес се използва ist + Partizip II + worden (без ge-!): Das Geld ist bereits auf Ihr Konto überwiesen worden.',
        'Примерен текст: Heute erledigen die meisten Menschen ihre Bankgeschäfte bequem von zu Hause aus. Man braucht nicht mehr zur Bankfiliale zu gehen, um eine Rechnung zu bezahlen — das Geld wird in wenigen Sekunden per Online-Banking überwiesen. Trotzdem sollte man beim Online-Shopping vorsichtig sein und nicht auf jedes Werbeangebot hereinfallen, damit man am Monatsende den Überblick über seine Ausgaben behält.',
      ],
      examGoldenRule:
        'Глаголът brauchen със значение „не е нужно да… / нужно е само да…“ ЗАДЪЛЖИТЕЛНО изисква частицата zu пред инфинитива: Du brauchst heute nicht zu kochen (за разлика от модалния глагол müssen, който е без zu!).',
      commonTraps: [
        'В Passiv Perfekt причастието на спомагателния глагол werden е worden (БЕЗ представка ge-!): Das Paket ist gestern geliefert worden (не geworden!). Формата geworden се ползва само когато werden е пълнозначен глагол („ставам“: Er ist Arzt geworden).',
        'Различавай глаголите überweisen (превеждам пари по банков път) и abheben (тегля пари в брой от банкомат/сметка).',
      ],
      formulasOrDates: [
        { label: 'Не е нужно да…', value: 'nicht / kein … brauchen + zu + Infinitiv' },
        { label: 'Passiv Perfekt', value: 'ist / sind + … + Partizip II + worden' },
        { label: 'Банкови операции', value: 'ein Konto eröffnen | Geld überweisen | Geld am Automaten abheben' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b1-day-chk-1',
        requirement: 'Мотивационно писмо (Bewerbungsschreiben) за стаж или работа в германска компания (170–200 думи)',
        whyNeeded: 'Официалното писмо по темата за професионална реализация е ключов елемент от програмата за ниво B1.',
        isEssentialForSix: true,
        suggestedNotes: 'Повод за кандидатстване, образование, силни качества и умения, мотивация, молба за интервю (Vorstellungsgespräch).',
      },
      {
        id: 'de-b1-day-chk-2',
        requirement: 'Речник по темата „Банкови услуги и разумно потребление“',
        whyNeeded: 'За задачите за четене и слушане по подтемата „Услуги от съвременния бит“.',
        isEssentialForSix: false,
        suggestedNotes: 'das Girokonto, überweisen, abheben, die Gebühr (такса), die Ausgaben (разходи), sparen.',
      },
    ],
    flashcards: [
      { id: 'de-b1-day-fc-1', front: 'Как е „откривам банкова сметка“, „превеждам пари“ и „тегля пари“?', back: 'ein Konto eröffnen / Geld überweisen / Geld abheben', tag: 'Банкови услуги' },
      { id: 'de-b1-day-fc-2', front: 'Как се превежда „Не е нужно да идваш лично“ с глагола brauchen?', back: 'Du brauchst nicht persönlich zu kommen (brauchen + nicht + zu + Infinitiv).', tag: 'Граматика' },
      { id: 'de-b1-day-fc-3', front: 'Кога в Perfekt се пише worden и кога geworden?', back: 'worden — в страдателен залог (ist gebaut worden); geworden — при пълнозначния глагол „ставам“ (ist kalt geworden).', tag: 'Passiv Perfekt' },
      { id: 'de-b1-day-fc-4', front: 'Как е „възможности за кариерно израстване“ и „на свободна практика“?', back: 'die Aufstiegschancen / freiberuflich (selbstständig)', tag: 'Професии' },
      { id: 'de-b1-day-fc-5', front: 'Как е „сключвам договор“ (напр. за телефон или работа)?', back: 'einen Vertrag abschließen', tag: 'Услуги' },
      { id: 'de-b1-day-fc-6', front: 'Какво означава конструкцията „Er scheint sehr zufrieden zu sein“?', back: 'Той изглежда е много доволен (scheinen + zu + Infinitiv).', tag: 'Граматика' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Du ___ das Formular nicht auszudrucken; du kannst es direkt online ausfüllen.',
        options: ['musst', 'brauchst', 'kannst', 'sollst'],
        correctIndex: 1,
        explanation: 'Пред инфинитива стои частицата zu (auszudrucken), затова единственият правилен глагол с nicht е brauchst (nicht brauchen + zu + Infinitiv).',
      },
      {
        id: 2,
        question: 'Попълнете в Passiv Perfekt: Ihre Bestellung ist heute Morgen von unserem Paketdienst ___ ___.',
        options: ['versendet / geworden', 'versendet / worden', 'versenden / werden', 'versandte / war'],
        correctIndex: 1,
        explanation: 'Страдателният залог в Perfekt се образува със sein + Partizip II + worden (без ge-).',
      },
      {
        id: 3,
        question: 'Искате да изтеглите пари в брой от банкомат. Кой глагол описва това действие?',
        options: ['Geld am Geldautomaten abheben', 'ein Paket zur Post bringen', 'einen Arbeitsvertrag kündigen', 'Kleidung in der Reinigung waschen'],
        correctIndex: 0,
        explanation: 'Geld abheben означава тегля пари в брой от сметка или банкомат.',
      },
      {
        id: 4,
        question: 'Попълнете: Mein Bruder hat gestern einen neuen Arbeitsvertrag bei einer IT-Firma ___.',
        options: ['abgeschlossen', 'abgehoben', 'aufgeräumt', 'eingeladen'],
        correctIndex: 0,
        explanation: 'Устойчивото словосъчетание за подписване/сключване на договор е einen Vertrag abschließen.',
      },
      {
        id: 5,
        question: 'Попълнете: Der neue Kollege scheint sehr viel Erfahrung in diesem Bereich ___.',
        options: ['haben', 'zu haben', 'gehabt', 'hat'],
        correctIndex: 1,
        explanation: 'Глаголът scheinen („изглежда“) винаги се свързва със zu + Infinitiv: scheint … zu haben.',
      },
      {
        id: 6,
        question: 'Какво означава изразът „über seine Verhältnisse leben“ по отношение на парите?',
        options: [
          'харча повече пари, отколкото изкарвам (живея над възможностите си)',
          'спестявам част от месечния си доход',
          'пазарувам само по списък с отстъпки',
          'живея в малък апартамент под наем',
        ],
        correctIndex: 0,
        explanation: 'Über seine Verhältnisse leben означава да живееш над финансовите си възможности.',
      },
    ],
    quickQuestions: ['Кога след brauchen поставяме zu пред инфинитива?', 'Каква е разликата между worden и geworden в Perfekt?', 'Кои фрази са най-важни за банкови услуги и мотивационно писмо?'],
  },
  {
    ...base,
    id: 'de-b1-health',
    monTopicIds: ids('4'),
    title: 'Немски B1: Здраве и здравословен начин на живот — национална кухня, психическо здраве и зависимости',
    originalNoteExcerpt:
      'Тематична област „Здраве и здравословен начин на живот“: здравословно хранене (хранителни навици, национална кухня); здравословен начин на живот (физическо и психическо здраве, зависимости); медицинско обслужване. Граматика: условни изречения с falls и sofern, модални и пасивни конструкции, инфинитивни групи.',
    summary: {
      overview:
        'Разглеждаме връзката между хранителните навици, националните кулинарни традиции, физическото и психическото здраве и превенцията на съвременните зависимости (включително дигиталните).',
      keyPoints: [
        'Хранителни навици и национална кухня: die Essgewohnheiten — хранителни навици, hausgemachte Speisen, regionale Spezialitäten (в България: Baniza, Schopska-Salat, Joghurt mit Lactobacillus bulgaricus; в Германия/Австрия/Швейцария: Vollkornbrot, Brezel, Sauerkraut, Wiener Schnitzel, Käsefondue), bewusste Ernährung.',
        'Физическо и психическо здраве (Körperliche und psychische Gesundheit): im Einklang leben — живея в хармония, das Wohlbefinden — благосъстояние/тонус, die Überlastung — претоварване, der Schlafmangel — недоспиване, Entspannungstechniken, ein Ausgleich zum Schulstress (спорт, музика, природа като баланс срещу стреса).',
        'Зависимости и превенция (Süchte und Prävention): die Sucht / die Abhängigkeit — зависимост (Rauchen, Alkohol, Spielsucht, Mediensucht / Smartphonesucht / Kaufsucht), süchtig sein nach (+ Dat.) / abhängig sein von (+ Dat.), der Versuchung widerstehen — устоявам на изкушението, Beratungsstellen — консултативни центрове.',
        'Условни връзки с falls и sofern („в случай че / стига да“): На ниво B1 освен wenn за условие използваме falls (в случай че — при по-малка вероятност) и sofern (доколкото / стига да): Falls die Schmerzen bis morgen nicht nachlassen, müssen Sie sofort einen Facharzt aufsuchen.',
        'Примерен текст: Zu einem gesunden Lebensstil gehört heute nicht nur körperliche Bewegung und eine vitaminreiche Ernährung, sondern auch die Pflege der psychischen Gesundheit. Viele Jugendliche sind fast rund um die Uhr online und merken kaum, wie schnell eine Mediensucht entstehen kann. Um das seelische Gleichgewicht zu bewahren, sollte man jeden Tag feste Zeiten ohne Bildschirm einplanen und mehr Zeit mit Freunden in der Natur verbringen.',
      ],
      examGoldenRule:
        'Запомни предлозите при думата „зависим“: abhängig sein VON (+ Dativ: abhängig vom Smartphone), но süchtig sein NACH (+ Dativ: süchtig nach Computerspielen / nach Süßigkeiten).',
      commonTraps: [
        'Съществителното die Sucht (зависимост/пристрастяване) произлиза от старонемската дума за болест (siech), а не от глагола suchen (търся)! Множественото му число е die Süchte.',
        'След съюза falls (в случай че) спрегнатият глагол стои на последно място, точно както след wenn.',
      ],
      formulasOrDates: [
        { label: 'Зависим от…', value: 'abhängig sein von (+ Dat.) | süchtig sein nach (+ Dat.)' },
        { label: 'Условие в медицината', value: 'Falls die Symptome anhalten, suchen Sie einen Arzt auf!' },
        { label: 'Психическо равновесие', value: 'ein Ausgleich zum Stress | das körperliche und seelische Wohlbefinden' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b1-health-chk-1',
        requirement: 'Есе „Smartphonesucht bei Jugendlichen — Gefahr und Lösungen“ (170–200 думи)',
        whyNeeded: 'Зависимостите и психическото здраве са новите акценти в програмата за ниво B1.',
        isEssentialForSix: true,
        suggestedNotes: 'Признаци на зависимост, последици (Schlafmangel, Konzentrationsprobleme), решения (Digital Detox, Sport als Ausgleich).',
      },
      {
        id: 'de-b1-health-chk-2',
        requirement: 'Описание на традиционно българско ястие и неговите здравословни качества',
        whyNeeded: 'Покрива подтемата „Национална кухня и хранителни навици“.',
        isEssentialForSix: false,
        suggestedNotes: 'Zutaten, Zubereitung (в Passiv Präsens), защо българското кисело мляко е световноизвестно.',
      },
    ],
    flashcards: [
      { id: 'de-b1-health-fc-1', front: 'Как е „зависимост“ и „пристрастен към компютърни игри“?', back: 'die Sucht (die Abhängigkeit) / süchtig nach Computerspielen', tag: 'Зависимости' },
      { id: 'de-b1-health-fc-2', front: 'Как е „физическо и психическо благосъстояние“?', back: 'das körperliche und psychische (seelische) Wohlbefinden', tag: 'Здраве' },
      { id: 'de-b1-health-fc-3', front: 'Как е „недоспиване“ и „претоварване“?', back: 'der Schlafmangel / die Überlastung', tag: 'Здраве' },
      { id: 'de-b1-health-fc-4', front: 'Какво означава съюзът „falls“ и какъв е словоредът след него?', back: '„В случай че“ — въвежда условно подчинено изречение с глагол на последно място.', tag: 'Граматика' },
      { id: 'de-b1-health-fc-5', front: 'Как е „хранителни навици“ и „лекар специалист“?', back: 'die Essgewohnheiten / der Facharzt', tag: 'Медицина' },
      { id: 'de-b1-health-fc-6', front: 'Как се превежда „Спортът е добър баланс срещу училищния стрес“?', back: 'Sport ist ein guter Ausgleich zum Schulstress.', tag: 'Здраве' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Experten warnen davor, dass immer mehr Jugendliche ___ sozialen Medien süchtig werden.',
        options: ['nach', 'von', 'für', 'über'],
        correctIndex: 0,
        explanation: 'Прилагателното süchtig се свързва с предлога nach + Dativ (süchtig nach sozialen Medien).',
      },
      {
        id: 2,
        question: 'Попълнете: ___ Sie Nebenwirkungen bemerken, wenden Sie sich bitte sofort an Ihren Arzt oder Apotheker.',
        options: ['Falls', 'Trotz', 'Wegen', 'Deshalb'],
        correctIndex: 0,
        explanation: 'В листовки за лекарства и медицински съвети „В случай че забележите…“ се изразява със съюза Falls.',
      },
      {
        id: 3,
        question: 'Кое понятие описва състоянието на постоянна преумора и липса на достатъчно сън?',
        options: ['der Schlafmangel und die Überlastung', 'die Gastfreundschaft und die Tradition', 'die Vollzeitarbeit und das Gehalt', 'der Fahrplan und die Haltestelle'],
        correctIndex: 0,
        explanation: 'Der Schlafmangel е недоспиване, а die Überlastung — претоварване.',
      },
      {
        id: 4,
        question: 'Какво означава думата „die Essgewohnheiten“?',
        options: ['хранителни навици', 'жилищни условия', 'пътни знаци', 'работно облекло'],
        correctIndex: 0,
        explanation: 'Das Essen (хранене) + die Gewohnheit (навик) = die Essgewohnheiten.',
      },
      {
        id: 5,
        question: 'Попълнете: Für mich ist das Schwimmen der beste ___ zum anstrengenden Schulalltag.',
        options: ['Ausgleich', 'Ausfall', 'Ausweis', 'Ausgang'],
        correctIndex: 0,
        explanation: 'Der Ausgleich означава баланс / разтоварваща противотежест на напрежението.',
      },
      {
        id: 6,
        question: 'Кой от следните кулинарни специалитети е традиционен за Швейцария?',
        options: ['das Käsefondue und das Rösti', 'die Baniza und der Tarator', 'die Paella und die Tortilla', 'das Sushi und der grüne Tee'],
        correctIndex: 0,
        explanation: 'Фондюто от разтопено сирене (Käsefondue) и картофеното ястие Rösti са национални специалитети на Швейцария.',
      },
    ],
    quickQuestions: ['Кога казваме süchtig nach и кога abhängig von?', 'Как да напиша есе за превенция на зависимостите при младежите?', 'Как да представя българската национална кухня на немски?'],
  },
  {
    ...base,
    id: 'de-b1-nature',
    monTopicIds: ids('5'),
    title: 'Немски B1: Природа и екология — природни забележителности, глобални проблеми и еко инициативи',
    originalNoteExcerpt:
      'Тематична област „Природа и екология“: природни забележителности в България и в страните на изучавания език; екология и бъдеще (глобални екологични проблеми, екологични организации и инициативи). Граматика: Futur I, Passiv с модални глаголи, причастни определения, съюзи за цел, причина и следствие (damit, sodass, folglich).',
    summary: {
      overview:
        'Представяме природните феномени в България и в немскоезичните страни и дискутираме глобалните екологични предизвикателства и дейността на международните и младежките екологични организации.',
      keyPoints: [
        'Природни забележителности (Natursehenswürdigkeiten): В България — die Sieben Rila-Seen (Седемте рилски езера), die Felsen von Belogradtschik, das Kap Kaliakra, das Reservat Srebarna, die Höhle Magura; в D-A-CH — der Schwarzwald, die Sächsische Schweiz, das Wattenmeer an der Nordsee (приливно-отливна зона в ЮНЕСКО), der Bodensee, das Matterhorn und der Aletschgletscher in den Alpen.',
        'Глобални екологични проблеми (Globale Umweltprobleme): die globale Erderwärmung, extreme Wetterereignisse, das Schmelzen der Polkappen, die Verschmutzung der Weltmeere durch Mikroplastik, der Verlust der Artenvielfalt (Biodiversität), die Erschöpfung natürlicher Ressourcen.',
        'Екологични организации и инициативи: Umweltschutzorganisationen (WWF, Greenpeace, BUND), Jugendinitiativen, Aufforstungsprojekte — проекти за залесяване, Müllsammelaktionen — акции за почистване, das Bewusstsein schärfen — повишавам обществената чувствителност, eine Petition unterschreiben, nachhaltige Entwicklung fördern.',
        'Следствени подчинени изречения със sodass / so …, dass („така че“): Изразяват резултата от действието и изпращат спрегнатия глагол в края на подчиненото изречение: Die Temperaturen steigen weltweit an, sodass viele Gletscher in den Alpen immer schneller schmelzen.',
        'Примерен текст: Zu den eindrucksvollsten Naturwundern Bulgariens gehören die Sieben Rila-Seen im Rila-Gebirge. Jeden Sommer wandern Tausende Touristen dorthin, sodass das empfindliche Ökosystem stark belastet wird. Deshalb engagieren sich viele Freiwillige und Umweltorganisationen vor Ort: Sie informieren die Besucher und organisieren Reinigungsaktionen, damit diese einzigartige Natur auch für künftige Generationen erhalten bleibt.',
      ],
      examGoldenRule:
        'Различавай съюза за следствие sodass („така че / в резултат на което“ — показва реален резултат) от съюза за цел damit („за да“ — показва желана цел). И след двата глаголът стои в края!',
      commonTraps: [
        'Морето край северното крайбрежие на Германия (Ват, das Wattenmeer) и планината Шварцвалд (der Schwarzwald) се употребяват винаги с определителен член.',
        'При so …, dass прилагателното или наречието стои между so и запетаята: Das Wasser war so kalt, dass wir nicht baden konnten.',
      ],
      formulasOrDates: [
        { label: 'Следствие със sodass', value: 'Es regnete tagelang, sodass der Fluss über die Ufer trat.' },
        { label: 'Степен + следствие', value: 'Die Luft war so verschmutzt, dass man kaum atmen konnte.' },
        { label: 'Еко инициативи', value: 'das Umweltbewusstsein schärfen | an einer Aktion teilnehmen' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b1-nature-chk-1',
        requirement: 'Текст за екологична инициатива или опазване на природна забележителност в България (170–200 думи)',
        whyNeeded: 'Съчетава двете подтеми от програмата за ниво B1 — природни забележителности и еко организации.',
        isEssentialForSix: true,
        suggestedNotes: 'Описание на природния обект, каква е заплахата (sodass…), какви мерки предприемат доброволците (damit…).',
      },
      {
        id: 'de-b1-nature-chk-2',
        requirement: 'Карта/списък на 5 природни забележителности в D-A-CH и 5 в България на немски език',
        whyNeeded: 'За устна презентация и странознание.',
        isEssentialForSix: false,
        suggestedNotes: 'Sieben Rila-Seen, Belogradtschik, Kaliakra <-> Schwarzwald, Bodensee, Wattenmeer, Matterhorn.',
      },
    ],
    flashcards: [
      { id: 'de-b1-nature-fc-1', front: 'Как са на немски „Седемте рилски езера“ и „Белоградчишките скали“?', back: 'die Sieben Rila-Seen / die Felsen von Belogradtschik', tag: 'Природа' },
      { id: 'de-b1-nature-fc-2', front: 'Как е „биоразнообразие“ и „устойчиво развитие“?', back: 'die Artenvielfalt (die Biodiversität) / die nachhaltige Entwicklung', tag: 'Екология' },
      { id: 'de-b1-nature-fc-3', front: 'Каква е разликата между sodass и damit?', back: 'sodass въвежда следствие („така че“); damit въвежда цел („за да“).', tag: 'Граматика' },
      { id: 'de-b1-nature-fc-4', front: 'Как е „повишавам екологичното съзнание“?', back: 'das Umweltbewusstsein schärfen (stärken)', tag: 'Инициативи' },
      { id: 'de-b1-nature-fc-5', front: 'Как се превежда „запазвам за бъдещите поколения“?', back: 'für künftige (zukünftige) Generationen erhalten / bewahren', tag: 'Екология' },
      { id: 'de-b1-nature-fc-6', front: 'Какво представлява „das Wattenmeer“ в Северна Германия?', back: 'Уникална приливно-отливна екосистема в Северно море, включена в списъка на ЮНЕСКО.', tag: 'Странознание' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Unsere Klasse hat im Frühling hundert junge Bäume gepflanzt, ___ der Stadtpark grüner wird.',
        options: ['sodass', 'obwohl', 'trotzdem', 'während'],
        correctIndex: 0,
        explanation: 'Изречението изразява резултат/следствие със спрегнат глагол в края -> sodass.',
      },
      {
        id: 2,
        question: 'Попълнете: Der Sturm war ___ stark, ___ viele Züge in Norddeutschland ausfielen.',
        options: ['so / dass', 'zu / als', 'je / desto', 'weder / noch'],
        correctIndex: 0,
        explanation: 'Конструкцията за степен и следствие пред прилагателно е so stark, dass…',
      },
      {
        id: 3,
        question: 'Какво означава изразът „das Umweltbewusstsein der Bürger schärfen“?',
        options: [
          'повишавам екологичната култура и чувствителност на гражданите',
          'забранявам достъпа на граждани до градските паркове',
          'увеличавам цената на билетите за влак',
          'строя нова фабрика за пластмаса',
        ],
        correctIndex: 0,
        explanation: 'Das Bewusstsein schärfen означава изострям/повишавам осъзнатостта по даден обществен въпрос.',
      },
      {
        id: 4,
        question: 'Кой от следните природни обекти се намира на територията на Германия?',
        options: [
          'Der Schwarzwald und die Sächsische Schweiz',
          'Die Sieben Rila-Seen und das Kap Kaliakra',
          'Die Sahara und der Amazonas',
          'Der Grand Canyon und die Niagarafälle',
        ],
        correctIndex: 0,
        explanation: 'Планината Шварцвалд (в Баден-Вюртемберг) и Саксонска Швейцария (край Дрезден) са известни природни области в Германия.',
      },
      {
        id: 5,
        question: 'Попълнете: Durch das Verschwinden vieler Wälder ist die ___ auf der Erde ernsthaft bedroht.',
        options: ['Artenvielfalt', 'Krankenversicherung', 'Straßenbahn', 'Bewerbungsmappe'],
        correctIndex: 0,
        explanation: 'Die Artenvielfalt (биоразнообразието / разнообразието от видове) е застрашено от обезлесяването.',
      },
      {
        id: 6,
        question: 'Попълнете: Viele Jugendliche engagieren ___ in internationalen Umweltschutzorganisationen.',
        options: ['mich', 'dich', 'sich', 'euch'],
        correctIndex: 2,
        explanation: 'Глаголът sich engagieren за 3 л. мн.ч. (viele Jugendliche -> sie) се използва с възвратното местоимение sich.',
      },
    ],
    quickQuestions: ['Как се използват съюзите sodass и so …, dass?', 'Как да опиша природна забележителност като Седемте рилски езера на немски?', 'Какви фрази описват дейността на екологичните организации?'],
  },
  {
    ...base,
    id: 'de-b1-homeland-and-world',
    monTopicIds: ids('6'),
    title: 'Немски B1: Моята родина и светът — традиции, паметници на културата и постижения в науката, изкуството и спорта',
    originalNoteExcerpt:
      'Тематична област „Моята родина и светът“: празници, традиции и обичаи в България и в немскоезичните страни; културно-историческо наследство и паметници на културата; значими постижения в науката, изкуството и спорта. Граматика: Passiv във всички времена, относителни изречения (inkl. dessen/deren), времеви и причинни конструкции.',
    summary: {
      overview:
        'Представяме задълбочено празничния календар, паметниците на културата и световните постижения в науката, изкуството и спорта на България и на Германия, Австрия и Швейцария.',
      keyPoints: [
        'Празници, традиции и обичаи (Feste und Bräuche): В България — Сирни заговезни и Кукери, Баба Марта, Великден, 24 май (Ден на светите братя Кирил и Методий и на българската просвета и култура), Бъдни вечер (Heiligabend mit ungerader Anzahl vegetarischer Gerichte); в D-A-CH — Adventszeit, Nikolaus, Weihnachtsmärkte, Karneval/Fasching/Fasnacht, Ostern, Tag der Deutschen Einheit (3.10.), Nationalfeiertag in Österreich (26.10.), Bundesfeiertag in der Schweiz (1.08.).',
        'Културно-историческо наследство (Kulturerbe): Исторически резервати и паметници — Плиска, Преслав, Царевец във Велико Търново, Старият Пловдив (Европейска столица на културата 2019), Рилският манастир; в D-A-CH — Ваймар (градът на Гьоте и Шилер), Залцбург (градът на Моцарт), Виенската държавна опера, Музейният остров в Берлин.',
        'Постижения в науката, изкуството и спорта: Наука — Джон Атанасов (с български произход, създател на първия електронен цифров компютър), Стамен Григоров (откривател на Lactobacillus bulgaricus), Алберт Айнщайн, Макс Планк, Роберт Кох; Изкуство и музика — Борис Христов, Райна Кабаиванска, Валя Балканска (чиято песен „Излел е Делю хайдутин“ лети в космоса на борда на Вояджър), Христо Явашев – Кристо (опаковането на Райхстага в Берлин през 1995 г.!), Бетовен, Моцарт, Бах; Спорт — Стефка Костадинова, Христо Стоичков, Григор Димитров, Борис Бекер, Щефи Граф, Роджър Федерер.',
        'Описване на биографии и постижения: einen Rekord aufstellen / brechen — поставям / подобрявам рекорд, den Nobelpreis erhalten / verleihen — получавам / присъждам Нобелова награда, Weltruhm erlangen — придобивам световна слава, das Erbe bewahren — опазвам наследството.',
        'Примерен текст: Ein wunderbares Symbol für die kulturelle Verbindung zwischen Bulgarien und Deutschland ist das Kunstprojekt „Verhüllter Reichstag“ aus dem Jahr 1995. Der weltberühmte Künstler Christo (Christo Jawaschew), der in Gabrowo geboren wurde, verhüllte zusammen mit seiner Frau Jeanne-Claude das Reichstagsgebäude in Berlin mit glänzendem Stoff. Das Kunstwerk wurde von fünf Millionen Menschen besucht und bleibt unvergesslich.',
      ],
      examGoldenRule:
        'Когато пишеш за исторически личности и техните открития или произведения, комбинирай активни форми в Präteritum (er erfand, sie komponierte, er stellte einen Weltrekord auf) с пасивни форми (wurde mit dem Nobelpreis ausgezeichnet, wurde ins All geschickt).',
      commonTraps: [
        'Различавай глаголите verleihen (присъждам награда: Ihm wurde der Preis verliehen) и erhalten / bekommen (получавам награда: Er erhielt den Preis).',
        'Националните празници на трите страни: Германия — 3 октомври; Австрия — 26 октомври; Швейцария — 1 август.',
      ],
      formulasOrDates: [
        { label: 'Национални празници D-A-CH', value: 'DE: 3. Oktober | AT: 26. Oktober | CH: 1. August' },
        { label: 'Наука и изкуство', value: 'mit dem Nobelpreis ausgezeichnet werden | Weltruhm erlangen' },
        { label: 'Спорт', value: 'einen Weltrekord aufstellen / brechen | eine Goldmedaille gewinnen' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b1-world2-chk-1',
        requirement: 'Текст/презентация за бележита личност от българската или германската наука, изкуство или спорт (170–200 думи)',
        whyNeeded: 'Пряко покрива новата подтема в програмата за B1 — значими постижения в науката, изкуството и спорта.',
        isEssentialForSix: true,
        suggestedNotes: 'Кратка биография, основно постижение, защо личността е важна за света (напр. Кристо, Джон Атанасов, Айнщайн).',
      },
      {
        id: 'de-b1-world2-chk-2',
        requirement: 'Справка за националните празници и културни символи на Германия, Австрия и Швейцария',
        whyNeeded: 'За социокултурна компетентност на ниво B1.',
        isEssentialForSix: false,
        suggestedNotes: 'Дати на празниците, столици и емблематични паметници на културата.',
      },
    ],
    flashcards: [
      { id: 'de-b1-world2-fc-1', front: 'Как е „поставям световен рекорд“ и „подобрявам рекорд“?', back: 'einen Weltrekord aufstellen / einen Rekord brechen', tag: 'Спорт' },
      { id: 'de-b1-world2-fc-2', front: 'Как е „бивам удостоен с Нобелова награда“?', back: 'mit dem Nobelpreis ausgezeichnet werden', tag: 'Наука' },
      { id: 'de-b1-world2-fc-3', front: 'Кой роден в България световен творец опакова сградата на Райхстага в Берлин през 1995 г.?', back: 'Христо Явашев – Кристо (Christo und Jeanne-Claude: „Verhüllter Reichstag“).', tag: 'Изкуство' },
      { id: 'de-b1-world2-fc-4', front: 'Кога са националните празници на Австрия и на Швейцария?', back: 'Австрия — 26 октомври (26. Oktober); Швейцария — 1 август (1. August).', tag: 'Странознание' },
      { id: 'de-b1-world2-fc-5', front: 'Как е „придобивам световна слава“ и „опазвам културното наследство“?', back: 'Weltruhm erlangen / das Kulturerbe bewahren', tag: 'Култура' },
      { id: 'de-b1-world2-fc-6', front: 'Как е „нечетен брой постни ястия“ (за трапезата на Бъдни вечер)?', back: 'eine ungerade Anzahl vegetarischer (fleischloser) Gerichte', tag: 'Традиции' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Im Jahr 1921 ___ Albert Einstein mit dem Nobelpreis für Physik ausgezeichnet.',
        options: ['hat', 'wurde', 'würde', 'war'],
        correctIndex: 1,
        explanation: 'За минало събитие в страдателен залог („беше удостоен“) се използва Passiv Präteritum: wurde … ausgezeichnet.',
      },
      {
        id: 2,
        question: 'Попълнете: Die bulgarische Hochspringerin Stefka Kostadinowa ___ 1987 in Rom einen unglaublichen Weltrekord von 2,09 Metern ___.',
        options: ['stellte / auf', 'hob / ab', 'schloss / ab', 'lud / ein'],
        correctIndex: 0,
        explanation: 'Изразът за поставяне на рекорд е einen Rekord aufstellen (в Präteritum: stellte … auf).',
      },
      {
        id: 3,
        question: 'С кое грандиозно произведение в Берлин е известен в Германия роденият в Габрово художник Кристо?',
        options: [
          'С опаковането на сградата на Райхстага („Verhüllter Reichstag“, 1995)',
          'С построяването на Бранденбургската врата през 1791 г.',
          'С композирането на Одата на радостта',
          'С основаването на Хумболтовия университет',
        ],
        correctIndex: 0,
        explanation: 'Проектът „Verhüllter Reichstag“ на Кристо и Жан-Клод през 1995 г. е едно от най-знаковите арт събития в съвременна Германия.',
      },
      {
        id: 4,
        question: 'Попълнете относителното изречение: Das ist die berühmte Volkssängerin Walja Balkanska, ___ Lied mit der Raumsonde Voyager ins Weltall geschickt wurde.',
        options: ['dessen', 'deren', 'denen', 'die'],
        correctIndex: 1,
        explanation: 'Притежателят пред запетаята е от женски род (die Volkssängerin), затова за „чиято песен“ се използва deren.',
      },
      {
        id: 5,
        question: 'На коя дата Швейцария чества своя национален празник (Bundesfeiertag)?',
        options: ['На 1 август', 'На 3 октомври', 'На 24 май', 'На 6 декември'],
        correctIndex: 0,
        explanation: 'Швейцарският национален празник се отбелязва на 1 август.',
      },
      {
        id: 6,
        question: 'Какво означава глаголът „bewahren“ в израза „alte Traditionen und das Kulturerbe bewahren“?',
        options: ['съхранявам / опазвам', 'забравям / унищожавам', 'продавам на търг', 'превеждам на чужд език'],
        correctIndex: 0,
        explanation: 'Bewahren означава съхранявам, пазя за поколенията.',
      },
    ],
    quickQuestions: ['Как да представя на немски българските постижения в науката, изкуството и спорта?', 'Кои са националните празници на Германия, Австрия и Швейцария?', 'Как се използват изразите einen Rekord aufstellen и mit einem Preis ausgezeichnet werden?'],
  },
  {
    ...base,
    id: 'de-b1-skills',
    monTopicIds: ids('skills'),
    title: 'Немски B1: Слушане, четене, говорене и писане — пълна комуникативна компетентност',
    originalNoteExcerpt:
      'Очаквани резултати по четирите умения за пълно ниво B1: разбиране на основната информация, детайли, причинно-следствени връзки и имплицитни послания в автентични текстове (до 3–4 минути при слушане); четене на публицистични, научнопопулярни и художествени текстове; водене на спонтанен разговор, дебат и презентация при говорене; писане на лично и официално писмо, автобиография, разказ и аргументативен текст (170–200 думи).',
    summary: {
      overview:
        'Обобщаваме изискванията за завършено ниво B1 (самостоятелно ползване на езика според Общата европейска езикова рамка): разбиране на автентични медийни и литературни текстове, участие в дебат и писане на текстове от 170–200 думи.',
      keyPoints: [
        'Слушане (Hörverstehen — автентични записи до 3–4 минути): Улавяш както фактите, така и логическите връзки, тона и косвените внушения в радиодискусии, репортажи, интервюта и презентации. Следи как говорещият структурира речта си (Erstens…, was noch wichtiger ist…, im Gegensatz dazu…).',
        'Четене (Leseverstehen): Самостоятелно четеш статии от пресата, рецензии, официални документи/инструкции и адаптирани художествени текстове. Разпознаваш позицията на автора, аргументативната верига и скритата ирония или критика.',
        'Говорене (Sprechen — презентация и дебат): Правиш структурирана устна презентация по проблемна тема, отговаряш спонтанно на въпроси от публиката и участваш в дебат: формулираш хипотези (Angenommen, dass… / Nehmen wir an, …), оборваш аргументи (Dem möchte ich widersprechen, weil…) и предлагаш компромис.',
        'Писане (Schreiben — 170–200 думи): Създаваш логически издържани текстове с богат речник и сложен синтаксис: (1) Аргументативно есе / статия с теза, аргументи „за“ и „против“, примери и заключение; (2) Официално писмо (мотивационно писмо, запитване, жалба/рекламация); (3) Свързан разказ или описание с лична рефлексия.',
        'Модел за аргументативен абзац (B1): Ein gewichtiges Argument für Schüleraustauschprogramme besteht darin, dass Jugendliche nicht nur ihre Sprachkenntnisse in realen Situationen anwenden, sondern auch interkulturelle Kompetenzen erwerben. Wer einige Wochen in einer Gastfamilie lebt, baut Vorurteile ab und wird deutlich selbstständiger. Aus diesem Grund sollten solche Programme von jeder Schule aktiv gefördert werden.',
      ],
      examGoldenRule:
        'На ниво B1 избягвай повторението на глагола sein и прости изрази като Es ist gut/schlecht — замени ги с глаголно-именни словосъчетания: eine wichtige Rolle spielen, einen großen Einfluss ausüben auf (+ Akk.), zur Lösung beitragen, in Frage stellen.',
      commonTraps: [
        'Не надхвърляй и не падай под зададения обем (170–200 думи): планирай около 30 думи за въведение, по 55–60 думи за двата основни аргументативни абзаца и 30 думи за заключение.',
        'Глаголът widersprechen („противореча / възразявам на някого“) изисква Dativ без предлог: Ich muss dieser Meinung (Dat.) widersprechen.',
      ],
      formulasOrDates: [
        { label: 'Обем на писмен текст (B1)', value: '170–200 думи' },
        { label: 'Възражение в дебат', value: 'Dieser Ansicht muss ich widersprechen, denn …' },
        { label: 'Висок стил (B1)', value: 'eine Rolle spielen | Einfluss nehmen auf | zur Lösung beitragen' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b1-skills-chk-1',
        requirement: 'Пълна таблица с езикови клишета (Redemittel) за аргументативно есе от 170–200 думи',
        whyNeeded: 'Осигурява плавен преход между абзаците и висока оценка за стил и кохерентност.',
        isEssentialForSix: true,
        suggestedNotes: 'Въведение (In der heutigen Zeit wird oft diskutiert, ob…), аргументи (Dafür/Dagegen spricht…), извод (Alles in allem…).',
      },
      {
        id: 'de-b1-skills-chk-2',
        requirement: '10 глаголно-именни словосъчетания за обогатяване на писмения и устния изказ',
        whyNeeded: 'Заместват елементарните глаголи machen и sein.',
        isEssentialForSix: true,
        suggestedNotes: 'eine Entscheidung treffen, eine Frage stellen, Hilfe leisten, einen Beitrag leisten, Rücksicht nehmen auf.',
      },
    ],
    flashcards: [
      { id: 'de-b1-skills-fc-1', front: 'Какъв е препоръчителният обем на писмените текстове за завършено ниво B1?', back: '170–200 думи.', tag: 'Писане' },
      { id: 'de-b1-skills-fc-2', front: 'Как се казва на висок стил „вземам решение“ и „съобразявам се с някого“?', back: 'eine Entscheidung treffen / Rücksicht nehmen auf (+ Akk.)', tag: 'Лексика' },
      { id: 'de-b1-skills-fc-3', front: 'Как се въвежда тема на есе („Днес често се обсъжда въпросът дали…“)?', back: 'Heutzutage wird oft darüber diskutiert, ob …', tag: 'Есе' },
      { id: 'de-b1-skills-fc-4', front: 'Кой падеж изисква глаголът widersprechen (възразявам) и zustimmen (съгласявам се)?', back: 'И двата изискват Dativ: Ich stimme dir zu / Ich widerspreche dieser Aussage.', tag: 'Говорене' },
      { id: 'de-b1-skills-fc-5', front: 'Как се казва „В сравнение с…“ и „За разлика от…“?', back: 'Im Vergleich zu (+ Dat.) / Im Gegensatz zu (+ Dat.)', tag: 'Аргументация' },
      { id: 'de-b1-skills-fc-6', front: 'Как се обобщава позиция в последния абзац („Като цяло…“)?', back: 'Alles in allem bin ich der Ansicht, dass … / Zusammenfassend lässt sich sagen, dass …', tag: 'Есе' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Попълнете: Nach langen Überlegungen hat meine Schwester endlich eine wichtige Entscheidung ___.',
        options: ['getroffen', 'gemacht', 'gestellt', 'gehalten'],
        correctIndex: 0,
        explanation: 'На немски „вземам решение“ е устойчивото съчетание eine Entscheidung treffen (Partizip II: getroffen).',
      },
      {
        id: 2,
        question: 'Попълнете в дискусия: In diesem Punkt muss ich ___ leider widersprechen.',
        options: ['dich', 'dir', 'du', 'deinen'],
        correctIndex: 1,
        explanation: 'Глаголът widersprechen изисква Dativ: Ich muss dir (или Ihnen) widersprechen.',
      },
      {
        id: 3,
        question: 'Попълнете: Im Gegensatz ___ meinen Eltern lese ich Nachrichten fast nur noch digital.',
        options: ['mit', 'zu', 'von', 'für'],
        correctIndex: 1,
        explanation: 'Изразът за съпоставка е im Gegensatz zu + Dativ („за разлика от“).',
      },
      {
        id: 4,
        question: 'Кое въвеждащо изречение е най-подходящо за начало на аргументативно есе от 170–200 думи?',
        options: [
          'In der heutigen Gesellschaft spielt die Frage, wie wir die Umwelt schützen können, eine immer größere Rolle.',
          'Hallo Max, danke für deine kurze SMS von gestern Abend!',
          'Entschuldigung, wo ist hier die nächste Bushaltestelle?',
          'Ich möchte bitte ein Kilo Äpfel und zwei Flaschen Mineralwasser kaufen.',
        ],
        correctIndex: 0,
        explanation: 'Изречението формулира обществената значимост на проблема в подходящ за есе регистър.',
      },
      {
        id: 5,
        question: 'Попълнете: Im Straßenverkehr müssen alle Fahrer ___ auf Fußgänger und Radfahrer nehmen.',
        options: ['Rücksicht', 'Absicht', 'Aussicht', 'Vorsicht'],
        correctIndex: 0,
        explanation: 'Устойчивото съчетание „съобразявам се с някого“ е Rücksicht nehmen auf + Akkusativ.',
      },
      {
        id: 6,
        question: 'Попълнете: Jeder Einzelne kann ___ Lösung dieses Problems beitragen.',
        options: ['zur', 'in der', 'über die', 'auf der'],
        correctIndex: 0,
        explanation: 'Глаголът beitragen („допринасям за“) се управлява от предлога zu + Dativ (zu + der = zur Lösung).',
      },
    ],
    quickQuestions: ['Кои глаголно-именни съчетания правят есето на ниво B1 по-професионално?', 'Как се използват глаголите zustimmen и widersprechen в дебат?', 'Как да структурирам есе от 170–200 думи?'],
  },
  {
    ...base,
    id: 'de-b1-grammar',
    monTopicIds: ids('grammar'),
    title: 'Немски B1: Езикови знания — пълен синтез на времена, пасив, Konjunktiv II, причастни и инфинитивни конструкции',
    originalNoteExcerpt:
      'Граматика за пълно ниво B1: пълна система на времената в Aktiv и Passiv (Präsens, Präteritum, Perfekt, Plusquamperfekt, Futur I) и Zustandspassiv; Konjunktiv II за настояще и минало; причастия (Partizip I и II) и разширени определения; инфинитивни конструкции (um/ohne/statt … zu, brauchen/scheinen … zu, haben/sein … zu); предлози с Genitiv; всички видове сложни съчинени и подчинени изречения.',
    summary: {
      overview:
        'Цялостен синтез на граматиката за завършено ниво B1: всички глаголни времена в деятелен и страдателен залог, Konjunktiv II за настояще и минало, модалните конструкции haben/sein + zu + Infinitiv и сложният синтаксис.',
      keyPoints: [
        'Пълна парадигма на Passiv (Vorgangspassiv и Zustandspassiv): Präsens — Das Projekt wird vorgestellt; Präteritum — Das Projekt wurde vorgestellt; Perfekt — Das Projekt ist vorgestellt worden; Plusquamperfekt — Das Projekt war vorgestellt worden; Futur I — Das Projekt wird vorgestellt werden; с модален глагол — Das Projekt muss vorgestellt werden; Zustandspassiv (състояние) — Das Projekt ist vorbereitet.',
        'Konjunktiv II (настояще и минало) и нереални сравнения: Настояще — wäre, hätte, würde + Infinitiv, модални (könnte, müsste, sollte, dürfte); Минало — wäre/hätte + Partizip II (или с модален глагол: Du hättest früher kommen sollen! — Трябваше да дойдеш по-рано!). Нереални сравнения с als ob („сякаш“): Er gibt so viel Geld aus, als ob er Millionär wäre.',
        'Модални инфинитивни конструкции (haben/sein + zu + Infinitiv): (1) haben + zu + Infinitiv замества müssen в активен смисъл: Ich habe heute noch viel zu erledigen (= Ich muss noch viel erledigen); (2) sein + zu + Infinitiv замества können или müssen в ПАСИВЕН смисъл: Die Aufgabe ist leicht zu lösen (= Die Aufgabe kann leicht gelöst werden).',
        'Разширени причастни определения (Erweiterte Partizipialattribute — разпознаване и трансформация): В научни и публицистични текстове пред съществителното често стои разширена група с Partizip I или II: die von den Schülern organisierte Ausstellung = die Ausstellung, die von den Schülern organisiert wurde.',
        'Съюзни наречия и подчинителни съюзи за ниво B1: Причина (weil, da / denn / deshalb, daher, darum, folglich / wegen, aufgrund, infolge); Отстъпка (obwohl, wenngleich / trotzdem, dennoch / trotz); Цел (damit / um … zu); Следствие (sodass, weswegen); Начин и алтернатива (indem, dadurch dass / ohne … zu, statt … zu); Време (als, wenn, während, bevor, nachdem, sobald, solange, seitdem, bis).',
      ],
      examGoldenRule:
        'Запомни разликата между двете модални конструкции със zu: Ich habe die Regeln zu beachten е АКТИВНО („Трябва да спазвам правилата“), докато Die Regeln sind zu beachten е ПАСИВНО („Правилата трябва да се спазват“).',
      commonTraps: [
        'За упрек или съвет за миналото с модален глагол се използва hätte + Infinitiv + модален глагол в инфинитив (двоен инфинитив в края!): Du hättest mir Bescheid sagen sollen / können.',
        'След съюза solange („докато / през цялото време, в което“) глаголът също стои на последно място: Solange du Fieber hast, musst du im Bett bleiben.',
      ],
      formulasOrDates: [
        { label: 'Активна необходимост', value: 'haben + zu + Infinitiv (Ich habe viel zu tun = Ich muss viel tun)' },
        { label: 'Пасивна възможност/необходимост', value: 'sein + zu + Infinitiv (Das Problem ist zu lösen = kann/muss gelöst werden)' },
        { label: 'Съвет за миналото', value: 'Du hättest mehr lernen sollen! (Трябваше да учиш повече!)' },
      ],
    },
    notebookChecklist: [
      {
        id: 'de-b1-gram-chk-1',
        requirement: 'Таблица на заместващите форми за Passiv (man + Aktiv, sich lassen + Infinitiv, sein + zu + Infinitiv)',
        whyNeeded: 'Позволява гъвкаво разбиране и трансформиране на текстове на ниво B1.',
        isEssentialForSix: true,
        suggestedNotes: 'Das kann repariert werden = Man kann das reparieren = Das lässt sich reparieren = Das ist zu reparieren.',
      },
      {
        id: 'de-b1-gram-chk-2',
        requirement: 'Примери за трансформация на разширено причастно определение в относително изречение',
        whyNeeded: 'Ключово умение при четене на статии и научнопопулярни текстове.',
        isEssentialForSix: true,
        suggestedNotes: 'das gestern gekaufte Buch -> das Buch, das gestern gekauft wurde.',
      },
    ],
    flashcards: [
      { id: 'de-b1-gram-fc-1', front: 'Какво означава конструкцията „sein + zu + Infinitiv“ (напр. „Die Frist ist einzuhalten“)?', back: 'Има пасивно модално значение (= muss/kann + Partizip II + werden): Срокът трябва да бъде спазен.', tag: 'Граматика' },
      { id: 'de-b1-gram-fc-2', front: 'Какво означава конструкцията „haben + zu + Infinitiv“ (напр. „Ich habe noch zwei Briefe zu schreiben“)?', back: 'Има активно модално значение (= müssen): Трябва да напиша още две писма.', tag: 'Граматика' },
      { id: 'de-b1-gram-fc-3', front: 'Как се казва „Трябваше да ме попиташ по-рано!“ в Konjunktiv II за миналото?', back: 'Du hättest mich früher fragen sollen!', tag: 'Konjunktiv II' },
      { id: 'de-b1-gram-fc-4', front: 'Как се превежда „Той се държи така, сякаш нищо не се е случило“?', back: 'Er verhält sich so, als ob nichts passiert wäre.', tag: 'Синтаксис' },
      { id: 'de-b1-gram-fc-5', front: 'Как се трансформира „die im Jahr 1995 eröffnete Ausstellung“ в относително изречение?', back: 'die Ausstellung, die im Jahr 1995 eröffnet wurde', tag: 'Причастия' },
      { id: 'de-b1-gram-fc-6', front: 'Какво означават съюзите sobald и solange?', back: 'sobald = веднага щом; solange = докато (през цялото време, през което).', tag: 'Съюзи' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Кое изречение има същото значение като „Dieses Problem kann leicht gelöst werden“?',
        options: [
          'Dieses Problem ist leicht zu lösen.',
          'Dieses Problem hat leicht zu lösen.',
          'Dieses Problem wird leicht lösen.',
          'Dieses Problem braucht leicht zu lösen.',
        ],
        correctIndex: 0,
        explanation: 'Конструкцията sein + zu + Infinitiv (ist leicht zu lösen) изразява пасивна възможност (= kann leicht gelöst werden).',
      },
      {
        id: 2,
        question: 'Попълнете: Es war mein Fehler — ich ___ mir die Bedingungen vorher genauer durchlesen sollen!',
        options: ['habe', 'hätte', 'wäre', 'würde'],
        correctIndex: 1,
        explanation: 'За съжаление за минало действие с модален глагол се използва hätte + Infinitiv + sollen.',
      },
      {
        id: 3,
        question: 'Попълнете: Er tut immer so, als ob er alles besser ___.',
        options: ['weiß', 'wüsste', 'gewusst', 'wissen'],
        correctIndex: 1,
        explanation: 'След als ob („сякаш“) за нереално сравнение се използва Konjunktiv II (от wissen -> er wüsste).',
      },
      {
        id: 4,
        question: 'Как се преобразува разширеното определение „der von den Schülern gedrehte Kurzfilm“ в относително изречение?',
        options: [
          'der Kurzfilm, der von den Schülern gedreht wurde',
          'der Kurzfilm, der die Schüler gedreht hat',
          'die Schüler, die den Kurzfilm drehen werden',
          'der Kurzfilm, dessen Schüler gedreht haben',
        ],
        correctIndex: 0,
        explanation: 'Partizip II (gedrehte) с извършител von den Schülern съответства на пасивно относително изречение: der von den Schülern gedreht wurde.',
      },
      {
        id: 5,
        question: 'Попълнете: ___ ich zu Hause ankomme, rufe ich dich sofort an.',
        options: ['Sobald', 'Trotzdem', 'Wegen', 'Währenddessen'],
        correctIndex: 0,
        explanation: 'Съюзът sobald означава „веднага щом“ и изпраща глагола ankomme на края на подчиненото изречение.',
      },
      {
        id: 6,
        question: 'Попълнете в Passiv Perfekt: Das alte Stadttheater ___ im letzten Jahr komplett renoviert ___.',
        options: ['hat / geworden', 'ist / worden', 'wurde / gewesen', 'wird / werden'],
        correctIndex: 1,
        explanation: 'Passiv Perfekt се образува със спомагателния глагол sein (ist) + Partizip II (renoviert) + worden.',
      },
    ],
    quickQuestions: ['Каква е разликата между haben + zu + Infinitiv и sein + zu + Infinitiv?', 'Как се образува Konjunktiv II за миналото с модален глагол (hätte … sollen)?', 'Как да разбера разширено причастно определение в сложен текст?'],
  },
];
