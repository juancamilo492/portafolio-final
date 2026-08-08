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
- Despliegue: GitHub → **Cloudflare Pages** (build automático por push).
  Decidido en FASE 5 por el plan gratuito: 20.000 archivos por despliegue y
  25 MiB por archivo, contra los 83 archivos y 1,3 MB del build actual; 500
  builds al mes y uno concurrente. Vercel queda descartado.
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
- LANZAMIENTO: es/en/fr visibles en el selector (`LOCALES_ACTIVOS =
  ['es','en','fr']`). `de` existe en config pero sigue oculto hasta que su
  contenido esté completo.
- Cadenas de interfaz en `src/i18n/ui.ts` (diccionario tipado). Contenido
  largo en las colecciones, un archivo por idioma.
- Los segmentos de URL también se traducen, según el mapa `RUTAS` de
  `src/i18n/ui.ts`: `/es/proyectos/` ↔ `/en/projects/` ↔ `/fr/projets/`,
  `/es/sobre-mi/` ↔ `/en/about/` ↔ `/fr/a-propos/` (de ya tiene sus segmentos
  definidos). Nunca escribir rutas a mano: usar `rutaDe(locale, clave, slug?)`
  de `src/i18n/utils.ts`.
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
`src/content/proyectos/es/`, en `en/` (FASE 6) y en `fr/` (FASE 6-bis); falta
`abuelos-nietos`, que Juan Camilo agregará después.

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
   CTA final sobre bloque verde profundo → footer (CV descargable ES/EN/FR,
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
5. 404 personalizada con la estética del sitio, una por idioma activo más la
   de la raíz en español (FASE 7).
6. Persistentes: botones flotantes de WhatsApp (wa.me con número) y correo
   (mailto), esquina inferior derecha, con aria-labels. En la esquina inferior
   izquierda, `BotonSubir` («volver arriba»), que aparece pasado el primer
   pantallazo y se retira sobre el pie.

El `<title>` de la grilla y de Sobre mí lleva el nombre como sufijo; su H1 no
(FASE 7).

Datos de contacto, **confirmados por Juan Camilo el 6 de agosto de 2026**:
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
- Widget UserWay: el hueco sigue marcado en `BaseLayout`, pero en FASE 7 se
  recomendó no instalarlo. Ver «Decisiones de FASE 7».
- Meta de Lighthouse: ≥95 en Performance, Accessibility, Best Practices,
  SEO en las 4 páginas principales antes de publicar. **Se mide sobre
  `npm run preview`**, nunca sobre `npm run dev`: ver «Estado actual».

## Reglas de trabajo

- Cero Lorem Ipsum: si falta contenido, dejar `[PENDIENTE: ...]` visible.
- No inventar métricas, testimonios ni proyectos.
- Commits pequeños con mensajes claros; no mezclar fases en un commit.
- Al final de cada fase: `npm run build` sin errores ni warnings y revisar
  la preview responsive (360px, 768px, 1280px).

## Estado actual

FASES 1 a 7 están completas y commiteadas, **iconos y logo incluidos**.
`astro check` pasa con 0 errores, 0 warnings y 0 hints; el build genera 28
páginas, 24 tarjetas Open Graph, el sitemap, `robots.txt` y `llms.txt`.
Queda FASE 8, que es publicar y comprobar lo que solo se ve publicado.

Lighthouse sobre `npm run preview` (nunca sobre `npm run dev`, ver más abajo):
Performance 97-99, Accessibility 100, **Best Practices 100** y SEO 100 en las
cuatro plantillas, ya con los iconos definitivos y sin un solo 404 en consola.

Para publicar solo faltan cosas que no dependen del código:

1. ~~Los 6 marcadores `[PENDIENTE]`~~ **Resuelto en FASE 8**: se reescribieron
   sin cifras ni cita en los tres idiomas (ver «Decisiones de FASE 8»). No
   queda ningún marcador en el sitio, verificado sobre `dist/`. Pedir el
   permiso al bar sigue pendiente, pero ya no bloquea la publicación.
2. Conectar el repo a Cloudflare Pages (`npm run build`, salida `dist`) y
   apuntar el DNS de `juancamilo492.online`.

**Medir el rendimiento sobre el build, no sobre `astro dev`.** El dev server
da Performance 42-57 con TBT de miles de milisegundos, y los diagnósticos
hablan de 304 KiB de JavaScript sin minificar y 2,4 MB sin usar: todo eso es
Vite, su cliente de HMR y la barra de herramientas de Astro. El sitio
publicado no tiene un solo archivo `.js`; su JavaScript son ~3,0 KB en línea
en la portada y ~4,0 KB en la grilla. Esa misma barra de herramientas mete un
enlace «Learn more» a `docs.astro.build` que baja el SEO a 92 en dev y no
existe en `dist/`. Si se ve la barrita flotante de Astro, se está midiendo lo
que no es.

Ya existe:
- Astro 7 estático + TypeScript strict + Tailwind 4 (`@tailwindcss/vite`).
- Tokens Esmeralda completos, fuentes Fraunces/Inter autoalojadas.
- `BaseLayout` (skip link, `main#contenido`, hueco para UserWay), `Header`
  sticky con menú hamburguesa < 768px, `Footer`, `SelectorIdioma` accesible,
  `ToggleTema` sin parpadeo, `BotonesFlotantes`, `BotonSubir`,
  `MarcaGeometrica`, `Icono`, `Contenedor`.
- Componentes de página: `Boton` (variantes solido / contorno / punteado /
  claro-contorno), `TarjetaProyecto` (destacada / grilla / compacta),
  `PozoImagen` (marco de imagen ausente), `AvisoPendiente`, `BloqueCTA`
  (completo / compacto) y `MenuCV`. `MenuCV` lleva `data-selector-idioma`
  a propósito: reutiliza el script del selector de idioma (clic fuera,
  Escape, flechas) en vez de duplicarlo.
- Clase `.prosa` en `global.css` para el Markdown de los casos.
- `/sobre-mi` tiene su tercer párrafo en primera persona (`sobreMi.parrafo3`,
  antes `sobreMi.parrafoPendiente`), escrito con Juan Camilo en los tres
  idiomas: por qué eligió Diseño Interactivo (el pénsum multifacético), por qué
  junta interfaz y automatización (un sistema tiene que funcionar para
  presentarse como MVP) y el cierre sobre reportar lo que sale mal. Las dos
  cifras que cita, 2.4/5 y la mitad de los participantes, salen de
  `i-homotic` y de `siguiendo-la-huella-azul`: si esos casos cambian, la frase
  hay que revisarla. El tramo del medio dice ahora que su trabajo es definir
  cómo funciona el sistema completo y sostener esas decisiones hasta
  producción; antes decía «no vengo de la programación», que se leía como
  disculpa. Ni esa frase ni «no me considero programador», la literal de Juan
  Camilo, se usan: encima de un sistema suyo en producción restan lo hecho.
  **Son tres párrafos y no cuatro**, cortos, y viven dentro de un contenedor con
  la clase `.prosa` de los casos: así los tres tienen el mismo tamaño —antes el
  primero iba a 19 px y los demás a 16.5— y el `<strong>` toma el mismo
  resaltado que los casos sin escribir CSS nuevo. `.prosa` se declara con
  `:where()`, de modo que la utilidad `text-[17px]` le gana a sus 16.5 px. Por
  eso los párrafos se pintan con `set:html`: el resaltado viaja dentro de la
  cadena del diccionario. Dos o tres `<strong>` por párrafo, no más.
- Las 5 vistas construidas con contenido real en español: inicio, grilla
  con filtro client-side (`?categoria=`, `aria-pressed`, conteo en
  `aria-live`), plantilla de caso, sobre-mi y 404.
- `Pagina404.astro`, el cuerpo de la 404 que comparten la ruta de la raíz y
  la de cada idioma.
- `src/lib/proyectos.ts` con `proyectosPorLocale`, `proyectosDestacados`,
  `vecinosDeProyecto` y `proyectosRelacionados`; `src/lib/categorias.ts`
  con `etiquetaCategoria` y `slugCategoria`. `getCollection` se memoiza.
- i18n con rutas traducidas y las 127 cadenas del diccionario en es/en/fr.
  `de` sigue en `{}`.
- Los 5 casos en español dentro de `src/content/proyectos/es/`, con `orden`,
  categorías canónicas y portada. Son la única copia: no hay carpeta paralela.
- Los mismos 5 casos traducidos en `src/content/proyectos/en/` (FASE 6) y en
  `fr/` (FASE 6-bis), con los campos estructurales idénticos al español.
- Las 5 portadas reales (1600×1000, hechas por Juan Camilo) y las versiones
  en inglés y francés de las 3 que llevan texto: `<slug>-portada.png`,
  `-portada-en.png`, `-portada-fr.png`. i-homotic e industrial son logos, así
  que sirven para los cuatro idiomas. Las `-en` y las `-fr` ya están
  conectadas.
- Los dos retratos (`src/assets/retratos/`) y el CV en los tres idiomas
  activos (`public/cv/juan-camilo-bolanos-{es,en,fr}.pdf`).
- Toda la capa de SEO/GEO: `BaseLayout` con Open Graph, Twitter Card,
  hreflang y JSON-LD; `src/lib/seo.ts` (`siteDe`, `absoluta`);
  `src/lib/jsonld.ts` + `JsonLd.astro`; `src/lib/og.ts` con la plantilla de
  las tarjetas; el endpoint `src/pages/og/[...ruta].png.ts`;
  `src/pages/robots.txt.ts` y `src/pages/llms.txt.ts`; sitemap en la config.
- `public/_headers` (caché y seguridad) y `public/_redirects` (`/` → `/es/`),
  las dos piezas que Cloudflare Pages lee del build.

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
- `industrial` sigue sin `cita`: la frase del handoff es de la administradora
  del bar y no se publica sin ese permiso. (El marcador que lo señalaba en el
  cuerpo desapareció en FASE 8; el campo `cita` sigue vacío.)
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
- `public/_redirects` hace que `/` → `/es/` sea una 302 de HTTP. El
  `redirects` de `astro.config.mjs` genera una página con `meta refresh`, y
  los rastreadores de WhatsApp y LinkedIn no la siguen: quien comparta el
  dominio pelado se quedaba sin vista previa. En Cloudflare Pages la regla
  gana sobre el `dist/index.html`, así que el `redirects` de la config se
  queda — sigue siendo lo que hace funcionar `/` en `astro dev` y `preview`.
- El `Cache-Control` del endpoint de las tarjetas OG documenta la intención
  pero no llega a producción: en un build estático solo se escribe el cuerpo
  al disco y las cabeceras las pone el host. Si hacen falta de verdad, van en
  `public/_headers` (FASE 7).

Decisiones de FASE 6 que no hay que revertir:
- El `glob` loader de `content.config.ts` lleva `generateId` explícito. No es
  cosmético: por defecto usa el `slug` del frontmatter como id cuando ese
  campo existe, y el `slug` es idéntico en las traducciones de un mismo caso.
  Con solo español nunca colisionó; al aparecer `en/` cada archivo inglés
  pisaba al español con el mismo slug y la colección devolvía un solo idioma
  por caso. `generateId` devuelve la ruta sin extensión, que es justo el
  `<locale>/<slug>` que asume `localeDeEntrada()` en `src/lib/proyectos.ts`.
  Cualquier idioma nuevo depende de esto.
- Solo se tradujeron `titulo`, `resumen`, `rol` y el `cliente` de
  `siguiendo-la-huella-azul`, que es descriptivo. Los nombres propios de
  empresa (i-Homotic (GELECT S.A.S), Bar Industrial, Alico S.A.S BIC) van
  igual en los dos idiomas.
- ~~`herramientas` incluye «Desarrollo a la medida» en `empaques-ia-alico`, en
  español dentro del archivo inglés.~~ **Revisado en FASE 9**: el campo no
  alimenta ninguna comparación (solo se muestra con `join(', ')` y va a
  `keywords` del JSON-LD), así que sus etiquetas descriptivas se traducen como
  el resto de la prosa. Los nombres de producto (Figma, n8n, Unity) no.
- Los `[PENDIENTE]` del cuerpo se tradujeron como `[PENDING]`, no se
  resolvieron. `industrial` sigue esperando permiso del bar para la cita y
  las métricas, en inglés igual que en español.
- Los avisos `[PENDIENTE]` de la portada y de la grilla desaparecen solos en
  inglés: sus condiciones miran si hay proyectos en el idioma. No hubo que
  tocar `ui.ts` — las claves `inicio.destacadosPendiente` y
  `proyectos.pendiente` se quedan para los idiomas todavía vacíos.
- El título más largo en inglés sigue siendo el de `siguiendo-la-huella-azul`
  y cae en tres renglones en la tarjeta OG, igual que su original: la
  calibración de `tamanoTitulo` aguanta sin cambios.
- Los apóstrofes del frontmatter van tipográficos (’). El cuerpo Markdown
  pasa por smartypants y los convierte solo; el frontmatter no, así que un
  apóstrofe recto ahí saldría distinto al del texto en la misma página.

Decisiones de FASE 6-bis que no hay que revertir:
- El francés se activó en el mismo commit que su contenido, no antes:
  `useTranslations` cae al español en silencio, así que un `fr` a medias no
  rompe el build, solo deja frases sueltas en español dentro de páginas
  francesas. Se verificó que no queda ninguna comparando cada valor del
  diccionario español contra el texto visible de las 8 páginas de `dist/fr/`.
- Los decimales van con coma, como pide la ortografía francesa: 4,32 · 2,4/5 ·
  8,5 × 9,75 · 65 %. En español y en inglés siguen con punto. Es la única
  diferencia numérica entre las tres versiones de un mismo caso.
- Los `[PENDIENTE]` del cuerpo se tradujeron como `[EN ATTENTE]`, sin
  resolverse: `industrial` sigue esperando el permiso del bar en los tres
  idiomas. Al conseguirlo hay que editar los tres `industrial.md`.
- Las tarjetas OG no necesitaron nada: los tres TTF de `src/assets/og/`
  (Fraunces SemiBold, Inter Regular, Inter SemiBold) traen é à ç œ Œ è ê ï ù û
  « » y los guiones, comprobado renderizando con el mismo satori + sharp. El
  título más largo en francés vuelve a ser el de `siguiendo-la-huella-azul` y
  cae en tres renglones, igual que en los otros dos idiomas.
- ~~No hay CV en francés y no se inventó uno~~ **resuelto en FASE 10**: el PDF
  francés existe desde el 8 de agosto de 2026 y `CV` ya lista los tres idiomas
  activos. Lo que no cambia es la regla: `CV` solo lista PDFs que existen y
  `cvDe()` cae al primero disponible, nunca a un enlace roto.
- El selector de idioma y el `hreflang` pasaron a tres entradas solos, desde
  `LOCALES_ACTIVOS`. `RUTAS`, `NOMBRE_LOCALE`, `HREFLANG` y `OG_LOCALE` ya
  tenían `fr` desde FASE 1: no se tocó ninguno.
- El rol de servicio del caso `industrial` dejó de ir en femenino: ahí se
  describe un rol del flujo, no a una persona concreta. Cada idioma usa su
  forma no marcada, y no son la misma: en español «el mesero / los meseros»
  (masculino genérico, y es la palabra que usa Juan Camilo), en francés «le
  personnel de salle» (colectivo, porque «le serveur» sí marcaría género) y en
  inglés «the server», que ya era neutro. El original decía «las meseras» y el
  francés lo había heredado como «les serveuses». Las **administradoras** sí
  siguen en femenino: son personas identificadas del bar. No revertir ninguna
  de las dos cosas — ni volver a emparejar la palabra entre idiomas.

Decisiones de FASE 7 que no hay que revertir:
- Los iconos ya están en `public/`, generados por Juan Camilo con
  RealFaviconGenerator a partir de la marca del oso: `favicon.svg`,
  `favicon-96x96.png`, `favicon.ico`, `apple-touch-icon.png`,
  `site.webmanifest` y los dos PNG de 192 y 512 del manifest. El `<head>` los
  enlaza con esos nombres exactos; no se pegó el fragmento del generador
  porque habría duplicado etiquetas y pisado el `theme-color` por modo claro y
  oscuro, que va aparte y no depende de estos archivos. El oso va en claro
  sobre el verde profundo `#005348`: a 16 px la silueta necesita el contraste,
  y así el mismo icono sirve en pestaña clara y oscura sin un «dark icon»
  aparte. En el manifest los iconos llevan `"purpose": "any maskable"` y no
  solo `maskable`, que es lo que genera la herramienta: con un único juego de
  PNG, declarar ambos evita que un contexto que pide `any` se quede sin icono.
  Con ellos en su sitio, Best Practices pasó de 96 a **100** en las cuatro
  plantillas.
- El monograma «JC» del header y del footer lo reemplazó el oso de la marca,
  el mismo dibujo del favicon, en `Logo.astro` (fuente:
  `src/assets/marca/logo.svg`). Va en `currentColor` como el resto de los
  iconos, no en el turquesa del archivo original: así toma el claro que le
  toca sobre el cuadrado verde profundo sin mantener una versión por fondo. El
  hueco entre el hocico y la cabeza es parte del dibujo y deja ver la caja. Al
  montarlo, `nav.irAlInicio` perdió el «JC — » de los tres idiomas: se había
  puesto cuando el texto visible eran esas dos letras y el oso no lleva texto.
  El nombre que se lee al lado sigue siendo «Juan Camilo Bolaños».
- El `<title>` de la grilla y de Sobre mí lleva el nombre como sufijo, vía
  `conMarca()` en `src/lib/seo.ts` y la prop `tituloDocumento` de `BaseLayout`.
  El H1 y el `og:title` se quedan con el nombre corto a propósito: en un
  compartido el nombre ya lo pone `og:site_name`, y meterlo en `og:title` lo
  repetiría también dentro del alt de la tarjeta.
- `BaseLayout` precarga Inter y Fraunces latinas. @fontsource las declara
  dentro del CSS, así que el navegador solo las descubría tras parsear la hoja
  y el texto se reacomodaba al llegar la definitiva: la portada estaba en 90
  de Performance con un CLS de 0.141 y pasó a 97 con CLS 0. Los `?url` de
  Vite devuelven la misma ruta con hash que emite el CSS —verificado— así que
  no hay descarga duplicada. La itálica de Fraunces no se precarga: son 81 KB
  que solo gastan el énfasis del H1 y las citas de los casos.
- La portada del caso y la primera tarjeta de la grilla cargan en `eager` con
  `fetchpriority="high"`: son el elemento LCP de su plantilla y `astro:assets`
  las marcaba `lazy`. De ahí la prop `prioritaria` de `TarjetaProyecto`.
- `TarjetaProyecto` acepta `nivel`. En la grilla las tarjetas cuelgan del H1 y
  van en H2; en la portada y en relacionados cuelgan de un H2 y se quedan en
  H3. Con todo en H3 se saltaba un nivel de encabezado.
- El nombre accesible del logo y del selector de idioma empieza por el texto
  que se ve —«JC», «ES»— porque quien navega por voz dicta lo que lee
  (WCAG 2.5.3, Label in Name). Por eso `nav.irAlInicio` arranca con «JC» en
  los tres idiomas y el selector arma su etiqueta con el código delante.
- El toggle de tema lleva `aria-pressed`, fijado por su propio script: la
  etiqueta es la misma en los dos modos y sin eso no decía en cuál está. Se
  pone desde JS porque la página es estática y el modo lo decide el script sin
  parpadeo del `<head>`.
- Ni el selector de idioma ni `MenuCV` declaran `aria-haspopup`: lo que abren
  es una lista de enlaces, no un menú con `role="menu"`, y anunciarlo como
  menú promete una navegación que esos enlaces no tienen. `aria-expanded` y
  `aria-controls` describen lo que hacen.
- El conteo de la grilla no escribe en su región `aria-live` durante la carga,
  solo al filtrar (el parámetro `anunciar` de `aplicar()`). Antes soltaba
  «5 proyectos visibles» encima de la lectura inicial de la página.
- El color del anillo de foco se declara en `*` y no dentro de
  `:focus-visible`. `outline-color` vale `currentColor` mientras no se toque y
  `transition-colors` de Tailwind 4 lo lleva en su lista: el anillo nacía en el
  color del texto y viraba al acento durante 150 ms. Por lo mismo ahí no se usa
  el atajo `outline`, que reescribiría el color y devolvería el parpadeo.
- El pie deja libre la columna de los botones flotantes en móvil
  (`pr-[76px] md:pr-10`). A 360 px el de WhatsApp tapaba el final de la línea
  de derechos al llegar al fondo de la página. Se ataja por el ancho y no por
  la altura porque esa línea ocupa una o dos líneas según el idioma.
- `public/_headers` sí hacía falta: Pages sirve todo con
  `max-age=0, must-revalidate`, así que hasta los archivos con hash se
  revalidaban. Lleva caché inmutable para `/_astro/`, un día para las tarjetas
  OG —su URL depende del slug, no del contenido— y `nosniff`,
  `Referrer-Policy` y `X-Frame-Options`. **Sin CSP a propósito**: el script sin
  parpadeo del tema va en línea y Astro no emite su hash, y UserWay cargaría
  desde un dominio externo. Escribirla antes de resolver eso es escribirla dos
  veces. El HTML se queda con el `must-revalidate` de Pages para que un
  despliegue nuevo se vea de inmediato.
- La 404 existe en los tres idiomas. Cloudflare Pages sirve el `404.html` más
  cercano subiendo por el árbol de directorios, pero Astro solo emite como
  archivo suelto la de la raíz: las demás salen como `404/index.html` y Pages
  no las encontraría. La integración `cuatro-cero-cuatro-por-idioma` de
  `astro.config.mjs` las mueve a `<lang>/404.html` al terminar el build.
  Recorre el disco en vez de leer `LOCALES_ACTIVOS`, así que un idioma nuevo
  queda cubierto solo. No se resolvió con `build.format`, que cambiaría la
  forma de todas las URLs. El sitemap las excluye: llevan `noindex`.
  La de la raíz se queda en español, para quien se pierda fuera de todo
  prefijo de idioma, y el cuerpo lo comparten las dos rutas vía
  `Pagina404.astro`.
- Los enlaces visibles a LinkedIn llevan el perfil en el idioma del visitante
  vía `linkedinDe(locale)` (`src/config/sitio.ts`): `?locale=es-ES` en español
  y `?locale=en-US` en todo lo demás, porque el perfil existe escrito en esos
  dos idiomas y el francés todavía no. `SITIO.linkedin` se queda sin parámetro
  y sigue siendo la URL canónica: es la que va en el `sameAs` del JSON-LD
  —ahí se declara la identidad de la persona, no una versión traducida—, la de
  `llms.txt` y la que se muestra como texto del enlace en el hero. Si algún día
  hay perfil en francés, la función es el único sitio que hay que tocar.
- **UserWay: recomendado NO instalarlo.** Es un widget de superposición, y
  esos no arreglan lo que dicen arreglar: añaden JavaScript de terceros sobre
  un sitio que ya cumple AA —Accessibility 100, foco visible, recorrido por
  teclado y contraste verificados a mano, también en modo oscuro— y llegan a
  estorbar a los lectores de pantalla que dicen ayudar. En un portafolio de
  diseño de interacción, además, un reclutador que conozca el tema lo lee como
  señal contraria. El hueco sigue marcado en `BaseLayout` por si Juan Camilo
  decide otra cosa; la decisión es suya y a agosto de 2026 no está tomada.

Decisiones de FASE 8 que no hay que revertir:
- El `.nvmrc` con `22.19.0` no es cosmético: sin él, Cloudflare Pages elige la
  versión de Node por su cuenta y esa elección cambia sin aviso. Es la misma
  con la que se verifica el build en local.
- Los seis `[PENDIENTE]` del caso `industrial` se cerraron **sin resolverlos**:
  el permiso del bar sigue sin llegar. El párrafo que los sustituye en los tres
  idiomas solo afirma lo que el propio caso ya sostiene en otras secciones —las
  26 mesas, los más de 170 productos, el ciclo de cambios en el día— y no
  señala que falte nada. Cuando llegue el permiso, las cifras y la cita se
  **suman** a ese párrafo; no hay que quitar lo que hay ni volver a poner
  marcadores. Siguen siendo los tres `industrial.md` los que hay que editar.
- `BotonSubir` («volver arriba») vive en la esquina inferior izquierda, el
  espejo de los flotantes de contacto. Tres decisiones dentro:
  - **Se retira cuando el pie entra en cuadro.** Abajo a la izquierda está la
    línea de derechos, que a 360 px ya cede su lado derecho a los botones de
    contacto (`pr-[76px]`, ver `Footer.astro`). Cederle también el izquierdo la
    dejaría en una franja de 208 px. Retirar el botón sale más barato, no toca
    el pie y vale igual en todos los anchos; abajo quedan la navegación del pie
    y el header sticky, que nunca se va.
  - **La visibilidad se decide con `IntersectionObserver`, no escuchando
    `scroll`.** Un centinela de 520 px colgado del tope del documento marca el
    primer pantallazo. Así no hay un handler corriendo en cada cuadro mientras
    se desplaza la página. Son +546 bytes de JS y `dist/` sigue sin un solo
    archivo `.js`.
  - **`window.scrollTo({top: 0})` va sin `behavior` a propósito**: manda el
    `scroll-behavior` del CSS, que ya es `smooth` y vuelve a `auto` bajo
    `prefers-reduced-motion`. Una sola fuente para todo el sitio. El foco salta
    al logo solo si el clic vino del teclado (`evento.detail === 0`), o quien
    navega así seguiría en el pie con la página arriba. Mientras está
    desvanecido lleva `inert`: fuera del tabulador y del árbol de
    accesibilidad.

Decisiones de FASE 9 (ajuste de contenido) que no hay que revertir:
- **El sitio se leía como el de un desarrollador y esa era la queja.** El
  contenido se escribió antes de la hoja de vida actual; al compararlos, «Sobre
  mí» vendía un stack y los casos se contaban desde la construcción. Todo lo que
  sigue apunta a lo mismo: el rol es diseñar y definir estos sistemas.
- **Las habilidades salen de la hoja de vida, no de los casos.** Cinco grupos
  (`sobreMi.habilidades.*`): investigación y evaluación, diseño e ideación,
  sistemas de IA y automatización, prototipado/IoT/3D, y herramientas. El grupo
  «Desarrollo», con sus diez tecnologías, desapareció: era lo que más empujaba
  la lectura equivocada. Lo que queda de desarrollo es «desarrollo web asistido
  por IA», dentro de prototipado, tal como lo dice la hoja de vida. Los ítems
  traducibles viven en `sobreMi.hab.*` (antes `sobreMi.metodo.*`, renombradas);
  los nombres propios (Design Thinking, tree testing, prompt engineering, IoT,
  Figma, n8n…) van literales, sin clave. «Diseño de servicio» se toma de
  `etiquetaCategoria()` para no duplicar su traducción. El grupo de herramientas
  lleva `completo: true` y ocupa la fila entera: sus diez chips en media columna
  caían en cuatro renglones.
- **Las tecnologías siguen visibles, pero en el caso que las justifica.** El
  campo `herramientas` de cada `.md` es su sitio: ahí tienen contexto. Se podó
  lo que solo describía un stack (TypeScript, Tailwind, i18next, Vercel, React
  Three Fiber) y `industrial` ganó «Desarrollo asistido por IA», que es lo que
  de verdad pasó y lo que dice la hoja de vida. Dos correcciones que hizo Juan
  Camilo al revisar: `siguiendo-la-huella-azul` lleva **Blender** (el render del
  espacio) y `industrial` **no lleva Figma**, que no se usó ahí.
- **Los chips de herramientas llevan el logo de cada producto**
  (`src/components/IconoHerramienta.astro`), y solo ese grupo: los otros cuatro
  son métodos y disciplinas, que no tienen marca. Los paths se copiaron de
  Simple Icons (CC0) al componente en vez de instalar el paquete o pedirlos a un
  CDN, que es lo que permite sumar diez logos sin tocar el rendimiento: SVG en
  línea, cero peticiones, cero JavaScript. Cuesta ~10 KB en el HTML de una sola
  página, 4,4 KB ya comprimido. Van en `currentColor` como el oso y el resto de
  iconos, así que sirven en claro y en oscuro sin una segunda versión; a 13 px y
  en `text-texto-tenue` dan 4.80:1 sobre el chip, por encima del 3:1 que pide un
  gráfico. **Microsoft Clarity usa el logo de Microsoft**: no tiene uno propio en
  la librería.
- **El resaltado de cifras se usa con moderación: dos o tres por sección.** Si
  se resalta cada número, dejan de resaltar. Están en el resultado de
  `i-homotic` —donde la enumeración Likert pasó a lista con la cifra al frente— y
  en el de `vr-capacitacion-alico` (4.32 y 4.9/5). `siguiendo-la-huella-azul` ya
  lo tenía en sus bullets de 80% y 50%. Es el mismo `**negrita**` que
  `.prosa strong` pinta en verde profundo, o menta en modo oscuro.
- ~~**Francés B1**, no B2~~ **revertido en FASE 10**: volvió a B2 el 8 de agosto
  de 2026, otra vez a pedido de Juan Camilo y otra vez con la hoja de vida
  actualizada en el mismo momento. La regla que sobrevive a los dos cambios es
  esa: el nivel del sitio y el del PDF se mueven juntos, nunca uno solo.
- **Regla de escritura: nada de incisos entre rayas.** Se limpiaron las 107
  rayas de los 15 archivos de casos. La raya sobrevive solo como separador de
  etiqueta (`Español — nativo`, el `Nombre — Título` de los `<title>`, el
  `cliente` de `siguiendo-la-huella-azul`) y como atribución de cita
  (`> — Participante de validación`). En prosa se usan dos puntos, coma,
  paréntesis o punto. Aplica a todo lo que se escriba de aquí en adelante,
  incluidos los casos nuevos.
- Encabezados de caso: `## Lo que construí` pasó a `## El sistema`
  (`industrial`) y a `## Lo que diseñé` (`empaques-ia-alico`); `## Lo que
  construimos` a `## Lo que entregamos` (`i-homotic`). Alimentan el índice
  lateral, que se regenera solo.
- Ningún dato cambió: las cifras, las citas, las limitaciones reportadas y los
  aprendizajes son los mismos. Solo cambió quién parece haber hecho qué.
- **El PDF del CV se descarga con nombre legible**, «Juan Camilo Bolaños - CV
  (Español).pdf», vía el atributo `download` y `nombreArchivoCv()` de
  `src/config/sitio.ts`. La URL se queda en minúsculas y con guiones, que es lo
  que corresponde a una dirección: el nombre bonito solo existe al guardar.
  Empieza por el nombre porque quien descarga varios CV los agrupa por persona.
  El idioma sale de `NOMBRE_LOCALE`, así que un idioma nuevo queda cubierto solo.
  Las etiquetas visibles («Descargar CV», «Idioma del CV», y los idiomas del
  menú en su propia lengua) se revisaron y **se dejaron como estaban**: decisión
  de Juan Camilo el 7 de agosto de 2026.

Decisiones de FASE 10 (CV en tres idiomas) que no hay que revertir:
- **El CV en francés solo necesitó una línea.** Juan Camilo subió
  `public/cv/juan-camilo-bolanos-fr.pdf` y actualizó los otros dos; en el código
  todo el cambio fue añadir `fr` al objeto `CV` de `src/config/sitio.ts`. De ahí
  salieron solos `CV_IDIOMAS`, el menú desplegable con las tres entradas
  (`MenuCV` ya se convertía en menú al haber más de un PDF), el enlace del pie,
  el `hreflang` de cada descarga y el nombre legible de cada archivo. Es la
  prueba de que `CV` es de verdad la única fuente: un idioma nuevo entra igual,
  con una línea, y ninguno aparece antes de que su PDF exista.
- El menú pone primero el PDF del idioma que se está leyendo (el `sort` de
  `MenuCV`), así que en `/fr/` la primera opción es «Français» y en `/es/`,
  «Español». Con tres entradas eso ya se nota; con dos casi no.
- **El enlace del pie también descarga con el nombre legible.** Se le había
  quedado un `download` a secas desde antes de FASE 9, de modo que el mismo CV
  se guardaba como «Juan Camilo Bolaños - CV (Español).pdf» desde el botón de la
  página y como «juan-camilo-bolanos-es.pdf» desde el pie. Ahora los dos pasan
  por `nombreArchivoCv()`.
- El nivel de francés volvió a **B2** en las tres versiones del diccionario
  (`sobreMi.idiomas.fr`). Ver la nota tachada en las decisiones de FASE 9.
- **El hero de la portada y la presentación de «Sobre mí» recortan con
  `overflow-x-clip`, no con `overflow-hidden`.** Con `hidden`, el desplegable
  del CV se cortaba contra el borde inferior de su propia sección: en «Sobre
  mí» a 1024x800 el menú sobresale 153 px y no quedaba visible ninguna de las
  tres opciones, y en la portada pasaba a 52 px de que ocurriera lo mismo.
  `clip` es el único valor que permite recortar un eje y dejar el otro visible
  (`hidden` en un eje convierte el otro en `auto`), así que las dos secciones
  siguen protegidas contra el desbordamiento horizontal, que es de lo que se
  defendían. No devolverlas a `overflow-hidden`: con tres entradas el menú mide
  159 px de alto y cualquier idioma o zoom que estire la columna lo vuelve a
  cruzar.
- **No se verificó el contenido de los PDF.** Los tres usan fuentes
  subconjuntadas sin `ToUnicode` legible, así que no se pudo extraer su texto
  para comprobar que el francés dice B2 y que el PDF francés está en francés.
  Se toma la palabra de Juan Camilo, que los actualizó en el mismo momento.

Pendientes conocidos, además de las fases:
- Las portadas de los dos casos de Alico llevan el logo entre y=781 y y=898
  del lienzo de 1000 px, y el recorte de la portada del caso solo conserva
  y=171 a y=829: el logo sale cortado ahí y en la tarjeta de relacionados.
  Se arregla en Canva subiendo el logo — todo el contenido debe caber entre
  y=170 y y=830 —, no en el código.
- ~~CV en inglés~~ y ~~CV en francés~~: los tres idiomas activos tienen su PDF
  desde el 8 de agosto de 2026, todos con francés B2. Solo faltaría el alemán,
  y solo si algún día se activa `de`.
- Pedir al bar Industrial permiso para la cita y las métricas del caso.
- El caso `abuelos-nietos` y su portada.
- Los cambios visuales que Juan Camilo quiera pedir sobre lo ya construido, y
  los archivos e imágenes que va a sumar dentro de cada caso.
- `llms.txt` ya cubre los tres idiomas: se arma recorriendo `LOCALES_ACTIVOS`,
  así que al activar el francés apareció sola su sección. Un idioma nuevo entra
  igual, sin tocar nada.
- Las portadas de los casos se descargan más grandes de lo que su recorte
  conserva (`object-cover` en cajas más bajas que la imagen): Lighthouse estima
  27 KiB en móvil. Arreglarlo obliga a generar recortes distintos por caja y el
  rendimiento ya está en 97-100 sin eso. Candidato para después de publicar.
- Al conseguir el permiso del bar hay que editar los tres `industrial.md`: las
  cifras y la cita se suman al párrafo de cierre que dejó FASE 8, que ya no
  lleva marcadores.

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
   (`-portada-en.png`, `-portada-fr.png`) y la referencia el `.md` de ese
   idioma.
3-bis. Traducir el caso a `src/content/proyectos/en/<slug>.md` y a `fr/`, con
   las reglas de FASE 6 (mismo `slug`, `orden`, `destacado`, `categoria`,
   `herramientas` y `año`). Mientras falte un idioma, el caso no sale en él:
   el `hreflang` y el selector de idioma lo detectan solos vía
   `localesDeProyecto()`, y el selector manda a la grilla en vez de a un 404.
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
- FASE 6 — Inglés: **completa.** Los 5 casos están en
  `src/content/proyectos/en/` y la interfaz ya estaba traducida en `ui.ts`.
  Una sesión por idioma: traducir cinco casos largos dos veces en una sola
  conversación degrada el resultado.
- FASE 6-bis — Francés: **completa.** Las 111 claves en `fr`, los 5 casos en
  `src/content/proyectos/fr/` y `'fr'` en `LOCALES_ACTIVOS`, en ese orden y en
  un solo commit.
- FASE 6-ter — Alemán, si algún día se hace: mismo guion que el francés.
  `de` está en `{}` en `ui.ts` y `src/content/proyectos/de/` está vacía;
  `RUTAS`, `NOMBRE_LOCALE`, `HREFLANG` y `OG_LOCALE` ya tienen `de`, así que
  no hay que tocarlos. Añadir `'de'` a `LOCALES_ACTIVOS` **solo al final**:
  `useTranslations` cae al español cuando falta una clave, de modo que un `de`
  incompleto no rompe el build, solo deja frases en español dentro de páginas
  alemanas. Reglas de frontmatter, ya aplicadas en `en/` y `fr/`: `slug`,
  `orden`, `destacado`, `categoria`, `herramientas` y `año` idénticos al
  español. `slug` porque la URL y `localesDeProyecto()` emparejan las
  versiones por él; `categoria` porque es un enum de Zod con los valores
  canónicos en español, que se muestran traducidos vía las claves
  `categoria.*`. Faltarían las portadas `-portada-de.png` de los tres casos
  con texto (i-homotic e industrial son logos y sirven igual). Una sesión por
  idioma: traducir cinco casos largos dos veces en una sola conversación
  degrada el resultado.
- FASE 7 — QA y despliegue. **La parte de código está completa** (ver
  «Decisiones de FASE 7»): etiquetas de icono, títulos con marca, Lighthouse
  ≥95 en las cuatro categorías y las cuatro plantillas, recorrido por teclado,
  `public/_headers`, responsive verificado a 360/768/1280 en los tres idiomas
  sin desbordes horizontales, y la 404 traducida.

  **Lo que falta para publicar, y no lo resuelve el código:**
  - ~~El permiso del bar Industrial~~ resuelto en FASE 8: los 6 `[PENDIENTE]`
    se reescribieron sin cifras ni cita y ya no bloquean.
  - Conectar el repo de GitHub al proyecto de Pages (comando `npm run build`,
    salida `dist`) y apuntar `juancamilo492.online` con su DNS.
  - Comprobar, ya publicado, que compartir el dominio pelado en WhatsApp y
    LinkedIn muestra la vista previa con imagen — es lo que verifica de verdad
    que `public/_redirects` y las tarjetas OG funcionan en Pages.

  **Decidido y descartado:** el widget UserWay. Ver «Decisiones de FASE 7».

  **No bloquean el lanzamiento**, pero conviene resolverlos antes de difundir
  el enlace: ~~los CV en inglés y francés~~ (publicados), las portadas de Alico
  con el logo cortado, el caso `abuelos-nietos` y los archivos e imágenes que
  Juan Camilo quiere sumar a cada caso.

- FASE 8 — Publicación. Empieza con el sitio ya desplegado: conectar el repo a
  Pages y apuntar el DNS lo hace Juan Camilo desde los paneles, no el código.
  Prompt de arranque: "Lee CLAUDE.md. Ejecuta FASE 8: el sitio ya está
  publicado en juancamilo492.online. Verifica en producción lo que no se puede
  verificar en local, deja el sitio dado de alta en Search Console y decide la
  analítica."

  **Lo que hay que comprobar ya publicado**, porque en local no se puede:
  1. Compartir el dominio pelado en WhatsApp y en LinkedIn: tiene que salir la
     vista previa con imagen. Es lo que demuestra que `public/_redirects`
     manda `/` a `/es/` con una 302 de verdad y que las tarjetas OG se sirven.
  2. Que `public/_headers` llegó: `curl -I` sobre un archivo de `/_astro/`
     debe traer `max-age=31536000, immutable`, y cualquier página, `nosniff`.
  3. Las 404 por idioma: pedir `/fr/loquesea` tiene que devolver la francesa
     y `/loquesea` la de la raíz, las dos con estado 404.
  4. `robots.txt`, `llms.txt` y `sitemap-index.xml` accesibles en el dominio
     real, con las URL absolutas apuntando a `https://juancamilo492.online`.
  5. Lighthouse sobre el dominio publicado, no sobre `localhost`.

  **Indexación.** El sitio ya trae todo lo que se hace desde el código
  (sitemap, `robots.txt` abierto, canonical, hreflang, JSON-LD, `llms.txt`).
  Lo que falta es darlo de alta: Google Search Console, verificando por
  registro TXT en el DNS —que ya está en Cloudflare, así que no hace falta
  meter ninguna etiqueta en el HTML— y enviar `sitemap-index.xml`. Bing
  Webmaster Tools importa la propiedad desde Search Console si se quiere.
  Indexar tarda días o semanas; un dominio nuevo no aparece por pedirlo.

  **Analítica: recomendado Cloudflare Web Analytics, no Google Analytics.**
  En un proyecto de Pages se activa con un clic y Cloudflare inyecta su script
  en el despliegue siguiente, sin tocar el código ni el `<head>`. GA4 significa
  ~50 KB de JavaScript de terceros sobre un sitio cuyo JS propio son 3 KB, y
  con visitantes europeos —el sitio está en francés— obliga a un banner de
  consentimiento, que es justo el tipo de cosa que este portafolio no tiene.
  Además la CSP que se dejó sin escribir (ver decisiones de FASE 7) tendría
  que contemplarlo. Ninguna de las dos ayuda a posicionar: quien indexa es
  Search Console. Decisión de Juan Camilo; a agosto de 2026 no está tomada.

- FASE 9 — Ajuste de contenido: **completa.** Con la hoja de vida y el perfil de
  LinkedIn de agosto de 2026 delante, se corrigió lo que hacía leer el sitio
  como el de un desarrollador, se actualizó el francés a B1, se sumó al «Sobre
  mí» lo que la hoja de vida aporta y se limpiaron los incisos entre rayas. Ver
  «Decisiones de FASE 9». No es una fase de código: si vuelve a hacer falta,
  el prompt es "Lee CLAUDE.md, en especial las decisiones de FASE 9, y ajusta
  el contenido contra la hoja de vida adjunta".

- FASE 10 — CV en tres idiomas: **completa.** Juan Camilo subió el PDF francés y
  actualizó el español y el inglés; en el código solo hubo que añadir `fr` al
  objeto `CV`, devolver el francés a B2 en el diccionario y darle al enlace del
  pie el mismo nombre de descarga legible que ya tenía el botón de la página.
  Ver «Decisiones de FASE 10». Para el CV alemán, si algún día existe, el guion
  es el mismo: el PDF en `public/cv/` y su línea en `CV`.
