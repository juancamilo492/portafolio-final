---
titulo: "Sur la piste bleue : un espace interactif pour que les enfants découvrent la faune de leur ville"
slug: "siguiendo-la-huella-azul"
cliente: "Projet académique — proposition pour le Parque de la Conservación, Medellín"
año: "2025"
rol: "Direction de l’équipe, prototype fonctionnel (ESP32 et jeu par gestes), rendu de l’espace et définition de l’expérience"
categoria: ["Inmersivo", "Investigación", "UX/UI"]
herramientas: ["ESP32", "OpenCV", "Streamlit", "Python", "Blender"]
destacado: true
orden: 5
resumen: "Proposition d’installation interactive pour enfants sur la faune de la vallée d’Aburrá, validée avec un prototype fonctionnel de boutons physiques (ESP32) et un jeu contrôlé par les gestes grâce à la vision par ordinateur."
imagen_portada: "../../../assets/proyectos/siguiendo-la-huella-azul-portada-fr.png"
imagen_alt: "Couverture du cas sur une texture de papier froissé couleur crème, parsemée d’empreintes de pattes d’animaux en bleu clair : le titre « Suivons la piste bleue » en lettres arrondies bleues."
---

## Le contexte

Comment faire pour qu’un enfant de Medellín s’intéresse à la chauve-souris, au
motmot, à l’opossum ou à la grenouille de verre, les animaux avec lesquels il
partage sa ville sans le savoir ? Tel était le défi de ce projet académique
mené en équipe de 3 : concevoir « Sur la piste bleue », une installation
interactive temporaire proposée pour le Parque de la Conservación, destinée aux
enfants de 8 à 11 ans et reliée au concept d’Espace public effectif. J’ai
dirigé l’équipe et je me suis chargé du prototype fonctionnel complet, du rendu
de l’espace et d’une grande partie de la définition de l’expérience.

La proposition complète définit un espace de 8,5 × 9,75 mètres où des empreintes
bleues au sol guident l’enfant jusqu’à un écran muni de boutons physiques pour
choisir un animal ; la sélection transforme toute l’ambiance (lumière et son) et
active des mini-jeux sur des écrans tactiles qui lui permettent de vivre ce que
cet animal éprouve dans la ville. Le parcours est conçu comme un arc émotionnel
en cinq étapes : de la curiosité de l’entrée à l’inspiration de la sortie.

## La décision de conception clé

Une installation de ce type coûte des dizaines de millions de pesos. Avant de
proposer cet investissement, il fallait répondre à la question inconfortable :
est-ce que les interactions fonctionnent ? Nous avons structuré la proposition
spatiale dans une affiche de conception globale définissant les dimensions,
l’ambiance et l’architecture du module.

:::figura{ancho ampliar}
![Affiche de conception sur texture papier froissé crème : vues en plan et coupes latérales du pavillon de 8,5 par 9,75 mètres, illustrations de la chauve-souris, de l’opossum, du motmot et de la grenouille de verre, et icônes de l’expérience.](../../../assets/proyectos/siguiendo-la-huella-azul/one-page-design.png)

Synthèse de la conception spatiale et architecturale de l’installation « Sur la piste bleue », montrant les coupes du pavillon, la disposition des écrans et les piliers du projet.
:::

:::figura{ancho ampliar}
![Schéma en quatre quadrants sur papier crème montrant la disposition du pavillon sous différentes ambiances lumineuses : vert pour le motmot, bleu pour la chauve-souris, vert foncé pour l’opossum et vert clair pour la grenouille de verre.](../../../assets/proyectos/siguiendo-la-huella-azul/variaciones-espacio.png)

Variations d’ambiance lumineuse de l’espace selon l’animal sélectionné : chaque choix modifie les réflecteurs et l’atmosphère de la salle.
:::

La décision a été de **valider à bas coût ce qui serait cher à construire** : un
prototype fonctionnel avec un ESP32 simulant le pupitre de boutons physiques y
un mini-jeu contrôlé par les gestes des mains, en utilisant la vision par
ordinateur avec OpenCV sur Streamlit. Cela permettait de placer de vraies
personnes face aux deux interactions centrales de l’espace sans construire
l’espace.

## La validation

Pour cartographier le parcours utilisateur étape par étape, nous avons conçu un
journey map en cinq étapes qui s'étend du premier contact dans l'espace public
jusqu'à la sortie du pavillon.

:::figura{ancho ampliar}
![Matrice horizontale du Customer Journey Map divisée en cinq colonnes colorées selon les étapes : Découverte en vert, Curiosité en bleu, Amusement en orange, Création en violet et Sortie en rouge.](../../../assets/proyectos/siguiendo-la-huella-azul/journey-map.png)

Carte du parcours utilisateur (*Customer Journey Map*) détaillant les moments, points de contact et la courbe émotionnelle de l’enfant durant la visite.
:::

Nous avons fait du tree testing en deux sessions avec 10 participants au
Medialab d’EAFIT, avec un script structuré, un consentement éclairé et un
enregistrement vidéo. Une limite que nous avons rapportée en toute
transparence : pour des raisons d’organisation des horaires, les participants
étaient des étudiants universitaires et non des enfants. Cela suffisait pour
évaluer l’architecture de l’information, mais pas pour considérer
l’expérience enfantine comme validée.

:::figura{ancho ampliar}
![Grille de neuf photographies documentant les tests du prototype au Medialab d'EAFIT : participants testant les gestes devant l'ordinateur et réunis autour d'une table de travail avec les visages masqués pour la confidentialité.](../../../assets/proyectos/siguiendo-la-huella-azul/pruebas.png)

Registre photographique des sessions de validation au Medialab d'EAFIT : évaluation du mini-jeu par gestes et espaces de retour d'expérience avec les participants.
:::

Les résultats ont donné un contraste révélateur :

- **Boutons physiques : 80 % de réussite.** La navigation dans les informations
  sur les animaux a été fluide, avec des ajustements mineurs (des icônes sur
  les boutons, déplacer le bouton de retour).
- **Gestes : 50 % de réussite.** La moitié des participants n’a pas réussi à
  contrôler le jeu. Les gestes n’étaient pas intuitifs et il manquait des
  repères visuels permanents : deux erreurs de sévérité importante que nous
  avons documentées avec les redesigns recommandés.

## Le résultat

Le projet s’est clos avec une proposition prête à être mise en œuvre : résumé
exécutif, fiche de montage avec les plans, liste du matériel, calendrier de
deux semaines et budget estimé.

:::figura{ancho ampliar}
![Plan technique avec mesures et nomenclature des équipements du pavillon interactif : inclut légende des composants avec bornes multitouch, projecteurs LED, enceintes, casques VR et Arduino, vue en plan cotée de 8,5 par 9,75 mètres et quatre vues en élévation.](../../../assets/proyectos/siguiendo-la-huella-azul/planos-medidas.png)

Fiche technique de montage avec plans cotés du pavillon et la nomenclature du matériel requis (écrans multitouch, rubans LED, enceintes et casques VR).
:::

De plus, nous avons modélisé l’expérience spatiale dans un rendu 3D animé qui
permet de visualiser comment l’éclairage et le contenu de l’écran répondent aux
interactions de l’enfant.

:::video{youtube="GjFoIYIuFTI" titulo="Rendu 3D de l’espace interactif « Sur la piste bleue »"}
![Image du rendu 3D dans Blender montrant l’intérieur de la salle interactive sous une lumière verte, avec des modèles 3D d’un adulte et d’un enfant devant l’écran vertical affichant le motmot.](../../../assets/proyectos/siguiendo-la-huella-azul/render-miniatura.jpg)

Parcours en 3D du pavillon interactif illustrant l’ambiance immersive, les jeux d’ombres et la réponse lumineuse en fonction de l’animal sélectionné.
:::

Et avec un prototype qui avait déjà montré ce qui fonctionnait et ce qui ne
fonctionnait pas. L’interaction la plus « innovante » (les gestes) s’est
révélée la plus fragile, et la plus simple (les boutons physiques) la plus
solide : exactement le type de constat qui justifie de prototyper avant de
construire.

## Ce que j’ai appris

Ce projet m’a laissé une leçon douce-amère : nous n’avons jamais réussi à
évaluer avec des enfants, nos utilisateurs réels. Valider avec des étudiants
nous a donné des constats précieux sur l’architecture et les interactions, mais
la question la plus importante, celle de savoir si un enfant de 10 ans y prend
du plaisir, est restée ouverte. J’ai appris que l’accès aux bons utilisateurs se
prépare dès le premier jour du projet, avec la même priorité que le prototype ;
si on le laisse pour la fin, on finit par valider avec qui on peut et non avec
qui on doit.

Et les données m’ont confirmé quelque chose que j’applique maintenant à tout ce
que je conçois : l’interaction la plus simple a battu à plate couture la plus
novatrice. L’innovation n’est pas dans le geste sophistiqué, mais dans le fait
qu’il fonctionne.
