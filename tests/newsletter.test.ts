import { beforeEach, describe, expect, it, vi } from 'vitest';

const cloud = vi.hoisted(() => ({
  configured: true,
  upsertError: null as null | { message: string },
  upserts: [] as { row: Record<string, unknown>; options: Record<string, unknown> }[],
  rpcCalls: [] as { fn: string; args: Record<string, unknown> }[]
}));

vi.mock('../src/services/supabaseClient', () => ({
  isSupabaseConfigured: () => cloud.configured,
  supabase: {
    from: () => ({
      upsert: async (row: Record<string, unknown>, options: Record<string, unknown>) => {
        cloud.upserts.push({ row, options });
        return { error: cloud.upsertError };
      }
    }),
    rpc: async (fn: string, args: Record<string, unknown>) => {
      cloud.rpcCalls.push({ fn, args });
      return { error: null };
    }
  }
}));

const { mailingService } = await import('../src/services/mailingService');
let store: Record<string, string> = {};

beforeEach(() => {
  store = {};
  cloud.configured = true;
  cloud.upsertError = null;
  cloud.upserts = [];
  cloud.rpcCalls = [];
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    }
  });
});

describe('бюлетин: честен резултат', () => {
  it('успех само когато имейлът е записан в облака (само INSERT, без презапис)', async () => {
    const res = await mailingService.subscribeToNewsletter('Uchenik@Example.com', '12. клас');
    expect(res.success).toBe(true);
    expect(cloud.upserts[0].row).toEqual({ email: 'uchenik@example.com', grade: '12. клас' });
    expect(cloud.upserts[0].options).toMatchObject({ ignoreDuplicates: true });
    expect(mailingService.isSubscribed().subscribed).toBe(true);
  });

  it('липсваща таблица / грешка → success: false и нищо не се помни локално', async () => {
    cloud.upsertError = { message: "Could not find the table 'public.newsletter_subscribers'" };
    const res = await mailingService.subscribeToNewsletter('uchenik@example.com');
    expect(res.success).toBe(false);
    expect(res.message).not.toMatch(/записан\./);
    expect(mailingService.isSubscribed().subscribed).toBe(false);
  });

  it('без Supabase → success: false', async () => {
    cloud.configured = false;
    const res = await mailingService.subscribeToNewsletter('uchenik@example.com');
    expect(res.success).toBe(false);
  });

  it('отписването минава през защитената функция unsubscribe_newsletter', async () => {
    await mailingService.unsubscribe('Uchenik@Example.com');
    expect(cloud.rpcCalls).toEqual([{ fn: 'unsubscribe_newsletter', args: { p_email: 'uchenik@example.com' } }]);
  });
});
