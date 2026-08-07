/**
 * Ayudas de URL para todo lo que sale del sitio hacia afuera: canonical,
 * hreflang, Open Graph, JSON-LD, sitemap, robots.txt y llms.txt.
 * Regla única: nada de rutas relativas, los rastreadores y los modelos leen
 * esos bloques fuera del contexto de la página.
 */
import { SITIO } from '../config/sitio';

/** `Astro.site`, o un error de build claro si alguien lo quita de la config. */
export function siteDe(site: URL | undefined): URL {
  if (site) return site;
  throw new Error(
    'Falta `site` en astro.config.mjs: canonical, hreflang, Open Graph y JSON-LD necesitan el dominio.',
  );
}

/** Ruta del sitio (`/es/proyectos/`) → URL absoluta. */
export function absoluta(site: URL, ruta: string): string {
  return new URL(ruta, site).href;
}

/**
 * Sufijo de marca para el `<title>` del documento: «Proyectos» solo es único
 * dentro del sitio, y en un resultado de búsqueda no dice de quién es.
 * Va aparte del H1, que sigue siendo el nombre corto de la sección, y del
 * `og:title`, donde el nombre ya lo pone `og:site_name`.
 * El separador y el nombre no se traducen: es un nombre propio.
 */
export function conMarca(titulo: string): string {
  return `${titulo} — ${SITIO.autor}`;
}
