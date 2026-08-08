/**
 * El perfil profesional de Juan Camilo, en un solo sitio.
 *
 * Estas listas se pintan en «Sobre mí» y, desde FASE 11, también alimentan el
 * `knowsAbout`, el `knowsLanguage` y el `hasOccupation` del nodo Person. Vivían
 * en el frontmatter de `src/pages/[lang]/[pagina].astro`; se movieron aquí sin
 * cambiar un solo ítem ni su orden, porque tener la misma lista escrita dos
 * veces es tener dos listas que se desalinean. Los datos estructurados no
 * pueden afirmar nada que la página no muestre, y la única forma barata de
 * garantizarlo es que lean lo mismo.
 *
 * Nada se inventa: los grupos y su contenido son los de la hoja de vida, y el
 * rol es diseñar y definir estos sistemas, no listar un stack. Las tecnologías
 * con las que se construyó cada proyecto siguen en el campo `herramientas` de
 * su caso, que es donde tienen contexto.
 */
import type { NombreHerramienta } from '../components/IconoHerramienta.astro';
import { CATEGORIAS } from '../content.config';
import { NOMBRE_LOCALE, type ClaveUI, type Locale } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
import { etiquetaCategoria } from './categorias';

export interface ItemHabilidad {
  texto: string;
  icono?: NombreHerramienta;
}

export interface GrupoHabilidad {
  titulo: string;
  items: ItemHabilidad[];
  /** Ocupa la fila entera de la grilla de dos columnas. */
  completo?: boolean;
}

/** Los cinco grupos de habilidades, en el orden en que se muestran. */
export function gruposDeHabilidades(locale: Locale): GrupoHabilidad[] {
  const t = useTranslations(locale);

  return [
    {
      titulo: t('sobreMi.habilidades.investigacion'),
      items: [
        { texto: t('sobreMi.hab.entrevistas') },
        { texto: t('sobreMi.hab.gruposFocales') },
        { texto: t('sobreMi.hab.encuestas') },
        { texto: t('sobreMi.hab.pruebas') },
        { texto: 'Tree testing' },
        { texto: t('sobreMi.hab.paseoCognitivo') },
      ],
    },
    {
      titulo: t('sobreMi.habilidades.diseno'),
      items: [
        { texto: 'Design Thinking' },
        { texto: etiquetaCategoria(locale, 'Diseño de servicio') },
        { texto: t('sobreMi.hab.arquitecturaInfo') },
        { texto: t('sobreMi.hab.disenoInteraccion') },
        { texto: t('sobreMi.hab.agiles') },
      ],
    },
    {
      titulo: t('sobreMi.habilidades.ia'),
      items: [
        { texto: t('sobreMi.hab.agentes') },
        { texto: 'Prompt engineering' },
        { texto: t('sobreMi.hab.automatizacion') },
        { texto: t('sobreMi.hab.apis') },
      ],
    },
    {
      titulo: t('sobreMi.habilidades.prototipado'),
      items: [
        { texto: t('sobreMi.hab.prototipadoFuncional') },
        { texto: 'IoT' },
        { texto: t('sobreMi.hab.vision') },
        { texto: t('sobreMi.hab.modelado') },
        { texto: t('sobreMi.hab.desarrolloIA') },
      ],
    },
    {
      /*
       * El único grupo con logo: son productos. Los otros cuatro son métodos y
       * disciplinas, que no tienen marca que poner al lado.
       * Diez nombres propios en media columna caen en cuatro renglones, así que
       * este grupo ocupa la fila entera.
       */
      titulo: t('sobreMi.habilidades.herramientas'),
      completo: true,
      items: [
        { texto: 'Figma', icono: 'figma' },
        { texto: 'n8n', icono: 'n8n' },
        { texto: 'Microsoft Clarity', icono: 'clarity' },
        { texto: 'Hotjar', icono: 'hotjar' },
        { texto: 'Unity', icono: 'unity' },
        { texto: 'Blender', icono: 'blender' },
        { texto: 'Photoshop', icono: 'photoshop' },
        { texto: 'Illustrator', icono: 'illustrator' },
        { texto: 'Premiere Pro', icono: 'premiere' },
        { texto: 'ClickUp', icono: 'clickup' },
        { texto: 'GitHub', icono: 'github' },
      ],
    },
  ];
}

/**
 * Los temas que el sitio afirma que Juan Camilo conoce, para `knowsAbout` y
 * para las `skills` de `hasOccupation`.
 *
 * Salen de dos fuentes que ya son texto visible: los chips de habilidades de
 * «Sobre mí» y las categorías canónicas, que se muestran en cada tarjeta de la
 * grilla y en el encabezado de cada caso. No lee la colección a propósito: así
 * las fábricas de JSON-LD siguen siendo síncronas. Las herramientas concretas
 * de cada proyecto ya viajan en el `keywords` de su propio CreativeWork.
 */
export function temasConocidos(locale: Locale): string[] {
  const deHabilidades = gruposDeHabilidades(locale).flatMap((grupo) =>
    grupo.items.map((item) => item.texto),
  );
  const deCategorias = CATEGORIAS.map((categoria) => etiquetaCategoria(locale, categoria));

  // «Diseño de servicio» está en los dos lados: el Set lo deja una sola vez.
  return [...new Set([...deHabilidades, ...deCategorias])];
}

/**
 * Los idiomas que declara «Sobre mí», en el orden en que se listan.
 *
 * Coincide hoy con `LOCALES`, pero se escribe aparte porque son cosas
 * distintas: una es en qué idiomas está el sitio y otra cuáles habla su autor.
 * Si algún día se traduce el sitio a un idioma que Juan Camilo no habla, esta
 * lista no cambia.
 */
export const IDIOMAS_PERFIL = ['es', 'en', 'fr', 'de'] as const satisfies readonly Locale[];

/** Las cadenas visibles («Español — nativo», «Inglés — C1»…). */
export function idiomasVisibles(locale: Locale): string[] {
  const t = useTranslations(locale);
  return IDIOMAS_PERFIL.map((idioma) => t(`sobreMi.idiomas.${idioma}` as ClaveUI));
}

/**
 * Los mismos idiomas para `knowsLanguage`, con su endónimo y su código BCP-47.
 * El nivel del Marco Común (C1, B2, A2) se queda fuera: `Language` no tiene
 * propiedad donde ponerlo, y en el HTML sigue visible al lado de cada nombre.
 */
export function idiomasDelPerfil(): { nombre: string; codigo: Locale }[] {
  return IDIOMAS_PERFIL.map((idioma) => ({ nombre: NOMBRE_LOCALE[idioma], codigo: idioma }));
}
