import React, { useState } from 'react';
import { Clock, ShieldAlert, Award, MapPin, User, ChevronRight, BookOpen, GraduationCap, MessageSquare, ArrowRight } from 'lucide-react';
import { BULGARIAN_HISTORY_TIMELINE } from '../data/bulgarianHistoryTimeline';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';

interface HistoryTimelineViewProps {
  lessons?: LessonData[];
  onSelectLesson?: (lesson: LessonData) => void;
  onNavigateTab?: (tab: AppNavTab) => void;
}

export const HistoryTimelineView: React.FC<HistoryTimelineViewProps> = ({
  lessons = [],
  onSelectLesson,
  onNavigateTab
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Всички епохи');
  const [activeEventId, setActiveEventId] = useState<string>(BULGARIAN_HISTORY_TIMELINE[0].id);

  const periods = [
    'Всички епохи',
    'Първо българско царство',
    'Второ българско царство',
    'Възраждане',
    'Трета българска държава'
  ];

  const filteredEvents = BULGARIAN_HISTORY_TIMELINE.filter(event =>
    selectedPeriod === 'Всички епохи' || event.period === selectedPeriod
  );

  const activeEvent = BULGARIAN_HISTORY_TIMELINE.find(e => e.id === activeEventId) || filteredEvents[0];

  // Look for a corresponding lesson in the catalog
  const matchingLesson = lessons.find(l => {
    if (activeEvent.year === 1876 && l.id === 'history-april-uprising') return true;
    const lTitle = l.title.toLowerCase();
    const eTitle = activeEvent.title.toLowerCase();
    return lTitle.includes(eTitle.slice(0, 10)) || eTitle.includes(lTitle.slice(0, 10)) ||
      (l.subject === 'История и цивилизации' && (lTitle.includes(activeEvent.rulerOrLeader.toLowerCase()) || eTitle.includes(l.title.slice(0, 8))));
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Хронология по държавните стандарти на МОН</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
          Интерактивна линия на българската история
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Всички ключови събития, владетели, мирни договори и специфични изпитни капани от 681 г. до обявяването на Независимостта през 1908 г. Кликни върху всяко събитие за детайлен разбор и свързани уроци.
        </p>

        {/* Period Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 no-scrollbar">
          {periods.map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Timeline Events Stream */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between pb-1">
            <span>Историческа хронология ({filteredEvents.length} събития)</span>
            <span className="text-[11px] text-slate-500">Кликни за детайли</span>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-4">
            {filteredEvents.map(event => {
              const isActive = event.id === activeEventId;

              return (
                <div
                  key={event.id}
                  onClick={() => setActiveEventId(event.id)}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                    isActive
                      ? 'bg-slate-850 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {/* Timeline Node Dot */}
                  <span
                    className={`absolute -left-[25px] sm:-left-[33px] top-5 w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                      isActive
                        ? 'bg-indigo-500 border-white'
                        : 'bg-slate-900 border-slate-700'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-sm font-bold text-amber-400">
                      {event.year} г.
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {event.period}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 mb-1">
                    {event.title}
                  </h4>

                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
                    <User className="w-3 h-3 text-slate-500" />
                    <span>{event.rulerOrLeader}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {event.keyConcepts.slice(0, 3).map((concept, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/80"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Exam Inspector for Active Event */}
        {activeEvent && (
          <div className="lg:col-span-5">
            <div className="sticky top-20 p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              
              <div>
                <span className="font-mono text-2xl font-black text-amber-400 block mb-1">
                  {activeEvent.year} г.
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                  {activeEvent.period}
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-2 leading-snug">
                  {activeEvent.title}
                </h3>
              </div>

              {/* Leader & Location */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Владетел / Дейци: <strong className="text-white">{activeEvent.rulerOrLeader}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Място / Столица: {activeEvent.location}</span>
                </div>
              </div>

              {/* Historical Significance */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Историческо значение:</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  {activeEvent.significance}
                </p>
              </div>

              {/* MON Exam Trap Box */}
              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Какво пита МОН на контролно / ДЗИ:</span>
                </div>
                <p className="text-xs text-rose-200 leading-relaxed">
                  {activeEvent.monExamTrap}
                </p>
              </div>

              {/* Key Concepts for 6.00 */}
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                  Задължителни термини за шестица:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeEvent.keyConcepts.map((k, ki) => (
                    <span
                      key={ki}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-200 flex items-center gap-1"
                    >
                      <ChevronRight className="w-3 h-3 text-indigo-400" />
                      <span>{k}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Cause-and-Effect Action Buttons */}
              <div className="pt-3 border-t border-slate-800/90 space-y-2">
                {matchingLesson && onSelectLesson ? (
                  <button
                    onClick={() => onSelectLesson(matchingLesson)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Отвори пълния конспект: {matchingLesson.title}</span>
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : null}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigateTab?.('quiz')}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                    <span>Реши тест</span>
                  </button>
                  <button
                    onClick={() => onNavigateTab?.('chat')}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Питай ментора</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
