// @ts-check
import { defineConfig } from 'astro/config';
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

  vite: {
    plugins: [tailwindcss()],
  },
});
