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
    throw new Error('Не трябва да има мрежова заявка');
  }));
});

describe('mailingService.sendEmail', () => {
  it('подготвя mailto: за имейл клиента на потребителя, без сървърна заявка', async () => {
    const res = await mailingService.sendEmail({
      recipientEmail: 'Ученик@Example.com',
      testResult: { lessonTitle: 'Априлското въстание', score: 80, total: 100, gradeBg: 5.14, missedQuestions: ['Кога е Оборище?'] }
    });
    expect(res.success).toBe(true);
    expect(res.mailtoUrl).toMatch(/^mailto:/);
    expect(decodeURIComponent(res.mailtoUrl ?? '')).toContain('Оценка: 5.14');
    expect(res.plainText).toContain('Кога е Оборище?');
    expect(res.message).not.toMatch(/изпратен успешно/);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('отказва невалиден адрес', async () => {
    const res = await mailingService.sendEmail({ recipientEmail: 'няма-маймунка' });
    expect(res.success).toBe(false);
  });
});
