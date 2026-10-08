import React, { useState, useEffect } from 'react';
import { ArrowUp, BookOpen, Compass, Search } from 'lucide-react';

interface WayfindingDockProps {
  portalMode: 'study' | 'culture';
  onTogglePortalMode: () => void;
  onOpenQuickLessonPicker: () => void;
}

export const WayfindingDock: React.FC<WayfindingDockProps> = ({
  portalMode,
  onTogglePortalMode,
  onOpenQuickLessonPicker
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Бърза навигация"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto select-none"
    >
      {/* Wayfinding Floating Action Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl">
        
        {/* Quick Lesson Switcher (Active in study mode) */}
        {portalMode === 'study' && (
          <button
            onClick={onOpenQuickLessonPicker}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200 transition-all shadow-2xs"
            title="Отвори бързо търсене и смяна на урок"
          >
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Смени урок</span>
          </button>
        )}

        {/* Portal Mode Quick Switcher */}
        <button
          onClick={onTogglePortalMode}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
            portalMode === 'study'
              ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
              : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200'
          }`}
          title={
            portalMode === 'study'
              ? 'Премини към раздел „Обща култура & Загадки“'
              : 'Премини към раздел „Учебна академия & Снимане“'
          }
        >
          {portalMode === 'study' ? (
            <>
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Към Загадките</span>
            </>
          ) : (
            <>
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Към Ученето</span>
            </>
          )}
        </button>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-all"
            title="Върни се най-горе"
            aria-label="Върни се в началото на страницата"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

      </div>
    </aside>
  );
};
