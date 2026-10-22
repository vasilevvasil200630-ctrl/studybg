import type React from 'react';
import { Q10Pyramid, Q11AlcoholChart, Q14PhChart, Q7Parabola, Q8RightTriangle, Q9Trapezoid } from './nvo10_2026';

/**
 * Регистър на чертежите към изпитните варианти. Данните сочат чертежа с `figureId`,
 * а тестът за вариантите проверява, че всяко такова id съществува тук.
 */
export const FIGURES: Readonly<Record<string, React.FC>> = {
  'nvo10-2026-q7-parabola': Q7Parabola,
  'nvo10-2026-q8-right-triangle': Q8RightTriangle,
  'nvo10-2026-q9-trapezoid': Q9Trapezoid,
  'nvo10-2026-q10-pyramid': Q10Pyramid,
  'nvo10-2026-q11-alcohol-chart': Q11AlcoholChart,
  'nvo10-2026-q14-ph-chart': Q14PhChart,
};
