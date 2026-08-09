/**
 * Los tres íconos que emite el plugin de evidencia (`src/lib/evidencia.ts`).
 *
 * Van aquí como cadenas y no como `Icono.astro` porque su consumidor no es una
 * plantilla: el plugin corre dentro del procesador de Markdown, donde no hay
 * componentes que invocar. Todos en `currentColor` y con el mismo trazo de 1.6
 * que el resto del sistema, así que sirven en claro y en oscuro sin una segunda
 * versión.
 *
 * `ENLACE_EXTERNO` es un espejo del ícono del mismo nombre de
 * `src/components/Icono.astro`: mismo dibujo, distinto consumidor. Si se toca
 * uno hay que tocar el otro, y por eso el comentario existe en los dos
 * archivos. Es el mismo trato que la constante `COLOR` de `src/lib/og.ts` con
 * `global.css`. Los otros dos no están en `Icono.astro` porque nadie más los
 * usa; si algún día los usa la plantilla, se mueven allí y este archivo pasa a
 * ser el espejo.
 */

const CAJA = 'viewBox="0 0 24 24" aria-hidden="true" focusable="false"';
const TRAZO = `${CAJA} fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"`;

/**
 * Triángulo de reproducción de la fachada de vídeo. Relleno y no trazo: va
 * dentro de un disco de acento sobre la miniatura, donde una silueta hueca se
 * pierde contra la imagen. Ligeramente descentrado a la derecha (5.5 en vez de
 * 5) para que el peso óptico quede en el centro del disco.
 */
export const PLAY = `<svg ${CAJA} width="26" height="26" fill="currentColor"><path d="M8.5 5.4v13.2L19 12z"/></svg>`;

/** Cuatro esquinas que se separan: «esta imagen se puede ver más grande». */
export const AMPLIAR = `<svg ${TRAZO} width="13" height="13" stroke-width="1.6"><path d="M14.5 4H20v5.5M20 4l-6.5 6.5M9.5 20H4v-5.5M4 20l6.5-6.5"/></svg>`;

/** Espejo de `enlace-externo` en `src/components/Icono.astro`. */
export const ENLACE_EXTERNO = `<svg ${TRAZO} width="13" height="13" stroke-width="1.5"><path d="M14 4h6v6M20 4l-8.5 8.5"/><path d="M18.5 14.5v4A2.5 2.5 0 0 1 16 21H5.5A2.5 2.5 0 0 1 3 18.5V8A2.5 2.5 0 0 1 5.5 5.5h4"/></svg>`;
