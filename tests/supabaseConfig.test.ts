import { afterEach, describe, expect, it, vi } from 'vitest';

const load = async (url: string, key: string) => {
  vi.resetModules();
  vi.stubEnv('VITE_SUPABASE_URL', url);
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', key);
  return import('../src/services/supabaseConfig');
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('isSupabaseConfigured', () => {
  it('приема истински https проект', async () => {
    const { isSupabaseConfigured } = await load('https://abcd1234.supabase.co', 'sb_publishable_real_key');
    expect(isSupabaseConfigured()).toBe(true);
  });

  it('отхвърля примерните стойности от .env.example', async () => {
    const { isSupabaseConfigured } = await load('https://your-project.supabase.co', 'your_supabase_anon_key_here');
    expect(isSupabaseConfigured()).toBe(false);
  });

  it('отхвърля адрес без https', async () => {
    const { isSupabaseConfigured } = await load('http://abcd1234.supabase.co', 'sb_publishable_real_key');
    expect(isSupabaseConfigured()).toBe(false);
  });
});
