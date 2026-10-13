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
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/@supabase/')) {
            return 'vendor-supabase';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
          if (id.includes('src/data/curriculumDatabase')) {
            return 'data-curriculum';
          }
          if (id.includes('src/data/bulgarianCurriculumTree')) {
            return 'data-curriculum-tree';
          }
          if (id.includes('src/data/generalKnowledgeData')) {
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
