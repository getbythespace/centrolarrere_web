import { MetadataRoute } from 'next'
import { mostrarResultados } from '@/lib/flags'

/**
 * Cambios respecto al sitemap anterior:
 *  - /resultados solo se lista si está publicada: hoy tiene un unico caso y es
 *    referencial, así que está apagada en lib/flags.ts.
 *  - Se quita /certificados: ahora redirige a /equipo#credenciales, y un
 *    sitemap no debe listar URLs que redirigen.
 *  - Se quita /testimonios: está en noindex hasta que tenga reseñas reales.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://larrere.cl'
  const lastModified = new Date()

  const routes: Array<[string, number, MetadataRoute.Sitemap[number]['changeFrequency']]> = [
    ['', 1, 'weekly'],
    ['/servicios', 0.9, 'weekly'],
    ...(mostrarResultados
      ? ([['/resultados', 0.9, 'weekly']] as typeof routes)
      : []),
    ['/agendar', 0.8, 'daily'],
    ['/contacto', 0.8, 'monthly'],
    ['/equipo', 0.7, 'monthly'],
    ['/privacidad', 0.3, 'yearly'],
    ['/terminos', 0.3, 'yearly'],
  ]

  return routes.map(([path, priority, changeFrequency]) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
