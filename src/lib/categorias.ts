import type { Categoria } from '../content.config';
import { useTranslations } from '../i18n/utils';
import type { ClaveUI, Locale } from '../i18n/ui';

/**
 * Etiqueta traducida de una categoría canónica.
 * Las categorías se escriben en español en el frontmatter (son el enum del
 * esquema Zod); la traducción vive en el diccionario bajo `categoria.<valor>`.
 */
export function etiquetaCategoria(locale: Locale, categoria: Categoria): string {
  const t = useTranslations(locale);
  return t(`categoria.${categoria}` as ClaveUI);
}

/**
 * Identificador estable de una categoría para el DOM y el query string:
 * 'IA y automatización' → 'ia-y-automatizacion'.
 * No depende del idioma, así que un enlace filtrado sigue funcionando en
 * cualquier versión de la página.
 */
export function slugCategoria(categoria: Categoria): string {
  return categoria
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
