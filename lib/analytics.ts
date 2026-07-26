/**
 * Eventos de conversión.
 *
 * Sin Meta Pixel el algoritmo de anuncios no tiene señal y no puede optimizar
 * hacia gente que escribe: es la diferencia entre pagar por alcance y pagar por
 * pacientes. Acá se centraliza el disparo para que ningún CTA quede sin medir.
 *
 * Todo es no-op si los IDs no están configurados, así que en local y en
 * preview no se contamina la data.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export const hasMetaPixel = META_PIXEL_ID.length > 0;
export const hasGTM = GTM_ID.length > 0;
export const hasGA4 = GA4_ID.length > 0;

/**
 * Clic hacia WhatsApp: la conversión del sitio.
 *
 * Se manda como `Contact` (estándar de Meta, el que la campaña puede usar como
 * objetivo) y además como `Lead`, porque para esta clínica un mensaje de
 * WhatsApp sí es un lead y conviene tener las dos señales disponibles al armar
 * la campaña.
 */
export function trackWhatsAppClick(label: string): void {
  if (typeof window === "undefined") return;

  window.fbq?.("track", "Contact", { content_name: label });
  window.fbq?.("track", "Lead", { content_name: label });

  window.gtag?.("event", "whatsapp_click", {
    event_category: "conversion",
    event_label: label,
  });

  window.dataLayer?.push({ event: "whatsapp_click", label });
}

/** Clic para llamar por teléfono. */
export function trackPhoneClick(label = "phone"): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Contact", { content_name: label });
  window.gtag?.("event", "phone_click", { event_category: "conversion", event_label: label });
  window.dataLayer?.push({ event: "phone_click", label });
}

/** Vista de un tratamiento concreto (para armar públicos y remarketing). */
export function trackTreatmentView(treatment: string): void {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "ViewContent", { content_name: treatment, content_type: "treatment" });
  window.gtag?.("event", "view_treatment", { event_label: treatment });
  window.dataLayer?.push({ event: "view_treatment", treatment });
}

/** Interacción con el antes/después. Señal de intención alta. */
export function trackBeforeAfter(caseId: string): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "before_after_interact", { event_label: caseId });
  window.dataLayer?.push({ event: "before_after_interact", caseId });
}
