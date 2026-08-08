# 🎨 Portafolio de Juan Camilo Bolaños

**Diseñador de Interacción y Creador de Sistemas de IA** — Medellín, Colombia

Un portafolio personal estático, rápido y accesible diseñado para reclutadores de UX/Diseño e impulsores PYME. Disponible en español, inglés y francés.

🌐 **[juancamilo492.online](https://juancamilo492.online)**

---

## 📋 Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Sistema de diseño](#sistema-de-diseño)
- [Contenido y casos de estudio](#contenido-y-casos-de-estudio)
- [Desarrollo local](#desarrollo-local)
- [Agregar un proyecto](#agregar-un-proyecto)
- [Despliegue](#despliegue)
- [Internacionalización](#internacionalización)

---

## 🛠️ Stack tecnológico

| Tecnología | Propósito |
|:--|:--|
| **Astro** | Framework estático con TypeScript |
| **Tailwind CSS** | Estilos y tokens del sistema |
| **TypeScript** | Tipado estricto en colecciones y utilidades |
| **Astro Content Collections** | Gestión de markdown + frontmatter validado con Zod |
| **astro:assets** | Optimización de imágenes (WebP, lazy loading, responsive) |
| **Cloudflare Pages** | Hosting estático (20k archivos/deploy, 25 MiB/archivo) |

**Características de desempeño:**
- Salida 100% estática (HTML/CSS/JS precompilados)
- Imágenes optimizadas automáticas
- Lazy loading nativo
- Zero JavaScript en la mayoría de páginas
- Modo oscuro sin flash

---

## 📁 Estructura del proyecto

```
portafolio-final/
├── src/
│   ├── components/           # Componentes reutilizables (.astro)
│   │   ├── header/
│   │   ├── footer/
│   │   ├── navegacion/
│   │   └── ...
│   ├── content/              # Content Collections (Markdown + frontmatter)
│   │   └── proyectos/
│   │       ├── es/           # Casos en español (fuente principal)
│   │       ├── en/           # Traducción al inglés
│   │       ├── fr/           # Traducción al francés
│   │       └── de/           # Traducción al alemán (oculto hasta completar)
│   ├── i18n/
│   │   ├── ui.ts             # Diccionario de cadenas de interfaz
│   │   └── utils.ts          # Utilidades (rutaDe, getLangFromUrl, etc.)
│   ├── layouts/              # Layouts de página
│   ├── pages/
│   │   └── [lang]/           # Rutas dinámicas por idioma
│   │       ├── [pagina].astro
│   │       └── [seccion]/[slug].astro
│   ├── styles/
│   │   └── global.css        # Tokens de diseño (Tailwind 4 @theme)
│   ├── utils/                # Funciones auxiliares
│   └── env.d.ts              # Tipos del entorno
├── public/                   # Activos estáticos (favicon, etc.)
├── CLAUDE.md                 # Fuente única de verdad del proyecto
└── astro.config.mjs          # Configuración de Astro

```

---

## 🎨 Sistema de diseño "Esmeralda"

El portafolio usa una paleta de verdes naturales y tonos grises accesibles, con énfasis en contraste AA mínimo.

### Colores

| Variable | Valor | Uso |
|:--|:--|:--|
| `--color-fondo` | `#F9FFFE` | Fondo claro (light mode) |
| `--color-acento` | `#00BD7B` | Rellenos (botones, iconos) |
| `--color-acento-texto` | `#008259` | Texto en verde (4.78:1 contrast) |
| `--color-acento-hover` | `#00A96D` | Hover en texto grande (3.01:1 contrast) |
| `--color-profundo` | `#005348` | Texto fuerte, base dark mode |
| `--color-profundo-alt` | `#1F5E3D` | Footer, acentos oscuros |

### Tipografía

- **Titulares:** Fraunces (serif) vía @fontsource
- **Cuerpo:** Inter (sans-serif) vía @fontsource
- **Carga:** Self-hosted con `font-display: swap`

### Firma visual

1. **Ondas concéntricas** (`ondas`): background con `repeating-radial-gradient` parametrizable
   - Controla: `[--ondas-x]`, `[--ondas-y]`, `[--ondas-radio]`
2. **Marca geométrica:** SVG de mira (reemplazó estrellas de 4 puntas)
3. **Retrato hero:** Siempre en blanco y negro (`filter: grayscale(1)`)

### Modo oscuro

- Clase `dark` en `<html>`, persistida en localStorage
- Activación: según `prefers-color-scheme` o toggle manual
- **Sin flash:** Script inline en `<head>` aplica la preferencia antes del render

---

## 📚 Contenido y casos de estudio

### Colección `proyectos`

Estructura por idioma:

```
src/content/proyectos/
├── es/               # Fuente principal (español)
│   ├── i-homotic.md
│   ├── industrial.md
│   ├── vr-capacitacion-alico.md
│   ├── empaques-ia-alico.md
│   └── siguiendo-la-huella-azul.md
├── en/               # Traducciones (inglés)
├── fr/               # Traducciones (francés)
└── de/               # Traducciones (alemán — ocultas)
```

### Schema Zod

```typescript
{
  titulo: string              // Título del caso
  slug: string                // Identificador único (URL)
  cliente: string             // Nombre del cliente
  año: string                 // Año (formato string, p.ej. "2023")
  rol: string                 // Tu rol en el proyecto
  categoria: string[]         // Categorías (ej: ["Diseño", "Estrategia"])
  herramientas: string[]      // Software/tecnologías usadas
  destacado: boolean          // ¿Mostrar en portada?
  resumen: string             // Párrafo corto
  imagen_portada?: Image      // Imagen de portada (opcional)
  orden: number               // Orden en la grilla (OBLIGATORIO)
  cita?: string               // Testimonial (opcional)
  cita_autor?: string         // Autor del testimonial (opcional)
}
```

### Orden de casos (gobierna la grilla)

1. **i-homotic** — Destacado
2. **industrial** — Destacado
3. **vr-capacitacion-alico** — Destacado
4. **empaques-ia-alico**
5. **siguiendo-la-huella-azul**
6. **abuelos-nietos** — Por agregar

La portada muestra los 3 primeros (`destacado: true`, menor orden).

---

## 🚀 Desarrollo local

### Requisitos

- Node.js ≥ 18
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/juancamilo492/portafolio-final.git
cd portafolio-final

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

### Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Previsualizar build
npm run astro:info   # Información del proyecto
```

---

## ➕ Agregar un proyecto

El proyecto sigue una filosofía de **contenido en Markdown**: agregar un caso es tan simple como crear un archivo `.md`.

### Paso 1: Crear archivo en español

Crea `src/content/proyectos/es/mi-proyecto.md`:

```markdown
---
titulo: "Mi Proyecto"
slug: "mi-proyecto"
cliente: "Acme Corp"
año: "2024"
rol: "Diseñador de Interacción"
categoria: ["Diseño", "Estrategia"]
herramientas: ["Figma", "Webflow"]
destacado: false
resumen: "Breve descripción de qué fue y logró este proyecto."
orden: 7
cita: "Juan Camilo transformó completamente nuestra visión."
cita_autor: "Jane Doe, Directora de Acme Corp"
---

## Contexto

Tu contenido aquí en Markdown...

### Desafío

Más contenido...

## Solución

Final del contenido.
```

### Paso 2: Actualizar `orden`

Edita el campo `orden` en **cada archivo** de la colección para reflejar la nueva secuencia. Ejemplo: si agregas en posición 3, incrementa los demás.

### Paso 3: Traducir (opcional)

Crea archivos análogos en `src/content/proyectos/en/` y `src/content/proyectos/fr/` con el mismo slug.

### Paso 4: Verificar en desarrollo

```bash
npm run dev
# Accede a /es/proyectos/mi-proyecto
```

---

## 🌐 Internacionalización (i18n)

### Idiomas activos

- 🇪🇸 **Español** (`es/`) — Locale por defecto, visible
- 🇬🇧 **Inglés** (`en/`) — Visible
- 🇫🇷 **Francés** (`fr/`) — Visible
- 🇩🇪 **Alemán** (`de/`) — Configurado pero oculto hasta completar contenido

### Rutas traducidas

Las URL de secciones también se traducen:

| Sección | Español | Inglés | Francés |
|:--|:--|:--|:--|
| Proyectos | `/es/proyectos/` | `/en/projects/` | `/fr/projets/` |
| Sobre mí | `/es/sobre-mi/` | `/en/about/` | `/fr/a-propos/` |

**Nunca escribir rutas a mano.** Usa la función `rutaDe(locale, clave, slug?)` de `src/i18n/utils.ts`:

```typescript
// En un componente .astro
import { rutaDe } from '@/i18n/utils';

const enlace = rutaDe('es', 'proyectos', 'i-homotic');
// → /es/proyectos/i-homotic
```

### Diccionario de cadenas

Las cadenas de interfaz (botones, etiquetas, etc.) viven en `src/i18n/ui.ts`:

```typescript
export const DICCIONARIO = {
  es: {
    'nav.inicio': 'Inicio',
    'nav.proyectos': 'Proyectos',
    // ...
  },
  en: {
    'nav.inicio': 'Home',
    'nav.proyectos': 'Projects',
    // ...
  },
  // ...
}
```

### hreflang

Cada página genera etiquetas `<link rel="alternate" hreflang="..." />` automáticamente para SEO multidioma.

---

## 📤 Despliegue

El proyecto se despliega automáticamente en **Cloudflare Pages** con cada push a `main`.

### Configuración

- **Rama:** `main`
- **Comando de build:** `npm run build`
- **Directorio de salida:** `dist/`
- **Dominio:** `juancamilo492.online`

### Límites de Cloudflare Pages (plan gratuito)

- 20,000 archivos por despliegue
- 25 MiB por archivo
- 500 compilaciones al mes
- 1 compilación concurrente

El build actual ocupa ~83 archivos y 1.3 MB (muy por debajo).

---

## 📖 Documentación

- **CLAUDE.md** — Fuente única de verdad del proyecto. Léelo antes de hacer cambios arquitectónicos.
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)

---

## 📝 Fases de desarrollo

Este proyecto se construye por **fases cronológicas**:

- ✅ **FASE 1–4:** Core, diseño, colecciones
- ✅ **FASE 5:** Despliegue en Cloudflare Pages
- 🔄 **FASE 6:** Traducción al inglés (en curso)
- 📅 **FASE 6-bis:** Traducción al francés
- 📅 **FASE 7:** Alemán, pulido, optimización

**Nunca intentes construir todo en una sola sesión.** Respeta la hoja de ruta.

---

## 📜 Licencia

Portafolio personal. Uso no comercial sin permiso. Créditos a Astro, Tailwind CSS y la comunidad de software libre.

---

**Preguntas o sugerencias:** Abre un issue o contacta a Juan Camilo en Medellín. 🇨🇴
