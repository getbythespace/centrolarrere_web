import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Cosmetólogas, enfermería titulada y atención médica. Quién realiza cada tratamiento en LARRÈRE, Chillán.",
  alternates: { canonical: "/equipo" },
};

/**
 * Los nombres y roles de abajo venían de la iteración anterior y coinciden con
 * los datos que sí estaban en el sitio. Lo que NO se conserva son las
 * credenciales inventadas de /certificados ("Universidad Católica", "Cruz Roja
 * Chilena", años 2017-2024): esas se reemplazaron por espacios rotulados,
 * porque atribuir un título falso a una persona real es serio.
 */
const team = [
  {
    name: "Cosmetólogas especialistas",
    role: "Fundadoras",
    body: "A cargo de los tratamientos estéticos y del seguimiento de la piel. Más de 7 años de experiencia en tratamientos láser.",
    credential: "[REEMPLAZAR con título e institución reales]",
  },
  {
    name: "Belén Muñoz",
    role: "Enfermera",
    body: "Realiza los procedimientos invasivos menores y el control post-tratamiento.",
    credential: "[REEMPLAZAR con título, institución y año reales]",
  },
  {
    name: "Dr. Jhon Pablo Mero",
    role: "Médico cirujano",
    body: "Realiza las evaluaciones médicas y los procedimientos de mayor complejidad: láser CO₂ fraccionado y láser vascular.",
    credential: "[REEMPLAZAR con título, institución y nº de registro (RNPI) reales]",
    badge: "Miércoles desde 17:30",
  },
];

const standards = [
  {
    title: "Evaluación previa",
    body: "Ningún tratamiento parte sin diagnóstico médico.",
  },
  {
    title: "Higiene y bioseguridad",
    body: "Protocolos de esterilización y material desechable.",
  },
  {
    title: "Seguimiento",
    body: "Control posterior a cargo de enfermería.",
  },
  {
    title: "Derivación",
    body: "Si el caso requiere otra especialidad, se deriva.",
  },
];

export default function EquipoPage() {
  return (
    <>
      <Navigation />

      <main id="contenido">
        <section className="section-tight bg-porcelain">
          <div className="shell">
            <div className="max-w-prose page-enter">
              <p className="eyebrow">Equipo</p>
              <h1 className="mt-4 text-display-lg text-drape-deep">
                Quién realiza cada tratamiento
              </h1>
              <p className="mt-5 text-lead text-slate-soft">
                La diferencia entre una clínica y un centro estético informal
                está acá: quién te atiende y con qué respaldo.
              </p>
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        <section className="section border-y border-line-soft bg-porcelain-lift">
          <div className="shell">
            <h2 className="sr-only">Integrantes del equipo</h2>
            <ul className="grid gap-6 md:grid-cols-3">
              {team.map((m) => (
                <li key={m.name} className="reveal">
                  <article className="card-flat flex h-full flex-col p-6">
                    {/* Espacio de retrato. Sin foto real no se pone un emoji
                        gigante: se deja el marco rotulado. */}
                    <div className="placeholder-flag flex aspect-[4/3] w-full items-center justify-center px-3 text-center text-[0.75rem] font-medium">
                      [REEMPLAZAR con retrato real]
                    </div>

                    {m.badge && (
                      <span className="mt-4 inline-flex w-fit items-center rounded-sm bg-drape-wash px-2 py-1 text-[0.6875rem] font-semibold text-drape-deep">
                        {m.badge}
                      </span>
                    )}

                    <h3 className="mt-4 text-[1.125rem] font-semibold text-drape-deep">
                      {m.name}
                    </h3>
                    <p className="mt-0.5 text-[0.875rem] font-medium text-drape">{m.role}</p>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate-soft">
                      {m.body}
                    </p>
                    <p className="placeholder-flag mt-4 px-2.5 py-1.5 text-[0.75rem] font-medium">
                      {m.credential}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ancla de destino para el redirect desde /certificados. */}
        <section className="section" id="credenciales">
          <div className="shell">
            <div className="max-w-prose">
              <p className="eyebrow">Credenciales y estándares</p>
              <h2 className="mt-3 text-display-md text-drape-deep">
                Con qué respaldo trabajamos
              </h2>
            </div>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {standards.map((s) => (
                <li key={s.title} className="card-flat p-5 reveal">
                  <h3 className="text-[1.0625rem] font-semibold text-drape-deep">{s.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate-soft">
                    {s.body}
                  </p>
                </li>
              ))}
            </ul>

            {/* Sellos de confianza: se dejan como espacio explícito porque hay
                que verificarlos antes de mostrarlos. Una autorización sanitaria
                afirmada de más es un problema legal, no un detalle. */}
            <div className="placeholder-flag mt-8 max-w-prose p-5">
              <h3 className="text-[0.9375rem] font-semibold">
                Espacio para sellos y autorizaciones
              </h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed">
                [REEMPLAZAR con las autorizaciones reales: resolución SEREMI de
                Salud (con número), registro de los equipos láser, títulos
                profesionales. Adjunta los documentos y los publico con el
                número visible — es lo que la competencia usa como sello de
                confianza, pero sólo sirve si es verificable.]
              </p>
            </div>
          </div>
        </section>

        <section className="section-tight bg-drape-deep text-porcelain">
          <div className="shell-narrow text-center">
            <h2 className="text-display-sm">Conversemos tu caso</h2>
            <p className="tnum mx-auto mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-porcelain/80">
              Evaluación médica {clinic.evaluation.priceDisplay} ·{" "}
              {clinic.evaluation.note}
            </p>
            <div className="mt-7 flex justify-center">
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyContactBar />
    </>
  );
}
