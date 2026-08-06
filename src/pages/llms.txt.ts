/**
 * llms.txt en el formato de llmstxt.org: un resumen en Markdown plano de quién
 * es Juan Camilo y qué hay en el sitio, pensado para que un modelo lo lea
 * entero sin rastrear el HTML.
 *
 * Se genera desde la colección `proyectos` y desde el diccionario de i18n, no
 * a mano: un caso nuevo aparece aquí solo con existir el .md, y un caso que se
 * retire desaparece. Así no queda un archivo que envejece en silencio.
 */
import type { APIRoute } from 'astro';
import { SITIO, UBICACION } from '../config/sitio';
import { DEFAULT_LOCALE, LOCALES_ACTIVOS, NOMBRE_LOCALE, type Locale } from '../i18n/ui';
import { rutaDe, useTranslations } from '../i18n/utils';
import { proyectosPorLocale } from '../lib/proyectos';
import { absoluta, siteDe } from '../lib/seo';

/** Una línea de lista de llms.txt: `- [Nombre](url): notas` */
const entrada = (nombre: string, url: string, notas: string) => `- [${nombre}](${url}): ${notas}`;

async function bloqueDeLocale(site: URL, locale: Locale): Promise<string[]> {
  const t = useTranslations(locale);
  const proyectos = await proyectosPorLocale(locale);
  const lineas: string[] = [];

  const paginas = [
    entrada(t('nav.inicio'), absoluta(site, rutaDe(locale)), t('meta.inicio.descripcion')),
    entrada(
      t('nav.proyectos'),
      absoluta(site, rutaDe(locale, 'proyectos')),
      t('meta.proyectos.descripcion'),
    ),
    entrada(
      t('nav.sobreMi'),
      absoluta(site, rutaDe(locale, 'sobreMi')),
      t('meta.sobreMi.descripcion'),
    ),
  ];

  const casos = proyectos.map((proyecto) => {
    const d = proyecto.data;
    const contexto = `${d.cliente} · ${d.año} · ${d.rol}`;
    return entrada(
      d.titulo,
      absoluta(site, rutaDe(locale, 'proyectos', d.slug)),
      `${contexto}. ${d.resumen}`,
    );
  });

  // El idioma principal manda las secciones; los demás van agrupados bajo su
  // propio nombre para que quede claro que son la misma obra en otra lengua.
  if (locale === DEFAULT_LOCALE) {
    if (casos.length > 0) lineas.push('## Casos de estudio', '', ...casos, '');
    lineas.push('## Páginas', '', ...paginas, '');
  } else {
    lineas.push(`## ${NOMBRE_LOCALE[locale]}`, '', ...paginas, ...casos, '');
  }

  return lineas;
}

export const GET: APIRoute = async ({ site }) => {
  const base = siteDe(site);
  const t = useTranslations(DEFAULT_LOCALE);

  const idiomas = LOCALES_ACTIVOS.map(
    (locale) => `${NOMBRE_LOCALE[locale]} (${absoluta(base, rutaDe(locale))})`,
  ).join(', ');

  const lineas: string[] = [
    `# ${SITIO.autor} — ${t('inicio.h1.parte1')} ${t('inicio.h1.enfasis')}`,
    '',
    `> ${t('meta.inicio.descripcion')}`,
    '',
    `Portafolio personal de ${SITIO.autor}, con base en ${UBICACION}. Los casos de estudio` +
      ' describen trabajo real con clientes y proyectos de investigación: diseño de' +
      ' interacción, automatización con IA, experiencias inmersivas e investigación de usuario.',
    '',
    `Idiomas del sitio: ${idiomas}. Los segmentos de las URL también están traducidos,` +
      ' así que /es/proyectos/ y /en/projects/ son la misma sección.',
    '',
    `Contacto: ${SITIO.correo} · LinkedIn ${SITIO.linkedin}`,
    '',
  ];

  for (const locale of LOCALES_ACTIVOS) {
    lineas.push(...(await bloqueDeLocale(base, locale)));
  }

  return new Response(`${lineas.join('\n').trimEnd()}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
