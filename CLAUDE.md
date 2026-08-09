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
historial de git si alguna vez hacen falta. **La colección está completa**: los
6 casos están en `src/content/proyectos/es/`, en `en/` (FASE 6) y en `fr/`
(FASE 6-bis), y `abuelos-nietos` cerró la lista el 8 de agosto de 2026.

Orden acordado (gobierna la grilla, el anterior/siguiente y qué destacados
salen en la portada):
1. i-homotic · 2. industrial · 3. vr-capacitacion-alico ·
4. empaques-ia-alico · 5. siguiendo-la-huella-azul · 6. abuelos-nietos

Los 6 archivos traen `destacado: true`; la portada muestra los 3 de menor
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

FASES 1 a 7 están completas y commiteadas, **iconos y logo incluidos**, más las
fases 9 a 13. `astro check` pasa con 0 errores, 0 warnings y 0 hints; el
build genera 31 páginas, 27 tarjetas Open Graph **con el oso y el fondo del
banner** (FASE 13), **los 18 casos en Markdown**,
el sitemap (27 URL, sin los `.md`), `robots.txt` y `llms.txt`.
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
- Los 6 casos en español dentro de `src/content/proyectos/es/`, con `orden`,
  categorías canónicas y portada. Son la única copia: no hay carpeta paralela.
- Los mismos 6 casos traducidos en `src/content/proyectos/en/` (FASE 6, más
  `abuelos-nietos`) y en `fr/` (FASE 6-bis, ídem), con los campos
  estructurales idénticos al español.
- Las 6 portadas reales (1600×1000, hechas por Juan Camilo) y las versiones
  en inglés y francés de las 4 que llevan texto: `<slug>-portada.png`,
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

Decisiones de FASE 12 (el sitio se dirige a quien recluta) que no hay que
revertir:
- **El portafolio leía como el de un freelance y el objetivo es empleo formal.**
  La insignia decía «Disponible para proyectos» —en francés, «Disponible pour
  vos projets»—, el CTA prometía «Cuéntame qué necesitas y te respondo el mismo
  día», que es lenguaje de proveedor de servicios, y el WhatsApp era el botón
  grande y verde de la esquina. Un reclutador que ve eso en alguien recién
  graduado lee «va a usar el empleo de puente». Decisión de Juan Camilo el 8 de
  agosto de 2026.
- **El trabajo con clientes NO se tocó y no hay que tocarlo.** Tener clientes
  reales recién graduado es una ventaja, no un problema. Lo que se cambió es el
  marco de disponibilidad, que es otra cosa: la portada habla de empleo y los
  casos siguen hablando de clientes. Un cliente que llega a un portafolio
  escribe igual; un reclutador necesita saber que estás disponible para un
  puesto. Por eso `inicio.pruebaSocial`, `meta.inicio.descripcion` y el campo
  `Cliente` de la barra de contexto se quedaron como estaban.
- Tres cadenas por idioma, nueve en total: `inicio.badge` («Abierto a nuevas
  oportunidades», que es la fórmula de LinkedIn y un reclutador la reconoce sin
  pensar), `cta.apoyo` (sin el «cuéntame qué necesitas») y `cta.apoyoCompacto`
  (el correo antes que el WhatsApp).
- **Los dos pares de botones se intercambiaron entre sí, no se rediseñaron.**
  En el bloque de CTA el correo pasó a primero y a la variante `solido`; en los
  flotantes pasó al de abajo, que en una pila anclada a la esquina es el
  prominente. Mismas cajas, mismos tokens, mismas medidas: solo cambió qué
  canal ocupa cada una. El canal principal de quien busca empleo es el correo,
  no el WhatsApp.
- `--shadow-whatsapp` pasó a `--shadow-contacto`: el nombre describía al
  inquilino y no a la caja, y ahora esa caja la ocupa el correo.
- El teléfono **se queda**. Se evaluó quitarlo entero por exposición (queda
  legible por máquina en el pie, en `telephone` del JSON-LD y en `llms.txt`) y
  Juan Camilo decidió conservarlo el 8 de agosto de 2026. Lo que cambió es su
  prominencia, no su presencia.

Decisiones de FASE 13 (las tarjetas Open Graph con la marca actual) que no hay
que revertir:
- **Las tarjetas eran de FASE 5 y se habían quedado con dos piezas anteriores a
  la marca**: el monograma «JC», que el oso reemplazó en FASE 7 en el header y en
  el pie, y el fondo claro `#F9FFFE`. Un enlace compartido no se parecía al banner
  de LinkedIn desde el que suele llegar quien lo abre. Lo que cambió es la piel de
  la plantilla, no su reparto: oso y nombre arriba, etiqueta en versalitas, título
  de la página, bajada y pie con el dominio siguen donde estaban, porque es lo que
  hace que cada compartido muestre el título de SU página. Decisión de Juan Camilo
  el 8 de agosto de 2026.
- **Todo el cambio vive en `src/lib/og.ts`.** `rutaOg()`, las rutas de las
  imágenes, el `og:image` de `BaseLayout`, `meta.ogAlt` (que no menciona colores),
  el endpoint y el sitemap no se tocaron: las 24 tarjetas se regeneraron solas.
- Fondo: degradado a 100° entre `--color-noche-footer` (#06231C),
  `--color-noche` (#0B2A22) y un #0D4335 derivado de `--color-profundo`, con
  `backgroundColor` debajo por si el degradado no se resolviera. Los textos pasaron
  a los tokens de noche: `--color-noche-titulo` en el título (15.9:1),
  `--color-noche-cuerpo` en la bajada (7.4:1) y `--color-menta` en la etiqueta y en
  el dominio (9.7:1). El comentario de la constante `COLOR` dice que es un espejo
  de `global.css` y hay que mantenerlo cierto.
- **El oso entra por `?raw`, no por `process.cwd()` como las fuentes.** Vite
  inlinea el string del SVG en el bundle del build, así que no depende del
  directorio de trabajo y el archivo no se emite a `dist/`. `vite/client` ya
  declara el tipo `*?raw` vía `astro/client`: `astro check` no necesitó nada.
- **satori quiere un `ArrayBuffer`, no el `Buffer` de Node**, aunque su README
  liste las dos cosas. sharp rasteriza el SVG una vez por build (memoizado con el
  mismo patrón que `cargarFuentes()`) y `aArrayBuffer()` copia el rango exacto;
  pasar el `Buffer` directo revienta el build con «First argument to DataView
  constructor must be an ArrayBuffer». Se rasteriza a 2× el tamaño de uso porque a
  1200 px de ancho el borde del oso se nota.
- El oso va **suelto sobre el fondo, sin el cuadrado verde** del header: ahí el
  cuadrado lo separa de una superficie clara, y sobre el degradado oscuro el blanco
  se separa solo. Es además como aparece en el banner. El PNG conserva el alfa, así
  que el hueco entre el hocico y la cabeza deja ver el degradado, igual que en el
  sitio.
- Las ondas y las miras se dibujan **con divs, no con SVG**, que es lo que ya hacía
  `ondas()`: dos anillos más y el centro en (1150, 640) para que el barrido llegue
  al centro del lienzo, y `mira()` reproduce `MarcaGeometrica.astro` con un div
  circular y cuatro barras de 1,5 px.
- **La bajada de «Sobre mí» mostraba `<strong>` literal en las tres tarjetas.**
  Era un defecto anterior, de FASE 9: `sobreMi.intro` lleva HTML porque su página
  la pinta con `set:html`, y satori dibuja texto, no marcado. `textoPlano()` quita
  las etiquetas **antes** de recortar, o gastarían caracteres del límite y el corte
  caería antes de tiempo. Se aplica también al título y a la etiqueta, para que la
  próxima cadena del diccionario que gane resaltado no repita el defecto.
- No entró Fraunces itálica a `src/assets/og/`: la usaría solo el énfasis del H1 de
  la portada, que aquí llega como una cadena única, y son 80 KB más en el repo por
  un detalle que la tarjeta no distingue.
- `tamanoTitulo()` y el corte de 130 letras **no se tocaron**: el peor caso de la
  colección (`siguiendo-la-huella-azul`) sigue cayendo en tres renglones a 44 px,
  verificado en los tres idiomas, y el francés sigue trayendo sus acentos y su
  cedilla desde los mismos tres TTF.
- Al desplegar hay que pasar el dominio por el **Post Inspector de LinkedIn**: las
  tarjetas se sirven con `max-age=86400` desde `public/_headers` y las redes
  cachean la vista previa, así que la versión clara puede seguir apareciendo un día
  si no se refresca a mano.
- **«Ver como Markdown» abre en otra pestaña**, contra lo que decidió FASE 11
  («va en la misma pestaña porque es un recurso del sitio»). Decisión de Juan
  Camilo el 8 de agosto de 2026: el `.md` es texto plano que el navegador muestra
  desnudo, y volver al caso no debería depender del botón atrás. Lo que la nota
  tachada de FASE 11 sí sigue diciendo bien es por qué es un `<a>` y no un
  `<button>`. Van con él dos piezas que no son opcionales:
  - El icono `enlace-externo` de `Icono.astro` (caja abierta y flecha que sale),
    detrás del texto y a `opacity-70`, que es donde se espera el indicador. El ojo
    se queda delante: uno dice qué hace, el otro dónde lo abre.
  - `proyectos.nuevaPestana` en un `<span class="sr-only">` **detrás** del texto y
    no como `aria-label`: el nombre accesible tiene que empezar por lo que se lee
    (WCAG 2.5.3, la misma regla que el «ES» del selector de idioma). Un
    `aria-label` habría reemplazado el texto visible en vez de sumarse.
  - `rel="noopener"`, como los demás `target="_blank"` del sitio.
  Verificado a 360 px: el enlace pasó de ~190 a 212 px, las dos píldoras siguen
  envolviendo en dos líneas y no hay desborde horizontal.

Comprobado en producción el 8 de agosto de 2026, con el sitio ya publicado en
Cloudflare Pages (cierra los puntos 1 a 5 de FASE 8 salvo el compartido en
WhatsApp/LinkedIn, que hay que hacer a mano):
- `/` devuelve **302 a `/es/`** de verdad, no el `meta refresh`: `_redirects`
  funciona. `/loquesea`, `/es/loquesea`, `/fr/loquesea` y `/en/loquesea`
  devuelven **estado 404** con el `<html lang>` correcto de cada idioma, así
  que la integración `cuatro-cero-cuatro-por-idioma` acertó.
- `public/_headers` **llega entero**: `/_astro/` con
  `max-age=31536000, immutable`, las tarjetas OG con `max-age=86400`, los `.md`
  con `text/markdown; charset=utf-8` y `X-Robots-Tag: noindex`, y `nosniff`,
  `Referrer-Policy` y `X-Frame-Options` en todo. **El `charset` de los `.md`
  funciona**: los acentos salen bien publicados aunque en `astro preview` se
  vean rotos.
- `robots.txt`, `llms.txt` y `sitemap-index.xml` accesibles, con las 24 URL
  absolutas al dominio real. JSON-LD íntegro: los 36 `knowsAbout` y el resto.
- Lighthouse **sobre el dominio**: Performance 91-97, Accessibility 100, Best
  Practices 100 y SEO 100. Es más bajo que en `preview` (97-99) porque mide con
  la red real y la 4G simulada; no hay ninguna oportunidad con ahorro > 100 ms,
  CLS 0 y TBT 0 ms. El 91 de la portada es LCP 3,2 s, latencia y no código.
- El HTML se sirve con `Cache-Control: public, max-age=14400, must-revalidate`,
  no solo con `must-revalidate` como se suponía: son 4 horas en las que un
  visitante que vuelve puede ver el HTML anterior. Lo pone Pages, no
  `_headers`.

**Una cosa la decide el panel de Cloudflare, no el repositorio:**
- **La ofuscación de correo de Scrape Shield está activada** y reescribía los
  tres `mailto:` a `/cdn-cgi/l/email-protection#<hex>` y el texto del pie a
  «[email protected]». Es decir, el correo que se puso a la vista para que lo
  leyera un ATS solo existía tras ejecutar el script de Cloudflare. Resuelto
  desde el código con `<!--email_off-->` en `Footer`, `BotonesFlotantes` y
  `BloqueCTA`; el resto del sitio sigue protegido. **No se ve en local.**

**Resuelto — el bloqueo de Cloudflare a los rastreadores de IA ya no está.**
Hasta agosto de 2026 el robots.txt gestionado de Cloudflare anteponía su
propio bloque al que genera `src/pages/robots.txt.ts`, con `Disallow: /` para
Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot,
CloudflareBrowserRenderingCrawler, Google-Extended, GPTBot y
meta-externalagent, que dejaba sin efecto el `llms.txt`, los `.md` y el
`knowsAbout` para esos rastreadores (editar `robots.txt.ts` no servía: el
bloque se inyectaba por encima, y quitarlo era decisión de Juan Camilo desde
el panel del dominio). **Verificado en producción el 8 de agosto de 2026**
con `curl https://juancamilo492.online/robots.txt`: el archivo sale limpio,
tal cual lo genera el código, sin ningún bloque adicional de Cloudflare. Si
alguna vez reaparece, el arreglo sigue siendo el mismo: apagarlo en el panel,
no en el repositorio.

Decisiones de FASE 11 (capa técnica para ATS, crawlers y agentes) que no hay
que revertir:
- **El sitio describía bien sus páginas y mal a su autor.** Ese era el hueco:
  el `Person` no declaraba ni un tema, así que nada en el HTML respondía a
  máquina «¿tiene experiencia con IA?», «¿usa n8n?», «¿trabaja con APIs?»,
  aunque las 26 habilidades estuvieran a la vista en «Sobre mí». Todo lo que
  sigue apunta a eso. **Ningún dato nuevo entró al sitio**: cifras, clientes,
  tecnologías, cargos y fechas son los mismos.
- **`src/lib/perfil.ts` es ahora la única fuente de las habilidades y de los
  idiomas.** Los cinco grupos vivían en el frontmatter de `[pagina].astro`; se
  movieron sin cambiar un ítem ni su orden, porque desde ahora los lee también
  el JSON-LD. La regla que lo justifica: los datos estructurados no pueden
  afirmar nada que la página no muestre, y dos listas escritas aparte se
  separan. `temasConocidos()` aplana esos ítems y les suma las 6 categorías
  canónicas: 36 temas, todos visibles en pantalla. No lee la colección a
  propósito, para que las fábricas de JSON-LD sigan siendo síncronas.
- **`knowsLanguage` revisa la nota de FASE 5** («el JSON-LD no inventa nada: …
  ni `knowsLanguage`»). Aquella regla era no afirmar lo no publicado, y sigue
  en pie: los cuatro idiomas llevan desde siempre en «Sobre mí». El nivel del
  Marco Común (C1, B2, A2) **no** entra —`Language` no tiene dónde ponerlo— y
  sigue solo en el HTML. `IDIOMAS_PERFIL` se escribe aparte de `LOCALES` aunque
  hoy coincidan: una cosa es en qué idiomas está el sitio y otra cuáles habla
  su autor.
- Lo que sigue **fuera** del `Person` por no tener respaldo: `worksFor`, años
  de experiencia, premios, certificaciones y cualquier fecha de trabajo. Y
  `sameAs` se queda solo con LinkedIn: GitHub aparece en el sitio como logo de
  herramienta, no como perfil, y no hay URL. Decisión de Juan Camilo el 8 de
  agosto de 2026.
- `Person.email` va sin `mailto:` (schema.org pide la dirección; el URI es cosa
  del `href`) y `telephone` en E.164, que es el mismo número de `wa.me` y el
  que ahora se lee en el pie.
- **`referenciaPersona` ya no es un muñón**: lleva `url` y `jobTitle` además del
  `@id`. Cada `@graph` es autocontenido por decisión de FASE 5, así que un
  agente que aterriza en un caso suelto solo veía un nombre sin oficio.
- **Los casos se publican también en Markdown**: `/es/proyectos/industrial.md`,
  desde `src/pages/[lang]/[seccion]/[slug].md.ts`. El contenido ya existía
  —`markdownDeCaso()` lo arma para el botón «Copiar para LLM»— pero solo
  viajaba en base64 dentro de un `data-`, ilegible para un rastreador. **No
  entran al sitemap** (filtro en `astro.config.mjs`): la versión indexable es el
  HTML, y estos son una representación alternativa que el propio HTML anuncia
  con `<link rel="alternate" type="text/markdown">`. `rutaMarkdownDeCaso()` es
  la única fuente de esas URL, y `public/_headers` les fija el `Content-Type`
  por si el host no deduce la extensión.
- **Cada caso tiene los dos botones**: «Copiar para LLM» (el `<button>` de
  siempre) y «Ver como Markdown», que es un `<a>` real al `.md`. Enlace y no
  botón a propósito: funciona sin JS, se abre en pestaña nueva con el clic del
  medio y deja un enlace interno rastreable. ~~Va en la misma pestaña porque es un
  recurso del sitio.~~ **Revisado en FASE 13**: abre en otra pestaña, ver sus
  decisiones. A 360 px las dos píldoras envuelven en dos líneas
  (`flex-wrap`), no se desbordan.
- **El `charset=utf-8` del bloque `/*.md` de `public/_headers` es la línea más
  frágil del proyecto.** El archivo en disco es UTF-8 correcto y el endpoint
  declara el charset, pero en un build estático esa cabecera no llega: solo se
  escribe el cuerpo. `astro preview` sirve `.md` como `text/markdown` a secas y
  Chrome cae a windows-1252, así que **en local los acentos se ven rotos
  («menÃº») y es esperable**. Lo que lo arregla en producción es esa línea, y no
  se ha podido comprobar publicado. Es lo primero que hay que mirar tras el
  despliegue. Descartada la alternativa del BOM: markdown-it y compañía no lo
  quitan y convertirían el `# Título` en un párrafo.
- **`imagen_alt` es por idioma, no compartido.** Cuatro de las seis portadas
  llevan texto —por eso existen las `-portada-en.png` y `-portada-fr.png`—, así
  que describir en español una imagen cuyo texto está en francés sería describir
  otra imagen. Los 18 textos se escribieron mirando cada PNG, no deduciéndolos
  del caso. El campo es opcional: sin él la portada vuelve a `alt=""`, que es lo
  correcto mientras nadie la haya mirado.
- **Migas de pan visibles en los casos**, en sustitución del «← Todos los
  proyectos» (su clave `proyectos.todosLosProyectos` se retiró de los tres
  diccionarios). Hacen el mismo trabajo y ponen a la vista la jerarquía que el
  `BreadcrumbList` ya declaraba sin contraparte. La última miga lleva
  `truncate`: es solo visual, el título completo sigue entero en el DOM. Sin él,
  a 360 px ocupaba tres renglones. **`BreadcrumbList` sigue solo en los casos**,
  no en la grilla ni en Sobre mí: ahí no hay migas que mostrar.
- **Categorías y herramientas pasaron de cadenas unidas a listas.** El texto
  visible es idéntico byte a byte —el ` · ` y el `, ` van en un `<span
  aria-hidden>` que reproduce lo que hacía el `join`—, pero ahora un rastreador
  lee cuatro herramientas en vez de una cadena que tendría que partir. Mismo
  motivo para el `<time datetime>` del año, que solo aparece cuando el campo es
  un año suelto: `esAnioSuelto()` en `src/lib/proyectos.ts` es la regla
  compartida con el `dateCreated` del JSON-LD, que antes tenía su propia regex.
- **Los chips de la grilla siguen siendo `<button>`, no enlaces.** Aquí no hay
  página que descubrir: los 6 casos ya están en el HTML estático de la grilla
  sin filtrar y en el sitemap, y el filtro solo aplica `hidden` en runtime.
  Convertirlos en `<a href="?categoria=">` crearía 6 URL por idioma con el mismo
  contenido a cambio de cero descubribilidad.
- Los dos `<nav>` del header comparten `aria-label` **y está bien**: nunca
  están los dos en el árbol de accesibilidad. El de escritorio es `hidden
  md:block` (display:none en móvil) y el móvil lleva el atributo `hidden` salvo
  cuando se abre, momento en el que el otro ya está oculto por CSS.
- El pie muestra el correo y el número escritos. Hasta ahora solo existían
  dentro de un `href` y de un `aria-label`, de modo que no estaban en el texto
  de ninguna página. Van en la primera columna, sin tocar la grilla de tres.
- `max-image-preview:large` es lo que de verdad aporta el `<meta name="robots">`
  positivo: sin él el buscador se limita a una miniatura pequeña, y esto es un
  portafolio de diseño.
- Arreglo latente: el `x-default` se buscaba sobre todas las alternativas y no
  sobre las que existen. Con los 5 casos en español no se manifestaba; un caso
  que algún día solo esté en inglés habría apuntado al índice de la sección.

Decisiones de la sesión del 8 de agosto de 2026 (después de FASE 13, sin
número de fase) que no hay que revertir:
- **Transición de tema en `src/styles/global.css`.** El cambio entre modo
  claro y oscuro era instantáneo en el `body`, los encabezados y cualquier
  contenedor con `dark:` que no pasara por un componente con
  `transition-colors` (la mayoría de botones y enlaces ya la tenían). Se
  agregó una regla `*, ::before, ::after { transition-property: background-color,
  border-color, color, fill, stroke; transition-duration: 250ms; }` dentro de
  `@layer base`, después del bloque de `outline-color`. Se excluye
  `outline-color` a propósito, por la misma razón que ya documentaba ese
  bloque: mezclarla ahí reproduce el parpadeo del anillo de foco. El bloque
  `prefers-reduced-motion` ya existente la cubre sin tocarlo.
- **`TarjetaProyecto.astro` suma `background-color` y `border-color` a su
  lista de `transition-[...]`.** Su propia declaración es más específica que
  la regla universal de arriba y la reemplazaba entera, así que sin este
  cambio la tarjeta seguía sin suavizar su cambio de fondo/borde en modo
  oscuro pese a la regla global.
- **Botón "Conoce más sobre mí" en la portada**, entre "Proyectos destacados"
  y "Qué hago" (`src/pages/[lang]/index.astro`), con la variante `contorno`
  de `Boton.astro` (la misma que "Hablemos" en el hero) y la clave nueva
  `inicio.conocerMas` en `src/i18n/ui.ts` (es/en/fr; `de` se deja fuera,
  sigue en `{}`).
- **Las tarjetas OG de los proyectos por WhatsApp no tenían ningún bug**: se
  investigó a fondo (`src/lib/og.ts`, `src/pages/og/[...ruta].png.ts`, git
  log) y una sola plantilla genera todas las tarjetas sin ramas por tipo de
  página; el commit de FASE 13 las reescribió todas de una vez. Lo que se ve
  desactualizado en un proyecto compartido antes de hoy es la **caché de
  vista previa de WhatsApp/Meta**, independiente del `max-age=86400` de
  Cloudflare. Se resuelve igual que el caso ya documentado de LinkedIn (ver
  FASE 13): pegando la URL en el Facebook Sharing Debugger
  (`developers.facebook.com/tools/debug`) y usando «Scrape Again», porque
  WhatsApp comparte esa infraestructura de rastreo con Meta. No requiere
  ningún cambio de código; queda como pendiente manual de Juan Camilo.
- **Ícono de información junto a «Copiar para LLM» y «Ver como Markdown»**
  (`src/pages/[lang]/[seccion]/[slug].astro`). Un reclutador no tiene por qué
  saber qué es un LLM ni por qué un caso tendría un botón para «copiarlo»: el
  ícono nuevo (`Icono.astro`, `nombre="info"`) es un `<button>` sin texto
  visible cuyo `aria-label` lleva la explicación completa
  (`proyectos.infoMarkdown`), así que quien usa lector de pantalla la recibe
  al enfocarlo sin depender de nada visual. El mismo texto se repite, ahora
  `aria-hidden`, en un globo que aparece con `group-hover`/`group-focus-within`
  para quien ve la pantalla — doble canal, una sola fuente de texto. ~~El globo
  ancla su borde derecho al del ícono (`right-0`, no `left-0`) y limita su
  ancho con `max-w-[min(240px,calc(100vw-2rem))]`.~~ **Corregido el 8 de agosto
  de 2026, ver «El globo de información se ancla a la fila bajo 768px».**
- **«Conocer más» al pie de cada tarjeta de proyecto**
  (`TarjetaProyecto.astro`). La tarjeta entera ya era el enlace
  (`after:absolute` en el título), pero nada lo decía a la vista. Es un
  `<span>`, no un `<a>` propio — un enlace anidado dentro del enlace real
  sería inválido y confundiría el foco — y usa `group-hover`/`group-focus-within`
  para moverse con el resto de la animación de la tarjeta al pasar el mouse.
- **La mini-sección «¿Quieres conocerme mejor?» reemplazó al botón suelto**
  entre «Proyectos destacados» y «Qué hago»: ahí se perdía, entre dos
  secciones con título propio y sin nada que lo distinguiera. Se movió entre
  «Mi proceso» y el CTA final, dentro de su propia tarjeta bordeada (mismo
  patrón visual que «Qué hago», con `ondas` de fondo) para que no se lea como
  un botón huérfano. Nuevas claves `inicio.conocerMas.titulo` e
  `inicio.conocerMas.texto` en los tres idiomas; `inicio.conocerMas` se quedó
  como el texto del botón.
- **LinkedIn en «Sobre mí»**, con el mismo patrón que ya usaba el hero de
  inicio: ícono + la URL del perfil como texto visible, con `?locale=` según
  el idioma vía `linkedinDe()`. Antes «Sobre mí» era la única página de
  presentación sin invitación a LinkedIn.

Decisiones del caso `abuelos-nietos` (8 de agosto de 2026) que no hay que
revertir:
- **Es el sexto caso y cierra la colección.** No hizo falta tocar una sola línea
  de código: es la receta «Cómo se agrega un caso nuevo» aplicada tal cual, y
  todo lo que FASE 5 y FASE 11 construyeron (tarjeta OG, JSON-LD con `keywords`
  y `BreadcrumbList`, línea de `llms.txt`, entrada del sitemap, `hreflang`, el
  `.md` descargable, las migas y el `<time>`) salió del frontmatter. `orden: 6`
  ya estaba reservado, así que no hubo que renumerar nada.
- **El caso no termina en un producto, termina en una pregunta, y eso se dice
  sin disimulo.** El alcance era la fase de descubrimiento y su entregable es
  una infografía con nueve hallazgos más un reto de diseño formulado. Se
  escribió así a propósito: intentar que pareciera un proyecto de producto
  habría obligado a inventar, y el valor del caso es justamente que muestra la
  parte que casi ningún portafolio junior enseña.
- **Dos categorías, no tres.** `Investigación` y `Diseño de servicio`. Aquí no
  se diseñó ninguna interfaz, así que `UX/UI` habría sido falso. Las dos ya
  existían: la grilla no ganó ningún chip nuevo.
- **`herramientas` lleva métodos y no software, y es el único caso donde pasa.**
  Los otros cinco listan tecnología (Figma, n8n, Unity) porque es lo que tenían;
  este es investigación pura y sus herramientas son entrevistas, cultural
  probes, customer journey map, system map, user personas y mapa de empatía, que
  es literalmente lo que dice la diapositiva «¿Qué herramientas utilizamos?».
  Alimentan `keywords` del JSON-LD, que es lo que lee un ATS. Los nombres de
  método consolidados en inglés no se traducen, igual que Figma; «Entrevistas» y
  «Mapa de empatía» sí, por la regla de FASE 9. Quedaron fuera «mapa de actores»
  e «infografía», que se mencionan en el cuerpo: una es un entregable, no un
  método.
- **El nombre del proyecto sí se traduce**, contra la regla de FASE 6 sobre
  nombres propios. Esa regla es para razones sociales (i-Homotic (GELECT
  S.A.S), Alico S.A.S BIC); «Generaciones» es un nombre de proyecto académico
  del que Juan Camilo hizo tres versiones del logotipo, así que la portada
  inglesa dice «Generations» y la francesa «Générations». El `titulo` de cada
  `.md` sigue a su portada: dejarlo en español habría contradicho la imagen que
  el propio caso muestra arriba.
- El remate de «Lo que aprendí» es que **la investigación desmintió la hipótesis
  de partida del equipo**: habían escrito que los abuelos interfieren
  pasivamente porque el rol de los padres predomina, y los hallazgos 4 y 5 dicen
  lo contrario. Es el mismo registro de los otros casos, que reportan lo que
  salió mal con la misma prominencia que lo que salió bien. No suavizarlo.
- La limitación declarada es que las dos user personas se construyeron sobre un
  perfil de una sola comuna y un solo estrato, así que los hallazgos describen
  ese contexto y no todo Medellín. Sale de las propias personas, no es un añadido
  retórico.
- **Ningún dato se inventó.** Las cifras (2035, 3.6 → 2.9 miembros por hogar,
  3 de cada 4 nietos), las fuentes (Cardona 2019, Medellín Cómo Vamos, Pinazo y
  Montoro 2004), los testimonios y los nueve hallazgos salen de la presentación
  del proyecto. Si alguna vez hay que revisarlos, la fuente es esa.

**El globo de información se ancla a la fila bajo 768px** (8 de agosto de 2026,
`src/pages/[lang]/[seccion]/[slug].astro`). Corrige la nota tachada de arriba,
que resolvía el caso equivocado:
- El síntoma lo reportó Juan Camilo desde un Moto G56: el globo se salía por la
  **izquierda** de la pantalla. En el inspector con iPhone XR o Pixel 7 se veía
  bien, así que no se había detectado. Lo que cambia entre un teléfono y otro es
  cómo envuelven las dos píldoras («Copiar para LLM» y «Ver como Markdown»), y
  eso depende del ancho **y del idioma**. En el Moto las dos caben en una línea,
  de modo que el ícono baja solo a una segunda línea pegado al borde izquierdo,
  y un globo que se abre hacia la izquierda desde x≈0 se sale.
- **Voltearlo no bastaba.** Con 240px de ancho, `right-0` necesita el ícono a
  partir de x≥212 y `left-0` lo necesita antes de x≤88. En una columna de 328px
  (viewport de 360) queda una franja intermedia donde el globo no cabe en
  ninguna de las dos direcciones. Anclado al ícono el problema no tiene
  solución en pantallas estrechas: hay que anclarlo a la fila.
- La fila (`div.flex.flex-wrap`) lleva ahora `relative`, el ícono pasó de
  `relative` a `md:relative` y el globo a `left-0 max-w-full md:left-auto
  md:right-0 md:max-w-[240px]`. Bajo 768px el ancla es la fila, así que el globo
  ocupa la columna entera y **no puede desbordarse por ningún lado, en ningún
  idioma**; desde `md` el ícono recupera el ancla y el comportamiento es
  idéntico al anterior (a partir de 768px, `min(240px, calc(100vw-2rem))` ya
  valía 240px, así que ni el ancho cambia).
- Verificado midiendo el rectángulo del globo en **45 combinaciones**, 3 idiomas
  × 15 anchos de 320 a 1280 px: ningún borde fuera del viewport. El caso que
  reprodujo el fallo es el inglés a 412px, donde el ícono cae en x=20.

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
- ~~El caso `abuelos-nietos` y su portada~~: escrito en los tres idiomas y con
  sus tres portadas el 8 de agosto de 2026. **La colección queda cerrada.**
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
   build a propósito). Mapeo ya aplicado a los 6 casos:
   - i-homotic → `Investigación`, `Diseño de servicio`, `UX/UI`
   - industrial → `Producto digital`, `UX/UI`
   - vr-capacitacion-alico → `Inmersivo`, `Investigación`
   - empaques-ia-alico → `IA y automatización`, `UX/UI`
   - siguiendo-la-huella-azul → `Inmersivo`, `Investigación`, `UX/UI`
   - abuelos-nietos → `Investigación`, `Diseño de servicio`
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
3-alt. `imagen_alt` en el frontmatter, **escrito mirando la imagen**, no
   deducido del caso. Es opcional y el build no avisa si falta: sin él la
   portada sale con `alt=""` y se trata como decorativa, que no rompe nada pero
   desperdicia información. Va **por idioma**, porque una portada con texto
   traducido es otra imagen. Es el único paso que FASE 11 añadió a esta receta.
3-bis. Traducir el caso a `src/content/proyectos/en/<slug>.md` y a `fr/`, con
   las reglas de FASE 6 (mismo `slug`, `orden`, `destacado`, `categoria`,
   `herramientas` y `año`). Mientras falte un idioma, el caso no sale en él:
   el `hreflang` y el selector de idioma lo detectan solos vía
   `localesDeProyecto()`, y el selector manda a la grilla en vez de a un 404.
4. Verificar: la portada muestra los 3 destacados de menor `orden`, la
   grilla genera un chip por categoría en uso, el anterior/siguiente sigue
   el `orden` y los relacionados comparten categoría.
5. Lo de FASE 5 y FASE 11 se resuelve solo: la tarjeta Open Graph
   (`/og/<locale>/proyecto/<slug>.png`), el JSON-LD del caso con sus
   `keywords` y su `BreadcrumbList`, la línea de `llms.txt`, la entrada del
   sitemap, el `hreflang`, **el `.md` del caso con su botón «Ver como
   Markdown»**, las migas visibles y el `<time>` del año salen todos del
   frontmatter. Nada que tocar, salvo revisar que el título no desborde la
   tarjeta si pasa de ~130 letras.

   Lo que **no** toca un caso nuevo: `src/lib/perfil.ts`. El `knowsAbout` del
   nodo Person sale de las habilidades de «Sobre mí» y de las categorías
   canónicas, no de los proyectos. La contrapartida es que editar un chip de
   «Sobre mí» sí cambia los datos estructurados: es a propósito —para que no
   puedan decir cosas distintas—, pero significa no poner ahí nada que no se
   pueda sostener.

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
  con el logo cortado, ~~el caso `abuelos-nietos`~~ (publicado) y los archivos e
  imágenes que Juan Camilo quiere sumar a cada caso.

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

- FASE 11 — Capa técnica para ATS, crawlers y agentes de IA: **completa.** No
  fue un rediseño ni una fase de contenido: el HTML, los tokens, las fuentes y
  el layout siguen igual, y no entró ni un dato nuevo al sitio. Lo que cambió es
  cómo queda representado lo que ya había: `Person` con `knowsAbout` (36 temas),
  `knowsLanguage` y `hasOccupation`; los casos en Markdown como URL; las
  portadas con texto alternativo escrito mirándolas; migas visibles; y las
  herramientas, las categorías y el año como listas y `<time>` en vez de
  cadenas unidas. Ver «Decisiones de FASE 11». `astro check` sigue en 0/0/0 y
  Lighthouse en 97-99 / 100 / 100 / 100 sobre las cuatro plantillas.

- FASE 12 — La portada se dirige a quien recluta: **completa.** Nueve cadenas del
  diccionario y dos pares de botones intercambiados entre sí, para que el marco de
  disponibilidad hable de empleo formal y el correo sea el canal principal. El
  trabajo con clientes no se tocó. Ver «Decisiones de FASE 12».

- FASE 13 — Tarjetas Open Graph con la marca actual: **completa.** Casi todo en un
  archivo, `src/lib/og.ts`: el monograma «JC» dejó paso al oso y el fondo claro al
  degradado del banner de LinkedIn, con el mismo reparto de siempre. De paso se
  corrigió el `<strong>` que se leía literal en la bajada de «Sobre mí», y
  «Ver como Markdown» pasó a abrir en otra pestaña, con su flecha de enlace
  externo. Ver «Decisiones de FASE 13».

- FASE 14 — El caso `abuelos-nietos`: **completa.** El sexto y último caso de la
  colección, «Generaciones», una investigación de primer año sobre el vínculo
  entre abuelos y nietos en Medellín. Tres archivos nuevos, tres portadas y cero
  líneas de código: es la receta de «Cómo se agrega un caso nuevo» aplicada por
  primera vez de principio a fin, y funcionó sin sorpresas. Ver «Decisiones del
  caso `abuelos-nietos`». Con esto **la colección queda cerrada**: seis casos en
  español, inglés y francés.
