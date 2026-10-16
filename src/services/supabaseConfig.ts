// Лека конфигурация без @supabase/supabase-js — за проверки, които не бива да теглят
// 214 kB vendor chunk (напр. дали AI proxy-то изобщо е възможно).

export const SUPABASE_URL: string =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://ptcwtjmjbfxzqqdmiekd.supabase.co';

export const SUPABASE_ANON_KEY: string =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_hyUTrAbmJy7hH9TUfugDrQ_SR_V-BHq';

const PLACEHOLDER_PATTERN = /your-project|your_supabase|example\.supabase|placeholder/i;

/** Истински (не примерен) Supabase проект с ключ. */
export const isSupabaseConfigured = (): boolean => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  if (PLACEHOLDER_PATTERN.test(SUPABASE_URL) || PLACEHOLDER_PATTERN.test(SUPABASE_ANON_KEY)) return false;
  try {
    return new URL(SUPABASE_URL).protocol === 'https:';
  } catch {
    return false;
  }
};
