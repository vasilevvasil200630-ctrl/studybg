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
  /** Принудително отваряне в локалния имейл клиент (mailto:) вместо директно изпращане чрез Resend */
  preferMailto?: boolean;
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

export interface EmailDispatchResponse {
  success: boolean;
  message: string;
  deliveredVia?: 'resend' | 'mailto';
  resendId?: string | null;
  previewHtml?: string;
  mailtoUrl?: string;
  plainText?: string;
}

export interface WeeklyDigestData {
  parentName?: string;
  studentName: string;
  weekNumber: number;
  studyHours: number;
  testsCompleted: number;
  avgScorePercent: number;
  streakDays: number;
  weakAreasResolved: string[];
  weakAreasToFocus: string[];
  adviceForParent: string;
}

/**
 * Маскира имейл адрес за дискретно показване (напр. "radostina@gmail.com" -> "r****@gmail.com")
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email || '';
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return email;

  if (localPart.length <= 2) {
    return `${localPart[0]}****@${domain}`;
  }
  const firstChar = localPart[0];
  const stars = '*'.repeat(Math.min(Math.max(localPart.length - 1, 3), 4));
  return `${firstChar}${stars}@${domain}`;
}

/**
 * Builds a beautiful, responsive HTML email template for the Parent Weekly Digest
 */
export function buildWeeklyDigestHtml(data: WeeklyDigestData): string {
  const {
    studentName,
    weekNumber,
    studyHours,
    testsCompleted,
    avgScorePercent,
    streakDays,
    weakAreasResolved,
    weakAreasToFocus,
    adviceForParent
  } = data;

  const resolvedHtml =
    weakAreasResolved.length > 0
      ? weakAreasResolved
          .map(
            (w) =>
              `<li style="margin-bottom: 6px; color: #15803d;"><strong>✓ ${w}</strong> — преодолян дефицит</li>`
          )
          .join('')
      : `<li style="color: #64748b;">Продължава работата по затвърждаване на основните теми.</li>`;

  const focusHtml =
    weakAreasToFocus.length > 0
      ? weakAreasToFocus
          .map(
            (w) =>
              `<li style="margin-bottom: 6px; color: #b45309;"><strong>• ${w}</strong> — препоръчва се преговор</li>`
          )
          .join('')
      : `<li style="color: #64748b;">Няма регистрирани сериозни пропуски тази седмица.</li>`;

  const baseAppUrl =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : 'https://studybg.vercel.app';

  return `
<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Седмичен отчет от StudyBG за ${studentName}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);">
    <!-- Header -->
    <tr>
      <td style="background-color: #0a4b82; padding: 32px 24px; text-align: center; color: #ffffff;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; opacity: 0.9; display: block; margin-bottom: 8px;">
          StudyBG • Седмичен напредък
        </span>
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; line-height: 1.2;">
          Седмица ${weekNumber}: Отчет за ${studentName}
        </h1>
        <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.95;">
          Официална подготовка за ДЗИ (Матура) и ДИППК по стандартите на МОН
        </p>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td style="padding: 28px 24px;">
        <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-top: 0;">
          Здравейте, представяме Ви обобщение на учебната активност и напредъка на <strong>${studentName}</strong> през изминалата седмица.
        </p>

        <!-- Stats Grid -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0;">
          <tr>
            <td width="25%" style="padding: 12px; background-color: #f1f5f9; border-radius: 12px; text-align: center;">
              <span style="display: block; font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Време</span>
              <strong style="font-size: 20px; color: #0a4b82;">${studyHours} ч.</strong>
            </td>
            <td width="4%"></td>
            <td width="25%" style="padding: 12px; background-color: #f1f5f9; border-radius: 12px; text-align: center;">
              <span style="display: block; font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Тестове</span>
              <strong style="font-size: 20px; color: #168a46;">${testsCompleted}</strong>
            </td>
            <td width="4%"></td>
            <td width="25%" style="padding: 12px; background-color: #f1f5f9; border-radius: 12px; text-align: center;">
              <span style="display: block; font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Успеваемост</span>
              <strong style="font-size: 20px; color: #0a4b82;">${avgScorePercent}%</strong>
            </td>
            <td width="4%"></td>
            <td width="25%" style="padding: 12px; background-color: #fef3c7; border-radius: 12px; text-align: center;">
              <span style="display: block; font-size: 11px; color: #92400e; font-weight: 600; text-transform: uppercase;">Поредица</span>
              <strong style="font-size: 20px; color: #b45309;">${streakDays} дни</strong>
            </td>
          </tr>
        </table>

        <!-- Overcome Deficits -->
        <div style="margin-top: 24px; padding: 16px; border-left: 4px solid #168a46; background-color: #f0fdf4; border-radius: 0 12px 12px 0;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #166534; text-transform: uppercase; letter-spacing: 0.5px;">
            👏 Преодолени пропуски тази седмица:
          </h3>
          <ul style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.5;">
            ${resolvedHtml}
          </ul>
        </div>

        <!-- Areas for Next Week -->
        <div style="margin-top: 16px; padding: 16px; border-left: 4px solid #f59e0b; background-color: #fffbeb; border-radius: 0 12px 12px 0;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px;">
            🎯 Фокус за предстоящата седмица:
          </h3>
          <ul style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.5;">
            ${focusHtml}
          </ul>
        </div>

        <!-- Advice for Parent -->
        <div style="margin-top: 24px; padding: 18px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0a4b82;">
            💡 Препоръка от образователния ментор:
          </h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #475569;">
            ${adviceForParent}
          </p>
        </div>

        <!-- Button -->
        <div style="margin-top: 28px; text-align: center;">
          <a href="${baseAppUrl}#planner" style="display: inline-block; background-color: #0a4b82; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 10px; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);">
            Виж пълното родителско табло →
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #475569;">
        <p style="margin: 0;">
          StudyBG • Платформа за персонализирана подготовка за ДЗИ и ДИППК по стандартите на МОН
        </p>
        <p style="margin: 4px 0 0 0;">
          Получавате този имейл като регистриран родител на ученик в платформата.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

const LOCAL_STORAGE_SUBSCRIBERS_KEY = 'studybg_newsletter_subscribers';
const LOCAL_STORAGE_RECENT_EMAIL_KEY = 'studybg_last_used_email';

/**
 * Вътрешен помощник за сървърно изпращане чрез Resend:
 * 1) Опитва Vercel Serverless Function `/api/send-email`
 * 2) При липса на Vercel функция/ключ опитва Supabase Edge Function `resend-mailer`
 */
async function dispatchViaResend(payload: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ delivered: boolean; id?: string | null; error?: string }> {
  // 1. Опит през Vercel Serverless Route (/api/send-email)
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; id?: string | null };
      if (data?.success) {
        return { delivered: true, id: data.id ?? null };
      }
    } else if (res.status !== 404 && res.status !== 503) {
      const errData = (await res.json().catch(() => ({}))) as { message?: string };
      if (errData?.message) {
        return { delivered: false, error: errData.message };
      }
    }
  } catch {
    // Продължаваме към резервния канал (Supabase Edge Function или mailto)
  }

  // 2. Опит през Supabase Edge Function `resend-mailer` (ако е конфигурирана)
  try {
    const { supabase, isSupabaseConfigured } = await import('./supabaseClient');
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.functions.invoke('resend-mailer', {
        body: payload,
      });
      if (!error && data && (data as { success?: boolean }).success) {
        return { delivered: true, id: (data as { id?: string | null }).id ?? null };
      }
    }
  } catch {
    // Без прекъсване
  }

  return { delivered: false };
}

/**
 * Service handling email dispatch (Resend + mailto fallback) and newsletter subscriptions
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
      const parsedSubs: unknown = JSON.parse(raw);
      const subs: NewsletterSubscription[] = Array.isArray(parsedSubs) ? parsedSubs : [];
      if (subs.length > 0) {
        return { subscribed: true, subscription: subs[subs.length - 1] };
      }
      return { subscribed: false };
    } catch {
      return { subscribed: false };
    }
  },

  /**
   * Генерира приветствен HTML имейл при абонамент за седмичния бюлетин на StudyBG
   */
  generateWelcomeNewsletterHtml(email: string, grade: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; line-height: 1.55; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #1e3a8a, #2563eb); color: #ffffff; padding: 28px 24px; text-align: left; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px; }
    .title { margin: 0; font-size: 22px; font-weight: 800; }
    .body { padding: 24px; }
    .tip-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 12px 16px; border-radius: 8px; margin-bottom: 12px; font-size: 13px; color: #334155; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 22px; border-radius: 10px; font-size: 13px; font-weight: 700; margin-top: 16px; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">StudyBG Седмичен Бюлетин • ${grade}</span>
      <h1 class="title">Добре дошъл в седмичната подготовка на StudyBG!</h1>
    </div>
    <div class="body">
      <p style="font-size: 14px; color: #334155;">
        Здравей! Твоят имейл <strong>${email}</strong> е записан за седмичния учебен бюлетин с фокус <strong>${grade}</strong>.
      </p>
      <p style="font-size: 13px; color: #475569;">
        Какво можеш да използваш още днес в платформата:
      </p>
      <div class="tip-box">
        <strong>1. Пълни изпитни варианти (100 т.):</strong> Решавай официални матури на МОН и тренировъчни варианти за ДЗИ (БЕЛ + 16 профилиращи предмета), гимназиален етап (8.–12. клас) и ДИППК (12 професии) с автоматична оценка.
      </div>
      <div class="tip-box">
        <strong>2. Генератор на блиц-изпит:</strong> Създай 20-минутен блиц тест от 10 задачи по избран от теб предмет.
      </div>
      <div class="tip-box">
        <strong>3. Справочници с формули и Банка с грешки:</strong> Всяка сбъркана задача се запазва автоматично за целеви преговор.
      </div>
      <div style="text-align: center; margin-top: 22px;">
        <a href="https://studybg.vercel.app#simulator" class="btn" style="color: #ffffff;">Към Изпитния симулатор</a>
      </div>
    </div>
    <div class="footer">
      Изпратено от <strong>StudyBG</strong> по твое съгласие (GDPR). Можеш да се отпишеш с 1 клик по всяко време от сайта.
    </div>
  </div>
</body>
</html>
    `.trim();
  },

  /**
   * Subscribe an email to the weekly study newsletter + send welcome email via Resend
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

    // 1. Облак: запис в Supabase (ако е конфигуриран)
    let savedInCloud = false;
    try {
      const { supabase, isSupabaseConfigured } = await import('./supabaseClient');
      if (isSupabaseConfigured()) {
        const { error } = await supabase
          .from('newsletter_subscribers')
          .upsert({ email: cleanEmail, grade }, { onConflict: 'email', ignoreDuplicates: true });
        if (error) console.warn('Newsletter save failed:', error.message);
        savedInCloud = !error;
      }
    } catch (err) {
      console.warn('Newsletter save failed:', err);
    }

    // 2. Изпращане на приветствен имейл чрез Resend (ако RESEND_API_KEY е активен)
    const welcomeHtml = this.generateWelcomeNewsletterHtml(cleanEmail, grade);
    const welcomeText = `Добре дошъл в седмичния бюлетин на StudyBG (${grade})! Отвори симулатора тук: https://studybg.vercel.app#simulator`;
    const resendDispatch = await dispatchViaResend({
      to: cleanEmail,
      subject: `[StudyBG] Добре дошъл в седмичната подготовка за ${grade}!`,
      html: welcomeHtml,
      text: welcomeText
    });

    if (!savedInCloud && !resendDispatch.delivered) {
      return {
        success: false,
        message: 'Абонаментът не можа да бъде записан в момента. Моля, опитайте отново по-късно.'
      };
    }

    // 3. Локално съхранение за състоянието на абонамента в браузъра
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_SUBSCRIBERS_KEY);
      const parsedExisting: unknown = raw ? JSON.parse(raw) : [];
      const existing: NewsletterSubscription[] = Array.isArray(parsedExisting) ? parsedExisting : [];
      const filtered = existing.filter(s => s.email !== cleanEmail);
      filtered.push(newSub);
      localStorage.setItem(LOCAL_STORAGE_SUBSCRIBERS_KEY, JSON.stringify(filtered));
      this.saveLastUsedEmail(cleanEmail);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    return {
      success: true,
      message: resendDispatch.delivered
        ? `Абонаментът за ${grade} е активен! Изпратихме ти приветствен имейл на ${cleanEmail} чрез Resend.`
        : `Абонаментът за ${grade} е записан. Ще ти пишем на ${cleanEmail}, когато излезе новият брой на бюлетина.`
    };
  },

  /**
   * Unsubscribe from weekly newsletter (local + cloud deletion per Art. 7(3) & Art. 17 GDPR)
   */
  async unsubscribe(email: string): Promise<void> {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_SUBSCRIBERS_KEY);
      if (raw) {
        const parsedExisting: unknown = JSON.parse(raw);
        const existing: NewsletterSubscription[] = Array.isArray(parsedExisting) ? parsedExisting : [];
        const filtered = existing.filter(s => s.email.toLowerCase() !== cleanEmail);
        localStorage.setItem(LOCAL_STORAGE_SUBSCRIBERS_KEY, JSON.stringify(filtered));
      }
      const lastUsed = localStorage.getItem(LOCAL_STORAGE_RECENT_EMAIL_KEY);
      if (lastUsed && lastUsed.toLowerCase() === cleanEmail) {
        localStorage.removeItem(LOCAL_STORAGE_RECENT_EMAIL_KEY);
      }
    } catch (e) {
      console.warn('Unsubscribe local error:', e);
    }

    try {
      const { supabase, isSupabaseConfigured } = await import('./supabaseClient');
      if (isSupabaseConfigured()) {
        const { error } = await supabase.rpc('unsubscribe_newsletter', { p_email: cleanEmail });
        if (error) console.warn('Supabase unsubscribe failed:', error.message);
      }
    } catch (err) {
      console.warn('Supabase unsubscribe notice:', err);
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
    .note-box { background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; color: #1e3a8a; }
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
    .note-box { background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; color: #1e3a8a; }
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
   * Текстова версия на имейла (за Resend text fallback, mailto: и копиране)
   */
  generatePlainText(params: EmailSendParams): string {
    const lines: string[] = [];
    if (params.recipientName?.trim()) lines.push(`Здравей, ${params.recipientName.trim()}!`, '');
    if (params.customNote?.trim()) lines.push(params.customNote.trim(), '');

    if (params.testResult) {
      const r = params.testResult;
      lines.push(`Резултат от изпит: ${r.lessonTitle}`, `Точки: ${r.score} / ${r.total}`, `Оценка: ${r.gradeBg.toFixed(2)}`);
      if (r.missedQuestions?.length) {
        lines.push('', 'Въпроси за преговор:', ...r.missedQuestions.slice(0, 10).map((q) => `• ${q}`));
      }
    } else if (params.lesson) {
      const l = params.lesson;
      lines.push(`${l.title} (${l.subject}, ${l.grade})`, '');
      if (params.includeSummary !== false) {
        lines.push(l.summary.overview, '', 'Основни акценти:', ...l.summary.keyPoints.map((p) => `• ${p}`));
      }
      if (params.includeFormulas !== false && l.summary.formulasOrDates.length > 0) {
        lines.push('', 'Дати, термини и формули:', ...l.summary.formulasOrDates.map((f) => `• ${f.label}: ${f.value}`));
      }
      if (params.includeGoldenRule !== false && l.summary.examGoldenRule) {
        lines.push('', `Златно правило: ${l.summary.examGoldenRule}`);
      }
    }
    lines.push('', '— Изпратено от StudyBG (https://studybg.vercel.app)');
    return lines.join('\n');
  },

  /**
   * Изпраща имейла директно чрез Resend (/api/send-email или Supabase Edge Function `resend-mailer`),
   * а при липса на конфигуриран ключ на сървъра предоставя резервен `mailto:` + HTML изтегляне.
   */
  async sendEmail(params: EmailSendParams): Promise<EmailDispatchResponse> {
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

    const plainText = this.generatePlainText(params);
    const MAX_MAILTO_BODY = 1800;
    const body =
      plainText.length > MAX_MAILTO_BODY
        ? `${plainText.slice(0, MAX_MAILTO_BODY)}\n\n[…] Пълният текст е копиран в StudyBG — поставете го тук или прикачете изтегления HTML файл.`
        : plainText;
    const mailtoUrl = `mailto:${encodeURIComponent(cleanEmail)}?subject=${encodeURIComponent(emailSubject ?? 'StudyBG')}&body=${encodeURIComponent(body)}`;

    // Ако не е избран принудителен mailto, опитваме сървърно изпращане чрез Resend
    if (!params.preferMailto) {
      const resendRes = await dispatchViaResend({
        to: cleanEmail,
        subject: emailSubject ?? 'StudyBG Учебен конспект',
        html: htmlContent,
        text: plainText
      });

      if (resendRes.delivered) {
        return {
          success: true,
          deliveredVia: 'resend',
          resendId: resendRes.id,
          message: `Имейлът беше изпратен директно чрез Resend до ${cleanEmail}! Проверете входящата поща (и папка Спам/Промоции).`,
          previewHtml: htmlContent,
          mailtoUrl,
          plainText
        };
      }
    }

    return {
      success: true,
      deliveredVia: 'mailto',
      message: `Отворихме имейл клиента ви с готово писмо до ${cleanEmail}. Натиснете „Изпрати“ там. Ако не се отвори, копирайте текста или изтеглете конспекта по-долу.`,
      previewHtml: htmlContent,
      mailtoUrl,
      plainText
    };
  },

  /**
   * Изпраща родителски седмичен дайджест (buildWeeklyDigestHtml) чрез Resend (/api/send-email)
   * с резервен mailto: канал.
   */
  async sendWeeklyDigestEmail(params: {
    toEmail: string;
    digestData: WeeklyDigestData;
  }): Promise<EmailDispatchResponse> {
    const cleanEmail = params.toEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, message: 'Моля, въведете валиден имейл адрес на родителя.' };
    }

    this.saveLastUsedEmail(cleanEmail);

    const { digestData } = params;
    const html = buildWeeklyDigestHtml(digestData);
    const subject = `📊 Седмичен отчет: Напредъкът на ${digestData.studentName} за Седмица ${digestData.weekNumber}`;
    const plainText = [
      `StudyBG • Седмичен отчет за ${digestData.studentName} (Седмица ${digestData.weekNumber})`,
      `Официална подготовка за ДЗИ (Матура) и ДИППК по стандартите на МОН`,
      '',
      `• Време за подготовка: ${digestData.studyHours} ч.`,
      `• Решени тестове и задачи: ${digestData.testsCompleted}`,
      `• Средна успеваемост: ${digestData.avgScorePercent}%`,
      `• Поредица (Streak): ${digestData.streakDays} дни`,
      '',
      'Преодолени пропуски тази седмица:',
      ...(digestData.weakAreasResolved.length > 0
        ? digestData.weakAreasResolved.map((w) => `✓ ${w}`)
        : ['• Продължава работата по затвърждаване на основните теми.']),
      '',
      'Фокус за предстоящата седмица:',
      ...(digestData.weakAreasToFocus.length > 0
        ? digestData.weakAreasToFocus.map((w) => `• ${w}`)
        : ['• Няма регистрирани сериозни пропуски тази седмица.']),
      '',
      `Препоръка от образователния ментор: ${digestData.adviceForParent}`,
      '',
      '— StudyBG (https://studybg.vercel.app#planner)'
    ].join('\n');

    const mailtoUrl = `mailto:${encodeURIComponent(cleanEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainText.slice(0, 1800))}`;

    const resendRes = await dispatchViaResend({
      to: cleanEmail,
      subject,
      html,
      text: plainText
    });

    if (resendRes.delivered) {
      return {
        success: true,
        deliveredVia: 'resend',
        resendId: resendRes.id,
        message: `Седмичният отчет беше изпратен успешно чрез Resend до ${cleanEmail}!`,
        previewHtml: html,
        mailtoUrl,
        plainText
      };
    }

    return {
      success: true,
      deliveredVia: 'mailto',
      message: `Седмичният отчет за ${digestData.studentName} е подготвен за ${cleanEmail} (прегледайте го или го изпратете през имейл клиента).`,
      previewHtml: html,
      mailtoUrl,
      plainText
    };
  }
};

export async function sendWeeklyDigestEmail(params: {
  toEmail: string;
  digestData: WeeklyDigestData;
}): Promise<EmailDispatchResponse> {
  return mailingService.sendWeeklyDigestEmail(params);
}
