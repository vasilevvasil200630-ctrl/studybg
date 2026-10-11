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
    <aside aria-label="Системни известия за връзка" className="w-full bg-slate-900 text-white text-xs border-b border-slate-800 transition-all z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Offline indicator */}
        {!isOnline && (
          <div className="flex items-center gap-2 text-amber-300 font-semibold">
            <WifiOff className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              Офлайн режим активен: Пълният конспект по МОН, тестовете и формулите работят без интернет!
            </span>
          </div>
        )}

        {/* Update available prompt */}
        {hasUpdate && (
          <div className="flex items-center gap-2 text-emerald-300 font-medium">
            <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>Налице е обновена версия на учебното съдържание.</span>
            <button
              onClick={handleUpdateClick}
              className="ml-2 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors"
            >
              Презареди сега
            </button>
          </div>
        )}

        {/* PWA Install prompt */}
        {isOnline && !hasUpdate && canInstall && !isDismissed && (
          <div className="flex items-center gap-2 text-slate-200">
            <Smartphone className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>
              Инсталирайте StudyBG като самостоятелно приложение за бърз офлайн достъп в клас.
            </span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {canInstall && !isDismissed && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Инсталирай приложението</span>
            </button>
          )}

          {canInstall && !isDismissed && (
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
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
