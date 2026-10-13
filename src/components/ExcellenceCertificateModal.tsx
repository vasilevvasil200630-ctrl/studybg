import React, { useState, useMemo } from 'react';
import {
  X,
  Award,
  Printer,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Copy,
  Check,
  Sparkles,
  User,
  School
} from 'lucide-react';

interface ExcellenceCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievementTitle: string;
  examOrTrackLabel: string;
  scoreText: string;
  gradeLabel: string;
  highlights: string[];
}

export const ExcellenceCertificateModal: React.FC<ExcellenceCertificateModalProps> = ({
  isOpen,
  onClose,
  achievementTitle,
  examOrTrackLabel,
  scoreText,
  gradeLabel,
  highlights
}) => {
  const [studentName, setStudentName] = useState('Отличник на StudyBG');
  const [schoolAndGrade, setSchoolAndGrade] = useState('12. клас • Гимназиален етап');
  const [copied, setCopied] = useState(false);

  const certificateCode = useMemo(() => {
    const dayStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `SBG-${dayStamp}-600`;
  }, []);

  if (!isOpen) return null;

  const formattedDate = new Date().toLocaleDateString('bg-BG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrintCertificate = () => {
    const printWin = window.open('', '_blank', 'width=960,height=720');
    if (!printWin) {
      window.print();
      return;
    }

    const html = `
<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="utf-8" />
  <title>Грамота за Академично Отличие — ${studentName}</title>
  <style>
    @page { size: A4 landscape; margin: 12mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 20px;
      font-family: 'Georgia', 'Times New Roman', serif;
      background: #f8fafc;
      color: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 92vh;
    }
    .cert-outer {
      width: 100%;
      max-width: 980px;
      background: #ffffff;
      border: 6px double #1e3a8a;
      border-radius: 16px;
      padding: 18px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }
    .cert-inner {
      border: 2px solid #d97706;
      border-radius: 10px;
      padding: 36px 48px;
      text-align: center;
      position: relative;
      background: radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%);
    }
    .badge-top {
      display: inline-block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #1e40af;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 6px 16px;
      border-radius: 999px;
      margin-bottom: 14px;
    }
    h1 {
      margin: 0;
      font-size: 32px;
      color: #0f172a;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .subtitle {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 13px;
      color: #64748b;
      margin-top: 6px;
      margin-bottom: 22px;
    }
    .presented-to {
      font-size: 14px;
      font-style: italic;
      color: #475569;
      margin-bottom: 8px;
    }
    .student-name {
      font-size: 34px;
      font-weight: 700;
      color: #1e3a8a;
      border-bottom: 2px solid #cbd5e1;
      display: inline-block;
      padding: 0 32px 6px 32px;
      margin-bottom: 6px;
    }
    .school-line {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #475569;
      margin-bottom: 20px;
    }
    .achievement-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px 24px;
      max-width: 720px;
      margin: 0 auto 20px auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    .achievement-title {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .score-pill {
      display: inline-block;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      font-weight: 800;
      font-size: 14px;
      padding: 4px 14px;
      border-radius: 8px;
      margin: 4px 6px;
    }
    .highlights {
      list-style: none;
      padding: 0;
      margin: 12px 0 0 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
    }
    .highlights li {
      font-size: 11px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 4px 10px;
      border-radius: 6px;
      color: #334155;
      font-weight: 600;
    }
    .footer-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 28px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 12px;
      color: #475569;
    }
    .seal {
      display: inline-block;
      padding: 8px 18px;
      border: 2px solid #d97706;
      border-radius: 999px;
      color: #b45309;
      font-weight: 800;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      background: #fffbeb;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .cert-outer { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="cert-outer">
    <div class="cert-inner">
      <div class="badge-top">StudyBG • Национална дигитална академия за НВО 10 & ДЗИ 12</div>
      <h1>Удостоверение за Академично Отличие</h1>
      <div class="subtitle">Сертификат за систематична подготовка по държавните образователни стандарти на МОН</div>

      <div class="presented-to">Настоящата грамота се връчва на:</div>
      <div class="student-name">${studentName || 'Отличник на StudyBG'}</div>
      <div class="school-line">${schoolAndGrade || 'Гимназиален етап (8.–12. клас)'}</div>

      <div class="achievement-box">
        <div class="achievement-title">${achievementTitle} (${examOrTrackLabel})</div>
        <div>
          <span class="score-pill">${scoreText}</span>
          <span class="score-pill">${gradeLabel}</span>
        </div>
        <ul class="highlights">
          ${highlights.map((h) => `<li>✓ ${h}</li>`).join('')}
        </ul>
      </div>

      <div class="footer-row">
        <div style="text-align: left;">
          <div><strong>Дата на издаване:</strong> ${formattedDate}</div>
          <div><strong>Код на документа:</strong> <span style="font-family: monospace;">${certificateCode}</span></div>
        </div>
        <div class="seal">★ Стандарт Отличен 6.00 ★</div>
        <div style="text-align: right;">
          <div><strong>Академичен съвет на StudyBG</strong></div>
          <div>studybg.vercel.app</div>
        </div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 250);
    };
  </script>
</body>
</html>
    `.trim();

    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
  };

  const handleCopySummary = () => {
    const text = `🏆 Удостоверение за Академично Отличие (StudyBG)\nУченик: ${studentName} (${schoolAndGrade})\nПостижение: ${achievementTitle} — ${examOrTrackLabel}\nРезултат: ${scoreText} | ${gradeLabel}\nКод: ${certificateCode} • studybg.vercel.app`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div className="bg-white w-full max-w-3xl max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cert-modal-title" className="text-base sm:text-lg font-extrabold text-slate-900">
                Генератор на Дигитална Грамота / Сертификат за 6.00
              </h2>
              <p className="text-xs text-slate-500">
                Персонализирай и разпечатай/запази като PDF (A4) своето удостоверение
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
            aria-label="Затвори"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Customization Inputs (100% Client-Side, GDPR-Safe) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Име и фамилия на ученика (за грамотата):</span>
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Напр. Александър Димитров"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-indigo-600" />
                <span>Клас и училище (по желание):</span>
              </label>
              <input
                type="text"
                value={schoolAndGrade}
                onChange={(e) => setSchoolAndGrade(e.target.value)}
                placeholder="Напр. 12. А клас • ПМГ / ЕГ"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              />
            </div>
          </div>

          {/* Live Certificate Preview Card */}
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 shadow-lg">
            <div className="bg-white rounded-xl border-2 border-amber-400/90 p-5 sm:p-8 text-center space-y-4 relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>StudyBG • Национална дигитална академия</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-2xl font-black uppercase tracking-wide text-slate-900 font-serif">
                  Удостоверение за Академично Отличие
                </h3>
                <p className="text-xs text-slate-500">
                  Връчва се за систематична подготовка по държавните образователни стандарти на МОН на:
                </p>
              </div>

              <div className="py-1">
                <div className="text-xl sm:text-3xl font-black text-blue-900 font-serif border-b-2 border-slate-200 inline-block px-6 pb-1">
                  {studentName || 'Отличник на StudyBG'}
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-1">
                  {schoolAndGrade}
                </div>
              </div>

              {/* Achievement Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-xl mx-auto space-y-2.5">
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {achievementTitle} • <span className="text-blue-700">{examOrTrackLabel}</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black">
                    {scoreText}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 text-xs font-black flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{gradeLabel}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700 font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Seal & Verification Row */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
                <div className="text-center sm:text-left">
                  <div>Дата: <strong className="text-slate-700">{formattedDate}</strong></div>
                  <div>Код: <strong className="font-mono text-slate-700">{certificateCode}</strong></div>
                </div>

                <div className="px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-extrabold uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Верифициран Стандарт 6.00</span>
                </div>

                <div className="text-center sm:text-right">
                  <div className="font-bold text-slate-700">Академичен съвет на StudyBG</div>
                  <div>studybg.vercel.app</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Копирано в клипборда!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Копирай резюме на отличието</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
            >
              Затвори
            </button>

            <button
              type="button"
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Разпечатай / Запази като PDF (A4)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
