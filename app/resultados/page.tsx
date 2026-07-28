import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import StackedCases from "@/components/StackedCases";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { showcaseCases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Resultados",
  description:
    "Casos tratados en la clínica: rosácea, acné, telangiectasias y tratamientos capilares. Fotos propias, con consentimiento y sin retoque.",
  alternates: { canonical: "/resultados" },
};

export default function ResultadosPage() {
  return (
    <>
      <Navigation />

      <main id="contenido">
        <section className="surface-ink grain pb-12 pt-12 md:pb-16 md:pt-16">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
              <div className="page-enter">
                <p className="field">Resultados</p>
                <h1 className="mt-6 text-display-lg">
                  <span className="text-sand">Casos</span>
                  <br />
                  tratados acá
                </h1>
                <p className="mt-6 max-w-[44ch] text-lead text-sand">
                  Arrastra el control de cada imagen para comparar. Todos los
                  casos son de la clínica, con consentimiento firmado y sin
                  retoque digital.
                </p>
              </div>

              {/* Contrato honesto con el paciente, antes de las imágenes. */}
              <div className="rec self-end p-6">
                <h2 className="text-[0.9375rem] font-semibold text-paper">
                  Cómo leer estas fotos
                </h2>
                <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-sand">
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e08b88]" />
                    Misma luz, mismo ángulo y misma distancia. Si el «después»
                    estuviera mejor iluminado, la comparación no valdría.
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e08b88]" />
                    Cada caso indica el tratamiento y el número de sesiones.
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e08b88]" />
                    Los resultados varían según la persona y su adherencia al
                    tratamiento. Estos casos no son una promesa.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        <section className="bg-paper pb-24 pt-14">
          <div className="shell">
            <h2 className="sr-only">Galería de casos</h2>
            {/* Baraja: cada caso se sostiene arriba mientras entra el
                siguiente. En mobile el apilado se desactiva y fluyen normal. */}
            <StackedCases cases={showcaseCases} />
          </div>
        </section>

        <section className="surface-ink grain section-tight">
          <div className="shell-narrow text-center">
            <h2 className="text-display-md">
              <span className="text-sand">¿Tu caso se parece</span>
              <br />
              a alguno?
            </h2>
            <p className="mx-auto mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-sand">
              Mándanos una foto por WhatsApp y te decimos si es tratable acá o
              si conviene derivarte.
            </p>
            <div className="mt-8 flex justify-center">
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
