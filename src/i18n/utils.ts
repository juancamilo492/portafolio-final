import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALES_ACTIVOS,
  RUTAS,
  ui,
  type ClaveRuta,
  type ClaveUI,
  type Locale,
} from './ui';

/** ¿La cadena es uno de los locales configurados? */
export function esLocale(valor: unknown): valor is Locale {
  return typeof valor === 'string' && (LOCALES as readonly string[]).includes(valor);
}

/** Extrae el locale de una URL (`/en/projects` → `en`). */
export function localeDeUrl(url: URL): Locale {
  const [, segmento] = url.pathname.split('/');
  return esLocale(segmento) ? segmento : DEFAULT_LOCALE;
}

/**
 * Devuelve la función de traducción para un locale.
 * Si falta una clave en el idioma pedido, cae al idioma por defecto;
 * si tampoco existe allí, devuelve un marcador visible en vez de vacío.
 */
export function useTranslations(locale: Locale) {
  return function t(clave: ClaveUI): string {
    const diccionario = ui[locale] as Record<string, string>;
    const respaldo = ui[DEFAULT_LOCALE] as Record<string, string>;
    return diccionario[clave] ?? respaldo[clave] ?? `[PENDIENTE: ${clave}]`;
  };
}

/** Segmento de URL traducido: `('en','proyectos')` → `'projects'`. */
export function segmento(locale: Locale, clave: ClaveRuta): string {
  return RUTAS[clave][locale];
}

/**
 * Ruta absoluta con prefijo de locale y segmentos traducidos.
 *   rutaDe('en')                          → '/en/'
 *   rutaDe('en', 'proyectos')             → '/en/projects/'
 *   rutaDe('en', 'proyectos', 'industrial') → '/en/projects/industrial/'
 */
export function rutaDe(locale: Locale, clave?: ClaveRuta, ...extra: string[]): string {
  const partes: string[] = [locale];
  if (clave) partes.push(segmento(locale, clave));
  partes.push(...extra.filter(Boolean));
  return `/${partes.join('/')}/`;
}

/** Rutas de páginas sin sub-segmento (portada): solo los locales activos. */
export function pathsDeLocalesActivos() {
  return LOCALES_ACTIVOS.map((lang) => ({ params: { lang } }));
}

/** Rutas de una sección con índice propio, con su segmento traducido. */
export function pathsDeSeccion(clave: ClaveRuta) {
  return LOCALES_ACTIVOS.map((lang) => ({
    params: { lang, seccion: segmento(lang, clave) },
  }));
}

/** Rutas de una página suelta (sin hijos), con su segmento traducido. */
export function pathsDePagina(clave: ClaveRuta) {
  return LOCALES_ACTIVOS.map((lang) => ({
    params: { lang, pagina: segmento(lang, clave) },
  }));
}
