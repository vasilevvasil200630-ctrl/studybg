import React, { useState } from 'react';
import {
  X,
  Mail,
  Send,
  Check,
  Eye,
  EyeOff,
  User,
  AlertCircle
} from 'lucide-react';
import { mailingService, type EmailSendParams } from '../services/mailingService';
import type { LessonData } from '../types';

interface EmailShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson?: LessonData;
  testResult?: {
    lessonTitle: string;
    score: number;
    total: number;
    gradeBg: number;
    missedQuestions?: string[];
  };
}

export const EmailShareModal: React.FC<EmailShareModalProps> = ({
  isOpen,
  onClose,
  lesson,
  testResult
}) => {
  const [recipientEmail, setRecipientEmail] = useState(() => mailingService.getLastUsedEmail());
  const [recipientName, setRecipientName] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includeFormulas, setIncludeFormulas] = useState(true);
  const [includeGoldenRule, setIncludeGoldenRule] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientEmail.includes('@')) {
      setErrorMessage('Моля, въведете валиден имейл адрес.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const params: EmailSendParams = {
      recipientEmail,
      recipientName,
      subject: testResult
        ? `[StudyBG] Резултат от изпит: ${testResult.lessonTitle} (${testResult.gradeBg.toFixed(2)})`
        : `[StudyBG Конспект] ${lesson?.title || 'Учебен материал'} (${lesson?.subject}, ${lesson?.grade})`,
      lesson,
      testResult,
      customNote: customNote.trim() || undefined,
      includeSummary,
      includeFormulas,
      includeGoldenRule
    };

    try {
      const res = await mailingService.sendEmail(params);
      if (res.success) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          // Keep success visible for a moment then allow closing
        }, 1500);
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage('Възникна грешка при подготовката на имейла.');
    } finally {
      setIsLoading(false);
    }
  };

  const previewHtml = testResult
    ? mailingService.generateTestResultEmailHtml({
        recipientEmail: recipientEmail || 'student@example.com',
        testResult,
        customNote
      })
    : lesson
    ? mailingService.generateLessonEmailHtml({
        recipientEmail: recipientEmail || 'student@example.com',
        lesson,
        customNote,
        includeSummary,
        includeFormulas,
        includeGoldenRule
      })
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-xl max-h-[92vh] overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {testResult ? 'Изпрати изпитен резултат по имейл' : 'Изпрати конспекта по имейл'}
              </h3>
              <p className="text-xs text-slate-500">
                {testResult ? testResult.lessonTitle : `${lesson?.subject} • ${lesson?.title}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Затвори"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-5">
          {successMessage ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Имейлът е изпратен!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {successMessage}
              </p>
              <div className="pt-4 flex justify-center gap-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Затвори
                </button>
                <button
                  onClick={() => {
                    setSuccessMessage(null);
                    setShowPreview(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition-colors"
                >
                  Виж изпратения имейл
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              {/* Recipient Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Имейл адрес на получателя *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="student@example.com или родител..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Optional Recipient Label / Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Име или роля (по желание)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Напр. Мама, Татко, Аз..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Бързо попълване
                  </label>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setRecipientName('За мен')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors"
                    >
                      За мен
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecipientName('Родител')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors"
                    >
                      Родител
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecipientName('Учител')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors"
                    >
                      Учител
                    </button>
                  </div>
                </div>
              </div>

              {/* What to include (for lessons) */}
              {lesson && !testResult && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-semibold text-slate-700 mb-1">
                    Какво да съдържа имейлът:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeSummary}
                        onChange={(e) => setIncludeSummary(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <span>Синтез & Акценти</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeFormulas}
                        onChange={(e) => setIncludeFormulas(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <span>Формули & Дати</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeGoldenRule}
                        onChange={(e) => setIncludeGoldenRule(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <span>Златно правило за 6.00</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Test Result Summary Preview if sending test */}
              {testResult && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-700">Оценка от теста:</span>
                    <span className="ml-1.5 font-bold text-blue-700">{testResult.gradeBg.toFixed(2)}</span>
                  </div>
                  <div className="text-slate-500">
                    {testResult.score} / {testResult.total} точки
                  </div>
                </div>
              )}

              {/* Personal Note Textarea */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Лична бележка (по желание)
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Напр. Изпращам конспекта за преговор преди контролното в петък..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 placeholder:text-slate-400"
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPreview ? 'Скрий прегледа' : 'Виж как ще изглежда имейлът'}</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors"
                  >
                    Отказ
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Изпращане...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Изпрати сега</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Collapsible Email HTML Preview */}
          {showPreview && (
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Преглед на имейла (HTML)
                </span>
                <span className="text-[10px] text-slate-500">
                  Адаптивен дизайн за компютър и телефон
                </span>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-72 overflow-y-auto bg-slate-50">
                <iframe
                  title="Email Preview"
                  srcDoc={previewHtml}
                  className="w-full min-h-[300px] border-0"
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
