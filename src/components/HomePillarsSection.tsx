import React from 'react';
import { Clock, Calculator, ArrowRight, BookMarked, Compass, PenTool, Mic, FlaskConical, MapPin } from 'lucide-react';
import type { AppNavTab } from './Navbar';

interface HomePillarsSectionProps {
  totalLessonsCount: number;
  onNavigateTab: (tab: AppNavTab) => void;
}

type LabCard = {
  tab: AppNavTab;
  Icon: typeof Mic;
  /** Изумрудената плочка редува сапфирената, за да има ритъм без нови цветове */
  tone: 'sapphire' | 'emerald';
  badge: string;
  title: string;
  text: string;
  action: string;
};

// Изнесено от HomeLandingView — зарежда се отложено, когато секцията приближи екрана
export const HomePillarsSection: React.FC<HomePillarsSectionProps> = ({ totalLessonsCount, onNavigateTab }) => {
  const labs: LabCard[] = [
    {
      tab: 'oralexam',
      Icon: Mic,
      tone: 'sapphire',
      badge: 'Глас и текст',
      title: 'Устно изпитване пред дъската',
      text: `Симулатор с микрофон (Web Speech API) за всички ${totalLessonsCount} урока, автоматичен одит на ключовите термини и бележник.`,
      action: 'Започни устен изпит'
    },
    {
      tab: 'sciencelab',
      Icon: FlaskConical,
      tone: 'emerald',
      badge: 'Био • хим • физ',
      title: 'Лаборатория „Природни науки“',
      text: 'ДНК репликация и транслация (кодони), pH и йонообменни реакции, закон на Ом и електрически вериги.',
      action: 'Отвори STEM лабораторията'
    },
    {
      tab: 'grammar',
      Icon: PenTool,
      tone: 'sapphire',
      badge: 'Модул 1 и 2 БЕЛ',
      title: 'Тренажор по граматика и правопис',
      text: 'Пълен/кратък член, бройна форма, запетаи при обособени и вметнати части, пароними и редактиране на текст.',
      action: 'Отвори езиковия тренажор'
    },
    {
      tab: 'literature',
      Icon: BookMarked,
      tone: 'emerald',
      badge: '41. задача (30 т.)',
      title: 'Литературен канон и тези',
      text: 'Автори от учебната програма — от Ботев и Вазов до Талев и Димов, тематични цикли, цитати и генератор на теза.',
      action: 'Отвори литературния канон'
    },
    {
      tab: 'simulator',
      Icon: Clock,
      tone: 'sapphire',
      badge: '100 точки',
      title: '100-точков симулатор на МОН',
      text: 'Тримодулна матура с хронометър и оценител за аргументативно есе и интерпретативно съчинение.',
      action: 'Стартирай симулация'
    },
    {
      tab: 'mathlab',
      Icon: Compass,
      tone: 'emerald',
      badge: 'НВО 10 и ДЗИ',
      title: 'Математика и STEM решавач',
      text: 'Квадратни уравнения, прогресии, комбинаторика, синусова/косинусова теорема и производни стъпка по стъпка.',
      action: 'Отвори математическия лаб'
    },
    {
      tab: 'atlas',
      Icon: MapPin,
      tone: 'sapphire',
      badge: 'Договори и NUTS 2',
      title: 'Атлас „История и география“',
      text: 'Териториални промени (681–1947), мирни договори, 6-те района за планиране (NUTS 2) и климатограми.',
      action: 'Отвори интерактивния атлас'
    },
    {
      tab: 'calculator',
      Icon: Calculator,
      tone: 'emerald',
      badge: 'Наредба № 11 на МОН',
      title: 'Калкулатор за оценка и бал',
      text: 'Пресметни точно оценката си по точки (праг 30 т. = 3.00) и изчисли състезателния си бал за университет.',
      action: 'Пресметни оценка и бал'
    }
  ];

  return (
    <>
        {/* ========================================================================= */}
        {/* 3. INTERACTIVE LABORATORIES & SPECIALIZED MODULES GRID */}
        {/* ========================================================================= */}
        <section id="pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cv-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
              Специализирани лаборатории за <span className="text-brand-sapphire whitespace-nowrap">Отличен 6.00</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Всички модули са свързани с учебните програми на МОН за 5.–12. клас и работят в реално време.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {labs.map(({ tab, Icon, tone, badge, title, text, action }) => (
              <button
                key={tab}
                type="button"
                onClick={() => onNavigateTab(tab)}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 shadow-xs hover:shadow-md hover:shadow-blue-500/10 transition text-left flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl ${
                        tone === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-brand-sapphire'
                      }`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-sapphire transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                </div>
                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-sapphire">
                  <span>{action}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </section>
    </>
  );
};
