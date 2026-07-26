import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import BeforeAfter from "@/components/BeforeAfter";
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
        <section className="section-tight bg-porcelain">
          <div className="shell">
            <div className="max-w-prose page-enter">
              <p className="eyebrow">Resultados</p>
              <h1 className="mt-4 text-display-lg text-drape-deep">
                Casos tratados acá
              </h1>
              <p className="mt-5 text-lead text-slate-soft">
                Arrastra el control de cada imagen para comparar. Todos los
                casos son de la clínica, con consentimiento firmado y sin
                retoque digital.
              </p>
            </div>

            {/* Contrato honesto con el paciente, antes de las imágenes. */}
            <div className="card-flat mt-8 max-w-prose p-5">
              <h2 className="text-[0.9375rem] font-semibold text-drape-deep">
                Cómo leer estas fotos
              </h2>
              <ul className="mt-3 space-y-2 text-[0.9375rem] leading-relaxed text-slate-soft">
                <li>
                  Están tomadas con la misma luz, el mismo ángulo y la misma
                  distancia. Si el «después» estuviera mejor iluminado, la
                  comparación no valdría.
                </li>
                <li>
                  Cada caso indica el tratamiento y el número de sesiones.
                </li>
                <li>
                  Los resultados varían según la persona, su tipo de piel y su
                  adherencia al tratamiento. Estos casos no son una promesa.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        <section className="section border-t border-line-soft bg-porcelain-lift">
          <div className="shell">
            <h2 className="sr-only">Galería de casos</h2>
            <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {showcaseCases.map((c) => (
                <li key={c.id} className="reveal">
                  <BeforeAfter data={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-tight bg-drape-deep text-porcelain">
          <div className="shell-narrow text-center">
            <h2 className="text-display-sm">¿Tu caso se parece a alguno?</h2>
            <p className="mx-auto mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-porcelain/80">
              Mándanos una foto por WhatsApp y te decimos si es tratable acá o
              si conviene derivarte.
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
