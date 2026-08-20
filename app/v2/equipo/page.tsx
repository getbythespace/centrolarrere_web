import type { Metadata } from "next";
import Image from "next/image";
import HeroMedia from "@/components/HeroMedia";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import V2Nav from "@/components/v2/V2Nav";
import V2Cierre from "@/components/v2/V2Cierre";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Cosmetólogas, enfermería titulada y atención médica. Quién realiza cada tratamiento en LARRÈRE, Chillán.",
  robots: { index: false, follow: false },
};

/**
 * Mismos datos que la página de equipo de v1, sin agregar ni quitar nada.
 *
 * Los campos marcados REEMPLAZAR se mantienen visibles a propósito: atribuir un
 * título o una institución falsa a una persona real es de las cosas que no se
 * inventan, así que el hueco se muestra hasta que llegue el dato verdadero.
 */
const equipo = [
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
    credential:
      "[REEMPLAZAR con título, institución y nº de registro (RNPI) reales]",
    badge: clinic.hours.medical,
  },
];

const estandares: Array<[string, string]> = [
  ["Evaluación previa", "Ningún tratamiento parte sin diagnóstico médico"],
  ["Higiene y bioseguridad", "Esterilización y material desechable"],
  ["Seguimiento", "Control posterior a cargo de enfermería"],
  ["Derivación", "Si el caso requiere otra especialidad, se deriva"],
];

const ACENTO = ["var(--acc-1)", "var(--acc-2)", "var(--acc-3)", "var(--acc-4)"];

export default function V2EquipoPage() {
  return (
    <main id="contenido">
      {/* ══════════ HERO ══════════ */}
      <section className="v2-sup v2-sup--void relative overflow-hidden pb-[clamp(4rem,9vw,7rem)] pt-[clamp(7rem,11vw,9rem)]">
        <HeroMedia
          video="procedimiento"
          alt="Procedimiento con láser realizado en la clínica"
          veil="fuerte"
          tone="neutro"
          priority
        />
        <V2Nav />
        <div className="v2-shell relative z-10">
          <p className="v2-label v2-dim">Equipo</p>
          <h1 className="v2-display mt-6 max-w-[15ch]">
            Quién te <span className="v2-serif">atiende</span>.
          </h1>
          <p className="v2-lead mt-8 max-w-[46ch]">
            Cada procedimiento lo hace quien corresponde. Los de mayor
            complejidad los realiza el médico, no el equipo estético.
          </p>
        </div>
      </section>

      {/* ══════════ LAS PERSONAS ══════════ */}
      <section className="v2-sup v2-sup--crema v2-overlap v2-grain relative py-[clamp(4rem,10vw,8rem)]">
        <div className="v2-shell relative z-[2]">
          <h2 className="v2-display max-w-[16ch]">
            Tres roles, <span className="v2-serif">no uno solo</span>.
          </h2>

          <div className="v2-rule mt-12" />

          <ul>
            {equipo.map((p, i) => (
              <li key={p.name}>
                <div
                  className={`grid gap-x-10 gap-y-5 py-8 md:grid-cols-[auto_1fr_18rem] md:items-start ${
                    i % 2 === 0 ? "v2-from-l" : "v2-from-r"
                  }`}
                >
                  {/* Retrato pendiente. Marco rotulado en vez de una foto de
                      banco: poner un rostro de stock donde va una persona real
                      del equipo es exactamente lo que no se hace. */}
                  <div
                    className="flex h-[7.5rem] w-[7.5rem] items-center justify-center border p-3 text-center"
                    style={{ borderColor: "var(--hair)" }}
                  >
                    <span className="v2-label v2-dim text-[0.6875rem] leading-snug">
                      [Retrato real pendiente]
                    </span>
                  </div>

                  <div className="max-w-[46ch]">
                    <p
                      className="text-[clamp(1.375rem,2.6vw,2rem)] font-bold leading-tight"
                      style={{ color: ACENTO[i % ACENTO.length] }}
                    >
                      {p.name}
                    </p>
                    <p className="v2-label v2-dim mt-2">{p.role}</p>
                    <p className="v2-body mt-4">{p.body}</p>
                  </div>

                  <div className="md:text-right">
                    <p className="v2-label v2-dim">{p.credential}</p>
                    {p.badge ? (
                      <p className="v2-label mt-3" style={{ color: "var(--acc-dato)" }}>
                        {p.badge}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="v2-rule" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ ESTÁNDARES ══════════ */}
      <section className="v2-sup v2-sup--void v2-overlap py-[clamp(4rem,10vw,8rem)]">
        <div className="v2-shell">
          <h2 className="v2-display max-w-[17ch]">
            Lo que <span className="v2-serif">no se negocia</span>.
          </h2>

          <div className="v2-rule mt-12" />

          <ul>
            {estandares.map(([titulo, detalle], i) => (
              <li key={titulo}>
                <div
                  className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5 ${
                    i % 2 === 0 ? "v2-from-l" : "v2-from-r"
                  }`}
                >
                  <span
                    className="text-[clamp(1.25rem,2.4vw,2rem)] font-bold leading-tight"
                    style={{ color: ACENTO[i % ACENTO.length] }}
                  >
                    {titulo}
                  </span>
                  <span className="v2-label v2-dim">{detalle}</span>
                </div>
                <div className="v2-rule" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ AUTORIZACIÓN SANITARIA ══════════
          El respaldo verificable. Va con el número de resolución cuando llegue
          la foto de la de Ñuble; mientras tanto el hueco se muestra rotulado en
          vez de insinuar una acreditación que todavía no se puede exhibir. */}
      <section
        id="credenciales"
        className="v2-sup v2-sup--crema v2-overlap v2-grain relative py-[clamp(4rem,10vw,8rem)]"
      >
        <div className="v2-shell relative z-[2]">
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:items-start">
            <div>
              <h2 className="v2-display max-w-[16ch]">
                Autorización <span className="v2-serif">sanitaria</span>.
              </h2>
              <p className="v2-lead v2-dim mt-8 max-w-[44ch]">
                La clínica opera bajo autorización de la SEREMI de Salud, con
                evaluación médica previa y respaldo de enfermería titulada.
              </p>

              <div className="v2-rule mt-10" />
              <ul>
                {[
                  ["Resolución SEREMI de Salud", "[REEMPLAZAR con nº y fecha]"],
                  ["Equipos láser", "[REEMPLAZAR con registro de los equipos]"],
                  ["Dirección técnica", "[REEMPLAZAR con nombre y nº de registro]"],
                ].map(([k, v]) => (
                  <li key={k}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-4">
                      <span className="text-[1.0625rem] font-bold">{k}</span>
                      <span className="v2-label v2-dim">{v}</span>
                    </div>
                    <div className="v2-rule" />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div
                className="relative aspect-[4/3] border"
                style={{ borderColor: "var(--hair)" }}
              >
                <Image
                  src="/clinica/SEREMISALUDMET.png"
                  alt="SEREMI de Salud · Ministerio de Salud de Chile"
                  fill
                  className="object-contain p-6"
                  sizes="(min-width: 1024px) 20rem, 90vw"
                />
              </div>
              <p className="v2-label v2-dim mt-4">
                [Pendiente: foto de la resolución de Ñuble con su número legible]
              </p>
            </div>
          </div>

          <div className="mt-12">
            <WhatsAppCTA context={{ kind: "general" }} size="lg" />
          </div>
        </div>
      </section>

      <V2Cierre
        titulo={
          <>
            Conócenos en <span className="v2-serif">la evaluación</span>
          </>
        }
      />
    </main>
  );
}
