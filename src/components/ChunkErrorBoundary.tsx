import React from 'react';

interface ChunkErrorBoundaryProps {
  children: React.ReactNode;
  /** Компактен вариант за модали (fallback={null} Suspense) */
  compact?: boolean;
}

interface ChunkErrorBoundaryState {
  failed: boolean;
}

const isChunkLoadError = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error);
  return /dynamically imported module|Importing a module script failed|Failed to fetch|Unable to preload|MIME type/i.test(message);
};

/**
 * Хваща грешки при зареждане на lazy chunk (напр. след нов деплой, когато табът
 * още държи старата версия) и предлага презареждане вместо бял екран.
 */
export class ChunkErrorBoundary extends React.Component<ChunkErrorBoundaryProps, ChunkErrorBoundaryState> {
  state: ChunkErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ChunkErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error(isChunkLoadError(error) ? 'Chunk load failed:' : 'View render failed:', error);
  }

  render() {
    if (!this.state.failed) {
      return this.props.children;
    }

    return (
      <div
        role="alert"
        className={`text-center ${this.props.compact ? 'p-4' : 'p-8 rounded-2xl bg-slate-50 border border-slate-200'}`}
      >
        <p className="text-sm font-semibold text-slate-900">Този раздел не успя да се зареди.</p>
        <p className="mt-1 text-xs text-slate-600">
          Вероятно има нова версия на StudyBG. Презаредете страницата, за да я заредите.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
        >
          Презареди
        </button>
      </div>
    );
  }
}
