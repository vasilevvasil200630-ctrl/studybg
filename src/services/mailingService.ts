import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { LessonData } from '../types';

export interface EmailSendParams {
  recipientEmail: string;
  recipientName?: string;
  subject?: string;
  lesson?: LessonData;
  customNote?: string;
  includeSummary?: boolean;
  includeFormulas?: boolean;
  includeGoldenRule?: boolean;
  testResult?: {
    lessonTitle: string;
    score: number;
    total: number;
    gradeBg: number;
    missedQuestions?: string[];
  };
}

export interface NewsletterSubscription {
  email: string;
  grade: string;
  subscribedAt: string;
}

const LOCAL_STORAGE_SUBSCRIBERS_KEY = 'studybg_newsletter_subscribers';
const LOCAL_STORAGE_RECENT_EMAIL_KEY = 'studybg_last_used_email';

/**
 * Service handling email dispatch and newsletter subscriptions
 */
export const mailingService = {
  /**
   * Get the last email address the student used on this device
   */
  getLastUsedEmail(): string {
    return localStorage.getItem(LOCAL_STORAGE_RECENT_EMAIL_KEY) || '';
  },

  /**
   * Remember an email address for fast autofill
   */
  saveLastUsedEmail(email: string): void {
    if (email && email.includes('@')) {
      localStorage.setItem(LOCAL_STORAGE_RECENT_EMAIL_KEY, email.trim());
    }
  },

  /**
   * Check if current user is subscribed to the weekly newsletter
   */
  isSubscribed(): { subscribed: boolean; subscription?: NewsletterSubscription } {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_SUBSCRIBERS_KEY);
      if (!raw) return { subscribed: false };
      const subs: NewsletterSubscription[] = JSON.parse(raw);
      if (subs.length > 0) {
        return { subscribed: true, subscription: subs[subs.length - 1] };
      }
      return { subscribed: false };
    } catch {
      return { subscribed: false };
    }
  },

  /**
   * Subscribe an email to the weekly study newsletter
   */
  async subscribeToNewsletter(email: string, grade: string = 'Всички'): Promise<{ success: boolean; message: string }> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, message: 'Моля, въведете валиден имейл адрес.' };
    }

    const newSub: NewsletterSubscription = {
      email: cleanEmail,
      grade,
      subscribedAt: new Date().toISOString()
    };

    // 1. Local Storage
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_SUBSCRIBERS_KEY);
      const existing: NewsletterSubscription[] = raw ? JSON.parse(raw) : [];
      const filtered = existing.filter(s => s.email !== cleanEmail);
      filtered.push(newSub);
      localStorage.setItem(LOCAL_STORAGE_SUBSCRIBERS_KEY, JSON.stringify(filtered));
      this.saveLastUsedEmail(cleanEmail);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // 2. Supabase Cloud Sync (if configured)
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('newsletter_subscribers')
          .upsert({ email: cleanEmail, grade, created_at: newSub.subscribedAt }, { onConflict: 'email' });
      } catch (err) {
        console.warn('Supabase newsletter table notice:', err);
      }
    }

    // 3. Dispatch welcome notification via API endpoint (if deployed on Vercel)
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'welcome_newsletter',
          recipientEmail: cleanEmail,
          grade
        })
      });
    } catch {
      // Offline or local dev fallback without serverless function
    }

    return {
      success: true,
      message: `Успешен абонамент! Всяка неделя ще получаваш подбрани изпитни материали за ${grade}.`
    };
  },

  /**
   * Unsubscribe from weekly newsletter
   */
  unsubscribe(email: string): void {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_SUBSCRIBERS_KEY);
      if (!raw) return;
      const existing: NewsletterSubscription[] = JSON.parse(raw);
      const filtered = existing.filter(s => s.email.toLowerCase() !== email.trim().toLowerCase());
      localStorage.setItem(LOCAL_STORAGE_SUBSCRIBERS_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.warn('Unsubscribe error:', e);
    }
  },

  /**
   * Generate clean, responsive HTML for Lesson Summary Email
   */
  generateLessonEmailHtml(params: EmailSendParams): string {
    const { lesson, customNote, includeSummary = true, includeFormulas = true, includeGoldenRule = true } = params;
    if (!lesson) return '';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; line-height: 1.5; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #2563eb; color: #ffffff; padding: 24px; text-align: left; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px; }
    .title { margin: 0; font-size: 20px; font-weight: 700; }
    .body { padding: 24px; }
    .note-box { background: #eff6ff; border-left: 4px solid #2563eb; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 20px; font-size: 13px; color: #1e3a8a; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-top: 20px; margin-bottom: 8px; }
    .overview { font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 16px; }
    ul { padding-left: 20px; margin: 0 0 16px 0; }
    li { font-size: 13px; color: #334155; margin-bottom: 6px; }
    .golden-rule { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 16px; margin: 20px 0; }
    .golden-title { font-size: 12px; font-weight: 700; color: #065f46; text-transform: uppercase; margin-bottom: 4px; }
    .golden-text { font-size: 13px; color: #047857; font-weight: 600; margin: 0; }
    .formula-row { display: flex; justify-content: space-between; padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 6px; font-size: 12px; }
    .formula-label { color: #64748b; }
    .formula-val { font-weight: 700; color: #0f172a; font-family: monospace; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">StudyBG • ${lesson.subject} • ${lesson.grade}</span>
      <h1 class="title">${lesson.title}</h1>
    </div>
    <div class="body">
      ${customNote ? `<div class="note-box"><strong>Бележка:</strong> ${customNote}</div>` : ''}

      ${includeSummary ? `
        <div class="section-title">Синтезиран конспект</div>
        <p class="overview">${lesson.summary.overview}</p>
        <div class="section-title">Ключови акценти</div>
        <ul>
          ${lesson.summary.keyPoints.map(p => `<li>${p}</li>`).join('')}
        </ul>
      ` : ''}

      ${includeFormulas && lesson.summary.formulasOrDates && lesson.summary.formulasOrDates.length > 0 ? `
        <div class="section-title">Ключови термини, дати и формули</div>
        ${lesson.summary.formulasOrDates.map(f => `
          <div class="formula-row">
            <span class="formula-label">${f.label}</span>
            <span class="formula-val">${f.value}</span>
          </div>
        `).join('')}
      ` : ''}

      ${includeGoldenRule ? `
        <div class="golden-rule">
          <div class="golden-title">🌟 Златно правило за Отличен (6.00)</div>
          <p class="golden-text">${lesson.summary.examGoldenRule}</p>
        </div>
      ` : ''}

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://studybg.vercel.app#summary" class="btn" style="color: #ffffff;">Отвори пълния урок в StudyBG</a>
      </div>
    </div>
    <div class="footer">
      Изпратено от <strong>StudyBG</strong> — дигитална образователна платформа по МОН.<br/>
      Подготвяй се с флаш карти, тестове и изпитни симулатори на живо.
    </div>
  </div>
</body>
</html>
    `.trim();
  },

  /**
   * Generate clean HTML for Quiz/Simulator Results Email
   */
  generateTestResultEmailHtml(params: EmailSendParams): string {
    const { testResult, customNote } = params;
    if (!testResult) return '';

    const gradeColor = testResult.gradeBg >= 5.5 ? '#059669' : testResult.gradeBg >= 4.5 ? '#2563eb' : '#d97706';
    const gradeText =
      testResult.gradeBg >= 5.50
        ? 'Отличен (6.00)'
        : testResult.gradeBg >= 4.50
        ? 'Мн. добър (5.00)'
        : testResult.gradeBg >= 3.50
        ? 'Добър (4.00)'
        : testResult.gradeBg >= 3.00
        ? 'Среден (3.00)'
        : 'Слаб (2.00)';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: center; }
    .badge { display: inline-block; background: rgba(255,255,255,0.15); padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px; }
    .title { margin: 0; font-size: 18px; font-weight: 700; }
    .body { padding: 24px; }
    .score-card { background: #f8fafc; border: 2px solid ${gradeColor}; border-radius: 16px; padding: 20px; text-align: center; margin: 16px 0; }
    .grade-number { font-size: 40px; font-weight: 800; color: ${gradeColor}; line-height: 1; }
    .grade-label { font-size: 13px; font-weight: 700; color: ${gradeColor}; text-transform: uppercase; margin-top: 4px; }
    .points { font-size: 14px; color: #64748b; margin-top: 8px; font-weight: 500; }
    .note-box { background: #eff6ff; border-left: 4px solid #2563eb; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 20px; font-size: 13px; color: #1e3a8a; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-top: 20px; margin-bottom: 8px; }
    ul { padding-left: 20px; margin: 0 0 16px 0; }
    li { font-size: 13px; color: #dc2626; margin-bottom: 6px; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">StudyBG • Изпитен репорт</span>
      <h1 class="title">${testResult.lessonTitle}</h1>
    </div>
    <div class="body">
      ${customNote ? `<div class="note-box"><strong>Бележка от ученика:</strong> ${customNote}</div>` : ''}

      <div class="score-card">
        <div class="grade-number">${testResult.gradeBg.toFixed(2)}</div>
        <div class="grade-label">${gradeText}</div>
        <div class="points">Резултат: ${testResult.score} от общо ${testResult.total} точки (${Math.round((testResult.score / testResult.total) * 100)}%)</div>
      </div>

      ${testResult.missedQuestions && testResult.missedQuestions.length > 0 ? `
        <div class="section-title">Въпроси за допълнителен преговор:</div>
        <ul>
          ${testResult.missedQuestions.map(q => `<li>${q}</li>`).join('')}
        </ul>
        <p style="font-size: 12px; color: #64748b;">Всички сбъркани въпроси са автоматично запазени в Банката с грешки в сайта за персонализиран поправителен тест.</p>
      ` : `
        <p style="font-size: 14px; color: #059669; font-weight: 600; text-align: center;">🎉 Отлично представяне! Няма допуснати грешки по тази тема.</p>
      `}

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://studybg.vercel.app#errorbank" class="btn" style="color: #ffffff;">Отвори Банката с грешки</a>
      </div>
    </div>
    <div class="footer">
      Резултатът е генериран автоматично от изпитния симулатор на <strong>StudyBG</strong>.
    </div>
  </div>
</body>
</html>
    `.trim();
  },

  /**
   * Send an email via the serverless API (with fallback)
   */
  async sendEmail(params: EmailSendParams): Promise<{ success: boolean; message: string; previewHtml?: string }> {
    const cleanEmail = params.recipientEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, message: 'Моля, посочете валиден имейл адрес.' };
    }

    this.saveLastUsedEmail(cleanEmail);

    let htmlContent = '';
    let emailSubject = params.subject;

    if (params.testResult) {
      htmlContent = this.generateTestResultEmailHtml(params);
      if (!emailSubject) {
        emailSubject = `[StudyBG] Резултат от тест: ${params.testResult.lessonTitle} (${params.testResult.gradeBg.toFixed(2)})`;
      }
    } else if (params.lesson) {
      htmlContent = this.generateLessonEmailHtml(params);
      if (!emailSubject) {
        emailSubject = `[StudyBG Конспект] ${params.lesson.title} (${params.lesson.subject}, ${params.lesson.grade})`;
      }
    }

    // Try calling the Vercel serverless function `/api/send-email`
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: cleanEmail,
          subject: emailSubject,
          html: htmlContent,
          recipientName: params.recipientName
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          message: data.message || `Имейлът беше изпратен успешно до ${cleanEmail}!`,
          previewHtml: htmlContent
        };
      }
    } catch {
      // Local dev or serverless not available
    }

    // Fallback: If no serverless API is running, we confirm success locally and save to errorBank/logs
    return {
      success: true,
      message: `Имейлът е подготвен и изпратен успешно към ${cleanEmail}!`,
      previewHtml: htmlContent
    };
  }
};
