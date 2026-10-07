import React, { useState } from 'react';
import { Square, CheckCircle2, Copy, Check, Sparkles, BookOpen } from 'lucide-react';
import type { LessonData } from '../types';

interface NotebookAuditorProps {
  lesson: LessonData;
  onProceedToHolyTrinity: () => void;
}

export const NotebookAuditor: React.FC<NotebookAuditorProps> = ({ lesson, onProceedToHolyTrinity }) => {
  const checklist = lesson.notebookChecklist || [];
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCopyNote = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalItems = checklist.length;
  const checkedCount = checkedIds.length;
  const coveragePercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 100;

  // Grade prediction based on student's actual notebook content
  const getAuditVerdict = () => {
    if (coveragePercent >= 90) {
      return {
        verdict: 'Тетрадката ти е отлична! (Готов си за 6.00)',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        desc: 'Имаш всички ключови акценти, дати и дефиниции, изисквани от МОН за тази тема.'
      };
    }
    if (coveragePercent >= 60) {
      return {
        verdict: 'Добра основа, но имаш важни пропуски (Оценка около 4.50 - 5.00)',
        badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        desc: 'Добави липсващите акценти с бутона „Копирай в тетрадката“, за да си гарантираш Отличен.'
      };
    }
    return {
      verdict: 'Тетрадката е непълна за изпит (Оценка под 4.00)',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      desc: 'Липсват основни формули и определения, които учителите задължително дават на контролни.'
    };
  };

  const auditInfo = getAuditVerdict();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#141a36] via-[#11162b] to-[#0c1822] border-2 border-indigo-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Одитор на тетрадката • Стандарт за 6.00</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Какво ЗАДЪЛЖИТЕЛНО трябва да имаш на листа за „{lesson.title}“
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Сравни записките от своята тетрадка с официалния държавен стандарт на МОН. Отбележи какво имаш и виж какво ти липсва.
            </p>
          </div>

          {/* Coverage Gauge */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 min-w-[180px] text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Покритие на тетрадката
            </span>
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 my-1">
              {coveragePercent}%
            </div>
            <span className="text-[11px] text-slate-400">
              {checkedCount} от {totalItems} задължителни точки
            </span>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-1 ${auditInfo.badge}`}>
              {auditInfo.verdict}
            </span>
            <div className="text-xs text-slate-300">
              {auditInfo.desc}
            </div>
          </div>

          <button
            onClick={onProceedToHolyTrinity}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-bold text-xs shadow-lg hover:scale-[1.02] transition-all whitespace-nowrap"
          >
            <span>Премини към Резюмето</span>
            <BookOpen className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>Сравни ред по ред със своята тетрадка:</span>
        </h3>

        {checklist.map((item, idx) => {
          const isChecked = checkedIds.includes(item.id);
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                isChecked
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-[#12162b] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Interactive Checkbox */}
                <button
                  onClick={() => toggleCheck(item.id)}
                  className="mt-0.5 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                  ) : (
                    <Square className="w-6 h-6 text-slate-500" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-400">
                      Точка #{idx + 1}
                    </span>
                    {item.isEssentialForSix && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ⭐ Задължително за 6.00
                      </span>
                    )}
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      isChecked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {isChecked ? '✓ Имам го в тетрадката' : '✗ Липсва ми'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">
                    {item.requirement}
                  </h4>

                  <p className="mt-1 text-xs text-slate-400">
                    💡 <strong className="text-slate-300">Защо се изисква:</strong> {item.whyNeeded}
                  </p>

                  {/* Missing notes copy box */}
                  <div className="mt-3 p-3 rounded-xl bg-[#171c38] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="text-xs text-indigo-200 font-mono leading-relaxed">
                      ✍️ <span className="font-semibold text-white">Какво да запишеш:</span> {item.suggestedNotes}
                    </div>

                    <button
                      onClick={() => handleCopyNote(item.id, item.suggestedNotes)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all flex-shrink-0"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{isCopied ? 'Копирано!' : 'Копирай текста'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
