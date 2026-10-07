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
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
        isSpeaking
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700/60'
      }`}
      title="Аудио прочит на конспекта"
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-rose-400" />
          <span>Спри звука</span>
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse [animation-delay:0.15s]" />
            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse [animation-delay:0.3s]" />
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Аудио прочит</span>
        </>
      )}
    </button>
  );
};
