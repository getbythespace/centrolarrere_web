import { clinic } from "./clinic";

/**
 * Enlaces a WhatsApp con mensaje prellenado.
 *
 * La conversión del sitio es un mensaje de WhatsApp, así que el enlace se
 * construye en un solo lugar: si cambia el número o el tono del mensaje, cambia
 * acá y no en quince componentes.
 *
 * Se usa `wa.me` y no `api.whatsapp.com` porque resuelve mejor cuando el
 * usuario viene del navegador embebido de Instagram, que es de donde va a
 * llegar la mayoría del tráfico de la pauta.
 */

export type WhatsAppContext =
  | { kind: "general" }
  | { kind: "evaluation" }
  | { kind: "treatment"; treatment: string }
  | { kind: "location" }
  | { kind: "prices"; treatment?: string };

function messageFor(ctx: WhatsAppContext): string {
  switch (ctx.kind) {
    case "evaluation":
      return "Hola, quiero agendar una evaluación médica.";
    case "treatment":
      // Que el mensaje diga el tratamiento le ahorra a la clínica la primera
      // pregunta y sube la calidad del lead.
      return `Hola, me interesa ${ctx.treatment}. ¿Me cuentan cómo sigue el proceso?`;
    case "prices":
      return ctx.treatment
        ? `Hola, quiero consultar el valor de ${ctx.treatment}.`
        : "Hola, quiero consultar valores de tratamientos.";
    case "location":
      return "Hola, ¿me confirman la dirección y el horario de atención?";
    case "general":
    default:
      return "Hola, quiero hacer una consulta.";
  }
}

/** URL completa de WhatsApp con el mensaje ya escrito. */
export function waLink(ctx: WhatsAppContext = { kind: "general" }): string {
  return `https://wa.me/${clinic.phone.wa}?text=${encodeURIComponent(messageFor(ctx))}`;
}

/**
 * Etiqueta para el evento de conversión. Sirve para distinguir en Meta y GA4
 * qué parte del sitio genera los mensajes que valen.
 */
export function waEventLabel(ctx: WhatsAppContext): string {
  switch (ctx.kind) {
    case "treatment":
      return `treatment:${ctx.treatment}`;
    case "prices":
      return ctx.treatment ? `prices:${ctx.treatment}` : "prices";
    default:
      return ctx.kind;
  }
}
