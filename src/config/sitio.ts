/**
 * Datos fijos del sitio y de contacto.
 * [PENDIENTE: confirmar con el dueño antes de publicar — CLAUDE.md → Páginas]
 */

export const SITIO = {
  autor: 'Juan Camilo Bolaños',
  ubicacion: 'Medellín, Colombia',
  correo: 'juancamilob492@gmail.com',
  whatsapp: '573003974565',
  linkedin: 'https://www.linkedin.com/in/juan-camilo-bolanos-garcia',
} as const;

export const ENLACE_WHATSAPP = `https://wa.me/${SITIO.whatsapp}`;
export const ENLACE_CORREO = `mailto:${SITIO.correo}`;
