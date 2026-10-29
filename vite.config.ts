import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Без 'GEMINI_': всяка такава променлива би се вградила публично в бъндъла
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  build: {
    target: 'es2022',
    cssMinify: true,
    modulePreload: {
      polyfill: false,
    },
    chunkSizeWarningLimit: 560,
    rollupOptions: {
      output: {
        manualChunks(rawId: string) {
          const id = rawId.replace(/\\/g, '/');
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/@supabase/')) {
            return 'vendor-supabase';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
          if (id.includes('curriculumExpansionLessonsPart3')) {
            return 'data-curriculum-exp3';
          }
          if (id.includes('curriculumExpansionLessonsPart2')) {
            return 'data-curriculum-exp2';
          }
          if (id.includes('curriculumExpansionLessonsPart1B')) {
            return 'data-curriculum-exp1b';
          }
          if (id.includes('curriculumExpansionLessons')) {
            return 'data-curriculum-exp1a';
          }
          if (id.includes('curriculumCorePack')) {
            return 'data-curriculum-core-pack';
          }
          if (id.includes('curriculumDatabase')) {
            return 'data-curriculum-seed';
          }
          if (id.includes('schoolsSpecialtiesDatabase')) {
            return 'data-schools-specialties';
          }
          if (id.includes('bulgarianCurriculumTree')) {
            return 'data-curriculum-tree';
          }
          if (id.includes('src/data/monFormulaSheets') || id.includes('src/data/formulaSheets/dzi')) {
            return 'data-formula-sheets';
          }
          if (id.includes('cultureExpansionData')) {
            return 'data-culture-expansion';
          }
          if (id.includes('generalKnowledgeData')) {
            return 'data-culture-core';
          }
          if (id.includes('src/data/historicalCasesData')) {
            return 'data-cases';
          }
          if (id.includes('src/data/literatureDatabase')) {
            return 'data-literature';
          }
          if (id.includes('src/data/grammarDatabase')) {
            return 'data-grammar';
          }
          if (id.includes('src/data/moduleTwoBelDatabase')) {
            return 'data-bel-mod2';
          }
          if (id.includes('src/data/mathStemDatabase')) {
            return 'data-math-stem';
          }
          if (id.includes('src/data/historyGeoDatabase')) {
            return 'data-history-geo';
          }
          if (id.includes('src/data/englishDziDatabase')) {
            return 'data-english-dzi';
          }
          if (id.includes('src/data/civicsEuDatabase')) {
            return 'data-civics-eu';
          }
          if (id.includes('src/data/examModulesData')) {
            return 'data-exam-modules';
          }
          // Изпитните варианти: отделно математика, БЕЛ, профилирани и чертежите — свалят се паралелно и се кешират поотделно
          if (id.includes('src/components/exam-engine/figures')) {
            return 'exam-figures';
          }
          if (id.includes('src/data/officialPapers/') && /Bel20\d\d/.test(id)) {
            return 'data-exam-bel';
          }
          if (id.includes('src/data/officialPapers/') || id.includes('src/data/integratedSamples/') || id.includes('src/data/nvo10Integrated2027/')) {
            return 'data-exam-math';
          }
          if (id.includes('src/data/dziProfilePapers/')) {
            return 'data-exam-profile';
          }
          if (id.includes('src/data/dippkPapers/')) {
            return 'data-exam-dippk';
          }
          if (id.includes('src/data/monLessons/pp') || id.includes('src/data/monLessons/groupPp')) {
            if (/pp(Math|Informatika|It|Fa|Bio|Himia)|groupPpStem/.test(id)) {
              return 'mon-lessons-pp-stem';
            }
            return 'mon-lessons-pp-hum';
          }
          if (id.includes('src/data/monLessons/')) {
            if (/\/(en|de)[A-Z]|groupLang/.test(id)) {
              return 'mon-lessons-lang';
            }
            if (/\/(math|phys|chem|bio|inf|it|tp)\d|groupOopStem/.test(id)) {
              return 'mon-lessons-oop-stem';
            }
            return 'mon-lessons-oop-hum';
          }
        }
      }
    }
  }
})
