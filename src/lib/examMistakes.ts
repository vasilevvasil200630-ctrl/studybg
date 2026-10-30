import {
  getPartAnswer,
  isPartCorrect,
  isShortAnswerCorrect,
  partKey,
  type ExamPaper,
  type PaperAnswers,
  type PaperQuestion,
  type PartValue,
  type QuestionPart,
} from './examPaperScoring';

/**
 * Кои задачи от предаден вариант отиват в Банката с грешки. Броят се само задачите с проверка по
 * ключа (избираем отговор, кратък отговор, подточки без самооценка) и само ако ученикът е отговорил:
 * пропусната задача не е грешка, а задачите със самооценка оценява самият ученик.
 */

export interface ExamMistake {
  question: PaperQuestion;
  /** Отговорът на ученика, както да се покаже в Банката */
  userAnswer: string;
  /** Верният отговор по ключа */
  correctAnswer: string;
}

export interface AnswerReview {
  mistakes: ExamMistake[];
  /** Задачите, решени изцяло вярно — в Банката се отбелязват като усвоени */
  correctIds: string[];
}

const hasValue = (v: PartValue): boolean =>
  typeof v === 'boolean' || (typeof v === 'number' && Number.isFinite(v)) || (typeof v === 'string' && v.trim() !== '') || (Array.isArray(v) && v.length > 0);

const NO_ANSWER = '—';

function partValueText(part: QuestionPart, value: PartValue): string {
  const a = getPartAnswer(part);
  if (!hasValue(value)) return NO_ANSWER;
  if (a.type === 'pick') return (value as number[]).map((i) => a.options[i] ?? '?').join(', ');
  if (a.type === 'truefalse') return value ? 'вярно' : 'невярно';
  return String(value).trim();
}

function partKeyText(part: QuestionPart): string {
  const a = getPartAnswer(part);
  switch (a.type) {
    case 'pick':
      return a.correctIndices.map((i) => a.options[i]).join(', ');
    case 'truefalse':
      return a.correct ? 'вярно' : 'невярно';
    case 'number':
      return a.unit ? `${a.acceptedAnswers[0]} ${a.unit}` : a.acceptedAnswers[0];
    case 'text':
      return a.acceptedAnswers[0];
    case 'self':
      return '';
  }
}

export function reviewAnswers(paper: ExamPaper, answers: PaperAnswers): AnswerReview {
  const mistakes: ExamMistake[] = [];
  const correctIds: string[] = [];
  for (const q of paper.sections.flatMap((s) => s.questions)) {
    if (q.kind === 'choice') {
      const v = answers[q.id];
      if (typeof v !== 'number') continue;
      if (v === q.correctIndex) correctIds.push(q.id);
      else mistakes.push({ question: q, userAnswer: q.options[v] ?? NO_ANSWER, correctAnswer: q.options[q.correctIndex] });
    } else if (q.kind === 'short') {
      const v = answers[q.id];
      if (typeof v !== 'string' || v.trim() === '') continue;
      if (isShortAnswerCorrect(q, v)) correctIds.push(q.id);
      else mistakes.push({ question: q, userAnswer: v.trim(), correctAnswer: q.acceptedAnswers[0] });
    } else if (q.kind === 'multi') {
      const auto = q.parts.filter((p) => getPartAnswer(p).type !== 'self');
      if (auto.length === 0 || !auto.some((p) => hasValue(answers[partKey(q, p)]))) continue;
      const wrong = auto.filter((p) => !isPartCorrect(p, answers[partKey(q, p)]));
      if (wrong.length === 0) {
        correctIds.push(q.id);
        continue;
      }
      // Само сгрешените подточки — така в Банката се вижда точно кое е грешно
      // „А) „Потомка“: 3. Елисавета Багряна“; без кратко условие — „Б) разкрива“
      const line = (p: QuestionPart, text: string) => (p.prompt && p.prompt.length <= 40 ? `${p.label} ${p.prompt}: ${text}` : `${p.label} ${text}`);
      mistakes.push({
        question: q,
        userAnswer: wrong.map((p) => line(p, partValueText(p, answers[partKey(q, p)]))).join('; '),
        correctAnswer: wrong.map((p) => line(p, partKeyText(p))).join('; '),
      });
    }
  }
  return { mistakes, correctIds };
}
