/**
 * Tarjetas Open Graph 1200×630, una por página e idioma, generadas en el build.
 *
 * satori arma un SVG a partir de un árbol tipo JSX y sharp lo pasa a PNG.
 * satori no lee woff2 y `@fontsource-variable` solo publica ese formato, así
 * que las dos familias viven como TTF estáticos en `src/assets/og/`. Nadie los
 * importa desde el navegador: se leen del disco en build y no entran a `dist/`.
 *
 * La piel es la del banner de LinkedIn: degradado sobre los verdes de noche,
 * ondas y miras en menta translúcida, y el oso de la marca en blanco. Un enlace
 * compartido tiene que parecerse al perfil desde el que se llega.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import logoSvg from '../assets/marca/logo.svg?raw';
import type { Locale } from '../i18n/ui';

/** Paleta Esmeralda (espejo de los tokens de src/styles/global.css). */
const COLOR = {
  /* Fondo: los tres tramos del degradado, de la esquina oscura a la clara. */
  nocheFooter: '#06231C', // --color-noche-footer
  noche: '#0B2A22', // --color-noche
  profundoClaro: '#0D4335', // derivado de --color-profundo
  /* Texto sobre esos verdes. */
  titulo: '#EAFBF4', // --color-noche-titulo
  cuerpo: '#9CBDB2', // --color-noche-cuerpo
  menta: '#48D98B', // --color-menta
  /* Detalles. */
  acento: '#00BD7B',
  jade: '#3AB071',
  borde: 'rgba(72, 217, 139, 0.16)', // --color-borde-noche
  onda: 'rgba(72, 217, 139, 0.09)', // el --ondas-color de `.dark .ondas`
  mira: 'rgba(72, 217, 139, 0.28)',
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
   Logo
   ------------------------------------------------------------------------- */

/**
 * El oso de la marca, el mismo dibujo del favicon y de `Logo.astro`.
 *
 * Entra por `?raw` y no por `process.cwd()` como las fuentes: Vite inlinea el
 * string en el bundle del build, así que no depende del directorio de trabajo
 * y el archivo no se emite a `dist/`.
 *
 * satori no dibuja un SVG suelto como árbol de nodos, pero sí acepta datos
 * binarios en `src` (ver su README). sharp, que ya está aquí para el PNG final,
 * lo rasteriza una sola vez por build. Los dos paths del archivo ya vienen en
 * blanco, que es como va sobre el fondo oscuro, y el PNG conserva el alfa: el
 * hueco entre el hocico y la cabeza deja ver el degradado, igual que en el sitio.
 */
const LOGO_ANCHO = 56;
const LOGO_ALTO = Math.round((LOGO_ANCHO * 130) / 162);

/**
 * satori pide un `ArrayBuffer`: el `Buffer` de Node que devuelve sharp es una
 * vista sobre un búfer compartido y su `DataView` revienta. Se copia el rango
 * exacto, que además desliga el PNG del pool de sharp.
 */
const aArrayBuffer = (buf: Buffer): ArrayBuffer =>
  buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;

let logo: Promise<ArrayBuffer> | undefined;
const cargarLogo = () =>
  (logo ??= sharp(Buffer.from(logoSvg), { density: 400 })
    // 2× el tamaño de uso: a 1200 px de ancho el borde del oso se nota.
    .resize({ width: LOGO_ANCHO * 2 })
    .png()
    .toBuffer()
    .then(aArrayBuffer));

/* -------------------------------------------------------------------------
   Plantilla
   ------------------------------------------------------------------------- */

type Estilo = Record<string, string | number>;
interface Nodo {
  type: string;
  props: {
    style: Estilo;
    children?: Nodo | Nodo[] | string;
    /** Solo en `img`: satori acepta los bytes del PNG sin pasar por base64. */
    src?: ArrayBuffer;
    width?: number;
    height?: number;
  };
}

const div = (style: Estilo, children?: Nodo | Nodo[] | string): Nodo => ({
  type: 'div',
  props: children === undefined ? { style } : { style, children },
});

/** satori recomienda declarar `width` y `height` en toda imagen. */
const img = (src: ArrayBuffer, width: number, height: number, style: Estilo = {}): Nodo => ({
  type: 'img',
  props: { style, src, width, height },
});

/**
 * La tarjeta dibuja texto, no HTML: satori pinta cualquier etiqueta tal cual.
 * Varias cadenas del diccionario llevan `<strong>` porque su página las pinta
 * con `set:html` (`sobreMi.intro` es la que llega hasta aquí, como bajada de la
 * tarjeta de «Sobre mí»), y se leían literalmente en la imagen compartida.
 * Se quitan antes de recortar: si no, las etiquetas gastarían caracteres del
 * límite y el corte caería antes de tiempo.
 */
const textoPlano = (texto: string) => texto.replace(/<[^>]+>/g, '');

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

/**
 * Las ondas concéntricas de la marca, resueltas con bordes redondos.
 * El centro está fuera del lienzo por abajo a la derecha y los anillos barren
 * hasta el centro, como en el banner.
 */
function ondas(): Nodo[] {
  const centro = { x: 1150, y: 640 };
  return [320, 500, 680, 860, 1040, 1220].map((diametro) =>
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

/**
 * La mira de `MarcaGeometrica.astro`, dibujada con divs en vez de con SVG:
 * el mismo recurso que las ondas, y satori no tiene que interpretar un trazo.
 * `x` e `y` son el centro.
 */
function mira(x: number, y: number, tamano: number): Nodo[] {
  const anillo = tamano * 0.58;
  const brazo = (tamano - anillo) / 2 - 1.5;
  const grosor = 1.5;
  const barra = (estilo: Estilo) =>
    div({ position: 'absolute', backgroundColor: COLOR.mira, ...estilo });

  return [
    div({
      position: 'absolute',
      left: x - anillo / 2,
      top: y - anillo / 2,
      width: anillo,
      height: anillo,
      borderRadius: anillo,
      border: `${grosor}px solid ${COLOR.mira}`,
    }),
    barra({ left: x - grosor / 2, top: y - tamano / 2, width: grosor, height: brazo }),
    barra({ left: x - grosor / 2, top: y + anillo / 2 + 1.5, width: grosor, height: brazo }),
    barra({ left: x - tamano / 2, top: y - grosor / 2, width: brazo, height: grosor }),
    barra({ left: x + anillo / 2 + 1.5, top: y - grosor / 2, width: brazo, height: grosor }),
  ];
}

function plantilla(contenido: ContenidoOg, oso: ArrayBuffer): Nodo {
  const { titulo, bajada, etiqueta, dominio } = contenido;
  const textoTitulo = recortar(textoPlano(titulo), 130);

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
          color: COLOR.menta,
        },
        recortar(textoPlano(etiqueta), 64),
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
        color: COLOR.titulo,
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
        recortar(textoPlano(bajada), 150),
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
      backgroundColor: COLOR.noche,
      backgroundImage: `linear-gradient(100deg, ${COLOR.nocheFooter} 0%, ${COLOR.noche} 45%, ${COLOR.profundoClaro} 100%)`,
      fontFamily: 'Inter',
    },
    [
      ...ondas(),
      ...mira(1088, 214, 26),
      ...mira(1136, 452, 17),

      // Encabezado: el oso de la marca y el nombre.
      div({ display: 'flex', alignItems: 'center', height: 58 }, [
        img(oso, LOGO_ANCHO, LOGO_ALTO),
        div(
          {
            marginLeft: 18,
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: -0.2,
            color: COLOR.titulo,
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
              color: COLOR.menta,
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
  const [oso, fonts] = await Promise.all([cargarLogo(), cargarFuentes()]);
  const svg = await satori(plantilla(contenido, oso) as never, {
    width: ANCHO_OG,
    height: ALTO_OG,
    fonts,
  });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
