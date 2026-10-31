/**
 * Vercel Serverless Function: /api/send-email
 * Изпраща транзакционни и учебни имейли (конспекти, изпитни репорти и приветствен бюлетин)
 * чрез Resend REST API (https://api.resend.com/emails).
 *
 * Конфигурация във Vercel (Settings → Environment Variables):
 *   RESEND_API_KEY=re_123456789...           (Задължителен за директно изпращане)
 *   RESEND_FROM_EMAIL="StudyBG <noreply@твоят-домейн.bg>" (По избор; по подразбиране ползва Resend onboarding)
 *   RESEND_REPLY_TO="support@твоят-домейн.bg"             (По избор)
 */

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_HTML_CHARS = 65_000;
const MAX_TEXT_CHARS = 25_000;
const MAX_SUBJECT_CHARS = 180;

// In-memory rate limiting на ниво инстанция (до 8 имейла за 10 минути от един IP адрес)
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 8;
const ipHits = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    ipHits.set(ip, { windowStart: now, count: 1 });
    return true;
  }
  if (entry.count >= RATE_MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed', message: 'Позволен е само метод POST.' });
    return;
  }

  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) {
    res.status(503).json({
      error: 'resend_not_configured',
      message: 'RESEND_API_KEY не е зададен на сървъра.'
    });
    return;
  }

  const forwarded = req.headers['x-forwarded-for'];
  const clientIp =
    (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') ||
    req.socket?.remoteAddress ||
    'unknown';

  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      error: 'rate_limit_exceeded',
      message: 'Достигнат е лимитът за изпращане на имейли. Моля, опитайте отново след няколко минути.'
    });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: 'invalid_json', message: 'Невалиден JSON формат на заявката.' });
      return;
    }
  }

  const to = typeof body?.to === 'string' ? body.to.trim().toLowerCase() : '';
  const subject = typeof body?.subject === 'string' ? body.subject.trim() : '';
  const html = typeof body?.html === 'string' ? body.html.trim() : '';
  const text = typeof body?.text === 'string' ? body.text.trim() : '';

  if (!to || !EMAIL_RE.test(to)) {
    res.status(400).json({ error: 'invalid_recipient', message: 'Невалиден имейл адрес на получателя.' });
    return;
  }

  if (!subject || subject.length > MAX_SUBJECT_CHARS) {
    res.status(400).json({ error: 'invalid_subject', message: 'Невалидна тема на имейла.' });
    return;
  }

  if (!html && !text) {
    res.status(400).json({ error: 'empty_content', message: 'Липсва съдържание на имейла.' });
    return;
  }

  if (html.length > MAX_HTML_CHARS || text.length > MAX_TEXT_CHARS) {
    res.status(413).json({ error: 'payload_too_large', message: 'Съдържанието на имейла надвишава допустимия размер.' });
    return;
  }

  const fromEmail =
    (process.env.RESEND_FROM_EMAIL || '').trim() ||
    'StudyBG Академия <onboarding@resend.dev>';
  const replyTo = (process.env.RESEND_REPLY_TO || '').trim() || undefined;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject,
        html: html || undefined,
        text: text || undefined,
        reply_to: replyTo
      }),
      signal: AbortSignal.timeout(15_000)
    });

    const data = await resendRes.json().catch(() => ({}));

    if (!resendRes.ok) {
      res.status(resendRes.status).json({
        error: 'resend_api_error',
        message:
          data?.message ||
          'Resend не успя да изпрати имейла (проверете верификацията на домейна или API ключа).'
      });
      return;
    }

    res.status(200).json({
      success: true,
      id: data?.id || null
    });
  } catch {
    res.status(504).json({
      error: 'upstream_timeout',
      message: 'Връзката с Resend изтече. Моля, опитайте отново.'
    });
  }
}
