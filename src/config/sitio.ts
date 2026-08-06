/**
 * Datos fijos del sitio y de contacto.
 * [PENDIENTE: confirmar con el dueño antes de publicar — CLAUDE.md → Páginas]
 */
import { DEFAULT_LOCALE, LOCALES_ACTIVOS, type Locale } from '../i18n/ui';

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
 * PDFs del CV. Solo se listan los que existen en `public/cv/`: un idioma sin
 * PDF no debe aparecer en el menú de descarga ofreciendo un enlace roto.
 * [PENDIENTE: el CV en inglés — al subirlo, añadir aquí la línea `en`]
 */
export const CV: Partial<Record<Locale, string>> = {
  es: '/cv/juan-camilo-bolanos-es.pdf',
};

/** Idiomas con PDF disponible, en el orden de `LOCALES_ACTIVOS`. */
export const CV_IDIOMAS = LOCALES_ACTIVOS.filter((locale) => CV[locale]);

/** El CV del idioma pedido, o el primero disponible como respaldo. */
export function cvDe(locale: Locale): { href: string; idioma: Locale } {
  const idioma = CV[locale] ? locale : (CV_IDIOMAS[0] ?? DEFAULT_LOCALE);
  return { href: CV[idioma] ?? '', idioma };
}
