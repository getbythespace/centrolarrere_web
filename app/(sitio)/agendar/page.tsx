import type { Metadata } from "next";
import HeroMedia from "@/components/HeroMedia";
import V2Nav from "@/components/v2/V2Nav";
import V2Volver from "@/components/v2/V2Volver";
import V2Cierre from "@/components/v2/V2Cierre";
import V2Consulta from "@/components/v2/V2Consulta";
import { clinic } from "@/lib/clinic";
import { campaign } from "@/lib/campaign";
import V2Footer from "@/components/v2/V2Footer";

export const metadata: Metadata = {
  title: "Agendar",
  description:
    "Coordina tu evaluación por WhatsApp. Atención de lunes a sábado en Chillán, con evaluación médica previa a todo tratamiento.",
};

/**
 * Antes acá vivía un calendario de Google embebido, y en paralelo existía un
 * sistema de reservas con base de datos y comprobantes de transferencia que
 * ninguna página enlazaba. Los dos se retiraron: la vía es WhatsApp.
 *
 * Lo que queda hace que el primer mensaje llegue con lo que igual habría que
 * preguntar, sin que la persona tenga que escribirlo.
 */
export default function V2AgendarPage() {
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
            <p className="v2-label v2-dim">Agendar</p>
            <h1 className="v2-display mt-6 max-w-[15ch]">
              Partamos por <span className="v2-serif">tu mensaje</span>.
            </h1>
            <p className="v2-lead mt-8 max-w-[46ch]">
              Respondes tres cosas con un toque y te llevamos a WhatsApp con el
              mensaje escrito. Si prefieres, escribe directamente: también
              sirve.
            </p>
            {campaign.active ? (
              <p className="v2-oferta mt-8">
                Evaluación gratuita por tiempo limitado
              </p>
            ) : null}
          </div>
        </section>

        {/* ══════════ EL CUESTIONARIO ══════════ */}
        <section className="v2-sup v2-sup--crema v2-overlap v2-grain relative py-[clamp(4rem,10vw,8rem)]">
          <div className="v2-shell relative z-[2]">
            <h2 className="v2-display max-w-[16ch]">
              Cuéntanos <span className="v2-serif">lo justo</span>.
            </h2>
            <p className="v2-lead v2-dim mt-7 max-w-[46ch]">
              Con esto la respuesta llega directo, sin la ronda de preguntas de
              siempre. Nada es obligatorio.
            </p>

            <div className="v2-rule mt-11 mb-11" />

            <V2Consulta />
          </div>
        </section>

        {/* ══════════ QUÉ PASA DESPUÉS ══════════
          La pregunta que queda dando vueltas después de escribir. Contestarla
          acá baja la ansiedad de mandar el primer mensaje. */}
        <section className="v2-sup v2-sup--void v2-overlap py-[clamp(4rem,10vw,8rem)]">
          <div className="v2-shell">
            <h2 className="v2-display max-w-[16ch]">
              Qué pasa <span className="v2-serif">después</span>.
            </h2>

            <div className="v2-rule mt-12" />

            <ul>
              {(
                [
                  [
                    "Te respondemos por el mismo chat",
                    "Dentro del horario de atención",
                  ],
                  [
                    "Coordinamos día y hora",
                    "Según lo que necesites y la agenda",
                  ],
                  [
                    "La evaluación define el resto",
                    "Ningún tratamiento parte sin ella",
                  ],
                ] as Array<[string, string]>
              ).map(([titulo, detalle], i) => (
                <li key={titulo}>
                  <div
                    className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5 ${
                      i % 2 === 0 ? "v2-from-l" : "v2-from-r"
                    }`}
                  >
                    <span
                      className="text-[clamp(1.25rem,2.4vw,2rem)] font-bold leading-tight"
                      style={{ color: `var(--acc-${i + 1})` }}
                    >
                      {titulo}
                    </span>
                    <span className="v2-label v2-dim">{detalle}</span>
                  </div>
                  <div className="v2-rule" />
                </li>
              ))}
            </ul>

            <p className="v2-body v2-dim mt-10 max-w-[48ch]">
              {clinic.hours.display}. {clinic.hours.medical}. No damos
              diagnósticos por mensaje: lo que se pueda orientar por WhatsApp se
              orienta, y el resto se ve en la evaluación.
            </p>
          </div>
        </section>

        <V2Cierre
          titulo={
            <>
              Te esperamos en <span className="v2-serif">Chillán</span>
            </>
          }
        />
      </main>
      <V2Footer />
    </>
  );
}
