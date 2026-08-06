/**
 * Diccionario tipado de cadenas de interfaz.
 * Contenido largo (casos de estudio) vive en las Content Collections.
 */

export const LOCALES = ['es', 'en', 'fr', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

/**
 * Locales visibles en el selector de idioma y generados como rutas.
 * fr/de existen en la configuración pero permanecen ocultos hasta que
 * su contenido esté completo (ver CLAUDE.md → Idiomas).
 */
export const LOCALES_ACTIVOS: readonly Locale[] = ['es', 'en'];

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
    'nav.irAlInicio': 'Juan Camilo Bolaños — ir al inicio',

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

    // --- Inicio ---
    'inicio.badge': 'Disponible para proyectos',
    'inicio.h1.parte1': 'Diseñador de Interacción y',
    'inicio.h1.enfasis': 'Creador de Sistemas de IA',
    'inicio.subtitulo':
      'Diseño y automatizo experiencias que conectan personas, herramientas y datos.',
    'inicio.verProyectos': 'Ver proyectos',
    'inicio.hablemos': 'Hablemos',
    'inicio.cvIdioma': 'Idioma del CV',
    'inicio.miraProyectos': 'Mira los proyectos',
    'inicio.retratoPendiente': '[PENDIENTE: retrato en blanco y negro para el hero]',
    'inicio.pruebaSocial':
      'Proyectos con clientes reales en Medellín: gastronomía, industria del empaque, domótica.',
    'inicio.destacados': 'Proyectos destacados',
    'inicio.verTodos': 'Ver todos',
    'inicio.destacadosPendiente':
      '[PENDIENTE: los proyectos destacados aparecen al integrar los casos de este idioma — FASE 6]',
    'inicio.queHago': 'Qué hago',
    'inicio.queHago.1.titulo': 'Diseño de interacción y UX/UI',
    'inicio.queHago.1.texto':
      'Interfaces claras, probadas con usuarios reales y listas para construir.',
    'inicio.queHago.2.titulo': 'Automatización e IA aplicada',
    'inicio.queHago.2.texto':
      'n8n, agentes y APIs conectando las herramientas que ya usa el negocio.',
    'inicio.queHago.3.titulo': 'Experiencias inmersivas e interactivas',
    'inicio.queHago.3.texto': 'VR y física computacional para espacios que responden al cuerpo.',
    'inicio.proceso': 'Mi proceso',
    'inicio.proceso.1.titulo': 'Descubrir',
    'inicio.proceso.1.texto':
      'Escucho al negocio, observo la operación real y defino qué problema vale la pena resolver.',
    'inicio.proceso.2.titulo': 'Diseñar',
    'inicio.proceso.2.texto':
      'Prototipo rápido, valido con quien lo va a usar y ajusto antes de escribir código.',
    'inicio.proceso.3.titulo': 'Entregar',
    'inicio.proceso.3.texto':
      'Lanzo, mido con datos reales y dejo el sistema documentado para que siga vivo.',

    // --- CTA de contacto ---
    'cta.titulo': '¿Trabajamos juntos?',
    'cta.apoyo': 'Cuéntame qué necesitas y te respondo el mismo día.',
    'cta.apoyoCompacto': 'Escríbeme por WhatsApp o correo.',
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
    'proyectos.todosLosProyectos': 'Todos los proyectos',
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

    // --- Categorías canónicas (ver src/content.config.ts) ---
    'categoria.UX/UI': 'UX/UI',
    'categoria.Producto digital': 'Producto digital',
    'categoria.IA y automatización': 'IA y automatización',
    'categoria.Inmersivo': 'Inmersivo',
    'categoria.Investigación': 'Investigación',
    'categoria.Diseño de servicio': 'Diseño de servicio',

    // --- Sobre mí ---
    'sobreMi.intro':
      'Soy Juan Camilo Bolaños, diseñador de interacción y creador de sistemas de IA en Medellín. Mi trabajo junta dos cosas que suelen ir por separado: interfaces que la gente entiende a la primera y automatizaciones que sostienen la operación detrás de ellas.',
    'sobreMi.parrafo2':
      'Los proyectos de este portafolio salieron de contextos reales: un bar de Medellín, el área de innovación de una empresa de empaques flexibles, una empresa de domótica que dependía del voz a voz y una propuesta de espacio interactivo para el Parque de la Conservación.',
    'sobreMi.parrafoPendiente':
      '[PENDIENTE: ampliar la historia con Juan Camilo — trayectoria, motivación y forma de trabajar en primera persona]',
    'sobreMi.retratoPendiente': '[PENDIENTE: segundo retrato para Sobre mí]',
    'sobreMi.habilidades': 'Habilidades',
    'sobreMi.habilidades.diseno': 'Diseño',
    'sobreMi.habilidades.ia': 'Automatización e IA',
    'sobreMi.habilidades.desarrollo': 'Desarrollo',
    'sobreMi.habilidades.metodologias': 'Metodologías',
    'sobreMi.metodo.entrevistas': 'Entrevistas semiestructuradas',
    'sobreMi.metodo.pruebas': 'Pruebas con usuarios',
    'sobreMi.metodo.prototipado': 'Prototipado funcional',
    'sobreMi.educacion': 'Educación',
    'sobreMi.educacion.programa': 'Diseño Interactivo',
    'sobreMi.educacion.institucion': 'Universidad EAFIT, Medellín',
    'sobreMi.educacion.periodo': '2022 – 2026',
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
    'nav.irAlInicio': 'Juan Camilo Bolaños — go to homepage',

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

    // --- Home ---
    'inicio.badge': 'Available for projects',
    'inicio.h1.parte1': 'Interaction Designer and',
    'inicio.h1.enfasis': 'AI Systems Builder',
    'inicio.subtitulo': 'I design and automate experiences that connect people, tools and data.',
    'inicio.verProyectos': 'View projects',
    'inicio.hablemos': "Let's talk",
    'inicio.cvIdioma': 'CV language',
    'inicio.miraProyectos': 'See the projects',
    'inicio.retratoPendiente': '[PENDING: black and white portrait for the hero]',
    'inicio.pruebaSocial':
      'Projects with real clients in Medellín: hospitality, packaging industry, home automation.',
    'inicio.destacados': 'Featured projects',
    'inicio.verTodos': 'View all',
    'inicio.destacadosPendiente':
      '[PENDING: featured projects appear once the English case studies are integrated — PHASE 6]',
    'inicio.queHago': 'What I do',
    'inicio.queHago.1.titulo': 'Interaction design and UX/UI',
    'inicio.queHago.1.texto': 'Clear interfaces, tested with real users and ready to build.',
    'inicio.queHago.2.titulo': 'Automation and applied AI',
    'inicio.queHago.2.texto': 'n8n, agents and APIs connecting the tools the business already uses.',
    'inicio.queHago.3.titulo': 'Immersive and interactive experiences',
    'inicio.queHago.3.texto': 'VR and physical computing for spaces that respond to the body.',
    'inicio.proceso': 'My process',
    'inicio.proceso.1.titulo': 'Discover',
    'inicio.proceso.1.texto':
      'I listen to the business, watch how it really operates and define which problem is worth solving.',
    'inicio.proceso.2.titulo': 'Design',
    'inicio.proceso.2.texto':
      'I prototype fast, validate with the people who will use it and adjust before writing code.',
    'inicio.proceso.3.titulo': 'Deliver',
    'inicio.proceso.3.texto':
      'I ship, measure with real data and leave the system documented so it stays alive.',

    // --- Contact CTA ---
    'cta.titulo': 'Shall we work together?',
    'cta.apoyo': 'Tell me what you need and I will reply the same day.',
    'cta.apoyoCompacto': 'Write to me on WhatsApp or by email.',
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
    'proyectos.todosLosProyectos': 'All projects',
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

    // --- Canonical categories (see src/content.config.ts) ---
    'categoria.UX/UI': 'UX/UI',
    'categoria.Producto digital': 'Digital product',
    'categoria.IA y automatización': 'AI and automation',
    'categoria.Inmersivo': 'Immersive',
    'categoria.Investigación': 'Research',
    'categoria.Diseño de servicio': 'Service design',

    // --- About ---
    'sobreMi.intro':
      'I am Juan Camilo Bolaños, an interaction designer and AI systems builder based in Medellín. My work brings together two things that usually stay apart: interfaces people understand right away, and the automation that keeps the operation behind them running.',
    'sobreMi.parrafo2':
      'The projects in this portfolio come from real settings: a bar in Medellín, the innovation team of a flexible packaging company, a home automation company that depended on word of mouth, and a proposal for an interactive space at the Parque de la Conservación.',
    'sobreMi.parrafoPendiente':
      '[PENDING: expand this story with Juan Camilo — background, motivation and way of working, in first person]',
    'sobreMi.retratoPendiente': '[PENDING: second portrait for the About page]',
    'sobreMi.habilidades': 'Skills',
    'sobreMi.habilidades.diseno': 'Design',
    'sobreMi.habilidades.ia': 'Automation and AI',
    'sobreMi.habilidades.desarrollo': 'Development',
    'sobreMi.habilidades.metodologias': 'Methods',
    'sobreMi.metodo.entrevistas': 'Semi-structured interviews',
    'sobreMi.metodo.pruebas': 'Usability testing',
    'sobreMi.metodo.prototipado': 'Functional prototyping',
    'sobreMi.educacion': 'Education',
    'sobreMi.educacion.programa': 'Interactive Design',
    'sobreMi.educacion.institucion': 'Universidad EAFIT, Medellín',
    'sobreMi.educacion.periodo': '2022 – 2026',
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

  // [PENDIENTE: traducción al francés — FASE posterior]
  fr: {},

  // [PENDIENTE: traducción al alemán — FASE posterior]
  de: {},
} as const satisfies Record<Locale, Record<string, string>>;

/** Todas las claves disponibles, tomadas del idioma por defecto. */
export type ClaveUI = keyof (typeof ui)[typeof DEFAULT_LOCALE];
