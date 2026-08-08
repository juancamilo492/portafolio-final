/**
 * robots.txt como endpoint y no como archivo estático: así el `Sitemap:` sale
 * del `site` de astro.config.mjs y no queda un dominio escrito a mano que se
 * desactualice al mover el proyecto.
 *
 * Abierto de par en par, incluidos los rastreadores de IA (GPTBot, ClaudeBot,
 * PerplexityBot y compañía): el objetivo del portafolio es justamente que lo
 * encuentren, y /llms.txt está hecho para ellos.
 *
 * El `Content-Signal` se escribe aquí a mano desde FASE 11. Lo ponía el
 * robots.txt gestionado de Cloudflare, pero ese venía junto a un `Disallow: /`
 * para ClaudeBot, GPTBot, Google-Extended y seis más, que dejaba sin efecto
 * todo lo que este sitio publica para agentes. Al apagarlo en el panel se
 * perdían las dos cosas, y la declaración sí interesa conservarla: son cosas
 * distintas. Dice, en el vocabulario de la Content Signals Policy: indéxame
 * para búsqueda, puedes citarme, no me uses como material de entrenamiento.
 * Es una preferencia declarada, no un bloqueo, y quien no la respete puede
 * rastrear igual.
 */
import type { APIRoute } from 'astro';
import { siteDe } from '../lib/seo';

export const GET: APIRoute = ({ site }) => {
  const base = siteDe(site);

  const cuerpo = `# Portafolio de Juan Camilo Bolaños
# Sin restricciones de rastreo: los buscadores y los modelos de lenguaje son
# bienvenidos. Resumen legible para modelos en ${new URL('/llms.txt', base).href}
#
# Content-Signal declara el uso que se prefiere, no bloquea el acceso:
#   search=yes     indexar y enlazar en resultados de búsqueda
#   ai-input=yes   usar el contenido para responder citando la fuente
#   ai-train=no    no usarlo para entrenar ni afinar modelos

User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

Sitemap: ${new URL('/sitemap-index.xml', base).href}
`;

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
