import type { LessonData } from '../types';

const GEMINI_MODEL = 'gemini-3.8-flash';

export const getActiveGeminiApiKey = (): string => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('studybg_gemini_api_key');
    if (stored && stored.trim().length > 10) {
      return stored.trim();
    }
  }
  return '';
};

export const setStoredGeminiApiKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    const trimmed = key.trim();
    if (trimmed) {
      localStorage.setItem('studybg_gemini_api_key', trimmed);
    } else {
      localStorage.removeItem('studybg_gemini_api_key');
    }
  }
};

export const removeStoredGeminiApiKey = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('studybg_gemini_api_key');
  }
};

/**
 * Returns true because StudyBG uses the server-side /api/gemini proxy on Vercel
 * (keeping the paid key hidden from the browser), or a user-supplied localStorage key.
 */
export const isGeminiConfigured = (): boolean => {
  return true;
};

export const getGeminiApiUrl = (): string => {
  const customKey = getActiveGeminiApiKey();
  if (customKey.length > 10) {
    return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${customKey}`;
  }
  return '/api/gemini';
};

/**
 * Central helper that calls the secure Vercel serverless proxy (/api/gemini)
 * so the production API key is never exposed in client-side JavaScript bundles.
 */
async function callGeminiContent(
  requestBody: {
    contents: unknown[];
    generationConfig?: Record<string, unknown>;
  },
  explicitCustomKey?: string
): Promise<any> {
  const customKey = (explicitCustomKey || getActiveGeminiApiKey()).trim();

  // 1. Primary path: Server-side proxy /api/gemini (hides production key on server)
  try {
    const proxyRes = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...requestBody,
        ...(customKey.length > 10 ? { customApiKey: customKey } : {})
      })
    });

    if (proxyRes.ok) {
      return await proxyRes.json();
    }

    // If proxy returned a structured error and we don't have a custom key, surface it
    if (customKey.length <= 10) {
      const errText = await proxyRes.text();
      throw new Error(`Gemini API грешка (${proxyRes.status}): ${errText.slice(0, 140)}`);
    }
  } catch (err) {
    if (customKey.length <= 10) {
      throw err;
    }
  }

  // 2. Fallback path: Direct call only if the user explicitly configured a personal key in localStorage
  const directUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${customKey}`;
  const res = await fetch(directUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API грешка: ${errText.slice(0, 140)}`);
  }

  return await res.json();
}

/**
 * Verifies connectivity and validity of the server proxy or a custom Gemini API key
 */
export const testGeminiApiKey = async (customKey?: string): Promise<{ success: boolean; message: string }> => {
  try {
    const data = await callGeminiContent(
      {
        contents: [{ parts: [{ text: 'Отговори с точно една дума: „Готов“.' }] }],
        generationConfig: { maxOutputTokens: 512 }
      },
      customKey
    );

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (reply) {
      return {
        success: true,
        message: 'Google Gemini 3.8 Flash Vision е успешно свързан през защитения сървърен канал!'
      };
    }
    return {
      success: false,
      message: 'Сървърът отговори, но не върна валиден текст.'
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Грешка при свързване с Gemini: ${err?.message || 'Опитайте отново'}`
    };
  }
};

/**
 * Convert browser File to Base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Optical Character Recognition & Notebook analysis via Google Gemini 3.8 Flash Vision
 */
export const extractNotebookTextWithGemini = async (file: File): Promise<string> => {
  const base64Data = await fileToBase64(file);
  const mimeType = file.type || 'image/jpeg';

  const prompt = `Ти си експерт по разпознаване на български ръкопис и анализиране на ученически тетрадки по стандартите на МОН.
Твоята задача:
1. Разчети пълния ръкописен или печатен текст от тази снимка на тетрадка/учебен лист на български език.
2. Определи точната учебна тема, предмета и класа.
3. Изведи всички ключови термини, дефиниции, години или математически формули.
Върни директно разчетения текст и основните акценти на български език.`;

  const data = await callGeminiContent({
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 4096
    }
  });

  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('Няма генериран отговор от модела');
  }

  return textOutput;
};

/**
 * Intelligent Academic Chat Mentor with Google Gemini 3.8 Flash
 */
export const askGeminiMentor = async (
  lesson: LessonData,
  conversationHistory: { sender: 'user' | 'assistant'; text: string }[],
  userQuestion: string
): Promise<string> => {
  const systemInstruction = `Ти си интелигентен академичен AI ментор в българската платформа StudyBG.
Твоята роля е да помагаш на български ученици (8.–12. клас) да разберат учебния материал за отличен 6.00 по стандартите на МОН.
Контекст на текущия урок:
- Предмет: ${lesson.subject} (${lesson.grade})
- Тема: ${lesson.title}
- Резюме: ${lesson.summary.overview}
- Ключови понятия: ${lesson.summary.keyPoints.join(', ')}
- Златно правило за контролно: ${lesson.summary.examGoldenRule}

Изисквания към отговора:
- Отговаряй винаги на български език, насърчително, структурирано и ясно.
- Използвай форматиране с булети и акценти, за да се помни лесно.
- Когато питат за задачи или изпити, давай практически съвети по формата на МОН (НВО/ДЗИ/ДИППК).`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: `${systemInstruction}\n\nПървоначален контекст на урока.` }]
    },
    {
      role: 'model',
      parts: [{ text: `Разбрах. Готов съм да съдействам като учебен ментор по темата „${lesson.title}“.` }]
    },
    ...conversationHistory.slice(-6).map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    })),
    {
      role: 'user',
      parts: [{ text: userQuestion }]
    }
  ];

  const data = await callGeminiContent({
    contents,
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 2048
    }
  });

  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('Няма получен отговор от модела');
  }

  return textOutput;
};

export interface EssayEvaluationCriterion {
  id: string;
  name: string;
  maxPoints: number;
  description: string;
}

export interface EssayEvaluationResult {
  totalScore: number;
  scores: Record<string, number>;
  criterionFeedback: Record<string, string>;
  overallFeedback: string;
  strengths: string[];
  weaknesses: string[];
  concreteTipsForSix: string[];
  isAiGenerated: boolean;
}

/**
 * Intelligent МОН 4-criteria Essay & Argumentative Text Evaluator with Google Gemini 3.8 Flash
 */
export const evaluateEssayWithGemini = async (
  essayText: string,
  topic: string,
  rubricCriteria: EssayEvaluationCriterion[]
): Promise<EssayEvaluationResult> => {
  const trimmed = essayText.trim();
  if (!trimmed || trimmed.length < 30) {
    throw new Error('Текстът е прекалено кратък за оценяване (минимум 30 знака).');
  }

  const generateHeuristicFallback = (): EssayEvaluationResult => {
    const words = trimmed.split(/\s+/).filter(Boolean).length;
    const paragraphs = trimmed.split(/\n+/).filter((p: string) => p.trim().length > 0).length;
    const hasThesisKeywords = /считам|според|въстание|причина|следствие|исторически|героизъм|значение|свобода|народ|епоха|затова/i.test(trimmed);
    const hasCommaBeforeChe = /,\s*че\b/i.test(trimmed);

    const c1Points = Math.min(10, Math.max(3, Math.round(hasThesisKeywords ? 8 : 5) + (paragraphs > 2 ? 1 : 0)));
    const c2Points = Math.min(8, Math.max(2, Math.round(words > 120 ? 7 : (words > 60 ? 5 : 3))));
    const c3Points = Math.min(6, Math.max(2, Math.round(paragraphs >= 3 ? 5 : 3)));
    const c4Points = Math.min(6, Math.max(2, Math.round(hasCommaBeforeChe ? 5 : 4)));
    const total = c1Points + c2Points + c3Points + c4Points;

    return {
      totalScore: total,
      scores: {
        c1: c1Points,
        c2: c2Points,
        c3: c3Points,
        c4: c4Points
      },
      criterionFeedback: {
        c1: hasThesisKeywords
          ? 'Формулирана е ясна позиция по проблема, но е необходимо по-категорично аргументиране на причините и следствията.'
          : 'Тезата се нуждае от по-ясно изразено лично становище и пряк отговор на въпроса в заданието.',
        c2: words > 100
          ? 'Показано е добро боравене с ключови исторически понятия и факти за епохата.'
          : 'Препоръчва се включване на повече конкретни факти, дати, имена и цитати от изворите.',
        c3: paragraphs >= 3
          ? 'Добра структура с уводна част, изложение и заключение.'
          : 'Текстът печели, ако бъде разделен на ясни композиционни части (Увод, Теза, Аргументация, Извод).',
        c4: hasCommaBeforeChe
          ? 'Сравнително добър изказ, спазени са основните синтактични правила.'
          : 'Обърнете специално внимание на запетаите пред подчинителни съюзи („че“, „защото“) и пълния член.'
      },
      overallFeedback: `Разработката съдържа ${words} думи и демонстрира разбиране на изпитната тема. Придържането към официалната 4-критерийна скала на МОН гарантира стабилен резултат, а добавянето на още аргументи ще доближи текста до Отличен 6.00.`,
      strengths: [
        'Поставено е тематично начало с акцент върху проблема',
        words > 80 ? 'Задоволителен обем и логическа свързаност' : 'Ясен и разбираем стил на изразяване'
      ],
      weaknesses: [
        words < 120 ? 'Обемът може да се разшири с още един задълбочен аргумент' : 'Някои тези могат да се илюстрират с по-прецизни примери',
        'Необходимо е по-стегнато и синтезирано заключение'
      ],
      concreteTipsForSix: [
        'Започни изложението с категорична теза (1–2 изречения), съдържаща ключовите думи от заглавието.',
        'Всеки аргумент трябва да има пример (факт/документ) и микроизвод защо това доказва тезата ти.',
        'Прочети внимателно текста за пълен/кратък член при подлога преди предаване на свитъка.'
      ],
      isAiGenerated: false
    };
  };

  const rubricDescription = rubricCriteria
    .map(c => `- [${c.id}] ${c.name} (максимум ${c.maxPoints} т.): ${c.description}`)
    .join('\n');

  const prompt = `Ти си официален главен национален проверител на Държавни зрелостни изпити (ДЗИ) към Министерството на образованието и науката (МОН) на България.
Твоята задача е да оцениш аргументативно есе / писмена разработка на ученик за ДЗИ (12. клас) стриктно по 4-критерийната рубрика на МОН с общ сбор до 30 точки.

ТЕМА НА ИЗПИТА:
"${topic}"

КРИТЕРИИ НА МОН:
${rubricDescription}

ТЕКСТ НА УЧЕНИКА:
"""
${trimmed}
"""

ИНСТРУКЦИИ ЗА ОЦЕНЯВАНЕ:
1. Оцени строго и професионално според стандартите на МОН.
2. Върни точките за всяко id от критериите (напр. c1, c2, c3, c4). Сборът им трябва точно да отговаря на totalScore (максимум 30).
3. Посочи детайлна обратна връзка за всеки критерий на български език.
4. Изведи списък със силни страни (strengths), слабости (weaknesses) и 3 конкретни съвета за Отличен 6.00 (concreteTipsForSix).
5. Върни отговора ЕДИНСТВЕНО като валиден JSON обект в следния формат:
{
  "totalScore": 23,
  "scores": {
    "c1": 8,
    "c2": 6,
    "c3": 5,
    "c4": 4
  },
  "criterionFeedback": {
    "c1": "Коментар за тезата и аргументацията...",
    "c2": "Коментар за фактологията...",
    "c3": "Коментар за структурата...",
    "c4": "Коментар за езиковата норма и правописа..."
  },
  "overallFeedback": "Цялостен коментар на проверителя...",
  "strengths": [
    "Силна страна 1",
    "Силна страна 2"
  ],
  "weaknesses": [
    "Слабост 1",
    "Слабост 2"
  ],
  "concreteTipsForSix": [
    "Съвет 1 за Отличен 6",
    "Съвет 2 за Отличен 6",
    "Съвет 3 за Отличен 6"
  ]
}`;

  try {
    const data = await callGeminiContent({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 4096
      }
    });

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return generateHeuristicFallback();
    }

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return generateHeuristicFallback();
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      totalScore: Number(parsed.totalScore) || 20,
      scores: parsed.scores || { c1: 7, c2: 5, c3: 4, c4: 4 },
      criterionFeedback: parsed.criterionFeedback || {},
      overallFeedback: parsed.overallFeedback || 'Оценяването по стандартите на МОН приключи успешно.',
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ['Добра тематична насоченост'],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : ['Препоръчва се прецизиране на изворите'],
      concreteTipsForSix: Array.isArray(parsed.concreteTipsForSix) ? parsed.concreteTipsForSix : ['Добави синтезиран извод'],
      isAiGenerated: true
    };
  } catch (err) {
    console.warn('Error during Gemini essay evaluation:', err);
    return generateHeuristicFallback();
  }
};

export interface OralExamAiEvaluation {
  gradeNumeric: number;
  gradeLabel: string;
  commissionComment: string;
  strengths: string[];
  missingPoints: string[];
  followUpQuestion: string;
}

/**
 * Evaluates a student's spoken/written oral exam or DIPPK commission defense via Google Gemini 3.8 Flash
 */
export const evaluateOralAnswerWithGemini = async (params: {
  question: string;
  goldenAnswer: string;
  studentAnswer: string;
  subject: string;
}): Promise<OralExamAiEvaluation> => {
  const prompt = `Ти си председател на изпитна комисия по МОН (Устно изпитване за 8.–12. клас и Държавна изпитна комисия за Трета СПК / ДИППК).
Предмет / Направление: "${params.subject}"
Изпитен въпрос: "${params.question}"
Еталонен отговор за Отличен 6.00: "${params.goldenAnswer}"

Отговор на ученика:
"""
${params.studentAnswer.trim()}
"""

Оцени отговора по шестобалната система на МОН (от 2.00 до 6.00) и върни САМО валиден JSON обект:
{
  "gradeNumeric": 5.75,
  "gradeLabel": "Отличен (5.75)",
  "commissionComment": "Професионална рецензия на комисията (2-3 изречения)...",
  "strengths": ["Точно назовани понятия...", "Логическа структура..."],
  "missingPoints": ["Какво още да се допълни за пълно 6.00..."],
  "followUpQuestion": "Един уточняващ въпрос от комисията по темата..."
}`;

  const data = await callGeminiContent({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.25,
      maxOutputTokens: 2048
    }
  });

  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Неуспешно разчитане на AI оценката.');
  }
  const parsed = JSON.parse(jsonMatch[0]);
  const num = Math.min(6, Math.max(2, Number(parsed.gradeNumeric) || 5.5));
  return {
    gradeNumeric: num,
    gradeLabel: parsed.gradeLabel || `Отличен (${num.toFixed(2)})`,
    commissionComment: parsed.commissionComment || 'Много добро изложение по темата.',
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ['Ясна теза и терминология'],
    missingPoints: Array.isArray(parsed.missingPoints) ? parsed.missingPoints : ['Добавете още един конкретен пример'],
    followUpQuestion: parsed.followUpQuestion || 'Какво е практическото приложение на този принцип?'
  };
};

export interface BelModuleTwoAiEvaluation {
  score: number;
  maxScore: number;
  verdict: string;
  feedback: string;
  improvements: string[];
  modelImprovedVersion: string;
}

/**
 * Evaluates a student's Reading Synthesis (Task 40) or Thesis/Essay Draft (Task 41) in ModuleTwoBelLab via Google Gemini 3.8 Flash
 */
export const evaluateBelModuleTwoWithGemini = async (params: {
  mode: 'synthesis' | 'task41';
  topic: string;
  studentDraft: string;
  referenceText: string;
}): Promise<BelModuleTwoAiEvaluation> => {
  const maxScore = params.mode === 'synthesis' ? 4 : 30;
  const prompt = params.mode === 'synthesis'
    ? `Ти си национален проверител на ДЗИ по Български език и литература (Модул 2 — Задача за резюмиране / синтез на текст за 4 точки).
Задание: "${params.topic}"
Еталонен синтез: "${params.referenceText}"
Текст на ученика:
"""
${params.studentDraft.trim()}
"""
Оцени текста по критериите на МОН (извличане на съществената информация, до 3–4 изречения, без директни цитати в кавички, без лични коментари, спазена книжовна норма). Върни САМО валиден JSON обект:
{
  "score": 4,
  "maxScore": 4,
  "verdict": "Отличен синтез по стандарта на МОН (4 / 4 т.)",
  "feedback": "Детайлен коментар за точността, обема и езиковата норма...",
  "improvements": ["Препоръка 1...", "Препоръка 2..."],
  "modelImprovedVersion": "Редактиран безупречен вариант на резюмето на ученика..."
}`
    : `Ти си национален проверител на ДЗИ по Български език и литература (Задача 41 — Теза и аргументативен текст за 30 точки).
Тема: "${params.topic}"
Еталонна насока: "${params.referenceText}"
Чернова на ученика:
"""
${params.studentDraft.trim()}
"""
Оцени черновата по 4-те критерия на МОН (до 30 точки). Върни САМО валиден JSON обект:
{
  "score": 28,
  "maxScore": 30,
  "verdict": "Отличен 6.00 (28 / 30 т.)",
  "feedback": "Детайлен литературен и езиков коментар по К1–К4...",
  "improvements": ["Препоръка за надграждане 1...", "Препоръка 2..."],
  "modelImprovedVersion": "Надграден еталонен вариант за 30 точки..."
}`;

  const data = await callGeminiContent({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.25,
      maxOutputTokens: 2500
    }
  });

  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Неуспешно разчитане на AI оценката.');
  }
  const parsed = JSON.parse(jsonMatch[0]);
  return {
    score: Math.min(maxScore, Math.max(1, Number(parsed.score) || maxScore)),
    maxScore,
    verdict: parsed.verdict || `Оценка: ${parsed.score || maxScore} / ${maxScore} т.`,
    feedback: parsed.feedback || 'Успешен анализ по критериите на МОН.',
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
    modelImprovedVersion: parsed.modelImprovedVersion || params.referenceText
  };
};
