import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TEST_PROGRESS_TTL_MS, clearTestProgress, loadTestProgress, saveTestProgress } from '../src/lib/testProgress';

// Минимален sessionStorage за node средата на тестовете
let store: Record<string, string> = {};
const sessionStorageMock = {
  getItem: (k: string) => (k in store ? store[k] : null),
  setItem: (k: string, v: string) => {
    store[k] = v;
  },
  removeItem: (k: string) => {
    delete store[k];
  }
};

beforeEach(() => {
  store = {};
  vi.stubGlobal('window', { sessionStorage: sessionStorageMock });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('testProgress (прогрес на незавършен изпит)', () => {
  it('записва и връща прогреса', () => {
    saveTestProgress('paper:x', { answers: { q1: 2 }, secondsLeft: 600 });
    expect(loadTestProgress('paper:x')).toEqual({ answers: { q1: 2 }, secondsLeft: 600 });
  });

  it('връща null, когато няма запис', () => {
    expect(loadTestProgress('paper:none')).toBeNull();
  });

  it('изтрива записа след 30 минути отсъствие', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-22T10:00:00Z'));
    saveTestProgress('paper:x', { a: 1 });
    vi.setSystemTime(new Date(Date.now() + TEST_PROGRESS_TTL_MS + 1000));
    expect(loadTestProgress('paper:x')).toBeNull();
    expect(Object.keys(store)).toHaveLength(0);
  });

  it('пази записа в рамките на 30 минути', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-22T10:00:00Z'));
    saveTestProgress('paper:x', { a: 1 });
    vi.setSystemTime(new Date(Date.now() + TEST_PROGRESS_TTL_MS - 1000));
    expect(loadTestProgress('paper:x')).toEqual({ a: 1 });
  });

  it('повреден запис не чупи изпита', () => {
    store['sbg:test-progress:paper:x'] = '{не е json';
    expect(loadTestProgress('paper:x')).toBeNull();
  });

  it('clearTestProgress премахва записа', () => {
    saveTestProgress('paper:x', { a: 1 });
    clearTestProgress('paper:x');
    expect(loadTestProgress('paper:x')).toBeNull();
  });

  it('без sessionStorage (частен режим) не хвърля грешка', () => {
    vi.stubGlobal('window', {
      get sessionStorage() {
        throw new Error('blocked');
      }
    });
    expect(() => saveTestProgress('paper:x', { a: 1 })).not.toThrow();
    expect(loadTestProgress('paper:x')).toBeNull();
  });
});
