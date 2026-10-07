import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, RotateCcw, Trash2, Check, BookOpen } from 'lucide-react';
import { errorBankService, type SavedErrorItem } from '../services/errorBankService';
import type { QuizQuestion } from '../types';

interface ErrorBankViewProps {
  onStartCustomQuiz?: (questions: QuizQuestion[]) => void;
}

export const ErrorBankView: React.FC<ErrorBankViewProps> = ({ onStartCustomQuiz }) => {
  const [errors, setErrors] = useState<SavedErrorItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'quiz' | 'audit'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadErrors = () => {
    setErrors(errorBankService.getAllErrors());
  };

  useEffect(() => {
    loadErrors();
  }, []);

  const handleToggleResolved = (id: string) => {
    errorBankService.toggleResolved(id);
    loadErrors();
  };

  const handleRemove = (id: string) => {
    errorBankService.removeError(id);
    loadErrors();
  };

  const handleClearAll = () => {
    if (window.confirm('Сигурни ли сте, че искате да изчистите всички запазени грешки?')) {
      errorBankService.clearAll();
      loadErrors();
    }
  };

  const handleCopyNote = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredErrors = errors.filter(e => {
    if (filter === 'quiz') return e.type === 'quiz_question';
    if (filter === 'audit') return e.type === 'notebook_missing_point';
    return true;
  });

  const unresolvedCount = errors.filter(e => !e.resolved).length;
  const resolvedCount = errors.filter(e => e.resolved).length;

  const quizErrorsWithData = errors
    .filter(e => e.type === 'quiz_question' && e.rawQuestionData)
    .map(e => e.rawQuestionData as QuizQuestion);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Метод на целенасочения преговор (Error Bank)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            Банка с грешки и пропуски от тетрадката
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Всички сгрешени тестови въпроси и непълни точки от записките се съхраняват тук за целенасочен преговор преди контролни.
          </p>
        </div>

        {/* Action / Stats Counter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400">За отработване:</span>
            <span className="font-mono font-bold text-rose-400">{unresolvedCount}</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400">Усвоени:</span>
            <span className="font-mono font-bold text-emerald-400">{resolvedCount}</span>
          </div>

          {quizErrorsWithData.length > 0 && onStartCustomQuiz && (
            <button
              onClick={() => onStartCustomQuiz(quizErrorsWithData)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Репетиционен тест ({quizErrorsWithData.length})</span>
            </button>
          )}

          {errors.length > 0 && (
            <button
              onClick={handleClearAll}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
              title="Изчисти всички грешки"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-auto overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filter === 'all'
              ? 'bg-indigo-600 text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Всички записки ({errors.length})
        </button>

        <button
          onClick={() => setFilter('quiz')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filter === 'quiz'
              ? 'bg-indigo-600 text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Сгрешени въпроси ({errors.filter(e => e.type === 'quiz_question').length})
        </button>

        <button
          onClick={() => setFilter('audit')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filter === 'audit'
              ? 'bg-indigo-600 text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Липсващи от тетрадката ({errors.filter(e => e.type === 'notebook_missing_point').length})
        </button>
      </div>

      {/* List of Error Items */}
      {filteredErrors.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-100">
            Нямате нерешени грешки в този раздел!
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Когато решавате тестове или правите одит на тетрадката си, проблемните въпроси ще се записват автоматично тук.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredErrors.map((err) => {
            const isCopied = copiedId === err.id;

            return (
              <div
                key={err.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  err.resolved
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-70'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-emerald-400">
                        {err.subject}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {err.grade}
                      </span>
                      <span className="text-xs text-slate-400 truncate max-w-xs">
                        „{err.lessonTitle}“
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        err.type === 'quiz_question'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/25'
                      }`}>
                        {err.type === 'quiz_question' ? 'Сгрешен въпрос' : 'Липсва в тетрадката'}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                      {err.questionOrRequirement}
                    </h4>

                    {err.userAnswer && (
                      <div className="mt-1.5 text-xs text-rose-300">
                        Посочен отговор: <span className="line-through">{err.userAnswer}</span>
                      </div>
                    )}

                    <div className="mt-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1 text-xs">
                      <div className="text-emerald-300 font-medium">
                        Верен отговор / записка: <span>{err.correctAnswerOrNote}</span>
                      </div>
                      <div className="text-slate-400 text-[11px] leading-relaxed">
                        Обяснение: {err.explanationOrReason}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-start">
                    <button
                      onClick={() => handleCopyNote(err.id, err.correctAnswerOrNote)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors flex items-center gap-1"
                      title="Копирай за тетрадката"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <BookOpen className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Копирано' : 'Копирай'}</span>
                    </button>

                    <button
                      onClick={() => handleToggleResolved(err.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                        err.resolved
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{err.resolved ? 'Отработено' : 'Маркирай като усвоено'}</span>
                    </button>

                    <button
                      onClick={() => handleRemove(err.id)}
                      className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                      title="Изтрий"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
