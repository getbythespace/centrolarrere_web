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
    // Fondo PINO, no ámbar. El bloque entero de ámbar se despegaba de la
    // paleta; acá el color de campaña vuelve a ser un acento de texto sobre el
    // verde de la marca. Ámbar sobre pino da 5.03:1 y papel 13.00:1.
    <div className="h-9 overflow-hidden bg-pine text-paper">
      <Link
        href="/servicios"
        className="shell group flex h-9 items-center justify-center gap-x-2.5 whitespace-nowrap text-center"
      >
        <span className="mono text-[0.75rem] font-bold uppercase tracking-[0.12em] text-ambar">
          {campaign.banner.highlight}
        </span>
        <span className="mono text-[0.75rem] uppercase tracking-[0.12em] text-paper/90">
          {campaign.banner.text}
        </span>
        <span aria-hidden="true" className="hidden text-paper/40 sm:inline">
          ·
        </span>
        <span className="mono hidden text-[0.75rem] uppercase tracking-[0.12em] text-paper/90 underline decoration-paper/30 underline-offset-4 transition-colors group-hover:decoration-paper sm:inline">
          {campaign.banner.detail}
        </span>
      </Link>
    </div>
  );
}
