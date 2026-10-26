// Каталог на учебните програми на МОН за 8.–12. клас: теми, очаквани резултати и нови понятия

export type MonSubjectId =
  | 'bel'
  | 'lit'
  | 'math'
  | 'informatika'
  | 'it'
  | 'physics'
  | 'biology'
  | 'chemistry'
  | 'history'
  | 'geography'
  | 'philosophy'
  | 'civics'
  | 'tech'
  | 'entrepreneurship'
  | 'arts'
  | 'music'
  | 'pe'
  | 'english'
  | 'german';

/** Клас за общообразователната подготовка, 'pp' — профилирана подготовка (XI–XII), 'lang' — чужд език по ниво */
export type MonStage = 8 | 9 | 10 | 11 | 12 | 'pp' | 'lang';

export interface MonTopic {
  /** Стабилен идентификатор: <програма>[:m<модул>]:<номер> */
  id: string;
  /** Номерът от програмата („2.1.3“, „IV.2“); празен, ако програмата не номерира темите */
  num: string;
  title: string;
  /** 1 — раздел или тема, 2+ — подтема */
  depth: number;
}

export interface MonModule {
  /** Модул от профилираната подготовка; null за програмите без модули */
  title: string | null;
  topics: MonTopic[];
}

export interface MonProgram {
  id: string;
  stage: MonStage;
  slug: string;
  subject: MonSubjectId;
  /** Заглавие на документа (с часовете, когато има варианти) */
  title: string;
  /** Официалният PDF на mon.bg */
  url: string;
  /** false — програмата няма тестова част (физическо възпитание) или темите ѝ още не са в каталога */
  testable: boolean;
  modules: MonModule[];
}

export interface MonTopicDetails {
  /** Компетентности като очаквани резултати от обучението */
  outcomes: string[];
  /** Нови понятия */
  concepts: string[];
}

export interface MonProgramDetails {
  topics: Record<string, MonTopicDetails>;
  /** Резултати за цялата програма, когато не могат да се свържат с отделна тема */
  outcomes?: string[];
}
