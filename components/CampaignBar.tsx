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
    <div className="h-9 overflow-hidden bg-ambar text-pine">
      <Link
        href="/servicios"
        className="shell flex h-9 items-center justify-center gap-x-2.5 whitespace-nowrap text-center transition-opacity hover:opacity-85"
      >
        {/* Tinta pino sólida en todo: sobre ámbar, `text-pine/75` cae a
            3.47:1 y falla AA en 11px. La jerarquía va por peso. */}
        <span className="mono text-[0.6875rem] font-bold uppercase tracking-[0.12em]">
          {campaign.banner.highlight}
        </span>
        <span className="mono text-[0.6875rem] uppercase tracking-[0.12em]">
          {campaign.banner.text}
        </span>
        <span aria-hidden="true" className="hidden sm:inline">
          ·
        </span>
        <span className="mono hidden text-[0.6875rem] uppercase tracking-[0.12em] underline decoration-pine/50 underline-offset-4 sm:inline">
          {campaign.banner.detail}
        </span>
      </Link>
    </div>
  );
}
