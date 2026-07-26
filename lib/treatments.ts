/**
 * Catálogo de tratamientos.
 *
 * Sobre precios: sólo la evaluación médica tiene precio confirmado ($40.000).
 * El resto lleva `price: null` a propósito — no inventamos tarifas de una
 * clínica real. Cuando lleguen los valores, se rellena `price` y `listPrice`
 * y la tarjeta muestra sola el precio tachado + oferta.
 *
 * Los emoji que había antes como "icono" se eliminaron: en una clínica leen
 * como cartilla infantil y además no son accesibles. La jerarquía la da la
 * categoría y la tipografía.
 */

export type Category =
  | "Láser"
  | "Médico"
  | "Facial"
  | "Rejuvenecimiento"
  | "Regenerativo"
  | "Capilar";

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
  /** Precio de oferta en CLP. null = pendiente de confirmar. */
  price: number | null;
  /** Precio normal, para tachar. Sólo si hay oferta real. */
  listPrice: number | null;
}

export const treatments: Treatment[] = [
  {
    id: "evaluacion-medica",
    name: "Evaluación médica",
    summary: "El punto de partida de todo tratamiento.",
    description:
      "Primera consulta con el médico para revisar tu caso y definir qué procedimiento corresponde según tu tipo de piel, tu condición y tus antecedentes de salud.",
    category: "Médico",
    needsEvaluation: false,
    doctorOnly: true,
    price: 40000,
    listPrice: null,
  },
  {
    id: "laser-rosacea",
    name: "Láser control de rosácea",
    summary: "Reduce el enrojecimiento y controla los brotes.",
    description:
      "Tratamiento dirigido a disminuir el enrojecimiento facial persistente y a controlar los brotes de rosácea, mejorando la apariencia de la piel afectada por esta condición crónica.",
    category: "Láser",
    needsEvaluation: true,
    price: null,
    listPrice: null,
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
  },
  {
    id: "laser-vascular",
    name: "Láser vascular",
    summary: "Lesiones vasculares que necesitan seguimiento médico.",
    description:
      "Procedimiento para lesiones vasculares complejas: hemangiomas, manchas en vino de oporto, rosácea severa y otras malformaciones. Requiere evaluación y control médico.",
    category: "Médico",
    needsEvaluation: true,
    doctorOnly: true,
    price: null,
    listPrice: null,
  },
  {
    id: "acne",
    name: "Tratamiento de acné",
    subtitle: "Clínica de acné y rosácea",
    summary: "Plan clínico, no una limpieza de rutina.",
    description:
      "Limpieza profunda y protocolo específico para pieles con acné o rosácea, combinando extracción, desinfección y tratamiento según la condición de cada piel.",
    category: "Facial",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "laser-co2",
    name: "Láser CO₂ fraccionado",
    summary: "Cicatrices de acné, textura y arrugas marcadas.",
    description:
      "Rejuvenecimiento profundo para cicatrices de acné, arrugas pronunciadas, manchas y textura irregular. Estimula la producción de colágeno desde las capas profundas de la piel.",
    category: "Láser",
    needsEvaluation: true,
    doctorOnly: true,
    price: null,
    listPrice: null,
  },
  {
    id: "prp-facial",
    name: "PRP facial",
    subtitle: "Plasma rico en plaquetas",
    summary: "Regeneración con tu propio plasma.",
    description:
      "Usa los factores de crecimiento de tu propia sangre para estimular colágeno y mejorar la textura y firmeza de la piel.",
    category: "Regenerativo",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "prp-capilar",
    name: "PRP capilar",
    summary: "Estímulo del folículo en zonas de baja densidad.",
    description:
      "Aplicación de plasma rico en plaquetas en el cuero cabelludo para estimular el folículo piloso en casos de pérdida de densidad capilar.",
    category: "Capilar",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "micropigmentacion-capilar",
    name: "Micropigmentación capilar",
    subtitle: "Camuflaje capilar",
    summary: "Simula densidad en zonas de alopecia.",
    description:
      "Técnica de micropigmentación que replica la apariencia de folículos para disimular áreas de alopecia o baja densidad.",
    category: "Capilar",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "acrocordones",
    name: "Extracción de acrocordones",
    summary: "Retiro de lesiones cutáneas benignas.",
    description:
      "Extracción de acrocordones (pequeñas lesiones cutáneas benignas y pediculadas) mediante procedimiento realizado en consulta.",
    category: "Médico",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "vitiligo",
    name: "Pigmentación de vitíligo",
    summary: "Camuflaje del contraste en zonas despigmentadas.",
    description:
      "Micropigmentación orientada a reducir el contraste visible entre la piel despigmentada y la piel circundante.",
    category: "Médico",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "onicomicosis",
    name: "Tratamiento de onicomicosis",
    summary: "Hongos en la uña, tratados con láser.",
    description:
      "La energía láser atraviesa la lámina de la uña para actuar sobre el hongo sin dañar el tejido sano, permitiendo que la uña crezca sana.",
    category: "Médico",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "rejuvenecimiento-manos",
    name: "Rejuvenecimiento de manos",
    summary: "Manchas y textura en el dorso de la mano.",
    description:
      "Tratamiento sobre las manos para trabajar manchas, tono y textura, una zona que suele quedar fuera de los planes faciales.",
    category: "Rejuvenecimiento",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "rejuvenecimiento-facial",
    name: "Rejuvenecimiento facial",
    summary: "Tono, textura y luminosidad.",
    description:
      "Combina tecnologías láser para trabajar textura, tono y signos de envejecimiento, estimulando colágeno de forma progresiva.",
    category: "Rejuvenecimiento",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "depilacion-laser",
    name: "Depilación láser",
    subtitle: "Dama y varón",
    summary: "Reducción progresiva y duradera del vello.",
    description:
      "El láser actúa sobre el folículo piloso e inhibe su crecimiento de forma progresiva. Los resultados se acumulan sesión a sesión.",
    category: "Láser",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "hirsutismo",
    name: "Hirsutismo facial",
    summary: "Vello facial con causa hormonal.",
    description:
      "Abordaje del crecimiento excesivo de vello facial en mujeres: se revisan las posibles causas hormonales y se aplica tratamiento láser específico.",
    category: "Médico",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
  {
    id: "foliculitis",
    name: "Foliculitis corporal y facial",
    summary: "Inflamación del folículo, con protocolo médico.",
    description:
      "Combina terapia láser con protocolo médico para tratar la inflamación e infección del folículo piloso y prevenir nuevos brotes.",
    category: "Médico",
    needsEvaluation: true,
    price: null,
    listPrice: null,
  },
];

export const categories: Array<Category | "Todos"> = [
  "Todos",
  "Láser",
  "Médico",
  "Facial",
  "Regenerativo",
  "Rejuvenecimiento",
  "Capilar",
];

/** Cuántos tratamientos ya tienen precio confirmado. */
export function pricedCount(): number {
  return treatments.filter((t) => t.price !== null).length;
}
