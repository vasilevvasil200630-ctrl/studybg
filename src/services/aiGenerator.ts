import { toLessonGrade, type LessonData, type LessonSubject, type Flashcard, type QuizQuestion } from '../types';
import { getCachedOrCoreLessons } from '../data/curriculumDatabase';

/**
 * Създава урок от потребителски записки, като комбинира конспекта от записките
 * с проверени тестови въпроси от най-близките уроци по същия предмет и клас в базата на МОН.
 * Никога не генерира шаблонни псевдо-въпроси и никога не връща празен тест.
 */
export function generateLessonFromInput(
  titleOrFileName: string,
  rawText: string,
  subjectHint: LessonSubject,
  gradeHint = ''
): LessonData {
  const cleanTitle = titleOrFileName
    .replace(/\.(jpg|jpeg|png|heic|pdf|txt)$/i, '')
    .replace(/[-_]/g, ' ')
    .trim() || 'Записки от тетрадка';

  const pool = getCachedOrCoreLessons();
  const subjectLessons = pool.filter((l) => l.subject === subjectHint);
  const candidateLessons = subjectLessons.length > 0 ? subjectLessons : pool;

  const queryWords = `${cleanTitle} ${rawText}`
    .toLowerCase()
    .split(/[\s,.;:!?()[\]"'„“–—/-]+/)
    .filter((w) => w.length >= 4);

  const gradeNum = (g: string) => Number((g.match(/(\d+)/) || [])[1] || 0);
  const targetGrade = gradeNum(gradeHint);

  const rankedLessons = [...candidateLessons]
    .map((l) => {
      const hay = `${l.title} ${l.summary.overview} ${l.summary.keyPoints.join(' ')}`.toLowerCase();
      let score = 0;
      for (const w of queryWords) {
        if (hay.includes(w)) score += 3;
      }
      if (targetGrade && gradeNum(l.grade)) {
        score -= Math.abs(gradeNum(l.grade) - targetGrade);
      }
      return { lesson: l, score };
    })
    .sort((a, b) => b.score - a.score);

  const primaryLesson = rankedLessons[0]?.lesson || pool[0];

  const selectedQuiz: QuizQuestion[] = [];
  const seenQuestions = new Set<string>();
  for (const { lesson } of rankedLessons) {
    for (const q of lesson.quiz) {
      const key = q.question.trim().toLowerCase();
      if (!seenQuestions.has(key)) {
        seenQuestions.add(key);
        selectedQuiz.push({
          ...q,
          id: selectedQuiz.length + 1
        });
      }
      if (selectedQuiz.length >= 6) break;
    }
    if (selectedQuiz.length >= 6) break;
  }

  const lines = rawText.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  const keyPoints =
    lines.length >= 2
      ? lines.slice(0, 6).map((line) => (line.length > 160 ? `${line.slice(0, 160)}…` : line))
      : [...(primaryLesson?.summary.keyPoints || [])];

  const flashcards: Flashcard[] =
    lines.length >= 3
      ? lines.slice(0, 6).map((line, idx) => ({
          id: `fc-notes-${idx + 1}`,
          front: `Ключов акцент ${idx + 1} по „${cleanTitle}“`,
          back: line,
          hint: primaryLesson?.summary.examGoldenRule || 'Сравни със записките от урока.',
          tag: subjectHint
        }))
      : [...(primaryLesson?.flashcards || [])];

  return {
    id: `custom-lesson-${Date.now()}`,
    title: cleanTitle,
    subject: subjectHint,
    grade: toLessonGrade(gradeHint || primaryLesson?.grade || '10. клас (НВО)'),
    sourceType: 'notebook',
    originalNoteExcerpt: rawText.slice(0, 300) || primaryLesson?.originalNoteExcerpt || cleanTitle,
    summary: {
      overview:
        rawText.length > 60
          ? `Систематизиран конспект по „${cleanTitle}“: ${rawText.slice(0, 220)}…`
          : primaryLesson?.summary.overview || `Учебен синтез по ${subjectHint} (${cleanTitle}).`,
      keyPoints,
      examGoldenRule:
        primaryLesson?.summary.examGoldenRule ||
        'При решаване на теста проверявай внимателно условията и ключовите термини от програмата на МОН.',
      commonTraps: primaryLesson?.summary.commonTraps || [],
      formulasOrDates: primaryLesson?.summary.formulasOrDates || []
    },
    flashcards,
    quiz: selectedQuiz,
    notebookChecklist:
      primaryLesson?.notebookChecklist ||
      keyPoints.slice(0, 4).map((kp, idx) => ({
        id: `nb-gen-${idx + 1}`,
        requirement: kp,
        whyNeeded: 'Ключов елемент от учебното съдържание по темата.',
        suggestedNotes: kp,
        isEssentialForSix: idx < 3
      })),
    quickQuestions: [
      `Обясни ми „${cleanTitle}“ ясно и структурирано`,
      'Дай ми конкретна изпитна задача по темата'
    ]
  };
}
