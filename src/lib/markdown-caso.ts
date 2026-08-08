/**
 * Arma la versión en Markdown plano de un caso de estudio, para el botón
 * «Copiar para LLM» de la plantilla de caso.
 *
 * Reusa el cuerpo crudo del `.md` (`proyecto.body`, sin renderizar) en vez de
 * volver a serializar el HTML de `<Content />`: es el mismo Markdown que ya
 * escribió Juan Camilo, así que no hace falta reconstruirlo ni arriesgar una
 * conversión con pérdida.
 */
import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';
import { rutaDe, useTranslations } from '../i18n/utils';
import { absoluta } from './seo';

export function markdownDeCaso(
  locale: Locale,
  proyecto: CollectionEntry<'proyectos'>,
  site: URL,
): string {
  const t = useTranslations(locale);
  const d = proyecto.data;

  const lineas = [
    `# ${d.titulo}`,
    '',
    `- **${t('proyectos.cliente')}:** ${d.cliente}`,
    `- **${t('proyectos.anio')}:** ${d.año}`,
    `- **${t('proyectos.rol')}:** ${d.rol}`,
    `- **${t('proyectos.herramientas')}:** ${d.herramientas.join(', ')}`,
    '',
    d.resumen,
    '',
    proyecto.body?.trim() ?? '',
  ];

  if (d.cita) {
    lineas.push('', `> ${d.cita}`);
    if (d.cita_autor) lineas.push(`>\n> — ${d.cita_autor}`);
  }

  const fuente = absoluta(site, rutaDe(locale, 'proyectos', d.slug));
  lineas.push('', `${t('proyectos.fuenteMarkdown')}: ${fuente}`);

  return `${lineas.join('\n').trimEnd()}\n`;
}
