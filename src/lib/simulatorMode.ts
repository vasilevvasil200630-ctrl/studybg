/**
 * Режимът, в който да се отвори симулаторът при следващото влизане: бутон „Към изпитните варианти“
 * извън симулатора иска директно пълните варианти, а не изпита по урок. Пази се еднократно в sessionStorage.
 */

const KEY = 'studybg_simulator_next_mode';

export type SimulatorMode = 'lesson' | 'papers';

export function requestSimulatorMode(mode: SimulatorMode): void {
  try {
    sessionStorage.setItem(KEY, mode);
  } catch {
    // без sessionStorage симулаторът просто се отваря в режима по подразбиране
  }
}

/**
 * Заявеният режим, иначе fallback. Само чете — рендерът може да се повтори (Suspense, преход),
 * затова заявката се изчиства след монтиране с clearSimulatorMode.
 */
export function peekSimulatorMode(fallback: SimulatorMode): SimulatorMode {
  try {
    const v = sessionStorage.getItem(KEY);
    return v === 'papers' || v === 'lesson' ? v : fallback;
  } catch {
    return fallback;
  }
}

export function clearSimulatorMode(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // няма какво да се изчисти
  }
}
