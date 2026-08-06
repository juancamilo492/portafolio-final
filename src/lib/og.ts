/**
 * Tarjetas Open Graph 1200×630, una por página e idioma, generadas en el build.
 *
 * satori arma un SVG a partir de un árbol tipo JSX y sharp lo pasa a PNG.
 * satori no lee woff2 y `@fontsource-variable` solo publica ese formato, así
 * que las dos familias viven como TTF estáticos en `src/assets/og/`. Nadie los
 * importa desde el navegador: se leen del disco en build y no entran a `dist/`.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import type { Locale } from '../i18n/ui';

/** Paleta Esmeralda (espejo de los tokens de src/styles/global.css). */
const COLOR = {
  fondo: '#F9FFFE',
  profundo: '#005348',
  acento: '#00BD7B',
  acentoTexto: '#008259',
  jade: '#3AB071',
  menta: '#48D98B',
  cuerpo: '#3F6A5C',
  borde: 'rgba(0, 83, 72, 0.14)',
  onda: 'rgba(0, 189, 123, 0.15)',
} as const;

export const ANCHO_OG = 1200;
export const ALTO_OG = 630;

/** El dominio se dibuja en la tarjeta; sale de `Astro.site`, no a mano. */
export interface ContenidoOg {
  titulo: string;
  /** Bajada o resumen. Opcional: el 404 no tiene. */
  bajada?: string;
  /** Línea superior en versalitas: categorías del caso o el nombre de la sección. */
  etiqueta?: string;
  dominio: string;
}

/* -------------------------------------------------------------------------
   Rutas de las imágenes
   ------------------------------------------------------------------------- */

export type PaginaOg = 'inicio' | 'proyectos' | 'sobreMi' | 'caso';

/** Segmento fijo, sin traducir: la URL de la imagen no es una página del sitio. */
const SEGMENTO_OG: Record<Exclude<PaginaOg, 'caso'>, string> = {
  inicio: 'inicio',
  proyectos: 'proyectos',
  sobreMi: 'sobre-mi',
};

/**
 * Ruta de la tarjeta de una página. La comparten el endpoint que las genera y
 * las etiquetas `og:image`, así que nunca pueden desalinearse.
 */
export function rutaOg(locale: Locale, pagina: PaginaOg, slug?: string): string {
  if (pagina === 'caso') {
    if (!slug) throw new Error('rutaOg("caso") necesita el slug del proyecto.');
    return `/og/${locale}/proyecto/${slug}.png`;
  }
  return `/og/${locale}/${SEGMENTO_OG[pagina]}.png`;
}

/* -------------------------------------------------------------------------
   Fuentes
   ------------------------------------------------------------------------- */

const DIR_FUENTES = path.join(process.cwd(), 'src', 'assets', 'og');

type Fuentes = Awaited<ReturnType<typeof leerFuentes>>;

async function leerFuentes() {
  const [fraunces, interRegular, interSemibold] = await Promise.all([
    readFile(path.join(DIR_FUENTES, 'Fraunces-SemiBold.ttf')),
    readFile(path.join(DIR_FUENTES, 'Inter-Regular.ttf')),
    readFile(path.join(DIR_FUENTES, 'Inter-SemiBold.ttf')),
  ]);
  return [
    { name: 'Fraunces', data: fraunces, weight: 600 as const, style: 'normal' as const },
    { name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: interSemibold, weight: 600 as const, style: 'normal' as const },
  ];
}

// Una lectura por build, no una por tarjeta.
let fuentes: Promise<Fuentes> | undefined;
const cargarFuentes = () => (fuentes ??= leerFuentes());

/* -------------------------------------------------------------------------
   Plantilla
   ------------------------------------------------------------------------- */

type Estilo = Record<string, string | number>;
interface Nodo {
  type: string;
  props: { style: Estilo; children?: Nodo | Nodo[] | string };
}

const div = (style: Estilo, children?: Nodo | Nodo[] | string): Nodo => ({
  type: 'div',
  props: children === undefined ? { style } : { style, children },
});

/**
 * Corta en el último espacio antes del límite; nunca parte una palabra ni deja
 * colgando el separador de la lista de categorías («Inmersivo ·…»).
 */
function recortar(texto: string, maximo: number): string {
  if (texto.length <= maximo) return texto;
  const corte = texto.slice(0, maximo);
  const espacio = corte.lastIndexOf(' ');
  const base = espacio > maximo * 0.6 ? corte.slice(0, espacio) : corte;
  return `${base.replace(/[\s·,;:—–-]+$/, '')}…`;
}

/**
 * Cuerpo del título según su largo. El ancho útil es 1056 px y Fraunces
 * ronda 0,52 em por letra, así que el peor caso de la colección
 * («Siguiendo la huella azul…», 98 letras) cae en tres renglones a 44 px.
 */
function tamanoTitulo(largo: number): number {
  if (largo <= 42) return 64;
  if (largo <= 72) return 54;
  if (largo <= 112) return 44;
  return 38;
}

/** Las ondas concéntricas de la marca, resueltas con bordes redondos. */
function ondas(): Nodo[] {
  const centro = { x: 1140, y: 610 };
  return [320, 500, 680, 860].map((diametro) =>
    div({
      position: 'absolute',
      left: centro.x - diametro / 2,
      top: centro.y - diametro / 2,
      width: diametro,
      height: diametro,
      borderRadius: diametro,
      border: `2px solid ${COLOR.onda}`,
    }),
  );
}

function plantilla(contenido: ContenidoOg): Nodo {
  const { titulo, bajada, etiqueta, dominio } = contenido;
  const textoTitulo = recortar(titulo, 130);

  const centro: Nodo[] = [];
  if (etiqueta) {
    centro.push(
      div(
        {
          fontFamily: 'Inter',
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 2.6,
          textTransform: 'uppercase',
          color: COLOR.acentoTexto,
        },
        recortar(etiqueta, 64),
      ),
    );
  }

  centro.push(
    div(
      {
        marginTop: etiqueta ? 20 : 0,
        maxWidth: 900,
        fontFamily: 'Fraunces',
        fontWeight: 600,
        fontSize: tamanoTitulo(textoTitulo.length),
        lineHeight: 1.12,
        letterSpacing: -0.8,
        color: COLOR.profundo,
      },
      textoTitulo,
    ),
  );

  if (bajada) {
    centro.push(
      div(
        {
          marginTop: 22,
          maxWidth: 840,
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: 22,
          lineHeight: 1.5,
          color: COLOR.cuerpo,
        },
        recortar(bajada, 150),
      ),
    );
  }

  return div(
    {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: ANCHO_OG,
      height: ALTO_OG,
      padding: '58px 72px',
      backgroundColor: COLOR.fondo,
      fontFamily: 'Inter',
    },
    [
      ...ondas(),

      // Encabezado: monograma y nombre.
      div({ display: 'flex', alignItems: 'center' }, [
        div(
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 58,
            height: 58,
            borderRadius: 17,
            backgroundColor: COLOR.profundo,
            fontFamily: 'Fraunces',
            fontWeight: 600,
            fontSize: 23,
            color: COLOR.fondo,
          },
          'JC',
        ),
        div(
          {
            marginLeft: 18,
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: -0.2,
            color: COLOR.profundo,
          },
          'Juan Camilo Bolaños',
        ),
      ]),

      // Cuerpo.
      div(
        {
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
          paddingTop: 24,
        },
        centro,
      ),

      // Pie: dominio y los tres verdes de apoyo.
      div(
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 24,
          borderTop: `1px solid ${COLOR.borde}`,
        },
        [
          div(
            {
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 19,
              letterSpacing: 1,
              color: COLOR.acentoTexto,
            },
            dominio,
          ),
          div(
            { display: 'flex', alignItems: 'center' },
            [COLOR.acento, COLOR.jade, COLOR.menta].map((color, indice) =>
              div({
                width: 10,
                height: 10,
                marginLeft: indice === 0 ? 0 : 8,
                borderRadius: 10,
                backgroundColor: color,
              }),
            ),
          ),
        ],
      ),
    ],
  );
}

/* -------------------------------------------------------------------------
   Render
   ------------------------------------------------------------------------- */

/** SVG de satori → PNG de sharp. */
export async function pngOpenGraph(contenido: ContenidoOg): Promise<Buffer> {
  const svg = await satori(plantilla(contenido) as never, {
    width: ANCHO_OG,
    height: ALTO_OG,
    fonts: await cargarFuentes(),
  });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
