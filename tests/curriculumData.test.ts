import { describe, expect, it } from 'vitest';
import { loadFullCurriculumLessons } from '../src/data/curriculumDatabase';
import { LESSON_SUBJECTS } from '../src/types';
import { validateLessons } from '../scripts/lib/validateLessons.mjs';

describe('данни за уроците', () => {
  it('всички уроци минават валидацията', async () => {
    const lessons = await loadFullCurriculumLessons();
    expect(lessons.length).toBeGreaterThanOrEqual(108);
    expect(validateLessons(lessons, { subjects: LESSON_SUBJECTS })).toEqual([]);
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
    const errors = validateLessons([{ ...base, grade: '12. клас (ДЗИ / Маatura)' }], { subjects: LESSON_SUBJECTS });
    expect(errors.join('\n')).toMatch(/смесени латински и кирилски/);
  });

  it('непознат предмет, дублирано id и невалиден correctIndex', () => {
    const errors = validateLessons(
      [base, { ...base, subject: 'Философия и Гражданско образование', quiz: [{ ...base.quiz[0], correctIndex: 5 }] }],
      { subjects: LESSON_SUBJECTS }
    );
    const text = errors.join('\n');
    expect(text).toMatch(/дублирано id/);
    expect(text).toMatch(/непознат предмет/);
    expect(text).toMatch(/невалиден correctIndex 5/);
  });
});
