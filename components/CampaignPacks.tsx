import { Check } from "lucide-react";
import WhatsAppCTA from "./WhatsAppCTA";
import BeforeAfter from "./BeforeAfter";
import { campaign } from "@/lib/campaign";
import { treatments } from "@/lib/treatments";
import { showcaseCases } from "@/lib/cases";
import { clp } from "@/lib/clinic";

/**
 * Los dos focos comerciales del mes.
 *
 * Cada pack lleva su propio bloque de color saturado en la cabecera —ámbar o
 * ladrillo— y el resto de la tarjeta se mantiene en papel. Es lo que hace que
 * canten sin que la página entera se vuelva un volante de retail.
 *
 * La advertencia va dentro de la tarjeta, junto al precio, no en letra chica al
 * pie. En publicidad de prestaciones de salud esa es la diferencia entre una
 * oferta y un problema.
 */

// Cabeceras dentro de la paleta: pino y oliva, no ámbar y ladrillo. El ámbar
// queda como acento de texto sobre el pino (5.03:1), que es donde funciona sin
// romper el sistema. Papel sobre oliva: 5.70:1.
const TONES = {
  ambar: {
    head: "bg-pine text-paper",
    headMuted: "text-ambar",
    check: "text-olive",
  },
  ladrillo: {
    head: "bg-olive text-paper",
    headMuted: "text-paper",
    check: "text-olive",
  },
} as const;

export default function CampaignPacks() {
  if (!campaign.active) return null;

  return (
    <section className="bg-paper section" aria-labelledby="campana-titulo">
      <div className="shell">
        <div className="max-w-[52ch]">
          <p className="field w-52">
            {campaign.month} {campaign.year}
          </p>
          <h2 id="campana-titulo" className="mt-6 text-display-md text-pine">
            Dos focos este mes
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {campaign.packs.map((pack) => {
            const tone = TONES[pack.tone];
            const items = pack.treatmentIds
              .map((id) => treatments.find((t) => t.id === id))
              .filter((t): t is NonNullable<typeof t> => Boolean(t));
            const caseData =
              "caseId" in pack ? showcaseCases.find((c) => c.id === pack.caseId) : undefined;

            return (
              <article key={pack.id} className="card-rise flex flex-col border border-pine">
                {/* Cabecera en color pleno. */}
                <div className={`${tone.head} px-6 py-5 md:px-8 md:py-6`}>
                  <p className={`mono text-label uppercase ${tone.headMuted}`}>
                    {pack.eyebrow}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.375rem,2.6vw,1.75rem)] font-semibold leading-tight">
                    {pack.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-[0.9375rem] leading-relaxed text-ink">{pack.body}</p>

                  {/* El antes/después referencial, cuando el pack lo tiene. */}
                  {caseData && (
                    <div className="mt-6">
                      <BeforeAfter data={caseData} ratio="3 / 2" />
                    </div>
                  )}

                  <ul className="mt-6 space-y-2.5">
                    {pack.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-[0.9375rem] text-pine">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${tone.check}`}
                          aria-hidden="true"
                          strokeWidth={2.5}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-rule pt-5">
                    {/* Precio del pack completo, si lo tiene. */}
                    {"packPrice" in pack && pack.packPrice && (
                      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className="mono text-label uppercase text-ink">
                          {pack.packLabel}
                        </span>
                        <span className="mono text-[1.75rem] font-semibold leading-none text-pine">
                          {clp(pack.packPrice)}
                        </span>
                      </div>
                    )}

                    <dl>
                      {items.map((t) => (
                        <div
                          key={t.id}
                          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-1.5"
                        >
                          <dt className="text-[0.875rem] text-ink">{t.name}</dt>
                          <dd className="flex items-baseline gap-2">
                            {t.listPrice !== null &&
                              t.price !== null &&
                              t.listPrice > t.price && (
                                <span className="mono text-[0.8125rem] text-ink line-through">
                                  {clp(t.listPrice)}
                                </span>
                              )}
                            <span className="mono text-[1rem] font-semibold text-pine">
                              {t.price !== null ? clp(t.price) : "Según evaluación"}
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="flex-1" />

                  <WhatsAppCTA
                    context={{ kind: "treatment", treatment: pack.ctaTreatment }}
                    size="lg"
                    block
                    className="mt-6"
                  />

                  <p className="mt-4 text-[0.75rem] leading-relaxed text-ink">
                    {pack.disclaimer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
