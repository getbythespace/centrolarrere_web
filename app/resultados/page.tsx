import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import Image from "next/image";
import StackedCases from "@/components/StackedCases";
import HeroMedia from "@/components/HeroMedia";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { showcaseCases } from "@/lib/cases";
import { treatments } from "@/lib/treatments";
import { mostrarResultados } from "@/lib/flags";

/** Tratamientos con ilustración de la condición cargada. */
const conditions = treatments.filter((t) => t.conditionImage);

export const metadata: Metadata = {
  title: "Resultados",
  description:
    "Casos tratados en la clínica: rosácea, acné, telangiectasias y tratamientos capilares. Fotos propias, con consentimiento y sin retoque.",
  alternates: { canonical: "/resultados" },
  // Mientras no se publique, tampoco se indexa: si alguien llegara a la URL por
  // un enlace viejo, no queremos que quede en el buscador.
  robots: { index: false, follow: false },
};

export default function ResultadosPage() {
  // Se puede revisar en local; en producción no existe hasta que haya casos
  // reales. El interruptor vive en lib/flags.ts junto con su justificación.
  if (!mostrarResultados) notFound();

  return (
    <>
      <Navigation />

      <main id="contenido">
        <section className="surface-ink relative overflow-hidden pb-14 pt-14 md:pb-20 md:pt-20">
          <HeroMedia
            video="procedimiento"
            alt="Procedimiento con láser realizado en la clínica"
            veil="fuerte"
          />
          <div className="shell relative z-10">
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

        <section className="bg-paper pb-20 pt-14">
          <div className="shell">
            <h2 className="sr-only">Casos publicados</h2>
            {/* Con un solo caso la baraja no tiene sentido —se apila contra
                nada—, así que se muestra en grande. Cuando haya tres o más,
                StackedCases vuelve a ser la opción. */}
            <StackedCases cases={showcaseCases} />
          </div>
        </section>

        {/* Qué tratamos, con la condición ilustrada. Reemplaza a los casos que
            no se pueden publicar: en vez de mostrar un resultado ajeno, se
            muestra el problema, que es lo que la persona está buscando
            reconocer. */}
        <section className="surface-sand section">
          <div className="shell">
            <div className="max-w-prose">
              <p className="field w-44">Qué tratamos</p>
              <h2 className="mt-6 text-display-md text-pine">
                Reconoce tu caso
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink">
                Estas imágenes muestran la condición, no un resultado. Si te
                reconoces en alguna, escríbenos con una foto y te decimos si es
                tratable acá o si conviene derivarte.
              </p>
            </div>

            <ul className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {conditions.map((t) => (
                <li key={t.id} className="bg-paper">
                  <article className="flex h-full flex-col">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                      <Image
                        src={t.conditionImage!.src}
                        alt={t.conditionImage!.alt}
                        fill
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                        className="object-cover"
                        quality={70}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="mono text-label uppercase text-ink">{t.category}</p>
                      <h3 className="mt-2.5 text-[1.0625rem] font-semibold leading-tight text-pine">
                        {t.name}
                      </h3>
                      <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-ink">
                        {t.summary}
                      </p>
                      <WhatsAppCTA
                        context={{ kind: "treatment", treatment: t.name }}
                        variant="quiet"
                        size="sm"
                        block
                        className="mt-4"
                      >
                        Consultar
                      </WhatsAppCTA>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-prose text-[0.8125rem] leading-relaxed text-ink">
              Imágenes ilustrativas de cada condición. No corresponden a
              pacientes de la clínica ni representan un resultado de tratamiento.
            </p>
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
