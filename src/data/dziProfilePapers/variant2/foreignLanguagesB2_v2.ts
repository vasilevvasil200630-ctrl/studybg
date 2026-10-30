import type { ExamPaper } from '../../../lib/examPaperScoring';
import { DZI_SCALE } from '../../../lib/monGradeScale';

export const DZI_FR_B2_PRACTICE_2: ExamPaper = {
  id: 'practice-dzi-fr-b2-2',
  title: 'Френски език (ниво B2) — Втори ДЗИ, тренировъчен вариант 2',
  exam: 'ДЗИ',
  subject: 'Френски език',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Втори пълен тренировъчен вариант за Втори ДЗИ по френски език (профилирана подготовка — ниво B2 по ОЕЕР). Включва Четене с разбиране (30 т.), Езикови задачи — граматика и лексика (40 т.) и Създаване на два писмени текста (30 т.).',
  sections: [
    {
      id: 'fr2-reading',
      title: 'Partie 1. Compréhension des écrits (30 points)',
      instructions:
        'Lisez les deux textes et choisissez la bonne réponse (A, B, C ou D) pour les questions 1 à 10. Chaque réponse correcte vaut 3 points.',
      questions: [
        {
          id: 'dzi-fr2-q1', number: 1, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Texte A : L’économie circulaire et la seconde vie des objets en France',
              body: `Depuis l'entrée en vigueur de la loi anti-gaspillage pour une économie circulaire (AGEC), les habitudes de consommation des Français évoluent rapidement. Afin de lutter contre l'obsolescence programmée, un „indice de réparabilité“, noté sur dix, est désormais affiché sur les appareils électroniques et électroménagers vendus en magasin comme en ligne.
Parallèlement, les ateliers de réparation participatifs („Repair Cafés“), les ressourceries associatives et les plateformes d'achat d'occasion connaissent un succès sans précédent, en particulier auprès des dix-huit – trente ans. Pour cette génération, acheter un vêtement ou un téléphone reconditionné n'est plus seulement un choix économique, mais un véritable engagement écologique.
Néanmoins, les experts rappellent que le recyclage et le réemploi ne suffisent pas à eux seuls : la véritable transition repose avant tout sur la sobriété matérielle et l'allongement de la durée d'usage des produits dès leur conception industrielle.`,
            },
          ],
          prompt: 'Quel est l’objectif principal de l’indice de réparabilité mentionné dans le Texte A ?',
          options: [
            'Augmenter le prix des appareils neufs dans tous les magasins.',
            'Informer les consommateurs sur la facilité de réparation des appareils et lutter contre l’obsolescence programmée.',
            'Interdire la vente d’ordinateurs portables en ligne.',
            'Remplacer la garantie légale par un abonnement payant.',
          ],
          correctIndex: 1,
          explanation: 'Le premier paragraphe précise que l’indice de réparabilité sur dix vise à lutter contre l’obsolescence programmée en informant l’acheteur.',
        },
        {
          id: 'dzi-fr2-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Pourquoi les jeunes de 18 à 30 ans privilégient-ils de plus en plus les produits reconditionnés ou de seconde main ?',
          options: [
            'Uniquement parce que les magasins de produits neufs ont fermé.',
            'Pour combiner avantage économique et engagement écologique responsable.',
            'Parce que la loi interdit aux jeunes d’acheter des vêtements neufs.',
            'Parce que les produits d’occasion n’ont besoin d’aucun entretien.',
          ],
          correctIndex: 1,
          explanation: 'Le texte souligne que pour cette génération, ce n’est plus seulement un choix économique, mais un véritable engagement écologique.',
        },
        {
          id: 'dzi-fr2-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'Que permettent les „Repair Cafés“ évoqués dans le deuxième paragraphe ?',
          options: [
            'D’apprendre à réparer soi-même ses objets en panne dans un cadre participatif.',
            'De commander des cafés importés à bas prix.',
            'De jeter ses appareils électriques sans tri sélectif.',
            'D’obtenir un diplôme universitaire d’ingénieur en deux jours.',
          ],
          correctIndex: 0,
          explanation: 'Les „Repair Cafés“ sont présentés comme des ateliers de réparation participatifs.',
        },
        {
          id: 'dzi-fr2-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Selon les experts cités à la fin du Texte A, sur quoi repose avant tout une transition écologique durable ?',
          options: [
            'Sur la sobriété matérielle et l’allongement de la durée d’usage dès la conception industrielle.',
            'Sur la production massive d’emballages plastiques jetables.',
            'Sur le renouvellement annuel obligatoire des téléphones.',
            'Sur la suppression du tri sélectif.',
          ],
          correctIndex: 0,
          explanation: 'Le dernier paragraphe affirme que la véritable transition repose sur la sobriété matérielle et l’allongement de la durée d’usage dès la conception.',
        },
        {
          id: 'dzi-fr2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'Dans le contexte du Texte A, que signifie l’expression „obsolescence programmée“ ?',
          options: [
            'La mise à jour gratuite d’un logiciel éducatif.',
            'La réduction délibérée de la durée de vie d’un produit pour inciter à son remplacement rapide.',
            'L’ouverture d’une bibliothèque municipale.',
            'La livraison express d’un colis.',
          ],
          correctIndex: 1,
          explanation: 'L’obsolescence programmée désigne l’ensemble des techniques visant à réduire la durée d’utilisation d’un produit pour pousser à racheter.',
        },
        {
          id: 'dzi-fr2-q6', number: 6, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Texte B : Le retour du train de nuit en Europe',
              body: `Longtemps délaissés au profit des compagnies aériennes à bas coût et des lignes à grande vitesse, les trains de nuit connaissent aujourd'hui une véritable renaissance à travers l'Europe. De Paris à Vienne, de Bruxelles à Berlin ou de Zurich à Amsterdam, de nouvelles liaisons ferroviaires nocturnes attirent une clientèle variée : familles, étudiants en programme Erasmus et voyageurs d'affaires soucieux de leur empreinte carbone.
Outre l'avantage environnemental indéniable — un trajet en train émettant jusqu'à vingt fois moins de gaz à effet de serre qu'un vol court-courrier équivalent —, le voyage nocturne permet d'économiser une nuit d'hôtel et d'arriver directement au cœur des grandes capitales dès le matin.
Cependant, le développement de ce réseau se heurte encore à des défis techniques et financiers : le manque de voitures-couchettes modernes, la diversité des systèmes de signalisation nationaux et le coût élevé des péages ferroviaires exigent une coordination accrue au niveau européen.`,
            },
          ],
          prompt: 'Quel phénomène le Texte B met-il en évidence ?',
          options: [
            'L’abandon définitif du transport ferroviaire en Europe.',
            'La renaissance et le regain de popularité des trains de nuit européens.',
            'La baisse du nombre d’étudiants Erasmus.',
            'Le remplacement de toutes les gares par des aéroports.',
          ],
          correctIndex: 1,
          explanation: 'Le texte décrit le retour en force („une véritable renaissance“) des trains de nuit en Europe.',
        },
        {
          id: 'dzi-fr2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Quel avantage pratique, en plus du bénéfice écologique, le train de nuit offre-t-il aux voyageurs ?',
          options: [
            'Il permet d’économiser une nuit d’hôtel et d’arriver directement au centre-ville le matin.',
            'Il est dix fois plus rapide qu’un avion supersonique.',
            'Il ne nécessite aucun billet ni réservation.',
            'Il circule uniquement pendant les vacances d’été.',
          ],
          correctIndex: 0,
          explanation: 'Le deuxième paragraphe mentionne l’économie d’une nuit d’hôtel et l’arrivée directe au cœur des capitales le matin.',
        },
        {
          id: 'dzi-fr2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Selon le Texte B, quel est l’impact écologique d’un trajet en train comparé à un vol court-courrier ?',
          options: [
            'Il émet deux fois plus de CO2.',
            'Il émet jusqu’à vingt fois moins de gaz à effet de serre.',
            'Les deux modes de transport ont exactement la même empreinte carbone.',
            'Le texte ne donne aucune comparaison chiffrée.',
          ],
          correctIndex: 1,
          explanation: 'Le texte indique qu’un trajet en train émet „jusqu’à vingt fois moins de gaz à effet de serre qu’un vol court-courrier équivalent“.',
        },
        {
          id: 'dzi-fr2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Quel obstacle freine encore l’expansion rapide des lignes de trains de nuit en Europe ?',
          options: [
            'L’absence totale de voyageurs intéressés.',
            'Le manque de voitures-couchettes modernes, les différences de signalisation et le coût des péages ferroviaires.',
            'L’interdiction de rouler après 22 heures.',
            'La fermeture des frontières au sein de l’espace Schengen.',
          ],
          correctIndex: 1,
          explanation: 'Le troisième paragraphe cite ces trois défis techniques et financiers précis.',
        },
        {
          id: 'dzi-fr2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Que préconise la fin du Texte B pour surmonter ces difficultés ?',
          options: [
            'Une coordination accrue au niveau européen.',
            'La privatisation immédiate de toutes les écoles.',
            'La suppression des trains à grande vitesse.',
            'Le retour aux locomotives à vapeur.',
          ],
          correctIndex: 0,
          explanation: 'La dernière phrase souligne que ces défis „exigent une coordination accrue au niveau européen“.',
        },
      ],
    },
    {
      id: 'fr2-use-of-language',
      title: 'Partie 2. Compétences linguistiques — Grammaire et lexique (40 points)',
      instructions:
        'Questions 11 à 15 : choisissez la forme correcte (3 pts chacune). Questions 16 à 20 : complétez ou transformez selon la consigne (5 pts chacune).',
      questions: [
        {
          id: 'dzi-fr2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Choisissez la forme verbale correcte après l’expression de concession : « Bien qu’il ___ très tard hier soir, elle a terminé son rapport. »',
          options: ['était', 'soit', 'sera', 'est'],
          correctIndex: 1,
          explanation: 'La locution conjonctive „bien que“ est toujours suivie du subjonctif („bien qu’il soit“).',
        },
        {
          id: 'dzi-fr2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Complétez la phrase conditionnelle (irréel du passé) : « Si nous avions réservé nos billets plus tôt, nous ___ des places en première classe. »',
          options: ['aurions eu', 'aurons eu', 'avions eu', 'avons eu'],
          correctIndex: 0,
          explanation: 'Dans l’hypothèse sur le passé : Si + plus-que-parfait („avions réservé“) -> conditionnel passé („aurions eu“) dans la principale.',
        },
        {
          id: 'dzi-fr2-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Choisissez le pronom relatif composé qui convient : « Voici le projet européen ___ nous avons consacré plusieurs mois de recherche. »',
          options: ['duquel', 'auquel', 'pour qui', 'dont'],
          correctIndex: 1,
          explanation: 'On dit „consacrer du temps à quelque chose“ (à + le projet = auquel).',
        },
        {
          id: 'dzi-fr2-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'Remplacez les compléments par les pronoms personnels qui conviennent : « As-tu envoyé les documents au directeur ? — Oui, je ___ ai envoyés ce matin. »',
          options: ['les lui', 'lui les', 'leur en', 'les y'],
          correctIndex: 0,
          explanation: 'À la forme affirmative (hors impératif), le COD („les“) précède le COI („lui“) : „je les lui ai envoyés“.',
        },
        {
          id: 'dzi-fr2-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'Quel connecteur logique exprime une conséquence ?',
          options: ['En revanche', 'Par conséquent', 'Malgré', 'Quoique'],
          correctIndex: 1,
          explanation: '„Par conséquent“ introduit une conséquence logique, tandis que „en revanche“ exprime l’opposition et „malgré / quoique“ la concession.',
        },
        {
          id: 'dzi-fr2-q16', number: 16, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Mettez le verbe entre parenthèses au subjonctif présent : « Il est indispensable que vous (savoir) ___ défendre vos arguments avec clarté. » (Écrivez uniquement la forme verbale.)',
          acceptedAnswers: ['sachiez'],
          explanation: 'Le subjonctif présent du verbe „savoir“ à la 2e personne du pluriel (vous) est „sachiez“.',
        },
        {
          id: 'dzi-fr2-q17', number: 17, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Formez le nom féminin dérivé de l’adjectif « responsable » pour compléter la phrase : « La protection de la biodiversité relève de notre ___ collective. »',
          acceptedAnswers: ['responsabilité', 'responsabilite'],
          explanation: 'Le nom dérivé de „responsable“ est „la responsabilité“.',
        },
        {
          id: 'dzi-fr2-q18', number: 18, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Accordez correctement le participe passé du verbe « prendre » : « Les décisions qu’ils ont ___ hier soir entreront en vigueur lundi. »',
          acceptedAnswers: ['prises'],
          explanation: 'Avec l’auxiliaire „avoir“, le participe passé s’accorde avec le COD „que“ (mis pour „les décisions“, féminin pluriel) placé avant le verbe -> „prises“.',
        },
        {
          id: 'dzi-fr2-q19', number: 19, kind: 'multi', points: 5,
          prompt: 'Transformez au discours indirect au passé : « Le professeur nous a annoncé : „Vous présenterez vos projets demain.“ »',
          parts: [
            {
              id: 'a', label: 'A)', points: 3,
              prompt: 'Forme du verbe « présenter » (conditionnel présent / futur dans le passé, 1re pers. du pluriel « nous ») :',
              answer: { type: 'text', acceptedAnswers: ['présenterions', 'presenterions'] },
            },
            {
              id: 'b', label: 'B)', points: 2,
              prompt: 'Transformation de l’indicateur temporel « demain » au discours indirect passé (2 mots) :',
              answer: { type: 'text', acceptedAnswers: ['le lendemain', 'lendemain'] },
            },
          ],
          explanation: 'Au discours indirect introduit par un verbe au passé, le futur simple devient conditionnel présent („présenterions“) et „demain“ devient „le lendemain“.',
        },
        {
          id: 'dzi-fr2-q20', number: 20, kind: 'multi', points: 5,
          prompt: 'Complétez avec le pronom adverbial qui convient (« y » ou « en ») :',
          parts: [
            {
              id: 'a', label: 'A)', points: 2.5,
              prompt: '« S’intéresse-t-elle à l’architecture contemporaine ? — Oui, elle s’___ intéresse beaucoup. »',
              answer: { type: 'text', acceptedAnswers: ['y'] },
            },
            {
              id: 'b', label: 'B)', points: 2.5,
              prompt: '« Avez-vous parlé de ce stage avec votre tuteur ? — Oui, nous ___ avons longuement discuté. »',
              answer: { type: 'text', acceptedAnswers: ['en'] },
            },
          ],
          explanation: 'A) „s’intéresser à qqch“ -> pronom „y“. B) „parler / discuter de qqch“ -> pronom „en“.',
        },
      ],
    },
    {
      id: 'fr2-writing',
      title: 'Partie 3. Production écrite (30 points)',
      instructions:
        'Réalisez les deux tâches d’écriture ci-dessous. Évaluez ensuite votre production à l’aide de la grille officielle et du modèle.',
      questions: [
        {
          id: 'dzi-fr2-q21', number: 21, kind: 'open', points: 12,
          prompt: `Tâche 1 (12 points) — Courriel formel (120 à 140 mots) :
Vous êtes représentant(e) des élèves de votre lycée. Vous écrivez un courriel formel au directeur du Centre culturel francophone de votre ville pour lui proposer d'organiser conjointement une „Journée de la francophonie et des métiers d'avenir“.
Dans votre courriel :
– présentez l'objectif de l'événement et le public visé ;
– proposez deux activités concrètes (conférence, atelier, projection, table ronde) ;
– sollicitez un rendez-vous pour discuter des détails logistiques.
N'utilisez pas votre vrai nom (signez : Alex Martin).`,
          criteria: [
            { label: 'Respect de la consigne, du registre formel et des formules d’appel / de politesse', points: 4 },
            { label: 'Cohérence, structure claire et réalisation des trois points demandés', points: 4 },
            { label: 'Richesse lexicale et correction grammaticale et orthographique (niveau B2)', points: 4 },
          ],
          modelAnswer: `Objet : Proposition d'organisation conjointe d'une Journée de la francophonie et des métiers d'avenir

Monsieur le Directeur,

En tant que représentant des élèves de terminale de notre lycée, je me permets de vous contacter afin de vous proposer un partenariat à l'occasion du mois de la francophonie. Notre objectif est de sensibiliser les lycéens de notre ville aux opportunités d'études supérieures et de carrières professionnelles liées à la langue française.

Dans ce cadre, nous souhaiterions organiser deux activités principales au sein de votre médiathèque : une table ronde réunissant de jeunes professionnels francophones le matin, suivie l'après-midi d'un atelier interactif consacré à la rédaction de CV et aux bourses universitaires en Europe.

Je reste à votre entière disposition pour convenir d'un entretien la semaine prochaine afin d'examiner ensemble les modalités pratiques de ce projet.

En vous remerciant par avance de l'attention que vous porterez à notre initiative, je vous prie d'agréer, Monsieur le Directeur, l'expression de mes salutations distinguées.

Alex Martin`,
        },
        {
          id: 'dzi-fr2-q22', number: 22, kind: 'open', points: 18,
          prompt: `Tâche 2 (18 points) — Essai argumentatif (200 à 220 mots) :
« Faut-il privilégier l'apprentissage en ligne et les outils numériques à l'école, ou l'enseignement traditionnel en présentiel reste-t-il irremplaçable pour la réussite et la socialisation des jeunes ? »
Rédigez un texte argumentatif structuré (introduction, développement avec arguments et exemples précis, conclusion).`,
          criteria: [
            { label: 'Introduction avec problématique claire et conclusion synthétique', points: 4 },
            { label: 'Qualité de l’argumentation (thèse, antithèse, synthèse) et exemples pertinents', points: 6 },
            { label: 'Articulation logique du discours (connecteurs variés de niveau B2)', points: 4 },
            { label: 'Correction morphosyntaxique et étendue du vocabulaire', points: 4 },
          ],
          modelAnswer: `Depuis quelques années, la numérisation de l'éducation a profondément transformé les méthodes d'apprentissage. Si les plateformes interactives offrent une flexibilité remarquable, on peut légitimement se demander si elles peuvent se substituer à l'école en présentiel.

D'une part, il est indéniable que les outils numériques enrichissent la pédagogie. Ils permettent à chaque élève de progresser à son propre rythme grâce à des exercices personnalisés, des simulations scientifiques et un accès immédiat à des ressources documentaires mondiales. De plus, l'enseignement à distance s'avère précieux pour les jeunes vivant dans des régions isolées.

D'autre part, la salle de classe demeure un espace irremplaçable de socialisation et d'échange humain. C'est au contact direct des enseignants et de ses pairs que l'élève développe son esprit critique, apprend à débattre avec respect et acquiert l'empathie nécessaire à la vie citoyenne. Par ailleurs, l'usage excessif des écrans peut engendrer un sentiment d'isolement et accentuer les inégalités sociales.

En conclusion, loin de s'opposer, le numérique et l'enseignement présentiel doivent se compléter : la technologie doit rester un outil au service d'une école profondément humaine.`,
        },
      ],
    },
  ],
};

export const DZI_ES_B2_PRACTICE_2: ExamPaper = {
  id: 'practice-dzi-es-b2-2',
  title: 'Испански език (ниво B2) — Втори ДЗИ, тренировъчен вариант 2',
  exam: 'ДЗИ',
  subject: 'Испански език',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Втори пълен тренировъчен вариант за Втори ДЗИ по испански език (профилирана подготовка — ниво B2 по ОЕЕР). Включва Четене с разбиране (30 т.), Езикови задачи — граматика и лексика (40 т.) и Създаване на два писмени текста (30 т.).',
  sections: [
    {
      id: 'es2-reading',
      title: 'Parte 1. Comprensión de lectura (30 puntos)',
      instructions:
        'Lea los dos textos y elija la opción correcta (A, B, C o D) para las preguntas 1 a 10. Cada respuesta correcta vale 3 puntos.',
      questions: [
        {
          id: 'dzi-es2-q1', number: 1, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Texto A: La dieta mediterránea y los mercados municipales en España',
              body: `Declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO, la dieta mediterránea es mucho más que una pauta nutricional: constituye un estilo de vida basado en la convivialidad, el respeto por los productos de temporada y el vínculo directo entre el campo y la mesa.
En las últimas décadas, frente al avance de la comida ultraprocesada y las grandes superficies comerciales, los mercados municipales de abastos de ciudades como Madrid, Valencia, Sevilla o Barcelona han vivido una profunda renovación. Lejos de desaparecer, estos espacios históricos han sabido modernizarse incorporando puestos de agricultores locales ecológicos, talleres de cocina saludable para escolares y sistemas de reparto sostenible a domicilio.
Los nutricionistas advierten, sin embargo, que las prisas de la vida laboral moderna alejan a muchos jóvenes de la cocina casera. Por ello, diversas iniciativas públicas promueven hoy la educación alimentaria desde el instituto para preservar este legado gastronómico y prevenir enfermedades cardiovasculares.`,
            },
          ],
          prompt: 'Según el primer párrafo del Texto A, ¿qué representa la dieta mediterránea además de una pauta nutricional?',
          options: [
            'Un régimen industrial basado en productos congelados.',
            'Un estilo de vida fundado en la convivialidad, los productos de temporada y la relación entre productores y consumidores.',
            'Una moda pasajera importada hace cinco años.',
            'Un menú exclusivo para restaurantes de lujo.',
          ],
          correctIndex: 1,
          explanation: 'El texto afirma que „constituye un estilo de vida basado en la convivialidad, el respeto por los productos de temporada y el vínculo directo entre el campo y la mesa“.',
        },
        {
          id: 'dzi-es2-q2', number: 2, kind: 'choice', points: 3,
          prompt: '¿Cómo se han adaptado los mercados municipales tradicionales a los nuevos tiempos?',
          options: [
            'Cerrando sus puertas definitivamente en las grandes ciudades.',
            'Incorporando productores ecológicos locales, talleres educativos y reparto sostenible a domicilio.',
            'Vendiendo únicamente aparatos electrónicos.',
            'Prohibiendo la entrada a las familias con niños.',
          ],
          correctIndex: 1,
          explanation: 'El segundo párrafo detalla cómo los mercados se han modernizado con puestos ecológicos, talleres de cocina y reparto sostenible.',
        },
        {
          id: 'dzi-es2-q3', number: 3, kind: 'choice', points: 3,
          prompt: '¿Qué factor dificulta actualmente que muchos jóvenes mantengan el hábito de cocinar en casa?',
          options: [
            'La falta de agua potable en las ciudades.',
            'La falta de tiempo derivada del ritmo acelerado de la vida laboral moderna.',
            'La prohibición de comprar verduras frescas.',
            'La inexistencia de recetas tradicionales.',
          ],
          correctIndex: 1,
          explanation: 'Los nutricionistas señalan que „las prisas de la vida laboral moderna alejan a muchos jóvenes de la cocina casera“.',
        },
        {
          id: 'dzi-es2-q4', number: 4, kind: 'choice', points: 3,
          prompt: '¿Con qué finalidad se impulsan programas de educación alimentaria en los institutos?',
          options: [
            'Para preservar el legado gastronómico saludable y prevenir enfermedades cardiovasculares.',
            'Para sustituir las clases de matemáticas por completo.',
            'Para fomentar el consumo de comida ultraprocesada.',
            'Para reducir las vacaciones escolares.',
          ],
          correctIndex: 0,
          explanation: 'La última oración explica que estas iniciativas buscan „preservar este legado gastronómico y prevenir enfermedades cardiovasculares“.',
        },
        {
          id: 'dzi-es2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'En el Texto A, la expresión „productos de temporada“ se refiere a:',
          options: [
            'Alimentos que se cosechan y consumen en su estación natural del año.',
            'Productos importados desde otros continentes en avión.',
            'Alimentos artificiales creados en laboratorio.',
            'Artículos que solo se venden durante un día al año.',
          ],
          correctIndex: 0,
          explanation: 'Los productos de temporada son aquellos propios de cada estación climática.',
        },
        {
          id: 'dzi-es2-q6', number: 6, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Texto B: El auge de las energías renovables y las comunidades energéticas en el mundo hispano',
              body: `Tanto en España como en varios países de América Latina —entre ellos Chile, Uruguay y Costa Rica—, la transición hacia las energías limpias ha cobrado un impulso extraordinario. Gracias a su elevada radiación solar y a la fuerza de los vientos en zonas costeras y montañosas, estas regiones se han situado a la vanguardia de la generación fotovoltaica y eólica.
Una de las innovaciones sociales más destacadas de los últimos años son las llamadas „comunidades energéticas locales“. Mediante este modelo cooperativo, los vecinos de un mismo barrio o municipio instalan paneles solares en los tejados de edificios públicos o residenciales para compartir la electricidad generada y reducir considerablemente su factura mensual.
A pesar de estos avances, los ingenieros subrayan que el gran reto tecnológico del próximo decenio será desarrollar sistemas de almacenamiento en baterías a gran escala para garantizar el suministro eléctrico cuando no brilla el sol ni sopla el viento.`,
            },
          ],
          prompt: '¿Qué condiciones naturales favorecen el liderazgo de España y varios países latinoamericanos en energías renovables?',
          options: [
            'Las bajas temperaturas polares durante todo el año.',
            'La alta radiación solar y la abundancia de viento en costas y montañas.',
            'Las reservas inagotables de carbón mineral.',
            'La ausencia total de nubes en todo el continente.',
          ],
          correctIndex: 1,
          explanation: 'El primer párrafo destaca „su elevada radiación solar y la fuerza de los vientos en zonas costeras y montañosas“.',
        },
        {
          id: 'dzi-es2-q7', number: 7, kind: 'choice', points: 3,
          prompt: '¿En qué consiste el modelo de las „comunidades energéticas locales“?',
          options: [
            'En que los vecinos generan y comparten energía solar de forma cooperativa en su propio barrio o municipio.',
            'En desconectar los hospitales de la red eléctrica nacional.',
            'En obligar a cada ciudadano a construir una central nuclear.',
            'En exportar toda la electricidad sin consumirla localmente.',
          ],
          correctIndex: 0,
          explanation: 'El segundo párrafo explica que los vecinos instalan paneles solares de manera cooperativa para compartir la electricidad y reducir su factura.',
        },
        {
          id: 'dzi-es2-q8', number: 8, kind: 'choice', points: 3,
          prompt: '¿Qué beneficio económico directo obtienen los hogares que participan en estas cooperativas?',
          options: [
            'Una reducción considerable de su factura eléctrica mensual.',
            'Viajes gratuitos en avión.',
            'La exención total de todos los impuestos municipales.',
            'El regalo de un automóvil eléctrico cada año.',
          ],
          correctIndex: 0,
          explanation: 'El texto menciona que comparten la electricidad generada „para reducir considerablemente su factura mensual“.',
        },
        {
          id: 'dzi-es2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Según los ingenieros citados al final del Texto B, ¿cuál es el principal desafío tecnológico para los próximos diez años?',
          options: [
            'Abandonar la energía solar y volver al petróleo.',
            'Desarrollar sistemas de almacenamiento en baterías a gran escala para asegurar un suministro continuo.',
            'Desmontar los parques eólicos existentes.',
            'Reducir el consumo de internet en las escuelas.',
          ],
          correctIndex: 1,
          explanation: 'El último párrafo señala que el gran reto será „desarrollar sistemas de almacenamiento en baterías a gran escala“.',
        },
        {
          id: 'dzi-es2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'En el Texto B, la expresión „situarse a la vanguardia“ significa:',
          options: [
            'Quedarse atrás respecto a otros países.',
            'Colocarse en una posición avanzada o de liderazgo en un ámbito determinado.',
            'Abandonar un proyecto científico.',
            'Ocultar los resultados de una investigación.',
          ],
          correctIndex: 1,
          explanation: '„Estar / situarse a la vanguardia“ significa liderar o estar en primera línea de innovación.',
        },
      ],
    },
    {
      id: 'es2-use-of-language',
      title: 'Parte 2. Competencia lingüística — Gramática y léxico (40 puntos)',
      instructions:
        'Preguntas 11 a 15: elija la opción correcta (3 puntos cada una). Preguntas 16 a 20: complete o transforme según las instrucciones (5 puntos cada una).',
      questions: [
        {
          id: 'dzi-es2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Elija la forma verbal correcta: «Te llamo en cuanto ___ los resultados del examen.»',
          options: ['sabré', 'sepa', 'sabía', 'sabrías'],
          correctIndex: 1,
          explanation: 'Las conjunciones temporales („en cuanto“, „cuando“, „tan pronto como“) referidas al futuro exigen presente de subjuntivo („sepa“).',
        },
        {
          id: 'dzi-es2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Complete la oración condicional: «Si hubiéramos salido media hora antes, no ___ el tren.»',
          options: ['habríamos perdido', 'perderemos', 'perdemos', 'hayamos perdido'],
          correctIndex: 0,
          explanation: 'En las condicionales irreales del pasado: Si + pluscuamperfecto de subjuntivo („hubiéramos salido“) -> condicional compuesto („habríamos perdido“).',
        },
        {
          id: 'dzi-es2-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Elija la preposición correcta: «Los voluntarios se comprometieron ___ limpiar toda la playa antes del domingo.»',
          options: ['de', 'a', 'en', 'con'],
          correctIndex: 1,
          explanation: 'El verbo pronominal „comprometerse“ rige la preposición „a“ seguida de infinitivo („comprometerse a hacer algo“).',
        },
        {
          id: 'dzi-es2-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'Elija la opción correcta entre „ser“ y „estar“: «La conferencia sobre inteligencia artificial ___ muy interesante; se ___ en el aula magna mañana.»',
          options: ['es / será', 'está / estará', 'es / estará', 'estuvo / fue'],
          correctIndex: 0,
          explanation: 'Para valorar una característica („es interesante“) y para indicar dónde o cuándo tiene lugar un evento („la conferencia será en el aula magna“) se usa el verbo „ser“.',
        },
        {
          id: 'dzi-es2-q15', number: 15, kind: 'choice', points: 3,
          prompt: '¿Qué conector introduce una objeción o concesión sin impedir la acción principal?',
          options: ['Por lo tanto', 'A pesar de que', 'Puesto que', 'De modo que'],
          correctIndex: 1,
          explanation: '„A pesar de que“ es un conector concesivo; „puesto que“ es causal y „por lo tanto / de modo que“ son consecutivos.',
        },
        {
          id: 'dzi-es2-q16', number: 16, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Escriba el imperfecto de subjuntivo (forma en -ra) del verbo «tener» para la 1.ª persona del singular («yo»): «Si yo (tener) ___ más tiempo libre, aprendería a tocar la guitarra.»',
          acceptedAnswers: ['tuviera', 'tuviese'],
          explanation: 'El pretérito imperfecto de subjuntivo de „tener“ (yo) es „tuviera“ (o „tuviese“).',
        },
        {
          id: 'dzi-es2-q17', number: 17, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Complete con la preposición adecuada («por» o «para»): «Este diccionario bilingüe ha sido elaborado ___ un equipo de filólogos de la universidad.»',
          acceptedAnswers: ['por'],
          explanation: 'El complemento agente en las oraciones pasivas se introduce siempre con la preposición „por“.',
        },
        {
          id: 'dzi-es2-q18', number: 18, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Forme el sustantivo abstracto derivado del adjetivo «sostenible»: «El turismo del futuro debe basarse en la ___ ambiental y cultural.»',
          acceptedAnswers: ['sostenibilidad'],
          explanation: 'El sustantivo derivado de „sostenible“ es „la sostenibilidad“.',
        },
        {
          id: 'dzi-es2-q19', number: 19, kind: 'multi', points: 5,
          prompt: 'Transforme al estilo indirecto en pasado: «Marta me dijo: „Mañana te enviaré el informe final.“»',
          parts: [
            {
              id: 'a', label: 'A)', points: 3,
              prompt: 'Forma del verbo «enviar» en condicional simple (3.ª persona singular «ella») :',
              answer: { type: 'text', acceptedAnswers: ['enviaría', 'enviaria'] },
            },
            {
              id: 'b', label: 'B)', points: 2,
              prompt: 'Transformación del adverbio «mañana» en el estilo indirecto pasado :',
              answer: { type: 'text', acceptedAnswers: ['al día siguiente', 'al dia siguiente', 'el día siguiente'] },
            },
          ],
          explanation: 'En el estilo indirecto con verbo introductor en pasado, „enviaré“ pasa a „enviaría“ y „mañana“ pasa a „al día siguiente“.',
        },
        {
          id: 'dzi-es2-q20', number: 20, kind: 'multi', points: 5,
          prompt: 'Complete con la perífrasis verbal adecuada:',
          parts: [
            {
              id: 'a', label: 'A)', points: 2.5,
              prompt: 'Para expresar la interrupción definitiva de un hábito: «Desde el mes pasado, mi hermano ha ___ de fumar.» (participio del verbo „dejar“)',
              answer: { type: 'text', acceptedAnswers: ['dejado'] },
            },
            {
              id: 'b', label: 'B)', points: 2.5,
              prompt: 'Para expresar la repetición de una acción: «¿Has ___ a ver a tus compañeros del campamento?» (participio del verbo „volver“)',
              answer: { type: 'text', acceptedAnswers: ['vuelto'] },
            },
          ],
          explanation: 'A) „dejar de + infinitivo“ (participio: dejado). B) „volver a + infinitivo“ (participio irregular: vuelto).',
        },
      ],
    },
    {
      id: 'es2-writing',
      title: 'Parte 3. Expresión e interacción escritas (30 puntos)',
      instructions:
        'Redacte los dos textos propuestos a continuación. Después de entregar el examen, evalúe su respuesta según los criterios y el modelo.',
      questions: [
        {
          id: 'dzi-es2-q21', number: 21, kind: 'open', points: 12,
          prompt: `Tarea 1 (12 puntos) — Correo electrónico formal (120–140 palabras):
Usted desea participar en un programa internacional de voluntariado medioambiental de verano en un parque natural de Costa Rica. Escriba un correo electrónico formal a la coordinadora del programa para:
– presentarse y explicar su motivación personal;
– destacar su experiencia previa o sus habilidades relevantes (idiomas, trabajo en equipo, biología/ecología);
– preguntar por las condiciones de alojamiento y las fechas exactas de incorporación.
Firme como: Dani Petrova / Dani Petrov.`,
          criteria: [
            { label: 'Adecuación al registro formal, cumplimiento de la extensión y desarrollo de los tres puntos', points: 4 },
            { label: 'Coherencia y cohesión textual (uso adecuado de conectores y estructura epistolar)', points: 4 },
            { label: 'Riqueza léxica y corrección gramatical y ortográfica (nivel B2)', points: 4 },
          ],
          modelAnswer: `Asunto: Solicitud de participación en el programa de voluntariado medioambiental de verano

Estimada señora Coordinadora:

Me dirijo a usted con el fin de presentar mi candidatura para el programa de voluntariado medioambiental que su organización desarrollará este verano en Costa Rica. Soy estudiante de último curso de bachillerato y siempre he sentido un profundo interés por la conservación de los ecosistemas tropicales.

Durante los dos últimos años he participado activamente en el club de ecología de mi instituto, coordinando campañas de reforestación y limpieza de ríos. Además, hablo español e inglés con fluidez y me adapto con facilidad al trabajo en equipo en entornos multiculturales.

Le agradecería mucho que me informara sobre las fechas exactas de inicio del turno de julio, así como sobre las condiciones de alojamiento previstas para los voluntarios.

Quedo a su entera disposición para enviarle cualquier documento adicional y la saludo muy atentamente.

Dani Petrov`,
        },
        {
          id: 'dzi-es2-q22', number: 22, kind: 'open', points: 18,
          prompt: `Tarea 2 (18 puntos) — Ensayo argumentativo (200–220 palabras):
«¿El turismo masivo aporta más beneficios económicos y culturales a las ciudades históricas o pone en peligro la vida cotidiana de sus habitantes y su patrimonio?»
Escriba un texto argumentativo bien estructurado (introducción, desarrollo con argumentos a favor y en contra y conclusión razonada).`,
          criteria: [
            { label: 'Planteamiento claro del tema en la introducción y conclusión equilibrada', points: 4 },
            { label: 'Solidez de los argumentos en ambos sentidos con ejemplos concretos', points: 6 },
            { label: 'Uso variado de marcadores discursivos y estructuras sintácticas complejas', points: 4 },
            { label: 'Precisión léxica y corrección ortográfica y morfosintáctica (nivel B2)', points: 4 },
          ],
          modelAnswer: `El turismo se ha convertido en uno de los motores económicos más dinámicos del siglo XXI. Sin embargo, el crecimiento descontrolado del número de visitantes en muchas ciudades históricas ha abierto un intenso debate sobre sus verdaderas consecuencias.

Por un lado, resulta innegable que el sector turístico genera millones de empleos directos e indirectos en la hostelería, el transporte y la cultura. Asimismo, los ingresos procedentes de los visitantes permiten financiar la restauración de monumentos, museos y espacios públicos, al tiempo que fomentan el diálogo intercultural y el conocimiento mutuo entre pueblos.

Por otro lado, la masificación turística conlleva graves efectos negativos cuando no se regula adecuadamente. En numerosos centros históricos, la proliferación de pisos turísticos ha disparado el precio de los alquileres, expulsando a los vecinos tradicionales de sus barrios. Además, la saturación de las calles deteriora el patrimonio arquitectónico y multiplica la generación de residuos.

En conclusión, el turismo no debe percibirse como una amenaza en sí mismo, pero exige una gestión pública responsable que priorice el turismo sostenible y de calidad frente a la mera cantidad de visitantes.`,
        },
      ],
    },
  ],
};

export const DZI_RU_B2_PRACTICE_2: ExamPaper = {
  id: 'practice-dzi-ru-b2-2',
  title: 'Руски език (ниво B2) — Втори ДЗИ, тренировъчен вариант 2',
  exam: 'ДЗИ',
  subject: 'Руски език',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Втори пълен тренировъчен вариант за Втори ДЗИ по руски език (профилирана подготовка — ниво B2 по ОЕЕР). Включва Четене с разбиране (30 т.), Езикови задачи — граматика и лексика (40 т.) и Създаване на два писмени текста (30 т.).',
  sections: [
    {
      id: 'ru2-reading',
      title: 'Часть 1. Чтение и понимание письменного текста (30 баллов)',
      instructions:
        'Прочитайте два текста и выберите правильный вариант ответа (А, Б, В или Г) для заданий 1–10. Каждый правильный ответ оценивается в 3 балла.',
      questions: [
        {
          id: 'dzi-ru2-q1', number: 1, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Текст А: Молодёжное волонтёрство и экологические экспедиции',
              body: `В последние годы добровольческое движение среди старшеклассников и студентов приобрело совершенно новые масштабы. Если раньше волонтёрская деятельность ассоциировалась преимущественно с разовыми благотворительными акциями, то сегодня молодые люди всё чаще включаются в долгосрочные научные, экологические и культурно-просветительские проекты.
Особой популярностью пользуются летние экологические экспедиции в национальные парки и заповедники. Участники таких лагерей помогают учёным вести учёт редких видов птиц и животных, расчищают туристические тропы, создают цифровые карты маршрутов и проводят интерактивные уроки для школьников из окрестных посёлков.
По мнению психологов и педагогов, подобный опыт не только формирует ответственное отношение к природе, но и помогает подросткам развить навыки командной работы, самостоятельность и лидерские качества, которые высоко ценятся современными работодателями.`,
            },
          ],
          prompt: 'Как изменился характер молодёжного волонтёрства в последние годы согласно первому абзацу Текста А?',
          options: [
            'Молодые люди полностью перестали участвовать в общественной жизни.',
            'От разовых акций молодёжь всё чаще переходит к участию в долгосрочных научных, экологических и просветительских проектах.',
            'Волонтёрство стало обязательным платным предметом в каждом университете.',
            'Добровольцы занимаются исключительно продажей сувениров.',
          ],
          correctIndex: 1,
          explanation: 'В первом абзаце подчёркивается переход от разовых акций к долгосрочным научным, экологическим и культурно-просветительским проектам.',
        },
        {
          id: 'dzi-ru2-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Чем занимаются участники летних экологических экспедиций в заповедниках?',
          options: [
            'Строят крупные промышленные заводы.',
            'Помогают учёным в учёте редких видов, обустраивают тропы, создают цифровые карты и проводят уроки для местных школьников.',
            'Охотятся на редких животных.',
            'Только отдыхают на пляже без всяких обязанностей.',
          ],
          correctIndex: 1,
          explanation: 'Во втором абзаце подробно перечислены все эти четыре вида деятельности.',
        },
        {
          id: 'dzi-ru2-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'Какие личностные качества, по мнению психологов, развивает участие в добровольческих проектах?',
          options: [
            'Навыки командной работы, самостоятельность и лидерские качества.',
            'Безразличие к окружающим и замкнутость.',
            'Склонность к избеганию любых трудностей.',
            'В тексте об этом ничего не говорится.',
          ],
          correctIndex: 0,
          explanation: 'В последнем абзаце прямо указаны навыки командной работы, самостоятельность и лидерские качества.',
        },
        {
          id: 'dzi-ru2-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Почему этот опыт полезен для будущей профессиональной карьеры молодых людей?',
          options: [
            'Потому что приобретённые социальные и организаторские навыки высоко ценятся современными работодателями.',
            'Потому что волонтёрам автоматически выдают диплом врача.',
            'Потому что экспедиции заменяют сдачу выпускных экзаменов.',
            'Потому что работодатели требуют от всех сотрудников умения рисовать карты.',
          ],
          correctIndex: 0,
          explanation: 'В конце текста отмечено, что эти качества „высоко ценятся современными работодателями“.',
        },
        {
          id: 'dzi-ru2-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'Какое слово является наиболее точным синонимом к слову «преимущественно» из первого абзаца?',
          options: ['случайно', 'главным образом (в основном)', 'никогда', 'неохотно'],
          correctIndex: 1,
          explanation: 'Наречие „преимущественно“ означает „главным образом, в основном, больше всего“.',
        },
        {
          id: 'dzi-ru2-q6', number: 6, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Текст Б: Аудиокниги и трансформация современного чтения',
              body: `Ещё двадцать лет назад многие литературные критики предсказывали, что развитие интернета и смартфонов приведёт к полному исчезновению интереса к художественной литературе. Однако статистика книжного рынка свидетельствует об обратном: формат потребления текста изменился, но сама потребность в чтении осталась прежней.
Настоящий бум переживают сегодня аудиокниги и литературные подкасты. Для жителей крупных городов, проводящих по полтора-два часа в день в общественном транспорте или за рулём, прослушивание романа в исполнении профессиональных актёров театра и кино стало прекрасной возможностью совместить дорогу с культурным самообразованием.
Вместе с тем нейробиологи отмечают важную особенность: при восприятии информации на слух мозг обрабатывает сюжет более эмоционально, тогда как чтение бумажной книги требует более глубокой концентрации внимания и лучше тренирует зрительную память и грамотность.`,
            },
          ],
          prompt: 'Какой прогноз литературных критиков двадцатилетней давности оказался ошибочным согласно Тексту Б?',
          options: [
            'Что люди начнут читать больше классической поэзии.',
            'Что появление интернета и смартфонов полностью уничтожит интерес к художественной литературе.',
            'Что актёры театра будут озвучивать романы.',
            'Что бумажные книги станут продаваться в книжных магазинах.',
          ],
          correctIndex: 1,
          explanation: 'В первом абзаце говорится, что критики ошибочно предсказывали полное исчезновение интереса к художественной литературе.',
        },
        {
          id: 'dzi-ru2-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Почему аудиокниги особенно популярны среди жителей больших городов?',
          options: [
            'Потому что в больших городах закрылись все библиотеки.',
            'Потому что они позволяют с пользой провести время в дороге (в транспорте или за рулём).',
            'Потому что аудиокниги длятся всего две минуты.',
            'Потому что бумажные книги запрещено носить в метро.',
          ],
          correctIndex: 1,
          explanation: 'Во втором абзаце объясняется, что горожане совмещают время в пути (1,5–2 часа в день) с культурным самообразованием.',
        },
        {
          id: 'dzi-ru2-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Кто часто привлекается к записи современных аудиокниг, что делает их ещё более привлекательными?',
          options: [
            'Профессиональные актёры театра и кино.',
            'Случайные прохожие на улице.',
            'Только компьютерные синтезаторы речи первого поколения.',
            'Спортивные судьи.',
          ],
          correctIndex: 0,
          explanation: 'В тексте упомянуто „прослушивание романа в исполнении профессиональных актёров театра и кино“.',
        },
        {
          id: 'dzi-ru2-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'В чём, по мнению нейробиологов, заключается преимущество чтения традиционной бумажной книги?',
          options: [
            'Оно не требует никакого внимания.',
            'Оно требует более глубокой концентрации и лучше тренирует зрительную память и грамотность.',
            'Оно позволяет читать с закрытыми глазами.',
            'Оно развивает только слуховые рецепторы.',
          ],
          correctIndex: 1,
          explanation: 'В третьем абзаце указано, что чтение бумажной книги требует глубокой концентрации и тренирует зрительную память и грамотность.',
        },
        {
          id: 'dzi-ru2-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Какой общий вывод можно сделать из Текста Б?',
          options: [
            'Аудиокниги и бумажные книги дополняют друг друга, отвечая разным ситуациям и потребностям современного читателя.',
            'Все бумажные книги необходимо срочно заменить подкастами.',
            'Слушать аудиокниги вредно для здоровья.',
            'Современная молодёжь интересуется только компьютерными играми.',
          ],
          correctIndex: 0,
          explanation: 'Текст показывает, что оба формата востребованы и задействуют разные когнитивные механизмы.',
        },
      ],
    },
    {
      id: 'ru2-use-of-language',
      title: 'Часть 2. Языковая компетенция — Грамматика и лексика (40 баллов)',
      instructions:
        'Задания 11–15: выберите правильный вариант (по 3 балла). Задания 16–20: запишите правильную грамматическую форму (по 5 баллов).',
      questions: [
        {
          id: 'dzi-ru2-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Выберите правильную форму числительного и существительного: «В международном форуме приняли участие более ___ молодых исследователей.»',
          options: ['пятисот', 'пятьсот', 'пятистам', 'пятьюстами'],
          correctIndex: 0,
          explanation: 'После слова „более“ употребляется родительный падеж: более кого/чего? -> пятисот (от пятьсот).',
        },
        {
          id: 'dzi-ru2-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Выберите правильный глагол движения с приставкой: «По расписанию наш самолёт должен ___ из Софии ровно в восемь часов утра.»',
          options: ['прилететь', 'вылететь', 'перелететь', 'залететь'],
          correctIndex: 1,
          explanation: 'Отправление самолёта из пункта начала маршрута („из Софии“) обозначается глаголом „вылететь“.',
        },
        {
          id: 'dzi-ru2-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Выберите правильный предлог и падежную форму: «___ неблагоприятному прогнозу погоды, туристический поход состоялся.»',
          options: ['Благодаря', 'Вопреки', 'Из-за', 'Вследствие'],
          correctIndex: 1,
          explanation: 'Предлог „вопреки“ (чему? — дательный падеж: „неблагоприятному прогнозу“) выражает уступку („несмотря на“), а „благодаря“ употребляется только при положительной причине.',
        },
        {
          id: 'dzi-ru2-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'В каком предложении деепричастный оборот употреблён ГРАММАТИЧЕСКИ ПРАВИЛЬНО?',
          options: [
            'Читая эту статью, мне вспомнилась наша поездка в Санкт-Петербург.',
            'Закончив лабораторный опыт, студенты аккуратно записали результаты в журнал.',
            'Подъезжая к станции, у меня слетела шляпа.',
            'Просмотрев фильм, началось бурное обсуждение.',
          ],
          correctIndex: 1,
          explanation: 'Действие, выраженное деепричастием („закончив“), и действие сказуемого („записали“) должны относиться к одному и тому же действующему лицу — подлежащему („студенты“).',
        },
        {
          id: 'dzi-ru2-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'Выберите правильный вид глагола в отрицательном предложении с модальным значением ненужности: «Тебе не нужно ___ эту книгу в магазине — я уже взял её для тебя в библиотеке.»',
          options: ['купить', 'покупать', 'купив', 'купивший'],
          correctIndex: 1,
          explanation: 'После слов „не нужно / не надо / не стоит“ всегда употребляется инфинитив несовершенного вида („покупать“).',
        },
        {
          id: 'dzi-ru2-q16', number: 16, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Поставьте словосочетание «высокое здание» в форму родительного падежа множественного числа: «В новом районе построили много современных ___ ___.» (Запишите два слова.)',
          acceptedAnswers: ['высоких зданий'],
          explanation: 'После слова „много“ употребляется родительный падеж мн. ч.: „высоких зданий“.',
        },
        {
          id: 'dzi-ru2-q17', number: 17, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Образуйте действительное причастие настоящего времени от глагола «читать» в форме именительного падежа единственного числа мужского рода («человек, который читает» -> «___ человек»):',
          acceptedAnswers: ['читающий'],
          explanation: 'От основы настоящего времени глагола I спряжения „читают“ с помощью суффикса -ющ- образуется причастие „читающий“.',
        },
        {
          id: 'dzi-ru2-q18', number: 18, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Запишите прописью порядковое числительное в правильной падежной форме: «Первая космическая экспедиция состоялась в тысяча девятьсот шестьдесят ___ (1-й) году.»',
          acceptedAnswers: ['первом'],
          explanation: 'В составных порядковых числительных склоняется только последнее слово: в каком году? (предложный падеж) -> „в ... шестьдесят первом году“.',
        },
        {
          id: 'dzi-ru2-q19', number: 19, kind: 'multi', points: 5,
          prompt: 'Поставьте имена существительные в скобках в правильную падежную форму:',
          parts: [
            {
              id: 'a', label: 'А)', points: 2.5,
              prompt: '«Мы искренне гордимся нашими талантливыми (ученики) ___.» (творительный падеж мн. ч.)',
              answer: { type: 'text', acceptedAnswers: ['учениками'] },
            },
            {
              id: 'b', label: 'Б)', points: 2.5,
              prompt: '«Директор школы тепло поздравил выпускников с успешным (окончание) ___ учебного года.» (творительный падеж ед. ч.)',
              answer: { type: 'text', acceptedAnswers: ['окончанием'] },
            },
          ],
          explanation: 'А) гордиться кем? -> учениками. Б) поздравить с чем? -> с окончанием.',
        },
        {
          id: 'dzi-ru2-q20', number: 20, kind: 'multi', points: 5,
          prompt: 'Выберите правильный пароним («эффектный» или «эффективный») и поставьте его в нужную форму:',
          parts: [
            {
              id: 'a', label: 'А)', points: 2.5,
              prompt: '«Учёные разработали новый, исключительно ___ метод очистки промышленных вод.» (дающий реальный результат, действенный — м. р., им./вин. п.)',
              answer: { type: 'text', acceptedAnswers: ['эффективный'] },
            },
            {
              id: 'b', label: 'Б)', points: 2.5,
              prompt: '«В финале концерта артисты показали очень ___ световой номер, поразивший зрителей.» (производящий яркое внешнее впечатление — м. р., им./вин. п.)',
              answer: { type: 'text', acceptedAnswers: ['эффектный'] },
            },
          ],
          explanation: '„Эффективный“ означает результативный, действенный, а „эффектный“ — яркий, производящий сильное внешнее впечатление.',
        },
      ],
    },
    {
      id: 'ru2-writing',
      title: 'Часть 3. Создание письменного текста (30 баллов)',
      instructions:
        'Выполните оба письменных задания. После сдачи работы оцените свой ответ по критериям и образцу.',
      questions: [
        {
          id: 'dzi-ru2-q21', number: 21, kind: 'open', points: 12,
          prompt: `Задание 1 (12 баллов) — Официальное электронное письмо (120–140 слов):
Вы являетесь координатором школьного литературно-театрального клуба. Напишите официальное письмо организаторам Международного молодёжного фестиваля искусств с заявкой на участие вашей школьной труппы.
В письме:
– представьте ваш клуб и спектакль, который вы хотите показать;
– укажите количество участников и необходимые технические условия (сцена, звук, свет);
– уточните сроки подачи документов и условия проживания для иностранных делегаций.
Подпишите письмо именем: Алекс Илиев / Алекс Илиева.`,
          criteria: [
            { label: 'Соблюдение норм официально-делового стиля, объёма и раскрытие всех трёх пунктов задания', points: 4 },
            { label: 'Логичность, связность текста и правильное композиционное оформление письма', points: 4 },
            { label: 'Лексическое богатство и грамматическая и орфографическая правильность (уровень B2)', points: 4 },
          ],
          modelAnswer: `Тема: Заявка на участие школьной театральной студии в Международном молодёжном фестивале искусств

Уважаемые члены Оргкомитета!

От имени литературно-театральной студии нашей гимназии обращаюсь к вам с просьбой включить наш коллектив в программу предстоящего Международного молодёжного фестиваля искусств. В этом году мы подготовили тридцатиминутную театральную постановку по рассказам А. П. Чехова на русском языке.

Наша делегация состоит из двенадцати старшеклассников и двух руководителей. Для выступления нам потребуются сцена среднего размера, четыре беспроводных микрофона и базовое театральное освещение.

Будем весьма признательны, если вы сообщите нам крайний срок отправки видеозаписи спектакля, а также условия размещения и питания для зарубежных участников.

Заранее благодарю вас за внимание и надеюсь на плодотворное сотрудничество.

С уважением,
Алекс Илиев`,
        },
        {
          id: 'dzi-ru2-q22', number: 22, kind: 'open', points: 18,
          prompt: `Задание 2 (18 баллов) — Аргументативное эссе (200–220 слов):
«Что важнее при выборе будущей профессии для современного выпускника: высокий уровень дохода и престиж или личное призвание и творческая самореализация?»
Напишите развёрнутое аргументативное эссе со чёткой структурой (вступление, основная часть с аргументами и примерами, заключение).`,
          criteria: [
            { label: 'Чёткая постановка проблемы во вступлении и убедительное обобщение в заключении', points: 4 },
            { label: 'Полнота аргументации (сопоставление двух точек зрения с конкретными примерами)', points: 6 },
            { label: 'Связность текста, использование разнообразных вводных слов и союзов уровня B2', points: 4 },
            { label: 'Грамматическая, лексическая и орфографическая грамотность', points: 4 },
          ],
          modelAnswer: `Выбор будущей профессии — одно из самых ответственных решений, перед которым стоит каждый выпускник школы. При этом перед молодыми людьми неизбежно возникает вопрос: следует ли руководствоваться прежде всего финансовой выгодой или собственным призванием?

С одной стороны, стремление к материальной стабильности и престижу вполне закономерно. Высокооплачиваемая работа обеспечивает человеку независимость, уверенность в завтрашнем дне и возможность помогать своей семье. Именно поэтому многие абитуриенты выбирают востребованные направления в сфере финансов, права или информационных технологий.

С другой стороны, работа, выбранная исключительно ради денег без малейшего внутреннего интереса, нередко приводит к эмоциональному выгоранию и разочарованию. История науки, медицины и искусства доказывает, что подлинного мастерства и выдающихся успехов достигают прежде всего те специалисты, которые искренне увлечены своим делом. Когда человек занимается любимой профессией, он постоянно совершенствуется, а высокое качество его труда со временем приносит и достойное материальное вознаграждение.

Таким образом, финансовое благополучие и личное призвание не должны противоречить друг другу: идеальный выбор профессии находится на пересечении способностей человека, его искреннего интереса и потребностей современного общества.`,
        },
      ],
    },
  ],
};
