import React, { useMemo } from 'react';
import { buildMistakesPaper, sourcePaperTitle } from '../data/mistakesPaper';
import { ExamRunner } from './exam-engine/ExamRunner';

/** Изпитният двигател и вариантите за Банката с грешки — зареждат се само при „Реши отново“ */

/** „Реши отново“: сгрешените задачи от изпитите в един набор без таймер */
export const MistakesReview: React.FC<{ questionIds: string[]; onExit: () => void }> = ({ questionIds, onExit }) => {
  // Наборът се сглобява веднъж при отваряне — задачите, усвоени по време на решаването, не изчезват от екрана
  const paper = useMemo(() => buildMistakesPaper(questionIds), []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!paper) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        Задачите вече не са налични във вариантите.{' '}
        <button type="button" onClick={onExit} className="font-semibold text-brand-sapphire hover:underline">
          Обратно към Банката
        </button>
      </div>
    );
  }
  return <ExamRunner key={paper.id} paper={paper} onExit={onExit} recordHistory={false} exitLabel="Обратно към Банката" sourceTitleOf={sourcePaperTitle} />;
};

