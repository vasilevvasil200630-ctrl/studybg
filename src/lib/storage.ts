/**
 * Безопасно четене на масив от localStorage.
 * Връща [] при липсващ ключ, невалиден JSON, стойност, която не е масив,
 * или недостъпен localStorage (private mode). С itemGuard се филтрират и
 * повредените елементи.
 */
export function readStoredArray<T>(key: string, itemGuard?: (item: unknown) => item is T): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return itemGuard ? parsed.filter(itemGuard) : (parsed as T[]);
  } catch {
    return [];
  }
}

export const isString = (v: unknown): v is string => typeof v === 'string';

export const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  Boolean(v) && typeof v === 'object' && !Array.isArray(v);

/** Пропуска само елементи-обекти (повредени стойности като null/числа отпадат). */
export const isObjectItem = <T,>(v: unknown): v is T => isPlainObject(v);
