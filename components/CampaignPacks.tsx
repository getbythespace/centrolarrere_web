import { Check } from "lucide-react";
import WhatsAppCTA from "./WhatsAppCTA";
import { campaign } from "@/lib/campaign";
import { treatments } from "@/lib/treatments";
import { clp } from "@/lib/clinic";

/**
 * Los dos focos comerciales del mes.
 *
 * Cada pack cierra con su nota honesta: el argumento de venta y la advertencia
 * viven en la misma tarjeta, no en una letra chica al pie. Es lo que separa una
 * oferta de clínica de una de retail — y es lo que revisa el SEREMI.
 */
export default function CampaignPacks() {
  if (!campaign.active) return null;

  return (
    <section className="surface-sand section" aria-labelledby="campana-titulo">
      <div className="shell">
        <div className="max-w-[50ch]">
          <p className="field w-52">
            {campaign.month} {campaign.year}
          </p>
          <h2 id="campana-titulo" className="mt-6 text-display-md text-pine">
            Dos focos este mes
          </h2>
        </div>

        <div className="mt-10 grid gap-px border border-rule bg-rule lg:grid-cols-2">
          {campaign.packs.map((pack) => {
            const items = pack.treatmentIds
              .map((id) => treatments.find((t) => t.id === id))
              .filter((t): t is NonNullable<typeof t> => Boolean(t));

            return (
              <article key={pack.id} className="flex flex-col bg-paper p-6 md:p-8">
                <p className="mono text-label uppercase text-ink">{pack.eyebrow}</p>

                <h3 className="mt-4 text-[clamp(1.375rem,2.8vw,1.875rem)] font-semibold leading-tight text-pine">
                  {pack.title}
                </h3>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">
                  {pack.body}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {pack.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[0.9375rem] text-pine">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-olive"
                        aria-hidden="true"
                        strokeWidth={2.5}
                      />
                      {p}
                    </li>
                  ))}
                </ul>

                {/* Precios reales de los tratamientos que componen el pack. */}
                <dl className="mt-6 border-t border-rule pt-5">
                  {items.map((t) => (
                    <div
                      key={t.id}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2"
                    >
                      <dt className="text-[0.875rem] text-ink">
                        {t.name}
                        {t.subtitle && (
                          <span className="mono ml-1.5 text-[0.625rem] uppercase text-ink">
                            {t.subtitle}
                          </span>
                        )}
                      </dt>
                      <dd className="flex items-baseline gap-2">
                        {t.listPrice !== null && t.price !== null && t.listPrice > t.price && (
                          <span className="mono text-[0.8125rem] text-ink line-through">
                            {clp(t.listPrice)}
                          </span>
                        )}
                        <span className="mono text-[1.0625rem] font-semibold text-pine">
                          {t.price !== null ? clp(t.price) : "Según evaluación"}
                        </span>
                      </dd>
                    </div>
                  ))}

                  {"priceNote" in pack && pack.priceNote && (
                    <p className="todo-flag mt-3 px-2.5 py-1.5">{pack.priceNote}</p>
                  )}
                </dl>

                <div className="mt-6 flex-1" />

                <WhatsAppCTA
                  context={{ kind: "treatment", treatment: pack.ctaTreatment }}
                  size="lg"
                  block
                />

                {/* La advertencia va junto a la oferta, no en letra chica. */}
                <p className="mt-4 text-[0.75rem] leading-relaxed text-ink">
                  {pack.disclaimer}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
