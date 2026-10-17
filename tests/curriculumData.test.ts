import { describe, expect, it } from 'vitest';
import { loadFullCurriculumLessons } from '../src/data/curriculumDatabase';
import { LESSON_GRADES, LESSON_SUBJECTS } from '../src/types';
import { validateLessons } from '../scripts/lib/validateLessons.mjs';

describe('данни за уроците', () => {
  it('всички уроци минават валидацията и имат балансирани верни отговори', async () => {
    const lessons = await loadFullCurriculumLessons();
    expect(lessons.length).toBeGreaterThanOrEqual(108);
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
