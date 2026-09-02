/**
 * Campaña vigente.
 *
 * Todo lo temporal del sitio —banner, packs del mes, evaluación gratis— sale de
 * acá.
 *
 * El mes se calcula solo. Antes decía «Agosto» escrito a mano y no tenía fecha
 * de término: si nadie entraba a cambiarlo, el sitio seguía ofreciendo una
 * promoción vencida, que en publicidad sanitaria es justo lo que no puede
 * pasar. Ahora se renueva cada mes sin que nadie toque nada.
 *
 * Para apagarla: `active: false`. Eso devuelve el sitio a su estado normal
 * —sin banner, sin focos del mes, evaluación a precio— sin tocar componentes.
 *
 * Las páginas que la usan revalidan cada 12 horas (`revalidate` en cada
 * página), porque si no el mes se congelaría en el momento de la compilación.
 *
 * Sobre el tono: el gancho comercial es legítimo, pero ninguna frase acá
 * promete un resultado clínico. Se habla del calendario, no de una garantía de
 * curación — que es la línea que no se cruza.
 */

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
] as const;

/** El mes corriente en Chile, que es donde está la clínica. */
function mesActual() {
  const ahora = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Santiago" })
  );
  const i = ahora.getMonth();
  return {
    indice: i,
    minuscula: MESES[i],
    capital: MESES[i][0].toUpperCase() + MESES[i].slice(1),
    anio: ahora.getFullYear(),
  };
}

/** Último día del mes corriente: hasta cuándo vale lo que se está ofreciendo. */
export function finDeMes(): Date {
  const m = mesActual();
  return new Date(m.anio, m.indice + 1, 0, 23, 59, 59);
}

/**
 * Meses en que el argumento de temporada de la onicomicosis tiene sentido: la
 * uña del pie tarda entre nueve y doce meses en renovarse, así que «llegar al
 * verano tratado» sólo es cierto si todavía queda tiempo. De diciembre a
 * febrero ya no alcanza y el foco pasa a hablar del ciclo, no del verano.
 */
function alcanzaParaElVerano() {
  const i = mesActual().indice;
  return i >= 2 && i <= 10;
}

export const campaign = {
  active: true,

  /* Se calculan al leerlos, no al cargar el módulo: en un servidor que corre
     semanas, un valor capturado al arrancar se quedaría pegado en ese mes. */
  get month() {
    return mesActual().capital;
  },
  get monthLower() {
    return mesActual().minuscula;
  },
  get year() {
    return mesActual().anio;
  },

  /** Barra superior del sitio. */
  banner: {
    highlight: "Evaluación médica gratis",
    get text() {
      return `durante ${mesActual().minuscula}`;
    },
    detail: "Tratamientos con precio de lanzamiento",
  },

  /** Los dos focos del mes. */
  packs: [
    {
      id: "onicomicosis-verano",
      eyebrow: "Foco del mes · Uñas",
      get title() {
        return alcanzaParaElVerano()
          ? `Empieza en ${mesActual().minuscula}, llega al verano tratado`
          : "El tratamiento va al ritmo en que crece la uña";
      },
      // El argumento de temporada es real y verificable: la uña crece por
      // renovación, no por mejora inmediata, así que el calendario importa.
      get body() {
        return alcanzaParaElVerano()
          ? `La uña sana no se recupera: crece. Una uña del pie tarda entre nueve y doce meses en renovarse por completo, así que el mes en que se empieza define en qué estado llegas al verano. En ${mesActual().minuscula} todavía alcanza.`
          : "La uña sana no se recupera: crece. Una uña del pie tarda entre nueve y doce meses en renovarse por completo, así que el tratamiento se mide en ciclos y no en sesiones sueltas.";
      },
      points: [
        "Sin límite de sesiones hasta completar el ciclo",
        "El láser actúa sobre el hongo sin dañar la uña",
        "Requiere evaluación previa para confirmar el diagnóstico",
      ],
      treatmentIds: ["onicomicosis-plantar", "onicomicosis-palmar"],
      ctaTreatment: "el tratamiento de onicomicosis",
      /** Color del bloque: ámbar con tinta pino (5.03:1). */
      tone: "ambar" as const,
      /** Par antes/después referencial que ilustra el tratamiento. */
      caseId: "onicomicosis-01",
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
      /** Color del bloque: ladrillo con tinta papel (5.13:1). */
      tone: "ladrillo" as const,
      /** Valor del pack completo. */
      packPrice: 169990,
      packLabel: "Pack completo · hasta 6 meses",
      disclaimer:
        "El pack acompaña un tratamiento médico indicado por tu dermatólogo o por nuestro médico; no lo reemplaza.",
    },
  ],
} as const;

export type CampaignPack = (typeof campaign.packs)[number];

/**
 * El pack de acné es el único con precio cerrado. Se busca por id y se devuelve
 * ya estrechado, para que quien lo use no tenga que lidiar con que los otros
 * focos no tengan `packPrice`.
 */
export function packConPrecio() {
  const p = campaign.packs.find((x) => "packPrice" in x);
  return p as Extract<CampaignPack, { packPrice: number }> | undefined;
}
