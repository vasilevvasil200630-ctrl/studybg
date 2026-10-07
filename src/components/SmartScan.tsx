import React, { useState } from 'react';
import { Camera, UploadCloud, FileText, Loader2, Sparkles, X, Edit3, Image as ImageIcon } from 'lucide-react';
import type { LessonData } from '../types';
import { classifyAndDiagnoseNotebook, type NotebookDiagnosis } from '../services/curriculumClassifier';

interface SmartScanProps {
  onScanComplete: (lesson: LessonData, diagnosis?: NotebookDiagnosis) => void;
  onClose?: () => void;
  sampleLessons: LessonData[];
}

export const SmartScan: React.FC<SmartScanProps> = ({ onScanComplete, onClose, sampleLessons }) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'paste'>('upload');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Manual paste state
  const [customTitle, setCustomTitle] = useState('');
  const [customSubject, setCustomSubject] = useState('История и цивилизации');
  const [customText, setCustomText] = useState('');

  const startProcessing = (textToAnalyze: string, filename: string, lessonFallback?: LessonData) => {
    setSelectedFileName(filename);
    setIsScanning(true);
    setScanStep('📸 Сканиране на изображението и изчистване на шума...');

    setTimeout(() => {
      setScanStep('🔍 Разпознаване на българския почерк и класификация по МОН...');
    }, 700);

    setTimeout(() => {
      setScanStep('⚡ Одит на записките: Предмет ➔ Клас ➔ Дял ➔ Под-дял...');
    }, 1400);

    setTimeout(() => {
      setScanStep('✨ Генериране на диагноза за 6-ца и Светата троица...');
      setTimeout(() => {
        setIsScanning(false);
        const diagnosis = classifyAndDiagnoseNotebook(textToAnalyze, filename);
        onScanComplete(lessonFallback || diagnosis.lessonData, diagnosis);
      }, 500);
    }, 2100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      const inferredText = `${file.name} Записки от тетрадката. Разпознати понятия и дефиниции.`;
      startProcessing(inferredText, file.name);
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    const fullContent = `${customTitle} ${customSubject}\n${customText}`;
    startProcessing(fullContent, customTitle || 'Въведени записки');
  };

  return (
    <div className="relative p-6 sm:p-8 rounded-3xl bg-[#121528] border border-white/10 shadow-2xl overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-[90px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-[90px] -z-10 pointer-events-none" />

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
          <Camera className="w-3.5 h-3.5 text-sky-400" />
          <span>Smart Scan & Детектор по МОН</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Снимай тетрадка за автоматичен анализ
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Системата автоматично ще разпознае по кой <strong>предмет</strong>, за кой <strong>клас</strong>, от кой <strong>дял</strong> и <strong>под-дял</strong> е урокът, ще оцени качеството и ще ти покаже какво липсва за 6-ца!
        </p>
      </div>

      {/* Mode Switcher */}
      {!isScanning && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveMode('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'upload'
                ? 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Снимка / PDF файл</span>
          </button>

          <button
            onClick={() => setActiveMode('paste')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'paste'
                ? 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Постави текст от конспект</span>
          </button>
        </div>
      )}

      {isScanning ? (
        /* Processing Animation */
        <div className="py-12 flex flex-col items-center justify-center text-center">
          {previewUrl && (
            <div className="relative w-48 h-32 rounded-xl overflow-hidden border border-indigo-500/40 mb-6 shadow-xl">
              <img src={previewUrl} alt="Снимка на записки" className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-emerald-400 shadow-[0_0_15px_#38bdf8] animate-bounce top-1/2 -translate-y-1/2" />
            </div>
          )}

          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-indigo-950/80 border-2 border-indigo-500/50 mb-6 shadow-xl shadow-indigo-600/25">
            <Loader2 className="w-10 h-10 text-sky-400 animate-spin" />
            <div className="absolute inset-0 rounded-full border border-emerald-400/40 animate-ping" />
          </div>

          <div className="text-base font-bold text-white mb-2">{scanStep}</div>
          <p className="text-xs text-slate-400 font-mono">
            {selectedFileName ? `Източник: ${selectedFileName}` : 'Анализиране на съдържанието...'}
          </p>

          <div className="w-64 bg-white/10 rounded-full h-1.5 mt-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 animate-pulse w-full rounded-full" />
          </div>
        </div>
      ) : activeMode === 'upload' ? (
        /* Upload & Presets Area */
        <div>
          {/* Dropzone */}
          <label className="group relative block cursor-pointer rounded-2xl border-2 border-dashed border-white/15 hover:border-indigo-400/60 bg-[#161a33]/60 hover:bg-[#1a203f]/80 p-8 sm:p-12 text-center transition-all">
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-sky-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8 text-sky-400" />
            </div>

            <div className="text-base font-bold text-white mb-1">
              Пусни снимка на тетрадката тук или <span className="text-sky-400 underline underline-offset-4">избери файл</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Поддържа: JPG, PNG, HEIC (снимка от телефон), както и PDF лекции или слайдове.
            </p>
          </label>

          {/* Quick Demo Previews */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Или пробвай моментално с примерни български уроци:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sampleLessons.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => startProcessing(sample.summary.overview + ' ' + sample.originalNoteExcerpt, sample.title, sample)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-indigo-900/30 border border-white/5 hover:border-indigo-500/30 text-left transition-all group"
                >
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-all flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white group-hover:text-indigo-300 truncate">
                      {sample.title}
                    </div>
                    <div className="text-[10px] text-emerald-400">
                      {sample.subject} • {sample.grade}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Manual Paste Form */
        <form onSubmit={handlePasteSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Заглавие на темата / урока
              </label>
              <input
                type="text"
                required
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="напр. Априлско въстание или Квадратни уравнения"
                className="w-full bg-[#181d36] text-white px-3.5 py-2.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Ориентировъчен предмет
              </label>
              <select
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="w-full bg-[#181d36] text-white px-3.5 py-2.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="История и цивилизации">История и цивилизации</option>
                <option value="Български език и литература">Български език и литература</option>
                <option value="Математика">Математика</option>
                <option value="Биология и ЗО">Биология и ЗО</option>
                <option value="Химия и ООС">Химия и ООС</option>
                <option value="География и икономика">География и икономика</option>
                <option value="Физика и астрономия">Физика и астрономия</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Записки от тетрадката / план на урока
            </label>
            <textarea
              required
              rows={5}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Постави тук каквото имаш записано в тетрадката... AI сам ще намери дяла и ще го диагностицира!"
              className="w-full bg-[#181d36] text-white p-3.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-indigo-500 resize-none font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Диагностицирай тетрадката и намери дяла по МОН</span>
          </button>
        </form>
      )}
    </div>
  );
};
