/**
 * Catálogo de tratamientos.
 *
 * Precios tomados del catálogo interno entregado por la clínica.
 * `price` es el precio de oferta vigente y `listPrice` el precio normal; la
 * tarjeta dibuja sola el tachado cuando hay diferencia real entre ambos.
 *
 * Los tratamientos con `price: null` estaban en el sitio anterior pero NO
 * aparecen en la planilla de precios. Se mantienen visibles porque la clínica
 * los presta, pero sin cifra inventada: la tarjeta muestra «valor según
 * evaluación» y empuja a WhatsApp.
 */

export type Category =
  | "Láser"
  | "Médico"
  | "Facial"
  | "Corporal"
  | "Capilar"
  | "Uñas"
  | "Alergias"
  | "Estético";

export interface Treatment {
  id: string;
  name: string;
  subtitle?: string;
  /** Frase corta para la tarjeta: qué resuelve, no cómo funciona. */
  summary: string;
  /** Detalle clínico. */
  description: string;
  category: Category;
  /** Requiere evaluación médica previa. */
  needsEvaluation: boolean;
  /** Sólo lo realiza el médico (miércoles desde 17:30). */
  doctorOnly?: boolean;
  /** Precio de oferta vigente, en CLP. null = pendiente de confirmar. */
  price: number | null;
  /** Precio normal. Sólo se muestra tachado si es mayor al de oferta. */
  listPrice: number | null;
  /** Número de sesiones que cubre el precio. */
  sessions?: number;
  /** Texto libre para casos como «sin límite de sesiones». */
  sessionsNote?: string;
  /** Marca el tratamiento como parte de la campaña del mes. */
  featured?: boolean;
  /**
   * Ilustración de la CONDICIÓN que se trata — no de un resultado.
   * Muestra cómo se ve el problema, que es información útil para quien no sabe
   * si lo que tiene es tratable acá. No afirma nada sobre el después.
   */
  conditionImage?: { src: string; alt: string };
}

export const treatments: Treatment[] = [
  // ---------- CAMPAÑA DE AGOSTO ----------
  {
    id: "onicomicosis-plantar",
    name: "Onicomicosis plantar",
    subtitle: "Hongos en uñas de los pies",
    summary: "Sin límite de sesiones hasta completar el tratamiento.",
    description:
      "La energía láser atraviesa la lámina de la uña y actúa sobre el hongo sin dañar el tejido sano. La uña sana crece desde la matriz, así que el resultado se ve a medida que la uña se renueva: por eso el tratamiento no se cobra por sesión sino completo.",
    category: "Uñas",
    needsEvaluation: true,
    price: 499990,
    listPrice: 750000,
    sessionsNote: "Sin límite de sesiones",
    featured: true,
    conditionImage: {
      src: "/casos/ominomicosis.webp",
      alt: "Uña del pie afectada por onicomicosis",
    },
  },
  {
    id: "onicomicosis-palmar",
    name: "Onicomicosis palmar",
    subtitle: "Hongos en uñas de las manos",
    summary: "Sin límite de sesiones hasta completar el tratamiento.",
    description:
      "Mismo protocolo láser que el tratamiento plantar, aplicado a las uñas de las manos. Incluye todas las sesiones necesarias hasta completar el ciclo de renovación de la uña.",
    category: "Uñas",
    needsEvaluation: true,
    price: 559990,
    listPrice: 650000,
    sessionsNote: "Sin límite de sesiones",
    featured: true,
  },
  {
    id: "higiene-facial",
    name: "Higiene facial",
    summary: "Limpieza profunda con criterio clínico.",
    description:
      "Limpieza profunda del rostro con extracción y desinfección. Es la base del acompañamiento en pieles con acné, especialmente durante los primeros meses de tratamiento con medicación.",
    category: "Facial",
    needsEvaluation: false,
    price: 40000,
    listPrice: null,
    sessions: 1,
    featured: true,
  },
  {
    id: "higiene-corporal",
    name: "Higiene corporal",
    subtitle: "Dorso anterior o posterior",
    summary: "Limpieza profunda de espalda o pecho.",
    description:
      "Limpieza profunda del dorso, anterior o posterior. Zona frecuente de brotes durante el tratamiento del acné y difícil de manejar en casa.",
    category: "Corporal",
    needsEvaluation: false,
    price: 45000,
    listPrice: null,
    sessions: 1,
    featured: true,
  },

  // ---------- LÁSER Y VASCULAR ----------
  {
    id: "laser-rosacea-4",
    name: "Láser vascular para rosácea",
    subtitle: "Programa de 4 sesiones",
    summary: "Reduce el enrojecimiento y controla los brotes.",
    description:
      "Tratamiento dirigido a disminuir el enrojecimiento facial persistente y a controlar los brotes de rosácea. El láser actúa de forma selectiva sobre el componente vascular.",
    category: "Láser",
    needsEvaluation: true,
    price: 150000,
    listPrice: 200000,
    sessions: 4,
    conditionImage: {
      src: "/tratamientos/Tratamiento_laser_para_la_rosacea_En_que_consiste_553x.webp",
      alt: "Rostro con enrojecimiento facial por rosácea",
    },
  },
  {
    id: "laser-rosacea-6",
    name: "Láser vascular para rosácea",
    subtitle: "Programa de 6 sesiones",
    summary: "Programa extendido para casos más marcados.",
    description:
      "Mismo protocolo que el programa de 4 sesiones, extendido para cuadros más persistentes. El número de sesiones se define en la evaluación médica.",
    category: "Láser",
    needsEvaluation: true,
    price: 225000,
    listPrice: 300000,
    sessions: 6,
  },
  {
    id: "telangiectasia",
    name: "Eliminación de telangiectasias",
    subtitle: "Arañitas vasculares",
    summary: "Cierra los capilares visibles de rostro y cuerpo.",
    description:
      "Tratamiento láser para los vasos sanguíneos finos que se ven en la superficie de la piel. El láser cierra el capilar de forma selectiva sin afectar el tejido de alrededor.",
    category: "Láser",
    needsEvaluation: true,
    price: null,
    listPrice: null,
    conditionImage: {
      src: "/tratamientos/Telangiectasia-in-Bellaire-TX.webp",
      alt: "Telangiectasias visibles en la piel del rostro",
    },
  },
  {
    id: "laser-vascular",
    name: "Láser vascular complejo",
    summary: "Lesiones que necesitan seguimiento médico.",
    description:
      "Procedimiento para lesiones vasculares complejas: hemangiomas, manchas en vino de oporto y rosácea severa. Requiere evaluación y control médico.",
    category: "Médico",
    needsEvaluation: true,
    doctorOnly: true,
    price: null,
    listPrice: null,
  },

  // ---------- DERMATOLOGÍA ----------
  {
    id: "acrocordones",
    name: "Extracción de acrocordones",
    subtitle: "Más de 20 acrocordones",
    summary: "Retiro de lesiones cutáneas benignas.",
    description:
      "Extracción de acrocordones —pequeñas lesiones cutáneas benignas y pediculadas— en procedimiento realizado en consulta. El valor cubre más de 20 lesiones.",
    category: "Médico",
    needsEvaluation: true,
    price: 120000,
    listPrice: 150000,
    sessions: 1,
    conditionImage: {
      src: "/tratamientos/acrocordones.jpg",
      alt: "Acrocordones en la piel del cuello",
    },
  },
  {
    id: "vitiligo-4",
    name: "Pigmentación de vitíligo",
    subtitle: "Programa de 4 sesiones",
    summary: "Reduce el contraste en zonas despigmentadas.",
    description:
      "Micropigmentación orientada a disminuir el contraste visible entre la piel despigmentada y la piel circundante. El número de sesiones depende de la extensión.",
    category: "Médico",
    needsEvaluation: true,
    price: 149990,
    listPrice: 200000,
    sessions: 4,
    conditionImage: {
      src: "/tratamientos/vitiligo-imagem2-733x414.webp",
      alt: "Zona de piel despigmentada por vitíligo",
    },
  },
  {
    id: "vitiligo-6",
    name: "Pigmentación de vitíligo",
    subtitle: "Programa de 6 sesiones",
    summary: "Programa extendido para mayor extensión.",
    description:
      "Mismo procedimiento que el programa de 4 sesiones, para zonas de mayor extensión. La cobertura se define en la evaluación.",
    category: "Médico",
    needsEvaluation: true,
    price: 399990,
    listPrice: 500000,
    sessions: 6,
  },
  {
    id: "acne",
    name: "Tratamiento de acné",
    subtitle: "Clínica de acné y rosácea",
    summary: "Plan clínico, no una limpieza de rutina.",
    description:
      "Protocolo específico para pieles con acné, combinando limpieza profunda, extracción y acompañamiento durante el tratamiento médico.",
    category: "Facial",
    needsEvaluation: true,
    price: null,
    listPrice: null,
    conditionImage: {
      src: "/tratamientos/acne.jpg",
      alt: "Piel con lesiones de acné inflamatorio",
    },
  },

  // ---------- REGENERATIVO Y CAPILAR ----------
  {
    id: "prp-facial",
    name: "PRP facial",
    subtitle: "Plasma rico en plaquetas",
    summary: "Regeneración con tu propio plasma.",
    description:
      "Usa los factores de crecimiento de tu propia sangre para estimular colágeno y mejorar la textura y firmeza de la piel.",
    category: "Facial",
    needsEvaluation: true,
    price: 49990,
    listPrice: 85000,
    sessions: 1,
  },
  {
    id: "prp-capilar-1",
    name: "PRP capilar",
    subtitle: "Sesión individual",
    summary: "Estímulo del folículo en zonas de baja densidad.",
    description:
      "Aplicación de plasma rico en plaquetas en el cuero cabelludo para estimular el folículo piloso en casos de pérdida de densidad.",
    category: "Capilar",
    needsEvaluation: true,
    price: 80000,
    listPrice: 95000,
    sessions: 1,
    conditionImage: {
      src: "/tratamientos/alopecia.jpg",
      alt: "Cuero cabelludo con densidad capilar reducida",
    },
  },
  {
    id: "prp-capilar-4",
    name: "PRP capilar",
    subtitle: "Programa de 4 sesiones",
    summary: "El plan habitual para ver cambios sostenidos.",
    description:
      "Cuatro sesiones espaciadas según el protocolo definido en la evaluación. Es el esquema con el que se trabaja la mayoría de los casos.",
    category: "Capilar",
    needsEvaluation: true,
    price: 310000,
    listPrice: 330000,
    sessions: 4,
  },
  {
    id: "prp-capilar-6",
    name: "PRP capilar",
    subtitle: "Programa de 6 sesiones",
    summary: "Programa extendido, mejor valor por sesión.",
    description:
      "Seis sesiones para casos que requieren un ciclo más largo. Es la opción con menor valor por sesión.",
    category: "Capilar",
    needsEvaluation: true,
    price: 420000,
    listPrice: 465000,
    sessions: 6,
  },
  {
    id: "micropigmentacion-capilar",
    name: "Micropigmentación capilar",
    subtitle: "Programa de 3 sesiones",
    summary: "Simula densidad en zonas de alopecia.",
    description:
      "Técnica de micropigmentación que replica la apariencia de folículos para disimular áreas de alopecia o baja densidad capilar.",
    category: "Capilar",
    needsEvaluation: true,
    price: 399990,
    listPrice: 490000,
    sessions: 3,
  },

  // ---------- ESTÉTICO ----------
  {
    id: "rejuvenecimiento-manos",
    name: "Rejuvenecimiento de manos",
    summary: "Manchas y textura en el dorso de la mano.",
    description:
      "Tratamiento sobre el dorso de las manos para trabajar manchas, tono y textura. Es una zona que suele quedar fuera de los planes faciales y delata la edad.",
    category: "Estético",
    needsEvaluation: true,
    price: 149990,
    listPrice: 189990,
    sessions: 1,
  },

  // ---------- ALERGIAS ----------
  {
    id: "test-prick-completo",
    name: "Test Prick completo",
    subtitle: "Inhalantes y alimentos",
    summary: "Estudio de alergias en una sola sesión.",
    description:
      "Test cutáneo que evalúa reacción frente a inhalantes y alimentos en el mismo procedimiento. Resultado en la misma consulta.",
    category: "Alergias",
    needsEvaluation: false,
    price: 60000,
    listPrice: null,
    sessions: 1,
  },
  {
    id: "test-prick-inhalantes",
    name: "Test Prick — inhalantes",
    summary: "Polen, ácaros, epitelios y hongos ambientales.",
    description:
      "Test cutáneo para identificar sensibilización a alérgenos que se inhalan.",
    category: "Alergias",
    needsEvaluation: false,
    price: 35000,
    listPrice: null,
    sessions: 1,
  },
  {
    id: "test-prick-alimentos",
    name: "Test Prick — alimentos",
    summary: "Identifica sensibilización alimentaria.",
    description:
      "Test cutáneo para identificar sensibilización frente a alérgenos alimentarios.",
    category: "Alergias",
    needsEvaluation: false,
    price: 35000,
    listPrice: null,
    sessions: 1,
  },
];

export const categories: Array<Category | "Todos"> = [
  "Todos",
  "Facial",
  "Corporal",
  "Láser",
  "Uñas",
  "Capilar",
  "Médico",
  "Estético",
  "Alergias",
];

/** Tratamientos destacados de la campaña del mes. */
export function featuredTreatments(): Treatment[] {
  return treatments.filter((t) => t.featured);
}

/** Cuántos tratamientos tienen precio publicado. */
export function pricedCount(): number {
  return treatments.filter((t) => t.price !== null).length;
}

/** Valor por sesión, cuando el precio cubre un programa de varias. */
export function pricePerSession(t: Treatment): number | null {
  if (t.price === null || !t.sessions || t.sessions < 2) return null;
  return Math.round(t.price / t.sessions);
}
