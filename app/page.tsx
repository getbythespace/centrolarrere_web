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
        {/* ================= HERO =================
            Oscuro y con atmósfera desde el primer pantallazo. El fondo claro
            anterior era correcto y no decía nada; el verde quirúrgico con un
            bloom de luz descentrado hace que el comparador funcione como caja
            de luz, que es exactamente lo que es una consulta de piel. */}
        <section className="surface-dark grain overflow-hidden pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="shell">
            {/* Grid asimétrico: el texto pesa más que la imagen y arranca
                antes. Un 50/50 centrado se lee como plantilla. */}
            <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div className="page-enter">
                <p className="eyebrow">Chillán · Ñuble</p>

                {/* El peso fino en "La piel" contra el macizo en "criterio
                    clínico" es lo que hace la frase. Con un solo peso esto no
                    se podía componer. */}
                <h1 className="mt-6 text-display-xl">
                  <span className="block font-light text-porcelain/75">La piel</span>
                  <span className="block font-semibold text-porcelain">se trata con</span>
                  <span className="block font-semibold text-[#7fd4dc]">criterio clínico</span>
                </h1>

                <p className="mt-7 max-w-[46ch] text-lead text-porcelain/85">
                  Rosácea, lesiones vasculares, acné y alopecia. Cada tratamiento
                  parte de una evaluación médica, con respaldo de enfermería.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
                  <Link
                    href="/servicios"
                    className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-porcelain/25 px-6 py-3.5 text-base font-semibold text-porcelain transition-colors hover:border-porcelain/50 hover:bg-porcelain/10"
                  >
                    Ver tratamientos
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                {/* Datos duros como tira, no como frase corrida.
                    `whitespace-nowrap` en las cifras: "$40.000" partido en dos
                    líneas se lee como error, no como dato. */}
                <dl className="mt-11 grid max-w-xl grid-cols-3 gap-5 border-t border-porcelain/15 pt-6">
                  {[
                    [String(treatments.length), "Tratamientos"],
                    [clinic.evaluation.priceDisplay, "Evaluación"],
                    ["Lun–Sáb", "11–19 h"],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <dd className="figure-stat whitespace-nowrap text-stat text-porcelain">
                        {value}
                      </dd>
                      <dt className="mt-1.5 text-[0.6875rem] uppercase tracking-wider text-porcelain/75">
                        {label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>

              {/* El signature, arriba del pliegue en desktop. */}
              <div className="lg:pb-2">
                <BeforeAfter data={showcaseCases[0]} onDark />
              </div>
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        {/* ================= RESPALDO =================
            Grid editorial: el título ocupa una columna propia a la izquierda y
            los tres puntos se apilan a la derecha con reglas entre ellos. Antes
            eran tres columnas iguales, que se leen como pie de página. */}
        <section className="surface-light section">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p className="eyebrow">El diferencial</p>
                <h2 className="mt-5 text-display-md text-drape-deep">
                  <span className="font-light">No es un centro</span>
                  <br />
                  estético más
                </h2>
                <p className="mt-5 max-w-[38ch] text-[1.0625rem] leading-relaxed text-slate-soft">
                  La diferencia con la competencia informal no es el equipo que
                  se usa. Es quién decide que ese equipo es el adecuado para tu
                  piel.
                </p>
              </div>

              <ul className="divide-y divide-line-soft">
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
                  <li key={title} className="reveal flex gap-5 py-7 first:pt-0 last:pb-0">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line-soft bg-porcelain-lift">
                      <Icon className="h-5 w-5 text-drape" aria-hidden="true" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-[1.125rem] font-semibold text-drape-deep">{title}</h3>
                      <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-slate-soft">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================= TRATAMIENTOS ================= */}
        <section className="surface-light section border-t border-line-soft">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Tratamientos</p>
                <h2 className="mt-5 text-display-md text-drape-deep">
                  <span className="font-light">Lo que más</span> nos consultan
                </h2>
              </div>
              <Link
                href="/servicios"
                className="group inline-flex items-center gap-2 border-b border-line pb-1 text-[0.9375rem] font-semibold text-drape transition-colors hover:border-drape hover:text-drape-deep"
              >
                Ver los {treatments.length} tratamientos
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((t) => (
                <li key={t.id} className="reveal">
                  <article className="card-flat lift flex h-full flex-col p-6">
                    <p className="eyebrow text-[0.625rem]">{t.category}</p>
                    <h3 className="mt-4 text-[1.1875rem] font-semibold leading-snug text-drape-deep">
                      {t.name}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-slate-soft">
                      {t.summary}
                    </p>
                    <WhatsAppCTA
                      context={{ kind: "treatment", treatment: t.name }}
                      variant="quiet"
                      size="sm"
                      block
                      className="mt-5"
                    >
                      Consultar
                    </WhatsAppCTA>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= RESULTADOS =================
            Va sobre oscuro: los antes/después se leen mucho mejor sobre fondo
            profundo, igual que una radiografía en un negatoscopio. */}
        <section className="surface-dark grain section">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[44ch]">
                <p className="eyebrow">Resultados</p>
                <h2 className="mt-5 text-display-md">
                  <span className="font-light text-porcelain/75">Casos tratados</span>
                  <br />
                  en la clínica
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-porcelain/85">
                  Sólo casos propios, con consentimiento firmado y sin retoque.
                  Cada uno indica el tratamiento y el número de sesiones.
                </p>
              </div>
              <Link
                href="/resultados"
                className="group inline-flex items-center gap-2 border-b border-porcelain/30 pb-1 text-[0.9375rem] font-semibold text-porcelain transition-colors hover:border-porcelain"
              >
                Ver todos los casos
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {showcaseCases.slice(1, 4).map((c) => (
                <li key={c.id} className="reveal">
                  <BeforeAfter data={c} onDark />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= CIERRE ================= */}
        <section className="surface-light section border-t border-line-soft">
          <div className="shell-narrow text-center">
            <h2 className="text-display-lg text-drape-deep">
              <span className="font-light">¿Empezamos por</span>
              <br />
              la evaluación?
            </h2>
            <p className="mx-auto mt-6 max-w-prose text-lead text-slate-soft">
              Cuéntanos qué te preocupa por WhatsApp y coordinamos la hora. Si
              prefieres reservar tú, la agenda está abierta.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
              <Link
                href="/agendar"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-line px-6 py-3.5 text-base font-semibold text-drape-deep transition-colors hover:bg-drape-wash"
              >
                Agendar online
              </Link>
            </div>
            <p className="tnum mt-7 text-sm text-slate-soft">
              {clinic.evaluation.priceDisplay} · {clinic.evaluation.note} ·{" "}
              {clinic.hours.display}
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <StickyContactBar />
    </>
  );
}
