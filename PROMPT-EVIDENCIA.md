# Encargo: añadir la evidencia visual de un caso

> **Cómo se usa este archivo.** Está escrito para una IA que continúa el
> trabajo. Abre tu asistente en la raíz del repositorio y pégale esto:
>
> ```
> Lee PROMPT-EVIDENCIA.md y ejecútalo para el caso <slug>.
> ```
>
> Un caso por sesión. Los slugs son: `i-homotic`, `industrial`,
> `vr-capacitacion-alico`, `empaques-ia-alico`, `siguiendo-la-huella-azul`,
> `abuelos-nietos`.

---

## Antes de escribir nada

1. **Lee `CLAUDE.md` completo.** Es la fuente de verdad del proyecto y
   documenta decisiones que no se pueden revertir. Presta especial atención a
   la sección «Evidencia dentro de los casos» y al bloque «Decisiones de
   FASE 15 que no hay que revertir».
2. **Lee el caso que vas a tocar**, en los tres idiomas:
   `src/content/proyectos/{es,en,fr}/<slug>.md`.
3. **Mira las imágenes** que hay en `src/assets/proyectos/<slug>/`. Si esa
   carpeta no existe o está vacía, **para y pídelas**: sin verlas no puedes
   escribir el texto alternativo, y ese texto no se puede deducir del caso.

## Qué hay que hacer

El portafolio ya describe bien cada proyecto, pero hasta ahora la única imagen
de un caso era su portada. La maquinaria para intercalar evidencia en el
cuerpo **ya está construida y verificada**: cuatro directivas de Markdown que
se convierten solas en marcado optimizado, traducido y accesible.

Tu trabajo es **solo contenido**: colocar las piezas en el relato y escribir
sus textos en español, inglés y francés.

## La gramática

Se escribe dentro del cuerpo del `.md`, en Markdown normal.

```markdown
:::figura
![Alt escrito mirando la imagen](../../../assets/proyectos/<slug>/pieza.png)

El pie que explica qué se está viendo y por qué importa.
:::
```

```markdown
:::figura{ancho ampliar}
![Alt](../../../assets/proyectos/<slug>/blueprint.png)

Un gráfico denso: ocupa 844px y ofrece la versión legible.
:::
```

```markdown
:::galeria
![Alt de la primera](../../../assets/proyectos/<slug>/campo-01.jpg)

![Alt de la segunda](../../../assets/proyectos/<slug>/campo-02.jpg)

Pie común de las dos.
:::
```

```markdown
:::enlace-vivo{href="https://…" etiqueta="dominio.com" estado="prototipo"}
Qué hay detrás del enlace, dicho antes de que nadie pulse.
:::
```

```markdown
:::video{youtube="ID_DE_11_CARACTERES" titulo="Título del video"}
![Alt del fotograma](../../../assets/proyectos/<slug>/video-miniatura.jpg)

Pie del video.
:::
```

**Atributos:**

- `ancho` — la figura pasa de 680 a 844px. Para blueprints, journey maps,
  infográficos y cualquier pieza panorámica.
- `ampliar` — añade un enlace que abre la imagen en un visor sobre la página.
  Requiere una segunda copia, a resolución completa, en
  `public/evidencia/<slug>/` **con el mismo nombre de archivo**. Si falta, el
  build lo avisa y sale un `[PENDIENTE]` visible.
- `estado` — `produccion`, `prototipo` o `demo`. Solo en `:::enlace-vivo`.

## Reglas que no puedes romper

1. **No inventes nada.** Es la regla de oro del proyecto: cero métricas,
   testimonios, fechas o afirmaciones que no estén ya en el caso o en el
   material que te dieron. Si falta algo, deja `[PENDIENTE: …]` visible.
2. **El alt se escribe mirando la imagen**, no deduciéndolo del caso. Describe
   lo que se ve. Si no puedes ver la imagen, pídela.
3. **El pie va en el cuerpo de la directiva, nunca en el `title` de la
   imagen.** El `title` no pasa por la puntuación tipográfica y el resto del
   cuerpo sí: quedaría un apóstrofe recto junto a prosa con apóstrofes curvos.
4. **La misma imagen sirve para los tres idiomas.** Se traducen el alt y el
   pie, no se rehacen las piezas. (Distinto de las portadas con texto, que sí
   tienen versiones `-en` y `-fr`.)
5. **Máximo 6 piezas por caso, 1 por sección**, salvo la sección que enumera
   entregables, que admite hasta 3. Una galería cuenta como una pieza.
6. **Nunca en la primera sección** (enseñaría la solución antes del problema)
   **ni en la última** (es reflexión).
7. **Cada pieza necesita una mención en el texto.** Un pie no puede ser la
   primera vez que se nombra algo. Si hace falta, añade una frase corta al
   cuerpo que la introduzca.
8. **Nada de incisos entre rayas** (regla de FASE 9). La raya sobrevive solo
   como separador de etiqueta y como atribución de cita. En prosa se usan dos
   puntos, coma, paréntesis o punto.
9. **Apóstrofes y comillas tipográficos en el frontmatter** (’ “ ”). El cuerpo
   los convierte solo; el frontmatter no.
10. **Un solo enlace arriba.** `sitio_url` en el frontmatter es solo para el
    producto principal **en producción**. Un prototipo, una demo o un sitio
    tras un login van en el cuerpo con `:::enlace-vivo{estado="…"}`.

## Lo que NO debes tocar

- `src/lib/evidencia.ts` — el plugin que traduce las directivas. Funciona y
  está verificado.
- `astro.config.ts` — la configuración del motor de Markdown y de imágenes.
- `src/components/VisorImagen.astro` y el script de la fachada de video.
- Las reglas `.ev-*` de `src/styles/global.css`.
- **No instales dependencias.** Todo esto funciona con cero paquetes nuevos y
  así debe seguir.
- Los otros cinco casos. Una sesión, un caso.

Si crees de verdad que hace falta tocar algo de eso, **dilo y para**; no lo
cambies por tu cuenta.

## Tamaños de las imágenes

Un solo archivo por pieza: Astro genera las versiones responsivas en webp.

| Pieza | Ancho de origen | Formato | Peso máx. |
|---|---|---|---|
| Figura normal | 1360 px | PNG si lleva texto o líneas; JPG si es foto | 400 KB |
| Figura ancha | 1700 px | ídem | 600 KB |
| Foto de galería | 840 px | JPG | 250 KB |
| Miniatura de video | 1280×720 exactos | JPG | 250 KB |
| Copia para `ampliar` | hasta 2800 px, en `public/evidencia/<slug>/` | PNG diagramas, JPG fotos | 1,5 MB |

Nombres de archivo en minúsculas y con guiones, sin el slug delante y sin
sufijo de idioma: `service-blueprint.png`, `montaje-stand.png`,
`probe-01.jpg`.

## Qué tiene cada caso

- **`i-homotic`** — sitio en producción (va en `sitio_url`), sitio con el
  modelo 3D del stand (`:::enlace-vivo{estado="demo"}`), infográfico del
  montaje, gráficas de herramientas (service blueprint, mapa de actores).
- **`industrial`** — capturas de las pantallas del sistema, con los datos
  sensibles tapados. **Comprueba antes si el sitio enseña algo sin
  credenciales**; si no, va sin `sitio_url` y solo con capturas. El esquema de
  la base de datos queda fuera por decisión del autor.
- **`empaques-ia-alico`** — renders del cliente y el front que se mostró en la
  feria, en el cuerpo con `estado="prototipo"`, diciendo en el párrafo que no
  es un producto funcional. Sin `sitio_url`.
- **`siguiendo-la-huella-azul`** — video del render final en YouTube (estrena
  `:::video`), one-page design, journey map y fotos de las pruebas con
  personas, con las caras tapadas.
- **`vr-capacitacion-alico`** — video del prototipo, gráficos de Looker Studio
  y la guía metodológica.
- **`abuelos-nietos`** — investigación pura: fotos de los cultural probes,
  evidencias del proceso en clase e infografías de resultados. Ni enlaces ni
  video.

## Cosas del motor que ya sabemos (no las redescubras)

Astro 7 no usa remark: su motor de Markdown es Sätteri, en Rust. Tres
comportamientos que costó encontrar y que ya están resueltos en el plugin:

- Una directiva **mal escrita** (`:::figrua`) desaparecería del HTML con todo
  su contenido y sin decir nada. El plugin lo convierte en un `[PENDIENTE]`
  visible más un aviso en consola. **Si ves un `[PENDIENTE]` en la página, es
  eso: revisa cómo escribiste la directiva.**
- `ctx.report()` no imprime nada y un `throw` deja el caso publicado con el
  cuerpo vacío y el build en verde. Por eso los avisos van por
  `console.warn` + marcador visible.
- Los arrays de números no sobreviven al paso a Rust. Irrelevante para ti si
  no tocas el plugin, pero es el motivo de que las imágenes lleven `width` y
  no `widths`.

## Verificación antes de dar el trabajo por terminado

```bash
npm run build
```

1. **0 errores, 0 warnings y 0 hints** en `astro check` (va dentro de `build`).
2. **Ningún `[PENDIENTE]` inesperado** en el HTML generado:
   `grep -r "PENDIENTE" dist/<lang>/`
3. **Ningún aviso `[evidencia]`** en la salida del build.
4. Revisa la página en `npm run preview` (nunca en `npm run dev`, que da
   métricas falsas) **a 360, 768 y 1280 px, en los tres idiomas**, en modo
   claro y oscuro. Sin desbordamiento horizontal.
5. Si añadiste un video, comprueba que la miniatura se ve y que el botón de
   play abre el reproductor sin salir de la página.
6. Si añadiste `ampliar`, comprueba que el visor abre con la imagen y su
   leyenda, y que cierra con Escape.
7. Abre `/es/proyectos/<slug>.md` y confirma que la evidencia sale aplanada y
   legible. (Los acentos rotos ahí en local son esperables y están
   documentados; se arreglan en producción.)

## Al terminar

- **Un commit por caso**, con mensaje en español explicando qué evidencia se
  añadió y por qué va donde va. No mezcles casos.
- Actualiza en `CLAUDE.md` la lista de casos pendientes de evidencia, tachando
  el que acabas de cerrar.
- Escribe en español: el proyecto, sus comentarios y sus commits están en
  español, con acentuación correcta.
