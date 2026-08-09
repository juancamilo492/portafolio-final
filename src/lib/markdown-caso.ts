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
import type { ClaveUI, Locale } from '../i18n/ui';
import { rutaDe, useTranslations } from '../i18n/utils';
import { absoluta } from './seo';

/** `:::nombre{atributos}` … `:::`, con su cuerpo. */
const BLOQUE = /^:::([a-z-]+)([^\n]*)\n([\s\S]*?)^:::[ \t]*$/gm;
/** `![alt](ruta)` */
const IMAGEN = /!\[([^\]]*)\]\([^)]*\)/g;
/** `clave="valor"` dentro de las llaves de una directiva. */
const ATRIBUTO = /([a-z-]+)="([^"]*)"/g;

const ESTADO: Record<string, ClaveUI> = {
  produccion: 'proyectos.estadoProduccion',
  prototipo: 'proyectos.estadoPrototipo',
  demo: 'proyectos.estadoDemo',
};

/**
 * Aplana las piezas de evidencia del cuerpo para la versión pública en
 * Markdown, la que sirve `/es/proyectos/<slug>.md` y la que copia el botón
 * «Copiar para LLM».
 *
 * Se convierten a texto y no a imágenes enlazadas porque quien lee este
 * archivo es un modelo de lenguaje o un ATS, no un navegador: la ruta relativa
 * a `src/assets/` no resuelve desde el dominio, y la URL optimizada que sí
 * resolvería (`/_astro/x.HASH.webp`) cambia en cada build y no significa nada
 * leída. Lo que sí transporta información es el texto alternativo y el pie,
 * que ya están escritos y traducidos.
 *
 * Se conservan las tres direcciones que un lector puede abrir: el video, el
 * sitio en vivo y la imagen ampliable, esta última hecha absoluta porque vive
 * en `public/` y su URL es estable.
 */
export function cuerpoLegible(
  body: string,
  t: (clave: ClaveUI) => string,
  site: URL,
): string {
  return body.replace(BLOQUE, (_todo, nombre: string, llaves: string, dentro: string) => {
    const attrs: Record<string, string> = {};
    for (const [, clave, valor] of llaves.matchAll(ATRIBUTO)) attrs[clave] = valor;

    const alts = [...dentro.matchAll(IMAGEN)].map((m) => m[1]).filter(Boolean);
    // Lo que queda al quitar las imágenes: el pie y cualquier párrafo previo.
    const prosa = dentro.replace(IMAGEN, '').trim();

    const lineas: string[] = [];

    switch (nombre) {
      case 'figura':
      case 'galeria':
        for (const alt of alts) lineas.push(`[${t('proyectos.mdImagen')}: ${alt}]`);
        if (/\bampliar\b/.test(llaves)) {
          // La misma URL que el enlace «Ampliar» del HTML, en absoluto.
          const href = attrs.ampliar || rutaAmpliar(dentro);
          if (href) {
            lineas.push(`[${t('proyectos.mdImagenCompleta')}: ${absoluta(site, href)}]`);
          }
        }
        break;

      case 'enlace-vivo': {
        const estado = t(ESTADO[attrs.estado ?? 'produccion'] ?? 'proyectos.estadoProduccion');
        const etiqueta = attrs.etiqueta || attrs.href;
        lineas.push(`[${t('proyectos.mdSitio')} (${estado}): ${etiqueta} — ${attrs.href ?? ''}]`);
        break;
      }

      case 'video':
        lineas.push(
          `[${t('proyectos.mdVideo')}: ${attrs.titulo ?? ''} — ` +
            `https://www.youtube.com/watch?v=${attrs.youtube ?? ''}]`,
        );
        break;

      // Una directiva desconocida ya sale marcada en el HTML; aquí se deja el
      // texto que llevara dentro, que es lo único aprovechable.
      default:
        break;
    }

    if (prosa) lineas.push(prosa);
    return lineas.join('\n');
  });
}

/** `/evidencia/<slug>/<archivo>` deducido de la primera imagen del bloque. */
function rutaAmpliar(dentro: string): string {
  const ruta = dentro.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1] ?? '';
  const partes = ruta.split('/');
  const archivo = partes.at(-1) ?? '';
  // `…/assets/proyectos/<slug>/<archivo>` → el penúltimo segmento es el slug.
  const slug = partes.at(-2) ?? '';
  return archivo && slug ? `/evidencia/${slug}/${archivo}` : '';
}

/**
 * URL de la versión en Markdown de un caso: `/es/proyectos/industrial.md`.
 *
 * Una sola fuente para las tres cosas que tienen que coincidir: el endpoint que
 * la genera, el `rel="alternate"` que la anuncia desde el HTML y el enlace de
 * llms.txt. No colisiona con `/es/proyectos/industrial/`, que es un directorio.
 */
export function rutaMarkdownDeCaso(locale: Locale, slug: string): string {
  return `${rutaDe(locale, 'proyectos', slug).replace(/\/$/, '')}.md`;
}

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
    cuerpoLegible(proyecto.body?.trim() ?? '', t, site),
  ];

  if (d.sitio_url) {
    lineas.push('', `${t('proyectos.sitioWeb')}: ${d.sitio_url}`);
  }

  if (d.cita) {
    lineas.push('', `> ${d.cita}`);
    if (d.cita_autor) lineas.push(`>\n> — ${d.cita_autor}`);
  }

  const fuente = absoluta(site, rutaDe(locale, 'proyectos', d.slug));
  lineas.push('', `${t('proyectos.fuenteMarkdown')}: ${fuente}`);

  return `${lineas.join('\n').trimEnd()}\n`;
}
