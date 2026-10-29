import type { ExamPaper } from '../../lib/examPaperScoring';
import { DIPPK_SCALE } from '../../lib/monGradeScale';

export const DIPPK_SOFTWARE_PRACTICE_1: ExamPaper = {
  id: 'practice-dippk-software-1',
  title: 'Системно и приложно програмиране — ДИППК (СПК III степен), тренировъчен вариант 1',
  exam: 'ДИППК',
  subject: 'Системно и приложно програмиране',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DIPPK_SCALE,
  formulaSheet: 'dzi-informatics',
  note:
    'Пълен тренировъчен вариант за Държавен изпит за придобиване на трета степен на професионална квалификация (СПК III) по специалностите „Системно програмиране“ и „Приложно програмиране“ (12. клас). Обхваща националната изпитна програма по ДОС: ООП и шаблони за дизайн, структури от данни и алгоритми, релационни бази от данни и SQL, уеб услуги (REST API), информационна сигурност, компютърни мрежи, DevOps и ЗБУТ.',
  sections: [
    {
      id: 'part-1',
      title: 'Част 1. Тестови задачи с избираем отговор (28 т.)',
      instructions: 'Изберете един верен отговор за всяка от задачите от 1. до 14. Всяка вярна задача носи 2 точки.',
      questions: [
        {
          id: 'dippk-soft-q1',
          number: 1,
          kind: 'choice',
          points: 2,
          prompt:
            'Кой принцип от SOLID в обектно-ориентираното проектиране гласи, че обектите от производен клас трябва да могат да заместват обекти от базовия си клас, без да нарушават коректността и очакваното поведение на програмата?',
          options: [
            'Принцип за единствена отговорност (Single Responsibility Principle)',
            'Принцип на заместване на Лисков (Liskov Substitution Principle)',
            'Принцип за разделяне на интерфейсите (Interface Segregation Principle)',
            'Принцип за обръщане на зависимостите (Dependency Inversion Principle)'
          ],
          correctIndex: 1,
          explanation:
            'Принципът на Барбара Лисков (LSP — буквата L в SOLID) изисква всеки подклас да спазва договора на базовия клас, така че полиморфната замяна да не води до неочаквани изключения или нарушена инвариантност.'
        },
        {
          id: 'dippk-soft-q2',
          number: 2,
          kind: 'choice',
          points: 2,
          prompt:
            'Кой поведенчески шаблон за дизайн (Design Pattern от каталога на GoF) дефинира зависимост „един към много“ между обекти, така че при промяна в състоянието на един обект (Subject) всички абонирани за него обекти да бъдат уведомявани и обновявани автоматично?',
          options: [
            'Singleton (Единак)',
            'Factory Method (Фабричен метод)',
            'Observer (Наблюдател)',
            'Adapter (Адаптер)'
          ],
          correctIndex: 2,
          explanation:
            'Шаблонът Observer (Наблюдател / Publish–Subscribe) стои в основата на събитийно-ориентираното програмиране и реактивните потребителски интерфейси: субектът уведомява всички регистрирани наблюдатели при промяна на състоянието си.'
        },
        {
          id: 'dippk-soft-q3',
          number: 3,
          kind: 'choice',
          points: 2,
          prompt:
            'Каква е средната асимптотична времева сложност на операцията за търсене на елемент по ключ в добре балансирана хеш-таблица (Hash Table) с равномерна хеш-функция и нисък коефициент на запълване?',
          options: [
            '$O(1)$',
            '$O(\\log n)$',
            '$O(n)$',
            '$O(n \\log n)$'
          ],
          correctIndex: 0,
          explanation:
            'При равномерно разпределение на ключовете и ограничен коефициент на запълване индексът на кофата се изчислява директно чрез хеш-функцията за константно средно време $O(1)$.'
        },
        {
          id: 'dippk-soft-q4',
          number: 4,
          kind: 'choice',
          points: 2,
          prompt:
            'Кое условие е необходимо и достатъчно една релационна таблица, която вече се намира във Втора нормална форма (2NF), да удовлетворява и Трета нормална форма (3NF)?',
          options: [
            'Таблицата да съдържа поне три външни ключа към други таблици',
            'Всички колони в таблицата да бъдат от целочислен тип данни',
            'Никой неключов атрибут да не зависи транзитивно от първичния ключ чрез друг неключов атрибут',
            'Първичният ключ задължително да бъде съставен от поне две колони'
          ],
          correctIndex: 2,
          explanation:
            'Преходът от 2NF към 3NF изисква премахване на всички транзитивни функционални зависимости от вида $PK \\to A \\to B$, където $A$ и $B$ са неключови атрибути.'
        },
        {
          id: 'dippk-soft-q5',
          number: 5,
          kind: 'choice',
          points: 2,
          prompt:
            'Каква е разликата между SQL клаузите INNER JOIN и LEFT JOIN при съединяване на таблицата Customers (отляво) с таблицата Orders (отдясно)?',
          options: [
            'LEFT JOIN връща всички редове от Customers, включително клиентите без поръчки (за които полетата от Orders са NULL), докато INNER JOIN връща само клиентите със съвпадащи поръчки',
            'INNER JOIN връща всички редове и от двете таблици, а LEFT JOIN изтрива дублираните записи',
            'LEFT JOIN може да се използва само върху таблици без първичен ключ',
            'Няма разлика в резултата, но LEFT JOIN винаги се изпълнява два пъти по-бързо'
          ],
          correctIndex: 0,
          explanation:
            'LEFT OUTER JOIN запазва всички редове от лявата таблица и допълва липсващите съответствия от дясната таблица със стойности NULL, докато INNER JOIN изисква съвпадение и в двете таблици.'
        },
        {
          id: 'dippk-soft-q6',
          number: 6,
          kind: 'choice',
          points: 2,
          prompt:
            'Кое свойство от групата ACID гарантира, че при възникване на грешка по време на банкова транзакция (например срив след дебитиране на едната сметка, но преди кредитиране на другата) всички междинни промени се отменят напълно (Rollback)?',
          options: [
            'Изолираност (Isolation)',
            'Атомарност (Atomicity)',
            'Дълготрайност (Durability)',
            'Мащабируемост (Scalability)'
          ],
          correctIndex: 1,
          explanation:
            'Атомарността (Atomicity) третира транзакцията като неделима единица по принципа „всичко или нищо“ — или всички операции завършват успешно (COMMIT), или нито една не оставя следа (ROLLBACK).'
        },
        {
          id: 'dippk-soft-q7',
          number: 7,
          kind: 'choice',
          points: 2,
          prompt:
            'Какъв е основният компромис при добавяне на множество вторични B-Tree индекси върху таблица в релационна база от данни?',
          options: [
            'Заявките за четене (SELECT с WHERE и JOIN) се ускоряват, но операциите за запис (INSERT, UPDATE, DELETE) се забавят и се заема допълнително дисково пространство',
            'Заявките SELECT се забавят многократно, а операциите INSERT стават мигновени',
            'Таблицата губи възможността да участва в транзакции',
            'Индексите автоматично шифроват паролите на потребителите'
          ],
          correctIndex: 0,
          explanation:
            'B-Tree индексът намалява сложността на търсене от $O(n)$ до $O(\\log n)$, но при всяка промяна на данните (INSERT, UPDATE, DELETE) СУБД трябва да обновява и балансира и самите индексни дървета.'
        },
        {
          id: 'dippk-soft-q8',
          number: 8,
          kind: 'choice',
          points: 2,
          prompt:
            'Според спецификацията на протокола HTTP/1.1 и архитектурния стил REST кой от следните HTTP методи НЕ е идемпотентен?',
          options: [
            'GET',
            'PUT',
            'DELETE',
            'POST'
          ],
          correctIndex: 3,
          explanation:
            'Един HTTP метод е идемпотентен, ако многократното изпълнение на една и съща заявка има същия ефект върху състоянието на сървъра като еднократното (GET, PUT, DELETE). Повторното изпращане на POST обикновено създава нов дублиран ресурс.'
        },
        {
          id: 'dippk-soft-q9',
          number: 9,
          kind: 'choice',
          points: 2,
          prompt:
            'Клиентско приложение изпраща заявка с валиден JWT токен на успешно вписан потребител с роля „Читател“, който се опитва да изтрие административен ресурс. Кой HTTP статус код е най-коректно да върне REST сървърът?',
          options: [
            '401 Unauthorized',
            '403 Forbidden',
            '404 Not Found',
            '400 Bad Request'
          ],
          correctIndex: 1,
          explanation:
            'Код 401 означава липсваща или невалидна автентикация (сървърът не знае кой е потребителят). Код 403 Forbidden означава, че самоличността е установена успешно, но потребителят няма права (авторизация) за исканото действие.'
        },
        {
          id: 'dippk-soft-q10',
          number: 10,
          kind: 'choice',
          points: 2,
          prompt:
            'Коя е най-надеждната защита срещу атаки от тип SQL инжекция (SQL Injection) при разработка на бекенд приложение?',
          options: [
            'Проверка на дължината на входните полета единствено чрез JavaScript в браузъра',
            'Използване на параметризирани заявки (Prepared Statements) и свързани параметри вместо конкатенация на низове',
            'Скриване на имената на таблиците чрез кодиране в Base64',
            'Изпълняване на всички заявки през акаунта на системния администратор на базата'
          ],
          correctIndex: 1,
          explanation:
            'При Prepared Statements SQL планът се компилира предварително, а потребителският вход се предава отделно като литерален параметър и никога не се интерпретира като изпълним SQL код.'
        },
        {
          id: 'dippk-soft-q11',
          number: 11,
          kind: 'choice',
          points: 2,
          prompt:
            'Защо при съхранение на потребителски пароли в база от данни се използват специализирани бавни хеш-функции с уникална сол (като Argon2id или bcrypt) вместо бързи алгоритми като SHA-256 без сол?',
          options: [
            'Защото Argon2id и bcrypt позволяват обратно декриптиране на оригиналната парола от администратора',
            'Защото уникалната сол обезсилва предварително изчислените таблици (Rainbow Tables), а високата изчислителна цена забавя атаките с груба сила (Brute-Force)',
            'Защото SHA-256 генерира твърде къс низ от само 4 символа',
            'Защото релационните бази от данни не приемат шестнадесетични символи'
          ],
          correctIndex: 1,
          explanation:
            'Криптографската сол прави хеша на две еднакви пароли различен (защита срещу Rainbow Tables), а настроимият фактор на натоварване (work factor / памет) при bcrypt и Argon2 прави тестването на милиарди пароли в секунда чрез GPU нерентабилно.'
        },
        {
          id: 'dippk-soft-q12',
          number: 12,
          kind: 'choice',
          points: 2,
          prompt:
            'В каква последователност се обменят управляващите флагове при тристъпковото ръкостискане (Three-Way Handshake) за установяване на надеждна TCP връзка между клиент и сървър?',
          options: [
            'ACK -> SYN -> FIN',
            'SYN -> SYN-ACK -> ACK',
            'GET -> POST -> 200 OK',
            'DNS -> ARP -> ICMP'
          ],
          correctIndex: 1,
          explanation:
            'Клиентът инициира връзката със сегмент SYN, сървърът потвърждава и изпраща своя начален номер със SYN-ACK, а клиентът финализира установяването на сесията с ACK.'
        },
        {
          id: 'dippk-soft-q13',
          number: 13,
          kind: 'choice',
          points: 2,
          prompt:
            'Каква е фундаменталната разлика между Docker Image (образ) и Docker Container (контейнер)?',
          options: [
            'Docker Image е неизменяем (read-only) шаблон със слоеве от файловата система и зависимостите, а Docker Container е работеща изолирана инстанция на този образ със собствен записваем слой',
            'Docker Image работи само под Windows, а Docker Container — само под Linux',
            'Docker Container е текстовият файл с инструкции за компилиране, а Docker Image е виртуална машина с пълен хипервайзор',
            'Между двете понятия няма разлика — те са синоними'
          ],
          correctIndex: 0,
          explanation:
            'Подобно на отношението между клас и обект в ООП, Docker Image е статичният артефакт (създаден чрез Dockerfile), докато контейнерът е стартираният изолиран процес с добавен тънък read-write слой.'
        },
        {
          id: 'dippk-soft-q14',
          number: 14,
          kind: 'choice',
          points: 2,
          prompt:
            'Съгласно изискванията за здравословни и безопасни условия на труд (ЗБУТ) при работа с видеодисплеи (Наредба № 7), как трябва да бъде разположен мониторът спрямо очите на оператора и източниците на светлина?',
          options: [
            'Горният край на екрана да бъде на нивото на очите или малко под него на разстояние 50–70 cm, без директни отблясъци от прозорци или осветителни тела върху дисплея',
            'Центърът на екрана да е на 30 cm над нивото на очите, а мониторът да е обърнат директно срещу силен прозорец без щори',
            'Разстоянието от очите до екрана да бъде под 20 cm при напълно изключено общо осветление в помещението',
            'Работата с видеодисплей да се извършва непрекъснато 8 часа без физиологични почивки'
          ],
          correctIndex: 0,
          explanation:
            'Правилната ергономична поза изисква горният ръб на монитора да не надвишава нивото на очите, дистанция около една протегната ръка (50–70 cm), перпендикулярно разположение спрямо прозорците за избягване на заслепяване и редовни периодични почивки за зрението.'
        }
      ]
    },
    {
      id: 'part-2',
      title: 'Част 2. Професионални изчислителни и казусни задачи (32 т.)',
      instructions:
        'Решете задачите от 15. до 20. При числовите отговори запишете само числовата стойност. При задачите с подточки попълнете всяка част според данните в условието и таблицата.',
      questions: [
        {
          id: 'dippk-soft-q15',
          number: 15,
          kind: 'short',
          answerType: 'number',
          points: 4,
          prompt:
            'Системен администратор конфигурира локална подмрежа за сървърен сегмент с IPv4 адрес и префикс `192.168.10.0/26`. Колко е максималният брой използваеми хост адреси (за сървъри и маршрутизатор) в тази подмрежа?',
          acceptedAnswers: ['62'],
          explanation:
            'При маска `/26` за хост частта остават $32 - 26 = 6$ бита. Общият брой адреси е $2^6 = 64$. След изваждане на адреса на мрежата (`192.168.10.0`) и адреса за широкоразпръскване — broadcast (`192.168.10.63`), остават $64 - 2 = 62$ използваеми хост адреса.'
        },
        {
          id: 'dippk-soft-q16',
          number: 16,
          kind: 'short',
          answerType: 'number',
          points: 4,
          prompt:
            'В сортиран възходящо масив от $n = 1024$ уникални цели числа се търси елемент чрез алгоритъма за двоично търсене (Binary Search). Най-много колко сравнения с централен елемент ще извърши алгоритъмът в най-лошия случай (когато търсеният елемент липсва или се намира при последната стъпка)? Приемете $\\lfloor \\log_2 n \\rfloor + 1$.',
          acceptedAnswers: ['11'],
          explanation:
            'Тъй като $1024 = 2^{10}$, в най-лошия случай интервалът за търсене се разполовява $10$ пъти до достигане на единичен елемент, за който се прави още $1$ сравнение: $\\lfloor \\log_2 1024 \\rfloor + 1 = 10 + 1 = 11$ сравнения.'
        },
        {
          id: 'dippk-soft-q17',
          number: 17,
          kind: 'short',
          answerType: 'number',
          points: 5,
          prompt:
            'Дадена е следната рекурсивна функция `calc(n)` за цяло неотрицателно число `n`:\n- ако `n <= 1`, връща `2`;\n- иначе връща `calc(n - 1) + 3 * calc(n - 2)`.\nКаква числова стойност ще върне извикването `calc(4)`?',
          acceptedAnswers: ['32'],
          explanation:
            'Пресмятаме последователно от базовите случаи:\n- $\\text{calc}(0) = 2$\n- $\\text{calc}(1) = 2$\n- $\\text{calc}(2) = \\text{calc}(1) + 3 \\cdot \\text{calc}(0) = 2 + 3 \\cdot 2 = 8$\n- $\\text{calc}(3) = \\text{calc}(2) + 3 \\cdot \\text{calc}(1) = 8 + 3 \\cdot 2 = 14$\n- $\\text{calc}(4) = \\text{calc}(3) + 3 \\cdot \\text{calc}(2) = 14 + 3 \\cdot 8 = 32$.'
        },
        {
          id: 'dippk-soft-q18',
          number: 18,
          kind: 'short',
          answerType: 'text',
          points: 5,
          prompt:
            'Коя ключова дума (клауза) в езика SQL се използва задължително след `GROUP BY`, за да се филтрират вече групираните записи по условие върху агрегатна функция (например `COUNT(OrderId) >= 5`)?',
          acceptedAnswers: ['HAVING', 'HAVING клауза', 'клауза HAVING'],
          explanation:
            'Клаузата `WHERE` филтрира отделните редове преди групирането и не допуска агрегатни функции, докато `HAVING` се прилага след `GROUP BY` за филтриране на самите агрегирани групи.'
        },
        {
          id: 'dippk-soft-q19',
          number: 19,
          kind: 'multi',
          points: 7,
          prompt:
            'В релационна база от данни на облачна платформа се съхранява таблицата `ServiceLogs`, отразяваща заявките към микросървиси през последния час. Анализирайте данните в таблицата и отговорете на подточките.',
          stimulus: [
            {
              kind: 'table',
              caption: 'Таблица ServiceLogs — отчетени трафик метрики по микросървиси',
              head: ['LogId', 'ServiceName', 'HttpStatus', 'RequestsCount', 'AvgResponseMs'],
              rows: [
                ['1', 'auth-service', '200', '400', '25'],
                ['2', 'auth-service', '401', '100', '15'],
                ['3', 'billing-service', '200', '150', '80'],
                ['4', 'billing-service', '500', '50', '200'],
                ['5', 'catalog-service', '200', '300', '30']
              ]
            }
          ],
          parts: [
            {
              id: 'a',
              label: 'А)',
              points: 2,
              prompt:
                'Какво число ще върне SQL заявката: `SELECT SUM(RequestsCount) FROM ServiceLogs WHERE HttpStatus = 200;`?',
              answer: { type: 'number', acceptedAnswers: ['850'], unit: 'заявки' }
            },
            {
              id: 'b',
              label: 'Б)',
              points: 3,
              prompt:
                'Изчислете среднопретегленото време за отговор (в ms) за всички заявки към микросървиса `auth-service` (сумата от произведенията `RequestsCount * AvgResponseMs`, разделена на общия брой заявки към `auth-service`).',
              answer: { type: 'number', acceptedAnswers: ['23'], unit: 'ms' }
            },
            {
              id: 'c',
              label: 'В)',
              points: 2,
              prompt:
                'Колко процента (%) от всички заявки към `billing-service` са завършили със сървърна грешка (`HttpStatus = 500`)?',
              answer: { type: 'number', acceptedAnswers: ['25'], unit: '%' }
            }
          ],
          explanation:
            'А) Записите със статус `200` са с `LogId` 1, 3 и 5: $400 + 150 + 300 = 850$ заявки.\nБ) За `auth-service` общият брой заявки е $400 + 100 = 500$. Общото време е $400 \\cdot 25 + 100 \\cdot 15 = 10\\,000 + 1500 = 11\\,500\\text{ ms}$. Среднопретегленото време е $\\frac{11\\,500}{500} = 23\\text{ ms}$.\nВ) Общият брой заявки към `billing-service` е $150 + 50 = 200$, от които $50$ са със статус `500`: $\\frac{50}{200} \\cdot 100\\% = 25\\%$.'
        },
        {
          id: 'dippk-soft-q20',
          number: 20,
          kind: 'multi',
          points: 7,
          prompt:
            'Екип по DevOps и системна администрация планира капацитета на сървърен клъстер и архивното съхранение (Backup) за 3 среди, описани в таблицата по-долу.',
          stimulus: [
            {
              kind: 'table',
              caption: 'Конфигурация на контейнерните среди в клъстера',
              head: ['Среда', 'Брой контейнери', 'RAM памет на 1 контейнер (GB)', 'Дневен обем логове (GB/ден)', 'Период на съхранение (дни)'],
              rows: [
                ['Production', '6', '4', '12', '30'],
                ['Staging', '2', '2', '3', '10'],
                ['Development', '4', '1.5', '1', '5']
              ]
            }
          ],
          parts: [
            {
              id: 'a',
              label: 'А)',
              points: 2,
              prompt:
                'Колко гигабайта (GB) е общата оперативна памет (RAM), резервирана за всички контейнери в трите среди общо?',
              answer: { type: 'number', acceptedAnswers: ['34'], unit: 'GB' }
            },
            {
              id: 'b',
              label: 'Б)',
              points: 3,
              prompt:
                'Колко гигабайта (GB) дисково пространство са необходими за съхранение на всички логове от трите среди за съответните им периоди на съхранение (без компресия)?',
              answer: { type: 'number', acceptedAnswers: ['395'], unit: 'GB' }
            },
            {
              id: 'c',
              label: 'В)',
              points: 2,
              prompt:
                'Ако архивната система компресира всички съхранявани логове с коефициент на намаляване на обема от $60\\%$ (т.е. след компресията размерът става $40\\%$ от първоначалния), колко гигабайта (GB) ще заема компресираният архив?',
              answer: { type: 'number', acceptedAnswers: ['158'], unit: 'GB' }
            }
          ],
          explanation:
            'А) Обща RAM памет: $6 \\cdot 4 + 2 \\cdot 2 + 4 \\cdot 1{,}5 = 24 + 4 + 6 = 34\\text{ GB}$.\nБ) Общ некомпресиран обем логове: $12 \\cdot 30 + 3 \\cdot 10 + 1 \\cdot 5 = 360 + 30 + 5 = 395\\text{ GB}$.\nВ) След намаляване с $60\\%$ остават $40\\%$ от $395\\text{ GB}$: $395 \\cdot 0{,}40 = 158\\text{ GB}$.'
        }
      ]
    },
    {
      id: 'part-3',
      title: 'Част 3. Практическо дипломиращо задание по ДОС (40 т.)',
      instructions:
        'Разработете пълните решения на двете практически задания (задачи 21. и 22.). След предаване сравнете кода и архитектурата си с еталонното решение и оценете изпълнението си по посочените критерии.',
      questions: [
        {
          id: 'dippk-soft-q21',
          number: 21,
          kind: 'open',
          points: 20,
          prompt:
            'Практическо задание 1 — Обектно-ориентирано проектиране, структури от данни и алгоритми (на C#, Java или Python):\n\nРазработва се модул за управление на абонаментни облачни услуги в софтуерна компания.\n\n1. Дефинирайте абстрактен базов клас `CloudResource` с капсулирани свойства/полета:\n   - `Id` (непразен символен низ — при празна стойност се хвърля `ArgumentException` / `ValueError`);\n   - `BaseMonthlyCost` (положително реално число в евро — при стойност $\\le 0$ се хвърля изключение);\n   - абстрактен метод `CalculateMonthlyBill()`, който връща крайната месечна цена.\n2. Дефинирайте два производни класа:\n   - `ComputeInstance`, който добавя брой процесорни ядра `CpuCores` (цяло число $\\ge 1$) и пресмята месечната сметка по формулата: $\\text{BaseMonthlyCost} + 12{,}50 \\cdot \\text{CpuCores}$;\n   - `DatabaseCluster`, който добавя дисково пространство `StorageGb` (реално число $> 0$) и флаг за висока наличност `HighAvailability` (булева стойност). Базовата сума заедно с паметта е $\\text{BaseMonthlyCost} + 0{,}20 \\cdot \\text{StorageGb}$, а ако `HighAvailability == true`, крайната сума се умножава по $1{,}5$.\n3. Имплементирайте клас `BillingService`, който поддържа колекция от ресурси и предоставя методи за:\n   - добавяне на ресурс с проверка за уникалност на `Id` за $O(1)$ средно време (чрез `Dictionary` / `HashMap` / `dict`);\n   - връщане на списък с ресурсите, чиято месечна сметка надвишава зададен праг `minBill`, сортирани низходящо по месечна сметка, а при равенство — възходящо по `Id`.\n4. Напишете кратък единичен тест (Unit Test), който проверява коректното пресмятане при `DatabaseCluster` с активирана висока наличност и хвърлянето на изключение при невалидна базова цена.',
          criteria: [
            {
              label: 'Коректно дефиниран абстрактен клас CloudResource с капсулация, валидация на входните данни и абстрактен метод CalculateMonthlyBill()',
              points: 5
            },
            {
              label: 'Правилно наследяване и полиморфна имплементация на ComputeInstance и DatabaseCluster (вкл. коефициент 1,5 за HighAvailability)',
              points: 5
            },
            {
              label: 'Ефективна колекция с проверка за дублиран Id за O(1) чрез хеш-структура и коректно филтриране и двукритериално сортиране в BillingService',
              points: 6
            },
            {
              label: 'Написан модулен тест (Unit Test) за изчислението на таксата и за граничния случай с невалидна цена',
              points: 4
            }
          ],
          modelAnswer:
            '```csharp\nusing System;\nusing System.Collections.Generic;\nusing System.Linq;\n\npublic abstract class CloudResource\n{\n    private string id;\n    private double baseMonthlyCost;\n\n    public string Id\n    {\n        get => id;\n        private set\n        {\n            if (string.IsNullOrWhiteSpace(value))\n                throw new ArgumentException("Идентификаторът не може да бъде празен.");\n            id = value;\n        }\n    }\n\n    public double BaseMonthlyCost\n    {\n        get => baseMonthlyCost;\n        private set\n        {\n            if (value <= 0)\n                throw new ArgumentException("Базовата месечна цена трябва да е положителна.");\n            baseMonthlyCost = value;\n        }\n    }\n\n    protected CloudResource(string id, double baseMonthlyCost)\n    {\n        Id = id;\n        BaseMonthlyCost = baseMonthlyCost;\n    }\n\n    public abstract double CalculateMonthlyBill();\n}\n\npublic class ComputeInstance : CloudResource\n{\n    public int CpuCores { get; }\n\n    public ComputeInstance(string id, double baseMonthlyCost, int cpuCores)\n        : base(id, baseMonthlyCost)\n    {\n        if (cpuCores < 1)\n            throw new ArgumentException("Броят ядра трябва да е поне 1.");\n        CpuCores = cpuCores;\n    }\n\n    public override double CalculateMonthlyBill()\n    {\n        return BaseMonthlyCost + 12.50 * CpuCores;\n    }\n}\n\npublic class DatabaseCluster : CloudResource\n{\n    public double StorageGb { get; }\n    public bool HighAvailability { get; }\n\n    public DatabaseCluster(string id, double baseMonthlyCost, double storageGb, bool highAvailability)\n        : base(id, baseMonthlyCost)\n    {\n        if (storageGb <= 0)\n            throw new ArgumentException("Дисковото пространство трябва да е положително.");\n        StorageGb = storageGb;\n        HighAvailability = highAvailability;\n    }\n\n    public override double CalculateMonthlyBill()\n    {\n        double total = BaseMonthlyCost + 0.20 * StorageGb;\n        return HighAvailability ? total * 1.5 : total;\n    }\n}\n\npublic class BillingService\n{\n    private readonly Dictionary<string, CloudResource> resourcesById = new Dictionary<string, CloudResource>();\n\n    public void RegisterResource(CloudResource resource)\n    {\n        if (resource == null)\n            throw new ArgumentNullException(nameof(resource));\n        if (resourcesById.ContainsKey(resource.Id))\n            throw new InvalidOperationException("Вече съществува ресурс с този идентификатор.");\n        resourcesById.Add(resource.Id, resource);\n    }\n\n    public List<CloudResource> GetExpensiveResources(double minBill)\n    {\n        return resourcesById.Values\n            .Where(r => r.CalculateMonthlyBill() > minBill)\n            .OrderByDescending(r => r.CalculateMonthlyBill())\n            .ThenBy(r => r.Id)\n            .ToList();\n    }\n}\n\n// Примерен модулен тест (xUnit / NUnit логика):\npublic static class BillingTests\n{\n    public static void RunTests()\n    {\n        var db = new DatabaseCluster("db-prod-01", 100.0, 200.0, true);\n        double expected = (100.0 + 0.20 * 200.0) * 1.5; // 140 * 1.5 = 210.0\n        if (Math.Abs(db.CalculateMonthlyBill() - expected) > 1e-6)\n            throw new Exception("Грешка при изчисляване на сметката за DatabaseCluster.");\n\n        bool threwException = false;\n        try\n        {\n            var invalid = new ComputeInstance("vm-01", -50.0, 4);\n        }\n        catch (ArgumentException)\n        {\n            threwException = true;\n        }\n        if (!threwException)\n            throw new Exception("Липсва очаквано ArgumentException при отрицателна базова цена.");\n    }\n}\n```'
        },
        {
          id: 'dippk-soft-q22',
          number: 22,
          kind: 'open',
          points: 20,
          prompt:
            'Практическо задание 2 — Релационни бази от данни, SQL транзакции и сигурен REST API ендпойнт:\n\nДадена е схема на база от данни за управление на складови наличности и клиентски поръчки:\n- `Products(ProductId INT PRIMARY KEY, Sku VARCHAR(32) UNIQUE NOT NULL, Name VARCHAR(120) NOT NULL, UnitPrice DECIMAL(10,2) NOT NULL, StockQty INT NOT NULL CHECK (StockQty >= 0))`\n- `Customers(CustomerId INT PRIMARY KEY, Email VARCHAR(120) UNIQUE NOT NULL, CompanyName VARCHAR(120) NOT NULL)`\n- `Orders(OrderId INT PRIMARY KEY, CustomerId INT NOT NULL, CreatedAt DATETIME NOT NULL, Status VARCHAR(20) NOT NULL)`\n- `OrderItems(OrderId INT NOT NULL, ProductId INT NOT NULL, Quantity INT NOT NULL CHECK (Quantity > 0), UnitPriceAtOrder DECIMAL(10,2) NOT NULL, PRIMARY KEY (OrderId, ProductId))`\n\nИзпълнете следните четири подзадачи:\n1. Напишете SQL DDL команди за добавяне на външните ключове (`FOREIGN KEY`) в таблицата `OrderItems` и създаване на индекс върху `(CustomerId, CreatedAt)` в таблицата `Orders` за оптимизиране на справките по клиент и период.\n2. Напишете аналитична SQL заявка (`SELECT`), която извежда `CustomerId`, `CompanyName`, общия брой поръчки и общата стойност на закупените артикули (`SUM(Quantity * UnitPriceAtOrder)`) за всички клиенти със статус на поръчката `\'COMPLETED\'`, чиято обща сума на покупките е над `5000.00`, подредени по обща сума в намаляващ ред.\n3. Напишете SQL транзакция, която при покупка на `5` броя от продукт с `ProductId = 42` за поръчка `OrderId = 1001` (при цена `120.00`) намалява наличността в `Products`, добавя запис в `OrderItems` и гарантира атомарност.\n4. Опишете (или напишете примерен бекенд код) как трябва да бъде реализиран REST ендпойнтът `POST /api/v1/orders`, така че да бъде защитен срещу SQL инжекции, да изисква валиден JWT токен и да връща коректни HTTP статус кодове при успех (`201 Created`), невалиден вход (`400 Bad Request`) и недостатъчна наличност (`409 Conflict`).',
          criteria: [
            {
              label: 'Коректни DDL оператори за FOREIGN KEY ограниченията в OrderItems и създаване на индекс CREATE INDEX върху Orders(CustomerId, CreatedAt)',
              points: 4
            },
            {
              label: 'Вярна аналитична SQL заявка с INNER JOIN между трите таблици, WHERE Status = \'COMPLETED\', GROUP BY, HAVING SUM(...) > 5000 и ORDER BY DESC',
              points: 6
            },
            {
              label: 'Коректна атомарна SQL транзакция (BEGIN TRANSACTION ... COMMIT / ROLLBACK) с актуализиране на StockQty и вмъкване в OrderItems',
              points: 5
            },
            {
              label: 'Сигурен дизайн на POST /api/v1/orders с параметризирани заявки, проверка на JWT, валидация на входа и правилни HTTP статус кодове (201, 400, 409)',
              points: 5
            }
          ],
          modelAnswer:
            '```sql\n-- 1. Външни ключове и композитен индекс за производителност:\nALTER TABLE OrderItems\nADD CONSTRAINT FK_OrderItems_Orders\n    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE,\nADD CONSTRAINT FK_OrderItems_Products\n    FOREIGN KEY (ProductId) REFERENCES Products(ProductId);\n\nCREATE INDEX IX_Orders_Customer_CreatedAt\nON Orders (CustomerId, CreatedAt DESC);\n\n-- 2. Справка за топ корпоративни клиенти със завършени поръчки над 5000 евро:\nSELECT\n    c.CustomerId,\n    c.CompanyName,\n    COUNT(DISTINCT o.OrderId) AS CompletedOrdersCount,\n    SUM(oi.Quantity * oi.UnitPriceAtOrder) AS TotalRevenue\nFROM Customers c\nINNER JOIN Orders o ON c.CustomerId = o.CustomerId\nINNER JOIN OrderItems oi ON o.OrderId = oi.OrderId\nWHERE o.Status = \'COMPLETED\'\nGROUP BY c.CustomerId, c.CompanyName\nHAVING SUM(oi.Quantity * oi.UnitPriceAtOrder) > 5000.00\nORDER BY TotalRevenue DESC;\n\n-- 3. Атомарна транзакция за резервиране на наличност и добавяне на ред в поръчка:\nBEGIN TRANSACTION;\n\nUPDATE Products\nSET StockQty = StockQty - 5\nWHERE ProductId = 42 AND StockQty >= 5;\n\n-- Ако UPDATE засегне 1 ред, вмъкваме артикула и потвърждаваме транзакцията;\n-- в противен случай изпълняваме ROLLBACK:\nINSERT INTO OrderItems (OrderId, ProductId, Quantity, UnitPriceAtOrder)\nVALUES (1001, 42, 5, 120.00);\n\nCOMMIT;\n```\n\n**4. Архитектура и защита на REST API ендпойнта `POST /api/v1/orders`:**\n- **Автентикация и авторизация:** Middleware проверява заглавието `Authorization: Bearer <token>`, валидира криптографския подпис и срока на валидност (`exp`) на JWT токена и извлича `customerId` директно от удостоверения токен (а не от тялото на заявката, за да се предотврати IDOR уязвимост). При липсващ/невалиден токен връща `401 Unauthorized`.\n- **Валидация на входа:** Проверява се дали списъкът с артикули не е празен и дали всяко `quantity > 0`. При нарушение веднага се връща `400 Bad Request`.\n- **Защита от SQL инжекции и конкурентен достъп:** Всички SQL команди се изпълняват чрез параметризирани заявки (`PreparedStatement` / параметри `@ProductId`, `@Qty`) в рамките на транзакция. Ако `UPDATE Products ... WHERE ProductId = @ProductId AND StockQty >= @Qty` засегне `0` реда, транзакцията се отменя (`ROLLBACK`) и сървърът връща `409 Conflict`.\n- **Успешен отговор:** След `COMMIT` сървърът връща статус `201 Created` със заглавие `Location: /api/v1/orders/1001` и JSON представяне на създадената поръчка.'
        }
      ]
    }
  ]
};
