import type { ExamPaper } from '../../lib/examPaperScoring';
import { DZI_SCALE } from '../../lib/monGradeScale';

export const DZI_DE_B2_PRACTICE_1: ExamPaper = {
  id: 'practice-dzi-de-b2-1',
  title: 'Немски език (профилирана подготовка, ниво B2) — Втори ДЗИ, тренировъчен вариант 1',
  exam: 'ДЗИ',
  subject: 'Немски език',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Тренировъчен вариант за Втори ДЗИ по немски език (профилирана подготовка, ниво B2 по ОЕЕР). Включва Четене с разбиране и Езикови задачи с избираем отговор (36 т.), Граматични трансформации и словообразуване с кратък отговор (24 т.) и Създаване на два писмени текста (40 т.). Оценката е по единната скала на МОН за ДЗИ.',
  sections: [
    {
      id: 'de-leseverstehen',
      title: 'Част 1. Leseverstehen und Sprachbausteine (36 т.)',
      instructions: 'Прочетете текста и отговорете на въпроси 1.–5., след което изберете верния отговор за задачи 6.–12. Всяка задача носи 3 точки.',
      sourceText: {
        title: 'Reparieren statt Wegwerfen: Die Rückkehr der Reparaturkultur',
        text: `In vielen europäischen Städten entstehen derzeit sogenannte Reparatur-Cafés, in denen Bürgerinnen und Bürger defekte Alltagsgegenstände gemeinsam mit ehrenamtlichen Fachleuten instand setzen. Ob Kaffeemaschine, Fahrrad oder Laptop – das Ziel besteht darin, die Lebensdauer von Produkten zu verlängern und Elektroschrott zu vermeiden. Hintergrund dieser Bewegung ist die wachsende Kritik an der kurzlebigen Konsumgesellschaft: Viele elektronische Geräte sind heute so konstruiert, dass sich ein Austausch einzelner Bauteile kaum lohnt oder mangels Ersatzteilen technisch erschwert wird.\n\nDie Europäische Union hat auf diese Entwicklung mit dem sogenannten „Recht auf Reparatur“ reagiert. Hersteller werden verpflichtet, Ersatzteile und Reparaturanleitungen über mehrere Jahre hinweg zu fairen Preisen bereitzustellen. Ökonomen betonen jedoch, dass gesetzliche Vorgaben allein nicht ausreichen. Solange eine Neuanschaffung oft günstiger ist als die Arbeitsstunde in einer Fachwerkstatt, greifen viele Verbraucher weiterhin zum Neugerät. Erst wenn steuerliche Anreize für Reparaturdienstleistungen geschaffen und langlebige Designs bereits bei der Produktion belohnt werden, kann eine echte Kreislaufwirtschaft entstehen.`,
        attribution: 'Учебен научнопопулярен текст за ниво B2 (StudyBG)'
      },
      questions: [
        {
          id: 'dzi-deb2-q1', number: 1, kind: 'choice', points: 3,
          prompt: 'Welches Hauptziel verfolgen die im ersten Absatz beschriebenen Reparatur-Cafés?',
          options: [
            'Gebrauchte Elektrogeräte zu sammeln und ins Ausland zu exportieren.',
            'Die Nutzungsdauer von Alltagsgeräten zu verlängern und Müll zu reduzieren.',
            'Neue Haushaltsgeräte direkt vom Hersteller günstiger zu verkaufen.',
            'Berufsschüler auf die Abschlussprüfung im Handwerk vorzubereiten.'
          ],
          correctIndex: 1,
          explanation: 'В текста е посочено: „das Ziel besteht darin, die Lebensdauer von Produkten zu verlängern und Elektroschrott zu vermeiden“.'
        },
        {
          id: 'dzi-deb2-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Warum lassen sich viele moderne Elektrogeräte laut dem Text nur schwer reparieren?',
          options: [
            'Weil es in Europa keine ausgebildeten Techniker mehr gibt.',
            'Weil ihre Bauweise den Austausch von Teilen erschwert oder Ersatzteile fehlen.',
            'Weil das Reparieren privater Geräte gesetzlich eingeschränkt wurde.',
            'Weil Verbraucher keine Bedienungsanleitungen mehr lesen.'
          ],
          correctIndex: 1,
          explanation: 'Текстът обяснява, че уредите са конструирани така, че подмяната на части е трудна или липсват резервни части („mangels Ersatzteilen technisch erschwert wird“).'
        },
        {
          id: 'dzi-deb2-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'Was verlangt das „Recht auf Reparatur“ der Europäischen Union von den Herstellern?',
          options: [
            'Alle defekten Geräte zehn Jahre lang kostenlos gegen neue umzutauschen.',
            'Ersatzteile und Reparaturanleitungen über Jahre zu angemessenen Preisen anzubieten.',
            'Eigene Reparatur-Cafés in jeder Großstadt zu finanzieren.',
            'Den Preis für neue Elektronikgeräte um die Hälfte zu senken.'
          ],
          correctIndex: 1,
          explanation: 'Според втория абзац: „Hersteller werden verpflichtet, Ersatzteile und Reparaturanleitungen über mehrere Jahre hinweg zu fairen Preisen bereitzustellen“.'
        },
        {
          id: 'dzi-deb2-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Warum entscheiden sich viele Kunden trotz der neuen Regeln weiterhin für ein Neugerät?',
          options: [
            'Weil die Reparatur in einer Werkstatt oft fast genauso viel kostet wie ein neues Produkt.',
            'Weil reparierte Geräte doppelt so viel Strom verbrauchen.',
            'Weil Ersatzteile nur im außereuropäischen Ausland bestellt werden können.',
            'Weil Werkstätten keine Garantie auf ihre Arbeit geben dürfen.'
          ],
          correctIndex: 0,
          explanation: 'Икономистите отбелязват: „Solange eine Neuanschaffung oft günstiger ist als die Arbeitsstunde in einer Fachwerkstatt, greifen viele Verbraucher weiterhin zum Neugerät“.'
        },
        {
          id: 'dzi-deb2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'Welches Wort im ersten Absatz bedeutet „ohne Bezahlung / freiwillig“?',
          options: ['ehrenamtlichen', 'defekte', 'kurzlebigen', 'technisch'],
          correctIndex: 0,
          explanation: 'Прилагателното „ehrenamtlich“ означава „доброволен, на обществени начала (без заплащане)“.'
        },
        {
          id: 'dzi-deb2-q6', number: 6, kind: 'choice', points: 3,
          prompt: 'Ergänzen Sie den Satz korrekt:\n________ der strengen Sicherheitsvorschriften kam es im Chemielabor zu einem kleinen Zwischenfall.',
          options: ['Trotz', 'Wegen', 'Während', 'Statt'],
          correctIndex: 0,
          explanation: 'Предлогът за отстъпка с Genitiv „Trotz“ (въпреки строгите правила за безопасност) отговаря на смисъла на изречението.'
        },
        {
          id: 'dzi-deb2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Ergänzen Sie den Satz im Konjunktiv II der Vergangenheit:\nWenn wir den Zug um 7 Uhr genommen ________, wären wir rechtzeitig zur Konferenz gekommen.',
          options: ['hätten', 'haben', 'wären', 'würden'],
          correctIndex: 0,
          explanation: 'Глаголът „nehmen“ образува Perfekt и Konjunktiv II Plusquamperfekt със спомагателния глагол „haben“ → „genommen hätten“.'
        },
        {
          id: 'dzi-deb2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Wählen Sie das passende Relativpronomen:\nDie Wissenschaftlerin, ________ Forschungsergebnisse gestern veröffentlicht wurden, hält heute einen Vortrag.',
          options: ['deren', 'dessen', 'derer', 'denen'],
          correctIndex: 0,
          explanation: 'Относителното местоимение в Genitiv за женски род („Die Wissenschaftlerin“) е „deren“.'
        },
        {
          id: 'dzi-deb2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Ergänzen Sie die richtige Präposition:\nViele Jugendliche engagieren sich heute aktiv ________ den Schutz der Meere.',
          options: ['für', 'über', 'auf', 'an'],
          correctIndex: 0,
          explanation: 'Глаголът „sich engagieren“ се управлява от предлога „für“ + Akkusativ („sich engagieren für den Schutz“).'
        },
        {
          id: 'dzi-deb2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Wählen Sie die korrekte Passivform im Präteritum:\nDas historische Rathaus ________ im 19. Jahrhundert vollständig restauriert.',
          options: ['wurde', 'wird', 'ist', 'war'],
          correctIndex: 0,
          explanation: 'Vorgangspassiv в Präteritum се образува с „wurde + Partizip II“ („wurde restauriert“).'
        },
        {
          id: 'dzi-deb2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Welcher zweiteilige Konnektor passt in den Satz?\n________ mehr Grünflächen in der Innenstadt angelegt werden, ________ angenehmer wird das Mikroklima im Sommer.',
          options: ['Je ... desto', 'Sowohl ... als auch', 'Entweder ... oder', 'Weder ... noch'],
          correctIndex: 0,
          explanation: 'Пропорционалната зависимост с две сравнителни степени („mehr ..., angenehmer“) се изразява с „Je ... desto“.'
        },
        {
          id: 'dzi-deb2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Ergänzen Sie das passende Funktionsverb:\nDie Schulleitung hat den Vorschlag des Schülerrats in Betracht ________.',
          options: ['gezogen', 'genommen', 'gebracht', 'gestellt'],
          correctIndex: 0,
          explanation: 'Устойчивата глаголно-именна конструкция (Funktionsverbgefüge) е „in Betracht ziehen“ (вземам предвид / обмислям) → в Perfekt: „in Betracht gezogen“.'
        }
      ]
    },
    {
      id: 'de-transformationen',
      title: 'Част 2. Grammatische Transformationen und Wortbildung (24 т.)',
      instructions: 'Запишете точната дума или граматична форма. Всяка задача носи 4 точки.',
      questions: [
        {
          id: 'dzi-deb2-q13', number: 13, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Bilden Sie aus dem Verb in Klammern ein passendes Substantiv:\nDie rechtzeitige ________ (ANMELDEN) zum Sprachkurs ist bis Freitag möglich.',
          acceptedAnswers: ['Anmeldung'],
          explanation: 'От глагола „anmelden“ чрез наставката -ung се образува съществителното от женски род „die Anmeldung“.'
        },
        {
          id: 'dzi-deb2-q14', number: 14, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Ergänzen Sie das passende Pronominaladverb:\nWir freuen uns schon sehr ________, im Sommer an dem Austauschprogramm teilzunehmen.',
          acceptedAnswers: ['darauf'],
          explanation: '„Sich freuen auf + Akk.“ пред инфинитивна конструкция с „zu“ образува местоименното наречие „darauf“.'
        },
        {
          id: 'dzi-deb2-q15', number: 15, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Formen Sie das Partizipialattribut in ein Partizip I mit Endung um:\nEin Problem, das dringend gelöst werden muss, ist ein ________ (DRINGEN) Problem.',
          acceptedAnswers: ['dringendes'],
          explanation: 'Partizip I от „dringen“ е „dringend“, а пред среден род („ein ... Problem“) в Nominativ приема окончание -es: „dringendes“.'
        },
        {
          id: 'dzi-deb2-q16', number: 16, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Ergänzen Sie den Satz mit „um ... zu“ oder „damit“:\nDie Bibliothek hat ihre Öffnungszeiten verlängert, ________ die Abiturienten auch abends in Ruhe lernen können.',
          acceptedAnswers: ['damit'],
          explanation: 'Подлозите в главното („Die Bibliothek“) и подчиненото изречение („die Abiturienten“) са различни, затова се използва съюзът „damit“.'
        },
        {
          id: 'dzi-deb2-q17', number: 17, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Setzen Sie das Substantiv im Genitiv Singular (n-Deklination) ein:\nDer Name des jungen ________ (AUTOR — der Praktikant) stand auf dem Titelblatt: Der Name des jungen Praktikant__.',
          acceptedAnswers: ['Praktikanten', 'en'],
          explanation: 'Съществителното „der Praktikant“ се изменя по слабата (n-) деклинация и приема окончание -en в Genitiv Singular: „des jungen Praktikanten“.'
        },
        {
          id: 'dzi-deb2-q18', number: 18, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Formen Sie den Satz ins Passiv mit Modalverb um (schreiben Sie die letzten zwei Wörter):\nMan muss die Unterlagen bis Montag einreichen.\nDie Unterlagen müssen bis Montag ________ ________.',
          acceptedAnswers: ['eingereicht werden'],
          explanation: 'Инфинитив на страдателен залог след модален глагол се образува от Partizip II + werden: „eingereicht werden“.'
        }
      ]
    },
    {
      id: 'de-schreiben',
      title: 'Част 3. Schriftlicher Ausdruck (40 т.)',
      instructions: 'Създайте два писмени текста на немски език. Оценяват се чрез самооценка по критериите за ниво B2.',
      questions: [
        {
          id: 'dzi-deb2-q19', number: 19, kind: 'open', points: 15,
          prompt: 'Aufgabe 1 (120–130 Wörter): Schreiben Sie einen formellen Leserbrief an eine Jugendzeitschrift zum Artikel „Bücher aus Papier oder E-Reader im Unterricht?“. Legen Sie Ihre eigene Erfahrung dar und begründen Sie, welche Lösung Sie für den Schulalltag bevorzugen.',
          criteria: [
            { label: 'Пълно изпълнение на комуникативната задача: връзка със статията, личен опит и аргументирана позиция', points: 5 },
            { label: 'Структура на официално писмо (обръщение, въведение, теза, заключение, поздрав) и свързаност на текста', points: 4 },
            { label: 'Богат речников запас на ниво B2', points: 3 },
            { label: 'Граматична правилност (словоред в подчинени изречения, управление на глаголите, падежи) и правопис', points: 3 }
          ],
          modelAnswer:
            'Sehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihren Artikel über den Einsatz von E-Readern im Schulunterricht gelesen. Da an unserem Gymnasium seit diesem Schuljahr sowohl gedruckte Lehrbücher als auch digitale Lesegeräte genutzt werden, möchte ich meine Erfahrungen dazu teilen.\n\nEinerseits erleichtern digitale Bücher den Schulalltag erheblich, weil man nicht mehr täglich schwere Schultaschen tragen muss und Fachbegriffe sofort nachschlagen kann. Andererseits zeigt meine Erfahrung, dass ich mir komplexe Texte auf Papier deutlich besser einprägen kann, da das Unterstreichen mit einem Stift die Konzentration fördert und die Augen schont.\n\nAus diesem Grund halte ich eine Kombination beider Medien für die sinnvollste Lösung: Nachschlagewerke digital, Lektüren und Arbeitshefte jedoch weiterhin auf Papier.\n\nMit freundlichen Grüßen\n[Name]'
        },
        {
          id: 'dzi-deb2-q20', number: 20, kind: 'open', points: 25,
          prompt: 'Aufgabe 2 (200–220 Wörter): Verfassen Sie eine ausführliche Erörterung zum Thema:\n„Sollten Schülerinnen und Schüler vor dem Studium ein freiwilliges soziales oder ökologisches Jahr absolvieren?“ Wägen Sie Vor- und Nachteile ab und formulieren Sie eine begründete Schlussfolgerung.',
          criteria: [
            { label: 'Диференцирано разглеждане на аргументи „за“ и „против“ с конкретни примери и ясен извод', points: 8 },
            { label: 'Логическа кохерентност и уместна употреба на конектори на ниво B2 (einerseits/andererseits, darüber hinaus, infolgedessen)', points: 6 },
            { label: 'Прецизен и разнообразен лексикален изказ (Funktionsverbgefüge, академична лексика)', points: 6 },
            { label: 'Синтактична сложност и граматично-правописна точност', points: 5 }
          ],
          modelAnswer:
            'Nach dem Abitur stehen viele junge Menschen vor der schwierigen Entscheidung, welchen Berufsweg sie einschlagen sollen. Immer häufiger wird diskutiert, ob ein freiwilliges soziales oder ökologisches Jahr vor Studienbeginn sinnvoll ist.\n\nFür ein solches Orientierungsjahr spricht vor allem die persönliche Reife, die Jugendliche durch praktische Arbeit gewinnen. Wer in einem Krankenhaus, einem Kindergarten oder einem Naturschutzprojekt mitarbeitet, übernimmt Verantwortung, lernt Teamarbeit und entwickelt Empathie. Darüber hinaus hilft diese praktische Erfahrung vielen Abiturienten dabei herauszufinden, ob ihr geplantes Studienfach tatsächlich ihren Interessen entspricht, wodurch spätere Studienabbrüche vermieden werden können.\n\nAuf der anderen Seite darf man nicht übersehen, dass sich der Berufseinstieg dadurch um ein ganzes Jahr verzögert. Zudem erhalten Freiwillige meist nur ein geringes Taschengeld, weshalb nicht jede Familie ein solches Jahr problemlos finanzieren kann. Manche befürchten außerdem, in dieser Pause schulisches Fachwissen in Mathematik oder Fremdsprachen zu vergessen.\n\nZusammenfassend bin ich der Überzeugung, dass die Vorteile überwiegen, sofern der Dienst freiwillig bleibt und finanziell besser gefördert wird. Ein solches Jahr stärkt nicht nur den gesellschaftlichen Zusammenhalt, sondern bietet jungen Menschen auch eine wertvolle Orientierung für ihre Zukunft.'
        }
      ]
    }
  ]
};
