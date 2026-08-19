import Link from "next/link";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import BeforeAfter from "@/components/BeforeAfter";
import HeroMedia from "@/components/HeroMedia";
import { clinic, clp } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";
import { showcaseCases } from "@/lib/cases";

/**
 * v2 — «Escala viva».
 *
 * El diagnóstico de la v1 fue: demasiado contenido, abrumadora. Tenía nueve
 * secciones. Esta tiene CINCO, y cada una hace una sola cosa.
 *
 * Lo que se sacó y por qué: la franja de datos, la cinta de promociones, la
 * tabla comparativa de seis filas, la grilla de seis tratamientos y el bloque
 * de confidencialidad no desaparecen del sitio — viven en /servicios,
 * /resultados y /equipo, que es donde alguien los busca. La home deja de ser un
 * resumen de todo el sitio.
 *
 * De las referencias premiadas se toma lo replicable dentro del presupuesto:
 * superficie única comprometida, wordmark del ancho del viewport, dos familias
 * tipográficas, filetes a sangre y vacío generoso. Se descarta el canvas
 * generativo —lamalama tiene tres, produx catorce—: es lo que hace que esos
 * sitios pesen lo que pesan.
 */

const LETRAS = ["L", "A", "R", "R", "È", "R", "E"];

export default function V2Page() {
  const foco = treatments.find((t) => t.id === "onicomicosis-plantar")!;
  const caso = showcaseCases[0];

  return (
    <main>
      {/* ══════════ 1 · WORDMARK ══════════
          Tono I. El wordmark ocupa el ancho completo, como House of Honey.
          Nada más en el primer pantallazo: nombre, qué es, y una línea. */}
      <section
        className="v2-surface v2-grain flex min-h-[100svh] flex-col justify-between pb-10 pt-8"
        style={{ ["--surface" as string]: "var(--t1)" }}
      >
        <div className="v2-shell flex items-center justify-between">
          <span className="v2-label">Chillán · Ñuble</span>
          <nav className="flex gap-7">
            {[
              ["/servicios", "Tratamientos"],
              ["/resultados", "Resultados"],
              ["/equipo", "Equipo"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="v2-label hidden transition-opacity hover:opacity-60 sm:block"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="v2-shell">
          <h1 className="v2-wordmark" aria-label="LARRÈRE">
            {LETRAS.map((l, i) => (
              <span key={i} className="v2-mask" aria-hidden="true">
                <span style={{ ["--i" as string]: i }}>{l}</span>
              </span>
            ))}
          </h1>

          <div className="v2-rule mt-7" />

          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="v2-lead max-w-[22ch]">
              La piel se trata <span className="v2-serif">con criterio clínico</span>
            </p>
            <p className="v2-label max-w-[30ch] opacity-70 md:text-right">
              Evaluación médica previa
              <br />
              Enfermería titulada
              <br />
              Autorización sanitaria
            </p>
          </div>
        </div>

        <div className="v2-shell flex items-end justify-between gap-6">
          <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
          <span className="v2-label hidden opacity-60 sm:block">
            {clinic.hours.display}
          </span>
        </div>
      </section>

      {/* ══════════ 2 · LA TESIS ══════════
          Tono II. Una sola idea, en grande. Es lo que ningún competidor dice:
          todos hablan de tecnología, ninguno de calibración por fototipo. */}
      <section
        className="v2-surface v2-grain py-[clamp(5rem,13vw,10rem)]"
        style={{ ["--surface" as string]: "var(--t2)" }}
      >
        <div className="v2-shell">
          <p className="v2-label opacity-70">La tesis</p>
          <h2 className="v2-display mt-8 max-w-[16ch]">
            El mismo láser <span className="v2-serif">no sirve</span> para toda la
            piel.
          </h2>
          <div className="v2-rule mt-12" />
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-16">
            <p className="v2-body max-w-[46ch]">
              Un fototipo II y un fototipo V absorben la energía de forma
              distinta. Aplicar el mismo parámetro a los dos es la causa más
              común de quemadura y de manchas post-tratamiento.
            </p>
            <p className="v2-body max-w-[46ch] opacity-75">
              Por eso acá la consulta empieza determinando tu fototipo, y no
              mostrándote un equipo. Es la diferencia entre un procedimiento
              médico y una sesión de belleza.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ 3 · FOCO DEL MES ══════════
          Tono III. UN solo foco, no dos. El de acné vive en /servicios. */}
      <section
        className="v2-surface v2-grain py-[clamp(5rem,13vw,10rem)]"
        style={{ ["--surface" as string]: "var(--t3)" }}
      >
        <div className="v2-shell">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="v2-label opacity-70">Agosto · Foco del mes</p>
            <p className="v2-label opacity-70">01 / 01</p>
          </div>

          <h2 className="v2-display mt-8 max-w-[18ch]">
            Empieza ahora,
            <br />
            llega al verano <span className="v2-serif">tratado</span>
          </h2>

          <div className="v2-rule mt-12" />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <p className="v2-lead max-w-[34ch]">
                La uña sana no se recupera: crece.
              </p>
              <p className="v2-body mt-6 max-w-[46ch]">
                Una uña del pie tarda entre nueve y doce meses en renovarse por
                completo. El mes en que empiezas define en qué estado llegas al
                verano — y agosto es el último en que todavía alcanza.
              </p>

              <dl className="mt-10">
                <div className="v2-rule" />
                {[
                  ["Tratamiento", foco.name],
                  ["Sesiones", "Sin límite hasta completar"],
                  ["Precio normal", clp(foco.listPrice!)],
                ].map(([k, val]) => (
                  <div key={k}>
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="v2-label opacity-70">{k}</dt>
                      <dd className="v2-body font-semibold">{val}</dd>
                    </div>
                    <div className="v2-rule" />
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-6 py-6">
                  <dt className="v2-label">Precio de lanzamiento</dt>
                  <dd className="v2-display text-[clamp(2rem,4vw,3.25rem)]">
                    {clp(foco.price!)}
                  </dd>
                </div>
                <div className="v2-rule" />
              </dl>

              <div className="mt-10">
                <WhatsAppCTA
                  context={{ kind: "treatment", treatment: foco.name }}
                  size="lg"
                />
              </div>

              <p className="v2-body mt-6 max-w-[48ch] text-[0.9375rem] opacity-70">
                El tiempo de renovación varía según la persona y su adherencia al
                tratamiento. La evaluación confirma si el caso es tratable con
                láser.
              </p>
            </div>

            <div className="lg:pt-2">
              <BeforeAfter data={caso} ratio="4 / 3" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 4 · LA PRUEBA ══════════
          Tono VI invertido, con el video ocupando todo. Es el único momento
          oscuro de la página, y por eso pesa. */}
      <section className="relative min-h-[85svh] overflow-hidden">
        <HeroMedia
          video="procedimiento"
          alt="Procedimiento con láser realizado en la clínica"
          veil="medio"
        />
        <div className="v2-shell relative z-10 flex min-h-[85svh] flex-col justify-end pb-[clamp(3rem,7vw,6rem)] pt-24">
          <p className="v2-label" style={{ color: "var(--paper)" }}>
            La prueba
          </p>
          <h2 className="v2-display mt-7 max-w-[15ch]" style={{ color: "var(--paper)" }}>
            Esto pasa <span className="v2-serif">en la consulta</span>
          </h2>
          <div className="v2-rule mt-10" style={{ color: "var(--paper)" }} />
          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-12">
            {[
              [
                "Evaluación",
                "El médico determina fototipo y condición antes de tocar el equipo.",
              ],
              [
                "Procedimiento",
                "Con respaldo de enfermería titulada y protocolo de bioseguridad.",
              ],
              [
                "Derivación",
                "Si tu caso necesita otra especialidad, lo decimos.",
              ],
            ].map(([t, d]) => (
              <div key={t} style={{ color: "var(--paper)" }}>
                <h3 className="v2-label">{t}</h3>
                <p className="v2-body mt-3 max-w-[34ch] opacity-85">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 5 · CIERRE ══════════
          Tono IV, el más profundo de los tonos de página. Cierra el recorrido
          de la escala y deja el CTA solo, sin nada que compita. */}
      <section
        className="v2-surface v2-grain py-[clamp(6rem,15vw,12rem)]"
        style={{ ["--surface" as string]: "var(--t4)" }}
      >
        <div className="v2-shell">
          <h2 className="v2-display max-w-[14ch]">
            Partamos por <span className="v2-serif">la evaluación</span>
          </h2>

          <div className="v2-rule mt-12" />

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="v2-label opacity-70">Evaluación</p>
              <p className="v2-display mt-3 text-[clamp(2.25rem,5vw,4rem)]">
                Gratis
                <span className="v2-serif ml-4 text-[0.5em] opacity-70">
                  durante agosto
                </span>
              </p>
              <p className="v2-body mt-3 opacity-70">
                Precio normal {clinic.evaluation.priceDisplay}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <WhatsAppCTA context={{ kind: "evaluation" }} size="lg" />
              <Link href="/agendar" className="v2-btn">
                Agendar online
              </Link>
            </div>
          </div>

          <div className="v2-rule mt-16" />

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <span className="v2-label opacity-70">
              {clinic.phone.display} · {clinic.address.city}
            </span>
            <span className="v2-label opacity-70">{clinic.hours.display}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
