export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "LARRERE",
    "description": "Centro de belleza y bienestar profesional. Servicios de masajes, tratamientos faciales, manicure, pedicure y depilación láser.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://larrere.cl",
    "telephone": "+56912345678",
    "email": "larreresaludyestetica@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Principal 123",
      "addressLocality": "Comuna",
      "addressRegion": "Región",
      "postalCode": "1234567",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-33.4488897",
      "longitude": "-70.6692655"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Transferencia bancaria, Efectivo",
    "currenciesAccepted": "CLP",
    "hasMap": "https://maps.google.com/?q=LARRERE",
    "sameAs": [
      "https://www.instagram.com/larrere",
      "https://www.facebook.com/larrere"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "50"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Masaje Relajante",
          "description": "Masaje de cuerpo completo para aliviar tensiones",
          "provider": {
            "@type": "BeautySalon",
            "name": "LARRERE"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Facial Limpieza Profunda",
          "description": "Limpieza facial con extracción y tratamiento hidratante",
          "provider": {
            "@type": "BeautySalon",
            "name": "LARRERE"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Manicure y Pedicure",
          "description": "Cuidado completo de manos y pies",
          "provider": {
            "@type": "BeautySalon",
            "name": "LARRERE"
          }
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
