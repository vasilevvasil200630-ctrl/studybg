import type { ExamPaper } from '../../lib/examPaperScoring';
import { DZI_SCALE } from '../../lib/monGradeScale';

export const DZI_EN_B2_PRACTICE_1: ExamPaper = {
  id: 'practice-dzi-en-b2-1',
  title: 'Английски език (профилирана подготовка, ниво B2) — Втори ДЗИ, тренировъчен вариант 1',
  exam: 'ДЗИ',
  subject: 'Английски език',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Тренировъчен вариант за Втори ДЗИ по английски език (профилирана подготовка, ниво B2 по ОЕЕР). Включва Четене с разбиране и Езикови задачи с избираем отговор (36 т.), Трансформации и словообразуване с кратък отговор (24 т.) и Създаване на два писмени текста (40 т.). Оценката е по единната скала на МОН за ДЗИ.',
  sections: [
    {
      id: 'en-reading-use',
      title: 'Част 1. Reading Comprehension & Use of English (36 т.)',
      instructions: 'Прочетете текста и отговорете на въпроси 1.–5., след което изберете верния отговор за задачи 6.–12. Всяка задача носи 3 точки.',
      sourceText: {
        title: 'The Quiet Architecture of Urban Forests',
        text: `For much of the twentieth century, municipal planners treated street trees primarily as ornamental accessories—pleasant green borders installed after roads, utilities, and commercial blocks had already been engineered. Over the past two decades, however, empirical research in urban climatology and public health has fundamentally altered that perspective. Far from being passive decoration, a mature urban canopy functions as critical infrastructure capable of lowering peak summer surface temperatures by up to 12 °C and reducing particulate air pollution along congested corridors by nearly a quarter.\n\nYet planting thousands of saplings is rarely sufficient on its own. Newly planted trees in dense metropolitan areas face compacted soils, restricted root volumes, and acute water stress, resulting in mortality rates that often exceed 30 percent within the first five years. Cities that have succeeded in expanding their canopy—from Melbourne to Ljubljana—have done so by redesigning the underground environment first: installing structural soil cells that support pavement loads while leaving uncompacted space for roots, and routing stormwater runoff directly into tree pits rather than into concrete drains. Moreover, ecologists warn against monoculture planting. Relying on a single resilient species leaves an entire city vulnerable to emerging pests; true urban resilience requires biodiversity across genera, age classes, and canopy layers.`,
        attribution: 'Учебен научнопопулярен текст за ниво B2 (StudyBG)'
      },
      questions: [
        {
          id: 'dzi-enb2-q1', number: 1, kind: 'choice', points: 3,
          prompt: 'According to the first paragraph, how has the perception of urban trees changed in recent decades?',
          options: [
            'They are now viewed as essential functional infrastructure rather than mere decoration.',
            'They have replaced underground utilities as the primary focus of municipal budgets.',
            'Planners now prefer ornamental shrubs over mature street trees along busy roads.',
            'Research has shown that street trees have a negligible effect on summer temperatures.'
          ],
          correctIndex: 0,
          explanation: 'Текстът посочва, че дърветата вече не се разглеждат като пасивна декорация („ornamental accessories“), а като критична инфраструктура („critical infrastructure“).'
        },
        {
          id: 'dzi-enb2-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Why do newly planted saplings in large cities frequently fail to survive their first five years?',
          options: [
            'Excessive rainfall floods the concrete drains around their roots.',
            'They suffer from compressed soil, limited space for roots, and lack of water.',
            'Citizens object to the shade cast on commercial buildings.',
            'Municipalities plant too many different tree species in the same pit.'
          ],
          correctIndex: 1,
          explanation: 'Във втория абзац са изброени причините: „compacted soils, restricted root volumes, and acute water stress“.'
        },
        {
          id: 'dzi-enb2-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'What engineering solution has helped cities like Melbourne and Ljubljana sustain healthy urban trees?',
          options: [
            'Replacing all pavement with open grass fields in city centres.',
            'Using structural soil cells and directing rainwater into tree pits.',
            'Importing exclusively tropical tree species resistant to heat.',
            'Pruning tree canopies every autumn to reduce water consumption.'
          ],
          correctIndex: 1,
          explanation: 'Успешните градове препроектират подземната среда чрез „structural soil cells“ и отвеждане на дъждовната вода директно към корените.'
        },
        {
          id: 'dzi-enb2-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Why do ecologists advise against planting a single tree species across an entire city?',
          options: [
            'Single-species forests grow too rapidly and damage road surfaces.',
            'Monocultures make the whole urban canopy susceptible to a single pest outbreak.',
            'Monoculture trees absorb less carbon dioxide than ornamental flowers.',
            'Uniform street trees are more expensive to purchase from nurseries.'
          ],
          correctIndex: 1,
          explanation: 'В края на текста се подчертава: „Relying on a single resilient species leaves an entire city vulnerable to emerging pests“.'
        },
        {
          id: 'dzi-enb2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'The word "acute" in paragraph 2 ("acute water stress") is closest in meaning to:',
          options: ['severe', 'gradual', 'artificial', 'accidental'],
          correctIndex: 0,
          explanation: 'В този контекст „acute“ означава остър, сериозен, тежък („severe“).'
        },
        {
          id: 'dzi-enb2-q6', number: 6, kind: 'choice', points: 3,
          prompt: 'Choose the correct option to complete the sentence:\nHardly ________ the research findings when several municipalities revised their urban planning guidelines.',
          options: [
            'had the institute published',
            'the institute had published',
            'did the institute published',
            'has the institute publish'
          ],
          correctIndex: 0,
          explanation: 'След отрицателно или ограничително наречие в началото на изречението („Hardly... when“) се използва инверсия с Past Perfect: „Hardly had the institute published...“.'
        },
        {
          id: 'dzi-enb2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Choose the correct option to complete the sentence:\nHad the committee allocated sufficient funds last year, the renovation project ________ behind schedule now.',
          options: [
            'would not be',
            'will not be',
            'would not have been',
            'had not been'
          ],
          correctIndex: 0,
          explanation: 'Смесено условно изречение (Mixed Conditional — Type 3 + Type 2): минало условие („Had the committee allocated... last year“) с резултат в настоящето („...now“) изисква „would not be“.'
        },
        {
          id: 'dzi-enb2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Choose the correct option to complete the sentence:\nThe new battery prototype is reported ________ twice as much energy as conventional lithium-ion cells.',
          options: ['to store', 'storing', 'that it stores', 'to have been stored'],
          correctIndex: 0,
          explanation: 'Конструкцията за страдателен залог с глаголи на съобщаването („is reported / is believed / is known“) се свързва с инфинитив: „is reported to store“.'
        },
        {
          id: 'dzi-enb2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Choose the word that best fits the gap:\nThe internship offered graduates an ________ opportunity to work alongside leading marine biologists.',
          options: ['invaluable', 'pricelessly', 'worthless', 'unvalued'],
          correctIndex: 0,
          explanation: '„Invaluable“ означава „неоценим, изключително полезен“ и образува устойчиво словосъчетание с „opportunity“.'
        },
        {
          id: 'dzi-enb2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Choose the phrasal verb that best fits the gap:\nDespite the initial scepticism, the young architect managed to ________ her innovative proposal at the board meeting.',
          options: ['put across', 'put off', 'bring up with', 'turn down'],
          correctIndex: 0,
          explanation: 'Фразовият глагол „put across“ означава „излагам ясно и убедително идея/предложение“.'
        },
        {
          id: 'dzi-enb2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Choose the correct option to complete the sentence:\nIt is high time local authorities ________ stricter regulations on industrial noise pollution.',
          options: ['enforced', 'enforce', 'have enforced', 'will enforce'],
          correctIndex: 0,
          explanation: 'След структурата „It is (high) time + подлог“ се използва Past Simple („enforced“) за действие, което вече е трябвало да се случи.'
        },
        {
          id: 'dzi-enb2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Choose the correct preposition to complete the sentence:\nCompliance ________ international data protection standards is mandatory for all cloud service providers.',
          options: ['with', 'to', 'for', 'at'],
          correctIndex: 0,
          explanation: 'Съществителното „compliance“ се свързва с предлога „with“ („compliance with standards / rules“).'
        }
      ]
    },
    {
      id: 'en-short-use',
      title: 'Част 2. Word Formation & Sentence Transformations (24 т.)',
      instructions: 'Запишете точната дума или липсващия граматичен израз. Всяка задача носи 4 точки.',
      questions: [
        {
          id: 'dzi-enb2-q13', number: 13, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Use the word in brackets to form a word that fits in the gap:\nThe rapid ________ (GROW) of renewable energy networks has reduced the region’s reliance on imported coal.',
          acceptedAnswers: ['growth'],
          explanation: 'След определителния член и прилагателното („The rapid ...“) е необходимо съществителното име „growth“.'
        },
        {
          id: 'dzi-enb2-q14', number: 14, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Use the word in brackets to form a word that fits in the gap:\nEven minor calculation errors can have ________ (DISASTER) consequences in aerospace engineering.',
          acceptedAnswers: ['disastrous'],
          explanation: 'От съществителното „disaster“ се образува прилагателното „disastrous“ (пагубни, катастрофални).'
        },
        {
          id: 'dzi-enb2-q15', number: 15, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Use the word in brackets to form a word that fits in the gap:\nParticipants whose applications are ________ (COMPLETE) will be asked to submit the missing documents by Friday.',
          acceptedAnswers: ['incomplete'],
          explanation: 'Контекстът („missing documents“) изисква отрицателното прилагателно „incomplete“ (непълни).'
        },
        {
          id: 'dzi-enb2-q16', number: 16, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Complete the second sentence so that it has a similar meaning to the first, using the word REGRET (write 2 to 4 words):\n"I wish I hadn’t shared my password with anyone," said Alex.\nAlex ________ his password with anyone.',
          acceptedAnswers: ['regretted sharing', 'regretted having shared', 'regrets sharing', 'regrets having shared'],
          explanation: 'Глаголът „regret“ за минало действие приема герундий: „regretted sharing“ / „regretted having shared“.'
        },
        {
          id: 'dzi-enb2-q17', number: 17, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Complete the second sentence so that it has a similar meaning to the first, using the passive voice (write 3 words):\nExperts expect that the new railway line will cut travel time by half.\nThe new railway line ________ to cut travel time by half.',
          acceptedAnswers: ['is expected'],
          explanation: 'Страдателната конструкция е „The new railway line is expected to cut...“.'
        },
        {
          id: 'dzi-enb2-q18', number: 18, kind: 'short', points: 4, answerType: 'text',
          prompt: 'Complete the second sentence so that it has a similar meaning to the first, using UNLESS (write 2 to 3 words):\nThe conference will be held outdoors if it does not rain tomorrow.\nThe conference will be held outdoors ________ tomorrow.',
          acceptedAnswers: ['unless it rains'],
          explanation: 'Съюзът „unless“ означава „освен ако не“ и изисква положителна глаголна форма в Present Simple: „unless it rains“.'
        }
      ]
    },
    {
      id: 'en-writing',
      title: 'Част 3. Writing (40 т.)',
      instructions: 'Създайте два писмени текста на английски език по зададените условия. Оценяват се чрез самооценка по критериите на МОН за ниво B2.',
      questions: [
        {
          id: 'dzi-enb2-q19', number: 19, kind: 'open', points: 15,
          prompt: 'Task 1 (120–130 words): Your school has received a grant to improve student well-being and study spaces. Write a formal proposal email to the School Principal suggesting two specific improvements (e.g., a quiet reading lounge and outdoor study tables) and explaining how they will benefit students.',
          criteria: [
            { label: 'Съдържателно съответствие: посочени са 2 конкретни предложения и ползите от тях за учениците', points: 5 },
            { label: 'Логическа структура, официален регистър (formal register) и свързващи думи', points: 4 },
            { label: 'Богат речников запас на ниво B2 и точна употреба на колокации', points: 3 },
            { label: 'Граматична правилност и правопис', points: 3 }
          ],
          modelAnswer:
            'Dear Mr Petrov,\n\nI am writing on behalf of the Student Council in response to the announcement regarding the school well-being grant. Having consulted students across all year groups, I would like to propose two practical improvements.\n\nFirst, converting the unused room next to the library into a quiet study lounge equipped with ergonomic seating and task lighting would give twelfth-grade students a calm environment to prepare for their matriculation exams during free periods. Second, installing shaded wooden tables in the courtyard would encourage students to spend breaks outdoors, reducing screen fatigue and improving concentration in afternoon lessons.\n\nBoth initiatives require minimal maintenance while directly supporting academic performance and mental health. Thank you for considering our proposal.\n\nYours sincerely,\n[Student Name]'
        },
        {
          id: 'dzi-enb2-q20', number: 20, kind: 'open', points: 25,
          prompt: 'Task 2 (200–220 words): Write an argumentative essay on the following topic:\n"Artificial intelligence tools can assist students in finding information quickly, but they cannot replace critical thinking and independent problem-solving." To what extent do you agree or disagree? Support your viewpoint with clear arguments and examples.',
          criteria: [
            { label: 'Ясна теза и пълно разгръщане на аргументацията с конкретни примери', points: 8 },
            { label: 'Кохерентност, абзацно членение и разнообразни дискурсни маркери (furthermore, nevertheless, consequently)', points: 6 },
            { label: 'Лексикално богатство и академичен стил на ниво B2', points: 6 },
            { label: 'Сложна синтактична структура (условни изречения, причастни конструкции, страдателен залог) и правописна точност', points: 5 }
          ],
          modelAnswer:
            'In recent years, generative artificial intelligence has transformed how students search for information and organise their coursework. While such tools undoubtedly accelerate routine research, I firmly agree that they cannot substitute for genuine critical thinking and independent problem-solving.\n\nOn the one hand, AI platforms are remarkably efficient at summarising lengthy articles, explaining unfamiliar terminology, and generating practice questions. When used responsibly, they act as accessible tutors that help learners overcome initial obstacles. Nevertheless, information retrieval is merely the first step in education. True intellectual growth occurs when a student evaluates conflicting sources, identifies logical fallacies, and synthesises original conclusions.\n\nFurthermore, over-reliance on automated answers carries a serious cognitive cost. If students delegate essay writing or mathematical reasoning to algorithms, they deprive themselves of the productive struggle that strengthens analytical skills. In real-world professions—from medicine to engineering—specialists must make ethical judgements and solve unprecedented problems where no pre-trained model has a ready answer.\n\nIn conclusion, artificial intelligence should be embraced as a supportive instrument rather than an intellectual crutch. Only by cultivating independent inquiry and critical judgement can education prepare young people for the complexities of the modern world.'
        }
      ]
    }
  ]
};
