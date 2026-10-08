import type { LessonData } from '../types';

const GEMINI_API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  import.meta.env.GEMINI_API_KEY ||
  '';

export const isGeminiConfigured = (): boolean => {
  return Boolean(GEMINI_API_KEY && GEMINI_API_KEY.trim().length > 10);
};

const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

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
 * Optical Character Recognition & Notebook analysis via Google Gemini 1.5 Flash Vision
 */
export const extractNotebookTextWithGemini = async (file: File): Promise<string> => {
  if (!isGeminiConfigured()) {
    throw new Error('Gemini API ключ не е конфигуриран');
  }

  const base64Data = await fileToBase64(file);
  const mimeType = file.type || 'image/jpeg';

  const prompt = `Ти си експерт по разпознаване на български ръкопис и анализиране на ученически тетрадки по стандартите на МОН.
Твоята задача:
1. Разчети пълния ръкописен или печатен текст от тази снимка на тетрадка/учебен лист на български език.
2. Определи точната учебна тема, предмета и класа.
3. Изведи всички ключови термини, дефиниции, години или математически формули.
Върни директно разчетения текст и основните акценти на български език.`;

  const requestBody = {
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
      maxOutputTokens: 1024
    }
  };

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini Vision API грешка: ${errText}`);
  }

  const data = await response.json();
  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('Няма генериран отговор от модела');
  }

  return textOutput;
};

/**
 * Intelligent Academic Chat Mentor with Gemini 1.5 Flash
 */
export const askGeminiMentor = async (
  lesson: LessonData,
  conversationHistory: { sender: 'user' | 'assistant'; text: string }[],
  userQuestion: string
): Promise<string> => {
  if (!isGeminiConfigured()) {
    throw new Error('Gemini API ключ не е наличен');
  }

  const systemInstruction = `Ти си интелигентен академичен AI ментор в българската платформа StudyBG.
Твоята роля е да помагаш на български ученици (5.–12. клас) да разберат учебния материал за отличен 6.00 по стандартите на МОН.
Контекст на текущия урок:
- Предмет: ${lesson.subject} (${lesson.grade})
- Тема: ${lesson.title}
- Резюме: ${lesson.summary.overview}
- Ключови понятия: ${lesson.summary.keyPoints.join(', ')}
- Златно правило за контролно: ${lesson.summary.examGoldenRule}

Изисквания към отговора:
- Отговаряй винаги на български език, насърчително, структурирано и ясно.
- Използвай форматиране с булети и акценти, за да се помни лесно.
- Когато питат за задачи или изпити, давай практически съвети по формата на МОН (НВО/ДЗИ).`;

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

  const requestBody = {
    contents,
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 800
    }
  };

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini Chat API грешка: ${errText}`);
  }

  const data = await response.json();
  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('Няма получен отговор от модела');
  }

  return textOutput;
};
