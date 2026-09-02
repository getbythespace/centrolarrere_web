import { MetadataRoute } from 'next'

/**
 * Con `output: export` no hay servidor que lo genere al vuelo, así que se
 * declara estático: se produce una vez al compilar.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://larrere.cl'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/comprobante/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
