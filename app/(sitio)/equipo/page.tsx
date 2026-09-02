import type { Metadata } from "next";
import Image from "next/image";
import HeroMedia from "@/components/HeroMedia";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import V2Nav from "@/components/v2/V2Nav";
import V2Volver from "@/components/v2/V2Volver";
import V2Cierre from "@/components/v2/V2Cierre";
import { clinic } from "@/lib/clinic";
import V2Footer from "@/components/v2/V2Footer";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Cosmetólogas, enfermería titulada y atención médica. Quién realiza cada tratamiento en LARRÈRE, Chillán.",
};

/**
 * NINGUNA persona que no sea el médico aparece asociada a láser.
 *
 * La autoridad sanitaria prohíbe a las cosmetólogas realizar procedimientos con
 * láser, y la página decía que la fundadora tenía «más de 7 años de experiencia
 * en tratamientos láser». Eso no era un detalle de redacción: era atribuirle
 * públicamente un procedimiento que no le corresponde hacer.
 *
 * El láser —onicomicosis, rosácea y vascular— lo realiza sólo el médico, y así
 * queda dicho tanto acá como en el catálogo, donde esos tratamientos van
 * marcados con su horario de atención.
 *
 * Nadie lleva título ni institución acá.
 *
 * Los tenía como huecos rotulados —«[REEMPLAZAR con título e institución
 * reales]»— para que se notara lo que faltaba. Eso servía mientras el sitio no
 * estaba publicado; ahora se ven en producción y quedan feos. Los pendientes
 * viven en la lista de tareas, no en la página.
 *
 * Lo que sigue en pie: no se le atribuye a nadie un título que no esté
 * confirmado. Cuando lleguen los datos reales se agrega el campo de vuelta.
 */
const equipo = [
  {
    name: "Evelin Alarcón",
    role: "Fundadora",
    body: "Evalúa la piel, define el tratamiento y hace el seguimiento.",
    especialidades: [
      "Camuflaje capilar",
      "Pigmentación de cejas y labios",
      "Reconstrucción de areola 3D",
    ],
    // Va como formación y no como servicio: la clínica no ofrece bótox.
    formacion: "Certificada en toxina botulínica",
  },
  {
    name: "Belén Muñoz",
    role: "Enfermera",
    body: "Procedimientos invasivos menores y control posterior.",
  },
  {
    name: "Dr. Jhon Pablo Mero",
    role: "Médico cirujano",
    body: "Evaluación médica y todos los tratamientos con láser.",
    badge: clinic.hours.medical,
  },
];

const estandares: Array<[string, string]> = [
  [
    "Seguimiento constante",
    "El tratamiento no es sólo para ti, es un proceso conjunto",
  ],
  ["Higiene y bioseguridad", "Esterilización y material desechable"],
  ["Control posterior", "A cargo de enfermera"],
  ["Derivación", "Si el caso requiere otra especialidad, se deriva"],
];

const ACENTO = ["var(--acc-1)", "var(--acc-2)", "var(--acc-3)", "var(--acc-4)"];

/** Fotos propias del box. Ver public/clinica/box/LEEME.md. */
const BOX: Array<{ src: string; alt: string }> = [
  { src: "laser-en-uso", alt: "Aplicación del láser en la clínica" },
  { src: "cabezal-laser", alt: "Detalle del cabezal del láser" },
  { src: "equipo-panel", alt: "Panel de control del equipo" },
  {
    src: "preparacion-box",
    alt: "Preparación del box antes de un procedimiento",
  },
];

export default function V2EquipoPage() {
  return (
    <>
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
          <V2Volver />
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
                    className={`grid gap-x-10 gap-y-5 py-8 md:grid-cols-[1fr_18rem] md:items-start ${
                      i % 2 === 0 ? "v2-from-l" : "v2-from-r"
                    }`}
                  >
                    <div className="max-w-[46ch]">
                      <p
                        className="text-[clamp(1.375rem,2.6vw,2rem)] font-bold leading-tight"
                        style={{ color: ACENTO[i % ACENTO.length] }}
                      >
                        {p.name}
                      </p>
                      <p className="v2-label v2-dim mt-2">{p.role}</p>
                      <p className="v2-body mt-4">{p.body}</p>
                      {p.especialidades ? (
                        <p className="v2-label v2-dim mt-3">
                          {p.especialidades.join(" · ")}
                        </p>
                      ) : null}
                    </div>

                    <div className="md:text-right">
                      {/* La columna derecha queda para el horario del médico.
                          Antes traía el título y la institución; salieron
                          porque eran huecos rotulados. */}
                      {p.formacion ? (
                        <p className="v2-label v2-dim mb-3">{p.formacion}</p>
                      ) : null}
                      {p.badge ? (
                        <p
                          className="v2-label mt-3"
                          style={{ color: "var(--acc-dato)" }}
                        >
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

                {/* Acá iba una tabla con el número de resolución, el registro
                    de los equipos y la dirección técnica, con huecos rotulados
                    a la espera de los datos. Se quitó: en producción esos
                    corchetes se ven, y una tabla vacía resta más de lo que
                    suma. Vuelve entera cuando lleguen los tres datos. */}
              </div>

              <div>
                <div
                  className="relative aspect-[4/3] border"
                  style={{ borderColor: "var(--hair)" }}
                >
                  <Image
                    src="/clinica/seremi-nuble.webp"
                    alt="SEREMI de Salud Región de Ñuble · Ministerio de Salud"
                    fill
                    className="object-contain p-6"
                    sizes="(min-width: 1024px) 20rem, 90vw"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12">
              <WhatsAppCTA context={{ kind: "general" }} size="lg" />
            </div>
          </div>
        </section>

        {/* ══════════ EL BOX ══════════
          Fotos propias del espacio y del equipamiento. Ninguna muestra un
          rostro identificable ni la condición de una persona: eso se puede
          publicar sin consentimiento, un antes y después no.

          Responden «¿esto es serio?» sin que nadie lo tenga que escribir, que
          es la pregunta con la que llega alguien desde un anuncio. */}
      <section className="v2-sup v2-sup--marron v2-overlap py-[clamp(4rem,10vw,8rem)]">
        <div className="v2-shell">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="v2-display max-w-[15ch]">
              Dónde se <span className="v2-serif">trabaja</span>.
            </h2>
            <p className="v2-label v2-dim">Fotos propias · sin pacientes</p>
          </div>

          <div className="v2-rule mb-10 mt-10" />

          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {BOX.map(({ src, alt }, i) => (
              <li
                key={src}
                className={`relative aspect-[4/5] overflow-hidden ${
                  i % 2 === 0 ? "v2-from-l" : "v2-from-r"
                }`}
              >
                <Image
                  src={`/clinica/box/${src}.avif`}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 30vw, 46vw"
                />
              </li>
            ))}
          </ul>
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
      <V2Footer />
    </>
  );
}
