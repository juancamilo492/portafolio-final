---
titulo: "Planeta SST en VR : se former sans quitter son poste de travail"
slug: "vr-capacitacion-alico"
cliente: "Alico S.A.S BIC"
año: "2025"
rol: "Recherche, conception et prototypage de l’expérience en réalité virtuelle"
categoria: ["Inmersivo", "Investigación"]
herramientas: ["Unity", "Meta Quest 3s", "n8n", "Looker Studio"]
destacado: true
orden: 3
resumen: "Projet de Design Thinking de bout en bout : des entretiens avec les équipes de formation à un prototype de formation en réalité virtuelle que les opérateurs peuvent utiliser sans quitter leur poste de travail."
imagen_portada: "../../../assets/proyectos/vr-capacitacion-alico-portada-fr.png"
imagen_alt: "Couverture du cas sur un fond de plan technique bleu clair, fait de grilles, de repères pointillés et de cotes : le titre « PROJET DE STAGE PROFESSIONNEL » en bleu foncé et, en bas à droite, le logo alico en jaune."
---

## Le contexte

Chez Alico, les opérateurs représentent 65 % du personnel, et leur formation se
faisait par des causeries et des ateliers en présentiel : des méthodes qui
interrompent la production, obligent à se déplacer hors de la zone de travail
et dépendent du jugement de chaque formateur, pour environ 10 heures par an et
par opérateur. L’équipe d’innovation s’est demandé si la réalité étendue
pouvait repenser ce modèle, et ce fut mon projet de stage : répondre à la
question avec une méthode, pas avec l’intuition.

## La décision de conception clé

Inverser le déplacement : au lieu d’amener l’opérateur à la formation, amener
la formation au poste de travail avec un casque Meta Quest 3s. Et au lieu de
créer un contenu de zéro, adapter un cours qui existait déjà et qui
fonctionnait : « Planeta SST », de la plateforme d’apprentissage de
l’entreprise. La transformation a consisté à passer d’un apprentissage passif
(regarder des vidéos sur un PC) à un apprentissage actif et immersif.

:::figura{ancho ampliar}
![Page du Guide Méthodologique de Réalité Étendue intitulée « ¿CÓMO UTILIZARLAS? » : contient les instructions d’utilisation sécurisée du casque Meta Quest 3s en usine, un texte expliquant la production de la vidéo tutorielle d’allumage et de configuration, et un cadre vidéo avec l’image d’un collaborateur portant le casque blanc.](../../../assets/proyectos/vr-capacitacion-alico/guia-metodologica-quest.png)

Page du guide méthodologique remis à l’organisation, détaillant les instructions d’utilisation sécurisée, de configuration et d’initiation au casque Meta Quest 3s pour les opérateurs.
:::

## Le processus

J’ai suivi le cycle complet du Design Thinking, en utilisant la boîte à outils
de l’équipe d’innovation :

**Empathiser.** Entretiens semi-directifs avec les équipes de Santé et Sécurité
au Travail, d’Apprentissage et Développement, et de TPM.

**Définir.** Les constats ont été synthétisés en axes de résonance : amener la
formation au poste pour ne pas freiner la production, standardiser les contenus
et garder des sessions courtes et flexibles. La matrice des risques de
l’entreprise a montré que 374 des 569 risques identifiés appartenaient aux
catégories retenues pour le prototype : le périmètre n’a pas été arbitraire.

**Imaginer.** Avec la technique SCAMPER, les transformations du cours ont été
définies : du PC au casque, de l’apprentissage passif à l’apprentissage actif,
un quiz unifié avec une dynamique de jeu télévisé, des sous-titres à cause de
la difficulté d’écoute en usine.

:::figura{ancho ampliar}
![Diapositive du processus d’idéation : à gauche, dix photographies organisées en grille montrant des notes adhésives jaunes collées sur des cloisons en verre pendant le travail de terrain ; à droite, le tableau officiel « HERRAMIENTA SCAMPER » (formulaire FO-DE-027) d’Alico S.A.S BIC, détaillant les sept transformations pour passer du PC à la réalité virtuelle.](../../../assets/proyectos/vr-capacitacion-alico/idear-scamper.png)

Modèle officiel SCAMPER de la boîte à outils d’innovation d’Alico aux côtés des photographies d’idéation sur le terrain, détaillant l’adaptation des contenus, les sous-titres en raison du bruit en usine et la ludification.
:::

**Prototyper.** Prototype de fidélité moyenne sous Unity : les personnages de
risques du cours d’origine (risque lié aux locaux, charge physique, risque
mécanique) vivent désormais dans un environnement immersif avec de vraies
images de l’usine, un quiz interactif, un tableau de bord de suivi dans Looker
Studio et l’automatisation des données avec n8n.

:::figura{ancho ampliar}
![Diapositive de la phase de prototypage : à gauche, les illustrations des trois personnages de risques du cours (Fantasma Locatín pour le risque lié aux locaux, Postularín pour la charge physique et Golfius pour le risque mécanique) ; à droite, une capture d’écran de l’éditeur Unity montrant l’environnement virtuel désertique en 3D et la structure des fichiers du projet.](../../../assets/proyectos/vr-capacitacion-alico/prototipado-unity.png)

Adaptation des trois personnages de risques du cours d’origine « Planeta SST » (à gauche) et l’interface de l’éditeur Unity avec la scène virtuelle désertique développée pour le casque (à droite).
:::

**Valider.** Parcours du prototype avec 9 collaborateurs de l’entreprise,
évalué avec la même enquête de satisfaction que la plateforme d’apprentissage
de l’entreprise.

## Le résultat

Le mini-cours se termine en 5 minutes en moyenne. La note moyenne aux
évaluations a été de **4,32** et la satisfaction générale, de **4,9/5**. Tous
les participants étaient tout à fait d’accord sur le fait que le cours était
pratique et compréhensible, et 8 sur 9 sur le fait que la navigation était
simple. Le projet s’est clos par la remise du guide méthodologique : un
document qui oriente la mise en œuvre de la réalité étendue dans les formations
de l’organisation, au-delà de ce prototype.

:::figura{ancho ampliar}
![Capture d’écran du tableau de bord Looker Studio intitulé « Capacitación MR » : montre le tableau de 9 évaluations individuelles de collaborateurs portant sur les risques liés aux locaux, mécaniques et biomécaniques, aux côtés de cartes de synthèse indiquant 1,18 essai en moyenne, 17,45 secondes de temps moyen, 9 évaluations terminées et une note moyenne de 4,32.](../../../assets/proyectos/vr-capacitacion-alico/dashboard-looker-studio.png)

Tableau de bord interactif dans Looker Studio alimenté par des automatisations n8n, enregistrant les performances individuelles des 9 collaborateurs évalués et la note moyenne finale de 4,32/5.
:::

:::video{youtube="EM_7Clp5BJc" titulo="Prototype de formation en Réalité Virtuelle — Planeta SST"}
![Utilisateur portant le casque Meta Quest 3s pendant la formation](../../../assets/proyectos/vr-capacitacion-alico/guia-metodologica-quest.png)

Démonstration du prototype immersif de Planeta SST en réalité virtuelle développé sous Unity pour les casques Meta Quest 3s.
:::

## Ce que j’ai appris

Ce projet m’a permis de mettre en pratique, dans un cadre organisationnel avec
de vrais défis, tout ce que j’ai appris pendant mes études : recherche
utilisateur, prototypage, pensée disruptive. Et il m’a donné de la clarté sur le type
de projets dans lesquels je veux continuer à grandir : là où la recherche et la
technologie se rencontrent pour changer la façon dont les gens travaillent.
