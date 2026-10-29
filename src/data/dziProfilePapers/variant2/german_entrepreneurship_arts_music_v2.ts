import type { ExamPaper } from '../../../lib/examPaperScoring';
import { DZI_SCALE } from '../../../lib/monGradeScale';

const t = String.raw;

export const DZI_DE_B2_PRACTICE_2: ExamPaper = {
  id: 'practice-dzi-de-b2-2',
  title: 'Немски език (ниво B2) — Втори ДЗИ, тренировъчен вариант 2',
  exam: 'ДЗИ',
  subject: 'Немски език',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Втори тренировъчен вариант за Втори ДЗИ по немски език (профилирана подготовка — ниво B2 по ОЕЕР). Включва Четене с разбиране (30 т.), Езикови задачи — граматика и лексика (40 т.) и Създаване на два писмени текста (30 т.).',
  sections: [
    {
      id: 'de2-reading',
      title: 'Teil 1. Leseverstehen (30 Punkte)',
      instructions:
        'Lesen Sie die beiden Texte und wählen Sie bei den Aufgaben 1–10 die richtige Lösung (A, B, C oder D). Jede richtige Antwort bringt 3 Punkte.',
      questions: [
        {
          id: 'dzi-dev2-q1', number: 1, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Text A: Mobilität der Zukunft in europäischen Städten',
              body: `Viele europäische Großstädte stehen heute vor einer doppelten Herausforderung: Einerseits wächst die Bevölkerung in den Ballungsräumen stetig, andererseits müssen die CO₂-Emissionen und die Feinstaubbelastung drastisch gesenkt werden. Während jahrzehntelang der Ausbau breiter Straßen für den individuellen Autoverkehr im Mittelpunkt der Stadtplanung stand, vollzieht sich nun ein tiefgreifender Wandel.
Immer mehr Kommunen setzen auf das Konzept der „Stadt der kurzen Wege“ (auch als 15-Minuten-Stadt bekannt). Die Grundidee besteht darin, dass Bewohnerinnen und Bewohner alle wichtigen Einrichtungen des täglichen Bedarfs — Arbeitsplatz, Schule, Einkaufsmöglichkeiten, Arztpraxen sowie Grünflächen — innerhalb von fünfzehn Minuten zu Fuß oder mit dem Fahrrad erreichen können. Ergänzt wird dieses Modell durch einen engmaschigen, elektrisch betriebenen öffentlichen Personennahverkehr (ÖPNV) und Carsharing-Stationen an zentralen Knotenpunkten.
Verkehrsforscher betonen jedoch, dass Verbote allein selten zum Erfolg führen. Entscheidend sei vielmehr, dass Busse, Straßenbahnen und Radwege so zuverlässig, sicher und preiswert gestaltet werden, dass der Umstieg vom eigenen Pkw im Alltag als Gewinn an Lebensqualität wahrgenommen wird.`,
            },
          ],
          prompt: 'Worin besteht die doppelte Herausforderung für viele europäische Großstädte laut dem ersten Absatz?',
          options: [
            'Die Bevölkerung schrumpft, während immer mehr Bahnhöfe geschlossen werden.',
            'Die Einwohnerzahl in den Ballungsräumen steigt, während gleichzeitig Schadstoffemissionen stark reduziert werden müssen.',
            'Es gibt zu viele Radwege und zu wenige Fußgängerzonen.',
            'Die Städte dürfen keine öffentlichen Verkehrsmittel mehr finanzieren.',
          ],
          correctIndex: 1,
          explanation: 'Im ersten Absatz heißt es ausdrücklich: „Einerseits wächst die Bevölkerung in den Ballungsräumen stetig, andererseits müssen die CO₂-Emissionen und die Feinstaubbelastung drastisch gesenkt werden.“',
        },
        {
          id: 'dzi-dev2-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Was kennzeichnet das im Text beschriebene Konzept der „15-Minuten-Stadt“?',
          options: [
            'Autofahrten durch die Innenstadt dürfen maximal 15 Minuten dauern.',
            'Alle wichtigen Ziele des Alltags sollen in höchstens 15 Minuten zu Fuß oder mit dem Rad erreichbar sein.',
            'Straßenbahnen fahren nur alle 15 Stunden.',
            'Geschäfte dürfen nur 15 Minuten pro Tag geöffnet sein.',
          ],
          correctIndex: 1,
          explanation: 'Laut dem zweiten Absatz sollen Arbeitsplatz, Schule, Einkauf, Arzt und Grünflächen innerhalb von 15 Minuten zu Fuß oder mit dem Fahrrad erreichbar sein.',
        },
        {
          id: 'dzi-dev2-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'Welche Rolle spielen Carsharing-Stationen in diesem modernen Mobilitätskonzept?',
          options: [
            'Sie ersetzen vollständig alle Busse und Straßenbahnen.',
            'Sie ergänzen den öffentlichen Nahverkehr an zentralen Verkehrsknotenpunkten.',
            'Sie sind ausschließlich für Touristen außerhalb der Stadt gedacht.',
            'Sie werden von den Kommunen verboten.',
          ],
          correctIndex: 1,
          explanation: 'Im Text steht: „Ergänzt wird dieses Modell durch einen engmaschigen, elektrisch betriebenen öffentlichen Personennahverkehr (ÖPNV) und Carsharing-Stationen an zentralen Knotenpunkten.“',
        },
        {
          id: 'dzi-dev2-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Was ist nach Ansicht der Verkehrsforscher entscheidend für einen erfolgreichen Umstieg vom eigenen Auto?',
          options: [
            'Strenge Verbote ohne Ausbau von Alternativen.',
            'Zuverlässige, sichere und günstige Alternativen bei ÖPNV und Radwegen, die als Gewinn an Lebensqualität erlebt werden.',
            'Die Abschaffung aller Fußgängerzonen.',
            'Die Erhöhung der Parkplätze in historischen Stadtkernen.',
          ],
          correctIndex: 1,
          explanation: 'Der letzte Absatz betont, dass Verbote allein selten genügen; Busse, Bahnen und Radwege müssen zuverlässig, sicher und preiswert sein.',
        },
        {
          id: 'dzi-dev2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'Welches Wort im ersten Absatz bedeutet „tiefgreifende Veränderung / Umgestaltung“?',
          options: ['Wandel', 'Feinstaub', 'Bedarf', 'Knotenpunkt'],
          correctIndex: 0,
          explanation: '„Ein tiefgreifender Wandel“ bedeutet eine grundlegende Veränderung.',
        },
        {
          id: 'dzi-dev2-q6', number: 6, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Text B: Duales Studium — Theorie und Praxis im Einklang',
              body: `Wer nach dem Abitur vor der Wahl zwischen einer klassischen Berufsausbildung und einem akademischen Hochschulstudium steht, entscheidet sich im deutschsprachigen Raum immer häufiger für einen dritten Weg: das duale Studium. Dabei wechseln sich Theoriephasen an einer Hochschule oder Berufsakademie systematisch mit Praxisphasen in einem Partnerunternehmen ab.
Der größte Vorteil liegt auf der Hand: Die Studierenden erwerben nicht nur einen international anerkannten Bachelor-Abschluss, sondern sammeln bereits während der Studienzeit wertvolle Berufserfahrung. Darüber hinaus zahlen die meisten Partnerbetriebe eine monatliche Vergütung und übernehmen oft sogar die Studiengebühren. Nach dem Abschluss sind die Übernahmechancen im Ausbildungsbetrieb überdurchschnittlich hoch, da die Absolventinnen und Absolventen die Arbeitsabläufe bereits bestens kennen.
Allerdings verlangt dieses Studienmodell ein hohes Maß an Disziplin, Belastbarkeit und Zeitmanagement. Semesterferien im herkömmlichen Sinne gibt es kaum, weil in der vorlesungsfreien Zeit im Betrieb gearbeitet wird.`,
            },
          ],
          prompt: 'Was verbindet das duale Studium laut Text B miteinander?',
          options: [
            'Zwei verschiedene Studiengänge an zwei ausländischen Universitäten ohne Praxis.',
            'Theoriephasen an einer Hochschule und praktische Arbeitsphasen in einem Partnerunternehmen.',
            'Ein Fernstudium ohne Prüfungen und einen Ferienjob.',
            'Schulunterricht am Vormittag und Sporttraining am Nachmittag.',
          ],
          correctIndex: 1,
          explanation: 'Im ersten Absatz heißt es: „Dabei wechseln sich Theoriephasen an einer Hochschule oder Berufsakademie systematisch mit Praxisphasen in einem Partnerunternehmen ab.“',
        },
        {
          id: 'dzi-dev2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Welchen finanziellen Vorteil bietet das duale Studium in der Regel?',
          options: [
            'Die Studierenden erhalten eine monatliche Vergütung vom Betrieb, der oft auch die Studiengebühren übernimmt.',
            'Die Studierenden müssen doppelt so hohe Studiengebühren selbst bezahlen.',
            'Man bekommt ein Gehalt nur dann, wenn man das Studium abbricht.',
            'Es gibt keinerlei finanzielle Unterstützung.',
          ],
          correctIndex: 0,
          explanation: 'Im zweiten Absatz wird erklärt, dass die Partnerbetriebe meist eine monatliche Vergütung zahlen und oft die Studiengebühren übernehmen.',
        },
        {
          id: 'dzi-dev2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Warum sind die Chancen auf eine Festanstellung nach dem Abschluss besonders hoch?',
          options: [
            'Weil die Absolventen keine Prüfungen ablegen müssen.',
            'Weil die Absolventen das Unternehmen und dessen Arbeitsabläufe bereits aus den Praxisphasen gut kennen.',
            'Weil es gesetzlich verboten ist, den Betrieb zu wechseln.',
            'Weil das Studium nur sechs Monate dauert.',
          ],
          correctIndex: 1,
          explanation: 'Der Text nennt als Grund, „da die Absolventinnen und Absolventen die Arbeitsabläufe bereits bestens kennen“.',
        },
        {
          id: 'dzi-dev2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Welche Herausforderung ist mit einem dualen Studium verbunden?',
          options: [
            'Man erwirbt keinen anerkannten Hochschulabschluss.',
            'Es erfordert hohe Disziplin und Belastbarkeit, da es kaum klassische Semesterferien gibt.',
            'Man darf während des Studiums keine Bücher benutzen.',
            'Die Vorlesungen finden ausschließlich nachts statt.',
          ],
          correctIndex: 1,
          explanation: 'Im dritten Absatz wird betont, dass hohe Disziplin und gutes Zeitmanagement nötig sind, weil man in der vorlesungsfreien Zeit im Betrieb arbeitet.',
        },
        {
          id: 'dzi-dev2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Was bedeutet der Ausdruck „liegt auf der Hand“ im zweiten Absatz?',
          options: [
            'ist völlig unklar',
            'ist offensichtlich / leicht erkennbar',
            'ist handwerklich schwierig',
            'ist streng geheim',
          ],
          correctIndex: 1,
          explanation: 'Die Redewendung „etwas liegt auf der Hand“ bedeutet „etwas ist offensichtlich / ganz klar“.',
        },
      ],
    },
    {
      id: 'de2-use-of-german',
      title: 'Teil 2. Sprachbausteine — Grammatik und Wortschatz (40 Punkte)',
      instructions:
        'Lösen Sie die Grammatik- und Wortschatzaufgaben (Aufgaben 11–20).',
      questions: [
        {
          id: 'dzi-dev2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Wählen Sie die richtige Form: „Trotz ___ starken Regens fand das Open-Air-Konzert wie geplant statt.“',
          options: ['dem', 'des', 'den', 'der'],
          correctIndex: 1,
          explanation: 'Die Präposition „trotz“ verlangt in der Standardsprache den Genitiv: trotz des starken Regens (maskulin Singular).',
        },
        {
          id: 'dzi-dev2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Wählen Sie die richtige Konjunktiv-II-Form der Vergangenheit: „Wenn wir früher losgefahren ___, hätten wir den Zug noch erreicht.“',
          options: ['wären', 'hätten', 'würden', 'sind'],
          correctIndex: 0,
          explanation: 'Das Verb „losfahren“ bildet das Perfekt/Plusquamperfekt mit „sein“ -> Konjunktiv II der Vergangenheit: „Wenn wir früher losgefahren wären...“',
        },
        {
          id: 'dzi-dev2-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Wählen Sie das passende Relativpronomen mit Präposition: „Das ist das Forschungsprojekt, ___ wir uns seit drei Monaten intensiv beschäftigen.“',
          options: ['mit dem', 'mit der', 'worüber', 'für den'],
          correctIndex: 0,
          explanation: '„sich beschäftigen mit + Dativ“; das Bezugswort „das Forschungsprojekt“ ist neutral -> „mit dem“.',
        },
        {
          id: 'dzi-dev2-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'Wählen Sie die richtige Passivform (Präteritum Passiv): „Die neue Universitätsbibliothek ___ im vergangenen Herbst feierlich ___.“',
          options: [
            'hat ... eröffnet',
            'wurde ... eröffnet',
            'ist ... eröffnen',
            'wird ... eröffnen',
          ],
          correctIndex: 1,
          explanation: 'Vorgangspassiv im Präteritum wird mit „wurde + Partizip II“ gebildet: „wurde ... eröffnet“.',
        },
        {
          id: 'dzi-dev2-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'Wählen Sie den richtigen Konnektor: „___ er ein Stipendium erhalten hatte, konnte er sein Masterstudium in Wien aufnehmen.“',
          options: ['Nachdem', 'Bevor', 'Trotzdem', 'Währenddessen'],
          correctIndex: 0,
          explanation: 'Für Vorzeitigkeit (Plusquamperfekt im Nebensatz -> Präteritum im Hauptsatz) verwendet man die temporale Konjunktion „Nachdem“.',
        },
        {
          id: 'dzi-dev2-q16', number: 16, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Ergänzen Sie die richtige Präposition (Rektion der Verben): „Alle Teilnehmerinnen und Teilnehmer freuen sich schon sehr ___ den bevorstehenden Schüleraustausch in München.“ (Zukunft)',
          acceptedAnswers: ['auf', 'Auf'],
          explanation: '„sich freuen auf + Akkusativ“ bezieht sich auf etwas Zukünftiges (während „sich freuen über“ für Gegenwärtiges/Vergangenes steht).',
        },
        {
          id: 'dzi-dev2-q17', number: 17, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Bilden Sie das passende Nomen (Substantiv im Nominativ Singular ohne Artikel) aus dem Verb in Klammern: „Die ___ (entscheiden) des Ausschusses wurde gestern bekannt gegeben.“',
          acceptedAnswers: ['Entscheidung'],
          explanation: 'Vom Verb „entscheiden“ wird das feminine Substantiv „(die) Entscheidung“ gebildet.',
        },
        {
          id: 'dzi-dev2-q18', number: 18, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Ergänzen Sie das zweiteilige Konjunktionen-Paar: „Er spricht ___ fließend Deutsch als auch sehr gut Englisch und Spanisch.“',
          acceptedAnswers: ['sowohl', 'Sowohl'],
          explanation: 'Die mehrteilige kopulative Konjunktion lautet „sowohl ... als auch“.',
        },
        {
          id: 'dzi-dev2-q19', number: 19, kind: 'multi', points: 5,
          prompt: 'Formen Sie die Sätze um, indem Sie das fehlende Wort ergänzen:',
          parts: [
            {
              id: 'a', label: 'A)', points: 2,
              prompt: 'Aktiv -> Passiv mit Modalverb: „Man muss das Formular bis Freitag unterschreiben.“ -> „Das Formular muss bis Freitag unterschrieben ___.“',
              answer: { type: 'text', acceptedAnswers: ['werden'] },
            },
            {
              id: 'b', label: 'B)', points: 3,
              prompt: 'Nebensatz mit „obwohl“ -> Präpositionalphrase mit „trotz“: „Obwohl das Wetter schlecht war“ -> „Trotz des schlechten ___ (Wetter im Genitiv Singular).“',
              answer: { type: 'text', acceptedAnswers: ['Wetters'] },
            },
          ],
          explanation: 'A) Passiv mit Modalverb: Modalverb + Partizip II + werden. B) Genitiv Singular von „das Wetter“ ist „des Wetters“.',
        },
        {
          id: 'dzi-dev2-q20', number: 20, kind: 'multi', points: 5,
          prompt: 'Ergänzen Sie die richtige Adjektivendung bzw. Konjunktion:',
          parts: [
            {
              id: 'a', label: 'A)', points: 2,
              prompt: 'Ergänzen Sie das Wort für den Finalsatz mit Infinitiv: „Sie fährt nach Berlin, ___ an einer internationalen Jugendkonferenz teilzunehmen.“',
              answer: { type: 'text', acceptedAnswers: ['um'] },
            },
            {
              id: 'b', label: 'B)', points: 3,
              prompt: 'Wie lautet das Partizip II des starken Verbs „empfehlen“? („Das Buch wurde uns vom Lehrer ___.“)',
              answer: { type: 'text', acceptedAnswers: ['empfohlen'] },
            },
          ],
          explanation: 'A) Finalsatz ohne eigenes Subjekt wird mit „um ... zu + Infinitiv“ gebildet. B) empfehlen – empfahl – empfohlen.',
        },
      ],
    },
    {
      id: 'de2-writing',
      title: 'Teil 3. Schriftlicher Ausdruck (30 Punkte)',
      instructions:
        'Bearbeiten Sie beide Schreibaufgaben (Aufgabe 21 — formeller Brief/E-Mail, 10 Punkte; Aufgabe 22 — argumentative Stellungnahme/Aufsatz, 20 Punkte).',
      questions: [
        {
          id: 'dzi-dev2-q21', number: 21, kind: 'open', points: 10,
          prompt: `Aufgabe 21 (Formelle E-Mail / Bewerbungsschreiben — 100 bis 130 Wörter):
Sie haben im Internet eine Anzeige der Technischen Universität München für ein zweiwöchiges internationales Sommercamp zum Thema „Nachhaltige Technologien und Künstliche Intelligenz“ gelesen. Schreiben Sie eine formelle E-Mail an das Organisationsteam, in der Sie:
1) Ihr Interesse an der Teilnahme begründen und kurz Ihre bisherigen Erfahrungen vorstellen;
2) nach den Bedingungen für ein Teilstipendium und der Unterkunft fragen;
3) um Informationen zum genauen Programmablauf und den erforderlichen Bewerbungsunterlagen bitten.`,
          criteria: [
            { label: 'Vollständige Erfüllung aller drei Inhaltspunkte und situationsangemessener Aufbau (Anrede, Einleitung, Hauptteil, Schlussformel)', points: 4 },
            { label: 'Register (formelles Siezen), Textkohärenz und passende Redemittel für formelle Korrespondenz', points: 3 },
            { label: 'Korrekte Grammatik, Wortschatz auf B2-Niveau und Rechtschreibung', points: 3 },
          ],
          modelAnswer: `Sehr geehrte Damen und Herren,

mit großem Interesse habe ich auf Ihrer Webseite die Ausschreibung für das internationale Sommercamp „Nachhaltige Technologien und Künstliche Intelligenz“ an der Technischen Universität München gelesen. Da ich in diesem Jahr mein Abitur mit Schwerpunkt Informatik und Physik ablege und bereits an mehreren nationalen Programmierwettbewerben erfolgreich teilgenommen habe, möchte ich mich hiermit um einen Platz bewerben.

Könnten Sie mir bitte mitteilen, unter welchen Voraussetzungen Schülerinnen und Schüler aus dem europäischen Ausland ein Teilstipendium beantragen können und wie die Unterbringung auf dem Campus organisiert ist?

Darüber hinaus wäre ich Ihnen sehr dankbar, wenn Sie mir das detaillierte Wochenprogramm sowie eine Übersicht über die einzureichenden Bewerbungsunterlagen zusenden könnten.

Für Ihre Mühe danke ich Ihnen im Voraus und freue mich auf Ihre Rückmeldung.

Mit freundlichen Grüßen
[Vorname Familienname]`,
        },
        {
          id: 'dzi-dev2-q22', number: 22, kind: 'open', points: 20,
          prompt: `Aufgabe 22 (Argumentativer Aufsatz / Erörterung — 200 bis 250 Wörter):
Thema: „Sollte ein freiwilliges soziales oder ökologisches Jahr nach dem Schulabschluss für alle Jugendlichen gefördert werden?“
Verfassen Sie einen strukturierten argumentativen Text:
1) Formulieren Sie eine Einleitung, die das Thema vorstellt;
2) Nennen und begründen Sie mindestens zwei Argumente DAFÜR (z. B. persönliche Reife, gesellschaftlicher Zusammenhalt, Berufsorientierung) und zwei Argumente DAGEGEN (z. B. späterer Studienbeginn, finanzielle Fragen);
3) Ziehen Sie ein überzeugendes Fazit mit Ihrer eigenen begründeten Meinung.`,
          criteria: [
            { label: 'Klare Gliederung (Einleitung, Pro- und Contra-Argumentation mit Beispielen, eigene Schlussfolgerung)', points: 7 },
            { label: 'Logische Verknüpfung der Argumente durch B2-Konnektoren (einerseits/andererseits, darüber hinaus, dennoch, folglich)', points: 7 },
            { label: 'Sprachliche Richtigkeit (komplexe Satzstrukturen, treffender Wortschatz, Orthografie und Interpunktion)', points: 6 },
          ],
          modelAnswer: `Der Übergang von der Schule in das Studium oder Berufsleben stellt für viele junge Menschen einen entscheidenden Wendepunkt dar. In diesem Zusammenhang wird häufig diskutiert, ob ein freiwilliges soziales oder ökologisches Jahr (FSJ/FÖJ) nach dem Abitur stärker gefördert werden sollte.

Auf der einen Seite sprechen zahlreiche überzeugende Gründe für ein solches Engagement. Erstens gewinnen Jugendliche wertvolle praktische Erfahrungen in Krankenhäusern, Kultureinrichtungen oder im Naturschutz, was ihre persönliche Reife und soziale Kompetenz stärkt. Zweitens dient dieses Jahr als hervorragende Orientierungshilfe bei der Studien- und Berufswahl, sodass spätere Studienabbrüche vermieden werden können. Darüber hinaus leistet der Freiwilligendienst einen unverzichtbaren Beitrag zum gesellschaftlichen Zusammenhalt.

Auf der anderen Seite gibt es jedoch auch Bedenken. Kritiker weisen darauf hin, dass junge Erwachsene dadurch ein Jahr später ins Erwerbsleben eintreten. Zudem reicht das gezahlte Taschengeld in Großstädten oft nicht aus, um die Lebenshaltungskosten ohne finanzielle Unterstützung der Eltern zu decken.

Meiner Ansicht nach überwiegen die Vorteile eines freiwilligen Jahres deutlich, sofern es freiwillig bleibt und vom Staat durch ein angemessenes Stipendium sowie kostenlose Nutzung öffentlicher Verkehrsmittel unterstützt wird. So profitieren sowohl die Persönlichkeitsentwicklung der Jugendlichen als auch die gesamte Gesellschaft.`,
        },
      ],
    },
  ],
};

export const DZI_ENTR_PRACTICE_2: ExamPaper = {
  id: 'practice-dzi-entr-2',
  title: 'Предприемачество (профилирана подготовка) — Втори ДЗИ, тренировъчен вариант 2',
  exam: 'ДЗИ',
  subject: 'Предприемачество',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  formulaSheet: 'dzi-geography-econ',
  note:
    'Втори тренировъчен вариант за Втори ДЗИ по предприемачество (профилирана подготовка — 11. и 12. клас). Включва 15 задачи с избираем отговор (45 т.), 5 финансово-икономически задачи с кратък отговор (25 т.) и 2 практически бизнес казуса със свободен отговор (30 т.).',
  sections: [
    {
      id: 'entr2-part1',
      title: 'Част 1. Задачи с избираем отговор (45 т.)',
      instructions: 'Изберете един верен отговор. Всяка задача носи 3 точки.',
      questions: [
        {
          id: 'dzi-entrv2-q1', number: 1, kind: 'choice', points: 3,
          prompt: 'Кой от деветте градивни блока на Бизнес модел канавата (Business Model Canvas на Ал. Остервалдер) описва уникалния пакет от продукти и услуги, който решава конкретен проблем или удовлетворява потребност на определен клиентски сегмент?',
          options: [
            'Структура на разходите (Cost Structure)',
            'Стойностно предложение (Value Proposition)',
            'Ключови партньорства (Key Partnerships)',
            'Потоци от приходи (Revenue Streams)',
          ],
          correctIndex: 1,
          explanation: 'Стойностното предложение (Value Proposition) е централният елемент на Business Model Canvas — причината, поради която клиентите избират дадена компания пред конкурентите.',
        },
        {
          id: 'dzi-entrv2-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'В методологията Lean Startup (Ерик Рийс) каква е основната цел на минимално жизнеспособния продукт (MVP — Minimum Viable Product)?',
          options: [
            'Пускане на напълно завършен продукт след 5 години разработка без обратна връзка от пазара',
            'Тестване на ключовите бизнес хипотези с реални потребители при минимален разход на време и ресурси чрез цикъла „Създай – Измери – Научи“ (Build – Measure – Learn)',
            'Съкращаване на всички служители в отдел „Продажби“',
            'Избягване на всякаква комуникация с потенциалните клиенти',
          ],
          correctIndex: 1,
          explanation: 'MVP съдържа само основната функционалност, необходима за валидиране на стойностната хипотеза сред ранните потребители (early adopters) и вземане на решение за развитие или пивот (pivot).',
        },
        {
          id: 'dzi-entrv2-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'Според Търговския закон в Република България коя правна форма на търговско дружество е капиталово дружество, чийто капитал е разделен на дялове, а съдружниците отговарят за задълженията на дружеството до размера на дяловата си вноска?',
          options: [
            'Едноличен търговец (ЕТ)',
            'Събирателно дружество (СД)',
            'Дружество с ограничена отговорност (ООД / ЕООД)',
            'Гражданско дружество по ЗЗД',
          ],
          correctIndex: 2,
          explanation: 'ООД (и ЕООД) е капиталово търговско дружество с ограничена отговорност на съдружниците до размера на записания им дял в капитала (за разлика от ЕТ и неограничено отговорните съдружници в СД).',
        },
        {
          id: 'dzi-entrv2-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Какъв инструмент за анализ на макросредата на бизнеса изследва Политическите, Икономическите, Социално-демографските, Технологичните, Екологичните и Правните фактори?',
          options: [
            'PESTEL (PESTLE) анализ',
            'BCG матрица',
            'Диаграма на Гант',
            'Линейна амортизационна квота',
          ],
          correctIndex: 0,
          explanation: 'PESTEL е акроним от Political, Economic, Social, Technological, Environmental и Legal фактори на външната макросреда.',
        },
        {
          id: 'dzi-entrv2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'В матрицата на Бостънската консултантска група (BCG матрица) как се наричат продуктите или бизнес единиците с ВИСОК пазарен дял на зрял пазар с НИСЪК темп на растеж, които генерират стабилен положителен паричен поток?',
          options: [
            '„Въпросителни“ (Question Marks)',
            '„Звезди“ (Stars)',
            '„Дойни крави“ (Cash Cows)',
            '„Кучета“ (Dogs)',
          ],
          correctIndex: 2,
          explanation: '„Дойните крави“ (Cash Cows) имат висок относителен пазарен дял в бавно растящ (зрял) отрасъл и осигуряват свободен паричен ресурс за финансиране на „Звездите“ и перспективните „Въпросителни“.',
        },
        {
          id: 'dzi-entrv2-q6', number: 6, kind: 'choice', points: 3,
          prompt: 'Каква ценова стратегия прилага иновативна технологична компания, която пуска нов уникален продукт на пазара на възможно най-висока първоначална цена с цел бързо възвръщане на разходите за научноизследователска дейност (R&D), след което постепенно понижава цената?',
          options: [
            'Стратегия на „обиране на каймака“ (Price Skimming)',
            'Стратегия на пазарно проникване чрез ниска цена (Penetration Pricing)',
            'Дъмпингово ценообразуване под себестойността',
            'Ценообразуване само по променливи разходи',
          ],
          correctIndex: 0,
          explanation: 'Стратегията „обиране на каймака“ (Price Skimming) стартира с висока цена за сегмента от иноватори, готови да платят повече за новостта, и впоследствие разширява пазара чрез поетапно намаляване.',
        },
        {
          id: 'dzi-entrv2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Кой вид финансиране на стартиращо предприятие (start-up) се осъществява от заможни физически лица с предприемачески опит, които инвестират собствени средства на ранен етап срещу миноритарен дялов капитал и предоставят менторство и контакти?',
          options: [
            'Банков ипотечен кредит',
            'Бизнес ангели (Business Angels)',
            'Факторинг на вземания',
            'Държавна субсидия за земеделски земи',
          ],
          correctIndex: 1,
          explanation: 'Бизнес ангелите инвестират личен капитал в стартиращи компании на фаза „семе“ (seed) / ранно развитие, като предоставят т.нар. „умен капитал“ (smart money — финансиране + ноу-хау и мрежа от контакти).',
        },
        {
          id: 'dzi-entrv2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Кой финансов отчет представя имущественото и финансовото състояние на предприятието към конкретен момент (дата) чрез съпоставяне на Активите от една страна и Собствения капитал и Пасивите (задълженията) от друга?',
          options: [
            'Счетоводен баланс (Отчет за финансовото състояние)',
            'Отчет за приходите и разходите (ОПР)',
            'Отчет за паричните потоци',
            'Амортизационен план',
          ],
          correctIndex: 0,
          explanation: 'Счетоводният баланс отразява равенството $\\text{Активи} = \\text{Собствен капитал} + \\text{Пасиви (Задължения)}$ към определена дата.',
        },
        {
          id: 'dzi-entrv2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Кои от изброените разходи на производствено предприятие са ПОСТОЯННИ (фиксирани) разходи в краткосрочен период?',
          options: [
            'Разходите за основни суровини и материали за всяка бройка продукт',
            'Месечният наем на производственото хале и застраховката на сградата',
            'Сделната заплата на работниците за всяка изработена единица',
            'Опаковките за всяка продадена стока',
          ],
          correctIndex: 1,
          explanation: 'Постоянните разходи ($FC$) не зависят от обема на производството $Q$ в краткосрочен план (наем, амортизации по линеен метод, абонаментна охрана, застраховки).',
        },
        {
          id: 'dzi-entrv2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Каква е разликата между счетоводната печалба и паричния поток (Cash Flow) на едно предприятие през даден месец?',
          options: [
            'Няма никаква разлика — печалбата винаги е равна на наличните пари в касата',
            'Печалбата се изчислява на база признати приходи и разходи (принцип на текущото начисляване), докато паричният поток отразява реално постъпилите и реално изплатените парични средства',
            'Паричният поток не включва плащанията към доставчици',
            'Амортизацията представлява реален паричен разход в брой всеки месец',
          ],
          correctIndex: 1,
          explanation: 'Едно предприятие може да отчита счетоводна печалба (при фактурирани продажби с отложено плащане), но да изпадне в ликвидна криза при отрицателен нетен паричен поток.',
        },
        {
          id: 'dzi-entrv2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'По кое правило в рамките на SMART критериите се формулират ефективните управленски и маркетингови цели?',
          options: [
            'Специфични (Specific), Измерими (Measurable), Достижими (Achievable), Релевантни (Relevant) и Обвързани със срок (Time-bound)',
            'Тайни, абстрактни и без краен срок',
            'Само финансови цели без количествен показател',
            'Цели, формулирани единствено от външни одитори',
          ],
          correctIndex: 0,
          explanation: 'Моделът SMART гарантира яснота, измеримост чрез KPI и конкретна времева рамка за контрол на изпълнението.',
        },
        {
          id: 'dzi-entrv2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Според теорията на Фредерик Херцберг за двуфакторната мотивация (хигиенни фактори и мотиватори) кой от следните елементи е истински МОТИВАТОР, водещ до висока удовлетвореност и ангажираност в работата?',
          options: [
            'Отоплението и осветлението в офиса',
            'Постиженията, признанието, отговорността и възможността за професионално израстване',
            'Липсата на глоби за закъснение',
            'Служебният паркинг',
          ],
          correctIndex: 1,
          explanation: 'Според Херцберг хигиенните фактори (условия на труд, базова заплата, сигурност) само предотвратяват неудовлетвореността, докато същинските мотиватори са постиженията, признанието, интересната работа и развитието.',
        },
        {
          id: 'dzi-entrv2-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Какъв обект на индустриална собственост защитава отличителния знак (име, лого, слоган), с който едно предприятие обозначава своите стоки или услуги и ги разграничава от тези на конкурентите?',
          options: [
            'Търговска марка (Trademark — ® / ™)',
            'Патент за биотехнологично изобретение',
            'Сертификат за безопасност на труда',
            'Трудов договор',
          ],
          correctIndex: 0,
          explanation: 'Търговската марка (регламентирана в Закона за марките и географските означения) защитава бранда и отличителните знаци на бизнеса (със срок на закрила 10 години, който може да се подновява неограничено).',
        },
        {
          id: 'dzi-entrv2-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'Как се нарича концепцията, при която предприятието доброволно интегрира социални, екологични и етични ангажименти в своята бизнес дейност и във взаимоотношенията си със заинтересованите страни (stakeholders)?',
          options: [
            'Корпоративна социална отговорност (КСО / CSR) и ESG устойчивост',
            'Монополно картелно споразумение',
            'Агресивна данъчна оптимизация',
            'Ликвидация на дружеството',
          ],
          correctIndex: 0,
          explanation: 'Корпоративната социална отговорност (КСО) и критериите ESG (Environmental, Social, Governance) съчетават икономическата ефективност с грижа за околната среда, служителите и обществото.',
        },
        {
          id: 'dzi-entrv2-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'В дигиталния маркетинг и електронната търговия какво измерва показателят CAC (Customer Acquisition Cost)?',
          options: [
            'Средния разход за маркетинг и продажби за привличане на един нов клиент',
            'Годишния размер на корпоративния данък',
            'Амортизацията на сървърното оборудване',
            'Броя на служителите в отдел „Счетоводство“',
          ],
          correctIndex: 0,
          explanation: t`$\text{CAC}$ се изчислява като общите разходи за маркетинг и продажби през периода се разделят на броя на новопривлечените клиенти; за устойчив бизнес модел жизненият приход от клиента ($\text{LTV}$) трябва да е значително по-висок от $\text{CAC}$ (напр. $\text{LTV} / \text{CAC} \ge 3$).`,
        },
      ],
    },
    {
      id: 'entr2-part2',
      title: 'Част 2. Финансово-икономически задачи с кратък отговор (25 т.)',
      instructions: 'Запишете точния числов отговор към всяка задача и подточка. Ползвайте формулите от бутона „Формули“.',
      questions: [
        {
          id: 'dzi-entrv2-q16', number: 16, kind: 'short', answerType: 'number', points: 4,
          prompt: t`Предприятие има месечни постоянни разходи $FC = 18\,000\text{ лв.}$, променливи разходи за единица изделие $AVC = 25\text{ лв.}$ и продажна цена без ДДС $P = 55\text{ лв.}$ Пресметнете критичния обем на продажбите (точката на безубиточност $Q_{\text{BEP}}$) в брой изделия.`,
          acceptedAnswers: ['600'],
          explanation: t`$Q_{\text{BEP}} = \dfrac{FC}{P - AVC} = \dfrac{18\,000}{55 - 25} = \dfrac{18\,000}{30} = 600$ изделия.`,
        },
        {
          id: 'dzi-entrv2-q17', number: 17, kind: 'short', answerType: 'number', points: 5,
          prompt: t`Предприемач инвестира $I_0 = 80\,000\text{ лв.}$ в нова производствена линия, която носи нетна годишна печалба $\Pi = 20\,000\text{ лв.}$ Пресметнете възвръщаемостта на инвестицията ($\text{ROI}$) за една година (в проценти, %).`,
          acceptedAnswers: ['25'],
          explanation: t`$\text{ROI} = \dfrac{\Pi}{I_0} \cdot 100\% = \dfrac{20\,000}{80\,000} \cdot 100\% = 25\%$.`,
        },
        {
          id: 'dzi-entrv2-q18', number: 18, kind: 'short', answerType: 'number', points: 5,
          prompt: t`Търговско дружество притежава краткотрайни (текущи) активи на стойност $CA = 90\,000\text{ лв.}$ и краткосрочни (текущи) задължения $CL = 45\,000\text{ лв.}$ Пресметнете коефициента на обща ликвидност ($K_{\text{ол}} = \dfrac{CA}{CL}$).`,
          acceptedAnswers: ['2', '2,0', '2.0'],
          explanation: t`$K_{\text{ол}} = \dfrac{90\,000}{45\,000} = 2{,}0$ (оптимална ликвидност за покриване на текущите задължения).`,
        },
        {
          id: 'dzi-entrv2-q19', number: 19, kind: 'multi', points: 5,
          prompt: t`Производствена фирма реализира годишни приходи от продажби $TR = 250\,000\text{ лв.}$ и общи разходи за дейността $TC = 200\,000\text{ лв.}$ Ставката на корпоративния данък по ЗКПО в България е $10\%$.`,
          parts: [
            {
              id: 'a', label: 'А)', points: 2,
              prompt: 'Пресметнете счетоводната (брутната) печалба преди данъци (в лв.).',
              answer: { type: 'number', acceptedAnswers: ['50000', '50 000'], unit: 'лв.' },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: 'Пресметнете нетната печалба след облагане с $10\\%$ корпоративен данък (в лв.).',
              answer: { type: 'number', acceptedAnswers: ['45000', '45 000'], unit: 'лв.' },
            },
          ],
          explanation: t`А) Брутна печалба $= TR - TC = 250\,000 - 200\,000 = 50\,000\text{ лв.}$
Б) Корпоративен данък $= 10\% \cdot 50\,000 = 5000\text{ лв.}$; Нетна печалба $= 50\,000 - 5000 = 45\,000\text{ лв.}$`,
        },
        {
          id: 'dzi-entrv2-q20', number: 20, kind: 'multi', points: 6,
          prompt: t`Стартъп компания изразходва през месеца $6000\text{ лв.}$ за дигитална реклама и продажби, в резултат на което привлича $120$ нови плащащи клиенти. Всеки клиент носи средна брутна печалба през целия период на ползване на услугата $\text{LTV} = 200\text{ лв.}$`,
          parts: [
            {
              id: 'a', label: 'А)', points: 3,
              prompt: t`Пресметнете разхода за привличане на един клиент ($\text{CAC}$, в лв.).`,
              answer: { type: 'number', acceptedAnswers: ['50'], unit: 'лв.' },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: t`Пресметнете съотношението $\text{LTV} / \text{CAC}$.`,
              answer: { type: 'number', acceptedAnswers: ['4', '4,0', '4.0'] },
            },
          ],
          explanation: t`А) $\text{CAC} = \dfrac{6000\text{ лв.}}{120\text{ клиенти}} = 50\text{ лв.}$
Б) $\dfrac{\text{LTV}}{\text{CAC}} = \dfrac{200}{50} = 4$ (отличен показател за устойчивост на модела).`,
        },
      ],
    },
    {
      id: 'entr2-part3',
      title: 'Част 3. Практически бизнес казуси със свободен отговор (30 т.)',
      instructions: 'Разработете пълните бизнес анализи и финансови разчети. Оценете се по критериите след предаване.',
      questions: [
        {
          id: 'dzi-entrv2-q21', number: 21, kind: 'open', points: 15,
          prompt: `Бизнес модел, SWOT анализ и маркетингова стратегия на социално/зелено предприятие:
Млад екип от инженери и дизайнери планира да създаде в България компания („ЕкоПак ООД“) за производство на биоразградими опаковки за хранителната индустрия и ресторантите от пресовани слънчогледови люспи и слама (отпадъчен биоресурс от българското земеделие).
А) Изберете и обосновете най-подходящата правна форма на предприятието и разработете ключовите елементи на Business Model Canvas (Клиентски сегменти — B2B/B2C, Стойностно предложение, Канали за дистрибуция, Ключови ресурси и Потоци от приходи).
Б) Съставете пълен SWOT анализ (поне по 3 силни страни, слаби страни, възможности и заплахи) за стартирането на „ЕкоПак ООД“.
В) Предложете интегриран маркетинг микс (4P) и стратегия за финансиране на първоначалната инвестиция (европейски фондове за кръгова икономика, бизнес ангели, банков зелен кредит).`,
          criteria: [
            { label: 'А) Обоснован избор на правна форма (ООД) и структурирани 5 ключови блока от Business Model Canvas', points: 5 },
            { label: 'Б) Конкретен и реалистичен SWOT анализ с ясно разграничение между вътрешни (S, W) и външни (O, T) фактори', points: 5 },
            { label: 'В) Последователен маркетинг микс (Продукт, Цена, Дистрибуция, Промоция) и обоснован план за начално финансиране', points: 5 },
          ],
          modelAnswer: `А) Правна форма и Бизнес модел канава (Business Model Canvas):
– **Правна форма:** Дружество с ограничена отговорност (ООД), тъй като обединява няколко съдружници с взаимодопълваща се експертиза, ограничава финансовия им риск до размера на дяловете им и позволява лесно привличане на дялов инвеститор.
– **Клиентски сегменти (B2B):** Вериги за бързо хранене и кетъринг, ресторанти с доставка, биомагазини, производители на плодове, зеленчуци и сладкарски изделия.
– **Стойностно предложение:** 100% компостируеми и водоустойчиви опаковки с нулев пластмасов отпечатък, отговарящи на европейската директива срещу еднократната пластмаса, с възможност за брандиране на клиента.
– **Канали:** Директни B2B продажби чрез търговски представители, онлайн B2B платформа за абонаментни доставки и дистрибутори на ХоРеКа консумативи.
– **Ключови ресурси и партньори:** Дългосрочни договори със земеделски кооперации и маслобойни за суровина, термопресоващи машини, патентована рецептура.
– **Потоци от приходи:** Продажби на едро по редовни месечни абонаментни договори и персонализирани серии опаковки.

Б) SWOT анализ:
– **Силни страни (S):** Използване на евтина местна отпадъчна биомаса; екологичен и сертифициран продукт; гъвкаво локално производство без дълги транспортни вериги.
– **Слаби страни (W):** Висока първоначална капиталова инвестиция в машини; липса на разпознаваемост на новата марка; по-висока единична себестойност спрямо конвенционалния картон в началния етап.
– **Възможности (O):** Законови ограничения на ЕС върху еднократните пластмаси; растящо търсене на ESG-съобразни доставки; достъп до безвъзмездни програми за кръгова икономика и зелен преход.
– **Заплахи (T):** Силна ценова конкуренция от вносни опаковки от Азия; колебания в цените на електроенергията; забавяне в ХоРеКа сектора при икономически спад.

В) Маркетинг микс (4P) и финансиране:
– **Продукт:** Термоустойчиви кутии, чинии и чаши с биопокритие и гравирано лого.
– **Цена:** Конкурентно ценообразуване спрямо вносните био-опаковки с отстъпки за обем и годишен абонамент.
– **Място (Дистрибуция):** Собствен онлайн B2B портал и логистични партньори в София, Пловдив, Варна и Бургас.
– **Промоция:** Мострени комплекти за ресторанти, участие в изложения (SIHRE, Агра), B2B маркетинг в LinkedIn и PR кампании за нулев отпадък.
– **Финансиране:** Комбинация от 30% собствен капитал + грантово финансиране по програма „Конкурентоспособност и иновации в предприятията“ (кръгова икономика) + инвестиция от фонд за рисков капитал / бизнес ангел.`,
        },
        {
          id: 'dzi-entrv2-q22', number: 22, kind: 'open', points: 15,
          prompt: t`Финансово-икономическа обосновка на инвестиционен проект:
Предприятие планира закупуване на автоматизирана поточна линия на цена на придобиване $I_0 = 120\,000\text{ лв.}$ с полезен срок на годност $5\text{ години}$ при линеен метод на амортизация (остатъчна стойност $0\text{ лв.}$).
С новата линия предприятието ще произвежда и продава по $Q = 10\,000\text{ изделия годишно}$ при продажна цена $P = 18\text{ лв./бр.}$ Променливите разходи за единица изделие са $AVC = 10\text{ лв./бр.}$, а годишните постоянни парични разходи (заплати за поддръжка, наем, застраховка — без амортизацията) са $FC_{\text{парични}} = 26\,000\text{ лв.}$ Корпоративният данък е $10\%$.
А) Пресметнете годишната амортизационна норма (в %) и годишната амортизационна квота $A$ (в лв.), както и общите годишни постоянни разходи $FC_{\text{общо}} = FC_{\text{парични}} + A$.
Б) Пресметнете годишните приходи от продажби $TR$, годишната счетоводна печалба преди данъци, нетната печалба след $10\%$ данък и нетния годишен паричен поток ($\text{NCF} = \text{Нетна печалба} + \text{Амортизация}$).
В) Намерете срока на откупуване на инвестицията ($\text{Payback Period} = \dfrac{I_0}{\text{NCF}}$) в години и оценете икономическата целесъобразност на проекта при полезен живот на машината от $5\text{ години}$.`,
          criteria: [
            { label: t`А) Вярно пресметнати годишна норма на амортизация $20\%$, годишна квота $A = 24\,000\text{ лв.}$ и общи постоянни разходи $FC_{\text{общо}} = 50\,000\text{ лв.}$`, points: 5 },
            { label: t`Б) Вярно пресметнати $TR = 180\,000\text{ лв.}$, променливи разходи $VC = 100\,000\text{ лв.}$, брутна печалба $30\,000\text{ лв.}$, нетна печалба $27\,000\text{ лв.}$ и нетен паричен поток $\text{NCF} = 51\,000\text{ лв.}$`, points: 6 },
            { label: t`В) Вярно пресметнат срок на откупуване $PP = \dfrac{120\,000}{51\,000} \approx 2{,}35\text{ години}$ и аргументирано положително инвестиционно решение`, points: 4 },
          ],
          modelAnswer: t`А) Амортизация и постоянни разходи:
– Годишна норма на амортизация при линеен метод за $n = 5$ години:
$$N_A = \frac{100\%}{5} = 20\%$$
– Годишна амортизационна квота:
$$A = 120\,000\text{ лв.} \cdot 20\% = 24\,000\text{ лв./год.}$$
– Общи годишни постоянни разходи (с включена амортизация):
$$FC_{\text{общо}} = FC_{\text{парични}} + A = 26\,000 + 24\,000 = 50\,000\text{ лв./год.}$$

Б) Приходи, печалба и нетен паричен поток:
– Годишни приходи от продажби:
$$TR = P \cdot Q = 18\text{ лв.} \cdot 10\,000\text{ бр.} = 180\,000\text{ лв.}$$
– Годишни променливи разходи:
$$VC = AVC \cdot Q = 10\text{ лв.} \cdot 10\,000\text{ бр.} = 100\,000\text{ лв.}$$
– Общи годишни разходи:
$$TC = VC + FC_{\text{общо}} = 100\,000 + 50\,000 = 150\,000\text{ лв.}$$
– Счетоводна печалба преди данъци ($\text{EBT}$):
$$\Pi_{\text{брутна}} = TR - TC = 180\,000 - 150\,000 = 30\,000\text{ лв.}$$
– Корпоративен данък ($10\%$): $3000\text{ лв.}$
– Нетна печалба след данъци:
$$\Pi_{\text{нетна}} = 30\,000 - 3000 = 27\,000\text{ лв.}$$
– Тъй като амортизацията е непаричен разход, нетният годишен паричен поток от оперативна дейност е:
$$\text{NCF} = \Pi_{\text{нетна}} + A = 27\,000 + 24\,000 = 51\,000\text{ лв./год.}$$

В) Срок на откупуване и оценка на проекта:
$$\text{Payback Period (PP)} = \frac{I_0}{\text{NCF}} = \frac{120\,000\text{ лв.}}{51\,000\text{ лв./год.}} \approx 2{,}35\text{ години (около 2 години и 4 месеца)}$$
Тъй като срокът на откупуване ($2{,}35\text{ г.}$) е повече от два пъти по-кратък от полезния живот на линията ($5\text{ г.}$), а годишната рентабилност на инвестицията е висока, инвестиционният проект е икономически целесъобразен и следва да бъде приет.`,
        },
      ],
    },
  ],
};

export const DZI_ARTS_PRACTICE_2: ExamPaper = {
  id: 'practice-dzi-arts-2',
  title: 'Изобразително изкуство (профилирана подготовка) — Втори ДЗИ, тренировъчен вариант 2',
  exam: 'ДЗИ',
  subject: 'Изобразително изкуство',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Втори тренировъчен вариант за Втори ДЗИ по изобразително изкуство (профилирана подготовка — 11. и 12. клас). Включва 15 задачи с избираем отговор (45 т.), 5 задачи с кратък отговор (25 т.) и 2 теоретико-практически задачи (30 т.).',
  sections: [
    {
      id: 'arts2-part1',
      title: 'Част 1. Задачи с избираем отговор (45 т.)',
      instructions: 'Изберете един верен отговор. Всяка задача носи 3 точки.',
      questions: [
        {
          id: 'dzi-artsv2-q1', number: 1, kind: 'choice', points: 3,
          prompt: 'Кой древногръцки скулптор от Класическата епоха (V в. пр.Хр.) е автор на статуята „Дорифор“ (Копиеносец) и теоретичния трактат „Канон“ за идеалните пропорции на човешкото тяло?',
          options: ['Фидий', 'Поликлет', 'Праксител', 'Лизип'],
          correctIndex: 1,
          explanation: 'Поликлет от Аргос създава скулптурата „Дорифор“ (с класически контрапост) и трактата „Канон“, в който главата се отнася към височината на тялото като 1:7.',
        },
        {
          id: 'dzi-artsv2-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Кой от изброените паметници на средновековната българска живопис под закрилата на ЮНЕСКО съдържа стенописи от 1259 г. с реалистичните ктиторски портрети на севастократор Калоян и деспина Десислава?',
          options: [
            'Казанлъшката гробница',
            'Боянската църква „Св. св. Никола и Пантелеймон“',
            'Скални църкви при с. Иваново',
            'Земенският манастир',
          ],
          correctIndex: 1,
          explanation: 'Вторият живописен слой на Боянската църква от 1259 г., дело на Боянския майстор, е шедьовър на Палеологовия ренесанс и средновековната европейска портретна живопис.',
        },
        {
          id: 'dzi-artsv2-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'Кой италиански архитект и скулптор от Ранния ренесанс (Куатроченто) проектира купола на катедралата „Санта Мария дел Фиоре“ във Флоренция и формулира законите на линейната централна перспектива?',
          options: [
            'Лоренцо Гиберти',
            'Филипо Брунелески',
            'Сандро Ботичели',
            'Джото ди Бондоне',
          ],
          correctIndex: 1,
          explanation: 'Филипо Брунелески (1377–1446) изгражда осмоъгълния купол на Флорентинската катедрала и открива геометричния метод на линейната перспектива с обежна точка.',
        },
        {
          id: 'dzi-artsv2-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Кой живописен похват, доведен до съвършенство от Леонардо да Винчи („Мона Лиза“, „Света Анна с Мадоната и Младенеца“), се състои в меко, димно преливане на очертанията и светлосянката без резки контури?',
          options: ['Сфумато', 'Дивизионизъм (поантилизъм)', 'Импасто', 'Колаж'],
          correctIndex: 0,
          explanation: 'Сфумато (от итал. sfumato — задимен, изчезващ като дим) е техника за фино тонално и въздушно омекотяване на контурите.',
        },
        {
          id: 'dzi-artsv2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'Кой италиански художник от епохата на Барока въвежда драматичния контраст между ярка насочена светлина и дълбок тъмен фон (тенебризъм / киароскуро) в картини като „Призоваването на св. Матей“?',
          options: [
            'Караваджо (Микеланджело Меризи да Караваджо)',
            'Рафаело Санцио',
            'Пиеро дела Франческа',
            'Жан-Огюст Доминик Енгър',
          ],
          correctIndex: 0,
          explanation: 'Караваджо революционизира бароковата живопис чрез натурализъм и силен светлосенъчен контраст (тенебризъм), оказвайки влияние върху Рембранд, Веласкес и Рубенс.',
        },
        {
          id: 'dzi-artsv2-q6', number: 6, kind: 'choice', points: 3,
          prompt: 'Картината на Клод Моне „Импресия, изгряващо слънце“ (1872 г.), дала името на направлението импресионизъм, се отличава с:',
          options: [
            'Пленерно улавяне на мимолетните светлинни и атмосферни трептения чрез чисти цветни мазки без черен контур',
            'Строга геометрична симетрия и тъмен музеен колорит',
            'Абстрактна геометрична композиция от квадрати',
            'Скулптурна анатомична моделировка в ателие',
          ],
          correctIndex: 0,
          explanation: 'Импресионистите (Моне, Реноар, Писаро, Сисле, Дега) работят на открито (пленер), разлагат тоновете на чисти спектрални мазки и изобразяват променливата светлина и цветните рефлекси.',
        },
        {
          id: 'dzi-artsv2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Кои двама художници през 1907–1914 г. в Париж създават модернистичното направление кубизъм (аналитичен и синтетичен кубизъм)?',
          options: [
            'Пабло Пикасо и Жорж Брак',
            'Салвадор Дали и Рене Магрит',
            'Анри Матис и Андре Дерен',
            'Едвард Мунк и Густав Климт',
          ],
          correctIndex: 0,
          explanation: 'Пабло Пикасо („Госпожиците от Авиньон“) и Жорж Брак поставя основите на кубизма, разлагайки формите на геометрични фасети, показани едновременно от различни гледни точки.',
        },
        {
          id: 'dzi-artsv2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Коя прочута германска висша школа за архитектура, индустриален дизайн и приложни изкуства, основана от Валтер Гропиус през 1919 г. във Ваймар, издига принципа „Формата следва функцията“ (функционализъм)?',
          options: ['Баухаус (Bauhaus)', 'Академия „Св. Лука“', 'Барбизонската школа', 'Прерафаелитското братство'],
          correctIndex: 0,
          explanation: 'Школата „Баухаус“ (Валтер Гропиус, Лудвиг Мис ван дер Рое, Василий Кандински, Паул Клее) обединява изкуството, занаята и индустриалните технологии и поставя основите на модерния графичен и промишлен дизайн.',
        },
        {
          id: 'dzi-artsv2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Кой български възрожденски художник, получил академично образование във Виена, е основоположник на светската портретна и историческа живопис и на литографията в България („Автопортрет“, портрети на Васил Левски и Стефан Караджа)?',
          options: [
            'Георги Данчов – Зографина',
            'Станислав Доспевски',
            'Захарий Зограф',
            'Тома Вишанов – Молера',
          ],
          correctIndex: 1,
          explanation: 'Станислав Доспевски (както и Николай Павлович и Христо Цокев) е водещ академично образован възрожденски живописец; Георги Данчов също е виден портретист и литограф на Левски, но Станислав Доспевски (Петербургска академия) и Николай Павлович (Виена и Мюнхен) поставят основите на академичната светска живопис.',
        },
        {
          id: 'dzi-artsv2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Кой български художник от движението „Родно изкуство“ през 20-те и 30-те години на XX век създава шедьоврите „Жетвар“, „Сватба“, „Земя“ и „Ахинора“?',
          options: [
            'Владимир Димитров – Майстора',
            'Иван Милев',
            'Ярослав Вешин',
            'Иван Мърквичка',
          ],
          correctIndex: 1,
          explanation: 'Иван Милев (1897–1927) съчетава българския фолклор и иконописна традиция със стилистиката на сецесиона и експресионизма в „Ахинора“, „Крали Марко“, „Сватба“ и стенописите за паметника на Шипка.',
        },
        {
          id: 'dzi-artsv2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'В теорията на цвета кои двойки цветове се наричат ДОПЪЛНИТЕЛНИ (комплементарни) и лежат един срещу друг в класическия 12-частен цветен кръг на Йоханес Итен?',
          options: [
            'Червен и зелен; син и оранжев; жълт и виолетов',
            'Жълт и зелен; син и виолетов',
            'Бял и сив; черен и кафяв',
            'Червен и оранжев; жълт и охра',
          ],
          correctIndex: 0,
          explanation: 'Допълнителните (контрастните) цветови двойки стоят диаметрално противоположно в цветния кръг (основен цвят срещу сместа на другите два основни цвята) и при съпоставяне взаимно усилват яркостта си.',
        },
        {
          id: 'dzi-artsv2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Коя графична техника принадлежи към ВИСОКИЯ ПЕЧАТ, при който печатащите елементи са изпъкнали, а непечатащите се изрязват с длета върху дървена плоча или линолеум?',
          options: [
            'Офорт и суха игла',
            'Ксилография (дърворез) и линогравюра',
            'Литография (камъкопечат)',
            'Ситопечат (сериграфия)',
          ],
          correctIndex: 1,
          explanation: 'Ксилографията (гравюра на дърво) и линогравюрата са класически техники на високия печат, докато офортът и акватинтата са дълбок печат, а литографията е плосък печат.',
        },
        {
          id: 'dzi-artsv2-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'В скулптурата как се нарича висок релеф, при който фигурите изпъкват от фона с повече от половината от своя реален обем и на места се отделят напълно от плоскостта?',
          options: ['Барелеф (нисък релеф)', 'Орелеф (висок релеф)', 'Контрарелеф (вдлъбнат релеф)', 'Мозайка'],
          correctIndex: 1,
          explanation: 'Орелефът (от фр. haut-relief — висок релеф) изпъква с над 50% от обема на формите спрямо фоновата равнина.',
        },
        {
          id: 'dzi-artsv2-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'В графичния дизайн и типографията как се наричат малките напречни завършващи щрихи в краищата на основните греди на буквите при класическите антиква шрифтове (като Times New Roman, Garamond, Bodoni)?',
          options: ['Серифи (serifs)', 'Пиксели', 'Кернинг', 'Интерлиния'],
          correctIndex: 0,
          explanation: 'Серифите са фините крайни засечки на буквените хасти при серифните (антиква) шрифтове, за разлика от безсерифните (гротеск / sans-serif) шрифтове като Helvetica и Arial.',
        },
        {
          id: 'dzi-artsv2-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'Коя съвременна визуална форма представлява пространствена композиция от обекти, материали, светлина или звук, монтирана в галерийна или публична среда, в която зрителят често може да навлезе и да я преживее триизмерно?',
          options: ['Инсталация (Art Installation)', 'Миниатюра в ръкопис', 'Екслибрис', 'Кавалетна акварелна етюдна скица'],
          correctIndex: 0,
          explanation: 'Инсталацията е жанр на съвременното изкуство, който трансформира конкретното пространство в единна художествена среда.',
        },
      ],
    },
    {
      id: 'arts2-part2',
      title: 'Част 2. Задачи с кратък отговор (25 т.)',
      instructions: 'Запишете точното понятие, стил или автор към всяка задача и подточка.',
      questions: [
        {
          id: 'dzi-artsv2-q16', number: 16, kind: 'short', answerType: 'text', points: 4,
          prompt: 'Как се нарича жанрът в живописта и графиката, който изобразява неодушевени предмети (съдове, плодове, цветя, книги), композирани в единна среда?',
          acceptedAnswers: ['натюрморт', 'Натюрморт', 'мъртва природа'],
          explanation: 'Натюрмортът (от фр. nature morte — „мъртва природа“, или нидерл. stilleven — „тих живот“) е самостоятелен жанр в изобразителното изкуство.',
        },
        {
          id: 'dzi-artsv2-q17', number: 17, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Как се нарича монументалната живописна техника, при която пигментите, разтворени във вода, се нанасят директно върху все още влажна (прясна) варова мазилка на стената?',
          acceptedAnswers: ['фреско', 'ал фреско', 'Фреско', 'фреска', 'al fresco'],
          explanation: 'Техниката „ал фреско“ (от итал. a fresco — на свежо/влажно) осигурява изключителна дълготрайност чрез карбонизация на варта.',
        },
        {
          id: 'dzi-artsv2-q18', number: 18, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Кой велик български художник от XX век е автор на прочутите живописни платна „Момичето с ябълките“, „Жетварка“ и „Сватбено хоро“, отличаващи се с декоративен колорит и одухотворен образ на българската жена и плодородието?',
          acceptedAnswers: [
            'Владимир Димитров - Майстора',
            'Владимир Димитров – Майстора',
            'Владимир Димитров',
            'Майстора',
          ],
          explanation: 'Владимир Димитров – Майстора (1882–1960), творил дълги години в кюстендилското с. Шишковци, е един от най-емблематичните български живописци.',
        },
        {
          id: 'dzi-artsv2-q19', number: 19, kind: 'multi', points: 5,
          prompt: 'Определете понятията от цветознанието и перспективата:',
          parts: [
            {
              id: 'a', label: 'А)', points: 2,
              prompt: 'Как се наричат цветовете бяло, сиво и черно, които нямат цветен тон (хрома), а се различават само по светлота?',
              answer: { type: 'text', acceptedAnswers: ['ахроматични', 'Ахроматични', 'ахроматични цветове'] },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: 'Как се нарича въображаемата хоризонтална линия в линейната перспектива, която винаги се намира на нивото на очите на наблюдателя и върху която лежат убежните точки?',
              answer: { type: 'text', acceptedAnswers: ['хоризонт', 'линия на хоризонта', 'Хоризонт'] },
            },
          ],
          explanation: 'А) Бялото, черното и всички нюанси на сивото са ахроматични цветове. Б) В линейната перспектива убежните точки на хоризонталните успоредни прави лежат върху линията на хоризонта.',
        },
        {
          id: 'dzi-artsv2-q20', number: 20, kind: 'multi', points: 6,
          prompt: 'Посочете архитектурния стил и автора за следните шедьоври на световното изкуство:',
          parts: [
            {
              id: 'a', label: 'А)', points: 3,
              prompt: 'Към кой западноевропейски средновековен архитектурен стил от XII–XV век (характеризиращ се със стреловидни арки, кръстовидно-ребрести сводове, аркбутани и огромни витражни розети) принадлежат катедралите в Шартър, Реймс и „Нотр Дам“ в Париж?',
              answer: { type: 'text', acceptedAnswers: ['готика', 'Готика', 'готически', 'готически стил'] },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: 'Кой нидерландски постимпресионист е автор на картините „Слънчогледи“, „Звездна нощ“ и „Спалнята в Арл“?',
              answer: { type: 'text', acceptedAnswers: ['Винсент ван Гог', 'Ван Гог', 'ван Гог'] },
            },
          ],
          explanation: 'А) Катедралите в Париж, Шартър и Реймс са класически образци на френската готика. Б) Автор на „Слънчогледи“ и „Звездна нощ“ е Винсент ван Гог.',
        },
      ],
    },
    {
      id: 'arts2-part3',
      title: 'Част 3. Теоретико-изкуствоведски анализ и творческа концепция (30 т.)',
      instructions: 'Разработете и двете задачи в структуриран текст. Оценете се по критериите след предаване.',
      questions: [
        {
          id: 'dzi-artsv2-q21', number: 21, kind: 'open', points: 15,
          prompt: `Сравнителен изкуствоведски анализ: Високият ренесанс и Барокът в европейското изобразително изкуство (XVI–XVII век):
А) Характеризирайте естетиката и художествените принципи на Високия ренесанс в Италия (Леонардо да Винчи, Микеланджело Буонароти, Рафаело Санцио, Тициан) — хармония, симетрична и пирамидална композиция, линейна и въздушна перспектива, анатомично съвършенство.
Б) Съпоставете ги с художествения език на Барока през XVII век (Лоренцо Бернини, Караваджо, Петер Паул Рубенс, Рембранд ван Рейн, Диего Веласкес) — динамика, диагонална и отворена композиция, драматичен светлосенъчен контраст, емоционален патос и синтез на изкуствата.
В) Илюстрирайте разликите чрез конкретно сравнение между скулптурата „Давид“ на Микеланджело (Ренесанс) и „Давид“ на Джовани Лоренцо Бернини (Барок).`,
          criteria: [
            { label: 'А) Задълбочена характеристика на Високия ренесанс и приноса на Леонардо, Микеланджело и Рафаело', points: 5 },
            { label: 'Б) Точен сравнителен анализ на бароковата поетика, композиция и светлосянка с примери от Караваджо, Рубенс и Рембранд', points: 5 },
            { label: 'В) Аргументиран пластичен и композиционен паралел между „Давид“ на Микеланджело (съсредоточен покой преди действието) и „Давид“ на Бернини (експлозивно движение в кулминационния миг)', points: 5 },
          ],
          modelAnswer: `А) Високият ренесанс (края на XV – първата третина на XVI век):
– Въплъщава хуманистичния идеал за разумна мяра, гражданско достойнство и хармония между човека и космоса.
– Композицията е уравновесена, центрирана, често пирамидална („Сикстинската Мадона“ и „Атинската школа“ на Рафаело, „Мадона в скалите“ на Леонардо) или подчинена на ясна архитектурно-перспективна ос („Тайната вечеря“ на Леонардо).
– Светлината моделира плавно обемите (сфумато), а човешката фигура се отличава с героична пластика и вътрешна сдържаност (стенописите на Сикстинската капела от Микеланджело).

Б) Барокът (XVII – първата половина на XVIII век):
– Заменя ренесансовия статичен баланс с вихрено движение, асиметрия, диагонали и спирали (Рубенс — „Свалянето от кръста“), илюзионистично разтваряне на пространството и театрална експресия.
– Светлината престава да бъде равномерна и се превръща в главен драматургичен фактор чрез резкия контраст между светлина и мрак — тенебризма на Караваджо и духовната златиста светлосянка в портретите на Рембранд.

В) Сравнителен анализ: „Давид“ на Микеланджело (1501–1504) срещу „Давид“ на Бернини (1623–1624):
– **Избор на момент:** Микеланджело изобразява Давид в момента ПРЕДИ двубоя с Голиат — в състояние на интелектуална концентрация и вътрешна морална решимост. Бернини избира самия КУЛМИНАЦИОНЕН МИГ на хвърлянето на камъка с прашката.
– **Композиция и пространство:** Статуята на Микеланджело е фронтална, изградена върху класически контрапост и затворена в спокоен вертикален силует. Статуята на Бернини е спираловидно усукана, пробива околната среда по диагонал и въвлича зрителя директно в пространството на невидимия противник.`,
        },
        {
          id: 'dzi-artsv2-q22', number: 22, kind: 'open', points: 15,
          prompt: `Творчески проект и визуална концепция за културен плакат и графична идентичност:
Разработете писмена художествено-композиционна концепция за плакат на тема: „Международен младежки фестивал на изкуствата и дигиталната култура — Пловдив“.
В разработката си опишете и обосновете:
А) Идейния замисъл и водещата визуална метафора (синтез между античното/възрожденското наследство на Пловдив и съвременните дигитални изкуства).
Б) Композиционното решение (формат, композиционен център, ритъм, мащабни контрасти) и цветовото решение (колоритна гама, контрасти и символика на цветовете).
В) Типографското решение (йерархия на текста: заглавие, дати, място, логотип; избор на серифен/безсерифен шрифт и четимост от разстояние).`,
          criteria: [
            { label: 'А) Оригинална и убедителна визуална метафора, обединяваща традицията и съвременната дигитална култура', points: 5 },
            { label: 'Б) Професионално обоснована композиционна структура и хармонична/контрастна цветова гама', points: 5 },
            { label: 'В) Ясна типографска йерархия, съчетание на шрифтовете и функционалност на плаката в градска среда', points: 5 },
          ],
          modelAnswer: t`А) Идеен замисъл и визуална метафора:
– Водещият образ обединява силуета на Античния театър в Пловдив и седемте тепета със светлинни векторни вълни, които преминават в четка, музикален ключ и пикселизирана звездна мрежа. Така мраморните колони се трансформират в еквалайзер и дигитален лъч — символ на моста между хилядолетната култура и младежкото бъдеще.

Б) Композиционно и цветово решение:
– **Формат и композиция:** Вертикален плакатен формат ($70 \times 100\text{ cm}$), изграден по динамична диагонално-центрична схема с висок оптичен център. Голямата силуетна форма в средата осигурява мигновено възприемане от далечна дистанция ($5\text{–}10\text{ m}$), а около нея е оставено достатъчно свободно „дишащо“ пространство (negative space).
– **Колорит:** Допълнителен и топло-студен контраст — дълбок ултрамариново-виолетов нощен фон, върху който изпъкват топли златисто-охрови, коралови и неоново-тюркоазени акценти.

В) Типографско решение и графична йерархия:
– **Първо ниво (Заглавие):** Модерен геометричен безсерифен гротеск с плътно начертание (Bold/ExtraBold), интегриран композиционно с архитектурната арка.
– **Второ ниво (Дати и локация):** Контрастен светъл блок с висока четливост.
– **Трето ниво (Допълнителна информация и партньори):** Подредена модулна решетка (grid system) в долното поле на плаката заедно с QR код към интерактивната програма.`,
        },
      ],
    },
  ],
};

export const DZI_MUSIC_PRACTICE_2: ExamPaper = {
  id: 'practice-dzi-music-2',
  title: 'Музика (профилирана подготовка) — Втори ДЗИ, тренировъчен вариант 2',
  exam: 'ДЗИ',
  subject: 'Музика',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Втори тренировъчен вариант за Втори ДЗИ по музика (профилирана подготовка — 11. и 12. клас). Включва 15 задачи с избираем отговор (45 т.), 5 задачи с кратък отговор по музикална теория и хармония (25 т.) и 2 задачи със свободен отговор (30 т.).',
  sections: [
    {
      id: 'music2-part1',
      title: 'Част 1. Задачи с избираем отговор (45 т.)',
      instructions: 'Изберете един верен отговор. Всяка задача носи 3 точки.',
      questions: [
        {
          id: 'dzi-musv2-q1', number: 1, kind: 'choice', points: 3,
          prompt: t`Коя мажорна и коя натурална минорна тоналност са паралелни и имат по ТРИ диеза като ключови знаци ($\text{фа}\sharp$, $\text{до}\sharp$, $\text{сол}\sharp$)?`,
          options: [
            'Ре мажор (D-dur) и си минор (h-moll)',
            'Ла мажор (A-dur) и фа-диез минор (fis-moll)',
            'Ми мажор (E-dur) и до-диез минор (cis-moll)',
            'Ми-бемол мажор (Es-dur) и до минор (c-moll)',
          ],
          correctIndex: 1,
          explanation: t`По квинтовия кръг с три диеза при ключа ($\text{фа}\sharp, \text{до}\sharp, \text{сол}\sharp$) са паралелните тоналности Ла мажор (A-dur) и фа-диез минор (fis-moll).`,
        },
        {
          id: 'dzi-musv2-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'С коя степен се отличава ХАРМОНИЧНИЯТ минор от натуралния минор при възходящо и низходящо движение?',
          options: [
            t`С понижена втора степен ($\text{II}\flat$)`,
            t`С повишена седма степен ($\text{VII}\sharp$ — водещ тон към тониката)`,
            t`С повишена четвърта степен ($\text{IV}\sharp$)`,
            'С липса на трета степен',
          ],
          correctIndex: 1,
          explanation: 'В хармоничния минор VII степен се повишава с половин тон, за да се образува умалена септима между VI и VII# степен и полутоново провличане от VII# към I степен.',
        },
        {
          id: 'dzi-musv2-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'Как се нарича първото обръщение на мажорното или минорното тризвучие, при което терцовият тон е в баса, а интервалите от баса нагоре са терца и секста?',
          options: [
            'Квинтакорд ($5/3$)',
            'Секстакорд ($6$)',
            'Квартсекстакорд ($6/4$)',
            'Септакорд ($7$)',
          ],
          correctIndex: 1,
          explanation: 'Първото обръщение на тризвучието е секстакордът ($T_6, S_6, D_6$) с терцовия тон в основата, а второто обръщение (с квинтовия тон в баса) е квартсекстакордът ($6/4$).',
        },
        {
          id: 'dzi-musv2-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'На коя степен на мажорния и хармоничния минорен лад се строи доминантовият септакорд ($D_7$) и каква е неговата интервалова структура в основно положение?',
          options: [
            'На V степен: голямо (мажорно) тризвучие + малка терца отгоре (голяма терца + малка терца + малка терца)',
            'На I степен: малко тризвучие + голяма терца',
            'На IV степен: умалено тризвучие + голяма терца',
            'На II степен: увеличено тризвучие + чиста кварта',
          ],
          correctIndex: 0,
          explanation: 'Доминантовият септакорд ($D_7$) се строи върху V степен и се състои от мажорно тризвучие и малка септима спрямо основния тон (голяма + малка + малка терца).',
        },
        {
          id: 'dzi-musv2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'Какъв е видът на българския неравноделен метрум $9/8$, когато четирите му дяла са групирани като три двувременни и един тривременен дял ($2+2+2+3$), характерен за Дайчовото хоро?',
          options: [
            'Четиривременен неравноделен метрум с удължен четвърти дял ($2+2+2+3$)',
            'Тривременен неравноделен метрум ($2+2+3$ — Ръченица)',
            'Петвременен неравноделен метрум ($2+2+2+2+3$ — Гаankино хоро)',
            'Прост равноделен тривременен метрум ($3/4$)',
          ],
          correctIndex: 0,
          explanation: 'Метрумът $9/8$ с четвърти тривременен дял ($2+2+2+3$) е четиривременен неравноделен метрум (Дайчово хоро), а при втори тривременен дял ($2+3+2+2$) е Грънчарско хоро.',
        },
        {
          id: 'dzi-musv2-q6', number: 6, kind: 'choice', points: 3,
          prompt: 'В коя българска музикалнофолклорна област е характерно традиционното двугласно женско пеене с остър секундов интервал и „тресене“ на гласа (напр. Бистришките баби, вписани в списъка на ЮНЕСКО)?',
          options: [
            'Добруджанска фолклорна област',
            'Шопска фолклорна област',
            'Тракийска фолклорна област',
            'Северняшка фолклорна област',
          ],
          correctIndex: 1,
          explanation: 'Старинният диафоничен двуглас с характерни секундови съзвучия и „тресене“ е емблематичен за Шопската (и части от Пиринската и Пазарджишко-Ихтиманската) фолклорна област.',
        },
        {
          id: 'dzi-musv2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Коя полифонична музикална форма достига своя връх в творчеството на Йохан Себастиан Бах („Добре темперирано пиано“, „Изкуството на фугата“) и се изгражда върху имитационното провеждане на една основна тема в различните гласове?',
          options: ['Фуга', 'Сонатно алегро', 'Валс', 'Ноктюрно'],
          correctIndex: 0,
          explanation: 'Фугата е висшата имитационно-полифонична форма от епохата на Барока, включваща експозиция (тема – отговор в доминантовата тоналност – противосложение), разработка и реприза със стрето и органен пункт.',
        },
        {
          id: 'dzi-musv2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Кои три основни дяла изграждат класическата форма „сонатно алегро“ (първата част на класическата симфония, соната и струнен квартет при Хайдн, Моцарт и Бетовен)?',
          options: [
            'Експозиция, Разработка и Реприза (често последвана от Кода)',
            'Куплет, Припев и Бридж',
            'Интродукция, Ария и Речитатив',
            'Скерцо, Трио и Скерцо',
          ],
          correctIndex: 0,
          explanation: 'Сонатното алегро се основава на тоналния и образен конфликт между Главна и Странична тема в Експозицията, развитието им в Разработката и тоналното им обединяване в основната тоналност в Репризата.',
        },
        {
          id: 'dzi-musv2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'В коя симфония на Лудвиг ван Бетовен във финала за първи път в историята на симфоничния жанр са включени солисти и смесен хор по текста на одата „Към радостта“ от Фридрих Шилер?',
          options: [
            'Симфония № 3 „Ероика“',
            'Симфония № 5 в до минор',
            'Симфония № 6 „Пасторална“',
            'Симфония № 9 в ре минор, оп. 125',
          ],
          correctIndex: 3,
          explanation: 'Деветата симфония на Бетовен (1824 г.) включва във финалната си четвърта част вокални солисти и хор с темата „Ода на радостта“ (днес химн на Европейския съюз).',
        },
        {
          id: 'dzi-musv2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Кой италиански оперен композитор от XIX век е автор на оперите „Набуко“, „Риголето“, „Травиата“, „Трубадур“ и „Аида“?',
          options: [
            'Джоакино Росини',
            'Джузепе Верди',
            'Клаудио Монтеверди',
            'Арканджело Корели',
          ],
          correctIndex: 1,
          explanation: 'Джузепе Верди (1813–1901) е върховият представител на италианската романтична опера от XIX век.',
        },
        {
          id: 'dzi-musv2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Кой френски композитор от края на XIX и началото на XX век е основоположник на музикалния импресионизъм („Следобедът на един фавн“, „Морето“, клавирните „Прелюдии“ с „Лунна светлина“)?',
          options: [
            'Клод Дебюси',
            'Ектор Берлиоз',
            'Жорж Бизе',
            'Шарл Гуно',
          ],
          correctIndex: 0,
          explanation: 'Клод Дебюси (заедно с Морис Равел) създава музикалния импресионизъм, отличаващ се с колоритна оркестрация, целотонни и пентатонични ладове и свободна форма.',
        },
        {
          id: 'dzi-musv2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Кой български композитор от „първото поколение“ в края на XIX – началото на XX век е автор на първата българска опера „Сиромахиня“ (1900 г.) и вокално-симфоничната поема „Към родината“?',
          options: [
            'Емануил Манолов',
            'Панчо Владигеров',
            'Марин Големинов',
            'Александър Текелиев',
          ],
          correctIndex: 0,
          explanation: 'Емануил Манолов (1860–1902) поставя началото на българското оперно творчество с операта „Сиромахиня“ по мотиви от Иван Вазов.',
        },
        {
          id: 'dzi-musv2-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Кой класик на българската симфонична музика от „второто поколение“ е автор на емблематичната рапсодия „Вардар“, седем симфонии и три клавирни концерта (приемник на традициите на българската национална школа заедно с П. Стайнов и Л. Пипков)?',
          options: [
            'Панчо Владигеров (5 клавирни концерта и рапсодия „Вардар“)',
            'Добри Христов',
            'Никола Атанасов',
            'Георги Атанасов – Маестрото',
          ],
          correctIndex: 0,
          explanation: 'Панчо Владигеров (1899–1978) създава Българска рапсодия „Вардар“ (оп. 16, 1922/1928 г.), 5 концерта за пиано и оркестър, операта „Цар Калоян“ и балета „Легенда за езерото“.',
        },
        {
          id: 'dzi-musv2-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'Кое произведение на Петко Стайнов е четиричастна програмна симфонична сюита от 1926 г. с части „Сказка“, „Хороводна“, „Мечкарско“ и „Ръченица“?',
          options: [
            'Симфонична сюита „Тракийски танци“',
            'Танцова драма „Нестинарка“',
            'Симфонична поема „Легенда“',
            'Оратория „Момчил“',
          ],
          correctIndex: 0,
          explanation: '„Тракийски танци“ (1925–1926 г.) от Петко Стайнов включва „Пайдушко“, „Мечкарско“, „Хоро“ и прочутата „Ръченица“ (сюитата „Приказка“ включва „Сказка“, а „Тракийски танци“ е най-изпълняваната му симфонична сюита).',
        },
        {
          id: 'dzi-musv2-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'В дигиталните аудио работни станции (DAW) каква информация съдържа един стандартен MIDI файл (`.mid`)?',
          options: [
            'Записани акустични звукови вълни с микрофон като при `.wav` файл',
            'Цифрови управляващи команди (събития за височина на тона Note On/Off, динамика Velocity, темпо, педал и избор на виртуален инструмент), а не готов аудиозапис',
            'Само видеоизображение без звук',
            'Текстов файл с биографията на изпълнителя',
          ],
          correctIndex: 1,
          explanation: 'Протоколът MIDI (Musical Instrument Digital Interface) предава цифрови инструкции за изпълнение, които се озвучават чрез синтезатор или виртуален инструмент (VSTi).',
        },
      ],
    },
    {
      id: 'music2-part2',
      title: 'Част 2. Задачи с кратък отговор по музикална теория (25 т.)',
      instructions: 'Запишете точния числов или терминологичен отговор към всяка задача и подточка.',
      questions: [
        {
          id: 'dzi-musv2-q16', number: 16, kind: 'short', answerType: 'number', points: 4,
          prompt: 'Колко полутона съдържа музикалният интервал ЧИСТА КВИНТА (ч. 5)?',
          acceptedAnswers: ['7'],
          explanation: 'Чистата квинта обхваща 5 степени и съдържа $7$ полутона ($3{,}5$ цели тона).',
        },
        {
          id: 'dzi-musv2-q17', number: 17, kind: 'short', answerType: 'number', points: 5,
          prompt: 'От колко осмини ноти се състои един такт в българския неравноделен размер $7/8$ (напр. при Ръченица $2+2+3$ или Копаница $3+2+2$)?',
          acceptedAnswers: ['7'],
          explanation: 'Числителят на размера $7/8$ показва, че в един такт има $7$ осмини времена, групирани в два двувременни и един тривременен дял.',
        },
        {
          id: 'dzi-musv2-q18', number: 18, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Как се нарича музикалната форма с редуване на неизменен рефрен (главна тема — $A$) и контрастни епизоди ($B, C, D...$) по схемата $A - B - A - C - A$?',
          acceptedAnswers: ['рондо', 'Рондо', 'форма рондо'],
          explanation: 'Формата рондо (от фр. rondeau — кръг) се основава на многократното възвръщане на рефрена ($A$), редуван с нови епизоди.',
        },
        {
          id: 'dzi-musv2-q19', number: 19, kind: 'multi', points: 5,
          prompt: 'Определете следните музикални термини за темпо и звукоред:',
          parts: [
            {
              id: 'a', label: 'А)', points: 2,
              prompt: 'Какво означава италианският динамичен термин `crescendo` (`cresc.`)?',
              answer: { type: 'text', acceptedAnswers: ['постепенно усилване', 'усилване', 'усилване на звука', 'постепенно усилване на звука'] },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: 'Как се нарича 5-степенният звукоред без полутонове (анхемитонна ...), характерен за фолклора на Родопите и Далечния изток?',
              answer: { type: 'text', acceptedAnswers: ['пентатоника', 'Пентатоника'] },
            },
          ],
          explanation: 'А) `crescendo` означава постепенно усилване на силата на звука. Б) Петстепенният звукоред без полутонове е анхемитонна пентатоника.',
        },
        {
          id: 'dzi-musv2-q20', number: 20, kind: 'multi', points: 6,
          prompt: 'Посочете авторите на следните емблематични музикални произведения:',
          parts: [
            {
              id: 'a', label: 'А)', points: 3,
              prompt: 'Кой български композитор е автор на танцовата драма „Нестинарка“ (1940 г.)?',
              answer: { type: 'text', acceptedAnswers: ['Марин Големинов', 'Големинов'] },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: 'Кой австрийски класик (1756–1791) е автор на оперите „Сватбата на Фигаро“, „Дон Жуан“ и „Вълшебната флейта“?',
              answer: { type: 'text', acceptedAnswers: ['Волфганг Амадеус Моцарт', 'Моцарт', 'В. А. Моцарт'] },
            },
          ],
          explanation: 'А) Автор на танцовата драма „Нестинарка“ е Марин Големинов. Б) Оперите „Сватбата на Фигаро“, „Дон Жуан“ и „Вълшебната флейта“ са шедьоври на В. А. Моцарт.',
        },
      ],
    },
    {
      id: 'music2-part3',
      title: 'Част 3. Музикално-исторически и теоретичен анализ със свободен отговор (30 т.)',
      instructions: 'Разработете задълбочен музикален анализ по всяка от двете задачи. Оценете се по критериите след предаване.',
      questions: [
        {
          id: 'dzi-musv2-q21', number: 21, kind: 'open', points: 15,
          prompt: `Виенската класическа школа (Йозеф Хайдн, Волфганг Амадеус Моцарт, Лудвиг ван Бетовен) и утвърждаването на класическия симфоничен и сонатен цикъл:
А) Очертайте историко-културния контекст на Музикалния класицизъм през втората половина на XVIII и началото на XIX век (идеите на Просвещението, прехода от полифония към хомофонно-хармонично мислене и утвърждаването на парния състав на симфоничния оркестър).
Б) Анализирайте структурата на четиричастния сонатно-симфоничен цикъл (темпо, характер, тонални отношения и музикална форма на I, II, III и IV част).
В) Откроете индивидуалния принос на Хайдн, Моцарт и Бетовен чрез конкретни техни симфонични, камерни и оперни шедьоври.`,
          criteria: [
            { label: 'А) Задълбочено изясняване на естетиката на Музикалния класицизъм, хомофонно-хармоничния стил и класическия оркестър', points: 5 },
            { label: 'Б) Точна теоретична характеристика на 4-те части на сонатно-симфоничния цикъл и драматургията на сонатното алегро', points: 5 },
            { label: 'В) Конкретен анализ на стила и приноса на Хайдн, Моцарт и Бетовен с посочени представителни творби', points: 5 },
          ],
          modelAnswer: `А) Естетика и стил на Виенската класическа школа:
– През втората половина на XVIII и началото на XIX век във Виена творят тримата титани на Музикалния класицизъм — Й. Хайдн, В. А. Моцарт и Л. ван Бетовен. Тяхното изкуство отразява просвещенския хуманизъм, стремежа към логическа яснота, симетрия и хармонично равновесие между чувство и разум.
– Утвърждава се хомофонно-хармоничният склад с ясна функционална хармония ($T - S - D - T$) и периодична структура на темите, както и класическият двоен (парен) състав на симфоничния оркестър с четири оркестрови групи: струнни лъкови, дървени духови, медни духови и ударни (тимпани).

Б) Структура на класическия четиричастен сонатно-симфоничен цикъл:
1. **I част (Allegro):** Най-драматичният и конфликтен център на цикъла, написан в основната тоналност във форма на **сонатно алегро** (Експозиция с Главна и Странична тема -> Разработка -> Реприза -> Кода).
2. **II част (Andante / Adagio / Largo):** Бавен лирико-философски център в субдоминантова, доминантова или едноименна/паралелна тоналност, написан в сложна триделна форма, вариационна форма или сонатна форма без разработка.
3. **III част (Menuetto / Scherzo — Allegro):** Жизнерадостен танцувален или хумористично-стремителен епизод в основната тоналност в сложна триделна форма с Трио ($A - B - A$).
4. **IV част (Finale — Allegro / Presto):** Динамичен обобщаващ финал в основната тоналност във форма рондо, рондо-соната или сонатно алегро.

В) Индивидуален принос на тримата класици:
– **Йозеф Хайдн (1732–1809):** „Бащата на симфонията и струнния квартет“ (104 симфонии, сред които „Парижките“ и „Лондонските“ симфонии, Симфония № 45 „Прощална“, № 94 „С удара на тимпана“, ораториите „Сътворението на света“ и „Годишните времена“).
– **Волфганг Амадеус Моцарт (1756–1791):** Съвършен мелодизъм и психологическа дълбочина във всички жанрове — Симфонии № 40 в сол минор и № 41 „Юпитер“, „Малка нощна музика“, „Реквием“ и реформаторските опери „Сватбата на Фигаро“, „Дон Жуан“ и „Вълшебната флейта“.
– **Лудвиг ван Бетовен (1770–1827):** Героико-драматичен симфонизъм, който разширява мащабите на сонатния цикъл, заменя менуета със скерцо и изгражда моста към Романтизма (9 симфонии — № 3 „Ероика“, № 5, № 6 „Пасторална“, № 9; сонати „Патетична“, „Лунна“, „Апасионата“; операта „Фиделио“).`,
        },
        {
          id: 'dzi-musv2-q22', number: 22, kind: 'open', points: 15,
          prompt: `Българският музикален фолклор — метроритмично, ладово и многогласно богатство, и неговото преосмисляне в българската композиторска школа и световната сцена:
А) Характеризирайте специфичните белези на българската народна музика (неравноделни метруми — теоретичното им систематизиране от Добри Христов и Васил Стоин, старинни диатонични и хроматични ладове, орнаментика и безмензурни песни).
Б) Сравнете основните български музикалнофолклорни области (Шопска, Пиринска, Родопска, Тракийска, Добруджанска и Северняшка) по отношение на едногласно/двугласно пеене, типични танци и народни инструменти.
В) Анализирайте как фолклорната традиция се претворява в професионалната българска музика (П. Владигеров, П. Стайнов, Ф. Кутев, Кр. Кюркчийски, Стефан Мутафчиев) и световния феномен „Мистерията на българските гласове“.`,
          criteria: [
            { label: 'А) Точен теоретичен анализ на неравноделните размери (5/8, 7/8, 8/8, 9/8, 11/8 и др.), ладовете и безмензурните песни', points: 5 },
            { label: 'Б) Сравнителна характеристика на шестте фолклорни области (диафония в Шопско и Пиринско, пентатоника и каба гайда в Родопите, безмензурност в Тракия и Добруджа)', points: 5 },
            { label: 'В) Задълбочено представяне на композиторските обработки и авторски песни на Филип Кутев, Красимир Кюркчийски и международното признание на българския хоров звук', points: 5 },
          ],
          modelAnswer: `А) Метроритмика, ладове и мелодика на българския музикален фолклор:
– Българският музикален фолклор се отличава с изключително богатство на **неравноделни метруми** (комбинации от къси двувременни $\\delta = 2$ и дълги тривременни $\\tau = 3$ дялове), теоретично обосновани от Добри Христов и Васил Стоин: $5/8$ (Пайдушко хоро — $2+3$), $7/8$ (Ръченица — $2+2+3$; Елено моме / Македонско — $3+2+2$), $8/8$ ($3+2+3$), $9/8$ (Дайчово — $2+2+2+3$; Грънчарско — $2+3+2+2$), $11/8$ (Ганкино / Копаница — $2+2+3+2+2$), както и сложни разноделни размери.
– Наред с бързите хороводни песни съществуват богато орнаментирани **безмензурни (бавни) песни** („на трапеза“, жътварски), а ладовата основа включва старинни диатонични ладове (еолийски, дорийски, фригийски, миксолидийски), анхемитонна пентатоника и ладове с увеличена секунда (хиджаз).

Б) Сравнителна характеристика на фолклорните области:
– **Двугласни области:** **Шопска** (остър секундов двуглас — „тресене“, „натрисане“, граовско хоро) и **Пиринска** (богат двуглас — „на глас“ и „на бучене“, песни „на ачик“ и „на икане“, тамбура и тапан).
– **Едногласни области:** **Родопска** (широка кантиленна лирика в пентатоника, нисък тембър на каба гайда и чанове), **Тракийска** (богато орнаментирани безмензурни песни, право тракийско хоро, виртуозен кавал), **Добруджанска** (специфичен речитативно-орнаментиран стил, три інструмента — джура гайда, гъдулка и кавал, ръка и сборенка) и **Северняшка** (жизнерадостни ситни хора в $2/4$, пайдушко, дайчово и ганкино хоро, духова музика).

В) Фолклорът в професионалното творчество и световната сцена:
– Докато първото поколение композитори (Ем. Манолов, А. Букорещлиев, П. Пипков, Д. Христов) записват и хармонизират народни песни в китки за хор, второто поколение (П. Владигеров, П. Стайнов, Л. Пипков, М. Големинов) изгражда върху фолклорния интонационен и метроритмичен модел симфонични сюити, рапсодии и балети.
– През втората половина на XX век Филип Кутев (създател на ДАНПТ „Филип Кутев“, 1951 г. — „Полегнала е Тодора“, „Лале ли си, зюмбюл ли си“), Красимир Кюркчийски („Калиманку Денку“, „Дилмано, Дилберо“), Николай Кауфман и Стефан Мутафчиев създават нов жанр — полифонично-сонорната обработка за народен хор, която чрез албумите „Мистерията на българските гласове“ (награда „Грами“, 1990 г.) прославя българската музикална култура по целия свят.`,
        },
      ],
    },
  ],
};
