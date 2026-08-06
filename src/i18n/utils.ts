import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALES_ACTIVOS,
  NOMBRE_LOCALE,
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
export function rutaDe(
  locale: Locale,
  clave?: ClaveRuta,
  ...extra: (string | undefined)[]
): string {
  const partes: string[] = [locale];
  if (clave) partes.push(segmento(locale, clave));
  partes.push(...extra.filter((s): s is string => Boolean(s)));
  return `/${partes.join('/')}/`;
}

export interface Alternativa {
  locale: Locale;
  nombre: string;
  href: string;
  /**
   * `true` cuando el href es esta misma página en ese idioma. `false` cuando
   * la página no existe allí y el href cae al índice de la sección.
   */
  exacta: boolean;
}

/**
 * La misma página en cada idioma activo, para el selector de idioma y las
 * etiquetas hreflang.
 *
 * `disponibles` son los idiomas en los que la página realmente se genera; para
 * un caso de estudio se calcula con `localesDeProyecto` (src/lib/proyectos.ts),
 * porque un caso puede existir en español y todavía no en inglés. Al idioma que
 * falta no se le ofrece la ruta del caso — no está en dist y daría 404 —, sino
 * el índice de la sección, que sí existe. Solo las entradas `exacta` merecen
 * un hreflang: las demás no son traducciones de esta página.
 */
export function alternativasDeIdioma(
  clave?: ClaveRuta,
  slug?: string,
  disponibles: readonly Locale[] = LOCALES_ACTIVOS,
): Alternativa[] {
  return LOCALES_ACTIVOS.map((locale) => {
    const exacta = disponibles.includes(locale);
    return {
      locale,
      nombre: NOMBRE_LOCALE[locale],
      href: exacta ? rutaDe(locale, clave, slug) : rutaDe(locale, clave),
      exacta,
    };
  });
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
