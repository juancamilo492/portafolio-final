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

## Sistema de diseño "Esmeralda"

- Colores: fondo claro `#F9FFFE`; acento `#00BD7B`; profundos `#005348` y
  `#1F5E3D` (texto fuerte, footer, base del modo oscuro); apoyos `#48D98B`
  y `#3AB071` solo en detalles. Definirlos como tokens de Tailwind.
- Modo oscuro: clase `dark` en `<html>`, persistida en localStorage,
  inicial según `prefers-color-scheme`, sin flash (script inline en head).
  Fondo oscuro derivado de los verdes profundos, nunca negro puro.
- Tipografía: Fraunces (titulares, serif) + Inter (cuerpo) vía @fontsource,
  self-hosted, `font-display: swap`.
- Firma visual: patrones SVG sutiles de ondas concéntricas y estrellas de
  4 puntas como textura de fondo (trazo fino, opacidad ≤ 0.08).
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
- hreflang entre versiones de cada página; `/` redirige a `/es/`.

## Contenido

Colección `proyectos` con esquema (Zod):
titulo, slug, cliente, año, rol, categoria[], herramientas[], destacado
(boolean), resumen, imagen_portada, orden (number). Estructura:
`src/content/proyectos/{es,en,fr,de}/<slug>.md`. Los 6 casos en español ya
están escritos (industrial, empaques-ia-alico, vr-capacitacion-alico,
i-homotic, siguiendo-la-huella-azul, abuelos-nietos) — usarlos tal cual,
sin reescribirlos.

Categorías canónicas para filtros: UX/UI, IA y automatización, Inmersivo,
Investigación.

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
- FASE 4 — Contenido: "Lee CLAUDE.md. Integra los 6 casos .md y sus
  imágenes optimizadas con astro:assets. Verifica destacados y orden."
- FASE 5 — SEO/GEO: "Lee CLAUDE.md. Implementa toda la sección SEO y GEO:
  metas, OG por proyecto, JSON-LD, sitemap, robots, llms.txt, hreflang."
- FASE 6 — Inglés: "Lee CLAUDE.md. Crea las versiones en inglés de la
  interfaz y de los 6 casos a partir de los .md en español, manteniendo el
  tono. Marco [PENDIENTE] lo que requiera decisión humana."
- FASE 7 — QA y despliegue: "Lee CLAUDE.md. Audita Lighthouse y
  accesibilidad hasta cumplir las metas, corrige, y configura el despliegue
  en Cloudflare Pages/Vercel con el dominio."
