/**
 * Fábricas de JSON-LD (schema.org).
 *
 * Todas reciben `site` y devuelven URLs absolutas. Ningún dato se inventa
 * aquí: sale de `src/config/sitio.ts`, del diccionario de `src/i18n/ui.ts` o
 * del frontmatter de la colección `proyectos`. Si un dato no existe —una
 * fecha exacta, un testimonio—, la propiedad simplemente se omite.
 *
 * Cada página emite un `@graph` autocontenido: los nodos que referencia
 * (la persona, el sitio) van dentro, no como `@id` colgando de otra página.
 */
import retrato from '../assets/retratos/sobre-mi-juan-camilo.webp';
import { SITIO } from '../config/sitio';
import { HREFLANG, type Locale } from '../i18n/ui';
import { rutaDe, useTranslations } from '../i18n/utils';
import { etiquetaCategoria } from './categorias';
import type { Proyecto } from './proyectos';
import { absoluta } from './seo';

export type NodoJsonLd = Record<string, unknown>;

/** Identificadores estables, para que los nodos se unifiquen entre páginas. */
const idPersona = (site: URL) => absoluta(site, '/#persona');
const idSitio = (site: URL) => absoluta(site, '/#sitio');

/** El nodo Person completo. Es la entidad central del sitio. */
function nodoPersona(site: URL, locale: Locale): NodoJsonLd {
  const t = useTranslations(locale);
  return {
    '@type': 'Person',
    '@id': idPersona(site),
    name: SITIO.autor,
    url: absoluta(site, rutaDe(locale)),
    jobTitle: `${t('inicio.h1.parte1')} ${t('inicio.h1.enfasis')}`,
    description: t('footer.descripcion'),
    email: `mailto:${SITIO.correo}`,
    image: absoluta(site, retrato.src),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITIO.ciudad,
      addressCountry: SITIO.pais,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: t('sobreMi.educacion.institucion'),
    },
    sameAs: [SITIO.linkedin],
  };
}

/** Referencia compacta a la persona, para usar como autor o creador. */
function referenciaPersona(site: URL): NodoJsonLd {
  return { '@type': 'Person', '@id': idPersona(site), name: SITIO.autor };
}

function nodoSitio(site: URL, locale: Locale): NodoJsonLd {
  const t = useTranslations(locale);
  return {
    '@type': 'WebSite',
    '@id': idSitio(site),
    url: absoluta(site, rutaDe(locale)),
    name: SITIO.autor,
    description: t('meta.inicio.descripcion'),
    inLanguage: HREFLANG[locale],
    publisher: referenciaPersona(site),
  };
}

/** Inicio: quién es y qué es este sitio. */
export function jsonLdInicio(site: URL, locale: Locale): NodoJsonLd[] {
  return [nodoPersona(site, locale), nodoSitio(site, locale)];
}

/** Sobre mí: la página ES el perfil de la persona. */
export function jsonLdSobreMi(site: URL, locale: Locale): NodoJsonLd[] {
  const t = useTranslations(locale);
  const url = absoluta(site, rutaDe(locale, 'sobreMi'));
  return [
    {
      '@type': 'ProfilePage',
      '@id': `${url}#pagina`,
      url,
      name: t('meta.sobreMi.titulo'),
      description: t('meta.sobreMi.descripcion'),
      inLanguage: HREFLANG[locale],
      isPartOf: nodoSitio(site, locale),
      mainEntity: nodoPersona(site, locale),
    },
  ];
}

/** Grilla de proyectos: colección con la lista ordenada de casos. */
export function jsonLdProyectos(
  site: URL,
  locale: Locale,
  proyectos: Proyecto[],
): NodoJsonLd[] {
  const t = useTranslations(locale);
  const url = absoluta(site, rutaDe(locale, 'proyectos'));
  return [
    {
      '@type': 'CollectionPage',
      '@id': `${url}#pagina`,
      url,
      name: t('meta.proyectos.titulo'),
      description: t('meta.proyectos.descripcion'),
      inLanguage: HREFLANG[locale],
      isPartOf: nodoSitio(site, locale),
      about: referenciaPersona(site),
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: proyectos.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: proyectos.map((proyecto, indice) => ({
          '@type': 'ListItem',
          position: indice + 1,
          name: proyecto.data.titulo,
          url: absoluta(site, rutaDe(locale, 'proyectos', proyecto.data.slug)),
        })),
      },
    },
  ];
}

/**
 * Caso de estudio: la obra y las migas de pan.
 * `imagenOg` es la ruta de la tarjeta 1200×630 generada en el build.
 */
export function jsonLdCaso(
  site: URL,
  locale: Locale,
  proyecto: Proyecto,
  imagenOg: string,
): NodoJsonLd[] {
  const t = useTranslations(locale);
  const datos = proyecto.data;
  const url = absoluta(site, rutaDe(locale, 'proyectos', datos.slug));

  const obra: NodoJsonLd = {
    '@type': 'CreativeWork',
    '@id': `${url}#caso`,
    url,
    mainEntityOfPage: url,
    name: datos.titulo,
    description: datos.resumen,
    inLanguage: HREFLANG[locale],
    image: absoluta(site, imagenOg),
    author: referenciaPersona(site),
    creator: referenciaPersona(site),
    isPartOf: nodoSitio(site, locale),
    keywords: [
      ...datos.categoria.map((cat) => etiquetaCategoria(locale, cat)),
      ...datos.herramientas,
    ].join(', '),
  };

  // `año` es texto libre para admitir rangos ("2024–2025"): solo se publica
  // como fecha cuando de verdad es un año suelto.
  if (/^\d{4}$/.test(datos.año)) obra.dateCreated = datos.año;
  else obra.temporalCoverage = datos.año;

  if (datos.cita) {
    obra.review = {
      '@type': 'Review',
      reviewBody: datos.cita,
      ...(datos.cita_autor ? { author: { '@type': 'Person', name: datos.cita_autor } } : {}),
    };
  }

  const migas: NodoJsonLd = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#migas`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.inicio'), item: absoluta(site, rutaDe(locale)) },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('nav.proyectos'),
        item: absoluta(site, rutaDe(locale, 'proyectos')),
      },
      { '@type': 'ListItem', position: 3, name: datos.titulo, item: url },
    ],
  };

  return [obra, migas];
}
