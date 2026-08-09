# Contexto del proyecto

Portafolio de Juan Camilo Bolaños, diseñador de interacción (Medellín).
Astro estático + TypeScript + Tailwind 4, trilingüe (es/en/fr), publicado en
Cloudflare Pages en `juancamilo492.online`.

## Los dos archivos que tienes que leer

1. **`CLAUDE.md`** es la fuente única de verdad del proyecto: 1.500 líneas con
   el sistema de diseño, las reglas de contenido y, sobre todo, **las
   decisiones tomadas con su porqué**. Está escrito así a propósito, porque
   cada fase la ejecuta una sesión distinta. Un bloque que diga «que no hay
   que revertir» es exactamente eso: no lo reviertas, y si crees que hay que
   hacerlo, dilo antes.

2. **`PROMPT-EVIDENCIA.md`** es el trabajo pendiente: añadir la evidencia
   visual (imágenes, galerías, video y enlaces) al cuerpo de los seis casos de
   estudio, un caso por sesión. Contiene el encargo completo.

## Cómo se trabaja aquí

- **En español**, incluidos los comentarios del código y los mensajes de
  commit, con acentuación correcta.
- **Cero contenido inventado.** Ni métricas, ni testimonios, ni fechas, ni
  proyectos. Si falta algo, se deja un `[PENDIENTE: …]` visible.
- **Commits pequeños**, uno por unidad de trabajo, sin mezclar temas.
- Al terminar: `npm run build` en **0 errores, 0 warnings y 0 hints**, y la
  preview revisada a 360, 768 y 1280 px.
- El rendimiento se mide sobre `npm run preview`, **nunca** sobre
  `npm run dev`, que da métricas falsas por el instrumental de Vite.
- No se instalan dependencias sin justificarlo. El sitio entero tiene ~5 KB de
  JavaScript propio y cero frameworks de UI; eso es una decisión, no una
  casualidad.
