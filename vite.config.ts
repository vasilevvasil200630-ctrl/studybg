import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  build: {
    target: 'es2022',
    cssMinify: true,
    chunkSizeWarningLimit: 500,
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
          if (id.includes('curriculumExpansionLessons')) {
            return 'data-curriculum-exp1';
          }
          if (id.includes('curriculumDatabase')) {
            return 'data-curriculum-core';
          }
          if (id.includes('schoolsSpecialtiesDatabase')) {
            return 'data-schools-specialties';
          }
          if (id.includes('bulgarianCurriculumTree')) {
            return 'data-curriculum-tree';
          }
          if (id.includes('src/data/generalKnowledgeData') || id.includes('src/data/cultureExpansionData')) {
            return 'data-culture';
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
        }
      }
    }
  }
})
