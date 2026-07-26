import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import TreatmentCatalog from "@/components/TreatmentCatalog";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { clinic } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";

export const metadata: Metadata = {
  title: "Tratamientos",
  description:
    "Láser para rosácea y lesiones vasculares, tratamiento de acné, PRP facial y capilar, onicomicosis y más. Todos con evaluación médica previa en Chillán.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <Navigation />

      <main id="contenido">
        <section className="surface-dark grain pb-12 pt-12 md:pb-16 md:pt-16">
          <div className="shell">
            <div className="page-enter max-w-[52ch]">
              <p className="eyebrow">Tratamientos</p>
              <h1 className="mt-6 text-display-lg">
                <span className="font-light text-porcelain/75">
                  {treatments.length} tratamientos,
                </span>
                <br />
                un mismo punto de partida
              </h1>
              <p className="mt-6 text-lead text-porcelain/85">
                Todos parten de una evaluación médica. No aplicamos un
                tratamiento sin saber primero qué tiene tu piel.
              </p>
            </div>

            {/* La evaluación es la puerta de entrada: va destacada, no como una
                tarjeta más del catálogo. */}
            <div className="card-dark mt-11 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
              <div>
                <h2 className="text-[1.125rem] font-semibold text-porcelain">
                  Evaluación médica
                </h2>
                <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-porcelain/85">
                  Primera consulta con el médico. Define qué corresponde según
                  tu tipo de piel, tu condición y tus antecedentes.
                </p>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="figure-stat text-figure text-porcelain">
                    {clinic.evaluation.priceDisplay}
                  </span>
                  <span className="text-[0.875rem] text-porcelain/75">
                    {clinic.evaluation.note}
                  </span>
                </p>
              </div>
              <WhatsAppCTA
                context={{ kind: "evaluation" }}
                size="lg"
                className="shrink-0"
              >
                Agendar evaluación
              </WhatsAppCTA>
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        <TreatmentCatalog />

        <section className="section-tight border-t border-line-soft bg-drape-deep text-porcelain">
          <div className="shell-narrow text-center">
            <h2 className="text-display-sm">¿No sabes cuál te corresponde?</h2>
            <p className="mx-auto mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-porcelain/80">
              Es lo normal. Cuéntanos qué te preocupa y lo vemos en la
              evaluación.
            </p>
            <div className="mt-7 flex justify-center">
              <WhatsAppCTA context={{ kind: "general" }} size="lg" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyContactBar />
    </>
  );
}
