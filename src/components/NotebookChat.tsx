import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Trash2, HelpCircle, FileText, CornerDownLeft, Sparkles } from 'lucide-react';
import type { LessonData, ChatMessage } from '../types';
import { askGeminiMentor, isGeminiConfigured } from '../services/geminiService';

interface NotebookChatProps {
  lesson: LessonData;
}

export const NotebookChat: React.FC<NotebookChatProps> = ({ lesson }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Здравейте. Анализирах записките за „${lesson.title}“. Готов съм да разясня неясни понятия, да изведем най-важните формули или да отговоря на въпроси от изпитния формат на МОН.`,
      timestamp: 'Сега',
      referencedLine: 'Учебен конспект • МОН Стандарт'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // When lesson changes, notify in chat
  useEffect(() => {
    setMessages([
      {
        id: `init-${lesson.id}`,
        sender: 'assistant',
        text: `Заредени са учебните материали за „${lesson.title}“ (${lesson.subject}, ${lesson.grade}). С какво мога да помогна за подготовката ви днес?`,
        timestamp: 'Сега',
        referencedLine: `${lesson.subject} • ${lesson.grade}`
      }
    ]);
  }, [lesson]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userQuestion: string): string => {
    const q = userQuestion.toLowerCase();

    if (q.includes('по-просто') || q.includes('като за 5') || q.includes('лесно') || q.includes('приятел')) {
      return `Основното обобщение на достъпен език:\n\nТемата „${lesson.title}“ стъпва върху следната базова зависимост:\n\n• ${lesson.summary.keyPoints[0]}\n\nКогато овладеете този фундамент, останалите следствия се извеждат логически.`;
    }

    if (q.includes('контролно') || q.includes('ще се падне') || q.includes('учител') || q.includes('изпит')) {
      return `Ключови акценти, които преподавателите задължително изискват:\n\n1. Основно изискване: „${lesson.summary.examGoldenRule}“\n2. Често срещан капан: ${lesson.summary.commonTraps[0]}\n\nУверете се, че можете да формулирате тези две точки без колебание.`;
    }

    if (q.includes('трик') || q.includes('мнемоника') || q.includes('запомняне')) {
      const datesOrFormulas = lesson.summary.formulasOrDates?.map(f => `• ${f.label}: ${f.value}`).join('\n');
      return `Структурирани опорни точки за бързо запомняне на „${lesson.title}“:\n\n${datesOrFormulas || lesson.summary.keyPoints.slice(0, 3).map(p => `• ${p}`).join('\n')}\n\nПрепоръчваме да си ги запишете схематично в полето на тетрадката.`;
    }

    if (q.includes('задача') || q.includes('пример')) {
      return `Примерен въпрос от формат за контролна работа / НВО:\n\nВъпрос: ${lesson.quiz[0].question}\n\nВерен отговор: ${lesson.quiz[0].options[lesson.quiz[0].correctIndex]}\n\nОбосновка: ${lesson.quiz[0].explanation}`;
    }

    return `Съгласно държавния образователен стандарт за темата:\n\n„${lesson.summary.overview}“\n\nВодещ акцент в конспекта:\n${lesson.summary.keyPoints[0]}\n\nЖелаете ли да разгледаме конкретна задача или допълнителен пример?`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Сега'
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputValue('');
    setIsTyping(true);

    if (isGeminiConfigured()) {
      try {
        const geminiAnswer = await askGeminiMentor(
          lesson,
          nextMessages.map((m) => ({ sender: m.sender, text: m.text })),
          text.trim()
        );
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: geminiAnswer,
          timestamp: 'Сега',
          referencedLine: 'Google Gemini • МОН'
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      } catch (err) {
        console.warn('Gemini chat fallback:', err);
      }
    }

    setTimeout(() => {
      const aiReplyText = generateAIResponse(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiReplyText,
        timestamp: 'Сега',
        referencedLine: 'Учебен материал • МОН'
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `cleared-${Date.now()}`,
        sender: 'assistant',
        text: `Историята на разговора е изчистена. С какво мога да съдействам за „${lesson.title}“?`,
        timestamp: 'Сега'
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[600px] rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Учебен консултант</h3>
              <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                МОН Стандарт
              </span>
              {isGeminiConfigured() && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Gemini 1.5 Flash</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">
              Контекст: <span className="text-slate-800 font-semibold">{lesson.title}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors shadow-2xs"
          title="Изчисти разговора"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-2 bg-slate-50/70 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap pl-1 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-slate-400" />
          <span>Чести въпроси:</span>
        </span>
        {lesson.quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-xs whitespace-nowrap px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/40">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-blue-600 shadow-2xs'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.referencedLine && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-blue-600" />
                    <span>{msg.referencedLine}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-blue-600 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 rounded-tl-none flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Задайте въпрос относно „${lesson.title}“...`}
            className="flex-1 bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 transition-colors"
          />

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-3.5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none text-white transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-xs"
          >
            <span>Изпрати</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
