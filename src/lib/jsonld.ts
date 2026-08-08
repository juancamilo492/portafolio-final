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
import { idiomasDelPerfil, temasConocidos } from './perfil';
import { esAnioSuelto, type Proyecto } from './proyectos';
import { absoluta } from './seo';

export type NodoJsonLd = Record<string, unknown>;

/** Identificadores estables, para que los nodos se unifiquen entre páginas. */
const idPersona = (site: URL) => absoluta(site, '/#persona');
const idSitio = (site: URL) => absoluta(site, '/#sitio');

/** El cargo, tal cual lo dice el H1 de la portada. */
const cargo = (locale: Locale) => {
  const t = useTranslations(locale);
  return `${t('inicio.h1.parte1')} ${t('inicio.h1.enfasis')}`;
};

/**
 * El nodo Person completo. Es la entidad central del sitio y lo que permite
 * responder a máquina «quién es y qué hace».
 *
 * `knowsAbout`, `knowsLanguage` y `hasOccupation` se añadieron en FASE 11 y
 * revisan la nota de FASE 5 que decía «no hay knowsLanguage». Aquella regla era
 * no afirmar lo que la página no muestra, y sigue en pie: los tres salen de
 * `src/lib/perfil.ts`, que es la misma lista que pinta «Sobre mí». Lo que no
 * está publicado sigue fuera —empleador, años de experiencia, premios, fechas
 * de trabajo—, porque no hay dato que lo respalde.
 */
function nodoPersona(site: URL, locale: Locale): NodoJsonLd {
  const t = useTranslations(locale);
  const temas = temasConocidos(locale);
  return {
    '@type': 'Person',
    '@id': idPersona(site),
    name: SITIO.autor,
    url: absoluta(site, rutaDe(locale)),
    // El perfil canónico vive en «Sobre mí», no en la portada.
    mainEntityOfPage: absoluta(site, rutaDe(locale, 'sobreMi')),
    jobTitle: cargo(locale),
    description: t('footer.descripcion'),
    // La dirección a secas: el `mailto:` es cosa del href, no de schema.org.
    email: SITIO.correo,
    telephone: `+${SITIO.whatsapp}`,
    image: absoluta(site, retrato.src),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITIO.ciudad,
      addressCountry: SITIO.pais,
    },
    knowsAbout: temas,
    knowsLanguage: idiomasDelPerfil().map(({ nombre, codigo }) => ({
      '@type': 'Language',
      name: nombre,
      alternateName: codigo,
    })),
    hasOccupation: {
      '@type': 'Occupation',
      name: cargo(locale),
      occupationLocation: { '@type': 'City', name: SITIO.ciudad },
      // Array y no una cadena unida: uno de los temas —«Modelado, texturizado,
      // animación y renderizado»— lleva comas dentro, así que separarlos por
      // coma sería partirlo en cuatro.
      skills: temas,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: t('sobreMi.educacion.institucion'),
    },
    sameAs: [SITIO.linkedin],
  };
}

/**
 * Referencia a la persona, para usar como autor o creador.
 *
 * Lleva `url` y `jobTitle` además del `@id`: cada `@graph` es autocontenido
 * (decisión de FASE 5), así que un agente que aterriza en un caso suelto no
 * vería el nodo completo y se quedaría con un nombre sin oficio.
 */
function referenciaPersona(site: URL, locale: Locale): NodoJsonLd {
  return {
    '@type': 'Person',
    '@id': idPersona(site),
    name: SITIO.autor,
    url: absoluta(site, rutaDe(locale)),
    jobTitle: cargo(locale),
  };
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
    publisher: referenciaPersona(site, locale),
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
      about: referenciaPersona(site, locale),
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: proyectos.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        /*
         * Cada entrada envuelve un CreativeWork y no solo un nombre y una URL:
         * así quien lee esta página se lleva de qué va cada caso sin tener que
         * visitar los cinco.
         */
        itemListElement: proyectos.map((proyecto, indice) => {
          const urlCaso = absoluta(site, rutaDe(locale, 'proyectos', proyecto.data.slug));
          return {
            '@type': 'ListItem',
            position: indice + 1,
            url: urlCaso,
            item: {
              '@type': 'CreativeWork',
              '@id': `${urlCaso}#caso`,
              url: urlCaso,
              name: proyecto.data.titulo,
              description: proyecto.data.resumen,
            },
          };
        }),
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

  /*
   * La portada real va primero y la tarjeta Open Graph después: la primera es
   * la imagen del caso, la segunda solo su envoltorio para redes sociales.
   */
  const imagenes = [
    ...(datos.imagen_portada ? [absoluta(site, datos.imagen_portada.src)] : []),
    absoluta(site, imagenOg),
  ];

  const obra: NodoJsonLd = {
    '@type': 'CreativeWork',
    '@id': `${url}#caso`,
    url,
    mainEntityOfPage: url,
    name: datos.titulo,
    description: datos.resumen,
    inLanguage: HREFLANG[locale],
    image: imagenes,
    author: referenciaPersona(site, locale),
    creator: referenciaPersona(site, locale),
    publisher: referenciaPersona(site, locale),
    isPartOf: nodoSitio(site, locale),
    // Las disciplinas del caso, que son las que se ven como etiqueta bajo el
    // título. `keywords` va como array: schema.org lo admite y evita que quien
    // lo lea tenga que partir una cadena por comas.
    about: datos.categoria.map((cat) => ({
      '@type': 'Thing',
      name: etiquetaCategoria(locale, cat),
    })),
    keywords: [
      ...datos.categoria.map((cat) => etiquetaCategoria(locale, cat)),
      ...datos.herramientas,
    ],
  };

  // `año` es texto libre para admitir rangos ("2024–2025"): solo se publica
  // como fecha cuando de verdad es un año suelto. Misma regla que el
  // `<time datetime>` de la plantilla, de ahí que compartan `esAnioSuelto`.
  if (esAnioSuelto(datos.año)) obra.dateCreated = datos.año;
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
