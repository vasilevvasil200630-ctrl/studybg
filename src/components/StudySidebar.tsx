import React from 'react';
import {
  BookOpen,
  CheckSquare,
  FileSearch,
  Zap,
  GraduationCap,
  Clock,
  AlertCircle,
  Printer,
  MessageSquare,
  BookMarked,
  Layers,
  Search,
  Camera,
  FileText,
  ChevronRight
} from 'lucide-react';
import type { LessonData } from '../types';
import type { AppNavTab } from './Navbar';

interface StudySidebarProps {
  currentLesson: LessonData;
  activeTab: AppNavTab;
  onSelectTab: (tab: AppNavTab) => void;
  unresolvedErrorCount: number;
  totalLessonsCount: number;
  onOpenQuickLessonPicker: () => void;
  onOpenScan: () => void;
  onOpenFormulaModal: () => void;
}

interface NavSectionItem {
  tab: AppNavTab;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badge?: React.ReactNode;
}

export const StudySidebar: React.FC<StudySidebarProps> = ({
  currentLesson,
  activeTab,
  onSelectTab,
  unresolvedErrorCount,
  totalLessonsCount,
  onOpenQuickLessonPicker,
  onOpenScan,
  onOpenFormulaModal
}) => {
  const sections: { title: string; category: string; items: NavSectionItem[] }[] = [
    {
      title: '1. Научи & Анализирай',
      category: 'Теория',
      items: [
        {
          tab: 'summary',
          label: 'Конспект',
          sublabel: 'Синтезирана теория',
          icon: BookOpen,
          accentColor: 'text-indigo-400'
        },
        {
          tab: 'audit',
          label: 'Одит за 6.00',
          sublabel: 'Критерии по МОН',
          icon: CheckSquare,
          accentColor: 'text-amber-400'
        },
        {
          tab: 'diagnostic',
          label: 'Диагноза',
          sublabel: 'Анализ на записки',
          icon: FileSearch,
          accentColor: 'text-sky-400'
        }
      ]
    },
    {
      title: '2. Тествай се',
      category: 'Практика',
      items: [
        {
          tab: 'flashcards',
          label: 'Флаш карти',
          sublabel: 'Активно припомняне',
          icon: Zap,
          accentColor: 'text-emerald-400'
        },
        {
          tab: 'quiz',
          label: 'Тест за самопроверка',
          sublabel: '10 въпроса за оценка',
          icon: GraduationCap,
          accentColor: 'text-sky-400'
        },
        {
          tab: 'simulator',
          label: 'Симулатор (100т.)',
          sublabel: 'Изпитен формат МОН',
          icon: Clock,
          accentColor: 'text-amber-400'
        }
      ]
    },
    {
      title: '3. Инструменти & AI',
      category: 'Напредък',
      items: [
        {
          tab: 'errorbank',
          label: 'Банка с грешки',
          sublabel: 'Поправителен тест',
          icon: AlertCircle,
          accentColor: 'text-rose-400',
          badge: unresolvedErrorCount > 0 ? (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
              {unresolvedErrorCount}
            </span>
          ) : null
        },
        {
          tab: 'generator',
          label: 'Контролни А & Б',
          sublabel: 'Готови за принтиране',
          icon: Printer,
          accentColor: 'text-slate-300'
        },
        {
          tab: 'chat',
          label: 'AI Ментор',
          sublabel: 'Въпроси към урока',
          icon: MessageSquare,
          accentColor: 'text-indigo-400'
        }
      ]
    },
    {
      title: '4. Каталог & Програма',
      category: 'Библиотека',
      items: [
        {
          tab: 'catalog',
          label: 'Каталог с теми',
          sublabel: `Всички ${totalLessonsCount} урока`,
          icon: BookMarked,
          accentColor: 'text-emerald-400'
        },
        {
          tab: 'curriculum',
          label: 'Учебна програма',
          sublabel: 'Йерархия по МОН',
          icon: Layers,
          accentColor: 'text-sky-400'
        }
      ]
    }
  ];

  return (
    <aside
      aria-label="Странично меню на Учебната академия"
      className="w-full lg:w-72 xl:w-80 flex-shrink-0"
    >
      <div className="lg:sticky lg:top-24 space-y-4">
        
        {/* Current Lesson Preview & Quick Switch Card */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md backdrop-blur-md">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Текущ урок
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 font-semibold">
              {currentLesson.subject}
            </span>
          </div>

          <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug mb-1">
            {currentLesson.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <span>{currentLesson.grade}</span>
            {currentLesson.examType && (
              <>
                <span>•</span>
                <span className="text-amber-400/90 font-medium">{currentLesson.examType}</span>
              </>
            )}
          </div>

          <button
            onClick={onOpenQuickLessonPicker}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-semibold shadow-sm transition-all group"
            title="Отвори списъка с всички уроци за бърз избор"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Смени тема ({totalLessonsCount})</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 ml-auto" />
          </button>
        </div>

        {/* Vertical Tabs Sidebar Panel */}
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/70 shadow-sm backdrop-blur-md space-y-4">
          {sections.map((section, sIdx) => (
            <div key={section.title} className={sIdx > 0 ? 'pt-3 border-t border-slate-800/60' : ''}>
              
              {/* Category Header */}
              <div className="flex items-center justify-between px-2.5 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {section.title}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {section.category}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.tab;

                  return (
                    <button
                      key={item.tab}
                      onClick={() => onSelectTab(item.tab)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-xs group ${
                        isActive
                          ? 'bg-indigo-600/15 text-white border border-indigo-500/40 shadow-sm font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            isActive
                              ? 'bg-indigo-600/30 text-indigo-300'
                              : 'bg-slate-800/70 text-slate-400 group-hover:text-slate-200'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${item.accentColor}`} />
                        </div>
                        <div className="min-w-0">
                          <div className={`truncate leading-tight ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                            {item.label}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">
                            {item.sublabel}
                          </div>
                        </div>
                      </div>

                      {item.badge ? (
                        item.badge
                      ) : isActive ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-sm" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Utility Tools Card */}
        <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-2">
          <button
            onClick={onOpenScan}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all shadow-sm"
          >
            <Camera className="w-4 h-4 text-indigo-400" />
            <span>Сканирай нова тетрадка</span>
          </button>

          <button
            onClick={onOpenFormulaModal}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium transition-all"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Справочник формули МОН</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
