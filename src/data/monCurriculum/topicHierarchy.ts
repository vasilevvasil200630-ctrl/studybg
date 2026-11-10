// Автоматично генерирана йерархична карта на темите от учебните програми на МОН.
// Генерира се чрез: node scripts/generate-topic-hierarchy.mjs (без промяна на catalog.generated.ts).

export interface MonTopicHierarchyEntry {
  domainTitle: string;
  subSection: string | null;
  stageId: 'stage-prep' | 'stage-1' | 'stage-2';
  sectionId: 'section-prep' | 'section-a' | 'section-b' | 'section-c';
  grades: readonly number[];
  examTags: readonly ('НВО 7' | 'НВО 10' | 'ДЗИ' | 'ДИППК')[];
  order: number;
  pdfUrl: string;
}

export const MON_TOPIC_HIERARCHY: Record<string, MonTopicHierarchyEntry> = {
  "8-bge:1": {
    "domainTitle": "8. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_bge.pdf"
  },
  "8-bge:2": {
    "domainTitle": "8. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_bge.pdf"
  },
  "8-bge:3": {
    "domainTitle": "8. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_bge.pdf"
  },
  "8-bge:4": {
    "domainTitle": "8. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_bge.pdf"
  },
  "8-bge:5": {
    "domainTitle": "8. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_bge.pdf"
  },
  "8-bge:6": {
    "domainTitle": "8. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_bge.pdf"
  },
  "8-bge:7": {
    "domainTitle": "8. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_bge.pdf"
  },
  "8-bge:8": {
    "domainTitle": "8. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_bge.pdf"
  },
  "8-bge:9": {
    "domainTitle": "8. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_bge.pdf"
  },
  "8-lit:I": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:I.1": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Античност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:I.2": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Античност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:I.3": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Античност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:I.4": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Античност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:II": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:II.1": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Средновековие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:II.2": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Средновековие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:II.3": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Средновековие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:III": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:III.1": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Ренесанс",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:III.2": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Ренесанс",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:III.3": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Ренесанс",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-lit:III.4": {
    "domainTitle": "8. клас — Литература (ООП)",
    "subSection": "Ренесанс",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_lit.pdf"
  },
  "8-math:1": {
    "domainTitle": "8. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_math.pdf"
  },
  "8-math:2": {
    "domainTitle": "8. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_math.pdf"
  },
  "8-math:3": {
    "domainTitle": "8. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_math.pdf"
  },
  "8-math:4": {
    "domainTitle": "8. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_math.pdf"
  },
  "8-math:5": {
    "domainTitle": "8. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_math.pdf"
  },
  "8-math:6": {
    "domainTitle": "8. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_math.pdf"
  },
  "8-math:7": {
    "domainTitle": "8. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_math.pdf"
  },
  "8-math:8": {
    "domainTitle": "8. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_math.pdf"
  },
  "8-informatika:1": {
    "domainTitle": "8. клас — Информатика: Основи на информатиката",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:1.1": {
    "domainTitle": "8. клас — Информатика: Основи на информатиката",
    "subSection": "Основи на информатиката",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:1.2": {
    "domainTitle": "8. клас — Информатика: Основи на информатиката",
    "subSection": "Основи на информатиката",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:1.3": {
    "domainTitle": "8. клас — Информатика: Основи на информатиката",
    "subSection": "Основи на информатиката",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:2": {
    "domainTitle": "8. клас — Информатика: Среда за визуално програмиране",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:2.1": {
    "domainTitle": "8. клас — Информатика: Среда за визуално програмиране",
    "subSection": "Среда за визуално програмиране",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:2.2": {
    "domainTitle": "8. клас — Информатика: Среда за визуално програмиране",
    "subSection": "Среда за визуално програмиране",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:2.3": {
    "domainTitle": "8. клас — Информатика: Среда за визуално програмиране",
    "subSection": "Среда за визуално програмиране",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.1": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.1.1": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране · Основни типове данни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.1.2": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране · Основни типове данни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.1.3": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране · Основни типове данни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.1.4": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране · Основни типове данни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.2": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.3": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.3.1": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране · Програмни конструкции за реализация на разклонен алгоритъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.3.2": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране · Програмни конструкции за реализация на разклонен алгоритъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.3.3": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране · Програмни конструкции за реализация на разклонен алгоритъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.4": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.4.1": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране · Програмни конструкции за реализация на циклични алгоритми",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.4.2": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране · Програмни конструкции за реализация на циклични алгоритми",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:3.5": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": "Програмиране",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-informatika:4": {
    "domainTitle": "8. клас — Информатика: Програмиране",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 81.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_informatika.pdf"
  },
  "8-it:1": {
    "domainTitle": "8. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-8kl-it_190324.pdf"
  },
  "8-it:2": {
    "domainTitle": "8. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-8kl-it_190324.pdf"
  },
  "8-it:3": {
    "domainTitle": "8. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-8kl-it_190324.pdf"
  },
  "8-it:4": {
    "domainTitle": "8. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-8kl-it_190324.pdf"
  },
  "8-it:5": {
    "domainTitle": "8. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-8kl-it_190324.pdf"
  },
  "8-it:6": {
    "domainTitle": "8. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-8kl-it_190324.pdf"
  },
  "8-fa:1": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:1.1": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": "Механика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:1.2": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": "Механика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:1.3": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": "Механика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:1.4": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": "Механика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:1.5": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": "Механика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:2": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:2.1": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": "Топлинни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:2.2": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": "Топлинни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:2.3": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": "Топлинни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:2.4": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": "Топлинни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-fa:2.5": {
    "domainTitle": "8. клас — Физика и астрономия (ООП)",
    "subSection": "Топлинни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_fa.pdf"
  },
  "8-bio:1": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:1.1": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Структурна организация на човешкия организъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:2": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:2.1": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Обмяна на веществата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:2.2": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Обмяна на веществата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:2.3": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Обмяна на веществата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:2.4": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Обмяна на веществата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:3": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:3.1": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Движение и опора на тялото",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:4": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:4.1": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Размножаване, растеж и развитие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:4.2": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Размножаване, растеж и развитие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:5": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:5.1": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Регулация и хомеостаза",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:5.2": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Регулация и хомеостаза",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:5.3": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Регулация и хомеостаза",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-bio:5.4": {
    "domainTitle": "8. клас — Биология и здравно образование (ООП)",
    "subSection": "Регулация и хомеостаза",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_bio.pdf"
  },
  "8-himia:1": {
    "domainTitle": "8. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_himia.pdf"
  },
  "8-himia:2": {
    "domainTitle": "8. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_himia.pdf"
  },
  "8-himia:3": {
    "domainTitle": "8. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_himia.pdf"
  },
  "8-himia:4": {
    "domainTitle": "8. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_himia.pdf"
  },
  "8-tp:1": {
    "domainTitle": "8. клас — Технологии и предприемачество: Професия и кариера",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:1.1": {
    "domainTitle": "8. клас — Технологии и предприемачество: Професия и кариера",
    "subSection": "Професия и кариера",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:1.2": {
    "domainTitle": "8. клас — Технологии и предприемачество: Професия и кариера",
    "subSection": "Професия и кариера",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:1.3": {
    "domainTitle": "8. клас — Технологии и предприемачество: Професия и кариера",
    "subSection": "Професия и кариера",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:2": {
    "domainTitle": "8. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:2.1": {
    "domainTitle": "8. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:2.2": {
    "domainTitle": "8. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:2.3": {
    "domainTitle": "8. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:2.4": {
    "domainTitle": "8. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:2.5": {
    "domainTitle": "8. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:2.6": {
    "domainTitle": "8. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:2.7": {
    "domainTitle": "8. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:3": {
    "domainTitle": "8. клас — Технологии и предприемачество: Предприемачески процес",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:3.1": {
    "domainTitle": "8. клас — Технологии и предприемачество: Предприемачески процес",
    "subSection": "Предприемачески процес",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:3.2": {
    "domainTitle": "8. клас — Технологии и предприемачество: Предприемачески процес",
    "subSection": "Предприемачески процес",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:3.3": {
    "domainTitle": "8. клас — Технологии и предприемачество: Предприемачески процес",
    "subSection": "Предприемачески процес",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:4": {
    "domainTitle": "8. клас — Технологии и предприемачество: Технологии",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:4.1": {
    "domainTitle": "8. клас — Технологии и предприемачество: Технологии",
    "subSection": "Технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:4.2": {
    "domainTitle": "8. клас — Технологии и предприемачество: Технологии",
    "subSection": "Технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:4.3": {
    "domainTitle": "8. клас — Технологии и предприемачество: Технологии",
    "subSection": "Технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:5": {
    "domainTitle": "8. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:5.1": {
    "domainTitle": "8. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:5.2": {
    "domainTitle": "8. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:5.3": {
    "domainTitle": "8. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:5.4": {
    "domainTitle": "8. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-tp:5.5": {
    "domainTitle": "8. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_tp.pdf"
  },
  "8-history:1": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.1": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.1.1": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.1.2": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.1.3": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.1.4": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.1.5": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.2": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.2.1": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.2.2": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.2.3": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.2.4": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.3": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:2.3.1": {
    "domainTitle": "8. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Култура",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.1": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.1.2": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.1.3": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.1.1": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.2": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.2.1": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.2.2": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.2.3": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.2.4": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.3": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:3.3.1": {
    "domainTitle": "8. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Култура",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.1": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.1.1": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.1.2": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.1.3": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.1.4": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.1.5": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.1.6": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.1.7": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.2": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.2.1": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.2.3": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.2.5": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.2.6": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.3": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.3.1": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Култура",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-history:4.3.2": {
    "domainTitle": "8. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Култура",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_history.pdf"
  },
  "8-geo:1": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:2": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:3": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:4": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": "География на природата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:5": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": "География на природата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:6": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": "География на природата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:7": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": "География на природата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:8": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": "География на природата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:9": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": "География на природата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:10": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": "География на природата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:11": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": "География на природата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-geo:12": {
    "domainTitle": "8. клас — География и икономика (ООП)",
    "subSection": "География на природата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_viii_geo.pdf"
  },
  "8-phil:1": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:1.1": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": "Що е философия?",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:1.2": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": "Що е философия?",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:2": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:2.1": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": "Личност и себепознание",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:2.2": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": "Личност и себепознание",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:2.3": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": "Личност и себепознание",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:2.4": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": "Личност и себепознание",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:3": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:3.1": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": "Междуличностни отношения",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:3.2": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": "Междуличностни отношения",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:4": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:4.1": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": "Личност и социална среда",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-phil:4.2": {
    "domainTitle": "8. клас — Философия (ООП)",
    "subSection": "Личност и социална среда",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_phil.pdf"
  },
  "8-arts:1": {
    "domainTitle": "8. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_arts.pdf"
  },
  "8-arts:2": {
    "domainTitle": "8. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_arts.pdf"
  },
  "8-arts:3": {
    "domainTitle": "8. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_arts.pdf"
  },
  "8-arts:4": {
    "domainTitle": "8. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_arts.pdf"
  },
  "8-arts:5": {
    "domainTitle": "8. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_arts.pdf"
  },
  "8-arts:6": {
    "domainTitle": "8. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_arts.pdf"
  },
  "8-arts:7": {
    "domainTitle": "8. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_arts.pdf"
  },
  "8-muzika:1": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:1.1": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": "Музикална практика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:1.2": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": "Музикална практика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:2": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:2.1": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": "Изразни средства в музиката",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:3": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:3.1": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": "Музиката в древните култури",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:3.2": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": "Музиката в древните култури",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:3.3": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": "Музиката в древните култури",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:4": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:5": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:6": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:6.1": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": "Музикалният Барок",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:7": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:7.1": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": "Епоха, стил, направление в изкуството",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:7.2": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": "Епоха, стил, направление в изкуството",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:8": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "8-muzika:8.1": {
    "domainTitle": "8. клас — Музика (ООП)",
    "subSection": "Музикална Европа през 19 век – Романтизъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 80,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_viii_muzika.pdf"
  },
  "9-bge:1": {
    "domainTitle": "9. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_bge.pdf"
  },
  "9-bge:2": {
    "domainTitle": "9. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_bge.pdf"
  },
  "9-bge:3": {
    "domainTitle": "9. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_bge.pdf"
  },
  "9-bge:4": {
    "domainTitle": "9. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_bge.pdf"
  },
  "9-bge:5": {
    "domainTitle": "9. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_bge.pdf"
  },
  "9-bge:6": {
    "domainTitle": "9. клас — Български език (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_bge.pdf"
  },
  "9-lit:I": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:I.1": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": "Просвещение",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:II": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:II.1": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": "Романтизъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:II.2": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": "Романтизъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:III": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:III.1": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": "Реализъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:III.2": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": "Реализъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:IV": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:IV.1": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": "Модернизъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:IV.2": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": "Модернизъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:V": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:V.1": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": "Българско възраждане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:V.2": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": "Българско възраждане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-lit:V.3": {
    "domainTitle": "9. клас — Литература (ООП)",
    "subSection": "Българско възраждане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_lit.pdf"
  },
  "9-math:1": {
    "domainTitle": "9. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_math.pdf"
  },
  "9-math:2": {
    "domainTitle": "9. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_math.pdf"
  },
  "9-math:3": {
    "domainTitle": "9. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_math.pdf"
  },
  "9-math:4": {
    "domainTitle": "9. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_math.pdf"
  },
  "9-math:5": {
    "domainTitle": "9. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_math.pdf"
  },
  "9-math:6": {
    "domainTitle": "9. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_math.pdf"
  },
  "9-math:7": {
    "domainTitle": "9. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_math.pdf"
  },
  "9-math:8": {
    "domainTitle": "9. клас — Математика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_math.pdf"
  },
  "9-it:1": {
    "domainTitle": "9. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-9kl-it_190324.pdf"
  },
  "9-it:2": {
    "domainTitle": "9. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-9kl-it_190324.pdf"
  },
  "9-it:3": {
    "domainTitle": "9. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-9kl-it_190324.pdf"
  },
  "9-it:4": {
    "domainTitle": "9. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-9kl-it_190324.pdf"
  },
  "9-it:5": {
    "domainTitle": "9. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-9kl-it_190324.pdf"
  },
  "9-it:6": {
    "domainTitle": "9. клас — Информационни технологии (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 92,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-9kl-it_190324.pdf"
  },
  "9-history-72:1": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.4": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.5": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.6": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.7": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.8": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.9": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.10": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.11": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.12": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.13": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.14": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.1.15": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.2.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.2.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.2.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.2.4": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.3.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Култура, наука и технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:2.3.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Култура, наука и технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.1.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.1.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.1.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.1.4": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.1.5": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.1.6": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.1.7": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.2.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.2.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.2.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.2.4": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.3.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Култура, наука и технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-72:3.3.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Култура, наука и технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril4-72.pdf"
  },
  "9-history-144:1": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.1": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.1.1": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.1.2": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.1.3": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.1.4": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.1.5": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.2": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.2.1": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.2.2": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.2.3": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.2.4": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.3": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:2.3.1": {
    "domainTitle": "9. клас — История и цивилизации: Началото на Новото време (XVI – XVII в.)",
    "subSection": "Началото на Новото време (XVI – XVII в.) · Култура",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.1": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.1.2": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.1.3": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.1.1": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.2": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.2.1": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.2.2": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.2.3": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.2.4": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.3": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:3.3.1": {
    "domainTitle": "9. клас — История и цивилизации: Векът на Просвещението (XVIII в.)",
    "subSection": "Векът на Просвещението (XVIII в.) · Култура",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.1": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.1.1": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.1.2": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.1.3": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.1.4": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.1.5": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.1.6": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.1.7": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.2": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.2.1": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.2.3": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.2.5": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.2.6": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.3": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.3.1": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Култура",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:4.3.2": {
    "domainTitle": "9. клас — История и цивилизации: Векът на национализма (XIX век)",
    "subSection": "Векът на национализма (XIX век) · Култура",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:5": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.4": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.5": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.6": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.7": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.8": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.9": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.10": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.11": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.12": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.13": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.14": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.1.15": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.2.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.2.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.2.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.2.4": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.3.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Култура, наука и технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:6.3.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът от Първата световна война до 1945 г",
    "subSection": "Светът от Първата световна война до 1945 г · Култура, наука и технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.1.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.1.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.1.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.1.4": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.1.5": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.1.6": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.1.7": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.2.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.2.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.2.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.2.4": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.3": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.3.1": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Култура, наука и технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-history-144:7.3.2": {
    "domainTitle": "9. клас — История и цивилизации: Светът след 1945 г",
    "subSection": "Светът след 1945 г · Култура, наука и технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_history_pril5-144.pdf"
  },
  "9-geo-36:0a": {
    "domainTitle": "9. клас — География и икономика: Политическа организация на обществото",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:0b": {
    "domainTitle": "9. клас — География и икономика: Политическа карта на света",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:1": {
    "domainTitle": "9. клас — География и икономика: Брой, разпределение и движение на населението в света",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:2": {
    "domainTitle": "9. клас — География и икономика: Структура на населението в света",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:3": {
    "domainTitle": "9. клас — География и икономика: Селища и урбанизация",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:4": {
    "domainTitle": "9. клас — География и икономика: Световна икономика",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:5": {
    "domainTitle": "9. клас — География и икономика: Първичен сектор",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:6": {
    "domainTitle": "9. клас — География и икономика: Земеделие – обща характеристика",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:7": {
    "domainTitle": "9. клас — География и икономика: Растениевъдство и животновъдство",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:8": {
    "domainTitle": "9. клас — География и икономика: Вторичен сектор",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:9": {
    "domainTitle": "9. клас — География и икономика: Енергетика",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:10": {
    "domainTitle": "9. клас — География и икономика: Металургия, машиностроене и химическа промишленост",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:11": {
    "domainTitle": "9. клас — География и икономика: Лека и хранително-вкусова промишленост",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:12": {
    "domainTitle": "9. клас — География и икономика: Третичен сектор",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:13": {
    "domainTitle": "9. клас — География и икономика: Транспорт",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:14": {
    "domainTitle": "9. клас — География и икономика: Външноикономически връзки. Търговия и туризъм",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:15": {
    "domainTitle": "9. клас — География и икономика: Световни и регионални организации",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-36:16": {
    "domainTitle": "9. клас — География и икономика: География на континентите и страните",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_geo_pril6-36.pdf"
  },
  "9-geo-72:0a": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:1": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:2": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:3": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:4": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:5": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:6": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:7": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:8": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:9": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:10": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:11": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:12": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:13": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:14": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:15": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:16": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:17": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:18": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:19": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:19a": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:20": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:21": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:22": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:22a": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:23": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:24": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:25": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-geo-72:26": {
    "domainTitle": "9. клас — География и икономика: Социално-икономическа география",
    "subSection": "Социално-икономическа география",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 91.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_geo_pril7-72.pdf"
  },
  "9-phil:1": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-phil:1.1": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": "Философия, ценности, норми",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-phil:1.2": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": "Философия, ценности, норми",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-phil:2": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-phil:2.1": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": "Свобода, норми и човешки цели",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-phil:2.2": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": "Свобода, норми и човешки цели",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-phil:2.3": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": "Свобода, норми и човешки цели",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-phil:2.4": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": "Свобода, норми и човешки цели",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-phil:3": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-phil:3.1": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": "Красотата и изкуството като философски проблеми",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-phil:3.2": {
    "domainTitle": "9. клас — Философия (ООП)",
    "subSection": "Красотата и изкуството като философски проблеми",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_phil.pdf"
  },
  "9-fa-36:1": {
    "domainTitle": "9. клас — Физика и астрономия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril9-36.pdf"
  },
  "9-fa-36:1.1": {
    "domainTitle": "9. клас — Физика и астрономия (ООП)",
    "subSection": "Електричен ток",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril9-36.pdf"
  },
  "9-fa-36:1.2": {
    "domainTitle": "9. клас — Физика и астрономия (ООП)",
    "subSection": "Електричен ток",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril9-36.pdf"
  },
  "9-fa-36:1.3": {
    "domainTitle": "9. клас — Физика и астрономия (ООП)",
    "subSection": "Електричен ток",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril9-36.pdf"
  },
  "9-fa-36:2": {
    "domainTitle": "9. клас — Физика и астрономия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril9-36.pdf"
  },
  "9-fa-36:2.1": {
    "domainTitle": "9. клас — Физика и астрономия (ООП)",
    "subSection": "Механично движение",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril9-36.pdf"
  },
  "9-fa-36:2.2": {
    "domainTitle": "9. клас — Физика и астрономия (ООП)",
    "subSection": "Механично движение",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril9-36.pdf"
  },
  "9-fa-36:2.3": {
    "domainTitle": "9. клас — Физика и астрономия (ООП)",
    "subSection": "Механично движение",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril9-36.pdf"
  },
  "9-fa-90:1": {
    "domainTitle": "9. клас — Физика и астрономия: Механика",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:1.1": {
    "domainTitle": "9. клас — Физика и астрономия: Механика",
    "subSection": "Механика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:1.2": {
    "domainTitle": "9. клас — Физика и астрономия: Механика",
    "subSection": "Механика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:1.3": {
    "domainTitle": "9. клас — Физика и астрономия: Механика",
    "subSection": "Механика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:1.4": {
    "domainTitle": "9. клас — Физика и астрономия: Механика",
    "subSection": "Механика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:1.5": {
    "domainTitle": "9. клас — Физика и астрономия: Механика",
    "subSection": "Механика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:2": {
    "domainTitle": "9. клас — Физика и астрономия: Топлинни явления",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:2.1": {
    "domainTitle": "9. клас — Физика и астрономия: Топлинни явления",
    "subSection": "Топлинни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:2.2": {
    "domainTitle": "9. клас — Физика и астрономия: Топлинни явления",
    "subSection": "Топлинни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:2.3": {
    "domainTitle": "9. клас — Физика и астрономия: Топлинни явления",
    "subSection": "Топлинни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:2.4": {
    "domainTitle": "9. клас — Физика и астрономия: Топлинни явления",
    "subSection": "Топлинни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:2.5": {
    "domainTitle": "9. клас — Физика и астрономия: Топлинни явления",
    "subSection": "Топлинни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:3": {
    "domainTitle": "9. клас — Физика и астрономия: Електричен ток",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:3.1": {
    "domainTitle": "9. клас — Физика и астрономия: Електричен ток",
    "subSection": "Електричен ток",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:3.2": {
    "domainTitle": "9. клас — Физика и астрономия: Електричен ток",
    "subSection": "Електричен ток",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:3.3": {
    "domainTitle": "9. клас — Физика и астрономия: Електричен ток",
    "subSection": "Електричен ток",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:4": {
    "domainTitle": "9. клас — Физика и астрономия: Механично движение",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:4.1": {
    "domainTitle": "9. клас — Физика и астрономия: Механично движение",
    "subSection": "Механично движение",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:4.2": {
    "domainTitle": "9. клас — Физика и астрономия: Механично движение",
    "subSection": "Механично движение",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-fa-90:4.3": {
    "domainTitle": "9. клас — Физика и астрономия: Механично движение",
    "subSection": "Механично движение",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_fa_pril10-90.pdf"
  },
  "9-bio-36:1": {
    "domainTitle": "9. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril11-36.pdf"
  },
  "9-bio-36:2": {
    "domainTitle": "9. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril11-36.pdf"
  },
  "9-bio-36:3": {
    "domainTitle": "9. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril11-36.pdf"
  },
  "9-bio-36:4": {
    "domainTitle": "9. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril11-36.pdf"
  },
  "9-bio-36:5": {
    "domainTitle": "9. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril11-36.pdf"
  },
  "9-bio-90:1": {
    "domainTitle": "9. клас — Биология и здравно образование: Обмяна на веществата",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:1.1": {
    "domainTitle": "9. клас — Биология и здравно образование: Обмяна на веществата",
    "subSection": "Структурна организация на човешкия организъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:2": {
    "domainTitle": "9. клас — Биология и здравно образование: Обмяна на веществата",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:2.1": {
    "domainTitle": "9. клас — Биология и здравно образование: Обмяна на веществата",
    "subSection": "Обмяна на веществата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:2.2": {
    "domainTitle": "9. клас — Биология и здравно образование: Обмяна на веществата",
    "subSection": "Обмяна на веществата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:2.3": {
    "domainTitle": "9. клас — Биология и здравно образование: Обмяна на веществата",
    "subSection": "Обмяна на веществата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:2.4": {
    "domainTitle": "9. клас — Биология и здравно образование: Обмяна на веществата",
    "subSection": "Обмяна на веществата",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:3": {
    "domainTitle": "9. клас — Биология и здравно образование: Размножаване, растеж и развитие",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:3.1": {
    "domainTitle": "9. клас — Биология и здравно образование: Размножаване, растеж и развитие",
    "subSection": "Движение и опора на тялото",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:4": {
    "domainTitle": "9. клас — Биология и здравно образование: Размножаване, растеж и развитие",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:4.1": {
    "domainTitle": "9. клас — Биология и здравно образование: Размножаване, растеж и развитие",
    "subSection": "Размножаване, растеж и развитие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:4.2": {
    "domainTitle": "9. клас — Биология и здравно образование: Размножаване, растеж и развитие",
    "subSection": "Размножаване, растеж и развитие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:5": {
    "domainTitle": "9. клас — Биология и здравно образование: Регулация и хомеостаза",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:5.1": {
    "domainTitle": "9. клас — Биология и здравно образование: Регулация и хомеостаза",
    "subSection": "Регулация и хомеостаза",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:5.2": {
    "domainTitle": "9. клас — Биология и здравно образование: Регулация и хомеостаза",
    "subSection": "Регулация и хомеостаза",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:5.3": {
    "domainTitle": "9. клас — Биология и здравно образование: Регулация и хомеостаза",
    "subSection": "Регулация и хомеостаза",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:5.4": {
    "domainTitle": "9. клас — Биология и здравно образование: Регулация и хомеостаза",
    "subSection": "Регулация и хомеостаза",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:6": {
    "domainTitle": "9. клас — Биология и здравно образование: Регулация и хомеостаза",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:7": {
    "domainTitle": "9. клас — Биология и здравно образование: Регулация и хомеостаза",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:8": {
    "domainTitle": "9. клас — Биология и здравно образование: Регулация и хомеостаза",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:9": {
    "domainTitle": "9. клас — Биология и здравно образование: Регулация и хомеостаза",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-bio-90:10": {
    "domainTitle": "9. клас — Биология и здравно образование: Регулация и хомеостаза",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_bio_pril12-90.pdf"
  },
  "9-himia-54:1": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril13-54.pdf"
  },
  "9-himia-54:2": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril13-54.pdf"
  },
  "9-himia-54:3": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril13-54.pdf"
  },
  "9-himia-54:4": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril13-54.pdf"
  },
  "9-himia-54:5": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril13-54.pdf"
  },
  "9-himia-90:1": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril14-90.pdf"
  },
  "9-himia-90:2": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril14-90.pdf"
  },
  "9-himia-90:3": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril14-90.pdf"
  },
  "9-himia-90:4": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril14-90.pdf"
  },
  "9-himia-90:5": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril14-90.pdf"
  },
  "9-himia-90:6": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril14-90.pdf"
  },
  "9-himia-90:7": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril14-90.pdf"
  },
  "9-himia-90:8": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril14-90.pdf"
  },
  "9-himia-90:9": {
    "domainTitle": "9. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_himia_pril14-90.pdf"
  },
  "9-muzika:1": {
    "domainTitle": "9. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_muzik.pdf"
  },
  "9-muzika:1.1": {
    "domainTitle": "9. клас — Музика (ООП)",
    "subSection": "Музикална практика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_muzik.pdf"
  },
  "9-muzika:1.2": {
    "domainTitle": "9. клас — Музика (ООП)",
    "subSection": "Музикална практика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_muzik.pdf"
  },
  "9-muzika:2": {
    "domainTitle": "9. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_muzik.pdf"
  },
  "9-muzika:2.1": {
    "domainTitle": "9. клас — Музика (ООП)",
    "subSection": "Изразни средства в музиката",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_muzik.pdf"
  },
  "9-muzika:3": {
    "domainTitle": "9. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_muzik.pdf"
  },
  "9-muzika:3.1": {
    "domainTitle": "9. клас — Музика (ООП)",
    "subSection": "Музикална Европа през 20. век: импресионизъм, експресионизъм, неокласицизъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_muzik.pdf"
  },
  "9-muzika:4": {
    "domainTitle": "9. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_muzik.pdf"
  },
  "9-arts:1": {
    "domainTitle": "9. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_arts.pdf"
  },
  "9-arts:2": {
    "domainTitle": "9. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_arts.pdf"
  },
  "9-arts:3": {
    "domainTitle": "9. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_arts.pdf"
  },
  "9-arts:4": {
    "domainTitle": "9. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_arts.pdf"
  },
  "9-arts:5": {
    "domainTitle": "9. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_arts.pdf"
  },
  "9-arts:6": {
    "domainTitle": "9. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_arts.pdf"
  },
  "9-arts:7": {
    "domainTitle": "9. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_arts.pdf"
  },
  "9-tp:1": {
    "domainTitle": "9. клас — Технологии и предприемачество: Професия и кариера",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:1.1": {
    "domainTitle": "9. клас — Технологии и предприемачество: Професия и кариера",
    "subSection": "Професия и кариера",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:1.2": {
    "domainTitle": "9. клас — Технологии и предприемачество: Професия и кариера",
    "subSection": "Професия и кариера",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:1.3": {
    "domainTitle": "9. клас — Технологии и предприемачество: Професия и кариера",
    "subSection": "Професия и кариера",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.1,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:2": {
    "domainTitle": "9. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:2.1": {
    "domainTitle": "9. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:2.2": {
    "domainTitle": "9. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:2.3": {
    "domainTitle": "9. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:2.4": {
    "domainTitle": "9. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:2.5": {
    "domainTitle": "9. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:2.6": {
    "domainTitle": "9. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:2.7": {
    "domainTitle": "9. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:2.8": {
    "domainTitle": "9. клас — Технологии и предприемачество: Пазарна икономика",
    "subSection": "Пазарна икономика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:3": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемачески процес",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:3.1": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемачески процес",
    "subSection": "Предприемачески процес",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:3.2": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемачески процес",
    "subSection": "Предприемачески процес",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:3.3": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемачески процес",
    "subSection": "Предприемачески процес",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:4": {
    "domainTitle": "9. клас — Технологии и предприемачество: Технологии",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:4.1": {
    "domainTitle": "9. клас — Технологии и предприемачество: Технологии",
    "subSection": "Технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:4.2": {
    "domainTitle": "9. клас — Технологии и предприемачество: Технологии",
    "subSection": "Технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:4.3": {
    "domainTitle": "9. клас — Технологии и предприемачество: Технологии",
    "subSection": "Технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:4.4": {
    "domainTitle": "9. клас — Технологии и предприемачество: Технологии",
    "subSection": "Технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.1": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.2": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.3": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.4": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.5": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.6": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.7": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.8": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.9": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.10": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.11": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "9-tp:5.12": {
    "domainTitle": "9. клас — Технологии и предприемачество: Предприемаческа инициатива",
    "subSection": "Предприемаческа инициатива",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9
    ],
    "examTags": [],
    "order": 90.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_tp.pdf"
  },
  "10-bge:1": {
    "domainTitle": "10. клас — Български език (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 101,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_bge.pdf"
  },
  "10-bge:2": {
    "domainTitle": "10. клас — Български език (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 101,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_bge.pdf"
  },
  "10-bge:3": {
    "domainTitle": "10. клас — Български език (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 101,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_bge.pdf"
  },
  "10-bge:4": {
    "domainTitle": "10. клас — Български език (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 101,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_bge.pdf"
  },
  "10-bge:5": {
    "domainTitle": "10. клас — Български език (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 101,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_bge.pdf"
  },
  "10-bge:6": {
    "domainTitle": "10. клас — Български език (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 101,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_bge.pdf"
  },
  "10-lit:I": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:I.1": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода от Освобождението до Първата световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:I.2": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода от Освобождението до Първата световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:I.3": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода от Освобождението до Първата световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:I.4": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода от Освобождението до Първата световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:I.5": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода от Освобождението до Първата световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:I.6": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода от Освобождението до Първата световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:I.7": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода от Освобождението до Първата световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:II": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:II.1": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода между двете световни войни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:II.2": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода между двете световни войни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:II.3": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода между двете световни войни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:II.4": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода между двете световни войни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:II.5": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода между двете световни войни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:III": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:III.1": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода след Втората световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:III.2": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода след Втората световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-lit:III.3": {
    "domainTitle": "10. клас — Литература (ООП и НВО 10. клас)",
    "subSection": "Българската литература от периода след Втората световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_lit.pdf"
  },
  "10-math:1": {
    "domainTitle": "10. клас — Математика (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_math.pdf"
  },
  "10-math:2": {
    "domainTitle": "10. клас — Математика (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_math.pdf"
  },
  "10-math:3": {
    "domainTitle": "10. клас — Математика (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_math.pdf"
  },
  "10-math:4": {
    "domainTitle": "10. клас — Математика (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_math.pdf"
  },
  "10-math:5": {
    "domainTitle": "10. клас — Математика (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_math.pdf"
  },
  "10-geo:1": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:2": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:3": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": "Природна среда на България",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:5": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": "Природна среда на България",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:6": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:7": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:8": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:9": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:10": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:11": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:12": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:13": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:14": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:15": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:16": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:17": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:18": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:19": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:20": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:21": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:22": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-geo:23": {
    "domainTitle": "10. клас — География и икономика: Природна среда на България",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_geo.pdf"
  },
  "10-history:1": {
    "domainTitle": "10. клас — История и цивилизации: Днешните български земи през Античността",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:2": {
    "domainTitle": "10. клас — История и цивилизации: Днешните български земи през Античността",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:2.1": {
    "domainTitle": "10. клас — История и цивилизации: Днешните български земи през Античността",
    "subSection": "Днешните български земи през Античността",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:2.1.1": {
    "domainTitle": "10. клас — История и цивилизации: Днешните български земи през Античността",
    "subSection": "Днешните български земи през Античността · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:2.1.2": {
    "domainTitle": "10. клас — История и цивилизации: Днешните български земи през Античността",
    "subSection": "Днешните български земи през Античността · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:2.2": {
    "domainTitle": "10. клас — История и цивилизации: Днешните български земи през Античността",
    "subSection": "Днешните български земи през Античността",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:2.2.1": {
    "domainTitle": "10. клас — История и цивилизации: Днешните български земи през Античността",
    "subSection": "Днешните български земи през Античността · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:2.3": {
    "domainTitle": "10. клас — История и цивилизации: Днешните български земи през Античността",
    "subSection": "Днешните български земи през Античността",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:2.3.1": {
    "domainTitle": "10. клас — История и цивилизации: Днешните български земи през Античността",
    "subSection": "Днешните български земи през Античността · Културно наследство",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:2.3.2": {
    "domainTitle": "10. клас — История и цивилизации: Днешните български земи през Античността",
    "subSection": "Днешните български земи през Античността · Културно наследство",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.2,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.1": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.1.1": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.1.2": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.1.3": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.1.4": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.1.5": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.1.6": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.1.7": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.2": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.2.1": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.2.2": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.3": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.3.1": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Култура и културно наследство",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.3.2": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Култура и културно наследство",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.3.3": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Култура и културно наследство",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.3.4": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Култура и културно наследство",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.4": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.4.1": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Религия",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:3.4.2": {
    "domainTitle": "10. клас — История и цивилизации: България до началото на XI век",
    "subSection": "България до началото на XI век · Религия",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.3,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.1": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.1.1": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.) · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.1.2": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.) · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.1.3": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.) · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.1.4": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.) · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.1.5": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.) · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.2": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.2.1": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.) · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.2.2": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.) · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.3": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.4": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:4.4.1": {
    "domainTitle": "10. клас — История и цивилизации: Българската държава (ХІІ − ХІV в.)",
    "subSection": "Българската държава (ХІІ − ХІV в.) · Религия",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.4,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.1": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.1.1": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.) · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.1.2": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.) · Държавност",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.2": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.2.1": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.) · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.2.2": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.) · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.3": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.3.1": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.) · Култура и културно наследство",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.3.2": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.) · Култура и културно наследство",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.4": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:5.4.1": {
    "domainTitle": "10. клас — История и цивилизации: Българските земи под османска власт (ХV − ХVІІв.)",
    "subSection": "Българските земи под османска власт (ХV − ХVІІв.) · Религия",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.5,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.1": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.1.1": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Идеи и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.1.2": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Идеи и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.1.3": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Идеи и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.1.4": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Идеи и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.1.5": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Идеи и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.1.6": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Идеи и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.1.7": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Идеи и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.1.8": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Идеи и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.2": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.2.1": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.2.2": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.2.3": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.2.4": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Общество и всекидневен живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.3": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.)",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:6.3.1": {
    "domainTitle": "10. клас — История и цивилизации: Българско възраждане (XVIII – XIX в.)",
    "subSection": "Българско възраждане (XVIII – XIX в.) · Култура и културно наследство",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.6,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.1": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.2": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.3": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.4": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.5": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.6": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.7": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.8": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.9": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.10": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.11": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.11.1": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · България в периода между двете световни войни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.11.2": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · България в периода между двете световни войни",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.1.12": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.2": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.2.1": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.2.2": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Общество и идеи",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.3": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.3.1": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Култура и наука",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:7.3.2": {
    "domainTitle": "10. клас — История и цивилизации: България от Освобождението до края на Втората световна война",
    "subSection": "България от Освобождението до края на Втората световна война · Култура и наука",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.7,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.1": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.1.1": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.1.2": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.1.3": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.1.4": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.1.5": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.2": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.2.1": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г · Общество и икономически процеси",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.2.2": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г · Общество и икономически процеси",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.3": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.3.1": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г · Култура, наука и технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:8.3.2": {
    "domainTitle": "10. клас — История и цивилизации: България след Втората световна война до 1989 г",
    "subSection": "България след Втората световна война до 1989 г · Култура, наука и технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.8,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.1": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.1.1": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.1.2": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.1.3": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.1.4": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г · Държавност и политики",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.2": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.2.1": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г · Икономика и общество",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.2.2": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г · Икономика и общество",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.3": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.3.1": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г · Култура",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-history:9.3.2": {
    "domainTitle": "10. клас — История и цивилизации: България след 1989 г",
    "subSection": "България след 1989 г · Култура",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100.9,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_history.pdf"
  },
  "10-phil:1": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:2": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:2.1": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Език и критическо мислене",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:2.2": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Език и критическо мислене",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:2.3": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Език и критическо мислене",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:2.4": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Език и критическо мислене",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:3": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:3.1": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Философското познание и реалността",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:3.2": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Философското познание и реалността",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:3.3": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Философското познание и реалността",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:3.4": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Философското познание и реалността",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:4": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:4.1": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Политическа философия и философия на правото",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:4.2": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Политическа философия и философия на правото",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-phil:4.3": {
    "domainTitle": "10. клас — Философия (ООП)",
    "subSection": "Политическа философия и философия на правото",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_phil.pdf"
  },
  "10-bio:1": {
    "domainTitle": "10. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_bio.pdf"
  },
  "10-bio:1.1": {
    "domainTitle": "10. клас — Биология и здравно образование (ООП)",
    "subSection": "Многоклетъчен организъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_bio.pdf"
  },
  "10-bio:1.2": {
    "domainTitle": "10. клас — Биология и здравно образование (ООП)",
    "subSection": "Многоклетъчен организъм",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_bio.pdf"
  },
  "10-bio:2": {
    "domainTitle": "10. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_bio.pdf"
  },
  "10-bio:2.1": {
    "domainTitle": "10. клас — Биология и здравно образование (ООП)",
    "subSection": "Биосфера",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_bio.pdf"
  },
  "10-bio:2.2": {
    "domainTitle": "10. клас — Биология и здравно образование (ООП)",
    "subSection": "Биосфера",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_bio.pdf"
  },
  "10-bio:3": {
    "domainTitle": "10. клас — Биология и здравно образование (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_bio.pdf"
  },
  "10-bio:3.1": {
    "domainTitle": "10. клас — Биология и здравно образование (ООП)",
    "subSection": "Биологична еволюция",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_bio.pdf"
  },
  "10-bio:3.2": {
    "domainTitle": "10. клас — Биология и здравно образование (ООП)",
    "subSection": "Биологична еволюция",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_bio.pdf"
  },
  "10-bio:3.3": {
    "domainTitle": "10. клас — Биология и здравно образование (ООП)",
    "subSection": "Биологична еволюция",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_bio.pdf"
  },
  "10-fa:1": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:1.1": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "Електромагнитни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:1.2": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "Електромагнитни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:1.3": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "Електромагнитни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:1.4": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "Електромагнитни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:1.5": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "Електромагнитни явления",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:2": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:2.1": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "Светлина",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:2.2": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "Светлина",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:2.3": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "Светлина",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:3": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:3.1": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "От атома до Космоса",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:3.2": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "От атома до Космоса",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:3.3": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "От атома до Космоса",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:3.4": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "От атома до Космоса",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-fa:3.5": {
    "domainTitle": "10. клас — Физика и астрономия (ООП)",
    "subSection": "От атома до Космоса",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_fa.pdf"
  },
  "10-himia:1": {
    "domainTitle": "10. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_himia.pdf"
  },
  "10-himia:2": {
    "domainTitle": "10. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_himia.pdf"
  },
  "10-himia:3": {
    "domainTitle": "10. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_himia.pdf"
  },
  "10-himia:4": {
    "domainTitle": "10. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_himia.pdf"
  },
  "10-himia:5": {
    "domainTitle": "10. клас — Химия и опазване на околната среда (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_himia.pdf"
  },
  "10-music:1": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:1.1": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": "Музикална практика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:1.2": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": "Музикална практика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:2": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:2.1": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": "Изразни средства в музиката и съвременните технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:2.2": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": "Изразни средства в музиката и съвременните технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:2.3": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": "Изразни средства в музиката и съвременните технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:2.4": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": "Изразни средства в музиката и съвременните технологии",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:3": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:3.1": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": "Музиката на 20. век",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:3.2": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": "Музиката на 20. век",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:3.3": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": "Музиката на 20. век",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-music:3.4": {
    "domainTitle": "10. клас — Музика (ООП)",
    "subSection": "Музиката на 20. век",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_x_music.pdf"
  },
  "10-arts:1": {
    "domainTitle": "10. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_arts.pdf"
  },
  "10-arts:2": {
    "domainTitle": "10. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_arts.pdf"
  },
  "10-arts:3": {
    "domainTitle": "10. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_arts.pdf"
  },
  "10-arts:4": {
    "domainTitle": "10. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_arts.pdf"
  },
  "10-arts:5": {
    "domainTitle": "10. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_arts.pdf"
  },
  "10-arts:6": {
    "domainTitle": "10. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_arts.pdf"
  },
  "10-arts:7": {
    "domainTitle": "10. клас — Изобразително изкуство (ООП)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [],
    "order": 100,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_x_arts.pdf"
  },
  "10-it:1": {
    "domainTitle": "10. клас — Информационни технологии (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-10kl-it_190324.pdf"
  },
  "10-it:2": {
    "domainTitle": "10. клас — Информационни технологии (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-10kl-it_190324.pdf"
  },
  "10-it:3": {
    "domainTitle": "10. клас — Информационни технологии (ООП и НВО 10. клас)",
    "subSection": null,
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 102,
    "pdfUrl": "https://www.mon.bg/nfs/2024/03/up-10kl-it_190324.pdf"
  },
  "11-be:1": {
    "domainTitle": "11. клас — Български език (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_be.pdf"
  },
  "11-be:2": {
    "domainTitle": "11. клас — Български език (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_be.pdf"
  },
  "11-be:3": {
    "domainTitle": "11. клас — Български език (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_be.pdf"
  },
  "11-be:4": {
    "domainTitle": "11. клас — Български език (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_be.pdf"
  },
  "11-be:5": {
    "domainTitle": "11. клас — Български език (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_be.pdf"
  },
  "11-be:6": {
    "domainTitle": "11. клас — Български език (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_be.pdf"
  },
  "11-lit:I": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:I.1": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Родното и чуждото",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:I.2": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Родното и чуждото",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:I.3": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Родното и чуждото",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:II": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:II.1": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Миналото и паметта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:II.2": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Миналото и паметта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:II.3": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Миналото и паметта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:III": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:III.1": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Обществото и властта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:III.2": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Обществото и властта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:III.3": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Обществото и властта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:IV": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:IV.1": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Животът и смъртта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:IV.2": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Животът и смъртта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:IV.3": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Животът и смъртта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:V": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:V.1": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Природата",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:V.2": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Природата",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-lit:V.3": {
    "domainTitle": "11. клас — Литература (ООП и ДЗИ)",
    "subSection": "Природата",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 112,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_lit.pdf"
  },
  "11-math:1": {
    "domainTitle": "11. клас — Математика: Степен и логаритъм",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:1.1": {
    "domainTitle": "11. клас — Математика: Степен и логаритъм",
    "subSection": "Степен и логаритъм",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:1.2": {
    "domainTitle": "11. клас — Математика: Степен и логаритъм",
    "subSection": "Степен и логаритъм",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:1.3": {
    "domainTitle": "11. клас — Математика: Степен и логаритъм",
    "subSection": "Степен и логаритъм",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:1.4": {
    "domainTitle": "11. клас — Математика: Степен и логаритъм",
    "subSection": "Степен и логаритъм",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:1.5": {
    "domainTitle": "11. клас — Математика: Степен и логаритъм",
    "subSection": "Степен и логаритъм",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:1.6": {
    "domainTitle": "11. клас — Математика: Степен и логаритъм",
    "subSection": "Степен и логаритъм",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:1.7": {
    "domainTitle": "11. клас — Математика: Степен и логаритъм",
    "subSection": "Степен и логаритъм",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:1.8": {
    "domainTitle": "11. клас — Математика: Степен и логаритъм",
    "subSection": "Степен и логаритъм",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:1.9": {
    "domainTitle": "11. клас — Математика: Степен и логаритъм",
    "subSection": "Степен и логаритъм",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:2": {
    "domainTitle": "11. клас — Математика: Решаване на равнинни фигури",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:2.1": {
    "domainTitle": "11. клас — Математика: Решаване на равнинни фигури",
    "subSection": "Решаване на равнинни фигури",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:2.2": {
    "domainTitle": "11. клас — Математика: Решаване на равнинни фигури",
    "subSection": "Решаване на равнинни фигури",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:2.3": {
    "domainTitle": "11. клас — Математика: Решаване на равнинни фигури",
    "subSection": "Решаване на равнинни фигури",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:2.4": {
    "domainTitle": "11. клас — Математика: Решаване на равнинни фигури",
    "subSection": "Решаване на равнинни фигури",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:3": {
    "domainTitle": "11. клас — Математика: Тригонометрия",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:3.1": {
    "domainTitle": "11. клас — Математика: Тригонометрия",
    "subSection": "Тригонометрия",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:3.2": {
    "domainTitle": "11. клас — Математика: Тригонометрия",
    "subSection": "Тригонометрия",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:3.3": {
    "domainTitle": "11. клас — Математика: Тригонометрия",
    "subSection": "Тригонометрия",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:3.4": {
    "domainTitle": "11. клас — Математика: Тригонометрия",
    "subSection": "Тригонометрия",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:3.5": {
    "domainTitle": "11. клас — Математика: Тригонометрия",
    "subSection": "Тригонометрия",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:3.6": {
    "domainTitle": "11. клас — Математика: Тригонометрия",
    "subSection": "Тригонометрия",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:3.7": {
    "domainTitle": "11. клас — Математика: Тригонометрия",
    "subSection": "Тригонометрия",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:3.8": {
    "domainTitle": "11. клас — Математика: Тригонометрия",
    "subSection": "Тригонометрия",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:4": {
    "domainTitle": "11. клас — Математика: Вероятности",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:4.1": {
    "domainTitle": "11. клас — Математика: Вероятности",
    "subSection": "Вероятности",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:4.2": {
    "domainTitle": "11. клас — Математика: Вероятности",
    "subSection": "Вероятности",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:4.3": {
    "domainTitle": "11. клас — Математика: Вероятности",
    "subSection": "Вероятности",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:4.4": {
    "domainTitle": "11. клас — Математика: Вероятности",
    "subSection": "Вероятности",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-math:4.5": {
    "domainTitle": "11. клас — Математика: Вероятности",
    "subSection": "Вероятности",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_%D0%9Cath.pdf"
  },
  "11-go:1": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:1.1": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": "Гражданите, политиката и демокрацията",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:1.2": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": "Гражданите, политиката и демокрацията",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:1.3": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": "Гражданите, политиката и демокрацията",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:1.4": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": "Гражданите, политиката и демокрацията",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:2": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:2.1": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": "Граждани, права и отговорности",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:2.2": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": "Граждани, права и отговорности",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:3": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:3.1": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": "Идентичности и различия в обществото",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:3.2": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": "Идентичности и различия в обществото",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "11-go:3.3": {
    "domainTitle": "11. клас — Гражданско образование (ООП)",
    "subSection": "Идентичности и различия в обществото",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11
    ],
    "examTags": [],
    "order": 110,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xi_go.pdf"
  },
  "12-be:1": {
    "domainTitle": "12. клас — Български език (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 121,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_be.pdf"
  },
  "12-be:2": {
    "domainTitle": "12. клас — Български език (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 121,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_be.pdf"
  },
  "12-be:3": {
    "domainTitle": "12. клас — Български език (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 121,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_be.pdf"
  },
  "12-be:4": {
    "domainTitle": "12. клас — Български език (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 121,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_be.pdf"
  },
  "12-lit:I": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:I.1": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Любовта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:I.2": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Любовта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:I.3": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Любовта",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:II": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:II.1": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Вярата и надеждата",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:II.2": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Вярата и надеждата",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:II.3": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Вярата и надеждата",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:III": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:III.1": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Трудът и творчеството",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:III.2": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Трудът и творчеството",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:III.3": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Трудът и творчеството",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:IV": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:IV.1": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Изборът и раздвоението",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:IV.2": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Изборът и раздвоението",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-lit:IV.3": {
    "domainTitle": "12. клас — Литература (ООП и ДЗИ)",
    "subSection": "Изборът и раздвоението",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 122,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_lit.pdf"
  },
  "12-math:1": {
    "domainTitle": "12. клас — Математика: Статистика",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:1.1": {
    "domainTitle": "12. клас — Математика: Статистика",
    "subSection": "Статистика",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:1.2": {
    "domainTitle": "12. клас — Математика: Статистика",
    "subSection": "Статистика",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:1.3": {
    "domainTitle": "12. клас — Математика: Статистика",
    "subSection": "Статистика",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:1.4": {
    "domainTitle": "12. клас — Математика: Статистика",
    "subSection": "Статистика",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:1.5": {
    "domainTitle": "12. клас — Математика: Статистика",
    "subSection": "Статистика",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.1,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:2": {
    "domainTitle": "12. клас — Математика: Уравнения",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:2.1": {
    "domainTitle": "12. клас — Математика: Уравнения",
    "subSection": "Уравнения",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:2.2": {
    "domainTitle": "12. клас — Математика: Уравнения",
    "subSection": "Уравнения",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:2.3": {
    "domainTitle": "12. клас — Математика: Уравнения",
    "subSection": "Уравнения",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:2.4": {
    "domainTitle": "12. клас — Математика: Уравнения",
    "subSection": "Уравнения",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:2.5": {
    "domainTitle": "12. клас — Математика: Уравнения",
    "subSection": "Уравнения",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:2.6": {
    "domainTitle": "12. клас — Математика: Уравнения",
    "subSection": "Уравнения",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:2.7": {
    "domainTitle": "12. клас — Математика: Уравнения",
    "subSection": "Уравнения",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:2.8": {
    "domainTitle": "12. клас — Математика: Уравнения",
    "subSection": "Уравнения",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:2.9": {
    "domainTitle": "12. клас — Математика: Уравнения",
    "subSection": "Уравнения",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.2,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:3": {
    "domainTitle": "12. клас — Математика: Неравенства",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:3.1": {
    "domainTitle": "12. клас — Математика: Неравенства",
    "subSection": "Неравенства",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:3.2": {
    "domainTitle": "12. клас — Математика: Неравенства",
    "subSection": "Неравенства",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:3.3": {
    "domainTitle": "12. клас — Математика: Неравенства",
    "subSection": "Неравенства",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:3.4": {
    "domainTitle": "12. клас — Математика: Неравенства",
    "subSection": "Неравенства",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.3,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:4": {
    "domainTitle": "12. клас — Математика: Екстремални задачи",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:4.1": {
    "domainTitle": "12. клас — Математика: Екстремални задачи",
    "subSection": "Екстремални задачи",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:4.2": {
    "domainTitle": "12. клас — Математика: Екстремални задачи",
    "subSection": "Екстремални задачи",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:4.3": {
    "domainTitle": "12. клас — Математика: Екстремални задачи",
    "subSection": "Екстремални задачи",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:4.4": {
    "domainTitle": "12. клас — Математика: Екстремални задачи",
    "subSection": "Екстремални задачи",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:4.5": {
    "domainTitle": "12. клас — Математика: Екстремални задачи",
    "subSection": "Екстремални задачи",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-math:4.6": {
    "domainTitle": "12. клас — Математика: Екстремални задачи",
    "subSection": "Екстремални задачи",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120.4,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_math.pdf"
  },
  "12-go:1": {
    "domainTitle": "12. клас — Гражданско образование (ООП)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_go.pdf"
  },
  "12-go:1.1": {
    "domainTitle": "12. клас — Гражданско образование (ООП)",
    "subSection": "Гражданите, властта и държавата",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_go.pdf"
  },
  "12-go:1.2": {
    "domainTitle": "12. клас — Гражданско образование (ООП)",
    "subSection": "Гражданите, властта и държавата",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_go.pdf"
  },
  "12-go:1.3": {
    "domainTitle": "12. клас — Гражданско образование (ООП)",
    "subSection": "Гражданите, властта и държавата",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_go.pdf"
  },
  "12-go:2": {
    "domainTitle": "12. клас — Гражданско образование (ООП)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_go.pdf"
  },
  "12-go:2.1": {
    "domainTitle": "12. клас — Гражданско образование (ООП)",
    "subSection": "Гражданите и икономиката",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_go.pdf"
  },
  "12-go:2.2": {
    "domainTitle": "12. клас — Гражданско образование (ООП)",
    "subSection": "Гражданите и икономиката",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_go.pdf"
  },
  "12-go:3": {
    "domainTitle": "12. клас — Гражданско образование (ООП)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_go.pdf"
  },
  "12-go:3.1": {
    "domainTitle": "12. клас — Гражданско образование (ООП)",
    "subSection": "България и глобалните проблеми",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_go.pdf"
  },
  "12-go:3.2": {
    "domainTitle": "12. клас — Гражданско образование (ООП)",
    "subSection": "България и глобалните проблеми",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      12
    ],
    "examTags": [],
    "order": 120,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_xii_go.pdf"
  },
  "pp-bel:1": {
    "domainTitle": "Социолингвистика и публично общуване (11.–12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-bel.pdf"
  },
  "pp-bel:2": {
    "domainTitle": "Социолингвистика и публично общуване (11.–12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-bel.pdf"
  },
  "pp-bel:3": {
    "domainTitle": "Социолингвистика и публично общуване (11.–12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-bel.pdf"
  },
  "pp-bel:4": {
    "domainTitle": "Социолингвистика и публично общуване (11.–12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-bel.pdf"
  },
  "pp-bel:5": {
    "domainTitle": "Социолингвистика и публично общуване (11.–12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-bel.pdf"
  },
  "pp-bel:6": {
    "domainTitle": "Социолингвистика и публично общуване (11.–12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-bel.pdf"
  },
  "pp-bel:7": {
    "domainTitle": "Социолингвистика и публично общуване (11.–12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-bel.pdf"
  },
  "pp-bel:8": {
    "domainTitle": "Социолингвистика и публично общуване (11.–12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-bel.pdf"
  },
  "pp-bel:9": {
    "domainTitle": "Социолингвистика и публично общуване (11.–12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-bel.pdf"
  },
  "pp-math:m1:1": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Вектори и координати",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:1.1": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Вектори и координати",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:1.2": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Вектори и координати",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:1.3": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Вектори и координати",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:1.4": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Вектори и координати",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:1.5": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Вектори и координати",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:1.6": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Вектори и координати",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:2": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Аналитична геометрия в равнината",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:2.1": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Аналитична геометрия в равнината",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:2.2": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Аналитична геометрия в равнината",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:2.3": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Аналитична геометрия в равнината",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:2.4": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Аналитична геометрия в равнината",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:2.5": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Аналитична геометрия в равнината",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:3": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Стереометрия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:3.1": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Стереометрия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:3.2": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Стереометрия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:3.3": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Стереометрия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:3.4": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Стереометрия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:3.5": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Стереометрия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:3.6": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Стереометрия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:3.7": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Стереометрия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:3.8": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Стереометрия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m1:3.9": {
    "domainTitle": "Модул 1. Геометрия (11. клас ПП и ДЗИ)",
    "subSection": "Стереометрия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:1": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Полиноми на една променлива",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:1.1": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Полиноми на една променлива",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:1.2": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Полиноми на една променлива",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:1.3": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Полиноми на една променлива",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:1.4": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Полиноми на една променлива",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:1.5": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Полиноми на една променлива",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:1.6": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Полиноми на една променлива",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:2": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Числови редици",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:2.1": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Числови редици",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:2.2": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Числови редици",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:2.3": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Числови редици",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:2.4": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Числови редици",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:2.5": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Числови редици",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.1": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.2": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.3": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.4": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.5": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.6": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.7": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.8": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.9": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.10": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.11": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m2:3.12": {
    "domainTitle": "Модул 2. Елементи на математическия анализ (11. клас ПП и ДЗИ)",
    "subSection": "Функции. Непрекъснатост и диференцируемост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1.1": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1.2": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1.3": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1.4": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1.5": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1.6": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1.7": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1.8": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1.9": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:1.10": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Приложения на математическия анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:2": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Геометрични модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:2.1": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Геометрични модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:2.2": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Геометрични модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:2.3": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Геометрични модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:2.4": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Геометрични модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:3": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Емпирични разпределения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:3.1": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Емпирични разпределения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:3.2": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Емпирични разпределения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:3.3": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Емпирични разпределения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:3.4": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Емпирични разпределения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:3.5": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Емпирични разпределения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:3.6": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Емпирични разпределения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:4": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Елементи от комбинаториката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m3:4.1": {
    "domainTitle": "Модул 3. Практическа математика (12. клас ПП и ДЗИ)",
    "subSection": "Елементи от комбинаториката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:1": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Вероятност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:1.1": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Вероятност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:1.2": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Вероятност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:2": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Случайна величина",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:2.1": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Случайна величина",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:2.2": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Случайна величина",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:2.3": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Случайна величина",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:2.4": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Случайна величина",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:3": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Биномно разпределение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:3.1": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Биномно разпределение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:3.2": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Биномно разпределение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:4": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Нормално разпределение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:4.1": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Нормално разпределение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:4.2": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Нормално разпределение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:4.3": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Нормално разпределение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:4.4": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Нормално разпределение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:5": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Статистически изводи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:5.1": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Статистически изводи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:5.2": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Статистически изводи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:6": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Линеен модел на корелационна зависимост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-math:m4:6.1": {
    "domainTitle": "Модул 4. Вероятности и анализ на данни (12. клас ПП и ДЗИ)",
    "subSection": "Линеен модел на корелационна зависимост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-math.pdf"
  },
  "pp-informatika:m1:1.2": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:2": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Класове и обекти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:2.1": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Класове и обекти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:2.2": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Класове и обекти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:2.3": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Класове и обекти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:3": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Членове на клас",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:3.1": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Членове на клас",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:3.2": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Членове на клас",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:3.3": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Членове на клас",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:4": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Създаване на графичен интерфейс",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:4.1": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Създаване на графичен интерфейс",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:4.2": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Създаване на графичен интерфейс",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:5": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Основни оператори",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:5.1": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Основни оператори",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:5.2": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Основни оператори",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:6": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Конструкции за управление на програмата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:6.1": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Конструкции за управление на програмата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:6.2": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Конструкции за управление на програмата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:6.3": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Конструкции за управление на програмата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:6.4": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Конструкции за управление на програмата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:7": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Капсулиране на данни и методи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:7.1": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Капсулиране на данни и методи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:7.2": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Капсулиране на данни и методи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:7.3": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Капсулиране на данни и методи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:8": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Проектиране на графичен интерфейс",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:8.1": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Проектиране на графичен интерфейс",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:9": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Класове с потребителски типове данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:9.1": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Класове с потребителски типове данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:9.2": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Класове с потребителски типове данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:9.3": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Класове с потребителски типове данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:10": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Наследяване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:10.1": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Наследяване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:10.2": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Наследяване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:10.3": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Наследяване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:10.4": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Наследяване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:10.5": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Наследяване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:11": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Обработка на събития",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m1:11.1": {
    "domainTitle": "Модул 1. Обектно ориентирано проектиране и програмиране (11. клас ПП и ДЗИ)",
    "subSection": "Обработка на събития",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Алгоритми и класове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:1.1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Алгоритми и класове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:1.2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Алгоритми и класове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Класификация на структурите от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:2.1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Класификация на структурите от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:2.2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Класификация на структурите от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:3": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Символен низ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:3.1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Символен низ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:3.2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Символен низ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:3.3": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Символен низ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:4": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Едномерен масив",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:4.1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Едномерен масив",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:4.2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Едномерен масив",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:4.3": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Едномерен масив",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:4.4": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Едномерен масив",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:5": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Многомерен масив",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:5.1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Многомерен масив",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:5.2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Многомерен масив",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:6": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Линейни структури от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:6.1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Линейни структури от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:6.2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Линейни структури от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:6.3": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Линейни структури от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:6.4": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Линейни структури от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:7": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Структури от данни – съпоставка и препоръки",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:7.1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Структури от данни – съпоставка и препоръки",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:7.2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Структури от данни – съпоставка и препоръки",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:7.3": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Структури от данни – съпоставка и препоръки",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:8": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Файлове и потоци от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:8.1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Файлове и потоци от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:8.2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Файлове и потоци от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:8.3": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Файлове и потоци от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:8.4": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Файлове и потоци от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:8.5": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Файлове и потоци от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:9": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Обработка на изключения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:9.1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Обработка на изключения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:9.2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Обработка на изключения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:9.3": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Обработка на изключения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:10": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Качествен програмен код",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:10.1": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Качествен програмен код",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:10.2": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Качествен програмен код",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:10.3": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Качествен програмен код",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:10.4": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Качествен програмен код",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m2:10.5": {
    "domainTitle": "Модул 2. Структури от данни и алгоритми (11. клас ПП и ДЗИ)",
    "subSection": "Качествен програмен код",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:1": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Информационни системи с бази от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:1.1": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Информационни системи с бази от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:1.2": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Информационни системи с бази от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:1.3": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Информационни системи с бази от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:1.4": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Информационни системи с бази от данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:2": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Моделиране и обработване на данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:2.1": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Моделиране и обработване на данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:2.2": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Моделиране и обработване на данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:2.3": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Моделиране и обработване на данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:2.4": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Моделиране и обработване на данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:2.5": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Моделиране и обработване на данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:2.6": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Моделиране и обработване на данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:2.7": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Моделиране и обработване на данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:2.8": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Моделиране и обработване на данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m3:2.9": {
    "domainTitle": "Модул 3. Релационен модел на бази от данни (12. клас ПП и ДЗИ)",
    "subSection": "Моделиране и обработване на данни",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.1": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.2": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.3": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.4": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.5": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.6": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.7": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.8": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.9": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.10": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.11": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:1.12": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на информационни системи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:2": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Анализ, проектиране и реализиране на примерни приложения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:2.1": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Анализ, проектиране и реализиране на примерни приложения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:2.2": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Анализ, проектиране и реализиране на примерни приложения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-informatika:m4:2.3": {
    "domainTitle": "Модул 4. Програмиране на информационни системи (12. клас ПП и ДЗИ)",
    "subSection": "Анализ, проектиране и реализиране на примерни приложения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-informatika.pdf"
  },
  "pp-it:m1:1.1": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:1.4": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:1.5": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:1.6": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:1.10": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:2.1": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:2.2": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:2.3": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:2.4": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:3.1": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:3.2": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:3.3": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:3.4": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:3.5": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m1:3.6": {
    "domainTitle": "Модул 1. Обработка и анализ на данни (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:1": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Цифровизиране на аудио-визуална информация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:1.1": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Цифровизиране на аудио-визуална информация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:1.2": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Цифровизиране на аудио-визуална информация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:2": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Обработка на растерни изображения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:2.1": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Обработка на растерни изображения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:2.2": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Обработка на растерни изображения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:2.3": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Обработка на растерни изображения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:3": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Създаване и обработка на векторни изображения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:3.1": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Създаване и обработка на векторни изображения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:3.2": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Създаване и обработка на векторни изображения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:4": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Цифрова обработка на звук",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:4.1": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Цифрова обработка на звук",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:5": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Създаване на видеоклип",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:5.3": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Създаване на видеоклип",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:6": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Мултимедийни продукти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:6.1": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Мултимедийни продукти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:6.2": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Мултимедийни продукти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:6.3": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Мултимедийни продукти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:6.4": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Мултимедийни продукти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:6.5": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Мултимедийни продукти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m2:6.6": {
    "domainTitle": "Модул 2. Мултимедия (11. клас ПП и ДЗИ)",
    "subSection": "Мултимедийни продукти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:1": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Планиране на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:1.1": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Планиране на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:1.2": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Планиране на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:2": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Проектиране и графичен дизайн на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:2.1": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Проектиране и графичен дизайн на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:3": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Изграждане, тестване и публикуване на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:3.2": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Изграждане, тестване и публикуване на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:3.3": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Изграждане, тестване и публикуване на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:3.4": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Изграждане, тестване и публикуване на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:3.5": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Изграждане, тестване и публикуване на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:3.6": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Изграждане, тестване и публикуване на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:3.7": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Изграждане, тестване и публикуване на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:3.8": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Изграждане, тестване и публикуване на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:3.9": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Изграждане, тестване и публикуване на уеб сайт",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:4": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Системи за управление на уеб съдържание",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:4.1": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Системи за управление на уеб съдържание",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:4.2": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Системи за управление на уеб съдържание",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:5": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Сигурност в уеб",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:5.1": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Сигурност в уеб",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:5.2": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Сигурност в уеб",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m3:5.3": {
    "domainTitle": "Модул 3. Уеб дизайн (12. клас ПП и ДЗИ)",
    "subSection": "Сигурност в уеб",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m4:1.1": {
    "domainTitle": "Модул 4. Решаване на проблеми с информационни и комуникационни технологии (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m4:1.2": {
    "domainTitle": "Модул 4. Решаване на проблеми с информационни и комуникационни технологии (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m4:1.3": {
    "domainTitle": "Модул 4. Решаване на проблеми с информационни и комуникационни технологии (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m4:1.4": {
    "domainTitle": "Модул 4. Решаване на проблеми с информационни и комуникационни технологии (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m4:2.1": {
    "domainTitle": "Модул 4. Решаване на проблеми с информационни и комуникационни технологии (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m4:2.2": {
    "domainTitle": "Модул 4. Решаване на проблеми с информационни и комуникационни технологии (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m4:2.3": {
    "domainTitle": "Модул 4. Решаване на проблеми с информационни и комуникационни технологии (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-it:m4:2.4": {
    "domainTitle": "Модул 4. Решаване на проблеми с информационни и комуникационни технологии (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-it.pdf"
  },
  "pp-history:m1:1": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Държави и държавни модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:1.1": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Държави и държавни модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:1.2": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Държави и държавни модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:1.3": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Държави и държавни модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:1.4": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Държави и държавни модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:1.5": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Държави и държавни модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:1.6": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Държави и държавни модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:1.7": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Държави и държавни модели",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:2": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Власт и идеологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:2.1": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Власт и идеологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:2.2": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Власт и идеологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:2.3": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Власт и идеологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:2.4": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Власт и идеологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:2.5": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Власт и идеологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:3": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Власт и политики",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:3.1": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Власт и политики",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:3.2": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Власт и политики",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m1:3.3": {
    "domainTitle": "Модул 1. Власт и институции (11. клас ПП и ДЗИ)",
    "subSection": "Власт и политики",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:1": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Грамотност и образование",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:1.1": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Грамотност и образование",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:1.2": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Грамотност и образование",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:1.3": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Грамотност и образование",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:1.4": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Грамотност и образование",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:2": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Културни модели на Античността и Средновековието",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:2.1": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Културни модели на Античността и Средновековието",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:2.2": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Културни модели на Античността и Средновековието",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:3": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Раждането на модерната култура",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:3.1": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Раждането на модерната култура",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:3.2": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Раждането на модерната култура",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:3.3": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Раждането на модерната култура",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:4": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Култура на всекидневието",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:4.1": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Култура на всекидневието",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:4.2": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Култура на всекидневието",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m2:4.3": {
    "domainTitle": "Модул 2. Култура и духовност (11. клас ПП и ДЗИ)",
    "subSection": "Култура на всекидневието",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m3:1": {
    "domainTitle": "Модул 3. Човек и общество (12. клас ПП и ДЗИ)",
    "subSection": "Обществени групи в Античността",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m3:1.1": {
    "domainTitle": "Модул 3. Човек и общество (12. клас ПП и ДЗИ)",
    "subSection": "Обществени групи в Античността",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m3:1.2": {
    "domainTitle": "Модул 3. Човек и общество (12. клас ПП и ДЗИ)",
    "subSection": "Обществени групи в Античността",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m3:1.3": {
    "domainTitle": "Модул 3. Човек и общество (12. клас ПП и ДЗИ)",
    "subSection": "Обществени групи в Античността",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m3:2": {
    "domainTitle": "Модул 3. Човек и общество (12. клас ПП и ДЗИ)",
    "subSection": "Средновековните общества",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m3:2.1": {
    "domainTitle": "Модул 3. Човек и общество (12. клас ПП и ДЗИ)",
    "subSection": "Средновековните общества",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m3:2.2": {
    "domainTitle": "Модул 3. Човек и общество (12. клас ПП и ДЗИ)",
    "subSection": "Средновековните общества",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m3:3": {
    "domainTitle": "Модул 3. Човек и общество (12. клас ПП и ДЗИ)",
    "subSection": "Човекът и Новото време",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m3:3.1": {
    "domainTitle": "Модул 3. Човек и общество (12. клас ПП и ДЗИ)",
    "subSection": "Човекът и Новото време",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-history:m3:3.2": {
    "domainTitle": "Модул 3. Човек и общество (12. клас ПП и ДЗИ)",
    "subSection": "Човекът и Новото време",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-istoria.pdf"
  },
  "pp-geo:m1:1": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Основни методи на географското изследване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:1.1": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Основни методи на географското изследване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:1.2": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Основни методи на географското изследване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:2": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Процеси и закономерности в геосферите",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:2.1": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Процеси и закономерности в геосферите",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:2.2": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Процеси и закономерности в геосферите",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:2.3": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Процеси и закономерности в геосферите",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:2.4": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Процеси и закономерности в геосферите",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:3": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Природноресурсен потенциал",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:3.1": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Природноресурсен потенциал",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:3.4": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Природноресурсен потенциал",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:4": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Алтернативни енергийни ресурси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:4.1": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Алтернативни енергийни ресурси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:5": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Глобалните проблеми на природноресурсния потенциал на Земята",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:5.1": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Глобалните проблеми на природноресурсния потенциал на Земята",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:5.2": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Глобалните проблеми на природноресурсния потенциал на Земята",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:6": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Съвременни аспекти на взаимовръзки в системата „природа – общество – стопанство“",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:6.1": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Съвременни аспекти на взаимовръзки в системата „природа – общество – стопанство“",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:7": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Устойчиво развитие на планетата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:7.1": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Устойчиво развитие на планетата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:7.2": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Устойчиво развитие на планетата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m1:7.3": {
    "domainTitle": "Модул 1. Природноресурсен потенциал. устойчиво развитие (11. клас ПП и ДЗИ)",
    "subSection": "Устойчиво развитие на планетата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:I": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:1": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Политическа география и геополитика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:1.1": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Политическа география и геополитика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:2": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Геополитически и икономически концепции за развитие на обществото",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:2.1": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Геополитически и икономически концепции за развитие на обществото",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:3": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Геополитика и икономическо развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:3.1": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Геополитика и икономическо развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:3.2": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Геополитика и икономическо развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:4": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:5": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Демографски процеси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:5.1": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Демографски процеси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:5.2": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Демографски процеси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:5.3": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Демографски процеси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:6": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Демографски проблеми и демографска политика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:6.1": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Демографски проблеми и демографска политика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:6.2": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Демографски проблеми и демографска политика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:6.3": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Демографски проблеми и демографска политика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:7": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:8": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Урбанизация и урбанизационни процеси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:8.1": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Урбанизация и урбанизационни процеси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:8.2": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Урбанизация и урбанизационни процеси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:II": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:9": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:10": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:11": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:12": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Международни проблеми и регионални конфликти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:12.1": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Международни проблеми и регионални конфликти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:12.2": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Международни проблеми и регионални конфликти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m2:12.3": {
    "domainTitle": "Модул 2. Геополитическа и обществена култура (11. клас ПП и ДЗИ)",
    "subSection": "Международни проблеми и регионални конфликти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:1": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Съвременни процеси на икономическо развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:1.1": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Съвременни процеси на икономическо развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:1.3": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Съвременни процеси на икономическо развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:2": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Модели на съвременното стопанство",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:2.1": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Модели на съвременното стопанство",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:2.2": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Модели на съвременното стопанство",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:3": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Международна икономическа интеграция",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:3.1": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Международна икономическа интеграция",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:4": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Външноикономически връзки",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:4.1": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Външноикономически връзки",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:4.2": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Външноикономически връзки",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:4.3": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Външноикономически връзки",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:5": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Динамично развитие на международния туризъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:5.1": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Динамично развитие на международния туризъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:6": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Съвременно състояние и развитие на енергетиката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:6.1": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Съвременно състояние и развитие на енергетиката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:6.2": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Съвременно състояние и развитие на енергетиката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:7": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Големи енергийни проекти в света",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:7.1": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Големи енергийни проекти в света",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:8": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Високите технологии и съвременното стопанско развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:8.1": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Високите технологии и съвременното стопанско развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:8.2": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Високите технологии и съвременното стопанско развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:8.4": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Високите технологии и съвременното стопанско развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:9": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Транснационални корпорации",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:9.1": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Транснационални корпорации",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m3:9.2": {
    "domainTitle": "Модул 3. Съвременно икономическо развитие (12. клас ПП и ДЗИ)",
    "subSection": "Транснационални корпорации",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m4:1": {
    "domainTitle": "Модул 4. Европа, азия и българия (12. клас ПП и ДЗИ)",
    "subSection": "География на регионите и страните",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m4:1.1": {
    "domainTitle": "Модул 4. Европа, азия и българия (12. клас ПП и ДЗИ)",
    "subSection": "География на регионите и страните",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m4:1.3": {
    "domainTitle": "Модул 4. Европа, азия и българия (12. клас ПП и ДЗИ)",
    "subSection": "География на регионите и страните",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m4:1.3+": {
    "domainTitle": "Модул 4. Европа, азия и българия (12. клас ПП и ДЗИ)",
    "subSection": "География на регионите и страните",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m4:1.12": {
    "domainTitle": "Модул 4. Европа, азия и българия (12. клас ПП и ДЗИ)",
    "subSection": "География на регионите и страните",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m4:1.13": {
    "domainTitle": "Модул 4. Европа, азия и българия (12. клас ПП и ДЗИ)",
    "subSection": "География на регионите и страните",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m4:1.14": {
    "domainTitle": "Модул 4. Европа, азия и българия (12. клас ПП и ДЗИ)",
    "subSection": "География на регионите и страните",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m4:1.15": {
    "domainTitle": "Модул 4. Европа, азия и българия (12. клас ПП и ДЗИ)",
    "subSection": "География на регионите и страните",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:1": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Геополитическо положение на България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:1.1": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Геополитическо положение на България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:2": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Демографски проблеми в България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:2.1": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Демографски проблеми в България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:2.3": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Демографски проблеми в България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:3": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Съвременно развитие, проблеми и тенденции на селищната мрежа в България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:3.1": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Съвременно развитие, проблеми и тенденции на селищната мрежа в България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:3.2": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Съвременно развитие, проблеми и тенденции на селищната мрежа в България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:4": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Социални проблеми и социална политика на България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:4.1": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Социални проблеми и социална политика на България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:5": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Икономически проблеми на България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:5.1": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Икономически проблеми на България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:5.3": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Икономически проблеми на България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:5.4": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Икономически проблеми на България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:5.6": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Икономически проблеми на България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:5.7": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Икономически проблеми на България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:6": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Екологични проблеми в България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:6.1": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": "Екологични проблеми в България",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:7": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:8.1": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:8.2": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m5:9.1": {
    "domainTitle": "Модул 5. България и регионална политика (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:1.1": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:2.1": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:2.1+": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:2.2": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:2.4": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:2.6": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:3": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Геоинформационни технологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:3.1": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Геоинформационни технологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:3.3": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Геоинформационни технологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:3.4": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Геоинформационни технологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:3.5": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Геоинформационни технологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:3.6": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Геоинформационни технологии",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:4": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Приложни направления на географската наука",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:4.1": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Приложни направления на географската наука",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:4.2": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Приложни направления на географската наука",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:5": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Трансформиране на географска информация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:5.1": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Трансформиране на географска информация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:5.5": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": "Трансформиране на географска информация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-geo:m6:6.1": {
    "domainTitle": "Модул 6. Географска и икономическа информация (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-geografia.pdf"
  },
  "pp-phil:m1:1": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Идеи и парадигми",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:1.1": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Идеи и парадигми",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:1.2": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Идеи и парадигми",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:1.3": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Идеи и парадигми",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:2": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Предмодерно и модерно",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:2.1": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Предмодерно и модерно",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:2.2": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Предмодерно и модерно",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:2.3": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Предмодерно и модерно",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:2.4": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Предмодерно и модерно",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:2.5": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Предмодерно и модерно",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:3": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Човек и машина",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:3.1": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Човек и машина",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:3.2": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Човек и машина",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:3.3": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Човек и машина",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:4": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Обяснение и разбиране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:4.1": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Обяснение и разбиране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:4.2": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Обяснение и разбиране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:4.3": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Обяснение и разбиране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:5": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Идеално и утопично",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:5.1": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Идеално и утопично",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:5.2": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Идеално и утопично",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:5.3": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Идеално и утопично",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:6": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Статика и динамика на света",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:6.1": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Статика и динамика на света",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:6.2": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Статика и динамика на света",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m1:6.3": {
    "domainTitle": "Модул 1. История на идеите (11. клас ПП и ДЗИ)",
    "subSection": "Статика и динамика на света",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:1": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Личност и ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:1.1": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Личност и ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:1.2": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Личност и ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:2": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Природа и ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:2.1": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Природа и ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:2.2": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Природа и ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:2.3": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Природа и ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:3": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Красивото като ценност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:3.1": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Красивото като ценност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:3.2": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Красивото като ценност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:3.3": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Красивото като ценност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:4": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Социални ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:4.1": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Социални ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:4.2": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Социални ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:4.3": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Социални ценности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:5": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:6": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Святото",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:6.1": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Святото",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:6.2": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Святото",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:6.3": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Святото",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m2:6.4": {
    "domainTitle": "Модул 2. Философия и ценности (11. клас ПП и ДЗИ)",
    "subSection": "Святото",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m3:1": {
    "domainTitle": "Модул 3. Култура на мисленето (12. клас ПП и ДЗИ)",
    "subSection": "Критическо мислене и аргументация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m3:1.1": {
    "domainTitle": "Модул 3. Култура на мисленето (12. клас ПП и ДЗИ)",
    "subSection": "Критическо мислене и аргументация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m3:1.2": {
    "domainTitle": "Модул 3. Култура на мисленето (12. клас ПП и ДЗИ)",
    "subSection": "Критическо мислене и аргументация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m3:1.3": {
    "domainTitle": "Модул 3. Култура на мисленето (12. клас ПП и ДЗИ)",
    "subSection": "Критическо мислене и аргументация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m3:2": {
    "domainTitle": "Модул 3. Култура на мисленето (12. клас ПП и ДЗИ)",
    "subSection": "Творческо и диалогично мислене",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m3:2.1": {
    "domainTitle": "Модул 3. Култура на мисленето (12. клас ПП и ДЗИ)",
    "subSection": "Творческо и диалогично мислене",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m3:2.2": {
    "domainTitle": "Модул 3. Култура на мисленето (12. клас ПП и ДЗИ)",
    "subSection": "Творческо и диалогично мислене",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:1": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Личност и група. Групова динамика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:1.1": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Личност и група. Групова динамика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:1.2": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Личност и група. Групова динамика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:1.3": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Личност и група. Групова динамика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:1.4": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Личност и група. Групова динамика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:1.5": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Личност и група. Групова динамика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:2": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Умения за общуване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:2.1": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Умения за общуване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:2.2": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Умения за общуване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:2.3": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Умения за общуване",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:3": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Разрешаване на конфликти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m4:3.1": {
    "domainTitle": "Модул 4. Социална психология (12. клас ПП и ДЗИ)",
    "subSection": "Разрешаване на конфликти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m5:1": {
    "domainTitle": "Модул 5. Философия и политика (12. клас ПП и ДЗИ)",
    "subSection": "Личност и политическо участие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m5:1.1": {
    "domainTitle": "Модул 5. Философия и политика (12. клас ПП и ДЗИ)",
    "subSection": "Личност и политическо участие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m5:1.2": {
    "domainTitle": "Модул 5. Философия и политика (12. клас ПП и ДЗИ)",
    "subSection": "Личност и политическо участие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m5:1.3": {
    "domainTitle": "Модул 5. Философия и политика (12. клас ПП и ДЗИ)",
    "subSection": "Личност и политическо участие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m5:2": {
    "domainTitle": "Модул 5. Философия и политика (12. клас ПП и ДЗИ)",
    "subSection": "Глобалност и отговорност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m5:2.1": {
    "domainTitle": "Модул 5. Философия и политика (12. клас ПП и ДЗИ)",
    "subSection": "Глобалност и отговорност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m5:2.2": {
    "domainTitle": "Модул 5. Философия и политика (12. клас ПП и ДЗИ)",
    "subSection": "Глобалност и отговорност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m5:2.3": {
    "domainTitle": "Модул 5. Философия и политика (12. клас ПП и ДЗИ)",
    "subSection": "Глобалност и отговорност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m6:1": {
    "domainTitle": "Модул 6. Психология на личността (12. клас ПП и ДЗИ)",
    "subSection": "Личност и индивидуални различия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m6:1.1": {
    "domainTitle": "Модул 6. Психология на личността (12. клас ПП и ДЗИ)",
    "subSection": "Личност и индивидуални различия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m6:1.2": {
    "domainTitle": "Модул 6. Психология на личността (12. клас ПП и ДЗИ)",
    "subSection": "Личност и индивидуални различия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m6:1.3": {
    "domainTitle": "Модул 6. Психология на личността (12. клас ПП и ДЗИ)",
    "subSection": "Личност и индивидуални различия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m6:1.4": {
    "domainTitle": "Модул 6. Психология на личността (12. клас ПП и ДЗИ)",
    "subSection": "Личност и индивидуални различия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m6:2": {
    "domainTitle": "Модул 6. Психология на личността (12. клас ПП и ДЗИ)",
    "subSection": "Личност и развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m6:2.1": {
    "domainTitle": "Модул 6. Психология на личността (12. клас ПП и ДЗИ)",
    "subSection": "Личност и развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m6:2.2": {
    "domainTitle": "Модул 6. Психология на личността (12. клас ПП и ДЗИ)",
    "subSection": "Личност и развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m6:3": {
    "domainTitle": "Модул 6. Психология на личността (12. клас ПП и ДЗИ)",
    "subSection": "Психично здраве",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-phil:m6:3.1": {
    "domainTitle": "Модул 6. Психология на личността (12. клас ПП и ДЗИ)",
    "subSection": "Психично здраве",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 206,
    "pdfUrl": "https://www.mon.bg/nfs/2019/01/profil-phil.pdf"
  },
  "pp-bio:m1:1": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Атоми, молекули и надмолекулни комплекси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:1.1": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Атоми, молекули и надмолекулни комплекси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:1.2": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Атоми, молекули и надмолекулни комплекси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:1.3": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Атоми, молекули и надмолекулни комплекси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:1.4": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Атоми, молекули и надмолекулни комплекси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:1.5": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Атоми, молекули и надмолекулни комплекси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:2": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Клетката – структура и функциониране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:2.1": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Клетката – структура и функциониране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:2.2": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Клетката – структура и функциониране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:2.3": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Клетката – структура и функциониране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:2.4": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Клетката – структура и функциониране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:2.5": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": "Клетката – структура и функциониране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m1:3": {
    "domainTitle": "Модул 1. Клетката – елементарна биологична система (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:1": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:2": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Движение – същност и форми на проява в многоклетъчния организъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:2.1": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Движение – същност и форми на проява в многоклетъчния организъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:2.2": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Движение – същност и форми на проява в многоклетъчния организъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:3": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Регулация и хомеостаза в многоклетъчния организъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:3.1": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Регулация и хомеостаза в многоклетъчния организъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:3.2": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Регулация и хомеостаза в многоклетъчния организъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:4": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Наследственост и изменчивост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:4.1": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Наследственост и изменчивост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:4.2": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Наследственост и изменчивост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:4.3": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Наследственост и изменчивост",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:5": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Размножаване, растеж и развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:5.1": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Размножаване, растеж и развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:5.2": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Размножаване, растеж и развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:5.3": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Размножаване, растеж и развитие",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:6": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Поведение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:6.1": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Поведение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:6.2": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": "Поведение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m2:7": {
    "domainTitle": "Модул 2. Многоклетъчна организация на биологичните системи (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m3:1": {
    "domainTitle": "Модул 3. Биосфера - структура и процеси (12. клас ПП и ДЗИ)",
    "subSection": "Популацията − основна форма на съществуване на вида",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m3:1.1": {
    "domainTitle": "Модул 3. Биосфера - структура и процеси (12. клас ПП и ДЗИ)",
    "subSection": "Популацията − основна форма на съществуване на вида",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m3:1.2": {
    "domainTitle": "Модул 3. Биосфера - структура и процеси (12. клас ПП и ДЗИ)",
    "subSection": "Популацията − основна форма на съществуване на вида",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m3:2": {
    "domainTitle": "Модул 3. Биосфера - структура и процеси (12. клас ПП и ДЗИ)",
    "subSection": "Екосистеми и биосфера",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m3:2.1": {
    "domainTitle": "Модул 3. Биосфера - структура и процеси (12. клас ПП и ДЗИ)",
    "subSection": "Екосистеми и биосфера",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m3:2.2": {
    "domainTitle": "Модул 3. Биосфера - структура и процеси (12. клас ПП и ДЗИ)",
    "subSection": "Екосистеми и биосфера",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m3:2.3": {
    "domainTitle": "Модул 3. Биосфера - структура и процеси (12. клас ПП и ДЗИ)",
    "subSection": "Екосистеми и биосфера",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m3:3": {
    "domainTitle": "Модул 3. Биосфера - структура и процеси (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m3:4": {
    "domainTitle": "Модул 3. Биосфера - структура и процеси (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:1": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Произход на живата материя – хипотези и доказателства",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:1.1": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Произход на живата материя – хипотези и доказателства",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:1.2": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Произход на живата материя – хипотези и доказателства",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:2": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Еволюция на формите и начините за съществуване на клетката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:2.1": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Еволюция на формите и начините за съществуване на клетката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:2.2": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Еволюция на формите и начините за съществуване на клетката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:2.3": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Еволюция на формите и начините за съществуване на клетката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:3": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Произход и еволюция на многоклетъчните организми",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:3.1": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Произход и еволюция на многоклетъчните организми",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:3.2": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Произход и еволюция на многоклетъчните организми",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:3.3": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Произход и еволюция на многоклетъчните организми",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:4": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Многообразие на еволюционно утвърдените форми на живот",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:4.1": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Многообразие на еволюционно утвърдените форми на живот",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-bio:m4:4.2": {
    "domainTitle": "Модул 4. Еволюция на биологичните системи (12. клас ПП и ДЗИ)",
    "subSection": "Многообразие на еволюционно утвърдените форми на живот",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/11/profil-biologia-04112020.pdf"
  },
  "pp-fa:m1:1": {
    "domainTitle": "Модул 1. Движение и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Механика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m1:1.1": {
    "domainTitle": "Модул 1. Движение и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Механика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m1:1.2": {
    "domainTitle": "Модул 1. Движение и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Механика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m1:1.3": {
    "domainTitle": "Модул 1. Движение и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Механика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m1:1.4": {
    "domainTitle": "Модул 1. Движение и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Механика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m1:1.5": {
    "domainTitle": "Модул 1. Движение и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Механика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m1:1.6": {
    "domainTitle": "Модул 1. Движение и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Механика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m1:1.7": {
    "domainTitle": "Модул 1. Движение и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Механика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m1:1.7+": {
    "domainTitle": "Модул 1. Движение и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Механика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m1:1.8": {
    "domainTitle": "Модул 1. Движение и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Механика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m2:1": {
    "domainTitle": "Модул 2. Поле и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Поле",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m2:1.1": {
    "domainTitle": "Модул 2. Поле и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Поле",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m2:1.2": {
    "domainTitle": "Модул 2. Поле и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Поле",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m2:2": {
    "domainTitle": "Модул 2. Поле и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Електромагнетизъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m2:2.1": {
    "domainTitle": "Модул 2. Поле и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Електромагнетизъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m2:2.2": {
    "domainTitle": "Модул 2. Поле и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Електромагнетизъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m2:2.3": {
    "domainTitle": "Модул 2. Поле и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Електромагнетизъм",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m2:3": {
    "domainTitle": "Модул 2. Поле и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Електромагнитни вълни. Оптика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m2:3.1": {
    "domainTitle": "Модул 2. Поле и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Електромагнитни вълни. Оптика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m2:3.2": {
    "domainTitle": "Модул 2. Поле и енергия (11. клас ПП и ДЗИ)",
    "subSection": "Електромагнитни вълни. Оптика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:1": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Измерване на физични величини",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:1.1": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Измерване на физични величини",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:1.2": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Измерване на физични величини",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:1.3": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Измерване на физични величини",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:1.4": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Измерване на физични величини",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:1.5": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Измерване на физични величини",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:2": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Експериментално определяне на функционални зависимости",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:2.1": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Експериментално определяне на функционални зависимости",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:2.2": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Експериментално определяне на функционални зависимости",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:3": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Експериментална проверка на физични закони и зависимости",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:3.1": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Експериментална проверка на физични закони и зависимости",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:3.2": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Експериментална проверка на физични закони и зависимости",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m3:3.3": {
    "domainTitle": "Модул 3. Експериментална физика (12. клас ПП и ДЗИ)",
    "subSection": "Експериментална проверка на физични закони и зависимости",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:1": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Молекулен строеж на веществата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:1.1": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Молекулен строеж на веществата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:1.2": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Молекулен строеж на веществата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:1.3": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Молекулен строеж на веществата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:1.4": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Молекулен строеж на веществата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:2": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Специална теория на относителността",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:2.1": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Специална теория на относителността",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:2.2": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Специална теория на относителността",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:2.3": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Специална теория на относителността",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:2.4": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Специална теория на относителността",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:2.5": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Специална теория на относителността",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:3": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Вълни и кванти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:3.1": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Вълни и кванти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:3.2": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": "Вълни и кванти",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m4:4": {
    "domainTitle": "Модул 4. Атоми, вълни и кванти (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:1": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Астрономия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:1.1": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Астрономия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:1.2": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Астрономия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:1.3": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Астрономия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:1.4": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Астрономия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:1.5": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Астрономия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:1.6": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Астрономия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:2": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Приложна физика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:2.1": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Приложна физика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:2.2": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Приложна физика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:2.3": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Приложна физика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:2.4": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Приложна физика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:2.5": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Приложна физика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:2.6": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Приложна физика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-fa:m5:2.7": {
    "domainTitle": "Модул 5. Съвременна физика (12. клас ПП и ДЗИ)",
    "subSection": "Приложна физика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 205,
    "pdfUrl": "https://www.mon.bg/nfs/2020/06/profil-fizika-12062020.pdf"
  },
  "pp-himia:m1:1": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Строеж на атома и Периодична система",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:1.1": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Строеж на атома и Периодична система",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:1.2": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Строеж на атома и Периодична система",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:2": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Строеж и свойства на веществата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:2.1": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Строеж и свойства на веществата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:2.2": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Строеж и свойства на веществата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:3": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Химична термодинамика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:3.1": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Химична термодинамика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:3.2": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Химична термодинамика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:4": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:5": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Системи от две или повече вещества",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:5.1": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Системи от две или повече вещества",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:5.2": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Системи от две или повече вещества",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:5.3": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Системи от две или повече вещества",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m1:5.4": {
    "domainTitle": "Модул 1. Теоретични основи на химията (11. клас ПП и ДЗИ)",
    "subSection": "Системи от две или повече вещества",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:1": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Разпространение и видове химични елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:1.1": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Разпространение и видове химични елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:1.2": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Разпространение и видове химични елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:2": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на s-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:2.1": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на s-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:2.2": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на s-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:2.3": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на s-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:3": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на p-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:3.1": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на p-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:3.2": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на p-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:3.3": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на p-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:3.4": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на p-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:4": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на d-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:4.1": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на d-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:4.2": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на d-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:4.3": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Вещества на d-елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:5": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:6": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Химическа промишленост и околна среда",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:6.1": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Химическа промишленост и околна среда",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:6.2": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Химическа промишленост и околна среда",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:6.3": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Химическа промишленост и околна среда",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:6.4": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Химическа промишленост и околна среда",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m2:6.5": {
    "domainTitle": "Модул 2. Химия на неорганичните вещества (11. клас ПП и ДЗИ)",
    "subSection": "Химическа промишленост и околна среда",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:1": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Пространствен строеж на органичните съединения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:1.1": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Пространствен строеж на органичните съединения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:1.2": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Пространствен строеж на органичните съединения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:1.3": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Пространствен строеж на органичните съединения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:2": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Въглеводороди",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:2.1": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Въглеводороди",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:2.2": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Въглеводороди",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:2.3": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Въглеводороди",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:2.4": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Въглеводороди",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:3": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Органични съединения с функционални групи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:3.1": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Органични съединения с функционални групи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:3.2": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Органични съединения с функционални групи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:3.3": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Органични съединения с функционални групи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:3.4": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Органични съединения с функционални групи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:3.4.1": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Карбоксилни киселини",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:3.4.2": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Карбоксилни киселини",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:3.5": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Органични съединения с функционални групи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:4": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Природни органични съединения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:4.1": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Природни органични съединения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:4.2": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Природни органични съединения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:4.3": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Природни органични съединения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:4.4": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Природни органични съединения",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:5": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Полимерни материали – пластмаси, каучук и влакна",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:5.1": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Полимерни материали – пластмаси, каучук и влакна",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:5.2": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Полимерни материали – пластмаси, каучук и влакна",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m3:5.3": {
    "domainTitle": "Модул 3. Химия на органичните вещества (12. клас ПП и ДЗИ)",
    "subSection": "Полимерни материали – пластмаси, каучук и влакна",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:1": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Основни методи в съвременната аналитична химия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:1.1": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Основни методи в съвременната аналитична химия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:1.2": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Основни методи в съвременната аналитична химия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:1.3": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Основни методи в съвременната аналитична химия",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:2": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Качествен химичен анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:2.1": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Качествен химичен анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:2.2": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Качествен химичен анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:2.3": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Качествен химичен анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:2.4": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Качествен химичен анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:3": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Количествен химичен анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:3.1": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Количествен химичен анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:3.2": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Количествен химичен анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:4": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Инструментални методи за анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:4.1": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Инструментални методи за анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:4.2": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Инструментални методи за анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-himia:m4:4.3": {
    "domainTitle": "Модул 4. Методи за контрол и анализ на веществата (12. клас ПП и ДЗИ)",
    "subSection": "Инструментални методи за анализ",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-himia.pdf"
  },
  "pp-muzika:m1:1": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музика, култура, общество",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:1.1": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музика, култура, общество",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:1.2": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музика, култура, общество",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:1.3": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музика, култура, общество",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:1.4": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музика, култура, общество",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:1.5": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музика, култура, общество",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:2": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Стилове в музиката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:2.1": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Стилове в музиката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:2.2": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Стилове в музиката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:2.3": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Стилове в музиката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:2.4": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Стилове в музиката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:2.5": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Стилове в музиката",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.1": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.2": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.3": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.4": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.5": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.6": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.7": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.8": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.9": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.10": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.11": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.12": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.13": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:3.14": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Музикални форми и жанрове",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:4": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Съвременна популярна музика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:4.1": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Съвременна популярна музика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:4.2": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Съвременна популярна музика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:4.3": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Съвременна популярна музика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:5": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Българска музикална култура",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:5.1": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Българска музикална култура",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:5.2": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Българска музикална култура",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m1:5.3": {
    "domainTitle": "Модул 1. Музикална култура (11. клас ПП и ДЗИ)",
    "subSection": "Българска музикална култура",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:1": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Теория на музикалните елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:1+": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Музикалноизразни средства",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:2": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Звук – видове звуци",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:3": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Музикална система. Строй",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:1.4": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Теория на музикалните елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:1.6": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Теория на музикалните елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:1.7": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Теория на музикалните елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:1.8": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Теория на музикалните елементи",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:2+": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Развитие на музикалния слух",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:2.1": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Звук – видове звуци",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:2.2": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Звук – видове звуци",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:2.3": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Звук – видове звуци",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:2.4": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Звук – видове звуци",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:2.5": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Звук – видове звуци",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:3+": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Солфежни дейности",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:3.1": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Музикална система. Строй",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:3.2": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Музикална система. Строй",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m2:3.3": {
    "domainTitle": "Модул 2. Теория на музиката (11. клас ПП и ДЗИ)",
    "subSection": "Музикална система. Строй",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m3:1": {
    "domainTitle": "Модул 3. Музикален инструмент/пеене (12. клас ПП и ДЗИ)",
    "subSection": "Музикално-изпълнителско изкуство",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m3:1.1": {
    "domainTitle": "Модул 3. Музикален инструмент/пеене (12. клас ПП и ДЗИ)",
    "subSection": "Музикално-изпълнителско изкуство",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m3:1.2": {
    "domainTitle": "Модул 3. Музикален инструмент/пеене (12. клас ПП и ДЗИ)",
    "subSection": "Музикално-изпълнителско изкуство",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m3:1.3": {
    "domainTitle": "Модул 3. Музикален инструмент/пеене (12. клас ПП и ДЗИ)",
    "subSection": "Музикално-изпълнителско изкуство",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m3:2": {
    "domainTitle": "Модул 3. Музикален инструмент/пеене (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m3:3": {
    "domainTitle": "Модул 3. Музикален инструмент/пеене (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m3:4": {
    "domainTitle": "Модул 3. Музикален инструмент/пеене (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m4:1.1": {
    "domainTitle": "Модул 4. Пиано/електронни инструменти (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m4:1.2": {
    "domainTitle": "Модул 4. Пиано/електронни инструменти (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m4:1.3": {
    "domainTitle": "Модул 4. Пиано/електронни инструменти (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m4:2": {
    "domainTitle": "Модул 4. Пиано/електронни инструменти (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m4:3": {
    "domainTitle": "Модул 4. Пиано/електронни инструменти (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-muzika:m4:4": {
    "domainTitle": "Модул 4. Пиано/електронни инструменти (12. клас ПП и ДЗИ)",
    "subSection": null,
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-muzika.pdf"
  },
  "pp-arts:1": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Пропорции и мащаб",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:1.1": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Пропорции и мащаб",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:1.2": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Пропорции и мащаб",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:1.3": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Пропорции и мащаб",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:1.4": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Пропорции и мащаб",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:2": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Пространство",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:2.1": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Пространство",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:3": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Форма",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:3.1": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Форма",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:3.2": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Форма",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:3.3": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Форма",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:4": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Цвят",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:4.1": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Цвят",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-arts:4.2": {
    "domainTitle": "Модул 2. Изкуство и изразни средства (11.–12. клас ПП и ДЗИ)",
    "subSection": "Цвят",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-izobrazitelno.pdf"
  },
  "pp-predpriemachestvo:m1:1": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Личността на предприемача",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:1.1": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Личността на предприемача",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:1.2": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Личността на предприемача",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:1.3": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Личността на предприемача",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:2": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Изследване на кариерата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:2.1": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Изследване на кариерата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:2.2": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Изследване на кариерата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:2.3": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Изследване на кариерата",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:3": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Предприемачество и планиране на кариера",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:3.1": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Предприемачество и планиране на кариера",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:3.2": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Предприемачество и планиране на кариера",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m1:3.3": {
    "domainTitle": "Модул 1. Предприемачество и кариерно развитие (11. клас ПП и ДЗИ)",
    "subSection": "Предприемачество и планиране на кариера",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 201,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:1": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Пазарната икономика като фундамент на предприемаческата дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:1.1": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Пазарната икономика като фундамент на предприемаческата дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:1.2": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Пазарната икономика като фундамент на предприемаческата дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:1.3": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Пазарната икономика като фундамент на предприемаческата дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:1.4": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Пазарната икономика като фундамент на предприемаческата дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:2": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Производствени ресурси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:2.1": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Производствени ресурси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:2.2": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Производствени ресурси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:2.3": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Производствени ресурси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:3": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Търсене и предлагане",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:3.1": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Търсене и предлагане",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:3.2": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Търсене и предлагане",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:3.3": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Търсене и предлагане",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:3.4": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Търсене и предлагане",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:4": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Пазарна среда на предприемачеството",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:4.1": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Пазарна среда на предприемачеството",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:4.2": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Пазарна среда на предприемачеството",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:4.3": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Пазарна среда на предприемачеството",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:5": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Нормативна база на предприемачеството",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:5.1": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Нормативна база на предприемачеството",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:5.2": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Нормативна база на предприемачеството",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:5.3": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Нормативна база на предприемачеството",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m2:5.4": {
    "domainTitle": "Модул 2. Пазарна икономика (11. клас ПП и ДЗИ)",
    "subSection": "Нормативна база на предприемачеството",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 202,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:1": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Въведение в предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:1.1": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Въведение в предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:1.2": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Въведение в предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:1.3": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Въведение в предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:1.4": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Въведение в предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:1.5": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Въведение в предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:2": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Ресурси за стартиране на предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:2.1": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Ресурси за стартиране на предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:2.2": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Ресурси за стартиране на предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:2.3": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Ресурси за стартиране на предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:2.4": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Ресурси за стартиране на предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:3": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Основи на бизнес планирането за предприемаческата дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:3.1": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Основи на бизнес планирането за предприемаческата дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:3.2": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Основи на бизнес планирането за предприемаческата дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:3.3": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Основи на бизнес планирането за предприемаческата дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:3.4": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Основи на бизнес планирането за предприемаческата дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:4": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Проект за конкретна предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:4.1": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Проект за конкретна предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:4.2": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Проект за конкретна предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:4.3": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Проект за конкретна предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:5": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Усъвършенстване на предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:5.1": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Усъвършенстване на предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:5.2": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Усъвършенстване на предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:5.3": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Усъвършенстване на предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:5.4": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Усъвършенстване на предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:5.5": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Усъвършенстване на предприемаческия процес",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:6": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Осигуряване на необходимите ресурси за стартиране на предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:6.1": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Осигуряване на необходимите ресурси за стартиране на предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:6.2": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Осигуряване на необходимите ресурси за стартиране на предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:6.3": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Осигуряване на необходимите ресурси за стартиране на предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:7": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на бизнес план за предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:7.1": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на бизнес план за предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:7.2": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на бизнес план за предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:8": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на проект за конкретна предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:8.1": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на проект за конкретна предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:8.2": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на проект за конкретна предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m3:8.3": {
    "domainTitle": "Модул 3. Стартиране на собствен бизнес (12. клас ПП и ДЗИ)",
    "subSection": "Разработване на проект за конкретна предприемаческа дейност",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 203,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:1": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Основни управленски функции – планиране, организиране, ръководене, контролиране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:1.1": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Основни управленски функции – планиране, организиране, ръководене, контролиране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:1.2": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Основни управленски функции – планиране, организиране, ръководене, контролиране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:1.3": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Основни управленски функции – планиране, организиране, ръководене, контролиране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:1.4": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Основни управленски функции – планиране, организиране, ръководене, контролиране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:1.5": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Основни управленски функции – планиране, организиране, ръководене, контролиране",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:2": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Вземане на управленско решение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:2.1": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Вземане на управленско решение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:2.2": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Вземане на управленско решение",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:3": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Управление на човешките ресурси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:3.1": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Управление на човешките ресурси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:3.2": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Управление на човешките ресурси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:3.3": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Управление на човешките ресурси",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:4": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Комуникации и използване на ИКТ в управлението",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:4.1": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Комуникации и използване на ИКТ в управлението",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:4.2": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Комуникации и използване на ИКТ в управлението",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "pp-predpriemachestvo:m4:4.3": {
    "domainTitle": "Модул 4. Управление на предприемаческата дейност (12. клас ПП и ДЗИ)",
    "subSection": "Комуникации и използване на ИКТ в управлението",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 204,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/profil-predpriemachestvo.pdf"
  },
  "lang-ae-a1:1": {
    "domainTitle": "Английски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Аз и другите",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_a1.pdf"
  },
  "lang-ae-a1:2": {
    "domainTitle": "Английски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Светът около мен",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_a1.pdf"
  },
  "lang-ae-a1:3": {
    "domainTitle": "Английски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Всекидневие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_a1.pdf"
  },
  "lang-ae-a1:4": {
    "domainTitle": "Английски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_a1.pdf"
  },
  "lang-ae-a1:5": {
    "domainTitle": "Английски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Природа и екология",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_a1.pdf"
  },
  "lang-ae-a1:6": {
    "domainTitle": "Английски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_a1.pdf"
  },
  "lang-ae-a1:skills": {
    "domainTitle": "Английски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_a1.pdf"
  },
  "lang-ae-a1:grammar": {
    "domainTitle": "Английски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_a1.pdf"
  },
  "lang-ae-a2-11-12:1": {
    "domainTitle": "Английски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Аз и другите",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ae_oa2_28112018.pdf"
  },
  "lang-ae-a2-11-12:2": {
    "domainTitle": "Английски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Светът около мен",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ae_oa2_28112018.pdf"
  },
  "lang-ae-a2-11-12:3": {
    "domainTitle": "Английски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Всекидневие",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ae_oa2_28112018.pdf"
  },
  "lang-ae-a2-11-12:4": {
    "domainTitle": "Английски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ae_oa2_28112018.pdf"
  },
  "lang-ae-a2-11-12:5": {
    "domainTitle": "Английски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Природа и екология",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ae_oa2_28112018.pdf"
  },
  "lang-ae-a2-11-12:6": {
    "domainTitle": "Английски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ae_oa2_28112018.pdf"
  },
  "lang-ae-a2-11-12:skills": {
    "domainTitle": "Английски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ae_oa2_28112018.pdf"
  },
  "lang-ae-a2-11-12:grammar": {
    "domainTitle": "Английски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ae_oa2_28112018.pdf"
  },
  "lang-ae-a2-8-neint:1": {
    "domainTitle": "Английски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Аз и другите",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ae-a2-8-neint:2": {
    "domainTitle": "Английски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Светът около мен",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ae-a2-8-neint:3": {
    "domainTitle": "Английски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Всекидневие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ae-a2-8-neint:4": {
    "domainTitle": "Английски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ae-a2-8-neint:5": {
    "domainTitle": "Английски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Природа и екология",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ae-a2-8-neint:6": {
    "domainTitle": "Английски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ae-a2-8-neint:skills": {
    "domainTitle": "Английски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ae-a2-8-neint:grammar": {
    "domainTitle": "Английски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ae-b1.1-8-int:1": {
    "domainTitle": "Английски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Аз и другите",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ae-b1.1-8-int:2": {
    "domainTitle": "Английски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Светът около мен",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ae-b1.1-8-int:3": {
    "domainTitle": "Английски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Всекидневие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ae-b1.1-8-int:4": {
    "domainTitle": "Английски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ae-b1.1-8-int:5": {
    "domainTitle": "Английски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Природа и екология",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ae-b1.1-8-int:6": {
    "domainTitle": "Английски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ae-b1.1-8-int:skills": {
    "domainTitle": "Английски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ae-b1.1-8-int:grammar": {
    "domainTitle": "Английски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ae_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ae-b1.1:1": {
    "domainTitle": "Английски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Аз и другите",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b1.1.pdf"
  },
  "lang-ae-b1.1:2": {
    "domainTitle": "Английски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Светът около мен",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b1.1.pdf"
  },
  "lang-ae-b1.1:3": {
    "domainTitle": "Английски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Всекидневие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b1.1.pdf"
  },
  "lang-ae-b1.1:4": {
    "domainTitle": "Английски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b1.1.pdf"
  },
  "lang-ae-b1.1:5": {
    "domainTitle": "Английски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Природа и екология",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b1.1.pdf"
  },
  "lang-ae-b1.1:6": {
    "domainTitle": "Английски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b1.1.pdf"
  },
  "lang-ae-b1.1:skills": {
    "domainTitle": "Английски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b1.1.pdf"
  },
  "lang-ae-b1.1:grammar": {
    "domainTitle": "Английски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b1.1.pdf"
  },
  "lang-ae-b1:1": {
    "domainTitle": "Английски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Аз и другите",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_b1.pdf"
  },
  "lang-ae-b1:2": {
    "domainTitle": "Английски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Светът около мен",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_b1.pdf"
  },
  "lang-ae-b1:3": {
    "domainTitle": "Английски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Всекидневие",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_b1.pdf"
  },
  "lang-ae-b1:4": {
    "domainTitle": "Английски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_b1.pdf"
  },
  "lang-ae-b1:5": {
    "domainTitle": "Английски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Природа и екология",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_b1.pdf"
  },
  "lang-ae-b1:6": {
    "domainTitle": "Английски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_b1.pdf"
  },
  "lang-ae-b1:skills": {
    "domainTitle": "Английски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_b1.pdf"
  },
  "lang-ae-b1:grammar": {
    "domainTitle": "Английски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ae_b1.pdf"
  },
  "lang-ae-b2.1:1": {
    "domainTitle": "Английски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Човекът в съвременния свят",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b2.1.pdf"
  },
  "lang-ae-b2.1:2": {
    "domainTitle": "Английски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Човек и наука",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b2.1.pdf"
  },
  "lang-ae-b2.1:3": {
    "domainTitle": "Английски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Медии и информация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b2.1.pdf"
  },
  "lang-ae-b2.1:4": {
    "domainTitle": "Английски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Личност и общество",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b2.1.pdf"
  },
  "lang-ae-b2.1:skills": {
    "domainTitle": "Английски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b2.1.pdf"
  },
  "lang-ae-b2.1:grammar": {
    "domainTitle": "Английски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ae_b2.1.pdf"
  },
  "lang-ne-a1:1": {
    "domainTitle": "Немски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Аз и другите",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_ne_a1.pdf"
  },
  "lang-ne-a1:2": {
    "domainTitle": "Немски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Светът около мен",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_ne_a1.pdf"
  },
  "lang-ne-a1:3": {
    "domainTitle": "Немски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Всекидневие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_ne_a1.pdf"
  },
  "lang-ne-a1:4": {
    "domainTitle": "Немски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_ne_a1.pdf"
  },
  "lang-ne-a1:5": {
    "domainTitle": "Немски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Природа и екология",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_ne_a1.pdf"
  },
  "lang-ne-a1:6": {
    "domainTitle": "Немски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_ne_a1.pdf"
  },
  "lang-ne-a1:skills": {
    "domainTitle": "Немски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_ne_a1.pdf"
  },
  "lang-ne-a1:grammar": {
    "domainTitle": "Немски език — Ниво A1 (8.–9. клас ООП)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9
    ],
    "examTags": [],
    "order": 81,
    "pdfUrl": "https://www.mon.bg/nfs/2023/12/up_ix_ne_a1.pdf"
  },
  "lang-ne-a2-11-12:1": {
    "domainTitle": "Немски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Аз и другите",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ne_oa2_28112018-1.pdf"
  },
  "lang-ne-a2-11-12:2": {
    "domainTitle": "Немски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Светът около мен",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ne_oa2_28112018-1.pdf"
  },
  "lang-ne-a2-11-12:3": {
    "domainTitle": "Немски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Всекидневие",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ne_oa2_28112018-1.pdf"
  },
  "lang-ne-a2-11-12:4": {
    "domainTitle": "Немски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ne_oa2_28112018-1.pdf"
  },
  "lang-ne-a2-11-12:5": {
    "domainTitle": "Немски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Природа и екология",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ne_oa2_28112018-1.pdf"
  },
  "lang-ne-a2-11-12:6": {
    "domainTitle": "Немски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ne_oa2_28112018-1.pdf"
  },
  "lang-ne-a2-11-12:skills": {
    "domainTitle": "Немски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ne_oa2_28112018-1.pdf"
  },
  "lang-ne-a2-11-12:grammar": {
    "domainTitle": "Немски език — Ниво A2 (11.–12. клас ООП)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [],
    "order": 111,
    "pdfUrl": "https://www.mon.bg/nfs/2018/12/oop_ne_oa2_28112018-1.pdf"
  },
  "lang-ne-a2-8-neint:1": {
    "domainTitle": "Немски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Аз и другите",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ne-a2-8-neint:2": {
    "domainTitle": "Немски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Светът около мен",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ne-a2-8-neint:3": {
    "domainTitle": "Немски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Всекидневие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ne-a2-8-neint:4": {
    "domainTitle": "Немски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ne-a2-8-neint:5": {
    "domainTitle": "Немски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Природа и екология",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ne-a2-8-neint:6": {
    "domainTitle": "Немски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ne-a2-8-neint:skills": {
    "domainTitle": "Немски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ne-a2-8-neint:grammar": {
    "domainTitle": "Немски език — Ниво A2 (8.–10. клас неинтензивно ООП)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8,
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 82,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_a2_neintensiven-2024.pdf"
  },
  "lang-ne-b1.1-8-int:1": {
    "domainTitle": "Немски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Аз и другите",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ne-b1.1-8-int:2": {
    "domainTitle": "Немски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Светът около мен",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ne-b1.1-8-int:3": {
    "domainTitle": "Немски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Всекидневие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ne-b1.1-8-int:4": {
    "domainTitle": "Немски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ne-b1.1-8-int:5": {
    "domainTitle": "Немски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Природа и екология",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ne-b1.1-8-int:6": {
    "domainTitle": "Немски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ne-b1.1-8-int:skills": {
    "domainTitle": "Немски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ne-b1.1-8-int:grammar": {
    "domainTitle": "Немски език — Ниво B1.1 (8. клас интензивно — Езикови гимназии)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      8
    ],
    "examTags": [],
    "order": 83,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_8kl_ne_zp_b1.1_intensiven-2024.pdf"
  },
  "lang-ne-b1.1:1": {
    "domainTitle": "Немски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Аз и другите",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b1.1.pdf"
  },
  "lang-ne-b1.1:2": {
    "domainTitle": "Немски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Светът около мен",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b1.1.pdf"
  },
  "lang-ne-b1.1:3": {
    "domainTitle": "Немски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Всекидневие",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b1.1.pdf"
  },
  "lang-ne-b1.1:4": {
    "domainTitle": "Немски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b1.1.pdf"
  },
  "lang-ne-b1.1:5": {
    "domainTitle": "Немски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Природа и екология",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b1.1.pdf"
  },
  "lang-ne-b1.1:6": {
    "domainTitle": "Немски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b1.1.pdf"
  },
  "lang-ne-b1.1:skills": {
    "domainTitle": "Немски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b1.1.pdf"
  },
  "lang-ne-b1.1:grammar": {
    "domainTitle": "Немски език — Ниво B1.1 (9.–10. клас разширено ООП)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-1",
    "sectionId": "section-a",
    "grades": [
      9,
      10
    ],
    "examTags": [
      "НВО 10"
    ],
    "order": 94,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b1.1.pdf"
  },
  "lang-ne-b1:1": {
    "domainTitle": "Немски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Аз и другите",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_ne_b1.pdf"
  },
  "lang-ne-b1:2": {
    "domainTitle": "Немски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Светът около мен",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_ne_b1.pdf"
  },
  "lang-ne-b1:3": {
    "domainTitle": "Немски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Всекидневие",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_ne_b1.pdf"
  },
  "lang-ne-b1:4": {
    "domainTitle": "Немски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Здраве и здравословен начин на живот",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_ne_b1.pdf"
  },
  "lang-ne-b1:5": {
    "domainTitle": "Немски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Природа и екология",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_ne_b1.pdf"
  },
  "lang-ne-b1:6": {
    "domainTitle": "Немски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Моята родина и светът",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_ne_b1.pdf"
  },
  "lang-ne-b1:skills": {
    "domainTitle": "Немски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_ne_b1.pdf"
  },
  "lang-ne-b1:grammar": {
    "domainTitle": "Немски език — Ниво B1 (11.–12. клас ООП и ДЗИ ниво B1)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-2",
    "sectionId": "section-a",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 115,
    "pdfUrl": "https://www.mon.bg/nfs/2023/11/up_ix_ne_b1.pdf"
  },
  "lang-ne-b2.1:1": {
    "domainTitle": "Немски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Човекът в съвременния свят",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b2.1.pdf"
  },
  "lang-ne-b2.1:2": {
    "domainTitle": "Немски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Човек и наука",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b2.1.pdf"
  },
  "lang-ne-b2.1:media": {
    "domainTitle": "Немски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Медии и информация",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b2.1.pdf"
  },
  "lang-ne-b2.1:3": {
    "domainTitle": "Немски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Личност и общество",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b2.1.pdf"
  },
  "lang-ne-b2.1:skills": {
    "domainTitle": "Немски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Слушане, четене, говорене и писане",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b2.1.pdf"
  },
  "lang-ne-b2.1:grammar": {
    "domainTitle": "Немски език — Ниво B2.1 (11.–12. клас Профилирана подготовка и ДЗИ B2)",
    "subSection": "Езикови знания: фонетика, лексика и граматика",
    "stageId": "stage-2",
    "sectionId": "section-b",
    "grades": [
      11,
      12
    ],
    "examTags": [
      "ДЗИ"
    ],
    "order": 215,
    "pdfUrl": "https://www.mon.bg/nfs/2018/08/up_ne_b2.1.pdf"
  }
};
