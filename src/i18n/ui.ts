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
    'nav.selectorIdioma': 'Cambiar idioma',
    'nav.temaClaro': 'Activar modo claro',
    'nav.temaOscuro': 'Activar modo oscuro',

    'meta.inicio.titulo': 'Juan Camilo Bolaños — Diseñador de Interacción y Creador de Sistemas de IA',
    'meta.proyectos.titulo': 'Proyectos',
    'meta.sobreMi.titulo': 'Sobre mí',
    'meta.404.titulo': 'Página no encontrada',

    'proyectos.filtroTodos': 'Todos',
    'proyectos.filtrarPor': 'Filtrar por categoría',
    'proyectos.verCaso': 'Ver el caso',
    'proyectos.anterior': 'Proyecto anterior',
    'proyectos.siguiente': 'Proyecto siguiente',
    'proyectos.relacionados': 'Proyectos relacionados',
    'proyectos.cliente': 'Cliente',
    'proyectos.anio': 'Año',
    'proyectos.rol': 'Rol',
    'proyectos.herramientas': 'Herramientas',
    'proyectos.vacio': 'No hay proyectos en esta categoría.',

    'contacto.whatsapp': 'Escribir por WhatsApp',
    'contacto.correo': 'Enviar un correo',
    'contacto.linkedin': 'Ver perfil de LinkedIn',
    'contacto.cv': 'Descargar CV',

    '404.titulo': 'Esta página no existe',
    '404.volver': 'Volver al inicio',

    'footer.derechos': 'Todos los derechos reservados.',
  },

  en: {
    'nav.inicio': 'Home',
    'nav.proyectos': 'Projects',
    'nav.sobreMi': 'About',
    'nav.skipLink': 'Skip to main content',
    'nav.abrirMenu': 'Open menu',
    'nav.cerrarMenu': 'Close menu',
    'nav.selectorIdioma': 'Change language',
    'nav.temaClaro': 'Switch to light mode',
    'nav.temaOscuro': 'Switch to dark mode',

    'meta.inicio.titulo': 'Juan Camilo Bolaños — Interaction Designer and AI Systems Builder',
    'meta.proyectos.titulo': 'Projects',
    'meta.sobreMi.titulo': 'About',
    'meta.404.titulo': 'Page not found',

    'proyectos.filtroTodos': 'All',
    'proyectos.filtrarPor': 'Filter by category',
    'proyectos.verCaso': 'View case study',
    'proyectos.anterior': 'Previous project',
    'proyectos.siguiente': 'Next project',
    'proyectos.relacionados': 'Related projects',
    'proyectos.cliente': 'Client',
    'proyectos.anio': 'Year',
    'proyectos.rol': 'Role',
    'proyectos.herramientas': 'Tools',
    'proyectos.vacio': 'No projects in this category.',

    'contacto.whatsapp': 'Message on WhatsApp',
    'contacto.correo': 'Send an email',
    'contacto.linkedin': 'View LinkedIn profile',
    'contacto.cv': 'Download CV',

    '404.titulo': 'This page does not exist',
    '404.volver': 'Back to home',

    'footer.derechos': 'All rights reserved.',
  },

  // [PENDIENTE: traducción al francés — FASE posterior]
  fr: {},

  // [PENDIENTE: traducción al alemán — FASE posterior]
  de: {},
} as const satisfies Record<Locale, Record<string, string>>;

/** Todas las claves disponibles, tomadas del idioma por defecto. */
export type ClaveUI = keyof (typeof ui)[typeof DEFAULT_LOCALE];
