import { describe, expect, it } from 'vitest';
import { loadFullCurriculumLessons, TOTAL_CURRICULUM_LESSONS_COUNT } from '../src/data/curriculumDatabase';
import { BULGARIAN_CURRICULUM_TREE } from '../src/data/bulgarianCurriculumTree';
import { classifyAndDiagnoseNotebook } from '../src/services/curriculumClassifier';
import { generateLessonFromInput } from '../src/services/aiGenerator';
import {
  shuffleQuestionOptions,
  buildTopicVariantQuiz,
  buildDualGroupWorksheet,
  formatWorksheetAsText
} from '../src/components/QuizView';
import { LESSON_GRADES, LESSON_SUBJECTS } from '../src/types';
import { validateLessons } from '../scripts/lib/validateLessons.mjs';

describe('данни за уроците', () => {
  it('всички уроци минават валидацията и имат балансирани верни отговори', async () => {
    const lessons = await loadFullCurriculumLessons();
    expect(lessons.length).toBe(TOTAL_CURRICULUM_LESSONS_COUNT);
    expect(validateLessons(lessons, { subjects: LESSON_SUBJECTS, grades: LESSON_GRADES })).toEqual([]);

    const dist = [0, 0, 0, 0];
    for (const lesson of lessons) {
      expect(lesson.notebookChecklist?.length).toBeGreaterThan(0);
      for (const q of lesson.quiz) {
        if (q.options.length === 4) {
          dist[q.correctIndex]++;
        }
      }
    }
    const total4 = dist.reduce((a, b) => a + b, 0);
    for (const count of dist) {
      expect(count / total4).toBeGreaterThan(0.18);
      expect(count / total4).toBeLessThan(0.32);
    }
  });

  it('всяка от 56-те теми в дървото на МОН има точен урок (lessonIsApproximate = false) и реален тест', async () => {
    await loadFullCurriculumLessons();
    let count = 0;
    for (const subject of BULGARIAN_CURRICULUM_TREE) {
      for (const grade of subject.grades) {
        for (const domain of grade.domains) {
          for (const sub of domain.subDomains) {
            count++;
            const text = `${sub.name}\n${sub.keywords.join(', ')}`;
            const diag = classifyAndDiagnoseNotebook(text, sub.name);
            expect(diag.subDomainName).toBe(sub.name);
            expect(diag.lessonIsApproximate).toBe(false);
            expect(diag.lessonData.quiz.length).toBeGreaterThanOrEqual(6);
          }
        }
      }
    }
    expect(count).toBe(56);
  });

  it('generateLessonFromInput винаги връща проверен тест с реални предметни въпроси', async () => {
    await loadFullCurriculumLessons();
    const generated = generateLessonFromInput(
      'Древногръцки мит за Прометей',
      'Прометей открадва огъня от Зевс и Хефест и го дарява на хората, за да им даде разум и занаяти.',
      'Български език и литература',
      '5. клас'
    );
    expect(generated.quiz.length).toBeGreaterThanOrEqual(6);
    for (const q of generated.quiz) {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
  });

  it('shuffleQuestionOptions, buildTopicVariantQuiz и buildDualGroupWorksheet пазят верния отговор и генерират Група А/Б с ключ', async () => {
    const lessons = await loadFullCurriculumLessons();
    const sample = lessons[0];
    for (const q of sample.quiz) {
      const expectedCorrectText = q.options[q.correctIndex];
      const shuffled = shuffleQuestionOptions(q);
      expect(shuffled.options[shuffled.correctIndex]).toBe(expectedCorrectText);
    }
    const variant = buildTopicVariantQuiz(sample, lessons, 10);
    expect(variant.length).toBe(10);
    const uniqueStems = new Set(variant.map((q) => q.question));
    expect(uniqueStems.size).toBe(10);

    const ws = buildDualGroupWorksheet(sample.quiz, sample.title, sample.subject, sample.grade);
    expect(ws.groupA.length).toBe(sample.quiz.length);
    expect(ws.groupB.length).toBe(sample.quiz.length);
    expect(ws.groupA[0].question).not.toBe(ws.groupB[0].question);

    const textWithKey = formatWorksheetAsText(ws, true);
    expect(textWithKey).toContain('ГРУПА А');
    expect(textWithKey).toContain('ГРУПА Б');
    expect(textWithKey).toContain('КЛЮЧ С ВЕРНИ ОТГОВОРИ');

    const textNoKey = formatWorksheetAsText(ws, false);
    expect(textNoKey).not.toContain('КЛЮЧ С ВЕРНИ ОТГОВОРИ');
  });
});

describe('validateLessons хваща типичните грешки', () => {
  const base = {
    id: 'l1',
    title: 'Урок',
    subject: 'Математика',
    grade: '12. клас (ДЗИ / Матура)',
    summary: { overview: 'o', keyPoints: ['k'] },
    flashcards: [{ front: 'f', back: 'b' }],
    quiz: [{ id: 1, question: 'q', options: ['a', 'b'], correctIndex: 1 }]
  };

  it('латинска буква в кирилски клас („Маatura“)', () => {
    const errors = validateLessons([{ ...base, grade: '12. клас (ДЗИ / Маatura)' }], { subjects: LESSON_SUBJECTS, grades: LESSON_GRADES });
    expect(errors.join('\n')).toMatch(/смесени латински и кирилски/);
  });

  it('непознат предмет, дублирано id и невалиден correctIndex', () => {
    const errors = validateLessons(
      [base, { ...base, subject: 'Философия и Гражданско образование', quiz: [{ ...base.quiz[0], correctIndex: 5 }] }],
      { subjects: LESSON_SUBJECTS, grades: LESSON_GRADES }
    );
    const text = errors.join('\n');
    expect(text).toMatch(/дублирано id/);
    expect(text).toMatch(/непознат предмет/);
    expect(text).toMatch(/невалиден correctIndex 5/);
  });

  it('дублирани опции и шаблонни дистрактори в куиз въпросите', () => {
    const errors = validateLessons(
      [
        {
          ...base,
          quiz: [
            { id: 1, question: 'q1', options: ['еднакъв', 'еднакъв'], correctIndex: 0 },
            {
              id: 2,
              question: 'q2',
              options: ['Твърдението е невалидно и противоречи на основните принципи по Математика', 'вярно'],
              correctIndex: 1
            }
          ]
        }
      ],
      { subjects: LESSON_SUBJECTS, grades: LESSON_GRADES }
    );
    const text = errors.join('\n');
    expect(text).toMatch(/дублирани опции/);
    expect(text).toMatch(/шаблонен дистрактор/);
  });
});

describe('LessonGrade', () => {
  it('validateLessons отхвърля нестандартен клас', () => {
    const lesson = {
      id: 'g1',
      title: 'Урок',
      subject: 'Математика',
      grade: '9. - 10. клас',
      summary: { overview: 'o', keyPoints: ['k'] },
      flashcards: [{ front: 'f', back: 'b' }],
      quiz: [{ id: 1, question: 'q', options: ['a', 'b'], correctIndex: 0 }]
    };
    const errors = validateLessons([lesson], { subjects: LESSON_SUBJECTS, grades: LESSON_GRADES });
    expect(errors.join('\n')).toMatch(/непознат клас/);
  });

  it('toLessonGrade нормализира класове от учебната програма', async () => {
    const { toLessonGrade } = await import('../src/types');
    expect(toLessonGrade('10. клас')).toBe('10. клас (НВО)');
    expect(toLessonGrade('12. клас (ДЗИ / Матура)')).toBe('12. клас (ДЗИ / Матура)');
    expect(toLessonGrade('Учебен материал')).toBe('8.–12. клас');
  });
});
