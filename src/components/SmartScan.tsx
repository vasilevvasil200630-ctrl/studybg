import React, { useState, useEffect } from 'react';
import {
  FileText,
  X,
  Edit3,
  Image as ImageIcon,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  BookOpen,
  AlertCircle,
  KeyRound,
  Check,
  RefreshCw,
  Clipboard,
  ExternalLink,
  Eye,
  EyeOff,
  Settings,
  ArrowRight,
  Zap,
  Award
} from 'lucide-react';
import type { LessonData } from '../types';
import { classifyAndDiagnoseNotebook, type NotebookDiagnosis } from '../services/curriculumClassifier';
import {
  extractNotebookTextWithGemini,
  isGeminiConfigured,
  isAiProxyCandidate,
  getActiveGeminiApiKey,
  setStoredGeminiApiKey,
  removeStoredGeminiApiKey,
  testGeminiApiKey,
  AI_PROVIDER_LABEL
} from '../services/geminiService';

interface SmartScanProps {
  onScanComplete: (lesson: LessonData, diagnosis?: NotebookDiagnosis) => void;
  onClose?: () => void;
  sampleLessons: LessonData[];
}

const PRESET_TEMPLATES = [
  {
    label: 'ДЗИ 12. кл. БЕЛ (Тютюн / Димов)',
    badge: 'ДЗИ 12',
    title: 'Романът „Тютюн“ на Димитър Димов: моралният разпад и цената на успеха',
    subject: 'Български език и литература',
    text: `В романа „Тютюн“ на Димитър Димов светът на холдинга „Никотиана“ е символ на алчността, която разяжда човешкото достойнство. Борис Морев жертва любовта си към Ирина в името на парите и властта. Ирина извървява пътя от чиста идеалистка до цинична любовница и съучастничка на фон Гайер. Трагичният разпад на личността разкрива духовната криза на буржоазния елит в предвоенна България.`
  },
  {
    label: 'ДЗИ 12. кл. История (Априлско въстание)',
    badge: 'ДЗИ 12',
    title: 'Априлското въстание 1876 г.: подготовка, избухване и международен отзвук',
    subject: 'История и цивилизации',
    text: `Априлското въстание избухва преждевременно на 20 април 1876 г. в Копривщица с Кървавото писмо на Тодор Каблешков. Решението за въстанието е взето от Гюргевския революционен комитет (ноември-декември 1875 г.). Създадени са 4 революционни окръга: Търновски (Стефан Стамболов), Сливенски (Иларион Драгостинов), Врачански (Стоян Заимов) и Пловдивски/Панагюрски (Панайот Волов и Георги Бенковски). Оборище, Хвърковатата чета и Баташкото клане предизвикват Цариградската конференция и Освободителната война.`
  },
  {
    label: 'НВО 10. кл. История (Симеон Велики)',
    badge: 'НВО 10',
    title: 'Златният век на цар Симеон Велики: военен триумф и Преславска книжовна школа',
    subject: 'История и цивилизации',
    text: `Управлението на Симеон Велики (893–927 г.) бележи връх на Първото българско царство. Военните му победи при Булгарофигон (896 г.) и Ахелой (917 г.) превръщат България в най-мощната държава в Югоизточна Европа. Симеон приема титлата „василевс на българи и ромеи“. Златният век на българската култура процъфтява в новата столица Велики Преслав чрез книжовното дело на Йоан Екзарх, Константин Преславски и Черноризец Храбър.`
  },
  {
    label: 'НВО 10. кл. Мат. (Виет & параметри)',
    badge: 'НВО 10',
    title: 'Квадратни уравнения, формули на Виет и разлагане на квадратни тричлени',
    subject: 'Математика',
    text: `Квадратното уравнение ax^2 + bx + c = 0 (a ≠ 0) има дискриминанта D = b^2 - 4ac. При D > 0 уравнението има два различни реални корена: x1,2 = (-b ± √D) / (2a). По формулите на Франсоа Виет: x1 + x2 = -b/a и x1 * x2 = c/a. За знаците на корените: два положителни корена изискват едновременно D ≥ 0, -b/a > 0 и c/a > 0. Разлагането на квадратния тричлен на множители е ax^2 + bx + c = a(x - x1)(x - x2).`
  }
];

export const SmartScan: React.FC<SmartScanProps> = ({ onScanComplete, onClose, sampleLessons }) => {
  const [hasGemini, setHasGemini] = useState<boolean>(isGeminiConfigured());
  const [activeMode, setActiveMode] = useState<'paste' | 'upload' | 'samples' | 'settings'>('paste');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [unmatchedError, setUnmatchedError] = useState<string | null>(null);

  // Manual paste state
  const [customTitle, setCustomTitle] = useState('');
  const [customSubject, setCustomSubject] = useState('Български език и литература');
  const [customText, setCustomText] = useState('');
  const [pasteNotice, setPasteNotice] = useState<string | null>(null);

  // OCR Transparent Review state
  const [ocrReviewText, setOcrReviewText] = useState<string | null>(null);
  const [ocrFileName, setOcrFileName] = useState<string>('');

  // Diagnosis transparency modal state
  const [diagnosisPreview, setDiagnosisPreview] = useState<NotebookDiagnosis | null>(null);

  // Settings / API key state
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [apiTestStatus, setApiTestStatus] = useState<{ testing: boolean; message: string | null; success?: boolean }>({
    testing: false,
    message: null
  });

  useEffect(() => {
    const currentKey = getActiveGeminiApiKey();
    setApiKeyInput(currentKey);
    setHasGemini(Boolean(currentKey && currentKey.length > 10));
  }, []);

  const wordCount = customText.trim() ? customText.trim().split(/\s+/).length : 0;
  const charCount = customText.length;

  const handleApplyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    setCustomTitle(preset.title);
    setCustomSubject(preset.subject);
    setCustomText(preset.text);
    setUnmatchedError(null);
  };

  const handleClipboardPaste = async () => {
    try {
      if (navigator?.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim().length > 0) {
          setCustomText(prev => (prev.trim() ? `${prev}\n\n${text}` : text));
          setPasteNotice('Текстът бе успешно поставен от клипборда!');
          setTimeout(() => setPasteNotice(null), 3000);
          return;
        }
      }
      setPasteNotice('Клипбордът е празен. Поставете текста с клавишна комбинация Ctrl + V.');
      setTimeout(() => setPasteNotice(null), 3000);
    } catch {
      setPasteNotice('Браузърът изисква директно поставяне: натиснете Ctrl + V в полето.');
      setTimeout(() => setPasteNotice(null), 3500);
    }
  };

  const processText = (textToAnalyze: string, filename: string, lessonFallback?: LessonData) => {
    setUnmatchedError(null);
    setIsScanning(true);
    setScanStep('Съпоставка с държавните образователни стандарти на МОН...');

    try {
      const diagnosis = classifyAndDiagnoseNotebook(textToAnalyze, filename);
      setIsScanning(false);

      if (diagnosis.isMatched || lessonFallback) {
        // Transparent preview before final redirect
        setDiagnosisPreview(diagnosis);
      } else {
        setUnmatchedError(`Не открихме съответствие с учебната програма за „${filename}“. Моля добавете конкретни понятия или изберете тема от образците.`);
      }
    } catch {
      setIsScanning(false);
      setUnmatchedError('Възникна грешка при обработката на текста. Моля опитайте отново.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUnmatchedError(null);

    // 1. Text or Markdown: Read directly and open in transparent review
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = (ev.target?.result as string) || '';
        setOcrReviewText(content);
        setOcrFileName(file.name);
      };
      reader.readAsText(file);
      return;
    }

    // 2. Image with active Gemini Key: Run OCR and present in transparent review
    // Собствен ключ или Supabase AI proxy (ключът е на сървъра)
    if ((hasGemini || isAiProxyCandidate()) && file.type.startsWith('image/')) {
      setIsScanning(true);
      setScanStep(`${AI_PROVIDER_LABEL} разчита ръкописа от снимката...`);
      try {
        const geminiExtracted = await extractNotebookTextWithGemini(file);
        setIsScanning(false);
        setOcrReviewText(geminiExtracted);
        setOcrFileName(file.name);
      } catch (err: unknown) {
        setIsScanning(false);
        setUnmatchedError(`Грешка при разпознаване: ${err instanceof Error && err.message ? err.message : 'Опитайте отново или въведете текста ръчно'}.`);
      }
      return;
    }

    // 3. Image without Gemini Key: Inform user transparently and guide to settings or manual paste
    if (file.type.startsWith('image/') || file.type.includes('pdf')) {
      setOcrFileName(file.name);
      setUnmatchedError('За живо разпознаване на снимка с ръкопис е необходим Google Gemini API ключ. Можете веднага да въведете текста в раздел „Директно въвеждане“, да въведете ключ в „Настройки“ или да тествате с примерен разчетен текст.');
    }
  };

  const handleConfirmOcrAndDiagnose = () => {
    if (!ocrReviewText) return;
    processText(ocrReviewText, ocrFileName || 'Разчетен текст от снимка');
    setOcrReviewText(null);
  };

  const handleLoadDemoOcr = () => {
    const demo = `Тема: Априлското въстание 1876 г.
Решението за въстание е взето в Гюргево от ноември-декември 1875 г.
Определени са 4 революционни окръга: Търновски, Сливенски, Врачански, Пловдивски (Панагюрски).
Оборище – първото велико народно събрание.
Преждевременно избухване на 20 април в Копривщица – Кървавото писмо на Тодор Каблешков.
Бенковски повежда Хвърковатата чета.
Кланетата в Батак и Перущица довеждат до Цариградската посланическа конференция.`;
    setOcrReviewText(demo);
    setOcrFileName('тетрадка_априлско_въстание.png');
    setUnmatchedError(null);
  };

  const handleSaveApiKey = () => {
    setStoredGeminiApiKey(apiKeyInput);
    const configured = isGeminiConfigured();
    setHasGemini(configured);
    setApiTestStatus({
      testing: false,
      message: configured ? 'Ключът е успешно запазен в локалния браузър!' : 'Ключът бе премахнат.',
      success: configured
    });
  };

  const handleTestApiKey = async () => {
    setApiTestStatus({ testing: true, message: 'Тестваме връзката с Google Gemini API...' });
    const result = await testGeminiApiKey(apiKeyInput);
    setApiTestStatus({
      testing: false,
      message: result.message,
      success: result.success
    });
    if (result.success) {
      setStoredGeminiApiKey(apiKeyInput);
      setHasGemini(true);
    }
  };

  const handleClearApiKey = () => {
    removeStoredGeminiApiKey();
    setApiKeyInput('');
    setHasGemini(false);
    setApiTestStatus({
      testing: false,
      message: 'API ключът бе премахнат от браузъра.',
      success: false
    });
  };

  const handleManualPasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    const fullContent = `${customTitle} ${customSubject}\n${customText}`;
    processText(fullContent, customTitle || 'Въведени записки');
  };

  const featuredSamples = sampleLessons.slice(0, 8);

  return (
    <div className="relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden max-w-3xl mx-auto">
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
            <span>Одит на тетрадки по стандартите на МОН</span>
          </div>

          {hasGemini ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Google Gemini Vision активен</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Edit3 className="w-3.5 h-3.5 text-blue-600" />
              <span>Текстов евристичен анализатор</span>
            </div>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          SmartScan: Съпоставка на записки с МОН
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Въведете или снимайте записките си, за да проверите дали отговарят на критериите за <strong>Отличен (6.00)</strong> на предстоящите изпити за <strong>НВО 10. клас</strong> или <strong>ДЗИ (Матура) 12. клас</strong>.
        </p>
      </div>

      {/* Unmatched / Alert Banner */}
      {unmatchedError && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <p className="font-semibold">{unmatchedError}</p>
            {!hasGemini && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => setActiveMode('paste')}
                  className="px-3 py-1.5 rounded-lg bg-amber-700 text-white font-semibold text-xs hover:bg-amber-800 transition-colors"
                >
                  Въведи текст на ръка
                </button>
                <button
                  onClick={handleLoadDemoOcr}
                  className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-semibold text-xs hover:bg-amber-100 transition-colors"
                >
                  Зареди примерен разчетен текст
                </button>
                <button
                  onClick={() => setActiveMode('settings')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  Въведи безплатен Gemini ключ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode Switcher Tabs */}
      {!isScanning && !ocrReviewText && !diagnosisPreview && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => { setActiveMode('paste'); setUnmatchedError(null); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'paste'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Въвеждане на текст</span>
          </button>

          <button
            onClick={() => { setActiveMode('upload'); setUnmatchedError(null); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'upload'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Снимка / Файл</span>
          </button>

          <button
            onClick={() => { setActiveMode('samples'); setUnmatchedError(null); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'samples'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Образци на МОН</span>
          </button>

          <button
            onClick={() => { setActiveMode('settings'); setUnmatchedError(null); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'settings'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>OCR Настройки</span>
            {hasGemini && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
          </button>
        </div>
      )}

      {/* Scanning In Progress State */}
      {isScanning && (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 animate-spin">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div className="text-sm font-bold text-slate-900 mb-1">{scanStep}</div>
          <p className="text-xs text-slate-500">Обработката отнема 1–2 секунди...</p>
        </div>
      )}

      {/* Transparent OCR Review Mode */}
      {!isScanning && ocrReviewText && (
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-blue-900">
                Разчетен текст от изображението ({ocrFileName})
              </h4>
              <p className="text-[11px] text-blue-700 mt-0.5">
                Прегледайте разчетените бележки. Можете да редактирате сгрешени думи или да допълните липсващи термини преди съпоставката.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Текст за одит (редактируем)
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {ocrReviewText.trim().split(/\s+/).length} думи • {ocrReviewText.length} знака
              </span>
            </div>
            <textarea
              value={ocrReviewText}
              onChange={(e) => setOcrReviewText(e.target.value)}
              rows={8}
              className="w-full p-3.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => { setOcrReviewText(null); setActiveMode('upload'); }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Откажи / Нова снимка
            </button>

            <button
              type="button"
              onClick={handleConfirmOcrAndDiagnose}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Потвърди и направи МОН одит (6.00)</span>
            </button>
          </div>
        </div>
      )}

      {/* Transparent Diagnostic Preview Snapshot */}
      {!isScanning && diagnosisPreview && (
        <div className="space-y-5 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <Award className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-emerald-900">
                  Успешна съпоставка с учебната програма на МОН
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-800 text-xs font-bold">
                  {diagnosisPreview.qualityScore}% покритие
                </span>
              </div>
              <p className="text-xs text-emerald-700 mt-1">
                {diagnosisPreview.gradeEstimate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Разпозната тема:</span>
              <strong className="text-slate-900 text-sm">{diagnosisPreview.subDomainName}</strong>
              <div className="mt-1 text-[11px] text-emerald-700 font-semibold">
                {diagnosisPreview.subject} • {diagnosisPreview.grade}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Открити ключови понятия:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {diagnosisPreview.matchedKeywords.slice(0, 5).map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] border border-slate-200 font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl border text-xs ${
              diagnosisPreview.lessonIsApproximate
                ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            {diagnosisPreview.lessonIsApproximate ? (
              <>
                За темата „{diagnosisPreview.subDomainName}“ още няма отделен урок с проверен тест. Ще отворим най-близкия
                урок по същия предмет: <strong>{diagnosisPreview.lessonData.title}</strong>.
              </>
            ) : (
              <>
                Урок и тест по темата: <strong>{diagnosisPreview.lessonData.title}</strong>.
              </>
            )}
          </div>

          {diagnosisPreview.missingCrucialPoints.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
              <span className="font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Липсващи акценти за Отличен (6.00):
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-800">
                {diagnosisPreview.missingCrucialPoints.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => { setDiagnosisPreview(null); setActiveMode('paste'); }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Ново въвеждане
            </button>

            <button
              onClick={() => {
                onScanComplete(diagnosisPreview.lessonData, diagnosisPreview);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md"
            >
              <span>Отвори пълния чеклист в Одит 6.00</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 1: Direct Text Paste & Input */}
      {!isScanning && !ocrReviewText && !diagnosisPreview && activeMode === 'paste' && (
        <form onSubmit={handleManualPasteSubmit} className="space-y-4 max-w-2xl mx-auto">
          {/* Quick Preset Strip */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Бързи примери за тестване:
              </span>
              <span className="text-[11px] text-slate-400">1 клик за зареждане</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {PRESET_TEMPLATES.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleApplyPreset(preset)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-100 hover:text-blue-700 text-slate-700 border border-slate-200 text-[11px] font-medium transition-all"
                >
                  <span className="text-[9px] px-1 py-0.2 rounded bg-white text-slate-600 font-bold border border-slate-200">
                    {preset.badge}
                  </span>
                  <span>{preset.label}</span>
                </button>
              ))}

              <a
                href="https://maturaplus.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-semibold transition-all shadow-2xs"
                title="Подготовка за НВО след 7. клас в специализираната ни академия Matura+"
              >
                <span>7. клас (Преразказ)? Към Matura+</span>
                <ExternalLink className="w-3 h-3 text-emerald-600" />
              </a>
            </div>
          </div>

          {/* Title and Subject Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Заглавие на темата / урока
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="напр. Тютюн на Димов, Априлско въстание, Златен век на Симеон..."
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
                <option value="Български език и литература">Български език и литература</option>
                <option value="Математика">Математика</option>
                <option value="История и цивилизации">История и цивилизации</option>
                <option value="Биология и ЗО">Биология и здравно образование</option>
                <option value="Химия и ООС">Химия и опазване на околната среда</option>
                <option value="Физика и астрономия">Физика и астрономия</option>
                <option value="География и икономика">География и икономика</option>
              </select>
            </div>
          </div>

          {/* Text Area with Live MOH Indicator */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Текст от тетрадката / бележките
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClipboardPaste}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
                  title="Постави текста от клипборда"
                >
                  <Clipboard className="w-3.5 h-3.5 text-blue-600" />
                  <span>Постави от клипборда</span>
                </button>
              </div>
            </div>

            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Поставете или напишете записките си тук (основни понятия, дефиниции, дати, формули или план на урока)..."
              rows={7}
              required
              className="w-full p-3.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed"
            />

            {pasteNotice && (
              <div className="mt-1 text-[11px] text-blue-700 font-medium animate-fade-in">
                {pasteNotice}
              </div>
            )}

            {/* Word count & readiness meter */}
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl border text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-600">
                  {wordCount} {wordCount === 1 ? 'дума' : 'думи'} • {charCount} знака
                </span>
              </div>

              <div>
                {wordCount === 0 ? (
                  <span className="text-slate-500 text-[11px]">Въведете записките си за анализ</span>
                ) : wordCount < 15 ? (
                  <span className="text-amber-700 font-medium text-[11px] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Твърде кратък текст за точен одит (добавете термини)
                  </span>
                ) : wordCount < 45 ? (
                  <span className="text-blue-700 font-medium text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Базов обем — достатъчен за съпоставка с МОН
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Пълен конспект — готов за детайлен одит за Отличен (6.00)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!customText.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Съпостави със стандартите на МОН</span>
            </button>
          </div>
        </form>
      )}

      {/* MODE 2: File & Photo Upload */}
      {!isScanning && !ocrReviewText && !diagnosisPreview && activeMode === 'upload' && (
        <div className="max-w-xl mx-auto space-y-4">
          <label className="group relative block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-600 bg-slate-50/60 hover:bg-blue-50/20 p-8 sm:p-10 text-center transition-all">
            <input
              type="file"
              accept="image/*,application/pdf,text/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="w-14 h-14 mx-auto mb-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-105 transition-all">
              <ImageIcon className="w-7 h-7" />
            </div>

            <div className="text-sm font-bold text-slate-900 mb-1">
              Изберете снимка на тетрадка или <span className="text-blue-600 underline underline-offset-4">качете файл</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Поддържа снимки от телефон (JPG, PNG, WebP) или текстови конспекти (.txt, .md).
            </p>
          </label>

          {/* Transparency Card about OCR Engine */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                OCR Статус на системата:
              </span>
              {hasGemini ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  Разпознаване на снимки с {AI_PROVIDER_LABEL} е активно
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                  Необходим е API ключ за снимки
                </span>
              )}
            </div>

            <p className="text-slate-600 text-[11px] leading-relaxed">
              {hasGemini
                ? 'Снимките се разчитат от Google Gemini (мултимодален AI модел) — разпознаването на ръкопис не е безгрешно, затова проверете текста. След прочитане ще видите разчетения текст за предварителен преглед.'
                : 'За директно сканиране на ръкопис от камера добавете безплатен Google Gemini API ключ от таб „OCR Настройки“ или въведете записките си в таб „Въвеждане на текст“.'}
            </p>

            {!hasGemini && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleLoadDemoOcr}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-[11px] hover:bg-blue-100 transition-colors"
                >
                  ⚡ Тествай с примерен разчетен текст
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('settings')}
                  className="px-3 py-1.5 rounded-lg bg-white text-slate-700 border border-slate-300 font-semibold text-[11px] hover:bg-slate-50 transition-colors"
                >
                  ⚙️ Конфигурирай API ключ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 3: Curriculum Sample Lessons */}
      {!isScanning && !ocrReviewText && !diagnosisPreview && activeMode === 'samples' && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-xs font-semibold text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Официални учебни образци от каталога на МОН:</span>
            </span>
            <span className="text-[11px] text-slate-400">1 клик за одит</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {featuredSamples.map((sample) => (
              <button
                key={sample.id}
                onClick={() => processText(sample.summary.overview + ' ' + (sample.originalNoteExcerpt || ''), sample.title, sample)}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-300 text-left transition-all shadow-2xs group hover:shadow-sm"
              >
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-blue-600 group-hover:bg-blue-50 transition-all flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                    {sample.title}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                    <span className="text-emerald-700 font-semibold">{sample.subject}</span>
                    <span>•</span>
                    <span>{sample.grade}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODE 4: OCR Transparency & API Key Settings */}
      {!isScanning && !ocrReviewText && !diagnosisPreview && activeMode === 'settings' && (
        <div className="max-w-xl mx-auto space-y-5">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-blue-600" />
              Google Gemini API Ключ (Vision & AI Ментор)
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ключът се съхранява <strong>единствено локално на вашето устройство</strong> (във вашия браузър чрез LocalStorage). Заявките за разпознаване се изпращат директно към сигурните сървъри на Google.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Вашият Google Gemini API ключ
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Test Status Feedback */}
          {apiTestStatus.message && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                apiTestStatus.success
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              {apiTestStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              )}
              <span>{apiTestStatus.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTestApiKey}
                disabled={apiTestStatus.testing || !apiKeyInput.trim()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors disabled:opacity-50"
              >
                {apiTestStatus.testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 text-amber-600" />}
                <span>Тествай връзката</span>
              </button>

              {apiKeyInput && (
                <button
                  type="button"
                  onClick={handleClearApiKey}
                  className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
                >
                  Изчисти
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleSaveApiKey}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              Запази в браузъра
            </button>
          </div>

          {/* Link to Google AI Studio */}
          <div className="pt-2 border-t border-slate-200 text-center">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              <span>Вземи безплатен API ключ от Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <p className="text-[11px] text-slate-400 mt-1">
              Отнема 30 секунди с вашия Google профил и включва щедър безплатен лимит за ученици и учители.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
