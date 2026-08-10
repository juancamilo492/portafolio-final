---
titulo: "Emballages générés par IA : du formulaire au rendu dans votre boîte mail"
slug: "empaques-ia-alico"
cliente: "Alico S.A.S BIC"
año: "2025"
rol: "Design de l’expérience du formulaire et automatisation par IA"
categoria: ["IA y automatización", "UX/UI"]
herramientas: ["n8n", "Leonardo AI"]
destacado: true
orden: 4
resumen: "Expérience interactive pour Cafés de Colombia Expo 2025 : les producteurs de café décrivent la vision de leur marque dans un formulaire et reçoivent dans leur boîte mail des emballages générés par IA qui la reflètent."
imagen_portada: "../../../assets/proyectos/empaques-ia-alico-portada-fr.png"
imagen_alt: "Couverture du cas sur un fond de plan technique bleu clair, fait de grilles, de repères pointillés et de cotes : le titre « PLATEFORME IA D’EMBALLAGES » en bleu foncé et, en bas à droite, le logo alico en jaune."
---

## Le contexte

Alico est une entreprise d’emballages souples de Medellín. Pour sa présence à
Cafés de Colombia Expo 2025 (Bogotá), l’équipe d’innovation a voulu offrir aux
visiteurs, des propriétaires de marques de café, quelque chose de plus
mémorable qu’une brochure : la possibilité de *voir* leur propre marque sur un
emballage, générée par IA à partir de leur vision.

Le projet a été mené conjointement avec le service informatique d’Alico pendant
mon stage en innovation.

## La décision de conception clé

Le défi n’était pas technique mais un défi de traduction : comment convertir la
vision floue qu’un producteur de café a de sa marque en instructions qu’un
modèle d’IA puisse bien exécuter ?

La réponse a été de concevoir le formulaire comme un entretien de brief
créatif : au lieu de demander « décrivez votre emballage », le parcours en 19
étapes demande le nom de la marque, ses références culturelles (la culture
paysanne ? les marques internationales haut de gamme ?), son facteur
différenciant, et invite à évaluer des éléments graphiques selon les principes
de la Gestalt : proximité, similarité, clôture et continuité. Chaque réponse
devient un paramètre concret pour la génération.

:::figura{ancho ampliar}
![Capture d’écran de l’interface du formulaire initial pour le salon Cafés de Colombia Expo 2025 : sur une photo de fond avec des grains de café et une tasse, une carte centrale avec l’en-tête « Tómate un cafecito y transformemos juntos tu empaque », la phrase « Queremos conocer tu visión para reflejar la esencia de tu café » et le bouton doré « ¡CREEMOS EL EMPAQUE PERFECTO! ».](../../../assets/proyectos/empaques-ia-alico/formulario-expo-cafe.png)

Interface du formulaire interactif de brief créatif conçu pour Cafés de Colombia Expo 2025, où les producteurs de café définissaient la vision de leur marque en 19 étapes.
:::

## Ce que j’ai conçu

- L’expérience visuelle du formulaire : un parcours pas à pas avec l’identité
  d’Alico et la chaleur du monde du café, conçu pour être complété dans le
  contexte d’un salon
- Un récapitulatif modifiable à la fin, pour que la personne puisse revoir ses
  réponses avant d’envoyer
- Le flux d’automatisation sous n8n qui reçoit chaque réponse, l’envoie à l’API
  de Leonardo (en combinant différents modèles de génération d’images) et livre
  les emballages générés directement dans la boîte mail du participant

## Le processus

Ce fut un travail conjoint avec le service informatique d’Alico : le formulaire
a été construit sur mesure avec l’identité du salon, et n8n a orchestré la
connexion entre les réponses, les modèles de génération et l’envoi par e-mail.
Ma contribution s’est concentrée sur le fait que le parcours ressemble à une
conversation de marque et non à un sondage, et sur le fait que
l’automatisation tourne toute seule : je n’étais pas à Bogotá, et le système a
servi les visiteurs du salon sans moi.

## Le résultat

L’expérience du salon a été le point de départ de quelque chose de plus grand :
le concept a évolué vers une plateforme où les clients d’Alico chargent leur
logo et visualisent des rendus réalistes de leur marque sur différents types
d’emballage. Ce saut a accéléré la prise de décision en avant-vente et réduit
la dépendance aux rendus manuels.

:::figura{ancho ampliar}
![Capture d’écran de la plateforme web évoluée intitulée « Formulario IA » : sur un fond en dégradé bleu et doré, elle présente le titre « Transforma tu empaque con Inteligencia Artificial », la description pour générer des images réalistes de Doy Pack, Flow Pack et Thermoformage, et les boutons « Comenzar gratis » et « Ya tengo cuenta ».](../../../assets/proyectos/empaques-ia-alico/plataforma-ia-empaques.png)

Interface de la plateforme web évoluée pour l’avant-vente chez Alico S.A.S BIC, où les clients chargent leur marque et sélectionnent des formats d’emballage pour générer des rendus par IA.
:::

:::galeria
![Rendu généré par IA d’un sachet Doypack avec bouchon supérieur et motif floral rouge sur une étagère de supermarché, accompagné en bas du logo du personnage, du motif et du sachet de base vides.](../../../assets/proyectos/empaques-ia-alico/render-doypack-estante.jpg)

![Rendu généré par IA d’un emballage thermoformé transparent avec des raisins frais et la marque appliquée sur le couvercle, accompagné en bas du récipient en plastique de base et du logo du client.](../../../assets/proyectos/empaques-ia-alico/render-termoformado-uvas.jpg)

![Rendu généré par IA d’une boîte thermoformée de pâtisserie contenant quatre cupcakes dans un décor de boulangerie, accompagnée en bas du récipient en plastique et du logo d’oiseau multicolore.](../../../assets/proyectos/empaques-ia-alico/render-termoformado-cupcakes.jpg)

Exemples de rendus réalistes générés automatiquement par la plateforme en appliquant la marque du client, le motif et le type d’emballage sélectionné (Doypack à bouchon et récipients thermoformés pour produits alimentaires).
:::

## Ce que j’ai appris

L’intelligence artificielle a ouvert de nouvelles façons pour les entreprises
d’interagir avec leurs clients. Ce projet me l’a démontré concrètement : la
même technologie a fonctionné comme une expérience qui surprend un producteur
de café dans un salon et comme un outil d’avant-vente qui évite des rendus
manuels. La valeur n’est pas dans le modèle d’IA, mais dans l’expérience que
l’on conçoit autour de lui.
