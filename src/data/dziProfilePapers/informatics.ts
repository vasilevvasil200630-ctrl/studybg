import type { ExamPaper } from '../../lib/examPaperScoring';
import { DZI_SCALE } from '../../lib/monGradeScale';

const t = String.raw;

export const DZI_INF_PRACTICE_1: ExamPaper = {
  id: 'practice-dzi-inf-1',
  title: 'Информатика (профилирана подготовка) — Втори ДЗИ, тренировъчен вариант 1',
  exam: 'ДЗИ',
  subject: 'Информатика',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Тренировъчен вариант за Втори ДЗИ по информатика (профилирана подготовка — 11. и 12. клас). Включва 15 задачи с избираем отговор по структури от данни, алгоритми, ООП и SQL (45 т.), 5 задачи с кратък отговор (25 т.) и 2 практически задачи със свободен отговор — обектно-ориентиран модел с алгоритъм и релационна база от данни със SQL заявки (30 т.).',
  sections: [
    {
      id: 'inf-part1',
      title: 'Част 1. Задачи с избираем отговор (45 т.)',
      instructions: 'Изберете един верен отговор. Всяка задача носи 3 точки.',
      questions: [
        {
          id: 'dzi-inf-q1', number: 1, kind: 'choice', points: 3,
          prompt: t`Каква е асимптотичната времева сложност в най-лошия случай на алгоритъма за двоично търсене (Binary Search) в сортиран масив с $n$ елемента?`,
          options: [t`$O(\log n)$`, t`$O(n)$`, t`$O(n \log n)$`, t`$O(n^2)$`],
          correctIndex: 0,
          explanation: t`На всяка стъпка двоичното търсене разполовява интервала за търсене, затова извършва най-много $\lfloor\log_2 n\rfloor + 1$ сравнения — сложност $O(\log n)$.`
        },
        {
          id: 'dzi-inf-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Коя линейна динамична структура от данни работи по принципа LIFO (Last In, First Out — последен влязъл, първи излязъл)?',
          options: ['Стек (Stack)', 'Опашка (Queue)', 'Едносвързан списък с достъп по индекс', 'Хеш-таблица'],
          correctIndex: 0,
          explanation: 'Стекът позволява добавяне (Push) и премахване (Pop) на елементи само от единия край (върха на стека) по принципа LIFO.'
        },
        {
          id: 'dzi-inf-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'В обектно-ориентираното програмиране (C# / Java) кой принцип ограничава директния достъп до вътрешните полета на класа и ги предоставя само чрез контролирани методи или свойства?',
          options: ['Капсулация (Encapsulation)', 'Полиморфизъм (Polymorphism)', 'Множествено наследяване', 'Рекурсия'],
          correctIndex: 0,
          explanation: 'Капсулацията скрива вътрешното състояние на обекта (чрез модификатора private) и осигурява валидация през публични свойства/методи.'
        },
        {
          id: 'dzi-inf-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Кое твърдение за абстрактен клас (abstract class) в C# и Java е вярно?',
          options: [
            'Не може да се създава директно инстанция на абстрактен клас с оператора new',
            'Абстрактният клас не може да съдържа полета и конструктори',
            'Абстрактният клас не може да бъде наследяван от други класове',
            'Всички методи в абстрактния клас са задължително статични (static)'
          ],
          correctIndex: 0,
          explanation: 'Абстрактният клас служи като базов клас за наследяване и не може да бъде инстанциран директно с new.'
        },
        {
          id: 'dzi-inf-q5', number: 5, kind: 'choice', points: 3,
          prompt: t`Кой от следните алгоритми за сортиране има гарантирана времева сложност $O(n \log n)$ както в средния, така и в най-лошия случай?`,
          options: ['Сортиране чрез сливане (Merge Sort)', 'Метод на мехурчето (Bubble Sort)', 'Пряка селекция (Selection Sort)', 'Сортиране чрез вмъкване (Insertion Sort)'],
          correctIndex: 0,
          explanation: t`Merge Sort разделя масива рекурсивно на две равни части и ги слива за линейно време на всяко от $\log_2 n$ нивата — винаги $O(n \log n)$.`
        },
        {
          id: 'dzi-inf-q6', number: 6, kind: 'choice', points: 3,
          prompt: 'При обхождане на двоично дърво за търсене (Binary Search Tree — BST) по кой метод елементите се извеждат в нарастващ (сортиран) ред?',
          options: [
            'Симетрично обхождане: Ляво поддърво – Корен – Дясно поддърво (In-order)',
            'Пряко обхождане: Корен – Ляво поддърво – Дясно поддърво (Pre-order)',
            'Обратно обхождане: Ляво поддърво – Дясно поддърво – Корен (Post-order)',
            'Обхождане в ширина по нива (BFS)'
          ],
          correctIndex: 0,
          explanation: 'Тъй като в BST всички ключове в лявото поддърво са по-малки от корена, а в дясното — по-големи, In-order обхождането ги посещава в сортиран ред.'
        },
        {
          id: 'dzi-inf-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Коя структура от данни се използва стандартно за реализация на обхождане на граф в ширина (Breadth-First Search — BFS)?',
          options: ['Опашка (Queue)', 'Стек (Stack)', 'Двоично дърво за търсене', 'Едномерен символен низ'],
          correctIndex: 0,
          explanation: 'BFS посещава върховете по слоеве (на нарастващо разстояние от началния връх), за което се използва опашка (FIFO).'
        },
        {
          id: 'dzi-inf-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'За намиране на най-кратки пътища от един начален връх до всички останали върхове в претеглен граф с неотрицателни тегла на ребрата се използва:',
          options: ['Алгоритъмът на Дейкстра (Dijkstra)', 'Алгоритъмът на Крускал за минимално покриващо дърво', 'Методът на мехурчето', 'Двоичното търсене'],
          correctIndex: 0,
          explanation: 'Алгоритъмът на Дейкстра намира най-кратките пътища от начален връх в граф с неотрицателни тегла по метода на алчния избор.'
        },
        {
          id: 'dzi-inf-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'В релационните бази от данни кое свойство е задължително за първичния ключ (PRIMARY KEY) на таблица?',
          options: [
            'Уникалност на стойностите и недопускане на празни стойности (NOT NULL)',
            'Задължително да бъде от текстов тип с дължина над 50 символа',
            'Да допуска повтарящи се стойности при дублирани записи',
            'Да съдържа само дробни числа'
          ],
          correctIndex: 0,
          explanation: 'Първичният ключ еднозначно идентифицира всеки кортеж (ред) в релацията, затова стойностите му са уникални и не могат да бъдат NULL.'
        },
        {
          id: 'dzi-inf-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Коя клауза в езика SQL се използва за филтриране на групите след агрегиране с GROUP BY (например за условие върху COUNT или AVG)?',
          options: ['HAVING', 'WHERE', 'ORDER BY', 'DISTINCT'],
          correctIndex: 0,
          explanation: 'Клаузата WHERE филтрира отделните редове преди групирането, а HAVING филтрира вече формираните с GROUP BY групи по резултата от агрегатна функция.'
        },
        {
          id: 'dzi-inf-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Какъв вид връзка между таблиците „Ученици“ и „Извънкласни клубове“ е налице, ако един ученик може да участва в няколко клуба, а в един клуб се записват много ученици?',
          options: [
            'Връзка „много към много“ (M:N), която се реализира чрез междинна (свързваща) таблица',
            'Връзка „едно към едно“ (1:1) в една обща колона',
            'Липса на релационна връзка',
            'Йерархично дърво без външни ключове'
          ],
          correctIndex: 0,
          explanation: 'Връзката M:N в релационен модел се разпада на две връзки 1:N чрез свързваща таблица със съставен ключ от два външни ключа (FOREIGN KEY).'
        },
        {
          id: 'dzi-inf-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Кое условие за нормализация дефинира Втората нормална форма (2NF) на релационна таблица?',
          options: [
            'Таблицата е в 1NF и всеки неключов атрибут зависи функционално напълно от целия първичен ключ (няма частични зависимости от част от съставен ключ)',
            'Таблицата съдържа повтарящи се групи и списъци от стойности в една клетка',
            'Таблицата няма първичен ключ',
            'Всички колони в таблицата са от един и същ тип данни'
          ],
          correctIndex: 0,
          explanation: 'Преминаването от 1NF към 2NF премахва частичните функционални зависимости на неключовите атрибути от съставния първичен ключ.'
        },
        {
          id: 'dzi-inf-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Коя характеристика отличава динамичното програмиране от обикновения рекурсивен метод „Разделяй и владей“?',
          options: [
            'Запаметяването (мемоизацията / табличното пресмятане) на резултатите от припокриващи се подзадачи, за да не се изчисляват многократно',
            'Използването само на глобални текстови променливи',
            'Липсата на базови случаи',
            'Генерирането на случайни числа на всяка стъпка'
          ],
          correctIndex: 0,
          explanation: 'Динамичното оптимиране решава задачи с оптимална подструктура и припокриващи се подзадачи, като съхранява междинните резултати в таблица.'
        },
        {
          id: 'dzi-inf-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'Кой от следните блокове в конструкцията за обработка на изключения (Exception Handling) се изпълнява винаги — независимо дали е възникнало изключение в try блока или не?',
          options: ['finally', 'catch', 'throw', 'break'],
          correctIndex: 0,
          explanation: 'Блокът finally се изпълнява гарантирано и служи за освобождаване на ресурси (затваряне на файлове, потоци и връзки към БД).'
        },
        {
          id: 'dzi-inf-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'Кой вид тест в софтуерното инженерство проверява коректната работа на един отделен метод или клас изолирано от останалата част на системата?',
          options: ['Единичен (модулен) тест — Unit Test', 'Системен тест под натоварване', 'Потребителски тест за приемане (UAT)', 'Интеграционен тест на цялата мрежа'],
          correctIndex: 0,
          explanation: 'Unit тестовете проверяват най-малките тестваеми единици код (методи/класове) в изолация.'
        }
      ]
    },
    {
      id: 'inf-part2',
      title: 'Част 2. Задачи с кратък отговор (25 т.)',
      instructions: 'Запишете точния числов отговор. Всяка задача носи 5 точки.',
      questions: [
        {
          id: 'dzi-inf-q16', number: 16, kind: 'short', points: 5, answerType: 'number',
          prompt: 'В празен стек от цели числа последователно се изпълняват операциите: Push(4), Push(9), Push(2), Pop(), Push(7), Push(5), Pop(). Кое число остава на върха на стека (Peek) след изпълнението им?',
          acceptedAnswers: ['7'],
          explanation: 'След Push(4), Push(9), Push(2) стекът е [4, 9, 2]. Pop() изважда 2 → [4, 9]. Push(7), Push(5) → [4, 9, 7, 5]. Вторият Pop() изважда 5 → на върха остава 7.'
        },
        {
          id: 'dzi-inf-q17', number: 17, kind: 'short', points: 5, answerType: 'number',
          prompt: t`Дадена е рекурсивната функция $F(n)$, дефинирана за цели неотрицателни числа:\nАко $n \le 1$, $F(n) = 1$; иначе $F(n) = F(n - 1) + 2\cdot F(n - 2)$.\nНамерете стойността на $F(4)$.`,
          acceptedAnswers: ['11'],
          explanation: t`$F(0) = 1$, $F(1) = 1$. Тогава:\n$F(2) = F(1) + 2F(0) = 1 + 2 = 3$;\n$F(3) = F(2) + 2F(1) = 3 + 2 = 5$;\n$F(4) = F(3) + 2F(2) = 5 + 2\cdot 3 = 11$.`
        },
        {
          id: 'dzi-inf-q18', number: 18, kind: 'short', points: 5, answerType: 'number',
          prompt: t`Свързан неориентиран граф има $V = 8$ върха. Колко ребра съдържа всяко покриващо дърво (Spanning Tree) на този граф?`,
          acceptedAnswers: ['7'],
          explanation: t`Всяко дърво с $V$ върха е свързан ацикличен граф и има точно $V - 1 = 8 - 1 = 7$ ребра.`
        },
        {
          id: 'dzi-inf-q19', number: 19, kind: 'short', points: 5, answerType: 'number',
          prompt: 'Колко е десетичният еквивалент на двоичното число $101101_2$?',
          acceptedAnswers: ['45'],
          explanation: t`$101101_2 = 1\cdot 2^5 + 0\cdot 2^4 + 1\cdot 2^3 + 1\cdot 2^2 + 0\cdot 2^1 + 1\cdot 2^0 = 32 + 8 + 4 + 1 = 45$.`
        },
        {
          id: 'dzi-inf-q20', number: 20, kind: 'short', points: 5, answerType: 'number',
          prompt: 'Таблицата Orders(Id, CustomerId, Amount) съдържа следните 4 реда: (1, 10, 120), (2, 20, 80), (3, 10, 180), (4, 30, 90). Какво число ще върне SQL заявката:\nSELECT SUM(Amount) FROM Orders WHERE CustomerId = 10;',
          acceptedAnswers: ['300'],
          explanation: 'За CustomerId = 10 има два записа със суми 120 и 180. Тяхната сума е $120 + 180 = 300$.'
        }
      ]
    },
    {
      id: 'inf-part3',
      title: 'Част 3. Практически задачи със свободен отговор (30 т.)',
      instructions: 'Напишете обектно-ориентирания модел, алгоритъма и SQL заявките по условията на задачи 21. и 22.',
      questions: [
        {
          id: 'dzi-inf-q21', number: 21, kind: 'open', points: 15,
          prompt: 'Обектно-ориентирано проектиране и алгоритми (на C#, Java или псевдокод):\nРазработва се софтуерна система за управление на автопарк за доставки.\nа) Дефинирайте абстрактен базов клас Vehicle с капсулирани полета registrationNumber (низ) и loadCapacityKg (положително реално число, с валидация при некоректна стойност да се хвърля изключение ArgumentException), конструктор и абстрактен метод CalculateDeliveryCost(double distanceKm).\nб) Дефинирайте производен клас ElectricVan, който наследява Vehicle, добавя поле batteryConsumptionPerKm и переопределя (override) метода CalculateDeliveryCost(double distanceKm) по формулата: $0{,}25 \\cdot \\text{distanceKm} \\cdot \\text{batteryConsumptionPerKm}$.\nв) Напишете метод, който приема списък от обекти `List<Vehicle>`, сортира ги низходящо по товароподемност (`loadCapacityKg`), а при равна товароподемност — възходящо по регистрационен номер, и извежда данните им.',
          criteria: [
            { label: 'а) Коректно дефиниран абстрактен клас Vehicle с капсулация, валидация с ArgumentException и абстрактен метод', points: 5 },
            { label: 'б) Коректно наследяване в ElectricVan, извикване на базовия конструктор и полиморфна имплементация с override', points: 5 },
            { label: 'в) Вярно реализирано сортиране по два критерия (товароподемност низходящо и рег. номер възходящо) и извеждане', points: 5 }
          ],
          modelAnswer:
            '```csharp\nusing System;\nusing System.Collections.Generic;\nusing System.Linq;\n\npublic abstract class Vehicle\n{\n    private string registrationNumber;\n    private double loadCapacityKg;\n\n    public string RegistrationNumber\n    {\n        get => registrationNumber;\n        set\n        {\n            if (string.IsNullOrWhiteSpace(value))\n                throw new ArgumentException("Невалиден регистрационен номер.");\n            registrationNumber = value;\n        }\n    }\n\n    public double LoadCapacityKg\n    {\n        get => loadCapacityKg;\n        set\n        {\n            if (value <= 0)\n                throw new ArgumentException("Товароподемността трябва да е положително число.");\n            loadCapacityKg = value;\n        }\n    }\n\n    protected Vehicle(string registrationNumber, double loadCapacityKg)\n    {\n        RegistrationNumber = registrationNumber;\n        LoadCapacityKg = loadCapacityKg;\n    }\n\n    public abstract double CalculateDeliveryCost(double distanceKm);\n}\n\npublic class ElectricVan : Vehicle\n{\n    public double BatteryConsumptionPerKm { get; set; }\n\n    public ElectricVan(string registrationNumber, double loadCapacityKg, double batteryConsumptionPerKm)\n        : base(registrationNumber, loadCapacityKg)\n    {\n        if (batteryConsumptionPerKm <= 0)\n            throw new ArgumentException("Разходът трябва да е положителен.");\n        BatteryConsumptionPerKm = batteryConsumptionPerKm;\n    }\n\n    public override double CalculateDeliveryCost(double distanceKm)\n    {\n        return 0.25 * distanceKm * BatteryConsumptionPerKm;\n    }\n}\n\npublic static class FleetManager\n{\n    public static void PrintSortedVehicles(List<Vehicle> vehicles)\n    {\n        var sorted = vehicles\n            .OrderByDescending(v => v.LoadCapacityKg)\n            .ThenBy(v => v.RegistrationNumber)\n            .ToList();\n\n        foreach (var v in sorted)\n        {\n            Console.WriteLine(v.RegistrationNumber + " - " + v.LoadCapacityKg.ToString("F1") + " kg");\n        }\n    }\n}\n```'
        },
        {
          id: 'dzi-inf-q22', number: 22, kind: 'open', points: 15,
          prompt: 'Релационни бази от данни и SQL:\nДадена е релационна база от данни за библиотека със следните три таблици:\n- `Authors(Id INT PRIMARY KEY, FullName VARCHAR(100), Country VARCHAR(50))`\n- `Books(Id INT PRIMARY KEY, Title VARCHAR(150), AuthorId INT FOREIGN KEY REFERENCES Authors(Id), PublishedYear INT, CopiesAvailable INT)`\n- `Loans(Id INT PRIMARY KEY, BookId INT FOREIGN KEY REFERENCES Books(Id), ReaderName VARCHAR(100), LoanDate DATE, ReturnDate DATE NULL)`\n\nНапишете SQL заявки за:\nа) Извеждане на заглавията на книгите (`Title`), годината на издаване (`PublishedYear`) и името на автора (`FullName`) за всички книги, издадени след 2015 г., подредени по година на издаване в намаляващ ред.\nб) Извеждане на името на всеки автор (`FullName`) и общия брой негови книги в таблицата `Books`, но само за авторите, които имат поне 3 книги в библиотеката.\nв) Извеждане на заглавията на книгите, които в момента са заети и все още не са върнати (`ReturnDate IS NULL`).',
          criteria: [
            { label: 'а) Вярна SELECT заявка с INNER JOIN между Books и Authors, WHERE PublishedYear > 2015 и ORDER BY PublishedYear DESC', points: 5 },
            { label: 'б) Вярна агрегираща заявка с JOIN, GROUP BY и HAVING COUNT(*) >= 3', points: 5 },
            { label: 'в) Вярна заявка с JOIN към Loans и условие WHERE ReturnDate IS NULL', points: 5 }
          ],
          modelAnswer:
            '```sql\n-- а) Книги, издадени след 2015 г., с техните автори:\nSELECT b.Title, b.PublishedYear, a.FullName\nFROM Books b\nINNER JOIN Authors a ON b.AuthorId = a.Id\nWHERE b.PublishedYear > 2015\nORDER BY b.PublishedYear DESC;\n\n-- б) Автори с поне 3 книги в библиотеката:\nSELECT a.FullName, COUNT(b.Id) AS BookCount\nFROM Authors a\nINNER JOIN Books b ON a.Id = b.AuthorId\nGROUP BY a.Id, a.FullName\nHAVING COUNT(b.Id) >= 3;\n\n-- в) Заглавия на книги, които в момента не са върнати:\nSELECT DISTINCT b.Title\nFROM Books b\nINNER JOIN Loans l ON b.Id = l.BookId\nWHERE l.ReturnDate IS NULL;\n```'
        }
      ]
    }
  ]
};
