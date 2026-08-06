// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Dominio de producción. Base de canonical, hreflang, sitemap y Open Graph.
const SITE = 'https://juancamilo492.online';

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
    sitemap({
      /*
       * Solo páginas HTML. El build también produce endpoints (/robots.txt,
       * /llms.txt y las tarjetas de /og/), y esos no son documentos que un
       * buscador deba indexar como resultados.
       */
      filter: (pagina) =>
        !/\/(robots\.txt|llms\.txt)$/.test(pagina) && !pagina.includes('/og/'),

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
