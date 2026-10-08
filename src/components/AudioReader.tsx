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
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors shadow-2xs ${
        isSpeaking
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
      }`}
      title="Аудио прочит на конспекта"
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-rose-600" />
          <span>Спри звука</span>
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-2 bg-emerald-600 rounded-full animate-pulse" />
            <span className="w-1 h-3 bg-emerald-600 rounded-full animate-pulse [animation-delay:0.15s]" />
            <span className="w-1 h-2 bg-emerald-600 rounded-full animate-pulse [animation-delay:0.3s]" />
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Аудио прочит</span>
        </>
      )}
    </button>
  );
};
