---
titulo: "Empaques con IA: del formulario al render en tu correo"
slug: "empaques-ia-alico"
cliente: "Alico S.A.S BIC"
año: "2025"
rol: "Diseño de la experiencia del formulario y automatización con IA"
categoria: ["IA y automatización", "UX/UI"]
herramientas: ["n8n", "Leonardo AI"]
destacado: true
orden: 4
resumen: "Experiencia interactiva para Cafés de Colombia Expo 2025: los caficultores describen la visión de su marca en un formulario y reciben en su correo empaques generados con IA que reflejan esa visión."
imagen_portada: "../../../assets/proyectos/empaques-ia-alico-portada.png"
imagen_alt: "Portada del caso sobre un fondo de plano técnico en azul claro, con retícula, guías punteadas y cotas: el título «PLATAFORMA IA PARA EMPAQUES» en azul oscuro y, abajo a la derecha, el logotipo de alico en amarillo."
---

## El contexto

Alico es una empresa de empaques flexibles de Medellín. Para su presencia en
Cafés de Colombia Expo 2025 (Bogotá), el área de innovación quiso ofrecer a
los asistentes, dueños de marcas de café, algo más memorable que un folleto:
la posibilidad de *ver* su propia marca en un empaque, generada con IA a
partir de su visión.

El proyecto se desarrolló en conjunto con el área de TI de Alico durante mi
práctica de innovación.

## La decisión de diseño clave

El reto no era técnico sino de traducción: ¿cómo convertir la visión difusa
que un caficultor tiene de su marca en instrucciones que un modelo de IA
pueda ejecutar bien?

La respuesta fue diseñar el formulario como una entrevista de brief creativo:
en lugar de pedir "describe tu empaque", el recorrido de 19 pasos pregunta
por el nombre de la marca, sus referencias culturales (¿cultura campesina?
¿marcas internacionales premium?), su factor diferenciador, y pide valorar
elementos gráficos según principios de Gestalt: proximidad, similitud,
completitud y continuidad. Cada respuesta se convierte en un parámetro
concreto para la generación.

## Lo que diseñé

- La experiencia visual del formulario: un recorrido paso a paso con la
  identidad de Alico y la calidez del mundo del café, diseñado para
  completarse en el contexto de una feria
- Un resumen editable al final, para que el usuario revise sus respuestas
  antes de enviar
- El flujo de automatización en n8n que recibe cada respuesta, la envía a la
  API de Leonardo (combinando distintos modelos de generación de imágenes) y
  entrega los empaques generados directamente al correo del participante

## El proceso

Fue un trabajo conjunto con el área de TI de Alico: el formulario se
construyó a la medida con la identidad de la feria, y desde n8n se orquestó
la conexión entre las respuestas, los modelos de generación y la entrega por
correo. Mi aporte se concentró en que el recorrido se sintiera como una
conversación de marca y no como una encuesta, y en que la automatización
corriera por sí sola: yo no estuve en Bogotá, y el sistema atendió a los
asistentes de la feria sin mí.

## El resultado

La experiencia de la feria fue el punto de partida de algo más grande: el
concepto evolucionó hacia una plataforma en la que los clientes de Alico
cargan su logotipo y visualizan renders realistas de su marca sobre
distintos tipos de empaque. Ese salto aceleró la toma de decisiones en
preventa y redujo la dependencia de renders manuales.

[imagen: ejemplos de empaques generados por la plataforma: bolsa de café,
doypack y bandeja con la marca aplicada]

## Lo que aprendí

La inteligencia artificial ha abierto formas nuevas en que las empresas
pueden interactuar con sus clientes. Este proyecto me lo demostró en
concreto: la misma tecnología funcionó como experiencia que sorprende a un
caficultor en una feria y como herramienta de preventa que ahorra renders
manuales. El valor no está en el modelo de IA, sino en la experiencia que
se diseña alrededor de él.
