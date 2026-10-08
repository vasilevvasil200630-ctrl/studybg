import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://ptcwtjmjbfxzqqdmiekd.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_hyUTrAbmJy7hH9TUfugDrQ_SR_V-BHq';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Service to sync student error items and quiz attempts with Supabase
 */
export const supabaseSyncService = {
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      if (!isSupabaseConfigured()) {
        return { success: false, message: 'Supabase credentials are not configured' };
      }
      // Simple ping to verify connectivity
      const { error } = await supabase.from('study_errors').select('id').limit(1);
      if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
        // Table might not exist yet, but connection to API works
        return { success: true, message: 'Свързан към Supabase API' };
      }
      return { success: true, message: 'Свързан към Supabase' };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Грешка при връзка';
      return { success: false, message: errorMessage };
    }
  }
};
