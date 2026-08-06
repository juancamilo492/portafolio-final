# CLAUDE.md — Portafolio de Juan Camilo Bolaños

Guarda este archivo como `CLAUDE.md` en la raíz del repositorio. Es la
fuente única de verdad del proyecto: toda sesión de Claude Code debe
respetarlo. Trabajamos por fases (ver final); nunca intentes construir todo
en una sola sesión.

## Objetivo

Portafolio personal de Juan Camilo Bolaños — Diseñador de Interacción y
Creador de Sistemas de IA (Medellín, Colombia). Audiencias: reclutadores de
diseño/UX y clientes PYME. Prioridades: SEO/GEO excelente, carga rápida,
mantenimiento trivial (agregar un proyecto = agregar un archivo Markdown).

## Stack (no cambiar sin justificación)

- Astro (última versión estable) + TypeScript, salida 100% estática
- Tailwind CSS para estilos, con tokens del sistema "Esmeralda"
- Islas de interactividad con JS mínimo (vanilla o Astro islands; React
  solo si una isla lo amerita)
- Contenido en Content Collections (Markdown + frontmatter validado con Zod)
- Imágenes con astro:assets (webp, lazy loading, tamaños responsivos)
- Despliegue: GitHub → Cloudflare Pages o Vercel (build automático por push)
- Dominio de producción: `juancamilo492.online` (ya configurado en `site`)

## Sistema de diseño "Esmeralda"

- Colores: fondo claro `#F9FFFE`; acento `#00BD7B`; profundos `#005348` y
  `#1F5E3D` (texto fuerte, footer, base del modo oscuro); apoyos `#48D98B`
  y `#3AB071` solo en detalles. Ya definidos como tokens en
  `src/styles/global.css` (Tailwind 4 usa `@theme`, no `tailwind.config.js`).
- `#00BD7B` es SOLO relleno: como texto sobre fondo claro da 2.42:1. Para
  texto en verde usar `--color-acento-texto` (#008259, 4.78:1) o, en texto
  grande, `--color-acento-hover` (#00A96D, 3.01:1). Varios grises del
  handoff se oscurecieron por la misma razón; no revertirlos.
- Modo oscuro: clase `dark` en `<html>`, persistida en localStorage,
  inicial según `prefers-color-scheme`, sin flash (script inline en head).
  Fondo oscuro derivado de los verdes profundos, nunca negro puro.
- Tipografía: Fraunces (titulares, serif) + Inter (cuerpo) vía @fontsource,
  self-hosted, `font-display: swap`.
- Firma visual: ondas concéntricas de fondo mediante la utilidad `ondas`
  (repeating-radial-gradient, no SVG: más liviana e igual de sutil;
  parametrizable con `[--ondas-x]`, `[--ondas-y]`, `[--ondas-radio]`), más
  la marca geométrica de mira en SVG (`MarcaGeometrica.astro`). La mira
  reemplazó a las estrellas de 4 puntas por decisión del handoff de diseño.
- Retrato del hero siempre en blanco y negro: `filter: grayscale(1)`.
- Contraste AA mínimo; estados de foco visibles; sin barras de habilidades
  con porcentajes; sin formularios de contacto.

## Idiomas (i18n)

- Rutas por locale con el i18n nativo de Astro: `/es/` (default), `/en/`,
  `/fr/`, `/de/`. Los 4 configurados desde el día uno.
- LANZAMIENTO: solo es/en visibles en el selector. fr/de existen en config
  pero ocultos (constante `LOCALES_ACTIVOS = ['es','en']`) hasta que su
  contenido esté completo.
- Cadenas de interfaz en `src/i18n/ui.ts` (diccionario tipado). Contenido
  largo en las colecciones, un archivo por idioma.
- Los segmentos de URL también se traducen, según el mapa `RUTAS` de
  `src/i18n/ui.ts`: `/es/proyectos/` ↔ `/en/projects/`, `/es/sobre-mi/` ↔
  `/en/about/` (fr/de ya tienen sus segmentos definidos). Nunca escribir
  rutas a mano: usar `rutaDe(locale, clave, slug?)` de `src/i18n/utils.ts`.
- Las páginas viven en rutas dinámicas (`src/pages/[lang]/[seccion]/`,
  `[lang]/[pagina].astro`) y se generan solo para `LOCALES_ACTIVOS`.
- hreflang entre versiones de cada página; `/` redirige a `/es/`.

## Contenido

Colección `proyectos`, esquema Zod en `src/content.config.ts`:
titulo, slug, cliente, año (string), rol, categoria[], herramientas[],
destacado (boolean), resumen, imagen_portada (opcional, `image()`), orden
(number, obligatorio), cita y cita_autor (opcionales). Estructura:
`src/content/proyectos/{es,en,fr,de}/<slug>.md`.

**La colección es la única fuente de los casos.** Hasta FASE 5 los originales
en español vivían también en `contenido/`, con el cuerpo duplicado byte a byte
y un frontmatter ya obsoleto; esa carpeta se eliminó porque obligaba a
mantener dos copias sincronizadas a mano. Los originales siguen en el
historial de git si alguna vez hacen falta. Los 5 casos están en
`src/content/proyectos/es/`; falta `abuelos-nietos`, que Juan Camilo agregará
después.

Orden acordado (gobierna la grilla, el anterior/siguiente y qué destacados
salen en la portada):
1. i-homotic · 2. industrial · 3. vr-capacitacion-alico ·
4. empaques-ia-alico · 5. siguiendo-la-huella-azul · 6. abuelos-nietos

Los 5 archivos traen `destacado: true`; la portada muestra los 3 de menor
orden, es decir i-homotic, industrial y vr-capacitacion-alico.

Categorías canónicas para filtros (6, ampliadas sobre las 4 originales para
cubrir los casos reales): UX/UI, Producto digital, IA y automatización,
Inmersivo, Investigación, Diseño de servicio. El mapeo desde las etiquetas
originales de cada `.md` está documentado en `src/content.config.ts`.

## Páginas

1. Inicio: nav (logo JC, Inicio/Proyectos/Sobre mí, selector idioma, toggle
   tema) → hero (badge "Disponible para proyectos", H1 rol, subtítulo,
   CTAs "Ver proyectos" y "Hablemos", foto B/N, enlace LinkedIn) → franja
   de prueba social → 3 proyectos destacados (destacado: true, por orden)
   → Qué hago (3 tarjetas) → Mi proceso (Descubrir→Diseñar→Entregar) →
   CTA final sobre bloque verde profundo → footer (CV descargable ES/EN,
   LinkedIn, derechos).
2. /proyectos: grilla filtrable por categoría (chips; filtro client-side
   ligero), tarjetas con imagen, título, resumen de una línea, etiquetas.
3. /proyectos/<slug>: plantilla de caso — hero, barra de contexto
   (cliente/año/rol/herramientas), cuerpo Markdown con estilos de prosa,
   cita destacada si existe, navegación anterior/siguiente (por `orden`),
   2-3 relacionados (misma categoría), CTA de contacto.
4. /sobre-mi: foto 2, historia breve, habilidades como etiquetas agrupadas
   (Diseño / Automatización e IA / Desarrollo / Metodologías), educación
   (EAFIT, Diseño Interactivo, 2022-2026, mejor Saber Pro), idiomas
   (ES nativo, EN C1, FR B2, DE A2 en aprendizaje), botón Descargar CV.
5. 404 personalizada con la estética del sitio.
6. Persistentes: botones flotantes de WhatsApp (wa.me con número) y correo
   (mailto), esquina inferior derecha, con aria-labels.

Datos de contacto (confirmar con el dueño antes de publicar):
correo juancamilob492@gmail.com · WhatsApp +57 300 397 4565 ·
LinkedIn /in/juan-camilo-bolanos-garcia

## SEO y GEO

- `<title>` y meta description únicos por página e idioma; canonical;
  hreflang; sitemap (@astrojs/sitemap); robots.txt.
- Open Graph + Twitter Card por página; imagen OG por proyecto generada en
  build (plantilla con título del caso y estética Esmeralda; satori o
  similar).
- JSON-LD: Person (con sameAs a LinkedIn) en el sitio; CreativeWork o
  Article por caso de estudio; BreadcrumbList en casos.
- llms.txt en la raíz describiendo quién es Juan Camilo, qué hace y
  enlazando los casos (para indexación por IAs).
- HTML semántico: un h1 por página, jerarquía de headings correcta, alt en
  todas las imágenes.

**El sitemap no empareja idiomas.** `@astrojs/sitemap` tiene una opción
`i18n` que añade `xhtml:link` entre versiones, pero asume que la URL solo
cambia en el prefijo de locale. Aquí los segmentos también están traducidos
(`/es/proyectos/` ↔ `/en/projects/`), así que ese emparejado declararía
equivalencias falsas. El sitemap lista las URLs y punto; las relaciones entre
idiomas viven en el `hreflang` del HTML, que además sabe qué páginas existen
de verdad en cada idioma. No activar esa opción.

## Accesibilidad y calidad

- Skip link, navegación completa por teclado, focus visible, aria en
  toggles e íconos.
- Widget UserWay: dejar el espacio para el script, se activa al final.
- Meta de Lighthouse: ≥95 en Performance, Accessibility, Best Practices,
  SEO en las 4 páginas principales antes de publicar.

## Reglas de trabajo

- Cero Lorem Ipsum: si falta contenido, dejar `[PENDIENTE: ...]` visible.
- No inventar métricas, testimonios ni proyectos.
- Commits pequeños con mensajes claros; no mezclar fases en un commit.
- Al final de cada fase: `npm run build` sin errores ni warnings y revisar
  la preview responsive (360px, 768px, 1280px).

## Estado actual

FASES 1, 2, 3, 4 y 5 están completas y commiteadas. `astro check` pasa con
0 errores, 0 warnings y 0 hints; el build genera 12 páginas, 11 tarjetas
Open Graph, el sitemap, `robots.txt` y `llms.txt`.

Ya existe:
- Astro 7 estático + TypeScript strict + Tailwind 4 (`@tailwindcss/vite`).
- Tokens Esmeralda completos, fuentes Fraunces/Inter autoalojadas.
- `BaseLayout` (skip link, `main#contenido`, hueco para UserWay), `Header`
  sticky con menú hamburguesa < 768px, `Footer`, `SelectorIdioma` accesible,
  `ToggleTema` sin parpadeo, `BotonesFlotantes`, `MarcaGeometrica`, `Icono`,
  `Contenedor`.
- Componentes de página: `Boton` (variantes solido / contorno / punteado /
  claro-contorno), `TarjetaProyecto` (destacada / grilla / compacta),
  `PozoImagen` (marco de imagen ausente), `AvisoPendiente`, `BloqueCTA`
  (completo / compacto) y `MenuCV`. `MenuCV` lleva `data-selector-idioma`
  a propósito: reutiliza el script del selector de idioma (clic fuera,
  Escape, flechas) en vez de duplicarlo.
- Clase `.prosa` en `global.css` para el Markdown de los casos.
- Las 5 vistas construidas con contenido real en español: inicio, grilla
  con filtro client-side (`?categoria=`, `aria-pressed`, conteo en
  `aria-live`), plantilla de caso, sobre-mi y 404.
- `src/lib/proyectos.ts` con `proyectosPorLocale`, `proyectosDestacados`,
  `vecinosDeProyecto` y `proyectosRelacionados`; `src/lib/categorias.ts`
  con `etiquetaCategoria` y `slugCategoria`. `getCollection` se memoiza.
- i18n con rutas traducidas y todas las cadenas de FASE 3 en es/en.
- Los 5 casos en español dentro de `src/content/proyectos/es/`, con `orden`,
  categorías canónicas y portada. Son la única copia: no hay carpeta paralela.
- Las 5 portadas reales (1600×1000, hechas por Juan Camilo) y las versiones
  en inglés y francés de las 3 que llevan texto, a la espera de FASE 6:
  `<slug>-portada.png`, `-portada-en.png`, `-portada-fr.png`. i-homotic e
  industrial son logos, así que sirven para los cuatro idiomas.
- Los dos retratos (`src/assets/retratos/`) y el CV en español
  (`public/cv/juan-camilo-bolanos-es.pdf`).
- Toda la capa de SEO/GEO: `BaseLayout` con Open Graph, Twitter Card,
  hreflang y JSON-LD; `src/lib/seo.ts` (`siteDe`, `absoluta`);
  `src/lib/jsonld.ts` + `JsonLd.astro`; `src/lib/og.ts` con la plantilla de
  las tarjetas; el endpoint `src/pages/og/[...ruta].png.ts`;
  `src/pages/robots.txt.ts` y `src/pages/llms.txt.ts`; sitemap en la config.

Decisiones de FASE 3 que no hay que revertir:
- La itálica del H1 del hero usa `--color-acento-hover` (3.01:1, válido
  solo por ser texto grande); todo el resto del verde textual usa
  `--color-acento-texto`. Sobre los bloques verdes el hover NO vira a
  menta: da 4.23:1 sobre `#1F5E3D` y ese texto es pequeño.
- Los `<li>` de las grillas no llevan utilidad de display, para que el
  atributo `hidden` del filtro pueda ocultarlos.
- Se omitió la sección 6 del handoff ("muestra del hero en modo oscuro"):
  era una prop del prototipo y aquí existe el toggle real.
- El índice del caso se oculta bajo 1024px, opción que el handoff permite.

Decisiones de FASE 4 que no hay que revertir:
- Los 5 `.md` se integraron con un script: solo cambió el frontmatter
  (`categoria` canónica, `orden`, `imagen_portada`) y el cuerpo se verificó
  idéntico al original. La carpeta duplicada desapareció en FASE 5.
- Las portadas placeholder generadas se reemplazaron por las reales
  conservando el nombre `<slug>-portada.png`, sin tocar el frontmatter.
- Los retratos llegaron recortados en PNG con alfa (sin fondo). Se
  compusieron sobre un degradado claro de la paleta en la proporción exacta
  de cada caja (`hero-juan-camilo.webp` 1200×1380, `sobre-mi-juan-camilo.webp`
  1200×1320) porque el sitio les aplica `grayscale(1)`: en blanco y negro el
  traje oscuro se separa de un fondo claro, no de uno verde. Los originales
  con alfa siguen en `src/assets/retratos/` como fuente (nadie los importa,
  así que no entran al build). Recompuestos con un script, no a mano.
- `MenuCV` es un enlace directo mientras haya un solo PDF, con el código del
  idioma a la vista; vuelve a ser desplegable en cuanto `CV` tenga dos
  entradas. `cvDe(locale)` en `src/config/sitio.ts` es la única fuente de esa
  decisión, y `CV` solo lista PDFs que existen: nunca un enlace roto.
- `industrial` sigue sin `cita`: el propio caso marca
  «[PENDIENTE: testimonio — pedir permiso para citar]» y la frase del
  handoff es de la administradora del bar. No se publica sin ese permiso.
- Los avisos `[PENDIENTE]` de destacados y de la grilla ahora hablan de
  FASE 6: en español ya no se ven, y en inglés lo que falta es la
  traducción de los casos, no la integración.

Decisiones de FASE 5 que no hay que revertir:
- `alternativasDeIdioma(clave, slug, disponibles)` recibe los idiomas en los
  que la página existe. Para un caso se calculan con `localesDeProyecto()`
  (`src/lib/proyectos.ts`), que mira qué `.md` hay en la colección. Cada
  alternativa lleva `exacta`: las exactas son las únicas que salen como
  `hreflang` y como `og:locale:alternate`; a las demás el selector de idioma
  las manda al índice de la sección, que sí existe. Antes ofrecía
  `/en/projects/<slug>/` para casos que solo están en español: un 404.
- Un solo `<script type="application/ld+json">` por página, con `@graph`, y
  los nodos referenciados (Person, WebSite) van dentro del grafo en vez de
  quedar como `@id` colgando de otra página. `JsonLd.astro` escapa `<`.
- El JSON-LD no inventa nada: no hay `aggregateRating`, ni `datePublished`
  falso, ni `knowsLanguage`. `año` es texto libre para admitir rangos, así
  que se publica como `dateCreated` solo si es un año suelto y como
  `temporalCoverage` si no.
- Las tarjetas OG se generan con satori + sharp en el build. satori no lee
  woff2 y `@fontsource-variable` solo publica ese formato, así que
  `src/assets/og/` guarda tres TTF estáticos (Fraunces SemiBold, Inter
  Regular e Inter SemiBold, bajados de Google Fonts con licencia OFL). Se
  leen del disco con `process.cwd()` durante el build y **no entran a
  `dist/`**: nadie los importa desde el navegador.
- `rutaOg()` (`src/lib/og.ts`) es la única fuente de las URLs de las
  tarjetas: la usan el endpoint que las genera y el `og:image` que las
  anuncia, así que no pueden desalinearse. El cuerpo del título se elige por
  largo (`tamanoTitulo`), calibrado con el peor caso de la colección,
  `siguiendo-la-huella-azul`, que cae en tres renglones a 44 px.
- `robots.txt` y `llms.txt` son endpoints, no archivos de `public/`: así el
  dominio sale de `Astro.site`. robots está abierto a todo, incluidos los
  rastreadores de IA — que encuentren el portafolio es el objetivo.
- `llms.txt` se arma desde la colección y el diccionario de i18n. Un caso
  nuevo aparece allí con solo existir el `.md`; nunca hay que editarlo a mano.
- La 404 pasa `noindex`: sin `canonical` (su URL, `/404/`, no existe), sin
  hreflang y con `robots: noindex, follow`.
- `SITIO.ubicacion` se partió en `ciudad` y `pais` porque el nodo
  `PostalAddress` los pide por separado; `UBICACION` los vuelve a juntar para
  los textos corridos.

Pendientes conocidos, además de las fases:
- Las portadas de los dos casos de Alico llevan el logo entre y=781 y y=898
  del lienzo de 1000 px, y el recorte de la portada del caso solo conserva
  y=171 a y=829: el logo sale cortado ahí y en la tarjeta de relacionados.
  Se arregla en Canva subiendo el logo — todo el contenido debe caber entre
  y=170 y y=830 —, no en el código.
- CV en inglés (al subirlo: `public/cv/juan-camilo-bolanos-en.pdf` y la línea
  `en` en `CV`, con eso `MenuCV` vuelve solo a ser desplegable).
- Pedir al bar Industrial permiso para la cita y las métricas del caso.
- El caso `abuelos-nietos` y su portada.
- Ampliar la historia de `/sobre-mi` en primera persona (hoy solo afirma
  hechos verificables de los casos y marca el resto como `[PENDIENTE]`).
- No hay `public/favicon.ico`; el dev server lo avisa en cada carga.
- Los `<title>` de la grilla y de Sobre mí son «Proyectos» y «Sobre mí» a
  secas, únicos dentro del sitio pero genéricos en un resultado de búsqueda.
  Añadirles el nombre como sufijo es candidato de FASE 7, junto con el resto
  de la auditoría.
- Cuando FASE 6 traduzca los casos, el `hreflang` y el selector de idioma se
  abren solos: `localesDeProyecto()` los detecta al aparecer el `.md`. Lo que
  sí hay que conectar a mano es la portada traducida
  (`<slug>-portada-en.png`), que hoy nadie importa.

## Cómo se agrega un caso nuevo (queda de FASE 4)

1. Escribir el `.md` directamente en `src/content/proyectos/es/<slug>.md`.
   Ahí vive el caso, no hay copia en otra carpeta. Los `##` del cuerpo
   alimentan el índice lateral del caso.
2. Frontmatter obligatorio: `orden` según la lista de la sección Contenido y
   `categoria` dentro de la lista canónica (cualquier otro valor rompe el
   build a propósito). Mapeo ya aplicado a los 5 casos:
   - i-homotic → `Investigación`, `Diseño de servicio`, `UX/UI`
   - industrial → `Producto digital`, `UX/UI`
   - vr-capacitacion-alico → `Inmersivo`, `Investigación`
   - empaques-ia-alico → `IA y automatización`, `UX/UI`
   - siguiendo-la-huella-azul → `Inmersivo`, `Investigación`, `UX/UI`
3. Imagen en `src/assets/proyectos/<slug>-portada.png`, referenciada como
   `../../../assets/proyectos/<archivo>`. Formato acordado: **1600×1000**
   (mínimo 1200 de ancho, que es el mayor `widths` de la plantilla). El
   recorte es `object-cover` centrado en las cuatro cajas donde aparece, y
   la más estrecha conserva solo **y=170 a y=830**: todo lo que importe —
   texto, logos — tiene que caber ahí. `imagen_portada` puede omitirse; sin
   ella el caso cae en el marco `PozoImagen`.
   Si la portada lleva texto, su traducción va al lado con sufijo de locale
   (`-portada-en.png`, `-portada-fr.png`) y se conecta en FASE 6.
4. Verificar: la portada muestra los 3 destacados de menor `orden`, la
   grilla genera un chip por categoría en uso, el anterior/siguiente sigue
   el `orden` y los relacionados comparten categoría.
5. Lo de FASE 5 se resuelve solo: la tarjeta Open Graph
   (`/og/<locale>/proyecto/<slug>.png`), el JSON-LD del caso, la línea de
   `llms.txt`, la entrada del sitemap y el `hreflang` salen del frontmatter.
   Nada que tocar, salvo revisar que el título no desborde la tarjeta si pasa
   de ~130 letras.

## Fases y prompt de arranque de cada una

- FASE 1 — Andamiaje: "Lee CLAUDE.md. Crea el proyecto Astro con
  TypeScript, Tailwind con los tokens Esmeralda, i18n de 4 locales (solo
  es/en activos), la colección proyectos con su esquema Zod y la estructura
  de carpetas. Páginas placeholder que compilen. No diseñes aún."
- FASE 2 — Sistema visual: "Lee CLAUDE.md. Implementa layout base, nav,
  footer, toggle de tema sin flash, selector de idioma, tipografías,
  patrones SVG de fondo y botones flotantes. Usa las capturas de diseño
  adjuntas como referencia visual." (adjuntar capturas de Claude Design)
- FASE 3 — Páginas: "Lee CLAUDE.md. Construye inicio, grilla de proyectos
  con filtros, plantilla de caso de estudio con anterior/siguiente y
  relacionados, sobre-mi y 404, con el contenido real en español."
- FASE 4 — Contenido: "Lee CLAUDE.md, en especial 'Qué le falta a FASE 4'.
  Integra los casos .md de contenido/ en la colección y sus imágenes
  optimizadas con astro:assets, tocando solo el frontmatter. Verifica
  destacados, orden, filtros, anterior/siguiente y relacionados, y deja
  `npm run build` en 0 errores y 0 warnings."
- FASE 5 — SEO/GEO: "Lee CLAUDE.md. Implementa toda la sección SEO y GEO:
  metas, OG por proyecto, JSON-LD, sitemap, robots, llms.txt, hreflang."
- FASE 6 — Inglés: los 5 casos en `src/content/proyectos/en/` (la interfaz
  ya está traducida en `ui.ts`). Una sesión por idioma: traducir cinco casos
  largos dos veces en una sola conversación degrada el resultado.
- FASE 6-bis — Francés: completar `fr` en `ui.ts` (hoy `{}`), los 5 casos en
  `src/content/proyectos/fr/` y solo entonces añadir `'fr'` a
  `LOCALES_ACTIVOS`. `RUTAS`, `NOMBRE_LOCALE`, `HREFLANG` y `OG_LOCALE` ya
  tienen `fr`: no hay que tocarlos. Cuidado: `useTranslations` cae al español
  cuando falta una clave, así que un `fr` incompleto no rompe el build, solo
  deja frases en español dentro de páginas francesas.
  Reglas de frontmatter para ambas: `slug`, `orden`, `destacado`,
  `categoria`, `herramientas` y `año` idénticos al español. `slug` porque la
  URL y `localesDeProyecto()` emparejan las versiones por él; `categoria`
  porque es un enum de Zod con los valores canónicos en español, que se
  muestran traducidos vía las claves `categoria.*`. Cada `.md` apunta a su
  propia portada: `-portada-en.png` / `-portada-fr.png` en los tres casos con
  texto, la base en i-homotic e industrial.
- FASE 7 — QA y despliegue: "Lee CLAUDE.md. Audita Lighthouse y
  accesibilidad hasta cumplir las metas, corrige, y configura el despliegue
  en Cloudflare Pages/Vercel con el dominio."
