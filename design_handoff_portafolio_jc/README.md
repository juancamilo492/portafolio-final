# Handoff: Portafolio web — Juan Camilo Bolaños

## Overview
Portafolio personal de Juan Camilo Bolaños (Diseñador de Interacción y Creador de Sistemas de IA, Medellín, Colombia). Dos audiencias: reclutadores de diseño/UX y clientes PYME. Cuatro vistas: **Inicio**, **Caso de estudio**, **Grilla de proyectos** y **404**. Todo el contenido está en español; la interfaz contempla ES/EN/FR (y más idiomas a futuro).

## About the Design Files
Los archivos de este paquete son **referencias de diseño hechas en HTML** — prototipos que muestran la apariencia y el comportamiento buscados, **no código de producción para copiar y pegar**. La tarea es **recrear estos diseños en el entorno del codebase destino** (Next.js/React recomendado, ver abajo) usando sus patrones, librerías y convenciones. Si aún no existe codebase, el stack sugerido es **Next.js (App Router) + TypeScript + Tailwind CSS**, coherente con el resto del trabajo de Juan Camilo.

Nota técnica: el prototipo está escrito como un "Design Component" (un `.dc.html` con plantilla + una clase de lógica estilo React). Todos los estilos son **inline** por requisitos de la herramienta de prototipado — en producción deben pasarse a Tailwind o CSS modules. El modo oscuro está implementado con un bloque de reglas `[data-tema="oscuro"] … !important` que existe solo porque los estilos inline no permitían otra cosa: **en producción usar `dark:` de Tailwind o variables CSS**, no ese bloque.

## Fidelity
**Alta fidelidad (hifi).** Colores, tipografía, espaciado, estados y copys son definitivos. Debe recrearse pixel-perfect con las librerías del codebase. Las imágenes son placeholders (`<image-slot>`) — se reemplazan por fotos reales.

---

## Design Tokens

### Colores
| Token | Hex | Uso |
|---|---|---|
| `bg` | `#F9FFFE` | Fondo claro base |
| `accent` | `#00BD7B` | Acento principal, botones sólidos, énfasis en itálicas |
| `accent-hover` | `#00A96D` | Hover del botón sólido |
| `deep-900` | `#005348` | Texto de titulares, footer, bloques oscuros |
| `deep-800` | `#1F5E3D` | Texto fuerte secundario, gradiente de bloques |
| `mint-400` | `#48D98B` | Detalles y acentos en modo oscuro |
| `mint-500` | `#3AB071` | Detalles sutiles |
| `dark-bg` | `#0B2A22` | Fondo de modo oscuro |
| `dark-surface` | `#11342B` | Tarjetas y superficies en oscuro |
| `dark-fab` | `#12382E` | Botón flotante en oscuro |
| `text-body` | `#3F6A5C` | Párrafos en claro |
| `text-muted` | `#4A7466` / `#5A7D72` | Texto secundario |
| `text-faint` | `#7A9990` | Etiquetas en mayúsculas |
| `text-dark-body` | `#9CBDB2` | Párrafos en oscuro |
| `text-dark-strong` | `#EAFBF4` | Titulares en oscuro |
| `text-dark-accent` | `#8FEFC1` | Énfasis en oscuro |
| `on-accent` | `#04241C` | Texto sobre verde esmeralda |
| Bordes claro | `rgba(0,83,72,.10)` cards · `rgba(0,83,72,.12)` · `rgba(0,83,72,.16–.28)` botones |
| Bordes oscuro | `rgba(72,217,139,.16)` · `rgba(72,217,139,.55)` FAB |
| Wells de imagen | `#EDF7F3` (claro) / `#11342B` (oscuro) |
| Footer | `#005348` (claro) / `#06231C` (oscuro) |

Contraste: todos los pares texto/fondo cumplen AA. Foco visible global: `outline: 2px solid #00BD7B; outline-offset: 3px`.

### Tipografía
- **Titulares**: `Playfair Display` (Google Fonts), weight 500, itálica 400 para énfasis.
- **Cuerpo/UI**: `Plus Jakarta Sans` (Google Fonts), weights 300/400/500/600/700.
- Escala usada: H1 hero 66px / line-height 1.04 / letter-spacing -.025em · H1 caso 56px · H1 grilla 54px · 404 número 96px (-.04em) · H2 sección 40px (-.02em) · H2 caso 34px · H3 tarjeta 21–22px · Cita 27px itálica · Cuerpo hero 19px/1.6 w300 · Cuerpo caso 16.5px/1.75 w300 · Cuerpo tarjeta 14px/1.6 w300 · Etiquetas 11.5px uppercase letter-spacing .13em · Botones 14.5px w600.
- `text-wrap: pretty` en titulares largos.

### Espaciado y forma
- Contenedor: `max-width: 1200px`, padding lateral 40px.
- Ritmo vertical entre secciones: 92px (72–88px en caso de estudio).
- Radios: 20px tarjetas · 18px tarjetas pequeñas y barra de contexto · 24–26px bloques grandes/CTA · 14px menús · 999px píldoras · 11px monograma.
- Sombras: hover de tarjeta `0 18px 40px -26px rgba(0,83,72,.55)`; menús `0 20px 44px -24px rgba(0,83,72,.6)`; FAB WhatsApp `0 12px 30px -12px rgba(0,189,123,.95)`.
- Grids: 3 columnas con `gap: 26px` (tarjetas), 24px (relacionados).

### Firma visual (patrones)
- **Ondas concéntricas**: `repeating-radial-gradient(circle at <x> <y>, rgba(0,189,123,0) 0 Npx, rgba(0,189,123,.09–.13) Npx (N+1)px)` sobre el fondo. Radios de repetición 24–54px según la sección. En oscuro se usa `rgba(72,217,139,.09)`.
- **Marca geométrica** (reemplazó a las estrellas de 4 puntas): mira/objetivo de trazo fino — `<circle r=7>` + cuatro trazos `M12 1v5 M12 18v5 M1 12h5 M18 12h5`, stroke 1–1.4px, color según contexto. Aparece en hero, franja de prueba social, CTA final y 404.
- Los patrones nunca reducen legibilidad: opacidad muy baja, siempre detrás del contenido.

---

## Screens / Views

### Header (persistente en las 4 vistas)
Sticky, `background: rgba(249,255,254,.86)` + `backdrop-filter: blur(14px)`, borde inferior `rgba(0,83,72,.09)`. En oscuro `rgba(11,42,34,.9)`.
- Izquierda: monograma "JC" (38×38, radio 11, fondo `#005348`, texto `#F9FFFE` en Playfair 16px) + nombre "Juan Camilo Bolaños" (Plus Jakarta 14px/500).
- Centro-derecha: enlaces **Inicio · Proyectos · Sobre mí** (14px/500, `#1F5E3D`, hover `#00BD7B`), gap 34px.
- Derecha (separado por borde vertical): **selector de idioma** y **toggle de tema**.
  - Idioma: botón píldora con ícono de globo + código actual + caret; abre un menú (min-width 180px) con la lista de idiomas (Español/English/Français, extensible). Opción activa: fondo `rgba(0,189,123,.1)`, texto `#005348`, weight 600. El menú debe cerrarse al hacer clic fuera y con `Escape` (pendiente en el prototipo).
  - Tema: botón circular 34px con ícono de luna; alterna claro/oscuro en todo el sitio.

### Vista 1 — Inicio
Orden exacto de secciones:
1. **Hero** — grid `1.05fr .95fr`, padding 96px/88px. Izquierda: badge "● Disponible para proyectos" (punto con animación `pulseDot` 2.4s), H1 "Diseñador de Interacción y *Creador de Sistemas de IA*" (la segunda parte en itálica `#00BD7B`), subtítulo, fila de acciones y enlace discreto a LinkedIn (13px, `#5A7D72`). Acciones: **Ver proyectos** (sólido esmeralda) · **Hablemos** (outline, ancla a `#contacto`) · **Descargar CV** (borde punteado, abre dropdown con idioma del PDF). Debajo, indicador de scroll: círculo 30px con flecha (`scrollHint`, 2s) + texto "MIRA LOS PROYECTOS" que hace scroll animado a los destacados. Derecha: retrato **siempre en blanco y negro** (`filter: grayscale(1) contrast(1.05)`), radio 22px, aspect 4/4.6, sobre un bloque verde desplazado (`linear-gradient(160deg,#005348,#1F5E3D)`), con la marca geométrica arriba a la izquierda.
2. **Franja de prueba social** — banda con bordes horizontales, marca geométrica + "Proyectos con clientes reales en Medellín: gastronomía, industria del empaque, domótica."
3. **Proyectos destacados** — H2 + enlace "Ver todos →"; 3 tarjetas (imagen 200px, título Playfair 22px, resultado 14px). Hover: `translateY(-4px)` + sombra, 250ms ease.
4. **Qué hago** — 3 tarjetas con ícono lineal 22px, título 21px y una línea de descripción. Fondo con ondas en la esquina superior derecha.
5. **Mi proceso** — 3 columnas separadas por líneas verticales, borde superior; numeración 01/02/03 en Playfair `#00BD7B`, títulos Descubrir / Diseñar / Entregar 26px.
6. **Muestra de modo oscuro del hero** — bloque `#0B2A22` con la versión oscura del hero (badge menta, H1 42px, botones). Controlable con la prop `mostrarMuestraOscura`.
7. **CTA final** — bloque `linear-gradient(150deg,#005348,#1F5E3D)` + ondas, radio 26px, padding 72/56. Marca geométrica, H2 "¿Trabajamos juntos?" 46px, línea de apoyo, botones **WhatsApp** (sólido) y **Correo** (outline claro), y debajo **Volver arriba** (scroll animado al tope).
8. **Footer** — grid `1.4fr 1fr 1fr` sobre `#005348`: monograma + descripción; columna Navegación (Inicio, Proyectos, Sobre mí, LinkedIn); columna Recursos con botón "Descargar CV" y chips de idioma. Barra inferior con "© 2026 Juan Camilo Bolaños. Todos los derechos reservados."

**Flotantes persistentes** (esquina inferior derecha, `position: fixed`, z-index 60): correo (46px, superficie clara / `#12382E` con borde menta en oscuro) y WhatsApp (52px, `#00BD7B`). Controlables con la prop `mostrarFlotantes`.

### Vista 2 — Caso de estudio (Industrial)
- Enlace "← Todos los proyectos" (bloque, propio renglón), badge "UX/UI · Producto", H1 "Industrial: menú digital y sistema de gestión para un bar", resumen de una línea, imagen grande (460px, radio 24).
- **Barra de contexto**: grid de 4 columnas — Cliente: Bar Industrial · Año: 2026 · Rol: Diseño y desarrollo de punta a punta · Herramientas: Next.js, TypeScript, Tailwind, Supabase, Vercel.
- **Cuerpo**: grid `220px 1fr`, gap 56px. Sidebar sticky (top 110px) con índice: El contexto / La decisión de diseño clave / Lo que construí / El proceso / El resultado / Lo que aprendí. Columna de contenido `max-width: 680px`, gap 56px entre bloques.
- **Cita editorial**: figura con fondo `#EDF7F3` + ondas, blockquote Playfair itálica 27px: "Nos está coincidiendo muy bien con los datos facturados y con el inventario." — Administradora del bar.
- **Al final**: navegación Anterior/Siguiente (2 tarjetas), fila de 3 proyectos relacionados, CTA de contacto compacto y footer corto.
- Contenido literal: ver el HTML. La decisión clave documentada es que los clientes **no** pueden ordenar desde el QR y que el mismo enlace, con sesión de mesera, se convierte en panel de toma de pedido.

### Vista 3 — Grilla de proyectos
- H1 "Proyectos" + bajada.
- **Chips de filtro**: Todos · UX/UI · IA y automatización · Inmersivo · Investigación. Activo: fondo `#005348`, texto `#F9FFFE` (oscuro: `#48D98B` / `#04241C`). Inactivo: transparente con borde `rgba(0,83,72,.18)`.
- **6 tarjetas** (imagen 190px, título, resultado en una línea, etiquetas de categoría en píldoras 11.5px). Filtrado client-side por categoría.

Datos de proyectos (título · resultado · categorías):
1. Industrial · "Menú QR y gestión para un bar real: el cliente consulta, la mesera ordena." · UX/UI
2. Empaques con IA · "Del formulario al render: caficultores ven su marca empacada, generada con IA." · IA y automatización, UX/UI
3. Siguiendo la huella azul · "Espacio interactivo para niños validado con prototipo de ESP32 y gestos." · Inmersivo
4. Planeta SST en VR · "Capacitación en seguridad laboral convertida en recorrido de realidad virtual." · Inmersivo
5. i-Homotic · "Domótica accesible: una app que traduce la casa conectada a lenguaje cotidiano." · UX/UI, IA y automatización
6. Investigación abuelos-nietos · "Estudio de campo sobre vínculos intergeneracionales y tecnología en el hogar." · Investigación

### Vista 4 — 404
Header y footer normales. Centrada, max-width 820px, padding 130px/120px, fondo con ondas centradas: marca geométrica, "404" en Playfair 96px, H1 "Esta página se perdió en el camino", párrafo explicativo, botones **Ir al inicio** (sólido) y **Ver proyectos** (outline). Debajo, "QUIZÁ BUSCABAS" con 3 tarjetas de proyecto.

---

## Interactions & Behavior
- **Navegación**: en producción son rutas reales — `/` (inicio), `/proyectos` (grilla), `/proyectos/[slug]` (caso), `not-found` (404). En el prototipo son estados.
- **Hover de tarjeta**: `translateY(-4px)` + sombra, `transition: transform .25s ease, box-shadow .25s ease`.
- **Scroll animado**: "Mira los proyectos" → sección de destacados (offset -80px); "Volver arriba" → tope. Implementado con `requestAnimationFrame` + easing `easeInOutQuad`, 480ms (en producción basta `scroll-behavior: smooth`).
- **Dropdowns** (idioma, CV): toggle por clic. Pendiente y necesario en producción: cierre al clic fuera y con `Escape`, navegación con flechas, `aria-expanded`/`aria-activedescendant`, foco atrapado en el menú.
- **Tema**: alterna todo el sitio; persistir la preferencia (`localStorage` + `prefers-color-scheme` como valor inicial).
- **Filtros de grilla**: filtrado inmediato client-side; en producción conviene reflejarlo en el query string (`?categoria=`).
- **Descargar CV**: cada idioma debe apuntar a su PDF (`/cv/juan-camilo-bolanos-es.pdf`, `-en`, `-fr`).
- **Sin formulario de contacto**: solo WhatsApp (`https://wa.me/<numero>`) y correo (`mailto:`). Falta reemplazar los placeholders por los datos reales.
- **Animaciones**: `pulseDot` (2.4s, badge disponible) y `scrollHint` (2s, indicador de scroll). Respetar `prefers-reduced-motion`.
- **Responsive**: el prototipo se entrega en escritorio pero el diseño es mobile-first. En móvil: hero a una columna con la foto arriba o abajo, grids de 3 → 1 columna (2 en tablet), sidebar del caso colapsa a un índice horizontal o se oculta, header con menú hamburguesa, chips en scroll horizontal.

## State Management
Estado local del prototipo (equivalente en producción: rutas + un par de contextos):
- `vista` → ruta.
- `tema: 'claro' | 'oscuro'` → contexto de tema, persistido.
- `lang: 'ES' | 'EN' | 'FR'` → i18n (next-intl o similar); afecta el contenido completo, no solo la etiqueta.
- `langMenu`, `cvMenu` → apertura de dropdowns.
- `filtro` → categoría activa de la grilla.
Datos: `PROYECTOS` (id, título, resultado, categorías), `CHIPS`, `IDIOMAS`. En producción, contenido en MDX/CMS.

## Assets
- **Fuentes**: Google Fonts — Playfair Display (400/500/600/700 + itálica) y Plus Jakarta Sans (300–700). Autoalojar con `next/font` en producción.
- **Íconos**: SVG inline de trazo (1.4–1.7px), 14–24px. Cualquier set lineal consistente (Lucide) funciona; los marcados a mano en el HTML son referencia.
- **Imágenes**: todas son placeholders `<image-slot>` — retrato del hero (siempre B/N), imágenes de proyecto y del caso de estudio. Reemplazar por assets reales optimizados (`next/image`).
- **Faltan datos reales**: número de WhatsApp, correo, URL de LinkedIn y los PDFs del CV.

## Screenshots
Capturas de referencia en `screenshots/` (parte superior de cada vista, escritorio):
- `01-vista.png` — Inicio (modo claro)
- `02-vista.png` — Grilla de proyectos
- `03-vista.png` — Caso de estudio
- `04-vista.png` — Inicio en modo oscuro
- `05-404.png` — Página 404

## Files
- `Portafolio Juan Camilo Bolanos.dc.html` — prototipo completo con las 4 vistas, modo claro/oscuro y todos los estilos.
- `image-slot.js` — componente de placeholder de imagen usado por el prototipo (no se lleva a producción).
