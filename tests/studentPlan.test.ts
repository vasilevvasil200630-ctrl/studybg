import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadMonCatalog } from '../src/data/monCurriculum';
import { buildStudentPlan, defaultLanguageProgramId, includedSubjects } from '../src/data/monCurriculum/studentPrograms';
import {
  STUDENT_PROFILE_KEY,
  emptyProfile,
  loadStudentProfile,
  parseStudentProfile,
  saveStudentProfile,
  type StudentProfile,
} from '../src/lib/studentProfile';

const profile = (patch: Partial<StudentProfile>): StudentProfile => ({ ...emptyProfile(), ...patch });
const ids = (p: StudentProfile, catalog: Awaited<ReturnType<typeof loadMonCatalog>>) =>
  includedSubjects(buildStudentPlan(p, catalog)).map((s) => s.program.id);

describe('лична програма от профила', () => {
  it('8. клас без интензивен език: всички общообразователни предмети и английски A2', async () => {
    const catalog = await loadMonCatalog();
    const got = ids(profile({ grade: 8 }), catalog);
    expect(got).toEqual(expect.arrayContaining(['8-bge', '8-lit', '8-math', '8-fa', '8-history', '8-informatika', 'lang-ae-a2-8-neint']));
    expect(got).toHaveLength(16);
  });

  it('интензивен 8. клас: основните предмети, останалите се добавят ръчно', async () => {
    const catalog = await loadMonCatalog();
    const p = profile({ grade: 8, intensiveLanguage: true });
    const plan = buildStudentPlan(p, catalog);
    expect(includedSubjects(plan).map((s) => s.program.id)).toEqual(['8-bge', '8-lit', '8-math', '8-fvs', 'lang-ae-b1.1-8-int']);
    expect(plan.subjects.find((s) => s.program.id === '8-history')).toMatchObject({ optional: true, included: false });
    expect(ids({ ...p, addedProgramIds: ['8-history'] }, catalog)).toContain('8-history');
    expect(plan.notes[0]).toMatch(/интензивния 8\. клас/);
  });

  it('9. клас взима варианта на програмата според интензивния 8. клас', async () => {
    const catalog = await loadMonCatalog();
    expect(ids(profile({ grade: 9, intensiveLanguage: true }), catalog)).toEqual(
      expect.arrayContaining(['9-history-144', '9-geo-72', '9-fa-90', '9-bio-90', '9-himia-90']),
    );
    const regular = ids(profile({ grade: 9 }), catalog);
    expect(regular).toEqual(expect.arrayContaining(['9-history-72', '9-geo-36', '9-fa-36', '9-bio-36', '9-himia-54']));
    expect(regular).not.toContain('9-history-144');
  });

  it('11. клас в профилирана гимназия: общите предмети и профилиращите модули', async () => {
    const catalog = await loadMonCatalog();
    const p = profile({ grade: 11, schoolType: 'profiled', profileId: 'math', profileSubjects: ['math', 'informatika'] });
    const plan = buildStudentPlan(p, catalog);
    expect(includedSubjects(plan).map((s) => s.program.id)).toEqual(['11-be', '11-lit', '11-math', '11-go', '11-fvs', 'pp-math', 'pp-informatika', 'lang-ae-b1.1']);
    expect(plan.subjects.find((s) => s.program.id === 'pp-math')?.role).toBe('profile');
    expect(plan.missing).toEqual([]);
  });

  it('проверява кои предмети ги няма в сайта', async () => {
    const catalog = await loadMonCatalog();
    const plan = buildStudentPlan(
      profile({ grade: 12, schoolType: 'professional', specialty: 'Компютърна техника и технологии', languages: [{ language: 'english' }, { language: 'french' }] }),
      catalog,
    );
    expect(plan.missing.map((m) => m.name)).toEqual(['Френски език', 'Специалните предмети: Компютърна техника и технологии']);
    // Профилираните чужди езици са в каталога без теми — показват се като липсващи за тестове
    const langProfile = buildStudentPlan(profile({ grade: 11, profileSubjects: ['english'] }), catalog);
    expect(langProfile.missing.map((m) => m.name)).toEqual(['Английски език — профилирана подготовка']);
  });

  it('махнатите от ученика предмети не влизат в програмата', async () => {
    const catalog = await loadMonCatalog();
    expect(ids(profile({ grade: 10, removedProgramIds: ['10-arts', '10-music'] }), catalog)).not.toContain('10-arts');
  });

  it('нивото по чужд език по подразбиране', () => {
    expect(defaultLanguageProgramId('german', 9, true, false)).toBe('lang-ne-b1');
    expect(defaultLanguageProgramId('english', 12, false, false)).toBe('lang-ae-b1.1');
    expect(defaultLanguageProgramId('german', 10, false, true)).toBe('lang-ne-a1');
    expect(defaultLanguageProgramId('spanish', 10, false, false)).toBeNull();
  });
});

describe('запазване на профила', () => {
  beforeEach(() => {
    const store: Record<string, string> = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
    });
  });

  it('записва и чете профила', () => {
    const saved = saveStudentProfile(profile({ grade: 11, profileSubjects: ['biology'] }));
    expect(loadStudentProfile()).toEqual(saved);
  });

  it('повреден или чужд запис не чупи страницата', () => {
    localStorage.setItem(STUDENT_PROFILE_KEY, '{нещо');
    expect(loadStudentProfile()).toBeNull();
    expect(parseStudentProfile({ version: 1, grade: 7 })).toBeNull();
    const fixed = parseStudentProfile({ ...emptyProfile(10), languages: [{ language: 'klingon' }, { language: 'german' }], minutesPerDay: -5 });
    expect(fixed?.languages).toEqual([{ language: 'german' }]);
    expect(fixed?.minutesPerDay).toBe(45);
  });
});
