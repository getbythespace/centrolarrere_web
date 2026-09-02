import type { Metadata } from "next";
import Image from "next/image";
import HeroMedia from "@/components/HeroMedia";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import V2Nav from "@/components/v2/V2Nav";
import V2Volver from "@/components/v2/V2Volver";
import V2Cierre from "@/components/v2/V2Cierre";
import { clinic } from "@/lib/clinic";
import V2Footer from "@/components/v2/V2Footer";

/**
 * El mes de la campaña se calcula en cada render. Sin esto la página quedaría
 * congelada con el mes en que se compiló y en octubre seguiría diciendo
 * septiembre. 12 horas es de sobra para un cambio mensual.
 */
export const revalidate = 43200;

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "WhatsApp, teléfono, dirección y horario de LARRÈRE en Chillán. Atención de lunes a sábado, 11:00 a 19:00.",
  robots: { index: false, follow: false },
};

const ACENTO = ["var(--acc-1)", "var(--acc-2)", "var(--acc-3)", "var(--acc-4)"];

/**
 * Los datos salen todos de lib/clinic.ts. La dirección sigue siendo un
 * placeholder allá y acá se muestra tal cual, rotulada: una dirección
 * inventada en la página de contacto es de las peores cosas que puede tener un
 * sitio de una clínica real.
 */
const datos: Array<{ k: string; v: string; href?: string; nota?: string }> = [
  {
    k: "WhatsApp",
    v: clinic.phone.display,
    href: `https://wa.me/${clinic.phone.wa}`,
    nota: "La vía más rápida",
  },
  {
    k: "Teléfono",
    v: clinic.phone.display,
    href: `tel:${clinic.phone.e164}`,
  },
  {
    k: "Correo",
    v: clinic.email,
    href: `mailto:${clinic.email}`,
  },
  {
    k: "Dirección",
    v: `${clinic.address.street}, ${clinic.address.unit}`,
    nota: `${clinic.address.building} · ${clinic.address.city}`,
  },
  {
    k: "Horario",
    v: clinic.hours.display,
    nota: clinic.hours.medical,
  },
];

export default function V2ContactoPage() {
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
            <p className="v2-label v2-dim">Contacto</p>
            <h1 className="v2-display mt-6 max-w-[14ch]">
              Escríbenos y <span className="v2-serif">coordinamos</span>.
            </h1>
            <p className="v2-lead mt-8 max-w-[44ch]">
              Lo más rápido es WhatsApp. Cuéntanos qué te preocupa y te
              orientamos antes de agendar.
            </p>
            <div className="mt-9">
              <WhatsAppCTA context={{ kind: "general" }} size="lg" />
            </div>
          </div>
        </section>

        {/* ══════════ LOS DATOS ══════════ */}
        <section className="v2-sup v2-sup--crema v2-overlap v2-grain relative py-[clamp(4rem,10vw,8rem)]">
          <div className="v2-shell relative z-[2]">
            <h2 className="v2-display max-w-[16ch]">
              Dónde <span className="v2-serif">encontrarnos</span>.
            </h2>

            <div className="v2-rule mt-12" />

            <ul>
              {datos.map((d, i) => (
                <li key={d.k}>
                  <div
                    className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6 ${
                      i % 2 === 0 ? "v2-from-l" : "v2-from-r"
                    }`}
                  >
                    <span className="v2-label v2-dim">{d.k}</span>
                    <div className="text-right">
                      {d.href ? (
                        <a
                          href={d.href}
                          className="v2-enlace text-[clamp(1.25rem,2.4vw,2rem)] font-bold leading-tight"
                          style={{ color: ACENTO[i % ACENTO.length] }}
                        >
                          {d.v}
                        </a>
                      ) : (
                        <span
                          className="text-[clamp(1.25rem,2.4vw,2rem)] font-bold leading-tight"
                          style={{ color: ACENTO[i % ACENTO.length] }}
                        >
                          {d.v}
                        </span>
                      )}
                      {d.nota ? (
                        <p className="v2-label v2-dim mt-1.5">{d.nota}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="v2-rule" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══════════ LA FACHADA ══════════
            Va acá y no en la portada: sirve a quien ya decidió venir y está
            buscando la puerta. El edificio se llama Centro Urbano 18-S y eso es
            lo que se ve desde la vereda — más útil que el número de la calle. */}
        <section className="v2-sup v2-sup--marron v2-overlap py-[clamp(4rem,10vw,8rem)]">
          <div className="v2-shell">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/clinica/fachada.avif"
                  alt={`Fachada del edificio ${clinic.address.building}, en ${clinic.address.street}, Chillán`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 55vw, 92vw"
                />
              </div>
              <div>
                <h2 className="v2-display max-w-[14ch]">
                  Así se ve <span className="v2-serif">desde afuera</span>.
                </h2>
                <p className="v2-lead v2-dim mt-7 max-w-[38ch]">
                  {clinic.address.building}, {clinic.address.street}. La consulta
                  está en la {clinic.address.unit.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ══════════ QUÉ CONTAR AL ESCRIBIR ══════════
          Baja la fricción del primer mensaje: quien llega desde un anuncio no
          sabe qué decir, y un mensaje con estos tres datos se responde de una
          en vez de arrancar con tres preguntas de vuelta. */}
        <section className="v2-sup v2-sup--void v2-overlap py-[clamp(4rem,10vw,8rem)]">
          <div className="v2-shell">
            <h2 className="v2-display max-w-[18ch]">
              Qué contarnos <span className="v2-serif">al escribir</span>.
            </h2>

            <div className="v2-rule mt-12" />

            <ul>
              {(
                [
                  [
                    "Qué te preocupa",
                    "Con tus palabras basta, no hace falta un diagnóstico",
                  ],
                  ["Hace cuánto", "Si es reciente o si viene de años"],
                  [
                    "Si estás en tratamiento",
                    "Medicación en curso, sobre todo para el acné",
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

            <p className="v2-body v2-dim mt-10 max-w-[46ch]">
              No respondemos consultas clínicas por mensaje: lo que se pueda
              orientar por WhatsApp se orienta, y el diagnóstico se hace en la
              evaluación.
            </p>
          </div>
        </section>

        <V2Cierre
          titulo={
            <>
              Escríbenos <span className="v2-serif">ahora</span>
            </>
          }
        />
      </main>
      <V2Footer />
    </>
  );
}
