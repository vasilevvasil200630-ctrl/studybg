import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioReaderProps {
  textToRead: string;
}

export const AudioReader: React.FC<AudioReaderProps> = ({ textToRead }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'bg-BG';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick Bulgarian voice if installed in browser
    const voices = window.speechSynthesis.getVoices();
    const bgVoice = voices.find(v => v.lang.startsWith('bg') || v.lang.includes('BG'));
    if (bgVoice) {
      utterance.voice = bgVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={handleToggleSpeak}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
        isSpeaking
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/20'
          : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
      }`}
      title="Слушай резюмето на глас"
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-rose-400" />
          <span>Спри звука</span>
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-2.5 bg-emerald-400 rounded-full animate-bounce" />
            <span className="w-1 h-3.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]" />
            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]" />
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Слушай аудио 🎧</span>
        </>
      )}
    </button>
  );
};
