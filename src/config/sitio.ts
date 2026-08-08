/**
 * Datos fijos del sitio y de contacto.
 * Confirmados por Juan Camilo el 6 de agosto de 2026, antes de publicar.
 */
import { DEFAULT_LOCALE, LOCALES_ACTIVOS, NOMBRE_LOCALE, type Locale } from '../i18n/ui';

export const SITIO = {
  autor: 'Juan Camilo Bolaños',
  // Separadas porque el nodo PostalAddress del JSON-LD las pide por campo.
  ciudad: 'Medellín',
  pais: 'Colombia',
  correo: 'juancamilob492@gmail.com',
  whatsapp: '573003974565',
  linkedin: 'https://www.linkedin.com/in/juan-camilo-bolanos-garcia',
} as const;

/** «Medellín, Colombia», para textos corridos. */
export const UBICACION = `${SITIO.ciudad}, ${SITIO.pais}`;

export const ENLACE_WHATSAPP = `https://wa.me/${SITIO.whatsapp}`;
export const ENLACE_CORREO = `mailto:${SITIO.correo}`;

/**
 * El perfil de LinkedIn en el idioma del visitante.
 *
 * Juan Camilo tiene el perfil escrito en español, inglés y francés, y
 * `?locale=` es el parámetro con el que LinkedIn elige cuál mostrar. El
 * alemán cae al inglés: es la versión que un visitante germanófono tiene más
 * probabilidades de leer, hasta que exista una versión en alemán.
 *
 * `SITIO.linkedin` se queda sin parámetro y sigue siendo la URL canónica del
 * perfil: es la que va en el `sameAs` del JSON-LD, donde lo que se declara es
 * la identidad de la persona y no una versión traducida, y la que se muestra
 * como texto del enlace en el hero.
 */
export function linkedinDe(locale: Locale): string {
  const idioma = locale === 'es' ? 'es-ES' : locale === 'fr' ? 'fr-FR' : 'en-US';
  return `${SITIO.linkedin}/?locale=${idioma}`;
}

/**
 * PDFs del CV. Solo se listan los que existen en `public/cv/`: un idioma sin
 * PDF no debe aparecer en el menú de descarga ofreciendo un enlace roto. Los
 * tres idiomas activos ya tienen el suyo; el alemán caería al español, que es
 * el primero de la lista, hasta que exista su PDF.
 */
export const CV: Partial<Record<Locale, string>> = {
  es: '/cv/juan-camilo-bolanos-es.pdf',
  en: '/cv/juan-camilo-bolanos-en.pdf',
  fr: '/cv/juan-camilo-bolanos-fr.pdf',
};

/** Idiomas con PDF disponible, en el orden de `LOCALES_ACTIVOS`. */
export const CV_IDIOMAS = LOCALES_ACTIVOS.filter((locale) => CV[locale]);

/** El CV del idioma pedido, o el primero disponible como respaldo. */
export function cvDe(locale: Locale): { href: string; idioma: Locale } {
  const idioma = CV[locale] ? locale : (CV_IDIOMAS[0] ?? DEFAULT_LOCALE);
  return { href: CV[idioma] ?? '', idioma };
}

/**
 * El nombre con el que se guarda el PDF, vía el atributo `download`.
 *
 * La URL se queda en minúsculas y con guiones, que es lo que corresponde a una
 * dirección; el nombre legible solo aparece al guardar. Empieza por el nombre
 * porque quien descarga varios CV los agrupa por persona, no por tipo de
 * documento. El idioma va en su propia lengua, igual que en el menú, y sale de
 * `NOMBRE_LOCALE`: un idioma nuevo queda cubierto sin tocar esto.
 */
export function nombreArchivoCv(idioma: Locale): string {
  return `${SITIO.autor} - CV (${NOMBRE_LOCALE[idioma]}).pdf`;
}
