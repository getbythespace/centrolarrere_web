import Link from "next/link";
import { ArrowRight, ShieldCheck, Stethoscope, ClipboardCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import BeforeAfter from "@/components/BeforeAfter";
import { clinic } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";
import { showcaseCases } from "@/lib/cases";

/**
 * El hero abre con lo que diferencia a la clínica —respaldo médico y de
 * enfermería— y con el antes/después, que es el producto. No con un titular en
 * degradado: el anterior tenía la mitad del H1 en dorado sobre crema (1.55:1)
 * y no se leía.
 */

const DESTACADOS = ["laser-rosacea", "acne", "telangiectasia", "prp-capilar"];

export default function HomePage() {
  const featured = DESTACADOS.map((id) => treatments.find((t) => t.id === id)!).filter(Boolean);

  return (
    <>
      <Navigation />

      <main id="contenido">
        {/* ================= HERO ================= */}
        <section className="section-tight relative overflow-hidden bg-porcelain">
          <div className="shell">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div className="page-enter">
                <p className="eyebrow">Chillán · Región de Ñuble</p>

                <h1 className="mt-4 text-display-xl text-drape-deep">
                  La piel se trata
                  <br />
                  con criterio clínico.
                </h1>

                <p className="mt-6 max-w-prose text-lead text-slate-soft">
                  Rosácea, lesiones vasculares, acné y alopecia. Cada tratamiento
                  parte de una evaluación médica, con respaldo de enfermería y
                  derivación cuando corresponde.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
                  <Link
                    href="/servicios"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-line px-6 py-3.5 text-base font-semibold text-drape-deep transition-colors hover:bg-drape-wash"
                  >
                    Ver tratamientos
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <p className="mt-5 text-sm text-slate-soft">
                  Evaluación médica{" "}
                  <span className="tnum font-semibold text-slate">
                    {clinic.evaluation.priceDisplay}
                  </span>{" "}
                  · {clinic.evaluation.note} · {clinic.hours.display}
                </p>
              </div>

              {/* El signature, arriba del pliegue en desktop. */}
              <div className="lg:pl-4">
                <BeforeAfter data={showcaseCases[0]} />
              </div>
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        {/* ================= RESPALDO ================= */}
        <section className="section-tight border-y border-line-soft bg-drape-wash">
          <div className="shell">
            <h2 className="sr-only">Por qué el enfoque es clínico</h2>
            <ul className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  Icon: Stethoscope,
                  title: "Evaluación médica previa",
                  body: "El médico define el procedimiento según tu tipo de piel, tu condición y tus antecedentes. No se parte por el equipo, se parte por el diagnóstico.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Respaldo de enfermería",
                  body: "Los procedimientos invasivos menores y el seguimiento post-tratamiento los realiza personal de enfermería titulado.",
                },
                {
                  Icon: ClipboardCheck,
                  title: "Derivación cuando corresponde",
                  body: "Si tu caso necesita otra especialidad, lo decimos y derivamos. Hay condiciones que no se resuelven con láser.",
                },
              ].map(({ Icon, title, body }) => (
                <li key={title} className="reveal">
                  <Icon className="h-6 w-6 text-drape" aria-hidden="true" strokeWidth={1.75} />
                  <h3 className="mt-3 text-[1.0625rem] font-semibold text-drape-deep">{title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-soft">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= TRATAMIENTOS ================= */}
        <section className="section">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Tratamientos</p>
                <h2 className="mt-3 text-display-md text-drape-deep">
                  Lo que más nos consultan
                </h2>
              </div>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-drape transition-colors hover:text-drape-deep"
              >
                Ver los {treatments.length} tratamientos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((t) => (
                <li key={t.id} className="reveal">
                  <article className="card-flat lift flex h-full flex-col p-5">
                    <p className="eyebrow text-[0.6875rem]">{t.category}</p>
                    <h3 className="mt-2 text-[1.0625rem] font-semibold text-drape-deep">
                      {t.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate-soft">
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
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= RESULTADOS ================= */}
        <section className="section border-t border-line-soft bg-porcelain-lift">
          <div className="shell">
            <div className="max-w-prose">
              <p className="eyebrow">Resultados</p>
              <h2 className="mt-3 text-display-md text-drape-deep">
                Casos tratados en la clínica
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate-soft">
                Publicamos sólo casos propios, con consentimiento firmado y sin
                retoque. Cada uno indica el tratamiento y el número de sesiones.
              </p>
            </div>

            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {showcaseCases.slice(1, 4).map((c) => (
                <li key={c.id} className="reveal">
                  <BeforeAfter data={c} />
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/resultados"
                className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-drape transition-colors hover:text-drape-deep"
              >
                Ver todos los casos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= CIERRE ================= */}
        <section className="section bg-drape-deep text-porcelain">
          <div className="shell-narrow text-center">
            <h2 className="text-display-md">¿Empezamos por la evaluación?</h2>
            <p className="mx-auto mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-porcelain/80">
              Cuéntanos qué te preocupa por WhatsApp y coordinamos la hora. Si
              prefieres reservar tú, la agenda está abierta.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
              <Link
                href="/agendar"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-porcelain/30 px-6 py-3.5 text-base font-semibold text-porcelain transition-colors hover:bg-porcelain/10"
              >
                Agendar online
              </Link>
            </div>
            <p className="tnum mt-6 text-sm text-porcelain/70">
              {clinic.evaluation.priceDisplay} · {clinic.evaluation.note}
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <StickyContactBar />
    </>
  );
}
