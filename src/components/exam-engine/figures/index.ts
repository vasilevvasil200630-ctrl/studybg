import type React from 'react';
import { Q10Pyramid, Q11AlcoholChart, Q14PhChart, Q7Parabola, Q8RightTriangle, Q9Trapezoid } from './nvo10_2026';
import { Q10StaffChart, Q11Triangle, Q13Barrier, Q14Lake, Q15Prism, Q17Houses, Q17Shed, Q5Line, Q7Sprinkler } from './nvo10_2025';

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
  'nvo10-2025-q5-line': Q5Line,
  'nvo10-2025-q7-sprinkler': Q7Sprinkler,
  'nvo10-2025-q10-staff-chart': Q10StaffChart,
  'nvo10-2025-q11-triangle': Q11Triangle,
  'nvo10-2025-q13-barrier': Q13Barrier,
  'nvo10-2025-q14-lake': Q14Lake,
  'nvo10-2025-q15-prism': Q15Prism,
  'nvo10-2025-q17-houses': Q17Houses,
  'nvo10-2025-q17-shed': Q17Shed,
};
