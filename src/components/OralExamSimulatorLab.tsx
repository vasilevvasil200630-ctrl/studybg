import React, { useState, useMemo, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Shuffle,
  CheckCircle2,
  AlertCircle,
  Award,
  BookOpen,
  RotateCcw,
  Sparkles,
  Send
} from 'lucide-react';
import type { LessonData } from '../types';
import { SUBJECTS_LIST } from '../data/curriculumDatabase';

interface OralExamSimulatorLabProps {
  lessons: LessonData[];
  currentLesson: LessonData;
  onSelectLesson?: (lesson: LessonData) => void;
}

interface GradeBookEntry {
  id: string;
  lessonTitle: string;
  subject: string;
  question: string;
  gradeNumeric: number;
  gradeLabel: string;
  matchedCount: number;
  totalKeywords: number;
  dateStr: string;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  0: SpeechRecognitionAlternativeLike;
  length: number;
  isFinal?: boolean;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export const OralExamSimulatorLab: React.FC<OralExamSimulatorLabProps> = ({
  lessons,
  currentLesson,
  onSelectLesson
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('Всички предмети');
  const [activeLessonId, setActiveLessonId] = useState<string>(currentLesson.id);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState<boolean>(false);
  const [micMessage, setMicMessage] = useState<string | null>(null);

  const [gradeBook, setGradeBook] = useState<GradeBookEntry[]>(() => {
    try {
      const saved = localStorage.getItem('studybg_oral_gradebook');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const filteredLessons = useMemo(() => {
    if (selectedSubject === 'Всички предмети') return lessons;
    return lessons.filter((l) => l.subject === selectedSubject);
  }, [lessons, selectedSubject]);

  const activeLesson = useMemo(() => {
    return lessons.find((l) => l.id === activeLessonId) || filteredLessons[0] || currentLesson;
  }, [lessons, activeLessonId, filteredLessons, currentLesson]);

  // Build oral questions list for the active lesson
  const oralQuestions = useMemo(() => {
    const list: string[] = [];
    if (activeLesson.quickQuestions && activeLesson.quickQuestions.length > 0) {
      list.push(...activeLesson.quickQuestions);
    }
    if (activeLesson.flashcards && activeLesson.flashcards.length > 0) {
      activeLesson.flashcards.slice(0, 3).forEach((fc) => {
        if (!list.includes(fc.front)) {
          list.push(fc.front);
        }
      });
    }
    if (list.length === 0) {
      list.push(`Представете основните тези, понятия и причинно-следствени връзки по темата „${activeLesson.title}“.`);
    }
    return list;
  }, [activeLesson]);

  const activeQuestion = oralQuestions[questionIndex % oralQuestions.length] || oralQuestions[0];

  // Extract 6–8 key terms / concepts from the lesson for the live rubric radar
  const rubricKeywords = useMemo(() => {
    const terms: { label: string; matchToken: string; hint: string }[] = [];

    if (activeLesson.summary.formulasOrDates) {
      activeLesson.summary.formulasOrDates.slice(0, 4).forEach((fd) => {
        const cleanLabel = fd.label.split('(')[0].trim();
        const token = cleanLabel.length >= 4 ? cleanLabel.slice(0, 6).toLowerCase() : cleanLabel.toLowerCase();
        if (token && !terms.some((t) => t.matchToken === token)) {
          terms.push({
            label: cleanLabel,
            matchToken: token,
            hint: fd.value
          });
        }
      });
    }

    if (activeLesson.flashcards) {
      activeLesson.flashcards.slice(0, 4).forEach((fc) => {
        const words = fc.back
          .replace(/[.,:;()"'„“!?-]/g, ' ')
          .split(/\s+/)
          .filter((w: string) => w.length >= 5);
        const keyWord = words[0] || fc.front.split(/\s+/).find((w: string) => w.length >= 5) || 'понятие';
        const token = keyWord.slice(0, 5).toLowerCase();
        if (token && !terms.some((t) => t.matchToken === token)) {
          terms.push({
            label: keyWord,
            matchToken: token,
            hint: fc.back.slice(0, 90)
          });
        }
      });
    }

    return terms.slice(0, 6);
  }, [activeLesson]);

  const matchedKeywords = useMemo(() => {
    const ansLower = studentAnswer.toLowerCase();
    return rubricKeywords.filter((rk) => {
      const firstWord = rk.label.toLowerCase().split(/\s+/)[0];
      const stem = firstWord.length > 5 ? firstWord.slice(0, 5) : firstWord;
      return ansLower.includes(rk.matchToken) || (stem.length >= 3 && ansLower.includes(stem));
    });
  }, [studentAnswer, rubricKeywords]);

  // Calculate oral grade based on keyword coverage + length depth
  const evaluation = useMemo(() => {
    const wordCount = studentAnswer.trim() ? studentAnswer.trim().split(/\s+/).length : 0;
    const totalKw = Math.max(1, rubricKeywords.length);
    const kwRatio = matchedKeywords.length / totalKw;
    const lengthBonus = Math.min(0.35, wordCount / 45);
    const scoreRatio = Math.min(1, kwRatio * 0.75 + lengthBonus);

    if (scoreRatio >= 0.75 || (matchedKeywords.length >= 4 && wordCount >= 18)) {
      return { numeric: 6.0, label: 'Отличен (6.00)', color: 'bg-emerald-600 text-white', badge: 'bg-emerald-50 text-emerald-900 border-emerald-300' };
    }
    if (scoreRatio >= 0.55 || matchedKeywords.length >= 3) {
      return { numeric: 5.25, label: 'Много добър (5.25)', color: 'bg-blue-600 text-white', badge: 'bg-blue-50 text-blue-900 border-blue-300' };
    }
    if (scoreRatio >= 0.35 || matchedKeywords.length >= 2) {
      return { numeric: 4.25, label: 'Добър (4.25)', color: 'bg-amber-600 text-white', badge: 'bg-amber-50 text-amber-900 border-amber-300' };
    }
    if (wordCount >= 8 || matchedKeywords.length >= 1) {
      return { numeric: 3.25, label: 'Среден (3.25)', color: 'bg-orange-600 text-white', badge: 'bg-orange-50 text-orange-900 border-orange-300' };
    }
    return { numeric: 2.0, label: 'Слаб (2.00)', color: 'bg-rose-600 text-white', badge: 'bg-rose-50 text-rose-900 border-rose-300' };
  }, [studentAnswer, rubricKeywords.length, matchedKeywords.length]);

  const handleSpeakQuestion = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeakingQuestion) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuestion(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `Устно изпитване по ${activeLesson.subject}. Тема: ${activeLesson.title}. Въпрос към ученика: ${activeQuestion}`
    );
    utterance.lang = 'bg-BG';
    utterance.rate = 0.96;
    utterance.onend = () => setIsSpeakingQuestion(false);
    utterance.onerror = () => setIsSpeakingQuestion(false);
    setIsSpeakingQuestion(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleMicrophone = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const win = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const SpeechRecConstructor = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecConstructor) {
      setMicMessage('Този браузър не поддържа директно гласово разпознаване (използвай Chrome/Edge или въведи отговора от клавиатурата).');
      return;
    }

    try {
      const recognition = new SpeechRecConstructor();
      recognition.lang = 'bg-BG';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setStudentAnswer(transcript.trim());
      };

      recognition.onerror = () => {
        setIsListening(false);
        setMicMessage('Микрофонът е спрян или не е разрешен достъпът.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      setMicMessage(null);
      setIsListening(true);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleRandomBoardCall = () => {
    const randomLesson = lessons[Math.floor(Math.random() * lessons.length)] || activeLesson;
    setSelectedSubject('Всички предмети');
    setActiveLessonId(randomLesson.id);
    onSelectLesson?.(randomLesson);
    setQuestionIndex(Math.floor(Math.random() * 5));
    setStudentAnswer('');
    setIsSubmitted(false);
  };

  const handleSubmitOralAnswer = () => {
    if (!studentAnswer.trim()) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    setIsSubmitted(true);

    const newEntry: GradeBookEntry = {
      id: `${Date.now()}`,
      lessonTitle: activeLesson.title,
      subject: activeLesson.subject,
      question: activeQuestion,
      gradeNumeric: evaluation.numeric,
      gradeLabel: evaluation.label,
      matchedCount: matchedKeywords.length,
      totalKeywords: rubricKeywords.length,
      dateStr: new Date().toLocaleDateString('bg-BG')
    };

    const updated = [newEntry, ...gradeBook].slice(0, 12);
    setGradeBook(updated);
    try {
      localStorage.setItem('studybg_oral_gradebook', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-bold">
            <Mic className="w-3.5 h-3.5 text-indigo-400" />
            <span>ГЛАСОВ И ПИСМЕН ТРЕНАЖОР • ВСИЧКИ {lessons.length} УРОКА ПО МОН</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Устно Изпитване пред Дъската за Отличен 6.00
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Чуй въпроса от виртуалния изпитващ, отговори с глас през микрофона или писмено, и следи на живо кои ключови термини и дати по еталона на МОН си покрил.
          </p>
        </div>

        <button
          onClick={handleRandomBoardCall}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-sm transition-colors shrink-0 cursor-pointer"
        >
          <Shuffle className="w-4 h-4" />
          <span>🎲 Изпитай ме на случаен въпрос</span>
        </button>
      </div>

      {/* Subject & Lesson Selector */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              1. Избери учебен предмет:
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                const subj = e.target.value;
                setSelectedSubject(subj);
                const firstMatch =
                  subj === 'Всички предмети'
                    ? lessons[0]
                    : lessons.find((l) => l.subject === subj) || lessons[0];
                if (firstMatch) {
                  setActiveLessonId(firstMatch.id);
                  setQuestionIndex(0);
                  setStudentAnswer('');
                  setIsSubmitted(false);
                }
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900"
            >
              {SUBJECTS_LIST.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              2. Избери конкретен урок ({filteredLessons.length} теми):
            </label>
            <select
              value={activeLesson.id}
              onChange={(e) => {
                const found = lessons.find((l) => l.id === e.target.value);
                if (found) {
                  setActiveLessonId(found.id);
                  onSelectLesson?.(found);
                  setQuestionIndex(0);
                  setStudentAnswer('');
                  setIsSubmitted(false);
                }
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900"
            >
              {filteredLessons.map((l) => (
                <option key={l.id} value={l.id}>
                  [{l.grade}] {l.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Examiner Question Box */}
        <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 uppercase tracking-wider">
              <span>Въпрос #{(questionIndex % oralQuestions.length) + 1} от {oralQuestions.length} пред дъската:</span>
              <span className="px-2 py-0.5 rounded bg-white border border-indigo-200 text-[10px]">
                {activeLesson.subject} • {activeLesson.grade}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              „{activeQuestion}“
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSpeakQuestion}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isSpeakingQuestion
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white hover:bg-indigo-100 text-indigo-900 border-indigo-300'
              }`}
            >
              {isSpeakingQuestion ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeakingQuestion ? 'Спри гласа' : 'Чуй въпроса'}</span>
            </button>

            <button
              onClick={() => {
                setQuestionIndex((prev) => prev + 1);
                setStudentAnswer('');
                setIsSubmitted(false);
              }}
              className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold cursor-pointer"
            >
              Следващ въпрос ➔
            </button>
          </div>
        </div>

        {/* Live Rubric Keyword Radar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>МОН Радар на задължителните понятия за Отличен 6.00 (светват при споменаване):</span>
            </span>
            <span className="font-mono font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Покрити: {matchedKeywords.length} / {rubricKeywords.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {rubricKeywords.map((rk, idx) => {
              const isMatched = matchedKeywords.some((m) => m.matchToken === rk.matchToken);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (!isSubmitted) {
                      setStudentAnswer((prev) => (prev ? `${prev} ${rk.label}` : rk.label));
                    }
                  }}
                  title={`Кликни, за да вмъкнеш или виж жокер: ${rk.hint}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {isMatched ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-2 h-2 rounded-full bg-slate-300" />}
                  <span>{rk.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Student Voice / Text Input Area */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-700">
              Твоят устен / писмен отговор пред дъската:
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMicrophone}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-300'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isListening ? 'Слушам... (Спри микрофона)' : '🎙️ Диктувай с микрофон'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStudentAnswer('');
                  setIsSubmitted(false);
                }}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                title="Изчисти отговора"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {micMessage && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{micMessage}</span>
            </div>
          )}

          <textarea
            rows={4}
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="Започни да говориш с бутона „Диктувай с микрофон“ или напиши своя отговор тук, като включиш ключовите термини, дати и формули..."
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 leading-relaxed"
          />

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleSubmitOralAnswer}
              disabled={!studentAnswer.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Предай отговора и впиши оценка в Бележника</span>
            </button>
          </div>
        </div>

        {/* Evaluation Result & Ideal 6.00 Answer */}
        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className={`px-3.5 py-1.5 rounded-xl text-sm font-black ${evaluation.color}`}>
                  {evaluation.label}
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  Покрити {matchedKeywords.length} от {rubricKeywords.length} ключови критерия на МОН
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Еталон за Отличен 6.00 пред дъската:</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 font-semibold leading-relaxed">
                {activeLesson.summary.examGoldenRule}
              </p>
              <ul className="space-y-1 pt-1">
                {activeLesson.summary.keyPoints.slice(0, 3).map((kp, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Electronic Gradebook History */}
      {gradeBook.length > 0 && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Електронен Бележник от устни изпитвания ({gradeBook.length})</span>
            </h3>
            <button
              onClick={() => {
                setGradeBook([]);
                localStorage.removeItem('studybg_oral_gradebook');
              }}
              className="text-[11px] text-slate-400 hover:text-rose-600 cursor-pointer"
            >
              Изчисти бележника
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {gradeBook.map((entry) => (
              <div key={entry.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-indigo-700 truncate">{entry.subject}</span>
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {entry.gradeLabel}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{entry.lessonTitle}</div>
                <div className="text-[11px] text-slate-500 line-clamp-1">„{entry.question}“</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
