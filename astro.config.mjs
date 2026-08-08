// @ts-check
import { readdir, rename, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Dominio de producción. Base de canonical, hreflang, sitemap y Open Graph.
const SITE = 'https://juancamilo492.online';

/**
 * Publica las 404 por idioma como `dist/<lang>/404.html`.
 *
 * Astro solo trata como archivo suelto la 404 de la raíz; cualquier otra sale
 * como `404/index.html`, que es lo correcto para una página normal pero no
 * para esta. Cloudflare Pages busca el `404.html` más cercano subiendo por el
 * árbol de directorios, así que sin este movimiento no encontraría
 * `/fr/404.html` y le serviría la española a todo el mundo.
 *
 * Se resuelve moviendo el archivo y no con `build.format`, que cambiaría la
 * forma de todas las URLs del sitio. Recorre el disco en vez de leer la lista
 * de idiomas: un idioma nuevo queda cubierto sin tocar nada.
 */
function cuatroCeroCuatroPorIdioma() {
  return {
    name: 'cuatro-cero-cuatro-por-idioma',
    hooks: {
      /** @type {(opciones: { dir: URL, logger: { info: (mensaje: string) => void } }) => Promise<void>} */
      'astro:build:done': async ({ dir, logger }) => {
        const raiz = dir.pathname.replace(/^\/([A-Za-z]:)/, '$1');

        for (const entrada of await readdir(raiz, { withFileTypes: true })) {
          if (!entrada.isDirectory()) continue;

          const origen = join(raiz, entrada.name, '404', 'index.html');
          const destino = join(raiz, entrada.name, '404.html');
          const existe = await stat(origen).then(
            () => true,
            () => false,
          );
          if (!existe) continue;

          await rename(origen, destino);
          await rm(join(raiz, entrada.name, '404'), { recursive: true, force: true });
          logger.info(`404 de /${entrada.name}/ publicada como ${entrada.name}/404.html`);
        }
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  output: 'static',

  // Los 4 locales quedan configurados desde el día uno.
  // La visibilidad en el selector la controla LOCALES_ACTIVOS en src/i18n/ui.ts.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr', 'de'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  // `/` → `/es/`
  redirects: {
    '/': '/es/',
  },

  integrations: [
    cuatroCeroCuatroPorIdioma(),
    sitemap({
      /*
       * Solo páginas HTML. El build también produce endpoints (/robots.txt,
       * /llms.txt y las tarjetas de /og/), y esos no son documentos que un
       * buscador deba indexar como resultados.
       */
      filter: (pagina) =>
        !/\/(robots\.txt|llms\.txt)$/.test(pagina) &&
        !pagina.includes('/og/') &&
        // Los .md de cada caso son una representación alternativa del mismo
        // contenido, no una página aparte: la indexable es su HTML, que ya los
        // anuncia con `rel="alternate"`. Listarlos sería contenido duplicado.
        !/\.md$/.test(pagina) &&
        // Las 404 por idioma se generan como páginas, pero llevan `noindex` y
        // no son un resultado de búsqueda: no tienen nada que hacer aquí.
        !/\/404\/?$/.test(pagina),

      /*
       * Sin `i18n`: esa opción del plugin empareja los idiomas asumiendo que
       * la URL solo cambia en el prefijo de locale, y aquí los segmentos
       * también están traducidos (/es/proyectos/ ↔ /en/projects/). Emparejar
       * así declararía equivalencias falsas. El sitemap lista las URL y las
       * relaciones entre idiomas viven en el hreflang del HTML, que sí sabe
       * qué páginas existen en cada idioma (ver CLAUDE.md → SEO y GEO).
       */
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
