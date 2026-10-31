// Supabase Edge Function: Resend Имейл система за StudyBG.
// Позволява ключът на Resend (RESEND_API_KEY) да живее в Supabase secrets (или във Vercel).
//
// Деплой:
//   supabase secrets set RESEND_API_KEY=re_... [RESEND_FROM_EMAIL="StudyBG <noreply@твоят-домейн.bg>"]
//   supabase functions deploy resend-mailer

import { createClient } from 'npm:@supabase/supabase-js@2';

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_HTML_CHARS = 65_000;
const MAX_TEXT_CHARS = 25_000;
const MAX_SUBJECT_CHARS = 180;

const ALLOWED_ORIGINS = (
  Deno.env.get('ALLOWED_ORIGINS') ?? 'https://studybg.vercel.app,http://localhost:5173,http://localhost:4173'
)
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const corsHeaders = (origin: string): Record<string, string> => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  Vary: 'Origin'
});

const json = (body: unknown, status: number, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin') ?? '';
  const headers = corsHeaders(origin);

  if (req.method === 'OPTIONS') return new Response('ok', { headers });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, headers);
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return json({ error: 'origin_not_allowed' }, 403, headers);

  const apiKey = (Deno.env.get('RESEND_API_KEY') ?? '').trim();
  if (!apiKey) return json({ error: 'resend_not_configured' }, 503, headers);

  // Проверка на сесия (включително анонимна сесия в Supabase)
  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } }
  });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return json({ error: 'auth_required' }, 401, headers);

  let payload: { to?: unknown; subject?: unknown; html?: unknown; text?: unknown };
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'invalid_json' }, 400, headers);
  }

  const to = typeof payload.to === 'string' ? payload.to.trim().toLowerCase() : '';
  const subject = typeof payload.subject === 'string' ? payload.subject.trim() : '';
  const html = typeof payload.html === 'string' ? payload.html.trim() : '';
  const text = typeof payload.text === 'string' ? payload.text.trim() : '';

  if (!to || !EMAIL_RE.test(to)) return json({ error: 'invalid_recipient' }, 400, headers);
  if (!subject || subject.length > MAX_SUBJECT_CHARS) return json({ error: 'invalid_subject' }, 400, headers);
  if (!html && !text) return json({ error: 'empty_content' }, 400, headers);
  if (html.length > MAX_HTML_CHARS || text.length > MAX_TEXT_CHARS) {
    return json({ error: 'payload_too_large' }, 413, headers);
  }

  const fromEmail =
    (Deno.env.get('RESEND_FROM_EMAIL') ?? '').trim() ||
    'StudyBG Академия <onboarding@resend.dev>';
  const replyTo =
    (Deno.env.get('RESEND_REPLY_TO') ?? '').trim() ||
    'vasilevvasil200630@gmail.com';

  try {
    const res = await fetch('https://api.resend.com/emails', {
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

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return json(
        { error: 'resend_api_error', message: (data as { message?: string })?.message ?? 'Resend error' },
        res.status,
        headers
      );
    }

    return json({ success: true, id: (data as { id?: string })?.id ?? null }, 200, headers);
  } catch {
    return json({ error: 'upstream_timeout' }, 504, headers);
  }
});
