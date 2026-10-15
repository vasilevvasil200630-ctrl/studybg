type ConnectionListener = (isOnline: boolean) => void;
type UpdateListener = () => void;
type InstallableListener = (canInstall: boolean) => void;

class PwaManager {
  private deferredPrompt: any = null;
  private connectionListeners: ConnectionListener[] = [];
  private updateListeners: UpdateListener[] = [];
  private installableListeners: InstallableListener[] = [];
  private isOnlineState: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private hasUpdateWaiting: boolean = false;
  private registration: ServiceWorkerRegistration | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleConnectionChange(true));
      window.addEventListener('offline', () => this.handleConnectionChange(false));

      window.addEventListener('beforeinstallprompt', (e: Event) => {
        // Prevent default browser mini-infobar
        e.preventDefault();
        this.deferredPrompt = e;
        this.notifyInstallable(true);
      });

      window.addEventListener('appinstalled', () => {
        this.deferredPrompt = null;
        this.notifyInstallable(false);
      });
    }
  }

  public register(): void {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    if (import.meta.env.DEV) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        for (const r of regs) {
          void r.unregister();
        }
      });
      return;
    }

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          this.registration = reg;

          // Check if an updated worker is waiting
          if (reg.waiting) {
            this.hasUpdateWaiting = true;
            this.notifyUpdate();
          }

          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (!newWorker) return;

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.hasUpdateWaiting = true;
                this.notifyUpdate();
              }
            });
          });
        })
        .catch((err) => {
          // In dev mode or unsupported environments, service worker errors are non-fatal
          console.debug('ServiceWorker registration error:', err);
        });

      // Reload page when new worker takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }

  public isOnline(): boolean {
    return this.isOnlineState;
  }

  public canInstall(): boolean {
    return Boolean(this.deferredPrompt);
  }

  public hasUpdate(): boolean {
    return this.hasUpdateWaiting;
  }

  public async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    try {
      this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;
      this.deferredPrompt = null;
      this.notifyInstallable(false);
      return choiceResult.outcome === 'accepted';
    } catch {
      return false;
    }
  }

  public applyUpdate(): void {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  public onConnectionChange(listener: ConnectionListener): () => void {
    this.connectionListeners.push(listener);
    listener(this.isOnlineState);
    return () => {
      this.connectionListeners = this.connectionListeners.filter((l) => l !== listener);
    };
  }

  public onUpdateAvailable(listener: UpdateListener): () => void {
    this.updateListeners.push(listener);
    if (this.hasUpdateWaiting) {
      listener();
    }
    return () => {
      this.updateListeners = this.updateListeners.filter((l) => l !== listener);
    };
  }

  public onInstallableChange(listener: InstallableListener): () => void {
    this.installableListeners.push(listener);
    listener(this.canInstall());
    return () => {
      this.installableListeners = this.installableListeners.filter((l) => l !== listener);
    };
  }

  private handleConnectionChange(online: boolean) {
    this.isOnlineState = online;
    this.connectionListeners.forEach((l) => l(online));
  }

  private notifyUpdate() {
    this.updateListeners.forEach((l) => l());
  }

  private notifyInstallable(canInstall: boolean) {
    this.installableListeners.forEach((l) => l(canInstall));
  }
}

export const pwaService = new PwaManager();
