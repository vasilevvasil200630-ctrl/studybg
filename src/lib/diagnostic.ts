import type { MonProgram, MonTopicDetails, TopicInProgram } from '../data/monCurriculum';
import { MON_SUBJECTS } from '../data/monCurriculum/subjects';
import { shuffleOptions, validateQuestions, type TopicQuizQuestion } from './topicQuiz';

// Входен тест по цялата програма на класа (по модела на diagnostic в Матура Плюс): по предмет,
// по един въпрос на тема, разпределени равномерно в програмата. Всеки въпрос проверява
// или знание („знае“), или приложение („може“). Може да се спре и да продължи по-късно.

export const DIAGNOSTIC_SIZE = 10;

export type DiagnosticKind = 'knows' | 'can';

export interface DiagnosticQuestion extends TopicQuizQuestion {
  topicId: string;
  kind: DiagnosticKind;
}

/** Равномерно разпределени теми от програмата — от началото до края на годината */
export function selectDiagnosticTopics(topics: TopicInProgram[], n = DIAGNOSTIC_SIZE): TopicInProgram[] {
  if (topics.length <= n) return topics;
  const out: TopicInProgram[] = [];
  for (let i = 0; i < n; i++) out.push(topics[Math.floor(((i + 0.5) * topics.length) / n)]);
  return out;
}

export function buildDiagnosticPrompt(program: MonProgram, topics: { topic: TopicInProgram; details: MonTopicDetails }[]): string {
  const subject = MON_SUBJECTS[program.subject].name;
  const grade = typeof program.stage === 'number' ? `${program.stage}. клас` : program.stage === 'pp' ? '11.–12. клас, профилирана подготовка' : program.title;
  return [
    `Съставяш входен тест по „${subject}“ (${grade}) по учебната програма на МОН. Тестът показва какво ученикът знае и може по цялата програма.`,
    '',
    'Темите (по един въпрос на тема, в този ред):',
    ...topics.map(({ topic, details }, i) => {
      const outcomes = details.outcomes.slice(0, 3).map((o) => `   • ${o}`);
      return [`T${i + 1}. ${topic.title}${topic.section ? ` (${topic.section})` : ''}`, ...outcomes].join('\n');
    }),
    '',
    'Изисквания:',
    `- ТОЧНО ${topics.length} въпроса — по един за всяка тема; "topic" е нейният код (T1, T2…).`,
    '- Около половината проверяват знание ("kind": "knows" — понятие, правило, факт), другата половина — умение да се приложи ("kind": "can" — задача, пример, анализ).',
    '- Средна трудност по програмата за класа; без въпроси извън темата.',
    '- "solution": ПЪРВО реши кратко, после състави 4-те отговора; верният съвпада точно с решението. Формулите — в LaTeX между $...$.',
    '- 4 отговора, точно един верен, грешните са правдоподобни. "correctIndex" е номерът (0–3) на верния.',
    '- Ако не си сигурен във факт, не питай за него. Всичко на български (при чужд език — въпросите на езика, решенията на български).',
  ].join('\n');
}

/** Проверява въпросите и ги връзва с темите; въпрос без валидна тема отпада */
export function validateDiagnostic(raw: unknown[], topics: TopicInProgram[], idPrefix: string): DiagnosticQuestion[] {
  const base = validateQuestions(
    raw.map((r) => (r && typeof r === 'object' ? { difficulty: 'medium', ...(r as object) } : r)),
    idPrefix,
  );
  const byQuestion = new Map(raw.map((r) => [(r as { question?: string })?.question?.replace(/\s+/g, ' ').trim(), r as Record<string, unknown>]));
  const used = new Set<string>();
  const out: DiagnosticQuestion[] = [];
  for (const q of base) {
    const r = byQuestion.get(q.question);
    const code = typeof r?.topic === 'string' ? r.topic.trim().toUpperCase() : '';
    const index = /^T\d+$/.test(code) ? Number(code.slice(1)) - 1 : -1;
    const topic = topics[index];
    if (!topic || used.has(topic.id)) continue;
    used.add(topic.id);
    out.push({ ...q, topicId: topic.id, kind: r?.kind === 'can' ? 'can' : 'knows' });
  }
  return out;
}

export const shuffleDiagnostic = (questions: DiagnosticQuestion[], random?: () => number): DiagnosticQuestion[] =>
  shuffleOptions(questions, random) as DiagnosticQuestion[];

// --- Запазване: тестът по всеки предмет може да се спре и да продължи

export interface DiagnosticRun {
  programId: string;
  questions: DiagnosticQuestion[];
  answers: (number | null)[];
  startedAt: string;
  finishedAt?: string;
}

export const DIAGNOSTIC_KEY = 'studybg.diagnostic.v1';

export function loadDiagnosticRuns(): Record<string, DiagnosticRun> {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(DIAGNOSTIC_KEY) ?? '{}');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    const out: Record<string, DiagnosticRun> = {};
    for (const [id, run] of Object.entries(raw as Record<string, DiagnosticRun>)) {
      if (run && Array.isArray(run.questions) && Array.isArray(run.answers) && run.questions.length === run.answers.length && run.questions.length > 0) out[id] = run;
    }
    return out;
  } catch {
    return {};
  }
}

export function saveDiagnosticRun(run: DiagnosticRun): void {
  const all = loadDiagnosticRuns();
  all[run.programId] = run;
  try {
    localStorage.setItem(DIAGNOSTIC_KEY, JSON.stringify(all));
  } catch {
    // без хранилище тестът не може да продължи след презареждане, но върви
  }
}

export function clearDiagnosticRun(programId: string): void {
  const all = loadDiagnosticRuns();
  delete all[programId];
  try {
    localStorage.setItem(DIAGNOSTIC_KEY, JSON.stringify(all));
  } catch {
    // нищо
  }
}

export interface DiagnosticScore {
  correct: number;
  total: number;
  knows: { correct: number; total: number };
  can: { correct: number; total: number };
}

export function scoreDiagnostic(run: DiagnosticRun): DiagnosticScore {
  const score: DiagnosticScore = { correct: 0, total: 0, knows: { correct: 0, total: 0 }, can: { correct: 0, total: 0 } };
  run.questions.forEach((q, i) => {
    const ok = run.answers[i] === q.correctIndex;
    score.total++;
    score[q.kind].total++;
    if (ok) {
      score.correct++;
      score[q.kind].correct++;
    }
  });
  return score;
}
