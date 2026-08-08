---
titulo: "Industrial : menu numérique et système de gestion pour un bar"
slug: "industrial"
cliente: "Bar Industrial"
año: "2026"
rol: "Design d’interaction et conception du système, de la recherche à l’exploitation quotidienne"
categoria: ["Producto digital", "UX/UI"]
herramientas: ["Next.js", "Supabase", "Développement assisté par IA"]
destacado: true
orden: 2
resumen: "Système de menu par QR code et panneau de gestion pour un bar réel : les clients consultent, le personnel de salle prend les commandes, et les gérantes voient les indicateurs de l’activité en temps réel."
imagen_portada: "../../../assets/proyectos/industrial-portada.png"
imagen_alt: "Logo du bar Industrial sur fond ivoire : le mot « INDUSTRIAL » en capitales noires condensées, dont le D allongé amorce aussi le mot « DRINK’S » en dessous, avec des bandes horizontales jaunes, orange et rouges qui traversent l’image."
---

## Le contexte

Industrial est un bar de Medellín dont les propriétaires voulaient numériser
l’exploitation : un menu que les clients puissent consulter depuis leur table,
une façon rapide de prendre les commandes et de la visibilité sur les ventes de
l’établissement. Le projet est né d’une recommandation directe et s’est défini
lors de réunions avec les gérantes du bar, qui ont exposé leurs besoins réels
d’exploitation.

## La décision de conception clé

La demande la plus intéressante du projet : **les clients ne doivent pas
pouvoir commander depuis le QR code**. Dans un bar, un client qui a bu peut
commander par accident (ou commander de trop), ce qui provoque des litiges au
moment de payer l’addition.

La solution a été de concevoir un seul système à deux visages :

- **Le client** scanne le QR code de sa table et consulte le menu, les prix,
  les promotions du jour et l’état de son addition. Rien de plus.
- **Le personnel de salle** utilise ce même parcours pour entrer dans le
  panneau d’administration, sélectionner la table et enregistrer la commande,
  en la confirmant en personne.

La commande reste associée à la bonne table, le client garde le contrôle de ce
qu’il consomme, et le bar élimine les commandes accidentelles. Concevoir pour
le contexte d’usage réel, un bar la nuit et non une application idéale, a
défini tout le produit.

## Le système

**Pour le client (via le QR code) :**
- Menu numérique avec plus de 170 produits, catégories et moteur de recherche
- Promotions actives du jour (2 pour 1, remises, tombolas hebdomadaires)
- Prochains événements du bar (matchs, dates spéciales) sur la page d’accueil
- Consultation de l’addition de la table avec le total cumulé
- Accès direct pour laisser un avis sur Google

**Pour l’équipe du bar :**
- Gestion visuelle de 26 tables avec leur état en temps réel
- Prise de commandes par table depuis le panneau d’administration
- Commandes synchronisées en temps réel, avec une notification sonore à chaque
  nouvelle commande
- Gestion des produits (créer, modifier, catégoriser, photos et variantes)
- Création et administration des promotions et des événements
- Rapports : recettes, commandes livrées, ticket moyen, ventes par jour et par
  heure
- Audit complet des commandes (y compris celles annulées) et export vers Excel

## Le processus

La première version suivait le schéma standard des menus par QR code : le
client composait un panier et envoyait sa commande depuis la table. En
confrontant ce parcours à la réalité du bar lors des réunions avec les
gérantes, le modèle s’est inversé complètement : le client consulte, le
personnel de salle commande. La meilleure décision du projet ne figurait pas
dans le plan initial : elle est sortie des itérations avec les personnes qui
vivent l’exploitation au quotidien.

Le projet a avancé par cycles courts : des avancées partagées par
WhatsApp et des réunions sur place au bar, d’où sortaient des listes concrètes
d’ajustements : voir le menu avec les prix depuis le QR code, modifier une
commande déjà envoyée, relier les événements à WhatsApp pour réserver.

L’itération s’est poursuivie après le lancement : le système évolue avec
l’usage réel. Les gérantes signalent leurs besoins par WhatsApp, comme des
photos de produits qui se retrouvaient coupées, le total de l’addition sur le
QR code, un historique pour vérifier par rapport à la facturation ou l’export
des données vers Excel. Chacun de ces ajustements arrive en production le jour
même ou le lendemain. Ce cycle court de retours est possible parce que le
système a été conçu pour être modifié sans friction.

## Le résultat

Le système est en production et utilisé tous les jours. Les gérantes ont
vérifié que les rapports coïncident avec la facturation et l’inventaire du bar,
ce qui leur a permis de passer d’une revue des commandes une par une à une vue
du résumé de la journée en quelques secondes.

Le reste du résultat se voit dans l’exploitation du soir : les 26 tables et les
plus de 170 produits se gèrent depuis un seul panneau, les commandes
accidentelles ont disparu parce que le flux ne les permet plus, et chaque
ajustement demandé par le bar arrive en production le jour même ou le
lendemain. Le système a cessé d’être un livrable pour devenir une partie du
fonctionnement de l’entreprise.

## Ce que j’ai appris

Ce projet m’a confirmé que le design centré sur l’utilisateur peut améliorer
radicalement le fonctionnement d’une entreprise, quelle que soit sa taille. Et
il m’a laissé une conviction simple : un système que l’on comprend est un
système dont on profite, autant pour le client qui scanne le QR code que pour
le personnel de salle qui l’utilise toute la nuit.
