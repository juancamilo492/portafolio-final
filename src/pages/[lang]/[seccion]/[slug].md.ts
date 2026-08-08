/**
 * Cada caso de estudio en Markdown plano: `/es/proyectos/industrial.md`.
 *
 * El contenido ya existía —`markdownDeCaso()` lo arma para el botón «Copiar
 * para LLM»—, pero solo viajaba codificado en base64 dentro de un atributo
 * `data-`, de modo que ningún rastreador podía leerlo. Publicarlo como URL le
 * da a un agente la misma información sin tener que interpretar el HTML, y no
 * duplica nada: es el mismo texto que ya se ve en la página.
 *
 * No entra al sitemap (ver el filtro de `astro.config.mjs`): la versión
 * canónica e indexable de cada caso es su HTML, y estos archivos son una
 * representación alternativa que el propio HTML anuncia con
 * `<link rel="alternate" type="text/markdown">`.
 *
 * `/es/proyectos/industrial.md` y `/es/proyectos/industrial/` no colisionan:
 * uno es un archivo y el otro un directorio con su `index.html`.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { LOCALES_ACTIVOS } from '../../../i18n/ui';
import { segmento } from '../../../i18n/utils';
import { markdownDeCaso } from '../../../lib/markdown-caso';
import { localeDeEntrada, proyectosPorLocale, type Proyecto } from '../../../lib/proyectos';
import { siteDe } from '../../../lib/seo';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  for (const lang of LOCALES_ACTIVOS) {
    for (const proyecto of await proyectosPorLocale(lang)) {
      paths.push({
        params: { lang, seccion: segmento(lang, 'proyectos'), slug: proyecto.data.slug },
        props: { proyecto },
      });
    }
  }
  return paths;
};

export const GET: APIRoute = ({ props, site }) => {
  // El idioma sale de la entrada, no del parámetro: el id de la colección es
  // `<locale>/<slug>` y es la misma fuente que usa la plantilla HTML.
  const { proyecto } = props as { proyecto: Proyecto };

  return new Response(markdownDeCaso(localeDeEntrada(proyecto), proyecto, siteDe(site)), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
