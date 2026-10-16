// Supabase Edge Function: Gemini proxy за StudyBG.
// Ключът за Gemini живее в Supabase secrets, а не във Vercel и не в браузъра.
//
// Деплой:
//   supabase secrets set GEMINI_API_KEY=... [GEMINI_MODEL=gemini-2.5-flash] [AI_DAILY_LIMIT=30]
//   supabase functions deploy gemini-proxy
//
// Изисква валидна потребителска сесия (включително анонимна) и миграцията
// supabase/migrations/20261016_rls_and_ai_usage.sql (consume_ai_quota).
import { createClient } from 'npm:@supabase/supabase-js@2';

const FALLBACK_MODEL = 'gemini-2.5-flash';
const DEFAULT_MODEL = Deno.env.get('GEMINI_MODEL') ?? FALLBACK_MODEL;
const ALLOWED_MODELS = new Set([FALLBACK_MODEL, DEFAULT_MODEL]);
const DAILY_LIMIT = Number(Deno.env.get('AI_DAILY_LIMIT') ?? '30');
const MAX_BODY_BYTES = 6 * 1024 * 1024; // снимки за разпознаване на ръкопис
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

async function callGemini(model: string, body: string): Promise<Response> {
  return fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': Deno.env.get('GEMINI_API_KEY') ?? '' },
    body,
    signal: AbortSignal.timeout(28_000)
  });
}

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin') ?? '';
  const headers = corsHeaders(origin);

  if (req.method === 'OPTIONS') return new Response('ok', { headers });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, headers);
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return json({ error: 'origin_not_allowed' }, 403, headers);
  if (!Deno.env.get('GEMINI_API_KEY')) return json({ error: 'proxy_not_configured' }, 503, headers);
  if (Number(req.headers.get('content-length') ?? '0') > MAX_BODY_BYTES) {
    return json({ error: 'payload_too_large' }, 413, headers);
  }

  // Само за потребители със сесия (анонимните акаунти също имат роля authenticated)
  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } }
  });
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return json({ error: 'auth_required' }, 401, headers);

  const { data: allowed, error: quotaError } = await supabase.rpc('consume_ai_quota', { p_limit: DAILY_LIMIT });
  if (quotaError) return json({ error: 'quota_check_failed' }, 500, headers);
  if (allowed !== true) return json({ error: 'daily_limit_reached', limit: DAILY_LIMIT }, 429, headers);

  let payload: { model?: unknown; contents?: unknown; systemInstruction?: unknown; generationConfig?: unknown };
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'invalid_json' }, 400, headers);
  }
  if (!Array.isArray(payload.contents) || payload.contents.length === 0) {
    return json({ error: 'invalid_request' }, 400, headers);
  }

  // Препращаме само позволените полета — клиентът не може да подмени ключ, URL или инструменти
  const body = JSON.stringify({
    contents: payload.contents,
    systemInstruction: payload.systemInstruction,
    generationConfig: payload.generationConfig
  });
  const requested = typeof payload.model === 'string' && ALLOWED_MODELS.has(payload.model) ? payload.model : DEFAULT_MODEL;

  try {
    let res = await callGemini(requested, body);
    if (res.status === 404 && requested !== FALLBACK_MODEL) {
      res = await callGemini(FALLBACK_MODEL, body);
    }
    return new Response(await res.text(), {
      status: res.status,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  } catch {
    return json({ error: 'upstream_timeout' }, 504, headers);
  }
});
