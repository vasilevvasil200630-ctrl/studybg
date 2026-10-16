import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { pwaService } from './services/pwaService'

// Остарял chunk след нов деплой: презареждаме веднъж (не повече от веднъж на 10 s)
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  const key = 'studybg_chunk_reload_at';
  try {
    const last = Number(sessionStorage.getItem(key) || 0);
    if (Date.now() - last < 10_000) return;
    sessionStorage.setItem(key, String(Date.now()));
  } catch {
    // sessionStorage недостъпен — презареждаме без защита от цикъл
  }
  window.location.reload();
});

// Register high-performance offline Service Worker
pwaService.register();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
