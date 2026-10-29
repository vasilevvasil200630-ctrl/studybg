import type { ExamPaper } from '../../../lib/examPaperScoring';
import { DZI_SCALE } from '../../../lib/monGradeScale';

const t = String.raw;

export const DZI_INF_PRACTICE_2: ExamPaper = {
  id: 'practice-dzi-inf-2',
  title: 'Информатика (профилирана подготовка) — Втори ДЗИ, тренировъчен вариант 2',
  exam: 'ДЗИ',
  subject: 'Информатика',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  formulaSheet: 'dzi-informatics',
  note:
    'Втори тренировъчен вариант за Втори ДЗИ по информатика (профилирана подготовка — 11. и 12. клас). Включва 15 задачи с избираем отговор (45 т.), 5 задачи с кратък отговор (25 т.) и 2 практически задачи по ООП, алгоритми и SQL (30 т.).',
  sections: [
    {
      id: 'inf2-part1',
      title: 'Част 1. Задачи с избираем отговор (45 т.)',
      instructions: 'Изберете един верен отговор. Всяка задача носи 3 точки.',
      questions: [
        {
          id: 'dzi-infv2-q1', number: 1, kind: 'choice', points: 3,
          prompt: t`Колко е стойността на шестнадесетичното число $\text{7F}_{16}$, записано в десетична бройна система?`,
          options: ['119', '127', '128', '255'],
          correctIndex: 1,
          explanation: t`$\text{7F}_{16} = 7 \cdot 16^1 + 15 \cdot 16^0 = 112 + 15 = 127_{10}$.`,
        },
        {
          id: 'dzi-infv2-q2', number: 2, kind: 'choice', points: 3,
          prompt: t`В 8-битов допълнителен код (two's complement) със знак кой двоичен запис представя отрицателното цяло число $-5_{10}$?`,
          options: [
            t`$10000101_2$`,
            t`$11111010_2$`,
            t`$11111011_2$`,
            t`$11111101_2$`,
          ],
          correctIndex: 2,
          explanation: t`Прав код на $+5_{10}$ е $00000101_2$. Обратен (инвертиран) код е $11111010_2$. Допълнителният код се получава чрез прибавяне на $1$: $11111010_2 + 1 = 11111011_2$ (проверка: $256 - 5 = 251 = 11111011_2$).`,
        },
        {
          id: 'dzi-infv2-q3', number: 3, kind: 'choice', points: 3,
          prompt: t`Съгласно законите на Де Морган булевият израз $\neg(\neg A \lor B)$ е тъждествено еквивалентен на:`,
          options: [
            t`$A \land \neg B$`,
            t`$\neg A \land \neg B$`,
            t`$A \lor \neg B$`,
            t`$\neg A \lor \neg B$`,
          ],
          correctIndex: 0,
          explanation: t`По първия закон на Де Морган $\neg(X \lor Y) \equiv \neg X \land \neg Y$. За $X = \neg A$ и $Y = B$ получаваме $\neg(\neg A) \land \neg B \equiv A \land \neg B$.`,
        },
        {
          id: 'dzi-infv2-q4', number: 4, kind: 'choice', points: 3,
          prompt: t`Каква е асимптотичната времева сложност в най-лошия случай (worst-case) на алгоритъма Бързо сортиране (QuickSort) и на Сортиране чрез сливане (MergeSort) за масив с $n$ елемента?`,
          options: [
            t`QuickSort: $O(n \log n)$ в най-лошия случай; MergeSort: $O(n^2)$`,
            t`QuickSort: $O(n^2)$ в най-лошия случай; MergeSort: $O(n \log n)$ във всички случаи`,
            t`И двата алгоритъма имат $O(n^2)$ в средния случай`,
            t`И двата алгоритъма имат $O(n)$ във всички случаи`,
          ],
          correctIndex: 1,
          explanation: t`При небалансиран избор на опорен елемент (pivot) QuickSort деградира до $O(n^2)$ в най-лошия случай (при средна сложност $O(n \log n)$), докато MergeSort гарантира $O(n \log n)$ както в средния, така и в най-лошия случай.`,
        },
        {
          id: 'dzi-infv2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'Коя линейна структура от данни се използва от алгоритъма за обхождане на граф в ширина (BFS — Breadth-First Search) за съхраняване на посетените, но все още необработени върхове?',
          options: [
            'Стек (Stack — LIFO)',
            'Опашка (Queue — FIFO)',
            'Двоично дърво за търсене (BST)',
            'Несортиран статичен масив с произволен достъп',
          ],
          correctIndex: 1,
          explanation: 'BFS посещава върховете по слоеве (по нарастващо разстояние от началния връх) и затова използва опашка (FIFO — First In, First Out), докато DFS използва стек (или системния стек при рекурсия).',
        },
        {
          id: 'dzi-infv2-q6', number: 6, kind: 'choice', points: 3,
          prompt: 'В обектно-ориентираното програмиране (C# / Java) каква е разликата между абстрактен клас (abstract class) и интерфейс (interface)?',
          options: [
            'Един клас може да наследи директно няколко абстрактни класа, но може да имплементира само един интерфейс',
            'Един клас може да наследи директно само един базов (вкл. абстрактен) клас, но може да имплементира множество интерфейси; освен това абстрактният клас може да съдържа полета за състояние (state) и конструктори',
            'От абстрактен клас могат да се създават директно инстанции с оператора new, а от интерфейс — не',
            'Интерфейсите могат да имат само private методи',
          ],
          correctIndex: 1,
          explanation: 'В C# и Java се поддържа единично наследяване на класове (single class inheritance) и множествена имплементация на интерфейси. Абстрактният клас може да има нестатични полета, конструктори и модификатори за достъп, но не може да се инстанцира директно с new.',
        },
        {
          id: 'dzi-infv2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'В C# / Java коя ключова дума се използва в конструктор или метод на производен (наследник) клас, за да се извика конструктор или метод на прекия базов (родителски) клас?',
          options: [
            '`this`',
            '`base` (в C#) / `super` (в Java)',
            '`static`',
            '`override`',
          ],
          correctIndex: 1,
          explanation: 'Ключовата дума `base` в C# (съответно `super` в Java) служи за достъп до членове и конструктори на базовия клас от производния клас.',
        },
        {
          id: 'dzi-infv2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Как се нарича свойството на двоично дърво за търсене (Binary Search Tree — BST), което важи за всеки негов възел с ключ $K$?',
          options: [
            'Всички ключове в лявото поддърво са по-големи от $K$, а в дясното — по-малки от $K$',
            'Всички ключове в лявото поддърво са по-малки от $K$, а всички ключове в дясното поддърво са по-големи от $K$',
            'Ключът $K$ винаги е по-малък както от левия, така и от десния си наследник (като в min-heap)',
            'Дървото винаги има точно два наследника за всеки възел',
          ],
          correctIndex: 1,
          explanation: 'В двоичното дърво за търсене (BST) за всеки възел $v$ ключовете в лявото му поддърво са $< \text{key}(v)$, а в дясното му поддърво са $> \text{key}(v)$, поради което in-order обхождането (ляво – корен – дясно) извежда елементите в нарастващ ред.',
        },
        {
          id: 'dzi-infv2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Каква е основната разлика между клаузите `WHERE` и `HAVING` в езика SQL при заявка `SELECT`?',
          options: [
            '`WHERE` филтрира отделните редове преди групирането (`GROUP BY`), а `HAVING` филтрира вече формираните групи (вкл. по условия с агрегатни функции като `COUNT`, `SUM`, `AVG`)',
            '`HAVING` се използва само при `DELETE`, а `WHERE` — само при `SELECT`',
            '`WHERE` може да съдържа агрегатни функции директно без подзаявка, а `HAVING` — не може',
            'Няма никаква разлика — двете ключови думи са синоними',
          ],
          correctIndex: 0,
          explanation: 'В SQL `WHERE` се изпълнява преди `GROUP BY` върху отделните записи от таблиците и не допуска агрегатни функции директно, докато `HAVING` се изпълнява след `GROUP BY` и филтрира групите по резултата от агрегатни функции.',
        },
        {
          id: 'dzi-infv2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'В релационните бази данни в коя нормална форма (НФ) се намира таблица, която е във Втора нормална форма (2NF) и в която никой неключов атрибут не зависи транзитивно от първичния ключ?',
          options: [
            'Първа нормална форма (1NF)',
            'Трета нормална форма (3NF)',
            'Ненормализирана форма (0NF)',
            'Денормализирана таблица',
          ],
          correctIndex: 1,
          explanation: 'Третата нормална форма (3NF) изисква релацията да е в 2NF и да няма транзитивни функционални зависимости на неключови атрибути от първичния ключ ($PK \rightarrow A \rightarrow B$).',
        },
        {
          id: 'dzi-infv2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'При обработка на изключения в блок `try – catch – finally` в C# / Java кога се изпълнява кодът в блока `finally`?',
          options: [
            'Само ако в блока `try` НЕ е възникнало изключение',
            'Само ако е възникнало изключение, което не е прихванато от `catch`',
            'Винаги при излизане от конструкцията `try-catch` — независимо дали е възникнало изключение, или кодът е завършил нормално',
            'Само при компилационна грешка',
          ],
          correctIndex: 2,
          explanation: 'Блокът `finally` се изпълнява гарантирано както при нормално завършване на `try`, така и при възникване и прихващане на изключение (използва се за освобождаване на ресурси — файлове, връзки към БД).',
        },
        {
          id: 'dzi-infv2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Какъв тип връзка (кардиналност) между две таблици в релационна база данни се реализира задължително чрез трета свързваща (междинна) таблица, съдържаща външни ключове към първичните ключове на двете таблици?',
          options: [
            'Едно към едно (1:1)',
            'Едно към много (1:N)',
            'Много към много (M:N)',
            'Рекурсивна унарна връзка 1:1',
          ],
          correctIndex: 2,
          explanation: 'Връзката „много към много“ (M:N), напр. между Ученици и Извънкласни клубове, се разпада в релационния модел на две връзки 1:N чрез междинна (свързваща) таблица със съставен първичен ключ от двата външни ключа.',
        },
        {
          id: 'dzi-infv2-q13', number: 13, kind: 'choice', points: 3,
          prompt: t`В неориентиран граф $G(V, E)$ без примки с $|V| = 6$ върха и $|E| = 9$ ребра колко е сумата от степените на всички върхове $\sum_{v \in V} \deg(v)$ (според лемата за ръкостисканията на Ойлер)?`,
          options: ['9', '15', '18', '36'],
          correctIndex: 2,
          explanation: t`Според лемата за ръкостисканията всяко ребро допринася с 2 към сумата от степените на върховете: $\sum_{v \in V} \deg(v) = 2|E| = 2 \cdot 9 = 18$.`,
        },
        {
          id: 'dzi-infv2-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'В модулното тестване (Unit Testing) на софтуер какво проверява методът `Assert.AreEqual(expected, actual)`?',
          options: [
            'Дали времето за компилация на проекта е под 1 секунда',
            'Дали действителният резултат (`actual`), върнат от тествания метод, съвпада с очакваната стойност (`expected`)',
            'Дали програмата има графичен потребителски интерфейс',
            'Дали базата данни е в Трета нормална форма',
          ],
          correctIndex: 1,
          explanation: '`Assert.AreEqual(expected, actual)` сравнява очакваната и реално получената стойност и отбелязва единичния тест като успешен (Pass) при равенство или неуспешен (Fail) при разлика.',
        },
        {
          id: 'dzi-infv2-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'Кой от следните видове `JOIN` в SQL връща всички записи от лявата таблица и съвпадащите записи от дясната таблица, а когато няма съвпадение в дясната таблица — попълва нейните колони с `NULL`?',
          options: [
            '`INNER JOIN`',
            '`LEFT OUTER JOIN` (`LEFT JOIN`)',
            '`RIGHT OUTER JOIN` (`RIGHT JOIN`)',
            '`CROSS JOIN`',
          ],
          correctIndex: 1,
          explanation: '`LEFT JOIN` (`LEFT OUTER JOIN`) запазва всички редове от лявата таблица, дори когато в дясната таблица няма съответстващ запис по условието `ON`.',
        },
      ],
    },
    {
      id: 'inf2-part2',
      title: 'Част 2. Задачи с кратък отговор (25 т.)',
      instructions: 'Запишете точния числов или текстов резултат към всяка задача и подточка.',
      questions: [
        {
          id: 'dzi-infv2-q16', number: 16, kind: 'short', answerType: 'number', points: 4,
          prompt: `Какво число ще върне извикването \`calc(4)\` на следната рекурсивна функция:
\`\`\`csharp
int calc(int n) {
    if (n <= 1) return 1;
    return 2 * calc(n - 1) + 1;
}
\`\`\``,
          acceptedAnswers: ['15'],
          explanation: t`Последователно: $\text{calc}(1) = 1$, $\text{calc}(2) = 2\cdot 1 + 1 = 3$, $\text{calc}(3) = 2\cdot 3 + 1 = 7$, $\text{calc}(4) = 2\cdot 7 + 1 = 15$ (формула $2^n - 1$).`,
        },
        {
          id: 'dzi-infv2-q17', number: 17, kind: 'short', answerType: 'number', points: 5,
          prompt: 'В празен стек (`Stack<int>`) последователно се изпълняват операциите: `Push(4)`, `Push(9)`, `Push(2)`, `Pop()`, `Push(7)`, `Push(5)`, `Pop()`. Колко е сумата на елементите, които остават в стека след изпълнението на всички операции?',
          acceptedAnswers: ['20'],
          explanation: 'След `Push(4), Push(9), Push(2)` стекът съдържа `[4, 9, 2]`. `Pop()` премахва `2` -> `[4, 9]`. `Push(7), Push(5)` -> `[4, 9, 7, 5]`. `Pop()` премахва `5` -> остават `[4, 9, 7]`, чиято сума е $4 + 9 + 7 = 20$.',
        },
        {
          id: 'dzi-infv2-q18', number: 18, kind: 'short', answerType: 'number', points: 5,
          prompt: t`В сортиран масив с $N = 1024$ елемента се търси елемент чрез алгоритъма Двоично търсене (Binary Search). Колко най-много сравнения с централен елемент ($\lfloor\log_2 1024\rfloor + 1$) са необходими в най-лошия случай?`,
          acceptedAnswers: ['11', '10'],
          explanation: t`Тъй като $1024 = 2^{10}$, в най-лошия случай са необходими $\lfloor\log_2 1024\rfloor + 1 = 10 + 1 = 11$ (или $10$ при 3-посочно сравнение) стъпки.`,
        },
        {
          id: 'dzi-infv2-q19', number: 19, kind: 'multi', points: 5,
          prompt: `Разгледайте следния фрагмент на C# / Java:
\`\`\`csharp
int[] a = { 3, 8, 5, 12, 7, 4, 10 };
int sumEven = 0, countOdd = 0;
for (int i = 0; i < a.Length; i++) {
    if (a[i] % 2 == 0) sumEven += a[i];
    else countOdd++;
}
\`\`\``,
          parts: [
            {
              id: 'a', label: 'А)', points: 3,
              prompt: 'Каква е стойността на променливата `sumEven` след края на цикъла?',
              answer: { type: 'number', acceptedAnswers: ['34'] },
            },
            {
              id: 'b', label: 'Б)', points: 2,
              prompt: 'Каква е стойността на променливата `countOdd` след края на цикъла?',
              answer: { type: 'number', acceptedAnswers: ['3'] },
            },
          ],
          explanation: 'Четните числа в масива са $8, 12, 4, 10$ със сума $\\text{sumEven} = 8 + 12 + 4 + 10 = 34$. Нечетните числа са $3, 5, 7$ — общо $\\text{countOdd} = 3$.',
        },
        {
          id: 'dzi-infv2-q20', number: 20, kind: 'multi', points: 6,
          prompt: `Дадена е таблица \`Orders\` с 5 записа:
| OrderID | Customer | Category | Amount |
|---|---|---|---|
| 1 | Ivan | Books | 40 |
| 2 | Maria | Tech | 300 |
| 3 | Ivan | Books | 60 |
| 4 | Georgi | Tech | 200 |
| 5 | Maria | Books | 50 |`,
          parts: [
            {
              id: 'a', label: 'А)', points: 3,
              prompt: 'Какво число ще върне заявката: `SELECT SUM(Amount) FROM Orders WHERE Category = \'Books\';`?',
              answer: { type: 'number', acceptedAnswers: ['150'] },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: 'Колко реда ще върне заявката: `SELECT Customer, SUM(Amount) FROM Orders GROUP BY Customer HAVING SUM(Amount) >= 100;`?',
              answer: { type: 'number', acceptedAnswers: ['3'] },
            },
          ],
          explanation: 'А) За категория `Books` сумата е $40 + 60 + 50 = 150$. Б) Сумите по клиенти са: `Ivan` ($40+60=100$), `Maria` ($300+50=350$), `Georgi` ($200$). И тримата имат $\\text{SUM(Amount)} \\ge 100$, затова заявката връща 3 реда.',
        },
      ],
    },
    {
      id: 'inf2-part3',
      title: 'Част 3. Практически задачи със свободен отговор (30 т.)',
      instructions: 'Напишете пълния програмен код (на C# или Java) и SQL заявките. Оценете се по критериите след предаване.',
      questions: [
        {
          id: 'dzi-infv2-q21', number: 21, kind: 'open', points: 15,
          prompt: `Обектно-ориентирано програмиране и алгоритми върху колекции (C# / Java):
Да се проектира обектно-ориентирана система за управление на автопарк за споделено пътуване:
А) Дефинирайте абстрактен базов клас \`Vehicle\` с капсулирани полета/свойства: регистрационен номер \`plateNumber\` (низ, непразен), марка \`brand\` (низ) и базова цена на километър \`baseRatePerKm\` (положително реално число; при невалидна стойност $\\le 0$ се хвърля \`ArgumentException\`). Дефинирайте конструктор, абстрактен метод \`double CalculateTripCost(double distanceKm)\` и презаписан метод \`ToString()\`.
Б) Дефинирайте два производни класа:
– \`ElectricCar\`, който наследява \`Vehicle\`, добавя капацитет на батерията \`batteryKWh\` (int) и пресмята цената на пътуването с $20\\%$ еко-отстъпка: $\\text{distanceKm} \\cdot \\text{baseRatePerKm} \\cdot 0{,}80$;
– \`CargoVan\`, който наследява \`Vehicle\`, добавя товароносимост в тонове \`payloadTons\` (double) и пресмята цената по формулата: $\\text{distanceKm} \\cdot \\text{baseRatePerKm} + \\text{payloadTons} \\cdot 15{,}0$.
В) Напишете метод, който приема списък \`List<Vehicle>\` и разстояние $D = 100\\text{ km}$, сортира превозните средства по цена за това разстояние във възходящ ред (а при равна цена — лексикографски по регистрационен номер) и извежда данните им.`,
          criteria: [
            { label: 'А) Коректно дефиниран абстрактен клас Vehicle с капсулация, валидация с ArgumentException, конструктор и абстрактен метод CalculateTripCost', points: 5 },
            { label: 'Б) Коректно наследяване и полиморфно презаписване (override) в класовете ElectricCar и CargoVan с извикване на базовия конструктор (base/super)', points: 6 },
            { label: 'В) Коректно сортиране на колекцията по два критерия и обработка на входно-изходните данни', points: 4 },
          ],
          modelAnswer: `Примерно решение на C#:
\`\`\`csharp
using System;
using System.Collections.Generic;
using System.Linq;

public abstract class Vehicle
{
    private string plateNumber;
    private double baseRatePerKm;

    public string PlateNumber
    {
        get => plateNumber;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Невалиден регистрационен номер!");
            plateNumber = value;
        }
    }

    public string Brand { get; set; }

    public double BaseRatePerKm
    {
        get => baseRatePerKm;
        set
        {
            if (value <= 0)
                throw new ArgumentException("Базовата тарифа трябва да е положителна!");
            baseRatePerKm = value;
        }
    }

    protected Vehicle(string plateNumber, string brand, double baseRatePerKm)
    {
        PlateNumber = plateNumber;
        Brand = brand;
        BaseRatePerKm = baseRatePerKm;
    }

    public abstract double CalculateTripCost(double distanceKm);

    public override string ToString()
        => $"{PlateNumber} ({Brand})";
}

public class ElectricCar : Vehicle
{
    public int BatteryKWh { get; set; }

    public ElectricCar(string plateNumber, string brand, double baseRatePerKm, int batteryKWh)
        : base(plateNumber, brand, baseRatePerKm)
    {
        BatteryKWh = batteryKWh;
    }

    public override double CalculateTripCost(double distanceKm)
        => distanceKm * BaseRatePerKm * 0.80;
}

public class CargoVan : Vehicle
{
    public double PayloadTons { get; set; }

    public CargoVan(string plateNumber, string brand, double baseRatePerKm, double payloadTons)
        : base(plateNumber, brand, baseRatePerKm)
    {
        PayloadTons = payloadTons;
    }

    public override double CalculateTripCost(double distanceKm)
        => distanceKm * BaseRatePerKm + PayloadTons * 15.0;
}

public static class FleetManager
{
    public static void PrintSortedByTripCost(List<Vehicle> fleet, double distanceKm = 100.0)
    {
        var sorted = fleet
            .OrderBy(v => v.CalculateTripCost(distanceKm))
            .ThenBy(v => v.PlateNumber)
            .ToList();

        foreach (var v in sorted)
        {
            Console.WriteLine($"{v} -> {v.CalculateTripCost(distanceKm):F2} лв.");
        }
    }
}
\`\`\``,
        },
        {
          id: 'dzi-infv2-q22', number: 22, kind: 'open', points: 15,
          prompt: `Релационни бази данни и SQL заявки:
Дадена е релационна база данни за университетска библиотека със следните три таблици:
– \`Authors(AuthorID INT PK, FullName VARCHAR(100), Country VARCHAR(50))\`
– \`Books(BookID INT PK, Title VARCHAR(150), AuthorID INT FK,PublishYear INT, CopiesAvailable INT)\`
– \`Loans(LoanID INT PK, BookID INT FK, ReaderName VARCHAR(100), LoanDate DATE, Returned BIT)\`
Напишете SQL заявки за:
А) Създаване на таблицата \`Books\` с първичен ключ, външен ключ към \`Authors(AuthorID)\` и ограничение \`CopiesAvailable >= 0\`.
Б) Извеждане на заглавията на книгите (\`Title\`), името на автора (\`FullName\`) и годината на издаване (\`PublishYear\`) за всички книги от български автори (\`Country = 'България'\`), издадени след 2015 г., подредени по година на издаване в низходящ ред.
В) Извеждане на имената на авторите (\`FullName\`) и общия брой заемания на техни книги (\`TotalLoans\`), но само за автори с поне 5 заемания, подредени по брой заемания в низходящ ред.`,
          criteria: [
            { label: 'А) Коректна DDL заявка CREATE TABLE Books с PRIMARY KEY, FOREIGN KEY REFERENCES Authors(AuthorID) и CHECK (CopiesAvailable >= 0)', points: 5 },
            { label: 'Б) Коректна SELECT заявка с INNER JOIN между Books и Authors, WHERE за страна и година и ORDER BY PublishYear DESC', points: 5 },
            { label: 'В) Коректна агрегатна заявка с двойно съединение (Authors -> Books -> Loans), GROUP BY, COUNT, HAVING COUNT(*) >= 5 и ORDER BY', points: 5 },
          ],
          modelAnswer: `А) Създаване на таблицата \`Books\`:
\`\`\`sql
CREATE TABLE Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(150) NOT NULL,
    AuthorID INT NOT NULL,
    PublishYear INT NOT NULL,
    CopiesAvailable INT NOT NULL DEFAULT 1 CHECK (CopiesAvailable >= 0),
    CONSTRAINT FK_Books_Authors FOREIGN KEY (AuthorID)
        REFERENCES Authors(AuthorID)
);
\`\`\`

Б) Извеждане на книгите от български автори след 2015 г.:
\`\`\`sql
SELECT b.Title, a.FullName, b.PublishYear
FROM Books b
INNER JOIN Authors a ON b.AuthorID = a.AuthorID
WHERE a.Country = 'България' AND b.PublishYear > 2015
ORDER BY b.PublishYear DESC, b.Title ASC;
\`\`\`

В) Агрегирана справка за най-четените автори с поне 5 заемания:
\`\`\`sql
SELECT a.FullName, COUNT(l.LoanID) AS TotalLoans
FROM Authors a
INNER JOIN Books b ON a.AuthorID = b.AuthorID
INNER JOIN Loans l ON b.BookID = l.BookID
GROUP BY a.AuthorID, a.FullName
HAVING COUNT(l.LoanID) >= 5
ORDER BY TotalLoans DESC;
\`\`\``,
        },
      ],
    },
  ],
};

export const DZI_IT_PRACTICE_2: ExamPaper = {
  id: 'practice-dzi-it-2',
  title: 'Информационни технологии (профилирана подготовка) — Втори ДЗИ, тренировъчен вариант 2',
  exam: 'ДЗИ',
  subject: 'Информационни технологии',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  formulaSheet: 'dzi-informatics',
  note:
    'Втори тренировъчен вариант за Втори ДЗИ по информационни технологии (профилирана подготовка — 11. и 12. клас). Включва 15 задачи с избираем отговор (45 т.), 5 задачи с кратък отговор (25 т.) и 2 практически задачи по бази данни, електронни таблици, уеб системи и мрежова сигурност (30 т.).',
  sections: [
    {
      id: 'it2-part1',
      title: 'Част 1. Задачи с избираем отговор (45 т.)',
      instructions: 'Изберете един верен отговор. Всяка задача носи 3 точки.',
      questions: [
        {
          id: 'dzi-itv2-q1', number: 1, kind: 'choice', points: 3,
          prompt: 'На кой слой от 7-слойния еталонен модел OSI работят маршрутизаторите (routers) и протоколът IP, отговарящи за логическата адресация и маршрутизирането на пакети между различни мрежи?',
          options: [
            'Слой 1 — Физически слой (Physical Layer)',
            'Слой 2 — Канален слой (Data Link Layer)',
            'Слой 3 — Мрежов слой (Network Layer)',
            'Слой 7 — Приложен слой (Application Layer)',
          ],
          correctIndex: 2,
          explanation: 'Мрежовият слой (Layer 3 — Network Layer) управлява логическата IP адресация и маршрутизирането (routing) на пакетите между подмрежи.',
        },
        {
          id: 'dzi-itv2-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Кой мрежов протокол от приложния слой автоматично раздава динамични IP конфигурационни параметри (IP адрес, маска на подмрежата, шлюз по подразбиране и DNS сървър) на клиентските устройства в локалната мрежа?',
          options: ['DNS', 'DHCP', 'SMTP', 'IMAP'],
          correctIndex: 1,
          explanation: 'DHCP (Dynamic Host Configuration Protocol) автоматизира разпределението на IP адреси и мрежови настройки в мрежата по схемата DORA (Discover, Offer, Request, Acknowledge).',
        },
        {
          id: 'dzi-itv2-q3', number: 3, kind: 'choice', points: 3,
          prompt: t`В IPv4 мрежа с префикс \`192.168.10.0/26\` (подмрежова маска \`255.255.255.192\`) колко използваеми IP адреса за хостове (крайни устройства) има в тази подмрежа?`,
          options: ['30', '62', '64', '254'],
          correctIndex: 1,
          explanation: t`При префикс \`/26\` за хостовата част остават $32 - 26 = 6$ бита. Общият брой адреси е $2^6 = 64$, а след изваждане на адреса на мрежата и broadcast адреса остават $2^6 - 2 = 62$ използваеми хост адреса.`,
        },
        {
          id: 'dzi-itv2-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'При асиметричното криптиране (с публичен и частен ключ) в инфраструктура с публичен ключ (PKI), с кой ключ подателят създава ЦИФРОВ ПОДПИС върху електронен документ, така че всеки получател да може да провери автентичността и целостта му?',
          options: [
            'Подателят подписва със своя ЧАСТЕН ключ, а получателите проверяват подписа с ПУБЛИЧНИЯ ключ на подателя',
            'Подателят подписва с публичния ключ на получателя',
            'Подателят подписва с общ симетричен паролен ключ, публикуван в интернет',
            'Цифровият подпис не използва криптографски ключове',
          ],
          correctIndex: 0,
          explanation: 'При цифровия подпис се изчислява хеш-стойност (digest) на документа, която се криптира с ЧАСТНИЯ ключ на автора. Всеки може да я декриптира с ПУБЛИЧНИЯ ключ на автора и да се увери в авторството и липсата на промени.',
        },
        {
          id: 'dzi-itv2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'Каква е основната разлика между растерната и векторната компютърна графика при многократно увеличаване (мащабиране) на изображението?',
          options: [
            'Растерното изображение запазва идеална острота без загуба на качество, а векторното се пикселизира',
            'Векторното изображение се описва с математически формули на геометрични примитиви (криви на Безие, контури) и се мащабира без загуба на качество, докато растерното е матрица от пиксели и се пикселизира при увеличение',
            'Векторните файлове винаги са стотици пъти по-големи по обем от растерните фотографии',
            'Цветовият модел CMYK се използва само за монитори, а RGB — само за офсетов печат',
          ],
          correctIndex: 1,
          explanation: 'Векторната графика (SVG, AI, EPS) съхранява координати и формули на обекти и се преизчислява без загуба на качество при произволен мащаб, докато растерната графика има фиксирана разделителна способност (PPI/DPI).',
        },
        {
          id: 'dzi-itv2-q6', number: 6, kind: 'choice', points: 3,
          prompt: 'Кой цветови модел е субтрактивен (цветовете се получават чрез поглъщане/отнемане на светлина от мастилата върху белия лист) и се използва като стандарт в полиграфията и цветния печат?',
          options: ['RGB', 'CMYK', 'HSL', 'Grayscale 1-bit'],
          correctIndex: 1,
          explanation: 'CMYK (Cyan, Magenta, Yellow, Key/Black) е субтрактивен цветови модел за печат, докато RGB (Red, Green, Blue) е адитивен модел за излъчващи светлина екрани.',
        },
        {
          id: 'dzi-itv2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'В CSS Box Model кои компоненти се включват в общата ширина на елемент при зададено свойство `box-sizing: border-box; width: 300px;`?',
          options: [
            'Само ширината на съдържанието (`content`), без `padding` и `border`',
            'Съдържанието (`content`), вътрешните отстояния (`padding`) и рамката (`border`) общо се побират в 300px',
            'Външните отстояния (`margin`), `border`, `padding` и `content`',
            'Свойството `border-box` премахва рамките на елемента',
          ],
          correctIndex: 1,
          explanation: 'При `box-sizing: border-box` зададените `width` и `height` включват `content + padding + border`, което улеснява предвидимото оразмеряване на адаптивни (responsive) оформления.',
        },
        {
          id: 'dzi-itv2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'В електронна таблица (MS Excel / LibreOffice Calc) във формулата `= $B4 * C$2` как се променят препратките при копиране на формулата една колона надясно и един ред надолу?',
          options: [
            '`= $B5 * D$2`',
            '`= $C5 * C$3`',
            '`= $B4 * C$2` (не се променя нищо)',
            '`= C5 * D3`',
          ],
          correctIndex: 0,
          explanation: 'В `$B4` колоната `B` е абсолютна (фиксирана със `$`), а редът `4` е относителен и при копиране един ред надолу става `$B5`. В `C$2` колоната `C` е относителна и една колона надясно става `D`, а редът `$2` е фиксиран -> `D$2`.',
        },
        {
          id: 'dzi-itv2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Коя функция в електронните таблици преброява само онези клетки в даден диапазон, които отговарят едновременно на МНОЖЕСТВО зададени критерии в различни колони?',
          options: ['`COUNT`', '`COUNTA`', '`COUNTIFS`', '`VLOOKUP`'],
          correctIndex: 2,
          explanation: '`COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...)` преброява редовете, удовлетворяващи едновременно няколко условия.',
        },
        {
          id: 'dzi-itv2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Кой от следните принципи е задължителен за валиден XML документ („well-formed XML“)?',
          options: [
            'Етикетите (таговете) не са чувствителни към малки и главни букви',
            'Документът трябва да има точно един коренов (root) елемент, всички тагове да са правилно затворени и вложени без пресичане, а стойностите на атрибутите да са в кавички',
            'XML документът има фиксиран набор от 10 предварително дефинирани тага като `<h1>` и `<p>`',
            'Затварящите тагове в XML са незадължителни',
          ],
          correctIndex: 1,
          explanation: 'За да бъде добре фориран (well-formed), XML документът изисква единствен коренов елемент, стриктно затваряне и правилно влагане на всички тагове, чувствителност към регистъра (case-sensitivity) и кавички около атрибутите.',
        },
        {
          id: 'dzi-itv2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'В управлението на проекти коя диаграма визуализира задачите като хоризонтални ленти по календарна времева скала, показвайки началната дата, продължителността, крайния срок и зависимостите между етапите?',
          options: [
            'Кръгова диаграма (Pie Chart)',
            'Диаграма на Гант (Gantt Chart)',
            'Точкова диаграма (Scatter Plot)',
            'ER диаграма (Entity-Relationship)',
          ],
          correctIndex: 1,
          explanation: 'Диаграмата на Гант (Gantt Chart) е стандартният инструмент в управлението на проекти за планиране и следене на графика, критичния път и зависимостите между задачите.',
        },
        {
          id: 'dzi-itv2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'В модела на облачните услуги (Cloud Computing) коя категория предоставя на потребителя готово за работа приложение през уеб браузър (напр. Google Workspace, Microsoft 365, Canva), без потребителят да управлява сървъри, операционна система или среда за изпълнение?',
          options: [
            'IaaS (Infrastructure as a Service — Инфраструктура като услуга)',
            'PaaS (Platform as a Service — Платформа като услуга)',
            'SaaS (Software as a Service — Софтуер като услуга)',
            'BIOS as a Service',
          ],
          correctIndex: 2,
          explanation: 'SaaS (Software as a Service) предоставя напълно функциониращ приложен софтуер през облака.',
        },
        {
          id: 'dzi-itv2-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Какъв вид кибератака представлява изпращането на измамни електронни писма от името на банка или държавна институция с линк към фалшива страница с цел кражба на потребителски пароли и банкови данни?',
          options: [
            'DDoS (Distributed Denial of Service)',
            'Фишинг (Phishing — социално инженерство)',
            'Дефрагментация на диска',
            'Нормализация на база данни',
          ],
          correctIndex: 1,
          explanation: 'Фишингът (Phishing) е форма на социално инженерство, при която жертвата бива подведена сама да въведе поверителни данни във фалшифициран уебсайт.',
        },
        {
          id: 'dzi-itv2-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'Съгласно Общия регламент относно защитата на данните на ЕС (GDPR) как се нарича правото на физическото лице да поиска от администратора заличаване на личните му данни, когато са отпаднали основанията за тяхното обработване?',
          options: [
            'Право на криптиране на сървъра',
            'Право на изтриване („право да бъдеш забравен“ — чл. 17 от GDPR)',
            'Право на безплатен домейн',
            'Право на публичен достъп до чужди лични данни',
          ],
          correctIndex: 1,
          explanation: 'Член 17 от GDPR регламентира правото на изтриване („правото да бъдеш забравен“) при оттегляне на съгласието или отпадане на законовото основание за обработка.',
        },
        {
          id: 'dzi-itv2-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'В уеб разработката и достъпността (WCAG) каква е основната роля на атрибута `alt` в HTML елемента `<img src="diagram.png" alt="Диаграма на мрежовата топология">`?',
          options: [
            'Увеличава резолюцията на изображението два пъти',
            'Осигурява алтернативен текстов описател за екранни четци (за незрящи потребители), за търсачки (SEO) и при неуспешно зареждане на изображението',
            'Задава рамка и сянка около изображението чрез CSS',
            'Преобразува PNG файла във векторен SVG формат',
          ],
          correctIndex: 1,
          explanation: 'Атрибутът `alt` е ключово изискване за уеб достъпност (WCAG) и семантичен HTML — чете се от екранните четци и се показва, ако изображението не може да се зареди.',
        },
      ],
    },
    {
      id: 'it2-part2',
      title: 'Част 2. Задачи с кратък отговор и изчисления (25 т.)',
      instructions: 'Запишете точните числови или текстови отговори към всяка задача и подточка.',
      questions: [
        {
          id: 'dzi-itv2-q16', number: 16, kind: 'short', answerType: 'number', points: 4,
          prompt: t`Некомпресирано растерно изображение има разделителна способност $1920 \times 1080$ пиксела и дълбочина на цвета $24\text{ bit}$ ($3\text{ байта}$ на пиксел, True Color RGB). Колко е информационният обем на изображението в байтове?`,
          acceptedAnswers: ['6220800', '6 220 800'],
          explanation: t`Броят на пикселите е $1920 \cdot 1080 = 2\,073\,600$. При $3\text{ B}$ на пиксел обемът е $2\,073\,600 \cdot 3 = 6\,220\,800\text{ B}$ ($\approx 5{,}93\text{ MiB}$).`,
        },
        {
          id: 'dzi-itv2-q17', number: 17, kind: 'short', answerType: 'number', points: 5,
          prompt: t`За колко секунди ще се прехвърли файл с размер $150\text{ MB}$ ($150 \times 8 = 1200\text{ Mbit}$) по мрежова връзка с постоянна реална скорост на предаване $100\text{ Mbps}$ ($\text{Mbit/s}$)?`,
          acceptedAnswers: ['12'],
          explanation: t`$t = \dfrac{150\text{ MB} \cdot 8\text{ bit/B}}{100\text{ Mbit/s}} = \dfrac{1200\text{ Mbit}}{100\text{ Mbit/s}} = 12\text{ s}$.`,
        },
        {
          id: 'dzi-itv2-q18', number: 18, kind: 'short', answerType: 'number', points: 5,
          prompt: t`Некомпресиран стерео ($2$ канала) аудиозапис с честота на дискретизация $40\,000\text{ Hz}$ ($40\text{ kHz}$), битова дълбочина $16\text{ bit}$ ($2\text{ B}$) и продължителност $10\text{ s}$ се записва във файл. Колко килобайта ($\text{KB}$, при $1\text{ KB} = 1000\text{ B}$) е размерът на аудиоданните?`,
          acceptedAnswers: ['1600'],
          explanation: t`Обемът в байтове е $40\,000\text{ Hz} \cdot 2\text{ B} \cdot 2\text{ канала} \cdot 10\text{ s} = 1\,600\,000\text{ B} = 1600\text{ KB}$.`,
        },
        {
          id: 'dzi-itv2-q19', number: 19, kind: 'multi', points: 5,
          prompt: `В електронна таблица клетките съдържат следните стойности:
\`A1 = 10\`, \`A2 = 20\`, \`A3 = 30\`, \`A4 = 40\`, \`B1 = 5\`, \`B2 = 15\`.`,
          parts: [
            {
              id: 'a', label: 'А)', points: 2,
              prompt: 'Какъв числов резултат ще върне формулата `= AVERAGE(A1:A4) + MIN(B1:B2)`?',
              answer: { type: 'number', acceptedAnswers: ['30'] },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: 'Какъв числов резултат ще върне формулата `= SUMIF(A1:A4; ">=20")`?',
              answer: { type: 'number', acceptedAnswers: ['90'] },
            },
          ],
          explanation: 'А) `AVERAGE(10, 20, 30, 40) = 25`, `MIN(5, 15) = 5` -> $25 + 5 = 30$. Б) Клетките в `A1:A4` със стойност $\\ge 20$ са $20, 30, 40$, чиято сума е $20 + 30 + 40 = 90$.',
        },
        {
          id: 'dzi-itv2-q20', number: 20, kind: 'multi', points: 6,
          prompt: 'Посочете точните протоколи и HTTP кодове при работа с уеб сървър:',
          parts: [
            {
              id: 'a', label: 'А)', points: 3,
              prompt: 'Кой трицифрен HTTP статус код връща уеб сървърът, когато исканият ресурс (страница) НЕ е намерен на сървъра (Not Found)?',
              answer: { type: 'number', acceptedAnswers: ['404'] },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: 'Кой стандартен TCP порт използва протоколът HTTPS за криптирана уеб комуникация чрез TLS/SSL?',
              answer: { type: 'number', acceptedAnswers: ['443'] },
            },
          ],
          explanation: 'HTTP статус код `404 Not Found` показва липсващ ресурс, а стандартният TCP порт за `HTTPS` е `443` (докато некриптираният `HTTP` използва порт `80`).',
        },
      ],
    },
    {
      id: 'it2-part3',
      title: 'Част 3. Практически задачи със свободен отговор (30 т.)',
      instructions: 'Разработете пълните формули, SQL заявки, HTML/CSS код и архитектурно решение. Оценете се по критериите след предаване.',
      questions: [
        {
          id: 'dzi-itv2-q21', number: 21, kind: 'open', points: 15,
          prompt: `Анализ на данни в електронни таблици и релационна база данни за електронен магазин:
Електронен магазин за техника поддържа справка за продажбите в таблица \`Sales\` в MS Excel / Calc (редове от 2 до 501):
– Колона \`A\`: Код на продукта (\`ProductCode\`)
– Колона \`B\`: Категория (\`Category\` — напр. "Лаптопи", "Монитори", "Периферия")
– Колона \`C\`: Единична цена без ДДС (\`UnitPrice\`)
– Колона \`D\`: Продадено количество (\`Qty\`)
– Колона \`E\`: Отстъпка в % (\`DiscountPct\` — стойност $10\\%$ при \`Qty >= 5\`, иначе $0\\%$)
– Колона \`F\`: Крайна сума с включено $20\\%$ ДДС след отстъпката (\`FinalTotal\`).
А) Запишете точните формули за ред 2 в колона \`E2\` (с функция \`IF\`) и колона \`F2\`, както и формулите за:
1) общия оборот само от категория \`"Лаптопи"\` (с \`SUMIF\`);
2) броя на поръчките от категория \`"Лаптопи"\` със сума в колона \`F\` над $2000\\text{ лв.}$ (с \`COUNTIFS\`).
Б) Проектирайте нормализирана релационна схема в 3NF за този магазин (таблици \`Categories\`, \`Products\`, \`Orders\`, \`OrderItems\`), като посочите първичните (PK) и външните ключове (FK), и напишете SQL заявка, която извежда топ 3 на най-продаваните продукти по общ оборот.`,
          criteria: [
            { label: 'А) Коректни формули за E2 (=IF(D2>=5; 0,1; 0)), F2 (=C2*D2*(1-E2)*1,2), SUMIF и COUNTIFS', points: 7 },
            { label: 'Б) Коректна релационна схема в 3NF (разпадане на връзката M:N между Orders и Products чрез OrderItems) и вярна агрегатна SQL заявка с JOIN, GROUP BY и ORDER BY ... DESC LIMIT 3 / TOP 3', points: 8 },
          ],
          modelAnswer: `А) Формули за електронната таблица (MS Excel / Calc):
1. В клетка \`E2\` (процент отстъпка):
\`=IF(D2>=5; 10%; 0%)\`  (или \`=IF(D2>=5, 0.1, 0)\`)
2. В клетка \`F2\` (крайна сума с отстъпка и 20% ДДС):
\`=C2*D2*(1-E2)*1.2\`
3. Общ оборот за категория "Лаптопи":
\`=SUMIF(B2:B501; "Лаптопи"; F2:F501)\`
4. Брой поръчки от категория "Лаптопи" със сума над 2000 лв.:
\`=COUNTIFS(B2:B501; "Лаптопи"; F2:F501; ">2000")\`

Б) Релационна схема в 3NF и SQL заявка:
– Схема на таблиците:
  * \`Categories(CategoryID INT PK, CategoryName VARCHAR(80) NOT NULL)\`
  * \`Products(ProductID INT PK, ProductCode VARCHAR(30) UNIQUE, ProductName VARCHAR(120), CategoryID INT FK -> Categories, UnitPrice DECIMAL(10,2))\`
  * \`Orders(OrderID INT PK, CustomerName VARCHAR(100), OrderDate DATE)\`
  * \`OrderItems(OrderID INT FK -> Orders, ProductID INT FK -> Products, Qty INT, DiscountPct DECIMAL(5,2), PRIMARY KEY (OrderID, ProductID))\`
– SQL заявка за топ 3 продукта по общ оборот:
\`\`\`sql
SELECT p.ProductCode, p.ProductName,
       SUM(oi.Qty * p.UnitPrice * (1 - oi.DiscountPct / 100.0) * 1.20) AS TotalRevenue
FROM Products p
INNER JOIN OrderItems oi ON p.ProductID = oi.ProductID
GROUP BY p.ProductID, p.ProductCode, p.ProductName
ORDER BY TotalRevenue DESC
LIMIT 3;
\`\`\``,
        },
        {
          id: 'dzi-itv2-q22', number: 22, kind: 'open', points: 15,
          prompt: `Уеб разработка, мрежова архитектура и информационна сигурност на училищен портал:
Училище изгражда нов уеб портал за електронни заявления и училищна библиотека.
А) Напишете семантичен и достъпен HTML5 и адаптивен (responsive) CSS3 код за секция с каталожни карти на книги (\`.catalog-grid\`), която на десктоп показва 3 колони чрез CSS Grid или Flexbox, а на мобилни екрани (под \`768px\`) автоматично преминава в 1 колона чрез \`@media\` заявка.
Б) Предложете мрежова и сървърна архитектура за портала и опишете 5 конкретни технически и организационни мерки за киберсигурност и защита на личните данни на учениците съгласно GDPR (мрежово сегментиране, HTTPS/TLS, защита срещу SQL инжекции и XSS, контрол на достъпа и архивиране по правилото 3-2-1).`,
          criteria: [
            { label: 'А) Валиден семантичен HTML5 код (section, article, img с alt, button) и адаптивен CSS3 с Grid/Flexbox и @media (max-width: 768px)', points: 7 },
            { label: 'Б) Пълна и професионално обоснована концепция за мрежова архитектура, киберсигурност (HTTPS, Prepared Statements, RBAC, 2FA, 3-2-1 архиви) и съответствие с GDPR', points: 8 },
          ],
          modelAnswer: `А) Семантичен HTML5 и адаптивен CSS3 код:
\`\`\`html
<section class="catalog-section" aria-labelledby="catalog-heading">
  <h2 id="catalog-heading">Училищна дигитална библиотека</h2>
  <div class="catalog-grid">
    <article class="book-card">
      <img src="pod-igoto.jpg" alt="Корица на романа Под игото от Иван Вазов">
      <h3>Под игото</h3>
      <p class="author">Иван Вазов</p>
      <button type="button">Заяви заемане</button>
    </article>
    <article class="book-card">
      <img src="tjutjun.jpg" alt="Корица на романа Тютюн от Димитър Димов">
      <h3>Тютюн</h3>
      <p class="author">Димитър Димов</p>
      <button type="button">Заяви заемане</button>
    </article>
  </div>
</section>
\`\`\`
\`\`\`css
* {
  box-sizing: border-box;
}
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.book-card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: #ffffff;
}
@media (max-width: 768px) {
  .catalog-grid {
    grid-template-columns: 1fr;
  }
}
\`\`\`

Б) Мрежова архитектура, киберсигурност и GDPR:
1. **Мрежово сегментиране (VLAN и Firewall):** Обособяване на отделни виртуални локални мрежи (VLAN) за администрацията, компютърните кабинети и гост Wi-Fi мрежата; поставяне на уеб сървъра в DMZ зад защитна стена (Firewall), а сървъра с базата данни — във вътрешна изолирана подмрежа без директен публичен достъп.
2. **Криптиране в транзит и в покой:** Задължителен \`HTTPS\` с валиден TLS 1.3 сертификат (порт 443, HSTS), хеширане на потребителските пароли с \`bcrypt\` / \`Argon2\` със сол (salt) и криптиране на дисковете на базата данни.
3. **Защита на уеб приложението (OWASP Top 10):** Използване единствено на параметризирани SQL заявки (Prepared Statements) срещу SQL Injection, валидиране и екраниране на входа (Content Security Policy) срещу XSS и CSRF токени при формите.
4. **Контрол на достъпа (RBAC и 2FA):** Ролево базиран достъп (Ученик, Учител, Библиотекар, Администратор) по принципа на минималните привилегии и двуфакторна автентикация (2FA) за администраторските профили.
5. **Архивиране (правило 3-2-1) и GDPR:** Автоматични ежедневни криптирани резервни копия по правилото 3-2-1 (3 копия, на 2 различни носителя, 1 в отдалечен облак); минимизиране на събираните лични данни, прозрачна политика за поверителност и журнал за одит на достъпа.`,
        },
      ],
    },
  ],
};
