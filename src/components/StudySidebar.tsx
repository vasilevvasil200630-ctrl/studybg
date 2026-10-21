import React from 'react';
import {
  BookOpen,
  CheckSquare,
  Zap,
  GraduationCap,
  Clock,
  AlertCircle,
  Printer,
  BookMarked,
  Search,
  Camera,
  FileText,
  ChevronRight,
  Scale,
  Compass,
  Calculator,
  Home,
  PenTool,
  Calendar,
  Feather,
  MapPin,
  Globe,
  FlaskConical,
  Mic
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
  onOpenCultureContext?: () => void;
}

interface NavSectionItem {
  tab: AppNavTab | 'culture-context';
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badge?: React.ReactNode;
  onClick?: () => void;
}

export const StudySidebar: React.FC<StudySidebarProps> = ({
  currentLesson,
  activeTab,
  onSelectTab,
  unresolvedErrorCount,
  totalLessonsCount,
  onOpenQuickLessonPicker,
  onOpenScan,
  onOpenFormulaModal,
  onOpenCultureContext
}) => {
  const sections: { title: string; items: NavSectionItem[] }[] = [
    {
      title: 'Учебна подготовка',
      items: [
        {
          tab: 'specialties',
          label: 'Училища & Специалности 8–12 кл.',
          sublabel: '',
          icon: GraduationCap,
          accentColor: 'text-blue-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
              8.–12. кл.
            </span>
          )
        },
        {
          tab: 'planner',
          label: 'Моят План за 6.00',
          sublabel: '',
          icon: Calendar,
          accentColor: 'text-emerald-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
              Таймер
            </span>
          )
        },
        {
          tab: 'summary',
          label: 'Конспект',
          sublabel: '',
          icon: BookOpen,
          accentColor: 'text-blue-600'
        },
        {
          tab: 'oralexam',
          label: 'Устно изпитване пред дъската',
          sublabel: '',
          icon: Mic,
          accentColor: 'text-violet-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-violet-100 text-violet-800 font-bold border border-violet-200">
              Глас & 6.00
            </span>
          )
        },
        {
          tab: 'cases',
          label: 'Казуси за ДЗИ',
          sublabel: '',
          icon: Scale,
          accentColor: 'text-rose-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold border border-rose-200">
              11–12 кл
            </span>
          )
        },
        {
          tab: 'culture-context',
          label: 'Исторически контекст',
          sublabel: '',
          icon: Compass,
          accentColor: 'text-amber-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
              Извори
            </span>
          ),
          onClick: onOpenCultureContext
        },
        {
          tab: 'audit',
          label: 'Одит на тетрадката',
          sublabel: '',
          icon: CheckSquare,
          accentColor: 'text-emerald-600'
        }
      ]
    },
    {
      title: 'Матура, БЕЛ, STEM & Атлас',
      items: [
        {
          tab: 'grammar',
          label: 'Тренажор БЕЛ (Модул 1)',
          sublabel: '',
          icon: PenTool,
          accentColor: 'text-blue-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-bold border border-blue-200">
              БАН
            </span>
          )
        },
        {
          tab: 'moduletwo',
          label: 'Тропи, Пароними & Резюме',
          sublabel: '',
          icon: Feather,
          accentColor: 'text-indigo-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">
              Модул 2
            </span>
          )
        },
        {
          tab: 'literature',
          label: 'Литературен Канон & Тези',
          sublabel: '',
          icon: BookMarked,
          accentColor: 'text-fuchsia-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-fuchsia-100 text-fuchsia-800 font-bold border border-fuchsia-200">
              41. в-с
            </span>
          )
        },
        {
          tab: 'mathlab',
          label: 'Математика & STEM Лаб',
          sublabel: '',
          icon: Compass,
          accentColor: 'text-cyan-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 font-bold border border-cyan-200">
              НВО & ДЗИ
            </span>
          )
        },
        {
          tab: 'sciencelab',
          label: 'Лаб Природни науки',
          sublabel: '',
          icon: FlaskConical,
          accentColor: 'text-emerald-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
              ДНК, Йони & Ом
            </span>
          )
        },
        {
          tab: 'atlas',
          label: 'Атлас История & География',
          sublabel: '',
          icon: MapPin,
          accentColor: 'text-amber-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
              Карти & NUTS 2
            </span>
          )
        },
        {
          tab: 'english',
          label: 'Английски език (ДЗИ)',
          sublabel: '',
          icon: Globe,
          accentColor: 'text-sky-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 font-bold border border-sky-200">
              B1.1 & B2
            </span>
          )
        },
        {
          tab: 'civics',
          label: 'Конституция & ЕС (ГО)',
          sublabel: '',
          icon: Scale,
          accentColor: 'text-indigo-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">
              Власти & ЕС
            </span>
          )
        }
      ]
    },
    {
      title: 'Проверка на знанията',
      items: [
        {
          tab: 'blitz',
          label: 'Блиц за 60 сек. (Speed Blitz)',
          sublabel: '',
          icon: Zap,
          accentColor: 'text-orange-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 font-bold border border-orange-200">
              Combo x5
            </span>
          )
        },
        {
          tab: 'flashcards',
          label: 'Флаш карти',
          sublabel: '',
          icon: Zap,
          accentColor: 'text-emerald-600'
        },
        {
          tab: 'quiz',
          label: 'Бърз тест (10 в.)',
          sublabel: '',
          icon: GraduationCap,
          accentColor: 'text-blue-600'
        },
        {
          tab: 'simulator',
          label: '100т. Симулатор',
          sublabel: '',
          icon: Clock,
          accentColor: 'text-amber-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
              МОН
            </span>
          )
        }
      ]
    },
    {
      title: 'Инструменти & Каталог',
      items: [
        {
          tab: 'errorbank',
          label: 'Банка с грешки',
          sublabel: '',
          icon: AlertCircle,
          accentColor: 'text-rose-600',
          badge: unresolvedErrorCount > 0 ? (
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 font-bold border border-rose-200">
              {unresolvedErrorCount}
            </span>
          ) : null
        },
        {
          tab: 'generator',
          label: 'Контролни за печат',
          sublabel: '',
          icon: Printer,
          accentColor: 'text-violet-600'
        },
        {
          tab: 'catalog',
          label: 'Учебна програма',
          sublabel: '',
          icon: BookMarked,
          accentColor: 'text-emerald-600',
          badge: (
            <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-mono font-bold">
              {totalLessonsCount}
            </span>
          )
        },
        {
          tab: 'calculator',
          label: 'МОН Калкулатор оценка',
          sublabel: '',
          icon: Calculator,
          accentColor: 'text-teal-600',
          badge: (
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 font-bold border border-teal-200">
              0–100т.
            </span>
          )
        }
      ]
    }
  ];

  return (
    <aside
      aria-label="Странично меню на Учебната академия"
      className="w-full lg:w-64 xl:w-72 flex-shrink-0"
    >
      <div className="lg:sticky lg:top-20 space-y-3">
        
        {/* Quick Link back to Homepage */}
        <button
          onClick={() => onSelectTab('home')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-sky-50/70 text-slate-700 hover:text-blue-700 border border-blue-200/80 shadow-2xs text-xs font-bold transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Home className="w-3.5 h-3.5 text-sky-600 group-hover:scale-110 transition-transform" />
            <span>Към начална страница</span>
          </div>
          <span className="text-[10px] text-blue-600 font-mono font-extrabold">StudyBG</span>
        </button>

        {/* Compact Current Lesson Indicator */}
        <div className="p-3 rounded-xl bg-white border-2 border-blue-100/90 border-b-4 border-b-blue-500 shadow-2xs">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
              Текуща тема
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold truncate max-w-[120px]">
              {currentLesson.subject}
            </span>
          </div>

          <h3 className="text-xs font-extrabold text-slate-900 line-clamp-2 leading-snug">
            {currentLesson.title}
          </h3>

          <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <span className="font-semibold">{currentLesson.grade}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenScan}
                className="text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1 cursor-pointer"
                title="Сканирай записки от тетрадка"
              >
                <Camera className="w-3 h-3 text-emerald-600" />
                <span>Сканирай</span>
              </button>
              <span>•</span>
              <button
                onClick={onOpenQuickLessonPicker}
                className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Search className="w-3 h-3" />
                <span>Смени</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="p-2.5 rounded-xl bg-white border border-blue-100/90 shadow-2xs space-y-3">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-0.5">
              <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-600/80">
                {section.title}
              </div>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = item.tab !== 'culture-context' && activeTab === item.tab;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.tab}
                      onClick={() => {
                        if (item.onClick) {
                          item.onClick();
                        } else {
                          onSelectTab(item.tab as AppNavTab);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-950 font-extrabold border border-blue-300 shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${item.accentColor}`} />
                        <span className="text-xs truncate">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
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

          {/* Quick Helper Button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={onOpenFormulaModal}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold text-indigo-800 bg-indigo-50/60 hover:bg-indigo-100/80 border border-indigo-200/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>МОН Справочник формули</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-indigo-500" />
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
};
