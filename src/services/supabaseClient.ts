import { createClient, type Session } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from './supabaseConfig';

export { isSupabaseConfigured };

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let sessionPromise: Promise<Session | null> | null = null;

/**
 * Връща активната сесия; ако няма — създава анонимен акаунт (без регистрация).
 * Изисква „Allow anonymous sign-ins“ в Supabase. При неуспех връща null и не опитва
 * отново до следващото зареждане на страницата.
 */
export function ensureSupabaseSession(): Promise<Session | null> {
  if (!isSupabaseConfigured()) return Promise.resolve(null);
  if (!sessionPromise) {
    sessionPromise = (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) return data.session;
      const { data: anon, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.info('Supabase anonymous sign-in unavailable:', error.message);
        return null;
      }
      return anon.session;
    })().catch((err: unknown) => {
      console.info('Supabase session unavailable:', err);
      return null;
    });
  }
  return sessionPromise;
}

/** Само ако вече има сесия — без да създава нов анонимен акаунт. */
export async function getExistingSupabaseSession(): Promise<Session | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch {
    return null;
  }
}

/**
 * Service to sync student error items and quiz attempts with Supabase
 */
export const supabaseSyncService = {
  async testConnection(): Promise<{ success: boolean; message: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, message: 'Supabase не е конфигуриран.' };
    }
    try {
      const { error } = await supabase.from('exam_attempts').select('id', { head: true, count: 'exact' }).limit(1);
      if (error) {
        // 42P01 = таблицата липсва (миграцията не е пусната); всичко останало е реална грешка
        const hint = error.code === '42P01' ? ' Пуснете миграцията от supabase/migrations.' : '';
        return { success: false, message: `Грешка от Supabase (${error.code ?? 'unknown'}): ${error.message}.${hint}` };
      }
      return { success: true, message: 'Свързан към Supabase.' };
    } catch (err: unknown) {
      return { success: false, message: err instanceof Error ? err.message : 'Грешка при връзка със Supabase.' };
    }
  }
};
