import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2 } from 'lucide-react';
import type { LessonData, ChatMessage } from '../types';

interface NotebookChatProps {
  lesson: LessonData;
}

export const NotebookChat: React.FC<NotebookChatProps> = ({ lesson }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Здравей! Аз съм твоят StudyBG асистент. Прочетох записките ти за „${lesson.title}“. Можеш да ме питаш всичко — да ти обясня нещо по-просто, да проверим трудни термини или да познаем какво ще те пита учителят!`,
      timestamp: 'Сега',
      referencedLine: 'Снимка на тетрадката, стр. 1'
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
        text: `Заредих новите записки за „${lesson.title}“ (${lesson.subject}). Питай ме свободен въпрос или избери от бързите бутони отгоре!`,
        timestamp: 'Сега',
        referencedLine: `${lesson.subject}, ${lesson.grade}`
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
      return `Ето най-простото обяснение: Представи си, че ${lesson.title} се крепи на едно главно правило:\n\n👉 „${lesson.summary.keyPoints[0]}“\n\nАко това го разбереш, останалото се подрежда само!`;
    }

    if (q.includes('контролно') || q.includes('ще се падне') || q.includes('учител') || q.includes('изпит')) {
      return `🎯 На 99% госпожата/господинът ще се опита да ви хване на следното:\n\n⚠️ ${lesson.summary.commonTraps[0]}\n\nСъщо така запомни златното правило за 6.00: „${lesson.summary.examGoldenRule}“!`;
    }

    if (q.includes('трик') || q.includes('мнемоника') || q.includes('запомняне')) {
      const datesOrFormulas = lesson.summary.formulasOrDates?.map(f => `• ${f.label} ➔ ${f.value}`).join('\n');
      return `🧠 Трик за запомняне на „${lesson.title}“:\nСвържи понятията с асоциация. Ето най-важното за фотографска памет:\n${datesOrFormulas || lesson.summary.keyPoints.slice(0, 3).join('\n')}`;
    }

    if (q.includes('задача') || q.includes('пример')) {
      return `✍️ Ето класическа тестова ситуация по темата:\n\nВъпрос: ${lesson.quiz[0].question}\n\nВерен отговор: ${lesson.quiz[0].options[lesson.quiz[0].correctIndex]}\n\nЗащо: ${lesson.quiz[0].explanation}`;
    }

    return `Според записаното на твоя лист:\n\n„${lesson.summary.overview}“\n\nНай-важният акцент от тетрадката е:\n${lesson.summary.keyPoints[0]}\n\nИскаш ли да ти задам един бърз въпрос, за да проверим дали си го усвоил?`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Сега'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReplyText = generateAIResponse(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiReplyText,
        timestamp: 'Сега',
        referencedLine: 'Записки в тетрадката'
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `cleared-${Date.now()}`,
        sender: 'assistant',
        text: `Историята на чата е изчистена. Какво искаш да обсъдим за „${lesson.title}“?`,
        timestamp: 'Сега'
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[650px] rounded-3xl bg-[#111426] border border-white/10 shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 sm:p-5 bg-[#141830] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0d0f1f] rounded-2xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#141830]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white">Питай тетрадката си</h3>
              <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">
                AI Чат
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
              Свързан с: <span className="text-white font-medium">{lesson.title}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-rose-300 transition-all"
            title="Изчисти чата"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-3 bg-[#13162b]/60 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap pl-1">
          💡 Бързи въпроси:
        </span>
        {lesson.quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-xs whitespace-nowrap px-3 py-1 rounded-xl bg-white/5 hover:bg-indigo-600/30 text-slate-300 hover:text-white border border-white/5 hover:border-indigo-500/40 transition-all active:scale-95"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs flex-shrink-0 ${
                  isUser
                    ? 'bg-gradient-to-tr from-sky-500 to-indigo-600 text-white'
                    : 'bg-[#1e2340] border border-indigo-500/30 text-sky-400'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-md shadow-indigo-600/20'
                    : 'bg-[#181d36] text-slate-200 border border-white/5 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.referencedLine && (
                  <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="text-emerald-400 font-bold">📄 Източник:</span>
                    <span>{msg.referencedLine}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1e2340] border border-indigo-500/30 text-sky-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#181d36] border border-white/5 rounded-tl-none flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-[#141830] border-t border-white/10">
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
            placeholder={`Попитай нещо за „${lesson.title}“...`}
            className="flex-1 bg-[#1a1f3d] text-white placeholder-slate-400 text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-500 transition-colors"
          />

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white transition-all shadow-md shadow-indigo-600/20 hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
