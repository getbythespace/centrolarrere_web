import type { Metadata } from "next";
import HeroMedia from "@/components/HeroMedia";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import V2Nav from "@/components/v2/V2Nav";
import V2Volver from "@/components/v2/V2Volver";
import V2Cierre from "@/components/v2/V2Cierre";
import { clinic, clp } from "@/lib/clinic";
import { treatments, type Category } from "@/lib/treatments";
import { campaign } from "@/lib/campaign";
import V2Footer from "@/components/v2/V2Footer";

/**
 * El mes de la campaña se calcula en cada render. Sin esto la página quedaría
 * congelada con el mes en que se compiló y en octubre seguiría diciendo
 * septiembre. 12 horas es de sobra para un cambio mensual.
 */
export const revalidate = 43200;

export const metadata: Metadata = {
  title: "Tratamientos",
  description:
    "Láser para rosácea y lesiones vasculares, tratamiento de acné, PRP facial y capilar, onicomicosis y más. Todos con evaluación médica previa en Chillán.",
  robots: { index: false, follow: false },
};

/**
 * El catálogo va como lista editorial y no como grilla de tarjetas: es la misma
 * fila de «Por qué acá» —término a la izquierda, dato a la derecha— y con 21
 * tratamientos una grilla obliga a recorrer bloques sueltos, mientras que la
 * lista se lee de corrido.
 *
 * El orden de las categorías es deliberado: primero láser y médico, que es lo
 * que la clínica hace y otros centros derivan.
 */
const ORDEN: Category[] = [
  "Láser",
  "Médico",
  "Uñas",
  "Facial",
  "Capilar",
  "Alergias",
  "Corporal",
  "Estético",
];

const porCategoria = ORDEN.map((cat) => ({
  cat,
  items: treatments.filter((t) => t.category === cat),
})).filter((g) => g.items.length > 0);

/** Rota los cuatro acentos de la superficie para separar las categorías. */
const ACENTO = ["var(--acc-1)", "var(--acc-2)", "var(--acc-3)", "var(--acc-4)"];

export default function V2ServiciosPage() {
  return (
    <>
      <main id="contenido">
        {/* ══════════ HERO ══════════ */}
        <section className="v2-sup v2-sup--void relative overflow-hidden pb-[clamp(4rem,9vw,7rem)] pt-[clamp(7rem,11vw,9rem)]">
          <HeroMedia
            video="preparacion"
            alt="Enfermera de la clínica preparándose antes de un procedimiento"
            veil="fuerte"
            tone="neutro"
            priority
          />
          <V2Volver />
          <V2Nav />
          <div className="v2-shell relative z-10">
            <p className="v2-label v2-dim">Tratamientos</p>
            <h1 className="v2-display mt-6 max-w-[16ch]">
              {treatments.length} tratamientos,{" "}
              <span className="v2-serif">un mismo punto de partida</span>
            </h1>
            <p className="v2-lead mt-8 max-w-[46ch]">
              Todos parten de una evaluación. No aplicamos un tratamiento sin
              saber primero qué tiene tu piel.
            </p>
          </div>
        </section>

        {/* ══════════ LA EVALUACIÓN ══════════
          Va sola en su banda porque es la puerta de entrada del catálogo, no un
          tratamiento más de la lista. */}
        <section className="v2-sup v2-sup--tierra v2-overlap py-[clamp(3rem,7vw,5rem)]">
          <div className="v2-shell flex flex-wrap items-center justify-between gap-8">
            <div>
              <p className="v2-label v2-dim">Evaluación</p>
              <p className="v2-display mt-3 text-[clamp(2rem,4.5vw,3.5rem)]">
                Gratis
                <span className="v2-serif ml-4 text-[0.45em] v2-dim">
                  {campaign.banner.text}
                </span>
              </p>
              <p className="v2-body v2-dim mt-3 max-w-[44ch]">
                Precio normal {clinic.evaluation.priceDisplay} ·{" "}
                {clinic.evaluation.note}. Define qué corresponde según tu piel,
                tu condición y tus antecedentes.
              </p>
            </div>
            <WhatsAppCTA context={{ kind: "evaluation" }} size="lg">
              Agendar evaluación
            </WhatsAppCTA>
          </div>
        </section>

        {/* ══════════ CATÁLOGO ══════════ */}
        <section className="v2-sup v2-sup--crema v2-overlap v2-grain relative py-[clamp(4rem,10vw,8rem)]">
          <div className="v2-shell relative z-[2]">
            <h2 className="v2-display max-w-[16ch]">
              Todo lo que <span className="v2-serif">se trata acá</span>.
            </h2>

            {porCategoria.map(({ cat, items }, gi) => (
              <div key={cat} className="mt-[clamp(3rem,6vw,4.5rem)]">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3
                    className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-none"
                    style={{ color: ACENTO[gi % ACENTO.length] }}
                  >
                    {cat}
                  </h3>
                  <p className="v2-label v2-dim">
                    {items.length}{" "}
                    {items.length === 1 ? "tratamiento" : "tratamientos"}
                  </p>
                </div>
                <div className="v2-rule mt-5" />

                <ul>
                  {items.map((t, i) => (
                    <li key={t.id}>
                      <div
                        className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-5 ${
                          i % 2 === 0 ? "v2-from-l" : "v2-from-r"
                        }`}
                      >
                        <div className="max-w-[52ch]">
                          <p className="text-[clamp(1.0625rem,1.9vw,1.5rem)] font-bold leading-tight">
                            {t.name}
                          </p>
                          <p className="v2-body v2-dim mt-1.5 text-[0.9375rem]">
                            {t.summary}
                          </p>
                        </div>

                        <div className="text-right">
                          {/* Sin precio inventado: lo que no está en la planilla
                            de la clínica dice que se define en la evaluación. */}
                          {t.price === null ? (
                            <span className="v2-label v2-dim">
                              Según evaluación
                            </span>
                          ) : (
                            <>
                              {t.listPrice && t.listPrice > t.price ? (
                                <span className="v2-label v2-dim mr-3 line-through">
                                  {clp(t.listPrice)}
                                </span>
                              ) : null}
                              <span className="text-[clamp(1.0625rem,1.7vw,1.375rem)] font-bold">
                                {clp(t.price)}
                              </span>
                            </>
                          )}
                          {t.sessionsNote ? (
                            <p className="v2-label v2-dim mt-1">
                              {t.sessionsNote}
                            </p>
                          ) : t.sessions ? (
                            <p className="v2-label v2-dim mt-1">
                              {t.sessions}{" "}
                              {t.sessions === 1 ? "sesión" : "sesiones"}
                            </p>
                          ) : null}
                          {t.doctorOnly ? (
                            <p className="v2-label v2-dim mt-1">
                              {clinic.hours.medical}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="v2-rule" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ NO SÉ CUÁL ME CORRESPONDE ══════════ */}
        <section className="v2-sup v2-sup--void v2-overlap py-[clamp(4rem,9vw,7rem)]">
          <div className="v2-shell">
            <h2 className="v2-display max-w-[18ch]">
              ¿No sabes cuál <span className="v2-serif">te corresponde</span>?
            </h2>
            <p className="v2-lead v2-dim mt-7 max-w-[44ch]">
              Es lo normal. Cuéntanos qué te preocupa y lo vemos en la
              evaluación.
            </p>
            <div className="mt-9">
              <WhatsAppCTA context={{ kind: "general" }} size="lg" />
            </div>
          </div>
        </section>

        <V2Cierre />
      </main>
      <V2Footer />
    </>
  );
}
