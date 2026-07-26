/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    // AVIF primero, WebP de respaldo. Cuando lleguen las fotos reales de los
    // casos, next/image las sirve en el formato liviano sin trabajo extra.
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      {
        // /certificados era una página delgada y con credenciales inventadas.
        // Su contenido real vive ahora en /equipo#credenciales. Redirect
        // permanente (308) para no perder lo que Google ya tenga indexado —
        // mejor que un 404 y mejor que dejar la página vacía.
        source: '/certificados',
        destination: '/equipo#credenciales',
        permanent: true,
      },
    ];
  },

  // Cabeceras de seguridad básicas. No cuestan nada y suben Best Practices.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
