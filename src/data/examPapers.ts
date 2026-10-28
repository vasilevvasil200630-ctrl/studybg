import { DZI_SCALE } from '../lib/monGradeScale';
import type { ExamPaper } from '../lib/examPaperScoring';
import { NVO10_MATH_2026 } from './officialPapers/nvo10Math2026';
import { NVO10_MATH_2025 } from './officialPapers/nvo10Math2025';
import { NVO10_MATH_2024 } from './officialPapers/nvo10Math2024';
import { NVO10_MATH_2023 } from './officialPapers/nvo10Math2023';
import { NVO10_MATH_2022 } from './officialPapers/nvo10Math2022';
import { NVO10_MATH_2021 } from './officialPapers/nvo10Math2021';
import { NVO10_BIO_SAMPLES } from './integratedSamples/biology';
import { NVO10_CHEM_SAMPLES } from './integratedSamples/chemistry';
import { NVO10_PHYS_SAMPLES } from './integratedSamples/physics';
import { NVO10_GEO_SAMPLES } from './integratedSamples/geography';
import { NVO10_BEL_MODEL_2027 } from './integratedSamples/belModel2027';
import { DZI_MATH_2026 } from './officialPapers/dziMath2026';
import { NVO10_BEL_2026 } from './officialPapers/nvo10Bel2026';
import { NVO10_BEL_2025 } from './officialPapers/nvo10Bel2025';
import { NVO10_BEL_2024 } from './officialPapers/nvo10Bel2024';
import { NVO10_BEL_2023 } from './officialPapers/nvo10Bel2023';
import { NVO10_BEL_2022 } from './officialPapers/nvo10Bel2022';
import { NVO10_BEL_2021 } from './officialPapers/nvo10Bel2021';
import { DZI_BEL_2026 } from './officialPapers/dziBel2026';
import { DZI_BEL_2025 } from './officialPapers/dziBel2025';
import { DZI_BEL_2024 } from './officialPapers/dziBel2024';
import { DZI_BEL_2023 } from './officialPapers/dziBel2023';
import { DZI_BEL_2022 } from './officialPapers/dziBel2022';
import { DZI_BEL_2021 } from './officialPapers/dziBel2021';
import { DZI_MATH_2025 } from './officialPapers/dziMath2025';
import { DZI_MATH_2024 } from './officialPapers/dziMath2024';
import { DZI_MATH_2023 } from './officialPapers/dziMath2023';
import { DZI_MATH_2022 } from './officialPapers/dziMath2022';
import { DZI_MATH_2021 } from './officialPapers/dziMath2021';
import { DZI_PROFILE_PAPERS } from './dziProfilePapers';

/**
 * Пълни изпитни варианти за симулатора.
 *
 * Текущите два варианта са ТРЕНИРОВЪЧНИ (kind: 'practice'), съставени от StudyBG по точковата
 * структура на изпитите на МОН. Те НЕ са официални изпитни материали.
 * Официален вариант се добавя с kind: 'official' и задължителен officialSourceUrl
 * (връзка към PDF-а с условията и ключа на МОН) — validateExamPaper() го проверява.
 */
export const EXAM_PAPERS: ExamPaper[] = [
  // Официални варианти на МОН (условия и ключ от официалния PDF) — най-отгоре
  NVO10_MATH_2026,
  NVO10_MATH_2025,
  NVO10_MATH_2024,
  NVO10_MATH_2023,
  NVO10_MATH_2022,
  NVO10_MATH_2021,
  NVO10_BIO_SAMPLES,
  NVO10_CHEM_SAMPLES,
  NVO10_PHYS_SAMPLES,
  NVO10_GEO_SAMPLES,
  NVO10_BEL_MODEL_2027,
  NVO10_BEL_2026,
  NVO10_BEL_2025,
  NVO10_BEL_2024,
  NVO10_BEL_2023,
  NVO10_BEL_2022,
  NVO10_BEL_2021,
  DZI_MATH_2026,
  DZI_MATH_2025,
  DZI_MATH_2024,
  DZI_MATH_2023,
  DZI_MATH_2022,
  DZI_MATH_2021,
  DZI_BEL_2026,
  DZI_BEL_2025,
  DZI_BEL_2024,
  DZI_BEL_2023,
  DZI_BEL_2022,
  DZI_BEL_2021,
  ...DZI_PROFILE_PAPERS,

  // -------------------------------------------------------------------------
  // БЕЛ — ДЗИ (12. клас)
  // -------------------------------------------------------------------------
  {
    id: 'practice-dzi-bel-1',
    title: 'БЕЛ — ДЗИ, тренировъчен вариант 1',
    exam: 'ДЗИ',
    subject: 'Български език и литература',
    kind: 'practice',
    durationMinutes: 240,
    maxPoints: 100,
    gradeScale: DZI_SCALE,
    sections: [
      {
        id: 'bel-language',
        title: 'Част 1. Езикова култура (20 т.)',
        instructions: 'Изберете един верен отговор. Всяка задача носи 2 точки.',
        questions: [
          {
            id: 'bel1-q1', number: 1, kind: 'choice', points: 2,
            prompt: 'Коя дума е написана правилно?',
            options: ['обезсмислен', 'обесмислен', 'обезмислен', 'обесзмислен'],
            correctIndex: 0,
            explanation: 'Представката без- (обез-) запазва „з“ и пред беззвучна съгласна: обез + смислен → обезсмислен.'
          },
          {
            id: 'bel1-q2', number: 2, kind: 'choice', points: 2,
            prompt: 'В кое изречение е употребен правилно пълен член?',
            options: [
              'Учителят похвали ученикът.',
              'Ученикът реши задачата.',
              'Директорът награди победителят.',
              'Видях приятелят си в парка.'
            ],
            correctIndex: 1,
            explanation: 'Пълен член се пише при подлога („Ученикът реши…“). В другите изречения думите са допълнения и изискват кратък член: ученика, победителя, приятеля.'
          },
          {
            id: 'bel1-q3', number: 3, kind: 'choice', points: 2,
            prompt: 'В кое изречение запетаята е поставена правилно?',
            options: ['Знам че, ще успееш.', 'Знам че ще успееш.', 'Знам, че ще успееш.', 'Знам, че, ще успееш.'],
            correctIndex: 2,
            explanation: 'Подчиненото изречение, въведено със съюза „че“, се отделя със запетая пред съюза.'
          },
          {
            id: 'bel1-q4', number: 4, kind: 'choice', points: 2,
            prompt: 'Коя глаголна форма е в бъдеще време?',
            options: ['пишех', 'бях писал', 'ще пиша', 'писах'],
            correctIndex: 2,
            explanation: '„Ще пиша“ е бъдеще време (ще + сегашна форма на глагола).'
          },
          {
            id: 'bel1-q5', number: 5, kind: 'choice', points: 2,
            prompt: 'Коя дума е сложна (образувана от две основи)?',
            options: ['водар', 'водопад', 'воден', 'водичка'],
            correctIndex: 1,
            explanation: '„Водопад“ е образувана от основите вод- и пад- със съединителна гласна „о“.'
          },
          {
            id: 'bel1-q6', number: 6, kind: 'choice', points: 2,
            prompt: 'В кое изречение има грешка при съгласуването на подлога и сказуемото?',
            options: ['Тя е добра ученичка.', 'Те е добри приятели.', 'Ние сме готови.', 'Вие сте прави.'],
            correctIndex: 1,
            explanation: 'Подлогът „те“ е в множествено число и изисква „са“: „Те са добри приятели.“'
          },
          {
            id: 'bel1-q7', number: 7, kind: 'choice', points: 2,
            prompt: 'Кой е синоним на думата „смел“?',
            options: ['страхлив', 'тих', 'храбър', 'бавен'],
            correctIndex: 2,
            explanation: '„Храбър“ има същото значение като „смел“; „страхлив“ е антоним.'
          },
          {
            id: 'bel1-q8', number: 8, kind: 'choice', points: 2,
            prompt: 'Коя дума е написана правилно?',
            options: ['испитвам', 'изпитвам', 'исппитвам', 'изпитфам'],
            correctIndex: 1,
            explanation: 'Представката из- се пише със „з“ и пред беззвучна съгласна: изпит, изпитвам.'
          },
          {
            id: 'bel1-q9', number: 9, kind: 'choice', points: 2,
            prompt: 'Колко прости изречения има в сложното изречение „Когато звънецът би, учениците излязоха в двора.“?',
            options: ['едно', 'две', 'три', 'четири'],
            correctIndex: 1,
            explanation: 'Има две сказуеми („би“ и „излязоха“), следователно две прости изречения.'
          },
          {
            id: 'bel1-q10', number: 10, kind: 'choice', points: 2,
            prompt: 'Каква част на речта е думата „тихо“ в изречението „Той говори тихо.“?',
            options: ['прилагателно име', 'съществително име', 'глагол', 'наречие'],
            correctIndex: 3,
            explanation: '„Тихо“ пояснява глагола „говори“ (как говори?) — това е наречие за начин.'
          }
        ]
      },
      {
        id: 'bel-literature',
        title: 'Част 2. Литература (20 т.)',
        instructions: 'Изберете автора на произведението. Всяка задача носи 2 точки.',
        questions: [
          {
            id: 'bel1-q11', number: 11, kind: 'choice', points: 2,
            prompt: 'Кой е авторът на романа „Под игото“?',
            options: ['Алеко Константинов', 'Иван Вазов', 'Елин Пелин', 'Йордан Йовков'],
            correctIndex: 1,
            explanation: '„Под игото“ е роман на Иван Вазов.'
          },
          {
            id: 'bel1-q12', number: 12, kind: 'choice', points: 2,
            prompt: 'Кой е авторът на „Бай Ганьо“?',
            options: ['Алеко Константинов', 'Христо Ботев', 'Пенчо Славейков', 'Иван Вазов'],
            correctIndex: 0,
            explanation: '„Бай Ганьо“ е книга на Алеко Константинов.'
          },
          {
            id: 'bel1-q13', number: 13, kind: 'choice', points: 2,
            prompt: 'Кой е авторът на баладата „Хаджи Димитър“?',
            options: ['Иван Вазов', 'Пейо Яворов', 'Христо Ботев', 'Димчо Дебелянов'],
            correctIndex: 2,
            explanation: '„Хаджи Димитър“ е балада на Христо Ботев.'
          },
          {
            id: 'bel1-q14', number: 14, kind: 'choice', points: 2,
            prompt: 'Кой е авторът на поемата „Градушка“?',
            options: ['Пенчо Славейков', 'Пейо Яворов', 'Атанас Далчев', 'Никола Вапцаров'],
            correctIndex: 1,
            explanation: '„Градушка“ е поема на Пейо Яворов.'
          },
          {
            id: 'bel1-q15', number: 15, kind: 'choice', points: 2,
            prompt: 'Кой е авторът на поемата „Неразделни“?',
            options: ['Пенчо Славейков', 'Христо Смирненски', 'Елисавета Багряна', 'Пейо Яворов'],
            correctIndex: 0,
            explanation: '„Неразделни“ е поема на Пенчо Славейков.'
          },
          {
            id: 'bel1-q16', number: 16, kind: 'choice', points: 2,
            prompt: 'Кой е авторът на стихотворението „Аз искам да те помня все така…“?',
            options: ['Христо Ботев', 'Иван Вазов', 'Атанас Далчев', 'Димчо Дебелянов'],
            correctIndex: 3,
            explanation: 'Стихотворението е на Димчо Дебелянов.'
          },
          {
            id: 'bel1-q17', number: 17, kind: 'choice', points: 2,
            prompt: 'Кой е авторът на разказа „Песента на колелетата“?',
            options: ['Елин Пелин', 'Йордан Йовков', 'Иван Вазов', 'Алеко Константинов'],
            correctIndex: 1,
            explanation: '„Песента на колелетата“ е разказ на Йордан Йовков.'
          },
          {
            id: 'bel1-q18', number: 18, kind: 'choice', points: 2,
            prompt: 'Кой е авторът на романа „Железният светилник“?',
            options: ['Димитър Димов', 'Емилиян Станев', 'Димитър Талев', 'Иван Вазов'],
            correctIndex: 2,
            explanation: '„Железният светилник“ е роман на Димитър Талев.'
          },
          {
            id: 'bel1-q19', number: 19, kind: 'choice', points: 2,
            prompt: 'Кой е авторът на романа „Тютюн“?',
            options: ['Димитър Талев', 'Йордан Йовков', 'Елин Пелин', 'Димитър Димов'],
            correctIndex: 3,
            explanation: '„Тютюн“ е роман на Димитър Димов.'
          },
          {
            id: 'bel1-q20', number: 20, kind: 'choice', points: 2,
            prompt: 'Кой е авторът на стихотворението „Новото гробище над Сливница“?',
            options: ['Иван Вазов', 'Христо Ботев', 'Пейо Яворов', 'Христо Смирненски'],
            correctIndex: 0,
            explanation: '„Новото гробище над Сливница“ е стихотворение на Иван Вазов.'
          }
        ]
      },
      {
        id: 'bel-reading',
        title: 'Част 3. Четене с разбиране (20 т.)',
        instructions: 'Прочетете текста. Задачи 21–25 носят по 2 точки, задачи 26–27 — по 5 точки.',
        sourceText: {
          title: 'Петнадесетте минути',
          attribution: 'Текст, съставен от StudyBG за целите на упражнението.',
          text:
            'Библиотеката в малкия град отваря врати през 1927 г. Първите ѝ книги са дарени от учителите в местното училище. ' +
            'Днес фондът наброява 12 000 тома, а всяка събота доброволци четат приказки на най-малките посетители. ' +
            'Според директорката най-голямото предизвикателство не е липсата на книги, а липсата на време за четене. ' +
            'Затова библиотеката въвежда „петнадесетте минути“ — кратко четене в началото на всяка среща на читателския клуб.'
        },
        questions: [
          {
            id: 'bel1-q21', number: 21, kind: 'choice', points: 2,
            prompt: 'През коя година библиотеката отваря врати?',
            options: ['1917', '1927', '1937', '2007'],
            correctIndex: 1,
            explanation: 'В първото изречение: „отваря врати през 1927 г.“'
          },
          {
            id: 'bel1-q22', number: 22, kind: 'choice', points: 2,
            prompt: 'Кой дарява първите книги?',
            options: ['общината', 'доброволците', 'учителите в местното училище', 'читателският клуб'],
            correctIndex: 2,
            explanation: '„Първите ѝ книги са дарени от учителите в местното училище.“'
          },
          {
            id: 'bel1-q23', number: 23, kind: 'choice', points: 2,
            prompt: 'Кое според директорката е най-голямото предизвикателство?',
            options: ['липсата на книги', 'липсата на време за четене', 'липсата на доброволци', 'липсата на читатели'],
            correctIndex: 1,
            explanation: 'Текстът противопоставя двете: „не е липсата на книги, а липсата на време за четене“.'
          },
          {
            id: 'bel1-q24', number: 24, kind: 'choice', points: 2,
            prompt: 'Какво се случва всяка събота?',
            options: [
              'Доброволци четат приказки на най-малките посетители.',
              'Библиотеката получава нови книги.',
              'Провежда се среща на учителите.',
              'Библиотеката е затворена.'
            ],
            correctIndex: 0,
            explanation: '„…всяка събота доброволци четат приказки на най-малките посетители.“'
          },
          {
            id: 'bel1-q25', number: 25, kind: 'choice', points: 2,
            prompt: 'Каква е целта на „петнадесетте минути“?',
            options: [
              'да се съкрати продължителността на срещите',
              'да се отделя време за четене',
              'да се увеличи броят на книгите',
              'да се наберат нови доброволци'
            ],
            correctIndex: 1,
            explanation: 'Мярката е отговор на „липсата на време за четене“ — кратко четене в началото на всяка среща.'
          },
          {
            id: 'bel1-q26', number: 26, kind: 'short', points: 5, answerType: 'number',
            prompt: 'Колко тома наброява фондът на библиотеката днес? Отговорете с число.',
            acceptedAnswers: ['12000', '12 000', '12 хиляди', 'дванадесет хиляди', 'дванайсет хиляди'],
            explanation: '„Днес фондът наброява 12 000 тома.“'
          },
          {
            id: 'bel1-q27', number: 27, kind: 'short', points: 5, answerType: 'text',
            prompt: 'Как се нарича краткото четене в началото на срещите на читателския клуб?',
            acceptedAnswers: ['петнадесетте минути', 'петнадесет минути', '15 минути', '15-те минути', 'петнайсетте минути', 'петнайсет минути'],
            explanation: 'В последното изречение: „петнадесетте минути“.'
          }
        ]
      },
      {
        id: 'bel-writing',
        title: 'Част 4. Създаване на текст (40 т.)',
        instructions:
          'Задачата се оценява чрез самооценка по критериите и еталона, които се показват след предаване. Препоръчителен обем: 4–6 страници.',
        questions: [
          {
            id: 'bel1-q28', number: 28, kind: 'open', points: 40,
            prompt: 'Напишете есе по тезата: „Четенето е разговор, в който ние избираме събеседника.“',
            criteria: [
              { label: 'Разбиране на тезата и ясно формулирана позиция', points: 10 },
              { label: 'Аргументация с примери (литература, история, личен опит)', points: 12 },
              { label: 'Композиция: увод, изложение, заключение, логически връзки', points: 8 },
              { label: 'Езикова, правописна и пунктуационна норма', points: 10 }
            ],
            modelAnswer:
              'Силното есе формулира още в увода собствена позиция (напр. че изборът на книга е избор на ценности), развива 2–3 аргумента с конкретни примери ' +
              '(литературен герой, исторически документ, личен читателски опит), разглежда и противоположна гледна точка и завършва с обобщение, което не повтаря увода дословно.'
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // Математика — НВО 10. клас
  // -------------------------------------------------------------------------
  {
    id: 'practice-nvo10-math-1',
    title: 'Математика — НВО 10. клас, тренировъчен вариант 1',
    exam: 'НВО 10',
    subject: 'Математика',
    kind: 'practice',
    durationMinutes: 150,
    maxPoints: 100,
    gradeScale: null,
    formulaSheet: 'nvo10-math',
    sections: [
      {
        id: 'math-choice',
        title: 'Част 1. Задачи с избираем отговор (36 т.)',
        instructions: 'Изберете един верен отговор. Всяка задача носи 3 точки.',
        questions: [
          {
            id: 'math1-q1', number: 1, kind: 'choice', points: 3,
            prompt: 'Стойността на израза 2³ − 3² е:',
            options: ['−1', '1', '17', '−17'],
            correctIndex: 0,
            explanation: '2³ − 3² = 8 − 9 = −1.'
          },
          {
            id: 'math1-q2', number: 2, kind: 'choice', points: 3,
            prompt: 'Решението на уравнението 3x − 7 = 11 е:',
            options: ['4', '−6', '6', '18'],
            correctIndex: 2,
            explanation: '3x = 18 ⇒ x = 6.'
          },
          {
            id: 'math1-q3', number: 3, kind: 'choice', points: 3,
            prompt: 'Корените на уравнението x² − 5x + 6 = 0 са:',
            options: ['−2 и −3', '2 и 3', '1 и 6', '−1 и 6'],
            correctIndex: 1,
            explanation: 'x² − 5x + 6 = (x − 2)(x − 3) ⇒ x₁ = 2, x₂ = 3 (сбор 5, произведение 6 по Виет).'
          },
          {
            id: 'math1-q4', number: 4, kind: 'choice', points: 3,
            prompt: 'Ако a = −2, стойността на израза 3a² − a е:',
            options: ['10', '−14', '14', '−10'],
            correctIndex: 2,
            explanation: '3·(−2)² − (−2) = 3·4 + 2 = 14.'
          },
          {
            id: 'math1-q5', number: 5, kind: 'choice', points: 3,
            prompt: 'Катетите на правоъгълен триъгълник са 6 cm и 8 cm. Хипотенузата е:',
            options: ['10 cm', '12 cm', '14 cm', '√28 cm'],
            correctIndex: 0,
            explanation: 'По Питагоровата теорема: c² = 6² + 8² = 100 ⇒ c = 10 cm.'
          },
          {
            id: 'math1-q6', number: 6, kind: 'choice', points: 3,
            prompt: 'Сборът от вътрешните ъгли на изпъкнал шестоъгълник е:',
            options: ['540°', '720°', '900°', '1080°'],
            correctIndex: 1,
            explanation: '(n − 2)·180° = 4·180° = 720°.'
          },
          {
            id: 'math1-q7', number: 7, kind: 'choice', points: 3,
            prompt: 'sin 30° е равно на:',
            options: ['√3/2', '1', '1/2', '√2/2'],
            correctIndex: 2,
            explanation: 'sin 30° = 1/2.'
          },
          {
            id: 'math1-q8', number: 8, kind: 'choice', points: 3,
            prompt: 'Решенията на неравенството 2x − 4 > 0 са:',
            options: ['x < 2', 'x > 2', 'x > −2', 'x < −2'],
            correctIndex: 1,
            explanation: '2x > 4 ⇒ x > 2.'
          },
          {
            id: 'math1-q9', number: 9, kind: 'choice', points: 3,
            prompt: 'Средноаритметичното на числата 4, 7, 10 и 15 е:',
            options: ['8', '10', '36', '9'],
            correctIndex: 3,
            explanation: '(4 + 7 + 10 + 15) : 4 = 36 : 4 = 9.'
          },
          {
            id: 'math1-q10', number: 10, kind: 'choice', points: 3,
            prompt: 'Лицето на кръг с радиус 3 cm е:',
            options: ['6π cm²', '3π cm²', '18π cm²', '9π cm²'],
            correctIndex: 3,
            explanation: 'S = πr² = π·3² = 9π cm².'
          },
          {
            id: 'math1-q11', number: 11, kind: 'choice', points: 3,
            prompt: 'Ако f(x) = 2x + 1, то f(3) е равно на:',
            options: ['5', '6', '7', '9'],
            correctIndex: 2,
            explanation: 'f(3) = 2·3 + 1 = 7.'
          },
          {
            id: 'math1-q12', number: 12, kind: 'choice', points: 3,
            prompt: 'Най-малкото общо кратно на 6 и 8 е:',
            options: ['24', '48', '2', '14'],
            correctIndex: 0,
            explanation: '6 = 2·3, 8 = 2³ ⇒ НОК = 2³·3 = 24.'
          }
        ]
      },
      {
        id: 'math-short',
        title: 'Част 2. Задачи с кратък числов отговор (30 т.)',
        instructions: 'Запишете само числото. Всяка задача носи 5 точки.',
        questions: [
          {
            id: 'math1-q13', number: 13, kind: 'short', points: 5, answerType: 'number',
            prompt: 'Пресметнете: (−3)·(−4) − 20 : 5',
            acceptedAnswers: ['8'],
            explanation: '12 − 4 = 8 (първо умножение и деление, после изваждане).'
          },
          {
            id: 'math1-q14', number: 14, kind: 'short', points: 5, answerType: 'number',
            prompt: 'Намерете x от пропорцията x : 12 = 3 : 4.',
            acceptedAnswers: ['9'],
            explanation: 'x = 12·3 : 4 = 9.'
          },
          {
            id: 'math1-q15', number: 15, kind: 'short', points: 5, answerType: 'number',
            prompt: 'Цената на книга е 80 €. Тя се намалява с 15%. Каква е новата цена в евро?',
            acceptedAnswers: ['68'],
            explanation: '15% от 80 = 12 ⇒ 80 − 12 = 68 €'
          },
          {
            id: 'math1-q16', number: 16, kind: 'short', points: 5, answerType: 'number',
            prompt: 'Намерете сбора на корените на уравнението x² − 7x + 10 = 0.',
            acceptedAnswers: ['7'],
            explanation: 'По формулите на Виет x₁ + x₂ = 7 (корените са 2 и 5).'
          },
          {
            id: 'math1-q17', number: 17, kind: 'short', points: 5, answerType: 'number',
            prompt: 'В аритметична прогресия a₁ = 3 и d = 4. Намерете a₁₀.',
            acceptedAnswers: ['39'],
            explanation: 'a₁₀ = a₁ + 9d = 3 + 36 = 39.'
          },
          {
            id: 'math1-q18', number: 18, kind: 'short', points: 5, answerType: 'number',
            prompt: 'Намерете обема на куб с ръб 5 cm (в cm³).',
            acceptedAnswers: ['125'],
            explanation: 'V = a³ = 5³ = 125 cm³.'
          }
        ]
      },
      {
        id: 'math-open',
        title: 'Част 3. Задачи със свободен отговор (34 т.)',
        instructions: 'Запишете пълното решение. Оценява се чрез самооценка по критериите след предаване.',
        questions: [
          {
            id: 'math1-q19', number: 19, kind: 'open', points: 17,
            prompt: 'Решете системата: x + y = 7 и x − y = 1. Направете проверка.',
            criteria: [
              { label: 'Избран и коректно приложен метод (събиране или заместване)', points: 6 },
              { label: 'Намерено x = 4', points: 5 },
              { label: 'Намерено y = 3 и направена проверка', points: 6 }
            ],
            modelAnswer:
              'Събираме двете уравнения: 2x = 8 ⇒ x = 4. Заместваме в първото: 4 + y = 7 ⇒ y = 3. Проверка: 4 + 3 = 7 и 4 − 3 = 1. Отговор: (4; 3).'
          },
          {
            id: 'math1-q20', number: 20, kind: 'open', points: 17,
            prompt:
              'В правоъгълния триъгълник ABC (∠C = 90°) катетът AC = 5 cm, а хипотенузата AB = 13 cm. Намерете: а) катета BC; б) лицето на триъгълника; в) sin∠A.',
            criteria: [
              { label: 'а) BC = 12 cm (Питагорова теорема)', points: 6 },
              { label: 'б) S = 30 cm²', points: 5 },
              { label: 'в) sin∠A = 12/13', points: 6 }
            ],
            modelAnswer:
              'а) BC² = AB² − AC² = 169 − 25 = 144 ⇒ BC = 12 cm. б) S = AC·BC : 2 = 5·12 : 2 = 30 cm². в) sin∠A = BC : AB = 12/13.'
          }
        ]
      }
    ]
  }
];
