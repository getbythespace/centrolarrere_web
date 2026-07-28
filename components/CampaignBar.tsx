import Link from "next/link";
import { campaign } from "@/lib/campaign";

/**
 * Barra de campaña, sobre el nav.
 *
 * Va en ámbar con tinta pino (5.03:1). Es el único bloque de color saturado del
 * sitio y por eso funciona: si todo gritara, nada destacaría. Se reserva a lo
 * único con fecha de vencimiento — la evaluación gratis de agosto.
 */
export default function CampaignBar() {
  if (!campaign.active) return null;

  return (
    // Alto FIJO y sin `flex-wrap`.
    //
    // Con alto automático la barra medía dos líneas mientras se usaba la mono
    // de reserva y una sola al llegar IBM Plex Mono, así que el header se
    // encogía 18px después de cargar y empujaba la página entera hacia arriba:
    // 0.339 de CLS, casi todo el presupuesto en un solo salto. Con alto fijo y
    // `nowrap`, el cambio de fuente no puede mover nada.
    // Fondo AMARILLO de atención. Es lo único del sitio que se sale de la
    // paleta a propósito: la evaluación gratis tiene fecha de vencimiento y
    // tiene que verse de inmediato. Tinta pino encima da 7.77:1.
    <div className="h-10 overflow-hidden bg-alerta text-pine">
      <Link
        href="/servicios"
        className="shell group flex h-10 items-center justify-center gap-x-2.5 whitespace-nowrap text-center"
      >
        <span className="mono text-label font-bold uppercase text-pine">
          {campaign.banner.highlight}
        </span>
        <span className="mono text-label uppercase text-pine">
          {campaign.banner.text}
        </span>
        <span aria-hidden="true" className="hidden text-pine/50 sm:inline">
          ·
        </span>
        <span className="mono hidden text-label uppercase text-pine underline decoration-pine/40 underline-offset-4 transition-colors group-hover:decoration-pine sm:inline">
          {campaign.banner.detail}
        </span>
      </Link>
    </div>
  );
}
