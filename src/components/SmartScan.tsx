import React, { useState } from 'react';
import { FileText, X, Edit3, Image as ImageIcon, CheckCircle2, ShieldCheck, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import type { LessonData } from '../types';
import { classifyAndDiagnoseNotebook, type NotebookDiagnosis } from '../services/curriculumClassifier';
import { extractNotebookTextWithGemini, isGeminiConfigured } from '../services/geminiService';

interface SmartScanProps {
  onScanComplete: (lesson: LessonData, diagnosis?: NotebookDiagnosis) => void;
  onClose?: () => void;
  sampleLessons: LessonData[];
}

export const SmartScan: React.FC<SmartScanProps> = ({ onScanComplete, onClose, sampleLessons }) => {
  const hasGemini = isGeminiConfigured();
  const [activeMode, setActiveMode] = useState<'upload' | 'paste' | 'samples'>(hasGemini ? 'upload' : 'paste');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [unmatchedError, setUnmatchedError] = useState<string | null>(null);

  // Manual paste state
  const [customTitle, setCustomTitle] = useState('');
  const [customSubject, setCustomSubject] = useState('История и цивилизации');
  const [customText, setCustomText] = useState('');

  const processText = (textToAnalyze: string, filename: string, lessonFallback?: LessonData) => {
    setUnmatchedError(null);
    setIsScanning(true);
    setScanStep('Анализ на понятията спрямо стандартите на МОН...');

    try {
      const diagnosis = classifyAndDiagnoseNotebook(textToAnalyze, filename);
      setIsScanning(false);

      if (diagnosis.isMatched || lessonFallback) {
        onScanComplete(lessonFallback || diagnosis.lessonData, diagnosis);
      } else {
        setUnmatchedError(`Не открихме конкретна тема от учебната програма за въведения текст („${filename}“). Моля изберете тема от образците по-долу.`);
      }
    } catch (e) {
      setIsScanning(false);
      setUnmatchedError('Възникна грешка при обработката на текста. Моля опитайте отново.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUnmatchedError(null);

    // If file is text or markdown, read directly
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string;
        processText(content, file.name);
      };
      reader.readAsText(file);
      return;
    }

    // If image and Gemini is configured
    if (hasGemini && file.type.startsWith('image/')) {
      setIsScanning(true);
      setScanStep('Google Gemini OCR разпознава ръкописа от снимката...');
      try {
        const geminiExtracted = await extractNotebookTextWithGemini(file);
        setScanStep('Съпоставка с учебната програма на МОН...');
        const diagnosis = classifyAndDiagnoseNotebook(geminiExtracted, file.name);
        setIsScanning(false);
        onScanComplete(diagnosis.lessonData, diagnosis);
      } catch (err) {
        setIsScanning(false);
        setUnmatchedError('Неуспешно разпознаване на изображението. Моля въведете текста ръчно.');
      }
      return;
    }

    // If image without Gemini API key, prompt user honestly
    if (file.type.startsWith('image/') || file.type.includes('pdf')) {
      setUnmatchedError('За живо разпознаване на снимка от камера е необходим Gemini API ключ. Можете веднага да въведете текста от записките си в таб „Въвеждане на текст“ или да изберете тема от готовите образци.');
      setActiveMode('paste');
      setCustomTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    const fullContent = `${customTitle} ${customSubject}\n${customText}`;
    processText(fullContent, customTitle || 'Въведени записки');
  };

  const featuredSamples = sampleLessons.slice(0, 6);

  return (
    <div className="relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all z-10"
          aria-label="Затвори"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Одит на записки по стандартите на МОН</span>
          </div>
          {hasGemini && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Google Gemini Vision активен</span>
            </div>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Сравнете записките си с програмата на МОН
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Въведете текст от вашата тетрадка или изберете готова тема, за да проверите дали записките ви съдържат задължителните термини за пълно отличие.
        </p>
      </div>

      {/* Unmatched Alert Banner */}
      {unmatchedError && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">{unmatchedError}</p>
          </div>
        </div>
      )}

      {/* Mode Switcher */}
      {!isScanning && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveMode('paste')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'paste'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Въвеждане на текст</span>
          </button>

          <button
            onClick={() => setActiveMode('samples')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'samples'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Готови образци на МОН</span>
          </button>

          <button
            onClick={() => setActiveMode('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'upload'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Качване на файл / снимка</span>
          </button>
        </div>
      )}

      {/* Scanning State */}
      {isScanning && (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 animate-pulse">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-sm font-bold text-slate-900 mb-1">{scanStep}</div>
          <p className="text-xs text-slate-500">Моля изчакайте секунда...</p>
        </div>
      )}

      {/* Mode 1: Paste Text */}
      {!isScanning && activeMode === 'paste' && (
        <form onSubmit={handlePasteSubmit} className="space-y-4 max-w-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Заглавие на урока
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="напр. Априлско въстание, Една българка..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Учебен предмет
              </label>
              <select
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
              >
                <option value="История и цивилизации">История и цивилизации</option>
                <option value="Български език и литература">Български език и литература</option>
                <option value="Математика">Математика</option>
                <option value="Биология и ЗО">Биология и ЗО</option>
                <option value="Химия и ООС">Химия и ООС</option>
                <option value="Физика и астрономия">Физика и астрономия</option>
                <option value="География и икономика">География и икономика</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Текст от тетрадката / бележките
            </label>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Поставете или въведете записките си тук (дати, имена, дефиниции, събития)..."
              rows={6}
              required
              className="w-full p-3.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!customText.trim()}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs disabled:opacity-50"
            >
              Сравни със стандартите на МОН
            </button>
          </div>
        </form>
      )}

      {/* Mode 2: Sample Lessons */}
      {!isScanning && activeMode === 'samples' && (
        <div className="max-w-2xl mx-auto">
          <div className="text-xs font-semibold text-slate-600 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Изберете официална тема от каталога за незабавен одит:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {featuredSamples.map((sample) => (
              <button
                key={sample.id}
                onClick={() => processText(sample.summary.overview + ' ' + sample.originalNoteExcerpt, sample.title, sample)}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 text-left transition-all shadow-2xs group"
              >
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600 group-hover:bg-blue-50 transition-all flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-900 truncate">
                    {sample.title}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">
                    {sample.subject} • {sample.grade}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mode 3: Upload File */}
      {!isScanning && activeMode === 'upload' && (
        <div className="max-w-xl mx-auto">
          <label className="group relative block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-600 bg-slate-50/60 hover:bg-blue-50/20 p-8 sm:p-10 text-center transition-all">
            <input
              type="file"
              accept="image/*,application/pdf,text/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="w-14 h-14 mx-auto mb-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-blue-600 group-hover:scale-105 transition-all">
              <ImageIcon className="w-7 h-7" />
            </div>

            <div className="text-sm font-semibold text-slate-900 mb-1">
              Изберете файл от устройството или <span className="text-blue-600 underline underline-offset-4">качете документ</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Поддържа: TXT, Markdown, снимки (JPG, PNG) и сканирани документи.
            </p>
          </label>

          {!hasGemini && (
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
              <strong>Бележка:</strong> За моментално разпознаване на български ръкопис директно от снимка е необходим свързан Google Gemini ключ в настройките. Можете да въведете текста на бележките си веднага в раздел „Въвеждане на текст“.
            </div>
          )}
        </div>
      )}

    </div>
  );
};
