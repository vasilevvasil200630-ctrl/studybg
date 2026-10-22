import React, { useState, useEffect } from 'react';
import { WifiOff, Download, RefreshCw, X, Smartphone } from 'lucide-react';
import { pwaService } from '../services/pwaService';

export const OfflineStatusBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(pwaService.isOnline());
  const [canInstall, setCanInstall] = useState<boolean>(pwaService.canInstall());
  const [hasUpdate, setHasUpdate] = useState<boolean>(pwaService.hasUpdate());
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    const unsubConnection = pwaService.onConnectionChange((online) => setIsOnline(online));
    const unsubInstall = pwaService.onInstallableChange((installable) => setCanInstall(installable));
    const unsubUpdate = pwaService.onUpdateAvailable(() => setHasUpdate(true));

    return () => {
      unsubConnection();
      unsubInstall();
      unsubUpdate();
    };
  }, []);

  const handleInstallClick = async () => {
    await pwaService.promptInstall();
  };

  const handleUpdateClick = () => {
    pwaService.applyUpdate();
  };

  // If online, no update, and cannot install (or dismissed), render nothing
  if (isOnline && !hasUpdate && (!canInstall || isDismissed)) {
    return null;
  }

  return (
    // Плаващо известие (fixed) — не измества съдържанието, когато се появи след зареждане (CLS = 0)
    <aside
      data-print-hide
      aria-label="Системни известия за връзка"
      aria-live="polite"
      className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-4 lg:bottom-4 sm:max-w-md z-40 rounded-xl bg-white text-slate-700 text-xs border border-slate-200 shadow-lg shadow-slate-900/10"
    >
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Offline indicator */}
        {!isOnline && (
          <div className="flex items-center gap-2 text-amber-800 font-semibold">
            <WifiOff className="w-4 h-4 text-amber-600 flex-shrink-0" aria-hidden="true" />
            <span>
              Няма връзка. Отворените уроци, тестовете и формулите работят и без интернет.
            </span>
          </div>
        )}

        {/* Update available prompt */}
        {hasUpdate && (
          <div className="flex items-center gap-2 text-emerald-800 font-medium">
            <RefreshCw className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Има нова версия на сайта.</span>
            <button
              onClick={handleUpdateClick}
              className="ml-2 px-2.5 py-1 rounded-md bg-brand-sapphire hover:bg-brand-sapphire-dark text-white text-xs font-semibold transition-colors"
            >
              Презареди сега
            </button>
          </div>
        )}

        {/* PWA Install prompt */}
        {isOnline && !hasUpdate && canInstall && !isDismissed && (
          <div className="flex items-center gap-2 text-slate-700">
            <Smartphone className="w-4 h-4 text-brand-sapphire flex-shrink-0" aria-hidden="true" />
            <span>
              Добави StudyBG на устройството си — уроците се отварят и без интернет.
            </span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {canInstall && !isDismissed && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-sapphire hover:bg-brand-sapphire-dark text-white font-semibold text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Инсталирай</span>
            </button>
          )}

          {canInstall && !isDismissed && (
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Скрий известието"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
