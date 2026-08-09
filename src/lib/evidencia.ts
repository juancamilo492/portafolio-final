/**
 * Piezas de evidencia dentro del cuerpo de un caso de estudio.
 *
 * Cuatro directivas de contenedor (`:::`) que el motor de Markdown de Astro 7
 * ya sabe parsear con `features.directive`. Este plugin las traduce a marcado
 * usando `hName`/`hProperties`, el contrato estándar de mdast→hast.
 *
 *   :::figura{ancho ampliar}   una imagen con pie
 *   :::galeria                 varias imágenes con un pie común
 *   :::video{youtube="ID"}     fachada de video, sin iframe hasta el clic
 *   :::enlace-vivo{href="…"}   tarjeta hacia un producto en línea
 *
 * ── Por qué un plugin mdast y no uno hast ──────────────────────────────────
 * En mdast la imagen sigue siendo un nodo `image` con su ruta relativa, y
 * `collect-images` —que `@astrojs/markdown-satteri` añade DESPUÉS de los
 * plugins del usuario— la recoge en `localImagePaths`. Eso es lo que hace que
 * `astro:assets` la optimice igual que a la portada del caso. Escribir el
 * `<img>` a mano, en hast o como HTML crudo dentro del `.md`, perdería la
 * optimización, el webp y el srcset.
 *
 * ── Por qué nunca se pasa `widths` ─────────────────────────────────────────
 * El puente hacia el motor (que es Rust) vacía los arrays de números:
 * `widths: [480, 720, 960]` llega al `<img>` como `widths=""`. Comprobado.
 * Los arrays de cadenas sí sobreviven, unidos por espacios, pero pasarle
 * anchos como texto a `getImage()` es pedir un fallo silencioso. En su lugar
 * se pasa `width` + `layout: 'constrained'` y `getWidths()` los deriva de
 * `image.breakpoints` (astro.config.ts). `sizes` explícito sí se respeta:
 * `astro/dist/assets/internal.js` hace `resolvedOptions.sizes ||= …`.
 *
 * ── Por qué el pie no va en el `title` de la imagen ────────────────────────
 * `![alt](x.png "pie")` sería más corto, pero el `title` no pasa por la
 * puntuación tipográfica y el resto del cuerpo sí: un pie con apóstrofe
 * saldría recto al lado de prosa con apóstrofes curvos. Es el mismo problema
 * que documenta FASE 6 para el frontmatter. En el cuerpo de la directiva el
 * pie además admite negrita y enlaces.
 */
import { existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { defineMdastPlugin, type MdastContent, type MdastPluginDefinition } from 'satteri';
import type { MdastNode } from 'satteri';
import { DEFAULT_LOCALE, LOCALES, type ClaveUI, type Locale } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
import { AMPLIAR, ENLACE_EXTERNO, PLAY } from './iconos-evidencia';

/**
 * Anchos de presentación, en píxeles CSS.
 *
 * `normal` es la columna de lectura. `ancho` es la celda entera del grid a
 * partir de 1200px: 1200 del contenedor − 80 de padding − 220 del índice
 * lateral − 56 del gap. No llega a los 1120 del contenedor porque hacerlo
 * exigiría un margen negativo que metería la figura debajo del índice
 * `sticky`; para leer una pieza densa está el enlace «Ampliar».
 * `galeria` es media celda ancha, menos el gap.
 */
const ANCHO = { normal: 680, ancho: 844, galeria: 414 } as const;

type Tratamiento = keyof typeof ANCHO;

const SIZES: Record<Tratamiento, string> = {
  normal: '(min-width: 720px) 680px, calc(100vw - 40px)',
  ancho:
    '(min-width: 1200px) 844px, (min-width: 1024px) calc(100vw - 356px),' +
    ' (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)',
  galeria:
    '(min-width: 1200px) 414px, (min-width: 1024px) calc((100vw - 372px) / 2),' +
    ' (min-width: 768px) calc((100vw - 96px) / 2), (min-width: 640px) calc((100vw - 56px) / 2),' +
    ' calc(100vw - 40px)',
};

/** Etiqueta de la píldora de estado de `:::enlace-vivo`. */
const ESTADO: Record<string, ClaveUI> = {
  produccion: 'proyectos.estadoProduccion',
  prototipo: 'proyectos.estadoPrototipo',
  demo: 'proyectos.estadoDemo',
};

/** Escapa un valor para meterlo entre comillas dobles en HTML crudo. */
function attr(valor: string): string {
  return valor.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/** Escapa texto para HTML crudo. */
function texto(valor: string): string {
  return valor.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** `…/src/content/proyectos/fr/i-homotic.md` → `fr`. */
function localeDeArchivo(fileURL: URL | undefined): Locale {
  const carpeta = fileURL?.pathname.split('/').at(-2);
  return (LOCALES as readonly string[]).includes(carpeta ?? '')
    ? (carpeta as Locale)
    : DEFAULT_LOCALE;
}

/** `…/es/i-homotic.md` → `i-homotic`. De ahí sale `/evidencia/<slug>/`. */
function slugDeArchivo(fileURL: URL | undefined): string {
  return fileURL ? basename(decodeURIComponent(fileURL.pathname), '.md') : '';
}

/** Props que `getImage()` recibirá vía el marcador `__ASTRO_IMAGE_`. */
function propsDeImagen(tratamiento: Tratamiento) {
  return {
    width: ANCHO[tratamiento],
    sizes: SIZES[tratamiento],
    layout: 'constrained',
    // Ninguna figura del cuerpo compite con la portada, que es el LCP del
    // caso. No hay forma de pedir una figura ansiosa desde el `.md`, y es a
    // propósito.
    loading: 'lazy',
    decoding: 'async',
  };
}

/** ¿Es un párrafo que solo contiene una imagen? */
function esParrafoImagen(nodo: MdastNode): boolean {
  return (
    nodo.type === 'paragraph' &&
    nodo.children?.length === 1 &&
    nodo.children[0]?.type === 'image'
  );
}

/**
 * Cómo se avisa de un error, y por qué así.
 *
 * Dos caminos descartados, los dos comprobados a mano:
 *
 * 1. `ctx.report()`. Existe en la interfaz del visitante, pero **nadie llama a
 *    `getDiagnostics()`**, ni en el motor ni en Astro. Un `report` no imprime
 *    nada, en ningún sitio.
 * 2. `throw`. No rompe el build: hace que ESE documento se renderice como
 *    cadena vacía y el build termina en verde. El caso se publica con
 *    `<div class="prosa"></div>`, sin una línea de su contenido y sin un solo
 *    mensaje. Es mucho peor que el problema que trataba de resolver.
 *
 * Queda entonces lo que sí funciona, y se usan las dos cosas a la vez:
 *
 * - Un `[PENDIENTE: …]` **en la página**, el mismo formato que el resto del
 *   proyecto usa para el contenido que falta. Es lo que de verdad se ve.
 * - Un `console.warn` en el build, para quien mira la consola.
 *
 * Importa porque una directiva mal escrita (`:::figrua`) desaparecería del
 * HTML con todo su contenido y sin decir nada: es el comportamiento por
 * defecto del motor y el riesgo número uno de esta gramática.
 */
function donde(fileURL: URL | undefined): string {
  return fileURL ? decodeURIComponent(fileURL.pathname).split('/').slice(-3).join('/') : '?';
}

/** Aviso solo en consola, para lo que degrada sin engañar a nadie. */
function avisar(fileURL: URL | undefined, mensaje: string): void {
  console.warn(`[evidencia] ${donde(fileURL)}: ${mensaje}`);
}

/** Marcador visible en la página, más el aviso en consola. */
function marcar(fileURL: URL | undefined, mensaje: string) {
  avisar(fileURL, mensaje);
  return {
    type: 'paragraph' as const,
    children: [{ type: 'text' as const, value: `[PENDIENTE: ${mensaje}]` }],
  };
}

/** Coletilla `sr-only` que avisa de la pestaña nueva, detrás del texto visible. */
function coletilla(t: (clave: ClaveUI) => string): string {
  return `<span class="sr-only"> ${texto(t('proyectos.nuevaPestana'))}</span>`;
}

/**
 * Un nodo de bloque que se renderiza como el elemento que se le pida.
 *
 * Se construye sobre `paragraph` porque es el nodo de bloque más simple que
 * admite hijos en línea, y `hName` lo convierte en `<a>`, `<p>` o lo que haga
 * falta sin el `<p>` envolvente que añadiría el HTML crudo.
 *
 * El cast es necesario y está acotado: `data` es un saco abierto que el puente
 * serializa a JSON —así lo documenta la sobrecarga de `setProperty`, que
 * acepta `Record<string, unknown>`—, pero cada tipo de nodo declara su `data`
 * concreto (`ParagraphData`), que no conoce `hName`. El contrato real es el de
 * mdast→hast, no el de la interfaz del nodo.
 */
function elemento(
  hName: string,
  hProperties: Record<string, unknown>,
  children: unknown[],
): MdastContent {
  return { type: 'paragraph', data: { hName, hProperties }, children } as MdastContent;
}

export function evidencia(): MdastPluginDefinition {
  return defineMdastPlugin({
    name: 'evidencia',

    containerDirective(nodo, ctx) {
      const locale = localeDeArchivo(ctx.fileURL);
      const t = useTranslations(locale);
      const atributos = nodo.attributes ?? {};
      const hijos = [...(nodo.children ?? [])];

      /**
       * Convierte los párrafos de imagen en nodos `image` con sus props, y
       * devuelve el último párrafo de texto, que es el pie. Los párrafos de
       * texto anteriores al último se quedan como `<p>`: un `<figure>` solo
       * admite un `<figcaption>`.
       */
      const repartir = (tratamiento: Tratamiento) => {
        const textos = hijos.filter((h) => h.type === 'paragraph' && !esParrafoImagen(h));
        const pie = textos.at(-1);
        let imagenes = 0;

        for (const hijo of hijos) {
          if (esParrafoImagen(hijo)) {
            const img = (hijo as { children: { url?: string; alt?: string }[] }).children[0];
            // Aviso y no error: una imagen sin alt se degrada a decorativa,
            // que no rompe nada pero desperdicia información. Misma regla que
            // el `imagen_alt` opcional de la portada (FASE 11).
            if (!img.alt) avisar(ctx.fileURL, `imagen sin texto alternativo: ${img.url ?? '?'}`);
            ctx.replaceNode(hijo, {
              type: 'image',
              url: img.url ?? '',
              alt: img.alt ?? '',
              data: { hProperties: propsDeImagen(tratamiento) },
            });
            imagenes += 1;
          } else if (hijo === pie) {
            ctx.setProperty(hijo, 'data', { hName: 'figcaption' });
          }
        }
        return { pie, imagenes };
      };

      switch (nodo.name) {
        /* ─────────────── :::figura ─────────────── */
        case 'figura': {
          const ancho = 'ancho' in atributos;
          const { pie, imagenes } = repartir(ancho ? 'ancho' : 'normal');

          ctx.setProperty(nodo, 'data', {
            hName: 'figure',
            hProperties: {
              className: ['ev-figura'],
              ...(ancho ? { 'data-ancho': '' } : {}),
            },
          });

          if (imagenes === 0) {
            ctx.replaceNode(nodo, marcar(ctx.fileURL, 'una :::figura sin imagen'));
            return;
          }

          if ('ampliar' in atributos) {
            const primera = hijos.find(esParrafoImagen) as
              | { children: { url?: string }[] }
              | undefined;
            const archivo = basename(primera?.children[0]?.url ?? '');
            const href = atributos.ampliar || `/evidencia/${slugDeArchivo(ctx.fileURL)}/${archivo}`;

            // Nunca se publica el enlace sin comprobar que el archivo está: un
            // «Ampliar» hacia un 404 es peor que no ofrecer ampliar.
            const falta = !existsSync(join(process.cwd(), 'public', href));
            if (falta) avisar(ctx.fileURL, `«ampliar» apunta a public${href}, que no existe`);

            const enlace = falta
              ? ` [PENDIENTE: falta public${texto(href)}]`
              : ` <a class="ev-ampliar" href="${attr(href)}" target="_blank" rel="noopener">` +
                `${texto(t('proyectos.ampliarImagen'))}${AMPLIAR}${coletilla(t)}</a>`;

            // Dentro del pie, no como bloque aparte: se lee como parte de él y
            // así no hay que posicionarlo sobre la imagen.
            if (pie) ctx.appendChild(pie, { type: 'html', value: enlace });
            else
              ctx.appendChild(
                nodo,
                elemento('figcaption', {}, [{ type: 'html', value: enlace.trimStart() }]),
              );
          }
          return;
        }

        /* ─────────────── :::galeria ─────────────── */
        case 'galeria': {
          // Las imágenes son hijas directas del `<figure>` y las coloca una
          // rejilla CSS; el pie ocupa la fila entera con `grid-column: 1/-1`.
          // Así no hace falta un `<div>` envoltorio.
          const { imagenes } = repartir('galeria');

          ctx.setProperty(nodo, 'data', {
            hName: 'figure',
            hProperties: { className: ['ev-galeria'] },
          });

          // Aviso y no error: una galería de una sola imagen se ve bien, solo
          // que :::figura la describe mejor.
          if (imagenes < 2) {
            avisar(ctx.fileURL, `una :::galeria con ${imagenes} imagen(es): usa :::figura`);
          }
          return;
        }

        /* ─────────────── :::video ─────────────── */
        case 'video': {
          const id = atributos.youtube ?? '';
          if (!/^[\w-]{11}$/.test(id)) {
            ctx.replaceNode(
              nodo,
              marcar(ctx.fileURL, `:::video con un identificador de YouTube inválido: «${id}»`),
            );
            return;
          }

          const { imagenes } = repartir('ancho' in atributos ? 'ancho' : 'normal');
          // Sin miniatura no hay fachada: quedaría un botón de play sobre nada.
          if (imagenes === 0) {
            ctx.replaceNode(nodo, marcar(ctx.fileURL, ':::video sin miniatura propia'));
            return;
          }

          ctx.setProperty(nodo, 'data', {
            hName: 'figure',
            hProperties: {
              className: ['ev-video'],
              'data-video': id,
              'data-video-titulo': atributos.titulo ?? '',
              'data-video-reproducir': t('proyectos.reproducirVideo'),
              ...('ancho' in atributos ? { 'data-ancho': '' } : {}),
            },
          });

          /*
           * El disparador nace como enlace a YouTube, no como `<button>`: es
           * lo único que mantiene el video alcanzable si el script no corre.
           * Misma razón que «Ver como Markdown» (FASE 11). El script lo
           * asciende a botón de reproducción y le quita la promesa de pestaña
           * nueva. No lleva `role="button"`: mentiría en el estado sin JS,
           * donde de verdad es un enlace.
           */
          ctx.appendChild(
            nodo,
            elemento(
              'a',
              {
                className: ['ev-play'],
                href: `https://www.youtube.com/watch?v=${id}`,
                target: '_blank',
                rel: 'noopener',
                'data-video-play': '',
              },
              [
                { type: 'html', value: PLAY },
                {
                  type: 'html',
                  value:
                    `<span class="sr-only">${texto(t('proyectos.verVideo'))}</span>` +
                    `<span class="sr-only" data-video-nueva-pestana> ${texto(t('proyectos.nuevaPestana'))}</span>`,
                },
              ],
            ),
          );
          return;
        }

        /* ─────────────── :::enlace-vivo ─────────────── */
        case 'enlace-vivo': {
          const href = atributos.href ?? '';
          if (!/^https?:\/\//.test(href)) {
            ctx.replaceNode(
              nodo,
              marcar(ctx.fileURL, `:::enlace-vivo sin una dirección absoluta: «${href}»`),
            );
            return;
          }

          const estado = atributos.estado ?? 'produccion';
          const clave = ESTADO[estado];
          if (!clave) {
            ctx.replaceNode(
              nodo,
              marcar(
                ctx.fileURL,
                `:::enlace-vivo con estado «${estado}». Son produccion, prototipo o demo.`,
              ),
            );
            return;
          }

          ctx.setProperty(nodo, 'data', {
            hName: 'aside',
            hProperties: { className: ['ev-vivo'] },
          });

          // La píldora de estado va primero y dice qué hay detrás del enlace
          // antes de que nadie lo pulse: un prototipo anunciado como prototipo
          // suma; descubierto por sorpresa, resta.
          ctx.prependChild(
            nodo,
            elemento('p', { className: ['ev-vivo-estado'] }, [
              { type: 'text', value: t(clave ?? 'proyectos.estadoProduccion') },
            ]),
          );

          ctx.appendChild(
            nodo,
            elemento(
              'a',
              { className: ['ev-vivo-boton'], href, target: '_blank', rel: 'noopener' },
              [
                { type: 'text', value: atributos.etiqueta || t('proyectos.verSitio') },
                { type: 'html', value: ENLACE_EXTERNO + coletilla(t) },
              ],
            ),
          );
          return;
        }

        /* ─────────────── cualquier otra ─────────────── */
        default:
          /*
           * Sin esto, una directiva mal escrita (`:::figrua`) desaparecería
           * del HTML con todo su contenido y sin decir una palabra: es el
           * comportamiento por defecto del motor y el riesgo número uno de
           * esta gramática. Un párrafo que se esfuma en silencio no lo detecta
           * nadie hasta que el caso ya está publicado.
           */
          // `replaceNode` y no `insertBefore`: insertar antes de un contenedor
          // que el motor va a descartar deja el documento entero en blanco, en
          // silencio. Comprobado con `:::figrua`.
          ctx.replaceNode(
            nodo,
            marcar(
              ctx.fileURL,
              `directiva desconocida «${nodo.name}». Son figura, galeria, video y enlace-vivo.`,
            ),
          );
      }
    },

    /*
     * Con `directive` encendido, `::algo` y `:algo` también se parsean, y sin
     * un handler se comerían su texto igual de callado. Esta gramática no usa
     * ninguna de las dos formas.
     */
    leafDirective(nodo, ctx) {
      ctx.replaceNode(
        nodo,
        marcar(
          ctx.fileURL,
          `directiva de línea «::${nodo.name}»: la evidencia usa bloques «:::», no líneas sueltas.`,
        ),
      );
    },

    /*
     * La de texto sí se deja pasar, devolviendo el literal: `:` seguido de
     * letras aparece en prosa normal (una hora, «nota:algo») y romper el build
     * por eso sería intratable. Los 18 casos actuales no producen ninguna,
     * comprobado con el diff byte a byte.
     */
    textDirective(nodo, ctx) {
      ctx.replaceNode(nodo, { type: 'text', value: `:${nodo.name}` });
    },
  });
}
