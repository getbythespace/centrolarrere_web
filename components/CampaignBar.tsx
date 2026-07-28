import Link from "next/link";
import { campaign } from "@/lib/campaign";

/**
 * Barra de campaña, sobre el nav.
 *
 * Va en pino con texto papel (13.00:1) y no en un rojo de oferta: el gancho lo
 * da el contenido, no el grito. Una clínica que grita descuentos pierde justo
 * lo que vende, que es criterio.
 *
 * Si `campaign.active` es false no renderiza nada y el sitio vuelve solo a su
 * estado normal.
 */
export default function CampaignBar() {
  if (!campaign.active) return null;

  return (
    <div className="bg-pine text-paper">
      <div className="shell flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center">
        <p className="mono text-[0.6875rem] uppercase tracking-[0.14em]">
          <span className="font-semibold text-sage">
            {campaign.banner.highlight}
          </span>{" "}
          <span className="text-paper/85">{campaign.banner.text}</span>
        </p>
        <span aria-hidden="true" className="hidden text-paper/30 sm:inline">
          ·
        </span>
        <Link
          href="/servicios"
          className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper/85 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
        >
          {campaign.banner.detail}
        </Link>
      </div>
    </div>
  );
}
