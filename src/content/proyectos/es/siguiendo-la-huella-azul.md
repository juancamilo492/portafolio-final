---
titulo: "Siguiendo la huella azul: un espacio interactivo para que los niños conozcan la fauna de su ciudad"
slug: "siguiendo-la-huella-azul"
cliente: "Proyecto académico — propuesta para el Parque de la Conservación, Medellín"
año: "2025"
rol: "Liderazgo del equipo, prototipo funcional (ESP32 y juego por gestos), render del espacio y definición de la experiencia"
categoria: ["Inmersivo", "Investigación", "UX/UI"]
herramientas: ["ESP32", "OpenCV", "Streamlit", "Python", "Blender"]
destacado: true
orden: 5
resumen: "Propuesta de instalación interactiva para niños sobre la fauna del Valle de Aburrá, validada con un prototipo funcional de botones físicos (ESP32) y un juego controlado por gestos con visión por computador."
imagen_portada: "../../../assets/proyectos/siguiendo-la-huella-azul-portada.png"
imagen_alt: "Portada del caso sobre una textura de papel arrugado color crema, salpicada de huellas de patas de animal en azul claro: el título «Siguiendo la huella azul» en letras redondeadas de color azul."
---

## El contexto

¿Cómo logras que un niño de Medellín se interese por el murciélago, el
barranquero, la zarigüeya o la rana de cristal, los animales con los que
comparte ciudad sin saberlo? Ese fue el reto de este proyecto académico en
equipo de 3: diseñar "Siguiendo la huella azul", una instalación interactiva
temporal propuesta para el Parque de la Conservación, dirigida a niños de 8
a 11 años y conectada con el concepto de Espacio Público Efectivo. Lideré
el equipo y me encargué del prototipo funcional completo, el render del
espacio y buena parte de la definición de la experiencia.

La propuesta completa define un espacio de 8.5 × 9.75 metros donde unas
huellas azules en el piso guían al niño hasta un monitor con botones
físicos para elegir un animal; la selección transforma la ambientación
completa (luz y sonido) y activa minijuegos en pantallas táctiles que le
permiten vivir lo que ese animal experimenta en la ciudad. El recorrido está
diseñado como un arco emocional en cinco etapas: de la curiosidad de la
entrada a la inspiración de la salida.

## La decisión de diseño clave

Una instalación así cuesta decenas de millones de pesos. Antes de proponer
esa inversión, había que responder la pregunta incómoda: ¿las interacciones
funcionan? La decisión fue **validar barato lo que sería caro construir**:
un prototipo funcional con un ESP32 simulando la botonera física y un
minijuego controlado por gestos de las manos, usando visión por computador
con OpenCV sobre Streamlit. Con eso se podía poner a personas reales frente
a las dos interacciones centrales del espacio sin construir el espacio.

## La validación

Hicimos tree testing en dos sesiones con 10 participantes en el Medialab de
EAFIT, con guion estructurado, consentimiento informado y registro en video.
Una limitación que reportamos con transparencia: por logística de horarios,
los participantes fueron universitarios y no niños. Eso alcanzaba para
evaluar la arquitectura de información, pero no para dar por validada la
experiencia infantil.

Los resultados dieron un contraste revelador:

- **Botones físicos: 80% de éxito.** La navegación por la información de los
  animales fluyó, con ajustes menores (íconos en los botones, reubicar el
  botón de retorno).
- **Gestos: 50% de éxito.** La mitad de los participantes no logró
  controlar el juego. Los gestos no eran intuitivos y faltaban guías
  visuales permanentes: dos errores de severidad seria que documentamos
  con sus rediseños recomendados.

## El resultado

El proyecto cerró con una propuesta lista para implementarse: resumen
ejecutivo, ficha de montaje con planos, lista de equipos, cronograma de dos
semanas y presupuesto estimado. Y con un prototipo que ya había enseñado
qué funcionaba y qué no. La interacción más "innovadora" (los gestos)
resultó ser la más frágil, y la más simple (botones físicos) la más sólida:
exactamente el tipo de hallazgo que justifica prototipar antes de construir.

## Lo que aprendí

Este proyecto me dejó una lección agridulce: nunca logramos evaluar con
niños, nuestros usuarios reales. Validar con universitarios nos dio
hallazgos valiosos sobre la arquitectura y las interacciones, pero la
pregunta más importante, si un niño de 10 años disfruta esto, quedó
abierta. Aprendí que el acceso a los usuarios correctos se gestiona desde
el día uno del proyecto, con la misma prioridad que el prototipo; si se
deja para el final, terminas validando con quien puedes y no con quien
debes.

Y los datos me confirmaron algo que ahora aplico en todo lo que diseño: la
interacción más simple le ganó por paliza a la más novedosa. La innovación
no está en el gesto sofisticado, sino en que funcione.
