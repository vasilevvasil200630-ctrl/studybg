import React, { useState, useEffect, useRef } from 'react';
import { X, Search, BookOpen, Copy, Check, FileText, Layers, Award, Printer, ShieldCheck, Sigma } from 'lucide-react';
import {
  MATH_FORMULA_SHEETS,
  LITERATURE_EXAM_MATRIX,
  SCIENCE_CONSTANTS
} from '../data/monFormulaSheets';
import { NVO10_MATH_FORMULAS } from '../data/formulaSheets/nvo10Math';
import { DZI_MATH_FORMULAS } from '../data/formulaSheets/dziMath';
import { FormulaSheetBrowser, FormulaSheetSource } from './exam-engine/FormulaSheetPanel';

interface MonFormulaSheetsModalProps {
  onClose: () => void;
}

export const MonFormulaSheetsModal: React.FC<MonFormulaSheetsModalProps> = ({ onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeTab, setActiveTab] = useState<'official' | 'official-dzi' | 'math' | 'literature' | 'science' | 'posters'>('official');
  // Официалните листове на МОН — същото съдържание като панела „Формули“ в изпитите
  const officialSheet = activeTab === 'official' ? NVO10_MATH_FORMULAS : activeTab === 'official-dzi' ? DZI_MATH_FORMULAS : null;
  const isOfficial = officialSheet !== null;
  const [selectedPoster, setSelectedPoster] = useState<'bel_dzi' | 'math_all' | 'history_dates' | 'civics_eu' | 'dippk_stem'>('bel_dzi');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!('closedBy' in HTMLDialogElement.prototype) && event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      const clickedInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;
      if (!clickedInDialog) {
        onClose();
      }
    }
  };

  // Esc и light-dismiss (closedby="any") минават през синхронния 'cancel' —
  // затваряме веднага, без да чакаме асинхронния 'close'
  const handleDialogCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

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
    <dialog
      ref={dialogRef}
      aria-labelledby="mon-formula-sheets-title"
      onCancel={handleDialogCancel}
      onClose={onClose}
      onClick={handleDialogClick}
      {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      className="m-auto w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-0 backdrop:bg-black/40 backdrop:backdrop-blur-xs open:flex flex-col max-h-[90vh]"
    >
      <div className="relative w-full flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isOfficial ? 'Официален лист на МОН' : 'Справочник на StudyBG'}</span>
            </div>
            <h2 id="mon-formula-sheets-title" className="text-xl sm:text-2xl font-bold text-slate-900">
              Справочник с формули, матрици и A4 Табла за Стена
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Официалните листове с формули на МОН за НВО в X клас и за ДЗИ по математика и справочниците на StudyBG: формули, литературни матрици и A4 табла за печат.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isOfficial && (
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Принтирай A4</span>
            </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
              aria-label="Затвори"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar & Segmented Tabs */}
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          
          {/* Segmented Controls */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-white border border-slate-200 w-full sm:w-auto shadow-2xs">
            {([['official', 'НВО 10 — лист на МОН'], ['official-dzi', 'ДЗИ — лист на МОН']] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-pressed={activeTab === id}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sigma className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}

            <button
              onClick={() => setActiveTab('math')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'math'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Математика (StudyBG)</span>
            </button>

            <button
              onClick={() => setActiveTab('literature')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
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
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'science'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>STEM & ДИППК</span>
            </button>

            <button
              onClick={() => setActiveTab('posters')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'posters'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>A4 Табла за Стена (5)</span>
            </button>
          </div>

          {/* Quick Search */}
          {!isOfficial && (
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
          )}

        </div>

        {/* Официалният лист на МОН — същото съдържание като панела „Формули“ в изпита */}
        {officialSheet && (
          <div className="flex h-[70vh] min-h-0 flex-col bg-slate-50/60 pt-4">
            <FormulaSheetBrowser key={officialSheet.id} sheet={officialSheet} padX="px-5 sm:px-6" />
          </div>
        )}

        {/* Content Body */}
        {!isOfficial && (
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
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : item.subject === 'Химия'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : item.subject === 'Биология'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
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

          {/* PRINTABLE A4 WALL POSTERS TAB */}
          {activeTab === 'posters' && (
            <div className="space-y-5">
              {/* Poster Selector Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 print:hidden">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'bel_dzi', label: '1. Табло БЕЛ ДЗИ (9 блока / 27 творби)' },
                    { id: 'math_all', label: '2. Табло Математика (НВО & ДЗИ)' },
                    { id: 'history_dates', label: '3. Табло История (681–2007 г.)' },
                    { id: 'civics_eu', label: '4. Табло Конституция & ЕС' },
                    { id: 'dippk_stem', label: '5. Табло ДИППК & Трета СПК (Професии)' }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPoster(p.id as 'bel_dzi' | 'math_all' | 'history_dates' | 'civics_eu' | 'dippk_stem')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedPoster === p.id
                          ? 'bg-brand-sapphire text-white shadow-xs'
                          : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Принтирай това A4 табло</span>
                </button>
              </div>

              {/* POSTER 1: BEL DZI 27 WORKS & 9 THEMATIC BLOCKS */}
              {selectedPoster === 'bel_dzi' && (
                <div className="border border-slate-900 rounded-xl p-5 bg-white space-y-4">
                  <div className="text-center border-b-2 border-slate-900 pb-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      StudyBG • Едностранично A4 Табло за Стена • ДЗИ Български език и литература (11.–12. клас)
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif mt-0.5">
                      Пълна Матрица на 9-те Тематични Блока за Матурата по БЕЛ (Задача 41)
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-blue-50 text-slate-900">
                          <th className="p-2 border border-slate-700">Тематичен блок (11.–12. кл.)</th>
                          <th className="p-2 border border-slate-700">Задължителни произведения и автори</th>
                          <th className="p-2 border border-slate-700">Жанрове & Ключова теза за 6.00</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-2 font-bold text-slate-900 border border-slate-200">1. Родното и чуждото</td>
                          <td className="p-2 border border-slate-200">„Железният светилник“ (Д. Талев), „Бай Ганьо журналист“ (Ал. Константинов), „Балкански синдром“ (Ст. Стратиев)</td>
                          <td className="p-2 border border-slate-200">Роман, фейлетон, комедия • Домът и родът срещу духовната деформация и криворазбраната модернизация</td>
                        </tr>
                        <tr className="bg-slate-50/70">
                          <td className="p-2 font-bold text-slate-900 border border-slate-200">2. Миналото и паметта</td>
                          <td className="p-2 border border-slate-200">„Паисий“ (Ив. Вазов), „История“ (Н. Вапцаров), „Ноев ковчег“ (Й. Радичков)</td>
                          <td className="p-2 border border-slate-200">Ода, стихотворение, роман • Историческата памет като спасителен ковчег на духа</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold text-slate-900 border border-slate-200">3. Обществото и властта</td>
                          <td className="p-2 border border-slate-200">„Борба“ (Хр. Ботев), „Андрешко“ (Елин Пелин), „Приказка за стълбата“ (Хр. Смирненски)</td>
                          <td className="p-2 border border-slate-200">Стихотворение, разказ, алегория • Бунтът срещу тиранията и моралната слепота на властта</td>
                        </tr>
                        <tr className="bg-slate-50/70">
                          <td className="p-2 font-bold text-slate-900 border border-slate-200">4. Животът и смъртта</td>
                          <td className="p-2 border border-slate-200">„До моето първо либе“ (Хр. Ботев), „Новото гробище над Сливница“ (Ив. Вазов), „Крадецът на праскови“ (Ем. Станев)</td>
                          <td className="p-2 border border-slate-200">Елегия/ода, повест • Героичната саможертва и спасителната сила на любовта по време на война</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold text-slate-900 border border-slate-200">5. Природата</td>
                          <td className="p-2 border border-slate-200">„При Рилския манастир“ (Ив. Вазов), „Градушка“ (П. Яворов), „Спи езерото“ (П. П. Славейков)</td>
                          <td className="p-2 border border-slate-200">Стихотворение, поема, лирическа миниатюра • Природата като храм, стихия и огледало на съзерцанието</td>
                        </tr>
                        <tr className="bg-slate-50/70">
                          <td className="p-2 font-bold text-slate-900 border border-slate-200">6. Любовта</td>
                          <td className="p-2 border border-slate-200">„Аз искам да те помня все така...“ (Д. Дебелянов), „Колко си хубава!“ (Хр. Фотев), „Посвещение“ (П. Дубарова)</td>
                          <td className="p-2 border border-slate-200">Елегия, интимна лирика • Любовта като вечен духовен спомен, преображение и младежко доверие</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold text-slate-900 border border-slate-200">7. Вярата и надеждата</td>
                          <td className="p-2 border border-slate-200">„Молитва“ (Ат. Далчев), „Вяра“ (Н. Вапцаров), „Спасова могила“ (Елин Пелин)</td>
                          <td className="p-2 border border-slate-200">Стихотворение, разказ • Екзистенциалната вяра в живота и страданието, търсещо чудо</td>
                        </tr>
                        <tr className="bg-slate-50/70">
                          <td className="p-2 font-bold text-slate-900 border border-slate-200">8. Трудът и творчеството</td>
                          <td className="p-2 border border-slate-200">„Песента на колелетата“ (Й. Йовков), „Балада за Георг Хених“ (В. Пасков), „Честен кръст“ (Б. Христов)</td>
                          <td className="p-2 border border-slate-200">Разказ, повест, поема • Творчеството като благословия (себап) и съпротива срещу бездуховността</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold text-slate-900 border border-slate-200">9. Изборът и раздвоението</td>
                          <td className="p-2 border border-slate-200">„Две души“ (П. Яворов), „Потомка“ (Ел. Багряна), „Нежната спирала“ (Й. Радичков)</td>
                          <td className="p-2 border border-slate-200">Стихотворение, разказ • Драматичното раздвоение на модерния човек и свободният нравствен избор</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* POSTER 2: MATH ALL-IN-ONE A4 POSTER */}
              {selectedPoster === 'math_all' && (
                <div className="border border-slate-900 rounded-xl p-5 bg-white space-y-4">
                  <div className="text-center border-b-2 border-slate-900 pb-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      StudyBG • Едностранично A4 Табло за Стена • Математика (НВО 7. & 10. клас и ДЗИ)
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif mt-0.5">
                      Златни Формули по Алгебра, Тригонометрия и Геометрия на 1 лист
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl border border-slate-300 space-y-1.5">
                      <h4 className="font-bold text-blue-900 uppercase">1. Формули за съкратено умножение (7. клас)</h4>
                      <div className="font-mono space-y-1 text-slate-800">
                        <div>(a ± b)² = a² ± 2ab + b²</div>
                        <div>a² - b² = (a - b)(a + b)</div>
                        <div>(a ± b)³ = a³ ± 3a²b + 3ab² ± b³</div>
                        <div>a³ ± b³ = (a ± b)(a² ∓ ab + b²)</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-300 space-y-1.5">
                      <h4 className="font-bold text-blue-900 uppercase">2. Квадратно уравнение & Формули на Виет (8. клас)</h4>
                      <div className="font-mono space-y-1 text-slate-800">
                        <div>ax² + bx + c = 0 (a ≠ 0), D = b² - 4ac</div>
                        <div>x₁,₂ = (-b ± √D) / (2a)</div>
                        <div>Виет: x₁ + x₂ = -b / a  |  x₁ · x₂ = c / a</div>
                        <div>Връх на парабола: x_v = -b / (2a)</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-300 space-y-1.5">
                      <h4 className="font-bold text-blue-900 uppercase">3. Аритметична и Геометрична прогресия (10. клас)</h4>
                      <div className="font-mono space-y-1 text-slate-800">
                        <div>АП: a_n = a₁ + (n - 1)d  |  S_n = ((a₁ + a_n)/2) · n</div>
                        <div>Свойство АП: 2a_k = a_{'{k-1}'} + a_{'{k+1}'}</div>
                        <div>ГП: b_n = b₁ · q^(n - 1) | S_n = b₁(q^n - 1)/(q - 1)</div>
                        <div>Свойство ГП: b_k² = b_{'{k-1}'} · b_{'{k+1}'}</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-300 space-y-1.5">
                      <h4 className="font-bold text-blue-900 uppercase">4. Тригонометрия и Теореми в триъгълник (9.–10. клас)</h4>
                      <div className="font-mono space-y-1 text-slate-800">
                        <div>sin² α + cos² α = 1  |  tg α = sin α / cos α</div>
                        <div>sin 30° = 1/2 | sin 45° = √2 / 2 | sin 60° = √3 / 2</div>
                        <div>Синусова т-ма: a / sin α = b / sin β = 2R</div>
                        <div>Косинусова т-ма: c² = a² + b² - 2ab · cos γ</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* POSTER 3: HISTORY DATES 681-2007 A4 POSTER */}
              {selectedPoster === 'history_dates' && (
                <div className="border border-slate-900 rounded-xl p-5 bg-white space-y-4">
                  <div className="text-center border-b-2 border-slate-900 pb-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      StudyBG • Едностранично A4 Табло за Стена • История и цивилизации (НВО & ДЗИ)
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif mt-0.5">
                      Златна Хронология на Българската История (681 – 2007 г.)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {[
                      ['681 г.', 'Създаване на Дунавска България (хан Аспарух) — мирен договор с Византия'],
                      ['716 г.', 'Договор на хан Тервел с Византия (областта Загоре, данък и първи търговски клаузи)'],
                      ['864 г.', 'Покръстване на българите при княз Борис I Покръстител'],
                      ['886 г.', 'Княз Борис I приема учениците на Кирил и Методий (Климент, Наум, Ангеларий)'],
                      ['893 г.', 'Преславски народен събор — старобългарският език става официален, Симеон поема трона'],
                      ['917 г.', 'Битката при р. Ахелой — блестяща победа на цар Симеон Велики'],
                      ['1018 г.', 'Падане на България под византийска власт при император Василий II'],
                      ['1185 г.', 'Въстание на Асен и Петър в Търново — възстановяване на българската държава'],
                      ['1205 г.', 'Битката при Одрин — цар Калоян разгромява кръстоносците на имп. Балдуин I'],
                      ['9 март 1230 г.', 'Битката при Клокотница — цар Иван Асен II побеждава Теодор Комнин'],
                      ['1762 г.', 'Паисий Хилендарски завършва „История славянобългарска“ — начало на Възраждането'],
                      ['28 февр. 1870 г.', 'Султански ферман за учредяване на самостоятелна Българска екзархия'],
                      ['Април 1876 г.', 'Априлско въстание — връх на българското националноосвободително движение'],
                      ['3 март 1878 г.', 'Санстефански прелиминарен договор — възстановяване на Третата българска държава'],
                      ['16 април 1879 г.', 'Приемане на Търновската конституция от Учредителното събрание'],
                      ['6 септ. 1885 г.', 'Съединение на Княжество България и Източна Румелия в Пловдив'],
                      ['22 септ. 1908 г.', 'Провъзгласяване на Независимостта на България във Велико Търново'],
                      ['7 септ. 1940 г.', 'Крайовска спогодба — мирно връщане на Южна Добруджа на България'],
                      ['12 юли 1991 г.', 'Приемане на действащата Конституция на Република България от VII ВНС'],
                      ['29 март 2004 / 1 ян. 2007', 'Членство на Република България в НАТО (2004 г.) и в Европейския съюз (2007 г.)']
                    ].map(([year, event], idx) => (
                      <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-start gap-2.5">
                        <span className="font-mono font-bold text-blue-800 shrink-0 min-w-[95px]">{year}</span>
                        <span className="text-slate-800">{event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* POSTER 4: CIVICS & EU A4 POSTER */}
              {selectedPoster === 'civics_eu' && (
                <div className="border border-slate-900 rounded-xl p-5 bg-white space-y-4">
                  <div className="text-center border-b-2 border-slate-900 pb-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      StudyBG • Едностранично A4 Табло за Стена • Гражданско образование и Философия
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif mt-0.5">
                      Разделение на властите в Република България и Институции на ЕС
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl border border-slate-300 space-y-2">
                      <h4 className="font-bold text-blue-900 uppercase">Конституция на РБ (1991 г.) — Държавни органи</h4>
                      <ul className="space-y-1.5 text-slate-800">
                        <li><strong>Народно събрание (Законодателна власт):</strong> 240 депутати (4 г. мандат). Гласува закони, бюджета и избира/освобождава МС. Велико НС = 400 депутати.</li>
                        <li><strong>Министерски съвет (Изпълнителна власт):</strong> Премиер и министри. Ръководи вътрешната и външната политика, приема постановления.</li>
                        <li><strong>Съдебна власт (Независима):</strong> Съдилища (ВКС, ВАС), Прокуратура и Следствие; кадрови орган — ВСС.</li>
                        <li><strong>Президент на РБ (Държавен глава):</strong> Пряк избор за 5 г. Върховен главнокомандващ, обнародва законите, има <strong>отлагателно вето</strong> (преодолява се с &gt;120 гласа).</li>
                        <li><strong>Конституционен съд:</strong> 12 съдии (9 г. мандат, без повторен избор). Тълкува Конституцията и обявява закони за противоконституционни.</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-300 space-y-2">
                      <h4 className="font-bold text-blue-900 uppercase">Институционален триъгълник на Европейския съюз</h4>
                      <ul className="space-y-1.5 text-slate-800">
                        <li><strong>Европейска комисия (Брюксел):</strong> 27 комисари (1 от България). Изпълнителен орган, <strong>единствен има законодателна инициатива</strong>.</li>
                        <li><strong>Европейски парламент (Страсбург/Брюксел):</strong> 720 пряко избрани евродепутати (<strong>17 от България</strong>). Съзаконодател заедно със Съвета на ЕС.</li>
                        <li><strong>Съвет на ЕС (Брюксел):</strong> Националните министри по ресори от 27-те страни членки. Приема законите и бюджета заедно с ЕП.</li>
                        <li><strong>Европейски съвет (Брюксел):</strong> Лидерите (премиери/президенти) на 27-те държави. Задава политическата стратегия (НЕ приема закони).</li>
                        <li><strong>Съд на ЕС (Люксембург) vs. ЕСПЧ (Страсбург):</strong> СЕС в Люксембург е съдът на ЕС; ЕСПЧ в Страсбург е орган на <em>Съвета на Европа</em> (46 държави).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* POSTER 5: DIPPK & VOCATIONAL THIRD SPK A4 POSTER */}
              {selectedPoster === 'dippk_stem' && (
                <div className="border border-slate-900 rounded-xl p-5 bg-white space-y-4">
                  <div className="text-center border-b-2 border-slate-900 pb-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      StudyBG • Едностранично A4 Табло за Стена • ДИППК (Трета СПК — Професионални Гимназии)
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif mt-0.5">
                      Златни Инженерни, ИТ, Финансови и Строителни Еталони за Дипломна Защита
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl border border-slate-300 space-y-1.5">
                      <h4 className="font-bold text-blue-900 uppercase">1. Софтуер, Мрежи, Криптография & БД</h4>
                      <div className="space-y-1 text-slate-800">
                        <div><strong>Криптография:</strong> AES-256-GCM (симетричен), RSA / ECC (асиметричен), Argon2id (хеширане на пароли със сол).</div>
                        <div><strong>Мрежи (CIDR):</strong> /24 = 254 хоста (255.255.255.0); /26 = 62 хоста (.192); /30 = 2 хоста (.252).</div>
                        <div><strong>Бази данни (3NF):</strong> Всеки неключов атрибут зависи само от целия първичен ключ (ACID транзакции).</div>
                        <div><strong>SLA Наличност:</strong> R = 1 - Π(1 - R_i) при паралелен клъстер; 99,99% = макс. 52,6 min престой/година.</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-300 space-y-1.5">
                      <h4 className="font-bold text-emerald-900 uppercase">2. Счетоводство, Банково дело, Финтех & Митници</h4>
                      <div className="space-y-1 text-slate-800">
                        <div><strong>Балансово равенство:</strong> Активи (ДМА + КМА) = Собствен капитал + Пасиви (Задължения).</div>
                        <div><strong>Рентабилност:</strong> ROE = Нетна печалба / СК · 100%  |  ROA = Нетна печалба / Активи · 100%.</div>
                        <div><strong>Кредити и Карти:</strong> ГПР включва лихва + всички такси; Кредитен скоринг (PD, LGD, DTI ≤ 40%).</div>
                        <div><strong>Митнически контрол:</strong> Мито = Митническа стойност (CIF) · %; ДДС = 20% върху (CIF + Мито + Акциз).</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-300 space-y-1.5">
                      <h4 className="font-bold text-blue-900 uppercase">3. Архитектура, BIM, Геодезия & Строителство</h4>
                      <div className="space-y-1 text-slate-800">
                        <div><strong>Еврокод 2 (ULS):</strong> Изчислителен товар q_d = 1,35·g_k + 1,50·q_k; Макс. момент M_max = q·L² / 8.</div>
                        <div><strong>Геодезия (Права задача):</strong> ΔX = S · cos α, ΔY = S · sin α (оста +X е на Север, α е дирекционен ъгъл).</div>
                        <div><strong>BIM Координация:</strong> LOD 100–500, IFC (ISO 16739), Clash Detection (Hard / Soft / 4D колизии).</div>
                        <div><strong>Топлотехника:</strong> Коефициент на топлопреминаване U = 1 / R_tot [W/(m²·K)], точка на оросяване.</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-300 space-y-1.5">
                      <h4 className="font-bold text-amber-900 uppercase">4. Енергетика (ВВЕР-1000), Металургия & Транспорт</h4>
                      <div className="space-y-1 text-slate-800">
                        <div><strong>Ядрен реактор ВВЕР-1000:</strong> Двуконтурен с вода под налягане (15,7 MPa), Q_т = 3000 MW, P_ел = 1000 MW (η ≈ 33,3%).</div>
                        <div><strong>Оптични влакна:</strong> Числова апертура NA = √(n₁² - n₂²); прозорци 1310 nm и 1550 nm (0,2 dB/km).</div>
                        <div><strong>Авиация & Навигация:</strong> L = ½·ρ·v²·S·C_L; Число на Мах M = v / a; КК = ИК - Δ_м - δ_к (COLREGs).</div>
                        <div><strong>Диаграма Fe–Fe₃C:</strong> Стомани (&lt; 2,14% C, евтектоид перлит при 0,77% C / 727°C) vs. Чугуни (2,14–6,67% C).</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
        )}

        {/* Modal Footer */}
        {officialSheet ? (
          <FormulaSheetSource sheet={officialSheet} className="p-4 border-t border-slate-200 bg-slate-50 flex-shrink-0" />
        ) : (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs text-slate-500 flex-shrink-0">
            <span>Справочник на StudyBG за НВО и ДЗИ. Официалните листове на МОН са в първите два раздела.</span>
            <span className="hidden sm:inline">Esc или клик извън прозореца — затваряне</span>
          </div>
        )}

      </div>
    </dialog>
  );
};
