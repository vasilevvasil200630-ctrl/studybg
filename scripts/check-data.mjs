#!/usr/bin/env node
// Валидира всички уроци (ID-та, correctIndex, непразни масиви, предмети, кирилица).
// Зарежда TypeScript данните през Vite (SSR), за да важат същите alias-и и import.meta.env.
import { createServer } from 'vite';
import { validateLessons } from './lib/validateLessons.mjs';

const server = await createServer({
  configFile: false,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false }
});

let exitCode = 0;
try {
  const { loadFullCurriculumLessons } = await server.ssrLoadModule('/src/data/curriculumDatabase.ts');
  const { LESSON_SUBJECTS } = await server.ssrLoadModule('/src/types/index.ts');
  const lessons = await loadFullCurriculumLessons();
  const errors = validateLessons(lessons, { subjects: LESSON_SUBJECTS });

  if (errors.length > 0) {
    console.error(`✗ check:data — ${errors.length} проблема в ${lessons.length} урока:`);
    errors.forEach((e) => console.error(`  - ${e}`));
    exitCode = 1;
  } else {
    const questions = lessons.reduce((sum, l) => sum + l.quiz.length, 0);
    console.log(`✓ check:data — ${lessons.length} урока, ${questions} въпроса, 0 проблема`);
  }
} catch (err) {
  console.error('✗ check:data — неуспешно зареждане на данните:', err);
  exitCode = 1;
} finally {
  await server.close();
}

process.exit(exitCode);
