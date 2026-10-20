import { describe, it, expect } from 'vitest';
import { loadFullCurriculumLessons, TOTAL_CURRICULUM_LESSONS_COUNT } from '../../data/curriculumDatabase';
import { BULGARIAN_CURRICULUM_TREE } from '../../data/bulgarianCurriculumTree';
import { SUBDOMAIN_LESSON_MAP } from '../curriculumClassifier';
import {
  SCHOOL_SPECIALTIES_SECTIONS,
  GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX
} from '../../data/schoolsSpecialtiesDatabase';
import {
  generateInfiniteLessonQuiz,
  buildTailoredSubDomainLesson,
  buildTailoredSpecialtyLesson,
  buildTailoredMatrixSubjectLesson
} from '../infiniteQuizGenerator';

describe('MON Curriculum Coverage & Infinite Quiz Generator', () => {
  it('verifies all 108 core lessons, 56 MON tree subDomains, 58 school specialties, and 51 grade matrix subjects resolve to valid lessons', async () => {
    const lessons = await loadFullCurriculumLessons();
    expect(lessons.length).toBe(TOTAL_CURRICULUM_LESSONS_COUNT);
    const idSet = new Set(lessons.map((l) => l.id));

    // 1. All 56 SubDomains in BULGARIAN_CURRICULUM_TREE
    let subDomainCount = 0;
    for (const tree of BULGARIAN_CURRICULUM_TREE) {
      for (const g of tree.grades) {
        for (const d of g.domains) {
          for (const sub of d.subDomains) {
            subDomainCount += 1;
            const mappedId = SUBDOMAIN_LESSON_MAP[sub.id];
            expect(mappedId, `SubDomain ${sub.id} should be mapped`).toBeTruthy();
            expect(idSet.has(mappedId), `SubDomain ${sub.id} -> ${mappedId} must exist`).toBe(true);
          }
        }
      }
    }
    expect(subDomainCount).toBe(56);

    // 2. All 58 specialties in SCHOOL_SPECIALTIES_SECTIONS
    for (const sec of SCHOOL_SPECIALTIES_SECTIONS) {
      for (const lid of sec.linkedLessonIds) {
        expect(idSet.has(lid), `Section ${sec.id} linkedLessonId ${lid} must exist`).toBe(true);
      }
      for (const spec of sec.specialties) {
        expect(idSet.has(spec.linkedLessonId), `Specialty ${spec.code} -> ${spec.linkedLessonId} must exist`).toBe(true);
      }
    }

    // 3. All 51 subject entries in GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX
    for (const gm of GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX) {
      for (const subj of gm.subjects) {
        expect(idSet.has(subj.linkedLessonId), `Matrix ${gm.grade} ${subj.subjectName} -> ${subj.linkedLessonId} must exist`).toBe(true);
      }
    }
  });

  it('generates infinite non-repeating material-aligned quiz variants and tailored MON lessons', async () => {
    const lessons = await loadFullCurriculumLessons();
    const mathLesson = lessons.find((l) => l.id === 'math-quadratic-vieta-progressions') ?? lessons[0];

    const v1 = generateInfiniteLessonQuiz(mathLesson, lessons, 1, 10);
    const v2 = generateInfiniteLessonQuiz(mathLesson, lessons, 2, 10);
    const v3 = generateInfiniteLessonQuiz(mathLesson, lessons, 3, 10);

    expect(v1.length).toBe(10);
    expect(v2.length).toBe(10);
    expect(v3.length).toBe(10);

    // Verify parameterized questions differ across variants
    expect(v1.map((q) => q.question).join('||')).not.toBe(v2.map((q) => q.question).join('||'));
    expect(v2.map((q) => q.question).join('||')).not.toBe(v3.map((q) => q.question).join('||'));

    // Verify each question has 4 options and valid correctIndex
    for (const q of [...v1, ...v2, ...v3]) {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation.length).toBeGreaterThan(10);
    }

    // Verify tailored builders produce full MON study material + 10-question quiz
    const tree = BULGARIAN_CURRICULUM_TREE[0];
    const gradeObj = tree.grades[0];
    const domObj = gradeObj.domains[0];
    const subObj = domObj.subDomains[0];
    const tailoredSub = buildTailoredSubDomainLesson(tree.subject, gradeObj.grade, domObj.name, subObj, lessons[0], lessons);
    expect(tailoredSub.summary.keyPoints.length).toBeGreaterThan(2);
    expect((tailoredSub.notebookChecklist || []).length).toBeGreaterThan(2);
    expect(tailoredSub.quiz.length).toBe(10);

    const sec = SCHOOL_SPECIALTIES_SECTIONS[0];
    const spec = sec.specialties[0];
    const tailoredSpec = buildTailoredSpecialtyLesson(sec, spec, mathLesson, lessons);
    expect(tailoredSpec.title).toContain(spec.code);
    expect(tailoredSpec.quiz.length).toBe(10);

    const gm = GRADE_8_TO_12_COMPLETE_SUBJECT_MATRIX[0];
    const matrixSubj = gm.subjects[0];
    const tailoredMatrix = buildTailoredMatrixSubjectLesson(gm, matrixSubj, mathLesson, lessons);
    expect(tailoredMatrix.title).toContain(gm.grade);
    expect(tailoredMatrix.quiz.length).toBe(10);
  });
});
