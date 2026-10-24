import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { examHistoryService } from '../services/examHistoryService';
import { ExcellenceCertificateModal } from './ExcellenceCertificateModal';
import { useExamSimulator, type ExamSimulatorScreenProps, type ExamSimulatorViewProps } from './exam-simulator/useExamSimulator';
import { ExamCountdownStrip } from './exam-simulator/ExamCountdownStrip';
import { ExamPresetBar } from './exam-simulator/ExamPresetBar';
import { ExamHeaderBar } from './exam-simulator/ExamHeaderBar';
import { ExamResultsBanner } from './exam-simulator/ExamResultsBanner';
import { ExamModuleTabs } from './exam-simulator/ExamModuleTabs';
import { ExamModule1Panel } from './exam-simulator/ExamModule1Panel';
import { ExamModule2Panel } from './exam-simulator/ExamModule2Panel';
import { ExamModule3Panel } from './exam-simulator/ExamModule3Panel';
import { ExamStartScreen } from './exam-simulator/ExamStartScreen';
import { ExamProtocolModal } from './exam-simulator/ExamProtocolModal';

// Историята на опитите се зарежда едва когато потребителят я отвори
const ExamHistoryModal = lazy(() => import('./ExamHistoryModal').then((m) => ({ default: m.ExamHistoryModal })));

// Изпитните модули (~110 kB) се зареждат с import() едва когато са нужни
type ExamModulesModule = typeof import('../data/examModulesData');
let examModulesPromise: Promise<ExamModulesModule> | null = null;
const loadExamModules = (): Promise<ExamModulesModule> => {
  if (!examModulesPromise) {
    examModulesPromise = import('../data/examModulesData').catch((err: unknown) => {
      examModulesPromise = null; // следващият опит зарежда наново
      throw err;
    });
  }
  return examModulesPromise;
};

const ExamPapersView = lazy(() => import('./ExamPapersView').then((m) => ({ default: m.ExamPapersView })));

type SimulatorMode = 'lesson' | 'papers';

/**
 * Обвивка на симулатора: избор на режим (по урок / пълни изпитни варианти) и
 * динамично зареждане на данните за модулите само за режима „по урок“.
 */
export const ExamSimulatorView: React.FC<ExamSimulatorViewProps> = (props) => {
  const [mode, setMode] = useState<SimulatorMode>('lesson');
  const [examModules, setExamModules] = useState<ExamModulesModule | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    if (mode !== 'lesson' || examModules) return;
    let active = true;
    loadExamModules()
      .then((mod) => {
        if (active) setExamModules(mod);
      })
      .catch(() => {
        if (active) setLoadError('Изпитните модули не успяха да се заредят. Проверете връзката и опитайте отново.');
      });
    return () => {
      active = false;
    };
  }, [mode, examModules, loadAttempt]);

  const examData = useMemo(
    () => (examModules ? examModules.getExamModulesForLesson(props.currentLesson) : null),
    [examModules, props.currentLesson]
  );

  const tabClass = (active: boolean) =>
    `px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
      active ? 'bg-brand-sapphire text-white border-brand-sapphire' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
    }`;

  return (
    <div className="space-y-5">
      <div role="tablist" aria-label="Режим на симулатора" className="flex flex-wrap items-center gap-2">
        <button type="button" role="tab" aria-selected={mode === 'lesson'} onClick={() => setMode('lesson')} className={tabClass(mode === 'lesson')}>
          Изпит по текущия урок
        </button>
        <button type="button" role="tab" aria-selected={mode === 'papers'} onClick={() => setMode('papers')} className={tabClass(mode === 'papers')}>
          Пълни изпитни варианти с ключ
        </button>
      </div>

      {mode === 'papers' ? (
        <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Зареждане на изпитните варианти…</div>}>
          <ExamPapersView onOpenErrorBank={props.onOpenErrorBank} />
        </Suspense>
      ) : examData ? (
        <ExamSimulatorScreen {...props} examData={examData} />
      ) : (
        <div role={loadError ? 'alert' : 'status'} className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
          {loadError ?? 'Зареждане на изпитните модули…'}
          {loadError && (
            <button
              type="button"
              onClick={() => {
                setLoadError(null);
                setLoadAttempt((n) => n + 1);
              }}
              className="mt-3 block mx-auto px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold"
            >
              Опитай отново
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ExamSimulatorScreen: React.FC<ExamSimulatorScreenProps> = (props) => {
  const sim = useExamSimulator(props);
  const { currentLesson, secondsLeft, isExamRunning, isCertModalOpen, setIsCertModalOpen, isHistoryModalOpen, setIsHistoryModalOpen, setHistoryCount, handleSubmitExam, module1Points, module2Points, module3Points, totalPoints, gradeInfo, examScale, formatTimer, mod1CompletedCount, mod2CompletedCount } = sim;

  return (
    <div className="space-y-6">
      
      <ExamCountdownStrip sim={sim} />
      <ExamPresetBar sim={sim} />

      {/* Main Exam Simulator Container */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        
        <ExamHeaderBar sim={sim} />

        <ExamResultsBanner sim={sim} />

        <ExamModuleTabs sim={sim} />

        <ExamModule1Panel sim={sim} />

        <ExamModule2Panel sim={sim} />

        <ExamModule3Panel sim={sim} />

        {/* Global Submit Button while Exam is running */}
        {isExamRunning && (
          <div className="pt-6 mt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span>Оставащо време: <strong className="tabular-nums text-slate-900">{formatTimer(secondsLeft)}</strong></span>
              <span>•</span>
              <span>Попълнени: {mod1CompletedCount} въпроса, {mod2CompletedCount} задачи от извора</span>
            </div>

            <button
              onClick={handleSubmitExam}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>Предай целия изпит (100 точки)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <ExamStartScreen sim={sim} />
      </div>

      <ExamProtocolModal sim={sim} />

      {/* Exam History & Academic Progress Modal */}
      {isHistoryModalOpen && (
        <Suspense fallback={null}>
          <ExamHistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            onRefresh={() => setHistoryCount(examHistoryService.getAllAttempts().length)}
          />
        </Suspense>
      )}

      {/* Digital Certificate of Academic Excellence Modal */}
      <ExcellenceCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        achievementTitle={`100-точкова Изпитна Симулация: ${currentLesson.title}`}
        examOrTrackLabel={`${currentLesson.subject} • ${currentLesson.grade}`}
        scoreText={`Резултат: ${totalPoints} / 100 точки`}
        gradeLabel={examScale.scale ? `Оценка: ${gradeInfo.grade}` : `Резултат: ${gradeInfo.grade} (НВО)`}
        highlights={[
          `Модул 1 (Тест): ${module1Points} / 40 т.`,
          `Модул 2 (Извори): ${module2Points} / 30 т.`,
          `Модул 3 (Есе/ЛИС): ${module3Points} / 30 т.`
        ]}
      />

    </div>
  );
};
