import type { ExamPaper } from '../../lib/examPaperScoring';
import { DZI_SCALE } from '../../lib/monGradeScale';

export const DZI_FR_B2_PRACTICE_1: ExamPaper = {
  id: 'practice-dzi-fr-b2-1',
  title: 'Френски език (ниво B2) — Втори ДЗИ, тренировъчен вариант 1',
  exam: 'ДЗИ',
  subject: 'Френски език',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Пълен тренировъчен вариант за Втори ДЗИ по френски език (профилирана подготовка — ниво B2 по ОЕЕР). Включва Четене с разбиране (30 т.), Езикови задачи — граматика и лексика (40 т.) и Създаване на два писмени текста (30 т.).',
  sections: [
    {
      id: 'fr1-reading',
      title: 'Partie 1. Compréhension des écrits (30 points)',
      instructions:
        'Lisez les deux textes et choisissez la bonne réponse (A, B, C ou D) pour les questions 1 à 10. Chaque réponse correcte vaut 3 points.',
      questions: [
        {
          id: 'dzi-fr1-q1', number: 1, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Texte A : Le télétravail et la revitalisation des petites villes françaises',
              body: `Depuis quelques années, l'essor du télétravail a profondément transformé le rapport des actifs français à leur lieu de résidence. Alors que les grandes métropoles comme Paris, Lyon ou Bordeaux concentraient autrefois l'essentiel des emplois qualifiés du secteur tertiaire, de nombreux cadres et jeunes diplômés choisissent désormais de s'installer dans des villes moyennes ou des communes rurales bien reliées au réseau ferroviaire et à la fibre optique.
Ce phénomène offre une opportunité inédite aux territoires longtemps confrontés à la dévitalisation des centres-bourgs. Pour accueillir ces nouveaux habitants, les municipalités transforment d'anciens bâtiments publics en espaces de coworking („tiers-lieux“), soutiennent les commerces de proximité et développent les mobilités douces.
Toutefois, les sociologues soulignent que cette transition nécessite un équilibre délicat : l'arrivée de ménages au pouvoir d'achat plus élevé peut entraîner une hausse rapide des prix de l'immobilier local, rendant parfois l'accès au logement plus difficile pour les jeunes originaires de la région.`,
            },
          ],
          prompt: 'Quel changement majeur est décrit dans le premier paragraphe du Texte A ?',
          options: [
            'La disparition complète du réseau ferroviaire dans les régions rurales.',
            'L’installation croissante de travailleurs qualifiés dans des villes moyennes et rurales grâce au télétravail et à la fibre optique.',
            'L’interdiction du travail à distance dans le secteur tertiaire.',
            'La fermeture de toutes les entreprises à Paris et à Lyon.',
          ],
          correctIndex: 1,
          explanation: 'Le premier paragraphe explique que de nombreux cadres et jeunes diplômés quittent les grandes métropoles pour des villes moyennes ou des communes rurales connectées.',
        },
        {
          id: 'dzi-fr1-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Que font les municipalités pour attirer et accompagner ces nouveaux résidents ?',
          options: [
            'Elles ferment les commerces de proximité.',
            'Elles créent des espaces de coworking („tiers-lieux“), soutiennent le commerce local et les mobilités douces.',
            'Elles suppriment les connexions Internet à haut débit.',
            'Elles interdisent la rénovation des bâtiments anciens.',
          ],
          correctIndex: 1,
          explanation: 'Le deuxième paragraphe mentionne la transformation d’anciens bâtiments en espaces de coworking, le soutien aux commerces de proximité et les mobilités douces.',
        },
        {
          id: 'dzi-fr1-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'Quel risque les sociologues mettent-ils en évidence dans le dernier paragraphe ?',
          options: [
            'Une baisse brutale des salaires dans toute l’Europe.',
            'Une augmentation des prix de l’immobilier local pouvant compliquer l’accès au logement des jeunes de la région.',
            'Un manque d’espaces verts à la campagne.',
            'Une diminution de la fréquentation des trains.',
          ],
          correctIndex: 1,
          explanation: 'Le troisième paragraphe souligne que l’arrivée de ménages au pouvoir d’achat plus élevé peut faire monter les prix de l’immobilier.',
        },
        {
          id: 'dzi-fr1-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Que signifie l’expression „les mobilités douces“ dans ce contexte ?',
          options: [
            'Les modes de transport non polluants comme la marche et le vélo.',
            'Les vols long-courriers en avion.',
            'Le transport maritime de marchandises.',
            'Les autoroutes à six voies.',
          ],
          correctIndex: 0,
          explanation: 'En français contemporain, „les mobilités douces“ désignent les déplacements actifs et écologiques (vélo, marche, trottinette).',
        },
        {
          id: 'dzi-fr1-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'Quel est le synonyme le plus proche de l’adjectif „inédite“ („une opportunité inédite“) ?',
          options: ['habituelle', 'nouvelle / sans précédent', 'inutile', 'dangereuse'],
          correctIndex: 1,
          explanation: '„Inédit(e)“ signifie nouveau, qui n’a encore jamais été vu ou vécu.',
        },
        {
          id: 'dzi-fr1-q6', number: 6, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Texte B : La lecture à l’ère du numérique chez les lycéens',
              body: `Contrairement aux idées reçues selon lesquelles les adolescents auraient totalement abandonné le livre au profit des écrans, plusieurs enquêtes récentes montrent que les pratiques de lecture se transforment plutôt qu'elles ne disparaissent. Certes, le temps consacré à la lecture quotidienne de romans classiques diminue légèrement, mais de nouveaux formats suscitent un engouement remarquable.
Les réseaux sociaux littéraires — tels que les communautés de jeunes lecteurs qui partagent leurs critiques en vidéo — jouent aujourd'hui le rôle de prescripteurs majeurs. Grâce à ces échanges entre pairs, des genres comme la science-fiction écologique, le roman graphique, la bande dessinée documentaire ou les récits historiques connaissent un succès croissant en librairie comme en bibliothèque.
Pour les enseignants, l'enjeu consiste désormais à jeter des ponts entre ces lectures spontanées et les œuvres patrimoniales étudiées en classe, afin de développer l'esprit critique et le plaisir durable de lire.`,
            },
          ],
          prompt: 'Quelle idée reçue le Texte B remet-il en question ?',
          options: [
            'L’idée que les jeunes auraient complètement cessé de lire à cause des écrans.',
            'L’idée que les bibliothèques municipales prêtent des livres gratuitement.',
            'L’idée que la bande dessinée existe depuis le XXe siècle.',
            'L’idée que les professeurs enseignent la littérature au lycée.',
          ],
          correctIndex: 0,
          explanation: 'Dès la première phrase, l’auteur conteste l’idée que les adolescents auraient totalement abandonné le livre.',
        },
        {
          id: 'dzi-fr1-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Quel rôle jouent les communautés littéraires sur les réseaux sociaux selon le texte ?',
          options: [
            'Elles remplacent les examens scolaires.',
            'Elles recommandent des livres entre jeunes (rôle de prescripteurs) et stimulent l’intérêt pour divers genres.',
            'Elles interdisent l’achat de livres papier.',
            'Elles publient uniquement des dictionnaires.',
          ],
          correctIndex: 1,
          explanation: 'Le deuxième paragraphe indique que ces communautés partagent des critiques et jouent un rôle de prescripteurs majeurs auprès des jeunes.',
        },
        {
          id: 'dzi-fr1-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Parmi les genres suivants, lequel est cité comme connaissant un succès croissant auprès des jeunes ?',
          options: [
            'Les annuaires téléphoniques imprimés',
            'La bande dessinée documentaire et la science-fiction écologique',
            'Les manuels de dactylographie',
            'Les catalogues industriels',
          ],
          correctIndex: 1,
          explanation: 'Le texte mentionne explicitement „la science-fiction écologique, le roman graphique, la bande dessinée documentaire ou les récits historiques“.',
        },
        {
          id: 'dzi-fr1-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Quel est l’objectif des enseignants évoqué dans le dernier paragraphe ?',
          options: [
            'Supprimer l’étude des auteurs classiques au lycée.',
            'Créer des liens („jeter des ponts“) entre les lectures personnelles des élèves et les œuvres classiques du programme.',
            'Obliger les élèves à lire uniquement sur téléphone.',
            'Remplacer les cours de français par des cours d’informatique.',
          ],
          correctIndex: 1,
          explanation: 'Les enseignants cherchent à „jeter des ponts entre ces lectures spontanées et les œuvres patrimoniales étudiées en classe“.',
        },
        {
          id: 'dzi-fr1-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Que signifie le mot „engouement“ dans l’expression „suscitent un engouement remarquable“ ?',
          options: [
            'un enthousiasme / un vif intérêt',
            'une indifférence totale',
            'une interdiction légale',
            'une fatigue physique',
          ],
          correctIndex: 0,
          explanation: '„Un engouement“ signifie une passion soudaine, un grand enthousiasme collectif pour quelque chose.',
        },
      ],
    },
    {
      id: 'fr1-use-of-french',
      title: 'Partie 2. Compétence linguistique — Grammaire et lexique (40 points)',
      instructions: 'Répondez aux questions de grammaire et de vocabulaire (questions 11 à 20).',
      questions: [
        {
          id: 'dzi-fr1-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Choisissez la forme verbale correcte (subjonctif ou indicatif) : « Bien qu’il ___ très tard hier soir, elle a terminé la rédaction de son rapport. »',
          options: ['soit', 'est', 'était', 'sera'],
          correctIndex: 0,
          explanation: 'La conjonction concessive „bien que“ est toujours suivie du subjonctif : „Bien qu’il soit...“',
        },
        {
          id: 'dzi-fr1-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Choisissez la forme correcte de l’hypothèse dans le passé (si + plus-que-parfait -> conditionnel passé) : « Si nous avions réservé nos billets plus tôt, nous ___ voyager ensemble. »',
          options: ['aurions pu', 'pourrons', 'pouvions', 'avions pu'],
          correctIndex: 0,
          explanation: 'Dans une phrase hypothétique irréelle du passé (Si + plus-que-parfait), la proposition principale est au conditionnel passé : „nous aurions pu“.',
        },
        {
          id: 'dzi-fr1-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Choisissez le pronom relatif composé approprié : « C’est un projet scientifique ___ toute l’équipe a consacré deux ans de travail. »',
          options: ['auquel', 'duquel', 'lequel', 'dont'],
          correctIndex: 0,
          explanation: 'On dit „consacrer du temps à quelque chose“ ; „un projet“ est masculin singulier -> „à + lequel = auquel“.',
        },
        {
          id: 'dzi-fr1-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'Choisissez le bon accord du participe passé : « Les lettres qu’elle a ___ hier matin sont déjà arrivées à Paris. »',
          options: ['envoyé', 'envoyées', 'envoyés', 'envoyer'],
          correctIndex: 1,
          explanation: 'Avec l’auxiliaire „avoir“, le participe passé s’accorde en genre et en nombre avec le COD („les lettres“, féminin pluriel) placé avant le verbe -> „envoyées“.',
        },
        {
          id: 'dzi-fr1-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'Choisissez les pronoms compléments corrects : « As-tu parlé à Marie de ton stage ? — Oui, je ___ ___ ai parlé ce matin. »',
          options: ['lui en', 'la y', 'leur en', 'en lui'],
          correctIndex: 0,
          explanation: '„parler à quelqu’un“ -> COI „lui“ ; „parler de quelque chose“ -> pronom „en“. L’ordre est „je lui en ai parlé“.',
        },
        {
          id: 'dzi-fr1-q16', number: 16, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Complétez avec le pronom relatif qui convient : « Voici l’université ___ j’ai fait mes études de droit et dont je garde un excellent souvenir. » (lieu)',
          acceptedAnswers: ['où', 'ou'],
          explanation: 'Le pronom relatif „où“ indique le lieu (complément circonstanciel de lieu).',
        },
        {
          id: 'dzi-fr1-q17', number: 17, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Mettez le verbe entre parenthèses au subjonctif présent : « Il est indispensable que vous ___ (savoir) défendre vos arguments avec clarté. »',
          acceptedAnswers: ['sachiez'],
          explanation: 'Après l’expression impersonnelle de nécessité „Il est indispensable que“, le verbe „savoir“ à la 2e personne du pluriel du subjonctif présent est „sachiez“.',
        },
        {
          id: 'dzi-fr1-q18', number: 18, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Formez le nom féminin singulier (sans article) dérivé du verbe entre parenthèses : « La ___ (connaître) de plusieurs langues étrangères est un atout majeur. »',
          acceptedAnswers: ['connaissance', 'Connaissance'],
          explanation: 'Le nom féminin dérivé du verbe „connaître“ est „(la) connaissance“.',
        },
        {
          id: 'dzi-fr1-q19', number: 19, kind: 'multi', points: 5,
          prompt: 'Transformez les phrases au discours indirect au passé :',
          parts: [
            {
              id: 'a', label: 'A)', points: 2,
              prompt: '« Paul a dit : "Je viendrai demain." » -> « Paul a dit qu’il ___ le lendemain. » (conditionnel présent du verbe venir)',
              answer: { type: 'text', acceptedAnswers: ['viendrait'] },
            },
            {
              id: 'b', label: 'B)', points: 3,
              prompt: '« Elle m’a demandé : "Qu’est-ce que tu fais ?" » -> « Elle m’a demandé ___ que je faisais. »',
              answer: { type: 'text', acceptedAnswers: ['ce'] },
            },
          ],
          explanation: 'A) Concordance des temps au passé : futur simple („viendrai“) devient conditionnel présent („viendrait“). B) „Qu’est-ce que“ devient „ce que“ dans l’interrogation indirecte.',
        },
        {
          id: 'dzi-fr1-q20', number: 20, kind: 'multi', points: 5,
          prompt: 'Complétez avec la préposition ou la forme du gérondif appropriée :',
          parts: [
            {
              id: 'a', label: 'A)', points: 2,
              prompt: '« Elle a réussi à résoudre ce problème ___ (travailler) avec méthode. » -> « en ___ » (participe présent)',
              answer: { type: 'text', acceptedAnswers: ['travaillant'] },
            },
            {
              id: 'b', label: 'B)', points: 3,
              prompt: '« Il a décidé ___ partir étudier un semestre à Bruxelles. » (préposition après décider)',
              answer: { type: 'text', acceptedAnswers: ['de'] },
            },
          ],
          explanation: 'A) Le gérondif se forme avec „en + participe présent“ (travaillant). B) On construit „décider de + infinitif“.',
        },
      ],
    },
    {
      id: 'fr1-writing',
      title: 'Partie 3. Production écrite (30 points)',
      instructions:
        'Réalisez les deux tâches d’écriture (Question 21 — lettre formelle, 10 points ; Question 22 — essai argumenté, 20 points).',
      questions: [
        {
          id: 'dzi-fr1-q21', number: 21, kind: 'open', points: 10,
          prompt: `Tâche 1 (Lettre / courriel formel — 100 à 130 mots) :
Vous êtes représentant(e) des élèves de votre lycée. Vous écrivez une lettre formelle au directeur de l’Institut français de Bulgarie pour lui présenter le projet d’une „Journée de la francophonie et de l’innovation verte“ dans votre établissement. Vous devez :
1) présenter l’objectif et la date de l’événement ;
2) inviter un conférencier ou un représentant de l’Institut ;
3) solliciter un soutien documentaire ou culturel (expositions, films, livres).`,
          criteria: [
            { label: 'Respect de la consigne, des trois points de contenu et de la mise en page d’une lettre formelle', points: 4 },
            { label: 'Cohérence, registre soutenu et formules d’appel et de politesse appropriées', points: 3 },
            { label: 'Correction morphosyntaxique et richesse lexicale (niveau B2)', points: 3 },
          ],
          modelAnswer: `Monsieur le Directeur,

Au nom du conseil des élèves de notre lycée, j’ai l’honneur de vous présenter notre projet intitulé « Journée de la francophonie et de l’innovation verte », qui se tiendra le 20 mars prochain dans notre établissement. Cet événement vise à sensibiliser les lycéens aux enjeux environnementaux tout en célébrant la diversité culturelle francophone.

À cette occasion, nous serions particulièrement honorés d’accueillir un représentant ou un conférencier de l’Institut français afin d’échanger avec nos élèves sur les projets écologiques menés dans l’espace francophone.

Par ailleurs, nous souhaiterions savoir s’il serait possible de bénéficier d’un prêt d’affiches documentaires, de courts-métrages ou d’ouvrages pour enrichir notre exposition scolaire.

En vous remerciant par avance de l’attention que vous porterez à notre demande, je vous prie d’agréer, Monsieur le Directeur, l’expression de ma considération distinguée.

[Prénom Nom]`,
        },
        {
          id: 'dzi-fr1-q22', number: 22, kind: 'open', points: 20,
          prompt: `Tâche 2 (Essai argumenté — 200 à 250 mots) :
Sujet : « Selon vous, le développement rapide de l’intelligence artificielle constitue-t-il une chance ou une menace pour les métiers créatifs et l’éducation ? »
Rédigez un texte structuré (introduction, développement avec arguments pour et contre illustrés d’exemples, conclusion personnelle).`,
          criteria: [
            { label: 'Structure claire de l’essai argumenté (introduction problématisée, développement dialectique, conclusion)', points: 7 },
            { label: 'Qualité de l’argumentation et emploi pertinent des connecteurs logiques (d’une part, en revanche, néanmoins, par conséquent)', points: 7 },
            { label: 'Maîtrise de la langue française (grammaire B2, subjonctif, lexique précis, orthographe)', points: 6 },
          ],
          modelAnswer: `Depuis quelques années, l’essor fulgurant de l’intelligence artificielle (IA) bouleverse aussi bien le monde éducatif que les secteurs artistiques et créatifs. On peut dès lors se demander si cette révolution technologique représente un progrès prometteur ou un risque pour la créativité humaine.

D’une part, l’intelligence artificielle offre des outils remarquables pour accompagner l’apprentissage et stimuler l’innovation. Dans le domaine de l’éducation, elle permet de personnaliser les exercices selon le rythme de chaque élève et facilite l’accès aux ressources scientifiques. De même, pour les architectes, les graphistes ou les musiciens, les algorithmes peuvent automatiser les tâches techniques répétitives, leur laissant davantage de temps pour la conception artistique.

En revanche, une utilisation excessive et non maîtrisée de ces outils comporte des dangers réels. Si les élèves se contentent de déléguer la rédaction de leurs travaux à des programmes automatisés, ils risquent d’affaiblir leur esprit critique et leur capacité d’expression personnelle. En outre, aucune machine ne possède de sensibilité vécue ni d’intention morale, qualités pourtant essentielles à toute œuvre d’art authentique.

En conclusion, j’estime que l’intelligence artificielle n’est ni une menace absolue ni une solution miracle : tout dépend de l’usage que nous en faisons. À condition qu’elle demeure un instrument au service de l’intelligence humaine, elle peut enrichir l’éducation et la création sans jamais remplacer le talent humain.`,
        },
      ],
    },
  ],
};

export const DZI_ES_B2_PRACTICE_1: ExamPaper = {
  id: 'practice-dzi-es-b2-1',
  title: 'Испански език (ниво B2) — Втори ДЗИ, тренировъчен вариант 1',
  exam: 'ДЗИ',
  subject: 'Испански език',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Пълен тренировъчен вариант за Втори ДЗИ по испански език (профилирана подготовка — ниво B2 по ОЕЕР). Включва Четене с разбиране (30 т.), Езикови задачи — граматика и лексика (40 т.) и Създаване на два писмени текста (30 т.).',
  sections: [
    {
      id: 'es1-reading',
      title: 'Parte 1. Comprensión de lectura (30 puntos)',
      instructions:
        'Lea los dos textos y elija la opción correcta (A, B, C o D) para las preguntas 1 a 10. Cada respuesta correcta vale 3 puntos.',
      questions: [
        {
          id: 'dzi-es1-q1', number: 1, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Texto A: Turismo sostenible y protección del patrimonio en España',
              body: `España es uno de los destinos turísticos más visitados del mundo gracias a su riqueza histórica, su gastronomía y la diversidad de sus paisajes. Sin embargo, la concentración masiva de visitantes durante los meses de verano en determinadas ciudades costeras y centros históricos ha llevado a las autoridades locales y a los expertos a replantear el modelo turístico tradicional.
El nuevo enfoque apuesta decididamente por el turismo sostenible y la desestacionalización. Esto implica distribuir los flujos de viajeros a lo largo de todo el año y promover rutas culturales, gastronómicas y de naturaleza en el interior del país — la llamada „España rural“ —, donde existen pueblos medievales y parques naturales de extraordinario valor.
Asimismo, muchos museos y monumentos declarados Patrimonio de la Humanidad han implantado sistemas de reserva anticipada con aforo limitado. De este modo, no solo se garantiza la conservación de los edificios históricos y los ecosistemas frágiles, sino que también se mejora notablemente la calidad de la experiencia tanto para los viajeros como para los residentes locales.`,
            },
          ],
          prompt: '¿Qué problema ha motivado el replanteamiento del modelo turístico tradicional según el primer párrafo?',
          options: [
            'La falta de monumentos históricos en España.',
            'La concentración masiva de turistas en verano en ciertas zonas costeras y centros históricos.',
            'El cierre definitivo de todos los aeropuertos españoles.',
            'La ausencia de gastronomía tradicional.',
          ],
          correctIndex: 1,
          explanation: 'El primer párrafo señala que „la concentración masiva de visitantes durante los meses de verano en determinadas ciudades costeras y centros históricos ha llevado... a replantear el modelo“.',
        },
        {
          id: 'dzi-es1-q2', number: 2, kind: 'choice', points: 3,
          prompt: '¿En qué consiste la „desestacionalización“ mencionada en el segundo párrafo?',
          options: [
            'En prohibir los viajes durante el otoño y la primavera.',
            'En repartir la llegada de turistas a lo largo de todo el año y fomentar destinos del interior rural.',
            'En eliminar las estaciones de tren de las ciudades pequeñas.',
            'En abrir los museos únicamente un día al año.',
          ],
          correctIndex: 1,
          explanation: 'El texto explica que significa „distribuir los flujos de viajeros a lo largo de todo el año y promover rutas... en el interior del país“.',
        },
        {
          id: 'dzi-es1-q3', number: 3, kind: 'choice', points: 3,
          prompt: '¿Qué medida han adoptado muchos museos y monumentos Patrimonio de la Humanidad?',
          options: [
            'Han duplicado el número máximo de visitantes por hora sin control.',
            'Han establecido sistemas de reserva anticipada con límite de capacidad (aforo limitado).',
            'Han prohibido la entrada a los estudiantes.',
            'Han trasladado sus colecciones al extranjero.',
          ],
          correctIndex: 1,
          explanation: 'El tercer párrafo indica que „han implantado sistemas de reserva anticipada con aforo limitado“.',
        },
        {
          id: 'dzi-es1-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Según el texto, ¿quiénes se benefician de estas nuevas medidas de gestión turística?',
          options: [
            'Únicamente las grandes cadenas internacionales.',
            'Tanto el patrimonio y los ecosistemas como los propios viajeros y los residentes locales.',
            'Nadie, porque el turismo desaparece por completo.',
            'Solamente los turistas que viajan en agosto.',
          ],
          correctIndex: 1,
          explanation: 'El final del texto afirma que se garantiza la conservación y se mejora la experiencia „tanto para los viajeros como para los residentes locales“.',
        },
        {
          id: 'dzi-es1-q5', number: 5, kind: 'choice', points: 3,
          prompt: '¿Qué significa la palabra „aforo“ en la expresión „con aforo limitado“?',
          options: [
            'capacidad máxima permitida de personas en un recinto',
            'precio del billete de avión',
            'horario nocturno de transporte',
            'folleto publicitario',
          ],
          correctIndex: 0,
          explanation: 'En español, „el aforo“ es el número máximo de personas que puede admitir un lugar público.',
        },
        {
          id: 'dzi-es1-q6', number: 6, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Texto B: Huertos urbanos y educación ambiental en las escuelas',
              body: `En la última década, centenares de institutos y colegios de España y América Latina han transformado patios de cemento y terrazas desaprovechadas en huertos escolares ecológicos. Lejos de ser una simple actividad recreativa, estos espacios verdes funcionan como verdaderos laboratorios al aire libre donde se integran asignaturas como Biología, Química, Matemáticas y Educación para la Ciudadanía.
Al participar en todo el ciclo de cultivo — desde la siembra de las semillas y el compostaje de residuos orgánicos hasta la cosecha de verduras de temporada —, el alumnado comprende de manera práctica la importancia de la biodiversidad, el ahorro de agua mediante el riego por goteo y el consumo responsable de alimentos de proximidad.
Además, diversos estudios pedagógicos demuestran que el trabajo cooperativo en el huerto escolar mejora la convivencia en el centro educativo, reduce el estrés académico y fomenta hábitos de alimentación mucho más saludables entre los adolescentes.`,
            },
          ],
          prompt: 'Según el Texto B, ¿cómo se conciben los huertos escolares en los centros educativos?',
          options: [
            'Como almacenes cerrados para guardar herramientas.',
            'Como laboratorios al aire libre donde se conectan de forma práctica distintas asignaturas.',
            'Como empresas comerciales destinadas a la exportación.',
            'Como sustitutos obligatorios de las clases de idiomas.',
          ],
          correctIndex: 1,
          explanation: 'El primer párrafo afirma que „funcionan como verdaderos laboratorios al aire libre donde se integran asignaturas como Biología, Química, Matemáticas...“.',
        },
        {
          id: 'dzi-es1-q7', number: 7, kind: 'choice', points: 3,
          prompt: '¿Qué técnica de ahorro de agua aprenden los estudiantes según el segundo párrafo?',
          options: [
            'La inundación artificial de los patios.',
            'El riego por goteo.',
            'La desalinización industrial.',
            'El transporte de hielo glaciar.',
          ],
          correctIndex: 1,
          explanation: 'En el segundo párrafo se menciona expresamente „el ahorro de agua mediante el riego por goteo“.',
        },
        {
          id: 'dzi-es1-q8', number: 8, kind: 'choice', points: 3,
          prompt: '¿Qué beneficio social y emocional aportan los huertos escolares según los estudios pedagógicos?',
          options: [
            'Aumentan la competitividad agresiva entre los alumnos.',
            'Mejoran la convivencia mediante el trabajo cooperativo, reducen el estrés y promueven hábitos saludables.',
            'Eliminan la necesidad de hacer exámenes.',
            'Reducen las horas de sueño de los jóvenes.',
          ],
          correctIndex: 1,
          explanation: 'El tercer párrafo destaca que el trabajo cooperativo mejora la convivencia, reduce el estrés académico y fomenta hábitos saludables.',
        },
        {
          id: 'dzi-es1-q9', number: 9, kind: 'choice', points: 3,
          prompt: '¿Qué significa la expresión „alimentos de proximidad“?',
          options: [
            'Productos cultivados localmente, cerca del consumidor.',
            'Comida ultraprocesada importada de otros continentes.',
            'Alimentos sintéticos de laboratorio.',
            'Productos congelados durante diez años.',
          ],
          correctIndex: 0,
          explanation: '„Alimentos de proximidad“ (o de kilómetro cero) son aquellos producidos en la misma región donde se consumen.',
        },
        {
          id: 'dzi-es1-q10', number: 10, kind: 'choice', points: 3,
          prompt: '¿Cuál es el sinónimo de „desaprovechadas“ en „terrazas desaprovechadas“?',
          options: ['no utilizadas / sin uso adecuado', 'modernizadas', 'peligrosas', 'subterráneas'],
          correctIndex: 0,
          explanation: '„Desaprovechado/a“ significa que no se le saca el provecho o utilidad que podría tener.',
        },
      ],
    },
    {
      id: 'es1-use-of-spanish',
      title: 'Parte 2. Competencia lingüística — Gramática y vocabulario (40 puntos)',
      instructions: 'Resuelva las tareas de gramática y léxico (preguntas 11 a 20).',
      questions: [
        {
          id: 'dzi-es1-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Elija la forma verbal correcta (oración condicional irreal del pasado): «Si me ___ avisado a tiempo, te habría acompañado a la conferencia.»',
          options: ['hubieras', 'habrías', 'hayas', 'habías'],
          correctIndex: 0,
          explanation: 'En las condicionales de tercer tipo (irreales del pasado), la prótasis con „si“ lleva pluscuamperfecto de subjuntivo: „Si me hubieras (o hubieses) avisado...“.',
        },
        {
          id: 'dzi-es1-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Elija la opción correcta entre „por“ y „para“: «Este informe económico debe estar terminado ___ el próximo lunes sin falta.»',
          options: ['para', 'por', 'en', 'con'],
          correctIndex: 0,
          explanation: 'Para indicar una fecha límite o plazo en el futuro se utiliza la preposición „para“ („para el próximo lunes“).',
        },
        {
          id: 'dzi-es1-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Elija la forma correcta del subjuntivo: «No creo que los resultados del concurso se ___ antes del viernes.»',
          options: ['publiquen', 'publican', 'publicarán', 'publicaban'],
          correctIndex: 0,
          explanation: 'Los verbos de opinión en forma negativa („No creo que...“) rigen subjuntivo: „se publiquen“.',
        },
        {
          id: 'dzi-es1-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'Elija el verbo correcto („ser“ o „estar“): «La ceremonia de entrega de diplomas ___ el próximo sábado en el Paraninfo de la universidad.»',
          options: ['será', 'estará', 'fue estado', 'estuvo'],
          correctIndex: 0,
          explanation: 'Para localizar acontecimientos o eventos en el espacio y en el tiempo („tener lugar / celebrarse“) en español se usa el verbo „ser“: „La ceremonia será...“.',
        },
        {
          id: 'dzi-es1-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'Elija el conector adecuado: «___ había mucho tráfico en la autopista, llegamos puntualmente a la estación.»',
          options: ['A pesar de que', 'Para que', 'A menos que', 'Con tal de que'],
          correctIndex: 0,
          explanation: '„A pesar de que“ introduce una oración concesiva con indicativo cuando se trata de un hecho real constatado.',
        },
        {
          id: 'dzi-es1-q16', number: 16, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Complete con la forma correcta del imperfecto de subjuntivo del verbo „tener“ (en -ra): «El coordinador nos pidió que ___ (tener, nosotros) listos los documentos antes de la reunión.»',
          acceptedAnswers: ['tuviéramos', 'tuvieramos', 'tuviésemos'],
          explanation: '„pedir que“ en pasado exige imperfecto de subjuntivo: „tuviéramos“ / „tuviésemos“.',
        },
        {
          id: 'dzi-es1-q17', number: 17, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Complete con la preposición que rige el verbo: «Todos los voluntarios se comprometieron ___ participar en la campaña de reforestación.»',
          acceptedAnswers: ['a', 'A'],
          explanation: 'El verbo pronominal „comprometerse“ se construye con la preposición „a“ + infinitivo („comprometerse a participar“).',
        },
        {
          id: 'dzi-es1-q18', number: 18, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Forme el sustantivo femenino singular (sin artículo) derivado del verbo entre paréntesis: «La ___ (investigar) científica es fundamental para el progreso médico.»',
          acceptedAnswers: ['investigación', 'investigacion'],
          explanation: 'Del verbo „investigar“ se deriva el sustantivo femenino „(la) investigación“.',
        },
        {
          id: 'dzi-es1-q19', number: 19, kind: 'multi', points: 5,
          prompt: 'Sustituya los complementos por los pronombres correspondientes o transforme al estilo indirecto:',
          parts: [
            {
              id: 'a', label: 'A)', points: 2,
              prompt: '«¿Le has entregado las llaves al director? — Sí, ya ___ las he entregado.» (pronombre de objeto indirecto delante de „las“)',
              answer: { type: 'text', acceptedAnswers: ['se'] },
            },
            {
              id: 'b', label: 'B)', points: 3,
              prompt: 'Estilo indirecto: «Marta dijo: "Mañana empezaré el curso."» -> «Marta dijo que al día siguiente ___ el curso.» (condicional simple de empezar)',
              answer: { type: 'text', acceptedAnswers: ['empezaría', 'empezaria'] },
            },
          ],
          explanation: 'A) Delante de lo/la/los/las, el pronombre indirecto le/les se transforma en „se“ („se las he entregado“). B) En estilo indirecto con verbo introductor en pasado, el futuro „empezaré“ pasa al condicional „empezaría“.',
        },
        {
          id: 'dzi-es1-q20', number: 20, kind: 'multi', points: 5,
          prompt: 'Complete las perífrasis verbales:',
          parts: [
            {
              id: 'a', label: 'A)', points: 2,
              prompt: '«Llevamos tres años ___ (estudiar — gerundio) español en el instituto.»',
              answer: { type: 'text', acceptedAnswers: ['estudiando'] },
            },
            {
              id: 'b', label: 'B)', points: 3,
              prompt: '«Cuando ___ (llegar — presente de subjuntivo, tú) a Madrid, llámame por teléfono.»',
              answer: { type: 'text', acceptedAnswers: ['llegues'] },
            },
          ],
          explanation: 'A) La perífrasis durativa es „llevar + cantidad de tiempo + gerundio“ (estudiando). B) „Cuando“ referido al futuro rige presente de subjuntivo („llegues“).',
        },
      ],
    },
    {
      id: 'es1-writing',
      title: 'Parte 3. Expresión e interacción escritas (30 puntos)',
      instructions:
        'Realice las dos tareas de expresión escrita (Pregunta 21 — correo electrónico formal, 10 puntos; Pregunta 22 — ensayo argumentativo, 20 puntos).',
      questions: [
        {
          id: 'dzi-es1-q21', number: 21, kind: 'open', points: 10,
          prompt: `Tarea 1 (Correo electrónico formal — 100 a 130 palabras):
Usted ha leído la convocatoria de un programa de becas de verano en la Universidad de Salamanca para estudiantes europeos de último año de bachillerato. Escriba un correo formal al Departamento de Admisiones en el que:
1) exprese su interés por el curso de lengua y cultura españolas y mencione su nivel actual de español;
2) pregunte por los requisitos de solicitud y los plazos de envío de la documentación;
3) solicite información sobre el alojamiento en residencias universitarias.`,
          criteria: [
            { label: 'Cumplimiento de los tres puntos de contenido y estructura adecuada de una carta/correo formal', points: 4 },
            { label: 'Registro formal (tratamiento de usted), coherencia y fórmulas de saludo y despedida', points: 3 },
            { label: 'Corrección gramatical, riqueza léxica de nivel B2 y ortografía', points: 3 },
          ],
          modelAnswer: `Estimados señores del Departamento de Admisiones:

Me dirijo a ustedes con motivo de la convocatoria de becas de verano publicada en la página web de la Universidad de Salamanca. Actualmente curso el último año de bachillerato en Bulgaria, cuento con un nivel B2 de español y estoy muy interesado en participar en el curso intensivo de lengua y cultura españolas.

Les agradecería que me informaran sobre los requisitos específicos para optar a la beca, así como sobre los documentos necesarios y la fecha límite para presentar la solicitud.

Por último, quisiera saber si el programa incluye el alojamiento en las residencias universitarias del campus y cuál sería el procedimiento de reserva.

Agradeciéndoles de antemano su amable atención, quedo a la espera de su respuesta.

Atentamente,
[Nombre y Apellidos]`,
        },
        {
          id: 'dzi-es1-q22', number: 22, kind: 'open', points: 20,
          prompt: `Tarea 2 (Ensayo argumentativo — 200 a 250 palabras):
Tema: «¿Cree usted que estudiar o realizar prácticas profesionales en otro país europeo durante la juventud es una experiencia imprescindible hoy en día?»
Redacte un texto argumentativo bien estructurado (introducción, argumentos a favor y posibles dificultades con ejemplos concretos, y conclusión personal).`,
          criteria: [
            { label: 'Estructura clara (introducción, desarrollo equilibrado de argumentos y conclusión personal)', points: 7 },
            { label: 'Cohesión textual y uso adecuado de conectores discursivos (por un lado, sin embargo, además, en conclusión)', points: 7 },
            { label: 'Dominio gramatical (uso correcto del subjuntivo, tiempos pasados y condicional) y precisión léxica de nivel B2', points: 6 },
          ],
          modelAnswer: `En un mundo cada vez más interconectado, los programas de movilidad académica y profesional — como Erasmus+ — ofrecen a miles de jóvenes la oportunidad de vivir y formarse en el extranjero. Ante esta realidad, cabe preguntarse hasta qué punto dicha experiencia resulta imprescindible para el futuro personal y laboral.

Por un lado, residir temporalmente en otro país aporta ventajas indiscutibles. En primer lugar, permite perfeccionar el dominio de lenguas extranjeras en situaciones reales de comunicación, lo cual incrementa notablemente las oportunidades de empleo. En segundo lugar, el contacto diario con otras culturas fomenta la tolerancia, la autonomía y la capacidad de adaptación ante entornos nuevos, competencias muy valoradas por las empresas actuales.

Por otro lado, es cierto que estudiar fuera también conlleva ciertos retos. Algunos estudiantes pueden experimentar dificultades económicas debido al coste del alquiler en las grandes ciudades europeas o sentir nostalgia al estar lejos de su familia y amigos. Asimismo, no todas las familias disponen de los recursos suficientes para complementar las becas existentes.

En conclusión, aunque una estancia en el extranjero no sea la única vía para alcanzar el éxito profesional, considero que constituye una experiencia sumamente enriquecedora que transforma la visión del mundo de los jóvenes. Por ello, las instituciones deberían ampliar las ayudas económicas para que ningún estudiante quede excluido por motivos financieros.`,
        },
      ],
    },
  ],
};

export const DZI_RU_B2_PRACTICE_1: ExamPaper = {
  id: 'practice-dzi-ru-b2-1',
  title: 'Руски език (ниво B2) — Втори ДЗИ, тренировъчен вариант 1',
  exam: 'ДЗИ',
  subject: 'Руски език',
  kind: 'practice',
  durationMinutes: 240,
  maxPoints: 100,
  gradeScale: DZI_SCALE,
  note:
    'Пълен тренировъчен вариант за Втори ДЗИ по руски език (профилирана подготовка — ниво B2 по ОЕЕР). Включва Четене с разбиране (30 т.), Езикови задачи — граматика и лексика (40 т.) и Създаване на два писмени текста (30 т.).',
  sections: [
    {
      id: 'ru1-reading',
      title: 'Часть 1. Чтение и понимание текста (30 баллов)',
      instructions:
        'Прочитайте два текста и выберите правильный вариант ответа (A, B, C или D) для заданий 1–10. Каждый правильный ответ оценивается в 3 балла.',
      questions: [
        {
          id: 'dzi-ru1-q1', number: 1, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Текст А: Современные библиотеки как культурные и образовательные пространства',
              body: `Ещё двадцать лет назад многие предсказывали, что с распространением интернета и электронных книг традиционные публичные библиотеки постепенно потеряют своих читателей и превратятся в тихие архивы редких изданий. Однако в действительности произошло обратное: современные городские библиотеки переживают настоящее возрождение, меняя свой облик и функции.
Сегодня молодёжь приходит в библиотеку не только ради бумажной книги, но и ради живого общения и совместной работы. Наряду с читальными залами там открываются зоны коворкинга с высокоскоростным интернетом, студии звукозаписи для подкастов, дискуссионные клубы, языковые мастерские и выставочные галереи.
По мнению культурологов, главная ценность обновлённой библиотеки заключается в её открытости и доступности: это одно из немногих городских пространств, где любой человек — школьник, студент, исследователь или пенсионер — может бесплатно учиться, работать над проектами и участвовать в культурной жизни общества.`,
            },
          ],
          prompt: 'Какой прогноз относительно будущего библиотек упоминается в первом абзаце Текста А?',
          options: [
            'Что библиотеки заменят все школы и университеты.',
            'Что из-за интернета и электронных книг традиционные библиотеки потеряют читателей.',
            'Что бумажные книги станут единственным источником информации.',
            'Что вход в библиотеки станет платным для всех.',
          ],
          correctIndex: 1,
          explanation: 'В первом абзаце говорится: «многие предсказывали, что с распространением интернета и электронных книг традиционные публичные библиотеки постепенно потеряют своих читателей».',
        },
        {
          id: 'dzi-ru1-q2', number: 2, kind: 'choice', points: 3,
          prompt: 'Какие новые возможности предлагают современные городские библиотеки согласно второму абзацу?',
          options: [
            'Только выдачу учебников на дом без права работы в зале.',
            'Зоны коворкинга, студии для записи подкастов, дискуссионные клубы, языковые мастерские и выставки.',
            'Торговлю автомобилями и бытовой техникой.',
            'Спортивные соревнования по футболу.',
          ],
          correctIndex: 1,
          explanation: 'Во втором абзаце перечислены зоны коворкинга, студии звукозаписи, дискуссионные клубы, языковые мастерские и выставочные галереи.',
        },
        {
          id: 'dzi-ru1-q3', number: 3, kind: 'choice', points: 3,
          prompt: 'В чём, по мнению культурологов, состоит главная ценность обновлённой библиотеки?',
          options: [
            'В строгом запрете на разговоры и обсуждения.',
            'В её открытости и бесплатной доступности для обучения и творчества людей любого возраста.',
            'В высокой стоимости читательского билета.',
            'В отказе от использования компьютеров.',
          ],
          correctIndex: 1,
          explanation: 'В третьем абзаце подчёркивается открытость и доступность библиотеки, где любой человек может бесплатно учиться и участвовать в культурной жизни.',
        },
        {
          id: 'dzi-ru1-q4', number: 4, kind: 'choice', points: 3,
          prompt: 'Что означает выражение «переживают настоящее возрождение» в первом абзаце?',
          options: [
            'находятся в глубоком кризисе',
            'испытывают новый подъём, обновление и рост популярности',
            'закрываются на ремонт',
            'переезжают за границу',
          ],
          correctIndex: 1,
          explanation: '«Переживать возрождение» означает активно обновляться, вновь обретать популярность и значимость.',
        },
        {
          id: 'dzi-ru1-q5', number: 5, kind: 'choice', points: 3,
          prompt: 'Какой предлог в тексте выражает значение «вместе с, одновременно с» («___ с читальными залами»)?',
          options: ['Наряду', 'Вопреки', 'Вместо', 'Из-за'],
          correctIndex: 0,
          explanation: 'Предлог «наряду с (+ Тв. п.)» означает «вместе с, наравне с».',
        },
        {
          id: 'dzi-ru1-q6', number: 6, kind: 'choice', points: 3,
          stimulus: [
            {
              kind: 'text',
              title: 'Текст Б: Экологическое волонтёрство и научные экспедиции для старшеклассников',
              body: `Всё больше старшеклассников и студентов выбирают активный летний отдых, совмещая путешествия с участием в экологических и археологических волонтёрских экспедициях. Такие программы организуются национальными парками, ботаническими садами и университетами в самых разных уголках мира.
Во время смены участники под руководством профессиональных биологов и экологов обустраивают экологические тропы, ведут учёт редких видов птиц и растений, очищают берега озёр и помогают восстанавливать лесные массивы после пожаров. Вечерами для волонтёров проводятся научно-популярные лекции и практические семинары под открытым небом.
По словам самих участников, подобный опыт даёт гораздо больше, чем обычная туристическая поездка: он помогает проверить себя в командной работе, определиться с будущей профессией и увидеть реальный результат собственного труда.`,
            },
          ],
          prompt: 'Кто организует волонтёрские экспедиции, описанные в Тексте Б?',
          options: [
            'Крупные торговые центры.',
            'Национальные парки, ботанические сады и университеты.',
            'Только частные транспортные компании.',
            'Строительные корпорации.',
          ],
          correctIndex: 1,
          explanation: 'В первом абзаце указано: «Такие программы организуются национальными парками, ботаническими садами и университетами».',
        },
        {
          id: 'dzi-ru1-q7', number: 7, kind: 'choice', points: 3,
          prompt: 'Чем занимаются волонтёры под руководством биологов и экологов днём?',
          options: [
            'Сдают письменные экзамены в закрытых аудиториях.',
            'Обустраивают экотропы, ведут учёт редких видов, очищают берега озёр и восстанавливают леса.',
            'Строят многоэтажные гостиницы.',
            'Работают только в офисе за компьютером.',
          ],
          correctIndex: 1,
          explanation: 'Во втором абзаце подробно описана практическая природоохранная работа участников.',
        },
        {
          id: 'dzi-ru1-q8', number: 8, kind: 'choice', points: 3,
          prompt: 'Что входит в вечернюю программу участников экспедиции?',
          options: [
            'Научно-популярные лекции и практические семинары на свежем воздухе.',
            'Ночные дежурства на заводе.',
            'Обязательные уроки бухгалтерского учёта.',
            'Никаких мероприятий не проводится.',
          ],
          correctIndex: 0,
          explanation: 'В тексте сказано: «Вечерами для волонтёров проводятся научно-популярные лекции и практические семинары под открытым небом».',
        },
        {
          id: 'dzi-ru1-q9', number: 9, kind: 'choice', points: 3,
          prompt: 'Почему участники считают такой опыт более ценным, чем обычную туристическую поездку?',
          options: [
            'Потому что за участие выплачивают высокую зарплату.',
            'Потому что они развивают навыки работы в команде, выбирают будущую профессию и видят реальный результат своего труда.',
            'Потому что им не нужно соблюдать никаких правил.',
            'Потому что поездка длится всего один час.',
          ],
          correctIndex: 1,
          explanation: 'В последнем абзаце отмечается, что этот опыт помогает проверить себя в командной работе, определиться с будущей профессией и увидеть результат труда.',
        },
        {
          id: 'dzi-ru1-q10', number: 10, kind: 'choice', points: 3,
          prompt: 'Какое словосочетание в тексте является синонимом выражения «на свежем воздухе / вне помещения»?',
          options: [
            'под открытым небом',
            'под руководством',
            'по словам',
            'в действительности',
          ],
          correctIndex: 0,
          explanation: 'Устойчивое выражение «под открытым небом» означает «вне здания, на открытом воздухе».',
        },
      ],
    },
    {
      id: 'ru1-use-of-russian',
      title: 'Часть 2. Языковая компетенция — Грамматика и лексика (40 баллов)',
      instructions: 'Выполните грамматические и лексические задания (вопросы 11–20).',
      questions: [
        {
          id: 'dzi-ru1-q11', number: 11, kind: 'choice', points: 3,
          prompt: 'Выберите правильную форму числительного и существительного: «На международную олимпиаду приехали делегации из ___ стран мира.»',
          options: [
            'двадцати четырёх',
            'двадцать четыре',
            'двадцатью четырьмя',
            'двадцати четыре',
          ],
          correctIndex: 0,
          explanation: 'После предлога «из» употребляется родительный падеж обеих частей составного числительного: «из двадцати четырёх стран».',
        },
        {
          id: 'dzi-ru1-q12', number: 12, kind: 'choice', points: 3,
          prompt: 'Выберите правильный глагол движения с приставкой: «По дороге в университет мы на пять минут ___ в книжный магазин за словарём.»',
          options: ['зашли', 'прошли', 'вышли', 'отошли'],
          correctIndex: 0,
          explanation: 'Приставка «за-» с глаголом движения («зайти в магазин по дороге») обозначает попутное кратковременное посещение какого-либо места.',
        },
        {
          id: 'dzi-ru1-q13', number: 13, kind: 'choice', points: 3,
          prompt: 'Выберите правильную форму действительного причастия прошедшего времени: «Студенты, успешно ___ все экзамены зимней сессии, отправились на каникулы.»',
          options: ['сдавшие', 'сданные', 'сдававшими', 'сдавших'],
          correctIndex: 0,
          explanation: 'Подлежащее «студенты» (Им. п. мн. ч.) сами совершили действие в прошлом -> действительное причастие прошедшего времени в Им. п. мн. ч. «сдавшие».',
        },
        {
          id: 'dzi-ru1-q14', number: 14, kind: 'choice', points: 3,
          prompt: 'Выберите правильный предлог: «___ сложным погодным условиям самолёт приземлился точно по расписанию.»',
          options: ['Вопреки', 'Благодаря', 'Из-за', 'Вследствие'],
          correctIndex: 0,
          explanation: 'Предлог «вопреки (+ Дат. п. — сложным условиям)» выражает уступительное значение («несмотря на препятствие»).',
        },
        {
          id: 'dzi-ru1-q15', number: 15, kind: 'choice', points: 3,
          prompt: 'Выберите правильный вид глагола в инфинитиве: «Не надо ___ окно: в комнате и так достаточно прохладно.»',
          options: ['открывать', 'открыть', 'открыв', 'открывший'],
          correctIndex: 0,
          explanation: 'После слов «не надо / не нужно / не стоит» (отрицание необходимости) всегда употребляется инфинитив несовершенного вида: «не надо открывать».',
        },
        {
          id: 'dzi-ru1-q16', number: 16, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Поставьте существительное в скобках в правильную падежную форму (Творительный падеж ед. ч.): «Моя сестра уже несколько лет серьёзно увлекается современной ___ (архитектура).»',
          acceptedAnswers: ['архитектурой'],
          explanation: 'Глагол «увлекаться» требует творительного падежа (чем?): современной архитектурой.',
        },
        {
          id: 'dzi-ru1-q17', number: 17, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Образуйте деепричастие совершенного вида от глагола «прочитать»: «___ статью до конца, он выписал самые важные аргументы автора.»',
          acceptedAnswers: ['Прочитав', 'прочитав'],
          explanation: 'От глагола совершенного вида «прочитать» деепричастие прошедшего времени образуется с помощью суффикса -в: «прочитав».',
        },
        {
          id: 'dzi-ru1-q18', number: 18, kind: 'short', answerType: 'text', points: 5,
          prompt: 'Дополните союз в придаточном предложении цели: «Преподаватель повторил правило ещё раз, ___ все ученики поняли новую тему.»',
          acceptedAnswers: ['чтобы', 'Чтобы'],
          explanation: 'Придаточное предложение цели с разными субъектами вводится союзом «чтобы + форма прошедшего времени (поняли)».',
        },
        {
          id: 'dzi-ru1-q19', number: 19, kind: 'multi', points: 5,
          prompt: 'Преобразуйте предложения, используя правильную падежную форму местоимения «который»:',
          parts: [
            {
              id: 'a', label: 'А)', points: 2,
              prompt: '«Это молодой учёный, с ___ (который) мы познакомились на конференции в Софии.»',
              answer: { type: 'text', acceptedAnswers: ['которым'] },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: '«Книга, о ___ (которая) вчера рассказывал учитель, есть в школьной библиотеке.»',
              answer: { type: 'text', acceptedAnswers: ['которой'] },
            },
          ],
          explanation: 'А) «познакомиться с кем?» (Тв. п. м. р.) -> «с которым». Б) «рассказывать о чём?» (Предл. п. ж. р.) -> «о которой».',
        },
        {
          id: 'dzi-ru1-q20', number: 20, kind: 'multi', points: 5,
          prompt: 'Запишите правильную форму краткого страдательного причастия и сравнительной степени:',
          parts: [
            {
              id: 'a', label: 'А)', points: 2,
              prompt: '«Выставка молодых художников будет ___ (открыть — краткое причастие ж. р.) в субботу.»',
              answer: { type: 'text', acceptedAnswers: ['открыта'] },
            },
            {
              id: 'b', label: 'Б)', points: 3,
              prompt: 'Образуйте простую сравнительную степень от прилагательного «высокий»: «Эта вершина ___ всех остальных гор в регионе.»',
              answer: { type: 'text', acceptedAnswers: ['выше'] },
            },
          ],
          explanation: 'А) Краткое страдательное причастие женского рода от «открыть» — «открыта». Б) Сравнительная степень от «высокий» — «выше».',
        },
      ],
    },
    {
      id: 'ru1-writing',
      title: 'Часть 3. Создание письменного текста (30 баллов)',
      instructions:
        'Выполните оба письменных задания (Задание 21 — официальное письмо, 10 баллов; Задание 22 — аргументированное эссе, 20 баллов).',
      questions: [
        {
          id: 'dzi-ru1-q21', number: 21, kind: 'open', points: 10,
          prompt: `Задание 21 (Официальное электронное письмо — 100–130 слов):
Вы увидели объявление о проведении международного молодёжного форума «Наука, экология и культура XXI века» для старшеклассников. Напишите официальное письмо организаторам форума, в котором:
1) представьтесь и объясните, почему Вы хотите принять участие в форуме и с каким докладом планируете выступить;
2) уточните даты проведения, рабочий язык секций и формат участия (очный или дистанционный);
3) спросите об условиях проживания для иностранных участников.`,
          criteria: [
            { label: 'Полнота раскрытия всех трёх содержательных пунктов и соблюдение структуры официального письма', points: 4 },
            { label: 'Официально-деловой стиль (обращение на «Вы»), логическая связность и этикетные формулы', points: 3 },
            { label: 'Грамматическая правильность, лексическое богатство уровня B2 и орфография', points: 3 },
          ],
          modelAnswer: `Уважаемые организаторы международного молодёжного форума!

С большим интересом прочитал(а) на Вашем официальном сайте информацию о проведении форума «Наука, экология и культура XXI века». Я учусь в двенадцатом классе профильной гимназии в Болгарии и хотел(а) бы подать заявку на участие в экологической секции с докладом, посвящённым сохранению биоразнообразия горных регионов Балканского полуострова.

Не могли бы Вы уточнить точные сроки регистрации докладчиков, а также сообщить, предусмотрена ли возможность дистанционного выступления для зарубежных школьников?

Кроме того, буду очень признателен (признательна), если Вы напишете, предоставляется ли иногородним и иностранным участникам проживание в студенческом кампусе во время работы форума.

Заранее благодарю Вас за ответ и надеюсь на плодотворное сотрудничество.

С уважением,
[Имя и Фамилия]`,
        },
        {
          id: 'dzi-ru1-q22', number: 22, kind: 'open', points: 20,
          prompt: `Задание 22 (Аргументированное эссе — 200–250 слов):
Тема: «Что важнее при выборе будущей профессии: личное призвание и интерес к делу или высокий доход и востребованность на рынке труда?»
Напишите развёрнутое эссе (вступление с постановкой проблемы, аргументы в пользу обеих точек зрения с примерами, собственная обоснованная позиция и заключение).`,
          criteria: [
            { label: 'Чёткая композиция эссе (вступление, сопоставление двух точек зрения с примерами, вывод)', points: 7 },
            { label: 'Логичность рассуждений и уместное использование средств связности (с одной стороны, с другой стороны, более того, следовательно)', points: 7 },
            { label: 'Языковая грамотность (разнообразие синтаксических конструкций уровня B2, точность лексики, орфография и пунктуация)', points: 6 },
          ],
          modelAnswer: `Выбор будущей профессии — одно из самых ответственных решений, перед которым стоит каждый выпускник школы. Нередко молодые люди оказываются перед непростой дилеммой: следовать за своим призванием и внутренним интересом или отдать предпочтение престижной специальности, гарантирующей высокий доход.

С одной стороны, финансовая стабильность и востребованность профессии на рынке труда играют важную роль в современной жизни. Человек, выбравший перспективную специальность в сфере информационных технологий, инженерии или финансов, легче находит достойную работу и может обеспечить себе и своей семье комфортные условия. Именно поэтому родители часто советуют детям руководствоваться прежде всего практическими соображениями.

С другой стороны, работа занимает огромную часть нашей жизни, и заниматься нелюбимым делом исключительно ради денег психологически очень тяжело. Если у человека нет искреннего интереса к своей деятельности, он быстро испытывает эмоциональное выгорание. Напротив, увлечённый своим делом врач, учитель, архитектор или учёный постоянно совершенствует своё мастерство и в итоге достигает как профессионального признания, так и материального благополучия.

По моему мнению, эти два критерия не должны исключать друг друга. Оптимальный выбор профессии находится на пересечении личных способностей, живого интереса и реальных потребностей общества. Только тогда труд приносит человеку подлинное удовлетворение и успех.`,
        },
      ],
    },
  ],
};
