import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { SCIENCE_QUIZ } from '../data/scienceLabData';
import { generateScienceLabInfiniteQuiz } from '../services/infiniteLabGenerators';

// Изнесено от ScienceDziLab.tsx — един таб от STEM лабораторията
export const ScienceQuizTab: React.FC = () => {
  const [subjectFilter, setSubjectFilter] = useState<'Всички' | 'Биология' | 'Химия' | 'Физика'>('Всички');
  const [variantNumber, setVariantNumber] = useState<number>(1);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOpt, setSelectedQuizOpt] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const activePool = useMemo(() => {
    const dynamicItems = generateScienceLabInfiniteQuiz(variantNumber);
    const combined =
      variantNumber === 1 ? [...SCIENCE_QUIZ, ...dynamicItems] : [...dynamicItems, ...SCIENCE_QUIZ];
    if (subjectFilter === 'Всички') return combined;
    return combined.filter((q) => q.subject === subjectFilter);
  }, [subjectFilter, variantNumber]);

  const currentQ = activePool[quizIndex] || activePool[0] || SCIENCE_QUIZ[0];

  const handleNewVariant = () => {
    setVariantNumber((prev) => prev + 1);
    setQuizIndex(0);
    setSelectedQuizOpt(null);
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
      <search className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['Всички', 'Биология', 'Химия', 'Физика'] as const).map((subj) => (
            <button
              key={subj}
              type="button"
              onClick={() => {
                setSubjectFilter(subj);
                setQuizIndex(0);
                setSelectedQuizOpt(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                subjectFilter === subj
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
            Задача {quizIndex + 1} от {activePool.length} • {currentQ.subject} (Вариант #{variantNumber})
          </span>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
            Верни: {quizScore}
          </span>
          <button
            type="button"
            onClick={handleNewVariant}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Нов вариант с нови задачи (∞)</span>
          </button>
        </div>
      </search>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
        {currentQ.question}
      </h3>

      <div className="space-y-2.5">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedQuizOpt === idx;
          const isCorrect = idx === currentQ.correctIndex;
          let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
          if (selectedQuizOpt !== null) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
            } else if (isSelected) {
              btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (selectedQuizOpt !== null) return;
                setSelectedQuizOpt(idx);
                if (idx === currentQ.correctIndex) {
                  setQuizScore((s) => s + 1);
                }
              }}
              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
            >
              <span>{opt}</span>
              {selectedQuizOpt !== null && isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {selectedQuizOpt !== null && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {selectedQuizOpt !== null && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2">
          <div>
            <strong>Обяснение за 6.00:</strong> {currentQ.explanation}
          </div>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setSelectedQuizOpt(null);
                if (quizIndex + 1 < activePool.length) {
                  setQuizIndex((prev) => prev + 1);
                } else {
                  setVariantNumber((prev) => prev + 1);
                  setQuizIndex(0);
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
            >
              <span>Следваща задача</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <details className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700">
        <summary className="font-bold text-slate-900 cursor-pointer select-none">
          Справка с учебния материал по МОН за {currentQ.subject} (ДЗИ / Кандидатстудентски формат)
        </summary>
        <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5 leading-relaxed">
          <p>
            <strong>Биология и здравно образование:</strong> При транскрипция матричната ДНК (3&apos;→5&apos;) се презаписва в иРНК (5&apos;→3&apos;) по правилото А→У, Т→А, Г→Ц, Ц→Г; СТОП кодоните (УАА, УАГ, УГА) не кодират аминокиселина. Чистият добив от гликолиза е 2 mol АТФ, а сумарният аеробен добив — до 38 mol АТФ/mol глюкоза.
          </p>
          <p>
            <strong>Химия и опазване на околната среда:</strong> Качествени реакции: Ag⁺ + Cl⁻ → AgCl↓ (бяла утайка), Ba²⁺ + SO₄²⁻ → BaSO₄↓ (бяла кристална утайка, неразтворима в киселини). Хидролиза на соли: силна основа + слаба киселина → pH &gt; 7; слаба основа + силна киселина → pH &lt; 7.
          </p>
          <p>
            <strong>Физика и астрономия:</strong> Уравнение на Айнщайн за фотоефекта: hν = A + E_k,max. КПД на идеална топлинна машина на Карно: η_max = (T₁ - T₂) / T₁ (с температури в келвини T[K] = t[°C] + 273).
          </p>
        </div>
      </details>
    </div>
  );
};
