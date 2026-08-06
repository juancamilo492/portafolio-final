/**
 * robots.txt como endpoint y no como archivo estático: así el `Sitemap:` sale
 * del `site` de astro.config.mjs y no queda un dominio escrito a mano que se
 * desactualice al mover el proyecto.
 *
 * Abierto de par en par, incluidos los rastreadores de IA (GPTBot, ClaudeBot,
 * PerplexityBot y compañía): el objetivo del portafolio es justamente que lo
 * encuentren, y /llms.txt está hecho para ellos.
 */
import type { APIRoute } from 'astro';
import { siteDe } from '../lib/seo';

export const GET: APIRoute = ({ site }) => {
  const base = siteDe(site);

  const cuerpo = `# Portafolio de Juan Camilo Bolaños
# Sin restricciones: los rastreadores de buscadores y de modelos de lenguaje
# son bienvenidos. Resumen legible para modelos en ${new URL('/llms.txt', base).href}

User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap-index.xml', base).href}
`;

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
