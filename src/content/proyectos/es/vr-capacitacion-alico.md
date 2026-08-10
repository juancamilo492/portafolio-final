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
![Página de la Guía Metodológica de Realidad Extendida titulada «¿CÓMO UTILIZARLAS?»: contiene instrucciones de uso seguro del visor Meta Quest 3s en planta, texto sobre la producción del video tutorial para encendido y configuración, y un contenedor de video con el fotograma de un colaborador usando el visor blanco.](../../../assets/proyectos/vr-capacitacion-alico/guia-metodologica-quest.png)

Página de la guía metodológica entregada a la organización, donde se detallan las instrucciones de uso seguro, configuración e inducción al visor Meta Quest 3s para los operarios.
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
![Diapositiva del proceso de ideación: a la izquierda, diez fotografías organizadas en grilla con notas adhesivas amarillas pegadas en paneles de vidrio durante el trabajo de campo; a la derecha, la tabla oficial «HERRAMIENTA SCAMPER» (código FO-DE-027) de Alico S.A.S BIC, detallando las siete transformaciones para llevar el curso de PC a realidad virtual.](../../../assets/proyectos/vr-capacitacion-alico/idear-scamper.png)

Formato oficial SCAMPER de la caja de herramientas de innovación de Alico junto a las fotografías de las notas de ideación en campo, detallando la adaptación de contenidos, subtítulos por ruido en planta y gamificación.
:::

**Prototipar.** Prototipo de media fidelidad en Unity: los personajes de
riesgos del curso original (riesgo locativo, carga física, riesgo mecánico)
viven ahora en un entorno inmersivo con video real de la planta, quiz
interactivo, un dashboard de seguimiento en Looker Studio y automatización
de datos con n8n.

:::figura{ancho ampliar}
![Diapositiva de la fase de prototipado: a la izquierda, las ilustraciones de los tres personajes de riesgo del curso (Fantasma Locatín para riesgo locativo, Postularín para carga física y Golfius para riesgo mecánico); a la derecha, una captura de pantalla del editor de Unity mostrando el entorno desértico virtual 3D y la estructura de archivos del proyecto.](../../../assets/proyectos/vr-capacitacion-alico/prototipado-unity.png)

Adaptación de los tres personajes de riesgo del curso original «Planeta SST» (izquierda) y la interfaz del editor de Unity con el entorno virtual desértico desarrollado para el visor (derecha).
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
![Captura de pantalla del dashboard en Looker Studio titulado «Capacitación MR»: muestra la tabla con las 9 evaluaciones individuales de colaboradores en riesgos locativo, mecánico y biomecánico, junto a las tarjetas de resumen que destacan 1.18 intentos promedio, 17.45 segundos de tiempo promedio, 9 evaluaciones completadas y 4.32 de calificación promedio.](../../../assets/proyectos/vr-capacitacion-alico/dashboard-looker-studio.png)

Dashboard interactivo en Looker Studio alimentado mediante automatizaciones con n8n, registrando el desempeño individual de los 9 colaboradores evaluados y la calificación promedio final de 4.32/5.
:::

:::video{youtube="EM_7Clp5BJc" titulo="Prototipo de capacitación en Realidad Virtual — Planeta SST"}
![Fotograma del usuario utilizando el visor Meta Quest 3s en la capacitación](../../../assets/proyectos/vr-capacitacion-alico/guia-metodologica-quest.png)

Demostración del prototipo inmersivo de Planeta SST en realidad virtual desarrollado en Unity para los visores Meta Quest 3s.
:::

## Lo que aprendí

Este proyecto me permitió poner en práctica, en un entorno organizacional con
retos reales, todo lo aprendido en la carrera: investigación de usuario,
prototipado, pensamiento disruptivo. Y me dio claridad sobre el tipo de proyectos
en los que quiero seguir creciendo: donde la investigación y la tecnología se
encuentran para cambiar cómo trabaja la gente.
