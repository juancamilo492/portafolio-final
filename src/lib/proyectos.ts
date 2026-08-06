import { getCollection, type CollectionEntry } from 'astro:content';
import { esLocale } from '../i18n/utils';
import { DEFAULT_LOCALE, type Locale } from '../i18n/ui';

export type Proyecto = CollectionEntry<'proyectos'>;

/** El id del glob loader es `<locale>/<slug>`. */
export function localeDeEntrada(entrada: Proyecto): Locale {
  const [prefijo] = entrada.id.split('/');
  return esLocale(prefijo) ? prefijo : DEFAULT_LOCALE;
}

export function slugDeEntrada(entrada: Proyecto): string {
  return entrada.data.slug;
}

/** Todos los proyectos de un idioma, ordenados por `orden` ascendente. */
export async function proyectosPorLocale(locale: Locale): Promise<Proyecto[]> {
  const todos = await getCollection('proyectos');
  return todos
    .filter((entrada) => localeDeEntrada(entrada) === locale)
    .sort((a, b) => a.data.orden - b.data.orden);
}

/** Los destacados de un idioma, en orden, limitados a `limite`. */
export async function proyectosDestacados(locale: Locale, limite = 3): Promise<Proyecto[]> {
  const proyectos = await proyectosPorLocale(locale);
  return proyectos.filter((p) => p.data.destacado).slice(0, limite);
}
