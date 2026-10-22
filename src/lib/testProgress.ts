import { useEffect } from 'react';

/**
 * Прогрес на незавършен изпит (пренесено от Матура Плюс, lib/client/testProgress):
 * ученикът излиза за малко (друг раздел, опресняване) и като се върне, продължава оттам.
 *
 * - Пази се в sessionStorage — затварянето на раздела прекратява изпита.
 * - Изтича след 30 минути без промяна — дългото отсъствие също го прекратява.
 * - Предаден изпит или „Реши отново“ трие записа (clearTestProgress).
 */

const PREFIX = 'sbg:test-progress:';
export const TEST_PROGRESS_TTL_MS = 30 * 60 * 1000;

type Stored<T> = { savedAt: number; data: T };

function storage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Запазеният прогрес или null (няма, изтекъл или повреден). */
export function loadTestProgress<T>(key: string): T | null {
  const s = storage();
  if (!s) return null;
  try {
    const raw = s.getItem(PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored<T>;
    if (!parsed || typeof parsed.savedAt !== 'number' || Date.now() - parsed.savedAt > TEST_PROGRESS_TTL_MS) {
      s.removeItem(PREFIX + key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

export function saveTestProgress<T>(key: string, data: T): void {
  const s = storage();
  if (!s) return;
  try {
    s.setItem(PREFIX + key, JSON.stringify({ savedAt: Date.now(), data } satisfies Stored<T>));
  } catch {
    // Пълно хранилище или частен режим — изпитът продължава без запис
  }
}

export function clearTestProgress(key: string): void {
  try {
    storage()?.removeItem(PREFIX + key);
  } catch {
    // нищо
  }
}

/**
 * Записва прогреса при всяка промяна, докато изпитът е в ход (active), с кратко изчакване.
 * Докато страницата е видима, записът се подновява всяка минута — 30-минутният срок
 * важи само за времето извън изпита. При затваряне на раздела записът се прави веднага.
 */
export function useTestProgressAutosave<T>(key: string | null, snapshot: T, active: boolean): void {
  const json = active && key ? JSON.stringify(snapshot) : null;
  useEffect(() => {
    if (!key || json === null) return;
    const save = () => saveTestProgress(key, JSON.parse(json) as T);
    const debounce = window.setTimeout(save, 400);
    const heartbeat = window.setInterval(() => {
      if (document.visibilityState === 'visible') save();
    }, 60_000);
    window.addEventListener('beforeunload', save);
    return () => {
      window.clearTimeout(debounce);
      window.clearInterval(heartbeat);
      window.removeEventListener('beforeunload', save);
    };
  }, [key, json]);
}
