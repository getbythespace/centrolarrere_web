import type { BeforeAfterCase } from "@/components/BeforeAfter";

/**
 * Casos de antes/después.
 *
 * TODOS son placeholders. No se inventan resultados de una clínica real ni se
 * usan fotos de stock: sin `beforeSrc`/`afterSrc` el componente dibuja un marco
 * rotulado que deja claro que falta contenido.
 *
 * Para publicar un caso real hacen falta tres cosas:
 *   1. Consentimiento informado firmado por el paciente para uso de imagen.
 *   2. Fotos tomadas en condiciones comparables — misma luz, mismo ángulo,
 *      misma distancia, sin maquillaje ni filtro. Si el "después" está mejor
 *      iluminado, la comparación no vale.
 *   3. El número real de sesiones y el tiempo transcurrido.
 *
 * Los textos de `treatment` y `note` de abajo describen qué DEBERÍA ir en cada
 * espacio. Reemplázalos junto con las fotos.
 */
export const showcaseCases: BeforeAfterCase[] = [
  {
    id: "rosacea-01",
    label: "[REEMPLAZAR] Caso de rosácea",
    treatment: "Láser control de rosácea",
    note: "[REEMPLAZAR con nº real de sesiones y tiempo transcurrido]",
    alt: "rostro con enrojecimiento facial por rosácea",
  },
  {
    id: "acne-01",
    label: "[REEMPLAZAR] Caso de acné",
    treatment: "Tratamiento de acné",
    note: "[REEMPLAZAR con nº real de sesiones y tiempo transcurrido]",
    alt: "rostro con lesiones de acné",
  },
  {
    id: "telangiectasia-01",
    label: "[REEMPLAZAR] Caso de telangiectasias",
    treatment: "Eliminación de telangiectasias",
    note: "[REEMPLAZAR con nº real de sesiones y tiempo transcurrido]",
    alt: "capilares visibles en la mejilla",
  },
  {
    id: "capilar-01",
    label: "[REEMPLAZAR] Caso capilar",
    treatment: "PRP capilar",
    note: "[REEMPLAZAR con nº real de sesiones y tiempo transcurrido]",
    alt: "zona del cuero cabelludo con baja densidad",
  },
  {
    id: "manos-01",
    label: "[REEMPLAZAR] Caso de manos",
    treatment: "Rejuvenecimiento de manos",
    note: "[REEMPLAZAR con nº real de sesiones y tiempo transcurrido]",
    alt: "dorso de la mano con manchas",
  },
  {
    id: "onicomicosis-01",
    label: "[REEMPLAZAR] Caso de onicomicosis",
    treatment: "Tratamiento de onicomicosis",
    note: "[REEMPLAZAR con nº real de sesiones y tiempo transcurrido]",
    alt: "uña afectada por onicomicosis",
  },
];
