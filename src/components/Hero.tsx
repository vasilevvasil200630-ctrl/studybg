import React from 'react';
import { Camera, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import type { LessonData } from '../types';

interface HeroProps {
  onScanClick: () => void;
  onSelectSample: (lesson: LessonData) => void;
  lessons: LessonData[];
  currentLesson: LessonData;
}

export const Hero: React.FC<HeroProps> = ({ onScanClick, onSelectSample, lessons, currentLesson }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-sky-500/15 to-emerald-500/10 blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Новото поколение AI за българските ученици и студенти</span>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">BG 🇧🇬</span>
        </div>

        {/* Main Headline & Slogan */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          Снимай тетрадката.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
            Научи урока за 5 минути.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Качи снимка на записки с грозен почерк, конспект или PDF лекция. 
          StudyBG моментално ти дава <strong className="text-white font-semibold">Светата троица</strong> за отлична оценка: Резюме, Интерактивни флашкарти и Тест с 10 въпроса.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onScanClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Camera className="w-5 h-5 text-sky-200" />
            <span>Качи тетрадка / PDF лекция</span>
          </button>

          <a
            href="#workspace"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#14182b] text-slate-200 hover:text-white border border-white/10 hover:border-indigo-500/40 hover:bg-[#1a2038] font-semibold text-base transition-all"
          >
            <span>Отвори урока: {currentLesson.title}</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </a>
        </div>

        {/* Quick Demo Lesson Switcher */}
        <div className="mt-10 max-w-3xl mx-auto p-4 rounded-2xl bg-[#12162a]/80 border border-white/10 backdrop-blur-md">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Или изпробвай с реален готов урок:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            {lessons.map((lesson) => {
              const isSelected = lesson.id === currentLesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelectSample(lesson)}
                  className={`p-3 rounded-xl border transition-all text-left flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500/60 shadow-md shadow-indigo-500/10'
                      : 'bg-[#181d33]/50 border-white/5 hover:border-white/20 hover:bg-[#181d33]'
                  }`}
                >
                  <div className={`p-2 rounded-lg mt-0.5 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400'
                  }`}>
                    {lesson.sourceType === 'notebook' ? <Camera className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-medium text-emerald-400">{lesson.subject}</span>
                      <span className="text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">{lesson.grade}</span>
                    </div>
                    <div className="text-sm font-bold text-white truncate mt-0.5">{lesson.title}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400 font-bold">
              📸
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Smart OCR за ръкопис</h4>
              <p className="text-[11px] text-slate-400">Чете дори най-засукания почерк</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-sky-500/15 flex items-center justify-center text-sky-400 font-bold">
              ⚡
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Светата троица за 6-ца</h4>
              <p className="text-[11px] text-slate-400">Резюме, Карти и Тест с 10 въпроса</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 font-bold">
              💬
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Питай тетрадката си</h4>
              <p className="text-[11px] text-slate-400">Чат на живо със записките ти</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
