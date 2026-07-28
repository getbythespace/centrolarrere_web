import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import StickyContactBar, { StickyCTASentinel } from "@/components/StickyContactBar";
import BeforeAfter from "@/components/BeforeAfter";
import ToneScale, { ToneRule } from "@/components/ToneScale";
import TrustMarquee from "@/components/TrustMarquee";
import RevealText from "@/components/RevealText";
import { clinic } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";
import { showcaseCases } from "@/lib/cases";

/**
 * La home está compuesta como una ficha clínica: campos con etiqueta mono,
 * filetes de 1px, radio cero y un salto de escala fuerte entre la etiqueta y el
 * titular. La escala de fototipos abre la página, porque es la que justifica la
 * paleta y anuncia de qué se trata la consulta.
 */

const DESTACADOS = ["laser-rosacea", "acne", "telangiectasia", "prp-capilar"];

export default function HomePage() {
  const featured = DESTACADOS.map((id) => treatments.find((t) => t.id === id)!).filter(Boolean);

  return (
    <>
      <Navigation />

      <main id="contenido">
        {/* ================= HERO ================= */}
        <section className="grain bg-paper">
          <div className="shell">
            {/* Cabecera de ficha: dos campos mono en una fila, con filete
                abajo. Antes de cualquier titular, para que el primer gesto de
                la página sea el del instrumento. */}
            <div className="hair-soft grid gap-x-8 gap-y-3 border-b border-rule py-4 text-label sm:grid-cols-3">
              <p className="mono uppercase text-ink">
                Estética clínica · Chillán
              </p>
              <p className="mono uppercase text-ink sm:text-center">
                Fototipos I–VI
              </p>
              <p className="mono uppercase text-ink sm:text-right">
                {clinic.hours.display}
              </p>
            </div>

            <div className="grid gap-10 pb-12 pt-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12 lg:pb-16 lg:pt-14">
              <div>
                {/* Escala arriba del titular: es la tesis del sitio. */}
                <ToneScale size="md" className="max-w-md" />

                {/* Revelado línea por línea al cargar: cada una sube desde
                    detrás de su máscara con 90ms de retardo entre sí. Es el
                    efecto SplitText, resuelto en CSS y sin bajar una librería.
                    El acento va en oliva —pino 13.00:1 contra oliva 5.70:1 da
                    salto suficiente— en vez de meter un tercer color. */}
                <h1 className="mt-8 text-display-2xl text-pine">
                  <span className="line-mask">
                    <span style={{ ["--i" as string]: 0 }}>Cada piel</span>
                  </span>
                  <span className="line-mask">
                    <span style={{ ["--i" as string]: 1 }}>tiene un</span>
                  </span>
                  <span className="line-mask">
                    <span className="text-olive" style={{ ["--i" as string]: 2 }}>
                      protocolo.
                    </span>
                  </span>
                </h1>

                <div className="mt-8 max-w-prose">
                  <p className="text-lead text-ink">
                    Rosácea, lesiones vasculares, acné y alopecia. El láser no se
                    calibra igual para un fototipo II que para un V — por eso acá
                    se parte por el diagnóstico y no por el equipo.
                  </p>
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
                  <Link
                    href="/servicios"
                    className="group inline-flex min-h-[48px] items-center justify-center gap-2.5 border border-pine px-6 py-3.5 text-[0.9375rem] font-semibold text-pine transition-colors hover:bg-pine hover:text-paper"
                  >
                    Ver {treatments.length} tratamientos
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                {/* Datos como campos de ficha, no como «stats» decorativas. */}
                <dl className="mt-12 grid grid-cols-2 border-t border-rule sm:grid-cols-3">
                  {[
                    ["Evaluación", clinic.evaluation.priceDisplay, clinic.evaluation.note],
                    ["Atención médica", "Miércoles", "desde 17:30"],
                    ["Respaldo", "Enfermería", "titulada"],
                  ].map(([label, value, note]) => (
                    <div
                      key={label}
                      className="border-b border-rule/50 py-4 pr-6 sm:border-b-0"
                    >
                      <dt className="mono text-label uppercase text-ink">{label}</dt>
                      <dd className="mt-2 text-[1.375rem] font-semibold leading-none text-pine">
                        {value}
                      </dd>
                      <dd className="mono mt-1.5 text-[0.6875rem] uppercase text-ink">
                        {note}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Columna derecha: fotografía primero, comparador debajo.
                  La foto es lo que da profundidad a la página; el comparador
                  es la prueba. */}
              <div className="flex flex-col gap-6 lg:pt-2">
                <figure className="m-0">
                  <div className="relative aspect-[4/5] w-full overflow-hidden border border-rule bg-sand">
                    <Image
                      src="/hero/piel-hombro.jpg"
                      alt="Detalle de piel con pecas y pigmentación en el hombro"
                      fill
                      // Ocupa ~38% del ancho en desktop y casi todo en mobile.
                      // Sin esto Next sirve la versión de 1600px al celular.
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover"
                      priority
                      quality={72}
                    />
                    <span className="mono absolute bottom-0 left-0 bg-pine px-2.5 py-1.5 text-[0.625rem] uppercase tracking-widest text-paper">
                      Fototipo II
                    </span>
                  </div>
                  <figcaption className="todo-flag mt-2.5 px-2.5 py-1.5">
                    [REEMPLAZAR con foto propia de la clínica — ver
                    public/LEEME.md]
                  </figcaption>
                </figure>

                <div>
                  <p className="field mb-3">Caso 01</p>
                  <BeforeAfter data={showcaseCases[0]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <StickyCTASentinel />

        {/* Cinta de confianza: la única pieza que se mueve sola, acotada a una
            franja. Separa el hero del argumento y le da pulso a la página. */}
        <TrustMarquee />

        {/* ================= DIFERENCIAL ================= */}
        <section className="surface-ink grain section">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="field">El diferencial</p>
                <h2 className="mt-6 text-display-lg text-paper">
                  No es un centro estético.
                </h2>
                <p className="mt-6 max-w-prose text-lead text-sand">
                  La diferencia con la competencia informal no está en el equipo
                  que se usa. Está en quién decide que ese equipo es el adecuado
                  para tu piel.
                </p>
              </div>

              {/* Lista numerada como protocolo. Acá el orden sí es secuencia:
                  es lo que pasa, en orden, cuando llegas. */}
              <ol className="border-t border-sand/30">
                {[
                  {
                    n: "01",
                    title: "Evaluación médica",
                    body: "El médico revisa tu tipo de piel, tu condición y tus antecedentes. Determina el fototipo y con eso la calibración del equipo.",
                  },
                  {
                    n: "02",
                    title: "Procedimiento con respaldo",
                    body: "Los procedimientos invasivos menores y el control posterior los realiza personal de enfermería titulado.",
                  },
                  {
                    n: "03",
                    title: "Derivación si corresponde",
                    body: "Si tu caso necesita otra especialidad, lo decimos. Hay condiciones de la piel que no se resuelven con láser.",
                  },
                ].map((s) => (
                  <li
                    key={s.n}
                    className="grid grid-cols-[3rem_1fr] gap-4 border-b border-sand/30 py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
                  >
                    <span className="mono text-label text-sand/80">{s.n}</span>
                    <div>
                      <h3 className="text-[1.1875rem] font-semibold text-paper">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-sand">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <ToneRule />

        {/* Banda a sangre completa: rompe la sucesión de bloques de color, que
            es lo que hacía que la página se leyera plana.

            Va la textura de piedra y no el macro de piel: el macro es
            uniforme, y estirado a 1440px con un velo encima quedaba como una
            plancha gris. Además medía 900px de ancho y se escalaba hacia
            arriba. La piedra tiene veta y 1400px reales. */}
        <section
          aria-hidden="true"
          className="relative h-[34vh] min-h-[13rem] w-full overflow-hidden md:h-[42vh]"
        >
          <Image
            src="/clinica/textura-piedra.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={68}
          />
          {/* Velo muy leve, sólo para amarrarla a la paleta. Al 35% tapaba la
              veta, que es justo lo que hace que valga la pena la imagen. */}
          <div className="absolute inset-0 bg-pine/12 mix-blend-multiply" />
          <div className="grain absolute inset-0" />
          {/* Dato clínico sobre la banda: la convierte en contenido y no en
              relleno decorativo. */}
          <p className="mono absolute bottom-4 left-0 right-0 px-[clamp(1rem,4vw,2.25rem)] text-center text-[0.625rem] uppercase tracking-[0.2em] text-pine">
            La calibración del láser cambia con cada fototipo
          </p>
        </section>

        {/* ================= TRATAMIENTOS ================= */}
        <section className="section bg-paper">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="field w-56">Tratamientos</p>
                <h2 className="mt-6 text-display-md text-pine">
                  Lo que más nos consultan
                </h2>
              </div>
              <Link
                href="/servicios"
                className="mono group inline-flex items-center gap-2 border-b border-pine pb-1 text-label uppercase text-pine"
              >
                Catálogo completo
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Grilla sin gap: las tarjetas comparten filete, como celdas de una
                tabla. Es lo que separa esto de cuatro cajas flotando. */}
            <ul className="mt-10 grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((t, i) => (
                <li key={t.id} className="border-b border-r border-rule">
                  <article className="rec rec-hover flex h-full flex-col border-0 p-6">
                    <p className="mono text-label uppercase text-ink">
                      {String(i + 1).padStart(2, "0")} · {t.category}
                    </p>
                    <h3 className="mt-5 text-[1.25rem] font-semibold leading-tight text-pine">
                      {t.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink">
                      {t.summary}
                    </p>
                    <WhatsAppCTA
                      context={{ kind: "treatment", treatment: t.name }}
                      variant="quiet"
                      size="sm"
                      block
                      className="mt-6"
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
        <section className="surface-sand section">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[46ch]">
                <p className="field w-40">Resultados</p>
                <h2 className="mt-6 text-display-md text-pine">
                  Casos tratados acá
                </h2>
                {/* Se entinta palabra por palabra al entrar en pantalla. */}
                <RevealText className="mt-5 text-[1.0625rem] leading-relaxed">
                  Sólo casos propios, con consentimiento firmado y sin retoque.
                  Cada uno indica tratamiento, fototipo y número de sesiones.
                </RevealText>
              </div>
              <Link
                href="/resultados"
                className="mono group inline-flex items-center gap-2 border-b border-pine pb-1 text-label uppercase text-pine"
              >
                Todos los casos
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {showcaseCases.slice(1, 4).map((c, i) => (
                <li key={c.id}>
                  <p className="field mb-3">Caso {String(i + 2).padStart(2, "0")}</p>
                  <BeforeAfter data={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= CIERRE ================= */}
        <section className="surface-ink grain section">
          <div className="shell">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="field w-48">Siguiente paso</p>
                <h2 className="mt-6 text-display-xl text-paper">
                  Empecemos por
                  <br />
                  la evaluación.
                </h2>
                <p className="mt-6 max-w-prose text-lead text-sand">
                  Cuéntanos qué te preocupa por WhatsApp. Si prefieres reservar
                  tú, la agenda está abierta.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:min-w-[16rem]">
                <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" block />
                <Link
                  href="/agendar"
                  className="inline-flex min-h-[48px] items-center justify-center border border-sand/40 px-6 py-3.5 text-[0.9375rem] font-semibold text-paper transition-colors hover:bg-paper hover:text-pine"
                >
                  Agendar online
                </Link>
                <p className="mono mt-2 text-[0.6875rem] uppercase leading-relaxed text-sand">
                  {clinic.evaluation.priceDisplay} · {clinic.evaluation.note}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyContactBar />
    </>
  );
}
