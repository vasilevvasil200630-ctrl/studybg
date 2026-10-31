import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mailingService } from '../src/services/mailingService';

beforeEach(() => {
  const store: Record<string, string> = {};
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    }
  });
  vi.stubGlobal('fetch', vi.fn(async () => {
    throw new Error('Липсва сървърна връзка');
  }));
});

describe('mailingService.sendEmail', () => {
  it('подготвя mailto: за имейл клиента при preferMailto: true, без сървърна заявка', async () => {
    const res = await mailingService.sendEmail({
      recipientEmail: 'Ученик@Example.com',
      preferMailto: true,
      testResult: { lessonTitle: 'Априлското въстание', score: 80, total: 100, gradeBg: 5.14, missedQuestions: ['Кога е Оборище?'] }
    });
    expect(res.success).toBe(true);
    expect(res.deliveredVia).toBe('mailto');
    expect(res.mailtoUrl).toMatch(/^mailto:/);
    expect(decodeURIComponent(res.mailtoUrl ?? '')).toContain('Оценка: 5.14');
    expect(res.plainText).toContain('Кога е Оборище?');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('изпраща директно чрез Resend (/api/send-email), когато сървърът върне успех', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ success: true, id: 're_test_123' })
    })));
    const res = await mailingService.sendEmail({
      recipientEmail: 'Ученик@Example.com',
      testResult: { lessonTitle: 'Априлското въстание', score: 95, total: 100, gradeBg: 6.00 }
    });
    expect(res.success).toBe(true);
    expect(res.deliveredVia).toBe('resend');
    expect(res.resendId).toBe('re_test_123');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('преминава плавно към mailto:, когато /api/send-email не е наличен', async () => {
    const res = await mailingService.sendEmail({
      recipientEmail: 'Ученик@Example.com',
      testResult: { lessonTitle: 'Априлското въстание', score: 80, total: 100, gradeBg: 5.14 }
    });
    expect(res.success).toBe(true);
    expect(res.deliveredVia).toBe('mailto');
    expect(res.mailtoUrl).toMatch(/^mailto:/);
  });

  it('отказва невалиден адрес', async () => {
    const res = await mailingService.sendEmail({ recipientEmail: 'няма-маймунка' });
    expect(res.success).toBe(false);
  });
});
