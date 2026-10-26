#!/usr/bin/env node
// Генерира public/sitemap.xml с чисти адреси (без #): основните изгледи, разделите
// за обща култура и /lesson/<id> за всеки урок. Пуска се с `npm run sitemap`.
import { writeFileSync } from 'node:fs';
import { createServer } from 'vite';

// Изгледи, които имат смисъл без контекст на конкретен урок или личен прогрес
const STUDY_PATHS = [
  ['simulator', 0.9],
  ['catalog', 0.9],
  ['cases', 0.8],
  ['moduletwo', 0.8],
  ['literature', 0.8],
  ['grammar', 0.8],
  ['mathlab', 0.8],
  ['english', 0.7],
  ['sciencelab', 0.7],
  ['atlas', 0.7],
  ['civics', 0.7],
  ['oralexam', 0.7],
  ['calculator', 0.7],
  ['specialties', 0.7],
  ['generator', 0.6],
  ['planner', 0.6],
  ['program', 0.7],
  ['blitz', 0.6]
];
// 'cases' в културния портал е същият изглед като /cases — не го дублираме
const CULTURE_SUBTABS = ['mysticmap', 'heritage', 'wonders', 'trivia', 'myths', 'timeline', 'wisdom'];

const server = await createServer({
  configFile: false,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false }
});

try {
  const { SITE_ORIGIN, routeToPath } = await server.ssrLoadModule('/src/lib/routing.ts');
  const { loadFullCurriculumLessons } = await server.ssrLoadModule('/src/data/curriculumDatabase.ts');
  const lessons = await loadFullCurriculumLessons();
  const today = new Date().toISOString().slice(0, 10);

  const entries = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    ...STUDY_PATHS.map(([tab, priority]) => ({ path: routeToPath({ portal: 'study', tab }), priority, changefreq: 'weekly' })),
    { path: routeToPath({ portal: 'culture', subTab: 'mysteries' }), priority: 0.6, changefreq: 'monthly' },
    ...CULTURE_SUBTABS.map((subTab) => ({ path: routeToPath({ portal: 'culture', subTab }), priority: 0.5, changefreq: 'monthly' })),
    ...lessons.map((lesson) => ({
      path: routeToPath({ portal: 'study', tab: 'summary', lessonId: lesson.id }),
      priority: 0.6,
      changefreq: 'monthly'
    }))
  ];

  const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(
      (e) =>
        `  <url>\n    <loc>${escapeXml(SITE_ORIGIN + e.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`
    ),
    '</urlset>',
    ''
  ].join('\n');

  if (xml.includes('/#')) throw new Error('В sitemap има hash адрес');
  writeFileSync('public/sitemap.xml', xml);
  console.log(`✓ sitemap.xml — ${entries.length} адреса (${lessons.length} урока)`);
} finally {
  await server.close();
}
