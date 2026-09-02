import { clinic } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";

/**
 * Datos estructurados para SEO local.
 *
 * Se corrigieron cuatro cosas graves que había antes:
 *
 * 1. Se eliminó `aggregateRating` (5★ / 50 reseñas). No existían esas reseñas.
 *    Marcado de reseñas inventado es motivo de acción manual de Google, y
 *    además es una afirmación falsa sobre una clínica real. NO se vuelve a
 *    agregar hasta que haya reseñas verificables, y en ese caso el valor tiene
 *    que salir de la fuente real (Google Business Profile), no de una constante.
 *
 * 2. `@type` pasó de `BeautySalon` a `MedicalClinic`: es una clínica con
 *    respaldo médico y de enfermería, y ese tipo es el que Google usa para
 *    búsquedas de salud.
 *
 * 3. Se sacaron los servicios que la clínica no presta (masaje relajante,
 *    manicure, pedicure). Ahora la lista se deriva del catálogo real.
 *
 * 4. Teléfono, dirección y geo salen de `lib/clinic.ts`. Antes había un
 *    teléfono inventado y coordenadas de Santiago para una clínica de Chillán.
 */
export default function LocalBusinessSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://larrere.cl";

  // Sólo perfiles que existan de verdad.
  const sameAs = [clinic.social.instagram, clinic.social.facebook].filter(
    (u): u is string => typeof u === "string" && u.length > 0
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.name,
    legalName: clinic.legalName,
    description:
      "Clínica de estética con enfoque clínico en Chillán. Tratamientos láser para rosácea y lesiones vasculares, acné, PRP facial y capilar, y procedimientos con evaluación médica previa.",
    url: siteUrl,
    telephone: clinic.phone.e164,
    email: clinic.email,
    medicalSpecialty: "Dermatology",
    address: {
      "@type": "PostalAddress",
      // Calle y oficina juntas: es como Google espera la dirección completa.
      streetAddress: `${clinic.address.street}, ${clinic.address.unit}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.region,
      addressCountry: clinic.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.address.geo.lat,
      longitude: clinic.address.geo.lng,
    },
    openingHoursSpecification: clinic.hours.spec.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    priceRange: "$$",
    currenciesAccepted: "CLP",
    ...(sameAs.length > 0 && { sameAs }),
    // Se declara sólo la evaluación médica con precio, que es el único
    // confirmado. Los demás tratamientos se listan sin `offers`.
    makesOffer: [
      {
        "@type": "Offer",
        priceCurrency: "CLP",
        price: clinic.evaluation.price,
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Evaluación médica estética",
          description:
            "Consulta médica previa para determinar el tratamiento adecuado según tipo de piel y condición.",
        },
      },
    ],
    availableService: treatments
      .filter((t) => t.id !== "evaluacion-medica")
      .map((t) => ({
        "@type": "MedicalProcedure",
        name: t.name,
        description: t.summary,
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
