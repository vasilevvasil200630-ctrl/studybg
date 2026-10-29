import type { ExamPaper } from '../../../lib/examPaperScoring';
import { DZI_SCALE } from '../../../lib/monGradeScale';

export const DZI_EN_B2_PRACTICE_2: ExamPaper = {
  id: 'practice-dzi-en-b2-2',
  title: 'Английски език (профилирана подготовка, ниво B2) — Втори ДЗИ, тренировъчен вариант 2',
  exam: 'ДЗИ',
  subject: 'Английски език',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Втори тренировъчен вариант за Втори ДЗИ по английски език (профилирана подготовка, ниво B2 по ОЕЕР). Включва Reading Comprehension & Use of English (36 т.), Sentence Transformations & Word Formation (24 т.) и Writing — две писмени задачи (40 т.).',
  sections: [
    {
      id: 'en2-reading-use',
      title: 'Част 1. Reading Comprehension & Use of English (36 т.)',
      instructions: 'Прочетете текста и отговорете на въпроси 1.–5., след което изберете верния отговор за задачи 6.–12. Всяка задача носи 3 точки.',
      sourceText: {
        title: 'The Economics and Psychology of the Repair Movement',
        text: `For decades, modern consumer manufacturing operated on a straightforward linear assumption: products were designed, purchased, used until a single component failed, and subsequently discarded. In recent years, however, a growing coalition of engineers, consumer advocates, and European policymakers has challenged this model through the "Right to Repair" movement. Under newly adopted European Union directives, manufacturers of household appliances, smartphones, and laptops are increasingly required to supply spare parts, diagnostic documentation, and modular designs that can be disassembled with standard tools rather than proprietary adhesives.\n\nYet legislation alone does not guarantee that citizens will repair rather than replace. Behavioural economists point out that consumers frequently overestimate the cost of professional repair while underestimating the remaining lifespan of a refurbished device. Furthermore, psychological "upgrade fatigue" works in both directions: while aggressive marketing encourages premature replacement, hands-on repair workshops—known as Repair Cafés—have demonstrated that individuals who participate in fixing an object develop a stronger sense of ownership and environmental agency. Ultimately, transitioning to a circular economy depends as much on restoring technical confidence among everyday users as on rewriting industrial standards.`,
        attribution: 'Научнопопулярен текст за ниво B2 (StudyBG)',
      },
      questions: [
        {
          id: 'dzi-enb2v2-q1', number: 1, kind: 'choice', points: 3,
          prompt: 'What is the main requirement introduced by recent European Union "Right to Repair" directives?',
          options: [
            'Consumers must return all broken electronics to the original factory within two years.',
            'Manufacturers must provide spare parts, documentation, and designs that allow easier disassembly.',
            'Independent repair shops are prohibited from servicing smartphones without proprietary glue.',
            'Retailers are obliged to replace every faulty appliance with a brand-new model free of charge.',
          ],
          correctIndex: 1,
          explanation: 'Първият абзац посочва, че директивите на ЕС изискват от производителите да предоставят резервни части, диагностична документация и модулен дизайн, разглобяем със стандартни инструменти.',
        },
        {
          id: 'dzi-enb2v2-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Why do manufacturers use "proprietary adhesives" according to the context of the first paragraph?',
          options: [
            'To make devices easier to recycle in municipal facilities.',
            'In ways that hinder disassembly with standard tools.',
            'To comply with environmental agency regulations.',
            'To increase the weight and battery capacity of laptops.',
          ],
          correctIndex: 1,
          explanation: 'В текста „modular designs that can be disassembled with standard tools rather than proprietary adhesives“ противопоставя модулния дизайн на специализираните лепила, които затрудняват ремонта.',
        },
        {
          id: 'dzi-enb2v2-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'What cognitive bias do behavioural economists observe among consumers?',
          options: [
            'They believe that repairing a device costs more and lasts less time than it actually does.',
            'They assume that all household appliances are completely immune to mechanical failure.',
            'They prefer attending Repair Cafés rather than buying any new technology.',
            'They consistently underestimate the price of new smartphones.',
          ],
          correctIndex: 0,
          explanation: 'Във втория абзац е посочено: „consumers frequently overestimate the cost of professional repair while underestimating the remaining lifespan of a refurbished device“.',
        },
        {
          id: 'dzi-enb2v2-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'What effect do "Repair Cafés" have on participants?',
          options: [
            'They train professional factory inspectors for large corporations.',
            'They foster a stronger attachment to objects and a sense of personal capability.',
            'They lobby against European Union environmental directives.',
            'They distribute free brand-new laptops to university students.',
          ],
          correctIndex: 1,
          explanation: 'Участниците в Repair Cafés развиват „a stronger sense of ownership and environmental agency“.',
        },
        {
          id: 'dzi-enb2v2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'What is the author’s concluding argument in the passage?',
          options: [
            'A circular economy requires both industrial regulation and greater technical confidence among citizens.',
            'Only government penalties can change consumer habits in the twenty-first century.',
            'Repairing electronics is economically unviable in modern cities.',
            'Standard tools are no longer suitable for repairing household appliances.',
          ],
          correctIndex: 0,
          explanation: 'Финалното изречение обобщава, че преходът към кръгова икономика зависи както от индустриалните стандарти, така и от възстановяването на техническата увереност на потребителите.',
        },
        {
          id: 'dzi-enb2v2-q6', number: 6, kind: 'choice', points: 3,
          prompt: 'Choose the correct option to complete the sentence:\n"No sooner ________ the new software update than several compatibility issues emerged."',
          options: [
            'they had installed',
            'had they installed',
            'did they installed',
            'have they install',
          ],
          correctIndex: 1,
          explanation: 'След отрицателния наречен израз „No sooner“ в началото на изречението се използва инверсия с Past Perfect: „No sooner had they installed… than…“.',
        },
        {
          id: 'dzi-enb2v2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Choose the correct option to complete the sentence:\n"Had the expedition leader checked the barometer more carefully, the climbers ________ caught in the blizzard."',
          options: [
            'would not be',
            'would not have been',
            'will not be',
            'had not been',
          ],
          correctIndex: 1,
          explanation: 'Трето условно наклонение (Third Conditional) с инверсия в подчиненото изречение („Had the leader checked…“) за нереално минало събитие: в главното изречение се употребява „would not have been“.',
        },
        {
          id: 'dzi-enb2v2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Choose the correct option to complete the sentence:\n"The municipal council insisted that the historic bridge ________ restored according to its original nineteenth-century blueprints."',
          options: [
            'is being',
            'be',
            'was',
            'to be',
          ],
          correctIndex: 1,
          explanation: 'След глаголи за настояване/препоръка като „insist that…“ във висок регистър (Subjunctive mood) се употребява основната форма на глагола без „to“: „that the bridge be restored“.',
        },
        {
          id: 'dzi-enb2v2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Choose the word that best fits the context:\n"The documentary provided a ________ account of how oceanic currents regulate global climate patterns."',
          options: [
            'compelling',
            'compulsory',
            'compliant',
            'complacent',
          ],
          correctIndex: 0,
          explanation: '„A compelling account“ означава убедителен и завладяващ разказ/анализ (compulsory = задължителен, compliant = отстъпчив/съобразен, complacent = самодоволен).',
        },
        {
          id: 'dzi-enb2v2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Choose the correct phrasal verb to complete the sentence:\n"Due to unforeseen logistical delays, the organizing committee had to ________ the international conference until November."',
          options: [
            'put off',
            'put up with',
            'call for',
            'turn down',
          ],
          correctIndex: 0,
          explanation: '„Put off“ означава „отлагам“ (postpone). „Put up with“ = търпя, „call for“ = изисквам, „turn down“ = отхвърлям.',
        },
        {
          id: 'dzi-enb2v2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Choose the correct option to complete the sentence:\n"By the end of this academic year, Dr. Koleva ________ at the university for exactly two decades."',
          options: [
            'will be lecturing',
            'will have been lecturing',
            'is lecturing',
            'has lectured',
          ],
          correctIndex: 1,
          explanation: 'За действие, което ще е продължавало определен период от време („for two decades“) до даден бъдещ момент („By the end of this academic year“), се използва Future Perfect Continuous: „will have been lecturing“.',
        },
        {
          id: 'dzi-enb2v2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Choose the correct preposition to complete the sentence:\n"All laboratory personnel must strictly adhere ________ the safety protocols outlined in the manual."',
          options: ['with', 'to', 'at', 'for'],
          correctIndex: 1,
          explanation: 'Глаголът „adhere“ се употребява с предлога „to“ („adhere to safety protocols“ = спазвам стриктно).',
        },
      ],
    },
    {
      id: 'en2-transformations',
      title: 'Част 2. Word Formation & Sentence Transformations (24 т.)',
      instructions: 'Запишете точната словоформа (задачи 13.–15.) или липсващата част от трансформираното изречение (задачи 16.–18.). Всяка задача носи 4 точки.',
      questions: [
        {
          id: 'dzi-enb2v2-q13', number: 13, kind: 'short', answerType: 'text', points: 4,
          prompt: 'Use the word in brackets to form a word that fits the gap:\n"The rapid ________ (DETERIORATE) of the coastal wetlands alarmed marine biologists."',
          acceptedAnswers: ['deterioration'],
          explanation: 'След определителния член и прилагателното („The rapid …“) е необходимо съществително име: DETERIORATE → deterioration (влошаване/разрушаване).',
        },
        {
          id: 'dzi-enb2v2-q14', number: 14, kind: 'short', answerType: 'text', points: 4,
          prompt: 'Use the word in brackets to form a word that fits the gap:\n"Finding a ________ (SUSTAIN) balance between economic growth and resource conservation is the central challenge of our century."',
          acceptedAnswers: ['sustainable'],
          explanation: 'Пред съществителното „balance“ е необходимо прилагателно име: SUSTAIN → sustainable (устойчив).',
        },
        {
          id: 'dzi-enb2v2-q15', number: 15, kind: 'short', answerType: 'text', points: 4,
          prompt: 'Use the word in brackets to form a word that fits the gap:\n"Despite the witness’s ________ (RELUCTANT) to testify, the investigation proceeded on schedule."',
          acceptedAnswers: ['reluctance'],
          explanation: 'След притежателната форма („witness’s …“) е необходимо съществително име: RELUCTANT → reluctance (неохота/нежелание).',
        },
        {
          id: 'dzi-enb2v2-q16', number: 16, kind: 'short', answerType: 'text', points: 4,
          prompt: 'Complete the second sentence so that it has a similar meaning to the first, using the word REGRET (write between 2 and 5 words):\nFirst sentence: "I wish I had not shared my password with anyone."\nSecond sentence: "I ________________________ my password with anyone."',
          acceptedAnswers: ['regret sharing', 'regret having shared'],
          explanation: 'Съжаление за минало действие след глагола „regret“ се изразява с герундий: „regret sharing“ или „regret having shared“.',
        },
        {
          id: 'dzi-enb2v2-q17', number: 17, kind: 'short', answerType: 'text', points: 4,
          prompt: 'Complete the second sentence so that it has a similar meaning to the first, using the word BELIEVED (write between 3 and 5 words):\nFirst sentence: "Archaeologists think that the ancient harbour was destroyed by an earthquake."\nSecond sentence: "The ancient harbour ________________________ been destroyed by an earthquake."',
          acceptedAnswers: ['is believed to have'],
          explanation: 'Безлична страдателна конструкция със сложен перфектен инфинитив за минало събитие: „The ancient harbour is believed to have been destroyed…“.',
        },
        {
          id: 'dzi-enb2v2-q18', number: 18, kind: 'short', answerType: 'text', points: 4,
          prompt: 'Complete the second sentence so that it has a similar meaning to the first, using the word UNLESS (write between 2 and 5 words):\nFirst sentence: "We will not be able to launch the satellite if the wind speed does not drop."\nSecond sentence: "We will not be able to launch the satellite ________________________."',
          acceptedAnswers: ['unless the wind speed drops'],
          explanation: '„Unless“ означава „if … not“, затова след него глаголът е в положителна форма в Present Simple: „unless the wind speed drops“.',
        },
      ],
    },
    {
      id: 'en2-writing',
      title: 'Част 3. Writing (40 т.)',
      instructions: 'Създайте двата писмени текста според указанията. Оценете се по официалните критерии на МОН след предаване.',
      questions: [
        {
          id: 'dzi-enb2v2-q19', number: 19, kind: 'open', points: 15,
          prompt: 'Task 1 (Formal Report / Proposal — 120–130 words): Your school has received a grant to modernize its library and study spaces. Write a formal proposal to the school principal suggesting how the funds should be allocated (e.g., quiet study pods, digital databases, extended opening hours) and explaining how these changes will benefit students.',
          criteria: [
            { label: 'Изпълнение на комуникативната задача и покриване на всички подточки в обема 120–130 думи', points: 4 },
            { label: 'Структура и официален регистър (заглавие, подзаглавия, логически свързващи думи, без разговорен език)', points: 4 },
            { label: 'Богатство и точност на лексиката (ниво B2)', points: 4 },
            { label: 'Граматическа правилност и правопис', points: 3 },
          ],
          modelAnswer: `Proposal: Modernization of the School Library and Study Spaces

Introduction
The purpose of this proposal is to outline the most effective allocation of the recent modernization grant in order to transform our school library into a contemporary learning hub.

1. Acoustic Study Pods and Collaborative Zones
First, I recommend dividing the main hall into two distinct areas: soundproof individual booths for focused exam preparation and a separate collaborative zone equipped with interactive whiteboards for group projects.

2. Digital Academic Subscriptions
Second, a portion of the budget should be invested in institutional access to international scientific journals and e-book repositories, enabling twelfth-grade students to conduct reliable research.

Conclusion
Implementing these measures will significantly enhance students' academic performance and foster independent research habits across all grade levels.`,
        },
        {
          id: 'dzi-enb2v2-q20', number: 20, kind: 'open', points: 25,
          prompt: 'Task 2 (Argumentative Essay — 200–220 words): "Should artificial intelligence tools be integrated into high school assessment, or do they undermine students’ independent critical thinking?" Write a well-structured argumentative essay expressing your opinion, supported by clear arguments and examples.',
          criteria: [
            { label: 'Съдържателна пълнота, ясна теза и убедителна аргументация с примери (200–220 думи)', points: 7 },
            { label: 'Логическа организация в абзаци (увод, теза, аргументи, контрааргумент, заключение) и кохезия', points: 6 },
            { label: 'Лексикално богатство, идиоматичност и академичен стил (ниво B2)', points: 6 },
            { label: 'Граматичен обхват и точност (сложни синтактични конструкции, условни изречения, пасив, инверсия)', points: 6 },
          ],
          modelAnswer: `The rapid proliferation of generative artificial intelligence has sparked an intense debate among educators: should AI tools be incorporated into secondary school assessment, or do they erode students' capacity for independent thought? In my view, while unrestricted reliance on AI poses genuine risks, thoughtfully regulated integration can actually strengthen analytical skills.

Admittedly, critics rightly point out that using automated tools to draft essays or solve equations bypasses the cognitive effort required to master fundamental concepts. If students delegate problem-solving to algorithms before developing their own reasoning, their critical thinking and linguistic precision inevitably suffer.

However, banning technology altogether is neither realistic nor pedagogically sound. When assessments are redesigned so that students must critically evaluate, fact-check, and refine AI-generated outputs, the classroom shifts from passive memorization to higher-order analysis. For instance, asking learners to identify logical fallacies or historical inaccuracies in a machine-generated text demands deep subject knowledge and independent judgement. Combined with supervised oral defences and in-class writing components, such an approach ensures academic integrity.

In conclusion, artificial intelligence undermines critical thinking only when it replaces human effort. By combining traditional foundational training with critical AI literacy, schools can prepare graduates for the intellectual demands of the modern world.`,
        },
      ],
    },
  ],
};
