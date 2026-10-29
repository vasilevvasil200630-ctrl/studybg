import type { FormulaSheet } from './nvo10Math';

const t = String.raw;

export const DZI_INFORMATICS_FORMULAS: FormulaSheet = {
  id: 'dzi-informatics',
  title: 'Справочник — Информатика, ИТ и Програмиране',
  sourceLabel: 'Справочник за ДЗИ по Информатика/ИТ и ДИППК по Програмиране',
  sourceUrl: 'https://www.mon.bg/nfs/2022/01/uip_dzi_informatika_17012022.pdf',
  categories: [
    { id: 'all', label: 'Всички' },
    { id: 'complexity', label: 'Сложност и структури от данни' },
    { id: 'num-logic', label: 'Бройни системи и булева логика' },
    { id: 'sql', label: 'Бази данни и SQL' },
    { id: 'networks', label: 'Мрежи, CIDR и обем данни' },
  ],
  groups: [
    {
      id: 'inf-complexity-graphs',
      title: 'Анализ на алгоритми, дървета и графи',
      category: 'complexity',
      keywords: ['сложност', 'big o', 'асимптотична сложност', 'прогресия', 'цикъл', 'дърво', 'граф', 'двоично дърво', 'сортиране', 'търсене'],
      entries: [
        {
          id: 'inf-loop-sums',
          label: 'Суми на редове при анализ на вложени цикли (аритметична и геометрична прогресия)',
          tex: [
            t`\sum_{i=1}^{n} i = 1 + 2 + \dots + n = \dfrac{n(n+1)}{2} = \Theta(n^2)`,
            t`\sum_{i=1}^{n} i^2 = \dfrac{n(n+1)(2n+1)}{6} = \Theta(n^3)`,
            t`\sum_{i=0}^{k} 2^i = 1 + 2 + 4 + \dots + 2^k = 2^{k+1} - 1`,
          ],
          keywords: ['вложени цикли', 'брой итерации', 'аритметична прогресия', 'геометрична прогресия'],
        },
        {
          id: 'inf-log-identities',
          label: 'Логаритмични зависимости при двоично търсене и „разделяй и владей“',
          tex: [
            t`\log_2(a\cdot b) = \log_2 a + \log_2 b`,
            t`\log_2(n^k) = k\log_2 n`,
            t`k = \lfloor \log_2 n \rfloor + 1\quad (\text{брой стъпки при двоично търсене})`,
          ],
          keywords: ['логаритъм', 'двоично търсене', 'binary search', 'разделяй и владей'],
        },
        {
          id: 'inf-trees-properties',
          label: t`Свойства на дървета и пълно двоично дърво с височина $h$ (корен на ниво $0$)`,
          tex: [
            t`E = V - 1\quad (\text{брой ребра } E \text{ в дърво с } V \text{ върха})`,
            t`N_{\text{ниво } k} \le 2^k`,
            t`N_{\text{общо върхове}} = 2^{h+1} - 1,\quad h = \lfloor \log_2 N \rfloor`,
          ],
          keywords: ['дърво', 'върхове', 'ребра', 'пълно двоично дърво', 'височина на дърво', 'листа'],
        },
        {
          id: 'inf-graphs-properties',
          label: t`Свойства на неориентиран и ориентиран граф с $V$ върха и $E$ ребра`,
          tex: [
            t`\sum_{v \in V} \operatorname{deg}(v) = 2E\quad (\text{лема за ръкостисканията})`,
            t`E_{\max\text{ (неориентиран)}} = \dfrac{V(V-1)}{2}`,
            t`E_{\max\text{ (ориентиран)}} = V(V-1)`,
          ],
          keywords: ['граф', 'степен на връх', 'пълен граф', 'матрица на съседство', 'списък на съседите'],
        },
      ],
      tables: [
        {
          head: [
            'Структура от данни / Алгоритъм',
            'Достъп / Търсене (средно)',
            'Вмъкване / Изтриване (средно)',
            'Най-лош случай (време)',
            'Памет и особености',
          ],
          rows: [
            [
              'Масив / Динамичен масив (`Array` / `List`)',
              'Достъп по индекс: $O(1)$, Търсене: $O(n)$',
              'В края: $O(1)$ амортизирано, В средата: $O(n)$',
              '$O(n)$',
              '$O(n)$ — непрекъсната област в паметта',
            ],
            [
              'Свързан списък (`LinkedList`)',
              '$O(n)$',
              'При известен указател: $O(1)$',
              '$O(n)$',
              '$O(n)$ — динамични възли с указатели',
            ],
            [
              'Стек (`Stack` — LIFO) и Опашка (`Queue` — FIFO)',
              'Връх / Начало (`Peek`): $O(1)$',
              '`Push` / `Pop` / `Enqueue` / `Dequeue`: $O(1)$',
              '$O(1)$',
              '$O(n)$ — базирани на масив или списък',
            ],
            [
              'Хеш-таблица (`Dictionary` / `HashMap`)',
              '$O(1)$',
              '$O(1)$',
              '$O(n)$ (при колизии)',
              '$O(n)$ — бързо търсене по ключ',
            ],
            [
              'Балансирано двоично дърво за търсене (BST)',
              '$O(\\log n)$',
              '$O(\\log n)$',
              '$O(\\log n)$ ($O(n)$ при изродено)',
              '$O(n)$ — поддържа елементите сортирани',
            ],
            [
              'Двоично търсене (`Binary Search`)',
              '$O(\\log n)$ (изисква сортиран масив)',
              '—',
              '$O(\\log n)$',
              '$O(1)$ итеративно / $O(\\log n)$ рекурсивно',
            ],
            [
              '`Bubble Sort` / `Selection Sort` / `Insertion Sort`',
              'Най-добър: $O(n)$ (за Bubble/Insertion)',
              'Среден случай: $O(n^2)$',
              '$O(n^2)$',
              '$O(1)$ допълнителна памет (in-place)',
            ],
            [
              'Сортиране чрез сливане (`Merge Sort`)',
              'Най-добър: $O(n \\log n)$',
              'Среден случай: $O(n \\log n)$',
              '$O(n \\log n)$',
              '$O(n)$ допълнителна памет, стабилно сортиране',
            ],
            [
              'Бързо сортиране (`Quick Sort`)',
              'Най-добър: $O(n \\log n)$',
              'Среден случай: $O(n \\log n)$',
              '$O(n^2)$ (при лош опорен елемент)',
              '$O(\\log n)$ стекова памет, много бързо на практика',
            ],
            [
              'Пирамидално сортиране (`Heap Sort`)',
              'Най-добър: $O(n \\log n)$',
              'Среден случай: $O(n \\log n)$',
              '$O(n \\log n)$',
              '$O(1)$ допълнителна памет (in-place, нестабилно)',
            ],
            [
              'Обхождане на граф (`BFS` / `DFS`)',
              '$O(V + E)$ (списък на съседите)',
              '—',
              '$O(V^2)$ (матрица на съседство)',
              '$O(V)$ памет за посетени върхове и опашка/стек',
            ],
          ],
        },
      ],
    },
    {
      id: 'inf-numeral-systems-logic',
      title: 'Позиционни бройни системи, целочислена аритметика и булева алгебра',
      category: 'num-logic',
      keywords: ['бройна система', 'двоична', 'шестнадесетична', 'десетична', 'допълнителен код', 'де морган', 'булева алгебра', 'побитови операции', 'xor'],
      entries: [
        {
          id: 'inf-positional-value',
          label: t`Стойност на число в позиционна бройна система с основа $b$ ($b \ge 2$)`,
          tex: [
            t`\left(d_{n-1}d_{n-2}\dots d_1d_0{,}d_{-1}\dots d_{-m}\right)_b = \sum_{i=-m}^{n-1} d_i \cdot b^i`,
          ],
          keywords: ['позиционна бройна система', 'основа', 'преобразуване в десетична'],
        },
        {
          id: 'inf-integer-ranges',
          label: t`Диапазон на $n$-битово цяло число без знак (unsigned) и със знак в допълнителен код (two's complement)`,
          tex: [
            t`\text{Без знак (unsigned): } \left[0;\ 2^n - 1\right]`,
            t`\text{Със знак (signed): } \left[-2^{n-1};\ 2^{n-1} - 1\right]`,
            t`\text{За } n=8:\ [-128;\ 127],\quad \text{за } n=16:\ [-32\,768;\ 32\,767],\quad \text{за } n=32:\ [-2^{31};\ 2^{31}-1]`,
          ],
          keywords: ['диапазон', 'цяло число', 'signed', 'unsigned', 'byte', 'short', 'int', 'препълване'],
        },
        {
          id: 'inf-twos-complement',
          label: t`Представяне на отрицателно число $-X$ ($X > 0$) в $n$-битов допълнителен код`,
          tex: [
            t`\text{Допълнителен код}(-X) = 2^n - X = \overline{X} + 1`,
          ],
          keywords: ['допълнителен код', 'обратен код', 'прав код', 'отрицателно число'],
        },
        {
          id: 'inf-de-morgan',
          label: 'Закони на Де Морган и основни тъждества в булевата алгебра',
          tex: [
            t`\overline{A \land B} = \overline{A} \lor \overline{B},\quad \overline{A \lor B} = \overline{A} \land \overline{B}`,
            t`A \lor (A \land B) = A,\quad A \land (A \lor B) = A\quad (\text{закони за поглъщане})`,
            t`A \oplus B = (A \land \overline{B}) \lor (\overline{A} \land B)\quad (\text{изключващо ИЛИ / XOR})`,
          ],
          keywords: ['де морган', 'конюнкция', 'дизюнкция', 'отрицание', 'булева логика', 'xor', 'импликация'],
        },
        {
          id: 'inf-bitwise-shifts',
          label: 'Побитово отместване и маски за проверка/вдигане на $k$-ти бит',
          tex: [
            t`x \ll k = x \cdot 2^k,\quad x \gg k = \lfloor x / 2^k \rfloor`,
            t`\text{Проверка на } k\text{-ти бит: } (x\ \&\ (1 \ll k)) \ne 0`,
          ],
          keywords: ['побитови операции', 'отместване', 'битова маска', 'shift'],
        },
      ],
    },
    {
      id: 'inf-sql-databases',
      title: 'Релационни бази данни и SQL заявки',
      category: 'sql',
      keywords: ['sql', 'база данни', 'select', 'join', 'group by', 'having', 'where', 'нормализация', 'първичен ключ', 'външен ключ', 'агрегатни функции'],
      entries: [
        {
          id: 'inf-sql-order',
          label: 'Синтактичен ред на клаузите в SQL `SELECT` заявка и логически ред на изпълнение',
          tex: [
            t`\text{Писане: }\texttt{SELECT} \rightarrow \texttt{FROM} \rightarrow \texttt{JOIN} \rightarrow \texttt{WHERE} \rightarrow \texttt{GROUP BY} \rightarrow \texttt{HAVING} \rightarrow \texttt{ORDER BY}`,
            t`\text{Изпълнение: }\texttt{FROM/JOIN} \rightarrow \texttt{WHERE} \rightarrow \texttt{GROUP BY} \rightarrow \texttt{HAVING} \rightarrow \texttt{SELECT} \rightarrow \texttt{ORDER BY}`,
          ],
          keywords: ['ред на изпълнение', 'sql заявка', 'select', 'where', 'group by', 'having', 'order by'],
        },
        {
          id: 'inf-sql-aggregates',
          label: 'Връзка между агрегатни функции `SUM`, `AVG`, `COUNT` и обработка на `NULL` стойности',
          tex: [
            t`\texttt{AVG}(X) = \dfrac{\texttt{SUM}(X)}{\texttt{COUNT}(X)}\quad (\text{игнорира }\texttt{NULL}\text{ стойностите в колона } X)`,
            t`\texttt{COUNT}(*) = N_{\text{всички редове}},\quad \texttt{COUNT}(X) = N_{\text{редове с } X \text{ IS NOT NULL}}`,
          ],
          keywords: ['агрегатни функции', 'count', 'sum', 'avg', 'min', 'max', 'null'],
        },
        {
          id: 'inf-sql-cardinality',
          label: t`Брой редове (кардиналност) при декартово произведение (\`CROSS JOIN\`) и връзка $1:N$ (\`INNER JOIN\`) между таблици $R_1$ и $R_2$`,
          tex: [
            t`|R_1 \times R_2| = |R_1| \cdot |R_2|`,
            t`\text{При връзка } 1:N \text{ (родител–дете): } |R_{\text{родител}} \bowtie R_{\text{дете}}| \le |R_{\text{дете}}|`,
          ],
          keywords: ['кардиналност', 'степен на релация', 'inner join', 'left join', 'cross join', 'външен ключ'],
        },
        {
          id: 'inf-db-normal-forms',
          label: 'Нормални форми на релационна база данни (1NF, 2NF, 3NF)',
          tex: [
            t`\text{1NF: всички атрибути са атомарни (неделими)}`,
            t`\text{2NF: 1NF + пълна функционална зависимост от целия съставен първичен ключ}`,
            t`\text{3NF: 2NF + липса на транзитивни зависимости между неключови атрибути}`,
          ],
          keywords: ['нормализация', 'първа нормална форма', 'втора нормална форма', 'трета нормална форма', 'първичен ключ'],
        },
      ],
    },
    {
      id: 'inf-networks-multimedia',
      title: 'Компютърни мрежи (IPv4 / CIDR) и информационен обем на данни',
      category: 'networks',
      keywords: ['мрежи', 'ip адрес', 'ipv4', 'cidr', 'подмрежова маска', 'хостове', 'изображение', 'звук', 'аудио', 'резолюция', 'битова дълбочина'],
      entries: [
        {
          id: 'inf-ipv4-hosts',
          label: t`Брой IPv4 адреси и използваеми хостове при префикс $/\!p$ ($p$ единици в маската, $h = 32 - p$ бита за хост)`,
          tex: [
            t`N_{\text{общо адреси}} = 2^{32-p} = 2^h`,
            t`N_{\text{използваеми хостове}} = 2^{32-p} - 2\quad (\text{без адрес на мрежата и broadcast адрес})`,
          ],
          keywords: ['подмрежова маска', 'cidr', 'брой хостове', 'broadcast', 'мрежов адрес'],
        },
        {
          id: 'inf-ipv4-network-addr',
          label: 'Намиране на адрес на мрежата чрез побитово И (`AND`) на IP адреса и подмрежовата маска',
          tex: [
            t`\text{Network Address} = \text{IP Address}\ \&\ \text{Subnet Mask}`,
          ],
          keywords: ['побитово и', 'адрес на мрежата', 'subnet mask'],
        },
        {
          id: 'inf-image-size',
          label: t`Обем на некомпресирано растерно изображение ($W \times H$ пиксела, дълбочина на цвета $b\text{ bpp}$, палитра $K = 2^b$ цвята)`,
          tex: [
            t`K = 2^b\quad \Longleftrightarrow \quad b = \lceil \log_2 K \rceil\text{ бита на пиксел}`,
            t`V = W \cdot H \cdot b\text{ [бита]} = \dfrac{W \cdot H \cdot b}{8}\text{ [байта]}`,
          ],
          keywords: ['растерно изображение', 'пиксели', 'дълбочина на цвета', 'rgb', 'true color', 'обем на файл'],
        },
        {
          id: 'inf-audio-size',
          label: t`Обем на некомпресиран цифров звуков файл ($f_s$ — честота на дискретизация в $\text{Hz}$, $b$ — битова дълбочина, $c$ — брой канали, $t$ — време в $\text{s}$)`,
          tex: [
            t`V = f_s \cdot b \cdot c \cdot t\text{ [бита]} = \dfrac{f_s \cdot b \cdot c \cdot t}{8}\text{ [байта]}`,
          ],
          keywords: ['звуков файл', 'аудио', 'дискретизация', 'моно', 'стерео', 'битова дълбочина'],
        },
        {
          id: 'inf-data-units-transfer',
          label: t`Двоични единици за обем информация и време за предаване на данни по канал със скорост $v_{\text{bit/s}}$`,
          tex: [
            t`1\text{ B} = 8\text{ bit},\quad 1\text{ KiB} = 2^{10}\text{ B} = 1024\text{ B},\quad 1\text{ MiB} = 2^{20}\text{ B},\quad 1\text{ GiB} = 2^{30}\text{ B}`,
            t`t = \dfrac{V}{v}`,
          ],
          keywords: ['байт', 'килобайт', 'мегабайт', 'гигабайт', 'скорост на трансфер', 'бит в секунда'],
        },
      ],
      tables: [
        {
          head: [
            'CIDR префикс',
            'Десетична подмрежова маска',
            'Брой битове за хост ($h = 32 - p$)',
            'Общ брой IPv4 адреси ($2^h$)',
            'Използваеми хостове ($2^h - 2$)',
          ],
          rows: [
            ['`/24`', '`255.255.255.0`', '$8$', '$256$', '$254$'],
            ['`/25`', '`255.255.255.128`', '$7$', '$128$', '$126$'],
            ['`/26`', '`255.255.255.192`', '$6$', '$64$', '$62$'],
            ['`/27`', '`255.255.255.224`', '$5$', '$32$', '$30$'],
            ['`/28`', '`255.255.255.240`', '$4$', '$16$', '$14$'],
            ['`/29`', '`255.255.255.248`', '$3$', '$8$', '$6$'],
            ['`/30`', '`255.255.255.252`', '$2$', '$4$', '$2$ (точка–точка връзка)'],
          ],
        },
      ],
    },
  ],
};
