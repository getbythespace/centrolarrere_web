/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática: `next build` deja HTML suelto en out/ en vez de un
  // servidor. Es lo que necesita un Static Site de App Platform —que además es
  // gratis— y por eso el despliegue devolvía 404: `next build` normal produce
  // .next/, que no es una carpeta de HTML.
  output: 'export',

  // Dos `next dev` sobre el mismo proyecto se pisan: comparten .next y por lo
  // tanto los manifiestos de rutas y las hojas compiladas. En la práctica una
  // ruta que funcionaba empieza a responder 404 sola, o el servidor sirve un
  // CSS de otra compilación. Con esto el segundo puerto arranca así:
  //   NEXT_DIST_DIR=.next-v2 npx next dev -p 3001
  distDir: process.env.NEXT_DIST_DIR || '.next',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    // AVIF primero, WebP de respaldo.
    formats: ['image/avif', 'image/webp'],

    // Sin servidor no hay optimización al vuelo, así que las imágenes se sirven
    // tal cual están en public/. No se pierde casi nada: ya están todas
    // comprimidas a AVIF a mano —las del box bajaron de 10 MB a 463 KB— así que
    // lo único que se deja de tener son las variantes por ancho de pantalla.
    unoptimized: true,
  },

  // Los redirects y las cabeceras de seguridad NO funcionan con `output:
  // export`: los aplica el servidor de Next, que acá no existe. Se movieron a
  // .do/app.yaml, donde los aplica el borde de App Platform.
  //
  // Se sacaron de acá a propósito en vez de dejarlos: si se quedan, parecen
  // activos y no hacen nada, que es peor que no tenerlos.

};

export default nextConfig;
