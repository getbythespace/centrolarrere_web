import type { BeforeAfterCase } from "@/components/BeforeAfter";

/**
 * Casos de antes/después.
 *
 * ── POR QUÉ SON SÓLO DOS ─────────────────────────────────────────────────
 *
 * La clínica reporta que el SEREMI es riguroso con la confidencialidad de los
 * pacientes y sus tratamientos. La lectura correcta de eso no es «no se pueden
 * publicar fotos»: es que se publican SÓLO con consentimiento informado escrito
 * y específico para uso publicitario, y que el riesgo sube con la
 * identificabilidad de la persona.
 *
 * De ahí el criterio que se aplicó acá:
 *
 *   SÍ  → zonas anatómicas no identificables: uñas, dorso de manos, pies.
 *         Con consentimiento firmado igual, pero el riesgo es bajo y el
 *         paciente no queda expuesto.
 *
 *   NO  → rostro, cuero cabelludo, cualquier encuadre donde se reconozca a la
 *         persona. Se retiraron los casos de rosácea, acné, telangiectasias y
 *         capilar que había antes: esos tratamientos ahora se explican, no se
 *         ilustran con un resultado.
 *
 * ── SOBRE GENERAR LAS IMÁGENES CON IA ────────────────────────────────────
 *
 * No se hace, y no es una objeción estética. Un antes/después generado y
 * presentado como resultado de un tratamiento es evidencia clínica fabricada:
 * publicidad engañosa bajo la Ley del Consumidor y exactamente el tipo de
 * material que fiscaliza la autoridad sanitaria. El daño de que se descubra es
 * mucho mayor que el beneficio de tener la foto antes.
 *
 * Lo que sí es legítimo, y está resuelto en otra parte del sitio, es una
 * ILUSTRACIÓN de la condición —qué es una onicomicosis— rotulada como
 * ilustración y sin afirmar ningún resultado.
 */
export const showcaseCases: BeforeAfterCase[] = [
  {
    id: "onicomicosis-01",
    label: "Onicomicosis plantar",
    treatment: "Tratamiento láser de onicomicosis",
    note: "Ilustra la renovación progresiva de la uña a lo largo del tratamiento",
    alt: "uña del pie afectada por onicomicosis y su aspecto una vez renovada",
    kind: "referencial",
    beforeSrc: "/casos/ominomicosis.webp",
    // AVIF: el PNG original pesaba 1,7 MB y era el 60% de lo que cargaba
    // la home. Mismo detalle, 43 KB.
    afterSrc: "/casos/ominomicosisdespues.avif",
  },
];

/**
 * Fotografía de ambiente: material propio de la clínica que NO afirma un
 * resultado. Va en el hero y en los cortes entre secciones.
 *
 * Las dos tomas de manos que se recibieron son fotogramas del mismo video, sin
 * diferencia visible entre una y otra, así que no sirven como antes/después.
 * Como retrato de detalle sí funcionan muy bien: se usan acá.
 */
export const ambiente = {
  manos: {
    // Recorte vertical 4:5 hecho en origen (753×941, 107 KB) desde el
    // fotograma apaisado original de 1672×941 y 1,9 MB. El marco del hero es
    // vertical, así que servir el apaisado completo descargaba más del doble
    // de píxeles de los que se ven.
    src: "/hero/manos-consulta.jpg",
    alt: "Manos entrelazadas en primer plano durante la atención en consulta",
    width: 753,
    height: 941,
  },
} as const;

/**
 * Tratamientos que NO llevan antes/después por identificabilidad del paciente.
 * Se explican con texto y con la ilustración de la condición.
 */
export const sinFotoDeCaso = [
  "Láser vascular para rosácea",
  "Tratamiento de acné",
  "Eliminación de telangiectasias",
  "PRP facial y capilar",
  "Micropigmentación capilar",
  "Pigmentación de vitíligo",
] as const;
