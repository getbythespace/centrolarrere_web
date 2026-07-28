/**
 * Campaña vigente.
 *
 * Todo lo temporal del sitio —banner, packs del mes, evaluación gratis— sale de
 * acá. Cuando termine agosto se cambia `active: false` o se actualizan las
 * fechas y el sitio vuelve solo a su estado normal, sin tocar componentes.
 *
 * Sobre el tono: el gancho comercial es legítimo, pero ninguna frase acá
 * promete un resultado clínico. «Llega al verano con el tratamiento avanzado»
 * habla del calendario, no de una garantía de curación — que es la línea que
 * no se cruza en publicidad sanitaria.
 */

export const campaign = {
  active: true,
  month: "Agosto",
  year: 2026,

  /** Barra superior del sitio. */
  banner: {
    highlight: "Evaluación médica gratis",
    text: "durante agosto",
    detail: "Tratamientos con precio de lanzamiento",
  },

  /** Los dos focos del mes. */
  packs: [
    {
      id: "onicomicosis-verano",
      eyebrow: "Foco del mes · Uñas",
      title: "Empieza en agosto, llega al verano tratado",
      // El argumento de temporada es real y verificable: la uña crece por
      // renovación, no por mejora inmediata, así que el calendario importa.
      body: "La uña sana no se recupera: crece. Una uña del pie tarda entre nueve y doce meses en renovarse por completo, así que el mes en que se empieza define en qué estado llegas al verano. Agosto es el momento en que todavía alcanza.",
      points: [
        "Sin límite de sesiones hasta completar el ciclo",
        "El láser actúa sobre el hongo sin dañar la uña",
        "Requiere evaluación previa para confirmar el diagnóstico",
      ],
      treatmentIds: ["onicomicosis-plantar", "onicomicosis-palmar"],
      ctaTreatment: "el tratamiento de onicomicosis",
      /** Nota honesta que acompaña la promesa de temporada. */
      disclaimer:
        "El tiempo de renovación varía según la persona, la uña afectada y la adherencia al tratamiento. La evaluación confirma si el caso es tratable con láser.",
    },
    {
      id: "pack-acne-higiene",
      eyebrow: "Foco del mes · Acné",
      title: "Pack de acompañamiento para tratamiento con medicación",
      // El pack responde a un problema clínico real: el brote inicial de la
      // isotretinoína y similares.
      body: "Los primeros meses de un tratamiento médico para el acné suelen empeorar la piel antes de mejorarla. Es la fase en que más gente lo abandona. El pack cubre la higiene profunda semanal durante ese período, para atravesarlo acompañada.",
      points: [
        "Hasta una limpieza por semana",
        "Vigencia de hasta 6 meses",
        "Facial, corporal o combinado según indicación",
      ],
      treatmentIds: ["higiene-facial", "higiene-corporal"],
      ctaTreatment: "el pack de acompañamiento para acné",
      // El valor del pack todavía no está definido por la clínica.
      priceNote: "[REEMPLAZAR con el valor del pack]",
      disclaimer:
        "El pack acompaña un tratamiento médico indicado por tu dermatólogo o por nuestro médico; no lo reemplaza.",
    },
  ],
} as const;

export type CampaignPack = (typeof campaign.packs)[number];
