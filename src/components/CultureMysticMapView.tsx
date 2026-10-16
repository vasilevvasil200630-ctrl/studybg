import React, { useState } from 'react';
import {
  MapPin,
  ShieldAlert,
  Sparkles,
  Radio,
  Eye,
  Layers,
  ArrowRight,
  Navigation
} from 'lucide-react';

interface MysticZoneItem {
  id: string;
  codeName: string;
  title: string;
  region: string;
  coordsText: string;
  /** SVG percentage coordinates on the Bulgaria map canvas (0-100) */
  mapX: number;
  mapY: number;
  clearance: 'top_secret' | 'anomaly' | 'ancient_code' | 'underground';
  clearanceLabel: string;
  frequencyOrMetric: string;
  summary: string;
  secretProtocol: string;
  linkedMysteryId?: string;
}

const MYSTIC_ZONES: MysticZoneItem[] = [
  {
    id: 'zone-tsarichina',
    codeName: 'ОПЕРАЦИЯ „СЛАВА“ (1990–1992)',
    title: 'Спираловидният военен тунел в с. Царичина',
    region: 'Софийска област (общ. Костинброд)',
    coordsText: '42°53\'N, 23°15\'E',
    mapX: 25,
    mapY: 46,
    clearance: 'top_secret',
    clearanceLabel: '🔴 СТРОГО СЕКРЕТНО (ГЩ)',
    frequencyOrMetric: 'Дълбочина: 165 м • 16 секретни тома',
    summary: 'Двегодишна засекретена военна експедиция на Генералния щаб, изкопала спираловиден тунел по диктовка на сензитиви в търсене на първия двуполов прародител и извънземен биологичен код.',
    secretProtocol: 'На 19 ноември 1992 г. обектът е внезапно запечатан с тонове стоманобетон, а дневниците са засекретени.',
    linkedMysteryId: 'mystery-tsarichina-operation-slava'
  },
  {
    id: 'zone-bastet-strandzha',
    codeName: 'МИСИЯ „БАСТЕТ“ (1981)',
    title: 'Гробницата на богинята Бастет в м. Мишкова нива',
    region: 'Странджа (край Малко Търново)',
    coordsText: '41°58\'N, 27°29\'E',
    mapX: 82,
    mapY: 79,
    clearance: 'top_secret',
    clearanceLabel: '🔴 ДЪРЖАВНА ЕКСПЕДИЦИЯ',
    frequencyOrMetric: 'Радиоактивен гранит • V–III в. пр.Хр.',
    summary: 'Тайна правителствена експедиция под егидата на Людмила Живкова и указанията на Ванга по разчетени знаци върху египетска мумия, сочещи към светилище в Странджа.',
    secretProtocol: 'Свидетели описват сияние над върха и гладък полиран изкуствен свод в скалата под връх Голямо Градище.',
    linkedMysteryId: 'mystery-strandzha-bastet-mishkova-niva'
  },
  {
    id: 'zone-magura',
    codeName: 'КОДЪТ „МАГУРА“ (-40 000 г.)',
    title: 'Слънчевият календар и ДНК спиралата в пещера „Магурата“',
    region: 'Северозападна България (с. Рабиша)',
    coordsText: '43°43\'N, 22°35\'E',
    mapX: 16,
    mapY: 18,
    clearance: 'ancient_code',
    clearanceLabel: '🟡 ДРЕВЕН КОД (42 000 г.)',
    frequencyOrMetric: '366 дни • Шахматни и соларни матрици',
    summary: 'Над 700 праисторически рисунки, изписани с многопластово прилепно гуано. Включва най-древния слънчев календар в Европа и „Сцената на Сътворението“ с Т-образни антени.',
    secretProtocol: 'Галерията с рисунките има постоянна температура 12°C и специфична йонизация на въздуха.',
    linkedMysteryId: 'mystery-magura-cosmic-code'
  },
  {
    id: 'zone-belintash',
    codeName: 'РОДОПСКИ ТРИЪГЪЛНИК',
    title: 'Белинташ – Караджов камък – Кръстова гора',
    region: 'Централни Родопи (Асеновградско)',
    coordsText: '41°50\'N, 24°58\'E',
    mapX: 48,
    mapY: 77,
    clearance: 'anomaly',
    clearanceLabel: '🟣 МАГНИТНА АНОМАЛИЯ',
    frequencyOrMetric: 'Отклонение на компаса • Огледална звездна карта',
    summary: 'Равнобедрен енергиен триъгълник от три мегалитни светилища върху тектонски разлом с висока концентрация на железни и магнитни руди, изкривяващи стрелките на компасите.',
    secretProtocol: 'Улеите и стотиците кръгли кладенчета върху Белинташ повтарят проекцията на съзвездията Орион, Голяма мечка и Лъв.',
    linkedMysteryId: 'mystery-belintash-energy-triangle'
  },
  {
    id: 'zone-perperikon-harman',
    codeName: 'ОРАКУЛЪТ НА ДИОНИС',
    title: 'Перперикон и астрономическото плато Харман Кая',
    region: 'Източни Родопи (Кърджалийско)',
    coordsText: '41°43\'N, 25°28\'E',
    mapX: 57,
    mapY: 82,
    clearance: 'ancient_code',
    clearanceLabel: '🟡 ДРЕВНА ОБСЕРВАТОРИЯ',
    frequencyOrMetric: 'Слънчеви прорези за равноденствията',
    summary: 'Мегалитен комплекс, където според римския историк Светоний на Александър Велики и бащата на Октавиан Август е предсказано, че ще завладеят света чрез винено-огнен ритуал.',
    secretProtocol: 'Изсечените в скалата трапецовидни ниши и оптични коридори измерват зимното и лятното слънцестоене с точност до минута.',
    linkedMysteryId: 'mystery-orpheus-head-oracle'
  },
  {
    id: 'zone-rupite',
    codeName: 'ГЕОТЕРМАЛЕН ВЪЗЕЛ „КОЖУХ“',
    title: 'Рупите и кратерът на загасналия вулкан Кожух',
    region: 'Югозападна България (Петричко)',
    coordsText: '41°27\'N, 23°15\'E',
    mapX: 25,
    mapY: 88,
    clearance: 'anomaly',
    clearanceLabel: '🟣 ЕНЕРГИЕН & ТЕРМАЛЕН ВЪЗЕЛ',
    frequencyOrMetric: 'Минерални извори 74°C • Древна Хераклея Синтика',
    summary: 'Котловина в кратера на загасналия вулкан Кожух, която пророчицата Ванга нарича свой „енергиен акумулатор“, зареждащ я със сили над погребания античен град.',
    secretProtocol: 'Висока естествена геотермална активност, рядка ендемична флора и пресечна точка на южния меридиан.',
    linkedMysteryId: 'mystery-lozanov-suggestopedia-vanga'
  },
  {
    id: 'zone-rila-lakes',
    codeName: 'ДУХОВЕН МЕРИДИАН РИЛА',
    title: 'Седемте рилски езера и Паневритмията на Петър Дънов',
    region: 'Рила планина (2100–2500 м н.в.)',
    coordsText: '42°12\'N, 23°19\'E',
    mapX: 27,
    mapY: 66,
    clearance: 'anomaly',
    clearanceLabel: '🟣 САКРАЛНА ГЕОМЕТРИЯ',
    frequencyOrMetric: '7 глациални тераси • Хармонични цикли',
    summary: 'На 19 август край езерото „Бъбрека“ се изпълняват концентричните кръгове на Паневритмията — система от музикални интервали и геометрия за синхрон с природните ритми.',
    secretProtocol: 'Легендата за 7-те енергийни центъра на Рила, свързани по меридиана с Магурата на север и Рупите на юг.',
    linkedMysteryId: 'mystery-danov-paneurhythmy-rila-code'
  },
  {
    id: 'zone-sofia-urvich',
    codeName: 'ПОДЗЕМНА СЕРДИКА & УРВИЧ',
    title: 'Подземните тунели под София и 7-те хазни при крепостта Урвич',
    region: 'София и Искърското дефиле (Плана / Лозенска планина)',
    coordsText: '42°41\'N, 23°19\'E',
    mapX: 28,
    mapY: 54,
    clearance: 'underground',
    clearanceLabel: '🔵 ПОДЗЕМЕН ЛАБИРИНТ',
    frequencyOrMetric: 'Многоетажни галерии • Шишманови нишани',
    summary: 'Мрежа от римски галерии, правителствени бункери под ларгото на София и скалните знаци (стрели, кръстове и змии) за седемте запечатани хазни на цар Иван Шишман при Урвич.',
    secretProtocol: 'Подземните комуникационни коридори между бившия мавзолей, Министерския съвет и ЦУМ остават частично запечатани.',
    linkedMysteryId: 'mystery-sofia-plovdiv-underground-tunnels'
  },
  {
    id: 'zone-tsarevets-library',
    codeName: 'ТАЙНИЯТ АРХИВ НА ТЪРНОВГРАД',
    title: 'Катакомбите на Царевец и Патриаршеската библиотека (1393 г.)',
    region: 'Велико Търново (хълм Царевец)',
    coordsText: '43°05\'N, 25°39\'E',
    mapX: 56,
    mapY: 36,
    clearance: 'underground',
    clearanceLabel: '🔵 ЗАПЕЧАТАНА КРИПТА',
    frequencyOrMetric: 'Златни обкови • Богомилски апокрифи',
    summary: 'Преди падането на Търновград през юли 1393 г. патриарх Евтимий запечатва най-ценните царски хрисовули и древни книги в тайна подземна крипта под крепостта и р. Янтра.',
    secretProtocol: 'Свързана с разпространението на „Тайната книга на Богомилите“ към катарите в крепостта Монсегюр.',
    linkedMysteryId: 'mystery-bogomils-secret-book-grail'
  },
  {
    id: 'zone-kazanlak-starosel',
    codeName: 'АКУСТИКА 110 Hz (ЗАЛМОКСИС)',
    title: 'Долината на тракийските царе и куполните храмове (Старосел / Казанлък)',
    region: 'Подбалкански котловини и Средна гора',
    coordsText: '42°37\'N, 25°24\'E',
    mapX: 51,
    mapY: 53,
    clearance: 'ancient_code',
    clearanceLabel: '🟡 АКУСТИЧЕН РЕЗОНАНС 110 Hz',
    frequencyOrMetric: '110–112 Hz стоящи вълни • Тета-ритъм',
    summary: 'Каменните „кошерни“ куполи (толоси) в Старосел, Казанлък и Александрово са математически изчислени акустични резонатори, които усилват мъжкия баритон точно на 110 Hz.',
    secretProtocol: 'При честота 110 Hz (Алфа/Тета граница) се потиска езиковият център и се активира дясното полукълбо за мистичен транс.',
    linkedMysteryId: 'mystery-thracian-110hz-resonance'
  },
  {
    id: 'zone-devils-bridge',
    codeName: 'ПЕЧАТЪТ НА СОЛОМОН (1518 г.)',
    title: 'Дяволският мост над р. Арда и скритият хексагон',
    region: 'Родопи (край гр. Ардино)',
    coordsText: '41°37\'N, 25°07\'E',
    mapX: 52,
    mapY: 85,
    clearance: 'ancient_code',
    clearanceLabel: '🟡 ЕСОТЕРИЧЕН ШИФЪР',
    frequencyOrMetric: 'Ключов камък с хексагон • Огледална сянка',
    summary: 'Майстор Димитър вгражда в централния свод тайния „Печат на Соломон“, а между 11:00 и 12:00 ч. арката и нейното отражение във водата образуват идеален геометричен образ.',
    secretProtocol: 'Мостът издържа над 500 години придойделите води на р. Арда без нито една стоманена скоба или цимент.',
    linkedMysteryId: 'mystery-devils-bridge-ardino-seal'
  },
  {
    id: 'zone-black-sea-anoxic',
    codeName: 'МЪРТВАТА ЗОНА (-2000 м)',
    title: 'Черноморският потоп (5600 г. пр.Хр.) и „Флотът на призраците“',
    region: 'Българска акватория на Черно море',
    coordsText: '42°45\'N, 28°30\'E',
    mapX: 91,
    mapY: 50,
    clearance: 'underground',
    clearanceLabel: '🔵 ПОДВОДНА АНОМАЛИЯ (H₂S)',
    frequencyOrMetric: 'Под 150 м: 0% кислород • 60 запазени кораба',
    summary: 'След катастрофалния пробив на Босфора се формира безкислороден сероводороден слой, в който експедицията MAP откри над 60 антични кораба с непокътнати мачти и въжета.',
    secretProtocol: 'Край Варна и Созопол под водата лежат потопени селища от епохата на най-старото обработено злато в света.',
    linkedMysteryId: 'mystery-black-sea-deluge-ships'
  }
];

interface CultureMysticMapViewProps {
  onOpenMysteryDossier?: (mysteryId: string) => void;
}

export const CultureMysticMapView: React.FC<CultureMysticMapViewProps> = ({
  onOpenMysteryDossier
}) => {
  const [selectedClearance, setSelectedClearance] = useState<string>('all');
  const [selectedZoneId, setSelectedZoneId] = useState<string>(MYSTIC_ZONES[0].id);
  const [showLeyLines, setShowLeyLines] = useState<boolean>(true);

  const filteredZones = MYSTIC_ZONES.filter(
    (z) => selectedClearance === 'all' || z.clearance === selectedClearance
  );

  const activeZone = MYSTIC_ZONES.find((z) => z.id === selectedZoneId) || MYSTIC_ZONES[0];

  return (
    <div className="space-y-6">
      {/* Top Radar Header */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>СЕКРЕТНА КАРТОГРАФИЯ • 12 АНОМАЛНИ И МИСТИЧНИ ЗОНИ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Интерактивен Радар на Конспиративните, Енергийните и Древните Зони в България
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Кликни върху пиновете на картата, за да инспектираш координатите, магнитните и акустичните аномалии, грифа за секретност и енергийните меридиани между обектите.
          </p>
        </div>

        <button
          onClick={() => setShowLeyLines(!showLeyLines)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all shrink-0 cursor-pointer ${
            showLeyLines
              ? 'bg-amber-500 text-amber-950 border-amber-400 shadow-sm'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{showLeyLines ? 'Енергийни линии: ВКЛ.' : 'Енергийни линии: ИЗКЛ.'}</span>
        </button>
      </div>

      {/* Clearance Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
        {[
          { id: 'all', label: `Всички зони (${MYSTIC_ZONES.length})` },
          { id: 'top_secret', label: '🔴 Строго секретни експедиции' },
          { id: 'anomaly', label: '🟣 Магнитни & Енергийни аномалии' },
          { id: 'ancient_code', label: '🟡 Древни кодове & 110 Hz акустика' },
          { id: 'underground', label: '🔵 Подземни тунели & Черно море' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedClearance(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedClearance === f.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Interactive SVG Map + Active Telemetry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Interactive Radar Map of Bulgaria */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3 pb-2 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Navigation className="w-3.5 h-3.5" />
              <span>ГЕО-РАДАР БЪЛГАРИЯ (41°N–44°N / 22°E–29°E)</span>
            </span>
            <span>ИЗБРАН ОБЕКТ: {activeZone.codeName}</span>
          </div>

          {/* Map Canvas */}
          <div className="relative w-full aspect-[16/10] rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/90 overflow-hidden">
            {/* Subtle Radar Grid & Bulgaria Stylized Contour */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full absolute inset-0"
            >
              {/* Grid lines */}
              {[20, 40, 60, 80].map((pos) => (
                <React.Fragment key={pos}>
                  <line x1={pos} y1={0} x2={pos} y2={100} stroke="#1e293b" strokeWidth="0.3" strokeDasharray="1,1" />
                  <line x1={0} y1={pos} x2={100} y2={pos} stroke="#1e293b" strokeWidth="0.3" strokeDasharray="1,1" />
                </React.Fragment>
              ))}

              {/* Stylized Bulgaria Territory Polygon */}
              <polygon
                points="10,12 24,14 45,18 68,16 86,12 88,28 83,46 86,65 84,82 65,86 45,90 20,92 12,72 14,45 8,28"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="0.8"
              />

              {/* Energy Ley Lines & Triangles when enabled */}
              {showLeyLines && (
                <g>
                  {/* 1. Western Spiritual Meridian: Magurata (16,18) -> Tsarichina (25,46) -> Sofia (28,54) -> Rila (27,66) -> Rupite (25,88) */}
                  <polyline
                    points="16,18 25,46 28,54 27,66 25,88"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="0.6"
                    strokeDasharray="1.5,1.5"
                    opacity="0.85"
                  />
                  {/* 2. Rhodope Energy Triangle: Belintash (48,77) - Perperikon (57,82) - Devil's Bridge (52,85) */}
                  <polygon
                    points="48,77 57,82 52,85"
                    fill="rgba(168, 85, 247, 0.18)"
                    stroke="#c084fc"
                    strokeWidth="0.7"
                  />
                  {/* 3. Thracian Solar Axis: Starosel (51,53) -> Perperikon (57,82) -> Strandzha Bastet (82,79) -> Black Sea (91,50) */}
                  <polyline
                    points="51,53 57,82 82,79 91,50"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.6"
                    strokeDasharray="1.5,1.5"
                    opacity="0.8"
                  />
                </g>
              )}
            </svg>

            {/* Interactive Zone Pins */}
            {filteredZones.map((zone) => {
              const isSelected = zone.id === activeZone.id;
              const pinColor =
                zone.clearance === 'top_secret'
                  ? 'bg-rose-500 border-rose-200 text-white'
                  : zone.clearance === 'anomaly'
                  ? 'bg-purple-500 border-purple-200 text-white'
                  : zone.clearance === 'ancient_code'
                  ? 'bg-amber-500 border-amber-200 text-amber-950'
                  : 'bg-sky-500 border-sky-200 text-white';

              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  style={{ left: `${zone.mapX}%`, top: `${zone.mapY}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all ${
                    isSelected ? 'z-30 scale-125' : 'z-10 hover:scale-110'
                  }`}
                  title={`${zone.title} (${zone.coordsText})`}
                >
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping" />
                  )}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-md ${pinColor} ${
                      isSelected ? 'ring-2 ring-white' : ''
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={`mt-1 block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap shadow-sm ${
                      isSelected
                        ? 'bg-amber-400 text-amber-950'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {zone.codeName.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legend Strip */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Военни/Секретни</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Енергийни/Магнитни</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Древни кодове (110 Hz)</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                <span>Подземни/Подводни</span>
              </span>
            </div>
            <span className="font-mono text-amber-400">
              Западен меридиан: Магурата – Царичина – Рила – Рупите
            </span>
          </div>
        </div>

        {/* Right 5 Cols: Active Zone Secret Dossier Card */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              {activeZone.clearanceLabel}
            </span>
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              {activeZone.coordsText}
            </span>
          </div>

          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700">
              КОДОВО ИМЕ: {activeZone.codeName}
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 leading-snug">
              {activeZone.title}
            </h3>
            <div className="text-xs text-slate-500 font-medium mt-1">
              📍 Регион: {activeZone.region}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs flex items-center justify-between">
            <span>Измерен параметър / Телеметрия:</span>
            <strong className="text-white">{activeZone.frequencyOrMetric}</strong>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>{activeZone.summary}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-rose-900 uppercase tracking-wider text-[11px]">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Засекретен протокол / Аномалия:</span>
            </div>
            <p className="leading-relaxed">{activeZone.secretProtocol}</p>
          </div>

          {activeZone.linkedMysteryId && onOpenMysteryDossier && (
            <button
              onClick={() => onOpenMysteryDossier(activeZone.linkedMysteryId!)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Отвори пълното разследване в „Конспирации & Досиета“</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Grid of All 12 Zones for Quick Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Layers className="w-4 h-4 text-amber-600" />
          <span>Пълен регистър на 12-те мистични и секретни координати в България:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredZones.map((zone) => {
            const isSelected = zone.id === activeZone.id;
            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-400/50 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                    {zone.codeName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{zone.coordsText}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                  {zone.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {zone.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
