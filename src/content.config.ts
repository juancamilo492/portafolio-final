import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Categorías canónicas para los filtros de /proyectos.
 * Cualquier valor fuera de esta lista rompe el build a propósito: evita que
 * aparezcan chips de filtro duplicados o mal escritos.
 *
 * Lista ampliada sobre las 4 de CLAUDE.md para cubrir los casos existentes:
 *   Producto digital  ← "Producto digital"
 *   Diseño de servicio ← "Diseño de servicio"
 *   Inmersivo         ← "Realidad virtual", "Física computacional"
 *   Investigación     ← "UX Research", "Design Thinking"
 *   IA y automatización ← "IA", "Automatización"
 *   UX/UI             ← "UX/UI", "Diseño de interacción", "Web interactiva"
 */
export const CATEGORIAS = [
  'UX/UI',
  'Producto digital',
  'IA y automatización',
  'Inmersivo',
  'Investigación',
  'Diseño de servicio',
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

const proyectos = defineCollection({
  // Un archivo por idioma: src/content/proyectos/{es,en,fr,de}/<slug>.md
  // El id resultante es `es/industrial`, `en/industrial`, etc.
  //
  // `generateId` es obligatorio, no cosmético: por defecto el glob loader usa
  // el `slug` del frontmatter como id cuando existe, y ese campo es idéntico
  // en las traducciones de un mismo caso. Sin esto, `en/industrial` pisaría a
  // `es/industrial` y la colección devolvería un solo idioma.
  loader: glob({
    base: './src/content/proyectos',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      slug: z.string(),
      cliente: z.string(),
      // String y no number: algunos casos abarcan rangos ("2024–2025").
      año: z.string(),
      rol: z.string(),
      categoria: z.array(z.enum(CATEGORIAS)).nonempty(),
      herramientas: z.array(z.string()).nonempty(),
      destacado: z.boolean().default(false),
      resumen: z.string(),
      // Ruta relativa al .md, procesada por astro:assets. Opcional: un caso
      // sin portada cae en el marco `PozoImagen` en vez de romper el build.
      imagen_portada: image().optional(),
      /*
       * Texto alternativo de la portada. Va por idioma y no compartido: tres
       * de las cinco portadas llevan texto, y por eso existen las variantes
       * `-portada-en.png` y `-portada-fr.png`. Describir en español una imagen
       * cuyo texto está en francés sería describir otra imagen.
       * Opcional: sin él la portada va con `alt=""` y se trata como decorativa,
       * que es lo correcto mientras nadie la haya mirado para describirla.
       */
      imagen_alt: z.string().optional(),
      // Ordena destacados en el inicio y la navegación anterior/siguiente.
      orden: z.number().int().positive(),
      // Opcional: cita destacada de la plantilla de caso.
      cita: z.string().optional(),
      cita_autor: z.string().optional(),
    }),
});

export const collections = { proyectos };
