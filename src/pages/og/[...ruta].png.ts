/**
 * Tarjetas Open Graph, una por página e idioma, resueltas en el build.
 *
 * Las rutas las dicta `rutaOg()` (src/lib/og.ts), la misma función que usa
 * `BaseLayout` para escribir `og:image`: si aquí se genera algo, allá se
 * anuncia exactamente eso.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { CATEGORIAS } from '../../content.config';
import { UBICACION } from '../../config/sitio';
import { LOCALES_ACTIVOS } from '../../i18n/ui';
import { useTranslations } from '../../i18n/utils';
import { etiquetaCategoria } from '../../lib/categorias';
import { pngOpenGraph, rutaOg, type ContenidoOg } from '../../lib/og';
import { proyectosPorLocale } from '../../lib/proyectos';
import { siteDe } from '../../lib/seo';

/** Lo que la tarjeta necesita saber; el dominio lo pone el GET. */
type Tarjeta = Omit<ContenidoOg, 'dominio'>;

/** `/og/es/proyecto/industrial.png` → `es/proyecto/industrial` */
const paramDe = (ruta: string) => ruta.replace(/^\/og\//, '').replace(/\.png$/, '');

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  for (const locale of LOCALES_ACTIVOS) {
    const t = useTranslations(locale);
    const proyectos = await proyectosPorLocale(locale);

    // Solo las categorías con casos en este idioma: las mismas que la grilla.
    const enUso = CATEGORIAS.filter((cat) =>
      proyectos.some((proyecto) => proyecto.data.categoria.includes(cat)),
    ).map((cat) => etiquetaCategoria(locale, cat));

    const paginas: { ruta: string; tarjeta: Tarjeta }[] = [
      {
        ruta: rutaOg(locale, 'inicio'),
        tarjeta: {
          etiqueta: UBICACION,
          titulo: `${t('inicio.h1.parte1')} ${t('inicio.h1.enfasis')}`,
          bajada: t('inicio.subtitulo'),
        },
      },
      {
        ruta: rutaOg(locale, 'proyectos'),
        tarjeta: {
          etiqueta: enUso.join(' · ') || undefined,
          titulo: t('meta.proyectos.titulo'),
          bajada: t('proyectos.bajada'),
        },
      },
      {
        ruta: rutaOg(locale, 'sobreMi'),
        tarjeta: {
          etiqueta: UBICACION,
          titulo: t('meta.sobreMi.titulo'),
          bajada: t('sobreMi.intro'),
        },
      },
      ...proyectos.map((proyecto) => ({
        ruta: rutaOg(locale, 'caso', proyecto.data.slug),
        tarjeta: {
          etiqueta: proyecto.data.categoria
            .map((cat) => etiquetaCategoria(locale, cat))
            .join(' · '),
          titulo: proyecto.data.titulo,
          bajada: proyecto.data.resumen,
        },
      })),
    ];

    for (const { ruta, tarjeta } of paginas) {
      paths.push({ params: { ruta: paramDe(ruta) }, props: { tarjeta } });
    }
  }

  return paths;
};

export const GET: APIRoute = async ({ props, site }) => {
  const { tarjeta } = props as { tarjeta: Tarjeta };
  const png = await pngOpenGraph({ ...tarjeta, dominio: siteDe(site).host });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      /*
       * Declara la intención, pero en un build estático solo llega al disco el
       * cuerpo: la cabecera se pierde y quien la sirve es el host. Si en FASE 7
       * hace falta cachear las tarjetas de verdad, va en `public/_headers`.
       */
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
