import React, { useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { MonProgram, MonSubjectId } from '../../data/monCurriculum';
import { MON_SUBJECTS } from '../../data/monCurriculum';
import { buildStudentPlan, defaultLanguageProgramId, languagePrograms } from '../../data/monCurriculum/studentPrograms';
import {
  SCHOOL_PROFILES,
  SCHOOL_TYPES,
  STUDENT_GRADES,
  STUDENT_LANGUAGES,
  WEEKDAY_SHORT,
  type LanguageChoice,
  type StudentProfile,
} from '../../lib/studentProfile';

interface ProfileFormProps {
  initial: StudentProfile;
  catalog: MonProgram[];
  onSave: (profile: StudentProfile) => void;
  onCancel?: () => void;
}

/** Предметите с програма за профилирана подготовка (английски и немски — по ниво) */
const PP_SUBJECTS: MonSubjectId[] = [
  'math', 'informatika', 'it', 'physics', 'chemistry', 'biology', 'bel', 'history', 'geography',
  'philosophy', 'entrepreneurship', 'english', 'german', 'arts', 'music', 'pe',
];

const SEGMENT = 'min-h-11 rounded-lg border px-4 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sapphire';
const SEG_ON = 'border-brand-sapphire bg-brand-sapphire text-white';
const SEG_OFF = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50';

const Question: React.FC<{ title: string; hint?: string; children: React.ReactNode }> = ({ title, hint, children }) => (
  <fieldset className="border-t border-slate-100 pt-5 first:border-t-0 first:pt-0">
    <legend className="text-base font-bold text-slate-900">{title}</legend>
    {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
    <div className="mt-3">{children}</div>
  </fieldset>
);

export const ProfileForm: React.FC<ProfileFormProps> = ({ initial, catalog, onSave, onCancel }) => {
  const [draft, setDraft] = useState<StudentProfile>(initial);
  const set = (patch: Partial<StudentProfile>) => setDraft((d) => ({ ...d, ...patch }));
  const plan = useMemo(() => buildStudentPlan(draft, catalog), [draft, catalog]);
  const showProfileSubjects = draft.schoolType === 'profiled' && draft.grade >= 11;

  const chooseProfile = (id: StudentProfile['profileId']) => {
    const suggested = SCHOOL_PROFILES.find((p) => p.id === id)?.suggested ?? [];
    // Предложените профилиращи предмети се слагат само ако ученикът още не е избрал свои
    set({ profileId: id, profileSubjects: draft.profileSubjects.length ? draft.profileSubjects : suggested });
  };

  const toggleProfileSubject = (s: MonSubjectId) =>
    set({ profileSubjects: draft.profileSubjects.includes(s) ? draft.profileSubjects.filter((x) => x !== s) : [...draft.profileSubjects, s] });

  const setLanguage = (i: number, patch: Partial<LanguageChoice>) =>
    set({ languages: draft.languages.map((l, j) => (j === i ? { ...l, ...patch } : l)) });

  const toggleOptional = (programId: string, on: boolean) =>
    set({
      addedProgramIds: on ? [...new Set([...draft.addedProgramIds, programId])] : draft.addedProgramIds.filter((x) => x !== programId),
      removedProgramIds: on ? draft.removedProgramIds.filter((x) => x !== programId) : [...new Set([...draft.removedProgramIds, programId])],
    });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      <form
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(draft);
        }}
      >
        <Question title="В кой клас си?">
          <div className="grid grid-cols-5 gap-2 sm:flex" role="radiogroup" aria-label="Клас">
            {STUDENT_GRADES.map((g) => (
              <button
                key={g}
                type="button"
                role="radio"
                aria-checked={draft.grade === g}
                onClick={() => set({ grade: g })}
                className={`${SEGMENT} px-0 sm:w-16 ${draft.grade === g ? SEG_ON : SEG_OFF}`}
              >
                {g}.
              </button>
            ))}
          </div>
        </Question>

        <Question title="В какво училище учиш?">
          <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Вид училище">
            {SCHOOL_TYPES.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={draft.schoolType === s.id}
                onClick={() => set({ schoolType: s.id })}
                className={`rounded-lg border p-3 text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sapphire ${
                  draft.schoolType === s.id ? 'border-brand-sapphire bg-brand-sapphire-soft' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="block text-sm font-bold text-slate-900">{s.name}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{s.hint}</span>
              </button>
            ))}
          </div>
        </Question>

        <Question
          title="Учеше ли (или учиш ли) чужд език интензивно в 8. клас?"
          hint="От това зависят предметите в 8. и 9. клас и нивото по езика."
        >
          <div className="flex gap-2" role="radiogroup" aria-label="Интензивен 8. клас">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                type="button"
                role="radio"
                aria-checked={draft.intensiveLanguage === v}
                onClick={() => set({ intensiveLanguage: v })}
                className={`${SEGMENT} ${draft.intensiveLanguage === v ? SEG_ON : SEG_OFF}`}
              >
                {v ? 'Да' : 'Не'}
              </button>
            ))}
          </div>
        </Question>

        {draft.schoolType === 'profiled' && (
          <Question title="Профил">
            <div className="flex flex-wrap gap-2">
              {SCHOOL_PROFILES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={draft.profileId === p.id}
                  onClick={() => chooseProfile(p.id)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                    draft.profileId === p.id ? SEG_ON : SEG_OFF
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </Question>
        )}

        {showProfileSubjects && (
          <Question
            title="Профилиращи предмети"
            hint="Отбележи предметите, които са профилиращи в твоя клас. Виж учебния план на класа, ако не си сигурен."
          >
            <div className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
              {PP_SUBJECTS.map((s) => (
                <label key={s} className="flex min-h-10 cursor-pointer items-center gap-2.5 text-sm text-slate-800">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-brand-sapphire"
                    checked={draft.profileSubjects.includes(s)}
                    onChange={() => toggleProfileSubject(s)}
                  />
                  {MON_SUBJECTS[s].name}
                </label>
              ))}
            </div>
          </Question>
        )}

        {draft.schoolType === 'professional' && (
          <Question title="Специалност" hint="Например „Компютърна техника и технологии“ — за да видиш кое от нея има в сайта.">
            <input
              type="text"
              value={draft.specialty}
              onChange={(e) => set({ specialty: e.target.value })}
              maxLength={120}
              placeholder="Специалност"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-brand-sapphire focus:outline-none"
            />
          </Question>
        )}

        <Question title="Чужди езици">
          <div className="space-y-3">
            {draft.languages.map((choice, i) => {
              const levels = languagePrograms(catalog, choice.language);
              const fallback = defaultLanguageProgramId(choice.language, draft.grade, draft.intensiveLanguage, i > 0);
              return (
                <div key={i} className="flex flex-wrap items-center gap-2">
                  <span className="w-20 text-sm font-semibold text-slate-600">{i === 0 ? 'Първи' : 'Втори'}</span>
                  <select
                    aria-label={`${i === 0 ? 'Първи' : 'Втори'} чужд език`}
                    value={choice.language}
                    onChange={(e) => setLanguage(i, { language: e.target.value as LanguageChoice['language'], programId: undefined })}
                    className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900"
                  >
                    {STUDENT_LANGUAGES.map((l) => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                  {levels.length > 0 && (
                    <select
                      aria-label="Ниво по учебната програма"
                      value={choice.programId ?? fallback ?? ''}
                      onChange={(e) => setLanguage(i, { programId: e.target.value })}
                      className="h-11 min-w-0 basis-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 sm:basis-auto sm:flex-1"
                    >
                      {levels.map((p) => (
                        <option key={p.id} value={p.id}>{p.title.replace(/^(Английски|Немски) език /, 'Ниво ')}</option>
                      ))}
                    </select>
                  )}
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => set({ languages: draft.languages.filter((_, j) => j !== i) })}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
                      aria-label="Махни втория език"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
            {draft.languages.length < 2 && (
              <button
                type="button"
                onClick={() => set({ languages: [...draft.languages, { language: 'german' }] })}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-sapphire hover:text-brand-sapphire-dark cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Втори чужд език
              </button>
            )}
          </div>
        </Question>

        <Question title="Към каква оценка се стремиш и колко време имаш?">
          <div className="flex flex-wrap items-center gap-2">
            {([4, 5, 6] as const).map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={draft.targetGrade === g}
                onClick={() => set({ targetGrade: g })}
                className={`${SEGMENT} ${draft.targetGrade === g ? SEG_ON : SEG_OFF}`}
              >
                {g === 6 ? 'Отличен 6' : g === 5 ? 'Много добър 5' : 'Добър 4'}
              </button>
            ))}
            <label className="ml-auto flex items-center gap-2 text-sm text-slate-700">
              <span>на ден</span>
              <select
                value={draft.minutesPerDay}
                onChange={(e) => set({ minutesPerDay: Number(e.target.value) })}
                className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900"
              >
                {[20, 30, 45, 60, 90, 120].map((m) => (
                  <option key={m} value={m}>{m} мин</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1.5" role="group" aria-label="Дни за учене">
            <span className="mr-1 text-sm text-slate-700">Дни:</span>
            {WEEKDAY_SHORT.map((label, day) => {
              const on = draft.studyDays.includes(day);
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    const days = on ? draft.studyDays.filter((d) => d !== day) : [...draft.studyDays, day].sort((a, b) => a - b);
                    if (days.length) set({ studyDays: days });
                  }}
                  className={`h-10 w-12 rounded-md border text-sm font-semibold transition-colors cursor-pointer ${on ? SEG_ON : SEG_OFF}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Question>

        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-5">
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-lg bg-brand-sapphire px-5 text-sm font-semibold text-white hover:bg-brand-sapphire-dark cursor-pointer"
          >
            Запази програмата
          </button>
          <span className="self-center text-sm text-slate-600 lg:hidden">
            {plan.subjects.filter((s) => s.included).length} предмета
            {plan.missing.length > 0 && `, ${plan.missing.length} не са в сайта`} — списъкът е по-долу
          </span>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-11 items-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Отказ
            </button>
          )}
        </div>
      </form>

      <aside aria-labelledby="plan-preview-title" className="rounded-2xl border border-blue-100 bg-brand-sapphire-soft p-5 lg:sticky lg:top-20" aria-live="polite">
        <h2 id="plan-preview-title" className="text-base font-bold text-slate-900">
          Предметите ти в {draft.grade}. клас
        </h2>
        <p className="mt-1 text-sm text-slate-600">Списъкът се сменя, докато отговаряш.</p>
        <ul className="mt-4 space-y-1">
          {plan.subjects.map((s) => (
            <li key={s.program.id}>
              <label className={`flex min-h-9 items-center gap-2.5 text-sm ${s.included ? 'text-slate-900' : 'text-slate-500'}`}>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-brand-sapphire"
                  checked={s.included}
                  onChange={(e) => toggleOptional(s.program.id, e.target.checked)}
                />
                <span className="min-w-0 flex-1">{s.name}</span>
                {s.optional && !s.included && <span className="text-xs text-slate-500">по избор</span>}
              </label>
            </li>
          ))}
        </ul>
        {plan.missing.length > 0 && (
          <div className="mt-4 border-t border-blue-100 pt-3">
            <p className="text-sm font-semibold text-slate-900">Няма ги в сайта</p>
            <ul className="mt-1 space-y-1 text-sm text-slate-600">
              {plan.missing.map((m) => (
                <li key={m.name}>{m.name}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
};
