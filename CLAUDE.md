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

Los casos en español están escritos en `contenido/` y NO deben reescribirse.
Son 5 de los 6 previstos; falta `abuelos-nietos`, que Juan Camilo agregará
después. Al integrarlos (FASE 4) hay que tocar solo el frontmatter:
añadir `orden` y remapear `categoria` a la lista canónica.

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

FASES 1, 2 y 3 están completas y commiteadas. `astro check` pasa con
0 errores, 0 warnings y 0 hints; el build genera 7 páginas.

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
  Colección `proyectos` vacía a la espera de FASE 4.

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

Pendientes conocidos, además de las fases:
- Retratos de Juan Camilo (hero y sobre-mi) e imágenes de los 6 casos.
- PDFs del CV en `public/cv/` (rutas ya declaradas en `src/config/sitio.ts`).
- El caso `abuelos-nietos`.
- Ampliar la historia de `/sobre-mi` en primera persona (hoy solo afirma
  hechos verificables de los casos y marca el resto como `[PENDIENTE]`).
- No hay `public/favicon.ico`; el dev server lo avisa en cada carga.
- El build avisa que la colección `proyectos` está vacía; desaparece en
  FASE 4.

## Qué le falta a FASE 4 (checklist)

Las páginas ya están construidas: FASE 4 solo mueve contenido, no rediseña.
Todo lo que dependa de la colección hoy muestra un `[PENDIENTE: ...]`
visible y debe quedar resuelto al terminar.

1. Copiar los 5 `.md` de `contenido/` a `src/content/proyectos/es/`,
   nombrando cada archivo con su `slug`. No reescribir el cuerpo: los `##`
   alimentan el índice lateral del caso.
2. En el frontmatter, y solo ahí:
   - añadir `orden` según la lista de la sección Contenido;
   - remapear `categoria` a la lista canónica (tabla de abajo);
   - **borrar `imagen_portada: "[pendiente]"`**: el campo es `image()` y
     ese string rompe la validación de Zod. Se vuelve a añadir cuando la
     imagen exista.
3. Mapeo acordado de categorías (regla en `src/content.config.ts`):
   - i-homotic → `Investigación`, `Diseño de servicio`, `UX/UI`
   - industrial → `Producto digital`, `UX/UI`
   - vr-capacitacion-alico → `Inmersivo`, `Investigación`
   - empaques-ia-alico → `IA y automatización`, `UX/UI`
   - siguiendo-la-huella-azul → `Inmersivo`, `Investigación`, `UX/UI`
4. Imágenes en `src/assets/proyectos/`, referenciadas desde el `.md` como
   `../../../assets/proyectos/<archivo>`. Las plantillas piden hasta
   1200px de ancho (portada del caso) y 800px (tarjetas), así que el
   original debe medir 1200px o más.
5. La cita de `industrial` está en el handoff ("Nos está coincidiendo muy
   bien con los datos facturados y con el inventario." — Administradora del
   bar). Confirmarla con Juan Camilo antes de ponerla en `cita` /
   `cita_autor`; no inventar citas para los demás casos.
6. Verificar después: la portada muestra i-homotic, industrial y
   vr-capacitacion-alico; la grilla genera un chip por cada categoría en
   uso; el anterior/siguiente sigue el `orden`; los relacionados comparten
   categoría.

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
- FASE 6 — Inglés: "Lee CLAUDE.md. Crea las versiones en inglés de la
  interfaz y de los 6 casos a partir de los .md en español, manteniendo el
  tono. Marco [PENDIENTE] lo que requiera decisión humana."
- FASE 7 — QA y despliegue: "Lee CLAUDE.md. Audita Lighthouse y
  accesibilidad hasta cumplir las metas, corrige, y configura el despliegue
  en Cloudflare Pages/Vercel con el dominio."
