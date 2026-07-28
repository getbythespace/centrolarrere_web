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
 * La versión anterior eran dos tarjetas de prosa: correcta y aburrida, porque
 * el argumento de cada pack es temporal o de cobertura y ninguna de las dos
 * cosas se entiende leyendo un párrafo.
 *
 * Ahora cada pack explica su lógica con un diagrama:
 * - Onicomicosis: una línea de tiempo de agosto a diciembre, porque el
 *   argumento ES el calendario.
 * - Acné: una cuadrícula de 24 sesiones, porque el argumento ES la cantidad.
 *
 * La advertencia sigue dentro de la tarjeta, junto al precio. En publicidad de
 * prestaciones de salud esa es la diferencia entre una oferta y un problema.
 */

const MESES = ["AGO", "SEP", "OCT", "NOV", "DIC"];

/** Línea de tiempo de renovación de la uña. El dato es el calendario. */
function LineaDeTiempo() {
  return (
    <figure className="m-0 mt-7 border border-rule bg-sand/40 p-5">
      <figcaption className="mono text-label-sm uppercase text-olive-deep">
        Renovación de la uña, mes a mes
      </figcaption>

      <div className="mt-4 flex items-end gap-1.5">
        {MESES.map((m, i) => (
          <div key={m} className="flex flex-1 flex-col items-center gap-2">
            {/* La barra crece con los meses: es la uña sana avanzando. */}
            <div
              className="w-full bg-pine"
              style={{ height: `${18 + i * 16}px` }}
              aria-hidden="true"
            />
            <span className="mono text-[0.6875rem] font-bold uppercase text-pine">{m}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-rule pt-3.5">
        <span className="mono text-label-sm uppercase text-olive-deep">Si empiezas hoy</span>
        <span className="text-[0.9375rem] font-semibold text-pine">
          Llegas al verano con la uña renovada
        </span>
      </div>
      <p className="sr-only">
        La uña del pie tarda entre nueve y doce meses en renovarse por completo.
        Empezando en agosto, el avance visible coincide con el verano.
      </p>
    </figure>
  );
}

/** Cuadrícula de sesiones cubiertas. El dato es la cantidad. */
function GrillaSesiones() {
  const total = 24; // 1 por semana × 6 meses
  return (
    <figure className="m-0 mt-7 border border-rule bg-sand/40 p-5">
      <figcaption className="mono text-label-sm uppercase text-olive-deep">
        Sesiones que cubre el pack
      </figcaption>

      <div
        className="mt-4 grid grid-cols-12 gap-1.5"
        role="img"
        aria-label="Veinticuatro sesiones: una por semana durante seis meses"
      >
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className="aspect-square bg-pine" />
        ))}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-rule pt-3.5">
        <span className="mono text-label-sm uppercase text-olive-deep">1 por semana</span>
        <span className="text-[0.9375rem] font-semibold text-pine">
          24 sesiones en 6 meses
        </span>
      </div>
    </figure>
  );
}

const TONES = {
  ambar: {
    head: "bg-pine text-paper",
    headMuted: "text-alerta",
    check: "text-olive",
    diagram: LineaDeTiempo,
  },
  ladrillo: {
    head: "bg-olive text-paper",
    headMuted: "text-paper",
    check: "text-olive",
    diagram: GrillaSesiones,
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
          <h2 id="campana-titulo" className="mt-7 text-display-md text-pine">
            Dos focos este mes
          </h2>
        </div>

        <div className="mt-11 grid gap-6 lg:grid-cols-2">
          {campaign.packs.map((pack) => {
            const tone = TONES[pack.tone];
            const Diagrama = tone.diagram;
            const items = pack.treatmentIds
              .map((id) => treatments.find((t) => t.id === id))
              .filter((t): t is NonNullable<typeof t> => Boolean(t));
            const caseData =
              "caseId" in pack ? showcaseCases.find((c) => c.id === pack.caseId) : undefined;

            return (
              <article key={pack.id} className="card-rise flex flex-col border border-pine">
                <div className={`${tone.head} px-6 py-6 md:px-8`}>
                  <p className={`mono text-label font-bold uppercase ${tone.headMuted}`}>
                    {pack.eyebrow}
                  </p>
                  <h3 className="mt-3.5 text-[clamp(1.5rem,2.8vw,1.9375rem)] font-semibold leading-tight">
                    {pack.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-body text-ink">{pack.body}</p>

                  {/* El diagrama hace el trabajo que el párrafo no puede. */}
                  <Diagrama />

                  {caseData && (
                    <div className="mt-7">
                      <BeforeAfter data={caseData} ratio="3 / 2" />
                    </div>
                  )}

                  <ul className="mt-7 space-y-3">
                    {pack.points.map((p) => (
                      <li key={p} className="flex gap-3 text-body text-pine">
                        <Check
                          className={`mt-1 h-4 w-4 shrink-0 ${tone.check}`}
                          aria-hidden="true"
                          strokeWidth={2.5}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 border-t border-rule pt-5">
                    {"packPrice" in pack && pack.packPrice && (
                      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className="mono text-label uppercase text-ink">
                          {pack.packLabel}
                        </span>
                        <span className="mono text-[2rem] font-semibold leading-none text-pine">
                          {clp(pack.packPrice)}
                        </span>
                      </div>
                    )}

                    <dl>
                      {items.map((t) => (
                        <div
                          key={t.id}
                          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2"
                        >
                          <dt className="text-[0.9375rem] text-ink">{t.name}</dt>
                          <dd className="flex items-baseline gap-2.5">
                            {t.listPrice !== null &&
                              t.price !== null &&
                              t.listPrice > t.price && (
                                <span className="mono text-[0.875rem] text-ink line-through">
                                  {clp(t.listPrice)}
                                </span>
                              )}
                            <span className="mono text-[1.125rem] font-semibold text-pine">
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
                    className="mt-7"
                  />

                  <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink">
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
