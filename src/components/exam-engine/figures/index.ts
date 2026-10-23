import type React from 'react';
import { Q10Pyramid, Q11AlcoholChart, Q14PhChart, Q7Parabola, Q8RightTriangle, Q9Trapezoid } from './nvo10_2026';
import { Q10StaffChart, Q11Triangle, Q13Barrier, Q14Lake, Q15Prism, Q17Houses, Q17Shed, Q5Line, Q7Sprinkler } from './nvo10_2025';
import { Q11ObtuseTriangle, Q12Shadows, Q13Platform, Q14Triangle120, Q15Pyramid as Q15Pyramid2024, Q17Triangle, Q3GradesChart, Q5Motion } from './nvo10_2024';
import { Q10Triangle120 as Q10Triangle120y23, Q11RightTriangle, Q12Slide, Q15Cone, Q17Isosceles, Q9TangentSecant } from './nvo10_2023';
import { Q11RightTriangle2022, Q12TrapezoidDiagonals, Q13Triangle135, Q15Cylinder, Q17Triangle2022, Q5Line2022, Q9InscribedAngle } from './nvo10_2022';
import { IntBioDrugs, IntBioFoodChain, IntBioHypertension, IntBioInvasive, IntBioPopulation, IntBioPunnett, IntChemFluoride, IntChemOxygen, IntGeoDayNight, IntGeoHydrograph, IntGeoVolcano, IntGeoWhittaker, IntPhysForces, IntPhysLightning, IntPhysRefraction, IntPhysVelocity, IntPhysWave } from './integrated';
import { D26Q4Cube } from './dzi_2026';
import { FormulaCircleAngles, FormulaCircleChords, FormulaCircleSecants, FormulaCircleTangent } from './formulaCircle';
import { Q12River, Q13Chords, Q14RightTriangle2021, Q15Parallelogram, Q6FourGraphs, Q7Parabola2021 } from './nvo10_2021';

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
  'nvo10-2024-q3-grades-chart': Q3GradesChart,
  'nvo10-2024-q5-motion': Q5Motion,
  'nvo10-2024-q11-obtuse-triangle': Q11ObtuseTriangle,
  'nvo10-2024-q12-shadows': Q12Shadows,
  'nvo10-2024-q13-platform': Q13Platform,
  'nvo10-2024-q14-triangle-120': Q14Triangle120,
  'nvo10-2024-q15-pyramid': Q15Pyramid2024,
  'nvo10-2024-q17-triangle': Q17Triangle,
  'nvo10-2023-q9-tangent-secant': Q9TangentSecant,
  'nvo10-2023-q10-triangle-120': Q10Triangle120y23,
  'nvo10-2023-q11-right-triangle': Q11RightTriangle,
  'nvo10-2023-q12-slide': Q12Slide,
  'nvo10-2023-q15-cone': Q15Cone,
  'nvo10-2023-q17-isosceles': Q17Isosceles,
  'nvo10-2022-q5-line': Q5Line2022,
  'nvo10-2022-q9-inscribed-angle': Q9InscribedAngle,
  'nvo10-2022-q11-right-triangle': Q11RightTriangle2022,
  'nvo10-2022-q12-trapezoid': Q12TrapezoidDiagonals,
  'nvo10-2022-q13-triangle': Q13Triangle135,
  'nvo10-2022-q15-cylinder': Q15Cylinder,
  'nvo10-2022-q17-triangle': Q17Triangle2022,
  'nvo10-2021-q6-four-graphs': Q6FourGraphs,
  'nvo10-2021-q7-parabola': Q7Parabola2021,
  'nvo10-2021-q12-river': Q12River,
  'nvo10-2021-q13-chords': Q13Chords,
  'nvo10-2021-q14-right-triangle': Q14RightTriangle2021,
  'nvo10-2021-q15-parallelogram': Q15Parallelogram,
  'formula-circle-angles': FormulaCircleAngles,
  'formula-circle-chords': FormulaCircleChords,
  'formula-circle-secants': FormulaCircleSecants,
  'formula-circle-tangent': FormulaCircleTangent,
  'dzi-2026-q4-cube': D26Q4Cube,
  'int-bio-population': IntBioPopulation,
  'int-bio-punnett': IntBioPunnett,
  'int-bio-drugs': IntBioDrugs,
  'int-bio-food-chain': IntBioFoodChain,
  'int-bio-invasive': IntBioInvasive,
  'int-bio-hypertension': IntBioHypertension,
  'int-chem-oxygen': IntChemOxygen,
  'int-chem-fluoride': IntChemFluoride,
  'int-phys-velocity': IntPhysVelocity,
  'int-phys-forces': IntPhysForces,
  'int-phys-refraction': IntPhysRefraction,
  'int-phys-wave': IntPhysWave,
  'int-phys-lightning': IntPhysLightning,
  'int-geo-hydrograph': IntGeoHydrograph,
  'int-geo-volcano': IntGeoVolcano,
  'int-geo-day-night': IntGeoDayNight,
  'int-geo-whittaker': IntGeoWhittaker,
};
