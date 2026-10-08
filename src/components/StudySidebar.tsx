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
          accentColor: 'text-blue-600'
        },
        {
          tab: 'audit',
          label: 'Одит за 6.00',
          sublabel: 'Критерии по МОН',
          icon: CheckSquare,
          accentColor: 'text-amber-600'
        },
        {
          tab: 'diagnostic',
          label: 'Диагноза',
          sublabel: 'Анализ на записки',
          icon: FileSearch,
          accentColor: 'text-sky-600'
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
          accentColor: 'text-emerald-600'
        },
        {
          tab: 'quiz',
          label: 'Тест за самопроверка',
          sublabel: '10 въпроса за оценка',
          icon: GraduationCap,
          accentColor: 'text-blue-600'
        },
        {
          tab: 'simulator',
          label: 'Симулатор (100т.)',
          sublabel: 'Изпитен формат МОН',
          icon: Clock,
          accentColor: 'text-amber-600'
        }
      ]
    },
    {
      title: '3. Инструменти & Помощ',
      category: 'Напредък',
      items: [
        {
          tab: 'errorbank',
          label: 'Банка с грешки',
          sublabel: 'Поправителен тест',
          icon: AlertCircle,
          accentColor: 'text-rose-600',
          badge: unresolvedErrorCount > 0 ? (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold border border-rose-200">
              {unresolvedErrorCount}
            </span>
          ) : null
        },
        {
          tab: 'generator',
          label: 'Контролни А & Б',
          sublabel: 'Готови за печат',
          icon: Printer,
          accentColor: 'text-slate-600'
        },
        {
          tab: 'chat',
          label: 'AI Ментор',
          sublabel: 'Въпроси към урока',
          icon: MessageSquare,
          accentColor: 'text-blue-600'
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
          accentColor: 'text-emerald-600'
        },
        {
          tab: 'curriculum',
          label: 'Учебна програма',
          sublabel: 'Йерархия по МОН',
          icon: Layers,
          accentColor: 'text-sky-600'
        }
      ]
    }
  ];

  return (
    <aside
      aria-label="Странично меню на Учебната академия"
      className="w-full lg:w-72 xl:w-80 flex-shrink-0"
    >
      <div className="lg:sticky lg:top-20 space-y-3.5">
        
        {/* Current Lesson Preview & Quick Switch Card */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Текущ урок
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              {currentLesson.subject}
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug mb-1">
            {currentLesson.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <span>{currentLesson.grade}</span>
            {currentLesson.examType && (
              <>
                <span>•</span>
                <span className="text-amber-700 font-medium">{currentLesson.examType}</span>
              </>
            )}
          </div>

          <button
            onClick={onOpenQuickLessonPicker}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold shadow-xs transition-all group"
            title="Отвори списъка с всички уроци за бърз избор"
          >
            <Search className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span>Смени тема ({totalLessonsCount})</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto" />
          </button>
        </div>

        {/* Vertical Tabs Sidebar Panel */}
        <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          {sections.map((section, sIdx) => (
            <div key={section.title} className={sIdx > 0 ? 'pt-3 border-t border-slate-100' : ''}>
              
              {/* Category Header */}
              <div className="flex items-center justify-between px-2 mb-1.5">
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
                      className={`w-full flex items-center justify-between gap-3 px-2.5 py-2 rounded-lg text-left transition-all text-xs group ${
                        isActive
                          ? 'bg-blue-50 text-blue-900 border border-blue-200/90 font-semibold shadow-xs'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                            isActive
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-500 group-hover:text-slate-700 group-hover:bg-slate-200/70'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.accentColor}`} />
                        </div>
                        <div className="min-w-0">
                          <div className={`truncate leading-tight ${isActive ? 'font-bold text-blue-900' : 'font-medium text-slate-800'}`}>
                            {item.label}
                          </div>
                          <div className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-blue-600/90' : 'text-slate-600'}`}>
                            {item.sublabel}
                          </div>
                        </div>
                      </div>

                      {item.badge ? (
                        item.badge
                      ) : isActive ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Utility Tools Card */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <button
            onClick={onOpenScan}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Camera className="w-4 h-4 text-white" />
            <span>Сканирай нова тетрадка</span>
          </button>

          <button
            onClick={onOpenFormulaModal}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-medium transition-all shadow-xs"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Справочник формули МОН</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
