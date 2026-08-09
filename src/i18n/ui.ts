/**
 * Diccionario tipado de cadenas de interfaz.
 * Contenido largo (casos de estudio) vive en las Content Collections.
 */

export const LOCALES = ['es', 'en', 'fr', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

/**
 * Locales visibles en el selector de idioma y generados como rutas.
 * `de` existe en la configuración pero permanece oculto hasta que su
 * contenido esté completo (ver CLAUDE.md → Idiomas).
 */
export const LOCALES_ACTIVOS: readonly Locale[] = ['es', 'en', 'fr'];

/** Nombre del idioma en su propio idioma, para el selector. */
export const NOMBRE_LOCALE: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
};

/** Código para el atributo hreflang / lang del <html>. */
export const HREFLANG: Record<Locale, string> = {
  es: 'es',
  en: 'en',
  fr: 'fr',
  de: 'de',
};

/**
 * `og:locale` pide idioma_TERRITORIO. Se usan los territorios de la lista
 * estándar de Facebook, no `es_CO`: el sitio es de Medellín pero su español
 * no es regional y `es_CO` no está en esa lista.
 */
export const OG_LOCALE: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
};

/**
 * Segmentos de URL traducidos. Cada página se genera con el segmento de su
 * idioma: /es/proyectos/, /en/projects/, /es/sobre-mi/, /en/about/.
 * Cambiar un valor aquí cambia la URL en todo el sitio.
 */
export const RUTAS = {
  proyectos: { es: 'proyectos', en: 'projects', fr: 'projets', de: 'projekte' },
  sobreMi: { es: 'sobre-mi', en: 'about', fr: 'a-propos', de: 'ueber-mich' },
} as const satisfies Record<string, Record<Locale, string>>;

export type ClaveRuta = keyof typeof RUTAS;

export const ui = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.proyectos': 'Proyectos',
    'nav.sobreMi': 'Sobre mí',
    'nav.skipLink': 'Saltar al contenido principal',
    'nav.abrirMenu': 'Abrir menú',
    'nav.cerrarMenu': 'Cerrar menú',
    'nav.navegacionPrincipal': 'Navegación principal',
    'nav.selectorIdioma': 'Cambiar idioma',
    'nav.cambiarTema': 'Cambiar entre modo claro y oscuro',
    'nav.volverArriba': 'Volver arriba',
    'nav.migas': 'Ruta de navegación',
    /*
     * El nombre accesible tiene que contener el texto que se ve —«ES» en el
     * selector de idioma, el nombre junto al logo— o quien navega por voz
     * dicta lo que lee y no pasa nada (WCAG 2.5.3, Label in Name). El logo ya
     * no dice «JC»: es el oso, un dibujo sin texto, así que aquí basta con el
     * nombre que se lee a su lado.
     */
    'nav.irAlInicio': 'Juan Camilo Bolaños, ir al inicio',

    'meta.inicio.titulo':
      'Juan Camilo Bolaños — Diseñador de Interacción y Creador de Sistemas de IA',
    'meta.inicio.descripcion':
      'Diseñador de interacción y creador de sistemas de IA en Medellín. Diseño interfaces claras y automatizo la operación que las sostiene, con clientes reales de gastronomía, empaques y domótica.',
    'meta.proyectos.titulo': 'Proyectos',
    'meta.proyectos.descripcion':
      'Casos de estudio de diseño de interacción, automatización con IA, experiencias inmersivas e investigación, con clientes y proyectos en Medellín.',
    'meta.sobreMi.titulo': 'Sobre mí',
    'meta.sobreMi.descripcion':
      'Quién es Juan Camilo Bolaños: diseñador de interacción y creador de sistemas de IA en Medellín. Habilidades, formación en EAFIT e idiomas.',
    'meta.404.titulo': 'Página no encontrada',
    'meta.404.descripcion':
      'La página que buscabas no existe o cambió de lugar. Vuelve al inicio o mira los proyectos.',
    // {titulo} se reemplaza con el título de la página al armar el alt de la imagen OG.
    'meta.ogAlt': 'Tarjeta de «{titulo}» en el portafolio de Juan Camilo Bolaños',

    // --- Inicio ---
    'inicio.badge': 'Abierto a nuevas oportunidades',
    'inicio.h1.parte1': 'Diseñador de Interacción y',
    'inicio.h1.enfasis': 'Creador de Sistemas de IA',
    'inicio.subtitulo':
      'Diseño y automatizo experiencias que conectan personas, herramientas y datos.',
    'inicio.verProyectos': 'Ver proyectos',
    'inicio.hablemos': 'Hablemos',
    'inicio.cvIdioma': 'Idioma del CV',
    'inicio.miraProyectos': 'Mira los proyectos',
    'inicio.retratoAlt': 'Juan Camilo Bolaños, de traje y con los brazos cruzados',
    'inicio.pruebaSocial':
      'Proyectos con clientes reales en Medellín: gastronomía, industria del empaque, domótica.',
    'inicio.destacados': 'Proyectos destacados',
    'inicio.verTodos': 'Ver todos',
    'inicio.destacadosPendiente':
      '[PENDIENTE: los proyectos destacados aparecen al integrar los casos de este idioma — FASE 6]',
    'inicio.conocerMas': 'Conoce más sobre mí',
    'inicio.conocerMas.titulo': '¿Quieres conocerme mejor?',
    'inicio.conocerMas.texto':
      'Mi formación, cómo pienso el diseño y qué hay detrás de cada proyecto.',
    'inicio.queHago': 'Qué hago',
    'inicio.queHago.1.titulo': 'Diseño de interacción y UX/UI',
    'inicio.queHago.1.texto':
      'Investigación con usuarios, arquitectura de información e interfaces probadas antes de construirse.',
    'inicio.queHago.2.titulo': 'Sistemas de IA y automatización',
    'inicio.queHago.2.texto':
      'Defino qué se automatiza, con qué datos y en qué punto entra una persona. n8n y las APIs son el medio.',
    'inicio.queHago.3.titulo': 'Experiencias inmersivas e interactivas',
    'inicio.queHago.3.texto': 'VR e interacción física para espacios que responden al cuerpo.',
    'inicio.proceso': 'Mi proceso',
    'inicio.proceso.1.titulo': 'Descubrir',
    'inicio.proceso.1.texto':
      'Escucho al negocio, observo la operación real y defino qué problema vale la pena resolver.',
    'inicio.proceso.2.titulo': 'Diseñar',
    'inicio.proceso.2.texto':
      'Prototipo rápido, valido con quien lo va a usar y ajusto antes de construir.',
    'inicio.proceso.3.titulo': 'Entregar',
    'inicio.proceso.3.texto':
      'Acompaño la puesta en marcha, mido con datos reales y dejo el sistema documentado para que el equipo lo sostenga.',

    // --- CTA de contacto ---
    'cta.titulo': '¿Trabajamos juntos?',
    'cta.apoyo': 'Escríbeme y te respondo el mismo día.',
    'cta.apoyoCompacto': 'Escríbeme por correo o WhatsApp.',
    'cta.whatsapp': 'WhatsApp',
    'cta.correo': 'Correo',
    'cta.volverArriba': 'Volver arriba',

    // --- Proyectos: grilla y caso ---
    'proyectos.bajada':
      'Trabajo de diseño, automatización e interacción física con clientes y proyectos de investigación en Medellín.',
    'proyectos.filtroTodos': 'Todos',
    'proyectos.filtrarPor': 'Filtrar por categoría',
    'proyectos.verCaso': 'Ver el caso',
    'proyectos.anterior': 'Anterior',
    'proyectos.siguiente': 'Siguiente',
    'proyectos.relacionados': 'Proyectos relacionados',
    'proyectos.contenido': 'Contenido',
    'proyectos.cliente': 'Cliente',
    'proyectos.anio': 'Año',
    'proyectos.rol': 'Rol',
    'proyectos.herramientas': 'Herramientas',
    'proyectos.vacio': 'No hay proyectos en esta categoría.',
    'proyectos.pendiente': '[PENDIENTE: los casos de estudio de este idioma se integran en FASE 6]',
    'proyectos.imagenPendiente': '[PENDIENTE: imagen del proyecto]',
    'proyectos.conteoUno': 'proyecto visible',
    'proyectos.conteoVarios': 'proyectos visibles',
    'proyectos.copiarMarkdown': 'Copiar para LLM',
    'proyectos.verMarkdown': 'Ver como Markdown',
    /*
     * Se lee después del texto del enlace, nunca en lugar de él: el nombre
     * accesible tiene que empezar por lo que se ve (WCAG 2.5.3). La flecha de
     * enlace externo avisa a la vista de lo mismo.
     */
    'proyectos.nuevaPestana': '(se abre en una pestaña nueva)',
    'proyectos.copiarMarkdownListo': '¡Copiado!',
    'proyectos.copiarMarkdownError': 'No se pudo copiar',
    'proyectos.fuenteMarkdown': 'Fuente',
    'proyectos.infoMarkdown':
      'Copian o abren el texto de este caso en Markdown, para pegarlo en una IA y pedirle un resumen.',
    'proyectos.conocerMas': 'Conocer más',

    /*
     * --- Evidencia dentro del caso (FASE 15) ---
     * Las emite el plugin de `src/lib/evidencia.ts`, que corre dentro del
     * procesador de Markdown y saca el idioma de la ruta del propio `.md`.
     */
    'proyectos.ampliarImagen': 'Ampliar',
    // Del visor que abre «Ampliar» sin sacar a nadie de la página.
    'proyectos.imagenAmpliada': 'Imagen ampliada',
    'proyectos.cerrarImagen': 'Cerrar la imagen',
    'proyectos.abrirArchivo': 'Abrir el archivo',
    'proyectos.verSitio': 'Ver el sitio',
    'proyectos.verVideo': 'Ver el video en YouTube',
    'proyectos.reproducirVideo': 'Reproducir el video',
    /*
     * Estado de un enlace en vivo. Dice qué hay detrás antes de que nadie
     * pulse: un prototipo anunciado suma, descubierto por sorpresa resta.
     */
    'proyectos.estadoProduccion': 'En producción',
    'proyectos.estadoPrototipo': 'Prototipo',
    'proyectos.estadoDemo': 'Demo',
    // Campo de la barra de contexto, solo si el caso declara `sitio_url`.
    'proyectos.sitioWeb': 'Sitio web',
    // Etiquetas de la evidencia aplanada en la versión `.md` del caso.
    'proyectos.mdImagen': 'Imagen',
    'proyectos.mdVideo': 'Video',
    'proyectos.mdSitio': 'Sitio en vivo',
    'proyectos.mdImagenCompleta': 'Imagen completa',

    // --- Categorías canónicas (ver src/content.config.ts) ---
    'categoria.UX/UI': 'UX/UI',
    'categoria.Producto digital': 'Producto digital',
    'categoria.IA y automatización': 'IA y automatización',
    'categoria.Inmersivo': 'Inmersivo',
    'categoria.Investigación': 'Investigación',
    'categoria.Diseño de servicio': 'Diseño de servicio',

    /*
     * --- Sobre mí ---
     * Tres párrafos, y llevan <strong> porque se pintan con `set:html` dentro de
     * un contenedor `.prosa`: el mismo resaltado que los casos. Dos o tres por
     * párrafo, no más, o dejan de resaltar nada.
     */
    'sobreMi.intro':
      'Soy Juan Camilo Bolaños, <strong>diseñador de interacción y creador de sistemas de IA</strong> en Medellín. Diseño interfaces que se entienden a la primera y las automatizaciones que sostienen la operación detrás de ellas.',
    'sobreMi.parrafo2':
      'Llegué al diseño interactivo por lo multifacético del pénsum, y esa mezcla terminó siendo mi forma de trabajar: defino <strong>cómo funciona el sistema completo</strong>, qué se automatiza y qué no, y sostengo esas decisiones hasta producción. Un sistema no está listo porque se vea bien: tiene que funcionar.',
    'sobreMi.parrafo3':
      'Los casos de este portafolio salieron de contextos reales: <strong>un bar de Medellín</strong>, el área de innovación de una empresa de empaques flexibles, una empresa de domótica y una propuesta de espacio interactivo para el Parque de la Conservación. Trabajo entre áreas que no hablan el mismo idioma, y reporto lo que no funciona: aquí hay evaluaciones de <strong>2.4 sobre 5</strong> y pruebas donde la mitad de los participantes no logró la tarea.',
    'sobreMi.retratoAlt': 'Retrato de Juan Camilo Bolaños de medio cuerpo',
    'sobreMi.habilidades': 'Habilidades',
    /*
     * Los cinco grupos y su contenido salen de la hoja de vida, no del stack de
     * los casos: el rol es diseñar y definir estos sistemas. Las tecnologías con
     * las que se construyeron siguen visibles en el campo `herramientas` de cada
     * caso, que es donde tienen contexto.
     */
    'sobreMi.habilidades.investigacion': 'Investigación y evaluación',
    'sobreMi.habilidades.diseno': 'Diseño e ideación',
    'sobreMi.habilidades.ia': 'Sistemas de IA y automatización',
    'sobreMi.habilidades.prototipado': 'Prototipado, IoT y 3D',
    'sobreMi.habilidades.herramientas': 'Herramientas',
    'sobreMi.hab.entrevistas': 'Entrevistas semiestructuradas',
    'sobreMi.hab.gruposFocales': 'Grupos focales',
    'sobreMi.hab.encuestas': 'Encuestas',
    'sobreMi.hab.pruebas': 'Pruebas de usabilidad',
    'sobreMi.hab.paseoCognitivo': 'Paseo cognitivo',
    'sobreMi.hab.arquitecturaInfo': 'Arquitectura de información',
    'sobreMi.hab.disenoInteraccion': 'Diseño de interacción',
    'sobreMi.hab.agiles': 'Metodologías ágiles',
    'sobreMi.hab.agentes': 'Diseño de agentes conversacionales',
    'sobreMi.hab.automatizacion': 'Automatización de procesos',
    'sobreMi.hab.apis': 'Integración de APIs y webhooks',
    'sobreMi.hab.prototipadoFuncional': 'Prototipado funcional',
    'sobreMi.hab.vision': 'Visión por computador',
    'sobreMi.hab.modelado': 'Modelado, texturizado, animación y renderizado',
    'sobreMi.hab.desarrolloIA': 'Desarrollo web asistido por IA',
    'sobreMi.educacion': 'Educación',
    'sobreMi.educacion.programa': 'Diseño Interactivo',
    'sobreMi.educacion.institucion': 'Universidad EAFIT, Medellín',
    'sobreMi.educacion.periodo': '2022 – 2026',
    'sobreMi.educacion.grado': 'Graduado',
    'sobreMi.educacion.promedio': 'Promedio 4.73/5',
    'sobreMi.educacion.distincion': 'Mejor resultado en las pruebas Saber Pro',
    'sobreMi.idiomas': 'Idiomas',
    'sobreMi.idiomas.es': 'Español — nativo',
    'sobreMi.idiomas.en': 'Inglés — C1',
    'sobreMi.idiomas.fr': 'Francés — B2',
    'sobreMi.idiomas.de': 'Alemán — A2, en aprendizaje',

    // --- Contacto ---
    'contacto.whatsapp': 'Escribir por WhatsApp',
    'contacto.correo': 'Enviar un correo',
    'contacto.linkedin': 'Ver perfil de LinkedIn',
    'contacto.cv': 'Descargar CV',

    // --- 404 ---
    '404.titulo': 'Esta página se perdió en el camino',
    '404.descripcion':
      'El enlace que seguiste no existe o cambió de lugar. Puedes volver al inicio o mirar los proyectos.',
    '404.volver': 'Ir al inicio',
    '404.verProyectos': 'Ver proyectos',
    '404.quizaBuscabas': 'Quizá buscabas',

    'footer.derechos': 'Todos los derechos reservados.',
    'footer.descripcion': 'Diseño de interacción y sistemas de IA. Medellín, Colombia.',
    'footer.navegacion': 'Navegación',
    'footer.recursos': 'Recursos',
  },

  en: {
    'nav.inicio': 'Home',
    'nav.proyectos': 'Projects',
    'nav.sobreMi': 'About',
    'nav.skipLink': 'Skip to main content',
    'nav.abrirMenu': 'Open menu',
    'nav.cerrarMenu': 'Close menu',
    'nav.navegacionPrincipal': 'Main navigation',
    'nav.selectorIdioma': 'Change language',
    'nav.cambiarTema': 'Switch between light and dark mode',
    'nav.volverArriba': 'Back to top',
    'nav.migas': 'Breadcrumb',
    'nav.irAlInicio': 'Juan Camilo Bolaños, go to homepage',

    'meta.inicio.titulo': 'Juan Camilo Bolaños — Interaction Designer and AI Systems Builder',
    'meta.inicio.descripcion':
      'Interaction designer and AI systems builder based in Medellín. I design clear interfaces and automate the operation behind them, with real clients in hospitality, packaging and home automation.',
    'meta.proyectos.titulo': 'Projects',
    'meta.proyectos.descripcion':
      'Case studies in interaction design, AI automation, immersive experiences and research, with clients and projects in Medellín.',
    'meta.sobreMi.titulo': 'About',
    'meta.sobreMi.descripcion':
      'Who Juan Camilo Bolaños is: interaction designer and AI systems builder in Medellín. Skills, education at EAFIT and languages.',
    'meta.404.titulo': 'Page not found',
    'meta.404.descripcion':
      'The page you were looking for does not exist or has moved. Go back home or browse the projects.',
    'meta.ogAlt': 'Card for “{titulo}” on Juan Camilo Bolaños’ portfolio',

    // --- Home ---
    'inicio.badge': 'Open to new opportunities',
    'inicio.h1.parte1': 'Interaction Designer and',
    'inicio.h1.enfasis': 'AI Systems Builder',
    'inicio.subtitulo': 'I design and automate experiences that connect people, tools and data.',
    'inicio.verProyectos': 'View projects',
    'inicio.hablemos': "Let's talk",
    'inicio.cvIdioma': 'CV language',
    'inicio.miraProyectos': 'See the projects',
    'inicio.retratoAlt': 'Juan Camilo Bolaños, wearing a suit with his arms crossed',
    'inicio.pruebaSocial':
      'Projects with real clients in Medellín: hospitality, packaging industry, home automation.',
    'inicio.destacados': 'Featured projects',
    'inicio.verTodos': 'View all',
    'inicio.destacadosPendiente':
      '[PENDING: featured projects appear once the English case studies are integrated — PHASE 6]',
    'inicio.conocerMas': 'Learn more about me',
    'inicio.conocerMas.titulo': 'Want to get to know me better?',
    'inicio.conocerMas.texto':
      "My background, how I think about design and what's behind each project.",
    'inicio.queHago': 'What I do',
    'inicio.queHago.1.titulo': 'Interaction design and UX/UI',
    'inicio.queHago.1.texto':
      'User research, information architecture and interfaces tested before they are built.',
    'inicio.queHago.2.titulo': 'AI systems and automation',
    'inicio.queHago.2.texto':
      'I define what gets automated, with which data and where a person steps in. n8n and APIs are the means.',
    'inicio.queHago.3.titulo': 'Immersive and interactive experiences',
    'inicio.queHago.3.texto': 'VR and physical interaction for spaces that respond to the body.',
    'inicio.proceso': 'My process',
    'inicio.proceso.1.titulo': 'Discover',
    'inicio.proceso.1.texto':
      'I listen to the business, watch how it really operates and define which problem is worth solving.',
    'inicio.proceso.2.titulo': 'Design',
    'inicio.proceso.2.texto':
      'I prototype fast, validate with the people who will use it and adjust before anything gets built.',
    'inicio.proceso.3.titulo': 'Deliver',
    'inicio.proceso.3.texto':
      'I see it into use, measure with real data and leave the system documented so the team can keep it running.',

    // --- Contact CTA ---
    'cta.titulo': 'Shall we work together?',
    'cta.apoyo': 'Write to me and I will reply the same day.',
    'cta.apoyoCompacto': 'Write to me by email or on WhatsApp.',
    'cta.whatsapp': 'WhatsApp',
    'cta.correo': 'Email',
    'cta.volverArriba': 'Back to top',

    // --- Projects: grid and case study ---
    'proyectos.bajada':
      'Design, automation and physical interaction work with clients and research projects in Medellín.',
    'proyectos.filtroTodos': 'All',
    'proyectos.filtrarPor': 'Filter by category',
    'proyectos.verCaso': 'View case study',
    'proyectos.anterior': 'Previous',
    'proyectos.siguiente': 'Next',
    'proyectos.relacionados': 'Related projects',
    'proyectos.contenido': 'Contents',
    'proyectos.cliente': 'Client',
    'proyectos.anio': 'Year',
    'proyectos.rol': 'Role',
    'proyectos.herramientas': 'Tools',
    'proyectos.vacio': 'No projects in this category.',
    'proyectos.pendiente': '[PENDING: the English case studies are integrated in PHASE 6]',
    'proyectos.imagenPendiente': '[PENDING: project image]',
    'proyectos.conteoUno': 'project shown',
    'proyectos.conteoVarios': 'projects shown',
    'proyectos.copiarMarkdown': 'Copy for LLM',
    'proyectos.verMarkdown': 'View as Markdown',
    'proyectos.nuevaPestana': '(opens in a new tab)',
    'proyectos.copiarMarkdownListo': 'Copied!',
    'proyectos.copiarMarkdownError': 'Could not copy',
    'proyectos.fuenteMarkdown': 'Source',
    'proyectos.infoMarkdown':
      "They copy or open this case's text as Markdown, ready to paste into an AI and ask for a summary.",
    'proyectos.conocerMas': 'Learn more',

    // --- Evidence inside the case study (FASE 15) ---
    'proyectos.ampliarImagen': 'Enlarge',
    'proyectos.imagenAmpliada': 'Enlarged image',
    'proyectos.cerrarImagen': 'Close the image',
    'proyectos.abrirArchivo': 'Open the file',
    'proyectos.verSitio': 'Visit the site',
    'proyectos.verVideo': 'Watch the video on YouTube',
    'proyectos.reproducirVideo': 'Play the video',
    'proyectos.estadoProduccion': 'Live',
    'proyectos.estadoPrototipo': 'Prototype',
    'proyectos.estadoDemo': 'Demo',
    'proyectos.sitioWeb': 'Website',
    'proyectos.mdImagen': 'Image',
    'proyectos.mdVideo': 'Video',
    'proyectos.mdSitio': 'Live site',
    'proyectos.mdImagenCompleta': 'Full-size image',

    // --- Canonical categories (see src/content.config.ts) ---
    'categoria.UX/UI': 'UX/UI',
    'categoria.Producto digital': 'Digital product',
    'categoria.IA y automatización': 'AI and automation',
    'categoria.Inmersivo': 'Immersive',
    'categoria.Investigación': 'Research',
    'categoria.Diseño de servicio': 'Service design',

    // --- About ---
    'sobreMi.intro':
      'I am Juan Camilo Bolaños, an <strong>interaction designer and AI systems builder</strong> based in Medellín. I design interfaces people understand right away, and the automation that keeps the operation behind them running.',
    'sobreMi.parrafo2':
      'I came to interactive design because of how multifaceted the degree was, and that mix ended up becoming how I work: I define <strong>how the whole system works</strong>, what gets automated and what doesn’t, and I stand behind those decisions all the way to production. A system isn’t ready because it looks good: it has to work.',
    'sobreMi.parrafo3':
      'The case studies in this portfolio come from real settings: <strong>a bar in Medellín</strong>, the innovation team of a flexible packaging company, a home automation company and a proposal for an interactive space at the Parque de la Conservación. I work between departments that don’t speak the same language, and I report what doesn’t work: these cases include evaluations of <strong>2.4 out of 5</strong> and tests where half the participants failed the task.',
    'sobreMi.retratoAlt': 'Waist-up portrait of Juan Camilo Bolaños',
    'sobreMi.habilidades': 'Skills',
    'sobreMi.habilidades.investigacion': 'Research and evaluation',
    'sobreMi.habilidades.diseno': 'Design and ideation',
    'sobreMi.habilidades.ia': 'AI systems and automation',
    'sobreMi.habilidades.prototipado': 'Prototyping, IoT and 3D',
    'sobreMi.habilidades.herramientas': 'Tools',
    'sobreMi.hab.entrevistas': 'Semi-structured interviews',
    'sobreMi.hab.gruposFocales': 'Focus groups',
    'sobreMi.hab.encuestas': 'Surveys',
    'sobreMi.hab.pruebas': 'Usability testing',
    'sobreMi.hab.paseoCognitivo': 'Cognitive walkthrough',
    'sobreMi.hab.arquitecturaInfo': 'Information architecture',
    'sobreMi.hab.disenoInteraccion': 'Interaction design',
    'sobreMi.hab.agiles': 'Agile methodologies',
    'sobreMi.hab.agentes': 'Conversational agent design',
    'sobreMi.hab.automatizacion': 'Process automation',
    'sobreMi.hab.apis': 'API and webhook integration',
    'sobreMi.hab.prototipadoFuncional': 'Functional prototyping',
    'sobreMi.hab.vision': 'Computer vision',
    'sobreMi.hab.modelado': 'Modeling, texturing, animation and rendering',
    'sobreMi.hab.desarrolloIA': 'AI-assisted web development',
    'sobreMi.educacion': 'Education',
    'sobreMi.educacion.programa': 'Interactive Design',
    'sobreMi.educacion.institucion': 'Universidad EAFIT, Medellín',
    'sobreMi.educacion.periodo': '2022 – 2026',
    'sobreMi.educacion.grado': 'Graduated',
    'sobreMi.educacion.promedio': 'GPA 4.73/5',
    'sobreMi.educacion.distincion': 'Top Saber Pro results',
    'sobreMi.idiomas': 'Languages',
    'sobreMi.idiomas.es': 'Spanish — native',
    'sobreMi.idiomas.en': 'English — C1',
    'sobreMi.idiomas.fr': 'French — B2',
    'sobreMi.idiomas.de': 'German — A2, learning',

    // --- Contact ---
    'contacto.whatsapp': 'Message on WhatsApp',
    'contacto.correo': 'Send an email',
    'contacto.linkedin': 'View LinkedIn profile',
    'contacto.cv': 'Download CV',

    // --- 404 ---
    '404.titulo': 'This page got lost along the way',
    '404.descripcion':
      'The link you followed does not exist or has moved. You can go back home or browse the projects.',
    '404.volver': 'Go to homepage',
    '404.verProyectos': 'View projects',
    '404.quizaBuscabas': 'You might be looking for',

    'footer.derechos': 'All rights reserved.',
    'footer.descripcion': 'Interaction design and AI systems. Medellín, Colombia.',
    'footer.navegacion': 'Navigation',
    'footer.recursos': 'Resources',
  },

  fr: {
    'nav.inicio': 'Accueil',
    'nav.proyectos': 'Projets',
    'nav.sobreMi': 'À propos',
    'nav.skipLink': 'Aller au contenu principal',
    'nav.abrirMenu': 'Ouvrir le menu',
    'nav.cerrarMenu': 'Fermer le menu',
    'nav.navegacionPrincipal': 'Navigation principale',
    'nav.selectorIdioma': 'Changer de langue',
    'nav.cambiarTema': 'Basculer entre le mode clair et le mode sombre',
    'nav.volverArriba': 'Retour en haut',
    'nav.migas': 'Fil d’Ariane',
    'nav.irAlInicio': 'Juan Camilo Bolaños, aller à l’accueil',

    'meta.inicio.titulo':
      'Juan Camilo Bolaños — Designer d’interaction et créateur de systèmes d’IA',
    'meta.inicio.descripcion':
      'Designer d’interaction et créateur de systèmes d’IA à Medellín. Je conçois des interfaces claires et j’automatise les opérations qui les soutiennent, avec de vrais clients dans la restauration, l’emballage et la domotique.',
    'meta.proyectos.titulo': 'Projets',
    'meta.proyectos.descripcion':
      'Études de cas en design d’interaction, automatisation par IA, expériences immersives et recherche, avec des clients et des projets à Medellín.',
    'meta.sobreMi.titulo': 'À propos',
    'meta.sobreMi.descripcion':
      'Qui est Juan Camilo Bolaños : designer d’interaction et créateur de systèmes d’IA à Medellín. Compétences, formation à EAFIT et langues.',
    'meta.404.titulo': 'Page introuvable',
    'meta.404.descripcion':
      'La page que vous cherchiez n’existe pas ou a été déplacée. Revenez à l’accueil ou parcourez les projets.',
    'meta.ogAlt': 'Carte de « {titulo} » dans le portfolio de Juan Camilo Bolaños',

    // --- Accueil ---
    'inicio.badge': 'Ouvert à de nouvelles opportunités',
    'inicio.h1.parte1': 'Designer d’interaction et',
    'inicio.h1.enfasis': 'créateur de systèmes d’IA',
    'inicio.subtitulo':
      'Je conçois et j’automatise des expériences qui relient les personnes, les outils et les données.',
    'inicio.verProyectos': 'Voir les projets',
    'inicio.hablemos': 'Discutons-en',
    'inicio.cvIdioma': 'Langue du CV',
    'inicio.miraProyectos': 'Découvrez les projets',
    'inicio.retratoAlt': 'Juan Camilo Bolaños, en costume et les bras croisés',
    'inicio.pruebaSocial':
      'Des projets avec de vrais clients à Medellín : restauration, industrie de l’emballage, domotique.',
    'inicio.destacados': 'Projets à la une',
    'inicio.verTodos': 'Voir tout',
    'inicio.destacadosPendiente':
      '[EN ATTENTE : les projets à la une apparaissent une fois les études de cas de cette langue intégrées]',
    'inicio.conocerMas': 'En savoir plus sur moi',
    'inicio.conocerMas.titulo': 'Vous voulez mieux me connaître ?',
    'inicio.conocerMas.texto':
      'Ma formation, ma façon de penser le design et ce qu’il y a derrière chaque projet.',
    'inicio.queHago': 'Ce que je fais',
    'inicio.queHago.1.titulo': 'Design d’interaction et UX/UI',
    'inicio.queHago.1.texto':
      'Recherche utilisateur, architecture de l’information et interfaces testées avant d’être construites.',
    'inicio.queHago.2.titulo': 'Systèmes d’IA et automatisation',
    'inicio.queHago.2.texto':
      'Je définis ce qui s’automatise, avec quelles données et à quel moment une personne intervient. n8n et les API sont le moyen.',
    'inicio.queHago.3.titulo': 'Expériences immersives et interactives',
    'inicio.queHago.3.texto':
      'VR et interaction physique pour des espaces qui répondent au corps.',
    'inicio.proceso': 'Ma démarche',
    'inicio.proceso.1.titulo': 'Découvrir',
    'inicio.proceso.1.texto':
      'J’écoute l’entreprise, j’observe son fonctionnement réel et je définis quel problème vaut la peine d’être résolu.',
    'inicio.proceso.2.titulo': 'Concevoir',
    'inicio.proceso.2.texto':
      'Je prototype vite, je valide avec les personnes qui vont s’en servir et j’ajuste avant de construire quoi que ce soit.',
    'inicio.proceso.3.titulo': 'Livrer',
    'inicio.proceso.3.texto':
      'J’accompagne la mise en service, je mesure avec de vraies données et je laisse le système documenté pour que l’équipe le fasse vivre.',

    // --- Appel au contact ---
    'cta.titulo': 'On travaille ensemble ?',
    'cta.apoyo': 'Écrivez-moi et je vous réponds le jour même.',
    'cta.apoyoCompacto': 'Écrivez-moi par e-mail ou sur WhatsApp.',
    'cta.whatsapp': 'WhatsApp',
    'cta.correo': 'E-mail',
    'cta.volverArriba': 'Retour en haut',

    // --- Projets : grille et étude de cas ---
    'proyectos.bajada':
      'Du travail de design, d’automatisation et d’interaction physique avec des clients et des projets de recherche à Medellín.',
    'proyectos.filtroTodos': 'Tous',
    'proyectos.filtrarPor': 'Filtrer par catégorie',
    'proyectos.verCaso': 'Voir l’étude de cas',
    'proyectos.anterior': 'Précédent',
    'proyectos.siguiente': 'Suivant',
    'proyectos.relacionados': 'Projets liés',
    'proyectos.contenido': 'Sommaire',
    'proyectos.cliente': 'Client',
    'proyectos.anio': 'Année',
    'proyectos.rol': 'Rôle',
    'proyectos.herramientas': 'Outils',
    'proyectos.vacio': 'Aucun projet dans cette catégorie.',
    'proyectos.pendiente':
      '[EN ATTENTE : les études de cas de cette langue restent à intégrer]',
    'proyectos.imagenPendiente': '[EN ATTENTE : image du projet]',
    'proyectos.conteoUno': 'projet affiché',
    'proyectos.conteoVarios': 'projets affichés',
    'proyectos.copiarMarkdown': 'Copier pour un LLM',
    'proyectos.verMarkdown': 'Voir en Markdown',
    'proyectos.nuevaPestana': '(s’ouvre dans un nouvel onglet)',
    'proyectos.copiarMarkdownListo': 'Copié !',
    'proyectos.copiarMarkdownError': 'Échec de la copie',
    'proyectos.fuenteMarkdown': 'Source',
    'proyectos.infoMarkdown':
      'Ils copient ou ouvrent le texte de ce cas en Markdown, à coller dans une IA pour lui demander un résumé.',
    'proyectos.conocerMas': 'En savoir plus',

    // --- Preuves à l’intérieur du cas (FASE 15) ---
    'proyectos.ampliarImagen': 'Agrandir',
    'proyectos.imagenAmpliada': 'Image agrandie',
    'proyectos.cerrarImagen': 'Fermer l’image',
    'proyectos.abrirArchivo': 'Ouvrir le fichier',
    'proyectos.verSitio': 'Voir le site',
    'proyectos.verVideo': 'Voir la vidéo sur YouTube',
    'proyectos.reproducirVideo': 'Lire la vidéo',
    'proyectos.estadoProduccion': 'En production',
    'proyectos.estadoPrototipo': 'Prototype',
    'proyectos.estadoDemo': 'Démo',
    'proyectos.sitioWeb': 'Site web',
    'proyectos.mdImagen': 'Image',
    'proyectos.mdVideo': 'Vidéo',
    'proyectos.mdSitio': 'Site en ligne',
    'proyectos.mdImagenCompleta': 'Image en taille réelle',

    // --- Catégories canoniques (voir src/content.config.ts) ---
    'categoria.UX/UI': 'UX/UI',
    'categoria.Producto digital': 'Produit numérique',
    'categoria.IA y automatización': 'IA et automatisation',
    'categoria.Inmersivo': 'Immersif',
    'categoria.Investigación': 'Recherche',
    'categoria.Diseño de servicio': 'Design de service',

    // --- À propos ---
    'sobreMi.intro':
      'Je suis Juan Camilo Bolaños, <strong>designer d’interaction et créateur de systèmes d’IA</strong> à Medellín. Je conçois des interfaces que l’on comprend du premier coup et les automatisations qui font tourner l’activité derrière elles.',
    'sobreMi.parrafo2':
      'Je suis venu au design interactif pour le côté multifacette de la formation, et ce mélange a fini par devenir ma façon de travailler : je définis <strong>le fonctionnement du système dans son ensemble</strong>, ce qui s’automatise et ce qui ne s’automatise pas, et je porte ces décisions jusqu’à la mise en production. Un système n’est pas prêt parce qu’il est beau : il doit fonctionner.',
    'sobreMi.parrafo3':
      'Les études de cas de ce portfolio viennent de contextes réels : <strong>un bar de Medellín</strong>, l’équipe d’innovation d’une entreprise d’emballages souples, une entreprise de domotique et une proposition d’espace interactif pour le Parque de la Conservación. Je travaille entre des services qui ne parlent pas la même langue, et je rapporte ce qui ne marche pas : on trouve ici des évaluations à <strong>2,4 sur 5</strong> et des tests où la moitié des participants n’a pas réussi la tâche.',
    'sobreMi.retratoAlt': 'Portrait de Juan Camilo Bolaños à mi-corps',
    'sobreMi.habilidades': 'Compétences',
    'sobreMi.habilidades.investigacion': 'Recherche et évaluation',
    'sobreMi.habilidades.diseno': 'Design et idéation',
    'sobreMi.habilidades.ia': 'Systèmes d’IA et automatisation',
    'sobreMi.habilidades.prototipado': 'Prototypage, IoT et 3D',
    'sobreMi.habilidades.herramientas': 'Outils',
    'sobreMi.hab.entrevistas': 'Entretiens semi-directifs',
    'sobreMi.hab.gruposFocales': 'Groupes de discussion',
    'sobreMi.hab.encuestas': 'Enquêtes',
    'sobreMi.hab.pruebas': 'Tests d’utilisabilité',
    'sobreMi.hab.paseoCognitivo': 'Parcours cognitif',
    'sobreMi.hab.arquitecturaInfo': 'Architecture de l’information',
    'sobreMi.hab.disenoInteraccion': 'Design d’interaction',
    'sobreMi.hab.agiles': 'Méthodes agiles',
    'sobreMi.hab.agentes': 'Conception d’agents conversationnels',
    'sobreMi.hab.automatizacion': 'Automatisation de processus',
    'sobreMi.hab.apis': 'Intégration d’API et de webhooks',
    'sobreMi.hab.prototipadoFuncional': 'Prototypage fonctionnel',
    'sobreMi.hab.vision': 'Vision par ordinateur',
    'sobreMi.hab.modelado': 'Modélisation, texturage, animation et rendu',
    'sobreMi.hab.desarrolloIA': 'Développement web assisté par IA',
    'sobreMi.educacion': 'Formation',
    'sobreMi.educacion.programa': 'Design interactif',
    'sobreMi.educacion.institucion': 'Universidad EAFIT, Medellín',
    'sobreMi.educacion.periodo': '2022 – 2026',
    'sobreMi.educacion.grado': 'Diplômé',
    'sobreMi.educacion.promedio': 'Moyenne 4,73/5',
    'sobreMi.educacion.distincion': 'Meilleur résultat aux épreuves Saber Pro',
    'sobreMi.idiomas': 'Langues',
    'sobreMi.idiomas.es': 'Espagnol — langue maternelle',
    'sobreMi.idiomas.en': 'Anglais — C1',
    'sobreMi.idiomas.fr': 'Français — B2',
    'sobreMi.idiomas.de': 'Allemand — A2, en cours d’apprentissage',

    // --- Contact ---
    'contacto.whatsapp': 'Écrire sur WhatsApp',
    'contacto.correo': 'Envoyer un e-mail',
    'contacto.linkedin': 'Voir le profil LinkedIn',
    'contacto.cv': 'Télécharger le CV',

    // --- 404 ---
    '404.titulo': 'Cette page s’est perdue en chemin',
    '404.descripcion':
      'Le lien que vous avez suivi n’existe pas ou a été déplacé. Vous pouvez revenir à l’accueil ou parcourir les projets.',
    '404.volver': 'Aller à l’accueil',
    '404.verProyectos': 'Voir les projets',
    '404.quizaBuscabas': 'Vous cherchiez peut-être',

    'footer.derechos': 'Tous droits réservés.',
    'footer.descripcion': 'Design d’interaction et systèmes d’IA. Medellín, Colombie.',
    'footer.navegacion': 'Navigation',
    'footer.recursos': 'Ressources',
  },

  // [PENDIENTE: traducción al alemán — FASE posterior]
  de: {},
} as const satisfies Record<Locale, Record<string, string>>;

/** Todas las claves disponibles, tomadas del idioma por defecto. */
export type ClaveUI = keyof (typeof ui)[typeof DEFAULT_LOCALE];
