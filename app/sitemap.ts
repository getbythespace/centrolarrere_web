import { MetadataRoute } from 'next'

/**
 * Las cinco páginas del sitio. Quedan fuera a propósito:
 *  - /certificados, que redirige a /equipo#credenciales — un sitemap no debe
 *    listar URLs que redirigen.
 *  - /privacidad y /terminos, que se listan con prioridad baja al final: son
 *    obligatorias pero no son por donde se quiere que entre nadie.
 *  - /resultados y /testimonios, que se archivaron: no había material real que
 *    publicar en ninguna de las dos.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://larrere.cl'
  const lastModified = new Date()

  const routes: Array<[string, number, MetadataRoute.Sitemap[number]['changeFrequency']]> = [
    ['', 1, 'weekly'],
    ['/servicios', 0.9, 'weekly'],
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
