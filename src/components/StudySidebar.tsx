import React from 'react';
import {
  BookOpen,
  CheckSquare,
  Zap,
  GraduationCap,
  Clock,
  AlertCircle,
  Printer,
  MessageSquare,
  BookMarked,
  Search,
  Camera,
  FileText,
  ChevronRight,
  Scale
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
      title: '4. Учебен каталог',
      category: 'Библиотека',
      items: [
        {
          tab: 'catalog',
          label: 'Каталог с теми',
          sublabel: `Всички ${totalLessonsCount} урока по МОН`,
          icon: BookMarked,
          accentColor: 'text-blue-600'
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
                <span className="text-amber-700 font-semibold">{currentLesson.examType}</span>
              </>
            )}
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={onOpenQuickLessonPicker}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-medium border border-slate-200 transition-colors shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>Смени тема</span>
            </button>
            <button
              onClick={onOpenScan}
              className="flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
              title="Качи снимка на записки от тетрадка"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Сканирай</span>
            </button>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>{section.title}</span>
                <span className="text-[10px] text-slate-400 font-normal">{section.category}</span>
              </div>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activeTab === item.tab;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.tab}
                      onClick={() => onSelectTab(item.tab)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200 shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-1.5 rounded-lg ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold leading-tight truncate">
                            {item.label}
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight truncate mt-0.5">
                            {item.sublabel}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {item.badge}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Action: Formula Sheets Modal */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={onOpenFormulaModal}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>МОН Справочник формули</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Quick Link to Historical Case Studies & Open Topics */}
          <div className="pt-2">
            <a
              href="#cases"
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 transition-colors shadow-2xs group"
            >
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-700" />
                <span>Отворени казуси & Есета (8)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </aside>
  );
};
