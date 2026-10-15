const GEMINI_MODEL = 'gemini-3.8-flash';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const serverKey = (
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    ''
  ).trim();

  if (req.method === 'GET') {
    return res.status(200).json({
      configured: serverKey.length > 10,
      model: GEMINI_MODEL
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { contents, generationConfig, customApiKey } = req.body || {};
  const activeKey = (customApiKey && String(customApiKey).trim().length > 10)
    ? String(customApiKey).trim()
    : serverKey;

  if (!activeKey || activeKey.length < 10) {
    return res.status(503).json({
      error: 'Сървърният Gemini API ключ не е конфигуриран.'
    });
  }

  if (!contents || !Array.isArray(contents)) {
    return res.status(400).json({
      error: 'Липсва полето contents в заявката.'
    });
  }

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${activeKey}`;
    const googleRes = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents,
        generationConfig: generationConfig || {
          temperature: 0.3,
          maxOutputTokens: 2048
        }
      })
    });

    const data = await googleRes.text();
    res.status(googleRes.status);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.send(data);
  } catch (err) {
    return res.status(500).json({
      error: `Грешка при връзка с Google Gemini: ${err?.message || 'Unknown error'}`
    });
  }
}
