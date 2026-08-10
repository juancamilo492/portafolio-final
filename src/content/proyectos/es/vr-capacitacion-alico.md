---
titulo: "Planeta SST en VR: capacitación sin salir del puesto de trabajo"
slug: "vr-capacitacion-alico"
cliente: "Alico S.A.S BIC"
año: "2025"
rol: "Investigación, diseño y prototipado de la experiencia en realidad virtual"
categoria: ["Inmersivo", "Investigación"]
herramientas: ["Unity", "Meta Quest 3s", "n8n", "Looker Studio"]
destacado: true
orden: 3
resumen: "Proyecto de Design Thinking de punta a punta: de entrevistas con los equipos de formación a un prototipo de capacitación en realidad virtual que los operarios pueden usar sin abandonar su puesto de trabajo."
imagen_portada: "../../../assets/proyectos/vr-capacitacion-alico-portada.png"
imagen_alt: "Portada del caso sobre un fondo de plano técnico en azul claro, con retícula, guías punteadas y cotas: el título «PROYECTO DE PRÁCTICAS» en azul oscuro y, abajo a la derecha, el logotipo de alico en amarillo."
---

## El contexto

En Alico, los operarios son el 65% del personal, y su capacitación se hacía
con charlas y talleres presenciales: métodos que interrumpen la producción,
exigen desplazarse fuera del área de trabajo y dependen del criterio de cada
instructor, con unas 10 horas anuales por operario. El área de innovación se
preguntó si la realidad extendida podía replantear ese modelo, y ese fue mi
proyecto de práctica: responder la pregunta con método, no con intuición.

## La decisión de diseño clave

Invertir el desplazamiento: en lugar de llevar al operario a la capacitación,
llevar la capacitación al puesto de trabajo con un visor Meta Quest 3s. Y en
lugar de crear contenido desde cero, adaptar un curso que ya existía y
funcionaba: "Planeta SST", de la plataforma de aprendizaje de la empresa. La
transformación fue pasar de un aprendizaje pasivo (ver videos en un PC) a uno
activo e inmersivo.

:::figura{ancho ampliar}
![Pantallazo de la Guía Metodológica de Realidad Extendida: sección «¿CÓMO UTILIZARLAS?» que explica la producción del video tutorial para encender, configurar y usar los visores Meta Quest 3s en entorno de trabajo, con fotograma del usuario vistiendo el visor.](../../../assets/proyectos/vr-capacitacion-alico/guia-metodologica-quest.png)

Página de la guía metodológica entregada a la organización, donde se detallan las instrucciones de uso seguro y configuración de las gafas Meta Quest 3s en planta.
:::

## El proceso

Seguí el ciclo completo de Design Thinking, usando la caja de herramientas
del área de innovación:

**Empatizar.** Entrevistas semiestructuradas con los equipos de Seguridad y
Salud en el Trabajo, Aprendizaje y Desarrollo, y TPM.

**Definir.** Los hallazgos se sintetizaron en focos de resonancia: llevar la
formación al puesto para no frenar la producción, estandarizar los contenidos
y mantener las sesiones breves y flexibles. La matriz de riesgos de la
empresa mostró que 374 de los 569 riesgos identificados pertenecían a las
categorías elegidas para el prototipo: el alcance no fue arbitrario.

**Idear.** Con la técnica SCAMPER se definieron las transformaciones del
curso: del PC al visor, del aprendizaje pasivo al activo, quiz unificado con
dinámica de concurso, subtítulos por la dificultad de escucha en planta.

:::figura{ancho ampliar}
![Diapositiva de ideación: a la izquierda, fotografías de notas adhesivas amarillas pegadas en muros de vidrio durante el trabajo de campo; a la derecha, la plantilla oficial «HERRAMIENTA SCAMPER» de la caja de herramientas de innovación de Alico S.A.S BIC.](../../../assets/proyectos/vr-capacitacion-alico/idear-scamper.png)

Formato SCAMPER de la caja de herramientas de innovación de Alico junto a las notas de ideación en campo, utilizadas para transformar el curso tradicional de PC a realidad virtual.
:::

**Prototipar.** Prototipo de media fidelidad en Unity: los personajes de
riesgos del curso original (riesgo locativo, carga física, riesgo mecánico)
viven ahora en un entorno inmersivo con video real de la planta, quiz
interactivo, un dashboard de seguimiento en Looker Studio y automatización
de datos con n8n.

:::figura{ancho ampliar}
![Diapositiva de prototipado: a la izquierda, la ilustración de los tres personajes de riesgo (Fantasma Locatín, Postularín y Golfius); a la derecha, una captura de pantalla del editor de Unity mostrando el entorno desértico virtual del proyecto.](../../../assets/proyectos/vr-capacitacion-alico/prototipado-unity.png)

Personajes de riesgo del curso original adaptados al entorno inmersivo (izquierda) y la interfaz de desarrollo en Unity del escenario virtual (derecha).
:::

**Validar.** Recorrido del prototipo con 9 colaboradores de la empresa,
evaluado con la misma encuesta de satisfacción de la plataforma de
aprendizaje corporativa.

## El resultado

El minicurso se completa en 5 minutos en promedio. La calificación promedio
de las evaluaciones fue **4.32** y la satisfacción general, **4.9/5**. Todos los
participantes estuvieron totalmente de acuerdo en que el curso fue práctico
y entendible, y 8 de cada 9 en que la navegación fue simple. El proyecto
cerró con la entrega de la guía metodológica: un documento que orienta cómo
implementar realidad extendida en las capacitaciones de la organización, más
allá de este prototipo.

:::figura{ancho ampliar}
![Captura de pantalla del dashboard de Looker Studio titulado «Capacitación MR», con la tabla de calificaciones de los 9 colaboradores evaluados y los bloques de resumen con la calificación promedio de 4.32 y tiempo promedio de 17.45 segundos.](../../../assets/proyectos/vr-capacitacion-alico/dashboard-looker-studio.png)

Dashboard en Looker Studio generado a partir de las automatizaciones con n8n, mostrando las calificaciones de los participantes y el promedio de 4.32 alcanzado en las pruebas.
:::

:::video{youtube="EM_7Clp5BJc" titulo="Prototipo de capacitación en Realidad Virtual — Planeta SST"}
![Fotograma del usuario utilizando el visor Meta Quest 3s en la capacitación](../../../assets/proyectos/vr-capacitacion-alico/guia-metodologica-quest.png)

Demostración del prototipo inmersivo de Planeta SST en realidad virtual desarrollado para los visores Meta Quest 3s.
:::

## Lo que aprendí

Este proyecto me permitió poner en práctica, en un entorno organizacional con
retos reales, todo lo aprendido en la carrera: investigación de usuario,
prototipado, pensamiento disruptivo. Y me dio claridad sobre el tipo de proyectos
en los que quiero seguir creciendo: donde la investigación y la tecnología se
encuentran para cambiar cómo trabaja la gente.
