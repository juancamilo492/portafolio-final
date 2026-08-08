import { getCollection, type CollectionEntry } from 'astro:content';
import { esLocale } from '../i18n/utils';
import { DEFAULT_LOCALE, LOCALES_ACTIVOS, type Locale } from '../i18n/ui';

export type Proyecto = CollectionEntry<'proyectos'>;

/** El id del glob loader es `<locale>/<slug>`. */
export function localeDeEntrada(entrada: Proyecto): Locale {
  const [prefijo] = entrada.id.split('/');
  return esLocale(prefijo) ? prefijo : DEFAULT_LOCALE;
}

export function slugDeEntrada(entrada: Proyecto): string {
  return entrada.data.slug;
}

/**
 * `año` es texto libre para admitir rangos ("2024–2025"), así que hay que
 * distinguir cuándo es una fecha de verdad. Lo usan el `<time datetime>` de la
 * plantilla de caso y el `dateCreated` de su JSON-LD: si los dos no aplican la
 * misma regla, el HTML y los datos estructurados dirían cosas distintas.
 */
export function esAnioSuelto(año: string): boolean {
  return /^\d{4}$/.test(año);
}

/**
 * La colección se lee una sola vez por build: todas las páginas comparten la
 * misma promesa en lugar de recorrer los .md una vez por ruta.
 */
let coleccion: Promise<Proyecto[]> | undefined;

function todosLosProyectos(): Promise<Proyecto[]> {
  coleccion ??= getCollection('proyectos');
  return coleccion;
}

/**
 * Idiomas activos en los que existe el caso con ese slug, es decir aquellos
 * cuya ruta el build llega a generar. Un caso sin traducir no puede aparecer
 * en el hreflang ni como enlace directo del selector: sería un 404.
 */
export async function localesDeProyecto(slug: string): Promise<Locale[]> {
  const todos = await todosLosProyectos();
  const existentes = new Set(
    todos.filter((entrada) => entrada.data.slug === slug).map(localeDeEntrada),
  );
  return LOCALES_ACTIVOS.filter((locale) => existentes.has(locale));
}

/** Todos los proyectos de un idioma, ordenados por `orden` ascendente. */
export async function proyectosPorLocale(locale: Locale): Promise<Proyecto[]> {
  const todos = await todosLosProyectos();
  return todos
    .filter((entrada) => localeDeEntrada(entrada) === locale)
    .sort((a, b) => a.data.orden - b.data.orden);
}

/** Los destacados de un idioma, en orden, limitados a `limite`. */
export async function proyectosDestacados(locale: Locale, limite = 3): Promise<Proyecto[]> {
  const proyectos = await proyectosPorLocale(locale);
  return proyectos.filter((p) => p.data.destacado).slice(0, limite);
}

export interface Vecinos {
  anterior?: Proyecto;
  siguiente?: Proyecto;
}

/**
 * Proyecto anterior y siguiente según `orden`, sin envolver los extremos:
 * el primero no tiene anterior y el último no tiene siguiente.
 */
export async function vecinosDeProyecto(entrada: Proyecto): Promise<Vecinos> {
  const proyectos = await proyectosPorLocale(localeDeEntrada(entrada));
  const indice = proyectos.findIndex((p) => p.data.slug === entrada.data.slug);
  if (indice === -1) return {};
  return {
    anterior: proyectos[indice - 1],
    siguiente: proyectos[indice + 1],
  };
}

/**
 * Proyectos que comparten al menos una categoría, ordenados por cuántas
 * comparten y luego por `orden`. Si no hay ninguno, completa con los
 * siguientes del mismo idioma para no dejar la sección vacía.
 */
export async function proyectosRelacionados(entrada: Proyecto, limite = 3): Promise<Proyecto[]> {
  const proyectos = await proyectosPorLocale(localeDeEntrada(entrada));
  const otros = proyectos.filter((p) => p.data.slug !== entrada.data.slug);
  const categorias = new Set<string>(entrada.data.categoria);

  const enComun = (p: Proyecto) => p.data.categoria.filter((c) => categorias.has(c)).length;

  const relacionados = otros
    .filter((p) => enComun(p) > 0)
    .sort((a, b) => enComun(b) - enComun(a) || a.data.orden - b.data.orden)
    .slice(0, limite);

  if (relacionados.length === limite) return relacionados;

  const yaIncluidos = new Set(relacionados.map((p) => p.data.slug));
  const relleno = otros.filter((p) => !yaIncluidos.has(p.data.slug));
  return [...relacionados, ...relleno].slice(0, limite);
}
