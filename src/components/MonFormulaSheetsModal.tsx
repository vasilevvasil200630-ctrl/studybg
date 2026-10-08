import React, { useState } from 'react';
import { X, Search, BookOpen, Copy, Check, FileText, Layers, Award, Printer, ShieldCheck } from 'lucide-react';
import {
  MATH_FORMULA_SHEETS,
  LITERATURE_EXAM_MATRIX,
  SCIENCE_CONSTANTS
} from '../data/monFormulaSheets';

interface MonFormulaSheetsModalProps {
  onClose: () => void;
}

export const MonFormulaSheetsModal: React.FC<MonFormulaSheetsModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'math' | 'literature' | 'science'>('math');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filters
  const filteredMath = MATH_FORMULA_SHEETS.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  const filteredLit = LITERATURE_EXAM_MATRIX.filter(item =>
    item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.crucialQuotesAndMotifs.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredScience = SCIENCE_CONSTANTS.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.formulaOrValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] my-auto">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Официален свитък по стандартите на МОН</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Справочник с формули и изпитни матрици
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Официално разрешените формули и матрици за НВО (7. клас) и ДЗИ (12. клас).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 border border-slate-300 shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Печат</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Затвори"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar & Segmented Tabs */}
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          
          {/* Segmented Controls */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-white border border-slate-200 w-full sm:w-auto shadow-2xs">
            <button
              onClick={() => setActiveTab('math')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'math'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Математика</span>
            </button>

            <button
              onClick={() => setActiveTab('literature')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'literature'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>БЕЛ (Матура)</span>
            </button>

            <button
              onClick={() => setActiveTab('science')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === 'science'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Физика & Химия</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търси формула, автор, закон..."
              className="w-full bg-white text-slate-900 placeholder-slate-400 pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600"
            />
          </div>

        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 print:text-black">
          
          {/* MATH TAB */}
          {activeTab === 'math' && (
            <div className="space-y-6">
              {filteredMath.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>{section.title}</span>
                    </h3>
                    <span className="text-[11px] text-slate-600 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {section.grade}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.items.map((item, iIdx) => {
                      const isCopied = copiedText === item.formula;
                      return (
                        <div
                          key={iIdx}
                          className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between shadow-2xs"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-semibold text-slate-900">
                                {item.name}
                              </span>
                              {item.isExamCritical && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                                  Често на изпит
                                </span>
                              )}
                            </div>
                            <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-sm text-blue-900 font-bold text-center my-1 select-all shadow-2xs">
                              {item.formula}
                            </div>
                            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                              {item.explanation}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-end">
                            <button
                              onClick={() => handleCopy(item.formula)}
                              className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-700 transition-colors font-medium"
                            >
                              {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              <span>{isCopied ? 'Копирано' : 'Копирай формула'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LITERATURE TAB */}
          {activeTab === 'literature' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800">
                Матрица на задължителните автори и творби за ДЗИ по БЕЛ. Включва жанр, ключови цитати, образи и тип въпроси.
              </div>

              <div className="space-y-4">
                {filteredLit.map((work, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                      <div>
                        <span className="text-xs font-semibold text-emerald-700">
                          {work.author} ({work.authorYears})
                        </span>
                        <h4 className="text-base font-bold text-slate-900">
                          {work.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                          Жанр: <strong className="text-slate-900">{work.genre}</strong>
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600">
                          {work.period}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-semibold text-slate-700 block mb-1">Ключови теми и мотиви:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {work.keyThemes.map((t, ti) => (
                            <span key={ti} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-700 block mb-1">Основни герои и образи:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {work.keyProtagonists.map((p, pi) => (
                            <span key={pi} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 text-xs">
                      <span className="font-semibold text-amber-900 block mb-1">
                        Опорни цитати & Идеен фокус:
                      </span>
                      <p className="text-slate-800 italic font-serif leading-relaxed">
                        {work.crucialQuotesAndMotifs}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-600 space-y-1">
                      <span className="font-semibold text-amber-800 block">Типични въпроси на МОН:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                        {work.examFrequentQuestions.map((q, qi) => (
                          <li key={qi}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCIENCE TAB */}
          {activeTab === 'science' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredScience.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                          item.subject === 'Физика'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {item.subject} • {item.category}
                        </span>
                        {item.unit && (
                          <span className="text-[10px] font-mono text-slate-500">
                            Мярка: {item.unit}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {item.name}
                      </h4>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-blue-900 font-bold my-2 text-center select-all">
                        {item.formulaOrValue}
                      </div>

                      <div className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5 mt-2">
                        <Award className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{item.ruleForExam}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
          <span>StudyBG Справочник за НВО & ДЗИ</span>
          <span>Съгласувано с учебните програми на МОН</span>
        </div>

      </div>
    </div>
  );
};
